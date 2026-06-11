export const heroImage = 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=1200&q=85';

export const omakaseImage = 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&q=85';

export const interiorImages = {
  counter: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=85',
  privateRoom: 'https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?w=600&q=85',
  barSeating: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&q=85',
};

export const omakase = {
  heading: 'Omakase',
  subtitle: 'Chef\'s Selection',
  description:
    'An intimate eight-seat counter experience. Each evening, Chef curates a multi-course journey through the day\'s finest fish — selected, aged, and prepared before you.',
  details: [
    { label: 'Seating', value: '8 seats per night' },
    { label: 'Courses', value: '18–22 courses' },
    { label: 'Duration', value: 'Approximately 2.5 hours' },
    { label: 'Price', value: '$250 per person' },
    { label: 'Reservation', value: 'Required, prepaid' },
  ],
};

export interface MenuItem {
  name: string;
  description: string;
  price: string;
}

export interface MenuCategory {
  category: string;
  items: MenuItem[];
}

export const menu: MenuCategory[] = [
  {
    category: 'Nigiri',
    items: [
      { name: 'Kinmedai', description: 'Golden eye snapper, light sear', price: '9' },
      { name: 'Chu-toro', description: 'Medium fatty tuna', price: '14' },
      { name: 'O-toro', description: 'Premium fatty tuna', price: '18' },
      { name: 'Aji', description: 'Horse mackerel, ginger & scallion', price: '10' },
      { name: 'Sake', description: 'Atlantic salmon', price: '8' },
      { name: 'Ebi', description: 'Sweet shrimp, butterflied', price: '10' },
      { name: 'Uni', description: 'Sea urchin, nori wrap', price: '16' },
      { name: 'Anago', description: 'Saltwater eel, nitsume glaze', price: '12' },
    ],
  },
  {
    category: 'Sashimi',
    items: [
      { name: 'Moriawase', description: 'Chef\'s selection of five fish', price: '32' },
      { name: 'Hamachi', description: 'Yellowtail, citrus ponzu', price: '18' },
      { name: 'Shiromi', description: 'White fish of the day', price: '16' },
      { name: 'Tako', description: 'Tender octopus, sesame', price: '14' },
    ],
  },
  {
    category: 'Maki & Rolls',
    items: [
      { name: 'Tekka Maki', description: 'Tuna roll', price: '7' },
      { name: 'Kappa Maki', description: 'Cucumber roll', price: '5' },
      { name: 'Negi-toro Maki', description: 'Scallion & fatty tuna', price: '12' },
      { name: 'Ume-shiso Maki', description: 'Plum & shiso leaf', price: '8' },
    ],
  },
  {
    category: 'Small Plates',
    items: [
      { name: 'Edamame', description: 'Sea salt, shichimi', price: '6' },
      { name: 'Gyoza', description: 'Pork & cabbage, ponzu dip', price: '10' },
      { name: 'Agedashi Tofu', description: 'Silken tofu, dashi broth', price: '9' },
      { name: 'Sunomono', description: 'Cucumber & crab, vinegar', price: '11' },
    ],
  },
];

export interface SakePairing {
  name: string;
  type: string;
  region: string;
  notes: string;
}

export const sakePairings: SakePairing[] = [
  {
    name: 'Dassai 50',
    type: 'Junmai Daiginjo',
    region: 'Yamaguchi',
    notes: 'Lychee, melon, clean finish — pairs with white fish and uni',
  },
  {
    name: 'Kubota Senju',
    type: 'Junmai Daiginjo',
    region: 'Niigata',
    notes: 'Floral, elegant, dry — complements toro and aged fish',
  },
  {
    name: 'Hakkaisan',
    type: 'Junmai',
    region: 'Niigata',
    notes: 'Crisp, mineral, bone-dry — ideal with sashimi and light plates',
  },
  {
    name: 'Tengumai',
    type: 'Yamahai Junmai',
    region: 'Ishikawa',
    notes: 'Rich, umami-driven — matches eel and bold flavors',
  },
  {
    name: 'Suzune',
    type: 'Sparkling Junmai',
    region: 'Hiroshima',
    notes: 'Effervescent, light, slightly sweet — apertif or pair with starters',
  },
];

export const reservationsPolicy = {
  timing: 'Seatings at 6:00 PM and 8:30 PM, Tuesday through Saturday.',
  cancellation:
    'Cancellations accepted up to 48 hours before your reservation. Late cancellations and no-shows are charged in full.',
  allergies:
    'Please inform us of any dietary restrictions or allergies at least 72 hours in advance. We accommodate with advance notice.',
  booking: 'Reservations open on the 1st of each month for the following month.',
};

export const footerInfo = {
  hours: {
    heading: 'Hours',
    lines: [
      'Tuesday \u2013 Saturday',
      'Seating I: 6:00 PM',
      'Seating II: 8:30 PM',
      'Sunday & Monday \u2014 Closed',
    ],
  },
  location: {
    heading: 'Location',
    lines: ['47 Greene Street', 'New York, NY 10013', 'SoHo district'],
  },
  contact: {
    heading: 'Contact',
    lines: ['212.555.0187', 'reserve@kairosushi.com'],
  },
  instagram: '@kairosushinyc',
};

export const chefMethodSteps = [
  {
    title: 'Rice',
    subtitle: 'Shari',
    description:
      'We source a single variety of aged Akita rice. Prepared firm, seasoned with red vinegar, salt, and sugar. Held at body temperature \u2014 never warm, never cold.',
  },
  {
    title: 'Fish',
    subtitle: 'Sakana',
    description:
      'Daily markets in Tokyo and New York. Each fish is evaluated for fat content, texture, and seasonality. Aged from one to ten days for depth of flavor.',
  },
  {
    title: 'Knife',
    subtitle: 'Hōchō',
    description:
      'A single bevel yanagi-ba, sharpened each morning on natural water stones. Every cut is an explicit reflex \u2014 no wasted motion, no second pass.',
  },
  {
    title: 'Timing',
    subtitle: 'Jikan',
    description:
      'Nigiri is formed and served within seconds. The temperature of the fish, the pressure of the fingers, the moment it reaches the counter \u2014 all calibrated.',
  },
];
