import { useState, useEffect, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  siteInfo,
  services,
  quoteSteps,
  pricingTiers,
  reasons,
  neighborhoods,
  beforeAfterItems,
  navLinks,
  contactInfo,
  type ServiceItem,
  type PricingTier,
} from './data';

/* ── Utility components ── */

const CountUp: FC<{ end: number; suffix?: string }> = ({ end, suffix = '' }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const interval = setInterval(() => {
      start += Math.ceil(end / 40);
      if (start >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [end]);
  return <span>{count}{suffix}</span>;
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
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-16">
        <a href="#" className="font-heading text-xl text-green-600 flex items-center gap-2">
          <span className="text-2xl">\uD83C\uDF3F</span>
          {siteInfo.name}
        </a>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-charcoal-600 hover:text-green-600 transition-colors font-medium"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#quote"
            className="bg-green-500 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors"
          >
            Get a Quote
          </a>
        </nav>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-charcoal-700 text-2xl"
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
            className="md:hidden bg-white border-t overflow-hidden"
          >
            <div className="px-5 py-4 flex flex-col gap-3">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-charcoal-600 py-1"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#quote"
                onClick={() => setMobileOpen(false)}
                className="bg-green-500 text-white text-center px-5 py-2.5 rounded-lg text-sm font-semibold"
              >
                Get a Quote
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

/* ── Sections ── */

const HeroSection: FC = () => {
  const [zip, setZip] = useState('');
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-green-50 via-white to-green-100 pt-16">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-green-200/30 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-mint-200/30 blur-3xl" />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-5 w-full">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-5"
          >
            No contracts. Cancel anytime.
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl text-charcoal-800 leading-tight"
          >
            {siteInfo.tagline}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-charcoal-500 text-lg mt-4 max-w-lg leading-relaxed"
          >
            {siteInfo.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-8 flex flex-col sm:flex-row gap-3"
          >
            <div className="flex-1 max-w-xs flex gap-2">
              <input
                type="text"
                placeholder="Enter ZIP code"
                value={zip}
                onChange={(e) => setZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
                className="flex-1 border border-charcoal-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-green-400 transition-colors"
              />
              <a
                href={zip.length === 5 ? '#quote' : undefined}
                className="bg-green-500 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors whitespace-nowrap inline-flex items-center gap-2"
              >
                Check Availability \u2192
              </a>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-8 flex items-center gap-6 text-sm text-charcoal-400"
          >
            <span className="flex items-center gap-1.5">
              <span className="text-green-500">\u2713</span> Insured
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-green-500">\u2713</span> 5-star rated
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-green-500">\u2713</span> 30K+ visits
            </span>
          </motion.div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-charcoal-300 text-xl"
        >
          \u2193
        </motion.div>
      </motion.div>
    </section>
  );
};

const ServicesSection: FC = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="services" className="py-20 md:py-28 px-5">
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl text-charcoal-800">Services</h2>
          <p className="text-charcoal-400 mt-3 max-w-md mx-auto">
            Everything your yard needs, from a simple mow to a full seasonal cleanup.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s: ServiceItem) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4 }}
              onClick={() => setExpanded(expanded === s.id ? null : s.id)}
              className="bg-white border border-charcoal-100 rounded-xl p-5 cursor-pointer hover:border-green-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-heading text-lg text-charcoal-800">{s.title}</h3>
                <span className="text-green-600 font-bold text-lg">${s.priceFrom}+</span>
              </div>
              <p className="text-charcoal-400 text-sm leading-relaxed">{s.description}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-charcoal-300 bg-charcoal-50 px-2.5 py-1 rounded-full">{s.frequency}</span>
                <motion.span
                  animate={{ rotate: expanded === s.id ? 180 : 0 }}
                  className="text-green-500 text-lg"
                >
                  \u2193
                </motion.span>
              </div>
              <AnimatePresence>
                {expanded === s.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 mt-3 border-t border-charcoal-50 text-xs text-charcoal-400">
                      <div className="flex items-center gap-2">
                        <span className="text-green-500">\u2713</span> Starting at ${s.priceFrom}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-green-500">\u2713</span> {s.frequency}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-green-500">\u2713</span> Add to any plan
                      </div>
                      <button className="mt-3 text-green-600 text-sm font-semibold">Add to Quote \u2192</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const InstantQuoteSection: FC = () => {
  const [step, setStep] = useState(0);
  const [address, setAddress] = useState('');
  const [yardSize, setYardSize] = useState<'small' | 'medium' | 'large' | null>(null);
  const [frequency, setFrequency] = useState<'weekly' | 'biweekly' | 'onetime' | null>(null);

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
  };
  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const canProceed = () => {
    if (step === 0) return address.length > 5;
    if (step === 1) return yardSize !== null;
    if (step === 2) return frequency !== null;
    return false;
  };

  const getEstimate = () => {
    const base = yardSize === 'small' ? 35 : yardSize === 'medium' ? 49 : 75;
    const freq = frequency === 'weekly' ? 1 : frequency === 'biweekly' ? 1.5 : 2.5;
    return Math.round(base * freq);
  };

  const yardSizes = [
    { value: 'small' as const, label: 'Small', desc: '< 1/4 acre' },
    { value: 'medium' as const, label: 'Medium', desc: '1/4 - 1/2 acre' },
    { value: 'large' as const, label: 'Large', desc: '> 1/2 acre' },
  ];
  const freqOptions = [
    { value: 'weekly' as const, label: 'Weekly', desc: 'Best for pristine lawns' },
    { value: 'biweekly' as const, label: 'Biweekly', desc: 'Regular maintenance' },
    { value: 'onetime' as const, label: 'One-Time', desc: 'Single visit' },
  ];

  return (
    <section id="quote" className="py-20 md:py-28 px-5 bg-green-50/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-5 gap-10 items-start">
          <motion.div className="md:col-span-2 md:sticky md:top-24">
            <span className="text-green-500 text-xs font-semibold uppercase tracking-wider">Instant Quote</span>
            <h2 className="text-3xl md:text-4xl text-charcoal-800 mt-2">See Your Price in 30 Seconds</h2>
            <p className="text-charcoal-400 mt-3 text-sm leading-relaxed">
              Answer 3 quick questions. No account needed. No commitment.
            </p>
            <div className="mt-6 space-y-3">
              {quoteSteps.map((qs, i) => (
                <div
                  key={qs.step}
                  className={`flex items-center gap-3 text-sm ${
                    i === step ? 'text-green-600 font-semibold' : i < step ? 'text-green-400' : 'text-charcoal-300'
                  }`}
                >
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                      i === step
                        ? 'border-green-500 bg-green-50 text-green-600'
                        : i < step
                        ? 'border-green-300 bg-green-100 text-green-500'
                        : 'border-charcoal-200 text-charcoal-300'
                    }`}
                  >
                    {i < step ? '\u2713' : qs.step}
                  </span>
                  {qs.title}
                </div>
              ))}
            </div>
          </motion.div>
          <div className="md:col-span-3">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl border border-charcoal-100 p-8 shadow-sm"
            >
              <p className="text-charcoal-400 text-sm mb-6">{quoteSteps[step].prompt}</p>

              {step === 0 && (
                <div>
                  <label className="text-sm font-medium text-charcoal-700 mb-2 block">Street Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="123 Main St, San Diego, CA"
                    className="w-full border border-charcoal-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-green-400"
                  />
                </div>
              )}

              {step === 1 && (
                <div className="grid grid-cols-3 gap-3">
                  {yardSizes.map((ys) => (
                    <button
                      key={ys.value}
                      onClick={() => setYardSize(ys.value)}
                      className={`p-4 rounded-xl border-2 text-center transition-all ${
                        yardSize === ys.value
                          ? 'border-green-500 bg-green-50'
                          : 'border-charcoal-100 hover:border-charcoal-200'
                      }`}
                    >
                      <div className="text-lg mb-1">
                        {ys.value === 'small' ? '\uD83C\uDF3F' : ys.value === 'medium' ? '\uD83C\uDF31' : '\uD83C\uDF33'}
                      </div>
                      <div className="font-semibold text-sm text-charcoal-800">{ys.label}</div>
                      <div className="text-xs text-charcoal-400">{ys.desc}</div>
                    </button>
                  ))}
                </div>
              )}

              {step === 2 && (
                <div className="grid grid-cols-3 gap-3">
                  {freqOptions.map((f) => (
                    <button
                      key={f.value}
                      onClick={() => setFrequency(f.value)}
                      className={`p-4 rounded-xl border-2 text-center transition-all ${
                        frequency === f.value
                          ? 'border-green-500 bg-green-50'
                          : 'border-charcoal-100 hover:border-charcoal-200'
                      }`}
                    >
                      <div className="font-semibold text-sm text-charcoal-800 mb-1">{f.label}</div>
                      <div className="text-xs text-charcoal-400">{f.desc}</div>
                    </button>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between mt-8">
                <button
                  onClick={handleBack}
                  disabled={step === 0}
                  className="text-sm text-charcoal-400 disabled:opacity-30 hover:text-charcoal-600 transition-colors"
                >
                  \u2190 Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="bg-green-500 text-white px-6 py-2.5 rounded-lg text-sm font-semibold disabled:opacity-40 hover:bg-green-600 transition-colors"
                >
                  {step < 2 ? 'Next \u2192' : 'Get My Price \u2192'}
                </button>
              </div>

              {step === 2 && frequency && yardSize && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-green-50 rounded-xl border border-green-100"
                >
                  <p className="text-xs text-charcoal-400 mb-1">Estimated price</p>
                  <p className="text-2xl font-bold text-green-600">${getEstimate()}<span className="text-sm font-normal text-charcoal-400">/{frequency === 'onetime' ? 'visit' : 'visit'}</span></p>
                  <p className="text-xs text-charcoal-400 mt-1">Price may vary based on property assessment</p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PricingSection: FC = () => (
  <section id="pricing" className="py-20 md:py-28 px-5">
    <div className="max-w-6xl mx-auto">
      <motion.div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl text-charcoal-800">Simple Pricing</h2>
        <p className="text-charcoal-400 mt-3 max-w-md mx-auto">
          One price. No hidden fees. Cancel or skip anytime.
        </p>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
        {pricingTiers.map((tier: PricingTier, i: number) => (
          <motion.div
            key={tier.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-2xl p-6 border-2 relative ${
              tier.popular ? 'border-green-500 bg-green-50/30' : 'border-charcoal-100 bg-white'
            }`}
          >
            {tier.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-semibold px-4 py-1 rounded-full">
                Most Popular
              </span>
            )}
            <h3 className="font-heading text-xl text-charcoal-800 mb-1">{tier.label}</h3>
            <p className="text-charcoal-400 text-sm mb-4">{tier.description}</p>
            <p className="text-3xl font-bold text-charcoal-800 mb-4">{tier.price}</p>
            <ul className="space-y-2 mb-6">
              {tier.features.map((f: string) => (
                <li key={f} className="flex items-start gap-2 text-sm text-charcoal-600">
                  <span className="text-green-500 mt-0.5">\u2713</span>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#quote"
              className={`block text-center py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                tier.popular
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-charcoal-50 text-charcoal-700 hover:bg-charcoal-100'
              }`}
            >
              Get Started
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const WhyUsSection: FC = () => {
  const stats = [
    { label: 'Visits Completed', end: 32450 },
    { label: 'Happy Customers', end: 5840 },
    { label: 'Five-Star Reviews', end: 1220 },
    { label: 'Cities Served', end: 18 },
  ];

  return (
    <section id="why-us" className="py-20 md:py-28 px-5 bg-charcoal-800 text-white">
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl">Why YardCrew?</h2>
          <p className="text-charcoal-300 mt-3 max-w-md mx-auto">
            The lawn care experience you actually deserve.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((s) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-3xl md:text-4xl font-bold text-green-400">
                <CountUp end={s.end} suffix={s.label === 'Cities Served' ? '' : '+'} />
              </p>
              <p className="text-charcoal-300 text-sm mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <span className="text-3xl block mb-3">{r.icon}</span>
              <h3 className="font-heading text-lg mb-2">{r.title}</h3>
              <p className="text-charcoal-300 text-sm leading-relaxed">{r.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceAreasSection: FC = () => (
  <section id="areas" className="py-20 md:py-28 px-5">
    <div className="max-w-6xl mx-auto">
      <motion.div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl text-charcoal-800">Service Areas</h2>
        <p className="text-charcoal-400 mt-3 max-w-md mx-auto">
          We cover the greater San Diego metro area and expanding.
        </p>
      </motion.div>
      <div className="max-w-xl mx-auto">
        <div className="aspect-[16/9] bg-green-50 rounded-2xl border border-green-100 flex items-center justify-center mb-8">
          <div className="text-center">
            <span className="text-4xl">\uD83D\uDDFA\uFE0F</span>
            <p className="text-charcoal-400 text-sm mt-2">San Diego Metro Coverage</p>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {neighborhoods.map((n) => (
            <motion.span
              key={n.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white border border-charcoal-100 rounded-full px-4 py-2 text-sm text-charcoal-600 hover:border-green-300 hover:text-green-600 transition-colors"
            >
              {n.name}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const BeforeAfterSection: FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-20 md:py-28 px-5 bg-green-50/30">
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl text-charcoal-800">Before & After</h2>
          <p className="text-charcoal-400 mt-3 max-w-md mx-auto">
            Real results from real yards. Tap to see the transformation.
          </p>
        </motion.div>
        <div className="max-w-2xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-white border border-charcoal-100">
            <div className="aspect-[16/9] relative flex items-center justify-center" style={{ backgroundColor: beforeAfterItems[activeIndex].color + '15' }}>
              <span className="text-6xl opacity-30">\uD83C\uDF3F</span>
              <div className="absolute inset-0 flex">
                <div
                  className="w-1/2 h-full"
                  style={{ backgroundColor: beforeAfterItems[activeIndex].color + '25' }}
                >
                  <div className="flex items-center justify-center h-full">
                    <span className="text-4xl opacity-20">\uD83C\uDF3F</span>
                  </div>
                </div>
                <div className="w-1/2 h-full">
                  <div className="flex items-center justify-center h-full">
                    <span className="text-4xl">\u2705</span>
                  </div>
                </div>
              </div>
              <div className="absolute top-3 left-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-md">Before</div>
              <div className="absolute top-3 right-3 bg-green-600 text-white text-xs px-2.5 py-1 rounded-md">After</div>
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {beforeAfterItems.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setActiveIndex(i)}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  activeIndex === i ? 'bg-green-500 text-white' : 'bg-white border border-charcoal-100 text-charcoal-600'
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>
          <motion.p
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-charcoal-500 text-sm mt-4"
          >
            {beforeAfterItems[activeIndex].description}
          </motion.p>
        </div>
      </div>
    </section>
  );
};

const CtaSection: FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-20 md:py-28 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-xl mx-auto text-center">
          <motion.div>
            <span className="text-green-500 text-xs font-semibold uppercase tracking-wider">Get Started</span>
            <h2 className="text-3xl md:text-4xl text-charcoal-800 mt-2">Ready for a Better Lawn?</h2>
            <p className="text-charcoal-400 mt-3 mb-8">
              Sign up in 2 minutes. First visit as soon as tomorrow.
            </p>
          </motion.div>
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50 rounded-2xl p-8 border border-green-100"
            >
              <span className="text-4xl block mb-3">\uD83C\uDF3F</span>
              <h3 className="font-heading text-xl text-charcoal-800 mb-2">You are In!</h3>
              <p className="text-charcoal-400 text-sm">We will text you within the hour to confirm your first visit.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                required
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-charcoal-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-green-400"
              />
              <input
                required
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-charcoal-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-green-400"
              />
              <input
                required
                type="tel"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-charcoal-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-green-400"
              />
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="w-full bg-green-500 text-white py-3 rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors"
              >
                Get My Free Quote
              </motion.button>
              <p className="text-xs text-charcoal-300">No commitment. Cancel anytime.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const Footer: FC = () => (
  <footer className="bg-charcoal-800 text-charcoal-300 py-12 px-5">
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div>
          <h4 className="text-white font-heading text-lg mb-2 flex items-center gap-2">
            <span className="text-green-400">\uD83C\uDF3F</span> {siteInfo.name}
          </h4>
          <p className="text-charcoal-400 text-sm leading-relaxed">{siteInfo.description}</p>
        </div>
        <div>
          <h4 className="text-white font-heading mb-3">Contact</h4>
          <p className="text-charcoal-400 text-sm">{contactInfo.phone}</p>
          <p className="text-charcoal-400 text-sm">{contactInfo.email}</p>
        </div>
        <div>
          <h4 className="text-white font-heading mb-3">Quick Links</h4>
          <div className="flex flex-col gap-1.5 text-sm">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-charcoal-400 hover:text-white transition-colors">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-charcoal-700 pt-6 text-center text-xs text-charcoal-500">
        &copy; {new Date().getFullYear()} {siteInfo.name}. All rights reserved.
      </div>
    </div>
  </footer>
);

/* ── Main App ── */

const App: FC = () => (
  <div className="font-body text-charcoal-700 antialiased">
    <NavBar />
    <main>
      <HeroSection />
      <ServicesSection />
      <InstantQuoteSection />
      <PricingSection />
      <WhyUsSection />
      <ServiceAreasSection />
      <BeforeAfterSection />
      <CtaSection />
    </main>
    <Footer />
  </div>
);

export default App;
