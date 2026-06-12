import { useState, useEffect, useRef, type JSX } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  siteConfig,
  navLinks,
  heroUpdate,
  heroImage,
  caregiverImage,
  homeCareImage,
  services,
  carePlanOptions,
  portalData,
  whoWeHelp,
  safetyFeatures,
  dayInCare,
  assessmentFields,
} from "./data";

// Icons as inline SVGs
function Icon({ name, className = "w-6 h-6" }: { name: string; className?: string }) {
  const icons: Record<string, JSX.Element> = {
    heart: <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />,
    pill: <><rect x="6" y="3" width="12" height="18" rx="6" fill="none" stroke="currentColor" strokeWidth="2" /><line x1="6" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="2" /></>,
    chat: <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
    stethoscope: <><circle cx="12" cy="18" r="3" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M12 15V8M8 3v5a4 4 0 008 0V3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
    recovery: <><path d="M4 12h16M12 4v16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" /></>,
    leaf: <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
    phone: <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
    check: <path d="M20 6L9 17l-5-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />,
    arrow: <path d="M5 12h14M12 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
    clock: <><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M12 6v6l4 2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
    star: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor" />,
    menu: <><line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
    close: <><line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
    droplet: <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
    hospital: <><rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M12 8v8M8 12h8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
    brain: <path d="M12 2a5 5 0 015 5c0 1.5-.5 2.5-1.5 3.5.5.5 1.5 1.5 1.5 3.5a5 5 0 01-5 5M12 2a5 5 0 00-5 5c0 1.5.5 2.5 1.5 3.5-.5.5-1.5 1.5-1.5 3.5a5 5 0 005 5M12 2v20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
    utensils: <><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></>,
    walking: <><circle cx="13" cy="4" r="2" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M7 22l3-7 2.5-2.5-1.5-4.5a2 2 0 013-2l3 3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M10 12l-2 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
    house: <><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><polyline points="9 22 9 12 15 12 15 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></>,
    bandage: <><rect x="2" y="6" width="20" height="12" rx="3" fill="none" stroke="currentColor" strokeWidth="2" /><line x1="12" y1="6" x2="12" y2="18" stroke="currentColor" strokeWidth="2" /><circle cx="8" cy="10" r="0.5" fill="currentColor" /><circle cx="16" cy="10" r="0.5" fill="currentColor" /><circle cx="8" cy="14" r="0.5" fill="currentColor" /><circle cx="16" cy="14" r="0.5" fill="currentColor" /></>,
    clipboard: <><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><rect x="8" y="2" width="8" height="4" rx="1" fill="none" stroke="currentColor" strokeWidth="2" /></>,
    user: <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="7" r="4" fill="none" stroke="currentColor" strokeWidth="2" /></>,
    refresh: <><polyline points="23 4 23 10 17 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><polyline points="1 20 1 14 7 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></>,
    smartphone: <><rect x="5" y="2" width="14" height="20" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2" /><line x1="12" y1="18" x2="12.01" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
    document: <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><polyline points="14 2 14 8 20 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2" /><line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2" /></>,
    smile: <><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M8 14s1.5 2 4 2 4-2 4-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><line x1="9" y1="9" x2="9.01" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><line x1="15" y1="9" x2="15.01" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
  };
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      {icons[name] || icons.heart}
    </svg>
  );
}

// Fade-in on scroll wrapper
function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Navigation
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-cream/95 backdrop-blur-md shadow-sm border-b border-sage-100" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-sage-500 rounded-xl flex items-center justify-center group-hover:bg-sage-600 transition-colors">
            <Icon name="leaf" className="w-5 h-5 text-white" />
          </div>
          <span className="font-serif text-xl font-semibold text-slate-deep tracking-tight">HomeHarbor</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-slate-mid hover:text-sage-600 transition-colors font-medium">
              {link.label}
            </a>
          ))}
        </div>
        <a href="#assessment" className="hidden md:inline-flex items-center gap-2 bg-sage-500 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-sage-600 transition-colors shadow-sm">
          Free Assessment
        </a>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-slate-deep">
          <Icon name={mobileOpen ? "close" : "menu"} className="w-6 h-6" />
        </button>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-cream border-t border-sage-100 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="text-slate-mid py-2 font-medium">
                  {link.label}
                </a>
              ))}
              <a href="#assessment" onClick={() => setMobileOpen(false)} className="bg-sage-500 text-white px-5 py-3 rounded-full text-center font-medium mt-2">
                Free Assessment
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// Section 1: Hero
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Hero background image */}
      <div className="absolute inset-0 z-0">
        <img src={heroImage} alt="Senior care" className="w-full h-full object-cover" style={{ opacity: 0.08 }} />
      </div>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-sage-100 rounded-full opacity-40 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-blue-warm rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 bg-sage-100 text-sage-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-sage-500 rounded-full animate-pulse-soft" />
              Trusted by 2,400+ families
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold text-slate-deep leading-[1.05] tracking-tight mb-6"
          >
            Home care families can actually{" "}
            <span className="text-sage-600 italic">follow.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-mid leading-relaxed mb-8 max-w-lg"
          >
            {siteConfig.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <a href="#assessment" className="inline-flex items-center gap-2 bg-sage-500 text-white px-7 py-3.5 rounded-full text-base font-medium hover:bg-sage-600 transition-all shadow-lg shadow-sage-500/20 hover:shadow-xl hover:shadow-sage-500/30">
              Start Free Assessment
              <Icon name="arrow" className="w-4 h-4" />
            </a>
            <a href="tel:5552472273" className="inline-flex items-center gap-2 border-2 border-sage-200 text-sage-700 px-7 py-3.5 rounded-full text-base font-medium hover:bg-sage-50 transition-colors">
              <Icon name="phone" className="w-4 h-4" />
              {siteConfig.phone}
            </a>
          </motion.div>
        </div>

        {/* Care Update Card */}
        <motion.div
          initial={{ opacity: 0, x: 40, rotate: 2 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          <div className="bg-white rounded-3xl shadow-xl shadow-sage-500/10 border border-sage-100 p-6 md:p-8 max-w-md mx-auto">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 bg-sage-100 rounded-full flex items-center justify-center text-sage-700 font-semibold text-sm">
                MS
              </div>
              <div>
                <p className="font-semibold text-slate-deep text-sm">{heroUpdate.caregiver}</p>
                <p className="text-xs text-slate-mid">{heroUpdate.time} · Morning Visit</p>
              </div>
              <span className="ml-auto bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                ✓ Complete
              </span>
            </div>
            <p className="text-slate-mid text-sm leading-relaxed mb-5">{heroUpdate.note}</p>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-sage-50 rounded-xl p-3 text-center">
                <p className="text-xs text-slate-mid mb-0.5">Mood</p>
                <p className="font-semibold text-sage-700 text-sm flex items-center justify-center gap-1"><Icon name="smile" className="w-4 h-4" /> {heroUpdate.mood}</p>
              </div>
              <div className="bg-sage-50 rounded-xl p-3 text-center">
                <p className="text-xs text-slate-mid mb-0.5">BP</p>
                <p className="font-semibold text-slate-deep text-sm">{heroUpdate.vitals.bp}</p>
              </div>
              <div className="bg-sage-50 rounded-xl p-3 text-center">
                <p className="text-xs text-slate-mid mb-0.5">Heart</p>
                <p className="font-semibold text-slate-deep text-sm">{heroUpdate.vitals.hr}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-sage-600 bg-sage-50 rounded-xl p-3">
              <span className="w-2 h-2 bg-sage-500 rounded-full animate-pulse-soft" />
              Family notified · Real-time update
            </div>
          </div>
          {/* Floating badge */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg border border-sage-100 px-4 py-2.5 flex items-center gap-2"
          >
            <Icon name="shield" className="w-5 h-5 text-sage-500" />
            <span className="text-xs font-semibold text-slate-deep">HIPAA Secure</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Section 2: Services
function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <span className="text-sage-600 font-medium text-sm uppercase tracking-wider">Our Services</span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-slate-deep mt-3 mb-4">
            Complete care, delivered at home
          </h2>
          <p className="text-slate-mid text-lg max-w-2xl mx-auto">
            From daily living support to skilled nursing, every service includes family updates and care coordination.
          </p>
        </FadeIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <FadeIn key={service.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-cream rounded-2xl p-7 border border-sage-100 hover:border-sage-200 hover:shadow-lg hover:shadow-sage-500/5 transition-all h-full"
              >
                <div className="w-12 h-12 bg-sage-100 rounded-xl flex items-center justify-center text-sage-600 mb-5">
                  <Icon name={service.icon} className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-slate-deep mb-2">{service.title}</h3>
                <p className="text-slate-mid text-sm leading-relaxed mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-mid">
                      <Icon name="check" className="w-4 h-4 text-sage-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </FadeIn>
          ))}
        </div>
        {/* Caregiver image */}
        <div className="mt-12 rounded-2xl overflow-hidden border border-sage-100">
          <img src={caregiverImage} alt="Professional caregiver with client" className="w-full h-64 object-cover" />
        </div>
      </div>
    </section>
  );
}

// Section 3: Care Plan Builder
function CarePlanBuilder() {
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>(["personal", "medication"]);
  const [selectedFrequency, setSelectedFrequency] = useState("4hr");
  const [selectedMatch, setSelectedMatch] = useState(0);

  const toggleNeed = (id: string) => {
    setSelectedNeeds((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
    );
  };

  const selectedFreq = carePlanOptions.frequencies.find((f) => f.id === selectedFrequency);
  const selectedMatchData = carePlanOptions.matches[selectedMatch];

  return (
    <section id="care-plan" className="py-24 bg-sage-50/50">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <span className="text-sage-600 font-medium text-sm uppercase tracking-wider">Care Plan Builder</span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-slate-deep mt-3 mb-4">
            Build a plan that fits
          </h2>
          <p className="text-slate-mid text-lg max-w-2xl mx-auto">
            Select the care your loved one needs, choose a schedule, and see your matched caregiver — all in real time.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Options */}
          <div className="lg:col-span-2 space-y-8">
            {/* Needs Selection */}
            <FadeIn>
              <div className="bg-white rounded-2xl p-6 border border-sage-100">
                <h3 className="font-semibold text-slate-deep mb-4 flex items-center gap-2">
                  <span className="w-7 h-7 bg-sage-500 text-white rounded-lg flex items-center justify-center text-xs font-bold">1</span>
                  What kind of care is needed?
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {carePlanOptions.needs.map((need) => (
                    <motion.button
                      key={need.id}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => toggleNeed(need.id)}
                      className={`p-3 rounded-xl border-2 text-left transition-all ${
                        selectedNeeds.includes(need.id)
                          ? "border-sage-500 bg-sage-50 shadow-sm"
                          : "border-sage-100 hover:border-sage-200"
                      }`}
                    >
                      <span className="text-xl mb-1 block"><Icon name={need.icon} className="w-6 h-6" /></span>
                      <span className="text-xs font-medium text-slate-deep">{need.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Frequency */}
            <FadeIn delay={0.1}>
              <div className="bg-white rounded-2xl p-6 border border-sage-100">
                <h3 className="font-semibold text-slate-deep mb-4 flex items-center gap-2">
                  <span className="w-7 h-7 bg-sage-500 text-white rounded-lg flex items-center justify-center text-xs font-bold">2</span>
                  How often?
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {carePlanOptions.frequencies.map((freq) => (
                    <motion.button
                      key={freq.id}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setSelectedFrequency(freq.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        selectedFrequency === freq.id
                          ? "border-sage-500 bg-sage-50 shadow-sm"
                          : "border-sage-100 hover:border-sage-200"
                      }`}
                    >
                      <span className="text-sm font-medium text-slate-deep block">{freq.label}</span>
                      <span className="text-xs text-sage-600 font-semibold">{freq.price}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Caregiver Match */}
            <FadeIn delay={0.2}>
              <div className="bg-white rounded-2xl p-6 border border-sage-100">
                <h3 className="font-semibold text-slate-deep mb-4 flex items-center gap-2">
                  <span className="w-7 h-7 bg-sage-500 text-white rounded-lg flex items-center justify-center text-xs font-bold">3</span>
                  Your matched caregivers
                </h3>
                <div className="space-y-3">
                  {carePlanOptions.matches.map((match, i) => (
                    <motion.button
                      key={match.name}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedMatch(i)}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-4 ${
                        selectedMatch === i
                          ? "border-sage-500 bg-sage-50 shadow-sm"
                          : "border-sage-100 hover:border-sage-200"
                      }`}
                    >
                      <div className="w-12 h-12 bg-sage-200 rounded-full flex items-center justify-center text-sage-700 font-semibold text-sm flex-shrink-0">
                        {match.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-deep text-sm">{match.name}</p>
                        <p className="text-xs text-slate-mid">{match.specialty}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="flex items-center gap-1 text-amber-500">
                          <Icon name="star" className="w-3.5 h-3.5" />
                          <span className="text-xs font-semibold">{match.rating}</span>
                        </div>
                        <p className="text-xs text-slate-mid">{match.experience}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right: Live Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <FadeIn delay={0.3}>
                <div className="bg-white rounded-2xl p-6 border border-sage-200 shadow-lg shadow-sage-500/5">
                  <h3 className="font-serif text-xl font-semibold text-slate-deep mb-5">Your Care Plan</h3>
                  
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${selectedNeeds.join(",")}-${selectedFrequency}-${selectedMatch}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div>
                        <p className="text-xs text-slate-mid uppercase tracking-wider mb-2">Selected Services</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedNeeds.length > 0 ? selectedNeeds.map((n) => {
                            const need = carePlanOptions.needs.find((x) => x.id === n);
                            return (
                              <span key={n} className="bg-sage-100 text-sage-700 px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1">
                                <Icon name={need?.icon || 'heart'} className="w-3.5 h-3.5" /> {need?.label}
                              </span>
                            );
                          }) : <span className="text-xs text-slate-mid italic">No services selected</span>}
                        </div>
                      </div>

                      <div className="border-t border-sage-100 pt-4">
                        <p className="text-xs text-slate-mid uppercase tracking-wider mb-2">Schedule</p>
                        <p className="font-semibold text-slate-deep">{selectedFreq?.label}</p>
                        <p className="text-sage-600 font-semibold">{selectedFreq?.price}</p>
                      </div>

                      <div className="border-t border-sage-100 pt-4">
                        <p className="text-xs text-slate-mid uppercase tracking-wider mb-2">Matched Caregiver</p>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-sage-200 rounded-full flex items-center justify-center text-sage-700 font-semibold text-xs">
                            {selectedMatchData.avatar}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-deep text-sm">{selectedMatchData.name}</p>
                            <p className="text-xs text-slate-mid">{selectedMatchData.experience} experience</p>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-sage-100 pt-4">
                        <p className="text-xs text-slate-mid uppercase tracking-wider mb-2">Includes</p>
                        <ul className="space-y-1.5">
                          {["Family portal access", "Care coordinator", "Backup coverage", "Real-time updates"].map((item) => (
                            <li key={item} className="flex items-center gap-2 text-xs text-slate-mid">
                              <Icon name="check" className="w-3.5 h-3.5 text-sage-500" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <a href="#assessment" className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-sage-500 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-sage-600 transition-colors">
                    Request This Plan
                    <Icon name="arrow" className="w-4 h-4" />
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Section 4: Family Portal
function FamilyPortal() {
  return (
    <section id="portal" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <span className="text-sage-600 font-medium text-sm uppercase tracking-wider">Family Portal</span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-slate-deep mt-3 mb-4">
            Stay connected to every moment
          </h2>
          <p className="text-slate-mid text-lg max-w-2xl mx-auto">
            Real-time visit notes, task tracking, direct messaging, and upcoming schedules — all in one place.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Visit Notes */}
          <FadeIn>
            <motion.div
              whileHover={{ y: -2 }}
              className="bg-cream rounded-2xl p-6 border border-sage-100 h-full"
            >
              <div className="flex items-center gap-2 mb-5">
                <Icon name="clock" className="w-5 h-5 text-sage-500" />
                <h3 className="font-semibold text-slate-deep">Today's Visit Notes</h3>
              </div>
              <div className="space-y-3">
                {portalData.visitNotes.map((note, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`p-4 rounded-xl ${note.status === "complete" ? "bg-sage-50 border border-sage-100" : "bg-white border border-sage-100"}`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold text-slate-deep">{note.time} · {note.type}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        note.status === "complete" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                      }`}>
                        {note.status === "complete" ? "✓ Done" : "Upcoming"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-mid">{note.caregiver}</p>
                    <p className="text-sm text-slate-mid mt-1">{note.note}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </FadeIn>

          {/* Tasks */}
          <FadeIn delay={0.1}>
            <motion.div
              whileHover={{ y: -2 }}
              className="bg-cream rounded-2xl p-6 border border-sage-100 h-full"
            >
              <div className="flex items-center gap-2 mb-5">
                <Icon name="check" className="w-5 h-5 text-sage-500" />
                <h3 className="font-semibold text-slate-deep">Today's Tasks</h3>
              </div>
              <div className="space-y-3">
                {portalData.tasks.map((task, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-white rounded-xl border border-sage-100"
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      task.done ? "bg-sage-500 border-sage-500" : "border-sage-300"
                    }`}>
                      {task.done && <Icon name="check" className="w-3 h-3 text-white" />}
                    </div>
                    <span className={`text-sm ${task.done ? "text-slate-mid line-through" : "text-slate-deep"}`}>
                      {task.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </FadeIn>

          {/* Messages */}
          <FadeIn delay={0.2}>
            <motion.div
              whileHover={{ y: -2 }}
              className="bg-cream rounded-2xl p-6 border border-sage-100 h-full"
            >
              <div className="flex items-center gap-2 mb-5">
                <Icon name="chat" className="w-5 h-5 text-sage-500" />
                <h3 className="font-semibold text-slate-deep">Caregiver Messages</h3>
              </div>
              <div className="space-y-3">
                {portalData.messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className={`p-4 rounded-xl max-w-[85%] ${
                      msg.from === "You"
                        ? "bg-sage-500 text-white ml-auto"
                        : "bg-white border border-sage-100"
                    }`}
                  >
                    <p className={`text-xs font-semibold mb-1 ${msg.from === "You" ? "text-sage-100" : "text-slate-deep"}`}>
                      {msg.from} · {msg.time}
                    </p>
                    <p className={`text-sm ${msg.from === "You" ? "text-white" : "text-slate-mid"}`}>{msg.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </FadeIn>

          {/* Upcoming Visits */}
          <FadeIn delay={0.3}>
            <motion.div
              whileHover={{ y: -2 }}
              className="bg-cream rounded-2xl p-6 border border-sage-100 h-full"
            >
              <div className="flex items-center gap-2 mb-5">
                <Icon name="clock" className="w-5 h-5 text-sage-500" />
                <h3 className="font-semibold text-slate-deep">Upcoming Visits</h3>
              </div>
              <div className="space-y-3">
                {portalData.upcomingVisits.map((visit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 p-3 bg-white rounded-xl border border-sage-100"
                  >
                    <div className="w-10 h-10 bg-blue-warm/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="clock" className="w-5 h-5 text-blue-soft" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-deep">{visit.day} · {visit.time}</p>
                      <p className="text-xs text-slate-mid">{visit.caregiver} · {visit.type}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// Section 5: Who We Help
function WhoWeHelp() {
  return (
    <section className="py-24 bg-sage-50/50">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <span className="text-sage-600 font-medium text-sm uppercase tracking-wider">Who We Help</span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-slate-deep mt-3 mb-4">
            Care for every stage of life
          </h2>
          <p className="text-slate-mid text-lg max-w-2xl mx-auto">
            Whether it's daily support or specialized medical care, we adapt to your family's unique needs.
          </p>
        </FadeIn>
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
          {whoWeHelp.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-white rounded-2xl p-6 border border-sage-100 text-center hover:shadow-lg hover:shadow-sage-500/5 transition-all h-full"
              >
                <span className="text-3xl mb-3 block"><Icon name={item.icon} className="w-8 h-8 mx-auto" /></span>
                <h3 className="font-serif text-lg font-semibold text-slate-deep mb-2">{item.title}</h3>
                <p className="text-sm text-slate-mid leading-relaxed">{item.description}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
        {/* Home care image */}
        <div className="mt-12 rounded-2xl overflow-hidden border border-sage-100 max-w-3xl mx-auto">
          <img src={homeCareImage} alt="Home care companion" className="w-full h-56 object-cover" />
        </div>
      </div>
    </section>
  );
}

// Section 6: Safety + Matching
function Safety() {
  return (
    <section id="safety" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <span className="text-sage-600 font-medium text-sm uppercase tracking-wider">Safety & Trust</span>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-slate-deep mt-3 mb-4">
              Every caregiver vetted, trained, and backed by a team
            </h2>
            <p className="text-slate-mid text-lg mb-8">
              Your family's trust is everything. That's why we go beyond basic checks to ensure every visit is safe, professional, and compassionate.
            </p>
            <div className="flex items-center gap-4 p-4 bg-sage-50 rounded-2xl border border-sage-100">
              <div className="w-12 h-12 bg-sage-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon name="shield" className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-slate-deep text-sm">Zero incidents in 2024</p>
                <p className="text-xs text-slate-mid">Across 48,000+ care visits last year</p>
              </div>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-4">
            {safetyFeatures.map((feature, i) => (
              <FadeIn key={feature.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-cream rounded-xl p-5 border border-sage-100 hover:border-sage-200 transition-all"
                >
                  <span className="text-2xl mb-2 block"><Icon name={feature.icon} className="w-7 h-7" /></span>
                  <h3 className="font-semibold text-slate-deep text-sm mb-1">{feature.title}</h3>
                  <p className="text-xs text-slate-mid leading-relaxed">{feature.description}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Section 7: Day in Care (Sticky Storytelling)
function DayInCare() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const activeIndex = useTransform(scrollYProgress, [0, 1], [0, dayInCare.length - 1]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = activeIndex.on("change", (latest) => {
      setCurrentIndex(Math.round(latest));
    });
    return unsubscribe;
  }, [activeIndex]);

  const colorMap: Record<string, string> = {
    sage: "bg-sage-100 border-sage-200",
    blue: "bg-blue-warm/20 border-blue-soft/30",
    peach: "bg-peach/40 border-peach",
    lavender: "bg-lavender/30 border-lavender",
  };

  const dotColorMap: Record<string, string> = {
    sage: "bg-sage-500",
    blue: "bg-blue-soft",
    peach: "bg-amber-400",
    lavender: "bg-purple-400",
  };

  return (
    <section id="day-in-care" className="bg-cream-warm" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <FadeIn className="text-center mb-8">
          <span className="text-sage-600 font-medium text-sm uppercase tracking-wider">A Day in Care</span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-slate-deep mt-3 mb-4">
            Follow Margaret's day
          </h2>
          <p className="text-slate-mid text-lg max-w-2xl mx-auto">
            Scroll through a real day of care — from morning greeting to evening handoff. Every moment documented, every family member informed.
          </p>
        </FadeIn>
      </div>

      <div className="relative" style={{ height: `${dayInCare.length * 80}vh` }}>
        {/* Sticky visual panel */}
        <div className="sticky top-0 h-screen flex items-center justify-center px-6 overflow-hidden">
          <div className="max-w-4xl w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
                className={`rounded-3xl p-8 md:p-12 border ${colorMap[dayInCare[currentIndex]?.color || "sage"]} shadow-lg`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-3 h-3 rounded-full ${dotColorMap[dayInCare[currentIndex]?.color || "sage"]}`} />
                  <span className="font-mono text-sm font-semibold text-slate-mid">{dayInCare[currentIndex]?.time}</span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl font-semibold text-slate-deep mb-4">
                  {dayInCare[currentIndex]?.title}
                </h3>
                <p className="text-lg text-slate-mid leading-relaxed mb-6 max-w-2xl">
                  {dayInCare[currentIndex]?.description}
                </p>
                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-sage-100">
                  <span className="w-2 h-2 bg-sage-500 rounded-full animate-pulse-soft" />
                  <span className="text-sm text-sage-700 font-medium">{dayInCare[currentIndex]?.detail}</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Progress indicator */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {dayInCare.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    width: i === currentIndex ? 32 : 8,
                    backgroundColor: i === currentIndex ? "#5c8a5c" : "#c8d9c8",
                  }}
                  className="h-2 rounded-full transition-all"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Scroll triggers */}
        {dayInCare.map((_, i) => (
          <div key={i} style={{ height: "80vh" }} className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-sage-200 -translate-x-1/2 hidden lg:block" />
          </div>
        ))}
      </div>
    </section>
  );
}

// Section 8: Assessment CTA
function AssessmentCTA() {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="assessment" className="py-24 bg-sage-50/50">
      <div className="max-w-3xl mx-auto px-6">
        <FadeIn className="text-center mb-12">
          <span className="text-sage-600 font-medium text-sm uppercase tracking-wider">Get Started</span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-slate-deep mt-3 mb-4">
            Free care assessment
          </h2>
          <p className="text-slate-mid text-lg">
            Tell us about your loved one's needs. We'll match you with a care plan and caregiver within 24 hours.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl p-8 md:p-10 border border-sage-100 shadow-lg shadow-sage-500/5"
              >
                <div className="grid md:grid-cols-2 gap-5">
                  {assessmentFields.map((field) => (
                    <div key={field.name} className={field.name === "situation" || field.name === "urgency" ? "" : ""}>
                      <label className="block text-sm font-medium text-slate-deep mb-2">{field.label}</label>
                      {field.type === "select" ? (
                        <select
                          required
                          value={formData[field.name] || ""}
                          onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-sage-200 bg-cream text-slate-deep text-sm focus:outline-none focus:ring-2 focus:ring-sage-500/30 focus:border-sage-400 transition-all"
                        >
                          <option value="">Select...</option>
                          {field.options?.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          required
                          placeholder={field.placeholder}
                          value={formData[field.name] || ""}
                          onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-sage-200 bg-cream text-slate-deep text-sm placeholder:text-slate-mid/50 focus:outline-none focus:ring-2 focus:ring-sage-500/30 focus:border-sage-400 transition-all"
                        />
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="submit"
                  className="mt-8 w-full bg-sage-500 text-white py-4 rounded-full font-medium text-base hover:bg-sage-600 transition-colors shadow-lg shadow-sage-500/20"
                >
                  Request Free Assessment
                </button>
                <p className="text-xs text-slate-mid text-center mt-4">
                  No commitment required. A care coordinator will call within 24 hours.
                </p>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl p-10 border border-sage-200 shadow-lg text-center"
              >
                <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-5">
                  <Icon name="check" className="w-8 h-8 text-sage-600" />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-slate-deep mb-3">Thank you!</h3>
                <p className="text-slate-mid">
                  A care coordinator will reach out within 24 hours to discuss your loved one's needs and match you with the right care plan.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </FadeIn>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-slate-deep text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-sage-500 rounded-xl flex items-center justify-center">
                <Icon name="leaf" className="w-5 h-5 text-white" />
              </div>
              <span className="font-serif text-xl font-semibold">HomeHarbor Care</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed max-w-sm mb-4">
              Professional home care with family updates, visit notes, and care plans that keep everyone connected. Serving families with compassion since 2018.
            </p>
            <p className="text-sage-300 text-sm font-medium">{siteConfig.phone}</p>
            <p className="text-slate-400 text-sm">{siteConfig.email}</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4">Services</h4>
            <ul className="space-y-2">
              {services.slice(0, 5).map((s) => (
                <li key={s.title}><a href="#services" className="text-slate-400 text-sm hover:text-sage-300 transition-colors">{s.title}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2">
              {["About Us", "Careers", "Caregiver Application", "Privacy Policy", "Terms of Service"].map((item) => (
                <li key={item}><a href="#" className="text-slate-400 text-sm hover:text-sage-300 transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">© 2024 HomeHarbor Care. All rights reserved.</p>
          <p className="text-slate-500 text-xs">Licensed · Bonded · Insured · HIPAA Compliant</p>
        </div>
      </div>
    </footer>
  );
}

// Sticky Phone CTA
function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 right-6 z-40 md:hidden"
        >
          <a
            href="tel:5552472273"
            className="flex items-center gap-2 bg-sage-500 text-white px-5 py-3 rounded-full shadow-lg shadow-sage-500/30 font-medium text-sm"
          >
            <Icon name="phone" className="w-4 h-4" />
            Call Now
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Main App
export default function App() {
  return (
    <div className="min-h-screen bg-cream">
      <Nav />
      <Hero />
      <Services />
      <CarePlanBuilder />
      <FamilyPortal />
      <WhoWeHelp />
      <Safety />
      <DayInCare />
      <AssessmentCTA />
      <Footer />
      <StickyCTA />
    </div>
  );
}
