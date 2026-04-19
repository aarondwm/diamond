"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

type Lang = "en" | "ar";

const OFFERS = [
  {
    icon: "🏍️",
    en: { badge: "Partnership", title: "Kuwait Riders Exclusive", desc: "Special pricing for Kuwait Riders community members on all PPF and ceramic coating services.", price: "From 85 KD", features: ["Full body coverage", "Premium film quality", "5-year warranty"] },
    ar: { badge: "شراكة", title: "حصري لـ Kuwait Riders", desc: "أسعار خاصة لأعضاء مجتمع Kuwait Riders على جميع خدمات PPF والطلاء السيراميكي.", price: "من 85 د.ك", features: ["تغطية كاملة للجسم", "جودة فيلم متميزة", "ضمان 5 سنوات"] },
  },
  {
    icon: "🏍️",
    en: { badge: "Partnership", title: "Harley Chapter Kuwait", desc: "Exclusive motorcycle detailing packages for Harley-Davidson Chapter members.", price: "From 45 KD", features: ["Custom-fit templates", "Free inspection", "Detail wash included"] },
    ar: { badge: "شراكة", title: "Harley Chapter الكويت", desc: "باقات تفصيل دراجات نارية حصرية لأعضاء فصل هارلي ديفيدسون.", price: "من 45 د.ك", features: ["قوالب مخصصة", "فحص مجاني", "غسيل تفصيلي مشمول"] },
  },
  {
    icon: "🚗",
    en: { badge: "Brand Special", title: "Jetour Owners", desc: "Custom PPF packages designed specifically for Jetour vehicle models with full coverage options.", price: "From 120 KD", features: ["Full body coverage", "Custom-fit templates", "Paint correction included"] },
    ar: { badge: "عرض خاص", title: "مالكي Jetour", desc: "باقات PPF مخصصة مصممة خصيصًا لموديلات Jetour مع خيارات تغطية كاملة.", price: "من 120 د.ك", features: ["تغطية كاملة للجسم", "قوالب مخصصة", "تصحيح الطلاء مشمول"] },
  },
  {
    icon: "🔋",
    en: { badge: "Brand Special", title: "Denza & BYD Package", desc: "Tailored protection packages for Denza and BYD electric vehicles. Full body PPF with warranty.", price: "From 150 KD", features: ["Full body coverage", "Ceramic top coat", "5-year warranty"] },
    ar: { badge: "عرض خاص", title: "باقة Denza و BYD", desc: "باقات حماية مخصصة لسيارات Denza و BYD الكهربائية. PPF كامل مع ضمان.", price: "من 150 د.ك", features: ["تغطية كاملة للجسم", "طبقة سيراميك علوية", "ضمان 5 سنوات"] },
  },
  {
    icon: "🏢",
    isKOC: true,
    en: { badge: "Corporate", title: "KOC Employee Offer", desc: "Special corporate rates for Kuwait Oil Company employees. Valid ID required at booking.", price: "20% OFF", features: ["Free inspection", "Premium film quality", "Interior detailing"] },
    ar: { badge: "شركات", title: "عرض موظفي KOC", desc: "أسعار خاصة لموظفي شركة نفط الكويت. يتطلب هوية صالحة عند الحجز.", price: "خصم 20%", features: ["فحص مجاني", "جودة فيلم متميزة", "تفصيل داخلي"] },
  },
  {
    icon: "👨‍👩‍👧‍👦",
    en: { badge: "Family", title: "Family Tinting Deal", desc: "Window tinting for the whole family fleet. Book 2+ vehicles and save on every car.", price: "From 35 KD", features: ["UV protection film", "Heat rejection", "Multi-vehicle discount"] },
    ar: { badge: "عائلي", title: "عرض تظليل العائلة", desc: "تظليل نوافذ لجميع سيارات العائلة. احجز سيارتين أو أكثر ووفر على كل سيارة.", price: "من 35 د.ك", features: ["فيلم حماية UV", "رفض الحرارة", "خصم متعدد السيارات"] },
  },
];

const T = {
  en: { pageTitle: "Special Deals", pageSubtitle: "Exclusive partnerships and limited-time offers for car enthusiasts.", claimOffer: "Claim Offer", backHome: "Back to Home", days: "Days", hours: "Hours", mins: "Mins", secs: "Secs" },
  ar: { pageTitle: "العروض الخاصة", pageSubtitle: "شراكات حصرية وعروض محدودة لعشاق السيارات.", claimOffer: "احصل على العرض", backHome: "العودة للرئيسية", days: "أيام", hours: "ساعات", mins: "دقائق", secs: "ثوانٍ" },
};

export default function DealsPage() {
  const [lang, setLang] = useState<Lang>("en");
  const t = useCallback((k: string) => T[lang][k as keyof (typeof T)["en"]] || k, [lang]);
  const isAr = lang === "ar";

  const [cd, setCd] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const target = new Date(); target.setDate(target.getDate() + 30); target.setHours(23, 59, 59, 0);
    const tick = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) return;
      setCd({ d: Math.floor(diff / 864e5), h: Math.floor((diff / 36e5) % 24), m: Math.floor((diff / 6e4) % 60), s: Math.floor((diff / 1e3) % 60) });
    };
    tick(); const i = setInterval(tick, 1000); return () => clearInterval(i);
  }, []);

  return (
    <div className={`deals-page${isAr ? " deals-rtl" : ""}`}>
      {/* Header provided by layout */}

      <div className="dp-hero">
        <div className="dp-hero-bg" />
        <h1>{t("pageTitle")}</h1>
        <p>{t("pageSubtitle")}</p>
      </div>

      <div className="dp-grid">
        {OFFERS.map((o, i) => {
          const data = o[lang];
          return (
            <div className="dp-card" key={i} style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="dp-card-top">
                <span className="dp-icon">{o.icon}</span>
                <span className="dp-badge">{data.badge}</span>
              </div>
              <h2>{data.title}</h2>
              <p className="dp-desc">{data.desc}</p>
              <div className="dp-price">{data.price}</div>
              {o.isKOC && (
                <div className="dp-countdown">
                  {[
                    { v: cd.d, l: t("days") }, { v: cd.h, l: t("hours") }, { v: cd.m, l: t("mins") }, { v: cd.s, l: t("secs") },
                  ].map((x, j) => (
                    <div className="dp-cd-box" key={j}>
                      <span className="dp-cd-num">{String(x.v).padStart(2, "0")}</span>
                      <span className="dp-cd-label">{x.l}</span>
                    </div>
                  ))}
                </div>
              )}
              <ul className="dp-features">
                {data.features.map((f, j) => <li key={j}><span className="dp-check">✓</span>{f}</li>)}
              </ul>
              <a href="https://wa.me/96595536344" target="_blank" rel="noopener noreferrer" className="dp-cta">{t("claimOffer")}</a>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .deals-page { min-height:100vh; background:#050508; color:#f0ece2; font-family:var(--font-body,'DM Sans',sans-serif); }
        .deals-rtl { direction:rtl; font-family:var(--font-arabic,'Tajawal',sans-serif); }
        .dp-header { position:fixed; top:0; left:0; right:0; z-index:100; display:flex; align-items:center; justify-content:space-between; padding:16px 32px; background:rgba(5,5,8,0.85); backdrop-filter:blur(16px); border-bottom:1px solid rgba(168,176,184,0.08); }
        .dp-back { display:flex; align-items:center; gap:8px; color:rgba(255,255,255,0.85); text-decoration:none; font-size:14px; transition:color 0.3s; }
        .dp-back:hover { color:#a8b0b8; }
        .dp-lang { background:rgba(168,176,184,0.1); border:1px solid rgba(168,176,184,0.2); color:#a8b0b8; padding:6px 16px; border-radius:50px; font-size:12px; font-weight:600; cursor:pointer; }
        .dp-hero { padding:140px 32px 60px; text-align:center; position:relative; }
        .dp-hero-bg { position:absolute; inset:0; background:radial-gradient(ellipse at 50% 80%, rgba(168,176,184,0.06) 0%, transparent 60%); pointer-events:none; }
        .dp-hero h1 { font-family:var(--font-display,'Playfair Display',serif); font-size:clamp(36px,6vw,56px); font-weight:700; margin-bottom:16px; position:relative; }
        .dp-hero p { font-size:16px; color:rgba(255,255,255,0.8); max-width:500px; margin:0 auto; line-height:1.6; position:relative; }
        .dp-grid { max-width:1100px; margin:0 auto; padding:20px 32px 80px; display:grid; grid-template-columns:repeat(auto-fill,minmax(320px,1fr)); gap:20px; }
        .dp-card { background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); border-radius:20px; padding:28px; opacity:0; transform:translateY(16px); animation:dpIn 0.5s ease forwards; transition:border-color 0.3s; }
        .dp-card:hover { border-color:rgba(168,176,184,0.2); }
        @keyframes dpIn { to { opacity:1; transform:translateY(0); } }
        .dp-card-top { display:flex; align-items:center; gap:12px; margin-bottom:16px; }
        .dp-icon { font-size:28px; }
        .dp-badge { font-size:10px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:#a8b0b8; background:rgba(168,176,184,0.08); border:1px solid rgba(168,176,184,0.15); border-radius:50px; padding:4px 14px; }
        .dp-card h2 { font-family:var(--font-display,'Playfair Display',serif); font-size:22px; font-weight:700; margin-bottom:8px; }
        .dp-desc { font-size:13px; color:rgba(255,255,255,0.8); line-height:1.6; margin-bottom:16px; }
        .dp-price { font-family:var(--font-display,'Playfair Display',serif); font-size:28px; font-weight:700; color:#a8b0b8; margin-bottom:16px; }
        .dp-countdown { display:flex; gap:8px; margin-bottom:16px; }
        .dp-cd-box { background:rgba(168,176,184,0.05); border:1px solid rgba(168,176,184,0.12); border-radius:10px; padding:8px 12px; text-align:center; min-width:52px; }
        .dp-cd-num { display:block; font-family:var(--font-display); font-size:20px; color:#a8b0b8; }
        .dp-cd-label { font-size:8px; letter-spacing:1px; color:rgba(255,255,255,0.7); text-transform:uppercase; }
        .dp-features { list-style:none; padding:0; margin:0 0 20px; display:flex; flex-direction:column; gap:8px; }
        .dp-features li { display:flex; align-items:center; gap:8px; font-size:13px; color:rgba(255,255,255,0.85); }
        .dp-check { color:#a8b0b8; font-size:13px; }
        .dp-cta { display:block; text-align:center; padding:12px 24px; border-radius:50px; font-size:13px; font-weight:600; text-decoration:none; background:linear-gradient(135deg,#a8b0b8,#c8ced6); color:#0a0a0f; transition:all 0.3s; }
        .dp-cta:hover { box-shadow:0 0 24px rgba(168,176,184,0.3); transform:translateY(-1px); }
        @media(max-width:640px) { .dp-header{padding:12px 20px} .dp-hero{padding:110px 20px 40px} .dp-grid{padding:10px 20px 60px; grid-template-columns:1fr} }
      `}</style>
    </div>
  );
}
