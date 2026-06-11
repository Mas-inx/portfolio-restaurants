export interface SiteInfo {
  name: string;
  tagline: string;
  description: string;
  location: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  waterSave: string;
}

export interface BenefitItem {
  icon: string;
  title: string;
  description: string;
}

export interface PlantItem {
  id: string;
  name: string;
  scientific: string;
  sun: 'Full Sun' | 'Partial Shade' | 'Shade';
  droughtTolerance: 'High' | 'Medium' | 'Low';
  description: string;
  color: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  location: string;
  description: string;
  waterSaved: string;
  beforeDescription: string;
  color: string;
}

export const siteInfo: SiteInfo = {
  name: 'DesertLine',
  tagline: 'Beautiful yards that need less water',
  description:
    'We specialize in low-water landscape design for the arid Southwest. Xeriscaping, native plants, and smart irrigation systems that save thousands of gallons per year without sacrificing beauty.',
  location: 'Phoenix, Arizona',
};

export const services: ServiceItem[] = [
  {
    id: 'xeriscape',
    title: 'Xeriscape Design & Installation',
    description: 'Full-property xeriscape transformations using climate-appropriate plants, decomposed granite, and sculptural hardscape. Seven principles of xeriscaping applied to every project.',
    waterSave: '50-70%',
  },
  {
    id: 'native-planting',
    title: 'Native Plant Gardens',
    description: 'Gardens composed entirely of native species adapted to your microclimate. Lower maintenance, zero supplemental water once established, and full habitat value for pollinators.',
    waterSave: '60-80%',
  },
  {
    id: 'drip-irrigation',
    title: 'Drip Irrigation Systems',
    description: 'High-efficiency drip and micro-spray systems with weather-based controllers, soil moisture sensors, and zone-specific scheduling. We retrofit existing irrigation or install new.',
    waterSave: '30-50%',
  },
  {
    id: 'gravel-beds',
    title: 'Gravel & Decomposed Granite',
    description: 'Permeable hardscape surfaces that eliminate turf water use while creating clean, modern outdoor spaces. Multiple aggregate colors and sizes available.',
    waterSave: '100%',
  },
  {
    id: 'turf-replacement',
    title: 'Turf Replacement Programs',
    description: 'We manage the entire turf removal process — from sod cutting and disposal to soil amendment and replanting with low-water alternatives. Eligible for local rebate programs.',
    waterSave: '70-90%',
  },
  {
    id: 'seasonal-care',
    title: 'Seasonal Maintenance',
    description: 'Low-water landscape maintenance: pruning, mulch refresh, irrigation audits, and plant health monitoring. Designed for properties with xeriscape or native gardens.',
    waterSave: 'N/A',
  },
];

export const benefits: BenefitItem[] = [
  {
    icon: '\uD83D\uDCB0',
    title: 'Lower Water Bills',
    description: 'Typical clients save $400-$1,200 per year on water costs after converting to a low-water landscape. In many cases, the savings pay for the installation within 2-3 years.',
  },
  {
    icon: '\u23F3',
    title: 'Less Maintenance',
    description: 'Xeriscape gardens require 60-80% less maintenance than traditional turf lawns. No weekly mowing, no constant watering — just seasonal pruning and occasional mulch refresh.',
  },
  {
    icon: '\uD83C\uDF3F',
    title: 'Climate Resilience',
    description: 'Native and adapted plants thrive through drought, heat waves, and water restrictions. Your landscape stays vibrant even when water allocations are cut.',
  },
  {
    icon: '\uD83D\uDC1D',
    title: 'Habitat & Biodiversity',
    description: 'Native plants support local pollinators, birds, and beneficial insects. A low-water garden is a living ecosystem, not a monoculture.',
  },
];

export const plants: PlantItem[] = [
  {
    id: 'p1',
    name: 'Desert Spoon',
    scientific: 'Dasylirion wheeleri',
    sun: 'Full Sun',
    droughtTolerance: 'High',
    description: 'Sculptural yucca-like plant with long narrow leaves and a tall flower stalk. Excellent as an architectural accent in modern xeriscapes.',
    color: '#7a9a5a',
  },
  {
    id: 'p2',
    name: 'Red Yucca',
    scientific: 'Hesperaloe parviflora',
    sun: 'Full Sun',
    droughtTolerance: 'High',
    description: 'Grass-like clumps with towering coral-red flower spikes from spring through fall. Hummingbird magnet.',
    color: '#c45a3a',
  },
  {
    id: 'p3',
    name: 'Desert Marigold',
    scientific: 'Baileya multiradiata',
    sun: 'Full Sun',
    droughtTolerance: 'High',
    description: 'Cheerful yellow daisy-like flowers nearly year-round. Short-lived perennial that self-seeds readily.',
    color: '#e8b84a',
  },
  {
    id: 'p4',
    name: 'Autumn Sage',
    scientific: 'Salvia greggii',
    sun: 'Partial Shade',
    droughtTolerance: 'Medium',
    description: 'Compact shrub with red, pink, or purple blooms from spring to frost. Loved by hummingbirds and butterflies.',
    color: '#d45a5a',
  },
  {
    id: 'p5',
    name: 'Angelita Daisy',
    scientific: 'Tetraneuris acaulis',
    sun: 'Full Sun',
    droughtTolerance: 'High',
    description: 'Tiny mounding perennial with bright yellow flowers on 6-inch stems. Blooms heaviest in spring and fall.',
    color: '#f0c840',
  },
  {
    id: 'p6',
    name: 'Chocolate Flower',
    scientific: 'Berlandiera lyrata',
    sun: 'Full Sun',
    droughtTolerance: 'High',
    description: 'Fragrant yellow daisy that smells like chocolate, especially in the morning. Blooms from spring to frost.',
    color: '#c4a040',
  },
  {
    id: 'p7',
    name: 'Muhly Grass',
    scientific: 'Muhlenbergia capillaris',
    sun: 'Full Sun',
    droughtTolerance: 'Medium',
    description: 'Ornamental grass with airy pink-purple plumes in fall. Stunning when massed or used as a soft border.',
    color: '#c87a9a',
  },
  {
    id: 'p8',
    name: 'Texas Ranger',
    scientific: 'Leucophyllum frutescens',
    sun: 'Full Sun',
    droughtTolerance: 'High',
    description: 'Dense evergreen shrub with silvery leaves and purple bell-shaped flowers after summer rain or humidity.',
    color: '#9a7aba',
  },
  {
    id: 'p9',
    name: 'Desert Willow',
    scientific: 'Chilopsis linearis',
    sun: 'Full Sun',
    droughtTolerance: 'High',
    description: 'Small deciduous tree with willow-like leaves and trumpet-shaped pink flowers. Fast-growing, graceful canopy.',
    color: '#d48a7a',
  },
  {
    id: 'p10',
    name: 'Parry Penstemon',
    scientific: 'Penstemon parryi',
    sun: 'Partial Shade',
    droughtTolerance: 'Medium',
    description: 'Tall spikes of bright pink trumpet flowers in early spring. Excellent for naturalistic desert gardens.',
    color: '#e07a8a',
  },
  {
    id: 'p11',
    name: 'Globe Mallow',
    scientific: 'Sphaeralcea ambigua',
    sun: 'Full Sun',
    droughtTolerance: 'High',
    description: 'Upright perennial with orange-coral flowers that bloom for months. Tough, reliable, and deer-resistant.',
    color: '#e08a4a',
  },
  {
    id: 'p12',
    name: 'Brittlebush',
    scientific: 'Encelia farinosa',
    sun: 'Full Sun',
    droughtTolerance: 'High',
    description: 'Gray-green shrub with bright yellow daisy flowers in spring. A classic Sonoran Desert native.',
    color: '#c4a040',
  },
];

export const caseStudies: CaseStudy[] = [
  {
    id: 'cs1',
    title: 'Tulip Street Residence',
    location: 'Paradise Valley, AZ',
    description: 'A 1/2 acre turf lawn replaced with a sculptural xeriscape of decomposed granite, desert spoon, and red yucca. Drip irrigation installed on all planting beds.',
    waterSaved: '85,000 gallons/year',
    beforeDescription: 'Standard Kentucky bluegrass lawn, pop-up spray irrigation, 4x/week watering schedule.',
    color: '#7a8a5a',
  },
  {
    id: 'cs2',
    title: 'Mountain View Community Center',
    location: 'Scottsdale, AZ',
    description: 'A 2-acre commercial property converted to native planting with rain gardens and infiltration basins. Eliminated all potable water use for irrigation.',
    waterSaved: '320,000 gallons/year',
    beforeDescription: 'Ornamental turf, mixed shrubs on spray irrigation, high water usage.',
    color: '#8a7a5a',
  },
  {
    id: 'cs3',
    title: 'Sunrise HOA Entryway',
    location: 'Chandler, AZ',
    description: 'Association entry monument and common areas transitioned from thirsty annuals and turf to low-water perennials, gravel beds, and automated drip zones.',
    waterSaved: '145,000 gallons/year',
    beforeDescription: 'Annual flower beds with spray irrigation, 2000 sq ft of ornamental turf.',
    color: '#5a8a7a',
  },
];

export const navLinks = [
  { label: 'Why Low-Water', href: '#benefits' },
  { label: 'Services', href: '#services' },
  { label: 'Savings Calculator', href: '#calculator' },
  { label: 'Plant Library', href: '#plants' },
  { label: 'Case Studies', href: '#cases' },
  { label: 'Contact', href: '#contact' },
];

export const contactInfo = {
  phone: '(602) 555-0378',
  email: 'hello@desertline.landscape',
  address: '420 East McDowell Rd, Phoenix, AZ 85004',
};
