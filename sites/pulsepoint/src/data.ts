export interface Treatment {
  title: string
  description: string
  icon: string
}

export interface VisitOption {
  title: string
  description: string
  badge?: string
}

export interface HowItWorksStep {
  step: string
  description: string
  icon: string
}

export interface Review {
  text: string
  author: string
  rating: number
}

export interface PricingItem {
  service: string
  price: string
}

export const siteInfo = {
  name: 'PulsePoint Urgent Care',
  tagline: 'Walk in today. Get seen fast.',
  description: 'No appointment needed. Minor injuries, illnesses, and testing — we\'re here when you need us, with real wait times you can trust.',
  phone: '(555) 876-5000',
  email: 'care@pulsepointurgent.com',
  address: '1880 Medical Plaza Drive, Portland, OR 97202',
  currentWaitTime: 14,
  hours: {
    'Monday – Friday': '7:00 AM – 9:00 PM',
    'Saturday': '8:00 AM – 8:00 PM',
    'Sunday': '9:00 AM – 6:00 PM',
  },
  social: {
    facebook: '#',
    twitter: '#',
  },
}

export const navLinks = [
  { label: 'Treatments', href: '#treatments' },
  { label: 'Visit Options', href: '#visit' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Hours', href: '#hours' },
  { label: 'Reviews', href: '#reviews' },
]

export const treatments: Treatment[] = [
  {
    title: 'Flu & Fever',
    description: 'Rapid flu testing, fever management, and antiviral prescriptions for patients of all ages.',
    icon: '🤒',
  },
  {
    title: 'Sprains & Strains',
    description: 'Same-day evaluation for ankle, wrist, and knee injuries. Splinting, wrapping, and crutch fitting included.',
    icon: '🦵',
  },
  {
    title: 'Cuts & Minor Lacerations',
    description: 'Professional wound cleaning, butterfly strips, sutures, and tetanus shot updates.',
    icon: '🩹',
  },
  {
    title: 'Minor Burns',
    description: 'Assessment and treatment for first- and second-degree burns with aftercare instructions.',
    icon: '🔥',
  },
  {
    title: 'Ear & Sinus Infections',
    description: 'Diagnosis and treatment for earaches, sinus pressure, sore throats, and strep testing.',
    icon: '👂',
  },
  {
    title: 'Urinary Tract Infections',
    description: 'Fast UTI testing and antibiotic treatment. Results in minutes, not days.',
    icon: '🫧',
  },
  {
    title: 'COVID-19 & Strep Testing',
    description: 'Rapid antigen and PCR tests for COVID-19, plus strep and flu panels. Results while you wait.',
    icon: '🧪',
  },
  {
    title: 'Skin Rashes & Allergies',
    description: 'Evaluation of hives, poison ivy, bug bites, and allergic reactions with same-day relief.',
    icon: '🌿',
  },
]

export const visitOptions: VisitOption[] = [
  {
    title: 'Walk In Anytime',
    description: 'No appointment needed. Just show up during hours and we\'ll get you checked in and seen.',
    badge: 'No Wait List',
  },
  {
    title: 'Check In Online',
    description: 'Secure your spot from home. We\'ll text you when it\'s almost your turn so you can wait where you\'re comfortable.',
    badge: 'Free',
  },
  {
    title: 'Occupational Health',
    description: 'Employer-requested screenings, drug tests, DOT physicals, and workers\' comp evaluations.',
  },
  {
    title: 'Telehealth Visit',
    description: 'Virtual consultations for non-emergency concerns. Talk to a provider from your phone or computer.',
    badge: 'Coming Soon',
  },
]

export const howItWorksSteps: HowItWorksStep[] = [
  {
    step: 'Check In',
    description: 'Walk in or check in online to reserve your place. We\'ll show you the current wait time before you decide.',
    icon: '📱',
  },
  {
    step: 'Arrive & Get Triaged',
    description: 'A registered nurse will assess your symptoms quickly and prioritize based on urgency.',
    icon: '🏥',
  },
  {
    step: 'See a Provider',
    description: 'You\'ll be seen by one of our experienced providers — typically within minutes, not hours.',
    icon: '👨‍⚕️',
  },
  {
    step: 'Treatment & Follow-Up',
    description: 'Get your prescription, care instructions, and any referrals before you leave. We follow up the next day.',
    icon: '✅',
  },
]

export const pricingItems: PricingItem[] = [
  { service: 'Standard urgent care visit', price: '$150' },
  { service: 'Rapid strep / flu test', price: '$35' },
  { service: 'COVID-19 rapid test', price: '$25' },
  { service: 'Laceration repair (simple)', price: '$200' },
  { service: 'Splint / wrap application', price: '$75' },
  { service: 'Tetanus shot', price: '$45' },
  { service: 'Drug screening (urine)', price: '$85' },
  { service: 'DOT physical', price: '$110' },
]

export const acceptedInsurances = [
  'Aetna', 'Blue Cross Blue Shield', 'Cigna', 'Humana',
  'Medicare', 'Moda Health', 'Providence Health Plan',
  'UnitedHealthcare', 'Regence BlueShield',
  'Tricare', 'Kaiser Permanente (select plans)',
]

export const reviews: Review[] = [
  {
    text: 'I was in and out in 25 minutes with a prescription for my daughter\'s ear infection. The wait time online was accurate — I checked in from home and they texted me when to come in.',
    author: 'Michelle R.',
    rating: 5,
  },
  {
    text: 'Came in on a Saturday with a bad ankle sprain. The staff was fast, friendly, and got me fitted with a brace and crutches in under 40 minutes. Way better than sitting in an ER all day.',
    author: 'James T.',
    rating: 5,
  },
  {
    text: 'I don\'t have insurance and the posted prices made it easy to decide. They were upfront about everything and the care was excellent. Really appreciate the transparency.',
    author: 'Danielle K.',
    rating: 4,
  },
  {
    text: 'Needed a rapid COVID test before traveling. Walked in at 7:30 PM, had my result by 7:55. Couldn\'t ask for faster service. Will definitely come back.',
    author: 'Alex M.',
    rating: 5,
  },
]
