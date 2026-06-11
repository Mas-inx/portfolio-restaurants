import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteInfo, problems, solutions, assessmentSteps, systemLayers, products, faq, navLinks } from './data';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const stagger = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.08 } },
  viewport: { once: true },
};

function Icon({ name, className }: { name: string; className?: string }) {
  const cls = className || 'w-6 h-6';
  const icons: Record<string, React.ReactNode> = {
    wind: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" /></svg>,
    leaf: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.5 9 6 13 6 17a6 6 0 0012 0c0-4-2.5-8-6-15z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 10v12" /></svg>,
    droplet: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 2c-3 5-7 9.5-7 14a7 7 0 0014 0c0-4.5-4-9-7-14z" /></svg>,
    alert: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86l-8.1 14c-.6 1.04.15 2.14 1.21 2.14h17.2c1.06 0 1.81-1.1 1.21-2.14l-8.1-14c-.6-1.04-1.82-1.04-2.42 0z" /></svg>,
    nose: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4c0-4 4-8 4-8s4 4 4 8a4 4 0 01-4 4z" /><circle cx="10.5" cy="9.5" r="0.5" fill="currentColor" /><circle cx="7.5" cy="8" r="0.5" fill="currentColor" /></svg>,
    home: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
    filter: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>,
    layers: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
    sun: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><circle cx="12" cy="12" r="5" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>,
    refresh: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
    arrow: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>,
    check: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>,
    menu: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>,
    close: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>,
    phone: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8 9a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>,
    clipboard: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
    arrowDown: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>,
    badge: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>,
    chart: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>,
    shield: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    pulse: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>,
    microscope: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18h8M3 22h18M14 2v6a4 4 0 01-8 0V2M10 12v4m-4 4h8" /></svg>,
  };
  return <>{icons[name] || <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><circle cx="12" cy="12" r="10" /></svg>}</>;
}

// Severity indicator for problems
function SeverityBar({ level }: { level: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className={`w-1 h-3 rounded-full ${i <= level ? 'bg-teal-500' : 'bg-slate-200'}`} />
      ))}
    </div>
  );
}

// Efficacy badge for solutions
function EfficacyBadge({ value }: { value: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-100 px-2 py-0.5 rounded-full">
      <span className="w-1 h-1 rounded-full bg-teal-500" />
      {value}
    </span>
  );
}

const problemSeverity = [4, 3, 4, 5, 3, 4];
const solutionEfficacy = ['99.97%', 'MERV 13', '±2% RH', 'N/A', '99.9%', '100% balanced'];

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white text-slate-600 antialiased overflow-x-hidden font-sans">
      {/* Header — Minimal, clinical */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <motion.a href="#" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center">
              <Icon name="wind" className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-semibold text-[15px] text-slate-800 tracking-tight">PureAir</span>
              <span className="text-[9px] text-slate-400 uppercase tracking-widest font-medium">Indoor Comfort</span>
            </div>
          </motion.a>
          <nav className="hidden md:flex items-center gap-6 text-[13px] font-medium text-slate-500">
            {navLinks.filter(l => l.label !== 'Contact').map(link => (
              <a key={link.label} href={link.href} className="hover:text-teal-600 transition-colors duration-200">{link.label}</a>
            ))}
            <a href="#contact" className="bg-teal-600 text-white px-4 py-2 rounded-md text-[13px] font-semibold hover:bg-teal-700 transition-colors duration-200">
              Book Assessment
            </a>
          </nav>
          <button onClick={() => setNavOpen(!navOpen)} className="md:hidden p-2 text-slate-400">
            <Icon name={navOpen ? 'close' : 'menu'} className="w-5 h-5" />
          </button>
        </div>
        {navOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="md:hidden bg-white border-b border-slate-100 px-5 pb-4 space-y-3">
            {navLinks.map(link => (
              <a key={link.label} href={link.href} className="block text-slate-500 text-sm font-medium" onClick={() => setNavOpen(false)}>{link.label}</a>
            ))}
          </motion.div>
        )}
      </header>

      {/* Hero — Clean, precise, clinical */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#E8F0FE]/60 via-white to-white" />
        <div className="absolute top-0 right-0 w-[50%] h-full opacity-[0.04]" style={{ backgroundImage: `url(${siteInfo.heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(to right, #475569 1px, transparent 1px), linear-gradient(to bottom, #475569 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-28 lg:py-36">
          <div className="max-w-2xl">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-teal-700 bg-teal-50 border border-teal-100 px-3 py-1.5 rounded-full mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
              Certified Air Quality Specialists
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-tight text-slate-800">
              Breathe{' '}
              <span className="text-teal-600">cleaner air</span>
              <br />at home.
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-6 text-base sm:text-lg text-slate-500 max-w-lg leading-relaxed">
              Whole-home air purification, humidity control, and ventilation solutions. We test, diagnose, and fix indoor air quality issues for Chicago homes.
            </motion.p>

            <motion.div className="mt-8 flex flex-wrap gap-3" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <a href="#contact" className="inline-flex items-center gap-2 bg-teal-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-teal-700 transition-colors text-sm">
                Book an Assessment <Icon name="arrow" className="w-4 h-4" />
              </a>
              <a href="#problems" className="inline-flex items-center gap-2 border border-slate-200 text-slate-600 font-medium px-6 py-3 rounded-md hover:border-teal-200 hover:text-teal-700 transition-all text-sm">
                View Common Problems
              </a>
            </motion.div>
          </div>

          {/* Stats strip — clinical, data-driven */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-16 sm:mt-20 flex flex-wrap gap-8 sm:gap-14 pt-8 border-t border-slate-100">
            {[
              { value: siteInfo.homesServiced.toLocaleString() + '+', label: 'Homes Serviced' },
              { value: siteInfo.satisfaction, label: 'Satisfaction Rate' },
              { value: siteInfo.certifiedTechnicians, label: 'Certified Technicians' },
            ].map(s => (
              <div key={s.label} className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-bold text-slate-800 tabular-nums">{s.value}</span>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider font-medium mt-1">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Problems — Clinical diagnostic cards */}
      <section id="problems" className="py-20 sm:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <motion.div {...fadeUp} className="max-w-lg">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-teal-600">Diagnostic</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">Common Air Quality Issues</h2>
            <p className="mt-3 text-sm text-slate-500 leading-relaxed">Six conditions we diagnose most frequently. Each has a proven, measurable solution.</p>
          </motion.div>

          <motion.div {...stagger} className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-100 border border-slate-100 rounded-xl overflow-hidden">
            {problems.map((p, i) => (
              <motion.div key={i} {...fadeUp}
                className="bg-white p-6 hover:bg-[#E8F0FE]/30 transition-colors duration-300 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-teal-600 group-hover:border-teal-100 group-hover:bg-teal-50/50 transition-all duration-300">
                    <Icon name={p.icon} className="w-5 h-5" />
                  </div>
                  <SeverityBar level={problemSeverity[i]} />
                </div>
                <h3 className="font-semibold text-slate-800 text-sm">{p.title}</h3>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed">{p.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Solutions — Treatment options with efficacy */}
      <section id="solutions" className="py-20 sm:py-28 bg-[#E8F0FE]/40">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <motion.div {...fadeUp} className="max-w-lg">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-teal-600">Treatment</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">Proven Solutions</h2>
            <p className="mt-3 text-sm text-slate-500 leading-relaxed">Professional-grade systems engineered for measurable air quality improvement.</p>
          </motion.div>

          <motion.div {...stagger} className="mt-12 space-y-3">
            {solutions.map((s, i) => (
              <motion.div key={i} {...fadeUp}
                className="bg-white border border-slate-100 rounded-lg p-5 sm:p-6 hover:border-teal-100 hover:shadow-sm transition-all duration-300 group">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="w-11 h-11 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shrink-0 group-hover:bg-teal-100 transition-colors">
                      <Icon name={s.icon} className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="font-semibold text-slate-800 text-sm">{s.title}</h3>
                        <EfficacyBadge value={solutionEfficacy[i]} />
                      </div>
                      <p className="mt-1 text-xs text-slate-500 leading-relaxed">{s.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Assessment Process — Clean 4-step clinical workflow */}
      <section id="assessment" className="py-20 sm:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <motion.div {...fadeUp} className="text-center max-w-lg mx-auto">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-teal-600">Protocol</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">Assessment Process</h2>
            <p className="mt-3 text-sm text-slate-500 leading-relaxed">A thorough, data-driven evaluation of your home's indoor air quality.</p>
          </motion.div>

          <div className="mt-14 relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-[52px] left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] h-px bg-gradient-to-r from-teal-200 via-teal-300 to-teal-200" />

            <motion.div {...stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {assessmentSteps.map((step, i) => (
                <motion.div key={i} {...fadeUp} className="relative text-center lg:text-left">
                  {/* Step number circle */}
                  <div className="relative inline-flex items-center justify-center w-[52px] h-[52px] rounded-full bg-white border-2 border-teal-200 text-teal-600 font-bold text-sm mx-auto lg:mx-0 mb-4 z-10">
                    {step.step}
                    <div className="absolute inset-0 rounded-full bg-teal-50 scale-0 group-hover:scale-100 transition-transform duration-300" />
                  </div>
                  <h3 className="font-semibold text-slate-800 text-sm">{step.title}</h3>
                  <p className="mt-2 text-xs text-slate-500 leading-relaxed">{step.description}</p>
                  <div className="mt-3 text-[11px] text-teal-600/80 font-medium bg-teal-50/60 rounded px-2 py-1 inline-block">
                    {step.details}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* System Layers — Tiered protection model */}
      <section className="py-20 sm:py-28 bg-[#E8F0FE]/40">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <motion.div {...fadeUp} className="text-center max-w-lg mx-auto">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-teal-600">Architecture</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">The Healthy Home System</h2>
            <p className="mt-3 text-sm text-slate-500 leading-relaxed">Four layers of protection, working together for truly clean indoor air.</p>
          </motion.div>

          <motion.div {...stagger} className="mt-14 grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {systemLayers.map((layer, i) => (
              <motion.div key={i} {...fadeUp}
                className="bg-white border border-slate-100 rounded-xl p-6 hover:border-teal-100 transition-colors duration-300 relative overflow-hidden">
                {/* Layer number watermark */}
                <div className="absolute top-3 right-4 text-5xl font-bold text-slate-50 leading-none select-none">{String(i + 1).padStart(2, '0')}</div>
                <div className="relative">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-teal-500" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-teal-600">Layer {i + 1}</span>
                  </div>
                  <h3 className="font-semibold text-slate-800 text-base">{layer.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">{layer.description}</p>
                  <ul className="mt-4 space-y-2">
                    {layer.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                        <Icon name="check" className="w-3.5 h-3.5 text-teal-500 mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Products — Spec cards, clinical precision */}
      <section id="products" className="py-20 sm:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <motion.div {...fadeUp} className="max-w-lg">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-teal-600">Equipment</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">Our Products</h2>
            <p className="mt-3 text-sm text-slate-500 leading-relaxed">Professional-grade equipment selected for performance, reliability, and longevity.</p>
          </motion.div>

          <motion.div {...stagger} className="mt-12 grid md:grid-cols-2 gap-4">
            {products.map((p, i) => (
              <motion.div key={i} {...fadeUp}
                className="border border-slate-100 rounded-xl p-6 hover:border-teal-100 hover:shadow-sm transition-all duration-300 bg-white group">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-teal-600">{p.category}</span>
                    <h3 className="font-semibold text-slate-800 text-[15px] mt-1">{p.name}</h3>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-md whitespace-nowrap">
                    <Icon name="home" className="w-3 h-3" />
                    {p.coverage}
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">{p.description}</p>
                <div className="border-t border-slate-50 pt-4 space-y-2">
                  {p.features.map((f, j) => (
                    <div key={j} className="flex items-start gap-2 text-xs text-slate-600">
                      <div className="w-1 h-1 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ — Clean accordion */}
      <section id="faq" className="py-20 sm:py-28 bg-[#E8F0FE]/40">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <motion.div {...fadeUp} className="text-center max-w-lg mx-auto">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-teal-600">Reference</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">Frequently Asked Questions</h2>
          </motion.div>

          <div className="mt-12 max-w-2xl mx-auto space-y-2">
            {faq.map((item, i) => (
              <motion.div key={i} {...fadeUp}
                className="bg-white border border-slate-100 rounded-lg overflow-hidden hover:border-teal-100 transition-colors">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left cursor-pointer group">
                  <span className="font-medium text-slate-800 text-sm pr-4 group-hover:text-teal-700 transition-colors">{item.question}</span>
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.2 }}
                    className="shrink-0 text-slate-300 group-hover:text-teal-500 transition-colors">
                    <Icon name="arrowDown" className="w-4 h-4" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm text-slate-500 leading-relaxed border-t border-slate-50 pt-4">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Contact — Clean form */}
      <section id="contact" className="py-20 sm:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="max-w-4xl mx-auto grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
            <motion.div {...fadeUp} className="lg:col-span-2">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-teal-600">Schedule</span>
              <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">Book Your Assessment</h2>
              <p className="mt-3 text-sm text-slate-500 leading-relaxed">Our comprehensive assessment identifies every IAQ issue in your home with a clear action plan.</p>

              <div className="mt-6 space-y-2.5">
                {['60-90 minute in-home visit', 'Real-time air quality readings', 'Written report within 48 hours', 'Personalized recommendations', 'Follow-up testing included'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                    <Icon name="check" className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-[#E8F0FE]/60 rounded-lg border border-teal-50">
                <p className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">Or call directly</p>
                <a href="tel:+177****0941" className="text-lg font-bold text-teal-700 hover:text-teal-800 transition-colors">{siteInfo.phone}</a>
              </div>
            </motion.div>

            <motion.div {...fadeUp} className="lg:col-span-3 bg-white border border-slate-100 rounded-xl p-6 sm:p-8 shadow-sm">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">First Name</label>
                  <input type="text" placeholder="Jane"
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-md text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-50 transition-all bg-white" />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Last Name</label>
                  <input type="text" placeholder="Doe"
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-md text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-50 transition-all bg-white" />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Email</label>
                  <input type="email" placeholder="jane@example.com"
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-md text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-50 transition-all bg-white" />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Phone</label>
                  <input type="tel" placeholder="(773) 555-0941"
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-md text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-50 transition-all bg-white" />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Primary Concern</label>
                  <select className="w-full px-3.5 py-2.5 border border-slate-200 rounded-md text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-50 transition-all bg-white text-slate-600">
                    {['Excess Dust', 'Seasonal Allergies', 'Humidity Issues', 'Mold / Mildew', 'Persistent Odors', 'Poor Ventilation', 'General Assessment'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Home Sq. Footage</label>
                  <input type="text" placeholder="e.g. 2,500 sq ft"
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-md text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-50 transition-all bg-white" />
                </div>
              </div>
              <motion.button whileHover={{ scale: 1.005 }} whileTap={{ scale: 0.995 }}
                className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-teal-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-teal-700 transition-colors text-sm cursor-pointer">
                Book Assessment <Icon name="arrow" className="w-4 h-4" />
              </motion.button>
              <p className="text-[11px] text-slate-400 text-center mt-3">Free assessment includes written report and recommendations.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 bg-slate-800 text-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Start breathing cleaner air today.</h2>
            <p className="mt-3 text-sm text-slate-300">Book your assessment and take the first step toward a healthier home.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="#contact" className="inline-flex items-center gap-2 bg-teal-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-teal-700 transition-colors text-sm">
                <Icon name="clipboard" className="w-4 h-4" /> Book Assessment
              </a>
              <a href="tel:+177****0941" className="inline-flex items-center gap-2 border border-slate-600 text-slate-300 font-medium px-6 py-3 rounded-md hover:bg-white/5 hover:border-slate-500 transition-all text-sm">
                <Icon name="phone" className="w-4 h-4" /> {siteInfo.phone}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-10">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-teal-600 flex items-center justify-center">
                  <Icon name="wind" className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="font-semibold text-[15px] text-white tracking-tight">PureAir Indoor Comfort</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">{siteInfo.shortTagline}</p>
            </div>
            <div className="text-right space-y-1">
              <p className="text-xs text-slate-500">{siteInfo.address}</p>
              <p className="text-xs text-slate-500">Mon-Fri 7am-6pm | Sat 8am-2pm</p>
              <p className="text-sm font-semibold text-teal-400">{siteInfo.phone}</p>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-800 text-center text-[11px] text-slate-600">
            &copy; {new Date().getFullYear()} PureAir Indoor Comfort. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
