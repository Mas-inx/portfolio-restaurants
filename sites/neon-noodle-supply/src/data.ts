export const heroImage = "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=1920&q=80";

export interface MenuItem {
  name: string;
  description: string;
  price: string;
  spice?: number;
  wait?: string;
  tag?: string;
}

export interface MenuCategory {
  category: string;
  items: MenuItem[];
}

export interface Combo {
  name: string;
  tagline: string;
  includes: string[];
  price: string;
  color: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  time: string;
}

export interface Location {
  name: string;
  address: string;
  status: 'open' | 'closing-soon' | 'closed';
  hours: string;
  eta: string;
  neighborhood: string[];
}

export interface BowlOption {
  category: string;
  options: { name: string; price?: number }[];
}

export const menu: MenuCategory[] = [
  {
    category: "Broth Bowls",
    items: [
      { name: "The Classic Tonkotsu", description: "18-hour pork bone broth, chashu, soft egg, scallion, nori", price: "$16", spice: 0, wait: "8 min", tag: "BESTSELLER" },
      { name: "Hell Fire Tanmen", description: "Spicy miso broth, ground pork, blistered veg, chili oil, sesame", price: "$17", spice: 3, wait: "10 min", tag: "SPICY" },
      { name: "Shoyu Chicken", description: "Clear soy broth, slow chicken chashu, menma, wood ear mushroom", price: "$16", spice: 0, wait: "7 min" },
      { name: "Miso Butter Corn", description: "Rich miso broth, sweet corn, butter pat, bean sprouts, garlic oil", price: "$15", spice: 0, wait: "8 min" },
      { name: "Black Garlic Tantanmen", description: "Spicy sesame broth, black garlic oil, pork, bok choy, crushed peanuts", price: "$18", spice: 2, wait: "10 min", tag: "CHEF'S PICK" },
      { name: "Seafood Shio", description: "Salt-based broth, shrimp, clam, fish cake, yuzu zest", price: "$19", spice: 0, wait: "12 min" }
    ]
  },
  {
    category: "Dry Noodles",
    items: [
      { name: "Aburasoba", description: "Sauce-tossed noodles, chashu, egg, vinegar, chili. Mix it yourself.", price: "$15", spice: 1, wait: "6 min" },
      { name: "Cold Sesame Noodles", description: "Chilled noodles, tahini-soy dressing, cucumber, crushed peanut", price: "$14", spice: 1, wait: "5 min" },
      { name: "Wok-Fried Yakisoba", description: "High-heat wok, pork belly, cabbage, oyster sauce, beni shoga", price: "$16", spice: 0, wait: "8 min" }
    ]
  },
  {
    category: "Sides",
    items: [
      { name: "Gyoza (6pc)", description: "Pan-fried pork dumplings, chili vinegar dip", price: "$8", wait: "6 min" },
      { name: "Karaage", description: "Double-fried chicken, kewpie, shichimi", price: "$9", wait: "7 min" },
      { name: "Edamame", description: "Steamed, sea salt, garlic chili oil", price: "$6", wait: "3 min" },
      { name: "Smashed Cucumber", description: "Rice vinegar, sesame, garlic, chili flake", price: "$7", wait: "3 min" }
    ]
  },
  {
    category: "Cold Drinks",
    items: [
      { name: "Asahi Draft", description: "Cold Japanese lager, 16oz", price: "$7" },
      { name: "Highball", description: "Suntory Toki whisky, soda, lemon", price: "$12" },
      { name: "Yuzu Lemonade", description: "Fresh yuzu, honey, sparkling", price: "$6" },
      { name: "Calpino Soda", description: "Calpis, sparkling water, lime", price: "$5" },
      { name: "Sapporo Bottle", description: "Classic Japanese lager, 22oz", price: "$9" }
    ]
  }
];

export const bowlOptions: BowlOption[] = [
  {
    category: "Broth",
    options: [
      { name: "Tonkotsu (Pork Bone)", price: 0 },
      { name: "Shoyu (Soy)", price: 0 },
      { name: "Miso", price: 0 },
      { name: "Shio (Salt)", price: 0 },
      { name: "Tanmen (Spicy Sesame)", price: 1 }
    ]
  },
  {
    category: "Noodle",
    options: [
      { name: "Straight Thin", price: 0 },
      { name: "Wavy Thick", price: 0 },
      { name: "Whole Wheat", price: 1 },
      { name: "Rice Noodle", price: 0 }
    ]
  },
  {
    category: "Protein",
    options: [
      { name: "Chashu Pork", price: 0 },
      { name: "Chicken Thigh", price: 0 },
      { name: "Soft Egg", price: 1.5 },
      { name: "Shrimp (3pc)", price: 3 },
      { name: "Tofu", price: 0 }
    ]
  },
  {
    category: "Heat",
    options: [
      { name: "None", price: 0 },
      { name: "Mild Chili Oil", price: 0 },
      { name: "Medium — House Blend", price: 0 },
      { name: "Hell Fire", price: 0 }
    ]
  },
  {
    category: "Extras",
    options: [
      { name: "Corn", price: 1 },
      { name: "Nori (2 sheets)", price: 1 },
      { name: "Bean Sprouts", price: 0.5 },
      { name: "Black Garlic Oil", price: 1 },
      { name: "Extra Noodles", price: 2 }
    ]
  }
];

export const basePrice = 14;

export const combos: Combo[] = [
  {
    name: "Solo Bowl",
    tagline: "One person. One bowl. No distractions.",
    includes: ["Any broth bowl", "1 side of your choice", "1 drink"],
    price: "$24",
    color: "neon-yellow"
  },
  {
    name: "Crew Table",
    tagline: "3–5 people. Family style. Loud.",
    includes: ["4 broth bowls (mix & match)", "3 sides to share", "1 plate of gyoza", "Drinks on your own tab"],
    price: "$89",
    color: "neon-red"
  },
  {
    name: "After Shift",
    tagline: "Midnight fuel. In and out in 30.",
    includes: ["Any broth bowl", "Karaage", "Asahi draft or Yuzu lemonade"],
    price: "$28",
    color: "neon-yellow"
  }
];

export const processSteps: ProcessStep[] = [
  { step: "01", title: "Broth", description: "Pork bones crack and simmer 18 hours. We never rush this. The collagen breaks down into liquid gold.", time: "18 hrs" },
  { step: "02", title: "Noodle", description: "Fresh noodles made daily. Cut to order — thin for clear broth, thick and wavy for heavy miso.", time: "Daily" },
  { step: "03", title: "Wok", description: "900°F burner. Sides fly in and out in under 60 seconds. That's how you get the breath of the wok.", time: "60 sec" },
  { step: "04", title: "Finish", description: "Assembly is choreographed. Broth, noodle, topping, oil, garnish. 45 seconds from order to pass.", time: "45 sec" },
  { step: "05", title: "Pack", description: "Broth and noodles packed separate for pickup. You finish the bowl at home. Still hits different.", time: "To-go" }
];

export const locations: Location[] = [
  { name: "Downtown", address: "847 Market St, Unit B", status: "open", hours: "5PM – 2AM daily", eta: "12 min", neighborhood: ["Financial District", "SoMa", "Civic Center"] },
  { name: "Mission", address: "2910 Mission St", status: "open", hours: "6PM – 3AM daily", eta: "8 min", neighborhood: ["Mission", "Bernal Heights", "Dolores"] },
  { name: "Oakland", address: "1520 Broadway", status: "closing-soon", hours: "5PM – 12AM (Sun–Thu)", eta: "18 min", neighborhood: ["Uptown", "Jack London", "Lake Merritt"] },
  { name: "Berkeley", address: "2180 Shattuck Ave", status: "open", hours: "6PM – 2AM daily", eta: "25 min", neighborhood: ["Downtown", "Campus", "Northside"] }
];

export const navLinks = [
  { label: "Menu", href: "#menu" },
  { label: "Build", href: "#build" },
  { label: "Combos", href: "#combos" },
  { label: "Process", href: "#process" },
  { label: "Locations", href: "#locations" },
  { label: "Order", href: "#order" }
];
