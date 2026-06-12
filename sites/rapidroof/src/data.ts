export interface RoofingService {
  title: string
  description: string
  checks: string[]
  urgent?: boolean
}

export interface InspectionStep {
  step: string
  title: string
  description: string
}

export interface RepairSign {
  title: string
  description: string
  severity: 'medium' | 'high' | 'critical'
}

export interface BeforeAfterRepair {
  title: string
  before: string
  after: string
  description: string
}

export const siteInfo = {
  name: 'RapidRoof & Exteriors',
  tagline: 'Roof problems handled before they become expensive',
  shortTagline: 'Emergency Roofing & Exterior Repair',
  phone: '(312) 555-0462',
  emergencyPhone: '(312) 555-0999',
  email: 'dispatch@rapidroof.com',
  address: '2345 W Grand Ave, Chicago, IL 60612',
  license: 'IL-RC-40123',
  yearsExperience: 14,
  reviews: 480,
  rating: 4.8,
}

export const services: RoofingService[] = [
  {
    title: 'Roof Repair',
    description: 'Fast, reliable repairs for leaks, storm damage, and worn areas. We match your existing materials or upgrade as needed.',
    checks: ['Leak detection and sealing', 'Shingle replacement', 'Flashing and boot repair', '24/7 emergency response available'],
  },
  {
    title: 'Roof Replacement',
    description: 'Complete tear-off and installation of new roofing systems. Asphalt shingle, metal, tile, and flat roof options available.',
    checks: ['Full tear-off and disposal', 'Underlayment and ice shield', 'Ridge vent installation', 'Manufacturer warranties up to 50 years'],
  },
  {
    title: 'Gutters and Downspouts',
    description: 'Seamless aluminum gutters and downspouts keep water away from your foundation and protect your landscaping.',
    checks: ['Seamless aluminum gutters', 'Gutter guard protection', 'Downspout extensions and drainage', 'Fascia and soffit repair'],
  },
  {
    title: 'Siding Installation',
    description: 'Vinyl, fiber cement, and engineered wood siding that transforms your home appearance and improves insulation.',
    checks: ['Fiber cement (HardiePlank)', 'Vinyl and engineered wood', 'Trim and soffit color matching', 'Full or partial re-side'],
  },
  {
    title: 'Storm Damage Repair',
    description: 'Post-storm tarping, damage documentation, and insurance claim support. We work directly with your adjuster from start to finish.',
    checks: ['Emergency tarp service', 'Insurance documentation package', 'Adjuster coordination', 'Code-compliant restoration'],
    urgent: true,
  },
  {
    title: 'Leak Detection',
    description: 'Advanced moisture mapping and infrared inspection to find the source of leaks without destructive probing or guesswork.',
    checks: ['Infrared moisture mapping', 'Non-destructive testing', 'Attic and crawlspace inspection', 'Written report with photos'],
  },
]

export const stormSteps: InspectionStep[] = [
  { step: '01', title: 'Call Us Now', description: 'Our dispatch team answers 24/7. No voicemail, no call centers. A real person takes your call and dispatches a crew.' },
  { step: '02', title: 'Emergency Tarp', description: 'We arrive within 4 hours to apply temporary tarping and secure your property. We document the damage for your insurance.' },
  { step: '03', title: 'Insurance Liaison', description: 'Our team meets your adjuster on-site, provides damage documentation, and advocates for full coverage of your claim.' },
  { step: '04', title: 'Permanent Repair', description: 'Once the claim is approved, we schedule the permanent repair. Most jobs are completed within 48 hours of approval.' },
]

export const repairSigns: RepairSign[] = [
  { title: 'Water Stains on Ceilings', description: 'Brown or yellow spots on interior ceilings indicate an active roof leak that needs immediate attention.', severity: 'high' },
  { title: 'Missing or Curled Shingles', description: 'Granules in gutters, cracked or missing shingles expose your roof deck to water damage.', severity: 'high' },
  { title: 'Daylight Through Roof Boards', description: 'If you can see daylight from the attic, your roof deck has deteriorated and needs replacement.', severity: 'critical' },
  { title: 'Sagging Gutters', description: 'Gutters pulling away from the fascia or pooling water can lead to foundation damage.', severity: 'medium' },
  { title: 'Hail Damage', description: 'Bruised or dented shingles, damaged flashing. Often not visible from the ground. Free inspection available.', severity: 'medium' },
  { title: 'Ice Dams in Winter', description: 'Ice buildup at eaves indicates poor attic ventilation, leading to water backup under shingles.', severity: 'high' },
]

export const beforeAfterRepairs: BeforeAfterRepair[] = [
  {
    title: 'Lincoln Park Roof Replacement',
    before: 'https://images.unsplash.com/photo-1631952112740-0f14afdf42f2?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1590674899484-d5640d854c2c?w=800&q=80',
    description: 'Original 20-year asphalt shingle roof with extensive granule loss and curled shingles. Full replacement with architectural shingles and ridge vent.',
  },
  {
    title: 'Wicker Park Gutter Repair',
    before: 'https://images.unsplash.com/photo-1590624750255-e5a1e3cd5c88?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    description: 'Sagging gutters pulling away from fascia causing foundation water pooling. Replacement with seamless aluminum gutters and gutter guards.',
  },
  {
    title: 'Logan Square Storm Repair',
    before: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1590674899484-d5640d854c2c?w=800&q=80',
    description: 'After 60mph winds tore off multiple shingles and compromised flashing. Emergency tarp applied same day, full repair completed in 48 hours.',
  },
]

export const trustPoints = [
  { title: 'Licensed and Insured', description: 'Illinois licensed roofing contractor with $2M liability coverage and full workers compensation insurance.' },
  { title: 'Warranty Backed', description: 'All work carries a minimum 5-year workmanship warranty. Manufacturer warranties on materials up to 50 years.' },
  { title: '500+ Roofs Completed', description: 'Over 500 residential and commercial roofs installed or repaired. Proven experience on every type of roof system.' },
  { title: 'Free Estimates', description: 'All inspections and estimates are free. No obligation, no pressure, no hidden fees. Same-day quotes available.' },
]

export const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Storm Damage', href: '#storm' },
  { label: 'Before and After', href: '#portfolio' },
  { label: 'Signs You Need Repair', href: '#signs' },
  { label: 'Why Choose Us', href: '#trust' },
  { label: 'Free Estimate', href: '#contact' },
]
