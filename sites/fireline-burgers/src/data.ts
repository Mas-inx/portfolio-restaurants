export interface MenuItem {
  name: string;
  description: string;
  price: string;
  spiceLevel: number; // 0-3
  category: 'burgers' | 'fries' | 'wings' | 'shakes';
  featured?: boolean;
}

export interface ComboDeal {
  name: string;
  items: string[];
  price: string;
  originalPrice: string;
  label: string;
  labelColor: string;
}

export interface Review {
  initials: string;
  text: string;
  tag: string;
}

export interface Location {
  name: string;
  address: string;
  hours: string;
  deliveryRadius: string;
  status: 'Open' | 'Closing soon' | 'Closed';
}

export const menuItems: MenuItem[] = [
  // Burgers
  {
    name: 'The Fireline Smash',
    description: 'Double smash patty, American cheese, house pickles, grilled onions, Fireline sauce, sesame bun',
    price: '$13.90',
    spiceLevel: 1,
    category: 'burgers',
    featured: true,
  },
  {
    name: 'Double Flame',
    description: 'Two flame-grilled beef patties, smoked cheddar, bacon jam, crispy onions, brioche',
    price: '$16.50',
    spiceLevel: 0,
    category: 'burgers',
    featured: true,
  },
  {
    name: 'Chili Crunch Burger',
    description: 'Single smash patty, chili crunch oil, pepper jack, jalapeño slaw, spicy mayo, potato bun',
    price: '$14.50',
    spiceLevel: 3,
    category: 'burgers',
    featured: true,
  },
  {
    name: 'Smokehouse BBQ',
    description: 'Beef patty, pulled pork, coleslaw, crispy bacon, smoky BBQ sauce, brioche bun',
    price: '$15.90',
    spiceLevel: 0,
    category: 'burgers',
  },
  {
    name: 'Mushroom Swiss',
    description: 'Beef patty, sautéed mushrooms, melted Swiss, truffle aioli, arugula, sesame bun',
    price: '$14.90',
    spiceLevel: 0,
    category: 'burgers',
  },

  // Fries
  {
    name: 'Flame Fries',
    description: 'Crispy seasoned fries with Fireline spice blend & house ranch',
    price: '$6.90',
    spiceLevel: 1,
    category: 'fries',
  },
  {
    name: 'Truffle Parmesan',
    description: 'Hand-cut fries tossed in truffle oil, parmesan, fresh parsley',
    price: '$8.90',
    spiceLevel: 0,
    category: 'fries',
    featured: true,
  },
  {
    name: 'Loaded Chili Cheese',
    description: 'Flame fries topped with beef chili, melted cheddar, jalapeños, sour cream',
    price: '$10.90',
    spiceLevel: 2,
    category: 'fries',
  },

  // Wings
  {
    name: 'Fire Wings (6pc)',
    description: 'Crispy wings tossed in house-made fire sauce, blue cheese dip',
    price: '$11.90',
    spiceLevel: 3,
    category: 'wings',
    featured: true,
  },
  {
    name: 'Honey BBQ Wings (10pc)',
    description: 'Sticky honey BBQ glazed wings, sesame seeds, scallions',
    price: '$16.90',
    spiceLevel: 0,
    category: 'wings',
  },
  {
    name: 'Garlic Parmesan Wings (6pc)',
    description: 'Crispy wings tossed in garlic butter, parmesan, fresh herbs',
    price: '$12.90',
    spiceLevel: 0,
    category: 'wings',
  },

  // Shakes
  {
    name: 'Midnight Vanilla',
    description: 'Double-thick vanilla shake with black cocoa crumble',
    price: '$7.90',
    spiceLevel: 0,
    category: 'shakes',
    featured: true,
  },
  {
    name: 'Strawberry Blaze',
    description: 'Fresh strawberry shake with fire candy drizzle',
    price: '$8.50',
    spiceLevel: 0,
    category: 'shakes',
  },
  {
    name: 'Salted Caramel Crunch',
    description: 'Caramel shake with house-made caramel sauce, sea salt, crushed toffee',
    price: '$8.90',
    spiceLevel: 0,
    category: 'shakes',
  },
  {
    name: 'Cookies & Cream Inferno',
    description: 'Cookies & cream shake with dark chocolate chips, whipped cream',
    price: '$8.50',
    spiceLevel: 0,
    category: 'shakes',
  },
];

export const comboDeals: ComboDeal[] = [
  {
    name: 'The Double Down',
    items: ['2x Fireline Smash Burgers', 'Large Flame Fries', '2x Midnight Vanilla Shakes'],
    price: '$34.90',
    originalPrice: '$44.20',
    label: 'BEST FOR TWO',
    labelColor: 'bg-flame-500',
  },
  {
    name: 'Late Night Fix',
    items: ['1x Double Flame Burger', 'Loaded Chili Cheese Fries', '1x Any Shake'],
    price: '$24.90',
    originalPrice: '$34.30',
    label: 'LATE NIGHT',
    labelColor: 'bg-charcoal-700',
  },
  {
    name: 'Fire Squad',
    items: ['1x Chili Crunch Burger', 'Fire Wings (6pc)', 'Large Flame Fries', '1x Strawberry Blaze'],
    price: '$32.90',
    originalPrice: '$42.20',
    label: 'SPICY',
    labelColor: 'bg-neon-red',
  },
];

export const reviews: Review[] = [
  { initials: 'TK', text: 'Best smash in town. The Fireline sauce is addictive.', tag: '🔥 Regular' },
  { initials: 'MJ', text: 'Their Chili Crunch Burger ruined all other burgers for me. Not mad about it.', tag: '🌶️ Spice Seeker' },
  { initials: 'AL', text: 'Open till 2AM and actually good? Unreal. Late night fries hit different.', tag: '🌙 Night Owl' },
  { initials: 'RD', text: 'Double Flame is pure chaos in the best way. Bacon jam is insane.', tag: '🍔 Meat Lover' },
  { initials: 'SP', text: 'Truffle fries are dangerously good. Might order 3 next time.', tag: '🍟 Fry Connoisseur' },
  { initials: 'CM', text: 'Strawberry Blaze shake is a whole vibe. Get it with the Fire Wings.', tag: '🔥 Sweet & Spicy' },
];

export const locations: Location[] = [
  {
    name: 'Downtown Fireline',
    address: '248 Flame Ave, Downtown',
    hours: 'Mon-Sun 11AM-2AM',
    deliveryRadius: '3.5 km',
    status: 'Open',
  },
  {
    name: 'Eastside Smokehouse',
    address: '76 Griller St, Eastside',
    hours: 'Mon-Sun 11AM-1AM',
    deliveryRadius: '4 km',
    status: 'Open',
  },
  {
    name: 'Northside Fire Spot',
    address: '512 Charred Ln, Northside',
    hours: 'Wed-Sun 12PM-12AM',
    deliveryRadius: '3 km',
    status: 'Closing soon',
  },
];
