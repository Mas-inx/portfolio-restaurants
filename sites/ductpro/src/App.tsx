import { useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  siteInfo, services, industries, programSteps,
  reportMetrics, complianceItems, responseTiers, navLinks
} from './data'

function useScrollProgress() {
  const { scrollYProgress } = useScroll()
  return useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const width = useScrollProgress()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg font-sans">DP</div>
            <div>
              <h1 className="text-lg font-bold text-graphite-900 leading-tight">{siteInfo.name}</h1>
              <p className="text-xs text-graphite-400 hidden sm:block">{siteInfo.shortTagline}</p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className="text-sm text-graphite-500 hover:text-blue-600 transition-colors font-medium">
                {l.label}
              </a>
            ))}
            <a href="#contact" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-sm">
              Request Service
            </a>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-graphite-500 hover:text-graphite-800 p-2" aria-label="Menu">
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
            className="bg-white border-t border-gray-200 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map(l => (
                <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="block text-sm text-graphite-500 hover:text-blue-600 transition-colors font-medium">
                  {l.label}
                </a>
              ))}
              <a href="#contact" onClick={() => setMenuOpen(false)} className="block text-center px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-sm">
                Request Service
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div className="h-0.5 bg-blue-600 origin-left" style={{ scaleX: width }} />
    </nav>
  )
}

function SectionHeading({ title, subtitle, dark }: { title: string; subtitle?: string; dark?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      className="text-center mb-16"
    >
      <h2 className={`text-3xl lg:text-4xl font-bold tracking-tight ${dark ? 'text-white' : 'text-graphite-900'}`}>
        {title}
      </h2>
      <div className="w-12 h-1 bg-blue-600 mx-auto mt-4 mb-4" />
      {subtitle && <p className={`max-w-2xl mx-auto text-base ${dark ? 'text-gray-300' : 'text-graphite-500'}`}>{subtitle}</p>}
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
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${siteInfo.heroImage})` }} />
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/80 via-white/70 to-blue-50/80" />
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-sm text-blue-700 font-medium">{siteInfo.yearsExperience} Years · {siteInfo.technicians} Techs · {siteInfo.contractsManaged}+ Contracts</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-graphite-900 leading-none mb-6">
              {siteInfo.tagline}
              <span className="block text-blue-600 text-3xl lg:text-4xl mt-2 font-normal">Preventive HVAC · Refrigeration · Ventilation</span>
            </h1>
            <p className="text-lg text-graphite-500 leading-relaxed mb-8 max-w-xl">
              {siteInfo.contractsManaged}+ commercial HVAC contracts managed across Chicago metro. 
              Average response time: <strong className="text-graphite-900">{siteInfo.responseTimeAvg}</strong>.
              {siteInfo.emergencyAvailable && ' Emergency service available 24/7.'}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-blue-200">
                Request Service
              </a>
              <a href="#services" className="px-8 py-3.5 border border-gray-300 hover:border-blue-400 text-graphite-700 hover:text-blue-600 rounded-lg transition-colors font-medium">
                Our Services
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg shadow-gray-100">
              <div className="space-y-6">
                {[
                  { label: 'Years Experience', value: `${siteInfo.yearsExperience}` },
                  { label: 'Certified Technicians', value: siteInfo.technicians },
                  { label: 'Contracts Managed', value: siteInfo.contractsManaged },
                  { label: 'Avg Response Time', value: siteInfo.responseTimeAvg },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                  >
                    <span className="text-gray-500 text-sm">{stat.label}</span>
                    <span className="text-2xl font-bold text-blue-600">{stat.value}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Licensed · Insured · EPA Section 608 Certified
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
            className="text-blue-400"
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

function Services() {
  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Commercial Services"
          subtitle="Full-spectrum HVAC maintenance, repair, and installation for commercial properties of every size."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <FadeInUp key={s.title} delay={i * 0.08}>
              <div className="bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-2xl mb-4 group-hover:bg-blue-100 transition-colors">
                  {s.icon}
                </div>
                <h3 className="text-lg font-bold text-graphite-900 mb-2">{s.title}</h3>
                <p className="text-sm text-graphite-500 leading-relaxed">{s.description}</p>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function Industries() {
  return (
    <section id="industries" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Industries We Serve"
          subtitle="Every commercial space has unique HVAC needs. We tailor our programs accordingly."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {industries.map((ind, i) => (
            <FadeInUp key={ind.name} delay={i * 0.08}>
              <div className="text-center p-6 rounded-xl border border-gray-200 hover:border-blue-300 bg-white hover:bg-blue-50/50 transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-3xl mx-auto mb-4">
                  {ind.icon}
                </div>
                <h3 className="font-bold text-graphite-900 mb-2">{ind.name}</h3>
                <p className="text-xs text-graphite-500 leading-relaxed">{ind.description}</p>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function Program() {
  return (
    <section id="program" className="py-24 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Maintenance Program"
          subtitle="Structured quarterly programs that extend equipment life and prevent costly breakdowns."
          dark
        />
        <div className="grid sm:grid-cols-2 gap-6">
          {programSteps.map((step, i) => (
            <FadeInUp key={step.title} delay={i * 0.1}>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-white">{step.title}</h3>
                </div>
                <p className="text-blue-100 text-sm mb-3">{step.description}</p>
                <p className="text-blue-200 text-xs leading-relaxed">{step.details}</p>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function Reporting() {
  return (
    <section id="reporting" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Service Reporting"
          subtitle="Real-time dashboards and detailed reports keep you informed about your equipment status."
        />
        <div className="dashboard-grid mb-8">
          {reportMetrics.map((m, i) => (
            <FadeInUp key={m.label} delay={i * 0.08}>
              <div className="bg-white rounded-xl border border-gray-200 p-5 hover:border-blue-300 transition-colors">
                <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-medium">{m.label}</p>
                <p className="text-3xl font-bold text-graphite-900 mb-1">{m.value}</p>
                <p className={`text-xs ${m.positive ? 'text-green-600' : 'text-red-500'}`}>{m.change}</p>
              </div>
            </FadeInUp>
          ))}
        </div>

        <FadeInUp>
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <h3 className="text-xl font-bold text-graphite-900 mb-4">Sample Service Report Includes:</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                'Equipment condition photos',
                'Refrigerant pressures & temps',
                'Filter condition & MERV rating',
                'Electrical amp draw readings',
                'Coil cleanliness assessment',
                'Safety control verification',
                'Recommended repairs list',
                'Seasonal readiness notes',
                'Priority rating for each item',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-graphite-600">
                  <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}

function Compliance() {
  return (
    <section id="compliance" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Compliance & Documentation"
          subtitle="We maintain complete compliance records for audits, health inspections, and insurance requirements."
        />
        <div className="grid sm:grid-cols-2 gap-6">
          {complianceItems.map((c, i) => (
            <FadeInUp key={c.title} delay={i * 0.1}>
              <div className="flex gap-4 p-6 rounded-xl bg-gray-50 border border-gray-200 hover:border-blue-300 transition-colors">
                <div className="w-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-graphite-900 text-lg mb-2">{c.title}</h3>
                  <p className="text-graphite-500 text-sm leading-relaxed">{c.description}</p>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function ResponsePlans() {
  return (
    <section id="response" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Response Plans"
          subtitle="Choose the service tier that matches your operational needs and budget."
        />
        <div className="grid sm:grid-cols-3 gap-6">
          {responseTiers.map((tier, i) => (
            <FadeInUp key={tier.tier} delay={i * 0.1}>
              <div className={`rounded-xl border p-6 ${
                tier.tier === 'Tier 1'
                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-200'
                  : 'bg-white border-gray-200 text-graphite-900'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-bold uppercase tracking-wider ${
                    tier.tier === 'Tier 1' ? 'text-blue-200' : 'text-blue-500'
                  }`}>
                    {tier.tier}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    tier.tier === 'Tier 1'
                      ? 'bg-white/20 text-white'
                      : 'bg-blue-50 text-blue-600'
                  }`}>
                    {tier.responseTime}
                  </span>
                </div>
                <h3 className={`text-xl font-bold mb-2 ${tier.tier === 'Tier 1' ? 'text-white' : 'text-graphite-900'}`}>
                  {tier.label}
                </h3>
                <p className={`text-sm mb-4 ${
                  tier.tier === 'Tier 1' ? 'text-blue-100' : 'text-graphite-500'
                }`}>
                  {tier.description}
                </p>
                <a
                  href="#contact"
                  className={`block text-center py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    tier.tier === 'Tier 1'
                      ? 'bg-white text-blue-600 hover:bg-blue-50'
                      : 'bg-gray-100 text-graphite-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  {tier.tier === 'Tier 1' ? 'Enroll Now' : 'Learn More'}
                </a>
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
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-graphite-900 leading-tight mb-6">
              Let's talk about your commercial HVAC needs
              <span className="block text-blue-600 text-2xl mt-2 font-normal">Request a consultation</span>
            </h2>
            <p className="text-graphite-500 mb-8 leading-relaxed">
              Fill out the form and a service specialist will contact you within one business day 
              to discuss your commercial HVAC maintenance requirements.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-graphate-600">
                <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {siteInfo.phone}
              </div>
              <div className="flex items-center gap-3 text-graphite-600">
                <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {siteInfo.email}
              </div>
              <div className="flex items-center gap-3 text-graphite-600">
                <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Service Request Submitted</h3>
                <p className="text-gray-500">A service specialist will contact you within one business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-gray-50 border border-gray-200 rounded-2xl p-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                    <input type="text" required className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Company</label>
                    <input type="text" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors" placeholder="Company name" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                    <input type="email" required className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                    <input type="tel" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors" placeholder="(312) 555-0000" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Service Interest</label>
                  <select className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors">
                    <option value="">Select service</option>
                    <option>Preventive Maintenance Program</option>
                    <option>Emergency Repair</option>
                    <option>Filter Replacement Program</option>
                    <option>RTU Installation / Replacement</option>
                    <option>Refrigeration Service</option>
                    <option>Ventilation / Exhaust</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Number of Units / Facility Size</label>
                  <input type="text" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors" placeholder="e.g., 12 RTUs, 45,000 sq ft" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                  <textarea rows={4} required className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors resize-none" placeholder="Describe your HVAC needs, current issues, and preferred schedule..." />
                </div>
                <button type="submit" className="w-full px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-blue-200">
                  Submit Service Request
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
    <footer className="bg-graphite-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold">DP</div>
              <span className="text-white font-bold">{siteInfo.name}</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">{siteInfo.shortTagline}</p>
          </div>
          <div>
            <h4 className="text-gray-300 font-semibold mb-3 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {services.slice(0, 5).map(s => (
                <li key={s.title}>{s.title}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-gray-300 font-semibold mb-3 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>{siteInfo.address}</li>
              <li>{siteInfo.phone}</li>
              <li>{siteInfo.email}</li>
              {siteInfo.emergencyAvailable && (
                <li className="text-green-400 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full" />
                  24/7 Emergency Service
                </li>
              )}
            </ul>
          </div>
          <div>
            <h4 className="text-gray-300 font-semibold mb-3 text-sm uppercase tracking-wider">Industries</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {industries.map(ind => (
                <li key={ind.name}>{ind.name}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} {siteInfo.name}. All rights reserved.</p>
          <p className="text-xs text-gray-500">EPA Certified · Licensed · Insured</p>
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
        <Services />
        <Industries />
        <Program />
        <Reporting />
        <Compliance />
        <ResponsePlans />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
