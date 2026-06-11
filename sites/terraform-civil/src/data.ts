export interface Capability {
  title: string
  description: string
  icon: string
}

export interface ProcessPhase {
  phase: string
  title: string
  description: string
  details: string
}

export interface Equipment {
  name: string
  category: string
  description: string
  icon: string
  specs: string
}

export interface ProjectType {
  title: string
  description: string
  image: string
}

export const siteInfo = {
  name: 'TerraForm Civil Works',
  tagline: 'Preparing land for what comes next',
  shortTagline: 'Heavy Civil · Sitework · Land Development',
  phone: '(312) 555-0536',
  email: 'estimating@terraformcivil.com',
  address: '8901 S Commercial Ave, Chicago, IL 60617',
  founded: 1998,
  license: 'IL-CV-61049',
  insurance: '$5M General + $5M Umbrella + Pollution',
  yearsExperience: 27,
  projectsCompleted: 580,
  crewSize: 120,
  acresCleared: '12,500+',
}

export const capabilities: Capability[] = [
  {
    title: 'Excavation & Earthwork',
    description:
      'Mass excavation, site cut-and-fill, trenching for utilities, and precision grading. We move earth efficiently without disturbing adjacent properties.',
    icon: 'helmet',
  },
  {
    title: 'Mass Grading & Site Prep',
    description:
      'Large-scale grading for residential subdivisions, commercial pads, and industrial yards. Engineered to spec with compaction testing at every lift.',
    icon: 'ruler',
  },
  {
    title: 'Drainage & Stormwater',
    description:
      'Storm sewer systems, retention ponds, culverts, swales, and subsurface drainage. Designed to manage runoff and meet municipal stormwater requirements.',
    icon: 'water',
  },
  {
    title: 'Utility Installation',
    description:
      'Water mains, sanitary sewers, gas lines, electrical conduit, and telecommunications. Coordinated with utility companies for timely connections.',
    icon: 'zap',
  },
  {
    title: 'Paving Preparation',
    description:
      'Subgrade preparation, aggregate base courses, and binder courses for asphalt and concrete paving. Proper compaction ensures pavement longevity.',
    icon: 'road',
  },
  {
    title: 'Retaining Structures',
    description:
      'Segmental retaining walls, MSE walls, soldier pile walls, and reinforced slopes. Engineered for soil retention and long-term stability.',
    icon: 'building',
  },
]

export const processPhases: ProcessPhase[] = [
  {
    phase: '01', title: 'Survey & Stakeout', description: 'Boundary surveys, topographic mapping, and utility stakeout. We confirm existing conditions before any equipment mobilizes.', details: 'Includes GPS-grade survey, utility locate verification, and existing condition photo documentation.',
  },
  {
    phase: '02', title: 'Clearing & Grubbing', description: 'Vegetation removal, demolition of existing structures, and site stripping. Topsoil is stockpiled separately for reuse in final grading.', details: 'Erosion control measures installed before clearing begins. Tree preservation per arborist report.',
  },
  {
    phase: '03', title: 'Rough Grading', description: 'Mass earthwork to achieve design elevations. Cut and fill balanced on-site where possible to minimize haul-off costs.', details: 'Compaction testing at every 12" lift. Moisture control for optimal density.',
  },
  {
    phase: '04', title: 'Utility Installation', description: 'Trenching, bedding, pipe installation, and backfill for all underground utilities. Pressure testing and inspection before trench closure.', details: 'Coordination with utility providers for meter sets and final connections.',
  },
  {
    phase: '05', title: 'Fine Grading & Compaction', description: 'Final grade preparation to within 0.1\' of design elevation. Proof-rolling and density testing before paving or building pad acceptance.', details: 'Subgrade evaluated by geotechnical engineer. Remediation per soil report.',
  },
  {
    phase: '06', title: 'Site Handoff', description: 'Final survey, documentation package, and owner walkthrough. All compaction reports, as-built drawings, and warranties delivered.', details: 'Punch list completed, erosion control measures transferred to owner maintenance plan.',
  },
]

export const equipment: Equipment[] = [
  { name: 'Caterpillar D6 Dozer', category: 'Dozers', description: 'Medium dozer for mass grading, backfilling, and site clearing. 6-way blade for precise grade control.', icon: 'truck', specs: '185 HP · 40,000 lbs' },
  { name: 'Caterpillar 320 Excavator', category: 'Excavators', description: 'Next-gen hydraulic excavator with GPS grade control. Trenching, mass excavation, and utility work.', icon: 'helmet', specs: '157 HP · 49,000 lbs' },
  { name: 'Caterpillar 950 Loader', category: 'Loaders', description: 'Wheel loader for material handling, truck loading, and site cleanup. Quick-couple attachment system.', icon: 'truck', specs: '205 HP · 43,000 lbs' },
  { name: 'Caterpillar CS56 Compactor', category: 'Compactors', description: 'Vibratory smooth-drum compactor for soil and asphalt. Padfoot shell kit available for cohesive soils.', icon: 'zap', specs: '124 HP · 21,000 lbs' },
  { name: 'Volvo A40G Dump Truck', category: 'Trucks', description: 'Articulated haul truck for off-road material transport. Heated body, diff lock, and load-sensing hydraulics.', icon: 'truck', specs: '445 HP · 44 ton payload' },
  { name: 'Caterpillar 140 Motor Grader', category: 'Graders', description: 'Heavy-duty grader for fine grading, road shaping, and ditch cutting. Grade control ready.', icon: 'ruler', specs: '185 HP · 32,000 lbs' },
]

export const projectTypes: ProjectType[] = [
  {
    title: 'Residential Subdivisions',
    description: 'Full site development for residential communities: mass grading, roads, storm sewers, water and sanitary mains, and lot pad preparation. 50–500+ lot projects.',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80',
  },
  {
    title: 'Commercial Building Pads',
    description: 'Site preparation for retail centers, office buildings, and mixed-use developments. Engineered fill, compaction testing, and utility stub-outs.',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80',
  },
  {
    title: 'Road & Infrastructure',
    description: 'Public and private roadway construction: subgrade prep, aggregate base, curb and gutter, asphalt paving, and stormwater management.',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb2c88ea5?w=800&q=80',
  },
  {
    title: 'Industrial Yards',
    description: 'Heavy-duty site preparation for warehouses, distribution centers, and manufacturing plants. High CBR subgrades and deep utility networks.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
  },
]

export const safetyPoints = [
  { title: 'Erosion Control', description: 'Silt fencing, sediment basins, inlet protection, and stabilized construction exits installed before any earth disturbance.' },
  { title: 'Stormwater Management', description: 'NPDES permitting, weekly inspections, and quarterly reporting to regulatory agencies.' },
  { title: 'Site Safety Plans', description: 'Project-specific safety plans with hazard identification, trench protection, heavy equipment protocols, and emergency response.' },
  { title: 'Inspections & Documentation', description: 'Daily equipment inspections, soil compaction reports, and third-party geotechnical testing throughout the project lifecycle.' },
]

export const navLinks = [
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Process', href: '#process' },
  { label: 'Equipment', href: '#equipment' },
  { label: 'Project Types', href: '#projects' },
  { label: 'Safety', href: '#safety' },
  { label: 'Contact', href: '#contact' },
]
