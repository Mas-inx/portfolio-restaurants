import { useState, useEffect, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  siteInfo,
  navLinks,
  services,
  appointmentSteps,
  providers,
  insuranceList,
  experienceItems,
  type Service,
  type Provider,
  type AppointmentStep,
  type PatientExperienceItem,
} from './data'

/* ─── Inline SVG Icons ─── */
function IconStethoscope({ c = "text-[#3B8A7A]" }: { c?: string }) {
  return (
    <svg className={`w-8 h-8 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 8a6 6 0 016-6 6 6 0 016 6" /><path d="M16 8v2a4 4 0 01-8 0V8" /><path d="M8 19a5 5 0 0010 0" /><circle cx="19" cy="16" r="2" />
    </svg>
  )
}
function IconShield({ c = "text-[#3B8A7A]" }: { c?: string }) {
  return (
    <svg className={`w-8 h-8 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}
function IconClipboard({ c = "text-[#3B8A7A]" }: { c?: string }) {
  return (
    <svg className={`w-8 h-8 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    </svg>
  )
}
function IconBaby({ c = "text-[#3B8A7A]" }: { c?: string }) {
  return (
    <svg className={`w-8 h-8 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="9" r="5" /><path d="M12 14c-4 0-6 2-8 4" /><path d="M9 7a1 1 0 012 0v1a1 1 0 01-2 0V7z" /><path d="M14 8a1 1 0 00-2 0v1a1 1 0 002 0V8z" />
    </svg>
  )
}
function IconFlower({ c = "text-[#3B8A7A]" }: { c?: string }) {
  return (
    <svg className={`w-8 h-8 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" /><path d="M12 1v4" /><path d="M12 19v4" /><path d="M4.22 4.22l2.83 2.83" /><path d="M16.95 16.95l2.83 2.83" /><path d="M1 12h4" /><path d="M19 12h4" /><path d="M4.22 19.78l2.83-2.83" /><path d="M16.95 7.05l2.83-2.83" />
    </svg>
  )
}
function IconMicroscope({ c = "text-[#3B8A7A]" }: { c?: string }) {
  return (
    <svg className={`w-8 h-8 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 18h8" /><path d="M3 22h18" /><path d="M14 22a7 7 0 100-14h-1" /><path d="M9 14h2" /><path d="M9 12h2" /><path d="M7 2h6a2 2 0 012 2v2a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2z" />
    </svg>
  )
}
function IconHeart({ c = "text-[#3B8A7A]" }: { c?: string }) {
  return (
    <svg className={`w-8 h-8 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  )
}
function IconPhone({ c = "text-[#3B8A7A]" }: { c?: string }) {
  return (
    <svg className={`w-8 h-8 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><path d="M12 18h.01" />
    </svg>
  )
}
function IconBell({ c = "text-[#3B8A7A]" }: { c?: string }) {
  return (
    <svg className={`w-8 h-8 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  )
}
function IconChat({ c = "text-[#3B8A7A]" }: { c?: string }) {
  return (
    <svg className={`w-8 h-8 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  )
}
function IconLock({ c = "text-[#3B8A7A]" }: { c?: string }) {
  return (
    <svg className={`w-8 h-8 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  )
}
function IconParty({ c = "text-white" }: { c?: string }) {
  return (
    <svg className={`w-12 h-12 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><path d="M9 9h.01" /><path d="M15 9h.01" />
    </svg>
  )
}
function IconMapPin({ c = "text-[#3B8A7A]" }: { c?: string }) {
  return (
    <svg className={`w-6 h-6 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  )
}
function IconMail({ c = "text-[#3B8A7A]" }: { c?: string }) {
  return (
    <svg className={`w-5 h-5 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
    </svg>
  )
}
function IconPhoneCall({ c = "text-[#3B8A7A]" }: { c?: string }) {
  return (
    <svg className={`w-5 h-5 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  )
}

function iconFromId(id: string): React.ReactNode {
  const base = "text-[#3B8A7A]";
  switch (id) {
    case "stethoscope": return <IconStethoscope c={base} />;
    case "shield": return <IconShield c={base} />;
    case "clipboard": return <IconClipboard c={base} />;
    case "baby": return <IconBaby c={base} />;
    case "flower": return <IconFlower c={base} />;
    case "microscope": return <IconMicroscope c={base} />;
    case "phone": return <IconPhone c={base} />;
    case "bell": return <IconBell c={base} />;
    case "chat": return <IconChat c={base} />;
    case "lock": return <IconLock c={base} />;
    case "map-pin": return <IconMapPin />;
    default: return <IconHeart c={base} />;
  }
}

/* ─── Animation Variants ─── */
const easeOut = [0.25, 0.1, 0.25, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: easeOut },
  }),
}

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: easeOut } },
}

const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: easeOut } },
}

/* ─── Section Wrapper ─── */
function SectionWrap({ id, className = '', children }: { id: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={`px-6 py-20 md:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  )
}

function SectionHeading({ title, subtitle, light = false }: { title: string; subtitle?: string; light?: boolean }) {
  return (
    <motion.div
      initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
      variants={fadeUp} className="mb-14 text-center"
    >
      <span className={`inline-block mb-3 text-xs font-bold uppercase tracking-[0.2em] ${light ? 'text-white/70' : 'text-[#3B8A7A]'}`}>
        {light ? 'Get started' : ''}
      </span>
      <h2 className={`text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl ${light ? 'text-white' : 'text-[#1A2E2A]'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mx-auto mt-4 max-w-2xl text-lg leading-relaxed ${light ? 'text-white/80' : 'text-[#5A6E6A]'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
      scrolled ? 'bg-white/90 shadow-lg shadow-black/5 backdrop-blur-xl' : 'bg-transparent'
    }`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-[#3B8A7A]">
          <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="14" fill="#3B8A7A" opacity="0.15"/><circle cx="14" cy="14" r="8" fill="#3B8A7A"/><path d="M14 10v8M10 14h8" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
          {siteInfo.name}
        </button>
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <button key={l.href} onClick={() => scrollTo(l.href)}
              className="text-sm font-medium text-[#5A6E6A] transition-colors hover:text-[#3B8A7A]">
              {l.label}
            </button>
          ))}
          <button onClick={() => scrollTo('#cta')}
            className="rounded-full bg-[#3B8A7A] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#256D5C] hover:shadow-lg hover:shadow-[#3B8A7A]/25">
            Book Appointment
          </button>
        </div>
        <button className="md:hidden" onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A2E2A" strokeWidth="2">
            {menuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-white shadow-lg">
            <div className="flex flex-col gap-3 px-6 pb-6 pt-2">
              {navLinks.map((l) => (
                <button key={l.href} onClick={() => scrollTo(l.href)}
                  className="text-left text-sm font-medium text-[#5A6E6A]">{l.label}</button>
              ))}
              <button onClick={() => scrollTo('#cta')}
                className="mt-2 rounded-full bg-[#3B8A7A] px-5 py-2.5 text-sm font-semibold text-white">Book Appointment</button>
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
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#FAF8F6] via-[#F0F8F5] to-[#E8F1F8] px-6 pt-28">
      {/* Decorative shapes */}
      <div className="pointer-events-none absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.08]">
        <svg viewBox="0 0 600 600" fill="none"><circle cx="400" cy="200" r="250" fill="#3B8A7A"/><circle cx="100" cy="400" r="180" fill="#7EC4B0"/><circle cx="500" cy="500" r="120" fill="#D6E8F5"/></svg>
      </div>
      <div className="pointer-events-none absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#3B8A7A]/5 blur-3xl" />
      <div className="pointer-events-none absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[#7EC4B0]/5 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <motion.div initial="hidden" animate="visible" variants={slideInLeft}>
          <span className="inline-block rounded-full bg-[#3B8A7A]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#3B8A7A]">
            Same-week appointments available
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-[#1A2E2A] md:text-5xl lg:text-6xl">
            {siteInfo.tagline}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[#5A6E6A] md:text-xl">
            {siteInfo.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
              onClick={() => document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' })}
              className="rounded-full bg-[#3B8A7A] px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#3B8A7A]/25 transition-all hover:bg-[#256D5C]">
              Book an Appointment
            </motion.button>
            <button onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
              className="rounded-full border border-[#D6E8F5] bg-white/80 px-8 py-3.5 text-base font-semibold text-[#1A2E2A] backdrop-blur-sm transition-all hover:border-[#3B8A7A]/40 hover:text-[#3B8A7A]">
              Our Services
            </button>
          </div>
          <div className="mt-8 flex items-center gap-6 text-sm text-[#8A9E9A]">
            <span className="flex items-center gap-1.5"><svg className="w-4 h-4 text-[#3B8A7A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>No referral needed</span>
            <span className="flex items-center gap-1.5"><svg className="w-4 h-4 text-[#3B8A7A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>Most seen within 48h</span>
          </div>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={slideInRight} className="hidden lg:flex justify-center">
          <div className="relative w-full max-w-md">
            {/* Availability card */}
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative rounded-3xl bg-white p-1 shadow-2xl shadow-[#3B8A7A]/10">
              <div className="rounded-2xl bg-gradient-to-br from-[#F0F8F5] to-[#E8F1F8] p-8">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#3B8A7A]">Today's Availability</p>
                  <span className="flex items-center gap-1.5 text-xs text-[#3B8A7A]">
                    <span className="w-2 h-2 rounded-full bg-[#3B8A7A] animate-pulse" /> Live
                  </span>
                </div>
                <p className="text-5xl font-bold text-[#1A2E2A]">
                  3 <span className="text-lg font-normal text-[#5A6E6A]">openings today</span>
                </p>
                <p className="mt-1 text-sm text-[#5A6E6A]">Next available: 2:15 PM</p>
                <div className="mt-6 space-y-2.5">
                  {[
                    { label: 'Morning', time: '7:00 - 11:30', avail: true },
                    { label: 'Afternoon', time: '12:30 - 4:00', avail: true },
                    { label: 'Evening', time: '4:00 - 6:00', avail: false },
                  ].map((slot) => (
                    <div key={slot.label} className={`flex items-center justify-between rounded-xl px-4 py-3 ${
                      slot.avail ? 'bg-white' : 'bg-white/50'
                    }`}>
                      <div className="flex items-center gap-3">
                        <span className={`w-2 h-2 rounded-full ${slot.avail ? 'bg-[#3B8A7A]' : 'bg-[#D1D5DB]'}`} />
                        <span className="text-sm font-medium text-[#1A2E2A]">{slot.label}</span>
                      </div>
                      <span className="text-sm text-[#5A6E6A]">{slot.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            {/* Decorative floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl bg-[#7EC4B0]/20 rotate-12 -z-10" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-[#D6E8F5]/50 -z-10" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Services ─── */
function Services() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <SectionWrap id="services" className="bg-white">
      <SectionHeading title="Care that covers your whole family" subtitle="From annual checkups to chronic condition management, we provide complete primary care for every stage of life." />
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={stagger}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s: Service, i: number) => (
          <motion.div key={s.title} variants={fadeUp} custom={i}
            onClick={() => setExpanded(expanded === s.title ? null : s.title)}
            className="card-hover relative rounded-2xl border border-[#E2EAE8] bg-white p-6 cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#F0F8F5] flex items-center justify-center">
                {iconFromId(s.icon)}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#1A2E2A]">{s.title}</h3>
                <AnimatePresence>
                  {expanded === s.title && (
                    <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} className="mt-2 text-sm leading-relaxed text-[#5A6E6A] overflow-hidden">
                      {s.description}
                    </motion.p>
                  )}
                </AnimatePresence>
                {expanded !== s.title && (
                  <p className="mt-1 text-sm text-[#5A6E6A] line-clamp-2">{s.description}</p>
                )}
              </div>
            </div>
            <div className="mt-3 flex justify-end">
              <span className="text-xs font-medium text-[#3B8A7A]">
                {expanded === s.title ? 'Show less' : 'Learn more'}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrap>
  )
}

/* ─── Appointment Flow ─── */
function AppointmentFlow() {
  return (
    <SectionWrap id="appointments" className="bg-[#FAF8F6]">
      <SectionHeading title="Getting care is this simple" subtitle="Four steps from booking to your visit. No hassle, no long waits." />
      <div className="relative mx-auto max-w-4xl">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}
          className="grid gap-8 md:grid-cols-4">
          {appointmentSteps.map((step: AppointmentStep, i: number) => (
            <motion.div key={step.step} variants={fadeUp} custom={i} className="relative flex flex-col items-center text-center group">
              {/* Step number */}
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#3B8A7A] text-xl font-bold text-white shadow-lg shadow-[#3B8A7A]/20 group-hover:shadow-xl group-hover:shadow-[#3B8A7A]/30 transition-all">
                  {i + 1}
                </div>
                {i < appointmentSteps.length - 1 && (
                  <div className="hidden md:block absolute top-7 left-full w-full h-0.5 bg-gradient-to-r from-[#3B8A7A]/40 to-[#7EC4B0]/20 -z-10" />
                )}
              </div>
              <h3 className="mt-5 text-base font-semibold text-[#1A2E2A]">{step.step}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5A6E6A] max-w-[220px]">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrap>
  )
}

/* ─── Care Team ─── */
function CareTeam() {
  return (
    <SectionWrap id="team" className="bg-white">
      <SectionHeading title="Meet your care team" subtitle="Experienced providers who take the time to listen and work with you." />
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={stagger}
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {providers.map((p: Provider, i: number) => (
          <motion.div key={p.name} variants={fadeUp} custom={i}
            className="provider-card rounded-2xl bg-white border border-[#E2EAE8] overflow-hidden group">
            <div className="aspect-[4/3] overflow-hidden bg-[#F0F8F5]">
              <img src={p.image} alt={p.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-5">
              <h3 className="text-base font-semibold text-[#1A2E2A]">{p.name}</h3>
              <p className="text-xs font-bold uppercase tracking-wider text-[#3B8A7A] mt-1">{p.role}</p>
              <p className="text-xs text-[#8A9E9A] mt-0.5">{p.specialty}</p>
              <p className="mt-3 text-sm leading-relaxed text-[#5A6E6A]">{p.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrap>
  )
}

/* ─── Insurance ─── */
function Insurance() {
  const [showAll, setShowAll] = useState(false)
  const displayed = showAll ? insuranceList : insuranceList.slice(0, 4)

  return (
    <SectionWrap id="insurance" className="bg-[#FAF8F6]">
      <SectionHeading title="Insurance and self-pay made clear" subtitle="We work with most major plans and offer transparent self-pay pricing." />
      <div className="mx-auto max-w-3xl">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={stagger}
          className="grid gap-3 sm:grid-cols-2">
          {displayed.map((ins) => (
            <motion.div key={ins.name} variants={fadeUp}
              className={`flex items-center gap-3 rounded-xl border px-5 py-3.5 ${
                ins.accepted ? 'border-[#B5D4C4] bg-[#F0F8F5]' : 'border-[#E2EAE8] bg-white opacity-50'
              }`}>
              <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                ins.accepted ? 'bg-[#3B8A7A] text-white' : 'bg-[#D1D5DB] text-white'
              }`}>
                {ins.accepted ? (
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                ) : '—'}
              </span>
              <span className="text-sm font-medium text-[#1A2E2A]">{ins.name}</span>
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-6 text-center">
          <button onClick={() => setShowAll((v) => !v)}
            className="text-sm font-medium text-[#3B8A7A] underline underline-offset-4 hover:text-[#256D5C] transition-colors">
            {showAll ? 'Show fewer' : `View all ${insuranceList.length} plans`}
          </button>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView="visible" viewport={{ once: true }}
          className="mt-10 rounded-2xl border border-[#E2EAE8] bg-white p-6 md:p-8">
          <h3 className="text-base font-semibold text-[#1A2E2A]">Don't have insurance?</h3>
          <p className="mt-2 text-sm leading-relaxed text-[#5A6E6A]">
            We offer transparent self-pay rates starting at $85 for standard visits.
            No hidden fees, no surprise bills. Ask about our sliding-scale discount program during checkout.
          </p>
        </motion.div>
      </div>
    </SectionWrap>
  )
}

/* ─── Patient Experience ─── */
function PatientExperience() {
  return (
    <SectionWrap id="experience" className="bg-white">
      <SectionHeading title="A better experience from start to finish" subtitle="Small touches that make a big difference in your care." />
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={stagger}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {experienceItems.map((item: PatientExperienceItem, i: number) => (
          <motion.div key={item.title} variants={fadeUp} custom={i}
            className="card-hover rounded-2xl border border-[#E2EAE8] bg-white p-6 text-center">
            <div className="mx-auto w-14 h-14 rounded-xl bg-[#F0F8F5] flex items-center justify-center">
              {iconFromId(item.icon)}
            </div>
            <h3 className="mt-4 text-base font-semibold text-[#1A2E2A]">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#5A6E6A]">{item.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrap>
  )
}

/* ─── Location & Hours ─── */
function LocationHours() {
  return (
    <SectionWrap id="location" className="bg-[#FAF8F6]">
      <SectionHeading title="Visit us" subtitle="We're easy to find and open early — including Saturdays." />
      <div className="grid gap-10 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView="visible" viewport={{ once: true }}
          className="h-72 md:h-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#F0F8F5] to-[#E8F1F8] relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-6">
              <IconMapPin />
              <p className="mt-3 text-base font-medium text-[#1A2E2A]">{siteInfo.address}</p>
              <p className="mt-1 text-sm text-[#5A6E6A]">Free parking available behind the building</p>
              <div className="mt-4 flex justify-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#3B8A7A]/10 text-xs font-medium text-[#3B8A7A]">Wheelchair accessible</span>
                <span className="px-3 py-1 rounded-full bg-[#3B8A7A]/10 text-xs font-medium text-[#3B8A7A]">Near bus stop</span>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView="visible" viewport={{ once: true }}
          className="flex flex-col justify-center space-y-5 bg-white rounded-2xl p-8 border border-[#E2EAE8]">
          <h3 className="text-lg font-semibold text-[#1A2E2A]">Clinic Hours</h3>
          {Object.entries(siteInfo.hours).map(([day, hours]) => (
            <div key={day} className="flex items-center justify-between border-b border-[#E2EAE8] pb-3 last:border-0">
              <span className="text-sm font-medium text-[#1A2E2A]">{day}</span>
              <span className="text-sm text-[#5A6E6A]">{hours}</span>
            </div>
          ))}
          <div className="mt-4 pt-4 border-t border-[#E2EAE8] space-y-2">
            <p className="text-sm font-medium text-[#3B8A7A] flex items-center gap-2">
              <IconMail /> {siteInfo.email}
            </p>
            <p className="text-sm font-medium text-[#3B8A7A] flex items-center gap-2">
              <IconPhoneCall /> {siteInfo.phone}
            </p>
          </div>
        </motion.div>
      </div>
    </SectionWrap>
  )
}

/* ─── CTA Form ─── */
function CTAForm() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <SectionWrap id="cta" className="bg-gradient-to-br from-[#3B8A7A] to-[#256D5C] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute top-0 right-0 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
      <SectionHeading title="Ready to be seen?" subtitle="Book your appointment online in under 2 minutes." light />
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView="visible" viewport={{ once: true }}
        className="mx-auto max-w-xl relative">
        {submitted ? (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="rounded-2xl bg-white/10 p-10 text-center backdrop-blur-sm border border-white/10">
            <IconParty />
            <p className="mt-4 text-xl font-semibold text-white">Request received!</p>
            <p className="mt-2 text-white/80">We'll confirm your appointment within 2 hours. Keep an eye on your phone.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl bg-white/10 p-8 backdrop-blur-sm border border-white/10">
            <div className="grid gap-5 sm:grid-cols-2">
              <input type="text" placeholder="First name" required
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/50 outline-none focus:border-white/50 focus:bg-white/15 transition-all" />
              <input type="text" placeholder="Last name" required
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/50 outline-none focus:border-white/50 focus:bg-white/15 transition-all" />
            </div>
            <input type="email" placeholder="Email address" required
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/50 outline-none focus:border-white/50 focus:bg-white/15 transition-all" />
            <input type="tel" placeholder="Phone number" required
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/50 outline-none focus:border-white/50 focus:bg-white/15 transition-all" />
            <select required
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none focus:border-white/50 focus:bg-white/15 transition-all">
              <option value="" disabled selected className="text-gray-400">Reason for visit</option>
              <option value="checkup" className="text-[#1A2E2A]">Annual checkup / physical</option>
              <option value="sick" className="text-[#1A2E2A]">Sick visit</option>
              <option value="followup" className="text-[#1A2E2A]">Follow-up appointment</option>
              <option value="chronic" className="text-[#1A2E2A]">Chronic condition management</option>
              <option value="other" className="text-[#1A2E2A]">Other</option>
            </select>
            <textarea rows={3} placeholder="Anything we should know? (optional)"
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/50 outline-none focus:border-white/50 focus:bg-white/15 transition-all" />
            <motion.button whileHover={{ scale: 1.01 }} type="submit"
              className="w-full rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#3B8A7A] transition-all hover:bg-white/90 hover:shadow-lg">
              Request Appointment
            </motion.button>
            <p className="text-center text-xs text-white/60">We respect your privacy. Your information is encrypted and never shared.</p>
          </form>
        )}
      </motion.div>
    </SectionWrap>
  )
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="bg-[#1A2E2A] px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 text-xl font-bold text-white">
              <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="14" fill="#3B8A7A" opacity="0.3"/><circle cx="14" cy="14" r="8" fill="#7EC4B0"/><path d="M14 10v8M10 14h8" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
              {siteInfo.name}
            </div>
            <p className="mt-3 text-sm text-[#8A9E9A] max-w-md">{siteInfo.description}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Contact</h4>
            <p className="text-sm text-[#8A9E9A]">{siteInfo.address}</p>
            <p className="text-sm text-[#8A9E9A] mt-1">{siteInfo.phone}</p>
            <p className="text-sm text-[#8A9E9A] mt-1">{siteInfo.email}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Follow</h4>
            <div className="flex gap-4">
              <a href={siteInfo.social.facebook} className="text-sm text-[#8A9E9A] hover:text-white transition-colors">Facebook</a>
              <a href={siteInfo.social.instagram} className="text-sm text-[#8A9E9A] hover:text-white transition-colors">Instagram</a>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-[#8A9E9A]">&copy; {new Date().getFullYear()} {siteInfo.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

/* ─── App ─── */
export default function App() {
  return (
    <div className="font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <AppointmentFlow />
        <CareTeam />
        <Insurance />
        <PatientExperience />
        <LocationHours />
        <CTAForm />
      </main>
      <Footer />
    </div>
  )
}
