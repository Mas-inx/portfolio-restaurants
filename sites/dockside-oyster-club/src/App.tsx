import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  rawBarOysters,
  seafoodDishes,
  cocktails,
  sourceRegions,
  goldenHourPhases,
  privateEvents,
  navLinks,
} from './data';

function TideProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <div className="tide-progress" style={{ width: `${progress}%` }} />;
}

function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-salt/95 backdrop-blur-sm shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="font-serif text-xl text-navy tracking-tight">
          Dockside
        </a>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link text-sm text-navy/70 hover:text-navy"
            >
              {link.label}
            </a>
          ))}
        </div>
        <a
          href="#reserve"
          className="text-xs uppercase tracking-widest px-4 py-2 border border-navy/20 text-navy hover:bg-navy hover:text-salt transition-all duration-300"
        >
          Reserve
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1600&q=80"
          alt="Waterfront at golden hour"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-navy/20 to-navy/70" />
      </div>
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-seaglass-light text-sm uppercase tracking-[0.3em] mb-6"
        >
          Coastal Seafood Bar
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-[1.05] mb-8"
        >
          Cold oysters.
          <br />
          Clean cocktails.
          <br />
          <span className="italic text-golden-light">Late sun.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white/70 text-lg max-w-xl mx-auto mb-10"
        >
          Where the raw list changes with the tide, and the best seats are taken just before sunset.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#reserve"
            className="px-8 py-4 bg-coral text-white text-sm uppercase tracking-widest hover:bg-coral-light transition-colors duration-300"
          >
            Reserve a Table
          </a>
          <a
            href="#raw-bar"
            className="px-8 py-4 border border-white/30 text-white text-sm uppercase tracking-widest hover:bg-white/10 transition-colors duration-300"
          >
            Today's Raw Bar
          </a>
        </motion.div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-white/50 animate-pulse" />
      </div>
    </section>
  );
}

function RawBar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="raw-bar" className="py-24 md:py-32 bg-salt" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-coral text-xs uppercase tracking-[0.3em] mb-3">Daily List</p>
          <h2 className="font-serif text-4xl md:text-5xl text-navy mb-4">Raw Bar</h2>
          <p className="text-weathered max-w-lg">
            Sourced daily from cold-water growers. Served on crushed ice with mignonette, lemon, and fresh horseradish.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="overflow-x-auto"
        >
          <table className="raw-bar-table">
            <thead>
              <tr>
                <th>Oyster</th>
                <th>Origin</th>
                <th>Flavor Note</th>
                <th>Size</th>
                <th className="text-right">Each</th>
              </tr>
            </thead>
            <tbody className="stagger">
              {rawBarOysters.map((oyster, i) => (
                <motion.tr
                  key={oyster.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                >
                  <td className="font-serif text-lg text-navy">{oyster.name}</td>
                  <td className="text-weathered text-sm">{oyster.origin}</td>
                  <td className="text-navy/70 text-sm italic">{oyster.flavor}</td>
                  <td className="text-sm">
                    <span className="inline-block px-2 py-0.5 bg-seaglass/10 text-seaglass text-xs rounded">
                      {oyster.size}
                    </span>
                  </td>
                  <td className="text-right font-serif text-lg text-navy">${oyster.price}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 flex items-center gap-3 text-sm text-weathered"
        >
          <span className="coral-dot" />
          <span>Half dozen available at 2× single price. Shell size varies by season.</span>
        </motion.div>
      </div>
    </section>
  );
}

function SeafoodFire() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="seafood" className="py-24 md:py-32 bg-navy" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-seaglass-light text-xs uppercase tracking-[0.3em] mb-3">From the Sea & Flame</p>
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">Seafood + Fire</h2>
          <p className="text-white/50 max-w-lg">
            Whole fish grilled over oak. Crudo sliced to order. Every plate shaped by what came off the boats this morning.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {seafoodDishes.map((dish, i) => (
            <motion.div
              key={dish.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className={`dish-card bg-navy-light/50 border border-white/5 overflow-hidden group ${
                i === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <div className={`relative overflow-hidden ${i === 0 ? 'h-64 md:h-80' : 'h-48'}`}>
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                <span className="absolute top-4 left-4 text-xs uppercase tracking-widest px-3 py-1 bg-coral/90 text-white">
                  {dish.tag}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-serif text-xl text-white">{dish.name}</h3>
                  <span className="font-serif text-lg text-golden">${dish.price}</span>
                </div>
                <p className="text-white/50 text-sm">{dish.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CocktailCurrent() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <section id="cocktails" className="py-24 md:py-32 bg-salt-dark" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="text-coral text-xs uppercase tracking-[0.3em] mb-3">The Bar</p>
            <h2 className="font-serif text-4xl md:text-5xl text-navy">Cocktail Current</h2>
          </div>
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 border border-navy/20 flex items-center justify-center text-navy hover:bg-navy hover:text-salt transition-all"
            >
              ←
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 border border-navy/20 flex items-center justify-center text-navy hover:bg-navy hover:text-salt transition-all"
            >
              →
            </button>
          </div>
        </motion.div>

        <motion.div
          ref={scrollRef}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="cocktail-scroll"
        >
          {cocktails.map((cocktail, i) => (
            <motion.div
              key={cocktail.name}
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="cocktail-card"
            >
              <div className="bg-white overflow-hidden group">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={cocktail.image}
                    alt={cocktail.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-seaglass-light text-xs uppercase tracking-widest">{cocktail.spirit}</p>
                    <h3 className="font-serif text-xl text-white mt-1">{cocktail.name}</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-navy/60 text-sm italic mb-3">{cocktail.flavor}</p>
                  <div className="flex items-center justify-between text-xs text-weathered">
                    <span className="uppercase tracking-wider">{cocktail.garnish}</span>
                    <span className="px-2 py-0.5 bg-seaglass/10 text-seaglass rounded">{cocktail.glass}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SourceMap() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="source-map" className="py-24 md:py-32 bg-salt" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-seaglass text-xs uppercase tracking-[0.3em] mb-3">Provenance</p>
          <h2 className="font-serif text-4xl md:text-5xl text-navy mb-4">Source Map</h2>
          <p className="text-weathered max-w-lg">
            Every oyster, every fish — traced back to cold water and careful hands.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative bg-navy/5 border border-navy/10 p-8"
          >
            <svg viewBox="0 0 500 400" className="w-full h-auto">
              {/* Stylized coastline */}
              <path
                d="M50 200 Q100 150 150 180 T250 160 T350 190 T450 170"
                fill="none"
                stroke="#7FB5B0"
                strokeWidth="2"
                className="chart-line"
              />
              <path
                d="M50 220 Q120 200 180 210 T300 200 T400 220 T480 210"
                fill="none"
                stroke="#7FB5B0"
                strokeWidth="1"
                opacity="0.4"
              />
              {/* Grid lines */}
              {[100, 150, 200, 250, 300].map((y) => (
                <line key={y} x1="30" y1={y} x2="470" y2={y} stroke="#0C2340" strokeWidth="0.3" opacity="0.1" />
              ))}
              {[100, 200, 300, 400].map((x) => (
                <line key={x} x1={x} y1="80" x2={x} y2="350" stroke="#0C2340" strokeWidth="0.3" opacity="0.1" />
              ))}
              {/* Map pins */}
              <motion.g
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <circle cx="120" cy="180" r="6" fill="#E8614D" className="map-pin-pulse" />
                <circle cx="120" cy="180" r="3" fill="#E8614D" />
                <text x="130" y="175" fontSize="9" fill="#0C2340" fontWeight="500">PNW</text>
              </motion.g>
              <motion.g
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <circle cx="380" cy="170" r="6" fill="#E8614D" className="map-pin-pulse" />
                <circle cx="380" cy="170" r="3" fill="#E8614D" />
                <text x="390" y="165" fontSize="9" fill="#0C2340" fontWeight="500">NE</text>
              </motion.g>
              <motion.g
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <circle cx="300" cy="250" r="6" fill="#E8614D" className="map-pin-pulse" />
                <circle cx="300" cy="250" r="3" fill="#E8614D" />
                <text x="310" y="245" fontSize="9" fill="#0C2340" fontWeight="500">Gulf</text>
              </motion.g>
              <motion.g
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.1 }}
              >
                <circle cx="200" cy="140" r="6" fill="#E8614D" className="map-pin-pulse" />
                <circle cx="200" cy="140" r="3" fill="#E8614D" />
                <text x="210" y="135" fontSize="9" fill="#0C2340" fontWeight="500">Canada</text>
              </motion.g>
              {/* Compass */}
              <g transform="translate(440, 340)">
                <circle r="20" fill="none" stroke="#0C2340" strokeWidth="0.5" opacity="0.3" />
                <line x1="0" y1="-18" x2="0" y2="18" stroke="#0C2340" strokeWidth="0.5" opacity="0.3" />
                <line x1="-18" y1="0" x2="18" y2="0" stroke="#0C2340" strokeWidth="0.5" opacity="0.3" />
                <text x="-3" y="-22" fontSize="8" fill="#0C2340" opacity="0.5">N</text>
              </g>
            </svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {sourceRegions.map((region, i) => (
              <motion.div
                key={region.region}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + 0.1 * i }}
                className="border-l-2 border-seaglass pl-5 py-2"
              >
                <h3 className="font-serif text-lg text-navy mb-1">{region.region}</h3>
                <p className="text-coral text-xs uppercase tracking-wider mb-1">{region.suppliers}</p>
                <p className="text-weathered text-sm">{region.note}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function GoldenHour() {
  const [activePhase, setActivePhase] = useState(2);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;
      const scrollInSection = viewportHeight - rect.top;
      const progress = Math.max(0, Math.min(1, scrollInSection / (sectionHeight + viewportHeight)));
      const phaseIndex = Math.min(
        goldenHourPhases.length - 1,
        Math.floor(progress * goldenHourPhases.length)
      );
      setActivePhase(phaseIndex);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const paletteMap: Record<string, string> = {
    bright: 'from-sky-100 to-salt',
    warm: 'from-amber-50 to-salt',
    golden: 'from-amber-100 to-orange-50',
    deep: 'from-orange-100 to-rose-50',
    night: 'from-navy/10 to-slate-100',
  };

  return (
    <section
      id="golden-hour"
      ref={sectionRef}
      className={`py-24 md:py-32 bg-gradient-to-b ${paletteMap[goldenHourPhases[activePhase].palette]} transition-all duration-1000`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-golden text-xs uppercase tracking-[0.3em] mb-3">The Day Unfolds</p>
          <h2 className="font-serif text-4xl md:text-5xl text-navy">Golden Hour</h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-navy/10" />

          <div className="space-y-8">
            {goldenHourPhases.map((phase, i) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * i }}
                className={`relative pl-14 transition-all duration-500 ${
                  i === activePhase ? 'opacity-100' : 'opacity-40'
                }`}
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-3 top-2 w-[14px] h-[14px] rounded-full border-2 transition-all duration-500 ${
                    i === activePhase
                      ? 'bg-coral border-coral scale-125'
                      : 'bg-salt border-navy/20'
                  }`}
                />
                <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-8">
                  <div className="md:w-48 shrink-0">
                    <h3 className="font-serif text-2xl text-navy">{phase.phase}</h3>
                    <p className="text-weathered text-sm mt-1">{phase.time}</p>
                  </div>
                  <p className="text-navy/70 max-w-md">{phase.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PrivateEvents() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const iconMap: Record<string, string> = {
    oyster: '🦪',
    celebration: '🥂',
    corporate: '⚓',
  };

  return (
    <section id="events" className="py-24 md:py-32 bg-navy" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="text-seaglass-light text-xs uppercase tracking-[0.3em] mb-3">Private Gatherings</p>
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">Private Dock Events</h2>
          <p className="text-white/50 max-w-lg mx-auto">
            The upper deck, the raw bar, the whole waterfront — available for your occasion.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {privateEvents.map((event, i) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * i }}
              className="border border-white/10 p-8 hover:border-seaglass/30 transition-colors duration-500 group"
            >
              <div className="text-4xl mb-6">{iconMap[event.icon]}</div>
              <h3 className="font-serif text-2xl text-white mb-3 group-hover:text-seaglass-light transition-colors">
                {event.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">{event.description}</p>
              <div className="mt-6 pt-4 border-t border-white/10">
                <a
                  href="#reserve"
                  className="text-coral text-xs uppercase tracking-widest hover:text-coral-light transition-colors"
                >
                  Inquire →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReservationCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    guests: '2',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="reserve" className="py-24 md:py-32 bg-salt" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-coral text-xs uppercase tracking-[0.3em] mb-3">Join Us</p>
            <h2 className="font-serif text-4xl md:text-5xl text-navy mb-6">Reserve a Table</h2>
            <p className="text-weathered mb-8 max-w-md">
              Walk-ins welcome at the bar. For dinner and golden hour seating, reservations recommended.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-lg text-navy mb-2">Hours</h3>
                <div className="text-weathered text-sm space-y-1">
                  <p>Lunch: 11:30 AM – 2:30 PM (Thu–Sun)</p>
                  <p>Dinner: 5:00 PM – 10:00 PM (Daily)</p>
                  <p>Late Bar: 10:00 PM – Close (Fri–Sat)</p>
                </div>
              </div>
              <div>
                <h3 className="font-serif text-lg text-navy mb-2">Location</h3>
                <p className="text-weathered text-sm">
                  42 Harbor Walk, Pier 7
                  <br />
                  Waterfront District
                </p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-navy mb-2">Raw Bar</h3>
                <p className="text-weathered text-sm">
                  Fresh arrivals daily by 11 AM. List updates at noon.
                  <br />
                  <span className="text-coral">Currently: 8 varieties available</span>
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Reservation request sent! We will confirm within 2 hours.');
              }}
              className="bg-white p-8 border border-navy/5 space-y-5"
            >
              <div>
                <label className="block text-xs uppercase tracking-widest text-weathered mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-navy/10 bg-salt text-navy focus:outline-none focus:border-seaglass transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-weathered mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-navy/10 bg-salt text-navy focus:outline-none focus:border-seaglass transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-weathered mb-2">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-navy/10 bg-salt text-navy focus:outline-none focus:border-seaglass transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-weathered mb-2">Time</label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-navy/10 bg-salt text-navy focus:outline-none focus:border-seaglass transition-colors"
                  >
                    <option value="">Select</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="17:00">5:00 PM</option>
                    <option value="18:00">6:00 PM</option>
                    <option value="19:00">7:00 PM</option>
                    <option value="20:00">8:00 PM</option>
                    <option value="21:00">9:00 PM</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-weathered mb-2">Guests</label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-navy/10 bg-salt text-navy focus:outline-none focus:border-seaglass transition-colors"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? 'guest' : 'guests'}
                    </option>
                  ))}
                  <option value="9+">9+ (contact us)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-weathered mb-2">Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Allergies, celebrations, seating preference..."
                  className="w-full px-4 py-3 border border-navy/10 bg-salt text-navy focus:outline-none focus:border-seaglass transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-coral text-white text-sm uppercase tracking-widest hover:bg-coral-light transition-colors duration-300"
              >
                Request Reservation
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 bg-navy border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-serif text-xl text-white mb-1">Dockside Oyster Club</p>
            <p className="text-white/40 text-sm">Cold oysters. Clean cocktails. Late sun.</p>
          </div>
          <div className="flex items-center gap-6 text-white/40 text-sm">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
            <a href="#" className="hover:text-white transition-colors">Press</a>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/5 text-center text-white/30 text-xs">
          © 2024 Dockside Oyster Club. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div className="min-h-screen">
      <TideProgress />
      <Navigation />
      <Hero />
      <RawBar />
      <SeafoodFire />
      <CocktailCurrent />
      <SourceMap />
      <GoldenHour />
      <PrivateEvents />
      <ReservationCTA />
      <Footer />
    </div>
  );
}

export default App;
