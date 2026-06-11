import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteInfo, problems, solutions, assessmentSteps, systemLayers, products, faq, navLinks } from './data';

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };
const stagger = { initial: {}, whileInView: { transition: { staggerChildren: 0.06 } }, viewport: { once: true } };

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
  };
  return icons[name] || <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><circle cx="12" cy="12" r="10" /></svg>;
}

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-clean-50 text-slate-700 antialiased overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <motion.a href="#" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white font-bold text-sm">
              <Icon name="wind" className="w-4 h-4" />
            </div>
            <span className="font-bold text-xl text-sky-800">PureAir</span>
            <span className="hidden sm:inline text-xs text-slate-400 ml-1 font-medium">Indoor Comfort</span>
          </motion.a>
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-500">
            {navLinks.filter(l => l.label !== 'Contact').map(link => (
              <a key={link.label} href={link.href} className="hover:text-sky-600 transition-colors">{link.label}</a>
            ))}
            <a href="#contact" className="inline-flex items-center gap-1.5 bg-sky-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-sky-600 transition-all text-sm shadow-sm">
              <Icon name="clipboard" className="w-4 h-4" /> Get Assessed
            </a>
          </nav>
          <button onClick={() => setNavOpen(!navOpen)} className="md:hidden p-2 text-slate-400">
            <Icon name={navOpen ? 'close' : 'menu'} className="w-6 h-6" />
          </button>
        </div>
        {navOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="md:hidden bg-white border-b border-sky-100 px-4 pb-4 space-y-3">
            {navLinks.map(link => (
              <a key={link.label} href={link.href} className="block text-slate-500 font-medium" onClick={() => setNavOpen(false)}>{link.label}</a>
            ))}
          </motion.div>
        )}
      </header>

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-sky-50 via-white to-clean-50 text-slate-700 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-[0.07]" style={{ backgroundImage: `url(${siteInfo.heroImage})` }} />
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-sky-100/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-sky-200/20 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-28 lg:py-32">
          <motion.div className="max-w-3xl" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Icon name="badge" className="w-4 h-4" /> {siteInfo.homesServiced}+ Homes Serviced
            </motion.div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-sky-800">
              Breathe{' '}
              <span className="text-sky-500">cleaner air</span>{' '}
              at home.
            </h1>
            <p className="mt-6 text-lg text-slate-500 max-w-2xl leading-relaxed">
              Whole-home air purification, humidity control, and ventilation solutions. We test, diagnose, and fix indoor air quality issues for Chicago homes.
            </p>
            <motion.div className="mt-8 flex flex-wrap gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <a href="#assessment" className="inline-flex items-center gap-2 bg-sky-500 text-white font-semibold px-7 py-3.5 rounded-lg hover:bg-sky-600 transition-all shadow-lg shadow-sky-200 text-base">
                Book an Assessment <Icon name="arrow" className="w-4 h-4" />
              </a>
              <a href="#problems" className="inline-flex items-center gap-2 border-2 border-sky-200 text-sky-700 font-semibold px-7 py-3.5 rounded-lg hover:bg-sky-50 transition-all text-base">
                See Common Problems
              </a>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              className="mt-8 flex items-center gap-6 text-sm text-slate-400">
              {[{ label: 'Years Experience', value: siteInfo.yearsExperience + '+ yrs' }, { label: 'Homes Serviced', value: siteInfo.homesServiced + '+' }, { label: 'Satisfaction', value: siteInfo.satisfaction }].map(s => (
                <div key={s.label} className="text-center">
                  <div className="font-bold text-sky-600">{s.value}</div>
                  <div className="text-xs">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problems & Solutions Grid */}
      <section id="problems" className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <h2 className="section-title">Problems & Solutions</h2>
            <p className="section-subtitle">Every indoor air quality issue has a proven solution. Find yours below.</p>
          </motion.div>
          <div className="space-y-4 max-w-5xl mx-auto">
            {problems.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="grid md:grid-cols-2 gap-4 p-5 rounded-xl bg-clean-50 border border-sky-100 hover:bg-white hover:border-sky-200 hover:shadow-md transition-all group">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-400 shrink-0">
                    <Icon name={p.icon} className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 text-sm">{p.title}</h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{p.description}</p>
                  </div>
                </div>
                <div className="flex gap-3 md:border-l md:border-sky-100 md:pl-4">
                  <div className="w-10 h-10 rounded-lg bg-mint/10 flex items-center justify-center text-mint shrink-0">
                    <Icon name={solutions[i].icon} className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-mint-dark text-sm">{solutions[i].title}</h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{solutions[i].description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-20 sm:py-24 bg-sky-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <h2 className="section-title">All Solutions</h2>
            <p className="section-subtitle">Comprehensive indoor air quality products and services for every home.</p>
          </motion.div>
          <motion.div {...stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {solutions.map((s, i) => (
              <motion.div key={i} {...fadeUp}
                className="bg-white border border-sky-100 rounded-xl p-5 hover:border-sky-200 hover:shadow-lg transition-all hover:-translate-y-0.5 group">
                <div className="w-10 h-10 rounded-lg bg-mint/10 flex items-center justify-center text-mint group-hover:bg-mint/20 transition-all">
                  <Icon name={s.icon} className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-sky-800 mt-3 text-sm">{s.title}</h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{s.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Assessment Process */}
      <section id="assessment" className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <h2 className="section-title">How Assessment Works</h2>
            <p className="section-subtitle">A thorough, data-driven evaluation of your home's air quality in four steps.</p>
          </motion.div>
          <motion.div {...stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {assessmentSteps.map((step, i) => (
              <motion.div key={i} {...fadeUp}
                className="relative bg-clean-50 border border-sky-100 rounded-xl p-5 hover:bg-white hover:border-sky-200 hover:shadow-md transition-all group">
                <div className="text-3xl font-extrabold text-sky-200 group-hover:text-sky-300 transition-colors">{step.step}</div>
                <h3 className="font-semibold text-sky-800 mt-1 text-sm">{step.title}</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">{step.description}</p>
                <div className="mt-3 pt-3 border-t border-sky-100">
                  <p className="text-[11px] text-sky-500">{step.details}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Healthy Home System Diagram */}
      <section className="py-20 sm:py-24 bg-gradient-to-b from-sky-50 to-clean-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <h2 className="section-title">The Healthy Home System</h2>
            <p className="section-subtitle">Four layers of protection for truly clean indoor air.</p>
          </motion.div>
          <motion.div {...stagger} className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {systemLayers.map((layer, i) => (
              <motion.div key={i} {...fadeUp}
                className="bg-white border border-sky-100 rounded-xl p-5 hover:border-sky-200 hover:shadow-lg transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center text-sky-600 text-xs font-bold">{i + 1}</div>
                  <div>
                    <h3 className="font-semibold text-sky-800 text-sm">{layer.name}</h3>
                    <p className="text-[11px] text-slate-400">{layer.description}</p>
                  </div>
                </div>
                <ul className="space-y-1.5">
                  {layer.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-1.5 text-xs text-slate-500">
                      <Icon name="check" className="w-3 h-3 text-mint mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <h2 className="section-title">Our Products</h2>
            <p className="section-subtitle">Professional-grade air quality solutions for healthier indoor living.</p>
          </motion.div>
          <motion.div {...stagger} className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {products.map((p, i) => (
              <motion.div key={i} {...fadeUp}
                className="bg-clean-50 border border-sky-100 rounded-xl p-6 hover:bg-white hover:border-sky-200 hover:shadow-lg transition-all group">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-500">{p.category}</span>
                    <h3 className="font-semibold text-sky-800 text-sm mt-0.5">{p.name}</h3>
                  </div>
                  <div className="text-xs text-slate-400 bg-white border border-sky-100 px-2 py-1 rounded-md whitespace-nowrap">{p.coverage}</div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed mb-3">{p.description}</p>
                <ul className="space-y-1">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-1.5 text-xs text-slate-500">
                      <Icon name="check" className="w-3 h-3 text-mint mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section id="faq" className="py-20 sm:py-24 bg-sky-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Common questions about indoor air quality and our services.</p>
          </motion.div>
          <motion.div {...stagger} className="max-w-3xl mx-auto space-y-2">
            {faq.map((item, i) => (
              <motion.div key={i} {...fadeUp}
                className="bg-white border border-sky-100 rounded-xl overflow-hidden hover:border-sky-200 transition-all">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left cursor-pointer">
                  <span className="font-medium text-sky-800 text-sm pr-4">{item.question}</span>
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <Icon name="arrowDown" className="w-4 h-4 text-sky-400 shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
                      className="overflow-hidden">
                      <p className="px-4 pb-4 text-sm text-slate-500 leading-relaxed border-t border-sky-50 pt-3">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Assessment Form */}
      <section id="contact" className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
            <motion.div {...fadeUp}>
              <h2 className="text-3xl sm:text-4xl font-bold text-sky-800 mb-4">Book Your Air Quality Assessment</h2>
              <p className="text-slate-500 leading-relaxed mb-6">Our comprehensive assessment identifies every IAQ issue in your home and provides a clear action plan with prioritized solutions.</p>
              <div className="space-y-3">
                {['60-90 minute in-home visit', 'Real-time air quality readings', 'Written report within 48 hours', 'Personalized product recommendations', 'Follow-up testing to verify results'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                    <Icon name="check" className="w-4 h-4 text-mint shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-8 p-4 bg-sky-50 rounded-xl border border-sky-100">
                <p className="text-sm text-sky-700 font-medium">Or call us directly</p>
                <a href="tel:+17735550941" className="text-xl font-bold text-sky-600 hover:text-sky-700">{siteInfo.phone}</a>
              </div>
            </motion.div>
            <motion.div {...fadeUp} className="bg-clean-50 border border-sky-100 rounded-2xl p-6 shadow-sm">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">First Name</label>
                  <input type="text" placeholder="Jane"
                    className="w-full px-3 py-2.5 border border-sky-200 rounded-lg text-sm focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Last Name</label>
                  <input type="text" placeholder="Doe"
                    className="w-full px-3 py-2.5 border border-sky-200 rounded-lg text-sm focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Email</label>
                  <input type="email" placeholder="jane@example.com"
                    className="w-full px-3 py-2.5 border border-sky-200 rounded-lg text-sm focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Phone</label>
                  <input type="tel" placeholder="(773) 555-0941"
                    className="w-full px-3 py-2.5 border border-sky-200 rounded-lg text-sm focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all bg-white" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-600 mb-1">Primary Concern</label>
                  <select className="w-full px-3 py-2.5 border border-sky-200 rounded-lg text-sm focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all bg-white">
                    {['Excess Dust', 'Seasonal Allergies', 'Humidity Issues', 'Mold / Mildew', 'Persistent Odors', 'Poor Ventilation', 'General Assessment'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-600 mb-1">Home Square Footage</label>
                  <input type="text" placeholder="e.g. 2,500 sq ft"
                    className="w-full px-3 py-2.5 border border-sky-200 rounded-lg text-sm focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all bg-white" />
                </div>
              </div>
              <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-sky-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-sky-600 transition-all shadow-md text-sm cursor-pointer">
                Book Assessment <Icon name="arrow" className="w-4 h-4" />
              </motion.button>
              <p className="text-[10px] text-slate-400 text-center mt-2">Free assessment includes written report and recommendations.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-sky-600 to-sky-700 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl sm:text-4xl font-bold">Start breathing cleaner air today.</h2>
            <p className="mt-4 text-lg text-sky-100">Book your assessment and take the first step toward a healthier home.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a href="#contact" className="inline-flex items-center gap-2 bg-white text-sky-700 font-semibold px-7 py-3.5 rounded-lg hover:bg-sky-50 transition-all shadow-lg text-base">
                <Icon name="clipboard" className="w-4 h-4" /> Book Assessment
              </a>
              <a href="tel:+17735550941" className="inline-flex items-center gap-2 border-2 border-sky-300 text-sky-100 font-semibold px-7 py-3.5 rounded-lg hover:bg-white/10 transition-all text-base">
                <Icon name="phone" className="w-4 h-4" /> {siteInfo.phone}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sky-900 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:flex sm:justify-between sm:text-left">
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-sky-400 to-sky-500 flex items-center justify-center text-white font-bold text-xs">
                <Icon name="wind" className="w-3 h-3" />
              </div>
              <span className="font-bold text-lg text-white">PureAir Indoor Comfort</span>
            </div>
            <p className="text-sm text-sky-300/50 mt-2">Air Quality Assessments &bull; Purification &bull; Healthy Home Systems</p>
          </div>
          <div className="mt-6 sm:mt-0 space-y-1">
            <p className="text-sm text-sky-300/60">{siteInfo.address}</p>
            <p className="text-sm text-sky-300/60">Mon-Fri 7am-6pm | Sat 8am-2pm</p>
            <p className="text-sm font-semibold text-sky-300">{siteInfo.phone}</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-sky-800 text-center text-xs text-sky-300/30">
          &copy; {new Date().getFullYear()} PureAir Indoor Comfort. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
