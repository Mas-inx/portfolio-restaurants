export const heroImage = 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=1600&q=85';
export const caregiverImage = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=85';
export const homeCareImage = 'https://images.unsplash.com/photo-1516303389659-d5e7c67255e7?w=800&q=85';

export const siteConfig = {
  name: "HomeHarbor Care",
  tagline: "Home care families can actually follow.",
  subtitle: "Professional in-home care with real-time family updates, visit notes, and care plans that keep everyone connected.",
  phone: "(555) 247-CARE",
  email: "care@homeharbor.com",
};

export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Care Plans", href: "#care-plan" },
  { label: "Family Portal", href: "#portal" },
  { label: "Safety", href: "#safety" },
  { label: "A Day in Care", href: "#day-in-care" },
  { label: "Get Started", href: "#assessment" },
];

export const heroUpdate = {
  caregiver: "Maria S.",
  time: "9:15 AM",
  note: "Morning visit complete. Margaret took her medication, enjoyed oatmeal with berries, and we did a 15-minute seated stretch. She's in great spirits today.",
  mood: "Happy",
  vitals: { bp: "128/82", hr: "72 bpm", temp: "98.4°F" },
};

export const services = [
  {
    icon: "heart",
    title: "Personal Care",
    description: "Bathing, grooming, dressing, and daily living support with dignity and respect.",
    features: ["Morning & evening routines", "Mobility assistance", "Hygiene support"],
  },
  {
    icon: "pill",
    title: "Medication Reminders",
    description: "Timely medication management with family notifications and pharmacy coordination.",
    features: ["Scheduled reminders", "Refill tracking", "Doctor coordination"],
  },
  {
    icon: "chat",
    title: "Companionship",
    description: "Meaningful connection through conversation, activities, and shared moments.",
    features: ["Conversation & games", "Outings & walks", "Hobby support"],
  },
  {
    icon: "stethoscope",
    title: "Skilled Nursing",
    description: "Licensed nursing care for wound care, injections, and chronic condition management.",
    features: ["Wound care", "Vital monitoring", "Post-hospital care"],
  },
  {
    icon: "recovery",
    title: "Recovery Support",
    description: "Post-surgery and post-hospital transition care to ensure safe healing at home.",
    features: ["Physical therapy support", "Meal preparation", "Safety assessments"],
  },
];

export const carePlanOptions = {
  needs: [
    { id: "personal", label: "Personal Care", icon: "droplet" },
    { id: "medication", label: "Medication Mgmt", icon: "pill" },
    { id: "companionship", label: "Companionship", icon: "chat" },
    { id: "nursing", label: "Skilled Nursing", icon: "stethoscope" },
    { id: "recovery", label: "Recovery Support", icon: "hospital" },
    { id: "memory", label: "Memory Support", icon: "brain" },
    { id: "meal", label: "Meal Preparation", icon: "utensils" },
    { id: "mobility", label: "Mobility Help", icon: "walking" },
  ],
  frequencies: [
    { id: "2hr", label: "2 hours/day", price: "$32/hr" },
    { id: "4hr", label: "4 hours/day", price: "$30/hr" },
    { id: "8hr", label: "Full day (8hr)", price: "$28/hr" },
    { id: "livein", label: "Live-in care", price: "$380/day" },
    { id: "overnight", label: "Overnight only", price: "$35/hr" },
  ],
  matches: [
    { name: "Maria S.", specialty: "Personal Care & Companionship", experience: "12 years", rating: 4.9, avatar: "MS" },
    { name: "James T.", specialty: "Skilled Nursing & Recovery", experience: "8 years", rating: 4.8, avatar: "JT" },
    { name: "Ruth A.", specialty: "Memory Care & Dementia", experience: "15 years", rating: 5.0, avatar: "RA" },
  ],
};

export const portalData = {
  visitNotes: [
    { time: "9:15 AM", caregiver: "Maria S.", type: "Morning Visit", status: "complete", note: "All morning tasks completed. Margaret enjoyed breakfast and her stretch routine." },
    { time: "1:00 PM", caregiver: "Maria S.", type: "Afternoon Check", status: "upcoming", note: "Lunch prep and medication reminder scheduled." },
    { time: "5:30 PM", caregiver: "David K.", type: "Evening Visit", status: "upcoming", note: "Dinner assistance and evening routine." },
  ],
  tasks: [
    { label: "Medication — 1:00 PM", done: true },
    { label: "Afternoon walk (15 min)", done: false },
    { label: "Blood pressure check", done: false },
    { label: "Call Dr. Chen re: prescription", done: false },
  ],
  messages: [
    { from: "Maria S.", text: "Margaret had a wonderful morning! She finished her oatmeal and we laughed about her garden stories.", time: "9:42 AM" },
    { from: "You", text: "That's great to hear. Thank you Maria!", time: "9:50 AM" },
  ],
  upcomingVisits: [
    { day: "Today", time: "1:00 PM", caregiver: "Maria S.", type: "Afternoon" },
    { day: "Today", time: "5:30 PM", caregiver: "David K.", type: "Evening" },
    { day: "Tomorrow", time: "7:00 AM", caregiver: "Maria S.", type: "Morning" },
    { day: "Tomorrow", time: "1:00 PM", caregiver: "Maria S.", type: "Afternoon" },
  ],
};

export const whoWeHelp = [
  { title: "Aging Parents", description: "Support for seniors who want to stay independent at home with dignity.", icon: "house" },
  { title: "Post-Surgery", description: "Recovery care that bridges hospital discharge to full healing.", icon: "bandage" },
  { title: "Chronic Care", description: "Ongoing management for diabetes, heart disease, COPD, and more.", icon: "heart" },
  { title: "Respite Care", description: "Give family caregivers a break with trusted, temporary relief.", icon: "leaf" },
  { title: "Memory Support", description: "Specialized care for Alzheimer's, dementia, and cognitive decline.", icon: "brain" },
];

export const safetyFeatures = [
  { title: "Background Checked", description: "Every caregiver passes criminal, driving, and reference checks.", icon: "check" },
  { title: "Certified Training", description: "CNA, HHA, and specialized certifications required for all roles.", icon: "clipboard" },
  { title: "Care Coordinator", description: "A dedicated coordinator oversees your plan and handles any issues.", icon: "user" },
  { title: "Backup Coverage", description: "If your caregiver can't make it, we send a qualified backup — guaranteed.", icon: "refresh" },
  { title: "Family Portal Access", description: "Real-time visit notes, photos, and direct messaging with your team.", icon: "smartphone" },
  { title: "Insurance Navigation", description: "We help you understand and maximize your long-term care benefits.", icon: "document" },
];

export const dayInCare = [
  {
    time: "7:00 AM",
    title: "Good Morning, Margaret",
    description: "Maria arrives with a warm greeting. Together they review the day's plan — a doctor's appointment at 10, lunch with her daughter at noon.",
    detail: "Morning vitals: BP 128/82, pulse 72, temperature 98.4°F",
    color: "sage",
  },
  {
    time: "7:30 AM",
    title: "Breakfast & Medication",
    description: "Maria prepares oatmeal with fresh berries — Margaret's favorite. Medication organizer is checked and all morning doses are taken on schedule.",
    detail: "Family notified: 'Medications taken ✓ — Margaret ate a full breakfast'",
    color: "blue",
  },
  {
    time: "8:15 AM",
    title: "Gentle Movement",
    description: "A 15-minute seated stretch routine keeps Margaret's joints flexible. Maria guides her through exercises approved by her physical therapist.",
    detail: "Activity logged: Seated stretching — 15 minutes completed",
    color: "sage",
  },
  {
    time: "9:30 AM",
    title: "Ready for the Appointment",
    description: "Maria helps Margaret dress and prepares her for the car. She shares a photo with the family: 'All dressed up and ready to go!'",
    detail: "Family portal update: Photo shared, departure confirmed",
    color: "peach",
  },
  {
    time: "12:30 PM",
    title: "Lunch with Family",
    description: "Margaret's daughter Sarah joins for lunch. Maria prepares a light meal and steps back to give them space. Connection matters.",
    detail: "Visit note: 'Family lunch — Margaret was joyful and engaged'",
    color: "lavender",
  },
  {
    time: "2:00 PM",
    title: "Afternoon Rest",
    description: "After lunch, Margaret enjoys her afternoon rest. Maria tidies up, preps dinner ingredients, and updates the care log for the family.",
    detail: "Care log updated: Full afternoon summary sent to family portal",
    color: "sage",
  },
  {
    time: "5:30 PM",
    title: "Evening Handoff",
    description: "David arrives for the evening shift. Maria briefs him on the day — the doctor was pleased, Margaret walked well, and dinner is prepped.",
    detail: "Shift handoff complete: Day summary shared with evening caregiver",
    color: "blue",
  },
];

export const assessmentFields = [
  { name: "fullName", label: "Your Name", type: "text", placeholder: "Jane Mitchell" },
  { name: "phone", label: "Phone Number", type: "tel", placeholder: "(555) 000-0000" },
  { name: "email", label: "Email", type: "email", placeholder: "jane@example.com" },
  { name: "careRecipient", label: "Who Needs Care?", type: "text", placeholder: "e.g., My mother, Margaret" },
  { name: "situation", label: "Current Situation", type: "select", options: [
    "Aging in place — needs daily support",
    "Post-hospital recovery",
    "Chronic condition management",
    "Memory care / dementia",
    "Respite for family caregiver",
    "Other",
  ]},
  { name: "urgency", label: "When Do You Need Care?", type: "select", options: [
    "Immediately (within 48 hours)",
    "This week",
    "Within the month",
    "Just exploring options",
  ]},
];
