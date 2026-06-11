export interface JourneyStep {
  title: string;
  description: string;
  icon: string;
}

export interface FeaturedHome {
  id: number;
  title: string;
  price: string;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  school: string;
  yard: string;
  commute: string;
}

export interface SellingStep {
  title: string;
  description: string;
  icon: string;
}

export interface Neighborhood {
  name: string;
  description: string;
  highlights: string[];
  image: string;
}

export interface Tool {
  title: string;
  description: string;
  linkText: string;
  icon: string;
}

export interface Review {
  quote: string;
  author: string;
  family: string;
}

export const buyerJourney: JourneyStep[] = [
  { title: 'Set Your Budget', description: 'We help you understand your true buying power, from pre-approval to down-payment planning.', icon: 'wallet' },
  { title: 'Search & Discover', description: 'Curated home tours based on your family\'s wish list — schools, commute, yard space, and neighborhood feel.', icon: 'search' },
  { title: 'Tour Together', description: 'We walk through every home with you, pointing out what matters for raising a family and spotting potential issues.', icon: 'home_search' },
  { title: 'Offer & Close', description: 'Clear guidance through offers, inspections, and closing so you feel confident every step of the way.', icon: 'contract' },
];

export const featuredHomes: FeaturedHome[] = [
  {
    id: 1,
    title: 'Maple Grove Family Home',
    price: '$685,000',
    location: '142 Maple Drive, Oakwood',
    beds: 4,
    baths: 3,
    sqft: 2800,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=85',
    school: 'Blue Ribbon Elementary (0.3 mi)',
    yard: 'Fenced backyard with playset',
    commute: '25 min to downtown',
  },
  {
    id: 2,
    title: 'Willow Creek Colonial',
    price: '$549,000',
    location: '87 Willow Street, Fairview',
    beds: 3,
    baths: 2,
    sqft: 2100,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=85',
    school: 'Fairview Middle School (0.5 mi)',
    yard: 'Large corner lot + garden beds',
    commute: '18 min to tech district',
  },
  {
    id: 3,
    title: 'Sunny Meadows Split-Level',
    price: '$725,000',
    location: '231 Meadow Lane, Westbrook',
    beds: 5,
    baths: 3,
    sqft: 3200,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=85',
    school: 'Westbrook High (0.7 mi)',
    yard: 'Half-acre lot + pool',
    commute: '30 min to metro area',
  },
];

export const sellingSteps: SellingStep[] = [
  { title: 'Home Preparation', description: 'We guide you on cost-effective improvements that maximize your sale price — no over-improving.', icon: 'tools' },
  { title: 'Strategic Pricing', description: 'Data-backed pricing that attracts the right buyers while protecting your equity.', icon: 'chart' },
  { title: 'Professional Photography', description: 'Bright, warm photography and virtual tours that show off your home\'s best family features.', icon: 'camera' },
  { title: 'Targeted Showings', description: 'We pre-qualify every buyer and schedule showings around your family\'s routine.', icon: 'door' },
  { title: 'Offer Management', description: 'We negotiate on your behalf and help you evaluate every offer with your family\'s future in mind.', icon: 'handshake' },
];

export const neighborhoods: Neighborhood[] = [
  { name: 'Oakwood School District', description: 'Top-rated schools, tree-lined streets, and a strong sense of community make this the #1 choice for growing families.', highlights: ['Blue Ribbon Elementary', 'Community pool & sports fields', 'Annual block parties'], image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&q=85' },
  { name: 'Fairview Park Area', description: 'Walkable neighborhoods centered around a sprawling city park with playgrounds, trails, and weekend farmers markets.', highlights: ['50-acre Fairview Park', 'Weekend farmer\'s market', 'Top-rated daycare centers'], image: 'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=600&q=85' },
  { name: 'Westbrook Commuter', description: 'Affordable homes with easy highway access, growing school options, and new family-friendly developments.', highlights: ['Express bus to metro', 'New community center', 'Developing school system'], image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&q=85' },
  { name: 'Riverside Crossing', description: 'Charming historic district along the river with large lots, mature trees, and homes full of character.', highlights: ['Riverwalk trail system', 'Historic downtown', 'Community gardens'], image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=85' },
];

export const tools: Tool[] = [
  { title: 'Mortgage Estimator', description: 'See estimated monthly payments based on price, down payment, and current rates. Get a realistic picture before you start touring.', linkText: 'Calculate your payment', icon: 'calculator' },
  { title: 'Moving Checklist', description: 'A 12-week timeline covering everything from school transfers to utility setup. We email it to you for free.', linkText: 'Get the checklist', icon: 'clipboard' },
  { title: 'Saved Search Alerts', description: 'Set your criteria and we\'ll notify you the moment a home that fits your family hits the market.', linkText: 'Set up alerts', icon: 'bell' },
];

export const reviews: Review[] = [
  { quote: 'NestFirst made our first home purchase feel easy. They understood exactly what we needed for our twin toddlers — safe neighborhood, good schools, a yard to run in.', author: 'The Garcias', family: 'Family of 4 — Oakwood' },
  { quote: 'We were nervous about selling our first home and buying a bigger one. Their step-by-step approach made the whole process feel seamless and supportive.', author: 'The Millers', family: 'Family of 5 — Westbrook' },
  { quote: 'Our agent pointed out things about each house we never would have noticed. She helped us find the perfect home for our growing family.', author: 'The Parkers', family: 'Family of 3 — Fairview' },
];
