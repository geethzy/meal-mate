// CORE LAYER: shopping list and budget (pure).

// How much of a recipe a session needs. Breakfasts and snacks are cooked in batches (e.g. 8 servings) and a
// session only eats its own days, so it takes that share of the batch. Lunch and dinner are cooked whole.
export function snackAmount(recipe, servings) {
  if (recipe.type === "main") return 1;            // lunch and dinner are cooked whole, once per session
  return servings / recipe.yield;                  // breakfast, snack and drink batches are shared across the session
}

// One consolidated list for the whole plan.
// Breakfast, snack and drink repeat for every day of a session; lunch and dinner are cooked once per session.
export function buildShoppingList(plan, recipes, ingredients) {
  const need = {};
  const add = (rid, mult) => {
    for (const [id, qty] of Object.entries(recipes[rid].ing)) need[id] = (need[id] || 0) + qty * mult;
  };
  for (const s of plan.sessions) {
    const servings = s.days.length;
    add(s.dishes.breakfast, snackAmount(recipes[s.dishes.breakfast], servings));
    add(s.dishes.snack, snackAmount(recipes[s.dishes.snack], servings));
    add(s.dishes.drink, snackAmount(recipes[s.dishes.drink], servings));
    add(s.dishes.lunch, 1);
    add(s.dishes.dinner, 1);
  }
  return Object.entries(need)
    .map(([id, q]) => {
      const I = ingredients[id];
      const qty = I.unit === "pc" ? Math.ceil(q) : Math.round(q);
      return { id, name: I.name, unit: I.unit, group: I.group, qty, cost: Math.round(qty * I.price) };
    })
    .sort((a, b) => a.group.localeCompare(b.group) || a.name.localeCompare(b.name));
}

// Budget. Items you have priced use the price you paid; the rest use estimates.
// actuals: { [ingredientId]: LKR paid for the quantity on the list }
export function budgetSummary(list, config, actuals = {}) {
  const b = config.budget;
  const estimate = list.reduce((s, i) => s + i.cost, 0);
  let items = 0, spent = 0, priced = 0;
  for (const i of list) {
    const paid = actuals[i.id];
    if (paid != null) { items += paid; spent += paid; priced++; }
    else items += i.cost;
  }
  const pantry = b.pantryTopUp;
  const contingency = Math.round((items + pantry) * b.contingencyRate);
  const total = items + pantry + contingency;
  return {
    estimate: Math.round((estimate + pantry) * (1 + b.contingencyRate)),
    items, pantry, contingency, total,
    target: b.fortnight, remaining: b.fortnight - total,
    spent, priced, count: list.length, monthly: b.month
  };
}

// Live shopping trip. Items you have bought leave the to-buy list and count as spent.
// Unbought items count at the price you typed, or the estimate if none. Pantry top-up and contingency apply.
export function tripSummary(list, config, actuals, bought) {
  const b = config.budget;
  let spent = 0, toBuy = 0, boughtCount = 0;
  for (const i of list) {
    const paid = actuals[i.id] ?? i.cost;
    if (bought.includes(i.id)) { spent += paid; boughtCount++; }
    else toBuy += paid;
  }
  const subtotal = spent + toBuy + b.pantryTopUp;
  const contingency = Math.round(subtotal * b.contingencyRate);
  const total = subtotal + contingency;
  return {
    budget: b.fortnight,
    spent: Math.round(spent), toBuy: Math.round(toBuy), pantry: b.pantryTopUp,
    contingency, total, left: b.fortnight - total,
    boughtCount, count: list.length
  };
}
