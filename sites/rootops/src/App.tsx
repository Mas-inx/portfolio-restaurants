import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  SITE,
  HERO,
  HOW_IT_WORKS,
  PLANS,
  DASHBOARD,
  SEASONAL,
  SERVICE_AREAS,
  BEFORE_AFTERS,
  QUOTE_WIDGET,
  CTA,
} from './data';

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add('visible');
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function useScrollDraw() {
  const ref = useRef<SVGSVGElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const start = windowHeight;
      const end = -rect.height;
      const current = rect.top;
      const p = Math.max(0, Math.min(1, (start - current) / (start - end)));
      setProgress(p);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { ref, progress };
}

// Quote Calculator Logic
function calculatePrice(lotSize: string, frequency: string, plan: string): number {
  const sizeMultiplier: Record<string, number> = {
    'Small (< 3,000 sqft)': 1,
    'Medium (3,000–6,000 sqft)': 1.5,
    'Large (6,000–10,000 sqft)': 2.2,
    'Estate (10,000+ sqft)': 3.5,
  };
  const freqMultiplier: Record<string, number> = {
    'Weekly': 4,
    'Bi-weekly': 2,
    'Monthly': 1,
  };
  const planBase: Record<string, number> = {
    'Essential': 49,
    'Pro': 89,
    'Elite': 149,
  };
  const base = planBase[plan] || 49;
  const size = sizeMultiplier[lotSize] || 1;
  const freq = freqMultiplier[frequency] || 2;
  return Math.round(base * size * freq * 0.5);
}

// Navbar
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'How It Works', href: '#how' },
    { label: 'Plans', href: '#plans' },
    { label: 'Dashboard', href: '#dashboard' },
    { label: 'Service Area', href: '#area' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-root-green rounded-lg flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
              <path d="M8 2C5 2 3 5 3 8c0 2 1 4 3 5.5V8c0-1.1.9-2 2-2s2 .9 2 2v5.5c2-1.5 3-3.5 3-5.5 0-3-2-6-5-6z" />
            </svg>
          </div>
          <span className="font-bold text-lg text-dark">{SITE.name}</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-gray-600 hover:text-root-green transition-colors">
              {l.label}
            </a>
          ))}
          <a
            href="#quote"
            className="px-5 py-2.5 bg-root-green text-white text-sm font-semibold rounded-lg hover:bg-root-green-dark transition-colors"
          >
            Get Quote
          </a>
        </div>
        <button className="md:hidden text-dark" onClick={() => setOpen(!open)} aria-label="Menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t px-6 py-4 space-y-3">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="block text-sm text-gray-600" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#quote" className="block text-sm font-semibold text-root-green" onClick={() => setOpen(false)}>
            Get Quote →
          </a>
        </div>
      )}
    </nav>
  );
}

// Hero with Quote Widget
function Hero() {
  const ref = useReveal();
  const [zip, setZip] = useState('');
  const [yardSize, setYardSize] = useState('Medium (3,000–6,000 sqft)');
  const [frequency, setFrequency] = useState('Weekly');
  const [plan, setPlan] = useState('Pro');

  const estimatedPrice = useMemo(
    () => calculatePrice(yardSize, frequency, plan),
    [yardSize, frequency, plan]
  );

  return (
    <section className="pt-28 pb-20 md:pt-36 md:pb-28 bg-gradient-to-b from-root-green-light/40 to-white">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-root-green-light rounded-full mb-6">
              <span className="w-2 h-2 bg-root-green rounded-full pulse-dot" />
              <span className="text-xs font-medium text-root-green-dark">Now serving Austin metro</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-dark leading-[1.05] mb-6">
              {HERO.headline}
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
              {HERO.subheadline}
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <a
                href="#quote"
                className="px-8 py-4 bg-root-green text-white font-semibold rounded-xl hover:bg-root-green-dark transition-all shadow-lg shadow-root-green/20"
              >
                {HERO.cta}
              </a>
              <a
                href="#how"
                className="px-8 py-4 border-2 border-gray-200 text-dark font-semibold rounded-xl hover:border-root-green transition-all"
              >
                {HERO.secondary}
              </a>
            </div>
            <div className="flex gap-8">
              {HERO.stats.map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold text-dark">{s.value}</p>
                  <p className="text-xs text-gray-400">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Live Quote Widget */}
          <div className="relative">
            <div className="dashboard-card p-6 bg-white">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-root-green rounded-full pulse-dot" />
                  <span className="text-sm font-medium text-dark">Instant Quote</span>
                </div>
                <span className="text-xs text-gray-400 font-mono">LIVE</span>
              </div>
              <div className="space-y-4 mb-5">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">ZIP Code</label>
                  <input
                    type="text"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    placeholder="78701"
                    maxLength={5}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-root-green focus:ring-2 focus:ring-root-green/20 transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Yard Size</label>
                    <select
                      value={yardSize}
                      onChange={(e) => setYardSize(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-root-green focus:ring-2 focus:ring-root-green/20 transition-all bg-white"
                    >
                      <option value="Small (< 3,000 sqft)">Small</option>
                      <option value="Medium (3,000–6,000 sqft)">Medium</option>
                      <option value="Large (6,000–10,000 sqft)">Large</option>
                      <option value="Estate (10,000+ sqft)">Estate</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Frequency</label>
                    <select
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-root-green focus:ring-2 focus:ring-root-green/20 transition-all bg-white"
                    >
                      <option value="Weekly">Weekly</option>
                      <option value="Bi-weekly">Bi-weekly</option>
                      <option value="Monthly">Monthly</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Plan</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Essential', 'Pro', 'Elite'].map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPlan(p)}
                        className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                          plan === p
                            ? 'bg-root-green text-white shadow-md'
                            : 'bg-gray-50 text-gray-600 border border-gray-200 hover:border-root-green'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              {/* Live Price Display */}
              <div className="bg-dark rounded-xl p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/50 mb-1">Estimated Monthly</p>
                  <p className="text-3xl font-bold text-white price-animate" key={estimatedPrice}>
                    ${estimatedPrice}
                    <span className="text-base font-normal text-white/50">/mo</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-white/50 mb-1">Per Visit</p>
                  <p className="text-lg font-semibold text-root-green">
                    ${Math.round(estimatedPrice / (frequency === 'Weekly' ? 4 : frequency === 'Bi-weekly' ? 2 : 1))}
                  </p>
                </div>
              </div>
              <a
                href="#quote"
                className="block text-center mt-4 py-3 bg-root-green text-white font-semibold rounded-xl hover:bg-root-green-dark transition-colors text-sm"
              >
                Lock In This Rate →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// How It Works
function HowItWorks() {
  const ref = useReveal();
  const icons: Record<string, React.ReactNode> = {
    calculator: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <line x1="8" y1="6" x2="16" y2="6" />
        <line x1="8" y1="10" x2="10" y2="10" />
        <line x1="14" y1="10" x2="16" y2="10" />
        <line x1="8" y1="14" x2="10" y2="14" />
        <line x1="14" y1="14" x2="16" y2="14" />
        <line x1="8" y1="18" x2="16" y2="18" />
      </svg>
    ),
    route: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="6" cy="19" r="3" />
        <circle cx="18" cy="5" r="3" />
        <path d="M6 16V8a4 4 0 014-4h4a4 4 0 014 4v8" />
      </svg>
    ),
    dashboard: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="9" rx="1" />
        <rect x="14" y="3" width="7" height="5" rx="1" />
        <rect x="14" y="12" width="7" height="9" rx="1" />
        <rect x="3" y="16" width="7" height="5" rx="1" />
      </svg>
    ),
  };

  return (
    <section id="how" className="py-20 md:py-28 bg-white">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">{HOW_IT_WORKS.title}</h2>
          <p className="text-lg text-gray-600">{HOW_IT_WORKS.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {HOW_IT_WORKS.steps.map((step, i) => (
            <div key={step.id} className="relative group">
              <div className="dashboard-card p-8 h-full transition-transform duration-300 group-hover:-translate-y-1">
                <div className="w-12 h-12 bg-root-green-light rounded-xl flex items-center justify-center text-root-green mb-6">
                  {icons[step.icon]}
                </div>
                <div className="absolute top-8 right-8 text-5xl font-bold text-gray-100">
                  {step.id}
                </div>
                <h3 className="text-xl font-bold text-dark mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </div>
              {i < 2 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 text-center text-gray-300 z-10">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Plans with Sticky Comparison
function Plans() {
  const ref = useReveal();
  const [stickyPlan, setStickyPlan] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('plans');
      if (!section) return;
      const rect = section.getBoundingClientRect();
      if (rect.top < 0 && rect.bottom > window.innerHeight) {
        // User is scrolling through plans section
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="plans" className="py-20 md:py-28 bg-gray-50">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">Simple, Transparent Plans</h2>
          <p className="text-lg text-gray-600">No hidden fees. No contracts. Cancel anytime.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PLANS.map((planItem) => (
            <div
              key={planItem.id}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                planItem.popular
                  ? 'bg-dark text-white ring-2 ring-root-green shadow-2xl md:scale-105'
                  : 'bg-white border border-gray-200 hover:shadow-lg hover:border-root-green/30'
              } ${stickyPlan === planItem.id ? 'ring-2 ring-root-green' : ''}`}
              onMouseEnter={() => setStickyPlan(planItem.id)}
              onMouseLeave={() => setStickyPlan(null)}
            >
              {planItem.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-root-green text-white text-xs font-bold rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className={`text-xl font-bold mb-2 ${planItem.popular ? 'text-white' : 'text-dark'}`}>
                {planItem.name}
              </h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className={`text-4xl font-bold ${planItem.popular ? 'text-white' : 'text-dark'}`}>
                  {planItem.price}
                </span>
                <span className={`text-sm ${planItem.popular ? 'text-white/60' : 'text-gray-400'}`}>
                  {planItem.frequency}
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                {planItem.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <svg className={`w-4 h-4 mt-0.5 flex-shrink-0 text-root-green`} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className={planItem.popular ? 'text-white/80' : 'text-gray-600'}>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#quote"
                className={`block text-center py-3 rounded-xl font-semibold transition-colors ${
                  planItem.popular
                    ? 'bg-root-green text-white hover:bg-root-green-dark'
                    : 'bg-gray-100 text-dark hover:bg-root-green hover:text-white'
                }`}
              >
                Get Started
              </a>
            </div>
          ))}
        </div>
        {/* Plan Comparison Table */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="dashboard-card overflow-hidden">
            <div className="p-5 border-b border-gray-200">
              <h3 className="font-bold text-dark">Plan Comparison</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left p-4 text-gray-400 font-medium">Feature</th>
                    {PLANS.map((p) => (
                      <th key={p.id} className="p-4 text-center font-semibold text-dark">{p.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'Mowing & Edging', essential: true, pro: true, elite: true },
                    { feature: 'Visit Reports', essential: true, pro: true, elite: true },
                    { feature: 'GPS Tracking', essential: true, pro: true, elite: true },
                    { feature: 'Fertilization', essential: false, pro: true, elite: true },
                    { feature: 'Weed Treatment', essential: false, pro: true, elite: true },
                    { feature: 'Aeration', essential: false, pro: true, elite: true },
                    { feature: 'Irrigation Monitor', essential: false, pro: false, elite: true },
                    { feature: 'Pest Management', essential: false, pro: false, elite: true },
                    { feature: 'Tree Trimming', essential: false, pro: false, elite: true },
                    { feature: '24/7 Support', essential: false, pro: false, elite: true },
                  ].map((row) => (
                    <tr key={row.feature} className="border-b border-gray-50 hover:bg-gray-50/50">
                      <td className="p-4 text-gray-600">{row.feature}</td>
                      <td className="p-4 text-center">
                        {row.essential ? (
                          <span className="inline-block w-5 h-5 bg-root-green/10 rounded-full">
                            <svg className="w-5 h-5 text-root-green" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </span>
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {row.pro ? (
                          <span className="inline-block w-5 h-5 bg-root-green/10 rounded-full">
                            <svg className="w-5 h-5 text-root-green" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </span>
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {row.elite ? (
                          <span className="inline-block w-5 h-5 bg-root-green/10 rounded-full">
                            <svg className="w-5 h-5 text-root-green" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </span>
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Dashboard Section with animated metrics
function DashboardSection() {
  const ref = useReveal();
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          el.classList.add('visible');
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="dashboard" className="py-20 md:py-28 bg-white">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">{DASHBOARD.title}</h2>
          <p className="text-lg text-gray-600">{DASHBOARD.subtitle}</p>
        </div>
        <div className="dashboard-card p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-dark">Latest Visit Report</h3>
              <p className="text-sm text-gray-400">{DASHBOARD.visitDetails.date}</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-root-green-light rounded-full">
              <span className="w-2 h-2 bg-root-green rounded-full" />
              <span className="text-xs font-medium text-root-green-dark">Completed</span>
            </div>
          </div>
          {/* Animated Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {DASHBOARD.metrics.map((m, i) => (
              <div
                key={m.label}
                className="bg-gray-50 rounded-xl p-4 transition-all duration-500"
                style={{
                  opacity: animated ? 1 : 0,
                  transform: animated ? 'translateY(0)' : 'translateY(16px)',
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                <p className="text-xs text-gray-400 mb-1">{m.label}</p>
                <p className="text-2xl font-bold text-dark">{m.value}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className={`status-dot status-${m.status}`} />
                  <span className="text-xs text-gray-400 capitalize">{m.status}</span>
                  <span className="text-xs text-root-green ml-auto">{m.change}</span>
                </div>
              </div>
            ))}
          </div>
          {/* Visit Details */}
          <div className="bg-gray-50 rounded-xl p-5">
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-400 mb-1">Crew</p>
                <p className="text-sm font-medium text-dark">{DASHBOARD.visitDetails.crew}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Duration</p>
                <p className="text-sm font-medium text-dark">{DASHBOARD.visitDetails.duration}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Services</p>
                <div className="flex flex-wrap gap-1">
                  {DASHBOARD.visitDetails.services.map((s) => (
                    <span key={s} className="text-xs px-2 py-0.5 bg-root-green-light text-root-green-dark rounded-full">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4 mt-4">
              <p className="text-xs text-gray-400 mb-2">Crew Notes</p>
              <p className="text-sm text-gray-600 italic">"{DASHBOARD.visitDetails.notes}"</p>
            </div>
            {/* Photo Grid Placeholder */}
            <div className="grid grid-cols-4 gap-2 mt-4">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
          {/* Next Visit */}
          <div className="mt-5 flex items-center justify-between p-4 bg-root-green-light rounded-xl">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-root-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div>
                <p className="text-sm font-semibold text-dark">Next Scheduled Visit</p>
                <p className="text-xs text-gray-500">June 17, 2024 · 8:00 AM – 10:00 AM window</p>
              </div>
            </div>
            <button className="px-4 py-2 text-xs font-semibold text-root-green border border-root-green rounded-lg hover:bg-root-green hover:text-white transition-colors">
              Reschedule
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Seasonal Tabs
function SeasonalTabs() {
  const ref = useReveal();
  const [active, setActive] = useState(0);
  const season = SEASONAL.seasons[active];

  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">{SEASONAL.title}</h2>
          <p className="text-lg text-gray-600">{SEASONAL.subtitle}</p>
        </div>
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {SEASONAL.seasons.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
                active === i
                  ? 'bg-dark text-white shadow-lg'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-dark'
              }`}
            >
              {s.name}
              <span className="ml-2 text-xs opacity-60">{s.months}</span>
            </button>
          ))}
        </div>
        <div className="max-w-2xl mx-auto dashboard-card p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: season.color }} />
            <h3 className="text-2xl font-bold text-dark">{season.name}</h3>
            <span className="text-sm text-gray-400">{season.months}</span>
          </div>
          <ul className="space-y-3">
            {season.tasks.map((task, i) => (
              <li
                key={task}
                className="flex items-center gap-3 transition-all duration-300"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <svg className="w-5 h-5 text-root-green flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">{task}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 pt-5 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Auto-adjusted for your zone</span>
              <span className="text-xs font-medium text-root-green">USDA Zone 8b</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Service Area Map with scroll-drawn route lines
function ServiceAreaMap() {
  const ref = useReveal();
  const { ref: svgRef, progress } = useScrollDraw();

  const routeLength = 200;
  const dashOffset = routeLength * (1 - progress);

  return (
    <section id="area" className="py-20 md:py-28 bg-white">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">Service Area</h2>
          <p className="text-lg text-gray-600">Proudly serving the greater Austin metro area</p>
        </div>
        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 items-center">
          <div className="dashboard-card p-6">
            <svg ref={svgRef} viewBox="0 0 400 350" className="w-full">
              <rect width="400" height="350" fill="#f4f4f5" rx="12" />
              {/* Concentric range circles */}
              <circle cx="200" cy="175" r="140" fill="none" stroke="#e4e4e7" strokeWidth="1" strokeDasharray="4" />
              <circle cx="200" cy="175" r="100" fill="none" stroke="#e4e4e7" strokeWidth="1" strokeDasharray="4" />
              <circle cx="200" cy="175" r="60" fill="none" stroke="#e4e4e7" strokeWidth="1" strokeDasharray="4" />
              <circle cx="200" cy="175" r="30" fill="#e8f9ef" stroke="#00c853" strokeWidth="2" />
              {/* Hub */}
              <circle cx="200" cy="175" r="6" fill="#00c853" className="pulse-dot" />
              <text x="200" y="200" textAnchor="middle" fontSize="10" fill="#0a0a0a" fontWeight="bold">HQ</text>
              {/* Neighborhood nodes */}
              <circle cx="200" cy="80" r="5" fill="#00c853" />
              <text x="200" y="70" textAnchor="middle" fontSize="9" fill="#52525b">Round Rock</text>
              <circle cx="130" cy="110" r="5" fill="#00c853" />
              <text x="130" y="100" textAnchor="middle" fontSize="9" fill="#52525b">Cedar Park</text>
              <circle cx="270" cy="115" r="5" fill="#00c853" />
              <text x="270" y="105" textAnchor="middle" fontSize="9" fill="#52525b">Pflugerville</text>
              <circle cx="160" cy="55" r="5" fill="#00c853" />
              <text x="160" y="45" textAnchor="middle" fontSize="9" fill="#52525b">Georgetown</text>
              <circle cx="200" cy="290" r="5" fill="#00c853" />
              <text x="200" y="310" textAnchor="middle" fontSize="9" fill="#52525b">San Marcos</text>
              <circle cx="300" cy="200" r="5" fill="#00c853" />
              <text x="300" y="220" textAnchor="middle" fontSize="9" fill="#52525b">Lakeway</text>
              {/* Route lines drawn on scroll */}
              <line x1="200" y1="175" x2="200" y2="80" stroke="#00c853" strokeWidth="2" strokeLinecap="round"
                strokeDasharray={routeLength} strokeDashoffset={dashOffset} />
              <line x1="200" y1="175" x2="130" y2="110" stroke="#00c853" strokeWidth="2" strokeLinecap="round"
                strokeDasharray={routeLength} strokeDashoffset={dashOffset} />
              <line x1="200" y1="175" x2="270" y2="115" stroke="#00c853" strokeWidth="2" strokeLinecap="round"
                strokeDasharray={routeLength} strokeDashoffset={dashOffset} />
              <line x1="200" y1="175" x2="160" y2="55" stroke="#00c853" strokeWidth="2" strokeLinecap="round"
                strokeDasharray={routeLength} strokeDashoffset={dashOffset} />
              <line x1="200" y1="175" x2="200" y2="290" stroke="#00c853" strokeWidth="2" strokeLinecap="round"
                strokeDasharray={routeLength} strokeDashoffset={dashOffset} />
              <line x1="200" y1="175" x2="300" y2="200" stroke="#00c853" strokeWidth="2" strokeLinecap="round"
                strokeDasharray={routeLength} strokeDashoffset={dashOffset} />
              {/* Active crew indicator */}
              <circle cx="240" cy="140" r="4" fill="#0a0a0a" className="pulse-dot" />
              <text x="255" y="138" fontSize="8" fill="#0a0a0a" fontWeight="600">Crew en route</text>
            </svg>
            <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-root-green rounded-full" /> Active routes</span>
              <span>Scroll to reveal coverage</span>
            </div>
          </div>
          <div className="space-y-3">
            {SERVICE_AREAS.map((area) => (
              <div key={area.id} className="dashboard-card p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-root-green rounded-full pulse-dot" />
                  <span className="font-medium text-dark">{area.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {area.zipCodes.map((z) => (
                    <span key={z} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded font-mono">{z}</span>
                  ))}
                </div>
              </div>
            ))}
            <div className="dashboard-card p-4 bg-root-green-light border-root-green/30">
              <p className="text-sm font-medium text-root-green-dark">
                Don't see your area? We're expanding weekly.
              </p>
              <a href="#quote" className="text-xs text-root-green font-semibold hover:underline mt-1 inline-block">
                Check availability →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Before/After Section
function BeforeAfterSection() {
  const ref = useReveal();
  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">Transformations</h2>
          <p className="text-lg text-gray-600">Drag the slider to see the RootOps difference</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {BEFORE_AFTERS.map((ba) => (
            <BeforeAfterCard key={ba.id} item={ba} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BeforeAfterCard({ item }: { item: { id: string; title: string; before: string; after: string } }) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current || !dragging.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, x)));
  }, []);

  const handleMouseDown = () => { dragging.current = true; };

  useEffect(() => {
    const handleGlobalMove = (e: MouseEvent) => handleMove(e.clientX);
    const handleGlobalUp = () => { dragging.current = false; };
    window.addEventListener('mousemove', handleGlobalMove);
    window.addEventListener('mouseup', handleGlobalUp);
    return () => {
      window.removeEventListener('mousemove', handleGlobalMove);
      window.removeEventListener('mouseup', handleGlobalUp);
    };
  }, [handleMove]);

  return (
    <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-shadow">
      <div
        ref={containerRef}
        className="ba-slider aspect-[4/3] relative select-none"
        onMouseDown={handleMouseDown}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      >
        {/* After image (background) */}
        <div className="absolute inset-0 bg-gradient-to-br from-root-green/20 to-green-100 flex items-center justify-center">
          <div className="text-center">
            <svg className="w-12 h-12 text-root-green mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-1.5L12 12m0 0l3-1.5M12 12V9" />
            </svg>
            <p className="text-sm font-semibold text-root-green-dark">After</p>
            <p className="text-xs text-gray-500">Lush & maintained</p>
          </div>
        </div>
        {/* Before image (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${position}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-yellow-50 flex items-center justify-center"
            style={{ width: `${containerRef.current?.offsetWidth || 400}px`, maxWidth: 'none' }}>
            <div className="text-center">
              <svg className="w-12 h-12 text-amber-500 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              <p className="text-sm font-semibold text-amber-700">Before</p>
              <p className="text-xs text-gray-500">Overgrown & neglected</p>
            </div>
          </div>
        </div>
        {/* Slider handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
          style={{ left: `${position}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-root-green">
            <span className="text-xs text-root-green font-bold">⇔</span>
          </div>
        </div>
        <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/70 text-white text-xs rounded-full font-medium backdrop-blur-sm">Before</div>
        <div className="absolute top-3 right-3 px-2.5 py-1 bg-root-green text-white text-xs rounded-full font-medium">After</div>
      </div>
      <div className="p-4">
        <h4 className="font-semibold text-dark">{item.title}</h4>
        <p className="text-xs text-gray-400 mt-1">Verified by RootOps crew · Photo timestamped</p>
      </div>
    </div>
  );
}

// Quote Widget with Live Pricing
function QuoteWidget() {
  const ref = useReveal();
  const [formData, setFormData] = useState<Record<string, string>>({
    address: '',
    lotSize: '',
    frequency: '',
    plan: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const livePrice = useMemo(
    () => calculatePrice(formData.lotSize, formData.frequency, formData.plan),
    [formData.lotSize, formData.frequency, formData.plan]
  );

  const hasInputs = formData.lotSize && formData.frequency && formData.plan;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="quote" className="py-20 md:py-28 bg-white">
      <div ref={ref} className="reveal max-w-3xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">{QUOTE_WIDGET.title}</h2>
          <p className="text-lg text-gray-600">{QUOTE_WIDGET.subtitle}</p>
        </div>
        {submitted ? (
          <div className="dashboard-card p-10 text-center">
            <div className="w-16 h-16 bg-root-green-light rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-root-green" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-dark mb-2">Quote Ready!</h3>
            <p className="text-gray-600 mb-4">
              Based on your inputs, your estimated monthly cost is{' '}
              <strong className="text-root-green text-xl">${livePrice}/mo</strong>
            </p>
            <p className="text-sm text-gray-400">A team member will reach out within 24 hours to confirm details.</p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 px-6 py-2 text-sm text-root-green font-medium hover:underline"
            >
              Get Another Quote
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="dashboard-card p-8 space-y-6">
            {QUOTE_WIDGET.fields.map((field) => (
              <div key={field.id}>
                <label className="block text-sm font-medium text-dark mb-2">{field.label}</label>
                {field.type === 'text' ? (
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    value={formData[field.id] || ''}
                    onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-root-green focus:ring-2 focus:ring-root-green/20 transition-all"
                    required
                  />
                ) : (
                  <select
                    value={formData[field.id] || ''}
                    onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-root-green focus:ring-2 focus:ring-root-green/20 transition-all bg-white"
                    required
                  >
                    <option value="">Select...</option>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                )}
              </div>
            ))}
            {/* Live Price Preview */}
            {hasInputs && (
              <div className="bg-dark rounded-xl p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/50 mb-1">Your Estimated Monthly</p>
                  <p className="text-3xl font-bold text-white">${livePrice}<span className="text-base font-normal text-white/50">/mo</span></p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-white/50 mb-1">Per Visit</p>
                  <p className="text-lg font-semibold text-root-green">
                    ${Math.round(livePrice / (formData.frequency === 'Weekly' ? 4 : formData.frequency === 'Bi-weekly' ? 2 : 1))}
                  </p>
                </div>
              </div>
            )}
            <button
              type="submit"
              className="w-full py-4 bg-root-green text-white font-semibold rounded-xl hover:bg-root-green-dark transition-colors shadow-lg shadow-root-green/20"
            >
              {hasInputs ? `Lock In $${livePrice}/mo` : 'Calculate My Quote'}
            </button>
            <p className="text-center text-xs text-gray-400">No commitment. Cancel anytime. First visit 50% off.</p>
          </form>
        )}
      </div>
    </section>
  );
}

// CTA
function CTASection() {
  const ref = useReveal();
  return (
    <section className="py-20 md:py-28 bg-dark text-white">
      <div ref={ref} className="reveal max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">{CTA.title}</h2>
        <p className="text-lg text-white/60 mb-10">{CTA.subtitle}</p>
        <a
          href="#quote"
          className="inline-block px-10 py-5 bg-root-green text-white font-semibold rounded-xl hover:bg-root-green-dark transition-all text-lg shadow-lg shadow-root-green/30"
        >
          {CTA.buttonText}
        </a>
        <p className="mt-6 text-sm text-white/40">{CTA.subtext}</p>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-root-green rounded-lg flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
                  <path d="M8 2C5 2 3 5 3 8c0 2 1 4 3 5.5V8c0-1.1.9-2 2-2s2 .9 2 2v5.5c2-1.5 3-3.5 3-5.5 0-3-2-6-5-6z" />
                </svg>
              </div>
              <span className="font-bold text-lg text-dark">{SITE.name}</span>
            </div>
            <p className="text-sm text-gray-600 max-w-sm">
              Tech-powered lawn maintenance for the modern homeowner. GPS-tracked, transparent, and guaranteed. Every visit comes with receipts.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-dark mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#how" className="hover:text-root-green">How It Works</a></li>
              <li><a href="#plans" className="hover:text-root-green">Plans</a></li>
              <li><a href="#dashboard" className="hover:text-root-green">Dashboard</a></li>
              <li><a href="#area" className="hover:text-root-green">Service Area</a></li>
              <li><a href="#quote" className="hover:text-root-green">Get Quote</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-dark mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>{SITE.phone}</li>
              <li>{SITE.email}</li>
              <li>{SITE.supportEmail}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between text-xs text-gray-400">
          <p>© 2024 {SITE.name}. All rights reserved.</p>
          <p>Austin, TX · Serving Central Texas</p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Plans />
      <DashboardSection />
      <SeasonalTabs />
      <ServiceAreaMap />
      <BeforeAfterSection />
      <QuoteWidget />
      <CTASection />
      <Footer />
    </div>
  );
}
