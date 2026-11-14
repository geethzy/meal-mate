// UI LAYER: turns view models into HTML. No state, no storage, no business rules.
import { esc, lkr, num, qty, homeQty, date } from "./format.js";

const ICON = {
  pot: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11h16v4.5a4.5 4.5 0 0 1-4.5 4.5h-7A4.5 4.5 0 0 1 4 15.5z"/><path d="M2.5 12.5h1.5M20 12.5h1.5M7 4c0 1.2 1 1.2 1 2.4M11 4c0 1.2 1 1.2 1 2.4M15 4c0 1.2 1 1.2 1 2.4"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4.5" width="18" height="16" rx="3"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/></svg>`,
  cart: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2.2l2.3 11h10.4l2-8H6.4"/><circle cx="9.5" cy="19.5" r="1.4"/><circle cx="17" cy="19.5" r="1.4"/></svg>`
};
const TABS = [
  { key: "plan", label: "Plan", icon: ICON.calendar },
  { key: "grocery", label: "Grocery", icon: ICON.cart },
  { key: "cook", label: "Cook", icon: ICON.pot }
];

export function page(vm) {
  const screen = { plan: planScreen, grocery: groceryScreen, cook: cookScreen }[vm.ui.tab](vm);
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

// ---------- Plan ----------
function planScreen(vm) {
  const p = vm.plan;
  if (p.status === "active") {
    return `
      <p class="meta">${date(p.start)} to ${date(p.end)} · ${p.doneDays} of 14 days done</p>
      ${p.days.map(day).join("")}`;
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
    <h2>What do you like to eat?</h2>
    <p class="muted small">Type the foods you enjoy for each meal, separated by commas. They go into your plan first. Leave a box empty to use the catalogue.</p>
    ${b.groups.map((g) => `
      <section class="card">
        <label class="like-label" for="like-${g.key}"><b>${esc(g.label)}</b></label>
        <input id="like-${g.key}" class="inp full" type="text" value="${esc(g.text)}" placeholder="${esc(g.placeholder)}"
          data-action="set-likes" data-type="${g.key}" autocomplete="off" autocapitalize="off">
        ${g.matched.length ? `<div class="matched">${g.matched.map((m) => `<span class="tag">✓ ${esc(m.name)}</span>`).join("")}</div>` : ""}
        ${g.unmatched.length ? `<p class="off small">Not in the catalogue yet: ${g.unmatched.map(esc).join(", ")}. The plan will use catalogue dishes for these.</p>` : ""}
      </section>`).join("")}
    <button class="btn full big-btn" data-action="generate">Create plan</button>`;
}

function day(d) {
  return `
    <article class="card day ${d.done ? "done" : ""}">
      <div class="row between">
        <div><b>Day ${d.n}</b> <span class="muted small">${date(d.date)}</span></div>
        <label class="check"><input type="checkbox" data-action="toggle-day" data-n="${d.n}" ${d.done ? "checked" : ""}> Done</label>
      </div>
      <ul class="meals">
        ${d.meals.map((m) => `<li><span class="k">${m.label}</span>${esc(m.name)}</li>`).join("")}
      </ul>
      <div class="nut">Protein ${d.nutrition.protein} g · Fiber ${d.nutrition.fiber} g · Fat ${d.nutrition.fat} g · Sugar ${d.nutrition.sugar} g</div>
    </article>`;
}

// ---------- Grocery ----------
function groceryScreen(vm) {
  const g = vm.grocery;
  if (!g.hasPlan) return noPlan();
  const b = g.budget;
  const idx = g.sections.findIndex((s) => s.key === g.active);
  const sec = g.sections[idx];
  const pct = g.total ? Math.round((g.done / g.total) * 100) : 0;
  const over = b.remaining < 0;
  const prev = g.sections[(idx + 2) % 3].key, next = g.sections[(idx + 1) % 3].key;

  return `
    <section class="card budget">
      <div class="kv"><span>Estimate before prices</span><span>${lkr(b.estimate)}</span></div>
      <div class="kv"><span>Paid so far (${b.priced} of ${b.count} priced)</span><span>${lkr(b.spent)}</span></div>
      <div class="kv"><span>Projected total</span><span>${lkr(b.total)}</span></div>
      <div class="kv strong"><span>Against ${lkr(b.target)}</span>
        <span class="${over ? "off" : "ok"}">${over ? lkr(-b.remaining) + " over" : lkr(b.remaining) + " left"}</span></div>
      <p class="muted small">Projected total uses the price you paid where entered and estimates for the rest. Pantry top-up and 10% contingency are included.</p>
    </section>

    <div class="seg" role="tablist">
      ${g.sections.map((s) => `
        <button data-action="select-section" data-key="${s.key}" class="${s.key === g.active ? "on" : ""}">${esc(s.title)}</button>`).join("")}
    </div>

    <div class="stepper">
      <button class="btn ghost" data-action="select-section" data-key="${prev}">‹ Previous</button>
      <span class="muted small">Section ${idx + 1} of ${g.sections.length} · ${g.done} of ${g.total} bought (${pct}%)</span>
      <button class="btn ghost" data-action="select-section" data-key="${next}">Next ›</button>
    </div>

    <h2>${esc(sec.title)}</h2>
    <section class="card list">
      ${sec.items.map((i) => `
        <div class="item ${i.done ? "got" : ""}">
          <input type="checkbox" data-action="toggle-shop" data-id="${i.id}" ${i.done ? "checked" : ""} aria-label="Bought ${esc(i.name)}">
          <div class="grow">
            <div class="iname">${esc(i.name)}</div>
            <small>${qty(i.unit, i.qty)} · est. ${lkr(i.cost)}</small>
          </div>
          <input class="inp price" type="number" inputmode="decimal" min="0" step="1" placeholder="paid"
            value="${i.paid ?? ""}" data-action="set-price" data-id="${i.id}" aria-label="Amount paid for ${esc(i.name)} in LKR">
        </div>`).join("")}
    </section>
    <p class="muted small">Type the amount you paid for each item (LKR) and press Enter or tap away. Leave blank to keep the estimate.</p>`;
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
