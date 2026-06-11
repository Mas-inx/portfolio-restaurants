import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { efficiencyServices, upgradeSteps, smartFeatures, rebates, caseExamples, heroImage } from './data';

/* ─── Animation presets ─── */
const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};
const stagger = {
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true, margin: '-40px' },
};
const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

/* ─── Inline SVG Icons ─── */
function Icon({ name, className = 'w-6 h-6' }: { name: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    leaf: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.5 9 6 13 6 17a6 6 0 0012 0c0-4-2.5-8-6-15z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v12" />
      </svg>
    ),
    snowflake: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M12 2l-3 3m3-3l3 3M12 22l-3-3m3 3l3-3M2 12h20M2 12l3 3M2 12l3-3M22 12l-3 3m3-3l-3-3" />
      </svg>
    ),
    refresh: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    smartphone: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    wind: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" />
      </svg>
    ),
    home: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    clipboard: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    monitor: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    layout: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    brain: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    chart: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 17V9M8 17V5M18 17v-5M3 21h18" />
      </svg>
    ),
    arrow: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    ),
    dollar: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
    bolt: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    shield: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    menu: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
    close: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    phone: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    mapPin: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    trending: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  };
  return <>{icons[name] || <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><circle cx="12" cy="12" r="10" /></svg>}</>;
}

/* ─── Organic blob SVG background ─── */
function OrganicBlob({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M300 50C420 50 530 130 550 250C570 370 500 480 380 530C260 580 130 540 70 430C10 320 40 180 140 100C200 55 250 50 300 50Z" fill="currentColor" />
    </svg>
  );
}

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroParallax = useTransform(scrollYProgress, [0, 0.3], [0, -60]);

  return (
    <div className="min-h-screen bg-[#F5FBF5] text-gray-700 antialiased overflow-x-hidden font-[Inter,system-ui,sans-serif]">

      {/* ═══════════════ HEADER ═══════════════ */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div className="bg-white/80 backdrop-blur-xl border-b border-sage-200/50">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sage-500 to-teal-700 flex items-center justify-center text-white shadow-md shadow-sage-300/30 group-hover:shadow-lg group-hover:shadow-sage-300/50 transition-shadow">
                <Icon name="leaf" className="w-4.5 h-4.5" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-bold text-lg tracking-tight text-teal-800">EcoBreeze</span>
                <span className="text-[10px] font-medium text-sage-500 tracking-wider uppercase">Efficiency HVAC</span>
              </div>
            </a>

            <nav className="hidden md:flex items-center gap-8">
              {[
                { label: 'Services', href: '#services' },
                { label: 'Process', href: '#process' },
                { label: 'Technology', href: '#technology' },
                { label: 'Savings', href: '#savings' },
                { label: 'Results', href: '#results' },
              ].map(item => (
                <a key={item.label} href={item.href} className="text-sm font-medium text-gray-500 hover:text-teal-700 transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-sage-500 after:transition-all hover:after:w-full">
                  {item.label}
                </a>
              ))}
              <a href="tel:+13035550123" className="inline-flex items-center gap-2 bg-teal-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-teal-800 transition-all shadow-lg shadow-teal-700/20 hover:shadow-xl hover:shadow-teal-700/30 hover:-translate-y-0.5">
                <Icon name="phone" className="w-3.5 h-3.5" />
                Free Assessment
              </a>
            </nav>

            <button onClick={() => setNavOpen(!navOpen)} className="md:hidden p-2 text-teal-700 rounded-lg hover:bg-sage-50 transition-colors">
              <Icon name={navOpen ? 'close' : 'menu'} className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {navOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-b border-sage-100 px-5 pb-5 pt-2 space-y-1"
          >
            {[
              { label: 'Services', href: '#services' },
              { label: 'Process', href: '#process' },
              { label: 'Technology', href: '#technology' },
              { label: 'Savings', href: '#savings' },
              { label: 'Results', href: '#results' },
            ].map(item => (
              <a key={item.label} href={item.href} onClick={() => setNavOpen(false)} className="block py-2.5 text-gray-600 font-medium hover:text-teal-700 transition-colors">
                {item.label}
              </a>
            ))}
            <a href="tel:+13035550123" className="block mt-3 bg-teal-700 text-white text-center py-3 rounded-xl font-semibold">
              Free Assessment
            </a>
          </motion.div>
        )}
      </header>

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative min-h-[100vh] flex items-center pt-16 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F5FBF5] via-white to-sage-50" />
        <OrganicBlob className="absolute -top-32 -right-32 w-[500px] h-[500px] text-sage-100/60" />
        <OrganicBlob className="absolute -bottom-48 -left-48 w-[600px] h-[600px] text-teal-50/50 rotate-180" />
        <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-sage-400/40 animate-pulse" />
        <div className="absolute top-2/3 left-1/4 w-3 h-3 rounded-full bg-gold-400/30 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 rounded-full bg-teal-400/40 animate-pulse" style={{ animationDelay: '2s' }} />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 w-full py-16 sm:py-20">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
              {/* Efficiency badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 bg-white border border-sage-200 rounded-full px-4 py-2 shadow-sm mb-8"
              >
                <span className="w-2 h-2 rounded-full bg-leaf animate-pulse" />
                <span className="text-xs font-semibold text-teal-700 tracking-wide uppercase">Up to 50% Energy Reduction</span>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-extrabold leading-[1.08] tracking-tight text-teal-900">
                Comfort that{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-sage-600 to-teal-600">protects</span>
                  <span className="absolute bottom-1 left-0 right-0 h-3 bg-sage-200/50 -z-0 rounded-sm" />
                </span>
                {' '}your home
                <br />and the planet.
              </h1>

              <p className="mt-6 text-lg text-gray-500 max-w-lg leading-relaxed">
                Premium high-efficiency HVAC systems engineered for maximum comfort with minimum environmental impact. The future of home climate control.
              </p>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-10 flex items-center gap-8 sm:gap-10"
              >
                {[
                  { value: '26', unit: 'SEER2', label: 'Max Rating' },
                  { value: '50%', unit: '', label: 'Energy Saved' },
                  { value: '2K+', unit: '', label: 'Homes Served' },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-2xl sm:text-3xl font-extrabold text-teal-800">{stat.value}</span>
                      {stat.unit && <span className="text-xs font-bold text-sage-500 uppercase">{stat.unit}</span>}
                    </div>
                    <span className="text-xs text-gray-400 font-medium mt-0.5">{stat.label}</span>
                  </div>
                ))}
              </motion.div>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-10 flex flex-wrap gap-4"
              >
                <a href="#services" className="group inline-flex items-center gap-3 bg-teal-700 text-white font-semibold px-7 py-4 rounded-2xl hover:bg-teal-800 transition-all shadow-xl shadow-teal-700/20 hover:shadow-2xl hover:shadow-teal-700/30 hover:-translate-y-0.5">
                  Explore Solutions
                  <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <Icon name="arrow" className="w-4 h-4" />
                  </span>
                </a>
                <a href="#results" className="inline-flex items-center gap-2 text-teal-700 font-semibold px-6 py-4 rounded-2xl border-2 border-sage-200 hover:border-sage-300 hover:bg-sage-50/50 transition-all">
                  <Icon name="trending" className="w-4 h-4" />
                  See Results
                </a>
              </motion.div>
            </motion.div>

            {/* Right: Hero image with overlay */}
            <motion.div
              style={{ y: heroParallax }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-teal-900/10">
                <img src={heroImage} alt="Modern efficient home interior" className="w-full h-[520px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/40 via-transparent to-transparent" />

                {/* Floating efficiency badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md rounded-2xl p-5 border border-white/50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sage-500 to-teal-600 flex items-center justify-center text-white">
                        <Icon name="bolt" className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-teal-800">ENERGY STAR Certified</div>
                        <div className="text-xs text-gray-500">All systems meet highest efficiency standards</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-extrabold text-sage-600">A++</div>
                      <div className="text-[10px] text-gray-400 font-medium uppercase">Rating</div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Floating card - top right */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl shadow-sage-200/40 border border-sage-100"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gold-100 flex items-center justify-center text-gold-600">
                    <Icon name="dollar" className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-medium">Avg. Annual Savings</div>
                    <div className="text-sm font-bold text-teal-800">$680/year</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ SERVICES ═══════════════ */}
      <section id="services" className="relative py-24 sm:py-32 bg-gradient-to-b from-white to-sage-50/50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          {/* Section header */}
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="inline-block text-xs font-bold text-sage-600 uppercase tracking-[0.2em] mb-4">Our Solutions</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-teal-900 tracking-tight leading-tight">
              Engineered for efficiency
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto text-lg leading-relaxed">
              Every system we install is designed to deliver maximum comfort while minimizing your carbon footprint and energy bills.
            </p>
          </motion.div>

          {/* Service cards */}
          <motion.div {...stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {efficiencyServices.map((s, i) => (
              <motion.div
                key={s.id}
                {...fadeUp}
                className="group relative bg-white rounded-2xl p-7 border border-sage-100/80 hover:border-sage-200 transition-all duration-500 hover:shadow-xl hover:shadow-sage-100/60 hover:-translate-y-1"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sage-50 to-sage-100 border border-sage-200/50 flex items-center justify-center text-sage-600 group-hover:from-sage-100 group-hover:to-teal-100 group-hover:text-teal-600 group-hover:border-teal-200/50 transition-all duration-300">
                  <Icon name={s.icon} className="w-5.5 h-5.5" />
                </div>

                {/* Content */}
                <h3 className="mt-5 text-base font-bold text-teal-800 group-hover:text-teal-700 transition-colors">{s.title}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{s.desc}</p>

                {/* Efficiency badge */}
                <div className="mt-5 pt-4 border-t border-sage-50 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-leaf" />
                  <span className="text-[11px] font-semibold text-sage-600 uppercase tracking-wide">
                    {['SEER2 16-26', 'All-Electric', 'AI-Powered', '30% Recovery', 'R-Value+', 'Quarterly'][i]}
                  </span>
                </div>

                {/* Hover accent line */}
                <div className="absolute bottom-0 left-7 right-7 h-[2px] bg-gradient-to-r from-sage-400 to-teal-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ UPGRADE PATH (Nature Trail) ═══════════════ */}
      <section id="process" className="relative py-24 sm:py-32 bg-teal-900 overflow-hidden">
        {/* Background organic shapes */}
        <OrganicBlob className="absolute -top-40 -left-40 w-[500px] h-[500px] text-teal-800/50" />
        <OrganicBlob className="absolute -bottom-32 -right-32 w-[400px] h-[400px] text-sage-800/30 rotate-90" />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
          {/* Section header */}
          <motion.div {...fadeUp} className="text-center mb-20">
            <span className="inline-block text-xs font-bold text-sage-400 uppercase tracking-[0.2em] mb-4">Your Journey</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              The path to peak efficiency
            </h2>
            <p className="mt-4 text-sage-300/70 max-w-xl mx-auto text-lg leading-relaxed">
              A proven four-step process that transforms your home's energy performance from audit to optimization.
            </p>
          </motion.div>

          {/* Trail steps */}
          <div className="relative max-w-4xl mx-auto">
            {/* Connecting trail line */}
            <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-sage-500/50 via-sage-400/30 to-transparent hidden sm:block" />

            <motion.div {...stagger} className="space-y-12 sm:space-y-16">
              {upgradeSteps.map((step, i) => (
                <motion.div
                  key={step.step}
                  {...fadeUp}
                  className={`relative flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10 ${i % 2 === 1 ? 'sm:flex-row-reverse' : ''}`}
                >
                  {/* Step node on trail */}
                  <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-sage-500 to-teal-600 items-center justify-center text-white font-bold text-xl shadow-xl shadow-teal-900/50 border-4 border-teal-900 z-10">
                    {step.step}
                  </div>

                  {/* Content card */}
                  <div className={`flex-1 ${i % 2 === 0 ? 'sm:text-right sm:pr-16' : 'sm:text-left sm:pl-16'}`}>
                    <div className={`inline-block bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 hover:bg-white/10 transition-all duration-300 ${i % 2 === 0 ? 'sm:ml-auto' : 'sm:mr-auto'}`}>
                      {/* Mobile step number */}
                      <div className="sm:hidden flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sage-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm">
                          {step.step}
                        </div>
                        <div className="w-8 h-px bg-sage-500/50" />
                      </div>
                      <h3 className="text-lg font-bold text-white">{step.title}</h3>
                      <p className="mt-2 text-sm text-sage-300/70 leading-relaxed max-w-xs">{step.desc}</p>
                    </div>
                  </div>

                  {/* Spacer for the other side */}
                  <div className="hidden sm:block flex-1" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ SMART FEATURES ═══════════════ */}
      <section id="technology" className="relative py-24 sm:py-32 bg-[#F5FBF5]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          {/* Section header */}
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="inline-block text-xs font-bold text-sage-600 uppercase tracking-[0.2em] mb-4">Smart Technology</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-teal-900 tracking-tight leading-tight">
              Intelligence built in
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto text-lg leading-relaxed">
              Modern HVAC that thinks ahead. Adaptive systems that learn, optimize, and report — so you save without lifting a finger.
            </p>
          </motion.div>

          {/* Feature cards - device mockup style */}
          <motion.div {...stagger} className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {smartFeatures.map((f, i) => (
              <motion.div
                key={i}
                {...scaleIn}
                className="group relative"
              >
                <div className="relative bg-gradient-to-br from-teal-800 to-teal-900 rounded-3xl p-6 sm:p-8 overflow-hidden border border-teal-700/50 hover:border-sage-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-teal-900/30 hover:-translate-y-1">
                  {/* Screen glow effect */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sage-400/50 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-sage-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Icon in device frame */}
                  <div className="relative w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-sage-300 group-hover:text-sage-200 group-hover:bg-white/15 transition-all mb-5">
                    <Icon name={f.icon} className="w-6 h-6" />
                    {/* Status dot */}
                    <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-leaf border-2 border-teal-900" />
                  </div>

                  <h3 className="relative text-lg font-bold text-white mb-2">{f.title}</h3>
                  <p className="relative text-sm text-sage-300/70 leading-relaxed">{f.desc}</p>

                  {/* Bottom bar - like a device status bar */}
                  <div className="relative mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-sage-400 uppercase tracking-wider">Active</span>
                    <div className="flex gap-1">
                      <span className="w-1 h-1 rounded-full bg-sage-500" />
                      <span className="w-1 h-1 rounded-full bg-sage-500" />
                      <span className="w-1 h-1 rounded-full bg-sage-400" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ REBATES & SAVINGS ═══════════════ */}
      <section id="savings" className="relative py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          {/* Section header */}
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="inline-block text-xs font-bold text-gold-600 uppercase tracking-[0.2em] mb-4">Financial Incentives</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-teal-900 tracking-tight leading-tight">
              Save thousands on your upgrade
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto text-lg leading-relaxed">
              Stack federal, state, and utility rebates to dramatically reduce your investment. We handle the paperwork.
            </p>
          </motion.div>

          {/* Rebate cards */}
          <motion.div {...stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {rebates.map((r, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                className="group relative bg-gradient-to-b from-gold-50 to-white border border-gold-200/60 rounded-2xl p-6 hover:border-gold-300 hover:shadow-xl hover:shadow-gold-100/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                {/* Gold accent top bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-400 to-gold-300" />

                {/* Icon */}
                <div className="w-10 h-10 rounded-xl bg-gold-100 border border-gold-200/50 flex items-center justify-center text-gold-600 mb-4">
                  <Icon name="dollar" className="w-5 h-5" />
                </div>

                {/* Amount - hero number */}
                <div className="text-2xl font-extrabold text-teal-800 mb-1">{r.amount}</div>
                <div className="text-sm font-bold text-gold-700 mb-3">{r.name}</div>
                <p className="text-sm text-gray-500 leading-relaxed">{r.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Total savings callout */}
          <motion.div {...fadeUp} className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 bg-sage-50 border border-sage-200 rounded-full px-6 py-3">
              <Icon name="shield" className="w-5 h-5 text-sage-600" />
              <span className="text-sm font-semibold text-teal-800">
                Total potential savings: <span className="text-sage-600 font-extrabold">Up to $4,600</span> in rebates
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ CASE STUDIES / SUCCESS STORIES ═══════════════ */}
      <section id="results" className="relative py-24 sm:py-32 bg-gradient-to-b from-sage-50/50 to-[#F5FBF5]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          {/* Section header */}
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="inline-block text-xs font-bold text-sage-600 uppercase tracking-[0.2em] mb-4">Proven Results</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-teal-900 tracking-tight leading-tight">
              Real homes, real savings
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto text-lg leading-relaxed">
              See the measurable impact our efficiency upgrades deliver for homeowners across Colorado.
            </p>
          </motion.div>

          {/* Case study cards */}
          <motion.div {...stagger} className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {caseExamples.map((c, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                className="group relative bg-white rounded-3xl overflow-hidden border border-sage-100 hover:border-sage-200 transition-all duration-500 hover:shadow-2xl hover:shadow-sage-100/60 hover:-translate-y-1"
              >
                {/* Top savings banner */}
                <div className="relative bg-gradient-to-br from-teal-700 to-teal-800 px-6 py-8 text-center overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(132,169,140,0.2),transparent)]" />
                  <div className="relative">
                    <div className="text-5xl font-extrabold text-white mb-1">{c.savings}</div>
                    <div className="text-xs font-bold text-sage-300 uppercase tracking-[0.2em]">Energy Saved</div>
                  </div>
                  {/* Decorative arc */}
                  <svg className="absolute -bottom-6 left-0 right-0 w-full" viewBox="0 0 400 30" fill="none">
                    <path d="M0 30 Q200 0 400 30" fill="white" />
                  </svg>
                </div>

                {/* Content */}
                <div className="px-6 pb-6 pt-4">
                  <h3 className="text-lg font-bold text-teal-800">{c.name}</h3>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Icon name="mapPin" className="w-3 h-3" />
                      {c.location}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span>Built {c.yearBuilt}</span>
                  </div>
                  <p className="mt-4 text-sm text-gray-500 leading-relaxed">{c.summary}</p>

                  {/* Savings bar visualization */}
                  <div className="mt-5 pt-4 border-t border-sage-50">
                    <div className="flex items-center justify-between text-[11px] font-medium text-gray-400 mb-2">
                      <span>Before</span>
                      <span className="text-sage-600 font-bold">After</span>
                    </div>
                    <div className="relative h-2 bg-sage-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${100 - parseInt(c.savings)}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full"
                      />
                    </div>
                    <div className="relative h-2 bg-sage-100 rounded-full overflow-hidden mt-1.5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${100 - parseInt(c.savings)}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-sage-400 to-teal-500 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ CTA SECTION ═══════════════ */}
      <section className="relative py-24 sm:py-32 bg-gradient-to-br from-teal-800 via-teal-900 to-sage-900 overflow-hidden">
        {/* Organic background shapes */}
        <OrganicBlob className="absolute -top-20 -right-20 w-[400px] h-[400px] text-sage-700/20" />
        <OrganicBlob className="absolute -bottom-32 -left-32 w-[500px] h-[500px] text-teal-700/20 rotate-180" />

        <div className="relative max-w-4xl mx-auto px-5 sm:px-8 text-center">
          <motion.div {...fadeUp}>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-4 py-2 mb-8">
              <Icon name="leaf" className="w-4 h-4 text-sage-300" />
              <span className="text-xs font-semibold text-sage-200 uppercase tracking-wider">Start Saving Today</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Ready to transform your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sage-300 to-gold-300">home's efficiency?</span>
            </h2>

            <p className="mt-6 text-lg text-sage-300/70 max-w-xl mx-auto leading-relaxed">
              Get a free energy assessment and custom efficiency plan. Most homeowners discover $500+ in annual savings potential.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href="tel:+13035550123" className="group inline-flex items-center gap-3 bg-white text-teal-800 font-bold px-8 py-4 rounded-2xl hover:bg-sage-50 transition-all shadow-2xl shadow-black/20 hover:-translate-y-0.5">
                <Icon name="phone" className="w-5 h-5" />
                (303) 555-0123
              </a>
              <a href="#services" className="inline-flex items-center gap-3 border-2 border-sage-400/40 text-sage-200 font-semibold px-8 py-4 rounded-2xl hover:bg-white/5 hover:border-sage-400/60 transition-all">
                View Solutions
                <Icon name="arrow" className="w-4 h-4" />
              </a>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-sage-400/60">
              <span className="flex items-center gap-2">
                <Icon name="shield" className="w-4 h-4" />
                Licensed & Insured
              </span>
              <span className="flex items-center gap-2">
                <Icon name="bolt" className="w-4 h-4" />
                Same-Day Service
              </span>
              <span className="flex items-center gap-2">
                <Icon name="leaf" className="w-4 h-4" />
                Eco-Certified
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="bg-teal-950 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-teal-800/50">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sage-500 to-teal-600 flex items-center justify-center text-white">
                  <Icon name="leaf" className="w-4 h-4" />
                </div>
                <span className="font-bold text-lg text-white">EcoBreeze</span>
              </div>
              <p className="text-sm text-sage-400/60 leading-relaxed max-w-xs">
                Premium efficiency HVAC systems for homes that care about comfort and the planet.
              </p>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-xs font-bold text-sage-400 uppercase tracking-wider mb-4">Services</h4>
              <ul className="space-y-2.5 text-sm text-sage-300/50">
                <li><a href="#services" className="hover:text-sage-300 transition-colors">High-Efficiency AC</a></li>
                <li><a href="#services" className="hover:text-sage-300 transition-colors">Heat Pump Systems</a></li>
                <li><a href="#services" className="hover:text-sage-300 transition-colors">Smart Thermostats</a></li>
                <li><a href="#services" className="hover:text-sage-300 transition-colors">Duct Optimization</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-xs font-bold text-sage-400 uppercase tracking-wider mb-4">Company</h4>
              <ul className="space-y-2.5 text-sm text-sage-300/50">
                <li><a href="#process" className="hover:text-sage-300 transition-colors">Our Process</a></li>
                <li><a href="#results" className="hover:text-sage-300 transition-colors">Case Studies</a></li>
                <li><a href="#savings" className="hover:text-sage-300 transition-colors">Rebates</a></li>
                <li><a href="#technology" className="hover:text-sage-300 transition-colors">Technology</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xs font-bold text-sage-400 uppercase tracking-wider mb-4">Contact</h4>
              <ul className="space-y-2.5 text-sm text-sage-300/50">
                <li className="flex items-center gap-2">
                  <Icon name="phone" className="w-3.5 h-3.5 text-sage-500" />
                  (303) 555-0123
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="mapPin" className="w-3.5 h-3.5 text-sage-500" />
                  789 Green Way, Denver, CO
                </li>
                <li className="text-sage-400/40 text-xs mt-2">Mon-Fri 7am-6pm | Sat 8am-4pm</li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-sage-500/40">
              &copy; {new Date().getFullYear()} EcoBreeze Efficiency HVAC. All rights reserved.
            </p>
            <div className="flex items-center gap-1 text-xs text-sage-500/40">
              <Icon name="leaf" className="w-3 h-3" />
              <span>Committed to a sustainable future</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
