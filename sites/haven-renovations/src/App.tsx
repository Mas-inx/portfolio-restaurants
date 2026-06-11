import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import {
  siteInfo,
  renovationTypes,
  beforeAfters,
  materialCategories,
  timelineSteps,
  testimonials,
  faqs,
  navLinks,
} from './data'

// ─── Inline SVG Icons ───────────────────────────────────────────────────────

const IconHome = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 9.5L12 3l9 6.5" /><path d="M5 8.5V20a1 1 0 001 1h4v-7h4v7h4a1 1 0 001-1V8.5" />
  </svg>
)
const IconHammer = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 3v4" /><path d="M8 7h8l-1 4H9L8 7z" /><path d="M12 11v10" />
  </svg>
)
const IconWrench = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
  </svg>
)
const IconRuler = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 6h20v12H2z" /><path d="M6 6v12" /><path d="M10 6v12" /><path d="M14 6v12" /><path d="M18 6v12" />
  </svg>
)
const IconUtensils = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2" /><path d="M7 2v20" /><path d="M21 15V2v0a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
  </svg>
)
const IconBath = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 12h16a1 1 0 011 1v3a4 4 0 01-4 4H7a4 4 0 01-4-4v-3a1 1 0 011-1z" /><path d="M6 12V5a2 2 0 012-2v0a2 2 0 012 2v3" /><path d="M18 12V5a2 2 0 00-2-2v0a2 2 0 00-2 2v3" />
  </svg>
)
const IconDown = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
  </svg>
)
const IconPlus = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)
const IconSofa = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 7a2 2 0 012-2h12a2 2 0 012 2v2" /><path d="M4 13h16v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4z" /><path d="M4 13v-4" /><path d="M20 13v-4" />
  </svg>
)
const IconStone = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
  </svg>
)
const IconLight = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 18h6" /><path d="M10 22h4" /><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 008.91 14" />
  </svg>
)
const IconGrid = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
  </svg>
)
const IconPhone = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
)
const IconMail = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 4L12 13 2 4" />
  </svg>
)
const IconLocation = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
)
const IconArrowRight = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
)
const IconChevronDown = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
)
const IconQuote = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
  </svg>
)
const IconLeaf = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M11 20A7 7 0 019.8 6.9C15.5 4.9 20 7.5 20 12c0 3-1.5 5.5-4 7.5" /><path d="M4 20l7-7" />
  </svg>
)

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  home: IconHome, hammer: IconHammer, wrench: IconWrench, ruler: IconRuler,
  utensils: IconUtensils, bath: IconBath, down: IconDown, plus: IconPlus,
  sofa: IconSofa, stone: IconStone, light: IconLight, grid: IconGrid,
  phone: IconPhone, mail: IconMail, location: IconLocation, 'arrow-right': IconArrowRight,
}

function Icon({ name, className = 'w-6 h-6' }: { name: string; className?: string }) {
  const C = iconMap[name] || IconHome
  return <C className={className} />
}

// ─── Utility Components ─────────────────────────────────────────────────────

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ─── Navbar ─────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? 'bg-[#FFFAF5]/95 backdrop-blur-lg shadow-[0_1px_0_rgba(139,115,85,0.1)]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 group">
          <div className="w-11 h-11 bg-[#2D5A27] rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <Icon name="home" className="w-5 h-5 text-[#F5F0E8]" />
          </div>
          <div className="hidden sm:block text-left">
            <span className="text-[17px] font-heading text-[#2D5A27] tracking-tight leading-none block">Haven</span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#8B7355] font-medium">Renovations</span>
          </div>
        </button>

        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="text-[13px] font-medium text-[#8B7355] hover:text-[#2D5A27] transition-colors duration-300 tracking-wide uppercase"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('#contact')}
            className="bg-[#2D5A27] text-[#F5F0E8] px-6 py-2.5 text-[12px] font-semibold tracking-wider uppercase hover:bg-[#2D5A27]/90 transition-all duration-300 rounded-full"
          >
            Begin Project
          </button>
        </div>

        <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`block h-[1.5px] bg-[#2D5A27] transition-all duration-300 origin-center ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block h-[1.5px] bg-[#2D5A27] transition-all duration-300 ${mobileOpen ? 'opacity-0 scale-0' : ''}`} />
            <span className={`block h-[1.5px] bg-[#2D5A27] transition-all duration-300 origin-center ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden bg-[#FFFAF5] border-t border-[#8B7355]/10 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-5">
              {navLinks.map((l) => (
                <button
                  key={l.href}
                  onClick={() => scrollTo(l.href)}
                  className="text-[13px] font-semibold text-[#2D5A27] text-left uppercase tracking-wider"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo('#contact')}
                className="bg-[#2D5A27] text-[#F5F0E8] px-5 py-3.5 text-[12px] font-semibold tracking-wider uppercase text-center rounded-full mt-2"
              >
                Begin Project
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

// ─── Hero ───────────────────────────────────────────────────────────────────

function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -60])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05])

  return (
    <section ref={ref} className="relative min-h-screen bg-[#F5F0E8] overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%238B7355\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-28 pb-20 relative z-10">
        <motion.div style={{ opacity }} className="grid lg:grid-cols-12 gap-8 lg:gap-6 items-center min-h-[80vh]">
          {/* Left: Text */}
          <div className="lg:col-span-5 relative z-20 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-[1px] bg-[#8B7355]" />
                <span className="text-[#8B7355] text-[11px] font-semibold tracking-[0.3em] uppercase">
                  {siteInfo.shortTagline}
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading text-[#2D5A27] leading-[0.95] tracking-tight"
              style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5.2rem)' }}
            >
              Renovations
              <br />
              <span className="italic text-[#8B7355]">that feel</span>
              <br />
              considered
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-[#8B7355]/80 text-[15px] leading-relaxed mt-8 max-w-md"
            >
              We design and build kitchens, bathrooms, and whole-home transformations
              with the patience and precision of a design studio — not a construction crew.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-5 mt-10"
            >
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 bg-[#2D5A27] text-[#F5F0E8] px-7 py-4 text-[12px] font-semibold tracking-wider uppercase hover:bg-[#2D5A27]/90 transition-all duration-300 rounded-full"
              >
                Start Your Project
                <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#transformations"
                className="text-[12px] font-semibold tracking-wider uppercase text-[#8B7355] hover:text-[#2D5A27] transition-colors duration-300 underline underline-offset-4 decoration-[#8B7355]/30 hover:decoration-[#2D5A27]"
              >
                View Transformations
              </a>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 1 }}
              className="flex gap-8 mt-14 pt-8 border-t border-[#8B7355]/15"
            >
              {[
                { value: `${siteInfo.yearsExperience}+`, label: 'Years' },
                { value: `${siteInfo.projectsCompleted}+`, label: 'Homes' },
                { value: 'Chicago', label: 'Based' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-heading text-[#2D5A27] text-xl">{s.value}</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#8B7355]/70 mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Image Gallery */}
          <div className="lg:col-span-7 relative order-1 lg:order-2">
            <motion.div style={{ y: y1, scale }} className="relative">
              {/* Main large image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden rounded-sm shadow-2xl shadow-[#2D5A27]/10"
              >
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=85"
                  alt="Beautiful renovated home"
                  className="w-full h-[380px] sm:h-[480px] lg:h-[580px] object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D5A27]/20 via-transparent to-transparent" />
              </motion.div>

              {/* Floating secondary image */}
              <motion.div
                style={{ y: y2 }}
                initial={{ opacity: 0, x: 30, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-8 -left-4 sm:-left-12 w-[200px] sm:w-[260px] overflow-hidden rounded-sm shadow-xl border-4 border-[#FFFAF5] hidden md:block"
              >
                <img
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&q=80"
                  alt="Kitchen detail"
                  className="w-full h-[160px] sm:h-[200px] object-cover"
                />
              </motion.div>

              {/* Floating tagline card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="absolute top-6 right-4 sm:top-8 sm:right-8 bg-[#FFFAF5]/95 backdrop-blur-sm px-5 py-4 rounded-sm shadow-lg max-w-[200px] hidden sm:block"
              >
                <IconLeaf className="w-5 h-5 text-[#2D5A27] mb-2" />
                <p className="text-[11px] text-[#8B7355] leading-relaxed italic">
                  "Design-led remodeling with the soul of a craftsman."
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-[#8B7355]/60">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <IconChevronDown className="w-4 h-4 text-[#8B7355]/50" />
        </motion.div>
      </motion.div>
    </section>
  )
}

// ─── Renovations (Horizontal Scroll) ────────────────────────────────────────

function Renovations() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setCanScrollLeft(scrollLeft > 5)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5)
  }

  useEffect(() => {
    checkScroll()
    const el = scrollRef.current
    if (el) el.addEventListener('scroll', checkScroll, { passive: true })
    return () => { if (el) el.removeEventListener('scroll', checkScroll) }
  }, [])

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = 380
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  return (
    <section id="renovations" className="py-24 md:py-32 bg-[#FFFAF5] relative overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#8B7355]/20 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-[1px] bg-[#8B7355]" />
                <span className="text-[#8B7355] text-[11px] font-semibold tracking-[0.3em] uppercase">Our Expertise</span>
              </div>
              <h2 className="font-heading text-[#2D5A27] text-4xl md:text-5xl leading-tight">
                What we <span className="italic text-[#8B7355]">build</span>
              </h2>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  canScrollLeft ? 'border-[#8B7355]/30 text-[#8B7355] hover:bg-[#8B7355] hover:text-[#F5F0E8] hover:border-[#8B7355]' : 'border-[#8B7355]/10 text-[#8B7355]/20 cursor-default'
                }`}
              >
                <IconArrowRight className="w-4 h-4 rotate-180" />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  canScrollRight ? 'border-[#8B7355]/30 text-[#8B7355] hover:bg-[#8B7355] hover:text-[#F5F0E8] hover:border-[#8B7355]' : 'border-[#8B7355]/10 text-[#8B7355]/20 cursor-default'
                }`}
              >
                <IconArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </Reveal>

        {/* Horizontal scroll container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-6 px-6 lg:-mx-12 lg:px-12 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {renovationTypes.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.08}>
              <div className="group relative w-[320px] sm:w-[360px] shrink-0 snap-start">
                {/* Image */}
                <div className="relative overflow-hidden rounded-sm aspect-[4/5]">
                  <motion.img
                    src={r.image}
                    alt={r.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D5A27]/80 via-[#2D5A27]/20 to-transparent" />

                  {/* Icon badge */}
                  <div className="absolute top-5 left-5 w-10 h-10 bg-[#FFFAF5]/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Icon name={r.icon} className="w-5 h-5 text-[#2D5A27]" />
                  </div>

                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-heading text-[#F5F0E8] text-xl mb-2">{r.title}</h3>
                    <p className="text-[#F5F0E8]/70 text-[13px] leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
                      {r.description}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Before & After (Hover Reveal Cards) ────────────────────────────────────

function BeforeAfter() {
  return (
    <section id="transformations" className="py-24 md:py-32 bg-[#F5F0E8] relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <Reveal>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-[1px] bg-[#8B7355]" />
              <span className="text-[#8B7355] text-[11px] font-semibold tracking-[0.3em] uppercase">Transformations</span>
              <div className="w-12 h-[1px] bg-[#8B7355]" />
            </div>
            <h2 className="font-heading text-[#2D5A27] text-4xl md:text-5xl leading-tight">
              Before <span className="italic text-[#8B7355]">&</span> After
            </h2>
            <p className="text-[#8B7355]/70 mt-4 max-w-xl mx-auto text-[15px] leading-relaxed">
              Hover to reveal the transformation. Each project tells a story of patience and precision.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {beforeAfters.map((ba, i) => (
            <Reveal key={ba.title} delay={i * 0.12}>
              <BeforeAfterCard item={ba} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function BeforeAfterCard({ item }: { item: typeof beforeAfters[0] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="group relative overflow-hidden rounded-sm cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="aspect-[3/4] relative">
        {/* After image (shown by default) */}
        <motion.img
          src={item.after}
          alt={`${item.title} after`}
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Before image (revealed on hover) */}
        <motion.img
          src={item.before}
          alt={`${item.title} before`}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2D5A27]/90 via-[#2D5A27]/30 to-transparent" />

        {/* Labels */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`text-[9px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-sm transition-all duration-300 ${
            hovered ? 'bg-[#F5F0E8] text-[#2D5A27]' : 'bg-transparent text-[#F5F0E8]/70 border border-[#F5F0E8]/30'
          }`}>
            Before
          </span>
          <span className={`text-[9px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-sm transition-all duration-300 ${
            hovered ? 'bg-transparent text-[#F5F0E8]/70 border border-[#F5F0E8]/30' : 'bg-[#F5F0E8] text-[#2D5A27]'
          }`}>
            After
          </span>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="font-heading text-[#F5F0E8] text-xl mb-2">{item.title}</h3>
          <motion.p
            className="text-[#F5F0E8]/70 text-[12px] leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
            transition={{ duration: 0.4, delay: hovered ? 0.1 : 0 }}
          >
            {item.description}
          </motion.p>
        </div>
      </div>
    </div>
  )
}

// ─── Materials Guide ────────────────────────────────────────────────────────

function Materials() {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <section className="py-24 md:py-32 bg-[#FFFAF5] relative">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#8B7355]/20 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <Reveal>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-[1px] bg-[#8B7355]" />
              <span className="text-[#8B7355] text-[11px] font-semibold tracking-[0.3em] uppercase">Materials</span>
              <div className="w-12 h-[1px] bg-[#8B7355]" />
            </div>
            <h2 className="font-heading text-[#2D5A27] text-4xl md:text-5xl leading-tight">
              The <span className="italic text-[#8B7355]">palette</span>
            </h2>
            <p className="text-[#8B7355]/70 mt-4 max-w-xl mx-auto text-[15px] leading-relaxed">
              Curated materials that define the character of every project.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {materialCategories.map((cat, i) => (
            <Reveal key={cat.title} delay={i * 0.07}>
              <motion.div
                className={`relative border rounded-sm overflow-hidden transition-all duration-500 cursor-pointer ${
                  expanded === i
                    ? 'border-[#2D5A27]/30 bg-[#F5F0E8] shadow-lg shadow-[#2D5A27]/5'
                    : 'border-[#8B7355]/15 bg-white hover:border-[#8B7355]/30 hover:shadow-md'
                }`}
                onClick={() => setExpanded(expanded === i ? null : i)}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                        expanded === i ? 'bg-[#2D5A27] text-[#F5F0E8]' : 'bg-[#F5F0E8] text-[#8B7355]'
                      }`}>
                        <Icon name={cat.icon} className="w-5 h-5" />
                      </div>
                      <h3 className="font-heading text-[#2D5A27] text-lg">{cat.title}</h3>
                    </div>
                    <motion.div
                      animate={{ rotate: expanded === i ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <IconChevronDown className="w-4 h-4 text-[#8B7355]" />
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {expanded === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <ul className="mt-5 pt-5 border-t border-[#8B7355]/10 space-y-2.5">
                          {cat.items.map((item) => (
                            <li key={item} className="flex items-center gap-3 text-[13px] text-[#8B7355]">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#2D5A27] shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Process Timeline ───────────────────────────────────────────────────────

function Process() {
  return (
    <section id="design-build" className="py-24 md:py-32 bg-[#2D5A27] relative overflow-hidden">
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full border border-[#F5F0E8]" />
        <div className="absolute bottom-20 left-20 w-64 h-64 rounded-full border border-[#F5F0E8]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <Reveal>
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-[1px] bg-[#F5F0E8]/40" />
              <span className="text-[#F5F0E8]/60 text-[11px] font-semibold tracking-[0.3em] uppercase">Our Process</span>
              <div className="w-12 h-[1px] bg-[#F5F0E8]/40" />
            </div>
            <h2 className="font-heading text-[#F5F0E8] text-4xl md:text-5xl leading-tight">
              The <span className="italic text-[#8B7355]">journey</span>
            </h2>
            <p className="text-[#F5F0E8]/50 mt-4 max-w-xl mx-auto text-[15px] leading-relaxed">
              From first conversation to final walkthrough — a considered path to your new home.
            </p>
          </div>
        </Reveal>

        {/* Vertical timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Center line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-[#F5F0E8]/15 md:-translate-x-[0.5px]" />

          {timelineSteps.map((step, i) => (
            <Reveal key={step.phase} delay={i * 0.12}>
              <div className={`relative flex items-start gap-6 md:gap-0 mb-16 last:mb-0 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}>
                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#8B7355] border-4 border-[#2D5A27] z-10 mt-1" />

                {/* Content card */}
                <div className={`ml-14 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                  <div className="bg-[#FFFAF5]/5 backdrop-blur-sm border border-[#F5F0E8]/10 rounded-sm p-6 hover:bg-[#FFFAF5]/10 transition-all duration-500">
                    <div className={`flex items-center gap-3 mb-3 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <span className="text-[#8B7355] font-heading text-2xl italic">{step.phase}</span>
                      <span className="text-[#F5F0E8]/30 text-[10px] uppercase tracking-wider border border-[#F5F0E8]/10 px-2 py-0.5 rounded-full">
                        {step.duration}
                      </span>
                    </div>
                    <h3 className="font-heading text-[#F5F0E8] text-lg mb-2">{step.title}</h3>
                    <p className="text-[#F5F0E8]/50 text-[13px] leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials ───────────────────────────────────────────────────────────

function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-[#F5F0E8] relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <Reveal>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-[1px] bg-[#8B7355]" />
              <span className="text-[#8B7355] text-[11px] font-semibold tracking-[0.3em] uppercase">Testimonials</span>
              <div className="w-12 h-[1px] bg-[#8B7355]" />
            </div>
            <h2 className="font-heading text-[#2D5A27] text-4xl md:text-5xl leading-tight">
              Kind <span className="italic text-[#8B7355]">words</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.12}>
              <div className="relative bg-[#FFFAF5] border border-[#8B7355]/10 rounded-sm p-8 hover:shadow-lg hover:shadow-[#8B7355]/5 transition-all duration-500 group">
                {/* Quote icon */}
                <IconQuote className="w-8 h-8 text-[#2D5A27]/15 mb-5" />

                <p className="text-[#8B7355] text-[14px] leading-relaxed mb-8">
                  {t.text}
                </p>

                <div className="flex items-center gap-3 pt-5 border-t border-[#8B7355]/10">
                  <div className="w-10 h-10 rounded-full bg-[#2D5A27]/10 flex items-center justify-center">
                    <span className="font-heading text-[#2D5A27] text-sm">{t.name.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="font-medium text-[#2D5A27] text-[13px]">{t.name}</div>
                    <div className="text-[#8B7355]/60 text-[11px] uppercase tracking-wider">{t.role}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ────────────────────────────────────────────────────────────────────

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-24 md:py-32 bg-[#FFFAF5] relative">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#8B7355]/20 to-transparent" />

      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        <Reveal>
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-[1px] bg-[#8B7355]" />
              <span className="text-[#8B7355] text-[11px] font-semibold tracking-[0.3em] uppercase">Questions</span>
              <div className="w-12 h-[1px] bg-[#8B7355]" />
            </div>
            <h2 className="font-heading text-[#2D5A27] text-4xl md:text-5xl leading-tight">
              Common <span className="italic text-[#8B7355]">questions</span>
            </h2>
          </div>
        </Reveal>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="border border-[#8B7355]/10 rounded-sm overflow-hidden bg-white hover:border-[#8B7355]/20 transition-all duration-300">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-medium text-[#2D5A27] text-[14px] pr-4">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0"
                  >
                    <IconChevronDown className="w-4 h-4 text-[#8B7355]" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-0">
                        <div className="h-[1px] bg-[#8B7355]/10 mb-4" />
                        <p className="text-[#8B7355]/80 text-[13px] leading-relaxed">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA ────────────────────────────────────────────────────────────────────

function CTA() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-[#2D5A27] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#8B7355]/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#F5F0E8]/5 blur-3xl" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-[1px] bg-[#F5F0E8]/30" />
              <span className="text-[#F5F0E8]/50 text-[11px] font-semibold tracking-[0.3em] uppercase">Get Started</span>
              <div className="w-12 h-[1px] bg-[#F5F0E8]/30" />
            </div>
            <h2 className="font-heading text-[#F5F0E8] text-4xl md:text-5xl lg:text-6xl leading-tight">
              Let's design your
              <br />
              <span className="italic text-[#8B7355]">next chapter</span>
            </h2>
            <p className="text-[#F5F0E8]/50 mt-6 text-[15px] leading-relaxed max-w-lg mx-auto">
              Every great renovation begins with a conversation. Tell us about your home, your vision, and how you'd like to live in it.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <a
                href={`tel:${siteInfo.phone}`}
                className="group inline-flex items-center gap-3 bg-[#F5F0E8] text-[#2D5A27] px-8 py-4 text-[12px] font-semibold tracking-wider uppercase hover:bg-white transition-all duration-300 rounded-full"
              >
                <IconPhone className="w-4 h-4" />
                {siteInfo.phone}
              </a>
              <a
                href={`mailto:${siteInfo.email}`}
                className="group inline-flex items-center gap-3 border border-[#F5F0E8]/30 text-[#F5F0E8] px-8 py-4 text-[12px] font-semibold tracking-wider uppercase hover:bg-[#F5F0E8]/10 hover:border-[#F5F0E8]/50 transition-all duration-300 rounded-full"
              >
                <IconMail className="w-4 h-4" />
                Email Us
              </a>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10 text-[#F5F0E8]/40 text-[12px]">
              <div className="flex items-center gap-2">
                <IconLocation className="w-3.5 h-3.5" />
                <span>{siteInfo.address}</span>
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-[#F5F0E8]/20" />
              <span>License: {siteInfo.license}</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── Footer ─────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-[#1a3518] py-12">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#2D5A27] rounded-full flex items-center justify-center">
              <IconHome className="w-4 h-4 text-[#F5F0E8]" />
            </div>
            <div>
              <span className="font-heading text-[#F5F0E8] text-sm block leading-none">{siteInfo.name}</span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#F5F0E8]/30">Est. {siteInfo.founded}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[11px] uppercase tracking-wider text-[#F5F0E8]/40 hover:text-[#F5F0E8]/70 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="text-[11px] text-[#F5F0E8]/30">
            &copy; {new Date().getFullYear()} {siteInfo.name}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── App ────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen bg-[#F5F0E8] font-sans antialiased">
      <Navbar />
      <Hero />
      <Renovations />
      <BeforeAfter />
      <Materials />
      <Process />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  )
}
