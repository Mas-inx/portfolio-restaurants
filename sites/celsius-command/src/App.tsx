import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Service {
  id: string;
  name: string;
  icon: string;
  description: string;
  recommendation: string;
  color: string;
}

interface BookingState {
  service: string;
  urgency: string;
  zip: string;
  date: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const services: Service[] = [
  { id: 'ac', name: 'AC Repair', icon: '❄️', description: 'Fast cooling restoration', recommendation: 'Most AC issues resolved in a single visit. Average repair: $180–$420.', color: 'ice' },
  { id: 'heating', name: 'Heating', icon: '🔥', description: 'Furnace & heat pump service', recommendation: 'Heating systems checked for safety and efficiency. Annual tune-up saves 15% on bills.', color: 'heat' },
  { id: 'tuneup', name: 'Tune-Up', icon: '🔧', description: 'Seasonal maintenance', recommendation: 'Preventive maintenance catches 95% of issues before they become emergencies.', color: 'navy' },
  { id: 'replacement', name: 'Replacement', icon: '🏠', description: 'Full system install', recommendation: 'Systems over 15 years old cost 30% more to run. Modern units save $400+/year.', color: 'navy' },
  { id: 'thermostat', name: 'Thermostat', icon: '🌡️', description: 'Smart controls', recommendation: 'Smart thermostats reduce energy use by 10-15%. Payback in under 2 years.', color: 'ice' },
  { id: 'airquality', name: 'Air Quality', icon: '🌬️', description: 'Filtration & purification', recommendation: 'HEPA filtration removes 99.97% of particles. UV systems kill 99% of pathogens.', color: 'ice' },
];

const maintenancePlans = [
  {
    name: 'Essential',
    price: '$149',
    period: '/year',
    features: ['Annual tune-up', '15% repair discount', 'Priority scheduling', 'Filter replacement'],
    highlight: false,
  },
  {
    name: 'Comfort Plus',
    price: '$299',
    period: '/year',
    features: ['Bi-annual tune-ups', '25% repair discount', 'Same-day priority', 'Filter replacements included', 'Duct inspection', 'No overtime charges'],
    highlight: true,
  },
  {
    name: 'Total Control',
    price: '$499',
    period: '/year',
    features: ['Quarterly inspections', '35% repair discount', 'Guaranteed 2-hour response', 'All filters included', 'Full duct cleaning', 'Smart thermostat monitoring', 'Equipment warranty extension'],
    highlight: false,
  },
];

const regions = [
  { name: 'Metro North', cities: 'Oakdale, Riverside, Pine Valley', availability: 'Same-day available' },
  { name: 'Metro South', cities: 'Lakewood, Fairview, Brookside', availability: 'Same-day available' },
  { name: 'East County', cities: 'Maple Ridge, Cedar Hills, Summit', availability: 'Next-day available' },
  { name: 'West Valley', cities: 'Silver Creek, Glen Park, Horizon', availability: 'Same-day available' },
];

const diagnosticMetrics = [
  { label: 'Airflow', value: 87, unit: '%', status: 'good', detail: 'Within optimal range' },
  { label: 'Filter Life', value: 42, unit: '%', status: 'warning', detail: 'Replace within 2 weeks' },
  { label: 'Unit Age', value: 12, unit: 'yrs', status: 'good', detail: 'Mid-lifecycle, efficient' },
  { label: 'Efficiency', value: 94, unit: 'SEER', status: 'excellent', detail: 'Top-tier performance' },
];

// ─── Thermostat Component ────────────────────────────────────────────────────

function Thermostat({ temp, setTemp }: { temp: number; setTemp: (t: number) => void }) {
  const [isDragging, setIsDragging] = useState(false);
  const ringRef = useRef<SVGSVGElement>(null);

  const minTemp = 60;
  const maxTemp = 85;
  const range = maxTemp - minTemp;
  const percentage = (temp - minTemp) / range;
  const startAngle = -225;
  const endAngle = startAngle + percentage * 270;

  const getColor = () => {
    if (temp <= 68) return { stroke: '#0ea5e9', glow: 'rgba(14, 165, 233, 0.4)', bg: 'from-ice-50 to-ice-100' };
    if (temp >= 76) return { stroke: '#f97316', glow: 'rgba(249, 115, 22, 0.4)', bg: 'from-heat-50 to-heat-100' };
    return { stroke: '#10b981', glow: 'rgba(16, 185, 129, 0.3)', bg: 'from-emerald-50 to-emerald-100' };
  };

  const colors = getColor();

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    (e.target as Element).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !ringRef.current) return;
    const rect = ringRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const angle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
    let normalized = angle + 225;
    if (normalized < 0) normalized += 360;
    if (normalized > 270) normalized = normalized > 315 ? 0 : 270;
    const newTemp = Math.round(minTemp + (normalized / 270) * range);
    setTemp(Math.max(minTemp, Math.min(maxTemp, newTemp)));
  };

  const handlePointerUp = () => setIsDragging(false);

  const describeArc = (startA: number, endA: number, radius: number) => {
    const start = polarToCartesian(100, 100, radius, endA);
    const end = polarToCartesian(100, 100, radius, startA);
    const largeArc = endA - startA <= 180 ? 0 : 1;
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 0 ${end.x} ${end.y}`;
  };

  const polarToCartesian = (cx: number, cy: number, r: number, angle: number) => {
    const rad = ((angle - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };

  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute inset-0 rounded-full thermostat-glow" style={{ background: colors.glow }} />
      <svg
        ref={ringRef}
        viewBox="0 0 200 200"
        className="w-64 h-64 md:w-80 md:h-80 thermostat-ring cursor-pointer select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* Background arc */}
        <path
          d={describeArc(-225, 45, 85)}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="8"
          strokeLinecap="round"
        />
        {/* Active arc */}
        <motion.path
          d={describeArc(startAngle, endAngle, 85)}
          fill="none"
          stroke={colors.stroke}
          strokeWidth="8"
          strokeLinecap="round"
          animate={{ d: describeArc(startAngle, endAngle, 85) }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
        {/* Tick marks */}
        {Array.from({ length: 26 }, (_, i) => {
          const angle = -225 + (i / 25) * 270;
          const inner = polarToCartesian(100, 100, 72, angle);
          const outer = polarToCartesian(100, 100, 78, angle);
          return (
            <line
              key={i}
              x1={inner.x} y1={inner.y}
              x2={outer.x} y2={outer.y}
              stroke={i / 25 <= percentage ? colors.stroke : '#cbd5e1'}
              strokeWidth={i % 5 === 0 ? 2 : 1}
            />
          );
        })}
        {/* Center content */}
        <text x="100" y="92" textAnchor="middle" className="text-4xl font-bold" fill="#102a43" style={{ fontSize: '36px', fontWeight: 700, fontFamily: 'Inter' }}>
          {temp}°
        </text>
        <text x="100" y="115" textAnchor="middle" fill="#627d98" style={{ fontSize: '12px', fontFamily: 'Inter' }}>
          {temp <= 68 ? 'COOLING' : temp >= 76 ? 'HEATING' : 'COMFORT'}
        </text>
        {/* Handle dot */}
        <motion.circle
          cx={polarToCartesian(100, 100, 85, endAngle).x}
          cy={polarToCartesian(100, 100, 85, endAngle).y}
          r="6"
          fill={colors.stroke}
          animate={{
            cx: polarToCartesian(100, 100, 85, endAngle).x,
            cy: polarToCartesian(100, 100, 85, endAngle).y,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      </svg>
    </div>
  );
}

// ─── Service Selector ────────────────────────────────────────────────────────

function ServiceSelector({ selected, onSelect }: { selected: string; onSelect: (id: string) => void }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {services.map((service) => (
        <motion.button
          key={service.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(service.id)}
          className={`service-card p-5 rounded-2xl border-2 text-left cursor-pointer bg-white ${
            selected === service.id ? 'selected' : 'border-navy-100 hover:border-navy-200'
          }`}
        >
          <span className="text-3xl mb-3 block">{service.icon}</span>
          <h3 className="font-semibold text-navy-900 text-sm">{service.name}</h3>
          <p className="text-xs text-navy-500 mt-1">{service.description}</p>
        </motion.button>
      ))}
    </div>
  );
}

// ─── Booking Flow ────────────────────────────────────────────────────────────

function BookingFlow({ booking, setBooking, onComplete }: {
  booking: BookingState;
  setBooking: (b: BookingState) => void;
  onComplete: () => void;
}) {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: 'Select Service',
      content: (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {services.map((s) => (
            <button
              key={s.id}
              onClick={() => setBooking({ ...booking, service: s.id })}
              className={`p-4 rounded-xl border-2 text-center transition-all ${
                booking.service === s.id ? 'border-ice-500 bg-ice-50' : 'border-navy-100 hover:border-ice-300'
              }`}
            >
              <span className="text-2xl block mb-1">{s.icon}</span>
              <span className="text-xs font-medium text-navy-800">{s.name}</span>
            </button>
          ))}
        </div>
      ),
      canNext: !!booking.service,
    },
    {
      title: 'How Urgent?',
      content: (
        <div className="space-y-3">
          {['Emergency (within 2 hours)', 'Today', 'This week', 'Schedule for later'].map((opt) => (
            <button
              key={opt}
              onClick={() => setBooking({ ...booking, urgency: opt })}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                booking.urgency === opt ? 'border-ice-500 bg-ice-50' : 'border-navy-100 hover:border-ice-300'
              }`}
            >
              <span className="font-medium text-navy-800">{opt}</span>
            </button>
          ))}
        </div>
      ),
      canNext: !!booking.urgency,
    },
    {
      title: 'Location & Date',
      content: (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-navy-700 block mb-1">ZIP Code</label>
            <input
              type="text"
              maxLength={5}
              value={booking.zip}
              onChange={(e) => setBooking({ ...booking, zip: e.target.value.replace(/\D/g, '') })}
              placeholder="Enter ZIP"
              className="w-full px-4 py-3 rounded-xl border-2 border-navy-100 focus:border-ice-500 outline-none transition-colors text-navy-900"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-navy-700 block mb-1">Preferred Date</label>
            <input
              type="date"
              value={booking.date}
              onChange={(e) => setBooking({ ...booking, date: e.target.value })}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 rounded-xl border-2 border-navy-100 focus:border-ice-500 outline-none transition-colors text-navy-900"
            />
          </div>
        </div>
      ),
      canNext: booking.zip.length === 5 && !!booking.date,
    },
  ];

  return (
    <div className="bg-white rounded-3xl border border-navy-100 p-6 md:p-8 shadow-lg">
      {/* Step indicators */}
      <div className="flex items-center justify-center gap-3 mb-6">
        {steps.map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className={`step-dot w-3 h-3 rounded-full ${i === step ? 'active' : i < step ? 'completed' : 'bg-navy-200'}`} />
            {i < steps.length - 1 && <div className={`w-8 h-0.5 ${i < step ? 'bg-emerald-400' : 'bg-navy-200'}`} />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="text-lg font-semibold text-navy-900 mb-4">{steps[step].title}</h3>
          {steps[step].content}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => step > 0 && setStep(step - 1)}
          className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
            step === 0 ? 'opacity-0 pointer-events-none' : 'text-navy-600 hover:bg-navy-50'
          }`}
        >
          Back
        </button>
        {step < steps.length - 1 ? (
          <button
            onClick={() => steps[step].canNext && setStep(step + 1)}
            disabled={!steps[step].canNext}
            className="px-6 py-2.5 rounded-xl bg-navy-900 text-white font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-navy-800 transition-colors"
          >
            Continue
          </button>
        ) : (
          <button
            onClick={() => steps[step].canNext && onComplete()}
            disabled={!steps[step].canNext}
            className="px-6 py-2.5 rounded-xl bg-ice-500 text-white font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-ice-600 transition-colors"
          >
            Book Now
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Diagnostic Panel ────────────────────────────────────────────────────────

function DiagnosticPanel() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-emerald-500';
      case 'good': return 'bg-ice-500';
      case 'warning': return 'bg-heat-500';
      default: return 'bg-navy-400';
    }
  };

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {diagnosticMetrics.map((metric, i) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          className="bg-white rounded-2xl border border-navy-100 p-5 relative overflow-hidden"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-2.5 h-2.5 rounded-full ${getStatusColor(metric.status)} ${metric.status === 'warning' ? 'pulse-indicator' : ''}`} />
            <span className="text-xs font-medium text-navy-500 uppercase tracking-wide">{metric.label}</span>
          </div>
          <div className="flex items-baseline gap-1">
            <motion.span
              className="text-3xl font-bold text-navy-900"
              initial={{ opacity: 0 }}
              animate={visible ? { opacity: 1 } : {}}
              transition={{ delay: i * 0.1 + 0.3 }}
            >
              {metric.value}
            </motion.span>
            <span className="text-sm text-navy-500">{metric.unit}</span>
          </div>
          <p className="text-xs text-navy-400 mt-2">{metric.detail}</p>
          {/* Progress bar */}
          <div className="mt-3 h-1.5 bg-navy-100 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${getStatusColor(metric.status)}`}
              initial={{ width: 0 }}
              animate={visible ? { width: `${metric.value}%` } : {}}
              transition={{ delay: i * 0.1 + 0.4, duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Repair vs Replace Guide ─────────────────────────────────────────────────

function RepairVsReplace() {
  const [unitAge, setUnitAge] = useState(10);
  const [repairCost, setRepairCost] = useState(300);
  const [frequency, setFrequency] = useState(1);

  const shouldReplace = unitAge > 15 || repairCost > 2000 || frequency > 3 || (unitAge > 10 && repairCost > 1000);
  const score = Math.min(100, (unitAge / 20) * 40 + (repairCost / 5000) * 30 + (frequency / 5) * 30);

  return (
    <div className="bg-white rounded-3xl border border-navy-100 p-6 md:p-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          <div>
            <label className="flex justify-between text-sm font-medium text-navy-700 mb-2">
              <span>System Age</span>
              <span className="text-navy-900 font-bold">{unitAge} years</span>
            </label>
            <input
              type="range"
              min={1} max={25}
              value={unitAge}
              onChange={(e) => setUnitAge(Number(e.target.value))}
              className="w-full h-2 bg-navy-100 rounded-full appearance-none cursor-pointer accent-ice-500"
            />
            <div className="flex justify-between text-xs text-navy-400 mt-1">
              <span>New</span><span>25+ years</span>
            </div>
          </div>
          <div>
            <label className="flex justify-between text-sm font-medium text-navy-700 mb-2">
              <span>Estimated Repair Cost</span>
              <span className="text-navy-900 font-bold">${repairCost}</span>
            </label>
            <input
              type="range"
              min={50} max={5000} step={50}
              value={repairCost}
              onChange={(e) => setRepairCost(Number(e.target.value))}
              className="w-full h-2 bg-navy-100 rounded-full appearance-none cursor-pointer accent-ice-500"
            />
            <div className="flex justify-between text-xs text-navy-400 mt-1">
              <span>$50</span><span>$5,000+</span>
            </div>
          </div>
          <div>
            <label className="flex justify-between text-sm font-medium text-navy-700 mb-2">
              <span>Repairs This Year</span>
              <span className="text-navy-900 font-bold">{frequency}</span>
            </label>
            <input
              type="range"
              min={0} max={5}
              value={frequency}
              onChange={(e) => setFrequency(Number(e.target.value))}
              className="w-full h-2 bg-navy-100 rounded-full appearance-none cursor-pointer accent-ice-500"
            />
            <div className="flex justify-between text-xs text-navy-400 mt-1">
              <span>0</span><span>5+</span>
            </div>
          </div>
        </div>

        {/* Result */}
        <div className="flex flex-col items-center justify-center text-center">
          <div className="relative w-40 h-40 mb-4">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#e2e8f0" strokeWidth="8" />
              <motion.circle
                cx="50" cy="50" r="42"
                fill="none"
                stroke={shouldReplace ? '#f97316' : '#0ea5e9'}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 42}`}
                strokeDashoffset={`${2 * Math.PI * 42 * (1 - score / 100)}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - score / 100) }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-navy-900">{Math.round(score)}%</span>
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={shouldReplace ? 'replace' : 'repair'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <h4 className={`text-xl font-bold ${shouldReplace ? 'text-heat-600' : 'text-ice-600'}`}>
                {shouldReplace ? 'Consider Replacement' : 'Repair Recommended'}
              </h4>
              <p className="text-sm text-navy-500 mt-1 max-w-xs">
                {shouldReplace
                  ? 'Your system is showing signs that replacement would be more cost-effective than continued repairs.'
                  : 'Your system is still in good shape. A targeted repair should restore performance efficiently.'}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ─── Main App ────────────────────────────────────────────────────────────────

export default function App() {
  const [temp, setTemp] = useState(72);
  const [selectedService, setSelectedService] = useState('ac');
  const [booking, setBooking] = useState<BookingState>({ service: '', urgency: '', zip: '', date: '' });
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);
  const [showStickyBooking, setShowStickyBooking] = useState(false);

  const { scrollYProgress } = useScroll();
  const gradientFrom = useTransform(scrollYProgress, [0, 0.5, 1], ['#f0f9ff', '#f0f4f8', '#fff7ed']);
  const gradientTo = useTransform(scrollYProgress, [0, 0.5, 1], ['#e0f2fe', '#d9e2ec', '#ffedd5']);

  const springFrom = useSpring(gradientFrom, { stiffness: 50, damping: 20 });
  const springTo = useSpring(gradientTo, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const unsubFrom = springFrom.on('change', (v) => document.documentElement.style.setProperty('--scroll-gradient-from', v as string));
    const unsubTo = springTo.on('change', (v) => document.documentElement.style.setProperty('--scroll-gradient-to', v as string));
    return () => { unsubFrom(); unsubTo(); };
  }, [springFrom, springTo]);

  // Show sticky booking after scrolling past hero
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBooking(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const selectedServiceData = services.find(s => s.id === selectedService);

  const handleBookingComplete = useCallback(() => {
    setShowBookingSuccess(true);
    setTimeout(() => setShowBookingSuccess(false), 4000);
  }, []);

  const heroCopy = temp <= 68 ? 'Cool comfort, dialed in.' : temp >= 76 ? 'Warmth when you need it.' : 'Perfect comfort zone.';

  return (
    <div className="min-h-screen temp-gradient-bg">
      {/* ─── Navigation ─── */}
      <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-white/80 border-b border-navy-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-ice-400 to-ice-600 flex items-center justify-center">
              <span className="text-white text-sm font-bold">°C</span>
            </div>
            <span className="font-bold text-navy-900 text-lg">Celsius Command</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-navy-600">
            <a href="#services" className="hover:text-navy-900 transition-colors">Services</a>
            <a href="#booking" className="hover:text-navy-900 transition-colors">Book</a>
            <a href="#health" className="hover:text-navy-900 transition-colors">Diagnostics</a>
            <a href="#plans" className="hover:text-navy-900 transition-colors">Plans</a>
            <a href="#areas" className="hover:text-navy-900 transition-colors">Areas</a>
          </div>
          <a href="#booking" className="px-4 py-2 rounded-xl bg-navy-900 text-white text-sm font-medium hover:bg-navy-800 transition-colors">
            Get Service
          </a>
        </div>
      </nav>

      {/* ─── 1. Hero ─── */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-3 py-1 rounded-full bg-ice-100 text-ice-700 text-xs font-semibold mb-4">
                  Smart Home Comfort
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-950 leading-tight mb-4">
                  Control the temperature.{' '}
                  <span className="text-ice-500">Remove the stress.</span>
                </h1>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={heroCopy}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-lg text-navy-600 mb-6"
                  >
                    {heroCopy}
                  </motion.p>
                </AnimatePresence>
                <div className="flex flex-wrap gap-3">
                  <a href="#booking" className="px-6 py-3 rounded-xl bg-navy-900 text-white font-semibold hover:bg-navy-800 transition-colors shadow-lg shadow-navy-900/20">
                    Book a Technician
                  </a>
                  <a href="#health" className="px-6 py-3 rounded-xl border-2 border-navy-200 text-navy-700 font-semibold hover:border-navy-300 hover:bg-navy-50 transition-all">
                    Check My System
                  </a>
                </div>
                <div className="flex items-center gap-6 mt-8 text-sm text-navy-500">
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-500">✓</span> Licensed & Insured
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-500">✓</span> Same-Day Service
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-500">✓</span> 5-Year Warranty
                  </div>
                </div>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
            >
              <Thermostat temp={temp} setTemp={setTemp} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 2. Service Selector ─── */}
      <section id="services" className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-950 mb-3">What do you need?</h2>
            <p className="text-navy-500 max-w-lg mx-auto">Select a service to see our recommendation and get started.</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <ServiceSelector selected={selectedService} onSelect={setSelectedService} />
          </div>
          {/* Dynamic recommendation */}
          <AnimatePresence mode="wait">
            {selectedServiceData && (
              <motion.div
                key={selectedServiceData.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-8 max-w-3xl mx-auto bg-gradient-to-r from-ice-50 to-white rounded-2xl border border-ice-200 p-6"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{selectedServiceData.icon}</span>
                  <div>
                    <h3 className="font-semibold text-navy-900 mb-1">{selectedServiceData.name} — Our Take</h3>
                    <p className="text-sm text-navy-600">{selectedServiceData.recommendation}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ─── 3. Booking Flow ─── */}
      <section id="booking" className="py-16 md:py-24 px-4 md:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-950 mb-3">Book in 60 seconds</h2>
            <p className="text-navy-500">Three steps to comfort. No phone calls required.</p>
          </div>
          <div className="max-w-xl mx-auto">
            <AnimatePresence mode="wait">
              {showBookingSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-emerald-50 border-2 border-emerald-200 rounded-3xl p-8 text-center"
                >
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-xl font-bold text-emerald-800 mb-2">Booking Confirmed!</h3>
                  <p className="text-emerald-600">A technician will be dispatched to {booking.zip || 'your area'}. You'll receive a confirmation shortly.</p>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <BookingFlow booking={booking} setBooking={setBooking} onComplete={handleBookingComplete} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ─── 4. System Health / Diagnostics ─── */}
      <section id="health" className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-950 mb-3">System Health Monitor</h2>
            <p className="text-navy-500 max-w-lg mx-auto">Real-time diagnostics from your HVAC system. Know before you call.</p>
          </div>
          <DiagnosticPanel />
          <div className="mt-8 text-center">
            <p className="text-sm text-navy-400">Diagnostics update every 15 minutes from your smart thermostat connection.</p>
          </div>
        </div>
      </section>

      {/* ─── 5. Maintenance Plans ─── */}
      <section id="plans" className="py-16 md:py-24 px-4 md:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-950 mb-3">Maintenance Plans</h2>
            <p className="text-navy-500">Preventive care that pays for itself. Choose your level of protection.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {maintenancePlans.map((plan) => (
              <motion.div
                key={plan.name}
                whileHover={{ y: -4 }}
                className={`rounded-2xl border-2 p-6 ${
                  plan.highlight
                    ? 'border-ice-500 bg-gradient-to-b from-ice-50 to-white shadow-lg shadow-ice-500/10 relative'
                    : 'border-navy-100 bg-white'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-ice-500 text-white text-xs font-semibold">
                    Most Popular
                  </div>
                )}
                <h3 className="font-bold text-navy-900 text-lg">{plan.name}</h3>
                <div className="mt-3 mb-5">
                  <span className="text-3xl font-bold text-navy-950">{plan.price}</span>
                  <span className="text-navy-500 text-sm">{plan.period}</span>
                </div>
                <ul className="space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-navy-600">
                      <span className="text-emerald-500 mt-0.5">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full mt-6 py-2.5 rounded-xl font-semibold text-sm transition-colors ${
                  plan.highlight
                    ? 'bg-ice-500 text-white hover:bg-ice-600'
                    : 'bg-navy-100 text-navy-700 hover:bg-navy-200'
                }`}>
                  Choose {plan.name}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. Repair vs Replace Guide ─── */}
      <section className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-950 mb-3">Repair or Replace?</h2>
            <p className="text-navy-500 max-w-lg mx-auto">Use our interactive guide to make the right decision for your system.</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <RepairVsReplace />
          </div>
        </div>
      </section>

      {/* ─── 7. Service Area ─── */}
      <section id="areas" className="py-16 md:py-24 px-4 md:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-950 mb-3">Service Areas</h2>
            <p className="text-navy-500">Fast response across the metro region. Check your area below.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {regions.map((region) => (
              <motion.div
                key={region.name}
                whileHover={{ y: -2 }}
                className="bg-white rounded-2xl border border-navy-100 p-5"
              >
                <h3 className="font-bold text-navy-900 mb-1">{region.name}</h3>
                <p className="text-xs text-navy-500 mb-3">{region.cities}</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-xs font-medium text-emerald-700">{region.availability}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. Final Booking CTA ─── */}
      <section className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-navy-900 to-navy-950 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-ice-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-heat-500/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Ready for perfect comfort?</h2>
              <p className="text-navy-300 max-w-lg mx-auto mb-8">
                Book your service now and a certified technician will be at your door. No hidden fees, guaranteed satisfaction.
              </p>
              <div className="max-w-md mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex gap-3">
                  <input
                    type="tel"
                    placeholder="Your phone number"
                    className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-navy-400 outline-none focus:border-ice-400 transition-colors"
                  />
                  <button className="px-6 py-3 rounded-xl bg-ice-500 text-white font-semibold hover:bg-ice-400 transition-colors whitespace-nowrap">
                    Call Me Back
                  </button>
                </div>
                <p className="text-xs text-navy-400 mt-3">Or call us directly: (555) 234-5678</p>
              </div>
              <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-navy-300">
                <span>⚡ 2-hour response time</span>
                <span>🛡️ 5-year parts warranty</span>
                <span>💰 Financing available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-8 px-4 md:px-8 border-t border-navy-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-navy-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-ice-400 to-ice-600 flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">°C</span>
            </div>
            <span>© 2026 Celsius Command. All rights reserved.</span>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-navy-700">Privacy</a>
            <a href="#" className="hover:text-navy-700">Terms</a>
            <a href="#" className="hover:text-navy-700">Support</a>
          </div>
        </div>
      </footer>

      {/* ─── Sticky Booking Widget ─── */}
      <div className={`sticky-booking ${showStickyBooking ? 'visible' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
          <div className="hidden md:flex items-center gap-4 text-sm">
            <span className="font-semibold text-navy-900">Need HVAC service?</span>
            <span className="text-navy-500">Book in 60 seconds. Same-day available.</span>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <a href="#booking" className="flex-1 md:flex-none text-center px-5 py-2 rounded-xl bg-navy-900 text-white text-sm font-semibold hover:bg-navy-800 transition-colors">
              Book Now →
            </a>
            <button
              onClick={() => setShowStickyBooking(false)}
              className="p-2 rounded-lg text-navy-400 hover:text-navy-600 hover:bg-navy-50 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
