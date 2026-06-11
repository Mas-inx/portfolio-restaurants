import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { menuItems, comboDeals, reviews, locations, heroImage, galleryImages, type MenuItem } from './data';

// ─── Types ───────────────────────────────────────────────
type SectionId = 'home' | 'menu' | 'combos' | 'process' | 'gallery' | 'reviews' | 'locations' | 'order';

// ─── SVG Icons ───────────────────────────────────────────
function FlameIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8 6 4 10 4 14c0 4.418 3.582 8 8 8s8-3.582 8-8c0-4-4-8-8-12zm0 18c-2.21 0-4-1.79-4-4 0-2 2-4 4-6 2 2 4 4 4 6 0 2.21-1.79 4-4 4z"/>
    </svg>
  );
}

function BurgerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12h18"/><path d="M5 12v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5"/><path d="M4 8h16a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>
      <circle cx="9" cy="9" r="1" fill="currentColor"/><circle cx="15" cy="9" r="1" fill="currentColor"/>
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  );
}

function FriesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 2l-2 6h4l-2 6h4l-3 8H7L4 14h4L6 8h4L8 2z"/>
      <circle cx="12" cy="15" r="1" fill="currentColor"/>
    </svg>
  );
}

function ChickenIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 8h-3l-2-3H9L7 8H4v2l3 2v8h10v-8l3-2V8z"/>
    </svg>
  );
}

function ShakeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2L6 7h12l-2-5H8z"/>
      <path d="M7 7L6 20a2 2 0 002 2h8a2 2 0 002-2L17 7"/>
    </svg>
  );
}

function LightningIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}

function SmashIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 6v6l4 2"/>
      <path d="M8 3l-2 3M16 3l2 3"/>
    </svg>
  );
}

function CheeseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 17l2-12h12l2 12"/>
      <path d="M4 17c0 1.5 1 2 4 2s4-.5 4-2 2-2 4-2 4 .5 4 2"/>
      <circle cx="9" cy="10" r="1" fill="currentColor"/>
      <circle cx="15" cy="10" r="1" fill="currentColor"/>
    </svg>
  );
}

function TruckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17h14M5 17a2 2 0 01-2-2V9l3-5h12l3 5v6a2 2 0 01-2 2M5 17v2a1 1 0 001 1h2a1 1 0 001-1v-2M19 17v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2"/>
      <circle cx="7" cy="12" r="1.5" fill="currentColor"/><circle cx="17" cy="12" r="1.5" fill="currentColor"/>
    </svg>
  );
}

function MotorcycleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5" cy="16" r="3"/><circle cx="19" cy="16" r="3"/>
      <path d="M12 16V8l4 2 2-4M9 13h6"/>
    </svg>
  );
}

/* ─── Icon Lookup ─── */
const iconMap: Record<string, React.FC<{ className?: string }>> = {
  flame: FlameIcon,
  burger: BurgerIcon,
  star: StarIcon,
  fries: FriesIcon,
  chicken: ChickenIcon,
  shake: ShakeIcon,
  lightning: LightningIcon,
  moon: MoonIcon,
  smash: SmashIcon,
  cheese: CheeseIcon,
  truck: TruckIcon,
  motorcycle: MotorcycleIcon,
};

function SvgIcon({ name, className = '' }: { name: string; className?: string }) {
  const Icon = iconMap[name];
  if (!Icon) return null;
  return <Icon className={className} />;
}

// ─── Spice Level Indicator ──────────────────────────────
function SpiceLevel({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 3 }).map((_, i) => (
        <FlameIcon key={i} className={`w-3.5 h-3.5 ${i < level ? 'text-flame-500' : 'text-charcoal-600'}`} />
      ))}
    </div>
  );
}

// ─── Ticker Item ────────────────────────────────────────
interface TickerEntry {
  text: string;
  icon?: string;
}

// ─── Marquee Ticker ─────────────────────────────────────
function MenuTicker() {
  const tickerItems: TickerEntry[] = [
    { icon: 'flame', text: 'OPEN TILL 2AM EVERY DAY' },
    { icon: 'burger', text: 'NEW: CHILI CRUNCH BURGER' },
    { icon: 'lightning', text: 'FREE DELIVERY OVER $25' },
    { icon: 'moon', text: 'LATE NIGHT SPECIALS 11PM-2AM' },
    { icon: 'fries', text: 'TRUFFLE FRIES BACK IN STOCK' },
    { icon: 'flame', text: 'OPEN TILL 2AM EVERY DAY' },
    { icon: 'burger', text: 'NEW: CHILI CRUNCH BURGER' },
    { icon: 'lightning', text: 'FREE DELIVERY OVER $25' },
    { icon: 'moon', text: 'LATE NIGHT SPECIALS 11PM-2AM' },
    { icon: 'fries', text: 'TRUFFLE FRIES BACK IN STOCK' },
  ];

  return (
    <div className="relative overflow-hidden bg-flame-500 py-2 border-y border-flame-400/50">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
      >
        {[...tickerItems, ...tickerItems].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-1.5 px-8 text-charcoal-900 font-bold text-sm tracking-widest uppercase">
            {item.icon && <SvgIcon name={item.icon} className="w-4 h-4" />}
            {item.text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Section Wrapper ────────────────────────────────────
function SectionWrapper({ id, children, className = '' }: { id?: SectionId; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ${className}`}>
      {children}
    </section>
  );
}

function SectionHeader({ title, subtitle, flame = false }: { title: string; subtitle?: string; flame?: boolean }) {
  return (
    <div className="text-center mb-12 sm:mb-16">
      {flame && <FlameIcon className="w-8 h-8 text-flame-500 mx-auto mb-3" />}
      <h2 className="font-['Anton'] text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-offwhite leading-none">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-offwhite/70 text-base sm:text-lg max-w-xl mx-auto font-['Inter'] font-medium">
          {subtitle}
        </p>
      )}
      <div className="mt-4 w-20 h-1 bg-flame-500 mx-auto rounded-full" />
    </div>
  );
}

// ─── Sticker Label ──────────────────────────────────────
function StickerLabel({ text, icon, className = '' }: { text: string; icon?: string; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 bg-flame-500 text-charcoal-900 font-bold text-xs tracking-widest uppercase rotate-[-2deg] ${className}`}>
      {icon && <SvgIcon name={icon} className="w-3.5 h-3.5" />}
      {text}
    </span>
  );
}

// ─── Navigation ─────────────────────────────────────────
function Nav({ activeSection }: { activeSection: SectionId }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links: { id: SectionId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'combos', label: 'Combos' },
    { id: 'process', label: 'How We Do It' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'locations', label: 'Locations' },
  ];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-charcoal-900/95 backdrop-blur-md shadow-lg shadow-black/30' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <FlameIcon className="w-6 h-6 text-flame-500 group-hover:scale-110 transition-transform" />
            <span className="font-['Anton'] text-xl sm:text-2xl uppercase tracking-wide text-offwhite">
              Fireline
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`px-3 py-2 rounded-lg text-sm font-semibold uppercase tracking-wider transition-all duration-200 ${
                  activeSection === link.id
                    ? 'text-flame-500 bg-flame-500/10'
                    : 'text-offwhite/70 hover:text-offwhite hover:bg-white/5'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop Order Button */}
          <a
            href="#order"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-flame-500 text-charcoal-900 font-bold text-sm uppercase tracking-wider rounded-lg hover:bg-flame-400 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-flame-500/30"
          >
            <BurgerIcon className="w-4 h-4" />
            Order Now
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-offwhite/80 hover:text-offwhite"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <>
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-charcoal-800/98 backdrop-blur-md border-t border-white/10"
          >
            <div className="px-4 py-4 space-y-1">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-wider ${
                    activeSection === link.id
                      ? 'text-flame-500 bg-flame-500/10'
                      : 'text-offwhite/70 hover:text-offwhite hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#order"
                onClick={() => setMobileOpen(false)}
                className="block mt-3 px-4 py-3 bg-flame-500 text-charcoal-900 font-bold text-sm uppercase tracking-wider rounded-lg text-center"
              >
                Order Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─── Mobile Sticky Order Bar ────────────────────────────
function MobileStickyOrder() {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-charcoal-900/95 backdrop-blur-md border-t border-white/10"
    >
      <a
        href="#order"
        className="flex items-center justify-center gap-2 w-full py-3 bg-flame-500 text-charcoal-900 font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-flame-500/30 active:scale-95 transition-transform"
      >
        <BurgerIcon className="w-4 h-4" />
        Order Now — Open till 2AM
      </a>
    </motion.div>
  );
}

// ─── Section 1: Hero ────────────────────────────────────
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-charcoal-900">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900 via-charcoal-800 to-charcoal-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#ff450015_0%,_transparent_70%)]" />

      {/* Decorative flame lines */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-flame-500 via-transparent to-transparent opacity-30" />
      <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-flame-500 to-transparent opacity-20" />

      <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text */}
          <div className="text-center lg:text-left">
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-flame-500/20 border border-flame-500/40 rounded-full text-flame-300 text-xs font-bold uppercase tracking-widest mb-6"
            >
              <span className="w-2 h-2 bg-flame-500 rounded-full animate-pulse" />
              Open till 2AM
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-['Anton'] text-6xl sm:text-7xl md:text-8xl lg:text-9xl uppercase leading-none text-offwhite tracking-tight"
            >
              Built{' '}
              <span className="text-flame-500">Hot.</span>
              <br />
              Served{' '}
              <span className="text-flame-500">Loud.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-6 text-lg sm:text-xl text-offwhite/70 max-w-lg mx-auto lg:mx-0 font-['Inter'] font-medium"
            >
              Flame-grilled smash burgers. Loud street culture. Quick ordering. No compromises.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a
                href="#menu"
                className="px-8 py-3.5 border-2 border-flame-500 text-flame-500 font-bold text-sm uppercase tracking-widest rounded-lg hover:bg-flame-500 hover:text-charcoal-900 transition-all duration-200 text-center"
              >
                View Menu
              </a>
              <a
                href="#order"
                className="px-8 py-3.5 bg-flame-500 text-charcoal-900 font-bold text-sm uppercase tracking-widest rounded-lg hover:bg-flame-400 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-flame-500/30 text-center"
              >
                Order Now
              </a>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="mt-10 flex items-center gap-4 justify-center lg:justify-start text-sm text-offwhite/50"
            >
              <div className="flex -space-x-2">
                {['TK', 'MJ', 'AL', 'RD'].map((init, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-flame-500/20 border border-flame-500/30 flex items-center justify-center text-flame-400 text-xs font-bold">
                    {init}
                  </div>
                ))}
              </div>
              <span className="font-medium">Rated 4.9/5 by 500+ smash fans</span>
            </motion.div>
          </div>

          {/* Right Side - Hero Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, type: 'spring' }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="relative w-96 h-96">
              {/* Outer glow */}
              <div className="absolute inset-0 rounded-full bg-flame-500/20 blur-3xl animate-pulse" />
              <motion.img
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, type: 'spring' }}
                src={heroImage}
                alt="Fireline Smash Burger"
                className="relative z-10 w-full h-full object-cover rounded-full shadow-2xl shadow-flame-500/30"
              />

              {/* Floating labels */}
              <motion.div
                animate={{ rotate: [0, 5, 0], x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4"
              >
                <StickerLabel text="SMASHED" icon="smash" />
              </motion.div>
              <motion.div
                animate={{ rotate: [0, -5, 0], x: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-2 -left-6"
              >
                <StickerLabel text="FLAME-GRILLED" icon="flame" />
              </motion.div>
              <motion.div
                animate={{ rotate: [0, 3, 0], y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 2 }}
                className="absolute top-20 -left-10"
              >
                <StickerLabel text="DOUBLE" icon="burger" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 rounded-full border-2 border-offwhite/20 flex items-start justify-center pt-2"
        >
          <div className="w-1 h-2 bg-offwhite/40 rounded-full" />
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─── Section 2: Menu Highlights ─────────────────────────
function MenuHighlight({ item, index }: { item: MenuItem; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [showIngredients, setShowIngredients] = useState(false);

  const categoryColors: Record<string, string> = {
    burgers: 'from-flame-500/20 to-flame-500/5 border-flame-500/30',
    fries: 'from-gold/20 to-gold/5 border-gold/30',
    wings: 'from-neon-red/20 to-neon-red/5 border-neon-red/30',
    shakes: 'from-offwhite/10 to-offwhite/5 border-offwhite/20',
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, type: 'spring', stiffness: 80 }}
      onHoverStart={() => setShowIngredients(true)}
      onHoverEnd={() => setShowIngredients(false)}
      className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-b ${categoryColors[item.category] || 'from-charcoal-700/50 to-charcoal-800/50 border-charcoal-600/30'} p-5 sm:p-6 cursor-default transition-shadow duration-300 hover:shadow-2xl hover:shadow-flame-500/10`}
    >
      {/* Spice level badge */}
      {item.spiceLevel > 0 && (
        <div className="absolute top-3 right-3">
          <SpiceLevel level={item.spiceLevel} />
        </div>
      )}

      {/* Category tag */}
      <span className="inline-block px-2 py-0.5 bg-charcoal-700/50 text-offwhite/50 text-[10px] font-bold uppercase tracking-widest rounded mb-3">
        {item.category}
      </span>

      <h3 className="font-['Anton'] text-xl sm:text-2xl uppercase text-offwhite leading-tight mb-1">
        {item.name}
      </h3>

      <p className="text-offwhite/60 text-sm font-['Inter'] font-medium leading-relaxed mb-4 min-h-[40px]">
        {item.description}
      </p>

      {/* Hover: ingredient reveal */}
      <AnimatePresence>
        {showIngredients && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-3 overflow-hidden"
          >
            <div className="flex flex-wrap gap-1.5">
              {item.description.split(', ').slice(0, 4).map((ing, i) => (
                <span key={i} className="px-2 py-0.5 bg-flame-500/10 text-flame-300 text-[10px] font-bold uppercase tracking-wider rounded-full border border-flame-500/20">
                  {ing.split(' ').slice(-2).join(' ')}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <motion.span
          key={item.price}
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          className="font-['Anton'] text-2xl text-flame-500"
        >
          {item.price}
        </motion.span>
        {item.featured && (
          <span className="text-[10px] font-bold uppercase tracking-widest text-gold/70">
            <StarIcon className="w-3 h-3 inline-block mr-0.5" /> Featured
          </span>
        )}
      </div>
    </motion.div>
  );
}

function MenuSection() {
  const categories = [
    { key: 'burgers', label: 'Burgers', icon: 'burger' },
    { key: 'fries', label: 'Fries', icon: 'fries' },
    { key: 'wings', label: 'Wings', icon: 'chicken' },
    { key: 'shakes', label: 'Shakes', icon: 'shake' },
  ] as const;

  const [activeCategory, setActiveCategory] = useState<string>('burgers');
  const filtered = menuItems.filter((item) => item.category === activeCategory);

  return (
    <div className="py-20 sm:py-28">
      <SectionHeader title="The Menu" subtitle="Flame-grilled. Smashed. Loud." flame />

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-14">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
              activeCategory === cat.key
                ? 'bg-flame-500 text-charcoal-900 shadow-lg shadow-flame-500/30'
                : 'bg-charcoal-700/50 text-offwhite/60 hover:bg-charcoal-700 hover:text-offwhite border border-charcoal-600/30'
            }`}
          >
            <SvgIcon name={cat.icon} className="w-4 h-4 inline-block mr-1.5" />
            {cat.label}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        >
          {filtered.map((item, i) => (
            <MenuHighlight key={item.name} item={item} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── Section 3: Combos ──────────────────────────────────
function ComboCard({ combo, index }: { combo: typeof comboDeals[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80, rotateX: 5 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, type: 'spring', stiffness: 70 }}
      className="relative bg-gradient-to-b from-charcoal-700/80 to-charcoal-800/80 rounded-2xl border border-charcoal-600/30 p-6 sm:p-8 overflow-hidden group hover:shadow-xl hover:shadow-flame-500/5 transition-shadow"
    >
      {/* Background pattern */}
      <div className="absolute -right-12 -top-12 w-40 h-40 bg-flame-500/5 rounded-full blur-2xl group-hover:bg-flame-500/10 transition-all" />

      {/* Label */}
      <div className={`inline-block px-3 py-1 ${combo.labelColor} text-charcoal-900 text-xs font-bold uppercase tracking-widest rounded mb-4`}>
        {combo.label}
      </div>

      <h3 className="font-['Anton'] text-3xl sm:text-4xl uppercase text-offwhite leading-none mb-4">
        {combo.name}
      </h3>

      <ul className="space-y-2 mb-6">
        {combo.items.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="flex items-center gap-2 text-offwhite/70 text-sm font-medium"
          >
            <span className="text-flame-500 text-lg">+</span>
            {item}
          </motion.li>
        ))}
      </ul>

      <div className="flex items-baseline gap-3 pt-4 border-t border-white/5">
        <span className="font-['Anton'] text-4xl sm:text-5xl text-flame-500">{combo.price}</span>
        <span className="text-offwhite/30 line-through text-lg">{combo.originalPrice}</span>
        <span className="ml-auto text-gold/70 text-xs font-bold uppercase tracking-widest">Save {Math.round((1 - parseInt(combo.price.replace('$','')) / parseInt(combo.originalPrice.replace('$',''))) * 100)}%</span>
      </div>
    </motion.div>
  );
}

function CombosSection() {
  return (
    <div className="py-20 sm:py-28">
      <SectionHeader title="Combo Deals" subtitle="More meat. Less money. Stacked." flame />
      <div className="grid md:grid-cols-3 gap-6">
        {comboDeals.map((combo, i) => (
          <ComboCard key={combo.name} combo={combo} index={i} />
        ))}
      </div>
    </div>
  );
}

// ─── Section 4: How We Do It ────────────────────────────
const processSteps = [
  {
    icon: 'flame',
    title: 'Flame',
    description: 'Our grills hit 800°F. That\'s where the flavor starts. Every patty hits screaming-hot flame for that signature char.',
    color: 'from-flame-500/20 to-flame-500/5 border-flame-500/30',
  },
  {
    icon: 'smash',
    title: 'Smash',
    description: 'We smash each patty thin on the flat-top — maximum crust, maximum juice, maximum crunch in every bite.',
    color: 'from-neon-orange/20 to-neon-orange/5 border-neon-orange/30',
  },
  {
    icon: 'cheese',
    title: 'Stack',
    description: 'Double cheese. Crispy bacon. Fresh toppings. We stack it like it matters — because it does.',
    color: 'from-gold/20 to-gold/5 border-gold/30',
  },
  {
    icon: 'flame',
    title: 'Serve',
    description: 'Hot, fast, and loud. Your order hits the window in under 6 minutes or it\'s on us.',
    color: 'from-flame-500/20 to-flame-500/5 border-flame-500/30',
  },
];

function ProcessSection() {
  return (
    <div className="py-20 sm:py-28">
      <SectionHeader title="How We Do It" subtitle="Flame. Smash. Stack. Serve. No shortcuts." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {processSteps.map((step, i) => {
          const ref = useRef(null);
          const isInView = useInView(ref, { once: true, margin: '-50px' });
          return (
            <motion.div
              key={step.title}
              ref={ref}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15, type: 'spring', stiffness: 80 }}
              className={`relative rounded-2xl border bg-gradient-to-b ${step.color} p-6 text-center group hover:-translate-y-1 transition-transform duration-300`}
            >
              {/* Step Number */}
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-flame-500 rounded-full flex items-center justify-center text-charcoal-900 font-bold text-sm font-['Anton']">
                {i + 1}
              </div>

              <SvgIcon name={step.icon} className="w-10 h-10 text-flame-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-['Anton'] text-2xl uppercase text-offwhite mb-2">{step.title}</h3>
              <p className="text-offwhite/60 text-sm font-medium leading-relaxed">{step.description}</p>

              {/* Animated progress line */}
              {i < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.15, duration: 0.5 }}
                    className="h-full bg-flame-500/50 origin-left"
                    style={{ transform: 'scaleX(var(--tw-scale-x))' }}
                  />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Section 5: Street Gallery ──────────────────────────

function StreetGallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="py-20 sm:py-28">
      <SectionHeader title="Street Gallery" subtitle="The vibe. The food. The chaos." />
      <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 sm:gap-4 space-y-3 sm:space-y-4">
        {galleryImages.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            whileHover={{ scale: 1.03, zIndex: 10 }}
            className="relative break-inside-avoid rounded-2xl overflow-hidden border border-charcoal-600/30 cursor-pointer group"
            style={{ marginBottom: '0.75rem' }}
          >
            <img
              src={img.src}
              alt={img.label}
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <StickerLabel text={img.label} className="text-[10px]" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Section 6: Reviews ─────────────────────────────────
function ReviewsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="py-20 sm:py-28">
      <SectionHeader title="What They're Saying" subtitle="Real talk. No filler." flame />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {reviews.map((review, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="relative bg-gradient-to-b from-charcoal-700/50 to-charcoal-800/50 rounded-2xl border border-charcoal-600/30 p-6 group hover:border-flame-500/20 transition-colors"
          >
            {/* Quote mark */}
            <div className="absolute -top-2 -left-2 text-5xl text-flame-500/20 font-['Anton'] leading-none">&quot;</div>

            <p className="text-offwhite/80 text-sm font-medium leading-relaxed mb-4 relative z-10">
              {review.text}
            </p>

            <div className="flex items-center gap-3 pt-3 border-t border-white/5">
              <div className="w-9 h-9 rounded-full bg-flame-500/20 border border-flame-500/30 flex items-center justify-center text-flame-400 text-sm font-bold">
                {review.initials}
              </div>
              <div>
                <span className="block text-offwhite text-xs font-bold uppercase tracking-wider">{review.initials}</span>
                <span className="text-offwhite/40 text-[10px] font-medium">
                  <StarIcon className="w-3 h-3 inline-block mr-0.5 text-gold" />
                  {review.tag.replace('✪', '').trim()}
                </span>
              </div>
            </div>

            {/* Star rating */}
            <div className="absolute top-4 right-4 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, s) => (
                <StarIcon key={s} className="w-3 h-3 text-gold" />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Section 7: Locations ───────────────────────────────
function LocationsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const statusColors: Record<string, string> = {
    Open: 'text-green-400 bg-green-500/10 border-green-500/30',
    'Closing soon': 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
    Closed: 'text-red-400 bg-red-500/10 border-red-500/30',
  };

  return (
    <div ref={ref} className="py-20 sm:py-28">
      <SectionHeader title="Find Us" subtitle="Come through. We're waiting." flame />
      <div className="grid md:grid-cols-3 gap-6">
        {locations.map((loc, i) => (
          <motion.div
            key={loc.name}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="bg-gradient-to-b from-charcoal-700/50 to-charcoal-800/50 rounded-2xl border border-charcoal-600/30 p-6 group hover:border-flame-500/20 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-['Anton'] text-xl uppercase text-offwhite">{loc.name}</h3>
              <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-full border ${statusColors[loc.status] || statusColors.Open}`}>
                {loc.status}
              </span>
            </div>

            <div className="space-y-2 text-sm text-offwhite/60 font-medium">
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 text-flame-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {loc.address}
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 text-flame-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
                {loc.hours}
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 text-flame-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2a8 8 0 0 0-8 8c0 5.5 8 12 8 12s8-6.5 8-12a8 8 0 0 0-8-8z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                Delivers within {loc.deliveryRadius}
              </p>
            </div>

            <motion.a
              href="#order"
              whileHover={{ scale: 1.02 }}
              className="mt-5 block w-full py-2.5 bg-flame-500/10 border border-flame-500/30 text-flame-400 text-xs font-bold uppercase tracking-widest rounded-xl text-center hover:bg-flame-500/20 transition-colors"
            >
              Order Delivery
            </motion.a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Section 8: Order CTA ───────────────────────────────
function OrderCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const platforms = [
    { name: 'Uber Eats', icon: 'car', color: 'bg-green-600/20 border-green-600/40 text-green-400' },
    { name: 'DoorDash', icon: 'motorcycle', color: 'bg-red-600/20 border-red-600/40 text-red-400' },
    { name: 'Grubhub', icon: 'package', color: 'bg-blue-600/20 border-blue-600/40 text-blue-400' },
  ];

  return (
    <div ref={ref} className="py-20 sm:py-28">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-flame-500/20 to-charcoal-800 border border-flame-500/30 p-8 sm:p-12 md:p-16 text-center"
      >
        {/* Decorative flame lines */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-flame-500 to-transparent" />
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-flame-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-flame-500/5 rounded-full blur-3xl" />

        <div className="relative z-10">
          <motion.div
            animate={{ rotate: [0, 5, 0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="inline-block mb-4"
          >
            <BurgerIcon className="w-10 h-10 text-flame-500" />
          </motion.div>

          <h2 className="font-['Anton'] text-4xl sm:text-5xl md:text-6xl uppercase text-offwhite leading-none mb-4">
            Ready to <span className="text-flame-500">Eat?</span>
          </h2>

          <p className="text-offwhite/70 text-base sm:text-lg max-w-lg mx-auto mb-8 font-medium">
            Order now for pickup or delivery. Open till 2AM every day — late night cravings, handled.
          </p>

          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-10 py-4 bg-flame-500 text-charcoal-900 font-bold text-base sm:text-lg uppercase tracking-widest rounded-xl shadow-2xl shadow-flame-500/40 hover:bg-flame-400 transition-all"
          >
            <BurgerIcon className="w-5 h-5" />
            Start Your Order
          </motion.a>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {platforms.map((p) => (
              <span key={p.name} className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg border text-xs font-bold uppercase tracking-wider ${p.color}`}>
                {p.icon === 'car' && <TruckIcon className="w-4 h-4" />}
                {p.icon === 'motorcycle' && <MotorcycleIcon className="w-4 h-4" />}
                {p.icon === 'package' && (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 4h4a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2h4"/><polyline points="16 8 12 12 8 8"/><line x1="12" y1="12" x2="12" y2="17"/></svg>
                )}
                {p.name}
              </span>
            ))}
          </div>

          <p className="mt-6 text-offwhite/40 text-xs font-medium">
            Free delivery on orders over $25 • Average prep time: 6 min
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Footer ─────────────────────────────────────────────
function FooterSection() {
  return (
    <footer className="border-t border-charcoal-700/50 bg-charcoal-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <FlameIcon className="w-5 h-5 text-flame-500" />
              <span className="font-['Anton'] text-xl uppercase tracking-wide text-offwhite">Fireline</span>
            </div>
            <p className="text-offwhite/50 text-sm font-medium leading-relaxed">
              Flame-grilled smash burgers. Loud street culture. Open late. Every day.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-['Anton'] text-sm uppercase tracking-widest text-offwhite mb-4">Menu</h4>
            <ul className="space-y-2">
              {['Burgers', 'Fries', 'Wings', 'Shakes', 'Combos'].map((item) => (
                <li key={item}>
                  <a href="#menu" className="text-offwhite/50 hover:text-flame-400 text-sm font-medium transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-['Anton'] text-sm uppercase tracking-widest text-offwhite mb-4">Company</h4>
            <ul className="space-y-2">
              {['About', 'Careers', 'Press', 'Catering', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-offwhite/50 hover:text-flame-400 text-sm font-medium transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-['Anton'] text-sm uppercase tracking-widest text-offwhite mb-4">Follow</h4>
            <div className="flex gap-3">
              {[
                { name: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                { name: 'X/Twitter', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
                { name: 'Message', path: 'M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z' },
                { name: 'Music', path: 'M12 3v10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z' },
              ].map((social, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-charcoal-700/50 border border-charcoal-600/30 flex items-center justify-center hover:bg-flame-500/20 hover:border-flame-500/30 transition-all group" aria-label={social.name}>
                  <svg className="w-4 h-4 text-offwhite/50 group-hover:text-flame-400 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
            <p className="mt-4 text-offwhite/30 text-xs font-medium">
              #FirelineBurgers
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-charcoal-700/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-offwhite/30 text-xs font-medium">
            &copy; 2026 Fireline Burgers. All rights reserved.
          </p>
          <div className="flex gap-4 text-offwhite/30 text-xs font-medium">
            <a href="#" className="hover:text-offwhite/50 transition-colors">Privacy</a>
            <a href="#" className="hover:text-offwhite/50 transition-colors">Terms</a>
            <a href="#" className="hover:text-offwhite/50 transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Main App ───────────────────────────────────────────
function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id') as SectionId;
            if (id) setActiveSection(id);
          }
        }
      },
      { threshold: 0.2, rootMargin: '-80px 0px 0px 0px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="noise-overlay min-h-screen bg-charcoal-900 text-offwhite">
      <Nav activeSection={activeSection} />
      <MenuTicker />

      <main>
        {/* 1. Hero */}
        <section id="home">
          <Hero />
        </section>

        {/* 2. Menu Highlights */}
        <section id="menu">
          <SectionWrapper>
            <MenuSection />
          </SectionWrapper>
        </section>

        {/* Background break */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-flame-500/5 to-transparent" />
          <SectionWrapper id="combos">
            <CombosSection />
          </SectionWrapper>
        </div>

        {/* 4. How We Do It */}
        <section id="process">
          <SectionWrapper>
            <ProcessSection />
          </SectionWrapper>
        </section>

        {/* Background break */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-flame-500/5 to-transparent" />
          <SectionWrapper id="gallery">
            <StreetGallery />
          </SectionWrapper>
        </div>

        {/* 6. Reviews */}
        <section id="reviews">
          <SectionWrapper>
            <ReviewsSection />
          </SectionWrapper>
        </section>

        {/* 7. Locations */}
        <section id="locations">
          <SectionWrapper>
            <LocationsSection />
          </SectionWrapper>
        </section>

        {/* 8. Order CTA */}
        <section id="order">
          <SectionWrapper>
            <OrderCTA />
          </SectionWrapper>
        </section>
      </main>

      <FooterSection />
      <MobileStickyOrder />
    </div>
  );
}

export default App;
