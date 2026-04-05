"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

type Lang = "en" | "ar";

const PACKAGES = [
  {
    key: "essential",
    en: { name: "Essential", tagline: "Perfect for regular maintenance", price: "45 KD", features: ["Exterior hand wash & dry", "Interior vacuum & wipe", "Tire dressing", "Dashboard cleaning", "Air freshener"] },
    ar: { name: "الأساسية", tagline: "مثالية للصيانة الدورية", price: "45 د.ك", features: ["غسيل خارجي يدوي وتجفيف", "تنظيف وتلميع داخلي", "تلميع الإطارات", "تنظيف لوحة القيادة", "معطر هواء"] },
  },
  {
    key: "silver",
    en: { name: "Silver", tagline: "Enhanced care & protection", price: "85 KD", features: ["Everything in Essential", "Clay bar treatment", "One-step polish", "Interior leather conditioning", "Engine bay rinse", "Spray sealant application"] },
    ar: { name: "الفضية", tagline: "عناية وحماية معززة", price: "85 د.ك", features: ["كل ما في الأساسية", "معالجة بالصلصال", "تلميع بخطوة واحدة", "تكييف الجلد الداخلي", "شطف حجرة المحرك", "تطبيق مانع التسرب بالرش"] },
  },
  {
    key: "gold",
    badge: { en: "Popular", ar: "الأكثر شعبية" },
    featured: true,
    en: { name: "Gold", tagline: "Premium detail & correction", price: "150 KD", features: ["Everything in Silver", "Two-step paint correction", "Ceramic spray coating (6 months)", "Leather deep clean & condition", "Headlight restoration", "Wheel ceramic coating", "Steam sanitization"] },
    ar: { name: "الذهبية", tagline: "تفصيل وتصحيح متميز", price: "150 د.ك", features: ["كل ما في الفضية", "تصحيح الطلاء بخطوتين", "طلاء سيراميك بالرش (6 أشهر)", "تنظيف عميق وتكييف الجلد", "ترميم المصابيح", "طلاء سيراميك للعجلات", "تعقيم بالبخار"] },
  },
  {
    key: "diamond",
    badge: { en: "Best Value", ar: "أفضل قيمة" },
    featured: true,
    en: { name: "Diamond", tagline: "The ultimate detailing experience", price: "280 KD", features: ["Everything in Gold", "Multi-stage paint correction", "Professional ceramic coating (2 years)", "Full interior restoration", "Underbody coating", "Engine bay detailing", "Complimentary maintenance wash", "Priority booking for 1 year"] },
    ar: { name: "الماسية", tagline: "تجربة التفصيل المطلقة", price: "280 د.ك", features: ["كل ما في الذهبية", "تصحيح الطلاء متعدد المراحل", "طلاء سيراميك احترافي (سنتين)", "ترميم داخلي كامل", "طلاء الأسفل", "تفصيل حجرة المحرك", "غسيل صيانة مجاني", "أولوية الحجز لمدة سنة"] },
  },
];

const VIP = {
  en: {
    badge: "VIP Detail Experience",
    title: "The Diamond VIP Experience",
    desc: "Our most exclusive service. A full multi-day transformation including paint correction, PPF installation, ceramic coating, and complete interior overhaul. By appointment only.",
    features: ["Full Paint Correction", "Full Body PPF", "Ceramic Coating", "Interior Overhaul", "3-Day Process", "Pickup & Delivery"],
    price: "From 800 KD",
    cta: "Inquire About VIP",
  },
  ar: {
    badge: "تجربة VIP التفصيلية",
    title: "تجربة Diamond VIP",
    desc: "خدمتنا الأكثر حصرية. تحول كامل متعدد الأيام يشمل تصحيح الطلاء وتركيب PPF والطلاء السيراميكي وإعادة تأهيل داخلية كاملة. بالموعد فقط.",
    features: ["تصحيح الطلاء الكامل", "PPF كامل الجسم", "طلاء سيراميك", "إعادة تأهيل الداخلية", "عملية 3 أيام", "استلام وتوصيل"],
    price: "من 800 د.ك",
    cta: "استفسر عن VIP",
  },
};

const T = {
  en: { pageTitle: "Our Packages", pageSubtitle: "Select the perfect detailing package for your vehicle.", bookNow: "Book Now", backHome: "Back to Home" },
  ar: { pageTitle: "باقاتنا", pageSubtitle: "اختر باقة التفصيل المثالية لسيارتك.", bookNow: "احجز الآن", backHome: "العودة للرئيسية" },
};

export default function PackagesPage() {
  const [lang, setLang] = useState<Lang>("en");
  const t = useCallback((key: string) => T[lang][key as keyof (typeof T)["en"]] || key, [lang]);
  const isAr = lang === "ar";
  const vip = VIP[lang];

  return (
    <div className={`pkg-page${isAr ? " pkg-rtl" : ""}`}>
      <header className="pp-header">
        <Link href="/" className="pp-back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points={isAr ? "9 18 15 12 9 6" : "15 18 9 12 15 6"} />
          </svg>
          {t("backHome")}
        </Link>
        <button className="pp-lang" onClick={() => setLang(isAr ? "en" : "ar")}>
          {isAr ? "English" : "العربية"}
        </button>
      </header>

      <div className="pp-hero">
        <div className="pp-hero-bg" />
        <h1>{t("pageTitle")}</h1>
        <p>{t("pageSubtitle")}</p>
      </div>

      <div className="pp-grid">
        {PACKAGES.map((pkg, i) => {
          const data = pkg[lang];
          const badge = pkg.badge?.[lang];
          return (
            <div className={`pp-card${pkg.featured ? " pp-featured" : ""}`} key={pkg.key} style={{ animationDelay: `${i * 0.1}s` }}>
              {badge && <div className="pp-badge">{badge}</div>}
              <h2 className="pp-name">{data.name}</h2>
              <p className="pp-tagline">{data.tagline}</p>
              <div className="pp-price">{data.price}</div>
              <ul className="pp-features">
                {data.features.map((f, j) => (
                  <li key={j}><span className="pp-check">✓</span>{f}</li>
                ))}
              </ul>
              <a
                href={`https://wa.me/96595536344?text=Hi Diamond PKW, I'm interested in the ${pkg.en.name} package.`}
                target="_blank"
                rel="noopener noreferrer"
                className={`pp-cta${pkg.featured ? " pp-cta-primary" : ""}`}
              >
                {t("bookNow")}
              </a>
            </div>
          );
        })}
      </div>

      {/* VIP */}
      <div className="pp-vip">
        <div className="pp-vip-inner">
          <div className="pp-vip-badge">💎 {vip.badge}</div>
          <h2 className="pp-vip-title">{vip.title}</h2>
          <p className="pp-vip-desc">{vip.desc}</p>
          <div className="pp-vip-features">
            {vip.features.map((f, i) => (
              <span key={i} className="pp-vip-feat"><span className="pp-check">✓</span>{f}</span>
            ))}
          </div>
          <div className="pp-vip-price">{vip.price}</div>
          <a
            href="https://wa.me/96595536344?text=Hi Diamond PKW, I'd like to inquire about the VIP experience."
            target="_blank"
            rel="noopener noreferrer"
            className="pp-cta pp-cta-primary"
          >
            {vip.cta}
          </a>
        </div>
      </div>

      <style jsx>{`
        .pkg-page {
          min-height: 100vh;
          background: #050508;
          color: #f0ece2;
          font-family: var(--font-body, 'DM Sans', sans-serif);
        }
        .pkg-rtl { direction: rtl; font-family: var(--font-arabic, 'Tajawal', sans-serif); }

        .pp-header {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 32px;
          background: rgba(5,5,8,0.85); backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(201,168,76,0.08);
        }
        .pp-back {
          display: flex; align-items: center; gap: 8px;
          color: rgba(255,255,255,0.85); text-decoration: none; font-size: 14px; transition: color 0.3s;
        }
        .pp-back:hover { color: #c9a84c; }
        .pp-lang {
          background: rgba(201,168,76,0.1); border: 1px solid rgba(201,168,76,0.2);
          color: #c9a84c; padding: 6px 16px; border-radius: 50px; font-size: 12px;
          font-weight: 600; cursor: pointer; transition: all 0.3s;
        }
        .pp-lang:hover { background: rgba(201,168,76,0.2); }

        .pp-hero {
          padding: 140px 32px 60px; text-align: center; position: relative; overflow: hidden;
        }
        .pp-hero-bg {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 50% 80%, rgba(201,168,76,0.06) 0%, transparent 60%);
          pointer-events: none;
        }
        .pp-hero h1 {
          font-family: var(--font-display, 'Playfair Display', serif);
          font-size: clamp(36px, 6vw, 56px); font-weight: 700; margin-bottom: 16px; position: relative;
        }
        .pp-hero p {
          font-size: 16px; color: rgba(255,255,255,0.8); max-width: 500px; margin: 0 auto; line-height: 1.6; position: relative;
        }

        .pp-grid {
          max-width: 1100px; margin: 0 auto; padding: 20px 32px 60px;
          display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px;
        }

        .pp-card {
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px; padding: 32px 24px; display: flex; flex-direction: column;
          position: relative; opacity: 0; transform: translateY(20px);
          animation: ppReveal 0.6s ease forwards; transition: border-color 0.3s, transform 0.3s;
        }
        .pp-card:hover { border-color: rgba(201,168,76,0.15); transform: translateY(-2px); }
        .pp-featured {
          border-color: rgba(201,168,76,0.25) !important;
          background: linear-gradient(180deg, rgba(201,168,76,0.06) 0%, rgba(255,255,255,0.02) 100%) !important;
        }
        @keyframes ppReveal { to { opacity: 1; transform: translateY(0); } }

        .pp-badge {
          position: absolute; top: -11px; left: 50%; transform: translateX(-50%);
          background: linear-gradient(135deg, #c9a84c, #e8d48b); color: #0a0a0f;
          font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;
          padding: 5px 16px; border-radius: 50px; white-space: nowrap;
        }
        .pp-name {
          font-family: var(--font-display, 'Playfair Display', serif);
          font-size: 26px; font-weight: 700; margin-bottom: 4px; text-align: center;
          margin-top: 4px;
        }
        .pp-tagline { font-size: 13px; color: rgba(255,255,255,0.8); text-align: center; margin-bottom: 20px; }
        .pp-price {
          font-family: var(--font-display, 'Playfair Display', serif);
          font-size: 40px; font-weight: 700; color: #c9a84c; text-align: center; margin-bottom: 24px;
        }
        .pp-features {
          list-style: none; padding: 0; flex: 1; display: flex; flex-direction: column; gap: 10px;
          border-top: 1px solid rgba(255,255,255,0.06); padding-top: 20px; margin-bottom: 24px;
        }
        .pp-features li {
          display: flex; align-items: center; gap: 10px; font-size: 13px; color: rgba(255,255,255,0.85);
        }
        .pp-check { color: #c9a84c; font-size: 14px; flex-shrink: 0; }

        .pp-cta {
          display: block; text-align: center; padding: 12px 24px; border-radius: 50px;
          font-size: 13px; font-weight: 600; text-decoration: none; transition: all 0.3s;
          color: #c9a84c; border: 1px solid rgba(201,168,76,0.25); background: transparent;
        }
        .pp-cta:hover { background: rgba(201,168,76,0.1); border-color: rgba(201,168,76,0.5); }
        .pp-cta-primary {
          background: linear-gradient(135deg, #c9a84c, #e8d48b) !important;
          color: #0a0a0f !important; border: none !important;
        }
        .pp-cta-primary:hover { box-shadow: 0 0 24px rgba(201,168,76,0.3); transform: translateY(-1px); }

        /* VIP */
        .pp-vip {
          max-width: 800px; margin: 0 auto 80px; padding: 0 32px;
        }
        .pp-vip-inner {
          border-radius: 24px; padding: 48px 40px; text-align: center;
          border: 1px solid rgba(201,168,76,0.2);
          background: linear-gradient(135deg, rgba(201,168,76,0.04), rgba(5,5,8,0.9));
          position: relative; overflow: hidden;
        }
        .pp-vip-inner::before {
          content: ''; position: absolute; inset: 0; border-radius: 24px;
          background: radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.08), transparent 60%);
          pointer-events: none;
        }
        .pp-vip-badge {
          display: inline-block; font-size: 11px; font-weight: 600; letter-spacing: 2px;
          text-transform: uppercase; color: #c9a84c; margin-bottom: 16px; position: relative;
        }
        .pp-vip-title {
          font-family: var(--font-display, 'Playfair Display', serif);
          font-size: clamp(28px, 4vw, 40px); font-weight: 700; margin-bottom: 12px; position: relative;
        }
        .pp-vip-desc { font-size: 14px; color: rgba(255,255,255,0.8); max-width: 550px; margin: 0 auto 24px; line-height: 1.7; position: relative; }
        .pp-vip-features {
          display: flex; justify-content: center; flex-wrap: wrap; gap: 12px; margin-bottom: 24px; position: relative;
        }
        .pp-vip-feat {
          display: flex; align-items: center; gap: 6px; font-size: 13px; color: rgba(255,255,255,0.85);
          background: rgba(201,168,76,0.06); border: 1px solid rgba(201,168,76,0.12);
          border-radius: 50px; padding: 8px 18px;
        }
        .pp-vip-price {
          font-family: var(--font-display, 'Playfair Display', serif);
          font-size: 48px; font-weight: 700; color: #c9a84c; margin-bottom: 24px; position: relative;
        }
        .pp-vip .pp-cta { display: inline-block; padding: 14px 40px; font-size: 14px; }

        @media (max-width: 640px) {
          .pp-header { padding: 12px 20px; }
          .pp-hero { padding: 110px 20px 40px; }
          .pp-grid { padding: 10px 20px 40px; grid-template-columns: 1fr; }
          .pp-vip { padding: 0 20px; }
          .pp-vip-inner { padding: 32px 20px; }
          .pp-vip-price { font-size: 36px; }
        }
      `}</style>
    </div>
  );
}
