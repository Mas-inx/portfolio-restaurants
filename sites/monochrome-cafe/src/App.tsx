import { useState, useEffect, useRef, useCallback } from 'react';
import { menuItems, roasts, rituals, membershipTiers, galleryImages, hours } from './data';

// ─── Scroll Progress ───
function ScrollProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setWidth(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <div className="scroll-progress" style={{ width: `${width}%` }} />;
}

// ─── Navigation ───
function Nav() {
  return (
    <nav className="nav-bar">
      <div className="nav-logo">Monochrome</div>
      <div className="nav-links">
        <a href="#menu">Menu</a>
        <a href="#roasts">Roasts</a>
        <a href="#rituals">Rituals</a>
        <a href="#visit">Visit</a>
      </div>
    </nav>
  );
}

// ─── Hero Section ───
function Hero() {
  return (
    <section className="hero-section" style={{ padding: '0 32px' }}>
      {/* Calibration marks */}
      <div className="calibration-mark" style={{ top: '40px', right: '32px' }} />
      <div className="calibration-mark" style={{ bottom: '40px', left: '32px' }} />

      {/* Grid overlay */}
      <div className="grid-overlay" style={{ position: 'absolute', inset: 0 }}>
        {Array.from({ length: 12 }).map((_, i) => <div key={i} />)}
      </div>

      {/* Top meta */}
      <div style={{ position: 'absolute', top: '80px', left: '32px' }}>
        <p className="type-mono" style={{ color: '#737373' }}>
          Specialty Coffee · Est. 2019
        </p>
      </div>

      {/* Center visual — minimal espresso cup SVG */}
      <div style={{
        position: 'absolute',
        top: '50%',
        right: '10%',
        transform: 'translateY(-50%)',
        width: '180px',
        height: '180px',
        opacity: 0.08,
      }}>
        <svg viewBox="0 0 100 100" fill="none" stroke="#000" strokeWidth="0.5">
          <ellipse cx="50" cy="70" rx="30" ry="8" />
          <path d="M20 70 L20 40 Q20 20 50 20 Q80 20 80 40 L80 70" />
          <ellipse cx="50" cy="40" rx="30" ry="8" />
          <path d="M80 50 Q95 50 95 60 Q95 70 80 70" />
          {/* Steam lines */}
          <path d="M40 18 Q42 10 40 2" strokeWidth="0.3" />
          <path d="M50 16 Q52 8 50 0" strokeWidth="0.3" />
          <path d="M60 18 Q62 10 60 2" strokeWidth="0.3" />
        </svg>
      </div>

      {/* Headline */}
      <div style={{ maxWidth: '900px' }}>
        <h1 className="hero-headline">
          Coffee,<br />
          reduced to<br />
          the essential.
        </h1>
        <div style={{ marginTop: '48px', display: 'flex', alignItems: 'center', gap: '32px' }}>
          <a href="#visit" className="visit-btn" style={{ borderColor: '#000', color: '#000' }}>
            Visit the Bar
          </a>
          <p className="type-mono" style={{ color: '#737373', maxWidth: '280px' }}>
            Single origin. Precision extraction. No compromise.
          </p>
        </div>
      </div>

      {/* Bottom meta */}
      <div style={{
        position: 'absolute',
        bottom: '32px',
        right: '32px',
        display: 'flex',
        gap: '48px',
      }}>
        <div>
          <p className="type-label" style={{ color: '#a3a3a3', marginBottom: '4px' }}>Location</p>
          <p className="type-mono">47.3769° N</p>
        </div>
        <div>
          <p className="type-label" style={{ color: '#a3a3a3', marginBottom: '4px' }}>Open</p>
          <p className="type-mono">07:00 — 19:00</p>
        </div>
      </div>
    </section>
  );
}

// ─── Menu Section ───
function MenuSection() {
  const [revealedCols, setRevealedCols] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);

  const categories = ['espresso', 'filter', 'milk', 'cold', 'pastry'] as const;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reveal columns one by one
            categories.forEach((_, i) => {
              setTimeout(() => {
                setRevealedCols((prev) => new Set([...prev, i]));
              }, i * 150);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="menu" className="section" ref={sectionRef} style={{ padding: '120px 32px' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px' }}>
          <div>
            <p className="section-label">02 — Menu System</p>
            <h2 className="type-headline" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              The List
            </h2>
          </div>
          <p className="type-mono" style={{ color: '#737373', maxWidth: '240px', textAlign: 'right' }}>
            Prices in EUR. All drinks prepared to order. No substitutions.
          </p>
        </div>

        <div className="menu-grid">
          {categories.map((cat, colIdx) => (
            <div
              key={cat}
              className={`menu-column ${revealedCols.has(colIdx) ? 'revealed' : ''}`}
              style={{ transitionDelay: `${colIdx * 0.05}s` }}
            >
              <div className="menu-column-header">{cat}</div>
              {menuItems
                .filter((item) => item.category === cat)
                .map((item) => (
                  <div key={item.name} className="menu-item">
                    <div className="menu-item-name">{item.name}</div>
                    <div className="menu-item-desc">{item.description}</div>
                    <div className="menu-price">€{item.price}</div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Roast Card ───
function RoastCard({ roast }: { roast: typeof roasts[0] }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="roast-card-container" onClick={() => setFlipped(!flipped)}>
      <div className={`roast-card ${flipped ? 'flipped' : ''}`}>
        {/* Front */}
        <div className="roast-card-face" style={{ background: '#ffffff' }}>
          <div>
            <p className="type-label" style={{ color: '#a3a3a3', marginBottom: '16px' }}>
              {roast.roast} roast
            </p>
            <h3 className="type-headline" style={{ fontSize: '1.75rem', marginBottom: '8px' }}>
              {roast.name}
            </h3>
            <p className="type-mono" style={{ color: '#737373' }}>{roast.origin}</p>
          </div>

          <div>
            {/* Intensity */}
            <div style={{ marginBottom: '16px' }}>
              <p className="type-label" style={{ color: '#a3a3a3', marginBottom: '8px' }}>Intensity</p>
              <div className="roast-intensity-bar">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`roast-intensity-pip ${i <= roast.intensity ? 'active' : ''}`}
                  />
                ))}
              </div>
            </div>

            {/* Notes */}
            <div style={{ marginBottom: '16px' }}>
              <p className="type-label" style={{ color: '#a3a3a3', marginBottom: '8px' }}>Notes</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {roast.notes.map((note) => (
                  <span
                    key={note}
                    style={{
                      border: '1px solid #000',
                      padding: '2px 8px',
                      fontSize: '0.6875rem',
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            <p className="type-label" style={{ color: '#a3a3a3' }}>
              Tap to reveal specs →
            </p>
          </div>
        </div>

        {/* Back */}
        <div className="roast-card-face roast-card-back">
          <div>
            <p className="type-label roast-detail-label" style={{ marginBottom: '16px' }}>
              Specifications
            </p>
            <h3 className="type-headline" style={{ fontSize: '1.5rem', marginBottom: '24px' }}>
              {roast.name}
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <p className="type-label roast-detail-label">Origin</p>
              <p className="type-mono roast-detail-value" style={{ color: '#fff' }}>{roast.origin}</p>
            </div>
            <div>
              <p className="type-label roast-detail-label">Process</p>
              <p className="type-mono roast-detail-value" style={{ color: '#fff' }}>{roast.process}</p>
            </div>
            <div>
              <p className="type-label roast-detail-label">Altitude</p>
              <p className="type-mono roast-detail-value" style={{ color: '#fff' }}>{roast.altitude}</p>
            </div>
            <div>
              <p className="type-label roast-detail-label">Brew Method</p>
              <p className="type-mono roast-detail-value" style={{ color: '#fff' }}>{roast.brewMethod}</p>
            </div>
            <div>
              <p className="type-label roast-detail-label">Intensity</p>
              <div className="roast-intensity-bar" style={{ marginTop: '6px' }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`roast-intensity-pip ${i <= roast.intensity ? 'active' : ''}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <p className="type-label" style={{ color: '#737373' }}>
            ← Tap to return
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Roasts Section ───
function RoastsSection() {
  return (
    <section id="roasts" className="section" style={{ padding: '120px 32px' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        <div style={{ marginBottom: '64px' }}>
          <p className="section-label">03 — Roast Notes</p>
          <h2 className="type-headline" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            Current Selection
          </h2>
          <p className="type-mono" style={{ color: '#737373', marginTop: '16px', maxWidth: '400px' }}>
            Six origins, rotating monthly. Each card reveals full specifications.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '24px',
        }}>
          {roasts.map((roast) => (
            <RoastCard key={roast.id} roast={roast} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Bar Layout (Floorplan) ───
function BarLayout() {
  return (
    <section className="section" style={{ padding: '120px 32px' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        <div style={{ marginBottom: '64px' }}>
          <p className="section-label">04 — Bar Layout</p>
          <h2 className="type-headline" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            The Space
          </h2>
        </div>

        <div className="floorplan">
          {/* Standing Bar */}
          <div className="floorplan-zone" style={{ top: '10%', left: '5%', width: '35%', height: '25%' }}>
            Standing Bar
          </div>
          {/* Brew Station */}
          <div className="floorplan-zone" style={{ top: '10%', left: '45%', width: '25%', height: '25%' }}>
            Brew Station
          </div>
          {/* Retail Shelf */}
          <div className="floorplan-zone" style={{ top: '10%', right: '5%', width: '20%', height: '25%' }}>
            Retail
          </div>
          {/* Seating A */}
          <div className="floorplan-zone" style={{ bottom: '15%', left: '5%', width: '25%', height: '45%' }}>
            Seating A
          </div>
          {/* Seating B */}
          <div className="floorplan-zone" style={{ bottom: '15%', left: '35%', width: '25%', height: '45%' }}>
            Seating B
          </div>
          {/* Window */}
          <div className="floorplan-zone" style={{ bottom: '15%', right: '5%', width: '30%', height: '45%' }}>
            Window Counter
          </div>

          {/* Calibration mark */}
          <div className="calibration-mark" style={{ top: '50%', left: '50%' }} />
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '24px',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.625rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#737373',
        }}>
          <span>120 sqm</span>
          <span>28 seats + 12 standing</span>
          <span>Scale 1:100</span>
        </div>
      </div>
    </section>
  );
}

// ─── Rituals (Sticky Panels) ───
function RitualsSection() {
  const [activeRitual, setActiveRitual] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerTop = -rect.top;
      const scrollHeight = containerRef.current.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, containerTop / scrollHeight));
      const idx = Math.min(rituals.length - 1, Math.floor(progress * rituals.length));
      setActiveRitual(idx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="rituals" className="section" style={{ borderBottom: 'none', padding: 0 }}>
      <div style={{ padding: '120px 32px 48px' }}>
        <p className="section-label">05 — Rituals</p>
        <h2 className="type-headline" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
          Three Moments
        </h2>
      </div>

      <div className="ritual-scroll-space" ref={containerRef}>
        <div className="ritual-sticky">
          <div style={{ padding: '0 32px', maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '80px',
              alignItems: 'center',
            }}>
              {/* Left — Composition */}
              <div>
                {(() => {
                  const isDark = activeRitual === 2;
                  const strokeColor = isDark ? '#fff' : '#000';
                  const fillColor = isDark ? '#fff' : '#000';
                  const bgColor = activeRitual === 0 ? '#fff' : activeRitual === 1 ? '#f5f5f5' : '#000';
                  const metaColor = isDark ? '#737373' : '#a3a3a3';
                  return (
                    <div style={{
                      width: '100%',
                      aspectRatio: '1',
                      border: '1px solid #000',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: bgColor,
                      transition: 'background 0.6s ease',
                    }}>
                      <svg viewBox="0 0 200 200" style={{ width: '60%', height: '60%' }}>
                        {activeRitual === 0 && (
                          <>
                            <circle cx="100" cy="100" r="40" fill="none" stroke={strokeColor} strokeWidth="0.5" />
                            <circle cx="100" cy="100" r="20" fill={fillColor} />
                            <line x1="100" y1="20" x2="100" y2="180" stroke={strokeColor} strokeWidth="0.3" />
                          </>
                        )}
                        {activeRitual === 1 && (
                          <>
                            <rect x="60" y="60" width="80" height="80" fill="none" stroke={strokeColor} strokeWidth="0.5" />
                            <line x1="60" y1="100" x2="140" y2="100" stroke={strokeColor} strokeWidth="0.3" />
                            <line x1="100" y1="60" x2="100" y2="140" stroke={strokeColor} strokeWidth="0.3" />
                            <circle cx="100" cy="100" r="8" fill={fillColor} />
                          </>
                        )}
                        {activeRitual === 2 && (
                          <>
                            <circle cx="100" cy="100" r="60" fill="none" stroke="#fff" strokeWidth="0.5" />
                            <circle cx="100" cy="100" r="40" fill="none" stroke="#fff" strokeWidth="0.3" />
                            <circle cx="100" cy="100" r="20" fill="none" stroke="#fff" strokeWidth="0.3" />
                            <circle cx="100" cy="100" r="4" fill="#fff" />
                          </>
                        )}
                      </svg>

                      <div style={{
                        position: 'absolute',
                        top: '16px',
                        left: '16px',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.5625rem',
                        letterSpacing: '0.1em',
                        color: metaColor,
                      }}>
                        {rituals[activeRitual].time}
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Right — Text */}
              <div>
                {rituals.map((ritual, i) => (
                  <div
                    key={ritual.id}
                    className="ritual-panel"
                    style={{
                      display: i === activeRitual ? 'block' : 'none',
                    }}
                  >
                    <p className="type-label" style={{ color: '#a3a3a3', marginBottom: '16px' }}>
                      {ritual.time}
                    </p>
                    <h3 className="type-headline" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', marginBottom: '24px' }}>
                      {ritual.title}
                    </h3>
                    <p className="type-body" style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '32px', maxWidth: '420px', color: '#404040' }}>
                      {ritual.description}
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
                      <div>
                        <p className="type-label" style={{ color: '#a3a3a3', marginBottom: '4px' }}>Brew</p>
                        <p className="type-mono">{ritual.brew}</p>
                      </div>
                      <div>
                        <p className="type-label" style={{ color: '#a3a3a3', marginBottom: '4px' }}>Duration</p>
                        <p className="type-mono">{ritual.duration}</p>
                      </div>
                      <div>
                        <p className="type-label" style={{ color: '#a3a3a3', marginBottom: '4px' }}>Temp</p>
                        <p className="type-mono">{ritual.temperature}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Progress indicators */}
                <div style={{ display: 'flex', gap: '8px', marginTop: '48px' }}>
                  {rituals.map((_, i) => (
                    <div
                      key={i}
                      style={{
                        width: i === activeRitual ? '32px' : '8px',
                        height: '2px',
                        background: i === activeRitual ? '#000' : '#d4d4d4',
                        transition: 'all 0.3s ease',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Membership ───
function MembershipSection() {
  return (
    <section className="section" style={{ padding: '120px 32px' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        <div style={{ marginBottom: '64px' }}>
          <p className="section-label">06 — Membership</p>
          <h2 className="type-headline" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            The Club
          </h2>
          <p className="type-mono" style={{ color: '#737373', marginTop: '16px', maxWidth: '400px' }}>
            Three tiers. No contracts. Cancel anytime. Coffee, systematized.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0',
        }}>
          {membershipTiers.map((tier) => (
            <div
              key={tier.name}
              className={`membership-card ${tier.highlight ? 'highlighted' : ''}`}
              style={{ borderRight: 'none' }}
            >
              <p className="type-label" style={{
                color: tier.highlight ? '#737373' : '#a3a3a3',
                marginBottom: '24px',
              }}>
                {tier.name}
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '32px' }}>
                <span className="membership-price">€{tier.price}</span>
                <span className="membership-freq" style={{ color: tier.highlight ? '#737373' : '#a3a3a3' }}>
                  {tier.frequency}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {tier.includes.map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.5625rem',
                      marginTop: '4px',
                      opacity: 0.5,
                    }}>
                      —
                    </span>
                    <span className="type-mono" style={{ fontSize: '0.75rem', lineHeight: '1.4' }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Gallery Strip ───
function GalleryStrip() {
  return (
    <section className="section" style={{ padding: '120px 0 120px 0', borderBottom: '1px solid #000' }}>
      <div style={{ padding: '0 32px', marginBottom: '48px' }}>
        <p className="section-label">07 — Gallery</p>
        <h2 className="type-headline" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
          Objects
        </h2>
      </div>

      <div className="gallery-strip" style={{ paddingLeft: '32px' }}>
        {galleryImages.map((img, i) => (
          <div key={i} className="gallery-item">
            {/* Abstract monochrome image placeholder */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(${135 + i * 30}deg, #f5f5f5 0%, #e5e5e5 40%, #d4d4d4 100%)`,
            }} />
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <svg viewBox="0 0 100 100" style={{ width: '40%', opacity: 0.15 }}>
                {i % 3 === 0 && <circle cx="50" cy="50" r="30" fill="none" stroke="#000" strokeWidth="0.5" />}
                {i % 3 === 1 && <rect x="25" y="25" width="50" height="50" fill="none" stroke="#000" strokeWidth="0.5" />}
                {i % 3 === 2 && <polygon points="50,20 80,80 20,80" fill="none" stroke="#000" strokeWidth="0.5" />}
              </svg>
            </div>
            <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', justifyContent: 'space-between' }}>
              <span className="type-mono" style={{ fontSize: '0.625rem', color: '#737373' }}>{img.alt}</span>
              <span className="type-mono" style={{ fontSize: '0.625rem', color: '#a3a3a3' }}>{img.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Visit CTA ───
function VisitSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  }, [email]);

  return (
    <section id="visit" className="visit-section" style={{ padding: '120px 32px' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
        }}>
          {/* Left */}
          <div>
            <p className="type-label" style={{ color: '#737373', marginBottom: '24px' }}>08 — Visit</p>
            <h2 className="type-headline" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', marginBottom: '48px' }}>
              Find<br />the bar.
            </h2>

            <div style={{ marginBottom: '40px' }}>
              <p className="type-label" style={{ color: '#737373', marginBottom: '12px' }}>Address</p>
              <p className="type-mono" style={{ color: '#d4d4d4', lineHeight: '1.8' }}>
                Monochrome Cafe<br />
                Bahnhofstrasse 42<br />
                8001 Zürich<br />
                Switzerland
              </p>
            </div>

            <div style={{ marginBottom: '40px' }}>
              <p className="type-label" style={{ color: '#737373', marginBottom: '12px' }}>Hours</p>
              {hours.map((h) => (
                <div key={h.day} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  maxWidth: '300px',
                  padding: '6px 0',
                  borderBottom: '1px solid #262626',
                }}>
                  <span className="type-mono" style={{ color: '#a3a3a3' }}>{h.day}</span>
                  <span className="type-mono" style={{ color: '#d4d4d4' }}>{h.time}</span>
                </div>
              ))}
            </div>

            <a href="https://maps.google.com" target="_blank" rel="noopener" className="visit-btn">
              Open in Maps
            </a>
          </div>

          {/* Right — Newsletter */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <p className="type-label" style={{ color: '#737373', marginBottom: '12px' }}>Newsletter</p>
            <p className="type-body" style={{ color: '#a3a3a3', marginBottom: '32px', maxWidth: '360px', lineHeight: '1.6' }}>
              New origins, cupping events, and quiet announcements. Monthly. No noise.
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  style={{
                    background: 'transparent',
                    border: '1px solid #404040',
                    borderRight: 'none',
                    padding: '14px 20px',
                    color: '#ffffff',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.75rem',
                    outline: 'none',
                    flex: 1,
                    maxWidth: '300px',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: '#ffffff',
                    color: '#000000',
                    border: '1px solid #ffffff',
                    padding: '14px 24px',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.6875rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'background 0.15s ease, color 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#ffffff';
                    e.currentTarget.style.color = '#000000';
                  }}
                >
                  Subscribe
                </button>
              </form>
            ) : (
              <p className="type-mono" style={{ color: '#ffffff' }}>
                ✓ Received. Welcome to the list.
              </p>
            )}

            {/* Footer meta */}
            <div style={{
              marginTop: '80px',
              paddingTop: '32px',
              borderTop: '1px solid #262626',
              display: 'flex',
              justifyContent: 'space-between',
            }}>
              <span className="type-mono" style={{ color: '#404040', fontSize: '0.625rem' }}>
                © 2024 Monochrome Cafe
              </span>
              <span className="type-mono" style={{ color: '#404040', fontSize: '0.625rem' }}>
                Zürich · 47.3769° N
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── App ───
export default function App() {
  return (
    <div style={{ background: '#ffffff', color: '#000000' }}>
      <ScrollProgress />
      <Nav />
      <Hero />
      <MenuSection />
      <RoastsSection />
      <BarLayout />
      <RitualsSection />
      <MembershipSection />
      <GalleryStrip />
      <VisitSection />
    </div>
  );
}
