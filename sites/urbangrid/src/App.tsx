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

/* ── Reusable Section Wrapper ── */
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
          className="md:hidden text-jet-black text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? '✕' : '☰'}
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
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=85"
          alt="City skyline"
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
            <span className="text-3xl block">{a.icon}</span>
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
            <span className="text-4xl block">{n.icon}</span>
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
            <div className="w-16 h-16 mx-auto rounded-full bg-white/10 flex items-center justify-center text-2xl border border-white/20">
              {step.icon}
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
            <div className="text-4xl mb-3">✅</div>
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
              <li>420 Urban Avenue, Downtown</li>
              <li>leasing@urbangrid.com</li>
              <li>(555) 987-6543</li>
              <li>Office open 9am–7pm daily</li>
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
