export interface Listing {
  id: number;
  title: string;
  price: string;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
}

export interface AdvisoryService {
  title: string;
  description: string;
  icon: string;
}

export interface Neighborhood {
  name: string;
  description: string;
  image: string;
}

export interface MarketStat {
  label: string;
  value: string;
  change: string;
}

export interface Testimonial {
  quote: string;
  author: string;
}

export const featuredListings: Listing[] = [
  {
    id: 1,
    title: 'The Penthouse Collection',
    price: '$28,500,000',
    location: '72 Park Avenue, Manhattan',
    beds: 6,
    baths: 7,
    sqft: 8200,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=85',
  },
  {
    id: 2,
    title: 'Waterfront Estate',
    price: '$19,750,000',
    location: '12 Harbor Lane, Southampton',
    beds: 8,
    baths: 9,
    sqft: 12000,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=85',
  },
  {
    id: 3,
    title: 'Hillside Villa',
    price: '$14,200,000',
    location: '45 Bel Air Road, Los Angeles',
    beds: 5,
    baths: 6,
    sqft: 6500,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=85',
  },
];

export const advisoryServices: AdvisoryService[] = [
  { title: 'Private Acquisitions', description: 'Discreet purchasing of elite properties before they reach public listing. Our network of off-market opportunities spans six continents.', icon: '🏛️' },
  { title: 'Portfolio Sales', description: 'Strategic marketing of high-value estates through curated, invitation-only showcases to qualified buyers worldwide.', icon: '📜' },
  { title: 'Off-Market Access', description: 'A database of premium properties that never appear on public platforms — available exclusively through our private network.', icon: '🔑' },
  { title: 'Relocation Concierge', description: 'White-glove transition services for UHNW individuals and families, from visa coordination to household staffing.', icon: '✈️' },
];

export const neighborhoods: Neighborhood[] = [
  { name: 'Waterfront Estates', description: 'Private docks, panoramic ocean views, and serene coastal living on some of the most exclusive shoreline in the world.', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=85' },
  { name: 'Hillside Reserves', description: 'Architectural masterpieces nestled among rolling hills with canyon views, complete privacy, and unmatched tranquility.', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=85' },
  { name: 'Downtown Penthouses', description: 'Sky-high residences in the cultural and financial heart of the city, offering panoramic skylines and walkable luxury.', image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&q=85' },
  { name: 'Gated Communities', description: 'Exclusive enclaves offering 24/7 security, world-class amenities, and a sense of belonging among discerning neighbors.', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=85' },
];

export const sellingServices: AdvisoryService[] = [
  { title: 'Curated Staging', description: 'Award-winning interior design preparation that positions your property to command the highest possible offer.', icon: '🎨' },
  { title: 'Strategic Pricing', description: 'Data-driven valuation leveraging proprietary market intelligence, comparable sales, and future appreciation modeling.', icon: '📊' },
  { title: 'Private Marketing', description: 'Targeted outreach to a curated database of qualified buyers through confidential channels — no public listing required.', icon: '📋' },
  { title: 'Elite Negotiation', description: 'Decades of experience structuring complex, multi-party transactions with absolute discretion and precision.', icon: '🤝' },
];

export const marketStats: MarketStat[] = [
  { label: 'Avg Days on Market', value: '38', change: '−12%' },
  { label: 'Portfolio Valuation', value: '$4.2B', change: '+18%' },
  { label: 'Off-Market Sales Rate', value: '67%', change: '+9%' },
  { label: 'Client Satisfaction', value: '99%', change: '+2%' },
];

export const testimonials: Testimonial[] = [
  { quote: 'Absolute discretion and unmatched market knowledge. They found us a home that was never meant to be for sale — and made the impossible possible.', author: '— Private Client, Upper East Side' },
  { quote: 'The sale of our family estate required sensitivity and precision. Atelier exceeded every expectation with grace and professionalism.', author: '— Anonymous, Greenwich' },
  { quote: 'Their network is unparalleled. We acquired a property before six other buyers even knew it was available. That is the Atelier difference.', author: '— Confidential Client, Beverly Hills' },
];
