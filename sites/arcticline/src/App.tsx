import { motion } from 'framer-motion';
import { services, maintenancePlans, replacementSteps, whyChooseUs, serviceAreas, heroImage } from './data';

// Custom SVG Icons
const icons = {
  snowflake: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  wind: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  thermometer: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  wrench: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12,6 12,12 16,14" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <polyline points="20,6 9,17 4,12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  home: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="9,22 9,12 15,12 15,22" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="22,6 12,13 2,6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  mapPin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
};

const iconMap: Record<string, JSX.Element> = {
  snowflake: icons.snowflake,
  wind: icons.wind,
  thermometer: icons.thermometer,
  wrench: icons.wrench,
  shield: icons.shield,
  clock: icons.clock,
  home: icons.home,
  award: icons.award,
  heart: icons.heart,
  users: icons.users,
};

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

function App() {
  return (
    <div className="min-h-screen bg-[#FAFCFD] text-[#1B3A4B]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="ArcticLine HVAC"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1B3A4B]/80 via-[#1B3A4B]/60 to-[#2A9D8F]/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center text-white"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-light mb-6 tracking-tight"
            >
              ArcticLine
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl font-light mb-12 text-[#E8F4F8]"
            >
              Precision comfort for your home
            </motion.p>

            {/* Floating Service Cards */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16"
            >
              {services.slice(0, 3).map((service, index) => (
                <motion.div
                  key={service.id}
                  variants={fadeInUp}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300"
                >
                  <div className="text-[#2A9D8F] mb-4 flex justify-center">
                    {iconMap[service.icon] || icons.snowflake}
                  </div>
                  <h3 className="text-lg font-medium mb-2">{service.title}</h3>
                  <p className="text-sm text-[#E8F4F8]/80">{service.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-[#E8F4F8]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-4">Our Services</h2>
            <p className="text-lg text-[#1B3A4B]/70 max-w-2xl mx-auto">
              Complete climate solutions for every season
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={fadeInUp}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-[#E8F4F8]"
              >
                <div className="text-[#2A9D8F] mb-6">{iconMap[service.icon] || icons.snowflake}</div>
                <h3 className="text-xl font-medium mb-3">{service.title}</h3>
                <p className="text-[#1B3A4B]/70 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-4">Why Choose ArcticLine</h2>
            <p className="text-lg text-[#1B3A4B]/70 max-w-2xl mx-auto">
              Trusted by homeowners for reliable comfort
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8"
          >
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#E8F4F8] rounded-full text-[#2A9D8F] mb-4">
                  {iconMap[item.icon] || icons.shield}
                </div>
                <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                <p className="text-sm text-[#1B3A4B]/70">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Maintenance Plans */}
      <section className="py-24 bg-[#E8F4F8]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-4">Maintenance Plans</h2>
            <p className="text-lg text-[#1B3A4B]/70 max-w-2xl mx-auto">
              Keep your system running at peak performance
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {maintenancePlans.map((plan, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`relative bg-white rounded-2xl p-8 shadow-sm transition-all duration-300 ${
                  plan.popular
                    ? 'border-2 border-[#2A9D8F] shadow-xl scale-105'
                    : 'border border-[#E8F4F8] hover:shadow-lg'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#2A9D8F] text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-medium mb-2">{plan.tier}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-light">${plan.price}</span>
                  <span className="text-[#1B3A4B]/70">/{plan.per}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <span className="text-[#2A9D8F] mt-0.5 flex-shrink-0">{icons.check}</span>
                      <span className="text-sm text-[#1B3A4B]/80">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${
                    plan.popular
                      ? 'bg-[#2A9D8F] text-white hover:bg-[#2A9D8F]/90'
                      : 'bg-[#E8F4F8] text-[#1B3A4B] hover:bg-[#E8F4F8]/80'
                  }`}
                >
                  Get Started
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Replacement Process */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-4">Replacement Process</h2>
            <p className="text-lg text-[#1B3A4B]/70 max-w-2xl mx-auto">
              Simple, transparent steps to your new system
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="relative"
          >
            {/* Connection Line */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-[#E8F4F8]" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {replacementSteps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="relative text-center"
                >
                  <div className="relative z-10 inline-flex items-center justify-center w-24 h-24 bg-[#E8F4F8] rounded-full mb-6">
                    <span className="text-3xl font-light text-[#2A9D8F]">{step.step}</span>
                  </div>
                  <h3 className="text-xl font-medium mb-3">{step.title}</h3>
                  <p className="text-sm text-[#1B3A4B]/70">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-24 bg-[#E8F4F8]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-4">Service Areas</h2>
            <p className="text-lg text-[#1B3A4B]/70 max-w-2xl mx-auto">
              Proudly serving communities across the region
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto"
          >
            {serviceAreas.map((area, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white px-6 py-3 rounded-full border border-[#E8F4F8] text-[#1B3A4B] hover:border-[#2A9D8F] hover:text-[#2A9D8F] transition-all duration-300"
              >
                {area}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#1B3A4B] to-[#2A9D8F] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-light mb-6">Ready for Comfort?</h2>
            <p className="text-xl mb-10 text-white/90">
              Schedule your consultation today and experience the ArcticLine difference
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-[#1B3A4B] rounded-lg font-medium hover:bg-[#E8F4F8] transition-all duration-300">
                Schedule Service
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-medium hover:bg-white/10 transition-all duration-300">
                Get a Quote
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1B3A4B] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-light mb-4">ArcticLine</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Precision comfort solutions for residential homes. Trusted by thousands of homeowners.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-white/70">
                {services.map((service) => (
                  <li key={service.id}>{service.title}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Contact</h4>
              <ul className="space-y-3 text-sm text-white/70">
                <li className="flex items-center gap-2">
                  {icons.phone}
                  <span>(555) 123-4567</span>
                </li>
                <li className="flex items-center gap-2">
                  {icons.mail}
                  <span>info@arcticline.com</span>
                </li>
                <li className="flex items-center gap-2">
                  {icons.mapPin}
                  <span>Serving the greater region</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Hours</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>Monday - Friday: 8am - 6pm</li>
                <li>Saturday: 9am - 4pm</li>
                <li>Sunday: Emergency only</li>
                <li className="pt-2 text-[#2A9D8F]">24/7 Emergency Service</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-sm text-white/60">
            <p>&copy; 2024 ArcticLine HVAC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
