import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import {
  heroImage, ingredients, courses, menuPrice, menuPairing,
  rooms, pairings, rules, events, navLinks
} from './data';
import type { Ingredient, Course } from './data';

// ─── Utility Components ───────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="h-px w-12 bg-ember-orange" />
      <span className="text-[11px] uppercase tracking-[0.3em] text-ember-smoke font-medium">{children}</span>
    </div>
  );
}

function MagneticButton({ children, href, variant = 'primary' }: { children: React.ReactNode; href: string; variant?: 'primary' | 'ghost' }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
    setPos({ x, y });
  };

  const base = variant === 'primary'
    ? 'bg-ember-orange text-ember-bone px-8 py-4 text-xs uppercase tracking-[0.2em]'
    : 'border border-ember-smoke/40 text-ember-bone px-8 py-4 text-xs uppercase tracking-[0.2em] hover:border-ember-orange hover:text-ember-orange';

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={handleMouse}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      className={`${base} inline-block transition-all duration-300`}
    >
      {children}
    </a>
  );
}

function RevealOnScroll({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-ember-black/95 backdrop-blur-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="font-serif text-xl tracking-wide text-ember-bone">Ember Archive</a>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} className="text-[11px] uppercase tracking-[0.2em] text-ember-smoke hover:text-ember-bone transition-colors">{link.label}</a>
          ))}
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-ember-bone">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? <path d="M6 6l12 12M6 18L18 6" /> : <><path d="M4 8h16" /><path d="M4 16h16" /></>}
          </svg>
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-ember-black/98 border-t border-ember-ash">
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map(link => (
                <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-sm text-ember-bone/80 hover:text-ember-orange">{link.label}</a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.3]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden flex items-end">
      <motion.div style={{ scale }} className="absolute inset-0">
        <img src={heroImage} alt="Open flame" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ember-black via-ember-black/60 to-ember-black/30" />
      </motion.div>
      <motion.div style={{ opacity }} className="relative z-10 max-w-7xl mx-auto px-6 pb-24 w-full">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-ember-bone leading-[0.95] mb-8"
          >
            Fire keeps<br />the record.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-ember-smoke text-sm md:text-base max-w-md mb-10 leading-relaxed"
          >
            A reservation-only dining room built around open flame, aged ingredients, and the quiet discipline of heat.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <MagneticButton href="#reserve">Reserve a Table</MagneticButton>
            <MagneticButton href="#menu" variant="ghost">View Tasting Menu</MagneticButton>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-16 flex gap-8 text-[11px] uppercase tracking-[0.2em] text-ember-smoke"
        >
          <span>28 Seats</span>
          <span>·</span>
          <span>Wed–Sun</span>
          <span>·</span>
          <span>Two Seatings</span>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Archive Concept ──────────────────────────────────────────────────────────

function IngredientCard({ item, index }: { item: Ingredient; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="bg-ember-charcoal border border-ember-ash/50 p-8 md:p-10"
    >
      <div className="flex items-start justify-between mb-6">
        <h3 className="font-serif text-2xl md:text-3xl text-ember-bone">{item.name}</h3>
        <span className="text-[10px] uppercase tracking-[0.3em] text-ember-orange">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="mb-6 overflow-hidden h-48 md:h-56">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80" />
      </div>
      <p className="text-[11px] uppercase tracking-[0.2em] text-ember-smoke mb-3">{item.origin}</p>
      <p className="text-sm text-ember-cream/70 mb-4 leading-relaxed">{item.technique}</p>
      <p className="font-serif italic text-ember-bone/90 leading-relaxed">{item.note}</p>
    </motion.div>
  );
}

function ArchiveSection() {
  return (
    <section id="archive" className="py-32 md:py-48">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-12 md:gap-20">
          <div className="md:col-span-4 md:sticky md:top-32 md:self-start">
            <SectionLabel>The Archive</SectionLabel>
            <h2 className="font-serif text-3xl md:text-4xl text-ember-bone leading-tight mb-6">
              Every ingredient<br />has a history.
            </h2>
            <p className="text-sm text-ember-smoke leading-relaxed">
              We keep a record of what passes through the fire. Each ingredient is sourced, transformed, and documented — not as a menu note, but as a living archive of technique and place.
            </p>
          </div>
          <div className="md:col-span-8 space-y-8">
            {ingredients.map((item, i) => (
              <IngredientCard key={item.name} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Tasting Menu Timeline ────────────────────────────────────────────────────

function CourseRow({ course, index }: { course: Course; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="grid grid-cols-12 gap-4 py-8 border-b border-ember-ash/40 group hover:bg-ember-charcoal/50 transition-colors px-4 -mx-4"
    >
      <div className="col-span-2 md:col-span-1">
        <span className="font-serif text-2xl text-ember-orange/80">{course.number}</span>
      </div>
      <div className="col-span-10 md:col-span-4">
        <h4 className="font-serif text-lg text-ember-bone mb-1">{course.name}</h4>
        <p className="text-[11px] uppercase tracking-[0.15em] text-ember-smoke">{course.technique}</p>
      </div>
      <div className="col-span-12 md:col-span-4">
        <p className="text-sm text-ember-cream/70 leading-relaxed">{course.ingredients}</p>
      </div>
      <div className="col-span-9 md:col-span-2">
        <p className="text-xs text-ember-smoke italic">{course.pairing}</p>
      </div>
      <div className="col-span-3 md:col-span-1 text-right">
        <span className="text-xs text-ember-smoke">{course.price}</span>
      </div>
    </motion.div>
  );
}

function MenuSection() {
  return (
    <section id="menu" className="py-32 md:py-48 bg-ember-charcoal/30">
      <div className="max-w-7xl mx-auto px-6">
        <RevealOnScroll>
          <SectionLabel>Tasting Menu</SectionLabel>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
            <h2 className="font-serif text-3xl md:text-5xl text-ember-bone leading-tight">Eight courses.<br />One evening.</h2>
            <div className="mt-6 md:mt-0 text-right">
              <p className="font-serif text-2xl text-ember-bone">{menuPrice}</p>
              <p className="text-xs text-ember-smoke mt-1">{menuPairing}</p>
            </div>
          </div>
        </RevealOnScroll>
        <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-ember-ash text-[10px] uppercase tracking-[0.2em] text-ember-smoke px-4">
          <div className="col-span-1">#</div>
          <div className="col-span-4">Course</div>
          <div className="col-span-4">Ingredients</div>
          <div className="col-span-2">Pairing</div>
          <div className="col-span-1 text-right">Price</div>
        </div>
        {courses.map((course, i) => (
          <CourseRow key={course.number} course={course} index={i} />
        ))}
      </div>
    </section>
  );
}

// ─── Fire Room ────────────────────────────────────────────────────────────────

function FireRoomSection() {
  return (
    <section id="rooms" className="py-32 md:py-48">
      <div className="max-w-7xl mx-auto px-6">
        <RevealOnScroll>
          <SectionLabel>The Rooms</SectionLabel>
          <h2 className="font-serif text-3xl md:text-5xl text-ember-bone leading-tight mb-16">Four ways to sit<br />with the fire.</h2>
        </RevealOnScroll>
        <div className="grid md:grid-cols-2 gap-6">
          {rooms.map((room, i) => (
            <RevealOnScroll key={room.name} delay={i * 0.15}>
              <div className="group relative overflow-hidden aspect-[4/3]">
                <img src={room.image} alt={room.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ember-black via-ember-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-serif text-xl md:text-2xl text-ember-bone">{room.name}</h3>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-ember-orange">{room.capacity}</span>
                  </div>
                  <p className="text-sm text-ember-cream/70">{room.description}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pairings (Horizontal Scroll) ────────────────────────────────────────────

function PairingsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="pairings" className="py-32 md:py-48 bg-ember-charcoal/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <RevealOnScroll>
          <SectionLabel>Pairings</SectionLabel>
          <h2 className="font-serif text-3xl md:text-5xl text-ember-bone leading-tight">What to drink<br />with the fire.</h2>
        </RevealOnScroll>
      </div>
      <div ref={scrollRef} className="flex gap-6 overflow-x-auto px-6 pb-8 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
        <div className="shrink-0 w-6 md:w-[calc((100vw-1280px)/2+3rem)]" />
        {pairings.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="shrink-0 w-[300px] md:w-[380px] snap-start group"
          >
            <div className="overflow-hidden mb-4 aspect-[3/4]">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-ember-orange">{p.type}</span>
            <h3 className="font-serif text-xl text-ember-bone mt-2 mb-1">{p.name}</h3>
            <p className="text-xs text-ember-smoke mb-3">{p.region}</p>
            <p className="text-sm text-ember-cream/70 leading-relaxed mb-3">{p.notes}</p>
            <p className="text-[11px] text-ember-smoke">{p.serving}</p>
          </motion.div>
        ))}
        <div className="shrink-0 w-6" />
      </div>
    </section>
  );
}

// ─── Before You Book ──────────────────────────────────────────────────────────

function RulesSection() {
  return (
    <section className="py-32 md:py-48">
      <div className="max-w-7xl mx-auto px-6">
        <RevealOnScroll>
          <SectionLabel>Before You Book</SectionLabel>
          <h2 className="font-serif text-3xl md:text-5xl text-ember-bone leading-tight mb-16">The details<br />that matter.</h2>
        </RevealOnScroll>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-ember-ash/30">
          {rules.map((rule, i) => (
            <RevealOnScroll key={rule.label} delay={i * 0.08}>
              <div className="bg-ember-black p-8 md:p-10 h-full">
                <h4 className="text-[11px] uppercase tracking-[0.2em] text-ember-orange mb-4">{rule.label}</h4>
                <p className="text-sm text-ember-cream/70 leading-relaxed">{rule.detail}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Private Evenings ─────────────────────────────────────────────────────────

function PrivateSection() {
  return (
    <section id="private" className="py-32 md:py-48 bg-ember-charcoal/30">
      <div className="max-w-7xl mx-auto px-6">
        <RevealOnScroll>
          <SectionLabel>Private Evenings</SectionLabel>
          <h2 className="font-serif text-3xl md:text-5xl text-ember-bone leading-tight mb-16">Your evening.<br />Our fire.</h2>
        </RevealOnScroll>
        <div className="grid md:grid-cols-2 gap-8">
          {events.map((event, i) => (
            <RevealOnScroll key={event.title} delay={i * 0.12}>
              <div className="border border-ember-ash/50 p-8 md:p-10 h-full hover:border-ember-orange/40 transition-colors">
                <h3 className="font-serif text-2xl text-ember-bone mb-3">{event.title}</h3>
                <p className="text-xs text-ember-orange mb-4">{event.capacity}</p>
                <p className="text-sm text-ember-cream/70 leading-relaxed mb-6">{event.description}</p>
                <ul className="space-y-2">
                  {event.includes.map(item => (
                    <li key={item} className="flex items-center gap-3 text-sm text-ember-smoke">
                      <span className="w-1 h-1 bg-ember-orange rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Reservation CTA ──────────────────────────────────────────────────────────

function ReservationSection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', date: '', party: '2', notes: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="reserve" className="py-32 md:py-48">
      <div className="max-w-3xl mx-auto px-6">
        <RevealOnScroll>
          <SectionLabel>Reserve</SectionLabel>
          <h2 className="font-serif text-3xl md:text-5xl text-ember-bone leading-tight mb-4">Request a table.</h2>
          <p className="text-sm text-ember-smoke mb-12">We confirm all reservations within 24 hours. Seatings are 5:30 PM and 8:30 PM, Wednesday through Sunday.</p>
        </RevealOnScroll>
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-ember-orange/40 p-10 text-center"
            >
              <div className="w-12 h-12 mx-auto mb-6 border border-ember-orange rounded-full flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ember-orange">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl text-ember-bone mb-3">Request received.</h3>
              <p className="text-sm text-ember-cream/70">We'll confirm your table at {form.name || 'your email'} within 24 hours. Check your inbox for details.</p>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-ember-smoke block mb-2">Name</label>
                  <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full bg-transparent border-b border-ember-ash py-3 text-ember-bone focus:border-ember-orange outline-none transition-colors" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-ember-smoke block mb-2">Email</label>
                  <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full bg-transparent border-b border-ember-ash py-3 text-ember-bone focus:border-ember-orange outline-none transition-colors" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-ember-smoke block mb-2">Date</label>
                  <input type="date" required value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="w-full bg-transparent border-b border-ember-ash py-3 text-ember-bone focus:border-ember-orange outline-none transition-colors" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-ember-smoke block mb-2">Party Size</label>
                  <select value={form.party} onChange={e => setForm({ ...form, party: e.target.value })} className="w-full bg-transparent border-b border-ember-ash py-3 text-ember-bone focus:border-ember-orange outline-none transition-colors">
                    {['1', '2', '3', '4', '5', '6'].map(n => <option key={n} value={n} className="bg-ember-black">{n} {Number(n) === 1 ? 'guest' : 'guests'}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-ember-smoke block mb-2">Dietary Notes</label>
                <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={3} className="w-full bg-transparent border-b border-ember-ash py-3 text-ember-bone focus:border-ember-orange outline-none transition-colors resize-none" placeholder="Allergies, dietary requirements, special occasions..." />
              </div>
              <div className="pt-4">
                <button type="submit" className="bg-ember-orange text-ember-bone px-10 py-4 text-xs uppercase tracking-[0.2em] hover:bg-ember-ember transition-colors">
                  Request Reservation
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-ember-ash/40 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="font-serif text-xl text-ember-bone mb-4">Ember Archive</h3>
            <p className="text-sm text-ember-smoke leading-relaxed">A reservation-only dining room built around open flame and the quiet discipline of heat.</p>
          </div>
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-ember-smoke mb-4">Hours</h4>
            <p className="text-sm text-ember-cream/70">Wednesday – Sunday</p>
            <p className="text-sm text-ember-cream/70">5:30 PM & 8:30 PM seatings</p>
          </div>
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-ember-smoke mb-4">Location</h4>
            <p className="text-sm text-ember-cream/70">412 Ash Street, Suite B</p>
            <p className="text-sm text-ember-cream/70">Healdsburg, CA 95448</p>
          </div>
        </div>
        <div className="border-t border-ember-ash/40 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-ember-smoke">© 2024 Ember Archive. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-ember-smoke hover:text-ember-bone">Instagram</a>
            <a href="#" className="text-xs text-ember-smoke hover:text-ember-bone">Privacy</a>
            <a href="#" className="text-xs text-ember-smoke hover:text-ember-bone">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="grain-overlay">
      <Navbar />
      <Hero />
      <ArchiveSection />
      <MenuSection />
      <FireRoomSection />
      <PairingsSection />
      <RulesSection />
      <PrivateSection />
      <ReservationSection />
      <Footer />
    </div>
  );
}
