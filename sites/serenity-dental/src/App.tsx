import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { treatments, smileDesignSteps, comfortFeatures, beforeAfterPairs, dentists, financingOptions } from './data';

const easeOut = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOut, delay: i * 0.1 },
  }),
};

const staggerUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut, delay: i * 0.08 },
  }),
};

function SectionHeader({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
      <span className="text-soft-champagne uppercase tracking-[0.3em] text-xs font-medium mb-3 block">{label}</span>
      <h2 className="font-serif text-3xl md:text-5xl text-deep-charcoal leading-tight">{title}</h2>
      {subtitle && <p className="text-warm-stone mt-4 max-w-xl mx-auto leading-relaxed">{subtitle}</p>}
    </motion.div>
  );
}

function Nav() {
  const links = ['Treatments', 'Smile Design', 'Comfort', 'Gallery', 'Team', 'Visit'];
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream-white/90 backdrop-blur-md border-b border-champagne-light">
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <span className="font-serif text-lg text-deep-charcoal tracking-wide">Serenity <span className="text-soft-champagne">Dental</span></span>
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm text-deep-charcoal/60 hover:text-deep-charcoal transition-colors tracking-wide">{l}</a>
          ))}
          <a href="#visit" className="text-sm bg-deep-charcoal text-cream-white px-6 py-2.5 rounded-full hover:bg-deep-charcoal/80 transition-colors tracking-wide">Book Now</a>
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
          src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=1600&q=85"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-cream-white/80" />
      </div>
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'radial-gradient(circle at 30% 40%, #E8D5B7 0%, transparent 50%), radial-gradient(circle at 70% 60%, #E8D5B7 0%, transparent 50%)' }}
      />
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-soft-champagne uppercase tracking-[0.35em] text-xs md:text-sm mb-6 font-medium"
        >
          Premium Dental Care
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: easeOut }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-deep-charcoal leading-[1.15] mb-6"
        >
          Modern dentistry<br /><span className="text-soft-champagne">without the cold clinic feeling.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-warm-stone text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Where advanced technology meets a warm, calming atmosphere — your smile deserves both.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#treatments" className="bg-deep-charcoal text-cream-white px-8 py-3 rounded-full text-sm font-medium hover:bg-deep-charcoal/80 transition-all">Explore Treatments</a>
          <a href="#smile-design" className="text-deep-charcoal/70 hover:text-deep-charcoal px-8 py-3 text-sm border border-soft-champagne rounded-full hover:border-deep-charcoal/30 transition-all">Smile Design</a>
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
          className="w-px h-12 bg-soft-champagne/60"
        />
      </motion.div>
    </section>
  );
}

function TreatmentsSection() {
  return (
    <section id="treatments" className="py-24 md:py-32 px-6 max-w-6xl mx-auto">
      <SectionHeader label="Treatments" title="Comprehensive care for every smile." subtitle="From routine cleanings to full smile transformations — all in a comfortable setting." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {treatments.map((t, i) => (
          <motion.div
            key={t.name}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerUp}
            custom={i}
            className="elegant-card p-6 md:p-8"
          >
            <div className="w-10 h-10 rounded-full bg-champagne-light flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-soft-champagne" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="font-serif text-lg text-deep-charcoal font-semibold mb-2">{t.name}</h3>
            <p className="text-warm-stone text-sm leading-relaxed mb-3">{t.description}</p>
            <span className="text-xs text-soft-champagne font-medium uppercase tracking-wider">{t.duration}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function SmileDesign() {
  return (
    <section id="smile-design" className="py-24 md:py-32 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <SectionHeader label="Smile Design" title="Your smile, designed before treatment begins." subtitle="A five-step digital process that puts you in control of the outcome before anything starts." />
        <div className="grid md:grid-cols-5 gap-4">
          {smileDesignSteps.map((s, i) => (
            <motion.div
              key={s.step}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={staggerUp}
              custom={i}
              className="text-center p-6"
            >
              <div className="w-12 h-12 rounded-full bg-champagne-light flex items-center justify-center mx-auto mb-4">
                <span className="text-soft-champagne font-serif text-lg">{i + 1}</span>
              </div>
              <h3 className="font-serif text-sm text-deep-charcoal font-semibold mb-2">{s.step}</h3>
              <p className="text-warm-stone text-xs leading-relaxed">{s.description}</p>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-12 text-center"
        >
          <a href="#visit" className="inline-block text-deep-charcoal text-sm border border-soft-champagne px-8 py-3 rounded-full hover:bg-soft-champagne/20 transition-all">Book a Smile Consultation</a>
        </motion.div>
      </div>
    </section>
  );
}

function ComfortExperience() {
  return (
    <section id="comfort" className="py-24 md:py-32 px-6 max-w-6xl mx-auto">
      <SectionHeader label="Comfort Experience" title="Dentistry that respects your nerves." subtitle="We've designed every detail around one goal: making you feel at ease." />
      <div className="grid sm:grid-cols-2 gap-6">
        {comfortFeatures.map((f, i) => (
          <motion.div
            key={f.title}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerUp}
            custom={i}
            className="elegant-card p-6 md:p-8"
          >
            <h3 className="font-serif text-lg text-deep-charcoal font-semibold mb-2">{f.title}</h3>
            <p className="text-warm-stone text-sm leading-relaxed">{f.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function BeforeAfter() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  return (
    <section id="gallery" className="py-24 md:py-32 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <SectionHeader label="Smile Transformations" title="See the difference." subtitle="Real transformations from real patients." />
        <div className="space-y-8">
          {beforeAfterPairs.map((pair, i) => (
            <motion.div
              key={pair.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
              className="elegant-card p-6 md:p-8"
            >
              <h3 className="font-serif text-lg text-deep-charcoal font-semibold mb-4">{pair.label}</h3>
              <div
                ref={containerRef}
                className="before-after-container h-48 md:h-64 bg-champagne-light relative cursor-col-resize select-none"
                onMouseMove={(e) => handleMove(e.clientX)}
                onTouchMove={(e) => handleMove(e.touches[0].clientX)}
              >
                <img
                  src={pair.beforeImage}
                  alt="Before treatment"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center px-4 bg-black/40 rounded-lg py-2">
                    <p className="text-xs uppercase tracking-wider text-white mb-1">Before</p>
                    <p className="text-white font-serif text-sm">{pair.before}</p>
                  </div>
                </div>
                <div className="after-image" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` } as React.CSSProperties}>
                  <img
                    src={pair.afterImage}
                    alt="After treatment"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 left-0 right-0 flex items-center justify-center" style={{ paddingTop: '2rem' }}>
                    <div className="text-center px-4 bg-black/40 rounded-lg py-2">
                      <p className="text-xs uppercase tracking-wider text-white mb-1">After</p>
                      <p className="text-white font-serif text-sm">{pair.after}</p>
                    </div>
                  </div>
                </div>
                <div className="slider-handle" style={{ left: `${sliderPos}%` }}>
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center">
                    <svg className="w-4 h-4 text-deep-charcoal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section id="team" className="py-24 md:py-32 px-6 max-w-6xl mx-auto">
      <SectionHeader label="Our Dentists" title="Care from people who love what they do." subtitle="Experienced clinicians who combine technical excellence with genuine warmth." />
      <div className="grid md:grid-cols-3 gap-6">
        {dentists.map((d, i) => (
          <motion.div
            key={d.name}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerUp}
            custom={i}
            className="elegant-card p-6 md:p-8 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-champagne-light flex items-center justify-center mx-auto mb-4">
              <span className="font-serif text-xl text-soft-champagne">{d.name.split(' ').map(n => n[0]).join('')}</span>
            </div>
            <h3 className="font-serif text-lg text-deep-charcoal font-semibold">{d.name}</h3>
            <p className="text-soft-champagne text-sm font-medium mt-0.5">{d.title}</p>
            <p className="text-warm-stone text-xs mt-1 uppercase tracking-wider">{d.focus}</p>
            <p className="text-warm-stone text-sm mt-3 leading-relaxed">{d.bio}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FinancingSection() {
  return (
    <section id="visit" className="py-24 md:py-32 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <SectionHeader label="Financing & Insurance" title="Care that fits your budget." subtitle="We believe cost should never be a barrier to excellent dental care." />
        <div className="grid md:grid-cols-3 gap-6">
          {financingOptions.map((f, i) => (
            <motion.div
              key={f.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerUp}
              custom={i}
              className="elegant-card p-6 md:p-8 text-center"
            >
              <h3 className="font-serif text-lg text-deep-charcoal font-semibold mb-3">{f.name}</h3>
              <p className="text-warm-stone text-sm leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 px-6 bg-deep-charcoal text-cream-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        <div>
          <span className="font-serif text-lg">Serenity <span className="text-soft-champagne">Dental</span></span>
          <p className="text-warm-stone text-sm mt-2 leading-relaxed">Modern dentistry, warm atmosphere, exceptional results.</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider">Contact</h4>
          <p className="text-warm-stone text-sm">456 Park Avenue, Suite 300</p>
          <p className="text-warm-stone text-sm">New York, NY 10022</p>
          <p className="text-soft-champagne text-sm mt-2">(212) 555-0199</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider">Hours</h4>
          <p className="text-warm-stone text-sm">Mon–Thu: 8:00 AM – 6:00 PM</p>
          <p className="text-warm-stone text-sm">Friday: 8:00 AM – 3:00 PM</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/10 text-center text-warm-stone text-xs">
        &copy; 2025 Serenity Dental Studio. All rights reserved.
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <TreatmentsSection />
      <SmileDesign />
      <ComfortExperience />
      <BeforeAfter />
      <Team />
      <FinancingSection />
      <Footer />
    </>
  );
}
