"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

type Lang = "en" | "ar";

const SERVICES = [
  {
    icon: "🛡️",
    en: {
      title: "Paint Protection Film (PPF)",
      desc: "Ultimate invisible armor for your vehicle's paint",
      details: [
        "Self-healing film technology",
        "Full or partial body coverage",
        "10-year manufacturer warranty",
        "Invisible protection against chips & scratches",
      ],
      price: "250 KD",
    },
    ar: {
      title: "فيلم حماية الطلاء (PPF)",
      desc: "درع غير مرئي لطلاء سيارتك",
      details: [
        "تقنية فيلم ذاتي الشفاء",
        "تغطية كاملة أو جزئية للجسم",
        "ضمان الشركة المصنعة 10 سنوات",
        "حماية غير مرئية ضد الرقائق والخدوش",
      ],
      price: "250 د.ك",
    },
  },
  {
    icon: "💎",
    en: {
      title: "Ceramic Coating",
      desc: "Long-lasting shine & hydrophobic protection",
      details: [
        "9H hardness ceramic layer",
        "Hydrophobic water-repelling surface",
        "UV & chemical resistance",
        "2-5 year protection duration",
      ],
      price: "120 KD",
    },
    ar: {
      title: "الطلاء السيراميكي",
      desc: "لمعان طويل الأمد وحماية مقاومة للماء",
      details: [
        "طبقة سيراميك بصلابة 9H",
        "سطح طارد للماء",
        "مقاومة الأشعة فوق البنفسجية والمواد الكيميائية",
        "مدة حماية 2-5 سنوات",
      ],
      price: "120 د.ك",
    },
  },
  {
    icon: "🪟",
    en: {
      title: "Window Tinting",
      desc: "Heat rejection & privacy",
      details: [
        "Premium nano-ceramic films",
        "Up to 99% UV rejection",
        "Heat reduction up to 60%",
        "Legal compliance guaranteed",
      ],
      price: "35 KD",
    },
    ar: {
      title: "تظليل النوافذ",
      desc: "عزل حراري وخصوصية",
      details: [
        "أفلام نانو سيراميك متميزة",
        "رفض يصل إلى 99% من الأشعة فوق البنفسجية",
        "تقليل الحرارة حتى 60%",
        "ضمان الامتثال القانوني",
      ],
      price: "35 د.ك",
    },
  },
  {
    icon: "🧹",
    en: {
      title: "Interior Detailing",
      desc: "Deep cleaning & restoration",
      details: [
        "Leather conditioning & protection",
        "Steam cleaning & sanitization",
        "Odor elimination treatment",
        "Dashboard & trim restoration",
      ],
      price: "25 KD",
    },
    ar: {
      title: "التفصيل الداخلي",
      desc: "تنظيف عميق وترميم",
      details: [
        "تكييف وحماية الجلد",
        "تنظيف بالبخار والتعقيم",
        "علاج إزالة الروائح",
        "ترميم لوحة القيادة والتشطيبات",
      ],
      price: "25 د.ك",
    },
  },
  {
    icon: "✨",
    en: {
      title: "Exterior Polish",
      desc: "Paint correction & mirror finish",
      details: [
        "Multi-stage paint correction",
        "Swirl mark & scratch removal",
        "High-gloss mirror finish",
        "Machine polish with premium compounds",
      ],
      price: "40 KD",
    },
    ar: {
      title: "التلميع الخارجي",
      desc: "تصحيح الطلاء ولمسة نهائية لامعة",
      details: [
        "تصحيح الطلاء متعدد المراحل",
        "إزالة علامات الدوامة والخدوش",
        "لمسة نهائية لامعة عالية",
        "تلميع آلي بمركبات متميزة",
      ],
      price: "40 د.ك",
    },
  },
  {
    icon: "🔧",
    en: {
      title: "Wheel & Caliper Coating",
      desc: "Protection & aesthetics for wheels",
      details: [
        "Ceramic wheel coating",
        "Brake caliper painting",
        "Brake dust protection",
        "Custom color options",
      ],
      price: "60 KD",
    },
    ar: {
      title: "طلاء العجلات والمكابح",
      desc: "حماية وجمالية للعجلات",
      details: [
        "طلاء سيراميك للعجلات",
        "طلاء مكابح الفرامل",
        "حماية من غبار المكابح",
        "خيارات ألوان مخصصة",
      ],
      price: "60 د.ك",
    },
  },
  {
    icon: "💡",
    en: {
      title: "Headlight Restoration",
      desc: "Clarity & improved visibility",
      details: [
        "Oxidation removal",
        "UV protective coating",
        "Improved night visibility",
        "PPF protection option",
      ],
      price: "15 KD",
    },
    ar: {
      title: "ترميم المصابيح",
      desc: "وضوح ورؤية محسنة",
      details: [
        "إزالة الأكسدة",
        "طلاء واقي من الأشعة فوق البنفسجية",
        "تحسين الرؤية الليلية",
        "خيار حماية PPF",
      ],
      price: "15 د.ك",
    },
  },
  {
    icon: "🔩",
    en: {
      title: "Underbody Coating",
      desc: "Rust & corrosion prevention",
      details: [
        "Anti-rust rubberized coating",
        "Sound deadening properties",
        "Sand & gravel protection",
        "Chassis preservation",
      ],
      price: "45 KD",
    },
    ar: {
      title: "طلاء الأسفل",
      desc: "حماية من الصدأ والتآكل",
      details: [
        "طلاء مطاطي مضاد للصدأ",
        "خصائص عزل الصوت",
        "حماية من الرمل والحصى",
        "حفظ الهيكل",
      ],
      price: "45 د.ك",
    },
  },
];

const WASH_DATA = {
  en: {
    title: "Wash & Quick Services",
    cols: ["Service", "Sedan", "SUV", "Truck"],
    rows: [
      ["Exterior Wash", "3 KD", "4 KD", "5 KD"],
      ["Interior Clean", "5 KD", "6 KD", "7 KD"],
      ["Full Detail Wash", "8 KD", "10 KD", "12 KD"],
      ["Engine Bay Clean", "5 KD", "6 KD", "7 KD"],
      ["Quick Wax & Shine", "4 KD", "5 KD", "6 KD"],
    ],
  },
  ar: {
    title: "خدمات الغسيل السريعة",
    cols: ["الخدمة", "سيدان", "دفع رباعي", "شاحنة"],
    rows: [
      ["غسيل خارجي", "3 د.ك", "4 د.ك", "5 د.ك"],
      ["تنظيف داخلي", "5 د.ك", "6 د.ك", "7 د.ك"],
      ["غسيل تفصيلي كامل", "8 د.ك", "10 د.ك", "12 د.ك"],
      ["تنظيف حجرة المحرك", "5 د.ك", "6 د.ك", "7 د.ك"],
      ["تلميع سريع بالشمع", "4 د.ك", "5 د.ك", "6 د.ك"],
    ],
  },
};

const T = {
  en: {
    pageTitle: "Our Services",
    pageSubtitle: "Premium detailing & protection services tailored for Kuwait's roads and climate.",
    startingFrom: "Starting from",
    bookService: "Book This Service",
    homeTitle: "Home Service Available",
    homeDesc: "Can't come to us? We'll come to you! Our mobile detailing unit brings the full Diamond PKW experience to your doorstep.",
    homeCta: "Book Home Service",
    backHome: "Back to Home",
  },
  ar: {
    pageTitle: "خدماتنا",
    pageSubtitle: "خدمات تلميع وحماية متميزة مصممة لطرق ومناخ الكويت.",
    startingFrom: "يبدأ من",
    bookService: "احجز هذه الخدمة",
    homeTitle: "خدمة منزلية متوفرة",
    homeDesc: "لا تستطيع المجيء إلينا؟ سنأتي إليك! وحدة التلميع المتنقلة تجلب تجربة Diamond PKW الكاملة إلى باب منزلك.",
    homeCta: "احجز خدمة منزلية",
    backHome: "العودة للرئيسية",
  },
};

export default function ServicesPage() {
  const [lang, setLang] = useState<Lang>("en");
  const t = useCallback((key: string) => T[lang][key as keyof (typeof T)["en"]] || key, [lang]);
  const isAr = lang === "ar";
  const wash = WASH_DATA[lang];

  return (
    <div className={`services-page ${isAr ? "services-rtl" : ""}`}>
      {/* Minimal top bar */}
      <header className="sp-header">
        <Link href="/" className="sp-back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points={isAr ? "9 18 15 12 9 6" : "15 18 9 12 15 6"} />
          </svg>
          {t("backHome")}
        </Link>
        <button className="sp-lang" onClick={() => setLang(isAr ? "en" : "ar")}>
          {isAr ? "English" : "العربية"}
        </button>
      </header>

      {/* Page hero */}
      <div className="sp-hero">
        <div className="sp-hero-bg" />
        <h1 className="sp-hero-title">{t("pageTitle")}</h1>
        <p className="sp-hero-sub">{t("pageSubtitle")}</p>
      </div>

      {/* Services list */}
      <div className="sp-list">
        {SERVICES.map((svc, i) => {
          const data = svc[lang];
          return (
            <div
              className="sp-row"
              key={i}
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div className="sp-row-left">
                <div className="sp-row-icon">{svc.icon}</div>
                <div className="sp-row-info">
                  <h2 className="sp-row-title">{data.title}</h2>
                  <p className="sp-row-desc">{data.desc}</p>
                  <ul className="sp-row-details">
                    {data.details.map((d, j) => (
                      <li key={j}>
                        <span className="sp-bullet" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="sp-row-right">
                <div className="sp-row-price-label">{t("startingFrom")}</div>
                <div className="sp-row-price">{data.price}</div>
                <a
                  href={`https://wa.me/96595536344?text=Hi Diamond PKW, I'm interested in ${svc.en.title}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sp-row-cta"
                >
                  {t("bookService")}
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Wash pricing table */}
      <div className="sp-wash">
        <h2 className="sp-wash-title">{wash.title}</h2>
        <div className="sp-wash-table-wrap">
          <table className="sp-wash-table">
            <thead>
              <tr>
                {wash.cols.map((c, i) => (
                  <th key={i}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {wash.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className={j === 0 ? "sp-wash-name" : "sp-wash-price"}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Home service banner */}
      <div className="sp-home-banner">
        <div>
          <h3>🏠 {t("homeTitle")}</h3>
          <p>{t("homeDesc")}</p>
        </div>
        <a
          href="https://wa.me/96595536344?text=Hi Diamond PKW, I'd like to book a home service."
          target="_blank"
          rel="noopener noreferrer"
          className="sp-home-cta"
        >
          {t("homeCta")}
        </a>
      </div>

      <style jsx>{`
        .services-page {
          min-height: 100vh;
          background: #050508;
          color: #f0ece2;
          font-family: var(--font-body, 'DM Sans', sans-serif);
        }
        .services-rtl {
          direction: rtl;
          font-family: var(--font-arabic, 'Tajawal', sans-serif);
        }

        /* Header */
        .sp-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 32px;
          background: rgba(5,5,8,0.85);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(201,168,76,0.08);
        }
        .sp-back {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          font-size: 14px;
          letter-spacing: 0.5px;
          transition: color 0.3s;
        }
        .sp-back:hover { color: #c9a84c; }
        .sp-lang {
          background: rgba(201,168,76,0.1);
          border: 1px solid rgba(201,168,76,0.2);
          color: #c9a84c;
          padding: 6px 16px;
          border-radius: 50px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }
        .sp-lang:hover {
          background: rgba(201,168,76,0.2);
        }

        /* Page hero */
        .sp-hero {
          padding: 140px 32px 60px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .sp-hero-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 80%, rgba(201,168,76,0.06) 0%, transparent 60%);
          pointer-events: none;
        }
        .sp-hero-title {
          font-family: var(--font-display, 'Playfair Display', serif);
          font-size: clamp(36px, 6vw, 56px);
          font-weight: 700;
          letter-spacing: -0.5px;
          margin-bottom: 16px;
          position: relative;
        }
        .sp-hero-sub {
          font-size: 16px;
          color: rgba(255,255,255,0.8);
          max-width: 500px;
          margin: 0 auto;
          line-height: 1.6;
          position: relative;
        }

        /* Services list */
        .sp-list {
          max-width: 900px;
          margin: 0 auto;
          padding: 20px 32px 60px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .sp-row {
          display: flex;
          align-items: stretch;
          justify-content: space-between;
          gap: 32px;
          padding: 32px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          opacity: 0;
          transform: translateY(16px);
          animation: spReveal 0.6s ease forwards;
        }
        @keyframes spReveal {
          to { opacity: 1; transform: translateY(0); }
        }

        .sp-row-left {
          display: flex;
          gap: 20px;
          flex: 1;
          min-width: 0;
        }
        .sp-row-icon {
          flex-shrink: 0;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          background: rgba(201,168,76,0.08);
          border-radius: 12px;
          border: 1px solid rgba(201,168,76,0.1);
        }
        .sp-row-info {
          min-width: 0;
        }
        .sp-row-title {
          font-family: var(--font-display, 'Playfair Display', serif);
          font-size: 20px;
          font-weight: 600;
          color: #fff;
          margin-bottom: 4px;
        }
        .sp-row-desc {
          font-size: 13px;
          color: rgba(255,255,255,0.8);
          margin-bottom: 12px;
        }
        .sp-row-details {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .sp-row-details li {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: rgba(255,255,255,0.8);
        }
        .sp-bullet {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #c9a84c;
          opacity: 0.5;
          flex-shrink: 0;
        }

        .sp-row-right {
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: center;
          text-align: right;
          min-width: 140px;
        }
        .services-rtl .sp-row-right {
          align-items: flex-start;
          text-align: left;
        }
        .sp-row-price-label {
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.7);
          margin-bottom: 4px;
        }
        .sp-row-price {
          font-family: var(--font-display, 'Playfair Display', serif);
          font-size: 28px;
          font-weight: 700;
          color: #c9a84c;
          margin-bottom: 12px;
          letter-spacing: -0.5px;
        }
        .sp-row-cta {
          display: inline-block;
          padding: 8px 20px;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.5px;
          color: #c9a84c;
          border: 1px solid rgba(201,168,76,0.25);
          border-radius: 50px;
          text-decoration: none;
          transition: all 0.3s;
          white-space: nowrap;
        }
        .sp-row-cta:hover {
          background: rgba(201,168,76,0.1);
          border-color: rgba(201,168,76,0.5);
        }

        /* Wash table */
        .sp-wash {
          max-width: 700px;
          margin: 0 auto 60px;
          padding: 0 32px;
        }
        .sp-wash-title {
          font-family: var(--font-display, 'Playfair Display', serif);
          font-size: 24px;
          font-weight: 600;
          text-align: center;
          margin-bottom: 24px;
          color: #fff;
        }
        .sp-wash-table-wrap {
          overflow-x: auto;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.02);
        }
        .sp-wash-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 400px;
        }
        .sp-wash-table th {
          padding: 14px 20px;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #c9a84c;
          font-weight: 500;
          text-align: center;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .sp-wash-table th:first-child {
          text-align: left;
        }
        .services-rtl .sp-wash-table th:first-child {
          text-align: right;
        }
        .sp-wash-table td {
          padding: 14px 20px;
          font-size: 14px;
          text-align: center;
          border-bottom: 1px solid rgba(255,255,255,0.03);
        }
        .sp-wash-name {
          text-align: left !important;
          color: rgba(255,255,255,0.7);
          font-weight: 500;
        }
        .services-rtl .sp-wash-name {
          text-align: right !important;
        }
        .sp-wash-price {
          color: #c9a84c;
          font-weight: 400;
        }

        /* Home banner */
        .sp-home-banner {
          max-width: 700px;
          margin: 0 auto 80px;
          padding: 32px;
          border-radius: 20px;
          border: 1px solid rgba(201,168,76,0.12);
          background: linear-gradient(135deg, rgba(201,168,76,0.04), rgba(255,255,255,0.02));
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
          margin-left: 32px;
          margin-right: 32px;
          max-width: calc(700px);
        }
        @media (min-width: 764px) {
          .sp-home-banner {
            margin-left: auto;
            margin-right: auto;
          }
        }
        .sp-home-banner h3 {
          font-size: 18px;
          font-weight: 600;
          color: #fff;
          margin-bottom: 6px;
        }
        .sp-home-banner p {
          font-size: 13px;
          color: rgba(255,255,255,0.8);
          line-height: 1.6;
          max-width: 400px;
        }
        .sp-home-cta {
          display: inline-block;
          padding: 12px 28px;
          font-size: 13px;
          font-weight: 600;
          color: #050508;
          background: linear-gradient(135deg, #c9a84c, #e8d48b);
          border-radius: 50px;
          text-decoration: none;
          white-space: nowrap;
          transition: all 0.3s;
        }
        .sp-home-cta:hover {
          box-shadow: 0 0 24px rgba(201,168,76,0.3);
          transform: translateY(-1px);
        }

        /* Mobile */
        @media (max-width: 640px) {
          .sp-header { padding: 12px 20px; }
          .sp-hero { padding: 110px 20px 40px; }
          .sp-list { padding: 10px 20px 40px; }
          .sp-row {
            flex-direction: column;
            gap: 16px;
            padding: 24px 0;
          }
          .sp-row-right {
            align-items: flex-start;
            text-align: left;
            flex-direction: row;
            gap: 16px;
            flex-wrap: wrap;
            min-width: 0;
          }
          .services-rtl .sp-row-right {
            align-items: flex-start;
            text-align: right;
          }
          .sp-row-price {
            font-size: 24px;
            margin-bottom: 0;
          }
          .sp-row-price-label {
            display: none;
          }
          .sp-wash { padding: 0 20px; }
          .sp-home-banner { margin: 0 20px 60px; }
        }
      `}</style>
    </div>
  );
}
