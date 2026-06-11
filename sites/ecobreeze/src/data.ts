export const efficiencyServices = [
  { id: 1, title: 'High-Efficiency AC Units', desc: 'SEER2 16–26 systems that cut cooling costs by 30–50% compared to older units.', icon: '🌬️' },
  { id: 2, title: 'Heat Pump Systems', desc: 'All-electric heat pumps for year-round efficiency — heating and cooling in one system.', icon: '🔄' },
  { id: 3, title: 'Smart Thermostats', desc: 'AI-powered thermostats that learn your schedule and optimize energy use automatically.', icon: '📱' },
  { id: 4, title: 'Duct Sealing & Optimization', desc: 'Seal leaky ducts that waste up to 30% of conditioned air. Pressure testing included.', icon: '🔗' },
  { id: 5, title: 'Air Sealing & Insulation', desc: 'Reduce thermal load with strategic air sealing and attic insulation upgrades.', icon: '🏠' },
  { id: 6, title: 'Eco Maintenance Plans', desc: 'Quarterly tune-ups optimized for peak efficiency — clean coils, proper charge, airflow check.', icon: '📋' },
];

export const upgradeSteps = [
  { step: 1, title: 'Energy Audit', desc: 'We perform a complete home energy assessment with blower door testing and thermal imaging.' },
  { step: 2, title: 'Custom Recommendations', desc: 'Based on your home, climate, and budget, we design an efficiency upgrade package with clear ROI.' },
  { step: 3, title: 'Professional Installation', desc: 'Certified installers follow manufacturer best practices for maximum rated efficiency.' },
  { step: 4, title: 'Performance Optimization', desc: 'We verify airflow, refrigerant charge, and duct static pressure to ensure peak operation.' },
];

export const smartFeatures = [
  { title: 'Remote Monitoring', desc: 'View your system status, temperature, and energy use from anywhere via our app.' },
  { title: 'Zoned Comfort', desc: 'Separate temperature zones for different areas of your home — no more fighting over the thermostat.' },
  { title: 'Adaptive Learning', desc: 'Your system learns your habits and adjusts automatically to save energy while you sleep or away.' },
  { title: 'Energy Reports', desc: 'Monthly breakdown of your HVAC energy usage with personalized savings recommendations.' },
];

export const rebates = [
  { name: 'Federal Tax Credit', amount: 'Up to $2,000', desc: '25C tax credit for qualifying high-efficiency heat pumps and AC systems.' },
  { name: 'State Rebate Program', amount: 'Up to $1,500', desc: 'Colorado Energy Office rebates for qualifying efficiency upgrades.' },
  { name: 'Utility Rebates', amount: 'Up to $800', desc: 'Xcel Energy and local utility rebates for smart thermostats and efficient equipment.' },
  { name: 'EcoBreeze Bonus', amount: '$300', desc: 'Additional discount when you bundle a system upgrade with duct sealing.' },
];

export const caseExamples = [
  { name: 'The Miller Home', location: 'Denver, CO', savings: '42%', yearBuilt: 1998, summary: 'Replaced 14 SEER AC with 20 SEER2 heat pump + smart thermostat. Annual savings: $680.' },
  { name: 'The Patel Home', location: 'Boulder, CO', savings: '35%', yearBuilt: 2005, summary: 'Duct sealing + attic insulation + programmable thermostat. Annual savings: $520.' },
  { name: 'The Chen Home', location: 'Littleton, CO', savings: '48%', yearBuilt: 1987, summary: 'Full system replacement with 22 SEER2 AC, zoning, and solar-ready heat pump. Annual savings: $940.' },
];

const data = { efficiencyServices, upgradeSteps, smartFeatures, rebates, caseExamples };
export default data;
