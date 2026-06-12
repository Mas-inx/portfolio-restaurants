// ─── Laurel House Data ─────────────────────────────────────────────────────────

export const siteName = "Laurel House";
export const tagline = "Brunch in bloom.";
export const heroImage = "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=1920&q=80";
export const greenhouseImage = "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1920&q=80";

// ─── Navigation ───────────────────────────────────────────────────────────────

export const navLinks = [
  { label: "Menu", href: "#menu" },
  { label: "Greenhouse", href: "#greenhouse" },
  { label: "Weekends", href: "#weekends" },
  { label: "Seasonal", href: "#seasonal" },
  { label: "Events", href: "#events" },
  { label: "Journal", href: "#journal" },
  { label: "Reserve", href: "#reserve" },
];

// ─── Menu (Today's Table) ─────────────────────────────────────────────────────

export interface MenuItem {
  name: string;
  description: string;
  price: string;
  dietary?: string[];
  featured?: boolean;
}

export interface MenuCategory {
  category: string;
  icon: string;
  items: MenuItem[];
}

export const menuCategories: MenuCategory[] = [
  {
    category: "From the Oven",
    icon: "🥐",
    items: [
      { name: "Cardamom Morning Bun", description: "Laminated dough, cardamom sugar, orange glaze", price: "$6", dietary: ["V"], featured: true },
      { name: "Sourdough Croissant", description: "48-hour fermented, cultured butter, flaky layers", price: "$7", dietary: ["V"] },
      { name: "Lavender Scone", description: "Dried lavender, lemon curd, clotted cream", price: "$5.50", dietary: ["V"] },
      { name: "Rose Pistachio Brioche", description: "Rosewater brioche, crushed pistachio, honey drizzle", price: "$6.50", dietary: ["V"] },
      { name: "Gruyère & Herb Gougère", description: "Choux pastry, aged gruyère, fresh thyme", price: "$5", dietary: ["V", "GF"] },
    ],
  },
  {
    category: "Plates",
    icon: "🍳",
    items: [
      { name: "Garden Ricotta Toast", description: "House ricotta, roasted heirloom tomato, basil oil, sourdough", price: "$16", dietary: ["V"], featured: true },
      { name: "Soft Scramble & Smoked Trout", description: "Farm eggs, dill crème fraîche, capers, rye crisps", price: "$19", dietary: ["GF"] },
      { name: "Shakshuka Verte", description: "Green pepper & tomatillo sauce, poached eggs, feta, za'atar bread", price: "$18", dietary: ["V", "GF"] },
      { name: "Mushroom & Gruyère Tart", description: "Wild mushroom duxelles, puff pastry, arugula, truffle honey", price: "$17", dietary: ["V"] },
      { name: "Açaí Garden Bowl", description: "Açaí, granola, edible flowers, seasonal fruit, bee pollen", price: "$15", dietary: ["V", "GF"] },
      { name: "Full Laurel", description: "Eggs any style, sausage, roasted tomato, mushrooms, toast, greens", price: "$22" },
    ],
  },
  {
    category: "Coffee & Tea",
    icon: "☕",
    items: [
      { name: "Single Origin Pour Over", description: "Rotating seasonal selection, hand-brewed", price: "$6" },
      { name: "Oat Milk Cortado", description: "Double shot, steamed oat milk, in a 4oz cup", price: "$5.50" },
      { name: "Lavender Honey Latte", description: "Espresso, house lavender syrup, local honey, steamed milk", price: "$7", featured: true },
      { name: "Rose Chai", description: "Black tea, cardamom, rose petal, steamed milk", price: "$6" },
      { name: "Cold Brew Tonic", description: "House cold brew, tonic water, orange peel", price: "$7" },
    ],
  },
  {
    category: "Botanical Drinks",
    icon: "🌸",
    items: [
      { name: "Elderflower Spritz", description: "Elderflower cordial, sparkling water, cucumber, mint", price: "$8", featured: true },
      { name: "Hibiscus Rose Fizz", description: "Hibiscus tea, rose water, lemon, sparkling", price: "$8" },
      { name: "Garden Gimlet (NA)", description: "Cucumber, basil, lime, simple syrup, tonic float", price: "$9" },
      { name: "Turmeric Golden Milk", description: "Oat milk, turmeric, ginger, black pepper, honey", price: "$7", dietary: ["V"] },
      { name: "Jasmine Cold Brew", description: "Cold brew steeped with jasmine pearls, served over ice", price: "$7" },
    ],
  },
];

// ─── Greenhouse Section ───────────────────────────────────────────────────────

export const greenhouseFeatures = [
  {
    title: "Courtyard Seating",
    description: "Beneath the glass ceiling, surrounded by trailing ivy and morning light. Every seat catches the sun.",
    detail: "40 indoor seats, 20 patio",
  },
  {
    title: "Natural Light",
    description: "Original 1920s greenhouse frame restored. South-facing glass floods the room from 7am golden hour through afternoon.",
    detail: "South-facing glass ceiling",
  },
  {
    title: "The Flower Cart",
    description: "Each weekend, a cart of fresh-cut arrangements rolls through. Take a stem to your table. Seasonal blooms from our garden.",
    detail: "Fresh every Saturday & Sunday",
  },
  {
    title: "Garden Patio",
    description: "Step outside to the walled patio. Herb planters, string lights, and a climbing rose arch frame the space.",
    detail: "Open April through October",
  },
];

// ─── Weekend Rituals (Sticky Storytelling) ────────────────────────────────────

export interface Ritual {
  id: string;
  title: string;
  time: string;
  description: string;
  image: string;
  mood: string;
}

export const rituals: Ritual[] = [
  {
    id: "slow-breakfast",
    title: "Slow Breakfast",
    time: "7:30 – 10:00 AM",
    description: "The quiet hours. Just you, a pour over, and the sound of the greenhouse warming up. No rush. The paper's on the table, the light is soft, and the kitchen is just getting started.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
    mood: "Still. Warm. Yours alone.",
  },
  {
    id: "friends-at-noon",
    title: "Friends at Noon",
    time: "10:30 AM – 1:00 PM",
    description: "The room fills. Long tables pushed together, plates passed across, botanical drinks catching the light. Laughter bounces off the glass ceiling. This is the hour the greenhouse was built for.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    mood: "Loud. Bright. Together.",
  },
  {
    id: "celebration-table",
    title: "The Celebration Table",
    time: "1:30 – 3:30 PM",
    description: "Birthdays, showers, 'just because.' The long table in the back gets dressed in linen and flowers. A set menu, a carafe of spritz, and all the afternoon you need to linger.",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80",
    mood: "Dressed up. Unhurried. Celebrated.",
  },
];

// ─── Seasonal Plates (Card Stack) ─────────────────────────────────────────────

export interface SeasonalDish {
  name: string;
  season: string;
  description: string;
  ingredients: string[];
  dietary: string[];
  image: string;
  price: string;
}

export const seasonalDishes: SeasonalDish[] = [
  {
    name: "Spring Pea Risotto",
    season: "Spring",
    description: "Fresh English peas folded into saffron arborio, finished with pecorino and pea tendrils from the garden.",
    ingredients: ["Arborio rice", "English peas", "Saffron", "Pecorino", "Pea tendrils", "Lemon zest"],
    dietary: ["V", "GF"],
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=80",
    price: "$21",
  },
  {
    name: "Stone Fruit & Burrata",
    season: "Summer",
    description: "Ripe peaches and plums, creamy burrata, basil oil, and a scattering of toasted hazelnuts on grilled country bread.",
    ingredients: ["White peach", "Santa Rosa plum", "Burrata", "Basil", "Hazelnut", "Country bread"],
    dietary: ["V"],
    image: "https://images.unsplash.com/photo-1505575967455-40e27c701351?w=800&q=80",
    price: "$19",
  },
  {
    name: "Roasted Fig Tartine",
    season: "Autumn",
    description: "Honey-roasted figs on sourdough with whipped goat cheese, walnuts, and a drizzle of aged balsamic.",
    ingredients: ["Black mission fig", "Goat cheese", "Walnut", "Wildflower honey", "Aged balsamic", "Sourdough"],
    dietary: ["V"],
    image: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800&q=80",
    price: "$18",
  },
  {
    name: "Citrus & Beet Salad",
    season: "Winter",
    description: "Roasted golden beets, blood orange segments, whipped chèvre, candied pistachios, and micro herbs.",
    ingredients: ["Golden beet", "Blood orange", "Chèvre", "Pistachio", "Micro herbs", "Sherry vinaigrette"],
    dietary: ["V", "GF"],
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
    price: "$17",
  },
  {
    name: "Wild Mushroom Toast",
    season: "Year-round",
    description: "Foraged chanterelles and maitake on garlic-rubbed toast, soft-set egg, truffle oil, and chive blossoms.",
    ingredients: ["Chanterelle", "Maitake", "Farm egg", "Sourdough", "Truffle oil", "Chive blossom"],
    dietary: ["V"],
    image: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=800&q=80",
    price: "$20",
  },
];

// ─── Private Events ───────────────────────────────────────────────────────────

export interface EventPackage {
  name: string;
  tagline: string;
  includes: string[];
  guests: string;
  price: string;
  accent: string;
}

export const eventPackages: EventPackage[] = [
  {
    name: "Garden Shower",
    tagline: "Floral brunch for the guest of honor",
    includes: [
      "Private greenhouse section",
      "Set 3-course brunch menu",
      "Floral arrangement for the table",
      "Botanical spritz carafe per guest",
      "Custom menu card",
    ],
    guests: "10–20 guests",
    price: "From $65/person",
    accent: "laurel-rose",
  },
  {
    name: "Birthday Table",
    tagline: "A year older, beautifully fed",
    includes: [
      "Reserved long table in garden",
      "Shared brunch platters",
      "Birthday cake by our pastry chef",
      "Sparkling toast on arrival",
      "Handwritten place cards",
    ],
    guests: "6–14 guests",
    price: "From $55/person",
    accent: "laurel-butter",
  },
  {
    name: "Bridal Brunch",
    tagline: "Before the big day, a slow morning",
    includes: [
      "Full greenhouse buyout option",
      "Champagne welcome",
      "5-course seasonal tasting",
      "Floral crown station",
      "Photography-friendly setup",
    ],
    guests: "15–40 guests",
    price: "From $85/person",
    accent: "laurel-blush",
  },
  {
    name: "Brand Morning",
    tagline: "Launch, press, or team gathering",
    includes: [
      "Semi-private courtyard",
      "Coffee & botanical bar",
      "Brunch bites & pastries",
      "Branding welcome display",
      "AV setup available",
    ],
    guests: "20–50 guests",
    price: "From $45/person",
    accent: "laurel-sage",
  },
];

// ─── Journal Strip ────────────────────────────────────────────────────────────

export interface JournalPost {
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
}

export const journalPosts: JournalPost[] = [
  {
    title: "Building the Spring Menu",
    category: "Kitchen",
    excerpt: "How we test 40 dishes to find the 8 that make the cut. A look inside our seasonal menu development process.",
    date: "May 28, 2026",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=600&q=80",
  },
  {
    title: "The Coffee We're Pouring",
    category: "Coffee",
    excerpt: "Our roaster in the hills, the Ethiopian natural we're featuring this month, and why pour over takes 4 minutes on purpose.",
    date: "May 15, 2026",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
  },
  {
    title: "Flowers for the Table",
    category: "Garden",
    excerpt: "Our flower farmer partner grows heirloom varieties just for us. Every Saturday, a new arrangement rolls through on the cart.",
    date: "May 3, 2026",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600&q=80",
  },
  {
    title: "Meet Our Bread Baker",
    category: "People",
    excerpt: "Elena has been fermenting sourdough since she was 16. Her 48-hour croissant is the reason people arrive at 7am.",
    date: "Apr 22, 2026",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80",
  },
];

// ─── Reservation Info ─────────────────────────────────────────────────────────

export const hours = [
  { day: "Monday – Thursday", time: "7:30 AM – 2:30 PM" },
  { day: "Friday", time: "7:30 AM – 3:00 PM" },
  { day: "Saturday", time: "7:00 AM – 3:30 PM" },
  { day: "Sunday", time: "7:00 AM – 3:00 PM" },
];

export const bookingPolicy = [
  "Walk-ins welcome, reservations recommended on weekends",
  "Parties of 6+ require advance booking",
  "Private events: 2 weeks notice minimum",
  "Cancellations: 24 hours before, please",
];

export const address = {
  street: "142 Greenhouse Lane",
  city: "Portland, OR 97205",
  phone: "(503) 555-0147",
  email: "hello@laurelhouse.com",
};
