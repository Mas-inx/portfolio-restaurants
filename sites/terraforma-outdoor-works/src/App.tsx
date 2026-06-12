import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// ─── Icon Component ───────────────────────────────────────────────────────────
const iconPaths: Record<string, React.ReactNode> = {
  fire: <><path d="M12 2c0 4-4 6-4 10a4 4 0 0 0 8 0c0-4-4-6-4-10z" /><path d="M12 18a2 2 0 0 1-2-2c0-2 2-3 2-5 0 2 2 3 2 5a2 2 0 0 1-2 2z" /></>,
  water: <path d="M12 2C12 2 5 10 5 14a7 7 0 0 0 14 0c0-4-7-12-7-12z" />,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></>,
  lightbulb: <><path d="M9 18h6M10 22h4" /><path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" /></>,
  cooking: <><path d="M5 3v6a3 3 0 0 0 3 3h1v8h6v-8h1a3 3 0 0 0 3-3V3" /><path d="M9 3v2M12 3v2M15 3v2" /></>,
  chair: <><path d="M6 20v-4M18 20v-4" /><path d="M4 12h16v4H4z" /><path d="M6 12V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4" /></>,
  'arrow-down': <><path d="M12 5v14" /><path d="M19 12l-7 7-7-7" /></>,
  grid: <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></>,
  diamond: <><path d="M12 2l10 10-10 10L2 12z" /><path d="M12 8l4 4-4 4-4-4z" /></>,
  sparkle: <><path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z" /></>,
};

function Icon({ name, className = '' }: { name: string; className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {iconPaths[name] || null}
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const heroImage = "https://images.unsplash.com/photo-1600573472591-ee6b68b0c2e6?w=1600&q=85";

const transformations = [
  {
    id: 1,
    title: 'The Limestone Courtyard',
    problem: 'Barren backyard with poor drainage and cracked concrete slab.',
    intervention: 'Excavated 18" for French drain base. Installed 2,400 sq ft of honed limestone pavers with copper inlay borders.',
    result: 'A formal outdoor room that functions as an extension of the interior living space.',
    budget: '$87,000',
    duration: '9 weeks',
    beforeImage: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=85',
    afterImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=85',
  },
  {
    id: 2,
    title: 'The Fire & Kitchen Pavilion',
    problem: 'Unused side yard with mature oaks and no hardscape infrastructure.',
    intervention: 'Built a 22\' outdoor kitchen with bluestone counters, integrated Lynx grill, and a 6\' linear gas fire feature.',
    result: 'Year-round entertaining space protected by cantilevered cedar pergola.',
    budget: '$124,000',
    duration: '12 weeks',
    beforeImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=85',
    afterImage: 'https://images.unsplash.com/photo-1600573472591-ee6b68b0c2e6?w=800&q=85',
  },
  {
    id: 3,
    title: 'The Retaining Garden Terrace',
    problem: 'Steep 8-foot slope making the lower yard completely unusable.',
    intervention: 'Engineered three-tier retaining wall in weathered steel and poured concrete. Integrated stair runs and drainage.',
    result: 'Three distinct outdoor rooms — dining terrace, fire lounge, and lawn play area.',
    budget: '$156,000',
    duration: '14 weeks',
    beforeImage: 'https://images.unsplash.com/photo-1592578629301-5b0b6e3d58b2?w=800&q=85',
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=85',
  },
  {
    id: 4,
    title: 'The Water Feature Entry',
    problem: 'Flat, featureless front yard with no architectural presence.',
    intervention: 'Installed a recirculating water wall in stacked basalt, flanked by LED-lit column planters.',
    result: 'A dramatic arrival experience that sets the tone for the entire property.',
    budget: '$43,000',
    duration: '5 weeks',
    beforeImage: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=85',
    afterImage: 'https://images.unsplash.com/photo-1560743641-3914f2c45636?w=800&q=85',
  },
];

const materials = [
  { name: 'Travertine Pavers', category: 'Stone', color: '#e8dcc8', texture: 'linear-gradient(135deg, #e8dcc8 0%, #d4c4a8 50%, #c9b896 100%)', desc: 'Tumbled finish, cool underfoot' },
  { name: 'Honed Limestone', category: 'Stone', color: '#ddd5c4', texture: 'linear-gradient(145deg, #ddd5c4 0%, #cfc5b0 50%, #bfb49e 100%)', desc: 'Formal, consistent tone' },
  { name: 'Porcelain Tile', category: 'Tile', color: '#4a4a4a', texture: 'linear-gradient(160deg, #4a4a4a 0%, #3a3a3a 50%, #2d2d2d 100%)', desc: 'Zero maintenance, frost-proof' },
  { name: 'Western Cedar', category: 'Wood', color: '#8b6b4a', texture: 'linear-gradient(135deg, #8b6b4a 0%, #7a5c3e 50%, #6b4f34 100%)', desc: 'Ages to silver-grey naturally' },
  { name: 'Corten Steel', category: 'Metal', color: '#8b4513', texture: 'linear-gradient(145deg, #8b4513 0%, #a0522d 50%, #6b3410 100%)', desc: 'Controlled rust patina' },
  { name: 'Decomposed Granite', category: 'Aggregate', color: '#c4a882', texture: 'linear-gradient(135deg, #c4a882 0%, #b89b72 50%, #a88e64 100%)', desc: 'Natural permeable surface' },
  { name: 'Bluestone', category: 'Stone', color: '#5a6b7a', texture: 'linear-gradient(150deg, #5a6b7a 0%, #4a5b6a 50%, #3d4e5d 100%)', desc: 'Dense, slip-resistant' },
  { name: 'Integrated LED', category: 'Lighting', color: '#f5e6c8', texture: 'linear-gradient(135deg, #f5e6c8 0%, #e8d4a8 50%, #d4c090 100%)', desc: 'Warm 2700K path & step lighting' },
];

const systems = [
  { name: 'Fire', icon: 'fire', elements: ['Linear gas burners', 'Wood-burning pits', 'Fire tables', 'Fireplace surrounds'], color: '#c45a3c' },
  { name: 'Water', icon: 'water', elements: ['Recirculating walls', 'Reflecting pools', 'Spa integration', 'Drainage engineering'], color: '#5a8bab' },
  { name: 'Shade', icon: 'sun', elements: ['Cantilevered pergolas', 'Retractable canopies', 'Louvered roofs', 'Shade sails'], color: '#b8a040' },
  { name: 'Light', icon: 'lightbulb', elements: ['Path & step LEDs', 'Uplighting', 'String lighting', 'Architectural wash'], color: '#f5e6c8' },
  { name: 'Cooking', icon: 'cooking', elements: ['Built-in grills', 'Pizza ovens', 'Prep counters', 'Refrigeration'], color: '#8b6b4a' },
  { name: 'Seating', icon: 'chair', elements: ['Integral benches', 'Retaining ledges', 'Fire surrounds', 'Conversation pits'], color: '#7a8b6f' },
];

const budgetTiers = [
  { name: 'Refresh', range: '$15K – $35K', description: 'Surface-level transformation. New pavers over existing base, updated lighting, fresh planting beds.', includes: ['Paver overlay or replacement', 'Path lighting upgrade', 'Planting bed refresh', 'Minor grading correction'] },
  { name: 'Build', range: '$50K – $95K', description: 'A defined outdoor room with proper base engineering, one major feature element.', includes: ['Full hardscape installation', 'One feature element (fire/water)', 'Integrated lighting system', 'Drainage infrastructure', 'Select furnishing'] },
  { name: 'Full Outdoor Room', range: '$120K – $200K', description: 'Complete outdoor living space — kitchen, fire, shade, seating — engineered as architecture.', includes: ['Outdoor kitchen', 'Fire feature + seating wall', 'Pergola or shade structure', 'Full LED lighting plan', 'Multi-material hardscape', 'Irrigation integration'] },
  { name: 'Estate Exterior', range: '$250K+', description: 'Whole-property transformation. Multiple outdoor rooms, water features, and site-wide infrastructure.', includes: ['Multiple outdoor rooms', 'Water features & drainage', 'Retaining & terracing', 'Entry & arrival experience', 'Full landscape architecture', 'Smart home integration'] },
];

const buildSteps = [
  { phase: '01', title: 'Site Survey', duration: '1–2 days', detail: 'Topographic mapping, soil analysis, utility locate, drainage assessment, and photo documentation of existing conditions.' },
  { phase: '02', title: 'Design Development', duration: '2–4 weeks', detail: 'Conceptual layout, material selection, 3D visualization, engineering stamps for retaining walls and structures.' },
  { phase: '03', title: 'Material Procurement', duration: '2–3 weeks', detail: 'Stone templating, custom fabrication orders, appliance delivery coordination, permit submissions.' },
  { phase: '04', title: 'Construction', duration: '4–14 weeks', detail: 'Excavation, base engineering, hardscape installation, utility connections, feature builds, lighting rough-in.' },
  { phase: '05', title: 'Handover', duration: '2–3 days', detail: 'Final walkthrough, system testing, maintenance documentation, warranty registration, punch list completion.' },
];

// ─── Components ───────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="w-8 h-px bg-copper" />
      <span className="text-xs tracking-[0.3em] uppercase text-copper font-medium">{children}</span>
    </div>
  );
}

function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── 1. HERO ──────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.15 }} />
      </div>
      {/* Background texture */}
      <div className="absolute inset-0 bg-charcoal-dark texture-overlay" />
      <div className="absolute inset-0 grain-overlay" />
      
      {/* Large decorative element */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
        <div className="w-full h-full" style={{
          background: 'linear-gradient(135deg, transparent 40%, rgba(184,115,51,0.3) 60%, transparent 80%)',
        }} />
      </div>

      {/* Copper accent line */}
      <div className="absolute top-1/4 right-[15%] w-px h-1/3 bg-gradient-to-b from-transparent via-copper to-transparent opacity-60" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionLabel>Hardscape Architecture</SectionLabel>
          
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light leading-[0.95] tracking-tight text-limestone mb-8 max-w-5xl">
            Turn empty yards<br />
            into <span className="italic text-copper-light">usable architecture.</span>
          </h1>

          <p className="text-lg md:text-xl text-concrete max-w-2xl leading-relaxed mb-12">
            We design and build premium outdoor spaces — patios, kitchens, fire features, 
            and retaining walls — engineered to last generations.
          </p>

          <div className="flex flex-wrap gap-6">
            <a href="#projects" className="px-8 py-4 bg-copper text-charcoal-dark font-medium tracking-wide hover:bg-copper-light transition-colors duration-300">
              View Projects
            </a>
            <a href="#contact" className="px-8 py-4 border border-limestone-dark text-limestone font-medium tracking-wide hover:border-copper hover:text-copper transition-colors duration-300">
              Start Your Project
            </a>
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-24 pt-12 border-t border-charcoal-light grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: '180+', label: 'Projects Built' },
            { value: '12yr', label: 'Avg. Warranty' },
            { value: '$2.1M', label: 'Avg. Project Value' },
            { value: '100%', label: 'Engineered & Stamped' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-display text-3xl md:text-4xl text-copper-light mb-1">{stat.value}</div>
              <div className="text-sm text-concrete tracking-wide">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── 2. TRANSFORMATION REEL ───────────────────────────────────────────────────

function TransformationReel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setScrollProgress(scrollLeft / (scrollWidth - clientWidth));
    }
  };

  return (
    <section id="projects" className="py-32 bg-charcoal-dark relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <AnimatedSection>
          <SectionLabel>Transformation Reel</SectionLabel>
          <h2 className="font-display text-4xl md:text-6xl font-light text-limestone mb-4">
            Before → After
          </h2>
          <p className="text-concrete max-w-xl">
            Scroll through our recent projects. Each one started as a problem. Each one became architecture.
          </p>
        </AnimatedSection>
      </div>

      {/* Horizontal scroll */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="horizontal-scroll flex gap-8 px-6 md:px-12 pb-8"
      >
        {transformations.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.15 }}
            className="scroll-snap-item flex-shrink-0 w-[85vw] md:w-[600px] lg:w-[700px]"
          >
            <div className="bg-charcoal border border-charcoal-light overflow-hidden group">
              {/* Visual area */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                {/* Before/After split visual with real images */}
                <div className="absolute inset-0 flex">
                  <div className="w-1/2 overflow-hidden border-r border-charcoal-light relative">
                    <img src={project.beforeImage} alt="Before" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)' }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs tracking-[0.2em] uppercase text-concrete bg-charcoal-dark/60 px-2 py-1">Before</span>
                    </div>
                  </div>
                  <div className="w-1/2 overflow-hidden relative">
                    <img src={project.afterImage} alt="After" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div className="absolute inset-0 bg-gradient-to-br from-copper/10 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs tracking-[0.2em] uppercase text-copper-light relative z-10 bg-charcoal-dark/60 px-2 py-1">After</span>
                    </div>
                  </div>
                </div>
                {/* Project number */}
                <div className="absolute top-4 left-4 font-display text-6xl text-limestone/10">
                  0{project.id}
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="font-display text-2xl md:text-3xl text-limestone mb-6">{project.title}</h3>
                
                <div className="space-y-4 mb-8">
                  <div>
                    <span className="text-xs tracking-[0.2em] uppercase text-ember mb-1 block">Problem</span>
                    <p className="text-sm text-concrete leading-relaxed">{project.problem}</p>
                  </div>
                  <div>
                    <span className="text-xs tracking-[0.2em] uppercase text-copper mb-1 block">Intervention</span>
                    <p className="text-sm text-limestone/80 leading-relaxed">{project.intervention}</p>
                  </div>
                  <div>
                    <span className="text-xs tracking-[0.2em] uppercase text-sage mb-1 block">Result</span>
                    <p className="text-sm text-limestone/80 leading-relaxed">{project.result}</p>
                  </div>
                </div>

                <div className="flex gap-8 pt-6 border-t border-charcoal-light">
                  <div>
                    <span className="text-xs text-concrete block mb-1">Investment</span>
                    <span className="font-display text-xl text-copper-light">{project.budget}</span>
                  </div>
                  <div>
                    <span className="text-xs text-concrete block mb-1">Timeline</span>
                    <span className="font-display text-xl text-limestone">{project.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-8">
        <div className="h-px bg-charcoal-light relative">
          <div
            className="absolute top-0 left-0 h-full bg-copper transition-all duration-100"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}

// ─── 3. MATERIAL LIBRARY ──────────────────────────────────────────────────────

function MaterialLibrary() {
  const [activeMaterial, setActiveMaterial] = useState<number | null>(null);

  return (
    <section className="py-32 bg-charcoal relative">
      <div className="absolute inset-0 texture-overlay" />
      
      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <AnimatedSection>
          <SectionLabel>Material Library</SectionLabel>
          <h2 className="font-display text-4xl md:text-6xl font-light text-limestone mb-4">
            Tactile Selection
          </h2>
          <p className="text-concrete max-w-xl mb-16">
            Every surface is a decision. We source, template, and install materials that perform 
            as beautifully as they look.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {materials.map((material, i) => (
            <motion.div
              key={material.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="material-swatch cursor-pointer"
              onMouseEnter={() => setActiveMaterial(i)}
              onMouseLeave={() => setActiveMaterial(null)}
            >
              <div className="relative aspect-square overflow-hidden border border-charcoal-light">
                <div
                  className="absolute inset-0 transition-transform duration-700"
                  style={{
                    background: material.texture,
                    transform: activeMaterial === i ? 'scale(1.1)' : 'scale(1)',
                  }}
                />
                {/* Overlay on hover */}
                <div className={`absolute inset-0 bg-charcoal-dark/60 flex flex-col justify-end p-4 transition-opacity duration-300 ${activeMaterial === i ? 'opacity-100' : 'opacity-0'}`}>
                  <span className="text-xs tracking-[0.2em] uppercase text-copper mb-1">{material.category}</span>
                  <span className="text-sm text-limestone">{material.desc}</span>
                </div>
              </div>
              <div className="mt-3">
                <span className="text-sm text-limestone/80">{material.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 4. OUTDOOR SYSTEMS ───────────────────────────────────────────────────────

function OutdoorSystems() {
  const [activeSystem, setActiveSystem] = useState<number | null>(null);

  return (
    <section className="py-32 bg-charcoal-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <AnimatedSection>
          <SectionLabel>Outdoor Systems</SectionLabel>
          <h2 className="font-display text-4xl md:text-6xl font-light text-limestone mb-4">
            Layered Design
          </h2>
          <p className="text-concrete max-w-xl mb-16">
            Great outdoor spaces aren't single elements — they're integrated systems that work together.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {systems.map((system, i) => (
            <motion.div
              key={system.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onMouseEnter={() => setActiveSystem(i)}
              onMouseLeave={() => setActiveSystem(null)}
              className="relative border border-charcoal-light p-8 transition-all duration-500 cursor-pointer group"
              style={{
                borderColor: activeSystem === i ? system.color + '60' : undefined,
                background: activeSystem === i ? `linear-gradient(135deg, ${system.color}08 0%, transparent 60%)` : undefined,
              }}
            >
              {/* Layer indicator */}
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-copper/30 to-transparent" />
              
              <div className="flex items-start justify-between mb-6">
                <Icon name={system.icon} className="w-8 h-8" />
                <span className="text-xs tracking-[0.2em] uppercase text-concrete">Layer 0{i + 1}</span>
              </div>

              <h3 className="font-display text-2xl text-limestone mb-4">{system.name}</h3>

              <ul className="space-y-2">
                {system.elements.map((el) => (
                  <li key={el} className="flex items-center gap-3 text-sm text-concrete">
                    <div className="w-1 h-1 rounded-full" style={{ backgroundColor: system.color }} />
                    {el}
                  </li>
                ))}
              </ul>

              {/* Active indicator */}
              <div
                className="absolute bottom-0 left-0 h-0.5 transition-all duration-500"
                style={{
                  width: activeSystem === i ? '100%' : '0%',
                  backgroundColor: system.color,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 5. BUDGET REALITIES ──────────────────────────────────────────────────────

function BudgetRealities() {
  const [revealedTiers, setRevealedTiers] = useState<boolean[]>([false, false, false, false]);

  const revealTier = (index: number) => {
    setRevealedTiers(prev => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
  };

  return (
    <section className="py-32 bg-charcoal relative">
      <div className="absolute inset-0 texture-overlay" />
      
      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <AnimatedSection>
          <SectionLabel>Budget Realities</SectionLabel>
          <h2 className="font-display text-4xl md:text-6xl font-light text-limestone mb-4">
            Honest Pricing
          </h2>
          <p className="text-concrete max-w-xl mb-16">
            No hidden fees. No scope creep surprises. Click each tier to reveal what's included.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {budgetTiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              onClick={() => revealTier(i)}
              className="budget-tier relative border border-charcoal-light p-8 md:p-10 cursor-pointer group overflow-hidden"
            >
              {/* Background reveal */}
              <div
                className="absolute inset-0 transition-opacity duration-700"
                style={{
                  opacity: revealedTiers[i] ? 1 : 0,
                  background: `linear-gradient(135deg, rgba(184,115,51,0.05) 0%, transparent 60%)`,
                }}
              />

              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-display text-2xl md:text-3xl text-limestone">{tier.name}</h3>
                  <span className="font-display text-xl md:text-2xl text-copper-light">{tier.range}</span>
                </div>

                <p className="text-concrete text-sm leading-relaxed mb-6">{tier.description}</p>

                {/* Revealed includes */}
                <AnimatePresence>
                  {revealedTiers[i] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 border-t border-charcoal-light">
                        <span className="text-xs tracking-[0.2em] uppercase text-copper mb-4 block">Includes</span>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {tier.includes.map((item) => (
                            <li key={item} className="flex items-center gap-3 text-sm text-limestone/80">
                              <svg className="w-4 h-4 text-copper flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!revealedTiers[i] && (
                  <div className="flex items-center gap-2 text-sm text-copper/60 group-hover:text-copper transition-colors">
                    <span>Click to reveal scope</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 6. BUILD PROCESS ─────────────────────────────────────────────────────────

function BuildProcess() {
  return (
    <section className="py-32 bg-charcoal-dark relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <AnimatedSection>
          <SectionLabel>Build Process</SectionLabel>
          <h2 className="font-display text-4xl md:text-6xl font-light text-limestone mb-4">
            Five Phases
          </h2>
          <p className="text-concrete max-w-xl mb-16">
            From first survey to final walkthrough. Transparent milestones at every stage.
          </p>
        </AnimatedSection>

        <div className="space-y-4">
          {buildSteps.map((step, i) => (
            <motion.div
              key={step.phase}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative border border-charcoal-light p-8 md:p-10 hover:border-copper/30 transition-colors duration-500"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-shrink-0">
                  <span className="font-display text-5xl md:text-6xl text-copper/30 group-hover:text-copper/60 transition-colors duration-500">
                    {step.phase}
                  </span>
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <h3 className="font-display text-2xl md:text-3xl text-limestone mb-2 md:mb-0">{step.title}</h3>
                    <span className="text-sm text-copper-light tracking-wide">{step.duration}</span>
                  </div>
                  <p className="text-concrete text-sm md:text-base leading-relaxed max-w-3xl">{step.detail}</p>
                </div>
              </div>

              {/* Left accent line */}
              <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-copper/0 via-copper/40 to-copper/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 7. WARRANTY + CRAFT ──────────────────────────────────────────────────────

function WarrantyCraft() {
  const crafts = [
    { title: 'Drainage Engineering', detail: 'Every project includes proper sub-base drainage. We install French drains, channel drains, and permeable bases to prevent hydrostatic pressure and heaving.', icon: 'arrow-down' },
    { title: 'Base Preparation', detail: 'Minimum 6" compacted aggregate base for pavers. 12"+ for vehicular applications. Laser-graded for consistent slope and load distribution.', icon: 'grid' },
    { title: 'Structural Quality', detail: 'All retaining walls over 4\' are engineered and stamped. Rebar reinforcement, proper weep holes, and geogrid integration where required.', icon: 'diamond' },
    { title: 'Final Cleanup', detail: 'We leave your property cleaner than we found it. Power-washed surfaces, seeded disturbed soil, and all debris removed within 48 hours of completion.', icon: 'sparkle' },
  ];

  return (
    <section className="py-32 bg-charcoal relative overflow-hidden">
      <div className="absolute inset-0 texture-overlay" />
      
      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <AnimatedSection>
          <SectionLabel>Warranty + Craft</SectionLabel>
          <h2 className="font-display text-4xl md:text-6xl font-light text-limestone mb-4">
            Built to Last
          </h2>
          <p className="text-concrete max-w-xl mb-16">
            Our warranty means something because our construction means something. 
            Here's what backs every project.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {crafts.map((craft, i) => (
            <motion.div
              key={craft.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="relative p-8 border border-charcoal-light group"
            >
              <div className="flex items-start gap-4">
                <Icon name={craft.icon} className="w-6 h-6 text-copper/60 mt-1" />
                <div>
                  <h3 className="font-display text-xl md:text-2xl text-limestone mb-3">{craft.title}</h3>
                  <p className="text-concrete text-sm leading-relaxed">{craft.detail}</p>
                </div>
              </div>
              
              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 w-0 h-px bg-copper group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </div>

        {/* Warranty badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center p-12 border border-copper/20 bg-copper/5"
        >
          <div className="font-display text-5xl md:text-7xl text-copper-light mb-4">12</div>
          <div className="text-sm tracking-[0.3em] uppercase text-limestone mb-2">Year Structural Warranty</div>
          <p className="text-concrete text-sm max-w-md mx-auto">
            Covering all hardscape installation, retaining structures, and integrated systems. 
            Transferable to new property owners.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── 8. PROJECT CTA ───────────────────────────────────────────────────────────

function ProjectCTA() {
  const [budget, setBudget] = useState(75000);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    scope: '',
    timeline: '',
  });

  const formatBudget = (val: number) => {
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}K`;
    return `$${val}`;
  };

  const getBudgetLabel = (val: number) => {
    if (val < 35000) return 'Refresh';
    if (val < 95000) return 'Build';
    if (val < 200000) return 'Full Outdoor Room';
    return 'Estate Exterior';
  };

  return (
    <section id="contact" className="py-32 bg-charcoal-dark relative">
      <div className="absolute inset-0 grain-overlay" />
      
      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <AnimatedSection>
          <SectionLabel>Start Your Project</SectionLabel>
          <h2 className="font-display text-4xl md:text-6xl font-light text-limestone mb-4">
            Let's Build
          </h2>
          <p className="text-concrete max-w-xl mb-16">
            Tell us about your space. We'll respond within 48 hours with availability and next steps.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="space-y-6">
              <div>
                <label className="text-xs tracking-[0.2em] uppercase text-concrete mb-2 block">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border-b border-charcoal-light pb-3 text-limestone focus:border-copper outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-xs tracking-[0.2em] uppercase text-concrete mb-2 block">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-b border-charcoal-light pb-3 text-limestone focus:border-copper outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="text-xs tracking-[0.2em] uppercase text-concrete mb-2 block">Project Scope</label>
                <textarea
                  value={formData.scope}
                  onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                  rows={4}
                  className="w-full bg-transparent border border-charcoal-light p-4 text-limestone focus:border-copper outline-none transition-colors resize-none"
                  placeholder="Describe your space, goals, and any specific features you're envisioning..."
                />
              </div>
              <div>
                <label className="text-xs tracking-[0.2em] uppercase text-concrete mb-2 block">Desired Timeline</label>
                <select
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className="w-full bg-charcoal border border-charcoal-light p-4 text-limestone focus:border-copper outline-none transition-colors"
                >
                  <option value="">Select timeline</option>
                  <option value="asap">ASAP (1-2 months)</option>
                  <option value="soon">This Season (3-4 months)</option>
                  <option value="planning">Planning Ahead (6+ months)</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>

              <button className="w-full py-4 bg-copper text-charcoal-dark font-medium tracking-wide hover:bg-copper-light transition-colors duration-300 mt-8">
                Submit Project Inquiry
              </button>
            </div>
          </motion.div>

          {/* Budget slider */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="p-8 md:p-10 border border-charcoal-light">
              <label className="text-xs tracking-[0.2em] uppercase text-concrete mb-8 block">Project Budget</label>
              
              <div className="mb-8">
                <div className="font-display text-5xl md:text-6xl text-copper-light mb-2">
                  {formatBudget(budget)}
                </div>
                <div className="text-sm text-limestone/60">
                  Tier: <span className="text-limestone">{getBudgetLabel(budget)}</span>
                </div>
              </div>

              <input
                type="range"
                min={10000}
                max={500000}
                step={5000}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full mb-6"
              />

              <div className="flex justify-between text-xs text-concrete">
                <span>$10K</span>
                <span>$500K+</span>
              </div>

              {/* Tier indicators */}
              <div className="mt-8 pt-8 border-t border-charcoal-light space-y-3">
                {budgetTiers.map((tier) => {
                  const isActive = getBudgetLabel(budget) === tier.name;
                  return (
                    <div
                      key={tier.name}
                      className={`flex items-center justify-between py-2 transition-colors duration-300 ${isActive ? 'text-copper-light' : 'text-concrete/50'}`}
                    >
                      <span className="text-sm">{tier.name}</span>
                      <span className="text-xs">{tier.range}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="py-16 bg-charcoal-dark border-t border-charcoal-light">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <div className="font-display text-2xl text-limestone mb-2">TerraForma</div>
            <div className="text-sm text-concrete">Outdoor Works</div>
          </div>
          
          <div className="flex flex-wrap gap-8 text-sm text-concrete">
            <a href="#projects" className="hover:text-copper transition-colors">Projects</a>
            <a href="#contact" className="hover:text-copper transition-colors">Contact</a>
            <span>Licensed & Insured</span>
            <span>CA CSLB #1098234</span>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-charcoal-light text-xs text-concrete/50">
          © 2024 TerraForma Outdoor Works. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-charcoal-dark/95 backdrop-blur-sm border-b border-charcoal-light' : ''}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
        <div className="font-display text-xl text-limestone tracking-wide">
          Terra<span className="text-copper-light">Forma</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-concrete">
          <a href="#projects" className="hover:text-copper transition-colors">Projects</a>
          <a href="#contact" className="hover:text-copper transition-colors">Contact</a>
          <a href="#contact" className="px-5 py-2 border border-copper text-copper hover:bg-copper hover:text-charcoal-dark transition-all duration-300">
            Get Quote
          </a>
        </div>
      </div>
    </nav>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <TransformationReel />
      <MaterialLibrary />
      <OutdoorSystems />
      <BudgetRealities />
      <BuildProcess />
      <WarrantyCraft />
      <ProjectCTA />
      <Footer />
    </div>
  );
}
