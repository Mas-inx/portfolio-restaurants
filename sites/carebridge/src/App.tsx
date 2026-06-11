import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  careServices,
  whoWeHelp,
  careMatchingSteps,
  trustBadges,
  familyUpdates,
  testimonials,
} from './data'

/* ─── Inline SVG Icons ─── */
function IconNursing({ c = "text-[#7BA88F]" }: { c?: string }) {
  return (
    <svg className={`w-7 h-7 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/><path d="M12 2v20"/><path d="M6 12l6-6 6 6"/>
    </svg>
  )
}
function IconPersonal({ c = "text-[#7BA88F]" }: { c?: string }) {
  return (
    <svg className={`w-7 h-7 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  )
}
function IconMedication({ c = "text-[#7BA88F]" }: { c?: string }) {
  return (
    <svg className={`w-7 h-7 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="7" y="2" width="10" height="20" rx="3"/><path d="M10 9h4"/><path d="M10 13h4"/><path d="M10 17h2"/>
    </svg>
  )
}
function IconSurgery({ c = "text-[#7BA88F]" }: { c?: string }) {
  return (
    <svg className={`w-7 h-7 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17l3-3"/><path d="M14 10l3-3"/><path d="M5 19l14-14"/><circle cx="12" cy="12" r="10"/>
    </svg>
  )
}
function IconCompanion({ c = "text-[#7BA88F]" }: { c?: string }) {
  return (
    <svg className={`w-7 h-7 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
    </svg>
  )
}
function IconChronic({ c = "text-[#7BA88F]" }: { c?: string }) {
  return (
    <svg className={`w-7 h-7 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/><path d="M16 12h-4l-2-4-2 4H8"/>
    </svg>
  )
}
function IconHeart({ c = "text-[#7BA88F]" }: { c?: string }) {
  return (
    <svg className={`w-7 h-7 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
    </svg>
  )
}
function IconCheck({ c = "text-[#7BA88F]" }: { c?: string }) {
  return (
    <svg className={`w-5 h-5 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}
function IconShield({ c = "text-[#7BA88F]" }: { c?: string }) {
  return (
    <svg className={`w-6 h-6 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  )
}
function IconMap({ c = "text-[#7BA88F]" }: { c?: string }) {
  return (
    <svg className={`w-5 h-5 ${c}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  )
}

function iconService(id: string): React.ReactNode {
  const base = "text-[#7BA88F]";
  switch (id) {
    case "nursing": return <IconNursing c={base} />;
    case "personal": return <IconPersonal c={base} />;
    case "medication": return <IconMedication c={base} />;
    case "surgery": return <IconSurgery c={base} />;
    case "companion": return <IconCompanion c={base} />;
    case "chronic": return <IconChronic c={base} />;
    default: return <IconHeart c={base} />;
  }
}

/* ─── Animation Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  }),
}
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

/* ─── Components ─── */
function SectionWrap({ id, className = '', children }: { id: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={`px-6 py-20 md:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  )
}

function SectionHeading({ title, subtitle, light = false }: { title: string; subtitle?: string; light?: boolean }) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
      variants={fadeUp} className="mb-14 text-center">
      <h2 className={`text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl ${light ? 'text-white' : 'text-[#3A3A3A]'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mx-auto mt-4 max-w-2xl text-lg leading-relaxed ${light ? 'text-white/80' : 'text-[#8A8580]'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}

/* ─── Navbar ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  const links = [
    { label: 'Services', href: '#services' },
    { label: 'Who We Help', href: '#who-we-help' },
    { label: 'Our Process', href: '#process' },
    { label: 'Trust & Safety', href: '#trust' },
    { label: 'Testimonials', href: '#testimonials' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#FFF9F2]/95 shadow-lg shadow-black/5 backdrop-blur-xl' : 'bg-transparent'
    }`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-[#3A3A3A]">
          <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
            <rect x="2" y="2" width="24" height="24" rx="8" fill="#7BA88F" opacity="0.15"/>
            <path d="M14 6C9.58 6 6 9.58 6 14s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8z" fill="#7BA88F" opacity="0.3"/>
            <path d="M14 10v8M10 14h8" stroke="#7BA88F" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          CareBridge
        </button>
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <button key={l.href} onClick={() => scrollTo(l.href)}
              className="text-sm font-medium text-[#8A8580] transition-colors hover:text-[#7BA88F]">
              {l.label}
            </button>
          ))}
          <button onClick={() => scrollTo('#cta')}
            className="rounded-full bg-[#7BA88F] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#5C8A72] hover:shadow-lg hover:shadow-[#7BA88F]/25">
            Get Started
          </button>
        </div>
        <button className="md:hidden" onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3A3A3A" strokeWidth="2">
            {menuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-[#FFF9F2] shadow-lg">
            <div className="flex flex-col gap-3 px-6 pb-6 pt-2">
              {links.map((l) => (
                <button key={l.href} onClick={() => scrollTo(l.href)}
                  className="text-left text-sm font-medium text-[#8A8580]">{l.label}</button>
              ))}
              <button onClick={() => scrollTo('#cta')}
                className="mt-2 rounded-full bg-[#7BA88F] px-5 py-2.5 text-sm font-semibold text-white">Get Started</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#FFF9F2] via-[#EFF6F2] to-[#EEF5FA] px-6 pt-28">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.06]">
        <svg viewBox="0 0 500 500" fill="none"><circle cx="350" cy="150" r="200" fill="#7BA88F"/><circle cx="100" cy="300" r="150" fill="#89B8D4"/></svg>
      </div>
      <div className="pointer-events-none absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-[#7BA88F]/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#7BA88F]/10 px-4 py-1.5">
            <IconHeart c="text-[#7BA88F] w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#7BA88F]">Compassionate home care</span>
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-[#3A3A3A] md:text-5xl lg:text-6xl">
            Care that comes to you
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[#8A8580] md:text-xl">
            Professional, compassionate home healthcare services that help your loved ones thrive in the place they call home.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
              onClick={() => document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' })}
              className="rounded-full bg-[#7BA88F] px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#7BA88F]/25 transition-all hover:bg-[#5C8A72]">
              Schedule Free Assessment
            </motion.button>
            <button onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
              className="rounded-full border border-[#E8E2DA] bg-white/80 px-8 py-3.5 text-base font-semibold text-[#3A3A3A] backdrop-blur-sm transition-all hover:border-[#7BA88F]/40 hover:text-[#7BA88F]">
              Our Services
            </button>
          </div>
          <div className="mt-8 flex items-center gap-6">
            <div className="flex -space-x-2">
              {[
                'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=40&h=40&fit=crop&crop=face&q=80',
                'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=40&h=40&fit=crop&crop=face&q=80',
                'https://images.unsplash.com/photo-1516303389659-d5e7c67255e7?w=40&h=40&fit=crop&crop=face&q=80',
                'https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=40&h=40&fit=crop&crop=face&q=80',
              ].map((src, i) => (
                <img key={i} src={src} className="w-8 h-8 rounded-full border-2 border-white object-cover" alt="" />
              ))}
            </div>
            <p className="text-sm text-[#8A8580]"><span className="font-semibold text-[#3A3A3A]">500+</span> families trusted</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          className="hidden lg:flex justify-center">
          <div className="relative w-full max-w-md">
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="rounded-3xl overflow-hidden shadow-2xl shadow-[#7BA88F]/15">
              <img src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=500&q=85"
                alt="Nurse caring for elderly patient" className="w-full h-72 object-cover" />
              <div className="bg-white p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#7BA88F] flex items-center justify-center text-white text-sm font-bold">RN</div>
                  <div>
                    <p className="text-sm font-semibold text-[#3A3A3A]">Nurse Rivera</p>
                    <p className="text-xs text-[#8A8580]">Registered Nurse</p>
                  </div>
                </div>
                <p className="text-sm text-[#8A8580] italic">"Compassionate care means seeing the person, not just the patient. Every family deserves that."</p>
              </div>
            </motion.div>
            {/* Floating trust badge */}
            <motion.div animate={{ x: [0, 6, 0], y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -right-2 -top-2 rounded-2xl bg-white shadow-lg p-3 border border-[#B5D4C4]">
              <IconShield c="text-[#7BA88F] w-6 h-6" />
              <p className="text-xs font-semibold text-[#3A3A3A] mt-1">Licensed</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Services ─── */
function Services() {
  return (
    <SectionWrap id="services" className="bg-white">
      <SectionHeading title="Our care services" subtitle="Comprehensive home healthcare tailored to your loved one's needs." />
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
        variants={stagger} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {careServices.map((s, i: number) => (
          <motion.div key={s.name} variants={fadeUp} custom={i}
            className="service-card group">
            <div className="aspect-[16/9] overflow-hidden">
              <img src={s.image} alt={s.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EFF6F2] flex items-center justify-center">
                  {iconService(s.icon)}
                </div>
                <h3 className="text-base font-semibold text-[#3A3A3A]">{s.name}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#8A8580]">{s.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrap>
  )
}

/* ─── Who We Help ─── */
function WhoWeHelp() {
  return (
    <SectionWrap id="who-we-help" className="bg-[#FFF9F2]">
      <SectionHeading title="Who we help" subtitle="Personalized care for every stage of life's journey." />
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
        variants={stagger} className="grid gap-6 md:grid-cols-2">
        {whoWeHelp.map((w, i: number) => (
          <motion.div key={w.group} variants={fadeUp} custom={i}
            className="rounded-2xl bg-white border border-[#E8E2DA] p-6 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#EFF6F2] flex items-center justify-center flex-shrink-0">
              <IconHeart />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#3A3A3A]">{w.group}</h3>
              <p className="mt-1 text-sm text-[#8A8580] leading-relaxed">{w.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrap>
  )
}

/* ─── Care Matching Process ─── */
function CareProcess() {
  return (
    <SectionWrap id="process" className="bg-[#EEF5FA]">
      <SectionHeading title="How we match you with care" subtitle="A thoughtful process that ensures the right fit for your family." />
      <div className="mx-auto max-w-4xl">
        <div className="space-y-6">
          {careMatchingSteps.map((step, i: number) => (
            <motion.div key={step.step} initial={{ opacity: 0, x: -20 }} whileInView="visible"
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }}
              className="care-timeline-item">
              <div className="absolute left-0 top-0 w-12 h-12 rounded-2xl bg-[#7BA88F] flex items-center justify-center text-white font-bold shadow-lg shadow-[#7BA88F]/20">
                {i + 1}
              </div>
              <div className="bg-white rounded-2xl border border-[#E8E2DA] p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-[#3A3A3A]">{step.step}</h3>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#7BA88F]">{step.duration}</span>
                </div>
                <p className="text-sm text-[#8A8580] leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrap>
  )
}

/* ─── Trust & Safety ─── */
function TrustSafety() {
  return (
    <SectionWrap id="trust" className="bg-white">
      <SectionHeading title="Trust and safety" subtitle="The highest standards of quality, security, and accountability." />
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
        variants={stagger} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {trustBadges.map((b, i: number) => (
          <motion.div key={b.title} variants={fadeUp} custom={i}
            className="rounded-2xl bg-[#FFF9F2] border border-[#E8E2DA] p-6 text-center hover:border-[#7BA88F]/30 transition-colors">
            <div className="w-14 h-14 rounded-2xl bg-[#EFF6F2] flex items-center justify-center mx-auto">
              <IconShield />
            </div>
            <h3 className="mt-4 text-base font-semibold text-[#3A3A3A]">{b.title}</h3>
            <p className="mt-2 text-sm text-[#8A8580]">{b.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrap>
  )
}

/* ─── Family Portal ─── */
function FamilyPortal() {
  return (
    <SectionWrap id="portal" className="bg-[#FFF9F2]">
      <SectionHeading title="Family portal" subtitle="Stay connected with real-time updates about your loved one's care." />
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl bg-[#7BA88F]/5 border border-[#B5D4C4] p-6 mb-8 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-[#7BA88F] mb-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M21 9H3"/><path d="M9 21V9"/></svg>
            <span className="font-semibold">Live Care Log</span>
          </div>
          <p className="text-xs text-[#8A8580]">Recent updates from your care team. Receive push notifications for each new entry.</p>
        </div>
        <div className="space-y-4">
          {familyUpdates.map((update, i: number) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView="visible"
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="portal-card p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#7BA88F]">{update.author}</span>
                <span className="text-xs text-[#8A8580]">{update.date}</span>
              </div>
              <p className="text-sm text-[#3A3A3A] leading-relaxed">{update.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrap>
  )
}

/* ─── Testimonials ─── */
function Testimonials() {
  return (
    <SectionWrap id="testimonials" className="bg-white">
      <SectionHeading title="What families say" subtitle="Real stories from families who trust us with their loved ones." />
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
        variants={stagger} className="grid gap-6 md:grid-cols-2">
        {testimonials.map((t, i: number) => (
          <motion.div key={t.name} variants={fadeUp} custom={i}
            className="testimonial-card p-6">
            <p className="text-sm leading-relaxed text-[#8A8580] italic">"{t.text}"</p>
            <div className="mt-4 pt-3 border-t border-[#E8E2DA]">
              <p className="text-sm font-semibold text-[#3A3A3A]">{t.name}</p>
              <p className="text-xs text-[#7BA88F]">{t.relationship}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrap>
  )
}

/* ─── CTA ─── */
function CTA() {
  return (
    <SectionWrap id="cta" className="bg-gradient-to-br from-[#7BA88F] to-[#5C8A72] relative overflow-hidden">
      <div className="pointer-events-none absolute top-0 right-0 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
      <div className="mx-auto max-w-3xl text-center relative">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView="visible" viewport={{ once: true }}>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white/90">
            Start your care journey
          </span>
          <h2 className="mt-5 text-3xl font-bold text-white md:text-4xl lg:text-5xl">Your family deserves the best care</h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Schedule a free in-home assessment. No obligation, no pressure — just compassionate guidance.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="rounded-full bg-white px-10 py-3.5 text-base font-semibold text-[#7BA88F] shadow-lg hover:shadow-xl transition-all">
              Schedule Free Assessment
            </motion.button>
            <button
              className="rounded-full border border-white/30 bg-white/10 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/20 transition-all">
              (555) 456-7890
            </button>
          </div>
        </motion.div>
      </div>
    </SectionWrap>
  )
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="bg-[#3A3A3A] px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 text-xl font-bold text-white">
              <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
                <rect x="2" y="2" width="24" height="24" rx="8" fill="#7BA88F"/>
                <path d="M14 10v8M10 14h8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              CareBridge
            </div>
            <p className="mt-3 text-sm text-[#A09890] max-w-md">
              Professional, compassionate home healthcare services. Helping families care for their loved ones since 2015.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Contact</h4>
            <p className="text-sm text-[#A09890]">555 Compassion Way</p>
            <p className="text-sm text-[#A09890] mt-1">Portland, OR 97201</p>
            <p className="text-sm text-[#A09890] mt-1">(555) 456-7890</p>
            <p className="text-sm text-[#A09890] mt-1">hello@carebridgehome.com</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Services</h4>
            <p className="text-sm text-[#A09890]">Skilled Nursing</p>
            <p className="text-sm text-[#A09890] mt-1">Personal Care</p>
            <p className="text-sm text-[#A09890] mt-1">Senior Companionship</p>
            <p className="text-sm text-[#A09890] mt-1">Post-Surgery Care</p>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-[#8A8580]">&copy; {new Date().getFullYear()} CareBridge Home Healthcare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

/* ─── App ─── */
export default function App() {
  return (
    <div className="font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <WhoWeHelp />
        <CareProcess />
        <TrustSafety />
        <FamilyPortal />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
