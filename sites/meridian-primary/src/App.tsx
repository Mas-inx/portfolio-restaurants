import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  heroData,
  careModelData,
  servicesData,
  membershipData,
  journeyData,
  teamData,
  portalData,
  ctaData
} from './data';

// Icons
function ClockIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  );
}
function MessageIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  );
}
function RefreshIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  );
}
function DocumentIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  );
}
function BellIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  );
}
function ListIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
      <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

const iconMap: Record<string, React.FC> = {
  clock: ClockIcon,
  shield: ShieldIcon,
  message: MessageIcon,
  refresh: RefreshIcon,
  calendar: CalendarIcon,
  document: DocumentIcon,
  bell: BellIcon,
  list: ListIcon
};

// Section wrapper with scroll animation
function Section({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.section
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.section>
  );
}

// Hero
function Hero() {
  const [visitType, setVisitType] = useState(0);
  const slots = [
    { type: 'New Patient', time: 'Tomorrow, 2:30 PM' },
    { type: 'Follow-up', time: 'Today, 4:00 PM' },
    { type: 'Wellness', time: 'Wed, 10:00 AM' },
    { type: 'Urgent', time: 'Today, 3:15 PM' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setVisitType(prev => (prev + 1) % slots.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      <div className="hero-content">
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="badge-dot" />
          Accepting new members
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          {heroData.headline}
        </motion.h1>
        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          {heroData.subheadline}
        </motion.p>
        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          <a href="#membership" className="btn-primary">View membership plans</a>
          <a href="#journey" className="btn-secondary">How it works</a>
        </motion.div>
      </div>
      <motion.div
        className="availability-card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        <div className="availability-header">
          <span className="availability-dot" />
          <span>Live availability</span>
        </div>
        <div className="availability-visit-types">
          {heroData.availability.visitTypes.map((type, i) => (
            <button
              key={type}
              className={`visit-type-btn ${i === visitType ? 'active' : ''}`}
              onClick={() => setVisitType(i)}
            >
              {type}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={visitType}
            className="availability-slot"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <ClockIcon />
            <div>
              <div className="slot-time">{slots[visitType].time}</div>
              <div className="slot-type">{slots[visitType].type} visit</div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

// Care Model (sticky)
function CareModel() {
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { margin: '-200px' });

  useEffect(() => {
    if (!isInView) return;
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / (sectionHeight - window.innerHeight)));
      const featureIndex = Math.min(
        careModelData.features.length - 1,
        Math.floor(progress * careModelData.features.length)
      );
      setActiveFeature(featureIndex);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isInView]);

  return (
    <section className="care-model" ref={sectionRef}>
      <div className="care-model-sticky">
        <div className="care-model-text">
          <h2>{careModelData.title}</h2>
          <p>{careModelData.subtitle}</p>
        </div>
        <div className="care-model-features">
          {careModelData.features.map((feature, i) => {
            const Icon = iconMap[feature.icon];
            return (
              <motion.div
                key={feature.title}
                className={`care-feature ${i === activeFeature ? 'active' : ''}`}
                animate={{
                  opacity: i === activeFeature ? 1 : 0.4,
                  x: i === activeFeature ? 0 : 0
                }}
                transition={{ duration: 0.4 }}
              >
                <div className="care-feature-icon">
                  <Icon />
                </div>
                <div className="care-feature-content">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
                <div className="care-feature-indicator">
                  <div className="indicator-fill" style={{ transform: `scaleX(${i === activeFeature ? 1 : 0})` }} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Services
function Services() {
  return (
    <Section className="services">
      <h2>{servicesData.title}</h2>
      <div className="services-grid">
        {servicesData.services.map((service, i) => (
          <motion.div
            key={service.name}
            className="service-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <div className="service-icon">
              <div className="service-dot" />
            </div>
            <h3>{service.name}</h3>
            <p>{service.description}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// Membership Plans
function Membership() {
  return (
    <Section className="membership" delay={0.1}>
      <h2>{membershipData.title}</h2>
      <p className="section-subtitle">{membershipData.subtitle}</p>
      <div className="plans-grid">
        {membershipData.plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            className={`plan-card ${plan.highlighted ? 'highlighted' : ''}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
          >
            {plan.highlighted && <div className="plan-badge">Most popular</div>}
            <h3>{plan.name}</h3>
            <div className="plan-price">
              <span className="price">{plan.price}</span>
              <span className="period">{plan.period}</span>
            </div>
            <ul className="plan-features">
              {plan.features.map(f => (
                <li key={f}><CheckIcon /> {f}</li>
              ))}
            </ul>
            <button className={`plan-btn ${plan.highlighted ? 'btn-primary' : 'btn-outline'}`}>
              Get started
            </button>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// Patient Journey
function Journey() {
  return (
    <Section className="journey">
      <h2>{journeyData.title}</h2>
      <div className="journey-steps">
        {journeyData.steps.map((step, i) => (
          <motion.div
            key={step.number}
            className="journey-step"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.5 }}
          >
            <div className="step-number">{step.number}</div>
            <div className="step-content">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
            {i < journeyData.steps.length - 1 && <div className="step-connector" />}
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// Care Team
function Team() {
  return (
    <Section className="team">
      <h2>{teamData.title}</h2>
      <div className="team-grid">
        {teamData.providers.map((provider, i) => (
          <motion.div
            key={provider.name}
            className="provider-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
          >
            <div className="provider-avatar">
              {provider.name.split(' ').map(n => n[0]).join('')}
            </div>
            <h3>{provider.name}</h3>
            <div className="provider-role">{provider.role}</div>
            <p className="provider-philosophy">"{provider.philosophy}"</p>
            <div className="provider-specialties">
              {provider.specialties.map(s => (
                <span key={s} className="specialty-tag">{s}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// Patient Portal Preview
function Portal() {
  return (
    <Section className="portal">
      <h2>{portalData.title}</h2>
      <div className="portal-mock">
        <div className="portal-header">
          <div className="portal-nav">
            <span className="portal-logo">Meridian</span>
            <div className="portal-nav-items">
              <span>Dashboard</span>
              <span>Messages</span>
              <span>Records</span>
            </div>
          </div>
          <div className="portal-user">
            <div className="user-avatar">JP</div>
          </div>
        </div>
        <div className="portal-body">
          <div className="portal-sidebar">
            <div className="sidebar-item active">Dashboard</div>
            <div className="sidebar-item">Appointments</div>
            <div className="sidebar-item">Messages</div>
            <div className="sidebar-item">Lab Results</div>
            <div className="sidebar-item">Care Plan</div>
          </div>
          <div className="portal-main">
            <div className="portal-welcome">
              <h3>Good morning, Jordan</h3>
              <p>Here's your care overview</p>
            </div>
            <div className="portal-cards">
              {portalData.features.map((feature, i) => {
                const Icon = iconMap[feature.icon];
                return (
                  <motion.div
                    key={feature.label}
                    className="portal-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  >
                    <div className="portal-card-icon"><Icon /></div>
                    <div className="portal-card-label">{feature.label}</div>
                    <div className="portal-card-desc">{feature.description}</div>
                  </motion.div>
                );
              })}
            </div>
            <motion.div
              className="portal-appointment-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className="appt-header">
                <CalendarIcon />
                <span>Upcoming appointment</span>
              </div>
              <div className="appt-details">
                <div className="appt-date">Wednesday, June 18</div>
                <div className="appt-time">10:00 AM — Wellness Visit</div>
                <div className="appt-provider">Dr. Sarah Chen</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// CTA
function CTA() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <Section className="cta-section">
      <div className="cta-card">
        <h2>{ctaData.title}</h2>
        <p>{ctaData.subtitle}</p>
        {submitted ? (
          <motion.div
            className="cta-success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <CheckIcon /> Thank you! We'll be in touch within 24 hours.
          </motion.div>
        ) : (
          <form className="cta-form" onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>
            <div className="form-row">
              <input type="text" placeholder="First name" required />
              <input type="text" placeholder="Last name" required />
            </div>
            <div className="form-row">
              <input type="email" placeholder="Email" required />
              <input type="tel" placeholder="Phone" />
            </div>
            <select>
              <option value="">Interested in...</option>
              <option>Individual membership</option>
              <option>Family membership</option>
              <option>Senior membership</option>
            </select>
            <button type="submit" className="btn-primary btn-large">{ctaData.buttonText}</button>
          </form>
        )}
      </div>
    </Section>
  );
}

// Navigation
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#" className="nav-logo">
          <span className="logo-mark" />
          Meridian Primary
        </a>
        <div className="nav-links">
          <a href="#care-model">Care Model</a>
          <a href="#services">Services</a>
          <a href="#membership">Membership</a>
          <a href="#team">Team</a>
          <a href="#cta" className="btn-nav">Join</a>
        </div>
      </div>
    </nav>
  );
}

// Footer
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="logo-mark" />
          <span>Meridian Primary</span>
        </div>
        <div className="footer-links">
          <a href="#care-model">Care Model</a>
          <a href="#services">Services</a>
          <a href="#membership">Membership</a>
          <a href="#team">Team</a>
        </div>
        <div className="footer-copy">
          © 2026 Meridian Primary Care. Membership-based family medicine.
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="app">
      <Nav />
      <main>
        <Hero />
        <div id="care-model"><CareModel /></div>
        <div id="services"><Services /></div>
        <div id="membership"><Membership /></div>
        <div id="journey"><Journey /></div>
        <div id="team"><Team /></div>
        <Portal />
        <div id="cta"><CTA /></div>
      </main>
      <Footer />
    </div>
  );
}
