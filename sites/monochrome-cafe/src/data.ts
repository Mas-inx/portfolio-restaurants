// Monochrome Cafe — Data Layer
// Strict typographic system for a gallery-like coffee bar

export interface MenuItem {
  name: string;
  description: string;
  price: string;
  category: 'espresso' | 'filter' | 'milk' | 'cold' | 'pastry';
}

export interface Roast {
  id: string;
  name: string;
  origin: string;
  process: string;
  altitude: string;
  notes: string[];
  brewMethod: string;
  intensity: number; // 1-5
  roast: 'light' | 'medium' | 'dark';
}

export interface Ritual {
  id: string;
  time: string;
  title: string;
  description: string;
  brew: string;
  duration: string;
  temperature: string;
}

export interface MembershipTier {
  name: string;
  price: string;
  frequency: string;
  includes: string[];
  highlight?: boolean;
}

export const menuItems: MenuItem[] = [
  { name: 'Espresso', description: 'Single origin, 18g in / 36g out', price: '4.50', category: 'espresso' },
  { name: 'Doppio', description: 'Double extraction, direct', price: '5.50', category: 'espresso' },
  { name: 'Ristretto', description: 'Restricted, concentrated', price: '5.00', category: 'espresso' },
  { name: 'Long Black', description: 'Espresso over hot water', price: '5.00', category: 'espresso' },
  { name: 'V60 Single Origin', description: 'Hand-poured, 15g / 250ml', price: '6.50', category: 'filter' },
  { name: 'Chemex', description: 'Clean, full-bodied, 30g / 500ml', price: '7.50', category: 'filter' },
  { name: 'Aeropress', description: 'Immersion, inverted method', price: '6.00', category: 'filter' },
  { name: 'Batch Brew', description: 'Rotating selection, daily', price: '4.00', category: 'filter' },
  { name: 'Flat White', description: 'Double ristretto, microfoam', price: '5.50', category: 'milk' },
  { name: 'Cortado', description: 'Equal parts espresso, steamed milk', price: '5.00', category: 'milk' },
  { name: 'Cappuccino', description: 'Classic ratio, dry foam', price: '5.50', category: 'milk' },
  { name: 'Latte', description: 'Single espresso, textured milk', price: '5.50', category: 'milk' },
  { name: 'Cold Brew', description: '18hr immersion, filtered', price: '5.50', category: 'cold' },
  { name: 'Iced Americano', description: 'Double shot, chilled', price: '5.00', category: 'cold' },
  { name: 'Espresso Tonic', description: 'Tonic water, citrus peel', price: '6.00', category: 'cold' },
  { name: 'Shirley Bassey', description: 'Cold brew, oat, vanilla', price: '6.50', category: 'cold' },
  { name: 'Sourdough Croissant', description: 'Laminated, 72hr ferment', price: '4.50', category: 'pastry' },
  { name: 'Pain au Chocolat', description: 'Dark chocolate, butter', price: '5.00', category: 'pastry' },
  { name: 'Cardamom Bun', description: 'House spice blend', price: '4.50', category: 'pastry' },
  { name: 'Oat Biscuit', description: 'Sea salt, brown butter', price: '3.50', category: 'pastry' },
];

export const roasts: Roast[] = [
  {
    id: 'ethiopia-yirgacheffe',
    name: 'Yirgacheffe',
    origin: 'Ethiopia · Gedeo Zone',
    process: 'Washed',
    altitude: '1,950m',
    notes: ['Jasmine', 'Bergamot', 'Stone Fruit'],
    brewMethod: 'V60 · 93°C · 1:16',
    intensity: 2,
    roast: 'light',
  },
  {
    id: 'colombia-huila',
    name: 'Huila',
    origin: 'Colombia · Huila',
    process: 'Honey',
    altitude: '1,780m',
    notes: ['Red Apple', 'Caramel', 'Cocoa'],
    brewMethod: 'Chemex · 94°C · 1:15',
    intensity: 3,
    roast: 'medium',
  },
  {
    id: 'kenya-nyeri',
    name: 'Nyeri AA',
    origin: 'Kenya · Nyeri County',
    process: 'Washed',
    altitude: '1,800m',
    notes: ['Blackcurrant', 'Grapefruit', 'Brown Sugar'],
    brewMethod: 'Aeropress · 92°C · 1:14',
    intensity: 4,
    roast: 'medium',
  },
  {
    id: 'brazil-cerrado',
    name: 'Cerrado',
    origin: 'Brazil · Minas Gerais',
    process: 'Natural',
    altitude: '1,100m',
    notes: ['Hazelnut', 'Dark Chocolate', 'Dried Fig'],
    brewMethod: 'Espresso · 93°C · 1:2',
    intensity: 4,
    roast: 'dark',
  },
  {
    id: 'guatemala-antigua',
    name: 'Antigua',
    origin: 'Guatemala · Sacatepéquez',
    process: 'Washed',
    altitude: '1,600m',
    notes: ['Toffee', 'Orange Zest', 'Almond'],
    brewMethod: 'Batch Brew · 94°C · 1:16',
    intensity: 3,
    roast: 'medium',
  },
  {
    id: 'rwanda-nyamasheke',
    name: 'Nyamasheke',
    origin: 'Rwanda · Western Province',
    process: 'Fully Washed',
    altitude: '1,850m',
    notes: ['Plum', 'Hibiscus', 'Raw Honey'],
    brewMethod: 'V60 · 93°C · 1:16',
    intensity: 2,
    roast: 'light',
  },
];

export const rituals: Ritual[] = [
  {
    id: 'morning',
    time: '07:00 — 10:00',
    title: 'Morning Espresso',
    description: 'The first extraction. A single origin, pulled short, consumed standing at the bar. No milk. No sugar. No conversation.',
    brew: 'Espresso · 18g in · 36g out · 26s',
    duration: '3 min',
    temperature: '93°C',
  },
  {
    id: 'noon',
    time: '11:00 — 14:00',
    title: 'Noon Pour-Over',
    description: 'The midday ritual. Hand-poured, watched in silence. A single origin filter coffee, served in a ceramic vessel. Time slows.',
    brew: 'V60 · 15g · 250ml · 3:30',
    duration: '6 min',
    temperature: '93°C',
  },
  {
    id: 'evening',
    time: '16:00 — 19:00',
    title: 'Evening Decaf',
    description: 'The closing ritual. Swiss Water decaf, gentle extraction. Paired with a single biscuit. The day, concluded.',
    brew: 'Chemex · 30g · 500ml · 4:30',
    duration: '8 min',
    temperature: '94°C',
  },
];

export const membershipTiers: MembershipTier[] = [
  {
    name: 'Black',
    price: '28',
    frequency: '/ month',
    includes: [
      'Daily espresso, any method',
      'One filter coffee per week',
      '10% retail beans',
      'Priority seating',
    ],
  },
  {
    name: 'Graphite',
    price: '58',
    frequency: '/ month',
    includes: [
      'Unlimited espresso & filter',
      'Weekly cupping sessions',
      '250g rotating single origin',
      'Guest passes (2/month)',
      'Retail discount 20%',
    ],
    highlight: true,
  },
  {
    name: 'Void',
    price: '120',
    frequency: '/ month',
    includes: [
      'Everything in Graphite',
      'Private brew station access',
      'Monthly origin tasting flight',
      '500g exclusive micro-lot',
      'Bar-side consultation',
      'Unlimited guest passes',
    ],
  },
];

export const heroImage = "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&q=85";

export const barImage = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&q=85";

export const galleryImages = [
  { alt: 'Espresso extraction, close', label: '001', src: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800&q=85' },
  { alt: 'Bar surface, morning light', label: '002', src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=85' },
  { alt: 'Pour-over in progress', label: '003', src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=85' },
  { alt: 'Bean detail, macro', label: '004', src: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=85' },
  { alt: 'Ceramic vessel, side', label: '005', src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=85' },
  { alt: 'Steam, backlit', label: '006', src: 'https://images.unsplash.com/photo-1497935586351-b67a49e01cd8?w=800&q=85' },
];

export const hours = [
  { day: 'Monday — Friday', time: '07:00 — 19:00' },
  { day: 'Saturday', time: '08:00 — 18:00' },
  { day: 'Sunday', time: '08:00 — 16:00' },
];
