import { useState, useEffect, useRef, type FormEvent } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// ============ ICON COMPONENT ============
function Icon({ name, className = 'w-6 h-6' }: { name: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    thermometer: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" /></svg>,
    house: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
    snowflake: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="22" /><line x1="2" y1="12" x2="22" y2="12" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" /><line x1="19.07" y1="4.93" x2="4.93" y2="19.07" /></svg>,
    map: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" /><line x1="8" y1="2" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="22" /></svg>,
    smartphone: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>,
    wrench: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>,
    flame: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" /></svg>,
    sun: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>,
  };
  return <>{icons[name] || null}</>;
}

// ============ NAVIGATION ============
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" stroke="#0d9488" strokeWidth="2" />
            <path d="M10 20 C10 14, 16 10, 16 10 C16 10, 22 14, 22 20" stroke="#0d9488" strokeWidth="2" fill="none" />
            <path d="M13 22 C13 18, 16 15, 16 15 C16 15, 19 18, 19 22" stroke="#22c55e" strokeWidth="1.5" fill="none" />
          </svg>
          <span className="font-semibold text-teal-800 text-lg">Verdant Air</span>
        </a>
        <div className="hidden md:flex items-center gap-6 text-sm text-slate-600">
          <a href="#explainer" className="hover:text-teal-700 transition-colors">How It Works</a>
          <a href="#calculator" className="hover:text-teal-700 transition-colors">Calculator</a>
          <a href="#services" className="hover:text-teal-700 transition-colors">Services</a>
          <a href="#rebates" className="hover:text-teal-700 transition-colors">Rebates</a>
          <a href="#zoning" className="hover:text-teal-700 transition-colors">Zoning</a>
          <a href="#contact" className="bg-teal-600 text-white px-4 py-2 rounded-full hover:bg-teal-700 transition-colors">Get Quote</a>
        </div>
      </div>
    </nav>
  );
}

// ============ HERO ============
function Hero() {
  const heroImage = "https://images.unsplash.com/photo-1631545806607-f4acbf48f12f?w=1600&q=85";
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50/90 via-white/85 to-green-50/90" />
      </div>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-200/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-24 pb-16 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Up to 60% energy savings
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
            Efficient comfort for <span className="text-teal-600">every season.</span>
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-lg">
            High-efficiency heat pumps, smart zoning, and intelligent HVAC systems that reduce your carbon footprint while keeping your home perfectly comfortable.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#calculator" className="bg-teal-600 text-white px-6 py-3 rounded-full font-medium hover:bg-teal-700 transition-all hover:shadow-lg hover:shadow-teal-200">
              Calculate Savings
            </a>
            <a href="#explainer" className="border border-teal-300 text-teal-700 px-6 py-3 rounded-full font-medium hover:bg-teal-50 transition-all">
              See How It Works
            </a>
          </div>
        </motion.div>

        {/* Savings Preview Card */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="relative">
          <div className="bg-white rounded-2xl shadow-xl border border-teal-100 p-8 animate-pulse-glow">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2L12 8H18L13 12L15 18L10 14L5 18L7 12L2 8H8L10 2Z" fill="#22c55e" />
                </svg>
              </div>
              <span className="text-sm font-medium text-slate-500">Your Estimated Savings</span>
            </div>
            <div className="text-4xl font-bold text-teal-700 mb-2">$1,240<span className="text-lg font-normal text-slate-400">/year</span></div>
            <p className="text-slate-500 text-sm mb-6">Based on average 2,000 sq ft home upgrade</p>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Energy Reduction</span>
                <span className="text-sm font-semibold text-green-600">↓ 52%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-gradient-to-r from-teal-500 to-green-500 h-2 rounded-full" style={{ width: '52%' }} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">CO₂ Offset</span>
                <span className="text-sm font-semibold text-green-600">3.2 tons/yr</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-400 to-teal-400 h-2 rounded-full" style={{ width: '68%' }} />
              </div>
            </div>
          </div>
          {/* Floating badge */}
          <div className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-float">
            ENERGY STAR®
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============ HEAT PUMP EXPLAINER ============
function HeatPumpExplainer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });
  const [mode, setMode] = useState<'heating' | 'cooling'>('heating');

  return (
    <section id="explainer" className="py-24 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How a Heat Pump Works</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Heat pumps don't generate heat — they move it. In winter, they extract warmth from outside air. In summer, they reverse to cool your home.</p>
        </motion.div>

        {/* Mode Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-slate-100 rounded-full p-1 flex">
            <button onClick={() => setMode('heating')} className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${mode === 'heating' ? 'bg-orange-500 text-white shadow' : 'text-slate-600'}`}>
              <Icon name="flame" className="w-4 h-4" /> Heating Mode
            </button>
            <button onClick={() => setMode('cooling')} className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${mode === 'cooling' ? 'bg-blue-500 text-white shadow' : 'text-slate-600'}`}>
              <Icon name="snowflake" className="w-4 h-4" /> Cooling Mode
            </button>
          </div>
        </div>

        {/* Diagram */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8, delay: 0.2 }} className="relative max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-slate-50 to-teal-50 rounded-3xl p-8 md:p-12 border border-teal-100">
            <svg viewBox="0 0 800 400" className="w-full h-auto" fill="none">
              {/* Outside Unit */}
              <rect x="50" y="100" width="180" height="200" rx="16" fill="white" stroke={mode === 'heating' ? '#f97316' : '#3b82f6'} strokeWidth="2" />
              <text x="140" y="80" textAnchor="middle" className="text-sm" fill="#475569" fontSize="14" fontWeight="600">Outside Unit</text>
              {/* Fan */}
              <circle cx="140" cy="180" r="35" stroke={mode === 'heating' ? '#f97316' : '#3b82f6'} strokeWidth="2" fill="none" />
              <g className={isInView ? 'animate-spin-slow' : ''} style={{ transformOrigin: '140px 180px' }}>
                <line x1="140" y1="150" x2="140" y2="210" stroke={mode === 'heating' ? '#f97316' : '#3b82f6'} strokeWidth="2" />
                <line x1="110" y1="180" x2="170" y2="180" stroke={mode === 'heating' ? '#f97316' : '#3b82f6'} strokeWidth="2" />
                <line x1="119" y1="159" x2="161" y2="201" stroke={mode === 'heating' ? '#f97316' : '#3b82f6'} strokeWidth="2" />
                <line x1="161" y1="159" x2="119" y2="201" stroke={mode === 'heating' ? '#f97316' : '#3b82f6'} strokeWidth="2" />
              </g>
              {/* Coils */}
              <path d="M90 250 Q100 240 110 250 Q120 260 130 250 Q140 240 150 250 Q160 260 170 250 Q180 240 190 250" stroke={mode === 'heating' ? '#f97316' : '#3b82f6'} strokeWidth="2" fill="none" />
              <text x="140" y="280" textAnchor="middle" fill="#64748b" fontSize="11">
                {mode === 'heating' ? 'Absorbs heat' : 'Releases heat'}
              </text>

              {/* Indoor Unit */}
              <rect x="570" y="100" width="180" height="200" rx="16" fill="white" stroke={mode === 'heating' ? '#ef4444' : '#06b6d4'} strokeWidth="2" />
              <text x="660" y="80" textAnchor="middle" fill="#475569" fontSize="14" fontWeight="600">Indoor Unit</text>
              {/* Air handler */}
              <rect x="610" y="140" width="100" height="60" rx="8" fill={mode === 'heating' ? '#fef3c7' : '#e0f2fe'} stroke={mode === 'heating' ? '#f59e0b' : '#0ea5e9'} strokeWidth="1.5" />
              <text x="660" y="175" textAnchor="middle" fill="#475569" fontSize="11">Air Handler</text>
              {/* Vents */}
              <rect x="620" y="220" width="80" height="8" rx="4" fill={mode === 'heating' ? '#fed7aa' : '#bae6fd'} />
              <rect x="620" y="235" width="80" height="8" rx="4" fill={mode === 'heating' ? '#fed7aa' : '#bae6fd'} />
              <rect x="620" y="250" width="80" height="8" rx="4" fill={mode === 'heating' ? '#fed7aa' : '#bae6fd'} />
              <text x="660" y="280" textAnchor="middle" fill="#64748b" fontSize="11">
                {mode === 'heating' ? 'Warm air → rooms' : 'Cool air → rooms'}
              </text>

              {/* Refrigerant lines */}
              <path d="M230 160 L570 160" stroke={mode === 'heating' ? '#f97316' : '#3b82f6'} strokeWidth="3" strokeDasharray="8 4" className={isInView ? 'animate-dash-flow' : ''} />
              <path d="M230 240 L570 240" stroke={mode === 'heating' ? '#3b82f6' : '#f97316'} strokeWidth="3" strokeDasharray="8 4" className={isInView ? 'animate-dash-flow' : ''} />

              {/* Compressor in middle */}
              <rect x="360" y="170" width="80" height="60" rx="12" fill="white" stroke="#0d9488" strokeWidth="2" />
              <text x="400" y="195" textAnchor="middle" fill="#0d9488" fontSize="11" fontWeight="600">Compressor</text>
              <text x="400" y="210" textAnchor="middle" fill="#64748b" fontSize="10">Reversing Valve</text>

              {/* Flow arrows */}
              <text x="300" y="150" textAnchor="middle" fill={mode === 'heating' ? '#f97316' : '#3b82f6'} fontSize="10">
                {mode === 'heating' ? 'Hot gas →' : '← Cool liquid'}
              </text>
              <text x="300" y="260" textAnchor="middle" fill={mode === 'heating' ? '#3b82f6' : '#f97316'} fontSize="10">
                {mode === 'heating' ? '← Cool liquid' : 'Hot gas →'}
              </text>

              {/* Temperature indicators */}
              <text x="140" y="330" textAnchor="middle" fill={mode === 'heating' ? '#3b82f6' : '#f97316'} fontSize="12" fontWeight="600">
                {mode === 'heating' ? 'Cold outside' : 'Hot outside'}
              </text>
              <text x="660" y="330" textAnchor="middle" fill={mode === 'heating' ? '#ef4444' : '#06b6d4'} fontSize="12" fontWeight="600">
                {mode === 'heating' ? 'Warm inside' : 'Cool inside'}
              </text>
            </svg>
          </div>

          {/* Efficiency stats */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-teal-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-teal-700">300-400%</div>
              <div className="text-xs text-slate-600 mt-1">Efficiency (COP)</div>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-700">3x</div>
              <div className="text-xs text-slate-600 mt-1">More Efficient</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-700">-15°F</div>
              <div className="text-xs text-slate-600 mt-1">Min Operating Temp</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============ UPGRADE CALCULATOR ============
function UpgradeCalculator() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });
  const [sqft, setSqft] = useState(2000);
  const [age, setAge] = useState(15);
  const [bill, setBill] = useState(200);

  const savingsMin = Math.round((bill * 12 * 0.3) * (sqft / 2000) * Math.min(age / 10, 2));
  const savingsMax = Math.round((bill * 12 * 0.6) * (sqft / 2000) * Math.min(age / 10, 2));
  const co2Offset = Math.round((savingsMin + savingsMax) / 2 / 100 * 10) / 10;
  const paybackYears = Math.round((15000 + sqft * 2) / ((savingsMin + savingsMax) / 2) * 10) / 10;

  return (
    <section id="calculator" className="py-24 bg-gradient-to-b from-white to-teal-50/50" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Upgrade Savings Calculator</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">See how much you could save by upgrading to a high-efficiency heat pump system.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Inputs */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="space-y-8">
            <div>
              <label className="flex justify-between text-sm font-medium text-slate-700 mb-2">
                <span>Home Size</span>
                <span className="text-teal-600">{sqft.toLocaleString()} sq ft</span>
              </label>
              <input type="range" min="800" max="5000" step="100" value={sqft} onChange={e => setSqft(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-teal-600" />
              <div className="flex justify-between text-xs text-slate-400 mt-1"><span>800 sq ft</span><span>5,000 sq ft</span></div>
            </div>
            <div>
              <label className="flex justify-between text-sm font-medium text-slate-700 mb-2">
                <span>Current System Age</span>
                <span className="text-teal-600">{age} years</span>
              </label>
              <input type="range" min="1" max="30" step="1" value={age} onChange={e => setAge(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-teal-600" />
              <div className="flex justify-between text-xs text-slate-400 mt-1"><span>1 year</span><span>30 years</span></div>
            </div>
            <div>
              <label className="flex justify-between text-sm font-medium text-slate-700 mb-2">
                <span>Monthly Energy Bill</span>
                <span className="text-teal-600">${bill}</span>
              </label>
              <input type="range" min="50" max="600" step="10" value={bill} onChange={e => setBill(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-teal-600" />
              <div className="flex justify-between text-xs text-slate-400 mt-1"><span>$50</span><span>$600</span></div>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.4 }} className="bg-white rounded-2xl shadow-lg border border-teal-100 p-8">
            <h3 className="text-lg font-semibold text-slate-800 mb-6">Your Estimated Savings</h3>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-teal-50 to-green-50 rounded-xl p-5">
                <div className="text-sm text-slate-600 mb-1">Annual Savings Range</div>
                <div className="text-3xl font-bold text-teal-700">${savingsMin.toLocaleString()} – ${savingsMax.toLocaleString()}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className="text-xl font-bold text-green-600">{co2Offset}t</div>
                  <div className="text-xs text-slate-500">CO₂ offset/year</div>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className="text-xl font-bold text-blue-600">{paybackYears}yr</div>
                  <div className="text-xs text-slate-500">Payback period</div>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#22c55e" strokeWidth="1.5" /><path d="M5 8l2 2 4-4" stroke="#22c55e" strokeWidth="1.5" /></svg>
                  Includes federal tax credit eligibility
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 mt-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#22c55e" strokeWidth="1.5" /><path d="M5 8l2 2 4-4" stroke="#22c55e" strokeWidth="1.5" /></svg>
                  State & utility rebates may apply
                </div>
              </div>
              <a href="#contact" className="block w-full text-center bg-teal-600 text-white py-3 rounded-full font-medium hover:bg-teal-700 transition-colors">
                Get Detailed Quote
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============ SERVICES ============
function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });
  const services = [
    { icon: 'thermometer', title: 'Heat Pumps', desc: 'Air-source and ground-source heat pumps for year-round comfort with 300%+ efficiency.', image: 'https://images.unsplash.com/photo-1631545806607-f4acbf48f12f?w=400&q=80' },
    { icon: 'house', title: 'Ducted Systems', desc: 'Complete ducted HVAC installations with sealed, insulated ductwork for maximum efficiency.', image: 'https://images.unsplash.com/photo-1631679704245-3c1d74d0bcc1?w=400&q=80' },
    { icon: 'snowflake', title: 'Mini-Splits', desc: 'Ductless mini-split systems perfect for additions, garages, and zone-specific comfort.', image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80' },
    { icon: 'map', title: 'Smart Zoning', desc: 'Room-by-room temperature control with automated dampers and smart thermostats.', image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400&q=80' },
    { icon: 'smartphone', title: 'Smart Thermostats', desc: 'Wi-Fi thermostats with learning algorithms, geofencing, and energy dashboards.', image: 'https://images.unsplash.com/photo-1567113463300-102a7eb3cb26?w=400&q=80' },
    { icon: 'wrench', title: 'Maintenance', desc: 'Annual tune-ups, filter programs, and performance monitoring to keep systems peak.', image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&q=80' },
  ];

  return (
    <section id="services" className="py-24 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Services</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Complete high-efficiency HVAC solutions from design to maintenance.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }} className="bg-gradient-to-br from-slate-50 to-teal-50/30 rounded-2xl border border-slate-100 hover:border-teal-200 hover:shadow-lg transition-all group overflow-hidden">
              <div className="h-40 overflow-hidden">
                <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <div className="text-3xl mb-4"><Icon name={s.icon} className="w-8 h-8" /></div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2 group-hover:text-teal-700 transition-colors">{s.title}</h3>
                <p className="text-sm text-slate-600">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ REBATE CONCIERGE ============
function RebateConcierge() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });
  const [formData, setFormData] = useState({ name: '', zip: '', system: '', income: '' });
  const [submitted, setSubmitted] = useState(false);

  const rebates = [
    { name: 'Federal Tax Credit', amount: 'Up to $2,000', eligibility: 'All qualifying heat pump installations' },
    { name: 'Utility Rebate', amount: '$500 – $3,500', eligibility: 'Income-qualified households' },
    { name: 'State Efficiency Program', amount: 'Up to $1,000', eligibility: 'Primary residences, SEER2 ≥ 16' },
    { name: 'Weatherization Assistance', amount: 'Up to $5,000', eligibility: 'Low-income households' },
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="rebates" className="py-24 bg-gradient-to-b from-teal-50/50 to-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Rebate Concierge</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">We handle the paperwork. You get the savings. Let us find every rebate and incentive you qualify for.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Available Rebates */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
            <h3 className="text-lg font-semibold text-slate-800 mb-6">Available Incentives</h3>
            <div className="space-y-4">
              {rebates.map((r, i) => (
                <motion.div key={r.name} initial={{ opacity: 0, x: -10 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }} className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-slate-800">{r.name}</h4>
                      <p className="text-sm text-slate-500 mt-1">{r.eligibility}</p>
                    </div>
                    <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">{r.amount}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.4 }}>
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form key="form" onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 border border-teal-100 shadow-lg space-y-5">
                  <h3 className="text-lg font-semibold text-slate-800">Check Your Eligibility</h3>
                  <div>
                    <label className="text-sm font-medium text-slate-700 block mb-1">Full Name</label>
                    <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all" placeholder="John Smith" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 block mb-1">ZIP Code</label>
                    <input type="text" required value={formData.zip} onChange={e => setFormData({ ...formData, zip: e.target.value })} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all" placeholder="12345" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 block mb-1">Current System Type</label>
                    <select value={formData.system} onChange={e => setFormData({ ...formData, system: e.target.value })} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all">
                      <option value="">Select...</option>
                      <option value="gas-furnace">Gas Furnace</option>
                      <option value="oil-boiler">Oil Boiler</option>
                      <option value="electric-ac">Electric AC + Heating</option>
                      <option value="old-heatpump">Older Heat Pump (10+ yr)</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 block mb-1">Household Income Range</label>
                    <select value={formData.income} onChange={e => setFormData({ ...formData, income: e.target.value })} className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all">
                      <option value="">Select...</option>
                      <option value="under-50k">Under $50,000</option>
                      <option value="50-100k">$50,000 – $100,000</option>
                      <option value="100-150k">$100,000 – $150,000</option>
                      <option value="over-150k">Over $150,000</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full bg-teal-600 text-white py-3 rounded-full font-medium hover:bg-teal-700 transition-colors">
                    Find My Rebates
                  </button>
                </motion.form>
              ) : (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl p-8 border border-green-200 shadow-lg text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M8 16l6 6 10-12" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Great News!</h3>
                  <p className="text-slate-600">Based on your information, you likely qualify for <span className="font-semibold text-green-600">$2,500 – $6,500</span> in combined incentives.</p>
                  <p className="text-sm text-slate-500 mt-4">Our team will reach out within 24 hours with a complete rebate package.</p>
                  <button onClick={() => setSubmitted(false)} className="mt-6 text-teal-600 text-sm font-medium hover:underline">← Start Over</button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============ SMART ZONING ============
function SmartZoning() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });
  const [rooms, setRooms] = useState([
    { id: 'living', name: 'Living Room', temp: 72, target: 72, active: true },
    { id: 'bedroom', name: 'Bedroom', temp: 68, target: 68, active: true },
    { id: 'kitchen', name: 'Kitchen', temp: 74, target: 70, active: true },
    { id: 'office', name: 'Office', temp: 65, target: 70, active: false },
    { id: 'guest', name: 'Guest Room', temp: 62, target: 65, active: false },
  ]);

  const toggleRoom = (id: string) => {
    setRooms(rooms.map(r => r.id === id ? { ...r, active: !r.active } : r));
  };

  const adjustTemp = (id: string, delta: number) => {
    setRooms(rooms.map(r => r.id === id ? { ...r, target: Math.max(60, Math.min(80, r.target + delta)) } : r));
  };

  return (
    <section id="zoning" className="py-24 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Smart Zoning</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Control every room independently. Only heat or cool the spaces you're using — save up to 30% on energy.</p>
        </motion.div>

        {/* Floor Plan Mockup */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-slate-50 to-teal-50/30 rounded-3xl p-6 md:p-8 border border-teal-100">
            {/* Floor plan grid */}
            <div className="grid grid-cols-3 grid-rows-2 gap-3 mb-8">
              {rooms.map((room) => (
                <motion.button
                  key={room.id}
                  onClick={() => toggleRoom(room.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative rounded-xl p-4 text-left transition-all border-2 ${room.active ? 'bg-white border-teal-400 shadow-md' : 'bg-slate-100 border-slate-200 opacity-60'}`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-medium text-slate-500">{room.name}</span>
                    <span className={`w-3 h-3 rounded-full ${room.active ? 'bg-green-400 animate-pulse' : 'bg-slate-300'}`} />
                  </div>
                  <div className={`text-2xl font-bold mt-2 ${room.active ? 'text-teal-700' : 'text-slate-400'}`}>
                    {room.temp}°F
                  </div>
                  <div className="text-xs text-slate-500 mt-1">Target: {room.target}°F</div>
                  {room.active && (
                    <div className="absolute bottom-2 right-2">
                      <div className="flex gap-1">
                        <button onClick={(e) => { e.stopPropagation(); adjustTemp(room.id, -1); }} className="w-5 h-5 bg-teal-100 rounded text-teal-700 text-xs flex items-center justify-center hover:bg-teal-200">−</button>
                        <button onClick={(e) => { e.stopPropagation(); adjustTemp(room.id, 1); }} className="w-5 h-5 bg-teal-100 rounded text-teal-700 text-xs flex items-center justify-center hover:bg-teal-200">+</button>
                      </div>
                    </div>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Energy summary */}
            <div className="bg-white rounded-xl p-5 border border-slate-100">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-slate-700">Zoning Energy Usage</span>
                <span className="text-sm text-green-600 font-semibold">
                  {Math.round(rooms.filter(r => r.active).length / rooms.length * 100)}% active
                </span>
              </div>
              <div className="flex gap-1">
                {rooms.map(room => (
                  <div key={room.id} className={`flex-1 h-3 rounded-full transition-all ${room.active ? 'bg-gradient-to-r from-teal-400 to-green-400' : 'bg-slate-200'}`} />
                ))}
              </div>
              <div className="flex justify-between mt-3 text-xs text-slate-500">
                <span>Estimated savings: <span className="text-green-600 font-semibold">28%</span></span>
                <span>{rooms.filter(r => r.active).length} of {rooms.length} zones active</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============ CASE EXAMPLES ============
function CaseExamples() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });
  const cases = [
    {
      title: 'The Hendersons',
      location: 'Portland, OR',
      before: '$380/mo',
      after: '$145/mo',
      savings: '62%',
      system: 'Cold-climate heat pump + smart zoning',
      quote: 'Our winter bills dropped dramatically. The house is more comfortable than ever.',
      meter: 62,
    },
    {
      title: 'Martinez Family',
      location: 'Austin, TX',
      before: '$310/mo',
      after: '$120/mo',
      savings: '61%',
      system: 'Dual mini-split system + smart thermostat',
      quote: 'Each room is the perfect temperature. The kids finally stopped fighting over the thermostat.',
      meter: 61,
    },
    {
      title: 'Chen Residence',
      location: 'Burlington, VT',
      before: '$450/mo',
      after: '$165/mo',
      savings: '63%',
      system: 'Ground-source heat pump + full home zoning',
      quote: 'Even at -10°F, our home stays warm and our bills are a fraction of what they were.',
      meter: 63,
    },
  ];

  return (
    <section id="cases" className="py-24 bg-gradient-to-b from-white to-green-50/30" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Real Results</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">See how homeowners across the country transformed their comfort and savings.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {cases.map((c, i) => (
            <motion.div key={c.title} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.15 }} className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden group hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-teal-600 to-green-600 p-5 text-white">
                <h3 className="font-semibold text-lg">{c.title}</h3>
                <p className="text-teal-100 text-sm">{c.location}</p>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="text-xs text-slate-500">Before</div>
                    <div className="text-lg font-semibold text-slate-700">{c.before}</div>
                  </div>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12h14m-4-4l4 4-4 4" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" /></svg>
                  <div className="text-right">
                    <div className="text-xs text-slate-500">After</div>
                    <div className="text-lg font-semibold text-green-600">{c.after}</div>
                  </div>
                </div>

                {/* Energy Meter */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Energy Savings</span>
                    <span className="text-green-600 font-semibold">{c.savings}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={isInView ? { width: `${c.meter}%` } : { width: 0 }} transition={{ duration: 1.2, delay: 0.5 + i * 0.2 }} className="h-full bg-gradient-to-r from-teal-500 to-green-500 rounded-full" />
                  </div>
                </div>

                <p className="text-xs text-slate-500 mb-3">System: {c.system}</p>
                <blockquote className="text-sm text-slate-600 italic border-l-2 border-teal-300 pl-3">
                  "{c.quote}"
                </blockquote>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ CONSULTATION CTA ============
function ConsultationCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });
  const [form, setForm] = useState({ name: '', email: '', phone: '', home: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-teal-900 via-teal-800 to-slate-900 relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-teal-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-600/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Start Your Upgrade</h2>
          <p className="text-teal-200 max-w-2xl mx-auto">Schedule a free consultation. We'll assess your home, recommend the best system, and handle all rebate paperwork.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
          <AnimatePresence mode="wait">
            {!sent ? (
              <motion.form key="form" onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium text-teal-100 block mb-1">Name</label>
                    <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-teal-100 block mb-1">Email</label>
                    <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none" placeholder="you@email.com" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium text-teal-100 block mb-1">Phone</label>
                    <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none" placeholder="(555) 123-4567" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-teal-100 block mb-1">Home Size</label>
                    <select value={form.home} onChange={e => setForm({ ...form, home: e.target.value })} className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none">
                      <option value="" className="text-slate-800">Select size...</option>
                      <option value="small" className="text-slate-800">Under 1,500 sq ft</option>
                      <option value="medium" className="text-slate-800">1,500 – 2,500 sq ft</option>
                      <option value="large" className="text-slate-800">2,500 – 4,000 sq ft</option>
                      <option value="xlarge" className="text-slate-800">4,000+ sq ft</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-teal-100 block mb-1">Tell us about your project</label>
                  <textarea rows={3} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none resize-none" placeholder="Current system, concerns, goals..." />
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-teal-500 to-green-500 text-white py-3 rounded-full font-semibold hover:from-teal-400 hover:to-green-400 transition-all shadow-lg">
                  Schedule Free Consultation
                </button>
                <p className="text-center text-teal-300/60 text-xs">No obligation • Response within 24 hours • Free home assessment</p>
              </motion.form>
            ) : (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/10 backdrop-blur-md rounded-2xl p-12 border border-white/20 text-center">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M10 20l8 8 12-14" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Consultation Requested!</h3>
                <p className="text-teal-200">Our team will contact you within 24 hours to schedule your free home assessment.</p>
                <button onClick={() => setSent(false)} className="mt-6 text-teal-300 text-sm hover:underline">← Submit Another</button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

// ============ FOOTER ============
function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="14" stroke="#14b8a6" strokeWidth="2" />
                <path d="M10 20 C10 14, 16 10, 16 10 C16 10, 22 14, 22 20" stroke="#14b8a6" strokeWidth="2" fill="none" />
              </svg>
              <span className="font-semibold text-white">Verdant Air Systems</span>
            </div>
            <p className="text-sm">High-efficiency HVAC solutions for a sustainable future.</p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>Heat Pump Installation</li>
              <li>Smart Zoning</li>
              <li>Mini-Split Systems</li>
              <li>Maintenance Plans</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>Savings Calculator</li>
              <li>Rebate Finder</li>
              <li>Energy Guides</li>
              <li>Case Studies</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>(555) 832-4700</li>
              <li>hello@verdantair.com</li>
              <li>Mon–Fri 7am–6pm</li>
              <li>Sat 8am–2pm</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© 2025 Verdant Air Systems. All rights reserved.</p>
          <p className="mt-2 md:mt-0">EPA Certified • NATE Certified • BPI Accredited</p>
        </div>
      </div>
    </footer>
  );
}

// ============ MAIN APP ============
export default function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <HeatPumpExplainer />
      <UpgradeCalculator />
      <Services />
      <RebateConcierge />
      <SmartZoning />
      <CaseExamples />
      <ConsultationCTA />
      <Footer />
    </div>
  );
}
