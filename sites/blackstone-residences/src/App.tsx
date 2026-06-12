import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// ============ IMAGES ============
const heroImage = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=85";
const interiorImage = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=85";
const neighborhoodImage = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=85";
const amenityImage = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=85";
const kitchenImage = "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=85";

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
        <a href="#hero" className="font-serif text-xl text-white tracking-wide">Blackstone</a>
        <div className="hidden md:flex items-center gap-8 text-sm text-stone-300">
          <a href="#residences" className="hover:text-gold-400 transition-colors">Residences</a>
          <a href="#amenities" className="hover:text-gold-400 transition-colors">Amenities</a>
          <a href="#neighborhood" className="hover:text-gold-400 transition-colors">Neighborhood</a>
          <a href="#gallery" className="hover:text-gold-400 transition-colors">Gallery</a>
          <a href="#contact" className="bg-gold-600 text-white px-5 py-2 rounded hover:bg-gold-700 transition-colors">Schedule Tour</a>
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      </div>
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-gold-400 text-sm tracking-[0.3em] uppercase mb-4">
          Luxury Living Redefined
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-5xl md:text-7xl font-serif text-white leading-tight mb-6">
          Where Elegance Meets Home
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="text-stone-300 text-lg max-w-2xl mx-auto mb-8">
          Discover residences crafted with meticulous attention to detail, set within one of the city's most prestigious neighborhoods.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="flex flex-wrap gap-4 justify-center">
          <a href="#residences" className="bg-gold-600 text-white px-8 py-3 rounded font-medium hover:bg-gold-700 transition-all">View Residences</a>
          <a href="#contact" className="border border-white/30 text-white px-8 py-3 rounded font-medium hover:bg-white/10 transition-all">Schedule a Tour</a>
        </motion.div>
      </div>
    </section>
  );
}

// ============ RESIDENCES ============
function Residences() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const properties = [
    { name: 'The Penthouse', beds: 4, baths: 4, sqft: '3,800', price: '$4.2M', image: interiorImage },
    { name: 'The Grand Suite', beds: 3, baths: 3, sqft: '2,600', price: '$2.8M', image: kitchenImage },
    { name: 'The Terrace', beds: 2, baths: 2, sqft: '1,800', price: '$1.9M', image: amenityImage },
  ];

  return (
    <section id="residences" className="py-24 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="text-gold-600 text-sm tracking-[0.2em] uppercase mb-3">Our Collection</p>
          <h2 className="text-4xl font-serif text-stone-900 mb-4">Exceptional Residences</h2>
          <p className="text-stone-500 max-w-2xl mx-auto">Each residence is a masterpiece of design, offering unparalleled luxury and sophisticated living spaces.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {properties.map((p, i) => (
            <motion.div key={p.name} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.15 }} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img src={p.image} alt={p.name} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-2xl font-serif font-bold">{p.price}</div>
                </div>
              </div>
              <h3 className="text-xl font-serif text-stone-900 mb-2">{p.name}</h3>
              <div className="flex gap-4 text-sm text-stone-500">
                <span>{p.beds} Beds</span>
                <span>•</span>
                <span>{p.baths} Baths</span>
                <span>•</span>
                <span>{p.sqft} sq ft</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ AMENITIES ============
function Amenities() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const amenities = [
    { title: 'Rooftop Pool & Terrace', desc: 'Infinity pool with panoramic city views' },
    { title: 'Private Fitness Center', desc: 'State-of-the-art equipment, personal trainers' },
    { title: 'Concierge Service', desc: '24/7 white-glove concierge at your service' },
    { title: 'Wine Cellar & Lounge', desc: 'Temperature-controlled storage and tasting room' },
    { title: 'Spa & Wellness', desc: 'Sauna, steam room, and treatment suites' },
    { title: 'Private Parking', desc: 'Underground valet parking with EV charging' },
  ];

  return (
    <section id="amenities" className="py-24 bg-stone-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${amenityImage})` }} />
      <div className="max-w-6xl mx-auto px-6 relative z-10" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="text-gold-400 text-sm tracking-[0.2em] uppercase mb-3">World-Class</p>
          <h2 className="text-4xl font-serif text-white mb-4">Amenities & Services</h2>
          <p className="text-stone-400 max-w-2xl mx-auto">Every detail designed to elevate your daily experience.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenities.map((a, i) => (
            <motion.div key={a.title} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }} className="bg-stone-800/60 backdrop-blur border border-stone-700 rounded-lg p-6 hover:border-gold-600/50 transition-all">
              <h3 className="text-lg font-serif text-white mb-2">{a.title}</h3>
              <p className="text-stone-400 text-sm">{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ NEIGHBORHOOD ============
function Neighborhood() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="neighborhood" className="py-24 bg-stone-50" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}>
            <p className="text-gold-600 text-sm tracking-[0.2em] uppercase mb-3">The Location</p>
            <h2 className="text-4xl font-serif text-stone-900 mb-6">A Prestigious Address</h2>
            <p className="text-stone-600 mb-6">Nestled in the heart of the city's most coveted neighborhood, Blackstone Residences offers unparalleled access to fine dining, cultural landmarks, and premier shopping destinations.</p>
            <div className="space-y-3">
              {['5 min to Central Park', 'Walking distance to Michelin restaurants', 'Top-rated schools nearby', 'Direct subway access'].map(item => (
                <div key={item} className="flex items-center gap-3 text-stone-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }} className="relative">
            <img src={neighborhoodImage} alt="Neighborhood" className="w-full h-96 object-cover rounded-lg shadow-xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============ GALLERY ============
function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const images = [heroImage, interiorImage, kitchenImage, amenityImage, neighborhoodImage, heroImage];

  return (
    <section id="gallery" className="py-24 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
          <p className="text-gold-600 text-sm tracking-[0.2em] uppercase mb-3">Visual Tour</p>
          <h2 className="text-4xl font-serif text-stone-900 mb-4">Gallery</h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }} className={`overflow-hidden rounded-lg ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
              <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" style={{ minHeight: i === 0 ? '400px' : '200px' }} />
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
    <section id="contact" className="py-24 bg-stone-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: `url(${heroImage})` }} />
      <div className="max-w-4xl mx-auto px-6 relative z-10" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
          <p className="text-gold-400 text-sm tracking-[0.2em] uppercase mb-3">Private Viewings</p>
          <h2 className="text-4xl font-serif text-white mb-4">Schedule Your Tour</h2>
          <p className="text-stone-400">Experience Blackstone Residences in person. Our team is ready to guide you through your future home.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="bg-stone-800/80 backdrop-blur border border-stone-700 rounded-xl p-8">
          <div className="grid md:grid-cols-2 gap-6">
            <input type="text" placeholder="Full Name" className="bg-stone-700/50 border border-stone-600 rounded-lg px-4 py-3 text-white placeholder-stone-400 focus:border-gold-500 focus:outline-none" />
            <input type="email" placeholder="Email Address" className="bg-stone-700/50 border border-stone-600 rounded-lg px-4 py-3 text-white placeholder-stone-400 focus:border-gold-500 focus:outline-none" />
            <input type="tel" placeholder="Phone Number" className="bg-stone-700/50 border border-stone-600 rounded-lg px-4 py-3 text-white placeholder-stone-400 focus:border-gold-500 focus:outline-none" />
            <select className="bg-stone-700/50 border border-stone-600 rounded-lg px-4 py-3 text-stone-400 focus:border-gold-500 focus:outline-none">
              <option>Interested In...</option>
              <option>The Penthouse</option>
              <option>The Grand Suite</option>
              <option>The Terrace</option>
            </select>
          </div>
          <textarea placeholder="Message" rows={4} className="w-full mt-6 bg-stone-700/50 border border-stone-600 rounded-lg px-4 py-3 text-white placeholder-stone-400 focus:border-gold-500 focus:outline-none resize-none" />
          <button className="w-full mt-6 bg-gold-600 text-white py-3 rounded-lg font-medium hover:bg-gold-700 transition-colors">Request Private Viewing</button>
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
        <div className="font-serif text-white text-lg">Blackstone Residences</div>
        <div className="text-stone-500 text-sm">© 2026 Blackstone Residences. All rights reserved.</div>
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
      <Residences />
      <Amenities />
      <Neighborhood />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
}
