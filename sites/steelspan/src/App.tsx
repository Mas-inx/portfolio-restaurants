import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import {
  siteInfo,
  capabilities,
  projectStats,
  featuredProjects,
  preConstructionServices,
  safetyPoints,
  processPhases,
  navLinks,
} from './data'

/* ── SVG Icon Library ── */

const IconHelmet = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 3a7 7 0 00-7 7v2h14v-2a7 7 0 00-7-7z"/><path d="M5 12v3a4 4 0 004 4h6a4 4 0 004-4v-3"/><path d="M9 19v-2a3 3 0 013-3v0a3 3 0 013 3v2"/>
  </svg>
)

const IconBuilding = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="4" y="2" width="16" height="20" rx="1"/><path d="M9 6h2"/><path d="M13 6h2"/><path d="M9 10h2"/><path d="M13 10h2"/><path d="M9 14h2"/><path d="M13 14h2"/><path d="M9 18h2"/><path d="M13 18h2"/>
  </svg>
)

const IconWrench = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
  </svg>
)

const IconStore = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 3h18v4H3z"/><path d="M4 7v11a2 2 0 002 2h12a2 2 0 002-2V7"/><path d="M10 21v-7h4v7"/>
  </svg>
)

const IconTruck = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="1" y="3" width="15" height="13"/><rect x="16" y="5" width="7" height="11" rx="1"/><path d="M16 16h-3"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
)

const IconBlueprint = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 3h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1z"/><path d="M8 7h8"/><path d="M8 11h8"/><path d="M8 15h5"/><path d="M16 15h.01"/>
  </svg>
)

const IconCalendar = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18"/><path d="M8 2v4"/><path d="M16 2v4"/><path d="M12 14h.01"/>
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

/* ── Icon Resolver ── */
const icons: Record<string, React.FC<{className?:string}>> = {
  'helmet': IconHelmet, 'building': IconBuilding, 'wrench': IconWrench,
  'store': IconStore, 'truck': IconTruck, 'blueprint': IconBlueprint,
  'calendar': IconCalendar, 'location': IconLocation, 'phone': IconPhone,
  'mail': IconMail, 'checkmark': IconCheckmark, 'shield': IconShield,
  'arrow-right': IconArrowRight, 'star': IconStar,
}

function Icon({ name, className = 'w-6 h-6' }: { name: string; className?: string }) {
  const C = icons[name] || IconBuilding
  return <C className={className} />
}

/* ── Scroll Reveal ── */
function ScrollReveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* ── Section Heading ── */
function SectionHeading({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-16">
      <span className="text-xs font-bold tracking-[0.2em] uppercase text-yellow-500">{label}</span>
      <h2 className="text-4xl md:text-5xl font-heading text-[#1a1f2e] mt-3 leading-tight">{title}</h2>
      {subtitle && <p className="text-[#3b4a6b]/60 mt-4 max-w-2xl mx-auto text-lg">{subtitle}</p>}
    </div>
  )
}

/* ── Blueprint Grid Background ── */
function BlueprintGrid() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <pattern id="steel-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#3b4a6b" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#steel-grid)" />
    </svg>
  )
}

/* ── Navbar ── */
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
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-20">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#1a1f2e] rounded flex items-center justify-center">
            <Icon name="helmet" className="w-5 h-5 text-yellow-400" />
          </div>
          <div className="hidden sm:block text-left">
            <span className="text-lg font-heading tracking-tight text-[#1a1f2e] block leading-none">SteelSpan</span>
            <span className="text-[10px] uppercase tracking-[0.15em] text-[#3b4a6b] font-medium">Commercial Builders</span>
          </div>
        </button>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((l) => (
            <button key={l.href} onClick={() => scrollTo(l.href)} className="text-sm font-semibold text-[#3b4a6b]/80 hover:text-[#1a1f2e] transition-colors tracking-wide uppercase">
              {l.label}
            </button>
          ))}
          <button onClick={() => scrollTo('#contact')} className="bg-[#1a1f2e] text-white px-5 py-2.5 text-sm font-bold tracking-wide hover:bg-black transition-colors rounded-sm">
            Bid Your Project
          </button>
        </div>

        <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
          <div className={`w-6 h-0.5 bg-[#1a1f2e] mb-1.5 transition-all ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-6 h-0.5 bg-[#1a1f2e] mb-1.5 transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-0.5 bg-[#1a1f2e] transition-all ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-white border-t border-[#3b4a6b]/10 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((l) => (
                <button key={l.href} onClick={() => scrollTo(l.href)} className="text-sm font-semibold text-[#1a1f2e] text-left uppercase tracking-wide">
                  {l.label}
                </button>
              ))}
              <button onClick={() => scrollTo('#contact')} className="bg-[#1a1f2e] text-white px-5 py-3 text-sm font-bold tracking-wide text-center rounded-sm">
                Bid Your Project
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

/* ── Hero ── */
function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} className="relative h-screen min-h-[600px] flex items-center bg-[#1a1f2e] overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f2e]/95 via-[#1a1f2e]/80 to-[#1a1f2e]/95 z-10" />
        <img
          src="https://images.unsplash.com/photo-1541888946425-d81bb2c88ea5?w=1600&q=85"
          alt="Commercial construction site"
          className="w-full h-full object-cover"
        />
      </motion.div>
      <BlueprintGrid />

      <motion.div style={{ opacity }} className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <span className="text-yellow-400 text-sm font-bold tracking-[0.25em] uppercase">
              {siteInfo.shortTagline}
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-4xl sm:text-6xl md:text-7xl font-heading text-white leading-[1.05] mt-4"
          >
            Commercial construction built around
            <span className="block text-yellow-400 mt-2">schedule, safety, and accountability</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-[#9ea8c0] text-lg mt-6 max-w-xl leading-relaxed"
          >
            Ground-up construction, tenant improvements, and industrial facilities — delivered with the precision
            that 4.2 million square feet of experience earns.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-wrap gap-4 mt-8"
          >
            <a href="#contact" className="bg-yellow-400 text-[#1a1f2e] px-8 py-4 font-bold text-sm uppercase tracking-wide hover:bg-yellow-300 transition-colors rounded-sm">
              Submit RFP
            </a>
            <a href="#projects" className="border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 font-semibold text-sm uppercase tracking-wide transition-colors rounded-sm">
              View Projects
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="flex gap-8 mt-16 text-[#9ea8c0]"
          >
            <div><span className="text-white text-2xl font-heading block">{siteInfo.yearsExperience}yr</span><span className="text-[10px] uppercase tracking-widest">Experience</span></div>
            <div><span className="text-white text-2xl font-heading block">{siteInfo.squareFeetBuilt}</span><span className="text-[10px] uppercase tracking-widest">Built</span></div>
            <div><span className="text-white text-2xl font-heading block">{siteInfo.activeCrews}</span><span className="text-[10px] uppercase tracking-widest">Crew Members</span></div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-white/40 text-xs uppercase tracking-[0.2em]">
          Scroll
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ── Animated Counter ── */
function AnimatedCounter({ value, suffix = '' }: { value: string; suffix?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const num = parseFloat(value.replace(/[^0-9.]/g, ''))
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const duration = 1500
    const step = Math.max(1, Math.floor(num / 60))
    const interval = setInterval(() => {
      start += step
      if (start >= num) {
        setDisplay(num)
        clearInterval(interval)
      } else {
        setDisplay(start)
      }
    }, duration / 60)
    return () => clearInterval(interval)
  }, [isInView, num])

  return <span ref={ref}>{display}{suffix}</span>
}

/* ── Capabilities ── */
function Capabilities() {
  return (
    <section id="capabilities" className="relative px-6 md:px-12 lg:px-24 py-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="Capabilities"
          title="What we deliver"
          subtitle="Full-spectrum commercial construction services — from pre-construction planning through final handover."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((c, i) => (
            <ScrollReveal key={c.title} delay={i * 0.08}>
              <div className="group border border-[#3b4a6b]/20 p-6 hover:border-yellow-400 hover:bg-[#1a1f2e] transition-all duration-300 rounded-sm">
                <div className="flex items-start justify-between mb-3">
                  <Icon name={c.icon} className="w-7 h-7 text-[#1a1f2e] group-hover:text-yellow-400 group-hover:scale-110 transition-all" />
                  <span className="text-xs font-mono font-bold text-yellow-500 bg-yellow-50 group-hover:bg-yellow-500/20 px-2 py-1 rounded-sm">{c.stat}</span>
                </div>
                <h3 className="text-lg font-heading text-[#1a1f2e] group-hover:text-white transition-colors">{c.title}</h3>
                <p className="text-[#3b4a6b]/60 text-sm mt-2 leading-relaxed group-hover:text-[#9ea8c0] transition-colors">{c.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Stats / Numbers ── */
function Numbers() {
  const ref = useRef(null)

  return (
    <section id="numbers" className="relative px-6 md:px-12 lg:px-24 py-24 bg-[#1a1f2e] overflow-hidden">
      <BlueprintGrid />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-yellow-400">By the Numbers</span>
          <h2 className="text-4xl md:text-5xl font-heading text-white mt-3 leading-tight">
            Hard data on hard work
          </h2>
          <p className="text-[#9ea8c0] mt-4 text-lg max-w-2xl mx-auto">
            Not claims — numbers. Every square foot, every project, every year.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {projectStats.map((s, i) => (
            <ScrollReveal key={s.label} delay={i * 0.08}>
              <div className="text-center p-4 border border-white/10 rounded-sm hover:border-yellow-400/30 transition-colors">
                <div className="text-3xl md:text-4xl font-heading text-yellow-400 font-bold">
                  <AnimatedCounter value={s.value} />
                </div>
                <div className="text-[#9ea8c0] text-xs uppercase tracking-widest mt-2 leading-tight">{s.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Pre-Construction ── */
function PreConstruction() {
  return (
    <section id="precon" className="relative px-6 md:px-12 lg:px-24 py-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-yellow-500">Pre-Construction</span>
              <h2 className="text-4xl md:text-5xl font-heading text-[#1a1f2e] mt-3 leading-tight">
                We build on paper<span className="block text-[#3b4a6b]">before we build on site</span>
              </h2>
              <p className="text-[#3b4a6b]/60 mt-6 leading-relaxed text-lg">
                The decisions made before ground-breaking determine a project's success more than anything that happens
                after. Our pre-construction team catches issues, finds savings, and builds a roadmap.
              </p>
              <div className="mt-8 space-y-5">
                {preConstructionServices.map((s, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center font-heading text-sm shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1a1f2e] text-sm">{s.title}</h4>
                      <p className="text-[#3b4a6b]/60 text-sm mt-0.5">{s.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="bg-[#f8f9fc] border border-[#3b4a6b]/10 p-8 rounded-sm">
              <h3 className="text-2xl font-heading text-[#1a1f2e] mb-6">Pre-Construction Checklist</h3>
              <div className="space-y-4">
                {['Site evaluation & geotechnical review', 'Zoning & entitlement analysis', 'Structural system comparison', 'Mechanical system selection', 'LEED / sustainability roadmap', 'Permit strategy & jurisdiction mapping', 'Bid package strategy', 'Schedule logic & phasing plan'].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-5 h-5 rounded-full border-2 border-yellow-400 flex items-center justify-center">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                    </div>
                    <span className="text-sm text-[#1a1f2e]">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

/* ── Safety & Compliance ── */
function Safety() {
  return (
    <section id="safety" className="relative px-6 md:px-12 lg:px-24 py-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="Safety & Compliance"
          title="Safety is not a slogan"
          subtitle="It's a system. Written plans, daily documentation, third-party audits, and a culture that starts with every morning toolbox talk."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {safetyPoints.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 0.1}>
              <div className="border border-[#3b4a6b]/15 p-6 hover:border-yellow-400/40 transition-colors rounded-sm">
                <Icon name="shield" className="w-6 h-6 text-yellow-500 mb-3" />
                <h3 className="text-lg font-heading text-[#1a1f2e]">{s.title}</h3>
                <p className="text-[#3b4a6b]/60 text-sm mt-2 leading-relaxed">{s.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <div className="mt-10 bg-yellow-50 border border-yellow-200 p-6 rounded-sm text-center">
          <div className="text-3xl font-heading text-[#1a1f2e]">OSHA VPP Star Rating</div>
          <p className="text-[#3b4a6b]/60 text-sm mt-2">Voluntary Protection Program — the highest OSHA recognition for workplace safety and health.</p>
        </div>
      </div>
    </section>
  )
}

/* ── Featured Projects ── */
function FeaturedProjects() {
  const [active, setActive] = useState(0)
  const project = featuredProjects[active]

  return (
    <section id="projects" className="relative px-6 md:px-12 lg:px-24 py-24 bg-[#f8f9fc]">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="Featured Projects"
          title="Built to spec, on schedule"
          subtitle="A selection of commercial projects that demonstrate our range and capability."
        />

        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {featuredProjects.map((p, i) => (
            <button
              key={p.title}
              onClick={() => setActive(i)}
              className={`px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-all ${
                active === i
                  ? 'bg-[#1a1f2e] text-white'
                  : 'bg-white text-[#3b4a6b] border border-[#3b4a6b]/20 hover:border-[#1a1f2e]'
              }`}
            >
              {p.title}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-5 gap-8 items-start"
          >
            <div className="md:col-span-3">
              <div className="overflow-hidden rounded-sm">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-72 md:h-96 object-cover"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-yellow-500">{project.category}</span>
              <h3 className="text-2xl md:text-3xl font-heading text-[#1a1f2e] mt-2">{project.title}</h3>
              <p className="text-[#3b4a6b]/60 mt-4 text-sm leading-relaxed">{project.description}</p>
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="bg-white border border-[#3b4a6b]/10 p-3 rounded-sm">
                  <div className="text-[10px] uppercase tracking-wider text-[#3b4a6b]/50">Location</div>
                  <div className="text-sm font-semibold text-[#1a1f2e]">{project.location}</div>
                </div>
                <div className="bg-white border border-[#3b4a6b]/10 p-3 rounded-sm">
                  <div className="text-[10px] uppercase tracking-wider text-[#3b4a6b]/50">Size</div>
                  <div className="text-sm font-semibold text-[#1a1f2e]">{project.size}</div>
                </div>
                <div className="bg-white border border-[#3b4a6b]/10 p-3 rounded-sm">
                  <div className="text-[10px] uppercase tracking-wider text-[#3b4a6b]/50">Duration</div>
                  <div className="text-sm font-semibold text-[#1a1f2e]">{project.duration}</div>
                </div>
                <div className="bg-white border border-[#3b4a6b]/10 p-3 rounded-sm">
                  <div className="text-[10px] uppercase tracking-wider text-[#3b4a6b]/50">Budget</div>
                  <div className="text-sm font-semibold text-[#1a1f2e]">{project.budget}</div>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.highlights.map((h) => (
                  <span key={h} className="text-[11px] bg-[#1a1f2e] text-white px-3 py-1 rounded-sm font-semibold">{h}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

/* ── Process ── */
function Process() {
  return (
    <section className="relative px-6 md:px-12 lg:px-24 py-24 bg-white">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          label="Process"
          title="How we execute"
          subtitle="From design review to final handover — a structured process that delivers predictable outcomes."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {processPhases.map((p, i) => (
            <ScrollReveal key={p.phase} delay={i * 0.08}>
              <div className="border border-[#3b4a6b]/15 p-5 rounded-sm hover:border-yellow-400/40 hover:bg-[#f8f9fc] transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-bold text-yellow-500 font-mono">{p.phase}</span>
                  <div className="h-px flex-1 bg-[#3b4a6b]/20" />
                </div>
                <h3 className="font-heading text-[#1a1f2e]">{p.title}</h3>
                <p className="text-[#3b4a6b]/60 text-xs mt-1.5 leading-relaxed">{p.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Contact ── */
function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="relative px-6 md:px-12 lg:px-24 py-24 bg-[#1a1f2e]">
      <BlueprintGrid />
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-yellow-400">Contact</span>
          <h2 className="text-4xl md:text-5xl font-heading text-white mt-3 leading-tight">
            Let's bid your next project
          </h2>
          <p className="text-[#9ea8c0] mt-4 text-lg max-w-xl mx-auto">
            Tell us about your commercial project. We'll respond with a preliminary budget and timeline within 3 business days.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-sm bg-white/10 flex items-center justify-center text-yellow-400">
                  <Icon name="phone" className="w-5 h-5" />
                </div>
                <div><div className="text-white font-semibold text-sm">Phone</div><div className="text-[#9ea8c0] text-sm">{siteInfo.phone}</div></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-sm bg-white/10 flex items-center justify-center text-yellow-400">
                  <Icon name="mail" className="w-5 h-5" />
                </div>
                <div><div className="text-white font-semibold text-sm">Email</div><div className="text-[#9ea8c0] text-sm">{siteInfo.email}</div></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-sm bg-white/10 flex items-center justify-center text-yellow-400">
                  <Icon name="location" className="w-5 h-5" />
                </div>
                <div><div className="text-white font-semibold text-sm">Office</div><div className="text-[#9ea8c0] text-sm">{siteInfo.address}</div></div>
              </div>
              <div className="border-t border-white/10 pt-5 mt-5">
                <div className="text-sm text-[#9ea8c0]">
                  <span className="text-yellow-400 font-bold">{siteInfo.license}</span> · Licensed in IL, IN, WI
                </div>
                <div className="text-sm text-[#9ea8c0] mt-1">{siteInfo.safetyRating}</div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Full name" required className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition-colors rounded-sm placeholder-white/30" />
                <input type="email" placeholder="Email address" required className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition-colors rounded-sm placeholder-white/30" />
              </div>
              <input type="tel" placeholder="Phone number" required className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition-colors rounded-sm placeholder-white/30" />
              <select className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition-colors rounded-sm">
                <option value="" className="text-gray-400">Project type</option>
                <option value="ground-up" className="text-gray-900">Ground-Up Construction</option>
                <option value="ti" className="text-gray-900">Tenant Improvement</option>
                <option value="industrial" className="text-gray-900">Industrial / Warehouse</option>
                <option value="retail" className="text-gray-900">Retail Build-Out</option>
                <option value="precon" className="text-gray-900">Pre-Construction Only</option>
                <option value="other" className="text-gray-900">Other</option>
              </select>
              <input type="text" placeholder="Estimated budget range" className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition-colors rounded-sm placeholder-white/30" />
              <textarea rows={3} placeholder="Project description, location, and timeline..." required className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition-colors rounded-sm placeholder-white/30" />
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-[#1a1f2e] py-4 font-bold text-sm tracking-wide uppercase transition-colors rounded-sm"
              >
                {submitted ? <span className="flex items-center justify-center gap-2"><Icon name="checkmark" className="w-4 h-4" /> RFP Submitted</span> : 'Submit RFP'}
              </motion.button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

/* ── Footer ── */
function Footer() {
  return (
    <footer className="bg-[#0d1018] text-[#9ea8c0] px-6 md:px-12 lg:px-24 py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center">
            <Icon name="helmet" className="w-4 h-4 text-[#1a1f2e]" />
          </div>
          <span className="text-white font-heading text-sm">SteelSpan</span>
        </div>
        <div className="text-xs text-center md:text-left">
          &copy; {new Date().getFullYear()} {siteInfo.name}. {siteInfo.license}. All rights reserved.
        </div>
        <div className="flex gap-4 text-xs">
          <span className="hover:text-white transition-colors cursor-pointer">Privacy</span>
          <span className="hover:text-white transition-colors cursor-pointer">Terms</span>
          <span className="hover:text-white transition-colors cursor-pointer">Bonding</span>
        </div>
      </div>
    </footer>
  )
}

/* ── App ── */
export default function App() {
  return (
    <div className="font-body bg-white text-[#1a1f2e] antialiased overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Capabilities />
        <Numbers />
        <PreConstruction />
        <Safety />
        <FeaturedProjects />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
