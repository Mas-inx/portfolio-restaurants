import { useState, useEffect, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  siteInfo,
  navLinks,
  treatments,
  visitOptions,
  howItWorksSteps,
  pricingItems,
  acceptedInsurances,
  reviews,
  type Treatment,
  type VisitOption,
  type HowItWorksStep,
  type Review,
} from './data'

/* SVG Icon Components */
function IconFever({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
      <circle cx="12" cy="18.5" r="2.5" />
    </svg>
  );
}
function IconInjury({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14" />
      <path d="M2 20h20" />
      <path d="M12 10v4" />
      <path d="M10 12h4" />
    </svg>
  );
}
function IconWound({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 8l8 8" />
      <path d="M16 8l-8 8" />
    </svg>
  );
}
function IconBurn({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2c0 4 4 6 4 10a4 4 0 0 1-8 0c0-4 4-6 4-10z" />
      <path d="M12 22a4 4 0 0 0 0-8 4 4 0 0 0 0 8z" />
    </svg>
  );
}
function IconEar({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a6 6 0 0 0-6 6c0 3 2 5 2 5v2a4 4 0 0 0 8 0v-2s2-2 2-5a6 6 0 0 0-6-6z" />
      <line x1="12" y1="18" x2="12" y2="20" />
    </svg>
  );
}
function IconUti({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22a5 5 0 0 1-5-5V7a5 5 0 0 1 10 0v10a5 5 0 0 1-5 5z" />
      <line x1="10" y1="12" x2="14" y2="12" />
      <line x1="12" y1="10" x2="12" y2="14" />
    </svg>
  );
}
function IconTest({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="9" y1="15" x2="15" y2="15" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  );
}
function IconAllergy({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 21h10" />
      <path d="M12 21V9" />
      <path d="M12 9a4 4 0 0 0 4-4" />
      <path d="M8 5a4 4 0 0 0 4 4" />
      <circle cx="6" cy="5" r="1" />
      <circle cx="18" cy="5" r="1" />
      <circle cx="12" cy="3" r="1" />
    </svg>
  );
}
function IconPhone({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function IconHospital({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18" />
      <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
      <path d="M10 9h4" />
      <path d="M12 7v4" />
      <line x1="9" y1="15" x2="15" y2="15" />
    </svg>
  );
}
function IconDoctor({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="7" r="4" />
      <path d="M5.5 21a8.5 8.5 0 0 1 13 0" />
      <circle cx="12" cy="19" r="1" />
      <path d="M18 16c0-3-2.5-5-6-5s-6 2-6 5" />
    </svg>
  );
}
function IconCheckCircle({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  fever: IconFever,
  injury: IconInjury,
  wound: IconWound,
  burn: IconBurn,
  ear: IconEar,
  uti: IconUti,
  test: IconTest,
  allergy: IconAllergy,
  phone: IconPhone,
  hospital: IconHospital,
  doctor: IconDoctor,
  check: IconCheckCircle,
};

/* ------------------------------------------------------------------ */
/*  Animation variants                                                */
/* ------------------------------------------------------------------ */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
}

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

/* ------------------------------------------------------------------ */
/*  Section wrapper + heading                                         */
/* ------------------------------------------------------------------ */
function SectionWrap({
  id,
  className = '',
  children,
}: {
  id: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className={`px-6 py-20 md:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  )
}

function SectionHeading({
  title,
  subtitle,
  light = false,
}: {
  title: string
  subtitle?: string
  light?: boolean
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeUp}
      className="mb-14 text-center"
    >
      <h2 className={`text-3xl font-bold tracking-tight md:text-4xl ${light ? 'text-white' : 'text-[#1E293B]'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mx-auto mt-4 max-w-2xl text-lg leading-relaxed ${light ? 'text-white/80' : 'text-[#64748B]'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Navbar                                                             */
/* ------------------------------------------------------------------ */
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
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 shadow-sm backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-xl font-bold tracking-tight text-[#1E293B]"
        >
          {siteInfo.name}
        </button>
        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="text-sm font-medium text-[#64748B] transition-colors hover:text-[#EF4444]"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('#cta')}
            className="rounded-full bg-[#EF4444] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#DC2626]"
          >
            Check In Online
          </button>
        </div>
        <button
          className="md:hidden"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1E293B" strokeWidth="2">
            {menuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-white shadow-md"
          >
            <div className="flex flex-col gap-3 px-6 pb-6 pt-2">
              {navLinks.map((l) => (
                <button
                  key={l.href}
                  onClick={() => scrollTo(l.href)}
                  className="text-left text-sm font-medium text-[#64748B]"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo('#cta')}
                className="mt-2 rounded-full bg-[#EF4444] px-5 py-2.5 text-sm font-semibold text-white"
              >
                Check In Online
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

/* ------------------------------------------------------------------ */
/*  Hero + wait time                                                  */
/* ------------------------------------------------------------------ */
function Hero() {
  const [wait, setWait] = useState(siteInfo.currentWaitTime)

  useEffect(() => {
    const iv = setInterval(() => {
      setWait((w) => {
        const delta = Math.random() > 0.5 ? 1 : -1
        return Math.max(3, Math.min(30, w + delta))
      })
    }, 8000)
    return () => clearInterval(iv)
  }, [])

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#0F172A] px-6 pt-24">
      {/* Unsplash background */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1600&q=85"
          alt="Medical clinic"
          className="w-full h-full object-cover opacity-15"
        />
      </div>
      {/* subtle background pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 25px 25px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }}
        >
          <span className="inline-block rounded-full bg-[#EF4444]/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#EF4444]">
            Open now — no appointment needed
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            {siteInfo.tagline}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[#94A3B8] md:text-xl">
            {siteInfo.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' })}
              className="rounded-full bg-[#EF4444] px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-[#DC2626] hover:shadow-lg"
            >
              Check In Online
            </button>
            <button
              onClick={() => document.querySelector('#treatments')?.scrollIntoView({ behavior: 'smooth' })}
              className="rounded-full border border-[#334155] bg-white/5 px-8 py-3.5 text-base font-semibold text-white transition-all hover:border-white/30 hover:bg-white/10"
            >
              What We Treat
            </button>
          </div>
        </motion.div>

        {/* Wait time card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] as const }}
          className="flex justify-center"
        >
          <div className="w-full max-w-sm rounded-3xl border border-[#334155] bg-[#1E293B] p-8 shadow-2xl">
            <p className="text-center text-sm font-semibold uppercase tracking-wider text-[#94A3B8]">
              Current Wait Time
            </p>
            <motion.p
              key={wait}
              initial={{ scale: 1.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="mt-3 text-center text-7xl font-black text-white"
            >
              {wait}
              <span className="ml-1 text-2xl font-normal text-[#94A3B8]">min</span>
            </motion.p>
            <p className="mt-1 text-center text-sm text-[#64748B]">Average wait for walk-ins</p>
            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between rounded-xl bg-[#0F172A] px-4 py-3">
                <span className="text-sm text-[#94A3B8]">Patients ahead of you</span>
                <span className="text-sm font-bold text-white">{Math.max(0, Math.floor(wait / 4))}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-[#0F172A] px-4 py-3">
                <span className="text-sm text-[#94A3B8]">Providers on duty</span>
                <span className="text-sm font-bold text-white">4</span>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-[#EF4444]/10 py-3">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#EF4444]" />
              <span className="text-sm font-medium text-[#EF4444]">Accepting walk-ins now</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  What We Treat                                                     */
/* ------------------------------------------------------------------ */
function TreatmentsSection() {
  return (
    <SectionWrap id="treatments" className="bg-white">
      <SectionHeading
        title="Conditions we treat every day"
        subtitle="From common illnesses to minor injuries — we've got you covered, no appointment needed."
      />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={stagger}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {treatments.map((t: Treatment, i: number) => {
          const IconComponent = iconMap[t.icon];
          return (
            <motion.div
              key={t.title}
              variants={fadeUp}
              custom={i}
              whileHover={{ y: -3 }}
              className="rounded-2xl border border-[#E2E8F0] bg-white p-5 transition-all hover:border-[#EF4444]/20 hover:shadow-md"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#EF4444]/10 text-[#EF4444]">
                {IconComponent ? <IconComponent className="w-5 h-5" /> : null}
              </div>
              <h3 className="mt-3 text-sm font-semibold text-[#1E293B]">{t.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[#64748B]">{t.description}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionWrap>
  )
}

/* ------------------------------------------------------------------ */
/*  Visit Options                                                     */
/* ------------------------------------------------------------------ */
function VisitOptions() {
  return (
    <SectionWrap id="visit" className="bg-[#F8FAFC]">
      <SectionHeading
        title="Four ways to get care"
        subtitle="Choose the option that works best for you."
      />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={stagger}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        {visitOptions.map((v: VisitOption, i: number) => (
          <motion.div
            key={v.title}
            variants={fadeUp}
            custom={i}
            className="relative rounded-2xl border border-[#E2E8F0] bg-white p-6 transition-all hover:shadow-lg"
          >
            {v.badge && (
              <span className="absolute -top-2.5 right-4 rounded-full bg-[#EF4444] px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                {v.badge}
              </span>
            )}
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EF4444]/10 text-lg font-bold text-[#EF4444]">
              {i + 1}
            </div>
            <h3 className="mt-4 text-base font-semibold text-[#1E293B]">{v.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#64748B]">{v.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrap>
  )
}

/* ------------------------------------------------------------------ */
/*  How It Works                                                     */
/* ------------------------------------------------------------------ */
function HowItWorks() {
  return (
    <SectionWrap id="how-it-works" className="bg-white">
      <SectionHeading
        title="How it works"
        subtitle="From walk-in to follow-up in four simple steps."
      />
      <div className="relative">
        <div className="absolute top-12 left-[calc(12.5%+16px)] right-[calc(12.5%+16px)] hidden h-0.5 bg-[#E2E8F0] md:block" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="grid gap-8 md:grid-cols-4"
        >
          {howItWorksSteps.map((s: HowItWorksStep, i: number) => {
            const IconComponent = iconMap[s.icon];
            return (
              <motion.div
                key={s.step}
                variants={fadeUp}
                custom={i}
                className="flex flex-col items-center text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EF4444]/10 text-[#EF4444]">
                  {IconComponent ? <IconComponent className="w-7 h-7" /> : null}
                </div>
                <h3 className="mt-4 text-base font-semibold text-[#1E293B]">{s.step}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#64748B]">{s.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </SectionWrap>
  )
}

/* ------------------------------------------------------------------ */
/*  Pricing & Insurance                                               */
/* ------------------------------------------------------------------ */
function PricingInsurance() {
  const [showAllPrices, setShowAllPrices] = useState(false)
  const displayedPrices = showAllPrices ? pricingItems : pricingItems.slice(0, 4)
  const [showAllIns, setShowAllIns] = useState(false)
  const displayedIns = showAllIns ? acceptedInsurances : acceptedInsurances.slice(0, 5)

  return (
    <SectionWrap id="pricing" className="bg-[#F8FAFC]">
      <SectionHeading
        title="Transparent pricing & accepted insurance"
        subtitle="Know what you'll pay before you walk in. We accept most major plans."
      />
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Pricing */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-3"
        >
          <h3 className="text-lg font-semibold text-[#1E293B]">Self-pay prices</h3>
          {displayedPrices.map((p) => (
            <div
              key={p.service}
              className="flex items-center justify-between rounded-xl border border-[#E2E8F0] bg-white px-5 py-3"
            >
              <span className="text-sm text-[#1E293B]">{p.service}</span>
              <span className="text-sm font-semibold text-[#EF4444]">{p.price}</span>
            </div>
          ))}
          {pricingItems.length > 4 && (
            <button
              onClick={() => setShowAllPrices((v) => !v)}
              className="text-sm font-medium text-[#EF4444] underline underline-offset-2"
            >
              {showAllPrices ? 'Show less' : `View all ${pricingItems.length} prices`}
            </button>
          )}
        </motion.div>

        {/* Insurance */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-3"
        >
          <h3 className="text-lg font-semibold text-[#1E293B]">Accepted insurance plans</h3>
          {displayedIns.map((ins) => (
            <div
              key={ins}
              className="flex items-center gap-3 rounded-xl border border-[#E2E8F0] bg-white px-5 py-3"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#10B981] text-[10px] font-bold text-white">
                ✓
              </span>
              <span className="text-sm text-[#1E293B]">{ins}</span>
            </div>
          ))}
          {acceptedInsurances.length > 5 && (
            <button
              onClick={() => setShowAllIns((v) => !v)}
              className="text-sm font-medium text-[#EF4444] underline underline-offset-2"
            >
              {showAllIns ? 'Show less' : `View all ${acceptedInsurances.length} plans`}
            </button>
          )}
        </motion.div>
      </div>
    </SectionWrap>
  )
}

/* ------------------------------------------------------------------ */
/*  Hours                                                              */
/* ------------------------------------------------------------------ */
function Hours() {
  return (
    <SectionWrap id="hours" className="bg-white">
      <SectionHeading
        title="We're here when you need us"
        subtitle="Extended hours every day, including weekends."
      />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView="visible"
        viewport={{ once: true }}
        className="mx-auto max-w-xl"
      >
        <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 md:p-8">
          <div className="space-y-4">
            {Object.entries(siteInfo.hours).map(([day, hours]) => (
              <div
                key={day}
                className="flex items-center justify-between border-b border-[#E2E8F0] pb-3 last:border-0"
              >
                <span className="text-sm font-medium text-[#1E293B]">{day}</span>
                <span className={`text-sm font-medium ${hours.includes('Closed') ? 'text-[#EF4444]' : 'text-[#1E293B]'}`}>
                  {hours}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-xl bg-[#0F172A] p-4 text-center">
            <p className="text-sm font-semibold text-white">We are open now</p>
            <p className="mt-1 text-xs text-[#94A3B8]">{siteInfo.address}</p>
          </div>
        </div>
      </motion.div>
    </SectionWrap>
  )
}

/* ------------------------------------------------------------------ */
/*  Reviews                                                            */
/* ------------------------------------------------------------------ */
function ReviewsSection() {
  return (
    <SectionWrap id="reviews" className="bg-[#F8FAFC]">
      <SectionHeading
        title="What patients are saying"
        subtitle="Real reviews from real people who walked through our doors."
      />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={stagger}
        className="grid gap-6 md:grid-cols-2"
      >
        {reviews.map((r: Review, i: number) => (
          <motion.div
            key={r.author}
            variants={fadeUp}
            custom={i}
            className="rounded-2xl border border-[#E2E8F0] bg-white p-6 transition-all hover:shadow-md"
          >
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, idx) => (
                <span key={idx} className={`text-sm ${idx < r.rating ? 'text-[#F59E0B]' : 'text-[#E2E8F0]'}`}>
                  ★
                </span>
              ))}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[#475569]">&ldquo;{r.text}&rdquo;</p>
            <p className="mt-3 text-xs font-semibold text-[#1E293B]">— {r.author}</p>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrap>
  )
}

/* ------------------------------------------------------------------ */
/*  CTA / Online Check-In Form                                       */
/* ------------------------------------------------------------------ */
function CTAForm() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <SectionWrap id="cta" className="bg-[#0F172A]">
      <SectionHeading
        title="Check in online — skip the waiting room"
        subtitle="Secure your spot from your phone. We'll text you when we're ready."
        light
      />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView="visible"
        viewport={{ once: true }}
        className="mx-auto max-w-xl"
      >
        {submitted ? (
          <div className="rounded-2xl border border-[#334155] bg-[#1E293B] p-10 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#10B981]/20 flex items-center justify-center">
              <IconCheckCircle className="w-8 h-8 text-[#10B981]" />
            </div>
            <p className="mt-4 text-xl font-semibold text-white">You're checked in!</p>
            <p className="mt-2 text-[#94A3B8]">
              We'll text you when we're ready. Current wait time is{' '}
              <span className="font-semibold text-white">{siteInfo.currentWaitTime} minutes</span>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-[#334155] bg-[#1E293B] p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <input
                type="text"
                placeholder="First name"
                required
                className="w-full rounded-xl border border-[#334155] bg-[#0F172A] px-4 py-3 text-sm text-white placeholder-[#64748B] outline-none focus:border-[#EF4444]"
              />
              <input
                type="text"
                placeholder="Last name"
                required
                className="w-full rounded-xl border border-[#334155] bg-[#0F172A] px-4 py-3 text-sm text-white placeholder-[#64748B] outline-none focus:border-[#EF4444]"
              />
            </div>
            <input
              type="tel"
              placeholder="Phone number (for text updates)"
              required
              className="w-full rounded-xl border border-[#334155] bg-[#0F172A] px-4 py-3 text-sm text-white placeholder-[#64748B] outline-none focus:border-[#EF4444]"
            />
            <select
              required
              className="w-full rounded-xl border border-[#334155] bg-[#0F172A] px-4 py-3 text-sm text-white outline-none focus:border-[#EF4444]"
            >
              <option value="" disabled selected className="text-gray-400">
                Reason for visit
              </option>
              <option value="illness" className="text-[#1E293B]">Illness / fever / flu</option>
              <option value="injury" className="text-[#1E293B]">Minor injury / sprain / cut</option>
              <option value="testing" className="text-[#1E293B]">COVID / strep / flu test</option>
              <option value="physical" className="text-[#1E293B]">Physical / screening</option>
              <option value="other" className="text-[#1E293B]">Other</option>
            </select>
            <textarea
              rows={2}
              placeholder="Brief description of symptoms (optional)"
              className="w-full rounded-xl border border-[#334155] bg-[#0F172A] px-4 py-3 text-sm text-white placeholder-[#64748B] outline-none focus:border-[#EF4444]"
            />
            <button
              type="submit"
              className="w-full rounded-xl bg-[#EF4444] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#DC2626]"
            >
              Check In Now
            </button>
            <p className="text-center text-xs text-[#64748B]">
              By checking in, you agree to our privacy policy. Your information is encrypted.
            </p>
          </form>
        )}
      </motion.div>
    </SectionWrap>
  )
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */
function Footer() {
  return (
    <footer className="bg-[#0F172A] border-t border-[#334155] px-6 py-10 text-center text-sm text-[#64748B]">
      <div className="mx-auto max-w-6xl">
        <p className="font-semibold text-white">{siteInfo.name}</p>
        <p className="mt-2">{siteInfo.address}</p>
        <p className="mt-1">{siteInfo.phone} · {siteInfo.email}</p>
        <div className="mt-4 flex justify-center gap-4">
          <a href={siteInfo.social.facebook} className="hover:text-white transition-colors">Facebook</a>
          <a href={siteInfo.social.twitter} className="hover:text-white transition-colors">Twitter</a>
        </div>
        <p className="mt-6 text-xs text-[#475569]">
          &copy; {new Date().getFullYear()} {siteInfo.name}. All rights reserved.
        </p>
        <p className="mt-1 text-xs text-[#475569]">
          *Wait times are estimates and may vary. For emergencies, call 911.
        </p>
      </div>
    </footer>
  )
}

/* ------------------------------------------------------------------ */
/*  App                                                                */
/* ------------------------------------------------------------------ */
export default function App() {
  return (
    <div className="font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
        <TreatmentsSection />
        <VisitOptions />
        <HowItWorks />
        <PricingInsurance />
        <Hours />
        <ReviewsSection />
        <CTAForm />
      </main>
      <Footer />
    </div>
  )
}
