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
  icon: string;
  highlight: string;
}

export interface TransformationItem {
  id: string;
  title: string;
  description: string;
  color: string;
}

export interface MaterialItem {
  id: string;
  name: string;
  description: string;
  texture: string;
  bestFor: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface BudgetGuide {
  id: string;
  label: string;
  range: string;
  includes: string[];
  popular: boolean;
}

export interface TrustItem {
  icon: string;
  title: string;
  description: string;
}

export const siteInfo: SiteInfo = {
  name: 'Stone & Bloom',
  tagline: 'Build the backyard you actually use',
  description:
    'We design and build outdoor living spaces that extend your home square footage into the open air. Patios, pergolas, fire pits, outdoor kitchens — spaces engineered for gathering, cooking, and relaxing.',
  location: 'Austin, Texas',
};

export const services: ServiceItem[] = [
  {
    id: 'patios',
    title: 'Custom Patios',
    description: 'Poured concrete, flagstone, travertine, or paver patios tailored to your architecture and site grade. We handle drainage and base prep with engineering precision.',
    icon: '\u25A3',
    highlight: '30+ patterns available',
  },
  {
    id: 'fire-pits',
    title: 'Fire Pits & Fireplaces',
    description: 'Gas or wood-burning fire features built with refractory materials, custom stone surrounds, and integrated seating. From simple bowls to full outdoor hearths.',
    icon: '\u25B3',
    highlight: 'Gas line included',
  },
  {
    id: 'pergolas',
    title: 'Pergolas & Covers',
    description: 'Freestanding or attached structures in cedar, steel, or aluminum. Adjustable louver roofs, retractable shades, and integrated lighting available.',
    icon: '\u25A8',
    highlight: 'Motorized options',
  },
  {
    id: 'walls',
    title: 'Retaining Walls',
    description: 'Engineered segmental retaining walls, stone veneer, and natural boulder walls. Built to manage grade changes with drainage and geogrid reinforcement.',
    icon: '\u25AD',
    highlight: 'Up to 8 ft height',
  },
  {
    id: 'kitchens',
    title: 'Outdoor Kitchens',
    description: 'Full outdoor cooking centers with built-in grills, refrigerators, sinks, storage, and countertops in granite, soapstone, or poured concrete.',
    icon: '\u2600',
    highlight: 'Built-in appliances',
  },
  {
    id: 'walkways',
    title: 'Walkways & Pathways',
    description: 'Stepping stone, flagstone, brick, or decomposed granite paths that connect your outdoor rooms. Lit options available.',
    icon: '\u2194',
    highlight: 'LED step lighting',
  },
];

export const transformationItems: TransformationItem[] = [
  {
    id: 't1',
    title: 'Sloped Yard to Terraced Patio',
    description: 'A steep backyard slope transformed into three-tiered paver patio with a gas fire pit and built-in bench seating. Retaining walls doubled as garden planters.',
    color: '#8b5e3c',
  },
  {
    id: 't2',
    title: 'Empty Corner to Outdoor Kitchen',
    description: 'An unused side yard became a fully equipped outdoor kitchen with a 36" grill, sink, mini-fridge, and a cedar pergola over a stained concrete floor.',
    color: '#6b4e3a',
  },
  {
    id: 't3',
    title: 'Plain Lawn to Entertainment Hub',
    description: 'A flat turf lawn replaced with a flagstone patio, sunken fire pit seating, a gravel pathway, and perimeter landscape lighting for evening use.',
    color: '#5a6b4a',
  },
  {
    id: 't4',
    title: 'Cracked Concrete to Paver Paradise',
    description: 'A deteriorated concrete patio demolished and replaced with herringbone-laid travertine pavers, a copper fire bowl, and an integrated sound system.',
    color: '#7a6b4e',
  },
  {
    id: 't5',
    title: 'Basic Backyard to Resort Retreat',
    description: 'Complete backyard overhaul with a freeform pool, travertine deck, outdoor kitchen, and a louvered aluminum pergola covering the dining area.',
    color: '#4a6b7a',
  },
];

export const materials: MaterialItem[] = [
  {
    id: 'pavers',
    name: 'Concrete Pavers',
    description: 'High-strength interlocking pavers in cobblestone, brick, and wood-plank patterns. Permeable options available.',
    texture: 'Smooth / Textured',
    bestFor: 'Patios, walkways, driveways',
  },
  {
    id: 'flagstone',
    name: 'Flagstone',
    description: 'Natural cleft stone — bluestone, sandstone, or quartzite — cut into irregular or rectangular pieces for a timeless look.',
    texture: 'Natural cleft / Thermal',
    bestFor: 'Patios, pathways, pool coping',
  },
  {
    id: 'timber',
    name: 'Cedar & Hardwood',
    description: 'Western red cedar, ipe, or mahogany for pergolas, decking, and custom seating. Naturally rot-resistant.',
    texture: 'Sawn / Smooth',
    bestFor: 'Pergolas, decks, planters',
  },
  {
    id: 'steel',
    name: 'Steel & Aluminum',
    description: 'Powder-coated steel and aluminum for pergola structures, fire pit rings, and modern retaining wall caps. Minimal maintenance.',
    texture: 'Smooth powder coat',
    bestFor: 'Pergolas, fire features, modern walls',
  },
  {
    id: 'concrete',
    name: 'Cast-in-Place Concrete',
    description: 'Stained, stamped, or polished concrete for modern patios and walkways. Unlimited color and pattern possibilities.',
    texture: 'Stamped / Smooth / Exposed',
    bestFor: 'Modern patios, driveways',
  },
  {
    id: 'lighting',
    name: 'Landscape Lighting',
    description: 'Low-voltage LED fixtures in brass, copper, or black aluminum for path, accent, and ambient illumination.',
    texture: 'Brass / Copper / Aluminum',
    bestFor: 'Pathways, trees, walls, steps',
  },
];

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: 'Measure & Site Assessment',
    description: 'We laser-measure your space, check drainage, identify underground utilities, and photograph every angle. This becomes the foundation of your design.',
  },
  {
    step: 2,
    title: '3D Design & Material Selection',
    description: 'We produce a 3D model of your project with exact dimensions, material options, and color renderings. You see it before we build it.',
  },
  {
    step: 3,
    title: 'Detailed Quote & Timeline',
    description: 'A fixed-price quote with line-item breakdown. No change orders without your approval. Timeline with weekly milestones.',
  },
  {
    step: 4,
    title: 'Permits & Prep',
    description: 'We handle all permits, HOA approvals, and site preparation. Grading, excavation, and base compaction completed before material delivery.',
  },
  {
    step: 5,
    title: 'Build & Walk-Through',
    description: 'Construction led by a project foreman. Daily progress photos. Final walk-through with care instructions and warranty paperwork.',
  },
];

export const budgetGuides: BudgetGuide[] = [
  {
    id: 'small',
    label: 'Small Project',
    range: '$3K - $12K',
    includes: ['Paver patio up to 300 sq ft', 'Fire pit bowl', 'Basic pergola kit', 'Gravel pathway'],
    popular: false,
  },
  {
    id: 'medium',
    label: 'Mid-Size Project',
    range: '$12K - $35K',
    includes: ['Custom patio 400-800 sq ft', 'Outdoor kitchen base', 'Custom pergola', 'Retaining wall under 3 ft'],
    popular: true,
  },
  {
    id: 'large',
    label: 'Large Project',
    range: '$35K - $100K+',
    includes: ['Full property design/build', 'Outdoor kitchen + appliances', 'Pool deck / hardscape', 'Multi-level retaining walls'],
    popular: false,
  },
];

export const trustItems: TrustItem[] = [
  {
    icon: '\uD83D\uDEE1\uFE0F',
    title: '5-Year Workmanship Warranty',
    description: 'Every project we build is backed by our 5-year warranty against settling, cracking, and material defects.',
  },
  {
    icon: '\uD83D\uDCCB',
    title: 'Fully Licensed & Insured',
    description: 'We carry general liability, workers compensation, and builder\'s risk insurance. Proof available on request.',
  },
  {
    icon: '\u23F0',
    title: 'On-Time Completion',
    description: '90% of our projects finish on or before the agreed timeline. We schedule buffer days for weather.',
  },
  {
    icon: '\uD83D\uDCF8',
    title: 'Daily Photo Updates',
    description: 'Your project dashboard receives daily photos and a brief progress note so you never wonder what is happening.',
  },
];

export const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Transformations', href: '#transformations' },
  { label: 'Materials', href: '#materials' },
  { label: 'Process', href: '#process' },
  { label: 'Budget', href: '#budget' },
  { label: 'Contact', href: '#contact' },
];

export const contactInfo = {
  phone: '(512) 555-0412',
  email: 'build@stoneandbloom.com',
  address: '1200 Barton Springs Rd, Austin, TX 78704',
};
