import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  type Service,
  type FeaturedProperty,
  type MarketInsight,
  type ProcessStep,
  type Sector,
  type Advisor,
  siteInfo,
  services,
  featuredProperties,
  marketInsights,
  processSteps,
  sectors,
  team,
} from './data';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6 },
};

const stagger = {
  initial: { opacity: 0 },
  whileInView: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
  viewport: { once: true, margin: '-50px' },
};

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
};

/* --- SVG Icon Components --- */
function IconShield({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
function IconChartUp({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}
function IconMap({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function IconClipboard({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    </svg>
  );
}
function IconMoney({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="M12 6v12" /><path d="M15 9h-4a2 2 0 000 4h2a2 2 0 010 4H9" />
    </svg>
  );
}
function IconBuilding({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" /><line x1="9" y1="6" x2="9" y2="6.01" /><line x1="15" y1="6" x2="15" y2="6.01" /><line x1="9" y1="10" x2="9" y2="10.01" /><line x1="15" y1="10" x2="15" y2="10.01" />
    </svg>
  );
}

function IconRenderer({ name }: { name: string }) {
  const iconClass = 'inline-block w-8 h-8 text-accent-blue';
  switch (name) {
    case 'shield': return <IconShield className={iconClass} />;
    case 'chart-up': return <IconChartUp className={iconClass} />;
    case 'map': return <IconMap className={iconClass} />;
    case 'clipboard': return <IconClipboard className={iconClass} />;
    case 'money': return <IconMoney className={iconClass} />;
    case 'building': return <IconBuilding className={iconClass} />;
    default: return <IconShield className={iconClass} />;
  }
}


  'Services',
  'Properties',
  'Insights',
  'Process',
  'Sectors',
  'Team',
  'Contact',
];

function Navbar({
  scrolled,
  mobileOpen,
  onToggle,
}: {
  scrolled: boolean;
  mobileOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-deep-blue rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="text-white font-bold text-lg">K</span>
            </div>
            <div>
              <span className="font-bold text-lg text-deep-blue">Keystone</span>
              <span className="text-sm text-graphite-light block leading-tight">
                Property Group
              </span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`text-sm font-medium transition-colors ${
                  scrolled
                    ? 'text-graphite hover:text-deep-blue'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {item}
              </a>
            ))}
          </div>

          <button
            onClick={onToggle}
            className={`lg:hidden p-2 transition-colors ${
              scrolled ? 'text-deep-blue' : 'text-white'
            }`}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block text-graphite hover:text-deep-blue hover:bg-cream px-3 py-2 rounded-lg transition-colors"
                onClick={onToggle}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-deep-blue via-deep-blue-light to-deep-blue overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-blue rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-blue-light rounded-full blur-3xl" />
      </div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <motion.div {...fadeInUp}>
          <span className="text-accent-blue-light font-semibold text-sm tracking-[0.2em] uppercase">
            Commercial Real Estate Advisory
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mt-4 leading-tight max-w-4xl">
            {siteInfo.tagline}
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl mt-6 max-w-2xl leading-relaxed">
            {siteInfo.description}
          </p>
          <div className="flex flex-wrap gap-4 mt-10">
            <a
              href="#contact"
              className="bg-accent-blue hover:bg-accent-blue-light text-white px-8 py-3.5 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Get Started
            </a>
            <a
              href="#properties"
              className="border border-white/30 hover:border-white/50 text-white px-8 py-3.5 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-0.5"
            >
              View Properties
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ServicesSection({ items }: { items: Service[] }) {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <span className="text-accent-blue font-semibold text-sm tracking-[0.2em] uppercase">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-deep-blue mt-3">
            Full-Service Commercial Advisory
          </h2>
          <p className="text-graphite-light mt-4 max-w-2xl mx-auto leading-relaxed">
            Every service underpinned by proprietary market data and decades of transactional
            experience across asset classes.
          </p>
        </motion.div>
        <motion.div {...stagger} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((s) => (
            <motion.div
              key={s.title}
              variants={cardVariants}
              className="bg-cream p-8 rounded-xl hover:shadow-lg transition-all duration-300 group"
            >
              <IconRenderer name={s.icon} />
              <h3 className="text-lg font-bold text-deep-blue mt-4 group-hover:text-accent-blue transition-colors">
                {s.title}
              </h3>
              <p className="text-graphite-light mt-3 leading-relaxed">{s.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function PropertiesSection({ items }: { items: FeaturedProperty[] }) {
  return (
    <section id="properties" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <span className="text-accent-blue font-semibold text-sm tracking-[0.2em] uppercase">
            Featured Listings
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-deep-blue mt-3">
            Active Opportunities
          </h2>
          <p className="text-graphite-light mt-4 max-w-2xl mx-auto leading-relaxed">
            Institutional-grade properties across asset classes, each with detailed market
            intelligence.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold text-accent-blue uppercase tracking-wider">
                  {p.type}
                </span>
                <h3 className="text-xl font-bold text-deep-blue mt-1">{p.title}</h3>
                <p className="text-sm text-graphite-light mt-1">{p.address}</p>
                <div className="grid grid-cols-3 gap-4 mt-4 py-4 border-y border-gray-100">
                  <div>
                    <span className="text-xs text-graphite-light uppercase">Size</span>
                    <p className="font-bold text-deep-blue mt-0.5">{p.size}</p>
                  </div>
                  <div>
                    <span className="text-xs text-graphite-light uppercase">Cap Rate</span>
                    <p className="font-bold text-deep-blue mt-0.5">{p.capRate}</p>
                  </div>
                  <div>
                    <span className="text-xs text-graphite-light uppercase">Zoning</span>
                    <p className="font-bold text-deep-blue mt-0.5">{p.zoning}</p>
                  </div>
                </div>
                <ul className="mt-4 space-y-2">
                  {p.highlights.map((h, j) => (
                    <li key={j} className="text-sm text-graphite flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-accent-blue rounded-full mt-1.5 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InsightsSection({ items }: { items: MarketInsight[] }) {
  return (
    <section id="insights" className="py-24 bg-deep-blue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <span className="text-accent-blue-light font-semibold text-sm tracking-[0.2em] uppercase">
            Market Intelligence
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3">Data That Drives Decisions</h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto leading-relaxed">
            Real-time market metrics aggregated from proprietary sources, public records, and
            industry partnerships.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((m, i) => (
            <motion.div
              key={m.metric}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/15 transition-colors"
            >
              <p className="text-sm text-gray-400 uppercase tracking-wider">{m.metric}</p>
              <p className="text-3xl font-bold mt-2">{m.value}</p>
              <span
                className={`inline-block mt-2 text-sm font-semibold ${
                  m.positive ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {m.change} {m.positive ? '\u2191' : '\u2193'}
              </span>
              <p className="text-sm text-gray-400 mt-3 leading-relaxed">{m.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection({ steps }: { steps: ProcessStep[] }) {
  return (
    <section id="process" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <span className="text-accent-blue font-semibold text-sm tracking-[0.2em] uppercase">
            Our Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-deep-blue mt-3">How We Work</h2>
          <p className="text-graphite-light mt-4 max-w-2xl mx-auto leading-relaxed">
            A transparent, data-driven methodology that delivers results.
          </p>
        </motion.div>
        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-px" />
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`flex items-center gap-8 mb-16 last:mb-0 ${
                i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}
            >
              <div className={`flex-1 ${i % 2 === 0 ? 'lg:text-right' : ''}`}>
                <div className="bg-cream p-6 rounded-xl inline-block max-w-md">
                  <span className="text-accent-blue font-bold text-sm">Step {step.step}</span>
                  <h3 className="text-xl font-bold text-deep-blue mt-1">{step.title}</h3>
                  <p className="text-graphite-light mt-2 leading-relaxed">{step.description}</p>
                </div>
              </div>
              <div className="hidden lg:flex w-12 h-12 bg-accent-blue text-white rounded-full items-center justify-center font-bold shrink-0 relative z-10 shadow-md">
                {step.step}
              </div>
              <div className="flex-1 hidden lg:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectorsSection({ items }: { items: Sector[] }) {
  return (
    <section id="sectors" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <span className="text-accent-blue font-semibold text-sm tracking-[0.2em] uppercase">
            Asset Classes
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-deep-blue mt-3">Sectors We Cover</h2>
          <p className="text-graphite-light mt-4 max-w-2xl mx-auto leading-relaxed">
            Deep expertise across every major commercial real estate sector.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-deep-blue">{s.name}</h3>
              <p className="text-graphite-light mt-3 leading-relaxed">{s.description}</p>
              <ul className="mt-4 space-y-2">
                {s.examples.map((ex, j) => (
                  <li key={j} className="text-sm text-graphite flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-accent-blue rounded-full shrink-0" />
                    {ex}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamSection({ members }: { members: Advisor[] }) {
  return (
    <section id="team" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <span className="text-accent-blue font-semibold text-sm tracking-[0.2em] uppercase">
            Advisory Team
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-deep-blue mt-3">Leadership</h2>
          <p className="text-graphite-light mt-4 max-w-2xl mx-auto leading-relaxed">
            Seasoned professionals with deep market relationships and institutional expertise.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center group"
            >
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden shadow-md ring-4 ring-transparent group-hover:ring-accent-blue/20 transition-all duration-300">
                <img
                  src={m.image}
                  alt={m.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="text-lg font-bold text-deep-blue mt-4">{m.name}</h3>
              <p className="text-accent-blue text-sm font-medium">{m.role}</p>
              <p className="text-graphite-light text-sm mt-2">{m.experience}</p>
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {m.specialties.map((sp, j) => (
                  <span
                    key={j}
                    className="text-xs bg-cream text-graphite px-2 py-1 rounded-full"
                  >
                    {sp}
                  </span>
                ))}
              </div>
              <p className="text-sm text-graphite mt-3">{m.phone}</p>
              <p className="text-sm text-accent-blue">{m.email}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    propertyType: '',
    requirements: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission handled in production
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-deep-blue via-deep-blue-light to-deep-blue text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">Submit Your Requirements</h2>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto leading-relaxed">
            Tell us about your commercial real estate needs and a senior advisor will respond within
            24 hours.
          </p>
        </motion.div>
        <motion.form
          {...fadeInUp}
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 space-y-6"
        >
          <div className="grid sm:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-accent-blue-light focus:ring-1 focus:ring-accent-blue-light transition-all"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-accent-blue-light focus:ring-1 focus:ring-accent-blue-light transition-all"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Company Name"
              value={formData.company}
              onChange={(e) => updateField('company', e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-accent-blue-light focus:ring-1 focus:ring-accent-blue-light transition-all"
            />
            <select
              value={formData.propertyType}
              onChange={(e) => updateField('propertyType', e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-accent-blue-light focus:ring-1 focus:ring-accent-blue-light transition-all"
            >
              <option value="" className="bg-deep-blue text-gray-400">
                Property Type
              </option>
              <option value="office" className="bg-deep-blue text-white">
                Office
              </option>
              <option value="retail" className="bg-deep-blue text-white">
                Retail
              </option>
              <option value="industrial" className="bg-deep-blue text-white">
                Industrial
              </option>
              <option value="medical" className="bg-deep-blue text-white">
                Medical
              </option>
              <option value="land" className="bg-deep-blue text-white">
                Land
              </option>
            </select>
          </div>
          <textarea
            placeholder="Describe your requirements, timeline, and budget..."
            value={formData.requirements}
            onChange={(e) => updateField('requirements', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-accent-blue-light focus:ring-1 focus:ring-accent-blue-light transition-all resize-none"
          />
          <button
            type="submit"
            className="bg-accent-blue hover:bg-accent-blue-light text-white px-10 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Submit Inquiry
          </button>
        </motion.form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-dark text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">K</span>
            </div>
            <div>
              <p className="font-bold text-white">Keystone Property Group</p>
              <p className="text-sm">{siteInfo.address}</p>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end gap-1">
            <p className="text-sm">{siteInfo.phone}</p>
            <p className="text-sm">{siteInfo.email}</p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Keystone Property Group. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-cream text-dark font-sans antialiased">
      <Navbar scrolled={scrolled} mobileOpen={mobileOpen} onToggle={() => setMobileOpen((v) => !v)} />
      <HeroSection />
      <ServicesSection items={services} />
      <PropertiesSection items={featuredProperties} />
      <InsightsSection items={marketInsights} />
      <ProcessSection steps={processSteps} />
      <SectorsSection items={sectors} />
      <TeamSection members={team} />
      <CtaSection />
      <Footer />
    </div>
  );
}
