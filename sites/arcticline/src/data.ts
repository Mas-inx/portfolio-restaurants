export interface Service {
  id: number;
  title: string;
  desc: string;
  icon: string;
}

export interface Plan {
  tier: string;
  price: number;
  per: string;
  features: string[];
  popular?: boolean;
}

export interface Step {
  step: number;
  title: string;
  desc: string;
}

export interface WhyChooseUs {
  title: string;
  desc: string;
  icon: string;
}

export const services: Service[] = [
  { id: 1, title: 'AC Repair & Service', desc: 'Fast diagnosis and repair for all central AC, ductless mini-splits, and heat pumps. Same-day available.', icon: 'snowflake' },
  { id: 2, title: 'Heating Repair', desc: 'Furnace, boiler, and heat pump repair from NATE-certified technicians. Reliable heat when you need it.', icon: 'flame' },
  { id: 3, title: 'System Installation', desc: 'Expert sizing, selection, and installation of high-efficiency HVAC systems. Free consultation.', icon: 'gear' },
  { id: 4, title: 'Maintenance Plans', desc: 'Annual tune-ups keep your system running efficiently and catch problems before they start.', icon: 'clipboard' },
  { id: 5, title: 'Indoor Air Quality', desc: 'Air purifiers, humidifiers, ventilators, and UV lights for cleaner, healthier indoor air.', icon: 'wind' },
  { id: 6, title: 'Smart Thermostats', desc: 'Installation and setup of Nest, Ecobee, and other smart thermostats for better comfort and savings.', icon: 'smartphone' },
];

export const maintenancePlans: Plan[] = [
  { tier: 'Basic', price: 149, per: 'year', features: ['Annual system inspection', 'Filter replacement', 'Basic cleaning', 'Priority scheduling', '10% repair discount'] },
  { tier: 'Premium', price: 299, per: 'year', features: ['Everything in Basic', 'Two inspections per year', 'Duct inspection', '15% repair discount', 'No overtime charges', 'Free thermostat battery'], popular: true },
  { tier: 'Platinum', price: 499, per: 'year', features: ['Everything in Premium', 'Priority 24/7 service', '25% repair discount', 'Free diagnostic calls', 'Annual coil cleaning', 'Parts warranty extension', 'Seasonal tune-up reminders'] },
];

export const replacementSteps: Step[] = [
  { step: 1, title: 'Free Consultation', desc: 'We visit your home, assess your current system, and discuss your comfort goals and budget.' },
  { step: 2, title: 'Load Calculation', desc: 'Manual J calculation ensures your new system is perfectly sized for your home\'s heating and cooling load.' },
  { step: 3, title: 'Professional Installation', desc: 'Licensed installers handle every detail; from proper refrigerant charge to duct sealing and electrical.' },
  { step: 4, title: 'Warranty & Follow-up', desc: '10-year parts warranty, 2-year labor warranty, and a follow-up visit to verify performance.' },
];

export const whyChooseUs: WhyChooseUs[] = [
  { title: 'Licensed & Insured Techs', desc: 'Every technician is NATE-certified, background-checked, and fully insured for your peace of mind.', icon: 'shield' },
  { title: 'Upfront, Flat-Rate Pricing', desc: 'You get a clear price before we start any work. No surprises, no hidden fees, no hourly games.', icon: 'dollar' },
  { title: 'Fully Stocked Trucks', desc: 'Our vans carry 95% of common parts so most repairs are completed in a single visit.', icon: 'truck' },
  { title: 'Clean Work Guarantee', desc: 'We wear boot covers, use drop cloths, and clean up completely. Your home stays as clean as we found it.', icon: 'star' },
  { title: 'Same-Day Service', desc: 'Call before noon and we\'ll have a technician at your door the same day in most areas.', icon: 'clock' },
];

export const serviceAreas: string[] = [
  'Denver Metro', 'Boulder', 'Aurora', 'Lakewood', 'Arvada',
  'Westminster', 'Thornton', 'Centennial', 'Highlands Ranch', 'Littleton',
];

export const heroImage = 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=1600&q=85';
