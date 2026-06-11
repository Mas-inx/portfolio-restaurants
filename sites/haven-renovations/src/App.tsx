import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import {
  siteInfo,
  renovationTypes,
  beforeAfters,
  materialCategories,
  timelineSteps,
  testimonials,
  faqs,
  navLinks,
} from './data'

const IconHome = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 9.5L12 3l9 6.5"/><path d="M5 8.5V20a1 1 0 001 1h4v-7h4v7h4a1 1 0 001-1V8.5"/>
  </svg>
)
const IconHammer = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 3v4"/><path d="M8 7h8l-1 4H9L8 7z"/><path d="M12 11v10"/>
  </svg>
)
const IconWrench = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
  </svg>
)
const IconRuler = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 6h20v12H2z"/><path d="M6 6v12"/><path d="M10 6v12"/><path d="M14 6v12"/><path d="M18 6v12"/>
  </svg>
)
const IconUtensils = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>
  </svg>
)
const IconBath = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 12h16a1 1 0 011 1v3a4 4 0 01-4 4H7a4 4 0 01-4-4v-3a1 1 0 011-1z"/><path d="M6 12V5a2 2 0 012-2v0a2 2 0 012 2v3"/><path d="M18 12V5a2 2 0 00-2-2v0a2 2 0 00-2 2v3"/>
  </svg>
)
const IconDown = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
  </svg>
)
const IconPlus = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
)
const IconSofa = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 7a2 2 0 012-2h12a2 2 0 012 2v2"/><path d="M4 13h16v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4z"/><path d="M4 13v-4"/><path d="M20 13v-4"/>
  </svg>
)
const IconStone = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
  </svg>
)
const IconLight = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 008.91 14"/>
  </svg>
)
const IconGrid = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
  </svg>
)
const IconShield = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>
  </svg>
)
const IconPhone = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
)
const IconMail = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13 2 4"/>
  </svg>
)
const IconLocation = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
)
const IconArrowRight = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)
const IconCheckmark = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)
const IconStar = ({className}:{className?:string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)

const iconMap: Record<string, React.FC<{className?:string}>> = {
  home: IconHome, hammer: IconHammer, wrench: IconWrench, ruler: IconRuler,
  utensils: IconUtensils, bath: IconBath, down: IconDown, plus: IconPlus,
  sofa: IconSofa, stone: IconStone, light: IconLight, grid: IconGrid,
  shield: IconShield, phone: IconPhone, mail: IconMail, location: IconLocation,
  'arrow-right': IconArrowRight, checkmark: IconCheckmark, star: IconStar,
}

function Icon({ name, className = 'w-6 h-6' }: { name: string; className?: string }) {
  const C = iconMap[name] || IconHome
  return <C className={className} />
}

function ScrollReveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}

function Section({ id, children, className = '' }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative px-6 md:px-12 lg:px-24 py-20 md:py-28 ${className}`}>
      {children}
    </section>
  )
}

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-ivory/95 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-20">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3">
          <div className="w-10 h-10 bg-charcoal rounded-full flex items-center justify-center">
            <Icon name="home" className="w-5 h-5 text-bronze" />
          </div>
          <div className="hidden sm:block text-left">
            <span className="text-lg font-heading tracking-tight text-charcoal block leading-none">Haven</span>
            <span className="text-[10px] uppercase tracking-[0.15em] text-charcoal/60 font-medium">Renovations</span>
          </div>
        </button>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((l) => (
            <button key={l.href} onClick={() => scrollTo(l.href)} className="text-sm font-semibold text-charcoal/70 hover:text-charcoal transition-colors tracking-wide uppercase">
              {l.label}
            </button>
          ))}
          <button onClick={() => scrollTo('#contact')} className="bg-charcoal text-white px-6 py-2.5 text-sm font-bold tracking-wide hover:bg-black transition-colors rounded-full shadow-sm">
            Start Your Project
          </button>
        </div>

        <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
          <div className={`w-6 h-0.5 bg-charcoal mb-1.5 transition-all ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-6 h-0.5 bg-charcoal mb-1.5 transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-0.5 bg-charcoal transition-all ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-ivory border-t border-charcoal/10 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((l) => (
                <button key={l.href} onClick={() => scrollTo(l.href)} className="text-sm font-semibold text-charcoal text-left uppercase tracking-wide">
                  {l.label}
                </button>
              ))}
              <button onClick={() => scrollTo('#contact')} className="bg-charcoal text-white px-5 py-3 text-sm font-bold tracking-wide text-center rounded-full">
                Start Your Project
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center bg-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 py-28">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div style={{ opacity }} className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-bronze text-sm font-semibold tracking-[0.25em] uppercase">
                {siteInfo.shortTagline}
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl sm:text-6xl md:text-7xl font-heading text-charcoal leading-[1.05] mt-4"
            >
              Renovations that feel
              <span className="block text-bronze">considered, not rushed</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-charcoal/60 text-lg mt-6 leading-relaxed"
            >
              Kitchens, bathrooms, basements, and whole-home transformations. Designed with intention and
              built with craftsmanship that lasts.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-4 mt-8"
            >
              <a href="#contact" className="bg-bronze hover:bg-bronze-dark text-white px-8 py-4 font-semibold text-sm uppercase tracking-wide transition-colors rounded-full shadow-sm">
                Start Your Renovation
              </a>
              <a href="#transformations" className="border-2 border-charcoal/20 hover:border-charcoal/40 text-charcoal px-8 py-4 font-semibold text-sm uppercase tracking-wide transition-colors rounded-full">
                See Transformations
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 1 }}
              className="flex gap-10 mt-12"
            >
              <div><span className="text-charcoal text-2xl font-heading block">{siteInfo.yearsExperience}+</span><span className="text-charcoal/50 text-xs uppercase tracking-widest">Years</span></div>
              <div><span className="text-charcoal text-2xl font-heading block">{siteInfo.projectsCompleted}+</span><span className="text-charcoal/50 text-xs uppercase tracking-widest">Homes</span></div>
              <div><span className="text-charcoal text-2xl font-heading block">{siteInfo.license}</span><span className="text-charcoal/50 text-xs uppercase tracking-widest">License</span></div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative"
          >
            <div className="relative z-10">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
                className="overflow-hidden rounded-sm shadow-xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=85"
                  alt="Elegant living room"
                  className="w-full h-[400px] md:h-[550px] object-cover"
                />
              </motion.div>
              {/* Decorative frame accent */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-bronze/30 rounded-sm -z-10 hidden md:block" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 shadow-lg rounded-sm hidden md:block">
              <div className="text-3xl font-heading text-bronze">{siteInfo.projectsCompleted}+</div>
              <div className="text-xs uppercase tracking-widest text-charcoal/60 mt-1">Completed Projects</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Renovations() {
  return (
    <Section id="renovations" className="bg-ivory-dark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-bronze">What We Do</span>
          <h2 className="text-4xl md:text-5xl font-heading text-charcoal mt-3 leading-tight">Renovation types</h2>
          <p className="text-charcoal/60 mt-4 max-w-2xl mx-auto text-lg leading-relaxed">
            Every home tells a different story. We match the scope to the space from a single powder room to a full-home transformation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {renovationTypes.map((r, i) => (
            <ScrollReveal key={r.title} delay={i * 0.07}>
              <div className="group bg-white border border-charcoal/10 overflow-hidden hover:shadow-lg transition-all duration-400 rounded-sm">
                <div className="overflow-hidden h-48">
                  <motion.img
                    src={r.image}
                    alt={r.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="p-6">
                  <div className="w-10 h-10 rounded-full bg-bronze-pale/60 flex items-center justify-center mb-3">
                    <Icon name={r.icon} className="w-5 h-5 text-bronze" />
                  </div>
                  <h3 className="text-xl font-heading text-charcoal">{r.title}</h3>
                  <p className="text-charcoal/60 text-sm mt-3 leading-relaxed">{r.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </Section>
  )
}

function Transformations() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [sliderPos, setSliderPos] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)

  const ba = beforeAfters[activeIndex]

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    setSliderPos(Math.max(5, Math.min(95, x)))
  }

  return (
    <Section id="transformations" className="bg-ivory">
      <div className="max-w-6xl mx-auto" ref={containerRef}>
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-bronze">Transformations</span>
          <h2 className="text-4xl md:text-5xl font-heading text-charcoal mt-3 leading-tight">Before and after</h2>
          <p className="text-charcoal/60 mt-4 max-w-2xl mx-auto text-lg leading-relaxed">
            Every renovation tells a story. Slide to see the difference.
          </p>
        </div>

        <ScrollReveal>
          <div className="bg-ivory-dark border border-charcoal/10 rounded-sm overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap gap-2 mb-6">
                {beforeAfters.map((b, i) => (
                  <button
                    key={b.title}
                    onClick={() => { setActiveIndex(i); setSliderPos(50) }}
                    className={`px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all ${
                      activeIndex === i
                        ? 'bg-charcoal text-white shadow-sm'
                        : 'bg-white text-charcoal/60 border border-charcoal/20 hover:border-charcoal/40'
                    }`}
                  >
                    {b.title}
                  </button>
                ))}
              </div>

              <div
                className="relative w-full h-[300px] md:h-[500px] overflow-hidden rounded-sm cursor-ew-resize select-none"
                onMouseMove={handleMouseMove}
                onTouchMove={(e) => {
                  if (!containerRef.current || !e.touches[0]) return
                  const rect = containerRef.current.getBoundingClientRect()
                  const x = ((e.touches[0].clientX - rect.left) / rect.width) * 100
                  setSliderPos(Math.max(5, Math.min(95, x)))
                }}
              >
                <img src={ba.after} alt="After" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}>
                  <img src={ba.before} alt="Before" className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div className="absolute inset-y-0" style={{ left: `${sliderPos}%`, marginLeft: '-1.5px' }}>
                  <div className="h-full w-[3px] bg-white shadow-lg" />
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-charcoal">
                    <Icon name="arrow-right" className="w-5 h-5" />
                  </div>
                </div>
                <div className="absolute top-4 left-4 bg-charcoal/80 text-white text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-sm font-semibold">
                  Before
                </div>
                <div className="absolute top-4 right-4 bg-bronze/80 text-white text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-sm font-semibold">
                  After
                </div>
              </div>

              <p className="text-charcoal/70 text-sm mt-5 text-center italic leading-relaxed max-w-2xl mx-auto">
                {ba.description}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </Section>
  )
}

function DesignBuild() {
  return (
    <Section id="design-build" className="bg-ivory-dark">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <ScrollReveal>
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-bronze">Our Approach</span>
              <h2 className="text-4xl md:text-5xl font-heading text-charcoal mt-3 leading-tight">
                Integrated <span className="text-bronze">design and build</span>
              </h2>
              <p className="text-charcoal/60 mt-6 leading-relaxed text-lg">
                Most renovation companies separate design from construction creating handoffs that lose time,
                budget, and intent. We keep it under one roof.
              </p>
              <div className="mt-8 space-y-6">
                {[
                  { title: 'Design-led process', desc: 'Every project starts with a design phase space plans, material boards, 3D renderings before we price or schedule a single trade.' },
                  { title: 'One team, one vision', desc: 'Your designer and project manager work side by side from day one. Decisions made in the studio are understood on the job site.' },
                  { title: 'Cost certainty', desc: 'Because design is complete before construction begins, there are no surprises. What you approve in the rendering is what gets built.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-1 bg-bronze rounded-full shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-charcoal">{item.title}</h4>
                      <p className="text-charcoal/60 text-sm mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="relative">
              <div className="overflow-hidden rounded-sm shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80"
                  alt="Interior design"
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -left-5 bg-white p-5 shadow-md rounded-sm hidden md:block">
                <div className="text-2xl font-heading text-bronze">{siteInfo.projectsCompleted}+</div>
                <div className="text-xs uppercase tracking-widest text-charcoal/60 mt-0.5">Completed Projects</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </Section>
  )
}

function Materials() {
  return (
    <Section id="materials" className="bg-ivory">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-bronze">Materials</span>
          <h2 className="text-4xl md:text-5xl font-heading text-charcoal mt-3 leading-tight">What goes in your home</h2>
          <p className="text-charcoal/60 mt-4 max-w-2xl mx-auto text-lg leading-relaxed">
            We source from the best mills, quarries, and showrooms. Each material is vetted for quality, durability, and aesthetics.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {materialCategories.map((m, i) => (
            <ScrollReveal key={m.title} delay={i * 0.06}>
              <div className="p-6 border border-charcoal/10 hover:border-bronze/30 transition-all duration-300 rounded-sm bg-ivory-dark group">
                <div className="w-10 h-10 rounded-full bg-bronze-pale/60 flex items-center justify-center mb-3 group-hover:bg-bronze/20 transition-colors">
                  <Icon name={m.icon} className="w-5 h-5 text-bronze" />
                </div>
                <h3 className="text-lg font-heading text-charcoal">{m.title}</h3>
                <ul className="mt-3 space-y-1.5">
                  {m.items.map((item) => (
                    <li key={item} className="text-sm text-charcoal/60 flex items-center gap-2">
                      <span className="w-1 h-1 bg-bronze rounded-full shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </Section>
  )
}

function Process() {
  return (
    <Section id="process" className="bg-charcoal">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-bronze">Timeline</span>
          <h2 className="text-4xl md:text-5xl font-heading text-white mt-3 leading-tight">
            Your renovation journey
          </h2>
          <p className="text-white/50 mt-4 text-lg max-w-2xl mx-auto">
            From first conversation to final walkthrough here is what to expect.
          </p>
        </div>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-9 md:left-[42px] top-0 bottom-0 w-px bg-white/10 hidden md:block" />

          {timelineSteps.map((step, i) => (
            <ScrollReveal key={step.phase} delay={i * 0.1}>
              <div className="flex gap-6 md:gap-10 mb-10 last:mb-0">
                <div className="hidden md:flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-[84px] h-[84px] rounded-full border-2 border-bronze/60 flex items-center justify-center font-heading text-lg text-bronze z-10 bg-charcoal"
                  >
                    {step.phase}
                  </motion.div>
                </div>
                <div className="flex-1">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-sm hover:border-bronze/30 transition-all duration-300">
                    <div className="flex items-center gap-3 md:hidden mb-2">
                      <span className="w-10 h-10 rounded-full border-2 border-bronze/60 flex items-center justify-center font-heading text-sm text-bronze">{step.phase}</span>
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-heading text-white">{step.title}</h3>
                        <p className="text-white/60 mt-2 text-sm leading-relaxed">{step.description}</p>
                      </div>
                      <span className="text-xs text-bronze whitespace-nowrap font-semibold uppercase tracking-wider shrink-0">{step.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </Section>
  )
}

function Testimonials() {
  const [active, setActive] = useState(0)

  return (
    <Section id="testimonials" className="bg-ivory-dark">
      <div className="max-w-4xl mx-auto text-center">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-bronze">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-heading text-charcoal mt-3 leading-tight">What our clients say</h2>
        </div>

        <motion.div
          key={active}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-bronze/30 mx-auto mb-6">
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
          </svg>
          <p className="text-charcoal text-lg md:text-xl leading-relaxed italic">
            {testimonials[active].text}
          </p>
          <div className="mt-6">
            <p className="text-charcoal font-heading text-lg">{testimonials[active].name}</p>
            <p className="text-charcoal/50 text-sm">{testimonials[active].role}</p>
          </div>
        </motion.div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === active ? 'bg-bronze w-6' : 'bg-charcoal/20 hover:bg-charcoal/40'
              }`}
            />
          ))}
        </div>
      </div>
    </Section>
  )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <Section id="faq" className="bg-ivory">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-bronze">FAQ</span>
          <h2 className="text-4xl md:text-5xl font-heading text-charcoal mt-3 leading-tight">Questions you might have</h2>
          <p className="text-charcoal/60 mt-4 max-w-xl mx-auto text-lg">Honest answers about cost, timeline, and how we work.</p>
        </div>

        <div className="space-y-2">
          {faqs.map((f, i) => (
            <div key={i} className="bg-ivory-dark border border-charcoal/10 rounded-sm overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex justify-between items-center p-5 text-left"
              >
                <span className="font-semibold text-charcoal text-sm pr-4">{f.question}</span>
                <motion.span
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-bronze shrink-0"
                >
                  <Icon name="arrow-right" className="w-4 h-4" />
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
                    <p className="px-5 pb-5 text-charcoal/60 text-sm leading-relaxed">{f.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <Section id="contact" className="bg-charcoal">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-bronze">Contact</span>
          <h2 className="text-4xl md:text-5xl font-heading text-white mt-3 leading-tight">
            Lets talk about your home
          </h2>
          <p className="text-white/50 mt-4 text-lg max-w-xl mx-auto">
            Tell us about your space. We will schedule a consultation within 48 hours.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-10 max-w-4xl mx-auto">
          <ScrollReveal className="md:col-span-2">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-bronze">
                  <Icon name="phone" className="w-5 h-5" />
                </div>
                <div><div className="text-white font-semibold">Phone</div><div className="text-white/50 text-sm">{siteInfo.phone}</div></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-bronze">
                  <Icon name="mail" className="w-5 h-5" />
                </div>
                <div><div className="text-white font-semibold">Email</div><div className="text-white/50 text-sm">{siteInfo.email}</div></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-bronze">
                  <Icon name="location" className="w-5 h-5" />
                </div>
                <div><div className="text-white font-semibold">Studio</div><div className="text-white/50 text-sm">{siteInfo.address}</div></div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="md:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Full name" required className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-bronze transition-colors rounded-sm placeholder-white/30" />
                <input type="email" placeholder="Email address" required className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-bronze transition-colors rounded-sm placeholder-white/30" />
              </div>
              <input type="tel" placeholder="Phone number" required className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-bronze transition-colors rounded-sm placeholder-white/30" />
              <select className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-bronze transition-colors rounded-sm">
                <option value="" className="text-gray-400">Renovation type</option>
                <option value="kitchen" className="text-gray-900">Kitchen</option>
                <option value="bathroom" className="text-gray-900">Bathroom</option>
                <option value="basement" className="text-gray-900">Basement</option>
                <option value="full-home" className="text-gray-900">Full Home</option>
                <option value="addition" className="text-gray-900">Addition</option>
                <option value="other" className="text-gray-900">Other</option>
              </select>
              <textarea rows={4} placeholder="Tell us about your project..." required className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-bronze transition-colors rounded-sm placeholder-white/30" />
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="w-full bg-bronze hover:bg-bronze-dark text-white py-4 font-bold text-sm tracking-wide uppercase transition-colors rounded-full"
              >
                {submitted ? <span className="flex items-center justify-center gap-2"><Icon name="checkmark" className="w-4 h-4" /> Inquiry Sent</span> : 'Request Consultation'}
              </motion.button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </Section>
  )
}

function Footer() {
  return (
    <footer className="bg-[#1a1816] text-white/40 px-6 md:px-12 lg:px-24 py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-bronze rounded-full flex items-center justify-center">
            <Icon name="home" className="w-4 h-4 text-[#1a1816]" />
          </div>
          <span className="text-white font-heading">Haven Renovations</span>
        </div>
        <div className="text-xs text-center md:text-left">
          &copy; {new Date().getFullYear()} Haven Renovations. {siteInfo.license}. All rights reserved.
        </div>
        <div className="flex gap-4 text-xs">
          <span className="hover:text-white/80 transition-colors cursor-pointer">Privacy</span>
          <span className="hover:text-white/80 transition-colors cursor-pointer">Terms</span>
          <span className="hover:text-white/80 transition-colors cursor-pointer">Instagram</span>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="font-body bg-ivory text-charcoal antialiased overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Renovations />
        <Transformations />
        <DesignBuild />
        <Materials />
        <Process />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
