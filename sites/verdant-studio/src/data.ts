export interface SiteInfo {
  name: string;
  tagline: string;
  description: string;
  location: string;
  founded: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  duration: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  accentColor: string;
}

export interface PalettePlant {
  name: string;
  scientific: string;
  category: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  location: string;
}

export const siteInfo: SiteInfo = {
  name: 'Verdant Studio',
  tagline: 'Outdoor spaces composed with restraint',
  description:
    'An atelier of landscape architects devoted to sculpting land into living art. We work exclusively on estate-scale properties where every plant, stone, and shadow is deliberate.',
  location: 'Santa Barbara, California',
  founded: 2011,
};

export const services: ServiceItem[] = [
  {
    id: 'design',
    title: 'Landscape Design',
    description:
      'Full-property master plans that orchestrate topography, circulation, views, and microclimate into a unified spatial experience. Every line drawn is a decision about how a space will feel at dawn, midday, and dusk.',
    icon: 'pencil',
  },
  {
    id: 'courtyard',
    title: 'Courtyard & Garden Rooms',
    description:
      'Intimate outdoor enclosures designed as extensions of the interior — rooms without ceilings where hedges become walls, gravel becomes carpet, and the sky is the ceiling finish.',
    icon: 'grid',
  },
  {
    id: 'poolside',
    title: 'Poolside & Water Features',
    description:
      'Reflecting pools, vanishing edges, spires, and naturalistic water gardens. We treat water as a sculptural medium — its sound, movement, and light refraction considered with the same rigor as any structural element.',
    icon: 'droplet',
  },
  {
    id: 'lighting',
    title: 'Outdoor Lighting',
    description:
      'A nocturnal layer of architecture. Moonlighting via canopy silhouettes, path illumination that reads as natural glow, and accent fixtures that reveal texture without announcing themselves.',
    icon: 'sun',
  },
  {
    id: 'irrigation',
    title: 'Precision Irrigation',
    description:
      'Subsurface drip networks and weather-responsive controllers engineered for zero waste. Every hydrozone calibrated to the specific water needs of each plant community.',
    icon: 'water',
  },
  {
    id: 'maintenance',
    title: 'Estate Care Planning',
    description:
      'Long-term horticultural stewardship. Seasonal pruning calendars, soil regeneration schedules, and replacement planning that keeps the original design intent intact for decades.',
    icon: 'leaf',
  },
];

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: 'Site Visit & Analysis',
    description:
      'We walk the property at three different times of day. We map solar exposure, drainage patterns, wind corridors, existing mature trees, and the views you want to keep or conceal. Soil is tested on-site and sent for lab analysis.',
    duration: '1–2 days',
  },
  {
    step: 2,
    title: 'Concept & Narrative',
    description:
      'From the site analysis emerges a spatial narrative. We present hand-drawn sketches, reference boards, and a written ethos for the landscape — not renderings yet, but the ideas that will guide every decision that follows.',
    duration: '2–3 weeks',
  },
  {
    step: 3,
    title: 'Planting Palette',
    description:
      'We select every plant for its form, seasonal interest, root behavior, and water needs. Not as decoration but as architecture — defining spaces, framing views, and creating rhythm across the seasons.',
    duration: '1 week',
  },
  {
    step: 4,
    title: 'Execution & Installation',
    description:
      'Our installation crews are led by the designer who drew the plan. Grading, drainage, hardscape, planting, irrigation, and lighting are sequenced so that each trade leaves the site better than they found it.',
    duration: '4–12 weeks',
  },
  {
    step: 5,
    title: 'Care Plan & Stewardship',
    description:
      'A living document — monthly tasks, seasonal adjustments, and a five-year outlook. We train your estate team or remain involved ourselves. The landscape is never finished, only cared for.',
    duration: 'Ongoing',
  },
];

export const projects: ProjectItem[] = [
  {
    id: 'casa-cerro',
    title: 'Casa Cerro',
    category: 'Estate Master Plan',
    location: 'Montecito, CA',
    description:
      'A five-acre hillside property where the landscape descends in terraced garden rooms. Native oaks preserved as anchors; a reflecting pool that mirrors the Pacific at sunset.',
    accentColor: '#2d5a3d',
  },
  {
    id: 'bluff-house',
    title: 'Bluff House',
    category: 'Coastal Garden',
    location: 'Hope Ranch, CA',
    description:
      'Wind-pruned hedges and sculptural agaves on a bluff-top property. The planting palette was chosen entirely from species that thrive in salt spray and maritime fog.',
    accentColor: '#4a7c59',
  },
  {
    id: 'rancho-vista',
    title: 'Rancho Vista',
    category: 'Courtyard & Pool',
    location: 'Santa Ynez, CA',
    description:
      'A hacienda-style compound with seven interconnected courtyards. Each room has a distinct microclimate — one for morning light, one for stargazing, one for dining under oaks.',
    accentColor: '#8b5e3c',
  },
  {
    id: 'olive-grove',
    title: 'Olive Grove Residence',
    category: 'Mediterranean Estate',
    location: 'Summerland, CA',
    description:
      'A restored olive grove interwoven with gravel paths, stone terraces, and a outdoor kitchen perched among century-old trees. Drip irrigation hidden beneath decomposed granite.',
    accentColor: '#6b8e4e',
  },
  {
    id: 'cliffside',
    title: 'Cliffside Pavilion',
    category: 'Water Feature',
    location: 'Santa Barbara, CA',
    description:
      'A vanishing-edge pool that appears to merge with the ocean beyond. The surrounding plantings — lavender, sage, manzanita — are selected for fragrance, texture, and drought tolerance.',
    accentColor: '#3b6973',
  },
  {
    id: 'meadow-hill',
    title: 'Meadow Hill',
    category: 'Native Restoration',
    location: 'Goleta, CA',
    description:
      'A former turf lawn transformed into a meadow of native grasses and wildflowers. Swales and rain gardens manage stormwater while creating habitat corridors for pollinators.',
    accentColor: '#7a9b5a',
  },
];

export const palettePlants: PalettePlant[] = [
  {
    name: 'Coast Live Oak',
    scientific: 'Quercus agrifolia',
    category: 'Drought-Tolerant',
    description: 'Iconic California native evergreen. Deep root systems, sculptural branching, provides dappled shade.',
  },
  {
    name: 'Deer Grass',
    scientific: 'Muhlenbergia rigens',
    category: 'Drought-Tolerant',
    description: 'Clumping native grass with fountain-like seed heads. Excellent for massing or as textural accent.',
  },
  {
    name: 'Japanese Maple',
    scientific: 'Acer palmatum',
    category: 'Shade Garden',
    description: 'Laceleaf varieties for filtered-light gardens. Brilliant seasonal color transformation.',
  },
  {
    name: 'Camellia',
    scientific: 'Camellia japonica',
    category: 'Privacy & Screening',
    description: 'Glossy evergreen hedging with winter blooms. Ideal for formal garden room walls.',
  },
  {
    name: 'Matilija Poppy',
    scientific: 'Romneya coulteri',
    category: 'Seasonal Color',
    description: 'Dramatic white flowers with yellow centers, blooming late spring through summer.',
  },
  {
    name: 'Manzanita',
    scientific: 'Arctostaphylos',
    category: 'Drought-Tolerant',
    description: 'Sculptural red-barked shrub. Winter blooms, year-round architectural interest.',
  },
  {
    name: 'California Lilac',
    scientific: 'Ceanothus',
    category: 'Seasonal Color',
    description: 'Profuse blue blossoms in spring. Fast-growing, deer-resistant, drought-tolerant once established.',
  },
  {
    name: 'Fern',
    scientific: 'Dryopteris / Polystichum',
    category: 'Shade Garden',
    description: 'Woodwardia and sword ferns for lush understory texture in shaded courtyard gardens.',
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      'Verdant Studio did not design a garden for our home — they composed a sequence of experiences. Every turn reveals something new, and yet the whole feels inevitable, as if the land always meant to be this way.',
    name: 'Eleanor Whitfield',
    location: 'Montecito Estate',
  },
  {
    quote:
      'The precision of their planting plans is extraordinary. Three years in, the landscape has filled in exactly as they predicted. Our maintenance team follows their care guide like a score.',
    name: 'James Covington',
    location: 'Hope Ranch Residence',
  },
  {
    quote:
      'We interviewed five firms. Only Verdant Studio walked the property at dusk, sat in silence for ten minutes, and then described the place back to us in a way we had never seen. That was the moment we knew.',
    name: 'Sarah & David Tran',
    location: 'Santa Ynez Compound',
  },
];

export const navLinks = [
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Process', href: '#process' },
  { label: 'Plants', href: '#plants' },
  { label: 'Contact', href: '#contact' },
];

export const contactInfo = {
  email: 'studio@verdant-landscape.com',
  phone: '(805) 555-0184',
  address: '123 Garden Street, Santa Barbara, CA 93101',
  social: {
    instagram: '@verdant_studio',
    pinterest: 'VerdantStudio',
  },
};
