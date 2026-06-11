export interface Capability {
  title: string
  description: string
  icon: string
  stat: string
}

export interface ProjectCase {
  title: string
  category: string
  location: string
  size: string
  duration: string
  budget: string
  image: string
  highlights: string[]
  description: string
}

export interface ProcessPhase {
  phase: string
  title: string
  description: string
}

export const siteInfo = {
  name: 'SteelSpan Commercial Builders',
  tagline: 'Commercial construction built around schedule, safety, and accountability',
  shortTagline: 'Commercial General Contractor',
  phone: '(312) 555-0371',
  email: 'projects@steelspan.com',
  address: '1600 S Ashland Ave, Chicago, IL 60608',
  founded: 2003,
  license: 'IL-GC-52147',
  safetyRating: 'OSHA VPP Star',
  projectsCompleted: 210,
  yearsExperience: 22,
  squareFeetBuilt: '4.2M+',
  activeCrews: 85,
}

export const capabilities: Capability[] = [
  {
    title: 'Ground-Up Construction',
    description: 'Full-scope new builds from site prep through certificate of occupancy. Steel frame, concrete tilt-up, and hybrid structural systems.',
    icon: '🏗️',
    stat: '120+ buildings',
  },
  {
    title: 'Tenant Improvements',
    description: 'Interior build-outs for office, retail, medical, and industrial tenants. Fast-track schedules with minimal disruption to existing operations.',
    icon: '🏢',
    stat: '3–16 week avg',
  },
  {
    title: 'Industrial Facilities',
    description: 'Warehouses, distribution centers, and light manufacturing facilities. High-bay clearances, heavy floor loads, and dock-leveling systems.',
    icon: '🔧',
    stat: '500K+ sq ft',
  },
  {
    title: 'Retail Build-Outs',
    description: 'Shell-to-finish retail construction for national brands and local operators. Storefronts, interiors, MEP, and brand-standard finishes.',
    icon: '🛍️',
    stat: '80+ locations',
  },
  {
    title: 'Warehousing & Logistics',
    description: 'Distribution centers, cold storage, and fulfillment hubs. Designed for throughput with optimized dock counts, aisle widths, and ceiling heights.',
    icon: '📦',
    stat: '2.1M+ sq ft',
  },
  {
    title: 'Pre-Construction Services',
    description: 'Budgeting, value engineering, phasing, and constructability reviews before breaking ground. We find savings in the design phase.',
    icon: '📐',
    stat: '12–18% saved',
  },
]

export const projectStats = [
  { label: 'Square Feet Built', value: '4.2M+' },
  { label: 'Projects Completed', value: '210+' },
  { label: 'Years in Business', value: '22' },
  { label: 'Active Crew Members', value: '85' },
  { label: 'OSHA VPP Star Rating', value: '★' },
  { label: 'Safety Record', value: '0 LTIs' },
]

export const featuredProjects: ProjectCase[] = [
  {
    title: 'Midway Logistics Center',
    category: 'Industrial / Warehousing',
    location: 'Bedford Park, IL',
    size: '425,000 sq ft',
    duration: '14 months',
    budget: '$28.5M',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
    description:
      'Cross-dock distribution center with 40 dock doors, ESFR sprinkler system, 36\' clear height, and 6" reinforced slab for heavy racking loads.',
    highlights: ['40 dock doors', 'ESFR sprinkler system', '36\' clear height', '6" reinforced slab'],
  },
  {
    title: 'River North Office Renovation',
    category: 'Tenant Improvement',
    location: 'Chicago, IL',
    size: '65,000 sq ft',
    duration: '5 months',
    budget: '$8.2M',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    description:
      'Full-floor tenant improvement for a financial services firm: open workspace, private offices, trading floor, conference center, and a rooftop terrace.',
    highlights: ['Trading floor build-out', 'MEP upgrade', 'Rooftop terrace', 'LEED Gold target'],
  },
  {
    title: 'Oak Brook Retail Pavilion',
    category: 'Retail Build-Out',
    location: 'Oak Brook, IL',
    size: '180,000 sq ft',
    duration: '10 months',
    budget: '$18.7M',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80',
    description:
      'Mixed-use retail pavilion with anchor tenant spaces, inline retail, restaurants, and a shared courtyard with site-wide landscaping and stormwater management.',
    highlights: ['Anchor + inline retail', 'Restaurant kitchens', 'Shared courtyard', 'Stormwater management'],
  },
]

export const preConstructionServices = [
  {
    title: 'Budget Development',
    description: 'Conceptual estimates, line-item budgets, and cash-flow projections updated as design progresses.',
  },
  {
    title: 'Value Engineering',
    description: 'Systematic review of materials, methods, and systems to maximize value without compromising program requirements.',
  },
  {
    title: 'Phasing & Logistics',
    description: 'Construction phasing plans, site logistics, crane and laydown area planning, and traffic control coordination.',
  },
  {
    title: 'Estimating',
    description: 'Detailed quantity takeoffs, self-perform versus subcontract analysis, and competitive bid packages for all trades.',
  },
]

export const safetyPoints = [
  {
    title: 'Site-Specific Plans',
    description: 'Every project has a written safety plan tailored to its hazards, site conditions, and adjacent uses.',
  },
  {
    title: 'Daily Documentation',
    description: 'Daily safety logs, near-miss reporting, toolbox talks, and inspection records are maintained on every job site.',
  },
  {
    title: 'Third-Party Inspections',
    description: 'Independent safety auditors conduct unannounced site inspections. Results are shared with the project team within 24 hours.',
  },
  {
    title: 'Compliance Tracking',
    description: 'OSHA 300 logs, training certifications, equipment inspection records, and SDS binders are maintained and available for review.',
  },
]

export const processPhases: ProcessPhase[] = [
  { phase: '01', title: 'Design Review', description: 'We review all drawings, specifications, and owner requirements. Constructability issues are flagged before bid.' },
  { phase: '02', title: 'Budget & Schedule', description: 'Detailed budget with schedule of values. Critical-path schedule with milestone dates and float analysis.' },
  { phase: '03', title: 'Permitting & Approvals', description: 'Municipal permits, zoning approvals, utility coordination, and any special inspections required by jurisdiction.' },
  { phase: '04', title: 'Procurement & Mobilization', description: 'Long-lead procurement, subcontractor buyout, site mobilization, and preconstruction survey.' },
  { phase: '05', title: 'Construction & Commissioning', description: 'On-site execution, quality control, weekly owner meetings, and systems commissioning.' },
  { phase: '06', title: 'Close-Out & Handover', description: 'Punch list, owner training, as-built documentation, warranty binders, and final accounting.' },
]

export const navLinks = [
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'By the Numbers', href: '#numbers' },
  { label: 'Pre-Construction', href: '#precon' },
  { label: 'Safety', href: '#safety' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]
