// UI LAYER: formatting helpers (pure).
export const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
export const lkr = (n) => "LKR " + Math.round(n).toLocaleString("en-US");
export const num = (n) => Number(n).toLocaleString("en-US");

const trimmed = (n, dp) => String(Number(n.toFixed(dp)));

// Metric, for shopping (kg, L, g, ml, pieces)
export function qty(unit, q) {
  if (unit === "pc") return `${trimmed(q, 1)} pc`;
  if (q >= 1000) return `${trimmed(q / 1000, 2)} ${unit === "g" ? "kg" : "L"}`;
  return `${trimmed(q, 0)} ${unit}`;
}

// Cooking measures: cups, tablespoons, teaspoons and pieces, using each ingredient's home size
const FRACTIONS = { 0.25: "¼", 0.5: "½", 0.75: "¾" };
function fraction(n, step) {
  let r = Math.round(n / step) * step;
  if (r < step) r = step;
  const whole = Math.floor(r + 1e-9);
  const part = Math.round((r - whole) * 4) / 4;
  const sym = FRACTIONS[part] || "";
  return whole === 0 ? (sym || "0") : `${whole}${sym}`;
}
function amount(n, step, one, many) {
  return `${fraction(n, step)} ${n > 1 ? many : one}`;
}

export function homeQty(ing, q) {
  if (ing.unit === "pc") return amount(q, 0.5, "piece", "pieces");
  const h = ing.home;
  switch (h.unit) {
    case "piece":
      return amount(q / h.size, 0.5, "piece", "pieces");
    case "cup": {
      const cups = q / h.size;
      return cups >= 0.25 ? amount(cups, 0.25, "cup", "cups") : amount(q / (h.size / 16), 0.5, "tbsp", "tbsp");
    }
    case "tbsp": {
      const tbsp = q / h.size;
      return tbsp >= 0.5 ? amount(tbsp, 0.5, "tbsp", "tbsp") : amount(q / (h.size / 3), 0.5, "tsp", "tsp");
    }
    default:
      return amount(q / h.size, 0.5, "tsp", "tsp");
  }
}

export function date(iso) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
}
