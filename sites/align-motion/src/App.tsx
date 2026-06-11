import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  conditions,
  recoveryStages,
  programs,
  therapists,
  progressMetrics,
} from './data'

/* ─── Inline SVG Icons ─── */
function IconSpine({ c = "text-[#1E88E5]" }: { c?: string }) {
  return (
    <svg className={`w-8 h-8 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C7 4 4 8 4 12c0 4 3 8 8 10 5-2 8-6 8-10 0-4-3-8-8-10z"/><path d="M8 12h8"/><path d="M10 9l2-3 2 3"/><path d="M10 15l2 3 2-3"/>
    </svg>
  )
}
function IconKnee({ c = "text-[#1E88E5]" }: { c?: string }) {
  return (
    <svg className={`w-8 h-8 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="3"/><path d="M9 8l-3 6"/><path d="M15 8l3 6"/><path d="M6 14h12"/><path d="M8 14v4"/><path d="M16 14v4"/><path d="M8 18H6"/><path d="M16 18h2"/>
    </svg>
  )
}
function IconShoulder({ c = "text-[#1E88E5]" }: { c?: string }) {
  return (
    <svg className={`w-8 h-8 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6c0 3 2 5 4 6"/><path d="M20 6c0 3-2 5-4 6"/><path d="M8 12c0 4 2 6 4 6s4-2 4-6"/><path d="M12 18v4"/>
    </svg>
  )
}
function IconSports({ c = "text-[#1E88E5]" }: { c?: string }) {
  return (
    <svg className={`w-8 h-8 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M12 2v20"/><path d="M2 12h20"/><path d="M7 7l10 10"/><path d="M17 7l-10 10"/>
    </svg>
  )
}
function IconSurgery({ c = "text-[#1E88E5]" }: { c?: string }) {
  return (
    <svg className={`w-8 h-8 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17l3-3"/><path d="M14 10l3-3"/><path d="M5 19l14-14"/><circle cx="12" cy="12" r="10"/>
    </svg>
  )
}
function IconArrowRight({ c = "text-[#1E88E5]" }: { c?: string }) {
  return (
    <svg className={`w-5 h-5 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
    </svg>
  )
}
function IconCheck({ c = "text-[#1E88E5]" }: { c?: string }) {
  return (
    <svg className={`w-4 h-4 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}
function IconTrendUp({ c = "text-emerald-500" }: { c?: string }) {
  return (
    <svg className={`w-4 h-4 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
    </svg>
  )
}

function iconCond(id: string): React.ReactNode {
  const base = "text-[#1E88E5]";
  switch (id) {
    case "spine": return <IconSpine c={base} />;
    case "knee": return <IconKnee c={base} />;
    case "shoulder": return <IconShoulder c={base} />;
    case "sports": return <IconSports c={base} />;
    case "surgery": return <IconSurgery c={base} />;
    default: return <IconSpine c={base} />;
  }
}

/* ─── Animation Variants ─── */
const easeOut = [0.25, 0.1, 0.25, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: easeOut },
  }),
}
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
/* ─── Components ─── */
function SectionWrap({ id, className = '', children }: { id: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={`px-6 py-20 md:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  )
}

function SectionHeading({ title, subtitle, light = false }: { title: string; subtitle?: string; light?: boolean }) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
      variants={fadeUp} className="mb-14 text-center">
      <h2 className={`text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl ${light ? 'text-white' : 'text-[#2D2B28]'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mx-auto mt-4 max-w-2xl text-lg leading-relaxed ${light ? 'text-white/80' : 'text-[#8A8580]'}`}>
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

  const links = [
    { label: 'Conditions', href: '#conditions' },
    { label: 'Programs', href: '#programs' },
    { label: 'Recovery Plan', href: '#recovery' },
    { label: 'Team', href: '#team' },
    { label: 'Progress', href: '#progress' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#F5F3F0]/95 shadow-lg shadow-black/5 backdrop-blur-xl' : 'bg-transparent'
    }`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-[#2D2B28]">
          <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="12" stroke="#1E88E5" strokeWidth="2" strokeDasharray="4 3"/>
            <path d="M14 6c-3 1.5-5 4.5-5 8s2 6.5 5 8c3-1.5 5-4.5 5-8s-2-6.5-5-8z" fill="#1E88E5" opacity="0.2"/>
            <circle cx="14" cy="14" r="3" fill="#1E88E5"/>
          </svg>
          Align Motion
        </button>
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <button key={l.href} onClick={() => scrollTo(l.href)}
              className="text-sm font-medium text-[#8A8580] transition-colors hover:text-[#1E88E5]">
              {l.label}
            </button>
          ))}
          <button onClick={() => scrollTo('#cta')}
            className="rounded-full bg-[#1E88E5] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#1565C0] hover:shadow-lg hover:shadow-[#1E88E5]/25">
            Start Your Journey
          </button>
        </div>
        <button className="md:hidden" onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2D2B28" strokeWidth="2">
            {menuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-[#F5F3F0] shadow-lg">
            <div className="flex flex-col gap-3 px-6 pb-6 pt-2">
              {links.map((l) => (
                <button key={l.href} onClick={() => scrollTo(l.href)}
                  className="text-left text-sm font-medium text-[#8A8580]">{l.label}</button>
              ))}
              <button onClick={() => scrollTo('#cta')}
                className="mt-2 rounded-full bg-[#1E88E5] px-5 py-2.5 text-sm font-semibold text-white">Start Your Journey</button>
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
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#F5F3F0] px-6 pt-28">
      {/* Kinetic background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg className="w-full h-full opacity-[0.06]" viewBox="0 0 1440 900" preserveAspectRatio="none">
          <path d="M0 450 Q 360 200 720 450 T 1440 450" fill="none" stroke="#1E88E5" strokeWidth="2" className="animate-dash" strokeDasharray="20 40"/>
          <path d="M0 300 Q 360 550 720 300 T 1440 300" fill="none" stroke="#64B5F6" strokeWidth="1.5" className="animate-dash" strokeDasharray="30 50" style={{ animationDelay: '-5s' }}/>
          <path d="M0 600 Q 360 350 720 600 T 1440 600" fill="none" stroke="#1E88E5" strokeWidth="1" className="animate-dash" strokeDasharray="15 35" style={{ animationDelay: '-10s' }}/>
        </svg>
      </div>
      <div className="pointer-events-none absolute -top-40 right-20 w-96 h-96 rounded-full bg-[#1E88E5]/5 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 left-20 w-80 h-80 rounded-full bg-[#64B5F6]/5 blur-[120px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1E88E5]/20 bg-[#E3F0FA] px-4 py-1.5">
            <span className="w-2 h-2 rounded-full bg-[#1E88E5] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E88E5]">Movement Restored. Lives Transformed.</span>
          </div>
          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            <span className="text-[#2D2B28]">Move without</span><br />
            <span className="kinetic-text">pain. Live without limits.</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[#8A8580] md:text-xl">
            Evidence-based physical therapy that gets to the root of your pain. Personalized treatment plans with measurable results.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
              onClick={() => document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' })}
              className="rounded-full bg-[#1E88E5] px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#1E88E5]/25 transition-all hover:bg-[#1565C0]">
              Book Free Assessment
            </motion.button>
            <button onClick={() => document.querySelector('#conditions')?.scrollIntoView({ behavior: 'smooth' })}
              className="rounded-full border border-[#D1D0CC] bg-white/80 px-8 py-3.5 text-base font-semibold text-[#2D2B28] backdrop-blur-sm transition-all hover:border-[#1E88E5]/40 hover:text-[#1E88E5]">
              Conditions We Treat
            </button>
          </div>
          <div className="mt-8 flex items-center gap-6">
            <div className="flex -space-x-2">
              {[1,2,3,4].map(i => (
                <img key={i} src={`https://images.unsplash.com/photo-${i === 1 ? '1579684385127-1ef15d508118' : i === 2 ? '1559839734-2b71ea197ec2' : i === 3 ? '1612349317150-e413f6a5b16d' : '1594824476967-48c8b964273f'}?w=40&h=40&fit=crop&crop=face&q=80`}
                  className="w-8 h-8 rounded-full border-2 border-white object-cover" alt="" />
              ))}
            </div>
            <p className="text-sm text-[#8A8580]"><span className="font-semibold text-[#2D2B28]">200+</span> patients recovered this month</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          className="hidden lg:flex justify-center">
          <div className="relative w-full max-w-md">
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="rounded-3xl bg-white shadow-2xl shadow-[#1E88E5]/10 overflow-hidden">
              <div className="p-1">
                <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500&q=85"
                  alt="Physical therapy session" className="rounded-2xl w-full h-64 object-cover" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1E88E5]">Your Recovery Journey</span>
                  <span className="flex items-center gap-1 text-xs text-emerald-600">
                    <IconTrendUp /> +87% improvement
                  </span>
                </div>
                <div className="space-y-3">
                  {recoveryStages.slice(0, 3).map((r, i) => (
                    <div key={r.step} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                        i === 0 ? 'bg-[#1E88E5] text-white' : 'bg-[#E3F0FA] text-[#1E88E5]'
                      }`}>{i + 1}</div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-[#2D2B28]">{r.step}</span>
                          <span className="text-xs text-[#A09890]">{r.duration}</span>
                        </div>
                        <p className="text-xs text-[#8A8580] mt-0.5">{r.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="mt-4 w-full rounded-xl bg-[#E3F0FA] py-2.5 text-sm font-semibold text-[#1E88E5] hover:bg-[#D1E5F5] transition-colors">
                  See Full Recovery Plan
                </button>
              </div>
            </motion.div>
            {/* Floating metric */}
            <motion.div animate={{ x: [0, 8, 0], y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -right-4 -bottom-4 rounded-2xl bg-white shadow-lg p-4 border border-[#E3F0FA]">
              <p className="text-xs text-[#8A8580]">Avg. recovery</p>
              <p className="text-2xl font-bold text-[#1E88E5]">6.2 <span className="text-sm font-normal text-[#8A8580]">weeks</span></p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Conditions ─── */
function Conditions() {
  return (
    <SectionWrap id="conditions" className="bg-white">
      <SectionHeading title="Conditions we treat" subtitle="Targeted, evidence-based treatment plans for common movement and pain conditions." />
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
        variants={stagger} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {conditions.map((c, i: number) => (
          <motion.div key={c.name} variants={fadeUp} custom={i}
            className="movement-card rounded-2xl bg-[#F5F3F0] p-6 text-center">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-[#E3F0FA] flex items-center justify-center">
              {iconCond(c.icon)}
            </div>
            <h3 className="mt-4 text-base font-semibold text-[#2D2B28]">{c.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#8A8580]">{c.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrap>
  )
}

/* ─── Programs ─── */
function Programs() {
  const [activeProgram, setActiveProgram] = useState(0)

  return (
    <SectionWrap id="programs" className="bg-[#F5F3F0]">
      <SectionHeading title="Our programs" subtitle="Structured recovery programs designed for your specific needs." />
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {programs.map((p, i) => (
            <button key={p.name} onClick={() => setActiveProgram(i)}
              className={`px-5 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                activeProgram === i
                  ? 'bg-[#1E88E5] text-white shadow-lg'
                  : 'bg-white border border-[#D1D0CC] text-[#8A8580] hover:border-[#1E88E5]/30 hover:text-[#1E88E5]'
              }`}>
              {p.name}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={activeProgram}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl bg-white border border-[#E2E8F0] p-8 md:p-10">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-xl font-bold text-[#2D2B28]">{programs[activeProgram].name}</h3>
                <p className="mt-3 text-[#8A8580] leading-relaxed">{programs[activeProgram].description}</p>
                <motion.button whileHover={{ scale: 1.02 }}
                  className="mt-6 rounded-full bg-[#1E88E5] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#1565C0] transition-all">
                  Learn More <IconArrowRight c="text-white inline-block ml-1" />
                </motion.button>
              </div>
              <div className="bg-[#F5F3F0] rounded-xl p-6">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#1E88E5] mb-4">What's included</h4>
                <ul className="space-y-3">
                  {programs[activeProgram].features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-[#E3F0FA] flex items-center justify-center flex-shrink-0">
                        <IconCheck />
                      </span>
                      <span className="text-sm text-[#2D2B28]">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionWrap>
  )
}

/* ─── Recovery Plan Timeline ─── */
function RecoveryPlan() {
  const [activeStep, setActiveStep] = useState<number | null>(null)

  return (
    <SectionWrap id="recovery" className="bg-white">
      <SectionHeading title="Your recovery plan" subtitle="A phased approach with clear milestones and measurable progress." />
      <div className="mx-auto max-w-4xl">
        {/* Desktop timeline */}
        <div className="hidden md:block relative">
          <div className="absolute top-16 left-0 right-0 h-0.5 bg-[#E2E8F0]" />
          <div className="absolute top-16 left-0 h-0.5 bg-[#1E88E5]" style={{ width: activeStep !== null ? `${(activeStep + 1) * 25}%` : '0%' }} />
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            variants={stagger} className="grid grid-cols-4 gap-4">
            {recoveryStages.map((r, i) => (
              <motion.div key={r.step} variants={fadeUp} custom={i}
                onClick={() => setActiveStep(activeStep === i ? null : i)}
                className={`timeline-step cursor-pointer text-center ${activeStep === i ? 'active' : ''}`}>
                <div className={`step-dot mx-auto w-12 h-12 rounded-2xl flex items-center justify-center text-base font-bold mb-4 ${
                  activeStep !== null && i <= activeStep ? 'bg-[#1E88E5] text-white shadow-lg' : 'bg-[#E3F0FA] text-[#1E88E5]'
                }`}>
                  {i + 1}
                </div>
                <h3 className="text-base font-semibold text-[#2D2B28]">{r.step}</h3>
                <p className="text-xs font-medium text-[#1E88E5] mt-1">{r.subtitle}</p>
                <p className="text-xs text-[#A09890] mt-1">{r.duration}</p>
                <AnimatePresence>
                  {activeStep === i && (
                    <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} className="mt-2 text-sm text-[#8A8580] overflow-hidden">
                      {r.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mobile timeline */}
        <div className="md:hidden space-y-6">
          {recoveryStages.map((r, i) => (
            <motion.div key={r.step} initial={{ opacity: 0, x: -20 }} whileInView="visible"
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              onClick={() => setActiveStep(activeStep === i ? null : i)}
              className={`timeline-step flex items-start gap-4 p-4 rounded-xl bg-[#F5F3F0] cursor-pointer ${activeStep === i ? 'active' : ''}`}>
              <div className={`step-dot w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                i <= (activeStep ?? -1) ? 'bg-[#1E88E5] text-white' : 'bg-[#E3F0FA] text-[#1E88E5]'
              }`}>{i + 1}</div>
              <div>
                <h3 className="text-sm font-semibold text-[#2D2B28]">{r.step}</h3>
                <p className="text-xs text-[#1E88E5]">{r.subtitle} &middot; {r.duration}</p>
                <AnimatePresence>
                  {activeStep === i && (
                    <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} className="mt-2 text-sm text-[#8A8580] overflow-hidden">
                      {r.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrap>
  )
}

/* ─── Progress Dashboard ─── */
function ProgressDashboard() {
  return (
    <SectionWrap id="progress" className="bg-[#F5F3F0]">
      <SectionHeading title="Track your progress" subtitle="Data-driven recovery metrics that show you how far you've come." />
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
        variants={stagger} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {progressMetrics.map((m, i) => (
          <motion.div key={m.label} variants={fadeUp} custom={i}
            className="rounded-2xl bg-white border border-[#E2E8F0] p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8A8580]">{m.label}</span>
              {m.improvement && <span className="flex items-center gap-1 text-xs font-medium text-emerald-600"><IconTrendUp /> Improving</span>}
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-[#2D2B28]">{m.current}</span>
              <span className="text-sm text-[#8A8580]">{m.unit}</span>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs text-[#8A8580] mb-1">
                <span>Current</span>
                <span>Previous: {m.previous}{m.unit}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#F0EFED] overflow-hidden">
                <motion.div initial={{ width: 0 }} whileInView={{ width: `${(m.current / (m.current + m.previous)) * 100}%` }}
                  viewport={{ once: true }}
                  className="bar-fill h-full rounded-full bg-gradient-to-r from-[#1E88E5] to-[#64B5F6]" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrap>
  )
}

/* ─── Therapist Team ─── */
function TherapistTeam() {
  return (
    <SectionWrap id="team" className="bg-white">
      <SectionHeading title="Meet your therapists" subtitle="Experienced clinicians dedicated to your recovery." />
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
        variants={stagger} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {therapists.map((t, i: number) => (
          <motion.div key={t.name} variants={fadeUp} custom={i}
            className="movement-card rounded-2xl border border-[#E2E8F0] bg-white p-6 text-center">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-[#E3F0FA] flex items-center justify-center text-xl font-bold text-[#1E88E5]">
              {t.name.split(' ').map(w => w[0]).join('')}
            </div>
            <h3 className="mt-4 text-base font-semibold text-[#2D2B28]">{t.name}</h3>
            <p className="text-xs font-bold uppercase tracking-wider text-[#1E88E5] mt-1">{t.title}</p>
            <p className="text-xs text-[#A09890] mt-0.5">{t.specialties}</p>
            <p className="mt-3 text-sm leading-relaxed text-[#8A8580]">{t.bio}</p>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrap>
  )
}

/* ─── CTA ─── */
function CTA() {
  return (
    <SectionWrap id="cta" className="bg-[#2D2B28] relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
        <svg width="100%" height="100%"><defs><pattern id="dots" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="white"/></pattern></defs><rect width="100%" height="100%" fill="url(#dots)"/></svg>
      </div>
      <div className="mx-auto max-w-3xl text-center relative">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView="visible" viewport={{ once: true }}>
          <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">Ready to move without pain?</h2>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            Book a free assessment and get a personalized recovery plan. No commitment, no pressure.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="rounded-full bg-[#1E88E5] px-10 py-3.5 text-base font-semibold text-white shadow-lg hover:bg-[#1565C0] transition-all">
              Book Free Assessment
            </motion.button>
            <button
              className="rounded-full border border-white/20 bg-white/10 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/20 transition-all">
              (555) 345-6789
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
    <footer className="bg-[#1A1917] px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 text-xl font-bold text-white">
              <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="12" stroke="#1E88E5" strokeWidth="2" strokeDasharray="4 3"/>
                <path d="M14 6c-3 1.5-5 4.5-5 8s2 6.5 5 8c3-1.5 5-4.5 5-8s-2-6.5-5-8z" fill="#1E88E5" opacity="0.3"/>
                <circle cx="14" cy="14" r="3" fill="#1E88E5"/>
              </svg>
              Align Motion
            </div>
            <p className="mt-3 text-sm text-[#A09890] max-w-md">
              Evidence-based physical therapy that gets you back to what you love. Move without pain. Live without limits.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Contact</h4>
            <p className="text-sm text-[#A09890]">111 Movement Street, Suite 100</p>
            <p className="text-sm text-[#A09890] mt-1">Portland, OR 97204</p>
            <p className="text-sm text-[#A09890] mt-1">(555) 345-6789</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Hours</h4>
            <p className="text-sm text-[#A09890]">Mon–Fri: 6 AM – 7 PM</p>
            <p className="text-sm text-[#A09890] mt-1">Saturday: 8 AM – 2 PM</p>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-[#8A8580]">&copy; {new Date().getFullYear()} Align Motion Physical Therapy. All rights reserved.</p>
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
        <Conditions />
        <Programs />
        <RecoveryPlan />
        <ProgressDashboard />
        <TherapistTeam />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
