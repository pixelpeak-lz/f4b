// faq-app.jsx — FAQ subpage shell
const { useState: useStateFaqApp, useEffect: useEffectFaqApp } = React;

const FAQHero = () => (
  <section className="faq-hero">
    <div className="container faq-hero-inner">
      <div className="faq-breadcrumb">
        <a href="index.html">Strona główna</a>
        <span>·</span>
        <span>FAQ</span>
      </div>
      <h1>Najczęściej<br/><span className="accent">zadawane pytania.</span></h1>
      <p>Zebraliśmy w jednym miejscu wszystko, o co pytacie najczęściej —
      o rezerwacje, ceny, zasady gry, wiek graczy i prezenty. Nie znajdujesz
      odpowiedzi? Napisz lub zadzwoń.</p>
    </div>
  </section>
);

const FAQHelp = () => (
  <div className="container" style={{ maxWidth: 880, paddingBottom: 100 }}>
    <div className="faq-help-cta">
      <h3>Nie ma <span className="accent">Twojego pytania?</span></h3>
      <p>Odpisujemy zwykle w ciągu 30 minut w godzinach pracy. W weekendy bywa szybciej.</p>
      <div className="faq-help-buttons">
        <a href="tel:+48666319410" className="btn btn-primary">
          +48 666 319 410
        </a>
        <a href="mailto:kontakt@fun4brain.pl" className="btn btn-ghost">
          kontakt@fun4brain.pl
        </a>
      </div>
    </div>
  </div>
);

const FAQApp = () => {
  const [modalOpen, setModalOpen] = useStateFaqApp(false);
  const [initialRoomId, setInitialRoomId] = useStateFaqApp(null);
  const [showSticky, setShowSticky] = useStateFaqApp(false);

  const openBooking = (roomId) => {
    setInitialRoomId(roomId || null);
    setModalOpen(true);
  };
  const closeBooking = () => setModalOpen(false);

  useEffectFaqApp(() => {
    const onScroll = () => setShowSticky(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <React.Fragment>
      <Header onBook={() => openBooking()}/>
      <main>
        <FAQHero/>
        <FAQSection/>
        <FAQHelp/>
      </main>
      <Footer/>

      <button
        className={`sticky-cta-desktop ${showSticky ? "visible" : ""}`}
        onClick={() => openBooking()}
      >
        <span className="pulse-dot"></span>
        Zarezerwuj termin
        <Icon.arrow style={{ width: 14, height: 14 }}/>
      </button>
      <div className={`sticky-cta-mobile ${showSticky ? "visible" : ""}`}>
        <button className="btn btn-primary" onClick={() => openBooking()}>
          Zarezerwuj termin
          <Icon.arrow className="icon-arrow"/>
        </button>
      </div>

      <BookingModal open={modalOpen} onClose={closeBooking} initialRoomId={initialRoomId}/>
    </React.Fragment>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<FAQApp/>);
