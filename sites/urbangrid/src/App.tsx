import { useState, useEffect, useCallback, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  availableUnits,
  amenities,
  floorPlans,
  neighborhood,
  gallery,
  leasingSteps,
} from './data';

/* ── SVG Icons ── */

function BuildingIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="1" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h2M14 6h2M8 10h2M14 10h2M8 14h2M14 14h2" />
    </svg>
  );
}

function ElevatorIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="2" width="18" height="20" rx="1" />
      <path d="M9 22v-5M15 22v-5" />
      <path d="M7 10l5-4 5 4M7 14l5 4 5-4" />
    </svg>
  );
}

function DumbbellIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.5 6.5h11M6.5 17.5h11" />
      <rect x="2" y="8" width="4" height="8" rx="1" />
      <rect x="18" y="8" width="4" height="8" rx="1" />
      <path d="M6.5 8v8M17.5 8v8" />
    </svg>
  );
}

function WifiIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.55a11 11 0 0114.08 0" />
      <path d="M1.42 9a16 16 0 0121.16 0" />
      <path d="M8.53 16.11a6 6 0 016.95 0" />
      <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function CarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17h14M5 17a2 2 0 01-2-2V9l3-5h12l3 5v6a2 2 0 01-2 2" />
      <circle cx="7" cy="15" r="2" fill="currentColor" stroke="none" />
      <circle cx="17" cy="15" r="2" fill="currentColor" stroke="none" />
      <path d="M5 17v2a1 1 0 001 1h2a1 1 0 001-1v-2M19 17v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2" />
    </svg>
  );
}

function PawIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5" cy="8" r="2.5" />
      <circle cx="19" cy="8" r="2.5" />
      <circle cx="10" cy="5" r="2" />
      <circle cx="14" cy="5" r="2" />
      <path d="M7 16c0-2 2-4 5-4s5 2 5 4c0 2-2 4-5 4s-5-2-5-4z" />
    </svg>
  );
}

function PackageIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h4a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2h4" />
      <polyline points="16 8 12 12 8 8" />
      <line x1="12" y1="12" x2="12" y2="17" />
    </svg>
  );
}

function MapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function TrainIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="12" rx="2" />
      <path d="M3 12h18" />
      <path d="M8 15v4M16 15v4" />
      <circle cx="8" cy="8" r="1" fill="currentColor" stroke="none" />
      <circle cx="16" cy="8" r="1" fill="currentColor" stroke="none" />
      <path d="M12 15l-3 4M12 15l3 4" />
    </svg>
  );
}

function CoffeeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8h1a4 4 0 010 8h-1" />
      <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
      <line x1="6" y1="1" x2="6" y2="4" />
      <line x1="10" y1="1" x2="10" y2="4" />
      <line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 4L12 13 2 4" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 12 9 17 20 6" />
    </svg>
  );
}

/* ── Icon resolver ── */

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  building: BuildingIcon,
  elevator: ElevatorIcon,
  dumbbell: DumbbellIcon,
  wifi: WifiIcon,
  car: CarIcon,
  paw: PawIcon,
  package: PackageIcon,
  map: MapIcon,
  train: TrainIcon,
  coffee: CoffeeIcon,
  star: StarIcon,
  phone: PhoneIcon,
  mail: MailIcon,
  check: CheckIcon,
};

function SvgIcon({ name, className = '' }: { name: string; className?: string }) {
  const Icon = iconMap[name];
  if (!Icon) return <span className={className} />;
  return <Icon className={className} />;
}

/* ── Section wrapper ── */

function Section({
  children,
  className = '',
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`px-6 md:px-12 lg:px-20 py-20 md:py-28 ${className}`}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}

function SectionHeading({
  label,
  title,
  subtitle,
  light = false,
}: {
  label: string;
  title: string;
  subtitle?: string;
  light?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className="mb-12 md:mb-16"
    >
      <span
        className={`text-xs tracking-[0.2em] uppercase font-semibold ${
          light ? 'text-cobalt-light' : 'text-cobalt'
        }`}
      >
        {label}
      </span>
      <h2
        className={`text-4xl md:text-5xl lg:text-6xl mt-2 font-black leading-tight tracking-tight ${
          light ? 'text-white' : 'text-jet-black'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3 max-w-2xl text-lg leading-relaxed ${light ? 'text-white/60' : 'text-slate-500'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

function FadeIn({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Navbar ── */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#units', label: 'Units' },
    { href: '#amenities', label: 'Amenities' },
    { href: '#plans', label: 'Floor Plans' },
    { href: '#neighborhood', label: 'Neighborhood' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#contact', label: 'Tour' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between h-16 md:h-20">
        <a href="#" className="text-xl md:text-2xl font-black tracking-tight text-jet-black">
          Urban<span className="text-cobalt">Grid</span>
        </a>
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-slate-500 hover:text-jet-black transition-colors font-medium"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="px-5 py-2.5 bg-cobalt text-white text-sm font-semibold hover:bg-cobalt-dark transition-colors"
          >
            Book a Tour
          </a>
        </div>
        <button
          className="md:hidden text-jet-black"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-white border-t border-slate-300/40 px-6 pb-6"
        >
          <div className="flex flex-col gap-3 pt-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-slate-500 font-medium"
              >
                {l.label}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}

/* ── Hero ── */

function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-jet-black">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1600&q=85"
          alt="City skyline at dusk"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      </div>
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-cobalt text-sm tracking-[0.25em] uppercase font-semibold"
        >
          UrbanGrid Apartments
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-5xl md:text-7xl lg:text-8xl mt-4 font-black text-white leading-tight tracking-tight"
        >
          City living with everything within reach.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-white/60 text-lg md:text-xl mt-4 max-w-2xl mx-auto leading-relaxed"
        >
          Studios, 1-bedrooms, and 2-bedrooms in the city's most connected neighborhood.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          <a
            href="#units"
            className="px-8 py-4 bg-cobalt text-white text-sm font-semibold uppercase tracking-wider hover:bg-cobalt-dark transition-colors"
          >
            View Available Units
          </a>
          <a
            href="#contact"
            className="px-8 py-4 border-2 border-white/30 text-white text-sm font-semibold uppercase tracking-wider hover:bg-white/10 transition-colors"
          >
            Book a Tour
          </a>
        </motion.div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="text-white/30 text-2xl"
        >
          ↓
        </motion.div>
      </div>
    </section>
  );
}

/* ── Available Units ── */

function AvailableUnits() {
  return (
    <Section id="units" className="bg-off-white">
      <SectionHeading
        label="Available Now"
        title="Units Available"
        subtitle="Modern living spaces designed for urban professionals who want style, space, and convenience."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {availableUnits.map((unit, i) => (
          <FadeIn key={unit.id} delay={i * 0.12} className="bg-white border border-slate-300/30 hover:border-cobalt/30 transition-colors">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={unit.image}
                alt={unit.type}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-jet-black">{unit.type}</h3>
                <span className="text-xs font-semibold uppercase text-cobalt bg-cobalt/5 px-2 py-1">
                  {unit.available}
                </span>
              </div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-2xl font-black text-jet-black">{unit.price}</span>
                <span className="text-slate-500 text-sm">/ month</span>
              </div>
              <p className="text-slate-500 text-sm mt-1">{unit.sqft} sq ft</p>
              <ul className="mt-4 space-y-1.5">
                {unit.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="w-1 h-1 bg-cobalt rounded-full flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
              <button className="mt-5 w-full py-2.5 border-2 border-jet-black text-jet-black font-semibold text-sm hover:bg-jet-black hover:text-white transition-colors">
                Schedule Tour
              </button>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

/* ── Amenities ── */

function AmenitiesGrid() {
  return (
    <Section id="amenities" className="bg-jet-black !py-24">
      <SectionHeading
        label="Amenities"
        title="Everything You Need"
        subtitle="Six floors of amenities designed to make city living effortless and enjoyable."
        light
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {amenities.map((a, i) => (
          <FadeIn key={a.title} delay={i * 0.06} className="bg-white/5 border border-white/10 p-6 text-center hover:bg-white/10 hover:border-cobalt/40 transition-all">
            <SvgIcon name={a.icon} className="w-8 h-8 text-cobalt-light mx-auto" />
            <h3 className="text-white font-bold text-sm mt-3">{a.title}</h3>
            <p className="text-white/40 text-xs mt-2 leading-relaxed">{a.description}</p>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

/* ── Floor Plans (Tabs) ── */

function FloorPlansSection() {
  const [active, setActive] = useState<number>(floorPlans[0].id);
  const current = floorPlans.find((fp) => fp.id === active) ?? floorPlans[0];

  return (
    <Section id="plans">
      <SectionHeading
        label="Layouts"
        title="Floor Plans"
        subtitle="Each layout is designed to maximize space, light, and flow — with finishes that match your standards."
      />
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {floorPlans.map((fp) => (
          <button
            key={fp.id}
            onClick={() => setActive(fp.id)}
            className={`px-5 py-2.5 text-sm font-semibold border-2 transition-colors ${
              active === fp.id
                ? 'border-cobalt bg-cobalt text-white'
                : 'border-slate-300 text-slate-500 hover:border-cobalt/50'
            }`}
          >
            {fp.name}
          </button>
        ))}
      </div>
      {/* Active Plan */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
        >
          <div className="overflow-hidden">
            <img
              src={current.image}
              alt={current.name}
              className="w-full h-80 object-cover"
            />
          </div>
          <div>
            <h3 className="text-3xl font-black text-jet-black">{current.name}</h3>
            <div className="flex gap-6 mt-4 text-slate-600">
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-500">Beds</span>
                <p className="text-xl font-bold text-jet-black mt-1">
                  {current.beds === 0 ? 'Studio' : `${current.beds} Bed`}
                </p>
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-500">Baths</span>
                <p className="text-xl font-bold text-jet-black mt-1">{current.baths}</p>
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-500">Sq Ft</span>
                <p className="text-xl font-bold text-jet-black mt-1">{current.sqft}</p>
              </div>
            </div>
            <div className="mt-5 flex items-baseline gap-1">
              <span className="text-3xl font-black text-cobalt">{current.price}</span>
              <span className="text-slate-500 text-sm">/ month</span>
            </div>
            <p className="text-slate-500 text-sm mt-1">
              {current.available} unit{current.available > 1 ? 's' : ''} available
            </p>
            <button className="mt-6 px-6 py-3 bg-cobalt text-white font-semibold text-sm hover:bg-cobalt-dark transition-colors">
              Check Availability
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}

/* ── Neighborhood ── */

function NeighborhoodSection() {
  return (
    <Section id="neighborhood" className="bg-off-white">
      <SectionHeading
        label="The Area"
        title="Your Neighborhood"
        subtitle="Steps from everything that makes city life worth living."
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {neighborhood.map((n, i) => (
          <FadeIn key={n.title} delay={i * 0.1} className="bg-white border border-slate-300/30 p-8 text-center hover:shadow-sm transition-shadow">
            <SvgIcon name={n.icon} className="w-10 h-10 text-cobalt mx-auto" />
            <h3 className="text-lg font-bold text-jet-black mt-4">{n.title}</h3>
            <p className="text-slate-500 text-sm mt-2 leading-relaxed">{n.description}</p>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

/* ── Gallery ── */

function GallerySection() {
  return (
    <Section id="gallery">
      <SectionHeading
        label="Gallery"
        title="See the Space"
        subtitle="From the lobby to the rooftop — get a feel for life at UrbanGrid."
      />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {gallery.map((item, i) => (
          <FadeIn key={i} delay={i * 0.06} className={`overflow-hidden ${item.span} group`}>
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

/* ── Leasing Process ── */

function LeasingProcess() {
  return (
    <Section className="bg-cobalt !py-24">
      <SectionHeading
        label="Process"
        title="Move In, Made Simple"
        subtitle="Four straightforward steps from tour to key — we make leasing easy."
        light
      />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {leasingSteps.map((step, i) => (
          <FadeIn key={step.title} delay={i * 0.08} className="text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-white/10 flex items-center justify-center border border-white/20">
              <SvgIcon name={step.icon} className="w-7 h-7 text-cobalt-light" />
            </div>
            <span className="text-white/50 text-xs font-semibold uppercase tracking-wider mt-3 block">
              Step {i + 1}
            </span>
            <h3 className="text-white font-bold mt-1 text-lg">{step.title}</h3>
            <p className="text-white/60 text-sm mt-2 leading-relaxed">{step.description}</p>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

/* ── Tour Booking Form ── */

function TourForm() {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  }, []);

  return (
    <Section id="contact" className="!py-24">
      <div className="max-w-2xl mx-auto text-center">
        <SectionHeading
          label="Book a Tour"
          title="See UrbanGrid in Person"
          subtitle="Schedule a visit and experience city living at its most convenient."
        />
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-cobalt/5 p-10 border-2 border-cobalt/20"
          >
            <CheckIcon className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <p className="text-2xl font-black text-jet-black">Tour Requested!</p>
            <p className="text-slate-500 mt-2">
              Our leasing team will confirm your appointment within 2 hours.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="text-left space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-500 text-xs uppercase tracking-wider block mb-1.5 font-semibold">
                  Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border-2 border-slate-300 focus:border-cobalt focus:outline-none transition-colors text-jet-black"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-slate-500 text-xs uppercase tracking-wider block mb-1.5 font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 border-2 border-slate-300 focus:border-cobalt focus:outline-none transition-colors text-jet-black"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-500 text-xs uppercase tracking-wider block mb-1.5 font-semibold">
                  Phone
                </label>
                <input
                  type="tel"
                  required
                  className="w-full px-4 py-3 border-2 border-slate-300 focus:border-cobalt focus:outline-none transition-colors text-jet-black"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <label className="text-slate-500 text-xs uppercase tracking-wider block mb-1.5 font-semibold">
                  Preferred Date
                </label>
                <input
                  type="date"
                  required
                  className="w-full px-4 py-3 border-2 border-slate-300 focus:border-cobalt focus:outline-none transition-colors text-jet-black"
                />
              </div>
            </div>
            <div>
              <label className="text-slate-500 text-xs uppercase tracking-wider block mb-1.5 font-semibold">
                Unit Interest
              </label>
              <select
                className="w-full px-4 py-3 border-2 border-slate-300 focus:border-cobalt focus:outline-none transition-colors text-jet-black"
              >
                <option value="">Any Available Unit</option>
                <option value="studio">Studio</option>
                <option value="1bed">1-Bedroom</option>
                <option value="2bed">2-Bedroom</option>
                <option value="penthouse">Penthouse Suite</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-3.5 bg-cobalt text-white font-bold text-sm uppercase tracking-wider hover:bg-cobalt-dark transition-colors"
            >
              Confirm Tour
            </button>
          </form>
        )}
      </div>
    </Section>
  );
}

/* ── Footer ── */

function Footer() {
  return (
    <footer className="bg-jet-black px-6 md:px-12 lg:px-20 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="text-xl font-black tracking-tight text-white">
              Urban<span className="text-cobalt">Grid</span>
            </div>
            <p className="text-slate-500 text-sm mt-3 leading-relaxed max-w-xs">
              City living with everything within reach.
            </p>
          </div>
          <div>
            <h4 className="text-white/50 text-xs uppercase tracking-wider font-semibold mb-4">Leasing</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#units" className="hover:text-cobalt transition-colors">Available Units</a></li>
              <li><a href="#plans" className="hover:text-cobalt transition-colors">Floor Plans</a></li>
              <li><a href="#amenities" className="hover:text-cobalt transition-colors">Amenities</a></li>
              <li><a href="#contact" className="hover:text-cobalt transition-colors">Book a Tour</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white/50 text-xs uppercase tracking-wider font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li className="flex items-center gap-2"><MapIcon className="w-4 h-4 text-cobalt" /> 420 Urban Avenue, Downtown</li>
              <li className="flex items-center gap-2"><MailIcon className="w-4 h-4 text-cobalt" /> leasing@urbangrid.com</li>
              <li className="flex items-center gap-2"><PhoneIcon className="w-4 h-4 text-cobalt" /> (555) 987-6543</li>
              <li className="flex items-center gap-2"><StarIcon className="w-4 h-4 text-cobalt" /> Office open 9am–7pm daily</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-white/5 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} UrbanGrid Apartments. Equal housing opportunity.
        </div>
      </div>
    </footer>
  );
}

/* ── App ── */

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <AvailableUnits />
      <AmenitiesGrid />
      <FloorPlansSection />
      <NeighborhoodSection />
      <GallerySection />
      <LeasingProcess />
      <TourForm />
      <Footer />
    </>
  );
}
