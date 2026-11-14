// CORE LAYER: matches foods typed by the user to dishes in the catalogue (pure).
const STOP = new Set(["the", "and", "with", "a", "an", "of", "for", "in", "on", "to", "my"]);
const word = (w) => (w.length > 3 && w.endsWith("s") ? w.slice(0, -1) : w);

export function tokens(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, " ").split(" ")
    .filter((w) => w && !STOP.has(w)).map(word);
}

/**
 * Matches comma- or line-separated names against dishes of one meal type.
 * A dish matches when at least 60% of the words typed appear in its name, description or aliases.
 * @returns {{matched: string[], unmatched: string[]}} recipe ids, and names that were not recognised
 */
export function matchFoods(text, recipes, type) {
  const names = text.split(/[,\n]+/).map((s) => s.trim()).filter(Boolean);
  const pool = Object.entries(recipes).filter(([, r]) => r.type === type);
  const matched = new Set();
  const unmatched = [];
  for (const name of names) {
    const q = tokens(name);
    if (!q.length) continue;
    let best = null, bestScore = 0;
    for (const [id, r] of pool) {
      const hay = tokens([r.name, r.desc, ...(r.aliases || [])].join(" "));
      const score = q.filter((t) => hay.includes(t)).length / q.length;
      if (score > bestScore) { best = id; bestScore = score; }
    }
    if (best && bestScore >= 0.6) matched.add(best);
    else unmatched.push(name);
  }
  return { matched: [...matched], unmatched };
}
