"use client";

import { useState, useEffect } from "react";

const ACCENT = "#a8b0b8";
const ACCENT_L = "#c8ced6";
const DARK = "#0a0a0f";
const GLASS = "rgba(10,10,15,0.85)";
const BORDER = "rgba(168,176,184,0.18)";
const TEXT = "#f0ece2";
const TEXT2 = "rgba(255,255,255,0.75)";
const TEXT3 = "rgba(255,255,255,0.5)";
const WA = "#1ea952";

type Lang = "en" | "ar";
const SHEETS_URL = "https://script.google.com/macros/s/AKfycbyhTF08oPcacrbBGEYbnvIU-uvRM92C9JIAGGtEYwNkikSRGd-JslzMzMsYcAJuB_9u/exec";
const WA_MESSAGE_EN = "Hi Diamond PKW, I'm a student — I'd like to claim the 5 KD Home Wash offer.";
const WA_MESSAGE_AR = "هلا، أنا طالب وأبغي أحجز عرض الغسيل المنزلي حق الطلاب بـ٥ د.ك.";
const waUrl = (lang: Lang) => `https://wa.me/96595536344?text=${encodeURIComponent(lang === "ar" ? WA_MESSAGE_AR : WA_MESSAGE_EN)}`;

const WhatsAppIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.486a.75.75 0 0 0 .921.921l4.452-1.495A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function StudentPage() {
  const [loaded, setLoaded] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("en");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const isAr = lang === "ar";

  useEffect(() => {
    const saved = localStorage.getItem("dpkw-lang") as Lang | null;
    if (saved === "ar") setLang("ar");
    const handler = (e: Event) => setLang((e as CustomEvent).detail as Lang);
    window.addEventListener("lang-change", handler);
    return () => window.removeEventListener("lang-change", handler);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: DARK,
      color: TEXT,
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulseGlow { 0%,100% { box-shadow:0 0 0 0 rgba(30,169,82,0.3); } 50% { box-shadow:0 0 0 12px rgba(30,169,82,0); } }

        .st-field input,
        .st-field textarea {
          width: 100%; padding: 13px 15px;
          background: rgba(255,255,255,0.02);
          border: 1px solid ${BORDER};
          border-radius: 10px;
          color: ${TEXT}; font-size: 14px;
          font-family: var(--font-label, 'Inter', sans-serif);
          outline: none; transition: all 0.2s;
        }
        .st-field input:focus,
        .st-field textarea:focus {
          border-color: ${ACCENT};
          background: rgba(168,176,184,0.03);
        }
        .st-field input::placeholder,
        .st-field textarea::placeholder { color: ${TEXT3}; }
        .st-file-btn {
          display: flex; align-items: center; gap: 10px;
          padding: 12px 16px;
          background: rgba(168,176,184,0.04);
          border: 1px dashed ${BORDER};
          border-radius: 10px;
          color: ${TEXT2}; font-size: 13px;
          font-family: var(--font-label, 'Inter', sans-serif);
          cursor: pointer; transition: all 0.2s;
        }
        .st-file-btn:hover { border-color: ${ACCENT}; color: ${TEXT}; }
        .st-file-btn input { display: none; }

        .st-wa-btn:hover {
          background: #167a3c !important;
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(30,169,82,0.5) !important;
        }
        .st-book-btn:hover {
          background: linear-gradient(135deg, ${ACCENT_L}, ${ACCENT}) !important;
          color: #ffffff !important;
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(168,176,184,0.4) !important;
        }

        /* Expandable inline form — smooth vertical drop-down */
        .st-form-wrap {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .st-form-wrap.is-open {
          grid-template-rows: 1fr;
        }
        .st-form-inner {
          overflow: hidden;
          min-height: 0;
        }
        .st-submit:hover {
          background: ${ACCENT_L} !important;
          transform: translateY(-1px);
          box-shadow: 0 6px 24px rgba(168,176,184,0.25);
        }

        @media (max-width: 768px) {
          .st-cta-row { gap: 8px !important; }
          .st-wa-btn, .st-book-btn {
            padding: 13px 10px !important;
            font-size: 11px !important;
            letter-spacing: 0.8px !important;
            gap: 6px !important;
            border-radius: 40px !important;
          }
          .st-wa-btn svg, .st-book-btn svg { width: 14px !important; height: 14px !important; }
          .st-cta-sub {
            font-size: 11px !important;
            margin-top: 12px !important;
          }
        }
      `}</style>

      {/* Ambient gradient */}
      <div style={{
        position: "absolute", top: 0, left: "-10%", right: "-10%", height: "100%",
        background: "radial-gradient(ellipse at 50% 15%, rgba(168,176,184,0.08) 0%, transparent 55%)",
        pointerEvents: "none",
      }} />

      <div style={{
        position: "relative", zIndex: 1,
        maxWidth: 960, margin: "0 auto", padding: "100px 20px 80px",
        opacity: loaded ? 1 : 0,
        transform: loaded ? "translateY(0)" : "translateY(10px)",
        transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>

        {/* Hero */}
        <div style={{
          textAlign: "center", marginBottom: 36,
          animation: "fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both",
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 12,
            fontFamily: isAr ? "var(--font-arabic, 'Tajawal', sans-serif)" : "var(--font-label, 'Inter', sans-serif)",
            fontSize: isAr ? 16 : 13, letterSpacing: isAr ? 0 : "3px", color: ACCENT,
            textTransform: isAr ? "none" : "uppercase", fontWeight: isAr ? 600 : 500, marginBottom: 18,
          }}>
            <div style={{ width: 32, height: 1, background: `linear-gradient(90deg, transparent, ${ACCENT})` }} />
            {isAr ? "للطلاب فقط" : "Students Only"}
            <div style={{ width: 32, height: 1, background: `linear-gradient(90deg, ${ACCENT}, transparent)` }} />
          </div>

          <h1 style={{
            fontFamily: isAr ? "var(--font-arabic, 'Tajawal', sans-serif)" : "var(--font-numeral, 'Bodoni Moda', serif)",
            fontSize: "clamp(36px, 6vw, 54px)", fontWeight: isAr ? 700 : 600,
            color: TEXT, lineHeight: 1.15, margin: 0,
            letterSpacing: isAr ? 0 : "-0.5px",
          }}>
            {isAr
              ? <>غسيل منزلي بـ<span style={{ color: ACCENT }}>٥ د.ك</span></>
              : <>5 KD Home <span style={{ color: ACCENT }}>Wash</span></>}
          </h1>

          <div style={{
            fontFamily: isAr ? "var(--font-arabic, 'Tajawal', sans-serif)" : "var(--font-numeral, 'Bodoni Moda', serif)",
            fontSize: isAr ? 22 : 24, color: "#ffffff",
            marginTop: 14, fontWeight: isAr ? 500 : 400,
          }}>
            {isAr ? "أي طالب · أي مكان · أي سيارة" : "Any Student · Anywhere · Any car"}
          </div>
        </div>

        {/* Offer card */}
        <div style={{
          background: GLASS,
          border: `1px solid ${BORDER}`,
          borderRadius: 20,
          backdropFilter: "blur(20px)",
          boxShadow: `0 0 60px rgba(168,176,184,0.08), 0 24px 64px rgba(0,0,0,0.5)`,
          overflow: "hidden",
          animation: "fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both",
        }}>
          {/* Price header */}
          <div style={{
            padding: "32px 28px 24px",
            textAlign: "center",
            borderBottom: `1px solid ${BORDER}`,
            background: "linear-gradient(180deg, rgba(168,176,184,0.05) 0%, transparent 100%)",
          }}>
            <div style={{
              fontFamily: isAr ? "var(--font-arabic, 'Tajawal', sans-serif)" : "var(--font-label, 'Inter', sans-serif)",
              fontSize: isAr ? 16 : 14, fontWeight: 600, letterSpacing: isAr ? 0 : "2.4px",
              color: "#ffffff", textTransform: isAr ? "none" : "uppercase", marginBottom: 12,
            }}>
              {isAr ? "حصري للطلاب" : "Student Exclusive"}
            </div>
            <div style={{
              display: "flex", alignItems: "baseline", justifyContent: "center", gap: 6,
            }}>
              <span style={{
                fontFamily: isAr ? "var(--font-arabic, 'Tajawal', sans-serif)" : "var(--font-numeral, 'Bodoni Moda', serif)",
                fontSize: 72, fontWeight: isAr ? 700 : 600,
                lineHeight: 1, letterSpacing: isAr ? 0 : "-2px",
                background: "linear-gradient(135deg, #f5f7fa 0%, #d4dbe4 35%, #a8b0b8 60%, #e8edf2 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
                filter: "drop-shadow(0 2px 14px rgba(212,220,230,0.35))",
              }}>{isAr ? "٥" : "5"}</span>
              <span style={{
                fontFamily: isAr ? "var(--font-arabic, 'Tajawal', sans-serif)" : "var(--font-label, 'Inter', sans-serif)",
                fontSize: 20, fontWeight: isAr ? 600 : 500,
                letterSpacing: isAr ? 0 : "1.5px",
                background: "linear-gradient(135deg, #f5f7fa 0%, #d4dbe4 50%, #e8edf2 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}>{isAr ? "د.ك" : "KD"}</span>
            </div>
            <div style={{
              fontFamily: isAr ? "var(--font-arabic, 'Tajawal', sans-serif)" : "var(--font-numeral, 'Bodoni Moda', serif)",
              fontSize: 22, color: "#ffffff", marginTop: 10, fontWeight: isAr ? 600 : 500,
            }}>
              {isAr ? "غسيل كامل بالبيت — نيجي لك" : "Full home wash — we come to you"}
            </div>
          </div>

          {/* What's included */}
          <div style={{ padding: "24px 28px" }}>
            <div style={{
              fontFamily: isAr ? "var(--font-arabic, 'Tajawal', sans-serif)" : "var(--font-label, 'Inter', sans-serif)",
              fontSize: isAr ? 16 : 13, fontWeight: 600, letterSpacing: isAr ? 0 : "2.4px",
              color: "#ffffff", textTransform: isAr ? "none" : "uppercase", marginBottom: 16,
            }}>
              {isAr ? "شنو يشمل" : "What's Included"}
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
              {(isAr ? [
                "غسيل خارجي يدوي وتجفيف",
                "تنظيف ومسح داخلي",
                "تنظيف فتحات التكييف",
                "مطلوب بطاقة طالب سارية",
                "متاح في أي مكان بالكويت",
              ] : [
                "Exterior hand wash & dry",
                "Interior vacuum & wipe-down",
                "AC vent cleaning",
                "Valid student ID required",
                "Available anywhere in Kuwait",
              ]).map((item, i) => (
                <li key={i} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  fontFamily: isAr ? "var(--font-arabic, 'Tajawal', sans-serif)" : "var(--font-label, 'Inter', sans-serif)",
                  fontSize: 16, color: "#ffffff",
                }}>
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Two-button row: WhatsApp (left) + Book Online (right) */}
          <div style={{ padding: "0 28px 28px" }}>
            <div className="st-cta-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <a
                href={waUrl(lang)}
                target="_blank"
                rel="noopener noreferrer"
                className="st-wa-btn"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                  padding: "18px 24px",
                  background: WA,
                  color: "#fff",
                  borderRadius: 50,
                  fontFamily: isAr ? "var(--font-arabic, 'Tajawal', sans-serif)" : "var(--font-label, 'Inter', sans-serif)",
                  fontSize: isAr ? 15 : 14, fontWeight: 700, letterSpacing: isAr ? 0 : "1.6px",
                  textTransform: isAr ? "none" : "uppercase", textDecoration: "none",
                  transition: "all 0.3s ease",
                  boxShadow: "0 8px 32px rgba(30,169,82,0.35)",
                }}
              >
                <WhatsAppIcon size={20} />
                {isAr ? "احجز عبر واتساب" : "Claim on WhatsApp"}
              </a>
              <button
                type="button"
                onClick={() => {
                  const next = !formOpen;
                  setFormOpen(next);
                  if (next) {
                    // Smoothly scroll to reveal the newly-expanded form within the card
                    setTimeout(() => {
                      const form = document.getElementById("student-form");
                      if (form) form.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 100);
                  }
                }}
                className="st-book-btn"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                  padding: "18px 24px",
                  background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_L})`,
                  color: DARK,
                  border: "none",
                  borderRadius: 50,
                  fontFamily: isAr ? "var(--font-arabic, 'Tajawal', sans-serif)" : "var(--font-label, 'Inter', sans-serif)",
                  fontSize: isAr ? 15 : 14, fontWeight: 700, letterSpacing: isAr ? 0 : "1.6px",
                  textTransform: isAr ? "none" : "uppercase", cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 8px 32px rgba(168,176,184,0.25)",
                }}
              >
                {formOpen
                  ? (isAr ? "إغلاق النموذج" : "Close Form")
                  : (isAr ? "احجز إلكترونياً" : "Book Online")}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ transform: formOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.35s ease" }}>
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <polyline points="19 12 12 19 5 12" />
                </svg>
              </button>
            </div>

            <div className="st-cta-sub" style={{
              textAlign: "center", marginTop: 16,
              fontFamily: isAr ? "var(--font-arabic, 'Tajawal', sans-serif)" : "var(--font-label, 'Inter', sans-serif)",
              fontSize: isAr ? 15 : 14, color: "#ffffff", letterSpacing: isAr ? 0 : "0.3px",
            }}>
              {isAr
                ? "ضغطة وحدة · الرسالة جاهزة · رد فوري"
                : "One-tap claim · Message pre-filled · Instant response"}
            </div>
          </div>

          {/* Inline expanding form — part of the same card */}
          <div
            id="student-form"
            className={`st-form-wrap${formOpen ? " is-open" : ""}`}
            aria-hidden={!formOpen}
            style={{ scrollMarginTop: 100 }}
          >
            <div className="st-form-inner">
              {submitted ? (
                <div style={{
                  padding: "56px 28px",
                  borderTop: `1px solid ${BORDER}`,
                  textAlign: "center",
                  fontFamily: isAr ? "var(--font-arabic, 'Tajawal', sans-serif)" : "var(--font-label, 'Inter', sans-serif)",
                }}>
                  <div style={{
                    width: 72, height: 72, borderRadius: "50%",
                    background: "rgba(30,169,82,0.15)",
                    border: `1px solid rgba(30,169,82,0.4)`,
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 20, color: WA,
                  }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 style={{
                    fontFamily: isAr ? "var(--font-arabic, 'Tajawal', sans-serif)" : "var(--font-numeral, 'Bodoni Moda', serif)",
                    fontSize: 26, fontWeight: isAr ? 700 : 600, color: "#ffffff", margin: "0 0 10px",
                  }}>
                    {isAr ? "تم استلام طلبك" : "Request Received"}
                  </h3>
                  <p style={{ fontSize: 14, color: TEXT2, margin: 0, lineHeight: 1.6 }}>
                    {isAr ? "بنأكد موعدك خلال ساعتين" : "We'll confirm your appointment within 2 hours"}
                  </p>
                </div>
              ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setSubmitting(true);
                  const formData = new FormData(e.currentTarget);
                  formData.set("source", "student");
                  const params = new URLSearchParams();
                  formData.forEach((v, k) => { if (typeof v === "string") params.append(k, v); });
                  try {
                    await fetch(SHEETS_URL, {
                      method: "POST",
                      mode: "no-cors",
                      headers: { "Content-Type": "application/x-www-form-urlencoded" },
                      body: params.toString(),
                    });
                  } catch { /* no-cors: response unreadable but POST goes through */ }
                  setSubmitted(true);
                  setSubmitting(false);
                }}
                style={{
                  padding: "32px 28px 28px",
                  borderTop: `1px solid ${BORDER}`,
                }}
              >
                <input type="hidden" name="source" value="student" />
                <input type="hidden" name="offer" value="Student 5 KD Home Wash" />

                <div style={{
                  fontFamily: isAr ? "var(--font-arabic, 'Tajawal', sans-serif)" : "var(--font-numeral, 'Bodoni Moda', serif)",
                  fontSize: 26, fontWeight: isAr ? 700 : 600, color: "#ffffff", marginBottom: 22,
                  textAlign: "center",
                }}>
                  {isAr ? "احجز غسلتك الطلابية" : "Book Your Student Wash"}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 14px", marginBottom: 14 }}>
                  <div className="st-field">
                    <Label isAr={isAr}>{isAr ? "الاسم الكامل" : "Full Name"}</Label>
                    <input type="text" name="name" required placeholder={isAr ? "اسمك الكامل" : "Your name"} />
                  </div>
                  <div className="st-field">
                    <Label isAr={isAr}>{isAr ? "الهاتف" : "Phone"}</Label>
                    <input type="tel" name="phone" required placeholder="+965 XXXX XXXX" />
                  </div>
                </div>

                <div style={{ marginBottom: 14 }}>
                  <div className="st-field">
                    <Label isAr={isAr}>{isAr ? "العنوان" : "Address"}</Label>
                    <input type="text" name="address" required placeholder={isAr ? "قطعة، شارع، بيت — أي مكان بالكويت" : "Block, street, house — anywhere in Kuwait"} />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 14px", marginBottom: 14 }}>
                  <div className="st-field">
                    <Label isAr={isAr}>{isAr ? "الجامعة / المدرسة" : "University / School"}</Label>
                    <input type="text" name="university" required placeholder={isAr ? "مثلاً جامعة الكويت، AUK، GUST" : "e.g. KU, AUK, GUST"} />
                  </div>
                  <div className="st-field">
                    <Label isAr={isAr}>{isAr ? "السيارة" : "Vehicle"}</Label>
                    <input type="text" name="vehicle" required placeholder={isAr ? "الماركة والموديل" : "Make & model"} />
                  </div>
                </div>

                <div style={{ marginBottom: 20 }} className="st-field">
                  <Label isAr={isAr}>{isAr ? "التاريخ المفضل" : "Preferred Date"}</Label>
                  <input type="date" name="date" required />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="st-submit"
                  style={{
                    width: "100%", padding: "15px",
                    background: ACCENT, color: DARK, border: "none",
                    borderRadius: 50,
                    fontFamily: isAr ? "var(--font-arabic, 'Tajawal', sans-serif)" : "var(--font-label, 'Inter', sans-serif)",
                    fontSize: isAr ? 15 : 13, fontWeight: 700, letterSpacing: isAr ? 0 : "2px",
                    textTransform: isAr ? "none" : "uppercase",
                    cursor: submitting ? "not-allowed" : "pointer",
                    opacity: submitting ? 0.6 : 1,
                    transition: "all 0.3s ease",
                  }}
                >
                  {submitting
                    ? (isAr ? "جاري الإرسال..." : "Sending...")
                    : (isAr ? "أرسل طلب الحجز" : "Submit Booking Request")}
                </button>

                <div style={{
                  textAlign: "center", marginTop: 16,
                  fontFamily: isAr ? "var(--font-arabic, 'Tajawal', sans-serif)" : "var(--font-label, 'Inter', sans-serif)",
                  fontSize: isAr ? 14 : 13, color: "#ffffff",
                }}>
                  {isAr ? "بنأكد موعدك خلال ساعتين" : "We'll confirm your appointment within 2 hours"}
                </div>
              </form>
              )}
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <div style={{
          display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap",
          marginTop: 32,
          fontFamily: isAr ? "var(--font-arabic, 'Tajawal', sans-serif)" : "var(--font-label, 'Inter', sans-serif)",
          fontSize: isAr ? 13 : 11, color: TEXT3, letterSpacing: isAr ? 0 : "1.5px", textTransform: isAr ? "none" : "uppercase",
          animation: "fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both",
        }}>
          <span>{isAr ? "⭐ ٤٫٩ · ١٥٠+ غسلة" : "⭐ 4.9 · 150+ washes"}</span>
          <span style={{ color: "rgba(168,176,184,0.3)" }}>·</span>
          <span>{isAr ? "📍 في كل الكويت" : "📍 All of Kuwait"}</span>
          <span style={{ color: "rgba(168,176,184,0.3)" }}>·</span>
          <span>{isAr ? "⏱ نفس اليوم" : "⏱ Same-day available"}</span>
        </div>
      </div>
    </div>
  );
}

function Label({ children, isAr }: { children: React.ReactNode; isAr?: boolean }) {
  return (
    <label style={{
      fontFamily: isAr ? "var(--font-arabic, 'Tajawal', sans-serif)" : "var(--font-label, 'Inter', sans-serif)",
      fontSize: isAr ? 13 : 11, fontWeight: 600, letterSpacing: isAr ? 0 : "0.16em",
      color: "#ffffff", textTransform: isAr ? "none" : "uppercase",
      display: "block", marginBottom: 8,
    }}>
      {children}
    </label>
  );
}
