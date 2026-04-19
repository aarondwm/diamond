"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";

type Lang = "en" | "ar";

/* ── Theme tokens (matching site palette) ── */
const ACCENT = "#a8b0b8";
const ACCENT_L = "#c8ced6";
const DARK = "#0a0a0f";
const GLASS = "rgba(10,10,15,0.85)";
const BORDER = "rgba(168,176,184,0.15)";
const BORDER_H = "rgba(168,176,184,0.3)";
const TEXT = "#f0ece2";
const TEXT2 = "rgba(255,255,255,0.65)";
const TEXT3 = "rgba(255,255,255,0.4)";
const WA = "#1ea952";
const WA_BG = "rgba(30,169,82,0.06)";
const WA_BORDER = "rgba(30,169,82,0.25)";

const services = [
  "Paint Protection Film",
  "Tinting & Heat Insulation",
  "Polishing & Paint Correction",
  "Full Wash",
  "Home Service",
  "VIP Wash",
  "Gold Membership",
  "Diamond Membership",
];

/* ── Icons ── */
const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);
const PhoneIcon = ({ size = 18 }: { size?: number }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>);
const MailIcon = ({ size = 18 }: { size?: number }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 7l-10 7L2 7" /></svg>);
const ClockIcon = ({ size = 18 }: { size?: number }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>);
const MapIcon = ({ size = 18 }: { size?: number }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>);
const ArrowIcon = ({ size = 14 }: { size?: number }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>);
const CameraIcon = ({ size = 18 }: { size?: number }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" /><circle cx="12" cy="13" r="4" /></svg>);

function FormField({ label, placeholder, type = "text", required = true, optionalLabel }: { label: string; placeholder?: string; type?: string; required?: boolean; optionalLabel?: string }) {
  return (
    <div style={{ marginBottom: 16 }} className="ct-field">
      <label style={{
        fontSize: 11, fontWeight: 600, letterSpacing: "0.14em",
        color: TEXT3, textTransform: "uppercase", display: "block", marginBottom: 8,
        fontFamily: "var(--font-label, 'Inter', sans-serif)",
      }}>
        {label}
        {!required && <span style={{ fontWeight: 400 }}>{optionalLabel || " (optional)"}</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        style={{
          width: "100%", padding: "12px 14px",
          background: "rgba(255,255,255,0.02)",
          border: `1px solid ${BORDER}`,
          borderRadius: 10,
          color: TEXT, fontSize: 13,
          fontFamily: "var(--font-label, 'Inter', sans-serif)",
          outline: "none", transition: "all 0.2s",
          colorScheme: type === "date" ? "dark" : undefined,
        }}
      />
    </div>
  );
}

type Lang = "en" | "ar";

function ContactInner() {
  const params = useSearchParams();
  const [tab, setTab] = useState(0);
  const [selectedSvc, setSelectedSvc] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [lang, setLang] = useState<Lang>("en");
  const isAr = lang === "ar";

  useEffect(() => {
    const saved = localStorage.getItem("dpkw-lang") as Lang | null;
    if (saved === "ar") setLang("ar");
    const handler = (e: Event) => {
      setLang((e as CustomEvent).detail as Lang);
    };
    window.addEventListener("lang-change", handler);
    return () => window.removeEventListener("lang-change", handler);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const q = params.get("service");
    if (q) {
      const idx = services.findIndex(s => s.toLowerCase().includes(q.toLowerCase()));
      if (idx >= 0) setSelectedSvc(idx);
      setTab(1);
    }
  }, [params]);

  const tabs = [
    { icon: <WhatsAppIcon size={15} />, label: isAr ? "واتساب" : "WhatsApp", color: WA, accent: "rgba(30,169,82,0.08)" },
    { icon: <MailIcon size={15} />, label: isAr ? "نموذج إلكتروني" : "Online Form", color: ACCENT, accent: "rgba(168,176,184,0.06)" },
    { icon: <PhoneIcon size={15} />, label: isAr ? "اتصل بنا" : "Call Us", color: TEXT, accent: "rgba(255,255,255,0.03)" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: DARK,
      color: TEXT,
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        .ct-field input:focus, .ct-field textarea:focus, .ct-field select:focus {
          border-color: ${ACCENT} !important;
          background: rgba(168,176,184,0.03) !important;
        }
        .ct-tab:hover { background: rgba(255,255,255,0.03) !important; }
        .ct-gold-btn:hover { background: ${ACCENT_L} !important; transform: translateY(-1px); box-shadow: 0 6px 24px rgba(168,176,184,0.2); }
        .ct-wa-btn:hover { background: #1ea952 !important; transform: translateY(-1px); box-shadow: 0 6px 24px rgba(30,169,82,0.25); }
        .ct-info-item:hover { border-color: ${BORDER_H} !important; background: rgba(168,176,184,0.03) !important; }
        .ct-phone-row:hover { border-color: ${ACCENT} !important; color: ${ACCENT} !important; background: rgba(168,176,184,0.04) !important; }
        .ct-svc-chip:hover { border-color: rgba(168,176,184,0.5) !important; color: ${TEXT} !important; }
        .ct-wa-quick:hover { border-color: ${WA} !important; background: rgba(30,169,82,0.08) !important; }
        @keyframes ctSlide { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        @keyframes ctFadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes ctDot { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
        @keyframes ctPulse { 0%,100% { box-shadow:0 0 0 0 rgba(30,169,82,0.3); } 50% { box-shadow:0 0 0 8px rgba(30,169,82,0); } }
      `}</style>

      {/* Ambient glow */}
      <div style={{
        position: "absolute", top: 0, left: "-10%", right: "-10%", height: "300%",
        background: "radial-gradient(ellipse at 50% 8%, rgba(168,176,184,0.06) 0%, transparent 55%)",
        pointerEvents: "none",
      }} />

      <div style={{
        position: "relative", zIndex: 1,
        maxWidth: 860, margin: "0 auto", padding: "100px 20px 60px",
        opacity: loaded ? 1 : 0,
        transform: loaded ? "translateY(0)" : "translateY(10px)",
        transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>

        {/* Header */}
        <div style={{
          textAlign: "center", marginBottom: 28,
          animation: "ctFadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both",
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 12,
            fontFamily: "var(--font-label, 'Inter', sans-serif)",
            fontSize: 16, letterSpacing: "3px", color: ACCENT,
            textTransform: "uppercase", fontWeight: 500, marginBottom: 18,
          }}>
            <div style={{ width: 32, height: 1, background: `linear-gradient(90deg, transparent, ${ACCENT})` }} />
            {isAr ? "تواصل" : "Contact"}
            <div style={{ width: 32, height: 1, background: `linear-gradient(90deg, ${ACCENT}, transparent)` }} />
          </div>

          <h1 style={{
            fontFamily: isAr ? "var(--font-arabic, 'Tajawal', sans-serif)" : "var(--font-numeral, 'Bodoni Moda', serif)",
            fontSize: "clamp(40px, 6vw, 56px)", fontWeight: isAr ? 700 : 600,
            color: TEXT, lineHeight: 1.15, margin: 0,
            letterSpacing: isAr ? 0 : "-0.5px",
          }}>
            {isAr
              ? <>احجز <span style={{ color: ACCENT }}>زيارتك</span></>
              : <>Book Your <span style={{ color: ACCENT }}>Visit</span></>}
          </h1>

          <p style={{
            fontFamily: isAr ? "var(--font-arabic, 'Tajawal', sans-serif)" : "var(--font-label, 'Inter', sans-serif)",
            fontSize: isAr ? 20 : 16, color: TEXT2, marginTop: 14,
            fontWeight: isAr ? 500 : 400, lineHeight: 1.6, maxWidth: 640, margin: "14px auto 0",
          }}>
            {isAr
              ? "اختر الطريقة اللي تحبها توصلنا فيها. نرد عليك خلال ساعتين"
              : "Choose how you'd like to reach us. We'll confirm your appointment within 2 hours"}
          </p>

          {/* Social proof */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 10, marginTop: 16,
            fontFamily: "var(--font-label, 'Inter', sans-serif)",
            fontSize: 13, color: TEXT2,
          }}>
            <div style={{ display: "flex", gap: 2 }}>
              {[1, 2, 3, 4, 5].map(i => (
                <svg key={i} width={12} height={12} viewBox="0 0 24 24" fill="#c9a84c"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
              ))}
            </div>
            <span>{isAr ? "تقييم ٤٫٩" : "4.9 rated"}</span>
            <span style={{ color: BORDER_H }}>·</span>
            <span>{isAr ? "١٥٠+ سيارة خدمناها" : "150+ vehicles serviced"}</span>
          </div>
        </div>

        {/* Glass Container */}
        <div style={{
          background: GLASS,
          border: `1px solid ${BORDER}`,
          borderRadius: 20,
          backdropFilter: "blur(20px)",
          boxShadow: `0 0 80px rgba(168,176,184,0.04), 0 1px 0 rgba(255,255,255,0.03) inset`,
          overflow: "hidden",
          animation: "ctFadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both",
        }}>

          {/* Tab Bar */}
          <div style={{ display: "flex", borderBottom: `1px solid ${BORDER}`, position: "relative" }}>
            <div style={{
              position: "absolute", bottom: 0,
              [isAr ? "right" : "left"]: `${tab * (100 / 3)}%`, width: `${100 / 3}%`,
              height: 2, background: tabs[tab].color,
              transition: `${isAr ? "right" : "left"} 0.35s cubic-bezier(0.16, 1, 0.3, 1)`,
              boxShadow: `0 0 12px ${tab === 0 ? "rgba(30,169,82,0.3)" : "rgba(168,176,184,0.3)"}`,
            }} />
            {tabs.map((t, i) => (
              <button key={i} className="ct-tab" onClick={() => setTab(i)} style={{
                flex: 1, background: i === tab ? t.accent : "transparent",
                border: "none", borderRadius: 0, padding: "16px 0",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                cursor: "pointer", color: i === tab ? t.color : TEXT3,
                fontFamily: "var(--font-label, 'Inter', sans-serif)",
                fontSize: 11, fontWeight: i === tab ? 600 : 400,
                letterSpacing: "0.1em", textTransform: "uppercase",
                transition: "all 0.3s ease",
              }}>
                {t.icon}{t.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div key={tab} style={{ padding: "32px 36px 36px", animation: "ctSlide 0.35s cubic-bezier(0.16, 1, 0.3, 1) both" }}>

            {/* WhatsApp Tab */}
            {tab === 0 && (
              <div>
                <div style={{
                  background: "#0b141a", borderRadius: 14, overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.06)", marginBottom: 20,
                }}>
                  <div style={{
                    background: "#1f2c34", padding: "10px 16px",
                    display: "flex", alignItems: "center", gap: 10,
                  }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: "50%",
                      background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_L})`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 14, fontWeight: 700, color: DARK,
                    }}>D</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 600, color: "#e9edef" }}>Diamond PKW</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 1 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: WA, animation: "ctDot 2s ease infinite" }} />
                        <span style={{ fontSize: 12, color: "#8696a0" }}>{isAr ? "متصل · نرد خلال ١٥ دقيقة" : "Online · replies in ~15 min"}</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 14, color: "#8696a0" }}>
                      <PhoneIcon size={16} /><CameraIcon size={16} />
                    </div>
                  </div>
                  <div style={{ padding: "20px 18px" }}>
                    <div style={{
                      background: "#005c4b", borderRadius: "0 8px 8px 8px",
                      padding: "10px 14px", maxWidth: "88%", marginBottom: 10,
                    }}>
                      <p style={{ fontSize: 14, color: "#e9edef", margin: 0, lineHeight: 1.55 }}>
                        {isAr ? "هلا فيك! 👋 مرحباً في دايموند PKW. نقدر نساعدك تحمي سيارتك." : "Hi! 👋 Welcome to Diamond PKW. We'd love to help protect your vehicle."}
                      </p>
                      <p style={{ fontSize: 13, color: "#e9edef", margin: "6px 0 0", lineHeight: 1.55 }}>
                        {isAr ? "شنو الخدمة اللي تبيها؟" : "What service are you interested in?"}
                      </p>
                      <div style={{ fontSize: 9, color: "#8696a0", textAlign: "right", marginTop: 5 }}>
                        2:31 PM <span style={{ color: "#53bdeb" }}>✓✓</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14 }}>
                      {(isAr
                        ? ["🛡️ احجز PPF", "🪟 تظليل النوافذ", "🧽 غسيل كامل", "💬 طلب عرض سعر"]
                        : ["🛡️ Book PPF", "🪟 Window Tinting", "🧽 Full Wash", "💬 Get a Quote"]
                      ).map((q, i) => (
                        <a key={i} href="https://wa.me/96595536344" target="_blank" rel="noopener noreferrer" className="ct-wa-quick" style={{
                          border: "1px solid #00a884", borderRadius: 18, padding: "7px 14px",
                          fontSize: 14, color: "#00a884", cursor: "pointer", transition: "all 0.2s", textDecoration: "none",
                        }}>{q}</a>
                      ))}
                    </div>
                  </div>
                </div>
                <a href="https://wa.me/96595536344?text=Hi%20Diamond%20PKW%2C%20I'd%20like%20to%20book%20a%20service." target="_blank" rel="noopener noreferrer" className="ct-wa-btn" style={{
                  width: "100%", background: WA, border: "none", borderRadius: 50, color: "#fff",
                  padding: "18px", fontSize: 15, fontFamily: "var(--font-label, 'Inter', sans-serif)",
                  fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                  transition: "all 0.2s ease", textDecoration: "none",
                }}>
                  <WhatsAppIcon size={20} /> {isAr ? "ابدأ الحجز عبر واتساب" : "Start Booking on WhatsApp"}
                </a>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 20 }}>
                  {(isAr ? [
                    { icon: "⚡", text: "تأكيد فوري" },
                    { icon: "📸", text: "ارسل الصور مباشرة" },
                    { icon: "🔔", text: "تحديثات لحظية" },
                    { icon: "💬", text: "اسأل عن أي شي" },
                  ] : [
                    { icon: "⚡", text: "Instant confirmation" },
                    { icon: "📸", text: "Share photos directly" },
                    { icon: "🔔", text: "Real-time updates" },
                    { icon: "💬", text: "Ask anything first" },
                  ]).map((b, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", gap: 8,
                      fontSize: 13, color: TEXT2, padding: "12px 14px",
                      background: WA_BG, border: "1px solid rgba(30,169,82,0.08)", borderRadius: 10,
                    }}>
                      <span style={{ fontSize: 14 }}>{b.icon}</span>{b.text}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Form Tab */}
            {tab === 1 && (
              <div>
                <form action="https://formsubmit.co/info@diamond-pkw.com" method="POST">
                  <input type="hidden" name="_subject" value="New Booking — Diamond PKW" />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
                    <FormField label={isAr ? "الاسم الكامل" : "Full Name"} placeholder={isAr ? "اسمك الكامل" : "Your full name"} />
                    <FormField label={isAr ? "رقم الهاتف" : "Phone Number"} placeholder="+965 XXXX XXXX" />
                  </div>
                  <FormField label={isAr ? "البريد الإلكتروني" : "Email"} placeholder="your@email.com" required={false} optionalLabel={isAr ? " (اختياري)" : undefined} />
                  <div style={{ display: "grid", gridTemplateColumns: "90px 1fr", gap: "0 12px" }}>
                    <FormField label={isAr ? "السنة" : "Year"} placeholder="2024" />
                    <FormField label={isAr ? "ماركة وموديل السيارة" : "Vehicle Make & Model"} placeholder={isAr ? "مرسيدس S-Class" : "Mercedes S-Class"} />
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={{
                      fontSize: 9, fontWeight: 600, letterSpacing: isAr ? 0 : "0.14em",
                      color: TEXT3, textTransform: isAr ? "none" : "uppercase", display: "block", marginBottom: 8,
                      fontFamily: isAr ? "var(--font-arabic, 'Tajawal', sans-serif)" : "var(--font-label, 'Inter', sans-serif)",
                    }}>{isAr ? "الخدمة" : "Service"}</label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {services.map((s, i) => (
                        <button type="button" key={i} className="ct-svc-chip" onClick={() => setSelectedSvc(i)} style={{
                          padding: "8px 14px", fontSize: 11, borderRadius: 50,
                          border: `1px solid ${i === selectedSvc ? ACCENT : BORDER}`,
                          color: i === selectedSvc ? DARK : TEXT3,
                          background: i === selectedSvc ? ACCENT : "transparent",
                          cursor: "pointer", transition: "all 0.2s",
                          fontFamily: "var(--font-label, 'Inter', sans-serif)",
                          fontWeight: i === selectedSvc ? 600 : 400,
                        }}>{s}</button>
                      ))}
                    </div>
                    {selectedSvc !== null && <input type="hidden" name="service" value={services[selectedSvc]} />}
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
                    <FormField label={isAr ? "التاريخ المفضل" : "Preferred Date"} type="date" />
                    <div style={{ marginBottom: 16 }} className="ct-field">
                      <label style={{
                        fontSize: 9, fontWeight: 600, letterSpacing: isAr ? 0 : "0.14em",
                        color: TEXT3, textTransform: isAr ? "none" : "uppercase", display: "block", marginBottom: 8,
                        fontFamily: isAr ? "var(--font-arabic, 'Tajawal', sans-serif)" : "var(--font-label, 'Inter', sans-serif)",
                      }}>{isAr ? "الوقت" : "Time"}</label>
                      <select name="time" style={{
                        width: "100%", padding: "12px 14px", borderRadius: 10,
                        background: "rgba(255,255,255,0.02)", border: `1px solid ${BORDER}`,
                        color: TEXT2, fontSize: 13, fontFamily: "var(--font-label, 'Inter', sans-serif)",
                        outline: "none", transition: "all 0.2s",
                      }}>
                        <option>{isAr ? "أي وقت" : "Any time"}</option>
                        <option>{isAr ? "الصباح (٩–١٢)" : "Morning (9–12)"}</option>
                        <option>{isAr ? "الظهر (١٢–٥)" : "Afternoon (12–5)"}</option>
                        <option>{isAr ? "المسا (٥–٨)" : "Evening (5–8)"}</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom: 20 }} className="ct-field">
                    <label style={{
                      fontSize: 9, fontWeight: 600, letterSpacing: isAr ? 0 : "0.14em",
                      color: TEXT3, textTransform: isAr ? "none" : "uppercase", display: "block", marginBottom: 8,
                      fontFamily: isAr ? "var(--font-arabic, 'Tajawal', sans-serif)" : "var(--font-label, 'Inter', sans-serif)",
                    }}>{isAr ? "ملاحظات إضافية" : "Additional Notes"}</label>
                    <textarea name="notes" placeholder={isAr ? "شي تبي تذكره لنا؟" : "Anything we should know?"} rows={2} style={{
                      width: "100%", padding: "12px 14px", borderRadius: 10,
                      background: "rgba(255,255,255,0.02)", border: `1px solid ${BORDER}`,
                      color: TEXT, fontSize: 13, fontFamily: "var(--font-label, 'Inter', sans-serif)",
                      outline: "none", resize: "vertical", transition: "all 0.2s",
                    }} />
                  </div>

                  <button type="submit" className="ct-gold-btn" style={{
                    width: "100%", background: ACCENT, color: DARK, border: "none", borderRadius: 50,
                    padding: "15px", fontSize: 13, fontFamily: isAr ? "var(--font-arabic, 'Tajawal', sans-serif)" : "var(--font-label, 'Inter', sans-serif)",
                    fontWeight: 700, letterSpacing: isAr ? 0 : "0.16em", textTransform: isAr ? "none" : "uppercase",
                    cursor: "pointer", transition: "all 0.2s ease",
                  }}>
                    {isAr ? "أرسل طلب الحجز" : "Send Booking Request"}
                  </button>
                </form>

                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  gap: 8, marginTop: 14, fontSize: 11, color: TEXT3,
                  fontFamily: isAr ? "var(--font-arabic, 'Tajawal', sans-serif)" : "var(--font-label, 'Inter', sans-serif)",
                }}>
                  <span>{isAr ? "تبي تأكيد فوري؟" : "Prefer instant confirmation?"}</span>
                  <span style={{ color: WA, cursor: "pointer", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }} onClick={() => setTab(0)}>
                    <WhatsAppIcon size={12} /> {isAr ? "استخدم واتساب" : "Use WhatsApp"}
                  </span>
                </div>
              </div>
            )}

            {/* Call Tab */}
            {tab === 2 && (
              <div style={{ textAlign: "center", padding: "8px 0" }}>
                <div style={{
                  width: 80, height: 80, borderRadius: "50%",
                  background: `linear-gradient(135deg, rgba(168,176,184,0.08), rgba(168,176,184,0.03))`,
                  border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 20px", color: ACCENT,
                }}>
                  <PhoneIcon size={34} />
                </div>
                <h2 style={{
                  fontFamily: isAr ? "var(--font-arabic, 'Tajawal', sans-serif)" : "var(--font-numeral, 'Bodoni Moda', serif)",
                  fontSize: 28, fontWeight: isAr ? 700 : 600, color: TEXT, margin: "0 0 6px",
                }}>{isAr ? "اتصل فينا مباشرة" : "Call Us Directly"}</h2>
                <p style={{ fontSize: isAr ? 14 : 12, color: TEXT2, marginBottom: 28, fontFamily: isAr ? "var(--font-arabic, 'Tajawal', sans-serif)" : "var(--font-label, 'Inter', sans-serif)" }}>
                  {isAr ? "فريقنا متوفر من السبت للخميس، ٩ صباحاً – ٨ مساءً" : "Our team is available Saturday – Thursday, 9 AM – 8 PM"}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                  {(isAr ? [
                    { num: "+٩٦٥ ٩٥٥٣ ٦٣٤٤", tel: "+96595536344", label: "الخط الرئيسي" },
                    { num: "+٩٦٥ ٩٥٥٣ ٩١١٤", tel: "+96595539114", label: "خط الحجوزات" },
                  ] : [
                    { num: "+965 9553 6344", tel: "+96595536344", label: "Main Line" },
                    { num: "+965 9553 9114", tel: "+96595539114", label: "Booking Line" },
                  ]).map((p, i) => (
                    <a key={i} href={`tel:${p.tel}`} className="ct-phone-row" style={{
                      background: "transparent", border: `1px solid ${BORDER}`, borderRadius: 14,
                      color: TEXT, padding: "18px 24px", cursor: "pointer", transition: "all 0.2s",
                      display: "flex", alignItems: "center", gap: 20, textDecoration: "none",
                      position: "relative",
                    }}>
                      <div style={{ flex: 1, textAlign: "center" }}>
                        <div style={{ fontSize: 20, fontWeight: 500, letterSpacing: "0.04em", fontFamily: "var(--font-numeral, 'Bodoni Moda', serif)" }}>{p.num}</div>
                        <div style={{ fontSize: 12, color: TEXT3, marginTop: 4, textTransform: isAr ? "none" : "uppercase", letterSpacing: isAr ? 0 : "0.1em", fontFamily: isAr ? "var(--font-arabic, 'Tajawal', sans-serif)" : "var(--font-label, 'Inter', sans-serif)" }}>{p.label}</div>
                      </div>
                      <div style={{ color: ACCENT, position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)" }}><ArrowIcon size={22} /></div>
                    </a>
                  ))}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                  <div style={{ flex: 1, height: 1, background: BORDER }} />
                  <span style={{ fontSize: 11, color: TEXT3, letterSpacing: isAr ? 0 : "0.15em", textTransform: isAr ? "none" : "uppercase", fontFamily: isAr ? "var(--font-arabic, 'Tajawal', sans-serif)" : "var(--font-label, 'Inter', sans-serif)" }}>{isAr ? "أو توصل فينا عن طريق" : "or reach us on"}</span>
                  <div style={{ flex: 1, height: 1, background: BORDER }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <button onClick={() => setTab(0)} style={{
                    background: WA_BG, border: `1px solid ${WA_BORDER}`, borderRadius: 14,
                    color: WA, padding: "14px", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    fontSize: 13, fontFamily: isAr ? "var(--font-arabic, 'Tajawal', sans-serif)" : "var(--font-label, 'Inter', sans-serif)", fontWeight: 600, transition: "all 0.2s",
                  }}>
                    <WhatsAppIcon size={16} /> {isAr ? "واتساب" : "WhatsApp"}
                  </button>
                  <button onClick={() => setTab(1)} style={{
                    background: "rgba(168,176,184,0.04)", border: `1px solid ${BORDER}`, borderRadius: 14,
                    color: ACCENT, padding: "14px", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    fontSize: 13, fontFamily: isAr ? "var(--font-arabic, 'Tajawal', sans-serif)" : "var(--font-label, 'Inter', sans-serif)", fontWeight: 600, transition: "all 0.2s",
                  }}>
                    <MailIcon size={16} /> {isAr ? "نموذج إلكتروني" : "Online Form"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Contact Info Strip */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginTop: 16,
          animation: "ctFadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both",
        }}>
          {(isAr ? [
            { icon: <PhoneIcon size={14} />, label: "اتصل", value: "+٩٦٥ ٩٥٥٣ ٦٣٤٤" },
            { icon: <MailIcon size={14} />, label: "البريد", value: "info@diamond-pkw.com" },
            { icon: <MapIcon size={14} />, label: "الموقع", value: "شارع ١٦، مدينة الكويت" },
            { icon: <ClockIcon size={14} />, label: "الدوام", value: "السبت–الخميس ٩–٨" },
          ] : [
            { icon: <PhoneIcon size={14} />, label: "Call", value: "+965 9553 6344" },
            { icon: <MailIcon size={14} />, label: "Email", value: "info@diamond-pkw.com" },
            { icon: <MapIcon size={14} />, label: "Location", value: "16 St, Kuwait City" },
            { icon: <ClockIcon size={14} />, label: "Hours", value: "Sat–Thu 9–8" },
          ]).map((c, i) => (
            <div key={i} className="ct-info-item" style={{
              background: GLASS, border: `1px solid ${BORDER}`, borderRadius: 14,
              backdropFilter: "blur(10px)", padding: "14px 10px",
              textAlign: "center", transition: "all 0.2s", cursor: "default",
            }}>
              <div style={{ color: ACCENT, marginBottom: 6, display: "flex", justifyContent: "center" }}>{c.icon}</div>
              <div style={{
                fontSize: 10, color: TEXT3, letterSpacing: isAr ? 0 : "0.15em", textTransform: isAr ? "none" : "uppercase", marginBottom: 3,
                fontFamily: isAr ? "var(--font-arabic, 'Tajawal', sans-serif)" : "var(--font-label, 'Inter', sans-serif)", fontWeight: 600,
              }}>{c.label}</div>
              <div style={{ fontSize: 12, color: TEXT2, lineHeight: 1.4, fontFamily: isAr ? "var(--font-arabic, 'Tajawal', sans-serif)" : "var(--font-label, 'Inter', sans-serif)" }}>{c.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={null}>
      <ContactInner />
    </Suspense>
  );
}
