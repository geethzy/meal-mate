// CORE LAYER: builds a new two-week plan.
// Each cook session covers 4 days (2 for the last one). Within a session the breakfast, snack,
// hot drink, lunch and dinner are the same. Foods the user likes are placed first in their group.
// Several random candidates are generated and the best is kept: sugar and fat are hard limits,
// protein and fiber are pushed up, and cost is a tie-breaker.
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

function buildCandidate({ recipes, favourites, startISO, config, rng }) {
  // Liked dishes first (in random order among themselves), then the rest of the catalogue
  const pick = (type) => {
    const all = Object.keys(recipes).filter((id) => recipes[id].type === type);
    const favs = (favourites[type] || []).filter((id) => recipes[id] && recipes[id].type === type);
    const rest = all.filter((id) => !favs.includes(id));
    return [...shuffle(favs, rng), ...shuffle(rest, rng)];
  };
  const breakfasts = pick("breakfast");
  const lunches = pick("lunch");
  const dinners = pick("dinner");
  const drinks = pick("drink");
  const snacks = pick("snack");

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
function scorePlan(plan, recipes, ingredients, config) {
  const avg = averageNutrition(plan.days.map((d) => dayNutrition(d, recipes, ingredients)));
  const t = config.targets;
  const sugarOver = Math.max(0, avg.sugar - t.sugar.max);
  const fatOver = Math.max(0, avg.fat - t.fat.max);
  const proteinShort = Math.max(0, t.protein.min - avg.protein);
  const fiberShort = Math.max(0, t.fiber.min - avg.fiber);
  const cost = budgetSummary(buildShoppingList(plan, recipes, ingredients), config).total;
  return 1000 * (sugarOver + fatOver) + 20 * (proteinShort + fiberShort) + cost / 200;
}

/**
 * @param {object} opts
 * @param {object} opts.recipes      RECIPES
 * @param {object} opts.ingredients  INGREDIENTS
 * @param {object} [opts.favourites] { breakfast: [recipeId], lunch: [...], ... } foods the user likes
 * @param {string} opts.startISO     first day of the plan (YYYY-MM-DD)
 * @param {object} opts.config       CONFIG
 * @param {function} [opts.rng]      random source returning 0..1
 */
export function generatePlan({ recipes, ingredients, favourites = {}, startISO, config, rng = Math.random }) {
  let best = null, bestScore = Infinity;
  for (let i = 0; i < config.candidates; i++) {
    const plan = buildCandidate({ recipes, favourites, startISO, config, rng });
    const score = scorePlan(plan, recipes, ingredients, config);
    if (score < bestScore) { best = plan; bestScore = score; }
  }
  return best;
}
