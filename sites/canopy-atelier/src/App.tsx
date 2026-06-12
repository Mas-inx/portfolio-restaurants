import { useState, useEffect, useRef, useCallback, type FormEvent } from 'react';
import {
  SITE,
  HERO,
  METHOD,
  PROJECTS,
  PLANTING,
  OUTDOOR_ROOMS,
  PROCESS,
  CLIENT_FIT,
  CTA,
  TESTIMONIALS,
} from './data';

// Hook: scroll reveal
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// Hook: parallax
function useParallax(speed: number = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const offset = rect.top * speed;
      ref.current.style.transform = `translateY(${offset}px)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);
  return ref;
}

// Architectural line overlay SVG
function ArchLineOverlay({ className = '' }: { className?: string }) {
  return (
    <svg className={`absolute pointer-events-none ${className}`} viewBox="0 0 400 400" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.15">
      <line x1="0" y1="200" x2="400" y2="200" />
      <line x1="200" y1="0" x2="200" y2="400" />
      <circle cx="200" cy="200" r="80" />
      <circle cx="200" cy="200" r="120" />
      <rect x="100" y="100" width="200" height="200" />
      <line x1="100" y1="100" x2="300" y2="300" />
      <line x1="300" y1="100" x2="100" y2="300" />
    </svg>
  );
}

// Navbar
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Method', href: '#method' },
    { label: 'Work', href: '#work' },
    { label: 'Planting', href: '#planting' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-stone-warm/95 backdrop-blur-sm shadow-sm py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="font-serif text-2xl font-semibold text-green-deep tracking-tight">
          {SITE.name}
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-green-deep/70 hover:text-moss transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="magnetic-btn px-5 py-2.5 bg-green-deep text-cream text-sm font-medium rounded-sm hover:bg-green-dark transition-colors"
          >
            Consultation
          </a>
        </div>
        <button
          className="md:hidden text-green-deep"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-stone-warm border-t border-green-deep/10 px-6 py-4 space-y-3">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block text-sm font-medium text-green-deep/70 hover:text-moss"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

// Hero
function Hero() {
  const parallaxRef = useParallax(0.4);
  const [depthShift, setDepthShift] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setDepthShift(scrollY * 0.15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden plan-overlay">
      {/* Architectural line overlay */}
      <ArchLineOverlay className="w-[600px] h-[600px] -right-40 -top-20 text-green-deep opacity-[0.06]" />
      <ArchLineOverlay className="w-[400px] h-[400px] left-10 bottom-10 text-moss opacity-[0.04] rotate-45" />

      <div ref={parallaxRef} className="absolute inset-0 parallax-slow">
        <img
          src={HERO.image}
          alt="Luxury landscape"
          className="w-full h-full object-cover scale-110"
          style={{ transform: `scale(1.1) translateY(${depthShift * 0.3}px)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-warm/90 via-stone-warm/60 to-transparent" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <div className="max-w-2xl">
          <p className="text-moss font-medium text-sm tracking-widest uppercase mb-6">
            Landscape Architecture Studio
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light text-green-deep leading-[0.95] mb-8">
            {HERO.headline}
          </h1>
          <p className="text-lg text-green-deep/70 max-w-xl mb-10 leading-relaxed">
            {HERO.subheadline}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="magnetic-btn px-8 py-4 bg-green-deep text-cream font-medium rounded-sm hover:bg-green-dark transition-all hover:shadow-lg"
            >
              {HERO.cta}
            </a>
            <a
              href="#work"
              className="px-8 py-4 border border-green-deep/30 text-green-deep font-medium rounded-sm hover:border-moss hover:text-moss transition-all"
            >
              {HERO.secondary}
            </a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg width="20" height="30" viewBox="0 0 20 30" fill="none" stroke="currentColor" className="text-green-deep/40">
          <rect x="1" y="1" width="18" height="28" rx="9" strokeWidth="2" />
          <circle cx="10" cy="10" r="2" fill="currentColor" />
        </svg>
      </div>
    </section>
  );
}

// Studio Method
function StudioMethod() {
  const ref = useReveal();
  return (
    <section id="method" className="py-24 md:py-32 bg-cream relative">
      <ArchLineOverlay className="w-[500px] h-[500px] -right-20 top-20 text-green-deep opacity-[0.04]" />
      <div ref={ref} className="reveal max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <p className="text-moss font-medium text-sm tracking-widest uppercase mb-4">
            Our Approach
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-green-deep mb-6">
            {METHOD.title}
          </h2>
          <p className="text-lg text-green-deep/60">{METHOD.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {METHOD.pillars.map((pillar, i) => (
            <div
              key={pillar.id}
              className="group relative p-8 border border-green-deep/10 rounded-sm hover:border-moss/40 transition-all duration-500 hover:shadow-lg bg-stone-warm/50"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span className="font-serif text-5xl text-moss/20 font-light absolute top-4 right-4">
                {pillar.id}
              </span>
              <div className="w-10 h-10 border border-moss/30 rounded-full flex items-center justify-center mb-4 group-hover:border-moss group-hover:bg-moss/5 transition-all">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-moss">
                  <circle cx="8" cy="8" r="6" />
                  <line x1="8" y1="2" x2="8" y2="14" />
                  <line x1="2" y1="8" x2="14" y2="8" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-medium text-green-deep mb-3">
                {pillar.title}
              </h3>
              <p className="text-sm text-green-deep/60 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Selected Landscapes Gallery
function Gallery() {
  const ref = useReveal();
  const [activeFilter, setActiveFilter] = useState('All');
  const categories = ['All', ...new Set(PROJECTS.map((p) => p.category))];
  const filtered =
    activeFilter === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id="work" className="py-24 md:py-32 bg-stone-warm relative">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-moss font-medium text-sm tracking-widest uppercase mb-4">
              Portfolio
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-green-deep">
              Selected Landscapes
            </h2>
          </div>
          <div className="flex gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 text-sm font-medium rounded-sm transition-all ${
                  activeFilter === cat
                    ? 'bg-green-deep text-cream'
                    : 'border border-green-deep/20 text-green-deep/60 hover:border-moss hover:text-moss'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-sm cursor-pointer"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-green-deep/90 via-green-deep/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-moss-light text-xs tracking-widest uppercase mb-2">
                  {project.category} · {project.year}
                </p>
                <h3 className="font-serif text-2xl text-cream mb-2">
                  {project.title}
                </h3>
                <p className="text-cream/70 text-sm">{project.location}</p>
                <p className="text-cream/60 text-sm mt-2">{project.description}</p>
              </div>
              <div className="absolute top-4 left-4 p-2 bg-stone-warm/90 rounded-sm">
                <p className="font-serif text-sm text-green-deep">{project.title}</p>
              </div>
              {/* Plan overlay on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 29px, rgba(143,179,126,0.1) 29px, rgba(143,179,126,0.1) 30px), repeating-linear-gradient(90deg, transparent, transparent 29px, rgba(143,179,126,0.1) 29px, rgba(143,179,126,0.1) 30px)',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Planting as Architecture
function PlantingSection() {
  const ref = useReveal();
  const imgRef = useParallax(0.2);

  return (
    <section id="planting" className="py-24 md:py-32 bg-cream relative overflow-hidden">
      <ArchLineOverlay className="w-[600px] h-[600px] -left-40 top-10 text-moss opacity-[0.04]" />
      <div ref={ref} className="reveal max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-moss font-medium text-sm tracking-widest uppercase mb-4">
              Philosophy
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-green-deep mb-6">
              {PLANTING.title}
            </h2>
            <p className="text-lg text-green-deep/60 mb-10 leading-relaxed">
              {PLANTING.subtitle}
            </p>
            <div className="space-y-6">
              {PLANTING.principles.map((principle, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="w-8 h-8 rounded-full bg-moss/10 flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-moss/20 transition-colors">
                    <span className="text-moss text-xs font-medium">{i + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-green-deep font-medium mb-1">
                      {principle.name}
                    </h4>
                    <p className="text-sm text-green-deep/60 leading-relaxed">
                      {principle.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* Plant palette tags */}
            <div className="mt-10 pt-8 border-t border-green-deep/10">
              <p className="text-xs text-green-deep/50 uppercase tracking-widest mb-3">Plant Palette By</p>
              <div className="flex flex-wrap gap-2">
                {['Privacy', 'Shade', 'Seasonal Texture', 'Scent', 'Drought Tolerance'].map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1.5 border border-green-deep/15 rounded-full text-green-deep/60 hover:border-moss hover:text-moss transition-colors cursor-default">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div ref={imgRef} className="relative parallax-slow">
            <div className="aspect-[3/4] overflow-hidden rounded-sm">
              <img
                src={PLANTING.image}
                alt="Layered planting design"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-48 h-48 border-2 border-moss/30 rounded-sm" />
            {/* Botanical material board overlay */}
            <div className="absolute top-4 right-4 bg-stone-warm/90 backdrop-blur-sm p-3 rounded-sm border border-green-deep/10">
              <p className="text-[10px] uppercase tracking-widest text-green-deep/50 mb-1">Material Board</p>
              <div className="flex gap-1.5">
                <div className="w-6 h-6 rounded-full bg-[#4a6741]" title="Evergreen" />
                <div className="w-6 h-6 rounded-full bg-[#8fb37e]" title="Deciduous" />
                <div className="w-6 h-6 rounded-full bg-[#c4a882]" title="Stone" />
                <div className="w-6 h-6 rounded-full bg-[#6b8f5e]" title="Moss" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Outdoor Rooms - Horizontal Scroll
function OutdoorRooms() {
  const ref = useReveal();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 400;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  }, []);

  return (
    <section className="py-24 md:py-32 bg-green-deep text-cream overflow-hidden">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-6 mb-12">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-moss-light font-medium text-sm tracking-widest uppercase mb-4">
              Spaces
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-light">
              Outdoor Rooms
            </h2>
          </div>
          <div className="hidden md:flex gap-3">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 border border-cream/20 rounded-full flex items-center justify-center hover:border-moss-light hover:text-moss-light transition-colors"
              aria-label="Scroll left"
            >
              ←
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 border border-cream/20 rounded-full flex items-center justify-center hover:border-moss-light hover:text-moss-light transition-colors"
              aria-label="Scroll right"
            >
              →
            </button>
          </div>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="horizontal-scroll px-6 max-w-7xl mx-auto pb-4"
      >
        {OUTDOOR_ROOMS.map((room) => (
          <div
            key={room.id}
            className="w-[350px] md:w-[450px] flex-shrink-0 group"
          >
            <div className="aspect-[3/4] overflow-hidden rounded-sm mb-4 relative">
              <img
                src={room.image}
                alt={room.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Plan overlay on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(255,255,255,0.06) 19px, rgba(255,255,255,0.06) 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(255,255,255,0.06) 19px, rgba(255,255,255,0.06) 20px)',
                }}
              />
            </div>
            <p className="text-moss-light text-xs tracking-widest uppercase mb-2">
              {room.subtitle}
            </p>
            <h3 className="font-serif text-2xl mb-3">{room.title}</h3>
            <div className="flex flex-wrap gap-2">
              {room.features.map((f) => (
                <span
                  key={f}
                  className="text-xs px-3 py-1 border border-cream/20 rounded-full text-cream/70"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Process - Card Stack (like drawing sheets)
function ProcessSection() {
  const ref = useReveal();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="py-24 md:py-32 bg-stone-warm relative">
      <ArchLineOverlay className="w-[400px] h-[400px] right-0 bottom-0 text-green-deep opacity-[0.03]" />
      <div ref={ref} className="reveal max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <p className="text-moss font-medium text-sm tracking-widest uppercase mb-4">
            How We Work
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-green-deep">
            From Vision to Reality
          </h2>
        </div>
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12">
          <div className="space-y-2">
            {PROCESS.map((step, i) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(i)}
                className={`w-full text-left p-5 rounded-sm transition-all duration-300 ${
                  activeStep === i
                    ? 'bg-green-deep text-cream shadow-lg'
                    : 'bg-cream hover:bg-stone-warm-dark text-green-deep'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`font-serif text-2xl font-light ${
                      activeStep === i ? 'text-moss-light' : 'text-moss/40'
                    }`}
                  >
                    {step.number}
                  </span>
                  <div>
                    <h4 className="font-medium">{step.title}</h4>
                    <p
                      className={`text-xs mt-1 ${
                        activeStep === i ? 'text-cream/60' : 'text-green-deep/50'
                      }`}
                    >
                      {step.duration}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
          {/* Card stack display - like drawing sheets */}
          <div className="relative card-stack">
            {/* Stacked cards behind */}
            <div className="absolute inset-0 bg-cream/40 rounded-sm border border-green-deep/5 translate-x-2 translate-y-2" />
            <div className="absolute inset-0 bg-cream/60 rounded-sm border border-green-deep/5 translate-x-1 translate-y-1" />
            {/* Active card */}
            <div className="relative bg-cream p-10 rounded-sm border border-green-deep/10 min-h-[400px] flex flex-col justify-center shadow-sm">
              <span className="font-serif text-7xl text-moss/15 font-light mb-4">
                {PROCESS[activeStep].number}
              </span>
              <h3 className="font-serif text-3xl text-green-deep mb-4">
                {PROCESS[activeStep].title}
              </h3>
              <p className="text-lg text-green-deep/60 leading-relaxed mb-6">
                {PROCESS[activeStep].description}
              </p>
              <div className="flex items-center gap-2 text-moss text-sm font-medium">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="8" cy="8" r="7" />
                  <path d="M8 4v4l3 2" />
                </svg>
                {PROCESS[activeStep].duration}
              </div>
              {/* Drawing sheet corner marks */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-green-deep/10" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-green-deep/10" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-green-deep/10" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-green-deep/10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Client Fit
function ClientFit() {
  const ref = useReveal();
  return (
    <section className="py-24 md:py-32 bg-cream">
      <div ref={ref} className="reveal max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-moss font-medium text-sm tracking-widest uppercase mb-4">
            Working Together
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-green-deep">
            {CLIENT_FIT.title}
          </h2>
          <p className="text-lg text-green-deep/60 mt-4">{CLIENT_FIT.subtitle}</p>
        </div>
        {/* Client Types */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {CLIENT_FIT.clientTypes.map((ct) => (
            <div key={ct.type} className="p-5 bg-stone-warm rounded-sm border border-green-deep/5 text-center hover:border-moss/30 transition-colors">
              <h4 className="font-serif text-lg text-green-deep font-medium mb-1">{ct.type}</h4>
              <p className="text-xs text-green-deep/50">{ct.description}</p>
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="font-serif text-2xl text-green-deep mb-6">What We Value</h3>
            <ul className="space-y-4">
              {CLIENT_FIT.traits.map((trait, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-moss flex-shrink-0 mt-0.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-green-deep/70">{trait}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-2xl text-green-deep mb-6">Not the Right Fit If</h3>
            <ul className="space-y-4">
              {CLIENT_FIT.notFor.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-green-deep/30 flex-shrink-0 mt-0.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-green-deep/50">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Testimonials */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="p-6 bg-stone-warm rounded-sm border border-green-deep/5">
              <svg className="w-8 h-8 text-moss/30 mb-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-green-deep/70 text-sm leading-relaxed italic mb-4">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="font-medium text-green-deep text-sm">{t.author}</p>
              <p className="text-green-deep/50 text-xs">{t.location}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Consultation CTA with Form
function ConsultationCTA() {
  const ref = useReveal();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-green-deep text-cream relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(255,255,255,0.3) 59px, rgba(255,255,255,0.3) 60px), repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(255,255,255,0.3) 59px, rgba(255,255,255,0.3) 60px)',
          }}
        />
      </div>
      <ArchLineOverlay className="w-[500px] h-[500px] -right-20 -top-20 text-cream opacity-[0.04]" />
      <div ref={ref} className="reveal relative max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-moss-light font-medium text-sm tracking-widest uppercase mb-4">
            Let's Begin
          </p>
          <h2 className="font-serif text-4xl md:text-6xl font-light mb-6">
            {CTA.title}
          </h2>
          <p className="text-lg text-cream/60 max-w-2xl mx-auto leading-relaxed">
            {CTA.subtitle}
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-moss/20 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-moss-light">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h3 className="font-serif text-3xl mb-4">Thank You</h3>
            <p className="text-cream/60 max-w-md mx-auto">
              We've received your inquiry and will respond within two business days to schedule your initial consultation.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {CTA.fields.filter(f => f.type !== 'textarea' && f.type !== 'select').map((field) => (
                <div key={field.name}>
                  <label className="block text-xs uppercase tracking-widest text-cream/50 mb-2">
                    {field.label} {field.required && <span className="text-moss-light">*</span>}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    required={field.required}
                    className="w-full bg-transparent border-b border-cream/20 py-3 text-cream placeholder:text-cream/30 focus:border-moss-light focus:outline-none transition-colors"
                  />
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {CTA.fields.filter(f => f.type === 'select').map((field) => (
                <div key={field.name}>
                  <label className="block text-xs uppercase tracking-widest text-cream/50 mb-2">
                    {field.label} {field.required && <span className="text-moss-light">*</span>}
                  </label>
                  <select
                    name={field.name}
                    required={field.required}
                    className="w-full bg-transparent border-b border-cream/20 py-3 text-cream focus:border-moss-light focus:outline-none transition-colors appearance-none"
                  >
                    <option value="" className="bg-green-deep">Select...</option>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt} className="bg-green-deep">{opt}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            {CTA.fields.filter(f => f.type === 'textarea').map((field) => (
              <div key={field.name}>
                <label className="block text-xs uppercase tracking-widest text-cream/50 mb-2">
                  {field.label}
                </label>
                <textarea
                  name={field.name}
                  rows={4}
                  className="w-full bg-transparent border border-cream/20 rounded-sm py-3 px-4 text-cream placeholder:text-cream/30 focus:border-moss-light focus:outline-none transition-colors resize-none"
                />
              </div>
            ))}
            <div className="pt-4">
              <button
                type="submit"
                className="magnetic-btn w-full md:w-auto px-10 py-4 bg-moss text-cream font-medium rounded-sm hover:bg-moss-light transition-all text-lg"
              >
                {CTA.buttonText}
              </button>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-cream/40 pt-4">
              <span>Or reach us directly:</span>
              <span>{CTA.email}</span>
              <span className="hidden md:block w-1 h-1 rounded-full bg-cream/30" />
              <span>{CTA.phone}</span>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-charcoal text-cream/60 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <h3 className="font-serif text-2xl text-cream font-light mb-4">
              {SITE.name}
            </h3>
            <p className="text-sm leading-relaxed max-w-md">
              A landscape architecture studio creating enduring outdoor spaces
              through considered design, native planting, and architectural precision.
            </p>
          </div>
          <div>
            <h4 className="text-cream text-sm font-medium mb-4">Studio</h4>
            <ul className="space-y-2 text-sm">
              <li>{SITE.address}</li>
              <li>{SITE.phone}</li>
              <li>{SITE.email}</li>
            </ul>
          </div>
          <div>
            <h4 className="text-cream text-sm font-medium mb-4">Navigate</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#method" className="hover:text-moss-light transition-colors">Method</a></li>
              <li><a href="#work" className="hover:text-moss-light transition-colors">Work</a></li>
              <li><a href="#planting" className="hover:text-moss-light transition-colors">Planting</a></li>
              <li><a href="#process" className="hover:text-moss-light transition-colors">Process</a></li>
              <li><a href="#contact" className="hover:text-moss-light transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-cream/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs">© 2024 {SITE.name}. All rights reserved.</p>
          <p className="text-xs">Landscape Architecture · San Francisco, CA</p>
        </div>
      </div>
    </footer>
  );
}

// Main App
export default function App() {
  return (
    <div className="min-h-screen bg-stone-warm">
      <Navbar />
      <Hero />
      <StudioMethod />
      <Gallery />
      <PlantingSection />
      <OutdoorRooms />
      <ProcessSection />
      <ClientFit />
      <ConsultationCTA />
      <Footer />
    </div>
  );
}
