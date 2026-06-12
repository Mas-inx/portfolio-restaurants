export const rawBarOysters = [
  { name: 'Kumamoto', origin: 'Humboldt Bay, CA', flavor: 'Sweet, melon finish', size: 'Small', price: 4 },
  { name: 'Blue Point', origin: 'Long Island, NY', flavor: 'Briny, clean minerality', size: 'Medium', price: 4 },
  { name: 'Malpeque', origin: 'PEI, Canada', flavor: 'Crisp, sea-salt bright', size: 'Medium', price: 5 },
  { name: 'Hama Hama', origin: 'Hood Canal, WA', flavor: 'Cucumber, green melon', size: 'Large', price: 5 },
  { name: 'Fanny Bay', origin: 'BC, Canada', flavor: 'Buttery, mild sweetness', size: 'Medium', price: 4 },
  { name: 'Moonstone', origin: 'Narragansett, RI', flavor: 'Plump, copper finish', size: 'Large', price: 5 },
  { name: 'Wellfleet', origin: 'Cape Cod, MA', flavor: 'Salty, firm bite', size: 'Medium', price: 5 },
  { name: 'Totten Inlet', origin: 'Puget Sound, WA', flavor: 'Delicate, creamy body', size: 'Small', price: 4 },
];

export const seafoodDishes = [
  {
    name: 'Whole Grilled Branzino',
    description: 'Lemon, capers, charred fennel, olive oil',
    price: 38,
    tag: 'From the Fire',
    image: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=600&q=80',
  },
  {
    name: 'Yellowtail Crudo',
    description: 'Yuzu, jalapeño, micro cilantro, sea salt',
    price: 22,
    tag: 'Raw',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600&q=80',
  },
  {
    name: 'Lobster Roll',
    description: 'Butter-poached, chive aioli, brioche',
    price: 34,
    tag: 'Signature',
    image: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=600&q=80',
  },
  {
    name: 'Smoked Fish Chowder',
    description: 'Haddock, potato, dill cream, sourdough',
    price: 16,
    tag: 'Warm',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80',
  },
  {
    name: 'Charred Octopus',
    description: 'Romesco, crispy potatoes, smoked paprika',
    price: 24,
    tag: 'From the Fire',
    image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=600&q=80',
  },
  {
    name: 'Oysters Rockefeller',
    description: 'Spinach, pernod, herbed breadcrumbs',
    price: 18,
    tag: 'Baked',
    image: 'https://images.unsplash.com/photo-1606851094655-b3b5a tried-1?w=600&q=80',
  },
];

export const cocktails = [
  {
    name: 'Salt Air Martini',
    spirit: 'Gin',
    flavor: 'Dry, saline, citrus peel',
    garnish: 'Oyster leaf',
    glass: 'Coupe',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500&q=80',
  },
  {
    name: 'Golden Hour Spritz',
    spirit: 'Aperol',
    flavor: 'Bittersweet, blood orange',
    garnish: 'Dehydrated orange',
    glass: 'Wine',
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=500&q=80',
  },
  {
    name: 'Dockside Negroni',
    spirit: 'Mezcal',
    flavor: 'Smoky, herbal, bitter',
    garnish: 'Flamed orange',
    glass: 'Rocks',
    image: 'https://images.unsplash.com/photo-1587223962930-cb7f31384c19?w=500&q=80',
  },
  {
    name: 'Pearl Diver',
    spirit: 'Rum',
    flavor: 'Tropical, passion fruit, lime',
    garnish: 'Mint sprig',
    glass: 'Tiki',
    image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500&q=80',
  },
  {
    name: 'Sea Glass Fizz',
    spirit: 'Vodka',
    flavor: 'Cucumber, elderflower, lime',
    garnish: 'Cucumber ribbon',
    glass: 'Highball',
    image: 'https://images.unsplash.com/photo-1541546006121-5c3bc5e1c583?w=500&q=80',
  },
  {
    name: 'Tide Pool Old Fashioned',
    spirit: 'Bourbon',
    flavor: 'Smoked maple, sea salt, bitters',
    garnish: 'Luxardo cherry',
    glass: 'Rocks',
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=500&q=80',
  },
  {
    name: 'Driftwood Sour',
    spirit: 'Whiskey',
    flavor: 'Lemon, egg white, driftwood bitters',
    garnish: 'Angostura lace',
    glass: 'Coupe',
    image: 'https://images.unsplash.com/photo-1574086832623-25b66df88008?w=500&q=80',
  },
];

export const sourceRegions = [
  { region: 'Pacific Northwest', suppliers: 'Taylor Shellfish, Hama Hama', note: 'Cold-water oysters, daily harvest' },
  { region: 'New England', suppliers: 'Wellfleet, Moonstone, Island Creek', note: 'Classic Atlantic brine' },
  { region: 'Gulf Coast', suppliers: 'Grand Isle, Apalachicola', note: 'Warm-water sweetness' },
  { region: 'Eastern Canada', suppliers: 'Malpeque, Fanny Bay, P.E.I.', note: 'Clean, icy minerality' },
  { region: 'Local Waters', suppliers: 'Day-boat fishermen', note: 'Fish landed before dawn' },
];

export const goldenHourPhases = [
  { phase: 'Lunch', time: '11:30 AM – 2:30 PM', description: 'Light crudo, oysters, crisp whites. Sun high on the deck.', palette: 'bright' },
  { phase: 'Afternoon', time: '2:30 – 5:00 PM', description: 'Spritz hour. Shade on the dock. Raw bar flowing.', palette: 'warm' },
  { phase: 'Golden Hour', time: '5:00 – 7:00 PM', description: 'The best seats fill first. Amber light on the water.', palette: 'golden' },
  { phase: 'Dinner', time: '7:00 – 10:00 PM', description: 'Whole fish from the grill. Candles on every table.', palette: 'deep' },
  { phase: 'Late Bar', time: '10:00 PM – Close', description: 'Mezcal negronis. Low music. The last tide.', palette: 'night' },
];

export const privateEvents = [
  {
    title: 'Oyster Tastings',
    description: 'Guided flights of 8–12 varieties with wine and champagne pairings. Perfect for intimate groups of 10–30.',
    icon: 'oyster',
  },
  {
    title: 'Wedding Welcome Drinks',
    description: 'Dockside cocktails and passed crudo for your rehearsal dinner. Sunset timing, waterfront backdrop.',
    icon: 'celebration',
  },
  {
    title: 'Corporate Evenings',
    description: 'Full buyout of the upper deck. Custom menus, dedicated bar team, AV setup for presentations.',
    icon: 'corporate',
  },
];

export const navLinks = [
  { label: 'Raw Bar', href: '#raw-bar' },
  { label: 'Seafood', href: '#seafood' },
  { label: 'Cocktails', href: '#cocktails' },
  { label: 'Golden Hour', href: '#golden-hour' },
  { label: 'Events', href: '#events' },
  { label: 'Reserve', href: '#reserve' },
];
