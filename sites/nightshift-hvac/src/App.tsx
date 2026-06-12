import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Images ──────────────────────────────────────────────────────────────────

const heroImage = 'https://images.unsplash.com/photo-1631952112745-5b80a7bbfed1?w=1600&q=85';
const technicianImage = 'https://images.unsplash.com/photo-1631545806607-f4acbf48f12f?w=800&q=85';
const truckImage = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=85';

// ─── Icon Component ──────────────────────────────────────────────────────────

const iconPaths: Record<string, React.ReactNode> = {
  thermometer: <path strokeLinecap="round" strokeLinejoin="round" d="M10 2a2 2 0 014 0v12.5a4 4 0 11-4 0V2zm2 14a2 2 0 100 4 2 2 0 000-4z" />,
  snowflake: <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07M12 6l-2-2m2 2l2-2m-2 14l-2 2m2-2l2 2M6 12l-2-2m2 2l-2 2m14-2l2-2m-2 2l2 2" />,
  flame: <path strokeLinecap="round" strokeLinejoin="round" d="M12 2c0 4-4 6-4 10a4 4 0 008 0c0-4-4-6-4-10zM9 16a3 3 0 006 0" />,
  ice: <path strokeLinecap="round" strokeLinejoin="round" d="M4 4l16 16M4 20L20 4M12 2v20M2 12h20M7 7l10 10M17 7L7 17" />,
  droplet: <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0L12 2.69z" />,
  lightning: <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />,
  phone: <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />,
  clipboard: <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />,
  van: <path strokeLinecap="round" strokeLinejoin="round" d="M8 17a2 2 0 100-4 2 2 0 000 4zM16 17a2 2 0 100-4 2 2 0 000 4zM3 7h11v8H3V7zm11 0h3l3 4v4h-2M8 17h6" />,
  mapPin: <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />,
  wrench: <path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />,
  check: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />,
  door: <path strokeLinecap="round" strokeLinejoin="round" d="M10 4h4a2 2 0 012 2v14H8V6a2 2 0 012-2zm0 8h.01" />,
  plug: <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v4M8 6h8M9 6v4a3 3 0 006 0V6M12 13v5M9 22h6" />,
  smartphone: <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />,
  paw: <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-2-2-6-4-6-8a3 3 0 016 0 3 3 0 016 0c0 4-4 6-6 8zM7 9a2 2 0 100-4 2 2 0 000 4zm10 0a2 2 0 100-4 2 2 0 000 4zM4 13a2 2 0 100-4 2 2 0 000 4zm16 0a2 2 0 100-4 2 2 0 000 4z" />,
  memo: <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />,
  gear: <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />,
  flask: <path strokeLinecap="round" strokeLinejoin="round" d="M9 3h6M10 3v6l-5 8a2 2 0 001.7 3h10.6a2 2 0 001.7-3l-5-8V3" />,
  cyclone: <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a9 9 0 100 18 9 9 0 000-18zm0 4a5 5 0 100 10 5 5 0 000-10zm0 4a1 1 0 100 2 1 1 0 000-2z" />,
  chart: <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
  bolt: <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7l2-7z" />,
  package: <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />,
  microscope: <path strokeLinecap="round" strokeLinejoin="round" d="M10 3v2m4-2v2M8 5h8M9 5v6a3 3 0 006 0V5M12 14v4m-4 4h8" />,
  moon: <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />,
};

function Icon({ name, className = 'w-6 h-6' }: { name: string; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      {iconPaths[name] || null}
    </svg>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────

interface Symptom {
  id: string;
  icon: string;
  title: string;
  severity: 'critical' | 'high' | 'medium';
  description: string;
  immediateAction: string;
  responseTime: string;
}

const symptoms: Symptom[] = [
  {
    id: 'no-cool',
    icon: 'thermometer',
    title: 'No Cool Air',
    severity: 'high',
    description: 'System running but not producing cold air. Could be refrigerant leak, compressor failure, or frozen evaporator coil.',
    immediateAction: 'Turn thermostat to OFF. Check outdoor unit for debris.',
    responseTime: '45 min avg',
  },
  {
    id: 'no-heat',
    icon: 'snowflake',
    title: 'No Heat',
    severity: 'high',
    description: 'Furnace or heat pump not igniting. Could be pilot light, ignitor, gas valve, or thermostat failure.',
    immediateAction: 'Check thermostat batteries. Verify gas valve is open.',
    responseTime: '40 min avg',
  },
  {
    id: 'burning',
    icon: 'flame',
    title: 'Burning Smell',
    severity: 'critical',
    description: 'Electrical burning odor from vents or unit. Possible wiring short, motor overheating, or melting insulation.',
    immediateAction: 'SHUT OFF SYSTEM IMMEDIATELY at breaker. Do not restart.',
    responseTime: '30 min avg',
  },
  {
    id: 'frozen',
    icon: 'ice',
    title: 'Frozen Coil',
    severity: 'medium',
    description: 'Ice buildup on evaporator coil or refrigerant lines. Restricted airflow or low refrigerant charge.',
    immediateAction: 'Turn system to FAN ONLY. Do not chip ice manually.',
    responseTime: '60 min avg',
  },
  {
    id: 'leak',
    icon: 'droplet',
    title: 'Water Leak',
    severity: 'high',
    description: 'Water pooling around indoor unit or ceiling. Clogged condensate line, frozen coil thawing, or cracked drain pan.',
    immediateAction: 'Turn system off. Place towels. Locate shutoff valve.',
    responseTime: '35 min avg',
  },
  {
    id: 'breaker',
    icon: 'lightning',
    title: 'Breaker Trip',
    severity: 'critical',
    description: 'Circuit breaker tripping repeatedly. Electrical short, compressor drawing too many amps, or bad capacitor.',
    immediateAction: 'Do NOT reset breaker more than once. Call dispatch.',
    responseTime: '25 min avg',
  },
];

const timelineSteps = [
  { time: '00:00', label: 'Call Received', detail: 'Dispatcher logs your emergency', icon: 'phone' },
  { time: '02:00', label: 'Triage', detail: 'Symptoms assessed, severity rated', icon: 'clipboard' },
  { time: '04:00', label: 'Tech Assigned', detail: 'Nearest qualified tech dispatched', icon: 'van' },
  { time: '06:00', label: 'ETA Confirmed', detail: 'Real-time tracking activated', icon: 'mapPin' },
  { time: '35:00', label: 'On-Site Repair', detail: 'Diagnosis and fix in progress', icon: 'wrench' },
  { time: '55:00', label: 'Comfort Restored', detail: 'System tested, warranty documented', icon: 'check' },
];

const safetyChecklist = [
  { icon: 'lightning', text: 'Turn off system at thermostat AND breaker if electrical smell' },
  { icon: 'droplet', text: 'Place towels/buckets under any active water leak' },
  { icon: 'door', text: 'Clear path to indoor unit and outdoor condenser' },
  { icon: 'plug', text: 'Locate your electrical panel and identify HVAC breaker' },
  { icon: 'thermometer', text: 'Note current thermostat reading for the tech' },
  { icon: 'smartphone', text: 'Keep phone nearby — dispatch may call with updates' },
  { icon: 'paw', text: 'Secure pets in a separate room for safety' },
  { icon: 'memo', text: 'Write down any error codes displayed on your unit' },
];

const truckInventory = [
  { category: 'Compressors', items: ['Scroll 2-5 ton', 'Reciprocating 1.5-3 ton', 'Universal mount kit'], icon: 'gear' },
  { category: 'Electrical', items: ['Capacitors (all µF)', 'Contactors', 'Circuit boards (universal)', 'Wire & connectors'], icon: 'lightning' },
  { category: 'Refrigerant', items: ['R-410A (25lb tank)', 'R-22 (reclaim)', 'R-32', 'Manifold gauges'], icon: 'flask' },
  { category: 'Motors & Fans', items: ['Condenser fan motors', 'Blower motors', 'Fan blades', 'Belts & pulleys'], icon: 'cyclone' },
  { category: 'Diagnostics', items: ['Combustion analyzer', 'Leak detector (electronic)', 'Multimeter (Fluke)', 'Thermal camera'], icon: 'chart' },
  { category: 'Duct & Seal', items: ['Mastic sealant', 'Flex duct (assorted)', 'Filter (all sizes)', 'UV lamp kits'], icon: 'bolt' },
];

const pricingTiers = [
  {
    label: 'After-Hours Dispatch Fee',
    price: '$89',
    detail: 'Flat fee for nights (6PM–8AM) and weekends. Covers dispatch, diagnosis, and first 30 minutes on-site.',
  },
  {
    label: 'Emergency Premium',
    price: '+$45',
    detail: 'Added for holidays and calls between midnight–6AM. No hidden surcharges beyond this.',
  },
  {
    label: 'Repair Estimate',
    price: 'Free',
    detail: 'You get a written estimate before any work begins. No obligation. If you decline, you only pay the dispatch fee.',
  },
  {
    label: 'Parts Markup',
    price: 'Transparent',
    detail: 'Parts at cost + 15% handling. We show you the invoice. No inflated markup games.',
  },
];

interface Tech {
  id: string;
  name: string;
  status: 'en-route' | 'on-site' | 'available';
  eta: string;
  x: number;
  y: number;
  calls: number;
}

const liveTechs: Tech[] = [
  { id: 'T-07', name: 'Marcus R.', status: 'en-route', eta: '12 min', x: 35, y: 28, calls: 3 },
  { id: 'T-14', name: 'Devin K.', status: 'on-site', eta: 'On call', x: 62, y: 45, calls: 2 },
  { id: 'T-21', name: 'Sarah M.', status: 'en-route', eta: '8 min', x: 48, y: 68, calls: 4 },
  { id: 'T-33', name: 'James W.', status: 'available', eta: 'Ready', x: 78, y: 32, calls: 1 },
  { id: 'T-09', name: 'Alex T.', status: 'en-route', eta: '22 min', x: 22, y: 55, calls: 5 },
];

// ─── ETA Countdown Hook ──────────────────────────────────────────────────────

function useETACountdown(initialSeconds: number) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => {
        if (s <= 0) return initialSeconds;
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [initialSeconds]);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return { mins, secs, total: seconds };
}

// ─── Intersection Observer Hook ──────────────────────────────────────────────

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// ─── Hero Section ────────────────────────────────────────────────────────────

function HeroSection() {
  const eta = useETACountdown(42 * 60 + 17); // 42:17
  const [callPulse, setCallPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCallPulse(true);
      setTimeout(() => setCallPulse(false), 1500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center grid-bg overflow-hidden">
      {/* Hero background image */}
      <div className="absolute inset-0 z-0">
        <img src={heroImage} alt="Night HVAC emergency" className="w-full h-full object-cover" style={{ opacity: 0.15, filter: 'brightness(0.4)' }} />
      </div>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-void-2 to-void-3" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-amber-500/5 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] rounded-full bg-cool-500/5 blur-[100px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Headline */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-amber-400 status-blink" />
            <span className="data-readout uppercase tracking-widest">Dispatch Active — {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            When the system quits,{' '}
            <span className="text-amber-400">dispatch does not.</span>
          </h1>

          <p className="text-lg text-midnight-200 mb-8 max-w-lg">
            24/7 emergency HVAC response. No voicemail. No waiting until morning.
            A live dispatcher answers, a tech rolls, comfort returns.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="tel:+18005551234"
              className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-amber-500 text-void font-bold text-lg transition-all hover:bg-amber-400 ${callPulse ? 'emergency-glow' : ''}`}
            >
              <span className="text-2xl"><Icon name="phone" className="w-6 h-6" /></span>
              (800) 555-1234
            </a>
            <a
              href="#dispatch"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl border border-cool-500/30 text-cool-300 font-medium hover:bg-cool-500/10 transition-all"
            >
              Track Dispatch →
            </a>
          </div>

          <div className="mt-8 flex items-center gap-6 text-sm text-midnight-300">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              4 techs on shift
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cool-400" />
              Avg response: 32 min
            </span>
          </div>
        </div>

        {/* Right: ETA Card */}
        <div className="dispatch-panel rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />

          <div className="flex items-center justify-between mb-6">
            <span className="data-readout uppercase">Live ETA Simulation</span>
            <span className="flex items-center gap-2 text-xs text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-400 status-blink" />
              LIVE
            </span>
          </div>

          <div className="text-center py-6">
            <div className="flex items-baseline justify-center gap-1">
              <motion.span
                className="text-7xl md:text-8xl font-bold text-white font-mono"
                key={eta.mins}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {String(eta.mins).padStart(2, '0')}
              </motion.span>
              <span className="text-4xl text-amber-400 font-mono animate-pulse">:</span>
              <motion.span
                className="text-7xl md:text-8xl font-bold text-white font-mono"
                key={eta.secs}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {String(eta.secs).padStart(2, '0')}
              </motion.span>
            </div>
            <p className="text-midnight-300 mt-3 text-sm">minutes until tech arrival</p>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-midnight-400 mb-2">
              <span>Dispatched</span>
              <span>Arrived</span>
            </div>
            <div className="h-2 bg-midnight-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cool-500 to-amber-400 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${((42 * 60 + 17 - eta.total) / (42 * 60 + 17)) * 100}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>

          {/* Tech info */}
          <div className="mt-6 p-4 bg-void-3 rounded-xl border border-midnight-700/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-cool-500/20 flex items-center justify-center text-lg"><Icon name="van" className="w-5 h-5" /></div>
              <div>
                <p className="text-white font-medium text-sm">Unit T-21 — Sarah M.</p>
                <p className="text-midnight-400 text-xs">En route via I-85 N • 8.4 mi</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Symptoms Section ────────────────────────────────────────────────────────

function SymptomsSection() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const { ref, inView } = useInView();

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return { border: 'border-red-500/50', bg: 'bg-red-500/10', text: 'text-red-400', badge: 'CRITICAL' };
      case 'high': return { border: 'border-amber-500/50', bg: 'bg-amber-500/10', text: 'text-amber-400', badge: 'HIGH' };
      case 'medium': return { border: 'border-cool-500/50', bg: 'bg-cool-500/10', text: 'text-cool-400', badge: 'MEDIUM' };
      default: return { border: 'border-midnight-500', bg: 'bg-midnight-500/10', text: 'text-midnight-300', badge: 'LOW' };
    }
  };

  return (
    <section id="symptoms" className="py-24 px-6 relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <span className="data-readout uppercase tracking-widest text-amber-400">// Severity Assessment</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">
            Emergency Symptoms
          </h2>
          <p className="text-midnight-300 mt-3 max-w-2xl">
            Identify your issue below. Tap any card for immediate safety steps and expected response time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {symptoms.map((symptom, i) => {
            const sev = getSeverityColor(symptom.severity);
            const isExpanded = expanded === symptom.id;

            return (
              <motion.div
                key={symptom.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                onClick={() => setExpanded(isExpanded ? null : symptom.id)}
                className={`severity-card dispatch-panel rounded-xl p-5 ${isExpanded ? 'expanded' : ''}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl"><Icon name={symptom.icon} className="w-8 h-8" /></span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${sev.bg} ${sev.text}`}>
                    {sev.badge}
                  </span>
                </div>

                <h3 className="text-white font-semibold text-lg">{symptom.title}</h3>
                <p className="text-midnight-300 text-sm mt-1">{symptom.description}</p>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 border-t border-midnight-700/50">
                        <div className="mb-3">
                          <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">Immediate Action:</span>
                          <p className="text-midnight-200 text-sm mt-1">{symptom.immediateAction}</p>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-cool-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-cool-400 status-blink" />
                          Avg response: {symptom.responseTime}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!isExpanded && (
                  <div className="mt-3 text-xs text-midnight-400">Tap for details →</div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Dispatch Timeline Section ───────────────────────────────────────────────

function TimelineSection() {
  const { ref, inView } = useInView();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setActiveStep((s) => (s + 1) % timelineSteps.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section id="dispatch" className="py-24 px-6 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-void-3 via-void-2 to-void-3" />
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-12 text-center">
          <span className="data-readout uppercase tracking-widest text-cool-400">// Dispatch Protocol</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">
            From Call to Comfort
          </h2>
          <p className="text-midnight-300 mt-3 max-w-xl mx-auto">
            Every emergency follows the same proven protocol. Here's what happens when you call.
          </p>
        </div>

        <div className="space-y-0">
          {timelineSteps.map((step, i) => {
            const isActive = i <= activeStep;
            const isCurrent = i === activeStep;

            return (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className={`timeline-connector flex gap-4 pb-8 ${i === timelineSteps.length - 1 ? 'before:hidden' : ''}`}
              >
                {/* Node */}
                <div className="flex-shrink-0 relative">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm border-2 transition-all duration-500 ${
                    isActive
                      ? 'border-amber-400 bg-amber-400/20'
                      : 'border-midnight-600 bg-void-3'
                  } ${isCurrent ? 'ring-2 ring-amber-400/30 ring-offset-2 ring-offset-void' : ''}`}>
                    {isActive ? <Icon name={step.icon} className="w-4 h-4" /> : <span className="w-2 h-2 rounded-full bg-midnight-600" />}
                  </div>
                </div>

                {/* Content */}
                <div className={`flex-1 pb-2 transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-mono text-xs text-amber-400">{step.time}</span>
                    <h3 className={`font-semibold ${isCurrent ? 'text-amber-400' : 'text-white'}`}>{step.label}</h3>
                    {isCurrent && (
                      <span className="text-[10px] uppercase tracking-wider text-cool-400 bg-cool-400/10 px-2 py-0.5 rounded">
                        NOW
                      </span>
                    )}
                  </div>
                  <p className="text-midnight-300 text-sm">{step.detail}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Before We Arrive Section ────────────────────────────────────────────────

function SafetySection() {
  const { ref, inView } = useInView();
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <section className="py-24 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <span className="data-readout uppercase tracking-widest text-amber-400">// Pre-Arrival Protocol</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">
            Before We Arrive
          </h2>
          <p className="text-midnight-300 mt-3 max-w-xl">
            These steps keep you safe and help our tech work faster once on-site.
          </p>
        </div>

        <div className="dispatch-panel rounded-2xl p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-midnight-300">Safety Checklist</span>
            <span className="font-mono text-xs text-cool-400">
              {checked.size}/{safetyChecklist.length} complete
            </span>
          </div>

          <div className="space-y-3">
            {safetyChecklist.map((item, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                onClick={() => toggle(i)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                  checked.has(i)
                    ? 'border-emerald-500/30 bg-emerald-500/5'
                    : 'border-midnight-700/50 bg-void-3 hover:border-midnight-600'
                }`}
              >
                <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                  checked.has(i) ? 'border-emerald-400 bg-emerald-400/20' : 'border-midnight-500'
                }`}>
                  {checked.has(i) && <span className="text-emerald-400 text-xs">✓</span>}
                </div>
                <span className="text-xl flex-shrink-0"><Icon name={item.icon} className="w-5 h-5" /></span>
                <span className={`text-sm ${checked.has(i) ? 'text-midnight-400 line-through' : 'text-midnight-200'}`}>
                  {item.text}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Truck Inventory Section ─────────────────────────────────────────────────

function InventorySection() {
  const { ref, inView } = useInView();

  return (
    <section className="py-24 px-6 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-void via-void-2 to-void" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-12">
          <span className="data-readout uppercase tracking-widest text-cool-400">// Fleet Loadout</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">
            Truck Inventory
          </h2>
          <p className="text-midnight-300 mt-3 max-w-xl">
            Every NightShift truck carries 200+ parts and full diagnostics. Most repairs completed in one visit.
          </p>
        </div>

        {/* Truck image */}
        <div className="mb-8 rounded-xl overflow-hidden border border-graphite-700">
          <img src={truckImage} alt="NightShift HVAC service truck" className="w-full h-48 object-cover" style={{ filter: 'brightness(0.7)' }} />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {truckInventory.map((cat, i) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="dispatch-panel rounded-xl p-5"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl"><Icon name={cat.icon} className="w-6 h-6" /></span>
                <h3 className="text-white font-semibold">{cat.category}</h3>
              </div>
              <ul className="space-y-2">
                {cat.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-midnight-300">
                    <span className="w-1 h-1 rounded-full bg-cool-500/50" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 dispatch-panel rounded-xl p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl"><Icon name="package" className="w-6 h-6" /></span>
            <div>
              <p className="text-white font-medium text-sm">Average parts on board: 247 SKUs</p>
              <p className="text-midnight-400 text-xs">First-visit fix rate: 94%</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl"><Icon name="microscope" className="w-6 h-6" /></span>
            <div>
              <p className="text-white font-medium text-sm">Full diagnostic suite</p>
              <p className="text-midnight-400 text-xs">Thermal imaging, combustion analysis, electronic leak detection</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Pricing Section ─────────────────────────────────────────────────────────

function PricingSection() {
  const { ref, inView } = useInView();

  return (
    <section className="py-24 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <span className="data-readout uppercase tracking-widest text-amber-400">// Transparent Pricing</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">
            After-Hours Pricing
          </h2>
          <p className="text-midnight-300 mt-3 max-w-xl mx-auto">
            No surprises at 2 AM. Here's exactly what you pay — before you commit to anything.
          </p>
        </div>

        <div className="space-y-4">
          {pricingTiers.map((tier, i) => (
            <motion.div
              key={tier.label}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="dispatch-panel rounded-xl p-6 flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <div className="flex-1">
                <h3 className="text-white font-semibold">{tier.label}</h3>
                <p className="text-midnight-400 text-sm mt-1">{tier.detail}</p>
              </div>
              <div className="flex-shrink-0">
                <span className={`text-2xl font-bold font-mono ${
                  tier.price === 'Free' ? 'text-emerald-400' :
                  tier.price === 'Transparent' ? 'text-cool-400' : 'text-amber-400'
                }`}>
                  {tier.price}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 text-center">
          <p className="text-amber-300 text-sm">
            <strong>Promise:</strong> If we can't fix it on the first visit, you don't pay for the return trip.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Coverage Map Section ────────────────────────────────────────────────────

function CoverageMapSection() {
  const { ref, inView } = useInView();
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  // SVG route paths
  const routes = [
    { from: { x: 35, y: 28 }, to: { x: 50, y: 50 } },
    { from: { x: 62, y: 45 }, to: { x: 70, y: 60 } },
    { from: { x: 48, y: 68 }, to: { x: 55, y: 50 } },
    { from: { x: 22, y: 55 }, to: { x: 40, y: 45 } },
  ];

  return (
    <section className="py-24 px-6 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-void-3 via-void-2 to-void" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-12">
          <span className="data-readout uppercase tracking-widest text-cool-400">// Live Coverage</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">
            Coverage Map
          </h2>
          <p className="text-midnight-300 mt-3 max-w-xl">
            Real-time fleet positions across the metro service area.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2 dispatch-panel rounded-2xl p-4 relative overflow-hidden">
            <div className="absolute top-3 left-3 data-readout text-[10px]">SECTOR MAP • METRO REGION</div>
            <div className="absolute top-3 right-3 flex items-center gap-2 text-[10px]">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400 status-blink" /> En Route</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400" /> On-Site</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-cool-400" /> Available</span>
            </div>

            <svg viewBox="0 0 100 100" className="w-full h-auto mt-6" style={{ minHeight: '300px' }}>
              {/* Grid */}
              {Array.from({ length: 11 }, (_, i) => (
                <g key={i}>
                  <line x1={i * 10} y1={0} x2={i * 10} y2={100} stroke="rgba(59,142,242,0.08)" strokeWidth="0.2" />
                  <line x1={0} y1={i * 10} x2={100} y2={i * 10} stroke="rgba(59,142,242,0.08)" strokeWidth="0.2" />
                </g>
              ))}

              {/* Roads / Coverage area */}
              <path d="M 10 50 Q 30 30, 50 50 T 90 50" fill="none" stroke="rgba(59,142,242,0.15)" strokeWidth="0.8" />
              <path d="M 50 10 Q 40 30, 50 50 T 50 90" fill="none" stroke="rgba(59,142,242,0.15)" strokeWidth="0.8" />
              <path d="M 20 20 L 80 80" fill="none" stroke="rgba(59,142,242,0.1)" strokeWidth="0.5" />
              <path d="M 80 20 L 20 80" fill="none" stroke="rgba(59,142,242,0.1)" strokeWidth="0.5" />

              {/* Coverage zone */}
              <circle cx="50" cy="50" r="35" fill="rgba(59,142,242,0.03)" stroke="rgba(59,142,242,0.15)" strokeWidth="0.3" strokeDasharray="2 2" />
              <circle cx="50" cy="50" r="25" fill="rgba(59,142,242,0.05)" stroke="rgba(59,142,242,0.2)" strokeWidth="0.3" />

              {/* Route lines */}
              {routes.map((route, i) => (
                <line
                  key={i}
                  x1={route.from.x} y1={route.from.y}
                  x2={route.to.x} y2={route.to.y}
                  stroke="rgba(249,155,7,0.4)"
                  strokeWidth="0.4"
                  strokeDasharray="2 1"
                  className="route-animated"
                />
              ))}

              {/* Tech markers */}
              {liveTechs.map((tech) => {
                const isSelected = selectedTech === tech.id;
                const color = tech.status === 'en-route' ? '#f59e0b' :
                             tech.status === 'on-site' ? '#34d399' : '#60aef7';

                return (
                  <g key={tech.id} onClick={() => setSelectedTech(isSelected ? null : tech.id)} className="cursor-pointer">
                    {/* Pulse ring */}
                    {tech.status === 'en-route' && (
                      <circle cx={tech.x} cy={tech.y} r="3" fill="none" stroke={color} strokeWidth="0.3" opacity="0.5">
                        <animate attributeName="r" from="2" to="5" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite" />
                      </circle>
                    )}
                    {/* Marker */}
                    <circle
                      cx={tech.x} cy={tech.y}
                      r={isSelected ? 2.5 : 2}
                      fill={color}
                      stroke={isSelected ? '#fff' : 'none'}
                      strokeWidth="0.5"
                      className="map-glow"
                    />
                    {/* Label */}
                    <text
                      x={tech.x} y={tech.y - 4}
                      textAnchor="middle"
                      fill="white"
                      style={{ fontSize: '2.5px', fontFamily: 'monospace' }}
                    >
                      {tech.id}
                    </text>
                  </g>
                );
              })}

              {/* Dispatch center */}
              <circle cx="50" cy="50" r="2" fill="#f59e0b" stroke="#fff" strokeWidth="0.3" />
              <text x="50" y="55" textAnchor="middle" fill="#f59e0b" style={{ fontSize: '2px', fontFamily: 'monospace' }}>
                HQ
              </text>
            </svg>
          </div>

          {/* Tech cards */}
          <div className="space-y-3">
            <div className="data-readout text-[10px] uppercase mb-2">Active Fleet</div>
            {liveTechs.map((tech) => {
              const isSelected = selectedTech === tech.id;
              const statusColor = tech.status === 'en-route' ? 'text-amber-400 bg-amber-400/10' :
                                 tech.status === 'on-site' ? 'text-emerald-400 bg-emerald-400/10' : 'text-cool-400 bg-cool-400/10';

              return (
                <motion.div
                  key={tech.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  onClick={() => setSelectedTech(isSelected ? null : tech.id)}
                  className={`dispatch-panel rounded-xl p-4 cursor-pointer transition-all ${
                    isSelected ? 'border-amber-400/40 bg-amber-400/5' : 'hover:border-midnight-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-white font-semibold">{tech.id}</span>
                    <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded ${statusColor}`}>
                      {tech.status.replace('-', ' ')}
                    </span>
                  </div>
                  <p className="text-midnight-200 text-sm font-medium">{tech.name}</p>
                  <div className="flex items-center justify-between mt-2 text-xs text-midnight-400">
                    <span>ETA: {tech.eta}</span>
                    <span>{tech.calls} calls today</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Emergency CTA Section ───────────────────────────────────────────────────

function CTASection() {
  const { ref, inView } = useInView();

  return (
    <section className="py-24 px-6 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-void to-void-3" />
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-cool-500/5" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-3 h-3 rounded-full bg-amber-400 status-blink" />
            <span className="data-readout uppercase tracking-widest text-amber-400">24/7 DISPATCH — LIVE NOW</span>
            <div className="w-3 h-3 rounded-full bg-amber-400 status-blink" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            System down? <span className="text-amber-400">We're already on it.</span>
          </h2>

          <p className="text-midnight-300 text-lg mb-10 max-w-2xl mx-auto">
            One call. Live dispatcher. Tech dispatched in under 4 minutes.
            No phone trees. No callbacks. Just help.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+18005551234"
              className="emergency-glow inline-flex items-center gap-3 px-10 py-5 rounded-xl bg-amber-500 text-void font-bold text-xl transition-all hover:bg-amber-400 hover:scale-105"
            >
              <span className="text-3xl"><Icon name="phone" className="w-7 h-7" /></span>
              (800) 555-1234
            </a>
            <a
              href="#symptoms"
              className="inline-flex items-center gap-2 px-8 py-5 rounded-xl border border-cool-500/30 text-cool-300 font-semibold hover:bg-cool-500/10 transition-all"
            >
              Identify My Issue
            </a>
          </div>

          <div className="mt-10 grid sm:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold text-white font-mono">32</p>
              <p className="text-midnight-400 text-sm mt-1">min avg response</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white font-mono">94%</p>
              <p className="text-midnight-400 text-sm mt-1">first-visit fix rate</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white font-mono">24/7</p>
              <p className="text-midnight-400 text-sm mt-1">never closed</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Sticky Mobile Call Button ───────────────────────────────────────────────

function StickyCallButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`sticky-call sm:hidden ${visible ? 'visible' : ''}`}>
      <a
        href="tel:+18005551234"
        className="flex items-center justify-center gap-3 w-full py-3 rounded-xl bg-amber-500 text-void font-bold text-lg"
      >
        <span className="text-xl"><Icon name="phone" className="w-5 h-5" /></span>
        Call Dispatch Now — (800) 555-1234
      </a>
    </div>
  );
}

// ─── Header ──────────────────────────────────────────────────────────────────

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-void/95 backdrop-blur-md border-b border-midnight-800/50' : ''
    }`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl"><Icon name="moon" className="w-5 h-5" /></span>
          <span className="text-white font-bold text-lg tracking-tight">NightShift</span>
          <span className="text-amber-400 font-mono text-xs hidden sm:inline">HVAC</span>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-midnight-300">
          <a href="#symptoms" className="hover:text-white transition-colors">Symptoms</a>
          <a href="#dispatch" className="hover:text-white transition-colors">Dispatch</a>
          <a href="tel:+18005551234" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 transition-all">
            <span className="w-2 h-2 rounded-full bg-amber-400 status-blink" />
            Emergency Line
          </a>
        </nav>
      </div>
    </header>
  );
}

// ─── Main App ────────────────────────────────────────────────────────────────

function App() {
  return (
    <div className="scanlines">
      <Header />
      <HeroSection />
      <SymptomsSection />
      <TimelineSection />
      <SafetySection />
      <InventorySection />
      <PricingSection />
      <CoverageMapSection />
      <CTASection />
      <StickyCallButton />

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-midnight-800/50">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-midnight-500">
          <div className="flex items-center gap-2">
            <span><Icon name="moon" className="w-4 h-4 inline" /></span>
            <span>NightShift HVAC — 24/7 Emergency Comfort Response</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs">License #HV-2847</span>
            <span className="font-mono text-xs">Insured & Bonded</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
