// Service worker: NETWORK FIRST. Fresh files are used whenever the phone is online, so an
// old cached copy cannot keep a broken version on screen. The cache is used only when offline.
const CACHE = "meal-mate-v15";
const ASSETS = [
  "./", "index.html", "styles.css", "manifest.webmanifest",
  "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png",
  "src/main.js",
  "src/data/catalog.js", "src/data/config.js", "src/data/storage.js",
  "src/core/dates.js", "src/core/nutrition.js", "src/core/planner.js", "src/core/shopping.js",
  "src/app/controller.js",
  "src/ui/format.js", "src/ui/views.js"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
        }
        return res;
      })
      .catch(() => caches.match(e.request).then((hit) => hit || caches.match("index.html")))
  );
});
