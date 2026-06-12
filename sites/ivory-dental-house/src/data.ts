export const studio = {
  name: 'Ivory Dental House',
  tagline: 'A calmer way to redesign your smile.',
  subtitle: 'Cosmetic dentistry reimagined as a premium wellness experience. No clinical coldness — just thoughtful care, precise artistry, and a space designed around your comfort.',
  cta: 'Begin Your Smile Consultation',
  phone: '+44 (0)20 7946 0958',
  email: 'hello@ivorydentalhouse.com',
  address: '14 Montague Street, Marylebone, London W1U',
};

export const journeySteps = [
  {
    number: '01',
    title: 'Consultation',
    description: 'A unhurried conversation about your goals, concerns, and vision. We listen before we examine.',
    duration: '60 min',
  },
  {
    number: '02',
    title: 'Digital Scans & Photography',
    description: 'High-resolution 3D imaging and facial photography capture every detail of your current smile.',
    duration: '45 min',
  },
  {
    number: '03',
    title: 'Smile Design Plan',
    description: 'Our team crafts a bespoke treatment roadmap, balancing aesthetics, function, and longevity.',
    duration: '1 week',
  },
  {
    number: '04',
    title: 'Digital Preview',
    description: 'See your future smile before treatment begins. Adjust proportions, shape, and shade together.',
    duration: '30 min',
  },
  {
    number: '05',
    title: 'Treatment',
    description: 'Precision work in our calm studio environment. Paced to your comfort, never rushed.',
    duration: 'Varies',
  },
  {
    number: '06',
    title: 'Follow-up & Care',
    description: 'Ongoing support, refinements, and maintenance to protect your investment for years ahead.',
    duration: 'Ongoing',
  },
];

export const treatments = [
  {
    name: 'Professional Whitening',
    category: 'Aesthetic',
    description: 'Chairside and take-home systems that lift stains gently, preserving enamel integrity.',
    from: '£450',
    sessions: '1–3 visits',
    icon: 'sparkle',
  },
  {
    name: 'Porcelain Veneers',
    category: 'Restorative',
    description: 'Ultra-thin ceramic shells sculpted to your facial proportions. Minimal preparation, maximum transformation.',
    from: '£850 per unit',
    sessions: '2–3 visits',
    icon: 'layers',
  },
  {
    name: 'Dental Implants',
    category: 'Surgical',
    description: 'Titanium-free zirconia implants for a natural, biocompatible foundation. Single tooth or full arch.',
    from: '£2,400',
    sessions: '3–6 months',
    icon: 'anchor',
  },
  {
    name: 'Clear Aligners',
    category: 'Orthodontic',
    description: 'Discreet tooth movement with custom-milled aligners. Predictable, comfortable, virtually invisible.',
    from: '£3,200',
    sessions: '6–18 months',
    icon: 'align',
  },
  {
    name: 'Composite Bonding',
    category: 'Aesthetic',
    description: 'Artistic resin sculpting to close gaps, reshape edges, and restore chipped teeth in a single visit.',
    from: '£350',
    sessions: '1 visit',
    icon: 'brush',
  },
  {
    name: 'Hygiene & Prevention',
    category: 'Maintenance',
    description: 'Gentle scaling, polishing, and personalized home-care guidance. The foundation of lasting results.',
    from: '£150',
    sessions: 'Every 3–6 months',
    icon: 'shield',
  },
  {
    name: 'Emergency Care',
    category: 'Urgent',
    description: 'Same-day appointments for trauma, pain, or sudden aesthetic concerns. We hold space for you.',
    from: 'From £180',
    sessions: 'Same day',
    icon: 'heart',
  },
];

export const comfortFeatures = [
  {
    title: 'Anxiety-Conscious Care',
    description: 'Sedation options, noise-cancelling headphones, weighted blankets, and a team trained in trauma-informed communication.',
    icon: 'calm',
  },
  {
    title: 'Transparent Pricing',
    description: 'Itemized quotes before any treatment. No surprises, no pressure. Finance options discussed openly.',
    icon: 'clear',
  },
  {
    title: 'Appointment Pacing',
    description: 'Longer appointment slots mean no rushing. Complex cases split across comfortable visits. Your pace, always.',
    icon: 'clock',
  },
  {
    title: 'Private Treatment Rooms',
    description: 'Every procedure in its own calm space. Soft lighting, curated soundscapes, and complete privacy.',
    icon: 'room',
  },
];

export const beforeAfterCases = [
  {
    id: 1,
    title: 'Full Smile Makeover',
    description: 'Six porcelain veneers with digital smile design. Closed diastema, reshaped laterals, unified shade.',
    treatment: 'Porcelain Veneers',
    duration: '3 visits over 4 weeks',
    beforeColor: '#d4c5b0',
    afterColor: '#faf6f0',
  },
  {
    id: 2,
    title: 'Whitening & Bonding',
    description: 'Professional whitening followed by composite bonding on two chipped incisors.',
    treatment: 'Whitening + Bonding',
    duration: '2 visits over 2 weeks',
    beforeColor: '#c9b89a',
    afterColor: '#f5f0e8',
  },
  {
    id: 3,
    title: 'Implant Restoration',
    description: 'Single zirconia implant replacing a missing lateral. Seamless integration with adjacent teeth.',
    treatment: 'Zirconia Implant',
    duration: '5 months healing + restoration',
    beforeColor: '#bfae96',
    afterColor: '#f8f4ee',
  },
];

export const financing = [
  {
    title: '0% Finance',
    description: 'Split treatments over 6–12 months interest-free. No hidden fees, quick approval.',
    detail: 'Available on treatments over £1,000',
  },
  {
    title: 'Extended Payment Plans',
    description: 'Up to 24 months with low monthly payments. Discuss during your consultation.',
    detail: 'From 4.9% APR representative',
  },
  {
    title: 'Insurance Coordination',
    description: 'We handle claims and paperwork for major dental insurance providers. Direct billing available.',
    detail: 'Bupa, AXA, Aviva, Denplan accepted',
  },
  {
    title: 'Membership Plan',
    description: 'Monthly membership covering hygiene, exams, and discounts on cosmetic treatments.',
    detail: 'From £45/month',
  },
];

export const consultationForm = {
  title: 'Begin Your Smile Journey',
  subtitle: 'Share a little about what you\'re hoping to achieve. We\'ll be in touch within 24 hours to arrange your consultation.',
  fields: [
    { name: 'name', label: 'Full Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone', label: 'Phone', type: 'tel', required: false },
    { name: 'interest', label: 'Primary Interest', type: 'select', required: false, options: ['Smile Makeover', 'Whitening', 'Veneers', 'Implants', 'Aligners', 'Not sure yet'] },
    { name: 'message', label: 'Tell us about your goals', type: 'textarea', required: false },
  ],
};

export const digitalPreview = {
  title: 'See Your Future Smile',
  subtitle: 'Before any treatment begins, you\'ll see a digital preview of your planned results. Adjust shape, proportion, and shade until it feels right.',
  steps: [
    '3D facial and dental scan',
    'AI-assisted smile simulation',
    'Collaborative refinement session',
    'Final treatment blueprint',
  ],
};
