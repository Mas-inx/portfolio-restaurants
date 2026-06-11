import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import {
  siteInfo, stats, capabilities, processPhases, equipment,
  projectTypes, safetyPoints, galleryImages, navLinks,
} from './data'
import type { EquipmentItem } from './data'

/* ═══════════════════════════════════════════════════════════════
   TERRAFORM CIVIL WORKS — Heavy Civil / Sitework
   Design: Rugged, earthy, engineering-focused
   Palette: Earth Brown #5C4033 · Olive #6B8E23 · Sand #F5E6CA · Slate #4A5568
   ═══════════════════════════════════════════════════════════════ */

/* ── Topographic Contour Pattern ── */

function ContourPattern({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <path d="M0 300C100 280 200 320 300 300S500 260 600 300S750 340 800 300" stroke="currentColor" strokeWidth="0.8" />
      <path d="M0 260C120 240 240 280 360 260S540 220 660 260S760 300 800 260" stroke="currentColor" strokeWidth="0.6" />
      <path d="M0 340C120 320 240 360 360 340S540 300 660 340S760 380 800 340" stroke="currentColor" strokeWidth="0.6" />
      <path d="M0 220C140 190 280 240 420 220S620 180 720 220S780 260 800 220" stroke="currentColor" strokeWidth="0.4" />
      <path d="M0 380C140 350 280 400 420 380S620 340 720 380S780 420 800 380" stroke="currentColor" strokeWidth="0.4" />
      <path d="M0 180C160 150 320 200 480 180S680 140 760 180S790 220 800 180" stroke="currentColor" strokeWidth="0.3" />
      <path d="M0 420C160 390 320 440 480 420S680 380 760 420S790 460 800 420" stroke="currentColor" strokeWidth="0.3" />
      <path d="M0 140C180 100 360 160 540 140S720 100 780 140" stroke="currentColor" strokeWidth="0.2" />
      <path d="M0 460C180 420 360 480 540 460S720 420 780 460" stroke="currentColor" strokeWidth="0.2" />
      <path d="M400 0C380 100 420 200 400 300S360 500 400 600" stroke="currentColor" strokeWidth="0.5" />
      <path d="M340 0C320 120 360 240 340 360S300 520 340 600" stroke="currentColor" strokeWidth="0.3" />
      <path d="M460 0C440 120 480 240 460 360S420 520 460 600" stroke="currentColor" strokeWidth="0.3" />
      <path d="M280 0C260 140 300 280 280 420S240 540 280 600" stroke="currentColor" strokeWidth="0.2" />
      <path d="M520 0C500 140 540 280 520 420S480 540 520 600" stroke="currentColor" strokeWidth="0.2" />
      {/* Elevation markers */}
      <circle cx="400" cy="300" r="3" fill="currentColor" opacity="0.4" />
      <circle cx="200" cy="260" r="2" fill="currentColor" opacity="0.3" />
      <circle cx="600" cy="340" r="2" fill="currentColor" opacity="0.3" />
      <text x="410" y="295" fill="currentColor" fontSize="8" opacity="0.3" fontFamily="monospace">+742.5</text>
      <text x="210" y="255" fill="currentColor" fontSize="7" opacity="0.25" fontFamily="monospace">+738.0</text>
      <text x="610" y="335" fill="currentColor" fontSize="7" opacity="0.25" fontFamily="monospace">+745.2</text>
    </svg>
  )
}

/* ── Grid Pattern (engineering paper) ── */

function GridPattern({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <defs>
        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" stroke="currentColor" strokeWidth="0.15" opacity="0.3" />
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#grid)" />
    </svg>
  )
}

/* ── SVG Icons (inline, no emoji) ── */

function IconExcavator({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="20" width="16" height="6" rx="1" />
      <circle cx="7" cy="28" r="2" />
      <circle cx="17" cy="28" r="2" />
      <path d="M20 20V14h4v6" />
      <path d="M20 14l-6-8h-3l4 8" />
      <path d="M11 6l8 4" />
      <path d="M19 10l4-4 4 2" />
    </svg>
  )
}

function IconGrader({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="10" width="10" height="8" rx="1" />
      <circle cx="9" cy="22" r="2.5" />
      <circle cx="24" cy="22" r="2.5" />
      <path d="M16 14h8v4h-8" />
      <path d="M4 20h24" />
      <path d="M6 20l-2 2h4" />
      <path d="M26 20l2 2h-4" />
      <path d="M8 10V7h6v3" />
    </svg>
  )
}

function IconPipe({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12h8v8H4" />
      <path d="M12 14h8v4h-8" />
      <path d="M20 10h8v12h-8" />
      <path d="M8 12V8" />
      <path d="M24 10V6" />
      <path d="M24 22v4" />
    </svg>
  )
}

function IconUtility({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4v6" />
      <path d="M10 10h12v4H10z" />
      <path d="M16 14v4" />
      <path d="M8 18h16v4H8z" />
      <path d="M16 22v6" />
      <path d="M12 28h8" />
      <path d="M6 10l-2-2" />
      <path d="M26 10l2-2" />
    </svg>
  )
}

function IconPaving({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="18" width="24" height="6" rx="1" />
      <path d="M4 24v3h24v-3" />
      <path d="M8 18v-4h16v4" />
      <path d="M12 14v-3h8v3" />
      <circle cx="8" cy="27" r="1.5" />
      <circle cx="24" cy="27" r="1.5" />
    </svg>
  )
}

function IconWall({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="6" width="24" height="20" rx="0" />
      <line x1="4" y1="12" x2="28" y2="12" />
      <line x1="4" y1="18" x2="28" y2="18" />
      <line x1="4" y1="24" x2="28" y2="24" />
      <line x1="12" y1="6" x2="12" y2="12" />
      <line x1="20" y1="6" x2="20" y2="12" />
      <line x1="8" y1="12" x2="8" y2="18" />
      <line x1="16" y1="12" x2="16" y2="18" />
      <line x1="24" y1="12" x2="24" y2="18" />
      <line x1="12" y1="18" x2="12" y2="24" />
      <line x1="20" y1="18" x2="20" y2="24" />
    </svg>
  )
}

function IconSurvey({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4l-2 6h4l-2-6z" />
      <circle cx="16" cy="14" r="3" />
      <path d="M16 17v11" />
      <path d="M10 28h12" />
      <path d="M13 24l3-3 3 3" />
    </svg>
  )
}

function IconClearing({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4l-8 10h5l-4 8h14l-4-8h5z" />
      <path d="M16 22v6" />
      <path d="M12 28h8" />
    </svg>
  )
}

function IconCompaction({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="8" width="16" height="10" rx="2" />
      <path d="M8 18v4h16v-4" />
      <path d="M6 22h20" />
      <path d="M10 26h12" />
      <path d="M12 8V5" />
      <path d="M20 8V5" />
      <path d="M14 12h4" />
      <path d="M14 15h4" />
    </svg>
  )
}

function IconHandoff({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="4" width="20" height="24" rx="1" />
      <path d="M10 10h12" />
      <path d="M10 14h12" />
      <path d="M10 18h8" />
      <path d="M20 22l3 3 5-6" />
    </svg>
  )
}

function IconShield({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 3L4 8v8c0 7 5.5 12 12 13 6.5-1 12-6 12-13V8L16 3z" />
      <path d="M12 16l3 3 5-6" />
    </svg>
  )
}

function IconWater({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4C16 4 6 14 6 20a10 10 0 0 0 20 0c0-6-10-16-10-16z" />
      <path d="M12 22a4 4 0 0 0 4 4" />
    </svg>
  )
}

function IconInspect({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="14" cy="14" r="8" />
      <path d="M20 20l8 8" />
      <path d="M14 10v4l3 2" />
    </svg>
  )
}

function IconDoc({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 4h12l6 6v18H8z" />
      <path d="M20 4v6h6" />
      <path d="M12 16h8" />
      <path d="M12 20h8" />
      <path d="M12 24h5" />
    </svg>
  )
}

function IconMenu({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

function IconX({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function IconArrow({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

function IconPhone({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7l-10 6L2 7" />
    </svg>
  )
}

function IconPin({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function IconExpand({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 3 21 3 21 9" />
      <polyline points="9 21 3 21 3 15" />
      <line x1="21" y1="3" x2="14" y2="10" />
      <line x1="3" y1="21" x2="10" y2="14" />
    </svg>
  )
}

/* ── Icon Maps ── */

const capabilityIcons = [IconExcavator, IconGrader, IconPipe, IconUtility, IconPaving, IconWall]
const processIcons = [IconSurvey, IconClearing, IconGrader, IconPipe, IconCompaction, IconHandoff]
const safetyIcons = [IconWater, IconShield, IconInspect, IconDoc]

/* ── Animated Counter Hook ── */

function useCounter(target: string, inView: boolean) {
  const [display, setDisplay] = useState('0')
  const numericPart = target.replace(/[^0-9]/g, '')
  const suffix = target.replace(/[0-9]/g, '')
  const num = parseInt(numericPart, 10)

  useEffect(() => {
    if (!inView || isNaN(num)) {
      setDisplay(target)
      return
    }
    let start = 0
    const duration = 1500
    const startTime = performance.now()
    const step = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      start = Math.round(eased * num)
      setDisplay(start + suffix)
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, target, num, suffix])

  return display
}

/* ── Components ── */

function AnimatedStat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const display = useCounter(value, inView)
  return (
    <div ref={ref} className="text-center px-6 py-4">
      <div className="font-mono text-3xl sm:text-4xl font-black text-[#F5E6CA] tracking-tight">{display}</div>
      <div className="text-[#6B8E23] text-[11px] font-bold uppercase tracking-[0.2em] mt-1">{label}</div>
    </div>
  )
}

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ── Navbar ── */

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-[#2D1F14]/95 backdrop-blur-sm shadow-lg shadow-black/20' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-[#6B8E23] flex items-center justify-center relative">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#F5E6CA]" fill="currentColor">
                <path d="M12 2L2 7v2l10-5 10 5V7L12 2zM2 12l10 5 10-5v2l-10 5-10-5v-2z" />
              </svg>
            </div>
            <div className="leading-none">
              <span className="block text-[#F5E6CA] font-black text-lg tracking-tight uppercase">TerraForm</span>
              <span className="block text-[#6B8E23] text-[9px] font-mono font-bold tracking-[0.25em] uppercase">Civil Works</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="px-3 py-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[#F5E6CA]/70 hover:text-[#F5E6CA] transition-colors relative group">
                {l.label}
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#6B8E23] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </a>
            ))}
            <a href="#contact" className="ml-4 bg-[#5C4033] text-[#F5E6CA] px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.15em] hover:bg-[#6B8E23] transition-colors">
              Request Bid
            </a>
          </div>

          {/* Mobile Toggle */}
          <button className="lg:hidden p-2 text-[#F5E6CA]" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? <IconX className="w-6 h-6" /> : <IconMenu className="w-6 h-6" />}
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
            className="lg:hidden bg-[#2D1F14] border-t border-[#5C4033]/50"
          >
            <div className="px-4 py-5 space-y-1">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="block px-3 py-3 text-sm font-bold uppercase tracking-wider text-[#F5E6CA]/80 hover:text-[#6B8E23] transition-colors border-b border-[#5C4033]/20">
                  {l.label}
                </a>
              ))}
              <a href="#contact" onClick={() => setMenuOpen(false)} className="block mt-3 bg-[#5C4033] text-[#F5E6CA] px-5 py-3 text-sm font-black uppercase text-center tracking-wider">
                Request Bid
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
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0.6, 0.85])

  return (
    <section ref={ref} className="relative min-h-screen flex items-end overflow-hidden">
      {/* Parallax Background */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img
          src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920&q=85"
          alt="Aerial view of heavy civil construction site"
          className="w-full h-[120%] object-cover"
        />
      </motion.div>

      {/* Overlays */}
      <motion.div className="absolute inset-0 bg-[#2D1F14]" style={{ opacity: overlayOpacity }} />
      <div className="absolute inset-0 text-[#6B8E23] opacity-[0.07]">
        <ContourPattern className="w-full h-full" />
      </div>

      {/* Diagonal cut at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-[#1A120B]" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }} />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 lg:pb-40 pt-32 w-full">
        <div className="max-w-4xl">
          {/* Tag badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <span className="w-8 h-px bg-[#6B8E23]" />
            <span className="text-[#6B8E23] text-xs font-mono font-bold tracking-[0.3em] uppercase">
              Est. 2003 · Chicago, IL
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-black text-5xl sm:text-6xl lg:text-8xl text-[#F5E6CA] leading-[0.9] tracking-tight mb-6"
          >
            We Move<br />
            <span className="text-[#6B8E23]">Earth.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-[#F5E6CA]/70 text-lg sm:text-xl max-w-xl leading-relaxed mb-8"
          >
            {siteInfo.tagline}. Heavy civil sitework, mass grading, utility installation, and site development across the Midwest.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap gap-4"
          >
            <a href="#capabilities" className="group inline-flex items-center gap-3 bg-[#6B8E23] text-[#F5E6CA] px-7 py-4 font-black text-sm uppercase tracking-wider hover:bg-[#5a7a1e] transition-colors">
              Our Capabilities
              <IconArrow className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#contact" className="inline-flex items-center gap-3 border-2 border-[#F5E6CA]/30 text-[#F5E6CA] px-7 py-4 font-black text-sm uppercase tracking-wider hover:border-[#6B8E23] hover:text-[#6B8E23] transition-colors">
              Request a Bid
            </a>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 lg:mt-20 grid grid-cols-3 gap-0 border border-[#5C4033]/60 bg-[#1A120B]/80 backdrop-blur-sm max-w-lg"
        >
          {stats.map((s, i) => (
            <div key={s.label} className={`py-4 px-2 ${i < stats.length - 1 ? 'border-r border-[#5C4033]/40' : ''}`}>
              <AnimatedStat value={s.value} label={s.label} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ── Capabilities Section ── */

function CapabilitiesSection() {
  return (
    <section id="capabilities" className="py-24 lg:py-32 bg-[#1A120B] relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 text-[#5C4033] opacity-20">
        <GridPattern className="w-full h-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <FadeIn>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
            <div>
              <span className="text-[#6B8E23] text-xs font-mono font-bold tracking-[0.3em] uppercase block mb-3">
                // What We Do
              </span>
              <h2 className="font-black text-4xl sm:text-5xl lg:text-6xl text-[#F5E6CA] leading-[0.95] tracking-tight">
                Core<br />Capabilities
              </h2>
            </div>
            <p className="text-[#F5E6CA]/60 text-base max-w-md leading-relaxed">
              Six specialized disciplines covering every phase of site development — from raw land to ready-to-build pad.
            </p>
          </div>
        </FadeIn>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-[#5C4033]/40">
          {capabilities.map((c, i) => {
            const IconComp = capabilityIcons[i]
            return (
              <FadeIn key={c.title} delay={i * 0.08}>
                <div className="group h-full p-8 border-b sm:border-r border-[#5C4033]/30 hover:bg-[#5C4033]/10 transition-colors duration-300 relative overflow-hidden">
                  {/* Corner index */}
                  <span className="absolute top-3 right-4 text-[#5C4033] text-xs font-mono font-bold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {/* Icon */}
                  <div className="w-14 h-14 mb-6 text-[#6B8E23] group-hover:text-[#F5E6CA] transition-colors duration-300">
                    <IconComp className="w-full h-full" />
                  </div>
                  <h3 className="font-black text-xl text-[#F5E6CA] mb-3 tracking-tight uppercase">{c.title}</h3>
                  <p className="text-[#F5E6CA]/50 text-sm leading-relaxed">{c.description}</p>
                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6B8E23] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ── Process Section ── */

function ProcessSection() {
  const [activePhase, setActivePhase] = useState(0)

  return (
    <section id="process" className="py-24 lg:py-32 bg-[#2D1F14] relative overflow-hidden">
      {/* Contour decoration */}
      <div className="absolute inset-0 text-[#5C4033] opacity-[0.08]">
        <ContourPattern className="w-full h-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="text-[#6B8E23] text-xs font-mono font-bold tracking-[0.3em] uppercase block mb-3">
              // How We Work
            </span>
            <h2 className="font-black text-4xl sm:text-5xl lg:text-6xl text-[#F5E6CA] tracking-tight">
              Sitework Process
            </h2>
            <p className="mt-4 text-[#F5E6CA]/60 max-w-lg mx-auto">
              A proven six-phase delivery method from initial survey through final site handoff.
            </p>
          </div>
        </FadeIn>

        {/* Phase selector tabs */}
        <FadeIn>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {processPhases.map((p, i) => (
              <button
                key={p.phase}
                onClick={() => setActivePhase(i)}
                className={`px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 border ${
                  activePhase === i
                    ? 'bg-[#6B8E23] text-[#F5E6CA] border-[#6B8E23]'
                    : 'bg-transparent text-[#F5E6CA]/50 border-[#5C4033]/50 hover:border-[#6B8E23]/50 hover:text-[#F5E6CA]'
                }`}
              >
                <span className="mr-2 opacity-60">{p.phase}</span>{p.title}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Active phase detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePhase}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-[#1A120B] border border-[#5C4033]/50 p-8 sm:p-12 relative overflow-hidden">
              {/* Phase number watermark */}
              <span className="absolute -top-4 -right-2 text-[120px] sm:text-[180px] font-black text-[#5C4033]/10 leading-none select-none pointer-events-none">
                {processPhases[activePhase].phase}
              </span>

              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#6B8E23] flex items-center justify-center text-[#F5E6CA] font-mono font-black text-sm">
                    {processPhases[activePhase].phase}
                  </div>
                  <div className="w-10 h-10 text-[#6B8E23]">
                    {(() => {
                      const IconComp = processIcons[activePhase]
                      return <IconComp className="w-full h-full" />
                    })()}
                  </div>
                </div>

                <h3 className="font-black text-3xl sm:text-4xl text-[#F5E6CA] mb-4 tracking-tight uppercase">
                  {processPhases[activePhase].title}
                </h3>
                <p className="text-[#F5E6CA]/70 text-lg leading-relaxed mb-6 max-w-2xl">
                  {processPhases[activePhase].description}
                </p>
                <div className="inline-flex items-center gap-2 bg-[#5C4033]/30 border border-[#5C4033]/50 px-4 py-2">
                  <span className="text-[#6B8E23] text-xs font-mono font-bold">TECH:</span>
                  <span className="text-[#F5E6CA]/60 text-xs font-mono">{processPhases[activePhase].details}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Timeline dots */}
        <div className="flex justify-center gap-3 mt-8">
          {processPhases.map((_, i) => (
            <button
              key={i}
              onClick={() => setActivePhase(i)}
              className={`w-3 h-3 transition-all duration-300 ${
                activePhase === i ? 'bg-[#6B8E23] scale-125' : 'bg-[#5C4033]/60 hover:bg-[#5C4033]'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Equipment Section ── */

function EquipmentSection() {
  return (
    <section id="equipment" className="py-24 lg:py-32 bg-[#1A120B] relative overflow-hidden">
      <div className="absolute inset-0 text-[#5C4033] opacity-10">
        <GridPattern className="w-full h-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
            <div>
              <span className="text-[#6B8E23] text-xs font-mono font-bold tracking-[0.3em] uppercase block mb-3">
                // Our Fleet
              </span>
              <h2 className="font-black text-4xl sm:text-5xl lg:text-6xl text-[#F5E6CA] tracking-tight">
                Equipment<br />Spec Sheets
              </h2>
            </div>
            <p className="text-[#F5E6CA]/60 text-base max-w-md leading-relaxed">
              Modern, GPS-equipped heavy machinery. {siteInfo.equipmentFleet} units across our fleet, maintained to OEM specifications.
            </p>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 gap-6">
          {equipment.map((eq: EquipmentItem, i: number) => (
            <FadeIn key={eq.name} delay={i * 0.1}>
              <div className="h-full bg-[#2D1F14] border border-[#5C4033]/40 group hover:border-[#6B8E23]/60 transition-all duration-300 overflow-hidden">
                {/* Spec sheet header */}
                <div className="bg-[#5C4033]/30 px-6 py-4 flex items-center justify-between border-b border-[#5C4033]/40">
                  <div>
                    <div className="text-[#6B8E23] text-[10px] font-mono font-bold tracking-[0.2em] uppercase">Equipment ID</div>
                    <div className="text-[#F5E6CA] font-black text-lg tracking-tight">{eq.name}</div>
                  </div>
                  <div className="bg-[#6B8E23] text-[#F5E6CA] px-3 py-1 text-[10px] font-mono font-black tracking-wider">
                    {eq.model}
                  </div>
                </div>

                {/* Specs grid */}
                <div className="grid grid-cols-4 border-b border-[#5C4033]/30">
                  {eq.specs.map((spec) => (
                    <div key={spec.label} className="px-3 py-3 text-center border-r border-[#5C4033]/20 last:border-r-0">
                      <div className="text-[#F5E6CA] font-mono font-black text-sm">{spec.value}</div>
                      <div className="text-[#6B8E23] text-[9px] font-mono font-bold uppercase tracking-wider mt-0.5">{spec.label}</div>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <div className="p-6">
                  <p className="text-[#F5E6CA]/60 text-sm leading-relaxed">{eq.description}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Project Types Section ── */

function ProjectTypesSection() {
  return (
    <section id="projects" className="py-24 lg:py-32 bg-[#2D1F14] relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="text-[#6B8E23] text-xs font-mono font-bold tracking-[0.3em] uppercase block mb-3">
              // Project Types
            </span>
            <h2 className="font-black text-4xl sm:text-5xl lg:text-6xl text-[#F5E6CA] tracking-tight">
              What We Build
            </h2>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 gap-0 border border-[#5C4033]/40">
          {projectTypes.map((pt, i) => (
            <FadeIn key={pt.title} delay={i * 0.1}>
              <div className="group relative h-72 sm:h-80 overflow-hidden border-b sm:border-r border-[#5C4033]/30">
                {/* Image */}
                <img
                  src={pt.image}
                  alt={pt.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A120B] via-[#1A120B]/60 to-transparent" />
                <div className="absolute inset-0 bg-[#6B8E23]/0 group-hover:bg-[#6B8E23]/10 transition-colors duration-500" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <span className="text-[#6B8E23] text-[10px] font-mono font-bold tracking-[0.3em] uppercase">
                    {String(i + 1).padStart(2, '0')} / {String(projectTypes.length).padStart(2, '0')}
                  </span>
                  <h3 className="font-black text-2xl text-[#F5E6CA] mt-2 mb-2 tracking-tight">{pt.title}</h3>
                  <p className="text-[#F5E6CA]/60 text-sm leading-relaxed max-w-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                    {pt.description}
                  </p>
                </div>

                {/* Corner marker */}
                <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#6B8E23] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#6B8E23] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Safety Section ── */

function SafetySection() {
  return (
    <section id="safety" className="py-24 lg:py-32 bg-[#1A120B] relative overflow-hidden">
      <div className="absolute inset-0 text-[#6B8E23] opacity-[0.04]">
        <ContourPattern className="w-full h-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="text-[#6B8E23] text-xs font-mono font-bold tracking-[0.3em] uppercase block mb-3">
              // Compliance & Safety
            </span>
            <h2 className="font-black text-4xl sm:text-5xl lg:text-6xl text-[#F5E6CA] tracking-tight">
              Safety & Environmental
            </h2>
            <p className="mt-4 text-[#F5E6CA]/60 max-w-lg mx-auto">
              Zero-incident culture backed by rigorous documentation, third-party testing, and regulatory compliance.
            </p>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {safetyPoints.map((sp, i) => {
            const IconComp = safetyIcons[i]
            return (
              <FadeIn key={sp.title} delay={i * 0.1}>
                <div className="h-full bg-[#2D1F14] border border-[#5C4033]/40 p-6 text-center hover:border-[#6B8E23]/50 transition-colors duration-300 group">
                  {/* Badge icon */}
                  <div className="w-16 h-16 mx-auto mb-5 relative">
                    <div className="absolute inset-0 border-2 border-[#6B8E23]/40 rotate-45 group-hover:rotate-[50deg] transition-transform duration-500" />
                    <div className="absolute inset-2 flex items-center justify-center text-[#6B8E23]">
                      <IconComp className="w-7 h-7" />
                    </div>
                  </div>
                  <h3 className="font-black text-base text-[#F5E6CA] uppercase tracking-tight mb-3">{sp.title}</h3>
                  <p className="text-[#F5E6CA]/50 text-xs leading-relaxed">{sp.description}</p>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ── Gallery Section ── */

function GallerySection() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  const closeLightbox = useCallback(() => setLightbox(null), [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeLightbox() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [closeLightbox])

  return (
    <section className="py-24 lg:py-32 bg-[#2D1F14] relative">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="text-[#6B8E23] text-xs font-mono font-bold tracking-[0.3em] uppercase block mb-3">
              // Field Photos
            </span>
            <h2 className="font-black text-4xl sm:text-5xl lg:text-6xl text-[#F5E6CA] tracking-tight">
              Project Gallery
            </h2>
          </div>
        </FadeIn>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {galleryImages.map((img, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <button
                onClick={() => setLightbox(i)}
                className={`group relative overflow-hidden w-full ${i === 0 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-[4/3]'} block`}
              >
                <img
                  src={img}
                  alt={`Project photo ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-[#1A120B]/0 group-hover:bg-[#1A120B]/40 transition-colors duration-300 flex items-center justify-center">
                  <IconExpand className="w-8 h-8 text-[#F5E6CA] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                {/* Index label */}
                <span className="absolute bottom-2 left-2 text-[#F5E6CA]/40 text-[10px] font-mono font-bold">
                  IMG_{String(i + 1).padStart(3, '0')}
                </span>
              </button>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#1A120B]/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button className="absolute top-4 right-4 text-[#F5E6CA] p-2" onClick={closeLightbox}>
              <IconX className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={galleryImages[lightbox]}
              alt={`Gallery image ${lightbox + 1}`}
              className="max-w-full max-h-[85vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

/* ── CTA Section ── */

function CTASection() {
  return (
    <section id="contact" className="py-24 lg:py-32 bg-[#1A120B] relative overflow-hidden">
      <div className="absolute inset-0 text-[#6B8E23] opacity-[0.05]">
        <ContourPattern className="w-full h-full" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <span className="text-[#6B8E23] text-xs font-mono font-bold tracking-[0.3em] uppercase block mb-4">
            // Start Your Project
          </span>
          <h2 className="font-black text-4xl sm:text-5xl lg:text-6xl text-[#F5E6CA] tracking-tight mb-6">
            Ready to Move Earth?
          </h2>
          <p className="text-[#F5E6CA]/60 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            From preliminary estimates to final grade, our team delivers heavy civil sitework on time and on budget. Contact us for a project consultation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a href={`tel:${siteInfo.phone}`} className="inline-flex items-center gap-3 bg-[#6B8E23] text-[#F5E6CA] px-8 py-4 font-black text-sm uppercase tracking-wider hover:bg-[#5a7a1e] transition-colors">
              <IconPhone className="w-5 h-5" />
              {siteInfo.phone}
            </a>
            <a href={`mailto:${siteInfo.email}`} className="inline-flex items-center gap-3 border-2 border-[#F5E6CA]/30 text-[#F5E6CA] px-8 py-4 font-black text-sm uppercase tracking-wider hover:border-[#6B8E23] hover:text-[#6B8E23] transition-colors">
              <IconMail className="w-5 h-5" />
              Email Us
            </a>
          </div>

          {/* Contact details */}
          <div className="grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="flex flex-col items-center gap-2">
              <IconPin className="w-5 h-5 text-[#6B8E23]" />
              <span className="text-[#F5E6CA]/60 text-sm text-center">{siteInfo.address}</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <IconPhone className="w-5 h-5 text-[#6B8E23]" />
              <span className="text-[#F5E6CA]/60 text-sm">{siteInfo.phone}</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <IconMail className="w-5 h-5 text-[#6B8E23]" />
              <span className="text-[#F5E6CA]/60 text-sm">{siteInfo.email}</span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

/* ── Footer ── */

function Footer() {
  return (
    <footer className="bg-[#0D0907] border-t border-[#5C4033]/30 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#6B8E23] flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#F5E6CA]" fill="currentColor">
                <path d="M12 2L2 7v2l10-5 10 5V7L12 2zM2 12l10 5 10-5v2l-10 5-10-5v-2z" />
              </svg>
            </div>
            <div className="leading-none">
              <span className="block text-[#F5E6CA] font-black text-base tracking-tight uppercase">TerraForm</span>
              <span className="block text-[#6B8E23] text-[8px] font-mono font-bold tracking-[0.25em] uppercase">Civil Works</span>
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[#F5E6CA]/40 text-xs font-mono">
            <span>License: {siteInfo.license}</span>
            <span className="hidden sm:inline">|</span>
            <span>{siteInfo.address}</span>
          </div>

          {/* Copyright */}
          <div className="text-[#F5E6CA]/30 text-xs font-mono">
            &copy; {new Date().getFullYear()} TerraForm Civil Works
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ── Main App ── */

export default function App() {
  return (
    <div className="bg-[#1A120B] min-h-screen text-[#F5E6CA] antialiased selection:bg-[#6B8E23] selection:text-[#F5E6CA]">
      <Navbar />
      <Hero />
      <CapabilitiesSection />
      <ProcessSection />
      <EquipmentSection />
      <ProjectTypesSection />
      <SafetySection />
      <GallerySection />
      <CTASection />
      <Footer />
    </div>
  )
}
