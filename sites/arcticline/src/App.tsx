import { useState } from 'react';
import { services, maintenancePlans, replacementSteps, whyChooseUs, serviceAreas } from './data';

function App() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-800 antialiased overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-navy-700 flex items-center justify-center text-white font-bold text-sm">AL</div>
            <span className="font-bold text-xl text-navy-800">ArcticLine</span>
            <span className="hidden sm:inline text-sm text-gray-400 ml-1">HVAC</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <a href="#services" className="hover:text-navy-700 transition-colors">Services</a>
            <a href="#plans" className="hover:text-navy-700 transition-colors">Plans</a>
            <a href="#replacement" className="hover:text-navy-700 transition-colors">Replacement</a>
            <a href="#why-us" className="hover:text-navy-700 transition-colors">Why Us</a>
            <a href="#booking" className="inline-flex items-center gap-1 bg-fire text-white px-4 py-2 rounded-lg font-semibold hover:bg-fire-dark transition-colors text-sm">
              Book Now
            </a>
          </nav>
          <button onClick={() => setNavOpen(!navOpen)} className="md:hidden p-2 text-gray-600">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={navOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
          </button>
        </div>
        {navOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 px-4 pb-4 space-y-3">
            <a href="#services" className="block text-gray-600 font-medium" onClick={() => setNavOpen(false)}>Services</a>
            <a href="#plans" className="block text-gray-600 font-medium" onClick={() => setNavOpen(false)}>Plans</a>
            <a href="#replacement" className="block text-gray-600 font-medium" onClick={() => setNavOpen(false)}>Replacement</a>
            <a href="#why-us" className="block text-gray-600 font-medium" onClick={() => setNavOpen(false)}>Why Us</a>
            <a href="#booking" className="block bg-fire text-white text-center py-2 rounded-lg font-semibold" onClick={() => setNavOpen(false)}>Book Now</a>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative bg-navy-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-fire/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-ice-300/5 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-1.5 rounded-full text-sm text-ice-100 mb-6">
              <span className="w-2 h-2 rounded-full bg-fire animate-pulse" />
              Residential HVAC Serving Denver Metro
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              Comfort fixed{' '}
              <span className="text-fire-light">fast</span>,{' '}
              installed{' '}
              <span className="text-ice-300">right</span>.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-ice-100/80 max-w-2xl leading-relaxed">
              From emergency repairs to complete system installations, ArcticLine delivers
              reliable HVAC service with upfront pricing and same-day availability.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#booking" className="btn-primary text-base">
                Schedule Service
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
              <a href="#services" className="btn-outline border-ice-300 text-ice-200 hover:bg-ice-300 hover:text-navy-900">
                Our Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Premium HVAC Services</h2>
          <p className="section-subtitle">From routine maintenance to emergency repairs, we handle every aspect of your home's comfort system.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(s => (
              <div key={s.id} className="card">
                <span className="text-3xl">{s.icon}</span>
                <h3 className="text-lg font-semibold text-navy-800 mt-3">{s.title}</h3>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Service */}
      <section id="booking" className="py-20 sm:py-24 bg-ice-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Schedule Service</h2>
          <p className="section-subtitle">Book a visit at your convenience. Same-day service available for most repairs.</p>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-ice-100 p-6 sm:p-8 booking-form">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input type="text" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input type="text" placeholder="Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input type="tel" placeholder="(303) 555-0123" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Needed</label>
                  <select>
                    <option>AC Repair</option>
                    <option>Heating Repair</option>
                    <option>System Installation</option>
                    <option>Maintenance / Tune-Up</option>
                    <option>Indoor Air Quality</option>
                    <option>Thermostat Installation</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                  <input type="date" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message (optional)</label>
                  <textarea rows={3} placeholder="Describe your issue or special instructions..." />
                </div>
              </div>
              <div className="mt-6">
                <button className="btn-primary w-full justify-center text-base">
                  Book Appointment
                </button>
              </div>
              <p className="text-xs text-gray-400 text-center mt-3">We'll confirm your appointment via text or email within 30 minutes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Maintenance Plans */}
      <section id="plans" className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Maintenance Plans</h2>
          <p className="section-subtitle">Keep your system running efficiently year-round with a plan that fits your needs.</p>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {maintenancePlans.map((plan, i) => (
              <div key={plan.tier} className={`pricing-card ${i === 1 ? 'featured' : ''}`}>
                {i === 1 && <div className="text-xs font-bold text-fire uppercase tracking-wider mb-2">Most Popular</div>}
                <h3 className="text-xl font-bold text-navy-800">{plan.tier}</h3>
                <div className="mt-4 mb-6">
                  <span className="text-4xl font-extrabold text-navy-800">${plan.price}</span>
                  <span className="text-gray-400 text-sm">/{plan.per}</span>
                </div>
                <ul className="space-y-2.5 text-left">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <button className="mt-6 btn-primary w-full justify-center text-sm">Choose {plan.tier}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System Replacement */}
      <section id="replacement" className="py-20 sm:py-24 bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-white">System Replacement</h2>
          <p className="section-subtitle text-ice-100/70">A seamless process from consultation to a perfectly running new system.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {replacementSteps.map(s => (
              <div key={s.step} className="text-center">
                <div className="step-circle mx-auto">{s.step}</div>
                <h3 className="text-lg font-semibold mt-4 text-white">{s.title}</h3>
                <p className="text-sm text-ice-100/60 mt-2 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a href="#booking" className="btn-primary text-base">
              Start Your Free Consultation
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Why Choose ArcticLine?</h2>
          <p className="section-subtitle">We've built our reputation on quality work, honest pricing, and exceptional service.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {whyChooseUs.map((w, i) => (
              <div key={i} className="card">
                <h3 className="text-lg font-semibold text-navy-800">{w.title}</h3>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-20 sm:py-24 bg-ice-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Our Service Area</h2>
          <p className="section-subtitle">Proudly serving homes across the Denver metro area with fast, reliable service.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 max-w-4xl mx-auto mb-10">
            {serviceAreas.map(a => (
              <span key={a} className="area-badge text-center">{a}</span>
            ))}
          </div>
          <div className="map-placeholder">
            <div className="text-center">
              <svg className="w-10 h-10 mx-auto mb-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
              <span>Denver Metro Service Map</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-navy-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold">Ready for reliable comfort?</h2>
          <p className="mt-4 text-lg text-ice-100/70">Call us or book online — we'll have a technician at your door fast.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="#booking" className="btn-primary text-base">
              Book Online
            </a>
            <a href="tel:+13035550123" className="btn-outline border-ice-300 text-ice-200 hover:bg-ice-300 hover:text-navy-900 text-base">
              (303) 555-0123
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-900 border-t border-navy-700 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:flex sm:justify-between sm:text-left">
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <div className="w-7 h-7 rounded-lg bg-ice-300 flex items-center justify-center text-navy-900 font-bold text-xs">AL</div>
              <span className="font-bold text-lg text-white">ArcticLine HVAC</span>
            </div>
            <p className="text-sm text-ice-100/50 mt-2">Licensed &bull; Insured &bull; NATE-Certified</p>
          </div>
          <div className="mt-6 sm:mt-0 space-y-1">
            <p className="text-sm text-ice-100/60">1234 Service Way, Denver, CO 80202</p>
            <p className="text-sm text-ice-100/60">Mon–Sat 7am–7pm | Emergency available</p>
            <p className="text-sm font-semibold text-ice-200">(303) 555-0123</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-navy-700 text-center text-xs text-ice-100/40">
          &copy; {new Date().getFullYear()} ArcticLine HVAC. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
