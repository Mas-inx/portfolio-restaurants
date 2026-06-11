export interface Unit {
  id: number;
  type: string;
  price: string;
  sqft: number;
  available: string;
  image: string;
  highlights: string[];
}

export interface Amenity {
  title: string;
  description: string;
  icon: string;
}

export interface FloorPlan {
  id: number;
  name: string;
  beds: number;
  baths: number;
  sqft: number;
  price: string;
  available: number;
  image: string;
}

export interface NeighborhoodItem {
  title: string;
  description: string;
  icon: string;
}

export interface GalleryItem {
  src: string;
  alt: string;
  span: string;
}

export interface LeasingStep {
  title: string;
  description: string;
  icon: string;
}

export const availableUnits: Unit[] = [
  {
    id: 1,
    type: 'Studio',
    price: '$1,850',
    sqft: 480,
    available: 'Now',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=85',
    highlights: ['Floor-to-ceiling windows', 'Italian marble counters', 'In-unit washer/dryer'],
  },
  {
    id: 2,
    type: '1-Bedroom',
    price: '$2,450',
    sqft: 720,
    available: 'Aug 15',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=85',
    highlights: ['Open-plan kitchen', 'Walk-in closet', 'Private balcony'],
  },
  {
    id: 3,
    type: '2-Bedroom',
    price: '$3,600',
    sqft: 1100,
    available: 'Sep 1',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=85',
    highlights: ['Corner unit, dual exposure', 'En-suite master bath', 'Extra storage room'],
  },
];

export const amenities: Amenity[] = [
  { title: 'Rooftop Lounge', description: 'Panoramic city views with fire pits, grills, and lounge seating — open late.', icon: '🌇' },
  { title: 'Fitness Center', description: '24/7 gym with Peloton bikes, free weights, yoga studio, and on-demand classes.', icon: '💪' },
  { title: 'Co-Working Lounge', description: 'Private phone booths, high-speed WiFi, conference rooms, and coffee bar.', icon: '💻' },
  { title: 'Parking Garage', description: 'Reserved spaces with EV charging stations and 24-hour security.', icon: '🚗' },
  { title: 'Pet Friendly', description: 'Pet spa, rooftop dog run, and no breed restrictions — all pets welcome.', icon: '🐾' },
  { title: 'Package Lockers', description: 'Climate-controlled, secure package room with SMS delivery alerts.', icon: '📦' },
];

export const floorPlans: FloorPlan[] = [
  { id: 1, name: 'The Minimalist', beds: 0, baths: 1, sqft: 480, price: '$1,850', available: 3, image: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=600&q=85' },
  { id: 2, name: 'The Essential', beds: 1, baths: 1, sqft: 720, price: '$2,450', available: 2, image: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=600&q=85' },
  { id: 3, name: 'The Cornerstone', beds: 2, baths: 2, sqft: 1100, price: '$3,600', available: 4, image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=85' },
  { id: 4, name: 'The Penthouse Suite', beds: 3, baths: 2, sqft: 1600, price: '$5,200', available: 1, image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=85' },
];

export const neighborhood: NeighborhoodItem[] = [
  { title: 'Walk Score 95', description: 'Groceries, coffee, gym, and nightlife all within a 10-minute walk from the lobby.', icon: '🚶' },
  { title: 'Transit Hub', description: '3 subway lines, 2 bus routes, and a Citi Bike station at your doorstep.', icon: '🚇' },
  { title: 'Café & Dining', description: '24 restaurants, 8 coffee shops, and a Michelin-starred tasting menu within 3 blocks.', icon: '🍽️' },
  { title: 'Nightlife', description: 'Rooftop bars, live music venues, and speakeasies — the neighborhood never sleeps.', icon: '🎵' },
];

export const gallery: GalleryItem[] = [
  { src: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=85', alt: 'Modern lobby with concierge desk', span: 'col-span-2 row-span-1' },
  { src: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=85', alt: 'Studio apartment interior', span: 'col-span-1 row-span-1' },
  { src: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=85', alt: 'One bedroom living room', span: 'col-span-1 row-span-1' },
  { src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=85', alt: 'Two bedroom kitchen', span: 'col-span-1 row-span-1' },
  { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=85', alt: 'Rooftop lounge with city view', span: 'col-span-1 row-span-1' },
  { src: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=600&q=85', alt: 'Fitness center with modern equipment', span: 'col-span-2 row-span-1' },
];

export const leasingSteps: LeasingStep[] = [
  { title: 'Book a Tour', description: 'Schedule an in-person or virtual tour that fits your schedule. We\'re open 7 days a week.', icon: '📅' },
  { title: 'Apply Online', description: 'Simple 10-minute application. $50 fee, instant credit check, 24-hour approval turnaround.', icon: '📝' },
  { title: 'Review & Sign', description: 'Digital lease with clear terms, no hidden fees. We explain every clause before you sign.', icon: '✓' },
  { title: 'Move In', description: 'Welcome package, smart lock codes ready, and our concierge team helps you settle in.', icon: '🔑' },
];
