import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteInfo, services, industries, programSteps, reportMetrics, complianceItems, responseTiers, navLinks } from './data';

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.45 } };
const stagger = { initial: {}, whileInView: { transition: { staggerChildren: 0.07 } }, viewport: { once: true } };

function Icon({ name, className }: { name: string; className?: string }) {
  const cls = className || 'w-6 h-6';
  const icons: Record<string, React.ReactNode> = {
    building: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><rect x="3" y="3" width="18" height="18" rx="1" /><path d="M9 3v18M15 3v18M3 9h18M3 15h18" /></svg>,
    clipboard: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
    refresh: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
    snowflake: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M12 2l-3 3m3-3l3 3M12 22l-3-3m3 3l3-3M2 12h20M2 12l3 3M2 12l3-3M22 12l-3 3m3-3l-3-3M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" /></svg>,
    wind: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" /></svg>,
    alert: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86l-8.1 14c-.6 1.04.15 2.14 1.21 2.14h17.2c1.06 0 1.81-1.1 1.21-2.14l-8.1-14c-.6-1.04-1.82-1.04-2.42 0z" /></svg>,
    utensils: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6V2m0 4a4 4 0 014 4v4a4 4 0 01-8 0v-4a4 4 0 014-4zm0 0V2" /><path strokeLinecap="round" strokeLinejoin="round" d="M18 13v4a6 6 0 01-12 0v-4" /></svg>,
    heart: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
    shopping: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>,
    box: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
    office: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 21l8-4 8 4V5l-8-4-8 4v16z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m-3-3h6" /></svg>,
    shield: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
    check: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>,
    file: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    arrow: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>,
    menu: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>,
    close: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>,
    trendUp: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
    phone: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8 9a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>,
    chevronDown: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>,
    clock: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" d="M12 6v6l4 2" /></svg>,
    gauge: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 2a10 10 0 100 20 10 10 0 000-20z" /><path strokeLinecap="round" d="M12 12l4-4" /><circle cx="12" cy="12" r="1" fill="currentColor" /></svg>,
    wrench: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" /></svg>,
  };
  return <>{icons[name] || <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><circle cx="12" cy="12" r="10" /></svg>}</>;
}

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-[#374151] antialiased overflow-x-hidden font-sans">
      {/* ─── HEADER ─── */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <motion.a href="#" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-[#3B82F6] flex items-center justify-center">
              <Icon name="wrench" className="w-5 h-5 text-white" />
            </div>
            <div className="leading-tight">
              <span className="font-bold text-[15px] text-[#374151] tracking-tight">DuctPro</span>
              <span className="block text-[10px] text-gray-400 uppercase tracking-widest font-medium">Commercial HVAC</span>
            </div>
          </motion.a>
          <nav className="hidden lg:flex items-center gap-6 text-[13px] font-semibold text-gray-500 uppercase tracking-wide">
            {navLinks.filter(l => l.label !== 'Contact').map(link => (
              <a key={link.label} href={link.href} className="hover:text-[#3B82F6] transition-colors">{link.label}</a>
            ))}
            <a href="#contact" className="inline-flex items-center gap-2 bg-[#3B82F6] text-white px-5 py-2.5 font-semibold hover:bg-blue-600 transition-all text-[13px] uppercase tracking-wide">
              <Icon name="phone" className="w-3.5 h-3.5" /> Get Quote
            </a>
          </nav>
          <button onClick={() => setNavOpen(!navOpen)} className="lg:hidden p-2 text-gray-500">
            <Icon name={navOpen ? 'close' : 'menu'} className="w-6 h-6" />
          </button>
        </div>
        <AnimatePresence>
          {navOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-gray-100 px-4 pb-4 space-y-3 overflow-hidden">
              {navLinks.map(link => (
                <a key={link.label} href={link.href} className="block text-gray-600 font-semibold text-sm py-2" onClick={() => setNavOpen(false)}>{link.label}</a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ─── HERO ─── */}
      <section className="relative bg-[#374151] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${siteInfo.heroImage})` }} />
        <div className="absolute inset-0 bg-gradient-to-br from-[#374151] via-[#374151]/95 to-[#3B82F6]/30" />
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <motion.div className="max-w-3xl" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-[#3B82F6]/20 border border-[#3B82F6]/30 px-3 py-1 text-[11px] text-blue-300 uppercase tracking-widest font-semibold mb-6">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              24/7 Emergency Service Active
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
              Commercial HVAC<br />
              <span className="text-[#3B82F6]">Engineered for uptime.</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-gray-300 max-w-xl leading-relaxed">
              Data-driven preventive maintenance for {siteInfo.contractsManaged}+ commercial facilities across Chicago. {siteInfo.technicians} certified technicians. {siteInfo.responseTimeAvg} average response.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#services" className="inline-flex items-center gap-2 bg-[#3B82F6] text-white font-bold px-6 py-3.5 text-sm uppercase tracking-wide hover:bg-blue-600 transition-all">
                View Services <Icon name="arrow" className="w-4 h-4" />
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 border border-gray-500 text-gray-300 font-bold px-6 py-3.5 text-sm uppercase tracking-wide hover:bg-white/5 transition-all">
                <Icon name="phone" className="w-4 h-4" /> {siteInfo.phone}
              </a>
            </div>
          </motion.div>

          {/* Hero Stats Bar */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-14 grid grid-cols-3 gap-px bg-white/10 max-w-2xl">
            {[
              { value: `${siteInfo.technicians}`, label: 'Certified Technicians' },
              { value: `${siteInfo.contractsManaged}+`, label: 'Active Contracts' },
              { value: siteInfo.responseTimeAvg, label: 'Avg Response Time' },
            ].map((stat, i) => (
              <div key={i} className="bg-[#374151]/80 backdrop-blur px-4 py-4 sm:px-6 sm:py-5 text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-white">{stat.value}</div>
                <div className="text-[10px] sm:text-[11px] text-gray-400 uppercase tracking-wider mt-1 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="mb-12">
            <div className="text-[11px] uppercase tracking-widest text-[#3B82F6] font-bold mb-2">Service Catalog</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#374151] tracking-tight">Commercial HVAC Services</h2>
            <p className="mt-3 text-gray-500 max-w-xl">Full-spectrum mechanical services for commercial facilities. All work performed by EPA 608 certified technicians.</p>
          </motion.div>
          <motion.div {...stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s, i) => (
              <motion.div key={i} {...fadeUp}
                className="group relative bg-[#F1F5F9] border border-gray-200 p-5 hover:border-[#3B82F6] hover:shadow-lg transition-all">
                {/* Equipment-style top bar */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-white border border-gray-200 flex items-center justify-center text-[#3B82F6]">
                    <Icon name={s.icon} className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">SVC-{String(i + 1).padStart(3, '0')}</span>
                </div>
                <h3 className="font-bold text-[#374151] text-[15px] mb-2">{s.title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">{s.description}</p>
                {/* Bottom spec line */}
                <div className="mt-4 pt-3 border-t border-gray-200 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Available · All shifts</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── INDUSTRIES ─── */}
      <section id="industries" className="py-20 sm:py-24 bg-[#F1F5F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="mb-12">
            <div className="text-[11px] uppercase tracking-widest text-[#3B82F6] font-bold mb-2">Sector Coverage</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#374151] tracking-tight">Industries Served</h2>
            <p className="mt-3 text-gray-500 max-w-xl">Specialized HVAC solutions calibrated to the operational demands of each commercial sector.</p>
          </motion.div>
          <motion.div {...stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl">
            {industries.map((ind, i) => (
              <motion.div key={i} {...fadeUp}
                className="bg-white border border-gray-200 p-5 hover:border-[#3B82F6] hover:shadow-md transition-all group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-[#3B82F6]/10 flex items-center justify-center text-[#3B82F6] group-hover:bg-[#3B82F6] group-hover:text-white transition-all">
                    <Icon name={ind.icon} className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[#374151] text-[14px]">{ind.name}</h3>
                </div>
                <p className="text-[12px] text-gray-500 leading-relaxed">{ind.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── MAINTENANCE PROGRAM ─── */}
      <section id="program" className="py-20 sm:py-24 bg-[#374151] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="mb-14">
            <div className="text-[11px] uppercase tracking-widest text-[#3B82F6] font-bold mb-2">Process Flow</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Preventive Maintenance Program</h2>
            <p className="mt-3 text-gray-400 max-w-xl">A structured 4-step protocol that protects equipment investment and prevents unplanned downtime.</p>
          </motion.div>
          <motion.div {...stagger} className="space-y-3 max-w-4xl">
            {programSteps.map((step, i) => (
              <motion.div key={i} {...fadeUp}
                className="bg-white/5 border border-white/10 hover:border-[#3B82F6]/50 transition-all cursor-pointer"
                onClick={() => setExpandedStep(expandedStep === i ? null : i)}>
                <div className="flex items-center gap-4 p-5">
                  <div className="w-10 h-10 bg-[#3B82F6] flex items-center justify-center font-extrabold text-sm shrink-0">
                    {step.step}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white text-[15px]">{step.title}</h3>
                    <p className="text-[12px] text-gray-400 mt-0.5 truncate">{step.description}</p>
                  </div>
                  <motion.div animate={{ rotate: expandedStep === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <Icon name="chevronDown" className="w-5 h-5 text-gray-400" />
                  </motion.div>
                </div>
                <AnimatePresence>
                  {expandedStep === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                      className="overflow-hidden">
                      <div className="px-5 pb-5 pl-19 ml-14 border-t border-white/10 pt-4">
                        <p className="text-[13px] text-gray-300 leading-relaxed">{step.description}</p>
                        <div className="mt-3 bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-3 py-2">
                          <p className="text-[12px] text-blue-300 font-medium">{step.details}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── PERFORMANCE DASHBOARD ─── */}
      <section id="reporting" className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="mb-12">
            <div className="text-[11px] uppercase tracking-widest text-[#3B82F6] font-bold mb-2">Live Metrics</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#374151] tracking-tight">Performance Dashboard</h2>
            <p className="mt-3 text-gray-500 max-w-xl">Real-time KPI tracking across all managed accounts. Updated continuously from field operations.</p>
          </motion.div>
          <motion.div {...stagger} className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {reportMetrics.map((m, i) => (
              <motion.div key={i} {...fadeUp}
                className="bg-[#F1F5F9] border border-gray-200 p-5 hover:border-[#3B82F6] hover:shadow-md transition-all group">
                <div className="flex items-start justify-between">
                  <div className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">{m.label}</div>
                  <div className={`w-2 h-2 rounded-full ${m.positive ? 'bg-green-500' : 'bg-amber-500'}`} />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#374151] mt-2">{m.value}</div>
                <div className={`text-[11px] mt-1.5 font-semibold ${m.positive ? 'text-green-600' : 'text-amber-600'}`}>
                  {m.change}
                </div>
                {/* Mini bar chart decoration */}
                <div className="mt-3 flex items-end gap-0.5 h-6">
                  {[40, 65, 55, 80, 70, 90, 85].map((h, j) => (
                    <div key={j} className={`flex-1 rounded-sm ${m.positive ? 'bg-green-500/20 group-hover:bg-green-500/40' : 'bg-amber-500/20 group-hover:bg-amber-500/40'} transition-colors`}
                      style={{ height: `${h}%` }} />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── COMPLIANCE & SAFETY ─── */}
      <section className="py-20 sm:py-24 bg-[#F1F5F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="mb-12">
            <div className="text-[11px] uppercase tracking-widest text-[#3B82F6] font-bold mb-2">Certifications</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#374151] tracking-tight">Compliance & Safety</h2>
            <p className="mt-3 text-gray-500 max-w-xl">Full regulatory compliance across all jurisdictions. Audit-ready documentation for every account.</p>
          </motion.div>
          <motion.div {...stagger} className="grid sm:grid-cols-2 gap-4 max-w-4xl">
            {complianceItems.map((c, i) => (
              <motion.div key={i} {...fadeUp}
                className="bg-white border border-gray-200 p-5 hover:border-[#3B82F6] hover:shadow-md transition-all group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6]">
                    <Icon name={c.icon} className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#374151] text-[14px]">{c.title}</h3>
                    <span className="text-[10px] text-green-600 font-bold uppercase tracking-wider">Compliant</span>
                  </div>
                </div>
                <p className="text-[12px] text-gray-500 leading-relaxed">{c.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── RESPONSE PLANS ─── */}
      <section id="response" className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="mb-12">
            <div className="text-[11px] uppercase tracking-widest text-[#3B82F6] font-bold mb-2">Service Levels</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#374151] tracking-tight">Response Plans</h2>
            <p className="mt-3 text-gray-500 max-w-xl">Select the service tier that matches your facility's operational criticality.</p>
          </motion.div>
          <motion.div {...stagger} className="grid md:grid-cols-3 gap-4 max-w-5xl">
            {responseTiers.map((tier, i) => (
              <motion.div key={i} {...fadeUp}
                className={`relative border p-6 transition-all hover:shadow-xl hover:-translate-y-1 ${i === 0 ? 'border-[#3B82F6] bg-blue-50/50 shadow-lg' : 'border-gray-200 bg-white hover:border-[#3B82F6]'}`}>
                {i === 0 && (
                  <div className="absolute -top-3 left-6 bg-[#3B82F6] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1">
                    Recommended
                  </div>
                )}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-gray-400">{tier.tier}</span>
                  <div className="flex items-center gap-1.5 bg-[#374151] text-white px-3 py-1.5">
                    <Icon name="clock" className="w-3.5 h-3.5" />
                    <span className="text-[12px] font-bold">{tier.responseTime}</span>
                  </div>
                </div>
                <h3 className="font-extrabold text-[#374151] text-lg mb-3">{tier.label}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">{tier.description}</p>
                <div className="mt-5 pt-4 border-t border-gray-200">
                  <a href="#contact" className={`block text-center font-bold text-[12px] uppercase tracking-wide py-2.5 transition-all ${i === 0 ? 'bg-[#3B82F6] text-white hover:bg-blue-600' : 'bg-[#F1F5F9] text-[#374151] hover:bg-[#3B82F6] hover:text-white'}`}>
                    Select Plan
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section id="contact" className="py-20 bg-[#374151] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeUp}>
            <div className="inline-flex items-center gap-2 bg-[#3B82F6]/20 border border-[#3B82F6]/30 px-3 py-1 text-[11px] text-blue-300 uppercase tracking-widest font-semibold mb-6">
              <Icon name="gauge" className="w-3.5 h-3.5" />
              Free Facility Assessment
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Protect your commercial investment.</h2>
            <p className="mt-4 text-gray-400 max-w-lg mx-auto">Get a comprehensive facility assessment and custom maintenance program proposal. No obligation.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={`tel:${siteInfo.phone.replace(/[^0-9+]/g, '')}`} className="inline-flex items-center gap-2 bg-[#3B82F6] text-white font-bold px-7 py-3.5 text-sm uppercase tracking-wide hover:bg-blue-600 transition-all">
                <Icon name="phone" className="w-4 h-4" /> {siteInfo.phone}
              </a>
              <a href={`mailto:${siteInfo.email}`} className="inline-flex items-center gap-2 border border-gray-500 text-gray-300 font-bold px-7 py-3.5 text-sm uppercase tracking-wide hover:bg-white/5 transition-all">
                Email Our Team
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#1F2937] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-8">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 bg-[#3B82F6] flex items-center justify-center">
                  <Icon name="wrench" className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="font-bold text-white text-[14px]">DuctPro Commercial HVAC</span>
                  <span className="block text-[10px] text-gray-500 uppercase tracking-widest">Licensed · Insured · EPA Certified</span>
                </div>
              </div>
              <p className="text-[12px] text-gray-500">{siteInfo.yearsExperience} years serving Chicago commercial facilities.</p>
            </div>
            <div className="space-y-2 text-right">
              <p className="text-[13px] text-gray-400">{siteInfo.address}</p>
              <p className="text-[13px] text-gray-400">{siteInfo.technicians} technicians · {siteInfo.contractsManaged}+ contracts</p>
              <p className="text-[13px] font-bold text-[#3B82F6]">{siteInfo.phone}</p>
              <p className="text-[12px] text-gray-500">{siteInfo.email}</p>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row sm:justify-between gap-3 text-[11px] text-gray-600">
            <span>&copy; {new Date().getFullYear()} DuctPro Commercial HVAC. All rights reserved.</span>
            <span>IL Mechanical License · EPA Section 608 Certified</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
