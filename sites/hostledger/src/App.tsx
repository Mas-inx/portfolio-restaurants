import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const heroImage = 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1600&q=85';

// ============ IMAGES ============
const heroImage = 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1600&q=85';
const propertyImages = [
  'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=85',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=85',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=85',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=85',
];

// ============ NAVIGATION ============
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-stone-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#hero" className="text-xl font-bold text-white tracking-tight">Host<span className="text-emerald-400">Ledger</span></a>
        <div className="hidden md:flex items-center gap-8 text-sm text-stone-400">
          <a href="#properties" className="hover:text-emerald-400 transition-colors">Properties</a>
          <a href="#features" className="hover:text-emerald-400 transition-colors">Features</a>
          <a href="#dashboard" className="hover:text-emerald-400 transition-colors">Dashboard</a>
          <a href="#pricing" className="hover:text-emerald-400 transition-colors">Pricing</a>
          <a href="#contact" className="bg-emerald-600 text-white px-5 py-2 rounded font-semibold hover:bg-emerald-700 transition-colors">Get Started</a>
        </div>
      </div>
    </nav>
  );
}

// ============ HERO ============
function Hero() {
  return (
    <section id="hero" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/70 via-stone-900/50 to-stone-950/90" />
      </div>
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-emerald-400 text-sm tracking-[0.3em] uppercase mb-4">
          Property Management Platform
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
          Manage Properties <span className="text-emerald-400">Smarter</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="text-stone-300 text-lg max-w-2xl mx-auto mb-8">
          The all-in-one platform for hosts and property managers. Track bookings, manage tenants, automate finances, and grow your portfolio.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="flex flex-wrap gap-4 justify-center">
          <a href="#pricing" className="bg-emerald-600 text-white px-8 py-3 rounded font-semibold hover:bg-emerald-700 transition-all">Start Free Trial</a>
          <a href="#dashboard" className="border border-white/30 text-white px-8 py-3 rounded font-medium hover:bg-white/10 transition-all">See Dashboard</a>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}

// ============ PROPERTIES ============
function Properties() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const properties = [
    { name: 'Urban Loft Downtown', type: 'Short-term Rental', occupancy: '92%', revenue: '$4,200/mo', image: propertyImages[0] },
    { name: 'Suburban Family Home', type: 'Long-term Lease', occupancy: '100%', revenue: '$2,800/mo', image: propertyImages[1] },
    { name: 'Coastal Villa', type: 'Vacation Rental', occupancy: '78%', revenue: '$6,500/mo', image: propertyImages[2] },
    { name: 'City Apartment', type: 'Short-term Rental', occupancy: '88%', revenue: '$3,100/mo', image: propertyImages[3] },
  ];

  return (
    <section id="properties" className="py-24 bg-stone-950" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="text-emerald-400 text-sm tracking-[0.2em] uppercase mb-3">Portfolio</p>
          <h2 className="text-4xl font-bold text-white mb-4">Your Properties</h2>
          <p className="text-stone-400 max-w-2xl mx-auto">Manage all your properties from a single dashboard. Real-time occupancy, revenue tracking, and guest communication.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {properties.map((p, i) => (
            <motion.div key={p.name} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.15 }} className="group bg-stone-900 border border-stone-800 rounded-lg overflow-hidden hover:border-emerald-500/30 transition-all">
              <div className="relative h-48 overflow-hidden">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-3 right-3 bg-emerald-600/90 text-white text-xs px-2 py-1 rounded font-medium">{p.occupancy} occupied</div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-1">{p.name}</h3>
                <p className="text-stone-400 text-sm mb-3">{p.type}</p>
                <div className="flex justify-between items-center">
                  <span className="text-emerald-400 font-semibold">{p.revenue}</span>
                  <span className="text-stone-500 text-sm">View Details →</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ FEATURES ============
function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const features = [
    { title: 'Automated Bookings', desc: 'Sync calendars across platforms. Auto-approve, auto-message, auto-pricing.' },
    { title: 'Financial Tracking', desc: 'Revenue, expenses, tax prep — all in one place with real-time P&L statements.' },
    { title: 'Guest Communication', desc: 'Unified inbox for all platforms. Templates, auto-replies, and translation.' },
    { title: 'Maintenance Requests', desc: 'Tenants submit requests with photos. Assign vendors, track completion.' },
    { title: 'Smart Pricing', desc: 'AI-driven dynamic pricing based on demand, seasonality, and local events.' },
    { title: 'Document Storage', desc: 'Leases, contracts, insurance docs — organized and accessible anywhere.' },
  ];

  return (
    <section id="features" className="py-24 bg-stone-900" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="text-emerald-400 text-sm tracking-[0.2em] uppercase mb-3">Platform</p>
          <h2 className="text-4xl font-bold text-white mb-4">Everything You Need</h2>
          <p className="text-stone-400 max-w-2xl mx-auto">Powerful tools designed for property managers who want to scale without the overhead.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }} className="bg-stone-800/50 border border-stone-700 rounded-lg p-6 hover:border-emerald-500/30 transition-all">
              <div className="w-10 h-10 rounded-lg bg-emerald-600/20 flex items-center justify-center mb-4">
                <div className="w-3 h-3 bg-emerald-400 rounded-sm" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
              <p className="text-stone-400 text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ DASHBOARD PREVIEW ============
function Dashboard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const metrics = [
    { label: 'Total Revenue', value: '$16,600', change: '+12%' },
    { label: 'Occupancy Rate', value: '89.5%', change: '+3%' },
    { label: 'Active Listings', value: '4', change: '+1' },
    { label: 'Guest Reviews', value: '4.8★', change: '+0.2' },
  ];

  return (
    <section id="dashboard" className="py-24 bg-stone-950" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="text-emerald-400 text-sm tracking-[0.2em] uppercase mb-3">Overview</p>
          <h2 className="text-4xl font-bold text-white mb-4">Dashboard Preview</h2>
          <p className="text-stone-400 max-w-2xl mx-auto">Your entire portfolio at a glance. Key metrics, upcoming tasks, and alerts — all in real time.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }} className="bg-stone-900 border border-stone-800 rounded-xl p-6 md:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {metrics.map((m, i) => (
              <motion.div key={m.label} initial={{ opacity: 0, scale: 0.95 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }} className="bg-stone-800 rounded-lg p-4">
                <p className="text-stone-400 text-xs mb-1">{m.label}</p>
                <p className="text-white text-xl font-bold">{m.value}</p>
                <p className="text-emerald-400 text-xs mt-1">{m.change} this month</p>
              </motion.div>
            ))}
          </div>
          {/* Revenue chart placeholder */}
          <div className="bg-stone-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-white font-semibold">Revenue Trend</h4>
              <span className="text-stone-500 text-sm">Last 6 months</span>
            </div>
            <div className="flex items-end gap-2 h-32">
              {[65, 72, 58, 80, 90, 95].map((h, i) => (
                <motion.div key={i} initial={{ height: 0 }} animate={isInView ? { height: `${h}%` } : {}} transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }} className="flex-1 bg-emerald-600/60 rounded-t-sm hover:bg-emerald-500 transition-colors" />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-stone-500">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map(m => <span key={m}>{m}</span>)}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============ PRICING ============
function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const plans = [
    { name: 'Starter', price: '$29', period: '/mo', features: ['Up to 3 properties', 'Basic analytics', 'Calendar sync', 'Email support'], highlighted: false },
    { name: 'Professional', price: '$79', period: '/mo', features: ['Up to 15 properties', 'Advanced analytics', 'Dynamic pricing', 'Priority support', 'API access'], highlighted: true },
    { name: 'Enterprise', price: '$199', period: '/mo', features: ['Unlimited properties', 'Custom integrations', 'Dedicated manager', 'White-label option', 'SLA guarantee'], highlighted: false },
  ];

  return (
    <section id="pricing" className="py-24 bg-stone-900" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="text-emerald-400 text-sm tracking-[0.2em] uppercase mb-3">Pricing</p>
          <h2 className="text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
          <p className="text-stone-400 max-w-2xl mx-auto">Start free for 14 days. No credit card required. Cancel anytime.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((p, i) => (
            <motion.div key={p.name} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.15 }} className={`rounded-xl p-6 border ${p.highlighted ? 'bg-stone-800 border-emerald-500 shadow-lg shadow-emerald-500/10' : 'bg-stone-800/50 border-stone-700'}`}>
              {p.highlighted && <div className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">Most Popular</div>}
              <h3 className="text-xl font-bold text-white mb-2">{p.name}</h3>
              <div className="mb-6">
                <span className="text-3xl font-bold text-white">{p.price}</span>
                <span className="text-stone-400">{p.period}</span>
              </div>
              <ul className="space-y-3 mb-6">
                {p.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-stone-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-lg font-semibold transition-colors ${p.highlighted ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-stone-700 text-white hover:bg-stone-600'}`}>
                Start Free Trial
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ CONTACT ============
function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="py-24 bg-stone-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: `url(${heroImage})` }} />
      <div className="max-w-4xl mx-auto px-6 relative z-10" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
          <p className="text-emerald-400 text-sm tracking-[0.2em] uppercase mb-3">Get Started</p>
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Scale Your Portfolio?</h2>
          <p className="text-stone-400">Join thousands of property managers who trust HostLedger to run their business.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="bg-stone-900/80 backdrop-blur border border-stone-700 rounded-xl p-8">
          <div className="grid md:grid-cols-2 gap-6">
            <input type="text" placeholder="Full Name" className="bg-stone-800 border border-stone-700 rounded-lg px-4 py-3 text-white placeholder-stone-500 focus:border-emerald-500 focus:outline-none" />
            <input type="email" placeholder="Email Address" className="bg-stone-800 border border-stone-700 rounded-lg px-4 py-3 text-white placeholder-stone-500 focus:border-emerald-500 focus:outline-none" />
            <input type="text" placeholder="Number of Properties" className="bg-stone-800 border border-stone-700 rounded-lg px-4 py-3 text-white placeholder-stone-500 focus:border-emerald-500 focus:outline-none" />
            <select className="bg-stone-800 border border-stone-700 rounded-lg px-4 py-3 text-stone-500 focus:border-emerald-500 focus:outline-none">
              <option>Property Type...</option>
              <option>Short-term Rentals</option>
              <option>Long-term Leases</option>
              <option>Mixed Portfolio</option>
            </select>
          </div>
          <textarea placeholder="Tell us about your portfolio..." rows={4} className="w-full mt-6 bg-stone-800 border border-stone-700 rounded-lg px-4 py-3 text-white placeholder-stone-500 focus:border-emerald-500 focus:outline-none resize-none" />
          <button className="w-full mt-6 bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors">Start Your Free Trial</button>
        </motion.div>
      </div>
    </section>
  );
}

// ============ FOOTER ============
function Footer() {
  return (
    <footer className="bg-stone-950 py-12 px-6 border-t border-stone-800">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-white text-lg font-bold">Host<span className="text-emerald-400">Ledger</span></div>
        <div className="text-stone-500 text-sm">© 2026 HostLedger. All rights reserved.</div>
      </div>
    </footer>
  );
}

// ============ APP ============
export default function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <Properties />
      <Features />
      <Dashboard />
      <Pricing />
      <Contact />
      <Footer />
    </div>
  );
}
