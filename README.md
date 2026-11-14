# Meal Mate

A two-week, high-protein, low-fat, low-sugar meal planner for one person in Sri Lanka. It's a Progressive Web App: it runs in the browser and installs to an iPhone home screen.

## Using it

1. **New plan** (top bar): creates a plan for the next 14 days, starting tomorrow. It replaces the current plan and clears its ticks.
2. **Plan** tab: the 14 days with meals, daily protein, fiber, fat and sugar, and a **Done** tick at the end of each day. The summary shows averages against your targets.
3. **Grocery** tab: the consolidated list grouped into protein and dairy, grains and pantry, and vegetables and fruit. Tick items as you buy them. The budget box shows the estimated total against LKR 15,000.
4. **Cook** tab: choose a cook day to see the lunch and dinner recipes with ingredient amounts, method and storage. Tick **Cooked** when done.

Only the current plan is stored. Each new plan replaces the old one, and nothing is kept as history.

## Architecture (three layers)

```
src/
├── data/      DATA LAYER: catalog.js (foods and recipes), config.js (budget, targets, cook sizes), storage.js (save/load)
├── core/      LOGIC LAYER: planner.js (builds plans), nutrition.js (macros and goals), shopping.js (list and budget), dates.js
├── app/       CONTROLLER: controller.js (state, actions, view models; no HTML)
├── ui/        UI LAYER: views.js (HTML from view models), format.js (formatting)
└── main.js    Composition root: connects the layers and handles DOM events
```

- The **core** layer is pure: it doesn't touch the DOM or storage, so it can be tested in Node.
- The **controller** receives its store and config as parameters, so you can swap in a cloud store without changing anything else.
- The **UI** only renders what the controller gives it. Every piece of user-visible text passes through `esc()`.

## Run locally

Modules need a web server, not `file://`:

```bash
cd meal-mate
python3 -m http.server 8000
```

## Publish

- **Netlify Drop:** drag the `meal-mate` folder onto app.netlify.com/drop.
- **GitHub Pages:** upload the files to the repo root, then Settings → Pages → Deploy from a branch → main / (root).

## Install on iPhone 11

Open the HTTPS link in **Safari**, tap **Share**, then **Add to Home Screen**.

## Changing things

- Foods, prices and recipes: `src/data/catalog.js`
- Budget, targets and cook sizes: `src/data/config.js`
- Layout and colours: `index.html` and `styles.css`
- Bump the cache name in `sw.js` after changes so phones pick up the new version.

## Notes

- Prices and nutrition values are estimates. Check them against real labels and shelf prices.
- Variety comes from the catalogue. Each plan rearranges the recipes in it; to get genuinely new meals, add recipes to `catalog.js`.
