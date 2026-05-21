// modal.jsx — Booking modal with multi-step flow
const { useState: useStateMod, useEffect: useEffectMod } = React;

// generate next 28 days
const generateDates = () => {
  const out = [];
  const today = new Date();
  const dayNames = ["Nd", "Pn", "Wt", "Śr", "Cz", "Pt", "Sb"];
  for (let i = 0; i < 28; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    out.push({
      iso: d.toISOString().slice(0, 10),
      dayName: dayNames[d.getDay()],
      dayNum: d.getDate(),
      monthLabel: d.toLocaleDateString("pl-PL", { month: "long" }),
      isWeekend: d.getDay() === 0 || d.getDay() === 6,
    });
  }
  return out;
};

const TIME_SLOTS = ["12:00", "13:30", "15:00", "16:30", "18:00", "19:30", "21:00", "22:30"];
// fake availability
const isSlotAvailable = (dateIso, time) => {
  const hash = (dateIso + time).split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return hash % 4 !== 0;
};

const priceFor = (count) => {
  const table = { 2: 180, 3: 220, 4: 260, 5: 300 };
  return table[count] || (180 + (count - 2) * 40);
};

const BookingModal = ({ open, onClose, initialRoomId }) => {
  const [step, setStep] = useStateMod(() => initialRoomId ? 1 : 0);
  const [roomId, setRoomId] = useStateMod(initialRoomId || null);
  const [dateIso, setDateIso] = useStateMod(null);
  const [time, setTime] = useStateMod(null);
  const [count, setCount] = useStateMod(3);
  const [name, setName] = useStateMod("");
  const [phone, setPhone] = useStateMod("");
  const [email, setEmail] = useStateMod("");
  const [submitted, setSubmitted] = useStateMod(false);

  const dates = generateDates();
  const room = ROOMS.find((r) => r.id === roomId);

  // useLayoutEffect runs before paint — prevents a flash of step 0 when
  // the modal opens with a preselected room.
  React.useLayoutEffect(() => {
    if (open) {
      setSubmitted(false);
      setRoomId(initialRoomId || null);
      setStep(initialRoomId ? 1 : 0);
      setDateIso(null);
      setTime(null);
      setCount(3);
      setName("");
      setPhone("");
      setEmail("");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open, initialRoomId]);

  useEffectMod(() => {
    const onKey = (e) => { if (e.key === "Escape" && open) onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const canNext = () => {
    if (step === 0) return !!roomId;
    if (step === 1) return !!dateIso && !!time;
    if (step === 2) return count >= 2;
    if (step === 3) return name.trim().length >= 2 && phone.trim().length >= 7;
    return false;
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else {
      setSubmitted(true);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const stepLabels = ["Pokój", "Termin", "Ekipa", "Kontakt"];

  return (
    <div
      className={`modal-backdrop ${open ? "open" : ""}`}
      onClick={(e) => { if (e.target.classList.contains("modal-backdrop")) onClose(); }}
    >
      <div className="modal" role="dialog" aria-modal="true">
        {submitted ? (
          <SuccessState
            onClose={onClose}
            details={{ room, dateIso, time, count, name, email, phone }}
          />
        ) : (
          <React.Fragment>
            <div className="modal-header">
              <div>
                <div className="modal-step-label">Krok {step + 1} z 4 · {stepLabels[step]}</div>
                <h3 className="modal-title">
                  {step === 0 && "Wybierz pokój"}
                  {step === 1 && "Wybierz termin"}
                  {step === 2 && "Ile Was będzie?"}
                  {step === 3 && "Dane kontaktowe"}
                </h3>
              </div>
              <button className="modal-close" onClick={onClose} aria-label="Zamknij">
                <Icon.close style={{ width: 16, height: 16 }}/>
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-progress">
                {[0,1,2,3].map((i) => (
                  <div
                    key={i}
                    className={`modal-progress-dot ${step === i ? "active" : ""} ${step > i ? "done" : ""}`}
                  />
                ))}
              </div>

              {step === 0 && (
                <div>
                  {ROOMS.map((r) => (
                    <button
                      key={r.id}
                      className={`room-option ${roomId === r.id ? "selected" : ""}`}
                      onClick={() => setRoomId(r.id)}
                    >
                      <div className="room-option-info">
                        <div className="room-option-name">{r.title}</div>
                        <div className="room-option-meta">{r.minutes} min · {r.players} osób</div>
                      </div>
                      <div className="room-option-diff">{r.stars}/6</div>
                    </button>
                  ))}
                </div>
              )}

              {step === 1 && (
                <div>
                  <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 14 }}>
                    Najbliższe 4 tygodnie · zielone = dostępne
                  </div>
                  <div className="dates-grid">
                    {dates.map((d) => (
                      <button
                        key={d.iso}
                        className={`date-cell ${dateIso === d.iso ? "selected" : ""}`}
                        onClick={() => { setDateIso(d.iso); setTime(null); }}
                      >
                        <span className="date-day-name">{d.dayName}</span>
                        <span className="date-day-num">{d.dayNum}</span>
                      </button>
                    ))}
                  </div>
                  {dateIso && (
                    <div>
                      <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 24, marginBottom: 4 }}>
                        Dostępne godziny:
                      </div>
                      <div className="times-grid">
                        {TIME_SLOTS.map((t) => {
                          const avail = isSlotAvailable(dateIso, t);
                          return (
                            <button
                              key={t}
                              disabled={!avail}
                              className={`time-cell ${time === t ? "selected" : ""}`}
                              onClick={() => setTime(t)}
                            >
                              {t}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {step === 2 && (
                <div>
                  <div className="players-row">
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 600 }}>Liczba graczy</div>
                      <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 2 }}>
                        {room?.players} dla tego pokoju
                      </div>
                    </div>
                    <div className="players-controls">
                      <button
                        className="player-btn"
                        disabled={count <= 2}
                        onClick={() => setCount(Math.max(2, count - 1))}
                      >−</button>
                      <span className="player-count">{count}</span>
                      <button
                        className="player-btn"
                        disabled={count >= 5}
                        onClick={() => setCount(Math.min(5, count + 1))}
                      >+</button>
                    </div>
                  </div>
                  <div style={{
                    marginTop: 24,
                    padding: 20,
                    background: "var(--accent-soft)",
                    borderRadius: "var(--r-md)",
                    border: "1px solid oklch(0.84 0.14 82 / 0.25)",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <span style={{ fontSize: 13, color: "var(--text-muted)" }}>Cena za grę</span>
                      <span style={{ fontFamily: "var(--font-display)", fontSize: 36, color: "var(--accent)" }}>
                        {priceFor(count)} zł
                      </span>
                    </div>
                    <div style={{ fontSize: 12, color: "var(--text-dim)", marginTop: 4 }}>
                      Płacisz na miejscu — gotówka, karta, BLIK
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <div className="form-row">
                    <label>Imię i nazwisko</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jan Kowalski"
                    />
                  </div>
                  <div className="form-row">
                    <label>Telefon</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+48 600 000 000"
                    />
                  </div>
                  <div className="form-row">
                    <label>E-mail (opcjonalnie)</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jan@example.com"
                    />
                  </div>

                  <div style={{
                    marginTop: 20,
                    padding: 16,
                    background: "var(--bg-2)",
                    borderRadius: "var(--r-md)",
                    border: "1px solid var(--line)",
                  }}>
                    <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 8 }}>
                      Podsumowanie
                    </div>
                    <div className="summary-row">
                      <span className="summary-label">Pokój</span>
                      <span className="summary-value">{room?.title}</span>
                    </div>
                    <div className="summary-row">
                      <span className="summary-label">Termin</span>
                      <span className="summary-value">
                        {dateIso ? new Date(dateIso).toLocaleDateString("pl-PL", { weekday: "short", day: "numeric", month: "long" }) : "—"}
                        {time && ` · ${time}`}
                      </span>
                    </div>
                    <div className="summary-row">
                      <span className="summary-label">Liczba osób</span>
                      <span className="summary-value">{count}</span>
                    </div>
                    <div className="summary-row">
                      <span className="summary-label">Cena</span>
                      <span className="summary-value accent">{priceFor(count)} zł</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="modal-footer">
              {step > 0 ? (
                <button className="btn btn-ghost btn-sm" onClick={handleBack}>
                  Wstecz
                </button>
              ) : (
                <button className="btn btn-ghost btn-sm" onClick={onClose}>
                  Anuluj
                </button>
              )}
              <button
                className="btn btn-primary btn-sm"
                disabled={!canNext()}
                onClick={handleNext}
                style={{ opacity: canNext() ? 1 : 0.4, cursor: canNext() ? "pointer" : "not-allowed" }}
              >
                {step < 3 ? "Dalej" : "Zarezerwuj"}
                <Icon.arrow className="icon-arrow"/>
              </button>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

const SuccessState = ({ onClose, details }) => (
  <React.Fragment>
    <div className="modal-header">
      <div></div>
      <button className="modal-close" onClick={onClose} aria-label="Zamknij">
        <Icon.close style={{ width: 16, height: 16 }}/>
      </button>
    </div>
    <div className="modal-body">
      <div className="success-state">
        <div className="success-icon">
          <Icon.check/>
        </div>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 36, lineHeight: 1.05, marginBottom: 12 }}>
          Termin <span className="italic accent">zarezerwowany.</span>
        </h3>
        <p style={{ color: "var(--text-muted)", maxWidth: "42ch", margin: "0 auto 24px" }}>
          Potwierdzenie wysłaliśmy na e-mail. Drzwi zamykamy o {details.time} —
          przyjdźcie 10 minut wcześniej na briefing.
        </p>
        <div style={{
          textAlign: "left",
          padding: 20,
          background: "var(--bg-2)",
          borderRadius: "var(--r-md)",
          border: "1px solid var(--line)",
          maxWidth: 360,
          margin: "0 auto",
        }}>
          <div className="summary-row">
            <span className="summary-label">{details.room?.title}</span>
            <span className="summary-value">{details.count} os.</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">
              {new Date(details.dateIso).toLocaleDateString("pl-PL", { weekday: "long", day: "numeric", month: "long" })}
            </span>
            <span className="summary-value accent">{details.time}</span>
          </div>
        </div>
      </div>
    </div>
    <div className="modal-footer">
      <div></div>
      <button className="btn btn-primary btn-sm" onClick={onClose}>
        Zamknij
      </button>
    </div>
  </React.Fragment>
);

Object.assign(window, { BookingModal });
