import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteInfo, services, industries, programSteps, reportMetrics, responseTiers, navLinks } from './data';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: 'easeOut' as const },
};

const stagger = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 }, viewport: { once: true } },
};

const child = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut' as const },
};

// Unsplash images for sections
const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1631545806607-f4acbf48f12f?w=1600&q=85',
  svc1: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&q=80',
  svc2: 'https://images.unsplash.com/photo-1581092160607-ee22621dd103?w=1200&q=80',
  svc3: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=1200&q=80',
  svc4: 'https://images.unsplash.com/photo-1567789884554-0b844b597180?w=1200&q=80',
  svc5: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1200&q=80',
  svc6: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80',
  ind1: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
  ind2: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
  ind3: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
  ind4: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80',
  ind5: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
  cta: 'https://images.unsplash.com/photo-1590959651373-a3db0f38a961?w=1600&q=80',
  program: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&q=80',
};

function Icon({ name, className }: { name: string; className?: string }) {
  const cls = className || 'w-6 h-6';
  const icons: Record<string, React.ReactNode> = {
    building: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><rect x="3" y="3" width="18" height="18" rx="1" /><path d="M9 3v18M15 3v18M3 9h18M3 15h18" /></svg>,
    clipboard: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
    refresh: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
    snowflake: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M12 2l-3 3m3-3l3 3M12 22l-3-3m3 3l3-3M2 12h20M2 12l3 3M2 12l3-3M22 12l-3 3m3-3l-3-3" /></svg>,
    wind: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" /></svg>,
    alert: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86l-8.1 14c-.6 1.04.15 2.14 1.21 2.14h17.2c1.06 0 1.81-1.1 1.21-2.14l-8.1-14c-.6-1.04-1.82-1.04-2.42 0z" /></svg>,
    utensils: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 2v7c0 1.1.9 2 2 2h0a2 2 0 002-2V2M7 2v20M21 15V2c-2.5 0-4 2.5-4 5s1.5 5 4 5v3zM17 22v-7" /></svg>,
    heart: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
    shopping: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>,
    box: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
    office: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2m-16 0H3m5-12h.01M12 9h.01M8 13h.01M12 13h.01" /></svg>,
    shield: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
    check: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>,
    phone: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8 9a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>,
    menu: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>,
    close: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>,
    arrow: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>,
    clock: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" d="M12 6v6l4 2" /></svg>,
    wrench: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" /></svg>,
    bolt: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>,
    trendUp: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
  };
  return <>{icons[name] || <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><circle cx="12" cy="12" r="10" /></svg>}</>;
}

const serviceImages = [IMAGES.svc1, IMAGES.svc2, IMAGES.svc3, IMAGES.svc4, IMAGES.svc5, IMAGES.svc6];
const industryImages = [IMAGES.ind1, IMAGES.ind2, IMAGES.ind3, IMAGES.ind4, IMAGES.ind5];

export default function App() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#1E293B] text-white antialiased overflow-x-hidden font-sans">
      {/* ─── HEADER ─── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1E293B]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-[#EAB308] flex items-center justify-center">
              <Icon name="wrench" className="w-5 h-5 text-[#1E293B]" />
            </div>
            <div className="leading-tight">
              <span className="font-black text-[15px] text-white tracking-tight">DUCTPRO</span>
              <span className="block text-[9px] text-[#EAB308] uppercase tracking-[0.2em] font-bold">Industrial HVAC</span>
            </div>
          </a>
          <nav className="hidden lg:flex items-center gap-7 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            {navLinks.filter(l => l.label !== 'Contact').map(link => (
              <a key={link.label} href={link.href} className="hover:text-[#EAB308] transition-colors">{link.label}</a>
            ))}
            <a href="#contact" className="inline-flex items-center gap-2 bg-[#EAB308] text-[#1E293B] px-5 py-2.5 font-black hover:bg-yellow-400 transition-all text-[11px] uppercase tracking-widest">
              <Icon name="phone" className="w-3.5 h-3.5" /> Get Quote
            </a>
          </nav>
          <button onClick={() => setNavOpen(!navOpen)} className="lg:hidden p-2 text-white">
            <Icon name={navOpen ? 'close' : 'menu'} className="w-6 h-6" />
          </button>
        </div>
        <AnimatePresence>
          {navOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#1E293B] border-t border-white/10 px-4 pb-4 space-y-3 overflow-hidden">
              {navLinks.map(link => (
                <a key={link.label} href={link.href} className="block text-gray-300 font-bold text-sm py-2 uppercase tracking-wide" onClick={() => setNavOpen(false)}>{link.label}</a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ─── HERO ─── */}
      <section className="relative h-screen min-h-[700px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.hero} alt="Industrial HVAC" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] via-[#1E293B]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1E293B]/80 via-transparent to-transparent" />
        </div>
        {/* Diagonal yellow accent stripe */}
        <div className="absolute top-0 right-0 w-2 h-full bg-[#EAB308] opacity-80" />
        <div className="absolute top-0 right-4 w-1 h-full bg-[#EAB308] opacity-40" />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: 'easeOut' as const }}>
            <div className="inline-flex items-center gap-2 bg-[#EAB308] text-[#1E293B] px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-black mb-6">
              <span className="w-2 h-2 bg-[#1E293B] rounded-full animate-pulse" />
              24/7 Emergency Service Active
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter uppercase">
              Heavy-Duty<br />
              <span className="text-[#EAB308]">HVAC Systems</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-gray-300 max-w-lg font-medium">
              Engineered for uptime. Built for Chicago's toughest commercial facilities.
            </p>
          </motion.div>

          {/* Floating stat cards */}
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' as const }}
            className="mt-10 grid grid-cols-3 gap-3 sm:gap-4 max-w-xl">
            {[
              { value: `${siteInfo.technicians}`, label: 'Certified Techs', unit: '' },
              { value: `${siteInfo.contractsManaged}`, label: 'Active Contracts', unit: '+' },
              { value: '2.4', label: 'Avg Response', unit: 'hrs' },
            ].map((stat, i) => (
              <div key={i} className="bg-[#1E293B]/80 backdrop-blur-md border border-white/10 p-3 sm:p-5 text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#EAB308] leading-none">
                  {stat.value}<span className="text-lg sm:text-xl text-[#EAB308]/70">{stat.unit}</span>
                </div>
                <div className="text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-widest font-bold mt-2">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── SERVICES — Full-width banner showcase ─── */}
      <section id="services" className="bg-[#1E293B]">
        <div className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-1 bg-[#EAB308]" />
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#EAB308] font-black">Service Catalog</span>
            </div>
            <h2 className="mt-4 text-4xl sm:text-5xl font-black text-white tracking-tight uppercase">Our Capabilities</h2>
          </motion.div>
        </div>

        {services.map((s, i) => (
          <motion.div key={i} {...fadeUp}
            className={`relative h-[50vh] sm:h-[60vh] min-h-[350px] overflow-hidden ${i % 2 === 1 ? 'bg-[#0F172A]' : 'bg-[#1E293B]'}`}>
            {/* Background image */}
            <div className={`absolute inset-0 ${i % 2 === 0 ? 'left-0' : 'right-0'}`}>
              <img src={serviceImages[i]} alt={s.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1E293B]/95 via-[#1E293B]/60 to-transparent" />
              {i % 2 === 1 && (
                <div className="absolute inset-0 bg-gradient-to-l from-[#0F172A]/95 via-[#0F172A]/60 to-transparent" />
              )}
            </div>

            {/* Content overlay */}
            <div className={`relative h-full flex items-center ${i % 2 === 1 ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full`}>
                <div className={`max-w-md ${i % 2 === 1 ? 'ml-auto text-right' : ''}`}>
                  {/* Icon badge */}
                  <div className={`inline-flex items-center justify-center w-14 h-14 bg-[#EAB308] text-[#1E293B] mb-4 ${i % 2 === 1 ? 'ml-auto' : ''}`}>
                    <Icon name={s.icon} className="w-7 h-7" />
                  </div>
                  <div className="text-[10px] text-[#EAB308] uppercase tracking-[0.2em] font-black mb-2">
                    SVC-{String(i + 1).padStart(3, '0')}
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight leading-tight">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm text-gray-300 leading-relaxed max-w-sm">
                    {s.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Available · All Shifts</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Yellow accent line */}
            <div className={`absolute top-0 ${i % 2 === 0 ? 'left-0' : 'right-0'} w-1.5 h-full bg-[#EAB308]`} />
          </motion.div>
        ))}
      </section>

      {/* ─── INDUSTRIES SERVED — Image grid ─── */}
      <section id="industries" className="py-20 sm:py-28 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="mb-12">
            <div className="flex items-center gap-3">
              <div className="w-12 h-1 bg-[#EAB308]" />
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#EAB308] font-black">Sector Coverage</span>
            </div>
            <h2 className="mt-4 text-4xl sm:text-5xl font-black text-white tracking-tight uppercase">Industries We Serve</h2>
          </motion.div>

          <motion.div {...stagger} className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {industries.map((ind, i) => (
              <motion.div key={i} {...child}
                className={`group relative overflow-hidden cursor-pointer ${i === 0 ? 'col-span-2 lg:col-span-1 row-span-2 aspect-[3/4] lg:aspect-auto' : 'aspect-[4/3]'}`}>
                <img src={industryImages[i]} alt={ind.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] via-[#1E293B]/30 to-transparent group-hover:via-[#1E293B]/50 transition-all duration-500" />
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#EAB308] transition-all duration-300" />
                <div className="relative h-full flex flex-col justify-end p-4 sm:p-6">
                  <div className="w-10 h-10 bg-[#EAB308] flex items-center justify-center text-[#1E293B] mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <Icon name={ind.icon} className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-tight">{ind.name}</h3>
                  <p className="text-[11px] text-gray-400 mt-1 leading-relaxed max-w-xs opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    {ind.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── THE PROGRAM — KPI Dashboard ─── */}
      <section id="program" className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.program} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#1E293B]/90" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="mb-14">
            <div className="flex items-center gap-3">
              <div className="w-12 h-1 bg-[#EAB308]" />
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#EAB308] font-black">Process Flow</span>
            </div>
            <h2 className="mt-4 text-4xl sm:text-5xl font-black text-white tracking-tight uppercase">The Maintenance Program</h2>
            <p className="mt-3 text-gray-400 max-w-lg text-sm">A 4-step protocol engineered to prevent unplanned downtime and protect equipment investment.</p>
          </motion.div>

          {/* Horizontal KPI dashboard */}
          <motion.div {...stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {programSteps.map((step, i) => (
              <motion.div key={i} {...child}
                className="bg-[#0F172A]/80 backdrop-blur border border-white/10 p-5 hover:border-[#EAB308]/50 transition-all group relative overflow-hidden">
                {/* Progress gauge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl font-black text-[#EAB308]/30 group-hover:text-[#EAB308]/60 transition-colors">
                    {step.step}
                  </div>
                  <div className="w-10 h-10 bg-[#EAB308]/10 border border-[#EAB308]/30 flex items-center justify-center">
                    <Icon name={i === 0 ? 'clipboard' : i === 1 ? 'check' : i === 2 ? 'bolt' : 'wrench'} className="w-5 h-5 text-[#EAB308]" />
                  </div>
                </div>
                {/* Progress bar */}
                <div className="h-1.5 bg-white/10 mb-4 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(i + 1) * 25}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.2, ease: 'easeOut' as const }}
                    className="h-full bg-[#EAB308]"
                  />
                </div>
                <h3 className="font-black text-white text-sm uppercase tracking-tight mb-2">{step.title}</h3>
                <p className="text-[11px] text-gray-400 leading-relaxed">{step.description}</p>
                {/* Bottom detail */}
                <div className="mt-4 pt-3 border-t border-white/10">
                  <p className="text-[10px] text-[#EAB308]/80 font-bold uppercase tracking-wider">{step.details}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── PERFORMANCE METRICS — Bold KPI cards ─── */}
      <section id="reporting" className="py-20 sm:py-28 bg-[#F1F5F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="mb-12">
            <div className="flex items-center gap-3">
              <div className="w-12 h-1 bg-[#EAB308]" />
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#475569] font-black">Live Metrics</span>
            </div>
            <h2 className="mt-4 text-4xl sm:text-5xl font-black text-[#1E293B] tracking-tight uppercase">Performance Dashboard</h2>
          </motion.div>

          <motion.div {...stagger} className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {reportMetrics.map((m, i) => (
              <motion.div key={i} {...child}
                className="bg-white border-2 border-[#E2E8F0] p-5 sm:p-7 hover:border-[#EAB308] hover:shadow-xl transition-all group relative overflow-hidden">
                {/* Top indicator */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase tracking-widest text-[#475569] font-bold">{m.label}</span>
                  <div className={`flex items-center gap-1 px-2 py-0.5 text-[10px] font-black uppercase ${m.positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    <Icon name="trendUp" className="w-3 h-3" />
                    {m.positive ? 'UP' : 'DOWN'}
                  </div>
                </div>
                {/* Big number */}
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E293B] leading-none">
                  {m.value}
                </div>
                <div className={`text-xs sm:text-sm font-bold mt-2 ${m.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {m.change}
                </div>
                {/* Mini bar chart */}
                <div className="mt-4 flex items-end gap-1 h-8">
                  {[35, 55, 45, 70, 60, 85, 75, 90].map((h, j) => (
                    <div key={j} className={`flex-1 rounded-sm transition-all duration-300 ${m.positive ? 'bg-green-500/20 group-hover:bg-green-500/50' : 'bg-red-500/20 group-hover:bg-red-500/50'}`}
                      style={{ height: `${h}%` }} />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── RESPONSE TIERS — Comparison table ─── */}
      <section id="response" className="py-20 sm:py-28 bg-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="mb-14">
            <div className="flex items-center gap-3">
              <div className="w-12 h-1 bg-[#EAB308]" />
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#EAB308] font-black">Service Levels</span>
            </div>
            <h2 className="mt-4 text-4xl sm:text-5xl font-black text-white tracking-tight uppercase">Response Tiers</h2>
          </motion.div>

          <motion.div {...stagger} className="grid md:grid-cols-3 gap-4">
            {responseTiers.map((tier, i) => (
              <motion.div key={i} {...child}
                className={`relative border-2 p-6 sm:p-8 transition-all hover:-translate-y-1 hover:shadow-2xl ${i === 0 ? 'border-[#EAB308] bg-[#EAB308]/5' : 'border-white/10 bg-[#0F172A]/50 hover:border-[#EAB308]/50'}`}>
                {i === 0 && (
                  <div className="absolute -top-3 left-6 bg-[#EAB308] text-[#1E293B] text-[9px] font-black uppercase tracking-widest px-3 py-1">
                    Recommended
                  </div>
                )}
                {/* Tier badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 flex items-center justify-center font-black text-xl ${i === 0 ? 'bg-[#EAB308] text-[#1E293B]' : 'bg-white/10 text-white border border-white/20'}`}>
                    {i + 1}
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#EAB308]/10 border border-[#EAB308]/30 px-3 py-1.5">
                    <Icon name="clock" className="w-3.5 h-3.5 text-[#EAB308]" />
                    <span className="text-[11px] font-black text-[#EAB308]">{tier.responseTime}</span>
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">{tier.tier}</div>
                <h3 className="font-black text-white text-lg uppercase tracking-tight mb-3">{tier.label}</h3>
                <p className="text-[12px] text-gray-400 leading-relaxed">{tier.description}</p>
                {/* Gauge bar */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-2">
                    <span>Priority Level</span>
                    <span>{i === 0 ? 'Critical' : i === 1 ? 'Standard' : 'Basic'}</span>
                  </div>
                  <div className="h-2 bg-white/10 overflow-hidden">
                    <div className={`h-full ${i === 0 ? 'bg-[#EAB308] w-full' : i === 1 ? 'bg-[#EAB308]/60 w-2/3' : 'bg-[#EAB308]/30 w-1/3'}`} />
                  </div>
                </div>
                <div className="mt-5">
                  <a href="#contact" className={`block text-center font-black text-[11px] uppercase tracking-widest py-3 transition-all ${i === 0 ? 'bg-[#EAB308] text-[#1E293B] hover:bg-yellow-400' : 'bg-white/5 text-white border border-white/20 hover:bg-[#EAB308] hover:text-[#1E293B] hover:border-[#EAB308]'}`}>
                    Select Plan
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section id="contact" className="relative py-28 sm:py-36 overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.cta} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#1E293B]/85" />
        </div>
        {/* Diagonal yellow stripes */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#EAB308]" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#EAB308]/50" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeUp}>
            <div className="inline-flex items-center gap-2 bg-[#EAB308] text-[#1E293B] px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-black mb-8">
              <Icon name="bolt" className="w-4 h-4" />
              Free Facility Assessment
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase leading-[0.95]">
              Protect Your<br />
              <span className="text-[#EAB308]">Commercial Investment</span>
            </h2>
            <p className="mt-6 text-gray-400 max-w-md mx-auto text-sm">
              Get a comprehensive facility assessment and custom maintenance program. No obligation.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href={`tel:${siteInfo.phone.replace(/[^0-9+]/g, '')}`} className="inline-flex items-center gap-2 bg-[#EAB308] text-[#1E293B] font-black px-8 py-4 text-sm uppercase tracking-widest hover:bg-yellow-400 transition-all">
                <Icon name="phone" className="w-4 h-4" /> {siteInfo.phone}
              </a>
              <a href={`mailto:${siteInfo.email}`} className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-black px-8 py-4 text-sm uppercase tracking-widest hover:border-[#EAB308] hover:text-[#EAB308] transition-all">
                Email Team
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#0F172A] py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-8">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 bg-[#EAB308] flex items-center justify-center">
                  <Icon name="wrench" className="w-4 h-4 text-[#1E293B]" />
                </div>
                <div>
                  <span className="font-black text-white text-[14px] tracking-tight">DUCTPRO</span>
                  <span className="block text-[9px] text-[#EAB308] uppercase tracking-[0.2em] font-bold">Industrial HVAC</span>
                </div>
              </div>
              <p className="text-[11px] text-gray-500 uppercase tracking-wider">{siteInfo.yearsExperience} years · Chicago commercial facilities</p>
            </div>
            <div className="space-y-2 text-right">
              <p className="text-[12px] text-gray-400">{siteInfo.address}</p>
              <p className="text-[12px] text-gray-400">{siteInfo.technicians} techs · {siteInfo.contractsManaged}+ contracts</p>
              <p className="text-[13px] font-black text-[#EAB308]">{siteInfo.phone}</p>
              <p className="text-[11px] text-gray-500">{siteInfo.email}</p>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:justify-between gap-3 text-[10px] text-gray-600 uppercase tracking-wider">
            <span>&copy; {new Date().getFullYear()} DuctPro Commercial HVAC</span>
            <span>IL Mechanical License · EPA Section 608</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
