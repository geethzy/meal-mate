// Meal Mate: data and planning logic.
// Amounts are grams (g), millilitres (ml) or pieces (pc).
// k = kcal per unit, p = protein (g) per unit, c = ESTIMATED LKR per unit.
// Prices are estimates for Sri Lankan supermarkets, not checked shelf prices.

const BUDGET_MONTH = 30000;
const BUDGET_FORTNIGHT = 15000;
const CONTINGENCY_RATE = 0.10;
const PANTRY_TOPUP = 300; // estimate: salt, pepper, misc spices

const GROUPS = { P: "Protein & dairy", G: "Grains & pantry", V: "Vegetables & fruit" };

const ING = {
  chicken:    { n: "Chicken breast, boneless", u: "g",  g: "P", k: 1.2,  p: 0.31,  c: 1.5 },
  fish:       { n: "Seer fish fillet",          u: "g",  g: "P", k: 1.1,  p: 0.20,  c: 1.8 },
  eggs:       { n: "Eggs",                      u: "pc", g: "P", k: 72,   p: 6.3,   c: 50 },
  tuna:       { n: "Tuna in water, drained",    u: "g",  g: "P", k: 1.0,  p: 0.25,  c: 2.4 },
  sardines:   { n: "Sardines, drained (no added sugar)", u: "g", g: "P", k: 2.0, p: 0.25, c: 2.6 },
  yoghurt:    { n: "Plain yoghurt, unsweetened", u: "g", g: "P", k: 0.6,  p: 0.04,  c: 0.8 },
  milk:       { n: "Fresh milk",                u: "ml", g: "P", k: 0.62, p: 0.034, c: 0.4 },
  pb:         { n: "Peanut butter (no added sugar)", u: "g", g: "G", k: 5.9, p: 0.25, c: 3.2 },
  almonds:    { n: "Almonds, raw",              u: "g",  g: "G", k: 5.8,  p: 0.21,  c: 5.0 },
  choc:       { n: "Dark chocolate 85%",        u: "g",  g: "G", k: 6.0,  p: 0.12,  c: 6.0 },
  redrice:    { n: "Red rice, dry",             u: "g",  g: "G", k: 3.5,  p: 0.075, c: 0.35 },
  oats:       { n: "Rolled oats",               u: "g",  g: "G", k: 3.9,  p: 0.13,  c: 1.4 },
  bread:      { n: "Wholewheat bread slice",    u: "pc", g: "G", k: 85,   p: 3.2,   c: 18 },
  tea:        { n: "Tea leaves",                u: "g",  g: "G", k: 0,    p: 0,     c: 4.0 },
  coffee:     { n: "Instant coffee",            u: "g",  g: "G", k: 0.02, p: 0.1,   c: 8 },
  cinn:       { n: "Cinnamon",                  u: "g",  g: "G", k: 2.5,  p: 0.04,  c: 6 },
  soy:        { n: "Soy sauce",                 u: "ml", g: "G", k: 0.53, p: 0.08,  c: 1.5 },
  oliveoil:   { n: "Cooking oil (sunflower or coconut blend)",                 u: "ml", g: "G", k: 8.8,  p: 0,     c: 2.0 },
  coconut:    { n: "Coconut oil",               u: "ml", g: "G", k: 8.6,  p: 0,     c: 2.0 },
  curry:      { n: "Curry powder",              u: "g",  g: "G", k: 3.2,  p: 0.14,  c: 3.5 },
  sweetpotato:{ n: "Sweet potato",              u: "g",  g: "V", k: 0.86, p: 0.016, c: 0.35 },
  greenbeans: { n: "Green beans",               u: "g",  g: "V", k: 0.31, p: 0.018, c: 0.6 },
  cabbage:    { n: "Cabbage",                   u: "g",  g: "V", k: 0.25, p: 0.013, c: 0.3 },
  carrot:     { n: "Carrots",                   u: "g",  g: "V", k: 0.41, p: 0.009, c: 0.3 },
  onion:      { n: "Onions",                    u: "g",  g: "V", k: 0.4,  p: 0.011, c: 0.25 },
  garlic:     { n: "Garlic",                    u: "g",  g: "V", k: 1.49, p: 0.064, c: 1.5 },
  ginger:     { n: "Ginger",                    u: "g",  g: "V", k: 0.8,  p: 0.018, c: 1.0 },
  tomato:     { n: "Tomatoes",                  u: "g",  g: "V", k: 0.18, p: 0.009, c: 0.35 },
  cucumber:   { n: "Cucumber",                  u: "g",  g: "V", k: 0.15, p: 0.007, c: 0.3 },
  lime:       { n: "Lime",                      u: "pc", g: "V", k: 20,   p: 0.5,   c: 25 },
  papaya:     { n: "Papaya",                    u: "g",  g: "V", k: 0.43, p: 0.005, c: 0.35 },
  guava:      { n: "Guava",                     u: "g",  g: "V", k: 0.68, p: 0.026, c: 0.5 },
  chilli:     { n: "Green chilli",              u: "pc", g: "V", k: 4,    p: 0.1,   c: 10 }
};

// Breakfasts, snacks and drinks: amounts are PER SERVING (yield 1).
// Lunch and dinner: amounts are for the WHOLE BATCH (yield 4 portions).
const RECIPES = {
  B1: { type: "breakfast", name: "Tomato & Egg Toast", time: 12, yield: 1,
    desc: "Soft-scrambled eggs with tomato and onion on wholewheat toast.",
    ing: { eggs: 2, bread: 1, tomato: 60, onion: 20, oliveoil: 5 },
    steps: ["Finely chop the tomato and onion.", "Warm the oil, soften the onion for 2 minutes, then add the tomato for 2 minutes.", "Beat the eggs with a pinch of salt, pour them in and stir gently until just set.", "Serve on toasted wholewheat bread."],
    storage: "Make fresh each morning. Takes about 10 minutes." },
  B2: { type: "breakfast", name: "Yoghurt Power Bowl", time: 6, yield: 1,
    desc: "Plain yoghurt with oats, papaya, almonds and cinnamon, plus a boiled egg.",
    ing: { yoghurt: 150, oats: 30, almonds: 5, papaya: 80, cinn: 1, eggs: 1 },
    steps: ["Boil the egg for 8 minutes, cool and peel.", "Dry-toast the oats and almonds in a pan for 2 minutes.", "Spoon yoghurt into a bowl, top with papaya, oats, almonds and cinnamon.", "Serve the egg on the side."],
    storage: "Assemble fresh. Boil eggs in batches on prep days and keep them chilled up to 3 days." },
  B3: { type: "breakfast", name: "Sardine & Egg Toast", time: 10, yield: 1,
    desc: "Mashed sardines with tomato and fried eggs on wholewheat toast.",
    ing: { eggs: 2, bread: 1, sardines: 60, tomato: 50, onion: 15, oliveoil: 5 },
    steps: ["Mash the sardines with the chopped onion and tomato.", "Fry the eggs in a little oil.", "Toast the bread and pile the sardine mix and eggs on top."],
    storage: "Make fresh. Do not keep the sardine mix more than a day." },
  B4: { type: "breakfast", name: "Cinnamon Milk Oats", time: 8, yield: 1,
    desc: "Warm oats cooked in milk, topped with yoghurt, peanut butter and almonds.",
    ing: { oats: 40, milk: 150, yoghurt: 60, cinn: 1, pb: 10 },
    steps: ["Simmer the oats in the milk for 4 to 5 minutes, stirring.", "Stir in the cinnamon.", "Top with yoghurt, peanut butter and almonds."],
    storage: "Eat fresh. Do not reheat leftovers; make a new bowl instead." },

  SA: { type: "snack", name: "Dark Chocolate & Almonds", time: 2, yield: 1, sweet: true,
    desc: "Two squares of 85% dark chocolate with a small handful of almonds.",
    ing: { choc: 10, almonds: 10 },
    steps: ["Portion into a small box and enjoy slowly."],
    storage: "Keep in an airtight tin at room temperature." },
  SB: { type: "snack", name: "Cinnamon Yoghurt Bowl", time: 2, yield: 1, sweet: true,
    desc: "Plain yoghurt sprinkled with cinnamon and almonds.",
    ing: { yoghurt: 100, almonds: 5, cinn: 1 },
    steps: ["Spoon yoghurt into a bowl.", "Sprinkle over cinnamon and crushed almonds."],
    storage: "Keep chilled and eat within 24 hours." },
  SC: { type: "snack", name: "Egg & Cucumber Bites", time: 4, yield: 1, sweet: false,
    desc: "Boiled egg slices and cucumber rounds with black pepper.",
    ing: { eggs: 1, cucumber: 100 },
    steps: ["Slice a boiled egg and the cucumber.", "Season with salt and black pepper."],
    storage: "Keep the boiled egg chilled and eat within 3 days." },
  SD: { type: "snack", name: "Tuna & Cucumber Cups", time: 5, yield: 1, sweet: false,
    desc: "Tuna mixed with plain yoghurt, spooned onto cucumber rounds.",
    ing: { tuna: 60, cucumber: 80, yoghurt: 30 },
    steps: ["Mix the tuna with the yoghurt, black pepper and a pinch of chilli flakes.", "Spoon onto cucumber rounds."],
    storage: "Make on the day and keep chilled until eaten." },
  SE: { type: "snack", name: "Guava & Peanut Butter", time: 3, yield: 1, sweet: true,
    desc: "Fresh guava slices with a spoonful of unsweetened peanut butter.",
    ing: { guava: 150, pb: 10 },
    steps: ["Slice the guava.", "Dip the slices in peanut butter or spread it on top."],
    storage: "Eat fresh." },
  SF: { type: "snack", name: "Protein Chocolate-Chip Oat Cookies", time: 25, yield: 1, sweet: true,
    desc: "Two small oat cookies with peanut butter and dark chocolate chips. Bake a tray on a prep day.",
    ing: { oats: 20, pb: 10, choc: 5, eggs: 0.5 },
    steps: ["Mash the peanut butter with the egg, then stir in the oats and chopped chocolate.", "Shape into small cookies on a lined tray (about 4 per egg).", "Bake at 180 C for 10 to 12 minutes. Cool fully."],
    storage: "Keep in an airtight tin for up to 5 days, or freeze extras." },

  H1: { type: "drink", name: "Ginger Tea", time: 8, yield: 1,
    desc: "Fresh ginger simmered in water. No sugar.",
    ing: { ginger: 6 },
    steps: ["Slice the ginger thinly and simmer in 250 ml water for 5 minutes.", "Strain and drink hot."],
    storage: "Make fresh." },
  H2: { type: "drink", name: "Plain Tea", time: 5, yield: 1,
    desc: "Simple black tea. No sugar.",
    ing: { tea: 2 },
    steps: ["Steep the tea in hot water for 3 to 4 minutes.", "Strain and drink plain."],
    storage: "Make fresh." },
  H3: { type: "drink", name: "Cinnamon Tea", time: 6, yield: 1,
    desc: "Black tea with a warming cinnamon stick. No sugar.",
    ing: { tea: 2, cinn: 1 },
    steps: ["Add the cinnamon to 250 ml water and simmer for 3 minutes.", "Add the tea, steep 3 minutes and strain."],
    storage: "Make fresh." },
  H4: { type: "drink", name: "Coffee with Milk", time: 4, yield: 1,
    desc: "Instant coffee with warm milk. No sugar.",
    ing: { coffee: 3, milk: 120 },
    steps: ["Dissolve the coffee in a little hot water.", "Warm the milk and pour it in."],
    storage: "Make fresh." },

  // Batch recipes: one cook covers 4 portions of lunch or dinner.
  L1: { type: "lunch", name: "Ginger-Garlic Chicken & Red Rice", time: 45, yield: 4,
    desc: "Stir-fried chicken with cabbage and carrot over red rice.",
    ing: { chicken: 500, redrice: 320, cabbage: 400, carrot: 240, onion: 100, garlic: 15, ginger: 15, soy: 40, oliveoil: 20 },
    steps: ["Cook the red rice in 2 times its volume of water for 25 to 30 minutes. Fluff and divide into 4 boxes.", "Cut the chicken into bite-size pieces. Marinate in soy, garlic and ginger for 10 minutes.", "Sear the chicken in hot oil for 5 to 6 minutes until cooked through. Set aside.", "Stir-fry the onion, carrot and shredded cabbage for 5 minutes, return the chicken and toss together. Divide into 4."],
    storage: "Cool within 1 hour and refrigerate. Eat all 4 portions within 3 days.",
    reheat: "Microwave with a splash of water until steaming hot all the way through." },
  L2: { type: "lunch", name: "Tuna & Egg Sweet Potato Salad", time: 40, yield: 4,
    desc: "Roasted sweet potato, green beans, tuna and halved eggs with a lime and chilli dressing.",
    ing: { tuna: 200, eggs: 4, sweetpotato: 800, greenbeans: 400, onion: 80, lime: 2, oliveoil: 30, chilli: 2 },
    steps: ["Cube the sweet potato and boil for 12 to 15 minutes until just tender. Drain and cool.", "Boil the green beans for 4 minutes, then refresh in cold water.", "Hard-boil the 4 eggs for 9 minutes, cool, peel and halve.", "Toss the tuna, sliced onion and chilli with lime juice and olive oil. Combine everything and divide into 4."],
    storage: "Keep chilled and eat within 3 days.",
    reheat: "Eat cold, or warm the sweet potato briefly in the microwave." },
  L3: { type: "lunch", name: "Tandoori-Style Chicken with Cucumber Raita", time: 50, yield: 4,
    desc: "Spiced chicken cubes with a cool yoghurt and cucumber side, plus tomato and onion.",
    ing: { chicken: 400, sweetpotato: 400, yoghurt: 300, cucumber: 400, tomato: 300, onion: 100, garlic: 15, ginger: 15, curry: 20, lime: 1, oliveoil: 15 },
    steps: ["Cut the chicken into cubes. Mix with curry powder, garlic, ginger, lime juice and 100 g of the yoghurt. Marinate 20 minutes or more.", "Add 400 g sweet potato cubes to the tray and bake at 200 C for 20 minutes until the chicken is cooked through. Divide into 4.", "Grate the cucumber and squeeze out the water. Mix with the remaining yoghurt and a pinch of salt for the raita.", "Lightly sauté the onion and tomato for 5 minutes to serve as a side."],
    storage: "Keep chicken and raita in separate boxes. Eat within 3 days.",
    reheat: "Reheat the chicken until steaming. Serve the raita cold." },
  L4: { type: "lunch", name: "Sardine & Egg Sweet Potato Bake", time: 50, yield: 4,
    desc: "A cabbage and tomato bake with sardines, eggs and roasted sweet potato.",
    ing: { sardines: 200, eggs: 4, sweetpotato: 800, cabbage: 400, tomato: 300, onion: 100, garlic: 10, oliveoil: 20 },
    steps: ["Preheat the oven to 200 C. Cube the sweet potato, toss with 1 tablespoon of oil and roast for 25 minutes.", "Sauté the onion, garlic, shredded cabbage and tomato for 6 minutes.", "Mash in the sardines. Beat the 4 eggs, pour over and cook until just set.", "Add the roasted sweet potato, stir gently and divide into 4."],
    storage: "Cool within 1 hour and refrigerate. Eat within 3 days.",
    reheat: "Microwave until steaming hot all the way through." },

  D1: { type: "dinner", name: "Ginger Chicken & Egg Drop Soup", time: 35, yield: 4,
    desc: "Light ginger broth with chicken, vegetables and silky egg ribbons.",
    ing: { chicken: 300, eggs: 4, carrot: 200, cabbage: 200, onion: 60, ginger: 20, garlic: 10, soy: 30, oliveoil: 10 },
    steps: ["Fry the onion, ginger and garlic in the oil for 2 minutes.", "Add 1.5 litres water and the chicken pieces. Simmer 15 minutes.", "Add the carrot and cabbage and cook 8 minutes. Stir in the soy sauce.", "Beat the eggs and swirl them slowly into the simmering soup. Ladle into 4 containers."],
    storage: "Cool quickly and refrigerate. Eat within 3 days.",
    reheat: "Reheat on the hob or in the microwave until steaming hot. Add a splash of water if needed." },
  D2: { type: "dinner", name: "Seer Fish & Tomato Curry with Red Rice", time: 40, yield: 4,
    desc: "A tomato and coconut curry with fish, green beans and red rice.",
    ing: { fish: 400, tomato: 500, onion: 200, garlic: 15, ginger: 15, curry: 15, coconut: 20, greenbeans: 200, redrice: 280 },
    steps: ["Cook the red rice in 2 times its volume of water for 25 to 30 minutes. Divide into 4.", "Fry the onion, garlic, ginger and curry powder in coconut oil for 4 minutes.", "Add the tomato and cook 8 minutes until soft. Add 300 ml water and the green beans for 5 minutes.", "Add the fish cubes and simmer 6 to 8 minutes until cooked. Divide into 4 with the rice."],
    storage: "Fish is best eaten fresh. Eat portions 1 and 2 within 2 days. Freeze portions 3 and 4 on the day you cook and thaw overnight in the fridge.",
    reheat: "Reheat until bubbling hot, once only." },
  D3: { type: "dinner", name: "Low-Carb Cabbage Kottu with Egg & Chicken", time: 35, yield: 4,
    desc: "Sri Lankan-style kottu made with cabbage instead of roti. No flour.",
    ing: { chicken: 400, eggs: 6, cabbage: 500, carrot: 200, onion: 150, garlic: 10, soy: 20, oliveoil: 20, chilli: 2 },
    steps: ["Cut the chicken into small pieces and fry in oil with soy sauce for 6 to 7 minutes until cooked.", "Add the onion, garlic, sliced chilli, shredded carrot and cabbage. Stir-fry for 5 minutes.", "Beat the eggs and scramble them into the pan. Chop everything together with two spatulas, kottu-style.", "Divide into 4."],
    storage: "Cool within 1 hour and refrigerate. Eat within 3 days.",
    reheat: "Stir-fry in a hot pan for 3 to 4 minutes until steaming." },
  D4: { type: "dinner", name: "Peanut Chicken Satay with Cucumber Salad", time: 35, yield: 4,
    desc: "Chicken in a no-sugar peanut sauce with a crunchy cabbage and cucumber salad.",
    ing: { chicken: 400, pb: 90, soy: 40, garlic: 10, ginger: 10, lime: 2, cucumber: 400, cabbage: 200, onion: 40, oliveoil: 10, chilli: 1 },
    steps: ["Mix the peanut butter with soy sauce, garlic, ginger and 100 ml hot water into a smooth sauce.", "Pan-fry the chicken pieces in oil for 6 to 7 minutes. Pour in the sauce and simmer 3 minutes until thick.", "Shred the cabbage and slice the onion and cucumber. Toss with lime juice and chilli for the salad.", "Divide the chicken and the salad into 4 boxes."],
    storage: "Keep the chicken and salad separate. Eat within 3 days.",
    reheat: "Reheat the chicken until steaming. Serve the salad cold." }
};

// Meal rotation for the 14 days
const BREAKFASTS = ["B1", "B2", "B3", "B4"];
const SNACKS = ["SA", "SC", "SB", "SD", "SF", "SC", "SA", "SD", "SB", "SC", "SE", "SD", "SA", "SF"];
const DRINKS = ["H1", "H2", "H3", "H4"];

// Four batch-cook sessions (about twice a week)
const BLOCKS = [
  { no: 1, lunch: "L1", dinner: "D1", days: [1, 2, 3, 4], portions: 4,
    note: "Eat every portion from the fridge by day 4 (3 days maximum)." },
  { no: 2, lunch: "L2", dinner: "D2", days: [5, 6, 7, 8], portions: 4,
    note: "Eat the fish curry portions 1 and 2 within 2 days, and freeze portions 3 and 4 on the day you cook." },
  { no: 3, lunch: "L3", dinner: "D3", days: [9, 10, 11, 12], portions: 4,
    note: "Eat every portion from the fridge by day 12 (3 days maximum)." },
  { no: 4, lunch: "L4", dinner: "D4", days: [13, 14], portions: 4,
    note: "Eat days 13 and 14 from the fridge. Freeze the 2 spare lunches and 2 spare dinners for days 15 and 16." }
];

function blockFor(day) { return BLOCKS.find(b => b.days.includes(day)); }

function mealsForDay(day) {
  const b = blockFor(day);
  return {
    breakfast: BREAKFASTS[(day - 1) % 4],
    lunch: b.lunch,
    dinner: b.dinner,
    snack: SNACKS[day - 1],
    drink: DRINKS[(day - 1) % 4]
  };
}

// Protein and kcal per portion/serving, calculated from ingredient amounts
function nutri(rid) {
  const r = RECIPES[rid];
  let k = 0, p = 0;
  for (const [i, q] of Object.entries(r.ing)) { k += q * ING[i].k; p += q * ING[i].p; }
  return { kcal: Math.round(k / r.yield), prot: Math.round(p / r.yield) };
}

// Consolidated shopping list for all 14 days
function shoppingList() {
  const need = {};
  const add = (rid, mult) => {
    for (const [id, q] of Object.entries(RECIPES[rid].ing)) need[id] = (need[id] || 0) + q * mult;
  };
  for (let d = 1; d <= 14; d++) {
    const m = mealsForDay(d);
    add(m.breakfast, 1); add(m.snack, 1); add(m.drink, 1);
  }
  BLOCKS.forEach(b => { add(b.lunch, 1); add(b.dinner, 1); }); // one cook per batch
  return Object.entries(need).map(([id, q]) => {
    const I = ING[id];
    const qty = I.u === "pc" ? Math.ceil(q) : Math.round(q);
    return { id, name: I.n, unit: I.u, group: I.g, qty, cost: Math.round(qty * I.c) };
  }).sort((a, b) => a.group.localeCompare(b.group) || a.name.localeCompare(b.name));
}

function budgetSummary(list) {
  const items = list.reduce((s, i) => s + i.cost, 0);
  const sub = items + PANTRY_TOPUP;
  const contingency = Math.round(sub * CONTINGENCY_RATE);
  const total = sub + contingency;
  return { items, pantry: PANTRY_TOPUP, contingency, total, remaining: BUDGET_FORTNIGHT - total };
}

if (typeof module !== "undefined") {
  module.exports = { ING, RECIPES, BLOCKS, mealsForDay, nutri, shoppingList, budgetSummary };
}
