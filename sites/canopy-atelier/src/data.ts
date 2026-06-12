export interface LandscapeProject {
  id: string;
  title: string;
  location: string;
  year: number;
  category: string;
  image: string;
  description: string;
}

export interface OutdoorRoom {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  features: string[];
}

export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
  duration: string;
}

export const SITE = {
  name: "Canopy Atelier",
  tagline: "Landscape Architecture as Living Art",
  phone: "+1 (415) 555-0142",
  email: "studio@canopyatelier.com",
  address: "2847 Presidio Avenue, San Francisco, CA 94115",
};

export const HERO = {
  headline: "Landscapes with architecture in mind.",
  subheadline:
    "We design outdoor spaces that elevate the human experience through considered materiality, native planting, and architectural precision.",
  cta: "Request a Site Study",
  secondary: "View Selected Work",
  image:
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80",
};

export const METHOD = {
  title: "The Studio Method",
  subtitle: "A disciplined approach to landscape architecture",
  pillars: [
    {
      id: "1",
      title: "Site Intelligence",
      description:
        "Deep analysis of topography, microclimate, soil composition, and existing vegetation before a single line is drawn.",
    },
    {
      id: "2",
      title: "Spatial Choreography",
      description:
        "Movement, sightlines, and proportion orchestrated to create moments of arrival, pause, and discovery.",
    },
    {
      id: "3",
      title: "Material Dialogue",
      description:
        "Stone, timber, metal, and water in conversation—each element chosen for longevity, tactility, and resonance with place.",
    },
    {
      id: "4",
      title: "Living Systems",
      description:
        "Planting as architecture: layered canopies, seasonal succession, and ecological resilience woven into every design.",
    },
  ],
};

export const PROJECTS: LandscapeProject[] = [
  {
    id: "p1",
    title: "Stone Courtyard",
    location: "Pacific Heights, San Francisco",
    year: 2024,
    category: "Residential",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    description:
      "A multi-level terrace garden with native grasses, a reflecting pool, and bluestone paving that frames Golden Gate views.",
  },
  {
    id: "p2",
    title: "Pool Garden",
    location: "St. Helena, Napa Valley",
    year: 2023,
    category: "Estate",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
    description:
      "Vineyard-adjacent grounds with dry-stone walls, olive groves, and a formal herb garden anchored by a century-old oak.",
  },
  {
    id: "p3",
    title: "Hillside Terrace",
    location: "Mill Valley, Marin County",
    year: 2024,
    category: "Residential",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    description:
      "Mid-century home restored with a landscape that echoes its clean lines: corten steel planters, gravel courts, redwood screens.",
  },
  {
    id: "p4",
    title: "City Courtyard",
    location: "Glen Ellen, Sonoma",
    year: 2023,
    category: "Residential",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
    description:
      "A cloistered garden room with a single specimen maple, moss carpet, and a water channel that traces the roofline above.",
  },
  {
    id: "p5",
    title: "Tiburon Hillside",
    location: "Tiburon, CA",
    year: 2022,
    category: "Estate",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
    description:
      "Terraced hillside with native bunchgrass meadow, basalt steps, and a cantilevered ipe deck overlooking the bay.",
  },
  {
    id: "p6",
    title: "Carmel Coastal Retreat",
    location: "Carmel, CA",
    year: 2024,
    category: "Estate",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80",
    description:
      "Wind-sculpted Monterey cypress preserved and underplanted with coastal sage, gravel paths, and a fire pit terrace.",
  },
];

export const PLANTING = {
  title: "Planting as Architecture",
  subtitle:
    "We treat vegetation not as decoration but as structural material—canopies define ceilings, hedgerows form walls, meadows become carpets.",
  principles: [
    {
      name: "Layered Canopy",
      detail:
        "Overstory, understory, shrub, herbaceous, groundcover—five strata creating depth and ecological function.",
    },
    {
      name: "Seasonal Succession",
      detail:
        "Every month brings bloom, fruit, color, or texture. The garden is never static.",
    },
    {
      name: "Native Foundation",
      detail:
        "80% native species provide resilience, pollinator habitat, and a sense of regional identity.",
    },
    {
      name: "Specimen Placement",
      detail:
        "A single perfect tree—a Japanese maple, a live oak, a magnolia—can anchor an entire composition.",
    },
  ],
  image:
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&q=80",
};

export const OUTDOOR_ROOMS: OutdoorRoom[] = [
  {
    id: "r1",
    title: "The Arrival Court",
    subtitle: "First impressions in stone and water",
    image:
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&q=80",
    features: ["Herringbone bluestone", "Linear fountain", "Espaliered pear"],
  },
  {
    id: "r2",
    title: "The Dining Terrace",
    subtitle: "Outdoor rooms for gathering",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
    features: ["Ipe decking", "Pergola with wisteria", "Integrated lighting"],
  },
  {
    id: "r3",
    title: "The Meditation Garden",
    subtitle: "Solitude and stillness",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    features: ["Raked gravel", "Single specimen tree", "Moss and fern understory"],
  },
  {
    id: "r4",
    title: "The Kitchen Garden",
    subtitle: "Beauty that feeds",
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80",
    features: ["Raised cedar beds", "Espaliered fruit", "Cutting flower borders"],
  },
  {
    id: "r5",
    title: "The Pool Pavilion",
    subtitle: "Water as mirror and movement",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    features: ["Honed limestone deck", "Native plant filter", "Shade structure"],
  },
];

export const PROCESS: ProcessStep[] = [
  {
    id: "s1",
    number: "01",
    title: "Discovery",
    description:
      "Site visits, client interviews, aspiration mapping. We listen before we draw.",
    duration: "2–3 weeks",
  },
  {
    id: "s2",
    number: "02",
    title: "Concept Design",
    description:
      "Hand sketches, mood boards, spatial studies. One strong idea, refined.",
    duration: "3–4 weeks",
  },
  {
    id: "s3",
    number: "03",
    title: "Design Development",
    description:
      "Detailed plans, material selections, planting palettes, lighting schemes.",
    duration: "4–6 weeks",
  },
  {
    id: "s4",
    number: "04",
    title: "Documentation",
    description:
      "Construction documents, specifications, contractor coordination.",
    duration: "3–5 weeks",
  },
  {
    id: "s5",
    number: "05",
    title: "Implementation",
    description:
      "On-site observation, planting supervision, quality assurance through completion.",
    duration: "8–20 weeks",
  },
  {
    id: "s6",
    number: "06",
    title: "Stewardship",
    description:
      "Seasonal maintenance plans, pruning guidance, long-term garden evolution.",
    duration: "Ongoing",
  },
];

export const CLIENT_FIT = {
  title: "Is Canopy Atelier Right for You?",
  subtitle: "We work best with clients who value:",
  clientTypes: [
    { type: "Estate Owners", description: "Private residences with significant grounds" },
    { type: "Architects", description: "Seeking landscape partners for integrated design" },
    { type: "Developers", description: "Creating distinctive residential communities" },
    { type: "Boutique Hotels", description: "Crafting memorable guest arrival experiences" },
  ],
  traits: [
    "Design as a long-term investment, not a quick fix",
    "Collaboration—your vision, our expertise",
    "Quality materials and craftsmanship",
    "Ecological responsibility alongside beauty",
    "Patience—great landscapes mature over years",
    "A budget starting at $150,000 for design and implementation",
  ],
  notFor: [
    "Cookie-cutter solutions",
    "Rush timelines",
    "Maintenance-free expectations",
  ],
};

export const CTA = {
  title: "Begin the Conversation",
  subtitle:
    "Every great landscape starts with a conversation. Tell us about your property, your aspirations, and your timeline.",
  buttonText: "Submit Inquiry",
  email: "studio@canopyatelier.com",
  phone: "+1 (415) 555-0142",
  fields: [
    { name: "name", label: "Full Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Phone", type: "tel", required: false },
    { name: "property", label: "Property Type", type: "select", required: true, options: ["Private Residence", "Estate", "Commercial", "Hotel / Hospitality", "Other"] },
    { name: "location", label: "Property Location", type: "text", required: true },
    { name: "scope", label: "Project Scope", type: "select", required: true, options: ["New Construction", "Garden Renovation", "Addition to Existing", "Master Plan", "Consultation Only"] },
    { name: "budget", label: "Estimated Budget", type: "select", required: false, options: ["$150k–$300k", "$300k–$500k", "$500k–$1M", "$1M+", "Prefer to discuss"] },
    { name: "message", label: "Tell us about your vision", type: "textarea", required: false },
  ],
};

export const TESTIMONIALS = [
  {
    quote:
      "Canopy Atelier transformed our hillside into something that feels both ancient and entirely new. Every season reveals another layer.",
    author: "Margaret & David Chen",
    location: "Tiburon, CA",
  },
  {
    quote:
      "Their planting design is extraordinary. Three years in, the garden has a maturity that usually takes a decade.",
    author: "James Whitfield",
    location: "St. Helena, CA",
  },
  {
    quote:
      "They treated our land with reverence. The result is a landscape that feels like it has always been here.",
    author: "Sarah Okonkwo",
    location: "Mill Valley, CA",
  },
];
