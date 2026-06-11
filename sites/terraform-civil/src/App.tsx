import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  siteInfo, stats, capabilities, processPhases, equipment,
  projectTypes, safetyPoints, galleryImages, navLinks,
} from './data'
import type { EquipmentItem } from './data'

/* ── Topographic Decoration ── */

function TopographicLines({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M0 200 Q100 150 200 200 T400 200" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <path d="M0 180 Q100 130 200 180 T400 180" stroke="currentColor" strokeWidth="0.4" opacity="0.25" />
      <path d="M0 220 Q100 170 200 220 T400 220" stroke="currentColor" strokeWidth="0.4" opacity="0.25" />
      <path d="M0 160 Q120 100 200 160 T400 160" stroke="currentColor" strokeWidth="0.3" opacity="0.2" />
      <path d="M0 240 Q120 190 200 240 T400 240" stroke="currentColor" strokeWidth="0.3" opacity="0.2" />
      <path d="M0 140 Q140 70 200 140 T400 140" stroke="currentColor" strokeWidth="0.25" opacity="0.15" />
      <path d="M0 260 Q140 210 200 260 T400 260" stroke="currentColor" strokeWidth="0.25" opacity="0.15" />
      <path d="M0 100 Q160 40 200 100 T400 100" stroke="currentColor" strokeWidth="0.2" opacity="0.1" />
      <path d="M0 300 Q160 250 200 300 T400 300" stroke="currentColor" strokeWidth="0.2" opacity="0.1" />
      <path d="M200 0 Q150 100 200 200 T200 400" stroke="currentColor" strokeWidth="0.3" opacity="0.15" />
      <path d="M220 0 Q170 100 220 200 T220 400" stroke="currentColor" strokeWidth="0.25" opacity="0.12" />
      <path d="M180 0 Q130 100 180 200 T180 400" stroke="currentColor" strokeWidth="0.25" opacity="0.12" />
    </svg>
  )
}

/* ── SVG Icons ── */

function IconExcavator({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 9v4a2 2 0 0 1-2 2H8" />
      <path d="M3 13h4l3 4h4a2 2 0 0 0 2-2V9" />
      <circle cx="6" cy="17" r="2" />
      <circle cx="18" cy="17" r="2" />
      <line x1="14" y1="5" x2="20" y2="5" />
      <path d="M12 3L8 9h8z" />
      <line x1="4" y1="11" x2="8" y2="11" />
    </svg>
  )
}

function IconGrading({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="8" width="20" height="8" rx="1" />
      <path d="M2 16v3" />
      <path d="M22 16v3" />
      <path d="M6 11h12" />
      <path d="M4 13h10" />
      <path d="M18 6l-3-3-3 3" />
      <path d="M15 3v5" />
    </svg>
  )
}

function IconDrainage({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a8 8 0 0 0-8 8c0 4.5 8 12 8 12s8-7.5 8-12a8 8 0 0 0-8-8z" />
      <path d="M12 6v4" />
      <path d="M12 14h.01" />
    </svg>
  )
}

function IconUtilities({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20h16" />
      <path d="M6 20V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12" />
      <path d="M8 5V3" />
      <path d="M16 5V3" />
      <line x1="9" y1="12" x2="15" y2="12" />
      <line x1="9" y1="16" x2="15" y2="16" />
    </svg>
  )
}

function IconPaving({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="14" width="20" height="4" rx="1" />
      <path d="M6 10h12" />
      <path d="M8 6h8" />
      <circle cx="6" cy="18" r="1.5" />
      <circle cx="18" cy="18" r="1.5" />
      <path d="M2 5v3h20V5" />
    </svg>
  )
}

function IconRetaining({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="1" />
      <line x1="4" y1="10" x2="20" y2="10" />
      <line x1="4" y1="16" x2="20" y2="16" />
      <line x1="10" y1="4" x2="10" y2="20" />
      <line x1="14" y1="4" x2="14" y2="20" />
      <path d="M4 4L2 2" />
      <path d="M20 4l2-2" />
      <path d="M4 20l-2 2" />
      <path d="M20 20l2 2" />
    </svg>
  )
}

function IconSurvey({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3l18 18" />
      <path d="M21 3l-7 7" />
      <path d="M3 21l7-7" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  )
}

function IconClearing({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3L3 8l9 5 9-5z" />
      <path d="M3 14l9 5 9-5" />
      <path d="M3 19l9 5 9-5" />
      <path d="M3 8v11" />
      <path d="M21 8v11" />
    </svg>
  )
}

function IconCompaction({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
      <path d="M7 12h10" />
    </svg>
  )
}

function IconHandoff({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 17l4 4L20 7" />
      <path d="M4 12l4 4L20 3" />
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

function IconChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

function IconMenu({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
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

function IconPhone({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7l-10 6L2 7" />
    </svg>
  )
}

function IconMapPin({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function IconCheck({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

const capabilityIcons = [IconExcavator, IconGrading, IconDrainage, IconUtilities, IconPaving, IconRetaining]
const processIcons = [IconSurvey, IconClearing, IconGrading, IconUtilities, IconCompaction, IconHandoff]

/* ── Reusable Components ── */

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#1A1A1A]/95 backdrop-blur-md border-b border-[#5C4033]/30' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#" className="font-display text-2xl text-white tracking-wider">
            TERRA<span className="text-[#FF6B35]">FORM</span>
            <span className="block text-[10px] font-mono text-[#8A6F3E] tracking-[0.3em] uppercase -mt-1">Civil Works</span>
          </a>
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-sm font-medium text-[#B8A378] hover:text-white transition-colors tracking-wide uppercase">
                {l.label}
              </a>
            ))}
            <a href="#contact" className="bg-[#FF6B35] text-white px-5 py-2.5 text-sm font-bold uppercase tracking-wider hover:bg-[#E55A2B] transition-colors">
              Get a Quote
            </a>
          </div>
          <button className="lg:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? <IconX className="w-6 h-6 text-white" /> : <IconMenu className="w-6 h-6 text-white" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#1A1A1A] border-t border-[#5C4033]/30"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="block text-[#B8A378] font-medium">{l.label}</a>
              ))}
              <a href="#contact" onClick={() => setMenuOpen(false)} className="block bg-[#FF6B35] text-white px-5 py-2.5 text-sm font-bold uppercase text-center">Get a Quote</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

function FadeInSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className={className}>
      {children}
    </motion.div>
  )
}

function SectionHeading({ title, subtitle, survey }: { title: string; subtitle?: string; survey?: boolean }) {
  return (
    <div className="text-center mb-14 lg:mb-16">
      <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white tracking-wide">{title}</h2>
      {subtitle && <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-[#B8A378]">{subtitle}</p>}
      <div className={`w-20 h-0.5 mx-auto mt-6 ${survey ? 'bg-[#FF6B35]' : 'bg-[#FF6B35]'}`} />
    </div>
  )
}

function SpecBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-1 px-2.5 py-1 bg-[#1A1A1A] border border-[#5C4033]/40 rounded-none">
      <span className="text-[#8A6F3E] text-[10px] font-mono uppercase tracking-widest">{label}</span>
      <span className="text-[#FF6B35] text-xs font-mono font-bold">{value}</span>
    </div>
  )
}

/* ── Sections ── */

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1600&q=85"
          alt="Heavy equipment on construction site"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/95 via-[#1A1A1A]/80 to-[#1A1A1A]/50" />
        {/* Topographic overlay */}
        <div className="absolute inset-0 text-[#FF6B35] opacity-[0.06]">
          <TopographicLines className="w-full h-full" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 bg-[#1A1A1A]/80 border border-[#5C4033]/50 px-4 py-2 mb-6">
            <span className="text-[#FF6B35] text-sm font-mono font-semibold tracking-wider uppercase">Heavy Civil Contractor</span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-white leading-none mb-6 tracking-wide">
            Preparing Land<br />
            <span className="text-[#FF6B35]">For What Comes Next</span>
          </h1>
          <p className="text-[#B8A378] text-lg max-w-xl mb-10 leading-relaxed">
            22 years of heavy civil sitework in the Midwest. We move earth, install infrastructure, and deliver ready-to-build sites on schedule and on budget.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#capabilities" className="bg-[#FF6B35] text-white px-8 py-3.5 font-bold uppercase tracking-wider text-sm hover:bg-[#E55A2B] transition-colors inline-flex items-center gap-2">
              View Capabilities <IconChevronRight className="w-4 h-4" />
            </a>
            <a href="#projects" className="border border-[#8A6F3E] text-[#B8A378] px-8 py-3.5 font-bold uppercase tracking-wider text-sm hover:bg-[#5C4033]/30 transition-colors">
              Our Projects
            </a>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-wrap gap-5 mt-16"
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-[#1A1A1A]/60 backdrop-blur-sm border border-[#5C4033]/50 px-6 py-4 text-center min-w-[130px]">
              <div className="font-mono text-3xl font-bold text-[#FF6B35]">{s.value}</div>
              <div className="text-[#8A6F3E] text-xs font-medium mt-1 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function CapabilitiesSection() {
  return (
    <section id="capabilities" className="py-20 lg:py-28 bg-[#1A1A1A] relative overflow-hidden">
      <div className="absolute inset-0 text-[#FF6B35] opacity-[0.03]">
        <TopographicLines className="w-full h-full" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Core Capabilities"
          subtitle="Six specialized disciplines covering every phase of site development from raw land to ready-to-build."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {capabilities.map((c, i) => {
            const IconComp = capabilityIcons[i % capabilityIcons.length]
            return (
              <FadeInSection key={c.title}>
                <div className="group h-full bg-[#1A1A1A] border border-[#5C4033]/40 p-8 hover:border-[#FF6B35] hover:bg-[#1A1A1A]/80 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 bg-[#FF6B35]/10 text-[#FF6B35] flex items-center justify-center group-hover:bg-[#FF6B35] group-hover:text-white transition-colors duration-300">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <div className="font-mono text-[#5C4033] text-sm font-bold">{String(i + 1).padStart(2, '0')}</div>
                  </div>
                  <h3 className="font-display text-xl text-white mb-3 tracking-wide">{c.title}</h3>
                  <p className="text-[#B8A378] text-sm leading-relaxed">{c.description}</p>
                </div>
              </FadeInSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ProcessSection() {
  return (
    <section id="process" className="py-20 lg:py-28 bg-[#0D0D0D] relative overflow-hidden">
      <div className="absolute inset-0 text-[#FF6B35] opacity-[0.02]">
        <TopographicLines className="w-full h-full" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Sitework Process"
          subtitle="A proven six-phase delivery method from survey to site handoff."
        />
        {/* Horizontal scroll container */}
        <div className="overflow-x-auto pb-4 -mx-4 px-4 scroll-container">
          <div className="flex gap-4 min-w-max pb-2">
            {/* Timeline rail */}
            <div className="hidden lg:block absolute top-[72px] left-[8%] right-[8%] h-0.5 bg-[#5C4033]/40" />
            {processPhases.map((p, i) => {
              const IconComp = processIcons[i % processIcons.length]
              return (
                <FadeInSection key={p.phase}>
                  <div className="relative w-[200px] text-center p-6 bg-[#1A1A1A] border border-[#5C4033]/40 h-full hover:border-[#FF6B35]/50 transition-colors duration-300 flex-shrink-0">
                    <div className="relative z-10 w-12 h-12 bg-[#FF6B35] text-white flex items-center justify-center mx-auto mb-4 font-mono text-sm font-bold">
                      {p.phase}
                    </div>
                    <div className="w-10 h-10 mx-auto mb-3 text-[#B8A378]">
                      <IconComp className="w-full h-full" />
                    </div>
                    <h3 className="font-display text-lg text-white mb-2 tracking-wide">{p.title}</h3>
                    <p className="text-[#B8A378] text-xs leading-relaxed mb-3">{p.description}</p>
                    <p className="text-[#8A6F3E] text-[10px] leading-relaxed font-mono">{p.details}</p>
                  </div>
                </FadeInSection>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function EquipmentSection() {
  return (
    <section id="equipment" className="py-20 lg:py-28 bg-[#1A1A1A] relative overflow-hidden">
      <div className="absolute inset-0 text-[#FF6B35] opacity-[0.03]">
        <TopographicLines className="w-full h-full" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Equipment Fleet"
          subtitle="Modern, well-maintained heavy machinery operated by certified crew members."
        />
        <div className="grid sm:grid-cols-2 gap-5">
          {equipment.map((eq: EquipmentItem, i: number) => (
            <FadeInSection key={eq.name}>
              <div className="h-full bg-[#0D0D0D] border border-[#5C4033]/40 overflow-hidden group hover:border-[#FF6B35] transition-colors duration-300">
                {/* Equipment image area */}
                <div className="h-48 bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] relative overflow-hidden">
                  <img
                    src={
                      i === 0
                        ? 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80'
                        : i === 1
                        ? 'https://images.unsplash.com/photo-1541888946425-d81bb2c88ea5?w=800&q=80'
                        : i === 2
                        ? 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80'
                        : 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80'
                    }
                    alt={eq.name}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent" />
                  {/* Model badge */}
                  <div className="absolute top-3 left-3 bg-[#FF6B35] text-white px-3 py-1 text-xs font-mono font-bold">
                    {eq.model}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl text-white mb-2 tracking-wide">{eq.name}</h3>
                  <p className="text-[#B8A378] text-sm leading-relaxed mb-5">{eq.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {eq.specs.map((spec) => (
                      <SpecBadge key={spec.label} label={spec.label} value={spec.value} />
                    ))}
                  </div>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectsGallery() {
  return (
    <section id="projects" className="py-20 lg:py-28 bg-[#0D0D0D] relative overflow-hidden">
      <div className="absolute inset-0 text-[#FF6B35] opacity-[0.02]">
        <TopographicLines className="w-full h-full" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Project Gallery"
          subtitle="From raw land to finished sites. Our work in residential, commercial, road, and industrial development."
        />
        <div className="overflow-x-auto pb-4 -mx-4 px-4 scroll-container">
          <div className="flex gap-6 min-w-max pb-2">
            {projectTypes.map((p) => (
              <FadeInSection key={p.title}>
                <div className="w-[350px] sm:w-[400px] bg-[#1A1A1A] border border-[#5C4033]/40 overflow-hidden group hover:border-[#FF6B35]/70 transition-colors duration-300">
                  <div className="h-52 overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl text-white mb-3 tracking-wide">{p.title}</h3>
                    <p className="text-[#B8A378] text-sm leading-relaxed">{p.description}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function SafetySection() {
  return (
    <section id="safety" className="py-20 lg:py-28 bg-[#1A1A1A] relative overflow-hidden">
      <div className="absolute inset-0 text-[#FF6B35] opacity-[0.03]">
        <TopographicLines className="w-full h-full" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Safety & Compliance"
          subtitle="Every project operates under a site-specific safety and compliance plan. Non-negotiable."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {safetyPoints.map((s) => (
            <FadeInSection key={s.title}>
              <div className="text-center p-6 bg-[#0D0D0D] border border-[#5C4033]/40 h-full">
                <div className="w-14 h-14 bg-[#FF6B35]/10 text-[#FF6B35] flex items-center justify-center mx-auto mb-5">
                  <IconShield className="w-7 h-7" />
                </div>
                <h3 className="font-display text-lg text-white mb-3 tracking-wide">{s.title}</h3>
                <p className="text-[#B8A378] text-sm leading-relaxed">{s.description}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  )
}

function JobsitesGallery() {
  return (
    <section className="py-20 lg:py-28 bg-[#0D0D0D] relative overflow-hidden">
      <div className="absolute inset-0 text-[#FF6B35] opacity-[0.02]">
        <TopographicLines className="w-full h-full" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Jobsite Gallery"
          subtitle="Active project photographs documenting sitework from clearing through final grading."
        />
        <div className="overflow-x-auto pb-4 -mx-4 px-4 scroll-container">
          <div className="flex gap-4 min-w-max pb-2">
            {galleryImages.map((img, i) => (
              <FadeInSection key={i}>
                <div className="w-[300px] sm:w-[350px] h-56 overflow-hidden border border-[#5C4033]/40 group hover:border-[#FF6B35]/70 transition-colors duration-300">
                  <img
                    src={img}
                    alt={`Jobsite photo ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  const [formState, setFormState] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    siteType: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production this would POST to an API
    setSubmitted(true)
  }

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#1A1A1A] relative overflow-hidden">
      <div className="absolute inset-0 text-[#FF6B35] opacity-[0.03]">
        <TopographicLines className="w-full h-full" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Site Evaluation"
          subtitle="Tell us about your sitework needs. We'll respond with a preliminary assessment within 48 hours."
        />

        <div className="grid lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-6">
            <FadeInSection>
              <div className="bg-[#0D0D0D] border border-[#5C4033]/40 p-6 space-y-5">
                <div className="flex items-start gap-3">
                  <IconPhone className="w-5 h-5 text-[#FF6B35] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[#B8A378] text-xs font-mono uppercase tracking-wider mb-0.5">Call</div>
                    <a href={`tel:${siteInfo.phone}`} className="text-white font-mono font-bold text-lg hover:text-[#FF6B35] transition-colors">{siteInfo.phone}</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <IconMail className="w-5 h-5 text-[#FF6B35] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[#B8A378] text-xs font-mono uppercase tracking-wider mb-0.5">Email</div>
                    <a href={`mailto:${siteInfo.email}`} className="text-white font-mono text-sm hover:text-[#FF6B35] transition-colors">{siteInfo.email}</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <IconMapPin className="w-5 h-5 text-[#FF6B35] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[#B8A378] text-xs font-mono uppercase tracking-wider mb-0.5">Office</div>
                    <p className="text-white text-sm">{siteInfo.address}</p>
                    <p className="text-[#8A6F3E] text-xs font-mono mt-1">{siteInfo.license}</p>
                  </div>
                </div>
              </div>
            </FadeInSection>

            <FadeInSection>
              <div className="bg-[#0D0D0D] border border-[#5C4033]/40 p-6">
                <div className="text-[#B8A378] text-xs font-mono uppercase tracking-wider mb-2">Quick Response</div>
                <p className="text-white text-sm leading-relaxed">
                  Most site evaluations return a preliminary budget within 48 hours. Complex sites with geotechnical requirements may take 3-5 business days.
                </p>
              </div>
            </FadeInSection>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <FadeInSection>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#0D0D0D] border border-[#FF6B35]/40 p-8 text-center"
                >
                  <div className="w-16 h-16 bg-[#FF6B35]/10 text-[#FF6B35] flex items-center justify-center mx-auto mb-6">
                    <IconCheck className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-2xl text-white mb-3 tracking-wide">Evaluation Request Sent</h3>
                  <p className="text-[#B8A378] text-sm leading-relaxed max-w-md mx-auto">
                    Thank you. Our estimating team will review your site details and respond with a preliminary assessment within 48 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-[#0D0D0D] border border-[#5C4033]/40 p-8 space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#B8A378] text-xs font-mono uppercase tracking-wider mb-1.5">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full bg-[#1A1A1A] border border-[#5C4033]/40 text-white px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B35] transition-colors"
                        placeholder="John Miller"
                      />
                    </div>
                    <div>
                      <label className="block text-[#B8A378] text-xs font-mono uppercase tracking-wider mb-1.5">Company</label>
                      <input
                        type="text"
                        value={formState.company}
                        onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                        className="w-full bg-[#1A1A1A] border border-[#5C4033]/40 text-white px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B35] transition-colors"
                        placeholder="Company Name"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#B8A378] text-xs font-mono uppercase tracking-wider mb-1.5">Email</label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full bg-[#1A1A1A] border border-[#5C4033]/40 text-white px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B35] transition-colors"
                        placeholder="j.miller@buildco.com"
                      />
                    </div>
                    <div>
                      <label className="block text-[#B8A378] text-xs font-mono uppercase tracking-wider mb-1.5">Phone</label>
                      <input
                        type="tel"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        className="w-full bg-[#1A1A1A] border border-[#5C4033]/40 text-white px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B35] transition-colors"
                        placeholder="(312) 555-0000"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#B8A378] text-xs font-mono uppercase tracking-wider mb-1.5">Site Type</label>
                    <select
                      value={formState.siteType}
                      onChange={(e) => setFormState({ ...formState, siteType: e.target.value })}
                      className="w-full bg-[#1A1A1A] border border-[#5C4033]/40 text-white px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B35] transition-colors"
                    >
                      <option value="">Select site type...</option>
                      <option value="residential">Residential Subdivision</option>
                      <option value="commercial">Commercial Building Pad</option>
                      <option value="road">Road / Infrastructure</option>
                      <option value="industrial">Industrial Yard</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#B8A378] text-xs font-mono uppercase tracking-wider mb-1.5">Project Details</label>
                    <textarea
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full bg-[#1A1A1A] border border-[#5C4033]/40 text-white px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF6B35] transition-colors resize-none"
                      placeholder="Approximate acreage, scope of work, timeline expectations..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#FF6B35] text-white px-8 py-3.5 font-bold uppercase tracking-wider text-sm hover:bg-[#E55A2B] transition-colors"
                  >
                    Submit Site Evaluation
                  </button>
                </form>
              )}
            </FadeInSection>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-[#0D0D0D] border-t border-[#5C4033]/30 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-display text-xl text-white tracking-wider">
              TERRA<span className="text-[#FF6B35]">FORM</span>
              <span className="block text-[10px] font-mono text-[#8A6F3E] tracking-[0.3em] uppercase">Civil Works</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-[#8A6F3E] text-xs font-mono">
            <a href="#capabilities" className="hover:text-[#FF6B35] transition-colors">Capabilities</a>
            <a href="#process" className="hover:text-[#FF6B35] transition-colors">Process</a>
            <a href="#equipment" className="hover:text-[#FF6B35] transition-colors">Equipment</a>
            <a href="#projects" className="hover:text-[#FF6B35] transition-colors">Projects</a>
            <a href="#safety" className="hover:text-[#FF6B35] transition-colors">Safety</a>
            <a href="#contact" className="hover:text-[#FF6B35] transition-colors">Contact</a>
          </div>
          <div className="text-[#8A6F3E] text-sm text-center lg:text-right">
            <p>&copy; {new Date().getFullYear()} TerraForm Civil Works. All rights reserved.</p>
            <p className="text-[#5C4033] text-xs mt-1">{siteInfo.license} &middot; Heavy Civil Contractor &middot; IL Licensed & Bonded</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="font-sans bg-[#1A1A1A] text-white antialiased">
      <Navbar />
      <Hero />
      <CapabilitiesSection />
      <ProcessSection />
      <EquipmentSection />
      <ProjectsGallery />
      <SafetySection />
      <JobsitesGallery />
      <ContactSection />
      <Footer />
    </div>
  )
}
