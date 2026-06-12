import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { siteInfo, stats, capabilities, preConServices, safetyPoints, featuredProjects, processPhases, navLinks } from './data'

/* ──────────────────────────────────────────────────────────
   SteelSpan Commercial Builders — Corporate Precision
   Palette: Navy #0F1B2D | Steel #475569 | White #FFFFFF | Electric Blue #2563EB
   ────────────────────────────────────────────────────────── */

/* ── SVG Icon System (viewBox 0 0 24 24, stroke-based) ── */

const Icon = {
  Building: (p: { className?: string }) => (
    <svg className={p.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="1" /><line x1="9" y1="6" x2="9" y2="6.01" /><line x1="15" y1="6" x2="15" y2="6.01" /><line x1="9" y1="10" x2="9" y2="10.01" /><line x1="15" y1="10" x2="15" y2="10.01" /><line x1="9" y1="14" x2="9" y2="14.01" /><line x1="15" y1="14" x2="15" y2="14.01" /><line x1="9" y1="18" x2="15" y2="18" />
    </svg>
  ),
  Blueprint: (p: { className?: string }) => (
    <svg className={p.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="8" y1="13" x2="16" y2="13" /><line x1="8" y1="17" x2="16" y2="17" /><line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  ),
  Chart: (p: { className?: string }) => (
    <svg className={p.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  Target: (p: { className?: string }) => (
    <svg className={p.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  ),
  Clock: (p: { className?: string }) => (
    <svg className={p.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Dollar: (p: { className?: string }) => (
    <svg className={p.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  Shield: (p: { className?: string }) => (
    <svg className={p.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  Clipboard: (p: { className?: string }) => (
    <svg className={p.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    </svg>
  ),
  Menu: (p: { className?: string }) => (
    <svg className={p.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
  X: (p: { className?: string }) => (
    <svg className={p.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  ArrowRight: (p: { className?: string }) => (
    <svg className={p.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  Check: (p: { className?: string }) => (
    <svg className={p.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Phone: (p: { className?: string }) => (
    <svg className={p.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  Mail: (p: { className?: string }) => (
    <svg className={p.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  Pin: (p: { className?: string }) => (
    <svg className={p.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Crosshair: (p: { className?: string }) => (
    <svg className={p.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="22" y1="12" x2="18" y2="12" /><line x1="6" y1="12" x2="2" y2="12" /><line x1="12" y1="6" x2="12" y2="2" /><line x1="12" y1="22" x2="12" y2="18" />
    </svg>
  ),
  Layers: (p: { className?: string }) => (
    <svg className={p.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  Eye: (p: { className?: string }) => (
    <svg className={p.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Zap: (p: { className?: string }) => (
    <svg className={p.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Compass: (p: { className?: string }) => (
    <svg className={p.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
}

const capabilityIcons = [Icon.Building, Icon.Blueprint, Icon.Chart, Icon.Target, Icon.Clock, Icon.Dollar]
const safetyIcons = [Icon.Shield, Icon.Eye, Icon.Crosshair, Icon.Clipboard]

/* ── Blueprint Grid Pattern (SVG background) ── */

function BlueprintGrid() {
  return (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="bp-sm" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(37,99,235,0.08)" strokeWidth="0.5" />
        </pattern>
        <pattern id="bp-lg" width="100" height="100" patternUnits="userSpaceOnUse">
          <rect width="100" height="100" fill="url(#bp-sm)" />
          <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(37,99,235,0.15)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bp-lg)" />
    </svg>
  )
}

/* ── Animated Counter ── */

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const num = parseInt(value.replace(/[^\d]/g, ''))
  const suffix = value.replace(/[\d]/g, '')
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    let current = 0
    const duration = 1800
    const steps = 50
    const increment = num / steps
    const interval = setInterval(() => {
      current += increment
      if (current >= num) {
        setDisplay(num)
        clearInterval(interval)
      } else {
        setDisplay(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(interval)
  }, [inView, num])

  return <span ref={ref}>{display}{suffix}</span>
}

/* ── Reveal Wrapper ── */

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ── Navigation ── */

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0F1B2D]/98 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-baseline gap-1.5 group">
            <span className="font-mono text-lg tracking-tight text-white font-bold">STEELSPAN</span>
            <span className="hidden sm:inline text-[10px] text-[#2563EB] font-mono tracking-[0.2em] uppercase border-l border-[#2563EB]/30 pl-1.5">COMMERCIAL</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-[11px] text-white/60 hover:text-white font-mono uppercase tracking-[0.15em] transition-colors duration-200">
                {l.label}
              </a>
            ))}
            <a href="#contact" className="text-[11px] font-mono uppercase tracking-[0.15em] text-[#0F1B2D] bg-[#2563EB] px-5 py-2 hover:bg-blue-400 transition-colors">
              Request Proposal
            </a>
          </div>

          {/* Mobile Toggle */}
          <button className="lg:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <Icon.X className="w-5 h-5 text-white" /> : <Icon.Menu className="w-5 h-5 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0F1B2D] border-t border-white/5"
          >
            <div className="px-5 py-5 space-y-3">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="block text-sm text-white/70 font-mono uppercase tracking-wider hover:text-[#2563EB] transition-colors">
                  {l.label}
                </a>
              ))}
              <a href="#contact" onClick={() => setMenuOpen(false)} className="block bg-[#2563EB] text-white text-sm font-mono uppercase tracking-wider text-center py-3 mt-4">
                Request Proposal
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

/* ── Hero Section ── */

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-[#0F1B2D] overflow-hidden">
      {/* Blueprint Grid Background */}
      <BlueprintGrid />

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F1B2D]/40 via-transparent to-[#0F1B2D]" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0F1B2D] to-transparent" />

      {/* Corner technical annotations */}
      <div className="absolute top-24 left-5 sm:left-8 font-mono text-[10px] text-[#2563EB]/40 tracking-wider hidden sm:block">
        <div>DWG NO. SS-2024-001</div>
        <div>SCALE: NTS</div>
        <div>REV: 03</div>
      </div>
      <div className="absolute top-24 right-5 sm:right-8 font-mono text-[10px] text-[#2563EB]/40 tracking-wider text-right hidden sm:block">
        <div>PROJECT: STEELSPAN HQ</div>
        <div>DATE: 2024.06</div>
        <div>SHEET 1 OF 1</div>
      </div>

      {/* Content */}
      <div className="relative w-full max-w-7xl mx-auto px-5 sm:px-8 pt-24 pb-16">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-8"
          >
            <div className="w-8 h-px bg-[#2563EB]" />
            <span className="font-mono text-[11px] text-[#2563EB] uppercase tracking-[0.25em]">{siteInfo.shortTagline}</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] text-white font-light leading-[1.05] tracking-tight mb-6"
          >
            Precision-built<br />
            <span className="text-[#2563EB] font-normal">commercial</span> construction
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-base sm:text-lg text-white/50 max-w-xl leading-relaxed mb-10 font-light"
          >
            {siteInfo.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap gap-4"
          >
            <a href="#capabilities" className="group inline-flex items-center gap-3 bg-[#2563EB] text-white px-7 py-3.5 font-mono text-xs uppercase tracking-[0.15em] hover:bg-blue-500 transition-colors">
              View Capabilities
              <Icon.ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#contact" className="inline-flex items-center gap-3 border border-white/20 text-white/80 px-7 py-3.5 font-mono text-xs uppercase tracking-[0.15em] hover:border-[#2563EB] hover:text-white transition-all">
              Submit RFP
            </a>
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-16 lg:mt-20 grid grid-cols-3 gap-px bg-white/5 max-w-2xl"
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-[#0F1B2D] p-5 sm:p-6">
              <div className="font-mono text-2xl sm:text-3xl lg:text-4xl text-white font-light">
                <CountUp value={s.value} />
              </div>
              <div className="text-[10px] sm:text-[11px] text-white/40 font-mono uppercase tracking-[0.15em] mt-1.5">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom border accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2563EB]/30 to-transparent" />
    </section>
  )
}

/* ── Capabilities Section ── */

function Capabilities() {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <section id="capabilities" className="py-24 lg:py-32 bg-white relative">
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#475569]/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <Reveal>
          <div className="flex items-start justify-between flex-wrap gap-4 mb-14">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-px bg-[#2563EB]" />
                <span className="font-mono text-[11px] text-[#2563EB] uppercase tracking-[0.2em]">01 — Services</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0F1B2D] font-light tracking-tight">
                Core Capabilities
              </h2>
            </div>
            <p className="text-sm text-[#475569] max-w-sm leading-relaxed">
              Integrated construction services from concept through close-out. Each discipline operates under unified project controls.
            </p>
          </div>
        </Reveal>

        {/* Capability Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#475569]/10">
          {capabilities.map((c, i) => {
            const IconComp = capabilityIcons[i]
            const isExpanded = expanded === i
            return (
              <Reveal key={c.title} delay={i * 0.06}>
                <div
                  className={`bg-white p-7 lg:p-8 h-full cursor-pointer transition-all duration-300 group relative ${isExpanded ? 'ring-1 ring-[#2563EB]/30' : 'hover:bg-[#f8fafc]'}`}
                  onClick={() => setExpanded(isExpanded ? null : i)}
                >
                  {/* Top accent line */}
                  <div className={`absolute top-0 left-0 right-0 h-[2px] transition-all duration-300 ${isExpanded ? 'bg-[#2563EB]' : 'bg-transparent group-hover:bg-[#2563EB]/30'}`} />

                  {/* Icon + Number */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 border border-[#475569]/20 flex items-center justify-center text-[#475569] group-hover:border-[#2563EB]/40 group-hover:text-[#2563EB] transition-colors">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[10px] text-[#475569]/40 tracking-wider">{String(i + 1).padStart(2, '0')}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base text-[#0F1B2D] font-medium mb-3 tracking-tight">{c.title}</h3>

                  {/* Description */}
                  <p className={`text-[13px] text-[#475569] leading-relaxed transition-all duration-300 ${isExpanded ? '' : 'line-clamp-3'}`}>
                    {c.description}
                  </p>

                  {/* Expand indicator */}
                  <div className="mt-4 flex items-center gap-1.5">
                    <div className={`w-3 h-px transition-colors ${isExpanded ? 'bg-[#2563EB]' : 'bg-[#475569]/30'}`} />
                    <span className="font-mono text-[9px] text-[#475569]/50 uppercase tracking-wider">
                      {isExpanded ? 'Collapse' : 'Details'}
                    </span>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ── Featured Projects ── */

function FeaturedProjects() {
  return (
    <section id="projects" className="py-24 lg:py-32 bg-[#f8fafc] relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <Reveal>
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-px bg-[#2563EB]" />
              <span className="font-mono text-[11px] text-[#2563EB] uppercase tracking-[0.2em]">02 — Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0F1B2D] font-light tracking-tight">
              Featured Case Studies
            </h2>
          </div>
        </Reveal>

        {/* Project Cards */}
        <div className="grid lg:grid-cols-3 gap-6">
          {featuredProjects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <div className="group bg-white border border-[#475569]/10 overflow-hidden hover:border-[#2563EB]/20 transition-all duration-300 h-full flex flex-col">
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Overlay stats */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1B2D]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                    {p.stats.map((s) => (
                      <div key={s.label} className="bg-[#0F1B2D]/80 backdrop-blur-sm border border-white/10 px-2.5 py-1">
                        <div className="font-mono text-[11px] text-white font-medium">{s.value}</div>
                        <div className="font-mono text-[8px] text-white/50 uppercase tracking-wider">{s.label}</div>
                      </div>
                    ))}
                  </div>
                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <span className="font-mono text-[9px] text-white bg-[#2563EB] px-2 py-1 uppercase tracking-wider">{p.category}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon.Pin className="w-3 h-3 text-[#475569]/50" />
                    <span className="font-mono text-[10px] text-[#475569]/60 uppercase tracking-wider">{p.location}</span>
                  </div>
                  <h3 className="text-lg text-[#0F1B2D] font-medium tracking-tight mb-3">{p.title}</h3>
                  <p className="text-[13px] text-[#475569] leading-relaxed flex-1">{p.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Pre-Construction Services ── */

function PreConstruction() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="precon" className="py-24 lg:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16">
          {/* Left: Header */}
          <div className="lg:col-span-4 mb-12 lg:mb-0">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-6 h-px bg-[#2563EB]" />
                  <span className="font-mono text-[11px] text-[#2563EB] uppercase tracking-[0.2em]">03 — Pre-Con</span>
                </div>
                <h2 className="text-3xl sm:text-4xl text-[#0F1B2D] font-light tracking-tight mb-4">
                  Pre-Construction Services
                </h2>
                <p className="text-sm text-[#475569] leading-relaxed">
                  Value is created before ground breaks. Our pre-construction team identifies savings, mitigates risk, and builds the framework for on-time delivery.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right: Accordion Items */}
          <div className="lg:col-span-8">
            <div className="divide-y divide-[#475569]/10">
              {preConServices.map((s, i) => {
                const isOpen = openIndex === i
                return (
                  <Reveal key={s.title} delay={i * 0.08}>
                    <div className="group">
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : i)}
                        className="w-full flex items-center gap-5 py-6 text-left"
                      >
                        <span className="font-mono text-xs text-[#2563EB] w-6">{String(i + 1).padStart(2, '0')}</span>
                        <span className="flex-1 text-base text-[#0F1B2D] font-medium tracking-tight">{s.title}</span>
                        <div className={`w-6 h-6 border border-[#475569]/20 flex items-center justify-center transition-all duration-300 ${isOpen ? 'border-[#2563EB] bg-[#2563EB] rotate-45' : 'group-hover:border-[#2563EB]/50'}`}>
                          <svg className={`w-3 h-3 transition-colors ${isOpen ? 'text-white' : 'text-[#475569]/50'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        </div>
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-11 pb-6">
                              <p className="text-[13px] text-[#475569] leading-relaxed max-w-lg">{s.description}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Safety Section ── */

function Safety() {
  return (
    <section id="safety" className="py-24 lg:py-32 bg-[#0F1B2D] relative overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(255,255,255,0.5) 50px, rgba(255,255,255,0.5) 51px), repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(255,255,255,0.5) 50px, rgba(255,255,255,0.5) 51px)' }} />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <Reveal>
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-px bg-[#2563EB]" />
              <span className="font-mono text-[11px] text-[#2563EB] uppercase tracking-[0.2em]">04 — Safety</span>
            </div>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white font-light tracking-tight">
                Safety Standards
              </h2>
              <div className="inline-flex items-center gap-2 border border-[#2563EB]/30 px-4 py-2">
                <Icon.Check className="w-3.5 h-3.5 text-[#2563EB]" />
                <span className="font-mono text-[10px] text-[#2563EB] uppercase tracking-[0.15em]">{siteInfo.safetyRating}</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Safety Badge Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {safetyPoints.map((s, i) => {
            const SafetyIcon = safetyIcons[i]
            return (
              <Reveal key={s.title} delay={i * 0.08}>
                <div className="border border-white/5 bg-white/[0.02] p-6 h-full hover:border-[#2563EB]/20 hover:bg-white/[0.04] transition-all duration-300 group">
                  <div className="w-10 h-10 border border-[#2563EB]/20 flex items-center justify-center mb-5 text-[#2563EB] group-hover:bg-[#2563EB]/10 transition-colors">
                    <SafetyIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm text-white font-medium mb-2 tracking-tight">{s.title}</h3>
                  <p className="text-[12px] text-white/40 leading-relaxed">{s.description}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ── Process Stepper ── */

function Process() {
  return (
    <section id="process" className="py-24 lg:py-32 bg-[#f8fafc] relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <Reveal>
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-px bg-[#2563EB]" />
              <span className="font-mono text-[11px] text-[#2563EB] uppercase tracking-[0.2em]">05 — Process</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0F1B2D] font-light tracking-tight">
              Delivery Method
            </h2>
          </div>
        </Reveal>

        {/* Horizontal Stepper - Desktop */}
        <div className="hidden lg:block">
          {/* Connecting line */}
          <div className="relative mb-8">
            <div className="absolute top-1/2 left-[8%] right-[8%] h-px bg-[#475569]/15 -translate-y-1/2" />
            <div className="grid grid-cols-6 gap-4 relative">
              {processPhases.map((p, i) => (
                <Reveal key={p.phase} delay={i * 0.1}>
                  <div className="flex flex-col items-center text-center">
                    {/* Node */}
                    <div className="w-10 h-10 border border-[#2563EB]/30 bg-white flex items-center justify-center font-mono text-xs text-[#2563EB] relative z-10 group-hover:border-[#2563EB] transition-colors">
                      {p.phase}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Phase Cards */}
          <div className="grid grid-cols-6 gap-4">
            {processPhases.map((p, i) => (
              <Reveal key={p.phase} delay={i * 0.1 + 0.05}>
                <div className="text-center group">
                  <h3 className="text-[13px] text-[#0F1B2D] font-medium mb-2 tracking-tight">{p.title}</h3>
                  <p className="text-[11px] text-[#475569] leading-relaxed">{p.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet: Vertical list */}
        <div className="lg:hidden space-y-0">
          {processPhases.map((p, i) => (
            <Reveal key={p.phase} delay={i * 0.06}>
              <div className="flex gap-5 py-5 border-b border-[#475569]/10 last:border-0">
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 border border-[#2563EB]/30 flex items-center justify-center font-mono text-[11px] text-[#2563EB]">
                    {p.phase}
                  </div>
                  {i < processPhases.length - 1 && <div className="w-px flex-1 bg-[#475569]/10 mt-2" />}
                </div>
                <div className="pb-2">
                  <h3 className="text-sm text-[#0F1B2D] font-medium mb-1">{p.title}</h3>
                  <p className="text-[12px] text-[#475569] leading-relaxed">{p.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── CTA Section ── */

function CallToAction() {
  return (
    <section id="contact" className="py-24 lg:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="bg-[#0F1B2D] p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          {/* Blueprint grid in CTA */}
          <div className="absolute inset-0 opacity-[0.04]">
            <BlueprintGrid />
          </div>

          <div className="relative lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left: Copy */}
            <Reveal>
              <div className="mb-10 lg:mb-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-px bg-[#2563EB]" />
                  <span className="font-mono text-[11px] text-[#2563EB] uppercase tracking-[0.2em]">Start a Project</span>
                </div>
                <h2 className="text-3xl sm:text-4xl text-white font-light tracking-tight mb-4">
                  Ready to build?
                </h2>
                <p className="text-sm text-white/50 leading-relaxed max-w-md">
                  Submit your project details and our pre-construction team will respond within one business day with a preliminary scope assessment.
                </p>
              </div>
            </Reveal>

            {/* Right: Contact Info + CTAs */}
            <Reveal delay={0.1}>
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <a href={`tel:${siteInfo.phone}`} className="flex items-center gap-3 border border-white/10 p-4 hover:border-[#2563EB]/30 transition-colors group">
                    <Icon.Phone className="w-4 h-4 text-[#2563EB]" />
                    <div>
                      <div className="font-mono text-[9px] text-white/40 uppercase tracking-wider">Direct Line</div>
                      <div className="font-mono text-sm text-white">{siteInfo.phone}</div>
                    </div>
                  </a>
                  <a href={`mailto:${siteInfo.email}`} className="flex items-center gap-3 border border-white/10 p-4 hover:border-[#2563EB]/30 transition-colors group">
                    <Icon.Mail className="w-4 h-4 text-[#2563EB]" />
                    <div>
                      <div className="font-mono text-[9px] text-white/40 uppercase tracking-wider">Email</div>
                      <div className="font-mono text-sm text-white truncate">{siteInfo.email}</div>
                    </div>
                  </a>
                </div>

                <div className="flex items-start gap-3 border border-white/10 p-4">
                  <Icon.Pin className="w-4 h-4 text-[#2563EB] mt-0.5 shrink-0" />
                  <div>
                    <div className="font-mono text-[9px] text-white/40 uppercase tracking-wider">Office</div>
                    <div className="font-mono text-sm text-white">{siteInfo.address}</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <a href={`mailto:${siteInfo.email}`} className="inline-flex items-center gap-2 bg-[#2563EB] text-white px-6 py-3 font-mono text-[11px] uppercase tracking-[0.15em] hover:bg-blue-500 transition-colors">
                    Request Proposal
                    <Icon.ArrowRight className="w-3 h-3" />
                  </a>
                  <a href={`tel:${siteInfo.phone}`} className="inline-flex items-center gap-2 border border-white/20 text-white/80 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.15em] hover:border-white/40 transition-colors">
                    Call Now
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Footer ── */

function Footer() {
  return (
    <footer className="bg-[#0F1B2D] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 lg:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="font-mono text-base text-white font-bold tracking-tight mb-2">STEELSPAN</div>
            <div className="font-mono text-[10px] text-[#2563EB] uppercase tracking-[0.2em] mb-4">Commercial Builders</div>
            <p className="text-[12px] text-white/40 leading-relaxed max-w-xs">
              Licensed general contractor serving the greater Chicago metropolitan area. Commercial, industrial, and institutional construction.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div className="font-mono text-[10px] text-white/30 uppercase tracking-[0.2em] mb-4">Navigation</div>
            <div className="space-y-2.5">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} className="block text-[12px] text-white/50 hover:text-white transition-colors">
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <div className="font-mono text-[10px] text-white/30 uppercase tracking-[0.2em] mb-4">Services</div>
            <div className="space-y-2.5">
              {capabilities.slice(0, 5).map((c) => (
                <div key={c.title} className="text-[12px] text-white/50">{c.title}</div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="font-mono text-[10px] text-white/30 uppercase tracking-[0.2em] mb-4">Contact</div>
            <div className="space-y-3">
              <div className="text-[12px] text-white/50">{siteInfo.address}</div>
              <a href={`tel:${siteInfo.phone}`} className="block text-[12px] text-white/50 hover:text-white transition-colors font-mono">{siteInfo.phone}</a>
              <a href={`mailto:${siteInfo.email}`} className="block text-[12px] text-white/50 hover:text-white transition-colors font-mono">{siteInfo.email}</a>
            </div>
            <div className="mt-5 pt-4 border-t border-white/5">
              <div className="font-mono text-[9px] text-white/25 uppercase tracking-wider">License: {siteInfo.license}</div>
              <div className="font-mono text-[9px] text-white/25 uppercase tracking-wider mt-1">Rating: {siteInfo.safetyRating}</div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
          <div className="font-mono text-[10px] text-white/25">
            &copy; {new Date().getFullYear()} {siteInfo.name}. All rights reserved.
          </div>
          <div className="font-mono text-[10px] text-white/25">
            Chicago, IL — Est. 1997
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ── Main App ── */

export default function App() {
  return (
    <div className="min-h-screen bg-white antialiased">
      <Navbar />
      <Hero />
      <Capabilities />
      <FeaturedProjects />
      <PreConstruction />
      <Safety />
      <Process />
      <CallToAction />
      <Footer />
    </div>
  )
}
