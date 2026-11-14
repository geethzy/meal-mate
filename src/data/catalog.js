// DATA LAYER: static food catalogue. No logic here.
// Per-unit values: kcal, protein (g), fat (g), sugar (g), fiber (g) and an ESTIMATED price in LKR.
// Recipes: breakfast, snack and drink use batch yields (breakfast and drink 4, snack 8);
// lunch and dinner ("main") dishes make 4 portions.

export const GROUPS = {
  "protein": "Protein & dairy",
  "pantry": "Grains & pantry",
  "produce": "Vegetables & fruit"
};

export const INGREDIENTS = {
  "chicken": {
    "name": "Chicken breast, boneless",
    "unit": "g",
    "group": "protein",
    "kcal": 1.2,
    "protein": 0.31,
    "fat": 0.01,
    "sugar": 0,
    "fiber": 0,
    "home": {
      "unit": "piece",
      "size": 170
    },
    "price": 1.5
  },
  "fish": {
    "name": "Seer fish fillet",
    "unit": "g",
    "group": "protein",
    "kcal": 1.1,
    "protein": 0.2,
    "fat": 0.02,
    "sugar": 0,
    "fiber": 0,
    "home": {
      "unit": "piece",
      "size": 150
    },
    "price": 1.8
  },
  "eggs": {
    "name": "Eggs",
    "unit": "pc",
    "group": "protein",
    "kcal": 72,
    "protein": 6.3,
    "fat": 5,
    "sugar": 0.2,
    "fiber": 0,
    "home": {
      "unit": "piece",
      "size": 1
    },
    "price": 30
  },
  "tuna": {
    "name": "Tuna in water, drained",
    "unit": "g",
    "group": "protein",
    "kcal": 1,
    "protein": 0.25,
    "fat": 0.005,
    "sugar": 0,
    "fiber": 0,
    "home": {
      "unit": "cup",
      "size": 150
    },
    "price": 2.4
  },
  "sardines": {
    "name": "Sardines, drained (no added sugar)",
    "unit": "g",
    "group": "protein",
    "kcal": 2,
    "protein": 0.25,
    "fat": 0.11,
    "sugar": 0,
    "fiber": 0,
    "home": {
      "unit": "cup",
      "size": 150
    },
    "price": 2.6
  },
  "yoghurt": {
    "name": "Plain yoghurt, unsweetened",
    "unit": "g",
    "group": "protein",
    "kcal": 0.6,
    "protein": 0.04,
    "fat": 0.033,
    "sugar": 0.047,
    "fiber": 0,
    "home": {
      "unit": "cup",
      "size": 245
    },
    "price": 0.8
  },
  "milk": {
    "name": "Low-fat milk",
    "unit": "ml",
    "group": "protein",
    "kcal": 0.45,
    "protein": 0.034,
    "fat": 0.015,
    "sugar": 0.05,
    "fiber": 0,
    "home": {
      "unit": "cup",
      "size": 240
    },
    "price": 0.45
  },
  "pb": {
    "name": "Peanut butter (no added sugar)",
    "unit": "g",
    "group": "pantry",
    "kcal": 5.9,
    "protein": 0.25,
    "fat": 0.5,
    "sugar": 0.03,
    "fiber": 0.06,
    "home": {
      "unit": "tbsp",
      "size": 16
    },
    "price": 3.2
  },
  "almonds": {
    "name": "Almonds, raw",
    "unit": "g",
    "group": "pantry",
    "kcal": 5.8,
    "protein": 0.21,
    "fat": 0.49,
    "sugar": 0.044,
    "fiber": 0.125,
    "home": {
      "unit": "cup",
      "size": 140
    },
    "price": 5
  },
  "choc": {
    "name": "Dark chocolate 85%",
    "unit": "g",
    "group": "pantry",
    "kcal": 6,
    "protein": 0.12,
    "fat": 0.43,
    "sugar": 0.078,
    "fiber": 0.11,
    "home": {
      "unit": "piece",
      "size": 10
    },
    "price": 6
  },
  "redrice": {
    "name": "Red rice, dry",
    "unit": "g",
    "group": "pantry",
    "kcal": 3.5,
    "protein": 0.075,
    "fat": 0.026,
    "sugar": 0.005,
    "fiber": 0.037,
    "home": {
      "unit": "cup",
      "size": 185
    },
    "price": 0.35
  },
  "oats": {
    "name": "Rolled oats",
    "unit": "g",
    "group": "pantry",
    "kcal": 3.9,
    "protein": 0.13,
    "fat": 0.065,
    "sugar": 0.01,
    "fiber": 0.1,
    "home": {
      "unit": "cup",
      "size": 80
    },
    "price": 1.4
  },
  "bread": {
    "name": "Wholewheat bread slice",
    "unit": "pc",
    "group": "pantry",
    "kcal": 85,
    "protein": 3.2,
    "fat": 1.2,
    "sugar": 1.3,
    "fiber": 2.4,
    "home": {
      "unit": "piece",
      "size": 1
    },
    "price": 18
  },
  "tea": {
    "name": "Tea leaves",
    "unit": "g",
    "group": "pantry",
    "kcal": 0,
    "protein": 0,
    "fat": 0,
    "sugar": 0,
    "fiber": 0,
    "home": {
      "unit": "tsp",
      "size": 2
    },
    "price": 4
  },
  "coffee": {
    "name": "Instant coffee",
    "unit": "g",
    "group": "pantry",
    "kcal": 0.02,
    "protein": 0.1,
    "fat": 0,
    "sugar": 0,
    "fiber": 0,
    "home": {
      "unit": "tsp",
      "size": 2
    },
    "price": 8
  },
  "cinn": {
    "name": "Cinnamon",
    "unit": "g",
    "group": "pantry",
    "kcal": 2.5,
    "protein": 0.04,
    "fat": 0.012,
    "sugar": 0.02,
    "fiber": 0.53,
    "home": {
      "unit": "tsp",
      "size": 2.6
    },
    "price": 6
  },
  "soy": {
    "name": "Soy sauce",
    "unit": "ml",
    "group": "pantry",
    "kcal": 0.53,
    "protein": 0.08,
    "fat": 0,
    "sugar": 0.008,
    "fiber": 0,
    "home": {
      "unit": "tbsp",
      "size": 16
    },
    "price": 1.5
  },
  "oil": {
    "name": "Cooking oil",
    "unit": "ml",
    "group": "pantry",
    "kcal": 8.8,
    "protein": 0,
    "fat": 1,
    "sugar": 0,
    "fiber": 0,
    "home": {
      "unit": "tbsp",
      "size": 14
    },
    "price": 2
  },
  "coconut": {
    "name": "Coconut oil",
    "unit": "ml",
    "group": "pantry",
    "kcal": 8.6,
    "protein": 0,
    "fat": 1,
    "sugar": 0,
    "fiber": 0,
    "home": {
      "unit": "tbsp",
      "size": 14
    },
    "price": 2
  },
  "curry": {
    "name": "Curry powder",
    "unit": "g",
    "group": "pantry",
    "kcal": 3.2,
    "protein": 0.14,
    "fat": 0.14,
    "sugar": 0.023,
    "fiber": 0.33,
    "home": {
      "unit": "tsp",
      "size": 2.3
    },
    "price": 3.5
  },
  "sweetpotato": {
    "name": "Sweet potato",
    "unit": "g",
    "group": "produce",
    "kcal": 0.86,
    "protein": 0.016,
    "fat": 0.001,
    "sugar": 0.042,
    "fiber": 0.03,
    "home": {
      "unit": "piece",
      "size": 200
    },
    "price": 0.35
  },
  "greenbeans": {
    "name": "Green beans",
    "unit": "g",
    "group": "produce",
    "kcal": 0.31,
    "protein": 0.018,
    "fat": 0.001,
    "sugar": 0.033,
    "fiber": 0.027,
    "home": {
      "unit": "cup",
      "size": 100
    },
    "price": 0.6
  },
  "cabbage": {
    "name": "Cabbage",
    "unit": "g",
    "group": "produce",
    "kcal": 0.25,
    "protein": 0.013,
    "fat": 0.001,
    "sugar": 0.032,
    "fiber": 0.025,
    "home": {
      "unit": "cup",
      "size": 70
    },
    "price": 0.3
  },
  "carrot": {
    "name": "Carrots",
    "unit": "g",
    "group": "produce",
    "kcal": 0.41,
    "protein": 0.009,
    "fat": 0.002,
    "sugar": 0.047,
    "fiber": 0.028,
    "home": {
      "unit": "piece",
      "size": 60
    },
    "price": 0.3
  },
  "onion": {
    "name": "Onions",
    "unit": "g",
    "group": "produce",
    "kcal": 0.4,
    "protein": 0.011,
    "fat": 0.001,
    "sugar": 0.042,
    "fiber": 0.017,
    "home": {
      "unit": "piece",
      "size": 110
    },
    "price": 0.25
  },
  "garlic": {
    "name": "Garlic",
    "unit": "g",
    "group": "produce",
    "kcal": 1.49,
    "protein": 0.064,
    "fat": 0.005,
    "sugar": 0.01,
    "fiber": 0.021,
    "home": {
      "unit": "piece",
      "size": 3
    },
    "price": 1.5
  },
  "ginger": {
    "name": "Ginger",
    "unit": "g",
    "group": "produce",
    "kcal": 0.8,
    "protein": 0.018,
    "fat": 0.0075,
    "sugar": 0.017,
    "fiber": 0.02,
    "home": {
      "unit": "tsp",
      "size": 4
    },
    "price": 1
  },
  "tomato": {
    "name": "Tomatoes",
    "unit": "g",
    "group": "produce",
    "kcal": 0.18,
    "protein": 0.009,
    "fat": 0.002,
    "sugar": 0.026,
    "fiber": 0.012,
    "home": {
      "unit": "piece",
      "size": 120
    },
    "price": 0.35
  },
  "cucumber": {
    "name": "Cucumber",
    "unit": "g",
    "group": "produce",
    "kcal": 0.15,
    "protein": 0.007,
    "fat": 0.001,
    "sugar": 0.017,
    "fiber": 0.005,
    "home": {
      "unit": "piece",
      "size": 200
    },
    "price": 0.3
  },
  "lime": {
    "name": "Lime",
    "unit": "pc",
    "group": "produce",
    "kcal": 20,
    "protein": 0.5,
    "fat": 0.2,
    "sugar": 1.1,
    "fiber": 1.8,
    "home": {
      "unit": "piece",
      "size": 1
    },
    "price": 25
  },
  "papaya": {
    "name": "Papaya",
    "unit": "g",
    "group": "produce",
    "kcal": 0.43,
    "protein": 0.005,
    "fat": 0.001,
    "sugar": 0.078,
    "fiber": 0.017,
    "home": {
      "unit": "cup",
      "size": 140
    },
    "price": 0.35
  },
  "guava": {
    "name": "Guava",
    "unit": "g",
    "group": "produce",
    "kcal": 0.68,
    "protein": 0.026,
    "fat": 0.003,
    "sugar": 0.089,
    "fiber": 0.054,
    "home": {
      "unit": "piece",
      "size": 100
    },
    "price": 0.5
  },
  "chilli": {
    "name": "Green chilli",
    "unit": "pc",
    "group": "produce",
    "kcal": 4,
    "protein": 0.1,
    "fat": 0.02,
    "sugar": 0.2,
    "fiber": 0.3,
    "home": {
      "unit": "piece",
      "size": 5
    },
    "price": 10
  },
  "oatflour": {
    "name": "Oat flour",
    "unit": "g",
    "group": "pantry",
    "kcal": 3.9,
    "protein": 0.13,
    "fat": 0.065,
    "sugar": 0.01,
    "fiber": 0.1,
    "home": {
      "unit": "cup",
      "size": 90
    },
    "price": 1.8
  },
  "banana": {
    "name": "Bananas",
    "unit": "g",
    "group": "produce",
    "kcal": 0.89,
    "protein": 0.011,
    "fat": 0.003,
    "sugar": 0.12,
    "fiber": 0.026,
    "home": {
      "unit": "piece",
      "size": 120
    },
    "price": 0.4
  },
  "honey": {
    "name": "Honey",
    "unit": "g",
    "group": "pantry",
    "kcal": 3.04,
    "protein": 0.003,
    "fat": 0,
    "sugar": 0.82,
    "fiber": 0,
    "home": {
      "unit": "tbsp",
      "size": 21
    },
    "price": 3
  },
  "vanilla": {
    "name": "Vanilla extract",
    "unit": "ml",
    "group": "pantry",
    "kcal": 2.9,
    "protein": 0,
    "fat": 0,
    "sugar": 0.1,
    "fiber": 0,
    "home": {
      "unit": "tsp",
      "size": 5
    },
    "price": 8
  },
  "bp": {
    "name": "Baking powder",
    "unit": "g",
    "group": "pantry",
    "kcal": 0.5,
    "protein": 0,
    "fat": 0,
    "sugar": 0,
    "fiber": 0,
    "home": {
      "unit": "tsp",
      "size": 4
    },
    "price": 2
  },
  "cocoa": {
    "name": "Unsweetened cocoa powder",
    "unit": "g",
    "group": "pantry",
    "kcal": 2.3,
    "protein": 0.2,
    "fat": 0.14,
    "sugar": 0.006,
    "fiber": 0.37,
    "home": {
      "unit": "tbsp",
      "size": 5.3
    },
    "price": 4
  },
  "avocado": {
    "name": "Avocado",
    "unit": "g",
    "group": "produce",
    "kcal": 1.6,
    "protein": 0.02,
    "fat": 0.15,
    "sugar": 0.007,
    "fiber": 0.07,
    "home": {
      "unit": "piece",
      "size": 150
    },
    "price": 1
  },
  "strawberry": {
    "name": "Strawberries",
    "unit": "g",
    "group": "produce",
    "kcal": 0.32,
    "protein": 0.007,
    "fat": 0.003,
    "sugar": 0.049,
    "fiber": 0.02,
    "home": {
      "unit": "cup",
      "size": 150
    },
    "price": 1.2
  },
  "peanuts": {
    "name": "Roasted peanuts",
    "unit": "g",
    "group": "pantry",
    "kcal": 5.7,
    "protein": 0.26,
    "fat": 0.49,
    "sugar": 0.04,
    "fiber": 0.085,
    "home": {
      "unit": "tbsp",
      "size": 9
    },
    "price": 2.4
  },
  "dates": {
    "name": "Dates, pitted",
    "unit": "g",
    "group": "pantry",
    "kcal": 2.8,
    "protein": 0.025,
    "fat": 0.002,
    "sugar": 0.63,
    "fiber": 0.08,
    "home": {
      "unit": "piece",
      "size": 8
    },
    "price": 1.2
  },
  "apple": {
    "name": "Apples",
    "unit": "g",
    "group": "produce",
    "kcal": 0.52,
    "protein": 0.003,
    "fat": 0.002,
    "sugar": 0.1,
    "fiber": 0.024,
    "home": {
      "unit": "piece",
      "size": 180
    },
    "price": 0.9
  },
  "snickers": {
    "name": "Snickers bar",
    "unit": "g",
    "group": "pantry",
    "kcal": 4.9,
    "protein": 0.09,
    "fat": 0.24,
    "sugar": 0.45,
    "fiber": 0.02,
    "home": {
      "unit": "piece",
      "size": 50
    },
    "price": 3
  },
  "lemon": {
    "name": "Lemon",
    "unit": "g",
    "group": "produce",
    "kcal": 0.29,
    "protein": 0.011,
    "fat": 0.003,
    "sugar": 0.025,
    "fiber": 0.027,
    "home": {
      "unit": "piece",
      "size": 60
    },
    "price": 0.8
  },
  "orange": {
    "name": "Oranges",
    "unit": "g",
    "group": "produce",
    "kcal": 0.47,
    "protein": 0.009,
    "fat": 0.001,
    "sugar": 0.094,
    "fiber": 0.024,
    "home": {
      "unit": "piece",
      "size": 130
    },
    "price": 0.6
  },
  "grapefruit": {
    "name": "Grapefruit",
    "unit": "g",
    "group": "produce",
    "kcal": 0.42,
    "protein": 0.008,
    "fat": 0.001,
    "sugar": 0.069,
    "fiber": 0.016,
    "home": {
      "unit": "piece",
      "size": 230
    },
    "price": 0.6
  },
  "peach": {
    "name": "Peaches",
    "unit": "g",
    "group": "produce",
    "kcal": 0.39,
    "protein": 0.009,
    "fat": 0.003,
    "sugar": 0.08,
    "fiber": 0.015,
    "home": {
      "unit": "piece",
      "size": 150
    },
    "price": 0.8
  },
  "raspberry": {
    "name": "Raspberries",
    "unit": "g",
    "group": "produce",
    "kcal": 0.52,
    "protein": 0.012,
    "fat": 0.007,
    "sugar": 0.044,
    "fiber": 0.065,
    "home": {
      "unit": "cup",
      "size": 123
    },
    "price": 2
  },
  "passionfruit": {
    "name": "Passion fruit pulp",
    "unit": "g",
    "group": "produce",
    "kcal": 0.97,
    "protein": 0.022,
    "fat": 0.007,
    "sugar": 0.11,
    "fiber": 0.107,
    "home": {
      "unit": "piece",
      "size": 18
    },
    "price": 2
  },
  "hibiscus": {
    "name": "Dried hibiscus tea",
    "unit": "g",
    "group": "pantry",
    "kcal": 0,
    "protein": 0,
    "fat": 0,
    "sugar": 0,
    "fiber": 0,
    "home": {
      "unit": "tsp",
      "size": 2
    },
    "price": 8
  },
  "cardamom": {
    "name": "Cardamom pods",
    "unit": "g",
    "group": "pantry",
    "kcal": 3.1,
    "protein": 0.11,
    "fat": 0.07,
    "sugar": 0,
    "fiber": 0.28,
    "home": {
      "unit": "tsp",
      "size": 2
    },
    "price": 20
  },
  "cloves": {
    "name": "Cloves",
    "unit": "g",
    "group": "pantry",
    "kcal": 2.7,
    "protein": 0.06,
    "fat": 0.13,
    "sugar": 0.02,
    "fiber": 0.34,
    "home": {
      "unit": "tsp",
      "size": 2
    },
    "price": 15
  },
  "turmeric": {
    "name": "Turmeric powder",
    "unit": "g",
    "group": "pantry",
    "kcal": 3.5,
    "protein": 0.1,
    "fat": 0.03,
    "sugar": 0.03,
    "fiber": 0.21,
    "home": {
      "unit": "tsp",
      "size": 3
    },
    "price": 4
  },
  "sugar": {
    "name": "Sugar",
    "unit": "g",
    "group": "pantry",
    "kcal": 3.87,
    "protein": 0,
    "fat": 0,
    "sugar": 1,
    "fiber": 0,
    "home": {
      "unit": "tsp",
      "size": 4
    },
    "price": 0.2
  },
  "brownsugar": {
    "name": "Brown sugar",
    "unit": "g",
    "group": "pantry",
    "kcal": 3.8,
    "protein": 0,
    "fat": 0,
    "sugar": 0.97,
    "fiber": 0,
    "home": {
      "unit": "tsp",
      "size": 4
    },
    "price": 0.3
  },
  "marmalade": {
    "name": "Citrus marmalade",
    "unit": "g",
    "group": "pantry",
    "kcal": 2.6,
    "protein": 0.01,
    "fat": 0,
    "sugar": 0.6,
    "fiber": 0.01,
    "home": {
      "unit": "tbsp",
      "size": 20
    },
    "price": 1.2
  },
  "maesil": {
    "name": "Green plum syrup (maesil)",
    "unit": "g",
    "group": "pantry",
    "kcal": 2.6,
    "protein": 0,
    "fat": 0,
    "sugar": 0.6,
    "fiber": 0,
    "home": {
      "unit": "tbsp",
      "size": 18
    },
    "price": 1.5
  },
  "tortilla": {
    "name": "Tortillas",
    "unit": "pc",
    "group": "pantry",
    "kcal": 130,
    "protein": 3.5,
    "fat": 3.5,
    "sugar": 0.5,
    "fiber": 2,
    "home": {
      "unit": "piece",
      "size": 1
    },
    "price": 25
  },
  "cheese": {
    "name": "Grated cheese",
    "unit": "g",
    "group": "protein",
    "kcal": 3.8,
    "protein": 0.25,
    "fat": 0.33,
    "sugar": 0.01,
    "fiber": 0,
    "home": {
      "unit": "cup",
      "size": 113
    },
    "price": 2
  },
  "bellpepper": {
    "name": "Bell peppers",
    "unit": "g",
    "group": "produce",
    "kcal": 0.31,
    "protein": 0.01,
    "fat": 0.003,
    "sugar": 0.042,
    "fiber": 0.021,
    "home": {
      "unit": "piece",
      "size": 120
    },
    "price": 0.8
  },
  "mayo": {
    "name": "Mayonnaise",
    "unit": "g",
    "group": "pantry",
    "kcal": 6.8,
    "protein": 0.01,
    "fat": 0.75,
    "sugar": 0.02,
    "fiber": 0,
    "home": {
      "unit": "tbsp",
      "size": 14
    },
    "price": 1.4
  },
  "chia": {
    "name": "Chia seeds",
    "unit": "g",
    "group": "pantry",
    "kcal": 4.9,
    "protein": 0.17,
    "fat": 0.31,
    "sugar": 0,
    "fiber": 0.34,
    "home": {
      "unit": "tbsp",
      "size": 12
    },
    "price": 3.5
  },
  "mango": {
    "name": "Mangoes",
    "unit": "g",
    "group": "produce",
    "kcal": 0.6,
    "protein": 0.008,
    "fat": 0.004,
    "sugar": 0.14,
    "fiber": 0.016,
    "home": {
      "unit": "cup",
      "size": 165
    },
    "price": 1
  },
  "feta": {
    "name": "Feta cheese",
    "unit": "g",
    "group": "protein",
    "kcal": 2.6,
    "protein": 0.14,
    "fat": 0.21,
    "sugar": 0.04,
    "fiber": 0,
    "home": {
      "unit": "cup",
      "size": 150
    },
    "price": 2.5
  },
  "potato": {
    "name": "Potatoes",
    "unit": "g",
    "group": "produce",
    "kcal": 0.77,
    "protein": 0.02,
    "fat": 0.001,
    "sugar": 0.008,
    "fiber": 0.022,
    "home": {
      "unit": "piece",
      "size": 170
    },
    "price": 0.3
  },
  "tomatopaste": {
    "name": "Tomato paste",
    "unit": "g",
    "group": "pantry",
    "kcal": 0.82,
    "protein": 0.04,
    "fat": 0.005,
    "sugar": 0.19,
    "fiber": 0.05,
    "home": {
      "unit": "tbsp",
      "size": 16
    },
    "price": 1.5
  },
  "paprika": {
    "name": "Paprika",
    "unit": "g",
    "group": "pantry",
    "kcal": 2.8,
    "protein": 0.14,
    "fat": 0.13,
    "sugar": 0.1,
    "fiber": 0.35,
    "home": {
      "unit": "tsp",
      "size": 2
    },
    "price": 5
  },
  "cumin": {
    "name": "Cumin",
    "unit": "g",
    "group": "pantry",
    "kcal": 3.75,
    "protein": 0.18,
    "fat": 0.22,
    "sugar": 0,
    "fiber": 0.1,
    "home": {
      "unit": "tsp",
      "size": 2
    },
    "price": 5
  },
  "mustard": {
    "name": "Mustard",
    "unit": "g",
    "group": "pantry",
    "kcal": 0.66,
    "protein": 0.04,
    "fat": 0.036,
    "sugar": 0.06,
    "fiber": 0.03,
    "home": {
      "unit": "tsp",
      "size": 5
    },
    "price": 1.2
  },
  "coriander": {
    "name": "Fresh coriander",
    "unit": "g",
    "group": "produce",
    "kcal": 0.23,
    "protein": 0.02,
    "fat": 0.005,
    "sugar": 0,
    "fiber": 0.03,
    "home": {
      "unit": "cup",
      "size": 16
    },
    "price": 1
  },
  "parsley": {
    "name": "Fresh parsley",
    "unit": "g",
    "group": "produce",
    "kcal": 0.36,
    "protein": 0.03,
    "fat": 0.008,
    "sugar": 0.01,
    "fiber": 0.03,
    "home": {
      "unit": "cup",
      "size": 60
    },
    "price": 1.5
  },
  "butter": {
    "name": "Butter",
    "unit": "g",
    "group": "pantry",
    "kcal": 7.2,
    "protein": 0.01,
    "fat": 0.81,
    "sugar": 0.01,
    "fiber": 0,
    "home": {
      "unit": "tbsp",
      "size": 14
    },
    "price": 1.8
  },
  "chickenstock": {
    "name": "Chicken stock",
    "unit": "ml",
    "group": "pantry",
    "kcal": 0.1,
    "protein": 0.01,
    "fat": 0,
    "sugar": 0,
    "fiber": 0,
    "home": {
      "unit": "cup",
      "size": 240
    },
    "price": 0.3
  },
  "flour": {
    "name": "Plain flour",
    "unit": "g",
    "group": "pantry",
    "kcal": 3.6,
    "protein": 0.1,
    "fat": 0.01,
    "sugar": 0,
    "fiber": 0.03,
    "home": {
      "unit": "cup",
      "size": 125
    },
    "price": 0.5
  },
  "pasta": {
    "name": "Dry pasta or noodles",
    "unit": "g",
    "group": "pantry",
    "kcal": 3.6,
    "protein": 0.13,
    "fat": 0.015,
    "sugar": 0.01,
    "fiber": 0.03,
    "home": {
      "unit": "cup",
      "size": 90
    },
    "price": 0.6
  },
  "cornflour": {
    "name": "Cornflour",
    "unit": "g",
    "group": "pantry",
    "kcal": 3.8,
    "protein": 0.003,
    "fat": 0.001,
    "sugar": 0,
    "fiber": 0.002,
    "home": {
      "unit": "tbsp",
      "size": 8
    },
    "price": 1
  },
  "sweetcorn": {
    "name": "Sweet corn kernels",
    "unit": "g",
    "group": "produce",
    "kcal": 0.86,
    "protein": 0.032,
    "fat": 0.012,
    "sugar": 0.063,
    "fiber": 0.027,
    "home": {
      "unit": "cup",
      "size": 154
    },
    "price": 0.8
  },
  "sesameoil": {
    "name": "Sesame oil",
    "unit": "ml",
    "group": "pantry",
    "kcal": 8.9,
    "protein": 0,
    "fat": 1,
    "sugar": 0,
    "fiber": 0,
    "home": {
      "unit": "tbsp",
      "size": 14
    },
    "price": 4
  },
  "tofu": {
    "name": "Silken tofu",
    "unit": "g",
    "group": "protein",
    "kcal": 0.6,
    "protein": 0.05,
    "fat": 0.03,
    "sugar": 0.01,
    "fiber": 0,
    "home": {
      "unit": "cup",
      "size": 250
    },
    "price": 1
  },
  "mozzarella": {
    "name": "Mozzarella",
    "unit": "g",
    "group": "protein",
    "kcal": 2.8,
    "protein": 0.22,
    "fat": 0.22,
    "sugar": 0.01,
    "fiber": 0,
    "home": {
      "unit": "cup",
      "size": 112
    },
    "price": 2.2
  },
  "parmesan": {
    "name": "Parmesan",
    "unit": "g",
    "group": "protein",
    "kcal": 4.3,
    "protein": 0.38,
    "fat": 0.29,
    "sugar": 0.01,
    "fiber": 0,
    "home": {
      "unit": "tbsp",
      "size": 5
    },
    "price": 6
  },
  "cream": {
    "name": "Cooking cream",
    "unit": "ml",
    "group": "protein",
    "kcal": 2,
    "protein": 0.03,
    "fat": 0.2,
    "sugar": 0.03,
    "fiber": 0,
    "home": {
      "unit": "cup",
      "size": 240
    },
    "price": 0.9
  },
  "mushroom": {
    "name": "Mushrooms",
    "unit": "g",
    "group": "produce",
    "kcal": 0.22,
    "protein": 0.031,
    "fat": 0.003,
    "sugar": 0.02,
    "fiber": 0.01,
    "home": {
      "unit": "cup",
      "size": 70
    },
    "price": 1.2
  },
  "broccoli": {
    "name": "Broccoli",
    "unit": "g",
    "group": "produce",
    "kcal": 0.34,
    "protein": 0.028,
    "fat": 0.004,
    "sugar": 0.017,
    "fiber": 0.026,
    "home": {
      "unit": "cup",
      "size": 91
    },
    "price": 0.8
  },
  "zucchini": {
    "name": "Zucchini",
    "unit": "g",
    "group": "produce",
    "kcal": 0.17,
    "protein": 0.012,
    "fat": 0.003,
    "sugar": 0.025,
    "fiber": 0.01,
    "home": {
      "unit": "piece",
      "size": 200
    },
    "price": 0.4
  },
  "herbs": {
    "name": "Mixed dried herbs",
    "unit": "g",
    "group": "pantry",
    "kcal": 2.6,
    "protein": 0.1,
    "fat": 0.05,
    "sugar": 0,
    "fiber": 0.3,
    "home": {
      "unit": "tsp",
      "size": 1
    },
    "price": 4
  },
  "chillipowder": {
    "name": "Chilli powder",
    "unit": "g",
    "group": "pantry",
    "kcal": 3.2,
    "protein": 0.15,
    "fat": 0.14,
    "sugar": 0.03,
    "fiber": 0.3,
    "home": {
      "unit": "tsp",
      "size": 2.6
    },
    "price": 4
  },
  "garlicpowder": {
    "name": "Garlic powder",
    "unit": "g",
    "group": "pantry",
    "kcal": 3.3,
    "protein": 0.16,
    "fat": 0.007,
    "sugar": 0.02,
    "fiber": 0.2,
    "home": {
      "unit": "tsp",
      "size": 3
    },
    "price": 3
  },
  "oystersauce": {
    "name": "Oyster sauce",
    "unit": "ml",
    "group": "pantry",
    "kcal": 0.51,
    "protein": 0.05,
    "fat": 0,
    "sugar": 0.04,
    "fiber": 0,
    "home": {
      "unit": "tbsp",
      "size": 15
    },
    "price": 1
  },
  "blackbeans": {
    "name": "Black beans, cooked",
    "unit": "g",
    "group": "protein",
    "kcal": 1.3,
    "protein": 0.09,
    "fat": 0.005,
    "sugar": 0.003,
    "fiber": 0.085,
    "home": {
      "unit": "cup",
      "size": 172
    },
    "price": 0.9
  },
  "lettuce": {
    "name": "Lettuce",
    "unit": "g",
    "group": "produce",
    "kcal": 0.15,
    "protein": 0.014,
    "fat": 0.002,
    "sugar": 0.008,
    "fiber": 0.013,
    "home": {
      "unit": "cup",
      "size": 47
    },
    "price": 0.5
  },
  "croutons": {
    "name": "Croutons",
    "unit": "g",
    "group": "pantry",
    "kcal": 4,
    "protein": 0.1,
    "fat": 0.1,
    "sugar": 0.02,
    "fiber": 0.03,
    "home": {
      "unit": "cup",
      "size": 30
    },
    "price": 3
  },
  "edamame": {
    "name": "Edamame",
    "unit": "g",
    "group": "protein",
    "kcal": 1.2,
    "protein": 0.117,
    "fat": 0.05,
    "sugar": 0.03,
    "fiber": 0.05,
    "home": {
      "unit": "cup",
      "size": 155
    },
    "price": 1.5
  },
  "spinach": {
    "name": "Spinach",
    "unit": "g",
    "group": "produce",
    "kcal": 0.23,
    "protein": 0.029,
    "fat": 0.004,
    "sugar": 0.004,
    "fiber": 0.022,
    "home": {
      "unit": "cup",
      "size": 30
    },
    "price": 1
  },
  "gochujang": {
    "name": "Gochujang (Korean chilli paste)",
    "unit": "g",
    "group": "pantry",
    "kcal": 2,
    "protein": 0.04,
    "fat": 0.01,
    "sugar": 0.3,
    "fiber": 0.06,
    "home": {
      "unit": "tbsp",
      "size": 17
    },
    "price": 3
  },
  "greenpeas": {
    "name": "Green peas",
    "unit": "g",
    "group": "produce",
    "kcal": 0.81,
    "protein": 0.05,
    "fat": 0.004,
    "sugar": 0.03,
    "fiber": 0.05,
    "home": {
      "unit": "cup",
      "size": 145
    },
    "price": 0.8
  },
  "olives": {
    "name": "Olives",
    "unit": "g",
    "group": "pantry",
    "kcal": 1.5,
    "protein": 0.01,
    "fat": 0.15,
    "sugar": 0,
    "fiber": 0.03,
    "home": {
      "unit": "tbsp",
      "size": 9
    },
    "price": 2
  },
  "sesameseeds": {
    "name": "Sesame seeds",
    "unit": "g",
    "group": "pantry",
    "kcal": 5.7,
    "protein": 0.18,
    "fat": 0.5,
    "sugar": 0.03,
    "fiber": 0.12,
    "home": {
      "unit": "tsp",
      "size": 3
    },
    "price": 6
  },
  "garam": {
    "name": "Garam masala",
    "unit": "g",
    "group": "pantry",
    "kcal": 3.7,
    "protein": 0.13,
    "fat": 0.14,
    "sugar": 0,
    "fiber": 0.2,
    "home": {
      "unit": "tsp",
      "size": 2
    },
    "price": 6
  },
  "hotsauce": {
    "name": "Hot sauce",
    "unit": "ml",
    "group": "pantry",
    "kcal": 0.1,
    "protein": 0,
    "fat": 0,
    "sugar": 0.01,
    "fiber": 0,
    "home": {
      "unit": "tbsp",
      "size": 15
    },
    "price": 1.5
  },
  "springonion": {
    "name": "Spring onions",
    "unit": "g",
    "group": "produce",
    "kcal": 0.3,
    "protein": 0.018,
    "fat": 0.002,
    "sugar": 0.04,
    "fiber": 0.026,
    "home": {
      "unit": "piece",
      "size": 15
    },
    "price": 0.8
  },
  "salmon": {
    "name": "Salmon fillet",
    "unit": "g",
    "group": "protein",
    "kcal": 2,
    "protein": 0.2,
    "fat": 0.13,
    "sugar": 0,
    "fiber": 0,
    "home": {
      "unit": "piece",
      "size": 150
    },
    "price": 3
  }
};

export const RECIPES = {
  "B1": {
    "type": "breakfast",
    "name": "Breakfast Quesadillas",
    "aliases": [
      "quesadilla",
      "breakfast quesadilla",
      "egg quesadilla",
      "quesadillas"
    ],
    "time": 25,
    "yield": 4,
    "desc": "Scrambled eggs with onion, pepper and tomato, folded in tortillas with cheese and crisped in a pan.",
    "ing": {
      "tortilla": 4,
      "eggs": 4,
      "cheese": 85,
      "onion": 55,
      "bellpepper": 60,
      "tomato": 60,
      "oil": 7.5
    },
    "steps": [
      "Scramble the eggs with the onion, pepper and tomato.",
      "Divide the mixture between 4 tortillas and add the grated cheese.",
      "Fold each tortilla in half and cook in a pan until golden on both sides.",
      "Cut into triangles and serve."
    ],
    "storage": "Refrigerate up to 2 days. Reheat in a pan until crisp."
  },
  "B2": {
    "type": "breakfast",
    "name": "Tuna Mayo Cucumber Sandwiches",
    "aliases": [
      "tuna sandwich",
      "tuna sandwiches",
      "tuna mayo sandwich",
      "tuna cucumber sandwich",
      "tuna mayo cucumber sandwiches"
    ],
    "time": 15,
    "yield": 4,
    "desc": "Tuna mayonnaise with cucumber and onion on bread. Prepare the filling ahead.",
    "ing": {
      "bread": 8,
      "tuna": 225,
      "mayo": 60,
      "cucumber": 100,
      "onion": 30,
      "lemon": 7.5
    },
    "steps": [
      "Mix the tuna, mayonnaise, onion, lemon juice and black pepper.",
      "Spread over 4 slices of bread.",
      "Add the sliced cucumber, then top with the remaining bread. Cut into halves."
    ],
    "storage": "Refrigerate the filling up to 2 days. Assemble close to serving time."
  },
  "B3": {
    "type": "breakfast",
    "name": "Egg & Cheese Sandwiches",
    "aliases": [
      "egg sandwich",
      "egg sandwiches",
      "egg and cheese sandwich",
      "cheese egg sandwich",
      "egg cheese sandwich"
    ],
    "time": 20,
    "yield": 4,
    "desc": "Small omelettes with cheese, tomato and onion in toasted bread.",
    "ing": {
      "bread": 8,
      "eggs": 4,
      "cheese": 80,
      "tomato": 60,
      "onion": 30,
      "butter": 14
    },
    "steps": [
      "Beat the eggs with salt and pepper and cook 4 small omelettes.",
      "Place one omelette and one cheese slice between two bread slices.",
      "Add tomato and onion, then toast with butter until golden."
    ],
    "storage": "Best freshly made. Refrigerate cooked eggs up to 3 to 4 days."
  },
  "B4": {
    "type": "breakfast",
    "name": "Mango Chia Pudding",
    "aliases": [
      "mango chia",
      "chia pudding",
      "mango pudding",
      "chia"
    ],
    "time": 15,
    "yield": 4,
    "desc": "Chia pudding made with milk and yoghurt, topped with mango puree.",
    "ing": {
      "chia": 64,
      "milk": 480,
      "yoghurt": 120,
      "mango": 300,
      "honey": 15.75,
      "vanilla": 1.25
    },
    "steps": [
      "Mix the chia seeds, milk, yoghurt, honey and vanilla. Refrigerate 15 minutes, then stir again to stop clumping.",
      "Refrigerate overnight.",
      "Blend the mangoes into a puree.",
      "Divide the pudding into 4 containers and top with the mango puree."
    ],
    "storage": "Refrigerate up to 3 days."
  },
  "B5": {
    "type": "breakfast",
    "name": "Oats, Nuts & Banana Pudding",
    "aliases": [
      "overnight oats",
      "banana oats",
      "oats pudding",
      "oats nuts banana",
      "overnight oat"
    ],
    "time": 15,
    "yield": 4,
    "desc": "Overnight oats with mashed and sliced banana, yoghurt, cinnamon and nuts.",
    "ing": {
      "oats": 120,
      "milk": 480,
      "yoghurt": 240,
      "banana": 240,
      "peanuts": 35,
      "honey": 10.5,
      "cinn": 1.25,
      "vanilla": 2.5
    },
    "steps": [
      "Mash 2 bananas. Combine the oats, milk, yoghurt, mashed banana, cinnamon and vanilla.",
      "Divide into 4 containers and refrigerate overnight.",
      "Top with the sliced remaining bananas and chopped nuts before serving."
    ],
    "storage": "Refrigerate up to 2 days."
  },
  "B6": {
    "type": "breakfast",
    "name": "Crispy Feta Fried Eggs",
    "aliases": [
      "feta eggs",
      "crispy feta eggs",
      "feta fried eggs",
      "fried eggs feta"
    ],
    "time": 15,
    "yield": 4,
    "desc": "Eggs fried over crispy golden feta, with pepper, parsley and chilli flakes. Served with whole-wheat toast.",
    "ing": {
      "eggs": 4,
      "feta": 125,
      "oil": 15,
      "chilli": 1,
      "parsley": 5,
      "bread": 4
    },
    "steps": [
      "Heat a little oil in a non-stick pan and crumble the feta into small portions.",
      "Let the feta turn golden and crispy, then crack an egg over each portion.",
      "Cover and cook until the whites set.",
      "Add pepper, parsley and chilli flakes. Serve with toast. Feta is salty, so taste before adding salt."
    ],
    "storage": "Best freshly made."
  },
  "B7": {
    "type": "breakfast",
    "name": "Yoghurt Custard Toast",
    "aliases": [
      "custard toast",
      "yoghurt toast",
      "yogurt toast",
      "yoghurt custard toast",
      "baked yoghurt toast"
    ],
    "time": 25,
    "yield": 4,
    "desc": "Thick bread with a baked yoghurt custard, honey, vanilla and fruit.",
    "ing": {
      "bread": 4,
      "yoghurt": 180,
      "eggs": 1,
      "honey": 15.75,
      "vanilla": 2.5,
      "strawberry": 75,
      "cinn": 0.6
    },
    "steps": [
      "Mix the yoghurt, eggs, honey and vanilla.",
      "Press a shallow well in the centre of each bread slice and spoon in the custard.",
      "Add fruit and a little cinnamon.",
      "Bake at 180 C for 12 to 15 minutes until the custard is set and the bread is golden."
    ],
    "storage": "Best freshly baked."
  },
  "B8": {
    "type": "breakfast",
    "name": "Oat Pancakes",
    "aliases": [
      "oat pancakes",
      "banana oat pancakes",
      "pancakes",
      "oatmeal pancakes"
    ],
    "time": 20,
    "yield": 4,
    "desc": "Light banana and oat pancakes with cinnamon and vanilla.",
    "ing": {
      "oatflour": 135,
      "banana": 240,
      "eggs": 2,
      "milk": 240,
      "bp": 4,
      "cinn": 1.25,
      "vanilla": 2.5,
      "oil": 15
    },
    "steps": [
      "Mash the bananas. Add the eggs, milk, vanilla and oil.",
      "Mix in the oat flour, baking powder and cinnamon. Rest the batter 5 minutes.",
      "Cook small pancakes in a lightly greased pan.",
      "Serve with sliced banana, yoghurt or honey."
    ],
    "storage": "Refrigerate up to 3 days, or freeze."
  },
  "B9": {
    "type": "breakfast",
    "name": "French Toast",
    "aliases": [
      "french toast",
      "eggy bread",
      "cinnamon french toast"
    ],
    "time": 20,
    "yield": 4,
    "desc": "Bread soaked in egg and cinnamon milk, fried in butter and served with banana.",
    "ing": {
      "bread": 8,
      "eggs": 3,
      "milk": 240,
      "sugar": 6.25,
      "cinn": 1.25,
      "vanilla": 2.5,
      "butter": 21,
      "banana": 120
    },
    "steps": [
      "Whisk the eggs, milk, sugar, cinnamon and vanilla.",
      "Dip each slice of bread in the mixture.",
      "Heat the butter in a pan and cook until golden on both sides.",
      "Serve with banana and a little honey."
    ],
    "storage": "Refrigerate up to 2 days. Reheat in a pan."
  },
  "B10": {
    "type": "breakfast",
    "name": "Avocado Egg Toast",
    "aliases": [
      "avocado toast",
      "avocado egg toast",
      "avo toast",
      "egg avocado toast"
    ],
    "time": 15,
    "yield": 4,
    "desc": "Mashed avocado with lemon on whole-wheat toast, topped with a fried egg and tomato.",
    "ing": {
      "bread": 4,
      "avocado": 300,
      "eggs": 4,
      "lemon": 7.5,
      "tomato": 60
    },
    "steps": [
      "Mash the avocados with lemon juice, salt and pepper.",
      "Toast the bread and spread the avocado over each slice.",
      "Fry or poach the eggs, place one on each toast and finish with tomato."
    ],
    "storage": "Best freshly made."
  },
  "B11": {
    "type": "breakfast",
    "name": "Egg & Potato Salad Sandwiches",
    "aliases": [
      "potato sandwich",
      "egg potato sandwich",
      "potato salad sandwich",
      "egg and potato sandwiches"
    ],
    "time": 30,
    "yield": 4,
    "desc": "Creamy potato and egg filling with mustard and onion in wholemeal sandwiches.",
    "ing": {
      "bread": 8,
      "potato": 450,
      "eggs": 4,
      "mayo": 60,
      "yoghurt": 30,
      "onion": 30,
      "mustard": 7.5
    },
    "steps": [
      "Boil the potatoes until tender, cool and cut into small cubes.",
      "Hard-boil the eggs, peel and chop.",
      "Mix the mayonnaise, yoghurt, mustard, onion and seasoning.",
      "Fold in the potatoes and eggs, divide between 4 sandwiches and refrigerate."
    ],
    "storage": "Refrigerate up to 3 days."
  },
  "B12": {
    "type": "breakfast",
    "name": "Eggs in Hell (Shakshuka)",
    "aliases": [
      "shakshuka",
      "eggs in hell",
      "tomato eggs",
      "shakshuka eggs"
    ],
    "time": 35,
    "yield": 4,
    "desc": "Eggs poached in a spiced tomato and pepper sauce, served with bread.",
    "ing": {
      "eggs": 4,
      "tomato": 360,
      "onion": 90,
      "bellpepper": 120,
      "garlic": 4.5,
      "tomatopaste": 16,
      "paprika": 1,
      "cumin": 0.6,
      "oil": 15,
      "coriander": 7.5,
      "bread": 4
    },
    "steps": [
      "Cook the onion, garlic and peppers in hot oil until soft.",
      "Add the tomatoes, tomato paste, paprika, cumin, salt and pepper. Simmer 10 to 15 minutes.",
      "Make 4 wells in the sauce, crack an egg into each, cover and cook until set.",
      "Garnish with coriander and serve with toast."
    ],
    "storage": "Refrigerate the sauce up to 3 days. Cook the eggs fresh."
  },
  "S1": {
    "type": "snack",
    "sweet": true,
    "name": "Chocolate Chip Oat Cookies",
    "aliases": [
      "chocolate chip oat cookies",
      "oat cookies",
      "chocolate chip cookies",
      "banana oat cookies",
      "cookies"
    ],
    "time": 25,
    "yield": 8,
    "desc": "Banana and oat cookies with dark chocolate chips. Makes 16 cookies; 2 per serving.",
    "ing": {
      "oatflour": 135,
      "oats": 40,
      "eggs": 1,
      "banana": 120,
      "pb": 32,
      "choc": 45,
      "bp": 2.5,
      "cinn": 1.2,
      "vanilla": 5
    },
    "steps": [
      "Preheat the oven to 175 C.",
      "Mash the banana with the egg, peanut butter and vanilla.",
      "Stir in the oat flour, oats, baking powder and cinnamon, then fold in the chocolate chips.",
      "Shape into 16 cookies and bake for 12 to 15 minutes until lightly golden."
    ],
    "storage": "Keep in an airtight container for 4 to 5 days."
  },
  "S2": {
    "type": "snack",
    "sweet": true,
    "name": "Banana Chocolate Chip Muffins",
    "aliases": [
      "banana muffins",
      "chocolate chip muffins",
      "banana chocolate muffins",
      "muffins"
    ],
    "time": 30,
    "yield": 8,
    "desc": "Oat flour muffins with banana, yoghurt and dark chocolate. 1 muffin per serving.",
    "ing": {
      "banana": 240,
      "oatflour": 135,
      "eggs": 2,
      "yoghurt": 120,
      "milk": 60,
      "choc": 45,
      "bp": 6,
      "cinn": 2.5,
      "vanilla": 5
    },
    "steps": [
      "Preheat the oven to 180 C.",
      "Mash the bananas and mix with the eggs, yoghurt, milk and vanilla.",
      "Add the oat flour, baking powder, baking soda and cinnamon. Fold in the chocolate chips.",
      "Divide into 8 muffin cups and bake for 18 to 22 minutes."
    ],
    "storage": "Keep refrigerated for 3 to 4 days. Freeze extras."
  },
  "S3": {
    "type": "snack",
    "sweet": true,
    "name": "Avocado Chocolate Brownies",
    "aliases": [
      "avocado brownies",
      "chocolate brownies",
      "brownies",
      "cocoa brownies"
    ],
    "time": 30,
    "yield": 8,
    "desc": "Fudgy brownies made with avocado and cocoa. 1 brownie per serving.",
    "ing": {
      "avocado": 150,
      "eggs": 2,
      "oatflour": 45,
      "cocoa": 22,
      "honey": 21,
      "milk": 60,
      "choc": 18,
      "bp": 1.2,
      "vanilla": 5
    },
    "steps": [
      "Preheat the oven to 175 C.",
      "Mash the avocado until completely smooth. Add the eggs, milk, vanilla and honey.",
      "Mix in the oat flour, cocoa and baking powder. Fold in the chocolate chips.",
      "Pour into a lined 20 cm square tin and bake for 20 to 25 minutes. Cool before cutting."
    ],
    "storage": "Keep refrigerated for 3 to 4 days. Freeze extras."
  },
  "S4": {
    "type": "snack",
    "sweet": true,
    "name": "Strawberry Banana Yoghurt Bark",
    "aliases": [
      "yoghurt bark",
      "frozen yoghurt bark",
      "strawberry yoghurt bark",
      "frozen yogurt"
    ],
    "time": 15,
    "yield": 8,
    "desc": "Frozen yoghurt bark with banana, strawberries, peanuts and chocolate. 1 portion per serving.",
    "ing": {
      "yoghurt": 720,
      "honey": 10.5,
      "banana": 120,
      "strawberry": 75,
      "peanuts": 18,
      "choc": 18
    },
    "steps": [
      "Mix the yoghurt with the honey.",
      "Spread onto a parchment-lined tray.",
      "Scatter the sliced banana and strawberries, then sprinkle with the peanuts and chocolate chips.",
      "Freeze for 4 to 5 hours, then break into 8 portions."
    ],
    "storage": "Keep frozen in an airtight container."
  },
  "S5": {
    "type": "snack",
    "sweet": true,
    "name": "Chocolate Oat Energy Balls",
    "aliases": [
      "energy balls",
      "energy bites",
      "oat balls",
      "oatmeal balls",
      "chocolate oat balls"
    ],
    "time": 20,
    "yield": 8,
    "desc": "No-bake oat, peanut and date balls with cocoa. 2 balls per serving.",
    "ing": {
      "oats": 120,
      "peanuts": 70,
      "cocoa": 21,
      "dates": 64,
      "milk": 60,
      "vanilla": 5
    },
    "steps": [
      "Blend the dates into a paste.",
      "Add the oats, peanuts and cocoa and mix.",
      "Add the milk gradually until the mixture holds together.",
      "Roll into 16 balls and refrigerate for 30 minutes."
    ],
    "storage": "Keep refrigerated for 5 to 7 days."
  },
  "S6": {
    "type": "snack",
    "sweet": true,
    "name": "Guava Yoghurt Dessert Cups",
    "aliases": [
      "guava yoghurt",
      "guava cups",
      "yoghurt guava",
      "guava dessert"
    ],
    "time": 15,
    "yield": 8,
    "desc": "Fresh guava layered with yoghurt, milk, honey and crushed peanuts. A fruity, light snack.",
    "ing": {
      "guava": 400,
      "yoghurt": 480,
      "milk": 120,
      "honey": 21,
      "vanilla": 2.5,
      "peanuts": 35,
      "cinn": 0.5
    },
    "steps": [
      "Chop the guavas into small pieces, removing hard seeds if you prefer.",
      "Mix the yoghurt, milk, honey and vanilla.",
      "Divide the guava between 8 small containers and top with the yoghurt mixture.",
      "Sprinkle with crushed peanuts and cinnamon. Refrigerate for 1 hour before serving."
    ],
    "storage": "Keep refrigerated and eat within 1 to 2 days."
  },
  "S7": {
    "type": "snack",
    "sweet": true,
    "name": "Apple Cinnamon Oat Bites",
    "aliases": [
      "apple oat bites",
      "apple muffins",
      "apple cinnamon bites",
      "apple bites"
    ],
    "time": 25,
    "yield": 8,
    "desc": "Mini oat muffins with grated apple and cinnamon. 2 bites per serving.",
    "ing": {
      "oatflour": 135,
      "oats": 40,
      "eggs": 2,
      "apple": 180,
      "milk": 120,
      "yoghurt": 120,
      "cinn": 2.5,
      "bp": 4,
      "honey": 10.5,
      "vanilla": 5
    },
    "steps": [
      "Preheat the oven to 180 C.",
      "Grate the apple and squeeze out the excess liquid.",
      "Whisk the eggs, milk, yoghurt, honey and vanilla. Add the oat flour, oats, cinnamon and baking powder, then fold in the apple.",
      "Divide into 16 mini muffin moulds and bake for 15 to 20 minutes."
    ],
    "storage": "Keep in an airtight tin for 3 to 4 days."
  },
  "S8": {
    "type": "snack",
    "sweet": true,
    "name": "Snickers Apple Salad",
    "aliases": [
      "snickers salad",
      "snicker salad",
      "apple salad",
      "snickers apple salad"
    ],
    "time": 15,
    "yield": 8,
    "desc": "Apple and yoghurt salad with chopped Snickers and peanuts. Sweet; contains added sugar.",
    "ing": {
      "apple": 720,
      "yoghurt": 480,
      "peanuts": 70,
      "snickers": 30,
      "honey": 10.5,
      "vanilla": 2.5,
      "choc": 9
    },
    "steps": [
      "Chop the apples into bite-sized cubes.",
      "Mix the yoghurt, honey and vanilla.",
      "Chop the Snickers into small pieces. Combine the apples, yoghurt and half the Snickers.",
      "Top with the rest of the Snickers and the peanuts. Refrigerate for 30 minutes before serving."
    ],
    "storage": "Best eaten on the day it is made. Add the apples shortly before serving."
  },
  "H1": {
    "type": "drink",
    "name": "Homemade Vanilla Latte",
    "aliases": [
      "latte",
      "vanilla latte",
      "coffee",
      "coffee latte"
    ],
    "time": 5,
    "yield": 4,
    "desc": "Instant coffee with warm milk and vanilla. Honey optional.",
    "ing": {
      "coffee": 8,
      "milk": 800,
      "vanilla": 10,
      "honey": 5
    },
    "steps": [
      "Dissolve the coffee in a little hot water.",
      "Heat the milk, froth if possible, then combine with the coffee and vanilla."
    ],
    "storage": "Make fresh."
  },
  "H2": {
    "type": "drink",
    "name": "Cinnamon Mocha",
    "aliases": [
      "mocha",
      "cinnamon mocha",
      "coffee mocha",
      "chocolate coffee"
    ],
    "time": 5,
    "yield": 4,
    "desc": "Instant coffee and cocoa with cinnamon and warm milk.",
    "ing": {
      "coffee": 8,
      "cocoa": 8,
      "milk": 800,
      "cinn": 2,
      "honey": 7
    },
    "steps": [
      "Mix the coffee and cocoa with a little hot water.",
      "Add the heated milk, cinnamon and honey."
    ],
    "storage": "Make fresh."
  },
  "H3": {
    "type": "drink",
    "name": "Caramel Coffee",
    "aliases": [
      "caramel coffee",
      "coffee caramel"
    ],
    "time": 6,
    "yield": 4,
    "desc": "Coffee with warm milk and a brown sugar caramel note.",
    "ing": {
      "coffee": 8,
      "milk": 800,
      "sugar": 8,
      "vanilla": 10
    },
    "steps": [
      "Melt the brown sugar with a teaspoon of water until syrupy.",
      "Add the coffee and hot milk, then the vanilla."
    ],
    "storage": "Make fresh."
  },
  "H4": {
    "type": "drink",
    "name": "Masala Chai",
    "aliases": [
      "masala chai",
      "chai",
      "milk tea",
      "spiced tea"
    ],
    "time": 10,
    "yield": 4,
    "desc": "Black tea simmered with cardamom, cinnamon, ginger and milk.",
    "ing": {
      "milk": 600,
      "tea": 8,
      "cardamom": 2,
      "cinn": 4,
      "ginger": 24,
      "sugar": 4
    },
    "steps": [
      "Simmer 400 ml water with the ginger, cardamom and cinnamon.",
      "Add the tea and steep 2 minutes.",
      "Add the milk and sugar, simmer gently and strain."
    ],
    "storage": "Make fresh."
  },
  "H5": {
    "type": "drink",
    "name": "Golden Turmeric Milk",
    "aliases": [
      "turmeric milk",
      "golden milk",
      "haldi milk"
    ],
    "time": 6,
    "yield": 4,
    "desc": "Warm milk with turmeric, cinnamon and honey.",
    "ing": {
      "milk": 800,
      "turmeric": 3,
      "cinn": 2.4,
      "honey": 7
    },
    "steps": [
      "Heat everything gently for 4 to 5 minutes.",
      "Whisk until smooth."
    ],
    "storage": "Make fresh."
  },
  "H6": {
    "type": "drink",
    "name": "Ginger Cinnamon Milk Tea",
    "aliases": [
      "milk tea",
      "ginger milk tea",
      "ginger tea with milk"
    ],
    "time": 8,
    "yield": 4,
    "desc": "Black tea with ginger, cinnamon and milk. No sugar.",
    "ing": {
      "milk": 800,
      "tea": 8,
      "ginger": 36,
      "cinn": 4
    },
    "steps": [
      "Simmer the ginger and cinnamon in 400 ml water.",
      "Add the tea and milk, simmer 2 minutes and strain."
    ],
    "storage": "Make fresh."
  },
  "H7": {
    "type": "drink",
    "name": "Apple Cinnamon Drink",
    "aliases": [
      "apple cinnamon",
      "apple tea",
      "hot apple drink",
      "fruit drink"
    ],
    "time": 10,
    "yield": 4,
    "desc": "Apple and cinnamon simmered in water with lemon. Fruity and caffeine-free.",
    "ing": {
      "apple": 360,
      "cinn": 4,
      "lemon": 20,
      "honey": 7
    },
    "steps": [
      "Simmer the sliced apple and cinnamon in 1000 ml water for 8 to 10 minutes.",
      "Add the lemon juice and honey."
    ],
    "storage": "Make fresh."
  },
  "H8": {
    "type": "drink",
    "name": "Lemon Ginger Honey Tea",
    "aliases": [
      "lemon ginger tea",
      "lemon honey tea",
      "ginger lemon tea"
    ],
    "time": 8,
    "yield": 4,
    "desc": "Ginger simmered in water, finished with lemon and honey.",
    "ing": {
      "ginger": 48,
      "lemon": 60,
      "honey": 7
    },
    "steps": [
      "Simmer the ginger in 1000 ml water for 5 to 7 minutes.",
      "Turn off the heat, then add the lemon juice and honey."
    ],
    "storage": "Make fresh."
  },
  "H9": {
    "type": "drink",
    "name": "Guava Ginger Infusion",
    "aliases": [
      "hot fruit ade",
      "fruit ade",
      "guava tea",
      "guava ginger"
    ],
    "time": 10,
    "yield": 4,
    "desc": "Guava and ginger simmered in water, mashed and lightly sweetened with honey.",
    "ing": {
      "guava": 240,
      "ginger": 24,
      "honey": 7
    },
    "steps": [
      "Simmer the chopped guava and ginger in 1000 ml water for 8 minutes.",
      "Mash lightly, strain and sweeten with honey."
    ],
    "storage": "Make fresh."
  },
  "H10": {
    "type": "drink",
    "name": "Orange Cinnamon Tea",
    "aliases": [
      "orange tea",
      "orange cinnamon",
      "citrus tea"
    ],
    "time": 10,
    "yield": 4,
    "desc": "Orange, cinnamon and cloves simmered in water.",
    "ing": {
      "orange": 260,
      "cinn": 4,
      "cloves": 2,
      "honey": 7
    },
    "steps": [
      "Simmer the sliced orange, cinnamon and cloves in 1000 ml water for 8 minutes.",
      "Strain and add honey if you like."
    ],
    "storage": "Make fresh."
  },
  "H11": {
    "type": "drink",
    "name": "Warm Banana Milk",
    "aliases": [
      "banana milk",
      "warm banana",
      "banana drink"
    ],
    "time": 8,
    "yield": 4,
    "desc": "Blended banana and warm milk with cinnamon and vanilla. Do not boil.",
    "ing": {
      "banana": 360,
      "milk": 800,
      "cinn": 2.4,
      "vanilla": 10
    },
    "steps": [
      "Blend the banana with the milk.",
      "Heat gently in a saucepan, stirring, without boiling. Add cinnamon and vanilla."
    ],
    "storage": "Make fresh."
  },
  "H12": {
    "type": "drink",
    "name": "Healthy Hot Cocoa",
    "aliases": [
      "hot chocolate",
      "cocoa",
      "hot cocoa"
    ],
    "time": 5,
    "yield": 4,
    "desc": "Unsweetened cocoa with warm milk, honey, cinnamon and vanilla.",
    "ing": {
      "milk": 800,
      "cocoa": 8,
      "honey": 7,
      "cinn": 2.4,
      "vanilla": 5
    },
    "steps": [
      "Mix the cocoa with a little milk into a paste.",
      "Add the rest of the milk and heat gently.",
      "Finish with honey, vanilla and cinnamon."
    ],
    "storage": "Make fresh."
  },
  "K1": {
    "type": "drink",
    "name": "Citrus Marmalade Tea (Yuzu-style)",
    "aliases": [
      "yuzu tea",
      "korean tea",
      "citrus tea",
      "marmalade tea",
      "yuja tea",
      "hot fruit ade",
      "fruit ade"
    ],
    "time": 3,
    "yield": 4,
    "desc": "Korean-style citrus marmalade with honey and hot water. Tangy and fragrant.",
    "ing": {
      "marmalade": 50,
      "honey": 7
    },
    "steps": [
      "Stir the marmalade and honey into a cup.",
      "Add 800 ml hot water and stir."
    ],
    "storage": "Make fresh."
  },
  "K2": {
    "type": "drink",
    "name": "Strawberry Hot Tea",
    "aliases": [
      "strawberry tea",
      "strawberry ade",
      "hot fruit ade",
      "fruit ade"
    ],
    "time": 8,
    "yield": 4,
    "desc": "Strawberries simmered with lemon and a little honey.",
    "ing": {
      "strawberry": 240,
      "lemon": 40,
      "honey": 7
    },
    "steps": [
      "Mash the strawberries and simmer in 800 ml water for 3 minutes.",
      "Strain, add lemon juice and honey."
    ],
    "storage": "Make fresh."
  },
  "K3": {
    "type": "drink",
    "name": "Korean Lemon Honey Tea",
    "aliases": [
      "lemon honey tea",
      "lemon tea",
      "honey lemon"
    ],
    "time": 3,
    "yield": 4,
    "desc": "Lemon slices steeped with honey in hot water.",
    "ing": {
      "lemon": 160,
      "honey": 30
    },
    "steps": [
      "Put the lemon slices and honey in a cup.",
      "Add 800 ml hot water and stir."
    ],
    "storage": "Make fresh."
  },
  "K4": {
    "type": "drink",
    "name": "Grapefruit Honey Tea",
    "aliases": [
      "grapefruit tea",
      "grapefruit honey",
      "hot fruit ade",
      "fruit ade"
    ],
    "time": 5,
    "yield": 4,
    "desc": "Grapefruit with honey and a little lemon. Sweet with a bitter citrus note.",
    "ing": {
      "grapefruit": 240,
      "honey": 10,
      "lemon": 20
    },
    "steps": [
      "Simmer the grapefruit pieces in 800 ml water for 5 minutes.",
      "Add lemon juice and honey."
    ],
    "storage": "Make fresh."
  },
  "K5": {
    "type": "drink",
    "name": "Peach Fruit Tea",
    "aliases": [
      "peach tea",
      "peach ade",
      "hot fruit ade",
      "fruit ade"
    ],
    "time": 8,
    "yield": 4,
    "desc": "Peach simmered with lemon in hot water.",
    "ing": {
      "peach": 320,
      "lemon": 20
    },
    "steps": [
      "Simmer the sliced peach in 800 ml water for 5 minutes.",
      "Add lemon juice and serve."
    ],
    "storage": "Make fresh."
  },
  "K6": {
    "type": "drink",
    "name": "Korean Plum Tea (Maesil-cha)",
    "aliases": [
      "plum tea",
      "maesil tea",
      "plum ade",
      "hot fruit ade"
    ],
    "time": 2,
    "yield": 4,
    "desc": "Green plum syrup in hot water. Sweet, fruity and slightly tart.",
    "ing": {
      "maesil": 40
    },
    "steps": [
      "Put the plum syrup in a cup.",
      "Add 800 ml hot water and stir."
    ],
    "storage": "Make fresh."
  },
  "K7": {
    "type": "drink",
    "name": "Raspberry Hibiscus Tea",
    "aliases": [
      "raspberry tea",
      "hibiscus tea",
      "hot fruit ade",
      "fruit ade"
    ],
    "time": 8,
    "yield": 4,
    "desc": "Raspberry with hibiscus tea and a little honey.",
    "ing": {
      "raspberry": 160,
      "hibiscus": 8,
      "honey": 7
    },
    "steps": [
      "Steep the hibiscus in 800 ml hot water for 5 minutes.",
      "Mash the raspberries into the tea, strain and add honey."
    ],
    "storage": "Make fresh."
  },
  "K8": {
    "type": "drink",
    "name": "Passion Fruit Honey Tea",
    "aliases": [
      "passion fruit tea",
      "passionfruit tea",
      "hot fruit ade",
      "fruit ade"
    ],
    "time": 4,
    "yield": 4,
    "desc": "Passion fruit pulp with honey and hot water. Tropical and fragrant.",
    "ing": {
      "passionfruit": 144,
      "honey": 14
    },
    "steps": [
      "Put the passion fruit pulp and honey in a cup.",
      "Add 800 ml hot water and stir."
    ],
    "storage": "Make fresh."
  },
  "M1": {
    "type": "main",
    "name": "Chicken, Onion & Potato Soup",
    "aliases": [
      "chicken soup",
      "potato soup",
      "chicken potato soup"
    ],
    "time": 45,
    "yield": 4,
    "desc": "Creamy chicken and potato soup with onion, carrot and thyme.",
    "ing": {
      "chicken": 500,
      "potato": 350,
      "onion": 120,
      "carrot": 60,
      "garlic": 9,
      "chickenstock": 1000,
      "milk": 150,
      "butter": 14,
      "flour": 14,
      "herbs": 1
    },
    "steps": [
      "Melt the butter and sauté the onion and garlic.",
      "Add the chicken and brown lightly. Stir in the flour for one minute.",
      "Add the stock, potatoes and carrot. Simmer 20 minutes.",
      "Add the milk, simmer 5 minutes and mash a few potato pieces to thicken."
    ],
    "storage": "Refrigerate up to 3 days; freezes for 2 to 3 months.",
    "reheat": "Reheat until steaming hot."
  },
  "M2": {
    "type": "main",
    "name": "Creamy Chicken Vegetable Noodle Soup",
    "aliases": [
      "chicken noodle soup",
      "noodle soup",
      "chicken vegetable soup"
    ],
    "time": 40,
    "yield": 4,
    "desc": "Chicken soup with noodles, carrot, cabbage and milk.",
    "ing": {
      "chicken": 500,
      "pasta": 180,
      "carrot": 60,
      "cabbage": 90,
      "onion": 60,
      "garlic": 9,
      "chickenstock": 1000,
      "milk": 150,
      "butter": 14,
      "flour": 14,
      "herbs": 1
    },
    "steps": [
      "Sauté the onion and garlic in butter. Add the chicken and brown.",
      "Stir in the flour, then add the stock, carrot and cabbage. Simmer 12 to 15 minutes.",
      "Add the noodles and cook to the packet instructions.",
      "Stir in the milk and simmer briefly."
    ],
    "storage": "Refrigerate up to 3 days.",
    "reheat": "Reheat until steaming hot; noodles soften on standing."
  },
  "M3": {
    "type": "main",
    "name": "Chicken Sweet Corn Soup",
    "aliases": [
      "sweet corn soup",
      "chicken corn soup",
      "corn soup"
    ],
    "time": 30,
    "yield": 4,
    "desc": "Shredded chicken and sweet corn in a silky egg-thickened broth.",
    "ing": {
      "chicken": 450,
      "sweetcorn": 300,
      "chickenstock": 1200,
      "eggs": 2,
      "carrot": 30,
      "garlic": 9,
      "cornflour": 16,
      "soy": 30,
      "sesameoil": 5,
      "springonion": 20
    },
    "steps": [
      "Simmer the chicken in the stock until cooked. Shred and return to the pot.",
      "Add the sweet corn, carrot and garlic. Simmer 8 minutes.",
      "Mix the cornflour with 4 tbsp cold water and stir in.",
      "Beat the eggs and drizzle in while stirring. Add soy, sesame oil and spring onions."
    ],
    "storage": "Refrigerate up to 3 days.",
    "reheat": "Reheat gently; do not boil hard."
  },
  "M4": {
    "type": "main",
    "name": "Chinese Egg Drop Soup",
    "aliases": [
      "egg drop soup",
      "chinese egg soup",
      "tofu egg soup"
    ],
    "time": 20,
    "yield": 4,
    "desc": "Light broth with egg ribbons, tofu and grated carrot.",
    "ing": {
      "chickenstock": 1200,
      "eggs": 6,
      "tofu": 150,
      "carrot": 60,
      "cornflour": 16,
      "soy": 30,
      "sesameoil": 5,
      "springonion": 20
    },
    "steps": [
      "Bring the stock to a gentle boil. Add carrot, tofu and soy.",
      "Mix the cornflour with 4 tbsp cold water and stir in.",
      "Beat the eggs and pour in a thin stream while stirring. Let them set 30 seconds.",
      "Finish with sesame oil and spring onions."
    ],
    "storage": "Refrigerate up to 2 days.",
    "reheat": "Reheat gently."
  },
  "M5": {
    "type": "main",
    "name": "Chicken & Potato Casserole",
    "aliases": [
      "chicken potato bake",
      "chicken casserole",
      "potato casserole"
    ],
    "time": 60,
    "yield": 4,
    "desc": "Layered chicken, potato, broccoli and carrot in a creamy sauce with mozzarella.",
    "ing": {
      "chicken": 600,
      "potato": 500,
      "onion": 110,
      "carrot": 60,
      "broccoli": 150,
      "milk": 200,
      "chickenstock": 100,
      "mozzarella": 80,
      "flour": 14,
      "garlic": 6,
      "oil": 15,
      "paprika": 2
    },
    "steps": [
      "Preheat the oven to 190 C. Partly boil the potatoes for 7 minutes and slice.",
      "Season the chicken with paprika. Sauté onion, garlic and chicken until lightly browned.",
      "Mix flour, milk and stock into a sauce.",
      "Layer potatoes, chicken, carrot and broccoli in a dish. Pour over the sauce, top with mozzarella and bake 30 to 35 minutes until the chicken reaches 74 C."
    ],
    "storage": "Refrigerate up to 4 days; freezes for 2 to 3 months.",
    "reheat": "Reheat until steaming hot throughout."
  },
  "M6": {
    "type": "main",
    "name": "Creamy Chicken Pasta Bake",
    "aliases": [
      "chicken pasta bake",
      "creamy pasta bake",
      "chicken alfredo bake"
    ],
    "time": 50,
    "yield": 4,
    "desc": "Penne with chicken and mushrooms in a creamy sauce, topped with cheese.",
    "ing": {
      "chicken": 600,
      "pasta": 300,
      "onion": 110,
      "garlic": 9,
      "milk": 200,
      "cream": 100,
      "chickenstock": 100,
      "mozzarella": 100,
      "parmesan": 30,
      "flour": 14,
      "mushroom": 150,
      "herbs": 1
    },
    "steps": [
      "Cook the pasta until just under al dente.",
      "Season and cook the chicken. Add onion, garlic and mushrooms.",
      "Add flour, milk, cream and stock and stir until thick. Add the pasta and chicken.",
      "Top with mozzarella and parmesan and bake at 190 C for 20 minutes until golden."
    ],
    "storage": "Refrigerate up to 4 days.",
    "reheat": "Reheat until steaming hot throughout."
  },
  "M7": {
    "type": "main",
    "name": "Tomato-Based Chicken Pasta Bake",
    "aliases": [
      "tomato pasta bake",
      "chicken tomato pasta",
      "pasta bake"
    ],
    "time": 50,
    "yield": 4,
    "desc": "Pasta and chicken in a tomato sauce with bell pepper, topped with mozzarella.",
    "ing": {
      "chicken": 600,
      "pasta": 300,
      "tomato": 400,
      "onion": 110,
      "garlic": 12,
      "bellpepper": 120,
      "mozzarella": 100,
      "tomatopaste": 16,
      "oil": 15,
      "herbs": 1,
      "paprika": 2
    },
    "steps": [
      "Cook the pasta until slightly firm. Season and pan-fry the chicken.",
      "Sauté onion, garlic and bell pepper. Add tomatoes, tomato paste and herbs. Simmer 10 minutes.",
      "Mix the pasta, chicken and sauce. Transfer to a dish and top with mozzarella.",
      "Bake at 190 C for 15 to 20 minutes."
    ],
    "storage": "Refrigerate up to 4 days.",
    "reheat": "Reheat until steaming hot."
  },
  "M8": {
    "type": "main",
    "name": "Chicken Vegetable Bake",
    "aliases": [
      "roast chicken vegetables",
      "chicken tray bake",
      "chicken and vegetables"
    ],
    "time": 50,
    "yield": 4,
    "desc": "Chicken and vegetables roasted together with garlic, lemon and paprika.",
    "ing": {
      "chicken": 700,
      "broccoli": 250,
      "carrot": 120,
      "bellpepper": 120,
      "zucchini": 200,
      "onion": 110,
      "garlic": 12,
      "oil": 30,
      "lemon": 15,
      "paprika": 4,
      "herbs": 2
    },
    "steps": [
      "Preheat the oven to 200 C. Cut the vegetables into similar pieces.",
      "Mix oil, garlic, lemon juice and spices. Coat the chicken and vegetables.",
      "Spread on a large tray without overcrowding.",
      "Roast 30 to 40 minutes, turning halfway, until the chicken reaches 74 C."
    ],
    "storage": "Refrigerate up to 3 days.",
    "reheat": "Reheat until steaming hot."
  },
  "M9": {
    "type": "main",
    "name": "Grilled Chicken Wraps",
    "aliases": [
      "chicken wrap",
      "grilled chicken wrap",
      "chicken tortilla wrap"
    ],
    "time": 30,
    "yield": 4,
    "desc": "Paprika chicken with peppers, onion, tomato and mozzarella in tortillas with a garlic mayo.",
    "ing": {
      "chicken": 600,
      "tortilla": 4,
      "bellpepper": 120,
      "onion": 110,
      "lettuce": 100,
      "tomato": 120,
      "mozzarella": 60,
      "oil": 15,
      "paprika": 4,
      "garlicpowder": 1,
      "mayo": 45,
      "lemon": 15,
      "garlic": 3
    },
    "steps": [
      "Season the chicken with paprika, garlic powder, salt and pepper. Grill until cooked.",
      "Sauté the onion and bell pepper until soft.",
      "Mix the mayonnaise, lemon juice and minced garlic. Spread on the tortillas.",
      "Add lettuce, tomato, chicken, vegetables and cheese. Fold and toast until golden."
    ],
    "storage": "Refrigerate filling up to 3 days. Assemble and toast fresh.",
    "reheat": "Toast in a pan until warm."
  },
  "M10": {
    "type": "main",
    "name": "Chicken Caesar Wraps",
    "aliases": [
      "caesar wrap",
      "chicken caesar wrap",
      "caesar wraps"
    ],
    "time": 30,
    "yield": 4,
    "desc": "Grilled chicken, romaine and parmesan in tortillas with a Caesar-style dressing.",
    "ing": {
      "chicken": 600,
      "tortilla": 4,
      "lettuce": 150,
      "parmesan": 40,
      "mayo": 60,
      "lemon": 15,
      "garlic": 6,
      "mustard": 5,
      "paprika": 2,
      "croutons": 30
    },
    "steps": [
      "Season and grill the chicken. Slice thinly.",
      "Mix mayonnaise, lemon juice, mustard and crushed garlic. Toss with chopped lettuce.",
      "Add chicken, lettuce, parmesan and croutons to the tortillas.",
      "Roll tightly and toast lightly."
    ],
    "storage": "Refrigerate up to 2 days. Keep croutons separate until serving.",
    "reheat": "Toast lightly."
  },
  "M11": {
    "type": "main",
    "name": "Spicy Chicken Vegetable Wraps",
    "aliases": [
      "spicy chicken wrap",
      "chicken veggie wrap",
      "spicy wrap"
    ],
    "time": 35,
    "yield": 4,
    "desc": "Soy and chilli chicken with onion, pepper, carrot and cabbage in tortillas.",
    "ing": {
      "chicken": 600,
      "tortilla": 4,
      "onion": 110,
      "bellpepper": 120,
      "carrot": 60,
      "cabbage": 100,
      "cheese": 60,
      "oil": 15,
      "soy": 15,
      "chillipowder": 3,
      "paprika": 4,
      "garlic": 4,
      "mayo": 45,
      "hotsauce": 15,
      "lemon": 5
    },
    "steps": [
      "Mix the chicken with soy, chilli, paprika and garlic. Cook until done.",
      "Add onion, carrot, cabbage and bell pepper. Stir-fry 4 to 5 minutes.",
      "Mix mayonnaise, hot sauce and lemon juice. Spread on the tortillas.",
      "Add the chicken mixture and cheese. Roll and toast until golden."
    ],
    "storage": "Refrigerate filling up to 3 days.",
    "reheat": "Toast in a pan until warm."
  },
  "M12": {
    "type": "main",
    "name": "Chicken Vegetable Stir-Fried Rice",
    "aliases": [
      "chicken fried rice",
      "stir fry rice",
      "vegetable fried rice"
    ],
    "time": 35,
    "yield": 4,
    "desc": "Chicken and vegetables stir-fried with rice in soy and oyster sauce.",
    "ing": {
      "chicken": 500,
      "redrice": 300,
      "carrot": 60,
      "bellpepper": 120,
      "broccoli": 150,
      "onion": 110,
      "garlic": 9,
      "soy": 30,
      "oystersauce": 15,
      "oil": 15
    },
    "steps": [
      "Cook the rice and spread it out to cool.",
      "Heat the oil in a wok and cook the chicken until done.",
      "Add garlic, onion, carrot, broccoli and bell pepper. Stir-fry 4 to 5 minutes.",
      "Add the rice, soy, oyster sauce and pepper. Toss and divide into 4."
    ],
    "storage": "Cool quickly and refrigerate within 1 hour. Eat within 24 hours.",
    "reheat": "Reheat until steaming hot throughout; reheat once only."
  },
  "M13": {
    "type": "main",
    "name": "Garlic Butter Chicken Rice",
    "aliases": [
      "garlic butter chicken",
      "butter chicken rice",
      "garlic chicken rice"
    ],
    "time": 35,
    "yield": 4,
    "desc": "Chicken and rice cooked in garlic butter stock with sweet corn and carrot.",
    "ing": {
      "chicken": 600,
      "redrice": 300,
      "butter": 30,
      "garlic": 15,
      "onion": 110,
      "sweetcorn": 100,
      "carrot": 100,
      "chickenstock": 600,
      "paprika": 2,
      "herbs": 1,
      "springonion": 20
    },
    "steps": [
      "Season the chicken with paprika, herbs and salt. Cook half the butter and the chicken. Set aside.",
      "Melt the rest of the butter and sauté garlic and onion. Add carrot and sweet corn.",
      "Add the rice and stir 1 minute, then the stock. Cook to the rice instructions.",
      "Add the chicken for the last few minutes. Garnish with spring onions."
    ],
    "storage": "Refrigerate up to 24 hours.",
    "reheat": "Reheat until steaming hot."
  },
  "M14": {
    "type": "main",
    "name": "Teriyaki Chicken Rice",
    "aliases": [
      "teriyaki chicken",
      "chicken teriyaki",
      "teriyaki rice"
    ],
    "time": 35,
    "yield": 4,
    "desc": "Teriyaki chicken with broccoli and pepper, served over rice.",
    "ing": {
      "chicken": 600,
      "redrice": 300,
      "broccoli": 200,
      "carrot": 60,
      "bellpepper": 120,
      "oil": 15,
      "sesameseeds": 4,
      "soy": 60,
      "honey": 7.5,
      "lemon": 15,
      "garlic": 6,
      "ginger": 5,
      "cornflour": 3,
      "springonion": 10
    },
    "steps": [
      "Cook the rice and set aside.",
      "Mix soy, honey, lemon juice, garlic, ginger, cornflour and 3 tbsp water into the sauce.",
      "Cook the chicken in oil until done. Add broccoli, carrot and bell pepper.",
      "Pour in the sauce and simmer until thick. Serve with rice, sesame seeds and spring onions."
    ],
    "storage": "Refrigerate up to 24 hours.",
    "reheat": "Reheat until steaming hot."
  },
  "M15": {
    "type": "main",
    "name": "Chicken Egg Fried Rice",
    "aliases": [
      "egg fried rice",
      "chicken egg fried rice",
      "fried rice"
    ],
    "time": 35,
    "yield": 4,
    "desc": "Chicken, peas and scrambled egg fried with rice in soy and oyster sauce.",
    "ing": {
      "chicken": 400,
      "redrice": 300,
      "eggs": 5,
      "greenpeas": 100,
      "carrot": 60,
      "onion": 110,
      "garlic": 9,
      "soy": 30,
      "oystersauce": 15,
      "sesameoil": 15,
      "springonion": 10
    },
    "steps": [
      "Cook the rice, cool quickly and refrigerate if preparing ahead.",
      "Scramble the eggs and set aside. Cook the chicken in oil until done.",
      "Add garlic, onion, carrot and peas. Add the rice and break up any clumps.",
      "Add soy, oyster sauce, pepper and the eggs. Garnish with spring onions."
    ],
    "storage": "Cool quickly and refrigerate within 1 hour. Eat within 24 hours.",
    "reheat": "Reheat once only until steaming hot."
  },
  "M16": {
    "type": "main",
    "name": "Mexican Chicken Burrito Bowl",
    "aliases": [
      "burrito bowl",
      "chicken burrito bowl",
      "mexican bowl"
    ],
    "time": 40,
    "yield": 4,
    "desc": "Spiced chicken, black beans, corn and avocado over rice, with fresh tomato salsa.",
    "ing": {
      "chicken": 600,
      "redrice": 300,
      "blackbeans": 150,
      "sweetcorn": 150,
      "bellpepper": 120,
      "onion": 110,
      "avocado": 150,
      "tomato": 240,
      "lemon": 15,
      "oil": 15,
      "paprika": 4,
      "cumin": 2,
      "chillipowder": 2,
      "garlicpowder": 2
    },
    "steps": [
      "Cook the rice and set aside.",
      "Season the chicken with the spices and oil. Grill or pan-fry until cooked.",
      "Sauté the bell pepper and onion. Make a salsa with chopped tomato, lime juice and onion.",
      "Divide the rice into 4 bowls. Add chicken, beans, corn and vegetables. Top with avocado and salsa."
    ],
    "storage": "Refrigerate components separately up to 3 days. Add avocado and salsa fresh.",
    "reheat": "Reheat chicken and rice until steaming."
  },
  "M17": {
    "type": "main",
    "name": "Korean Chicken Bibimbap",
    "aliases": [
      "bibimbap",
      "korean bibimbap",
      "korean rice bowl"
    ],
    "time": 40,
    "yield": 4,
    "desc": "Rice bowl with marinated chicken, vegetables, egg and gochujang sauce.",
    "ing": {
      "chicken": 600,
      "redrice": 300,
      "eggs": 4,
      "carrot": 60,
      "cucumber": 100,
      "spinach": 150,
      "mushroom": 150,
      "garlic": 6,
      "sesameoil": 15,
      "soy": 45,
      "honey": 7.5,
      "ginger": 3,
      "gochujang": 30
    },
    "steps": [
      "Cook the rice. Marinate the chicken in soy, honey, sesame oil, garlic and ginger for 15 minutes.",
      "Pan-fry the chicken until done. Sauté mushrooms and spinach separately. Lightly cook the carrot and slice the cucumber.",
      "Fry 4 eggs. Mix the gochujang sauce with soy, honey and a little water.",
      "Divide the rice into 4 bowls. Arrange the chicken and vegetables over it, add an egg and drizzle with sauce."
    ],
    "storage": "Refrigerate components separately up to 3 days.",
    "reheat": "Reheat rice and chicken until steaming."
  },
  "M18": {
    "type": "main",
    "name": "Soy Garlic Egg Rice Bowl",
    "aliases": [
      "soy egg bowl",
      "garlic egg rice",
      "egg rice bowl",
      "soy garlic eggs"
    ],
    "time": 30,
    "yield": 4,
    "desc": "Soft-boiled eggs simmered in garlic soy with rice and edamame.",
    "ing": {
      "eggs": 8,
      "redrice": 300,
      "garlic": 12,
      "soy": 45,
      "honey": 7.5,
      "sesameoil": 5,
      "springonion": 20,
      "sesameseeds": 4,
      "edamame": 150
    },
    "steps": [
      "Boil the eggs 8 to 10 minutes, cool and peel.",
      "Heat the sesame oil and sauté the garlic. Add soy, honey and 150 ml water.",
      "Add the eggs and simmer 5 to 7 minutes, turning occasionally.",
      "Cook the rice separately. Divide into 4 bowls with two eggs each, sauce, edamame, spring onions and sesame seeds."
    ],
    "storage": "Refrigerate eggs and sauce up to 3 days.",
    "reheat": "Reheat sauce and eggs gently."
  },
  "M19": {
    "type": "main",
    "name": "Korean Spicy Chicken Rice Bowl",
    "aliases": [
      "spicy chicken bowl",
      "gochujang chicken",
      "korean spicy chicken"
    ],
    "time": 35,
    "yield": 4,
    "desc": "Gochujang chicken with broccoli, cucumber and sesame over rice.",
    "ing": {
      "chicken": 600,
      "redrice": 300,
      "broccoli": 200,
      "carrot": 60,
      "cucumber": 100,
      "onion": 110,
      "sesameoil": 15,
      "sesameseeds": 4,
      "gochujang": 30,
      "soy": 30,
      "honey": 7.5,
      "garlic": 6,
      "ginger": 5
    },
    "steps": [
      "Cook the rice. Mix gochujang, soy, honey, garlic, ginger and 2 tbsp water.",
      "Heat sesame oil and cook the chicken until done. Add onion and carrot.",
      "Pour in the sauce and simmer until thick. Steam the broccoli separately.",
      "Divide the rice into 4 bowls. Add chicken, broccoli and cucumber. Sprinkle with sesame seeds."
    ],
    "storage": "Refrigerate up to 3 days.",
    "reheat": "Reheat chicken and rice until steaming."
  },
  "M20": {
    "type": "main",
    "name": "Grilled Chicken Caesar Salad",
    "aliases": [
      "caesar salad",
      "chicken caesar salad",
      "grilled caesar"
    ],
    "time": 30,
    "yield": 4,
    "desc": "Grilled chicken on romaine with cherry tomatoes, parmesan and garlic bread.",
    "ing": {
      "chicken": 600,
      "lettuce": 300,
      "tomato": 150,
      "parmesan": 40,
      "bread": 4,
      "mayo": 100,
      "lemon": 15,
      "mustard": 5,
      "garlic": 6,
      "oil": 5,
      "parsley": 5
    },
    "steps": [
      "Season and grill the chicken. Slice.",
      "Mix mayonnaise, lemon juice, mustard and garlic with 2 tbsp water to thin.",
      "Toss the chopped lettuce and tomatoes with the dressing and parmesan.",
      "Rub the bread with garlic, oil and parsley and toast. Serve with the salad and chicken."
    ],
    "storage": "Refrigerate dressed salad up to 1 day; keep chicken and bread separate.",
    "reheat": "Serve chicken warm."
  },
  "M21": {
    "type": "main",
    "name": "Mediterranean Chicken Salad",
    "aliases": [
      "mediterranean salad",
      "greek chicken salad",
      "chicken feta salad"
    ],
    "time": 25,
    "yield": 4,
    "desc": "Grilled chicken with cucumber, tomato, olives and feta in a lemon-olive oil dressing.",
    "ing": {
      "chicken": 600,
      "cucumber": 200,
      "tomato": 200,
      "onion": 110,
      "bellpepper": 120,
      "lettuce": 100,
      "feta": 100,
      "olives": 80,
      "oil": 30,
      "lemon": 30,
      "garlic": 2,
      "herbs": 1
    },
    "steps": [
      "Season the chicken with herbs, salt and pepper. Grill until cooked.",
      "Chop the cucumber, tomato, onion and bell pepper.",
      "Combine the vegetables, lettuce, olives and feta. Mix oil, lemon juice and garlic.",
      "Slice the chicken, add to the salad and drizzle with dressing."
    ],
    "storage": "Refrigerate up to 2 days; dress just before serving.",
    "reheat": "Serve cold or at room temperature."
  },
  "M22": {
    "type": "main",
    "name": "High-Protein Chicken Pasta Salad",
    "aliases": [
      "chicken pasta salad",
      "pasta salad",
      "chicken fusilli salad"
    ],
    "time": 35,
    "yield": 4,
    "desc": "Fusilli with chicken, sweet corn, vegetables and cheddar in a mustard mayo dressing.",
    "ing": {
      "chicken": 500,
      "pasta": 250,
      "sweetcorn": 100,
      "cucumber": 200,
      "bellpepper": 120,
      "tomato": 150,
      "onion": 55,
      "cheese": 60,
      "mayo": 100,
      "lemon": 30,
      "mustard": 5,
      "garlic": 3
    },
    "steps": [
      "Cook the pasta to the packet instructions. Drain and cool.",
      "Season and cook the chicken. Dice it with the vegetables.",
      "Mix mayonnaise, lemon juice, mustard and garlic.",
      "Combine the pasta, chicken, vegetables and cheese. Add the dressing and chill 30 minutes."
    ],
    "storage": "Refrigerate up to 3 days.",
    "reheat": "Serve chilled."
  },
  "M23": {
    "type": "main",
    "name": "Butter Chicken with Rice",
    "aliases": [
      "butter chicken",
      "chicken butter masala",
      "butter chicken rice"
    ],
    "time": 50,
    "yield": 4,
    "desc": "Chicken in a smooth tomato and cream sauce with garam masala, served with rice.",
    "ing": {
      "chicken": 700,
      "redrice": 300,
      "onion": 220,
      "tomato": 360,
      "garlic": 12,
      "ginger": 15,
      "cream": 100,
      "butter": 20,
      "oil": 15,
      "garam": 4,
      "paprika": 4,
      "turmeric": 2,
      "cumin": 2,
      "chillipowder": 2
    },
    "steps": [
      "Season the chicken with turmeric, paprika, chilli and salt. Cook in oil until done. Set aside.",
      "Melt the butter and sauté onion, garlic and ginger. Add the tomatoes and spices.",
      "Cook until soft, then blend into a smooth sauce. Return to the pan with the cream.",
      "Add the chicken and simmer 5 minutes. Serve with cooked rice."
    ],
    "storage": "Refrigerate up to 3 days; freezes for 2 months.",
    "reheat": "Reheat until steaming hot throughout."
  },
  "M24": {
    "type": "main",
    "name": "Homemade Chicken Stew",
    "aliases": [
      "chicken stew",
      "potato stew",
      "chicken potato stew"
    ],
    "time": 55,
    "yield": 4,
    "desc": "Chicken, potato, carrot and green beans in a herby broth.",
    "ing": {
      "chicken": 600,
      "potato": 350,
      "carrot": 120,
      "onion": 110,
      "greenbeans": 150,
      "garlic": 9,
      "chickenstock": 750,
      "oil": 15,
      "flour": 14,
      "herbs": 2
    },
    "steps": [
      "Heat oil and sauté onion and garlic. Add chicken and brown lightly.",
      "Stir in the flour, then add the stock, potatoes, carrots and herbs. Simmer 20 minutes.",
      "Add the green beans and cook until tender. Adjust seasoning."
    ],
    "storage": "Refrigerate up to 3 days; freezes for 2 to 3 months.",
    "reheat": "Reheat until steaming hot."
  },
  "M25": {
    "type": "main",
    "name": "Creamy Spicy Garlic Chicken",
    "aliases": [
      "garlic chicken",
      "creamy garlic chicken",
      "spicy garlic chicken"
    ],
    "time": 30,
    "yield": 4,
    "desc": "Sliced chicken in a creamy garlic and parmesan sauce with a little chilli.",
    "ing": {
      "chicken": 700,
      "cream": 200,
      "garlic": 15,
      "onion": 110,
      "butter": 14,
      "oil": 15,
      "paprika": 2,
      "chillipowder": 1,
      "chickenstock": 100,
      "parmesan": 30,
      "parsley": 5
    },
    "steps": [
      "Slice the chicken and season with paprika, chilli, salt and pepper. Cook in oil until done. Set aside.",
      "Melt the butter and sauté garlic and onion. Add the stock and cream.",
      "Add the parmesan and simmer until creamy. Return the chicken for 3 to 5 minutes.",
      "Garnish with parsley. Serve with rice, potatoes or garlic bread."
    ],
    "storage": "Refrigerate up to 3 days.",
    "reheat": "Reheat gently with a splash of stock."
  },
  "M26": {
    "type": "main",
    "name": "Soy Sauce Egg Curry with Rice",
    "aliases": [
      "egg curry",
      "soy egg curry",
      "egg rice curry"
    ],
    "time": 30,
    "yield": 4,
    "desc": "Boiled eggs simmered in a soy, oyster and chilli sauce, served with rice and edamame.",
    "ing": {
      "eggs": 8,
      "redrice": 300,
      "onion": 110,
      "garlic": 12,
      "ginger": 15,
      "soy": 45,
      "oystersauce": 15,
      "chillipowder": 2,
      "honey": 7.5,
      "sesameoil": 5,
      "edamame": 150,
      "springonion": 10
    },
    "steps": [
      "Boil the eggs 8 to 10 minutes, cool and peel.",
      "Heat the sesame oil and sauté the onion, garlic and ginger.",
      "Add soy, oyster sauce, chilli, honey and 200 ml water. Bring to a gentle simmer.",
      "Add the eggs and cook 5 to 7 minutes, turning. Add edamame and serve with rice and spring onions."
    ],
    "storage": "Refrigerate up to 3 days.",
    "reheat": "Reheat gently."
  },
  "M27": {
    "type": "main",
    "name": "Salmon Mediterranean Salad",
    "aliases": [
      "salmon salad",
      "salmon feta salad",
      "mediterranean salmon"
    ],
    "time": 25,
    "yield": 4,
    "desc": "Grilled salmon on lettuce with cucumber, tomato, olives and feta.",
    "ing": {
      "salmon": 300,
      "lettuce": 150,
      "cucumber": 200,
      "tomato": 200,
      "onion": 110,
      "bellpepper": 120,
      "feta": 100,
      "olives": 60,
      "oil": 30,
      "lemon": 30,
      "garlic": 2,
      "herbs": 1
    },
    "steps": [
      "Season the salmon with herbs, salt and pepper. Grill or pan-fry 3 to 4 minutes each side, then flake.",
      "Chop the cucumber, tomato, onion and bell pepper. Combine with lettuce, olives and feta.",
      "Mix the oil, lemon juice and garlic. Toss through the salad and top with the salmon."
    ],
    "storage": "Refrigerate up to 1 day; keep the dressing separate.",
    "reheat": "Serve cold."
  },
  "M28": {
    "type": "main",
    "name": "Black Bean & Corn Salad",
    "aliases": [
      "black bean salad",
      "bean salad",
      "corn bean salad"
    ],
    "time": 15,
    "yield": 4,
    "desc": "Black beans, sweet corn and avocado with a lime and cumin dressing. No cooking needed.",
    "ing": {
      "blackbeans": 300,
      "sweetcorn": 200,
      "tomato": 200,
      "bellpepper": 120,
      "onion": 110,
      "avocado": 300,
      "lettuce": 150,
      "lemon": 30,
      "oil": 20,
      "chillipowder": 2,
      "cumin": 2
    },
    "steps": [
      "Drain and rinse the black beans if using canned.",
      "Chop the tomato, bell pepper and onion. Shred the lettuce.",
      "Mix the lime juice, oil, cumin and chilli powder. Toss everything together.",
      "Add cubed avocado just before serving."
    ],
    "storage": "Refrigerate up to 2 days; add avocado fresh.",
    "reheat": "Serve cold."
  },
  "M29": {
    "type": "main",
    "name": "Salmon & Cucumber Wraps",
    "aliases": [
      "salmon wrap",
      "salmon tortilla wrap",
      "smoked salmon wrap"
    ],
    "time": 20,
    "yield": 4,
    "desc": "Flaked salmon with cucumber, tomato and lettuce in tortillas with a lemon mayo.",
    "ing": {
      "salmon": 400,
      "tortilla": 4,
      "lettuce": 100,
      "cucumber": 150,
      "tomato": 120,
      "mayo": 60,
      "lemon": 15,
      "herbs": 1,
      "garlic": 3
    },
    "steps": [
      "Season the salmon with herbs and garlic. Pan-fry until just cooked, then flake.",
      "Mix the mayonnaise, lemon juice and a little garlic.",
      "Spread the sauce on the tortillas. Add lettuce, cucumber, tomato and salmon.",
      "Roll up tightly and toast briefly in a pan."
    ],
    "storage": "Refrigerate the filling up to 2 days; assemble fresh.",
    "reheat": "Toast in a pan until warm."
  },
  "M30": {
    "type": "main",
    "name": "Black Bean & Egg Wraps",
    "aliases": [
      "bean wrap",
      "egg bean wrap",
      "black bean wrap",
      "bean and egg wrap"
    ],
    "time": 25,
    "yield": 4,
    "desc": "Black beans, scrambled egg, pepper and cheese in tortillas with avocado.",
    "ing": {
      "blackbeans": 200,
      "eggs": 4,
      "tortilla": 4,
      "bellpepper": 120,
      "onion": 110,
      "tomato": 120,
      "cheese": 60,
      "oil": 15,
      "cumin": 2,
      "paprika": 2,
      "chillipowder": 1,
      "avocado": 100,
      "lemon": 10
    },
    "steps": [
      "Sauté the onion and bell pepper in oil. Add the beans, cumin, paprika and chilli powder and warm through.",
      "Scramble the eggs and mix into the beans.",
      "Divide the mixture between the tortillas. Add tomato, avocado, lemon juice and cheese.",
      "Fold and toast until golden."
    ],
    "storage": "Refrigerate the filling up to 3 days.",
    "reheat": "Toast in a pan until warm."
  },
  "M31": {
    "type": "main",
    "name": "Salmon & Potato Casserole",
    "aliases": [
      "salmon casserole",
      "salmon bake",
      "salmon potato bake"
    ],
    "time": 60,
    "yield": 4,
    "desc": "Salmon, potato and broccoli baked in a creamy sauce with mozzarella.",
    "ing": {
      "salmon": 500,
      "potato": 500,
      "onion": 110,
      "milk": 200,
      "mozzarella": 80,
      "flour": 14,
      "butter": 15,
      "garlic": 6,
      "lemon": 15,
      "herbs": 2,
      "broccoli": 150
    },
    "steps": [
      "Preheat the oven to 190 C. Partly boil the potatoes for 7 minutes and slice.",
      "Sauté the onion and garlic in butter. Stir in the flour, then the milk, to make a sauce. Add lemon juice and herbs.",
      "Layer potatoes, broccoli and salmon chunks in a dish. Pour over the sauce and top with mozzarella.",
      "Bake 25 to 30 minutes until the salmon flakes easily."
    ],
    "storage": "Refrigerate up to 2 days.",
    "reheat": "Reheat until steaming hot throughout."
  },
  "M32": {
    "type": "main",
    "name": "Egg & Black Bean Casserole",
    "aliases": [
      "egg casserole",
      "black bean casserole",
      "egg bean bake"
    ],
    "time": 50,
    "yield": 4,
    "desc": "Eggs and black beans baked with potato, pepper and tomato under melted cheese.",
    "ing": {
      "eggs": 6,
      "blackbeans": 200,
      "potato": 300,
      "bellpepper": 120,
      "onion": 110,
      "tomato": 240,
      "cheese": 100,
      "milk": 100,
      "oil": 15,
      "paprika": 3,
      "cumin": 2,
      "chillipowder": 1
    },
    "steps": [
      "Preheat the oven to 190 C. Boil the potatoes until just tender and slice.",
      "Sauté the onion and bell pepper in oil. Add the tomato, beans and spices and simmer 5 minutes.",
      "Beat the eggs with the milk and pour over the bean mixture in a dish. Layer in the potato slices.",
      "Top with cheese and bake 25 to 30 minutes until the eggs are set."
    ],
    "storage": "Refrigerate up to 3 days.",
    "reheat": "Reheat until steaming hot throughout."
  }
};
