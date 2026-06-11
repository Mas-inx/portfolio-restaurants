import { useState, useEffect, useCallback, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import {
  buyerJourney,
  featuredHomes,
  sellingSteps,
  neighborhoods,
  tools,
  reviews,
  type FeaturedHome,
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
    <section id={id} className={`px-6 md:px-12 lg:px-20 py-20 md:py-28 ${className}`}>
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className="mb-12 md:mb-16"
    >
      <span
        className={`text-xs tracking-[0.2em] uppercase font-medium ${
          light ? 'text-coral-light' : 'text-coral'
        }`}
      >
        {label}
      </span>
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl mt-3 font-bold leading-tight ${
          light ? 'text-white' : 'text-navy'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3 max-w-2xl text-lg leading-relaxed ${light ? 'text-white/60' : 'text-navy-light/70'}`}>
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay }}
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
    { href: '#journey', label: 'How It Works' },
    { href: '#homes', label: 'Homes' },
    { href: '#sell', label: 'Sell' },
    { href: '#neighborhoods', label: 'Neighborhoods' },
    { href: '#tools', label: 'Tools' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled ? 'bg-cream/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between h-16 md:h-20">
        <a href="#" className="text-xl md:text-2xl font-bold text-navy">
          NestFirst<span className="text-coral font-light">Realty</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-navy-light/80 hover:text-navy transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="px-5 py-2.5 bg-coral text-white text-sm font-medium rounded-full hover:bg-coral-dark transition-colors"
          >
            Get Started
          </a>
        </div>
        <button
          className="md:hidden text-navy text-2xl"
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
          className="md:hidden bg-cream border-t border-warm-beige/50 px-6 pb-6"
        >
          <div className="flex flex-col gap-3 pt-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-navy-light/80"
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
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-cream">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=85"
          alt="Family home"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/90 to-transparent" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-32 md:py-40">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-coral text-sm tracking-[0.2em] uppercase font-medium"
          >
            Your Family's Real Estate Partner
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-7xl mt-4 font-bold text-navy leading-tight"
          >
            Find the home that fits the life you're building.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-lg md:text-xl mt-4 text-navy-light/70 leading-relaxed max-w-xl"
          >
            We help growing families find homes with great schools, safe neighborhoods,
            and room for everything that matters.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a
              href="#homes"
              className="px-7 py-3.5 bg-navy text-white rounded-full font-medium hover:bg-navy-light transition-colors"
            >
              Browse Homes
            </a>
            <a
              href="#journey"
              className="px-7 py-3.5 border-2 border-navy/20 text-navy rounded-full font-medium hover:border-navy/40 transition-colors"
            >
              How We Help
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── Buyer Journey ── */
function BuyerJourney() {
  return (
    <Section id="journey" className="bg-white">
      <SectionHeading
        label="The Process"
        title="Your Buyer Journey"
        subtitle="We make buying a family home feel simple, exciting, and stress-free. Here's how we guide you from start to close."
      />
      <div className="relative">
        <div className="hidden md:block absolute top-24 left-[30px] bottom-24 w-0.5 bg-warm-beige/60" />
        <div className="space-y-10">
          {buyerJourney.map((step, i) => (
            <FadeIn key={step.title} delay={i * 0.12} className="flex gap-6 items-start">
              <div className="relative z-10 flex-shrink-0 w-14 h-14 rounded-full bg-coral text-white flex items-center justify-center text-2xl shadow-md">
                {step.icon}
              </div>
              <div className="pt-2">
                <span className="text-xs text-coral font-medium uppercase tracking-wider">Step {i + 1}</span>
                <h3 className="text-xl font-bold text-navy mt-1">{step.title}</h3>
                <p className="text-navy-light/70 mt-2 leading-relaxed">{step.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ── Featured Home Card ── */
function HomeCard({ home, index }: { home: FeaturedHome; index: number }) {
  return (
    <FadeIn delay={index * 0.15} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={home.image}
          alt={home.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-navy">{home.title}</h3>
          <span className="text-coral font-bold text-lg">{home.price}</span>
        </div>
        <p className="text-navy-light/60 text-sm mt-1">{home.location}</p>
        <div className="flex gap-3 mt-3 text-sm text-navy-light/70">
          <span>{home.beds} bed</span>
          <span>{home.baths} bath</span>
          <span>{home.sqft.toLocaleString()} sq ft</span>
        </div>
        <div className="mt-4 pt-4 border-t border-warm-beige/40 space-y-1.5 text-sm text-navy-light/70">
          <div className="flex items-center gap-2">
            <span className="text-coral">🏫</span>
            <span>{home.school}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-coral">🌳</span>
            <span>{home.yard}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-coral">🚗</span>
            <span>{home.commute}</span>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

/* ── Selling Process ── */
function SellingSection() {
  return (
    <Section id="sell" className="bg-navy !py-24">
      <SectionHeading
        label="Selling"
        title="Your Selling Process"
        subtitle="We help you sell your family home for the best price, with minimal disruption to your daily life."
        light
      />
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {sellingSteps.map((step, i) => (
          <FadeIn key={step.title} delay={i * 0.08} className="bg-white/5 rounded-xl p-6 text-center hover:bg-white/10 transition-colors">
            <div className="text-3xl mb-3">{step.icon}</div>
            <span className="text-coral text-xs font-medium uppercase tracking-wider">Step {i + 1}</span>
            <h3 className="text-white font-bold mt-2">{step.title}</h3>
            <p className="text-white/50 text-sm mt-2 leading-relaxed">{step.description}</p>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

/* ── Neighborhood Guide ── */
function NeighborhoodGuide() {
  return (
    <Section id="neighborhoods" className="bg-cream-dark/50">
      <SectionHeading
        label="Locations"
        title="Neighborhood Guide"
        subtitle="We know the schools, the parks, the commute patterns, and the community feel of every area we serve."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {neighborhoods.map((n, i) => (
          <FadeIn key={n.name} delay={i * 0.1} className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col md:flex-row">
            <div className="md:w-2/5 aspect-[4/3] md:aspect-auto overflow-hidden">
              <img src={n.image} alt={n.name} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="p-6 md:w-3/5 flex flex-col justify-center">
              <h3 className="text-xl font-bold text-navy">{n.name}</h3>
              <p className="text-navy-light/70 text-sm mt-2 leading-relaxed">{n.description}</p>
              <ul className="mt-3 space-y-1">
                {n.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-sm text-navy-light/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-coral flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

/* ── Tools ── */
function ToolsSection() {
  return (
    <Section id="tools">
      <SectionHeading
        label="Resources"
        title="Tools for Home Buyers & Sellers"
        subtitle="Practical resources to help you make confident decisions at every stage."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tools.map((tool, i) => (
          <FadeIn key={tool.title} delay={i * 0.1} className="bg-white rounded-2xl p-8 shadow-sm border border-warm-beige/30">
            <span className="text-3xl">{tool.icon}</span>
            <h3 className="text-lg font-bold text-navy mt-4">{tool.title}</h3>
            <p className="text-navy-light/70 text-sm mt-2 leading-relaxed">{tool.description}</p>
            <button className="mt-4 text-coral font-medium text-sm hover:text-coral-dark transition-colors">
              {tool.linkText} →
            </button>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

/* ── Reviews ── */
function ReviewsSection() {
  return (
    <Section className="bg-navy !py-24">
      <SectionHeading
        label="Testimonials"
        title="Hear From Happy Families"
        subtitle="Real stories from real families we've helped find their perfect home."
        light
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((r, i) => (
          <FadeIn key={i} delay={i * 0.12} className="bg-white/5 rounded-xl p-8">
            <div className="text-coral text-3xl leading-none mb-3">"</div>
            <p className="text-white/80 leading-relaxed text-sm">{r.quote}</p>
            <div className="mt-6 pt-4 border-t border-white/10">
              <p className="text-white font-bold text-sm">{r.author}</p>
              <p className="text-white/40 text-xs mt-0.5">{r.family}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

/* ── Featured Homes ── */
function FeaturedHomesSection() {
  return (
    <Section id="homes">
      <SectionHeading
        label="Listings"
        title="Featured Homes for Families"
        subtitle="Each home is selected with family life in mind — nearby schools, safe streets, room to grow."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredHomes.map((h, i) => (
          <HomeCard key={h.id} home={h} index={i} />
        ))}
      </div>
    </Section>
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
    <Section id="contact" className="bg-cream-dark/50 !py-24">
      <div className="max-w-2xl mx-auto text-center">
        <SectionHeading
          label="Let's Talk"
          title="Ready to Find Your Family's Home?"
          subtitle="Whether you're buying, selling, or just exploring — we're here to help with warmth, honesty, and real expertise."
        />
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-10 shadow-sm"
          >
            <div className="text-4xl mb-4">🎉</div>
            <p className="text-xl font-bold text-navy">Thanks for reaching out!</p>
            <p className="text-navy-light/70 mt-2">We'll be in touch within 24 hours to help with your home journey.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="text-left space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-navy-light/60 text-xs uppercase tracking-wider block mb-1.5 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-warm-beige/60 bg-white focus:outline-none focus:border-coral transition-colors text-navy"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-navy-light/60 text-xs uppercase tracking-wider block mb-1.5 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-warm-beige/60 bg-white focus:outline-none focus:border-coral transition-colors text-navy"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label className="text-navy-light/60 text-xs uppercase tracking-wider block mb-1.5 font-medium">
                Phone
              </label>
              <input
                type="tel"
                className="w-full px-4 py-3 rounded-xl border border-warm-beige/60 bg-white focus:outline-none focus:border-coral transition-colors text-navy"
                placeholder="(555) 123-4567"
              />
            </div>
            <div>
              <label className="text-navy-light/60 text-xs uppercase tracking-wider block mb-1.5 font-medium">
                I'm interested in
              </label>
              <select
                required
                className="w-full px-4 py-3 rounded-xl border border-warm-beige/60 bg-white focus:outline-none focus:border-coral transition-colors text-navy"
              >
                <option value="">Select...</option>
                <option value="buying">Buying a Home</option>
                <option value="selling">Selling My Home</option>
                <option value="both">Buying & Selling</option>
                <option value="exploring">Just Exploring</option>
              </select>
            </div>
            <div>
              <label className="text-navy-light/60 text-xs uppercase tracking-wider block mb-1.5 font-medium">
                Message
              </label>
              <textarea
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-warm-beige/60 bg-white focus:outline-none focus:border-coral transition-colors text-navy resize-none"
                placeholder="Tell us about what you're looking for..."
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 bg-coral text-white rounded-xl font-medium hover:bg-coral-dark transition-colors"
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
    <footer className="bg-navy px-6 md:px-12 lg:px-20 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="text-xl font-bold text-white">
              NestFirst<span className="text-coral font-light">Realty</span>
            </div>
            <p className="text-white/40 text-sm mt-3 leading-relaxed max-w-xs">
              Helping families find homes where they can grow, thrive, and build a life together.
            </p>
          </div>
          <div>
            <h4 className="text-white/50 text-xs uppercase tracking-wider mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li><a href="#journey" className="hover:text-coral transition-colors">Buying a Home</a></li>
              <li><a href="#sell" className="hover:text-coral transition-colors">Selling Your Home</a></li>
              <li><a href="#neighborhoods" className="hover:text-coral transition-colors">Neighborhood Guide</a></li>
              <li><a href="#tools" className="hover:text-coral transition-colors">Resources</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white/50 text-xs uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li>hello@nestfirstrealty.com</li>
              <li>(555) 234-5678</li>
              <li>123 Main Street, Oakwood</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-white/10 text-center text-xs text-white/30">
          &copy; {new Date().getFullYear()} NestFirst Realty. Built for families.
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
      <BuyerJourney />
      <FeaturedHomesSection />
      <SellingSection />
      <NeighborhoodGuide />
      <ToolsSection />
      <ReviewsSection />
      <ContactForm />
      <Footer />
    </>
  );
}
