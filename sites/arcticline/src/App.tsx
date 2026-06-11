import { useState } from 'react';
import { motion } from 'framer-motion';
import { services, maintenancePlans, replacementSteps, whyChooseUs, serviceAreas, heroImage } from './data';

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };
const stagger = { initial: {}, whileInView: { transition: { staggerChildren: 0.08 } }, viewport: { once: true } };

function Icon({ name, className }: { name: string; className?: string }) {
  const cls = className || 'w-6 h-6';
  const icons: Record<string, React.ReactNode> = {
    snowflake: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M12 2l-3 3m3-3l3 3M12 22l-3-3m3 3l3-3M2 12h20M2 12l3 3M2 12l3-3M22 12l-3 3m3-3l-3-3M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" /></svg>,
    flame: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.5 6 6 9 6 13c0 3.3 2.7 6 6 6s6-2.7 6-6c0-4-2.5-7-6-11zm0 0v0" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 18c1.7 0 3-1.3 3-3 0-1.7-1.3-3-3-3s-3 1.3-3 3c0 1.7 1.3 3 3 3z" /></svg>,
    gear: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg>,
    clipboard: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
    wind: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" /></svg>,
    smartphone: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
    shield: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
    dollar: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>,
    truck: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14 18V6a2 2 0 00-2-2H4a2 2 0 00-2 2v11a1 1 0 001 1h2" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 18V9l4 4v5" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></svg>,
    star: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>,
    clock: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>,
    arrow: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>,
    check: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>,
    menu: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>,
    close: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>,
    map: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>,
  };
  return icons[name] || <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><circle cx="12" cy="12" r="10" /></svg>;
}

export default function App() {
  const [navOpen, setNavOpen] = useState(false);

  const MotionIcon = ({ name }: { name: string }) => (
    <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 200 }}
      className="w-12 h-12 rounded-xl bg-fire/10 flex items-center justify-center text-fire shrink-0">
      <Icon name={name} className="w-6 h-6" />
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-white text-gray-800 antialiased overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <motion.a href="#" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-navy-700 flex items-center justify-center text-white font-bold text-sm">AL</div>
            <span className="font-bold text-xl text-navy-800">ArcticLine</span>
            <span className="hidden sm:inline text-sm text-gray-400 ml-1">HVAC</span>
          </motion.a>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            {['Services', 'Plans', 'Replacement', 'Why Us'].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="hover:text-navy-700 transition-colors">{item}</a>
            ))}
            <a href="#booking" className="inline-flex items-center gap-1 bg-fire text-white px-4 py-2 rounded-lg font-semibold hover:bg-fire-dark transition-colors text-sm">
              Book Now <Icon name="arrow" className="w-4 h-4" />
            </a>
          </nav>
          <button onClick={() => setNavOpen(!navOpen)} className="md:hidden p-2 text-gray-600">
            <Icon name={navOpen ? 'close' : 'menu'} className="w-6 h-6" />
          </button>
        </div>
        {navOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="md:hidden bg-white border-b border-gray-100 px-4 pb-4 space-y-3">
            {['Services', 'Plans', 'Replacement', 'Why Us'].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="block text-gray-600 font-medium" onClick={() => setNavOpen(false)}>{item}</a>
            ))}
            <a href="#booking" className="block bg-fire text-white text-center py-2 rounded-lg font-semibold" onClick={() => setNavOpen(false)}>Book Now</a>
          </motion.div>
        )}
      </header>

      {/* Hero */}
      <section className="relative bg-navy-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }} />
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900/90 via-navy-800/80 to-navy-700/90" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-fire/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-ice-300/5 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <motion.div className="max-w-3xl" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-1.5 rounded-full text-sm text-ice-100 mb-6">
              <span className="w-2 h-2 rounded-full bg-fire animate-pulse" />
              Residential HVAC Serving Denver Metro
            </motion.div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              Comfort fixed{' '}
              <span className="text-fire-light">fast</span>,{' '}
              installed{' '}
              <span className="text-ice-300">right</span>.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-ice-100/80 max-w-2xl leading-relaxed">
              From emergency repairs to complete system installations, ArcticLine delivers reliable HVAC service with upfront pricing and same-day availability.
            </p>
            <motion.div className="mt-8 flex flex-wrap gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <a href="#booking" className="inline-flex items-center gap-2 bg-fire text-white font-semibold px-7 py-3.5 rounded-lg hover:bg-fire-dark transition-all hover:shadow-lg hover:shadow-fire/30 text-base">
                Schedule Service <Icon name="arrow" className="w-4 h-4" />
              </a>
              <a href="#services" className="inline-flex items-center gap-2 border-2 border-ice-300 text-ice-200 font-semibold px-7 py-3.5 rounded-lg hover:bg-ice-300 hover:text-navy-900 transition-all text-base">
                Our Services
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <h2 className="section-title">Premium HVAC Services</h2>
            <p className="section-subtitle">From routine maintenance to emergency repairs, we handle every aspect of your home's comfort system.</p>
          </motion.div>
          <motion.div {...stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(s => (
              <motion.div key={s.id} {...fadeUp}
                className="group bg-white border border-gray-100 rounded-xl p-6 hover:border-ice-200 hover:shadow-xl hover:shadow-ice-50/50 transition-all duration-300 hover:-translate-y-1">
                <MotionIcon name={s.icon} />
                <h3 className="text-lg font-semibold text-navy-800 mt-4">{s.title}</h3>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Booking */}
      <section id="booking" className="py-20 sm:py-24 bg-ice-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <h2 className="section-title">Schedule Service</h2>
            <p className="section-subtitle">Book a visit at your convenience. Same-day service available for most repairs.</p>
          </motion.div>
          <motion.div {...fadeUp} className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-ice-100 p-6 sm:p-8">
              <div className="grid sm:grid-cols-2 gap-4">
                {[{ label: 'First Name', placeholder: 'John' }, { label: 'Last Name', placeholder: 'Doe' }].map(f => (
                  <div key={f.label}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                    <input type="text" placeholder={f.placeholder}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-ice-300 focus:ring-3 focus:ring-ice-100 transition-all" />
                  </div>
                ))}
                {[{ label: 'Email', type: 'email', placeholder: 'john@example.com' }, { label: 'Phone', type: 'tel', placeholder: '(303) 555-0123' }].map(f => (
                  <div key={f.label}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                    <input type={f.type} placeholder={f.placeholder}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-ice-300 focus:ring-3 focus:ring-ice-100 transition-all" />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Needed</label>
                  <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-ice-300 focus:ring-3 focus:ring-ice-100 transition-all bg-white">
                    {['AC Repair', 'Heating Repair', 'System Installation', 'Maintenance / Tune-Up', 'Indoor Air Quality', 'Thermostat Installation', 'Other'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                  <input type="date" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-ice-300 focus:ring-3 focus:ring-ice-100 transition-all" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message (optional)</label>
                  <textarea rows={3} placeholder="Describe your issue or special instructions..."
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-ice-300 focus:ring-3 focus:ring-ice-100 transition-all" />
                </div>
              </div>
              <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-fire text-white font-semibold px-7 py-3.5 rounded-lg hover:bg-fire-dark transition-all shadow-md text-base cursor-pointer">
                Book Appointment <Icon name="arrow" className="w-4 h-4" />
              </motion.button>
              <p className="text-xs text-gray-400 text-center mt-3">We'll confirm your appointment via text or email within 30 minutes.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Maintenance Plans */}
      <section id="plans" className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <h2 className="section-title">Maintenance Plans</h2>
            <p className="section-subtitle">Keep your system running efficiently year-round with a plan that fits your needs.</p>
          </motion.div>
          <motion.div {...stagger} className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {maintenancePlans.map((plan, i) => (
              <motion.div key={plan.tier} {...fadeUp}
                className={`relative bg-white border-2 rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${i === 1 ? 'border-navy-600 shadow-lg' : 'border-gray-100 hover:border-ice-300'}`}>
                {i === 1 && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-fire text-white text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full">Most Popular</div>
                )}
                <h3 className="text-xl font-bold text-navy-800 mt-2">{plan.tier}</h3>
                <div className="mt-4 mb-6">
                  <span className="text-5xl font-extrabold text-navy-800">${plan.price}</span>
                  <span className="text-gray-400 text-sm">/{plan.per}</span>
                </div>
                <ul className="space-y-2.5 text-left">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                      <Icon name="check" className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className={`mt-6 w-full inline-flex items-center justify-center gap-2 font-semibold px-5 py-3 rounded-lg transition-all cursor-pointer text-sm ${i === 1 ? 'bg-fire text-white hover:bg-fire-dark shadow-md' : 'bg-navy-700 text-white hover:bg-navy-600'}`}>
                  Choose {plan.tier}
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* System Replacement */}
      <section id="replacement" className="py-20 sm:py-24 bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <h2 className="section-title-light">System Replacement</h2>
            <p className="section-subtitle-light">A seamless process from consultation to a perfectly running new system.</p>
          </motion.div>
          <motion.div {...stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {replacementSteps.map(s => (
              <motion.div key={s.step} {...fadeUp} className="text-center group">
                <motion.div whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-14 h-14 rounded-full bg-fire flex items-center justify-center text-white font-bold text-xl mx-auto group-hover:shadow-lg group-hover:shadow-fire/30 transition-all">
                  {s.step}
                </motion.div>
                <h3 className="text-lg font-semibold mt-4 text-white">{s.title}</h3>
                <p className="text-sm text-ice-100/60 mt-2 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.div {...fadeUp} className="text-center mt-10">
            <a href="#booking" className="inline-flex items-center gap-2 bg-fire text-white font-semibold px-7 py-3.5 rounded-lg hover:bg-fire-dark transition-all shadow-lg shadow-fire/20 text-base">
              Start Your Free Consultation <Icon name="arrow" className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <h2 className="section-title">Why Choose ArcticLine?</h2>
            <p className="section-subtitle">We've built our reputation on quality work, honest pricing, and exceptional service.</p>
          </motion.div>
          <motion.div {...stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {whyChooseUs.map((w, i) => (
              <motion.div key={i} {...fadeUp}
                className="group bg-white border border-gray-100 rounded-xl p-6 hover:border-ice-200 hover:shadow-xl transition-all duration-300">
                <MotionIcon name={w.icon} />
                <h3 className="text-lg font-semibold text-navy-800 mt-4">{w.title}</h3>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">{w.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-20 sm:py-24 bg-ice-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <h2 className="section-title">Our Service Area</h2>
            <p className="section-subtitle">Proudly serving homes across the Denver metro area with fast, reliable service.</p>
          </motion.div>
          <motion.div {...stagger} className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto mb-10">
            {serviceAreas.map(a => (
              <motion.span key={a} {...fadeUp}
                className="inline-block bg-white text-navy-700 font-medium px-4 py-2 rounded-full text-sm border border-ice-100 hover:bg-navy-600 hover:text-white hover:border-navy-600 transition-all cursor-default shadow-sm">
                {a}
              </motion.span>
            ))}
          </motion.div>
          <motion.div {...fadeUp} className="relative bg-gradient-to-br from-ice-100 to-ice-300 rounded-2xl h-72 flex items-center justify-center text-navy-700 font-semibold overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 800 300" fill="none" stroke="currentColor" strokeWidth="0.5"><path d="M100 150 L200 80 L300 140 L400 60 L500 120 L600 50 L700 110" /><circle cx="400" cy="60" r="30" strokeWidth="1" /><circle cx="200" cy="80" r="20" strokeWidth="1" /><circle cx="600" cy="50" r="25" strokeWidth="1" /></svg>
            </div>
            <div className="relative text-center">
              <Icon name="map" className="w-10 h-10 mx-auto mb-3 opacity-50" />
              <span className="text-lg">Denver Metro Service Map</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-navy-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl sm:text-4xl font-extrabold">Ready for reliable comfort?</h2>
            <p className="mt-4 text-lg text-ice-100/70">Call us or book online; we'll have a technician at your door fast.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a href="#booking" className="inline-flex items-center gap-2 bg-fire text-white font-semibold px-7 py-3.5 rounded-lg hover:bg-fire-dark transition-all shadow-lg shadow-fire/20 text-base">
                Book Online <Icon name="arrow" className="w-4 h-4" />
              </a>
              <a href="tel:+13035550123" className="inline-flex items-center gap-2 border-2 border-ice-300 text-ice-200 font-semibold px-7 py-3.5 rounded-lg hover:bg-ice-300 hover:text-navy-900 transition-all text-base">
                (303) 555-0123
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-900 border-t border-navy-700 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:flex sm:justify-between sm:text-left">
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <div className="w-7 h-7 rounded-lg bg-ice-300 flex items-center justify-center text-navy-900 font-bold text-xs">AL</div>
              <span className="font-bold text-lg text-white">ArcticLine HVAC</span>
            </div>
            <p className="text-sm text-ice-100/50 mt-2">Licensed &bull; Insured &bull; NATE-Certified</p>
          </div>
          <div className="mt-6 sm:mt-0 space-y-1">
            <p className="text-sm text-ice-100/60">1234 Service Way, Denver, CO 80202</p>
            <p className="text-sm text-ice-100/60">Mon-Sat 7am-7pm | Emergency available</p>
            <p className="text-sm font-semibold text-ice-200">(303) 555-0123</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-navy-700 text-center text-xs text-ice-100/40">
          &copy; {new Date().getFullYear()} ArcticLine HVAC. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
