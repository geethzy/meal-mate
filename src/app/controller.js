// APP LAYER (controller): owns the current state, runs actions, and returns view models.
// No HTML and no DOM here.
import { generatePlan } from "../core/planner.js";
import { addDays, todayISO } from "../core/dates.js";
import { dayNutrition } from "../core/nutrition.js";
import { buildShoppingList, budgetSummary } from "../core/shopping.js";
import { matchFoods } from "../core/matching.js";

const MEALS = [["breakfast", "Breakfast"], ["lunch", "Lunch"], ["dinner", "Dinner"], ["snack", "Snack"], ["drink", "Hot drink"]];
const SECTIONS = ["protein", "pantry", "produce"];
const LIKE_FIELDS = [
  ["breakfast", "Breakfast", "e.g. porridge, egg toast"],
  ["lunch", "Lunch", "e.g. chicken and rice"],
  ["dinner", "Dinner", "e.g. fish curry"],
  ["snack", "Snacks", "e.g. chocolate chip oat cookies"],
  ["drink", "Hot drinks", "e.g. ginger tea, coffee"]
];

/**
 * @param {object} deps  injected so the controller can run in the browser, in tests, or with another store
 */
export function createController({ catalog, config, store, rng = Math.random, now = () => todayISO() }) {
  const { RECIPES, INGREDIENTS, GROUPS } = catalog;
  let record = store.load();                    // { plan, checks: { days, shop, cook }, actuals } or null
  const prefs = store.loadPrefs();              // { likes: { breakfast: "text", ... } }, kept across plans
  const ui = { tab: "plan", section: "protein", cookId: null, dish: "lunch" };

  const emptyRecord = (plan) => ({ plan, checks: { days: [], shop: [], cook: [] }, actuals: {} });
  const save = () => store.save(record);
  const toggle = (list, value) => {
    const i = list.indexOf(value);
    if (i >= 0) list.splice(i, 1); else list.push(value);
  };
  const shoppingList = () => buildShoppingList(record.plan, RECIPES, INGREDIENTS);

  function status() {
    if (!record) return "none";
    return now() > addDays(record.plan.startDate, 13) ? "ended" : "active";
  }

  // The foods typed for each meal, matched to catalogue dishes
  function builderView() {
    const groups = LIKE_FIELDS.map(([key, label, placeholder]) => {
      const text = prefs.likes[key];
      const m = matchFoods(text, RECIPES, key);
      return {
        key, label, placeholder, text,
        matched: m.matched.map((id) => ({ id, name: RECIPES[id].name })),
        unmatched: m.unmatched
      };
    });
    return { groups, canCreate: true };
  }

  // ---- view models (plain data) ----
  function planView() {
    const st = status();
    const base = { status: st, builder: builderView() };
    if (!record) return { ...base, hasPlan: false };
    const { plan, checks } = record;
    return {
      ...base,
      hasPlan: true,
      start: plan.startDate,
      end: addDays(plan.startDate, 13),
      doneDays: checks.days.length,
      days: plan.days.map((d) => ({
        n: d.n,
        date: d.date,
        done: checks.days.includes(d.n),
        meals: MEALS.map(([key, label]) => ({ key, label, name: RECIPES[d.meals[key]].name })),
        nutrition: dayNutrition(d, RECIPES, INGREDIENTS)
      }))
    };
  }

  function groceryView() {
    if (!record) return { hasPlan: false };
    const list = shoppingList();
    const { actuals, checks } = record;
    return {
      hasPlan: true,
      budget: budgetSummary(list, config, actuals),
      done: checks.shop.length,
      total: list.length,
      active: ui.section,
      sections: SECTIONS.map((g) => ({
        key: g,
        title: GROUPS[g],
        items: list.filter((i) => i.group === g).map((i) => ({
          ...i, done: checks.shop.includes(i.id), paid: actuals[i.id] ?? null
        }))
      }))
    };
  }

  function cookView() {
    if (!record) return { hasPlan: false };
    const { plan, checks } = record;
    const current = plan.sessions.find((s) => s.id === ui.cookId) || plan.sessions[0];
    const dishes = MEALS.map(([key, label]) => {
      const R = RECIPES[current.dishes[key]];
      return { key, label, name: R.name, time: R.time };
    });
    const dishKey = dishes.some((d) => d.key === ui.dish) ? ui.dish : "lunch";
    const R = RECIPES[current.dishes[dishKey]];
    const mult = R.yield > 1 ? 1 : current.days.length;   // per-serving dishes repeat for each day
    const first = current.days[0], last = current.days[current.days.length - 1];

    return {
      hasPlan: true,
      sessions: plan.sessions.map((s) => ({
        id: s.id, no: s.no, date: s.cookDate, done: checks.cook.includes(s.id), selected: s.id === current.id
      })),
      selected: {
        id: current.id, no: current.no, date: current.cookDate, days: current.days,
        portions: current.portions, done: checks.cook.includes(current.id),
        dishes, dishKey,
        dish: {
          name: R.name,
          time: R.time,
          forText: R.yield > 1 ? `${R.yield} portions` : `${current.days.length} servings (days ${first}–${last})`,
          desc: R.desc,
          ingredients: Object.entries(R.ing).map(([id, qty]) => ({
            name: INGREDIENTS[id].name,
            ing: INGREDIENTS[id],
            qty: qty * mult,
            each: R.yield > 1 ? qty / R.yield : null
          })),
          steps: R.steps,
          storage: R.storage,
          reheat: R.reheat || null
        }
      }
    };
  }

  // ---- actions ----
  function dispatch(action, p = {}) {
    switch (action) {
      case "tab":
        ui.tab = p.tab;
        break;
      case "set-likes":
        prefs.likes[p.type] = String(p.value || "").slice(0, 300);
        store.savePrefs(prefs);
        break;
      case "generate": {
        const favourites = Object.fromEntries(builderView().groups.map((g) => [g.key, g.matched.map((m) => m.id)]));
        record = emptyRecord(generatePlan({
          recipes: RECIPES, ingredients: INGREDIENTS, favourites,
          startISO: addDays(now(), 1), config, rng
        }));
        ui.cookId = null;
        ui.tab = "plan";
        save();
        break;
      }
      case "toggle-day":
        if (record) { toggle(record.checks.days, Number(p.n)); save(); }
        break;
      case "toggle-shop":
        if (record) { toggle(record.checks.shop, p.id); save(); }
        break;
      case "toggle-cook":
        if (record) { toggle(record.checks.cook, p.id); save(); }
        break;
      case "set-price":
        if (record) {
          const v = parseFloat(p.value);
          if (Number.isFinite(v) && v >= 0) record.actuals[p.id] = Math.round(v);
          else delete record.actuals[p.id];
          save();
        }
        break;
      case "select-section":
        ui.section = p.key;
        break;
      case "select-cook":
        ui.cookId = p.id;
        break;
      case "select-dish":
        ui.dish = p.key;
        break;
    }
  }

  function view() {
    return { ui: { ...ui }, plan: planView(), grocery: groceryView(), cook: cookView() };
  }

  return { dispatch, view };
}
