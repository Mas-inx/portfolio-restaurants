import { useState, useEffect, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  siteInfo,
  industries,
  programs,
  dashboardMetrics,
  qualityItems,
  emergencyServices,
  contractSteps,
  navLinks,
  contactInfo,
  type IndustryItem,
  type ProgramItem,
  type DashboardMetric,
  type QualityItem,
  type ContractStep,
} from './data';

/* ── Utility ── */

const CountUp: FC<{ end: number; suffix?: string; prefix?: string }> = ({ end, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const interval = setInterval(() => {
      start += Math.ceil(end / 35);
      if (start >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 25);
    return () => clearInterval(interval);
  }, [end]);
  return <span>{prefix}{count}{suffix}</span>;
};

/* ── Navigation ── */

const NavBar: FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between h-16 md:h-20">
        <a href="#" className="font-heading text-lg md:text-xl text-green-600 tracking-tight">
          <span className="text-green-500 font-bold">Greenline</span>
          <span className="text-steel-400 font-light"> | </span>
          <span className="text-steel-600">Commercial</span>
        </a>
        <nav className="hidden md:flex items-center gap-5">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-steel-500 hover:text-green-600 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#quote"
            className="bg-green-500 text-white px-5 py-2.5 rounded-md text-sm font-semibold hover:bg-green-600 transition-colors"
          >
            Request a Bid
          </a>
        </nav>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-steel-700 text-2xl"
          aria-label="Menu"
        >
          {mobileOpen ? '\u2715' : '\u2630'}
        </button>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t overflow-hidden"
          >
            <div className="px-5 py-5 flex flex-col gap-3">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="text-sm text-steel-500 py-1">
                  {l.label}
                </a>
              ))}
              <a href="#quote" onClick={() => setMobileOpen(false)} className="bg-green-500 text-white text-center px-5 py-2.5 rounded-md text-sm font-semibold">
                Request a Bid
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

/* ── Hero ── */

const HeroSection: FC = () => (
  <section className="relative min-h-screen flex items-center bg-gradient-to-br from-green-900 via-green-800 to-green-700 overflow-hidden">
    <div className="absolute inset-0 opacity-[0.05]"
      style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }}
    />
    <div className="relative z-10 max-w-7xl mx-auto px-5 w-full">
      <div className="max-w-3xl">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-block bg-white/10 text-green-200 text-xs font-semibold px-4 py-1.5 rounded-full mb-5"
        >
          {siteInfo.location}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-4xl md:text-5xl lg:text-6xl text-white leading-tight"
        >
          {siteInfo.tagline}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-green-200/70 text-base md:text-lg mt-5 max-w-xl leading-relaxed"
        >
          {siteInfo.description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <a
            href="#quote"
            className="bg-white text-green-800 px-7 py-3 rounded-md text-sm font-semibold hover:bg-green-50 transition-colors"
          >
            Request a Bid
          </a>
          <a
            href="#programs"
            className="border border-white/20 text-white px-7 py-3 rounded-md text-sm font-semibold hover:bg-white/10 transition-colors"
          >
            View Programs
          </a>
        </motion.div>
      </div>
    </div>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2"
    >
      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-green-300/50 text-xl"
      >
        \u2193
      </motion.div>
    </motion.div>
  </section>
);

/* ── Industries Served (non-uniform card grid) ── */

const IndustriesSection: FC = () => {
  const sizes = ['md:col-span-2 md:row-span-1', 'md:col-span-1', 'md:col-span-1', 'md:col-span-1', 'md:col-span-1', 'md:col-span-2'];

  return (
    <section id="industries" className="py-20 md:py-28 px-5">
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl text-steel-800">Industries We Serve</h2>
          <p className="text-steel-400 mt-3 max-w-lg mx-auto">
            Specialized programs for commercial property types across the Denver metro area.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-4">
          {industries.map((ind: IndustryItem, i: number) => (
            <motion.div
              key={ind.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.08 }}
              className={`${sizes[i] || ''} bg-white rounded-xl border border-steel-100 p-6 hover:border-green-300 hover:shadow-sm transition-all`}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">{ind.icon}</span>
                <span className="text-xs text-steel-300 bg-steel-50 px-2.5 py-1 rounded-full font-semibold">
                  {ind.properties} properties
                </span>
              </div>
              <h3 className="font-heading text-lg text-steel-800 mb-2">{ind.title}</h3>
              <p className="text-steel-400 text-sm leading-relaxed">{ind.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── Maintenance Programs (horizontal timeline) ── */

const ProgramsSection: FC = () => {
  const [activeProgram, setActiveProgram] = useState<string>(programs[0].id);

  return (
    <section id="programs" className="py-20 md:py-28 px-5 bg-steel-50">
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-14">
          <span className="text-green-500 text-xs uppercase tracking-[0.25em] font-semibold">Service Offerings</span>
          <h2 className="text-3xl md:text-4xl text-steel-800 mt-2">Maintenance Programs</h2>
          <p className="text-steel-400 mt-3 max-w-lg mx-auto">
            Structured maintenance contracts designed for institutional and commercial properties.
          </p>
        </motion.div>
        <div className="flex overflow-x-auto gap-3 pb-4 mb-8 scrollbar-thin">
          {programs.map((p: ProgramItem) => (
            <button
              key={p.id}
              onClick={() => setActiveProgram(p.id)}
              className={`flex-shrink-0 px-5 py-3 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeProgram === p.id
                  ? 'bg-green-500 text-white shadow-sm'
                  : 'bg-white border border-steel-200 text-steel-500 hover:border-green-300'
              }`}
            >
              <span className="mr-2">{p.icon}</span>
              {p.title}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          {programs.filter((p) => p.id === activeProgram).map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl border border-steel-100 p-8 shadow-sm"
            >
              <div className="grid md:grid-cols-5 gap-8 items-center">
                <div className="md:col-span-3">
                  <span className="text-4xl block mb-3">{p.icon}</span>
                  <h3 className="font-heading text-2xl text-steel-800 mb-2">{p.title}</h3>
                  <p className="text-steel-400 leading-relaxed">{p.description}</p>
                </div>
                <div className="md:col-span-2 bg-green-50 rounded-xl p-5 border border-green-100">
                  <p className="text-xs text-green-500 uppercase tracking-wider font-semibold mb-1">Service Frequency</p>
                  <p className="text-lg font-bold text-green-700">{p.frequency}</p>
                  <ul className="mt-3 space-y-1.5 text-sm text-steel-500">
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">\u2713</span> Included in base contract
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">\u2713</span> Photo documentation
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">\u2713</span> Can be scheduled stand-alone
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

/* ── Operations Dashboard ── */

const OperationsSection: FC = () => {
  const crewSchedule = [
    { time: '6:00 AM', task: 'Crew briefing & dispatch', status: 'completed' as const },
    { time: '7:00 AM', task: 'Downtown office corridor mowing', status: 'completed' as const },
    { time: '9:00 AM', task: 'HOA common area detail', status: 'in-progress' as const },
    { time: '11:00 AM', task: 'Retail center irrigation check', status: 'pending' as const },
    { time: '1:00 PM', task: 'School campus turf care', status: 'pending' as const },
    { time: '3:00 PM', task: 'Industrial park weed control', status: 'pending' as const },
  ];

  const statusColors: Record<string, string> = {
    completed: 'bg-green-500',
    'in-progress': 'bg-accent-400 animate-pulse',
    pending: 'bg-steel-200',
  };

  return (
    <section id="operations" className="py-20 md:py-28 px-5">
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-14">
          <span className="text-green-500 text-xs uppercase tracking-[0.25em] font-semibold">Operations</span>
          <h2 className="text-3xl md:text-4xl text-steel-800 mt-2">How We Operate</h2>
          <p className="text-steel-400 mt-3 max-w-lg mx-auto">
            Real-time operations tracking and full transparency into what happens on your property.
          </p>
        </motion.div>

        {/* Dashboard Metrics */}
        <div className="dashboard-grid mb-10">
          {dashboardMetrics.map((m: DashboardMetric, i: number) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-xl border border-steel-100 p-4 text-center hover:border-green-300 transition-colors"
            >
              <p className="text-2xl md:text-3xl font-bold text-green-600">
                <CountUp end={m.value} suffix={m.suffix} prefix={m.prefix || ''} />
              </p>
              <p className="text-xs text-steel-400 mt-1">{m.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-2xl border border-steel-100 p-6 md:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading text-lg text-steel-800">Today&apos;s Crew Schedule</h3>
            <span className="text-xs text-steel-400 bg-steel-50 px-3 py-1 rounded-full">Updated 5 min ago</span>
          </div>
          <div className="space-y-1">
            {crewSchedule.map((item, i) => (
              <motion.div
                key={item.time}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-4 py-3 px-3 rounded-lg hover:bg-steel-50 transition-colors"
              >
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${statusColors[item.status]}`} />
                <span className="text-sm font-mono text-steel-400 w-20 flex-shrink-0">{item.time}</span>
                <span className={`text-sm flex-1 ${item.status === 'completed' ? 'text-steel-400 line-through' : 'text-steel-700'}`}>{item.task}</span>
                <span className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full ${
                  item.status === 'completed' ? 'bg-green-50 text-green-600' : item.status === 'in-progress' ? 'bg-accent-50 text-accent-600' : 'bg-steel-50 text-steel-400'
                }`}>
                  {item.status}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── Quality Control ── */

const QualitySection: FC = () => (
  <section id="quality" className="py-20 md:py-28 px-5 bg-steel-50">
    <div className="max-w-7xl mx-auto">
      <motion.div className="text-center mb-14">
        <span className="text-green-500 text-xs uppercase tracking-[0.25em] font-semibold">Accountability</span>
        <h2 className="text-3xl md:text-4xl text-steel-800 mt-2">Quality Control</h2>
        <p className="text-steel-400 mt-3 max-w-lg mx-auto">
          Every property is inspected, documented, and managed with a single point of accountability.
        </p>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {qualityItems.map((q: QualityItem, i: number) => (
          <motion.div
            key={q.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl p-6 border border-steel-100 hover:border-green-300 hover:shadow-sm transition-all"
          >
            <span className="text-3xl block mb-3">{q.icon}</span>
            <h3 className="font-heading text-lg text-steel-800 mb-2">{q.title}</h3>
            <p className="text-steel-400 text-sm leading-relaxed">{q.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ── Emergency Response ── */

const EmergencySection: FC = () => (
  <section className="py-20 md:py-28 px-5 bg-green-800 text-white">
    <div className="max-w-6xl mx-auto">
      <motion.div className="text-center mb-12">
        <span className="text-green-300 text-xs uppercase tracking-[0.25em] font-semibold">24/7 Support</span>
        <h2 className="text-3xl md:text-4xl mt-2">Emergency Response</h2>
        <p className="text-green-200/70 mt-3 max-w-lg mx-auto">
          When something goes wrong, we respond. Same-day dispatch for urgent property issues.
        </p>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto mb-10">
        {emergencyServices.map((es, i) => (
          <motion.div
            key={es}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="bg-white/10 rounded-xl p-4 border border-white/10 flex items-center gap-3"
          >
            <span className="text-green-300 text-lg flex-shrink-0">\u2713</span>
            <span className="text-sm text-green-100">{es}</span>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-center"
      >
        <p className="text-green-300 text-sm">
          Emergency hotline: <strong className="text-white">{contactInfo.phone}</strong> &mdash; available 24 hours a day, 365 days a year
        </p>
      </motion.div>
    </div>
  </section>
);

/* ── Contracting Process ── */

const ProcessSection: FC = () => (
  <section id="process" className="py-20 md:py-28 px-5">
    <div className="max-w-5xl mx-auto">
      <motion.div className="text-center mb-14">
        <span className="text-green-500 text-xs uppercase tracking-[0.25em] font-semibold">How It Works</span>
        <h2 className="text-3xl md:text-4xl text-steel-800 mt-2">Contracting Process</h2>
        <p className="text-steel-400 mt-3 max-w-lg mx-auto">
          From first walk to ongoing service. A transparent process built for facilities managers.
        </p>
      </motion.div>
      <div className="grid md:grid-cols-4 gap-4">
        {contractSteps.map((cs: ContractStep, i: number) => (
          <motion.div
            key={cs.step}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative"
          >
            {i < contractSteps.length - 1 && (
              <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-green-300 to-steel-100 -z-10" />
            )}
            <div className="bg-white rounded-xl p-5 border border-steel-100 h-full hover:border-green-300 transition-colors">
              <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 font-bold flex items-center justify-center mb-3 text-sm">
                {cs.step}
              </div>
              <h3 className="font-heading text-lg text-steel-800 mb-2">{cs.title}</h3>
              <p className="text-steel-400 text-sm leading-relaxed">{cs.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ── CTA / Commercial Quote Form ── */

const CtaSection: FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [propertyType, setPropertyType] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const propertyTypes = ['HOA', 'Office', 'Retail', 'Industrial', 'School', 'Multifamily', 'Other'];

  return (
    <section id="quote" className="py-20 md:py-28 px-5 bg-steel-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-5 gap-12 items-start">
          <motion.div className="md:col-span-2">
            <span className="text-green-500 text-xs uppercase tracking-[0.25em] font-semibold">Get Started</span>
            <h2 className="text-3xl md:text-4xl text-steel-800 mt-2">Request a Commercial Bid</h2>
            <p className="text-steel-400 mt-3 text-sm leading-relaxed">
              Tell us about your property and we will provide a detailed maintenance proposal within 5 business days.
            </p>
            <div className="mt-6 space-y-3 text-sm text-steel-400">
              <p className="flex items-center gap-2">
                <span className="text-green-500">\u260E</span> {contactInfo.phone}
              </p>
              <p className="flex items-center gap-2">
                <span className="text-green-500">\u2709</span> {contactInfo.email}
              </p>
              <p className="flex items-center gap-2">
                <span className="text-green-500">\u2302</span> {contactInfo.address}
              </p>
            </div>
          </motion.div>
          <div className="md:col-span-3">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl p-8 border border-green-100 shadow-sm"
              >
                <span className="text-4xl block mb-3">\uD83D\uDCCB</span>
                <h3 className="font-heading text-xl text-steel-800 mb-2">Bid Request Received</h3>
                <p className="text-steel-400 text-sm">Our commercial team will review your property details and deliver a customized maintenance proposal within 5 business days.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input required type="text" placeholder="Your name" className="w-full border border-steel-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-green-400" />
                  <input required type="text" placeholder="Company / Property" className="w-full border border-steel-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-green-400" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input required type="email" placeholder="Email address" className="w-full border border-steel-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-green-400" />
                  <input required type="tel" placeholder="Phone number" className="w-full border border-steel-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-green-400" />
                </div>
                <input type="text" placeholder="Property address" className="w-full border border-steel-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-green-400" />
                <div>
                  <label className="block text-xs uppercase tracking-wider text-steel-400 mb-2 font-semibold">Property Type</label>
                  <div className="flex flex-wrap gap-2">
                    {propertyTypes.map((pt) => (
                      <button
                        key={pt}
                        type="button"
                        onClick={() => setPropertyType(pt === propertyType ? '' : pt)}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                          propertyType === pt
                            ? 'bg-green-500 text-white border-green-500'
                            : 'bg-white text-steel-500 border-steel-200 hover:border-green-300'
                        }`}
                      >
                        {pt}
                      </button>
                    ))}
                  </div>
                </div>
                <select className="w-full border border-steel-200 rounded-lg px-4 py-3 text-sm text-steel-500 focus:outline-none focus:border-green-400">
                  <option value="">Approximate property size</option>
                  <option>Under 1 acre</option>
                  <option>1 - 5 acres</option>
                  <option>5 - 20 acres</option>
                  <option>20 - 50 acres</option>
                  <option>Over 50 acres</option>
                </select>
                <textarea rows={3} placeholder="Tell us about your current maintenance needs..." className="w-full border border-steel-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-green-400 resize-none" />
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  className="w-full bg-green-500 text-white py-3 rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors"
                >
                  Submit Bid Request
                </motion.button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── Footer ── */

const Footer: FC = () => (
  <footer className="bg-steel-900 text-steel-300 py-14 px-5">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-4 gap-8 mb-10">
        <div className="md:col-span-2">
          <h4 className="font-heading text-xl text-white mb-3">
            <span className="text-green-400">Greenline</span> Commercial
          </h4>
          <p className="text-steel-400 text-sm leading-relaxed max-w-sm">{siteInfo.description}</p>
        </div>
        <div>
          <h4 className="font-heading text-white mb-3">Programs</h4>
          <ul className="space-y-1.5 text-sm">
            {programs.slice(0, 4).map((p) => (
              <li key={p.id} className="text-steel-400 hover:text-white transition-colors cursor-default">{p.title}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-heading text-white mb-3">Contact</h4>
          <p className="text-sm">{contactInfo.phone}</p>
          <p className="text-sm">{contactInfo.email}</p>
          <p className="text-sm text-steel-400">{contactInfo.address}</p>
        </div>
      </div>
      <div className="border-t border-steel-700 pt-6 text-center text-xs text-steel-500">
        &copy; {new Date().getFullYear()} Greenline Commercial Grounds Maintenance. All rights reserved.
      </div>
    </div>
  </footer>
);

/* ── Main App ── */

const App: FC = () => (
  <div className="font-body text-steel-800 antialiased">
    <NavBar />
    <main>
      <HeroSection />
      <IndustriesSection />
      <ProgramsSection />
      <OperationsSection />
      <QualitySection />
      <EmergencySection />
      <ProcessSection />
      <CtaSection />
    </main>
    <Footer />
  </div>
);

export default App;
