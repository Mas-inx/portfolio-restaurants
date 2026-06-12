import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// ============ IMAGES ============
const heroImage = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=85';
const officeImage = 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=85';
const retailImage = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=85';

// ============ NAVIGATION ============
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#hero" className="text-xl font-bold text-white tracking-tight">AXIS<span className="text-blue-400">.</span></a>
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
          <a href="#spaces" className="hover:text-blue-400 transition-colors">Spaces</a>
          <a href="#office" className="hover:text-blue-400 transition-colors">Office</a>
          <a href="#retail" className="hover:text-blue-400 transition-colors">Retail</a>
          <a href="#services" className="hover:text-blue-400 transition-colors">Services</a>
          <a href="#contact" className="bg-blue-600 text-white px-5 py-2 rounded font-semibold hover:bg-blue-700 transition-colors">Inquire Now</a>
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
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-900/90" />
      </div>
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-blue-400 text-sm tracking-[0.3em] uppercase mb-4">
          Commercial Real Estate
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
          Where Business <span className="text-blue-400">Thrives</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="text-slate-300 text-lg max-w-2xl mx-auto mb-8">
          Premium office and retail spaces designed for modern enterprises. Strategic locations, world-class amenities, and flexible leasing options.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="flex flex-wrap gap-4 justify-center">
          <a href="#spaces" className="bg-blue-600 text-white px-8 py-3 rounded font-semibold hover:bg-blue-700 transition-all">View Spaces</a>
          <a href="#contact" className="border border-white/30 text-white px-8 py-3 rounded font-medium hover:bg-white/10 transition-all">Schedule Tour</a>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}

// ============ SPACES OVERVIEW ============
function Spaces() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const stats = [
    { value: '250K+', label: 'Sq Ft Available' },
    { value: '98%', label: 'Occupancy Rate' },
    { value: '45+', label: 'Tenant Companies' },
    { value: '4.9', label: 'Tenant Satisfaction' },
  ];

  return (
    <section id="spaces" className="py-24 bg-slate-900" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="text-blue-400 text-sm tracking-[0.2em] uppercase mb-3">Overview</p>
          <h2 className="text-4xl font-bold text-white mb-4">Prime Commercial Spaces</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Strategically located properties built for growth. From startups to enterprises, we have the space for your ambition.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }} className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-1">{s.value}</div>
              <div className="text-sm text-slate-400">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ OFFICE SECTION ============
function OfficeSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const features = [
    { title: 'Open Floor Plans', desc: 'Configurable layouts from 500 to 10,000 sq ft' },
    { title: 'Smart Building', desc: 'IoT-enabled HVAC, lighting, and access control' },
    { title: 'High-Speed Connectivity', desc: 'Fiber optic infrastructure with redundant ISPs' },
    { title: 'Conference Facilities', desc: 'Bookable boardrooms and video conferencing suites' },
    { title: 'Wellness Amenities', desc: 'On-site gym, meditation rooms, and green spaces' },
    { title: '24/7 Security', desc: 'Biometric access, CCTV, and dedicated security team' },
  ];

  return (
    <section id="office" className="py-24 bg-slate-950" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}>
            <p className="text-blue-400 text-sm tracking-[0.2em] uppercase mb-3">Office Spaces</p>
            <h2 className="text-4xl font-bold text-white mb-6">Built for Performance</h2>
            <p className="text-slate-400 mb-8">Our office spaces are engineered for productivity. Every detail — from acoustics to air quality — is optimized for your team's success.</p>
            <div className="grid grid-cols-2 gap-4">
              {features.map((f, i) => (
                <motion.div key={f.title} initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }} className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-white mb-1">{f.title}</h4>
                  <p className="text-xs text-slate-400">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }} className="relative">
            <img src={officeImage} alt="Office Space" className="w-full h-[500px] object-cover rounded-lg shadow-xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============ RETAIL SECTION ============
function RetailSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const units = [
    { name: 'Ground Floor Unit A', sqft: '2,400', type: 'Restaurant / Café', price: '$12K/mo' },
    { name: 'Ground Floor Unit B', sqft: '1,800', type: 'Retail / Showroom', price: '$9.5K/mo' },
    { name: 'Mezzanine Level', sqft: '3,200', type: 'Boutique / Gallery', price: '$15K/mo' },
  ];

  return (
    <section id="retail" className="py-24 bg-slate-900" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="text-blue-400 text-sm tracking-[0.2em] uppercase mb-3">Retail</p>
          <h2 className="text-4xl font-bold text-white mb-4">Retail Opportunities</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">High-foot-traffic retail spaces with premium street frontage and modern infrastructure.</p>
        </motion.div>

        <div className="relative mb-12 overflow-hidden rounded-lg">
          <img src={retailImage} alt="Retail Space" className="w-full h-64 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {units.map((u, i) => (
            <motion.div key={u.name} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.15 }} className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-blue-500/50 transition-all">
              <h3 className="text-lg font-bold text-white mb-2">{u.name}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-400">
                  <span>Size</span>
                  <span className="text-white">{u.sqft} sq ft</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Type</span>
                  <span className="text-white">{u.type}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Lease</span>
                  <span className="text-blue-400 font-semibold">{u.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ SERVICES ============
function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const services = [
    { title: 'Tenant Representation', desc: 'We advocate for your interests throughout the leasing process' },
    { title: 'Space Planning', desc: 'Custom floor plans optimized for your workflow and growth' },
    { title: 'Fit-Out Management', desc: 'End-to-end project management for your build-out' },
    { title: 'Property Management', desc: 'Full-service maintenance, cleaning, and building operations' },
  ];

  return (
    <section id="services" className="py-24 bg-slate-950" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="text-blue-400 text-sm tracking-[0.2em] uppercase mb-3">What We Offer</p>
          <h2 className="text-4xl font-bold text-white mb-4">Services</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }} className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-blue-500/30 transition-all">
              <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
              <p className="text-slate-400">{s.desc}</p>
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
    <section id="contact" className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: `url(${heroImage})` }} />
      <div className="max-w-4xl mx-auto px-6 relative z-10" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
          <p className="text-blue-400 text-sm tracking-[0.2em] uppercase mb-3">Get Started</p>
          <h2 className="text-4xl font-bold text-white mb-4">Inquire About Availability</h2>
          <p className="text-slate-400">Tell us about your space requirements and our team will match you with the perfect location.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="bg-slate-800/80 backdrop-blur border border-slate-700 rounded-xl p-8">
          <div className="grid md:grid-cols-2 gap-6">
            <input type="text" placeholder="Company Name" className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none" />
            <input type="email" placeholder="Email Address" className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none" />
            <select className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-slate-400 focus:border-blue-500 focus:outline-none">
              <option>Space Type...</option>
              <option>Office</option>
              <option>Retail</option>
              <option>Mixed Use</option>
            </select>
            <input type="text" placeholder="Required Sq Ft" className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none" />
          </div>
          <textarea placeholder="Tell us about your requirements..." rows={4} className="w-full mt-6 bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none resize-none" />
          <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">Submit Inquiry</button>
        </motion.div>
      </div>
    </section>
  );
}

// ============ FOOTER ============
function Footer() {
  return (
    <footer className="bg-slate-950 py-12 px-6 border-t border-slate-800">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-white text-lg font-bold">AXIS<span className="text-blue-400">.</span></div>
        <div className="text-slate-500 text-sm">© 2026 Axis Commercial. All rights reserved.</div>
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
      <Spaces />
      <OfficeSection />
      <RetailSection />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
}
