import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import {
  siteInfo,
  services,
  projects,
  processSteps,
  siteManagementPillars,
  trustPoints,
  faqs,
  navLinks,
} from './data'

/* ── Animated Blueprint Lines ── */
function BlueprintLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.07]"
      viewBox="0 0 1200 800"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M0,400 L1200,400 M600,0 L600,800 M200,0 L200,800 M1000,0 L1000,800 M0,200 L1200,200 M0,600 L1200,600"
        stroke="#f97316"
        strokeWidth="1"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />
      <motion.path
        d="M300,0 L300,800 M900,0 L900,800 M0,100 L1200,100 M0,300 L1200,300 M0,500 L1200,500 M0,700 L1200,700"
        stroke="#f97316"
        strokeWidth="0.5"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, ease: 'easeInOut', delay: 0.5 }}
      />
      <motion.circle
        cx="600" cy="400" r="3" fill="#f97316"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.5, duration: 0.5 }}
      />
    </svg>
  )
}

/* ── Reusable Section Wrapper ── */
function Section({ id, children, className = '' }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative px-6 md:px-12 lg:px-24 py-24 ${className}`}>
      {children}
    </section>
  )
}

/* ── Scroll Reveal ── */
function ScrollReveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* ── Section Heading ── */
function SectionHeading({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-16">
      <span className="text-sm font-bold tracking-[0.2em] uppercase text-orange-500">{label}</span>
      <h2 className="text-4xl md:text-5xl font-heading tracking-tight text-gray-900 mt-3">{title}</h2>
      {subtitle && <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">{subtitle}</p>}
    </div>
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
          <div className="w-10 h-10 bg-gray-900 rounded flex items-center justify-center">
            <span className="text-orange-500 font-heading text-xl leading-none">F</span>
          </div>
          <div className="hidden sm:block">
            <span className="text-lg font-heading tracking-tight text-gray-900 block leading-none">ForgeBuilt</span>
            <span className="text-[10px] uppercase tracking-[0.15em] text-gray-500 font-medium">Contractors</span>
          </div>
        </button>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((l) => (
            <button key={l.href} onClick={() => scrollTo(l.href)} className="text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors tracking-wide uppercase">
              {l.label}
            </button>
          ))}
          <button onClick={() => scrollTo('#contact')} className="bg-gray-900 text-white px-5 py-2.5 text-sm font-bold tracking-wide hover:bg-gray-800 transition-colors rounded-sm">
            Get Estimate
          </button>
        </div>

        <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
          <div className={`w-6 h-0.5 bg-gray-900 mb-1.5 transition-all ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-6 h-0.5 bg-gray-900 mb-1.5 transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-0.5 bg-gray-900 transition-all ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
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
                <button key={l.href} onClick={() => scrollTo(l.href)} className="text-sm font-semibold text-gray-700 text-left uppercase tracking-wide">
                  {l.label}
                </button>
              ))}
              <button onClick={() => scrollTo('#contact')} className="bg-gray-900 text-white px-5 py-3 text-sm font-bold tracking-wide text-center rounded-sm">
                Get Estimate
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
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} className="relative h-screen min-h-[600px] flex items-center bg-gray-900 overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-900/80 to-gray-900/95 z-10" />
        <img
          src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1600&q=85"
          alt="Construction site"
          className="w-full h-full object-cover"
        />
      </motion.div>
      <BlueprintLines />

      <motion.div style={{ opacity }} className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="text-orange-400 text-sm font-bold tracking-[0.25em] uppercase">
              {siteInfo.shortTagline}
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-5xl sm:text-7xl md:text-8xl font-heading text-white leading-[0.9] mt-4 tracking-tight"
          >
            Built with control<br />
            <span className="text-orange-400">from first plan</span><br />
            to final handover
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-gray-300 text-lg mt-6 max-w-xl leading-relaxed"
          >
            Commercial fit-outs, residential builds, and structural renovations — delivered with the discipline of a
            general contractor who treats every square foot like it belongs to them.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-wrap gap-4 mt-8"
          >
            <a
              href="#contact"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 font-bold tracking-wide text-sm uppercase transition-colors rounded-sm"
            >
              Request Estimate
            </a>
            <a
              href="#portfolio"
              className="border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 font-semibold tracking-wide text-sm uppercase transition-colors rounded-sm"
            >
              View Portfolio
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="flex gap-10 mt-16 text-white/70"
          >
            <div><span className="text-white text-2xl font-heading block">{siteInfo.yearsExperience}+</span><span className="text-xs uppercase tracking-wider">Years</span></div>
            <div><span className="text-white text-2xl font-heading block">{siteInfo.projectsCompleted}+</span><span className="text-xs uppercase tracking-wider">Projects</span></div>
            <div><span className="text-white text-2xl font-heading block">IL-GC</span><span className="text-xs uppercase tracking-wider">Licensed</span></div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/50 text-xs uppercase tracking-[0.2em]"
        >
          Scroll
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ── Services ── */
function Services() {
  return (
    <Section id="services">
      <SectionHeading
        label="Services"
        title="What we build"
        subtitle="From ground-up commercial construction to precision residential renovations — we cover the full spectrum of general contracting."
      />
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <ScrollReveal key={s.title} delay={i * 0.08}>
            <div className="group bg-gray-50 border border-gray-200 p-8 hover:bg-gray-900 hover:border-gray-900 transition-all duration-500 rounded-sm">
              <span className="text-3xl block mb-4 group-hover:scale-110 transition-transform duration-500">{s.icon}</span>
              <h3 className="text-lg font-heading text-gray-900 group-hover:text-white transition-colors duration-500">{s.title}</h3>
              <p className="text-gray-500 group-hover:text-gray-300 mt-3 text-sm leading-relaxed transition-colors duration-500">{s.description}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  )
}

/* ── Portfolio ── */
function Portfolio() {
  return (
    <Section id="portfolio" className="bg-gray-50">
      <SectionHeading
        label="Portfolio"
        title="Selected projects"
        subtitle="Every project tells a story. Here are a few we're proud to have built."
      />
      <div className="max-w-7xl mx-auto">
        {projects.map((p, i) => (
          <ScrollReveal key={p.title} delay={i * 0.1}>
            <div
              className={`group grid md:grid-cols-2 gap-8 mb-12 pb-12 ${
                i < projects.length - 1 ? 'border-b border-gray-200' : ''
              }`}
            >
              <div className={`overflow-hidden rounded-sm ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden"
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-72 md:h-96 object-cover"
                  />
                </motion.div>
              </div>
              <div className={`flex flex-col justify-center ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                <span className="text-orange-500 text-xs font-bold tracking-[0.2em] uppercase">{p.category}</span>
                <h3 className="text-2xl md:text-3xl font-heading text-gray-900 mt-2">{p.title}</h3>
                <p className="text-gray-500 mt-4 leading-relaxed">{p.description}</p>
                <div className="flex flex-wrap gap-4 mt-6 text-sm text-gray-600">
                  <span className="flex items-center gap-1">📍 {p.location}</span>
                  <span className="flex items-center gap-1">📐 {p.scope}</span>
                  <span className="flex items-center gap-1">⏱ {p.duration}</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  )
}

/* ── Process ── */
function Process() {
  return (
    <Section id="process">
      <SectionHeading
        label="Process"
        title="How we build"
        subtitle="A structured 5-stage process that keeps every project on schedule, on budget, and on specification."
      />
      <div className="max-w-5xl mx-auto">
        <div className="relative">
          <div className="absolute left-[23px] md:left-[31px] top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block" />
          {processSteps.map((step, i) => (
            <ScrollReveal key={step.step} delay={i * 0.12}>
              <div className="flex gap-6 md:gap-10 mb-10 last:mb-0">
                <div className="hidden md:flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, type: 'spring', stiffness: 200 }}
                    className="w-14 h-14 bg-gray-900 text-white rounded-full flex items-center justify-center font-heading text-xl z-10"
                  >
                    {step.step}
                  </motion.div>
                </div>
                <div className="flex-1 bg-white border border-gray-200 p-6 md:p-8 rounded-sm hover:border-gray-400 transition-colors">
                  <div className="flex items-center gap-3 mb-2 md:hidden">
                    <span className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-heading text-sm">{step.step}</span>
                  </div>
                  <h3 className="text-xl font-heading text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 mt-2">{step.description}</p>
                  <p className="text-gray-400 text-sm mt-3 italic">{step.details}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ── Management ── */
function Management() {
  return (
    <Section id="management" className="bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-bold tracking-[0.2em] uppercase text-orange-400">Site Management</span>
          <h2 className="text-4xl md:text-5xl font-heading tracking-tight text-white mt-3">
            Controlled from start to finish
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
            We don't just build — we manage. Every job site runs on systems, not guesswork.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteManagementPillars.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 0.1}>
              <div className="border border-gray-700 p-8 hover:bg-gray-800 transition-colors duration-300 rounded-sm">
                <span className="text-3xl block mb-4">{p.icon}</span>
                <h3 className="text-lg font-heading text-white">{p.title}</h3>
                <p className="text-gray-400 text-sm mt-3 leading-relaxed">{p.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ── Trust ── */
function Trust() {
  return (
    <Section id="trust">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-bold tracking-[0.2em] uppercase text-orange-500">Trust</span>
          <h2 className="text-4xl md:text-5xl font-heading tracking-tight text-gray-900 mt-3">
            Built on accountability
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
            Licenses, insurance, documentation — the things that separate a real contractor from the rest.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPoints.map((t, i) => (
            <ScrollReveal key={t.title} delay={i * 0.1}>
              <div className="text-center p-8">
                <span className="text-4xl block mb-4">{t.icon}</span>
                <h3 className="text-lg font-heading text-gray-900">{t.title}</h3>
                <p className="text-gray-500 text-sm mt-3 leading-relaxed">{t.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-gray-50 border border-gray-200 p-6 text-center rounded-sm">
            <div className="text-3xl font-heading text-gray-900">{siteInfo.license}</div>
            <div className="text-xs uppercase tracking-wider text-gray-500 mt-1">License</div>
          </div>
          <div className="bg-gray-50 border border-gray-200 p-6 text-center rounded-sm">
            <div className="text-sm font-heading text-gray-900">{siteInfo.insurance}</div>
            <div className="text-xs uppercase tracking-wider text-gray-500 mt-1">Insurance</div>
          </div>
          <div className="bg-gray-50 border border-gray-200 p-6 text-center rounded-sm">
            <div className="text-3xl font-heading text-gray-900">{siteInfo.yearsExperience}+</div>
            <div className="text-xs uppercase tracking-wider text-gray-500 mt-1">Years in Business</div>
          </div>
        </div>
      </div>
    </Section>
  )
}

/* ── FAQ ── */
function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <Section id="faq" className="bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <SectionHeading
          label="FAQ"
          title="Common questions"
          subtitle="Straight answers about how we work, what we charge, and what to expect."
        />
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <div className="bg-white border border-gray-200 rounded-sm overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex justify-between items-center p-5 text-left"
                >
                  <span className="font-semibold text-gray-900 text-sm pr-4">{f.question}</span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-orange-500 shrink-0"
                  >
                    ↓
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="px-5 pb-5 text-gray-500 text-sm leading-relaxed">{f.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ── Contact / Estimate Form ── */
function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <Section id="contact">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-sm font-bold tracking-[0.2em] uppercase text-orange-500">Contact</span>
            <h2 className="text-4xl md:text-5xl font-heading text-gray-900 mt-3 leading-tight">
              Request an estimate
            </h2>
            <p className="text-gray-500 mt-4 leading-relaxed">
              Tell us about your project. We'll review your details and get back to you with a preliminary estimate
              within 2 business days.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <span className="text-orange-500">📞</span>
                <span className="text-sm">{siteInfo.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <span className="text-orange-500">✉️</span>
                <span className="text-sm">{siteInfo.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <span className="text-orange-500">📍</span>
                <span className="text-sm">{siteInfo.address}</span>
              </div>
            </div>
          </div>

          <ScrollReveal>
            <form onSubmit={handleSubmit} className="bg-gray-50 border border-gray-200 p-8 rounded-sm">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-600 font-semibold mb-1">Name</label>
                  <input type="text" required className="w-full border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:border-gray-900 transition-colors rounded-sm" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-600 font-semibold mb-1">Email</label>
                  <input type="email" required className="w-full border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:border-gray-900 transition-colors rounded-sm" placeholder="your@email.com" />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-xs uppercase tracking-wider text-gray-600 font-semibold mb-1">Phone</label>
                <input type="tel" required className="w-full border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:border-gray-900 transition-colors rounded-sm" placeholder="(312) 555-0000" />
              </div>
              <div className="mt-4">
                <label className="block text-xs uppercase tracking-wider text-gray-600 font-semibold mb-1">Project Type</label>
                <select className="w-full border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:border-gray-900 transition-colors rounded-sm">
                  <option>Commercial Fit-Out</option>
                  <option>Residential Construction</option>
                  <option>Renovation / Retrofit</option>
                  <option>Structural Works</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="mt-4">
                <label className="block text-xs uppercase tracking-wider text-gray-600 font-semibold mb-1">Project Details</label>
                <textarea rows={4} required className="w-full border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:border-gray-900 transition-colors rounded-sm" placeholder="Describe your project scope, location, and timeline..." />
              </div>
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="mt-6 w-full bg-gray-900 hover:bg-gray-800 text-white py-4 font-bold text-sm tracking-wide uppercase transition-colors rounded-sm"
              >
                {submitted ? '✓ Estimate Requested' : 'Submit Estimate Request'}
              </motion.button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </Section>
  )
}

/* ── Footer ── */
function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 px-6 md:px-12 lg:px-24 py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
            <span className="text-gray-900 font-heading text-sm">F</span>
          </div>
          <div>
            <span className="text-white font-heading block leading-none">ForgeBuilt</span>
            <span className="text-[10px] uppercase tracking-[0.15em] text-gray-500">Contractors</span>
          </div>
        </div>
        <div className="text-xs text-center md:text-left">
          &copy; {new Date().getFullYear()} {siteInfo.name}. {siteInfo.license}. All rights reserved.
        </div>
        <div className="flex gap-4 text-xs">
          <span className="hover:text-white transition-colors cursor-pointer">Privacy</span>
          <span className="hover:text-white transition-colors cursor-pointer">Terms</span>
          <span className="hover:text-white transition-colors cursor-pointer">Sitemap</span>
        </div>
      </div>
    </footer>
  )
}

/* ── App ── */
export default function App() {
  return (
    <div className="font-body bg-white text-gray-900 antialiased overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Process />
        <Management />
        <Trust />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
