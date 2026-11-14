// CORE LAYER: nutrition maths (pure). Works from recipe amounts and catalogue values.
const KEYS = ["kcal", "protein", "fat", "sugar", "fiber"];
const round = (n, dp = 0) => Math.round(n * 10 ** dp) / 10 ** dp;

// Nutrition for ONE portion (or one serving) of a recipe
export function recipeNutrition(recipe, ingredients) {
  const total = Object.fromEntries(KEYS.map((k) => [k, 0]));
  for (const [id, qty] of Object.entries(recipe.ing)) {
    const I = ingredients[id];
    for (const k of KEYS) total[k] += qty * I[k];
  }
  return Object.fromEntries(KEYS.map((k) => [k, round(total[k] / recipe.yield, k === "kcal" ? 0 : 1)]));
}

// Totals for one plan day, summing each meal's per-portion values
export function dayNutrition(day, recipes, ingredients) {
  const sum = Object.fromEntries(KEYS.map((k) => [k, 0]));
  for (const rid of Object.values(day.meals)) {
    const n = recipeNutrition(recipes[rid], ingredients);
    for (const k of KEYS) sum[k] += n[k];
  }
  return Object.fromEntries(KEYS.map((k) => [k, round(sum[k], k === "kcal" ? 0 : 1)]));
}

// Mean of several day totals
export function averageNutrition(days) {
  const avg = Object.fromEntries(KEYS.map((k) => [k, 0]));
  if (!days.length) return avg;
  for (const d of days) for (const k of KEYS) avg[k] += d[k];
  return Object.fromEntries(KEYS.map((k) => [k, round(avg[k] / days.length, k === "kcal" ? 0 : 1)]));
}

// Compare averages with the goals in CONFIG.targets
export function checkTargets(avg, targets) {
  return [
    { key: "protein", label: targets.protein.label, value: avg.protein, unit: "g", goal: `at least ${targets.protein.min} g`, ok: avg.protein >= targets.protein.min },
    { key: "fiber", label: targets.fiber.label, value: avg.fiber, unit: "g", goal: `at least ${targets.fiber.min} g`, ok: avg.fiber >= targets.fiber.min },
    { key: "sugar", label: targets.sugar.label, value: avg.sugar, unit: "g", goal: `at most ${targets.sugar.max} g`, ok: avg.sugar <= targets.sugar.max },
    { key: "fat", label: targets.fat.label, value: avg.fat, unit: "g", goal: `at most ${targets.fat.max} g`, ok: avg.fat <= targets.fat.max }
  ];
}
