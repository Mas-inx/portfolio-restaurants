import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { menuItems, farms, events, reviews, type MenuCategory } from './data';

/* ─── SVG Icon Components ─── */
function IconBaby({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="9" r="5" />
      <path d="M12 14c-4 0-6 2-8 4" />
      <path d="M9 7a1 1 0 012 0v1a1 1 0 01-2 0V7z" />
      <path d="M14 8a1 1 0 00-2 0v1a1 1 0 002 0V8z" />
    </svg>
  );
}
function IconSunrise({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 18a5 5 0 00-10 0" />
      <path d="M12 2v7" />
      <path d="M4.22 10.22l1.42 1.42" />
      <path d="M1 18h22" />
      <path d="M8 6l4-4 4 4" />
    </svg>
  );
}
function IconFamily({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}
function IconHome({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
function IconSprout({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22V8" />
      <path d="M12 8c-3-3-6-4-8-4 0 3 1 6 4 8" />
      <path d="M12 8c3-3 6-4 8-4 0 3-1 6-4 8" />
    </svg>
  );
}
function IconKnife({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.5 3.5l-3 3a2 2 0 000 2.83L14 20l4-4L7.33 6.5a2 2 0 00-2.83 0z" />
      <path d="M19 14l-4 4" />
    </svg>
  );
}
function IconFire({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z" />
    </svg>
  );
}
function IconPlate({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12h8" />
      <path d="M12 8v8" />
      <path d="M2 12h4" />
      <path d="M18 12h4" />
    </svg>
  );
}
function IconHandsPray({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21c-2-3-5-5-8-5v-4c2 0 4.5 1 6 2.5V3a1 1 0 012 0v11.5C13.5 13 16 12 18 12v4c-3 0-6 2-8 5z" />
      <path d="M6 12V3a1 1 0 012 0v9" />
      <path d="M18 12V3a1 1 0 00-2 0v9" />
    </svg>
  );
}

/* ─── Types ─── */
type Tab = MenuCategory;

/* ─── Reusable Animation Variants ─── */
const easeDefault = [0.25, 0.1, 0.25, 1] as const;

const fadeInUp = {
  hidden: { opacity: 0, y: 48 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: easeDefault },
  }),
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: easeDefault },
  }),
};

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: easeDefault },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.1, ease: easeDefault },
  }),
};

/* ─── Section Wrapper with Scroll Reveal ─── */
function Section({
  children,
  className = '',
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className={`py-16 md:py-24 px-4 md:px-8 ${className}`}
    >
      <motion.div
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
        }}
        className="max-w-6xl mx-auto"
      >
        {children}
      </motion.div>
    </section>
  );
}

function SectionHeading({
  title,
  subtitle,
  light = false,
}: {
  title: string;
  subtitle?: string;
  light?: boolean;
}) {
  return (
    <motion.div variants={fadeInUp} className="text-center mb-12 md:mb-16">
      <h2
        className={`font-serif text-3xl md:text-5xl mb-3 ${
          light ? 'text-warm-white' : 'text-deep-green'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-lg md:text-xl max-w-2xl mx-auto ${
            light ? 'text-warm-white/80' : 'text-stone'
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

/* ─── Navbar ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Menu', href: '#menu' },
    { label: 'Farms', href: '#farms' },
    { label: 'Family', href: '#family' },
    { label: 'Events', href: '#events' },
    { label: 'Process', href: '#process' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Visit', href: '#visit' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-warm-white/95 backdrop-blur-md shadow-md py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 flex items-center justify-between">
        <a
          href="#"
          className={`font-serif text-xl md:text-2xl transition-colors ${
            scrolled ? 'text-deep-green' : 'text-warm-white'
          }`}
        >
          Harvest Room
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors hover:text-wheat ${
                scrolled ? 'text-charcoal' : 'text-warm-white/90'
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden p-2 ${scrolled ? 'text-charcoal' : 'text-warm-white'}`}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-warm-white/95 backdrop-blur-md overflow-hidden shadow-lg"
          >
            <div className="flex flex-col px-4 pb-4 pt-2 gap-3">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-charcoal font-medium text-sm hover:text-wheat transition-colors"
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

/* ─── Hero ─── */
function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);

  return (
    <section
      ref={ref}
      className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden"
    >
      {/* Background with parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-deep-green/90 via-deep-green-dark/85 to-charcoal/90 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              `url("https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&q=85")`,
          }}
        />
      </motion.div>

      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block text-wheat-light text-sm md:text-base tracking-[0.2em] uppercase mb-4 font-medium"
        >
          Farm-to-Table Since 2018
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-serif text-4xl md:text-6xl lg:text-7xl text-warm-white leading-tight mb-6"
        >
          Food with a place,<br />a season, and a story.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-warm-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-4"
        >
          Every ingredient on your plate comes from a farm we know, a field we&apos;ve visited,
          and a farmer we trust. We believe honest food brings people together.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="text-wheat-light/70 text-sm md:text-base mb-10 italic"
        >
          95% of our ingredients come from within 100 km of our kitchen.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#menu"
            className="inline-block bg-wheat text-deep-green-dark px-8 py-3 rounded-full font-semibold text-sm md:text-base hover:bg-wheat-light transition-colors shadow-lg"
          >
            See Today&apos;s Menu
          </a>
          <a
            href="#visit"
            className="inline-block border-2 border-warm-white/60 text-warm-white px-8 py-3 rounded-full font-semibold text-sm md:text-base hover:bg-warm-white/10 transition-colors"
          >
            Book a Table
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-warm-white/40 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-warm-white/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── Today's Menu ─── */
function TodaysMenu() {
  const [activeTab, setActiveTab] = useState<Tab>('mains');
  const categories: { key: Tab; label: string }[] = [
    { key: 'mains', label: 'Mains' },
    { key: 'sides', label: 'Sides' },
    { key: 'desserts', label: 'Desserts' },
  ];

  const filtered = menuItems.filter((item) => item.category === activeTab);

  return (
    <Section id="menu" className="bg-warm-white">
      <SectionHeading
        title="Today's Menu"
        subtitle="Seasonal dishes crafted from the freshest local ingredients. Our menu changes as the harvest does."
      />

      {/* Tabs */}
      <motion.div variants={fadeInUp} className="flex justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveTab(cat.key)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === cat.key
                ? 'bg-deep-green text-warm-white shadow-md'
                : 'bg-cream text-stone hover:bg-wheat/20'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </motion.div>

      {/* Menu Items */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              custom={i}
              className="bg-white rounded-2xl p-6 shadow-sm border border-cream hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-serif text-xl text-deep-green">{item.name}</h3>
                <span className="text-wheat-dark font-serif text-lg font-bold ml-2 whitespace-nowrap">
                  ${item.price}
                </span>
              </div>
              <p className="text-stone text-sm mb-3 leading-relaxed">{item.description}</p>
              <div className="flex items-center gap-1 text-xs text-leaf">
                <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <span>{item.supplier}</span>
                <span className="text-stone-light mx-1">&middot;</span>
                <span>{item.supplierLocation}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <motion.p
        variants={fadeInUp}
        className="text-center text-stone text-sm mt-8 italic"
      >
        Menu changes daily based on what our farms deliver. Vegan and gluten-free options available &mdash; just ask your server.
      </motion.p>
    </Section>
  );
}

/* ─── From Local Farms ─── */
function LocalFarms() {
  return (
    <Section id="farms" className="bg-deep-green">
      <SectionHeading
        title="From Local Farms"
        subtitle="Meet the families and growers who fill our kitchen. We visit every farm, know every farmer, and source with intention."
        light
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {farms.map((farm, i) => (
          <motion.div
            key={farm.id}
            variants={fadeInUp}
            custom={i}
            className="bg-deep-green-light/30 backdrop-blur-sm border border-warm-white/10 rounded-2xl p-6 hover:bg-deep-green-light/40 transition-colors"
          >
            {/* Farm image */}
            <div className="w-full h-32 rounded-xl mb-4 overflow-hidden">
              <img
                src={farm.image}
                alt={farm.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="flex items-center justify-between mb-2">
              <h3 className="font-serif text-xl text-warm-white">{farm.name}</h3>
              <span className="text-wheat-light text-xs font-medium bg-wheat/10 px-2 py-1 rounded-full">
                {farm.distance}
              </span>
            </div>
            <p className="text-warm-white/70 text-sm mb-3 leading-relaxed">{farm.story}</p>
            <div className="flex flex-wrap gap-2">
              {farm.produce.map((p) => (
                <span
                  key={p}
                  className="text-xs bg-warm-white/10 text-warm-white/80 px-2 py-1 rounded-full"
                >
                  {p}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ─── Family Dining ─── */
function FamilyDining() {
  const cards = [
    {
      title: 'Kids Menu',
      description:
        'Thoughtful portions for little appetites. Think house-made mac & cheese with aged cheddar, grilled chicken strips with honey dip, and mini veggie boards. Every kids meal comes with a seasonal fruit pop.',
      icon: <IconBaby className="w-8 h-8 text-wheat-dark" />,
    },
    {
      title: 'Weekend Brunch',
      description:
        'Saturday and Sunday from 10 AM to 2 PM. Farm-fresh eggs any style, buttermilk pancakes with local maple syrup, and our famous hash brown basket. Kids eat half-price with every adult entree.',
      icon: <IconSunrise className="w-8 h-8 text-wheat-dark" />,
    },
    {
      title: 'Group Tables',
      description:
        'Our private dining room seats up to 24 guests. Perfect for birthday dinners, family celebrations, or team gatherings. We create a custom family-style menu so everyone shares the meal together.',
      icon: <IconFamily className="w-8 h-8 text-wheat-dark" />,
    },
    {
      title: 'Family Dinner Night',
      description:
        'Tuesday evenings are family night. Shareable platters, discounted kids meals, and a complimentary loaf of our farmhouse bread. It\'s the meal we wish every family could have together.',
      icon: <IconHome className="w-8 h-8 text-wheat-dark" />,
    },
  ];

  return (
    <Section id="family" className="bg-cream">
      <SectionHeading
        title="Family Dining"
        subtitle="A place where every age feels welcome. From our kids menu to group gatherings, we believe the best meals are shared."
      />

      <div className="grid md:grid-cols-2 gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            variants={fadeInLeft}
            custom={i}
            className="bg-white rounded-2xl p-6 md:p-8 border border-wheat/20 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-3">{card.icon}</div>
            <h3 className="font-serif text-xl text-deep-green mb-2">{card.title}</h3>
            <p className="text-stone text-sm leading-relaxed">{card.description}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ─── Events ─── */
function Events() {
  return (
    <Section id="events" className="bg-warm-white">
      <SectionHeading
        title="Events & Gatherings"
        subtitle="From intimate chef's tables to festive harvest dinners, we create experiences around the season's best."
      />

      <div className="grid md:grid-cols-2 gap-6">
        {events.map((event, i) => (
          <motion.div
            key={event.id}
            variants={fadeInUp}
            custom={i}
            className="bg-white rounded-2xl overflow-hidden border border-cream shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row"
          >
            {/* Event image */}
            <div className="md:w-40 h-32 md:h-auto shrink-0 overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-5 flex flex-col justify-between flex-1">
              <div>
                <h3 className="font-serif text-lg text-deep-green mb-1">{event.title}</h3>
                <p className="text-xs text-wheat-dark font-medium mb-2">
                  {event.date} &middot; {event.time}
                </p>
                <p className="text-stone text-sm leading-relaxed mb-3">{event.description}</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-deep-green font-semibold text-sm">{event.price}</span>
                <button className="text-xs font-medium text-wheat-dark hover:text-wheat border border-wheat/30 px-3 py-1.5 rounded-full hover:bg-wheat/5 transition-colors">
                  Reserve
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ─── Process: Source → Prep → Cook → Serve ─── */
function Process() {
  const steps = [
    {
      title: 'Source',
      description:
        'We start every dish by visiting our network of local farms. We walk the fields, check the ripeness, and pick what\'s at its peak. No middlemen, no warehouses — just farmers, us, and the land.',
      icon: <IconSprout className="w-7 h-7" />,
    },
    {
      title: 'Prep',
      description:
        'Ingredients arrive at our kitchen within hours of harvest. Our team washes, chops, and portions everything by hand. We pickle, ferment, and preserve the surplus so nothing goes to waste.',
      icon: <IconKnife className="w-7 h-7" />,
    },
    {
      title: 'Cook',
      description:
        'Chef Marcus and our team build each plate with precision and heart. We use traditional techniques — wood-fire grilling, slow braising, hand-rolling pasta — to let the ingredients speak for themselves.',
      icon: <IconFire className="w-7 h-7" />,
    },
    {
      title: 'Serve',
      description:
        'Your server knows exactly where every item on your plate came from. We bring the farm to your table — telling the stories behind the food, answering your questions, and making sure every bite is enjoyed.',
      icon: <IconPlate className="w-7 h-7" />,
    },
  ];

  const ref = useRef<HTMLDivElement | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % steps.length);
          }, 3000);
          return () => clearInterval(interval);
        }
        return undefined;
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [steps.length]);

  /* Remount effect for auto-rotation when section comes into view */
  const [running, setRunning] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRunning(true);
        } else {
          setRunning(false);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3500);
    return () => clearInterval(id);
  }, [running, steps.length]);

  return (
    <Section id="process" className="bg-deep-green-dark">
      <SectionHeading
        title="From Field to Fork"
        subtitle="Every dish travels a short journey from farm to table. Here's how we bring it to you."
        light
      />

      <div ref={ref} className="relative max-w-3xl mx-auto">
        {/* Vertical line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-wheat/20 hidden md:block" />

        {steps.map((step, i) => {
          const isActive = i === activeStep;
          return (
            <motion.div
              key={step.title}
              variants={fadeInRight}
              custom={i}
              className={`relative flex items-start gap-6 mb-8 md:mb-12 last:mb-0 p-5 md:p-6 rounded-2xl transition-all duration-500 ${
                isActive
                  ? 'bg-wheat/10 border border-wheat/20 shadow-lg shadow-wheat/5'
                  : 'bg-deep-green/30 border border-transparent'
              }`}
            >
              {/* Step number */}
              <div
                className={`shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all duration-500 ${
                  isActive
                    ? 'bg-wheat text-deep-green-dark shadow-md shadow-wheat/20'
                    : 'bg-deep-green text-warm-white/60'
                }`}
              >
                {step.icon}
              </div>

              <div className="flex-1 pt-1">
                <h3
                  className={`font-serif text-xl mb-2 transition-colors duration-500 ${
                    isActive ? 'text-wheat-light' : 'text-warm-white/70'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}. {step.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed transition-colors duration-500 ${
                    isActive ? 'text-warm-white/90' : 'text-warm-white/50'
                  }`}
                >
                  {step.description}
                </p>
              </div>

              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeDot"
                  className="absolute -left-[13px] top-8 w-3 h-3 rounded-full bg-wheat hidden md:block"
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

/* ─── Community Reviews ─── */
function CommunityReviews() {
  return (
    <Section id="reviews" className="bg-warm-white">
      <SectionHeading
        title="What Our Community Says"
        subtitle="We're fortunate to serve people who love real food as much as we do. Here are their words."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review, i) => (
          <motion.div
            key={review.id}
            variants={scaleIn}
            custom={i}
            className="bg-white rounded-2xl p-6 border border-cream shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Quote icon */}
            <svg
              className="w-8 h-8 text-wheat/30 mb-3"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M14.017 21v-7.391c0-5.701 3.78-9.609 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.701 3.748-9.609 8.983-10.609l.995 2.151c-2.433.917-3.995 3.638-3.995 5.849h3.983v10h-9.966z" />
            </svg>
            <p className="text-stone text-sm leading-relaxed mb-4 italic">
              &ldquo;{review.text}&rdquo;
            </p>
            <div className="flex items-center justify-between">
              <span className="text-deep-green font-medium text-sm">{review.name}</span>
              <span className="text-stone-light text-xs">{review.date}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ─── Visit / Reserve ─── */
function VisitReserve() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Section id="visit" className="bg-cream">
      <SectionHeading
        title="Visit & Reserve"
        subtitle="We'd love to welcome you. Stop by for a meal or book a table for your next gathering."
      />

      <div className="grid lg:grid-cols-2 gap-10 items-start">
        {/* Info */}
        <motion.div variants={fadeInLeft} className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-wheat/20 shadow-sm">
            <h3 className="font-serif text-xl text-deep-green mb-4">Hours</h3>
            <div className="space-y-2 text-sm">
              {[
                { day: 'Monday – Thursday', hours: '11:30 AM – 9:00 PM' },
                { day: 'Friday – Saturday', hours: '11:30 AM – 10:00 PM' },
                { day: 'Sunday', hours: '10:00 AM – 8:00 PM (Brunch 10–2)' },
              ].map((row) => (
                <div key={row.day} className="flex justify-between">
                  <span className="text-stone">{row.day}</span>
                  <span className="text-deep-green font-medium">{row.hours}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-wheat/20 shadow-sm">
            <h3 className="font-serif text-xl text-deep-green mb-4">Location</h3>
            <p className="text-stone text-sm mb-1">42 Mill Street West</p>
            <p className="text-stone text-sm mb-3">Halton Hills, Ontario L7G 1K8</p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-wheat-dark text-sm font-medium hover:text-wheat transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Open in Google Maps
            </a>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-wheat/20 shadow-sm">
            <h3 className="font-serif text-xl text-deep-green mb-2">Contact</h3>
            <p className="text-stone text-sm">(555) 123-4567</p>
            <p className="text-stone text-sm">hello@harvestroom.ca</p>
          </div>
        </motion.div>

        {/* Reservation Form */}
        <motion.div variants={fadeInRight} className="bg-white rounded-2xl p-6 md:p-8 border border-wheat/20 shadow-sm">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10"
            >
              <IconHandsPray className="w-10 h-10 text-wheat-dark mx-auto mb-4" />
              <h3 className="font-serif text-2xl text-deep-green mb-2">Thank You!</h3>
              <p className="text-stone text-sm mb-4">
                We&apos;ve received your reservation request. We&apos;ll confirm within 24 hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    date: '',
                    time: '',
                    guests: '2',
                    message: '',
                  });
                }}
                className="text-wheat-dark text-sm font-medium hover:text-wheat transition-colors"
              >
                Make another reservation
              </button>
            </motion.div>
          ) : (
            <>
              <h3 className="font-serif text-xl text-deep-green mb-6">Reserve a Table</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs text-stone font-medium mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-cream rounded-xl text-sm bg-warm-white/50 focus:outline-none focus:ring-2 focus:ring-wheat/40 focus:border-wheat transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs text-stone font-medium mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-cream rounded-xl text-sm bg-warm-white/50 focus:outline-none focus:ring-2 focus:ring-wheat/40 focus:border-wheat transition-all"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs text-stone font-medium mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-cream rounded-xl text-sm bg-warm-white/50 focus:outline-none focus:ring-2 focus:ring-wheat/40 focus:border-wheat transition-all"
                    placeholder="(555) 000-0000"
                  />
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="date" className="block text-xs text-stone font-medium mb-1">
                      Date *
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-cream rounded-xl text-sm bg-warm-white/50 focus:outline-none focus:ring-2 focus:ring-wheat/40 focus:border-wheat transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="time" className="block text-xs text-stone font-medium mb-1">
                      Time *
                    </label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      required
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-cream rounded-xl text-sm bg-warm-white/50 focus:outline-none focus:ring-2 focus:ring-wheat/40 focus:border-wheat transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="guests" className="block text-xs text-stone font-medium mb-1">
                      Guests
                    </label>
                    <select
                      id="guests"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-cream rounded-xl text-sm bg-warm-white/50 focus:outline-none focus:ring-2 focus:ring-wheat/40 focus:border-wheat transition-all"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                      <option value="8+">8+ (Large party)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs text-stone font-medium mb-1">
                    Special requests
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-cream rounded-xl text-sm bg-warm-white/50 focus:outline-none focus:ring-2 focus:ring-wheat/40 focus:border-wheat transition-all resize-none"
                    placeholder="Allergies, celebrations, seating preferences..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-deep-green text-warm-white py-3 rounded-xl font-semibold text-sm hover:bg-deep-green-light transition-colors shadow-md"
                >
                  Confirm Reservation
                </button>

                <p className="text-xs text-stone-light text-center">
                  We&apos;ll confirm your booking within 24 hours. For same-day reservations, please call us.
                </p>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </Section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="bg-deep-green-dark text-warm-white/70 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <h3 className="font-serif text-2xl text-warm-white mb-3">Harvest Room</h3>
            <p className="text-sm leading-relaxed max-w-md">
              A farm-to-table family restaurant rooted in community, seasonality, and honest cooking.
              Every ingredient has a name, a face, and a story.
            </p>
          </div>
          <div>
            <h4 className="font-serif text-lg text-warm-white mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Menu', href: '#menu' },
                { label: 'Our Farms', href: '#farms' },
                { label: 'Events', href: '#events' },
                { label: 'Reservations', href: '#visit' },
              ].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-wheat-light transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-lg text-warm-white mb-3">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li>hello@harvestroom.ca</li>
              <li>(555) 123-4567</li>
              <li>42 Mill Street West</li>
              <li>Halton Hills, ON</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-warm-white/10 pt-6 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} Harvest Room. All rights reserved.</p>
          <p className="mt-1">Proudly sourcing from local farms in Halton Region and beyond.</p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Mobile Sticky CTA ─── */
function MobileStickyCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-warm-white/95 backdrop-blur-md border-t border-cream p-3 md:hidden shadow-lg">
      <div className="flex gap-3">
        <a
          href="#menu"
          className="flex-1 text-center bg-deep-green text-warm-white py-2.5 rounded-xl font-semibold text-sm"
        >
          Today&apos;s Menu
        </a>
        <a
          href="#visit"
          className="flex-1 text-center border-2 border-deep-green text-deep-green py-2.5 rounded-xl font-semibold text-sm"
        >
          Book a Table
        </a>
      </div>
    </div>
  );
}

/* ─── App ─── */
function App() {
  return (
    <div className="min-h-screen bg-warm-white text-charcoal">
      <Navbar />
      <Hero />
      <TodaysMenu />
      <LocalFarms />
      <FamilyDining />
      <Events />
      <Process />
      <CommunityReviews />
      <VisitReserve />
      <Footer />
      <MobileStickyCTA />
    </div>
  );
}

export default App;
