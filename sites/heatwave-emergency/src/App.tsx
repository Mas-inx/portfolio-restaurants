import { useState } from 'react';
import { emergencyIssues, dispatchSteps, safetyChecklist, truckEquipment, pricing, coverageCities, heroImage } from './data';

function App() {
  const [navOpen, setNavOpen] = useState(false);

  const getUrgencyClass = (urgency: string) => {
    switch (urgency) {
      case 'Critical': return 'urgency-critical';
      case 'High': return 'urgency-high';
      case 'Emergency': return 'urgency-emergency';
      default: return 'urgency-critical';
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-900 text-gray-200 antialiased overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-charcoal-800/95 backdrop-blur border-b border-charcoal-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-warning flex items-center justify-center text-charcoal-900 font-black text-sm">HE</div>
            <div>
              <span className="font-bold text-lg text-white">Heatwave</span>
              <span className="text-sm text-gray-400 ml-1">Emergency HVAC</span>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1 ml-2 bg-alert-red/20 text-alert-red text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              24/7
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#emergencies" className="text-gray-300 hover:text-warning transition-colors">Emergencies</a>
            <a href="#dispatch" className="text-gray-300 hover:text-warning transition-colors">How It Works</a>
            <a href="#safety" className="text-gray-300 hover:text-warning transition-colors">Safety</a>
            <a href="#pricing" className="text-gray-300 hover:text-warning transition-colors">Pricing</a>
            <a href="#coverage" className="text-gray-300 hover:text-warning transition-colors">Coverage</a>
            <a href="tel:+13035500100" className="inline-flex items-center gap-1.5 bg-warning text-charcoal-900 px-4 py-2 rounded-lg font-bold hover:bg-warning-light transition-colors text-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              (303) 555-0100
            </a>
          </nav>
          <button onClick={() => setNavOpen(!navOpen)} className="md:hidden p-2 text-gray-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={navOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
          </button>
        </div>
        {navOpen && (
          <div className="md:hidden bg-charcoal-800 border-b border-charcoal-700 px-4 pb-4 space-y-3">
            <a href="#emergencies" className="block text-gray-300 font-medium" onClick={() => setNavOpen(false)}>Emergencies</a>
            <a href="#dispatch" className="block text-gray-300 font-medium" onClick={() => setNavOpen(false)}>How It Works</a>
            <a href="#safety" className="block text-gray-300 font-medium" onClick={() => setNavOpen(false)}>Safety</a>
            <a href="#pricing" className="block text-gray-300 font-medium" onClick={() => setNavOpen(false)}>Pricing</a>
            <a href="#coverage" className="block text-gray-300 font-medium" onClick={() => setNavOpen(false)}>Coverage</a>
            <a href="tel:+13035500100" className="block bg-warning text-charcoal-900 text-center py-2 rounded-lg font-bold">Call (303) 555-0100</a>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative bg-charcoal-900 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }} />
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900/90 via-charcoal-800/80 to-charcoal-900/90" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-warning/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-alert-red/5 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-alert-red/20 backdrop-blur px-4 py-1.5 rounded-full text-sm text-alert-red font-bold mb-6">
              <span className="w-2 h-2 rounded-full bg-alert-red animate-ping" />
              24/7 Emergency Service &mdash; We Never Close
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white">
              No heat? No AC?{' '}
              <span className="text-warning">We dispatch now.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl leading-relaxed">
              When your HVAC fails, every minute counts. We answer live 24/7 and have a
              technician at your door fast — with the right parts to fix it on the first visit.
            </p>
            <div className="mt-10 space-y-4 sm:space-y-0 sm:flex sm:gap-4">
              <a href="tel:+13035500100" className="btn-emergency text-lg">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                (303) 555-0100
              </a>
              <a href="#dispatch" className="btn-emergency-secondary text-lg">
                How Emergency Dispatch Works
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-1.5"><svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>60-min average arrival</span>
              <span className="flex items-center gap-1.5"><svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Stocked trucks</span>
              <span className="flex items-center gap-1.5"><svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>No overtime charges</span>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Issues */}
      <section id="emergencies" className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Common Emergency Issues</h2>
          <p className="section-subtitle">If any of these sound familiar, call us now. We'll have a technician on the way within minutes.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {emergencyIssues.map(issue => (
              <div key={issue.id} className="card">
                <div className="flex items-start justify-between">
                  <span className="text-3xl">{issue.icon}</span>
                  <span className={`urgency-badge ${getUrgencyClass(issue.urgency)}`}>{issue.urgency}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mt-3">{issue.title}</h3>
                <p className="text-sm text-gray-400 mt-2 leading-relaxed">{issue.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a href="tel:+13035500100" className="btn-emergency">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              Call (303) 555-0100
            </a>
          </div>
        </div>
      </section>

      {/* Dispatch Flow */}
      <section id="dispatch" className="py-20 sm:py-24 bg-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">How Emergency Dispatch Works</h2>
          <p className="section-subtitle">From your call to a working system — here's exactly what happens.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {dispatchSteps.map(d => (
              <div key={d.step} className="dispatch-card">
                <div className="dispatch-step">{d.step}</div>
                <h3 className="text-base font-semibold text-white">{d.title}</h3>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Checklist */}
      <section id="safety" className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">What To Do While You Wait</h2>
          <p className="section-subtitle">Follow these safety steps before our technician arrives.</p>
          <div className="max-w-3xl mx-auto space-y-3">
            {safetyChecklist.map((item, i) => (
              <div key={i} className="checklist-item">
                <svg className="w-5 h-5 text-warning mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
                <span className="text-sm text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Trucks */}
      <section className="py-20 sm:py-24 bg-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Fully Stocked Service Trucks</h2>
          <p className="section-subtitle">Our vans carry the parts needed for 95% of emergency repairs — so we fix it the first time.</p>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {truckEquipment.map((eq, i) => (
              <span key={i} className="equipment-tag">{eq}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Transparent Pricing</h2>
          <p className="section-subtitle">No surprises. No hidden fees. You'll know the cost before we start work.</p>
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="pricing-card">
              <h3 className="text-lg font-bold text-white">Diagnostic Fee</h3>
              <div className="mt-3 mb-4">
                <span className="text-4xl font-black text-warning">${pricing.diagnosticFee}</span>
              </div>
              <p className="text-xs text-gray-400">Waived if you choose us for the repair</p>
            </div>
            <div className="pricing-card featured">
              <h3 className="text-lg font-bold text-white">After-Hours</h3>
              <div className="mt-3 mb-4">
                <span className="text-4xl font-black text-warning">${pricing.afterHoursFee}</span>
              </div>
              <p className="text-xs text-gray-400">8pm – 7am &bull; Weekends &bull; Holidays</p>
            </div>
            <div className="pricing-card">
              <h3 className="text-lg font-bold text-white">Emergency Trip</h3>
              <div className="mt-3 mb-4">
                <span className="text-4xl font-black text-warning">${pricing.emergencyTripFee}</span>
              </div>
              <p className="text-xs text-gray-400">Priority dispatch &bull; 60-min arrival</p>
            </div>
          </div>
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500 italic max-w-xl mx-auto">{pricing.note}</p>
          </div>
        </div>
      </section>

      {/* Coverage / Service Area */}
      <section id="coverage" className="py-20 sm:py-24 bg-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Coverage Area</h2>
          <p className="section-subtitle">We cover the entire Denver metro and surrounding communities.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 max-w-4xl mx-auto mb-10">
            {coverageCities.map(c => (
              <span key={c} className="equipment-tag text-center">{c}</span>
            ))}
          </div>
          <div className="map-placeholder">
            <div className="text-center">
              <svg className="w-10 h-10 mx-auto mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
              <span>Denver Metro Coverage Map</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-warning-dark via-warning to-warning-light text-charcoal-900 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-black">HVAC emergency? We're standing by.</h2>
          <p className="mt-4 text-lg text-charcoal-900/80 font-medium">Call now — a real person answers, 24/7/365.</p>
          <div className="mt-8">
            <a href="tel:+13035500100" className="inline-flex items-center gap-3 bg-charcoal-900 text-white font-bold px-8 py-4 rounded-xl text-xl hover:bg-charcoal-800 transition-all shadow-lg hover:shadow-xl">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              (303) 555-0100
            </a>
          </div>
          <p className="mt-4 text-sm text-charcoal-900/60">Average pickup: 1 ring &bull; Average arrival: 60 min &bull; Average repair: 2 hours</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal-900 border-t border-charcoal-700 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:flex sm:justify-between sm:text-left">
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <div className="w-7 h-7 rounded-lg bg-warning flex items-center justify-center text-charcoal-900 font-black text-xs">HE</div>
              <span className="font-bold text-lg text-white">Heatwave Emergency HVAC</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">Open 24/7 &bull; 365 days a year</p>
          </div>
          <div className="mt-6 sm:mt-0 space-y-1">
            <p className="text-sm text-gray-400">456 Dispatch Drive, Denver, CO 80203</p>
            <p className="text-sm font-bold text-warning">(303) 555-0100</p>
            <p className="text-xs text-gray-500">Always available &bull; Always answering</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-charcoal-700 text-center text-xs text-gray-600">
          &copy; {new Date().getFullYear()} Heatwave Emergency HVAC. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
