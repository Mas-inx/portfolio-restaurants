export interface VisitType {
  id: string;
  label: string;
  icon: string;
  description: string;
  avgWait: string;
  ctaText: string;
}

export interface TreatmentCategory {
  name: string;
  items: string[];
}

export interface VisitStep {
  number: number;
  title: string;
  description: string;
  duration: string;
}

export interface PricingTier {
  type: string;
  range: string;
  note: string;
}

export interface Provider {
  name: string;
  role: string;
  status: "available" | "busy" | "off";
}

export interface IntakeItem {
  id: string;
  label: string;
  category: string;
  required: boolean;
}

export const visitTypes: VisitType[] = [
  {
    id: "illness",
    label: "Illness",
    icon: "thermometer",
    description: "Fever, flu, cold, sore throat, ear infection, UTI",
    avgWait: "12 min",
    ctaText: "Check in for illness visit",
  },
  {
    id: "injury",
    label: "Injury",
    icon: "bandage",
    description: "Sprains, cuts, minor fractures, burns, wounds",
    avgWait: "18 min",
    ctaText: "Check in for injury visit",
  },
  {
    id: "testing",
    label: "Testing",
    icon: "flask",
    description: "Strep, flu, COVID, mono, urinalysis, basic labs",
    avgWait: "8 min",
    ctaText: "Check in for testing",
  },
  {
    id: "physicals",
    label: "Physicals",
    icon: "clipboard",
    description: "Sports physicals, school physicals, wellness exams",
    avgWait: "15 min",
    ctaText: "Check in for physical",
  },
  {
    id: "occupational",
    label: "Occupational",
    icon: "building",
    description: "Work injuries, drug screens, return-to-work clearance",
    avgWait: "10 min",
    ctaText: "Check in for occupational visit",
  },
];

export const treatmentCategories: TreatmentCategory[] = [
  {
    name: "Respiratory",
    items: ["Cough & cold", "Strep throat", "Bronchitis", "Sinus infection", "Asthma flare"],
  },
  {
    name: "Injuries & Wounds",
    items: ["Sprains & strains", "Minor fractures", "Cuts needing stitches", "Burns", "Sports injuries"],
  },
  {
    name: "Skin Conditions",
    items: ["Rashes", "Infections", "Allergic reactions", "Insect bites", "Poison ivy"],
  },
  {
    name: "Digestive",
    items: ["Nausea & vomiting", "Abdominal pain", "Diarrhea", "Dehydration", "Food poisoning"],
  },
  {
    name: "Urinary",
    items: ["UTI symptoms", "Kidney stone pain", "Blood in urine", "Difficulty urinating"],
  },
  {
    name: "Other",
    items: ["Eye irritation", "Ear pain", "Headaches", "Back pain", "Dizziness"],
  },
];

export const visitFlow: VisitStep[] = [
  {
    number: 1,
    title: "Check In Online",
    description: "Fill out forms from home. Secure your spot in the queue before you leave.",
    duration: "2 min",
  },
  {
    number: 2,
    title: "Arrive at Clinic",
    description: "Walk in and check your name at the kiosk. No paperwork needed.",
    duration: "On arrival",
  },
  {
    number: 3,
    title: "Triage",
    description: "A nurse takes vitals and reviews your symptoms. Priority based on acuity.",
    duration: "5 min",
  },
  {
    number: 4,
    title: "See Your Provider",
    description: "Board-certified provider examines you, orders tests if needed.",
    duration: "15–20 min",
  },
  {
    number: 5,
    title: "Discharge & Instructions",
    description: "Get prescriptions, follow-up plan, and return precautions sent to your phone.",
    duration: "5 min",
  },
];

export const pricingTiers: PricingTier[] = [
  { type: "Office Visit", range: "$100 – $175", note: "Standard urgent care visit" },
  { type: "Physical Exam", range: "$75 – $125", note: "Sports, school, employment" },
  { type: "Strep / Flu Test", range: "$25 – $50", note: "Rapid results in 15 min" },
  { type: "X-Ray", range: "$150 – $300", note: "Extremities, chest" },
  { type: "Stitches / Wound Care", range: "$150 – $350", note: "Based on complexity" },
  { type: "IV Fluids", range: "$75 – $150", note: "For dehydration" },
];

export const providers: Provider[] = [
  { name: "Dr. Sarah Chen", role: "Medical Director, MD", status: "available" },
  { name: "Dr. Marcus Rivera", role: "Physician, DO", status: "available" },
  { name: "Dr. Aisha Patel", role: "Physician, MD", status: "busy" },
];

export const intakeChecklist: IntakeItem[] = [
  { id: "photo-id", label: "Photo ID (driver's license or passport)", category: "Identification", required: true },
  { id: "insurance", label: "Insurance card (front and back)", category: "Identification", required: true },
  { id: "medications", label: "List of current medications", category: "Medical History", required: true },
  { id: "allergies", label: "Known allergies (medications, food, latex)", category: "Medical History", required: true },
  { id: "conditions", label: "Existing medical conditions", category: "Medical History", required: false },
  { id: "surgeries", label: "Previous surgeries or hospitalizations", category: "Medical History", required: false },
  { id: "symptoms", label: "Description of today's symptoms", category: "Today's Visit", required: true },
  { id: "onset", label: "When symptoms started", category: "Today's Visit", required: true },
  { id: "severity", label: "Pain level (1–10)", category: "Today's Visit", required: true },
  { id: "prior-treatment", label: "Any treatment tried before coming in", category: "Today's Visit", required: false },
  { id: "consent", label: "Consent to treat form", category: "Legal", required: true },
  { id: "hipaa", label: "HIPAA acknowledgment", category: "Legal", required: true },
];

export const clinicHours = {
  weekdays: "8:00 AM – 8:00 PM",
  weekends: "9:00 AM – 5:00 PM",
  holidays: "10:00 AM – 2:00 PM",
};

export const insuranceAccepted = [
  "Aetna",
  "Blue Cross Blue Shield",
  "Cigna",
  "United Healthcare",
  "Humana",
  "Medicare",
  "Medicaid",
  "Tricare",
];
