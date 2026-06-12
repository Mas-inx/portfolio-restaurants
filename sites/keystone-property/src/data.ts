export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface FeaturedProperty {
  id: string;
  title: string;
  type: string;
  address: string;
  size: string;
  capRate: string;
  zoning: string;
  image: string;
  highlights: string[];
}

export interface MarketInsight {
  metric: string;
  value: string;
  change: string;
  positive: boolean;
  description: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface Sector {
  name: string;
  description: string;
  examples: string[];
}

export interface Advisor {
  name: string;
  role: string;
  image: string;
  experience: string;
  specialties: string[];
  phone: string;
  email: string;
}

export const siteInfo = {
  name: 'Keystone Property Group',
  tagline: 'Commercial Real Estate Decisions Backed by Market Clarity',
  description:
    'With decades of combined experience across all commercial asset classes, we provide institutional-grade market intelligence that empowers confident decision-making.',
  address: '200 Park Avenue, Suite 1500, New York, NY 10166',
  phone: '(212) 555-8900',
  email: 'info@keystonepropertygroup.com',
};

export const services: Service[] = [
  {
    title: 'Leasing',
    description:
      'Full-service leasing representation for tenants and landlords across all commercial asset classes. We structure terms that align with your operational goals.',
    icon: 'clipboard',
  },
  {
    title: 'Sales',
    description:
      'Investment sales advisory for office, retail, industrial, and mixed-use assets. Our data-driven approach ensures optimal pricing and market positioning.',
    icon: 'chart-up',
  },
  {
    title: 'Tenant Representation',
    description:
      'Strategic tenant advisory from site selection through lease negotiation. We reduce occupancy costs while improving space quality and flexibility.',
    icon: 'shield',
  },
  {
    title: 'Landlord Representation',
    description:
      'Maximize asset value through targeted marketing, qualified tenant screening, and lease terms that protect long-term property performance.',
    icon: 'building',
  },
  {
    title: 'Investment Advisory',
    description:
      'Acquisition and disposition advisory with rigorous financial modeling, market benchmarking, and risk assessment for institutional and private capital.',
    icon: 'money',
  },
  {
    title: 'Land Advisory',
    description:
      'Development site acquisition, zoning analysis, entitlements, and disposition for residential, commercial, and mixed-use development projects.',
    icon: 'map',
  },
];

export const featuredProperties: FeaturedProperty[] = [
  {
    id: 'prop-1',
    title: 'One Madison Tower',
    type: 'Office',
    address: '1 Madison Avenue, New York, NY 10010',
    size: '485,000 SF',
    capRate: '5.8%',
    zoning: 'C5-5',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
    highlights: [
      'LEED Platinum certified',
      'Full-floor availabilities from 25,000 SF',
      '15-year lease terms available',
    ],
  },
  {
    id: 'prop-2',
    title: 'The Shops at Bryant Park',
    type: 'Retail',
    address: '42 West 40th Street, New York, NY 10018',
    size: '124,000 SF',
    capRate: '6.2%',
    zoning: 'C6-4',
    image:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
    highlights: [
      'Street-level with 200 ft frontage',
      'Adjacent to Bryant Park',
      'Mixed retail and dining concepts',
    ],
  },
  {
    id: 'prop-3',
    title: 'Crossroads Industrial Park',
    type: 'Industrial',
    address: '100 Logistics Drive, Newark, NJ 07114',
    size: '720,000 SF',
    capRate: '7.1%',
    zoning: 'I-3',
    image:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
    highlights: [
      '36 ft clear height',
      '48 dock doors',
      '5 minutes to Newark Airport',
    ],
  },
];

export const marketInsights: MarketInsight[] = [
  {
    metric: 'Office Vacancy Rate',
    value: '12.4%',
    change: '-0.8%',
    positive: true,
    description:
      'Class A vacancy tightening as flight-to-quality accelerates in prime submarkets',
  },
  {
    metric: 'Office Demand (Net Absorption)',
    value: '+2.1M SF',
    change: '+35%',
    positive: true,
    description:
      'Year-over-year increase driven by financial and legal sector growth',
  },
  {
    metric: 'Retail Rent Trends',
    value: '$325/SF',
    change: '+4.2%',
    positive: true,
    description:
      'Prime corridor rents rising as experiential retail drives foot traffic recovery',
  },
  {
    metric: 'Industrial Construction',
    value: '8.9M SF',
    change: '-12%',
    positive: false,
    description:
      'New supply pipeline slowing, supporting rent growth in existing inventory',
  },
];

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: 'Requirement Analysis',
    description:
      'We conduct a deep-dive into your operational needs, financial parameters, and strategic objectives to define the ideal property profile.',
  },
  {
    step: 2,
    title: 'Market Scan',
    description:
      'Our research team screens the market against 40+ data points — vacancy, demographics, rent comparables, zoning, and ownership history.',
  },
  {
    step: 3,
    title: 'Shortlist & Tour',
    description:
      'We present a curated shortlist of top opportunities and coordinate property tours with ownership for direct market feedback.',
  },
  {
    step: 4,
    title: 'Negotiation',
    description:
      'Our principals lead negotiations backed by real-time market comparables, financial modeling, and strategic term structuring.',
  },
  {
    step: 5,
    title: 'Close & Transition',
    description:
      'From LOI through closing, we manage due diligence, legal coordination, and post-transaction support for a seamless transition.',
  },
];

export const sectors: Sector[] = [
  {
    name: 'Office',
    description:
      'Class A and creative office spaces in prime urban and suburban markets.',
    examples: ['Midtown & Downtown CBDs', 'Suburban Campuses', 'Creative / Tech Office'],
  },
  {
    name: 'Retail',
    description:
      'Street-level, shopping center, and experiential retail positioning.',
    examples: ['Prime Corridors', 'Lifestyle Centers', 'Mixed-Use Retail'],
  },
  {
    name: 'Industrial',
    description:
      'Logistics, warehousing, and light industrial across gateway markets.',
    examples: ['Distribution Warehouses', 'Last-Mile Logistics', 'Light Manufacturing'],
  },
  {
    name: 'Medical',
    description:
      'Medical office buildings, ambulatory care centers, and healthcare facilities.',
    examples: ['MOB Portfolios', 'Ambulatory Care', 'Surgical Centers'],
  },
  {
    name: 'Land',
    description:
      'Development sites and land parcels for ground-up commercial and mixed-use projects.',
    examples: ['Development Sites', 'Entitled Parcels', 'Air Rights'],
  },
];

export const team: Advisor[] = [
  {
    name: 'James Whitfield',
    role: 'Managing Principal',
    image:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
    experience: '25+ years in NYC commercial real estate',
    specialties: ['Office Leasing', 'Investment Sales', 'Portfolio Strategy'],
    phone: '(212) 555-8901',
    email: 'jwhitfield@keystonepropertygroup.com',
  },
  {
    name: 'Sarah Chen',
    role: 'Principal, Retail Advisory',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    experience: '18+ years specializing in retail real estate',
    specialties: ['Retail Leasing', 'Tenant Representation', 'Mixed-Use Development'],
    phone: '(212) 555-8902',
    email: 'schen@keystonepropertygroup.com',
  },
  {
    name: 'Michael Ortiz',
    role: 'Principal, Industrial & Logistics',
    image:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
    experience: '20+ years in industrial and logistics real estate',
    specialties: ['Industrial Leasing', 'Supply Chain Advisory', 'Site Selection'],
    phone: '(212) 555-8903',
    email: 'mortiz@keystonepropertygroup.com',
  },
  {
    name: 'Elena Vasquez',
    role: 'Director of Research',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
    experience: '12+ years in commercial real estate analytics',
    specialties: ['Market Research', 'Financial Modeling', 'Data Analytics'],
    phone: '(212) 555-8904',
    email: 'evasquez@keystonepropertygroup.com',
  },
];
