import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  type StayProperty,
  type GuestFeature,
  type OwnerFeature,
  type ProcessStep,
  siteInfo,
  featuredStays,
  guestFeatures,
  ownerFeatures,
  processSteps,
  galleryImages,
} from './data';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6 },
};

const stagger = {
  initial: { opacity: 0 },
  whileInView: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
  viewport: { once: true, margin: '-50px' },
};

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
};

function Navbar({
  scrolled,
  mobileOpen,
  onToggle,
}: {
  scrolled: boolean;
  mobileOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-terracotta rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div>
              <span className="font-bold text-lg text-soft-black">StayVista</span>
              <span className="text-sm text-gray-400 block leading-tight">Homes</span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {['Stays', 'Guests', 'Owners', 'Revenue', 'Gallery', 'Process', 'Contact'].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`text-sm font-medium transition-colors ${
                    scrolled
                      ? 'text-gray-600 hover:text-terracotta'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {item}
                </a>
              ),
            )}
          </div>

          <button
            onClick={onToggle}
            className={`lg:hidden p-2 transition-colors ${
              scrolled ? 'text-soft-black' : 'text-white'
            }`}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-1">
            {['Stays', 'Guests', 'Owners', 'Revenue', 'Gallery', 'Process', 'Contact'].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block text-gray-600 hover:text-terracotta hover:bg-warm-white px-3 py-2 rounded-lg transition-colors"
                  onClick={onToggle}
                >
                  {item}
                </a>
              ),
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop"
          alt="Luxury home"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-soft-black/80 via-soft-black/50 to-transparent" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <motion.div {...fadeInUp}>
          <span className="text-terracotta-light font-semibold text-sm tracking-[0.2em] uppercase">
            Short-Term Rental Property Management
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mt-4 leading-tight max-w-3xl">
            {siteInfo.tagline}
          </h1>
          <p className="text-gray-200 text-lg sm:text-xl mt-6 max-w-2xl leading-relaxed">
            {siteInfo.description}
          </p>
          <div className="flex flex-wrap gap-4 mt-10">
            <a
              href="#contact"
              className="bg-terracotta hover:bg-terracotta-light text-white px-8 py-3.5 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              List Your Property
            </a>
            <a
              href="#stays"
              className="border border-white/30 hover:border-white/50 text-white px-8 py-3.5 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-0.5"
            >
              Browse Stays
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StaysSection({ items }: { items: StayProperty[] }) {
  return (
    <section id="stays" className="py-24 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <span className="text-terracotta font-semibold text-sm tracking-[0.2em] uppercase">
            Featured Stays
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-soft-black mt-3">
            Exceptional Properties
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
            From alpine cabins to coastal villas — each home is handpicked for quality, character,
            and comfort.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((stay, i) => (
            <motion.div
              key={stay.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className="h-52 overflow-hidden relative">
                <img
                  src={stay.image}
                  alt={stay.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-bold text-soft-black px-2.5 py-1 rounded-full">
                  {stay.type}
                </div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-xs font-bold text-terracotta px-2.5 py-1 rounded-full">
                  {'\u2605'} {stay.rating}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-soft-black group-hover:text-terracotta transition-colors">
                  {stay.title}
                </h3>
                <p className="text-sm text-gray-400 mt-1">{stay.location}</p>
                <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                  <span>{stay.bedrooms} bed</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full" />
                  <span>Up to {stay.capacity} guests</span>
                </div>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-xl font-bold text-deep-green">
                    ${stay.nightlyRate.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-400">/ night</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {stay.tags.slice(0, 3).map((tag, j) => (
                    <span
                      key={j}
                      className="text-xs bg-sage text-deep-green px-2 py-0.5 rounded-full"
                    >
                      {tag}
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

function GuestsSection({ features }: { features: GuestFeature[] }) {
  return (
    <section id="guests" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <span className="text-terracotta font-semibold text-sm tracking-[0.2em] uppercase">
            For Guests
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-soft-black mt-3">
            Stay with Confidence
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
            Every detail is handled so you can focus on making memories.
          </p>
        </motion.div>
        <motion.div {...stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={cardVariants}
              className="text-center p-6 rounded-xl hover:bg-warm-white transition-colors"
            >
              <span className="text-5xl">{f.icon}</span>
              <h3 className="text-lg font-bold text-soft-black mt-4">{f.title}</h3>
              <p className="text-gray-500 mt-2 leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function OwnersSection({ features }: { features: OwnerFeature[] }) {
  return (
    <section id="owners" className="py-24 bg-deep-green text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <span className="text-terracotta-light font-semibold text-sm tracking-[0.2em] uppercase">
            For Owners
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3">
            Your Property, Professionally Managed
          </h2>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto leading-relaxed">
            Maximize your rental income while we handle the operations. Transparent reporting, no
            surprises.
          </p>
        </motion.div>
        <motion.div {...stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={cardVariants}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/15 transition-colors"
            >
              <span className="text-4xl">{f.icon}</span>
              <h3 className="text-lg font-bold mt-4">{f.title}</h3>
              <p className="text-gray-300 mt-2 leading-relaxed text-sm">{f.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function RevenuePreview() {
  const [nights, setNights] = useState(20);
  const [rate, setRate] = useState(400);

  const monthlyGross = nights * rate;
  const managementFee = monthlyGross * 0.2;
  const monthlyNet = monthlyGross - managementFee;
  const annualNet = monthlyNet * 12;

  return (
    <section id="revenue" className="py-24 bg-warm-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center mb-12">
          <span className="text-terracotta font-semibold text-sm tracking-[0.2em] uppercase">
            Revenue Preview
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-soft-black mt-3">
            Estimate Your Earnings
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
            Adjust the sliders to see what your property could earn with StayVista management.
          </p>
        </motion.div>
        <motion.div
          {...fadeInUp}
          className="bg-white rounded-2xl shadow-sm p-8 md:p-10"
        >
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-soft-black">
                    Booked Nights / Month
                  </label>
                  <span className="text-xl font-bold text-terracotta">{nights}</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={30}
                  value={nights}
                  onChange={(e) => setNights(Number(e.target.value))}
                  className="w-full h-2 bg-sage rounded-full appearance-none cursor-pointer accent-terracotta"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>5</span>
                  <span>30</span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-soft-black">
                    Avg. Nightly Rate
                  </label>
                  <span className="text-xl font-bold text-terracotta">
                    ${rate.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={1500}
                  step={25}
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full h-2 bg-sage rounded-full appearance-none cursor-pointer accent-terracotta"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>$100</span>
                  <span>$1,500</span>
                </div>
              </div>
            </div>
            <div className="bg-sage/50 rounded-xl p-6 space-y-4">
              <div>
                <p className="text-sm text-gray-500">Monthly Gross Revenue</p>
                <p className="text-2xl font-bold text-soft-black">
                  ${monthlyGross.toLocaleString()}
                </p>
              </div>
              <div className="border-t border-sage pt-4">
                <p className="text-sm text-gray-500">Management Fee (20%)</p>
                <p className="text-lg font-semibold text-terracotta">
                  -${managementFee.toLocaleString()}
                </p>
              </div>
              <div className="border-t border-sage pt-4">
                <p className="text-sm text-gray-500">Your Monthly Net</p>
                <p className="text-3xl font-bold text-deep-green">
                  ${monthlyNet.toLocaleString()}
                </p>
              </div>
              <div className="pt-2">
                <p className="text-xs text-gray-400">
                  Projected Annual Net:{' '}
                  <span className="font-bold text-deep-green">
                    ${annualNet.toLocaleString()}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center mb-12">
          <span className="text-terracotta font-semibold text-sm tracking-[0.2em] uppercase">
            Experience Gallery
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-soft-black mt-3">
            A Glimpse Inside
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
            Every StayVista property is photographed to capture the feeling of being there.
          </p>
        </motion.div>
        <motion.div {...stagger} className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className={`overflow-hidden rounded-xl ${
                i === 0 ? 'row-span-2 col-span-2' : ''
              }`}
            >
              <img
                src={img}
                alt={`Property ${i + 1}`}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 cursor-pointer"
                loading="lazy"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProcessSection({ steps }: { steps: ProcessStep[] }) {
  return (
    <section id="process" className="py-24 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <span className="text-terracotta font-semibold text-sm tracking-[0.2em] uppercase">
            Management Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-soft-black mt-3">
            From Onboard to Revenue
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
            A streamlined process designed to get your property earning — fast.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-5 gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative text-center"
            >
              <div className="w-14 h-14 bg-terracotta text-white rounded-2xl flex items-center justify-center text-xl font-bold mx-auto shadow-md">
                {step.step}
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-7 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-terracotta/20" />
              )}
              <h3 className="text-lg font-bold text-soft-black mt-4">{step.title}</h3>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  const [formType, setFormType] = useState<'guest' | 'owner'>('guest');
  const [guestForm, setGuestForm] = useState({ name: '', email: '', destination: '', dates: '' });
  const [ownerForm, setOwnerForm] = useState({
    name: '',
    email: '',
    propertyType: '',
    location: '',
  });

  const handleGuestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Production form handling
  };

  const handleOwnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Production form handling
  };

  const updateGuest = (field: string, value: string) => {
    setGuestForm((prev) => ({ ...prev, [field]: value }));
  };

  const updateOwner = (field: string, value: string) => {
    setOwnerForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-24 bg-soft-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">Get in Touch</h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto leading-relaxed">
            Whether you are looking for your next getaway or ready to list your property, we are here
            to help.
          </p>
        </motion.div>
        <motion.div {...fadeInUp} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8">
          <div className="flex border-b border-white/10 mb-8">
            <button
              onClick={() => setFormType('guest')}
              className={`flex-1 pb-4 text-sm font-semibold transition-colors ${
                formType === 'guest'
                  ? 'text-terracotta border-b-2 border-terracotta'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              I am a Guest
            </button>
            <button
              onClick={() => setFormType('owner')}
              className={`flex-1 pb-4 text-sm font-semibold transition-colors ${
                formType === 'owner'
                  ? 'text-terracotta border-b-2 border-terracotta'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              I am an Owner
            </button>
          </div>

          {formType === 'guest' ? (
            <form onSubmit={handleGuestSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={guestForm.name}
                  onChange={(e) => updateGuest('name', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-terracotta-light transition-all"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={guestForm.email}
                  onChange={(e) => updateGuest('email', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-terracotta-light transition-all"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="Destination"
                  value={guestForm.destination}
                  onChange={(e) => updateGuest('destination', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-terracotta-light transition-all"
                />
                <input
                  type="text"
                  placeholder="Travel Dates"
                  value={guestForm.dates}
                  onChange={(e) => updateGuest('dates', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-terracotta-light transition-all"
                />
              </div>
              <button
                type="submit"
                className="bg-terracotta hover:bg-terracotta-light text-white px-10 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Find My Stay
              </button>
            </form>
          ) : (
            <form onSubmit={handleOwnerSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={ownerForm.name}
                  onChange={(e) => updateOwner('name', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-terracotta-light transition-all"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={ownerForm.email}
                  onChange={(e) => updateOwner('email', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-terracotta-light transition-all"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <select
                  value={ownerForm.propertyType}
                  onChange={(e) => updateOwner('propertyType', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-terracotta-light transition-all"
                >
                  <option value="" className="bg-soft-black text-gray-400">
                    Property Type
                  </option>
                  <option value="villa" className="bg-soft-black text-white">
                    Villa
                  </option>
                  <option value="cabin" className="bg-soft-black text-white">
                    Cabin
                  </option>
                  <option value="apartment" className="bg-soft-black text-white">
                    Apartment
                  </option>
                  <option value="beach" className="bg-soft-black text-white">
                    Beach Home
                  </option>
                </select>
                <input
                  type="text"
                  placeholder="Property Location"
                  value={ownerForm.location}
                  onChange={(e) => updateOwner('location', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-terracotta-light transition-all"
                />
              </div>
              <button
                type="submit"
                className="bg-terracotta hover:bg-terracotta-light text-white px-10 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get Management Quote
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-soft-black border-t border-white/5 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-terracotta rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">S</span>
            </div>
            <div>
              <p className="font-bold text-white">StayVista Homes</p>
              <p className="text-sm">Beautiful Stays, Managed Properly</p>
            </div>
          </div>
          <div className="flex gap-8 text-sm">
            <a href="#stays" className="hover:text-terracotta transition-colors">
              Browse
            </a>
            <a href="#owners" className="hover:text-terracotta transition-colors">
              List Property
            </a>
            <a href="#contact" className="hover:text-terracotta transition-colors">
              Contact
            </a>
          </div>
        </div>
        <div className="border-t border-white/5 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} StayVista Homes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-soft-black font-sans antialiased">
      <Navbar scrolled={scrolled} mobileOpen={mobileOpen} onToggle={() => setMobileOpen((v) => !v)} />
      <HeroSection />
      <StaysSection items={featuredStays} />
      <GuestsSection features={guestFeatures} />
      <OwnersSection features={ownerFeatures} />
      <RevenuePreview />
      <GallerySection />
      <ProcessSection steps={processSteps} />
      <CtaSection />
      <Footer />
    </div>
  );
}
