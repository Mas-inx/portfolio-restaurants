import { useState } from 'react';
import { motion } from 'framer-motion';
import { emergencyIssues, dispatchSteps, safetyChecklist, truckEquipment, pricing, coverageCities, heroImage } from './data';

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };
const fadeLeft = { initial: { opacity: 0, x: -30 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };
const stagger = { initial: {}, whileInView: { transition: { staggerChildren: 0.08 } }, viewport: { once: true } };

function Icon({ name, className }: { name: string; className?: string }) {
  const cls = className || 'w-6 h-6';
  const icons: Record<string, React.ReactNode> = {
    phone: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8 9a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>,
    clock: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>,
    thermometer: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z" /></svg>,
    flame: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.5 6 6 9 6 13c0 3.3 2.7 6 6 6s6-2.7 6-6c0-4-2.5-7-6-11zm0 0v0" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 18c1.7 0 3-1.3 3-3 0-1.7-1.3-3-3-3s-3 1.3-3 3c0 1.7 1.3 3 3 3z" /></svg>,
    droplet: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 2c-3 5-7 9.5-7 14a7 7 0 0014 0c0-4.5-4-9-7-14z" /></svg>,
    alert: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86l-8.1 14c-.6 1.04.15 2.14 1.21 2.14h17.2c1.06 0 1.81-1.1 1.21-2.14l-8.1-14c-.6-1.04-1.82-1.04-2.42 0z" /></svg>,
    snowflake: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M12 2l-3 3m3-3l3 3M12 22l-3-3m3 3l3-3M2 12h20M2 12l3 3M2 12l3-3M22 12l-3 3m3-3l-3-3M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" /></svg>,
    power: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    check: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>,
    arrow: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>,
    truck: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14 18V6a2 2 0 00-2-2H4a2 2 0 00-2 2v11a1 1 0 001 1h2" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 18V9l4 4v5" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></svg>,
    menu: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>,
    close: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>,
    map: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>,
    shield: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
  };
  return icons[name] || <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><circle cx="12" cy="12" r="10" /></svg>;
}

const urgencyColor: Record<string, string> = {
  Emergency: 'bg-warning/20 text-warning-light',
  Critical: 'bg-ember-500/20 text-ember-300',
  High: 'bg-ember-400/10 text-ember-400',
};

export default function App() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-charcoal-950 text-gray-200 antialiased overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-charcoal-900/95 backdrop-blur border-b border-charcoal-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <motion.a href="#" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-ember-500 flex items-center justify-center text-white font-bold text-sm">HE</div>
            <span className="font-bold text-xl text-white">
              HeatWave <span className="text-ember-400">Emergency</span>
            </span>
          </motion.a>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
            {['Services', 'Dispatch', 'Safety', 'Pricing'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-ember-400 transition-colors">{item}</a>
            ))}
            <a href="tel:+13035550123" className="inline-flex items-center gap-1.5 bg-ember-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-ember-600 transition-all text-sm">
              <Icon name="phone" className="w-4 h-4" /> Call Now
            </a>
          </nav>
          <button onClick={() => setNavOpen(!navOpen)} className="md:hidden p-2 text-gray-400">
            <Icon name={navOpen ? 'close' : 'menu'} className="w-6 h-6" />
          </button>
        </div>
        {navOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="md:hidden bg-charcoal-900 border-b border-charcoal-700 px-4 pb-4 space-y-3">
            {['Services', 'Dispatch', 'Safety', 'Pricing'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="block text-gray-400 font-medium" onClick={() => setNavOpen(false)}>{item}</a>
            ))}
            <a href="tel:+13035550123" className="block bg-ember-500 text-white text-center py-2 rounded-lg font-bold" onClick={() => setNavOpen(false)}>Call Now</a>
          </motion.div>
        )}
      </header>

      {/* Hero */}
      <section className="relative bg-charcoal-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/95 via-charcoal-900/90 to-charcoal-800/80" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-ember-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-ember-500 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-36">
          <motion.div className="max-w-3xl" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 bg-warning/20 border border-warning/30 backdrop-blur px-4 py-2 rounded-full text-sm text-warning-light mb-6">
              <span className="w-2 h-2 rounded-full bg-warning animate-pulse" />
              24/7 Emergency Service; 60-Min Response
            </motion.div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              No heat? No AC?{' '}
              <span className="text-ember-400">We dispatch now.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl leading-relaxed">
              Fast emergency HVAC repair when you need it most. Real people answer. Trucks roll within 60 minutes. Most repairs done in under 2 hours.
            </p>
            <motion.div className="mt-8 flex flex-wrap gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <a href="tel:+13035550123" className="inline-flex items-center gap-2 bg-ember-500 text-white font-bold px-8 py-4 rounded-lg hover:bg-ember-600 transition-all shadow-xl shadow-ember-500/30 text-lg hover:scale-105">
                <Icon name="phone" className="w-5 h-5" /> (303) 555-0123
              </a>
              <div className="inline-flex items-center gap-2 border-2 border-charcoal-500 text-gray-300 font-semibold px-5 py-3 rounded-lg text-sm">
                <Icon name="clock" className="w-4 h-4 text-ember-400" />
                Avg response: 38 min
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Emergency Services */}
      <section id="services" className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <h2 className="section-title">Emergency Services</h2>
            <p className="section-subtitle">We handle every HVAC emergency. Call now and we'll dispatch a fully-stocked truck to your location.</p>
          </motion.div>
          <motion.div {...stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {emergencyIssues.map(issue => (
              <motion.div key={issue.id} {...fadeUp}
                className="group bg-charcoal-800/50 border border-charcoal-700 rounded-xl p-5 hover:border-ember-500/30 hover:bg-charcoal-800/80 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-lg bg-charcoal-700 flex items-center justify-center text-ember-400 group-hover:bg-ember-500/20 transition-all">
                    <Icon name={issue.icon} className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${urgencyColor[issue.urgency] || ''}`}>
                    {issue.urgency}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white mt-3">{issue.title}</h3>
                <p className="text-sm text-gray-400 mt-1.5 leading-relaxed">{issue.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Dispatch Flow */}
      <section id="dispatch" className="py-20 sm:py-24 bg-charcoal-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <h2 className="section-title">How Dispatch Works</h2>
            <p className="section-subtitle">From your call to repair complete; our streamlined process gets you back to comfort fast.</p>
          </motion.div>
          <motion.div {...stagger} className="grid md:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {dispatchSteps.map((step, i) => (
              <motion.div key={step.step} {...fadeUp} className="relative text-center group">
                <motion.div whileHover={{ scale: 1.1 }}
                  className="w-14 h-14 rounded-full bg-ember-500/20 border-2 border-ember-500/40 flex items-center justify-center text-ember-400 font-bold text-lg mx-auto">
                  {step.step}
                </motion.div>
                {i < dispatchSteps.length - 1 && (
                  <div className="hidden md:block absolute top-7 left-[60%] w-[80%] h-0.5 border-t-2 border-dashed border-charcoal-600" />
                )}
                <h3 className="text-sm font-bold text-white mt-3">{step.title}</h3>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Safety Checklist */}
      <section id="safety" className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
            <motion.div {...fadeLeft}>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Safety Checklist</h2>
              <p className="text-gray-400 leading-relaxed mb-6">While waiting for our technician, follow these steps to ensure your safety and help us diagnose the issue faster.</p>
              <ul className="space-y-3">
                {safetyChecklist.map((item, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3 text-sm text-gray-300">
                    <span className="w-5 h-5 rounded-full bg-ember-500/20 text-ember-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div {...fadeUp} className="bg-charcoal-800/50 border border-charcoal-700 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Icon name="shield" className="w-5 h-5 text-ember-400" />
                <span className="text-white font-semibold text-sm">When you call us</span>
              </div>
              <div className="space-y-3">
                {['We stay on the phone until the tech arrives', 'Free phone diagnosis while you wait', 'Text updates with your tech ETA and photo', 'No overtime charges; ever'].map((tip, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-gray-400">
                    <Icon name="check" className="w-4 h-4 text-ember-400 mt-0.5 shrink-0" />
                    {tip}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stocked Trucks */}
      <section className="py-20 sm:py-24 bg-charcoal-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <h2 className="section-title">Our Trucks Are Stocked</h2>
            <p className="section-subtitle">We carry 95% of common parts so most repairs are completed in a single visit; no waiting for parts.</p>
          </motion.div>
          <motion.div {...stagger} className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {truckEquipment.map((item, i) => (
              <motion.div key={i} {...fadeUp}
                className="flex items-center gap-2 bg-charcoal-800/50 border border-charcoal-700 rounded-lg px-4 py-3 hover:border-ember-500/20 transition-all">
                <Icon name="truck" className="w-4 h-4 text-ember-400 shrink-0" />
                <span className="text-sm text-gray-300">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <h2 className="section-title">Transparent Pricing</h2>
            <p className="section-subtitle">No hidden fees. Know exactly what you'll pay before we start any work.</p>
          </motion.div>
          <motion.div {...stagger} className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { label: 'Diagnostic Fee', price: `$${pricing.diagnosticFee}`, desc: 'Waived if you choose us for the repair', highlight: false },
              { label: 'After-Hours Fee', price: `$${pricing.afterHoursFee}`, desc: '8pm to 7am, weekends, and holidays', highlight: false },
              { label: 'Emergency Trip', price: `$${pricing.emergencyTripFee}`, desc: 'Includes diagnostic; priority dispatch', highlight: true },
            ].map((p, i) => (
              <motion.div key={i} {...fadeUp}
                className={`rounded-xl p-6 border transition-all ${p.highlight ? 'bg-ember-500/10 border-ember-500/40' : 'bg-charcoal-800/50 border-charcoal-700 hover:border-ember-500/20'}`}>
                <div className="text-sm text-gray-400 font-medium">{p.label}</div>
                <div className={`text-3xl font-extrabold mt-1 ${p.highlight ? 'text-ember-400' : 'text-white'}`}>{p.price}</div>
                <div className="text-xs text-gray-500 mt-2">{p.desc}</div>
              </motion.div>
            ))}
          </motion.div>
          <motion.p {...fadeUp} className="text-center text-sm text-gray-500 mt-6 max-w-xl mx-auto">{pricing.note}</motion.p>
        </div>
      </section>

      {/* Coverage Map */}
      <section className="py-20 sm:py-24 bg-charcoal-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <h2 className="section-title">Coverage Area</h2>
            <p className="section-subtitle">We dispatch to all Denver metro area; 15 cities covered with 60-minute average response.</p>
          </motion.div>
          <motion.div {...stagger} className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto mb-10">
            {coverageCities.map(c => (
              <motion.span key={c} {...fadeUp}
                className="inline-block bg-charcoal-800 border border-charcoal-700 text-gray-300 px-3 py-1.5 rounded-full text-sm hover:bg-ember-500/20 hover:border-ember-500/30 hover:text-white transition-all cursor-default">
                {c}
              </motion.span>
            ))}
          </motion.div>
          <motion.div {...fadeUp}
            className="relative bg-gradient-to-br from-charcoal-800 to-charcoal-900 border border-charcoal-700 rounded-2xl h-64 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <svg className="w-full h-full" viewBox="0 0 800 250"><circle cx="400" cy="125" r="80" fill="none" stroke="#f97316" strokeWidth="1" /><circle cx="400" cy="125" r="50" fill="none" stroke="#f97316" strokeWidth="0.5" strokeDasharray="4 4" /></svg>
            </div>
            <div className="relative text-center">
              <Icon name="map" className="w-10 h-10 mx-auto mb-2 text-ember-400/50" />
              <p className="text-gray-400 font-medium">Denver Metro Coverage</p>
              <p className="text-xs text-gray-600 mt-1">15 cities; 60-min average response</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-charcoal-900 to-charcoal-950 text-white text-center border-t border-charcoal-700">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl sm:text-4xl font-extrabold">HVAC emergency? We're here now.</h2>
            <p className="mt-4 text-lg text-gray-400">Don't wait; call our 24/7 dispatch center. A real person answers; a truck rolls.</p>
            <motion.a href="tel:+13035550123" whileHover={{ scale: 1.05 }}
              className="mt-8 inline-flex items-center gap-3 bg-ember-500 text-white font-bold px-10 py-5 rounded-xl hover:bg-ember-600 transition-all shadow-2xl shadow-ember-500/30 text-xl">
              <Icon name="phone" className="w-6 h-6" /> (303) 555-0123
            </motion.a>
            <p className="text-xs text-gray-600 mt-4">Available 24/7/365; we never close</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal-950 border-t border-charcoal-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:flex sm:justify-between sm:text-left">
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <div className="w-7 h-7 rounded-lg bg-ember-500 flex items-center justify-center text-white font-bold text-xs">HE</div>
              <span className="font-bold text-lg text-white">HeatWave Emergency</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">24/7 HVAC Emergency Service &bull; Licensed &bull; Insured</p>
          </div>
          <div className="mt-6 sm:mt-0 space-y-1">
            <p className="text-sm text-gray-500">456 Dispatch Ave, Denver, CO 80204</p>
            <p className="text-sm text-gray-500">Open 24/7/365; never closed</p>
            <p className="text-sm font-bold text-ember-400">(303) 555-0123</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-charcoal-800 text-center text-xs text-gray-600">
          &copy; {new Date().getFullYear()} HeatWave Emergency HVAC. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
