import { useState, useEffect, useRef, type FC } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  siteInfo,
  services,
  transformationItems,
  materials,
  processSteps,
  budgetGuides,
  trustItems,
  navLinks,
  contactInfo,
  type ServiceItem,
  type MaterialItem,
  type BudgetGuide,
  type ProcessStep,
  type TransformationItem,
  type TrustItem,
} from './data';

/* ── SVG Icons ── */

const GridIcon: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const FireIcon: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);

const LayersIcon: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const SunIcon: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const ArrowRightIcon: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const ArrowDownIcon: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <polyline points="19 12 12 19 5 12" />
  </svg>
);

const CheckIcon: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const MenuIcon: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ShieldIcon: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const ClipboardIcon: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
  </svg>
);

const ClockIcon: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const CameraIcon: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const PhoneIcon: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const EmailIcon: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const HomeIcon: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const StarIcon: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const trustIcons: Record<string, FC<{ className?: string }>> = {
  shield: ShieldIcon,
  clipboard: ClipboardIcon,
  clock: ClockIcon,
  camera: CameraIcon,
};

const serviceIcons: Record<string, FC<{ className?: string }>> = {
  grid: GridIcon,
  fire: FireIcon,
  layers: LayersIcon,
  sun: SunIcon,
  'arrow-right': ArrowRightIcon,
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
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between h-16 md:h-20">
        <a href="#" className="font-heading text-xl md:text-2xl text-charcoal-800 tracking-tight flex items-center gap-2">
          <GridIcon className="w-5 h-5 text-copper-500" />
          Stone<span className="text-copper-500">&amp;</span>Bloom
        </a>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-charcoal-600 hover:text-copper-500 transition-colors font-medium tracking-wide"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-charcoal-800 text-white px-5 py-2.5 rounded-md text-sm font-semibold hover:bg-charcoal-700 transition-colors"
          >
            Start a Project
          </a>
        </nav>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-charcoal-700"
          aria-label="Menu"
        >
          {mobileOpen ? <CloseIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
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
            <div className="px-5 py-5 flex flex-col gap-3">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="text-sm text-charcoal-600 py-1">
                  {l.label}
                </a>
              ))}
              <a href="#contact" onClick={() => setMobileOpen(false)} className="bg-charcoal-800 text-white text-center px-5 py-2.5 rounded-md text-sm font-semibold">
                Start a Project
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

/* ── Section: Hero ── */

const HeroSection: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url('${siteInfo.heroImage}')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/70 via-charcoal-900/50 to-copper-900/60" />
      </motion.div>
      <div className="relative z-10 max-w-7xl mx-auto px-5 w-full">
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-copper-400 text-xs uppercase tracking-[0.25em] font-semibold"
          >
            {siteInfo.location}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-4xl md:text-6xl lg:text-7xl text-white leading-tight mt-4"
          >
            {siteInfo.tagline}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="text-limestone-300/70 text-base md:text-lg mt-5 max-w-xl leading-relaxed"
          >
            {siteInfo.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a
              href="#contact"
              className="bg-copper-500 text-white px-7 py-3 rounded-md text-sm font-semibold hover:bg-copper-600 transition-colors"
            >
              Get a Free Estimate
            </a>
            <a
              href="#services"
              className="border border-limestone-600/30 text-limestone-200 px-7 py-3 rounded-md text-sm font-semibold hover:bg-white/5 transition-colors"
            >
              View Services
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
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-limestone-500"
        >
          <ArrowDownIcon className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
};

/* ── Section: Services ── */

const ServicesSection: FC = () => (
  <section id="services" className="py-20 md:py-28 px-5">
    <div className="max-w-7xl mx-auto">
      <motion.div className="text-center mb-14">
        <span className="text-copper-500 text-xs uppercase tracking-[0.25em] font-semibold">What We Build</span>
        <h2 className="text-3xl md:text-4xl text-charcoal-800 mt-2">Outdoor Living Services</h2>
        <p className="text-charcoal-400 mt-3 max-w-xl mx-auto">
          From patios to pergolas to full outdoor kitchens — each project is built to last decades.
        </p>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((s: ServiceItem, i: number) => {
          const IconComp = serviceIcons[s.icon] || GridIcon;
          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group bg-limestone-50 rounded-xl p-6 border border-limestone-200 hover:border-copper-300 hover:shadow-lg transition-all duration-300"
            >
              <IconComp className="w-8 h-8 text-copper-400 block mb-3" />
              <h3 className="font-heading text-xl text-charcoal-800 mb-2 group-hover:text-copper-600 transition-colors">{s.title}</h3>
              <p className="text-charcoal-400 text-sm leading-relaxed mb-3">{s.description}</p>
              <span className="text-xs text-copper-500 font-semibold uppercase tracking-wider">{s.highlight}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

/* ── Section: Horizontal Scroll Transformation Showcase ── */

const TransformationShowcase: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 0.8], ['0%', '-60%']);

  return (
    <section id="transformations" ref={containerRef} className="py-20 md:py-28 px-5 bg-limestone-50 overflow-hidden">
      <div className="max-w-7xl mx-auto mb-12">
        <motion.div className="text-center">
          <span className="text-copper-500 text-xs uppercase tracking-[0.25em] font-semibold">Transformations</span>
          <h2 className="text-3xl md:text-4xl text-charcoal-800 mt-2">Before & After</h2>
          <p className="text-charcoal-400 mt-3 max-w-md mx-auto">Scroll through real projects we have delivered.</p>
        </motion.div>
      </div>
      <div className="relative">
        <motion.div style={{ x }} className="flex gap-6 px-5 w-max">
          {transformationItems.map((item: TransformationItem) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02 }}
              className="w-[350px] md:w-[450px] flex-shrink-0 bg-white rounded-2xl border border-limestone-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex">
                  <div className="w-1/2 h-full bg-gradient-to-r from-black/30 to-transparent flex items-center justify-center">
                    <span className="text-white/70 text-xs font-semibold uppercase tracking-wider">Before</span>
                  </div>
                  <div className="w-1/2 h-full flex items-center justify-end pr-3">
                    <span className="bg-copper-500 text-white text-xs font-semibold px-2 py-0.5 rounded uppercase tracking-wider">After</span>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-heading text-lg text-charcoal-800">{item.title}</h3>
                <p className="text-charcoal-400 text-sm mt-2 leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ── Section: Materials ── */

const MaterialsSection: FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="materials" className="py-20 md:py-28 px-5">
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-14">
          <span className="text-copper-500 text-xs uppercase tracking-[0.25em] font-semibold">Materials</span>
          <h2 className="text-3xl md:text-4xl text-charcoal-800 mt-2">What We Build With</h2>
          <p className="text-charcoal-400 mt-3 max-w-xl mx-auto">
            Only materials that can withstand Texas heat, freeze-thaw cycles, and decades of use.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {materials.map((m: MaterialItem, i: number) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              onMouseEnter={() => setHoveredId(m.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`relative rounded-xl p-6 border-2 cursor-default transition-all duration-300 ${
                hoveredId === m.id ? 'border-copper-300 bg-copper-50/30' : 'border-limestone-200 bg-white'
              }`}
            >
              <motion.div
                animate={hoveredId === m.id ? { scale: 1.03 } : { scale: 1 }}
                className="flex items-start justify-between mb-3"
              >
                <h3 className="font-heading text-lg text-charcoal-800">{m.name}</h3>
                <span className="text-xs text-copper-400 font-semibold">{m.texture}</span>
              </motion.div>
              <p className="text-charcoal-400 text-sm leading-relaxed">{m.description}</p>
              <div className="mt-3 pt-3 border-t border-limestone-100">
                <span className="text-xs text-charcoal-300 uppercase tracking-wider font-semibold">Best for </span>
                <span className="text-xs text-charcoal-500">{m.bestFor}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── Section: Process ── */

const ProcessSection: FC = () => (
  <section id="process" className="py-20 md:py-28 px-5 bg-limestone-50">
    <div className="max-w-5xl mx-auto">
      <motion.div className="text-center mb-14">
        <span className="text-copper-500 text-xs uppercase tracking-[0.25em] font-semibold">How It Works</span>
        <h2 className="text-3xl md:text-4xl text-charcoal-800 mt-2">Project Process</h2>
        <p className="text-charcoal-400 mt-3 max-w-lg mx-auto">
          A transparent, repeatable process that keeps your project on time and on budget.
        </p>
      </motion.div>
      <div className="relative">
        <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-copper-400 via-copper-300 to-transparent hidden md:block" />
        {processSteps.map((ps: ProcessStep, i: number) => (
          <motion.div
            key={ps.step}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: i * 0.12 }}
            className="relative pl-0 md:pl-16 pb-10 last:pb-0"
          >
            <div className="hidden md:flex absolute left-4 top-1 w-5 h-5 rounded-full bg-copper-500 border-4 border-limestone-50 items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
            <div className="bg-white rounded-xl p-6 md:p-8 border border-limestone-200 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-copper-100 text-copper-600 text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center">
                  {ps.step}
                </span>
                <h3 className="font-heading text-xl text-charcoal-800">{ps.title}</h3>
              </div>
              <p className="text-charcoal-400 text-sm leading-relaxed ml-10">{ps.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ── Section: Budget Guide ── */

const BudgetGuideSection: FC = () => (
  <section id="budget" className="py-20 md:py-28 px-5">
    <div className="max-w-6xl mx-auto">
      <motion.div className="text-center mb-14">
        <span className="text-copper-500 text-xs uppercase tracking-[0.25em] font-semibold">Planning</span>
        <h2 className="text-3xl md:text-4xl text-charcoal-800 mt-2">Budget Guide</h2>
        <p className="text-charcoal-400 mt-3 max-w-lg mx-auto">
          Rough budget ranges to help you plan. Every project gets a detailed line-item quote.
        </p>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {budgetGuides.map((bg: BudgetGuide, i: number) => (
          <motion.div
            key={bg.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-2xl p-6 border-2 relative ${
              bg.popular ? 'border-copper-500 bg-copper-50/30' : 'border-limestone-200 bg-white'
            }`}
          >
            {bg.popular && (
              <span className="absolute -top-3 left-6 bg-copper-500 text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full tracking-wider">
                Most Common
              </span>
            )}
            <h3 className="font-heading text-xl text-charcoal-800 mb-1">{bg.label}</h3>
            <p className="text-2xl font-bold text-copper-600 mb-4">{bg.range}</p>
            <ul className="space-y-2">
              {bg.includes.map((inc) => (
                <li key={inc} className="flex items-start gap-2 text-sm text-charcoal-600">
                  <CheckIcon className="w-4 h-4 text-copper-500 mt-0.5 flex-shrink-0" />
                  {inc}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-center text-charcoal-400 text-sm mt-8 max-w-lg mx-auto"
      >
        Final pricing depends on material selection, site conditions, and scope. Every quote is a fixed price with clear line items.
      </motion.p>
    </div>
  </section>
);

/* ── Section: Trust ── */

const TrustSection: FC = () => (
  <section className="py-20 md:py-28 px-5 bg-charcoal-800 text-white">
    <div className="max-w-6xl mx-auto">
      <motion.div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl">Why Trust Stone &amp; Bloom</h2>
        <p className="text-limestone-400 mt-3 max-w-lg mx-auto">
          We treat your property like our own. Here is what that means.
        </p>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {trustItems.map((t: TrustItem, i: number) => {
          const IconComp = trustIcons[t.icon] || ShieldIcon;
          return (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <IconComp className="w-8 h-8 text-copper-400 block mb-3" />
              <h3 className="font-heading text-lg mb-2">{t.title}</h3>
              <p className="text-limestone-400 text-sm leading-relaxed">{t.description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

/* ── Section: Contact / Project Inquiry ── */

const ContactSection: FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [projectType, setProjectType] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const projectTypes = ['Patio', 'Pergola', 'Fire Pit', 'Outdoor Kitchen', 'Retaining Wall', 'Full Yard', 'Other'];

  return (
    <section id="contact" className="py-20 md:py-28 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div>
            <span className="text-copper-500 text-xs uppercase tracking-[0.25em] font-semibold">Get Started</span>
            <h2 className="text-3xl md:text-4xl text-charcoal-800 mt-2">Ready to Build?</h2>
            <p className="text-charcoal-400 mt-3 text-sm leading-relaxed max-w-md">
              Tell us about your project and we will schedule a free on-site consultation. No obligation, no pressure.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-sm text-charcoal-500">
                <PhoneIcon className="w-5 h-5 text-copper-500" />
                {contactInfo.phone}
              </div>
              <div className="flex items-center gap-3 text-sm text-charcoal-500">
                <EmailIcon className="w-5 h-5 text-copper-500" />
                {contactInfo.email}
              </div>
              <div className="flex items-center gap-3 text-sm text-charcoal-500">
                <HomeIcon className="w-5 h-5 text-copper-500" />
                {contactInfo.address}
              </div>
            </div>
          </motion.div>
          <div>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-limestone-50 rounded-2xl p-8 border border-limestone-200"
              >
                <StarIcon className="w-12 h-12 text-copper-500 block mb-3" />
                <h3 className="font-heading text-xl text-charcoal-800 mb-2">Project Inquiry Received</h3>
                <p className="text-charcoal-400 text-sm">We will review your project details and reach out within 1 business day to schedule your free on-site consultation.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input required type="text" placeholder="Full name" className="w-full border border-limestone-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-copper-400" />
                  <input required type="email" placeholder="Email address" className="w-full border border-limestone-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-copper-400" />
                </div>
                <input required type="tel" placeholder="Phone number" className="w-full border border-limestone-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-copper-400" />
                <input type="text" placeholder="Property address" className="w-full border border-limestone-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-copper-400" />
                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal-400 mb-2 font-semibold">Project Type</label>
                  <div className="flex flex-wrap gap-2">
                    {projectTypes.map((pt) => (
                      <button
                        key={pt}
                        type="button"
                        onClick={() => setProjectType(pt === projectType ? '' : pt)}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                          projectType === pt ? 'bg-copper-500 text-white border-copper-500' : 'bg-white text-charcoal-500 border-limestone-200 hover:border-copper-300'
                        }`}
                      >
                        {pt}
                      </button>
                    ))}
                  </div>
                </div>
                <textarea rows={3} placeholder="Tell us about your project..." className="w-full border border-limestone-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-copper-400 resize-none" />
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  className="w-full bg-copper-500 text-white py-3 rounded-lg text-sm font-semibold hover:bg-copper-600 transition-colors"
                >
                  Submit Inquiry
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
  <footer className="bg-charcoal-900 text-limestone-400 py-14 px-5">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-4 gap-8 mb-10">
        <div className="md:col-span-2">
          <h4 className="font-heading text-xl text-white mb-3 flex items-center gap-2">
            <GridIcon className="w-5 h-5 text-copper-500" /> Stone &amp; Bloom
          </h4>
          <p className="text-limestone-500 text-sm leading-relaxed max-w-sm">{siteInfo.description}</p>
        </div>
        <div>
          <h4 className="font-heading text-white mb-3">Services</h4>
          <ul className="space-y-1.5 text-sm">
            {services.slice(0, 4).map((s) => (
              <li key={s.id} className="text-limestone-400 hover:text-white transition-colors cursor-default">{s.title}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-heading text-white mb-3">Contact</h4>
          <p className="text-sm flex items-center gap-1"><PhoneIcon className="w-3.5 h-3.5" /> {contactInfo.phone}</p>
          <p className="text-sm">{contactInfo.email}</p>
        </div>
      </div>
      <div className="border-t border-charcoal-700 pt-6 text-center text-xs text-limestone-500">
        &copy; {new Date().getFullYear()} Stone &amp; Bloom. All rights reserved.
      </div>
    </div>
  </footer>
);

/* ── Main App ── */

const App: FC = () => (
  <div className="font-body text-charcoal-800 antialiased">
    <NavBar />
    <main>
      <HeroSection />
      <ServicesSection />
      <TransformationShowcase />
      <MaterialsSection />
      <ProcessSection />
      <BudgetGuideSection />
      <TrustSection />
      <ContactSection />
    </main>
    <Footer />
  </div>
);

export default App;
