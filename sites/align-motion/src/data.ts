export const conditions = [
  { name: 'Back Pain', description: 'Chronic and acute back pain relief through targeted therapy, core strengthening, and postural correction.', icon: 'spine' },
  { name: 'Knee Pain', description: 'Recovery from knee injuries, ACL rehab, patellar tracking issues, and post-surgical restoration.', icon: 'knee' },
  { name: 'Shoulder', description: 'Rotator cuff rehab, frozen shoulder, impingement syndrome, and post-operative shoulder recovery.', icon: 'shoulder' },
  { name: 'Sports Injuries', description: 'Return-to-play programs for athletes of all levels, from weekend warriors to competitive professionals.', icon: 'sports' },
  { name: 'Post-Op Rehab', description: 'Structured recovery protocols following joint replacement, fracture repair, or soft tissue surgery.', icon: 'surgery' },
];

export const recoveryStages = [
  { step: 'Assessment', subtitle: 'Movement Analysis', description: 'Comprehensive evaluation of your movement patterns, strength, flexibility, and pain points to build your baseline.', duration: 'Session 1–2' },
  { step: 'Mobility', subtitle: 'Restore Range', description: 'Guided mobility work to regain pain-free movement in affected joints and surrounding tissue.', duration: 'Weeks 1–3' },
  { step: 'Strength', subtitle: 'Build Power', description: 'Progressive resistance training targeting the muscles that support and protect your vulnerable areas.', duration: 'Weeks 2–6' },
  { step: 'Tracking', subtitle: 'Measure Progress', description: 'Ongoing reassessment using measurable benchmarks — range of motion, pain scales, functional tests.', duration: 'Continuous' },
];

export const programs = [
  { name: 'Sports Rehab', description: 'Sport-specific recovery and conditioning programs designed to get you back to your game stronger than before.', features: ['Sport-specific drills', 'Biomechanical analysis', 'Return-to-play testing', 'Injury prevention'] },
  { name: 'Post-Surgery', description: 'Structured, phased recovery protocols coordinated with your surgeon for optimal surgical outcomes.', features: ['Surgeon-coordinated care', 'Phase-based progression', 'Scar tissue management', 'Functional milestones'] },
  { name: 'Pain Management', description: 'Non-invasive, drug-free approaches to chronic pain including manual therapy, dry needling, and corrective exercise.', features: ['Manual therapy', 'Dry needling', 'Pain neuroscience education', 'Ergonomic assessment'] },
  { name: 'Mobility Coaching', description: 'One-on-one coaching focused on improving movement quality, flexibility, and body awareness for daily life.', features: ['Movement screening', 'Flexibility programming', 'Posture correction', 'Home exercise design'] },
];

export const therapists = [
  { name: 'Dr. Maya Chen', title: 'DPT, OCS', specialties: 'Orthopedics & Sports', bio: 'Board-certified orthopedic specialist with 12 years experience in sports rehab and post-surgical recovery.' },
  { name: 'James Porter', title: 'DPT, CSCS', specialties: 'Strength & Conditioning', bio: 'Former collegiate strength coach turned PT, specializing in return-to-sport and power development.' },
  { name: 'Dr. Sofia Reyes', title: 'DPT, WCS', specialties: 'Women\'s Health & Pelvic', bio: 'Clinical specialist in women\'s health physical therapy with advanced training in pelvic floor rehabilitation.' },
  { name: 'Marcus Bell', title: 'PT, OCS, FAAOMPT', specialties: 'Manual Therapy', bio: 'Fellow of the Academy of Orthopaedic Manual Physical Therapists with expertise in complex spine cases.' },
];

export const journeySteps = [
  { phase: 'Initial Consult', description: 'We listen to your story, understand your goals, and perform a thorough movement assessment.', duration: '60 min' },
  { phase: 'Custom Plan', description: 'Your physical therapist designs a personalized recovery plan with clear milestones and timelines.', duration: 'Session 2' },
  { phase: 'Active Rehab', description: 'Guided sessions combining hands-on therapy, targeted exercise, and progressive loading.', duration: '4–12 weeks' },
  { phase: 'Milestone Check', description: 'Regular reassessments to track progress, adjust protocols, and celebrate wins along the way.', duration: 'Every 4 weeks' },
  { phase: 'Discharge & Beyond', description: 'Graduation to an independent maintenance program with optional check-ins and ongoing support.', duration: 'Ongoing' },
];

export const progressMetrics = [
  { label: 'Pain Level', current: 2, previous: 7, unit: '/10', improvement: true },
  { label: 'Range of Motion', current: 85, previous: 45, unit: '%', improvement: true },
  { label: 'Strength Score', current: 74, previous: 38, unit: '%', improvement: true },
  { label: 'Functional Index', current: 82, previous: 55, unit: '%', improvement: true },
];
