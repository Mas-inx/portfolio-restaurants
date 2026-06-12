import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useScroll, AnimatePresence } from 'framer-motion';
import { siteData } from './data';

// ─── Utility: Count-up animation hook ───────────────────────────────────────
function useCountUp(end: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    let animFrame: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        animFrame = requestAnimationFrame(step);
      }
    };
    animFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animFrame);
  }, [end, duration, start]);
  return count;
}

// ─── Section Wrapper ────────────────────────────────────────────────────────
function Section({ children, id, className = '', dark = false }: { children: React.ReactNode; id: string; className?: string; dark?: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <motion.section
      ref={ref}
      id={id}
      className={`${className} ${dark ? 'bg-navy text-white' : 'bg-white text-navy'}`}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  );
}

// ─── Metric Card with Count-Up ──────────────────────────────────────────────
function MetricCard({ value, label, detail, index }: { value: string; label: string; detail: string; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const numericMatch = value.match(/[\d.]+/);
  const numericEnd = numericMatch ? parseFloat(numericMatch[0]) : 0;
  const count = useCountUp(numericEnd * (value.includes('M') || value.includes('B') ? 10 : 100), 2000, isInView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className="relative p-6 border border-steel/20 bg-white/5 backdrop-blur-sm"
    >
      <div className="absolute top-0 left-0 w-full h-[2px] bg-signal-yellow" />
      <div className="data-number text-4xl md:text-5xl font-bold text-white mb-2">
        {isInView ? (value.includes('%') ? `${(count / 100).toFixed(1)}%` : value.includes('M+') ? `${count / 10}M+` : value.includes('$') ? `$${(count / 100).toFixed(1)}B` : value.includes('.') ? `${(count / 100).toFixed(1)}` : value) : value}
      </div>
      <div className="text-sm font-semibold text-steel-light uppercase tracking-wider mb-1">{label}</div>
      <div className="text-xs text-steel">{detail}</div>
    </motion.div>
  );
}

// ─── Flow Diagram Node ──────────────────────────────────────────────────────
function FlowNode({ node, index, active, onClick }: { node: any; index: number; active: boolean; onClick: () => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const positions = [
    { x: '5%', y: '10%' },
    { x: '30%', y: '5%' },
    { x: '55%', y: '15%' },
    { x: '75%', y: '5%' },
    { x: '20%', y: '55%' },
    { x: '50%', y: '60%' },
    { x: '80%', y: '55%' },
  ];
  const pos = positions[index] || { x: '50%', y: '50%' };

  return (
    <motion.div
      ref={ref}
      className={`absolute cursor-pointer transition-all duration-300 ${active ? 'z-10' : 'z-0'}`}
      style={{ left: pos.x, top: pos.y }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      onClick={onClick}
    >
      <div className={`px-4 py-3 border-2 transition-all duration-300 ${active ? 'border-signal-yellow bg-signal-yellow/10 shadow-lg shadow-signal-yellow/20' : 'border-steel/30 bg-navy-light/80 hover:border-steel-light'}`}>
        <div className="mono text-xs text-signal-yellow mb-1">0{index + 1}</div>
        <div className="text-sm font-semibold text-white">{node.label}</div>
      </div>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="mt-2 p-3 bg-navy-light border border-steel/20 text-xs text-steel-light max-w-[200px]"
          >
            {node.description}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Flow Connections SVG ───────────────────────────────────────────────────
function FlowConnections({ nodes, active }: { nodes: any[]; active: string | null }) {
  const positions = [
    { x: 10, y: 15 },
    { x: 35, y: 10 },
    { x: 60, y: 20 },
    { x: 80, y: 10 },
    { x: 25, y: 60 },
    { x: 55, y: 65 },
    { x: 85, y: 60 },
  ];

  const lines: { from: number; to: number }[] = [];
  nodes.forEach((node, i) => {
    node.connections.forEach((connId: string) => {
      const toIdx = nodes.findIndex((n: any) => n.id === connId);
      if (toIdx >= 0) lines.push({ from: i, to: toIdx });
    });
  });

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
      {lines.map((line, i) => {
        const isActive = active === nodes[line.from].id || active === nodes[line.to].id;
        return (
          <motion.line
            key={i}
            x1={`${positions[line.from].x}%`}
            y1={`${positions[line.from].y}%`}
            x2={`${positions[line.to].x}%`}
            y2={`${positions[line.to].y}%`}
            stroke={isActive ? '#ffd600' : 'rgba(136, 150, 167, 0.3)'}
            strokeWidth={isActive ? '0.4' : '0.2'}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
          />
        );
      })}
      {/* Animated flow dots */}
      {lines.map((line, i) => (
        <motion.circle
          key={`dot-${i}`}
          r="0.5"
          fill="#ffd600"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            cx: [`${positions[line.from].x}%`, `${positions[line.to].x}%`],
            cy: [`${positions[line.from].y}%`, `${positions[line.to].y}%`],
          }}
          transition={{
            duration: 2,
            delay: i * 0.4,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
      ))}
    </svg>
  );
}

// ─── Case Study Card ────────────────────────────────────────────────────────
function CaseStudyCard({ study, index }: { study: any; index: number }) {
  return (
    <motion.div
      className="flex-shrink-0 w-[380px] md:w-[480px] snap-center"
      initial={{ opacity: 0, x: 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
    >
      <div className="h-full border border-steel/20 bg-white overflow-hidden group">
        <div className="relative h-48 overflow-hidden">
          <img src={study.image} alt={study.facility} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="mono text-xs text-signal-yellow mb-1">{study.client}</div>
            <h3 className="text-lg font-bold text-white">{study.facility}</h3>
          </div>
        </div>
        <div className="p-5">
          <div className="flex gap-4 mb-4 mono text-xs">
            <span className="text-steel">{study.location}</span>
            <span className="text-signal-yellow">{study.sqft}</span>
            <span className="text-steel">{study.value}</span>
          </div>
          <p className="text-sm text-navy/70 mb-4 leading-relaxed">{study.challenge}</p>
          <div className="border-t border-steel/20 pt-4">
            <div className="grid grid-cols-3 gap-2">
              {study.metrics.map((m: any, i: number) => (
                <div key={i} className="text-center">
                  <div className="data-number text-lg font-bold text-navy">{m.value}</div>
                  <div className="text-[10px] text-steel uppercase">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Schedule Timeline Item ─────────────────────────────────────────────────
function TimelineItem({ item, index }: { item: any; index: number }) {
  return (
    <motion.div
      className="relative pl-8 pb-8 border-l-2 border-steel/20"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-signal-yellow border-2 border-navy" />
      <div className="mono text-xs text-signal-yellow mb-1">PHASE {index + 1}</div>
      <h4 className="text-base font-bold text-white mb-2">{item.name}</h4>
      <p className="text-sm text-steel-light leading-relaxed">{item.description}</p>
    </motion.div>
  );
}

// ─── MAIN APP ───────────────────────────────────────────────────────────────
export default function App() {
  const [activeFlowNode, setActiveFlowNode] = useState<string | null>('inbound');
  const [scrollProgress, setScrollProgress] = useState(0);
  const caseScrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', setScrollProgress);
    return unsubscribe;
  }, [scrollYProgress]);

  const d = siteData;

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* ─── Progress Bar ─────────────────────────────────────────── */}
      <div className="fixed top-0 left-0 w-full h-[3px] z-50 bg-navy/10">
        <motion.div
          className="h-full bg-signal-yellow origin-left"
          style={{ scaleX: scrollProgress }}
        />
      </div>

      {/* ─── Navigation ───────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-navy/95 backdrop-blur-md border-b border-steel/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-signal-yellow flex items-center justify-center">
              <span className="text-navy font-black text-sm">Y</span>
            </div>
            <span className="text-white font-bold text-sm tracking-wide uppercase">{d.company.name}</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-xs font-medium text-steel-light uppercase tracking-wider">
            <a href="#facilities" className="hover:text-signal-yellow transition-colors">Facilities</a>
            <a href="#flow" className="hover:text-signal-yellow transition-colors">Flow</a>
            <a href="#cases" className="hover:text-signal-yellow transition-colors">Projects</a>
            <a href="#schedule" className="hover:text-signal-yellow transition-colors">Schedule</a>
            <a href="#contact" className="hover:text-signal-yellow transition-colors px-4 py-2 border border-signal-yellow text-signal-yellow">Contact</a>
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1: HERO
          ═══════════════════════════════════════════════════════════════ */}
      <section id="hero" className="relative min-h-screen flex items-center bg-navy structural-grid overflow-hidden pt-20">
        {/* Animated background lines */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-[1px] bg-gradient-to-r from-transparent via-signal-yellow/30 to-transparent"
              style={{ top: `${20 + i * 15}%`, left: 0, right: 0 }}
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: 'linear', delay: i * 0.5 }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Headline */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mono text-xs text-signal-yellow uppercase tracking-[0.3em] mb-6"
              >
                Industrial Construction — Est. {d.company.founded}
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="text-5xl md:text-7xl font-black text-white leading-[0.95] mb-6"
              >
                Industrial buildings planned for{' '}
                <span className="text-signal-yellow">throughput.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-lg text-steel-light max-w-xl leading-relaxed mb-8"
              >
                {d.hero.subheadline}
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex gap-4"
              >
                <a href="#contact" className="px-6 py-3 bg-signal-yellow text-navy font-bold text-sm uppercase tracking-wider hover:bg-signal-yellow-dark transition-colors">
                  Start Your Project
                </a>
                <a href="#facilities" className="px-6 py-3 border border-steel/40 text-white text-sm uppercase tracking-wider hover:border-signal-yellow hover:text-signal-yellow transition-colors">
                  View Capabilities
                </a>
              </motion.div>
            </div>

            {/* Right: Metrics UI */}
            <div className="grid grid-cols-2 gap-4">
              {d.hero.metrics.map((metric, i) => (
                <MetricCard key={i} {...metric} index={i} />
              ))}
            </div>
          </div>

          {/* Bottom status bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-16 pt-6 border-t border-steel/20 flex flex-wrap gap-8 mono text-xs text-steel"
          >
            <span>● LIVE: 14 Active Projects</span>
            <span>● 2.4M SF Under Construction</span>
            <span>● Next Delivery: 47 Days</span>
            <span>● Safety: 847K Hours LTI-Free</span>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2: FACILITY TYPES
          ═══════════════════════════════════════════════════════════════ */}
      <Section id="facilities" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <div className="mono text-xs text-signal-yellow uppercase tracking-[0.3em] mb-4">02 — Capabilities</div>
            <h2 className="text-4xl md:text-5xl font-black text-navy mb-4">Facility Types</h2>
            <p className="text-lg text-steel max-w-2xl">Every facility type demands different engineering. We specialize in the full spectrum of industrial construction.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {d.facilityTypes.map((facility, i) => (
              <motion.div
                key={i}
                className="group relative border border-steel/20 overflow-hidden hover:border-signal-yellow/50 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={facility.image} alt={facility.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />
                  <div className="absolute top-4 left-4 mono text-xs text-signal-yellow bg-navy/80 px-2 py-1">{facility.category}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-navy mb-2">{facility.title}</h3>
                  <p className="text-sm text-steel mb-4 leading-relaxed">{facility.description}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {facility.specs.map((spec, j) => (
                      <div key={j} className="border-l-2 border-signal-yellow pl-3">
                        <div className="text-[10px] text-steel uppercase">{spec.label}</div>
                        <div className="data-number text-sm font-bold text-navy">{spec.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3: PLANNING AROUND FLOW
          ═══════════════════════════════════════════════════════════════ */}
      <Section id="flow" className="py-24 md:py-32 bg-navy text-white" dark>
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <div className="mono text-xs text-signal-yellow uppercase tracking-[0.3em] mb-4">03 — Flow Planning</div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">{d.flowDiagram.title}</h2>
            <p className="text-lg text-steel-light max-w-2xl">{d.flowDiagram.subtitle}</p>
          </div>

          {/* Flow Diagram */}
          <div className="relative w-full h-[500px] border border-steel/20 bg-navy-light/50 overflow-hidden">
            <FlowConnections nodes={d.flowDiagram.nodes} active={activeFlowNode} />
            {d.flowDiagram.nodes.map((node, i) => (
              <FlowNode
                key={node.id}
                node={node}
                index={i}
                active={activeFlowNode === node.id}
                onClick={() => setActiveFlowNode(activeFlowNode === node.id ? null : node.id)}
              />
            ))}
            {/* Legend */}
            <div className="absolute bottom-4 right-4 mono text-[10px] text-steel">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-[2px] bg-signal-yellow" />
                <span>Active Flow Path</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-signal-yellow animate-pulse" />
                <span>Material Movement</span>
              </div>
            </div>
          </div>

          {/* Flow metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { val: '< 90s', label: 'Dock-to-Staging' },
              { val: '3.2x', label: 'Cross-Dock Velocity' },
              { val: '98.4%', label: 'Pick Accuracy' },
              { val: '47min', label: 'Avg. Dwell Time' },
            ].map((m, i) => (
              <motion.div
                key={i}
                className="text-center p-4 border border-steel/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="data-number text-2xl font-bold text-signal-yellow">{m.val}</div>
                <div className="text-xs text-steel uppercase mt-1">{m.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4: PRE-CONSTRUCTION INTELLIGENCE
          ═══════════════════════════════════════════════════════════════ */}
      <Section id="preconstruction" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="mono text-xs text-signal-yellow uppercase tracking-[0.3em] mb-4">04 — Pre-Construction</div>
              <h2 className="text-4xl md:text-5xl font-black text-navy mb-6">{d.preConstruction.title}</h2>
              <p className="text-lg text-steel leading-relaxed mb-8">{d.preConstruction.subtitle}</p>

              {/* Animated data viz */}
              <div className="space-y-4">
                {d.preConstruction.capabilities.map((cap, i) => (
                  <motion.div
                    key={i}
                    className="group"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                  >
                    <div className="flex items-start gap-4 p-4 border border-steel/20 hover:border-signal-yellow/50 transition-colors">
                      <div className="mono text-xs text-signal-yellow mt-1">0{i + 1}</div>
                      <div>
                        <h4 className="font-bold text-navy mb-1">{cap.title}</h4>
                        <p className="text-sm text-steel leading-relaxed">{cap.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Visual element */}
            <div className="relative">
              <div className="sticky top-24 border border-steel/20 bg-off-white p-8">
                <div className="mono text-xs text-steel uppercase mb-6">Digital Twin Parameters</div>
                <div className="space-y-6">
                  {[
                    { label: 'Throughput Capacity', value: 87, unit: '%' },
                    { label: 'Energy Optimization', value: 94, unit: '%' },
                    { label: 'Clash Detection', value: 99, unit: '%' },
                    { label: 'Schedule Confidence', value: 91, unit: '%' },
                  ].map((bar, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.15 }}
                    >
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-navy font-medium">{bar.label}</span>
                        <span className="data-number text-navy">{bar.value}{bar.unit}</span>
                      </div>
                      <div className="h-2 bg-steel/10 overflow-hidden">
                        <motion.div
                          className="h-full bg-signal-yellow"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${bar.value}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + i * 0.15, duration: 1, ease: 'easeOut' }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-steel/20">
                  <div className="mono text-xs text-steel uppercase mb-3">Model Status</div>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <div className="data-number text-lg font-bold text-navy">47</div>
                      <div className="text-[10px] text-steel">Scenarios</div>
                    </div>
                    <div>
                      <div className="data-number text-lg font-bold text-navy">12K</div>
                      <div className="text-[10px] text-steel">Data Points</div>
                    </div>
                    <div>
                      <div className="data-number text-lg font-bold text-navy">3</div>
                      <div className="text-[10px] text-steel">Iterations</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 5: CASE STUDIES (Horizontal Scroll)
          ═══════════════════════════════════════════════════════════════ */}
      <Section id="cases" className="py-24 md:py-32 bg-off-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <div className="mono text-xs text-signal-yellow uppercase tracking-[0.3em] mb-4">05 — Project Record</div>
              <h2 className="text-4xl md:text-5xl font-black text-navy">Case Studies</h2>
            </div>
            <div className="hidden md:flex gap-2">
              <button
                onClick={() => caseScrollRef.current?.scrollBy({ left: -500, behavior: 'smooth' })}
                className="w-10 h-10 border border-navy/20 flex items-center justify-center hover:bg-navy hover:text-white transition-colors"
              >
                ←
              </button>
              <button
                onClick={() => caseScrollRef.current?.scrollBy({ left: 500, behavior: 'smooth' })}
                className="w-10 h-10 border border-navy/20 flex items-center justify-center hover:bg-navy hover:text-white transition-colors"
              >
                →
              </button>
            </div>
          </div>
        </div>

        <div
          ref={caseScrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-6 pb-6 scrollbar-hide"
          style={{ scrollbarWidth: 'none' }}
        >
          <div className="flex-shrink-0 w-6 md:w-[calc((100vw-1280px)/2+3rem)]" />
          {d.caseStudies.map((study, i) => (
            <CaseStudyCard key={study.id} study={study} index={i} />
          ))}
          <div className="flex-shrink-0 w-6 md:w-24" />
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 6: SCHEDULE + RISK
          ═══════════════════════════════════════════════════════════════ */}
      <Section id="schedule" className="py-24 md:py-32 bg-navy text-white" dark>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <div className="mono text-xs text-signal-yellow uppercase tracking-[0.3em] mb-4">06 — Schedule & Risk</div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">{d.scheduleRisk.title}</h2>
              <p className="text-lg text-steel-light leading-relaxed mb-8">{d.scheduleRisk.subtitle}</p>

              {/* Sticky timeline */}
              <div className="space-y-0">
                {d.scheduleRisk.tools.map((tool, i) => (
                  <TimelineItem key={i} item={tool} index={i} />
                ))}
              </div>
            </div>

            {/* Right: Risk dashboard */}
            <div className="lg:sticky lg:top-24 self-start">
              <div className="border border-steel/20 bg-navy-light/50 p-6">
                <div className="mono text-xs text-steel uppercase mb-6">Risk Dashboard — Live</div>

                {/* Risk matrix */}
                <div className="grid grid-cols-5 gap-1 mb-6">
                  {[...Array(25)].map((_, i) => {
                    const row = Math.floor(i / 5);
                    const col = i % 5;
                    const risk = (row + 1) * (col + 1);
                    const color = risk > 15 ? 'bg-red-500/60' : risk > 8 ? 'bg-signal-yellow/60' : 'bg-green-500/40';
                    return (
                      <motion.div
                        key={i}
                        className={`aspect-square ${color} flex items-center justify-center text-[9px] mono text-white/80`}
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.02 }}
                      >
                        {risk}
                      </motion.div>
                    );
                  })}
                </div>
                <div className="flex justify-between text-[10px] text-steel mb-8">
                  <span>Impact →</span>
                  <span>Likelihood ↑</span>
                </div>

                {/* Lead time indicators */}
                <div className="space-y-3">
                  <div className="mono text-xs text-steel uppercase mb-3">Long-Lead Items</div>
                  {[
                    { item: 'AHU Units', weeks: 22, status: 'On Track' },
                    { item: 'Switchgear', weeks: 18, status: 'At Risk' },
                    { item: 'Racking System', weeks: 14, status: 'On Track' },
                    { item: 'Dock Equipment', weeks: 10, status: 'Ordered' },
                    { item: 'Refrigeration', weeks: 26, status: 'Fabricating' },
                  ].map((lead, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center justify-between py-2 border-b border-steel/10"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <span className="text-sm text-white">{lead.item}</span>
                      <div className="flex items-center gap-3">
                        <span className="mono text-xs text-steel">{lead.weeks} wks</span>
                        <span className={`text-[10px] mono px-2 py-0.5 ${lead.status === 'At Risk' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                          {lead.status}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 7: SAFETY + COMPLIANCE
          ═══════════════════════════════════════════════════════════════ */}
      <Section id="safety" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="mono text-xs text-signal-yellow uppercase tracking-[0.3em] mb-4">07 — Safety & Compliance</div>
            <h2 className="text-4xl md:text-5xl font-black text-navy mb-4">{d.safetyCompliance.title}</h2>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {d.safetyCompliance.stats.map((stat, i) => (
              <motion.div
                key={i}
                className="text-center p-6 border border-steel/20 bg-off-white"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="data-number text-4xl md:text-5xl font-bold text-navy mb-2">{stat.value}</div>
                <div className="text-sm font-semibold text-navy uppercase">{stat.label}</div>
                <div className="text-xs text-steel mt-1">{stat.detail}</div>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-navy mb-6">Certifications & Standards</h3>
              <div className="space-y-3">
                {d.safetyCompliance.certifications.map((cert, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3 p-3 border border-steel/20"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <div className="w-2 h-2 bg-signal-yellow flex-shrink-0" />
                    <span className="text-sm font-medium text-navy">{cert}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-navy mb-6">Documentation & Controls</h3>
              <div className="space-y-4">
                {[
                  { title: 'Site-Specific Safety Plans', desc: 'Custom SSP for every project with JHA breakdowns by trade and phase.' },
                  { title: 'Daily Quality Logs', desc: 'Digital inspection records with photo documentation and sign-off workflows.' },
                  { title: 'Subcontractor Pre-Qualification', desc: 'EMR verification, safety history review, and ongoing performance tracking.' },
                  { title: 'Weekly Safety Audits', desc: 'Independent third-party audits with corrective action tracking and closure.' },
                ].map((doc, i) => (
                  <motion.div
                    key={i}
                    className="p-4 border-l-2 border-signal-yellow bg-off-white"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <h4 className="font-semibold text-navy text-sm mb-1">{doc.title}</h4>
                    <p className="text-xs text-steel leading-relaxed">{doc.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 8: FACILITY CTA
          ═══════════════════════════════════════════════════════════════ */}
      <Section id="contact" className="py-24 md:py-32 bg-navy text-white structural-grid" dark>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="mono text-xs text-signal-yellow uppercase tracking-[0.3em] mb-4">08 — Start Your Project</div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">{d.cta.title}</h2>
              <p className="text-lg text-steel-light leading-relaxed mb-8">{d.cta.description}</p>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 border border-signal-yellow/50 flex items-center justify-center">
                    <span className="text-signal-yellow text-lg">✆</span>
                  </div>
                  <div>
                    <div className="text-xs text-steel uppercase">Direct Line</div>
                    <div className="text-white font-semibold">{d.cta.contactInfo.phone}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 border border-signal-yellow/50 flex items-center justify-center">
                    <span className="text-signal-yellow text-lg">✉</span>
                  </div>
                  <div>
                    <div className="text-xs text-steel uppercase">Email</div>
                    <div className="text-white font-semibold">{d.cta.contactInfo.email}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <motion.div
              className="border border-steel/20 bg-navy-light/80 p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mono text-xs text-steel uppercase mb-6">Facility Requirements</div>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-xs text-steel uppercase mb-2">Project Type</label>
                  <select className="w-full bg-navy border border-steel/30 text-white px-4 py-3 text-sm focus:border-signal-yellow focus:outline-none transition-colors">
                    <option>New Distribution Center</option>
                    <option>Manufacturing Facility</option>
                    <option>Cold Storage / Freezer</option>
                    <option>Flex / Light Industrial</option>
                    <option>Expansion / Retrofit</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-steel uppercase mb-2">Size (SF)</label>
                    <input type="text" placeholder="e.g. 250,000" className="w-full bg-navy border border-steel/30 text-white px-4 py-3 text-sm focus:border-signal-yellow focus:outline-none transition-colors placeholder:text-steel/50" />
                  </div>
                  <div>
                    <label className="block text-xs text-steel uppercase mb-2">Timeline</label>
                    <select className="w-full bg-navy border border-steel/30 text-white px-4 py-3 text-sm focus:border-signal-yellow focus:outline-none transition-colors">
                      <option>6-9 Months</option>
                      <option>9-12 Months</option>
                      <option>12-18 Months</option>
                      <option>18+ Months</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-steel uppercase mb-2">Location / Market</label>
                  <input type="text" placeholder="City, State" className="w-full bg-navy border border-steel/30 text-white px-4 py-3 text-sm focus:border-signal-yellow focus:outline-none transition-colors placeholder:text-steel/50" />
                </div>
                <div>
                  <label className="block text-xs text-steel uppercase mb-2">Contact Email</label>
                  <input type="email" placeholder="you@company.com" className="w-full bg-navy border border-steel/30 text-white px-4 py-3 text-sm focus:border-signal-yellow focus:outline-none transition-colors placeholder:text-steel/50" />
                </div>
                <div>
                  <label className="block text-xs text-steel uppercase mb-2">Project Details</label>
                  <textarea rows={3} placeholder="Brief description of requirements..." className="w-full bg-navy border border-steel/30 text-white px-4 py-3 text-sm focus:border-signal-yellow focus:outline-none transition-colors placeholder:text-steel/50 resize-none" />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-signal-yellow text-navy font-bold text-sm uppercase tracking-wider hover:bg-signal-yellow-dark transition-colors"
                >
                  {d.cta.buttonText}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ─── Footer ───────────────────────────────────────────────── */}
      <footer className="bg-navy border-t border-steel/10 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-signal-yellow flex items-center justify-center">
              <span className="text-navy font-black text-[10px]">Y</span>
            </div>
            <span className="text-steel text-xs">{d.company.name} — {d.company.tagline}</span>
          </div>
          <div className="mono text-xs text-steel">
            © 2024 {d.company.name}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
