import { motion } from 'framer-motion';
import { menuCourses, pricePerPerson, winePairingPrice, signaturePlates, privateDiningOptions, hours, heroImage, mapImage } from './data';

/* ── SVG Icons ── */
function IconStar({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
function IconPhone({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function IconMail({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}
function IconLocation({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function IconCheck({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function IconArrowDown({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="19 12 12 19 5 12" />
    </svg>
  );
}
function IconQuote({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
    </svg>
  );
}

const easeOutCubic = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOutCubic, delay: i * 0.1 },
  }),
};

const lineReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const, delay: i * 0.15 },
  }),
};

function SectionHeading({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`font-serif text-3xl md:text-5xl text-ivory leading-tight ${className}`}>
      {children}
    </h2>
  );
}

function SectionDivider() {
  return <div className="w-12 h-px bg-brass-muted mx-auto my-16" />;
}

// Nav
function Nav() {
  const links = ['Philosophy', 'Menu', 'Gallery', 'Reservations'];
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
        <span className="font-serif text-lg text-ivory tracking-wide">Nocturne Table</span>
        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-sm text-ivory/70 hover:text-ivory uppercase tracking-[0.2em] transition-colors duration-300">
              {l}
            </a>
          ))}
          <a href="#reserve" className="text-sm text-brass uppercase tracking-[0.2em] hover:text-ivory transition-colors duration-300 border border-brass/40 px-5 py-2">
            Reserve
          </a>
        </div>
      </div>
    </nav>
  );
}

// Hero
function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background image placeholder */}
      <div className="absolute inset-0 bg-gradient-to-b from-espresso via-espresso/95 to-espresso" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/60 to-espresso/30" />

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-brass uppercase tracking-[0.35em] text-xs md:text-sm mb-6"
        >
          Fine Dining · Reservation Only
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-ivory leading-tight mb-6"
        >
          A quieter kind<br />of dining.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-warm-gray text-lg md:text-xl max-w-xl mx-auto mb-10 font-light leading-relaxed"
        >
          Seasonal tasting menus, intimate service, and an atmosphere designed for conversation.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#reserve" className="bg-brass text-espresso px-8 py-3 text-sm uppercase tracking-[0.25em] font-medium hover:bg-ivory transition-all duration-500">
            Reserve a Table
          </a>
          <a href="#menu" className="text-ivory/70 hover:text-ivory px-8 py-3 text-sm uppercase tracking-[0.25em] border border-ivory/20 hover:border-ivory/50 transition-all duration-500">
            View Menu
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
          <IconArrowDown className="w-4 h-4 text-brass/60" />
      </motion.div>
    </section>
  );
}

// Philosophy
function Philosophy() {
  return (
    <section id="philosophy" className="py-24 md:py-32 px-6 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="space-y-6"
        >
          <p className="text-brass uppercase tracking-[0.3em] text-xs">Our Philosophy</p>
          <SectionHeading>
            Slow food,<br />calm hospitality.
          </SectionHeading>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          custom={1}
          className="space-y-6 text-warm-gray leading-relaxed font-light"
        >
          <p>
            Nocturne Table was born from a belief that dining should feel unhurried. We work directly with small farms, foragers, and fisheries within a hundred-mile radius — not because it's fashionable, but because food that travels less simply tastes more like itself.
          </p>
          <p>
            Our kitchen follows the rhythm of the season. When a crop finishes, it leaves the menu without ceremony. When something new appears, we build a dish around it. This is not a philosophy we advertise on the menu — it is simply how we cook.
          </p>
        </motion.div>
      </div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeUp}
        className="mt-16 md:mt-24 border-l-2 border-brass/30 pl-6 md:pl-10"
      >
        <IconQuote className="w-8 h-8 text-brass/50 mb-2" />
        <p className="font-serif text-2xl md:text-3xl text-ivory/90 italic leading-relaxed max-w-3xl">
          "The best ingredient is patience. A meal cooked in haste has already failed before it reaches the table."
        </p>
        <p className="mt-4 text-sm text-warm-gray uppercase tracking-[0.2em]">— Chef Daniel Marais</p>
      </motion.div>
    </section>
  );
}

// Tasting Menu
function TastingMenu() {
  return (
    <section id="menu" className="py-24 md:py-32 px-6 bg-espresso/80 border-t border-both border-charcoal">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <p className="text-brass uppercase tracking-[0.3em] text-xs mb-4">The Tasting Menu</p>
          <SectionHeading>An evening in ten courses</SectionHeading>
          <p className="text-warm-gray mt-4 font-light">
            ${pricePerPerson} per person · ${winePairingPrice} wine pairing
          </p>
        </motion.div>

        <div className="space-y-1">
          {menuCourses.map((item, i) => (
            <motion.div
              key={item.course}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={lineReveal}
              custom={i}
              className="group flex items-start gap-4 md:gap-8 py-4 md:py-5 border-b border-charcoal hover:border-brass/20 transition-colors duration-500"
            >
              <span className="text-brass/60 text-xs uppercase tracking-[0.25em] min-w-[90px] md:min-w-[120px] pt-0.5 font-sans">
                {item.course}
              </span>
              <span className="text-ivory/80 font-light leading-relaxed">
                {item.description}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Signature Plates
function SignaturePlates() {
  const sizeClasses: Record<string, string> = {
    large: 'md:col-span-2 md:row-span-2',
    medium: 'md:col-span-1 md:row-span-1',
    small: 'md:col-span-1 md:row-span-1',
  };

  return (
    <section id="gallery" className="py-24 md:py-32 px-6 max-w-6xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="text-center mb-16"
      >
        <p className="text-brass uppercase tracking-[0.3em] text-xs mb-4">
          <IconStar className="w-3 h-3 inline-block -mt-0.5 mr-1.5 text-brass" />
          Signature Plates
        </p>
        <SectionHeading>Dishes that define us</SectionHeading>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 md:gap-6">
        {signaturePlates.map((plate, i) => (
          <motion.div
            key={plate.name}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={i}
            className={`group relative overflow-hidden bg-charcoal/50 ${sizeClasses[plate.size]} min-h-[200px] md:min-h-[280px]`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/30 to-transparent opacity-60" />
            <div className="relative z-10 p-6 md:p-8 flex flex-col justify-end h-full">
              <span className="text-brass/70 text-xs uppercase tracking-[0.25em] mb-2">
                {plate.label}
              </span>
              <h3 className="font-serif text-xl md:text-2xl text-ivory mb-2">{plate.name}</h3>
              <p className="text-warm-gray text-sm font-light max-w-xs">{plate.ingredients}</p>
            </div>
            <div
              className="absolute inset-0 opacity-10 group-hover:opacity-25 transition-opacity duration-700"
              style={{
                backgroundImage: `url(${plate.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// Private Dining
function PrivateDining() {
  return (
    <section className="py-24 md:py-32 px-6 bg-charcoal/30 border-t border-charcoal">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <p className="text-brass uppercase tracking-[0.3em] text-xs mb-4">Private Dining</p>
          <SectionHeading>Host your evening with us</SectionHeading>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {privateDiningOptions.map((opt, i) => (
            <motion.div
              key={opt.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
              className="border border-charcoal p-6 md:p-8 hover:border-brass/30 transition-colors duration-500"
            >
              <p className="text-brass text-3xl font-serif mb-1">{opt.capacity}</p>
              <p className="text-xs uppercase tracking-[0.25em] text-warm-gray mb-4">Guests</p>
              <h3 className="font-serif text-lg text-ivory mb-3">{opt.name}</h3>
              <p className="text-warm-gray text-sm font-light leading-relaxed">{opt.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mt-12"
        >
          <a href="#reserve" className="inline-block text-brass hover:text-ivory text-sm uppercase tracking-[0.25em] border border-brass/40 hover:border-ivory/40 px-8 py-3 transition-all duration-500">
            Inquire About Events
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// Reservation Experience
function ReservationExperience() {
  return (
    <section id="reservations" className="py-24 md:py-32 px-6 max-w-4xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="text-center mb-16"
      >
        <p className="text-brass uppercase tracking-[0.3em] text-xs mb-4">The Experience</p>
        <SectionHeading>What to expect when you dine</SectionHeading>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        {[
          { title: "Dress Code", desc: "Smart casual to formal. Jackets recommended but not required. No athletic wear.", icon: "star" },
          { title: "Timing", desc: "Reservations are held for 15 minutes past the booked time. We recommend arriving 10 minutes early for a pre-dinner drink.", icon: "check" },
          { title: "Cancellation", desc: "Please notify us at least 24 hours in advance. Late cancellations may incur a fee of $75 per person.", icon: "phone" },
          { title: "Parking & Valet", desc: "Complimentary valet parking is available. We also recommend ride-hailing for evening reservations.", icon: "location" },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={i}
          >
            <h3 className="text-xs uppercase tracking-[0.25em] text-brass mb-3">
              <span className="inline-block w-4 h-4 mr-2 align-middle text-brass/70">
                {item.icon === 'star' ? <IconStar className="w-full h-full" /> :
                 item.icon === 'check' ? <IconCheck className="w-full h-full" /> :
                 item.icon === 'phone' ? <IconPhone className="w-full h-full" /> :
                 item.icon === 'location' ? <IconLocation className="w-full h-full" /> : null}
              </span>
              {item.title}
            </h3>
            <p className="text-warm-gray font-light leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// Location & Hours
function LocationHours() {
  return (
    <section className="py-24 md:py-32 px-6 bg-charcoal/30 border-t border-charcoal">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <p className="text-brass uppercase tracking-[0.3em] text-xs mb-4">Location & Hours</p>
          <SectionHeading>Find us</SectionHeading>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="h-64 md:h-80 overflow-hidden border border-charcoal">
              <img
                src={mapImage}
                alt="Map showing Nocturne Table location at 47 Thames Street, London"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-4 text-warm-gray text-sm font-light text-center">
              Enter through the unmarked black door beside the bookshop.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
            className="space-y-4"
          >
            {Object.entries(hours).map(([day, time]) => (
              <div key={day} className="flex justify-between py-3 border-b border-charcoal">
                <span className="text-ivory/70 text-sm">{day}</span>
                <span className={`text-sm font-light ${time === 'Closed' ? 'text-brass/50' : 'text-warm-gray'}`}>
                  {time}
                </span>
              </div>
            ))}
            <p className="mt-6 text-xs text-warm-gray uppercase tracking-[0.2em]">
              Last seating 30 minutes before close
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Final CTA
function FinalCTA() {
  return (
    <section id="reserve" className="py-24 md:py-32 px-6 max-w-3xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="text-center mb-12"
      >
        <SectionHeading className="text-4xl md:text-6xl">Reserve the evening.</SectionHeading>
        <p className="text-warm-gray mt-4 font-light">
          We look forward to hosting you.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={1}
        className="border border-charcoal p-8 md:p-12 space-y-6"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-[0.25em] text-warm-gray mb-2">Name</label>
            <input type="text" className="w-full bg-transparent border border-charcoal px-4 py-3 text-ivory text-sm focus:outline-none focus:border-brass/50 transition-colors placeholder-warm-gray/30" placeholder="Your name" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-[0.25em] text-warm-gray mb-2">Email</label>
            <input type="email" className="w-full bg-transparent border border-charcoal px-4 py-3 text-ivory text-sm focus:outline-none focus:border-brass/50 transition-colors placeholder-warm-gray/30" placeholder="you@example.com" />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-[0.25em] text-warm-gray mb-2">Date</label>
            <input type="text" className="w-full bg-transparent border border-charcoal px-4 py-3 text-ivory text-sm focus:outline-none focus:border-brass/50 transition-colors placeholder-warm-gray/30" placeholder="MM/DD/YYYY" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-[0.25em] text-warm-gray mb-2">Guests</label>
            <input type="text" className="w-full bg-transparent border border-charcoal px-4 py-3 text-ivory text-sm focus:outline-none focus:border-brass/50 transition-colors placeholder-warm-gray/30" placeholder="2" />
          </div>
        </div>
        <div>
          <label className="block text-xs uppercase tracking-[0.25em] text-warm-gray mb-2">Special Requests</label>
          <textarea className="w-full bg-transparent border border-charcoal px-4 py-3 text-ivory text-sm focus:outline-none focus:border-brass/50 transition-colors placeholder-warm-gray/30 h-20" placeholder="Dietary restrictions, celebrations..." />
        </div>
        <button className="w-full bg-brass text-espresso py-3 text-sm uppercase tracking-[0.25em] font-medium hover:bg-ivory transition-all duration-500">
          Request Reservation
        </button>
        <p className="text-xs text-warm-gray/50 text-center">
          We'll confirm within 24 hours. No payment required to reserve.
        </p>
      </motion.div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-charcoal">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="font-serif text-lg text-ivory">Nocturne Table</p>
          <p className="text-warm-gray text-xs mt-1 flex items-center justify-center md:justify-start gap-1.5">
            <IconLocation className="w-3 h-3 text-brass/60" />
            47 Thames Street, London
          </p>
          <p className="text-warm-gray text-xs mt-1 flex items-center justify-center md:justify-start gap-1.5">
            <IconPhone className="w-3 h-3 text-brass/60" />
            +44 20 7946 0958
          </p>
          <p className="text-warm-gray text-xs mt-1 flex items-center justify-center md:justify-start gap-1.5">
            <IconMail className="w-3 h-3 text-brass/60" />
            reserve@nocturnetable.com
          </p>
        </div>
        <div className="flex items-center gap-8 text-xs text-warm-gray uppercase tracking-[0.2em]">
          <a href="#" className="hover:text-ivory transition-colors">Instagram</a>
          <a href="#" className="hover:text-ivory transition-colors">Press</a>
          <a href="#" className="hover:text-ivory transition-colors">Careers</a>
        </div>
        <p className="text-xs text-warm-gray/40">
          © 2026 Nocturne Table
        </p>
      </div>
    </footer>
  );
}

// Main App
export default function App() {
  return (
    <div className="min-h-screen bg-espresso text-ivory font-sans antialiased">
      <Nav />
      <Hero />
      <SectionDivider />
      <Philosophy />
      <TastingMenu />
      <SignaturePlates />
      <PrivateDining />
      <ReservationExperience />
      <LocationHours />
      <FinalCTA />
      <Footer />
    </div>
  );
}
