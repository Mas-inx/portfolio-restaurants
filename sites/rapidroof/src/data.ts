export interface RoofingService {
  title: string
  description: string
  icon: string
  urgent?: boolean
}

export interface InspectionStep {
  step: string
  title: string
  description: string
  icon: string
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
  founded: 2011,
  license: 'IL-RC-40123',
  insurance: '$2M Liability + Workers Comp',
  yearsExperience: 14,
  reviews: 480,
  rating: 4.8,
}

export const services: RoofingService[] = [
  {
    title: 'Emergency Roof Repair',
    description:
      'Storm damage, leaks, fallen debris — we respond within 4 hours with temporary tarping and damage mitigation. 24/7 dispatch.',
    icon: '🚨',
    urgent: true,
  },
  {
    title: 'Full Roof Replacement',
    description:
      'Complete tear-off and replacement for asphalt shingle, metal, tile, and flat roofing systems. Includes underlayment, flashing, and ventilation.',
    icon: '🏠',
  },
  {
    title: 'Gutter Installation & Repair',
    description:
      'Seamless aluminum gutters, gutter guards, downspout extensions, and repair of sagging or leaking sections. Free estimates.',
    icon: '⬇️',
  },
  {
    title: 'Siding Repair & Replacement',
    description:
      'Vinyl, fiber cement, wood, and engineered siding. Sections repaired or full re-side. Matched to existing or fully new exterior look.',
    icon: '🧱',
  },
  {
    title: 'Storm Damage Assessment',
    description:
      'Detailed inspection and photo documentation for insurance claims. We work directly with adjusters to ensure fair coverage.',
    icon: '🌪️',
  },
  {
    title: 'Leak Detection & Repair',
    description:
      'Hard-to-find leaks traced to source using moisture meters and infrared scanning. No guesswork — just precise repair.',
    icon: '🔍',
  },
]

export const inspectionSteps: InspectionStep[] = [
  {
    step: '01', title: 'Book Online or Call', description: 'Schedule a same-day or next-day inspection. Emergency calls are answered 24/7 by a live dispatcher.', icon: '📞',
  },
  {
    step: '02', title: 'Thorough Inspection', description: 'We inspect roof, gutters, flashing, soffit, fascia, and attic ventilation. Photo documentation included.', icon: '🔦',
  },
  {
    step: '03', title: 'Detailed Quote', description: 'You receive a written estimate with photos, material breakdown, timeline, and warranty terms before any work begins.', icon: '📋',
  },
  {
    step: '04', title: 'Repair or Replace', description: 'Work is scheduled within 48 hours for repairs. Full replacements are typically completed in 1–3 days.', icon: '🔨',
  },
]

export const repairSigns: RepairSign[] = [
  { title: 'Water Stains on Ceilings', description: 'Brown or yellow spots on interior ceilings indicate an active roof leak that needs immediate attention.', severity: 'high' },
  { title: 'Missing or Curled Shingles', description: 'Granules in gutters, cracked or missing shingles expose your roof deck to water damage.', severity: 'high' },
  { title: 'Sagging Gutters', description: 'Gutters pulling away from the fascia or pooling water can lead to foundation damage and basement flooding.', severity: 'medium' },
  { title: 'Daylight Through Roof Boards', description: 'If you can see daylight from the attic, your roof deck has deteriorated and needs replacement.', severity: 'critical' },
  { title: 'Hail Damage', description: 'Bruised or dented shingles, damaged flashing, and dented metal vents — often not visible from the ground.', severity: 'medium' },
  { title: 'Granule Loss', description: 'Excessive granules in downspouts and gutters means shingles are approaching end of life.', severity: 'medium' },
  { title: 'Moss or Algae Growth', description: 'Traps moisture against shingles, accelerating deterioration. Needs cleaning and preventative treatment.', severity: 'medium' },
  { title: 'Ice Dams in Winter', description: 'Ice buildup at eaves indicates poor attic ventilation and insulation, leading to water backup under shingles.', severity: 'high' },
]

export const beforeAfterRepairs: BeforeAfterRepair[] = [
  {
    title: 'Lincoln Park Roof Replacement',
    before: 'https://images.unsplash.com/photo-1631952112740-0f14afdf42f2?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1631952112740-0f14afdf42f2?w=800&q=80',
    description: 'Original 20-year asphalt shingle roof with extensive granule loss, curled shingles, and multiple active leaks. Full replacement with architectural shingles, new flashing, and ridge vent.',
  },
  {
    title: 'Wicker Park Gutter Repair',
    before: 'https://images.unsplash.com/photo-1590624750255-e5a1e3cd5c88?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1590624750255-e5a1e3cd5c88?w=800&q=80',
    description: 'Sagging gutters pulling away from fascia, with downspout blockages causing foundation water pooling. Full replacement with seamless aluminum gutters and gutter guards.',
  },
  {
    title: 'Logan Square Storm Repair',
    before: 'https://images.unsplash.com/photo-1631952112740-0f14afdf42f2?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1631952112740-0f14afdf42f2?w=800&q=80',
    description: 'After a severe thunderstorm with 60mph winds, multiple shingles were torn off and a section of flashing was compromised. Emergency tarp applied same day, full repair completed in 2 days.',
  },
  {
    title: 'Humboldt Park Siding Replacement',
    before: 'https://images.unsplash.com/photo-1590624750255-e5a1e3cd5c88?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1590624750255-e5a1e3cd5c88?w=800&q=80',
    description: 'Damaged vinyl siding with cracks, fading, and water infiltration behind panels. Replaced with fiber cement siding for improved durability and curb appeal.',
  },
]

export const trustPoints = [
  { title: 'Licensed & Insured', description: 'Illinois licensed roofing contractor with $2M liability coverage and full workers compensation.', icon: '📜' },
  { title: 'Warranty Backed', description: 'All work carries a minimum 5-year workmanship warranty. Manufacturer warranties on materials up to 50 years.', icon: '🛡️' },
  { title: 'Rapid Response', description: 'Emergency calls answered 24/7. On-site within 4 hours for urgent repairs. No voicemail — you get a person.', icon: '⚡' },
  { title: 'Insurance Friendly', description: 'We document everything for your claim and work directly with your adjuster. Most claims approved within a week.', icon: '✓' },
  { title: 'Free Estimates', description: 'All inspections and estimates are free. No obligation, no pressure, no hidden fees.', icon: '💰' },
  { title: '4.8 Stars, 480+ Reviews', description: 'Rated 4.8 across Google, Yelp, and Angi. Every review is a real homeowner we served.', icon: '⭐' },
]

export const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'How It Works', href: '#inspection' },
  { label: 'Signs You Need Repair', href: '#signs' },
  { label: 'Before & After', href: '#portfolio' },
  { label: 'Reviews', href: '#trust' },
  { label: 'Contact', href: '#contact' },
]
