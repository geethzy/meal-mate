(function () {
  "use strict";

  const $ = (s) => document.querySelector(s);
  const fmt = (n) => "LKR " + Math.round(n).toLocaleString("en-US");

  // ---------- storage (localStorage now; keep this layer swappable for a cloud DB later) ----------
  const K = {
    get(k, d) {
      try { const v = localStorage.getItem("mm." + k); return v === null ? d : JSON.parse(v); }
      catch (e) { return d; }
    },
    set(k, v) { try { localStorage.setItem("mm." + k, JSON.stringify(v)); } catch (e) {} }
  };

  function todayISO() {
    const d = new Date();
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  }
  function dayDate(iso, n) {
    const d = new Date(iso + "T00:00:00");
    d.setDate(d.getDate() + n - 1);
    return d;
  }
  function short(d) {
    return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
  }
  function toggle(arr, v) {
    const i = arr.indexOf(v);
    if (i >= 0) arr.splice(i, 1); else arr.push(v);
  }
  function fmtQty(i) {
    if (i.unit === "pc") return i.qty + " pc";
    if (i.unit === "g") return i.qty >= 1000 ? (i.qty / 1000).toFixed(2) + " kg" : i.qty + " g";
    return i.qty >= 1000 ? (i.qty / 1000).toFixed(2) + " L" : i.qty + " ml";
  }
  function fmtQtyRaw(id, q) {
    const u = ING[id].u;
    if (u === "pc") return (Math.round(q * 10) / 10) + " pc";
    if (u === "g") return q >= 1000 ? (q / 1000).toFixed(2) + " kg" : Math.round(q) + " g";
    return q >= 1000 ? (q / 1000).toFixed(2) + " L" : Math.round(q) + " ml";
  }

  const LIST = shoppingList();
  const BUDGET = budgetSummary(LIST);

  const S = {
    tab: K.get("tab", "today"),
    day: K.get("day", 1),
    start: K.get("start", todayISO()),
    done: K.get("done", []),       // keys like "3-lunch"
    bought: K.get("bought", []),   // ingredient ids
    actual: K.get("actual", {}),   // ingredient id -> amount paid (LKR)
    body: K.get("body", []),       // {date, weight, waist}
    custom: K.get("custom", []),   // suggested dishes
    swaps: K.get("swaps", {}),     // "day-meal" -> custom dish id
    form: false                    // suggestion form open?
  };

  const LABEL = { breakfast: "Breakfast", lunch: "Lunch", dinner: "Dinner", snack: "Snack", drink: "Hot drink" };
  const ICON = { breakfast: "🍳", lunch: "🥗", dinner: "🍲", snack: "🍪", drink: "☕" };
  const COUNTED = ["breakfast", "lunch", "dinner", "snack"];
  const MEALS = ["breakfast", "lunch", "dinner", "snack", "drink"];
  const TABS = [["today", "Today", "📅"], ["shop", "Shop", "🛒"], ["prep", "Prep", "🥣"], ["recipes", "Recipes", "📖"], ["progress", "Progress", "📈"]];

  function dayCompleted(d) {
    return COUNTED.filter((m) => S.done.includes(d + "-" + m)).length;
  }

  // What is actually on the plate for a day/meal: the planned recipe, or a swapped-in suggestion
  function slot(d, meal) {
    const rid = mealsForDay(d)[meal];
    const R = RECIPES[rid];
    const c = S.custom.find((x) => x.id === S.swaps[d + "-" + meal]);
    if (c) return { name: c.name, desc: c.desc || "Your suggestion", prot: c.prot, kcal: c.kcal, custom: true, rid };
    const n = nutri(rid);
    return { name: R.name, desc: R.desc, prot: n.prot, kcal: n.kcal, custom: false, rid };
  }

  // ---------- Today ----------
  function viewToday() {
    const d = S.day;
    const date = dayDate(S.start, d);
    let prot = 0, kcal = 0, unknown = 0;
    const cards = MEALS.map((meal) => {
      const s = slot(d, meal);
      if (s.prot == null) unknown++; else prot += s.prot;
      if (s.kcal != null) kcal += s.kcal;
      const key = d + "-" + meal;
      const isDone = S.done.includes(key);
      const counted = COUNTED.includes(meal);
      const options = S.custom.filter((c) => c.meal === meal);
      const swapBox = options.length ? `
        <select class="inp full swap" data-act="swap" data-k="${key}" aria-label="Choose dish for ${LABEL[meal]}">
          <option value="">Planned: ${RECIPES[s.rid].name}</option>
          ${options.map((c) => `<option value="${c.id}" ${S.swaps[key] === c.id ? "selected" : ""}>Suggested: ${c.name}</option>`).join("")}
        </select>` : "";
      return `
        <div class="card meal ${isDone ? "done" : ""}">
          <div class="ico">${ICON[meal]}</div>
          <div class="grow">
            <div class="row between">
              <span class="tag">${LABEL[meal]}</span>
              <span class="muted small">${s.prot == null ? "protein not set" : s.prot + " g protein"}</span>
            </div>
            <div class="rname">${s.name}${s.custom ? ' <span class="tag">yours</span>' : ""}</div>
            <div class="muted small">${s.desc}</div>
            ${swapBox}
          </div>
          ${counted ? `<input type="checkbox" class="cb" data-act="done" data-k="${key}" ${isDone ? "checked" : ""} aria-label="Mark ${LABEL[meal]} done">` : ""}
        </div>`;
    }).join("");

    return `
      <div class="brand">🌿 Meal Mate</div>
      <h1>Today</h1>
      <p class="sub">${short(dayDate(S.start, 1))} to ${short(dayDate(S.start, 14))}</p>

      <div class="card row between">
        <button class="btn icon ghost" data-act="day" data-v="-1" ${d === 1 ? "disabled" : ""} aria-label="Previous day">‹</button>
        <div class="center">
          <div class="strong">Day ${d} of 14</div>
          <div class="muted small">${short(date)}</div>
        </div>
        <button class="btn icon ghost" data-act="day" data-v="1" ${d === 14 ? "disabled" : ""} aria-label="Next day">›</button>
      </div>

      <div class="card stats">
        <div><div class="big green">${prot} g</div><div class="muted small">protein (est.)${unknown ? `<br>+${unknown} not set` : ""}</div></div>
        <div><div class="big">${kcal}</div><div class="muted small">kcal (est.)</div></div>
        <div><div class="big">${dayCompleted(d)}/4</div><div class="muted small">meals done</div></div>
      </div>

      ${cards}

      <div class="card">
        <label class="muted small">Plan start date
          <input class="inp full" type="date" data-act="start" value="${S.start}">
        </label>
      </div>`;
  }

  // ---------- Shop ----------
  function viewShop() {
    const total = LIST.length;
    const nb = LIST.filter((i) => S.bought.includes(i.id)).length;
    const actualSum = Object.values(S.actual).reduce((a, b) => a + b, 0);
    const over = BUDGET.remaining < 0;

    const groups = ["P", "G", "V"].map((g) => {
      const items = LIST.filter((i) => i.group === g);
      return `
        <h2>${GROUPS[g]}</h2>
        <div class="card flush">
          ${items.map((i) => `
            <div class="item ${S.bought.includes(i.id) ? "got" : ""}">
              <input type="checkbox" class="cb" data-act="bought" data-id="${i.id}" ${S.bought.includes(i.id) ? "checked" : ""} aria-label="Bought ${i.name}">
              <div class="grow">
                <div class="iname">${i.name}</div>
                <div class="muted small">${fmtQty(i)} · est. ${fmt(i.cost)}</div>
              </div>
              <input class="inp price" type="number" inputmode="decimal" placeholder="paid" data-act="actual" data-id="${i.id}" value="${S.actual[i.id] ?? ""}" aria-label="Actual price paid for ${i.name}">
            </div>`).join("")}
        </div>`;
    }).join("");

    return `
      <h1>Shopping</h1>
      <p class="sub">One fortnight shop · ${nb} of ${total} items ticked</p>
      <div class="bar"><i style="width:${total ? Math.round(nb / total * 100) : 0}%"></i></div>

      <div class="card" style="margin-top:14px">
        <div class="kv"><span>Ingredients (estimated)</span><span>${fmt(BUDGET.items)}</span></div>
        <div class="kv"><span>Spice and pantry top-up</span><span>${fmt(BUDGET.pantry)}</span></div>
        <div class="kv"><span>Contingency (10%)</span><span>${fmt(BUDGET.contingency)}</span></div>
        <div class="kv strong"><span>Estimated total</span><span>${fmt(BUDGET.total)}</span></div>
        <div class="kv"><span>Against ${fmt(BUDGET_FORTNIGHT)} target</span>
          <span class="${over ? "warn" : "green"}">${over ? fmt(-BUDGET.remaining) + " over" : fmt(BUDGET.remaining) + " left"}</span></div>
        <div class="kv"><span>Actual prices you entered</span><span>${actualSum ? fmt(actualSum) : "none yet"}</span></div>
      </div>
      <p class="muted small">Every price here is an ESTIMATE for Sri Lankan supermarkets, not a checked shelf price. Type what you actually pay in the "paid" box to compare.</p>

      ${groups}

      <button class="btn ghost full" data-act="reset-shop" style="margin:8px 0 20px">Reset checklist</button>`;
  }

  // ---------- Prep ----------
  function viewPrep() {
    const sessions = BLOCKS.map((b) => {
      const L = RECIPES[b.lunch], D = RECIPES[b.dinner];
      const cook = dayDate(S.start, b.days[0]);
      const last = dayDate(S.start, b.days[b.days.length - 1]);
      return `
        <div class="card">
          <div class="row between">
            <span class="tag">Session ${b.no}</span>
            <span class="muted small">${short(cook)}</span>
          </div>
          <div class="rname" style="margin-top:10px">Cook day ${b.days[0]}: ${b.portions} portions of each</div>
          <div class="muted small">Covers ${short(dayDate(S.start, b.days[0]))} to ${short(last)} (${b.days.length} days)</div>
          <div class="kv"><span>Lunch</span><span class="right">${L.name}</span></div>
          <div class="kv"><span>Dinner</span><span class="right">${D.name}</span></div>
          <div class="kv"><span>Cook time</span><span>${L.time} min and ${D.time} min</span></div>
          <div class="kv"><span>Storage</span><span class="right">${b.note}</span></div>
        </div>`;
    }).join("");

    return `
      <h1>Prep</h1>
      <p class="sub">Four cook sessions across 14 days, about twice a week.</p>
      ${sessions}
      <h2>Food safety</h2>
      <div class="card">
        <ul class="list">
          <li>Cool cooked food within 1 to 2 hours, then refrigerate. In hot weather, do not leave it out for more than 1 hour.</li>
          <li>Keep the fridge at 4 °C or colder. Eat cooked food within 3 days.</li>
          <li>Reheat until steaming hot all the way through. Reheat once only.</li>
          <li>Freeze spare portions in labelled containers. Use within 1 to 2 months and thaw overnight in the fridge.</li>
          <li>Use separate boards and knives for raw chicken and fish. Wash your hands after handling raw meat.</li>
        </ul>
      </div>`;
  }

  // ---------- Recipes ----------
  function recipeCard(rid) {
    const R = RECIPES[rid];
    const n = nutri(rid);
    const batch = R.yield > 1;
    const per = batch ? "portion" : "serving";
    const ingRows = Object.entries(R.ing).map(([i, q]) => `
      <div class="kv"><span>${ING[i].n}</span>
        <span class="right">${fmtQtyRaw(i, q)}${batch ? `<br><span class="muted small">${fmtQtyRaw(i, q / R.yield)} per portion</span>` : ""}</span></div>`).join("");
    return `
      <details class="card recipe">
        <summary>
          <div class="row">
            <div class="grow">
              <div class="rname">${R.name}</div>
              <div class="muted small">${R.time} min · ${n.prot} g protein · ${n.kcal} kcal per ${per}</div>
            </div>
            <span class="chev">›</span>
          </div>
        </summary>
        <div class="rbody">
          <p class="muted">${R.desc}</p>
          <div class="label">Ingredients${batch ? ` (for ${R.yield} portions)` : ""}</div>
          ${ingRows}
          <div class="label">Method</div>
          <ol class="steps">${R.steps.map((s) => `<li>${s}</li>`).join("")}</ol>
          <div class="label">Storage</div>
          <p class="muted">${R.storage}</p>
          ${R.reheat ? `<div class="label">Reheat</div><p class="muted">${R.reheat}</p>` : ""}
        </div>
      </details>`;
  }

  function suggestForm() {
    if (!S.form) {
      return `<button class="btn full" data-act="form-open" style="margin-bottom:12px">+ Suggest a dish</button>`;
    }
    return `
      <div class="card">
        <div class="rname" style="margin-bottom:10px">New dish suggestion</div>
        <label class="label" for="dName">Dish name</label>
        <input class="inp full" id="dName" type="text" placeholder="e.g. Chicken and cucumber wraps" maxlength="80">
        <label class="label" for="dMeal">Meal</label>
        <select class="inp full" id="dMeal">
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="snack">Snack</option>
          <option value="drink">Hot drink</option>
        </select>
        <label class="label" for="dDesc">Short description</label>
        <input class="inp full" id="dDesc" type="text" placeholder="What is it?" maxlength="140">
        <div class="row" style="margin-top:4px">
          <div class="grow">
            <label class="label" for="dProt">Protein (g)</label>
            <input class="inp full" id="dProt" type="number" inputmode="decimal" step="0.1" placeholder="optional">
          </div>
          <div class="grow">
            <label class="label" for="dKcal">Kcal</label>
            <input class="inp full" id="dKcal" type="number" inputmode="numeric" step="1" placeholder="optional">
          </div>
        </div>
        <label class="label" for="dNotes">Ingredients and notes</label>
        <textarea class="inp full" id="dNotes" rows="3" placeholder="e.g. chicken, cucumber, red rice; no sugar" maxlength="600"></textarea>
        <div class="row" style="margin-top:12px">
          <button class="btn ghost grow" data-act="form-close">Cancel</button>
          <button class="btn grow" data-act="dish-save">Save suggestion</button>
        </div>
        <p class="muted small" style="margin-bottom:0">Suggestions do not change the shopping list or the batch plan. Use them as a swap on the Today tab.</p>
      </div>`;
  }

  function customList() {
    if (!S.custom.length) return `<p class="muted small">No suggestions yet.</p>`;
    return S.custom.map((c) => `
      <div class="card">
        <div class="row between">
          <span class="tag">${LABEL[c.meal]}</span>
          <button class="btn ghost small-btn" data-act="dish-del" data-id="${c.id}">Delete</button>
        </div>
        <div class="rname" style="margin-top:8px">${c.name}</div>
        <div class="muted small">${c.desc || ""}${c.prot != null ? ` · ${c.prot} g protein` : ""}${c.kcal != null ? ` · ${c.kcal} kcal` : ""}</div>
        ${c.notes ? `<p class="muted small" style="margin:8px 0 0">${c.notes}</p>` : ""}
      </div>`).join("");
  }

  function viewRecipes() {
    const cats = [
      ["Breakfast", BREAKFASTS],
      ["Lunch", BLOCKS.map((b) => b.lunch)],
      ["Dinner", BLOCKS.map((b) => b.dinner)],
      ["Snacks", [...new Set(SNACKS)]],
      ["Hot drinks", DRINKS]
    ];
    return `
      <h1>Recipes</h1>
      <p class="sub">Protein and kcal are estimates calculated from ingredient amounts.</p>
      ${suggestForm()}
      ${S.custom.length || S.form ? `<h2>Your suggestions</h2>${customList()}` : ""}
      ${cats.map(([title, ids]) => `<h2>${title}</h2>${ids.map(recipeCard).join("")}`).join("")}`;
  }

  // ---------- Progress ----------
  function viewProgress() {
    const total = 56;
    const done = S.done.length;
    const pct = Math.round(done / total * 100);
    const log = S.body.slice().reverse().map((e) => `
      <div class="kv"><span>${e.date}</span>
        <span>${e.weight != null ? e.weight + " kg" : "-"} · ${e.waist != null ? e.waist + " cm waist" : "-"}</span></div>`).join("");
    return `
      <h1>Progress</h1>
      <p class="sub">Two-week plan · meals counted: breakfast, lunch, dinner and snack</p>

      <div class="card">
        <div class="row between">
          <div><div class="big">${done}<span class="muted"> / ${total}</span></div><div class="muted small">meals completed</div></div>
          <div class="big green">${pct}%</div>
        </div>
        <div class="bar" style="margin-top:12px"><i style="width:${pct}%"></i></div>
      </div>

      <h2>Budget</h2>
      <div class="card">
        <div class="kv"><span>Estimated grocery spend (fortnight)</span><span>${fmt(BUDGET.total)}</span></div>
        <div class="kv"><span>Two-week target</span><span>${fmt(BUDGET_FORTNIGHT)}</span></div>
        <div class="kv"><span>Monthly food budget</span><span>${fmt(BUDGET_MONTH)}</span></div>
        <div class="kv strong"><span>Left for the month after this shop</span><span>${fmt(BUDGET_MONTH - BUDGET.total)}</span></div>
        <p class="muted small" style="margin:10px 0 0">All figures are estimates. Replace them with your real prices after the first shop.</p>
      </div>

      <h2>Body check-in</h2>
      <div class="card">
        <p class="muted small" style="margin-top:0">Weigh in and measure your waist once a week, same time and conditions. Waist is often a better fat-loss signal than weight alone.</p>
        <div class="row">
          <input class="inp grow" id="bdate" type="date" value="${todayISO()}" aria-label="Date">
          <input class="inp narrow" id="bw" type="number" step="0.1" inputmode="decimal" placeholder="kg" aria-label="Weight in kg">
          <input class="inp narrow" id="bwa" type="number" step="0.5" inputmode="decimal" placeholder="cm" aria-label="Waist in cm">
        </div>
        <button class="btn full" data-act="body-add" style="margin-top:10px">Save check-in</button>
      </div>
      ${log ? `<div class="card">${log}</div>` : ""}`;
  }

  // ---------- Shell ----------
  function render() {
    const views = { today: viewToday, shop: viewShop, prep: viewPrep, recipes: viewRecipes, progress: viewProgress };
    if (!views[S.tab]) S.tab = "today";
    $("#view").innerHTML = views[S.tab]();
    $("#tabbar").innerHTML = TABS.map(([k, l, i]) =>
      `<button data-act="tab" data-v="${k}" class="${S.tab === k ? "on" : ""}" aria-current="${S.tab === k}"><span class="ic">${i}</span>${l}</button>`
    ).join("");
  }

  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-act]");
    if (!el || el.tagName === "INPUT" || el.tagName === "SELECT") return;
    const a = el.dataset.act;
    if (a === "tab") { S.tab = el.dataset.v; K.set("tab", S.tab); window.scrollTo(0, 0); }
    else if (a === "day") { S.day = Math.min(14, Math.max(1, S.day + Number(el.dataset.v))); K.set("day", S.day); }
    else if (a === "reset-shop") {
      if (confirm("Clear all ticks on the shopping list?")) { S.bought = []; K.set("bought", S.bought); }
    }
    else if (a === "body-add") {
      const w = parseFloat($("#bw").value), wa = parseFloat($("#bwa").value);
      if (isNaN(w) && isNaN(wa)) return;
      S.body.push({ date: $("#bdate").value || todayISO(), weight: isNaN(w) ? null : w, waist: isNaN(wa) ? null : wa });
      K.set("body", S.body);
    }
    else if (a === "form-open") { S.form = true; }
    else if (a === "form-close") { S.form = false; }
    else if (a === "dish-save") {
      const name = $("#dName").value.trim();
      if (!name) { alert("Please give the dish a name."); return; }
      const p = parseFloat($("#dProt").value), kc = parseFloat($("#dKcal").value);
      S.custom.push({
        id: "c" + Date.now(), name, meal: $("#dMeal").value,
        desc: $("#dDesc").value.trim(),
        prot: isNaN(p) ? null : p, kcal: isNaN(kc) ? null : Math.round(kc),
        notes: $("#dNotes").value.trim()
      });
      K.set("custom", S.custom);
      S.form = false;
    }
    else if (a === "dish-del") {
      const id = el.dataset.id;
      if (!confirm("Delete this suggestion?")) return;
      S.custom = S.custom.filter((c) => c.id !== id);
      Object.keys(S.swaps).forEach((k) => { if (S.swaps[k] === id) delete S.swaps[k]; });
      K.set("custom", S.custom); K.set("swaps", S.swaps);
    }
    render();
  });

  document.addEventListener("change", (e) => {
    const el = e.target;
    const a = el.dataset.act;
    if (!a) return;
    if (a === "done") { toggle(S.done, el.dataset.k); K.set("done", S.done); }
    else if (a === "bought") { toggle(S.bought, el.dataset.id); K.set("bought", S.bought); }
    else if (a === "actual") {
      const v = parseFloat(el.value);
      if (isNaN(v)) delete S.actual[el.dataset.id]; else S.actual[el.dataset.id] = v;
      K.set("actual", S.actual);
    }
    else if (a === "swap") {
      if (el.value) S.swaps[el.dataset.k] = el.value; else delete S.swaps[el.dataset.k];
      K.set("swaps", S.swaps);
    }
    else if (a === "start") { if (el.value) { S.start = el.value; K.set("start", S.start); } }
    render();
  });

  render();
})();
