import { useState } from 'react';
import { motion } from 'framer-motion';
import { efficiencyServices, upgradeSteps, smartFeatures, rebates, caseExamples, heroImage } from './data';

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };
const stagger = { initial: {}, whileInView: { transition: { staggerChildren: 0.08 } }, viewport: { once: true } };

function Icon({ name, className }: { name: string; className?: string }) {
  const cls = className || 'w-6 h-6';
  const icons: Record<string, React.ReactNode> = {
    snowflake: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M12 2l-3 3m3-3l3 3M12 22l-3-3m3 3l3-3M2 12h20M2 12l3 3M2 12l3-3M22 12l-3 3m3-3l-3-3M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" /></svg>,
    refresh: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
    smartphone: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
    wind: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" /></svg>,
    home: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
    clipboard: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
    leaf: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.5 9 6 13 6 17a6 6 0 0012 0c0-4-2.5-8-6-15z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 10v12" /></svg>,
    monitor: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    layout: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>,
    brain: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /><circle cx="12" cy="12" r="3" /></svg>,
    chart: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 17V9M8 17V5M18 17v-5M3 21h18" /></svg>,
    arrow: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>,
    check: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>,
    menu: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>,
    close: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>,
    dollar: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>,
    badge: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>,
    star: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>,
    calculator: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3v-6m-3 6v-3m-3 3V7m0 0a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V7z" /></svg>,
  };
  return icons[name] || <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><circle cx="12" cy="12" r="10" /></svg>;
}

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [calcInput, setCalcInput] = useState({ bill: '200', efficiency: '14', target: '20' });
  const savings = Math.round((1 - parseFloat(calcInput.target || '20') / parseFloat(calcInput.efficiency || '14')) * 100);
  const annualSaving = Math.round(parseFloat(calcInput.bill || '200') * 12 * (savings / 100));
  const safeSavings = isNaN(annualSaving) || annualSaving < 0 ? 0 : annualSaving;

  const MotionIcon = ({ name }: { name: string }) => (
    <motion.div initial={{ scale: 0, rotate: -180 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 200 }}
      className="w-10 h-10 rounded-xl bg-sage-100 flex items-center justify-center text-sage-700 shrink-0">
      <Icon name={name} className="w-5 h-5" />
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-white text-gray-700 antialiased overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-sage-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <motion.a href="#" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sage-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm">
              <Icon name="leaf" className="w-4 h-4" />
            </div>
            <span className="font-bold text-xl text-teal-700">EcoBreeze</span>
            <span className="hidden sm:inline text-sm text-sage-400 ml-1">Efficiency HVAC</span>
          </motion.a>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-500">
            {['Services', 'Upgrade', 'Savings', 'Cases'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-teal-600 transition-colors">{item}</a>
            ))}
            <a href="#calculator" className="inline-flex items-center gap-1.5 bg-gradient-to-r from-sage-600 to-teal-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-sage-700 hover:to-teal-700 transition-all text-sm shadow-sm">
              <Icon name="calculator" className="w-4 h-4" /> Calculate Savings
            </a>
          </nav>
          <button onClick={() => setNavOpen(!navOpen)} className="md:hidden p-2 text-gray-500">
            <Icon name={navOpen ? 'close' : 'menu'} className="w-6 h-6" />
          </button>
        </div>
        {navOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="md:hidden bg-white border-b border-sage-100 px-4 pb-4 space-y-3">
            {['Services', 'Upgrade', 'Savings', 'Cases'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="block text-gray-500 font-medium" onClick={() => setNavOpen(false)}>{item}</a>
            ))}
            <a href="#calculator" className="block bg-gradient-to-r from-sage-600 to-teal-600 text-white text-center py-2 rounded-lg font-semibold" onClick={() => setNavOpen(false)}>Calculate Savings</a>
          </motion.div>
        )}
      </header>

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-sage-50 via-white to-teal-50 text-gray-800 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: `url(${heroImage})` }} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-sage-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-teal-200/20 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-28 lg:py-32">
          <motion.div className="grid lg:grid-cols-2 gap-10 items-center" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-sage-100 text-sage-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                <Icon name="leaf" className="w-4 h-4" /> Energy-Efficient HVAC
              </motion.div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-teal-800">
                Lower energy bills{' '}
                <span className="text-sage-600">without giving up comfort.</span>
              </h1>
              <p className="mt-6 text-lg text-gray-500 max-w-xl leading-relaxed">
                High-efficiency HVAC systems that slash your energy use by 30-50%. Smart, sustainable comfort designed for your home.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#services" className="inline-flex items-center gap-2 bg-gradient-to-r from-sage-600 to-teal-600 text-white font-semibold px-7 py-3.5 rounded-lg hover:from-sage-700 hover:to-teal-700 transition-all shadow-md text-base">
                  Explore Solutions <Icon name="arrow" className="w-4 h-4" />
                </a>
                <a href="#calculator" className="inline-flex items-center gap-2 border-2 border-sage-300 text-sage-700 font-semibold px-7 py-3.5 rounded-lg hover:bg-sage-50 transition-all text-base">
                  <Icon name="calculator" className="w-4 h-4" /> Calculate Your Savings
                </a>
              </div>
            </div>
            {/* Savings Calculator */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
              className="bg-white/80 backdrop-blur border border-sage-100 rounded-2xl p-6 shadow-xl shadow-sage-100/50" id="calculator">
              <h3 className="text-lg font-bold text-teal-700 mb-4 flex items-center gap-2">
                <Icon name="calculator" className="w-5 h-5 text-sage-500" /> Savings Estimator
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Monthly Energy Bill ($)</label>
                  <input type="number" value={calcInput.bill} onChange={e => setCalcInput({ ...calcInput, bill: e.target.value })}
                    className="w-full px-3 py-2 border border-sage-200 rounded-lg text-sm focus:outline-none focus:border-sage-400 focus:ring-2 focus:ring-sage-100" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Current System SEER</label>
                  <input type="number" value={calcInput.efficiency} onChange={e => setCalcInput({ ...calcInput, efficiency: e.target.value })}
                    className="w-full px-3 py-2 border border-sage-200 rounded-lg text-sm focus:outline-none focus:border-sage-400 focus:ring-2 focus:ring-sage-100" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">New System SEER Target</label>
                  <input type="number" value={calcInput.target} onChange={e => setCalcInput({ ...calcInput, target: e.target.value })}
                    className="w-full px-3 py-2 border border-sage-200 rounded-lg text-sm focus:outline-none focus:border-sage-400 focus:ring-2 focus:ring-sage-100" />
                </div>
              </div>
              <motion.div key={safeSavings} initial={{ scale: 0.8 }} animate={{ scale: 1 }}
                className="mt-5 pt-4 border-t border-sage-100 text-center">
                <div className="text-3xl font-extrabold text-teal-600">${safeSavings.toLocaleString()}<span className="text-lg font-normal text-gray-400">/yr</span></div>
                <div className="text-sm text-gray-500 mt-1">Estimated annual savings</div>
                <div className="mt-2 inline-block bg-sage-100 text-sage-700 text-xs font-bold px-3 py-1 rounded-full">
                  Up to {isNaN(savings) || savings < 0 ? 0 : savings}% efficiency gain
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Efficiency Services */}
      <section id="services" className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <h2 className="section-title">Efficiency Services</h2>
            <p className="section-subtitle">Every solution designed to maximize your home's energy performance while keeping you comfortable.</p>
          </motion.div>
          <motion.div {...stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {efficiencyServices.map(s => (
              <motion.div key={s.id} {...fadeUp}
                className="group bg-white border border-sage-100 rounded-xl p-6 hover:border-sage-300 hover:shadow-xl hover:shadow-sage-50/50 transition-all duration-300 hover:-translate-y-1">
                <MotionIcon name={s.icon} />
                <h3 className="text-base font-semibold text-teal-700 mt-3">{s.title}</h3>
                <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Upgrade Process */}
      <section id="upgrade" className="py-20 sm:py-24 bg-gradient-to-b from-sage-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <h2 className="section-title">Your Upgrade Journey</h2>
            <p className="section-subtitle">From audit to optimization; a proven process for maximum efficiency gains.</p>
          </motion.div>
          <motion.div {...stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {upgradeSteps.map((step, i) => (
              <motion.div key={step.step} {...fadeUp} className="relative text-center group">
                <motion.div whileHover={{ scale: 1.1 }}
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sage-500 to-teal-600 flex items-center justify-center text-white font-bold text-lg mx-auto shadow-md">
                  {step.step}
                </motion.div>
                {i < upgradeSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-7 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-sage-300 to-transparent" />
                )}
                <h3 className="text-base font-semibold text-teal-700 mt-4">{step.title}</h3>
                <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Smart Features */}
      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <h2 className="section-title">Smart Comfort Features</h2>
            <p className="section-subtitle">Modern technology that learns, adapts, and optimizes your home's energy use automatically.</p>
          </motion.div>
          <motion.div {...stagger} className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {smartFeatures.map((f, i) => (
              <motion.div key={i} {...fadeUp}
                className="flex gap-4 bg-white border border-sage-100 rounded-xl p-5 hover:border-sage-300 hover:shadow-lg transition-all">
                <MotionIcon name={f.icon} />
                <div>
                  <h3 className="font-semibold text-teal-700">{f.title}</h3>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Rebates */}
      <section id="savings" className="py-20 sm:py-24 bg-teal-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3">Available Rebates</h2>
            <p className="text-teal-200 text-center max-w-xl mx-auto mb-12 text-lg">Stack these incentives to reduce your upfront cost by thousands.</p>
          </motion.div>
          <motion.div {...stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {rebates.map((r, i) => (
              <motion.div key={i} {...fadeUp}
                className="bg-white/10 backdrop-blur border border-teal-600/30 rounded-xl p-5 hover:bg-white/15 transition-all">
                <div className="flex items-center gap-2 text-sage-300 mb-3">
                  <Icon name="dollar" className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">{r.name}</span>
                </div>
                <div className="text-2xl font-extrabold text-sage-300 mb-2">{r.amount}</div>
                <p className="text-sm text-teal-200/70 leading-relaxed">{r.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Case Examples */}
      <section id="cases" className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <h2 className="section-title">Real Results</h2>
            <p className="section-subtitle">See how much our customers save after upgrading to high-efficiency systems.</p>
          </motion.div>
          <motion.div {...stagger} className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {caseExamples.map((c, i) => (
              <motion.div key={i} {...fadeUp}
                className="bg-white border border-sage-100 rounded-xl p-6 hover:border-sage-300 hover:shadow-xl transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-teal-700 text-base">{c.name}</h3>
                    <p className="text-xs text-gray-400">{c.location} &bull; Built {c.yearBuilt}</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-extrabold text-sage-600">{c.savings}</div>
                    <div className="text-[10px] font-bold uppercase text-sage-400 tracking-wider">Saved</div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{c.summary}</p>
                <div className="mt-4 flex gap-1">
                  {[1, 2, 3, 4, 5].map(s => <Icon key={s} name="star" className="w-4 h-4 text-amber-400" />)}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-sage-800 to-teal-800 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl sm:text-4xl font-bold">Ready to save on energy?</h2>
            <p className="mt-4 text-lg text-sage-200">Get a free energy assessment and custom efficiency plan for your home.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a href="#calculator" className="inline-flex items-center gap-2 bg-white text-teal-700 font-semibold px-7 py-3.5 rounded-lg hover:bg-sage-50 transition-all shadow-lg text-base">
                <Icon name="calculator" className="w-4 h-4" /> Estimate Your Savings
              </a>
              <a href="tel:+13035550123" className="inline-flex items-center gap-2 border-2 border-sage-400 text-sage-200 font-semibold px-7 py-3.5 rounded-lg hover:bg-white/10 transition-all text-base">
                (303) 555-0123
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-teal-900 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:flex sm:justify-between sm:text-left">
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-sage-400 to-teal-500 flex items-center justify-center text-white font-bold text-xs">
                <Icon name="leaf" className="w-3 h-3" />
              </div>
              <span className="font-bold text-lg text-white">EcoBreeze</span>
            </div>
            <p className="text-sm text-teal-300/50 mt-2">Energy-Efficient HVAC &bull; Serving Denver Metro</p>
          </div>
          <div className="mt-6 sm:mt-0 space-y-1">
            <p className="text-sm text-teal-300/60">789 Green Way, Denver, CO 80203</p>
            <p className="text-sm text-teal-300/60">Mon-Fri 7am-6pm | Sat 8am-4pm</p>
            <p className="text-sm font-semibold text-sage-400">(303) 555-0123</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-teal-800 text-center text-xs text-teal-300/30">
          &copy; {new Date().getFullYear()} EcoBreeze Efficiency HVAC. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
