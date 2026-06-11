import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  siteInfo,
  services,
  projects,
  processSteps,
  testimonials,
  teamMembers,
  faqs,
  navLinks,
} from './data'

// ─── SVG ICONS ────────────────────────────────────────────────────────────────

const Icons: Record<string, React.FC<{ className?: string }>> = {
  building: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 21h18M5 21V7l7-4 7 4v14M9 9h1M9 13h1M9 17h1M14 9h1M14 13h1M14 17h1" strokeLinecap="round" />
    </svg>
  ),
  blueprint: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="1" />
      <path d="M3 9h18M9 3v18M15 3v6M9 15h6" strokeLinecap="round" />
    </svg>
  ),
  helmet: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 18h20M4 18c0-4 2-8 8-8s8 4 8 8M8 10V7a4 4 0 018 0v3" strokeLinecap="round" />
    </svg>
  ),
  wrench: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  ruler: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21.7 5.3l-13 13-3-3 13-13 3 3zM8.7 14.3l1.5-1.5M11.2 11.8l1.5-1.5M13.7 9.3l1.5-1.5M16.2 6.8l1.5-1.5" strokeLinecap="round" />
    </svg>
  ),
  clipboard: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" strokeLinecap="round" />
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M8 12h8M8 16h5" strokeLinecap="round" />
    </svg>
  ),
  phone: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" strokeLinecap="round" />
    </svg>
  ),
  mail: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 6l-10 7L2 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  pin: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  arrow: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  chevron: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  menu: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" />
    </svg>
  ),
  close: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
    </svg>
  ),
}

// ─── ANIMATED COUNTER ─────────────────────────────────────────────────────────

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000
    const startTime = Date.now()
    const tick = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    tick()
  }, [inView, target])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

// ─── NAVIGATION ───────────────────────────────────────────────────────────────

function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#1A1A2E]/95 backdrop-blur-md border-b border-[#C47A2E]/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
          <a href="#" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#C47A2E] flex items-center justify-center">
              <span className="text-[#1A1A2E] font-black text-lg">F</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-white font-bold text-lg tracking-tight">FORGEBUILT</span>
              <span className="block text-[#C47A2E] text-[10px] font-semibold tracking-[0.2em] uppercase">
                {siteInfo.shortTagline}
              </span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/70 hover:text-[#C47A2E] text-sm font-semibold tracking-wide uppercase transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            <a
              href={`tel:${siteInfo.phone}`}
              className="bg-[#C47A2E] text-[#1A1A2E] px-5 py-2.5 font-bold text-sm tracking-wide uppercase hover:bg-[#d4882e] transition-colors"
            >
              {siteInfo.phone}
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-white p-2"
          >
            <Icons.menu className="w-6 h-6" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#1A1A2E] flex flex-col"
          >
            <div className="flex items-center justify-between px-6 h-20 border-b border-white/10">
              <span className="text-white font-bold text-lg">FORGEBUILT</span>
              <button onClick={() => setMobileOpen(false)} className="text-white p-2">
                <Icons.close className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="text-white text-3xl font-bold tracking-tight hover:text-[#C47A2E] transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
            <div className="px-6 pb-10">
              <a
                href={`tel:${siteInfo.phone}`}
                className="block text-center bg-[#C47A2E] text-[#1A1A2E] px-6 py-4 font-bold text-lg tracking-wide uppercase"
              >
                {siteInfo.phone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, 150])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 -top-20 -bottom-20"
      >
        <div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=85)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A2E]/80 via-[#1A1A2E]/60 to-[#1A1A2E]" />
      </motion.div>

      {/* Diagonal amber accent */}
      <div className="absolute top-0 right-0 w-[40%] h-full bg-[#C47A2E]/10 skew-x-[-8deg] translate-x-[20%]" />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col justify-end pb-24 lg:pb-32 px-6 lg:px-12 max-w-[1400px] mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-[#C47A2E]" />
            <span className="text-[#C47A2E] font-semibold text-sm tracking-[0.3em] uppercase">
              Est. {siteInfo.founded}
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight mb-8"
        >
          WE BUILD
          <br />
          <span className="text-[#C47A2E]">WHAT LASTS</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-white/70 text-lg md:text-xl max-w-xl mb-10 font-light leading-relaxed"
        >
          {siteInfo.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-wrap gap-4"
        >
          <a
            href="#work"
            className="group bg-[#C47A2E] text-[#1A1A2E] px-8 py-4 font-bold text-sm tracking-wider uppercase flex items-center gap-3 hover:bg-white transition-colors duration-300"
          >
            View Our Work
            <Icons.arrow className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="border-2 border-white/30 text-white px-8 py-4 font-bold text-sm tracking-wider uppercase hover:border-[#C47A2E] hover:text-[#C47A2E] transition-colors duration-300"
          >
            Get an Estimate
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-[1px] h-8 bg-[#C47A2E]/60"
        />
      </motion.div>
    </section>
  )
}

// ─── STATS BAR ────────────────────────────────────────────────────────────────

function StatsBar() {
  const stats = [
    { value: siteInfo.projectsCompleted, suffix: '+', label: 'Projects Delivered' },
    { value: siteInfo.yearsExperience, suffix: '', label: 'Years of Experience' },
    { value: siteInfo.employees, suffix: '+', label: 'Team Members' },
    { value: 100, suffix: '%', label: 'On-Time Delivery' },
  ]

  return (
    <section className="relative bg-[#1A1A2E] border-t-4 border-[#C47A2E]">
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="p-8 lg:p-12 border-r border-white/10 last:border-r-0 text-center lg:text-left"
          >
            <div className="text-[#C47A2E] text-4xl lg:text-5xl font-black tracking-tight mb-2">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
            </div>
            <div className="text-white/50 text-xs font-semibold tracking-[0.2em] uppercase">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ─── SERVICES ─────────────────────────────────────────────────────────────────

function Services() {
  return (
    <section id="services" className="bg-[#F5F0EB] py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 lg:mb-24"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-[#C47A2E]" />
            <span className="text-[#C47A2E] font-semibold text-xs tracking-[0.3em] uppercase">
              What We Do
            </span>
          </div>
          <h2 className="text-[#1A1A2E] text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95]">
            FULL-SERVICE
            <br />
            CONSTRUCTION
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[2px] bg-[#1A1A2E]/10">
          {services.map((service, i) => {
            const Icon = Icons[service.icon] || Icons.building
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="group bg-[#F5F0EB] p-8 lg:p-10 hover:bg-[#1A1A2E] transition-colors duration-500 cursor-default"
              >
                <div className="w-14 h-14 mb-6 text-[#C47A2E] group-hover:text-[#C47A2E] transition-colors">
                  <Icon className="w-full h-full" />
                </div>
                <h3 className="text-[#1A1A2E] group-hover:text-white text-xl font-bold mb-3 tracking-tight transition-colors duration-500">
                  {service.title}
                </h3>
                <p className="text-[#1A1A2E]/60 group-hover:text-white/60 text-sm leading-relaxed transition-colors duration-500">
                  {service.description}
                </p>
                <div className="mt-6 w-0 group-hover:w-12 h-[2px] bg-[#C47A2E] transition-all duration-500" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── FEATURED PROJECTS ────────────────────────────────────────────────────────

function FeaturedProjects() {
  const [activeProject, setActiveProject] = useState<number | null>(null)

  return (
    <section id="work" className="bg-[#1A1A2E] py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 lg:mb-24"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-[#C47A2E]" />
              <span className="text-[#C47A2E] font-semibold text-xs tracking-[0.3em] uppercase">
                Portfolio
              </span>
            </div>
            <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95]">
              SELECTED
              <br />
              PROJECTS
            </h2>
          </div>
          <p className="text-white/50 max-w-md mt-6 lg:mt-0 text-sm leading-relaxed">
            Each project represents our commitment to precision, safety, and delivering
            on every promise we make to our clients.
          </p>
        </motion.div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          {projects.map((project, i) => {
            const isLarge = i === 0 || i === 3
            const colSpan = isLarge ? 'lg:col-span-7' : 'lg:col-span-5'
            const height = isLarge ? 'h-[500px] lg:h-[600px]' : 'h-[400px] lg:h-[450px]'

            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className={`${colSpan} relative group overflow-hidden cursor-pointer ${height}`}
                onMouseEnter={() => setActiveProject(i)}
                onMouseLeave={() => setActiveProject(null)}
              >
                {/* Image */}
                <motion.div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${project.image})` }}
                  animate={{
                    scale: activeProject === i ? 1.08 : 1,
                  }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E] via-[#1A1A2E]/30 to-transparent" />

                {/* Category Tag */}
                <div className="absolute top-6 left-6">
                  <span className="bg-[#C47A2E] text-[#1A1A2E] text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5">
                    {project.category}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  <motion.div
                    animate={{
                      y: activeProject === i ? 0 : 20,
                      opacity: activeProject === i ? 1 : 0.9,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <h3 className="text-white text-2xl lg:text-3xl font-black tracking-tight mb-2">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-4 text-white/60 text-xs font-medium mb-3">
                      <span>{project.location}</span>
                      <span className="w-1 h-1 bg-[#C47A2E] rounded-full" />
                      <span>{project.scope}</span>
                      <span className="w-1 h-1 bg-[#C47A2E] rounded-full" />
                      <span>{project.duration}</span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={false}
                    animate={{
                      height: activeProject === i ? 'auto' : 0,
                      opacity: activeProject === i ? 1 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden"
                  >
                    <p className="text-white/70 text-sm leading-relaxed pt-2 border-t border-white/10 mt-2">
                      {project.description}
                    </p>
                  </motion.div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#C47A2E]/0 group-hover:border-[#C47A2E]/60 transition-colors duration-500" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── PROCESS ──────────────────────────────────────────────────────────────────

function Process() {
  return (
    <section id="process" className="bg-[#F5F0EB] py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 lg:mb-24"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-[#C47A2E]" />
            <span className="text-[#C47A2E] font-semibold text-xs tracking-[0.3em] uppercase">
              How We Work
            </span>
          </div>
          <h2 className="text-[#1A1A2E] text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95]">
            OUR PROCESS
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[28px] lg:left-1/2 top-0 bottom-0 w-[2px] bg-[#1A1A2E]/10 lg:-translate-x-[1px]" />

          {processSteps.map((step, i) => {
            const isLeft = i % 2 === 0
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative flex items-start gap-6 lg:gap-0 mb-12 lg:mb-16 last:mb-0 ${
                  isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`flex-1 pl-16 lg:pl-0 ${isLeft ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'}`}>
                  <span className="text-[#C47A2E] text-xs font-bold tracking-[0.3em] uppercase">
                    Step {String(step.step).padStart(2, '0')}
                  </span>
                  <h3 className="text-[#1A1A2E] text-2xl lg:text-3xl font-black mt-2 mb-3 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-[#1A1A2E]/60 text-sm leading-relaxed mb-3">
                    {step.description}
                  </p>
                  <p className="text-[#1A1A2E]/40 text-xs leading-relaxed italic">
                    {step.details}
                  </p>
                </div>

                {/* Node */}
                <div className="absolute left-0 lg:relative lg:left-auto flex-shrink-0 z-10">
                  <div className="w-14 h-14 bg-[#1A1A2E] flex items-center justify-center border-4 border-[#F5F0EB]">
                    <span className="text-[#C47A2E] font-black text-lg">
                      {String(step.step).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Spacer for other side */}
                <div className="hidden lg:block flex-1" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────

function Testimonials() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="bg-[#1A1A2E] py-24 lg:py-32 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#C47A2E]/40 to-transparent" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#C47A2E]/5 rounded-full blur-3xl" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-[#C47A2E]" />
            <span className="text-[#C47A2E] font-semibold text-xs tracking-[0.3em] uppercase">
              Client Words
            </span>
          </div>
          <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
            TRUSTED BY
            <br />
            THE BEST
          </h2>
        </motion.div>

        {/* Testimonial Display */}
        <div className="relative min-h-[280px] lg:min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <div className="text-[#C47A2E] text-6xl font-black leading-none mb-4">"</div>
              <p className="text-white/80 text-xl lg:text-2xl font-light leading-relaxed mb-8">
                {testimonials[current].text}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-[2px] bg-[#C47A2E]" />
                <div>
                  <div className="text-white font-bold text-lg">{testimonials[current].name}</div>
                  <div className="text-white/50 text-sm">
                    {testimonials[current].role}, {testimonials[current].company}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Dots */}
        <div className="flex gap-3 mt-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-[3px] transition-all duration-500 ${
                i === current ? 'w-12 bg-[#C47A2E]' : 'w-6 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── TEAM ─────────────────────────────────────────────────────────────────────

function Team() {
  return (
    <section id="team" className="bg-[#F5F0EB] py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-[#C47A2E]" />
              <span className="text-[#C47A2E] font-semibold text-xs tracking-[0.3em] uppercase">
                Leadership
              </span>
            </div>
            <h2 className="text-[#1A1A2E] text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] mb-6">
              THE PEOPLE
              <br />
              BEHIND THE
              <br />
              <span className="text-[#C47A2E]">STEEL</span>
            </h2>
            <p className="text-[#1A1A2E]/60 text-base leading-relaxed max-w-md">
              Founded in {siteInfo.founded}, ForgeBuilt has grown from a two-person operation
              into a {siteInfo.employees}-person team of builders, engineers, and project
              managers who take pride in every detail.
            </p>
          </motion.div>

          {/* Right - Team Cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="group relative"
              >
                <div className="relative overflow-hidden aspect-[3/4]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E] via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white font-bold text-lg tracking-tight">{member.name}</h3>
                    <p className="text-[#C47A2E] text-xs font-semibold tracking-wider uppercase mt-1">
                      {member.role}
                    </p>
                  </div>
                  {/* Amber corner */}
                  <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-[#C47A2E] border-l-[40px] border-l-transparent group-hover:w-full group-hover:h-full transition-all duration-500 opacity-20" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="bg-[#1A1A2E] py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
          {/* Left Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-[#C47A2E]" />
              <span className="text-[#C47A2E] font-semibold text-xs tracking-[0.3em] uppercase">
                FAQ
              </span>
            </div>
            <h2 className="text-white text-4xl md:text-5xl font-black tracking-tight leading-[0.95] mb-6">
              QUESTIONS?
              <br />
              <span className="text-white/30">ANSWERS.</span>
            </h2>
            <p className="text-white/50 text-sm leading-relaxed">
              Common questions from property owners, developers, and architects
              considering a project with us.
            </p>
          </motion.div>

          {/* Right - Accordion */}
          <div className="lg:col-span-8">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-white/10"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between py-6 text-left group"
                >
                  <span className="text-white group-hover:text-[#C47A2E] font-bold text-base lg:text-lg transition-colors pr-8">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 text-[#C47A2E]"
                  >
                    <Icons.chevron className="w-5 h-5" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-white/60 text-sm leading-relaxed pb-6 pr-12">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── CTA + FOOTER ─────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer id="contact" className="bg-[#0F0F1A] relative overflow-hidden">
      {/* CTA Section */}
      <div className="relative border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-r from-[#C47A2E]/10 to-transparent" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-24 lg:py-32 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <h2 className="text-white text-4xl md:text-5xl lg:text-7xl font-black tracking-tight leading-[0.9] mb-8">
              READY TO
              <br />
              <span className="text-[#C47A2E]">BREAK GROUND?</span>
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-lg leading-relaxed">
              Tell us about your project. We respond to every inquiry within one business day
              with a preliminary scope assessment.
            </p>
            <div className="flex flex-wrap gap-6">
              <a
                href={`tel:${siteInfo.phone}`}
                className="group flex items-center gap-3 bg-[#C47A2E] text-[#1A1A2E] px-8 py-4 font-bold text-sm tracking-wider uppercase hover:bg-white transition-colors duration-300"
              >
                <Icons.phone className="w-4 h-4" />
                {siteInfo.phone}
              </a>
              <a
                href={`mailto:${siteInfo.email}`}
                className="group flex items-center gap-3 border-2 border-white/20 text-white px-8 py-4 font-bold text-sm tracking-wider uppercase hover:border-[#C47A2E] hover:text-[#C47A2E] transition-colors duration-300"
              >
                <Icons.mail className="w-4 h-4" />
                Email Us
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#C47A2E] flex items-center justify-center">
                <span className="text-[#1A1A2E] font-black text-lg">F</span>
              </div>
              <div>
                <span className="text-white font-bold text-lg tracking-tight block">FORGEBUILT</span>
                <span className="text-[#C47A2E] text-[10px] font-semibold tracking-[0.2em] uppercase">
                  {siteInfo.shortTagline}
                </span>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Licensed IL-GC-{siteInfo.license.split('-').pop()}
              <br />
              {siteInfo.insurance}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-6">Navigation</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-[#C47A2E] text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-6">Services</h4>
            <ul className="space-y-3">
              {services.slice(0, 5).map((service) => (
                <li key={service.title}>
                  <span className="text-white/50 text-sm">{service.title}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Icons.pin className="w-4 h-4 text-[#C47A2E] mt-0.5 flex-shrink-0" />
                <span className="text-white/50 text-sm">{siteInfo.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Icons.phone className="w-4 h-4 text-[#C47A2E] flex-shrink-0" />
                <a href={`tel:${siteInfo.phone}`} className="text-white/50 hover:text-[#C47A2E] text-sm transition-colors">
                  {siteInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Icons.mail className="w-4 h-4 text-[#C47A2E] flex-shrink-0" />
                <a href={`mailto:${siteInfo.email}`} className="text-white/50 hover:text-[#C47A2E] text-sm transition-colors">
                  {siteInfo.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            &copy; {new Date().getFullYear()} {siteInfo.name}. All rights reserved.
          </p>
          <p className="text-white/30 text-xs">
            Licensed & Insured — State of Illinois
          </p>
        </div>
      </div>
    </footer>
  )
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen bg-[#1A1A2E] font-sans antialiased">
      <Navigation />
      <Hero />
      <StatsBar />
      <Services />
      <FeaturedProjects />
      <Process />
      <Testimonials />
      <Team />
      <Faq />
      <Footer />
    </div>
  )
}
