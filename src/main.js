// COMPOSITION ROOT: wires the layers together and handles DOM events.
import * as catalog from "./data/catalog.js";
import { CONFIG } from "./data/config.js";
import { store } from "./data/storage.js";
import { createController } from "./app/controller.js";
import { page } from "./ui/views.js";

store.purgeLegacy();
const app = createController({ catalog, config: CONFIG, store });
const root = document.querySelector("#app");

function render() {
  const vm = app.view();
  document.body.dataset.tab = vm.ui.tab;   // drives the per-tab colour
  root.innerHTML = page(vm);
}

document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-action]");
  if (!el || el.tagName === "INPUT") return;   // checkboxes and price fields are handled by "change"
  if (el.dataset.action === "export-dishes") { exportMemo(app.view().dishes.list); return; }
  app.dispatch(el.dataset.action, { ...el.dataset });
  render();
});

document.addEventListener("change", (e) => {
  const el = e.target.closest("[data-action]");
  if (!el) return;
  app.dispatch(el.dataset.action, { ...el.dataset, value: el.value });
  render();
});

// Pressing Enter in a price field commits it (blur fires the change event)
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && e.target.matches("[data-action=set-price]")) e.target.blur();
});

render();

// Download the dish memo as a text file, for adding dishes in bulk later
function exportMemo(list) {
  const text = list.map((d) => `${d.name}\nCategory: ${d.category}\n${d.description}`).join("\n\n---\n\n");
  const url = URL.createObjectURL(new Blob([text || "No dishes yet."], { type: "text/plain" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = "meal-mate-dish-memo.txt";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
