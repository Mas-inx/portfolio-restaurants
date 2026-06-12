export interface Project {
  id: string;
  name: string;
  type: string;
  location: string;
  value: string;
  duration: string;
  image: string;
  scope: string;
  challenge: string;
  handover: string;
}

export interface ProcessStep {
  phase: string;
  title: string;
  duration: string;
  description: string;
  deliverables: string[];
}

export interface Service {
  icon: string;
  title: string;
  description: string;
  specs: string[];
}

export interface ControlFeature {
  name: string;
  description: string;
  metrics: { label: string; value: string }[];
}

export const siteData = {
  company: {
    name: "Ironline Builders",
    tagline: "Precision General Contracting",
    description: "General contracting built on documentation, discipline, and delivery. We run every project like a command center — because that's exactly what it is.",
    phone: "(555) 847-2900",
    email: "projects@ironlinebuilders.com",
    license: "GC-2024-8847",
  },

  hero: {
    headline: "Built on schedule. Documented at every step.",
    subheadline: "Ironline Builders runs commercial construction like a precision operation. Daily logs, milestone tracking, budget transparency — you always know exactly where your project stands.",
    schedule: {
      label: "Schedule Adherence",
      value: "98.7%",
      detail: "Across 47 completed projects",
    },
    budget: {
      label: "Budget Variance",
      value: "±2.1%",
      detail: "Average final vs. GMP",
    },
    siteStatus: {
      label: "Active Jobsites",
      value: "12",
      detail: "Zero safety incidents this quarter",
    },
  },

  services: [
    {
      icon: "building",
      title: "Commercial Fit-Outs",
      description: "Full tenant improvements and interior build-outs for Class A office space, retail, and mixed-use.",
      specs: ["Tenant improvements", "Core & shell", "Shell condition", "Landlord work"],
    },
    {
      icon: "industry",
      title: "Custom Builds",
      description: "Ground-up construction for specialized facilities requiring tight tolerances and complex MEP.",
      specs: ["Ground-up", "Design-build", "Heavy industrial", "Clean rooms"],
    },
    {
      icon: "medical",
      title: "Renovations",
      description: "Occupied-space renovations with phased construction, ICRA compliance, and minimal disruption.",
      specs: ["Occupied renovations", "Phased construction", "Historic restoration", "Seismic retrofit"],
    },
    {
      icon: "education",
      title: "Additions & Expansions",
      description: "Vertical and horizontal expansions that tie into existing structures without operational downtime.",
      specs: ["Vertical additions", "Wing expansions", "Parking structures", "Mezzanine builds"],
    },
    {
      icon: "retail",
      title: "Retail Construction",
      description: "Fast-track retail build-outs with brand-standard compliance and aggressive opening dates.",
      specs: ["Big-box retail", "Restaurant TI", "Showroom builds", "Multi-site rollouts"],
    },
    {
      icon: "office",
      title: "Office Interiors",
      description: "High-end office environments with integrated technology, acoustics, and premium finishes.",
      specs: ["Executive suites", "Open plan", "Conference centers", "Tech infrastructure"],
    },
  ],

  controlSystem: {
    title: "Every Project. Full Visibility.",
    subtitle: "Our project control system gives you real-time dashboards on schedule, budget, quality, and safety — updated daily.",
    features: [
      {
        name: "Daily Logs",
        description: "Crew counts, weather conditions, work completed, and photo documentation — logged every single day. No gaps, no guesswork.",
        metrics: [
          { label: "Avg. Entries/Day", value: "47" },
          { label: "Photo Docs/Week", value: "200+" },
          { label: "Crew Tracked", value: "Real-time" },
        ],
      },
      {
        name: "Change Orders",
        description: "Every change order is scoped, priced, and approved before work proceeds. Full traceability from request to execution.",
        metrics: [
          { label: "Avg. Processing", value: "48 hrs" },
          { label: "Approval Rate", value: "96%" },
          { label: "Dispute Rate", value: "<1%" },
        ],
      },
      {
        name: "Inspections",
        description: "Digital inspection checklists with pass/fail tracking, deficiency photos, and automated re-inspection scheduling.",
        metrics: [
          { label: "First-Pass Rate", value: "94%" },
          { label: "Inspections/Mo", value: "120+" },
          { label: "Open Items", value: "<5" },
        ],
      },
      {
        name: "Material Tracking",
        description: "Procurement logs, delivery schedules, and lead-time tracking for every material on every trade package.",
        metrics: [
          { label: "POs Tracked", value: "340+" },
          { label: "On-Time Delivery", value: "97%" },
          { label: "Lead Items", value: "Monitored" },
        ],
      },
      {
        name: "Milestone Schedule",
        description: "Critical path milestones with earned value tracking. You see percent-complete against plan at every level.",
        metrics: [
          { label: "Milestones Hit", value: "98.7%" },
          { label: "SPI Average", value: "1.02" },
          { label: "Lookahead", value: "6-week" },
        ],
      },
    ],
  },

  projects: [
    {
      id: "p1",
      name: "Meridian Distribution Center",
      type: "Industrial",
      location: "Phoenix, AZ",
      value: "$47.2M",
      duration: "14 months",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop",
      scope: "1.2M SF automated distribution facility with 40' clear height, 120 dock doors, and full AS/RS integration.",
      challenge: "Phased occupancy required delivering Zone A (600K SF) three months ahead of Zones B and C while maintaining active construction safety protocols.",
      handover: "Delivered 11 days ahead of schedule. Zone A operational 94 days early. Zero lost-time incidents across 287,000 man-hours.",
    },
    {
      id: "p2",
      name: "Cascade Medical Center",
      type: "Healthcare",
      location: "Portland, OR",
      value: "$128M",
      duration: "32 months",
      image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800&h=600&fit=crop",
      scope: "240-bed acute care hospital with Level II trauma center, 12 surgical suites, imaging center, and rooftop helipad.",
      challenge: "OSHPD-equivalent compliance with continuous occupied-space adjacency to existing emergency department during structural tie-ins.",
      handover: "Passed all regulatory inspections first-attempt. Final budget variance of +1.4% against $126.3M GMP. Full commissioning completed 2 weeks early.",
    },
    {
      id: "p3",
      name: "Apex Office Tower",
      type: "Commercial",
      location: "Denver, CO",
      value: "$89M",
      duration: "26 months",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
      scope: "22-story Class A office tower with LEED Platinum certification, 3-level underground parking, and ground-floor retail.",
      challenge: "High-altitude concrete pours with strict temperature controls, plus a 60-day weather delay recovered through accelerated MEP sequencing.",
      handover: "LEED Platinum certified. Delivered on original contract date despite weather recovery. Tenant TI program launched 30 days post-handover.",
    },
  ],

  process: [
    {
      phase: "01",
      title: "Pre-Construction",
      duration: "4–8 weeks",
      description: "Estimating, value engineering, constructability review, and master scheduling before a single shovel hits dirt.",
      deliverables: ["GMP proposal", "Master CPM schedule", "Site logistics plan", "Safety & QA plans", "Permitting strategy"],
    },
    {
      phase: "02",
      title: "Procurement",
      duration: "6–12 weeks",
      description: "Strategic subcontractor selection, long-lead material ordering, and trade package coordination.",
      deliverables: ["Bid packages", "Sub awards", "Purchase orders", "Delivery schedule", "Mock-up approvals"],
    },
    {
      phase: "03",
      title: "Construction",
      duration: "Project-specific",
      description: "Self-perform critical path. Manage trade stacking. Document everything. Hit every milestone.",
      deliverables: ["Daily logs", "Weekly reports", "Photo documentation", "Quality inspections", "Safety audits"],
    },
    {
      phase: "04",
      title: "Commissioning",
      duration: "4–6 weeks",
      description: "Systems testing, TAB, controls integration, and owner training for seamless facility turnover.",
      deliverables: ["Testing protocols", "O&M manuals", "Training sessions", "Warranty docs", "As-built drawings"],
    },
    {
      phase: "05",
      title: "Handover",
      duration: "2–4 weeks",
      description: "Final inspections, punch list completion, financial reconciliation, and project archive delivery.",
      deliverables: ["Certificate of occupancy", "Punch list closeout", "Final pay apps", "Project archive", "Warranty start"],
    },
  ],

  safety: {
    title: "Safety + Site Discipline",
    subtitle: "Every crew member goes home safe. Every day. Non-negotiable.",
    stats: [
      { label: "EMR Rating", value: "0.72", detail: "Industry avg: 1.0" },
      { label: "Recordable Rate", value: "0.8", detail: "Per 200K hours" },
      { label: "Days No Lost Time", value: "1,847", detail: "Company-wide" },
      { label: "Training Hours", value: "24K+", detail: "Annual investment" },
    ],
    standards: [
      { title: "Crew Standards", items: ["OSHA 30 required for all supervisors", "Weekly toolbox talks mandatory", "PPE compliance — zero tolerance", "Drug-free workplace policy"] },
      { title: "Documentation", items: ["Daily JHA submissions", "Incident/near-miss reporting within 1 hour", "Digital safety orientation records", "Subcontractor safety prequalification"] },
      { title: "Insurance", items: ["$10M general liability per occurrence", "$50M umbrella/excess coverage", "Workers' comp — all states", "Builder's risk on every project"] },
      { title: "Compliance", items: ["OSHA VPP Star participant", "Third-party safety audits quarterly", "EMR maintained below 0.80", "Full regulatory documentation"] },
    ],
  },

  budget: {
    title: "Budget Transparency",
    subtitle: "You see every dollar. Allowances, change orders, contingencies — all open book.",
    commitments: [
      {
        title: "Allowances",
        description: "Clearly defined allowance amounts with reconciliation at selection. No ambiguity, no surprises at final accounting.",
        icon: "allowance",
      },
      {
        title: "Change Orders",
        description: "Scoped, priced, and approved before work proceeds. Full documentation trail from field request to executed change.",
        icon: "change",
      },
      {
        title: "Contingencies",
        description: "Owner and GC contingencies tracked separately. Monthly draw reports show burn rate and forecast to completion.",
        icon: "contingency",
      },
      {
        title: "Reporting",
        description: "Weekly cost reports, monthly executive summaries, and real-time portal access. Open book accounting at all times.",
        icon: "reporting",
      },
    ],
  },

  cta: {
    title: "Start Your Project",
    description: "Tell us about your scope, timeline, and budget. We'll respond within 24 hours with initial thoughts and next steps.",
    buttonText: "Submit Project Intake",
    contactInfo: {
      phone: "(555) 847-2900",
      email: "projects@ironlinebuilders.com",
    },
    projectTypes: [
      "Commercial Fit-Out",
      "Custom Build",
      "Renovation",
      "Addition / Expansion",
      "Retail Construction",
      "Office Interior",
      "Other",
    ],
    timelines: [
      "Immediate (0–3 months)",
      "Near-term (3–6 months)",
      "Planned (6–12 months)",
      "Future (12+ months)",
    ],
    budgets: [
      "Under $500K",
      "$500K – $2M",
      "$2M – $10M",
      "$10M – $50M",
      "$50M+",
    ],
  },
};
