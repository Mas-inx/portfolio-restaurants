export const heroImage = "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&q=80";

export interface Ingredient {
  name: string;
  origin: string;
  technique: string;
  note: string;
  image: string;
}

export interface Course {
  number: string;
  name: string;
  technique: string;
  ingredients: string;
  pairing: string;
  price: string;
}

export interface Room {
  name: string;
  description: string;
  capacity: string;
  image: string;
}

export interface Pairing {
  name: string;
  type: string;
  region: string;
  notes: string;
  serving: string;
  image: string;
}

export interface Rule {
  label: string;
  detail: string;
}

export interface Event {
  title: string;
  description: string;
  capacity: string;
  includes: string[];
}

export const ingredients: Ingredient[] = [
  {
    name: "Quince",
    origin: "Sonoma County, CA",
    technique: "Ember-roasted 4 hours, then lacto-fermented 21 days",
    note: "Honeyed flesh collapses into smoke. The skin holds its shape like parchment.",
    image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&q=80"
  },
  {
    name: "Koji",
    origin: "House-cultured, 72-hour propagation",
    technique: "Inoculated barley, aged in cedar chambers",
    note: "Sweet, fungal, alive. Breaks down proteins into something close to memory.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"
  },
  {
    name: "Black Garlic",
    origin: "Gilroy, CA — single-farm bulb",
    technique: "Low-heat oxidation over 40 days",
    note: "Balsamic depth without vinegar. Sticky, dark, almost medicinal in the best way.",
    image: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=800&q=80"
  },
  {
    name: "Embered Leek",
    origin: "Point Reyes, CA — winter harvest",
    technique: "Buried directly in hardwood coals, 45 minutes",
    note: "The outer layers carbonize. Inside: sweet, creamy, entirely transformed.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80"
  },
  {
    name: "Beef Fat",
    origin: "Marin Sun Farms — grass-fed tallow",
    technique: "Rendered low, clarified, smoked over applewood",
    note: "Carries flavor the way a vessel carries water. Silent, essential, generous.",
    image: "https://images.unsplash.com/photo-1558028625-849d8553d0b4?w=800&q=80"
  },
  {
    name: "Smoked Salt",
    origin: "Mendocino coast — hand-harvested",
    technique: "Cold-smoked 5 days over salvaged wine barrel oak",
    note: "Finishing salt. A few grains unlock everything beneath them.",
    image: "https://images.unsplash.com/photo-1518110925495-b37653d98a46?w=800&q=80"
  }
];

export const courses: Course[] = [
  { number: "01", name: "Amuse-Bouche", technique: "Live coal", ingredients: "Smoked trout roe, buckwheat blini, crème fraîche ash", pairing: "NV Champagne, Pierre Gimonnet", price: "—" },
  { number: "02", name: "The Garden Record", technique: "Ember & raw", ingredients: "Beet three ways — charred, pickled, powdered — with goat whey", pairing: "2022 Savagnin, Jura", price: "—" },
  { number: "03", name: "Bread Service", technique: "Wood-fired hearth", ingredients: "Sourdough miche, beef fat butter, smoked salt", pairing: "—", price: "—" },
  { number: "04", name: "Crudo", technique: "Aged & raw", ingredients: "Dry-aged yellowtail, yuzu kosho, black garlic oil", pairing: "2021 Grüner Veltliner, Wachau", price: "—" },
  { number: "05", name: "The Leek", technique: "Direct ember", ingredients: "Whole embered leek, beef tallow, fermented chili", pairing: "2020 Chenin Blanc, Savennières", price: "—" },
  { number: "06", name: "Main — Dry-Aged Duck", technique: "45-day dry age, open flame", ingredients: "Sonoma duck breast, quince mostarda, smoked jus", pairing: "2019 Pinot Noir, Sta. Rita Hills", price: "—" },
  { number: "07", name: "Pre-Dessert", technique: "Fermentation", ingredients: "Koji pear, brown butter crumble, smoked honey", pairing: "2021 Ice Wine, Niagara", price: "—" },
  { number: "08", name: "Final Course", technique: "Charcoal & cream", ingredients: "Burnt honey panna cotta, activated cocoa, sea salt", pairing: "Tawny Port, 20-year", price: "—"}
];

export const menuPrice = "$245 per guest";
export const menuPairing = "$145 optional pairing flight";

export const rooms: Room[] = [
  { name: "The Hearth", description: "Eight seats facing the open fire. The kitchen is the performance.", capacity: "8 guests", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80" },
  { name: "Chef's Counter", description: "Twelve seats at the pass. Watch every plate leave the line.", capacity: "12 guests", image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80" },
  { name: "The Wine Wall", description: "A private room lined with 400 bottles. Intimate, enclosed, warm.", capacity: "6 guests", image: "https://images.unsplash.com/photo-1528823872057-9c018a7a7553?w=800&q=80" },
  { name: "Intimate Dining", description: "Four two-top tables in the back. Candlelit. Quiet. The default room.", capacity: "2–4 guests each", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80" }
];

export const pairings: Pairing[] = [
  { name: "Gimonnet Cuis Premier Cru", type: "Champagne", region: "Côte des Blancs, France", notes: "Chalk, white flower, green apple skin. Cuts through fat cleanly.", serving: "By the glass or flight", image: "https://images.unsplash.com/photo-1558001373-7b93ee48ffa0?w=800&q=80" },
  { name: "Domaine Gaia 'Monemvasia'", type: "Natural White", region: "Alsace, France", notes: "Volcanic minerality, dried apricot, saline finish.", serving: "Full bottle only", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80" },
  { name: "Kombucha Flight", type: "Zero-Proof", region: "House-fermented", notes: "Three pours: juniper-ginger, smoked plum, wildflower-hibiscus.", serving: "Non-alcoholic pairing", image: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=800&q=80" },
  { name: "Aged Pu-erh", type: "Fermented Tea", region: "Yunnan, China — 2008", notes: "Forest floor, damp wood, dark cherry. Served gongfu style.", serving: "Tableside service", image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&q=80" },
  { name: "Mezcal Digestif", type: "Spirit", region: "Oaxaca, Mexico", notes: "Espadín, 4 years in glass. Smoke, citrus peel, wet stone.", serving: "2oz pour, room temp", image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=800&q=80" }
];

export const rules: Rule[] = [
  { label: "Seating Times", detail: "Two seatings nightly: 5:30 PM and 8:30 PM. Arrive within 10 minutes of your reservation or the course sequence begins without you." },
  { label: "Allergies & Diet", detail: "We accommodate most allergies with 48 hours notice. Vegan and gluten-free menus are available but must be requested at booking. We cannot modify courses night-of." },
  { label: "Cancellation", detail: "Cancellations within 48 hours are charged the full tasting menu price. No-shows are charged double. Transfers to another date are free with 72 hours notice." },
  { label: "Dress Code", detail: "Smart casual. No athletic wear, no flip-flops, no baseball caps. We ask that guests dress for the occasion — this is a three-hour experience." },
  { label: "Duration", detail: "The full tasting menu runs approximately 3 hours. The pacing is intentional. We do not rush courses, and we do not accommodate early departures." },
  { label: "Accessibility", detail: "The dining room is fully wheelchair accessible. Our restroom is ADA-compliant. Please note any mobility needs when booking so we can prepare the best table for you." }
];

export const events: Event[] = [
  { title: "Full Buyout", description: "The entire restaurant, 28 seats, for your evening. Custom menu with the chef. Wine pairings selected by our sommelier.", capacity: "Up to 28 guests", includes: ["Custom tasting menu", "Sommelier pairing", "Private bar", "Dedicated service team"] },
  { title: "Anniversary Dinner", description: "A private table in the Wine Wall room. Five courses built around your story. A bottle gifted at the end of the night.", capacity: "2–6 guests", includes: ["Custom 5-course menu", "Gifted bottle of wine", "Handwritten menu card", "Floral arrangement"] },
  { title: "Chef's Table Event", description: "Sit at the pass. Watch the team work. Ask questions. Eat everything. Limited to one event per month.", capacity: "12 guests", includes: ["8-course tasting", "Chef narration", "Kitchen tour", "Signed cookbook"] },
  { title: "Brand Dinner", description: "For wineries, distilleries, and food producers who want to present their work in an intimate, chef-driven setting.", capacity: "12–20 guests", includes: ["Collaborative menu", "Producer presentation", "Paired courses", "Press-ready documentation"] }
];

export const navLinks = [
  { label: "The Archive", href: "#archive" },
  { label: "Menu", href: "#menu" },
  { label: "Rooms", href: "#rooms" },
  { label: "Pairings", href: "#pairings" },
  { label: "Private", href: "#private" },
  { label: "Reserve", href: "#reserve" }
];
