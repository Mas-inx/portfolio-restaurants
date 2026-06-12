export interface RenovationType {
  title: string
  description: string
  icon: string
  image: string
}

export interface BeforeAfter {
  title: string
  before: string
  after: string
  description: string
}

export interface MaterialCategory {
  title: string
  items: string[]
  icon: string
}

export interface TimelineStep {
  phase: string
  title: string
  description: string
  duration: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface Testimonial {
  name: string
  role: string
  text: string
}

export const siteInfo = {
  name: 'Haven Renovations',
  tagline: 'Renovations that feel considered, not rushed',
  shortTagline: 'Design-Led Home Remodeling',
  phone: '(312) 555-0247',
  email: 'studio@havenrenovations.com',
  address: '842 W Armitage Ave, Chicago, IL 60614',
  founded: 2014,
  license: 'IL-RC-31280',
  projectsCompleted: 180,
  yearsExperience: 11,
}

export const renovationTypes: RenovationType[] = [
  {
    title: 'Kitchen Renovations',
    description:
      'Full kitchen remodels from studs to finishes. Custom cabinetry, stone countertops, island layouts, and appliance integration designed for how you actually cook.',
    icon: 'utensils',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
  },
  {
    title: 'Bathroom Renovations',
    description:
      'Spa-quality primary baths, powder rooms, and guest bathrooms. Heated floors, custom tile work, floating vanities, and rain showers that turn a utility room into a retreat.',
    icon: 'bath',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
  },
  {
    title: 'Basement Finishing',
    description:
      'Transform below-grade space into livable square footage. Home theaters, wine cellars, guest suites, home gyms with proper moisture control and egress compliance.',
    icon: 'down',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
  },
  {
    title: 'Full-Home Renovations',
    description:
      'Whole-house transformations that rework floor plans, update all systems, and unify the design language across every room.',
    icon: 'home',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  },
  {
    title: 'Home Additions',
    description:
      'Second-story additions, rear bump-outs, dormer expansions, and in-law suites designed to match existing architecture while adding meaningful square footage.',
    icon: 'plus',
    image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80',
  },
  {
    title: 'Room Transformations',
    description:
      'Single-room makeovers: living rooms, dining rooms, home offices, and mudrooms. Focused scope with high-design finishes and faster turnaround.',
    icon: 'sofa',
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80',
  },
]

export const beforeAfters: BeforeAfter[] = [
  {
    title: 'Lincoln Park Kitchen',
    before: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    description:
      'Outdated 1990s kitchen with laminate counters and dark cabinets opened into an airy chefs kitchen with marble waterfall island, custom white oak cabinetry, and matte black fixtures.',
  },
  {
    title: 'Wicker Park Primary Bath',
    before: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
    description:
      'A cramped 5x7 bathroom expanded into a spa-like primary bath with freestanding tub, curbless shower with floor-to-ceiling zellige tile, and dual floating vanity.',
  },
  {
    title: 'Evanston Full Home',
    before: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    description:
      'A 1920s colonial with chopped-up rooms and outdated systems became an open-plan modern home with a new kitchen, rear addition, updated MEP, and cohesive finishes throughout.',
  },
]

export const materialCategories: MaterialCategory[] = [
  {
    title: 'Cabinetry & Millwork',
    items: ['Custom inset cabinetry', 'White oak, walnut, maple', 'Full-overlay and flush inset', 'Soft-close hardware', 'Custom pantry systems', 'Built-in shelving and banquettes'],
    icon: 'hammer',
  },
  {
    title: 'Stone & Surfacing',
    items: ['Marble (Carrara, Calacatta)', 'Quartzite and granite', 'Engineered quartz', 'Porcelain slabs', 'Terrazzo', 'Solid surface'],
    icon: 'stone',
  },
  {
    title: 'Lighting & Fixtures',
    items: ['Recessed and track lighting', 'Pendant and chandelier', 'Under-cabinet lighting', 'Wall sconces', 'Matte black, brass, chrome', 'Smart dimming systems'],
    icon: 'light',
  },
  {
    title: 'Flooring',
    items: ['Engineered hardwood', 'Luxury vinyl plank', 'Natural stone tile', 'Porcelain large format', 'Heated floor systems', 'Wide-plank oak'],
    icon: 'ruler',
  },
  {
    title: 'Tile & Mosaic',
    items: ['Zellige and handmade tile', 'Large-format porcelain', 'Hexagon and subway patterns', 'Marble and stone mosaic', 'Glass tile accents', 'Outdoor-rated porcelain'],
    icon: 'grid',
  },
  {
    title: 'Fixtures & Hardware',
    items: ['Waterworks and Brizo', 'Rohl and Newport Brass', 'Kohler and Toto fixtures', 'Custom cabinetry pulls', 'Smart toilets and faucets', 'Commercial-grade faucets'],
    icon: 'wrench',
  },
]

export const timelineSteps: TimelineStep[] = [
  {
    phase: '01',
    title: 'Consultation & Discovery',
    description: 'We visit your home, discuss your goals, take measurements, and understand how you use each space. No assumptions, just listening.',
    duration: '1-2 weeks',
  },
  {
    phase: '02',
    title: 'Design Concept',
    description: 'Our design team produces floor plans, material boards, 3D renderings, and a preliminary budget. You see the vision before any work begins.',
    duration: '3-5 weeks',
  },
  {
    phase: '03',
    title: 'Proposal & Contract',
    description: 'A detailed line-item proposal with all materials, labor, and timeline. We walk through every line together before you sign.',
    duration: '1-2 weeks',
  },
  {
    phase: '04',
    title: 'Construction',
    description: 'Demolition, rough-in, drywall, finishes, and trim. A dedicated project manager oversees every trade and sends weekly progress updates.',
    duration: '4-16 weeks',
  },
  {
    phase: '05',
    title: 'Final Walkthrough',
    description: 'We walk every room together, check every detail against the plan, and address any punch-list items. You move back in or host the dinner party.',
    duration: '1 week',
  },
]

export const testimonials: Testimonial[] = [
  {
    name: 'Margaret Chen',
    role: 'Lincoln Park Homeowner',
    text: 'Haven transformed our cramped, dark 90s kitchen into the heart of our home. Every detail was considered, from the cabinet pull placement to the under-cabinet lighting. They made the process feel easy.',
  },
  {
    name: 'Tom and Rachel Walsh',
    role: 'Bucktown Homeowners',
    text: 'We interviewed five contractors before choosing Haven. Their design phase sold us. Seeing the 3D renderings before any construction gave us confidence. They delivered exactly what they showed.',
  },
  {
    name: 'Patricia Nguyen',
    role: 'Wicker Park Homeowner',
    text: 'They turned our awkward attic into a beautiful primary suite. The project manager sent weekly updates with photos, and the dust containment was so good we hardly knew they were there.',
  },
]

export const faqs: FaqItem[] = [
  {
    question: 'How much does a kitchen renovation cost?',
    answer: 'In Chicago, a full kitchen remodel typically ranges from $45,000 to $95,000 depending on scope, material selections, and structural changes. We provide a detailed estimate after the design phase so there are no surprises.',
  },
  {
    question: 'Can I live in my home during construction?',
    answer: 'For partial renovations, yes we seal off work areas and maintain access to the rest of the home. For full-home renovations, we recommend staying elsewhere for the duration.',
  },
  {
    question: 'How long does a bathroom renovation take?',
    answer: 'A full bathroom remodel typically takes 4-7 weeks. Demolition and rough-in take 1-2 weeks, tile and finishes take 2-3 weeks, and fixtures and trim take the final week.',
  },
  {
    question: 'Do you provide design services?',
    answer: 'Yes. Our in-house design team handles space planning, material selection, finish specifications, and construction detailing. We also collaborate with outside architects and interior designers.',
  },
  {
    question: 'What is the difference between a quote and an estimate?',
    answer: 'An estimate is a preliminary budget range based on initial conversations. A quote is a fixed-price proposal after design is complete. We work on a fixed-price contract model for all renovation projects.',
  },
  {
    question: 'Are you licensed and insured?',
    answer: 'We are licensed in Illinois (IL-RC-31280), carry $2M general liability insurance, and all our trade partners are licensed, bonded, and insured.',
  },
]

export const navLinks = [
  { label: 'Renovations', href: '#renovations' },
  { label: 'Transformations', href: '#transformations' },
  { label: 'Design + Build', href: '#design-build' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]
