import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { siteInfo, services, stormSteps, repairSigns, beforeAfterRepairs, trustPoints, navLinks } from './data'

/* ── Inline SVG Icons (viewBox="0 0 24 24") ── */

function IconPhone({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function IconAlert({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )
}

function IconHome({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

function IconDrop({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  )
}

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
    </svg>
  )
}

function IconSearch({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
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

function IconShield({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
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

function IconStar({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
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

const serviceIcons = [IconHome, IconBuilding, IconDrop, IconClipboard, IconAlert, IconSearch]

const severityColors: Record<string, string> = { critical: 'bg-red-100 text-red-700 border-red-200', high: 'bg-orange-100 text-orange-700 border-orange-200', medium: 'bg-yellow-100 text-yellow-700 border-yellow-200' }
const severityLabels: Record<string, string> = { critical: 'Critical', high: 'High', medium: 'Moderate' }

/* ── Reusable ── */

function FadeIn({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay }} className={className}>
      {children}
    </motion.div>
  )
}

function SectionHeading({ title, subtitle, light }: { title: string; subtitle?: string; light?: boolean }) {
  return (
    <div className="text-center mb-12 lg:mb-14">
      <h2 className={`font-heading text-3xl sm:text-4xl lg:text-5xl leading-tight ${light ? 'text-white' : 'text-navy'}`}>{title}</h2>
      {subtitle && <p className={`mt-3 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed ${light ? 'text-white/60' : 'text-navy/60'}`}>{subtitle}</p>}
    </div>
  )
}

/* ── Navbar ── */

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-navy shadow-xl shadow-black/20' : 'bg-navy/80 backdrop-blur-md'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#" className="font-heading text-xl text-white tracking-tight">
            RAPID<span className="text-red-400">ROOF</span>
            <span className="block text-[10px] text-white/40 font-body font-normal tracking-widest uppercase -mt-1">Roofing and Exteriors</span>
          </a>
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-sm font-medium text-white/60 hover:text-white transition-colors">
                {l.label}
              </a>
            ))}
            <a href="tel:3125550999" className="bg-red-500 text-white px-5 py-2.5 text-sm font-bold uppercase tracking-wider hover:bg-red-600 transition-colors inline-flex items-center gap-2 shadow-lg shadow-red-500/30">
              <IconPhone className="w-4 h-4" /> {siteInfo.emergencyPhone}
            </a>
          </div>
          <button className="lg:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <IconX className="text-white" /> : <IconMenu className="text-white" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-navy-dark border-t border-white/10">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="block text-white/70 font-medium">{l.label}</a>
              ))}
              <a href="tel:3125550999" onClick={() => setMenuOpen(false)} className="block bg-red-500 text-white px-5 py-2.5 text-sm font-bold text-center">Emergency: {siteInfo.emergencyPhone}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

/* ── Hero ── */

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1595508064774?w=1600&q=85" alt="Residential roof with blue sky" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/95 via-navy/85 to-navy/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/60 to-transparent" />
      </div>
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-0">
        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-3 mb-6">
              <motion.span
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5"
              >
                Available Now
              </motion.span>
              <span className="text-white/40 text-xs font-medium">24/7 Emergency Service</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-none mb-5">
              Roof problems<br />
              <span className="text-red-400">handled before</span><br />
              they become expensive
            </h1>
            <p className="text-white/60 text-base sm:text-lg max-w-xl mb-8 leading-relaxed">
              {siteInfo.tagline}. Emergency calls answered 24/7 by a real person. On-site within 4 hours for urgent repairs.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <a href="tel:3125550999" className="bg-red-500 text-white px-8 py-4 font-bold uppercase tracking-wider text-base hover:bg-red-600 transition-all inline-flex items-center gap-3 shadow-xl shadow-red-500/30 hover:shadow-red-500/40">
                <IconPhone className="w-5 h-5" /> {siteInfo.emergencyPhone}
              </a>
              <a href="#services" className="border-2 border-white/20 text-white px-8 py-4 font-bold uppercase tracking-wider text-sm hover:bg-white/5 transition-colors">
                Our Services
              </a>
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex flex-wrap gap-x-6 gap-y-2">
              <span className="text-white/40 text-sm flex items-center gap-1.5"><IconCheck className="w-3.5 h-3.5 text-green-400" /> Licensed</span>
              <span className="text-white/40 text-sm flex items-center gap-1.5"><IconCheck className="w-3.5 h-3.5 text-green-400" /> Insured</span>
              <span className="text-white/40 text-sm flex items-center gap-1.5"><IconCheck className="w-3.5 h-3.5 text-green-400" /> Warranty</span>
              <span className="text-white/40 text-sm flex items-center gap-1.5"><IconCheck className="w-3.5 h-3.5 text-green-400" /> Free Estimates</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ── Services ── */

function Services() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Our Roofing Services" subtitle="From emergency repairs to full replacements, we handle every aspect of your roof and exterior." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {services.map((s, i) => {
            const IconComp = serviceIcons[i]
            return (
              <FadeIn key={s.title} delay={i * 0.08}>
                <div className={`h-full rounded-sm overflow-hidden border ${s.urgent ? 'border-red-200' : 'border-gray-200'} bg-white shadow-sm hover:shadow-lg transition-all duration-300`}>
                  <div className={`px-6 py-4 flex items-center gap-3 ${s.urgent ? 'bg-red-50' : 'bg-navy'}`}>
                    <div className={`w-10 h-10 flex items-center justify-center shrink-0 rounded-sm ${s.urgent ? 'bg-red-500 text-white' : 'bg-white/10 text-white'}`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className={`font-heading text-base ${s.urgent ? 'text-red-700' : 'text-white'}`}>{s.title}</h3>
                      {s.urgent && (
                        <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="text-red-500 text-[10px] font-bold uppercase">
                          24/7 Emergency
                        </motion.span>
                      )}
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-navy/60 text-sm leading-relaxed mb-4">{s.description}</p>
                    <ul className="space-y-1.5">
                      {s.checks.map((c) => (
                        <li key={c} className="flex items-start gap-2 text-navy/70 text-xs">
                          <IconCheck className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ── Storm Damage ── */

function StormDamage() {
  return (
    <section id="storm" className="py-20 lg:py-28 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(135deg, transparent 48%, rgba(255,255,255,.03) 50%, transparent 52%)', backgroundSize: '50px 50px' }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="inline-flex items-center gap-2 bg-red-500/10 border border-red-400/30 px-4 py-1.5 mb-5">
            <IconAlert className="w-4 h-4 text-red-400" />
            <span className="text-red-400 text-xs font-bold uppercase tracking-widest">Storm Damage Response Team</span>
          </motion.div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-4">
            Storm Struck? We Will Be There Today
          </h2>
          <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto mb-8">
            Hail, wind, and heavy rain can damage your roof in minutes. We dispatch teams immediately after severe weather events. Our inspectors document everything for your insurance claim.
          </p>
          <a href="tel:3125550999" className="inline-flex items-center gap-3 bg-red-500 text-white px-8 py-4 font-bold uppercase tracking-wider text-sm hover:bg-red-600 transition-all shadow-xl shadow-red-500/30">
            <IconPhone className="w-5 h-5" /> Call Storm Response: {siteInfo.emergencyPhone}
          </a>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {stormSteps.map((s, i) => (
            <FadeIn key={s.step} delay={i * 0.1}>
              <div className="text-center border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 h-full">
                <div className="w-12 h-12 bg-red-500 text-white flex items-center justify-center mx-auto mb-4 font-heading text-lg">{s.step}</div>
                <h3 className="font-heading text-white text-base mb-2">{s.title}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{s.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Signs You Need Repair ── */

function SignsNeedRepair() {
  return (
    <section id="signs" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Signs You Need Roof Repair" subtitle="Do not wait until water stains appear. Here is what to look for and when to call." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {repairSigns.map((s) => (
            <FadeIn key={s.title}>
              <div className="bg-gray-50 border-l-4 border-red-500 p-5 h-full hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-heading text-navy text-sm sm:text-base">{s.title}</h3>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 border shrink-0 ${severityColors[s.severity]}`}>{severityLabels[s.severity]}</span>
                </div>
                <p className="text-navy/60 text-sm leading-relaxed">{s.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <div className="text-center mt-10">
          <a href="tel:3125550999" className="inline-flex items-center gap-2 bg-navy text-white px-6 py-3 font-bold uppercase tracking-wider text-sm hover:bg-navy-light transition-all shadow-lg">
            <IconPhone className="w-4 h-4" /> Not Sure? Call for a Free Inspection
          </a>
        </div>
      </div>
    </section>
  )
}

/* ── Before & After ── */

function Portfolio() {
  return (
    <section id="portfolio" className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Before and After" subtitle="Real work, real results. Every project tells a story of careful craftsmanship and attention to detail." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {beforeAfterRepairs.map((r) => (
            <FadeIn key={r.title}>
              <div className="bg-white border border-gray-200 overflow-hidden rounded-sm h-full shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="grid grid-cols-2 h-44">
                  <div className="relative overflow-hidden">
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold uppercase px-2 py-1 z-10">Before</div>
                    <img src={r.before} alt="Before" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="relative overflow-hidden">
                    <div className="absolute top-2 right-2 bg-green-600 text-white text-[10px] font-bold uppercase px-2 py-1 z-10">After</div>
                    <img src={r.after} alt="After" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-navy text-base mb-2">{r.title}</h3>
                  <p className="text-navy/60 text-xs leading-relaxed">{r.description}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Trust / Reviews ── */

function Trust() {
  return (
    <section id="trust" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Why Choose RapidRoof" subtitle="We have earned our reputation one roof at a time. Here is what sets us apart from the competition." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {trustPoints.map((t) => (
            <FadeIn key={t.title}>
              <div className="text-center border border-gray-200 p-6 lg:p-8 h-full hover:border-navy hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 bg-navy text-white flex items-center justify-center mx-auto mb-5">
                  <IconShield className="w-7 h-7" />
                </div>
                <h3 className="font-heading text-navy text-lg mb-3">{t.title}</h3>
                <p className="text-navy/60 text-sm leading-relaxed">{t.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 px-6 py-3">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <IconStar key={i} className="w-5 h-5 text-amber-400" />
              ))}
            </div>
            <span className="text-navy text-sm font-bold ml-2">{siteInfo.rating} out of 5</span>
            <span className="text-navy/40 text-xs ml-1">({siteInfo.reviews}+ reviews)</span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Contact / Free Estimate ── */

function Contact() {
  return (
    <section id="contact" className="py-20 lg:py-28 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '25px 25px' }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionHeading title="Get Your Free Estimate" subtitle="Same-day inspections available. Call us or fill out the form and we will get back to you within 2 hours." light />
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-start">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 lg:p-8 mb-6 lg:mb-0">
              <h3 className="font-heading text-white text-lg mb-1">Call Us Directly</h3>
              <p className="text-white/40 text-sm mb-5">A real person answers every call. No voicemail, no call center.</p>
              <div className="space-y-4 mb-6">
                <div>
                  <div className="text-red-400 text-xs font-bold uppercase tracking-widest mb-1">Emergency</div>
                  <a href={`tel:${siteInfo.emergencyPhone}`} className="text-white text-2xl font-heading hover:text-red-400 transition-colors">{siteInfo.emergencyPhone}</a>
                  <p className="text-white/30 text-xs">Available 24 hours a day, 7 days a week</p>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <div className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">General Inquiries</div>
                  <a href={`tel:${siteInfo.phone}`} className="text-white text-lg font-heading hover:text-red-400 transition-colors">{siteInfo.phone}</a>
                </div>
              </div>
              <div className="border-t border-white/10 pt-4 space-y-2">
                <div className="flex items-center gap-2 text-white/40 text-xs">
                  <IconClipboard className="w-3.5 h-3.5 shrink-0" />
                  <span>{siteInfo.email}</span>
                </div>
                <div className="flex items-center gap-2 text-white/40 text-xs">
                  <IconBuilding className="w-3.5 h-3.5 shrink-0" />
                  <span>{siteInfo.address}</span>
                </div>
                <div className="flex items-center gap-2 text-white/40 text-xs">
                  <IconShield className="w-3.5 h-3.5 shrink-0" />
                  <span className="font-mono">{siteInfo.license}</span>
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 lg:p-8">
              <h3 className="font-heading text-white text-lg mb-1">Book an Inspection</h3>
              <p className="text-white/40 text-sm mb-5">Fill out the form and we will call you back within 2 hours.</p>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/50 text-xs font-bold uppercase tracking-wider mb-1">Name</label>
                    <input type="text" placeholder="Your name" className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm placeholder:text-white/20 focus:outline-none focus:border-red-400 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-white/50 text-xs font-bold uppercase tracking-wider mb-1">Phone</label>
                    <input type="tel" placeholder="(312) 555-0000" className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm placeholder:text-white/20 focus:outline-none focus:border-red-400 transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-white/50 text-xs font-bold uppercase tracking-wider mb-1">Email</label>
                  <input type="email" placeholder="you@email.com" className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm placeholder:text-white/20 focus:outline-none focus:border-red-400 transition-colors" />
                </div>
                <div>
                  <label className="block text-white/50 text-xs font-bold uppercase tracking-wider mb-1">Service Needed</label>
                  <select className="w-full bg-white/5 border border-white/10 text-white/70 px-4 py-3 text-sm focus:outline-none focus:border-red-400 transition-colors">
                    <option>Select a service</option>
                    <option>Emergency Roof Repair</option>
                    <option>Roof Replacement</option>
                    <option>Gutters and Downspouts</option>
                    <option>Siding Installation</option>
                    <option>Storm Damage</option>
                    <option>Leak Detection</option>
                    <option>Inspection Only</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/50 text-xs font-bold uppercase tracking-wider mb-1">Message</label>
                  <textarea rows={3} placeholder="Describe your issue or question..." className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm placeholder:text-white/20 focus:outline-none focus:border-red-400 transition-colors resize-none" />
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="urgent" className="accent-red-500" />
                  <label htmlFor="urgent" className="text-red-400 text-xs font-bold uppercase tracking-wider">This is an emergency</label>
                </div>
                <button type="submit" className="w-full bg-red-500 text-white px-6 py-3.5 font-bold uppercase tracking-wider text-sm hover:bg-red-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-500/30">
                  Submit Request <IconArrowRight className="w-4 h-4" />
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
    <footer className="bg-navy-dark border-t border-white/5 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="font-heading text-lg text-white">
            RAPID<span className="text-red-400">ROOF</span>
            <span className="block text-white/30 text-xs font-body font-normal">Roofing and Exteriors</span>
          </div>
          <div className="text-white/30 text-sm text-center lg:text-right">
            <p>&copy; {new Date().getFullYear()} RapidRoof and Exteriors. All rights reserved.</p>
            <p className="text-white/20 text-xs mt-1">{siteInfo.license} &middot; Licensed, Insured, Warranty Backed</p>
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
      <Services />
      <StormDamage />
      <Portfolio />
      <SignsNeedRepair />
      <Trust />
      <Contact />
      <Footer />
    </div>
  )
}
