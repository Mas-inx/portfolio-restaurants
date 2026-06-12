import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { efficiencyServices, upgradeSteps, smartFeatures, rebates, caseExamples, heroImage } from './data';

/* ─── Unsplash section images ─── */
const sectionImages = {
  statsBg: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=85',
  service1: 'https://images.unsplash.com/photo-1631545806609-29dad2b04773?w=800&q=85',
  service2: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=85',
  service3: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=85',
  service4: 'https://images.unsplash.com/photo-1585128792020-803d29415281?w=800&q=85',
  service5: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=85',
  service6: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=85',
  case1: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=85',
  case2: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=85',
  case3: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=85',
  upgrade1: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=85',
  upgrade2: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=85',
  upgrade3: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=85',
  upgrade4: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=85',
  smartBg: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1600&q=85',
  ctaBg: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&q=85',
  divider1: 'https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=1600&q=85',
};

/* ─── Animation presets ─── */
const fadeUp = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.8 },
};

const stagger = {
  whileInView: { transition: { staggerChildren: 0.12 } },
  viewport: { once: true, margin: '-40px' },
};

/* ─── Animated Counter ─── */
function Counter({ end, suffix = '', prefix = '' }: { end: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  if (isInView && value === 0) {
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setValue(end);
        clearInterval(timer);
      } else {
        setValue(start);
      }
    }, 16);
  }

  return <span ref={ref}>{prefix}{value.toLocaleString()}{suffix}</span>;
}

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
    search: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    pencil: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
    wrench: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    check: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
  };
  return <>{icons[name] || <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><circle cx="12" cy="12" r="10" /></svg>}</>;
}

/* ─── Service images map ─── */
const serviceImages = [
  sectionImages.service1,
  sectionImages.service2,
  sectionImages.service3,
  sectionImages.service4,
  sectionImages.service5,
  sectionImages.service6,
];

const caseImages = [sectionImages.case1, sectionImages.case2, sectionImages.case3];
const upgradeImages = [sectionImages.upgrade1, sectionImages.upgrade2, sectionImages.upgrade3, sectionImages.upgrade4];
const upgradeIcons = ['search', 'pencil', 'wrench', 'chart'];

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-gray-800 antialiased overflow-x-hidden font-[Inter,system-ui,sans-serif]">

      {/* ═══════════════ HEADER ═══════════════ */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="bg-[#F8F7F4]/80 backdrop-blur-xl border-b border-[#84A98C]/10">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#84A98C] to-[#1B4332] flex items-center justify-center text-white shadow-lg shadow-[#1B4332]/20">
                <Icon name="leaf" className="w-4.5 h-4.5" />
              </div>
              <span className="font-bold text-lg tracking-tight text-[#1B4332]">EcoBreeze</span>
            </a>

            <nav className="hidden md:flex items-center gap-8">
              {[
                { label: 'Services', href: '#services' },
                { label: 'Process', href: '#process' },
                { label: 'Savings', href: '#savings' },
                { label: 'Stories', href: '#stories' },
              ].map(item => (
                <a key={item.label} href={item.href} className="text-sm font-medium text-gray-500 hover:text-[#1B4332] transition-colors">
                  {item.label}
                </a>
              ))}
              <a href="tel:+130****0123" className="inline-flex items-center gap-2 bg-[#1B4332] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#1B4332]/90 transition-all shadow-lg shadow-[#1B4332]/20">
                <Icon name="phone" className="w-3.5 h-3.5" />
                Free Assessment
              </a>
            </nav>

            <button onClick={() => setNavOpen(!navOpen)} className="md:hidden p-2 text-[#1B4332] rounded-lg">
              <Icon name={navOpen ? 'close' : 'menu'} className="w-6 h-6" />
            </button>
          </div>
        </div>

        {navOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-b border-sage-100 px-5 pb-5 pt-2 space-y-1"
          >
            {[
              { label: 'Services', href: '#services' },
              { label: 'Process', href: '#process' },
              { label: 'Savings', href: '#savings' },
              { label: 'Stories', href: '#stories' },
            ].map(item => (
              <a key={item.label} href={item.href} onClick={() => setNavOpen(false)} className="block py-2.5 text-gray-600 font-medium hover:text-[#1B4332] transition-colors">
                {item.label}
              </a>
            ))}
            <a href="tel:+130****0123" className="block mt-3 bg-[#1B4332] text-white text-center py-3 rounded-xl font-semibold">
              Free Assessment
            </a>
          </motion.div>
        )}
      </header>

      {/* ═══════════════ 1. HERO — Full-screen dramatic ═══════════════ */}
      <section className="relative h-screen min-h-[700px] overflow-hidden">
        {/* Background image with parallax */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 scale-110">
          <img src={heroImage} alt="Modern efficient home" className="w-full h-full object-cover" />
        </motion.div>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1B4332]/70 via-[#1B4332]/40 to-[#1B4332]/80" />

        {/* Content */}
        <motion.div style={{ opacity: heroOpacity }} className="relative h-full flex flex-col items-center justify-center text-center px-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white tracking-tight leading-[0.95] max-w-5xl">
              Live <span className="text-[#D4A373]">beautifully.</span>
              <br />Save <span className="text-[#84A98C]">effortlessly.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/70 max-w-lg mx-auto font-light">
              Premium HVAC efficiency for the modern home.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href="#services" className="inline-flex items-center gap-3 bg-white text-[#1B4332] font-bold px-8 py-4 rounded-full hover:bg-[#D4A373] hover:text-white transition-all duration-300 shadow-2xl">
                Explore Solutions
                <Icon name="arrow" className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Floating savings calculator card */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 w-[90%] max-w-md"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#84A98C] uppercase tracking-wider">Est. Annual Savings</div>
                  <div className="text-3xl font-extrabold text-[#1B4332] mt-1">$680<span className="text-base font-medium text-gray-400">/yr</span></div>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#84A98C] to-[#1B4332] flex items-center justify-center text-white">
                  <Icon name="bolt" className="w-7 h-7" />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm">
                <span className="text-gray-500">Up to 50% energy reduction</span>
                <span className="text-[#D4A373] font-bold">Learn more →</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden sm:block"
          style={{ bottom: '200px' }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-3 rounded-full bg-white/60" />
          </div>
        </motion.div>
      </section>

      {/* ═══════════════ 2. STATS BAR — Full-width with background ═══════════════ */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={sectionImages.statsBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#1B4332]/85" />
        </div>
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
          <motion.div {...stagger} className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 text-center">
            {[
              { value: 2000, suffix: '+', label: 'Homes Upgraded', icon: 'home' },
              { value: 48, suffix: '%', label: 'Avg Energy Saved', icon: 'trending' },
              { value: 1200, suffix: 'T', label: 'CO₂ Reduced (tons)', icon: 'leaf' },
            ].map((stat, i) => (
              <motion.div key={i} {...fadeUp} className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#84A98C]/20 flex items-center justify-center text-[#84A98C] mb-4">
                  <Icon name={stat.icon} className="w-5 h-5" />
                </div>
                <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white">
                  <Counter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-2 text-sm text-white/60 font-medium uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ 3. SERVICES — Horizontal scrollable gallery ═══════════════ */}
      <section id="services" className="py-24 sm:py-32 bg-[#F8F7F4]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-12">
          <motion.div {...fadeUp}>
            <span className="text-xs font-bold text-[#D4A373] uppercase tracking-[0.25em]">What We Do</span>
            <h2 className="mt-3 text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#1B4332] tracking-tight leading-tight">
              Efficiency, reimagined.
            </h2>
          </motion.div>
        </div>

        {/* Horizontal scrolling gallery */}
        <div className="overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide">
          <div className="flex gap-5 px-5 sm:px-8 w-max">
            {efficiencyServices.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="snap-center shrink-0 w-[320px] sm:w-[400px] lg:w-[460px] group"
              >
                <div className="relative h-[420px] sm:h-[500px] rounded-3xl overflow-hidden cursor-pointer">
                  <img
                    src={serviceImages[i]}
                    alt={s.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-[#1B4332]/0 group-hover:bg-[#1B4332]/20 transition-colors duration-500" />

                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white mb-4">
                      <Icon name={s.icon} className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">{s.title}</h3>
                    <p className="mt-2 text-sm text-white/70 leading-relaxed line-clamp-2">{s.desc}</p>
                  </div>

                  {/* Top-right badge */}
                  <div className="absolute top-5 right-5 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-bold text-white">
                    0{i + 1}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 mt-6 flex items-center gap-3 text-sm text-gray-400">
          <Icon name="arrow" className="w-4 h-4 rotate-180" />
          <span>Scroll to explore all services</span>
        </div>
      </section>

      {/* ═══════════════ IMAGE DIVIDER 1 ═══════════════ */}
      <section className="relative h-[40vh] sm:h-[50vh] overflow-hidden">
        <img src={sectionImages.divider1} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#1B4332]/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div {...fadeIn} className="text-center px-5">
            <p className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight max-w-3xl leading-tight">
              "The greenest energy is the energy you don't use."
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ 4. SAVINGS SPOTLIGHT — Dark teal + gold ═══════════════ */}
      <section id="savings" className="relative py-24 sm:py-32 bg-[#1B4332] overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="text-xs font-bold text-[#D4A373] uppercase tracking-[0.25em]">Financial Incentives</span>
            <h2 className="mt-3 text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
              Save <span className="text-[#D4A373]">thousands.</span>
            </h2>
          </motion.div>

          <motion.div {...stagger} className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {rebates.map((r, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 sm:p-8 hover:bg-white/10 hover:border-[#D4A373]/30 transition-all duration-500"
              >
                <div className="text-[#D4A373]/60 mb-3">
                  <Icon name="dollar" className="w-6 h-6" />
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-none mb-2">
                  {r.amount.replace('Up to ', '')}
                </div>
                {r.amount.includes('Up to') && (
                  <div className="text-xs text-[#D4A373] font-bold uppercase tracking-wider mb-1">up to</div>
                )}
                <div className="text-sm font-bold text-white/80 mt-3">{r.name}</div>
                <p className="mt-2 text-xs text-white/40 leading-relaxed">{r.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Total callout */}
          <motion.div {...fadeUp} className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 bg-[#D4A373]/10 border border-[#D4A373]/20 rounded-full px-6 py-3">
              <Icon name="shield" className="w-5 h-5 text-[#D4A373]" />
              <span className="text-sm font-semibold text-white/80">
                Total potential: <span className="text-[#D4A373] font-extrabold text-lg">$4,600</span> in rebates
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ 5. SUCCESS STORIES — Lifestyle photos ═══════════════ */}
      <section id="stories" className="py-24 sm:py-32 bg-[#F8F7F4]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-16">
          <motion.div {...fadeUp}>
            <span className="text-xs font-bold text-[#84A98C] uppercase tracking-[0.25em]">Proven Results</span>
            <h2 className="mt-3 text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#1B4332] tracking-tight">
              Real homes. Real savings.
            </h2>
          </motion.div>
        </div>

        <motion.div {...stagger} className="max-w-7xl mx-auto px-5 sm:px-8 grid md:grid-cols-3 gap-6">
          {caseExamples.map((c, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              className="group relative rounded-3xl overflow-hidden h-[480px] sm:h-[540px] cursor-pointer"
            >
              <img
                src={caseImages[i]}
                alt={c.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Giant savings badge */}
              <div className="absolute top-5 right-5">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#D4A373] flex flex-col items-center justify-center shadow-xl">
                  <span className="text-2xl sm:text-3xl font-extrabold text-white leading-none">{c.savings}</span>
                  <span className="text-[9px] font-bold text-white/80 uppercase">saved</span>
                </div>
              </div>

              {/* Bottom content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-white">{c.name}</h3>
                <div className="flex items-center gap-3 mt-2 text-sm text-white/60">
                  <span className="flex items-center gap-1">
                    <Icon name="mapPin" className="w-3.5 h-3.5" />
                    {c.location}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/40" />
                  <span>Built {c.yearBuilt}</span>
                </div>
                <p className="mt-3 text-sm text-white/50 leading-relaxed line-clamp-2">{c.summary}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ═══════════════ IMAGE DIVIDER 2 ═══════════════ */}
      <section className="relative h-[30vh] sm:h-[40vh] overflow-hidden">
        <img src={sectionImages.service5} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B4332]/80 to-transparent" />
        <div className="absolute inset-0 flex items-center px-5 sm:px-16">
          <motion.div {...fadeIn}>
            <p className="text-xl sm:text-3xl font-extrabold text-white max-w-lg leading-tight">
              Every upgrade pays for itself.
            </p>
            <p className="mt-2 text-white/60 text-sm sm:text-base">Average ROI: 3-5 years</p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ 6. UPGRADE PATH — Infographic flow ═══════════════ */}
      <section id="process" className="py-24 sm:py-32 bg-[#F8F7F4]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-16">
          <motion.div {...fadeUp} className="text-center">
            <span className="text-xs font-bold text-[#D4A373] uppercase tracking-[0.25em]">Your Journey</span>
            <h2 className="mt-3 text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#1B4332] tracking-tight">
              Four steps to efficiency.
            </h2>
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {upgradeSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="group relative"
              >
                {/* Image */}
                <div className="relative h-48 rounded-2xl overflow-hidden mb-5">
                  <img
                    src={upgradeImages[i]}
                    alt={step.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#1B4332]/30 group-hover:bg-[#1B4332]/10 transition-colors" />
                  {/* Step number */}
                  <div className="absolute top-3 left-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-sm font-extrabold text-[#1B4332]">{step.step}</span>
                  </div>
                  {/* Icon */}
                  <div className="absolute bottom-3 right-3 w-10 h-10 rounded-xl bg-[#D4A373] flex items-center justify-center text-white">
                    <Icon name={upgradeIcons[i]} className="w-5 h-5" />
                  </div>
                </div>

                {/* Text */}
                <h3 className="text-lg font-bold text-[#1B4332]">{step.title}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{step.desc}</p>

                {/* Connector arrow (hidden on last) */}
                {i < 3 && (
                  <div className="hidden lg:block absolute top-24 -right-3 z-10">
                    <div className="w-6 h-6 rounded-full bg-[#84A98C] flex items-center justify-center">
                      <Icon name="arrow" className="w-3 h-3 text-white" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 7. SMART FEATURES — Split-screen ═══════════════ */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img src={sectionImages.smartBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#1B4332]/90" />
        </div>

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Image card */}
            <motion.div {...fadeUp} className="relative">
              <div className="relative rounded-3xl overflow-hidden h-[400px] sm:h-[500px]">
                <img
                  src={sectionImages.service3}
                  alt="Smart home technology"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B4332]/50 to-transparent" />
              </div>
              {/* Floating stat */}
              <div className="absolute -bottom-6 -right-4 sm:right-8 bg-white rounded-2xl p-5 shadow-2xl">
                <div className="text-xs text-gray-400 font-medium">Smart savings</div>
                <div className="text-2xl font-extrabold text-[#1B4332]">23%</div>
                <div className="text-xs text-[#84A98C] font-bold">extra efficiency</div>
              </div>
            </motion.div>

            {/* Right: Feature list */}
            <div>
              <motion.div {...fadeUp}>
                <span className="text-xs font-bold text-[#D4A373] uppercase tracking-[0.25em]">Smart Technology</span>
                <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  Intelligence built in.
                </h2>
                <p className="mt-4 text-white/50 text-lg leading-relaxed">
                  Modern HVAC that thinks ahead.
                </p>
              </motion.div>

              <motion.div {...stagger} className="mt-10 space-y-5">
                {smartFeatures.map((f, i) => (
                  <motion.div
                    key={i}
                    {...fadeUp}
                    className="flex items-start gap-4 group"
                  >
                    <div className="shrink-0 w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-[#84A98C] group-hover:bg-[#84A98C]/20 transition-colors">
                      <Icon name={f.icon} className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">{f.title}</h3>
                      <p className="mt-1 text-sm text-white/50 leading-relaxed">{f.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ IMAGE DIVIDER 3 ═══════════════ */}
      <section className="relative h-[25vh] sm:h-[30vh] overflow-hidden">
        <img src={sectionImages.upgrade3} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#84A98C]/20" />
      </section>

      {/* ═══════════════ 8. CTA — Full-width background ═══════════════ */}
      <section className="relative py-32 sm:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <img src={sectionImages.ctaBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#1B4332]/75" />
        </div>

        <div className="relative max-w-4xl mx-auto px-5 sm:px-8 text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Ready to <span className="text-[#D4A373]">transform</span>
              <br />your home?
            </h2>
            <p className="mt-6 text-lg text-white/60 max-w-lg mx-auto">
              Free energy assessment. Most homeowners discover $500+ in annual savings.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href="tel:+130****0123" className="group inline-flex items-center gap-3 bg-white text-[#1B4332] font-bold px-8 py-4 rounded-full hover:bg-[#D4A373] hover:text-white transition-all duration-300 shadow-2xl">
                <Icon name="phone" className="w-5 h-5" />
                (303) 555-0123
              </a>
              <a href="#services" className="inline-flex items-center gap-3 border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-all">
                View Solutions
                <Icon name="arrow" className="w-4 h-4" />
              </a>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-white/40">
              <span className="flex items-center gap-2"><Icon name="shield" className="w-4 h-4" /> Licensed & Insured</span>
              <span className="flex items-center gap-2"><Icon name="bolt" className="w-4 h-4" /> Same-Day Service</span>
              <span className="flex items-center gap-2"><Icon name="leaf" className="w-4 h-4" /> Eco-Certified</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="bg-[#0f2d22] pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#84A98C] to-[#1B4332] flex items-center justify-center text-white">
                  <Icon name="leaf" className="w-4 h-4" />
                </div>
                <span className="font-bold text-lg text-white">EcoBreeze</span>
              </div>
              <p className="text-sm text-white/40 leading-relaxed max-w-xs">
                Premium efficiency HVAC for homes that care about comfort and the planet.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-[#84A98C] uppercase tracking-wider mb-4">Services</h4>
              <ul className="space-y-2.5 text-sm text-white/40">
                <li><a href="#services" className="hover:text-white/70 transition-colors">High-Efficiency AC</a></li>
                <li><a href="#services" className="hover:text-white/70 transition-colors">Heat Pump Systems</a></li>
                <li><a href="#services" className="hover:text-white/70 transition-colors">Smart Thermostats</a></li>
                <li><a href="#services" className="hover:text-white/70 transition-colors">Duct Optimization</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-[#84A98C] uppercase tracking-wider mb-4">Company</h4>
              <ul className="space-y-2.5 text-sm text-white/40">
                <li><a href="#process" className="hover:text-white/70 transition-colors">Our Process</a></li>
                <li><a href="#stories" className="hover:text-white/70 transition-colors">Case Studies</a></li>
                <li><a href="#savings" className="hover:text-white/70 transition-colors">Rebates</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-[#84A98C] uppercase tracking-wider mb-4">Contact</h4>
              <ul className="space-y-2.5 text-sm text-white/40">
                <li className="flex items-center gap-2">
                  <Icon name="phone" className="w-3.5 h-3.5 text-[#84A98C]" />
                  (303) 555-0123
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="mapPin" className="w-3.5 h-3.5 text-[#84A98C]" />
                  789 Green Way, Denver, CO
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/30">
              &copy; {new Date().getFullYear()} EcoBreeze Efficiency HVAC. All rights reserved.
            </p>
            <div className="flex items-center gap-1 text-xs text-white/30">
              <Icon name="leaf" className="w-3 h-3" />
              <span>Committed to a sustainable future</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
