// DATA LAYER: persistence.
// "plan" holds only the current plan and its ticks (replaced on every new plan).
// "prefs" holds the dishes you picked for each meal, kept across plans.
const PLAN_KEY = "mealmate.current";
const PREFS_KEY = "mealmate.prefs";
const DISHES_KEY = "mealmate.dishes";
const MEALS = ["breakfast", "lunch", "dinner", "snack", "drink"];

const read = (key) => {
  try { return JSON.parse(localStorage.getItem(key)); } catch (e) { return null; }
};
const write = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
};

export const store = {
  load() {
    const rec = read(PLAN_KEY);
    return rec && rec.plan ? rec : null;
  },
  save(record) { write(PLAN_KEY, record); },
  loadPrefs() {
    const p = read(PREFS_KEY);
    const picks = Object.fromEntries(MEALS.map((m) => [m, []]));
    if (p && p.picks && typeof p.picks === "object") {
      for (const m of MEALS) if (Array.isArray(p.picks[m])) picks[m] = p.picks[m].filter((x) => typeof x === "string");
    }
    return { picks };
  },
  savePrefs(prefs) { write(PREFS_KEY, prefs); },
  // Dishes you add yourself (name, category and recipe text), kept across plans
  loadDishes() {
    const d = read(DISHES_KEY);
    if (!Array.isArray(d)) return [];
    return d.filter((x) => x && typeof x.id === "string")
      .map((x) => ({ id: x.id, name: String(x.name || ""), category: String(x.category || ""), description: String(x.description ?? x.recipe ?? "") }));
  },
  saveDishes(dishes) { write(DISHES_KEY, dishes); },
  // Remove keys left behind by earlier versions of the app
  purgeLegacy() {
    try {
      Object.keys(localStorage).filter((k) => k.startsWith("mm."))
        .forEach((k) => localStorage.removeItem(k));
    } catch (e) {}
  }
};
