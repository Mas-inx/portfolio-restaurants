export interface Service {
  title: string
  description: string
  icon: string
}

export interface Provider {
  name: string
  role: string
  specialty: string
  description: string
  image: string
}

export interface AppointmentStep {
  step: string
  description: string
}

export interface InsuranceInfo {
  name: string
  accepted: boolean
}

export interface PatientExperienceItem {
  title: string
  description: string
  icon: string
}

export const siteInfo = {
  name: 'Lumina Family Clinic',
  tagline: 'Primary care that actually works with your life',
  description: 'Same-week appointments, a team that knows your name, and care that fits around your schedule — not the other way around.',
  phone: '(555) 234-5678',
  email: 'hello@luminaclinic.com',
  address: '742 Wellness Way, Suite 200, Portland, OR 97201',
  hours: {
    'Mon–Fri': '7:00 AM – 6:00 PM',
    'Saturday': '8:00 AM – 2:00 PM',
    'Sunday': 'Closed',
  },
  social: {
    facebook: '#',
    instagram: '#',
  },
}

export const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Appointments', href: '#appointments' },
  { label: 'Our Team', href: '#team' },
  { label: 'Insurance', href: '#insurance' },
  { label: 'Experience', href: '#experience' },
  { label: 'Location', href: '#location' },
]

export const services: Service[] = [
  {
    title: 'Annual Checkups',
    description: 'Comprehensive physical exams with preventive screenings tailored to your age, gender, and family history.',
    icon: 'stethoscope',
  },
  {
    title: 'Preventive Care',
    description: 'Vaccinations, health risk assessments, and lifestyle counseling to keep you healthy year-round.',
    icon: 'shield',
  },
  {
    title: 'Chronic Condition Management',
    description: 'Ongoing support for diabetes, hypertension, asthma, and other long-term conditions with personalized care plans.',
    icon: 'clipboard',
  },
  {
    title: 'Pediatric Visits',
    description: 'Well-child checkups, developmental screenings, and vaccinations from infancy through adolescence.',
    icon: 'baby',
  },
  {
    title: "Women's Health",
    description: 'Annual exams, contraceptive counseling, Pap smears, and menopause management in a comfortable setting.',
    icon: 'flower',
  },
  {
    title: 'Lab Coordination',
    description: 'On-site blood draws and seamless coordination with local labs for fast, accurate results.',
    icon: 'microscope',
  },
]

export const appointmentSteps: AppointmentStep[] = [
  {
    step: 'Choose Your Visit Type',
    description: 'Select from well visits, sick visits, physicals, or chronic care follow-ups. Most appointments are available within 48 hours.',
  },
  {
    step: 'Pick a Time That Works',
    description: 'View our real-time calendar and book a slot that fits your schedule — early morning, lunch, or late afternoon.',
  },
  {
    step: 'Complete Your Forms Online',
    description: 'Fill out intake paperwork from your phone or computer before you arrive. No clipboards in the waiting room.',
  },
  {
    step: 'Visit & Get Care',
    description: 'Come in, get seen by your provider, and leave with a clear plan. We handle referrals and prescription refills on the same day.',
  },
]

export const providers: Provider[] = [
  {
    name: 'Dr. Amelia Ross',
    role: 'Family Medicine Physician',
    specialty: 'Preventive care, chronic disease management',
    description: 'Dr. Ross has spent over 12 years helping families in Portland stay healthy. She believes in listening first and treating the whole person, not just the symptoms.',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Dr. Marcus Chen',
    role: 'Internist',
    specialty: 'Adult primary care, hypertension, diabetes',
    description: 'Dr. Chen brings 8 years of experience in internal medicine with a focus on evidence-based preventive care and managing complex chronic conditions.',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Sarah Mitchell, NP',
    role: 'Nurse Practitioner',
    specialty: "Pediatrics, women's health, wellness exams",
    description: 'Sarah is passionate about making healthcare accessible and approachable. She sees patients of all ages and loves building long-term relationships with families.',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Dr. Elena Vasquez',
    role: 'Family Medicine Physician',
    specialty: 'Adolescent health, geriatric care, nutrition',
    description: 'Dr. Vasquez takes a holistic approach to family medicine, integrating nutrition and lifestyle medicine into her treatment plans for patients of every generation.',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face',
  },
]

export const insuranceList: InsuranceInfo[] = [
  { name: 'Blue Cross Blue Shield', accepted: true },
  { name: 'Cigna', accepted: true },
  { name: 'Aetna', accepted: true },
  { name: 'UnitedHealthcare', accepted: true },
  { name: 'Providence Health Plan', accepted: true },
  { name: 'Medicare & Medicare Advantage', accepted: true },
  { name: 'Oregon Health Plan (OHP)', accepted: true },
  { name: 'Kaiser Permanente', accepted: false },
]

export const experienceItems: PatientExperienceItem[] = [
  {
    title: 'Online Forms',
    description: 'Complete all intake paperwork from your phone before your visit. No clipboards, no waiting room delays.',
    icon: 'phone',
  },
  {
    title: 'Appointment Reminders',
    description: 'Get text and email reminders 48 hours and 2 hours before your visit. Easy one-tap reschedule if plans change.',
    icon: 'bell',
  },
  {
    title: 'Same-Day Follow-Up',
    description: 'Test results and follow-up messages within 24 hours. Message your provider directly through the patient portal.',
    icon: 'chat',
  },
  {
    title: 'Patient Portal',
    description: 'Access your medical records, request prescription refills, and communicate with your care team anytime online.',
    icon: 'lock',
  },
]
