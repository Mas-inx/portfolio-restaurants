export interface Problem {
  title: string;
  description: string;
  icon: string;
}

export interface Solution {
  title: string;
  description: string;
  icon: string;
}

export interface AssessmentStep {
  step: string;
  title: string;
  description: string;
  details: string;
}

export interface SystemLayer {
  name: string;
  description: string;
  items: string[];
}

export interface Product {
  name: string;
  category: string;
  description: string;
  coverage: string;
  features: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const siteInfo = {
  name: 'PureAir Indoor Comfort',
  tagline: 'Breathe cleaner air at home',
  shortTagline: 'Air Quality Assessments · Purification · Healthy Home Systems',
  phone: '(773) 555-0941',
  email: 'hello@pureairchicago.com',
  address: '3421 N Lincoln Ave, Chicago, IL 60657',
  yearsExperience: 14,
  homesServiced: 4200,
  certifiedTechnicians: 18,
  satisfaction: '98%',
  heroImage: 'https://images.unsplash.com/photo-1584636631976-77cb241f05c8?w=1600&q=85',
};

export const problems: Problem[] = [
  { title: 'Excess Dust', description: 'Fine dust particles accumulate on surfaces and in HVAC systems. Caused by construction, outdoor infiltration, and inadequate filtration. Triggers sneezing and respiratory irritation.', icon: 'wind' },
  { title: 'Seasonal Allergies', description: 'Pollen, mold spores, and pet dander circulate through your home. Standard HVAC filters capture only the largest particles, leaving allergens in your breathing air.', icon: 'leaf' },
  { title: 'Humidity Imbalance', description: 'Too much humidity promotes mold and dust mites. Too little causes dry skin, static shock, and respiratory discomfort. Ideal range: 40-60% relative humidity.', icon: 'droplet' },
  { title: 'Mold & Mildew', description: 'Moisture in bathrooms, basements, and crawl spaces leads to mold growth. Spores become airborne and can cause serious respiratory issues for occupants.', icon: 'alert' },
  { title: 'Persistent Odors', description: 'Cooking smells, pet odors, smoke, and VOC off-gassing from furniture and paint linger in indoor air. Standard ventilation alone is rarely sufficient.', icon: 'nose' },
  { title: 'Poor Ventilation', description: 'Modern energy-efficient homes are tightly sealed. Without adequate mechanical ventilation, CO2 builds up and indoor pollutants have no way out.', icon: 'home' },
];

export const solutions: Solution[] = [
  { title: 'Whole-Home Air Purifiers', description: 'In-duct air purifiers that capture 99.97% of particles down to 0.3 microns. HEPA and carbon filtration for allergens, VOCs, and odors.', icon: 'filter' },
  { title: 'Filtration Upgrades', description: 'Upgrade from standard MERV 8 to MERV 13 or HEPA. Media cabinet conversions for deeper filter beds and lower airflow resistance.', icon: 'layers' },
  { title: 'Humidifiers & Dehumidifiers', description: 'Whole-home steam humidifiers and dehumidifiers integrated with your HVAC system. Precise humidity control for every season.', icon: 'droplet' },
  { title: 'Duct Cleaning & Sealing', description: 'Professional duct cleaning with HEPA vacuum agitation. Duct sealing for leaky systems that draw in attic/crawlspace contaminants.', icon: 'wind' },
  { title: 'UV Germicidal Lights', description: 'UV-C lights installed in the HVAC system to neutralize mold, bacteria, and viruses on coils and in the airstream. Keeps coils clean and air sanitary.', icon: 'sun' },
  { title: 'HRV/ERV Ventilation', description: 'Heat recovery and energy recovery ventilators that bring in fresh outdoor air while retaining heating and cooling energy. Balanced ventilation year-round.', icon: 'refresh' },
];

export const assessmentSteps: AssessmentStep[] = [
  { step: '01', title: 'Home Walkthrough', description: 'Our technician tours every room, noting odors, visible mold, humidity levels, and occupant health concerns mentioned during the consultation.', details: 'Infrared thermometer, hygrometer, and visual inspection used throughout.' },
  { step: '02', title: 'HVAC System Evaluation', description: 'We inspect your furnace, air handler, evaporator coil, ductwork, and filter cabinet. Measure static pressure, temperature drop, and airflow.', details: 'Blower door test and duct leakage test performed when needed.' },
  { step: '03', title: 'Air Quality Testing', description: 'In-home particulate counts, CO2 levels, humidity readings, and VOC screening. Lab analysis for mold spore identification if suspected.', details: 'Real-time readings displayed on our diagnostic tablet. You see the data as we collect it.' },
  { step: '04', title: 'Recommendation Report', description: 'Customized action plan with prioritized solutions. Includes product recommendations, installation timeline, and expected air quality improvements.', details: 'Follow-up testing available 30 days post-installation to verify improvement.' },
];

export const systemLayers: SystemLayer[] = [
  { name: 'Source Control', description: 'Eliminate pollutants at their origin', items: ['Duct sealing to prevent attic/crawlspace infiltration', 'Kitchen exhaust ventilation rated for your range', 'Bathroom exhaust fans vented to outside, not attic', 'Radon mitigation if levels exceed EPA action threshold'] },
  { name: 'Filtration', description: 'Capture airborne particles before they circulate', items: ['MERV 13 or HEPA media filter cabinet', 'UV-C germicidal light on the evaporator coil', 'Carbon pre-filter for VOC and odor reduction', 'Whole-home air purifier with activated carbon'] },
  { name: 'Humidity Control', description: 'Maintain ideal 40-60% range year-round', items: ['Steam humidifier integrated with furnace', 'Whole-home dehumidifier for summer and shoulder seasons', 'Smart humidity sensor with automatic setpoint adjustment', 'Drain line maintenance to prevent mold in the unit'] },
  { name: 'Fresh Air Ventilation', description: 'Bring in filtered outdoor air mechanically', items: ['HRV or ERV for balanced ventilation', 'CO2-sensing demand-controlled ventilation', 'Motorized damper with economizer control', 'Air cycler for mild-weather fresh air'] },
];

export const products: Product[] = [
  { name: 'PureAir P500 Whole-Home Purifier', category: 'Air Purifier', description: 'In-duct 4-in-1 filtration: pre-filter, HEPA, activated carbon, and UV-C. Captures particles, VOCs, and neutralizes biological contaminants.', coverage: 'Up to 5,000 sq ft', features: ['99.97% HEPA efficiency at 0.3 microns', 'Carbon filter for VOCs and odors', 'UV-C lamp for coil sterilization', '10-year warranty on housing'] },
  { name: 'PureAir P3000 Media Cabinet', category: 'Filtration Upgrade', description: 'Deep-pleat MERV 13 media filter cabinet. 4-5x more filter surface area than standard 1" filters. Compatible with any HVAC system.', coverage: 'Up to 4,000 sq ft', features: ['MERV 13 initial efficiency, 8 at final', '5" deep pleated media, changed annually', 'Low pressure drop for efficient airflow', 'Universal fit with transition kit'] },
  { name: 'PureAir Steam Humidifier', category: 'Humidifier', description: 'Whole-home steam humidifier with auto-flush and self-cleaning cycle. Directly injects steam into supply duct for even distribution.', coverage: 'Up to 4,500 sq ft', features: ['12 gallons/day capacity', 'Auto-adaptive to outdoor temperature', 'Digital humidity display with setpoint', 'Low maintenance with auto-flush'] },
  { name: 'PureAir UV-C Germicidal Light', category: 'UV Light', description: 'High-output UV-C lamp installed downstream of the evaporator coil. 24/7 operation neutralizes mold and bacteria growth on wet surfaces.', coverage: 'Single unit: up to 5-ton system', features: ['254nm UV-C wavelength', 'Reflector shield for 360-degree coverage', 'Easy installation with magnetic mount', 'Annual bulb replacement reminder'] },
];

export const faq: FAQItem[] = [
  { question: 'How often should I change my home air filter?', answer: 'Standard 1" MERV 8 filters should be changed every 1-3 months. Higher-efficiency media filters (MERV 13, 5" deep) last 6-12 months but should be checked quarterly. We recommend signing up for filter auto-ship to never miss a change.' },
  { question: 'What is the ideal indoor humidity level?', answer: 'The EPA recommends maintaining indoor relative humidity between 40% and 60%. Above 60% promotes mold and dust mite growth. Below 30% causes dry skin, static electricity, and respiratory irritation.' },
  { question: 'Do air purifiers really work for allergies?', answer: 'Yes. Whole-home air purifiers with HEPA filtration can capture 99.97% of airborne particles including pollen, pet dander, and dust mite debris. Combined with proper humidity control, many allergy sufferers see significant symptom improvement within 2-4 weeks.' },
  { question: 'Is duct cleaning necessary?', answer: 'Duct cleaning is recommended if you have visible mold in ducts, vermin infestation, excessive dust blowing from registers, or after a renovation project. For most homes, proper filtration and sealing are more impactful than cleaning.' },
  { question: 'How long does an air quality assessment take?', answer: 'A standard assessment takes 60-90 minutes depending on home size and HVAC system complexity. You receive a written report with test results and recommendations within 48 hours of the visit.' },
  { question: 'What is the difference between HRV and ERV?', answer: 'Both bring in fresh outdoor air while recovering heating/cooling energy. An HRV transfers heat only, while an ERV also transfers moisture, making it better for humid summers. We recommend ERV for Chicago\'s climate.' },
];

export const navLinks = [
  { label: 'Problems', href: '#problems' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Assessment', href: '#assessment' },
  { label: 'Products', href: '#products' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];
