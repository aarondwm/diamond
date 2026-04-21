"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";

type Lang = "en" | "ar";

const SERVICES = [
  {
    key: "ppf",
    image: "/ppf.PNG",
    en: { title: "Paint Protection Film", badge: "Nano Guard Certified" },
    ar: { title: "فيلم حماية الطلاء", badge: "معتمد من نانو جارد" },
  },
  {
    key: "tinting",
    image: "/tinting.PNG",
    en: { title: "Tinting & Heat Insulation", badge: "Nano Guard Films" },
    ar: { title: "التظليل والعزل الحراري", badge: "أفلام نانو جارد" },
  },
  {
    key: "polish",
    image: "/polish.PNG",
    en: { title: "Polishing & Paint Correction", badge: "Mirror Finish" },
    ar: { title: "التلميع وتصحيح الطلاء", badge: "لمسة نهائية مرآة" },
  },
  {
    key: "full-wash",
    image: "/carwash.PNG",
    en: { title: "Full Wash", badge: "Interior · Exterior · Wheels" },
    ar: { title: "غسيل كامل", badge: "داخلي · خارجي · عجلات" },
  },
  {
    key: "home-service",
    image: "/home wash.PNG",
    en: { title: "Home Service", badge: "Car Wash · Tinting" },
    ar: { title: "خدمة منزلية", badge: "غسيل سيارات · تظليل" },
  },
];

const T = {
  en: {
    pageEyebrow: "Services",
    pageTitle: "What We Offer",
    pageSubtitle: "Premium detailing and protection services tailored for Kuwait's roads and climate.",
    backHome: "Back to Home",
    enquire: "Enquire",
  },
  ar: {
    pageEyebrow: "خدماتنا",
    pageTitle: "ما نقدمه",
    pageSubtitle: "خدمات تلميع وحماية متميزة مصممة لطرق ومناخ الكويت.",
    backHome: "العودة للرئيسية",
    enquire: "احجز الآن",
  },
};

export default function ServicesPage() {
  const [lang, setLang] = useState<Lang>("en");
  const t = useCallback((k: string) => T[lang][k as keyof (typeof T)["en"]] || k, [lang]);
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

  return (
    <div className={`svc-page${isAr ? " svc-rtl" : ""}`}>
      {/* Header provided by layout */}

      <div className="sv-hero">
        <div className="sv-hero-bg" />
        <div className="sv-eyebrow">
          <span className="sv-eyebrow-line" />
          {t("pageEyebrow")}
          <span className="sv-eyebrow-line" />
        </div>
        <h1>{t("pageTitle")}</h1>
        <p>{t("pageSubtitle")}</p>
      </div>

      {/* Home service pricing strip */}
      <div className="sv-pricing-strip">
        <div className="sv-pricing-label">{lang === "ar" ? "غسيل ومسح منزلي" : "Home Service Wash & Wipe"}</div>
        <div className="sv-pricing-pills">
          <Link href="/contact?service=motorcycle-wash" className="sv-pill">
            <svg className="sv-pill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="5.5" cy="17.5" r="3.5" /><circle cx="18.5" cy="17.5" r="3.5" />
              <path d="M15 6h3l1.5 5M5.5 17.5L9 8h6l3.5 9.5M9 8L7 6" />
            </svg>
            <div className="sv-pill-info">
              <span className="sv-pill-type">{lang === "ar" ? "دراجة نارية" : "Motorcycle"}</span>
              <span className="sv-pill-service">{lang === "ar" ? "غسيل ومسح" : "Wash & Wipe"}</span>
            </div>
            <span className="sv-pill-price">{isAr ? "٣" : "3"} <span className="sv-pill-kd">{isAr ? "د.ك" : "KD"}</span></span>
          </Link>
          <Link href="/contact?service=sedan-wash" className="sv-pill">
            <svg className="sv-pill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 17h18M5 17v-5l2-5h10l2 5v5M7 7h10" />
              <circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" />
            </svg>
            <div className="sv-pill-info">
              <span className="sv-pill-type">{lang === "ar" ? "سيدان" : "Sedan"}</span>
              <span className="sv-pill-service">{lang === "ar" ? "داخلي + خارجي" : "Interior + Exterior"}</span>
            </div>
            <span className="sv-pill-price">{isAr ? "٥" : "5"} <span className="sv-pill-kd">{isAr ? "د.ك" : "KD"}</span></span>
          </Link>
          <Link href="/contact?service=suv-wash" className="sv-pill">
            <svg className="sv-pill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 17h18M5 17v-5l2-5h10l2 5v5M7 7h10" />
              <circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" />
              <path d="M7 7V5M17 7V5" opacity="0.5" />
            </svg>
            <div className="sv-pill-info">
              <span className="sv-pill-type">{lang === "ar" ? "دفع رباعي" : "SUV"}</span>
              <span className="sv-pill-service">{lang === "ar" ? "داخلي + خارجي" : "Interior + Exterior"}</span>
            </div>
            <span className="sv-pill-price">{isAr ? "٧" : "7"} <span className="sv-pill-kd">{isAr ? "د.ك" : "KD"}</span></span>
          </Link>
        </div>
      </div>

      <div className="sv-grid">
        {SERVICES.map((svc, i) => {
          const data = svc[lang];
          return (
            <div className="sv-card" key={svc.key}>
              <div className="sv-card-img">
                <img src={svc.image} alt={data.title} />
              </div>
              <div className="sv-card-content">
                <div className="sv-card-badge">{data.badge}</div>
                <h2 className="sv-card-title">{data.title}</h2>
                <Link
                  href={`/contact?service=${encodeURIComponent(svc.key)}`}
                  className="sv-card-cta"
                >
                  {t("enquire")}
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <style jsx global>{`
        .svc-page {
          min-height: 100vh;
          background: #0a0a0f;
          color: #f0ece2;
          font-family: var(--font-body, 'DM Sans', sans-serif);
        }
        .svc-rtl { direction: rtl; font-family: var(--font-arabic, 'Tajawal', sans-serif); }

        .sv-header {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 32px;
          background: rgba(10,10,15,0.85); backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(168,176,184,0.1);
        }
        .sv-back {
          display: flex; align-items: center; gap: 8px;
          color: rgba(255,255,255,0.85); text-decoration: none; font-size: 14px; transition: color 0.3s;
        }
        .sv-back:hover { color: #a8b0b8; }
        .sv-lang {
          background: rgba(168,176,184,0.1); border: 1px solid rgba(168,176,184,0.25);
          color: #a8b0b8; padding: 6px 16px; border-radius: 50px; font-size: 12px;
          font-weight: 600; cursor: pointer; transition: all 0.3s;
        }
        .sv-lang:hover { background: rgba(168,176,184,0.2); }

        .sv-hero {
          padding: 100px 32px 60px; text-align: center; position: relative; overflow: visible;
        }
        .sv-hero-bg {
          position: absolute;
          top: 0; left: -10%; right: -10%;
          height: 300%;
          background: radial-gradient(ellipse at 50% 20%, rgba(168,176,184,0.08) 0%, transparent 55%);
          pointer-events: none;
        }
        .sv-eyebrow {
          display: inline-flex; align-items: center; gap: 12px;
          font-family: var(--font-label, 'Inter', sans-serif);
          font-size: 16px; font-weight: 500; letter-spacing: 3px; text-transform: uppercase;
          color: #a8b0b8; margin-bottom: 18px;
        }
        .sv-eyebrow-line { width: 32px; height: 1px; background: linear-gradient(90deg, transparent, #a8b0b8, transparent); }
        .sv-hero h1 {
          font-family: var(--font-numeral, 'Bodoni Moda', serif);
          font-size: clamp(40px, 6vw, 64px); font-weight: 600; margin: 0 0 16px;
          color: #f0ece2; letter-spacing: -0.5px;
        }
        .sv-hero p {
          font-size: 16px; color: rgba(255,255,255,0.7); max-width: 560px;
          margin: 0 auto; line-height: 1.65;
        }

        .sv-grid {
          max-width: 1200px; margin: 0 auto; padding: 30px 32px 100px;
          display: grid; grid-template-columns: repeat(6, 1fr); gap: 22px;
          justify-items: center;
        }
        /* First 3 cards span 2 columns each (fills the row of 3) */
        .sv-card:nth-child(1),
        .sv-card:nth-child(2),
        .sv-card:nth-child(3) {
          grid-column: span 2;
        }
        /* Last 2 cards: each spans 2 cols, offset by 1 col to center them */
        .sv-card:nth-child(4) {
          grid-column: 2 / 4;
        }
        .sv-card:nth-child(5) {
          grid-column: 4 / 6;
        }

        .sv-card {
          position: relative;
          background: linear-gradient(180deg, rgba(168,176,184,0.04) 0%, rgba(255,255,255,0.015) 100%);
          border: 1px solid rgba(168,176,184,0.18);
          border-radius: 20px;
          overflow: hidden;
          display: flex; flex-direction: column;
          transition: transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
          box-shadow: 0 0 24px rgba(168,176,184,0.06), 0 12px 32px rgba(0,0,0,0.35);
        }

        /* Pure opacity fade-in — no transforms, no magnify */
        @keyframes svFade { from { opacity: 0; } to { opacity: 1; } }

        .sv-eyebrow, .sv-hero h1, .sv-hero p,
        .sv-pricing-label, .sv-pill, .sv-card {
          animation: svFade 0.9s ease-out both;
        }
        .sv-eyebrow       { animation-delay: 0.1s; }
        .sv-hero h1       { animation-delay: 0.25s; }
        .sv-hero p        { animation-delay: 0.4s; }
        .sv-pricing-label { animation-delay: 0.6s; }
        .sv-pill:nth-of-type(1) { animation-delay: 0.75s; }
        .sv-pill:nth-of-type(2) { animation-delay: 0.9s; }
        .sv-pill:nth-of-type(3) { animation-delay: 1.05s; }
        .sv-card:nth-of-type(1) { animation-delay: 1.25s; }
        .sv-card:nth-of-type(2) { animation-delay: 1.4s; }
        .sv-card:nth-of-type(3) { animation-delay: 1.55s; }
        .sv-card:nth-of-type(4) { animation-delay: 1.7s; }
        .sv-card:nth-of-type(5) { animation-delay: 1.85s; }
        .sv-card:hover {
          transform: translateY(-5px);
          border-color: rgba(168,176,184,0.45);
          box-shadow: 0 0 48px rgba(168,176,184,0.15), 0 20px 48px rgba(0,0,0,0.45);
        }

        .sv-card-img {
          width: 100%;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          background: #0a0a0f;
        }
        .sv-card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .sv-card:hover .sv-card-img img {
          transform: scale(1.05);
        }

        .sv-card-content {
          padding: 22px 24px 24px;
          display: flex; flex-direction: column; gap: 10px;
          align-items: center; text-align: center;
        }

        .sv-card-badge {
          font-family: var(--font-label, 'Inter', sans-serif);
          font-size: 10px; font-weight: 600; letter-spacing: 1.6px; text-transform: uppercase;
          color: #a8b0b8;
          background: rgba(168,176,184,0.08);
          border: 1px solid rgba(168,176,184,0.18);
          border-radius: 50px; padding: 5px 13px;
        }

        .sv-card-title {
          font-family: var(--font-numeral, 'Bodoni Moda', serif);
          font-size: 24px; font-weight: 600; color: #ffffff;
          margin: 0; letter-spacing: 0.3px; line-height: 1.2;
        }

        .sv-card-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 11px 30px;
          border-radius: 50px;
          font-family: var(--font-label, 'Inter', sans-serif);
          font-size: 12px; font-weight: 700; letter-spacing: 1.8px; text-transform: uppercase;
          text-decoration: none;
          background: linear-gradient(135deg, #a8b0b8, #c8ced6);
          color: #0a0a0f;
          border: 2px solid #a8b0b8;
          transition: all 0.3s ease;
          margin-top: 4px;
        }
        .sv-card-cta:hover {
          background: transparent;
          color: #c8ced6;
          box-shadow: 0 8px 24px rgba(168,176,184,0.35);
          transform: translateY(-2px);
        }

        /* ── Home service pricing strip ── */
        .sv-pricing-strip {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 32px 48px;
          text-align: center;
        }

        .sv-pricing-label {
          font-family: var(--font-numeral, 'Bodoni Moda', serif);
          font-size: 28px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 24px;
          letter-spacing: 0.3px;
        }

        .sv-pricing-pills {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          justify-content: center;
          gap: 12px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .sv-pill {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 18px 16px;
          background: linear-gradient(180deg, rgba(168,176,184,0.06) 0%, rgba(255,255,255,0.02) 100%);
          border: 1px solid rgba(168,176,184,0.25);
          border-radius: 60px;
          transition: all 0.35s ease;
          text-decoration: none;
          color: inherit;
          cursor: pointer;
          min-width: 0;
          box-shadow:
            0 0 24px rgba(168,176,184,0.1),
            0 0 48px rgba(168,176,184,0.05),
            0 12px 32px rgba(0,0,0,0.35);
        }

        .sv-pill:hover {
          border-color: rgba(168,176,184,0.5);
          transform: translateY(-2px);
          box-shadow:
            0 0 36px rgba(168,176,184,0.2),
            0 0 64px rgba(168,176,184,0.1),
            0 16px 40px rgba(0,0,0,0.45);
        }

        .sv-pill-icon {
          width: 24px;
          height: 24px;
          flex-shrink: 0;
          color: var(--gold, #a8b0b8);
        }

        .sv-pill-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
          text-align: left;
          min-width: 0;
        }

        .sv-pill-type {
          font-family: var(--font-numeral, 'Bodoni Moda', serif);
          font-size: 15px;
          font-weight: 600;
          color: #ffffff;
          letter-spacing: 0.3px;
          line-height: 1.1;
          white-space: nowrap;
        }

        .sv-pill-service {
          font-family: var(--font-label, 'Inter', sans-serif);
          font-size: 9px;
          font-weight: 400;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .sv-pill-price {
          font-family: var(--font-numeral, 'Bodoni Moda', serif);
          font-size: 26px;
          font-weight: 600;
          color: var(--gold, #a8b0b8);
          line-height: 1;
          letter-spacing: -0.5px;
          flex-shrink: 0;
        }

        .sv-pill-kd {
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.5px;
          opacity: 0.7;
        }

        /* Mobile: shrink pills even more so all 3 fit on one row */
        @media (max-width: 640px) {
          .sv-pricing-pills { gap: 6px; }
          .sv-pill {
            padding: 12px 8px;
            gap: 6px;
            border-radius: 40px;
            flex-direction: column;
            text-align: center;
          }
          .sv-pill-info { text-align: center; align-items: center; }
          .sv-pill-icon { width: 20px; height: 20px; }
          .sv-pill-type { font-size: 12px; }
          .sv-pill-service { font-size: 8px; letter-spacing: 0.8px; }
          .sv-pill-price { font-size: 20px; }
          .sv-pill-kd { font-size: 10px; }
        }

        /* Arabic: match site font for services page CTA + pricing pills */
        body.ar-active .sv-card-cta,
        body.ar-active .sv-pricing-label,
        body.ar-active .sv-pill-type,
        body.ar-active .sv-pill-service,
        body.ar-active .sv-pill-kd {
          font-family: var(--font-arabic, 'Tajawal', sans-serif);
          letter-spacing: 0;
          text-transform: none;
        }
        body.ar-active .sv-card-cta { font-size: 14px; font-weight: 700; }
        body.ar-active .sv-pill-type { font-size: 16px; font-weight: 700; }
        body.ar-active .sv-pill-service { font-size: 11px; font-weight: 500; }
        @media (max-width: 640px) {
          body.ar-active .sv-pill-type { font-size: 13px; }
          body.ar-active .sv-pill-service { font-size: 9px; }
        }

        @media (max-width: 1100px) {
          .sv-grid { grid-template-columns: repeat(2, 1fr); }
          .sv-card:nth-child(1),
          .sv-card:nth-child(2),
          .sv-card:nth-child(3),
          .sv-card:nth-child(4),
          .sv-card:nth-child(5) { grid-column: span 1; }
        }
        @media (max-width: 640px) {
          .sv-header { padding: 12px 20px; }
          .sv-hero { padding: 120px 20px 40px; }
          .sv-grid { padding: 20px 20px 60px; grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
