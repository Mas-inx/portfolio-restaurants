import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============ ICON COMPONENT ============
function Icon({ name, className = 'w-6 h-6' }: { name: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    hexagon: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg>,
    snowflake: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="22" /><line x1="2" y1="12" x2="22" y2="12" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" /><line x1="19.07" y1="4.93" x2="4.93" y2="19.07" /></svg>,
    boiler: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2c0 1.5-2 3-2 5a4 4 0 0 0 8 0c0-2-2-3.5-2-5" /><path d="M12 22v-4" /><rect x="7" y="14" width="10" height="6" rx="1" /><path d="M5 20h14" /></svg>,
    exhaust: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" /></svg>,
    refrigeration: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" /><line x1="4" y1="10" x2="20" y2="10" /><line x1="10" y1="6" x2="10" y2="6.01" /><line x1="10" y1="14" x2="10" y2="14.01" /></svg>,
    ventilation: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><line x1="12" y1="2" x2="12" y2="8" /><line x1="12" y1="16" x2="12" y2="22" /><line x1="2" y1="12" x2="8" y2="12" /><line x1="16" y1="12" x2="22" y2="12" /></svg>,
    cooking: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 11h-4a4 4 0 0 0-4 4v1h12v-1a4 4 0 0 0-4-4z" /><path d="M17 3v4" /><path d="M11 3v4" /><path d="M7 3v4" /><line x1="3" y1="20" x2="21" y2="20" /></svg>,
    building: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="1" /><line x1="9" y1="6" x2="9" y2="6.01" /><line x1="15" y1="6" x2="15" y2="6.01" /><line x1="9" y1="10" x2="9" y2="10.01" /><line x1="15" y1="10" x2="15" y2="10.01" /><line x1="9" y1="14" x2="9" y2="14.01" /><line x1="15" y1="14" x2="15" y2="14.01" /><path d="M9 22v-4h6v4" /></svg>,
    hospital: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>,
    store: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l1-4h16l1 4" /><path d="M3 9a3 3 0 0 0 3 3 3 3 0 0 0 3-3" /><path d="M9 9a3 3 0 0 0 3 3 3 3 0 0 0 3-3" /><path d="M15 9a3 3 0 0 0 3 3 3 3 0 0 0 3-3" /><path d="M3 9v12h18V9" /><path d="M9 21v-6h6v6" /></svg>,
    factory: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20V8l6 4V8l6 4V8l6 4v8H2z" /><line x1="14" y1="4" x2="14" y2="8" /><line x1="18" y1="2" x2="18" y2="8" /></svg>,
    school: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" /></svg>,
  };
  return <>{icons[name] || null}</>;
}

// ============ DATA ============

const equipmentTypes = [
  { id: 'rtu', name: 'Rooftop Units', code: 'RTU', count: 47, operational: 44, warning: 2, critical: 1, icon: 'hexagon', description: 'Packaged rooftop HVAC systems for commercial buildings' },
  { id: 'chiller', name: 'Chillers', code: 'CH', count: 12, operational: 11, warning: 1, critical: 0, icon: 'snowflake', description: 'Centrifugal and scroll chillers for cooling loops' },
  { id: 'boiler', name: 'Boilers', code: 'BLR', count: 18, operational: 17, warning: 1, critical: 0, icon: 'boiler', description: 'High-efficiency condensing and steam boilers' },
  { id: 'exhaust', name: 'Exhaust Systems', code: 'EXH', count: 34, operational: 33, warning: 1, critical: 0, icon: 'exhaust', description: 'Kitchen, bathroom, and industrial exhaust fans' },
  { id: 'refrig', name: 'Refrigeration', code: 'REF', count: 23, operational: 21, warning: 1, critical: 1, icon: 'refrigeration', description: 'Walk-in coolers, freezers, and display cases' },
  { id: 'vent', name: 'Ventilation', code: 'VNT', count: 56, operational: 55, warning: 1, critical: 0, icon: 'ventilation', description: 'Makeup air units, ERVs, and DOAS systems' },
];

const maintenanceTasks = [
  { id: 1, type: 'Inspection', equipment: 'RTU-042', location: 'Building A, Roof', date: '2026-06-10', status: 'completed', tech: 'M. Torres' },
  { id: 2, type: 'Filter Change', equipment: 'CH-003', location: 'Building B, Mech Room', date: '2026-06-11', status: 'completed', tech: 'J. Park' },
  { id: 3, type: 'Belt Replacement', equipment: 'BLR-007', location: 'Building C, Basement', date: '2026-06-12', status: 'in-progress', tech: 'R. Chen' },
  { id: 4, type: 'Coil Cleaning', equipment: 'RTU-019', location: 'Building A, Roof', date: '2026-06-13', status: 'scheduled', tech: 'M. Torres' },
  { id: 5, type: 'Controls Check', equipment: 'VNT-028', location: 'Building D, Penthouse', date: '2026-06-14', status: 'scheduled', tech: 'A. Williams' },
  { id: 6, type: 'Refrigerant Check', equipment: 'REF-011', location: 'Building B, Kitchen', date: '2026-06-15', status: 'scheduled', tech: 'J. Park' },
  { id: 7, type: 'Bearing Lubrication', equipment: 'EXH-005', location: 'Building C, Roof', date: '2026-06-16', status: 'scheduled', tech: 'R. Chen' },
  { id: 8, type: 'Full PM', equipment: 'RTU-033', location: 'Building E, Roof', date: '2026-06-17', status: 'scheduled', tech: 'A. Williams' },
];

const industries = [
  { name: 'Restaurants', icon: 'cooking', requirements: 'Kitchen exhaust, hood suppression, walk-in cooling, grease management', sites: '240+' },
  { name: 'Office Buildings', icon: 'building', requirements: 'VAV systems, IAQ monitoring, tenant comfort, energy optimization', sites: '180+' },
  { name: 'Medical Clinics', icon: 'hospital', requirements: 'Positive/negative pressure, HEPA filtration, ASHRAE 170 compliance', sites: '95+' },
  { name: 'Retail Spaces', icon: 'store', requirements: 'Customer comfort, display refrigeration, after-hours setbacks', sites: '310+' },
  { name: 'Warehouses', icon: 'factory', requirements: 'High-volume ventilation, dock sealing, process cooling, destratification', sites: '75+' },
  { name: 'Schools', icon: 'school', requirements: 'ASHRAE 62.1 ventilation, MERV upgrades, CO₂ monitoring, scheduling', sites: '120+' },
];

const complianceDocs = [
  { category: 'Indoor Air Quality', items: ['IAQ Management Plan', 'CO₂ Monitoring Logs', 'Ventilation Rate Verification', 'Filter Efficiency Records', 'Contaminant Source Control'] },
  { category: 'Ventilation Standards', items: ['ASHRAE 62.1 Compliance', 'Outdoor Air Delivery Rates', 'Demand Control Ventilation', 'Natural Ventilation Assessment', 'System Balancing Reports'] },
  { category: 'Service Documentation', items: ['Preventive Maintenance Logs', 'Refrigerant Management (EPA 608)', 'Equipment Run Hours', 'Parts Replacement History', 'Calibration Records'] },
  { category: 'Inspection Readiness', items: ['Fire Marshal Reports', 'Health Department Compliance', 'Insurance Documentation', 'Warranty Tracking', 'Code Compliance Certificates'] },
];

const emergencyTiers = [
  { tier: 'Tier 1', name: 'Critical', response: '< 2 hours', description: 'Complete system failure, no heating/cooling, safety hazard', color: 'danger', examples: ['Total chiller failure in summer', 'Boiler outage in winter', 'Gas leak detection', 'Complete loss of ventilation'] },
  { tier: 'Tier 2', name: 'Urgent', response: '< 4 hours', description: 'Partial system failure, degraded performance, comfort complaints', color: 'warning', examples: ['Single RTU failure on multi-unit roof', 'Reduced cooling capacity', 'Thermostat malfunction', 'Unusual noise or vibration'] },
  { tier: 'Tier 3', name: 'Standard', response: '< 24 hours', description: 'Minor issues, preventive concerns, scheduled follow-ups', color: 'signal', examples: ['Filter replacement needed', 'Minor refrigerant leak', 'Belt wear indicators', 'Control calibration drift'] },
];

// ============ COMPONENTS ============

function StatusIndicator({ status, size = 'sm' }: { status: string; size?: string }) {
  const sizeClasses = size === 'sm' ? 'w-2 h-2' : 'w-3 h-3';
  const colorMap: Record<string, string> = {
    operational: 'bg-signal-500',
    warning: 'bg-warning-500',
    critical: 'bg-danger-500',
    completed: 'bg-signal-500',
    'in-progress': 'bg-industrial-500',
    scheduled: 'bg-graphite-500',
  };
  const isCritical = status === 'critical';
  return (
    <span className={`${sizeClasses} rounded-full ${colorMap[status] || 'bg-graphite-500'} inline-block ${isCritical ? 'pulse-danger' : ''}`} />
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-px bg-industrial-500" />
      <span className="text-xs font-mono uppercase tracking-[0.2em] text-industrial-400">{children}</span>
    </div>
  );
}

// ============ MAIN APP ============

function App() {
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(null);
  const [dashboardTab, setDashboardTab] = useState<'overview' | 'issues' | 'maintenance' | 'health'>('overview');
  const [showContact, setShowContact] = useState(false);
  const [formData, setFormData] = useState({ name: '', company: '', phone: '', email: '', message: '', urgency: 'standard' });
  const timelineRef = useRef<HTMLDivElement>(null);

  // Compute dashboard metrics based on selected equipment
  const getMetrics = () => {
    if (selectedEquipment) {
      const eq = equipmentTypes.find(e => e.id === selectedEquipment)!;
      return {
        openIssues: eq.warning + eq.critical,
        completedPMs: Math.floor(eq.operational * 0.8),
        healthScore: Math.round((eq.operational / eq.count) * 100),
        nextVisit: 'Tomorrow',
      };
    }
    const totalOperational = equipmentTypes.reduce((a, e) => a + e.operational, 0);
    const totalCount = equipmentTypes.reduce((a, e) => a + e.count, 0);
    const totalWarning = equipmentTypes.reduce((a, e) => a + e.warning, 0);
    const totalCritical = equipmentTypes.reduce((a, e) => a + e.critical, 0);
    return {
      openIssues: totalWarning + totalCritical,
      completedPMs: Math.floor(totalOperational * 0.75),
      healthScore: Math.round((totalOperational / totalCount) * 100),
      nextVisit: 'Today 2:00 PM',
    };
  };

  const metrics = getMetrics();

  // Sticky contact button effect
  useEffect(() => {
    const handleScroll = () => {
      setShowContact(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! Our team will contact you within 1 business hour.');
    setFormData({ name: '', company: '', phone: '', email: '', message: '', urgency: 'standard' });
  };

  return (
    <div className="min-h-screen grid-bg">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-graphite-950/90 backdrop-blur-md border-b border-graphite-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-industrial-600 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="6" height="18" rx="1" />
                <rect x="9" y="7" width="6" height="14" rx="1" />
                <rect x="15" y="5" width="6" height="16" rx="1" />
              </svg>
            </div>
            <span className="font-bold text-white text-lg tracking-tight">PlantRoom</span>
            <span className="text-graphite-400 text-sm font-mono">MECHANICAL</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#equipment" className="text-graphite-300 hover:text-white transition-colors">Equipment</a>
            <a href="#maintenance" className="text-graphite-300 hover:text-white transition-colors">Maintenance</a>
            <a href="#dashboard" className="text-graphite-300 hover:text-white transition-colors">Dashboard</a>
            <a href="#compliance" className="text-graphite-300 hover:text-white transition-colors">Compliance</a>
            <a href="#emergency" className="text-graphite-300 hover:text-white transition-colors">Emergency</a>
            <a href="#contact" className="px-4 py-2 bg-industrial-600 text-white rounded text-sm font-medium hover:bg-industrial-500 transition-colors">Get Quote</a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionLabel>Commercial HVAC Operations</SectionLabel>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6">
                Commercial HVAC managed like{' '}
                <span className="text-industrial-400">critical infrastructure.</span>
              </h1>
              <p className="text-lg text-graphite-300 mb-8 max-w-lg">
                Preventive maintenance, real-time monitoring, compliance documentation, and emergency response — for property managers and facility operators who can't afford downtime.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#contact" className="px-6 py-3 bg-industrial-600 text-white rounded-lg font-medium hover:bg-industrial-500 transition-all hover:shadow-lg hover:shadow-industrial-600/20">
                  Schedule Assessment
                </a>
                <a href="#dashboard" className="px-6 py-3 border border-graphite-600 text-graphite-200 rounded-lg font-medium hover:border-industrial-500 hover:text-white transition-all">
                  View Dashboard
                </a>
              </div>
              <div className="mt-10 flex items-center gap-8 text-sm">
                <div className="flex items-center gap-2">
                  <StatusIndicator status="operational" size="md" />
                  <span className="text-graphite-300">181 Units Operational</span>
                </div>
                <div className="flex items-center gap-2">
                  <StatusIndicator status="warning" size="md" />
                  <span className="text-graphite-300">7 Monitoring</span>
                </div>
                <div className="flex items-center gap-2">
                  <StatusIndicator status="critical" size="md" />
                  <span className="text-graphite-300">2 Critical</span>
                </div>
              </div>
            </div>

            {/* Hero Equipment Status Cards */}
            <div className="grid grid-cols-2 gap-3">
              {equipmentTypes.slice(0, 4).map((eq, i) => (
                <motion.div
                  key={eq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-graphite-900 border border-graphite-700 rounded-lg p-4 hover:border-industrial-500/50 transition-all cursor-pointer group"
                  onClick={() => setSelectedEquipment(selectedEquipment === eq.id ? null : eq.id)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl"><Icon name={eq.icon} className="w-6 h-6" /></span>
                    <StatusIndicator status={eq.critical > 0 ? 'critical' : eq.warning > 0 ? 'warning' : 'operational'} />
                  </div>
                  <div className="text-xs font-mono text-graphite-400 mb-1">{eq.code}</div>
                  <div className="text-white font-medium text-sm mb-2">{eq.name}</div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-signal-400">{eq.operational}/{eq.count} online</span>
                    <span className="text-graphite-500 group-hover:text-industrial-400 transition-colors">→</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EQUIPMENT WE MAINTAIN */}
      <section id="equipment" className="py-20 px-6 border-t border-graphite-800">
        <div className="max-w-7xl mx-auto">
          <SectionLabel>Equipment Coverage</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Equipment We Maintain</h2>
          <p className="text-graphite-300 mb-12 max-w-2xl">Full-spectrum mechanical systems coverage. Every unit tracked, every component monitored, every failure anticipated.</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {equipmentTypes.map((eq, i) => (
              <motion.div
                key={eq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedEquipment(selectedEquipment === eq.id ? null : eq.id)}
                className={`bg-graphite-900 border rounded-xl p-6 cursor-pointer transition-all ${
                  selectedEquipment === eq.id
                    ? 'border-industrial-500 shadow-lg shadow-industrial-600/10'
                    : 'border-graphite-700 hover:border-graphite-600'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-graphite-800 flex items-center justify-center">
                    <Icon name={eq.icon} className="w-7 h-7" />
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusIndicator status={eq.critical > 0 ? 'critical' : eq.warning > 0 ? 'warning' : 'operational'} />
                    <span className="text-xs font-mono text-graphite-400">{eq.code}</span>
                  </div>
                </div>
                <h3 className="text-white font-semibold text-lg mb-1">{eq.name}</h3>
                <p className="text-graphite-400 text-sm mb-4">{eq.description}</p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-graphite-800 rounded py-2">
                    <div className="text-white font-bold text-sm">{eq.count}</div>
                    <div className="text-graphite-500 text-xs">Total</div>
                  </div>
                  <div className="bg-graphite-800 rounded py-2">
                    <div className="text-signal-400 font-bold text-sm">{eq.operational}</div>
                    <div className="text-graphite-500 text-xs">Online</div>
                  </div>
                  <div className="bg-graphite-800 rounded py-2">
                    <div className={`${eq.warning + eq.critical > 0 ? 'text-warning-400' : 'text-graphite-500'} font-bold text-sm`}>{eq.warning + eq.critical}</div>
                    <div className="text-graphite-500 text-xs">Alerts</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MAINTENANCE PROGRAM */}
      <section id="maintenance" className="py-20 px-6 border-t border-graphite-800 bg-graphite-900/50">
        <div className="max-w-7xl mx-auto">
          <SectionLabel>Preventive Maintenance</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Maintenance Program</h2>
          <p className="text-graphite-300 mb-12 max-w-2xl">Scheduled inspections, proactive component replacement, and comprehensive reporting. We prevent failures before they happen.</p>

          {/* Maintenance Timeline - Horizontal Scroll */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Maintenance Timeline</h3>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-signal-500" /> Completed</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-industrial-500" /> In Progress</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-graphite-500" /> Scheduled</span>
              </div>
            </div>
            <div ref={timelineRef} className="scroll-container flex gap-3 pb-4">
              {maintenanceTasks.map((task, i) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="scroll-item flex-shrink-0 w-64 bg-graphite-800 border border-graphite-700 rounded-lg p-4 hover:border-graphite-600 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <StatusIndicator status={task.status} />
                    <span className="text-xs font-mono text-graphite-400">{task.date}</span>
                  </div>
                  <div className="text-white font-medium text-sm mb-1">{task.type}</div>
                  <div className="text-industrial-400 text-xs font-mono mb-2">{task.equipment}</div>
                  <div className="text-graphite-400 text-xs mb-3">{task.location}</div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-graphite-500">Tech: {task.tech}</span>
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      task.status === 'completed' ? 'bg-signal-900/30 text-signal-400' :
                      task.status === 'in-progress' ? 'bg-industrial-900/30 text-industrial-400' :
                      'bg-graphite-700 text-graphite-400'
                    }`}>{task.status}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Maintenance Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'System Inspections', desc: 'Quarterly comprehensive inspections with detailed condition reports', frequency: 'Quarterly' },
              { title: 'Filter Replacement', desc: 'MERV-rated filter changes on schedule, with pressure drop monitoring', frequency: 'Monthly' },
              { title: 'Belt & Bearing Service', desc: 'Belt tension checks, bearing lubrication, vibration analysis', frequency: 'Bi-Annual' },
              { title: 'Coil Cleaning', desc: 'Evaporator and condenser coil cleaning for peak heat transfer', frequency: 'Semi-Annual' },
              { title: 'Controls Calibration', desc: 'Thermostat, sensor, and BMS calibration and verification', frequency: 'Annual' },
              { title: 'Performance Reporting', desc: 'Monthly reports with energy metrics, trend analysis, recommendations', frequency: 'Monthly' },
            ].map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-graphite-800 border border-graphite-700 rounded-lg p-5 hover:border-industrial-500/30 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-semibold">{service.title}</h4>
                  <span className="text-xs font-mono px-2 py-1 bg-industrial-900/40 text-industrial-400 rounded">{service.frequency}</span>
                </div>
                <p className="text-graphite-400 text-sm">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FACILITY DASHBOARD */}
      <section id="dashboard" className="py-20 px-6 border-t border-graphite-800">
        <div className="max-w-7xl mx-auto">
          <SectionLabel>Real-Time Monitoring</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Facility Dashboard</h2>
          <p className="text-graphite-300 mb-8 max-w-2xl">
            {selectedEquipment
              ? `Showing metrics for ${equipmentTypes.find(e => e.id === selectedEquipment)?.name}`
              : 'Select an equipment type above to filter, or view all systems'}
          </p>

          {/* Dashboard Tabs */}
          <div className="flex gap-1 mb-6 bg-graphite-900 p-1 rounded-lg w-fit">
            {(['overview', 'issues', 'maintenance', 'health'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setDashboardTab(tab)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  dashboardTab === tab
                    ? 'bg-industrial-600 text-white'
                    : 'text-graphite-400 hover:text-white'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Dashboard Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={dashboardTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {dashboardTab === 'overview' && (
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="bg-graphite-900 border border-graphite-700 rounded-xl p-6">
                    <div className="text-graphite-400 text-sm mb-2">Open Issues</div>
                    <div className="text-3xl font-bold text-white mb-1">{metrics.openIssues}</div>
                    <div className="text-xs text-warning-400">Requires attention</div>
                  </div>
                  <div className="bg-graphite-900 border border-graphite-700 rounded-xl p-6">
                    <div className="text-graphite-400 text-sm mb-2">Completed PMs</div>
                    <div className="text-3xl font-bold text-signal-400 mb-1">{metrics.completedPMs}</div>
                    <div className="text-xs text-graphite-500">This quarter</div>
                  </div>
                  <div className="bg-graphite-900 border border-graphite-700 rounded-xl p-6">
                    <div className="text-graphite-400 text-sm mb-2">Equipment Health</div>
                    <div className="text-3xl font-bold text-white mb-1">{metrics.healthScore}%</div>
                    <div className="w-full bg-graphite-700 rounded-full h-2 mt-2">
                      <div className="bg-signal-500 h-2 rounded-full transition-all duration-500" style={{ width: `${metrics.healthScore}%` }} />
                    </div>
                  </div>
                  <div className="bg-graphite-900 border border-graphite-700 rounded-xl p-6">
                    <div className="text-graphite-400 text-sm mb-2">Next Visit</div>
                    <div className="text-xl font-bold text-white mb-1">{metrics.nextVisit}</div>
                    <div className="text-xs text-industrial-400">Scheduled service</div>
                  </div>
                </div>
              )}

              {dashboardTab === 'issues' && (
                <div className="bg-graphite-900 border border-graphite-700 rounded-xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-graphite-800">
                      <tr>
                        <th className="text-left px-4 py-3 text-graphite-400 font-medium">Equipment</th>
                        <th className="text-left px-4 py-3 text-graphite-400 font-medium">Issue</th>
                        <th className="text-left px-4 py-3 text-graphite-400 font-medium">Priority</th>
                        <th className="text-left px-4 py-3 text-graphite-400 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { eq: 'RTU-042', issue: 'Compressor high-pressure fault', priority: 'critical', status: 'dispatched' },
                        { eq: 'REF-011', issue: 'Temperature deviation alarm', priority: 'critical', status: 'dispatched' },
                        { eq: 'CH-003', issue: 'Condenser water flow low', priority: 'warning', status: 'monitoring' },
                        { eq: 'BLR-007', issue: 'Belt wear indicator triggered', priority: 'warning', status: 'scheduled' },
                        { eq: 'VNT-028', issue: 'Damper actuator drift', priority: 'warning', status: 'scheduled' },
                        { eq: 'EXH-005', issue: 'Bearing vibration elevated', priority: 'warning', status: 'monitoring' },
                      ].map((item, i) => (
                        <tr key={i} className="border-t border-graphite-700 hover:bg-graphite-800/50">
                          <td className="px-4 py-3 font-mono text-industrial-400">{item.eq}</td>
                          <td className="px-4 py-3 text-graphite-200">{item.issue}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                              item.priority === 'critical' ? 'bg-danger-500/20 text-danger-400' : 'bg-warning-500/20 text-warning-400'
                            }`}>{item.priority}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-0.5 rounded text-xs ${
                              item.status === 'dispatched' ? 'bg-danger-500/10 text-danger-400' :
                              item.status === 'monitoring' ? 'bg-warning-500/10 text-warning-400' :
                              'bg-graphite-700 text-graphite-400'
                            }`}>{item.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {dashboardTab === 'maintenance' && (
                <div className="grid md:grid-cols-2 gap-4">
                  {maintenanceTasks.slice(0, 6).map(task => (
                    <div key={task.id} className="bg-graphite-900 border border-graphite-700 rounded-lg p-4 flex items-center gap-4">
                      <StatusIndicator status={task.status} size="md" />
                      <div className="flex-1">
                        <div className="text-white text-sm font-medium">{task.type} — {task.equipment}</div>
                        <div className="text-graphite-400 text-xs">{task.location}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-graphite-300 text-xs">{task.date}</div>
                        <div className="text-graphite-500 text-xs">{task.tech}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {dashboardTab === 'health' && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {equipmentTypes.map(eq => {
                    const health = Math.round((eq.operational / eq.count) * 100);
                    return (
                      <div key={eq.id} className="bg-graphite-900 border border-graphite-700 rounded-xl p-5">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xl"><Icon name={eq.icon} className="w-5 h-5" /></span>
                            <span className="text-white font-medium">{eq.name}</span>
                          </div>
                          <span className={`text-lg font-bold ${health >= 95 ? 'text-signal-400' : health >= 85 ? 'text-warning-400' : 'text-danger-400'}`}>{health}%</span>
                        </div>
                        <div className="w-full bg-graphite-700 rounded-full h-2 mb-3">
                          <div
                            className={`h-2 rounded-full transition-all duration-700 ${health >= 95 ? 'bg-signal-500' : health >= 85 ? 'bg-warning-500' : 'bg-danger-500'}`}
                            style={{ width: `${health}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-graphite-400">
                          <span>{eq.operational} operational</span>
                          <span>{eq.count} total</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="py-20 px-6 border-t border-graphite-800 bg-graphite-900/50">
        <div className="max-w-7xl mx-auto">
          <SectionLabel>Industry Expertise</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Industries We Serve</h2>
          <p className="text-graphite-300 mb-12 max-w-2xl">Specialized HVAC solutions for every commercial environment. We understand the unique requirements of each industry.</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {industries.map((ind, i) => (
              <motion.div
                key={ind.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-graphite-800 border border-graphite-700 rounded-xl p-6 hover:border-industrial-500/30 transition-all group"
              >
                <div className="text-3xl mb-4"><Icon name={ind.icon} className="w-8 h-8" /></div>
                <h3 className="text-white font-semibold text-lg mb-2">{ind.name}</h3>
                <p className="text-graphite-400 text-sm mb-4">{ind.requirements}</p>
                <div className="flex items-center justify-between">
                  <span className="text-industrial-400 text-sm font-medium">{ind.sites} sites</span>
                  <span className="text-graphite-500 group-hover:text-industrial-400 transition-colors text-sm">Learn more →</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPLIANCE + DOCUMENTATION */}
      <section id="compliance" className="py-20 px-6 border-t border-graphite-800">
        <div className="max-w-7xl mx-auto">
          <SectionLabel>Regulatory Compliance</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Compliance + Documentation</h2>
          <p className="text-graphite-300 mb-12 max-w-2xl">Always inspection-ready. We maintain complete documentation packages that satisfy health departments, fire marshals, and insurance requirements.</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {complianceDocs.map((doc, i) => (
              <motion.div
                key={doc.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-graphite-900 border border-graphite-700 rounded-xl p-5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded bg-industrial-900/40 flex items-center justify-center">
                    <svg className="w-4 h-4 text-industrial-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-white font-semibold text-sm">{doc.category}</h3>
                </div>
                <ul className="space-y-2">
                  {doc.items.map(item => (
                    <li key={item} className="flex items-start gap-2 text-sm text-graphite-300">
                      <svg className="w-4 h-4 text-signal-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EMERGENCY PROTOCOL */}
      <section id="emergency" className="py-20 px-6 border-t border-graphite-800 bg-graphite-900/50">
        <div className="max-w-7xl mx-auto">
          <SectionLabel>24/7 Emergency Response</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Emergency Protocol</h2>
          <p className="text-graphite-300 mb-12 max-w-2xl">Priority-tiered response system. Critical failures get immediate dispatch. Every call answered by a live technician, not a call center.</p>

          <div className="grid md:grid-cols-3 gap-6">
            {emergencyTiers.map((tier, i) => (
              <motion.div
                key={tier.tier}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-graphite-800 border rounded-xl p-6 ${
                  tier.color === 'danger' ? 'border-danger-500/30' :
                  tier.color === 'warning' ? 'border-warning-500/30' :
                  'border-signal-500/30'
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                    tier.color === 'danger' ? 'bg-danger-500/20 text-danger-400' :
                    tier.color === 'warning' ? 'bg-warning-500/20 text-warning-400' :
                    'bg-signal-500/20 text-signal-400'
                  }`}>
                    {tier.tier}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{tier.name}</h3>
                    <div className={`text-sm font-mono ${
                      tier.color === 'danger' ? 'text-danger-400' :
                      tier.color === 'warning' ? 'text-warning-400' :
                      'text-signal-400'
                    }`}>Response: {tier.response}</div>
                  </div>
                </div>
                <p className="text-graphite-300 text-sm mb-4">{tier.description}</p>
                <ul className="space-y-2">
                  {tier.examples.map(ex => (
                    <li key={ex} className="flex items-start gap-2 text-sm text-graphite-400">
                      <span className="text-graphite-600 mt-1">•</span>
                      {ex}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 bg-graphite-800 border border-graphite-700 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-white font-semibold text-lg">24/7 Emergency Hotline</h3>
              <p className="text-graphite-400 text-sm">Direct line to on-call technician. No phone trees, no hold music.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-white font-mono">(555) 911-HVAC</div>
                <div className="text-xs text-signal-400">Average response: 47 minutes</div>
              </div>
              <div className="w-3 h-3 rounded-full bg-signal-500 pulse-signal" />
            </div>
          </div>
        </div>
      </section>

      {/* COMMERCIAL CTA / CONTACT FORM */}
      <section id="contact" className="py-20 px-6 border-t border-graphite-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <SectionLabel>Start a Conversation</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Request Maintenance Assessment</h2>
              <p className="text-graphite-300 mb-8">
                Tell us about your facility. We'll provide a comprehensive assessment of your HVAC systems, maintenance needs, and a customized service proposal.
              </p>

              <div className="space-y-4">
                {[
                  { label: 'Free facility walkthrough', desc: 'On-site evaluation of all mechanical systems' },
                  { label: 'Custom maintenance plan', desc: 'Tailored to your equipment, schedule, and budget' },
                  { label: 'Compliance gap analysis', desc: 'Identify documentation and code issues before inspectors do' },
                  { label: 'Transparent pricing', desc: 'No hidden fees, no surprise charges, ever' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-industrial-600/20 flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-industrial-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium">{item.label}</div>
                      <div className="text-graphite-400 text-xs">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-graphite-900 border border-graphite-700 rounded-xl p-6 md:p-8">
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-graphite-400 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-graphite-800 border border-graphite-600 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-industrial-500 transition-colors"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-graphite-400 mb-1.5">Company</label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-graphite-800 border border-graphite-600 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-industrial-500 transition-colors"
                      placeholder="Property Management Co."
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-graphite-400 mb-1.5">Phone</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-graphite-800 border border-graphite-600 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-industrial-500 transition-colors"
                      placeholder="(555) 000-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-graphite-400 mb-1.5">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-graphite-800 border border-graphite-600 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-industrial-500 transition-colors"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-graphite-400 mb-1.5">Urgency Level</label>
                  <select
                    value={formData.urgency}
                    onChange={e => setFormData({ ...formData, urgency: e.target.value })}
                    className="w-full bg-graphite-800 border border-graphite-600 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-industrial-500 transition-colors"
                  >
                    <option value="standard">Standard — General inquiry</option>
                    <option value="urgent">Urgent — System issue</option>
                    <option value="emergency">Emergency — Immediate response needed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-graphite-400 mb-1.5">Tell us about your facility</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-graphite-800 border border-graphite-600 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-industrial-500 transition-colors resize-none"
                    placeholder="Number of buildings, equipment types, current maintenance situation..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-industrial-600 text-white rounded-lg font-medium hover:bg-industrial-500 transition-all hover:shadow-lg hover:shadow-industrial-600/20"
                >
                  Submit Assessment Request
                </button>
                <p className="text-xs text-graphite-500 text-center">We respond within 1 business hour. Emergency calls routed immediately.</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-graphite-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded bg-industrial-600 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="6" height="18" rx="1" />
                    <rect x="9" y="7" width="6" height="14" rx="1" />
                    <rect x="15" y="5" width="6" height="16" rx="1" />
                  </svg>
                </div>
                <span className="font-bold text-white">PlantRoom</span>
              </div>
              <p className="text-graphite-400 text-sm">Commercial HVAC managed like critical infrastructure.</p>
            </div>
            <div>
              <h4 className="text-white font-medium text-sm mb-3">Services</h4>
              <ul className="space-y-2 text-sm text-graphite-400">
                <li>Preventive Maintenance</li>
                <li>Emergency Repair</li>
                <li>System Installation</li>
                <li>Energy Audits</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium text-sm mb-3">Compliance</h4>
              <ul className="space-y-2 text-sm text-graphite-400">
                <li>ASHRAE Standards</li>
                <li>EPA 608 Refrigerant</li>
                <li>IAQ Management</li>
                <li>Fire Safety</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium text-sm mb-3">Contact</h4>
              <ul className="space-y-2 text-sm text-graphite-400">
                <li>(555) 911-HVAC</li>
                <li>service@plantroom.mech</li>
                <li>24/7 Emergency Line</li>
                <li>Mon-Fri 7AM-6PM</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-graphite-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-graphite-500 text-xs">© 2026 PlantRoom Mechanical. All rights reserved.</p>
            <div className="flex items-center gap-4 text-xs text-graphite-500">
              <span>License #MECH-2024-4891</span>
              <span>•</span>
              <span>EPA Certified</span>
              <span>•</span>
              <span>Insured & Bonded</span>
            </div>
          </div>
        </div>
      </footer>

      {/* STICKY CONTACT BUTTON */}
      <AnimatePresence>
        {showContact && (
          <motion.a
            href="#contact"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 z-50 bg-industrial-600 text-white px-5 py-3 rounded-full shadow-lg shadow-industrial-600/30 hover:bg-industrial-500 transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Get Quote
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
