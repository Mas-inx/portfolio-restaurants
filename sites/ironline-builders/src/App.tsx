import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { siteData } from './data';

// ==================== NAVBAR ====================
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = ['Services', 'Control', 'Projects', 'Process', 'Safety', 'Budget', 'Contact'];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-graphite/95 backdrop-blur-md border-b border-concrete/50' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="heading-font text-2xl font-bold text-white tracking-wider flex items-center gap-2">
          <span className="w-3 h-3 bg-safety-orange rotate-45 inline-block" />
          IRONLINE<span className="text-safety-orange">.</span>
        </a>
        <div className="hidden lg:flex items-center gap-6">
          {links.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-xs text-steel hover:text-safety-orange transition-colors uppercase tracking-[0.2em] font-medium">
              {link}
            </a>
          ))}
          <a href="#contact" className="ml-4 px-5 py-2 bg-safety-orange text-graphite text-xs font-bold uppercase tracking-wider hover:bg-safety-orange-dark transition-colors">
            Get Proposal
          </a>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>
      {mobileOpen && (
        <div className="lg:hidden bg-graphite/98 backdrop-blur-md border-t border-concrete/30 px-6 py-4">
          {links.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMobileOpen(false)} className="block py-3 text-steel hover:text-safety-orange uppercase tracking-wider text-sm border-b border-concrete/20 last:border-0">
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ==================== HERO ====================
function Hero() {
  const { scrollYProgress } = useScroll();
  const gridOffset = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated blueprint grid */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 107, 0, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 107, 0, 0.08) 1px, transparent 1px),
            linear-gradient(rgba(255, 107, 0, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 107, 0, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '120px 120px, 120px 120px, 24px 24px, 24px 24px',
          y: gridOffset,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-graphite via-graphite/90 to-graphite" />

      <div className="relative max-w-7xl mx-auto px-6 py-32 w-full">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-3">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-3 px-4 py-2 border border-safety-orange/30 bg-safety-orange/5 mb-8">
                <span className="w-2 h-2 bg-safety-orange rounded-full status-pulse" />
                <span className="text-safety-orange text-xs uppercase tracking-[0.3em] font-medium">{siteData.company.license} — Active</span>
              </div>
              <h1 className="heading-font text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.88] mb-8">
                {siteData.hero.headline.split('. ').map((line, i) => (
                  <span key={i} className="block">
                    {line}{i === 0 ? '.' : ''}
                  </span>
                ))}
              </h1>
              <p className="text-lg text-steel mb-10 max-w-xl leading-relaxed">
                {siteData.hero.subheadline}
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#contact" className="px-8 py-4 bg-safety-orange text-graphite font-bold uppercase tracking-wider text-sm hover:bg-safety-orange-dark transition-colors">
                  Request Proposal
                </a>
                <a href="#projects" className="px-8 py-4 border border-steel/30 text-white font-bold uppercase tracking-wider text-sm hover:border-safety-orange hover:text-safety-orange transition-colors">
                  View Projects
                </a>
              </div>
            </motion.div>
          </div>

          {/* Dashboard status cards */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="lg:col-span-2 space-y-4">
            <DashboardCard
              label={siteData.hero.schedule.label}
              value={siteData.hero.schedule.value}
              detail={siteData.hero.schedule.detail}
              barWidth={98.7}
              color="safety-orange"
            />
            <DashboardCard
              label={siteData.hero.budget.label}
              value={siteData.hero.budget.value}
              detail={siteData.hero.budget.detail}
              barWidth={95}
              color="white"
            />
            <DashboardCard
              label={siteData.hero.siteStatus.label}
              value={siteData.hero.siteStatus.value}
              detail={siteData.hero.siteStatus.detail}
              barWidth={100}
              color="green"
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-concrete-light text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-safety-orange to-transparent" />
      </div>
    </section>
  );
}

function DashboardCard({ label, value, detail, barWidth, color }: { label: string; value: string; detail: string; barWidth: number; color: string }) {
  const colorClass = color === 'safety-orange' ? 'text-safety-orange' : color === 'green' ? 'text-green-400' : 'text-white';
  const barColor = color === 'safety-orange' ? 'bg-safety-orange' : color === 'green' ? 'bg-green-400' : 'bg-white';

  return (
    <div className="dashboard-card p-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-steel uppercase tracking-[0.2em]">{label}</span>
        <span className="w-2 h-2 bg-green-400 rounded-full status-pulse" />
      </div>
      <div className={`heading-font text-5xl font-black ${colorClass} mb-2`}>{value}</div>
      <div className="text-sm text-concrete-light mb-4">{detail}</div>
      <div className="metric-bar">
        <motion.div
          className={`h-full ${barColor} rounded`}
          initial={{ width: 0 }}
          animate={{ width: `${barWidth}%` }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

// ==================== SECTION HEADING ====================
function SectionHeading({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-16">
      <div className="flex items-center gap-4 mb-4">
        <div className="h-px w-12 bg-safety-orange" />
        <span className="text-safety-orange text-xs uppercase tracking-[0.3em] font-medium">{label}</span>
      </div>
      <h2 className="heading-font text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[0.9]">{title}</h2>
      {subtitle && <p className="text-steel mt-6 max-w-2xl text-lg leading-relaxed">{subtitle}</p>}
    </motion.div>
  );
}

// ==================== SERVICES (What We Build) ====================
function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <section id="services" className="py-24 bg-graphite blueprint-grid">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading label="What We Build" title="Precision Across Every Sector" subtitle="From commercial fit-outs to ground-up custom builds — we deliver complex construction with documentation at every phase." />
        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {siteData.services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="dashboard-card p-7 group"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 border border-safety-orange/40 flex items-center justify-center group-hover:bg-safety-orange/10 transition-colors">
                  <span className="heading-font text-safety-orange font-bold text-sm">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="heading-font text-xl font-bold text-white">{service.title}</h3>
              </div>
              <p className="text-steel text-sm mb-5 leading-relaxed">{service.description}</p>
              <div className="space-y-2">
                {service.specs.map((spec, j) => (
                  <div key={j} className="flex items-center gap-3 text-sm text-concrete-light">
                    <span className="w-1.5 h-1.5 bg-safety-orange/60 shrink-0" />
                    {spec}
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

// ==================== PROJECT CONTROL SYSTEM ====================
function ControlSystem() {
  const [activeFeature, setActiveFeature] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="control" className="py-24 bg-graphite-light">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading label="Project Control System" title={siteData.controlSystem.title} subtitle={siteData.controlSystem.subtitle} />
        <div ref={ref} className="grid lg:grid-cols-12 gap-6">
          {/* Feature tabs */}
          <div className="lg:col-span-4 space-y-1">
            {siteData.controlSystem.features.map((feature, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                onClick={() => setActiveFeature(i)}
                className={`w-full text-left px-5 py-4 border transition-all flex items-center gap-4 ${activeFeature === i ? 'border-safety-orange bg-safety-orange/5' : 'border-concrete/30 hover:border-concrete bg-graphite/50'}`}
              >
                <span className={`heading-font text-sm font-bold w-6 ${activeFeature === i ? 'text-safety-orange' : 'text-concrete-light'}`}>{String(i + 1).padStart(2, '0')}</span>
                <span className={`heading-font text-base font-bold ${activeFeature === i ? 'text-safety-orange' : 'text-white'}`}>{feature.name}</span>
              </motion.button>
            ))}
          </div>

          {/* Active feature dashboard */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="dashboard-card p-8"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-2 h-2 bg-safety-orange rounded-full status-pulse" />
                  <span className="text-safety-orange text-xs uppercase tracking-[0.3em]">Live Dashboard</span>
                </div>
                <h3 className="heading-font text-3xl font-bold text-white mb-3">
                  {siteData.controlSystem.features[activeFeature].name}
                </h3>
                <p className="text-steel text-base mb-8 leading-relaxed">
                  {siteData.controlSystem.features[activeFeature].description}
                </p>

                {/* Metrics grid */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {siteData.controlSystem.features[activeFeature].metrics.map((metric, i) => (
                    <div key={i} className="bg-graphite border border-concrete/30 p-4">
                      <div className="text-xs text-steel uppercase tracking-wider mb-1">{metric.label}</div>
                      <div className="heading-font text-2xl font-bold text-safety-orange">{metric.value}</div>
                    </div>
                  ))}
                </div>

                {/* Mock chart bars */}
                <div className="space-y-3">
                  <div className="text-xs text-steel uppercase tracking-wider mb-2">Activity — Last 30 Days</div>
                  {[85, 72, 91, 68, 95, 78, 88].map((val, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-xs text-concrete-light w-8">W{i + 1}</span>
                      <div className="flex-1 h-3 bg-concrete/30 rounded-sm overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-safety-orange/80 to-safety-orange rounded-sm"
                          initial={{ width: 0 }}
                          animate={{ width: `${val}%` }}
                          transition={{ duration: 0.8, delay: i * 0.05 }}
                        />
                      </div>
                      <span className="text-xs text-steel w-8 text-right">{val}%</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== SELECTED PROJECTS ====================
function Projects() {
  const [activeProject, setActiveProject] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const project = siteData.projects[activeProject];

  return (
    <section id="projects" className="py-24 bg-graphite blueprint-grid">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading label="Selected Projects" title="Built to Last. Documented to Prove It." />
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Project selector */}
          <div className="lg:col-span-4 space-y-3">
            {siteData.projects.map((p, i) => (
              <motion.button
                key={p.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                onClick={() => { setActiveProject(i); setExpanded(false); }}
                className={`w-full text-left p-5 border transition-all ${activeProject === i ? 'border-safety-orange bg-safety-orange/5' : 'border-concrete/30 hover:border-concrete bg-graphite/50'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-safety-orange text-xs uppercase tracking-[0.2em]">{p.type}</span>
                  <span className="heading-font text-white font-bold">{p.value}</span>
                </div>
                <div className={`heading-font text-lg font-bold ${activeProject === i ? 'text-safety-orange' : 'text-white'}`}>{p.name}</div>
                <div className="text-steel text-sm mt-1">{p.location} · {p.duration}</div>
              </motion.button>
            ))}
          </div>

          {/* Project detail */}
          <div className="lg:col-span-8">
            <div className="dashboard-card overflow-hidden">
              <div className="relative">
                <img src={project.image} alt={project.name} className="w-full h-64 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/50 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-safety-orange text-xs uppercase tracking-[0.2em]">{project.type}</span>
                    <span className="text-concrete-light text-xs">|</span>
                    <span className="text-concrete-light text-xs">{project.duration}</span>
                    <span className="text-concrete-light text-xs">|</span>
                    <span className="text-white text-xs font-bold">{project.value}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-graphite border border-concrete/30 p-4">
                    <div className="text-xs text-safety-orange uppercase tracking-wider mb-1">Scope</div>
                    <p className="text-steel text-sm leading-relaxed">{project.scope}</p>
                  </div>
                  <div className="bg-graphite border border-concrete/30 p-4">
                    <div className="text-xs text-safety-orange uppercase tracking-wider mb-1">Challenge</div>
                    <p className="text-steel text-sm leading-relaxed">{project.challenge}</p>
                  </div>
                  <div className="bg-graphite border border-concrete/30 p-4">
                    <div className="text-xs text-safety-orange uppercase tracking-wider mb-1">Handover</div>
                    <p className="text-steel text-sm leading-relaxed">{project.handover}</p>
                  </div>
                </div>

                <button
                  onClick={() => setExpanded(!expanded)}
                  className="text-safety-orange text-sm uppercase tracking-wider font-medium flex items-center gap-2 hover:gap-3 transition-all"
                >
                  {expanded ? 'Collapse Details' : 'View Full Case Study'}
                  <svg className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <AnimatePresence>
                  {expanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-6 pt-6 border-t border-concrete/30 grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="heading-font text-white font-bold mb-3">Key Metrics</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between"><span className="text-steel">Contract Value</span><span className="text-white font-medium">{project.value}</span></div>
                            <div className="flex justify-between"><span className="text-steel">Duration</span><span className="text-white font-medium">{project.duration}</span></div>
                            <div className="flex justify-between"><span className="text-steel">Location</span><span className="text-white font-medium">{project.location}</span></div>
                            <div className="flex justify-between"><span className="text-steel">Safety Record</span><span className="text-green-400 font-medium">Zero Incidents</span></div>
                          </div>
                        </div>
                        <div>
                          <h4 className="heading-font text-white font-bold mb-3">Deliverables</h4>
                          <div className="space-y-2 text-sm text-steel">
                            <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-safety-orange" />Complete project archive</div>
                            <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-safety-orange" />As-built documentation</div>
                            <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-safety-orange" />Warranty & O&M manuals</div>
                            <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-safety-orange" />Final cost reconciliation</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== CONSTRUCTION PROCESS ====================
function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });

  return (
    <section id="process" className="py-24 bg-graphite-light" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading label="Construction Process" title="Five Phases. Zero Surprises." subtitle="From pre-construction through handover, every phase is documented, tracked, and reported." />

        <div className="relative">
          {/* Animated timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-concrete/20 hidden md:block" />
          <motion.div
            className="absolute left-8 top-0 w-px bg-safety-orange hidden md:block origin-top"
            style={{ scaleY: scrollYProgress, height: '100%' }}
          />

          <div className="space-y-8">
            {siteData.process.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative md:pl-24"
              >
                {/* Phase number node */}
                <div className="absolute left-0 top-0 w-16 h-16 bg-graphite border-2 border-safety-orange flex items-center justify-center heading-font text-xl font-black text-safety-orange hidden md:flex z-10">
                  {step.phase}
                </div>

                <div className="dashboard-card p-7">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <h3 className="heading-font text-2xl font-bold text-white">{step.title}</h3>
                    <span className="text-xs text-safety-orange uppercase tracking-[0.2em] px-3 py-1 border border-safety-orange/30 bg-safety-orange/5">{step.duration}</span>
                  </div>
                  <p className="text-steel mb-5 leading-relaxed">{step.description}</p>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {step.deliverables.map((d, j) => (
                      <div key={j} className="flex items-center gap-3 text-sm">
                        <svg className="w-4 h-4 text-safety-orange shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-concrete-light">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== SAFETY + SITE DISCIPLINE ====================
function Safety() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="safety" className="py-24 bg-graphite blueprint-grid">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading label="Safety + Site Discipline" title={siteData.safety.title} subtitle={siteData.safety.subtitle} />

        {/* Stats row */}
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {siteData.safety.stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="dashboard-card p-6 text-center"
            >
              <div className="heading-font text-4xl font-black text-safety-orange mb-1">{stat.value}</div>
              <div className="text-white text-sm font-bold uppercase tracking-wider mb-1">{stat.label}</div>
              <div className="text-concrete-light text-xs">{stat.detail}</div>
            </motion.div>
          ))}
        </div>

        {/* Standards grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {siteData.safety.standards.map((standard, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="dashboard-card p-7"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 bg-safety-orange/10 border border-safety-orange/30 flex items-center justify-center">
                  <span className="heading-font text-safety-orange font-bold text-sm">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="heading-font text-xl font-bold text-white">{standard.title}</h3>
              </div>
              <div className="space-y-3">
                {standard.items.map((item, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-safety-orange/10 border border-safety-orange/30 flex items-center justify-center text-safety-orange text-xs font-bold shrink-0 mt-0.5">✓</span>
                    <span className="text-steel text-sm">{item}</span>
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

// ==================== BUDGET TRANSPARENCY ====================
function Budget() {
  return (
    <section id="budget" className="py-24 bg-graphite-light">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading label="Budget Transparency" title={siteData.budget.title} subtitle={siteData.budget.subtitle} />

        <div className="grid md:grid-cols-2 gap-5">
          {siteData.budget.commitments.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="dashboard-card p-7 group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-safety-orange/10 border border-safety-orange/30 flex items-center justify-center group-hover:bg-safety-orange/20 transition-colors">
                  <span className="heading-font text-safety-orange font-bold text-lg">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="heading-font text-xl font-bold text-white">{item.title}</h3>
              </div>
              <p className="text-steel leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Budget breakdown mock */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8 dashboard-card p-7"
        >
          <div className="text-safety-orange text-xs uppercase tracking-[0.3em] mb-4">Sample Budget Breakdown</div>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { label: "Hard Costs", pct: 72, amount: "$7.2M" },
              { label: "Soft Costs", pct: 14, amount: "$1.4M" },
              { label: "Contingency", pct: 8, amount: "$800K" },
              { label: "GC Fee", pct: 6, amount: "$600K" },
            ].map((item, i) => (
              <div key={i} className="bg-graphite border border-concrete/30 p-4">
                <div className="text-xs text-steel uppercase tracking-wider mb-2">{item.label}</div>
                <div className="heading-font text-2xl font-bold text-white mb-2">{item.amount}</div>
                <div className="metric-bar">
                  <motion.div
                    className="h-full bg-safety-orange rounded"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                  />
                </div>
                <div className="text-xs text-concrete-light mt-1">{item.pct}% of total</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ==================== PROJECT INTAKE CTA ====================
function ContactCTA() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '',
    projectType: '', size: '', timeline: '', budget: '', details: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const updateField = useCallback((field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  return (
    <section id="contact" className="py-24 bg-graphite blueprint-grid">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <SectionHeading label="Project Intake" title={siteData.cta.title} />
            <p className="text-steel text-lg mb-10 leading-relaxed">{siteData.cta.description}</p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 border border-safety-orange/30 flex items-center justify-center">
                  <svg className="w-5 h-5 text-safety-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="text-steel text-sm">Call Us</div>
                  <div className="text-white font-bold">{siteData.cta.contactInfo.phone}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 border border-safety-orange/30 flex items-center justify-center">
                  <svg className="w-5 h-5 text-safety-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-steel text-sm">Email</div>
                  <div className="text-white font-bold">{siteData.cta.contactInfo.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 border border-safety-orange/30 flex items-center justify-center">
                  <svg className="w-5 h-5 text-safety-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <div className="text-steel text-sm">License</div>
                  <div className="text-white font-bold">{siteData.company.license}</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            {submitted ? (
              <div className="dashboard-card p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-6 border-2 border-safety-orange rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-safety-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="heading-font text-2xl font-bold text-white mb-3">Request Received</h3>
                <p className="text-steel">We'll respond within 24 hours with initial thoughts and next steps.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input type="text" placeholder="Full Name *" required value={formData.name} onChange={e => updateField('name', e.target.value)} className="w-full bg-graphite border border-concrete/30 px-4 py-3 text-white placeholder-concrete-light focus:border-safety-orange focus:outline-none transition-colors" />
                  <input type="email" placeholder="Email *" required value={formData.email} onChange={e => updateField('email', e.target.value)} className="w-full bg-graphite border border-concrete/30 px-4 py-3 text-white placeholder-concrete-light focus:border-safety-orange focus:outline-none transition-colors" />
                </div>
                <input type="tel" placeholder="Phone" value={formData.phone} onChange={e => updateField('phone', e.target.value)} className="w-full bg-graphite border border-concrete/30 px-4 py-3 text-white placeholder-concrete-light focus:border-safety-orange focus:outline-none transition-colors" />

                {/* Project type selector */}
                <div>
                  <label className="text-xs text-steel uppercase tracking-wider mb-2 block">Project Type</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {siteData.cta.projectTypes.map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => updateField('projectType', type)}
                        className={`px-3 py-2 text-xs border transition-all text-left ${formData.projectType === type ? 'border-safety-orange bg-safety-orange/10 text-safety-orange' : 'border-concrete/30 text-steel hover:border-concrete'}`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size */}
                <input
                  type="text"
                  placeholder="Approximate Size (SF or units)"
                  value={formData.size}
                  onChange={e => updateField('size', e.target.value)}
                  className="w-full bg-graphite border border-concrete/30 px-4 py-3 text-white placeholder-concrete-light focus:border-safety-orange focus:outline-none transition-colors"
                />

                {/* Timeline */}
                <select value={formData.timeline} onChange={e => updateField('timeline', e.target.value)} className="w-full bg-graphite border border-concrete/30 px-4 py-3 text-white focus:border-safety-orange focus:outline-none transition-colors">
                  <option value="">Target Timeline</option>
                  {siteData.cta.timelines.map(t => <option key={t} value={t}>{t}</option>)}
                </select>

                {/* Budget */}
                <select value={formData.budget} onChange={e => updateField('budget', e.target.value)} className="w-full bg-graphite border border-concrete/30 px-4 py-3 text-white focus:border-safety-orange focus:outline-none transition-colors">
                  <option value="">Estimated Budget</option>
                  {siteData.cta.budgets.map(b => <option key={b} value={b}>{b}</option>)}
                </select>

                <textarea placeholder="Project Details — scope, site conditions, special requirements..." rows={4} value={formData.details} onChange={e => updateField('details', e.target.value)} className="w-full bg-graphite border border-concrete/30 px-4 py-3 text-white placeholder-concrete-light focus:border-safety-orange focus:outline-none transition-colors resize-none" />

                <button type="submit" className="w-full px-8 py-4 bg-safety-orange text-graphite font-bold uppercase tracking-wider hover:bg-safety-orange-dark transition-colors text-sm">
                  {siteData.cta.buttonText}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== FOOTER ====================
function Footer() {
  return (
    <footer className="py-12 bg-concrete/10 border-t border-concrete/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="heading-font text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-3 h-3 bg-safety-orange rotate-45 inline-block" />
              IRONLINE<span className="text-safety-orange">.</span>
            </div>
            <p className="text-steel text-sm leading-relaxed">{siteData.company.description}</p>
          </div>
          <div>
            <h4 className="heading-font text-sm font-bold text-white uppercase tracking-wider mb-4">Services</h4>
            <div className="space-y-2">
              {siteData.services.map(s => (
                <div key={s.title} className="text-steel text-sm">{s.title}</div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="heading-font text-sm font-bold text-white uppercase tracking-wider mb-4">Company</h4>
            <div className="space-y-2 text-steel text-sm">
              <div>About Us</div>
              <div>Safety Record</div>
              <div>Careers</div>
              <div>Subcontractors</div>
              <div>Project Archive</div>
            </div>
          </div>
          <div>
            <h4 className="heading-font text-sm font-bold text-white uppercase tracking-wider mb-4">Contact</h4>
            <div className="space-y-2 text-steel text-sm">
              <div>{siteData.company.phone}</div>
              <div>{siteData.company.email}</div>
              <div>License: {siteData.company.license}</div>
            </div>
          </div>
        </div>
        <div className="border-t border-concrete/30 pt-8 flex flex-wrap justify-between items-center gap-4">
          <div className="text-concrete-light text-sm">© 2024 Ironline Builders. All rights reserved.</div>
          <div className="flex gap-6 text-steel text-sm">
            <span className="hover:text-safety-orange cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-safety-orange cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-safety-orange cursor-pointer transition-colors">Subcontractor Portal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ==================== APP ====================
export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <ControlSystem />
      <Projects />
      <Process />
      <Safety />
      <Budget />
      <ContactCTA />
      <Footer />
    </div>
  );
}
