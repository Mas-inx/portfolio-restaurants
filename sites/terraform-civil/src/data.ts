export interface Capability {
  title: string
  description: string
}

export interface ProcessPhase {
  phase: string
  title: string
  description: string
  details: string
}

export interface EquipmentItem {
  name: string
  model: string
  specs: { label: string; value: string }[]
  description: string
}

export interface ProjectType {
  title: string
  description: string
  image: string
}

export interface SafetyPoint {
  title: string
  description: string
}

export const siteInfo = {
  name: 'TerraForm Civil Works',
  tagline: 'Preparing land for what comes next',
  shortTagline: 'Heavy Civil · Sitework · Land Development',
  phone: '(312) 555-0536',
  email: 'estimating@terraformcivil.com',
  address: '8901 S Commercial Ave, Chicago, IL 60617',
  license: 'IL-CV-61049',
  yearsExperience: 22,
  sitesPrepared: '800+',
  equipmentFleet: '45+',
}

export const stats = [
  { value: '800+', label: 'Sites Prepared' },
  { value: '45+', label: 'Equipment Fleet' },
  { value: '22', label: 'Years Experience' },
]

export const capabilities: Capability[] = [
  {
    title: 'Excavation',
    description: 'Mass excavation, trenching for utilities, and precision cut-and-fill operations. We move over 2M cubic yards of earth annually without disturbing adjacent properties.',
  },
  {
    title: 'Grading',
    description: 'Large-scale mass grading for residential subdivisions, commercial pads, and industrial yards. Engineered to spec with nuclear density compaction testing at every 12-inch lift.',
  },
  {
    title: 'Drainage',
    description: 'Storm sewer systems, retention ponds, culverts, swales, and subsurface drainage tile. Designed to manage 100-year storm events and meet municipal NPDES stormwater requirements.',
  },
  {
    title: 'Utilities',
    description: 'Water mains, sanitary sewers, gas lines, electrical conduit, and fiber-optic telecommunications. Coordinated with utility companies for meter sets and final connections.',
  },
  {
    title: 'Paving Prep',
    description: 'Subgrade preparation, aggregate base courses, binder courses for asphalt and concrete. Proof-rolling and density testing before any paving begins. Proper compaction ensures pavement longevity.',
  },
  {
    title: 'Retaining Systems',
    description: 'Segmental retaining walls, MSE walls, soldier pile and lagging, sheet piling, and reinforced slopes. Engineered for soil retention, groundwater control, and long-term stability.',
  },
]

export const processPhases: ProcessPhase[] = [
  {
    phase: '01', title: 'Survey', description: 'Boundary surveys, topographic mapping, and utility stakeout. GPS-grade positioning before any equipment mobilizes.',
    details: 'Robotic total station · GPS RTK · 3D scan verification',
  },
  {
    phase: '02', title: 'Clearing', description: 'Vegetation removal, structure demolition, and topsoil stripping. Erosion control installed before any earth disturbance.',
    details: 'Tree preservation · Silt fencing · Stockpile management',
  },
  {
    phase: '03', title: 'Grading', description: 'Mass earthwork to achieve design elevations. Cut and fill balanced on-site to minimize haul-off costs.',
    details: 'GPS grade control · 12-inch lifts · Compaction testing',
  },
  {
    phase: '04', title: 'Utilities', description: 'Trenching, bedding, pipe welding and installation, backfill for all underground utilities. Pressure testing before trench closure.',
    details: 'Fusion welding · CCTV inspection · Pressure test',
  },
  {
    phase: '05', title: 'Compaction', description: 'Final grade preparation to within 0.1 foot of design elevation. Proof-rolling and density testing before pad acceptance.',
    details: 'Nuclear density · Proctor curves · Geotech sign-off',
  },
  {
    phase: '06', title: 'Handoff', description: 'Final survey, documentation package, and owner walkthrough. All compaction reports and as-builts delivered.',
    details: 'As-builts · Punch list · Owner maintenance plan',
  },
]

export const equipment: EquipmentItem[] = [
  {
    name: 'Cat 336 Excavator',
    model: '336 Next Gen',
    specs: [
      { label: 'Power', value: '400 hp' },
      { label: 'Weight', value: '82,000 lbs' },
      { label: 'Bucket', value: '2.75 yd' },
      { label: 'Reach', value: '38 ft' },
    ],
    description: 'Next-gen hydraulic excavator with GPS grade control for mass excavation, trenching, and utility work. Equipped with quick-couple attachment system for rapid tool changes.',
  },
  {
    name: 'Cat D6T Dozer',
    model: 'D6T',
    specs: [
      { label: 'Power', value: '265 hp' },
      { label: 'Blade', value: '21 ft' },
      { label: 'Weight', value: '54,000 lbs' },
      { label: 'Drive', value: '6-way' },
    ],
    description: 'Medium dozer with 6-way blade for mass grading, backfilling, and site clearing. GPS-capable for precision grade control down to 0.1 ft tolerance.',
  },
  {
    name: 'Cat 140K Grader',
    model: '140K',
    specs: [
      { label: 'Power', value: '185 hp' },
      { label: 'Moldboard', value: '14 ft' },
      { label: 'Weight', value: '34,000 lbs' },
      { label: 'Speed', value: '28 mph' },
    ],
    description: 'Heavy-duty motor grader for fine grading, road shaping, and ditch cutting. Cross-slope and grade control ready for automated subgrade finishing.',
  },
  {
    name: 'Cat CS56 Compactor',
    model: 'CS56',
    specs: [
      { label: 'Power', value: '155 hp' },
      { label: 'Drum', value: '84 in' },
      { label: 'Weight', value: '25,000 lbs' },
      { label: 'Force', value: '61,000 lbf' },
    ],
    description: 'Vibratory smooth-drum compactor for soil and asphalt. Padfoot shell kit available for cohesive soils. GPS mapping of pass counts and density coverage.',
  },
]

export const projectTypes: ProjectType[] = [
  {
    title: 'Residential Subdivisions',
    description: 'Full site development for residential communities: mass grading, roads, storm sewers, water and sanitary mains, and lot pad preparation for 50 to 500+ lot projects.',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80',
  },
  {
    title: 'Commercial Building Pads',
    description: 'Site preparation for retail centers, office buildings, and mixed-use developments. Engineered fill, compaction testing, and utility stub-outs ready for foundation work.',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80',
  },
  {
    title: 'Road & Infrastructure',
    description: 'Public and private roadway construction: subgrade prep, aggregate base courses, curb and gutter, and stormwater management. IDOT and municipal standards compliant.',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb2c88ea5?w=800&q=80',
  },
  {
    title: 'Industrial Yards',
    description: 'Heavy-duty site preparation for warehouses, distribution centers, and manufacturing plants. High CBR subgrades, deep utility networks, and heavy-load pavement sections.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
  },
]

export const safetyPoints: SafetyPoint[] = [
  { title: 'Erosion Control', description: 'Silt fencing, sediment basins, inlet protection, and stabilized construction exits installed before any earth disturbance. Weekly BMP inspections.' },
  { title: 'Stormwater Management', description: 'NPDES permitting, weekly inspections, quarterly regulatory reporting. SWPPP documentation maintained and available on-site at all times.' },
  { title: 'Site Inspections', description: 'Third-party geotechnical testing at every lift. Nuclear density gauges, Proctor curves, and proof-roll documentation in daily reports.' },
  { title: 'Documentation', description: 'Daily field reports, photo logs, material certifications, and as-built records. Full digital documentation package delivered at project closeout.' },
]

export const galleryImages: string[] = [
  'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
  'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80',
  'https://images.unsplash.com/photo-1541888946425-d81bb2c88ea5?w=800&q=80',
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
  'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80',
]

export const navLinks = [
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Process', href: '#process' },
  { label: 'Equipment', href: '#equipment' },
  { label: 'Projects', href: '#projects' },
  { label: 'Safety', href: '#safety' },
  { label: 'Contact', href: '#contact' },
]
