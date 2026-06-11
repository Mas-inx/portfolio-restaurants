import { useState, useEffect, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  siteInfo,
  navLinks,
  services,
  appointmentSteps,
  providers,
  insuranceList,
  experienceItems,
  type Service,
  type Provider,
  type AppointmentStep,
  type PatientExperienceItem,
} from './data'

/* ------------------------------------------------------------------ */
/*  Animation variants                                                */
/* ------------------------------------------------------------------ */
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] as const },
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
      <h2 className={`text-3xl font-bold tracking-tight md:text-4xl ${light ? 'text-white' : 'text-[#2D2D2D]'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mx-auto mt-4 max-w-2xl text-lg leading-relaxed ${light ? 'text-white/80' : 'text-[#6B7280]'}`}>
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
          className="text-xl font-bold tracking-tight text-[#2D7D6A]"
        >
          {siteInfo.name}
        </button>

        {/* Desktop links */}
        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="text-sm font-medium text-[#5B6B7A] transition-colors hover:text-[#2D7D6A]"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('#cta')}
            className="rounded-full bg-[#2D7D6A] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#246B5A]"
          >
            Book Appointment
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2D2D2D" strokeWidth="2">
            {menuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
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
                  className="text-left text-sm font-medium text-[#5B6B7A]"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo('#cta')}
                className="mt-2 rounded-full bg-[#2D7D6A] px-5 py-2.5 text-sm font-semibold text-white"
              >
                Book Appointment
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */
function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-[#FAFAF9] via-[#F0F7F4] to-[#E8F4F0] px-6 pt-24">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#2D7D6A]/5" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-[#7EBFAA]/10" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="inline-block rounded-full bg-[#2D7D6A]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#2D7D6A]">
            Same-week appointments available
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-[#2D2D2D] md:text-5xl lg:text-6xl">
            {siteInfo.tagline}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[#6B7280] md:text-xl">
            {siteInfo.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' })}
              className="rounded-full bg-[#2D7D6A] px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-[#246B5A] hover:shadow-lg"
            >
              Book an Appointment
            </button>
            <button
              onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
              className="rounded-full border border-[#D1D5DB] bg-white px-8 py-3.5 text-base font-semibold text-[#2D2D2D] transition-all hover:border-[#2D7D6A] hover:text-[#2D7D6A]"
            >
              Our Services
            </button>
          </div>
          <p className="mt-6 text-sm text-[#9CA3AF]">
            Most new patients get seen within 48 hours. No referral needed.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="hidden justify-center md:flex"
        >
          <div className="relative h-[420px] w-full max-w-md rounded-3xl bg-gradient-to-br from-[#2D7D6A] to-[#1A5C4C] p-1 shadow-2xl">
            <div className="flex h-full w-full flex-col justify-between rounded-2xl bg-white p-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#2D7D6A]">Today's Availability</p>
                <p className="mt-4 text-4xl font-bold text-[#2D2D2D]">
                  3<span className="text-lg font-normal text-[#6B7280]"> openings today</span>
                </p>
                <p className="mt-1 text-sm text-[#6B7280]">Next available: 2:15 PM</p>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Morning', time: '7:00 – 11:30' },
                  { label: 'Afternoon', time: '12:30 – 4:00' },
                  { label: 'Evening', time: '4:00 – 6:00' },
                ].map((slot) => (
                  <div key={slot.label} className="flex items-center justify-between rounded-xl bg-[#F0F7F4] px-4 py-3">
                    <span className="text-sm font-medium text-[#2D2D2D]">{slot.label}</span>
                    <span className="text-sm text-[#6B7280]">{slot.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Services                                                           */
/* ------------------------------------------------------------------ */
function Services() {
  return (
    <SectionWrap id="services" className="bg-white">
      <SectionHeading
        title="Care that covers your whole family"
        subtitle="From annual checkups to chronic condition management, we provide complete primary care for every stage of life."
      />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={stagger}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {services.map((s: Service, i: number) => (
          <motion.div
            key={s.title}
            variants={fadeUp}
            custom={i}
            whileHover={{ y: -4 }}
            className="group rounded-2xl border border-[#E5E7EB] bg-white p-6 transition-all hover:border-[#2D7D6A]/30 hover:shadow-lg"
          >
            <span className="text-3xl">{s.icon}</span>
            <h3 className="mt-4 text-lg font-semibold text-[#2D2D2D]">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{s.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrap>
  )
}

/* ------------------------------------------------------------------ */
/*  Appointment Flow                                                  */
/* ------------------------------------------------------------------ */
function AppointmentFlow() {
  return (
    <SectionWrap id="appointments" className="bg-[#FAFAF9]">
      <SectionHeading
        title="Getting care is this simple"
        subtitle="Four steps from booking to your visit. No hassle, no long waits."
      />
      <div className="relative">
        {/* Desktop connector line */}
        <div className="absolute top-16 left-[calc(16.66%+20px)] right-[calc(16.66%+20px)] hidden h-0.5 bg-[#E5E7EB] md:block" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="grid gap-6 md:grid-cols-4"
        >
          {appointmentSteps.map((step: AppointmentStep, i: number) => (
            <motion.div
              key={step.step}
              variants={fadeUp}
              custom={i}
              className="relative flex flex-col items-center text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2D7D6A] text-lg font-bold text-white shadow-md">
                {i + 1}
              </div>
              <h3 className="mt-5 text-base font-semibold text-[#2D2D2D]">{step.step}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrap>
  )
}

/* ------------------------------------------------------------------ */
/*  Care Team                                                          */
/* ------------------------------------------------------------------ */
function CareTeam() {
  return (
    <SectionWrap id="team" className="bg-white">
      <SectionHeading
        title="Meet your care team"
        subtitle="Experienced providers who take the time to listen and work with you."
      />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={stagger}
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
      >
        {providers.map((p: Provider, i: number) => (
          <motion.div
            key={p.name}
            variants={fadeUp}
            custom={i}
            className="rounded-2xl bg-[#FAFAF9] p-6 text-center transition-all hover:shadow-md"
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#2D7D6A]/10 text-2xl">
              {p.name.charAt(0)}
            </div>
            <h3 className="mt-4 text-base font-semibold text-[#2D2D2D]">{p.name}</h3>
            <p className="text-xs font-medium text-[#2D7D6A]">{p.role}</p>
            <p className="mt-1 text-xs text-[#6B7280]">{p.specialty}</p>
            <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">{p.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrap>
  )
}

/* ------------------------------------------------------------------ */
/*  Insurance                                                          */
/* ------------------------------------------------------------------ */
function Insurance() {
  const [showAll, setShowAll] = useState(false)
  const displayed = showAll ? insuranceList : insuranceList.slice(0, 4)

  return (
    <SectionWrap id="insurance" className="bg-[#FAFAF9]">
      <SectionHeading
        title="Insurance & self-pay made clear"
        subtitle="We work with most major plans and offer transparent self-pay pricing."
      />
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="grid gap-3 sm:grid-cols-2"
        >
          {displayed.map((ins) => (
            <motion.div
              key={ins.name}
              variants={fadeUp}
              className={`flex items-center gap-3 rounded-xl border px-5 py-3.5 ${
                ins.accepted
                  ? 'border-[#D1FAE5] bg-[#ECFDF5]'
                  : 'border-[#E5E7EB] bg-white opacity-50'
              }`}
            >
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                  ins.accepted ? 'bg-[#10B981] text-white' : 'bg-[#D1D5DB] text-white'
                }`}
              >
                {ins.accepted ? '✓' : '—'}
              </span>
              <span className="text-sm font-medium text-[#2D2D2D]">{ins.name}</span>
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowAll((v) => !v)}
            className="text-sm font-medium text-[#2D7D6A] underline underline-offset-2 hover:text-[#246B5A]"
          >
            {showAll ? 'Show fewer' : `View all ${insuranceList.length} plans`}
          </button>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 rounded-2xl border border-[#E5E7EB] bg-white p-6 md:p-8"
        >
          <h3 className="text-base font-semibold text-[#2D2D2D]">Don't have insurance?</h3>
          <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
            We offer transparent self-pay rates starting at $85 for standard visits.
            No hidden fees, no surprise bills. Ask about our sliding-scale discount program during checkout.
          </p>
        </motion.div>
      </div>
    </SectionWrap>
  )
}

/* ------------------------------------------------------------------ */
/*  Patient Experience                                                */
/* ------------------------------------------------------------------ */
function PatientExperience() {
  return (
    <SectionWrap id="experience" className="bg-white">
      <SectionHeading
        title="A better experience from start to finish"
        subtitle="Small touches that make a big difference in your care."
      />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={stagger}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        {experienceItems.map((item: PatientExperienceItem, i: number) => (
          <motion.div
            key={item.title}
            variants={fadeUp}
            custom={i}
            className="rounded-2xl border border-[#E5E7EB] bg-white p-6 transition-all hover:border-[#2D7D6A]/20 hover:shadow-md"
          >
            <span className="text-3xl">{item.icon}</span>
            <h3 className="mt-4 text-base font-semibold text-[#2D2D2D]">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{item.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrap>
  )
}

/* ------------------------------------------------------------------ */
/*  Location & Hours                                                  */
/* ------------------------------------------------------------------ */
function LocationHours() {
  return (
    <SectionWrap id="location" className="bg-[#FAFAF9]">
      <SectionHeading
        title="Visit us"
        subtitle="We're easy to find and open early — including Saturdays."
      />
      <div className="grid gap-10 md:grid-cols-2">
        {/* Map placeholder */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView="visible"
          viewport={{ once: true }}
          className="h-72 rounded-2xl bg-gradient-to-br from-[#E8F4F0] to-[#D0EAE0] md:h-full"
        >
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <span className="text-4xl">📍</span>
              <p className="mt-3 text-sm font-medium text-[#2D2D2D]">{siteInfo.address}</p>
              <p className="mt-1 text-xs text-[#6B7280]">Free parking available behind the building</p>
            </div>
          </div>
        </motion.div>

        {/* Hours */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col justify-center space-y-5"
        >
          {Object.entries(siteInfo.hours).map(([day, hours]) => (
            <div key={day} className="flex items-center justify-between border-b border-[#E5E7EB] pb-3 last:border-0">
              <span className="text-sm font-medium text-[#2D2D2D]">{day}</span>
              <span className="text-sm text-[#6B7280]">{hours}</span>
            </div>
          ))}
          <div className="mt-4">
            <p className="text-sm font-medium text-[#2D7D6A]">✉ {siteInfo.email}</p>
            <p className="mt-1 text-sm font-medium text-[#2D7D6A]">📞 {siteInfo.phone}</p>
          </div>
        </motion.div>
      </div>
    </SectionWrap>
  )
}

/* ------------------------------------------------------------------ */
/*  CTA / Appointment Request Form                                    */
/* ------------------------------------------------------------------ */
function CTAForm() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <SectionWrap id="cta" className="bg-gradient-to-br from-[#2D7D6A] to-[#1A5C4C]">
      <SectionHeading
        title="Ready to be seen?"
        subtitle="Book your appointment online in under 2 minutes."
        light
      />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView="visible"
        viewport={{ once: true }}
        className="mx-auto max-w-xl"
      >
        {submitted ? (
          <div className="rounded-2xl bg-white/10 p-10 text-center backdrop-blur-sm">
            <span className="text-5xl">🎉</span>
            <p className="mt-4 text-xl font-semibold text-white">Request received!</p>
            <p className="mt-2 text-white/80">
              We'll confirm your appointment within 2 hours. Keep an eye on your phone.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl bg-white/10 p-8 backdrop-blur-sm"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <input
                type="text"
                placeholder="First name"
                required
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/50 outline-none focus:border-white/50"
              />
              <input
                type="text"
                placeholder="Last name"
                required
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/50 outline-none focus:border-white/50"
              />
            </div>
            <input
              type="email"
              placeholder="Email address"
              required
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/50 outline-none focus:border-white/50"
            />
            <input
              type="tel"
              placeholder="Phone number"
              required
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/50 outline-none focus:border-white/50"
            />
            <select
              required
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none focus:border-white/50"
            >
              <option value="" disabled selected className="text-gray-400">
                Reason for visit
              </option>
              <option value="checkup" className="text-[#2D2D2D]">Annual checkup / physical</option>
              <option value="sick" className="text-[#2D2D2D]">Sick visit</option>
              <option value="followup" className="text-[#2D2D2D]">Follow-up appointment</option>
              <option value="chronic" className="text-[#2D2D2D]">Chronic condition management</option>
              <option value="other" className="text-[#2D2D2D]">Other</option>
            </select>
            <textarea
              rows={3}
              placeholder="Anything we should know? (optional)"
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/50 outline-none focus:border-white/50"
            />
            <button
              type="submit"
              className="w-full rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#2D7D6A] transition-all hover:bg-white/90"
            >
              Request Appointment
            </button>
            <p className="text-center text-xs text-white/60">
              We respect your privacy. Your information is encrypted and never shared.
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
    <footer className="bg-[#1A1A1A] px-6 py-10 text-center text-sm text-[#9CA3AF]">
      <div className="mx-auto max-w-6xl">
        <p className="font-semibold text-white">{siteInfo.name}</p>
        <p className="mt-2">{siteInfo.address}</p>
        <p className="mt-1">{siteInfo.phone} · {siteInfo.email}</p>
        <div className="mt-4 flex justify-center gap-4">
          <a href={siteInfo.social.facebook} className="hover:text-white transition-colors">Facebook</a>
          <a href={siteInfo.social.instagram} className="hover:text-white transition-colors">Instagram</a>
        </div>
        <p className="mt-6 text-xs text-[#6B7280]">
          &copy; {new Date().getFullYear()} {siteInfo.name}. All rights reserved.
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
        <Services />
        <AppointmentFlow />
        <CareTeam />
        <Insurance />
        <PatientExperience />
        <LocationHours />
        <CTAForm />
      </main>
      <Footer />
    </div>
  )
}
