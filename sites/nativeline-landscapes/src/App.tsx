import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Icon Component ───────────────────────────────────────────────────────────
const iconPaths: Record<string, React.ReactNode> = {
  grain: <><path d="M12 22V8" /><path d="M5 12H2a10 10 0 0 0 20 0h-3" /><path d="M8 5l4 3 4-3" /><path d="M8 5c0-2 1.5-3 4-3s4 1 4 3" /></>,
  cactus: <><path d="M12 22V6" /><path d="M8 14H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2" /><path d="M16 10h2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" /><path d="M9 2h6" /></>,
  leaf: <><path d="M11 20A7 7 0 0 1 4 13c0-5 4-9 9-9 0 5-2 8-5 10" /><path d="M11 20c2-3 5-7 5-12" /><path d="M4 13c2-1 4-1 7 0" /></>,
  butterfly: <><path d="M12 22V2" /><path d="M12 8c-4-4-8-2-8 2s4 6 8 2" /><path d="M12 8c4-4 8-2 8 2s-4 6-8 2" /><path d="M12 14c-3 3-6 2-6-1" /><path d="M12 14c3 3 6 2 6-1" /></>,
  rock: <><path d="M3 18l4-10h10l4 10H3z" /><path d="M7 8l2-4h6l2 4" /><path d="M3 18h18" /></>,
  pick: <><path d="M14 4l-2 2 6 6 2-2a2.83 2.83 0 0 0-4-4z" /><path d="M12 6L4 14v4h4l8-8" /><path d="M4 22l4-4" /></>,
  seedling: <><path d="M12 22V12" /><path d="M12 12c0-4 3-7 7-7-1 5-4 7-7 7z" /><path d="M12 12c0-4-3-7-7-7 1 5 4 7 7 7z" /></>,
  water: <path d="M12 2C12 2 5 10 5 14a7 7 0 0 0 14 0c0-4-7-12-7-12z" />,
  clipboard: <><rect x="8" y="2" width="8" height="4" rx="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="M12 11h4M12 16h4M8 11h.01M8 16h.01" /></>,
  worm: <><path d="M12 2c-2 4-4 6-4 10a4 4 0 0 0 8 0c0-2-1-3-2-4" /><path d="M12 16v6" /><circle cx="12" cy="2" r="1" /></>,
  globe: <><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z" /></>,
  timer: <><circle cx="12" cy="13" r="8" /><path d="M12 9v4l2 2" /><path d="M5 3l2 2M19 3l-2 2" /><path d="M12 2v3" /></>,
  'green-square': <rect x="4" y="4" width="16" height="16" rx="2" />,
  money: <><rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="3" /><path d="M6 12h.01M18 12h.01" /></>,
  calendar: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>,
  scroll: <><path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4" /><path d="M19 7V5a2 2 0 0 0-2-2H8" /></>,
  'flower': <><circle cx="12" cy="12" r="3" /><path d="M12 2a4 4 0 0 1 0 8 4 4 0 0 1 0-8z" /><path d="M12 14a4 4 0 0 1 0 8 4 4 0 0 1 0-8z" /><path d="M2 12a4 4 0 0 1 8 0 4 4 0 0 1-8 0z" /><path d="M14 12a4 4 0 0 1 8 0 4 4 0 0 1-8 0z" /></>,
};

function Icon({ name, className = '' }: { name: string; className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {iconPaths[name] || null}
    </svg>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────

const nativeSystems = [
  {
    id: 'meadow',
    name: 'Native Meadow',
    icon: 'grain',
    desc: 'Flowing grasses and wildflowers that sway with the wind. Supports 40+ pollinator species.',
    water: 15,
    biodiversity: 92,
    maintenance: 'Low',
    color: '#7A8B6F',
  },
  {
    id: 'desert',
    name: 'Desert Garden',
    icon: 'cactus',
    desc: 'Succulents, agaves, and drought-tolerant shrubs. Zero irrigation after establishment.',
    water: 5,
    biodiversity: 65,
    maintenance: 'Minimal',
    color: '#C4956A',
  },
  {
    id: 'shade',
    name: 'Shade Understory',
    icon: 'leaf',
    desc: 'Ferns, woodland flowers, and native groundcovers for under trees and north-facing yards.',
    water: 30,
    biodiversity: 78,
    maintenance: 'Low',
    color: '#5B7A4A',
  },
  {
    id: 'pollinator',
    name: 'Pollinator Edge',
    icon: 'butterfly',
    desc: 'Dense flowering borders designed to attract and sustain native bees, butterflies, and birds.',
    water: 20,
    biodiversity: 95,
    maintenance: 'Medium',
    color: '#94A685',
  },
  {
    id: 'gravel',
    name: 'Gravel Court',
    icon: 'rock',
    desc: 'Permeable gravel with sculptural plantings. Modern aesthetic with maximum drainage.',
    water: 8,
    biodiversity: 45,
    maintenance: 'Minimal',
    color: '#8B7355',
  },
]

const plants = [
  { name: 'Purple Coneflower', sun: 'full', water: 'low', bloom: 'summer', height: 'tall', pollinator: 5, latin: 'Echinacea purpurea', color: '#8B5E8B' },
  { name: 'Blue Grama Grass', sun: 'full', water: 'low', bloom: 'summer', height: 'short', pollinator: 3, latin: 'Bouteloua gracilis', color: '#6B8E9B' },
  { name: 'California Poppy', sun: 'full', water: 'low', bloom: 'spring', height: 'short', pollinator: 4, latin: 'Eschscholzia californica', color: '#E8A838' },
  { name: 'Wild Bergamot', sun: 'full', water: 'medium', bloom: 'summer', height: 'tall', pollinator: 5, latin: 'Monarda fistulosa', color: '#9B7BB8' },
  { name: 'Yarrow', sun: 'full', water: 'low', bloom: 'summer', height: 'medium', pollinator: 4, latin: 'Achillea millefolium', color: '#E8D8C8' },
  { name: 'Columbine', sun: 'partial', water: 'medium', bloom: 'spring', height: 'medium', pollinator: 5, latin: 'Aquilegia formosa', color: '#D45B5B' },
  { name: 'Sage', sun: 'full', water: 'low', bloom: 'spring', height: 'medium', pollinator: 4, latin: 'Salvia officinalis', color: '#7A8B6F' },
  { name: 'Fern (Western)', sun: 'shade', water: 'high', bloom: 'none', height: 'medium', pollinator: 1, latin: 'Polystichum munitum', color: '#4A6B4A' },
  { name: 'Penstemon', sun: 'full', water: 'low', bloom: 'spring', height: 'tall', pollinator: 5, latin: 'Penstemon spp.', color: '#B85C8A' },
  { name: 'Sedum', sun: 'full', water: 'low', bloom: 'fall', height: 'short', pollinator: 3, latin: 'Sedum spp.', color: '#8BA87A' },
  { name: 'Manzanita', sun: 'full', water: 'low', bloom: 'winter', height: 'tall', pollinator: 4, latin: 'Arctostaphylos spp.', color: '#A85B3A' },
  { name: 'Heuchera', sun: 'partial', water: 'medium', bloom: 'spring', height: 'short', pollinator: 3, latin: 'Heuchera spp.', color: '#C47A6A' },
]

const timelineSteps = [
  { phase: 1, title: 'Turf Removal', desc: 'Solarize or sheet-mulch existing lawn. Remove invasive grasses completely.', duration: '2–4 weeks', icon: 'pick' },
  { phase: 2, title: 'Soil Preparation', desc: 'Amend with compost, test pH, grade for natural drainage patterns.', duration: '1–2 weeks', icon: 'seedling' },
  { phase: 3, title: 'Irrigation Design', desc: 'Install drip zones by plant type. Smart controller with weather response.', duration: '3–5 days', icon: 'water' },
  { phase: 4, title: 'Planting', desc: 'Install native species by layer — canopy, shrub, herbaceous, groundcover.', duration: '1–2 weeks', icon: 'leaf' },
  { phase: 5, title: 'Mulch & Hardscape', desc: 'Apply wood chip or gravel mulch. Install paths, borders, and seating.', duration: '3–5 days', icon: 'rock' },
  { phase: 6, title: 'First-Year Care', desc: 'Deep watering schedule, weed management, seasonal observation visits.', duration: '12 months', icon: 'clipboard' },
]

const rebates = [
  { program: 'Turf Replacement Rebate', amount: '$2–$4/sq ft', agency: 'Local Water District', deadline: 'Ongoing' },
  { program: 'Native Plant Credit', amount: 'Up to $1,500', agency: 'State Conservation', deadline: 'Annual' },
  { program: 'Smart Irrigation', amount: '$150–$300', agency: 'Water Utility', deadline: 'Ongoing' },
  { program: 'Rain Garden Grant', amount: '$500–$2,000', agency: 'Stormwater Mgmt', deadline: 'Quarterly' },
]

// ─── Topographic SVG Background ──────────────────────────────────────────────

function TopoLines() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.07]" viewBox="0 0 800 600" preserveAspectRatio="none">
      <motion.path
        d="M0 300 Q200 250 400 300 T800 280"
        fill="none" stroke="#7A8B6F" strokeWidth="1.5"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 3, ease: 'easeInOut' }}
      />
      <motion.path
        d="M0 250 Q200 200 400 250 T800 230"
        fill="none" stroke="#7A8B6F" strokeWidth="1"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 3.5, ease: 'easeInOut', delay: 0.3 }}
      />
      <motion.path
        d="M0 350 Q200 310 400 350 T800 330"
        fill="none" stroke="#7A8B6F" strokeWidth="1"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 3.5, ease: 'easeInOut', delay: 0.6 }}
      />
      <motion.path
        d="M0 200 Q200 160 400 200 T800 180"
        fill="none" stroke="#C4956A" strokeWidth="0.8"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 4, ease: 'easeInOut', delay: 0.9 }}
      />
      <motion.path
        d="M0 400 Q200 370 400 400 T800 380"
        fill="none" stroke="#C4956A" strokeWidth="0.8"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 4, ease: 'easeInOut', delay: 1.2 }}
      />
      <motion.path
        d="M0 150 Q200 120 400 150 T800 130"
        fill="none" stroke="#7A8B6F" strokeWidth="0.6"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 4.5, ease: 'easeInOut', delay: 1.5 }}
      />
      <motion.path
        d="M0 450 Q200 420 400 450 T800 430"
        fill="none" stroke="#7A8B6F" strokeWidth="0.6"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 4.5, ease: 'easeInOut', delay: 1.8 }}
      />
    </svg>
  )
}

// ─── Section Wrapper ─────────────────────────────────────────────────────────

function Section({ id, children, className = '' }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`py-20 px-6 md:px-12 lg:px-20 ${className}`}>
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="w-8 h-px bg-sage" />
      <span className="text-xs font-semibold tracking-[0.2em] uppercase text-sage">{children}</span>
    </div>
  )
}

// ─── 1. Hero ─────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden topo-bg">
      <div className="absolute inset-0 topo-animate">
        <TopoLines />
      </div>
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sage/20 bg-sage/5 mb-8">
            <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
            <span className="text-xs font-medium text-sage-dark tracking-wide">Ecological Landscape Design</span>
          </div>
        </motion.div>
        <motion.h1
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-charcoal leading-[1.05] mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Replace the lawn.<br />
          <span className="text-sage">Keep the beauty.</span>
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-charcoal-light max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Transform water-thirsty turf into thriving native ecosystems. 
          Less mowing. More life. Designed for your climate.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a href="#calculator" className="px-8 py-4 bg-sage text-white font-semibold rounded-lg hover:bg-sage-dark transition-colors shadow-lg shadow-sage/20">
            Calculate Your Impact
          </a>
          <a href="#systems" className="px-8 py-4 border border-charcoal/20 text-charcoal font-semibold rounded-lg hover:border-sage hover:text-sage transition-colors">
            Explore Systems
          </a>
        </motion.div>
        <motion.div
          className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          {[
            { value: '70%', label: 'Less Water' },
            { value: '90%', label: 'Less Mowing' },
            { value: '3×', label: 'More Biodiversity' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-sage">{stat.value}</div>
              <div className="text-xs text-charcoal-light mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── 2. Conversion Calculator ────────────────────────────────────────────────

function Calculator() {
  const [lawnSize, setLawnSize] = useState(1000)
  const [irrigationFreq, setIrrigationFreq] = useState(3)

  const results = useMemo(() => {
    const gallonsPerSqFt = 0.623
    const weeklyIrrigationGallons = lawnSize * gallonsPerSqFt * 0.5 * irrigationFreq
    const waterSavedYearly = Math.round(weeklyIrrigationGallons * 35)
    const mowingHoursSaved = Math.round((lawnSize / 5000) * 30 * irrigationFreq)
    const speciesCount = Math.min(Math.round(lawnSize / 50) + 5, 45)
    return { waterSavedYearly, mowingHoursSaved, speciesCount }
  }, [lawnSize, irrigationFreq])

  return (
    <Section id="calculator" className="bg-sand-dark/50">
      <SectionLabel>Conversion Calculator</SectionLabel>
      <h2 className="font-serif text-3xl md:text-5xl text-charcoal mb-4">Measure Your Impact</h2>
      <p className="text-charcoal-light mb-12 max-w-xl">
        Adjust your lawn size and current irrigation schedule to see the ecological transformation.
      </p>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Sliders */}
        <div className="space-y-10">
          <div>
            <div className="flex justify-between items-baseline mb-3">
              <label className="text-sm font-semibold text-charcoal">Lawn Area</label>
              <span className="text-2xl font-bold text-sage">{lawnSize.toLocaleString()} sq ft</span>
            </div>
            <input
              type="range" min="200" max="10000" step="100"
              value={lawnSize}
              onChange={(e) => setLawnSize(Number(e.target.value))}
            />
            <div className="flex justify-between text-xs text-charcoal-light mt-1">
              <span>200 sq ft</span><span>10,000 sq ft</span>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-baseline mb-3">
              <label className="text-sm font-semibold text-charcoal">Irrigation Frequency</label>
              <span className="text-2xl font-bold text-sage">{irrigationFreq}× per week</span>
            </div>
            <input
              type="range" min="1" max="7" step="1"
              value={irrigationFreq}
              onChange={(e) => setIrrigationFreq(Number(e.target.value))}
            />
            <div className="flex justify-between text-xs text-charcoal-light mt-1">
              <span>1×/week</span><span>7×/week</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <motion.div
            className="botanical-border p-6 rounded-xl bg-sand"
            key={results.waterSavedYearly}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl"><Icon name="water" className="w-6 h-6" /></span>
              <span className="text-sm font-medium text-charcoal-light">Annual Water Saved</span>
            </div>
            <div className="text-4xl font-bold text-sage">
              {results.waterSavedYearly.toLocaleString()}
              <span className="text-lg text-charcoal-light ml-2">gallons</span>
            </div>
            <div className="mt-2 h-2 bg-sand-dark rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-sage rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((results.waterSavedYearly / 500000) * 100, 100)}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>

          <motion.div
            className="botanical-border p-6 rounded-xl bg-sand"
            key={results.mowingHoursSaved}
          >
            <div className="flex items-center gap-3 mb-2">
              <Icon name="timer" className="w-6 h-6" />
              <span className="text-sm font-medium text-charcoal-light">Mowing Hours Reduced</span>
            </div>
            <div className="text-4xl font-bold text-clay">
              {results.mowingHoursSaved}
              <span className="text-lg text-charcoal-light ml-2">hours/year</span>
            </div>
          </motion.div>

          <motion.div
            className="botanical-border p-6 rounded-xl bg-sand"
            key={results.speciesCount}
          >
            <div className="flex items-center gap-3 mb-2">
              <Icon name="leaf" className="w-6 h-6" />
              <span className="text-sm font-medium text-charcoal-light">Native Species Supported</span>
            </div>
            <div className="text-4xl font-bold text-moss">
              {results.speciesCount}
              <span className="text-lg text-charcoal-light ml-2">species</span>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}

// ─── 3. Native Systems ───────────────────────────────────────────────────────

function NativeSystems() {
  const [active, setActive] = useState('meadow')
  const activeSystem = nativeSystems.find(s => s.id === active)!

  return (
    <Section id="systems">
      <SectionLabel>Native Systems</SectionLabel>
      <h2 className="font-serif text-3xl md:text-5xl text-charcoal mb-4">Five Ecological Approaches</h2>
      <p className="text-charcoal-light mb-12 max-w-xl">
        Each system is designed for specific site conditions. Mix and match for a layered, resilient landscape.
      </p>

      {/* System tabs */}
      <div className="flex flex-wrap gap-3 mb-10">
        {nativeSystems.map((sys) => (
          <button
            key={sys.id}
            onClick={() => setActive(sys.id)}
            className={`px-5 py-3 rounded-lg font-medium text-sm transition-all ${
              active === sys.id
                ? 'bg-sage text-white shadow-lg shadow-sage/20'
                : 'bg-sand-dark text-charcoal-light hover:bg-sage/10 hover:text-sage-dark'
            }`}
          >
            <Icon name={sys.icon} className="w-4 h-4 inline mr-2" />{sys.name}
          </button>
        ))}
      </div>

      {/* Active system detail */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="botanical-border rounded-2xl p-8 md:p-12 bg-sand"
        >
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <div className="text-5xl mb-4"><Icon name={activeSystem.icon} className="w-12 h-12" /></div>
              <h3 className="font-serif text-3xl text-charcoal mb-4">{activeSystem.name}</h3>
              <p className="text-charcoal-light leading-relaxed mb-6">{activeSystem.desc}</p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sage/10 text-sage-dark text-sm font-medium">
                Maintenance: {activeSystem.maintenance}
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-charcoal">Water Need (% of turf)</span>
                  <span className="text-sage font-bold">{activeSystem.water}%</span>
                </div>
                <div className="h-3 bg-sand-dark rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: activeSystem.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${activeSystem.water}%` }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-charcoal">Biodiversity Index</span>
                  <span className="text-sage font-bold">{activeSystem.biodiversity}/100</span>
                </div>
                <div className="h-3 bg-sand-dark rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-moss rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${activeSystem.biodiversity}%` }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  />
                </div>
              </div>
              <div className="pt-4 border-t border-sage/10">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-4 rounded-lg bg-sand-dark/50">
                    <div className="text-2xl font-bold text-sage">{100 - activeSystem.water}%</div>
                    <div className="text-xs text-charcoal-light mt-1">Water Reduction</div>
                  </div>
                  <div className="p-4 rounded-lg bg-sand-dark/50">
                    <div className="text-2xl font-bold text-moss">{activeSystem.biodiversity}%</div>
                    <div className="text-xs text-charcoal-light mt-1">Habitat Score</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </Section>
  )
}

// ─── 4. Before/After Ecology ─────────────────────────────────────────────────

function BeforeAfter() {
  const [position, setPosition] = useState(50)

  const beforeMetrics = [
    { label: 'Water Use', value: '62 gal/sq ft/yr', icon: 'water' },
    { label: 'Species Count', value: '1–2', icon: 'seedling' },
    { label: 'Maintenance', value: '40 hrs/yr', icon: 'timer' },
    { label: 'Soil Health', value: 'Poor', icon: 'worm' },
    { label: 'Carbon Sequestration', value: 'Low', icon: 'globe' },
  ]

  const afterMetrics = [
    { label: 'Water Use', value: '12 gal/sq ft/yr', icon: 'water' },
    { label: 'Species Count', value: '25–45', icon: 'seedling' },
    { label: 'Maintenance', value: '8 hrs/yr', icon: 'timer' },
    { label: 'Soil Health', value: 'Rich', icon: 'worm' },
    { label: 'Carbon Sequestration', value: 'High', icon: 'globe' },
  ]

  return (
    <Section id="ecology" className="bg-sand-dark/50">
      <SectionLabel>Before &amp; After</SectionLabel>
      <h2 className="font-serif text-3xl md:text-5xl text-charcoal mb-4">Ecological Transformation</h2>
      <p className="text-charcoal-light mb-12 max-w-xl">
        Drag the slider to compare a conventional lawn with a converted native landscape.
      </p>

      {/* Visual comparison */}
      <div className="relative rounded-2xl overflow-hidden h-64 md:h-80 mb-12 botanical-border">
        {/* Before side */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-200 via-green-300 to-green-200">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-2 opacity-60"><Icon name="green-square" className="w-16 h-16" /></div>
              <div className="text-sm font-medium text-green-800/70">Conventional Turf</div>
            </div>
          </div>
          {/* Grid pattern for lawn */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(0,80,0,0.1) 20px, rgba(0,80,0,0.1) 21px), repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(0,80,0,0.1) 20px, rgba(0,80,0,0.1) 21px)'
          }} />
        </div>

        {/* After side (clipped) */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-sage/30 via-sand to-clay/20"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl mb-2 flex gap-2 justify-center"><Icon name="grain" className="w-10 h-10" /><Icon name="butterfly" className="w-10 h-10" /><Icon name="flower" className="w-10 h-10" /><Icon name="cactus" className="w-10 h-10" /><Icon name="leaf" className="w-10 h-10" /></div>
              <div className="text-sm font-medium text-sage-dark">Native Ecosystem</div>
            </div>
          </div>
        </div>

        {/* Slider handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-20"
          style={{ left: `${position}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center">
            <span className="text-sage text-xs font-bold">⟨⟩</span>
          </div>
        </div>

        <input
          type="range" min="0" max="100" value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          className="ba-slider"
        />

        {/* Labels */}
        <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 rounded-full text-xs font-semibold text-charcoal">
          Before: Lawn
        </div>
        <div className="absolute top-4 right-4 px-3 py-1.5 bg-sage/90 rounded-full text-xs font-semibold text-white">
          After: Native
        </div>
      </div>

      {/* Metrics comparison */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="botanical-border rounded-xl p-6 bg-sand">
          <h4 className="font-semibold text-charcoal mb-4 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-300" /> Before: Conventional Lawn
          </h4>
          <div className="space-y-3">
            {beforeMetrics.map((m) => (
              <div key={m.label} className="flex justify-between items-center py-2 border-b border-sage/5 last:border-0">
                <span className="text-sm text-charcoal-light flex items-center gap-2">
                  <Icon name={m.icon} className="w-4 h-4" />{m.label}
                </span>
                <span className="font-semibold text-charcoal">{m.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="botanical-border rounded-xl p-6 bg-sand border-sage/30">
          <h4 className="font-semibold text-charcoal mb-4 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-sage" /> After: Native Landscape
          </h4>
          <div className="space-y-3">
            {afterMetrics.map((m) => (
              <div key={m.label} className="flex justify-between items-center py-2 border-b border-sage/5 last:border-0">
                <span className="text-sm text-charcoal-light flex items-center gap-2">
                  <Icon name={m.icon} className="w-4 h-4" />{m.label}
                </span>
                <span className="font-semibold text-sage-dark">{m.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

// ─── 5. Plant Intelligence ───────────────────────────────────────────────────

function PlantIntelligence() {
  const [sunFilter, setSunFilter] = useState('all')
  const [waterFilter, setWaterFilter] = useState('all')
  const [bloomFilter, setBloomFilter] = useState('all')
  const [heightFilter, setHeightFilter] = useState('all')

  const filtered = useMemo(() => {
    return plants.filter(p => {
      if (sunFilter !== 'all' && p.sun !== sunFilter) return false
      if (waterFilter !== 'all' && p.water !== waterFilter) return false
      if (bloomFilter !== 'all' && p.bloom !== bloomFilter) return false
      if (heightFilter !== 'all' && p.height !== heightFilter) return false
      return true
    })
  }, [sunFilter, waterFilter, bloomFilter, heightFilter])

  const filters: { label: string; value: string; setter: (v: string) => void; current: string; options: string[] }[] = [
    { label: 'Sun', value: 'sun', setter: setSunFilter, current: sunFilter, options: ['all', 'full', 'partial', 'shade'] },
    { label: 'Water', value: 'water', setter: setWaterFilter, current: waterFilter, options: ['all', 'low', 'medium', 'high'] },
    { label: 'Bloom', value: 'bloom', setter: setBloomFilter, current: bloomFilter, options: ['all', 'spring', 'summer', 'fall', 'winter', 'none'] },
    { label: 'Height', value: 'height', setter: setHeightFilter, current: heightFilter, options: ['all', 'short', 'medium', 'tall'] },
  ]

  return (
    <Section id="plants">
      <SectionLabel>Plant Intelligence</SectionLabel>
      <h2 className="font-serif text-3xl md:text-5xl text-charcoal mb-4">Choose Your Species</h2>
      <p className="text-charcoal-light mb-8 max-w-xl">
        Filter by conditions to find the right native plants for your site.
      </p>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-10">
        {filters.map((f) => (
          <div key={f.value} className="flex items-center gap-2">
            <span className="text-xs font-semibold text-charcoal-light uppercase tracking-wide">{f.label}:</span>
            <div className="flex gap-1">
              {f.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => f.setter(opt)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    f.current === opt
                      ? 'bg-sage text-white'
                      : 'bg-sand-dark text-charcoal-light hover:bg-sage/10'
                  }`}
                >
                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Results count */}
      <div className="text-sm text-charcoal-light mb-6">
        Showing <span className="font-bold text-sage">{filtered.length}</span> of {plants.length} species
      </div>

      {/* Plant cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((plant) => (
            <motion.div
              key={plant.name}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="botanical-border rounded-xl p-5 bg-sand hover:shadow-lg hover:shadow-sage/5 transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-charcoal">{plant.name}</h4>
                  <p className="text-xs text-charcoal-light italic">{plant.latin}</p>
                </div>
                <div
                  className="w-8 h-8 rounded-full border-2 border-sand-dark"
                  style={{ backgroundColor: plant.color }}
                />
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-sage/10 text-sage-dark capitalize">{plant.sun} sun</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-50 text-blue-700 capitalize">{plant.water} water</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-clay/10 text-clay-dark capitalize">{plant.bloom} bloom</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-sand-dark text-charcoal-light capitalize">{plant.height}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-charcoal-light">Pollinator value:</span>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i} className={`text-xs ${i <= plant.pollinator ? 'text-sage' : 'text-sand-dark'}`}>●</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Section>
  )
}

// ─── 6. Installation Timeline ────────────────────────────────────────────────

function Timeline() {
  return (
    <Section id="timeline" className="bg-sand-dark/50">
      <SectionLabel>Installation Process</SectionLabel>
      <h2 className="font-serif text-3xl md:text-5xl text-charcoal mb-4">From Lawn to Landscape</h2>
      <p className="text-charcoal-light mb-12 max-w-xl">
        A structured 6-phase installation designed for long-term ecological success.
      </p>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-sage/20 md:-translate-x-px" />

        <div className="space-y-12">
          {timelineSteps.map((step, i) => (
            <motion.div
              key={step.phase}
              className="relative flex flex-col md:flex-row items-start gap-6"
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Node */}
              <div className="absolute left-6 md:left-1/2 w-12 h-12 rounded-full bg-sage text-white flex items-center justify-center text-lg shadow-lg shadow-sage/20 -translate-x-1/2 z-10">
                <Icon name={step.icon} className="w-5 h-5" />
              </div>

              {/* Content - alternating sides on desktop */}
              <div className={`ml-20 md:ml-0 md:w-[calc(50%-3rem)] ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto'}`}>
                <div className="botanical-border rounded-xl p-6 bg-sand">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className="text-xs font-bold text-sage bg-sage/10 px-2 py-0.5 rounded">Phase {step.phase}</span>
                    <span className="text-xs text-charcoal-light">{step.duration}</span>
                  </div>
                  <h4 className="font-semibold text-lg text-charcoal mb-2">{step.title}</h4>
                  <p className="text-sm text-charcoal-light leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

// ─── 7. Rebates + Rules ──────────────────────────────────────────────────────

function RebatesRules() {
  return (
    <Section id="rebates">
      <SectionLabel>Financial Support</SectionLabel>
      <h2 className="font-serif text-3xl md:text-5xl text-charcoal mb-4">Rebates &amp; Regulations</h2>
      <p className="text-charcoal-light mb-12 max-w-xl">
        Financial incentives and regulatory guidance to make your conversion smooth and affordable.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Rebates */}
        <div>
          <h3 className="font-semibold text-lg text-charcoal mb-6 flex items-center gap-2">
            <Icon name="money" className="w-5 h-5" /> Available Rebates
          </h3>
          <div className="space-y-4">
            {rebates.map((r) => (
              <div key={r.program} className="botanical-border rounded-xl p-5 bg-sand hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-charcoal text-sm">{r.program}</h4>
                  <span className="text-lg font-bold text-sage">{r.amount}</span>
                </div>
                <div className="flex gap-4 text-xs text-charcoal-light">
                  <span className="flex items-center gap-1"><Icon name="clipboard" className="w-3.5 h-3.5" /> {r.agency}</span>
                  <span className="flex items-center gap-1"><Icon name="calendar" className="w-3.5 h-3.5" /> {r.deadline}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rules & HOA */}
        <div>
          <h3 className="font-semibold text-lg text-charcoal mb-6 flex items-center gap-2">
            <Icon name="scroll" className="w-5 h-5" /> Rules &amp; HOA Compliance
          </h3>
          <div className="space-y-4">
            <div className="botanical-border rounded-xl p-5 bg-sand">
              <h4 className="font-semibold text-charcoal text-sm mb-2">City Water Restrictions</h4>
              <p className="text-sm text-charcoal-light">
                Most municipalities now encourage or mandate turf reduction. Native landscapes often qualify for variance from watering restrictions.
              </p>
            </div>
            <div className="botanical-border rounded-xl p-5 bg-sand">
              <h4 className="font-semibold text-charcoal text-sm mb-2">HOA-Friendly Design</h4>
              <p className="text-sm text-charcoal-light">
                We provide presentation-ready plans with maintenance schedules, plant lists, and aesthetic renderings to satisfy any HOA review board.
              </p>
            </div>
            <div className="botanical-border rounded-xl p-5 bg-sand">
              <h4 className="font-semibold text-charcoal text-sm mb-2">Permit Requirements</h4>
              <p className="text-sm text-charcoal-light">
                Most conversions don't require permits unless modifying grading or irrigation mains. We handle all necessary paperwork.
              </p>
            </div>
            <div className="botanical-border rounded-xl p-5 bg-sand">
              <h4 className="font-semibold text-charcoal text-sm mb-2">Property Value Impact</h4>
              <p className="text-sm text-charcoal-light">
                Studies show xeriscapes and native landscapes increase property values 5–15% while reducing maintenance costs by 60%+.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

// ─── 8. Consultation CTA ─────────────────────────────────────────────────────

function ConsultationCTA() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', lawnSize: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <Section id="consult" className="bg-sand-dark/50">
      <div className="max-w-3xl mx-auto text-center">
        <SectionLabel><span className="mx-auto">Start Your Conversion</span></SectionLabel>
        <h2 className="font-serif text-3xl md:text-5xl text-charcoal mb-4">Ready to Transform?</h2>
        <p className="text-charcoal-light mb-12 max-w-xl mx-auto">
          Get a free site assessment and custom conversion plan. We'll analyze your soil, sun, and water to design your perfect native landscape.
        </p>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="botanical-border rounded-2xl p-8 md:p-12 bg-sand text-left"
            >
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">Name</label>
                  <input
                    type="text" required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-sage/20 bg-sand-dark/30 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20 transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">Email</label>
                  <input
                    type="email" required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-sage/20 bg-sand-dark/30 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20 transition-all"
                    placeholder="you@email.com"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-charcoal mb-2">Approximate Lawn Size</label>
                <select
                  value={formData.lawnSize}
                  onChange={(e) => setFormData({ ...formData, lawnSize: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-sage/20 bg-sand-dark/30 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20 transition-all"
                >
                  <option value="">Select size range</option>
                  <option value="small">Under 1,000 sq ft</option>
                  <option value="medium">1,000 – 3,000 sq ft</option>
                  <option value="large">3,000 – 7,000 sq ft</option>
                  <option value="xlarge">7,000+ sq ft</option>
                </select>
              </div>
              <div className="mb-8">
                <label className="block text-sm font-semibold text-charcoal mb-2">Tell us about your yard</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-sage/20 bg-sand-dark/30 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20 transition-all resize-none"
                  placeholder="Sun exposure, current plants, goals, concerns..."
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-sage text-white font-semibold rounded-lg hover:bg-sage-dark transition-colors shadow-lg shadow-sage/20"
              >
                Request Free Assessment
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="botanical-border rounded-2xl p-12 bg-sand text-center"
            >
              <div className="text-5xl mb-4"><Icon name="seedling" className="w-12 h-12" /></div>
              <h3 className="font-serif text-2xl text-charcoal mb-3">Assessment Requested</h3>
              <p className="text-charcoal-light">
                Thank you! We'll review your site details and reach out within 48 hours with a custom conversion proposal.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Section>
  )
}

// ─── Navigation ──────────────────────────────────────────────────────────────

function Nav() {
  const [open, setOpen] = useState(false)
  const links = [
    { href: '#calculator', label: 'Calculator' },
    { href: '#systems', label: 'Systems' },
    { href: '#ecology', label: 'Ecology' },
    { href: '#plants', label: 'Plants' },
    { href: '#timeline', label: 'Process' },
    { href: '#rebates', label: 'Rebates' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-sand/80 backdrop-blur-lg border-b border-sage/10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-sage flex items-center justify-center">
            <Icon name="leaf" className="w-4 h-4 text-white" />
          </div>
          <span className="font-serif text-lg text-charcoal">NativeLine</span>
        </a>
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-charcoal-light hover:text-sage transition-colors">
              {l.label}
            </a>
          ))}
          <a href="#consult" className="px-4 py-2 bg-sage text-white text-sm font-medium rounded-lg hover:bg-sage-dark transition-colors">
            Get Started
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-charcoal p-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </button>
      </div>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-sand border-t border-sage/10 px-6 py-4 space-y-3"
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block text-sm text-charcoal-light hover:text-sage">
              {l.label}
            </a>
          ))}
          <a href="#consult" onClick={() => setOpen(false)} className="block px-4 py-2 bg-sage text-white text-sm font-medium rounded-lg text-center">
            Get Started
          </a>
        </motion.div>
      )}
    </nav>
  )
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-charcoal text-white/70 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-sage flex items-center justify-center">
                <Icon name="leaf" className="w-4 h-4 text-white" />
              </div>
              <span className="font-serif text-lg text-white">NativeLine Landscapes</span>
            </div>
            <p className="text-sm leading-relaxed">
              Designing climate-smart yards where beauty, water savings, and habitat coexist.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>Lawn Conversion</li>
              <li>Native Plant Design</li>
              <li>Irrigation Retrofit</li>
              <li>Soil Restoration</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>Plant Database</li>
              <li>Rebate Guide</li>
              <li>Maintenance Calendar</li>
              <li>HOA Toolkit</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs">© 2026 NativeLine Landscapes. Ecological design for a changing climate.</p>
          <div className="flex gap-4 text-xs">
            <span className="flex items-center gap-1">Designed with <Icon name="seedling" className="w-4 h-4" /> for biodiversity</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen bg-sand">
      <Nav />
      <main className="pt-16">
        <Hero />
        <Calculator />
        <NativeSystems />
        <BeforeAfter />
        <PlantIntelligence />
        <Timeline />
        <RebatesRules />
        <ConsultationCTA />
      </main>
      <Footer />
    </div>
  )
}
