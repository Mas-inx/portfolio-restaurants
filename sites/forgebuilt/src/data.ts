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

export const siteInfo = {
  name: 'ForgeBuilt Contractors',
  tagline: 'Built with control — from first plan to final handover',
  shortTagline: 'General Contractors',
  phone: '(312) 555-0198',
  email: 'estimates@forgebuilt.com',
  address: '420 W Industrial Ave, Chicago, IL 60607',
  founded: 2008,
  license: 'IL-GC-48029',
  insurance: '$10M General Liability + $5M Umbrella',
  projectsCompleted: 340,
  yearsExperience: 17,
}

export const services: Service[] = [
  {
    title: 'Commercial Fit-Outs',
    description:
      'Full interior build-outs for offices, retail, restaurants, and mixed-use commercial spaces. We manage every trade from framing to finish.',
    icon: 'building',
  },
  {
    title: 'Residential Construction',
    description:
      'Custom homes and luxury residences built from foundation to roof. Structural integrity paired with precise architectural execution.',
    icon: 'home',
  },
  {
    title: 'Renovations & Retrofits',
    description:
      'Structural renovations, adaptive reuse, and seismic retrofits. We bring older buildings up to modern standards without losing their character.',
    icon: 'hammer-wrench',
  },
  {
    title: 'Structural Works',
    description:
      'Steel erection, concrete superstructures, foundation systems, and load-bearing modifications. Engineered for safety and longevity.',
    icon: 'helmet',
  },
  {
    title: 'Project Management',
    description:
      'End-to-end construction management: scheduling, budgeting, subcontractor coordination, and owner representation from permit to punch list.',
    icon: 'clipboard',
  },
  {
    title: 'Permitting & Code',
    description:
      'Navigating municipal permitting, zoning approvals, and building code compliance. We handle the paperwork so your project stays on track.',
    icon: 'checkmark',
  },
]

export const projects: Project[] = [
  {
    title: 'Lake Shore Office Tower',
    category: 'Commercial Fit-Out',
    location: 'Chicago, IL',
    scope: '12 floors, 180,000 sq ft',
    duration: '14 months',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80',
    description:
      'Full interior fit-out of a Class A office tower including lobby renovation, 12 floors of open-plan workspace, executive suites, conference centers, and a rooftop amenity deck.',
  },
  {
    title: 'Elm Street Residence',
    category: 'Residential Construction',
    location: 'Evanston, IL',
    scope: '5,200 sq ft custom home',
    duration: '18 months',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    description:
      'Custom modern residence with exposed steel structure, floor-to-ceiling glazing, a green roof system, and integrated smart-home technology throughout all four levels.',
  },
  {
    title: 'Merchandise Mart Restoration',
    category: 'Renovation & Retrofit',
    location: 'Chicago, IL',
    scope: '3 floors, 65,000 sq ft',
    duration: '9 months',
    image: 'https://images.unsplash.com/photo-1451153378752-16ef2b36ad05?w=800&q=80',
    description:
      'Historic renovation of three floors in the landmark Merchandise Mart, including structural reinforcement, MEP upgrades, and modern workplace fit-out within a protected structure.',
  },
  {
    title: 'Northside Medical Pavilion',
    category: 'Commercial Fit-Out',
    location: 'Skokie, IL',
    scope: '45,000 sq ft medical office',
    duration: '11 months',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80',
    description:
      'Medical office build-out featuring examination rooms, imaging suites, a pharmacy, and administrative offices with specialized MEP systems for healthcare compliance.',
  },
  {
    title: 'Bridgeport Townhomes',
    category: 'Residential Construction',
    location: 'Chicago, IL',
    scope: '8 units, 3-story townhomes',
    duration: '16 months',
    image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80',
    description:
      'A row of eight attached townhomes with reinforced concrete podiums, brick-and-metal façades, private rooftop terraces, and a shared courtyard landscape.',
  },
  {
    title: 'West Loop Warehouse Conversion',
    category: 'Renovation & Retrofit',
    location: 'Chicago, IL',
    scope: '2 floors, 28,000 sq ft',
    duration: '8 months',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
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
      'Long-lead items are identified and ordered early. We maintain a material tracking log updated weekly.',
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

export const siteManagementPillars = [
  {
    title: 'Safety First',
    description:
      'Every job site follows OSHA-compliant safety protocols with daily hazard assessments, weekly safety meetings, and a zero-incident culture.',
    icon: 'shield',
  },
  {
    title: 'Schedule Control',
    description:
      'We use critical-path scheduling with weekly look-ahead updates. Subcontractors are held to binding milestone dates.',
    icon: 'calendar',
  },
  {
    title: 'Crew Coordination',
    description:
      'Dedicated site superintendents manage trade sequencing, material deliveries, and daily crew assignments to eliminate downtime.',
    icon: 'helmet',
  },
  {
    title: 'Material Tracking',
    description:
      'Every material is logged from order to installation. We prevent delays with proactive reordering and on-site inventory management.',
    icon: 'clipboard',
  },
]

export const trustPoints = [
  {
    title: 'Fully Licensed & Bonded',
    description: 'Licensed in Illinois, Indiana, and Wisconsin. $10M aggregate liability coverage.',
    icon: 'shield',
  },
  {
    title: 'Documented & Transparent',
    description:
      'Daily progress photos, weekly reports, and a shared project dashboard that owners and architects can access anytime.',
    icon: 'checkmark',
  },
  {
    title: 'Subcontractor Vetted',
    description:
      'Every trade partner carries their own insurance and bonding. We pre-qualify all subcontractors before bid award.',
    icon: 'checkmark',
  },
  {
    title: 'Warranty Backed',
    description:
      'All work carries a minimum 2-year workmanship warranty. Structural work carries extended coverage terms.',
    icon: 'shield',
  },
]

export const faqs: FaqItem[] = [
  {
    question: 'How long does a typical commercial fit-out take?',
    answer:
      'For a standard 10,000–30,000 sq ft office fit-out, expect 10–16 weeks from permit to certificate of occupancy. Larger or more complex spaces can take 6–12 months. We provide a detailed schedule during the estimating phase.',
  },
  {
    question: 'Do you handle building permits?',
    answer:
      'Yes. We manage the entire permitting process — zoning review, life safety plans, structural submissions, and final inspections. Permitting timelines vary by municipality; we factor realistic durations into every schedule.',
  },
  {
    question: 'How do you handle budget changes or change orders?',
    answer:
      'Change orders are documented with a clear scope change description, cost impact, and schedule adjustment before any work proceeds. We review them with you and require written approval. We do not proceed without sign-off.',
  },
  {
    question: 'What size projects do you take on?',
    answer:
      'We handle projects from $250K interior renovations up to $25M ground-up commercial builds. If your project falls outside this range, we can recommend trusted partners who specialize in smaller or larger work.',
  },
  {
    question: 'Are you insured?',
    answer:
      'We carry $10M in general liability insurance, $5M umbrella coverage, workers compensation, and builder\'s risk on every project. Certificates of insurance are provided before mobilization.',
  },
  {
    question: 'Can I visit active job sites?',
    answer:
      'Yes, with prior coordination. All visitors must complete a site-specific safety orientation and wear required PPE. We schedule owner walkthroughs at key milestones throughout construction.',
  },
  {
    question: 'How do you select subcontractors?',
    answer:
      'We maintain an approved subcontractor list built over 17 years. Each trade partner is pre-qualified through a review of licensing, insurance, safety records, past performance, and financial stability.',
  },
  {
    question: 'What information do you need for an estimate?',
    answer:
      'At minimum: architectural drawings, structural plans, and a scope narrative. For preliminary estimates, a floor plan and finish schedule can suffice. We will let you know if we need additional documentation.',
  },
]

export const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Process', href: '#process' },
  { label: 'Management', href: '#management' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]
