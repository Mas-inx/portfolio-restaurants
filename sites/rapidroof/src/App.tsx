import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import {
  siteInfo,
  services,
  inspectionSteps,
  repairSigns,
  beforeAfterRepairs,
  trustPoints,
  navLinks,
} from './data'

/* ── Scroll Reveal ── */
function ScrollReveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

/* ── Section Heading ── */
function SectionHeading({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-14">
      <span className="text-xs font-bold tracking-[0.2em] uppercase text-red-500">{label}</span>
      <h2 className="text-3xl md:text-4xl font-heading text-[#1a365d] mt-2 leading-tight">{title}</h2>
      {subtitle && <p className="text-[#1a365d]/60 mt-3 max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  )
}

/* ── Emergency Banner (sticky on mobile) ── */
function EmergencyBanner() {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 2, duration: 0.5 }}
      className="fixed bottom-0 left-0 right-0 z-40 bg-red-600 text-white md:hidden"
    >
      <a href="tel:+13125550999" className="flex items-center justify-center gap-2 px-4 py-3 font-bold text-sm tracking-wide">
        <span className="animate-pulse text-lg">🚨</span>
        <span>Emergency? Call (312) 555-0999</span>
      </a>
    </motion.div>
  )
}

/* ── Navbar ── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    setMobileOpen(false)
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-20">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#1a365d] rounded flex items-center justify-center">
            <span className="text-white font-heading text-lg leading-none">R</span>
          </div>
          <div className="hidden sm:block text-left">
            <span className="text-lg font-heading tracking-tight text-[#1a365d] block leading-none">RapidRoof</span>
            <span className="text-[10px] uppercase tracking-[0.15em] text-[#1a365d]/60 font-medium">& Exteriors</span>
          </div>
        </button>

        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((l) => (
            <button key={l.href} onClick={() => scrollTo(l.href)} className="text-sm font-semibold text-[#1a365d]/70 hover:text-[#1a365d] transition-colors tracking-wide uppercase">
              {l.label}
            </button>
          ))}
          <a href="tel:+13125550999" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 text-sm font-bold tracking-wide transition-colors rounded-sm flex items-center gap-2">
            <span className="animate-pulse">🚨</span> Emergency: (312) 555-0999
          </a>
          <button onClick={() => scrollTo('#contact')} className="bg-[#1a365d] text-white px-5 py-2.5 text-sm font-bold tracking-wide hover:bg-[#0f2440] transition-colors rounded-sm">
            Free Inspection
          </button>
        </div>

        <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
          <div className={`w-6 h-0.5 bg-[#1a365d] mb-1.5 transition-all ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-6 h-0.5 bg-[#1a365d] mb-1.5 transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-0.5 bg-[#1a365d] transition-all ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-white border-t overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((l) => (
                <button key={l.href} onClick={() => scrollTo(l.href)} className="text-sm font-semibold text-[#1a365d] text-left uppercase tracking-wide">
                  {l.label}
                </button>
              ))}
              <a href="tel:+13125550999" className="bg-red-600 text-white px-5 py-3 text-sm font-bold tracking-wide text-center rounded-sm">🚨 Call Emergency Line</a>
              <button onClick={() => scrollTo('#contact')} className="bg-[#1a365d] text-white px-5 py-3 text-sm font-bold tracking-wide text-center rounded-sm">
                Free Inspection
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

/* ── Hero ── */
function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} className="relative h-screen min-h-[600px] flex items-center bg-[#1a365d] overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a365d]/95 via-[#1a365d]/80 to-[#1a365d]/90 z-10" />
        <img
          src="https://images.unsplash.com/photo-1631952112740-0f14afdf42f2?w=1600&q=85"
          alt="Roof installation"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <span className="text-red-400 text-sm font-bold tracking-[0.25em] uppercase">
              {siteInfo.shortTagline}
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-4xl sm:text-5xl md:text-6xl font-heading text-white leading-[1.05] mt-4"
          >
            Roof problems handled<span className="block text-red-400">before they become expensive</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-white/70 text-lg mt-6 max-w-xl leading-relaxed"
          >
            Emergency roof repair, full replacements, gutters, siding, and storm damage — with fast response times
            and workmanship that lasts.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-wrap gap-4 mt-8"
          >
            <a href="tel:+13125550999" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 font-bold text-sm uppercase tracking-wide transition-colors rounded-sm flex items-center gap-2">
              <span>🚨</span> Emergency? Call Now
            </a>
            <a href="#contact" className="bg-white text-[#1a365d] px-8 py-4 font-bold text-sm uppercase tracking-wide hover:bg-gray-100 transition-colors rounded-sm">
              Free Inspection
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="flex gap-8 mt-14 text-white/60"
          >
            <div><span className="text-white text-2xl font-heading block">{siteInfo.yearsExperience}yr</span><span className="text-[10px] uppercase tracking-widest">Experience</span></div>
            <div><span className="text-white text-2xl font-heading block">{siteInfo.reviews}+</span><span className="text-[10px] uppercase tracking-widest">Reviews</span></div>
            <div><span className="text-white text-2xl font-heading block">{siteInfo.rating}</span><span className="text-[10px] uppercase tracking-widest">Stars</span></div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-white/40 text-xs uppercase tracking-[0.2em]">
          Scroll
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ── Services ── */
function Services() {
  return (
    <section id="services" className="relative px-6 md:px-12 lg:px-24 py-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="Services"
          title="What we fix, replace, and install"
          subtitle="Roofs, gutters, siding, and storm damage — we handle the exterior so you don't have to think about it."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 0.07}>
              <div className={`p-6 rounded-sm border transition-all duration-300 ${
                s.urgent
                  ? 'bg-red-50 border-red-200 hover:bg-red-100'
                  : 'bg-white border-[#1a365d]/10 hover:border-[#1a365d]/30 hover:shadow-md'
              }`}>
                <div className="flex items-start justify-between mb-2">
                  <span className="text-2xl">{s.icon}</span>
                  {s.urgent && <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-100 px-2 py-0.5 rounded-sm">24/7</span>}
                </div>
                <h3 className="text-lg font-heading text-[#1a365d]">{s.title}</h3>
                <p className="text-[#1a365d]/60 text-sm mt-1.5 leading-relaxed">{s.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Inspection Flow ── */
function InspectionFlow() {
  return (
    <section id="inspection" className="relative px-6 md:px-12 lg:px-24 py-24 bg-[#f0f4f8]">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          label="How It Works"
          title="Book. Inspect. Quote. Repair."
          subtitle="Four simple steps from first call to completed work."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {inspectionSteps.map((step, i) => (
            <ScrollReveal key={step.step} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white border border-[#1a365d]/10 p-6 rounded-sm text-center hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-[#1a365d] text-white rounded-full flex items-center justify-center font-heading text-lg mx-auto mb-3">
                  {step.step}
                </div>
                <span className="text-2xl block mb-2">{step.icon}</span>
                <h3 className="text-base font-heading text-[#1a365d]">{step.title}</h3>
                <p className="text-[#1a365d]/60 text-xs mt-2 leading-relaxed">{step.description}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Storm Damage Support ── */
function StormDamageSupport() {
  return (
    <section className="relative px-6 md:px-12 lg:px-24 py-20 bg-[#1a365d]">
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-5xl block mb-4">🌪️</span>
        <h2 className="text-3xl md:text-4xl font-heading text-white leading-tight">
          Storm damage? We'll document everything for your insurance claim
        </h2>
        <p className="text-white/60 mt-4 text-lg max-w-2xl mx-auto">
          Detailed inspection reports, photo documentation, and direct communication with your adjuster.
          We make sure your claim covers what it should.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <a href="#contact" className="bg-white text-[#1a365d] px-8 py-4 font-bold text-sm uppercase tracking-wide hover:bg-gray-100 transition-colors rounded-sm">
            Schedule Storm Inspection
          </a>
          <a href="tel:+13125550999" className="border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 font-bold text-sm uppercase tracking-wide transition-colors rounded-sm">
            Emergency: (312) 555-0999
          </a>
        </div>
      </div>
    </section>
  )
}

/* ── Signs You Need Repair (Expandable Checklist) ── */
function RepairSignsSection() {
  const [expanded, setExpanded] = useState(false)
  const visibleSigns = expanded ? repairSigns : repairSigns.slice(0, 4)

  const severityColors = {
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    high: 'bg-orange-100 text-orange-700 border-orange-200',
    critical: 'bg-red-100 text-red-700 border-red-200',
  }

  return (
    <section id="signs" className="relative px-6 md:px-12 lg:px-24 py-24 bg-white">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          label="Warning Signs"
          title="Signs you need roof repair"
          subtitle="If you see any of these, it's time for an inspection. Most issues get worse — and more expensive — the longer you wait."
        />
        <div className="space-y-3">
          {visibleSigns.map((sign, i) => (
            <ScrollReveal key={sign.title} delay={i * 0.05}>
              <motion.div
                whileHover={{ x: 3 }}
                className={`border-l-4 rounded-sm p-4 ${
                  sign.severity === 'critical' ? 'border-l-red-500 bg-red-50' :
                  sign.severity === 'high' ? 'border-l-orange-400 bg-orange-50' :
                  'border-l-yellow-400 bg-yellow-50'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-[#1a365d] text-sm flex items-center gap-2">
                      {sign.title}
                      <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-sm border ${severityColors[sign.severity]}`}>
                        {sign.severity}
                      </span>
                    </h3>
                    <p className="text-[#1a365d]/60 text-xs mt-1">{sign.description}</p>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
        {repairSigns.length > 4 && (
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setExpanded(!expanded)}
            className="mt-6 w-full text-center text-sm font-bold text-[#1a365d] bg-[#f0f4f8] py-3 rounded-sm hover:bg-[#e2e8f0] transition-colors"
          >
            {expanded ? 'Show fewer signs' : `Show all ${repairSigns.length} signs`}
          </motion.button>
        )}
      </div>
    </section>
  )
}

/* ── Before & After ── */
function Portfolio() {
  return (
    <section id="portfolio" className="relative px-6 md:px-12 lg:px-24 py-24 bg-[#f0f4f8]">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          label="Before & After"
          title="Repair portfolio"
          subtitle="Real work on real homes. Hover to see the difference."
        />
        <div className="grid md:grid-cols-2 gap-6">
          {beforeAfterRepairs.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.1}>
              <div className="group relative bg-white border border-[#1a365d]/10 rounded-sm overflow-hidden">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.before}
                    alt="Before repair"
                    className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                  />
                  <img
                    src={item.after}
                    alt="After repair"
                    className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <div className="absolute top-2 left-2 bg-black/70 text-white text-[10px] uppercase tracking-wider px-2 py-1 rounded-sm font-bold">
                    Hover to reveal fix
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-heading text-[#1a365d] text-base">{item.title}</h3>
                  <p className="text-[#1a365d]/60 text-xs mt-1">{item.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Trust / Reviews ── */
function Trust() {
  return (
    <section id="trust" className="relative px-6 md:px-12 lg:px-24 py-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="Trust"
          title="Why homeowners choose us"
          subtitle="Licensed, insured, reviewed, and backed by real warranties. Here's what sets us apart."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {trustPoints.map((t, i) => (
            <ScrollReveal key={t.title} delay={i * 0.08}>
              <div className="flex gap-4 p-5 border border-[#1a365d]/10 rounded-sm hover:border-[#1a365d]/30 hover:shadow-sm transition-all">
                <span className="text-2xl shrink-0">{t.icon}</span>
                <div>
                  <h3 className="font-heading text-[#1a365d] text-sm">{t.title}</h3>
                  <p className="text-[#1a365d]/60 text-xs mt-1 leading-relaxed">{t.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Contact ── */
function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="relative px-6 md:px-12 lg:px-24 py-24 bg-[#1a365d]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-red-400">Free Inspection</span>
          <h2 className="text-3xl md:text-4xl font-heading text-white mt-2 leading-tight">
            Schedule your free roof inspection
          </h2>
          <p className="text-white/60 mt-3 max-w-xl mx-auto">
            No obligation. No pressure. Just a thorough inspection and an honest estimate.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8 max-w-4xl mx-auto">
          <div className="md:col-span-2 space-y-4">
            <div className="bg-white/10 border border-white/20 p-4 rounded-sm">
              <div className="text-red-400 font-bold text-sm flex items-center gap-2">🚨 Emergency Line</div>
              <a href="tel:+13125550999" className="text-white font-heading text-lg block mt-1">(312) 555-0999</a>
              <div className="text-white/40 text-xs mt-1">Available 24/7 · Live dispatcher</div>
            </div>
            <div className="bg-white/10 border border-white/20 p-4 rounded-sm">
              <div className="text-white/70 font-semibold text-sm">📞 Office Line</div>
              <div className="text-white text-base">{siteInfo.phone}</div>
            </div>
            <div className="bg-white/10 border border-white/20 p-4 rounded-sm">
              <div className="text-white/70 font-semibold text-sm">✉️ Email</div>
              <div className="text-white text-sm">{siteInfo.email}</div>
            </div>
            <div className="bg-white/10 border border-white/20 p-4 rounded-sm">
              <div className="text-white/70 font-semibold text-sm">📍 Location</div>
              <div className="text-white text-sm">{siteInfo.address}</div>
            </div>
          </div>

          <div className="md:col-span-3">
            <ScrollReveal>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <input type="text" placeholder="Full name" required className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-red-400 transition-colors rounded-sm placeholder-white/30" />
                  <input type="email" placeholder="Email" required className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-red-400 transition-colors rounded-sm placeholder-white/30" />
                </div>
                <input type="tel" placeholder="Phone number" required className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-red-400 transition-colors rounded-sm placeholder-white/30" />
                <input type="text" placeholder="Property address" required className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-red-400 transition-colors rounded-sm placeholder-white/30" />
                <select className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-red-400 transition-colors rounded-sm">
                  <option value="" className="text-gray-400">Service needed</option>
                  <option value="roof-repair" className="text-gray-900">Roof Repair</option>
                  <option value="roof-replacement" className="text-gray-900">Roof Replacement</option>
                  <option value="gutters" className="text-gray-900">Gutters</option>
                  <option value="siding" className="text-gray-900">Siding</option>
                  <option value="storm-damage" className="text-gray-900">Storm Damage</option>
                  <option value="inspection" className="text-gray-900">Just an Inspection</option>
                </select>
                <textarea rows={3} placeholder="Describe the issue..." className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-red-400 transition-colors rounded-sm placeholder-white/30" />
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-4 font-bold text-sm tracking-wide uppercase transition-colors rounded-sm"
                >
                  {submitted ? '✓ Inspection Requested' : 'Schedule Free Inspection'}
                </motion.button>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Footer ── */
function Footer() {
  return (
    <footer className="bg-[#0f1d33] text-white/40 px-6 md:px-12 lg:px-24 py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
            <span className="text-white font-heading text-sm">R</span>
          </div>
          <span className="text-white font-heading text-sm">RapidRoof & Exteriors</span>
        </div>
        <div className="text-xs text-center md:text-left">
          &copy; {new Date().getFullYear()} RapidRoof & Exteriors. {siteInfo.license}. All rights reserved.
        </div>
        <div className="flex gap-4 text-xs">
          <span className="hover:text-white/80 transition-colors cursor-pointer">Privacy</span>
          <span className="hover:text-white/80 transition-colors cursor-pointer">Terms</span>
          <span className="hover:text-white/80 transition-colors cursor-pointer">Warranty</span>
        </div>
      </div>
    </footer>
  )
}

/* ── App ── */
export default function App() {
  return (
    <div className="font-body bg-white text-[#1a365d] antialiased overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <InspectionFlow />
        <StormDamageSupport />
        <RepairSignsSection />
        <Portfolio />
        <Trust />
        <Contact />
      </main>
      <Footer />
      <EmergencyBanner />
    </div>
  )
}
