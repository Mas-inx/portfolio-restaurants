export const emergencyIssues = [
  { id: 1, title: 'No Cooling', desc: 'AC stopped blowing cold air in extreme heat. We prioritize these calls — same-day guaranteed.', icon: '🥵', urgency: 'Critical' },
  { id: 2, title: 'No Heat', desc: 'Furnace or heat pump failure during freezing temps. We dispatch immediately, 24/7.', icon: '🥶', urgency: 'Critical' },
  { id: 3, title: 'Water Leaking', desc: 'Condensate line clog or coil freeze causing water damage. Fast response prevents costly repairs.', icon: '💧', urgency: 'High' },
  { id: 4, title: 'Burning Smell', desc: 'Electrical burning odor from your HVAC unit. Turn off system and call — we arrive within 60 minutes.', icon: '⚠️', urgency: 'Emergency' },
  { id: 5, title: 'Frozen Coil', desc: 'Ice buildup on outdoor or indoor coil signals airflow or refrigerant issues. We diagnose and fix same-day.', icon: '🧊', urgency: 'High' },
  { id: 6, title: 'System Not Running', desc: 'Complete system failure — no response from thermostat or unit. Emergency dispatch available.', icon: '🔧', urgency: 'Critical' },
];

export const dispatchSteps = [
  { step: 1, title: 'You Call', desc: 'Our dispatch center answers 24/7/365. No voicemail, no callbacks — a real person picks up.' },
  { step: 2, title: 'We Diagnose', desc: 'We ask targeted questions to understand the issue and prepare the right parts and tools.' },
  { step: 3, title: 'Technician Dispatched', desc: 'Nearest available truck is routed to your location with ETA communicated via text.' },
  { step: 4, title: 'Repair Completed', desc: 'Most emergency repairs are completed in under 2 hours. We test thoroughly before leaving.' },
  { step: 5, title: 'Follow-Up Confirmation', desc: 'We check in the next day to confirm everything is running smoothly. Satisfaction guaranteed.' },
];

export const safetyChecklist = [
  'Turn off your HVAC system at the thermostat and breaker',
  'Check your air filter — a clogged filter causes many issues',
  'Ensure all vents and registers are open and unobstructed',
  'Check the outdoor unit for debris, ice, or damage',
  'Verify your thermostat has power (replace batteries if needed)',
  'For gas furnaces: check if the pilot light is on (no flame = call us)',
  'For suspected gas leak: leave immediately and call 911, then us',
];

export const truckEquipment = [
  'Compressors & Condensers', 'Blower Motors & Fans', 'Capacitors & Contactors',
  'Refrigerant (R-410A, R-32)', 'Thermostats & Control Boards', 'Gas Valves & Ignitors',
  'Duct tape, Sealants, Insulation', 'Drain Pans & Lines', 'Electrical Wiring & Breakers',
];

export const pricing = {
  diagnosticFee: 79,
  afterHoursFee: 129,
  emergencyTripFee: 149,
  note: 'Diagnostic fee is waived if you choose us for the repair. After-hours fee applies to calls between 8pm and 7am.',
};

export const heroImage = 'https://images.unsplash.com/photo-1595508064774-1cb225a0a72e?w=1600&q=85';

export const coverageCities = [
  'Denver', 'Aurora', 'Lakewood', 'Englewood', 'Littleton',
  'Centennial', 'Highlands Ranch', 'Parker', 'Castle Rock', 'Thornton',
  'Westminster', 'Arvada', 'Wheat Ridge', 'Golden', 'Broomfield',
];

const data = { emergencyIssues, dispatchSteps, safetyChecklist, truckEquipment, pricing, coverageCities };
export default data;
