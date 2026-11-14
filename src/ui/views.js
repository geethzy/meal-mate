// UI LAYER: turns view models into HTML. No state, no storage, no business rules.
import { esc, lkr, num, qty, homeQty, date } from "./format.js";

const ICON = {
  pot: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11h16v4.5a4.5 4.5 0 0 1-4.5 4.5h-7A4.5 4.5 0 0 1 4 15.5z"/><path d="M2.5 12.5h1.5M20 12.5h1.5M7 4c0 1.2 1 1.2 1 2.4M11 4c0 1.2 1 1.2 1 2.4M15 4c0 1.2 1 1.2 1 2.4"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4.5" width="18" height="16" rx="3"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></svg>`,
  cart: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2.2l2.3 11h10.4l2-8H6.4"/><circle cx="9.5" cy="19.5" r="1.4"/><circle cx="17" cy="19.5" r="1.4"/></svg>`
};
const TABS = [
  { key: "plan", label: "Plan", icon: ICON.calendar },
  { key: "grocery", label: "Grocery", icon: ICON.cart },
  { key: "cook", label: "Cook", icon: ICON.pot },
  { key: "dishes", label: "Add dish", icon: ICON.plus }
];

const DISH_CATEGORIES = [["breakfast", "Breakfast"], ["lunch", "Lunch"], ["dinner", "Dinner"], ["snack", "Snack"], ["drink", "Hot drink"]];

export function page(vm) {
  const screen = { plan: planScreen, grocery: groceryScreen, cook: cookScreen, dishes: dishesScreen }[vm.ui.tab](vm);
  const canNew = vm.plan.status !== "active";
  return `
    <header class="top">
      <div class="brand"><span class="logo">${ICON.pot}</span>Meal Mate</div>
      ${canNew ? `<button class="btn" data-action="tab" data-tab="plan">New plan</button>` : ""}
    </header>
    <nav class="tabs" aria-label="Sections">
      ${TABS.map((t) => `
        <button data-action="tab" data-tab="${t.key}" class="${vm.ui.tab === t.key ? "on" : ""}" aria-current="${vm.ui.tab === t.key}">
          ${t.icon}<span>${t.label}</span>
        </button>`).join("")}
    </nav>
    <main class="screen">${screen}</main>`;
}

const noPlan = () => `<section class="card empty"><p>No active plan. Create one on the <b>Plan</b> tab.</p></section>`;

// ---------- Add dish ----------
function dishesScreen(vm) {
  const d = vm.dishes;
  const catLabel = Object.fromEntries(DISH_CATEGORIES);
  return `
    <h2>Add a dish</h2>
    <section class="card">
      <label class="like-label" for="dish-name"><b>Dish name</b></label>
      <input id="dish-name" class="inp full" type="text" value="${esc(d.draft.name)}" maxlength="80"
        placeholder="e.g. Salmon rice bowl" data-action="draft" data-field="name" autocomplete="off">

      <label class="like-label" for="dish-cat"><b>Category</b></label>
      <select id="dish-cat" class="inp full" data-action="draft" data-field="category">
        ${DISH_CATEGORIES.map(([k, l]) => `<option value="${k}" ${d.draft.category === k ? "selected" : ""}>${l}</option>`).join("")}
      </select>

      <label class="like-label" for="dish-desc"><b>Description</b></label>
      <textarea id="dish-desc" class="inp full recipe-box" rows="6" maxlength="4000"
        placeholder="What is it, roughly what goes in it, any notes" data-action="draft" data-field="description">${esc(d.draft.description)}</textarea>

      ${d.error ? `<p class="off small">${esc(d.error)}</p>` : ""}
      <button class="btn full big-btn" data-action="save-dish">Save dish</button>
      <p class="muted small">Saved as a memo on this phone. Nothing is added to the recipe list yet. Export the memo to add dishes in bulk later.</p>
    </section>

    <div class="row between"><h2>Memo (${d.list.length})</h2>${d.list.length ? `<button class="btn ghost small-btn" data-action="export-dishes">Export memo</button>` : ""}</div>
    ${d.list.length ? d.list.map((x) => `
      <section class="card">
        <div class="row between">
          <span class="tag">${esc(catLabel[x.category] || x.category)}</span>
          <button class="btn ghost small-btn" data-action="delete-dish" data-id="${x.id}">Delete</button>
        </div>
        <div class="rname">${esc(x.name)}</div>
        <p class="small recipe-text">${esc(x.description)}</p>
      </section>`).join("") : `<section class="card empty"><p>No dishes yet.</p></section>`}`;
}

// ---------- Plan ----------
function planScreen(vm) {
  const p = vm.plan;
  if (p.status === "active") {
    const left = p.days.length;
    return `
      <p class="meta">${date(p.start)} to ${date(p.end)} · ${left} day${left === 1 ? "" : "s"} left · ${p.doneDays} done</p>
      ${p.picks && p.picks.total ? `<p class="meta">${p.picks.used} of your ${p.picks.total} picks used${p.picks.used < p.picks.total ? " · the rest were swapped to stay within budget" : ""}</p>` : ""}
      ${left ? p.days.map(day).join("") : `<section class="card notice"><b>All 14 days are done.</b>
         <div class="muted small">Create the next plan when you are ready.</div></section>`}
      ${p.doneDays ? `<div class="center"><button class="btn ghost" data-action="restore-days">Restore ${p.doneDays} finished day${p.doneDays === 1 ? "" : "s"}</button></div>` : ""}`;
  }
  const notice = p.status === "ended"
    ? `<section class="card notice"><b>Your plan has ended.</b>
         <div class="muted small">It ran ${date(p.start)} to ${date(p.end)}. Tell us what you like to eat and create the next two weeks.</div></section>`
    : `<section class="card notice"><b>No plan yet.</b>
         <div class="muted small">Tell us what you like to eat, then create a two-week plan starting tomorrow.</div></section>`;
  return notice + builder(p.builder);
}

function builder(b) {
  return `
    <h2>Choose your dishes</h2>
    <p class="muted small">Pick the dishes you want for each meal from the list. Leave a meal empty and the app chooses for you. If your picks go over LKR 15,000, the app swaps in cheaper dishes and uses as few of your picks as it needs.</p>
    ${b.groups.map((g) => `
      <section class="card">
        <div class="row between"><b>${esc(g.label)}</b><span class="small muted">${g.picks.length} picked</span></div>
        <select class="inp full" data-action="add-pick" data-type="${g.key}" aria-label="Add a ${esc(g.label)} dish">
          <option value="">Choose a dish…</option>
          ${g.options.map((o) => `<option value="${o.id}">${esc(o.name)}</option>`).join("")}
        </select>
        ${g.picks.length ? `<div class="matched">${g.picks.map((p) => `
          <span class="tag pick">${esc(p.name)}
            <button class="x" data-action="remove-pick" data-type="${g.key}" data-id="${p.id}" aria-label="Remove ${esc(p.name)}">✕</button>
          </span>`).join("")}</div>` : ""}
      </section>`).join("")}
    <button class="btn full big-btn" data-action="generate">Create plan</button>`;
}

function day(d) {
  return `
    <article class="card day">
      <div class="row between">
        <div><b>Day ${d.n}</b> <span class="muted small">${date(d.date)}</span></div>
        <label class="check"><input type="checkbox" data-action="toggle-day" data-n="${d.n}"> Day done</label>
      </div>
      <ul class="meals">
        ${d.meals.map((m) => `<li><span class="k">${m.label}</span>${esc(m.name)}</li>`).join("")}
      </ul>
      <div class="nut">Protein ${d.nutrition.protein} g · Fiber ${d.nutrition.fiber} g · Fat ${d.nutrition.fat} g · Sugar ${d.nutrition.sugar} g</div>
    </article>`;
}

// ---------- Grocery (live shopping trip) ----------
function groceryScreen(vm) {
  const g = vm.grocery;
  if (!g.hasPlan) return noPlan();
  const s = g.summary;
  const over = s.left < 0;
  const budgetCard = `
    <section class="card budget">
      <div class="kv strong"><span>Budget</span><span>${lkr(s.budget)}</span></div>
      <div class="kv"><span>Spent (bought)</span><span>${lkr(s.spent)}</span></div>
      <div class="kv"><span>To buy (your prices or estimates)</span><span>${lkr(s.toBuy)}</span></div>
      <div class="kv"><span>Spice and pantry top-up</span><span>${lkr(s.pantry)}</span></div>
      <div class="kv"><span>Contingency (10%)</span><span>${lkr(s.contingency)}</span></div>
      <div class="kv"><span>Projected total</span><span>${lkr(s.total)}</span></div>
      <div class="kv strong"><span>Left in budget</span><span class="${over ? "off" : "ok"}">${over ? lkr(-s.left) + " over" : lkr(s.left)}</span></div>
    </section>`;

  if (!g.started) {
    return `
      ${budgetCard}
      <section class="card notice">
        <b>Ready to shop?</b>
        <div class="muted small">Starting a trip sets paid to zero. As you put each item in the trolley, tap Bought and it leaves the list.</div>
        <button class="btn full big-btn" data-action="start-shopping">Start shopping</button>
      </section>`;
  }

  const idx = g.sections.findIndex((x) => x.key === g.active);
  const sec = g.sections[idx];
  const prev = g.sections[(idx + 2) % 3].key, next = g.sections[(idx + 1) % 3].key;
  return `
    ${budgetCard}

    <div class="seg" role="tablist">
      ${g.sections.map((x) => `
        <button data-action="select-section" data-key="${x.key}" class="${x.key === g.active ? "on" : ""}">${esc(x.title)}</button>`).join("")}
    </div>
    <div class="stepper">
      <button class="btn ghost" data-action="select-section" data-key="${prev}">‹ Previous</button>
      <span class="muted small">Section ${idx + 1} of 3 · ${s.boughtCount} of ${s.count} bought</span>
      <button class="btn ghost" data-action="select-section" data-key="${next}">Next ›</button>
    </div>

    <h2>${esc(sec.title)} to buy</h2>
    ${sec.items.length ? `<section class="card list">
      ${sec.items.map((i) => `
        <div class="item">
          <div class="grow">
            <div class="iname">${esc(i.name)}</div>
            <small>${qty(i.unit, i.qty)} · est. ${lkr(i.cost)}</small>
          </div>
          <input class="inp price" type="number" inputmode="decimal" min="0" step="1" placeholder="${i.cost}"
            value="${i.paid ?? ""}" data-action="set-price" data-id="${i.id}" aria-label="Price paid for ${esc(i.name)}">
          <button class="btn small-btn" data-action="buy" data-id="${i.id}">Bought</button>
        </div>`).join("")}
    </section>` : `<section class="card empty"><p>Nothing left in this section.</p></section>`}

    ${g.bought.length ? `
      <h2>Bought (${g.bought.length})</h2>
      <section class="card list">
        ${g.bought.map((i) => `
          <div class="item got">
            <div class="grow"><div class="iname">${esc(i.name)}</div><small>${qty(i.unit, i.qty)}</small></div>
            <span class="strong">${lkr(i.paid)}</span>
            <button class="btn ghost small-btn" data-action="unbuy" data-id="${i.id}">Undo</button>
          </div>`).join("")}
      </section>` : ""}

    <p class="muted small">Enter the price you paid before tapping Bought. If you leave it blank, the estimate is used.</p>
    <div class="center"><button class="btn ghost" data-action="reset-shopping">End trip and reset</button></div>`;
}

// ---------- Cook ----------
function cookScreen(vm) {
  const c = vm.cook;
  if (!c.hasPlan) return noPlan();
  const s = c.selected;
  return `
    <div class="chips">
      ${c.sessions.map((x) => `
        <button class="chip ${x.selected ? "on" : ""} ${x.done ? "done" : ""}" data-action="select-cook" data-id="${x.id}">
          Cook ${x.no}<small>${date(x.date)}</small>
        </button>`).join("")}
    </div>

    <section class="card">
      <div class="row between">
        <div><b>Cook ${s.no} · ${date(s.date)}</b>
          <div class="muted small">Covers days ${s.days[0]} to ${s.days[s.days.length - 1]} · ${s.portions} portions of lunch and dinner</div></div>
        <label class="check"><input type="checkbox" data-action="toggle-cook" data-id="${s.id}" ${s.done ? "checked" : ""}> Cooked</label>
      </div>
    </section>

    <div class="dishes">
      ${s.dishes.map((d) => `
        <button class="${d.key === s.dishKey ? "on" : ""}" data-action="select-dish" data-key="${d.key}">
          <small>${d.label}</small>${esc(d.name)}
        </button>`).join("")}
    </div>

    ${dish(s.dish)}`;
}

function dish(d) {
  return `
    <article class="card">
      <h2 class="dish-title">${esc(d.name)}</h2>
      <p class="muted small">${esc(d.desc)} · ${d.time} min · for ${esc(d.forText)}</p>

      <div class="label">Ingredients</div>
      ${d.ingredients.map((i) => `
        <div class="kv"><span>${esc(i.name)}</span>
          <span class="right">${homeQty(i.ing, i.qty)}${i.each != null ? `<small class="muted"> · ${homeQty(i.ing, i.each)} each</small>` : ""}</span>
        </div>`).join("")}

      <div class="label">Method</div>
      <ol class="steps">${d.steps.map((x) => `<li>${esc(x)}</li>`).join("")}</ol>

      <div class="label">How to refrigerate</div>
      <p class="small">${esc(d.storage)}</p>
      ${d.reheat ? `<div class="label">How to reheat</div><p class="small">${esc(d.reheat)}</p>` : ""}
    </article>`;
}
