import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Air Particles Background ──────────────────────────────────────────────
function AirParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="particle absolute rounded-full bg-cyan-300/40"
          style={{
            width: `${4 + Math.random() * 6}px`,
            height: `${4 + Math.random() * 6}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Air Quality Score Ring ────────────────────────────────────────────────
function ScoreRing({ score, size = 120 }: { score: number; size?: number }) {
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 80 ? '#06b6d4' : score >= 60 ? '#0891b2' : score >= 40 ? '#f59e0b' : '#ef4444';

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e2e8f0" strokeWidth="8" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-slate-800">{score}</span>
        <span className="text-xs text-slate-400">/ 100</span>
      </div>
    </div>
  );
}

// ─── Section Wrapper ───────────────────────────────────────────────────────
function Section({ id, children, className = '' }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className={`py-20 px-6 ${className}`}
    >
      <div className="max-w-6xl mx-auto">{children}</div>
    </motion.section>
  );
}

// ─── Navigation ────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const links = [
    { href: '#symptoms', label: 'Symptoms' },
    { href: '#audit', label: 'Audit' },
    { href: '#solutions', label: 'Solutions' },
    { href: '#score', label: 'Air Score' },
    { href: '#products', label: 'Products' },
    { href: '#faq', label: 'FAQ' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="12" stroke="#0891b2" strokeWidth="2" />
            <path d="M8 14c2-4 4-6 6-6s4 2 6 6-2 6-6 6-4-2-6-6z" fill="#06b6d4" opacity="0.3" />
            <circle cx="14" cy="14" r="3" fill="#0891b2" />
          </svg>
          <span className="font-semibold text-slate-800 text-lg">ClearFlow Air</span>
        </a>
        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-sm text-slate-500 hover:text-cyan-600 transition-colors">{l.label}</a>
          ))}
          <a href="#assessment" className="bg-cyan-600 text-white text-sm px-4 py-2 rounded-full hover:bg-cyan-700 transition-colors">Get Assessment</a>
        </div>
      </div>
    </nav>
  );
}

// ─── Hero Section ──────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-cyan-50/50 to-white pt-20">
      <AirParticles />
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
          <div className="inline-flex items-center gap-2 bg-cyan-50 border border-cyan-200 rounded-full px-4 py-1.5 mb-6">
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-sm text-cyan-700 font-medium">Indoor Air Quality Specialists</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
            Cleaner air starts with the system you{' '}
            <span className="text-cyan-600">do not see.</span>
          </h1>
          <p className="text-lg text-slate-500 mb-8 max-w-lg">
            Professional diagnostics, filtration upgrades, and purification systems that transform your home's invisible air into measurable health.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#assessment" className="bg-cyan-600 text-white px-6 py-3 rounded-full font-medium hover:bg-cyan-700 transition-all hover:shadow-lg hover:shadow-cyan-200">
              Free Air Assessment
            </a>
            <a href="#solutions" className="border border-slate-200 text-slate-600 px-6 py-3 rounded-full font-medium hover:border-cyan-300 hover:text-cyan-600 transition-all">
              View Solutions
            </a>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="flex justify-center">
          <div className="relative bg-white rounded-3xl shadow-xl shadow-cyan-100/50 border border-cyan-100 p-8 w-72">
            <div className="text-center mb-4">
              <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Air Quality Index</h3>
            </div>
            <div className="flex justify-center mb-4">
              <ScoreRing score={87} size={140} />
            </div>
            <div className="text-center">
              <p className="text-cyan-600 font-semibold">Good</p>
              <p className="text-xs text-slate-400 mt-1">Based on typical home assessment</p>
            </div>
            <div className="mt-6 space-y-3">
              {[
                { label: 'Particulates', value: 92 },
                { label: 'Humidity', value: 78 },
                { label: 'Ventilation', value: 85 },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>{item.label}</span>
                    <span>{item.value}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-cyan-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Symptoms Section ──────────────────────────────────────────────────────
function Symptoms() {
  const symptoms = [
    { icon: '🌫️', title: 'Excess Dust', desc: 'Visible dust on surfaces within hours of cleaning' },
    { icon: '👃', title: 'Persistent Odors', desc: 'Lingering smells that ventilation doesn\'t resolve' },
    { icon: '🤧', title: 'Allergies & Sneezing', desc: 'Seasonal or year-round allergy symptoms indoors' },
    { icon: '💧', title: 'Humidity Issues', desc: 'Condensation, dry skin, or musty feeling rooms' },
    { icon: '💨', title: 'Poor Airflow', desc: 'Stuffy rooms, weak vents, uneven temperatures' },
    { icon: '🐾', title: 'Pet Dander', desc: 'Animal hair and dander circulating through ducts' },
    { icon: '🍄', title: 'Mold Concerns', desc: 'Visible mold or musty smells indicating moisture issues' },
  ];

  return (
    <Section id="symptoms" className="bg-slate-50/50">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Recognize the Signs</h2>
        <p className="text-slate-500 max-w-2xl mx-auto">Your home may be telling you something. These common symptoms often point to underlying air quality issues in your HVAC system.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {symptoms.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-cyan-200 hover:shadow-lg hover:shadow-cyan-50 transition-all group"
          >
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{s.icon}</div>
            <h3 className="font-semibold text-slate-800 mb-1">{s.title}</h3>
            <p className="text-sm text-slate-400">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// ─── Air System Audit ──────────────────────────────────────────────────────
function AirSystemAudit() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    { title: 'Duct Inspection', desc: 'Camera-assisted visual inspection of supply and return ducts for buildup, leaks, and damage.', icon: '🔍' },
    { title: 'Filter Analysis', desc: 'Evaluate current filter MERV rating, condition, and compatibility with your system.', icon: '🧪' },
    { title: 'Humidity Mapping', desc: 'Room-by-room humidity readings to identify imbalances and moisture sources.', icon: '📊' },
    { title: 'Ventilation Check', desc: 'Assess fresh air intake, exhaust function, and overall air exchange rates.', icon: '🌀' },
    { title: 'Purifier Options', desc: 'Recommend in-duct or standalone purification based on your specific contaminants.', icon: '✨' },
  ];

  return (
    <Section id="audit">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Air System Audit</h2>
        <p className="text-slate-500 max-w-2xl mx-auto">Our systematic 5-point audit reveals exactly what's happening in your air system — no guesswork.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-3">
          {steps.map((s, i) => (
            <motion.button
              key={s.title}
              onClick={() => setActiveStep(i)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${activeStep === i ? 'bg-cyan-50 border-cyan-200 shadow-sm' : 'bg-white border-slate-100 hover:border-cyan-100'}`}
              whileHover={{ x: 4 }}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{s.icon}</span>
                <div>
                  <h4 className={`font-semibold ${activeStep === i ? 'text-cyan-700' : 'text-slate-700'}`}>{s.title}</h4>
                  <AnimatePresence>
                    {activeStep === i && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="text-sm text-slate-400 overflow-hidden"
                      >
                        {s.desc}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
                <div className="ml-auto">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${activeStep === i ? 'border-cyan-500 bg-cyan-500' : 'border-slate-200'}`}>
                    {activeStep === i && <span className="text-white text-xs">✓</span>}
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-cyan-50 to-white rounded-3xl p-8 border border-cyan-100 flex flex-col items-center justify-center min-h-[300px]"
        >
          <div className="text-6xl mb-4">{steps[activeStep].icon}</div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">{steps[activeStep].title}</h3>
          <p className="text-slate-500 text-center max-w-xs">{steps[activeStep].desc}</p>
          <div className="mt-6 flex gap-1">
            {steps.map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full ${i === activeStep ? 'bg-cyan-500' : 'bg-slate-200'}`} />
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

// ─── Layered Solutions Diagram ─────────────────────────────────────────────
function LayeredSolutions() {
  const [revealed, setRevealed] = useState<number[]>([]);
  const layers = [
    { title: 'Filtration', color: '#06b6d4', desc: 'MERV 13+ filters capture 95% of airborne particles' },
    { title: 'Purification', color: '#0891b2', desc: 'Active ionization neutralizes viruses and VOCs' },
    { title: 'Humidity Control', color: '#0e7490', desc: 'Maintain 40-60% RH for comfort and health' },
    { title: 'Duct Cleaning', color: '#155e75', desc: 'Remove accumulated debris and biological growth' },
    { title: 'UV Treatment', color: '#164e63', desc: 'Germicidal UV-C eliminates mold and bacteria at coil' },
    { title: 'Ventilation', color: '#1e293b', desc: 'Balanced fresh air exchange with energy recovery' },
  ];

  const toggleLayer = (i: number) => {
    setRevealed(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
  };

  return (
    <Section id="solutions" className="bg-slate-50/50">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Layered Protection</h2>
        <p className="text-slate-500 max-w-2xl mx-auto">Clean air isn't one product — it's a system. Click each layer to reveal how they work together.</p>
      </div>
      <div className="max-w-3xl mx-auto">
        <div className="relative">
          {layers.map((layer, i) => (
            <motion.div
              key={layer.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => toggleLayer(i)}
              className="cursor-pointer mb-3"
            >
              <div
                className="rounded-xl border transition-all duration-300 overflow-hidden"
                style={{
                  borderColor: revealed.includes(i) ? layer.color : '#e2e8f0',
                  background: revealed.includes(i) ? `${layer.color}08` : 'white',
                }}
              >
                <div className="flex items-center gap-4 p-5">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ background: layer.color }}>
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-800">{layer.title}</h4>
                  </div>
                  <motion.div animate={{ rotate: revealed.includes(i) ? 180 : 0 }} className="text-slate-400">
                    ▼
                  </motion.div>
                </div>
                <AnimatePresence>
                  {revealed.includes(i) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pl-19">
                        <p className="text-sm text-slate-500">{layer.desc}</p>
                        <div className="mt-3 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: layer.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${100 - i * 10}%` }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
        {/* Visual diagram */}
        <div className="mt-12 flex justify-center">
          <div className="relative w-64 h-64">
            {layers.map((layer, i) => (
              <motion.div
                key={layer.title}
                className="absolute inset-0 rounded-full border-2 flex items-center justify-center"
                style={{
                  borderColor: layer.color,
                  top: `${i * 18}px`,
                  left: `${i * 18}px`,
                  right: `${i * 18}px`,
                  bottom: `${i * 18}px`,
                  opacity: 0.6 + (i * 0.07),
                }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, type: 'spring' }}
              >
                <span className="text-xs font-medium absolute -top-2 bg-white px-2" style={{ color: layer.color }}>{layer.title}</span>
              </motion.div>
            ))}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-bold text-center leading-tight shadow-lg shadow-cyan-200">
                Clean<br/>Air
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ─── Home Air Score Assessment ─────────────────────────────────────────────
function HomeAirScore() {
  const checks = [
    { id: 'filter', label: 'Filter changed within last 3 months', weight: 15 },
    { id: 'ducts', label: 'Ducts inspected/cleaned in last 5 years', weight: 15 },
    { id: 'humidity', label: 'Indoor humidity between 40-60%', weight: 12 },
    { id: 'ventilation', label: 'Adequate fresh air ventilation', weight: 12 },
    { id: 'purifier', label: 'Using air purifier or in-duct purification', weight: 10 },
    { id: 'pets', label: 'Pet areas regularly vacuumed with HEPA', weight: 8 },
    { id: 'smoke', label: 'No indoor smoking or burning candles', weight: 8 },
    { id: 'plants', label: 'Houseplants or natural air fresheners used', weight: 5 },
    { id: 'cooking', label: 'Range hood used when cooking', weight: 8 },
    { id: 'mold', label: 'No visible mold or water damage', weight: 7 },
  ];

  const [checked, setChecked] = useState<string[]>([]);
  const score = Math.round(checked.reduce((sum, id) => {
    const item = checks.find(c => c.id === id);
    return sum + (item?.weight || 0);
  }, 0) / checks.reduce((sum, c) => sum + c.weight, 0) * 100);

  const toggle = (id: string) => {
    setChecked(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const getGrade = () => {
    if (score >= 80) return { label: 'Excellent', color: 'text-cyan-600' };
    if (score >= 60) return { label: 'Good', color: 'text-cyan-500' };
    if (score >= 40) return { label: 'Fair', color: 'text-amber-500' };
    return { label: 'Needs Work', color: 'text-red-500' };
  };

  return (
    <Section id="score">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Home Air Score</h2>
        <p className="text-slate-500 max-w-2xl mx-auto">Check each item that applies to your home. Your score updates in real time.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div className="space-y-3">
          {checks.map((c, i) => (
            <motion.button
              key={c.id}
              onClick={() => toggle(c.id)}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-3 ${checked.includes(c.id) ? 'bg-cyan-50 border-cyan-200' : 'bg-white border-slate-100 hover:border-cyan-100'}`}
            >
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${checked.includes(c.id) ? 'bg-cyan-500 border-cyan-500' : 'border-slate-300'}`}>
                {checked.includes(c.id) && <span className="text-white text-xs">✓</span>}
              </div>
              <span className={`text-sm ${checked.includes(c.id) ? 'text-cyan-700 font-medium' : 'text-slate-600'}`}>{c.label}</span>
            </motion.button>
          ))}
        </div>
        <div className="sticky top-24">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-cyan-50 p-8 text-center">
            <ScoreRing score={score} size={160} />
            <div className="mt-4">
              <p className={`text-xl font-bold ${getGrade().color}`}>{getGrade().label}</p>
              <p className="text-sm text-slate-400 mt-1">{checked.length} of {checks.length} checks passed</p>
            </div>
            <div className="mt-6 p-4 bg-slate-50 rounded-xl">
              <p className="text-sm text-slate-500">
                {score >= 80 ? 'Your air quality practices are excellent. Keep it up!' :
                 score >= 60 ? 'Good foundation. A few upgrades could make a big difference.' :
                 score >= 40 ? 'Several areas need attention. Consider a professional assessment.' :
                 'Your air quality needs significant improvement. Schedule an audit today.'}
              </p>
            </div>
            <a href="#assessment" className="mt-6 inline-block bg-cyan-600 text-white px-6 py-3 rounded-full font-medium hover:bg-cyan-700 transition-all">
              Get Professional Assessment
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ─── Products & Services ───────────────────────────────────────────────────
function Products() {
  const products = [
    { title: 'Filter Upgrades', desc: 'MERV 13-16 pleated and HEPA filters for maximum particle capture.', price: 'From $45', features: ['95%+ particle capture', '6-12 month lifespan', 'All system types'], icon: '🔲' },
    { title: 'Air Purifiers', desc: 'Whole-home and portable units with multi-stage filtration.', price: 'From $299', features: ['HEPA + carbon', 'Smart sensors', 'Quiet operation'], icon: '🌬️' },
    { title: 'Duct Cleaning', desc: 'Professional source removal of dust, debris, and contaminants.', price: 'From $350', features: ['Camera inspection', 'Sanitization', 'Seal testing'], icon: '🧹' },
    { title: 'Humidity Systems', desc: 'Whole-home humidifiers and dehumidifiers for perfect balance.', price: 'From $450', features: ['Automatic control', 'Energy efficient', 'Bypass or powered'], icon: '💧' },
    { title: 'UV Germicidal', desc: 'UV-C lamp systems for coil and air sterilization.', price: 'From $200', features: ['99.9% kill rate', 'Low maintenance', '5-year lamp life'], icon: '☀️' },
    { title: 'ERV/HRV Systems', desc: 'Energy recovery ventilators for balanced fresh air.', price: 'From $1,200', features: ['Heat recovery', 'Filter intake', 'Continuous flow'], icon: '🔄' },
  ];

  return (
    <Section id="products" className="bg-slate-50/50">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Products & Services</h2>
        <p className="text-slate-500 max-w-2xl mx-auto">Complete air quality solutions — from simple filter upgrades to whole-home purification systems.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-cyan-200 hover:shadow-xl hover:shadow-cyan-50 transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <span className="text-3xl group-hover:scale-110 transition-transform">{p.icon}</span>
              <span className="text-sm font-semibold text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full">{p.price}</span>
            </div>
            <h3 className="font-bold text-slate-800 mb-2">{p.title}</h3>
            <p className="text-sm text-slate-400 mb-4">{p.desc}</p>
            <ul className="space-y-2">
              {p.features.map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-500">
                  <svg className="w-4 h-4 text-cyan-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// ─── FAQ Accordion ─────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    { q: 'How often should I change my air filter?', a: 'Standard 1-inch filters should be changed every 30-90 days depending on usage, pets, and allergies. Thicker 4-5 inch media filters last 6-12 months. We recommend checking monthly and setting a calendar reminder.' },
    { q: 'What is the best MERV rating for my home?', a: 'MERV 13 is ideal for most homes — it captures fine particles including allergens, mold spores, and some bacteria without restricting airflow. MERV 16/HEPA is best for allergy sufferers but may require system modifications.' },
    { q: 'Can duct cleaning really improve air quality?', a: 'Yes, especially if you have visible contamination, recent renovations, pest infestations, or haven\'t cleaned ducts in 5+ years. Proper cleaning removes accumulated dust, debris, and biological growth that continuously recirculates.' },
    { q: 'Do air purifiers actually work for allergies?', a: 'True HEPA purifiers capture 99.97% of particles 0.3 microns and larger — including pollen, dust mites, and pet dander. For best results, choose a unit sized for your room and run it continuously on auto mode.' },
    { q: 'What humidity level should my home maintain?', a: 'The ideal range is 40-60% relative humidity. Below 30% causes dry skin and respiratory irritation; above 65% promotes mold growth and dust mites. Whole-home systems maintain this automatically year-round.' },
    { q: 'How do I know if my ducts have leaks?', a: 'Signs include uneven heating/cooling, high energy bills, excessive dust, and rooms that never reach temperature. Professional testing with a blower door and duct blaster can quantify leakage — typical homes lose 20-30% of conditioned air.' },
    { q: 'Is UV light treatment safe?', a: 'Yes, when properly installed inside your duct system. UV-C germicidal lamps are contained within the air handler and only treat air passing through. They effectively kill mold, bacteria, and viruses on coils and in airstreams.' },
    { q: 'What does a professional air quality assessment include?', a: 'Our assessment includes duct camera inspection, particle count measurement, humidity mapping, filter evaluation, ventilation analysis, and a written report with prioritized recommendations and cost estimates.' },
  ];

  return (
    <Section id="faq">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
        <p className="text-slate-500 max-w-2xl mx-auto">Answers to the most common indoor air quality questions we receive.</p>
      </div>
      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="border border-slate-100 rounded-xl overflow-hidden bg-white hover:border-cyan-100 transition-colors"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full text-left p-5 flex items-center justify-between gap-4"
            >
              <span className="font-medium text-slate-700">{faq.q}</span>
              <motion.span
                animate={{ rotate: open === i ? 45 : 0 }}
                className="text-cyan-500 text-xl flex-shrink-0"
              >
                +
              </motion.span>
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 text-sm text-slate-500 leading-relaxed border-t border-slate-50 pt-4">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// ─── Assessment CTA Form ───────────────────────────────────────────────────
function AssessmentCTA() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Section id="assessment" className="bg-gradient-to-b from-white to-cyan-50/30">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Get Your Free Air Assessment</h2>
        <p className="text-slate-500 max-w-2xl mx-auto">Schedule a professional evaluation of your home's air quality. No obligation, no pressure — just clarity.</p>
      </div>
      <div className="max-w-xl mx-auto">
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl border border-cyan-200 p-10 text-center shadow-xl shadow-cyan-50"
          >
            <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Request Received!</h3>
            <p className="text-slate-500">We'll contact you within 24 hours to schedule your assessment. Check your email for confirmation.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-100 p-8 shadow-xl shadow-cyan-50/50 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">First Name</label>
                <input type="text" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 outline-none transition-all text-sm" placeholder="John" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">Last Name</label>
                <input type="text" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 outline-none transition-all text-sm" placeholder="Smith" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Email</label>
              <input type="email" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 outline-none transition-all text-sm" placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Phone</label>
              <input type="tel" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 outline-none transition-all text-sm" placeholder="(555) 123-4567" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Primary Concern</label>
              <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 outline-none transition-all text-sm text-slate-600">
                <option>General air quality assessment</option>
                <option>Allergies & respiratory issues</option>
                <option>Duct cleaning</option>
                <option>Humidity control</option>
                <option>Odor problems</option>
                <option>New construction / renovation</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Additional Notes</label>
              <textarea rows={3} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 outline-none transition-all text-sm resize-none" placeholder="Tell us about your home, concerns, or questions..." />
            </div>
            <button type="submit" className="w-full bg-cyan-600 text-white py-3.5 rounded-xl font-medium hover:bg-cyan-700 transition-all hover:shadow-lg hover:shadow-cyan-200 active:scale-[0.98]">
              Request Free Assessment
            </button>
            <p className="text-xs text-slate-400 text-center">No spam, no obligation. We respect your privacy.</p>
          </form>
        )}
      </div>
    </Section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="12" stroke="#06b6d4" strokeWidth="2" />
                <circle cx="14" cy="14" r="3" fill="#06b6d4" />
              </svg>
              <span className="font-semibold text-white">ClearFlow Air</span>
            </div>
            <p className="text-sm">Indoor air quality specialists serving residential and light commercial properties.</p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3 text-sm">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>Air Quality Testing</li>
              <li>Duct Cleaning</li>
              <li>Filter Upgrades</li>
              <li>Humidity Systems</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3 text-sm">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>Air Quality Guide</li>
              <li>Filter Comparison</li>
              <li>MERV Ratings</li>
              <li>Blog</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3 text-sm">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>(555) 234-5678</li>
              <li>info@clearflowair.com</li>
              <li>Mon-Fri 8am-6pm</li>
              <li>Sat 9am-2pm</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm">© 2025 ClearFlow Air. All rights reserved.</p>
          <div className="flex gap-4 text-sm">
            <span className="hover:text-cyan-400 cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-cyan-400 cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-cyan-400 cursor-pointer transition-colors">Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Main App ──────────────────────────────────────────────────────────────
function App() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <Hero />
      <Symptoms />
      <AirSystemAudit />
      <LayeredSolutions />
      <HomeAirScore />
      <Products />
      <FAQ />
      <AssessmentCTA />
      <Footer />
    </div>
  );
}

export default App;
