import { motion } from 'framer-motion';
import { careServices, whoWeHelp, careMatchingSteps, trustBadges, familyUpdates, testimonials } from './data';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

// Inline SVG Icons
const icons: Record<string, React.ReactNode> = {
  nursing: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M4.8 2.3A.3.3 0 105 2H4a2 2 0 00-2 2v5a6 6 0 006 6 6 6 0 006-6V4a2 2 0 00-2-2h-1a.2.2 0 10.3.3" />
      <path d="M8 15v1a6 6 0 006 6 6 6 0 006-6v-4" />
      <circle cx="20" cy="10" r="2" />
    </svg>
  ),
  personal: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  ),
  medication: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 15h3m-6-3h6m-6-3h6" />
    </svg>
  ),
  surgery: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M12 8v4m0 0v4m0-4h4m-4 0H8" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  ),
  companion: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  chronic: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  clipboard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  home: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9,22 9,12 15,12 15,22" />
    </svg>
  ),
  leaf: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75" />
    </svg>
  ),
  quote: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 opacity-30">
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12,5 19,12 12,19" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12,6 12,12 16,14" />
    </svg>
  ),
};

const trustIcons = [icons.shield, icons.check, icons.clipboard, icons.lock];

const whoWeHelpIcons = [icons.home, icons.heart, icons.users, icons.leaf];

export default function App() {
  return (
    <div className="min-h-screen bg-[#FFF9F2] text-[#5C4033] font-sans antialiased">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FFF9F2]/90 backdrop-blur-md border-b border-[#7BA88F]/10">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[#7BA88F] flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-5 h-5">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
            </div>
            <span className="text-xl font-semibold text-[#5C4033] tracking-tight">CareBridge</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-[#5C4033]/70">
            <a href="#services" className="hover:text-[#7BA88F] transition-colors">Services</a>
            <a href="#process" className="hover:text-[#7BA88F] transition-colors">Our Process</a>
            <a href="#trust" className="hover:text-[#7BA88F] transition-colors">Trust & Safety</a>
            <a href="#updates" className="hover:text-[#7BA88F] transition-colors">Family Portal</a>
          </div>
          <a href="tel:+18005551234" className="flex items-center gap-2 bg-[#7BA88F] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#5C8A72] transition-colors">
            {icons.phone}
            <span className="hidden sm:inline">Call Us</span>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
        {/* Warm background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFF9F2] via-[#FFF9F2] to-[#7BA88F]/8" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#7BA88F]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#5C8A72]/5 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-5">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-[#7BA88F]/20 rounded-full px-4 py-2 text-sm text-[#5C8A72]">
                <span className="w-2 h-2 rounded-full bg-[#7BA88F] animate-pulse" />
                Accepting new patients in your area
              </motion.div>

              <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight text-[#5C4033]">
                Care that comes
                <br />
                <span className="text-[#7BA88F] italic">to you.</span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-lg text-[#5C4033]/70 leading-relaxed max-w-lg">
                Professional home healthcare delivered with warmth, dignity, and the kind of attention that feels like family. Because healing happens best where you feel most at home.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                <a href="tel:+18005551234" className="inline-flex items-center justify-center gap-2 bg-[#7BA88F] text-white px-7 py-4 rounded-full font-medium text-lg hover:bg-[#5C8A72] transition-all hover:shadow-lg hover:shadow-[#7BA88F]/20">
                  {icons.phone}
                  (800) 555-1234
                </a>
                <a href="#process" className="inline-flex items-center justify-center gap-2 border-2 border-[#7BA88F]/30 text-[#5C4033] px-7 py-4 rounded-full font-medium hover:border-[#7BA88F] hover:bg-[#7BA88F]/5 transition-all">
                  {icons.calendar}
                  Schedule Free Assessment
                </a>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#FFF9F2] bg-gradient-to-br from-[#7BA88F] to-[#5C8A72] flex items-center justify-center text-white text-xs font-medium">
                      {['JR', 'ML', 'AK', 'SP'][i - 1]}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-[#5C4033]/60">
                  <span className="font-semibold text-[#5C4033]">500+ families</span> trust us with their loved ones
                </div>
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#5C4033]/10">
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700&q=85"
                  alt="Compassionate caregiver with patient"
                  className="w-full h-[420px] md:h-[520px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#5C4033]/20 to-transparent" />
              </div>

              {/* Floating trust badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute -bottom-6 -left-4 md:-left-8 bg-white rounded-2xl p-4 shadow-xl shadow-[#5C4033]/10 border border-[#7BA88F]/10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#7BA88F]/10 flex items-center justify-center text-[#7BA88F]">
                    {icons.shield}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#5C4033]">Licensed & Insured</div>
                    <div className="text-xs text-[#5C4033]/50">State-certified caregivers</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating rating */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="absolute -top-4 -right-4 md:-right-6 bg-white rounded-2xl px-4 py-3 shadow-xl shadow-[#5C4033]/10 border border-[#7BA88F]/10"
              >
                <div className="flex items-center gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} viewBox="0 0 20 20" fill="#7BA88F" className="w-4 h-4">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <div className="text-xs text-[#5C4033]/60">4.9 from 200+ reviews</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-28 bg-white/50">
        <div className="max-w-6xl mx-auto px-5">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.p variants={fadeInUp} className="text-[#7BA88F] font-medium mb-3 tracking-wide uppercase text-sm">What We Provide</motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-serif text-[#5C4033] mb-4">
              Care tailored to your story
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-[#5C4033]/60 max-w-2xl mx-auto leading-relaxed">
              Every person's needs are different. Our services are designed to meet you exactly where you are — with skill, warmth, and unwavering respect.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {careServices.map((service, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="group bg-white rounded-2xl overflow-hidden border border-[#7BA88F]/10 hover:border-[#7BA88F]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#7BA88F]/5"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#5C4033]/30 to-transparent" />
                  <div className="absolute bottom-3 left-3 w-10 h-10 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#7BA88F]">
                    {icons[service.icon]}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[#5C4033] mb-2">{service.name}</h3>
                  <p className="text-sm text-[#5C4033]/60 leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Who We Help */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-5">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.p variants={fadeInUp} className="text-[#7BA88F] font-medium mb-3 tracking-wide uppercase text-sm">Who We Serve</motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-serif text-[#5C4033] mb-4">
              Here for every chapter of care
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {whoWeHelp.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="bg-gradient-to-br from-white to-[#7BA88F]/5 rounded-2xl p-6 border border-[#7BA88F]/10 hover:border-[#7BA88F]/25 transition-all duration-300 text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#7BA88F]/10 flex items-center justify-center text-[#7BA88F]">
                  {whoWeHelpIcons[i]}
                </div>
                <h3 className="font-semibold text-[#5C4033] mb-2">{item.group}</h3>
                <p className="text-sm text-[#5C4033]/60 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Care Process */}
      <section id="process" className="py-20 md:py-28 bg-gradient-to-br from-[#7BA88F]/5 to-[#5C8A72]/5">
        <div className="max-w-6xl mx-auto px-5">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.p variants={fadeInUp} className="text-[#7BA88F] font-medium mb-3 tracking-wide uppercase text-sm">How It Works</motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-serif text-[#5C4033] mb-4">
              Your journey with us
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-[#5C4033]/60 max-w-xl mx-auto">
              From first call to ongoing care — here's what to expect. Simple, transparent, and always centered on you.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="relative"
          >
            {/* Timeline line */}
            <div className="hidden lg:block absolute top-16 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-[#7BA88F]/20 via-[#7BA88F]/40 to-[#7BA88F]/20" />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {careMatchingSteps.map((step, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="relative text-center"
                >
                  {/* Step number circle */}
                  <div className="relative mx-auto mb-6 w-16 h-16 rounded-full bg-white border-2 border-[#7BA88F] flex items-center justify-center shadow-lg shadow-[#7BA88F]/10">
                    <span className="text-xl font-bold text-[#7BA88F]">{i + 1}</span>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-[#7BA88F]/10 shadow-sm">
                    <h3 className="font-semibold text-[#5C4033] mb-2">{step.step}</h3>
                    <p className="text-sm text-[#5C4033]/60 leading-relaxed mb-3">{step.description}</p>
                    <div className="inline-flex items-center gap-1.5 text-xs text-[#5C8A72] bg-[#7BA88F]/10 rounded-full px-3 py-1">
                      {icons.clock}
                      {step.duration}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section id="trust" className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-5">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.p variants={fadeInUp} className="text-[#7BA88F] font-medium mb-3 tracking-wide uppercase text-sm">Trust & Safety</motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-serif text-[#5C4033] mb-4">
              Your peace of mind, built in
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-[#5C4033]/60 max-w-xl mx-auto">
              We hold ourselves to the highest standards so you never have to worry.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {trustBadges.map((badge, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="bg-white rounded-2xl p-6 border border-[#7BA88F]/10 text-center hover:shadow-lg hover:shadow-[#7BA88F]/5 transition-all duration-300"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-[#7BA88F]/10 flex items-center justify-center text-[#7BA88F]">
                  {trustIcons[i]}
                </div>
                <h3 className="font-semibold text-[#5C4033] mb-2">{badge.title}</h3>
                <p className="text-sm text-[#5C4033]/60 leading-relaxed">{badge.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Family Portal / Updates */}
      <section id="updates" className="py-20 md:py-28 bg-white/50">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={staggerContainer}
              className="space-y-6"
            >
              <motion.p variants={fadeInUp} className="text-[#7BA88F] font-medium tracking-wide uppercase text-sm">Family Portal</motion.p>
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-serif text-[#5C4033]">
                Stay connected to your loved one's care
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-[#5C4033]/60 leading-relaxed">
                Our secure family portal gives you real-time updates from your care team — vitals, activities, mood, and progress notes. Because being involved shouldn't mean being in the room.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 bg-[#7BA88F]/10 text-[#5C8A72] text-sm rounded-full px-3 py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7BA88F] animate-pulse" />
                  Live updates
                </span>
                <span className="inline-flex items-center gap-1.5 bg-[#7BA88F]/10 text-[#5C8A72] text-sm rounded-full px-3 py-1.5">HIPAA Secure</span>
                <span className="inline-flex items-center gap-1.5 bg-[#7BA88F]/10 text-[#5C8A72] text-sm rounded-full px-3 py-1.5">24/7 access</span>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={staggerContainer}
              className="space-y-4"
            >
              {familyUpdates.map((update, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="bg-white rounded-2xl p-5 border border-[#7BA88F]/10 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[#5C4033]">{update.author}</span>
                    <span className="text-xs text-[#5C4033]/40">{update.date}</span>
                  </div>
                  <p className="text-sm text-[#5C4033]/70 leading-relaxed">{update.content}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-5">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.p variants={fadeInUp} className="text-[#7BA88F] font-medium mb-3 tracking-wide uppercase text-sm">Voices of Care</motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-serif text-[#5C4033]">
              Stories from our care family
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 gap-6"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="bg-gradient-to-br from-white to-[#7BA88F]/5 rounded-2xl p-7 border border-[#7BA88F]/10 relative"
              >
                <div className="text-[#7BA88F] mb-4">{icons.quote}</div>
                <p className="text-[#5C4033]/80 leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#7BA88F]/15 flex items-center justify-center text-[#7BA88F] text-sm font-semibold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#5C4033]">{t.name}</div>
                    <div className="text-xs text-[#5C4033]/50">{t.relationship}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-5">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="relative bg-gradient-to-br from-[#7BA88F] to-[#5C8A72] rounded-3xl p-10 md:p-16 text-center overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-serif text-white mb-4">
                Let's talk about your care needs
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-white/80 max-w-xl mx-auto mb-8 leading-relaxed">
                No pressure, no obligations. Just a warm conversation about how we can help your family feel supported and secure.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:+18005551234" className="inline-flex items-center justify-center gap-2 bg-white text-[#5C8A72] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#FFF9F2] transition-all hover:shadow-xl">
                  {icons.phone}
                  (800) 555-1234
                </a>
                <a href="#" className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all">
                  {icons.calendar}
                  Schedule Assessment
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#5C4033] text-white/70 py-16">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#7BA88F] flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-4 h-4">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                </div>
                <span className="text-lg font-semibold text-white">CareBridge</span>
              </div>
              <p className="text-sm leading-relaxed">
                Home healthcare delivered with heart. Serving families with compassion, skill, and unwavering dedication.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                {careServices.slice(0, 4).map((s, i) => (
                  <li key={i}><a href="#services" className="hover:text-[#7BA88F] transition-colors">{s.name}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-[#7BA88F] transition-colors">About Us</a></li>
                <li><a href="#process" className="hover:text-[#7BA88F] transition-colors">Our Process</a></li>
                <li><a href="#trust" className="hover:text-[#7BA88F] transition-colors">Trust & Safety</a></li>
                <li><a href="#" className="hover:text-[#7BA88F] transition-colors">Careers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">{icons.phone} (800) 555-1234</li>
                <li>Available 24/7 for care inquiries</li>
                <li className="pt-2">
                  <a href="tel:+18005551234" className="inline-flex items-center gap-1.5 bg-[#7BA88F] text-white text-sm px-4 py-2 rounded-full hover:bg-[#5C8A72] transition-colors">
                    Call Now {icons.arrow}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
            <p>© 2024 CareBridge Home Healthcare. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#7BA88F] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#7BA88F] transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-[#7BA88F] transition-colors">HIPAA Notice</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
