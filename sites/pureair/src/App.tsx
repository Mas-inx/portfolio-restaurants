import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteInfo, problems, solutions, assessmentSteps, systemLayers, products, faq, navLinks } from './data';

/* ─── Unsplash image library ─── */
const IMG = {
  hero: siteInfo.heroImage,
  dust: 'https://images.unsplash.com/photo-1617791107382-8fda52b25f52?w=900&q=80',
  dustClean: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80',
  pollen: 'https://images.unsplash.com/photo-1464699908537-0954e50791ee?w=900&q=80',
  filter: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=900&q=80',
  humidity: 'https://images.unsplash.com/photo-1501999635878-71cb76b4e9eb?w=900&q=80',
  home: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80',
  mold: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=900&q=80',
  clean: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80',
  odor: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=900&q=80',
  uv: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=900&q=80',
  stuffy: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=900&q=80',
  fresh: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80',
  lab: 'https://images.unsplash.com/photo-1581093458791-9d42e3c2fd45?w=900&q=80',
  microscope: 'https://images.unsplash.com/photo-1530026186582-28e1e11acc57?w=900&q=80',
  clipboard: 'https://images.unsplash.com/photo-1551698618-5d0c3e16b8b5?w=900&q=80',
  report: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=80',
  purifier: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=900&q=80',
  cabinet: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=900&q=80',
  steam: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=900&q=80',
  uvlight: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=900&q=80',
  cta: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600&q=80',
  nature: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=80',
};

const problemImages = [IMG.dust, IMG.pollen, IMG.humidity, IMG.mold, IMG.odor, IMG.stuffy];
const solutionImages = [IMG.dustClean, IMG.filter, IMG.home, IMG.clean, IMG.uv, IMG.fresh];
const assessmentImages = [IMG.lab, IMG.microscope, IMG.clipboard, IMG.report];
const productImages = [IMG.purifier, IMG.cabinet, IMG.steam, IMG.uvlight];

/* ─── Animation presets ─── */
const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
} as const;

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const },
} as const;

const slideLeft = {
  initial: { opacity: 0, x: -60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
} as const;

const slideRight = {
  initial: { opacity: 0, x: 60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
} as const;

/* ─── SVG Icons ─── */
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
    arrowDown: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>,
    shield: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    pulse: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>,
    microscope: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18h8M3 22h18M14 2v6a4 4 0 01-8 0V2M10 12v4m-4 4h8" /></svg>,
    beaker: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 3v6l-4 8a3 3 0 003 3h8a3 3 0 003-3l-4-8V3M9 3h6M9 9h6" /></svg>,
  };
  return <>{icons[name] || <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><circle cx="12" cy="12" r="10" /></svg>}</>;
}

/* ─── Problem/Solution pair images ─── */
const problemQuestions = [
  'Dust never stops settling?',
  'Allergies keep you indoors?',
  'Air feels too dry or too damp?',
  'Something growing in the dark?',
  'Odors that never leave?',
  'Air feels stale and heavy?',
];

const solutionAnswers = [
  '99.97% particle capture.',
  'HEPA-grade allergen removal.',
  'Precision humidity at 40-60%.',
  'UV-C sterilization, 24/7.',
  'Activated carbon eliminates VOCs.',
  'Balanced fresh-air ventilation.',
];

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white text-slate-700 antialiased overflow-x-hidden">
      {/* ─── HEADER ─── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100/60">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-sm">
              <Icon name="wind" className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-semibold text-[15px] text-slate-800 tracking-tight">PureAir</span>
              <span className="text-[9px] text-teal-600 uppercase tracking-[0.2em] font-medium">Science of Air</span>
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-7 text-[13px] font-medium text-slate-500">
            {navLinks.filter(l => l.label !== 'Contact').map(link => (
              <a key={link.label} href={link.href} className="hover:text-teal-600 transition-colors duration-200">{link.label}</a>
            ))}
            <a href="#contact" className="bg-teal-600 text-white px-5 py-2 rounded-full text-[13px] font-semibold hover:bg-teal-700 transition-colors shadow-sm">
              Book Assessment
            </a>
          </nav>
          <button onClick={() => setNavOpen(!navOpen)} className="md:hidden p-2 text-slate-500">
            <Icon name={navOpen ? 'close' : 'menu'} className="w-5 h-5" />
          </button>
        </div>
        {navOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="md:hidden bg-white border-b border-slate-100 px-5 pb-4 space-y-3">
            {navLinks.map(link => (
              <a key={link.label} href={link.href} className="block text-slate-600 text-sm font-medium" onClick={() => setNavOpen(false)}>{link.label}</a>
            ))}
          </motion.div>
        )}
      </header>

      {/* ─── HERO ─── */}
      <section className="relative h-screen min-h-[700px] flex items-end overflow-hidden">
        {/* Background image with parallax */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: 'easeOut' as const }}
          className="absolute inset-0"
        >
          <img src={IMG.hero} alt="Clean air" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/40 to-transparent" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pb-20 sm:pb-28 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' as const }}
            className="max-w-xl"
          >
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-300 mb-6">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              Indoor Air Quality Science
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] text-white tracking-tight">
              The science of<br />
              <span className="text-teal-400">cleaner air.</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-md leading-relaxed">
              Clinical-grade air quality assessment and purification for your home.
            </p>
          </motion.div>

          {/* Floating stats card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' as const }}
            className="mt-10 inline-flex flex-col sm:flex-row gap-0 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden"
          >
            {[
              { value: siteInfo.homesServiced.toLocaleString() + '+', label: 'Homes Analyzed' },
              { value: siteInfo.satisfaction, label: 'Satisfaction' },
              { value: siteInfo.certifiedTechnicians, label: 'Certified Techs' },
            ].map((s, i) => (
              <div key={s.label} className={`flex flex-col items-center px-8 py-5 ${i > 0 ? 'sm:border-l border-white/10' : ''}`}>
                <span className="text-2xl sm:text-3xl font-bold text-white tabular-nums">{s.value}</span>
                <span className="text-[11px] text-slate-300 uppercase tracking-wider font-medium mt-1">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' as const }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
        >
          <Icon name="arrowDown" className="w-5 h-5" />
        </motion.div>
      </section>

      {/* ─── PROBLEM × SOLUTION — Split-screen alternating ─── */}
      <section id="problems" className="py-4">
        {problems.map((problem, i) => (
          <div key={i} className={`relative min-h-[80vh] flex items-center overflow-hidden ${i % 2 === 0 ? '' : 'flex-row-reverse'}`}>
            <div className={`w-full lg:flex ${i % 2 === 0 ? '' : 'flex-row-reverse'}`}>
              {/* Problem side (dark/moody) */}
              <motion.div {...(i % 2 === 0 ? slideLeft : slideRight)} className="lg:w-1/2 relative h-[50vh] lg:h-auto min-h-[400px] group">
                <img src={problemImages[i]} alt={problem.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-slate-900/60" />
                <div className="relative z-10 h-full flex flex-col justify-end p-8 sm:p-12">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-400/30 flex items-center justify-center">
                      <Icon name={problem.icon} className="w-4 h-4 text-red-300" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-300">Problem</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                    {problemQuestions[i]}
                  </h3>
                  <p className="mt-3 text-sm text-slate-300 max-w-sm leading-relaxed">{problem.description}</p>
                </div>
              </motion.div>

              {/* Solution side (bright/clean) */}
              <motion.div {...(i % 2 === 0 ? slideRight : slideLeft)} className="lg:w-1/2 relative h-[50vh] lg:h-auto min-h-[400px]">
                <img src={solutionImages[i]} alt={solutions[i].title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-br from-teal-900/40 to-teal-800/20" />
                <div className="relative z-10 h-full flex flex-col justify-end p-8 sm:p-12">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center">
                      <Icon name={solutions[i].icon} className="w-4 h-4 text-teal-300" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-300">Solution</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                    {solutionAnswers[i]}
                  </h3>
                  <p className="mt-3 text-sm text-slate-200 max-w-sm leading-relaxed">{solutions[i].description}</p>
                </div>
              </motion.div>
            </div>
          </div>
        ))}
      </section>

      {/* ─── ASSESSMENT PROCESS — Journey visualization ─── */}
      <section id="assessment" className="py-24 sm:py-32 bg-white relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #0D9488 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
          <motion.div {...fadeUp} className="text-center max-w-lg mx-auto mb-16">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-600">Protocol</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">Assessment Journey</h2>
            <p className="mt-3 text-sm text-slate-500 leading-relaxed">From first measurement to verified results.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {assessmentSteps.map((step, i) => (
              <motion.div key={i} {...scaleIn} className="relative group">
                {/* Image card */}
                <div className="relative h-52 rounded-2xl overflow-hidden mb-5">
                  <img src={assessmentImages[i]} alt={step.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-300">Step {step.step}</span>
                  </div>
                  {/* Step number overlay */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{step.step}</span>
                  </div>
                </div>
                <h3 className="font-semibold text-slate-800 text-base">{step.title}</h3>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed">{step.description}</p>
                <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] text-teal-600 font-medium bg-teal-50 rounded-full px-3 py-1">
                  <Icon name="beaker" className="w-3 h-3" />
                  {step.details.slice(0, 50)}...
                </div>
              </motion.div>
            ))}
          </div>

          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-[calc(50%-40px)] left-[12%] right-[12%] h-px">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-teal-200 to-transparent opacity-40" />
          </div>
        </div>
      </section>

      {/* ─── SYSTEM ARCHITECTURE — Vertical tower ─── */}
      <section className="py-24 sm:py-32 bg-[#E0F2FE]/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <motion.div {...fadeUp} className="text-center max-w-lg mx-auto mb-16">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-600">Architecture</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">The Healthy Home System</h2>
            <p className="mt-3 text-sm text-slate-500 leading-relaxed">Four layers of protection, working in concert.</p>
          </motion.div>

          {/* Vertical stack */}
          <div className="max-w-4xl mx-auto space-y-4">
            {systemLayers.map((layer, i) => {
              const gradients = [
                'from-slate-800 to-slate-700',
                'from-teal-700 to-teal-600',
                'from-teal-600 to-cyan-500',
                'from-cyan-500 to-sky-400',
              ];
              return (
                <motion.div key={i} {...fadeUp} className="relative group">
                  <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-r ${gradients[i]} p-6 sm:p-8`}>
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />

                    <div className="relative flex flex-col lg:flex-row lg:items-center gap-6">
                      {/* Layer label */}
                      <div className="lg:w-48 shrink-0">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                            <span className="text-[10px] font-bold text-white">{i + 1}</span>
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/70">Layer {i + 1}</span>
                        </div>
                        <h3 className="font-bold text-white text-lg">{layer.name}</h3>
                        <p className="text-xs text-white/60 mt-1">{layer.description}</p>
                      </div>

                      {/* Items */}
                      <div className="flex-1 grid sm:grid-cols-2 gap-2">
                        {layer.items.map((item, j) => (
                          <div key={j} className="flex items-start gap-2 text-xs text-white/80 leading-relaxed">
                            <Icon name="check" className="w-3.5 h-3.5 text-white/60 mt-0.5 shrink-0" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Connector arrow */}
                  {i < systemLayers.length - 1 && (
                    <div className="flex justify-center py-1">
                      <div className="w-px h-6 bg-gradient-to-b from-teal-300 to-transparent" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── PRODUCT SHOWCASE — Apple-style cards ─── */}
      <section id="products" className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <motion.div {...fadeUp} className="text-center max-w-lg mx-auto mb-16">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-600">Equipment</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">Precision Instruments</h2>
            <p className="mt-3 text-sm text-slate-500 leading-relaxed">Engineered for measurable air quality improvement.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {products.map((p, i) => (
              <motion.div key={i} {...scaleIn} className="group relative rounded-3xl overflow-hidden bg-slate-50 border border-slate-100 hover:border-teal-100 transition-all duration-500 hover:shadow-xl hover:shadow-teal-50">
                {/* Product image */}
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  <img src={productImages[i]} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700">{p.category}</span>
                  </div>
                </div>

                {/* Product info */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-slate-800 text-lg leading-tight">{p.name}</h3>
                    <div className="shrink-0 ml-4 flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                      <Icon name="home" className="w-3 h-3" />
                      {p.coverage}
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed mb-5">{p.description}</p>

                  {/* Features */}
                  <div className="space-y-2.5">
                    {p.features.map((f, j) => (
                      <div key={j} className="flex items-center gap-3 text-sm text-slate-600">
                        <div className="w-5 h-5 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                          <Icon name="check" className="w-3 h-3 text-teal-600" />
                        </div>
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ — Minimal accordion ─── */}
      <section id="faq" className="py-24 sm:py-32 bg-[#E0F2FE]/20">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-600">Reference</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">Questions & Answers</h2>
          </motion.div>

          <div className="space-y-3">
            {faq.map((item, i) => (
              <motion.div key={i} {...fadeUp}
                className="bg-white rounded-xl border border-slate-100 overflow-hidden hover:border-teal-100 transition-colors duration-300">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer group">
                  <span className="font-medium text-slate-800 text-sm sm:text-[15px] pr-4 group-hover:text-teal-700 transition-colors">{item.question}</span>
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.3, ease: 'easeOut' as const }}
                    className="shrink-0 text-slate-300 group-hover:text-teal-500 transition-colors">
                    <Icon name="arrowDown" className="w-4 h-4" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' as const }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm text-slate-500 leading-relaxed border-t border-slate-50 pt-4">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA — Full-width image background ─── */}
      <section id="contact" className="relative py-32 sm:py-40 overflow-hidden">
        <img src={IMG.cta} alt="Nature" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-slate-900/70" />

        <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <motion.div {...fadeUp}>
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-300 mb-6">
              <Icon name="shield" className="w-4 h-4" />
              Begin Your Assessment
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              Start breathing<br />cleaner air today.
            </h2>
            <p className="mt-5 text-base text-slate-300 max-w-md mx-auto leading-relaxed">
              Our comprehensive assessment identifies every air quality issue in your home with a clear, data-driven action plan.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="tel:+17735550941" className="inline-flex items-center gap-2 bg-teal-600 text-white font-semibold px-8 py-4 rounded-full hover:bg-teal-700 transition-colors text-sm shadow-lg shadow-teal-900/30">
                <Icon name="phone" className="w-4 h-4" /> {siteInfo.phone}
              </a>
              <a href={`mailto:${siteInfo.email}`} className="inline-flex items-center gap-2 border border-white/30 text-white font-medium px-8 py-4 rounded-full hover:bg-white/10 transition-all text-sm">
                <Icon name="arrow" className="w-4 h-4" /> Email Us
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5"><Icon name="check" className="w-3 h-3 text-teal-400" /> Free assessment</span>
              <span className="flex items-center gap-1.5"><Icon name="check" className="w-3 h-3 text-teal-400" /> Written report in 48hrs</span>
              <span className="flex items-center gap-1.5"><Icon name="check" className="w-3 h-3 text-teal-400" /> Follow-up testing</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-8">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center">
                  <Icon name="wind" className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold text-[15px] text-white tracking-tight">PureAir</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">{siteInfo.shortTagline}</p>
            </div>
            <div className="text-right space-y-1.5">
              <p className="text-xs text-slate-500">{siteInfo.address}</p>
              <p className="text-xs text-slate-500">Mon-Fri 7am-6pm | Sat 8am-2pm</p>
              <p className="text-sm font-semibold text-teal-400">{siteInfo.phone}</p>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-slate-800 text-center text-[11px] text-slate-600">
            &copy; {new Date().getFullYear()} PureAir Indoor Comfort. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
