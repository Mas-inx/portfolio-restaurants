import { useState, useRef, useEffect, type FC } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  siteInfo,
  services,
  processSteps,
  projects,
  palettePlants,
  testimonials,
  navLinks,
  contactInfo,
  type ServiceItem,
  type ProcessStep,
  type ProjectItem,
  type PalettePlant,
  type Testimonial,
} from './data';

/* ── SVG Icons ── */

const LeafIcon: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

const GridIcon: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const DropletIcon: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
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

const WaterIcon: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2a8 8 0 0 0-8 8c0 5.33 3.56 12 8 12s8-6.67 8-12a8 8 0 0 0-8-8z" />
    <path d="M12 10v4" />
    <path d="M10 12h4" />
  </svg>
);

const CheckIcon: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const QuoteIcon: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
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

const LocationIcon: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
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

/* ── Icon map ── */

const serviceIcons: Record<string, FC<{ className?: string }>> = {
  leaf: LeafIcon,
  grid: GridIcon,
  droplet: DropletIcon,
  sun: SunIcon,
  water: WaterIcon,
};

/* ── Sub-components ── */

const ServiceCard: FC<{ item: ServiceItem; index: number }> = ({ item, index }) => {
  const IconComp = serviceIcons[item.icon] || LeafIcon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group border-b border-cream-300 pb-8 mb-8 last:border-0 last:pb-0 last:mb-0 cursor-default"
    >
      <div className="flex items-start gap-5">
        <IconComp className="w-7 h-7 text-forest-400 mt-1 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="font-heading text-xl text-forest-600 mb-2 group-hover:text-forest-500 transition-colors">{item.title}</h3>
          <p className="text-stone-600 leading-relaxed text-sm font-body">{item.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectCard: FC<{ project: ProjectItem; index: number }> = ({ project, index }) => {
  const dir = index % 2 === 0 ? -40 : 40;
  return (
    <motion.div
      initial={{ opacity: 0, x: dir }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative group cursor-pointer overflow-hidden rounded-sm"
    >
      <div className="aspect-[4/3] w-full rounded-sm flex items-end p-6 relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="relative z-10">
          <span
            className="inline-block text-xs tracking-[0.2em] uppercase font-body font-medium mb-2 text-white/80"
          >
            {project.category}
          </span>
          <h3 className="font-heading text-2xl text-white mb-1">{project.title}</h3>
          <p className="text-white/60 text-xs font-body flex items-center gap-1">
            <LocationIcon className="w-3 h-3" /> {project.location}
          </p>
          <p className="text-white/80 text-sm leading-relaxed mt-3 max-w-md font-body opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
            {project.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const ProcessCard: FC<{ step: ProcessStep; index: number }> = ({ step }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start 80%', 'start 20%'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.4, 1, 1]);

  return (
    <motion.div
      ref={cardRef}
      style={{ scale, opacity }}
      className="sticky top-24 bg-cream-50 border border-cream-200 rounded-sm p-8 md:p-12 mb-4 last:mb-0"
    >
      <div className="flex items-start gap-6 md:gap-12">
        <span className="text-5xl md:text-7xl font-heading text-cream-400 leading-none">{String(step.step).padStart(2, '0')}</span>
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-2">
            <h3 className="font-heading text-2xl md:text-3xl text-forest-600">{step.title}</h3>
            <span className="text-xs text-stone-400 font-body tracking-wide">{step.duration}</span>
          </div>
          <p className="text-stone-600 leading-relaxed text-sm md:text-base font-body">{step.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const PlantCard: FC<{ plant: PalettePlant; index: number }> = ({ plant, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.5, delay: index * 0.06 }}
    className="border-l-2 border-forest-200 pl-4 py-2 hover:border-forest-500 transition-colors"
  >
    <div className="flex items-start justify-between gap-4">
      <div>
        <h4 className="font-heading text-lg text-stone-800">{plant.name}</h4>
        <p className="text-stone-400 text-xs italic font-body">{plant.scientific}</p>
      </div>
      <span className="text-[10px] uppercase tracking-widest text-forest-400 whitespace-nowrap font-body">{plant.category}</span>
    </div>
    <p className="text-stone-500 text-sm mt-1 leading-relaxed font-body">{plant.description}</p>
  </motion.div>
);

const TestimonialCard: FC<{ t: Testimonial; index: number }> = ({ t, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.15 }}
    className="border border-cream-200 p-8 md:p-10 rounded-sm bg-cream-100/50"
  >
    <QuoteIcon className="w-10 h-10 text-forest-200 mb-4" />
    <p className="text-stone-700 leading-relaxed text-sm md:text-base font-body italic mb-6">{t.quote}</p>
    <div className="flex items-center gap-3">
      <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
      <div>
        <p className="font-heading text-forest-600">{t.name}</p>
        <p className="text-stone-400 text-xs font-body">{t.location}</p>
      </div>
    </div>
  </motion.div>
);

const NavBar: FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-cream-50/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
        <a href="#" className="font-heading text-lg md:text-xl text-forest-600 tracking-tight flex items-center gap-2">
          <LeafIcon className="w-5 h-5" />
          {siteInfo.name}
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs uppercase tracking-[0.15em] text-stone-600 hover:text-forest-500 transition-colors font-body"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-stone-700"
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
            className="md:hidden bg-cream-50 border-t border-cream-200 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm uppercase tracking-[0.15em] text-stone-600 hover:text-forest-500 font-body"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

const Footer: FC = () => (
  <footer className="bg-stone-900 text-stone-300 py-16 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-3 gap-10 mb-10">
        <div>
          <h4 className="font-heading text-xl text-cream-200 mb-3 flex items-center gap-2">
            <LeafIcon className="w-5 h-5 text-forest-400" /> {siteInfo.name}
          </h4>
          <p className="text-stone-400 text-sm leading-relaxed font-body">{siteInfo.description}</p>
        </div>
        <div>
          <h4 className="font-heading text-lg text-cream-200 mb-3">Contact</h4>
          <p className="text-stone-400 text-sm font-body flex items-center gap-2">
            <EmailIcon className="w-4 h-4" /> {contactInfo.email}
          </p>
          <p className="text-stone-400 text-sm font-body flex items-center gap-2 mt-1">
            <PhoneIcon className="w-4 h-4" /> {contactInfo.phone}
          </p>
          <p className="text-stone-400 text-sm font-body flex items-center gap-2 mt-1">
            <LocationIcon className="w-4 h-4" /> {contactInfo.address}
          </p>
        </div>
        <div>
          <h4 className="font-heading text-lg text-cream-200 mb-3">Follow</h4>
          <p className="text-stone-400 text-sm font-body">{contactInfo.social.instagram}</p>
          <p className="text-stone-400 text-sm font-body">{contactInfo.social.pinterest}</p>
        </div>
      </div>
      <div className="border-t border-stone-700 pt-8 text-center text-xs text-stone-500 font-body">
        &copy; {new Date().getFullYear()} {siteInfo.name}. All rights reserved.
      </div>
    </div>
  </footer>
);

const ConsultationForm: FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };
  return (
    <div className="max-w-lg mx-auto">
      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <CheckIcon className="w-12 h-12 text-forest-500 mx-auto mb-4" />
          <h3 className="font-heading text-2xl text-forest-600 mb-2">Thank You</h3>
          <p className="text-stone-500 text-sm font-body">We will be in touch within 24 hours to schedule your consultation.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-500 mb-1 font-body">Name</label>
              <input
                required
                type="text"
                className="w-full border border-cream-300 bg-cream-100/50 rounded-sm px-4 py-3 text-sm text-stone-800 focus:outline-none focus:border-forest-400 transition-colors font-body"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-500 mb-1 font-body">Email</label>
              <input
                required
                type="email"
                className="w-full border border-cream-300 bg-cream-100/50 rounded-sm px-4 py-3 text-sm text-stone-800 focus:outline-none focus:border-forest-400 transition-colors font-body"
                placeholder="your@email.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-500 mb-1 font-body">Property Location</label>
            <input
              type="text"
              className="w-full border border-cream-300 bg-cream-100/50 rounded-sm px-4 py-3 text-sm text-stone-800 focus:outline-none focus:border-forest-400 transition-colors font-body"
              placeholder="City, State"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-500 mb-1 font-body">Project Scope</label>
            <textarea
              rows={4}
              className="w-full border border-cream-300 bg-cream-100/50 rounded-sm px-4 py-3 text-sm text-stone-800 focus:outline-none focus:border-forest-400 transition-colors font-body resize-none"
              placeholder="Tell us about your property and vision..."
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            className="w-full bg-forest-500 text-cream-50 rounded-sm py-3 text-sm uppercase tracking-widest hover:bg-forest-600 transition-colors font-body"
          >
            Submit Inquiry
          </motion.button>
        </form>
      )}
    </div>
  );
};

/* ── Section Components ── */

const HeroSection: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0"
      >
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url('${siteInfo.heroImage}')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      </motion.div>
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-cream-200/70 text-xs md:text-sm tracking-[0.3em] uppercase block mb-6 font-body"
        >
          <LocationIcon className="w-3.5 h-3.5 inline-block mr-1.5 -mt-0.5" />
          {siteInfo.location}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl text-cream-50 leading-tight font-heading"
        >
          {siteInfo.tagline}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-cream-200/60 text-sm md:text-base mt-6 max-w-xl mx-auto leading-relaxed font-body"
        >
          {siteInfo.description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10"
        >
          <a
            href="#contact"
            className="inline-block border border-cream-200/30 text-cream-50 px-8 py-3 text-xs uppercase tracking-[0.25em] hover:bg-cream-50/10 transition-colors font-body"
          >
            Begin a Conversation
          </a>
        </motion.div>
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
          className="text-cream-200/40"
        >
          <ArrowDownIcon className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
};

const PhilosophySection: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x = useTransform(scrollYProgress, [0, 1], ['-5%', '0%']);

  return (
    <section id="philosophy" ref={ref} className="py-24 md:py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div style={{ x }} className="relative">
            <div className="aspect-[3/4] rounded-sm overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=85"
                alt="Luxury botanical garden pathway"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-forest-200 rounded-sm hidden md:block" />
          </motion.div>
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-forest-400 text-xs tracking-[0.25em] uppercase block mb-4 font-body"
            >
              Design Philosophy
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl text-stone-800 leading-tight mb-6 font-heading"
            >
              Every landscape begins with a single decision: what to leave untouched.
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4 text-stone-600 leading-relaxed text-sm md:text-base font-body"
            >
              <p>
                We do not impose gardens onto land. We listen to what the site already knows — 
                where water runs, where light falls, where the wind quiets. Our work is 
                subtractive before it is additive.
              </p>
              <p>
                The great landscapes are not the ones with the most plants. They are the ones 
                where every element — a single olive tree, a stone bench, a sheet of water — 
                carries enough weight to hold the space around it.
              </p>
              <p>
                We are not decorators. We are composers of space. And we work only with 
                clients who understand that restraint is the rarest luxury.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServicesSection: FC = () => (
  <section id="services" className="py-24 md:py-32 px-6 bg-cream-100/30">
    <div className="max-w-5xl mx-auto">
      <motion.div className="text-center mb-16">
        <span className="text-forest-400 text-xs tracking-[0.25em] uppercase font-body">Capabilities</span>
        <h2 className="text-3xl md:text-4xl text-stone-800 mt-3 font-heading">Services</h2>
        <p className="text-stone-500 text-sm mt-3 max-w-md mx-auto font-body">
          From master planning to ongoing stewardship &mdash; each service is a discipline, not a checkbox.
        </p>
      </motion.div>
      <div className="max-w-2xl mx-auto">
        {services.map((s, i) => (
          <ServiceCard key={s.id} item={s} index={i} />
        ))}
      </div>
    </div>
  </section>
);

const PortfolioSection: FC = () => (
  <section id="portfolio" className="py-24 md:py-32 px-6">
    <div className="max-w-7xl mx-auto">
      <motion.div className="text-center mb-16">
        <span className="text-forest-400 text-xs tracking-[0.25em] uppercase font-body">Selected Work</span>
        <h2 className="text-3xl md:text-4xl text-stone-800 mt-3 font-heading">Portfolio</h2>
      </motion.div>
      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </div>
  </section>
);

const ProcessSection: FC = () => (
  <section id="process" className="py-24 md:py-32 px-6 bg-cream-100/30">
    <div className="max-w-4xl mx-auto">
      <motion.div className="text-center mb-16">
        <span className="text-forest-400 text-xs tracking-[0.25em] uppercase font-body">Methodology</span>
        <h2 className="text-3xl md:text-4xl text-stone-800 mt-3 font-heading">Our Process</h2>
        <p className="text-stone-500 text-sm mt-3 max-w-lg mx-auto font-body">
          Five stages. No shortcuts. Each phase informs the next with the precision of a slow craft.
        </p>
      </motion.div>
      <div className="relative">
        <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-cream-300 hidden md:block" />
        {processSteps.map((ps, i) => (
          <ProcessCard key={ps.step} step={ps} index={i} />
        ))}
      </div>
    </div>
  </section>
);

const PlantsSection: FC = () => {
  const categories = [...new Set(palettePlants.map((p) => p.category))];
  return (
    <section id="plants" className="py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div className="text-center mb-16">
          <span className="text-forest-400 text-xs tracking-[0.25em] uppercase font-body">Botanical Palette</span>
          <h2 className="text-3xl md:text-4xl text-stone-800 mt-3 font-heading">Plants That Belong</h2>
          <p className="text-stone-500 text-sm mt-3 max-w-lg mx-auto font-body">
            Every species selected for its form, habitat value, and long-term resilience in our climate.
          </p>
        </motion.div>
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {categories.map((cat) => (
            <span
              key={cat}
              className="text-[10px] uppercase tracking-widest text-forest-500 bg-forest-50 px-3 py-1.5 rounded-full font-body"
            >
              {cat}
            </span>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-2">
          {palettePlants.map((p, i) => (
            <PlantCard key={p.name} plant={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection: FC = () => (
  <section className="py-24 md:py-32 px-6 bg-cream-100/30">
    <div className="max-w-6xl mx-auto">
      <motion.div className="text-center mb-16">
        <span className="text-forest-400 text-xs tracking-[0.25em] uppercase font-body">Kind Words</span>
        <h2 className="text-3xl md:text-4xl text-stone-800 mt-3 font-heading">Client Reflections</h2>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <TestimonialCard key={t.name} t={t} index={i} />
        ))}
      </div>
    </div>
  </section>
);

const ContactSection: FC = () => (
  <section id="contact" className="py-24 md:py-32 px-6">
    <div className="max-w-6xl mx-auto">
      <motion.div className="text-center mb-16">
        <span className="text-forest-400 text-xs tracking-[0.25em] uppercase font-body">Begin the Conversation</span>
        <h2 className="text-3xl md:text-4xl text-stone-800 mt-3 font-heading">Schedule a Consultation</h2>
        <p className="text-stone-500 text-sm mt-3 max-w-md mx-auto font-body">
          Tell us about your property. We will arrange a site visit at your convenience.
        </p>
      </motion.div>
      <div className="grid md:grid-cols-5 gap-12 items-start">
        <div className="md:col-span-2 space-y-6">
          <div>
            <h4 className="font-heading text-lg text-forest-600 mb-1">Studio</h4>
            <p className="text-stone-500 text-sm font-body flex items-center gap-2">
              <LocationIcon className="w-4 h-4 text-forest-400" /> {contactInfo.address}
            </p>
          </div>
          <div>
            <h4 className="font-heading text-lg text-forest-600 mb-1">Contact</h4>
            <p className="text-stone-500 text-sm font-body flex items-center gap-2">
              <EmailIcon className="w-4 h-4 text-forest-400" /> {contactInfo.email}
            </p>
            <p className="text-stone-500 text-sm font-body flex items-center gap-2 mt-1">
              <PhoneIcon className="w-4 h-4 text-forest-400" /> {contactInfo.phone}
            </p>
          </div>
          <div className="border-t border-cream-200 pt-6">
            <p className="text-stone-400 text-xs font-body">
              Inquiries are reviewed within 48 hours. We serve properties over one acre.
            </p>
          </div>
        </div>
        <div className="md:col-span-3">
          <ConsultationForm />
        </div>
      </div>
    </div>
  </section>
);

/* ── Main App ── */

const App: FC = () => (
  <div className="font-body text-stone-800 antialiased">
    <NavBar />
    <main>
      <HeroSection />
      <PhilosophySection />
      <ServicesSection />
      <PortfolioSection />
      <ProcessSection />
      <PlantsSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
    <Footer />
  </div>
);

export default App;
