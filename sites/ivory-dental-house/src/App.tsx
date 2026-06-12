import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  studio,
  heroImage,
  treatmentRoomImage,
  smileImage,
  dentalToolsImage,
  journeySteps,
  treatments,
  comfortFeatures,
  beforeAfterCases,
  financing,
  consultationForm,
  digitalPreview,
} from './data';

/* ────────────────────── Icon Components ────────────────────── */

function SparkleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}

function AnchorIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="5" r="3" />
      <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3" />
    </svg>
  );
}

function AlignIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 6h18M3 12h12M3 18h18" />
    </svg>
  );
}

function BrushIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20 4L8.5 15.5M15 3l6 6-9 9H6v-6l9-9z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  );
}

function CalmIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
    </svg>
  );
}

function ClearIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function RoomIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <path d="M9 22V12h6v10" />
    </svg>
  );
}

const iconMap: Record<string, () => React.JSX.Element> = {
  sparkle: SparkleIcon,
  layers: LayersIcon,
  anchor: AnchorIcon,
  align: AlignIcon,
  brush: BrushIcon,
  shield: ShieldIcon,
  heart: HeartIcon,
  calm: CalmIcon,
  clear: ClearIcon,
  clock: ClockIcon,
  room: RoomIcon,
};

/* ────────────────────── Before/After Slider ────────────────────── */

function BeforeAfterSlider({ beforeColor, afterColor }: { beforeColor: string; afterColor: string; title?: string }) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current || !isDragging.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  };

  const handleMouseDown = () => { isDragging.current = true; };
  const handleMouseUp = () => { isDragging.current = false; };

  useEffect(() => {
    const handleGlobalMove = (e: MouseEvent) => handleMove(e.clientX);
    const handleTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);
    window.addEventListener('mousemove', handleGlobalMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleGlobalMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden cursor-col-resize select-none"
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      {/* After (full background) */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${afterColor}, #fffdf8)` }}>
        <div className="text-center">
          <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background: 'rgba(180, 160, 120, 0.15)' }}>
            <SparkleIcon />
          </div>
          <span className="text-sm font-medium tracking-widest uppercase" style={{ color: '#8b7355' }}>After</span>
        </div>
      </div>

      {/* Before (clipped) */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${beforeColor}, #a89478)`, clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <div className="text-center">
          <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background: 'rgba(255, 255, 255, 0.2)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
              <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z" />
            </svg>
          </div>
          <span className="text-sm font-medium tracking-widest uppercase text-white/80">Before</span>
        </div>
      </div>

      {/* Slider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white/80 z-10"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8b7355" strokeWidth="2">
            <path d="M8 4l-6 8 6 8M16 4l6 8-6 8" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────── Section Wrapper ────────────────────── */

function Section({ children, className = '', id = '' }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`px-6 md:px-12 lg:px-20 py-20 md:py-28 ${className}`}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-xs tracking-[0.25em] uppercase font-medium mb-4" style={{ color: '#b4a078' }}>
      {children}
    </span>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-4" style={{ color: '#2c2420', fontFamily: "'Cormorant Garamond', serif" }}>
      {children}
    </h2>
  );
}

/* ────────────────────── App ────────────────────── */

function App() {
  const [activeTreatment, setActiveTreatment] = useState<number | null>(null);
  const [activeCase, setActiveCase] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});

  return (
    <div className="min-h-screen" style={{ background: '#faf8f4', fontFamily: "'DM Sans', sans-serif", color: '#4a4039' }}>

      {/* ─── Navigation ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md" style={{ background: 'rgba(250, 248, 244, 0.85)', borderBottom: '1px solid rgba(180, 160, 120, 0.1)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16">
          <a href="#" className="font-serif text-xl font-medium tracking-wide" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#2c2420' }}>
            Ivory
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm" style={{ color: '#6b5e52' }}>
            <a href="#journey" className="hover:opacity-70 transition-opacity">Journey</a>
            <a href="#treatments" className="hover:opacity-70 transition-opacity">Treatments</a>
            <a href="#preview" className="hover:opacity-70 transition-opacity">Preview</a>
            <a href="#results" className="hover:opacity-70 transition-opacity">Results</a>
            <a href="#consultation" className="px-5 py-2 rounded-full text-sm font-medium transition-all hover:shadow-md" style={{ background: '#2c2420', color: '#faf8f4' }}>
              Consultation
            </a>
          </div>
        </div>
      </nav>

      {/* ─── 1. Hero ─── */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-16 overflow-hidden" style={{ background: 'linear-gradient(180deg, #faf8f4 0%, #f5f0e8 50%, #efe8dc 100%)' }}>
        {/* Hero background image */}
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt="Dental clinic" className="w-full h-full object-cover" style={{ opacity: 0.12 }} />
        </div>
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full opacity-30" style={{ background: 'radial-gradient(circle, #d4c5a0 0%, transparent 70%)' }} />
        <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #c9b896 0%, transparent 70%)' }} />

        <motion.div
          className="relative z-10 max-w-3xl text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-xs tracking-[0.2em] uppercase"
            style={{ background: 'rgba(180, 160, 120, 0.12)', color: '#8b7355', border: '1px solid rgba(180, 160, 120, 0.2)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#b4a078' }} />
            Cosmetic Dental Studio
          </motion.div>

          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light leading-[1.1] mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#2c2420' }}>
            {studio.tagline}
          </h1>

          <p className="text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed" style={{ color: '#6b5e52' }}>
            {studio.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#consultation"
              className="px-8 py-4 rounded-full text-sm font-medium tracking-wide transition-all hover:shadow-lg hover:-translate-y-0.5"
              style={{ background: '#2c2420', color: '#faf8f4' }}
            >
              {studio.cta}
            </a>
            <a
              href="#journey"
              className="px-8 py-4 rounded-full text-sm font-medium tracking-wide transition-all hover:opacity-70"
              style={{ color: '#6b5e52', border: '1px solid rgba(107, 94, 82, 0.3)' }}
            >
              Explore the Journey
            </a>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <svg width="20" height="30" viewBox="0 0 20 30" fill="none" stroke="#b4a078" strokeWidth="1.5">
            <rect x="1" y="1" width="18" height="28" rx="9" />
            <circle cx="10" cy="10" r="2" fill="#b4a078" />
          </svg>
        </motion.div>
      </section>

      {/* ─── 2. Smile Design Journey ─── */}
      <Section id="journey" className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <SectionLabel>The Process</SectionLabel>
          <SectionTitle>Your Smile Design Journey</SectionTitle>
          <p className="max-w-xl mx-auto" style={{ color: '#6b5e52' }}>
            Six considered steps from first conversation to lasting results. Each phase designed around your comfort and clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {journeySteps.map((step, i) => (
            <motion.div
              key={step.number}
              className="p-8 rounded-2xl transition-all hover:shadow-md"
              style={{ background: '#fff', border: '1px solid rgba(180, 160, 120, 0.12)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-serif text-3xl font-light" style={{ color: '#b4a078', fontFamily: "'Cormorant Garamond', serif" }}>
                  {step.number}
                </span>
                <span className="text-xs tracking-wider uppercase px-3 py-1 rounded-full" style={{ background: 'rgba(180, 160, 120, 0.1)', color: '#8b7355' }}>
                  {step.duration}
                </span>
              </div>
              <h3 className="font-serif text-xl font-medium mb-2" style={{ color: '#2c2420', fontFamily: "'Cormorant Garamond', serif" }}>
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#6b5e52' }}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ─── 3. Treatments ─── */}
      <Section id="treatments" className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <SectionLabel>Our Services</SectionLabel>
          <SectionTitle>Treatments</SectionTitle>
          <p className="max-w-xl mx-auto" style={{ color: '#6b5e52' }}>
            Precision cosmetic and restorative dentistry, delivered with care and artistry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {treatments.map((t, i) => {
            const Icon = iconMap[t.icon];
            const isActive = activeTreatment === i;
            return (
              <motion.div
                key={t.name}
                className="p-7 rounded-2xl cursor-pointer transition-all"
                style={{
                  background: isActive ? '#2c2420' : '#fff',
                  border: `1px solid ${isActive ? '#2c2420' : 'rgba(180, 160, 120, 0.12)'}`,
                }}
                onClick={() => setActiveTreatment(isActive ? null : i)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: isActive ? 'rgba(250, 248, 244, 0.1)' : 'rgba(180, 160, 120, 0.1)', color: isActive ? '#d4c5a0' : '#8b7355' }}>
                    {Icon && <Icon />}
                  </div>
                  <span className="text-xs tracking-wider uppercase px-2 py-1 rounded-full" style={{ background: isActive ? 'rgba(250, 248, 244, 0.1)' : 'rgba(180, 160, 120, 0.08)', color: isActive ? '#d4c5a0' : '#8b7355' }}>
                    {t.category}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-medium mb-2" style={{ color: isActive ? '#faf8f4' : '#2c2420', fontFamily: "'Cormorant Garamond', serif" }}>
                  {t.name}
                </h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: isActive ? 'rgba(250, 248, 244, 0.7)' : '#6b5e52' }}>
                  {t.description}
                </p>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 mt-4 flex items-center justify-between" style={{ borderTop: '1px solid rgba(250, 248, 244, 0.1)' }}>
                        <div>
                          <span className="text-xs uppercase tracking-wider" style={{ color: '#d4c5a0' }}>From</span>
                          <p className="font-medium" style={{ color: '#faf8f4' }}>{t.from}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs uppercase tracking-wider" style={{ color: '#d4c5a0' }}>Timeline</span>
                          <p className="font-medium" style={{ color: '#faf8f4' }}>{t.sessions}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!isActive && (
                  <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(180, 160, 120, 0.08)' }}>
                    <span className="text-sm font-medium" style={{ color: '#8b7355' }}>{t.from}</span>
                    <span className="text-xs" style={{ color: '#a89478' }}>{t.sessions}</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* ─── 4. Digital Preview ─── */}
      <Section id="preview" className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionLabel>Technology</SectionLabel>
            <SectionTitle>{digitalPreview.title}</SectionTitle>
            <p className="mb-8 leading-relaxed" style={{ color: '#6b5e52' }}>
              {digitalPreview.subtitle}
            </p>

            <div className="space-y-4">
              {digitalPreview.steps.map((step, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-xl"
                  style={{ background: 'rgba(180, 160, 120, 0.06)' }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0" style={{ background: '#2c2420', color: '#d4c5a0' }}>
                    {i + 1}
                  </div>
                  <span className="text-sm font-medium" style={{ color: '#2c2420' }}>{step}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <div className="p-8 rounded-3xl" style={{ background: '#fff', border: '1px solid rgba(180, 160, 120, 0.12)' }}>
              <div className="text-center mb-6">
                <span className="text-xs tracking-[0.2em] uppercase" style={{ color: '#b4a078' }}>Interactive Preview</span>
                <h3 className="font-serif text-2xl mt-2" style={{ color: '#2c2420', fontFamily: "'Cormorant Garamond', serif" }}>
                  Drag to Compare
                </h3>
              </div>
              <BeforeAfterSlider
                beforeColor="#c9b89a"
                afterColor="#faf6f0"
                title="Smile Preview"
              />
              <p className="text-center text-xs mt-4" style={{ color: '#a89478' }}>
                ← Drag the slider to reveal your transformation →
              </p>
            </div>
            <div className="mt-6 rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(180, 160, 120, 0.12)' }}>
              <img src={treatmentRoomImage} alt="Treatment room" className="w-full h-48 object-cover" />
            </div>
          </div>
        </div>
      </Section>

      {/* ─── 5. Comfort Layer ─── */}
      <Section className="max-w-7xl mx-auto" id="comfort">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-1">
            <div className="rounded-2xl overflow-hidden sticky top-24" style={{ border: '1px solid rgba(180, 160, 120, 0.12)' }}>
              <img src={dentalToolsImage} alt="Modern dental equipment" className="w-full h-64 object-cover" />
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="text-center lg:text-left mb-12">
              <SectionLabel>Your Experience</SectionLabel>
              <SectionTitle>Designed Around Your Comfort</SectionTitle>
              <p className="max-w-xl" style={{ color: '#6b5e52' }}>
                Every detail considered — from the moment you arrive to the care you receive long after treatment.
              </p>
            </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {comfortFeatures.map((feature, i) => {
            const Icon = iconMap[feature.icon];
            return (
              <motion.div
                key={feature.title}
                className="p-8 rounded-2xl flex gap-5"
                style={{ background: '#fff', border: '1px solid rgba(180, 160, 120, 0.12)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(180, 160, 120, 0.1)', color: '#8b7355' }}>
                  {Icon && <Icon />}
                </div>
                <div>
                  <h3 className="font-serif text-lg font-medium mb-2" style={{ color: '#2c2420', fontFamily: "'Cormorant Garamond', serif" }}>
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#6b5e52' }}>
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
          </div>
        </div>
      </Section>

      {/* ─── 6. Before/After ─── */}
      <Section id="results" className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <SectionLabel>Transformations</SectionLabel>
          <SectionTitle>Before & After</SectionTitle>
          <p className="max-w-xl mx-auto" style={{ color: '#6b5e52' }}>
            Real results from our studio. Each case uniquely planned and precisely executed.
          </p>
        </div>

        {/* Gallery image */}
        <div className="max-w-2xl mx-auto mb-10 rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(180, 160, 120, 0.12)' }}>
          <img src={smileImage} alt="Beautiful smile result" className="w-full h-56 object-cover" />
        </div>

        {/* Case selector */}
        <div className="flex justify-center gap-3 mb-10">
          {beforeAfterCases.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setActiveCase(i)}
              className="px-5 py-2 rounded-full text-sm transition-all"
              style={{
                background: activeCase === i ? '#2c2420' : 'transparent',
                color: activeCase === i ? '#faf8f4' : '#6b5e52',
                border: `1px solid ${activeCase === i ? '#2c2420' : 'rgba(180, 160, 120, 0.2)'}`,
              }}
            >
              {c.title}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCase}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="max-w-2xl mx-auto"
          >
            <BeforeAfterSlider
              beforeColor={beforeAfterCases[activeCase].beforeColor}
              afterColor={beforeAfterCases[activeCase].afterColor}
              title={beforeAfterCases[activeCase].title}
            />
            <div className="mt-6 text-center">
              <h3 className="font-serif text-xl font-medium mb-2" style={{ color: '#2c2420', fontFamily: "'Cormorant Garamond', serif" }}>
                {beforeAfterCases[activeCase].title}
              </h3>
              <p className="text-sm mb-3" style={{ color: '#6b5e52' }}>
                {beforeAfterCases[activeCase].description}
              </p>
              <div className="flex items-center justify-center gap-6 text-xs" style={{ color: '#8b7355' }}>
                <span>{beforeAfterCases[activeCase].treatment}</span>
                <span className="w-1 h-1 rounded-full" style={{ background: '#b4a078' }} />
                <span>{beforeAfterCases[activeCase].duration}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </Section>

      {/* ─── 7. Financing + Insurance ─── */}
      <Section className="max-w-7xl mx-auto" id="financing">
        <div className="text-center mb-16">
          <SectionLabel>Investment</SectionLabel>
          <SectionTitle>Financing & Insurance</SectionTitle>
          <p className="max-w-xl mx-auto" style={{ color: '#6b5e52' }}>
            Flexible options to make your smile investment accessible. No pressure, full transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {financing.map((item, i) => (
            <motion.div
              key={item.title}
              className="p-7 rounded-2xl"
              style={{ background: '#fff', border: '1px solid rgba(180, 160, 120, 0.12)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(180, 160, 120, 0.1)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8b7355" strokeWidth="1.5">
                  <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                </svg>
              </div>
              <h3 className="font-serif text-lg font-medium mb-2" style={{ color: '#2c2420', fontFamily: "'Cormorant Garamond', serif" }}>
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed mb-3" style={{ color: '#6b5e52' }}>
                {item.description}
              </p>
              <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ background: 'rgba(180, 160, 120, 0.08)', color: '#8b7355' }}>
                {item.detail}
              </span>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ─── 8. Consultation CTA ─── */}
      <Section id="consultation" className="max-w-4xl mx-auto">
        <div className="p-10 md:p-14 rounded-3xl text-center" style={{ background: 'linear-gradient(135deg, #2c2420, #3d332c)', border: '1px solid rgba(180, 160, 120, 0.2)' }}>
          <SectionLabel>{consultationForm.title}</SectionLabel>
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-4" style={{ color: '#faf8f4', fontFamily: "'Cormorant Garamond', serif" }}>
            Let's Begin
          </h2>
          <p className="max-w-lg mx-auto mb-10 text-sm leading-relaxed" style={{ color: 'rgba(250, 248, 244, 0.7)' }}>
            {consultationForm.subtitle}
          </p>

          <form className="max-w-md mx-auto space-y-4" onSubmit={(e) => e.preventDefault()}>
            {consultationForm.fields.map((field) => (
              <div key={field.name} className="text-left">
                <label className="block text-xs tracking-wider uppercase mb-2" style={{ color: '#d4c5a0' }}>
                  {field.label} {field.required && <span style={{ color: '#b4a078' }}>*</span>}
                </label>
                {field.type === 'select' ? (
                  <select
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-2"
                    style={{ background: 'rgba(250, 248, 244, 0.08)', border: '1px solid rgba(180, 160, 120, 0.2)', color: '#faf8f4', '--tw-ring-color': 'rgba(180, 160, 120, 0.3)' } as React.CSSProperties}
                    value={formData[field.name] || ''}
                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                  >
                    <option value="" style={{ color: '#2c2420' }}>Select an option</option>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt} style={{ color: '#2c2420' }}>{opt}</option>
                    ))}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none focus:ring-2"
                    style={{ background: 'rgba(250, 248, 244, 0.08)', border: '1px solid rgba(180, 160, 120, 0.2)', color: '#faf8f4', '--tw-ring-color': 'rgba(180, 160, 120, 0.3)' } as React.CSSProperties}
                    placeholder={`Tell us about your goals...`}
                    value={formData[field.name] || ''}
                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                  />
                ) : (
                  <input
                    type={field.type}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-2"
                    style={{ background: 'rgba(250, 248, 244, 0.08)', border: '1px solid rgba(180, 160, 120, 0.2)', color: '#faf8f4', '--tw-ring-color': 'rgba(180, 160, 120, 0.3)' } as React.CSSProperties}
                    placeholder={field.label}
                    value={formData[field.name] || ''}
                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                  />
                )}
              </div>
            ))}

            <button
              type="submit"
              className="w-full py-4 rounded-xl text-sm font-medium tracking-wide transition-all hover:shadow-lg hover:-translate-y-0.5 mt-6"
              style={{ background: '#d4c5a0', color: '#2c2420' }}
            >
              Request Consultation
            </button>
          </form>
        </div>
      </Section>

      {/* ─── Footer ─── */}
      <footer className="px-6 md:px-12 py-12 text-center" style={{ borderTop: '1px solid rgba(180, 160, 120, 0.1)' }}>
        <div className="max-w-7xl mx-auto">
          <p className="font-serif text-2xl font-light mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#2c2420' }}>
            Ivory Dental House
          </p>
          <p className="text-sm mb-6" style={{ color: '#8b7355' }}>
            {studio.address}
          </p>
          <div className="flex items-center justify-center gap-6 text-sm" style={{ color: '#6b5e52' }}>
            <a href={`tel:${studio.phone}`} className="hover:opacity-70 transition-opacity">{studio.phone}</a>
            <span className="w-1 h-1 rounded-full" style={{ background: '#b4a078' }} />
            <a href={`mailto:${studio.email}`} className="hover:opacity-70 transition-opacity">{studio.email}</a>
          </div>
          <p className="text-xs mt-8" style={{ color: '#a89478' }}>
            © 2026 Ivory Dental House. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
