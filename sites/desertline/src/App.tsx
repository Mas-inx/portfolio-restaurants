import { useState, useEffect, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  siteInfo,
  services,
  benefits,
  plants,
  caseStudies,
  navLinks,
  contactInfo,
  type ServiceItem,
  type PlantItem,
  type CaseStudy,
} from './data';

/* ── Water Savings Calculator ── */

interface CalcState {
  lawnArea: number;
  currentWater: number;
}

const WaterCalculator: FC = () => {
  const [calc, setCalc] = useState<CalcState>({ lawnArea: 1000, currentWater: 50 });
  const savingsFactor = 0.65;
  const waterAfter = Math.round(calc.currentWater * (1 - savingsFactor));
  const gallonsSaved = Math.round(calc.lawnArea * calc.currentWater * 0.623 * savingsFactor / 12);

  return (
    <div className="bg-white rounded-2xl border border-sand-200 p-6 md:p-8 shadow-sm">
      <h3 className="font-heading text-xl text-olive-600 mb-6">Estimate Your Savings</h3>
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-charcoal-600">Lawn Area (sq ft)</span>
            <span className="font-bold text-olive-600">{calc.lawnArea} ft&sup2;</span>
          </div>
          <input
            type="range"
            min={200}
            max={10000}
            step={100}
            value={calc.lawnArea}
            onChange={(e) => setCalc({ ...calc, lawnArea: Number(e.target.value) })}
            className="w-full h-2 rounded-full appearance-none cursor-pointer"
            style={{ accentColor: '#6a8148', background: '#e4e9d9' }}
          />
          <div className="flex justify-between text-xs text-sand-400 mt-1">
            <span>200 ft&sup2;</span>
            <span>10,000 ft&sup2;</span>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-charcoal-600">Current Water Use (inches/week)</span>
            <span className="font-bold text-olive-600">{calc.currentWater} in/wk</span>
          </div>
          <input
            type="range"
            min={10}
            max={80}
            step={5}
            value={calc.currentWater}
            onChange={(e) => setCalc({ ...calc, currentWater: Number(e.target.value) })}
            className="w-full h-2 rounded-full appearance-none cursor-pointer"
            style={{ accentColor: '#6a8148', background: '#e4e9d9' }}
          />
          <div className="flex justify-between text-xs text-sand-400 mt-1">
            <span>0.5 in/wk</span>
            <span>4.0 in/wk</span>
          </div>
        </div>
      </div>
      <motion.div
        key={`${calc.lawnArea}-${calc.currentWater}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 p-5 bg-olive-50 rounded-xl border border-olive-100"
      >
        <p className="text-xs text-olive-500 uppercase tracking-wider font-semibold mb-1">Estimated Annual Savings</p>
        <p className="text-2xl font-bold text-olive-700">{gallonsSaved.toLocaleString()} gallons</p>
        <p className="text-sm text-olive-500 mt-1">
          After converting to a low-water landscape, your water use drops from <strong>{calc.currentWater} in/wk</strong> to an estimated <strong>{waterAfter} in/wk</strong>.
        </p>
      </motion.div>
    </div>
  );
};

/* ── Navigation ── */

const NavBar: FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-sand-50/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between h-16 md:h-20">
        <a href="#" className="font-heading text-xl text-olive-600 tracking-tight flex items-center gap-2">
          <span className="text-2xl">\uD83C\uDF35</span>
          {siteInfo.name}
        </a>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-sand-700 hover:text-olive-600 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-olive-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-olive-600 transition-colors"
          >
            Start Saving Water
          </a>
        </nav>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-olive-700 text-2xl"
          aria-label="Menu"
        >
          {mobileOpen ? '\u2715' : '\u2630'}
        </button>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-sand-50 border-t border-sand-200 overflow-hidden"
          >
            <div className="px-5 py-5 flex flex-col gap-3">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-sand-700 py-1"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="bg-olive-500 text-white text-center px-5 py-2.5 rounded-lg text-sm font-semibold"
              >
                Start Saving Water
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

/* ── Section: Hero ── */

const HeroSection: FC = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-sand-100 via-sand-50 to-olive-50" />
    <div className="absolute inset-0 opacity-30 bg-topo" />
    <motion.div
      className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-olive-500/5 to-transparent"
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 6, repeat: Infinity }}
    />
    <div className="relative z-10 max-w-7xl mx-auto px-5 w-full">
      <div className="max-w-2xl">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-olive-100 text-olive-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-5"
        >
          <span className="w-2 h-2 rounded-full bg-olive-500" />
          Save up to 70% on outdoor water use
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-tight"
        >
          {siteInfo.tagline}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-sand-600 text-lg mt-4 max-w-lg leading-relaxed"
        >
          {siteInfo.description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <a
            href="#calculator"
            className="bg-olive-500 text-white px-7 py-3 rounded-lg text-sm font-semibold hover:bg-olive-600 transition-colors"
          >
            Calculate Your Savings
          </a>
          <a
            href="#services"
            className="border border-sand-300 text-sand-700 px-7 py-3 rounded-lg text-sm font-semibold hover:bg-sand-100 transition-colors"
          >
            Our Services
          </a>
        </motion.div>
      </div>
    </div>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2"
    >
      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-sand-400 text-xl"
      >
        \u2193
      </motion.div>
    </motion.div>
  </section>
);

/* ── Section: Benefits / Why Low-Water ── */

const BenefitsSection: FC = () => (
  <section id="benefits" className="py-20 md:py-28 px-5">
    <div className="max-w-7xl mx-auto">
      <motion.div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl text-gray-900">Why Low-Water Landscaping?</h2>
        <p className="text-sand-500 mt-3 max-w-lg mx-auto">
          The practical, financial, and environmental case for ditching the turf lawn.
        </p>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {benefits.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl p-6 border border-sand-200 hover:border-olive-300 transition-colors"
          >
            <span className="text-3xl block mb-3">{b.icon}</span>
            <h3 className="font-heading text-lg text-gray-800 mb-2">{b.title}</h3>
            <p className="text-sand-500 text-sm leading-relaxed">{b.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ── Section: Services ── */

const ServicesSection: FC = () => (
  <section id="services" className="py-20 md:py-28 px-5 bg-sand-100/50">
    <div className="max-w-7xl mx-auto">
      <motion.div className="text-center mb-14">
        <span className="text-olive-500 text-xs uppercase tracking-[0.25em] font-semibold">What We Do</span>
        <h2 className="text-3xl md:text-4xl text-gray-900 mt-2">Services</h2>
        <p className="text-sand-500 mt-3 max-w-lg mx-auto">
          Every service is designed to reduce water use without compromising beauty.
        </p>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((s: ServiceItem, i: number) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: i * 0.08 }}
            className="bg-white rounded-xl p-6 border border-sand-200 hover:border-olive-300 transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-heading text-lg text-gray-800 group-hover:text-olive-600 transition-colors">{s.title}</h3>
              {s.waterSave !== 'N/A' && (
                <span className="bg-olive-50 text-olive-600 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">
                  Save {s.waterSave}
                </span>
              )}
            </div>
            <p className="text-sand-500 text-sm leading-relaxed">{s.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ── Section: Water Savings Calculator ── */

const CalculatorSection: FC = () => (
  <section id="calculator" className="py-20 md:py-28 px-5">
    <div className="max-w-4xl mx-auto">
      <motion.div className="text-center mb-14">
        <span className="text-olive-500 text-xs uppercase tracking-[0.25em] font-semibold">Interactive Tool</span>
        <h2 className="text-3xl md:text-4xl text-gray-900 mt-2">Water Savings Calculator</h2>
        <p className="text-sand-500 mt-3 max-w-lg mx-auto">
          See how many gallons you could save by switching to a low-water landscape.
        </p>
      </motion.div>
      <WaterCalculator />
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-center text-sand-400 text-xs mt-4"
      >
        * Estimates based on average evapotranspiration rates and typical residential irrigation schedules. Actual savings vary.
      </motion.p>
    </div>
  </section>
);

/* ── Section: Plant Library ── */

const PlantLibrarySection: FC = () => {
  const [filter, setFilter] = useState<'all' | 'Full Sun' | 'Partial Shade' | 'Shade'>('all');
  const filtered = filter === 'all' ? plants : plants.filter((p) => p.sun === filter);
  const filters = ['all', 'Full Sun', 'Partial Shade', 'Shade'] as const;

  return (
    <section id="plants" className="py-20 md:py-28 px-5 bg-sand-100/50">
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-10">
          <span className="text-olive-500 text-xs uppercase tracking-[0.25em] font-semibold">Botanical</span>
          <h2 className="text-3xl md:text-4xl text-gray-900 mt-2">Plant Library</h2>
          <p className="text-sand-500 mt-3 max-w-lg mx-auto">
            Native and adapted plants that thrive on less water.
          </p>
        </motion.div>
        <div className="flex justify-center gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === f ? 'bg-olive-500 text-white' : 'bg-white text-sand-600 border border-sand-200 hover:border-olive-300'
              }`}
            >
              {f === 'all' ? 'All Plants' : f}
            </button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p: PlantItem, i: number) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: (i % 6) * 0.05 }}
              className="bg-white rounded-xl p-5 border border-sand-200 hover:border-olive-300 transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-heading text-lg text-gray-800">{p.name}</h3>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  p.droughtTolerance === 'High' ? 'bg-olive-50 text-olive-600' : 'bg-sand-100 text-sand-500'
                }`}>
                  {p.droughtTolerance}
                </span>
              </div>
              <p className="text-sand-400 text-xs italic mb-2">{p.scientific}</p>
              <p className="text-sand-500 text-sm leading-relaxed">{p.description}</p>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs text-sand-400">{p.sun}</span>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── Section: Case Studies ── */

const CaseStudiesSection: FC = () => (
  <section id="cases" className="py-20 md:py-28 px-5">
    <div className="max-w-7xl mx-auto">
      <motion.div className="text-center mb-14">
        <span className="text-olive-500 text-xs uppercase tracking-[0.25em] font-semibold">Real Results</span>
        <h2 className="text-3xl md:text-4xl text-gray-900 mt-2">Case Studies</h2>
        <p className="text-sand-500 mt-3 max-w-lg mx-auto">
          Actual water savings from real properties we have transformed.
        </p>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-6">
        {caseStudies.map((cs: CaseStudy, i: number) => (
          <motion.div
            key={cs.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className="bg-white rounded-2xl border border-sand-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div
              className="aspect-[16/7] flex items-center justify-center"
              style={{ backgroundColor: cs.color + '20' }}
            >
              <div className="text-center">
                <span className="text-2xl block">\uD83C\uDF3F</span>
                <span className="text-xs text-sand-400 mt-1 block">{cs.location}</span>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-heading text-lg text-gray-800">{cs.title}</h3>
                <span className="bg-olive-50 text-olive-600 text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
                  {cs.waterSaved}
                </span>
              </div>
              <div className="mb-3">
                <span className="text-[10px] uppercase tracking-wider text-sand-400 font-semibold">Before</span>
                <p className="text-sand-500 text-xs mt-0.5">{cs.beforeDescription}</p>
              </div>
              <p className="text-sand-500 text-sm leading-relaxed">{cs.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ── Section: Rebate Support ── */

const RebateSection: FC = () => (
  <section className="py-20 md:py-28 px-5 bg-olive-500 text-white">
    <div className="max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="text-olive-200 text-xs uppercase tracking-[0.25em] font-semibold">Financial Support</span>
        <h2 className="text-3xl md:text-4xl mt-2">Rebate & Incentive Programs</h2>
        <p className="text-olive-100 mt-4 max-w-2xl mx-auto leading-relaxed">
          Many municipalities and water utilities offer rebates for turf removal, smart irrigation controllers, 
          and low-water landscape conversions. We help you navigate the paperwork, document the project, 
          and claim every dollar you are eligible for.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mt-10 grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto"
      >
        <div className="bg-white/10 rounded-xl p-5 border border-white/10">
          <p className="text-2xl font-bold">$0.50-$2</p>
          <p className="text-olive-200 text-sm">per sq ft turf replaced</p>
        </div>
        <div className="bg-white/10 rounded-xl p-5 border border-white/10">
          <p className="text-2xl font-bold">$75-$150</p>
          <p className="text-olive-200 text-sm">smart controller rebate</p>
        </div>
        <div className="bg-white/10 rounded-xl p-5 border border-white/10">
          <p className="text-2xl font-bold">Up to $3,000</p>
          <p className="text-olive-200 text-sm">max residential rebate</p>
        </div>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-olive-200 text-xs mt-6"
      >
        * Rebate amounts vary by city and utility district. We verify eligibility during your free consultation.
      </motion.p>
    </div>
  </section>
);

/* ── Section: Contact / Consultation ── */

const ContactSection: FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 md:py-28 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-5 gap-12 items-start">
          <motion.div className="md:col-span-2">
            <span className="text-olive-500 text-xs uppercase tracking-[0.25em] font-semibold">Free Consultation</span>
            <h2 className="text-3xl md:text-4xl text-gray-900 mt-2">Ready to Save Water?</h2>
            <p className="text-sand-500 mt-3 text-sm leading-relaxed">
              Tell us about your property and we will provide a free water-use analysis and low-water landscape proposal.
            </p>
            <div className="mt-6 space-y-3 text-sm text-sand-500">
              <p className="flex items-center gap-2">
                <span className="text-olive-500">\u260E</span> {contactInfo.phone}
              </p>
              <p className="flex items-center gap-2">
                <span className="text-olive-500">\u2709</span> {contactInfo.email}
              </p>
              <p className="flex items-center gap-2">
                <span className="text-olive-500">\u2302</span> {contactInfo.address}
              </p>
            </div>
          </motion.div>
          <div className="md:col-span-3">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-olive-50 rounded-2xl p-8 border border-olive-100"
              >
                <span className="text-4xl block mb-3">\uD83C\uDF3F</span>
                <h3 className="font-heading text-xl text-gray-800 mb-2">Consultation Request Received</h3>
                <p className="text-sand-500 text-sm">We will contact you within 48 hours to schedule your free property assessment and water-use analysis.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input required type="text" placeholder="Full name" className="w-full border border-sand-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-olive-400" />
                  <input required type="email" placeholder="Email address" className="w-full border border-sand-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-olive-400" />
                </div>
                <input required type="tel" placeholder="Phone number" className="w-full border border-sand-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-olive-400" />
                <input type="text" placeholder="Property address (city, state)" className="w-full border border-sand-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-olive-400" />
                <select className="w-full border border-sand-200 rounded-lg px-4 py-3 text-sm text-sand-500 focus:outline-none focus:border-olive-400">
                  <option value="">Approximate lawn size</option>
                  <option>Under 1,000 sq ft</option>
                  <option>1,000 - 3,000 sq ft</option>
                  <option>3,000 - 10,000 sq ft</option>
                  <option>Over 10,000 sq ft</option>
                  <option>Not sure</option>
                </select>
                <textarea rows={3} placeholder="Tell us about your goals..." className="w-full border border-sand-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-olive-400 resize-none" />
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  className="w-full bg-olive-500 text-white py-3 rounded-lg text-sm font-semibold hover:bg-olive-600 transition-colors"
                >
                  Request Free Consultation
                </motion.button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── Footer ── */

const Footer: FC = () => (
  <footer className="bg-gray-900 text-sand-400 py-14 px-5">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-4 gap-8 mb-10">
        <div className="md:col-span-2">
          <h4 className="font-heading text-xl text-white mb-3 flex items-center gap-2">
            <span>\uD83C\uDF35</span> {siteInfo.name}
          </h4>
          <p className="text-sand-500 text-sm leading-relaxed max-w-sm">{siteInfo.description}</p>
        </div>
        <div>
          <h4 className="font-heading text-white mb-3">Services</h4>
          <ul className="space-y-1.5 text-sm">
            {services.slice(0, 4).map((s) => (
              <li key={s.id} className="text-sand-400 hover:text-white transition-colors cursor-default">{s.title}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-heading text-white mb-3">Contact</h4>
          <p className="text-sm">{contactInfo.phone}</p>
          <p className="text-sm">{contactInfo.email}</p>
        </div>
      </div>
      <div className="border-t border-gray-700 pt-6 text-center text-xs text-sand-500">
        &copy; {new Date().getFullYear()} {siteInfo.name}. All rights reserved.
      </div>
    </div>
  </footer>
);

/* ── Main App ── */

const App: FC = () => (
  <div className="font-body text-gray-900 antialiased">
    <NavBar />
    <main>
      <HeroSection />
      <BenefitsSection />
      <ServicesSection />
      <CalculatorSection />
      <PlantLibrarySection />
      <CaseStudiesSection />
      <RebateSection />
      <ContactSection />
    </main>
    <Footer />
  </div>
);

export default App;
