import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'

// ─── Icon Component ──────────────────────────────────────────────────────────
function Icon({ name, className = 'w-6 h-6' }: { name: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    pickaxe: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M14 4l6 6-3 3-6-6" /><path strokeLinecap="round" strokeLinejoin="round" d="M14 4L8 10l-4 10 10-4 6-6" /><path strokeLinecap="round" d="M10 8l6 6" /></svg>,
    diamond: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2l10 10-10 10L2 12z" /></svg>,
    'square-filled': <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="4" width="16" height="16" rx="1" fill="currentColor" opacity="0.2" /><rect x="4" y="4" width="16" height="16" rx="1" /></svg>,
    rectangle: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="8" width="20" height="8" rx="1" /></svg>,
    arrow: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" /></svg>,
    target: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></svg>,
    check: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5" /></svg>,
  }
  return <>{icons[name] || null}</>
}

// ─── Data ────────────────────────────────────────────────────────────────────

const scopeItems = [
  { id: 'clearing', title: 'Clearing & Grubbing', desc: 'Vegetation removal, root extraction, debris clearing for unobstructed site access.' },
  { id: 'excavation', title: 'Mass Excavation', desc: 'Bulk earthmoving to subgrade, controlled cuts to engineered depths and tolerances.' },
  { id: 'grading', title: 'Fine Grading', desc: 'Precision surface shaping to design grades within ±0.05\' tolerance for pad readiness.' },
  { id: 'drainage', title: 'Storm Drainage', desc: 'Pipe installation, catch basins, channel grading, and outfall construction.' },
  { id: 'utilities', title: 'Utility Trenching', desc: 'Open-cut and guided boring for water, sewer, gas, electric, and telecom infrastructure.' },
  { id: 'compaction', title: 'Compaction', desc: 'Lift-by-lift soil compaction to 95% SW proctor for structural fill and subgrade.' },
  { id: 'roads', title: 'Access Roads', desc: 'Temporary and permanent haul road construction with aggregate base courses.' },
]

const siteMetrics = [
  { label: 'Elevation', value: '1,247.3', unit: 'ft MSL', status: 'verified' },
  { label: 'Slope Grade', value: '2.4', unit: '% avg', status: 'active' },
  { label: 'Drainage Risk', value: 'LOW', unit: 'Class II', status: 'nominal' },
  { label: 'Soil Class', value: 'SC', unit: 'CL/ML mix', status: 'tested' },
  { label: 'Bearing', value: '2,500', unit: 'psf', status: 'confirmed' },
  { label: 'Water Table', value: '18.5', unit: 'ft bgs', status: 'monitoring' },
  { label: 'Cut Volume', value: '14,200', unit: 'CY', status: 'calculated' },
  { label: 'Fill Volume', value: '8,900', unit: 'CY', status: 'calculated' },
]

const equipment = [
  { name: 'CAT 390F Excavator', weight: '198,000 lb', use: 'Mass excavation, deep trenching, rock handling', bucket: '7.5 yd³', icon: 'pickaxe' },
  { name: 'CAT D8T Dozer', weight: '74,500 lb', use: 'Push work, spread, rough grading, ripping', blade: '13.5 ft SU', icon: 'diamond' },
  { name: 'CAT 980M Loader', weight: '72,000 lb', use: 'Material handling, truck loading, stockpile management', bucket: '7.0 yd³', icon: 'square-filled' },
  { name: 'CAT 14M Grader', weight: '55,000 lb', use: 'Fine grading, slope cutting, road crown shaping', blade: '16 ft', icon: 'rectangle' },
  { name: 'CAT 745 Hauler', weight: '46,000 lb', use: 'Off-highway material transport, spoil removal', capacity: '36 tons', icon: 'arrow' },
  { name: 'CAT CS78B Compactor', weight: '40,000 lb', use: 'Lift compaction, subgrade proof rolling', drum: '84 in', icon: 'target' },
]

const sequence = [
  { step: '01', title: 'Survey & Layout', desc: 'GPS control, boundary staking, grade stakes, existing conditions documentation', duration: '1-3 days' },
  { step: '02', title: 'Clearing', desc: 'Vegetation removal, topsoil stripping and stockpiling, erosion control BMPs', duration: '3-7 days' },
  { step: '03', title: 'Cut/Fill Balance', desc: 'Mass grading to engineered subgrade, cut/fill optimization, import/export coordination', duration: '2-6 weeks' },
  { step: '04', title: 'Trenching', desc: 'Utility corridor excavation, pipe bedding, lateral connections, backfill', duration: '1-4 weeks' },
  { step: '05', title: 'Drainage', desc: 'Storm sewer, detention, channel work, outfall stabilization, inlet structures', duration: '1-3 weeks' },
  { step: '06', title: 'Compaction', desc: 'Lift testing, proof rolling, subgrade verification, density testing', duration: '3-5 days' },
  { step: '07', title: 'Final Handoff', desc: 'As-built survey, final grade verification, erosion stabilization, site release', duration: '2-4 days' },
]

const complianceItems = [
  { title: 'Erosion & Sediment Control', items: ['Silt fence installation', 'Stabilized construction entrances', 'Inlet protection', 'Dewatering management'] },
  { title: 'Stormwater Management', items: ['SWPPP compliance', 'Detention/retention facilities', 'Outfall monitoring', 'Discharge sampling'] },
  { title: 'Utility Locates', items: ['811 notification', 'Private utility locate', 'Potholing verification', 'Conflict resolution'] },
  { title: 'Inspection Readiness', items: ['Pre-grading inspections', 'Compaction test reports', 'Utility bedding verification', 'Final as-built documentation'] },
]

const projectTypes = [
  { type: 'Subdivisions', acres: '20-500 ac', scope: 'Residential lot grading, infrastructure, road base' },
  { type: 'Commercial Pads', acres: '2-50 ac', scope: 'Building pads, parking subgrades, utility corridors' },
  { type: 'Road Construction', acres: 'Linear', scope: 'Roadway grading, base courses, drainage, intersections' },
  { type: 'Industrial Yards', acres: '10-200 ac', scope: 'Heavy-duty pad prep, truck courts, stormwater' },
  { type: 'Retaining Prep', acres: 'Variable', scope: 'Bench cutting, key excavation, backfill zones' },
]

// ─── Components ──────────────────────────────────────────────────────────────

function AnimatedValue({ value, suffix = '' }: { value: string; suffix?: string }) {
  const [display, setDisplay] = useState('0')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    const numericPart = value.replace(/[^0-9.]/g, '')
    const num = parseFloat(numericPart)
    if (isNaN(num)) {
      setDisplay(value)
      return
    }
    const prefix = value.match(/^[^0-9]*/)?.[0] || ''
    const isInt = !value.includes('.')
    const duration = 1200
    const start = performance.now()
    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = num * eased
      const formatted = isInt ? Math.round(current).toLocaleString() : current.toFixed(1)
      setDisplay(prefix + formatted)
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isInView, value])

  return <span ref={ref}>{display}{suffix}</span>
}

function SectionLabel({ num, text }: { num: string; text: string }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="font-mono text-xs text-survey tracking-widest">{num}</span>
      <div className="h-px flex-1 bg-survey/30" />
      <span className="font-mono text-xs text-cream/60 uppercase tracking-widest">{text}</span>
    </div>
  )
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 150])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center topo-bg overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 topo-parallax opacity-30" />
      <div className="absolute inset-0 survey-grid" />
      
      {/* Coordinate markers */}
      <div className="absolute top-8 left-8 font-mono text-xs text-cream/40">
        <div>N 35°14'22.7"</div>
        <div>W 80°50'41.3"</div>
      </div>
      <div className="absolute top-8 right-8 font-mono text-xs text-cream/40 text-right">
        <div>ELEV: 1,247.3 FT</div>
        <div>DATUM: NAVD88</div>
      </div>
      <div className="absolute bottom-8 left-8 font-mono text-xs text-cream/40">
        <div>PROJ: GZC-2026-0412</div>
        <div>SCALE: 1"=50'</div>
      </div>
      <div className="absolute bottom-8 right-8 font-mono text-xs text-cream/40 text-right">
        <div>STATUS: ACTIVE</div>
        <div>LAST SURVEY: 06.11.26</div>
      </div>

      {/* Crosshair center mark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="w-32 h-32 border border-survey/20 rounded-full" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-survey/10" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-survey/10" />
      </div>

      <motion.div style={{ opacity }} className="relative z-10 text-center px-6 max-w-4xl">
        <div className="font-mono text-xs text-survey tracking-[0.3em] mb-6 uppercase">
          Excavation & Site Development
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-cream leading-[0.9] mb-8 tracking-tight">
          From raw land to<br />
          <span className="text-survey">build-ready ground.</span>
        </h1>
        <p className="font-mono text-sm text-cream/60 max-w-xl mx-auto leading-relaxed">
          Precision earthwork. Engineered grades. Civil infrastructure from first stake to final handoff.
        </p>
        <div className="mt-12 flex items-center justify-center gap-6">
          <a href="#evaluation" className="px-8 py-3 bg-survey text-asphalt font-bold text-sm uppercase tracking-wider rounded hover:bg-survey-dark transition-colors">
            Request Evaluation
          </a>
          <a href="#scope" className="px-8 py-3 border border-cream/20 text-cream font-mono text-sm uppercase tracking-wider rounded hover:border-survey/50 transition-colors">
            View Scope
          </a>
        </div>
      </motion.div>

      {/* Bottom grade line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-survey/40 to-transparent" />
    </section>
  )
}

// ─── Scope of Work ───────────────────────────────────────────────────────────

function Scope() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="scope" ref={ref} className="relative py-32 px-6 topo-bg-alt">
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionLabel num="02" text="Scope of Work" />
        <h2 className="text-4xl md:text-5xl font-black text-cream mb-4">What We Move</h2>
        <p className="font-mono text-sm text-cream/50 mb-16 max-w-2xl">
          Full-spectrum site development from initial clearing through final grade verification.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {scopeItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="p-6 bg-asphalt/60 border border-cream/10 rounded hover:border-survey/40 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-xs text-survey">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-bold text-cream group-hover:text-survey transition-colors">{item.title}</h3>
              </div>
              <p className="text-sm text-cream/50 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Site Intelligence ───────────────────────────────────────────────────────

function SiteIntelligence() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="intelligence" ref={ref} className="relative py-32 px-6 topo-bg">
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionLabel num="03" text="Site Intelligence" />
        <h2 className="text-4xl md:text-5xl font-black text-cream mb-4">Survey Data Panel</h2>
        <p className="font-mono text-sm text-cream/50 mb-16 max-w-2xl">
          Real-time site conditions from geotechnical investigation and topographic survey.
        </p>

        <div className="bg-asphalt-light/80 border border-survey/20 rounded-lg p-6 md:p-8">
          {/* Panel header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-cream/10">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-mono text-xs text-cream/60 uppercase">Live Survey Feed</span>
            </div>
            <span className="font-mono text-xs text-cream/40">Updated: 06.12.2026 10:14 UTC</span>
          </div>

          {/* Metrics grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {siteMetrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="p-4 bg-asphalt/60 border border-cream/5 rounded"
              >
                <div className="font-mono text-[10px] text-cream/40 uppercase tracking-wider mb-2">{metric.label}</div>
                <div className="font-mono text-xl md:text-2xl font-bold text-survey survey-value">
                  {isInView && <AnimatedValue value={metric.value} />}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-mono text-[10px] text-cream/50">{metric.unit}</span>
                  <span className="font-mono text-[9px] text-green-400/70 uppercase">{metric.status}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom status bar */}
          <div className="mt-6 pt-4 border-t border-cream/10 flex flex-wrap items-center gap-4">
            <span className="font-mono text-[10px] text-cream/40">CTRL PTS: 12 SET</span>
            <span className="font-mono text-[10px] text-cream/40">GPS: RTK FIXED</span>
            <span className="font-mono text-[10px] text-cream/40">ACCURACY: ±0.02 FT</span>
            <span className="font-mono text-[10px] text-cream/40">PROJ: GZC-2026-0412</span>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Equipment Fleet ─────────────────────────────────────────────────────────

function EquipmentFleet() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="fleet" ref={ref} className="relative py-32 px-6 topo-bg-alt">
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionLabel num="04" text="Equipment Fleet" />
        <h2 className="text-4xl md:text-5xl font-black text-cream mb-4">Iron Inventory</h2>
        <p className="font-mono text-sm text-cream/50 mb-16 max-w-2xl">
          Owned and operated fleet — maintained, inspected, and mobilized for your project timeline.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {equipment.map((machine, i) => (
            <motion.div
              key={machine.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="equipment-card p-6 bg-asphalt/80 rounded-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="equipment-icon text-3xl"><Icon name={machine.icon} /></span>
                <span className="font-mono text-[10px] text-cream/30 uppercase">Unit {String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="font-bold text-cream text-lg mb-1">{machine.name}</h3>
              <div className="font-mono text-xs text-survey mb-3">{machine.weight}</div>
              <p className="text-sm text-cream/50 mb-4">{machine.use}</p>
              <div className="pt-3 border-t border-cream/10">
                <span className="font-mono text-[10px] text-cream/40 uppercase">
                  {machine.bucket ? `Bucket: ${machine.bucket}` : machine.capacity ? `Capacity: ${machine.capacity}` : `Blade: ${machine.blade}`}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Development Sequence ────────────────────────────────────────────────────

function DevelopmentSequence() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <section id="sequence" ref={containerRef} className="relative py-32 topo-bg">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <SectionLabel num="05" text="Development Sequence" />
        <h2 className="text-4xl md:text-5xl font-black text-cream mb-4">Phase Progression</h2>
        <p className="font-mono text-sm text-cream/50 mb-8 max-w-2xl">
          Horizontal workflow from survey stake to site release. Scroll through each phase.
        </p>
        <div className="font-mono text-xs text-cream/30 mb-6">← SCROLL HORIZONTALLY →</div>
      </div>

      <div ref={scrollRef} className="sequence-scroll px-6 pb-4">
        <div className="flex gap-4 pr-6">
          {sequence.map((phase, i) => (
            <motion.div
              key={phase.step}
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="sequence-card w-72 md:w-80 flex-shrink-0"
            >
              <div className="h-full p-6 bg-asphalt-light/80 border border-cream/10 rounded-lg hover:border-survey/40 transition-colors relative overflow-hidden">
                {/* Step number watermark */}
                <div className="absolute top-4 right-4 font-mono text-6xl font-black text-cream/5">{phase.step}</div>
                
                <div className="relative z-10">
                  <div className="font-mono text-xs text-survey mb-2">PHASE {phase.step}</div>
                  <h3 className="font-bold text-cream text-xl mb-3">{phase.title}</h3>
                  <p className="text-sm text-cream/50 leading-relaxed mb-4">{phase.desc}</p>
                  <div className="pt-3 border-t border-cream/10">
                    <span className="font-mono text-[10px] text-cream/40 uppercase">Duration: {phase.duration}</span>
                  </div>
                </div>

                {/* Progress connector */}
                {i < sequence.length - 1 && (
                  <div className="absolute top-1/2 -right-4 w-4 h-px bg-survey/40" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Compliance ──────────────────────────────────────────────────────────────

function Compliance() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="compliance" ref={ref} className="relative py-32 px-6 topo-bg-alt">
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionLabel num="06" text="Compliance" />
        <h2 className="text-4xl md:text-5xl font-black text-cream mb-4">Regulatory Readiness</h2>
        <p className="font-mono text-sm text-cream/50 mb-16 max-w-2xl">
          Every phase documented, every permit tracked, every inspection passed.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {complianceItems.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="p-6 bg-asphalt/60 border border-cream/10 rounded-lg"
            >
              <h3 className="font-bold text-survey text-lg mb-4">{group.title}</h3>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-cream/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-survey/60 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Project Types ───────────────────────────────────────────────────────────

function ProjectTypes() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" ref={ref} className="relative py-32 px-6 topo-bg">
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionLabel num="07" text="Project Types" />
        <h2 className="text-4xl md:text-5xl font-black text-cream mb-4">What We Build On</h2>
        <p className="font-mono text-sm text-cream/50 mb-16 max-w-2xl">
          Proven across project scales — from pad sites to 500-acre master-planned communities.
        </p>

        <div className="space-y-3">
          {projectTypes.map((project, i) => (
            <motion.div
              key={project.type}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="flex flex-col md:flex-row md:items-center gap-4 p-5 bg-asphalt-light/60 border border-cream/10 rounded hover:border-survey/30 transition-colors group"
            >
              <div className="md:w-48">
                <h3 className="font-bold text-cream text-lg group-hover:text-survey transition-colors">{project.type}</h3>
              </div>
              <div className="md:w-24">
                <span className="font-mono text-xs text-survey bg-survey/10 px-2 py-1 rounded">{project.acres}</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-cream/50">{project.scope}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Evaluation CTA ──────────────────────────────────────────────────────────

function EvaluationCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [submitted, setSubmitted] = useState(false)

  return (
    <section id="evaluation" ref={ref} className="relative py-32 px-6 topo-bg-alt">
      <div className="max-w-4xl mx-auto relative z-10">
        <SectionLabel num="08" text="Site Evaluation" />
        <h2 className="text-4xl md:text-5xl font-black text-cream mb-4">Request Evaluation</h2>
        <p className="font-mono text-sm text-cream/50 mb-12 max-w-2xl">
          Submit site parameters for preliminary assessment. We'll respond with scope, timeline, and mobilization plan.
        </p>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-[10px] text-cream/40 uppercase tracking-wider block mb-2">Project Name</label>
                  <input type="text" className="site-input w-full" placeholder="e.g., Riverside Commerce Park" required />
                </div>
                <div>
                  <label className="font-mono text-[10px] text-cream/40 uppercase tracking-wider block mb-2">Contact</label>
                  <input type="text" className="site-input w-full" placeholder="Name / Company" required />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="font-mono text-[10px] text-cream/40 uppercase tracking-wider block mb-2">Site Acreage</label>
                  <input type="text" className="site-input w-full" placeholder="e.g., 45 acres" />
                </div>
                <div>
                  <label className="font-mono text-[10px] text-cream/40 uppercase tracking-wider block mb-2">Current Condition</label>
                  <select className="site-input w-full">
                    <option value="">Select...</option>
                    <option>Raw Land</option>
                    <option>Agricultural</option>
                    <option>Previously Developed</option>
                    <option>Wooded/Forested</option>
                  </select>
                </div>
                <div>
                  <label className="font-mono text-[10px] text-cream/40 uppercase tracking-wider block mb-2">Target Start</label>
                  <input type="text" className="site-input w-full" placeholder="e.g., Q3 2026" />
                </div>
              </div>
              <div>
                <label className="font-mono text-[10px] text-cream/40 uppercase tracking-wider block mb-2">Site Address / Location</label>
                <input type="text" className="site-input w-full" placeholder="Address or GPS coordinates" />
              </div>
              <div>
                <label className="font-mono text-[10px] text-cream/40 uppercase tracking-wider block mb-2">Scope Notes</label>
                <textarea className="site-input w-full h-28 resize-none" placeholder="Describe project scope, special conditions, timeline constraints..." />
              </div>
              <button type="submit" className="mt-4 px-10 py-4 bg-survey text-asphalt font-bold text-sm uppercase tracking-wider rounded hover:bg-survey-dark transition-colors">
                Submit for Evaluation
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="text-5xl mb-4"><Icon name="check" className="w-12 h-12" /></div>
              <h3 className="text-2xl font-bold text-cream mb-2">Evaluation Requested</h3>
              <p className="font-mono text-sm text-cream/50">Our team will review site parameters and respond within 48 hours.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="relative py-12 px-6 bg-asphalt border-t border-cream/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-black text-xl text-cream tracking-tight">GRADEZERO</span>
          <span className="font-mono text-xs text-survey">CIVIL</span>
        </div>
        <div className="font-mono text-xs text-cream/30">
          © 2026 GradeZero Civil — Excavation & Site Development
        </div>
        <div className="font-mono text-xs text-cream/30">
          Licensed • Bonded • Insured
        </div>
      </div>
    </footer>
  )
}

// ─── Navigation ──────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-asphalt/95 backdrop-blur-sm border-b border-cream/10' : ''}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-black text-lg text-cream tracking-tight">GZ</span>
          <span className="font-mono text-[10px] text-survey">CIVIL</span>
        </div>
        <div className="hidden md:flex items-center gap-6 font-mono text-xs text-cream/50">
          <a href="#scope" className="hover:text-survey transition-colors">Scope</a>
          <a href="#intelligence" className="hover:text-survey transition-colors">Survey</a>
          <a href="#fleet" className="hover:text-survey transition-colors">Fleet</a>
          <a href="#sequence" className="hover:text-survey transition-colors">Sequence</a>
          <a href="#evaluation" className="hover:text-survey transition-colors">Evaluate</a>
        </div>
      </div>
    </nav>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <Scope />
      <SiteIntelligence />
      <EquipmentFleet />
      <DevelopmentSequence />
      <Compliance />
      <ProjectTypes />
      <EvaluationCTA />
      <Footer />
    </div>
  )
}
