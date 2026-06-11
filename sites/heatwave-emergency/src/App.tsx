import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { emergencyIssues, dispatchSteps, safetyChecklist, truckEquipment, pricing, coverageCities, heroImage } from './data';

/* ─── Inline SVG Icon System ─── */
function Icon({ name, className = 'w-6 h-6' }: { name: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    phone: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8 9a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>,
    clock: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
    thermometer: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z" /></svg>,
    flame: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 2c-3.5 4-6 7-6 11a6 6 0 0012 0c0-4-2.5-7-6-11z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3 3 0 003-3c0-2-1.5-3.5-3-5-1.5 1.5-3 3-3 5a3 3 0 003 3z" /></svg>,
    droplet: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" /></svg>,
    alert: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>,
    snowflake: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><line x1="12" y1="2" x2="12" y2="22" /><line x1="2" y1="12" x2="22" y2="12" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" /><line x1="19.07" y1="4.93" x2="4.93" y2="19.07" /><polyline points="8 2 12 6 16 2" /><polyline points="8 22 12 18 16 22" /><polyline points="2 8 6 12 2 16" /><polyline points="22 8 18 12 22 16" /></svg>,
    power: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M18.36 6.64a9 9 0 11-12.73 0" /><line x1="12" y1="2" x2="2" y2="12" /></svg>,
    check: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><polyline points="20 6 9 17 4 12" /></svg>,
    shield: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
    truck: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><rect x="1" y="3" width="15" height="13" rx="1" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>,
    map: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>,
    zap: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
    radio: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><circle cx="12" cy="12" r="2" /><path d="M16.24 7.76a6 6 0 010 8.49m-8.48-.01a6 6 0 010-8.49m11.31-2.82a10 10 0 010 14.14m-14.14 0a10 10 0 010-14.14" /></svg>,
    menu: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>,
    close: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>,
    arrow: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>,
    wrench: <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" /></svg>,
  };
  return <>{icons[name] || <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><circle cx="12" cy="12" r="10" /></svg>}</>;
}

/* ─── Urgency Config ─── */
const urgencyConfig: Record<string, { border: string; bg: string; text: string; dot: string; label: string }> = {
  Critical: { border: 'border-l-red-600', bg: 'bg-red-600/10', text: 'text-red-400', dot: 'bg-red-500', label: 'CRITICAL' },
  Emergency: { border: 'border-l-orange-500', bg: 'bg-orange-500/10', text: 'text-orange-400', dot: 'bg-orange-500', label: 'EMERGENCY' },
  High: { border: 'border-l-yellow-500', bg: 'bg-yellow-500/10', text: 'text-yellow-400', dot: 'bg-yellow-500', label: 'HIGH' },
};

/* ─── Live Clock Component ─── */
function LiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <span className="font-mono text-sm text-gray-400">
      {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
    </span>
  );
}

/* ─── Pulsing Dot ─── */
function PulseDot({ color = 'bg-red-500' }: { color?: string }) {
  return (
    <span className="relative flex h-3 w-3">
      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${color} opacity-75`} />
      <span className={`relative inline-flex rounded-full h-3 w-3 ${color}`} />
    </span>
  );
}

/* ─── Countdown Timer ─── */
function ETACounter() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setSeconds(s => (s + 1) % 60), 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex items-center gap-1.5 font-mono text-xs text-emerald-400">
      <PulseDot color="bg-emerald-500" />
      <span>LIVE</span>
      <span className="text-gray-600">|</span>
      <span>{String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}</span>
    </div>
  );
}

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(s => (s + 1) % dispatchSteps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#1F2937] text-[#F9FAFB] antialiased overflow-x-hidden font-sans">
      {/* ─── HEADER / COMMAND BAR ─── */}
      <header className="sticky top-0 z-50 bg-[#111827]/95 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 bg-[#EA580C] rounded flex items-center justify-center">
                <Icon name="zap" className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
            </div>
            <div className="hidden sm:block">
              <div className="font-black text-sm tracking-tight text-white leading-none">HEATWAVE</div>
              <div className="text-[10px] text-[#EA580C] font-bold tracking-widest uppercase">Emergency HVAC</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-5 text-xs font-bold uppercase tracking-wider text-gray-400">
            <a href="#issues" className="hover:text-[#EA580C] transition-colors">Issues</a>
            <a href="#dispatch" className="hover:text-[#EA580C] transition-colors">Dispatch</a>
            <a href="#safety" className="hover:text-[#EA580C] transition-colors">Safety</a>
            <a href="#pricing" className="hover:text-[#EA580C] transition-colors">Pricing</a>
            <a href="#coverage" className="hover:text-[#EA580C] transition-colors">Coverage</a>
          </nav>
          <div className="flex items-center gap-3">
            <ETACounter />
            <a href="tel:+13035550123" className="hidden sm:inline-flex items-center gap-1.5 bg-[#DC2626] text-white font-black text-xs uppercase tracking-wider px-4 py-2 rounded hover:bg-red-700 transition-all animate-pulse">
              <Icon name="phone" className="w-3.5 h-3.5" /> Call Now
            </a>
            <button onClick={() => setNavOpen(!navOpen)} className="md:hidden p-2 text-gray-400">
              <Icon name={navOpen ? 'close' : 'menu'} className="w-5 h-5" />
            </button>
          </div>
        </div>
        <AnimatePresence>
          {navOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-[#111827] border-b border-gray-800 overflow-hidden">
              <div className="px-4 py-4 space-y-3">
                {['Issues', 'Dispatch', 'Safety', 'Pricing', 'Coverage'].map(item => (
                  <a key={item} href={`#${item.toLowerCase()}`} className="block text-gray-300 font-bold text-sm uppercase tracking-wider" onClick={() => setNavOpen(false)}>{item}</a>
                ))}
                <a href="tel:+13035550123" className="block bg-[#DC2626] text-white text-center py-3 rounded font-black text-sm uppercase" onClick={() => setNavOpen(false)}>
                  Emergency Call
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ─── HERO: COMMAND CENTER ─── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background image with heavy overlay */}
        <div className="absolute inset-0">
          <img src={heroImage} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111827] via-[#1F2937]/95 to-[#1F2937]/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F2937] via-transparent to-transparent" />
        </div>

        {/* Animated grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(#EA580C 1px, transparent 1px), linear-gradient(90deg, #EA580C 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        {/* Pulsing radar circles */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 pointer-events-none">
          <div className="relative w-96 h-96">
            <div className="absolute inset-0 rounded-full border border-[#EA580C]/20 animate-ping" style={{ animationDuration: '3s' }} />
            <div className="absolute inset-8 rounded-full border border-[#EA580C]/15 animate-ping" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
            <div className="absolute inset-16 rounded-full border border-[#EA580C]/10 animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }} />
          </div>
        </div>

        {/* Hazard stripe accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, #EA580C, #EA580C 20px, #1F2937 20px, #1F2937 40px)'
        }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full">
          <div className="max-w-3xl">
            {/* Status badge */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 bg-[#DC2626]/20 border border-[#DC2626]/40 px-4 py-2 rounded-sm mb-8">
              <PulseDot color="bg-[#DC2626]" />
              <span className="text-xs font-black uppercase tracking-widest text-red-300">System Active</span>
              <span className="text-xs text-gray-500 font-mono"><LiveClock /></span>
            </motion.div>

            {/* Main headline */}
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tight">
              <span className="text-white">YOUR HVAC</span>
              <br />
              <span className="text-[#EA580C]">EMERGENCY</span>
              <br />
              <span className="text-white">ENDS HERE.</span>
            </motion.h1>

            {/* Stats row */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-6 mt-10">
              {[
                { value: '38', unit: 'min', label: 'Avg Response' },
                { value: '24/7', unit: '', label: 'Dispatch Active' },
                { value: '95%', unit: '', label: 'First-Visit Fix' },
              ].map((stat, i) => (
                <div key={i} className="border-l-2 border-[#EA580C] pl-4">
                  <div className="text-3xl font-black text-white leading-none">
                    {stat.value}<span className="text-[#EA580C] text-lg ml-0.5">{stat.unit}</span>
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
              className="mt-10 flex flex-wrap items-center gap-4">
              <a href="tel:+13035550123"
                className="group relative inline-flex items-center gap-3 bg-[#DC2626] text-white font-black text-lg uppercase tracking-wider px-8 py-5 rounded-sm overflow-hidden">
                <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <Icon name="phone" className="w-5 h-5 animate-pulse" />
                (303) 555-0123
              </a>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Icon name="clock" className="w-4 h-4 text-[#EA580C]" />
                <span>Trucks rolling <span className="text-white font-bold">right now</span></span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── EMERGENCY ISSUES: PRIORITY BOARD ─── */}
      <section id="issues" className="py-20 sm:py-28 bg-[#111827]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Section header */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px flex-1 max-w-[60px] bg-[#EA580C]" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#EA580C]">Priority Board</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Active Emergency Types
            </h2>
            <p className="mt-3 text-gray-400 max-w-xl">
              Every issue below gets an immediate dispatch. Color-coded by severity.
            </p>
          </motion.div>

          {/* Issue cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {emergencyIssues.map((issue, i) => {
              const config = urgencyConfig[issue.urgency] || urgencyConfig.High;
              return (
                <motion.div key={issue.id}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`relative bg-[#1F2937] border-l-4 ${config.border} rounded-r-lg p-6 hover:bg-[#1F2937]/80 transition-all group`}>
                  {/* Urgency badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-sm ${config.bg} flex items-center justify-center ${config.text}`}>
                      <Icon name={issue.icon} className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${config.dot} animate-pulse`} />
                      <span className={`text-[9px] font-black uppercase tracking-widest ${config.text}`}>{config.label}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-black text-white mb-2">{issue.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{issue.desc}</p>
                  {/* Bottom accent line on hover */}
                  <div className={`absolute bottom-0 left-4 right-0 h-0.5 ${config.bg} opacity-0 group-hover:opacity-100 transition-opacity`} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── DISPATCH PROCESS: TIMELINE ─── */}
      <section id="dispatch" className="py-20 sm:py-28 bg-[#1F2937] relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#EA580C]/30 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mb-14">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px flex-1 max-w-[60px] bg-[#EA580C]" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#EA580C]">Response Protocol</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              5 Steps to Relief
            </h2>
            <p className="mt-3 text-gray-400 max-w-xl">
              From your first call to confirmed repair. Average total time: under 2 hours.
            </p>
          </motion.div>

          {/* Horizontal timeline - desktop */}
          <div className="hidden lg:block relative">
            {/* Connecting line */}
            <div className="absolute top-12 left-[10%] right-[10%] h-0.5 bg-gray-700">
              <motion.div
                className="h-full bg-[#EA580C]"
                initial={{ width: '0%' }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 0.5 }}
              />
            </div>

            <div className="grid grid-cols-5 gap-4 relative">
              {dispatchSteps.map((step, i) => (
                <motion.div key={step.step}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className={`text-center transition-all duration-500 ${activeStep === i ? 'scale-105' : ''}`}>
                  {/* Node */}
                  <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center font-black text-2xl transition-all duration-500 ${
                    activeStep === i
                      ? 'bg-[#EA580C] text-white shadow-lg shadow-[#EA580C]/30 ring-4 ring-[#EA580C]/20'
                      : i < activeStep
                        ? 'bg-[#EA580C]/20 text-[#EA580C] border-2 border-[#EA580C]/40'
                        : 'bg-gray-800 text-gray-500 border-2 border-gray-700'
                  }`}>
                    {step.step}
                  </div>
                  {/* ETA badge */}
                  <div className={`mt-3 text-[9px] font-mono font-bold uppercase tracking-wider ${activeStep === i ? 'text-[#EA580C]' : 'text-gray-600'}`}>
                    {i === 0 ? 'T+0:00' : i === 1 ? 'T+0:02' : i === 2 ? 'T+0:05' : i === 3 ? 'T+0:45' : 'T+2:00'}
                  </div>
                  <h3 className={`mt-2 font-black text-sm ${activeStep === i ? 'text-white' : 'text-gray-400'}`}>{step.title}</h3>
                  <p className="mt-1 text-xs text-gray-500 leading-relaxed px-2">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Vertical timeline - mobile */}
          <div className="lg:hidden space-y-6">
            {dispatchSteps.map((step, i) => (
              <motion.div key={step.step}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg shrink-0 ${
                    activeStep === i ? 'bg-[#EA580C] text-white' : 'bg-gray-800 text-gray-500 border-2 border-gray-700'
                  }`}>
                    {step.step}
                  </div>
                  {i < dispatchSteps.length - 1 && <div className="w-0.5 flex-1 bg-gray-700 mt-2" />}
                </div>
                <div className="pb-6">
                  <div className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#EA580C]">
                    {i === 0 ? 'T+0:00' : i === 1 ? 'T+0:02' : i === 2 ? 'T+0:05' : i === 3 ? 'T+0:45' : 'T+2:00'}
                  </div>
                  <h3 className="font-black text-white mt-1">{step.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SAFETY CHECKLIST ─── */}
      <section id="safety" className="py-20 sm:py-28 bg-[#111827]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-5 gap-10 items-start">
            {/* Left: Info */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px flex-1 max-w-[60px] bg-[#EA580C]" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#EA580C]">Before We Arrive</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Safety Protocol
              </h2>
              <p className="mt-4 text-gray-400 leading-relaxed">
                Follow these steps while waiting for our technician. They keep you safe and help us diagnose faster.
              </p>
              <div className="mt-6 bg-[#DC2626]/10 border border-[#DC2626]/30 rounded-sm p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="alert" className="w-4 h-4 text-[#DC2626]" />
                  <span className="text-xs font-black uppercase tracking-wider text-[#DC2626]">Gas Leak Warning</span>
                </div>
                <p className="text-sm text-gray-300">If you suspect a gas leak: evacuate immediately, call 911 from outside, then call us.</p>
              </div>
            </motion.div>

            {/* Right: Checklist */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="lg:col-span-3 space-y-3">
              {safetyChecklist.map((item, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-start gap-4 bg-[#1F2937] border border-gray-800 rounded-sm p-4 hover:border-[#EA580C]/30 transition-all group">
                  <div className="w-8 h-8 rounded-sm bg-[#EA580C]/10 flex items-center justify-center shrink-0 group-hover:bg-[#EA580C]/20 transition-all">
                    <span className="text-xs font-black text-[#EA580C]">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed pt-1">{item}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── TRUCK EQUIPMENT: BADGE CLOUD ─── */}
      <section className="py-20 sm:py-28 bg-[#1F2937] relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-[60px] bg-[#EA580C]" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#EA580C]">Fully Stocked</span>
              <div className="h-px w-[60px] bg-[#EA580C]" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              What's On Our Trucks
            </h2>
            <p className="mt-3 text-gray-400 max-w-lg mx-auto">
              95% of repairs completed in a single visit. No waiting for parts.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {truckEquipment.map((item, i) => (
              <motion.span key={i}
                initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="inline-flex items-center gap-2 bg-[#111827] border border-gray-700 text-gray-300 px-4 py-2.5 rounded-sm text-sm font-medium hover:border-[#EA580C]/40 hover:text-white transition-all cursor-default">
                <Icon name="wrench" className="w-3.5 h-3.5 text-[#EA580C]" />
                {item}
              </motion.span>
            ))}
          </motion.div>

          {/* Trust indicator */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="mt-10 text-center">
            <div className="inline-flex items-center gap-3 bg-[#111827] border border-gray-800 rounded-sm px-6 py-3">
              <Icon name="truck" className="w-5 h-5 text-[#EA580C]" />
              <span className="text-sm text-gray-300">Every truck carries <span className="text-white font-bold">$40K+ in parts</span> and equipment</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── PRICING: CLEAR FEES ─── */}
      <section id="pricing" className="py-20 sm:py-28 bg-[#111827]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px flex-1 max-w-[60px] bg-[#EA580C]" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#EA580C]">No Surprises</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Transparent Pricing
            </h2>
            <p className="mt-3 text-gray-400 max-w-xl">
              Know exactly what you pay before we start. No hidden fees. No upsells.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[
              { label: 'Diagnostic Fee', price: pricing.diagnosticFee, desc: 'Waived if you proceed with repair', tag: null },
              { label: 'Emergency Trip', price: pricing.emergencyTripFee, desc: 'Priority dispatch + diagnostic included', tag: 'MOST COMMON' },
              { label: 'After-Hours Fee', price: pricing.afterHoursFee, desc: 'Applies 8pm–7am, weekends & holidays', tag: null },
            ].map((p, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-sm p-8 border transition-all ${
                  p.tag
                    ? 'bg-[#EA580C]/5 border-[#EA580C]/40 hover:border-[#EA580C]/60'
                    : 'bg-[#1F2937] border-gray-800 hover:border-gray-700'
                }`}>
                {p.tag && (
                  <div className="absolute -top-3 left-6 bg-[#EA580C] text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-sm">
                    {p.tag}
                  </div>
                )}
                <div className="text-xs font-bold uppercase tracking-wider text-gray-500">{p.label}</div>
                <div className={`mt-3 text-4xl font-black ${p.tag ? 'text-[#EA580C]' : 'text-white'}`}>
                  ${p.price}
                </div>
                <p className="mt-3 text-sm text-gray-400">{p.desc}</p>
                <div className={`mt-5 h-px w-full ${p.tag ? 'bg-[#EA580C]/20' : 'bg-gray-800'}`} />
                <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                  <Icon name="check" className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Licensed & insured technician</span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-center text-sm text-gray-500 mt-8 max-w-2xl mx-auto bg-[#1F2937] border border-gray-800 rounded-sm p-4">
            {pricing.note}
          </motion.p>
        </div>
      </section>

      {/* ─── COVERAGE: CITY CLOUD ─── */}
      <section id="coverage" className="py-20 sm:py-28 bg-[#1F2937] relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-[60px] bg-[#EA580C]" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#EA580C]">Service Area</span>
              <div className="h-px w-[60px] bg-[#EA580C]" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              We Cover Denver Metro
            </h2>
            <p className="mt-3 text-gray-400 max-w-lg mx-auto">
              15 cities. 60-minute average response. If you're in the metro, we're coming.
            </p>
          </motion.div>

          {/* City cloud with map-like layout */}
          <div className="relative max-w-4xl mx-auto">
            {/* Radar background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-80 h-80 rounded-full border border-gray-800 opacity-50" />
              <div className="absolute w-56 h-56 rounded-full border border-gray-800 opacity-50" />
              <div className="absolute w-32 h-32 rounded-full border border-[#EA580C]/20 opacity-50" />
              <div className="absolute w-3 h-3 rounded-full bg-[#EA580C]/40" />
            </div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="relative flex flex-wrap justify-center gap-2.5 py-8">
              {coverageCities.map((city, i) => (
                <motion.span key={city}
                  initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.04, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.1, y: -3 }}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-sm text-sm font-bold transition-all cursor-default ${
                    i === 0
                      ? 'bg-[#EA580C] text-white'
                      : 'bg-[#111827] border border-gray-700 text-gray-300 hover:border-[#EA580C]/40 hover:text-white'
                  }`}>
                  {i === 0 && <Icon name="map" className="w-3.5 h-3.5" />}
                  {city}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Coverage stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mt-12 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              { value: '15', label: 'Cities Covered' },
              { value: '60', label: 'Min Avg Response' },
              { value: '24/7', label: 'Always Available' },
            ].map((stat, i) => (
              <div key={i} className="text-center bg-[#111827] border border-gray-800 rounded-sm p-4">
                <div className="text-2xl font-black text-[#EA580C]">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-20 sm:py-28 bg-[#111827] relative overflow-hidden">
        {/* Hazard stripes top */}
        <div className="absolute top-0 left-0 right-0 h-1.5" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, #DC2626, #DC2626 20px, #111827 20px, #111827 40px)'
        }} />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 bg-[#DC2626]/20 border border-[#DC2626]/30 px-4 py-2 rounded-sm mb-6">
              <PulseDot color="bg-[#DC2626]" />
              <span className="text-xs font-black uppercase tracking-widest text-red-300">Dispatch Standing By</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Don't Wait.<br />
              <span className="text-[#EA580C]">Call Now.</span>
            </h2>
            <p className="mt-6 text-lg text-gray-400 max-w-xl mx-auto">
              A real person answers 24/7/365. No voicemail. No callbacks. A truck rolls within minutes.
            </p>

            <motion.a href="tel:+13035550123" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
              className="mt-10 inline-flex items-center gap-3 bg-[#DC2626] text-white font-black text-xl uppercase tracking-wider px-10 py-6 rounded-sm shadow-2xl shadow-red-900/30 relative overflow-hidden group">
              <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <Icon name="phone" className="w-6 h-6" />
              (303) 555-0123
            </motion.a>

            <p className="mt-6 text-xs text-gray-600 uppercase tracking-widest font-bold">
              Available 24/7/365 — We Never Close
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#111827] border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid sm:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-[#EA580C] rounded flex items-center justify-center">
                  <Icon name="zap" className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-black text-sm text-white leading-none">HEATWAVE</div>
                  <div className="text-[9px] text-[#EA580C] font-bold tracking-widest uppercase">Emergency HVAC</div>
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                24/7 emergency HVAC repair for the Denver metro area. Licensed, insured, and always ready.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Emergency Line</h4>
              <a href="tel:+13035550123" className="text-lg font-black text-[#EA580C] hover:text-white transition-colors">(303) 555-0123</a>
              <p className="text-xs text-gray-500 mt-1">Available 24/7/365</p>
            </div>

            {/* Location */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Base of Operations</h4>
              <p className="text-sm text-gray-400">456 Dispatch Ave</p>
              <p className="text-sm text-gray-400">Denver, CO 80204</p>
              <p className="text-xs text-gray-600 mt-2">Serving 15 cities across Denver Metro</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className="text-[10px] text-gray-600 uppercase tracking-wider">
              &copy; {new Date().getFullYear()} HeatWave Emergency HVAC. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-[10px] text-gray-600">
              <PulseDot color="bg-emerald-500" />
              <span className="uppercase tracking-wider font-bold">All Systems Operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
