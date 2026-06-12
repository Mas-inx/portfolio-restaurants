import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// ============ IMAGES ============
const heroImage = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&q=85";
const familyHomeImage = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=85";
const neighborhoodImage = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=85";
const interiorImage = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=85";
const gardenImage = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=85";

// ============ NAVIGATION ============
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect x="2" y="2" width="24" height="24" rx="6" fill="#059669" />
            <path d="M8 18V12L14 8L20 12V18H16V14H12V18H8Z" fill="white" />
          </svg>
          <span className="font-bold text-slate-800 text-lg">Homemap</span>
        </a>
        <div className="hidden md:flex items-center gap-6 text-sm text-slate-600">
          <a href="#homes" className="hover:text-emerald-600 transition-colors">Homes</a>
          <a href="#neighborhoods" className="hover:text-emerald-600 transition-colors">Neighborhoods</a>
          <a href="#features" className="hover:text-emerald-600 transition-colors">Features</a>
          <a href="#testimonials" className="hover:text-emerald-600 transition-colors">Stories</a>
          <a href="#contact" className="bg-emerald-600 text-white px-5 py-2 rounded-full hover:bg-emerald-700 transition-colors">Get Started</a>
        </div>
      </div>
    </nav>
  );
}

// ============ HERO ============
function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/40" />
      </div>
      <div className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-sm text-emerald-700 font-medium">Family-first home search</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
            Find the home your <span className="text-emerald-600">family deserves.</span>
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-lg">
            Explore neighborhoods, compare schools, and discover homes that match your family's lifestyle — all on one interactive map.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#homes" className="bg-emerald-600 text-white px-6 py-3 rounded-full font-medium hover:bg-emerald-700 transition-all hover:shadow-lg">Browse Homes</a>
            <a href="#neighborhoods" className="border border-slate-200 text-slate-700 px-6 py-3 rounded-full font-medium hover:border-emerald-300 transition-all">Explore Map</a>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
          <img src={familyHomeImage} alt="Family Home" className="w-full rounded-2xl shadow-2xl" />
        </motion.div>
      </div>
    </section>
  );
}

// ============ FEATURED HOMES ============
function FeaturedHomes() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const homes = [
    { name: 'Maple Ridge Colonial', beds: 4, baths: 3, sqft: '2,800', price: '$685,000', image: familyHomeImage, tag: 'New Listing' },
    { name: 'Oakwood Family Estate', beds: 5, baths: 4, sqft: '3,400', price: '$895,000', image: gardenImage, tag: 'Open House' },
    { name: 'Riverside Modern', beds: 3, baths: 2, sqft: '2,100', price: '$525,000', image: neighborhoodImage, tag: 'Price Reduced' },
  ];

  return (
    <section id="homes" className="py-24 bg-slate-50" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="text-emerald-600 text-sm font-medium tracking-wide uppercase mb-3">Featured Listings</p>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Homes Your Family Will Love</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Hand-picked properties in top school districts with family-friendly amenities.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {homes.map((h, i) => (
            <motion.div key={h.name} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.15 }} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group">
              <div className="relative overflow-hidden h-56">
                <img src={h.image} alt={h.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-3 left-3 bg-emerald-600 text-white text-xs font-medium px-3 py-1 rounded-full">{h.tag}</div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-1">{h.name}</h3>
                <div className="text-2xl font-bold text-emerald-600 mb-3">{h.price}</div>
                <div className="flex gap-4 text-sm text-slate-500 border-t border-slate-100 pt-3">
                  <span>{h.beds} Beds</span>
                  <span>{h.baths} Baths</span>
                  <span>{h.sqft} sqft</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ NEIGHBORHOODS ============
function Neighborhoods() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const areas = [
    { name: 'Maplewood Heights', schools: 'A+', parks: '12', walkScore: 92, image: neighborhoodImage },
    { name: 'Oakwood Village', schools: 'A', parks: '8', walkScore: 88, image: interiorImage },
    { name: 'Riverside Commons', schools: 'A+', parks: '15', walkScore: 95, image: gardenImage },
  ];

  return (
    <section id="neighborhoods" className="py-24 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="text-emerald-600 text-sm font-medium tracking-wide uppercase mb-3">Explore Areas</p>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Family-Friendly Neighborhoods</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Discover communities with top-rated schools, parks, and everything your family needs.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {areas.map((a, i) => (
            <motion.div key={a.name} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.15 }} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl mb-4">
                <img src={a.image} alt={a.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white font-semibold text-lg">{a.name}</div>
              </div>
              <div className="flex justify-between text-sm">
                <div className="text-center">
                  <div className="font-bold text-emerald-600">{a.schools}</div>
                  <div className="text-slate-400 text-xs">Schools</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-emerald-600">{a.parks}</div>
                  <div className="text-slate-400 text-xs">Parks</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-emerald-600">{a.walkScore}</div>
                  <div className="text-slate-400 text-xs">Walk Score</div>
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
    { title: 'School Ratings', desc: 'Compare school districts and ratings side by side', icon: 'school' },
    { title: 'Commute Times', desc: 'Calculate commute to work, school, and activities', icon: 'car' },
    { title: 'Safety Scores', desc: 'Real crime data and neighborhood safety ratings', icon: 'shield' },
    { title: 'Price History', desc: 'Track property values and market trends over time', icon: 'chart' },
    { title: 'Virtual Tours', desc: 'Explore homes from the comfort of your couch', icon: 'house' },
    { title: 'Family Matching', desc: 'AI-powered recommendations based on your needs', icon: 'family' },
  ];

  return (
    <section id="features" className="py-24 bg-emerald-50" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="text-emerald-600 text-sm font-medium tracking-wide uppercase mb-3">Why Homemap</p>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Everything You Need in One Place</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-slate-800 mb-2">{f.title}</h3>
              <p className="text-sm text-slate-500">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ TESTIMONIALS ============
function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const stories = [
    { name: 'Sarah & Mike', location: 'Maplewood Heights', text: 'Homemap helped us find the perfect home near top-rated schools. The neighborhood insights were invaluable.', image: familyHomeImage },
    { name: 'The Johnsons', location: 'Riverside Commons', text: 'We compared 3 neighborhoods in minutes. The commute calculator alone saved us hours of research.', image: gardenImage },
  ];

  return (
    <section id="testimonials" className="py-24 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="text-emerald-600 text-sm font-medium tracking-wide uppercase mb-3">Family Stories</p>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Families Who Found Home</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8">
          {stories.map((s, i) => (
            <motion.div key={s.name} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.15 }} className="bg-slate-50 rounded-2xl p-8">
              <p className="text-slate-600 italic mb-6">"{s.text}"</p>
              <div className="flex items-center gap-4">
                <img src={s.image} alt={s.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <div className="font-semibold text-slate-800">{s.name}</div>
                  <div className="text-sm text-slate-500">{s.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ CTA / CONTACT ============
function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="py-24 bg-emerald-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: `url(${heroImage})` }} />
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Find Your Family's Home?</h2>
          <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">Start exploring today. Our interactive map makes it easy to find the perfect neighborhood and home for your family.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <input type="text" placeholder="Enter your city or ZIP" className="bg-white/20 backdrop-blur border border-white/30 text-white placeholder-white/60 px-6 py-3 rounded-full w-72 focus:outline-none focus:border-white" />
            <button className="bg-white text-emerald-700 px-8 py-3 rounded-full font-medium hover:bg-emerald-50 transition-colors">Start Searching</button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============ FOOTER ============
function Footer() {
  return (
    <footer className="bg-slate-900 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
            <rect x="2" y="2" width="24" height="24" rx="6" fill="#059669" />
            <path d="M8 18V12L14 8L20 12V18H16V14H12V18H8Z" fill="white" />
          </svg>
          <span className="font-bold text-white">Homemap Studio</span>
        </div>
        <div className="text-slate-500 text-sm">© 2026 Homemap Studio. All rights reserved.</div>
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
      <FeaturedHomes />
      <Neighborhoods />
      <Features />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
