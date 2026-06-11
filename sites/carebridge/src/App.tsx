import { motion } from 'framer-motion';
import { careServices, whoWeHelp, careMatchingSteps, trustBadges, familyUpdates, testimonials } from './data';

const easeOut = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOut, delay: i * 0.1 },
  }),
};

const gentleReveal = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut, delay: i * 0.12 },
  }),
};

function SectionHeader({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
      <span className="text-sage-green uppercase tracking-[0.3em] text-xs font-semibold mb-3 block">{label}</span>
      <h2 className="text-3xl md:text-5xl font-bold text-soft-charcoal leading-tight">{title}</h2>
      {subtitle && <p className="text-soft-charcoal/60 mt-4 max-w-xl mx-auto leading-relaxed">{subtitle}</p>}
    </motion.div>
  );
}

function Nav() {
  const links = ['Services', 'Who We Help', 'How It Works', 'Safety', 'Updates', 'Contact'];
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-warm-white/90 backdrop-blur-md border-b border-sage-green/10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="text-lg font-bold text-soft-charcoal tracking-tight">CareBridge <span className="text-sage-green">Home Health</span></span>
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm text-soft-charcoal/60 hover:text-sage-green transition-colors tracking-wide">{l}</a>
          ))}
          <a href="#contact" className="text-sm bg-sage-green text-white px-6 py-2.5 rounded-full hover:bg-sage-green-dark transition-colors">Get Care</a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=1600&q=85"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-warm-white/80" />
      </div>
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle at 30% 60%, #7BA88F 0%, transparent 50%), radial-gradient(circle at 70% 40%, #89B8D4 0%, transparent 50%)' }}
      />
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-sage-green uppercase tracking-[0.35em] text-xs md:text-sm mb-6 font-semibold"
        >
          Trusted Home Healthcare
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: easeOut }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-soft-charcoal leading-[1.1] mb-6"
        >
          Care that meets<br /><span className="text-sage-green">people where they are.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-soft-charcoal/60 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Professional home healthcare services with compassion, consistency, and clinical excellence — in the place you feel most comfortable.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#services" className="bg-sage-green text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-sage-green-dark transition-all">Explore Services</a>
          <a href="#how-it-works" className="text-soft-charcoal/60 hover:text-soft-charcoal px-8 py-3 text-sm border border-sage-green/30 rounded-full hover:border-soft-charcoal/30 transition-all">How It Works</a>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-12 bg-sage-green/40"
        />
      </motion.div>
    </section>
  );
}

function CareServicesSection() {
  return (
    <section id="services" className="py-24 md:py-32 px-6 max-w-6xl mx-auto">
      <SectionHeader label="Our Services" title="Comprehensive care, delivered at home." subtitle="From skilled nursing to daily companionship — we provide the right care for every situation." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {careServices.map((s, i) => (
          <motion.div
            key={s.name}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={gentleReveal}
            custom={i}
            className="care-card p-6 md:p-8"
          >
            <div className="aspect-[16/10] rounded-xl overflow-hidden mb-4">
              <img src={s.image} alt={s.name} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="w-10 h-10 rounded-full bg-sage-green/10 flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-sage-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-soft-charcoal mb-2">{s.name}</h3>
            <p className="text-soft-charcoal/60 text-sm leading-relaxed">{s.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function WhoWeHelp() {
  return (
    <section id="who-we-help" className="py-24 md:py-32 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <SectionHeader label="Who We Help" title="Support for every stage of life's journey." subtitle="Whether recovering from surgery or aging gracefully at home — we're here for you and your family." />
        <div className="grid md:grid-cols-2 gap-6">
          {whoWeHelp.map((w, i) => (
            <motion.div
              key={w.group}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={gentleReveal}
              custom={i}
              className="care-card p-6 md:p-8"
            >
              <h3 className="text-lg font-bold text-soft-charcoal mb-2">{w.group}</h3>
              <p className="text-soft-charcoal/60 text-sm leading-relaxed">{w.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CareMatching() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 px-6 max-w-5xl mx-auto">
      <SectionHeader label="How It Works" title="Simple steps to start care." subtitle="From your first call to ongoing support — we make the process clear and easy." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-sage-green/20" />
        {careMatchingSteps.map((s, i) => (
          <motion.div
            key={s.step}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={gentleReveal}
            custom={i}
            className="relative text-center p-6"
          >
            <div className="relative z-10 w-14 h-14 rounded-full bg-sage-green flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">{i + 1}</span>
            </div>
            <h3 className="text-base font-bold text-soft-charcoal mb-2">{s.step}</h3>
            <p className="text-soft-charcoal/60 text-sm leading-relaxed mb-3">{s.description}</p>
            <span className="text-xs text-sage-green font-medium uppercase tracking-wider">{s.duration}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function TrustSafety() {
  return (
    <section id="safety" className="py-24 md:py-32 px-6 bg-sage-green/5">
      <div className="max-w-5xl mx-auto">
        <SectionHeader label="Trust & Safety" title="Your safety is our foundation." subtitle="Every caregiver is thoroughly vetted, licensed, and supervised." />
        <div className="grid sm:grid-cols-2 gap-6">
          {trustBadges.map((b, i) => (
            <motion.div
              key={b.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={gentleReveal}
              custom={i}
              className="trust-badge text-left p-6"
            >
              <h3 className="font-bold text-soft-charcoal mb-1">{b.title}</h3>
              <p className="text-soft-charcoal/60 text-sm leading-relaxed">{b.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FamilyPortal() {
  return (
    <section id="updates" className="py-24 md:py-32 px-6 max-w-4xl mx-auto">
      <SectionHeader label="Family Portal" title="Stay informed, every step of the way." subtitle="Real-time updates from our care team, delivered straight to your phone." />
      <div className="space-y-4">
        {familyUpdates.map((u, i) => (
          <motion.div
            key={u.date}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-30px' }}
            variants={fadeUp}
            custom={i}
            className="portal-card p-5 md:p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-sage-green uppercase tracking-wider">{u.author}</span>
              <span className="text-xs text-soft-charcoal/40">{u.date}</span>
            </div>
            <p className="text-soft-charcoal/70 text-sm leading-relaxed">{u.content}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-24 md:py-32 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <SectionHeader label="Testimonials" title="Hear from families we've helped." subtitle="Real stories from real people who trust us with their care." />
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={gentleReveal}
              custom={i}
              className="testimonial-card p-6 md:p-8"
            >
              <p className="text-soft-charcoal/70 text-sm leading-relaxed mb-4 italic">&ldquo;{t.text}&rdquo;</p>
              <div>
                <p className="font-bold text-soft-charcoal text-sm">{t.name}</p>
                <p className="text-sage-green text-xs">{t.relationship}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="py-12 px-6 bg-soft-charcoal text-warm-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        <div>
          <span className="text-lg font-bold">CareBridge <span className="text-sage-green-light">Home Health</span></span>
          <p className="text-warm-white/50 text-sm mt-2 leading-relaxed">Professional home healthcare with compassion and clinical excellence.</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider">Contact</h4>
          <p className="text-warm-white/50 text-sm">789 Wellness Drive</p>
          <p className="text-warm-white/50 text-sm">Austin, TX 78701</p>
          <p className="text-gentle-blue text-sm mt-2">(512) 555-0142</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider">Hours</h4>
          <p className="text-warm-white/50 text-sm">24/7 — We're always here.</p>
          <p className="text-warm-white/50 text-sm mt-2">Same-day intake available</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/10 text-center text-warm-white/40 text-xs">
        &copy; 2025 CareBridge Home Health. All rights reserved.
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <CareServicesSection />
      <WhoWeHelp />
      <CareMatching />
      <TrustSafety />
      <FamilyPortal />
      <Testimonials />
      <Footer />
    </>
  );
}
