export interface SiteInfo {
  name: string;
  tagline: string;
  description: string;
  location: string;
}

export interface IndustryItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  properties: number;
}

export interface ProgramItem {
  id: string;
  title: string;
  description: string;
  frequency: string;
  icon: string;
}

export interface DashboardMetric {
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
}

export interface QualityItem {
  icon: string;
  title: string;
  description: string;
}

export interface ContractStep {
  step: number;
  title: string;
  description: string;
}

export const siteInfo: SiteInfo = {
  name: 'Greenline Commercial',
  tagline: 'Commercial grounds maintained without surprises',
  description:
    'Full-service commercial landscape maintenance for properties that demand consistency, accountability, and professional results. We handle the grounds so you can focus on operations.',
  location: 'Denver, Colorado',
};

export const industries: IndustryItem[] = [
  {
    id: 'hoa',
    title: 'Homeowner Associations',
    description: 'Common area maintenance, entry monuments, amenity landscapes, and seasonal color programs for HOAs and condominium communities.',
    icon: '\uD83C\uDFE0',
    properties: 45,
  },
  {
    id: 'retail',
    title: 'Retail & Shopping Centers',
    description: 'Strip mall landscaping, parking lot islands, pedestrian walkways, and storefront plantings that stay pristine year-round.',
    icon: '\uD83D\uDED2',
    properties: 28,
  },
  {
    id: 'offices',
    title: 'Office Parks & Campuses',
    description: 'Corporate campus grounds, entry gardens, courtyard maintenance, and irrigation management for professional office environments.',
    icon: '\uD83C\uDFE2',
    properties: 34,
  },
  {
    id: 'schools',
    title: 'Schools & Universities',
    description: 'K-12 and university campus landscape maintenance with safety-first protocols and minimal disruption during school hours.',
    icon: '\uD83C\uDFEB',
    properties: 19,
  },
  {
    id: 'warehouses',
    title: 'Industrial Parks & Warehouses',
    description: 'Large-scale mowing, weed control, snow removal, and erosion management for industrial and logistics properties.',
    icon: '\uD83C\uDFED',
    properties: 22,
  },
  {
    id: 'apartments',
    title: 'Multifamily Apartments',
    description: 'Courtyards, pool areas, dog runs, and building perimeter landscapes for apartment communities up to 500+ units.',
    icon: '\uD83C\uDFE1',
    properties: 37,
  },
];

export const programs: ProgramItem[] = [
  {
    id: 'mowing',
    title: 'Weekly Mowing & Edging',
    description: 'Precision mowing with zero-turn and walk-behind mowers. String trimming, edging, and blowing on every visit. Seasonal height adjustments.',
    frequency: 'Weekly',
    icon: '\uD83C\uDF3F',
  },
  {
    id: 'irrigation',
    title: 'Irrigation System Checks',
    description: 'Weekly system inspections, head adjustments, pressure regulation, and weather-based controller programming to prevent waste.',
    frequency: 'Weekly / Biweekly',
    icon: '\uD83D\uDCA7',
  },
  {
    id: 'color',
    title: 'Seasonal Color Rotation',
    description: 'Three-season annual color installations with design, procurement, planting, and removal of spent plants.',
    frequency: 'Quarterly',
    icon: '\uD83C\uDF38',
  },
  {
    id: 'storm',
    title: 'Storm Cleanup & Debris',
    description: 'Emergency response for storm damage including downed branches, leaf cleanup, silt removal, and hazard mitigation.',
    frequency: 'As Needed',
    icon: '\u26A1',
  },
  {
    id: 'trees',
    title: 'Tree & Shrub Care',
    description: 'Pruning, fertilization, pest management, and health monitoring for ornamental trees and shrubs across your property.',
    frequency: 'Monthly / Quarterly',
    icon: '\uD83C\uDF33',
  },
  {
    id: 'snow',
    title: 'Snow & Ice Management',
    description: 'Pre-treatment, plowing, shoveling, and de-icing for parking lots, walkways, and entry zones. 24/7 dispatch during snow events.',
    frequency: 'Seasonal (Winter)',
    icon: '\u2744\uFE0F',
  },
];

export const dashboardMetrics: DashboardMetric[] = [
  { label: 'Properties Maintained', value: 185, suffix: '+' },
  { label: 'Crews in the Field', value: 24, suffix: '' },
  { label: 'Avg Response Time', value: 4, suffix: ' hrs', prefix: '<' },
  { label: 'Years in Operation', value: 14, suffix: '' },
  { label: 'Client Retention Rate', value: 94, suffix: '%' },
  { label: 'Inspections Completed', value: 4200, suffix: '+' },
];

export const qualityItems: QualityItem[] = [
  {
    icon: '\uD83D\uDCCB',
    title: 'Site Inspection Reports',
    description: 'Every property receives a detailed inspection report after each visit, documenting completed work, observed issues, and recommendations.',
  },
  {
    icon: '\uD83D\uDCF7',
    title: 'Photo Documentation',
    description: 'Time-stamped, geo-tagged photos of every property on every visit. Access your property dashboard anytime to review the latest documentation.',
  },
  {
    icon: '\uD83D\uDC64',
    title: 'Dedicated Account Manager',
    description: 'Each property is assigned a single point of contact who knows your property, your preferences, and your contract inside and out.',
  },
  {
    icon: '\uD83D\uDCCA',
    title: 'Monthly Performance Reports',
    description: 'Monthly summaries with completed tasks, photos, upcoming work, budget tracking, and recommendations for the next period.',
  },
];

export const emergencyServices = [
  'Storm damage cleanup within 24 hours',
  'Irrigation leak detection and repair',
  'Tree hazard assessment and removal',
  'Flooding and drainage emergency response',
  'Vandalism repair and restoration',
  'Fire damage landscape recovery',
];

export const contractSteps: ContractStep[] = [
  {
    step: 1,
    title: 'Site Walk & Assessment',
    description: 'We walk your property with your facilities manager, photograph existing conditions, inventory plant material, and map irrigation zones.',
  },
  {
    step: 2,
    title: 'Scope & Service Plan',
    description: 'A detailed scope of work with visit frequency, task lists, seasonal adjustments, and performance standards tailored to your property.',
  },
  {
    step: 3,
    title: 'Schedule & Onboarding',
    description: 'We set your service schedule, introduce your account manager and crew lead, and begin regular service within two weeks of signing.',
  },
  {
    step: 4,
    title: 'Monthly Reporting & Review',
    description: 'Monthly performance reports, quarterly property reviews, and an annual renewal discussion with recommendations for the coming year.',
  },
];

export const navLinks = [
  { label: 'Industries', href: '#industries' },
  { label: 'Programs', href: '#programs' },
  { label: 'Operations', href: '#operations' },
  { label: 'Quality', href: '#quality' },
  { label: 'Process', href: '#process' },
  { label: 'Get a Quote', href: '#quote' },
];

export const contactInfo = {
  phone: '(303) 555-0620',
  email: 'ops@greenlinecommercial.com',
  address: '1550 Wewatta St, Denver, CO 80202',
};
