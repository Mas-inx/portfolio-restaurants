import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  visitTypes,
  treatmentCategories,
  visitFlow,
  pricingTiers,
  providers,
  intakeChecklist,
  clinicHours,
  insuranceAccepted,
} from "./data";
import type { VisitType, IntakeItem } from "./data";

function useLiveWaitTime() {
  const [waitTime, setWaitTime] = useState(14);
  const [queueLength, setQueueLength] = useState(6);

  useEffect(() => {
    const interval = setInterval(() => {
      setWaitTime((prev) => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        return Math.max(5, Math.min(25, prev + delta));
      });
      setQueueLength((prev) => {
        const delta = Math.random() > 0.6 ? 1 : Math.random() > 0.3 ? -1 : 0;
        return Math.max(1, Math.min(12, prev + delta));
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return { waitTime, queueLength };
}

function StatusDot({ status }: { status: "green" | "yellow" | "red" }) {
  const colors = {
    green: "bg-emerald-500",
    yellow: "bg-amber-500",
    red: "bg-red-500",
  };
  return (
    <span className="relative flex h-3 w-3">
      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${colors[status]} opacity-75`}></span>
      <span className={`relative inline-flex rounded-full h-3 w-3 ${colors[status]}`}></span>
    </span>
  );
}

function Hero({ selectedVisit, waitTime, queueLength }: { selectedVisit: VisitType; waitTime: number; queueLength: number }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-blue-50 pt-20 pb-16 md:pt-28 md:pb-24">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230a2540' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}></div>
      <div className="relative max-w-6xl mx-auto px-5">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-1.5 mb-6">
              <StatusDot status="green" />
              <span className="text-sm font-medium text-emerald-800">Open Now — Walk-ins Welcome</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900 leading-tight tracking-tight mb-4">
              Get in line<br />
              <span className="text-blue-600">before you arrive.</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-lg">
              Skip the waiting room paperwork. Check in online, see live wait times, and know exactly what to expect — before you walk through our doors.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#checkin" className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                {selectedVisit.ctaText}
              </a>
              <a href="#visit-types" className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-semibold px-7 py-4 rounded-xl border border-slate-200 transition-all">
                Choose Visit Type
              </a>
            </div>
          </div>

          {/* Live Wait Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 md:p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Live Queue Status</h3>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-xs text-emerald-700 font-medium">Updating live</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="text-center p-4 bg-slate-50 rounded-xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={waitTime}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-4xl md:text-5xl font-bold text-navy-900"
                  >
                    {waitTime}
                  </motion.div>
                </AnimatePresence>
                <p className="text-sm text-slate-500 mt-1">min wait</p>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={queueLength}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-4xl md:text-5xl font-bold text-navy-900"
                  >
                    {queueLength}
                  </motion.div>
                </AnimatePresence>
                <p className="text-sm text-slate-500 mt-1">in queue</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white text-lg">
                {selectedVisit.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">{selectedVisit.label} Visit</p>
                <p className="text-xs text-slate-500">Avg. {selectedVisit.avgWait} for this type</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-4 text-center">
              Updated every few seconds • Estimates based on current acuity mix
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function VisitSelector({ selected, onSelect }: { selected: VisitType; onSelect: (v: VisitType) => void }) {
  return (
    <section id="visit-types" className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">Step 1</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Choose Your Visit</h2>
          <p className="text-slate-600 max-w-xl mx-auto">Select what brings you in so we can prepare for your arrival.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {visitTypes.map((visit) => (
            <motion.button
              key={visit.id}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(visit)}
              className={`relative text-left p-5 rounded-2xl border-2 transition-all ${
                selected.id === visit.id
                  ? "border-blue-600 bg-blue-50 shadow-lg shadow-blue-100"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
              }`}
            >
              {selected.id === visit.id && (
                <motion.div
                  layoutId="selectedVisit"
                  className="absolute inset-0 rounded-2xl border-2 border-blue-600"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <div className="text-3xl mb-3">{visit.icon}</div>
              <h3 className="font-bold text-slate-900 mb-1">{visit.label}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{visit.description}</p>
              <div className="mt-3 flex items-center gap-1 text-xs font-medium text-slate-400">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                ~{visit.avgWait}
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Treatments() {
  return (
    <section id="treatments" className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">What We Treat</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Common Conditions & Services</h2>
          <p className="text-slate-600 max-w-xl mx-auto">From sore throats to sprains — we handle the urgent stuff so you don't need an ER visit.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {treatmentCategories.map((cat) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-shadow"
            >
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </span>
                {cat.name}
              </h3>
              <ul className="space-y-2">
                {cat.items.map((item) => (
                  <li key={item} className="text-sm text-slate-600 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 p-5 bg-amber-50 border border-amber-200 rounded-xl text-center">
          <p className="text-sm text-amber-800">
            <strong>Life-threatening emergency?</strong> Call 911 or go to your nearest ER. We treat non-life-threatening conditions.
          </p>
        </div>
      </div>
    </section>
  );
}

function VisitFlowSection() {
  return (
    <section id="flow" className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">The Visit Flow</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">What to Expect</h2>
          <p className="text-slate-600 max-w-xl mx-auto">From online check-in to walking out — here's your visit in 5 steps.</p>
        </div>
        <div className="relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200"></div>
          <div className="grid md:grid-cols-5 gap-6 md:gap-4">
            {visitFlow.map((step) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: step.number * 0.1 }}
                className="relative text-center"
              >
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4 relative z-10 shadow-lg shadow-blue-200">
                  {step.number}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 mb-3 leading-relaxed">{step.description}</p>
                <span className="inline-block text-xs font-medium bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
                  {step.duration}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">Transparent Pricing</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">No Surprise Bills</h2>
          <p className="text-slate-600 max-w-xl mx-auto">Know what you'll pay before your visit. Self-pay and insured options available.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {/* Pricing table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50">
              <h3 className="font-bold text-slate-900">Self-Pay Rates</h3>
              <p className="text-sm text-slate-500">For patients without insurance</p>
            </div>
            <div className="divide-y divide-slate-100">
              {pricingTiers.map((tier) => (
                <div key={tier.type} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div>
                    <p className="font-medium text-slate-800">{tier.type}</p>
                    <p className="text-xs text-slate-500">{tier.note}</p>
                  </div>
                  <span className="font-bold text-slate-900 whitespace-nowrap">{tier.range}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Insurance info */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                Insurance Accepted
              </h3>
              <div className="flex flex-wrap gap-2">
                {insuranceAccepted.map((ins) => (
                  <span key={ins} className="px-3 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg border border-blue-100">
                    {ins}
                  </span>
                ))}
              </div>
              <p className="text-sm text-slate-500 mt-4">Don't see yours? Call us — we work with most major plans.</p>
            </div>
            <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-6">
              <h3 className="font-bold text-emerald-900 mb-2">💡 Good to Know</h3>
              <ul className="space-y-2 text-sm text-emerald-800">
                <li>• Most copays range $25–$50 for urgent care visits</li>
                <li>• We provide superbills for out-of-network reimbursement</li>
                <li>• No facility fees — just the visit charge</li>
                <li>• Payment plans available for balances over $200</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 text-center">
          <p className="text-sm text-slate-500">
            <strong className="text-slate-700">Disclaimer:</strong> Prices are estimates and may vary based on complexity of care, additional testing, or procedures. Final charges determined at time of service. Contact us for specific questions.
          </p>
        </div>
      </div>
    </section>
  );
}

function ClinicStatus() {
  const now = new Date();
  const hour = now.getHours();
  const isOpen = hour >= 8 && hour < 20;

  return (
    <section id="status" className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">Clinic Status</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Right Now at RapidWell</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="font-bold text-slate-900 mb-3">Hours</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-slate-500">Mon–Fri</span><span className="font-medium text-slate-800">{clinicHours.weekdays}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Sat–Sun</span><span className="font-medium text-slate-800">{clinicHours.weekends}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Holidays</span><span className="font-medium text-slate-800">{clinicHours.holidays}</span></div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <StatusDot status={isOpen ? "green" : "red"} />
              <span className={`text-sm font-medium ${isOpen ? "text-emerald-700" : "text-red-700"}`}>
                {isOpen ? "Currently Open" : "Currently Closed"}
              </span>
            </div>
          </motion.div>

          {/* Providers */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <h3 className="font-bold text-slate-900 mb-3">Providers On Duty</h3>
            <div className="space-y-3">
              {providers.map((p) => (
                <div key={p.name} className="flex items-center gap-2">
                  <StatusDot status={p.status === "available" ? "green" : p.status === "busy" ? "yellow" : "red"} />
                  <div>
                    <p className="text-sm font-medium text-slate-800">{p.name}</p>
                    <p className="text-xs text-slate-500">{p.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Wait Time */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white hover:shadow-lg transition-shadow"
          >
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3 className="font-bold text-white/90 mb-1">Current Wait</h3>
            <p className="text-xs text-white/60 mb-3">Updated in real-time</p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold">~14</span>
              <span className="text-lg text-white/80">min</span>
            </div>
            <p className="text-sm text-white/70 mt-2">Based on current patient volume</p>
          </motion.div>

          {/* Testing */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
            </div>
            <h3 className="font-bold text-slate-900 mb-3">Testing Available</h3>
            <div className="space-y-2">
              {["COVID / Flu", "Strep", "Urinalysis", "X-Ray", "Basic Labs"].map((test) => (
                <div key={test} className="flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  <span className="text-slate-700">{test}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function IntakeChecklist() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<string>("all");

  const toggle = useCallback((id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const categories = ["all", ...Array.from(new Set(intakeChecklist.map((i) => i.category)))];
  const filtered = filter === "all" ? intakeChecklist : intakeChecklist.filter((i) => i.category === filter);
  const progress = Math.round((checked.size / intakeChecklist.length) * 100);
  const requiredDone = intakeChecklist.filter((i) => i.required).every((i) => checked.has(i.id));

  return (
    <section id="forms" className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-5">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">Save Time</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Forms Before Arrival</h2>
          <p className="text-slate-600 max-w-xl mx-auto">Complete these items before your visit. Check them off as you prepare.</p>
        </div>

        {/* Progress bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-slate-700">Preparation Progress</span>
            <span className="text-sm font-bold text-blue-600">{progress}%</span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 100 }}
            />
          </div>
          <div className="flex items-center gap-2 mt-3">
            {requiredDone ? (
              <span className="text-sm text-emerald-700 font-medium flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                All required items complete
              </span>
            ) : (
              <span className="text-sm text-slate-500">
                {intakeChecklist.filter((i) => i.required && !checked.has(i.id)).length} required items remaining
              </span>
            )}
          </div>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === cat
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-blue-300"
              }`}
            >
              {cat === "all" ? "All Items" : cat}
            </button>
          ))}
        </div>

        {/* Checklist */}
        <div className="space-y-2">
          {filtered.map((item: IntakeItem) => (
            <motion.button
              key={item.id}
              onClick={() => toggle(item.id)}
              whileTap={{ scale: 0.99 }}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                checked.has(item.id)
                  ? "bg-emerald-50 border-emerald-200"
                  : "bg-white border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                checked.has(item.id)
                  ? "bg-emerald-500 border-emerald-500"
                  : "border-slate-300"
              }`}>
                {checked.has(item.id) && (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                )}
              </div>
              <div className="flex-1">
                <p className={`font-medium ${checked.has(item.id) ? "text-emerald-800 line-through" : "text-slate-800"}`}>
                  {item.label}
                </p>
              </div>
              {item.required && (
                <span className="text-xs font-medium bg-red-50 text-red-600 px-2 py-0.5 rounded-full">Required</span>
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

function CheckInForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    dob: "",
    reason: "illness",
    arrivalTime: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="checkin" className="py-16 md:py-24 bg-gradient-to-br from-navy-900 to-slate-900">
        <div className="max-w-2xl mx-auto px-5 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-3">You're Checked In!</h2>
          <p className="text-slate-300 mb-6">We'll text you when it's almost your turn. Head to the clinic when your arrival time approaches.</p>
          <div className="bg-white/10 rounded-xl p-5 backdrop-blur-sm border border-white/10 inline-block">
            <p className="text-white/70 text-sm">Your position in queue</p>
            <p className="text-3xl font-bold text-white">#4</p>
            <p className="text-emerald-400 text-sm font-medium">Est. wait: ~14 min</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="checkin" className="py-16 md:py-24 bg-gradient-to-br from-navy-900 to-slate-900">
      <div className="max-w-2xl mx-auto px-5">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-2">Online Check-In</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Reserve Your Spot</h2>
          <p className="text-slate-400">Fill this out now and skip the paperwork when you arrive.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="Jane Smith"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Date of Birth</label>
                <input
                  type="date"
                  required
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Reason for Visit</label>
              <select
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
              >
                {visitTypes.map((v) => (
                  <option key={v.id} value={v.id}>{v.icon} {v.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Expected Arrival Time</label>
              <input
                type="time"
                required
                value={formData.arrivalTime}
                onChange={(e) => setFormData({ ...formData, arrivalTime: e.target.value })}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-7 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20 hover:shadow-xl"
          >
            Check In Now — Join the Queue
          </button>
          <p className="text-xs text-slate-400 text-center mt-4">
            By checking in, you agree to our terms. Your spot is held for 30 minutes past your arrival time.
          </p>
        </form>
      </div>
    </section>
  );
}

function MobileStickyBar({ selectedVisit }: { selectedVisit: VisitType }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-slate-200 p-3 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
      <a
        href="#checkin"
        className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white font-semibold py-3.5 rounded-xl shadow-lg"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
        Check In — {selectedVisit.label} Visit
      </a>
    </div>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          </div>
          <span className="font-bold text-slate-900 text-lg">RapidWell</span>
        </a>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#visit-types" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Visit Types</a>
          <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Pricing</a>
          <a href="#status" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Status</a>
          <a href="#forms" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Forms</a>
          <a href="#checkin" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all">
            Check In
          </a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 pb-24 md:pb-12">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              </div>
              <span className="font-bold text-white text-lg">RapidWell</span>
            </div>
            <p className="text-sm">Urgent care that respects your time. Walk in or check in online.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Contact</h4>
            <div className="space-y-2 text-sm">
              <p>📍 1234 Healthcare Blvd, Suite 100</p>
              <p>📞 (555) 987-6543</p>
              <p>✉️ info@rapidwell.care</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <p><a href="#visit-types" className="hover:text-white transition-colors">Visit Types</a></p>
              <p><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></p>
              <p><a href="#forms" className="hover:text-white transition-colors">Intake Forms</a></p>
              <p><a href="#checkin" className="hover:text-white transition-colors">Online Check-In</a></p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Emergency</h4>
            <p className="text-sm mb-3">For life-threatening emergencies, call 911 or go to the nearest ER.</p>
            <div className="bg-red-900/30 border border-red-800 rounded-lg p-3">
              <p className="text-red-300 text-sm font-medium">🚨 Emergency: 911</p>
              <p className="text-red-300/70 text-xs mt-1">Poison Control: 1-800-222-1222</p>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-6 text-center text-sm">
          <p>© 2026 RapidWell Urgent Care. All rights reserved. This is a demo site.</p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [selectedVisit, setSelectedVisit] = useState<VisitType>(visitTypes[0]);
  const { waitTime, queueLength } = useLiveWaitTime();

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Header />
      <main>
        <Hero selectedVisit={selectedVisit} waitTime={waitTime} queueLength={queueLength} />
        <VisitSelector selected={selectedVisit} onSelect={setSelectedVisit} />
        <Treatments />
        <VisitFlowSection />
        <Pricing />
        <ClinicStatus />
        <IntakeChecklist />
        <CheckInForm />
      </main>
      <Footer />
      <MobileStickyBar selectedVisit={selectedVisit} />
    </div>
  );
}
