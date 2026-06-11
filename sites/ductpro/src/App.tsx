import { useState } from 'react';
import { motion } from 'framer-motion';
import { siteInfo, services, industries, programSteps, reportMetrics, complianceItems, responseTiers, navLinks } from './data';

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };
const stagger = { initial: {}, whileInView: { transition: { staggerChildren: 0.06 } }, viewport: { once: true } };

function Icon({ name, className }: { name: string; className?: string }) {
  const cls = className || 'w-6 h-6';
  const icons: Record<string, React.ReactNode> = {
    building: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
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
  };
  return icons[name] || <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><circle cx="12" cy="12" r="10" /></svg>;
}

export default function App() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-graphite-50 text-gray-700 antialiased overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-graphite-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <motion.a href="#" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-ind-blue-700 flex items-center justify-center text-white font-bold text-sm">DP</div>
            <span className="font-bold text-xl text-ind-blue-700">DuctPro</span>
            <span className="hidden sm:inline text-xs text-graphite-400 ml-1 font-medium">Commercial HVAC</span>
          </motion.a>
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-graphite-500">
            {navLinks.filter(l => l.label !== 'Contact').map(link => (
              <a key={link.label} href={link.href} className="hover:text-ind-blue-600 transition-colors">{link.label}</a>
            ))}
            <a href="#contact" className="inline-flex items-center gap-1.5 bg-ind-blue-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-ind-blue-600 transition-all text-sm shadow-sm">
              <Icon name="phone" className="w-4 h-4" /> Contact
            </a>
          </nav>
          <button onClick={() => setNavOpen(!navOpen)} className="md:hidden p-2 text-graphite-400">
            <Icon name={navOpen ? 'close' : 'menu'} className="w-6 h-6" />
          </button>
        </div>
        {navOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="md:hidden bg-white border-b border-graphite-200 px-4 pb-4 space-y-3">
            {navLinks.map(link => (
              <a key={link.label} href={link.href} className="block text-graphite-500 font-medium" onClick={() => setNavOpen(false)}>{link.label}</a>
            ))}
          </motion.div>
        )}
      </header>

      {/* Hero */}
      <section className="relative bg-ind-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${siteInfo.heroImage})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-ind-blue-900/95 via-ind-blue-800/90 to-ind-blue-700/80" />
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-28 lg:py-32">
          <motion.div className="max-w-3xl" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-1.5 rounded-full text-sm text-graphite-200 mb-6">
              <span className="w-2 h-2 rounded-full bg-accent" />
              {siteInfo.shortTagline}
            </motion.div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              Commercial HVAC maintained{' '}
              <span className="text-accent">before downtime starts.</span>
            </h1>
            <p className="mt-6 text-lg text-graphite-200/80 max-w-2xl leading-relaxed">
              Proactive maintenance, compliance documentation, and rapid response for commercial facilities. {siteInfo.contractsManaged}+ contracts managed across Chicago.
            </p>
            <motion.div className="mt-8 flex flex-wrap gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <a href="#services" className="inline-flex items-center gap-2 bg-accent text-white font-semibold px-7 py-3.5 rounded-lg hover:bg-accent-dark transition-all shadow-lg shadow-accent/20 text-base">
                View Services <Icon name="arrow" className="w-4 h-4" />
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 border-2 border-graphite-400 text-graphite-200 font-semibold px-7 py-3.5 rounded-lg hover:bg-white/10 transition-all text-base">
                <Icon name="phone" className="w-4 h-4" /> {siteInfo.phone}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Metrics Dashboard */}
      <section className="py-12 -mt-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...stagger} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {reportMetrics.map((m, i) => (
              <motion.div key={i} {...fadeUp}
                className="bg-white border border-graphite-200 rounded-xl p-4 text-center shadow-sm hover:shadow-md hover:border-ind-blue-200 transition-all">
                <div className="text-lg font-extrabold text-ind-blue-700">{m.value}</div>
                <div className="text-[10px] font-medium text-graphite-400 uppercase tracking-wider mt-0.5">{m.label}</div>
                <div className={`text-[10px] mt-1 font-medium ${m.positive ? 'text-green-600' : 'text-warning'}`}>{m.change}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <h2 className="section-title">Commercial Services</h2>
            <p className="section-subtitle">Full-spectrum commercial HVAC, refrigeration, and ventilation services for facilities of any size.</p>
          </motion.div>
          <motion.div {...stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s, i) => (
              <motion.div key={i} {...fadeUp}
                className="bg-white border border-graphite-200 rounded-xl p-5 hover:border-ind-blue-300 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-ind-blue-50 flex items-center justify-center text-ind-blue-600 shrink-0">
                    <Icon name={s.icon} className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ind-blue-700 text-sm">{s.title}</h3>
                    <p className="text-xs text-graphite-400 mt-1 leading-relaxed">{s.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Industries Served */}
      <section id="industries" className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <h2 className="section-title">Industries We Serve</h2>
            <p className="section-subtitle">Specialized HVAC solutions for the unique demands of each commercial sector.</p>
          </motion.div>
          <motion.div {...stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {industries.map((ind, i) => (
              <motion.div key={i} {...fadeUp}
                className="flex gap-3 p-4 rounded-xl border border-graphite-100 bg-graphite-50/50 hover:bg-white hover:border-ind-blue-200 hover:shadow-md transition-all group">
                <div className="w-9 h-9 rounded-lg bg-ind-blue-50 flex items-center justify-center text-ind-blue-600 group-hover:bg-ind-blue-100 transition-all shrink-0">
                  <Icon name={ind.icon} className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-ind-blue-700 text-sm">{ind.name}</h3>
                  <p className="text-xs text-graphite-400 mt-1 leading-relaxed">{ind.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Maintenance Program */}
      <section id="program" className="py-20 sm:py-24 bg-gradient-to-b from-ind-blue-800 to-ind-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3">Preventive Maintenance Program</h2>
            <p className="text-graphite-200/70 text-center max-w-xl mx-auto mb-12 text-lg">A structured approach that protects your equipment investment and prevents costly downtime.</p>
          </motion.div>
          <motion.div {...stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {programSteps.map((step, i) => (
              <motion.div key={i} {...fadeUp}
                className="bg-white/10 backdrop-blur border border-white/10 rounded-xl p-5 hover:bg-white/15 transition-all group">
                <div className="text-accent font-bold text-2xl mb-2">{step.step}</div>
                <h3 className="font-bold text-white text-base">{step.title}</h3>
                <p className="text-sm text-graphite-200/70 mt-2 leading-relaxed">{step.description}</p>
                <div className="mt-3 pt-3 border-t border-white/10">
                  <p className="text-xs text-accent/80">{step.details}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Compliance */}
      <section id="reporting" className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <h2 className="section-title">Compliance & Reporting</h2>
            <p className="section-subtitle">Stay audit-ready with full digital documentation and code-compliant maintenance records.</p>
          </motion.div>
          <motion.div {...stagger} className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {complianceItems.map((c, i) => (
              <motion.div key={i} {...fadeUp}
                className="flex gap-4 p-5 rounded-xl border border-graphite-200 bg-graphite-50/50 hover:bg-white hover:border-ind-blue-200 hover:shadow-lg transition-all">
                <div className="w-10 h-10 rounded-lg bg-ind-blue-50 flex items-center justify-center text-ind-blue-600 shrink-0">
                  <Icon name={c.icon} className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-ind-blue-700">{c.title}</h3>
                  <p className="text-sm text-graphite-400 mt-1 leading-relaxed">{c.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Response Plans */}
      <section id="response" className="py-20 sm:py-24 bg-graphite-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <h2 className="section-title">Response Plans</h2>
            <p className="section-subtitle">Choose the service level that matches your facility's needs and budget.</p>
          </motion.div>
          <motion.div {...stagger} className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {responseTiers.map((tier, i) => (
              <motion.div key={i} {...fadeUp}
                className={`rounded-xl p-6 border transition-all hover:-translate-y-1 hover:shadow-lg ${i === 0 ? 'bg-white border-ind-blue-300 shadow-md' : 'bg-white border-graphite-200 hover:border-ind-blue-200'}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-ind-blue-500">{tier.tier}</span>
                  <span className="text-sm font-bold text-accent bg-accent/10 px-3 py-1 rounded-full">{tier.responseTime}</span>
                </div>
                <h3 className="font-bold text-ind-blue-700 text-sm">{tier.label}</h3>
                <p className="text-xs text-graphite-400 mt-2 leading-relaxed">{tier.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-20 bg-gradient-to-r from-ind-blue-800 to-ind-blue-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl sm:text-4xl font-bold">Protect your commercial investment.</h2>
            <p className="mt-4 text-lg text-graphite-200/70">Get a free facility assessment and maintenance program proposal tailored to your building.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a href="tel:+13125550729" className="inline-flex items-center gap-2 bg-accent text-white font-semibold px-7 py-3.5 rounded-lg hover:bg-accent-dark transition-all shadow-lg shadow-accent/20 text-base">
                <Icon name="phone" className="w-5 h-5" /> {siteInfo.phone}
              </a>
              <a href={`mailto:${siteInfo.email}`} className="inline-flex items-center gap-2 border-2 border-graphite-400 text-graphite-200 font-semibold px-7 py-3.5 rounded-lg hover:bg-white/10 transition-all text-base">
                Email Our Team
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ind-blue-900 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:flex sm:justify-between sm:text-left">
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center text-white font-bold text-xs">DP</div>
              <span className="font-bold text-lg text-white">DuctPro Commercial</span>
            </div>
            <p className="text-sm text-graphite-400/50 mt-2">Licensed &bull; Insured &bull; 22 Years in Chicago</p>
          </div>
          <div className="mt-6 sm:mt-0 space-y-1">
            <p className="text-sm text-graphite-400/60">{siteInfo.address}</p>
            <p className="text-sm text-graphite-400/60">{siteInfo.technicians} technicians | {siteInfo.contractsManaged}+ contracts</p>
            <p className="text-sm font-semibold text-accent">{siteInfo.phone}</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-ind-blue-800 text-center text-xs text-graphite-400/30">
          &copy; {new Date().getFullYear()} DuctPro Commercial HVAC. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
