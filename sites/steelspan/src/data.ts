export interface Capability {
  title: string
  description: string
}

export interface SafetyPoint {
  title: string
  description: string
}

export interface ProjectCase {
  title: string
  category: string
  location: string
  image: string
  description: string
  stats: { label: string; value: string }[]
}

export interface ProcessPhase {
  phase: string
  title: string
  description: string
}

export interface StatCounter {
  value: string
  label: string
}

export const siteInfo = {
  name: 'SteelSpan Commercial Builders',
  tagline: 'Commercial construction built around schedule, safety, and accountability',
  shortTagline: 'Commercial General Contractor',
  phone: '(312) 555-0371',
  email: 'projects@steelspan.com',
  address: '1600 S Ashland Ave, Chicago, IL 60608',
  license: 'IL-GC-52147',
  safetyRating: 'OSHA VPP Star',
}

export const stats: StatCounter[] = [
  { value: '350+', label: 'Projects Completed' },
  { value: '28', label: 'Years Experience' },
  { value: '99%', label: 'On-Time Delivery' },
]

export const capabilities: Capability[] = [
  {
    title: 'General Contracting',
    description: 'Full-scope new builds from site prep through certificate of occupancy. Steel frame, concrete tilt-up, and hybrid structural systems across commercial, industrial, and institutional sectors.',
  },
  {
    title: 'Design-Build',
    description: 'Integrated design and construction delivery. Single-point accountability, faster timelines, and seamless collaboration between architects, engineers, and our field teams.',
  },
  {
    title: 'Pre-Construction',
    description: 'Budgeting, value engineering, phasing, and constructability reviews before breaking ground. We identify savings and risks in the design phase, not during construction.',
  },
  {
    title: 'Project Management',
    description: 'Dedicated project managers with real-time schedule tracking, cost control, weekly owner updates, and full document control via Procore. Transparency is our standard.',
  },
  {
    title: 'Estimating',
    description: 'Detailed quantity takeoffs, self-perform versus subcontract analysis, and competitive bid packages. Conceptual estimates at schematic phase, line-item budgets at CD phase.',
  },
  {
    title: 'Scheduling',
    description: 'Critical-path schedules with milestone dates, float analysis, look-ahead planning, and pull-planning sessions. We build schedules that crews can actually follow.',
  },
]

export const preConServices = [
  {
    title: 'Budget Development',
    description: 'Conceptual estimates, line-item budgets, and cash-flow projections updated as design progresses from schematic through construction documents.',
  },
  {
    title: 'Value Engineering',
    description: 'Systematic review of materials, methods, and systems to maximize value. We identify savings without compromising program, quality, or schedule.',
  },
  {
    title: 'Constructability Review',
    description: 'Design-phase review to identify conflicts, sequencing issues, and field-level challenges before they become change orders. Coordinated with MEP and structural systems.',
  },
  {
    title: 'Phasing & Logistics',
    description: 'Construction phasing plans, site logistics, crane and laydown area planning, traffic control, and swing-space coordination for occupied buildings.',
  },
]

export const safetyPoints: SafetyPoint[] = [
  {
    title: 'OSHA VPP Star Rated',
    description: 'SteelSpan holds OSHA Voluntary Protection Program Star status -- the highest federal recognition for workplace safety and health management systems.',
  },
  {
    title: 'Daily Safety Briefings',
    description: 'Every crew starts each shift with a documented toolbox talk. Hazards are reviewed, assignments confirmed, and PPE verified before any work begins.',
  },
  {
    title: 'Substance-Free Program',
    description: 'Mandatory pre-access screening and random testing for all site personnel. Zero-tolerance policy with employee assistance resources available.',
  },
  {
    title: 'Third-Party Audits',
    description: 'Independent safety auditors conduct unannounced site inspections. Results are shared with the project team within 24 hours for immediate corrective action.',
  },
]

export const featuredProjects: ProjectCase[] = [
  {
    title: 'Meridian Tower',
    category: 'High-Rise Commercial',
    location: 'Chicago, IL',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80',
    description: '22-story mixed-use tower with 180,000 sq ft of Class A office space, ground-floor retail, rooftop amenity deck, and a 4-level parking podium. LEED Gold certified. Steel-framed with a glass curtainwall system.',
    stats: [
      { label: 'Stories', value: '22' },
      { label: 'Sq Ft', value: '180K' },
      { label: 'Duration', value: '16 mo' },
    ],
  },
  {
    title: 'Summit Logistics Hub',
    category: 'Industrial / Distribution',
    location: 'Joliet, IL',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
    description: '180,000 sq ft cross-dock distribution center with 48 dock doors, ESFR sprinkler system, 36-ft clear height, and heavy reinforced slab for 10,000 lb racking loads. Tilt-up concrete construction.',
    stats: [
      { label: 'Sq Ft', value: '180K' },
      { label: 'Dock Doors', value: '48' },
      { label: 'Duration', value: '10 mo' },
    ],
  },
  {
    title: 'Harborview Commons',
    category: 'Mixed-Use',
    location: 'Evanston, IL',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    description: 'Mixed-use development with 85 luxury residential units, ground-floor retail, and a 3-level parking structure. Vibration isolation foundations for residential comfort above active retail spaces.',
    stats: [
      { label: 'Units', value: '85' },
      { label: 'Retail', value: '12K sf' },
      { label: 'Duration', value: '14 mo' },
    ],
  },
]

export const processPhases: ProcessPhase[] = [
  { phase: '01', title: 'Design & Review', description: 'We review all drawings, specifications, and owner requirements. Constructability issues are flagged before bid.' },
  { phase: '02', title: 'Budget & Schedule', description: 'Detailed budget with schedule of values. Critical-path schedule with milestone dates and float analysis.' },
  { phase: '03', title: 'Permitting & Approvals', description: 'Municipal permits, zoning approvals, utility coordination, and special inspections required by jurisdiction.' },
  { phase: '04', title: 'Mobilization', description: 'Long-lead procurement, subcontractor buyout, site mobilization, and preconstruction survey.' },
  { phase: '05', title: 'Construction', description: 'On-site execution with quality control, weekly owner meetings, and systems commissioning throughout.' },
  { phase: '06', title: 'Close-Out & Handover', description: 'Punch list, owner training, as-built documentation, warranty binders, and final accounting.' },
]

export const navLinks = [
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Projects', href: '#projects' },
  { label: 'Pre-Construction', href: '#precon' },
  { label: 'Safety', href: '#safety' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]
