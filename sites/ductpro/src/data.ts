export interface Service {
  title: string
  description: string
  icon: string
}

export interface Industry {
  name: string
  description: string
  icon: string
}

export interface ProgramStep {
  step: string
  title: string
  description: string
  details: string
}

export interface ReportMetric {
  label: string
  value: string
  change: string
  positive: boolean
}

export interface ComplianceItem {
  title: string
  description: string
}

export interface ResponseTier {
  tier: string
  label: string
  description: string
  responseTime: string
}

export const siteInfo = {
  name: 'DuctPro Commercial HVAC',
  tagline: 'Commercial HVAC maintained before downtime starts',
  shortTagline: 'Preventive HVAC · Refrigeration · Ventilation',
  phone: '(312) 555-0729',
  email: 'service@ductprochicago.com',
  address: '2345 W Belmont Ave, Chicago, IL 60618',
  yearsExperience: 22,
  technicians: 45,
  contractsManaged: 380,
  responseTimeAvg: '2.4 hours',
  emergencyAvailable: true,
}

export const services: Service[] = [
  {
    title: 'Rooftop Units (RTU)',
    description:
      'Installation, maintenance, and repair of packaged rooftop HVAC units from 3–50 tons. Economizer setups, gas/electric, and heat pump configurations.',
    icon: '🏗️',
  },
  {
    title: 'Preventive Maintenance',
    description:
      'Quarterly and semi-annual inspection programs covering coils, filters, belts, bearings, refrigerant charge, electrical connections, and drain pans.',
    icon: '📋',
  },
  {
    title: 'Filter Replacement Programs',
    description:
      'Custom filter schedules with auto-shipment and change-out verification. MERV 8–16, HEPA, and carbon filter options for every system type.',
    icon: '🔄',
  },
  {
    title: 'Refrigeration Systems',
    description:
      'Commercial refrigeration maintenance for walk-ins, reach-ins, ice machines, and display cases. Evaporator/condenser coil cleaning, refrigerant recovery.',
    icon: '❄️',
  },
  {
    title: 'Ventilation & Exhaust',
    description:
      'Kitchen exhaust hood cleaning, bathroom exhaust, makeup air units, and energy recovery ventilators (ERVs). CFM verification per code.',
    icon: '💨',
  },
  {
    title: 'Emergency Repairs',
    description:
      '24/7 emergency service for compressor failures, refrigerant leaks, no-cooling calls, and electrical faults. Same-day dispatch for priority accounts.',
    icon: '⚡',
  },
]

export const industries: Industry[] = [
  {
    name: 'Restaurants & Food Service',
    description:
      'Kitchen exhaust, walk-in coolers, ice machines, and dining area comfort. Hood cleaning certifications and health code compliance.',
    icon: '🍽️',
  },
  {
    name: 'Medical & Dental Offices',
    description:
      'Temperature-sensitive environments, infection control ventilation, pressure relationships, and AHU HEPA filtration for patient areas.',
    icon: '🏥',
  },
  {
    name: 'Retail & Shopping Centers',
    description:
      'Multi-tenant RTU management, common area HVAC, and individualized tenant billing. Coordinated maintenance with minimal business disruption.',
    icon: '🛍️',
  },
  {
    name: 'Warehouses & Distribution',
    description:
      'High-bay heating, dock door make-up air, mezzanine cooling, and humidity control for inventory protection and worker comfort.',
    icon: '📦',
  },
  {
    name: 'Office Buildings',
    description:
      'VAV systems, central plants, cooling towers, and tenant fit-outs. BAS integration for optimized scheduling and energy reporting.',
    icon: '🏢',
  },
]

export const programSteps: ProgramStep[] = [
  {
    step: '01',
    title: 'Quarterly Inspection',
    description:
      'Comprehensive inspection every 90 days covering all mechanical components, refrigerant levels, electrical connections, and safety controls.',
    details: 'Digital checklist with photo documentation. Report delivered within 24 hours.',
  },
  {
    step: '02',
    title: 'Detailed Reporting',
    description:
      'After each visit you receive a full service report with equipment status, filter readings, refrigerant pressures, amp draws, and recommendations.',
    details: 'Online portal access to all historical reports and equipment documentation.',
  },
  {
    step: '03',
    title: 'Priority Response',
    description:
      'Program members skip the queue. Emergency calls are dispatched to the nearest available tech with your equipment history pre-loaded.',
    details: 'Guaranteed same-day response for all priority-tier accounts.',
  },
  {
    step: '04',
    title: 'Annual Tune-Up',
    description:
      'Full system performance test, combustion analysis (gas units), coil cleaning, drain line flush, and refrigerant charge verification each year.',
    details: 'Includes a pre-season readiness check before cooling and heating seasons.',
  },
]

export const reportMetrics: ReportMetric[] = [
  { label: 'Units Under Contract', value: '184', change: '+12 this quarter', positive: true },
  { label: 'Preventive Compliance', value: '97.3%', change: '+2.1% YoY', positive: true },
  { label: 'Avg Response Time', value: '2.4 hrs', change: '-18 min vs last year', positive: true },
  { label: 'Emergency Calls', value: '43', change: 'this month', positive: true },
  { label: 'Filters Replaced', value: '2,847', change: 'YTD total', positive: true },
  { label: 'Customer Retention', value: '94%', change: 'industry avg: 82%', positive: true },
]

export const complianceItems: ComplianceItem[] = [
  {
    title: 'Indoor Air Quality (IAQ)',
    description: 'CO2 monitoring, MERV filter schedules, humidity control, and ventilation rate verification per ASHRAE 62.1.',
  },
  {
    title: 'Refrigerant Compliance',
    description: 'EPA Section 608 certified technicians. Leak rate tracking, recovery documentation, and phase-out transition planning.',
  },
  {
    title: 'Ventilation Code Compliance',
    description: 'CFM verification, hood exhaust testing, make-up air balancing, and documentation for health department inspections.',
  },
  {
    title: 'Documentation & Record Keeping',
    description: 'Complete digital trail: inspection reports, filter logs, refrigerant records, and equipment history for audits and insurance.',
  },
]

export const responseTiers: ResponseTier[] = [
  {
    tier: 'Tier 1',
    label: 'Priority — Maintenance Program',
    description: 'Guaranteed same-day dispatch. Dedicated account manager. Quarterly reporting. Auto-ship filters.',
    responseTime: '< 4 hours',
  },
  {
    tier: 'Tier 2',
    label: 'Standard — Commercial Account',
    description: 'Next-business-day dispatch for non-emergency. Online portal access. Per-visit reporting.',
    responseTime: '< 24 hours',
  },
  {
    tier: 'Tier 3',
    label: 'On-Demand — Per Call',
    description: 'Per-incident pricing. Standard dispatch priority. Basic service report provided.',
    responseTime: '< 48 hours',
  },
]

export const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Industries', href: '#industries' },
  { label: 'Program', href: '#program' },
  { label: 'Reporting', href: '#reporting' },
  { label: 'Response Plans', href: '#response' },
  { label: 'Contact', href: '#contact' },
]
