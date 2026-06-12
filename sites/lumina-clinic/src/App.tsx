import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  siteInfo,
  navLinks,
  services,
  appointmentSteps,
  providers,
  insuranceList,
  experienceItems,
} from './data'

/* ─── Color Tokens ─── */
// Sage: #7BA88F | Cream: #FFF9F2 | Warm grey: #6B7280 | Deep teal: #2C4A3E

/* ─── Inline SVG Icons ─── */
const iconColor = '#7BA88F'
const iconColorDark = '#2C4A3E'

function IconStethoscope({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 8a6 6 0 016-6 6 6 0 016 6" /><path d="M16 8v2a4 4 0 01-8 0V8" /><path d="M8 19a5 5 0 0010 0" /><circle cx="19" cy="16" r="2" />
    </svg>
  )
}
function IconShield({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}
function IconClipboard({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    </svg>
  )
}
function IconBaby({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="9" r="5" /><path d="M12 14c-4 0-6 2-8 4" /><path d="M9 7a1 1 0 012 0v1a1 1 0 01-2 0V7z" /><path d="M14 8a1 1 0 00-2 0v1a1 1 0 002 0V8z" />
    </svg>
  )
}
function IconFlower({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" /><path d="M12 1v4" /><path d="M12 19v4" /><path d="M4.22 4.22l2.83 2.83" /><path d="M16.95 16.95l2.83 2.83" /><path d="M1 12h4" /><path d="M19 12h4" /><path d="M4.22 19.78l2.83-2.83" /><path d="M16.95 7.05l2.83-2.83" />
    </svg>
  )
}
function IconMicroscope({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 18h8" /><path d="M3 22h18" /><path d="M14 22a7 7 0 100-14h-1" /><path d="M9 14h2" /><path d="M9 12h2" /><path d="M7 2h6a2 2 0 012 2v2a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2z" />
    </svg>
  )
}
function IconPhone({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><path d="M12 18h.01" />
    </svg>
  )
}
function IconBell({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  )
}
function IconChat({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  )
}
function IconLock({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  )
}
function IconMapPin({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={iconColorDark} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  )
}
function IconClock({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={iconColorDark} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  )
}
function IconMail({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
    </svg>
  )
}
function IconPhoneCall({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  )
}
function IconCheck({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
function IconX({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}
function IconArrowRight({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

function iconFromId(id: string): React.ReactNode {
  switch (id) {
    case 'stethoscope': return <IconStethoscope />
    case 'shield': return <IconShield />
    case 'clipboard': return <IconClipboard />
    case 'baby': return <IconBaby />
    case 'flower': return <IconFlower />
    case 'microscope': return <IconMicroscope />
    case 'phone': return <IconPhone />
    case 'bell': return <IconBell />
    case 'chat': return <IconChat />
    case 'lock': return <IconLock />
    default: return <IconStethoscope />
  }
}

/* ─── Animation Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
}

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

/* ─── Navbar ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-[#FFF9F2]/95 shadow-sm backdrop-blur-md' : 'bg-transparent'
    }`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 text-lg font-semibold tracking-tight text-[#2C4A3E]">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#7BA88F]/15">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7BA88F" strokeWidth="2" strokeLinecap="round">
              <path d="M12 3v18M3 12h18" />
            </svg>
          </div>
          <span className="hidden sm:inline">{siteInfo.name}</span>
        </button>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((l) => (
            <button key={l.href} onClick={() => scrollTo(l.href)}
              className="text-sm font-medium text-[#6B7280] transition-colors hover:text-[#2C4A3E]">
              {l.label}
            </button>
          ))}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo('#cta')}
            className="rounded-full bg-[#7BA88F] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#7BA88F]/20 transition-all hover:bg-[#6B9A7F] hover:shadow-lg">
            Book a Visit
          </motion.button>
        </div>

        <button className="md:hidden p-2" onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2C4A3E" strokeWidth="2" strokeLinecap="round">
            {menuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-[#FFF9F2] border-t border-[#7BA88F]/10 md:hidden">
            <div className="flex flex-col gap-1 px-6 pb-6 pt-3">
              {navLinks.map((l) => (
                <button key={l.href} onClick={() => scrollTo(l.href)}
                  className="rounded-xl px-4 py-3 text-left text-sm font-medium text-[#6B7280] hover:bg-[#7BA88F]/5 hover:text-[#2C4A3E] transition-colors">
                  {l.label}
                </button>
              ))}
              <button onClick={() => scrollTo('#cta')}
                className="mt-3 rounded-full bg-[#7BA88F] px-5 py-3 text-sm font-semibold text-white text-center">
                Book a Visit
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#FFF9F2] pt-24 pb-16">
      {/* Warm background shapes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#7BA88F]/8 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-[#7BA88F]/5 blur-3xl" />
        <div className="absolute top-1/3 left-1/2 w-64 h-64 rounded-full bg-[#FFF9F2] blur-2xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8 w-full">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Copy */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="text-center lg:text-left"
          >
            <motion.div variants={fadeUp} custom={0}
              className="inline-flex items-center gap-2 rounded-full bg-[#7BA88F]/10 px-4 py-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#7BA88F] animate-pulse" />
              <span className="text-xs font-semibold text-[#2C4A3E] tracking-wide">Accepting new patients</span>
            </motion.div>

            <motion.h1 variants={fadeUp} custom={1}
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-tight text-[#2C4A3E]">
              {siteInfo.tagline}
            </motion.h1>

            <motion.p variants={fadeUp} custom={2}
              className="mt-6 text-lg leading-relaxed text-[#6B7280] max-w-lg mx-auto lg:mx-0">
              {siteInfo.description}
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' })}
                className="group flex items-center gap-2 rounded-full bg-[#7BA88F] px-7 py-4 text-base font-semibold text-white shadow-lg shadow-[#7BA88F]/25 transition-all hover:bg-[#6B9A7F] hover:shadow-xl hover:shadow-[#7BA88F]/30">
                Schedule Your Visit
                <IconArrowRight size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
                className="rounded-full border-2 border-[#7BA88F]/20 bg-white/60 px-7 py-4 text-base font-semibold text-[#2C4A3E] backdrop-blur-sm transition-all hover:border-[#7BA88F]/40 hover:bg-white">
                See Our Services
              </motion.button>
            </motion.div>

            <motion.div variants={fadeUp} custom={4} className="mt-10 flex items-center gap-6 justify-center lg:justify-start text-sm text-[#6B7280]">
              <span className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7BA88F" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                No referral needed
              </span>
              <span className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7BA88F" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                Same-week availability
              </span>
            </motion.div>
          </motion.div>

          {/* Right: Warm image card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] as const }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Main image */}
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-[#2C4A3E]/10">
                <img
                  src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&h=700&fit=crop"
                  alt="Warm clinic environment"
                  className="w-full h-[480px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C4A3E]/20 to-transparent" />
              </div>

              {/* Floating appointment card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-6 -left-6 rounded-2xl bg-white p-5 shadow-xl shadow-[#2C4A3E]/10 border border-[#7BA88F]/10"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7BA88F]/10">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7BA88F" strokeWidth="2" strokeLinecap="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#2C4A3E]">Next available</p>
                    <p className="text-sm font-bold text-[#7BA88F]">Tomorrow at 9:00 AM</p>
                  </div>
                </div>
              </motion.div>

              {/* Decorative circle */}
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-[#7BA88F]/10 -z-10" />
              <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-[#7BA88F]/5 -z-10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─── Services ─── */
function Services() {
  return (
    <section id="services" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#7BA88F] mb-3">What we do</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2C4A3E]">
            Care for your whole family
          </h2>
          <p className="mt-4 text-lg text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
            From your first checkup to managing long-term health, we're here for every stage of life.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              variants={fadeUp}
              custom={i}
              whileHover="hover"
              initial="rest"
              animate="rest"
              className="group relative rounded-3xl bg-[#FFF9F2] p-7 border border-[#7BA88F]/8 transition-all hover:shadow-lg hover:shadow-[#7BA88F]/8 hover:border-[#7BA88F]/20"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm mb-5 group-hover:shadow-md transition-shadow">
                {iconFromId(s.icon)}
              </div>
              <h3 className="text-lg font-semibold text-[#2C4A3E] mb-2">{s.title}</h3>
              <p className="text-sm leading-relaxed text-[#6B7280]">{s.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ─── How Appointments Work ─── */
function AppointmentFlow() {
  return (
    <section id="appointments" className="bg-[#FFF9F2] py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#7BA88F] mb-3">How it works</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2C4A3E]">
            Booking is simple
          </h2>
          <p className="mt-4 text-lg text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
            Four easy steps from choosing a visit type to walking out with a clear care plan.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {appointmentSteps.map((step, i) => (
            <motion.div
              key={step.step}
              variants={fadeUp}
              custom={i}
              className="relative flex flex-col items-center text-center"
            >
              {/* Step circle */}
              <div className="relative mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#7BA88F] text-2xl font-bold text-white shadow-lg shadow-[#7BA88F]/25">
                  {i + 1}
                </div>
                {i < appointmentSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 left-full w-full h-px -translate-y-1/2">
                    <div className="w-full h-px bg-gradient-to-r from-[#7BA88F]/30 to-transparent" />
                  </div>
                )}
              </div>
              <h3 className="text-base font-semibold text-[#2C4A3E] mb-2">{step.step}</h3>
              <p className="text-sm leading-relaxed text-[#6B7280] max-w-[240px]">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Meet Our Providers ─── */
function Providers() {
  return (
    <section id="team" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#7BA88F] mb-3">Our team</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2C4A3E]">
            People who genuinely care
          </h2>
          <p className="mt-4 text-lg text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
            Our providers take the time to listen, understand your story, and build a plan that works for you.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {providers.map((p, i) => (
            <motion.div
              key={p.name}
              variants={fadeUp}
              custom={i}
              whileHover={{ y: -4 }}
              className="group rounded-3xl bg-[#FFF9F2] overflow-hidden border border-[#7BA88F]/8 transition-all hover:shadow-xl hover:shadow-[#7BA88F]/10 hover:border-[#7BA88F]/15"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-base font-semibold text-[#2C4A3E]">{p.name}</h3>
                <p className="text-xs font-semibold text-[#7BA88F] mt-1 uppercase tracking-wider">{p.role}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.specialty.split(', ').map((tag) => (
                    <span key={tag} className="inline-block rounded-full bg-[#7BA88F]/10 px-2.5 py-1 text-[11px] font-medium text-[#2C4A3E]">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">{p.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Insurance ─── */
function Insurance() {
  const [showAll, setShowAll] = useState(false)
  const displayed = showAll ? insuranceList : insuranceList.slice(0, 6)

  return (
    <section id="insurance" className="bg-[#FFF9F2] py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#7BA88F] mb-3">Insurance</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2C4A3E]">
            Plans we accept
          </h2>
          <p className="mt-4 text-lg text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
            We work with most major insurance plans. Don't see yours? Give us a call — we'll help you figure it out.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={stagger}
          className="mx-auto max-w-3xl grid gap-3 sm:grid-cols-2"
        >
          {displayed.map((ins) => (
            <motion.div
              key={ins.name}
              variants={fadeUp}
              className={`flex items-center gap-3.5 rounded-2xl px-5 py-4 border transition-all ${
                ins.accepted
                  ? 'bg-white border-[#7BA88F]/15 shadow-sm'
                  : 'bg-white/50 border-[#6B7280]/10 opacity-50'
              }`}
            >
              <span className={`flex h-7 w-7 items-center justify-center rounded-full flex-shrink-0 ${
                ins.accepted ? 'bg-[#7BA88F]' : 'bg-[#6B7280]/20'
              }`}>
                {ins.accepted ? <IconCheck size={14} /> : <IconX size={12} />}
              </span>
              <span className="text-sm font-medium text-[#2C4A3E]">{ins.name}</span>
            </motion.div>
          ))}
        </motion.div>

        {insuranceList.length > 6 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAll((v) => !v)}
              className="text-sm font-semibold text-[#7BA88F] hover:text-[#2C4A3E] transition-colors underline underline-offset-4 decoration-[#7BA88F]/30 hover:decoration-[#2C4A3E]"
            >
              {showAll ? 'Show fewer' : `View all ${insuranceList.length} plans`}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

/* ─── Patient Experience ─── */
function PatientExperience() {
  return (
    <section id="experience" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#7BA88F] mb-3">Your experience</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2C4A3E]">
            Designed around you
          </h2>
          <p className="mt-4 text-lg text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
            Little things that make visiting the doctor feel less like a chore and more like care.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {experienceItems.map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              custom={i}
              whileHover={{ y: -4 }}
              className="rounded-3xl bg-[#FFF9F2] p-7 border border-[#7BA88F]/8 text-center transition-all hover:shadow-lg hover:shadow-[#7BA88F]/8 hover:border-[#7BA88F]/15"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm mb-5">
                {iconFromId(item.icon)}
              </div>
              <h3 className="text-base font-semibold text-[#2C4A3E] mb-2">{item.title}</h3>
              <p className="text-sm leading-relaxed text-[#6B7280]">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Location & Hours ─── */
function LocationHours() {
  return (
    <section id="location" className="bg-[#FFF9F2] py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#7BA88F] mb-3">Visit us</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2C4A3E]">
            Find us & our hours
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={stagger}
          className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto"
        >
          {/* Address Card */}
          <motion.div variants={fadeUp}
            className="rounded-3xl bg-white p-8 border border-[#7BA88F]/10 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7BA88F]/10">
                <IconMapPin size={20} />
              </div>
              <h3 className="text-lg font-semibold text-[#2C4A3E]">Our Location</h3>
            </div>
            <p className="text-[#6B7280] leading-relaxed">{siteInfo.address}</p>
            <div className="mt-5 space-y-3">
              <a href={`tel:${siteInfo.phone}`} className="flex items-center gap-3 text-sm text-[#6B7280] hover:text-[#7BA88F] transition-colors">
                <IconPhoneCall size={16} />
                {siteInfo.phone}
              </a>
              <a href={`mailto:${siteInfo.email}`} className="flex items-center gap-3 text-sm text-[#6B7280] hover:text-[#7BA88F] transition-colors">
                <IconMail size={16} />
                {siteInfo.email}
              </a>
            </div>
          </motion.div>

          {/* Hours Card */}
          <motion.div variants={fadeUp}
            className="rounded-3xl bg-white p-8 border border-[#7BA88F]/10 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7BA88F]/10">
                <IconClock size={20} />
              </div>
              <h3 className="text-lg font-semibold text-[#2C4A3E]">Office Hours</h3>
            </div>
            <div className="space-y-3">
              {Object.entries(siteInfo.hours).map(([day, time]) => (
                <div key={day} className="flex items-center justify-between py-2 border-b border-[#7BA88F]/8 last:border-0">
                  <span className="text-sm font-medium text-[#2C4A3E]">{day}</span>
                  <span className={`text-sm ${time === 'Closed' ? 'text-[#6B7280]' : 'text-[#7BA88F] font-medium'}`}>
                    {time}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── CTA Section ─── */
function CTASection() {
  return (
    <section id="cta" className="bg-[#2C4A3E] py-24 md:py-32 relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#7BA88F]/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#7BA88F]/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-[#7BA88F]/20 px-4 py-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#7BA88F] animate-pulse" />
            <span className="text-xs font-semibold text-[#7BA88F] tracking-wide">Now accepting new patients</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Ready to feel heard?
          </h2>
          <p className="mt-5 text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
            Book your first visit today. We'll take the time to understand your health goals and build a plan that actually fits your life.
          </p>

          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <motion.a
              href={`tel:${siteInfo.phone}`}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 rounded-full bg-[#7BA88F] px-7 py-4 text-base font-semibold text-white shadow-lg shadow-[#7BA88F]/25 transition-all hover:bg-[#6B9A7F]"
            >
              <IconPhoneCall size={18} />
              Call {siteInfo.phone}
            </motion.a>
            <motion.a
              href={`mailto:${siteInfo.email}`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 rounded-full border-2 border-white/20 px-7 py-4 text-base font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5"
            >
              <IconMail size={18} />
              Send a Message
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="bg-[#2C4A3E] border-t border-white/5 py-12">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7BA88F]/20">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7BA88F" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 3v18M3 12h18" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-white/90">{siteInfo.name}</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-white/50">
            <a href={`tel:${siteInfo.phone}`} className="hover:text-[#7BA88F] transition-colors">{siteInfo.phone}</a>
            <a href={`mailto:${siteInfo.email}`} className="hover:text-[#7BA88F] transition-colors">{siteInfo.email}</a>
            {siteInfo.social.instagram && (
              <a href={siteInfo.social.instagram} className="hover:text-[#7BA88F] transition-colors" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            )}
            {siteInfo.social.facebook && (
              <a href={siteInfo.social.facebook} className="hover:text-[#7BA88F] transition-colors" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
            )}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} {siteInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

/* ─── App ─── */
export default function App() {
  return (
    <div className="min-h-screen bg-[#FFF9F2] font-sans antialiased">
      <Navbar />
      <Hero />
      <Services />
      <AppointmentFlow />
      <Providers />
      <Insurance />
      <PatientExperience />
      <LocationHours />
      <CTASection />
      <Footer />
    </div>
  )
}
