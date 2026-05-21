// components.jsx — Header, Hero, Rooms, ForWho, Testimonials, Awards, Vouchers, Map, FinalCTA, Footer
const { useState, useEffect, useRef } = React;

// ============================================================
// SHARED ICONS
// ============================================================
const Icon = {
  arrow: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6"/>
    </svg>
  ),
  users: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  clock: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 6v6l4 2"/>
    </svg>
  ),
  brain: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44A2.5 2.5 0 0 1 4.5 17a2.5 2.5 0 0 1-1.43-4.55A2.5 2.5 0 0 1 4.5 7a2.5 2.5 0 0 1 .57-3.4A2.5 2.5 0 0 1 9.5 2zM14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44A2.5 2.5 0 0 0 19.5 17a2.5 2.5 0 0 0 1.43-4.55A2.5 2.5 0 0 0 19.5 7a2.5 2.5 0 0 0-.57-3.4A2.5 2.5 0 0 0 14.5 2z"/>
    </svg>
  ),
  star: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .587l3.668 7.568L24 9.75l-6 5.847 1.416 8.253L12 19.771l-7.416 4.079L6 15.597 0 9.75l8.332-1.595z"/>
    </svg>
  ),
  pin: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  phone: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  mail: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <path d="M22 6l-10 7L2 6"/>
    </svg>
  ),
  search: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <path d="M21 21l-4.35-4.35"/>
    </svg>
  ),
  globe: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  trophy: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2z"/>
    </svg>
  ),
  check: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5"/>
    </svg>
  ),
  facebook: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  instagram: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01"/>
    </svg>
  ),
  bolt: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
    </svg>
  ),
  close: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6L6 18M6 6l12 12"/>
    </svg>
  ),
  plus: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14M5 12h14"/>
    </svg>
  ),
};

// ============================================================
// PLACEHOLDER MEDIA (atmospheric SVGs replacing real photos)
// ============================================================
// Scene-specific placeholder art. Each variant renders a different
// composition that suggests the room's atmosphere. Still SVG, still
// a placeholder — but recognizable as that room's mood.
const PlaceholderMedia = ({ variant = 0, label }) => {
  const seed = variant + 1;
  const uid = `pm-${variant}-${Math.random().toString(36).slice(2, 7)}`;

  // ROOM 0: Sekret dziadka — workshop / barn with warm amber light, bicycle wheel, wood planks
  if (variant === 0) {
    return (
      <svg className="placeholder-media" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id={`${uid}-light`} cx="75%" cy="30%" r="70%">
            <stop offset="0%" stopColor="oklch(0.72 0.16 65)" stopOpacity="0.55"/>
            <stop offset="40%" stopColor="oklch(0.35 0.10 50)" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="oklch(0.10 0.04 50)" stopOpacity="1"/>
          </radialGradient>
          <filter id={`${uid}-grain`}>
            <feTurbulence baseFrequency="0.85" numOctaves="2" seed={seed}/>
            <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.4 0"/>
          </filter>
          <radialGradient id={`${uid}-vig`}>
            <stop offset="55%" stopColor="transparent"/>
            <stop offset="100%" stopColor="oklch(0.05 0.01 40)"/>
          </radialGradient>
        </defs>
        <rect width="400" height="300" fill="oklch(0.13 0.03 50)"/>
        <rect width="400" height="300" fill={`url(#${uid}-light)`}/>
        {/* wooden plank slats */}
        <g opacity="0.55">
          {Array.from({ length: 13 }).map((_, i) => (
            <rect key={i} x={i * 33 - 4} y="0" width="2" height="300" fill="oklch(0.07 0.02 50)"/>
          ))}
        </g>
        {/* floor shadow */}
        <rect x="0" y="235" width="400" height="65" fill="oklch(0.07 0.02 40)" opacity="0.85"/>
        {/* bicycle wheel silhouette */}
        <g stroke="oklch(0.06 0.01 40)" strokeWidth="2.5" fill="none">
          <circle cx="90" cy="170" r="46"/>
          <circle cx="90" cy="170" r="9" fill="oklch(0.06 0.01 40)"/>
          <line x1="90" y1="124" x2="90" y2="216" strokeWidth="1"/>
          <line x1="44" y1="170" x2="136" y2="170" strokeWidth="1"/>
          <line x1="58" y1="138" x2="122" y2="202" strokeWidth="1"/>
          <line x1="122" y1="138" x2="58" y2="202" strokeWidth="1"/>
          <line x1="65" y1="148" x2="115" y2="192" strokeWidth="1"/>
          <line x1="115" y1="148" x2="65" y2="192" strokeWidth="1"/>
        </g>
        {/* hanging tools */}
        <g fill="oklch(0.05 0.01 40)" stroke="oklch(0.05 0.01 40)">
          <line x1="270" y1="0" x2="270" y2="130" strokeWidth="2"/>
          <rect x="255" y="125" width="30" height="14" rx="2"/>
          <line x1="320" y1="0" x2="320" y2="100" strokeWidth="1.5"/>
          <circle cx="320" cy="108" r="9" fill="none" strokeWidth="2"/>
          <line x1="360" y1="0" x2="360" y2="180" strokeWidth="1.5" strokeDasharray="3 2"/>
        </g>
        <rect width="400" height="300" filter={`url(#${uid}-grain)`} opacity="0.45"/>
        <rect width="400" height="300" fill={`url(#${uid}-vig)`}/>
        {label && <text x="20" y="285" fill="rgba(255,255,255,0.45)" fontSize="9" fontFamily="ui-monospace, monospace" letterSpacing="2">{label}</text>}
      </svg>
    );
  }

  // ROOM 1: Dom pogrzebowy — red velvet curtain folds, hanging gold ornament
  if (variant === 1) {
    return (
      <svg className="placeholder-media" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={`${uid}-curtain`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(0.18 0.10 25)"/>
            <stop offset="50%" stopColor="oklch(0.32 0.18 25)"/>
            <stop offset="100%" stopColor="oklch(0.14 0.08 25)"/>
          </linearGradient>
          <radialGradient id={`${uid}-flame`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.85 0.16 75)" stopOpacity="0.95"/>
            <stop offset="40%" stopColor="oklch(0.60 0.20 50)" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="oklch(0.30 0.15 30)" stopOpacity="0"/>
          </radialGradient>
          <filter id={`${uid}-grain`}>
            <feTurbulence baseFrequency="0.85" numOctaves="2" seed={seed}/>
            <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.4 0"/>
          </filter>
          <radialGradient id={`${uid}-vig`}>
            <stop offset="50%" stopColor="transparent"/>
            <stop offset="100%" stopColor="oklch(0.07 0.04 25)"/>
          </radialGradient>
        </defs>
        <rect width="400" height="300" fill="oklch(0.10 0.05 25)"/>
        {/* curtain folds */}
        <rect width="400" height="300" fill={`url(#${uid}-curtain)`} opacity="0.85"/>
        <g opacity="0.45" fill="oklch(0.08 0.05 25)">
          {Array.from({ length: 8 }).map((_, i) => (
            <path key={i} d={`M ${i * 50} 0 Q ${i * 50 + 12} 150 ${i * 50} 300 L ${i * 50 - 14} 300 Q ${i * 50 - 6} 150 ${i * 50 - 14} 0 Z`}/>
          ))}
        </g>
        {/* hanging gold chalice / ornament */}
        <g>
          <line x1="240" y1="0" x2="240" y2="100" stroke="oklch(0.50 0.10 75)" strokeWidth="1" strokeDasharray="2 3" opacity="0.7"/>
          {/* chalice shape */}
          <path d="M 222 100 Q 222 115 240 122 Q 258 115 258 100 L 252 100 L 252 92 L 228 92 L 228 100 Z" fill="oklch(0.60 0.14 75)" opacity="0.85"/>
          <path d="M 232 122 L 248 122 L 246 138 L 234 138 Z" fill="oklch(0.55 0.13 75)" opacity="0.85"/>
          <ellipse cx="240" cy="142" rx="10" ry="3" fill="oklch(0.65 0.15 75)" opacity="0.7"/>
          {/* glow */}
          <circle cx="240" cy="115" r="60" fill={`url(#${uid}-flame)`} opacity="0.5"/>
        </g>
        {/* candle on left */}
        <g>
          <rect x="85" y="200" width="10" height="40" fill="oklch(0.55 0.05 60)"/>
          <ellipse cx="90" cy="195" rx="3" ry="7" fill="oklch(0.90 0.18 75)"/>
          <circle cx="90" cy="198" r="22" fill={`url(#${uid}-flame)`} opacity="0.4"/>
        </g>
        <rect width="400" height="300" filter={`url(#${uid}-grain)`} opacity="0.4"/>
        <rect width="400" height="300" fill={`url(#${uid}-vig)`}/>
        {label && <text x="20" y="285" fill="rgba(255,255,255,0.45)" fontSize="9" fontFamily="ui-monospace, monospace" letterSpacing="2">{label}</text>}
      </svg>
    );
  }

  // ROOM 2: Zielona mila — cold prison: vertical bars, hanging bulb, smoke, cold light
  if (variant === 2) {
    return (
      <svg className="placeholder-media" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id={`${uid}-bulb`} cx="50%" cy="20%" r="50%">
            <stop offset="0%" stopColor="oklch(0.78 0.10 90)" stopOpacity="0.7"/>
            <stop offset="35%" stopColor="oklch(0.40 0.06 80)" stopOpacity="0.35"/>
            <stop offset="100%" stopColor="oklch(0.15 0.02 200)" stopOpacity="0"/>
          </radialGradient>
          <linearGradient id={`${uid}-conebg`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.20 0.03 200)"/>
            <stop offset="100%" stopColor="oklch(0.10 0.02 220)"/>
          </linearGradient>
          <filter id={`${uid}-grain`}>
            <feTurbulence baseFrequency="0.9" numOctaves="2" seed={seed}/>
            <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.45 0"/>
          </filter>
          <filter id={`${uid}-smoke`}>
            <feTurbulence baseFrequency="0.012 0.05" numOctaves="3" seed="7"/>
            <feColorMatrix values="0 0 0 0 0.85  0 0 0 0 0.85  0 0 0 0 0.85  0 0 0 0.3 0"/>
          </filter>
          <radialGradient id={`${uid}-vig`}>
            <stop offset="50%" stopColor="transparent"/>
            <stop offset="100%" stopColor="oklch(0.05 0.02 220)"/>
          </radialGradient>
        </defs>
        <rect width="400" height="300" fill={`url(#${uid}-conebg)`}/>
        {/* concrete wall texture - faint blocks */}
        <g opacity="0.3" fill="oklch(0.16 0.02 220)">
          {Array.from({ length: 6 }).map((_, row) =>
            Array.from({ length: 8 }).map((_, col) => (
              <rect key={`${row}-${col}`} x={col * 52 + (row % 2 === 0 ? 0 : 26)} y={row * 50 + 30} width="48" height="44" rx="1"/>
            ))
          )}
        </g>
        {/* hanging bulb cord */}
        <line x1="200" y1="0" x2="200" y2="68" stroke="oklch(0.20 0.02 220)" strokeWidth="1.5"/>
        {/* bulb base */}
        <rect x="194" y="62" width="12" height="10" fill="oklch(0.25 0.02 220)"/>
        {/* bulb glass */}
        <ellipse cx="200" cy="84" rx="13" ry="16" fill="oklch(0.80 0.08 80)" opacity="0.75"/>
        {/* light cone */}
        <circle cx="200" cy="84" r="170" fill={`url(#${uid}-bulb)`}/>
        {/* prison bars - vertical */}
        <g stroke="oklch(0.06 0.02 200)" strokeWidth="6" opacity="0.9">
          {[40, 100, 160, 220, 280, 340].map((x, i) => <line key={i} x1={x} y1="0" x2={x} y2="300"/>)}
        </g>
        {/* bar highlights */}
        <g stroke="oklch(0.40 0.04 80)" strokeWidth="0.8" opacity="0.6">
          {[40, 100, 160, 220, 280, 340].map((x, i) => <line key={i} x1={x + 2} y1="0" x2={x + 2} y2="300"/>)}
        </g>
        {/* smoke layer */}
        <rect width="400" height="300" filter={`url(#${uid}-smoke)`} opacity="0.35"/>
        <rect width="400" height="300" filter={`url(#${uid}-grain)`} opacity="0.45"/>
        <rect width="400" height="300" fill={`url(#${uid}-vig)`}/>
        {label && <text x="20" y="285" fill="rgba(255,255,255,0.45)" fontSize="9" fontFamily="ui-monospace, monospace" letterSpacing="2">{label}</text>}
      </svg>
    );
  }

  // SCENARIOS 3+ — atmospheric mood gradients with subtle scene cues
  const moods = [
    // 3 — Rodzina: warm window light
    { bg: "oklch(0.18 0.04 70)", glow: "oklch(0.70 0.13 75)", scene: "window" },
    // 4 — Randka: candle-lit intimate
    { bg: "oklch(0.13 0.04 30)", glow: "oklch(0.70 0.17 50)", scene: "candle" },
    // 2 (already used for Dom pogrzeb), but scenarios go 0,1,2,3,4 from the data
    // 0 used for randka, 2 for firma, 1 for panieński, 0 for urodziny, 3 for rodzina
  ];
  // For scenario variants we re-use room SVGs (already specific) plus a subtle overlay
  // Fallback: simple mood
  return (
    <svg className="placeholder-media" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id={`${uid}-glow`} cx="50%" cy="40%" r="80%">
          <stop offset="0%" stopColor="oklch(0.55 0.14 60)" stopOpacity="0.4"/>
          <stop offset="50%" stopColor="oklch(0.25 0.08 50)" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="oklch(0.10 0.03 50)" stopOpacity="1"/>
        </radialGradient>
        <filter id={`${uid}-grain`}>
          <feTurbulence baseFrequency="0.8" numOctaves="2" seed={seed}/>
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.4 0"/>
        </filter>
        <radialGradient id={`${uid}-vig`}>
          <stop offset="55%" stopColor="transparent"/>
          <stop offset="100%" stopColor="oklch(0.07 0.02 50)"/>
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${uid}-glow)`}/>
      <rect width="400" height="300" filter={`url(#${uid}-grain)`} opacity="0.5"/>
      <rect width="400" height="300" fill={`url(#${uid}-vig)`}/>
      {label && <text x="20" y="285" fill="rgba(255,255,255,0.45)" fontSize="9" fontFamily="ui-monospace, monospace" letterSpacing="2">{label}</text>}
    </svg>
  );
};

// ============================================================
// HEADER
// ============================================================
const Header = ({ onBook }) => (
  <header className="header">
    <div className="container header-inner">
      <a href="index.html" className="logo" aria-label="Fun4Brain — strona główna">
        FUN<span className="four">4</span>BRAIN
      </a>
      <nav className="nav">
        <a href="#pokoje">Pokoje</a>
        <a href="#dla-kogo">Dla kogo</a>
        <a href="#opinie">Opinie</a>
        <a href="#vouchery">Vouchery</a>
        <a href="faq.html">FAQ</a>
        <a href="#kontakt">Kontakt</a>
      </nav>
      <div className="header-right">
        <button className="lang" aria-label="Język">
          <Icon.globe style={{ width: 14, height: 14 }}/>
          PL
        </button>
        <button className="btn btn-primary btn-sm" onClick={onBook}>
          Rezerwuj
        </button>
      </div>
    </div>
  </header>
);

// ============================================================
// HERO
// ============================================================
const Hero = ({ onBook }) => {
  return (
    <section className="hero noise">
      <div className="hero-photo">
        <image-slot
          id="hero-bg"
          placeholder="Klimatyczne zdjęcie tła (drzwi, klucz, mroczne wnętrze)"
          shape="rect"
          src="hero-bg.jpg"
        />
      </div>
      <div className="hero-photo-overlay"></div>
      <div className="hero-bg">
        <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="hero-glow" cx="68%" cy="50%" r="50%">
              <stop offset="0%" stopColor="oklch(0.55 0.14 60)" stopOpacity="0.30"/>
              <stop offset="40%" stopColor="oklch(0.25 0.05 60)" stopOpacity="0.15"/>
              <stop offset="100%" stopColor="oklch(0.13 0.012 60)" stopOpacity="0"/>
            </radialGradient>
            <filter id="hero-noise">
              <feTurbulence baseFrequency="0.65" numOctaves="2"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.25 0"/>
            </filter>
            <pattern id="maze" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M0 0 L60 0 L60 60 L0 60 Z M15 15 L45 15 L45 45 L15 45 Z" fill="none" stroke="oklch(0.84 0.14 82)" strokeWidth="0.5" opacity="0.06"/>
            </pattern>
          </defs>
          <rect width="1600" height="900" fill="url(#maze)"/>
          <rect width="1600" height="900" fill="url(#hero-glow)"/>
          {/* concentric arcs subtly */}
          <g transform="translate(1200, 450)" opacity="0.18" fill="none" stroke="oklch(0.84 0.14 82)" strokeWidth="1">
            <circle r="120"/>
            <circle r="200"/>
            <circle r="280"/>
            <circle r="360"/>
            <circle r="440"/>
          </g>
          <rect width="1600" height="900" filter="url(#hero-noise)" opacity="0.4"/>
        </svg>
      </div>

      <div className="container">
        <div className="hero-layout">
          <div className="hero-content">
            <span className="hero-tag">
              <span className="dot"></span>
              Poznań · ul. Lechicka 59 · otwarte dziś
            </span>
            <h1 className="hero-h h-display">
              Wejdź <span className="accent">w historię,</span><br/>
              z której musisz<br/>
              się wydostać.
            </h1>
            <p className="hero-sub">
              Trzy filmowe scenariusze, prawdziwe rekwizyty, 60-110 minut bez telefonu.
              Zagadka zaczyna się w chwili, gdy zamkniemy za Wami drzwi.
            </p>
            <div className="hero-ctas">
              <button className="btn btn-primary btn-lg" onClick={onBook}>
                Zarezerwuj termin
                <Icon.arrow className="icon-arrow"/>
              </button>
              <a href="#pokoje" className="btn btn-ghost btn-lg">
                Poznaj pokoje
              </a>
            </div>
            <div className="hero-meta">
              <div className="hero-meta-item">
                <span className="hero-meta-num">3</span>
                <span className="hero-meta-label">pokoje tematyczne</span>
              </div>
              <div className="hero-meta-item">
                <span className="hero-meta-num">4.9</span>
                <span className="hero-meta-label">średnia z 480+ opinii</span>
              </div>
              <div className="hero-meta-item">
                <span className="hero-meta-num">7 dni</span>
                <span className="hero-meta-label">w tygodniu</span>
              </div>
            </div>
          </div>

          <aside className="hero-sidebar" aria-label="Pokoje">
            <span className="hero-side-label">Pokoje</span>
            {ROOMS.map((r, i) => (
              <a key={r.id} href="#pokoje" className="hero-room-mark">
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 }}>
                  <span className="name">{r.title}</span>
                  <span style={{ fontSize: 11, color: "var(--text-dim)", fontFamily: "var(--font-ui)", fontWeight: 400 }}>
                    {r.minutes} min · {r.stars}/6
                  </span>
                </div>
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
              </a>
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
};

// ============================================================
// ROOMS
// ============================================================
const ROOMS = [
  {
    id: "sekret-dziadka",
    title: "Sekret dziadka",
    tagline: 'W szopie zawsze coś było. Ale tego nikt się nie spodziewał.',
    stars: 4,
    minutes: 75,
    players: "2–5",
    mediaVariant: 0,
    photo: "rooms/sekret-dziadka.jpg",
  },
  {
    id: "dom-pogrzebowy",
    title: "Dom pogrzebowy",
    tagline: 'Trumny puste, a goście wciąż przychodzą.',
    stars: 4,
    minutes: 60,
    players: "2–5",
    mediaVariant: 1,
    photo: "rooms/dom-pogrzebowy.jpg",
  },
  {
    id: "zielona-mila",
    title: "Zielona mila",
    tagline: 'Egzekucja za godzinę. Niewinność do udowodnienia.',
    stars: 5,
    minutes: 110,
    players: "2–4",
    mediaVariant: 2,
    photo: "rooms/zielona-mila.png",
  },
];

const StarRating = ({ value, max = 6, size = 12 }) => (
  <span className="stars" aria-label={`Trudność ${value} z ${max}`}>
    {Array.from({ length: max }).map((_, i) => (
      <Icon.star key={i} style={{ width: size, height: size }} className={i < value ? "star-filled" : "star-empty"}/>
    ))}
  </span>
);

const RoomCard = ({ room, onBook }) => (
  <article className="room-card">
    <div className="room-card-media">
      <span className="room-card-tag">
        Poziom
        <StarRating value={room.stars}/>
      </span>
      <image-slot
        id={`room-card-${room.id}`}
        placeholder={`Zdjęcie pokoju „${room.title}”`}
        shape="rect"
        src={room.photo}
      />
    </div>
    <div className="room-card-body">
      <h3 className="room-card-title">{room.title}</h3>
      <p className="room-card-tagline">{room.tagline}</p>
      <div className="room-card-meta">
        <span className="room-card-meta-item">
          <Icon.clock/>
          {room.minutes} min
        </span>
        <span className="room-card-meta-item">
          <Icon.users/>
          {room.players} osób
        </span>
      </div>
    </div>
  </article>
);

const RoomsSection = ({ onBook }) => (
  <section className="section" id="pokoje">
    <div className="container">
      <div className="section-head">
        <span className="eyebrow">Trzy historie</span>
        <h2 className="h-section">Wybierz scenariusz, <span className="italic accent">w który wejdziesz.</span></h2>
      </div>
      <div className="rooms-grid">
        {ROOMS.map((r) => <RoomCard key={r.id} room={r} onBook={onBook}/>)}
      </div>
    </div>
  </section>
);

// ============================================================
// DLA KOGO (storytelling scrollable scenarios)
// ============================================================
const SCENARIOS = [
  {
    n: "01",
    title: "Pierwsza randka, której się nie zapomina",
    desc: "Zamiast kawy i niezręcznej ciszy — 60 minut wspólnego rozwiązywania zagadek. Dowiesz się o niej/o nim więcej niż przy stoliku w restauracji.",
    variant: 4,
    label: "[ DATE NIGHT ]",
  },
  {
    n: "02",
    title: "Integracja zespołu, która działa",
    desc: "Dział marketingu obok dewelopera. Bez prezentacji, bez krzeseł w kółku. Tylko wspólny problem do rozwiązania w 75 minut.",
    variant: 2,
    label: "[ FIRMA · TEAM BUILDING ]",
  },
  {
    n: "03",
    title: "Wieczór panieński z pomysłem",
    desc: "Zanim ruszycie na drinki — godzina, w której panna młoda zostaje uwięziona w domu pogrzebowym. Zdjęcia później mówią same za siebie.",
    variant: 1,
    label: "[ PANIE\u0143SKI · KAWALERSKI ]",
  },
  {
    n: "04",
    title: "Urodziny, o których będą gadać",
    desc: "Tort potem. Najpierw — wspólna ucieczka. Polecamy od 12. roku życia w towarzystwie rodzica, od 16. samodzielnie.",
    variant: 0,
    label: "[ URODZINY ]",
  },
  {
    n: "05",
    title: "Rodzina, która gada o czymś innym niż pogoda",
    desc: "Dorośli, nastolatki, dziadkowie — każdy ma swoją rolę. Po grze tematu do rozmowy starcza na cały obiad.",
    variant: 3,
    label: "[ RODZINA ]",
  },
];

const ScenarioCard = ({ s }) => (
  <article className="scenario">
    <div className="scenario-bg">
      <PlaceholderMedia variant={s.variant} label={s.label}/>
    </div>
    <div className="scenario-body">
      <span className="scenario-num">{s.n}</span>
      <h3 className="scenario-title">{s.title}</h3>
      <p className="scenario-desc">{s.desc}</p>
    </div>
  </article>
);

const ForWhoSection = () => (
  <section className="section forwho" id="dla-kogo">
    <div className="container">
      <div className="section-head">
        <span className="eyebrow">Dla kogo</span>
        <h2 className="h-section">
          Escape room <span className="italic accent">to nie tylko</span><br/>
          „coś dla nerdów".
        </h2>
        <p className="lead" style={{ margin: "20px auto 0" }}>
          Pięć powodów, dla których nasi goście wracają — i pięć okazji, na które warto nas zarezerwować.
        </p>
      </div>
      <div className="forwho-rail">
        {SCENARIOS.map((s) => <ScenarioCard key={s.n} s={s}/>)}
      </div>
    </div>
  </section>
);

// ============================================================
// BLOG
// ============================================================
const BLOG_POSTS = [
  {
    id: "team-building-poznan",
    cat: "Dla firm",
    date: "12 maja 2026",
    readMin: 6,
    title: "Czy escape room naprawdę integruje zespół?",
    excerpt: "Krótki przewodnik dla HR — co działa, czego unikać i jak wykorzystać 75 minut, żeby zespół naprawdę się ze sobą zgrał.",
    cover: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80&auto=format&fit=crop",
  },
  {
    id: "wieczor-panienski-pomysl",
    cat: "Pomysły",
    date: "28 kwietnia 2026",
    readMin: 4,
    title: "Wieczór panieński w escape roomie — pomysł, który zapada w pamięć",
    excerpt: "Zanim wino i karaoke — godzina, w której panna młoda zostaje zamknięta w domu pogrzebowym. Zdjęcia z reakcji bezcenne.",
    cover: "https://images.unsplash.com/photo-1496024840928-4c417adf211d?w=900&q=80&auto=format&fit=crop",
  },
  {
    id: "pierwszy-raz-co-warto-wiedziec",
    cat: "Pierwszy raz",
    date: "3 kwietnia 2026",
    readMin: 5,
    title: "Pierwszy raz w escape roomie — czego się spodziewać",
    excerpt: "Nie, nikt Cię nie zamknie sam w ciemności bez ratunku. Tłumaczymy, jak naprawdę wygląda godzina w pokoju zagadek.",
    cover: "https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?w=900&q=80&auto=format&fit=crop",
  },
];

const BlogCard = ({ post }) => (
  <a href={`#blog-${post.id}`} className="blog-card">
    <div className="blog-card-media">
      <image-slot
        id={`blog-cover-${post.id}`}
        placeholder={`Okładka: „${post.title}”`}
        shape="rect"
        src={post.cover}
      />
    </div>
    <div className="blog-card-body">
      <div className="blog-card-meta">
        <span className="blog-card-cat">{post.cat}</span>
        <span className="divider-dot"></span>
        <span>{post.date}</span>
        <span className="divider-dot"></span>
        <span>{post.readMin} min czytania</span>
      </div>
      <h3 className="blog-card-title">{post.title}</h3>
      <p className="blog-card-excerpt">{post.excerpt}</p>
      <span className="blog-card-cta">
        Czytaj artykuł
        <Icon.arrow className="icon-arrow"/>
      </span>
    </div>
  </a>
);

const BlogSection = () => (
  <section className="section" id="blog">
    <div className="container">
      <div className="section-head section-head--row">
        <div>
          <span className="eyebrow">Blog</span>
          <h2 className="h-section">Z naszej <span className="accent">notatki.</span></h2>
        </div>
        <a href="#blog-all" className="btn btn-ghost btn-sm">
          Zobacz wszystkie wpisy
          <Icon.arrow className="icon-arrow"/>
        </a>
      </div>
      <div className="blog-grid">
        {BLOG_POSTS.map((p) => <BlogCard key={p.id} post={p}/>)}
      </div>
    </div>
  </section>
);
const TESTIMONIALS = [
  {
    body: "Byliśmy ekipą z pracy — 5 osób, w tym dwóch sceptyków. Wyszliśmy z mokrymi rękami i listą tematów na cały tydzień przy kawie. Sekret dziadka to coś więcej niż escape room.",
    name: "Marta K.",
    meta: "Zespół 5 osób · Sekret dziadka",
    initials: "MK",
  },
  {
    body: "Zielona mila po raz drugi i wciąż znajdujemy nowe szczegóły scenografii. Rzemiosło. Zagadki nie są tanie ani frustrujące — wymagają, ale nie krzywdzą.",
    name: "Paweł i Ola",
    meta: "Para · Zielona mila ×2",
    initials: "PO",
  },
  {
    body: "Wieczór panieński. Panna młoda nie wiedziała, dokąd jedziemy. Dom pogrzebowy zrobił robotę. Zdjęcia z reakcji bezcenne, atmosfera w aucie do dziś — temat numer jeden.",
    name: "Karolina B.",
    meta: "Wieczór panieński · Dom pogrzebowy",
    initials: "KB",
  },
];

const Testimonial = ({ t }) => (
  <article className="testimonial">
    <span className="testimonial-quote-mark">"</span>
    <p className="testimonial-body">{t.body}</p>
    <div className="testimonial-author">
      <div className="author-avatar">{t.initials}</div>
      <div className="author-info">
        <span className="author-name">{t.name}</span>
        <span className="author-meta">{t.meta}</span>
      </div>
    </div>
  </article>
);

const TestimonialsSection = () => (
  <section className="section testimonials" id="opinie">
    <div className="container">
      <div className="section-head">
        <span className="eyebrow">Opinie uczestników</span>
        <h2 className="h-section">
          480+ ekip mówi <span className="italic accent">to samo.</span>
        </h2>
      </div>
      <div className="testimonials-rating">
        <span className="rating-num">4.9</span>
        <div>
          <div className="rating-stars">
            {[...Array(5)].map((_, i) => <Icon.star key={i} style={{ width: 18, height: 18 }}/>)}
          </div>
          <span className="rating-source">średnia z Google Maps i Facebooka · 480+ opinii</span>
        </div>
      </div>
      <div className="testimonials-grid">
        {TESTIMONIALS.map((t, i) => <Testimonial key={i} t={t}/>)}
      </div>
    </div>
  </section>
);

// ============================================================
// AWARDS
// ============================================================
// ============================================================
// AWARDS — featured + supporting
// ============================================================
const Laurel = ({ flip }) => (
  <svg viewBox="0 0 60 100" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" style={{ transform: flip ? "scaleX(-1)" : "none" }}>
    {/* main stem */}
    <path d="M 50 95 Q 30 70 25 45 Q 22 25 30 8"/>
    {/* leaves */}
    <path d="M 48 85 Q 38 78 30 80" />
    <path d="M 44 75 Q 32 67 24 70" />
    <path d="M 40 64 Q 27 56 19 60" />
    <path d="M 36 52 Q 23 46 16 50" />
    <path d="M 33 40 Q 20 36 14 41" />
    <path d="M 30 28 Q 19 25 14 30" />
    <path d="M 28 18 Q 19 17 16 21" />
    {/* leaves outer */}
    <path d="M 50 80 Q 50 70 56 65" opacity="0.7"/>
    <path d="M 47 68 Q 50 58 56 53" opacity="0.7"/>
    <path d="M 42 55 Q 45 45 52 40" opacity="0.7"/>
    <path d="M 38 42 Q 40 32 46 28" opacity="0.7"/>
    <path d="M 34 30 Q 35 22 40 18" opacity="0.7"/>
  </svg>
);

const AwardsBar = () => (
  <section className="awards">
    <div className="container">
      <div className="awards-label">Nagrody &amp; wyróżnienia</div>
      <div className="award-featured">
        <div className="award-featured-laurel">
          <div>
            <div className="award-featured-num">TOP 10</div>
            <h3 className="award-featured-title">Escape Roomów<br/>w Polsce</h3>
          </div>
        </div>
        <div className="award-featured-sub">Lockme.pl Awards · 2024–2025</div>
      </div>
      <div className="awards-supporting">
        <div className="award-small">
          <Icon.trophy className="award-small-icon"/>
          <div className="award-small-title">Zielona mila — 1. w PL</div>
          <div className="award-small-sub">Najlepszy pokój fabularny 2025<br/>Lockme Awards</div>
        </div>
        <div className="award-small">
          <Icon.trophy className="award-small-icon"/>
          <div className="award-small-title">Top 100 na świecie</div>
          <div className="award-small-sub">Rok z rzędu w rankingu<br/>TERPECA</div>
        </div>
        <div className="award-small">
          <Icon.trophy className="award-small-icon"/>
          <div className="award-small-title">Sekret dziadka</div>
          <div className="award-small-sub">Niegdyś #1 escape room<br/>w Poznaniu</div>
        </div>
      </div>
    </div>
  </section>
);

// ============================================================
// VOUCHERS
// ============================================================
const VouchersSection = () => (
  <section className="section" id="vouchery">
    <div className="container">
      <div className="section-head">
        <span className="eyebrow">Prezent</span>
        <h2 className="h-section">
          Daj komuś <span className="italic accent">wieczór,</span><br/>
          o którym będzie opowiadał.
        </h2>
      </div>
      <div className="voucher-grid">
        <a href="voucher.html" className="voucher-card">
          <div>
            <div className="voucher-eyebrow">Konkretny pokój · konkretna data</div>
            <h3 className="voucher-title">Voucher na pokój</h3>
            <p className="voucher-desc">
              Bilet do jednego z trzech scenariuszy. Idealny, gdy wiesz, co lubi obdarowywany.
              Ważny 12 miesięcy.
            </p>
          </div>
          <span className="voucher-cta">
            Zobacz vouchery
            <Icon.arrow className="icon-arrow"/>
          </span>
        </a>
        <a href="karta-podarunkowa.html" className="voucher-card">
          <div>
            <div className="voucher-eyebrow">Wartość od 50 do 400 zł</div>
            <h3 className="voucher-title">Karta podarunkowa</h3>
            <p className="voucher-desc">
              Elastyczna wartość — obdarowany sam wybiera pokój, datę i ekipę.
              Trafiona pewniaczka, gdy się waha.
            </p>
          </div>
          <span className="voucher-cta">
            Kup kartę
            <Icon.arrow className="icon-arrow"/>
          </span>
        </a>
      </div>
      <div className="voucher-perks">
        <span className="perk"><Icon.bolt/> Dostarczamy na e-mail w 30 sekund</span>
        <span className="perk"><Icon.check/> Wydrukuj lub prześlij dalej</span>
        <span className="perk"><Icon.check/> Bezpieczne płatności Przelewy24</span>
      </div>
    </div>
  </section>
);

// ============================================================
// MAP
// ============================================================
const StyledMap = () => (
  // Custom-styled SVG "map" that matches site palette.
  // Not a real Google Map — it's a stylized placeholder in brand colors.
  <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%", display: "block" }}>
    <defs>
      <pattern id="map-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="oklch(1 0 0 / 0.04)" strokeWidth="1"/>
      </pattern>
      <linearGradient id="map-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="oklch(0.20 0.012 60)"/>
        <stop offset="100%" stopColor="oklch(0.14 0.012 60)"/>
      </linearGradient>
    </defs>
    <rect width="800" height="600" fill="url(#map-bg)"/>
    <rect width="800" height="600" fill="url(#map-grid)"/>

    {/* "park" / green block */}
    <rect x="80" y="120" width="200" height="140" fill="oklch(0.22 0.04 140)" opacity="0.55" rx="4"/>
    <rect x="540" y="380" width="180" height="120" fill="oklch(0.22 0.04 140)" opacity="0.45" rx="4"/>

    {/* main roads */}
    <path d="M 0 300 L 800 300" stroke="oklch(0.30 0.012 60)" strokeWidth="14" strokeLinecap="round"/>
    <path d="M 0 300 L 800 300" stroke="oklch(0.40 0.012 60)" strokeWidth="2"/>

    <path d="M 400 0 L 400 600" stroke="oklch(0.30 0.012 60)" strokeWidth="14" strokeLinecap="round"/>
    <path d="M 400 0 L 400 600" stroke="oklch(0.40 0.012 60)" strokeWidth="2"/>

    {/* secondary roads */}
    <path d="M 0 150 Q 200 150 300 200 T 800 180" stroke="oklch(0.26 0.012 60)" strokeWidth="6" fill="none"/>
    <path d="M 150 0 L 150 600" stroke="oklch(0.26 0.012 60)" strokeWidth="6"/>
    <path d="M 620 0 L 620 600" stroke="oklch(0.26 0.012 60)" strokeWidth="6"/>
    <path d="M 0 450 L 800 470" stroke="oklch(0.26 0.012 60)" strokeWidth="6"/>

    {/* tertiary streets */}
    <g stroke="oklch(0.22 0.012 60)" strokeWidth="3" fill="none">
      <path d="M 50 50 L 750 70"/>
      <path d="M 60 380 L 350 390"/>
      <path d="M 450 380 L 770 390"/>
      <path d="M 250 0 L 260 280"/>
      <path d="M 520 0 L 530 280"/>
      <path d="M 250 320 L 260 600"/>
      <path d="M 520 320 L 530 600"/>
    </g>

    {/* buildings */}
    <g fill="oklch(0.18 0.012 60)" opacity="0.8">
      <rect x="40" y="40" width="80" height="60" rx="2"/>
      <rect x="170" y="40" width="60" height="80" rx="2"/>
      <rect x="270" y="40" width="100" height="40" rx="2"/>
      <rect x="430" y="40" width="60" height="80" rx="2"/>
      <rect x="510" y="40" width="80" height="60" rx="2"/>
      <rect x="640" y="40" width="100" height="60" rx="2"/>

      <rect x="40" y="180" width="60" height="80" rx="2"/>
      <rect x="310" y="180" width="60" height="80" rx="2"/>
      <rect x="430" y="180" width="80" height="60" rx="2"/>
      <rect x="540" y="180" width="60" height="80" rx="2"/>
      <rect x="640" y="180" width="100" height="80" rx="2"/>

      <rect x="40" y="330" width="60" height="40" rx="2"/>
      <rect x="170" y="330" width="60" height="40" rx="2"/>
      <rect x="280" y="330" width="60" height="40" rx="2"/>
      <rect x="430" y="330" width="60" height="40" rx="2"/>
      <rect x="540" y="330" width="60" height="40" rx="2"/>

      <rect x="40" y="490" width="80" height="80" rx="2"/>
      <rect x="170" y="490" width="60" height="80" rx="2"/>
      <rect x="270" y="490" width="100" height="60" rx="2"/>
      <rect x="430" y="490" width="60" height="80" rx="2"/>
    </g>

    {/* river / water */}
    <path d="M 0 520 Q 200 510 400 540 T 800 525 L 800 600 L 0 600 Z" fill="oklch(0.20 0.04 220)" opacity="0.45"/>

    {/* highlight building - Fun4Brain location */}
    <rect x="380" y="270" width="55" height="50" fill="oklch(0.84 0.14 82)" opacity="0.16" rx="3"/>
    <rect x="383" y="273" width="49" height="44" fill="oklch(0.84 0.14 82)" opacity="0.3" rx="2"/>

    {/* roads label hint */}
    <text x="200" y="296" fill="oklch(0.55 0.012 70)" fontSize="9" fontFamily="ui-monospace, monospace" letterSpacing="3">UL. LECHICKA</text>
    <text x="408" y="200" fill="oklch(0.55 0.012 70)" fontSize="9" fontFamily="ui-monospace, monospace" letterSpacing="3" transform="rotate(90 408 200)">UL. NARAMOWICKA</text>
  </svg>
);

const MapSection = () => (
  <section className="section map-section" id="kontakt">
    <div className="container map-grid">
      <div className="map-info">
        <span className="eyebrow" style={{ marginBottom: 8 }}>Znajdziesz nas</span>
        <h2 className="map-info-h">
          Poznań, <span className="accent">tuż przy</span> Naramowicach.
        </h2>
        <p className="muted" style={{ marginBottom: 12, maxWidth: "42ch" }}>
          Parking pod budynkiem, przystanek tramwajowy 200 m, wjazd z ul. Lechickiej.
        </p>
        <div className="info-row">
          <div className="info-icon"><Icon.pin/></div>
          <div className="info-text">
            <span className="info-label">Adres</span>
            <span className="info-value">ul. Lechicka 59, 61-695 Poznań</span>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=ul.+Lechicka+59,+Pozna%C5%84"
              target="_blank"
              rel="noopener noreferrer"
              className="info-sub"
              style={{ color: "var(--accent)", textDecoration: "none" }}
            >
              Wyznacz trasę →
            </a>
          </div>
        </div>
        <div className="info-row">
          <div className="info-icon"><Icon.clock/></div>
          <div className="info-text">
            <span className="info-label">Godziny otwarcia</span>
            <span className="info-value">7 dni w tygodniu · 10:00 – 22:00</span>
          </div>
        </div>
        <div className="info-row">
          <div className="info-icon"><Icon.phone/></div>
          <div className="info-text">
            <span className="info-label">Telefon · e-mail</span>
            <span className="info-value">+48 666 319 410</span>
            <span className="info-sub">kontakt@fun4brain.pl</span>
          </div>
        </div>
      </div>
      <div className="map-frame">
        <iframe
          title="Mapa — ul. Lechicka 59, Poznań"
          src="https://maps.google.com/maps?q=ul.+Lechicka+59,+Pozna%C5%84&t=&z=15&ie=UTF8&iwloc=&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          style={{ border: 0, width: "100%", height: "100%", display: "block", filter: "grayscale(0.4) contrast(1.05)" }}
          allowFullScreen
        />
      </div>
    </div>
  </section>
);

// ============================================================
// FINAL CTA
// ============================================================
const FinalCTA = ({ onBook }) => (
  <section className="section final-cta">
    <div className="container">
      <h2 className="final-cta-h">
        Drzwi się <em>zamkną.</em><br/>
        Zegar ruszy.
      </h2>
      <p className="final-cta-sub">
        Wybierz pokój, wybierz dzień, weź ekipę. Reszta dzieje się w środku.
      </p>
      <button className="btn btn-primary btn-lg" onClick={onBook}>
        Rezerwuj teraz
        <Icon.arrow className="icon-arrow"/>
      </button>
    </div>
  </section>
);

// ============================================================
// FOOTER
// ============================================================
const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-col">
          <a href="index.html" className="logo">FUN<span className="four">4</span>BRAIN</a>
          <p className="footer-brand-desc">
            Trzy filmowe escape roomy w sercu Poznania. Bez planszy, bez tabletu — tylko Wy, drzwi i 60 minut.
          </p>
          <div className="footer-social">
            <a href="#" aria-label="Facebook"><Icon.facebook style={{ width: 14, height: 14 }}/></a>
            <a href="#" aria-label="Instagram"><Icon.instagram style={{ width: 14, height: 14 }}/></a>
          </div>
        </div>
        <div className="footer-col">
          <h4 className="footer-h">Pokoje</h4>
          <ul>
            <li><a href="#">Sekret dziadka</a></li>
            <li><a href="#">Dom pogrzebowy</a></li>
            <li><a href="#">Zielona mila</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4 className="footer-h">Informacje</h4>
          <ul>
            <li><a href="#dla-kogo">Dla kogo</a></li>
            <li><a href="voucher.html">Voucher</a></li>
            <li><a href="karta-podarunkowa.html">Karta podarunkowa</a></li>
            <li><a href="faq.html">FAQ</a></li>
            <li><a href="#kontakt">Kontakt</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4 className="footer-h">Kontakt</h4>
          <div className="footer-contact">
            <div className="footer-contact-row">
              <Icon.pin/>
              <div>
                ul. Lechicka 59<br/>
                61-695 Poznań
              </div>
            </div>
            <div className="footer-contact-row">
              <Icon.phone/>
              <div>+48 666 319 410</div>
            </div>
            <div className="footer-contact-row">
              <Icon.mail/>
              <div>kontakt@fun4brain.pl</div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div>© 2026 Fun4Brain · Wszelkie prawa zastrzeżone</div>
        <div className="footer-legal">
          <a href="#">Polityka prywatności</a>
          <a href="#">Regulamin</a>
        </div>
      </div>
    </div>
  </footer>
);

// ============================================================
// EXPORTS
// ============================================================
Object.assign(window, {
  Icon,
  PlaceholderMedia,
  Header,
  Hero,
  RoomsSection,
  ForWhoSection,
  BlogSection,
  TestimonialsSection,
  AwardsBar,
  VouchersSection,
  MapSection,
  FinalCTA,
  Footer,
  ROOMS,
  BLOG_POSTS,
});
