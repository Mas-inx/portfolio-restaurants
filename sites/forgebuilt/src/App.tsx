import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import {
  siteInfo,
  services,
  projects,
  processSteps,
  testimonials,
  teamMembers,
  faqs,
  navLinks,
} from './data'

const IconBuilding = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="4" y="2" width="16" height="20" rx="1"/><path d="M9 6h2"/><path d="M13 6h2"/><path d="M9 10h2"/><path d="M13 10h2"/><path d="M9 14h2"/><path d="M13 14h2"/><path d="M9 18h2"/><path d="M13 18h2"/>
  </svg>
)
const IconBlueprint = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 3h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1z"/><path d="M8 7h8"/><path d="M8 11h8"/><path d="M8 15h5"/><path d="M16 15h.01"/>
  </svg>
)
const IconHelmet = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 3a7 7 0 00-7 7v2h14v-2a7 7 0 00-7-7z"/><path d="M5 12v3a4 4 0 004 4h6a4 4 0 004-4v-3"/><path d="M9 19v-2a3 3 0 013-3v0a3 3 0 013 3v2"/>
  </svg>
)
const IconWrench = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
  </svg>
)
const IconRuler = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 6h20v12H2z"/><path d="M6 6v12"/><path d="M10 6v12"/><path d="M14 6v12"/><path d="M18 6v12"/>
  </svg>
)
const IconClipboard = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M9 14l2 2 4-4"/>
  </svg>
)
const IconHammerWrench = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
  </svg>
)
const IconCheckmark = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12"/>
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
const IconArrowRight = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)
const IconShield = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>
  </svg>
)

const iconMap: Record<string, React.FC<{className?:string}>> = {
  building: IconBuilding, blueprint: IconBlueprint, helmet: IconHelmet,
  wrench: IconWrench, ruler: IconRuler, clipboard: IconClipboard,
  'hammer-wrench': IconHammerWrench, checkmark: IconCheckmark,
  location: IconLocation, phone: IconPhone, mail: IconMail,
  'arrow-right': IconArrowRight, shield: IconShield,
}

function Icon({ name, className = 'w-6 h-6' }: { name: string; className?: string }) {
  const C = iconMap[name] || IconBuilding
  return <C className={className} />
}

function ScrollReveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}

function Section({ id, children, className = '' }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative px-6 md:px-12 lg:px-24 py-20 md:py-28 ${className}`}>
      {children}
    </section>
  )
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    setMobileOpen(false)
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-concrete-50/95 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-20">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3">
          <div className="w-10 h-10 bg-steel-900 rounded-sm flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-amber-accent">
              <path d="M12 3a7 7 0 00-7 7v2h14v-2a7 7 0 00-7-7z"/><path d="M5 12v3a4 4 0 004 4h6a4 4 0 004-4v-3"/><path d="M9 19v-2a3 3 0 013-3v0a3 3 0 013 3v2"/>
            </svg>
          </div>
          <div className="hidden sm:block">
            <span className="text-lg font-heading tracking-tight text-steel-900 block leading-none">ForgeBuilt</span>
            <span className="text-[10px] uppercase tracking-[0.15em] text-concrete-600 font-medium">Contractors</span>
          </div>
        </button>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((l) => (
            <button key={l.href} onClick={() => scrollTo(l.href)} className="text-sm font-semibold text-concrete-700 hover:text-steel-900 transition-colors tracking-wide uppercase">
              {l.label}
            </button>
          ))}
          <button onClick={() => scrollTo('#contact')} className="bg-amber-accent hover:bg-amber-dark text-white px-5 py-2.5 text-sm font-bold tracking-wide transition-colors rounded-sm shadow-sm">
            Get Estimate
          </button>
        </div>

        <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
          <div className={`w-6 h-0.5 bg-steel-900 mb-1.5 transition-all ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-6 h-0.5 bg-steel-900 mb-1.5 transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-0.5 bg-steel-900 transition-all ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-concrete-50 border-t border-concrete-200 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((l) => (
                <button key={l.href} onClick={() => scrollTo(l.href)} className="text-sm font-semibold text-concrete-700 text-left uppercase tracking-wide">
                  {l.label}
                </button>
              ))}
              <button onClick={() => scrollTo('#contact')} className="bg-amber-accent text-white px-5 py-3 text-sm font-bold tracking-wide text-center rounded-sm">
                Get Estimate
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} className="relative h-screen min-h-[650px] flex items-center bg-steel-900 overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-steel-900/90 via-steel-900/70 to-steel-900/85 z-10" />
        <img
          src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1600&q=85"
          alt="Construction site"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Blueprint grid overlay */}
      <div className="absolute inset-0 z-10 opacity-[0.06]">
        <svg viewBox="0 0 1200 800" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#d97706" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <motion.div style={{ opacity }} className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-amber-accent text-sm font-bold tracking-[0.25em] uppercase">
              {siteInfo.shortTagline}
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-heading text-white leading-[0.85] mt-4 tracking-tight"
          >
            Built with<br />
            <span className="text-amber-accent">control.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-concrete-200 text-lg mt-6 max-w-xl leading-relaxed"
          >
            Commercial fit-outs, residential builds, and structural renovations — delivered with the discipline of a
            general contractor who treats every square foot like it belongs to them.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-4 mt-8"
          >
            <a href="#contact" className="bg-amber-accent hover:bg-amber-dark text-white px-8 py-4 font-bold tracking-wide text-sm uppercase transition-colors rounded-sm shadow-lg">
              Request Estimate
            </a>
            <a href="#work" className="border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 font-semibold tracking-wide text-sm uppercase transition-colors rounded-sm">
              View Portfolio
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 1 }}
            className="flex gap-12 mt-16"
          >
            <div><span className="text-white text-3xl font-heading block">{siteInfo.yearsExperience}+</span><span className="text-concrete-400 text-xs uppercase tracking-wider">Years</span></div>
            <div><span className="text-white text-3xl font-heading block">{siteInfo.projectsCompleted}+</span><span className="text-concrete-400 text-xs uppercase tracking-wider">Projects</span></div>
            <div><span className="text-white text-3xl font-heading block">{siteInfo.employees}</span><span className="text-concrete-400 text-xs uppercase tracking-wider">Employees</span></div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-concrete-400 text-xs uppercase tracking-[0.2em]"
        >
          Scroll
        </motion.div>
      </motion.div>
    </section>
  )
}

function Work() {
  return (
    <Section id="work">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-amber-accent text-sm font-bold tracking-[0.25em] uppercase">Portfolio</span>
          <h2 className="text-5xl md:text-6xl font-heading text-steel-900 mt-3 tracking-tight">Selected work</h2>
          <p className="text-concrete-600 mt-4 max-w-xl text-lg leading-relaxed">
            Every project tells a story. Here are a few we are proud to have built.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 0.08}>
              <div className={`group relative overflow-hidden rounded-sm bg-concrete-100 ${i % 3 === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                <div className={`overflow-hidden ${i % 3 === 0 ? 'h-80 md:h-[500px]' : 'h-64 md:h-80'}`}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full"
                  >
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                  </motion.div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-steel-900/90 via-steel-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-6 md:p-8">
                  <div>
                    <span className="text-amber-accent text-xs font-bold tracking-[0.2em] uppercase">{p.category}</span>
                    <h3 className="text-2xl font-heading text-white mt-1">{p.title}</h3>
                    <p className="text-concrete-200 text-sm mt-2 max-w-md">{p.description.slice(0, 120)}...</p>
                    <div className="flex flex-wrap gap-3 mt-3 text-xs text-concrete-300">
                      <span><Icon name="location" className="w-3 h-3 inline mr-1" />{p.location}</span>
                      <span>{p.scope}</span>
                      <span>{p.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </Section>
  )
}

function Services() {
  return (
    <Section id="services" className="bg-steel-900">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-amber-accent text-sm font-bold tracking-[0.25em] uppercase">Services</span>
          <h2 className="text-5xl md:text-6xl font-heading text-white mt-3 tracking-tight">What we build</h2>
          <p className="text-concrete-300 mt-4 max-w-xl text-lg leading-relaxed">
            From ground-up commercial construction to precision residential renovations — the full spectrum of general contracting.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 0.06}>
              <div className="group border border-concrete-700/50 bg-steel-800/50 p-7 hover:bg-steel-700/60 hover:border-amber-accent/30 transition-all duration-400 rounded-sm">
                <div className="w-12 h-12 rounded-sm bg-steel-700 flex items-center justify-center mb-4 group-hover:bg-amber-accent/20 transition-colors">
                  <Icon name={s.icon} className="w-6 h-6 text-concrete-300 group-hover:text-amber-accent transition-colors" />
                </div>
                <h3 className="text-xl font-heading text-white">{s.title}</h3>
                <p className="text-concrete-300 text-sm mt-3 leading-relaxed">{s.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </Section>
  )
}

function Process() {
  return (
    <Section id="process">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-amber-accent text-sm font-bold tracking-[0.25em] uppercase">Process</span>
          <h2 className="text-5xl md:text-6xl font-heading text-steel-900 mt-3 tracking-tight">How we build</h2>
          <p className="text-concrete-600 mt-4 max-w-xl text-lg leading-relaxed">
            A structured 5-stage process that keeps every project on schedule, on budget, and on specification.
          </p>
        </div>

        <div className="relative">
          {/* Desktop horizontal timeline */}
          <div className="hidden lg:block">
            <div className="relative flex justify-between">
              {/* Connecting line */}
              <div className="absolute top-12 left-[4%] right-[4%] h-0.5 bg-concrete-200">
                <motion.div
                  initial={{ width: '0%' }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                  className="h-full bg-amber-accent"
                />
              </div>

              {processSteps.map((step, i) => (
                <ScrollReveal key={step.step} delay={i * 0.1} className="flex flex-col items-center text-center w-1/5 px-3">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 0.3, type: 'spring', stiffness: 200 }}
                    className="w-16 h-16 bg-concrete-100 border-2 border-amber-accent text-amber-accent rounded-full flex items-center justify-center font-heading text-xl z-10 mb-5"
                  >
                    {step.step}
                  </motion.div>
                  <h3 className="text-lg font-heading text-steel-900">{step.title}</h3>
                  <p className="text-concrete-600 text-sm mt-2 leading-relaxed">{step.description}</p>
                  <p className="text-concrete-400 text-xs mt-2 italic">{step.details}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Mobile/tablet vertical timeline */}
          <div className="lg:hidden">
            <div className="relative">
              <div className="absolute left-[22px] md:left-[30px] top-0 bottom-0 w-0.5 bg-concrete-200" />
              {processSteps.map((step, i) => (
                <ScrollReveal key={step.step} delay={i * 0.1}>
                  <div className="flex gap-6 md:gap-8 mb-8 last:mb-0">
                    <div className="flex flex-col items-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15, type: 'spring', stiffness: 200 }}
                        className="w-11 h-11 md:w-14 md:h-14 bg-concrete-100 border-2 border-amber-accent text-amber-accent rounded-full flex items-center justify-center font-heading text-lg z-10"
                      >
                        {step.step}
                      </motion.div>
                    </div>
                    <div className="flex-1 bg-concrete-50 border border-concrete-200 p-5 md:p-6 rounded-sm">
                      <h3 className="text-lg font-heading text-steel-900">{step.title}</h3>
                      <p className="text-concrete-600 mt-2 text-sm">{step.description}</p>
                      <p className="text-concrete-400 text-xs mt-2 italic">{step.details}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

function Team() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <Section id="team" className="bg-concrete-50">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className="mb-16">
          <span className="text-amber-accent text-sm font-bold tracking-[0.25em] uppercase">Leadership</span>
          <h2 className="text-5xl md:text-6xl font-heading text-steel-900 mt-3 tracking-tight">Who we are</h2>
          <p className="text-concrete-600 mt-4 max-w-xl text-lg leading-relaxed">
            Built on experience, powered by people who care about the work.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl">
          {teamMembers.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="flex items-center gap-5 bg-white border border-concrete-200 p-6 rounded-sm"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden shrink-0 bg-concrete-200">
                <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-lg font-heading text-steel-900">{m.name}</h3>
                <p className="text-concrete-600 text-sm">{m.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12 p-8 bg-white border border-concrete-200 rounded-sm max-w-3xl"
        >
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-heading text-amber-accent">{siteInfo.yearsExperience}+</div>
              <div className="text-xs uppercase tracking-wider text-concrete-600 mt-1">Years</div>
            </div>
            <div>
              <div className="text-3xl font-heading text-amber-accent">{siteInfo.projectsCompleted}+</div>
              <div className="text-xs uppercase tracking-wider text-concrete-600 mt-1">Projects</div>
            </div>
            <div>
              <div className="text-3xl font-heading text-amber-accent">{siteInfo.employees}</div>
              <div className="text-xs uppercase tracking-wider text-concrete-600 mt-1">Employees</div>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-concrete-200 grid grid-cols-2 gap-4 text-sm">
            <div className="text-concrete-700"><span className="font-semibold text-steel-900">License:</span> {siteInfo.license}</div>
            <div className="text-concrete-700"><span className="font-semibold text-steel-900">Insurance:</span> {siteInfo.insurance}</div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}

function Testimonials() {
  const [active, setActive] = useState(0)

  return (
    <Section id="testimonials" className="bg-steel-900">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-amber-accent/40 mx-auto mb-6">
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
          </svg>
          <p className="text-concrete-100 text-xl md:text-2xl leading-relaxed italic">
            {testimonials[active].text}
          </p>
          <div className="mt-6">
            <p className="text-white font-heading text-lg">{testimonials[active].name}</p>
            <p className="text-concrete-400 text-sm">{testimonials[active].role}, {testimonials[active].company}</p>
          </div>
        </motion.div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === active ? 'bg-amber-accent w-6' : 'bg-concrete-600 hover:bg-concrete-400'
              }`}
            />
          ))}
        </div>
      </div>
    </Section>
  )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <Section id="faq">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <span className="text-amber-accent text-sm font-bold tracking-[0.25em] uppercase">FAQ</span>
          <h2 className="text-5xl md:text-6xl font-heading text-steel-900 mt-3 tracking-tight">Common questions</h2>
          <p className="text-concrete-600 mt-4 max-w-lg text-lg leading-relaxed">
            Straight answers about how we work, what we charge, and what to expect.
          </p>
        </div>

        <div className="space-y-2">
          {faqs.map((f, i) => (
            <div key={i} className="bg-concrete-50 border border-concrete-200 rounded-sm overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex justify-between items-center p-5 text-left"
              >
                <span className="font-semibold text-steel-900 text-sm pr-4">{f.question}</span>
                <motion.span
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-amber-accent shrink-0"
                >
                  <Icon name="arrow-right" className="w-4 h-4" />
                </motion.span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p className="px-5 pb-5 text-concrete-600 text-sm leading-relaxed">{f.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <Section id="contact" className="bg-steel-900">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-amber-accent text-sm font-bold tracking-[0.25em] uppercase">Contact</span>
            <h2 className="text-5xl md:text-6xl font-heading text-white mt-3 leading-tight tracking-tight">
              Request an estimate
            </h2>
            <p className="text-concrete-300 mt-4 leading-relaxed text-lg">
              Tell us about your project. We will review your details and get back to you with a preliminary estimate within 2 business days.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-concrete-300">
                <Icon name="phone" className="w-5 h-5 text-amber-accent shrink-0" />
                <span className="text-sm">{siteInfo.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-concrete-300">
                <Icon name="mail" className="w-5 h-5 text-amber-accent shrink-0" />
                <span className="text-sm">{siteInfo.email}</span>
              </div>
              <div className="flex items-center gap-3 text-concrete-300">
                <Icon name="location" className="w-5 h-5 text-amber-accent shrink-0" />
                <span className="text-sm">{siteInfo.address}</span>
              </div>
            </div>
          </div>

          <ScrollReveal>
            <form onSubmit={handleSubmit} className="bg-steel-800 border border-concrete-700/50 p-8 rounded-sm">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-concrete-400 font-semibold mb-1">Name</label>
                  <input type="text" required className="w-full border border-concrete-700 bg-steel-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-amber-accent transition-colors rounded-sm placeholder-concrete-500" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-concrete-400 font-semibold mb-1">Email</label>
                  <input type="email" required className="w-full border border-concrete-700 bg-steel-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-amber-accent transition-colors rounded-sm placeholder-concrete-500" placeholder="your@email.com" />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-xs uppercase tracking-wider text-concrete-400 font-semibold mb-1">Phone</label>
                <input type="tel" required className="w-full border border-concrete-700 bg-steel-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-amber-accent transition-colors rounded-sm placeholder-concrete-500" placeholder="(312) 555-0000" />
              </div>
              <div className="mt-4">
                <label className="block text-xs uppercase tracking-wider text-concrete-400 font-semibold mb-1">Project Type</label>
                <select className="w-full border border-concrete-700 bg-steel-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-amber-accent transition-colors rounded-sm">
                  <option className="text-white bg-steel-700">Commercial Fit-Out</option>
                  <option className="text-white bg-steel-700">Residential Construction</option>
                  <option className="text-white bg-steel-700">Renovation / Retrofit</option>
                  <option className="text-white bg-steel-700">Structural Works</option>
                  <option className="text-white bg-steel-700">Other</option>
                </select>
              </div>
              <div className="mt-4">
                <label className="block text-xs uppercase tracking-wider text-concrete-400 font-semibold mb-1">Project Details</label>
                <textarea rows={4} required className="w-full border border-concrete-700 bg-steel-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-amber-accent transition-colors rounded-sm placeholder-concrete-500" placeholder="Describe your project scope, location, and timeline..." />
              </div>
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="mt-6 w-full bg-amber-accent hover:bg-amber-dark text-white py-4 font-bold text-sm tracking-wide uppercase transition-colors rounded-sm"
              >
                {submitted ? <span className="flex items-center justify-center gap-2"><Icon name="checkmark" className="w-4 h-4" /> Estimate Requested</span> : 'Submit Estimate Request'}
              </motion.button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </Section>
  )
}

function Footer() {
  return (
    <footer className="bg-steel-800 text-concrete-400 px-6 md:px-12 lg:px-24 py-12 border-t border-concrete-700/30">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-amber-accent rounded-sm flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-steel-900">
              <path d="M12 3a7 7 0 00-7 7v2h14v-2a7 7 0 00-7-7z"/><path d="M5 12v3a4 4 0 004 4h6a4 4 0 004-4v-3"/><path d="M9 19v-2a3 3 0 013-3v0a3 3 0 013 3v2"/>
            </svg>
          </div>
          <span className="text-white font-heading tracking-tight">ForgeBuilt</span>
        </div>
        <div className="text-xs text-center md:text-left">
          &copy; {new Date().getFullYear()} {siteInfo.name}. {siteInfo.license}. All rights reserved.
        </div>
        <div className="flex gap-4 text-xs">
          <span className="hover:text-white transition-colors cursor-pointer">Privacy</span>
          <span className="hover:text-white transition-colors cursor-pointer">Terms</span>
          <span className="hover:text-white transition-colors cursor-pointer">Sitemap</span>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="font-body bg-concrete-50 text-steel-900 antialiased overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Work />
        <Services />
        <Process />
        <Team />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
