import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// ============ IMAGES ============
const heroImage = 'https://images.unsplash.com/photo-1545324416-1221fde3c2a6?w=1600&q=85';
const amenityImages = [
  'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&q=85',
  'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=85',
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=85',
];
const neighborhoodImage = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=85';

// ============ NAVIGATION ============
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-zinc-950/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#hero" className="text-xl font-bold text-white tracking-tight">GRID<span className="text-lime-400">HAUS</span></a>
        <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
          <a href="#residences" className="hover:text-lime-400 transition-colors">Residences</a>
          <a href="#amenities" className="hover:text-lime-400 transition-colors">Amenities</a>
          <a href="#neighborhood" className="hover:text-lime-400 transition-colors">Neighborhood</a>
          <a href="#gallery" className="hover:text-lime-400 transition-colors">Gallery</a>
          <a href="#contact" className="bg-lime-500 text-zinc-950 px-5 py-2 rounded font-semibold hover:bg-lime-400 transition-colors">Book a Tour</a>
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-zinc-950/90" />
      </div>
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-lime-400 text-sm tracking-[0.3em] uppercase mb-4">
          Modern Urban Living
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
          Design Meets <span className="text-lime-400">Living</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="text-zinc-300 text-lg max-w-2xl mx-auto mb-8">
          Architecturally stunning residences in the heart of the city. Where clean lines, open spaces, and thoughtful design create your perfect home.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="flex flex-wrap gap-4 justify-center">
          <a href="#residences" className="bg-lime-500 text-zinc-950 px-8 py-3 rounded font-semibold hover:bg-lime-400 transition-all">Explore Residences</a>
          <a href="#contact" className="border border-white/30 text-white px-8 py-3 rounded font-medium hover:bg-white/10 transition-all">Schedule Visit</a>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1.5 h-1.5 bg-lime-400 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}

// ============ RESIDENCES ============
function Residences() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const properties = [
    { name: 'The Loft', beds: 1, baths: 1, sqft: '850', price: '$620K', image: amenityImages[0] },
    { name: 'The Penthouse', beds: 3, baths: 2, sqft: '2,100', price: '$1.8M', image: amenityImages[1] },
    { name: 'The Studio Plus', beds: 2, baths: 1, sqft: '1,200', price: '$890K', image: amenityImages[2] },
  ];

  return (
    <section id="residences" className="py-24 bg-zinc-950" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="text-lime-400 text-sm tracking-[0.2em] uppercase mb-3">The Collection</p>
          <h2 className="text-4xl font-bold text-white mb-4">Curated Residences</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">Every unit is designed with precision — open floor plans, floor-to-ceiling windows, and premium finishes throughout.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {properties.map((p, i) => (
            <motion.div key={p.name} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.15 }} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img src={p.image} alt={p.name} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-2xl font-bold">{p.price}</div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{p.name}</h3>
              <div className="flex gap-4 text-sm text-zinc-400">
                <span>{p.beds} Bed{p.beds > 1 ? 's' : ''}</span>
                <span>•</span>
                <span>{p.baths} Bath{p.baths > 1 ? 's' : ''}</span>
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
    { title: 'Rooftop Terrace', desc: 'Panoramic city views with lounge seating and BBQ areas', image: amenityImages[0] },
    { title: 'Fitness Center', desc: 'State-of-the-art equipment with personal training available', image: amenityImages[1] },
    { title: 'Co-Working Lounge', desc: 'High-speed WiFi, private pods, and meeting rooms', image: amenityImages[2] },
    { title: 'Concierge', desc: '24/7 front desk with package handling and guest management', image: amenityImages[0] },
    { title: 'Bike Storage', desc: 'Secure indoor storage with repair station', image: amenityImages[1] },
    { title: 'Pet Spa', desc: 'Grooming station and nearby dog park access', image: amenityImages[2] },
  ];

  return (
    <section id="amenities" className="py-24 bg-zinc-900" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="text-lime-400 text-sm tracking-[0.2em] uppercase mb-3">Lifestyle</p>
          <h2 className="text-4xl font-bold text-white mb-4">Amenities</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">Everything you need for modern living, all within your building.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenities.map((a, i) => (
            <motion.div key={a.title} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }} className="group overflow-hidden rounded-lg bg-zinc-800 border border-zinc-700 hover:border-lime-500/50 transition-all">
              <div className="h-40 overflow-hidden">
                <img src={a.image} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-1">{a.title}</h3>
                <p className="text-zinc-400 text-sm">{a.desc}</p>
              </div>
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
    <section id="neighborhood" className="py-24 bg-zinc-950" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}>
            <p className="text-lime-400 text-sm tracking-[0.2em] uppercase mb-3">The Location</p>
            <h2 className="text-4xl font-bold text-white mb-6">In the Heart of It All</h2>
            <p className="text-zinc-400 mb-6">Steps from transit, dining, parks, and culture. Gridhaus puts you at the center of the city's most vibrant neighborhood.</p>
            <div className="space-y-3">
              {['2 min walk to subway', 'Top-rated restaurants nearby', 'Adjacent to central park', 'Bike-friendly infrastructure'].map(item => (
                <div key={item} className="flex items-center gap-3 text-zinc-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-lime-400" />
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
  const images = [heroImage, ...amenityImages, neighborhoodImage, amenityImages[0]];

  return (
    <section id="gallery" className="py-24 bg-zinc-900" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
          <p className="text-lime-400 text-sm tracking-[0.2em] uppercase mb-3">Visual Tour</p>
          <h2 className="text-4xl font-bold text-white mb-4">Gallery</h2>
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
    <section id="contact" className="py-24 bg-zinc-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: `url(${heroImage})` }} />
      <div className="max-w-4xl mx-auto px-6 relative z-10" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
          <p className="text-lime-400 text-sm tracking-[0.2em] uppercase mb-3">Get in Touch</p>
          <h2 className="text-4xl font-bold text-white mb-4">Schedule a Tour</h2>
          <p className="text-zinc-400">Experience Gridhaus in person. Our team is ready to show you your future home.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="bg-zinc-900/80 backdrop-blur border border-zinc-700 rounded-xl p-8">
          <div className="grid md:grid-cols-2 gap-6">
            <input type="text" placeholder="Full Name" className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:border-lime-500 focus:outline-none" />
            <input type="email" placeholder="Email Address" className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:border-lime-500 focus:outline-none" />
            <input type="tel" placeholder="Phone Number" className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:border-lime-500 focus:outline-none" />
            <select className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-zinc-500 focus:border-lime-500 focus:outline-none">
              <option>Interested In...</option>
              <option>The Loft</option>
              <option>The Penthouse</option>
              <option>The Studio Plus</option>
            </select>
          </div>
          <textarea placeholder="Message" rows={4} className="w-full mt-6 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:border-lime-500 focus:outline-none resize-none" />
          <button className="w-full mt-6 bg-lime-500 text-zinc-950 py-3 rounded-lg font-semibold hover:bg-lime-400 transition-colors">Request Private Tour</button>
        </motion.div>
      </div>
    </section>
  );
}

// ============ FOOTER ============
function Footer() {
  return (
    <footer className="bg-zinc-950 py-12 px-6 border-t border-zinc-800">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-white text-lg font-bold">GRID<span className="text-lime-400">HAUS</span></div>
        <div className="text-zinc-500 text-sm">© 2026 Gridhaus. All rights reserved.</div>
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
