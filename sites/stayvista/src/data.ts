export interface StayProperty {
  id: string;
  title: string;
  type: string;
  location: string;
  nightlyRate: number;
  capacity: number;
  bedrooms: number;
  rating: number;
  image: string;
  tags: string[];
}

export interface GuestFeature {
  title: string;
  description: string;
  icon: string;
}

export interface OwnerFeature {
  title: string;
  description: string;
  icon: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export const siteInfo = {
  name: 'StayVista Homes',
  tagline: 'Beautiful Stays, Managed Properly',
  description:
    'We connect discerning guests with exceptional properties while giving owners the peace of mind that comes with professional management.',
};

export const featuredStays: StayProperty[] = [
  {
    id: 'stay-1',
    title: 'Villa Sereno',
    type: 'Villa',
    location: 'Tuscany, Italy',
    nightlyRate: 850,
    capacity: 12,
    bedrooms: 6,
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
    tags: ['Pool', 'Private Garden', 'Wine Cellar', "Chef's Kitchen"],
  },
  {
    id: 'stay-2',
    title: 'The Alder Cabin',
    type: 'Cabin',
    location: 'Smoky Mountains, Tennessee',
    nightlyRate: 395,
    capacity: 6,
    bedrooms: 3,
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop',
    tags: ['Hot Tub', 'Fire Pit', 'Mountain View', 'Hiking Trails'],
  },
  {
    id: 'stay-3',
    title: 'Nocturne Loft',
    type: 'City Apartment',
    location: 'Williamsburg, Brooklyn',
    nightlyRate: 320,
    capacity: 4,
    bedrooms: 2,
    rating: 4.7,
    image:
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
    tags: ['Skyline View', 'Rooftop', 'Gym Access', 'Pet Friendly'],
  },
  {
    id: 'stay-4',
    title: 'Casa del Mar',
    type: 'Beach Home',
    location: 'Malibu, California',
    nightlyRate: 1200,
    capacity: 8,
    bedrooms: 4,
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&h=600&fit=crop',
    tags: ['Oceanfront', 'Private Beach', 'Infinity Pool', 'Outdoor Kitchen'],
  },
];

export const guestFeatures: GuestFeature[] = [
  {
    title: 'Curated Homes',
    description:
      'Every property is personally vetted and photographed. We showcase only the stays that meet our quality standards.',
    icon: 'home',
  },
  {
    title: 'Easy Check-In',
    description:
      'Contactless entry with smart locks, personalized welcome guides, and 24/7 concierge support throughout your stay.',
    icon: 'key',
  },
  {
    title: 'Local Guides',
    description:
      'Digital guidebooks curated by local experts — from hidden gem restaurants to off-the-beaten-path experiences.',
    icon: 'location-pin',
  },
  {
    title: 'Dedicated Support',
    description:
      'Reach us anytime via text, call, or in-app chat. Real humans, no bots, average response under 5 minutes.',
    icon: 'chat',
  },
];

export const ownerFeatures: OwnerFeature[] = [
  {
    title: 'Listing Setup',
    description:
      "Professional photography, compelling descriptions, and dynamic pricing strategy to maximize your property's visibility and bookings.",
    icon: 'camera',
  },
  {
    title: 'Guest Messaging',
    description:
      'We handle all guest communication — inquiries, booking confirmations, check-in instructions, and reviews — so you do not have to.',
    icon: 'chat',
  },
  {
    title: 'Cleaning & Maintenance',
    description:
      'Coordinated professional cleaning between stays and proactive maintenance checks to keep your property in peak condition.',
    icon: 'cleaning',
  },
  {
    title: 'Revenue Reporting',
    description:
      'Detailed monthly statements, occupancy analytics, and market benchmarking so you always know how your property performs.',
    icon: 'chart',
  },
];

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: 'Onboard',
    description:
      'We assess your property, discuss goals, and create a customized management plan. From photos to pricing strategy, everything is set up for you.',
  },
  {
    step: 2,
    title: 'Prepare',
    description:
      'Our team prepares your home for guests — professional staging, amenity stocking, smart lock installation, and digital guidebook creation.',
  },
  {
    step: 3,
    title: 'Launch',
    description:
      'Your property goes live across major platforms with optimized listings, dynamic pricing, and professional photography that drives bookings.',
  },
  {
    step: 4,
    title: 'Host',
    description:
      'We manage reservations, guest communication, cleaning, and maintenance 24/7. You enjoy the income without the day-to-day work.',
  },
  {
    step: 5,
    title: 'Report',
    description:
      'Monthly performance reports with revenue breakdowns, occupancy trends, guest satisfaction scores, and actionable recommendations.',
  },
];

export const galleryImages: string[] = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600566753086-00f18f6b7912?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=600&fit=crop',
];
