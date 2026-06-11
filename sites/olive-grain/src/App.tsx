import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { MenuItem, SeasonalSpecial, CateringPackage } from "./data";
import {
  menuCategories,
  seasonalSpecials,
  cateringPackages,
  cafeInfo,
  galleryImages,
} from "./data";

/* ------------------------------------------------------------------ */
/*  SVG Icon Components                                                */
/* ------------------------------------------------------------------ */
function IconClock({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
function IconMapPin({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function IconParking({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <text x="12" y="16" textAnchor="middle" fontSize="13" fontWeight="bold" fill="currentColor">P</text>
    </svg>
  );
}
function IconChair({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
      <path d="M6 12h.01M18 12h.01" />
      <rect x="4" y="5" width="16" height="7" rx="2" />
    </svg>
  );
}
function IconWifi({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.55a11 11 0 0114.08 0" />
      <path d="M1.42 9a16 16 0 0121.16 0" />
      <path d="M8.53 16.11a6 6 0 016.95 0" />
      <circle cx="12" cy="20" r="1" />
    </svg>
  );
}
function IconPaw({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="9" r="2.5" />
      <circle cx="18" cy="9" r="2.5" />
      <circle cx="9" cy="18" r="2" />
      <circle cx="15" cy="18" r="2" />
      <path d="M12 12c-1.5 0-3-1-3-2.5" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Scroll-reveal wrapper                                              */
/* ------------------------------------------------------------------ */
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Nav                                                                */
/* ------------------------------------------------------------------ */
function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#menu", label: "Menu" },
    { href: "#specials", label: "Specials" },
    { href: "#kitchen", label: "Our Kitchen" },
    { href: "#catering", label: "Catering" },
    { href: "#gallery", label: "Gallery" },
    { href: "#visit", label: "Visit" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-md border-b border-beige-dark">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <a
          href="#"
          className="font-serif text-xl font-semibold text-olive-dark tracking-tight"
        >
          Olive &amp; Grain
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-olive-dark">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-terracotta transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden p-2 text-olive-dark"
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden bg-cream border-t border-beige-dark"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex flex-col px-5 pb-5 pt-2 gap-3 text-sm font-medium text-olive-dark">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="hover:text-terracotta transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */
function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&h=1000&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
      </div>

      <div className="relative z-10 text-center px-5 max-w-2xl">
        <motion.p
          className="text-cream/80 text-sm md:text-base uppercase tracking-widest mb-4 font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Olive &amp; Grain
        </motion.p>
        <motion.h1
          className="text-cream text-4xl md:text-6xl lg:text-7xl leading-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Fresh plates,
          <br />
          slow mornings,
          <br />
          good coffee.
        </motion.h1>
        <motion.p
          className="text-cream/80 text-lg md:text-xl mb-10 max-w-lg mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          A warm neighborhood café serving Mediterranean bowls, flatbreads,
          brunch, and fresh juices — made with care, served with a smile.
        </motion.p>
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <a
            href="#menu"
            className="inline-block bg-terracotta hover:bg-terracotta-dark text-white font-semibold px-8 py-3 rounded-full transition-colors text-sm"
          >
            Explore Menu
          </a>
          <a
            href="#visit"
            className="inline-block bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold px-8 py-3 rounded-full border border-white/40 transition-colors text-sm"
          >
            Find Us
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Featured Menu — Tabbed                                             */
/* ------------------------------------------------------------------ */
function FeaturedMenu() {
  const [activeTab, setActiveTab] = useState(menuCategories[0].id);
  const activeItems =
    menuCategories.find((c) => c.id === activeTab)?.items ?? [];

  return (
    <section id="menu" className="py-20 md:py-28 bg-cream">
      <div className="max-w-6xl mx-auto px-5">
        <Reveal>
          <div className="text-center mb-12">
            <p className="text-terracotta font-semibold text-sm uppercase tracking-widest mb-2">
              From our kitchen
            </p>
            <h2 className="text-3xl md:text-4xl text-olive-dark mb-4">
              Featured Menu
            </h2>
            <p className="text-olive/70 max-w-lg mx-auto">
              Made fresh daily with seasonal ingredients and a little love.
            </p>
          </div>
        </Reveal>

        {/* Tabs */}
        <Reveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-1 mb-10">
            {menuCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeTab === cat.id
                    ? "bg-olive text-white shadow-md"
                    : "bg-beige text-olive-dark hover:bg-beige-dark"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Items grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeItems.map((item, idx) => (
              <MenuItemCard key={item.name} item={item} idx={idx} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function MenuItemCard({ item, idx }: { item: MenuItem; idx: number }) {
  return (
    <motion.div
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: idx * 0.08 }}
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Dietary labels */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {item.dietary.map((d) => (
            <span
              key={d}
              className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full ${
                d === "Vegan"
                  ? "bg-green-100 text-green-700"
                  : d === "Gluten-Free"
                    ? "bg-amber-100 text-amber-700"
                    : d === "Spicy"
                      ? "bg-red-100 text-red-600"
                      : "bg-blue-100 text-blue-600"
              }`}
            >
              {d}
            </span>
          ))}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-1.5">
          <h3 className="font-serif text-lg font-semibold text-olive-dark">
            {item.name}
          </h3>
          <span className="text-terracotta font-bold text-sm whitespace-nowrap ml-2">
            ${item.price}
          </span>
        </div>
        <p className="text-olive/70 text-sm leading-relaxed">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Seasonal Specials — Card Stack                                     */
/* ------------------------------------------------------------------ */
function SeasonalSpecials() {
  return (
    <section id="specials" className="py-20 md:py-28 bg-beige">
      <div className="max-w-6xl mx-auto px-5">
        <Reveal>
          <div className="text-center mb-12">
            <p className="text-terracotta font-semibold text-sm uppercase tracking-widest mb-2">
              Seasonal
            </p>
            <h2 className="text-3xl md:text-4xl text-olive-dark mb-4">
              Specials
            </h2>
            <p className="text-olive/70 max-w-lg mx-auto">
              Limited-time dishes crafted with the freshest ingredients of the
              season.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {seasonalSpecials.map((item, idx) => (
            <SpecialCard key={item.name} item={item} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SpecialCard({ item, idx }: { item: SeasonalSpecial; idx: number }) {
  return (
    <motion.div
      className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: idx * 0.12 }}
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4">
          <span className="inline-block bg-terracotta text-white text-xs font-semibold px-3 py-1 rounded-full">
            Available until {item.availableUntil}
          </span>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-serif text-xl font-semibold text-olive-dark">
            {item.name}
          </h3>
          <span className="text-terracotta font-bold whitespace-nowrap ml-2">
            ${item.price}
          </span>
        </div>
        <p className="text-olive/70 text-sm leading-relaxed flex-1">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Our Kitchen                                                        */
/* ------------------------------------------------------------------ */
const ingredientList = [
  "Organic farro & quinoa",
  "Cold-pressed olive oil",
  "House-made labneh",
  "Za'atar & sumac",
  "Local pasture-raised eggs",
  "Wood-fired flatbread",
];

function OurKitchen() {
  return (
    <section id="kitchen" className="py-20 md:py-28 bg-cream">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image side */}
          <Reveal>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=700&h=500&fit=crop"
                  alt="Our kitchen team preparing fresh food"
                  className="w-full h-80 md:h-96 object-cover"
                  loading="lazy"
                />
              </div>
              {/* Floating accent */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-terracotta/20 rounded-full blur-xl" />
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-olive-light/20 rounded-full blur-xl" />
            </div>
          </Reveal>

          {/* Text side */}
          <Reveal delay={0.15}>
            <div>
              <p className="text-terracotta font-semibold text-sm uppercase tracking-widest mb-2">
                Our Kitchen
              </p>
              <h2 className="text-3xl md:text-4xl text-olive-dark mb-6">
                Made from scratch, every day
              </h2>
              <div className="space-y-4 text-olive leading-relaxed">
                <p>
                  At Olive &amp; Grain, we start each morning by hand-chopping
                  vegetables, blending spices, and preparing our house sauces.
                  Every grain bowl is built to order. Every flatbread is
                  stretched and baked fresh. We believe the best food comes from
                  patience, quality ingredients, and a deep respect for
                  Mediterranean traditions.
                </p>
                <p>
                  Our kitchen is powered by relationships with local farms and
                  purveyors who share our values. We source organic grains,
                  pasture-raised eggs, and the finest cold-pressed olive oil
                  from small family producers. It&apos;s not the easy way — but it
                  tastes better, and you can tell.
                </p>
              </div>

              {/* Ingredient badges */}
              <div className="mt-8 flex flex-wrap gap-2">
                {ingredientList.map((ing) => (
                  <span
                    key={ing}
                    className="inline-block bg-beige text-olive-dark text-xs font-medium px-3.5 py-1.5 rounded-full border border-beige-dark"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Catering                                                           */
/* ------------------------------------------------------------------ */
function Catering() {
  return (
    <section id="catering" className="py-20 md:py-28 bg-beige">
      <div className="max-w-6xl mx-auto px-5">
        <Reveal>
          <div className="text-center mb-12">
            <p className="text-terracotta font-semibold text-sm uppercase tracking-widest mb-2">
              Catering
            </p>
            <h2 className="text-3xl md:text-4xl text-olive-dark mb-4">
              Let us bring the feast
            </h2>
            <p className="text-olive/70 max-w-lg mx-auto">
              Office lunches, weekend gatherings, brunch meetings — we handle
              the food so you can enjoy the company.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cateringPackages.map((pkg, idx) => (
            <CateringCard key={pkg.name} pkg={pkg} idx={idx} />
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="text-center mt-12">
            <a
              href="#contact"
              className="inline-block bg-terracotta hover:bg-terracotta-dark text-white font-semibold px-8 py-3 rounded-full transition-colors text-sm"
            >
              Inquire About Catering
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CateringCard({ pkg, idx }: { pkg: CateringPackage; idx: number }) {
  return (
    <motion.div
      className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow relative ${
        pkg.popular ? "ring-2 ring-terracotta" : ""
      }`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: idx * 0.1 }}
    >
      {pkg.popular && (
        <div className="absolute top-4 right-4 bg-terracotta text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
          Popular
        </div>
      )}
      <div className="p-6">
        <h3 className="font-serif text-lg font-semibold text-olive-dark mb-1">
          {pkg.name}
        </h3>
        <p className="text-olive/70 text-sm mb-3 leading-relaxed">
          {pkg.description}
        </p>
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-2xl font-bold text-terracotta">
            ${pkg.price}
          </span>
          <span className="text-sm text-olive/60">/ person</span>
        </div>
        <p className="text-xs text-olive/50 mb-3">
          Serves {pkg.serves}
        </p>
        <ul className="space-y-2">
          {pkg.items.map((item) => (
            <li
              key={item}
              className="text-sm text-olive flex items-start gap-2"
            >
              <svg
                className="w-4 h-4 text-olive-light mt-0.5 shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Café Moments — Gallery                                              */
/* ------------------------------------------------------------------ */
function CafeMoments() {
  return (
    <section id="gallery" className="py-20 md:py-28 bg-cream">
      <div className="max-w-6xl mx-auto px-5">
        <Reveal>
          <div className="text-center mb-12">
            <p className="text-terracotta font-semibold text-sm uppercase tracking-widest mb-2">
              Café Moments
            </p>
            <h2 className="text-3xl md:text-4xl text-olive-dark mb-4">
              A glimpse inside
            </h2>
            <p className="text-olive/70 max-w-lg mx-auto">
              Follow along @oliveandgrain for daily snapshots of life at the
              café.
            </p>
          </div>
        </Reveal>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {galleryImages.map((src, idx) => (
            <motion.div
              key={src}
              className="break-inside-avoid overflow-hidden rounded-2xl"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
            >
              <img
                src={src}
                alt={`Café moment ${idx + 1}`}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Visit Us                                                           */
/* ------------------------------------------------------------------ */
function VisitUs() {
  const renderIcon = (emoji: string) => {
    switch (emoji) {
      case "clock": return <IconClock className="w-6 h-6 text-terracotta" />;
      case "pin": return <IconMapPin className="w-6 h-6 text-terracotta" />;
      case "parking": return <IconParking className="w-6 h-6 text-terracotta" />;
      case "chair": return <IconChair className="w-6 h-6 text-terracotta" />;
      case "wifi": return <IconWifi className="w-6 h-6 text-terracotta" />;
      case "paw": return <IconPaw className="w-6 h-6 text-terracotta" />;
      default: return null;
    }
  };

  const details = [
    {
      icon: "clock",
      label: "Hours",
      content: (
        <>
          <p>Mon–Fri: {cafeInfo.hours.weekday}</p>
          <p>Sat–Sun: {cafeInfo.hours.weekend}</p>
        </>
      ),
    },
    {
      icon: "pin",
      label: "Address",
      content: <p>{cafeInfo.address}</p>,
    },
    {
      icon: "parking",
      label: "Parking",
      content: <p>{cafeInfo.parking}</p>,
    },
    {
      icon: "chair",
      label: "Seating",
      content: <p>{cafeInfo.seating}</p>,
    },
    {
      icon: "wifi",
      label: "Wi-Fi",
      content: <p>{cafeInfo.wifi}</p>,
    },
    {
      icon: "paw",
      label: "Pets",
      content: <p>{cafeInfo.petFriendly}</p>,
    },
  ];

  return (
    <section id="visit" className="py-20 md:py-28 bg-beige">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left — text + details */}
          <Reveal>
            <div>
              <p className="text-terracotta font-semibold text-sm uppercase tracking-widest mb-2">
                Visit Us
              </p>
              <h2 className="text-3xl md:text-4xl text-olive-dark mb-4">
                We&apos;d love to have you
              </h2>
              <p className="text-olive/70 mb-8 leading-relaxed">
                Whether you&apos;re stopping in for a morning latte, a long
                lunch with friends, or an evening flatbread and glass of wine —
                our door is open. No reservations needed, just come as you are.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {details.map((d) => (
                  <div
                    key={d.label}
                    className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <span className="text-xl mb-1 block">{renderIcon(d.icon)}</span>
                    <h4 className="font-semibold text-sm text-olive-dark mb-1">
                      {d.label}
                    </h4>
                    <div className="text-sm text-olive/70 leading-relaxed">
                      {d.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right — map placeholder */}
          <Reveal delay={0.15}>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm h-80 md:h-96 flex items-center justify-center">
              <div className="text-center p-6">
                <IconMapPin className="w-8 h-8 text-terracotta mx-auto mb-3" />
                <p className="font-serif text-lg text-olive-dark mb-2">
                  Olive &amp; Grain
                </p>
                <p className="text-sm text-olive/70 mb-3">
                  {cafeInfo.address}
                </p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(cafeInfo.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-olive hover:bg-olive-dark text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Contact CTA                                                        */
/* ------------------------------------------------------------------ */
function ContactCTA() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-cream">
      <div className="max-w-4xl mx-auto px-5">
        <Reveal>
          <div className="text-center mb-10">
            <p className="text-terracotta font-semibold text-sm uppercase tracking-widest mb-2">
              Get in touch
            </p>
            <h2 className="text-3xl md:text-4xl text-olive-dark mb-4">
              Catering or reservation inquiries
            </h2>
            <p className="text-olive/70 max-w-lg mx-auto">
              Planning an event, a group visit, or just want to say hello? Send
              us a message and we&apos;ll get back to you within 24 hours.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-8 md:p-10 shadow-sm max-w-xl mx-auto"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-olive-dark mb-1"
                >
                  Name *
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  className="w-full border border-beige-dark rounded-xl px-4 py-2.5 text-sm text-olive-dark bg-cream focus:outline-none focus:ring-2 focus:ring-olive-light"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-olive-dark mb-1"
                >
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full border border-beige-dark rounded-xl px-4 py-2.5 text-sm text-olive-dark bg-cream focus:outline-none focus:ring-2 focus:ring-olive-light"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div className="mb-5">
              <label
                htmlFor="inquiry"
                className="block text-sm font-medium text-olive-dark mb-1"
              >
                I&apos;m interested in *
              </label>
              <select
                id="inquiry"
                required
                className="w-full border border-beige-dark rounded-xl px-4 py-2.5 text-sm text-olive-dark bg-cream focus:outline-none focus:ring-2 focus:ring-olive-light appearance-none"
              >
                <option value="">Select one</option>
                <option value="catering">Catering</option>
                <option value="reservation">Reservation / Group Dining</option>
                <option value="private">Private Event</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-olive-dark mb-1"
              >
                Message *
              </label>
              <textarea
                id="message"
                required
                rows={4}
                className="w-full border border-beige-dark rounded-xl px-4 py-2.5 text-sm text-olive-dark bg-cream focus:outline-none focus:ring-2 focus:ring-olive-light resize-none"
                placeholder="Tell us about your event or question..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-terracotta hover:bg-terracotta-dark text-white font-semibold py-3 rounded-xl transition-colors text-sm"
            >
              {sent ? "✓ Message sent!" : "Send Message"}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */
function Footer() {
  return (
    <footer className="bg-olive-dark text-cream/80 py-12">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-xl font-semibold text-cream mb-3">
              Olive &amp; Grain
            </h3>
            <p className="text-sm leading-relaxed text-cream/60">
              Fresh plates, slow mornings, good coffee — since 2021.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-cream text-sm mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "#menu", label: "Menu" },
                { href: "#specials", label: "Specials" },
                { href: "#catering", label: "Catering" },
                { href: "#visit", label: "Visit Us" },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="hover:text-cream transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-semibold text-cream text-sm mb-3">Hours</h4>
            <ul className="space-y-1 text-sm text-cream/60">
              <li>Mon–Fri: {cafeInfo.hours.weekday}</li>
              <li>Sat–Sun: {cafeInfo.hours.weekend}</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-cream text-sm mb-3">Contact</h4>
            <ul className="space-y-1 text-sm text-cream/60">
              <li>{cafeInfo.phone}</li>
              <li>{cafeInfo.email}</li>
              <li>
                <a
                  href={cafeInfo.social.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cream transition-colors"
                >
                  {cafeInfo.social.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-olive/40 pt-6 text-center text-xs text-cream/50">
          &copy; {new Date().getFullYear()} Olive &amp; Grain. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  App                                                                */
/* ------------------------------------------------------------------ */
function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <FeaturedMenu />
        <SeasonalSpecials />
        <OurKitchen />
        <Catering />
        <CafeMoments />
        <VisitUs />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}

export default App;
