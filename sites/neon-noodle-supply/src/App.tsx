import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import {
  heroImage, menu, bowlOptions, basePrice, combos, processSteps, locations, navLinks
} from './data';
import type { MenuItem, Combo, ProcessStep, Location, BowlOption } from './data';

// ─── Utility Components ───────────────────────────────────────────────────────

function Icon({ name, className = '' }: { name: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    chili: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 3c-1 0-2 .5-2.5 1.5C9 5.5 8 7 7 9c-1.5 3-2 6-1 8.5C7 20 9 21 12 21s5-1 6-3.5c1-2.5.5-5.5-1-8.5-1-2-2-3.5-2.5-4.5C14 3.5 13 3 12 3z" />
        <path d="M12 3c.5-1 1-2 2-2.5" />
      </svg>
    ),
    bowl: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M3 12h18" />
        <path d="M5 12c0 4 3 7 7 7s7-3 7-7" />
        <path d="M4 8c1-2 3-3 5-3" />
        <path d="M8 5c0-1.5 1-3 2-3" />
        <path d="M12 5c0-1.5 1-3 2-3" />
        <path d="M16 5c0-1.5 1-3 2-3" />
        <path d="M9 21h6" />
      </svg>
    ),
  };
  return <>{icons[name] || null}</>;
}

// SteamLines used in hero
const SteamVisual = () => (
  <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex gap-3 pointer-events-none">
    {[0, 1, 2].map(i => (
      <div key={i} className="steam-line w-0.5 h-12 bg-gradient-to-t from-neon-offwhite/40 to-transparent rounded-full" />
    ))}
  </div>
);

function SpiceIndicator({ level }: { level: number }) {
  if (!level) return null;
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: level }).map((_, i) => (
        <span key={i} className="text-neon-red text-xs w-3 h-3 inline-flex"><Icon name="chili" className="w-3 h-3" /></span>
      ))}
    </div>
  );
}

function RevealOnScroll({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
      className={className}
    >
      {children}
    </motion.div>
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-neon-black/95 backdrop-blur-sm py-3 border-b border-neon-mid/30' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="font-display font-bold text-lg text-neon-yellow tracking-tight">NEON NOODLE<span className="text-neon-red">.</span></a>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} className="text-xs uppercase tracking-wider text-neon-gray hover:text-neon-yellow transition-colors font-medium">{link.label}</a>
          ))}
        </div>
        <a href="#order" className="hidden md:block bg-neon-yellow text-neon-black px-5 py-2 text-xs font-bold uppercase tracking-wider hover:bg-neon-red hover:text-neon-offwhite transition-colors">Order</a>
        <button onClick={() => setOpen(!open)} className="md:hidden text-neon-offwhite">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M6 18L18 6" /> : <><path d="M4 8h16" /><path d="M4 16h16" /></>}
          </svg>
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-neon-black border-t border-neon-mid">
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map(link => (
                <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-sm text-neon-offwhite/80 hover:text-neon-yellow">{link.label}</a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Ramen bowl" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-neon-black/60 via-neon-black/80 to-neon-black" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-display font-bold text-5xl md:text-7xl lg:text-8xl text-neon-offwhite leading-[0.9] mb-6"
            >
              Noodles<br />after dark<span className="text-neon-red">.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-neon-gray text-base md:text-lg max-w-md mb-8"
            >
              Broth bowls, wok-fired sides, and cold drinks until 2AM. Pickup or sit at the counter.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <a href="#order" className="bg-neon-yellow text-neon-black px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-neon-red hover:text-neon-offwhite transition-colors">Order Pickup</a>
              <a href="#menu" className="border border-neon-mid text-neon-offwhite px-8 py-4 text-sm font-bold uppercase tracking-wider hover:border-neon-yellow hover:text-neon-yellow transition-colors">See Menu</a>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative hidden md:block"
          >
            <div className="relative bg-neon-ink border border-neon-mid/40 p-8 max-w-xs mx-auto">
              <SteamVisual />
              <div className="absolute -top-3 left-6 bg-neon-red text-neon-offwhite text-[10px] font-bold uppercase tracking-wider px-3 py-1">OPEN NOW</div>
              <div className="text-center">
                <div className="text-neon-yellow font-display font-bold text-4xl mb-2">1:30 AM</div>
                <p className="text-neon-gray text-xs uppercase tracking-wider mb-4">Kitchen still firing</p>
                <div className="border-t border-neon-mid/40 pt-4">
                  <p className="text-neon-offwhite text-sm font-medium">Avg. Wait</p>
                  <p className="text-neon-yellow font-display font-bold text-2xl">8 min</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Menu Board ───────────────────────────────────────────────────────────────

function MenuBoardItem({ item, index }: { item: MenuItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="grid grid-cols-12 gap-3 py-4 border-b border-neon-mid/30 hover:bg-neon-ink/50 transition-colors px-3 -mx-3 group"
    >
      <div className="col-span-7 md:col-span-5">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-display font-semibold text-neon-offwhite group-hover:text-neon-yellow transition-colors">{item.name}</h4>
          {item.tag && <span className="text-[9px] font-bold uppercase tracking-wider bg-neon-red/20 text-neon-red px-2 py-0.5">{item.tag}</span>}
        </div>
        <p className="text-xs text-neon-gray leading-relaxed">{item.description}</p>
      </div>
      <div className="col-span-2 md:col-span-3 flex items-center">
        <SpiceIndicator level={item.spice || 0} />
        {item.wait && <span className="text-[10px] text-neon-gray ml-2">{item.wait}</span>}
      </div>
      <div className="col-span-3 md:col-span-4 flex items-center justify-end">
        <span className="font-display font-bold text-lg text-neon-yellow">{item.price}</span>
      </div>
    </motion.div>
  );
}

function MenuSection() {
  return (
    <section id="menu" className="py-24 md:py-32 bg-neon-ink/30">
      <div className="max-w-5xl mx-auto px-6">
        <RevealOnScroll>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-0.5 bg-neon-yellow" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-neon-yellow font-bold">The Board</span>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-neon-offwhite mb-12">What we're serving<span className="text-neon-red">.</span></h2>
        </RevealOnScroll>
        {menu.map(category => (
          <div key={category.category} className="mb-12">
            <h3 className="font-display font-bold text-sm uppercase tracking-[0.2em] text-neon-yellow mb-6 pb-2 border-b border-neon-yellow/30">{category.category}</h3>
            {category.items.map((item, i) => (
              <MenuBoardItem key={item.name} item={item} index={i} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Build Your Bowl ──────────────────────────────────────────────────────────

function BowlBuilder() {
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [totalPrice, setTotalPrice] = useState(basePrice);

  const selectOption = (category: string, optionName: string, _price: number) => {
    setSelections(prev => ({ ...prev, [category]: optionName }));
    // Recalculate
    let total = basePrice;
    const newSelections = { ...selections, [category]: optionName };
    bowlOptions.forEach(cat => {
      cat.options.forEach(opt => {
        if (newSelections[cat.category] === opt.name && opt.price) {
          total += opt.price;
        }
      });
    });
    setTotalPrice(total);
  };

  return (
    <section id="build" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <RevealOnScroll>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-0.5 bg-neon-red" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-neon-red font-bold">Build Your Bowl</span>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-neon-offwhite mb-12">Make it yours<span className="text-neon-red">.</span></h2>
        </RevealOnScroll>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {bowlOptions.map((cat: BowlOption) => (
              <div key={cat.category}>
                <h4 className="font-display font-bold text-xs uppercase tracking-[0.2em] text-neon-yellow mb-4">{cat.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {cat.options.map(opt => (
                    <button
                      key={opt.name}
                      onClick={() => selectOption(cat.category, opt.name, opt.price || 0)}
                      className={`px-4 py-2 text-sm border transition-all ${
                        selections[cat.category] === opt.name
                          ? 'border-neon-yellow bg-neon-yellow/10 text-neon-yellow'
                          : 'border-neon-mid text-neon-gray hover:border-neon-offwhite/40 hover:text-neon-offwhite'
                      }`}
                    >
                      {opt.name}
                      {opt.price ? <span className="text-[10px] ml-1 text-neon-gray">+${opt.price}</span> : null}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="md:col-span-1">
            <div className="sticky top-24 bg-neon-ink border border-neon-mid/40 p-6">
              <h4 className="font-display font-bold text-xs uppercase tracking-[0.2em] text-neon-yellow mb-6">Your Bowl</h4>
              <div className="space-y-3 mb-6">
                {bowlOptions.map(cat => (
                  <div key={cat.category} className="flex justify-between text-sm">
                    <span className="text-neon-gray">{cat.category}:</span>
                    <span className="text-neon-offwhite">{selections[cat.category] || '—'}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-neon-mid/40 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-neon-gray text-sm">Total:</span>
                  <span className="font-display font-bold text-2xl text-neon-yellow">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
              <a href="#order" className="block w-full text-center bg-neon-yellow text-neon-black py-3 text-sm font-bold uppercase tracking-wider hover:bg-neon-red hover:text-neon-offwhite transition-colors">
                Add to Order
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Combos ───────────────────────────────────────────────────────────────────

function CombosSection() {
  return (
    <section id="combos" className="py-24 md:py-32 bg-neon-ink/30">
      <div className="max-w-7xl mx-auto px-6">
        <RevealOnScroll>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-0.5 bg-neon-yellow" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-neon-yellow font-bold">Late Night Combos</span>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-neon-offwhite mb-12">Save time. Eat better<span className="text-neon-red">.</span></h2>
        </RevealOnScroll>
        <div className="grid md:grid-cols-3 gap-6">
          {combos.map((combo: Combo, i) => (
            <RevealOnScroll key={combo.name} delay={i * 0.15}>
              <div className={`border-2 p-8 h-full transition-transform hover:-translate-y-1 ${
                combo.color === 'neon-red' ? 'border-neon-red' : 'border-neon-yellow'
              }`}>
                <div className={`font-display font-bold text-[10px] uppercase tracking-[0.3em] mb-4 ${
                  combo.color === 'neon-red' ? 'text-neon-red' : 'text-neon-yellow'
                }`}>COMBO</div>
                <h3 className="font-display font-bold text-2xl text-neon-offwhite mb-2">{combo.name}</h3>
                <p className="text-sm text-neon-gray mb-6">{combo.tagline}</p>
                <ul className="space-y-2 mb-8">
                  {combo.includes.map(item => (
                    <li key={item} className="flex items-start gap-2 text-sm text-neon-offwhite/80">
                      <span className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${
                        combo.color === 'neon-red' ? 'bg-neon-red' : 'bg-neon-yellow'
                      }`} />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="border-t border-neon-mid/40 pt-4">
                  <span className="font-display font-bold text-3xl text-neon-yellow">{combo.price}</span>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Process (Horizontal Scroll) ─────────────────────────────────────────────

function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-60%']);

  return (
    <section id="process" ref={containerRef} className="py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <RevealOnScroll>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-0.5 bg-neon-red" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-neon-red font-bold">The Steamline</span>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-neon-offwhite">How it gets made<span className="text-neon-red">.</span></h2>
        </RevealOnScroll>
      </div>
      <motion.div style={{ x }} className="flex gap-8 pl-6">
        {processSteps.map((step: ProcessStep) => (
          <div key={step.step} className="shrink-0 w-[320px] md:w-[400px] bg-neon-ink border border-neon-mid/30 p-8">
            <div className="flex items-center justify-between mb-6">
              <span className="font-display font-bold text-4xl text-neon-yellow">{step.step}</span>
              <span className="text-[10px] uppercase tracking-wider text-neon-gray bg-neon-black px-3 py-1">{step.time}</span>
            </div>
            <h3 className="font-display font-bold text-xl text-neon-offwhite mb-3">{step.title}</h3>
            <p className="text-sm text-neon-gray leading-relaxed">{step.description}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

// ─── Gallery ──────────────────────────────────────────────────────────────────

function GallerySection() {
  const images = [
    "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=600&q=80",
    "https://images.unsplash.com/photo-1555126634-323283e090fa?w=600&q=80",
    "https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=600&q=80",
    "https://images.unsplash.com/photo-1575182028841-998298150382?w=600&q=80",
    "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=600&q=80",
    "https://images.unsplash.com/photo-1552611052-33e04de081de?w=600&q=80"
  ];

  return (
    <section className="py-24 md:py-32 bg-neon-ink/30">
      <div className="max-w-7xl mx-auto px-6">
        <RevealOnScroll>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-0.5 bg-neon-yellow" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-neon-yellow font-bold">Street Window</span>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-neon-offwhite mb-12">The counter at 1AM<span className="text-neon-red">.</span></h2>
        </RevealOnScroll>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {images.map((src, i) => (
            <RevealOnScroll key={i} delay={i * 0.08}>
              <div className={`overflow-hidden ${i === 0 || i === 5 ? 'row-span-2 aspect-[3/4]' : 'aspect-square'}`}>
                <img src={src} alt="Gallery" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Locations ────────────────────────────────────────────────────────────────

function LocationsSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="locations" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <RevealOnScroll>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-0.5 bg-neon-red" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-neon-red font-bold">Locations + Pickup</span>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-neon-offwhite mb-12">Find your counter<span className="text-neon-red">.</span></h2>
        </RevealOnScroll>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {locations.map((loc: Location, i) => (
            <RevealOnScroll key={loc.name} delay={i * 0.1}>
              <div
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="bg-neon-ink border border-neon-mid/30 p-6 h-full hover:border-neon-yellow/50 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-bold text-lg text-neon-offwhite">{loc.name}</h3>
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 ${
                    loc.status === 'open' ? 'bg-green-500/20 text-green-400' :
                    loc.status === 'closing-soon' ? 'bg-neon-yellow/20 text-neon-yellow' :
                    'bg-neon-red/20 text-neon-red'
                  }`}>
                    {loc.status === 'open' ? 'OPEN' : loc.status === 'closing-soon' ? 'CLOSING SOON' : 'CLOSED'}
                  </span>
                </div>
                <p className="text-xs text-neon-gray mb-2">{loc.address}</p>
                <p className="text-xs text-neon-gray mb-4">{loc.hours}</p>
                <AnimatePresence>
                  {hoveredIdx === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-neon-mid/30 pt-4 mt-2">
                        <p className="text-[10px] uppercase tracking-wider text-neon-gray mb-1">Est. Pickup</p>
                        <p className="font-display font-bold text-xl text-neon-yellow">{loc.eta}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="flex flex-wrap gap-1 mt-4">
                  {loc.neighborhood.map(n => (
                    <span key={n} className="text-[9px] text-neon-gray bg-neon-black px-2 py-0.5">{n}</span>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Order CTA ────────────────────────────────────────────────────────────────

function OrderSection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', location: 'Downtown', notes: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="order" className="py-24 md:py-32 bg-neon-ink/30">
      <div className="max-w-3xl mx-auto px-6">
        <RevealOnScroll>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-0.5 bg-neon-yellow" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-neon-yellow font-bold">Order Pickup</span>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-neon-offwhite mb-4">Place your order<span className="text-neon-red">.</span></h2>
          <p className="text-sm text-neon-gray mb-12">Order ahead, skip the line. We'll text you when it's ready.</p>
        </RevealOnScroll>
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-neon-yellow/40 p-10 text-center"
            >
              <div className="text-neon-yellow text-4xl mb-4"><Icon name="bowl" className="w-10 h-10 mx-auto" /></div>
              <h3 className="font-display font-bold text-2xl text-neon-offwhite mb-3">Order placed!</h3>
              <p className="text-sm text-neon-gray">We'll text {form.phone || 'your number'} when your bowl is ready. Usually 10–15 min.</p>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-neon-gray block mb-2">Name</label>
                  <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full bg-neon-black border border-neon-mid/40 px-4 py-3 text-neon-offwhite focus:border-neon-yellow outline-none transition-colors" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-neon-gray block mb-2">Phone</label>
                  <input type="tel" required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full bg-neon-black border border-neon-mid/40 px-4 py-3 text-neon-offwhite focus:border-neon-yellow outline-none transition-colors" />
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-neon-gray block mb-2">Location</label>
                <select value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className="w-full bg-neon-black border border-neon-mid/40 px-4 py-3 text-neon-offwhite focus:border-neon-yellow outline-none transition-colors">
                  {locations.map(l => <option key={l.name} value={l.name}>{l.name} — {l.address}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-neon-gray block mb-2">Special Instructions</label>
                <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={3} className="w-full bg-neon-black border border-neon-mid/40 px-4 py-3 text-neon-offwhite focus:border-neon-yellow outline-none transition-colors resize-none" placeholder="Extra chopsticks, no scallion, etc." />
              </div>
              <button type="submit" className="bg-neon-yellow text-neon-black px-10 py-4 text-sm font-bold uppercase tracking-wider hover:bg-neon-red hover:text-neon-offwhite transition-colors">
                Place Order
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-neon-black/95 backdrop-blur-sm border-t border-neon-mid/40 p-4 z-40">
        <a href="#order" className="block w-full text-center bg-neon-yellow text-neon-black py-3 text-sm font-bold uppercase tracking-wider">Order Now</a>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-neon-mid/30 py-12 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-display font-bold text-lg text-neon-yellow mb-3">NEON NOODLE<span className="text-neon-red">.</span></h3>
            <p className="text-sm text-neon-gray">Late-night ramen and wok bar. Open until 2AM or later.</p>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-neon-gray mb-3">Hours</h4>
            <p className="text-sm text-neon-offwhite/70">5PM – 2AM (Sun–Thu)</p>
            <p className="text-sm text-neon-offwhite/70">5PM – 3AM (Fri–Sat)</p>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-neon-gray mb-3">Follow</h4>
            <div className="flex gap-4">
              <a href="#" className="text-sm text-neon-gray hover:text-neon-yellow">Instagram</a>
              <a href="#" className="text-sm text-neon-gray hover:text-neon-yellow">TikTok</a>
            </div>
          </div>
        </div>
        <div className="border-t border-neon-mid/30 pt-6">
          <p className="text-xs text-neon-gray">© 2024 Neon Noodle Supply. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <MenuSection />
      <BowlBuilder />
      <CombosSection />
      <ProcessSection />
      <GallerySection />
      <LocationsSection />
      <OrderSection />
      <Footer />
    </div>
  );
}
