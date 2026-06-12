import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView, animate } from 'framer-motion'
import {
  conditions,
  recoveryStages,
  programs,
  therapists,
  progressMetrics,
} from './data'

/* ─── SVG Icons (inline, no emoji) ─── */
const IconSpine = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
    <path d="M24 4v40M20 10h8M18 18h12M16 26h16M18 34h12M20 42h8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="24" cy="7" r="2" fill="currentColor" opacity="0.4"/>
    <circle cx="24" cy="15" r="2" fill="currentColor" opacity="0.4"/>
    <circle cx="24" cy="23" r="2" fill="currentColor" opacity="0.4"/>
    <circle cx="24" cy="31" r="2" fill="currentColor" opacity="0.4"/>
    <circle cx="24" cy="39" r="2" fill="currentColor" opacity="0.4"/>
  </svg>
)
const IconKnee = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
    <path d="M16 4v14c0 4 3 8 8 8s8-4 8-8V4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M16 26v18M32 26v18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="24" cy="22" r="5" stroke="currentColor" strokeWidth="2" strokeDasharray="3 2"/>
    <path d="M21 22h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)
const IconShoulder = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
    <path d="M8 16c4-6 10-8 16-8s12 2 16 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M12 20c0 8 5 14 12 14s12-6 12-14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M24 34v10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="24" cy="24" r="4" fill="currentColor" opacity="0.3"/>
  </svg>
)
const IconSports = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
    <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2.5"/>
    <path d="M24 6v36M6 24h36" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3"/>
    <path d="M12 12l24 24M36 12L12 36" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3"/>
    <circle cx="24" cy="24" r="6" fill="currentColor" opacity="0.2"/>
  </svg>
)
const IconSurgery = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
    <path d="M14 34l8-8M26 22l8-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M10 38l4-4M34 14l4-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <rect x="18" y="18" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2" transform="rotate(45 24 24)"/>
    <path d="M22 24h4M24 22v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const iconMap: Record<string, React.FC> = {
  spine: IconSpine, knee: IconKnee, shoulder: IconShoulder, sports: IconSports, surgery: IconSurgery,
}

/* ─── Animated Counter ─── */
function Counter({ target, duration = 2 }: { target: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, target, {
      duration,
      ease: [0.25, 0.1, 0.25, 1] as const,
      onUpdate: (v) => setVal(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, target, duration])

  return <span ref={ref}>{val}</span>
}

/* ─── Kinetic Wave Background ─── */
function KineticWave() {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1E88E5" stopOpacity="0.15"/>
          <stop offset="50%" stopColor="#0D9488" stopOpacity="0.1"/>
          <stop offset="100%" stopColor="#1E88E5" stopOpacity="0.05"/>
        </linearGradient>
        <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0D9488" stopOpacity="0.08"/>
          <stop offset="100%" stopColor="#1E88E5" stopOpacity="0.12"/>
        </linearGradient>
      </defs>
      <motion.path
        d="M0 400 C 240 300, 480 500, 720 400 S 1200 300, 1440 400"
        fill="none" stroke="url(#waveGrad1)" strokeWidth="3"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 3, ease: 'easeInOut' }}
      />
      <motion.path
        d="M0 350 C 300 250, 500 450, 720 350 S 1100 250, 1440 350"
        fill="none" stroke="url(#waveGrad2)" strokeWidth="2"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 3.5, delay: 0.3, ease: 'easeInOut' }}
      />
      <motion.path
        d="M0 450 C 200 550, 400 350, 720 450 S 1200 550, 1440 450"
        fill="none" stroke="url(#waveGrad1)" strokeWidth="1.5"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 4, delay: 0.6, ease: 'easeInOut' }}
      />
      {/* Pulsing dots along the wave */}
      {[200, 500, 800, 1100, 1350].map((x, i) => (
        <motion.circle
          key={i} cx={x} cy={400}
          r="4" fill="#1E88E5" opacity="0.3"
          animate={{ opacity: [0.1, 0.5, 0.1], r: [3, 6, 3] }}
          transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}
    </svg>
  )
}

/* ─── Navbar ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  const go = (id: string) => { setOpen(false); document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' }) }
  const nav = [
    { l: 'Conditions', h: '#conditions' },
    { l: 'Programs', h: '#programs' },
    { l: 'Recovery', h: '#recovery' },
    { l: 'Progress', h: '#progress' },
    { l: 'Team', h: '#team' },
  ]

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#F5F3F0]/90 backdrop-blur-xl shadow-[0_1px_0_rgba(30,136,229,0.1)]' : 'bg-transparent'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 group">
          <div className="relative w-9 h-9">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-[#1E88E5]/40"
            />
            <div className="absolute inset-1.5 rounded-full bg-[#1E88E5] group-hover:scale-110 transition-transform" />
          </div>
          <span className="text-lg font-black tracking-tight text-[#2D2B28]">
            ALIGN<span className="text-[#1E88E5]">/</span>MOTION
          </span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {nav.map(n => (
            <button key={n.h} onClick={() => go(n.h)}
              className="relative px-4 py-2 text-sm font-semibold text-[#2D2B28]/70 hover:text-[#1E88E5] transition-colors group">
              {n.l}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#1E88E5] group-hover:w-4 transition-all duration-300" />
            </button>
          ))}
          <button onClick={() => go('#cta')}
            className="ml-4 rounded-full bg-[#2D2B28] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#1E88E5] transition-all duration-300 hover:shadow-lg hover:shadow-[#1E88E5]/20">
            Book Now
          </button>
        </div>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          <div className="space-y-1.5">
            <motion.div animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }} className="w-6 h-0.5 bg-[#2D2B28]" />
            <motion.div animate={{ opacity: open ? 0 : 1 }} className="w-6 h-0.5 bg-[#2D2B28]" />
            <motion.div animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }} className="w-6 h-0.5 bg-[#2D2B28]" />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-[#F5F3F0] border-t border-[#1E88E5]/10">
            <div className="flex flex-col px-6 py-4 gap-1">
              {nav.map(n => (
                <button key={n.h} onClick={() => go(n.h)} className="text-left py-3 text-sm font-semibold text-[#2D2B28]">{n.l}</button>
              ))}
              <button onClick={() => go('#cta')} className="mt-2 rounded-full bg-[#2D2B28] py-3 text-sm font-bold text-white">Book Now</button>
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
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#F5F3F0]">
      {/* Kinetic wave background */}
      <div className="absolute inset-0 pointer-events-none">
        <KineticWave />
      </div>

      {/* Diagonal accent stripe */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-[#1E88E5]/[0.03] to-transparent skew-x-[-6deg] origin-top-right pointer-events-none" />

      {/* Floating geometric shapes */}
      <motion.div animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-32 right-[15%] w-20 h-20 border-2 border-[#0D9488]/20 rounded-2xl pointer-events-none hidden lg:block" />
      <motion.div animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-40 left-[10%] w-14 h-14 bg-[#1E88E5]/5 rounded-full pointer-events-none hidden lg:block" />

      <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-20 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left: Copy */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }}
            >
              <div className="inline-flex items-center gap-2 mb-6">
                <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }}
                  className="w-2.5 h-2.5 rounded-full bg-[#0D9488]" />
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#0D9488]">Performance Recovery Lab</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tight text-[#2D2B28]">
                <motion.span className="block" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
                  MOVE
                </motion.span>
                <motion.span className="block text-[#1E88E5]" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }}>
                  WITHOUT
                </motion.span>
                <motion.span className="block" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}>
                  LIMITS<span className="text-[#0D9488]">.</span>
                </motion.span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.6 }}
                className="mt-8 text-lg text-[#2D2B28]/60 max-w-lg leading-relaxed"
              >
                Evidence-based physical therapy engineered for athletes and active people. We don't just treat pain — we rebuild performance.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.5 }}
                className="mt-10 flex flex-wrap gap-4"
              >
                <motion.button whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                  onClick={() => document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group relative rounded-full bg-[#1E88E5] px-8 py-4 text-sm font-bold text-white overflow-hidden">
                  <span className="relative z-10">Start Your Recovery →</span>
                  <motion.div className="absolute inset-0 bg-[#0D9488]" initial={{ x: '-100%' }} whileHover={{ x: 0 }} transition={{ duration: 0.3 }} />
                </motion.button>
                <button onClick={() => document.querySelector('#programs')?.scrollIntoView({ behavior: 'smooth' })}
                  className="rounded-full border-2 border-[#2D2B28]/20 px-8 py-4 text-sm font-bold text-[#2D2B28] hover:border-[#1E88E5] hover:text-[#1E88E5] transition-all duration-300">
                  Explore Programs
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* Right: Athlete card + stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 hidden lg:block"
          >
            <div className="relative">
              {/* Main card */}
              <div className="relative rounded-3xl overflow-hidden bg-white shadow-2xl shadow-[#1E88E5]/10 border border-[#1E88E5]/5">
                <div className="relative h-72 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=85"
                    alt="Athlete in motion" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D2B28]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#0D9488]">Active Recovery</p>
                    <p className="text-white font-bold text-lg mt-0.5">Performance Protocol</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-4">
                    {progressMetrics.slice(0, 3).map((m) => (
                      <div key={m.label} className="text-center">
                        <p className="text-2xl font-black text-[#1E88E5]"><Counter target={m.current} /></p>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A8580] mt-1">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 rounded-2xl bg-[#0D9488] px-5 py-3 shadow-xl shadow-[#0D9488]/30"
              >
                <p className="text-xs font-bold text-white/70">Avg Recovery</p>
                <p className="text-xl font-black text-white">6.2 wks</p>
              </motion.div>

              {/* Bottom floating stat */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-6 -left-6 rounded-2xl bg-[#2D2B28] px-5 py-3 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#0D9488]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
                  </svg>
                  <span className="text-sm font-bold text-white">+87% improvement</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" className="w-full h-12">
          <path d="M0 60V30C240 0 480 0 720 30S1200 60 1440 30V60H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  )
}

/* ─── Conditions ─── */
function Conditions() {
  return (
    <section id="conditions" className="bg-white py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-4">
          <div>
            <motion.p initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="text-xs font-black uppercase tracking-[0.2em] text-[#0D9488] mb-3">What We Treat</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-[#2D2B28] tracking-tight">
              Conditions<span className="text-[#1E88E5]">.</span>
            </motion.h2>
          </div>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-[#2D2B28]/50 max-w-md text-sm leading-relaxed">
              Targeted, evidence-based treatment plans built around your specific movement dysfunction and recovery goals.
            </motion.p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {conditions.map((c, i) => {
            const Icon = iconMap[c.icon] || IconSpine
            return (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative rounded-2xl bg-[#F5F3F0] p-6 cursor-pointer overflow-hidden"
              >
                {/* Hover accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-[#1E88E5] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                <div className="w-12 h-12 text-[#1E88E5] group-hover:text-[#0D9488] transition-colors duration-300 mb-4">
                  <motion.div whileHover={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 0.5 }}>
                    <Icon />
                  </motion.div>
                </div>
                <h3 className="text-sm font-black text-[#2D2B28] mb-2">{c.name}</h3>
                <p className="text-xs text-[#2D2B28]/50 leading-relaxed">{c.description}</p>

                {/* Corner number */}
                <span className="absolute top-4 right-4 text-4xl font-black text-[#2D2B28]/[0.04] group-hover:text-[#1E88E5]/10 transition-colors">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ─── Programs (Tabbed) ─── */
function Programs() {
  const [active, setActive] = useState(0)

  return (
    <section id="programs" className="py-24 px-6 bg-[#2D2B28] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)"/>
        </svg>
      </div>

      <div className="mx-auto max-w-7xl relative">
        <div className="mb-14">
          <motion.p initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="text-xs font-black uppercase tracking-[0.2em] text-[#0D9488] mb-3">Programs</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Built for your<span className="text-[#1E88E5]"> recovery.</span>
          </motion.h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {programs.map((p, i) => (
            <motion.button
              key={p.name}
              onClick={() => setActive(i)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                active === i
                  ? 'bg-[#1E88E5] text-white shadow-lg shadow-[#1E88E5]/30'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {p.name}
            </motion.button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-8"
          >
            {/* Left: Description */}
            <div className="rounded-3xl bg-white/5 border border-white/10 p-8 md:p-10 backdrop-blur-sm">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-8 h-0.5 bg-[#1E88E5]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#1E88E5]">Program {active + 1}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-4">{programs[active].name}</h3>
              <p className="text-white/60 leading-relaxed">{programs[active].description}</p>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#1E88E5] px-7 py-3 text-sm font-bold text-white hover:bg-[#0D9488] transition-colors duration-300">
                Learn More
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </motion.button>
            </div>

            {/* Right: Features */}
            <div className="rounded-3xl bg-[#1E88E5]/10 border border-[#1E88E5]/20 p-8 md:p-10">
              <h4 className="text-xs font-black uppercase tracking-[0.15em] text-[#1E88E5] mb-6">What's Included</h4>
              <div className="space-y-4">
                {programs[active].features.map((f, i) => (
                  <motion.div
                    key={f}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#1E88E5]/20 flex items-center justify-center group-hover:bg-[#0D9488]/30 transition-colors flex-shrink-0">
                      <svg className="w-5 h-5 text-[#1E88E5] group-hover:text-[#0D9488] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-white/90">{f}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

/* ─── Recovery Plan (Interactive Timeline) ─── */
function RecoveryPlan() {
  const [step, setStep] = useState(0)
  const progress = ((step + 1) / recoveryStages.length) * 100

  return (
    <section id="recovery" className="py-24 px-6 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16">
          <motion.p initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="text-xs font-black uppercase tracking-[0.2em] text-[#0D9488] mb-3">Recovery Plan</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-[#2D2B28] tracking-tight">
            Your path<span className="text-[#1E88E5]"> forward.</span>
          </motion.h2>
        </div>

        {/* Progress bar */}
        <div className="mb-12">
          <div className="flex justify-between text-xs font-bold text-[#8A8580] mb-2">
            <span>Progress</span>
            <span>Stage {step + 1} of {recoveryStages.length}</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#F5F3F0] overflow-hidden">
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }}
              className="h-full rounded-full bg-gradient-to-r from-[#1E88E5] to-[#0D9488]"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Timeline steps (left) */}
          <div className="lg:col-span-5 space-y-3">
            {recoveryStages.map((r, i) => (
              <motion.button
                key={r.step}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                onClick={() => setStep(i)}
                className={`w-full text-left rounded-2xl p-5 transition-all duration-300 border-2 ${
                  step === i
                    ? 'bg-[#1E88E5] border-[#1E88E5] shadow-lg shadow-[#1E88E5]/20'
                    : i <= step
                    ? 'bg-[#F5F3F0] border-[#0D9488]/20 hover:border-[#1E88E5]/40'
                    : 'bg-[#F5F3F0]/50 border-transparent hover:border-[#1E88E5]/20'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0 ${
                    step === i ? 'bg-white text-[#1E88E5]' : i <= step ? 'bg-[#0D9488]/20 text-[#0D9488]' : 'bg-white text-[#8A8580]'
                  }`}>
                    {i <= step ? (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    ) : (
                      i + 1
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-bold ${step === i ? 'text-white' : 'text-[#2D2B28]'}`}>{r.step}</p>
                    <p className={`text-xs ${step === i ? 'text-white/70' : 'text-[#8A8580]'}`}>{r.duration}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Detail panel (right) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl bg-[#F5F3F0] p-8 md:p-10 h-full"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#1E88E5] flex items-center justify-center">
                    <span className="text-lg font-black text-white">{step + 1}</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#0D9488]">{recoveryStages[step].duration}</p>
                    <h3 className="text-xl font-black text-[#2D2B28]">{recoveryStages[step].step}</h3>
                  </div>
                </div>

                <p className="text-2xl font-bold text-[#1E88E5] mb-4">{recoveryStages[step].subtitle}</p>
                <p className="text-[#2D2B28]/60 leading-relaxed text-base">{recoveryStages[step].description}</p>

                {/* Visual indicator */}
                <div className="mt-8 flex items-center gap-4">
                  <div className="flex-1 h-1 rounded-full bg-[#2D2B28]/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${((step + 1) / recoveryStages.length) * 100}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="h-full rounded-full bg-gradient-to-r from-[#1E88E5] to-[#0D9488]"
                    />
                  </div>
                  <span className="text-xs font-bold text-[#8A8580]">{Math.round(((step + 1) / recoveryStages.length) * 100)}%</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Progress Dashboard ─── */
function ProgressDashboard() {
  return (
    <section id="progress" className="py-24 px-6 bg-[#F5F3F0]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16">
          <motion.p initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="text-xs font-black uppercase tracking-[0.2em] text-[#0D9488] mb-3">Data-Driven Results</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-[#2D2B28] tracking-tight">
            Track your<span className="text-[#1E88E5]"> progress.</span>
          </motion.h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {progressMetrics.map((m, i) => {
            const pct = m.label === 'Pain Level'
              ? ((m.previous - m.current) / m.previous) * 100  // lower is better
              : ((m.current - m.previous) / (100 - m.previous)) * 100
            const barWidth = m.label === 'Pain Level'
              ? (m.current / 10) * 100
              : m.current

            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="rounded-2xl bg-white p-6 border border-[#2D2B28]/5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black uppercase tracking-wider text-[#8A8580]">{m.label}</span>
                  {m.improvement && (
                    <span className="flex items-center gap-1 rounded-full bg-[#0D9488]/10 px-2.5 py-1">
                      <svg className="w-3 h-3 text-[#0D9488]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
                      </svg>
                      <span className="text-[10px] font-bold text-[#0D9488]">
                        {m.label === 'Pain Level' ? `-${Math.round(pct)}%` : `+${Math.round(pct)}%`}
                      </span>
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-black text-[#2D2B28]"><Counter target={m.current} /></span>
                  <span className="text-sm font-bold text-[#8A8580]">{m.unit}</span>
                </div>
                <p className="text-xs text-[#8A8580] mb-5">from {m.previous}{m.unit}</p>

                {/* Animated bar */}
                <div className="w-full h-3 rounded-full bg-[#F5F3F0] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${barWidth}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease: [0.25, 0.1, 0.25, 1] as const }}
                    className={`h-full rounded-full ${
                      m.label === 'Pain Level'
                        ? 'bg-gradient-to-r from-[#0D9488] to-[#1E88E5]'
                        : 'bg-gradient-to-r from-[#1E88E5] to-[#0D9488]'
                    }`}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ─── Therapist Team ─── */
function TherapistTeam() {
  return (
    <section id="team" className="py-24 px-6 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16">
          <motion.p initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="text-xs font-black uppercase tracking-[0.2em] text-[#0D9488] mb-3">The Team</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-[#2D2B28] tracking-tight">
            Meet your<span className="text-[#1E88E5]"> therapists.</span>
          </motion.h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {therapists.map((t, i) => {
            const initials = t.name.split(' ').filter(w => w[0] === w[0].toUpperCase()).map(w => w[0]).join('').slice(0, 2)
            return (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative rounded-3xl overflow-hidden bg-[#F5F3F0]"
              >
                {/* Photo area with gradient */}
                <div className="relative h-48 bg-gradient-to-br from-[#1E88E5] to-[#0D9488] overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl font-black text-white/20">{initials}</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D2B28]/40 to-transparent" />
                  {/* Decorative lines */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20" />
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="text-base font-black text-[#2D2B28]">{t.name}</h3>
                  <p className="text-xs font-bold text-[#1E88E5] mt-1">{t.title}</p>
                  <p className="text-xs text-[#0D9488] font-semibold mt-0.5">{t.specialties}</p>
                  <p className="text-xs text-[#2D2B28]/50 mt-3 leading-relaxed">{t.bio}</p>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-[#1E88E5]/30 transition-colors duration-300 pointer-events-none" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ─── CTA ─── */
function CTA() {
  return (
    <section id="cta" className="py-24 px-6 bg-[#1E88E5] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white/5"
        />
        <motion.div
          animate={{ x: [0, -80, 0], y: [0, 60, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-[#0D9488]/10"
        />
        {/* Diagonal lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="0" y1="100" x2="100" y2="0" stroke="white" strokeWidth="0.3"/>
          <line x1="20" y1="100" x2="100" y2="20" stroke="white" strokeWidth="0.2"/>
          <line x1="0" y1="80" x2="80" y2="0" stroke="white" strokeWidth="0.2"/>
        </svg>
      </div>

      <div className="mx-auto max-w-4xl text-center relative">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-white/60 mb-4">Ready to start?</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Your recovery<br />starts today<span className="text-[#F5F3F0]/40">.</span>
          </h2>
          <p className="mt-6 text-lg text-white/70 max-w-xl mx-auto">
            Book a free assessment and get a personalized recovery plan. No commitment, no pressure — just results.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <motion.button whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
              className="rounded-full bg-white px-10 py-4 text-sm font-black text-[#1E88E5] shadow-xl hover:shadow-2xl transition-shadow">
              Book Free Assessment
            </motion.button>
            <motion.a whileHover={{ scale: 1.02 }} href="tel:5553456789"
              className="rounded-full border-2 border-white/30 px-8 py-4 text-sm font-bold text-white hover:bg-white/10 transition-colors inline-flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
              </svg>
              (555) 345-6789
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
    <footer className="bg-[#1A1917] px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#1E88E5]/40" />
                <div className="absolute inset-1.5 rounded-full bg-[#1E88E5]" />
              </div>
              <span className="text-lg font-black text-white tracking-tight">
                ALIGN<span className="text-[#1E88E5]">/</span>MOTION
              </span>
            </div>
            <p className="text-sm text-[#A09890] max-w-sm leading-relaxed">
              Evidence-based physical therapy engineered for athletes and active people. Move without pain. Live without limits.
            </p>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-black uppercase tracking-[0.15em] text-white mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-[#A09890]">
              <p>111 Movement Street, Suite 100</p>
              <p>Portland, OR 97204</p>
              <p className="text-[#1E88E5] font-semibold">(555) 345-6789</p>
            </div>
          </div>

          {/* Hours */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-black uppercase tracking-[0.15em] text-white mb-4">Hours</h4>
            <div className="space-y-2 text-sm text-[#A09890]">
              <div className="flex justify-between max-w-[200px]">
                <span>Mon – Fri</span><span className="text-white font-semibold">6 AM – 7 PM</span>
              </div>
              <div className="flex justify-between max-w-[200px]">
                <span>Saturday</span><span className="text-white font-semibold">8 AM – 2 PM</span>
              </div>
              <div className="flex justify-between max-w-[200px]">
                <span>Sunday</span><span className="text-white/40">Closed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#8A8580]">&copy; {new Date().getFullYear()} Align & Motion Physical Therapy. All rights reserved.</p>
          <div className="flex gap-4">
            {['Privacy', 'Terms', 'Accessibility'].map(l => (
              <button key={l} className="text-xs text-[#8A8580] hover:text-[#1E88E5] transition-colors">{l}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ─── App ─── */
export default function App() {
  return (
    <div className="font-sans antialiased text-[#2D2B28]">
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
