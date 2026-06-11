import { useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  siteInfo, problems, solutions, assessmentSteps,
  systemLayers, products, faq, navLinks
} from './data'

function useScrollProgress() {
  const { scrollYProgress } = useScroll()
  return useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const width = useScrollProgress()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-sky-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white font-bold text-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-sky-900 leading-tight">{siteInfo.name}</h1>
              <p className="text-xs text-sky-500 hidden sm:block">{siteInfo.shortTagline}</p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className="text-sm text-gray-600 hover:text-sky-600 transition-colors font-medium">
                {l.label}
              </a>
            ))}
            <a href="#contact" className="px-5 py-2.5 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-semibold rounded-lg transition-all shadow-md shadow-sky-200 text-sm">
              Get Your Assessment
            </a>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-gray-500 hover:text-sky-600 p-2" aria-label="Menu">
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

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white border-t border-sky-100 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map(l => (
                <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="block text-sm text-gray-600 hover:text-sky-600 transition-colors font-medium">
                  {l.label}
                </a>
              ))}
              <a href="#contact" onClick={() => setMenuOpen(false)} className="block text-center px-5 py-3 bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold rounded-lg transition-all text-sm">
                Get Your Assessment
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div className="h-0.5 bg-gradient-to-r from-sky-400 to-sky-600 origin-left" style={{ scaleX: width }} />
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
      <h2 className={`text-3xl lg:text-4xl font-bold tracking-tight ${light ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h2>
      <div className="w-16 h-1 bg-gradient-to-r from-sky-400 to-sky-600 mx-auto mt-4 mb-4 rounded-full" />
      {subtitle && <p className={`max-w-2xl mx-auto text-base ${light ? 'text-sky-100' : 'text-gray-500'}`}>{subtitle}</p>}
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
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${siteInfo.heroImage})` }} />
      <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/60 to-sky-50/70" />
      <div className="absolute inset-0 opacity-[0.05]">
        <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-sky-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl" />
      </div>
      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-40 h-40 border border-sky-200/40 rounded-full" />
      <div className="absolute bottom-20 left-10 w-32 h-32 border border-sky-200/30 rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50 border border-sky-100 mb-6">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              <span className="text-sm text-sky-700 font-medium">{siteInfo.homesServiced}+ Homes Serviced · {siteInfo.satisfaction} Satisfaction</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-none mb-6">
              {siteInfo.tagline}
              <span className="block text-sky-600 text-3xl lg:text-4xl mt-2 font-light">Air Quality Assessments · Purification · Healthy Home Systems</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-xl">
              Since {new Date().getFullYear() - siteInfo.yearsExperience}, we've helped over <strong className="text-gray-900">{siteInfo.homesServiced}</strong> homeowners 
              breathe cleaner air. Our <strong className="text-gray-900">{siteInfo.certifiedTechnicians}</strong> certified technicians deliver customized IAQ solutions 
              for every home and budget.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="px-8 py-3.5 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-semibold rounded-lg transition-all shadow-lg shadow-sky-200">
                Schedule Free Assessment
              </a>
              <a href="#problems" className="px-8 py-3.5 border border-gray-300 hover:border-sky-400 text-gray-700 hover:text-sky-600 rounded-lg transition-colors font-medium">
                Common Problems
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="bg-white/80 backdrop-blur-sm border border-sky-100 rounded-2xl p-8 shadow-air">
              <div className="grid grid-cols-2 gap-6 mb-6">
                {[
                  { label: 'Homes Serviced', value: siteInfo.homesServiced, suffix: '+' },
                  { label: 'Years Experience', value: siteInfo.yearsExperience, suffix: '' },
                  { label: 'Certified Techs', value: siteInfo.certifiedTechnicians, suffix: '' },
                  { label: 'Satisfaction', value: siteInfo.satisfaction, suffix: '' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="text-center"
                  >
                    <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-sky-600">{stat.value}{stat.suffix}</p>
                  </motion.div>
                ))}
              </div>
              <div className="pt-4 border-t border-sky-100">
                <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    NATE Certified
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    EPA 608 Certified
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Insured & Bonded
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex justify-center mt-16"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-sky-400"
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

function Problems() {
  return (
    <section id="problems" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Problems We Solve"
          subtitle="Indoor air quality issues affect your health, comfort, and home. We identify and fix the root cause."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <FadeInUp key={p.title} delay={i * 0.08}>
              <div className="group p-6 rounded-xl border border-gray-200 hover:border-sky-300 bg-white hover:bg-sky-50/50 transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-full bg-sky-50 flex items-center justify-center text-2xl mb-4 group-hover:bg-sky-100 transition-colors">
                  {p.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{p.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{p.description}</p>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function Solutions() {
  return (
    <section id="solutions" className="py-24 bg-gradient-air">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Our Solutions"
          subtitle="Proven products and installations that address every aspect of indoor air quality."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((s, i) => (
            <FadeInUp key={s.title} delay={i * 0.08}>
              <div className="bg-white rounded-xl border border-sky-100 p-6 hover:border-sky-300 hover:shadow-air transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-sky-100 to-sky-50 flex items-center justify-center text-2xl mb-4">
                  {s.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.description}</p>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function Assessment() {
  return (
    <section id="assessment" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Air Quality Assessment"
          subtitle="A thorough 4-step process that leaves no stone unturned — or particle unfiltered."
        />
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky-300 to-sky-100 hidden lg:block" />

          <div className="space-y-8 lg:space-y-0 relative">
            {assessmentSteps.map((step, i) => (
              <FadeInUp key={step.title} delay={i * 0.1}>
                <div className="lg:grid lg:grid-cols-5 gap-8 items-start relative">
                  <div className="lg:col-span-1 flex lg:block items-center gap-4 mb-4 lg:mb-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 relative z-10 shadow-md shadow-sky-200">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 lg:hidden">{step.title}</h3>
                      <p className="text-xs text-sky-500 font-medium uppercase tracking-wider hidden lg:block">Step {step.step}</p>
                    </div>
                  </div>

                  <div className="lg:col-span-4 bg-white rounded-xl border border-sky-100 p-6 ml-4 lg:ml-0 hover:border-sky-200 transition-colors">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 hidden lg:block">{step.title}</h3>
                    <p className="text-gray-600 mb-3">{step.description}</p>
                    <p className="text-sm text-sky-600 flex items-start gap-2">
                      <svg className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {step.details}
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

function HealthyHomeSystem() {
  return (
    <section id="system" className="py-24 bg-sky-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="The Healthy Home System"
          subtitle="Four layers of protection working together to deliver clean, comfortable air throughout your home."
          light
        />

        <div className="grid lg:grid-cols-4 gap-6">
          {systemLayers.map((layer, i) => (
            <FadeInUp key={layer.name} delay={i * 0.1}>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-colors h-full">
                <div className="w-12 h-12 rounded-full bg-sky-400/20 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-sky-300">{layer.name.charAt(0)}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{layer.name}</h3>
                <p className="text-sm text-sky-200 mb-4">{layer.description}</p>
                <ul className="space-y-2">
                  {layer.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-sky-200">
                      <svg className="w-3.5 h-3.5 text-sky-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function Products() {
  const [selected, setSelected] = useState(products[0].name)

  const product = products.find(p => p.name === selected)!

  return (
    <section id="products" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Products"
          subtitle="Premium air quality products designed to integrate seamlessly with your existing HVAC system."
        />

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-3">
            {products.map((p, i) => (
              <FadeInUp key={p.name} delay={i * 0.08}>
                <button
                  onClick={() => setSelected(p.name)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selected === p.name
                      ? 'border-sky-400 bg-sky-50 shadow-sm'
                      : 'border-gray-200 hover:border-sky-200 bg-white'
                  }`}
                >
                  <span className="text-xs text-sky-500 font-medium uppercase tracking-wider">{p.category}</span>
                  <h3 className="font-bold text-gray-900 text-sm mt-1">{p.name}</h3>
                </button>
              </FadeInUp>
            ))}
          </div>

          <div className="lg:col-span-3">
            <FadeInUp key={product.name}>
              <div className="bg-gradient-air rounded-2xl border border-sky-100 p-8 shadow-air">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs text-sky-500 font-medium uppercase tracking-wider">{product.category}</span>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{product.name}</h3>
                  </div>
                  <span className="text-sm text-sky-600 bg-sky-50 px-3 py-1 rounded-full font-medium whitespace-nowrap">
                    {product.coverage}
                  </span>
                </div>
                <p className="text-gray-600 mb-6">{product.description}</p>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Key Features</h4>
                  <ul className="space-y-2">
                    {product.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-sky-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <section id="faq" className="py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Answers to common questions about indoor air quality products and services."
        />

        <div className="space-y-3">
          {faq.map((item, i) => (
            <FadeInUp key={item.question} delay={i * 0.05}>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setOpen(open === item.question ? null : item.question)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 text-sm pr-4">{item.question}</span>
                  <svg
                    className={`w-5 h-5 text-sky-500 flex-shrink-0 transition-transform ${open === item.question ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <AnimatePresence>
                  {open === item.question && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeInUp>
          ))}
        </div>
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
    <section id="contact" className="py-24 bg-gradient-air">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-6">
              Breathe cleaner air starting today
              <span className="block text-sky-600 text-2xl mt-2 font-normal">Schedule your free assessment</span>
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Fill out the form and we'll contact you within 24 hours to schedule your in-home air quality assessment. 
              No obligation — just a thorough evaluation of your indoor air and a clear recommendation.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <svg className="w-5 h-5 text-sky-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {siteInfo.phone}
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <svg className="w-5 h-5 text-sky-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {siteInfo.email}
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <svg className="w-5 h-5 text-sky-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {siteInfo.address}
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
              <div className="bg-white border border-sky-200 rounded-2xl p-8 text-center shadow-air">
                <div className="w-16 h-16 rounded-full bg-sky-50 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Assessment Scheduled</h3>
                <p className="text-gray-500">We'll contact you within 24 hours to confirm your in-home appointment time.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white border border-sky-100 rounded-2xl p-8 space-y-5 shadow-air">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                    <input type="text" required className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-colors" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                    <input type="tel" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-colors" placeholder="(773) 555-0000" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                  <input type="email" required className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-colors" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Home Address</label>
                  <input type="text" required className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-colors" placeholder="Street, City, Zip" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Primary Concern</label>
                  <select className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-colors">
                    <option value="">Select concern</option>
                    <option>Excess dust / allergies</option>
                    <option>Humidity too high / low</option>
                    <option>Mold or mildew</option>
                    <option>Persistent odors</option>
                    <option>Poor ventilation / stuffy air</option>
                    <option>General air quality assessment</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Additional Details</label>
                  <textarea rows={3} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-colors resize-none" placeholder="Home size, any health concerns, specific rooms with issues..." />
                </div>
                <button type="submit" className="w-full px-8 py-3.5 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-semibold rounded-lg transition-all shadow-lg shadow-sky-200">
                  Schedule Free Assessment
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
    <footer className="bg-sky-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
              </div>
              <span className="text-white font-bold">{siteInfo.name}</span>
            </div>
            <p className="text-sm text-sky-200 leading-relaxed">{siteInfo.shortTagline}</p>
          </div>
          <div>
            <h4 className="text-sky-200 font-semibold mb-3 text-sm uppercase tracking-wider">Solutions</h4>
            <ul className="space-y-2 text-sm text-sky-200">
              {solutions.slice(0, 5).map(s => (
                <li key={s.title}>{s.title}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sky-200 font-semibold mb-3 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-2 text-sm text-sky-200">
              <li>{siteInfo.address}</li>
              <li>{siteInfo.phone}</li>
              <li>{siteInfo.email}</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sky-200 font-semibold mb-3 text-sm uppercase tracking-wider">Certifications</h4>
            <ul className="space-y-2 text-sm text-sky-200">
              <li>NATE Certified Technicians</li>
              <li>EPA Section 608 Certified</li>
              <li>Licensed & Insured</li>
              <li>{siteInfo.yearsExperience} Years Serving Chicago</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-sky-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-sky-300">© {new Date().getFullYear()} {siteInfo.name}. All rights reserved.</p>
          <p className="text-xs text-sky-300">NATE Certified · EPA Certified · Fully Insured</p>
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
        <Problems />
        <Solutions />
        <Assessment />
        <HealthyHomeSystem />
        <Products />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
