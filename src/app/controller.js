// APP LAYER (controller): owns the current state, runs actions, and returns view models.
// No HTML and no DOM here.
import { generatePlan } from "../core/planner.js";
import { addDays, todayISO } from "../core/dates.js";
import { dayNutrition } from "../core/nutrition.js";
import { buildShoppingList, tripSummary, snackAmount } from "../core/shopping.js";

const MEALS = [["breakfast", "Breakfast"], ["lunch", "Lunch"], ["dinner", "Dinner"], ["snack", "Snack"], ["drink", "Hot drink"]];
const SECTIONS = ["protein", "pantry", "produce"];
// Meal groups in the builder. Lunch and dinner both draw from the shared "main" dishes.
const MEAL_FIELDS = [
  ["breakfast", "Breakfast", "breakfast"],
  ["lunch", "Lunch", "main"],
  ["dinner", "Dinner", "main"],
  ["snack", "Snacks", "snack"],
  ["drink", "Hot drinks", "drink"]
];

/**
 * @param {object} deps  injected so the controller can run in the browser, in tests, or with another store
 */
export function createController({ catalog, config, store, rng = Math.random, now = () => todayISO() }) {
  const { RECIPES, INGREDIENTS, GROUPS } = catalog;
  // record = { plan, checks: { days, shop, cook }, actuals, trip } or null
  let record = store.load();
  const prefs = store.loadPrefs();              // { picks: { breakfast: [dishId], ... } }, kept across plans
  const ui = { tab: "plan", section: "protein", cookId: null, dish: "lunch", draft: { name: "", category: "lunch", description: "" }, draftError: "" };
  let dishes = store.loadDishes();              // dishes you added yourself

  const emptyRecord = (plan) => ({ plan, checks: { days: [], shop: [], cook: [] }, actuals: {}, trip: false });
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

  // Dropdown options and the dishes already picked for each meal
  function builderView() {
    const groups = MEAL_FIELDS.map(([key, label, type]) => {
      const options = Object.entries(RECIPES)
        .filter(([, r]) => r.type === type)
        .map(([id, r]) => ({ id, name: r.name }))
        .sort((a, b) => a.name.localeCompare(b.name));
      const picks = (prefs.picks[key] || []).filter((id) => RECIPES[id]).map((id) => ({ id, name: RECIPES[id].name }));
      return { key, label, options, picks };
    });
    return { groups, canCreate: true };
  }

  // ---- view models (plain data) ----
  function planView() {
    const st = status();
    const base = { status: st, builder: builderView() };
    if (!record) return { ...base, hasPlan: false };
    const { plan, checks } = record;
    // Days ticked as done leave the list
    const days = plan.days.filter((d) => !checks.days.includes(d.n)).map((d) => ({
      n: d.n,
      date: d.date,
      meals: MEALS.map(([key, label]) => ({ key, label, name: RECIPES[d.meals[key]].name })),
      nutrition: dayNutrition(d, RECIPES, INGREDIENTS)
    }));
    return {
      ...base,
      hasPlan: true,
      picks: { used: plan.favUsed || 0, total: plan.favTotal || 0 },
      start: plan.startDate,
      end: addDays(plan.startDate, 13),
      doneDays: checks.days.length,
      days
    };
  }

  function groceryView() {
    if (!record) return { hasPlan: false };
    const list = shoppingList();
    const { actuals, checks } = record;
    const bought = checks.shop;
    const toBuy = list.filter((i) => !bought.includes(i.id));
    return {
      hasPlan: true,
      started: record.trip,
      summary: tripSummary(list, config, actuals, bought),
      active: ui.section,
      sections: SECTIONS.map((g) => ({
        key: g,
        title: GROUPS[g],
        items: toBuy.filter((i) => i.group === g).map((i) => ({ ...i, paid: actuals[i.id] ?? null }))
      })),
      bought: list.filter((i) => bought.includes(i.id)).map((i) => ({ ...i, paid: actuals[i.id] ?? i.cost }))
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
    const mult = snackAmount(R, current.days.length);   // amounts for this session only
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
          forText: R.yield === 1 ? `${current.days.length} servings (days ${first}–${last})` : R.type !== "main" ? `${current.days.length} servings from a batch of ${R.yield} (days ${first}–${last})` : `${R.yield} portions`,
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
      case "add-pick":
        if (p.value && RECIPES[p.value] && !prefs.picks[p.type].includes(p.value)) {
          prefs.picks[p.type].push(p.value);
          store.savePrefs(prefs);
        }
        break;
      case "remove-pick":
        prefs.picks[p.type] = prefs.picks[p.type].filter((id) => id !== p.id);
        store.savePrefs(prefs);
        break;
      case "generate": {
        const favourites = prefs.picks;
        record = emptyRecord(generatePlan({
          recipes: RECIPES, ingredients: INGREDIENTS, favourites,
          startISO: addDays(now(), 1), config, rng
        }));
        ui.cookId = null;
        ui.tab = "plan";
        save();
        break;
      }
      case "draft":
        if (p.field in ui.draft) ui.draft[p.field] = String(p.value || "");
        ui.draftError = "";
        break;
      case "save-dish": {
        const name = ui.draft.name.trim(), description = ui.draft.description.trim();
        if (!name) { ui.draftError = "Please enter a name for the dish."; break; }
        dishes = [...dishes, { id: "u" + Date.now(), name, category: ui.draft.category, description }];
        store.saveDishes(dishes);
        ui.draft = { name: "", category: ui.draft.category, description: "" };
        ui.draftError = "";
        break;
      }
      case "delete-dish":
        dishes = dishes.filter((d) => d.id !== p.id);
        store.saveDishes(dishes);
        break;
      case "toggle-day":
        if (record) { toggle(record.checks.days, Number(p.n)); save(); }
        break;
      case "restore-days":
        if (record) { record.checks.days = []; save(); }
        break;
      case "start-shopping":
        if (record) {
          record.trip = true;
          record.checks.shop = [];   // paid starts at zero
          record.actuals = {};
          save();
        }
        break;
      case "reset-shopping":
        if (record) {
          record.trip = false;
          record.checks.shop = [];
          record.actuals = {};
          save();
        }
        break;
      case "buy":
        if (record && record.trip && !record.checks.shop.includes(p.id)) { record.checks.shop.push(p.id); save(); }
        break;
      case "unbuy":
        if (record) { toggle(record.checks.shop, p.id); save(); }
        break;
      case "set-price":
        if (record) {
          const v = parseFloat(p.value);
          if (Number.isFinite(v) && v >= 0) record.actuals[p.id] = Math.round(v);
          else delete record.actuals[p.id];
          save();
        }
        break;
      case "toggle-cook":
        if (record) { toggle(record.checks.cook, p.id); save(); }
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
    return { ui: { ...ui, draft: { ...ui.draft } }, plan: planView(), grocery: groceryView(), cook: cookView(), dishes: { list: dishes, draft: ui.draft, error: ui.draftError } };
  }

  return { dispatch, view };
}
