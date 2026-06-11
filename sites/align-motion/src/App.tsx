import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { conditions, recoveryStages, programs, therapists, journeySteps, progressMetrics } from './data';

const easeOut = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOut, delay: i * 0.1 },
  }),
};

const slideIn = {
  hidden: { opacity: 0, x: -40 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: easeOut, delay: i * 0.12 },
  }),
};

function SectionHeader({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
      <span className="text-electric-blue uppercase tracking-[0.3em] text-xs font-semibold mb-3 block">{label}</span>
      <h2 className="text-3xl md:text-5xl font-bold text-charcoal leading-tight">{title}</h2>
      {subtitle && <p className="text-stone mt-4 max-w-xl mx-auto leading-relaxed">{subtitle}</p>}
    </motion.div>
  );
}

function AnimatedLine() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="relative h-1 w-full bg-stone/20 rounded-full overflow-hidden my-20 max-w-2xl mx-auto">
      <motion.div
        initial={{ width: '0%' }}
        animate={inView ? { width: '100%' } : {}}
        transition={{ duration: 1.8, ease: easeOut }}
        className="h-full bg-electric-blue rounded-full"
      />
    </div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const links = ['Conditions', 'Recovery', 'Programs', 'Progress', 'Therapists', 'Journey'];
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-off-white/90 backdrop-blur-md border-b border-stone/10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="text-lg font-bold text-charcoal tracking-tight">Align & Motion <span className="text-electric-blue">PT</span></span>
        <button className="md:hidden text-charcoal" onClick={() => setOpen(!open)}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} /></svg>
        </button>
        <div className={`${open ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-center gap-6 absolute md:static top-full left-0 right-0 bg-off-white md:bg-transparent p-6 md:p-0 border-b md:border-0 border-stone/10 md:border-0 shadow-lg md:shadow-none`}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-sm text-charcoal/70 hover:text-electric-blue transition-colors tracking-wide">{l}</a>
          ))}
          <a href="#contact" className="text-sm bg-electric-blue text-white px-5 py-2 rounded-full hover:bg-electric-blue-dark transition-colors">Book Session</a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-off-white via-off-white to-off-white" />
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, #1E88E5 0%, transparent 50%), radial-gradient(circle at 75% 50%, #1E88E5 0%, transparent 50%)' }}
      />
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-electric-blue uppercase tracking-[0.35em] text-xs md:text-sm mb-6 font-semibold"
        >
          Evidence-Based Physical Therapy
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: easeOut }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-charcoal leading-[1.1] mb-6"
        >
          Move better.<br /><span className="text-electric-blue">Recover with a plan.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-stone text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Personalized physical therapy programs built on movement science — designed to get you back to what you love.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#conditions" className="bg-electric-blue text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-electric-blue-dark transition-all">Start Your Recovery</a>
          <a href="#programs" className="text-charcoal/70 hover:text-charcoal px-8 py-3 text-sm border border-stone/30 rounded-full hover:border-charcoal/30 transition-all">View Programs</a>
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
          className="w-px h-12 bg-electric-blue/40"
        />
      </motion.div>
    </section>
  );
}

function ConditionsTreated() {
  const iconMap: Record<string, string> = {
    spine: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
    knee: 'M13 2L3 9v10l10 7 10-7V9l-10-7zM3 9l10 5 10-5M3 19l10-5',
    shoulder: 'M12 2l9 4.5v9L12 20l-9-4.5v-9L12 2zM12 20v-9',
    sports: 'M12 2l9 4.5v9L12 20l-9-4.5v-9L12 2zM8 12l2 2 6-6',
    surgery: 'M4 6h16M4 12h16M4 18h16',
  };
  return (
    <section id="conditions" className="py-24 md:py-32 px-6 max-w-6xl mx-auto">
      <SectionHeader label="Conditions We Treat" title="We handle everything from daily aches to surgical recovery." subtitle="Evidence-based treatment for the most common musculoskeletal conditions." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {conditions.map((c, i) => (
          <motion.div
            key={c.name}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={i}
            className="kinetic-card bg-white p-6 md:p-8 rounded-2xl border border-stone/10"
          >
            <div className="w-10 h-10 rounded-full bg-electric-blue/10 flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-electric-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={iconMap[c.icon] || 'M13 2L3 9v10l10 7 10-7V9l-10-7z'} />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-charcoal mb-2">{c.name}</h3>
            <p className="text-stone text-sm leading-relaxed">{c.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function RecoveryPlan() {
  const ref = useRef(null);
  useInView(ref, { once: true, margin: '-100px' });
  const [activeStage, setActiveStage] = useState(0);

  return (
    <section id="recovery" className="py-24 md:py-32 px-6 bg-white">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <SectionHeader label="Your Recovery Plan" title="A phased approach built around your body." subtitle="Each stage builds on the last — progress at your pace with measurable milestones." />
        <AnimatedLine />
        <div className="recovery-timeline relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-stone/10 md:-translate-x-px" />
          <div className="space-y-8 md:space-y-16">
            {recoveryStages.map((stage, i) => (
              <motion.div
                key={stage.step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={slideIn}
                custom={i}
                onViewportEnter={() => setActiveStage(i)}
                className={`relative flex flex-col md:flex-row items-start gap-6 md:gap-10 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'} ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <span className="text-xs text-electric-blue font-semibold uppercase tracking-wider">{stage.duration}</span>
                  <h3 className="text-xl font-bold text-charcoal mt-1">{stage.step}</h3>
                  <p className="text-electric-blue/70 text-sm font-medium mt-0.5">{stage.subtitle}</p>
                  <p className="text-stone text-sm mt-2 leading-relaxed">{stage.description}</p>
                </div>
                <div className="relative z-10 flex-shrink-0">
                  <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center bg-off-white transition-all duration-600 ${i <= activeStage ? 'border-electric-blue' : 'border-stone/20'}`}>
                    <div className={`w-3 h-3 rounded-full transition-all duration-600 ${i <= activeStage ? 'bg-electric-blue scale-125' : 'bg-stone/20'}`} />
                  </div>
                </div>
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgramsSection() {
  const [active, setActive] = useState(0);
  return (
    <section id="programs" className="py-24 md:py-32 px-6 max-w-6xl mx-auto">
      <SectionHeader label="Our Programs" title="Structured programs for every recovery goal." subtitle="From elite athletes to first-time rehab — find the program that fits your needs." />
      <div className="grid md:grid-cols-2 gap-6">
        {programs.map((p, i) => (
          <motion.div
            key={p.name}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={i}
            onMouseEnter={() => setActive(i)}
            className={`kinetic-card rounded-2xl p-8 transition-colors ${active === i ? 'bg-electric-blue text-white' : 'bg-white border border-stone/10'}`}
          >
            <h3 className={`text-xl font-bold mb-3 ${active === i ? 'text-white' : 'text-charcoal'}`}>{p.name}</h3>
            <p className={`text-sm leading-relaxed mb-5 ${active === i ? 'text-white/80' : 'text-stone'}`}>{p.description}</p>
            <ul className="space-y-2">
              {p.features.map(f => (
                <li key={f} className={`flex items-center gap-2 text-sm ${active === i ? 'text-white/70' : 'text-stone'}`}>
                  <svg className={`w-4 h-4 flex-shrink-0 ${active === i ? 'text-white' : 'text-electric-blue'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ProgressTracking() {
  return (
    <section id="progress" className="py-24 md:py-32 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <SectionHeader label="Progress Tracking" title="See how far you've come." subtitle="Real metrics, real improvement. We measure what matters so you can track your recovery." />
        <div className="grid sm:grid-cols-2 gap-6">
          {progressMetrics.map((m, i) => {
            const pct = `${m.current}${m.unit}`;
            return (
              <motion.div
                key={m.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="dashboard-card p-6 md:p-8"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-charcoal">{m.label}</span>
                  <span className="flex items-center gap-1 text-xs text-sage-green">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    {m.previous}{m.unit} → {pct}
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-3xl font-bold text-charcoal">{pct}</span>
                  <span className="text-xs text-stone">from {m.previous}{m.unit}</span>
                </div>
                <div className="h-2 bg-stone/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: '0%' }}
                    whileInView={{ width: `${m.current}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: easeOut }}
                    className="h-full bg-electric-blue rounded-full"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TherapistsSection() {
  return (
    <section id="therapists" className="py-24 md:py-32 px-6 max-w-6xl mx-auto">
      <SectionHeader label="Meet Our Therapists" title="Your recovery is in expert hands." subtitle="Licensed physical therapists with specialized training and a passion for movement." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {therapists.map((t, i) => (
          <motion.div
            key={t.name}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={i}
            className="kinetic-card bg-white p-6 rounded-2xl border border-stone/10 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-electric-blue/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold text-electric-blue">{t.name.split(' ').map(n => n[0]).join('')}</span>
            </div>
            <h3 className="font-bold text-charcoal">{t.name}</h3>
            <p className="text-electric-blue text-sm font-medium mt-0.5">{t.title}</p>
            <p className="text-stone text-xs mt-1 uppercase tracking-wider">{t.specialties}</p>
            <p className="text-stone text-sm mt-3 leading-relaxed">{t.bio}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function PatientJourney() {
  return (
    <section id="journey" className="py-24 md:py-32 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <SectionHeader label="Patient Journey" title="From first visit to full recovery." subtitle="A clear path forward — no surprises, no guesswork." />
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-stone/10 md:-translate-x-px" />
          <div className="space-y-10">
            {journeySteps.map((s, i) => (
              <motion.div
                key={s.phase}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={slideIn}
                custom={i}
                className={`relative flex items-start gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'}`}>
                  <span className="text-xs text-electric-blue font-semibold uppercase tracking-wider">{s.duration}</span>
                  <h3 className="text-lg font-bold text-charcoal mt-1">{s.phase}</h3>
                  <p className="text-stone text-sm mt-1 leading-relaxed">{s.description}</p>
                </div>
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-electric-blue flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{i + 1}</span>
                  </div>
                </div>
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="py-12 px-6 bg-charcoal text-off-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        <div>
          <span className="text-lg font-bold">Align & Motion <span className="text-electric-blue-light">PT</span></span>
          <p className="text-stone text-sm mt-2 leading-relaxed">Evidence-based physical therapy built around your goals.</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider">Contact</h4>
          <p className="text-stone text-sm">1234 Wellness Way, Suite 200</p>
          <p className="text-stone text-sm">Portland, OR 97201</p>
          <p className="text-electric-blue-light text-sm mt-2">(555) 234-5678</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider">Hours</h4>
          <p className="text-stone text-sm">Mon–Fri: 6:00 AM – 7:00 PM</p>
          <p className="text-stone text-sm">Saturday: 8:00 AM – 2:00 PM</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-stone/20 text-center text-stone text-xs">
        &copy; 2025 Align & Motion Physical Therapy. All rights reserved.
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <ConditionsTreated />
      <RecoveryPlan />
      <ProgramsSection />
      <ProgressTracking />
      <TherapistsSection />
      <PatientJourney />
      <Footer />
    </>
  );
}
