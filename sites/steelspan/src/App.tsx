import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { siteInfo, stats, capabilities, preConServices, safetyPoints, featuredProjects, processPhases, navLinks } from './data'

/* ── Inline SVG Icons (viewBox="0 0 24 24") ── */

function IconBuilding({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="1" />
      <line x1="9" y1="6" x2="9" y2="6.01" />
      <line x1="15" y1="6" x2="15" y2="6.01" />
      <line x1="9" y1="10" x2="9" y2="10.01" />
      <line x1="15" y1="10" x2="15" y2="10.01" />
      <line x1="9" y1="14" x2="9" y2="14.01" />
      <line x1="15" y1="14" x2="15" y2="14.01" />
      <line x1="9" y1="18" x2="15" y2="18" />
    </svg>
  )
}

function IconBlueprint({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="16" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  )
}

function IconChart({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  )
}

function IconTarget({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  )
}

function IconClock({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function IconDollar({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
}

function IconShield({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

function IconClipboard({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    </svg>
  )
}

function IconMenu({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

function IconX({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function IconArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

function IconCheck({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

const capabilityIcons = [IconBuilding, IconBlueprint, IconChart, IconTarget, IconClock, IconDollar]

/* ── Components ── */

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-navy/95 backdrop-blur-lg shadow-2xl shadow-black/20' : 'bg-gradient-to-b from-black/40 to-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#" className="font-heading text-lg sm:text-xl tracking-tight text-white">
            STEEL<span className="text-amber-500">SPAN</span>
            {scrolled && <span className="block text-[10px] text-steel-light font-body font-normal tracking-widest uppercase -mt-0.5">Commercial Builders</span>}
          </a>
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-sm font-medium text-white/70 hover:text-amber-400 transition-colors tracking-wide uppercase">
                {l.label}
              </a>
            ))}
            <a href="#contact" className="bg-amber-500 text-navy px-5 py-2.5 text-sm font-bold uppercase tracking-wider hover:bg-amber-400 transition-all hover:shadow-lg hover:shadow-amber-500/25">
              Submit RFP
            </a>
          </div>
          <button className="lg:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <IconX className="text-white" /> : <IconMenu className="text-white" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-navy border-t border-white/5">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="block text-white/70 font-medium hover:text-amber-400 transition-colors">{l.label}</a>
              ))}
              <a href="#contact" onClick={() => setMenuOpen(false)} className="block bg-amber-500 text-navy px-5 py-2.5 text-sm font-bold uppercase text-center">Submit RFP</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

function CountUp({ value, suffix }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const num = parseInt(value.replace(/[^\d]/g, ''))
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000
    const step = Math.max(1, Math.floor(num / 60))
    const interval = setInterval(() => {
      start += step
      if (start >= num) {
        setDisplay(num)
        clearInterval(interval)
      } else {
        setDisplay(start)
      }
    }, duration / 60)
    return () => clearInterval(interval)
  }, [inView, num])

  return <div ref={ref}>{display}{suffix || value.replace(/[\d]/g, '')}</div>
}

function FadeIn({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay }} className={className}>
      {children}
    </motion.div>
  )
}

function ScaleIn({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5 }} className={className}>
      {children}
    </motion.div>
  )
}

function SectionHeading({ title, subtitle, light }: { title: string; subtitle?: string; light?: boolean }) {
  return (
    <div className="mb-12 lg:mb-16 max-w-3xl">
      <h2 className={`font-heading text-3xl sm:text-4xl lg:text-5xl leading-tight ${light ? 'text-white' : 'text-navy'}`}>{title}</h2>
      {subtitle && <p className={`mt-4 text-base sm:text-lg leading-relaxed ${light ? 'text-steel-light' : 'text-steel'}`}>{subtitle}</p>}
      <div className={`w-16 h-0.5 mt-5 ${light ? 'bg-amber-500' : 'bg-amber-500'}`} />
    </div>
  )
}

/* ── Hero ── */

function Hero() {
  return (
    <section className="relative min-h-screen flex items-end lg:items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1504917595217?w=1600&q=85" alt="Commercial construction tower crane" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/85 to-navy/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
      </div>
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-0">
        <div className="lg:grid lg:grid-cols-5 lg:gap-12 items-end lg:items-center">
          <div className="lg:col-span-3 pb-8 lg:pb-0">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center gap-2 border border-amber-500/40 bg-amber-500/10 backdrop-blur-sm px-3 py-1.5 mb-6">
                <IconCheck className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">{siteInfo.safetyRating}</span>
              </div>
              <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white leading-none mb-5">
                Building<br />
                <span className="text-amber-500">Beyond<br />Schedule</span>
              </h1>
              <p className="text-steel-light text-base sm:text-lg max-w-xl mb-8 leading-relaxed">
                {siteInfo.tagline}
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#capabilities" className="group bg-amber-500 text-navy px-8 py-3.5 font-bold uppercase tracking-wider text-sm hover:bg-amber-400 transition-all inline-flex items-center gap-2 shadow-lg shadow-amber-500/20">
                  Explore Capabilities <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#contact" className="border border-white/20 text-white px-8 py-3.5 font-bold uppercase tracking-wider text-sm hover:bg-white/5 transition-colors">
                  Submit Inquiry
                </a>
              </div>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="lg:col-span-2">
            <div className="grid grid-cols-3 gap-3">
              {stats.map((s) => (
                <div key={s.label} className="border border-white/10 bg-white/5 backdrop-blur-sm p-4 lg:p-5 text-center">
                  <div className="font-mono text-2xl lg:text-3xl font-bold text-amber-500">
                    <CountUp value={s.value} />
                  </div>
                  <div className="text-white/50 text-[10px] lg:text-xs font-medium mt-1.5 uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ── Capabilities ── */

function Capabilities() {
  return (
    <section id="capabilities" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Our Capabilities" subtitle="From groundbreaking to final close-out, SteelSpan delivers commercial construction with precision, transparency, and accountability at every phase." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {capabilities.map((c, i) => {
            const IconComp = capabilityIcons[i]
            return (
              <FadeIn key={c.title} delay={i * 0.08}>
                <div className="group h-full bg-white border-l-4 border-amber-500 p-6 lg:p-8 hover:shadow-2xl hover:shadow-navy/10 transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 bg-navy text-amber-500 flex items-center justify-center mb-5 group-hover:bg-amber-500 group-hover:text-navy transition-all duration-300">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading text-lg text-navy mb-3">{c.title}</h3>
                  <p className="text-steel text-sm leading-relaxed">{c.description}</p>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ── Stats Strip ── */

function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  const items = [
    { val: '350+', label: 'Projects Delivered', desc: 'Commercial, industrial, and institutional' },
    { val: '28', label: 'Years Experience', desc: 'Serving the greater Chicago area since 1997' },
    { val: '99%', label: 'On-Time Delivery', desc: 'Projects finished within contracted schedule' },
  ]

  return (
    <section className="bg-navy relative overflow-hidden border-t border-b border-white/5">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '30px 30px' }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16" ref={ref}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <motion.div key={item.label} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.15 }} className="text-center">
              <div className="font-mono text-4xl lg:text-5xl font-bold text-amber-500">
                <CountUp value={item.val} />
              </div>
              <div className="text-white font-heading text-lg mt-1">{item.label}</div>
              <div className="text-steel-light text-xs mt-1">{item.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Featured Projects ── */

function FeaturedProjects() {
  return (
    <section id="projects" className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Featured Projects" subtitle="From high-rise towers to distribution hubs, every project reflects our commitment to quality, schedule, and partnership." />
        <div className="space-y-8 lg:space-y-12">
          {featuredProjects.map((p, i) => (
            <ScaleIn key={p.title}>
              <div className="bg-white border border-gray-200 overflow-hidden lg:flex">
                <div className={`lg:w-2/5 relative overflow-hidden ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <img src={p.image} alt={p.title} className="w-full h-60 lg:h-full object-cover hover:scale-110 transition-transform duration-700" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 lg:hidden">
                    <div className="flex gap-3">
                      {p.stats.map((s) => (
                        <span key={s.label} className="text-amber-400 text-xs font-bold uppercase bg-black/40 px-2 py-1">{s.label}: {s.value}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="lg:w-3/5 p-6 lg:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-amber-600 text-xs font-mono font-semibold uppercase tracking-widest">{p.category}</span>
                    <span className="hidden lg:flex gap-3">
                      {p.stats.map((s) => (
                        <span key={s.label} className="text-navy bg-gray-100 text-[10px] font-bold uppercase px-2 py-1">{s.label}: {s.value}</span>
                      ))}
                    </span>
                  </div>
                  <h3 className="font-heading text-2xl lg:text-3xl text-navy mb-1">{p.title}</h3>
                  <div className="text-steel text-xs font-medium mb-4">{p.location}</div>
                  <p className="text-steel text-sm leading-relaxed">{p.description}</p>
                </div>
              </div>
            </ScaleIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Pre-Construction ── */

function PreConstruction() {
  return (
    <section id="precon" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Pre-Construction Services" subtitle="We find savings in the design phase -- before a single shovel hits the ground. Our pre-construction team adds value before construction starts." />
        <div className="grid sm:grid-cols-2 gap-6">
          {preConServices.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.1}>
              <div className="flex gap-5 bg-gray-50 border border-gray-200 p-6 lg:p-8 hover:border-amber-500/30 hover:bg-amber-50/30 transition-all duration-300">
                <div className="w-14 h-14 bg-amber-500 text-navy flex items-center justify-center shrink-0 font-heading text-xl font-bold">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div>
                  <h3 className="font-heading text-lg text-navy mb-2">{s.title}</h3>
                  <p className="text-steel text-sm leading-relaxed">{s.description}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Safety ── */

function Safety() {
  return (
    <section id="safety" className="py-20 lg:py-28 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,.03) 40px, rgba(255,255,255,.03) 41px)' }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Safety Above All" subtitle="OSHA VPP Star status is not just a badge -- it is a culture. Every SteelSpan crew goes home safe, every day." light />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {safetyPoints.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.1}>
              <div className="text-center border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 lg:p-8 h-full hover:border-amber-500/30 transition-colors duration-300">
                <div className="w-14 h-14 bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto mb-5">
                  <IconShield className="w-7 h-7" />
                </div>
                <h3 className="font-heading text-white text-lg mb-3">{s.title}</h3>
                <p className="text-steel-light text-sm leading-relaxed">{s.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Process Timeline ── */

function Process() {
  return (
    <section id="process" className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Our Delivery Process" subtitle="A proven six-phase method that keeps every project on track, on budget, and on spec from start to finish." />
        <div className="relative">
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-amber-500/20" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-3">
            {processPhases.map((p, i) => (
              <FadeIn key={p.phase} delay={i * 0.08}>
                <div className="text-center bg-white border border-gray-200 p-5 lg:p-6 h-full hover:border-amber-500 hover:shadow-lg transition-all duration-300 relative">
                  <div className="w-10 h-10 bg-navy text-amber-500 flex items-center justify-center mx-auto mb-4 lg:mb-6 font-mono text-sm font-bold">
                    {p.phase}
                  </div>
                  <h3 className="font-heading text-navy text-sm lg:text-base mb-2">{p.title}</h3>
                  <p className="text-steel text-xs leading-relaxed">{p.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Contact / RFP ── */

function Contact() {
  return (
    <section id="contact" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-5 lg:gap-12 items-start">
          <div className="lg:col-span-2 mb-10 lg:mb-0">
            <h2 className="font-heading text-3xl sm:text-4xl text-navy leading-tight mb-4">
              Start Your<br />
              <span className="text-amber-500">Next Project</span>
            </h2>
            <p className="text-steel text-sm leading-relaxed mb-8">
              Tell us about your commercial construction needs. Our pre-construction team will respond within one business day with a preliminary budget and schedule assessment.
            </p>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-navy text-amber-500 flex items-center justify-center shrink-0">
                  <IconBuilding className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-navy text-sm font-bold uppercase tracking-wider">Call Us</div>
                  <a href={`tel:${siteInfo.phone}`} className="text-navy font-mono text-lg font-bold hover:text-amber-600 transition-colors">{siteInfo.phone}</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-navy text-amber-500 flex items-center justify-center shrink-0">
                  <IconClipboard className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-navy text-sm font-bold uppercase tracking-wider">Email</div>
                  <a href={`mailto:${siteInfo.email}`} className="text-navy font-medium hover:text-amber-600 transition-colors">{siteInfo.email}</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-navy text-amber-500 flex items-center justify-center shrink-0">
                  <IconTarget className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-navy text-sm font-bold uppercase tracking-wider">Office</div>
                  <p className="text-steel text-sm">{siteInfo.address}</p>
                </div>
              </div>
              <div className="pt-2">
                <div className="inline-block border border-amber-500/30 bg-amber-50 px-4 py-2">
                  <span className="text-amber-700 text-xs font-mono font-bold">{siteInfo.license} &middot; {siteInfo.safetyRating}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="bg-navy p-6 lg:p-10">
              <h3 className="font-heading text-white text-xl mb-2">Commercial Inquiry</h3>
              <p className="text-steel-light text-sm mb-6">Fill out the form below and our team will reach out within 24 hours.</p>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/60 text-xs font-bold uppercase tracking-wider mb-1.5">Full Name</label>
                    <input type="text" placeholder="Your name" className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm placeholder:text-white/20 focus:outline-none focus:border-amber-500 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-white/60 text-xs font-bold uppercase tracking-wider mb-1.5">Company</label>
                    <input type="text" placeholder="Company name" className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm placeholder:text-white/20 focus:outline-none focus:border-amber-500 transition-colors" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/60 text-xs font-bold uppercase tracking-wider mb-1.5">Email</label>
                    <input type="email" placeholder="you@company.com" className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm placeholder:text-white/20 focus:outline-none focus:border-amber-500 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-white/60 text-xs font-bold uppercase tracking-wider mb-1.5">Phone</label>
                    <input type="tel" placeholder="(312) 555-0000" className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm placeholder:text-white/20 focus:outline-none focus:border-amber-500 transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-white/60 text-xs font-bold uppercase tracking-wider mb-1.5">Project Type</label>
                  <select className="w-full bg-white/5 border border-white/10 text-white/70 px-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition-colors">
                    <option>Select project type</option>
                    <option>General Contracting</option>
                    <option>Design-Build</option>
                    <option>Pre-Construction</option>
                    <option>Tenant Improvement</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/60 text-xs font-bold uppercase tracking-wider mb-1.5">Project Description</label>
                  <textarea rows={4} placeholder="Tell us about your project, timeline, and budget range..." className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm placeholder:text-white/20 focus:outline-none focus:border-amber-500 transition-colors resize-none" />
                </div>
                <button type="submit" className="w-full bg-amber-500 text-navy px-6 py-3.5 font-bold uppercase tracking-wider text-sm hover:bg-amber-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20">
                  Submit Inquiry <IconArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Footer ── */

function Footer() {
  return (
    <footer className="bg-navy border-t border-white/5 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="font-heading text-lg text-white">
            STEEL<span className="text-amber-500">SPAN</span>
            <span className="block text-steel-light text-xs font-body font-normal">Commercial Builders</span>
          </div>
          <div className="text-steel-light text-sm text-center lg:text-right">
            <p>&copy; {new Date().getFullYear()} SteelSpan Commercial Builders. All rights reserved.</p>
            <p className="text-steel-light/60 text-xs mt-1">{siteInfo.license} &middot; {siteInfo.safetyRating} &middot; Licensed &amp; Insured</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ── App ── */

export default function App() {
  return (
    <div className="font-body bg-white text-navy antialiased">
      <Navbar />
      <Hero />
      <Capabilities />
      <StatsStrip />
      <FeaturedProjects />
      <PreConstruction />
      <Safety />
      <Process />
      <Contact />
      <Footer />
    </div>
  )
}
