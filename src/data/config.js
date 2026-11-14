// DATA LAYER: user settings, targets and planner rules. Edit here, not in logic or UI code.
export const CONFIG = {
  sessionSizes: [4, 4, 4, 2],   // days covered by each cook session (every dish repeats within a session)
  cookPortions: 4,              // lunch and dinner portions cooked per session
  candidates: 300,              // plans generated per "New plan"; the best one is kept
  budget: { fortnight: 15000, month: 30000, contingencyRate: 0.10, pantryTopUp: 300 },
  targets: {
    protein: { min: 120, label: "Protein" },  // soft goal
    fiber:   { min: 25,  label: "Fiber" },    // soft goal
    sugar:   { max: 35,  label: "Sugar" },    // hard limit: the planner rejects plans above this
    fat:     { max: 50,  label: "Fat" }       // hard limit
  }
};
