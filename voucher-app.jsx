// voucher-app.jsx — Voucher subpage
const { useState: useStateV, useEffect: useEffectV } = React;

const VOUCHER_FAQ = [
  { cat: "Voucher", q: "Jak długo ważny jest voucher?",
    a: "Voucher jest ważny 12 miesięcy od dnia zakupu. W tym czasie obdarowany rezerwuje termin gry przez naszą stronę lub telefon." },
  { cat: "Voucher", q: "Jak wręczyć voucher?",
    a: "Po zakupie dostajesz PDF na e-mail w ciągu 30 sekund. Możesz go wydrukować, wręczyć w eleganckiej kopercie, przesłać dalej e-mailem albo udostępnić linkiem — sam decydujesz." },
  { cat: "Voucher", q: "Czy mogę zwrócić voucher, jeśli się rozmyślę?",
    a: "Tak — do 14 dni od zakupu, jeśli voucher nie został wykorzystany. Zwracamy 100% wartości na to samo konto, z którego płacono." },
  { cat: "Voucher", q: "Czy mogę przepisać voucher na inną osobę?",
    a: "Tak. Voucher nie jest imienny — dopóki jest niewykorzystany, każdy z kodem może go zrealizować. Idealne, jeśli plany się zmieniają." },
  { cat: "Voucher", q: "Co jeśli obdarowany nie wykorzysta vouchera w 12 miesięcy?",
    a: "Możemy przedłużyć ważność o kolejne 6 miesięcy — wystarczy jeden mail przed datą wygaśnięcia. Nie chcemy, żeby Wasz prezent się zmarnował." },
  { cat: "Voucher", q: "Czy voucher obejmuje wszystko, czy są dopłaty?",
    a: "Voucher obejmuje grę dla podanej liczby osób. Bez dopłat — chyba że obdarowany zechce dodać większą ekipę przy rezerwacji, wtedy dopłaca różnicę cenową." },
];

const VoucherHero = ({ onBook }) => (
  <section className="page-hero noise">
    <div className="container">
      <div className="page-hero-inner">
        <div>
          <div className="page-breadcrumb">
            <a href="index.html">Strona główna</a>
            <span>·</span>
            <span>Voucher</span>
          </div>
          <h1>Voucher <span className="accent">na pokój.</span></h1>
          <p className="page-hero-lead">
            Bilet do konkretnego scenariusza. Wybierasz pokój i liczbę osób —
            obdarowany wybiera termin. Doręczamy PDF na maila w 30 sekund.
            Ważny 12 miesięcy.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="#pokoje" className="btn btn-primary btn-lg">
              Wybierz pokój
              <Icon.arrow className="icon-arrow"/>
            </a>
            <a href="karta-podarunkowa.html" className="btn btn-ghost btn-lg">
              Wolisz kartę o dowolnej wartości?
            </a>
          </div>
        </div>
        <div className="voucher-mock">
          <div className="voucher-mock-top">
            <span className="voucher-mock-logo">FUN<span className="four">4</span>BRAIN</span>
            <span className="voucher-mock-code">VCH · 2026-04-XK7Q</span>
          </div>
          <div className="voucher-mock-perf"></div>
          <div className="voucher-mock-body">
            <div className="voucher-mock-label">Voucher na grę</div>
            <div className="voucher-mock-title">Zielona<br/>Mila</div>
            <div className="voucher-mock-meta">
              <div>
                Czas<br/>
                <strong>110 min</strong>
              </div>
              <div>
                Ekipa<br/>
                <strong>4 os.</strong>
              </div>
              <div>
                Ważny do<br/>
                <strong>04/2027</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const PriceTable = ({ room, onBook }) => (
  <article className="product-card">
    <div className="product-card-media">
      <span className="room-card-tag">
        Poziom
        <span className="stars" aria-label={`Trudność ${room.stars} z 6`}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Icon.star key={i} style={{ width: 11, height: 11 }} className={i < room.stars ? "star-filled" : "star-empty"}/>
          ))}
        </span>
      </span>
      <image-slot
        id={`voucher-card-${room.id}`}
        placeholder={`Zdjęcie pokoju „${room.title}”`}
        shape="rect"
      />
    </div>
    <div className="product-card-body">
      <h3 className="product-card-title">{room.title}</h3>
      <p style={{ fontSize: 13, color: "var(--text-muted)", fontStyle: "italic", lineHeight: 1.5 }}>
        {room.tagline}
      </p>
      <div className="product-card-pricing">
        <div className="product-card-price-row"><span className="who">2 osoby</span><span className="amt">180 zł</span></div>
        <div className="product-card-price-row"><span className="who">3 osoby</span><span className="amt">220 zł</span></div>
        <div className="product-card-price-row"><span className="who">4 osoby</span><span className="amt">260 zł</span></div>
        <div className="product-card-price-row"><span className="who">5 osób</span><span className="amt">300 zł</span></div>
      </div>
      <button className="btn btn-primary" onClick={() => onBook(room.id)}>
        Kup voucher
        <Icon.arrow className="icon-arrow"/>
      </button>
    </div>
  </article>
);

const VoucherSteps = () => (
  <section className="section">
    <div className="container">
      <div className="section-head">
        <span className="eyebrow">Jak to działa</span>
        <h2 className="h-section">Cztery kroki, <span className="accent">trzy minuty.</span></h2>
      </div>
      <div className="steps">
        <div className="step">
          <span className="step-num">01</span>
          <h3 className="step-title">Wybierz pokój</h3>
          <p className="step-desc">Trzy scenariusze, każdy z innym klimatem. Jeśli nie wiesz — weź kartę o dowolnej wartości.</p>
        </div>
        <div className="step">
          <span className="step-num">02</span>
          <h3 className="step-title">Wybierz ekipę</h3>
          <p className="step-desc">Od 2 do 5 osób. Cena rośnie liniowo — nie ma sztuczek z minimum.</p>
        </div>
        <div className="step">
          <span className="step-num">03</span>
          <h3 className="step-title">Płać on-line</h3>
          <p className="step-desc">Przelewy24, BLIK, karta. PDF voucher trafia na maila w 30 sekund od zaksięgowania.</p>
        </div>
        <div className="step">
          <span className="step-num">04</span>
          <h3 className="step-title">Wręcz prezent</h3>
          <p className="step-desc">Wydrukuj, prześlij dalej albo udostępnij linkiem. Obdarowany rezerwuje termin sam.</p>
        </div>
      </div>
    </div>
  </section>
);

const VoucherIncludes = () => (
  <section className="section" style={{ background: "var(--bg-1)" }}>
    <div className="container">
      <div className="section-head">
        <span className="eyebrow">Co dostajesz</span>
        <h2 className="h-section">W cenie <span className="accent">vouchera.</span></h2>
      </div>
      <div className="includes" style={{ maxWidth: 880, margin: "0 auto" }}>
        <div className="include-item">
          <div className="include-icon"><Icon.bolt/></div>
          <div className="include-text">
            <span className="include-title">PDF na maila w 30 sekund</span>
            <span className="include-sub">Po zaksięgowaniu płatności voucher z unikalnym kodem trafia na Twoją skrzynkę.</span>
          </div>
        </div>
        <div className="include-item">
          <div className="include-icon"><Icon.check/></div>
          <div className="include-text">
            <span className="include-title">Ważny 12 miesięcy</span>
            <span className="include-sub">Plus opcja jednorazowego przedłużenia o pół roku, jeśli planów nie udało się zrealizować.</span>
          </div>
        </div>
        <div className="include-item">
          <div className="include-icon"><Icon.users/></div>
          <div className="include-text">
            <span className="include-title">Bez przypisania do osoby</span>
            <span className="include-sub">Każdy z kodem może zrealizować — daj komuś, kto akurat ma czas.</span>
          </div>
        </div>
        <div className="include-item">
          <div className="include-icon"><Icon.clock/></div>
          <div className="include-text">
            <span className="include-title">Pełna gra, bez dopłat</span>
            <span className="include-sub">60-110 minut w pokoju + briefing + podsumowanie. Cena zamknięta przy zakupie.</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const VoucherProducts = ({ onBook }) => (
  <section className="section" id="pokoje">
    <div className="container">
      <div className="section-head">
        <span className="eyebrow">Wybierz pokój</span>
        <h2 className="h-section">Trzy scenariusze, <span className="accent">trzy klimaty.</span></h2>
      </div>
      <div className="product-grid">
        {ROOMS.map((r) => <PriceTable key={r.id} room={r} onBook={onBook}/>)}
      </div>
    </div>
  </section>
);

const VoucherFAQ = () => {
  const [openIdx, setOpenIdx] = useStateV(null);
  return (
    <section className="section" style={{ background: "var(--bg-1)" }}>
      <div className="container subpage-faq">
        <div className="section-head">
          <span className="eyebrow">FAQ</span>
          <h2 className="h-section">Najczęściej <span className="accent">pytane.</span></h2>
        </div>
        <div className="faq-list">
          {VOUCHER_FAQ.map((item, i) => (
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

const VoucherApp = () => {
  const [modalOpen, setModalOpen] = useStateV(false);
  const [initialRoomId, setInitialRoomId] = useStateV(null);
  const [showSticky, setShowSticky] = useStateV(false);

  const openBooking = (roomId) => {
    setInitialRoomId(roomId || null);
    setModalOpen(true);
  };
  const closeBooking = () => setModalOpen(false);

  useEffectV(() => {
    const onScroll = () => setShowSticky(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <React.Fragment>
      <Header onBook={() => openBooking()}/>
      <main>
        <VoucherHero onBook={openBooking}/>
        <VoucherProducts onBook={openBooking}/>
        <VoucherSteps/>
        <VoucherIncludes/>
        <VoucherFAQ/>
        <FinalCTA onBook={() => openBooking()}/>
      </main>
      <Footer/>

      <button
        className={`sticky-cta-desktop ${showSticky ? "visible" : ""}`}
        onClick={() => openBooking()}
      >
        <span className="pulse-dot"></span>
        Kup voucher
        <Icon.arrow style={{ width: 14, height: 14 }}/>
      </button>
      <div className={`sticky-cta-mobile ${showSticky ? "visible" : ""}`}>
        <button className="btn btn-primary" onClick={() => openBooking()}>
          Kup voucher
          <Icon.arrow className="icon-arrow"/>
        </button>
      </div>

      <BookingModal open={modalOpen} onClose={closeBooking} initialRoomId={initialRoomId}/>
    </React.Fragment>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<VoucherApp/>);
