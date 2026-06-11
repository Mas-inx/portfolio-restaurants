import { useState } from 'react';
import { efficiencyServices, upgradeSteps, smartFeatures, rebates, caseExamples } from './data';

function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [electricBill, setElectricBill] = useState(250);
  const [homeSize, setHomeSize] = useState(2000);

  // Mock savings calculation
  const estimatedSavings = Math.round(electricBill * 0.35);
  const estimatedAnnual = Math.round(estimatedSavings * 12);

  return (
    <div className="min-h-screen bg-sage-50 text-slate-700 antialiased overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-sage-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-700 flex items-center justify-center text-white font-bold text-sm">EB</div>
            <span className="font-bold text-xl text-teal-700">EcoBreeze</span>
            <span className="hidden sm:inline text-sm text-sage-500 ml-1">Comfort Systems</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#services" className="hover:text-teal-700 transition-colors">Services</a>
            <a href="#savings" className="hover:text-teal-700 transition-colors">Savings</a>
            <a href="#process" className="hover:text-teal-700 transition-colors">Process</a>
            <a href="#rebates" className="hover:text-teal-700 transition-colors">Rebates</a>
            <a href="#cases" className="hover:text-teal-700 transition-colors">Results</a>
            <a href="#cta" className="inline-flex items-center gap-1 bg-teal-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-teal-800 transition-colors text-sm">
              Get Your Quote
            </a>
          </nav>
          <button onClick={() => setNavOpen(!navOpen)} className="md:hidden p-2 text-slate-500">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={navOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
          </button>
        </div>
        {navOpen && (
          <div className="md:hidden bg-white border-b border-sage-100 px-4 pb-4 space-y-3">
            <a href="#services" className="block text-slate-600 font-medium" onClick={() => setNavOpen(false)}>Services</a>
            <a href="#savings" className="block text-slate-600 font-medium" onClick={() => setNavOpen(false)}>Savings</a>
            <a href="#process" className="block text-slate-600 font-medium" onClick={() => setNavOpen(false)}>Process</a>
            <a href="#rebates" className="block text-slate-600 font-medium" onClick={() => setNavOpen(false)}>Rebates</a>
            <a href="#cases" className="block text-slate-600 font-medium" onClick={() => setNavOpen(false)}>Results</a>
            <a href="#cta" className="block bg-teal-700 text-white text-center py-2 rounded-lg font-semibold" onClick={() => setNavOpen(false)}>Get Your Quote</a>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-sage-50 to-sage-100" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-teal-700/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-sky-light/20 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-teal-700/10 px-4 py-1.5 rounded-full text-sm text-teal-700 font-semibold mb-6">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                Energy-Efficient Heating & Cooling
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-teal-800">
                Lower energy bills{' '}
                <span className="text-teal-600">without giving up comfort.</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-slate-500 max-w-xl leading-relaxed">
                Smart, efficient HVAC solutions that cut your energy use by up to 50% —
                without sacrificing the comfort your family deserves.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#cta" className="btn-primary text-base">
                  Get Your Free Quote
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </a>
                <a href="#savings" className="btn-outline-green text-base">
                  Calculate Your Savings
                </a>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-gradient-to-br from-sage-300 to-teal-700 rounded-3xl p-8 text-white">
                <div className="text-5xl font-black">50%</div>
                <p className="text-lg mt-1 text-white/80">potential energy savings</p>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">🌡️</div>
                    <div><div className="font-semibold">Smart Temperature Control</div><div className="text-sm text-white/60">Adaptive learning thermostat</div></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">🔋</div>
                    <div><div className="font-semibold">SEER2 26 Rated</div><div className="text-sm text-white/60">Maximum efficiency available</div></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">🏠</div>
                    <div><div className="font-semibold">Whole-Home Zoning</div><div className="text-sm text-white/60">Custom comfort per room</div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Efficiency Services */}
      <section id="services" className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Efficiency Services</h2>
          <p className="section-subtitle">Every solution we offer is designed to maximize comfort while minimizing energy waste.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {efficiencyServices.map(s => (
              <div key={s.id} className="card">
                <span className="text-3xl">{s.icon}</span>
                <h3 className="text-lg font-semibold text-teal-700 mt-3">{s.title}</h3>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Savings Calculator */}
      <section id="savings" className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">See Your Potential Savings</h2>
          <p className="section-subtitle">Adjust the sliders to estimate how much you could save with an EcoBreeze efficiency upgrade.</p>
          <div className="calculator-widget">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-slate-700">Monthly Electric Bill</span>
                  <span className="font-bold text-teal-700">${electricBill}</span>
                </div>
                <input type="range" min="100" max="600" value={electricBill} onChange={e => setElectricBill(Number(e.target.value))} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-slate-700">Home Size (sq ft)</span>
                  <span className="font-bold text-teal-700">{homeSize.toLocaleString()}</span>
                </div>
                <input type="range" min="800" max="5000" step="100" value={homeSize} onChange={e => setHomeSize(Number(e.target.value))} />
              </div>
            </div>
            <div className="mt-8 p-5 bg-teal-700 rounded-xl text-white text-center">
              <p className="text-sm text-teal-100">Estimated Monthly Savings</p>
              <p className="text-4xl font-black mt-1">${estimatedSavings.toLocaleString()}</p>
              <p className="text-sm text-teal-200 mt-1">${estimatedAnnual.toLocaleString()} per year</p>
            </div>
            <div className="mt-4 text-xs text-slate-400 text-center">
              Based on average energy savings from efficiency upgrades in similar homes. Actual savings may vary.
            </div>
            <div className="mt-6">
              <a href="#cta" className="btn-primary w-full justify-center text-base">
                Get a Custom Assessment
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* System Upgrade Process */}
      <section id="process" className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Your Upgrade Journey</h2>
          <p className="section-subtitle">A clear, four-step process from assessment to optimized performance.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {upgradeSteps.map(s => (
              <div key={s.step} className="step-card">
                <div className="step-num">{s.step}</div>
                <h3 className="text-lg font-semibold text-teal-700 mt-3">{s.title}</h3>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Smart Comfort Features */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Smart Comfort Technology</h2>
          <p className="section-subtitle">Modern HVAC isn't just about equipment — it's about intelligent control and automation.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {smartFeatures.map((f, i) => (
              <div key={i} className="feature-card">
                <h3 className="text-lg font-semibold text-teal-700">{f.title}</h3>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rebates */}
      <section id="rebates" className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Available Rebates & Incentives</h2>
          <p className="section-subtitle">We help you navigate every rebate and tax credit available — up to thousands in savings.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {rebates.map((r, i) => (
              <div key={i} className="rebate-card">
                <div className="text-lg font-black text-teal-700">{r.amount}</div>
                <h3 className="text-base font-semibold text-teal-800 mt-1">{r.name}</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-slate-400 mt-6">Our team handles all rebate paperwork for you.</p>
        </div>
      </section>

      {/* Case Examples */}
      <section id="cases" className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Real Homes, Real Savings</h2>
          <p className="section-subtitle">See how much other Colorado homeowners are saving after upgrading with EcoBreeze.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {caseExamples.map((c, i) => (
              <div key={i} className="case-card">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-teal-700">{c.name}</h3>
                    <p className="text-xs text-slate-400">{c.location}</p>
                  </div>
                  <div className="savings-badge text-lg">{c.savings}</div>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">{c.summary}</p>
                <div className="mt-3 text-xs text-slate-400">Built {c.yearBuilt}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="cta" className="py-20 bg-teal-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold">Ready for a smarter, more efficient home?</h2>
          <p className="mt-4 text-lg text-teal-100">Get a free energy assessment and custom upgrade plan — no obligation.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="tel:+13035500200" className="inline-flex items-center gap-2 bg-white text-teal-700 font-bold px-6 py-3 rounded-xl hover:bg-sage-50 transition-colors text-lg">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              (303) 555-0200
            </a>
            <button className="btn-outline-green border-white text-white hover:bg-white hover:text-teal-700 text-lg">
              Book Free Assessment
            </button>
          </div>
          <p className="mt-4 text-sm text-teal-200">Mon–Fri 8am–6pm &bull; Weekend appointments available</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-teal-800 text-teal-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:flex sm:justify-between sm:text-left">
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <div className="w-7 h-7 rounded-lg bg-sage-400 flex items-center justify-center text-teal-800 font-bold text-xs">EB</div>
              <span className="font-bold text-lg text-white">EcoBreeze Comfort Systems</span>
            </div>
            <p className="text-sm text-teal-200/60 mt-2">Energy-efficient HVAC &bull; Serving Colorado since 2012</p>
          </div>
          <div className="mt-6 sm:mt-0 space-y-1">
            <p className="text-sm text-teal-200/60">789 Green Way, Boulder, CO 80301</p>
            <p className="text-sm font-semibold text-sage-300">(303) 555-0200</p>
            <p className="text-xs text-teal-200/40">Licensed &bull; Insured &bull; Energy Star Partner</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-teal-700 text-center text-xs text-teal-200/40">
          &copy; {new Date().getFullYear()} EcoBreeze Comfort Systems. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
