import { useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  siteInfo, capabilities, processPhases, equipment,
  projectTypes, safetyPoints, navLinks
} from './data'

/* ── SVG Icon Library ── */

const IconHelmet = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 3a7 7 0 00-7 7v2h14v-2a7 7 0 00-7-7z"/><path d="M5 12v3a4 4 0 004 4h6a4 4 0 004-4v-3"/><path d="M9 19v-2a3 3 0 013-3v0a3 3 0 013 3v2"/>
  </svg>
)

const IconHome = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 9.5L12 3l9 6.5"/><path d="M5 8.5V20a1 1 0 001 1h4v-7h4v7h4a1 1 0 001-1V8.5"/>
  </svg>
)

const IconBuilding = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="4" y="2" width="16" height="20" rx="1"/><path d="M9 6h2"/><path d="M13 6h2"/>
  </svg>
)

const IconRuler = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 6h20v12H2z"/><path d="M6 6v12"/><path d="M10 6v12"/><path d="M14 6v12"/><path d="M18 6v12"/>
  </svg>
)

const IconTruck = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="1" y="3" width="15" height="13"/><rect x="16" y="5" width="7" height="11" rx="1"/><path d="M16 16h-3"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
)

const IconWater = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/>
  </svg>
)

const IconZap = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
)

const IconRoad = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 19.5L8 4"/><path d="M16 4l4 15.5"/><path d="M8 4h8"/><path d="M4 19.5h16"/><path d="M12 4v15.5"/>
  </svg>
)

const IconCalendar = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18"/><path d="M8 2v4"/><path d="M16 2v4"/>
  </svg>
)

const IconLocation = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
)

const IconPhone = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
)

const IconMail = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13 2 4"/>
  </svg>
)

const IconCheckmark = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const IconShield = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>
  </svg>
)

const IconArrowDown = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
  </svg>
)

const IconArrowRight = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

const IconStar = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)

const icons: Record<string, React.FC<{className?:string}>> = {
  'helmet': IconHelmet, 'home': IconHome, 'building': IconBuilding,
  'ruler': IconRuler, 'truck': IconTruck, 'water': IconWater,
  'zap': IconZap, 'road': IconRoad, 'calendar': IconCalendar,
  'location': IconLocation, 'phone': IconPhone, 'mail': IconMail,
  'checkmark': IconCheckmark, 'shield': IconShield,
  'arrow-down': IconArrowDown, 'arrow-right': IconArrowRight, 'star': IconStar,
}

function Icon({ name, className = 'w-6 h-6' }: { name: string; className?: string }) {
  const C = icons[name] || IconHelmet
  return <C className={className} />
}

function useScrollProgress() {
  const { scrollYProgress } = useScroll()
  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  return width
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const width = useScrollProgress()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-asphalt-950/95 backdrop-blur-sm border-b border-earth-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-survey-500 flex items-center justify-center text-asphalt-950 font-bold text-lg font-display">
              <Icon name="helmet" className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white leading-tight">{siteInfo.name}</h1>
              <p className="text-xs text-asphalt-400 hidden sm:block font-mono">{siteInfo.shortTagline}</p>
            </div>
          </div>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className="text-sm text-asphalt-300 hover:text-survey-400 transition-colors font-medium tracking-wide uppercase">
                {l.label}
              </a>
            ))}
            <a href="#contact" className="px-5 py-2.5 bg-survey-500 hover:bg-survey-600 text-asphalt-950 font-bold rounded-lg transition-colors text-sm tracking-wide">
              Get a Quote
            </a>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-asphalt-300 hover:text-white p-2" aria-label="Menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-asphalt-900 border-t border-earth-900/50 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map(l => (
                <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="block text-sm text-asphalt-300 hover:text-survey-400 transition-colors uppercase font-medium tracking-wide">
                  {l.label}
                </a>
              ))}
              <a href="#contact" onClick={() => setMenuOpen(false)} className="block text-center px-5 py-3 bg-survey-500 hover:bg-survey-600 text-asphalt-950 font-bold rounded-lg transition-colors text-sm tracking-wide">
                Get a Quote
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll progress bar */}
      <motion.div className="h-0.5 bg-survey-500 origin-left" style={{ scaleX: width }} />
    </nav>
  )
}

function SectionHeading({ title, subtitle, light }: { title: string; subtitle?: string; light?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      className="text-center mb-16"
    >
      <h2 className={`text-4xl lg:text-5xl font-display tracking-wider ${light ? 'text-white' : 'text-asphalt-950'}`}>
        {title}
      </h2>
      <div className="w-16 h-1 bg-survey-500 mx-auto mt-4 mb-4" />
      {subtitle && <p className={`max-w-2xl mx-auto text-base ${light ? 'text-asphalt-300' : 'text-asphalt-600'}`}>{subtitle}</p>}
    </motion.div>
  )
}

function FadeInUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  )
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background image with gradient overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-asphalt-950/95 via-asphalt-900/90 to-earth-900/95 z-10" />
        <img
          src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1600&q=85"
          alt="Heavy construction equipment at work"
          className="w-full h-full object-cover"
        />
      </div>
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.06] z-10" style={{
        backgroundImage: 'linear-gradient(#f97316 1px, transparent 1px), linear-gradient(90deg, #f97316 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-survey-500/10 border border-survey-500/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-survey-400 animate-pulse" />
              <span className="text-sm text-survey-300 font-mono">Est. {siteInfo.founded} · Licensed & Insured</span>
            </div>
            <h1 className="text-6xl lg:text-8xl font-display tracking-wider text-white leading-none mb-6">
              {siteInfo.tagline}
              <span className="block text-survey-400 text-4xl lg:text-5xl mt-2">Heavy Civil · Sitework · Land Development</span>
            </h1>
            <p className="text-lg text-asphalt-300 leading-relaxed mb-8 max-w-xl">
              With <strong className="text-white">{siteInfo.yearsExperience} years</strong> and over <strong className="text-white">{siteInfo.projectsCompleted}+ projects</strong> completed, 
              we prepare land for residential, commercial, and industrial development across the greater Chicago area.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="px-8 py-3.5 bg-survey-500 hover:bg-survey-600 text-asphalt-950 font-bold rounded-lg transition-colors text-lg tracking-wide">
                Request a Site Evaluation
              </a>
              <a href="#capabilities" className="px-8 py-3.5 border border-asphalt-600 hover:border-survey-500 text-asphalt-200 hover:text-white rounded-lg transition-colors text-lg font-medium">
                Our Capabilities
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="bg-asphalt-900/50 border border-asphalt-700 rounded-2xl p-8 backdrop-blur-sm">
              <div className="space-y-6">
                {[
                  { label: 'Years Experience', value: siteInfo.yearsExperience },
                  { label: 'Projects Completed', value: siteInfo.projectsCompleted },
                  { label: 'Crew Size', value: siteInfo.crewSize },
                  { label: 'Acres Cleared', value: siteInfo.acresCleared },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-center justify-between border-b border-asphalt-700/50 pb-4 last:border-0 last:pb-0"
                  >
                    <span className="text-asphalt-400 font-mono text-sm uppercase tracking-wider">{stat.label}</span>
                    <span className="text-2xl font-bold text-white font-mono">{stat.value}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-asphalt-700/50">
                <p className="text-sm text-asphalt-400 font-mono">{siteInfo.license} · {siteInfo.insurance}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex justify-center mt-16"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-survey-400"
          >
            <Icon name="arrow-down" className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function CapabilitiesSection() {
  return (
    <section id="capabilities" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Core Capabilities"
          subtitle="From mass excavation to final compaction — we handle every phase of sitework in-house."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((c, i) => (
            <FadeInUp key={c.title} delay={i * 0.08}>
              <div className="group p-6 rounded-xl border border-asphalt-200 hover:border-survey-400 bg-white hover:bg-asphalt-50 transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-lg bg-survey-100 flex items-center justify-center mb-4 group-hover:bg-survey-500 transition-colors">
                  <Icon name={c.icon} className="w-6 h-6 text-survey-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-asphalt-950 mb-2">{c.title}</h3>
                <p className="text-sm text-asphalt-600 leading-relaxed">{c.description}</p>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section id="process" className="py-24 bg-asphalt-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Sitework Process"
          subtitle="A proven 6-phase methodology that delivers consistent results across every project."
        />
        <div className="relative">
          {/* Process line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-asphalt-300 hidden lg:block" />

          <div className="space-y-8 lg:space-y-0 relative">
            {processPhases.map((phase, i) => (
              <FadeInUp key={phase.title} delay={i * 0.1}>
                <div className="lg:grid lg:grid-cols-5 gap-8 items-start relative">
                  {/* Phase number */}
                  <div className="lg:col-span-1 flex lg:block items-center gap-4 mb-4 lg:mb-0">
                    <div className="w-16 h-16 rounded-full bg-survey-500 flex items-center justify-center text-asphalt-950 font-display text-2xl flex-shrink-0 relative z-10">
                      {phase.phase}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-asphalt-950 lg:hidden">{phase.title}</h3>
                      <p className="text-xs text-survey-600 font-mono uppercase tracking-wider hidden lg:block">Phase {phase.phase}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:col-span-4 bg-white rounded-xl border border-asphalt-200 p-6 ml-4 lg:ml-0">
                    <h3 className="text-xl font-bold text-asphalt-950 mb-2 hidden lg:block">{phase.title}</h3>
                    <p className="text-asphalt-700 mb-3">{phase.description}</p>
                    <p className="text-sm text-asphalt-500 font-mono flex items-start gap-2">
                      <Icon name="arrow-right" className="w-4 h-4 text-survey-500 mt-0.5 shrink-0" />
                      {phase.details}
                    </p>
                  </div>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function EquipmentFleet() {
  return (
    <section id="equipment" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Equipment Fleet"
          subtitle="Modern, well-maintained machines operated by certified heavy equipment operators."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {equipment.map((eq, i) => (
            <FadeInUp key={eq.name} delay={i * 0.08}>
              <div className="bg-asphalt-50 rounded-xl border border-asphalt-200 overflow-hidden group hover:border-survey-400 transition-colors">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Icon name={eq.icon} className="w-8 h-8 text-survey-600" />
                    <span className="text-xs font-mono text-survey-600 bg-survey-100 px-2 py-1 rounded-full uppercase tracking-wider">
                      {eq.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-asphalt-950 mb-1">{eq.name}</h3>
                  <p className="text-sm text-asphalt-600 mb-3">{eq.description}</p>
                  <div className="flex items-center gap-2 text-sm font-mono text-asphalt-500 bg-asphalt-100 rounded-lg px-3 py-2">
                    <Icon name="zap" className="w-4 h-4 text-survey-500" />
                    {eq.specs}
                  </div>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectTypes() {
  return (
    <section id="projects" className="py-24 bg-asphalt-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Project Types"
          subtitle="Diverse experience across residential, commercial, and heavy civil sitework."
          light
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projectTypes.map((pt, i) => (
            <FadeInUp key={pt.title} delay={i * 0.1}>
              <div className="group relative overflow-hidden rounded-xl border border-asphalt-700 hover:border-survey-500 transition-all duration-300">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={pt.image}
                    alt={pt.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-asphalt-950 via-asphalt-950/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-lg font-bold text-white mb-1">{pt.title}</h3>
                  <p className="text-sm text-asphalt-300 leading-relaxed">{pt.description}</p>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function Safety() {
  return (
    <section id="safety" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Safety & Compliance"
          subtitle="We maintain rigorous safety protocols and full regulatory compliance on every site."
        />
        <div className="grid sm:grid-cols-2 gap-6">
          {safetyPoints.map((sp, i) => (
            <FadeInUp key={sp.title} delay={i * 0.1}>
              <div className="flex gap-4 p-6 rounded-xl bg-asphalt-50 border border-asphalt-200 hover:border-survey-300 transition-colors">
                <div className="w-1.5 bg-survey-500 rounded-full flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-asphalt-950 text-lg mb-2">{sp.title}</h3>
                  <p className="text-asphalt-600 text-sm leading-relaxed">{sp.description}</p>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function Gallery() {
  const images = [
    { src: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80', label: 'Site Preparation' },
    { src: 'https://images.unsplash.com/photo-1541888946425-d81bb2c88ea5?w=600&q=80', label: 'Road Construction' },
    { src: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&q=80', label: 'Commercial Pad' },
    { src: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80', label: 'Industrial Yard' },
    { src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80', label: 'Residential Development' },
    { src: 'https://images.unsplash.com/photo-1590674899484-d5640d854c2c?w=600&q=80', label: 'Utility Installation' },
  ]

  return (
    <section className="py-24 bg-asphalt-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Project Gallery"
          subtitle="Real job sites across stages of development — from clearing to finished pad."
        />
      </div>
      <div className="overflow-x-auto scroll-container px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex gap-6 pb-4"
          style={{ minWidth: 'max-content' }}
        >
          {images.map((img, i) => (
            <motion.div
              key={img.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative flex-shrink-0 w-80 rounded-xl overflow-hidden group"
            >
              <img src={img.src} alt={img.label} className="w-80 h-52 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-asphalt-950/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-semibold text-sm">{img.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="py-24 bg-asphalt-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'radial-gradient(circle, #f97316 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-display tracking-wider text-white leading-tight mb-6">
              Ready to break ground?
              <span className="block text-survey-400 text-2xl lg:text-3xl mt-2">Request a site evaluation</span>
            </h2>
            <p className="text-asphalt-300 mb-8 leading-relaxed">
              Tell us about your project and we'll provide a preliminary assessment within 48 hours.
              We serve residential, commercial, and industrial clients across northern Illinois and northwest Indiana.
            </p>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3 text-asphalt-300">
                <Icon name="phone" className="w-5 h-5 text-survey-400 flex-shrink-0" />
                {siteInfo.phone}
              </div>
              <div className="flex items-center gap-3 text-asphalt-300">
                <Icon name="mail" className="w-5 h-5 text-survey-400 flex-shrink-0" />
                {siteInfo.email}
              </div>
              <div className="flex items-center gap-3 text-asphalt-300">
                <Icon name="location" className="w-5 h-5 text-survey-400 flex-shrink-0" />
                {siteInfo.address}
              </div>
              <div className="flex items-center gap-3 text-asphalt-300">
                <Icon name="shield" className="w-5 h-5 text-survey-400 flex-shrink-0" />
                {siteInfo.license}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            {submitted ? (
              <div className="bg-asphalt-900/50 border border-survey-500/30 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-survey-500/20 flex items-center justify-center mx-auto mb-4">
                  <Icon name="checkmark" className="w-8 h-8 text-survey-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Evaluation Request Submitted</h3>
                <p className="text-asphalt-400">A project estimator will contact you within 48 hours to discuss your sitework needs.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-asphalt-900/50 border border-asphalt-700 rounded-2xl p-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-asphalt-300 mb-1.5">Full Name</label>
                    <input type="text" required className="w-full px-4 py-3 bg-asphalt-950 border border-asphalt-700 rounded-lg text-white placeholder-asphalt-500 focus:border-survey-500 focus:ring-1 focus:ring-survey-500 outline-none transition-colors" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-asphalt-300 mb-1.5">Company</label>
                    <input type="text" className="w-full px-4 py-3 bg-asphalt-950 border border-asphalt-700 rounded-lg text-white placeholder-asphalt-500 focus:border-survey-500 focus:ring-1 focus:ring-survey-500 outline-none transition-colors" placeholder="Company name" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-asphalt-300 mb-1.5">Email</label>
                    <input type="email" required className="w-full px-4 py-3 bg-asphalt-950 border border-asphalt-700 rounded-lg text-white placeholder-asphalt-500 focus:border-survey-500 focus:ring-1 focus:ring-survey-500 outline-none transition-colors" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-asphalt-300 mb-1.5">Phone</label>
                    <input type="tel" className="w-full px-4 py-3 bg-asphalt-950 border border-asphalt-700 rounded-lg text-white placeholder-asphalt-500 focus:border-survey-500 focus:ring-1 focus:ring-survey-500 outline-none transition-colors" placeholder="(312) 555-0000" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-asphalt-300 mb-1.5">Project Type</label>
                  <select className="w-full px-4 py-3 bg-asphalt-950 border border-asphalt-700 rounded-lg text-white focus:border-survey-500 focus:ring-1 focus:ring-survey-500 outline-none transition-colors">
                    <option value="">Select project type</option>
                    <option>Residential Subdivision</option>
                    <option>Commercial Building Pad</option>
                    <option>Road & Infrastructure</option>
                    <option>Industrial Yard</option>
                    <option>Utility Installation</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-asphalt-300 mb-1.5">Project Description</label>
                  <textarea rows={4} required className="w-full px-4 py-3 bg-asphalt-950 border border-asphalt-700 rounded-lg text-white placeholder-asphalt-500 focus:border-survey-500 focus:ring-1 focus:ring-survey-500 outline-none transition-colors resize-none" placeholder="Describe your project scope, location, and timeline..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-asphalt-300 mb-1.5">Estimated Project Size</label>
                  <select className="w-full px-4 py-3 bg-asphalt-950 border border-asphalt-700 rounded-lg text-white focus:border-survey-500 focus:ring-1 focus:ring-survey-500 outline-none transition-colors">
                    <option value="">Select size</option>
                    <option>Under 1 acre</option>
                    <option>1–5 acres</option>
                    <option>5–20 acres</option>
                    <option>20–100 acres</option>
                    <option>100+ acres</option>
                  </select>
                </div>
                <button type="submit" className="w-full px-8 py-3.5 bg-survey-500 hover:bg-survey-600 text-asphalt-950 font-bold rounded-lg transition-colors text-lg tracking-wide">
                  Submit Evaluation Request
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-asphalt-950 border-t border-asphalt-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-survey-500 flex items-center justify-center text-asphalt-950 font-bold font-display">
                <Icon name="helmet" className="w-4 h-4" />
              </div>
              <span className="text-white font-bold">{siteInfo.name}</span>
            </div>
            <p className="text-sm text-asphalt-400 leading-relaxed">{siteInfo.shortTagline}</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-2 text-sm text-asphalt-400">
              {capabilities.slice(0, 5).map(c => (
                <li key={c.title}>{c.title}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-2 text-sm text-asphalt-400">
              <li>{siteInfo.address}</li>
              <li>{siteInfo.phone}</li>
              <li>{siteInfo.email}</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Licensing</h4>
            <ul className="space-y-2 text-sm text-asphalt-400">
              <li>{siteInfo.license}</li>
              <li>{siteInfo.insurance}</li>
              <li>Est. {siteInfo.founded}</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-asphalt-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-asphalt-500">© {new Date().getFullYear()} {siteInfo.name}. All rights reserved.</p>
          <p className="text-xs text-asphalt-500 font-mono">{siteInfo.license} · Fully Insured</p>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CapabilitiesSection />
        <Process />
        <EquipmentFleet />
        <ProjectTypes />
        <Safety />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
