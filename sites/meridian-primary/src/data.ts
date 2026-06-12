export const heroData = {
  headline: "Primary care with enough time to actually listen.",
  subheadline: "Membership-based family medicine focused on prevention, chronic care, and real relationships.",
  availability: {
    nextSlot: "Tomorrow, 2:30 PM",
    visitTypes: ["New Patient", "Follow-up", "Wellness", "Urgent"]
  }
};

export const careModelData = {
  title: "A different model of care",
  subtitle: "Built around your life, not a 15-minute slot",
  features: [
    {
      icon: "clock",
      title: "Longer visits",
      description: "45-60 minute appointments so we can actually understand what's going on"
    },
    {
      icon: "shield",
      title: "Prevention plans",
      description: "Proactive screening and lifestyle planning, not just reactive sick care"
    },
    {
      icon: "message",
      title: "Direct messaging",
      description: "Message your care team anytime—no phone trees or waiting rooms"
    },
    {
      icon: "refresh",
      title: "Follow-ups that happen",
      description: "We track your care plan and check in between visits"
    }
  ]
};

export const servicesData = {
  title: "Comprehensive care for your whole family",
  services: [
    { name: "Wellness Exams", description: "Annual physicals and preventive screenings" },
    { name: "Chronic Care", description: "Diabetes, hypertension, thyroid, and more" },
    { name: "Pediatrics", description: "Well-child visits and sick care for kids" },
    { name: "Women's Health", description: "Gynecology, contraception, menopause" },
    { name: "Lab Services", description: "On-site bloodwork and rapid results" },
    { name: "Urgent Concerns", description: "Same-day appointments for acute issues" }
  ]
};

export const membershipData = {
  title: "Simple, transparent membership",
  subtitle: "No insurance billing. No surprise costs. Just care.",
  plans: [
    {
      name: "Individual",
      price: "$149",
      period: "/month",
      features: [
        "Unlimited messaging",
        "Quarterly wellness visits",
        "Same-week urgent access",
        "Prevention planning",
        "Care coordination"
      ],
      highlighted: false
    },
    {
      name: "Family",
      price: "$299",
      period: "/month",
      features: [
        "Up to 4 family members",
        "Unlimited messaging",
        "Bi-monthly wellness visits",
        "Same-week urgent access",
        "Pediatric care included",
        "Family health planning"
      ],
      highlighted: true
    },
    {
      name: "Senior",
      price: "$199",
      period: "/month",
      features: [
        "Unlimited messaging",
        "Monthly wellness visits",
        "Chronic care management",
        "Medication review",
        "Care coordination",
        "Home visit option"
      ],
      highlighted: false
    }
  ]
};

export const journeyData = {
  title: "Your care journey",
  steps: [
    { number: "01", title: "Join", description: "Simple sign-up, no insurance paperwork" },
    { number: "02", title: "Intake", description: "Complete health history online at your pace" },
    { number: "03", title: "First visit", description: "60-minute deep dive into your health goals" },
    { number: "04", title: "Care plan", description: "Personalized prevention and treatment plan" },
    { number: "05", title: "Ongoing support", description: "Regular check-ins, messaging, and follow-ups" }
  ]
};

export const teamData = {
  title: "Meet your care team",
  providers: [
    {
      name: "Dr. Sarah Chen",
      role: "Family Medicine",
      philosophy: "I believe in listening first. Most answers are in the story.",
      specialties: ["Preventive care", "Chronic disease", "Women's health"]
    },
    {
      name: "Dr. Marcus Johnson",
      role: "Pediatrics",
      philosophy: "Kids aren't just small adults. They deserve care designed for them.",
      specialties: ["Well-child care", "Development", "Adolescent health"]
    },
    {
      name: "Dr. Elena Rodriguez",
      role: "Internal Medicine",
      philosophy: "Complex problems need time and partnership. That's what we offer.",
      specialties: ["Diabetes", "Hypertension", "Geriatric care"]
    }
  ]
};

export const portalData = {
  title: "Your care, always accessible",
  features: [
    { icon: "calendar", label: "Appointments", description: "Book, reschedule, view upcoming visits" },
    { icon: "document", label: "Lab Results", description: "See results as soon as they're ready" },
    { icon: "bell", label: "Reminders", description: "Screening and follow-up alerts" },
    { icon: "list", label: "Care Plan", description: "Your personalized health roadmap" }
  ]
};

export const ctaData = {
  title: "Ready for care that fits your life?",
  subtitle: "Tell us about yourself and we'll reach out within 24 hours.",
  buttonText: "Request membership info"
};
