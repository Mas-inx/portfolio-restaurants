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

/* ── Sub-components ── */

const ServiceCard: FC<{ item: ServiceItem; index: number }> = ({ item, index }) => {
  const icons: Record<string, string> = {
    pencil: '\u270E',
    grid: '\u25A6',
    droplet: '\u273D',
    sun: '\u2609',
    water: '\u2248',
    leaf: '\u2618',
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group border-b border-cream-300 pb-8 mb-8 last:border-0 last:pb-0 last:mb-0 cursor-default"
    >
      <div className="flex items-start gap-5">
        <span className="text-2xl text-forest-400 mt-1 w-8 text-center font-body">{icons[item.icon] || '\u2730'}</span>
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
      className="relative group cursor-pointer overflow-hidden"
    >
      <div
        className="aspect-[4/3] w-full rounded-sm flex items-end p-6 relative"
        style={{ backgroundColor: project.accentColor + '18' }}
      >
        <div
          className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700"
          style={{
            background: `radial-gradient(circle at ${index % 2 === 0 ? '30%' : '70%'} 40%, ${project.accentColor}44 0%, transparent 70%)`,
          }}
        />
        <div className="relative z-10">
          <span
            className="inline-block text-xs tracking-[0.2em] uppercase font-body font-medium mb-2"
            style={{ color: project.accentColor }}
          >
            {project.category}
          </span>
          <h3 className="font-heading text-2xl text-stone-800 mb-1">{project.title}</h3>
          <p className="text-stone-500 text-xs font-body">{project.location}</p>
          <p className="text-stone-600 text-sm leading-relaxed mt-3 max-w-md font-body opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
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
    <span className="text-5xl font-heading text-forest-200 leading-none block mb-4">&ldquo;</span>
    <p className="text-stone-700 leading-relaxed text-sm md:text-base font-body italic mb-6">&ldquo;{t.quote}&rdquo;</p>
    <div>
      <p className="font-heading text-forest-600">{t.name}</p>
      <p className="text-stone-400 text-xs font-body">{t.location}</p>
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
        <a href="#" className="font-heading text-lg md:text-xl text-forest-600 tracking-tight">
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
          className="md:hidden text-stone-700 text-2xl font-body"
          aria-label="Menu"
        >
          {mobileOpen ? '\u2715' : '\u2630'}
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
          <h4 className="font-heading text-xl text-cream-200 mb-3">{siteInfo.name}</h4>
          <p className="text-stone-400 text-sm leading-relaxed font-body">{siteInfo.description}</p>
        </div>
        <div>
          <h4 className="font-heading text-lg text-cream-200 mb-3">Contact</h4>
          <p className="text-stone-400 text-sm font-body">{contactInfo.email}</p>
          <p className="text-stone-400 text-sm font-body">{contactInfo.phone}</p>
          <p className="text-stone-400 text-sm font-body">{contactInfo.address}</p>
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
          <span className="text-4xl block mb-4 font-body">\u2714</span>
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
          className="w-full h-full"
          style={{
            background: 'linear-gradient(135deg, #1a2e1f 0%, #2d5a3d 30%, #4a7c59 60%, #7aa56e 100%)',
          }}
        />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle at 25% 50%, white 0.5px, transparent 0.5px)',
            backgroundSize: '40px 40px',
          }}
        />
      </motion.div>
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-cream-200/70 text-xs md:text-sm tracking-[0.3em] uppercase block mb-6 font-body"
        >
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
          className="text-cream-200/40 text-lg font-body"
        >
          \u2193
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
            <div className="aspect-[3/4] bg-forest-100 rounded-sm overflow-hidden relative">
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(160deg, #d3e2ce 0%, #a9c6a0 40%, #7aa56e 100%)',
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-cream-50/30 text-[12rem] font-heading leading-none">VS</span>
              </div>
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
            <p className="text-stone-500 text-sm font-body">{contactInfo.address}</p>
          </div>
          <div>
            <h4 className="font-heading text-lg text-forest-600 mb-1">Contact</h4>
            <p className="text-stone-500 text-sm font-body">{contactInfo.email}</p>
            <p className="text-stone-500 text-sm font-body">{contactInfo.phone}</p>
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
