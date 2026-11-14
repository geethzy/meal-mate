// CORE LAYER: builds a new two-week plan.
// Each cook session covers 4 days (2 for the last one). Within a session the breakfast, snack,
// hot drink, lunch and dinner are the same.
// The user's picks are preferred. Several candidate plans are generated, each using a random
// number of the picks, and the best is kept:
//   - sugar and fat over their limits are heavy penalties (hard limits)
//   - going over the budget is a heavy penalty, so cheaper dishes replace picks when needed
//   - each pick used is a small bonus, so the app keeps as many picks as the budget allows
import { addDays } from "./dates.js";
import { dayNutrition, averageNutrition } from "./nutrition.js";
import { buildShoppingList, budgetSummary } from "./shopping.js";

function shuffle(arr, rng) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Returns a pool for one slot: some of the picks (a random number, from none to all), then everything else
function slotPool(all, picks, rng) {
  const keep = rng() < 0.5 ? picks.length : Math.floor(rng() * (picks.length + 1));
  const used = shuffle(picks, rng).slice(0, keep);
  return [...used, ...shuffle(all.filter((id) => !used.includes(id)), rng)];
}

function buildCandidate({ recipes, favourites, startISO, config, rng }) {
  const ids = (type) => Object.keys(recipes).filter((id) => recipes[id].type === type);
  const mainIds = ids("main");
  const picks = (slot) => (favourites[slot] || []).filter((id) => recipes[id]);

  const breakfasts = slotPool(ids("breakfast"), picks("breakfast"), rng);
  const snacks = slotPool(ids("snack"), picks("snack"), rng);
  const drinks = slotPool(ids("drink"), picks("drink"), rng);
  const lunches = slotPool(mainIds, picks("lunch"), rng);
  // A dinner never repeats a lunch of the same plan
  const dinners = slotPool(mainIds.filter((id) => !lunches.slice(0, config.sessionSizes.length).includes(id)), picks("dinner"), rng);

  let cookDay = 1;
  const sessions = config.sessionSizes.map((size, i) => {
    const days = Array.from({ length: size }, (_, k) => cookDay + k);
    const s = {
      id: "s" + (i + 1),
      no: i + 1,
      cookDay,
      cookDate: addDays(startISO, cookDay - 1),
      days,
      portions: config.cookPortions,
      dishes: {
        breakfast: breakfasts[i % breakfasts.length],
        lunch: lunches[i % lunches.length],
        dinner: dinners[i % dinners.length],
        snack: snacks[i % snacks.length],
        drink: drinks[i % drinks.length]
      }
    };
    cookDay += size;
    return s;
  });

  const days = [];
  for (const s of sessions) {
    for (const n of s.days) days.push({ n, date: addDays(startISO, n - 1), sessionId: s.id, meals: s.dishes });
  }
  return { startDate: startISO, generatedAt: new Date().toISOString(), days, sessions };
}

// Lower is better
function scorePlan(plan, recipes, ingredients, config, favUsed) {
  const avg = averageNutrition(plan.days.map((d) => dayNutrition(d, recipes, ingredients)));
  const t = config.targets;
  const sugarOver = Math.max(0, avg.sugar - t.sugar.max);
  const fatOver = Math.max(0, avg.fat - t.fat.max);
  const proteinShort = Math.max(0, t.protein.min - avg.protein);
  const fiberShort = Math.max(0, t.fiber.min - avg.fiber);
  const cost = budgetSummary(buildShoppingList(plan, recipes, ingredients), config).total;
  const overBudget = Math.max(0, cost - config.budget.fortnight);
  return 1000 * (sugarOver + fatOver) + 20 * (proteinShort + fiberShort) + 5 * overBudget + cost / 200 - 25 * favUsed;
}

/**
 * @param {object} opts
 * @param {object} opts.recipes      RECIPES
 * @param {object} opts.ingredients  INGREDIENTS
 * @param {object} [opts.favourites] { breakfast: [id], lunch: [id], dinner: [id], snack: [id], drink: [id] } the user's picks
 * @param {string} opts.startISO     first day of the plan (YYYY-MM-DD)
 * @param {object} opts.config       CONFIG
 * @param {function} [opts.rng]      random source returning 0..1
 * @returns {object} plan, with favUsed (picks used) and favTotal (picks made)
 */
export function generatePlan({ recipes, ingredients, favourites = {}, startISO, config, rng = Math.random }) {
  const allPicks = new Set(Object.values(favourites).flat().filter((id) => recipes[id]));
  let best = null, bestScore = Infinity;
  for (let i = 0; i < config.candidates; i++) {
    const plan = buildCandidate({ recipes, favourites, startISO, config, rng });
    const used = new Set(plan.sessions.flatMap((s) => Object.values(s.dishes)).filter((id) => allPicks.has(id)));
    const score = scorePlan(plan, recipes, ingredients, config, used.size);
    if (score < bestScore) { best = { ...plan, favUsed: used.size }; bestScore = score; }
  }
  best.favTotal = allPicks.size;
  return best;
}
