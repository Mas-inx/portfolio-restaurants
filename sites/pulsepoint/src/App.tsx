import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  siteInfo,
  navLinks,
  treatments,
  visitOptions,
  howItWorksSteps,
  pricingItems,
  reviews,
  type Treatment,
  type VisitOption,
  type HowItWorksStep,
  type Review,
} from './data'

/* ─── Inline SVG Icons ─── */
function IconClock({ c = "text-red-500" }: { c?: string }) {
  return (
    <svg className={`w-6 h-6 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  )
}
function IconHospital({ c = "text-[#DC2626]" }: { c?: string }) {
  return (
    <svg className={`w-7 h-7 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18"/><path d="M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16"/><path d="M9 7h6"/><path d="M9 11h6"/><path d="M9 15h4"/>
    </svg>
  )
}
function IconSyringe({ c = "text-[#DC2626]" }: { c?: string }) {
  return (
    <svg className={`w-7 h-7 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2l4 4"/><path d="M17 7l3-3"/><path d="M19 9L8 20H4v-4L15 5z"/><path d="M7 13l-3 3"/><path d="M11 9l-3 3"/>
    </svg>
  )
}
function IconBandage({ c = "text-[#DC2626]" }: { c?: string }) {
  return (
    <svg className={`w-7 h-7 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 8V4h4"/><path d="M20 16v4h-4"/><path d="M8 4l12 12"/><path d="M4 8l12 12"/>
    </svg>
  )
}
function IconThermometer({ c = "text-[#DC2626]" }: { c?: string }) {
  return (
    <svg className={`w-7 h-7 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z"/>
    </svg>
  )
}
function IconEar({ c = "text-[#DC2626]" }: { c?: string }) {
  return (
    <svg className={`w-7 h-7 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8a6 6 0 0112 0c0 5-4 5-4 8"/><path d="M14 20a2 2 0 11-4 0"/><path d="M11 8v3"/>
    </svg>
  )
}
function IconKidney({ c = "text-[#DC2626]" }: { c?: string }) {
  return (
    <svg className={`w-7 h-7 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 0110 10"/><path d="M12 2a10 10 0 00-10 10"/><path d="M12 22V2"/><path d="M12 22a10 10 0 0010-10"/><path d="M12 22a10 10 0 00-10-10"/>
    </svg>
  )
}
function IconTest({ c = "text-[#DC2626]" }: { c?: string }) {
  return (
    <svg className={`w-7 h-7 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3h6v5l4 4v2H5v-2l4-4V3z"/><path d="M5 16h14"/><path d="M7 20h10"/><path d="M9 12h6"/>
    </svg>
  )
}
function IconAllergy({ c = "text-[#DC2626]" }: { c?: string }) {
  return (
    <svg className={`w-7 h-7 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/>
    </svg>
  )
}
function IconMaps({ c = "text-[#DC2626]" }: { c?: string }) {
  return (
    <svg className={`w-5 h-5 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  )
}

function iconFromId(id: string): React.ReactNode {
  const base = "text-[#DC2626]";
  switch (id) {
    case "fever": return <IconThermometer c={base} />;
    case "injury": return <IconBandage c={base} />;
    case "wound": return <IconSyringe c={base} />;
    case "burn": return <IconSyringe c={base} />;
    case "ear": return <IconEar c={base} />;
    case "uti": return <IconKidney c={base} />;
    case "test": return <IconTest c={base} />;
    case "allergy": return <IconAllergy c={base} />;
    default: return <IconHospital c={base} />;
  }
}

/* ─── Animation Variants ─── */
const easeOut = [0.25, 0.1, 0.25, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: easeOut },
  }),
}
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
}
const slideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
}

/* ─── Components ─── */
function SectionWrap({ id, className = '', children }: { id: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={`px-6 py-20 md:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  )
}

function SectionHeading({ title, subtitle, light = false, accent = false }: { title: string; subtitle?: string; light?: boolean; accent?: boolean }) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
      variants={fadeUp} className="mb-14 text-center">
      {accent && <span className="inline-block mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#DC2626]">{subtitle ? subtitle : ''}</span>}
      <h2 className={`text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl ${light ? 'text-white' : 'text-[#1A2744]'}`}>{title}</h2>
      {subtitle && !accent && (
        <p className={`mx-auto mt-4 max-w-2xl text-lg leading-relaxed ${light ? 'text-white/80' : 'text-[#6B7A8F]'}`}>{subtitle}</p>
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#1A2744]/95 shadow-lg backdrop-blur-md' : 'bg-transparent'
    }`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-white">
          <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
            <rect x="2" y="2" width="24" height="24" rx="6" fill="#DC2626"/>
            <path d="M14 8v8M10 12h8" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          {siteInfo.name}
        </button>
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <button key={l.href} onClick={() => scrollTo(l.href)}
              className="text-sm font-medium text-white/70 transition-colors hover:text-white">
              {l.label}
            </button>
          ))}
          <button onClick={() => scrollTo('#cta')}
            className="rounded-full bg-[#DC2626] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#B91C1C] hover:shadow-lg hover:shadow-[#DC2626]/30">
            Walk In Now
          </button>
        </div>
        <button className="md:hidden" onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            {menuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-[#1A2744] shadow-lg">
            <div className="flex flex-col gap-3 px-6 pb-6 pt-2">
              {navLinks.map((l) => (
                <button key={l.href} onClick={() => scrollTo(l.href)}
                  className="text-left text-sm font-medium text-white/70">{l.label}</button>
              ))}
              <button onClick={() => scrollTo('#cta')}
                className="mt-2 rounded-full bg-[#DC2626] px-5 py-2.5 text-sm font-semibold text-white">Walk In Now</button>
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
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#1A2744] via-[#1A2744] to-[#0F1A2E] px-6 pt-28">
      {/* Background pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%"><defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#grid)"/></svg>
      </div>
      <div className="pointer-events-none absolute top-20 right-20 w-96 h-96 rounded-full bg-[#DC2626]/10 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-20 left-20 w-80 h-80 rounded-full bg-[#DC2626]/5 blur-[100px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#DC2626]/20 px-4 py-1.5">
            <span className="w-2 h-2 rounded-full bg-[#DC2626] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#FCA5A5]">Open Now</span>
          </div>
          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            {siteInfo.tagline}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[#94A3B8] md:text-xl">
            {siteInfo.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
              onClick={() => document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' })}
              className="rounded-full bg-[#DC2626] px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#DC2626]/30 transition-all hover:bg-[#B91C1C]">
              Walk In Today
            </motion.button>
            <button onClick={() => document.querySelector('#treatments')?.scrollIntoView({ behavior: 'smooth' })}
              className="rounded-full border border-white/20 bg-white/10 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20">
              View Treatments
            </button>
          </div>
        </motion.div>

        {/* Wait time card */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}
          className="hidden lg:flex justify-center">
          <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-full max-w-sm">
            <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <IconClock c="text-[#FCA5A5]" />
                <span className="text-sm font-semibold uppercase tracking-wider text-[#94A3B8]">Current Wait Time</span>
              </div>
              <div className="wait-time-pulse inline-flex items-center justify-center w-28 h-28 rounded-full bg-[#DC2626]/20 mx-auto">
                <span className="text-4xl font-black text-white">{siteInfo.currentWaitTime}</span>
                <span className="text-lg font-semibold text-[#FCA5A5] ml-1">min</span>
              </div>
              <p className="mt-4 text-sm text-[#94A3B8]">Average walk-in wait time</p>
              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Patients ahead of you</span>
                  <span className="font-semibold text-white">2</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '30%' }} transition={{ duration: 1.5 }}
                    className="h-full rounded-full bg-[#DC2626]" />
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-[#94A3B8]">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                Updated in real-time
              </div>
            </div>
            {/* Check-in from home button */}
            <button className="mt-4 w-full rounded-2xl bg-[#DC2626] px-6 py-3 text-sm font-semibold text-white hover:bg-[#B91C1C] transition-all">
              Check In Online — Hold Your Spot
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Treatments ─── */
function Treatments() {
  const [activeTab, setActiveTab] = useState<string>('all')
  const categories = [
    { id: 'all', label: 'All' },
    { id: 'infections', label: 'Infections' },
    { id: 'injuries', label: 'Injuries' },
    { id: 'testing', label: 'Testing' },
  ]
  const filtered = activeTab === 'all' ? treatments : treatments.filter(t => {
    if (activeTab === 'infections') return ['Flu & Fever', 'Ear & Sinus Infections', 'Urinary Tract Infections', 'Skin Rashes & Allergies'].includes(t.title)
    if (activeTab === 'injuries') return ['Sprains & Strains', 'Cuts & Minor Lacerations', 'Minor Burns'].includes(t.title)
    if (activeTab === 'testing') return ['COVID-19 & Strep Testing'].includes(t.title)
    return true
  })

  return (
    <SectionWrap id="treatments" className="bg-[#F8FAFC]">
      <SectionHeading title="Conditions we treat" subtitle="Fast, professional care for common urgent care needs — no appointment necessary." />
      {/* Tab filter */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex rounded-xl bg-white border border-[#E2E8F0] p-1.5 gap-1">
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setActiveTab(cat.id)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                activeTab === cat.id ? 'bg-[#1A2744] text-white shadow-sm' : 'text-[#6B7A8F] hover:text-[#1A2744]'
              }`}>
              {cat.label}
            </button>
          ))}
        </div>
      </div>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
        variants={stagger} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((t: Treatment, i: number) => (
          <motion.div key={t.title} variants={fadeUp} custom={i}
            className="treatment-card rounded-2xl bg-white border border-[#E2E8F0] p-5">
            <div className="w-12 h-12 rounded-xl bg-[#FEF2F2] flex items-center justify-center">
              {iconFromId(t.icon)}
            </div>
            <h3 className="mt-4 text-base font-semibold text-[#1A2744]">{t.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#6B7A8F]">{t.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrap>
  )
}

/* ─── Visit Options ─── */
function VisitOptions() {
  const [activeVisit, setActiveVisit] = useState(0)

  return (
    <SectionWrap id="visit" className="bg-white">
      <SectionHeading title="How you can visit" subtitle="Choose the option that works best for you." />
      <div className="mx-auto max-w-4xl">
        {/* Tabbed navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {visitOptions.map((v: VisitOption, i: number) => (
            <button key={v.title} onClick={() => setActiveVisit(i)}
              className={`relative px-6 py-3 text-sm font-semibold rounded-xl transition-all ${
                activeVisit === i
                  ? 'bg-[#1A2744] text-white shadow-lg'
                  : 'bg-white border border-[#E2E8F0] text-[#6B7A8F] hover:border-[#1A2744]/30'
              }`}>
              {v.title}
              {v.badge && (
                <span className={`absolute -top-2 -right-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  activeVisit === i ? 'bg-[#DC2626] text-white' : 'bg-[#FEF2F2] text-[#DC2626]'
                }`}>
                  {v.badge}
                </span>
              )}
            </button>
          ))}
        </div>
        {/* Active option card */}
        <AnimatePresence mode="wait">
          <motion.div key={activeVisit}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl bg-gradient-to-br from-[#F8FAFC] to-white border border-[#E2E8F0] p-8 md:p-10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#FEF2F2] flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-[#DC2626]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1A2744]">{visitOptions[activeVisit].title}</h3>
                <p className="mt-2 text-[#6B7A8F] leading-relaxed">{visitOptions[activeVisit].description}</p>
                {visitOptions[activeVisit].badge && (
                  <span className="inline-block mt-4 px-4 py-1.5 rounded-lg bg-[#FEF2F2] text-sm font-medium text-[#DC2626]">
                    {visitOptions[activeVisit].badge}
                  </span>
                )}
              </div>
            </div>
            <button className="mt-6 rounded-xl bg-[#DC2626] px-6 py-3 text-sm font-semibold text-white hover:bg-[#B91C1C] transition-all">
              {activeVisit === 0 ? 'Walk In Now' : activeVisit === 1 ? 'Check In Online' : activeVisit === 2 ? 'Learn More' : 'Start Telehealth'}
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionWrap>
  )
}

/* ─── How It Works ─── */
function HowItWorks() {
  return (
    <SectionWrap id="how-it-works" className="bg-[#F8FAFC]">
      <SectionHeading title="How it works" subtitle="From check-in to treatment in under an hour." />
      <div className="relative mx-auto max-w-4xl">
        {/* Connector line */}
        <div className="absolute top-0 left-[31px] w-0.5 h-full bg-gradient-to-b from-[#DC2626]/30 via-[#DC2626]/10 to-transparent hidden md:block" />
        <div className="space-y-8">
          {howItWorksSteps.map((step: HowItWorksStep, i: number) => (
            <motion.div key={step.step} initial={{ opacity: 0, x: -20 }} whileInView="visible"
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex items-start gap-6">
              <div className="relative z-10 flex-shrink-0 w-14 h-14 rounded-2xl bg-[#1A2744] flex items-center justify-center shadow-lg">
                <span className="text-lg font-bold text-white">{i + 1}</span>
              </div>
              <div className="flex-1 bg-white rounded-2xl border border-[#E2E8F0] p-6">
                <h3 className="text-lg font-semibold text-[#1A2744]">{step.step}</h3>
                <p className="mt-1 text-sm text-[#6B7A8F]">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrap>
  )
}

/* ─── Pricing ─── */
function Pricing() {
  const [showAll, setShowAll] = useState(false)
  const displayed = showAll ? pricingItems : pricingItems.slice(0, 4)

  return (
    <SectionWrap id="pricing" className="bg-white">
      <SectionHeading title="Transparent pricing" subtitle="No surprises. What you see is what you pay." />
      <div className="mx-auto max-w-2xl">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
          variants={stagger} className="divide-y divide-[#E2E8F0] rounded-2xl border border-[#E2E8F0] overflow-hidden">
          {displayed.map((p, i) => (
            <motion.div key={p.service} variants={fadeUp} custom={i}
              className="flex items-center justify-between px-6 py-4 bg-white hover:bg-[#F8FAFC] transition-colors">
              <span className="text-sm font-medium text-[#1A2744]">{p.service}</span>
              <span className="text-sm font-bold text-[#DC2626]">{p.price}</span>
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-6 text-center">
          <button onClick={() => setShowAll((v) => !v)}
            className="text-sm font-medium text-[#DC2626] underline underline-offset-4 hover:text-[#B91C1C] transition-colors">
            {showAll ? 'Show less' : `View all ${pricingItems.length} services`}
          </button>
        </div>
        <p className="mt-4 text-center text-xs text-[#94A3B8]">Prices listed are for self-pay. Insurance may reduce your out-of-pocket cost.</p>
      </div>
    </SectionWrap>
  )
}

/* ─── Hours & Location ─── */
function HoursLocation() {
  return (
    <SectionWrap id="hours" className="bg-[#1A2744]">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-10 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-white md:text-4xl">Hours &amp; Location</h2>
            <div className="mt-8 space-y-4">
              {Object.entries(siteInfo.hours).map(([day, hours]) => (
                <div key={day} className="flex items-center justify-between border-b border-white/10 pb-3 last:border-0">
                  <span className="text-sm font-medium text-white/80">{day}</span>
                  <span className="text-sm text-[#94A3B8]">{hours}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-5 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-sm text-white/80 flex items-center gap-2">
                <IconMaps /> {siteInfo.address}
              </p>
              <p className="mt-2 text-sm text-[#94A3B8]">{siteInfo.phone} &middot; {siteInfo.email}</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView="visible" viewport={{ once: true }}
            className="h-80 md:h-full rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
            <div className="text-center p-6">
              <svg className="w-12 h-12 text-[#DC2626] mx-auto mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <p className="text-white font-medium">{siteInfo.address}</p>
              <p className="text-sm text-[#94A3B8] mt-1">Free parking in the back lot</p>
              <div className="mt-4 flex justify-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#DC2626]/20 text-xs font-medium text-[#FCA5A5]">Walk-ins welcome</span>
                <span className="px-3 py-1 rounded-full bg-[#DC2626]/20 text-xs font-medium text-[#FCA5A5]">Open 7 days</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrap>
  )
}

/* ─── Reviews ─── */
function Reviews() {
  return (
    <SectionWrap id="reviews" className="bg-[#F8FAFC]">
      <SectionHeading title="What our patients say" subtitle="Real stories from people who walked in and got care." />
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
        variants={stagger} className="grid gap-6 md:grid-cols-2">
        {reviews.map((r: Review, i: number) => (
          <motion.div key={r.author} variants={fadeUp} custom={i}
            className="rounded-2xl bg-white border border-[#E2E8F0] p-6">
            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, si) => (
                <svg key={si} className={`w-4 h-4 ${si < r.rating ? 'text-[#DC2626]' : 'text-[#E2E8F0]'}`} viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              ))}
            </div>
            <p className="text-sm leading-relaxed text-[#6B7A8F]">"{r.text}"</p>
            <p className="mt-3 text-sm font-semibold text-[#1A2744]">— {r.author}</p>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrap>
  )
}

/* ─── CTA ─── */
function CTA() {
  return (
    <SectionWrap id="cta" className="bg-gradient-to-br from-[#DC2626] to-[#B91C1C] relative overflow-hidden">
      <div className="pointer-events-none absolute top-0 right-0 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
      <div className="mx-auto max-w-3xl text-center relative">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView="visible" viewport={{ once: true }}>
          <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">Walk in today. Feel better today.</h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            No appointment needed. No waiting for a callback. Just show up and get care from providers who move fast.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="rounded-full bg-white px-10 py-3.5 text-base font-semibold text-[#DC2626] shadow-lg hover:shadow-xl transition-all">
              Check Current Wait Time
            </motion.button>
            <button onClick={() => document.querySelector('#treatments')?.scrollIntoView({ behavior: 'smooth' })}
              className="rounded-full border border-white/30 bg-white/10 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/20 transition-all">
              View All Treatments
            </button>
          </div>
        </motion.div>
      </div>
    </SectionWrap>
  )
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="bg-[#0F1A2E] px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 text-xl font-bold text-white">
              <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
                <rect x="2" y="2" width="24" height="24" rx="6" fill="#DC2626"/>
                <path d="M14 8v8M10 12h8" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
              {siteInfo.name}
            </div>
            <p className="mt-3 text-sm text-[#94A3B8] max-w-md">{siteInfo.description}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Contact</h4>
            <p className="text-sm text-[#94A3B8]">{siteInfo.address}</p>
            <p className="text-sm text-[#94A3B8] mt-1">{siteInfo.phone}</p>
            <p className="text-sm text-[#94A3B8] mt-1">{siteInfo.email}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Follow</h4>
            <div className="flex gap-4">
              <a href={siteInfo.social.facebook} className="text-sm text-[#94A3B8] hover:text-white transition-colors">Facebook</a>
              <a href={siteInfo.social.twitter} className="text-sm text-[#94A3B8] hover:text-white transition-colors">Twitter</a>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-[#6B7A8F]">&copy; {new Date().getFullYear()} {siteInfo.name}. All rights reserved.</p>
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
        <Treatments />
        <VisitOptions />
        <HowItWorks />
        <Pricing />
        <HoursLocation />
        <Reviews />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
