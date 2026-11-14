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
