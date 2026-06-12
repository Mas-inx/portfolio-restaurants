import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// ==================== HERO SECTION ====================
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-warm-white">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, var(--color-ink) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Decorative shapes */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-sage/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-terracotta/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-sage/10 rounded-full mb-6">
            <span className="w-2 h-2 bg-sage rounded-full animate-pulse" />
            <span className="text-sm font-medium text-sage-dark">Short-Term Rental Management</span>
          </div>

          <h1 className="font-display text-5xl lg:text-7xl font-bold text-ink leading-[1.1] mb-6">
            Turn your property into a{' '}
            <span className="text-terracotta italic">better-run</span> stay.
          </h1>

          <p className="text-lg text-ink-light/70 max-w-lg mb-8 leading-relaxed">
            Revenue optimization, exceptional guest experiences, and operational discipline — 
            all managed from one elegant platform built for modern hosts.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#calculator" className="px-8 py-4 bg-terracotta text-white font-medium rounded-xl hover:bg-terracotta-dark transition-all shadow-lg shadow-terracotta/20 hover:shadow-terracotta/30 hover:-translate-y-0.5">
              Calculate Revenue
            </a>
            <a href="#dashboard" className="px-8 py-4 bg-cream text-ink font-medium rounded-xl hover:bg-sand transition-all border border-sand">
              View Dashboard
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-12 pt-8 border-t border-sand">
            <div>
              <div className="text-2xl font-bold text-ink">2,400+</div>
              <div className="text-sm text-ink-light/60">Properties Managed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-ink">98.2%</div>
              <div className="text-sm text-ink-light/60">Guest Satisfaction</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-ink">+34%</div>
              <div className="text-sm text-ink-light/60">Revenue Uplift</div>
            </div>
          </div>
        </motion.div>

        {/* Right: Revenue Dashboard Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <div className="glass-card rounded-3xl p-8 shadow-2xl shadow-ink/5">
            {/* Card header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-ink">Monthly Revenue</h3>
                <p className="text-sm text-ink-light/60">Last 30 days</p>
              </div>
              <div className="px-3 py-1 bg-sage/10 text-sage-dark text-sm font-medium rounded-full">
                +12.4%
              </div>
            </div>

            {/* Revenue amount */}
            <div className="text-4xl font-bold text-ink mb-6">$8,420</div>

            {/* Mini chart */}
            <div className="flex items-end gap-1 h-24 mb-6">
              {[40, 55, 45, 65, 50, 70, 60, 80, 75, 90, 85, 95, 88, 92, 98].map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-t-sm"
                  style={{ background: i >= 12 ? 'var(--color-terracotta)' : 'var(--color-sage-light)', opacity: 0.6 + (i / 15) * 0.4 }}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.05 }}
                />
              ))}
            </div>

            {/* Metrics row */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-sand">
              <div>
                <div className="text-lg font-bold text-ink">87%</div>
                <div className="text-xs text-ink-light/60">Occupancy</div>
              </div>
              <div>
                <div className="text-lg font-bold text-ink">4.9</div>
                <div className="text-xs text-ink-light/60">Rating</div>
              </div>
              <div>
                <div className="text-lg font-bold text-ink">$142</div>
                <div className="text-xs text-ink-light/60">Avg/Night</div>
              </div>
            </div>
          </div>

          {/* Floating notification */}
          <motion.div
            className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl shadow-ink/10 flex items-center gap-3"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="w-10 h-10 bg-sage/20 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-sage-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-medium text-ink">New Booking</div>
              <div className="text-xs text-ink-light/60">3 nights • $426</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ==================== REVENUE CALCULATOR ====================
function RevenueCalculator() {
  const [bedrooms, setBedrooms] = useState(2)
  const [locationType, setLocationType] = useState<'urban' | 'suburban' | 'coastal' | 'resort'>('urban')
  const [occupancy, setOccupancy] = useState(70)
  const [quality, setQuality] = useState<'standard' | 'premium' | 'luxury'>('premium')

  const baseRates: Record<string, number> = {
    urban: 120, suburban: 95, coastal: 180, resort: 220
  }
  const qualityMultiplier: Record<string, number> = {
    standard: 0.8, premium: 1.0, luxury: 1.6
  }

  const nightlyRate = baseRates[locationType] * qualityMultiplier[quality] * (1 + (bedrooms - 1) * 0.35)
  const monthlyRevenue = nightlyRate * 30 * (occupancy / 100)

  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="calculator" ref={ref} className="py-24 bg-cream relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-terracotta/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-terracotta font-medium text-sm uppercase tracking-wider">Revenue Calculator</span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold mt-3 mb-4">
            Estimate Your Earnings
          </h2>
          <p className="text-ink-light/70 max-w-2xl mx-auto">
            Adjust the parameters below to see a realistic monthly revenue estimate for your property.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Bedrooms */}
            <div>
              <label className="flex justify-between mb-3">
                <span className="font-medium text-ink">Bedrooms</span>
                <span className="text-terracotta font-bold">{bedrooms}</span>
              </label>
              <input
                type="range"
                min="1"
                max="6"
                value={bedrooms}
                onChange={(e) => setBedrooms(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-ink-light/50 mt-1">
                <span>Studio</span>
                <span>6 BR</span>
              </div>
            </div>

            {/* Location Type */}
            <div>
              <label className="block mb-3 font-medium text-ink">Location Type</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(['urban', 'suburban', 'coastal', 'resort'] as const).map((loc) => (
                  <button
                    key={loc}
                    onClick={() => setLocationType(loc)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all capitalize ${
                      locationType === loc
                        ? 'bg-terracotta text-white shadow-lg shadow-terracotta/20'
                        : 'bg-warm-white text-ink-light border border-sand hover:border-terracotta/30'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>

            {/* Occupancy */}
            <div>
              <label className="flex justify-between mb-3">
                <span className="font-medium text-ink">Occupancy Target</span>
                <span className="text-terracotta font-bold">{occupancy}%</span>
              </label>
              <input
                type="range"
                min="30"
                max="95"
                value={occupancy}
                onChange={(e) => setOccupancy(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-ink-light/50 mt-1">
                <span>30%</span>
                <span>95%</span>
              </div>
            </div>

            {/* Quality */}
            <div>
              <label className="block mb-3 font-medium text-ink">Property Quality</label>
              <div className="grid grid-cols-3 gap-3">
                {(['standard', 'premium', 'luxury'] as const).map((q) => (
                  <button
                    key={q}
                    onClick={() => setQuality(q)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all capitalize ${
                      quality === q
                        ? 'bg-sage text-white shadow-lg shadow-sage/20'
                        : 'bg-warm-white text-ink-light border border-sand hover:border-sage/30'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-warm-white rounded-3xl p-8 shadow-xl shadow-ink/5 border border-sand"
          >
            <div className="text-center mb-8">
              <p className="text-ink-light/60 mb-2">Estimated Monthly Revenue</p>
              <motion.div
                key={monthlyRevenue.toFixed(0)}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-5xl font-bold text-terracotta"
              >
                ${Math.round(monthlyRevenue).toLocaleString()}
              </motion.div>
              <p className="text-sm text-ink-light/50 mt-2">per month</p>
            </div>

            <div className="space-y-4 pt-6 border-t border-sand">
              <div className="flex justify-between">
                <span className="text-ink-light/70">Nightly Rate</span>
                <span className="font-semibold">${Math.round(nightlyRate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-light/70">Booked Nights/Month</span>
                <span className="font-semibold">{Math.round(30 * occupancy / 100)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-light/70">Annual Projection</span>
                <span className="font-semibold text-sage-dark">${Math.round(monthlyRevenue * 12).toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-8 p-4 bg-sage/5 rounded-xl border border-sage/20">
              <p className="text-sm text-sage-dark">
                <strong>Pro tip:</strong> Premium properties in coastal areas with 80%+ occupancy can earn $12,000+/month.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ==================== MANAGEMENT SYSTEM ====================
function ManagementSystem() {
  const [activeTab, setActiveTab] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const features = [
    { icon: '📋', title: 'Listing Setup', desc: 'Professional listings across all platforms with optimized descriptions, photography, and amenity highlights.' },
    { icon: '💰', title: 'Dynamic Pricing', desc: 'AI-powered pricing that adjusts to demand, seasonality, events, and competitor rates in real-time.' },
    { icon: '💬', title: 'Guest Messaging', desc: 'Automated yet personal communication — booking confirmations, check-in instructions, and follow-ups.' },
    { icon: '🧹', title: 'Cleaning Coordination', desc: 'Automated turnover scheduling with photo verification, supply tracking, and quality scoring.' },
    { icon: '🔧', title: 'Maintenance', desc: 'Track issues, schedule repairs, manage vendors, and keep your property in peak condition.' },
    { icon: '📊', title: 'Reporting', desc: 'Comprehensive analytics — revenue, occupancy, guest satisfaction, expenses, and ROI tracking.' },
  ]

  return (
    <section id="management" ref={ref} className="py-24 bg-warm-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sage font-medium text-sm uppercase tracking-wider">Management System</span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold mt-3 mb-4">
            Everything You Need to Host
          </h2>
          <p className="text-ink-light/70 max-w-2xl mx-auto">
            From listing creation to guest checkout — a complete operational toolkit designed for professional hosts.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Feature tabs */}
          <div className="lg:col-span-1 space-y-2">
            {features.map((f, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                onClick={() => setActiveTab(i)}
                className={`w-full text-left px-5 py-4 rounded-xl transition-all flex items-center gap-4 ${
                  activeTab === i
                    ? 'bg-terracotta text-white shadow-lg shadow-terracotta/20'
                    : 'hover:bg-cream text-ink'
                }`}
              >
                <span className="text-2xl">{f.icon}</span>
                <span className="font-medium">{f.title}</span>
              </motion.button>
            ))}
          </div>

          {/* Feature detail */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-cream rounded-3xl p-10 h-full flex flex-col justify-center"
              >
                <div className="text-5xl mb-6">{features[activeTab].icon}</div>
                <h3 className="font-display text-3xl font-bold mb-4">{features[activeTab].title}</h3>
                <p className="text-ink-light/70 text-lg leading-relaxed mb-8">{features[activeTab].desc}</p>

                {/* Mock UI */}
                <div className="bg-warm-white rounded-2xl p-6 shadow-sm border border-sand">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-terracotta/40" />
                    <div className="w-3 h-3 rounded-full bg-sage/40" />
                    <div className="w-3 h-3 rounded-full bg-sand" />
                  </div>
                  <div className="space-y-3">
                    <div className="h-3 bg-sand rounded-full w-3/4" />
                    <div className="h-3 bg-sand rounded-full w-1/2" />
                    <div className="h-3 bg-terracotta/20 rounded-full w-2/3" />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

// ==================== GUEST EXPERIENCE ====================
function GuestExperience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const experiences = [
    { icon: '🔑', title: 'Seamless Check-in', desc: 'Smart lock integration, automated codes, and clear arrival instructions.' },
    { icon: '📖', title: 'Digital Guidebook', desc: 'Curated local recommendations, house manual, and WiFi details — all in one place.' },
    { icon: '📞', title: '24/7 Support', desc: 'Guests reach a real human anytime. Quick resolution for any issue.' },
    { icon: '✨', title: 'Cleaning Standards', desc: 'Hotel-grade cleanliness with photo verification and guest satisfaction scoring.' },
    { icon: '🗺️', title: 'Local Recommendations', desc: 'Personalized suggestions for dining, activities, and hidden gems nearby.' },
  ]

  return (
    <section id="experience" ref={ref} className="py-24 bg-charcoal text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-terracotta-light font-medium text-sm uppercase tracking-wider">Guest Experience</span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold mt-3 mb-4">
            Stays Guests Remember
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Every touchpoint is designed to delight — from booking to checkout and beyond.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-terracotta/30 transition-all group"
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{exp.icon}</div>
              <h3 className="font-semibold text-white mb-2">{exp.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{exp.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Guest testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 max-w-3xl mx-auto text-center"
        >
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-terracotta-light" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-xl text-white/80 italic font-display leading-relaxed">
            "The best Airbnb experience we've ever had. From the seamless check-in to the thoughtful guidebook — 
            every detail was perfect."
          </p>
          <p className="text-white/40 mt-4 text-sm">— Sarah & James, Guests since 2024</p>
        </motion.div>
      </div>
    </section>
  )
}

// ==================== FEATURED STAYS ====================
function FeaturedStays() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const properties = [
    { name: 'Coastal Villa Serenity', location: 'Malibu, CA', rate: 385, capacity: 8, rating: 4.97, img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop' },
    { name: 'Urban Loft District', location: 'Brooklyn, NY', rate: 210, capacity: 4, rating: 4.92, img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop' },
    { name: 'Mountain Retreat Lodge', location: 'Aspen, CO', rate: 450, capacity: 10, rating: 4.95, img: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&h=400&fit=crop' },
    { name: 'Vineyard Estate', location: 'Napa Valley, CA', rate: 520, capacity: 12, rating: 4.98, img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop' },
  ]

  return (
    <section id="stays" ref={ref} className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-terracotta font-medium text-sm uppercase tracking-wider">Featured Stays</span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold mt-3 mb-4">
            Properties We Manage
          </h2>
          <p className="text-ink-light/70 max-w-2xl mx-auto">
            A selection of our highest-performing properties across premier destinations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((prop, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-warm-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="property-img-wrapper h-48">
                <img src={prop.img} alt={prop.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-ink mb-1">{prop.name}</h3>
                <p className="text-sm text-ink-light/60 mb-3">{prop.location}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-terracotta" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm font-medium">{prop.rating}</span>
                  </div>
                  <span className="text-sm text-ink-light/50">{prop.capacity} guests</span>
                </div>
                <div className="mt-3 pt-3 border-t border-sand flex items-center justify-between">
                  <span className="text-lg font-bold text-terracotta">${prop.rate}</span>
                  <span className="text-xs text-ink-light/50">per night</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ==================== OWNER DASHBOARD PREVIEW ====================
function OwnerDashboard() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const stats = [
    { label: 'Monthly Earnings', value: '$12,840', change: '+18%', positive: true, icon: '💰' },
    { label: 'Occupancy Rate', value: '89%', change: '+5%', positive: true, icon: '📅' },
    { label: 'Guest Reviews', value: '4.93', change: '+0.2', positive: true, icon: '⭐' },
    { label: 'Cleans Completed', value: '47', change: '100%', positive: true, icon: '🧹' },
    { label: 'Open Tickets', value: '2', change: '-3', positive: true, icon: '🔧' },
  ]

  return (
    <section id="dashboard" ref={ref} className="py-24 bg-warm-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sage font-medium text-sm uppercase tracking-wider">Owner Dashboard</span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold mt-3 mb-4">
            Your Portfolio at a Glance
          </h2>
          <p className="text-ink-light/70 max-w-2xl mx-auto">
            Real-time insights into every aspect of your rental business — revenue, occupancy, reviews, and operations.
          </p>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-cream rounded-3xl p-6 lg:p-10 shadow-xl shadow-ink/5"
        >
          {/* Dashboard header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-ink">Portfolio Overview</h3>
              <p className="text-sm text-ink-light/60">Last updated 2 minutes ago</p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-sage/10 text-sage-dark text-sm rounded-full">This Month</span>
              <span className="px-3 py-1 text-ink-light/50 text-sm rounded-full hover:bg-warm-white cursor-pointer transition">This Year</span>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="dashboard-card bg-warm-white rounded-2xl p-5 border border-sand"
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-ink">{stat.value}</div>
                <div className="text-xs text-ink-light/60 mt-1">{stat.label}</div>
                <div className={`text-xs font-medium mt-2 ${stat.positive ? 'text-sage-dark' : 'text-red-500'}`}>
                  {stat.change}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Revenue chart mockup */}
          <div className="bg-warm-white rounded-2xl p-6 border border-sand">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-semibold text-ink">Revenue Trend</h4>
              <span className="text-sm text-sage-dark font-medium">+18% vs last month</span>
            </div>
            <div className="flex items-end gap-2 h-40">
              {[60, 45, 70, 55, 80, 65, 90, 75, 85, 95, 88, 92].map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-t-lg relative group"
                  style={{ background: i >= 10 ? 'var(--color-terracotta)' : 'var(--color-sage)' }}
                  initial={{ height: 0 }}
                  animate={inView ? { height: `${h}%` } : { height: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-ink text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                    ${(h * 140).toLocaleString()}
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-between mt-3 text-xs text-ink-light/40">
              <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
              <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ==================== LAUNCH PROCESS ====================
function LaunchProcess() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const steps = [
    { num: '01', title: 'Assess', desc: 'We evaluate your property\'s rental potential, market positioning, and revenue opportunity.', color: 'bg-terracotta' },
    { num: '02', title: 'Prepare', desc: 'Staging, furnishing recommendations, and professional setup to maximize appeal.', color: 'bg-sage' },
    { num: '03', title: 'Photograph', desc: 'Professional photography and virtual tours that convert browsers into bookers.', color: 'bg-terracotta' },
    { num: '04', title: 'List', desc: 'Multi-platform listing optimization with compelling copy and strategic pricing.', color: 'bg-sage' },
    { num: '05', title: 'Host', desc: 'Full-service management — guests, cleaning, maintenance, and communication.', color: 'bg-terracotta' },
    { num: '06', title: 'Optimize', desc: 'Continuous improvement through data analysis, guest feedback, and market trends.', color: 'bg-sage' },
  ]

  return (
    <section id="process" ref={ref} className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-terracotta font-medium text-sm uppercase tracking-wider">Launch Process</span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold mt-3 mb-4">
            From Property to Profit in 6 Steps
          </h2>
          <p className="text-ink-light/70 max-w-2xl mx-auto">
            Our proven process gets your property earning faster — with professional support at every stage.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, rotateX: 10 }}
              animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative bg-warm-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all group border border-sand hover:border-transparent"
              style={{ perspective: '1000px' }}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 ${step.color} text-white rounded-xl font-bold text-sm mb-5 group-hover:scale-110 transition-transform`}>
                {step.num}
              </div>
              <h3 className="font-display text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-ink-light/60 leading-relaxed">{step.desc}</p>

              {/* Connecting line for desktop */}
              {i < steps.length - 1 && i % 3 !== 2 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-sand" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Timeline bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-12 h-2 bg-gradient-to-r from-terracotta via-sage to-terracotta rounded-full origin-left"
        />
      </div>
    </section>
  )
}

// ==================== DUAL CTA FORM ====================
function DualCTA() {
  const [mode, setMode] = useState<'owner' | 'guest'>('owner')
  const [submitted, setSubmitted] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="contact" ref={ref} className="py-24 bg-warm-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-terracotta/5 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sage font-medium text-sm uppercase tracking-wider">Get Started</span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold mt-3 mb-4">
            Ready to Begin?
          </h2>
          <p className="text-ink-light/70 max-w-2xl mx-auto">
            Whether you're a property owner looking to maximize revenue or a guest seeking the perfect stay — we're here to help.
          </p>
        </motion.div>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-10"
        >
          <div className="bg-cream rounded-full p-1.5 inline-flex">
            <button
              onClick={() => setMode('owner')}
              className={`px-8 py-3 rounded-full font-medium transition-all ${
                mode === 'owner' ? 'bg-terracotta text-white shadow-lg' : 'text-ink-light hover:text-ink'
              }`}
            >
              Property Owner
            </button>
            <button
              onClick={() => setMode('guest')}
              className={`px-8 py-3 rounded-full font-medium transition-all ${
                mode === 'guest' ? 'bg-sage text-white shadow-lg' : 'text-ink-light hover:text-ink'
              }`}
            >
              Guest Inquiry
            </button>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="bg-cream rounded-3xl p-8 lg:p-12 shadow-xl shadow-ink/5"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, x: mode === 'owner' ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: mode === 'owner' ? 20 : -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">
                    {mode === 'owner' ? 'Property Address' : 'Full Name'}
                  </label>
                  <input
                    type="text"
                    placeholder={mode === 'owner' ? '123 Main St, City, State' : 'John Smith'}
                    className="w-full px-5 py-3.5 bg-warm-white rounded-xl border border-sand focus:border-terracotta focus:ring-2 focus:ring-terracotta/10 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="you@email.com"
                    className="w-full px-5 py-3.5 bg-warm-white rounded-xl border border-sand focus:border-terracotta focus:ring-2 focus:ring-terracotta/10 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">Phone</label>
                  <input
                    type="tel"
                    placeholder="(555) 000-0000"
                    className="w-full px-5 py-3.5 bg-warm-white rounded-xl border border-sand focus:border-terracotta focus:ring-2 focus:ring-terracotta/10 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">
                    {mode === 'owner' ? 'Property Type' : 'Check-in Date'}
                  </label>
                  <input
                    type={mode === 'owner' ? 'text' : 'date'}
                    placeholder={mode === 'owner' ? 'House, Condo, Villa...' : ''}
                    className="w-full px-5 py-3.5 bg-warm-white rounded-xl border border-sand focus:border-terracotta focus:ring-2 focus:ring-terracotta/10 outline-none transition"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-ink mb-2">
                  {mode === 'owner' ? 'Tell us about your property' : 'What are you looking for?'}
                </label>
                <textarea
                  rows={4}
                  placeholder={mode === 'owner' ? 'Number of bedrooms, location highlights, current management situation...' : 'Preferred destination, group size, special requirements...'}
                  className="w-full px-5 py-3.5 bg-warm-white rounded-xl border border-sand focus:border-terracotta focus:ring-2 focus:ring-terracotta/10 outline-none transition resize-none"
                />
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            type="submit"
            className={`w-full py-4 rounded-xl font-semibold text-white transition-all shadow-lg ${
              mode === 'owner'
                ? 'bg-terracotta hover:bg-terracotta-dark shadow-terracotta/20'
                : 'bg-sage hover:bg-sage-dark shadow-sage/20'
            }`}
          >
            {submitted ? '✓ Submitted Successfully!' : mode === 'owner' ? 'Get Your Free Revenue Assessment' : 'Send Inquiry'}
          </button>
        </motion.form>
      </div>
    </section>
  )
}

// ==================== NAVIGATION ====================
function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-warm-white/90 backdrop-blur-lg shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-terracotta rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">H</span>
          </div>
          <span className="font-display font-bold text-xl text-ink">HostLedger</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="#calculator" className="text-sm text-ink-light hover:text-terracotta transition">Calculator</a>
          <a href="#management" className="text-sm text-ink-light hover:text-terracotta transition">Management</a>
          <a href="#stays" className="text-sm text-ink-light hover:text-terracotta transition">Stays</a>
          <a href="#dashboard" className="text-sm text-ink-light hover:text-terracotta transition">Dashboard</a>
          <a href="#contact" className="px-5 py-2.5 bg-terracotta text-white text-sm font-medium rounded-lg hover:bg-terracotta-dark transition shadow-sm">
            Get Started
          </a>
        </div>
      </div>
    </nav>
  )
}

// ==================== FOOTER ====================
function Footer() {
  return (
    <footer className="bg-charcoal text-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-terracotta rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <span className="font-display font-bold text-xl">HostLedger</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Professional short-term rental management that maximizes revenue and delivers exceptional guest experiences.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li><a href="#" className="hover:text-terracotta-light transition">Revenue Management</a></li>
              <li><a href="#" className="hover:text-terracotta-light transition">Guest Experience</a></li>
              <li><a href="#" className="hover:text-terracotta-light transition">Property Setup</a></li>
              <li><a href="#" className="hover:text-terracotta-light transition">Cleaning Services</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li><a href="#" className="hover:text-terracotta-light transition">About Us</a></li>
              <li><a href="#" className="hover:text-terracotta-light transition">Careers</a></li>
              <li><a href="#" className="hover:text-terracotta-light transition">Blog</a></li>
              <li><a href="#" className="hover:text-terracotta-light transition">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li><a href="#" className="hover:text-terracotta-light transition">Instagram</a></li>
              <li><a href="#" className="hover:text-terracotta-light transition">LinkedIn</a></li>
              <li><a href="#" className="hover:text-terracotta-light transition">Twitter</a></li>
              <li><a href="#" className="hover:text-terracotta-light transition">Newsletter</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">© 2024 HostLedger. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-white/40">
            <a href="#" className="hover:text-white/60 transition">Privacy</a>
            <a href="#" className="hover:text-white/60 transition">Terms</a>
            <a href="#" className="hover:text-white/60 transition">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ==================== MAIN APP ====================
export default function App() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <RevenueCalculator />
      <ManagementSystem />
      <GuestExperience />
      <FeaturedStays />
      <OwnerDashboard />
      <LaunchProcess />
      <DualCTA />
      <Footer />
    </div>
  )
}
