export interface Service {
  title: string
  description: string
  icon: string
}

export interface Project {
  title: string
  category: string
  location: string
  scope: string
  duration: string
  image: string
  description: string
  images: string[]
}

export interface ProcessStep {
  step: number
  title: string
  description: string
  details: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface Testimonial {
  name: string
  role: string
  company: string
  text: string
}

export interface TeamMember {
  name: string
  role: string
  image: string
}

export const siteInfo = {
  name: 'ForgeBuilt Contractors',
  tagline: 'Built with control from first plan to final handover',
  shortTagline: 'General Contractors',
  phone: '(312) 555-0198',
  email: 'estimates@forgebuilt.com',
  address: '420 W Industrial Ave, Chicago, IL 60607',
  founded: 2008,
  license: 'IL-GC-48029',
  insurance: '$10M General Liability + $5M Umbrella',
  projectsCompleted: 340,
  yearsExperience: 17,
  employees: 86,
}

export const services: Service[] = [
  {
    title: 'Ground-Up Construction',
    description:
      'Full-site development from foundation to certificate of occupancy. Steel frame, concrete superstructure, MEP — we manage every phase in-house.',
    icon: 'building',
  },
  {
    title: 'Commercial Fit-Outs',
    description:
      'Interior build-outs for offices, retail, medical, and hospitality. Fully coordinated trade scheduling with zero downtime between phases.',
    icon: 'blueprint',
  },
  {
    title: 'Structural Concrete & Steel',
    description:
      'Reinforced concrete foundations, structural steel erection, podium slabs, and load-bearing modifications. Engineered for seismic and wind loads.',
    icon: 'helmet',
  },
  {
    title: 'Renovation & Adaptive Reuse',
    description:
      'Structural renovations, historic restorations, and adaptive reuse. We preserve character while upgrading every system to modern code.',
    icon: 'wrench',
  },
  {
    title: 'Design-Build Delivery',
    description:
      'Single-contract design-build with in-house estimators and project managers. One team from schematic design through punch list.',
    icon: 'ruler',
  },
  {
    title: 'Construction Management',
    description:
      'Owner-representative CM services: bidding, scheduling, QA/QC, budget control, and close-out documentation for complex multi-trade projects.',
    icon: 'clipboard',
  },
]

export const projects: Project[] = [
  {
    title: 'Lake Shore Tower',
    category: 'Commercial Fit-Out',
    location: 'Chicago, IL',
    scope: '12 floors, 180,000 sq ft',
    duration: '14 months',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&q=85',
    images: [
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    ],
    description:
      'Full interior fit-out of a Class A office tower including lobby renovation, 12 floors of open-plan workspace, executive suites, conference centers, and a rooftop amenity deck with city views.',
  },
  {
    title: 'Elm Street Residence',
    category: 'Residential',
    location: 'Evanston, IL',
    scope: '5,200 sq ft custom home',
    duration: '18 months',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80',
    ],
    description:
      'Custom modern residence with exposed steel structure, floor-to-ceiling glazing, a green roof system, and integrated smart-home technology throughout all four levels.',
  },
  {
    title: 'Merchandise Mart Floors 4-6',
    category: 'Historic Renovation',
    location: 'Chicago, IL',
    scope: '3 floors, 65,000 sq ft',
    duration: '9 months',
    image: 'https://images.unsplash.com/photo-1451153378752-16ef2b36ad05?w=1200&q=85',
    images: [
      'https://images.unsplash.com/photo-1451153378752-16ef2b36ad05?w=800&q=80',
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80',
    ],
    description:
      'Historic renovation of three floors in the landmark Merchandise Mart, including structural reinforcement, MEP upgrades, and modern workplace fit-out within a protected structure.',
  },
  {
    title: 'Bridgeport Townhomes',
    category: 'Residential',
    location: 'Chicago, IL',
    scope: '8 units, 3-story townhomes',
    duration: '16 months',
    image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&q=85',
    images: [
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    ],
    description:
      'A row of eight attached townhomes with reinforced concrete podiums, brick-and-metal facades, private rooftop terraces, and a shared courtyard landscape with native plantings.',
  },
  {
    title: 'West Loop Warehouse',
    category: 'Adaptive Reuse',
    location: 'Chicago, IL',
    scope: '2 floors, 28,000 sq ft',
    duration: '8 months',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=85',
    images: [
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    ],
    description:
      'Adaptive reuse of a 1920s warehouse into creative office space, preserving original timber beams and masonry while adding modern mechanical systems and egress.',
  },
]

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: 'Estimate & Scope',
    description:
      'We review your plans, visit the site, and produce a detailed line-item estimate with clear material and labor breakdowns.',
    details:
      'Includes quantity takeoffs, subcontractor bids, schedule of values, and a preliminary project schedule.',
  },
  {
    step: 2,
    title: 'Planning & Permits',
    description:
      'Our team secures all necessary permits, coordinates with engineers and architects, and establishes the procurement timeline.',
    details:
      'We handle zoning review, building permit applications, structural calculations, and utility coordination.',
  },
  {
    step: 3,
    title: 'Procurement',
    description:
      'Materials are ordered, subcontractors are contracted, and the project site is prepared for mobilization.',
    details:
      'Long-lead items identified and ordered early. Maintain a material tracking log updated weekly.',
  },
  {
    step: 4,
    title: 'Construction',
    description:
      'On-site execution with daily supervision, weekly progress meetings, and continuous quality control inspections.',
    details:
      'Our superintendents manage crews, schedule trades, monitor safety, and document progress with daily photo logs.',
  },
  {
    step: 5,
    title: 'Inspection & Handover',
    description:
      'Final inspections, punch list completion, owner walkthrough, and delivery of all close-out documentation.',
    details:
      'Includes warranty binders, O&M manuals, as-built drawings, and a final project close-out report.',
  },
]

export const testimonials: Testimonial[] = [
  {
    name: 'James Korr',
    role: 'VP of Operations',
    company: 'Meridian Properties',
    text: 'ForgeBuilt delivered 12 floors of office space on an aggressive timeline without a single safety incident. Their scheduling discipline is unmatched — every trade knew exactly when to show up and what to do.',
  },
  {
    name: 'Sarah Chen',
    role: 'Architect, AIA',
    company: 'Kohn Shnier Architects',
    text: 'Working with ForgeBuilt feels like having a partner who actually reads the drawings. Their team caught coordination issues in our MEP layout before we broke ground, saving us three weeks and significant change-order costs.',
  },
  {
    name: 'David Okonkwo',
    role: 'Managing Director',
    company: 'Bridgeport Development Group',
    text: 'Eight townhomes delivered on budget with zero punch-list items at final walkthrough. That never happens in this market. ForgeBuilt runs their sites like a military operation — in the best possible way.',
  },
]

export const teamMembers: TeamMember[] = [
  {
    name: 'Marcus Webb',
    role: 'Founder & President',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  },
  {
    name: 'Elena Vasquez',
    role: 'VP of Operations',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80',
  },
]

export const faqs: FaqItem[] = [
  {
    question: 'How long does a typical commercial fit-out take?',
    answer:
      'For a standard 10,000-30,000 sq ft office fit-out, expect 10-16 weeks from permit to certificate of occupancy. Larger or more complex spaces can take 6-12 months. We provide a detailed schedule during the estimating phase.',
  },
  {
    question: 'Do you handle building permits?',
    answer:
      'Yes. We manage the entire permitting process from zoning review through final inspections. Permitting timelines vary by municipality; we factor realistic durations into every schedule.',
  },
  {
    question: 'How do you handle budget changes or change orders?',
    answer:
      'Change orders are documented with a clear scope change description, cost impact, and schedule adjustment before any work proceeds. We review them with you and require written approval.',
  },
  {
    question: 'What size projects do you take on?',
    answer:
      'We handle projects from $250K interior renovations up to $25M ground-up commercial builds. If your project falls outside this range, we can recommend trusted partners.',
  },
  {
    question: 'Are you insured and bonded?',
    answer:
      'We carry $10M in general liability insurance, $5M umbrella coverage, workers compensation, and builders risk on every project. Certificates of insurance are provided before mobilization.',
  },
  {
    question: 'Can I visit active job sites?',
    answer:
      'Yes, with prior coordination. All visitors must complete a site-specific safety orientation and wear required PPE. We schedule owner walkthroughs at key milestones.',
  },
]

export const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Team', href: '#team' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]
