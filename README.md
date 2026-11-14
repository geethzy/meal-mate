# Meal Mate

A two-week, high-protein meal planner for one person in Sri Lanka. It is a Progressive Web App (PWA): it runs in the browser and installs to an iPhone home screen as a full-screen app.

## What's included

| Tab | What it does |
|---|---|
| **Today** | Day 1 to 14 calendar, meals with tick-off, daily protein and kcal estimates |
| **Shop** | One consolidated fortnight list grouped by protein and dairy, grains and pantry, and vegetables and fruit. Tick items off, enter what you actually paid, see estimate, contingency and budget |
| **Prep** | Four cook sessions with the lunch and dinner recipes, portions, fridge and freezer instructions, and food-safety reminders |
| **Recipes** | 4 breakfasts, 4 lunches, 4 dinners, 6 snacks, 4 hot drinks. Ingredients, quantities, method, storage and reheating |
| **Progress** | Meals completed out of 56, fortnight spend against the LKR 15,000 target, monthly budget of LKR 30,000, and a weekly weight and waist log |

Everything is stored on the phone (localStorage). Nothing is sent anywhere.

## Files

```
meal-mate/
├── index.html          App shell and iOS meta tags
├── styles.css          White, minimal UI
├── app.js              Screens, state, tick-off, budget display
├── data.js             Ingredients, recipes, 14-day plan, shopping list and budget maths
├── sw.js               Service worker (offline caching)
├── manifest.webmanifest
├── icons/
│   ├── icon-192.png
│   ├── icon-512.png
│   └── apple-touch-icon.png
└── README.md
```

## Run it locally

Service workers need HTTPS or `localhost`, so for a quick test:

```bash
cd meal-mate
python3 -m http.server 8000
# open http://localhost:8000
```

## Publish it (HTTPS is required for Add to Home Screen to cache offline)

### Option A: Netlify Drop (fastest, no account setup needed beyond sign-up)
1. Go to https://app.netlify.com/drop
2. Drag the whole `meal-mate` folder onto the page.
3. Netlify gives you an `https://…netlify.app` link. Open it on your iPhone.

### Option B: GitHub Pages
1. Create a new public repo, for example `meal-mate`.
2. Upload all the files in the `meal-mate` folder to the repo root and commit.
3. Repo **Settings → Pages → Build and deployment → Deploy from a branch → `main` / `(root)`**.
4. After a minute, the site is at `https://<your-username>.github.io/meal-mate/`.

## Install on iPhone 11 (Safari)

1. Open the HTTPS link in **Safari**. Chrome on iPhone cannot install home-screen apps.
2. Tap the **Share** button (square with an up arrow) at the bottom.
3. Scroll and tap **Add to Home Screen**.
4. Keep the name "Meal Mate" and tap **Add**.
5. Open Meal Mate from the home screen. It runs full screen with no Safari bar.

Notes:
- Data saved in the Safari tab and in the home-screen app are kept separately on iOS. Use the home-screen app for day-to-day tracking.
- After the first load, the app works offline.
- To update the app later, redeploy, then open it once with a connection so the new version downloads. Bump `CACHE` in `sw.js` (for example `meal-mate-v2`) so phones pick up the change.

## Things you should check

- **Prices are estimates.** They are my best guess for Sri Lankan supermarkets and must be checked against your real shelves. Enter the amount you actually pay in the Shop tab, and update the `c:` values in `data.js` (LKR per gram, ml or piece) so the totals match.
- **Calories are estimates** calculated from standard food values. Check the plan's calorie level against your own needs before following it for fat loss.
- **Current estimate:** about LKR 17,000 for the fortnight including contingency, which is above the LKR 15,000 target. The app shows the gap in the Shop tab.
- Eggs are counted as whole eggs (about 50 g each). Chocolate and nut snacks are small on purpose.

## Changing the plan

All food lives in `data.js`:
- `ING`: ingredient list with kcal, protein and LKR estimates per unit.
- `RECIPES`: recipes. Breakfast, snack and drink amounts are per serving. Lunch and dinner amounts are for the whole batch (`yield: 4`).
- `BREAKFASTS`, `SNACKS`, `DRINKS`: the daily rotation.
- `BLOCKS`: the four cook sessions and which lunch and dinner each covers.
- `BUDGET_*`, `CONTINGENCY_RATE`, `PANTRY_TOPUP`: budget settings.

The shopping list, prep schedule, protein and budget totals update automatically from these values.

## Future: cloud sync

The only storage calls are in the small `K` object at the top of `app.js`. Replace its `get` and `set` with calls to a backend or database, such as Firebase, Supabase or a custom API, and add sign-in to sync across devices.
