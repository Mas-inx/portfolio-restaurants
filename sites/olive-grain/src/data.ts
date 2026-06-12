export interface MenuItem {
  name: string;
  description: string;
  price: string;
  dietary: string[];
  image: string;
}

export interface SeasonalSpecial {
  name: string;
  description: string;
  price: string;
  image: string;
  availableUntil: string;
}

export interface CateringPackage {
  name: string;
  description: string;
  price: string;
  serves: string;
  items: string[];
  popular?: boolean;
}

export interface MenuCategory {
  id: string;
  label: string;
  items: MenuItem[];
}

export const menuCategories: MenuCategory[] = [
  {
    id: "bowls",
    label: "Bowls",
    items: [
      {
        name: "Greek Grain Bowl",
        description: "Quinoa, roasted vegetables, cucumber, cherry tomatoes, kalamata olives, feta, lemon herb dressing",
        price: "14.50",
        dietary: ["Gluten-Free"],
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop",
      },
      {
        name: "Spiced Lamb Bowl",
        description: "Harissa-spiced lamb, turmeric rice, cucumber yogurt, pickled red onions, toasted pine nuts",
        price: "16.00",
        dietary: ["Gluten-Free"],
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop",
      },
      {
        name: "Roasted Cauliflower Bowl",
        description: "Za'atar-roasted cauliflower, lemony hummus, pickled turnips, toasted almonds, fresh herbs",
        price: "13.50",
        dietary: ["Vegan", "Gluten-Free"],
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop",
      },
      {
        name: "Mediterranean Chicken Bowl",
        description: "Grilled chicken, herbed farro, tzatziki, cherry tomatoes, kalamata olives, roasted red peppers",
        price: "15.50",
        dietary: ["Gluten-Free"],
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop",
      },
    ],
  },
  {
    id: "flatbreads",
    label: "Flatbreads",
    items: [
      {
        name: "Za'atar & Labneh Flatbread",
        description: "House-made za'atar, creamy labneh, blistered cherry tomatoes, extra virgin olive oil",
        price: "12.00",
        dietary: ["Vegetarian"],
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop",
      },
      {
        name: "Spicy Harissa Chicken",
        description: "Harissa-marinated chicken, roasted peppers, red onion, cilantro, cool yogurt drizzle",
        price: "14.00",
        dietary: ["Spicy"],
        image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=600&h=400&fit=crop",
      },
      {
        name: "Mushroom & Thyme",
        description: "Wild mushrooms, caramelized onions, creamy goat cheese, aged balsamic glaze",
        price: "13.50",
        dietary: ["Vegetarian"],
        image: "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?w=600&h=400&fit=crop",
      },
      {
        name: "Lamb & Pomegranate",
        description: "Spiced ground lamb, pomegranate molasses, feta, fresh mint, pickled shallots",
        price: "15.00",
        dietary: ["Spicy"],
        image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=400&fit=crop",
      },
    ],
  },
  {
    id: "brunch",
    label: "Brunch",
    items: [
      {
        name: "Shakshuka",
        description: "Two eggs gently poached in spiced tomato-pepper sauce, served with warm crusty bread",
        price: "13.00",
        dietary: ["Vegetarian", "Gluten-Free"],
        image: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=600&h=400&fit=crop",
      },
      {
        name: "Mediterranean Breakfast",
        description: "Two eggs any style, labneh, olives, tomatoes, cucumber, za'atar, warm pita",
        price: "15.00",
        dietary: ["Gluten-Free"],
        image: "https://images.unsplash.com/photo-1533089860892-a7b6f6a9b0a2?w=600&h=400&fit=crop",
      },
      {
        name: "Avocado & Za'atar Toast",
        description: "Smashed avocado, za'atar, cherry tomatoes, crumbled feta, soft-cooked egg on sourdough",
        price: "12.50",
        dietary: ["Vegetarian"],
        image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=600&h=400&fit=crop",
      },
      {
        name: "Honey-Ricotta Toast",
        description: "Whipped ricotta, local honey, crushed pistachio, fresh figs, mint on toasted brioche",
        price: "11.50",
        dietary: ["Vegetarian"],
        image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&h=400&fit=crop",
      },
    ],
  },
  {
    id: "drinks",
    label: "Drinks",
    items: [
      {
        name: "Turkish Coffee",
        description: "Traditionally brewed in a cezve, served with a cube of Turkish delight",
        price: "5.00",
        dietary: [],
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop",
      },
      {
        name: "Lavender Latte",
        description: "Espresso with house-made lavender syrup, steamed oat milk, lavender buds",
        price: "6.00",
        dietary: ["Vegan"],
        image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&h=400&fit=crop",
      },
      {
        name: "Iced Pistachio Latte",
        description: "Creamy pistachio sauce, double espresso, cold milk over ice",
        price: "6.50",
        dietary: [],
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&h=400&fit=crop",
      },
      {
        name: "Fresh Mint Lemonade",
        description: "House-made with fresh mint, lemon juice, and a touch of agave",
        price: "5.50",
        dietary: ["Vegan", "Gluten-Free"],
        image: "https://images.unsplash.com/photo-1556881286-fc6915169721?w=600&h=400&fit=crop",
      },
      {
        name: "Pomegranate Ginger Juice",
        description: "Fresh-pressed pomegranate with a warm ginger kick, served chilled",
        price: "6.00",
        dietary: ["Vegan", "Gluten-Free"],
        image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=600&h=400&fit=crop",
      },
      {
        name: "Sparkling Rose Lemonade",
        description: "Rose syrup, fresh lemon, sparkling water, edible flowers",
        price: "5.50",
        dietary: ["Vegan"],
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&h=400&fit=crop",
      },
    ],
  },
];

export const seasonalSpecials: SeasonalSpecial[] = [
  {
    name: "Spring Fava & Pea Bowl",
    description: "Fresh fava beans, sweet English peas, pecorino, wild mint, lemon zest, and a soft-cooked egg over herbed farro",
    price: "15.00",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&h=500&fit=crop",
    availableUntil: "Late June",
  },
  {
    name: "Roasted Beet & Blood Orange Salad",
    description: "Golden and red beets, blood orange segments, arugula, pistachio dukkah, sherry shallot vinaigrette",
    price: "13.50",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=500&fit=crop",
    availableUntil: "Early July",
  },
  {
    name: "Lamb Merguez Flatbread",
    description: "House-made merguez sausage, harissa yogurt, pickled fennel, aleppo pepper, fresh cilantro",
    price: "15.50",
    image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=600&h=500&fit=crop",
    availableUntil: "Mid June",
  },
  {
    name: "Strawberry & Basil Granola",
    description: "Toasted oat granola, coconut yogurt, macerated strawberries, fresh basil, honey drizzle",
    price: "11.00",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&h=500&fit=crop",
    availableUntil: "Late July",
  },
];

export const cateringPackages: CateringPackage[] = [
  {
    name: "The Mezze Spread",
    description: "A vibrant assortment of dips, spreads, and pickled vegetables — perfect for gatherings and office lunches",
    price: "28",
    serves: "8–10",
    items: [
      "Hummus & harissa swirl",
      "Baba ganoush",
      "Tzatziki with dill",
      "Spiced Moroccan carrots",
      "Marinated olives",
      "Pickled turnips & radish",
      "Warm pita & lavash",
      "Feta & herb stuffed peppers",
    ],
  },
  {
    name: "The Bowl Bar",
    description: "Build-your-own grain bowls with choice of proteins, toppings, and house sauces — interactive and crowd-pleasing",
    price: "22",
    serves: "10–15",
    items: [
      "Choice of 2 grains (farro, turmeric rice, quinoa)",
      "Choice of 3 proteins (grilled chicken, lamb kofta, roasted cauliflower)",
      "5+ seasonal toppings and pickles",
      "2 house sauces (tahini, harissa yogurt, lemon herb)",
      "Pita crisps and fresh herbs",
    ],
  },
  {
    name: "Weekend Brunch Box",
    description: "Everything needed for a relaxed weekend brunch at the office or home — our most popular package",
    price: "32",
    serves: "6–8",
    items: [
      "Baked shakshuka (feeds 8)",
      "Pastry basket — croissants, morning buns, date scones",
      "Fresh seasonal fruit platter",
      "Cold-pressed orange juice (64 oz)",
      "Fresh brewed coffee or tea",
      "Labneh & honey with granola",
    ],
    popular: true,
  },
  {
    name: "Flatbread Flight",
    description: "An assortment of our four signature flatbreads, sliced and ready to share — ideal for casual meetings",
    price: "18",
    serves: "6–8",
    items: [
      "Za'atar & labneh",
      "Spicy harissa chicken",
      "Mushroom & thyme",
      "Lamb & pomegranate",
      "Choice of 2 dipping sauces",
      "Mixed green salad on the side",
    ],
  },
];

export const cafeInfo = {
  hours: {
    weekday: "7:00 AM – 9:00 PM",
    weekend: "8:00 AM – 10:00 PM",
  },
  address: "1247 Olive Street, Portland, OR 97201",
  phone: "(503) 555‑0187",
  email: "hello@oliveandgrain.com",
  parking: "Street parking available • Nearby lot at 12th & Olive",
  seating: "Indoor • Heated patio • Communal table • Window bar",
  wifi: "Free high-speed Wi-Fi for all guests",
  petFriendly: "Well-behaved pets welcome on the patio",
  social: {
    instagram: "@oliveandgrain",
    instagramUrl: "https://instagram.com/oliveandgrain",
  },
};

export const galleryImages: string[] = [
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&h=600&fit=crop",
  "https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?w=500&h=400&fit=crop",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&h=500&fit=crop",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&h=700&fit=crop",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=450&fit=crop",
  "https://images.unsplash.com/photo-1551218808-4e3e5ea3b1e5?w=500&h=550&fit=crop",
  "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=500&h=500&fit=crop",
  "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=500&h=400&fit=crop",
];
