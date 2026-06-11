import { useState, useEffect, useCallback, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import {
  featuredListings,
  advisoryServices,
  neighborhoods,
  sellingServices,
  marketStats,
  testimonials,
  type Listing,
} from './data';

/* ── Reusable Section Wrapper ── */
function Section({
  children,
  className = '',
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`px-6 md:px-12 lg:px-20 py-24 md:py-32 ${className}`}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}

function SectionHeading({
  label,
  title,
  subtitle,
  light = false,
}: {
  label: string;
  title: string;
  subtitle?: string;
  light?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="mb-16 md:mb-20"
    >
      <span className={`text-xs tracking-[0.2em] uppercase font-medium ${light ? 'text-champagne' : 'text-warm-gray-500'}`}>
        {label}
      </span>
      <h2 className={`font-serif-display text-4xl md:text-5xl lg:text-6xl mt-3 leading-tight ${light ? 'text-white' : 'text-jet-black'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 max-w-2xl text-lg leading-relaxed ${light ? 'text-warm-gray-300' : 'text-warm-gray-500'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

function FadeIn({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Navbar ── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#listings', label: 'Listings' },
    { href: '#advisory', label: 'Advisory' },
    { href: '#neighborhoods', label: 'Neighborhoods' },
    { href: '#selling', label: 'Selling' },
    { href: '#insight', label: 'Insight' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-off-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between h-20 md:h-24">
        <a href="#" className="font-serif-display text-2xl md:text-3xl tracking-tight text-jet-black">
          Atelier<span className="text-champagne font-light">Estates</span>
        </a>
        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm tracking-wide text-warm-gray-700 hover:text-jet-black transition-colors uppercase"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="px-6 py-3 bg-jet-black text-white text-sm tracking-wider uppercase hover:bg-charcoal transition-colors"
          >
            Inquire
          </a>
        </div>
        <button
          className="md:hidden text-jet-black text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-off-white border-t border-warm-gray-300/30 px-6 pb-8"
        >
          <div className="flex flex-col gap-4 pt-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm tracking-wide text-warm-gray-700 hover:text-jet-black uppercase"
              >
                {l.label}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}

/* ── Hero ── */
function Hero() {
  return (
    <section className="relative h-screen min-h-[660px] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=85)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-champagne text-sm tracking-[0.25em] uppercase"
        >
          Luxury Real Estate Advisory
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif-display text-white text-5xl md:text-7xl lg:text-8xl mt-6 leading-tight"
        >
          Property advisory for homes that rarely reach the open market.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-white/70 text-lg md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed"
        >
          Discreet representation for the world's most exceptional properties.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <a
            href="#listings"
            className="px-8 py-4 bg-champagne text-jet-black text-sm tracking-wider uppercase font-medium hover:bg-champagne-light transition-colors"
          >
            View Listings
          </a>
          <a
            href="#contact"
            className="px-8 py-4 border border-white/30 text-white text-sm tracking-wider uppercase hover:bg-white/10 transition-colors"
          >
            Private Consultation
          </a>
        </motion.div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          className="text-white/40 text-2xl"
        >
          ↓
        </motion.div>
      </div>
    </section>
  );
}

/* ── Featured Listings Card ── */
function ListingCard({ listing, index }: { listing: Listing; index: number }) {
  return (
    <FadeIn delay={index * 0.15} className="group cursor-pointer">
      <div className="relative overflow-hidden">
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={listing.image}
            alt={listing.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="mt-5">
        <h3 className="font-serif-display text-xl md:text-2xl text-jet-black">{listing.title}</h3>
        <p className="text-champagne font-medium text-lg mt-1">{listing.price}</p>
        <p className="text-warm-gray-500 text-sm mt-1">{listing.location}</p>
        <div className="flex gap-4 mt-3 text-sm text-warm-gray-700">
          <span>{listing.beds} Beds</span>
          <span>{listing.baths} Baths</span>
          <span>{listing.sqft.toLocaleString()} Sq Ft</span>
        </div>
      </div>
    </FadeIn>
  );
}

/* ── Advisory Service Card ── */
function ServiceCard({
  service,
  index,
}: {
  service: { title: string; description: string; icon: string };
  index: number;
}) {
  return (
    <FadeIn delay={index * 0.1} className="group border border-warm-gray-300/40 p-8 hover:border-champagne transition-colors duration-300">
      <span className="text-3xl">{service.icon}</span>
      <h3 className="font-serif-display text-xl mt-4 text-jet-black">{service.title}</h3>
      <p className="text-warm-gray-500 text-sm mt-3 leading-relaxed">{service.description}</p>
    </FadeIn>
  );
}

/* ── Neighborhood Card ── */
function NeighborhoodCard({
  item,
  index,
}: {
  item: { name: string; description: string; image: string };
  index: number;
}) {
  return (
    <FadeIn delay={index * 0.1} className="group relative overflow-hidden aspect-square">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <h3 className="font-serif-display text-xl md:text-2xl text-white">{item.name}</h3>
        <p className="text-white/60 text-sm mt-2 leading-relaxed">{item.description}</p>
      </div>
    </FadeIn>
  );
}

/* ── Market Stat Card ── */
function StatCard({
  stat,
  index,
}: {
  stat: { label: string; value: string; change: string };
  index: number;
}) {
  return (
    <FadeIn delay={index * 0.1} className="text-center p-8 border border-warm-gray-300/40">
      <div className="font-serif-display text-4xl md:text-5xl text-jet-black">{stat.value}</div>
      <div className="text-sm text-warm-gray-500 mt-2 uppercase tracking-wider">{stat.label}</div>
      <div
        className={`text-sm mt-1 font-medium ${
          stat.change.startsWith('+') ? 'text-green-600' : 'text-warm-gray-500'
        }`}
      >
        {stat.change} vs LY
      </div>
    </FadeIn>
  );
}

/* ── Testimonial ── */
function TestimonialCard({
  item,
  index,
}: {
  item: { quote: string; author: string };
  index: number;
}) {
  return (
    <FadeIn delay={index * 0.15}>
      <div className="p-8 md:p-10 border border-warm-gray-300/40">
        <span className="font-serif-display text-6xl leading-none text-champagne">"</span>
        <p className="font-serif-display text-lg md:text-xl text-jet-black mt-2 leading-relaxed italic">
          {item.quote}
        </p>
        <p className="text-warm-gray-500 text-sm mt-6 tracking-wide">{item.author}</p>
      </div>
    </FadeIn>
  );
}

/* ── Contact Form ── */
function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  }, []);

  return (
    <Section id="contact" className="bg-jet-black !py-24">
      <div className="max-w-3xl mx-auto text-center">
        <SectionHeading
          label="Inquire"
          title="Arrange a Private Consultation"
          subtitle="Our advisors respond within 24 hours. All inquiries are handled with complete discretion."
          light
        />
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-champagne p-10 border border-champagne/30"
          >
            <p className="text-2xl font-serif-display">Thank you for reaching out.</p>
            <p className="text-warm-gray-300 mt-3">
              A senior advisor will contact you shortly to arrange your private consultation.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-5 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-white/60 text-xs tracking-wider uppercase block mb-2">Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-champagne transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-white/60 text-xs tracking-wider uppercase block mb-2">Email</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-champagne transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label className="text-white/60 text-xs tracking-wider uppercase block mb-2">Interest</label>
              <select
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white/70 focus:outline-none focus:border-champagne transition-colors"
              >
                <option value="">Select an option</option>
                <option value="buying">Buying a Property</option>
                <option value="selling">Selling a Property</option>
                <option value="off-market">Off-Market Access</option>
                <option value="relocation">Relocation Services</option>
                <option value="other">General Inquiry</option>
              </select>
            </div>
            <div>
              <label className="text-white/60 text-xs tracking-wider uppercase block mb-2">Message</label>
              <textarea
                rows={4}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-champagne transition-colors resize-none"
                placeholder="Tell us about your needs..."
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-champagne text-jet-black text-sm tracking-wider uppercase font-medium hover:bg-champagne-light transition-colors"
            >
              Send Inquiry
            </button>
          </form>
        )}
      </div>
    </Section>
  );
}

/* ── Footer ── */
function Footer() {
  return (
    <footer className="bg-jet-black border-t border-white/10 px-6 md:px-12 lg:px-20 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="font-serif-display text-2xl text-white">
              Atelier<span className="text-champagne font-light">Estates</span>
            </div>
            <p className="text-warm-gray-500 text-sm mt-4 leading-relaxed max-w-xs">
              Discreet luxury real estate advisory for the world's most discerning clients.
            </p>
          </div>
          <div>
            <h4 className="text-white/50 text-xs tracking-[0.2em] uppercase mb-4">Services</h4>
            <ul className="space-y-2">
              {['Private Acquisitions', 'Portfolio Sales', 'Off-Market Access', 'Relocation'].map(
                (s) => (
                  <li key={s}>
                    <a href="#advisory" className="text-sm text-warm-gray-500 hover:text-champagne transition-colors">
                      {s}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>
          <div>
            <h4 className="text-white/50 text-xs tracking-[0.2em] uppercase mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-warm-gray-500">
              <li>New York | London | Los Angeles</li>
              <li>
                <a href="mailto:discreet@atelierestates.com" className="hover:text-champagne transition-colors">
                  discreet@atelierestates.com
                </a>
              </li>
              <li>+1 (212) 555‑0189</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/5 text-center text-xs text-warm-gray-500">
          &copy; {new Date().getFullYear()} Atelier Estates. All inquiries confidential.
        </div>
      </div>
    </footer>
  );
}

/* ── App ── */
export default function App() {
  return (
    <>
      <Navbar />
      <Hero />

      {/* Featured Listings */}
      <Section id="listings">
        <SectionHeading
          label="Featured"
          title="Selected Properties"
          subtitle="A curated portfolio of the world's most exceptional residences, each vetted for quality, location, and investment potential."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {featuredListings.map((l, i) => (
            <ListingCard key={l.id} listing={l} index={i} />
          ))}
        </div>
      </Section>

      {/* Private Advisory */}
      <Section id="advisory" className="bg-jet-black !py-24">
        <SectionHeading
          label="Advisory"
          title="Private Advisory"
          subtitle="Every client relationship begins with a deep understanding of your goals. Our services are tailored, never templated."
          light
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advisoryServices.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </Section>

      {/* Neighborhoods */}
      <Section id="neighborhoods">
        <SectionHeading
          label="Locations"
          title="Curated Neighborhoods"
          subtitle="Each neighborhood we serve has been carefully evaluated for its lifestyle, investment profile, and long-term value."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {neighborhoods.map((n, i) => (
            <NeighborhoodCard key={n.name} item={n} index={i} />
          ))}
        </div>
      </Section>

      {/* Selling With Atelier */}
      <Section id="selling" className="bg-charcoal !py-24">
        <SectionHeading
          label="Selling"
          title="Selling With Atelier"
          subtitle="From staging to closing, every step is orchestrated to maximize your property's value while maintaining complete privacy."
          light
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sellingServices.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </Section>

      {/* Market Insight */}
      <Section id="insight">
        <SectionHeading
          label="Intelligence"
          title="Market Insight"
          subtitle="Proprietary data and analysis that inform every strategic decision we make for our clients."
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {marketStats.map((s, i) => (
            <StatCard key={s.label} stat={s} index={i} />
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section className="bg-off-white !py-24 border-y border-warm-gray-300/30">
        <SectionHeading
          label="Testimonials"
          title="What Our Clients Say"
          subtitle="Our reputation is built on discretion and results that speak for themselves."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} item={t} index={i} />
          ))}
        </div>
      </Section>

      {/* CTA / Contact */}
      <ContactForm />

      {/* Footer */}
      <Footer />
    </>
  );
}
