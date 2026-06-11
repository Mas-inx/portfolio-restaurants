import { useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  siteInfo, capabilities, processPhases, equipment,
  projectTypes, safetyPoints, navLinks
} from './data'

function useScrollProgress() {
  const { scrollYProgress } = useScroll()
  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  return width
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const width = useScrollProgress()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-asphalt-950/95 backdrop-blur-sm border-b border-earth-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-survey-500 flex items-center justify-center text-asphalt-950 font-bold text-lg font-display">TC</div>
            <div>
              <h1 className="text-lg font-bold text-white leading-tight">{siteInfo.name}</h1>
              <p className="text-xs text-asphalt-400 hidden sm:block font-mono">{siteInfo.shortTagline}</p>
            </div>
          </div>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className="text-sm text-asphalt-300 hover:text-survey-400 transition-colors font-medium tracking-wide uppercase">
                {l.label}
              </a>
            ))}
            <a href="#contact" className="px-5 py-2.5 bg-survey-500 hover:bg-survey-600 text-asphalt-950 font-bold rounded-lg transition-colors text-sm tracking-wide">
              Get a Quote
            </a>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-asphalt-300 hover:text-white p-2" aria-label="Menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-asphalt-900 border-t border-earth-900/50 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map(l => (
                <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="block text-sm text-asphalt-300 hover:text-survey-400 transition-colors uppercase font-medium tracking-wide">
                  {l.label}
                </a>
              ))}
              <a href="#contact" onClick={() => setMenuOpen(false)} className="block text-center px-5 py-3 bg-survey-500 hover:bg-survey-600 text-asphalt-950 font-bold rounded-lg transition-colors text-sm tracking-wide">
                Get a Quote
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll progress bar */}
      <motion.div className="h-0.5 bg-survey-500 origin-left" style={{ scaleX: width }} />
    </nav>
  )
}

function SectionHeading({ title, subtitle, light }: { title: string; subtitle?: string; light?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      className="text-center mb-16"
    >
      <h2 className={`text-4xl lg:text-5xl font-display tracking-wider ${light ? 'text-white' : 'text-asphalt-950'}`}>
        {title}
      </h2>
      <div className="w-16 h-1 bg-survey-500 mx-auto mt-4 mb-4" />
      {subtitle && <p className={`max-w-2xl mx-auto text-base ${light ? 'text-asphalt-300' : 'text-asphalt-600'}`}>{subtitle}</p>}
    </motion.div>
  )
}

function FadeInUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  )
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-asphalt-950 via-asphalt-900 to-earth-900" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-survey-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-earth-500/20 rounded-full blur-3xl" />
      </div>
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(#f97316 1px, transparent 1px), linear-gradient(90deg, #f97316 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-survey-500/10 border border-survey-500/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-survey-400 animate-pulse" />
              <span className="text-sm text-survey-300 font-mono">Est. {siteInfo.founded} · Licensed & Insured</span>
            </div>
            <h1 className="text-6xl lg:text-8xl font-display tracking-wider text-white leading-none mb-6">
              {siteInfo.tagline}
              <span className="block text-survey-400 text-4xl lg:text-5xl mt-2">Heavy Civil · Sitework · Land Development</span>
            </h1>
            <p className="text-lg text-asphalt-300 leading-relaxed mb-8 max-w-xl">
              With <strong className="text-white">{siteInfo.yearsExperience} years</strong> and over <strong className="text-white">{siteInfo.projectsCompleted}+ projects</strong> completed, 
              we prepare land for residential, commercial, and industrial development across the greater Chicago area.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="px-8 py-3.5 bg-survey-500 hover:bg-survey-600 text-asphalt-950 font-bold rounded-lg transition-colors text-lg tracking-wide">
                Request a Site Evaluation
              </a>
              <a href="#capabilities" className="px-8 py-3.5 border border-asphalt-600 hover:border-survey-500 text-asphalt-200 hover:text-white rounded-lg transition-colors text-lg font-medium">
                Our Capabilities
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="bg-asphalt-900/50 border border-asphalt-700 rounded-2xl p-8 backdrop-blur-sm">
              <div className="space-y-6">
                {[
                  { label: 'Years Experience', value: siteInfo.yearsExperience },
                  { label: 'Projects Completed', value: siteInfo.projectsCompleted },
                  { label: 'Crew Size', value: siteInfo.crewSize },
                  { label: 'Acres Cleared', value: siteInfo.acresCleared },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-center justify-between border-b border-asphalt-700/50 pb-4 last:border-0 last:pb-0"
                  >
                    <span className="text-asphalt-400 font-mono text-sm uppercase tracking-wider">{stat.label}</span>
                    <span className="text-2xl font-bold text-white font-mono">{stat.value}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-asphalt-700/50">
                <p className="text-sm text-asphalt-400 font-mono">{siteInfo.license} · {siteInfo.insurance}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex justify-center mt-16"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-survey-400"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function Capabilities() {
  return (
    <section id="capabilities" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Core Capabilities"
          subtitle="From mass excavation to final compaction — we handle every phase of sitework in-house."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((c, i) => (
            <FadeInUp key={c.title} delay={i * 0.08}>
              <div className="group p-6 rounded-xl border border-asphalt-200 hover:border-survey-400 bg-white hover:bg-asphalt-50 transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-lg bg-survey-100 flex items-center justify-center text-2xl mb-4 group-hover:bg-survey-500 transition-colors">
                  {c.icon}
                </div>
                <h3 className="text-lg font-bold text-asphalt-950 mb-2">{c.title}</h3>
                <p className="text-sm text-asphalt-600 leading-relaxed">{c.description}</p>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section id="process" className="py-24 bg-asphalt-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Sitework Process"
          subtitle="A proven 6-phase methodology that delivers consistent results across every project."
        />
        <div className="relative">
          {/* Process line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-asphalt-300 hidden lg:block" />

          <div className="space-y-8 lg:space-y-0 relative">
            {processPhases.map((phase, i) => (
              <FadeInUp key={phase.title} delay={i * 0.1}>
                <div className="lg:grid lg:grid-cols-5 gap-8 items-start relative">
                  {/* Phase number */}
                  <div className="lg:col-span-1 flex lg:block items-center gap-4 mb-4 lg:mb-0">
                    <div className="w-16 h-16 rounded-full bg-survey-500 flex items-center justify-center text-asphalt-950 font-display text-2xl flex-shrink-0 relative z-10">
                      {phase.phase}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-asphalt-950 lg:hidden">{phase.title}</h3>
                      <p className="text-xs text-survey-600 font-mono uppercase tracking-wider hidden lg:block">Phase {phase.phase}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:col-span-4 bg-white rounded-xl border border-asphalt-200 p-6 ml-4 lg:ml-0">
                    <h3 className="text-xl font-bold text-asphalt-950 mb-2 hidden lg:block">{phase.title}</h3>
                    <p className="text-asphalt-700 mb-3">{phase.description}</p>
                    <p className="text-sm text-asphalt-500 font-mono flex items-start gap-2">
                      <span className="text-survey-500 mt-0.5">▶</span>
                      {phase.details}
                    </p>
                  </div>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function EquipmentFleet() {
  return (
    <section id="equipment" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Equipment Fleet"
          subtitle="Modern, well-maintained machines operated by certified heavy equipment operators."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {equipment.map((eq, i) => (
            <FadeInUp key={eq.name} delay={i * 0.08}>
              <div className="bg-asphalt-50 rounded-xl border border-asphalt-200 overflow-hidden group hover:border-survey-400 transition-colors">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{eq.icon}</span>
                    <span className="text-xs font-mono text-survey-600 bg-survey-100 px-2 py-1 rounded-full uppercase tracking-wider">
                      {eq.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-asphalt-950 mb-1">{eq.name}</h3>
                  <p className="text-sm text-asphalt-600 mb-3">{eq.description}</p>
                  <div className="flex items-center gap-2 text-sm font-mono text-asphalt-500 bg-asphalt-100 rounded-lg px-3 py-2">
                    <svg className="w-4 h-4 text-survey-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    {eq.specs}
                  </div>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectTypes() {
  return (
    <section id="projects" className="py-24 bg-asphalt-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Project Types"
          subtitle="Diverse experience across residential, commercial, and heavy civil sitework."
          light
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projectTypes.map((pt, i) => (
            <FadeInUp key={pt.title} delay={i * 0.1}>
              <div className="group relative overflow-hidden rounded-xl border border-asphalt-700 hover:border-survey-500 transition-all duration-300">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={pt.image}
                    alt={pt.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-asphalt-950 via-asphalt-950/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-lg font-bold text-white mb-1">{pt.title}</h3>
                  <p className="text-sm text-asphalt-300 leading-relaxed">{pt.description}</p>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function Safety() {
  return (
    <section id="safety" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Safety & Compliance"
          subtitle="We maintain rigorous safety protocols and full regulatory compliance on every site."
        />
        <div className="grid sm:grid-cols-2 gap-6">
          {safetyPoints.map((sp, i) => (
            <FadeInUp key={sp.title} delay={i * 0.1}>
              <div className="flex gap-4 p-6 rounded-xl bg-asphalt-50 border border-asphalt-200 hover:border-survey-300 transition-colors">
                <div className="w-1.5 bg-survey-500 rounded-full flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-asphalt-950 text-lg mb-2">{sp.title}</h3>
                  <p className="text-asphalt-600 text-sm leading-relaxed">{sp.description}</p>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function Gallery() {
  const images = [
    { src: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80', label: 'Site Preparation' },
    { src: 'https://images.unsplash.com/photo-1541888946425-d81bb2c88ea5?w=600&q=80', label: 'Road Construction' },
    { src: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&q=80', label: 'Commercial Pad' },
    { src: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80', label: 'Industrial Yard' },
    { src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80', label: 'Residential Development' },
    { src: 'https://images.unsplash.com/photo-1590674899484-d5640d854c2c?w=600&q=80', label: 'Utility Installation' },
  ]

  return (
    <section className="py-24 bg-asphalt-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Project Gallery"
          subtitle="Real job sites across stages of development — from clearing to finished pad."
        />
      </div>
      <div className="overflow-x-auto scroll-container px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex gap-6 pb-4"
          style={{ minWidth: 'max-content' }}
        >
          {images.map((img, i) => (
            <motion.div
              key={img.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative flex-shrink-0 w-80 rounded-xl overflow-hidden group"
            >
              <img src={img.src} alt={img.label} className="w-80 h-52 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-asphalt-950/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-semibold text-sm">{img.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="py-24 bg-asphalt-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'radial-gradient(circle, #f97316 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-display tracking-wider text-white leading-tight mb-6">
              Ready to break ground?
              <span className="block text-survey-400 text-2xl lg:text-3xl mt-2">Request a site evaluation</span>
            </h2>
            <p className="text-asphalt-300 mb-8 leading-relaxed">
              Tell us about your project and we'll provide a preliminary assessment within 48 hours.
              We serve residential, commercial, and industrial clients across northern Illinois and northwest Indiana.
            </p>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3 text-asphalt-300">
                <svg className="w-5 h-5 text-survey-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {siteInfo.phone}
              </div>
              <div className="flex items-center gap-3 text-asphalt-300">
                <svg className="w-5 h-5 text-survey-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {siteInfo.email}
              </div>
              <div className="flex items-center gap-3 text-asphalt-300">
                <svg className="w-5 h-5 text-survey-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {siteInfo.address}
              </div>
              <div className="flex items-center gap-3 text-asphalt-300">
                <svg className="w-5 h-5 text-survey-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                {siteInfo.license}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            {submitted ? (
              <div className="bg-asphalt-900/50 border border-survey-500/30 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-survey-500/20 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-survey-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Evaluation Request Submitted</h3>
                <p className="text-asphalt-400">A project estimator will contact you within 48 hours to discuss your sitework needs.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-asphalt-900/50 border border-asphalt-700 rounded-2xl p-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-asphalt-300 mb-1.5">Full Name</label>
                    <input type="text" required className="w-full px-4 py-3 bg-asphalt-950 border border-asphalt-700 rounded-lg text-white placeholder-asphalt-500 focus:border-survey-500 focus:ring-1 focus:ring-survey-500 outline-none transition-colors" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-asphalt-300 mb-1.5">Company</label>
                    <input type="text" className="w-full px-4 py-3 bg-asphalt-950 border border-asphalt-700 rounded-lg text-white placeholder-asphalt-500 focus:border-survey-500 focus:ring-1 focus:ring-survey-500 outline-none transition-colors" placeholder="Company name" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-asphalt-300 mb-1.5">Email</label>
                    <input type="email" required className="w-full px-4 py-3 bg-asphalt-950 border border-asphalt-700 rounded-lg text-white placeholder-asphalt-500 focus:border-survey-500 focus:ring-1 focus:ring-survey-500 outline-none transition-colors" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-asphalt-300 mb-1.5">Phone</label>
                    <input type="tel" className="w-full px-4 py-3 bg-asphalt-950 border border-asphalt-700 rounded-lg text-white placeholder-asphalt-500 focus:border-survey-500 focus:ring-1 focus:ring-survey-500 outline-none transition-colors" placeholder="(312) 555-0000" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-asphalt-300 mb-1.5">Project Type</label>
                  <select className="w-full px-4 py-3 bg-asphalt-950 border border-asphalt-700 rounded-lg text-white focus:border-survey-500 focus:ring-1 focus:ring-survey-500 outline-none transition-colors">
                    <option value="">Select project type</option>
                    <option>Residential Subdivision</option>
                    <option>Commercial Building Pad</option>
                    <option>Road & Infrastructure</option>
                    <option>Industrial Yard</option>
                    <option>Utility Installation</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-asphalt-300 mb-1.5">Project Description</label>
                  <textarea rows={4} required className="w-full px-4 py-3 bg-asphalt-950 border border-asphalt-700 rounded-lg text-white placeholder-asphalt-500 focus:border-survey-500 focus:ring-1 focus:ring-survey-500 outline-none transition-colors resize-none" placeholder="Describe your project scope, location, and timeline..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-asphalt-300 mb-1.5">Estimated Project Size</label>
                  <select className="w-full px-4 py-3 bg-asphalt-950 border border-asphalt-700 rounded-lg text-white focus:border-survey-500 focus:ring-1 focus:ring-survey-500 outline-none transition-colors">
                    <option value="">Select size</option>
                    <option>Under 1 acre</option>
                    <option>1–5 acres</option>
                    <option>5–20 acres</option>
                    <option>20–100 acres</option>
                    <option>100+ acres</option>
                  </select>
                </div>
                <button type="submit" className="w-full px-8 py-3.5 bg-survey-500 hover:bg-survey-600 text-asphalt-950 font-bold rounded-lg transition-colors text-lg tracking-wide">
                  Submit Evaluation Request
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-asphalt-950 border-t border-asphalt-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-survey-500 flex items-center justify-center text-asphalt-950 font-bold font-display">TC</div>
              <span className="text-white font-bold">{siteInfo.name}</span>
            </div>
            <p className="text-sm text-asphalt-400 leading-relaxed">{siteInfo.shortTagline}</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-2 text-sm text-asphalt-400">
              {capabilities.slice(0, 5).map(c => (
                <li key={c.title}>{c.title}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-2 text-sm text-asphalt-400">
              <li>{siteInfo.address}</li>
              <li>{siteInfo.phone}</li>
              <li>{siteInfo.email}</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Licensing</h4>
            <ul className="space-y-2 text-sm text-asphalt-400">
              <li>{siteInfo.license}</li>
              <li>{siteInfo.insurance}</li>
              <li>Est. {siteInfo.founded}</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-asphalt-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-asphalt-500">© {new Date().getFullYear()} {siteInfo.name}. All rights reserved.</p>
          <p className="text-xs text-asphalt-500 font-mono">{siteInfo.license} · Fully Insured</p>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Capabilities />
        <Process />
        <EquipmentFleet />
        <ProjectTypes />
        <Safety />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
