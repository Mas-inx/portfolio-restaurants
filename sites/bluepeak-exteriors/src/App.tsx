import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// ============ TYPES ============
interface DamageMarker {
  id: number;
  x: number;
  y: number;
  severity: 'critical' | 'major' | 'minor';
  label: string;
}

interface TimelineStep {
  id: number;
  title: string;
  description: string;
  duration: string;
  icon: string;
}

// ============ DATA ============
const damageMarkers: DamageMarker[] = [
  { id: 1, x: 25, y: 30, severity: 'critical', label: 'Missing shingles — 3 tabs' },
  { id: 2, x: 60, y: 20, severity: 'major', label: 'Granule loss — 40% exposed' },
  { id: 3, x: 75, y: 55, severity: 'critical', label: 'Puncture — hail impact' },
  { id: 4, x: 40, y: 65, severity: 'minor', label: 'Lifted flashing — ridge vent' },
  { id: 5, x: 15, y: 70, severity: 'major', label: 'Cracked boot — pipe collar' },
];

const timelineSteps: TimelineStep[] = [
  { id: 1, title: 'Inspect', description: 'Comprehensive roof and exterior inspection with drone and ground-level documentation', duration: '2-3 hours', icon: '🔍' },
  { id: 2, title: 'Document', description: 'Photo evidence, measurements, and detailed damage report compiled', duration: '24 hours', icon: '📸' },
  { id: 3, title: 'Approve', description: 'Insurance adjuster review and claim approval coordination', duration: '3-7 days', icon: '✓' },
  { id: 4, title: 'Schedule', description: 'Materials ordered and crew scheduled based on your availability', duration: '5-10 days', icon: '📅' },
  { id: 5, title: 'Repair', description: 'Full restoration with premium materials and clean worksite', duration: '1-3 days', icon: '🔨' },
  { id: 6, title: 'Final Photos', description: 'Before/after documentation and warranty activation', duration: 'Same day', icon: '📋' },
];

const services = [
  { name: 'Roofing', icon: '🏠', desc: 'Full replacement, repair, and maintenance for all roof types', features: ['Asphalt shingles', 'Metal roofing', 'Flat roofs', 'Tile & slate'] },
  { name: 'Siding', icon: '🧱', desc: 'Vinyl, fiber cement, and engineered wood siding systems', features: ['James Hardie', 'LP SmartSide', 'Vinyl siding', 'Insulated options'] },
  { name: 'Gutters', icon: '🌊', desc: 'Seamless gutter installation and leaf protection systems', features: ['5" & 6" seamless', 'Gutter guards', 'Downspout routing', 'Copper accents'] },
  { name: 'Storm Damage', icon: '⛈️', desc: 'Emergency response and full storm restoration services', features: ['Hail damage', 'Wind damage', 'Fallen trees', 'Emergency tarping'] },
  { name: 'Leak Repair', icon: '💧', desc: 'Diagnostic leak detection and permanent repair solutions', features: ['Thermal imaging', 'Flashing repair', 'Valley repair', 'Ice dam prevention'] },
  { name: 'Ventilation', icon: '🌀', desc: 'Attic ventilation systems for energy efficiency', features: ['Ridge vents', 'Soffit vents', 'Power vents', 'Insulation check'] },
];

const weatherStates = ['CLEAR', 'WATCH', 'WARNING', 'SEVERE'];

// ============ COMPONENTS ============

function WeatherAlert({ state }: { state: string }) {
  const config: Record<string, { bg: string; border: string; text: string; label: string; desc: string }> = {
    CLEAR: { bg: 'bg-storm-50', border: 'border-storm-200', text: 'text-storm-700', label: 'ALL CLEAR', desc: 'No active weather alerts in your area' },
    WATCH: { bg: 'bg-amber-50', border: 'border-amber-300', text: 'text-amber-800', label: 'SEVERE WATCH', desc: 'Conditions favorable for severe thunderstorms — 60% probability' },
    WARNING: { bg: 'bg-orange-50', border: 'border-orange-400', text: 'text-orange-800', label: 'STORM WARNING', desc: 'Severe thunderstorm warning until 8:00 PM — hail up to 1.5"' },
    SEVERE: { bg: 'bg-red-50', border: 'border-red-500', text: 'text-red-800', label: 'TORNADO WARNING', desc: 'Take shelter immediately — rotation detected 4mi SW' },
  };
  const c = config[state] || config.CLEAR;

  return (
    <motion.div
      layout
      className={`${c.bg} ${c.border} border-2 rounded-xl p-5 relative overflow-hidden`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {state !== 'CLEAR' && <div className="scan-line" />}
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-3 h-3 rounded-full ${state === 'SEVERE' ? 'bg-red-500' : state === 'WARNING' ? 'bg-orange-500' : state === 'WATCH' ? 'bg-amber-500' : 'bg-green-500'} ${state !== 'CLEAR' ? 'alert-flash' : ''}`} />
        <span className={`font-bold text-sm tracking-wider ${c.text}`}>{c.label}</span>
        <span className="ml-auto text-xs text-storm-500 font-mono">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      <p className={`text-sm ${c.text} opacity-80`}>{c.desc}</p>
      {state !== 'CLEAR' && (
        <div className="mt-3 flex gap-2">
          <span className="text-xs bg-white/60 px-2 py-1 rounded font-mono text-storm-700">Wind: {state === 'SEVERE' ? '85' : state === 'WARNING' ? '60' : '45'} mph</span>
          <span className="text-xs bg-white/60 px-2 py-1 rounded font-mono text-storm-700">Hail: {state === 'SEVERE' ? '2.0"' : state === 'WARNING' ? '1.5"' : '0.75"'}</span>
        </div>
      )}
    </motion.div>
  );
}

function RadarDisplay() {
  return (
    <div className="relative w-32 h-32 rounded-full border-2 border-storm-300 bg-storm-900/5 overflow-hidden">
      {/* Radar rings */}
      {[25, 50, 75].map((size) => (
        <div key={size} className="absolute rounded-full border border-storm-300/40" style={{ width: `${size}%`, height: `${size}%`, top: `${(100 - size) / 2}%`, left: `${(100 - size) / 2}%` }} />
      ))}
      {/* Cross hairs */}
      <div className="absolute top-0 bottom-0 left-1/2 w-px bg-storm-300/30" />
      <div className="absolute left-0 right-0 top-1/2 h-px bg-storm-300/30" />
      {/* Sweep */}
      <div className="radar-sweep absolute inset-0 origin-center">
        <div className="absolute top-0 left-1/2 w-1/2 h-1/2 origin-bottom-left" style={{ background: 'conic-gradient(from 0deg, transparent 0deg, rgba(59,130,246,0.3) 30deg, transparent 60deg)' }} />
      </div>
      {/* Blips */}
      <div className="absolute w-2 h-2 bg-red-500 rounded-full top-[30%] left-[60%] pulse-ring" style={{ animationDelay: '0s' }} />
      <div className="absolute w-1.5 h-1.5 bg-amber-400 rounded-full top-[55%] left-[35%]" />
      <div className="absolute w-1 h-1 bg-green-400 rounded-full top-[70%] left-[65%]" />
    </div>
  );
}

function InspectionReport() {
  const [selectedMarker, setSelectedMarker] = useState<DamageMarker | null>(null);
  const [animateMarkers, setAnimateMarkers] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (inView) {
      setTimeout(() => setAnimateMarkers(true), 500);
    }
  }, [inView]);

  return (
    <section id="inspection" className="py-20 px-6 bg-storm-50" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-sm font-bold text-storm-500 tracking-wider uppercase mb-2">Sample Report</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-storm-900 mb-3">Inspection Report Dashboard</h2>
          <p className="text-storm-600 max-w-2xl mb-10">Every inspection produces a detailed report with photographic evidence, damage markers, priority scoring, and repair estimates.</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Roof image with markers */}
          <motion.div
            className="lg:col-span-3 report-card"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="report-header flex items-center justify-between">
              <div>
                <p className="text-xs text-storm-300 uppercase tracking-wider">Report #BP-2024-0847</p>
                <p className="font-bold text-lg">1847 Cedar Ridge Dr — Full Roof Inspection</p>
              </div>
              <span className="bg-red-500/20 text-red-300 text-xs font-bold px-3 py-1 rounded-full">5 DAMAGE POINTS</span>
            </div>
            {/* Roof visualization */}
            <div className="relative h-80 bg-gradient-to-br from-storm-700 via-storm-600 to-storm-800 overflow-hidden">
              {/* Roof texture lines */}
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="absolute left-0 right-0 h-px bg-storm-500/20" style={{ top: `${(i + 1) * 8}%` }} />
              ))}
              {/* Ridge line */}
              <div className="absolute top-[15%] left-[10%] right-[10%] h-1 bg-storm-400/40 rounded" />
              {/* Valley */}
              <div className="absolute top-[15%] left-1/2 w-1 h-[70%] bg-storm-400/30" style={{ transform: 'rotate(5deg)' }} />

              {/* Damage markers */}
              {damageMarkers.map((marker, idx) => (
                <motion.button
                  key={marker.id}
                  className={`damage-marker damage-${marker.severity} absolute z-10 ${animateMarkers ? 'marker-bounce' : ''}`}
                  style={{ left: `${marker.x}%`, top: `${marker.y}%`, animationDelay: `${idx * 0.2}s` }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={animateMarkers ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ delay: 0.5 + idx * 0.3, type: 'spring', stiffness: 300 }}
                  onClick={() => setSelectedMarker(marker)}
                >
                  {marker.id}
                </motion.button>
              ))}

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg p-3 flex gap-4">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500" /><span className="text-xs text-white">Critical</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-amber-500" /><span className="text-xs text-white">Major</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500" /><span className="text-xs text-white">Minor</span></div>
              </div>
            </div>
          </motion.div>

          {/* Report details */}
          <motion.div
            className="lg:col-span-2 space-y-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {/* Selected marker detail */}
            <div className="bg-white rounded-xl border border-storm-200 p-5">
              <AnimatePresence mode="wait">
                {selectedMarker ? (
                  <motion.div key={selectedMarker.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`damage-marker damage-${selectedMarker.severity} !static`}>{selectedMarker.id}</div>
                      <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded ${selectedMarker.severity === 'critical' ? 'bg-red-100 text-red-700' : selectedMarker.severity === 'major' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>{selectedMarker.severity}</span>
                    </div>
                    <p className="font-semibold text-storm-900">{selectedMarker.label}</p>
                    <p className="text-sm text-storm-500 mt-1">Est. repair: ${selectedMarker.severity === 'critical' ? '800-1,200' : selectedMarker.severity === 'major' ? '400-700' : '150-300'}</p>
                  </motion.div>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <p className="text-sm text-storm-500">Click a damage marker on the roof diagram to view details</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Summary stats */}
            <div className="bg-white rounded-xl border border-storm-200 p-5">
              <p className="text-xs font-bold text-storm-500 uppercase tracking-wider mb-3">Estimate Summary</p>
              <div className="space-y-3">
                <div className="flex justify-between"><span className="text-sm text-storm-600">Total damage points</span><span className="font-bold text-storm-900">5</span></div>
                <div className="flex justify-between"><span className="text-sm text-storm-600">Critical repairs</span><span className="font-bold text-red-600">2</span></div>
                <div className="flex justify-between"><span className="text-sm text-storm-600">Insurance covered</span><span className="font-bold text-green-600">$8,400</span></div>
                <div className="flex justify-between"><span className="text-sm text-storm-600">Homeowner deductible</span><span className="font-bold text-storm-900">$2,500</span></div>
                <div className="border-t border-storm-200 pt-3 flex justify-between"><span className="font-semibold text-storm-900">Total estimate</span><span className="font-extrabold text-storm-900 text-lg">$10,900</span></div>
              </div>
            </div>

            {/* Priority */}
            <div className="bg-white rounded-xl border border-storm-200 p-5">
              <p className="text-xs font-bold text-storm-500 uppercase tracking-wider mb-3">Repair Priority</p>
              <div className="space-y-2">
                {['Roof replacement — south face', 'Pipe boot replacement', 'Ridge vent re-seal', 'Gutter realignment', 'Cosmetic touch-up'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-xs font-bold text-storm-400 w-4">{i + 1}</span>
                    <div className={`flex-1 h-2 rounded-full overflow-hidden bg-storm-100`}>
                      <motion.div
                        className={`h-full rounded-full ${i < 2 ? 'bg-red-500' : i < 4 ? 'bg-amber-500' : 'bg-blue-500'}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${100 - i * 18}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.15, duration: 0.6 }}
                      />
                    </div>
                    <span className="text-xs text-storm-600 w-32 truncate">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function BeforeAfterSlider({ beforeColor, afterColor, label }: { beforeColor: string; afterColor: string; label: string }) {
  const [position, setPosition] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!sliderRef.current || !isDragging.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(5, Math.min(95, x)));
  }, []);

  const handleMouseDown = () => { isDragging.current = true; };
  const handleMouseUp = () => { isDragging.current = false; };

  useEffect(() => {
    const handleGlobalMove = (e: MouseEvent) => handleMove(e.clientX);
    const handleTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);
    window.addEventListener('mousemove', handleGlobalMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleGlobalMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [handleMove]);

  return (
    <div>
      <div
        ref={sliderRef}
        className="ba-slider rounded-xl h-64 md:h-80 relative"
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        {/* After (full background) */}
        <div className="absolute inset-0 rounded-xl" style={{ background: afterColor }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">✓</div>
              <p className="text-white font-bold text-sm">AFTER</p>
            </div>
          </div>
        </div>
        {/* Before (clipped) */}
        <div className="ba-before rounded-xl" style={{ width: `${position}%`, background: beforeColor }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">✕</div>
              <p className="text-white font-bold text-sm">BEFORE</p>
            </div>
          </div>
        </div>
        {/* Handle */}
        <div className="ba-handle" style={{ left: `${position}%` }} />
      </div>
      <p className="text-center text-sm font-semibold text-storm-700 mt-3">{label}</p>
    </div>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-sm font-bold text-storm-500 tracking-wider uppercase mb-2">What We Do</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-storm-900 mb-3">Full Exterior Restoration</h2>
          <p className="text-storm-600 max-w-2xl mb-12">From emergency storm response to planned upgrades, we handle every aspect of your home's exterior envelope.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={service.name}
              className="bg-white border border-storm-200 rounded-xl p-6 hover:border-storm-400 hover:shadow-lg transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="text-3xl mb-3">{service.icon}</div>
              <h3 className="font-bold text-lg text-storm-900 mb-1 group-hover:text-storm-700">{service.name}</h3>
              <p className="text-sm text-storm-600 mb-4">{service.desc}</p>
              <ul className="space-y-1.5">
                {service.features.map((f) => (
                  <li key={f} className="text-xs text-storm-500 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-storm-400" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InsuranceSection() {
  const docs = [
    { icon: '📸', title: 'Photographic Evidence', desc: 'High-resolution photos of every damage point, timestamped and geo-tagged for adjuster review.' },
    { icon: '📐', title: 'Precise Measurements', desc: 'Roof squares, siding footage, and gutter linear feet — all measured and documented.' },
    { icon: '📝', title: 'Written Scope of Work', desc: 'Detailed line-item scope that matches insurance coding for seamless claim processing.' },
    { icon: '🤝', title: 'Adjuster Coordination', desc: 'We meet with your adjuster on-site to ensure nothing is missed in the initial estimate.' },
  ];

  return (
    <section id="insurance" className="py-20 px-6 bg-storm-900 text-white">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-sm font-bold text-storm-400 tracking-wider uppercase mb-2">Claims Support</p>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3">Insurance Documentation</h2>
          <p className="text-storm-300 max-w-2xl mb-12">We handle the paperwork so you can focus on your family. Our documentation package is designed to get claims approved faster.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {docs.map((doc, idx) => (
            <motion.div
              key={doc.title}
              className="bg-storm-800/50 border border-storm-700 rounded-xl p-6 hover:bg-storm-800 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="text-3xl mb-3">{doc.icon}</div>
              <h3 className="font-bold text-white mb-2">{doc.title}</h3>
              <p className="text-sm text-storm-400">{doc.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 bg-storm-800/30 border border-storm-700 rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {[
            { num: '97%', label: 'Claim approval rate' },
            { num: '4.2 days', label: 'Avg. adjuster meeting' },
            { num: '$2.1M', label: 'Claims processed 2024' },
            { num: '340+', label: 'Homes restored' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-extrabold text-white">{stat.num}</p>
              <p className="text-xs text-storm-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TimelineSection() {
  const [activeStep, setActiveStep] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % timelineSteps.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [inView]);

  return (
    <section id="timeline" className="py-20 px-6 bg-storm-50" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-sm font-bold text-storm-500 tracking-wider uppercase mb-2">Our Process</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-storm-900 mb-3">Repair Timeline</h2>
          <p className="text-storm-600 max-w-2xl mb-12">From first call to final walkthrough — here's exactly what happens and when.</p>
        </motion.div>

        <div className="space-y-0">
          {timelineSteps.map((step, idx) => (
            <motion.div
              key={step.id}
              className="timeline-step flex gap-5 pb-8 cursor-pointer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setActiveStep(idx)}
            >
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all duration-300 ${idx <= activeStep ? 'bg-storm-900 text-white scale-110' : 'bg-storm-200 text-storm-500'}`}>
                {idx < activeStep ? '✓' : step.icon}
              </div>
              <div className={`flex-1 transition-all duration-300 ${idx === activeStep ? 'opacity-100' : 'opacity-60'}`}>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-bold text-storm-900">{step.title}</h3>
                  <span className="text-xs bg-storm-200 text-storm-700 px-2 py-0.5 rounded-full font-mono">{step.duration}</span>
                </div>
                <p className="text-sm text-storm-600">{step.description}</p>
                {idx === activeStep && (
                  <motion.div
                    className="mt-2 h-1 bg-storm-900 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 3, ease: 'linear' }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BeforeAfterSection() {
  return (
    <section id="before-after" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-sm font-bold text-storm-500 tracking-wider uppercase mb-2">Results</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-storm-900 mb-3">Before & After</h2>
          <p className="text-storm-600 max-w-2xl mb-12">Drag the slider to see the transformation. Every project is documented with before/after photography.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <BeforeAfterSlider
              beforeColor="linear-gradient(135deg, #4a3728, #6b4c35, #3d2e22)"
              afterColor="linear-gradient(135deg, #1a365d, #2d4a7a, #1e3a5f)"
              label="Full Roof Replacement — Architectural Shingles"
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <BeforeAfterSlider
              beforeColor="linear-gradient(135deg, #5c4033, #8b6f47, #4a3520)"
              afterColor="linear-gradient(135deg, #e8e0d4, #d4c8b8, #f0ebe4)"
              label="Siding Replacement — James Hardie Plank"
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <BeforeAfterSlider
              beforeColor="linear-gradient(135deg, #3d3d3d, #555, #2a2a2a)"
              afterColor="linear-gradient(135deg, #4a5568, #2d3748, #1a202c)"
              label="Metal Roof Upgrade — Standing Seam"
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
            <BeforeAfterSlider
              beforeColor="linear-gradient(135deg, #5a4a3a, #7a6a52, #4d3e2e)"
              afterColor="linear-gradient(135deg, #2d3748, #4a5568, #1a202c)"
              label="Gutter & Downspout System"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function WarrantySection() {
  const materials = [
    { name: 'Architectural Shingles', brand: 'GAF / Owens Corning', warranty: 'Lifetime Limited', highlight: 'Wind rating up to 130 mph' },
    { name: 'Standing Seam Metal', brand: 'Petersen / MBCI', warranty: '40-Year Finish', highlight: 'Class 4 impact resistance' },
    { name: 'Fiber Cement Siding', brand: 'James Hardie', warranty: '30-Year Non-Prorated', highlight: 'ColorPlus® technology' },
    { name: 'Seamless Gutters', brand: 'LeafFilter / Gutter Helm', warranty: '20-Year System', highlight: 'No-clog guarantee' },
  ];

  return (
    <section id="warranty" className="py-20 px-6 bg-storm-50">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-sm font-bold text-storm-500 tracking-wider uppercase mb-2">Built to Last</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-storm-900 mb-3">Warranty & Materials</h2>
          <p className="text-storm-600 max-w-2xl mb-12">We use only premium, manufacturer-certified materials backed by industry-leading warranties.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {materials.map((mat, idx) => (
            <motion.div
              key={mat.name}
              className="bg-white rounded-xl border border-storm-200 p-6 hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="w-12 h-12 bg-storm-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">🛡️</span>
              </div>
              <h3 className="font-bold text-storm-900 mb-1">{mat.name}</h3>
              <p className="text-xs text-storm-500 mb-3">{mat.brand}</p>
              <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2 mb-3">
                <p className="text-xs font-bold text-green-700">{mat.warranty}</p>
              </div>
              <p className="text-sm text-storm-600">{mat.highlight}</p>
            </motion.div>
          ))}
        </div>

        {/* Workmanship warranty */}
        <motion.div
          className="mt-10 bg-storm-900 rounded-xl p-8 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-4xl font-extrabold mb-2">10-Year</p>
          <p className="text-storm-300">Workmanship Warranty on Every Project</p>
          <p className="text-sm text-storm-400 mt-2 max-w-lg mx-auto">Covers installation defects, flashing failures, and workmanship issues — on top of manufacturer material warranties.</p>
        </motion.div>
      </div>
    </section>
  );
}

function InspectionCTA() {
  const [formState, setFormState] = useState({ name: '', phone: '', address: '', urgency: 'routine', notes: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="book" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <p className="text-sm font-bold text-storm-500 tracking-wider uppercase mb-2">Free Inspection</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-storm-900 mb-3">Schedule Your Inspection</h2>
          <p className="text-storm-600 max-w-xl mx-auto">Free, no-obligation roof and exterior inspection. We'll document everything and provide a detailed report within 24 hours.</p>
        </motion.div>

        <motion.div
          className="bg-white border border-storm-200 rounded-2xl p-8 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {submitted ? (
            <motion.div className="text-center py-8" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="text-5xl mb-4">✓</div>
              <h3 className="text-2xl font-bold text-storm-900 mb-2">Inspection Requested</h3>
              <p className="text-storm-600">We'll call you within 2 hours to confirm your appointment. Emergency requests are prioritized.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-storm-700 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-4 py-3 border border-storm-200 rounded-lg focus:ring-2 focus:ring-storm-500 focus:border-storm-500 outline-none transition-all"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-storm-700 mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-storm-200 rounded-lg focus:ring-2 focus:ring-storm-500 focus:border-storm-500 outline-none transition-all"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-storm-700 mb-1.5">Property Address</label>
                <input
                  type="text"
                  required
                  value={formState.address}
                  onChange={(e) => setFormState({ ...formState, address: e.target.value })}
                  className="w-full px-4 py-3 border border-storm-200 rounded-lg focus:ring-2 focus:ring-storm-500 focus:border-storm-500 outline-none transition-all"
                  placeholder="123 Main St, City, State"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-storm-700 mb-1.5">Urgency Level</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'emergency', label: '⚡ Emergency', desc: 'Active leak / damage' },
                    { value: 'soon', label: '📅 Soon', desc: 'Within 1-2 weeks' },
                    { value: 'routine', label: '📋 Routine', desc: 'General inspection' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setFormState({ ...formState, urgency: opt.value })}
                      className={`p-3 border rounded-lg text-left transition-all ${formState.urgency === opt.value ? 'border-storm-900 bg-storm-50 ring-2 ring-storm-900/20' : 'border-storm-200 hover:border-storm-400'}`}
                    >
                      <p className="font-semibold text-sm text-storm-900">{opt.label}</p>
                      <p className="text-xs text-storm-500">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-storm-700 mb-1.5">Additional Notes</label>
                <textarea
                  value={formState.notes}
                  onChange={(e) => setFormState({ ...formState, notes: e.target.value })}
                  className="w-full px-4 py-3 border border-storm-200 rounded-lg focus:ring-2 focus:ring-storm-500 focus:border-storm-500 outline-none transition-all resize-none h-24"
                  placeholder="Describe any visible damage, recent storms, or concerns..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-storm-900 text-white font-bold py-4 rounded-lg hover:bg-storm-800 transition-colors text-lg"
              >
                Request Free Inspection →
              </button>
              <p className="text-xs text-storm-500 text-center">Response within 2 hours during business hours. Emergency calls answered 24/7.</p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// ============ MAIN APP ============

export default function App() {
  const [weatherState, setWeatherState] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setWeatherState((prev) => (prev + 1) % weatherStates.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-storm-100' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-storm-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm">BP</span>
            </div>
            <span className={`font-bold text-lg ${scrolled ? 'text-storm-900' : 'text-storm-900'}`}>BluePeak</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-storm-600">
            <a href="#inspection" className="hover:text-storm-900 transition-colors">Reports</a>
            <a href="#services" className="hover:text-storm-900 transition-colors">Services</a>
            <a href="#insurance" className="hover:text-storm-900 transition-colors">Insurance</a>
            <a href="#before-after" className="hover:text-storm-900 transition-colors">Results</a>
            <a href="#book" className="bg-storm-900 text-white px-4 py-2 rounded-lg hover:bg-storm-800 transition-colors">Book Inspection</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-storm-50 via-white to-storm-100" />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            {Array.from({ length: 20 }).map((_, i) => (
              <line key={i} x1="0" y1={i * 20} x2="400" y2={i * 20} stroke="#102a43" strokeWidth="0.5" />
            ))}
            {Array.from({ length: 20 }).map((_, i) => (
              <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="400" stroke="#102a43" strokeWidth="0.5" />
            ))}
          </svg>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-storm-100 border border-storm-200 rounded-full px-4 py-1.5 mb-6">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-xs font-semibold text-storm-700">Accepting emergency calls 24/7</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-storm-900 leading-tight mb-6">
              Storm damage documented properly.{' '}
              <span className="text-storm-500">Repairs done cleanly.</span>
            </h1>
            <p className="text-lg text-storm-600 mb-8 max-w-lg">
              We inspect, document, and restore your roof and exterior after storm damage — working directly with your insurance to get it done right.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#book" className="bg-storm-900 text-white font-bold px-8 py-4 rounded-xl hover:bg-storm-800 transition-all hover:-translate-y-0.5 shadow-lg">
                Free Inspection →
              </a>
              <a href="tel:5551234567" className="border-2 border-storm-300 text-storm-700 font-bold px-8 py-4 rounded-xl hover:border-storm-500 transition-all">
                (555) 123-4567
              </a>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-storm-500">
              <span className="flex items-center gap-1.5">⭐ 4.9 (230+ reviews)</span>
              <span className="flex items-center gap-1.5">🛡️ Licensed & Insured</span>
              <span className="flex items-center gap-1.5">⚡ 2hr response</span>
            </div>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <WeatherAlert state={weatherStates[weatherState]} />
            <div className="flex items-center gap-6 bg-white border border-storm-200 rounded-xl p-5">
              <RadarDisplay />
              <div className="flex-1">
                <p className="text-xs font-bold text-storm-500 uppercase tracking-wider mb-1">Live Weather Radar</p>
                <p className="text-sm text-storm-700 font-semibold">Service Area Coverage</p>
                <p className="text-xs text-storm-500 mt-1">Monitoring storm cells in real-time for rapid response deployment</p>
                <div className="mt-3 flex gap-2">
                  <span className="text-xs bg-storm-100 text-storm-700 px-2 py-1 rounded font-mono">25mi radius</span>
                  <span className="text-xs bg-storm-100 text-storm-700 px-2 py-1 rounded font-mono">5 crews ready</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Inspection Report */}
      <InspectionReport />

      {/* Services */}
      <ServicesSection />

      {/* Insurance Documentation */}
      <InsuranceSection />

      {/* Timeline */}
      <TimelineSection />

      {/* Before/After */}
      <BeforeAfterSection />

      {/* Warranty & Materials */}
      <WarrantySection />

      {/* Inspection CTA */}
      <InspectionCTA />

      {/* Footer */}
      <footer className="bg-storm-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-storm-900 font-black text-sm">BP</span>
                </div>
                <span className="font-bold text-lg">BluePeak Exteriors</span>
              </div>
              <p className="text-sm text-storm-400">Storm restoration and exterior renovation specialists. Serving the greater metro area since 2012.</p>
            </div>
            <div>
              <p className="font-bold text-sm mb-3">Services</p>
              <ul className="space-y-2 text-sm text-storm-400">
                <li>Roofing</li><li>Siding</li><li>Gutters</li><li>Storm Damage</li><li>Leak Repair</li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-sm mb-3">Company</p>
              <ul className="space-y-2 text-sm text-storm-400">
                <li>About Us</li><li>Our Process</li><li>Warranties</li><li>Careers</li><li>Blog</li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-sm mb-3">Emergency</p>
              <p className="text-sm text-storm-400 mb-2">24/7 storm response</p>
              <p className="text-xl font-bold">(555) 123-4567</p>
              <p className="text-sm text-storm-400 mt-2">info@bluepeakexteriors.com</p>
            </div>
          </div>
          <div className="border-t border-storm-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-storm-500">© 2024 BluePeak Exteriors. All rights reserved. License #ROC-284756</p>
            <div className="flex gap-4 text-xs text-storm-500">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Sitemap</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky Emergency CTA */}
      <motion.div
        className="emergency-cta"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, type: 'spring' }}
        onClick={() => window.location.href = 'tel:5551234567'}
      >
        <span className="alert-flash">⚡</span>
        <span>Emergency? Call Now</span>
      </motion.div>
    </div>
  );
}
