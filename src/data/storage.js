// DATA LAYER: persistence.
// "plan" holds only the current plan and its ticks (replaced on every new plan).
// "prefs" holds the foods you like for each meal, kept across plans.
const PLAN_KEY = "mealmate.current";
const PREFS_KEY = "mealmate.prefs";
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
    const likes = Object.fromEntries(MEALS.map((m) => [m, ""]));
    if (p && p.likes && typeof p.likes === "object") {
      for (const m of MEALS) if (typeof p.likes[m] === "string") likes[m] = p.likes[m];
    }
    return { likes };
  },
  savePrefs(prefs) { write(PREFS_KEY, prefs); },
  // Remove keys left behind by earlier versions of the app
  purgeLegacy() {
    try {
      Object.keys(localStorage).filter((k) => k.startsWith("mm."))
        .forEach((k) => localStorage.removeItem(k));
    } catch (e) {}
  }
};
