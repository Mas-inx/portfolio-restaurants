import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  siteInfo,
  services,
  stormSteps,
  repairSigns,
  beforeAfterRepairs,
  trustPoints,
  navLinks,
} from './data'

// ─── Color Tokens ────────────────────────────────────────────────────────────
const C = {
  navy: '#1E3A5F',
  navyDark: '#132842',
  red: '#DC2626',
  redDark: '#B91C1C',
  warmGrey: '#F3F0EB',
  white: '#FFFFFF',
  textDark: '#1a1a2e',
  textMuted: '#4a5568',
}

// ─── Inline SVG Icons ────────────────────────────────────────────────────────
const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l8 4v6c0 5.25-3.5 9.74-8 11-4.5-1.26-8-5.75-8-11V6l8-4z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
  </svg>
)

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
)

const AlertIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
)

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
)

const RoofIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l9.75-8.25 9.75 8.25M4.5 10.5v9.75a.75.75 0 00.75.75h13.5a.75.75 0 00.75-.75V10.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20.25V14.25a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75v6" />
  </svg>
)

const WrenchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.384 5.383a1.5 1.5 0 01-2.12-2.121l5.383-5.383m0 0l1.06-1.06m-1.06 1.06L5.58 9.53a5.25 5.25 0 017.424-7.424l1.06 1.06 2.122-2.12a1.5 1.5 0 012.12 2.12l-2.12 2.122 1.06 1.06a5.25 5.25 0 01-7.424 7.424" />
  </svg>
)

const BoltIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
)

const StarIcon = ({ filled = true }: { filled?: boolean }) => (
  <svg viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>
)

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
)

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
)

const DocumentIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
)

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l9.75-8.25 9.75 8.25M4.5 10.5v9.75a.75.75 0 00.75.75h2.25" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5v9.75a.75.75 0 01-.75.75h-2.25M9 20.25V14.25a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75v6" />
  </svg>
)

const GutterIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 7v4a2 2 0 002 2h14a2 2 0 002-2V7M7 13v5a2 2 0 002 2h6a2 2 0 002-2v-5" />
  </svg>
)

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
)

const serviceIcons = [WrenchIcon, RoofIcon, GutterIcon, HomeIcon, BoltIcon, SearchIcon]

// ─── Animated Counter ────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = '', duration = 2 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = target / (duration * 60)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [inView, target, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

// ─── Section Wrapper ─────────────────────────────────────────────────────────
function Section({ children, id, className = '' }: { children: React.ReactNode; id?: string; className?: string }) {
  return (
    <section id={id} className={`py-20 md:py-28 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  )
}

// ─── Navigation ──────────────────────────────────────────────────────────────
function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className={`p-2 rounded-lg ${scrolled ? 'bg-[#1E3A5F]' : 'bg-white/20 backdrop-blur-sm'}`}>
              <div className={scrolled ? 'text-white' : 'text-white'}>
                <RoofIcon />
              </div>
            </div>
            <div className="flex flex-col">
              <span className={`font-bold text-lg leading-tight ${scrolled ? 'text-[#1E3A5F]' : 'text-white'}`}>
                RapidRoof
              </span>
              <span className={`text-[10px] uppercase tracking-widest ${scrolled ? 'text-[#DC2626]' : 'text-white/80'}`}>
                & Exteriors
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.slice(0, 5).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-[#DC2626] ${
                  scrolled ? 'text-[#1E3A5F]' : 'text-white/90'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href={`tel:${siteInfo.emergencyPhone.replace(/[^0-9]/g, '')}`}
              className="flex items-center gap-2 bg-[#DC2626] text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-[#B91C1C] transition-colors shadow-lg shadow-red-500/20"
            >
              <PhoneIcon />
              <span className="hidden xl:inline">{siteInfo.emergencyPhone}</span>
              <span className="xl:hidden">24/7</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 rounded-lg ${scrolled ? 'text-[#1E3A5F]' : 'text-white'}`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t shadow-xl"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-[#1E3A5F] font-medium rounded-lg hover:bg-[#F3F0EB] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={`tel:${siteInfo.emergencyPhone.replace(/[^0-9]/g, '')}`}
                className="flex items-center justify-center gap-2 bg-[#DC2626] text-white px-4 py-3 rounded-lg font-bold mt-4"
              >
                <PhoneIcon />
                {siteInfo.emergencyPhone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

// ─── Hero Section ────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#1E3A5F]">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.03) 35px, rgba(255,255,255,0.03) 70px)`,
        }} />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A5F] via-[#1E3A5F]/95 to-[#132842]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Emergency badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-[#DC2626]/20 border border-[#DC2626]/40 text-[#DC2626] px-4 py-2 rounded-full text-sm font-semibold mb-6"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DC2626] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#DC2626]"></span>
              </span>
              24/7 Emergency Response
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
              {siteInfo.tagline.split(' ').slice(0, 3).join(' ')}{' '}
              <span className="text-[#DC2626]">{siteInfo.tagline.split(' ').slice(3, 5).join(' ')}</span>{' '}
              {siteInfo.tagline.split(' ').slice(5).join(' ')}
            </h1>

            <p className="text-lg text-white/70 mb-8 max-w-lg">
              Chicago's trusted roofing experts. When water is dripping through your ceiling, we're already on the way.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a
                href={`tel:${siteInfo.emergencyPhone.replace(/[^0-9]/g, '')}`}
                className="group flex items-center justify-center gap-3 bg-[#DC2626] text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#B91C1C] transition-all shadow-xl shadow-red-900/30 hover:shadow-red-900/50 hover:-translate-y-0.5"
              >
                <PhoneIcon />
                <div className="text-left">
                  <div className="text-xs font-normal opacity-80">Emergency Line</div>
                  <div>{siteInfo.emergencyPhone}</div>
                </div>
              </a>
              <a
                href="#contact"
                className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/20 transition-all"
              >
                <DocumentIcon />
                Free Estimate
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 items-center">
              <div className="flex items-center gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} filled={i < Math.floor(siteInfo.rating)} />
                ))}
                <span className="text-white font-bold ml-2">{siteInfo.rating}</span>
              </div>
              <div className="h-6 w-px bg-white/20" />
              <div className="text-white/70 text-sm">
                <span className="text-white font-bold"><AnimatedCounter target={siteInfo.reviews} suffix="+" /></span> Reviews
              </div>
              <div className="h-6 w-px bg-white/20" />
              <div className="text-white/70 text-sm">
                <span className="text-white font-bold"><AnimatedCounter target={siteInfo.yearsExperience} /></span> Years Exp.
              </div>
            </div>
          </motion.div>

          {/* Right: Before/After image collage */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
                <img
                  src={beforeAfterRepairs[0].after}
                  alt="Completed roof project"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute top-4 left-4 bg-[#1E3A5F]/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  AFTER
                </div>
              </div>

              {/* Floating card - before image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -bottom-8 -left-8 w-52 rounded-xl overflow-hidden shadow-xl border-2 border-white/20"
              >
                <img
                  src={beforeAfterRepairs[0].before}
                  alt="Before repair"
                  className="w-full h-32 object-cover"
                />
                <div className="absolute top-2 left-2 bg-[#DC2626]/90 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                  BEFORE
                </div>
              </motion.div>

              {/* Floating stats card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <ShieldIcon />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#1E3A5F]">Licensed & Insured</div>
                    <div className="text-xs text-[#4a5568]">{siteInfo.license}</div>
                  </div>
                </div>
              </motion.div>

              {/* Response time card */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="absolute bottom-4 -right-6 bg-[#DC2626] rounded-xl p-4 shadow-xl text-white"
              >
                <div className="flex items-center gap-2">
                  <ClockIcon />
                  <div>
                    <div className="text-sm font-bold">4-Hour Response</div>
                    <div className="text-xs opacity-80">Emergency tarping</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" className="w-full">
          <path d="M0 40L48 35C96 30 192 20 288 22C384 24 480 38 576 42C672 46 768 40 864 35C960 30 1056 26 1152 28C1248 30 1344 38 1392 42L1440 46V80H0V40Z" fill={C.warmGrey} />
        </svg>
      </div>
    </section>
  )
}

// ─── Services Section ────────────────────────────────────────────────────────
function Services() {
  return (
    <Section id="services" className="bg-[#F3F0EB]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 bg-[#1E3A5F]/10 text-[#1E3A5F] px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <ShieldIcon />
          Our Services
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E3A5F] mb-4">
          Complete Roofing & Exterior Solutions
        </h2>
        <p className="text-lg text-[#4a5568] max-w-2xl mx-auto">
          From emergency repairs to full replacements, we handle every aspect of your roof and exterior with precision.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, i) => {
          const Icon = serviceIcons[i]
          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border ${
                service.urgent ? 'border-[#DC2626]/30 ring-1 ring-[#DC2626]/10' : 'border-gray-100'
              }`}
            >
              {service.urgent && (
                <div className="absolute -top-3 right-4 bg-[#DC2626] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 animate-pulse">
                  <AlertIcon />
                  URGENT
                </div>
              )}

              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                service.urgent ? 'bg-[#DC2626]/10 text-[#DC2626]' : 'bg-[#1E3A5F]/10 text-[#1E3A5F]'
              }`}>
                <Icon />
              </div>

              <h3 className="text-xl font-bold text-[#1E3A5F] mb-2">{service.title}</h3>
              <p className="text-[#4a5568] text-sm mb-4 leading-relaxed">{service.description}</p>

              <ul className="space-y-2">
                {service.checks.map((check) => (
                  <li key={check} className="flex items-start gap-2 text-sm text-[#4a5568]">
                    <span className={`mt-0.5 flex-shrink-0 ${service.urgent ? 'text-[#DC2626]' : 'text-green-600'}`}>
                      <CheckIcon />
                    </span>
                    {check}
                  </li>
                ))}
              </ul>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}

// ─── Storm Response Section ──────────────────────────────────────────────────
function StormResponse() {
  return (
    <Section id="storm" className="bg-[#1E3A5F] relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#DC2626]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl" />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#DC2626]/20 border border-[#DC2626]/30 text-[#DC2626] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <BoltIcon />
            Storm Damage Response
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            When Storms Hit, We Respond
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Our emergency storm response team is ready 24/7. From first call to final repair, we handle everything.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#DC2626] via-[#DC2626]/50 to-[#DC2626] -translate-y-1/2" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stormSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
                  {/* Step number */}
                  <div className="relative z-10 w-12 h-12 bg-[#DC2626] rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 shadow-lg shadow-red-900/30">
                    {step.step}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
                </div>

                {/* Arrow connector for mobile */}
                {i < stormSteps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-2">
                    <svg className="w-6 h-6 text-[#DC2626]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href={`tel:${siteInfo.emergencyPhone.replace(/[^0-9]/g, '')}`}
            className="inline-flex items-center gap-3 bg-[#DC2626] text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#B91C1C] transition-all shadow-xl shadow-red-900/40 hover:-translate-y-0.5"
          >
            <PhoneIcon />
            Call Now: {siteInfo.emergencyPhone}
          </a>
        </motion.div>
      </div>
    </Section>
  )
}

// ─── Before & After Section ──────────────────────────────────────────────────
function BeforeAfter() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <Section id="portfolio" className="bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 bg-[#1E3A5F]/10 text-[#1E3A5F] px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <RoofIcon />
          Our Work
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E3A5F] mb-4">
          Before & After Transformations
        </h2>
        <p className="text-lg text-[#4a5568] max-w-2xl mx-auto">
          Real projects from Chicago neighborhoods. Hover to see the transformation.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {beforeAfterRepairs.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
          >
            {/* After image (default) */}
            <div className="relative aspect-[4/3]">
              <img
                src={project.after}
                alt={`${project.title} - After`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Before image (revealed on hover) */}
              <motion.img
                src={project.before}
                alt={`${project.title} - Before`}
                className="absolute inset-0 w-full h-full object-cover"
                initial={false}
                animate={{
                  clipPath: hoveredIndex === i
                    ? 'inset(0 50% 0 0)'
                    : 'inset(0 100% 0 0)',
                }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              />

              {/* Labels */}
              <div className="absolute top-3 left-3 bg-[#DC2626] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                BEFORE
              </div>
              <div className="absolute top-3 right-3 bg-[#1E3A5F] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                AFTER
              </div>

              {/* Hover indicator */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <div className="text-white text-xs font-medium opacity-70 mb-1">Hover to reveal before</div>
              </div>
            </div>

            {/* Info card */}
            <div className="bg-white p-5">
              <h3 className="text-lg font-bold text-[#1E3A5F] mb-1">{project.title}</h3>
              <p className="text-sm text-[#4a5568] leading-relaxed">{project.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

// ─── Signs You Need Repair ───────────────────────────────────────────────────
function RepairSigns() {
  const severityStyles = {
    critical: { border: 'border-[#DC2626]', bg: 'bg-[#DC2626]/5', badge: 'bg-[#DC2626]', label: 'CRITICAL' },
    high: { border: 'border-orange-500', bg: 'bg-orange-50', badge: 'bg-orange-500', label: 'HIGH' },
    medium: { border: 'border-yellow-500', bg: 'bg-yellow-50', badge: 'bg-yellow-500', label: 'MODERATE' },
  }

  return (
    <Section id="signs" className="bg-[#F3F0EB]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 bg-[#DC2626]/10 text-[#DC2626] px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <AlertIcon />
          Warning Signs
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E3A5F] mb-4">
          Signs You Need a Roof Repair
        </h2>
        <p className="text-lg text-[#4a5568] max-w-2xl mx-auto">
          Don't wait until a small problem becomes a $20,000 emergency. Here's what to look for.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {repairSigns.map((sign, i) => {
          const style = severityStyles[sign.severity]
          return (
            <motion.div
              key={sign.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative bg-white rounded-2xl p-6 border-l-4 ${style.border} shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
            >
              {/* Severity badge */}
              <div className={`inline-flex items-center gap-1 ${style.badge} text-white text-[10px] font-bold px-2.5 py-1 rounded-full mb-3`}>
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                {style.label}
              </div>

              <h3 className="text-lg font-bold text-[#1E3A5F] mb-2">{sign.title}</h3>
              <p className="text-sm text-[#4a5568] leading-relaxed">{sign.description}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Bottom note */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <p className="text-[#4a5568] mb-4">
          Noticed any of these signs? Don't wait — get a free inspection today.
        </p>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 bg-[#1E3A5F] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#132842] transition-colors"
        >
          <DocumentIcon />
          Schedule Free Inspection
        </a>
      </motion.div>
    </Section>
  )
}

// ─── Why Choose Us ───────────────────────────────────────────────────────────
function WhyChooseUs() {
  const trustIcons = [ShieldIcon, DocumentIcon, RoofIcon, SearchIcon]

  return (
    <Section id="trust" className="bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 bg-[#1E3A5F]/10 text-[#1E3A5F] px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <ShieldIcon />
          Why Homeowners Trust Us
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E3A5F] mb-4">
          The RapidRoof Difference
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {trustPoints.map((point, i) => {
          const Icon = trustIcons[i]
          return (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center group"
            >
              <div className="w-16 h-16 mx-auto bg-[#1E3A5F]/10 rounded-2xl flex items-center justify-center text-[#1E3A5F] mb-4 group-hover:bg-[#1E3A5F] group-hover:text-white transition-all duration-300 group-hover:scale-110">
                <Icon />
              </div>
              <h3 className="text-lg font-bold text-[#1E3A5F] mb-2">{point.title}</h3>
              <p className="text-sm text-[#4a5568] leading-relaxed">{point.description}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 bg-[#1E3A5F] rounded-2xl p-8 grid grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {[
          { value: siteInfo.yearsExperience, suffix: '+', label: 'Years Experience' },
          { value: 500, suffix: '+', label: 'Roofs Completed' },
          { value: siteInfo.rating, suffix: '', label: 'Average Rating' },
          { value: siteInfo.reviews, suffix: '+', label: 'Happy Customers' },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
            </div>
            <div className="text-sm text-white/60">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </Section>
  )
}

// ─── Emergency CTA Section ───────────────────────────────────────────────────
function EmergencyCTA() {
  return (
    <section id="contact" className="relative bg-[#DC2626] overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 40px)`,
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: CTA text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
              </span>
              Available Now
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Water Coming Through Your Ceiling?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-lg">
              Don't wait. Every minute counts when water is entering your home. Our emergency team is standing by right now.
            </p>

            <a
              href={`tel:${siteInfo.emergencyPhone.replace(/[^0-9]/g, '')}`}
              className="inline-flex items-center gap-3 bg-white text-[#DC2626] px-8 py-5 rounded-xl text-xl font-bold hover:bg-white/90 transition-all shadow-2xl hover:-translate-y-1"
            >
              <PhoneIcon />
              {siteInfo.emergencyPhone}
            </a>
          </motion.div>

          {/* Right: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <PhoneIcon />
                </div>
                <div>
                  <div className="text-xs text-white/60">Regular Line</div>
                  <div className="font-semibold">{siteInfo.phone}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-white">
                <div className="w-10 h-10 bg-[#B91C1C] rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertIcon />
                </div>
                <div>
                  <div className="text-xs text-white/60">Emergency (24/7)</div>
                  <div className="font-semibold">{siteInfo.emergencyPhone}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-white">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MailIcon />
                </div>
                <div>
                  <div className="text-xs text-white/60">Email</div>
                  <div className="font-semibold">{siteInfo.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-white">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPinIcon />
                </div>
                <div>
                  <div className="text-xs text-white/60">Office</div>
                  <div className="font-semibold">{siteInfo.address}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-white">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <DocumentIcon />
                </div>
                <div>
                  <div className="text-xs text-white/60">License</div>
                  <div className="font-semibold">{siteInfo.license}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#132842] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-white/10 rounded-lg">
                <RoofIcon />
              </div>
              <div>
                <span className="font-bold text-lg">RapidRoof</span>
                <span className="text-[#DC2626] text-xs ml-1">& Exteriors</span>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-4 max-w-sm">
              Chicago's trusted roofing contractor since 2011. Licensed, insured, and committed to protecting your home with quality craftsmanship.
            </p>
            <div className="flex items-center gap-1 text-yellow-400 mb-2">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} filled={i < Math.floor(siteInfo.rating)} />
              ))}
              <span className="text-white font-bold ml-2 text-sm">{siteInfo.rating}/5</span>
            </div>
            <p className="text-white/50 text-xs">Based on {siteInfo.reviews}+ verified reviews</p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-white/80">Services</h4>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.title}>
                  <a href="#services" className="text-sm text-white/60 hover:text-white transition-colors">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-white/80">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-white/60">
                <PhoneIcon />
                {siteInfo.phone}
              </li>
              <li className="flex items-center gap-2 text-sm text-white/60">
                <AlertIcon />
                <span className="text-[#DC2626] font-semibold">{siteInfo.emergencyPhone}</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/60">
                <MailIcon />
                {siteInfo.email}
              </li>
              <li className="flex items-start gap-2 text-sm text-white/60">
                <MapPinIcon />
                {siteInfo.address}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} {siteInfo.name}. All rights reserved. License: {siteInfo.license}
          </p>
          <div className="flex items-center gap-4 text-sm text-white/40">
            <span>Serving Chicagoland</span>
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            <span>24/7 Emergency Service</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── Main App ────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <Services />
      <StormResponse />
      <BeforeAfter />
      <RepairSigns />
      <WhyChooseUs />
      <EmergencyCTA />
      <Footer />
    </div>
  )
}
