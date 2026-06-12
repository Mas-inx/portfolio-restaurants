import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  omakase,
  menu,
  sakePairings,
  reservationsPolicy,
  footerInfo,
  chefMethodSteps,
  heroImage,
  omakaseImage,
  interiorImages,
} from './data';

/* ─────────────────────────────────────────────
   SVG Icons
   ───────────────────────────────────────────── */

function SushiIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="10" rx="8" ry="5" />
      <path d="M4 10c0 1.5 1 3.5 2.5 5" />
      <path d="M20 10c0 1.5-1 3.5-2.5 5" />
      <path d="M8 10c0 2 1 4 2.5 5.5" />
      <path d="M16 10c0 2-1 4-2.5 5.5" />
      <circle cx="12" cy="10" r="1.5" fill="currentColor" />
    </svg>
  );
}

function FishIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12c0-2 2-5 4-5s4 3 6 3 4-3 6-3 4 3 4 5-2 5-4 5-4-3-6-3-4 3-6 3-4-3-4-5z" />
      <line x1="2" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="22" y2="12" />
      <path d="M12 12V7" />
      <circle cx="16" cy="10" r="0.5" fill="currentColor" />
    </svg>
  );
}

function BambooIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="2" x2="12" y2="22" />
      <path d="M12 4c-3 1-5 3-5 5" />
      <path d="M12 4c3 1 5 3 5 5" />
      <path d="M12 11c-3 1-5 3-5 5" />
      <path d="M12 11c3 1 5 3 5 5" />
      <line x1="8" y1="7" x2="10" y2="9" />
      <line x1="16" y1="7" x2="14" y2="9" />
      <line x1="8" y1="14" x2="10" y2="16" />
      <line x1="16" y1="14" x2="14" y2="16" />
    </svg>
  );
}

function PlateIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="12" rx="9" ry="7" />
      <path d="M5 12c0 2 3 4 7 4s7-2 7-4" />
      <path d="M3 12h18" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

function SakeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 3l-1 6h12l-1-6H7z" />
      <path d="M6 9l1 11a2 2 0 002 2h6a2 2 0 002-2l1-11" />
      <path d="M9 9l1 4M15 9l-1 4" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 4L12 13 2 4" />
    </svg>
  );
}

function LocationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" fill="currentColor" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Animation Variants
   ───────────────────────────────────────────── */

const easeOut = [0.22, 1, 0.36, 1] as const satisfies [number, number, number, number];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

/* ─────────────────────────────────────────────
   Reusable Reveal Wrapper
   ───────────────────────────────────────────── */

function SectionReveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const controls = useAnimation();
  useEffect(() => {
    if (isInView) controls.start('visible');
  }, [isInView, controls]);
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeUp}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ImageReveal({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const controls = useAnimation();
  useEffect(() => {
    if (isInView) controls.start('visible');
  }, [isInView, controls]);
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { clipPath: 'inset(0 0 100% 0)' },
        visible: { clipPath: 'inset(0 0 0% 0)', transition: { duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] } },
      }}
      className={className}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Nav
   ───────────────────────────────────────────── */

function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-kairo-white/90 backdrop-blur-sm border-b border-kairo-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2 text-sm font-medium tracking-widest uppercase text-kairo-black">
          <SushiIcon className="w-5 h-5 text-kairo-red" />
          Kairo
        </a>
        <div className="flex gap-8 text-xs uppercase tracking-[0.15em] font-medium text-kairo-dark">
          <a href="#omakase" className="hover:text-kairo-black transition-colors duration-300">Omakase</a>
          <a href="#menu" className="hover:text-kairo-black transition-colors duration-300">Menu</a>
          <a href="#method" className="hover:text-kairo-black transition-colors duration-300">Method</a>
          <a href="#reservations" className="hover:text-kairo-black transition-colors duration-300">Reservations</a>
        </div>
      </div>
    </nav>
  );
}

/* ─────────────────────────────────────────────
   Section: Hero
   ───────────────────────────────────────────── */

function SectionHero() {
  return (
    <section id="hero" className="min-h-screen pt-16 flex items-center">
      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center py-20 lg:py-28">
        {/* Left — Copy */}
        <div className="lg:col-span-5 space-y-10">
          <div className="space-y-4">
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-kairo-red font-medium">
              <FishIcon className="w-4 h-4" />
              Kairo Sushi Bar
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light leading-[1.05] tracking-tight text-kairo-black">
              Prepared<br />
              <span className="italic font-serif">with restraint.</span>
            </h1>
          </div>
          <div className="w-12 h-px bg-kairo-black/30" />
          <p className="text-sm leading-relaxed text-kairo-dark max-w-sm">
            An intimate omakase experience in SoHo. Eight seats. Seasonal fish.
            No distractions.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#reservations"
              className="inline-block px-8 py-3 bg-kairo-black text-kairo-white text-xs uppercase tracking-[0.15em] font-medium hover:bg-black/80 transition-colors duration-300"
            >
              Book Omakase
            </a>
            <a
              href="#menu"
              className="inline-block px-8 py-3 border border-kairo-black/20 text-kairo-black text-xs uppercase tracking-[0.15em] font-medium hover:border-kairo-black/50 transition-colors duration-300"
            >
              View &Agrave; La Carte
            </a>
          </div>
        </div>
        {/* Right — Image */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="aspect-[4/3] w-full overflow-hidden"
          >
            <img
              src={heroImage}
              alt="Sushi presentation"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Section: Omakase
   ───────────────────────────────────────────── */

function SectionOmakase() {
  return (
    <section id="omakase" className="py-24 lg:py-32 border-t border-kairo-border">
      <div className="max-w-6xl mx-auto px-6">
        <SectionReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Label column */}
            <div className="lg:col-span-3">
              <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-kairo-red font-medium mb-3">
                <FishIcon className="w-4 h-4" />
                The Experience
              </p>
              <h2 className="text-4xl lg:text-5xl font-light tracking-tight text-kairo-black">
                Omakase
              </h2>
              <p className="text-xs uppercase tracking-[0.15em] text-kairo-dark mt-2">
                {omakase.subtitle}
              </p>
            </div>
            {/* Content column */}
            <div className="lg:col-span-6 space-y-8">
              <p className="text-base leading-relaxed text-kairo-dark/80 max-w-lg">
                {omakase.description}
              </p>
              <div className="space-y-2">
                {omakase.details.map((d) => (
                  <div key={d.label} className="flex items-baseline gap-4 text-sm">
                    <span className="text-kairo-dark/50 uppercase tracking-[0.1em] text-[11px] font-medium min-w-[100px]">
                      {d.label}
                    </span>
                    <span className="text-kairo-black">{d.value}</span>
                  </div>
                ))}
              </div>
              <div className="w-8 h-px bg-kairo-black/20 mt-6" />
              <p className="text-xs leading-relaxed text-kairo-dark/60 max-w-sm">
                Omakase is served at the counter. Parties of two or four are recommended. Walk-ins are not available for omakase.
              </p>
            </div>
            {/* Image */}
            <div className="lg:col-span-3">
              <ImageReveal
                src={omakaseImage}
                alt="Omakase sushi platter"
                className="aspect-[3/4] w-full"
              />
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Section: Menu
   ───────────────────────────────────────────── */

function SectionMenu() {
  return (
    <section id="menu" className="py-24 lg:py-32 border-t border-kairo-border">
      <div className="max-w-6xl mx-auto px-6">
        <SectionReveal>
          <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-kairo-red font-medium mb-3">
            <PlateIcon className="w-4 h-4" />
            &Agrave; La Carte
          </p>
          <h2 className="text-4xl lg:text-5xl font-light tracking-tight text-kairo-black mb-16">
            Menu
          </h2>
        </SectionReveal>
        <div className="space-y-16">
          {menu.map((cat) => (
            <SectionReveal key={cat.category}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
                <div className="lg:col-span-3">
                  <h3 className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-kairo-dark/50 font-medium">
                    <SushiIcon className="w-3.5 h-3.5" />
                    {cat.category}
                  </h3>
                </div>
                <div className="lg:col-span-9 space-y-4">
                  {cat.items.map((item) => (
                    <div
                      key={item.name}
                      className="grid grid-cols-12 gap-4 py-2 border-b border-kairo-border/50 last:border-0"
                    >
                      <div className="col-span-8 sm:col-span-9">
                        <p className="text-sm font-medium text-kairo-black">{item.name}</p>
                        <p className="text-xs text-kairo-dark/60 mt-0.5">{item.description}</p>
                      </div>
                      <div className="col-span-4 sm:col-span-3 text-right">
                        <p className="text-sm text-kairo-black">${item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Section: Chef's Method
   ───────────────────────────────────────────── */

function SectionMethod() {
  return (
    <section id="method" className="py-24 lg:py-32 border-t border-kairo-border">
      <div className="max-w-6xl mx-auto px-6">
        <SectionReveal>
          <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-kairo-red font-medium mb-3">
            <BambooIcon className="w-4 h-4" />
            Philosophy
          </p>
          <h2 className="text-4xl lg:text-5xl font-light tracking-tight text-kairo-black mb-6">
            Chef's Method
          </h2>
          <div className="w-12 h-px bg-kairo-black/20 mb-16" />
        </SectionReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {chefMethodSteps.map((step, i) => (
            <SectionReveal key={step.title}>
              <div className="space-y-4">
                <span className="text-6xl lg:text-7xl font-light text-kairo-gray/70 leading-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="flex items-center gap-2 text-lg font-medium text-kairo-black mt-3">
                  {step.title === 'Rice' && <SushiIcon className="w-5 h-5 text-kairo-red/60" />}
                  {step.title === 'Fish' && <FishIcon className="w-5 h-5 text-kairo-red/60" />}
                  {step.title === 'Knife' && <BambooIcon className="w-5 h-5 text-kairo-red/60" />}
                  {step.title === 'Timing' && <StarIcon className="w-5 h-5 text-kairo-red/60" />}
                  {step.title}
                </h3>
                <p className="text-[11px] uppercase tracking-[0.2em] text-kairo-red">
                  {step.subtitle}
                </p>
                <div className="w-6 h-px bg-kairo-black/20" />
                <p className="text-sm leading-relaxed text-kairo-dark/70">
                  {step.description}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Section: Sake Pairings
   ───────────────────────────────────────────── */

function SectionSake() {
  return (
    <section id="sake" className="py-24 lg:py-32 border-t border-kairo-border">
      <div className="max-w-6xl mx-auto px-6">
        <SectionReveal>
          <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-kairo-red font-medium mb-3">
            <SakeIcon className="w-4 h-4" />
            Pairings
          </p>
          <h2 className="text-4xl lg:text-5xl font-light tracking-tight text-kairo-black mb-16">
            Sake
          </h2>
        </SectionReveal>
        <div className="space-y-8">
          {sakePairings.map((sake, i) => (
            <SectionReveal key={sake.name}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 py-5 border-b border-kairo-border/50 last:border-0">
                <div className="lg:col-span-3 flex items-baseline gap-3">
                  <span className="text-[11px] text-kairo-red font-mono">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <p className="text-base font-medium text-kairo-black">{sake.name}</p>
                    <p className="text-xs text-kairo-dark/50">{sake.type}</p>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <p className="text-xs uppercase tracking-[0.15em] text-kairo-dark/40">{sake.region}</p>
                </div>
                <div className="lg:col-span-7">
                  <p className="text-sm leading-relaxed text-kairo-dark/70">{sake.notes}</p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Section: Interior
   ───────────────────────────────────────────── */

function SectionInterior() {
  const labels = ['The Counter', 'Private Room', 'Bar Seating'];
  const images = [interiorImages.counter, interiorImages.privateRoom, interiorImages.barSeating];
  return (
    <section id="interior" className="py-24 lg:py-32 border-t border-kairo-border">
      <div className="max-w-6xl mx-auto px-6">
        <SectionReveal>
          <p className="text-xs uppercase tracking-[0.2em] text-kairo-red font-medium mb-3">
            Space
          </p>
          <h2 className="text-4xl lg:text-5xl font-light tracking-tight text-kairo-black mb-16">
            Interior
          </h2>
        </SectionReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {labels.map((label, i) => (
            <SectionReveal key={label}>
              <div className="space-y-4">
                <ImageReveal
                  src={images[i]}
                  alt={label}
                  className={`aspect-[4/5] w-full ${i === 1 ? 'lg:mt-8' : ''}`}
                />
                <p className="text-xs uppercase tracking-[0.15em] text-kairo-dark/60">{label}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Section: Reservations
   ───────────────────────────────────────────── */

function SectionReservations() {
  return (
    <section id="reservations" className="py-24 lg:py-32 border-t border-kairo-border">
      <div className="max-w-6xl mx-auto px-6">
        <SectionReveal>
          <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-kairo-red font-medium mb-3">
            <PhoneIcon className="w-4 h-4" />
            Booking
          </p>
          <h2 className="text-4xl lg:text-5xl font-light tracking-tight text-kairo-black mb-16">
            Reservations
          </h2>
        </SectionReveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7 space-y-10">
            {(
              [
                { title: 'Seating Times', body: reservationsPolicy.timing },
                { title: 'Cancellation', body: reservationsPolicy.cancellation },
                { title: 'Allergies & Restrictions', body: reservationsPolicy.allergies },
                { title: 'Booking Window', body: reservationsPolicy.booking },
              ] as const
            ).map((item) => (
              <SectionReveal key={item.title}>
                <div className="space-y-2">
                  <h3 className="text-xs uppercase tracking-[0.15em] text-kairo-dark font-medium">
                    {item.title}
                  </h3>
                  <div className="w-6 h-px bg-kairo-black/20" />
                  <p className="text-sm leading-relaxed text-kairo-dark/70 max-w-lg">
                    {item.body}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
          <div className="lg:col-span-5">
            <SectionReveal>
              <div className="bg-kairo-light p-8 lg:p-10 space-y-6">
                <p className="text-xs uppercase tracking-[0.15em] text-kairo-dark font-medium">
                  Reserve Your Seat
                </p>
                <p className="text-sm leading-relaxed text-kairo-dark/70">
                  Omakase reservations require a prepayment of $250 per person. Parties larger than four should contact us directly.
                </p>
                <div className="w-8 h-px bg-kairo-black/20" />
                <a
                  href="mailto:reserve@kairosushi.com"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-kairo-black text-kairo-white text-xs uppercase tracking-[0.15em] font-medium hover:bg-black/80 transition-colors duration-300"
                >
                  <MailIcon className="w-4 h-4" />
                  Book Omakase
                </a>
                <p className="flex items-center gap-2 text-[11px] text-kairo-dark/40">
                  <PhoneIcon className="w-3.5 h-3.5" />
                  Or call 212.555.0187
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Section: Footer
   ───────────────────────────────────────────── */

function SectionFooter() {
  return (
    <footer className="py-16 lg:py-20 border-t border-kairo-border bg-kairo-black text-kairo-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium">
              <SushiIcon className="w-4 h-4 text-kairo-red" />
              Kairo
            </p>
            <p className="text-[11px] text-white/50 leading-relaxed">
              Minimal Japanese dining in SoHo. Precision, restraint, seasonal omakase.
            </p>
          </div>
          {/* Hours */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.15em] font-medium text-white/60">
              {footerInfo.hours.heading}
            </p>
            <div className="space-y-1">
              {footerInfo.hours.lines.map((line) => (
                <p key={line} className="text-sm text-white/80 leading-relaxed">{line}</p>
              ))}
            </div>
          </div>
          {/* Location */}
          <div className="space-y-3">
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] font-medium text-white/60">
              <LocationIcon className="w-3.5 h-3.5" />
              {footerInfo.location.heading}
            </p>
            <div className="space-y-1">
              {footerInfo.location.lines.map((line) => (
                <p key={line} className="text-sm text-white/80 leading-relaxed">{line}</p>
              ))}
            </div>
          </div>
          {/* Contact */}
          <div className="space-y-3">
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] font-medium text-white/60">
              <PhoneIcon className="w-3.5 h-3.5" />
              {footerInfo.contact.heading}
            </p>
            <div className="space-y-1">
              {footerInfo.contact.lines.map((line) => (
                <p key={line} className="flex items-center gap-2 text-sm text-white/80 leading-relaxed">
                  {line.includes('@') ? <MailIcon className="w-3.5 h-3.5 shrink-0" /> : <PhoneIcon className="w-3.5 h-3.5 shrink-0" />}
                  {line}
                </p>
              ))}
            </div>
            <p className="flex items-center gap-2 text-sm text-white/50 mt-4">
              <StarIcon className="w-3.5 h-3.5" />
              {footerInfo.instagram}
            </p>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-white/30 tracking-wider">
          <p>&copy; {new Date().getFullYear()} Kairo Sushi Bar</p>
          <p>Designed with restraint</p>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   Main App
   ───────────────────────────────────────────── */

function App() {
  return (
    <div className="font-kairo antialiased bg-kairo-white text-kairo-black">
      <Nav />
      <main>
        <SectionHero />
        <SectionOmakase />
        <SectionMenu />
        <SectionMethod />
        <SectionSake />
        <SectionInterior />
        <SectionReservations />
      </main>
      <SectionFooter />
    </div>
  );
}

export default App;
