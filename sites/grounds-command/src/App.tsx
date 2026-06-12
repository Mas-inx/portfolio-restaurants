import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// ─── Data ────────────────────────────────────────────────────────────────────

const portfolioTypes = [
  { type: 'HOAs', count: 47, icon: '⌂', desc: 'Residential communities with shared common areas' },
  { type: 'Retail Centers', count: 23, icon: '▣', desc: 'Shopping plazas, strip malls, big-box perimeters' },
  { type: 'Office Parks', count: 31, icon: '◫', desc: 'Corporate campuses and business park grounds' },
  { type: 'Apartments', count: 58, icon: '▦', desc: 'Multi-family complexes, 50+ unit properties' },
  { type: 'Schools', count: 12, icon: '◰', desc: 'K-12 and higher education campuses' },
  { type: 'Warehouses', count: 19, icon: '▤', desc: 'Industrial parks, logistics centers, distribution' },
]

const dashboardMetrics = [
  { label: 'Visits Completed', value: 847, suffix: '', trend: '+12%' },
  { label: 'Open Issues', value: 23, suffix: '', trend: '-8' },
  { label: 'Crews Active', value: 14, suffix: '', trend: 'On schedule' },
  { label: 'Reports Filed', value: 156, suffix: '', trend: 'This week' },
  { label: 'Weather Holds', value: 3, suffix: '', trend: 'Storm watch' },
  { label: 'SLA Compliance', value: 98.4, suffix: '%', trend: 'Above target' },
]

const services = [
  { name: 'Weekly Service', desc: 'Scheduled mowing, edging, blowing, and debris removal on fixed rotation', frequency: '52 visits/yr', icon: '⟳' },
  { name: 'Irrigation Management', desc: 'System audits, head replacement, controller programming, leak detection', frequency: 'Monthly + emergency', icon: '◉' },
  { name: 'Seasonal Color', desc: 'Rotating bed plantings, annual refreshes, holiday installations', frequency: '4 rotations/yr', icon: '❋' },
  { name: 'Storm Response', desc: '24-hour emergency cleanup, tree removal, drainage clearing, debris haul-off', frequency: 'As needed', icon: '⚡' },
  { name: 'Enhancements', desc: 'Hardscape repair, lighting, mulch installation, drainage solutions', frequency: 'Project-based', icon: '◆' },
]

const reportTypes = [
  { type: 'Inspection Reports', count: 312, desc: 'Monthly property condition assessments with photos and recommendations', status: 'Active' },
  { type: 'Photo Proof', count: 1847, desc: 'Geotagged before/after documentation for every service visit', status: 'Auto-captured' },
  { type: 'Issue Tickets', count: 89, desc: 'Tracked problems from identification through resolution with SLA timers', status: '23 open' },
  { type: 'Account Notes', count: 564, desc: 'Manager observations, client communications, seasonal planning notes', status: 'Updated daily' },
]

const properties = [
  { name: 'Oakwood Estates HOA', address: '1200 Oakwood Dr', status: 'serviced', lastVisit: 'Today 8:15 AM', crew: 'Alpha-3', issues: 0 },
  { name: 'Riverside Retail Center', address: '450 Commerce Blvd', status: 'in-progress', lastVisit: 'Today 10:30 AM', crew: 'Bravo-1', issues: 2 },
  { name: 'Meridian Office Park', address: '8900 Meridian Pkwy', status: 'scheduled', lastVisit: 'Yesterday', crew: 'Alpha-1', issues: 1 },
  { name: 'Lakewood Apartments', address: '2200 Lakeshore Way', status: 'serviced', lastVisit: 'Today 7:00 AM', crew: 'Charlie-2', issues: 0 },
  { name: 'Westfield Industrial', address: '6700 Industrial Dr', status: 'weather-hold', lastVisit: '2 days ago', crew: '—', issues: 3 },
  { name: 'Summit Academy', address: '1500 Education Way', status: 'serviced', lastVisit: 'Today 9:45 AM', crew: 'Bravo-2', issues: 0 },
]

const escalationTypes = [
  { type: 'Storm Cleanup', response: '< 4 hours', desc: 'Tree falls, debris fields, flooding, wind damage across properties', priority: 'Critical' },
  { type: 'Irrigation Failure', response: '< 2 hours', desc: 'Main line breaks, pump failures, controller malfunctions during heat', priority: 'High' },
  { type: 'Safety Hazards', response: '< 1 hour', desc: 'Fallen limbs on walkways, sinkholes, exposed wiring in landscape', priority: 'Critical' },
  { type: 'Equipment Damage', response: '< 6 hours', desc: 'Vehicle damage to property, sprinkler head strikes, fence impacts', priority: 'Medium' },
]

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useCountUp(target: number, duration: number = 2000, start: boolean = true) {
  const [count, setCount] = useState(0)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(eased * target)
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step)
      }
    }
    frameRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frameRef.current)
  }, [target, duration, start])

  return count
}

// ─── Components ──────────────────────────────────────────────────────────────

function WeatherBanner() {
  const [alertState, setAlertState] = useState<'clear' | 'watch' | 'warning'>('watch')
  const states = {
    clear: { bg: 'bg-ops-green-dim', text: 'All Clear — No weather impacts across portfolio', icon: '✓' },
    watch: { bg: 'bg-alert-yellow-dim', text: 'STORM WATCH — Thunderstorm risk 2-8 PM for NE corridor properties', icon: '⚠' },
    warning: { bg: 'bg-red-900', text: 'WEATHER HOLD — 3 properties on service hold until conditions clear', icon: '✕' },
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setAlertState(prev => {
        const order: Array<'clear' | 'watch' | 'warning'> = ['clear', 'watch', 'warning']
        const idx = order.indexOf(prev)
        return order[(idx + 1) % 3]
      })
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`${states[alertState].bg} border-b border-white/10 px-4 py-2 flex items-center gap-3 transition-colors duration-700`}>
      <span className="ops-pulse text-sm">{states[alertState].icon}</span>
      <span className="text-xs font-mono tracking-wide uppercase text-white/90">{states[alertState].text}</span>
      <span className="ml-auto text-xs font-mono text-white/50">LIVE</span>
    </div>
  )
}

function MetricCard({ label, value, suffix, trend, delay }: { label: string; value: number; suffix: string; trend: string; delay: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const count = useCountUp(value, 2000, isInView)
  const displayValue = Number.isInteger(value) ? Math.floor(count) : count.toFixed(1)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: delay * 0.1, duration: 0.5 }}
      className="bg-graphite-800 border border-graphite-700 rounded-lg p-4 hover:border-ops-green/40 transition-colors"
    >
      <div className="text-xs font-mono text-graphite-400 uppercase tracking-wider mb-2">{label}</div>
      <div className="text-2xl font-bold text-white font-mono">
        {displayValue}{suffix}
      </div>
      <div className="text-xs text-ops-green mt-1 font-mono">{trend}</div>
    </motion.div>
  )
}

function RouteMap() {
  const [activeRoute, setActiveRoute] = useState(0)
  const routes = [
    { color: '#10b981', points: 'M 60 120 Q 120 80 180 100 Q 240 120 300 90 Q 360 60 420 80' },
    { color: '#f59e0b', points: 'M 80 200 Q 140 180 200 210 Q 260 240 320 200 Q 380 160 440 190' },
    { color: '#60a5fa', points: 'M 100 280 Q 160 250 220 270 Q 280 290 340 260 Q 400 230 460 260' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRoute(prev => (prev + 1) % routes.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="map-container rounded-lg border border-graphite-700 p-4 relative overflow-hidden">
      <svg viewBox="0 0 520 360" className="w-full h-auto">
        {/* Grid */}
        {Array.from({ length: 13 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="360" stroke="rgba(16,185,129,0.08)" strokeWidth="0.5" />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 40} x2="520" y2={i * 40} stroke="rgba(16,185,129,0.08)" strokeWidth="0.5" />
        ))}

        {/* Property nodes */}
        {[
          [60, 120], [180, 100], [300, 90], [420, 80],
          [80, 200], [200, 210], [320, 200], [440, 190],
          [100, 280], [220, 270], [340, 260], [460, 260],
        ].map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="6" fill={i < 4 ? '#10b981' : i < 8 ? '#f59e0b' : '#60a5fa'} opacity="0.8" />
            <circle cx={cx} cy={cy} r="3" fill="white" opacity="0.9" />
          </g>
        ))}

        {/* Routes */}
        {routes.map((route, i) => (
          <path
            key={i}
            d={route.points}
            fill="none"
            stroke={route.color}
            strokeWidth={i === activeRoute ? '2.5' : '1.5'}
            strokeDasharray="8 4"
            opacity={i === activeRoute ? 1 : 0.3}
            className={i === activeRoute ? 'route-path' : ''}
          />
        ))}
      </svg>

      {/* Legend */}
      <div className="absolute bottom-3 left-3 flex gap-3">
        {['Route A — AM', 'Route B — Mid', 'Route C — PM'].map((label, i) => (
          <div key={i} className={`flex items-center gap-1.5 text-xs font-mono transition-opacity ${i === activeRoute ? 'opacity-100' : 'opacity-40'}`}>
            <span className="w-2 h-2 rounded-full" style={{ background: routes[i].color }} />
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}

function StackedReports() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null)

  return (
    <div ref={ref} className="card-stack space-y-3">
      {reportTypes.map((report, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -30, rotateY: -5 }}
          animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
          transition={{ delay: i * 0.15, duration: 0.6 }}
          onClick={() => setExpandedIdx(expandedIdx === i ? null : i)}
          className="bg-graphite-800 border border-graphite-700 rounded-lg p-4 cursor-pointer hover:border-ops-green/40 transition-all"
          style={{ transform: `translateX(${i * 4}px)` }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-graphite-700 flex items-center justify-center text-ops-green font-mono text-sm">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{report.type}</div>
                <div className="text-xs text-graphite-400 font-mono">{report.count} records</div>
              </div>
            </div>
            <span className="text-xs font-mono px-2 py-1 rounded bg-graphite-700 text-graphite-300">{report.status}</span>
          </div>
          <AnimatePresence>
            {expandedIdx === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <p className="text-xs text-graphite-400 mt-3 pt-3 border-t border-graphite-700">{report.desc}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}

function MultiSiteWorkflow() {
  const [selectedProperty, setSelectedProperty] = useState(0)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <RouteMap />
      <div className="space-y-2">
        {properties.map((prop, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            onClick={() => setSelectedProperty(i)}
            className={`p-3 rounded-lg border cursor-pointer transition-all ${
              selectedProperty === i
                ? 'bg-graphite-800 border-ops-green/50'
                : 'bg-graphite-900 border-graphite-700 hover:border-graphite-600'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`status-dot ${
                  prop.status === 'serviced' ? 'status-dot-active' :
                  prop.status === 'in-progress' ? 'status-dot-active ops-pulse' :
                  prop.status === 'weather-hold' ? 'status-dot-alert' :
                  'status-dot-alert'
                }`} />
                <span className="text-sm font-medium text-white">{prop.name}</span>
              </div>
              <span className={`text-xs font-mono px-2 py-0.5 rounded ${
                prop.status === 'serviced' ? 'bg-ops-green-dim text-ops-green-glow' :
                prop.status === 'in-progress' ? 'bg-blue-900/50 text-blue-300' :
                prop.status === 'weather-hold' ? 'bg-alert-yellow-dim text-alert-yellow' :
                'bg-graphite-700 text-graphite-300'
              }`}>
                {prop.status}
              </span>
            </div>
            <div className="flex items-center gap-4 mt-1.5 ml-5 text-xs text-graphite-400 font-mono">
              <span>{prop.address}</span>
              <span>Crew: {prop.crew}</span>
              {prop.issues > 0 && <span className="text-alert-yellow">{prop.issues} issues</span>}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ─── Main App ────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen bg-graphite-950">
      <WeatherBanner />

      {/* ── Section 1: Hero ───────────────────────────────────────────────── */}
      <section className="relative grid-bg overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="status-dot status-dot-active ops-pulse" />
              <span className="text-xs font-mono text-ops-green uppercase tracking-widest">Operations Active — 190 Properties Under Management</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight max-w-4xl">
              Grounds maintenance for properties that cannot afford guesswork.
            </h1>
            <p className="mt-6 text-lg text-graphite-300 max-w-2xl">
              Real-time visibility across your entire portfolio. Every visit documented, every issue tracked, every crew accountable.
            </p>
          </motion.div>

          {/* Status cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-12">
            {dashboardMetrics.map((m, i) => (
              <MetricCard key={i} label={m.label} value={m.value} suffix={m.suffix} trend={m.trend} delay={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 2: Portfolio Coverage ─────────────────────────────────── */}
      <section className="border-t border-graphite-800">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex items-baseline justify-between mb-10">
            <div>
              <h2 className="text-2xl font-bold text-white">Portfolio Coverage</h2>
              <p className="text-sm text-graphite-400 mt-1 font-mono">Property types under active management</p>
            </div>
            <span className="text-xs font-mono text-graphite-500">190 TOTAL PROPERTIES</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {portfolioTypes.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-graphite-900 border border-graphite-700 rounded-lg p-5 hover:border-ops-green/30 transition-colors group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl text-graphite-500 group-hover:text-ops-green transition-colors">{item.icon}</span>
                  <span className="text-xl font-bold font-mono text-white">{item.count}</span>
                </div>
                <h3 className="text-sm font-semibold text-white">{item.type}</h3>
                <p className="text-xs text-graphite-400 mt-1">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: Maintenance Command Center ─────────────────────────── */}
      <section className="border-t border-graphite-800 bg-graphite-900">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex items-baseline justify-between mb-10">
            <div>
              <h2 className="text-2xl font-bold text-white">Maintenance Command Center</h2>
              <p className="text-sm text-graphite-400 mt-1 font-mono">Live operations dashboard — updated every 60 seconds</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="status-dot status-dot-active ops-pulse" />
              <span className="text-xs font-mono text-ops-green">LIVE</span>
            </div>
          </div>

          {/* Dashboard grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Main metrics */}
            <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-3">
              {dashboardMetrics.map((m, i) => (
                <MetricCard key={i} label={m.label} value={m.value} suffix={m.suffix} trend={m.trend} delay={i} />
              ))}
            </div>

            {/* Crew schedule */}
            <div className="bg-graphite-800 border border-graphite-700 rounded-lg p-4">
              <div className="text-xs font-mono text-graphite-400 uppercase tracking-wider mb-3">Crew Schedule — Today</div>
              <div className="space-y-2">
                {['Alpha-1 → Meridian Office', 'Alpha-3 → Oakwood Estates', 'Bravo-1 → Riverside Retail', 'Bravo-2 → Summit Academy', 'Charlie-2 → Lakewood Apts'].map((task, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-mono">
                    <span className={`w-1.5 h-1.5 rounded-full ${i < 3 ? 'bg-ops-green' : i < 4 ? 'bg-blue-400' : 'bg-graphite-500'}`} />
                    <span className="text-graphite-200">{task}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-graphite-700 text-xs text-graphite-400 font-mono">
                14 crews • 9 routes • 47 stops remaining
              </div>
            </div>
          </div>

          {/* Activity feed */}
          <div className="mt-4 bg-graphite-800 border border-graphite-700 rounded-lg p-4">
            <div className="text-xs font-mono text-graphite-400 uppercase tracking-wider mb-3">Recent Activity</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
              {[
                { time: '10:42', text: 'Bravo-1 completed Riverside Retail — mow + detail', status: 'done' },
                { time: '10:38', text: 'Issue #847 opened: irrigation leak at Lakewood Bldg 3', status: 'alert' },
                { time: '10:30', text: 'Alpha-3 arrived at Oakwood Estates — gate check-in', status: 'active' },
                { time: '10:15', text: 'Weather hold lifted for Westfield Industrial', status: 'info' },
              ].map((item, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-graphite-500 shrink-0">{item.time}</span>
                  <span className={`${
                    item.status === 'done' ? 'text-ops-green' :
                    item.status === 'alert' ? 'text-alert-yellow' :
                    item.status === 'active' ? 'text-blue-300' :
                    'text-graphite-300'
                  }`}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 4: Programs ───────────────────────────────────────────── */}
      <section className="border-t border-graphite-800">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white">Service Programs</h2>
            <p className="text-sm text-graphite-400 mt-1 font-mono">Modular programs tailored to property requirements</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((svc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-graphite-900 border border-graphite-700 rounded-lg p-5 hover:border-ops-green/30 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl text-ops-green">{svc.icon}</span>
                  <span className="text-xs font-mono text-graphite-500 bg-graphite-800 px-2 py-0.5 rounded">{svc.frequency}</span>
                </div>
                <h3 className="text-sm font-semibold text-white mb-2">{svc.name}</h3>
                <p className="text-xs text-graphite-400 leading-relaxed">{svc.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 5: Reporting ──────────────────────────────────────────── */}
      <section className="border-t border-graphite-800 bg-graphite-900">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Reporting & Documentation</h2>
              <p className="text-sm text-graphite-400 mb-8">Every action documented. Every property auditable. Full transparency for owners, boards, and stakeholders.</p>
              <StackedReports />
            </div>
            <div className="space-y-4">
              <div className="bg-graphite-800 border border-graphite-700 rounded-lg p-5">
                <div className="text-xs font-mono text-graphite-400 uppercase tracking-wider mb-4">Sample Report — Oakwood Estates</div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-graphite-700">
                    <span className="text-sm text-white">Monthly Inspection</span>
                    <span className="text-xs font-mono text-ops-green">COMPLETED</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div><span className="text-graphite-500">Date:</span> <span className="text-graphite-200">Jun 1, 2026</span></div>
                    <div><span className="text-graphite-500">Inspector:</span> <span className="text-graphite-200">J. Martinez</span></div>
                    <div><span className="text-graphite-500">Photos:</span> <span className="text-graphite-200">47 captured</span></div>
                    <div><span className="text-graphite-500">Issues:</span> <span className="text-graphite-200">2 noted</span></div>
                  </div>
                  <div className="pt-2 border-t border-graphite-700">
                    <span className="text-xs text-graphite-400">Notes: Common area irrigation zone 3 showing reduced pressure. Recommend head inspection within 2 weeks. Overall turf health good — summer program on track.</span>
                  </div>
                </div>
              </div>
              <div className="bg-graphite-800 border border-graphite-700 rounded-lg p-5">
                <div className="text-xs font-mono text-graphite-400 uppercase tracking-wider mb-3">Photo Proof — Latest Captures</div>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="aspect-square bg-graphite-700 rounded flex items-center justify-center text-graphite-500 text-xs font-mono">
                      IMG-{String(847 + i).padStart(4, '0')}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 6: Multi-Site Workflow ────────────────────────────────── */}
      <section className="border-t border-graphite-800">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white">Multi-Site Workflow</h2>
            <p className="text-sm text-graphite-400 mt-1 font-mono">Route optimization and real-time property status across your portfolio</p>
          </div>
          <MultiSiteWorkflow />
        </div>
      </section>

      {/* ── Section 7: Response + Escalation ──────────────────────────────── */}
      <section className="border-t border-graphite-800 bg-graphite-900">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white">Response & Escalation</h2>
            <p className="text-sm text-graphite-400 mt-1 font-mono">Guaranteed response times for critical ground events</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {escalationTypes.map((esc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-graphite-800 border border-graphite-700 rounded-lg p-5 hover:border-ops-green/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-white">{esc.type}</h3>
                  <span className={`text-xs font-mono px-2 py-0.5 rounded ${
                    esc.priority === 'Critical' ? 'bg-red-900/50 text-red-300' :
                    esc.priority === 'High' ? 'bg-alert-yellow-dim text-alert-yellow' :
                    'bg-graphite-700 text-graphite-300'
                  }`}>{esc.priority}</span>
                </div>
                <p className="text-xs text-graphite-400 mb-3">{esc.desc}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-ops-green">Response: {esc.response}</span>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-6 bg-graphite-800 border border-graphite-700 rounded-lg p-4 flex items-center gap-4">
            <span className="text-2xl">⚡</span>
            <div>
              <div className="text-sm font-semibold text-white">24/7 Emergency Dispatch</div>
              <div className="text-xs text-graphite-400 font-mono">Direct line to on-call operations manager. Average response acknowledgment: 8 minutes.</div>
            </div>
            <span className="ml-auto text-xs font-mono text-ops-green bg-ops-green-dim px-3 py-1.5 rounded">ACTIVE</span>
          </div>
        </div>
      </section>

      {/* ── Section 8: Commercial CTA ─────────────────────────────────────── */}
      <section className="border-t border-graphite-800">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">Ready to bring your grounds under command?</h2>
              <p className="text-graphite-300 mb-6">Tell us about your portfolio and we'll build a custom operations plan with transparent pricing, dedicated crews, and full reporting access.</p>
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { num: '190+', label: 'Properties' },
                  { num: '98.4%', label: 'SLA Rate' },
                  { num: '< 2hr', label: 'Response' },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-xl font-bold font-mono text-ops-green">{stat.num}</div>
                    <div className="text-xs text-graphite-400 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-graphite-900 border border-graphite-700 rounded-lg p-6">
              <div className="text-xs font-mono text-graphite-400 uppercase tracking-wider mb-4">Portfolio Assessment</div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-graphite-400 font-mono block mb-1">Property Count</label>
                  <select className="w-full bg-graphite-800 border border-graphite-700 rounded px-3 py-2 text-sm text-white font-mono">
                    <option>1–5 properties</option>
                    <option>6–15 properties</option>
                    <option>16–50 properties</option>
                    <option>50+ properties</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-graphite-400 font-mono block mb-1">Service Needs</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Weekly Mowing', 'Irrigation', 'Seasonal Color', 'Storm Response', 'Enhancements', 'Full Program'].map((svc, i) => (
                      <label key={i} className="flex items-center gap-2 text-xs text-graphite-300 cursor-pointer">
                        <input type="checkbox" className="accent-emerald-500" />
                        {svc}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-graphite-400 font-mono block mb-1">Contact</label>
                  <input type="email" placeholder="property@management.com" className="w-full bg-graphite-800 border border-graphite-700 rounded px-3 py-2 text-sm text-white font-mono placeholder:text-graphite-600" />
                </div>
                <button className="w-full bg-ops-green hover:bg-ops-green-glow text-graphite-950 font-semibold py-3 rounded transition-colors text-sm">
                  Request Portfolio Assessment
                </button>
                <p className="text-xs text-graphite-500 font-mono text-center">Response within 24 hours • No obligation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-graphite-800 py-8 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-white tracking-tight">GROUNDS COMMAND</span>
            <span className="text-xs text-graphite-500 font-mono">v2.4.1</span>
          </div>
          <div className="text-xs text-graphite-500 font-mono">
            Commercial Grounds Operations Platform
          </div>
        </div>
      </footer>
    </div>
  )
}
