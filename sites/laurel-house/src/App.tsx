import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import {
  siteName, tagline, heroImage, greenhouseImage, navLinks, menuCategories,
  greenhouseFeatures, rituals, seasonalDishes, eventPackages, journalPosts,
  hours, bookingPolicy, address,
} from './data';

// ─── Utility Components ───────────────────────────────────────────────────────

function Icon({ name, className = '' }: { name: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    croissant: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4 16c1-2 3-4 6-5s5-1 7 0c2 1 3 3 3 5" />
        <path d="M4 16c0 2 2 4 5 4s6-1 8-3c1-1 2-2 3-2" />
        <path d="M7 11c1-2 3-4 5-5s4-1 5 0" />
        <path d="M10 6c1-1 2-2 4-2" />
      </svg>
    ),
    egg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <ellipse cx="12" cy="14" rx="8" ry="7" />
        <circle cx="12" cy="14" r="3" />
        <path d="M8 7c1-2 2.5-3 4-3s3 1 4 3" />
      </svg>
    ),
    coffee: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M5 11h12v6a4 4 0 01-4 4H9a4 4 0 01-4-4v-6z" />
        <path d="M17 13h1a3 3 0 010 6h-1" />
        <path d="M8 5c0-1 .5-2 1.5-2S11 4 11 5" />
        <path d="M12 5c0-1 .5-2 1.5-2S15 4 15 5" />
      </svg>
    ),
    flower: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="2" />
        <path d="M12 10c-1-3 0-6 1-7s3 0 3 2-1 4-2 5" />
        <path d="M14 12c3-1 6 0 7 1s0 3-2 3-4-1-5-2" />
        <path d="M12 14c1 3 0 6-1 7s-3 0-3-2 1-4 2-5" />
        <path d="M10 12c-3 1-6 0-7-1s0-3 2-3 4 1 5 2" />
      </svg>
    ),
    leaf: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M6 21c3-6 6-10 12-14-2 6-6 10-12 14z" />
        <path d="M6 21c2-4 5-7 9-10" />
        <path d="M3 21h3" />
      </svg>
    ),
  };
  return <>{icons[name] || null}</>;
}

function RevealOnScroll({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Botanical SVG line drawing component
function BotanicalDrawing({ className = '', variant = 'leaf' }: { className?: string; variant?: 'leaf' | 'branch' | 'flower' | 'fern' }) {
  const paths: Record<string, string> = {
    leaf: 'M10 80 Q30 40 50 20 Q70 40 90 80 M50 20 L50 90 M30 50 Q50 45 70 50',
    branch: 'M10 90 Q30 70 50 50 Q70 30 90 10 M50 50 Q40 35 30 25 M50 50 Q60 35 70 25 M50 50 Q45 65 35 70',
    flower: 'M50 50 Q40 30 50 20 Q60 30 50 50 M50 50 Q30 40 20 50 Q30 60 50 50 M50 50 Q40 70 50 80 Q60 70 50 50 M50 50 Q70 40 80 50 Q70 60 50 50 M50 50 L50 90',
    fern: 'M50 90 L50 10 M50 20 Q35 15 25 20 M50 20 Q65 15 75 20 M50 35 Q30 30 20 35 M50 35 Q70 30 80 35 M50 50 Q35 45 25 50 M50 50 Q65 45 75 50 M50 65 Q40 60 30 65 M50 65 Q60 60 70 65',
  };
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
      <path d={paths[variant]} className="botanical-line" />
    </svg>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-laurel-white/95 backdrop-blur-md py-3 shadow-sm border-b border-laurel-light/40' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="font-serif font-semibold text-xl text-laurel-green tracking-tight">
          {siteName}
        </a>
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} className="text-[11px] uppercase tracking-[0.15em] text-laurel-muted hover:text-laurel-green transition-colors font-medium">
              {link.label}
            </a>
          ))}
        </div>
        <a href="#reserve" className="hidden md:block bg-laurel-green text-laurel-white px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.15em] rounded-full hover:bg-laurel-text transition-colors">
          Reserve
        </a>
        <button onClick={() => setOpen(!open)} className="md:hidden text-laurel-green">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M6 18L18 6" /> : <><path d="M4 8h16" /><path d="M4 16h16" /></>}
          </svg>
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-laurel-white/98 backdrop-blur-md border-t border-laurel-light/40"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map(link => (
                <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-sm text-laurel-text/80 hover:text-laurel-green">
                  {link.label}
                </a>
              ))}
              <a href="#reserve" onClick={() => setOpen(false)} className="mt-2 bg-laurel-green text-laurel-white px-5 py-3 text-xs font-semibold uppercase tracking-wider rounded-full text-center">
                Reserve a Table
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ─── Section 1: Hero ──────────────────────────────────────────────────────────

function Hero() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const cardY = useTransform(scrollY, [0, 800], [0, -60]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image with parallax */}
      <motion.div className="absolute inset-0" style={{ y: heroY }}>
        <img src={heroImage} alt="Sunlit greenhouse brunch" className="w-full h-[120%] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-laurel-white/40 via-laurel-white/60 to-laurel-white" />
      </motion.div>

      {/* Floating botanical decorations */}
      <BotanicalDrawing variant="leaf" className="absolute top-20 right-[10%] w-24 h-24 text-laurel-sage/20 float-gentle hidden md:block" />
      <div className="absolute bottom-32 left-[8%] hidden md:block" style={{ animationDelay: '1s' }}>
        <BotanicalDrawing variant="branch" className="w-32 h-32 text-laurel-light/30 float-gentle" />
      </div>
      <div className="absolute top-40 left-[15%] hidden md:block" style={{ animationDelay: '2s' }}>
        <BotanicalDrawing variant="flower" className="w-16 h-16 text-laurel-rose/20 float-gentle" />
      </div>

      <motion.div className="relative z-10 max-w-7xl mx-auto px-6 py-32 w-full" style={{ opacity: heroOpacity }}>
        <div className="grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-3">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[11px] uppercase tracking-[0.3em] text-laurel-sage font-medium mb-4"
            >
              Garden Brunch · Portland, OR
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-serif font-light text-5xl md:text-7xl lg:text-[5.5rem] text-laurel-text leading-[0.95] mb-6"
            >
              {tagline}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-laurel-muted text-base md:text-lg max-w-lg leading-relaxed mb-10"
            >
              A converted greenhouse courtyard where seasonal plates, botanical drinks, and slow mornings come together. Open daily for brunch.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <a href="#reserve" className="bg-laurel-green text-laurel-white px-8 py-4 text-sm font-medium uppercase tracking-wider rounded-full hover:bg-laurel-text transition-colors">
                Reserve a Table
              </a>
              <a href="#menu" className="border border-laurel-green/30 text-laurel-green px-8 py-4 text-sm font-medium uppercase tracking-wider rounded-full hover:bg-laurel-green/5 transition-colors">
                Today's Menu
              </a>
            </motion.div>
          </div>

          {/* Floating Reservation Card */}
          <motion.div className="md:col-span-2 hidden md:block" style={{ y: cardY }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
              className="bg-laurel-white/90 backdrop-blur-sm border border-laurel-light/50 rounded-2xl p-8 shadow-xl shadow-laurel-green/5"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-laurel-green animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-laurel-green font-semibold">Open Now</span>
              </div>
              <p className="font-serif text-2xl text-laurel-text mb-1">Saturday Morning</p>
              <p className="text-sm text-laurel-muted mb-6">7:00 AM – 3:30 PM</p>
              <div className="border-t border-laurel-light/50 pt-5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-laurel-muted">Walk-ins</span>
                  <span className="text-laurel-text font-medium">Welcome</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-laurel-muted">Next available</span>
                  <span className="text-laurel-green font-medium">11:30 AM</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-laurel-muted">Patio</span>
                  <span className="text-laurel-text font-medium">Sunny, 68°F</span>
                </div>
              </div>
              <a href="#reserve" className="block w-full text-center mt-6 bg-laurel-green text-laurel-white py-3 text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-laurel-text transition-colors">
                Book This Morning
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

// ─── Section 2: Today's Table (Menu) ──────────────────────────────────────────

function MenuSection() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section id="menu" className="py-24 md:py-32 bg-laurel-porcelain/50">
      <div className="max-w-5xl mx-auto px-6">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <p className="text-[11px] uppercase tracking-[0.3em] text-laurel-sage font-medium mb-3">Today's Table</p>
            <h2 className="font-serif font-light text-4xl md:text-5xl text-laurel-text mb-4">What's being served</h2>
            <p className="text-laurel-muted max-w-md mx-auto">Seasonal plates, fresh bakes, single-origin coffee, and botanical drinks. Menu changes with what's growing.</p>
          </div>
        </RevealOnScroll>

        {/* Category tabs */}
        <RevealOnScroll delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {menuCategories.map((cat, i) => (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(i)}
                className={`px-5 py-2.5 text-xs font-medium uppercase tracking-wider rounded-full transition-all ${
                  activeCategory === i
                    ? 'bg-laurel-green text-laurel-white'
                    : 'bg-laurel-white text-laurel-muted hover:text-laurel-green border border-laurel-light/50'
                }`}
              >
                <span className="mr-1.5 inline-flex w-4 h-4"><Icon name={cat.icon} className="w-4 h-4" /></span>
                {cat.category}
              </button>
            ))}
          </div>
        </RevealOnScroll>

        {/* Menu items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-0"
          >
            {menuCategories[activeCategory].items.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="flex items-start justify-between py-5 border-b border-laurel-light/40 group"
              >
                <div className="flex-1 pr-6">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-serif text-lg text-laurel-text group-hover:text-laurel-green transition-colors">{item.name}</h4>
                    {item.featured && (
                      <span className="text-[9px] font-semibold uppercase tracking-wider bg-laurel-butter/40 text-laurel-text px-2 py-0.5 rounded-full">Featured</span>
                    )}
                  </div>
                  <p className="text-sm text-laurel-muted leading-relaxed">{item.description}</p>
                  {item.dietary && (
                    <div className="flex gap-1.5 mt-2">
                      {item.dietary.map(d => (
                        <span key={d} className="text-[9px] font-medium uppercase tracking-wider text-laurel-sage bg-laurel-light/30 px-1.5 py-0.5 rounded">{d}</span>
                      ))}
                    </div>
                  )}
                </div>
                <span className="font-serif text-lg text-laurel-green shrink-0 pt-0.5">{item.price}</span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── Section 3: The Greenhouse (Parallax) ─────────────────────────────────────

function GreenhouseSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 0.4, 0.4, 0.6]);

  return (
    <section id="greenhouse" ref={ref} className="relative py-32 md:py-44 overflow-hidden">
      {/* Parallax background */}
      <motion.div className="absolute inset-0 -top-[10%] -bottom-[10%]" style={{ y: bgY }}>
        <img src={greenhouseImage} alt="Greenhouse interior" className="w-full h-full object-cover" />
        <motion.div className="absolute inset-0 bg-laurel-text/50" style={{ opacity: overlayOpacity }} />
      </motion.div>

      {/* Botanical overlay drawings */}
      <BotanicalDrawing variant="fern" className="absolute top-10 left-[5%] w-40 h-40 text-laurel-white/10 hidden md:block" />
      <BotanicalDrawing variant="flower" className="absolute bottom-20 right-[8%] w-32 h-32 text-laurel-white/10 hidden md:block" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <p className="text-[11px] uppercase tracking-[0.3em] text-laurel-light font-medium mb-3">The Space</p>
            <h2 className="font-serif font-light text-4xl md:text-5xl text-laurel-white mb-4">The Greenhouse</h2>
            <p className="text-laurel-white/70 max-w-lg mx-auto">A 1920s glass greenhouse, restored and reimagined. South-facing light, trailing ivy, and room to breathe.</p>
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {greenhouseFeatures.map((feature, i) => (
            <RevealOnScroll key={feature.title} delay={i * 0.12}>
              <div className="bg-laurel-white/10 backdrop-blur-sm border border-laurel-white/20 rounded-2xl p-6 h-full">
                <p className="text-[10px] uppercase tracking-[0.2em] text-laurel-butter font-medium mb-3">{feature.detail}</p>
                <h3 className="font-serif text-xl text-laurel-white mb-2">{feature.title}</h3>
                <p className="text-sm text-laurel-white/70 leading-relaxed">{feature.description}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 4: Weekend Rituals (Sticky Storytelling) ─────────────────────────

function WeekendRituals() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });

  // Determine active ritual based on scroll
  const activeIndex = useTransform(scrollYProgress, (v) => {
    if (v < 0.33) return 0;
    if (v < 0.66) return 1;
    return 2;
  });

  const [currentRitual, setCurrentRitual] = useState(0);

  useEffect(() => {
    const unsubscribe = activeIndex.on('change', (v) => setCurrentRitual(v));
    return unsubscribe;
  }, [activeIndex]);

  const ritual = rituals[currentRitual];

  return (
    <section id="weekends" ref={containerRef} className="relative" style={{ height: '300vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* Background image transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={ritual.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <img src={ritual.image} alt={ritual.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-laurel-white/95 via-laurel-white/80 to-laurel-white/40" />
          </motion.div>
        </AnimatePresence>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={ritual.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-[11px] uppercase tracking-[0.3em] text-laurel-sage font-medium mb-3">Weekend Rituals</p>
                  <h2 className="font-serif font-light text-4xl md:text-5xl lg:text-6xl text-laurel-text mb-3">{ritual.title}</h2>
                  <p className="text-sm text-laurel-green font-medium mb-6">{ritual.time}</p>
                  <p className="text-base text-laurel-muted leading-relaxed max-w-md mb-6">{ritual.description}</p>
                  <p className="font-serif italic text-lg text-laurel-sage">"{ritual.mood}"</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Ritual indicators */}
            <div className="hidden md:flex flex-col gap-4 items-start">
              {rituals.map((r, i) => (
                <div
                  key={r.id}
                  className={`flex items-center gap-3 transition-all duration-500 ${currentRitual === i ? 'opacity-100' : 'opacity-30'}`}
                >
                  <div className={`w-3 h-3 rounded-full transition-all duration-500 ${currentRitual === i ? 'bg-laurel-green scale-125' : 'bg-laurel-light'}`} />
                  <span className={`text-sm font-medium transition-colors ${currentRitual === i ? 'text-laurel-text' : 'text-laurel-muted'}`}>
                    {r.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-12 left-6 md:left-auto md:right-12"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-laurel-muted">Scroll to explore</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 5: Seasonal Plates (Card Stack) ──────────────────────────────────

function SeasonalPlates() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });

  return (
    <section id="seasonal" ref={containerRef} style={{ height: `${seasonalDishes.length * 80 + 100}vh` }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-laurel-porcelain/30">
        {/* Header */}
        <div className="absolute top-12 left-0 right-0 text-center z-20 pointer-events-none">
          <p className="text-[11px] uppercase tracking-[0.3em] text-laurel-sage font-medium mb-2">Seasonal Plates</p>
          <h2 className="font-serif font-light text-3xl md:text-4xl text-laurel-text">What's in season</h2>
        </div>

        {/* Card stack */}
        <div className="relative w-full max-w-2xl mx-auto px-6" style={{ height: '60vh' }}>
          {seasonalDishes.map((dish, i) => {
            // Each card becomes active at a certain scroll point
            const cardStart = i / seasonalDishes.length;
            const cardEnd = (i + 1) / seasonalDishes.length;

            const scale = useTransform(
              scrollYProgress,
              [cardStart, cardStart + 0.05, cardEnd - 0.05, cardEnd],
              [0.9 + i * 0.02, 1, 1, 0.95]
            );
            const y = useTransform(
              scrollYProgress,
              [cardStart, cardEnd],
              [50 + i * 20, -20]
            );
            const opacity = useTransform(
              scrollYProgress,
              [cardStart - 0.05, cardStart, cardEnd - 0.03, cardEnd],
              [0, 1, 1, 0.3]
            );
            const zIndex = seasonalDishes.length - i;

            return (
              <motion.div
                key={dish.name}
                className="absolute inset-x-6 top-0 bg-laurel-white rounded-3xl shadow-xl shadow-laurel-green/5 overflow-hidden border border-laurel-light/30"
                style={{ scale, y, opacity, zIndex }}
              >
                <div className="grid md:grid-cols-2 h-full">
                  <div className="relative overflow-hidden">
                    <img src={dish.image} alt={dish.name} className="w-full h-full object-cover rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-laurel-white/90 backdrop-blur-sm text-[10px] uppercase tracking-wider font-semibold text-laurel-green px-3 py-1.5 rounded-full">
                        {dish.season}
                      </span>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <h3 className="font-serif text-2xl md:text-3xl text-laurel-text mb-2">{dish.name}</h3>
                    <p className="text-sm text-laurel-muted leading-relaxed mb-5">{dish.description}</p>
                    <div className="mb-5">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-laurel-sage font-medium mb-2">Key Ingredients</p>
                      <div className="flex flex-wrap gap-1.5">
                        {dish.ingredients.map(ing => (
                          <span key={ing} className="text-[11px] text-laurel-muted bg-laurel-porcelain px-2 py-1 rounded">{ing}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1.5">
                        {dish.dietary.map(d => (
                          <span key={d} className="text-[9px] font-semibold uppercase tracking-wider text-laurel-sage bg-laurel-light/30 px-2 py-1 rounded">{d}</span>
                        ))}
                      </div>
                      <span className="font-serif text-xl text-laurel-green">{dish.price}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <p className="text-[10px] uppercase tracking-[0.2em] text-laurel-muted">Scroll to see plates</p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section 6: Private Brunch Events ─────────────────────────────────────────

function EventsSection() {
  return (
    <section id="events" className="py-24 md:py-32 bg-laurel-white">
      <div className="max-w-6xl mx-auto px-6">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <p className="text-[11px] uppercase tracking-[0.3em] text-laurel-sage font-medium mb-3">Private Events</p>
            <h2 className="font-serif font-light text-4xl md:text-5xl text-laurel-text mb-4">Gather here</h2>
            <p className="text-laurel-muted max-w-lg mx-auto">From bridal brunches to brand mornings. We'll set the table, you bring the people.</p>
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-2 gap-6">
          {eventPackages.map((pkg, i) => (
            <RevealOnScroll key={pkg.name} delay={i * 0.1}>
              <div className="border border-laurel-light/50 rounded-2xl p-8 h-full hover:border-laurel-green/30 hover:shadow-lg hover:shadow-laurel-green/5 transition-all group">
                <div className={`w-10 h-10 rounded-full bg-${pkg.accent}/20 flex items-center justify-center mb-5`}>
                  <BotanicalDrawing variant={['flower', 'leaf', 'branch', 'fern'][i] as 'flower' | 'leaf' | 'branch' | 'fern'} className="w-6 h-6 text-laurel-green" />
                </div>
                <h3 className="font-serif text-2xl text-laurel-text mb-1 group-hover:text-laurel-green transition-colors">{pkg.name}</h3>
                <p className="text-sm text-laurel-muted italic mb-5">{pkg.tagline}</p>
                <ul className="space-y-2 mb-6">
                  {pkg.includes.map(item => (
                    <li key={item} className="flex items-start gap-2 text-sm text-laurel-text/80">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-laurel-sage shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="border-t border-laurel-light/40 pt-4 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-laurel-muted">Guests</p>
                    <p className="text-sm font-medium text-laurel-text">{pkg.guests}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-wider text-laurel-muted">Pricing</p>
                    <p className="text-sm font-medium text-laurel-green">{pkg.price}</p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 7: Journal Strip ─────────────────────────────────────────────────

function JournalStrip() {
  return (
    <section id="journal" className="py-24 md:py-32 bg-laurel-porcelain/50">
      <div className="max-w-6xl mx-auto px-6">
        <RevealOnScroll>
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-laurel-sage font-medium mb-3">Journal</p>
              <h2 className="font-serif font-light text-4xl md:text-5xl text-laurel-text">From the kitchen</h2>
            </div>
            <a href="#" className="hidden md:block text-sm text-laurel-green hover:underline">View all posts →</a>
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {journalPosts.map((post, i) => (
            <RevealOnScroll key={post.title} delay={i * 0.1}>
              <article className="group cursor-pointer">
                <div className="overflow-hidden rounded-2xl mb-4 aspect-[4/3]">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-laurel-green">{post.category}</span>
                  <span className="text-laurel-light">·</span>
                  <span className="text-[10px] text-laurel-muted">{post.readTime} read</span>
                </div>
                <h3 className="font-serif text-lg text-laurel-text group-hover:text-laurel-green transition-colors mb-2 leading-snug">{post.title}</h3>
                <p className="text-sm text-laurel-muted leading-relaxed line-clamp-2">{post.excerpt}</p>
                <p className="text-[11px] text-laurel-muted/60 mt-3">{post.date}</p>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 8: Reservation CTA ───────────────────────────────────────────────

function ReservationSection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', date: '', time: '', guests: '2', notes: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="reserve" className="py-24 md:py-32 bg-laurel-green relative overflow-hidden">
      {/* Botanical background decoration */}
      <BotanicalDrawing variant="fern" className="absolute top-10 right-[5%] w-64 h-64 text-laurel-white/5 hidden md:block" />
      <BotanicalDrawing variant="branch" className="absolute bottom-10 left-[5%] w-48 h-48 text-laurel-white/5 hidden md:block" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Info */}
          <div>
            <RevealOnScroll>
              <p className="text-[11px] uppercase tracking-[0.3em] text-laurel-light font-medium mb-3">Reserve</p>
              <h2 className="font-serif font-light text-4xl md:text-5xl text-laurel-white mb-6">Save your morning</h2>
              <p className="text-laurel-white/70 leading-relaxed mb-10 max-w-md">
                Walk-ins always welcome. For weekends and parties of 6+, we recommend booking ahead. We'll hold your table by the window.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <div className="space-y-8">
                {/* Hours */}
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.2em] text-laurel-butter font-semibold mb-3">Hours</h4>
                  <div className="space-y-1.5">
                    {hours.map(h => (
                      <div key={h.day} className="flex justify-between text-sm">
                        <span className="text-laurel-white/70">{h.day}</span>
                        <span className="text-laurel-white font-medium">{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Policy */}
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.2em] text-laurel-butter font-semibold mb-3">Booking Policy</h4>
                  <ul className="space-y-1.5">
                    {bookingPolicy.map(p => (
                      <li key={p} className="flex items-start gap-2 text-sm text-laurel-white/70">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-laurel-light shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Address */}
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.2em] text-laurel-butter font-semibold mb-3">Find Us</h4>
                  <p className="text-sm text-laurel-white/70">{address.street}</p>
                  <p className="text-sm text-laurel-white/70">{address.city}</p>
                  <p className="text-sm text-laurel-white/70 mt-1">{address.phone}</p>
                  <p className="text-sm text-laurel-white/70">{address.email}</p>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right: Form */}
          <div>
            <RevealOnScroll delay={0.2}>
              <div className="bg-laurel-white rounded-3xl p-8 md:p-10 shadow-2xl shadow-laurel-text/10">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-8"
                    >
                      <div className="text-4xl mb-4"><Icon name="leaf" className="w-10 h-10 mx-auto text-laurel-green" /></div>
                      <h3 className="font-serif text-2xl text-laurel-text mb-2">Table reserved!</h3>
                      <p className="text-sm text-laurel-muted">We'll send a confirmation to {form.email || 'your email'}. See you in the greenhouse.</p>
                      <button onClick={() => setSubmitted(false)} className="mt-6 text-sm text-laurel-green hover:underline">Make another reservation</button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <h3 className="font-serif text-2xl text-laurel-text mb-2">Book a Table</h3>
                      <p className="text-sm text-laurel-muted mb-6">We'll confirm within the hour.</p>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] uppercase tracking-[0.15em] text-laurel-muted block mb-1.5">Name</label>
                          <input
                            type="text"
                            required
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            className="w-full bg-laurel-porcelain/50 border border-laurel-light/50 px-4 py-3 text-laurel-text rounded-xl focus:border-laurel-green focus:outline-none transition-colors text-sm"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase tracking-[0.15em] text-laurel-muted block mb-1.5">Email</label>
                          <input
                            type="email"
                            required
                            value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                            className="w-full bg-laurel-porcelain/50 border border-laurel-light/50 px-4 py-3 text-laurel-text rounded-xl focus:border-laurel-green focus:outline-none transition-colors text-sm"
                            placeholder="you@email.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="text-[10px] uppercase tracking-[0.15em] text-laurel-muted block mb-1.5">Date</label>
                          <input
                            type="date"
                            required
                            value={form.date}
                            onChange={e => setForm({ ...form, date: e.target.value })}
                            className="w-full bg-laurel-porcelain/50 border border-laurel-light/50 px-4 py-3 text-laurel-text rounded-xl focus:border-laurel-green focus:outline-none transition-colors text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase tracking-[0.15em] text-laurel-muted block mb-1.5">Time</label>
                          <select
                            value={form.time}
                            onChange={e => setForm({ ...form, time: e.target.value })}
                            className="w-full bg-laurel-porcelain/50 border border-laurel-light/50 px-4 py-3 text-laurel-text rounded-xl focus:border-laurel-green focus:outline-none transition-colors text-sm"
                          >
                            <option value="">Select</option>
                            <option value="7:00">7:00 AM</option>
                            <option value="8:00">8:00 AM</option>
                            <option value="9:00">9:00 AM</option>
                            <option value="10:00">10:00 AM</option>
                            <option value="11:00">11:00 AM</option>
                            <option value="12:00">12:00 PM</option>
                            <option value="13:00">1:00 PM</option>
                            <option value="14:00">2:00 PM</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] uppercase tracking-[0.15em] text-laurel-muted block mb-1.5">Guests</label>
                          <select
                            value={form.guests}
                            onChange={e => setForm({ ...form, guests: e.target.value })}
                            className="w-full bg-laurel-porcelain/50 border border-laurel-light/50 px-4 py-3 text-laurel-text rounded-xl focus:border-laurel-green focus:outline-none transition-colors text-sm"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, '8+'].map(n => (
                              <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] uppercase tracking-[0.15em] text-laurel-muted block mb-1.5">Special Requests</label>
                        <textarea
                          value={form.notes}
                          onChange={e => setForm({ ...form, notes: e.target.value })}
                          rows={3}
                          className="w-full bg-laurel-porcelain/50 border border-laurel-light/50 px-4 py-3 text-laurel-text rounded-xl focus:border-laurel-green focus:outline-none transition-colors text-sm resize-none"
                          placeholder="Window seat, high chair, birthday celebration..."
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-laurel-green text-laurel-white py-4 text-sm font-semibold uppercase tracking-wider rounded-full hover:bg-laurel-text transition-colors"
                      >
                        Request Reservation
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-laurel-text py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <h3 className="font-serif text-xl text-laurel-white mb-3">{siteName}</h3>
            <p className="text-sm text-laurel-white/50 max-w-sm leading-relaxed">
              A converted greenhouse courtyard in Portland. Seasonal brunch, botanical drinks, and slow mornings — daily.
            </p>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-laurel-sage mb-3">Visit</h4>
            <p className="text-sm text-laurel-white/60">{address.street}</p>
            <p className="text-sm text-laurel-white/60">{address.city}</p>
            <p className="text-sm text-laurel-white/60 mt-2">{address.phone}</p>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-laurel-sage mb-3">Follow</h4>
            <div className="flex flex-col gap-2">
              <a href="#" className="text-sm text-laurel-white/60 hover:text-laurel-white transition-colors">Instagram</a>
              <a href="#" className="text-sm text-laurel-white/60 hover:text-laurel-white transition-colors">Pinterest</a>
              <a href="#" className="text-sm text-laurel-white/60 hover:text-laurel-white transition-colors">Newsletter</a>
            </div>
          </div>
        </div>
        <div className="border-t border-laurel-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-laurel-white/30">© 2026 Laurel House. All rights reserved.</p>
          <div className="flex items-center gap-1 text-laurel-white/20">
            <BotanicalDrawing variant="leaf" className="w-4 h-4" />
            <span className="text-xs">Made with care in Portland</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen bg-laurel-white">
      <Navbar />
      <Hero />
      <MenuSection />
      <GreenhouseSection />
      <WeekendRituals />
      <SeasonalPlates />
      <EventsSection />
      <JournalStrip />
      <ReservationSection />
      <Footer />
    </div>
  );
}
