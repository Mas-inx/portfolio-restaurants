export interface SiteInfo {
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  frequency: string;
  priceFrom: number;
}

export interface QuoteStep {
  step: number;
  title: string;
  prompt: string;
}

export interface PricingTier {
  id: string;
  label: string;
  description: string;
  price: string;
  popular: boolean;
  features: string[];
}

export interface ReasonItem {
  icon: string;
  title: string;
  description: string;
}

export interface Neighborhood {
  name: string;
}

export const siteInfo: SiteInfo = {
  name: 'YardCrew',
  tagline: 'Book lawn care without the back-and-forth',
  description:
    'Reliable, tech-enabled lawn care that shows up on time, takes photos of every visit, and lets you manage everything from your phone. No phone calls. No surprises.',
  heroImage: 'https://images.unsplash.com/photo-1598902108854-10e335adac99?w=1600&q=85',
};

export const services: ServiceItem[] = [
  {
    id: 'mowing',
    title: 'Lawn Mowing',
    description: 'Professional mowing with bagging or mulching options. We adjust blade height seasonally for optimal grass health.',
    frequency: 'Weekly / Biweekly',
    priceFrom: 35,
  },
  {
    id: 'edging',
    title: 'Edging & Trimming',
    description: 'Crisp edges along driveways, walkways, and flower beds. String trimming around trees, fences, and structures.',
    frequency: 'Weekly / Biweekly',
    priceFrom: 15,
  },
  {
    id: 'weed',
    title: 'Weed Control',
    description: 'Pre-emergent and post-emergent treatment for broadleaf weeds and crabgrass. Safe for pets and kids.',
    frequency: 'Monthly',
    priceFrom: 45,
  },
  {
    id: 'cleanup',
    title: 'Seasonal Cleanup',
    description: 'Spring and fall yard cleanup including leaf removal, gutter clearing, debris hauling, and bed prep.',
    frequency: 'Seasonal',
    priceFrom: 120,
  },
  {
    id: 'hedge',
    title: 'Hedge Trimming',
    description: 'Shaping and maintenance of hedges, shrubs, and small trees. We use manual shears for precision work.',
    frequency: 'Monthly / As Needed',
    priceFrom: 40,
  },
  {
    id: 'mulch',
    title: 'Mulch Installation',
    description: 'Fresh hardwood or cedar mulch for flower beds and tree rings. Color choices available.',
    frequency: 'Seasonal',
    priceFrom: 80,
  },
];

export const quoteSteps: QuoteStep[] = [
  { step: 1, title: 'Your Address', prompt: 'Enter your property address so we can check service availability.' },
  { step: 2, title: 'Yard Size', prompt: 'How big is your lawn? Estimate or drag the pin on the map.' },
  { step: 3, title: 'Frequency', prompt: 'How often would you like us to visit? Weekly, biweekly, or one-time.' },
];

export const pricingTiers: PricingTier[] = [
  {
    id: 'weekly',
    label: 'Weekly',
    description: 'Best for maintaining a pristine lawn all season long.',
    price: '$35/wk',
    popular: true,
    features: ['Unlimited rescheduling', 'Photo proof each visit', 'Text reminders', 'Cancel anytime', 'Same crew every time'],
  },
  {
    id: 'biweekly',
    label: 'Biweekly',
    description: 'Great for yards that need regular but less frequent care.',
    price: '$45/wk',
    popular: false,
    features: ['Flexible scheduling', 'Photo proof each visit', 'Text reminders', 'Cancel anytime', 'Crew rotation available'],
  },
  {
    id: 'onetime',
    label: 'One-Time',
    description: 'Perfect for a quick cleanup before an event or season change.',
    price: '$89',
    popular: false,
    features: ['Single visit', 'Full mow + edge + blow', 'No commitment', 'Same-day available', 'Pay after service'],
  },
];

export const reasons: ReasonItem[] = [
  {
    icon: 'clock',
    title: 'On-Time Crews',
    description: 'GPS-tracked crews arrive within your scheduled window. We send a notification when we are 15 minutes out.',
  },
  {
    icon: 'camera',
    title: 'Photo Proof',
    description: 'Every visit includes before-and-after photos uploaded to your account. See exactly what was done.',
  },
  {
    icon: 'phone',
    title: 'Text Reminders',
    description: 'Get a reminder the night before and a notification when your crew is en route. No surprises.',
  },
  {
    icon: 'refresh',
    title: 'Easy Reschedule',
    description: 'Skip, reschedule, or add services from your phone in under 30 seconds. No phone calls needed.',
  },
];

export const neighborhoods: Neighborhood[] = [
  { name: 'Downtown' },
  { name: 'Westside' },
  { name: 'North Park' },
  { name: 'Hillcrest' },
  { name: 'University Heights' },
  { name: 'South Park' },
  { name: 'Normal Heights' },
  { name: 'Kensington' },
  { name: 'Mission Hills' },
  { name: 'East Village' },
  { name: 'Golden Hill' },
  { name: 'Pacific Beach' },
];

export const beforeAfterItems = [
  {
    id: 'overgrown-to-tidy',
    title: 'Overgrown to Tidy',
    description: 'Neglected lawn after a month of growth, restored to a clean, even cut with crisp edges.',
    color: '#2d8a4e',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=85',
  },
  {
    id: 'weeds-to-clean',
    title: 'Weed Infestation to Clean Beds',
    description: 'Flower beds overtaken by crabgrass and dandelions, treated and cleared in a single visit.',
    color: '#1a6b3c',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=85',
  },
  {
    id: 'fall-cleanup',
    title: 'Fall Cleanup',
    description: 'Heavy leaf coverage and debris cleared from a 1/4 acre property. Leaves bagged and hauled.',
    color: '#3a9d5e',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=85',
  },
];

export const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Service Areas', href: '#areas' },
  { label: 'Get a Quote', href: '#quote' },
];

export const contactInfo = {
  phone: '(619) 555-0234',
  email: 'hello@yardcrew.com',
};
