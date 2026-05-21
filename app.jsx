// app.jsx — Composes all sections + Sticky CTA + Modal mount
const { useState: useStateApp, useEffect: useEffectApp } = React;

const App = () => {
  const [modalOpen, setModalOpen] = useStateApp(false);
  const [initialRoomId, setInitialRoomId] = useStateApp(null);
  const [showSticky, setShowSticky] = useStateApp(false);

  const openBooking = (roomId) => {
    setInitialRoomId(roomId || null);
    setModalOpen(true);
  };
  const closeBooking = () => setModalOpen(false);

  useEffectApp(() => {
    const onScroll = () => {
      // Show sticky CTA after scrolling past hero (~ 600px)
      setShowSticky(window.scrollY > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <React.Fragment>
      <Header onBook={() => openBooking()}/>
      <main>
        <Hero onBook={() => openBooking()}/>
        <RoomsSection onBook={openBooking}/>
        <AwardsBar/>
        <ForWhoSection/>
        <TestimonialsSection/>
        <BlogSection/>
        <VouchersSection/>
        <FinalCTA onBook={() => openBooking()}/>
        <MapSection/>
      </main>
      <Footer/>

      {/* Sticky CTAs */}
      <button
        className={`sticky-cta-desktop ${showSticky ? "visible" : ""}`}
        onClick={() => openBooking()}
        aria-label="Zarezerwuj termin"
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

      <BookingModal
        open={modalOpen}
        onClose={closeBooking}
        initialRoomId={initialRoomId}
      />
    </React.Fragment>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
