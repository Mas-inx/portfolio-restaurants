export type MenuCategory = 'mains' | 'sides' | 'desserts';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: MenuCategory;
  supplier: string;
  supplierLocation: string;
  season: string;
}

export interface Farm {
  id: string;
  name: string;
  produce: string[];
  distance: string;
  story: string;
  image: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  price: string;
  image: string;
}

export interface Review {
  id: string;
  name: string;
  text: string;
  date: string;
}

export const menuItems: MenuItem[] = [
  // Mains
  {
    id: 'm1',
    name: 'Herb-Roasted Chicken',
    description: 'Half chicken slow-roasted with garden rosemary, thyme, and sage. Served with roasted root vegetables and natural jus.',
    price: '26',
    category: 'mains',
    supplier: 'Green Valley Farm',
    supplierLocation: 'Milton, ON — 22 km',
    season: 'Year Round',
  },
  {
    id: 'm2',
    name: 'Pan-Seared Lake Trout',
    description: 'Fresh Lake Ontario trout with lemon-brown butter, capers, and a side of wild rice pilaf with toasted almonds.',
    price: '29',
    category: 'mains',
    supplier: 'Lakeview Fish Co.',
    supplierLocation: 'Port Hope, ON — 65 km',
    season: 'Spring–Fall',
  },
  {
    id: 'm3',
    name: 'Butternut Squash Risotto',
    description: 'Creamy arborio rice with roasted butternut squash, sage, and aged Grana Padano. Finished with toasted pumpkin seeds.',
    price: '22',
    category: 'mains',
    supplier: 'Sunny Acres Farm',
    supplierLocation: 'Erin, ON — 18 km',
    season: 'Fall–Winter',
  },
  {
    id: 'm4',
    name: 'Grass-Fed Beef Burger',
    description: 'Half-pound patty from pasture-raised cattle, aged cheddar, caramelized onions, house pickles, and garlic aioli on a brioche bun.',
    price: '24',
    category: 'mains',
    supplier: 'Ridgeview Ranch',
    supplierLocation: 'Caledon, ON — 35 km',
    season: 'Year Round',
  },
  {
    id: 'm5',
    name: 'Harvest Grain Bowl',
    description: 'Farro, roasted sweet potato, kale, chickpeas, pickled red onion, and tahini-yogurt dressing. Add grilled chicken for $5.',
    price: '19',
    category: 'mains',
    supplier: 'Wild Field Growers',
    supplierLocation: 'Georgetown, ON — 12 km',
    season: 'Year Round',
  },
  // Sides
  {
    id: 's1',
    name: 'Roasted Brussels Sprouts',
    description: 'Tossed with maple-balsamic glaze, crispy pancetta, and toasted hazelnuts.',
    price: '9',
    category: 'sides',
    supplier: 'Autumn Harvest Farm',
    supplierLocation: 'Acton, ON — 20 km',
    season: 'Fall–Winter',
  },
  {
    id: 's2',
    name: 'Creamy Mashed Potatoes',
    description: 'Yukon Gold potatoes whipped with local cream and butter. Simple, perfect, and just like Sunday dinner.',
    price: '8',
    category: 'sides',
    supplier: 'Pioneer Valley Produce',
    supplierLocation: 'Campbellville, ON — 8 km',
    season: 'Year Round',
  },
  {
    id: 's3',
    name: 'Seasonal Garden Salad',
    description: 'Mixed greens, shaved vegetables, edible flowers, and a bright lemon-herb vinaigrette straight from the garden.',
    price: '10',
    category: 'sides',
    supplier: 'Sunny Acres Farm',
    supplierLocation: 'Erin, ON — 18 km',
    season: 'Spring–Summer',
  },
  {
    id: 's4',
    name: 'Grilled Asparagus',
    description: 'Charred asparagus spears with lemon zest, shaved Parmesan, and a drizzle of aged balsamic.',
    price: '10',
    category: 'sides',
    supplier: 'Wild Field Growers',
    supplierLocation: 'Georgetown, ON — 12 km',
    season: 'Spring',
  },
  // Desserts
  {
    id: 'd1',
    name: 'Warm Apple Crisp',
    description: 'Honeycrisp apples baked with oat-pecan crumble, served with a scoop of vanilla bean ice cream from a local creamery.',
    price: '12',
    category: 'desserts',
    supplier: 'Orchard Hill Farm',
    supplierLocation: 'Halton Hills, ON — 15 km',
    season: 'Fall–Winter',
  },
  {
    id: 'd2',
    name: 'Seasonal Fruit Tart',
    description: 'Buttery shortbread shell filled with vanilla pastry cream and topped with the freshest fruits of the season.',
    price: '11',
    category: 'desserts',
    supplier: 'Wild Field Growers',
    supplierLocation: 'Georgetown, ON — 12 km',
    season: 'Spring–Summer',
  },
  {
    id: 'd3',
    name: 'Maple Crème Brûlée',
    description: 'Classic French custard infused with Ontario maple syrup, with a perfectly caramelized sugar top.',
    price: '11',
    category: 'desserts',
    supplier: 'Sugarbush Maple Co.',
    supplierLocation: 'Belfountain, ON — 28 km',
    season: 'Year Round',
  },
  {
    id: 'd4',
    name: 'Dark Chocolate Tart',
    description: 'Rich Valrhona chocolate ganache in a cocoa-nut crust, topped with flaky sea salt and fresh raspberries.',
    price: '13',
    category: 'desserts',
    supplier: 'Ridgeview Ranch (cream)',
    supplierLocation: 'Caledon, ON — 35 km',
    season: 'Year Round',
  },
];

export const farms: Farm[] = [
  {
    id: 'f1',
    name: 'Green Valley Farm',
    produce: ['Pasture-raised chicken', 'Heritage turkeys', 'Farm eggs'],
    distance: '22 km',
    story: 'The Miller family has been farming this land for four generations. Their chickens roam freely on rolling pastures, and every bird is processed by hand on-site.',
    image: '',
  },
  {
    id: 'f2',
    name: 'Sunny Acres Farm',
    produce: ['Winter squash', 'Root vegetables', 'Greens', 'Herbs'],
    distance: '18 km',
    story: 'Maria and Tom Chen grow over forty varieties of vegetables on twenty acres of certified organic fields. Their weekly harvest dictates our seasonal menu.',
    image: '',
  },
  {
    id: 'f3',
    name: 'Ridgeview Ranch',
    produce: ['Grass-fed beef', 'Lamb', 'Cream', 'Cheese'],
    distance: '35 km',
    story: 'A family-run ranch practicing regenerative grazing. Their Angus cattle rotate through paddocks daily, building soil health while producing exceptional beef.',
    image: '',
  },
  {
    id: 'f4',
    name: 'Lakeview Fish Co.',
    produce: ['Lake trout', 'Whitefish', 'Pickerel'],
    distance: '65 km',
    story: 'Third-generation fishermen working the cold waters of Lake Ontario. Their catch comes in within hours of leaving the lake, delivered straight to our kitchen.',
    image: '',
  },
  {
    id: 'f5',
    name: 'Orchard Hill Farm',
    produce: ['Apples', 'Pears', 'Plums', 'Honey'],
    distance: '15 km',
    story: 'A hundred-year-old orchard with heirloom apple varieties you won\'t find anywhere else. Their bees pollinate the blossoms and produce the most fragrant wildflower honey.',
    image: '',
  },
  {
    id: 'f6',
    name: 'Wild Field Growers',
    produce: ['Microgreens', 'Edible flowers', 'Specialty greens', 'Seasonal vegetables'],
    distance: '12 km',
    story: 'A small-batch urban farm on the edge of town. They grow using organic, no-till methods and deliver freshly harvested produce within hours of picking.',
    image: '',
  },
];

export const events: EventItem[] = [
  {
    id: 'e1',
    title: 'Harvest Moon Dinner',
    date: 'Saturday, October 18',
    time: '6:30 PM – 9:30 PM',
    description: 'A five-course tasting menu celebrating the autumn harvest. Each course is paired with a wine from a local Ontario vineyard. Limited to 40 guests.',
    price: '95 per person',
    image: '',
  },
  {
    id: 'e2',
    title: 'Farm-to-Table Brunch',
    date: 'Every Sunday',
    time: '10:00 AM – 2:00 PM',
    description: 'Our weekly family-style brunch featuring seasonal dishes, fresh bakery goods, and bottomless coffee. Kids eat half-price all day.',
    price: 'A la carte menu',
    image: '',
  },
  {
    id: 'e3',
    title: 'Chef\'s Table: Winter Roots',
    date: 'Friday, November 14',
    time: '7:00 PM – 10:00 PM',
    description: 'An intimate evening with Chef Marcus as he prepares a six-course exploration of winter root vegetables. Includes a tour of our kitchen and root cellar.',
    price: '120 per person',
    image: '',
  },
  {
    id: 'e4',
    title: 'Thanksgiving Family Feast',
    date: 'Sunday, October 12',
    time: '2:00 PM – 8:00 PM',
    description: 'A traditional three-course Thanksgiving dinner with all the classics. Take-home leftovers included. Reserve your family table by October 5.',
    price: '55 per adult, 22 per child',
    image: '',
  },
];

export const reviews: Review[] = [
  {
    id: 'r1',
    name: 'Elena M.',
    text: 'We drive 40 minutes to eat here at least once a month. The menu changes with the seasons, and everything tastes like it was picked that morning. The kids love the burger, and I dream about the risotto.',
    date: 'March 2025',
  },
  {
    id: 'r2',
    name: 'David & Nora K.',
    text: 'Had our daughter\'s birthday party in the group dining room. The staff treated the kids like royalty, and the farm tour before dinner was a huge hit. Real food, real people, real good.',
    date: 'December 2024',
  },
  {
    id: 'r3',
    name: 'Priya S.',
    text: 'The Harvest Moon dinner was one of the best meals I\'ve ever had. Every course told a story, and Chef Marcus came out to explain where each ingredient came from. This is what eating should be.',
    date: 'October 2024',
  },
  {
    id: 'r4',
    name: 'The Walker Family',
    text: 'Sunday brunch is our new tradition. The kids\' menu is thoughtful — not just chicken fingers, but real food that kids actually eat. And the coffee never runs out.',
    date: 'February 2025',
  },
  {
    id: 'r5',
    name: 'James R.',
    text: 'I\'m a farmer myself, so I notice when a restaurant truly respects the ingredient. Harvest Room gets it. The trout tastes like the lake, the beef tastes like the pasture. No shortcuts.',
    date: 'July 2024',
  },
  {
    id: 'r6',
    name: 'Sarah & Mike L.',
    text: 'Booked the private dining room for our anniversary. They set up a special menu featuring the farm where we got engaged years ago. Unforgettable evening.',
    date: 'January 2025',
  },
];
