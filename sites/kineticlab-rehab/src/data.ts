export const heroData = {
  headline: "Recover with data. Return with confidence.",
  subheadline: "High-performance physical therapy for athletes and active adults. Clinical precision meets performance science.",
  heroImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1600&q=85",
  therapyImage: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=85",
  stats: [
    { label: "Return to Sport Rate", value: "94%", detail: "ACL reconstruction" },
    { label: "Avg Recovery Time", value: "-23%", detail: "vs. national average" },
    { label: "Patient Satisfaction", value: "4.9/5", detail: "across 2,400+ patients" },
  ],
  assessmentPreview: {
    title: "Performance Assessment",
    metrics: [
      { name: "Range of Motion", value: 78, unit: "%" },
      { name: "Strength Index", value: 65, unit: "%" },
      { name: "Pain Level", value: 3, unit: "/10" },
      { name: "Compliance", value: 92, unit: "%" },
    ],
  },
};

export const conditions = [
  {
    id: "acl",
    name: "ACL Recovery",
    description: "Complete ACL reconstruction rehabilitation with sport-specific return criteria.",
    icon: "lightning",
    severity: "High",
    avgWeeks: "9-12",
  },
  {
    id: "shoulder",
    name: "Shoulder Instability",
    description: "Rotator cuff repair, labral tears, and overhead athlete shoulder rehabilitation.",
    icon: "◉",
    severity: "Moderate",
    avgWeeks: "6-10",
  },
  {
    id: "back",
    name: "Back Pain",
    description: "Disc herniation, spinal stenosis, and chronic lower back movement restoration.",
    icon: "▮",
    severity: "Variable",
    avgWeeks: "4-8",
  },
  {
    id: "running",
    name: "Running Injuries",
    description: "IT band, plantar fasciitis, shin splints, and stress fracture rehabilitation.",
    icon: "⟶",
    severity: "Moderate",
    avgWeeks: "3-6",
  },
  {
    id: "postop",
    name: "Post-Surgical",
    description: "Joint replacement, meniscus repair, and surgical rehabilitation protocols.",
    icon: "✦",
    severity: "High",
    avgWeeks: "8-16",
  },
  {
    id: "mobility",
    name: "Mobility Limitations",
    description: "Joint stiffness, frozen shoulder, post-immobilization movement recovery.",
    icon: "◎",
    severity: "Moderate",
    avgWeeks: "4-8",
  },
];

export const assessments = [
  {
    id: "range",
    name: "Range of Motion",
    description: "Goniometric and digital measurement of joint mobility across all planes.",
    metrics: ["Flexion", "Extension", "Rotation", "Abduction"],
    icon: "↻",
  },
  {
    id: "strength",
    name: "Strength Testing",
    description: "Isokinetic dynamometry and functional strength assessment protocols.",
    metrics: ["Peak Torque", "Bilateral Symmetry", "Endurance", "Power Output"],
    icon: "◆",
  },
  {
    id: "movement",
    name: "Movement Screen",
    description: "Functional Movement Screen (FMS) and sport-specific movement analysis.",
    metrics: ["Squat Pattern", "Lunge Quality", "Balance", "Symmetry"],
    icon: "⬡",
  },
  {
    id: "pain",
    name: "Pain Mapping",
    description: "Digital pain assessment with location, intensity, and trigger identification.",
    metrics: ["Location", "Intensity", "Frequency", "Triggers"],
    icon: "◈",
  },
  {
    id: "goals",
    name: "Recovery Goals",
    description: "Personalized outcome measures aligned with your sport and lifestyle demands.",
    metrics: ["Sport Demands", "Timeline", "Milestones", "Criteria"],
    icon: "⊕",
  },
];

export const programs = [
  {
    id: "return-sport",
    name: "Return to Sport",
    description: "Sport-specific rehabilitation with progressive loading and return-to-play criteria.",
    duration: "8-16 weeks",
    frequency: "3-4x/week",
    features: ["Plyometric progression", "Sport drills", "Competition simulation", "Psychological readiness"],
    intensity: "High",
  },
  {
    id: "postop-rehab",
    name: "Post-Op Rehab",
    description: "Evidence-based surgical rehabilitation following orthopedic protocols.",
    duration: "12-24 weeks",
    frequency: "2-3x/week",
    features: ["Phase-based progression", "Tissue healing timelines", "Objective milestones", "Surgeon communication"],
    intensity: "Progressive",
  },
  {
    id: "mobility-reset",
    name: "Mobility Reset",
    description: "Restore full range of motion and movement quality for daily life and sport.",
    duration: "4-8 weeks",
    frequency: "2-3x/week",
    features: ["Joint mobilization", "Soft tissue work", "Movement retraining", "Home program"],
    intensity: "Moderate",
  },
  {
    id: "strength-rebuild",
    name: "Strength Rebuild",
    description: "Progressive resistance training to rebuild muscle capacity and resilience.",
    duration: "6-12 weeks",
    frequency: "3x/week",
    features: ["Periodized loading", "Bilateral training", "Eccentric focus", "Performance testing"],
    intensity: "High",
  },
];

export const dashboardData = {
  pain: {
    label: "Pain Level",
    unit: "/10",
    data: [7, 6, 5, 5, 4, 3, 3, 2, 2, 1, 1, 1],
    trend: "decreasing",
    current: 1,
  },
  mobility: {
    label: "Mobility Score",
    unit: "%",
    data: [45, 52, 58, 63, 68, 72, 76, 80, 84, 87, 90, 93],
    trend: "increasing",
    current: 93,
  },
  strength: {
    label: "Strength Index",
    unit: "%",
    data: [40, 45, 50, 55, 60, 64, 68, 72, 76, 80, 84, 88],
    trend: "increasing",
    current: 88,
  },
  compliance: {
    label: "Exercise Compliance",
    unit: "%",
    data: [85, 90, 88, 92, 95, 93, 96, 94, 97, 95, 98, 96],
    trend: "stable",
    current: 96,
  },
};

export const therapists = [
  {
    name: "Dr. Sarah Chen",
    role: "Sports Physical Therapist",
    specialties: ["ACL Rehabilitation", "Return to Sport", "Running Biomechanics"],
    certifications: ["DPT, OCS", "CSCS", "FMS Level 2"],
    experience: "12 years",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=85",
  },
  {
    name: "Marcus Williams",
    role: "Orthopedic Specialist",
    specialties: ["Post-Surgical Rehab", "Shoulder Rehabilitation", "Joint Replacement"],
    certifications: ["DPT, SCS", "OCS", "MDT Certified"],
    experience: "15 years",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=85",
  },
  {
    name: "Dr. Elena Rodriguez",
    role: "Performance Therapist",
    specialties: ["Mobility Restoration", "Pain Science", "Movement Assessment"],
    certifications: ["DPT, PhD", "COMT", "Pain Science Fellow"],
    experience: "10 years",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964ac31?w=400&q=85",
  },
  {
    name: "James Park",
    role: "Strength & Rehab Coach",
    specialties: ["Strength Rebuilding", "Athletic Performance", "Return to Play"],
    certifications: ["DPT, CSCS", "USAW Level 2", "DNS A/B"],
    experience: "8 years",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&q=85",
  },
];

export const recoveryTimeline = [
  {
    phase: "Acute Phase",
    weeks: "Weeks 1-2",
    focus: "Protection & Inflammation Control",
    milestones: ["Pain reduction to 3/10", "Basic mobility restored", "Swelling controlled", "Walking normalized"],
    progress: 25,
    activities: ["Cryotherapy", "Gentle ROM", "Isometric activation", "Edema management"],
  },
  {
    phase: "Recovery Phase",
    weeks: "Weeks 3-6",
    focus: "Tissue Healing & Movement Restoration",
    milestones: ["Full range of motion", "Pain below 2/10", "Normal gait pattern", "Basic strength 60%"],
    progress: 50,
    activities: ["Manual therapy", "Progressive loading", "Neuromuscular re-education", "Aerobic conditioning"],
  },
  {
    phase: "Strengthening Phase",
    weeks: "Weeks 6-12",
    focus: "Capacity Building & Functional Training",
    milestones: ["Strength 80%+ bilateral", "Sport-specific movement", "Pain-free daily activity", "Advanced balance"],
    progress: 75,
    activities: ["Progressive resistance", "Plyometric introduction", "Sport-specific drills", "Proprioception training"],
  },
  {
    phase: "Return Phase",
    weeks: "Weeks 12+",
    focus: "Return to Sport & Performance",
    milestones: ["Full strength symmetry", "Sport clearance criteria", "Competition readiness", "Injury prevention plan"],
    progress: 100,
    activities: ["Full sport participation", "Competition simulation", "Performance optimization", "Maintenance program"],
  },
];

export const evaluationCTA = {
  headline: "Start Your Recovery Assessment",
  subheadline: "Book your comprehensive evaluation and receive a personalized recovery plan.",
  benefits: [
    "60-minute comprehensive assessment",
    "Digital movement analysis",
    "Personalized recovery timeline",
    "Evidence-based treatment plan",
    "Insurance verification included",
  ],
};
