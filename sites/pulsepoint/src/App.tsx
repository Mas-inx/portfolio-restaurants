import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  siteInfo,
  navLinks,
  treatments,
  visitOptions,
  howItWorksSteps,
  pricingItems,
  acceptedInsurances,
  reviews,
} from './data'

// ─── SVG Icon Components ────────────────────────────────────────────────────

const IconPulse = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
)

const IconClock = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

const IconPhone = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
)

const IconMapPin = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const IconStar = ({ className = 'w-5 h-5', filled = false }: { className?: string; filled?: boolean }) => (
  <svg className={className} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

const IconArrowRight = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

const IconChevronDown = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

const IconMenu = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
)

const IconX = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const IconShield = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

const IconHeart = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
)

const IconActivity = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
)

const IconThermometer = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z" />
  </svg>
)

const IconBone = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18.5 2.5a3 3 0 00-4.24 0L5.5 11.26a3 3 0 000 4.24l3 3a3 3 0 004.24 0l8.76-8.76a3 3 0 000-4.24l-3-3z" />
    <circle cx="6" cy="6" r="2.5" />
    <circle cx="18" cy="18" r="2.5" />
  </svg>
)

const IconDroplet = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
  </svg>
)

const IconFlame = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z" />
  </svg>
)

const IconEar = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8.5a6.5 6.5 0 1113 0c0 6-6 6-6 10a3.5 3.5 0 11-7 0" />
    <path d="M15 8.5a2.5 2.5 0 00-5 0v1a2 2 0 002 2" />
  </svg>
)

const IconTestTube = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2v6.5a5.5 5.5 0 01-11 0V2" />
    <path d="M7 2h6" />
    <path d="M4 14.5c0 2.5 2 4.5 5 4.5s5-2 5-4.5" />
  </svg>
)

const IconAlertCircle = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
)

const IconUserCheck = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <polyline points="17 11 19 13 23 9" />
  </svg>
)

const IconLaptop = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="2" y1="20" x2="22" y2="20" />
  </svg>
)

const IconBriefcase = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
  </svg>
)

const IconHospital = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
)

const IconStethoscope = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.8 2.3A.3.3 0 105 2H4a2 2 0 00-2 2v5a6 6 0 006 6 6 6 0 006-6V4a2 2 0 00-2-2h-1a.2.2 0 10.3.3" />
    <path d="M8 15v1a6 6 0 006 6 6 6 0 006-6v-4" />
    <circle cx="20" cy="10" r="2" />
  </svg>
)

const IconCheckCircle = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
)

const IconFacebook = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

const IconTwitter = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
  </svg>
)

const IconMail = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)

// ─── Treatment Icon Map ─────────────────────────────────────────────────────

const treatmentIconMap: Record<string, React.FC<{ className?: string }>> = {
  fever: IconThermometer,
  injury: IconBone,
  wound: IconDroplet,
  burn: IconFlame,
  ear: IconEar,
  uti: IconAlertCircle,
  test: IconTestTube,
  allergy: IconActivity,
}

const stepIconMap: Record<string, React.FC<{ className?: string }>> = {
  phone: IconPhone,
  hospital: IconHospital,
  doctor: IconStethoscope,
  check: IconCheckCircle,
}

const visitIconMap: Record<string, React.FC<{ className?: string }>> = {
  'Walk In Anytime': IconUserCheck,
  'Check In Online': IconLaptop,
  'Occupational Health': IconBriefcase,
  'Telehealth Visit': IconLaptop,
}

// ─── Category filters for treatments ────────────────────────────────────────

const treatmentCategories = ['All', 'Illness', 'Injury', 'Testing']

const treatmentCategoryMap: Record<string, string> = {
  'Flu & Fever': 'Illness',
  'Sprains & Strains': 'Injury',
  'Cuts & Minor Lacerations': 'Injury',
  'Minor Burns': 'Injury',
  'Ear & Sinus Infections': 'Illness',
  'Urinary Tract Infections': 'Illness',
  'COVID-19 & Strep Testing': 'Testing',
  'Skin Rashes & Allergies': 'Illness',
}

// ─── Animated Counter Hook ──────────────────────────────────────────────────

function useAnimatedCounter(target: number, duration = 1200) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (hasAnimated.current) return
    hasAnimated.current = true

    const startTime = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress >= 1) clearInterval(interval)
    }, 16)

    return () => clearInterval(interval)
  }, [target, duration])

  return count
}

// ─── Main App Component ─────────────────────────────────────────────────────

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeVisit, setActiveVisit] = useState(0)
  const [pricingExpanded, setPricingExpanded] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const waitTime = useAnimatedCounter(siteInfo.currentWaitTime)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const filteredTreatments = treatments.filter(
    (t) => activeCategory === 'All' || treatmentCategoryMap[t.title] === activeCategory
  )

  const visiblePricing = pricingExpanded ? pricingItems : pricingItems.slice(0, 5)

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1A2744] font-sans antialiased">
      {/* ─── Navigation ─────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="relative">
                <div className="w-9 h-9 bg-[#DC2626] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                  <IconPulse className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white" />
              </div>
              <span className="font-bold text-lg tracking-tight text-[#1A2744]">
                Pulse<span className="text-[#DC2626]">Point</span>
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3.5 py-2 text-sm font-medium text-[#64748B] hover:text-[#1A2744] transition-colors rounded-lg hover:bg-slate-50"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={`tel:${siteInfo.phone}`}
                className="flex items-center gap-2 text-sm font-medium text-[#64748B] hover:text-[#1A2744] transition-colors"
              >
                <IconPhone className="w-4 h-4" />
                {siteInfo.phone}
              </a>
              <a
                href="#visit"
                className="px-5 py-2.5 bg-[#DC2626] text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-sm"
              >
                Check In Now
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#1A2744] hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <IconX /> : <IconMenu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-sm font-medium text-[#64748B] hover:text-[#1A2744] hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="pt-3 border-t border-slate-100 mt-3">
                  <a
                    href="#visit"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center px-5 py-3 bg-[#DC2626] text-white text-sm font-semibold rounded-lg"
                  >
                    Check In Now
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ─── Hero Section ───────────────────────────────────────────── */}
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A2744] via-[#1A2744] to-[#0f1a30]" />
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>
        {/* Red accent glow */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#DC2626]/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Status badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/10 mb-6">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
                </span>
                <span className="text-xs font-medium text-white/80">Open Now · Walk-ins Welcome</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
                Walk in today.
                <br />
                <span className="text-[#DC2626]">Get seen fast.</span>
              </h1>

              <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-lg">
                {siteInfo.description}
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="#visit"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#DC2626] text-white font-semibold rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-900/30 hover:shadow-red-900/50 hover:-translate-y-0.5"
                >
                  Check In Online
                  <IconArrowRight className="w-4 h-4" />
                </a>
                <a
                  href={`tel:${siteInfo.phone}`}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all"
                >
                  <IconPhone className="w-4 h-4" />
                  Call Us
                </a>
              </div>
            </motion.div>

            {/* Right: Wait Time Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-sm">
                {/* Glow behind card */}
                <div className="absolute -inset-4 bg-gradient-to-r from-[#DC2626]/20 to-blue-500/20 rounded-3xl blur-xl" />

                <div className="relative bg-white rounded-2xl p-8 shadow-2xl">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-30" />
                        <span className="relative block w-3 h-3 bg-green-500 rounded-full" />
                      </div>
                      <span className="text-sm font-semibold text-green-600">Live Wait Time</span>
                    </div>
                    <IconClock className="w-5 h-5 text-slate-400" />
                  </div>

                  {/* Time display */}
                  <div className="text-center">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-7xl font-bold text-[#1A2744] tabular-nums tracking-tight">
                        {waitTime}
                      </span>
                      <span className="text-2xl font-semibold text-slate-400">min</span>
                    </div>
                    <p className="mt-2 text-sm text-slate-500">Average current wait</p>
                  </div>

                  {/* Divider */}
                  <div className="my-6 h-px bg-slate-100" />

                  {/* Quick info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">Patients</p>
                      <p className="mt-1 text-lg font-bold text-[#1A2744]">3 ahead</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">Status</p>
                      <p className="mt-1 text-lg font-bold text-green-600">On track</p>
                    </div>
                  </div>

                  {/* CTA */}
                  <a
                    href="#visit"
                    className="mt-6 flex items-center justify-center gap-2 w-full py-3 bg-[#1A2744] text-white text-sm font-semibold rounded-xl hover:bg-[#243457] transition-colors"
                  >
                    Reserve Your Spot
                    <IconArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Conditions We Treat ────────────────────────────────────── */}
      <section id="treatments" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-3 py-1 bg-red-50 text-[#DC2626] text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
              Conditions We Treat
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A2744] tracking-tight">
              Fast, expert care for common issues
            </h2>
            <p className="mt-4 text-lg text-[#64748B] max-w-2xl mx-auto">
              From minor injuries to sudden illness — our providers handle it all with same-day treatment.
            </p>
          </motion.div>

          {/* Category tabs */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex p-1 bg-slate-100 rounded-xl">
              {treatmentCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                    activeCategory === cat
                      ? 'bg-white text-[#1A2744] shadow-sm'
                      : 'text-[#64748B] hover:text-[#1A2744]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Treatment grid */}
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredTreatments.map((treatment, i) => {
                const IconComp = treatmentIconMap[treatment.icon] || IconHeart
                return (
                  <motion.div
                    key={treatment.title}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="group p-6 bg-[#F8FAFC] rounded-2xl border border-slate-100 hover:border-[#DC2626]/20 hover:shadow-lg hover:shadow-red-50 transition-all cursor-default"
                  >
                    <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center text-[#DC2626] group-hover:bg-[#DC2626] group-hover:text-white transition-colors shadow-sm mb-4">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-[#1A2744] mb-2">{treatment.title}</h3>
                    <p className="text-sm text-[#64748B] leading-relaxed">{treatment.description}</p>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ─── Visit Options ──────────────────────────────────────────── */}
      <section id="visit" className="py-20 lg:py-28 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-3 py-1 bg-red-50 text-[#DC2626] text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
              Visit Options
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A2744] tracking-tight">
              How would you like to visit?
            </h2>
            <p className="mt-4 text-lg text-[#64748B] max-w-2xl mx-auto">
              Choose the option that works best for you. All visits receive the same high-quality care.
            </p>
          </motion.div>

          {/* Tab buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {visitOptions.map((option, i) => (
              <button
                key={option.title}
                onClick={() => setActiveVisit(i)}
                className={`px-5 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                  activeVisit === i
                    ? 'bg-[#1A2744] text-white shadow-lg shadow-navy/20'
                    : 'bg-white text-[#64748B] border border-slate-200 hover:border-slate-300 hover:text-[#1A2744]'
                }`}
              >
                {option.title}
              </button>
            ))}
          </div>

          {/* Active tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeVisit}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-slate-100">
                <div className="flex items-start gap-5">
                  <div className="shrink-0 w-14 h-14 bg-[#F8FAFC] rounded-2xl flex items-center justify-center text-[#DC2626]">
                    {(() => {
                      const IconComp = visitIconMap[visitOptions[activeVisit].title] || IconUserCheck
                      return <IconComp className="w-7 h-7" />
                    })()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-[#1A2744]">
                        {visitOptions[activeVisit].title}
                      </h3>
                      {visitOptions[activeVisit].badge && (
                        <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full ${
                          visitOptions[activeVisit].badge === 'Coming Soon'
                            ? 'bg-amber-50 text-amber-600'
                            : visitOptions[activeVisit].badge === 'Free'
                            ? 'bg-green-50 text-green-600'
                            : 'bg-blue-50 text-blue-600'
                        }`}>
                          {visitOptions[activeVisit].badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[#64748B] leading-relaxed mb-6">
                      {visitOptions[activeVisit].description}
                    </p>
                    <a
                      href={`tel:${siteInfo.phone}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#DC2626] hover:text-red-700 transition-colors"
                    >
                      Get started
                      <IconArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ─── How It Works ───────────────────────────────────────────── */}
      <section id="how-it-works" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-3 py-1 bg-red-50 text-[#DC2626] text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A2744] tracking-tight">
              Four simple steps to feeling better
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting line (desktop only) */}
            <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            {howItWorksSteps.map((step, i) => {
              const IconComp = stepIconMap[step.icon] || IconCheckCircle
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="relative text-center"
                >
                  {/* Step number circle */}
                  <div className="relative inline-flex items-center justify-center mb-6">
                    <div className="w-16 h-16 bg-[#F8FAFC] rounded-2xl flex items-center justify-center border border-slate-100">
                      <IconComp className="w-7 h-7 text-[#DC2626]" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-7 h-7 bg-[#1A2744] text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-bold text-[#1A2744] text-lg mb-2">{step.step}</h3>
                  <p className="text-sm text-[#64748B] leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── Pricing & Insurance ────────────────────────────────────── */}
      <section id="pricing" className="py-20 lg:py-28 bg-[#1A2744]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <span className="inline-block px-3 py-1 bg-white/10 text-white/80 text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
              Transparent Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Know what you'll pay — before you visit
            </h2>
            <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
              No surprise bills. Our self-pay prices are posted so you can make informed decisions.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-10 items-start">
            {/* Pricing table */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                {/* Table header */}
                <div className="grid grid-cols-2 px-6 py-4 border-b border-white/10">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Service</span>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Price</span>
                </div>

                {/* Table rows */}
                <div className="divide-y divide-white/5">
                  {visiblePricing.map((item, i) => (
                    <motion.div
                      key={item.service}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="grid grid-cols-2 px-6 py-4 hover:bg-white/5 transition-colors"
                    >
                      <span className="text-white/90 font-medium text-sm">{item.service}</span>
                      <span className="text-white font-bold text-sm text-right tabular-nums">{item.price}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Expand/collapse */}
                {pricingItems.length > 5 && (
                  <button
                    onClick={() => setPricingExpanded(!pricingExpanded)}
                    className="w-full px-6 py-4 flex items-center justify-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors border-t border-white/5"
                  >
                    {pricingExpanded ? 'Show less' : `Show all ${pricingItems.length} services`}
                    <IconChevronDown
                      className={`w-4 h-4 transition-transform ${pricingExpanded ? 'rotate-180' : ''}`}
                    />
                  </button>
                )}
              </div>
            </motion.div>

            {/* Insurance section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#DC2626]/20 rounded-xl flex items-center justify-center">
                    <IconShield className="w-5 h-5 text-[#DC2626]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Accepted Insurance</h3>
                    <p className="text-xs text-slate-400">We work with most major plans</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {acceptedInsurances.map((ins) => (
                    <span
                      key={ins}
                      className="px-3 py-1.5 bg-white/10 text-white/80 text-xs font-medium rounded-lg border border-white/5"
                    >
                      {ins}
                    </span>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Don't see your plan? Call us — we likely still accept it or can offer affordable self-pay options.
                  </p>
                  <a
                    href={`tel:${siteInfo.phone}`}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#DC2626] hover:text-red-400 transition-colors"
                  >
                    <IconPhone className="w-4 h-4" />
                    {siteInfo.phone}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Reviews ────────────────────────────────────────────────── */}
      <section id="reviews" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <span className="inline-block px-3 py-1 bg-red-50 text-[#DC2626] text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
              Patient Reviews
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A2744] tracking-tight">
              What our patients say
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {reviews.map((review, i) => (
              <motion.div
                key={review.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-6 bg-[#F8FAFC] rounded-2xl border border-slate-100 flex flex-col"
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <IconStar
                      key={idx}
                      className={`w-4 h-4 ${idx < review.rating ? 'text-amber-400' : 'text-slate-200'}`}
                      filled={idx < review.rating}
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm text-[#64748B] leading-relaxed flex-1 mb-4">
                  "{review.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-8 h-8 bg-[#1A2744] rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {review.author.charAt(0)}
                  </div>
                  <span className="text-sm font-semibold text-[#1A2744]">{review.author}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Hours & Location ───────────────────────────────────────── */}
      <section id="hours" className="py-20 lg:py-28 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <span className="inline-block px-3 py-1 bg-red-50 text-[#DC2626] text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
              Visit Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A2744] tracking-tight">
              Hours & Location
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Address card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm"
            >
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-[#DC2626] mb-5">
                <IconMapPin className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[#1A2744] text-lg mb-3">Our Location</h3>
              <p className="text-[#64748B] leading-relaxed mb-4">{siteInfo.address}</p>
              <div className="space-y-2">
                <a
                  href={`tel:${siteInfo.phone}`}
                  className="flex items-center gap-2 text-sm text-[#64748B] hover:text-[#DC2626] transition-colors"
                >
                  <IconPhone className="w-4 h-4" />
                  {siteInfo.phone}
                </a>
                <a
                  href={`mailto:${siteInfo.email}`}
                  className="flex items-center gap-2 text-sm text-[#64748B] hover:text-[#DC2626] transition-colors"
                >
                  <IconMail className="w-4 h-4" />
                  {siteInfo.email}
                </a>
              </div>
            </motion.div>

            {/* Hours card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm"
            >
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-[#DC2626] mb-5">
                <IconClock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[#1A2744] text-lg mb-3">Hours of Operation</h3>
              <div className="space-y-3">
                {Object.entries(siteInfo.hours).map(([day, time]) => (
                  <div key={day} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#1A2744]">{day}</span>
                    <span className="text-sm text-[#64748B] tabular-nums">{time}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                  </span>
                  <span className="text-xs font-medium text-green-600">Currently Open</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Final CTA ──────────────────────────────────────────────── */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A2744] tracking-tight">
              Need care today?
            </h2>
            <p className="mt-4 text-lg text-[#64748B] max-w-xl mx-auto">
              No appointment necessary. Walk in or check in online to skip the wait.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <a
                href="#visit"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#DC2626] text-white font-semibold rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-200 hover:-translate-y-0.5"
              >
                Check In Online
                <IconArrowRight className="w-4 h-4" />
              </a>
              <a
                href={`tel:${siteInfo.phone}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1A2744] text-white font-semibold rounded-xl hover:bg-[#243457] transition-all"
              >
                <IconPhone className="w-4 h-4" />
                {siteInfo.phone}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ─────────────────────────────────────────────────── */}
      <footer className="bg-[#1A2744] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 bg-[#DC2626] rounded-lg flex items-center justify-center">
                  <IconPulse className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg text-white">
                  Pulse<span className="text-[#DC2626]">Point</span> Urgent Care
                </span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                {siteInfo.description}
              </p>
              {/* Social */}
              <div className="flex gap-3 mt-5">
                <a
                  href={siteInfo.social.facebook}
                  className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Facebook"
                >
                  <IconFacebook className="w-4 h-4" />
                </a>
                <a
                  href={siteInfo.social.twitter}
                  className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Twitter"
                >
                  <IconTwitter className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="font-semibold text-white text-sm mb-4">Quick Links</h4>
              <ul className="space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white text-sm mb-4">Contact</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href={`tel:${siteInfo.phone}`}
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    <IconPhone className="w-4 h-4 shrink-0" />
                    {siteInfo.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${siteInfo.email}`}
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    <IconMail className="w-4 h-4 shrink-0" />
                    {siteInfo.email}
                  </a>
                </li>
                <li>
                  <span className="flex items-start gap-2 text-sm text-slate-400">
                    <IconMapPin className="w-4 h-4 shrink-0 mt-0.5" />
                    {siteInfo.address}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} {siteInfo.name}. All rights reserved.
            </p>
            <p className="text-xs text-slate-500">
              For emergencies, call 911.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
