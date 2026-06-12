import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { siteData } from './data';

// ─── Icon Component ──────────────────────────────────────────────────────────
function Icon({ name, className = 'w-6 h-6' }: { name: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    'diamond-outline': <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3l9 9-9 9-9-9z" /></svg>,
    triangle: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3l9 18H3z" /></svg>,
    'square-outline': <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="4" width="16" height="16" rx="1" /></svg>,
    circle: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9" /></svg>,
    'diamond-filled': <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3l9 9-9 9-9-9z" fill="currentColor" opacity="0.15" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 3l9 9-9 9-9-9z" /></svg>,
    'star-four': <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z" /></svg>,
  }
  return <>{icons[name] || null}</>
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { label: 'Philosophy', href: '#philosophy' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-ivory/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <a href="#" className="serif text-2xl font-semibold text-espresso tracking-wide">
          Maison<span className="text-brass italic"> Works</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <a key={link.label} href={link.href} className={`text-xs uppercase tracking-[0.2em] transition-colors ${scrolled ? 'text-espresso-light hover:text-brass' : 'text-espresso/70 hover:text-brass'}`}>
              {link.label}
            </a>
          ))}
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-espresso">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-ivory border-t border-stone-light/50 px-6 py-6">
          {links.map(link => (
            <a key={link.label} href={link.href} onClick={() => setMobileOpen(false)} className="block py-3 text-espresso-light hover:text-brass uppercase tracking-[0.2em] text-xs">
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-ivory overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #2c1810 1px, transparent 0)', backgroundSize: '48px 48px' }} />
      <div className="relative max-w-6xl mx-auto px-6 py-32 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="lg:col-span-7">
            <div className="text-brass text-xs uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-brass" />
              {siteData.company.established}
            </div>
            <h1 className="serif text-4xl md:text-5xl lg:text-6xl font-medium text-espresso leading-[1.1] mb-8">
              {siteData.hero.headline}
            </h1>
            <p className="text-espresso-light/70 text-lg leading-relaxed mb-10 max-w-lg">
              {siteData.hero.subheadline}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="px-8 py-4 bg-espresso text-ivory text-xs uppercase tracking-[0.2em] hover:bg-espresso-light transition-colors">
                Start a Conversation
              </a>
              <a href="#portfolio" className="px-8 py-4 border border-espresso/20 text-espresso text-xs uppercase tracking-[0.2em] hover:border-brass hover:text-brass transition-colors">
                View Portfolio
              </a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.3 }} className="lg:col-span-5 relative">
            <div className="relative">
              <div className="aspect-[3/4] overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=1000&fit=crop" alt="Renovated interior" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 aspect-[3/4] w-32 overflow-hidden border-4 border-ivory shadow-lg hidden lg:block">
                <img src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=300&h=400&fit=crop" alt="Material detail" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -top-4 -right-4 bg-brass/90 text-ivory px-4 py-2 text-[10px] uppercase tracking-[0.2em] hidden lg:block">
                Design · Build · Deliver
              </div>
            </div>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="mt-20 pt-10 border-t border-stone-light/50 flex flex-wrap gap-12">
          {siteData.hero.stats.map((stat, i) => (
            <div key={i} className="flex items-baseline gap-3">
              <div className="serif text-3xl text-espresso font-medium">{stat.value}</div>
              <div className="text-[11px] uppercase tracking-[0.15em] text-espresso-light/50">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function BeforeBuild() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="philosophy" className="py-28 bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="max-w-3xl mb-20">
          <div className="text-brass text-xs uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
            <span className="w-8 h-px bg-brass" />
            {siteData.beforeBuild.title}
          </div>
          <h2 className="serif text-4xl md:text-5xl text-espresso font-medium leading-tight mb-6">{siteData.beforeBuild.subtitle}</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteData.beforeBuild.cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group relative bg-ivory border border-stone-light/40 p-8 hover:border-brass/50 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-brass/0 via-brass/60 to-brass/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="text-brass text-2xl mb-6 serif italic"><Icon name={card.icon} /></div>
              <h3 className="serif text-xl text-espresso font-medium mb-3">{card.title}</h3>
              <p className="text-espresso-light/60 text-sm leading-relaxed mb-5">{card.description}</p>
              <div className="space-y-2">
                {card.details.map((detail, j) => (
                  <div key={j} className="flex items-center gap-2 text-xs text-espresso-light/50">
                    <span className="w-1 h-1 bg-brass rounded-full" />
                    {detail}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RenovationTypes() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" className="py-28 bg-ivory">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-16">
          <div className="text-brass text-xs uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
            <span className="w-8 h-px bg-brass" />
            Our Specialties
          </div>
          <h2 className="serif text-4xl md:text-5xl text-espresso font-medium">Renovation Types</h2>
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-3">
            {siteData.renovationTypes.map((type, i) => (
              <button key={i} onClick={() => setActive(i)} className={`w-full text-left p-6 border transition-all duration-300 ${active === i ? 'border-brass bg-cream shadow-sm' : 'border-stone-light/50 hover:border-stone'}`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`serif text-xl font-medium transition-colors ${active === i ? 'text-brass' : 'text-espresso'}`}>{type.title}</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-espresso-light/40 hidden sm:block">{type.timeline}</span>
                    <span className={`text-xs transition-colors ${active === i ? 'text-brass' : 'text-stone'}`}>0{i + 1}</span>
                  </div>
                </div>
                <AnimatePresence>
                  {active === i && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                      <p className="text-espresso-light/70 mt-3 mb-4 text-sm leading-relaxed">{type.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {type.details.map((d, j) => (
                          <span key={j} className="text-[11px] uppercase tracking-wider px-3 py-1.5 border border-stone-light/60 text-espresso-light/60 bg-ivory/50">{d}</span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            ))}
          </div>
          <div className="sticky top-32">
            <div className="aspect-[4/3] overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.img
                  key={active}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5 }}
                  src={siteData.renovationTypes[active].image}
                  alt={siteData.renovationTypes[active].title}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-espresso/60 to-transparent p-6">
                <div className="text-ivory/60 text-[10px] uppercase tracking-[0.2em] mb-1">Timeline</div>
                <div className="text-ivory serif text-lg">{siteData.renovationTypes[active].timeline}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BeforeAfterGallery() {
  const [sliderPos, setSliderPos] = useState(50);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const item = siteData.beforeAfter[activeIndex];

  return (
    <section id="portfolio" className="py-28 bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <div className="text-brass text-xs uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
            <span className="w-8 h-px bg-brass" />
            Portfolio
          </div>
          <h2 className="serif text-4xl md:text-5xl text-espresso font-medium">Before & After</h2>
          <p className="text-espresso-light/60 mt-4 max-w-lg">Drag the slider to reveal the transformation. Every project tells a story of careful planning and skilled execution.</p>
        </div>
        <div className="flex gap-3 mb-8 flex-wrap">
          {siteData.beforeAfter.map((ba, i) => (
            <button key={ba.id} onClick={() => { setActiveIndex(i); setSliderPos(50); }} className={`px-5 py-2.5 text-xs uppercase tracking-wider border transition-all duration-300 ${activeIndex === i ? 'border-brass text-brass bg-ivory shadow-sm' : 'border-stone-light text-espresso-light/60 hover:border-stone'}`}>
              {ba.title}
            </button>
          ))}
        </div>
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <div
              ref={containerRef}
              className="relative aspect-[4/3] overflow-hidden cursor-col-resize select-none shadow-lg"
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
            >
              <img src={item.afterImage} alt="After" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}>
                <img src={item.beforeImage} alt="Before" className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="absolute top-4 left-4 bg-espresso/80 backdrop-blur-sm text-ivory text-[10px] uppercase tracking-widest px-3 py-1.5">Before</div>
              <div className="absolute top-4 right-4 bg-brass/90 backdrop-blur-sm text-ivory text-[10px] uppercase tracking-widest px-3 py-1.5">After</div>
              <div className="absolute top-0 bottom-0" style={{ left: `${sliderPos}%` }}>
                <div className="w-0.5 h-full bg-white/90 shadow-lg" />
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 bg-white rounded-full shadow-xl flex items-center justify-center border border-stone-light/30">
                  <svg className="w-5 h-5 text-espresso" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="serif text-2xl text-espresso font-medium mb-2">{item.title}</h3>
              <p className="text-espresso-light/60 text-sm">{item.location}</p>
            </div>
            <div className="border-t border-stone-light/50 pt-6 space-y-5">
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-brass mb-1.5">Scope</div>
                <div className="text-espresso-light/80 text-sm">{item.scope}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-brass mb-1.5">Duration</div>
                <div className="text-espresso-light/80 text-sm">{item.duration}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-brass mb-1.5">Style</div>
                <div className="text-espresso-light/80 text-sm">{item.style}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MaterialRoom() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = [...new Set(siteData.materialBoard.map(m => m.category))];

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 360;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  const filteredItems = activeCategory
    ? siteData.materialBoard.filter(m => m.category === activeCategory)
    : siteData.materialBoard;

  return (
    <section className="py-28 bg-ivory">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="text-brass text-xs uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-brass" />
              Material Board
            </div>
            <h2 className="serif text-4xl md:text-5xl text-espresso font-medium">The Details</h2>
            <p className="text-espresso-light/60 mt-3 max-w-md text-sm">A curated palette of materials that work together — selected for beauty, durability, and the way they age gracefully over time.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex gap-1.5 flex-wrap">
              <button onClick={() => setActiveCategory(null)} className={`px-3 py-1.5 text-[10px] uppercase tracking-wider border transition-all ${!activeCategory ? 'border-brass text-brass' : 'border-stone-light/50 text-espresso-light/50 hover:border-stone'}`}>All</button>
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat === activeCategory ? null : cat)} className={`px-3 py-1.5 text-[10px] uppercase tracking-wider border transition-all ${activeCategory === cat ? 'border-brass text-brass' : 'border-stone-light/50 text-espresso-light/50 hover:border-stone'}`}>{cat}</button>
              ))}
            </div>
            <div className="flex gap-2 ml-auto md:ml-0">
              <button onClick={() => scroll('left')} className="w-10 h-10 border border-stone flex items-center justify-center hover:border-brass hover:text-brass transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button onClick={() => scroll('right')} className="w-10 h-10 border border-stone flex items-center justify-center hover:border-brass hover:text-brass transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div ref={scrollRef} className="flex gap-6 overflow-x-auto px-6 pb-6 scrollbar-hide snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
        <div className="shrink-0 w-3 max-w-6xl" />
        {filteredItems.map((item, i) => (
          <motion.div
            key={`${item.category}-${item.name}-${i}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: (i % 4) * 0.08 }}
            className="shrink-0 w-64 md:w-72 group snap-start"
          >
            <div className="aspect-[3/4] overflow-hidden mb-4 relative">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-3 left-3 bg-ivory/90 backdrop-blur-sm text-[9px] uppercase tracking-[0.15em] text-espresso px-2.5 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.category}
              </div>
            </div>
            <div className="text-brass text-[10px] uppercase tracking-[0.2em] mb-1">{item.tone}</div>
            <h3 className="serif text-lg text-espresso font-medium mb-1.5">{item.name}</h3>
            <p className="text-espresso-light/55 text-xs leading-relaxed">{item.specification}</p>
          </motion.div>
        ))}
        <div className="shrink-0 w-6" />
      </div>
    </section>
  );
}

function LivingThrough() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <section className="py-28 bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="max-w-3xl mb-16">
          <div className="text-brass text-xs uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
            <span className="w-8 h-px bg-brass" />
            Our Promise
          </div>
          <h2 className="serif text-4xl md:text-5xl text-espresso font-medium mb-6">{siteData.livingThrough.title}</h2>
          <p className="text-espresso-light/70 text-lg leading-relaxed">{siteData.livingThrough.subtitle}</p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6">
          {siteData.livingThrough.commitments.map((commitment, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex gap-6 p-8 bg-ivory border border-stone-light/30 hover:border-brass/30 transition-colors duration-300"
            >
              <div className="text-brass text-3xl serif shrink-0 mt-1"><Icon name={commitment.icon} /></div>
              <div>
                <h3 className="serif text-xl text-espresso font-medium mb-2">{commitment.title}</h3>
                <p className="text-espresso-light/60 text-sm leading-relaxed">{commitment.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="py-28 bg-ivory">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <div className="text-brass text-xs uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
            <span className="w-8 h-px bg-brass" />
            How We Work
          </div>
          <h2 className="serif text-4xl md:text-5xl text-espresso font-medium">Our Process</h2>
          <p className="text-espresso-light/60 mt-4 max-w-lg">From first conversation to final handover, every phase is designed for clarity, quality, and your peace of mind.</p>
        </div>
        <div className="space-y-0">
          {siteData.process.map((phase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="grid md:grid-cols-12 gap-6 py-10 border-t border-stone-light/50 group hover:bg-cream/50 transition-colors duration-300 px-4 -mx-4"
            >
              <div className="md:col-span-1">
                <span className="serif text-brass text-lg italic">{phase.number}</span>
              </div>
              <div className="md:col-span-3">
                <h3 className="serif text-2xl text-espresso font-medium group-hover:text-brass transition-colors">{phase.title}</h3>
                <div className="text-[11px] uppercase tracking-wider text-stone mt-2">{phase.duration}</div>
              </div>
              <div className="md:col-span-4">
                <p className="text-espresso-light/70 leading-relaxed text-sm">{phase.description}</p>
              </div>
              <div className="md:col-span-4">
                <div className="flex flex-wrap gap-2">
                  {phase.deliverables.map((d, j) => (
                    <span key={j} className="text-[11px] uppercase tracking-wider px-3 py-1.5 border border-stone-light/50 text-espresso-light/60 bg-ivory">{d}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ConsultationCTA() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', projectType: '', homeType: '', timeline: '', budget: '', vision: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-28 bg-espresso text-ivory">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <div className="text-brass text-xs uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-brass" />
              Let's Begin
            </div>
            <h2 className="serif text-4xl md:text-5xl font-medium leading-tight mb-8">{siteData.cta.title}</h2>
            <p className="text-ivory/60 text-lg leading-relaxed mb-10">{siteData.cta.description}</p>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <span className="text-brass"><Icon name="star-four" className="w-4 h-4" /></span>
                <span className="text-ivory/70">{siteData.company.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-brass"><Icon name="star-four" className="w-4 h-4" /></span>
                <span className="text-ivory/70">{siteData.company.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-brass"><Icon name="star-four" className="w-4 h-4" /></span>
                <span className="text-ivory/70">Studio visits by appointment</span>
              </div>
            </div>
          </div>
          <div>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="border border-brass/30 p-10"
                >
                  <div className="serif text-3xl text-brass mb-4 italic">Thank you, {formData.name}</div>
                  <p className="text-ivory/60 mb-6">We've received your consultation request. Here's what happens next:</p>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <span className="text-brass mt-0.5">01</span>
                      <span className="text-ivory/70">We'll review your project details within 24 hours</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-brass mt-0.5">02</span>
                      <span className="text-ivory/70">A senior designer will reach out to schedule a call</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-brass mt-0.5">03</span>
                      <span className="text-ivory/70">We'll arrange a home visit within one week</span>
                    </div>
                  </div>
                  <div className="mt-8 pt-6 border-t border-ivory/10 text-xs text-ivory/40">
                    <div>Project: {formData.projectType || 'Not specified'}</div>
                    <div>Timeline: {formData.timeline || 'Flexible'}</div>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input type="text" placeholder="Your Name *" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="bg-transparent border border-ivory/20 px-4 py-3.5 text-ivory placeholder-ivory/30 focus:border-brass focus:outline-none transition-colors text-sm" />
                    <input type="email" placeholder="Email *" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="bg-transparent border border-ivory/20 px-4 py-3.5 text-ivory placeholder-ivory/30 focus:border-brass focus:outline-none transition-colors text-sm" />
                  </div>
                  <input type="tel" placeholder="Phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-transparent border border-ivory/20 px-4 py-3.5 text-ivory placeholder-ivory/30 focus:border-brass focus:outline-none transition-colors text-sm" />
                  <select value={formData.projectType} onChange={e => setFormData({...formData, projectType: e.target.value})} className="w-full bg-transparent border border-ivory/20 px-4 py-3.5 text-ivory/50 focus:border-brass focus:outline-none transition-colors text-sm">
                    <option value="" className="text-espresso">Project Type</option>
                    <option value="kitchen" className="text-espresso">Kitchen Renovation</option>
                    <option value="bathroom" className="text-espresso">Bathroom Renovation</option>
                    <option value="addition" className="text-espresso">Addition</option>
                    <option value="whole-home" className="text-espresso">Whole-Home Renovation</option>
                    <option value="historic" className="text-espresso">Historic Refresh</option>
                    <option value="basement" className="text-espresso">Basement Suite</option>
                  </select>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <select value={formData.homeType} onChange={e => setFormData({...formData, homeType: e.target.value})} className="w-full bg-transparent border border-ivory/20 px-4 py-3.5 text-ivory/50 focus:border-brass focus:outline-none transition-colors text-sm">
                      <option value="" className="text-espresso">Home Style</option>
                      <option value="victorian" className="text-espresso">Victorian</option>
                      <option value="craftsman" className="text-espresso">Craftsman</option>
                      <option value="edwardian" className="text-espresso">Edwardian</option>
                      <option value="mid-century" className="text-espresso">Mid-Century</option>
                      <option value="contemporary" className="text-espresso">Contemporary</option>
                      <option value="other" className="text-espresso">Other</option>
                    </select>
                    <select value={formData.timeline} onChange={e => setFormData({...formData, timeline: e.target.value})} className="w-full bg-transparent border border-ivory/20 px-4 py-3.5 text-ivory/50 focus:border-brass focus:outline-none transition-colors text-sm">
                      <option value="" className="text-espresso">Timeline</option>
                      <option value="3-months" className="text-espresso">Within 3 months</option>
                      <option value="6-months" className="text-espresso">3–6 months</option>
                      <option value="planning" className="text-espresso">Still planning</option>
                    </select>
                  </div>
                  <select value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})} className="w-full bg-transparent border border-ivory/20 px-4 py-3.5 text-ivory/50 focus:border-brass focus:outline-none transition-colors text-sm">
                    <option value="" className="text-espresso">Budget Range</option>
                    <option value="50-100k" className="text-espresso">$50,000 – $100,000</option>
                    <option value="100-250k" className="text-espresso">$100,000 – $250,000</option>
                    <option value="250-500k" className="text-espresso">$250,000 – $500,000</option>
                    <option value="500k+" className="text-espresso">$500,000+</option>
                    <option value="unsure" className="text-espresso">Not sure yet</option>
                  </select>
                  <textarea placeholder="Tell us about your vision..." rows={4} value={formData.vision} onChange={e => setFormData({...formData, vision: e.target.value})} className="w-full bg-transparent border border-ivory/20 px-4 py-3.5 text-ivory placeholder-ivory/30 focus:border-brass focus:outline-none transition-colors text-sm resize-none" />
                  <button type="submit" className="w-full px-8 py-4 bg-brass text-espresso text-xs uppercase tracking-[0.2em] font-medium hover:bg-brass-light transition-colors">
                    {siteData.cta.buttonText}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-16 bg-espresso border-t border-ivory/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="serif text-2xl text-ivory mb-4">Maison<span className="text-brass italic"> Works</span></div>
            <p className="text-ivory/40 text-sm leading-relaxed max-w-sm">{siteData.company.description}</p>
          </div>
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-brass mb-4">Studio</h4>
            <div className="space-y-2.5 text-ivory/50 text-sm">
              <a href="#philosophy" className="block hover:text-brass transition-colors">Philosophy</a>
              <a href="#services" className="block hover:text-brass transition-colors">Services</a>
              <a href="#portfolio" className="block hover:text-brass transition-colors">Portfolio</a>
              <a href="#process" className="block hover:text-brass transition-colors">Process</a>
            </div>
          </div>
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-brass mb-4">Contact</h4>
            <div className="space-y-2.5 text-ivory/50 text-sm">
              <div>{siteData.company.phone}</div>
              <div>{siteData.company.email}</div>
              <div>San Francisco, CA</div>
            </div>
          </div>
        </div>
        <div className="border-t border-ivory/10 pt-8 flex flex-wrap justify-between items-center gap-4">
          <div className="text-ivory/30 text-xs">© 2024 Maison Works. All rights reserved.</div>
          <div className="text-ivory/30 text-xs">Design-build renovation studio</div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <BeforeBuild />
      <RenovationTypes />
      <BeforeAfterGallery />
      <MaterialRoom />
      <LivingThrough />
      <Process />
      <ConsultationCTA />
      <Footer />
    </div>
  );
}
