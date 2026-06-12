import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  heroData,
  conditions,
  assessments,
  programs,
  dashboardData,
  therapists,
  recoveryTimeline,
  evaluationCTA,
} from './data';

// Icon component - maps string names to inline SVGs
function Icon({ name, className = '' }: { name: string; className?: string }) {
  const svgProps = {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
  };

  const icons: Record<string, React.ReactNode> = {
    lightning: (
      <svg {...svgProps}>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    stopwatch: (
      <svg {...svgProps}>
        <circle cx="12" cy="13" r="8" />
        <path d="M12 9v4l2 2" />
        <path d="M5 3L2 6" />
        <path d="M22 6l-3-3" />
        <path d="M12 2v3" />
        <path d="M10 2h4" />
      </svg>
    ),
  };

  return <>{icons[name] || null}</>;
}

// ─── Utility Components ─────────────────────────────────────────────────────

function GridBackground() {
  return (
    <div className="grid-bg">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(0,136,255,0.07)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="section-label">
      <span className="section-label-line" />
      <span className="section-label-text">{children}</span>
    </div>
  );
}

// ─── Navigation ─────────────────────────────────────────────────────────────

function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      className={`nav ${scrolled ? 'nav-scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="nav-inner">
        <div className="nav-brand">
          <span className="nav-logo">K</span>
          <span className="nav-title">KINETICLAB</span>
          <span className="nav-subtitle">REHAB</span>
        </div>
        <div className="nav-links">
          <a href="#conditions">Conditions</a>
          <a href="#assessment">Assessment</a>
          <a href="#programs">Programs</a>
          <a href="#progress">Progress</a>
          <a href="#therapists">Team</a>
          <a href="#evaluation" className="nav-cta">Book Evaluation</a>
        </div>
      </div>
    </motion.nav>
  );
}

// ─── Hero Section ───────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="hero-section" id="hero">
      <GridBackground />
      <div className="hero-content">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            SPORTS PHYSICAL THERAPY
          </div>
          <h1 className="hero-headline">{heroData.headline}</h1>
          <p className="hero-subheadline">{heroData.subheadline}</p>
          <div className="hero-stats">
            {heroData.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="hero-stat"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
              >
                <span className="hero-stat-value">{stat.value}</span>
                <span className="hero-stat-label">{stat.label}</span>
                <span className="hero-stat-detail">{stat.detail}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="hero-assessment-card"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="assessment-card-header">
            <span className="assessment-card-icon">◈</span>
            <span>{heroData.assessmentPreview.title}</span>
            <span className="assessment-card-status">LIVE</span>
          </div>
          <div className="assessment-card-metrics">
            {heroData.assessmentPreview.metrics.map((metric) => (
              <div key={metric.name} className="assessment-metric">
                <div className="assessment-metric-header">
                  <span>{metric.name}</span>
                  <span className="assessment-metric-value">
                    {metric.value}{metric.unit}
                  </span>
                </div>
                <div className="assessment-metric-bar">
                  <motion.div
                    className="assessment-metric-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.value}%` }}
                    transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="assessment-card-footer">
            <span>Session #2847</span>
            <span className="assessment-card-time">Updated 2m ago</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Conditions Section ─────────────────────────────────────────────────────

function ConditionsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="conditions-section" id="conditions" ref={ref}>
      <div className="section-container">
        <SectionLabel>CONDITIONS WE TREAT</SectionLabel>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Precision Rehab for Every Injury
        </motion.h2>
        <div className="conditions-grid">
          {conditions.map((condition, i) => (
            <motion.div
              key={condition.id}
              className="condition-card"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="condition-card-icon">{condition.icon === 'lightning' ? <Icon name="lightning" /> : condition.icon}</div>
              <h3 className="condition-card-name">{condition.name}</h3>
              <p className="condition-card-desc">{condition.description}</p>
              <div className="condition-card-meta">
                <span className="condition-severity">{condition.severity}</span>
                <span className="condition-weeks">{condition.avgWeeks} weeks</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Assessment Section ─────────────────────────────────────────────────────

function AssessmentSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="assessment-section" id="assessment" ref={ref}>
      <GridBackground />
      <div className="section-container">
        <SectionLabel>CLINICAL ASSESSMENT</SectionLabel>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Data-Driven Evaluation Panels
        </motion.h2>
        <div className="assessment-panels">
          {assessments.map((panel, i) => (
            <motion.div
              key={panel.id}
              className="assessment-panel"
              initial={{ opacity: 0, x: -60 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <div className="panel-header">
                <span className="panel-icon">{panel.icon}</span>
                <span className="panel-id">PNL-{String(i + 1).padStart(3, '0')}</span>
              </div>
              <h3 className="panel-name">{panel.name}</h3>
              <p className="panel-desc">{panel.description}</p>
              <div className="panel-metrics">
                {panel.metrics.map((m) => (
                  <span key={m} className="panel-metric-tag">{m}</span>
                ))}
              </div>
              <div className="panel-status">
                <span className="panel-status-dot" />
                ACTIVE
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Programs Section ───────────────────────────────────────────────────────

function ProgramsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeProgram, setActiveProgram] = useState<string | null>(null);

  return (
    <section className="programs-section" id="programs" ref={ref}>
      <div className="section-container">
        <SectionLabel>REHABILITATION PROGRAMS</SectionLabel>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Structured Pathways to Performance
        </motion.h2>
        <div className="programs-grid">
          {programs.map((program, i) => (
            <motion.div
              key={program.id}
              className={`program-card ${activeProgram === program.id ? 'program-active' : ''}`}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onMouseEnter={() => setActiveProgram(program.id)}
              onMouseLeave={() => setActiveProgram(null)}
            >
              <AnimatePresence>
                {activeProgram === program.id && (
                  <motion.div
                    className="program-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="program-overlay-grid" />
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="program-card-content">
                <div className="program-header">
                  <h3 className="program-name">{program.name}</h3>
                  <span className="program-intensity">{program.intensity}</span>
                </div>
                <p className="program-desc">{program.description}</p>
                <div className="program-meta">
                  <span className="flex items-center gap-1"><Icon name="stopwatch" className="w-4 h-4" /> {program.duration}</span>
                  <span>⟳ {program.frequency}</span>
                </div>
                <div className="program-features">
                  {program.features.map((f) => (
                    <span key={f} className="program-feature">
                      <span className="program-feature-dot" />
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Progress Dashboard ─────────────────────────────────────────────────────

function AnimatedChart({ data, color, label, unit, current }: {
  data: number[];
  color: string;
  label: string;
  unit: string;
  current: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const max = Math.max(...data) * 1.1;
  const height = 120;
  const width = 280;
  const step = width / (data.length - 1);

  const points = data.map((val, i) => `${i * step},${height - (val / max) * height}`).join(' ');
  const areaPoints = `0,${height} ${points} ${width},${height}`;

  return (
    <motion.div
      className="chart-card"
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <div className="chart-header">
        <span className="chart-label">{label}</span>
        <motion.span
          className="chart-value"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          {current}{unit}
        </motion.span>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="chart-svg">
        <defs>
          <linearGradient id={`grad-${label}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.polygon
          points={areaPoints}
          fill={`url(#grad-${label})`}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        />
        <motion.polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        />
        {data.map((val, i) => (
          <motion.circle
            key={i}
            cx={i * step}
            cy={height - (val / max) * height}
            r="3"
            fill={color}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3 + i * 0.05 }}
          />
        ))}
      </svg>
      <div className="chart-footer">
        <span>Week 1</span>
        <span>Week 12</span>
      </div>
    </motion.div>
  );
}

function ProgressDashboard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="progress-section" id="progress" ref={ref}>
      <GridBackground />
      <div className="section-container">
        <SectionLabel>PROGRESS DASHBOARD</SectionLabel>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Track Every Metric That Matters
        </motion.h2>
        <div className="dashboard-grid">
          <AnimatedChart
            data={dashboardData.pain.data}
            color="#ff4444"
            label={dashboardData.pain.label}
            unit={dashboardData.pain.unit}
            current={dashboardData.pain.current}
          />
          <AnimatedChart
            data={dashboardData.mobility.data}
            color="#0088ff"
            label={dashboardData.mobility.label}
            unit={dashboardData.mobility.unit}
            current={dashboardData.mobility.current}
          />
          <AnimatedChart
            data={dashboardData.strength.data}
            color="#00cc88"
            label={dashboardData.strength.label}
            unit={dashboardData.strength.unit}
            current={dashboardData.strength.current}
          />
          <AnimatedChart
            data={dashboardData.compliance.data}
            color="#ffaa00"
            label={dashboardData.compliance.label}
            unit={dashboardData.compliance.unit}
            current={dashboardData.compliance.current}
          />
        </div>
      </div>
    </section>
  );
}

// ─── Therapists Section ─────────────────────────────────────────────────────

function TherapistsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="therapists-section" id="therapists" ref={ref}>
      <div className="section-container">
        <SectionLabel>CLINICAL TEAM</SectionLabel>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Specialists in Human Performance
        </motion.h2>
        <div className="therapists-grid">
          {therapists.map((therapist, i) => (
            <motion.div
              key={therapist.name}
              className="therapist-card"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="therapist-avatar">
                <span>{therapist.name.split(' ').map(n => n[0]).join('')}</span>
              </div>
              <h3 className="therapist-name">{therapist.name}</h3>
              <p className="therapist-role">{therapist.role}</p>
              <div className="therapist-specialties">
                {therapist.specialties.map((s) => (
                  <span key={s} className="therapist-specialty">{s}</span>
                ))}
              </div>
              <div className="therapist-certs">
                {therapist.certifications.map((c) => (
                  <span key={c} className="therapist-cert">{c}</span>
                ))}
              </div>
              <div className="therapist-experience">
                {therapist.experience} experience
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Recovery Timeline ──────────────────────────────────────────────────────

function RecoveryTimelineSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="timeline-section" id="timeline" ref={ref}>
      <GridBackground />
      <div className="section-container">
        <SectionLabel>RECOVERY TIMELINE</SectionLabel>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Your Path from Injury to Performance
        </motion.h2>
        <div className="timeline-container">
          <div className="timeline-progress-bar">
            <motion.div
              className="timeline-progress-fill"
              style={{ height: progressHeight }}
            />
          </div>
          <div className="timeline-phases">
            {recoveryTimeline.map((phase, i) => (
              <motion.div
                key={phase.phase}
                className="timeline-phase"
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <div className="timeline-phase-marker">
                  <span className="timeline-phase-number">{i + 1}</span>
                </div>
                <div className="timeline-phase-content">
                  <div className="timeline-phase-header">
                    <h3>{phase.phase}</h3>
                    <span className="timeline-phase-weeks">{phase.weeks}</span>
                  </div>
                  <p className="timeline-phase-focus">{phase.focus}</p>
                  <div className="timeline-milestones">
                    {phase.milestones.map((m) => (
                      <div key={m} className="timeline-milestone">
                        <span className="timeline-milestone-check">✓</span>
                        {m}
                      </div>
                    ))}
                  </div>
                  <div className="timeline-activities">
                    {phase.activities.map((a) => (
                      <span key={a} className="timeline-activity">{a}</span>
                    ))}
                  </div>
                  <div className="timeline-progress-indicator">
                    <div className="timeline-progress-bar-mini">
                      <motion.div
                        className="timeline-progress-fill-mini"
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${phase.progress}%` } : {}}
                        transition={{ duration: 1, delay: 0.3 + i * 0.2 }}
                      />
                    </div>
                    <span>{phase.progress}%</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Evaluation CTA ─────────────────────────────────────────────────────────

function EvaluationCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    injury: '',
    timeline: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="evaluation-section" id="evaluation" ref={ref}>
      <div className="section-container">
        <motion.div
          className="evaluation-content"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="evaluation-info">
            <SectionLabel>BOOK YOUR EVALUATION</SectionLabel>
            <h2 className="section-title">{evaluationCTA.headline}</h2>
            <p className="evaluation-subheadline">{evaluationCTA.subheadline}</p>
            <div className="evaluation-benefits">
              {evaluationCTA.benefits.map((benefit) => (
                <div key={benefit} className="evaluation-benefit">
                  <span className="evaluation-benefit-check">→</span>
                  {benefit}
                </div>
              ))}
            </div>
          </div>
          <div className="evaluation-form-container">
            {submitted ? (
              <motion.div
                className="evaluation-success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <span className="evaluation-success-icon">✓</span>
                <h3>Evaluation Requested</h3>
                <p>We'll contact you within 24 hours to schedule your assessment.</p>
              </motion.div>
            ) : (
              <form className="evaluation-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(555) 000-0000"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Injury / Condition</label>
                  <select
                    value={formData.injury}
                    onChange={(e) => setFormData({ ...formData, injury: e.target.value })}
                    required
                  >
                    <option value="">Select your condition</option>
                    {conditions.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Preferred Timeline</label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  >
                    <option value="">When would you like to start?</option>
                    <option value="asap">As soon as possible</option>
                    <option value="1-2weeks">Within 1-2 weeks</option>
                    <option value="thismonth">This month</option>
                    <option value="flexible">I'm flexible</option>
                  </select>
                </div>
                <button type="submit" className="evaluation-submit">
                  Request Evaluation
                  <span>→</span>
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Footer ─────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="nav-logo">K</span>
          <div>
            <span className="footer-brand-name">KINETICLAB REHAB</span>
            <span className="footer-brand-tagline">Sports Physical Therapy</span>
          </div>
        </div>
        <div className="footer-links">
          <a href="#conditions">Conditions</a>
          <a href="#assessment">Assessment</a>
          <a href="#programs">Programs</a>
          <a href="#progress">Progress</a>
          <a href="#therapists">Team</a>
          <a href="#evaluation">Book</a>
        </div>
        <div className="footer-bottom">
          <span>© 2024 KineticLab Rehab. All rights reserved.</span>
          <span>Performance · Precision · Recovery</span>
        </div>
      </div>
    </footer>
  );
}

// ─── App ────────────────────────────────────────────────────────────────────

function App() {
  return (
    <div className="app">
      <Navigation />
      <HeroSection />
      <ConditionsSection />
      <AssessmentSection />
      <ProgramsSection />
      <ProgressDashboard />
      <TherapistsSection />
      <RecoveryTimelineSection />
      <EvaluationCTA />
      <Footer />
    </div>
  );
}

export default App;
