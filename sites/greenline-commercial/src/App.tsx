import { useState, useEffect, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  siteInfo,
  industries,
  programs,
  dashboardMetrics,
  qualityItems,
  emergencyServices,
  contractSteps,
  navLinks,
  contactInfo,
  type IndustryItem,
  type ProgramItem,
  type DashboardMetric,
  type QualityItem,
  type ContractStep,
} from './data';

/* ── SVG Icons ── */

const CheckIcon: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ArrowDownIcon: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <polyline points="19 12 12 19 5 12" />
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

const LeafIcon: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

const WaterIcon: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2a8 8 0 0 0-8 8c0 5.33 3.56 12 8 12s8-6.67 8-12a8 8 0 0 0-8-8z" />
    <path d="M12 10v4" />
    <path d="M10 12h4" />
  </svg>
);

const FlowerIcon: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 9c-1.5 0-3-1-3-3 0-1.5 1-3 3-3s3 1.5 3 3c0 2-1.5 3-3 3z" />
    <path d="M12 15c1.5 0 3 1 3 3 0 1.5-1 3-3 3s-3-1.5-3-3c0-2 1.5-3 3-3z" />
    <path d="M9 12c0-1.5-1-3-3-3-1.5 0-3 1-3 3s1.5 3 3 3c2 0 3-1.5 3-3z" />
    <path d="M15 12c0 1.5 1 3 3 3 1.5 0 3-1 3-3s-1.5-3-3-3c-2 0-3 1.5-3 3z" />
  </svg>
);

const LightningIcon: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const TreeIcon: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22v-7" />
    <path d="M12 2C8 2 4 5 4 9c0 3 2 5 2 5h12s2-2 2-5c0-4-4-7-8-7z" />
    <path d="M12 6v4" />
    <path d="M10 8h4" />
  </svg>
);

const SnowflakeIcon: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="2" x2="12" y2="22" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
    <line x1="4.93" y1="19.07" x2="19.07" y2="4.93" />
  </svg>
);

const HomeIcon: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const ShoppingIcon: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const BuildingIcon: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
    <line x1="9" y1="6" x2="9" y2="6.01" />
    <line x1="15" y1="6" x2="15" y2="6.01" />
    <line x1="9" y1="10" x2="9" y2="10.01" />
    <line x1="15" y1="10" x2="15" y2="10.01" />
    <line x1="9" y1="14" x2="9" y2="14.01" />
    <line x1="15" y1="14" x2="15" y2="14.01" />
    <line x1="9" y1="18" x2="15" y2="18" />
    <line x1="4" y1="22" x2="20" y2="22" />
  </svg>
);

const SchoolIcon: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const WarehouseIcon: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 21V9l9-5 9 5v12" />
    <path d="M3 21h18" />
    <line x1="7" y1="13" x2="7" y2="13.01" />
    <line x1="12" y1="13" x2="12" y2="13.01" />
    <line x1="17" y1="13" x2="17" y2="13.01" />
    <line x1="7" y1="17" x2="7" y2="17.01" />
    <line x1="12" y1="17" x2="12" y2="17.01" />
    <line x1="17" y1="17" x2="17" y2="17.01" />
  </svg>
);

const ApartmentIcon: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="4" y="2" width="16" height="20" rx="1" />
    <line x1="9" y1="6" x2="15" y2="6" />
    <line x1="9" y1="10" x2="15" y2="10" />
    <line x1="9" y1="14" x2="15" y2="14" />
    <line x1="9" y1="18" x2="15" y2="18" />
    <line x1="4" y1="22" x2="20" y2="22" />
  </svg>
);

const ClipboardIcon: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
  </svg>
);

const CameraIcon: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const UserIcon: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const ChartIcon: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
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

const MapPinIcon: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const industryIcons: Record<string, FC<{ className?: string }>> = {
  home: HomeIcon,
  shopping: ShoppingIcon,
  building: BuildingIcon,
  school: SchoolIcon,
  warehouse: WarehouseIcon,
  apartment: ApartmentIcon,
};

const programIcons: Record<string, FC<{ className?: string }>> = {
  leaf: LeafIcon,
  water: WaterIcon,
  flower: FlowerIcon,
  lightning: LightningIcon,
  tree: TreeIcon,
  snowflake: SnowflakeIcon,
};

const qualityIcons: Record<string, FC<{ className?: string }>> = {
  clipboard: ClipboardIcon,
  camera: CameraIcon,
  user: UserIcon,
  chart: ChartIcon,
};

/* ── Utility ── */

const CountUp: FC<{ end: number; suffix?: string; prefix?: string }> = ({ end, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const interval = setInterval(() => {
      start += Math.ceil(end / 35);
      if (start >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 25);
    return () => clearInterval(interval);
  }, [end]);
  return <span>{prefix}{count}{suffix}</span>;
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
        <a href="#" className="font-heading text-lg md:text-xl text-green-600 tracking-tight flex items-center gap-2">
          <LeafIcon className="w-5 h-5 text-green-500" />
          <span className="text-green-600 font-bold">Greenline</span>
          <span className="text-steel-400 font-light"> | </span>
          <span className="text-steel-600">Commercial</span>
        </a>
        <nav className="hidden md:flex items-center gap-5">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-steel-500 hover:text-green-600 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#quote"
            className="bg-green-500 text-white px-5 py-2.5 rounded-md text-sm font-semibold hover:bg-green-600 transition-colors"
          >
            Request a Bid
          </a>
        </nav>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-steel-700"
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
                <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="text-sm text-steel-500 py-1">
                  {l.label}
                </a>
              ))}
              <a href="#quote" onClick={() => setMobileOpen(false)} className="bg-green-500 text-white text-center px-5 py-2.5 rounded-md text-sm font-semibold">
                Request a Bid
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

/* ── Hero ── */

const HeroSection: FC = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden">
    <div className="absolute inset-0">
      <img
        src={siteInfo.heroImage}
        alt="Commercial property landscaping"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-green-900/80 via-green-800/60 to-green-700/70" />
    </div>
    <div className="relative z-10 max-w-7xl mx-auto px-5 w-full">
      <div className="max-w-3xl">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-block bg-white/10 text-green-200 text-xs font-semibold px-4 py-1.5 rounded-full mb-5"
        >
          <MapPinIcon className="w-3 h-3 inline-block mr-1 -mt-0.5" />
          {siteInfo.location}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-4xl md:text-5xl lg:text-6xl text-white leading-tight"
        >
          {siteInfo.tagline}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-green-200/70 text-base md:text-lg mt-5 max-w-xl leading-relaxed"
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
            href="#quote"
            className="bg-white text-green-800 px-7 py-3 rounded-md text-sm font-semibold hover:bg-green-50 transition-colors"
          >
            Request a Bid
          </a>
          <a
            href="#programs"
            className="border border-white/20 text-white px-7 py-3 rounded-md text-sm font-semibold hover:bg-white/10 transition-colors"
          >
            View Programs
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
        className="text-green-300/50"
      >
        <ArrowDownIcon className="w-5 h-5" />
      </motion.div>
    </motion.div>
  </section>
);

/* ── Industries Served ── */

const IndustriesSection: FC = () => {
  const sizes = ['md:col-span-2 md:row-span-1', 'md:col-span-1', 'md:col-span-1', 'md:col-span-1', 'md:col-span-1', 'md:col-span-2'];

  return (
    <section id="industries" className="py-20 md:py-28 px-5">
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl text-steel-800">Industries We Serve</h2>
          <p className="text-steel-400 mt-3 max-w-lg mx-auto">
            Specialized programs for commercial property types across the Denver metro area.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-4">
          {industries.map((ind: IndustryItem, i: number) => {
            const IconComp = industryIcons[ind.icon] || BuildingIcon;
            return (
              <motion.div
                key={ind.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: i * 0.08 }}
                className={`${sizes[i] || ''} bg-white rounded-xl border border-steel-100 p-6 hover:border-green-300 hover:shadow-sm transition-all`}
              >
                <div className="flex items-start justify-between mb-3">
                  <IconComp className="w-7 h-7 text-green-500" />
                  <span className="text-xs text-steel-300 bg-steel-50 px-2.5 py-1 rounded-full font-semibold">
                    {ind.properties} properties
                  </span>
                </div>
                <h3 className="font-heading text-lg text-steel-800 mb-2">{ind.title}</h3>
                <p className="text-steel-400 text-sm leading-relaxed">{ind.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ── Maintenance Programs ── */

const ProgramsSection: FC = () => {
  const [activeProgram, setActiveProgram] = useState<string>(programs[0].id);

  return (
    <section id="programs" className="py-20 md:py-28 px-5 bg-steel-50">
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-14">
          <span className="text-green-500 text-xs uppercase tracking-[0.25em] font-semibold">Service Offerings</span>
          <h2 className="text-3xl md:text-4xl text-steel-800 mt-2">Maintenance Programs</h2>
          <p className="text-steel-400 mt-3 max-w-lg mx-auto">
            Structured maintenance contracts designed for institutional and commercial properties.
          </p>
        </motion.div>
        <div className="flex overflow-x-auto gap-3 pb-4 mb-8 scrollbar-thin">
          {programs.map((p: ProgramItem) => {
            const IconComp = programIcons[p.icon] || LeafIcon;
            return (
              <button
                key={p.id}
                onClick={() => setActiveProgram(p.id)}
                className={`flex-shrink-0 px-5 py-3 rounded-lg text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeProgram === p.id
                    ? 'bg-green-500 text-white shadow-sm'
                    : 'bg-white border border-steel-200 text-steel-500 hover:border-green-300'
                }`}
              >
                <IconComp className="w-4 h-4" />
                {p.title}
              </button>
            );
          })}
        </div>
        <AnimatePresence mode="wait">
          {programs.filter((p) => p.id === activeProgram).map((p) => {
            const IconComp = programIcons[p.icon] || LeafIcon;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl border border-steel-100 p-8 shadow-sm"
              >
                <div className="grid md:grid-cols-5 gap-8 items-center">
                  <div className="md:col-span-3">
                    <IconComp className="w-10 h-10 text-green-500 mb-3" />
                    <h3 className="font-heading text-2xl text-steel-800 mb-2">{p.title}</h3>
                    <p className="text-steel-400 leading-relaxed">{p.description}</p>
                  </div>
                  <div className="md:col-span-2 bg-green-50 rounded-xl p-5 border border-green-100">
                    <p className="text-xs text-green-500 uppercase tracking-wider font-semibold mb-1">Service Frequency</p>
                    <p className="text-lg font-bold text-green-700">{p.frequency}</p>
                    <ul className="mt-3 space-y-1.5 text-sm text-steel-500">
                      <li className="flex items-center gap-2">
                        <CheckIcon className="w-4 h-4 text-green-500" /> Included in base contract
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="w-4 h-4 text-green-500" /> Photo documentation
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="w-4 h-4 text-green-500" /> Can be scheduled stand-alone
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
};

/* ── Operations Dashboard ── */

const OperationsSection: FC = () => {
  const crewSchedule = [
    { time: '6:00 AM', task: 'Crew briefing & dispatch', status: 'completed' as const },
    { time: '7:00 AM', task: 'Downtown office corridor mowing', status: 'completed' as const },
    { time: '9:00 AM', task: 'HOA common area detail', status: 'in-progress' as const },
    { time: '11:00 AM', task: 'Retail center irrigation check', status: 'pending' as const },
    { time: '1:00 PM', task: 'School campus turf care', status: 'pending' as const },
    { time: '3:00 PM', task: 'Industrial park weed control', status: 'pending' as const },
  ];

  const statusColors: Record<string, string> = {
    completed: 'bg-green-500',
    'in-progress': 'bg-amber-400 animate-pulse',
    pending: 'bg-steel-200',
  };

  return (
    <section id="operations" className="py-20 md:py-28 px-5">
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-14">
          <span className="text-green-500 text-xs uppercase tracking-[0.25em] font-semibold">Operations</span>
          <h2 className="text-3xl md:text-4xl text-steel-800 mt-2">How We Operate</h2>
          <p className="text-steel-400 mt-3 max-w-lg mx-auto">
            Real-time operations tracking and full transparency into what happens on your property.
          </p>
        </motion.div>

        {/* Dashboard Metrics */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-10">
          {dashboardMetrics.map((m: DashboardMetric, i: number) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-xl border border-steel-100 p-4 text-center hover:border-green-300 transition-colors"
            >
              <p className="text-2xl md:text-3xl font-bold text-green-600">
                <CountUp end={m.value} suffix={m.suffix} prefix={m.prefix || ''} />
              </p>
              <p className="text-xs text-steel-400 mt-1">{m.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-2xl border border-steel-100 p-6 md:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading text-lg text-steel-800">Today&apos;s Crew Schedule</h3>
            <span className="text-xs text-steel-400 bg-steel-50 px-3 py-1 rounded-full">Updated 5 min ago</span>
          </div>
          <div className="space-y-1">
            {crewSchedule.map((item, i) => (
              <motion.div
                key={item.time}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-4 py-3 px-3 rounded-lg hover:bg-steel-50 transition-colors"
              >
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${statusColors[item.status]}`} />
                <span className="text-sm font-mono text-steel-400 w-20 flex-shrink-0">{item.time}</span>
                <span className={`text-sm flex-1 ${item.status === 'completed' ? 'text-steel-400 line-through' : 'text-steel-700'}`}>{item.task}</span>
                <span className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full ${
                  item.status === 'completed' ? 'bg-green-50 text-green-600' : item.status === 'in-progress' ? 'bg-amber-50 text-amber-600' : 'bg-steel-50 text-steel-400'
                }`}>
                  {item.status}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── Quality Control ── */

const QualitySection: FC = () => (
  <section id="quality" className="py-20 md:py-28 px-5 bg-steel-50">
    <div className="max-w-7xl mx-auto">
      <motion.div className="text-center mb-14">
        <span className="text-green-500 text-xs uppercase tracking-[0.25em] font-semibold">Accountability</span>
        <h2 className="text-3xl md:text-4xl text-steel-800 mt-2">Quality Control</h2>
        <p className="text-steel-400 mt-3 max-w-lg mx-auto">
          Every property is inspected, documented, and managed with a single point of accountability.
        </p>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {qualityItems.map((q: QualityItem, i: number) => {
          const IconComp = qualityIcons[q.icon] || ClipboardIcon;
          return (
            <motion.div
              key={q.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl p-6 border border-steel-100 hover:border-green-300 hover:shadow-sm transition-all"
            >
              <IconComp className="w-8 h-8 text-green-500 block mb-3" />
              <h3 className="font-heading text-lg text-steel-800 mb-2">{q.title}</h3>
              <p className="text-steel-400 text-sm leading-relaxed">{q.description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

/* ── Emergency Response ── */

const EmergencySection: FC = () => (
  <section className="py-20 md:py-28 px-5 bg-green-800 text-white">
    <div className="max-w-6xl mx-auto">
      <motion.div className="text-center mb-12">
        <span className="text-green-300 text-xs uppercase tracking-[0.25em] font-semibold">24/7 Support</span>
        <h2 className="text-3xl md:text-4xl mt-2">Emergency Response</h2>
        <p className="text-green-200/70 mt-3 max-w-lg mx-auto">
          When something goes wrong, we respond. Same-day dispatch for urgent property issues.
        </p>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto mb-10">
        {emergencyServices.map((es, i) => (
          <motion.div
            key={es}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="bg-white/10 rounded-xl p-4 border border-white/10 flex items-center gap-3"
          >
            <CheckIcon className="w-4 h-4 text-green-300 flex-shrink-0" />
            <span className="text-sm text-green-100">{es}</span>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-center"
      >
        <p className="text-green-300 text-sm">
          Emergency hotline: <strong className="text-white">{contactInfo.phone}</strong> &mdash; available 24 hours a day, 365 days a year
        </p>
      </motion.div>
    </div>
  </section>
);

/* ── Contracting Process ── */

const ProcessSection: FC = () => (
  <section id="process" className="py-20 md:py-28 px-5">
    <div className="max-w-5xl mx-auto">
      <motion.div className="text-center mb-14">
        <span className="text-green-500 text-xs uppercase tracking-[0.25em] font-semibold">How It Works</span>
        <h2 className="text-3xl md:text-4xl text-steel-800 mt-2">Contracting Process</h2>
        <p className="text-steel-400 mt-3 max-w-lg mx-auto">
          From first walk to ongoing service. A transparent process built for facilities managers.
        </p>
      </motion.div>
      <div className="grid md:grid-cols-4 gap-4">
        {contractSteps.map((cs: ContractStep, i: number) => (
          <motion.div
            key={cs.step}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative"
          >
            {i < contractSteps.length - 1 && (
              <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-green-300 to-steel-100 -z-10" />
            )}
            <div className="bg-white rounded-xl p-5 border border-steel-100 h-full hover:border-green-300 transition-colors">
              <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 font-bold flex items-center justify-center mb-3 text-sm">
                {cs.step}
              </div>
              <h3 className="font-heading text-lg text-steel-800 mb-2">{cs.title}</h3>
              <p className="text-steel-400 text-sm leading-relaxed">{cs.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ── CTA / Commercial Quote Form ── */

const CtaSection: FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [propertyType, setPropertyType] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const propertyTypes = ['HOA', 'Office', 'Retail', 'Industrial', 'School', 'Multifamily', 'Other'];

  return (
    <section id="quote" className="py-20 md:py-28 px-5 bg-steel-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-5 gap-12 items-start">
          <motion.div className="md:col-span-2">
            <span className="text-green-500 text-xs uppercase tracking-[0.25em] font-semibold">Get Started</span>
            <h2 className="text-3xl md:text-4xl text-steel-800 mt-2">Request a Commercial Bid</h2>
            <p className="text-steel-400 mt-3 text-sm leading-relaxed">
              Tell us about your property and we will provide a detailed maintenance proposal within 5 business days.
            </p>
            <div className="mt-6 space-y-3 text-sm text-steel-400">
              <p className="flex items-center gap-2">
                <PhoneIcon className="w-4 h-4 text-green-500" /> {contactInfo.phone}
              </p>
              <p className="flex items-center gap-2">
                <EmailIcon className="w-4 h-4 text-green-500" /> {contactInfo.email}
              </p>
              <p className="flex items-center gap-2">
                <MapPinIcon className="w-4 h-4 text-green-500" /> {contactInfo.address}
              </p>
            </div>
          </motion.div>
          <div className="md:col-span-3">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl p-8 border border-green-100 shadow-sm"
              >
                <ClipboardIcon className="w-12 h-12 text-green-500 block mb-3" />
                <h3 className="font-heading text-xl text-steel-800 mb-2">Bid Request Received</h3>
                <p className="text-steel-400 text-sm">Our commercial team will review your property details and deliver a customized maintenance proposal within 5 business days.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input required type="text" placeholder="Your name" className="w-full border border-steel-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-green-400" />
                  <input required type="text" placeholder="Company / Property" className="w-full border border-steel-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-green-400" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input required type="email" placeholder="Email address" className="w-full border border-steel-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-green-400" />
                  <input required type="tel" placeholder="Phone number" className="w-full border border-steel-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-green-400" />
                </div>
                <input type="text" placeholder="Property address" className="w-full border border-steel-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-green-400" />
                <div>
                  <label className="block text-xs uppercase tracking-wider text-steel-400 mb-2 font-semibold">Property Type</label>
                  <div className="flex flex-wrap gap-2">
                    {propertyTypes.map((pt) => (
                      <button
                        key={pt}
                        type="button"
                        onClick={() => setPropertyType(pt === propertyType ? '' : pt)}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                          propertyType === pt
                            ? 'bg-green-500 text-white border-green-500'
                            : 'bg-white text-steel-500 border-steel-200 hover:border-green-300'
                        }`}
                      >
                        {pt}
                      </button>
                    ))}
                  </div>
                </div>
                <select className="w-full border border-steel-200 rounded-lg px-4 py-3 text-sm text-steel-500 focus:outline-none focus:border-green-400">
                  <option value="">Approximate property size</option>
                  <option>Under 1 acre</option>
                  <option>1 - 5 acres</option>
                  <option>5 - 20 acres</option>
                  <option>20 - 50 acres</option>
                  <option>Over 50 acres</option>
                </select>
                <textarea rows={3} placeholder="Tell us about your current maintenance needs..." className="w-full border border-steel-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-green-400 resize-none" />
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  className="w-full bg-green-500 text-white py-3 rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors"
                >
                  Submit Bid Request
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
  <footer className="bg-steel-900 text-steel-300 py-14 px-5">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-4 gap-8 mb-10">
        <div className="md:col-span-2">
          <h4 className="font-heading text-xl text-white mb-3 flex items-center gap-2">
            <LeafIcon className="w-5 h-5 text-green-400" />
            <span className="text-green-400">Greenline</span> Commercial
          </h4>
          <p className="text-steel-400 text-sm leading-relaxed max-w-sm">{siteInfo.description}</p>
        </div>
        <div>
          <h4 className="font-heading text-white mb-3">Programs</h4>
          <ul className="space-y-1.5 text-sm">
            {programs.slice(0, 4).map((p) => (
              <li key={p.id} className="text-steel-400 hover:text-white transition-colors cursor-default">{p.title}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-heading text-white mb-3">Contact</h4>
          <p className="text-sm flex items-center gap-1"><PhoneIcon className="w-3.5 h-3.5" /> {contactInfo.phone}</p>
          <p className="text-sm">{contactInfo.email}</p>
          <p className="text-sm text-steel-400">{contactInfo.address}</p>
        </div>
      </div>
      <div className="border-t border-steel-700 pt-6 text-center text-xs text-steel-500">
        &copy; {new Date().getFullYear()} Greenline Commercial Grounds Maintenance. All rights reserved.
      </div>
    </div>
  </footer>
);

/* ── Main App ── */

const App: FC = () => (
  <div className="font-body text-steel-800 antialiased">
    <NavBar />
    <main>
      <HeroSection />
      <IndustriesSection />
      <ProgramsSection />
      <OperationsSection />
      <QualitySection />
      <EmergencySection />
      <ProcessSection />
      <CtaSection />
    </main>
    <Footer />
  </div>
);

export default App;
