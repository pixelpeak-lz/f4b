// faq.jsx — FAQ section with search + category filter + accordion
const { useState: useStateFaq, useMemo: useMemoFaq } = React;

const FAQ_ITEMS = [
  {
    cat: "Podstawy",
    q: "Co to jest escape room?",
    a: "Escape room to gra w rzeczywistości — Wasza ekipa wchodzi do scenograficznie urządzonego pokoju i ma 60-110 minut, by rozwiązać serię zagadek i wydostać się przed upływem czasu. U nas nie ma plansz, ekranów ani gier mobilnych — tylko prawdziwe rekwizyty, mechanizmy i historia.",
  },
  {
    cat: "Rezerwacja",
    q: "Jak zarezerwować pokój?",
    a: "Najprościej przez przycisk Rezerwuj — wybierz pokój, datę i godzinę, podaj liczbę osób i dane kontaktowe. Rezerwacja zajmuje 2 minuty, potwierdzenie dostajesz na e-mail.",
  },
  {
    cat: "Rezerwacja",
    q: "Czy konieczna jest wcześniejsza rezerwacja?",
    a: "Tak — gramy wyłącznie z rezerwacją. W weekendy najlepsze sloty schodzą na 1-2 tygodnie naprzód, w tygodniu często da się zagrać z dnia na dzień.",
  },
  {
    cat: "Rezerwacja",
    q: "Czy mogę odwołać rezerwację?",
    a: "Tak. Do 48h przed grą — bezpłatnie. Poniżej 48h pobieramy 50% ceny. Termin możesz też przepisać na inny dzień bez dodatkowych kosztów.",
  },
  {
    cat: "Cena",
    q: "Jaka jest cena gry?",
    a: "Cena zależy od pokoju i liczby osób. Orientacyjnie: 2 osoby 180 zł, 3 osoby 220 zł, 4 osoby 260 zł, 5 osób 300 zł. Pełen cennik widać przy wyborze terminu.",
  },
  {
    cat: "Cena",
    q: "Czy mają Państwo zniżki?",
    a: "Tak — dla grup firmowych powyżej 8 osób, dla studentów z legitymacją (od poniedziałku do czwartku) oraz w urodziny gracza (zniżka 20%, pokaż dokument).",
  },
  {
    cat: "Zasady",
    q: "Ile osób może wziąć udział w grze?",
    a: "Od 2 do 5 osób, w zależności od pokoju. Mniej niż 2 — gra będzie za trudna. Więcej niż maksimum — pokój fizycznie się robi za ciasny i frajda spada.",
  },
  {
    cat: "Zasady",
    q: "Czy może wziąć udział więcej osób, niż przewiduje scenariusz?",
    a: "W wyjątkowych przypadkach (np. impreza firmowa) możemy dopuścić +1 osobę obserwującą. Skontaktuj się z nami przed rezerwacją — ustalimy szczegóły.",
  },
  {
    cat: "Zasady",
    q: "Ile czasu trwa gra?",
    a: "Sama rozgrywka to 60-110 minut (zależnie od pokoju). Na miejscu spędzicie łącznie ok. 90-130 minut z briefingiem przed i podsumowaniem po grze.",
  },
  {
    cat: "Dla kogo",
    q: "Jaki jest minimalny wiek graczy bez osoby dorosłej?",
    a: "Samodzielnie zagrać może osoba od 16 roku życia. Od 12 roku życia — w towarzystwie osoby dorosłej. Najmłodszych graczy zachęcamy do gry z rodzicami.",
  },
  {
    cat: "Dla kogo",
    q: "Czy escape room jest dobry na pierwszą randkę?",
    a: "Tak, polecamy Sekret dziadka — jest klimatyczny, ale nie traumatyzujący. Po godzinie wspólnego rozwiązywania zagadek macie temat na cały wieczór.",
  },
  {
    cat: "Inne",
    q: "Czy jest możliwość gry po angielsku?",
    a: "Tak — wszystkie trzy pokoje prowadzimy też po angielsku. Zaznacz to przy rezerwacji albo napisz w komentarzu.",
  },
];

const CATEGORIES = ["Wszystkie", "Podstawy", "Rezerwacja", "Cena", "Zasady", "Dla kogo", "Inne"];

const FAQItem = ({ item, isOpen, onToggle }) => (
  <div className={`faq-item ${isOpen ? "open" : ""}`}>
    <button className="faq-q" onClick={onToggle} aria-expanded={isOpen}>
      <span>{item.q}</span>
      <span className="faq-icon">
        <Icon.plus style={{ width: 14, height: 14 }}/>
      </span>
    </button>
    <div className="faq-a">
      <div className="faq-a-inner">{item.a}</div>
    </div>
  </div>
);

const FAQSection = () => {
  const [search, setSearch] = useStateFaq("");
  const [activeCat, setActiveCat] = useStateFaq("Wszystkie");
  const [openIdx, setOpenIdx] = useStateFaq(null);

  const filtered = useMemoFaq(() => {
    return FAQ_ITEMS.filter((it) => {
      const matchCat = activeCat === "Wszystkie" || it.cat === activeCat;
      const matchSearch =
        !search.trim() ||
        it.q.toLowerCase().includes(search.toLowerCase()) ||
        it.a.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, activeCat]);

  return (
    <section className="section section--tight" id="faq">
      <div className="container" style={{ maxWidth: 880 }}>
        <div className="section-head">
          <span className="eyebrow">FAQ</span>
          <h2 className="h-section">
            Pytania, które <span className="italic accent">padają najczęściej.</span>
          </h2>
        </div>

        <div className="faq-controls">
          <div className="faq-search">
            <Icon.search/>
            <input
              type="text"
              placeholder="Szukaj w pytaniach… np. cena, wiek, odwołanie"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setOpenIdx(null); }}
            />
          </div>
          <div className="faq-cats">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                className={`faq-cat ${activeCat === c ? "active" : ""}`}
                onClick={() => { setActiveCat(c); setOpenIdx(null); }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="faq-empty">
            Nic nie pasuje do „{search}”. Spróbuj inaczej albo napisz do nas.
          </div>
        ) : (
          <div className="faq-list">
            {filtered.map((item, i) => (
              <FAQItem
                key={item.q}
                item={item}
                isOpen={openIdx === i}
                onToggle={() => setOpenIdx(openIdx === i ? null : i)}
              />
            ))}
          </div>
        )}

        <div className="faq-more">
          <a href="#" className="btn btn-ghost btn-sm">
            Zobacz pełną listę pytań
            <Icon.arrow className="icon-arrow"/>
          </a>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { FAQSection, FAQ_ITEMS });
