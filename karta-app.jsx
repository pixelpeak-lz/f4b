// karta-app.jsx — Karta Podarunkowa subpage
const { useState: useStateK, useEffect: useEffectK } = React;

const CARD_FAQ = [
  { q: "Czy mogę dopłacić różnicę, jeśli karta nie pokryje całej ceny?",
    a: "Tak — przy rezerwacji wybierasz pokój i ekipę, jeśli karta nie pokrywa pełnej kwoty, dopłatę zrobisz on-line lub na miejscu (gotówka, karta, BLIK)." },
  { q: "Co jeśli karta jest większa niż cena gry?",
    a: "Nadwyżka zostaje na karcie. Możesz wykorzystać ją na kolejną grę, voucher na inny pokój albo wręczyć komuś z resztą wartości." },
  { q: "Czy karta jest ważna na wszystkie pokoje?",
    a: "Tak. Karta podarunkowa działa na każdy z trzech scenariuszy, bez ograniczeń godzinowych ani dni tygodnia." },
  { q: "Jak długo ważna jest karta?",
    a: "12 miesięcy od zakupu, z możliwością przedłużenia o pół roku na prośbę. Po upływie ważności karta wygasa." },
  { q: "Czy karta jest fizyczna, czy elektroniczna?",
    a: "Standardowo elektroniczna — PDF z kodem na maila w 30 sekund. Jeśli zależy Ci na fizycznej karcie do wręczenia, zaznacz to przy zakupie (wysyłka 2-3 dni)." },
  { q: "Czy mogę kupić kartę dla firmy / na fakturę?",
    a: "Tak — zaznacz to przy zakupie. Wystawiamy fakturę VAT, robimy zbiorcze zamówienia dla zespołów, działu HR czy marketingu (rabat od 8 kart)." },
];

const PRESETS = [120, 180, 240, 300, 400];

const KartaHero = ({ onSelect, value, onCustom }) => (
  <section className="page-hero noise">
    <div className="container">
      <div className="page-hero-inner">
        <div>
          <div className="page-breadcrumb">
            <a href="index.html">Strona główna</a>
            <span>·</span>
            <span>Karta podarunkowa</span>
          </div>
          <h1>Karta <span className="accent">podarunkowa.</span></h1>
          <p className="page-hero-lead">
            Wartość wybierasz Ty. Pokój, datę i ekipę — obdarowany.
            Trafiona pewniaczka, gdy nie wiesz, na który scenariusz się zdecydować.
          </p>

          <div style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 10 }}>
            Wybierz wartość
          </div>
          <div className="value-picker">
            {PRESETS.map((v) => (
              <button
                key={v}
                className={`value-pill ${value === v ? "active" : ""}`}
                onClick={() => onSelect(v)}
              >
                {v} zł
              </button>
            ))}
            <div className="value-custom">
              <input
                type="number"
                min="50"
                max="2000"
                step="10"
                placeholder="Inna"
                value={PRESETS.includes(value) ? "" : value || ""}
                onChange={(e) => onCustom(parseInt(e.target.value) || 0)}
              />
              <span className="unit">zł</span>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 28 }}>
            <button className="btn btn-primary btn-lg" disabled={!value}>
              Kup za {value || 0} zł
              <Icon.arrow className="icon-arrow"/>
            </button>
            <a href="voucher.html" className="btn btn-ghost btn-lg">
              Wolisz voucher na konkretny pokój?
            </a>
          </div>
        </div>

        <div className="voucher-mock">
          <div className="voucher-mock-top">
            <span className="voucher-mock-logo">FUN<span className="four">4</span>BRAIN</span>
            <span className="voucher-mock-code">CARD · 2026-04-N3MT</span>
          </div>
          <div className="voucher-mock-perf"></div>
          <div className="voucher-mock-body">
            <div className="voucher-mock-label">Karta podarunkowa</div>
            <div className="voucher-mock-title" style={{ fontSize: "clamp(48px, 6vw, 80px)" }}>
              {value || 0}<span style={{ fontSize: "0.5em", marginLeft: 4, color: "var(--accent)" }}>zł</span>
            </div>
            <div className="voucher-mock-meta">
              <div>
                Pokój<br/>
                <strong>Dowolny</strong>
              </div>
              <div>
                Ekipa<br/>
                <strong>Dowolna</strong>
              </div>
              <div>
                Ważna do<br/>
                <strong>04/2027</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const KartaForWhom = () => (
  <section className="section">
    <div className="container">
      <div className="section-head">
        <span className="eyebrow">Dla kogo karta</span>
        <h2 className="h-section">Kiedy karta <span className="accent">działa lepiej</span><br/>niż voucher.</h2>
      </div>
      <div className="includes" style={{ maxWidth: 880, margin: "0 auto" }}>
        <div className="include-item">
          <div className="include-icon"><Icon.brain/></div>
          <div className="include-text">
            <span className="include-title">Gdy nie wiesz, co lubi</span>
            <span className="include-sub">Mroczny scenariusz czy klimat retro? Zostaw decyzję obdarowanemu — wybór pokoju to część przyjemności.</span>
          </div>
        </div>
        <div className="include-item">
          <div className="include-icon"><Icon.users/></div>
          <div className="include-text">
            <span className="include-title">Gdy ekipa jest płynna</span>
            <span className="include-sub">2 osoby czy 5? Zamiast zgadywać, daj obdarowanemu pole manewru — sam zbierze ludzi.</span>
          </div>
        </div>
        <div className="include-item">
          <div className="include-icon"><Icon.bolt/></div>
          <div className="include-text">
            <span className="include-title">Gdy zostały Ci minuty</span>
            <span className="include-sub">Voucher już bez czasu na zaplanowanie? Karta = wartość do wykorzystania kiedyś, bez stresu z terminem.</span>
          </div>
        </div>
        <div className="include-item">
          <div className="include-icon"><Icon.trophy/></div>
          <div className="include-text">
            <span className="include-title">Gdy dajesz całej firmie</span>
            <span className="include-sub">Zbiorcze zamówienia dla zespołów — każdy pracownik dostaje kartę na własnych warunkach. Rabat od 8 kart.</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const KartaSteps = () => (
  <section className="section" style={{ background: "var(--bg-1)" }}>
    <div className="container">
      <div className="section-head">
        <span className="eyebrow">Jak to działa</span>
        <h2 className="h-section">Trzy kroki, <span className="accent">żadnego stresu.</span></h2>
      </div>
      <div className="steps" style={{ gridTemplateColumns: "repeat(3, 1fr)", maxWidth: 960, margin: "0 auto" }}>
        <div className="step">
          <span className="step-num">01</span>
          <h3 className="step-title">Ty kupujesz wartość</h3>
          <p className="step-desc">Wybierz kwotę (od 50 do 2000 zł), zapłać on-line. PDF z kodem na maila w 30 sekund.</p>
        </div>
        <div className="step">
          <span className="step-num">02</span>
          <h3 className="step-title">Wręczasz kartę</h3>
          <p className="step-desc">Wydrukuj, prześlij dalej, kopnij linkiem. Obdarowany dostaje wartość — i pełną swobodę.</p>
        </div>
        <div className="step">
          <span className="step-num">03</span>
          <h3 className="step-title">On(a) wybiera resztę</h3>
          <p className="step-desc">Rezerwuje pokój, datę, ekipę. Płaci kartą — różnica w obie strony rozliczana automatycznie.</p>
        </div>
      </div>
    </div>
  </section>
);

const KartaFAQ = () => {
  const [openIdx, setOpenIdx] = useStateK(null);
  return (
    <section className="section">
      <div className="container subpage-faq">
        <div className="section-head">
          <span className="eyebrow">FAQ</span>
          <h2 className="h-section">Pytania <span className="accent">o kartę.</span></h2>
        </div>
        <div className="faq-list">
          {CARD_FAQ.map((item, i) => (
            <div key={item.q} className={`faq-item ${openIdx === i ? "open" : ""}`}>
              <button className="faq-q" onClick={() => setOpenIdx(openIdx === i ? null : i)}>
                <span>{item.q}</span>
                <span className="faq-icon"><Icon.plus style={{ width: 14, height: 14 }}/></span>
              </button>
              <div className="faq-a"><div className="faq-a-inner">{item.a}</div></div>
            </div>
          ))}
        </div>
        <div className="faq-more">
          <a href="faq.html" className="btn btn-ghost btn-sm">
            Pełna lista pytań
            <Icon.arrow className="icon-arrow"/>
          </a>
        </div>
      </div>
    </section>
  );
};

const KartaApp = () => {
  const [modalOpen, setModalOpen] = useStateK(false);
  const [initialRoomId, setInitialRoomId] = useStateK(null);
  const [showSticky, setShowSticky] = useStateK(false);
  const [value, setValue] = useStateK(180);

  const openBooking = (roomId) => {
    setInitialRoomId(roomId || null);
    setModalOpen(true);
  };
  const closeBooking = () => setModalOpen(false);

  useEffectK(() => {
    const onScroll = () => setShowSticky(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <React.Fragment>
      <Header onBook={() => openBooking()}/>
      <main>
        <KartaHero value={value} onSelect={setValue} onCustom={setValue}/>
        <KartaForWhom/>
        <KartaSteps/>
        <KartaFAQ/>
        <FinalCTA onBook={() => openBooking()}/>
      </main>
      <Footer/>

      <button
        className={`sticky-cta-desktop ${showSticky ? "visible" : ""}`}
        onClick={() => openBooking()}
      >
        <span className="pulse-dot"></span>
        Kup kartę za {value} zł
        <Icon.arrow style={{ width: 14, height: 14 }}/>
      </button>
      <div className={`sticky-cta-mobile ${showSticky ? "visible" : ""}`}>
        <button className="btn btn-primary" onClick={() => openBooking()}>
          Kup kartę za {value} zł
          <Icon.arrow className="icon-arrow"/>
        </button>
      </div>

      <BookingModal open={modalOpen} onClose={closeBooking} initialRoomId={initialRoomId}/>
    </React.Fragment>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<KartaApp/>);
