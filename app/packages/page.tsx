"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

type Lang = "en" | "ar";

/* ───────── Packages ───────── */
type Pkg = {
  key: string;
  tier: "vip" | "silver" | "gold" | "diamond";
  badge?: { en: string; ar: string };
  en: { name: string; tagline: string; price: string; priceUnit?: string; features: string[]; cta: string };
  ar: { name: string; tagline: string; price: string; priceUnit?: string; features: string[]; cta: string };
};

const PACKAGES: Pkg[] = [
  {
    key: "vip-wash",
    tier: "vip",
    en: {
      name: "The VIP Wash",
      tagline: "1 time wash",
      price: "15 KD",
      features: ["Exterior wash", "Interior clean", "AC vents", "Scratch removal", "Wax polish"],
      cta: "Book",
    },
    ar: {
      name: "غسيل VIP",
      tagline: "غسيل لمرة واحدة",
      price: "١٥ د.ك",
      features: ["غسيل خارجي", "تنظيف داخلي", "فتحات التكييف", "إزالة الخدوش", "تلميع بالشمع"],
      cta: "احجز",
    },
  },
  {
    key: "silver",
    tier: "silver",
    en: {
      name: "Silver",
      tagline: "4 washes per month",
      price: "20 KD",
      priceUnit: "/ month",
      features: ["1 free VIP wash", "Priority booking", "WhatsApp support"],
      cta: "Subscribe",
    },
    ar: {
      name: "الفضية",
      tagline: "٤ غسلات شهريًا",
      price: "٢٠ د.ك",
      priceUnit: "/ شهر",
      features: ["غسلة VIP مجانية", "أولوية الحجز", "دعم واتساب"],
      cta: "اشترك",
    },
  },
  {
    key: "gold",
    tier: "gold",
    badge: { en: "Most Popular", ar: "الأكثر شعبية" },
    en: {
      name: "Gold",
      tagline: "8 washes per month",
      price: "30 KD",
      priceUnit: "/ month",
      features: ["1 free VIP wash", "Priority booking", "WhatsApp support", "Best value"],
      cta: "Subscribe",
    },
    ar: {
      name: "الذهبية",
      tagline: "٨ غسلات شهريًا",
      price: "٣٠ د.ك",
      priceUnit: "/ شهر",
      features: ["غسلة VIP مجانية", "أولوية الحجز", "دعم واتساب", "أفضل قيمة"],
      cta: "اشترك",
    },
  },
  {
    key: "diamond",
    tier: "diamond",
    badge: { en: "Elite", ar: "النخبة" },
    en: {
      name: "Diamond",
      tagline: "12 washes per month",
      price: "40 KD",
      priceUnit: "/ month",
      features: ["1 free VIP wash", "Priority booking", "WhatsApp support", "VIP treatment"],
      cta: "Subscribe",
    },
    ar: {
      name: "الماسية",
      tagline: "١٢ غسلة شهريًا",
      price: "٤٠ د.ك",
      priceUnit: "/ شهر",
      features: ["غسلة VIP مجانية", "أولوية الحجز", "دعم واتساب", "معاملة VIP"],
      cta: "اشترك",
    },
  },
];

/* ───────── Offers ───────── */
type Offer = {
  key: string;
  icon: React.ReactNode;
  badge: { en: string; ar: string };
  title: { en: string; ar: string };
  subtitle: { en: string; ar: string };
  body: React.ReactNode;
  features: { en: string[]; ar: string[] };
  cta: { en: string; ar: string };
  hasCountdown?: boolean;
  featured?: boolean;
};

const Icon = {
  bike: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5.5" cy="17.5" r="3.5" /><circle cx="18.5" cy="17.5" r="3.5" />
      <path d="M15 6h3l1.5 5M5.5 17.5L9 8h6l3.5 9.5M9 8L7 6" />
    </svg>
  ),
  harley: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  car: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17h18M5 17v-5l2-5h10l2 5v5M7 7h10" />
      <circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" />
    </svg>
  ),
  ev: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="3" width="12" height="18" rx="2" />
      <path d="M11 8l-2 4h3l-1 4" /><path d="M9 3v0M15 3v0" />
    </svg>
  ),
  oil: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18M5 21V8h14v13M9 21V12h6v9" />
    </svg>
  ),
  sun: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  ),
  student: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
};

const KOC_DEADLINE = new Date(2026, 4, 1, 0, 0, 0).getTime(); // May 1, 2026

const OFFERS: Offer[] = [
  {
    key: "kuwait-riders",
    icon: Icon.bike,
    badge: { en: "Exclusive Member Rates", ar: "أسعار حصرية للأعضاء" },
    title: { en: "Kuwait Riders", ar: "كويت رايدرز" },
    subtitle: { en: "Motorcycle & Car Club", ar: "نادي الدراجات والسيارات" },
    body: null,
    features: {
      en: [
        "Bike Wash — 1.5 KD per wash",
        "Home service available across Kuwait",
      ],
      ar: [
        "🏍️ غسيل دراجة — ١٫٥ د.ك لكل غسلة",
        "🚗 خدمة منزلية للسيارة — ٥ د.ك لكل سيارة",
        "خدمة منزلية متوفرة في جميع أنحاء الكويت",
      ],
    },
    cta: { en: "Enquire on WhatsApp", ar: "استفسر عبر واتساب" },
  },
  {
    key: "student",
    icon: Icon.student,
    badge: { en: "Students Only · 5 KD", ar: "للطلاب فقط · ٥ د.ك" },
    title: { en: "Student Home Wash", ar: "غسيل الطلاب المنزلي" },
    subtitle: { en: "Anywhere in Kuwait", ar: "في أي مكان بالكويت" },
    body: null,
    featured: true,
    features: {
      en: [
        "5 KD full home wash — exterior & interior",
        "Any student · any car · anywhere",
        "Valid student ID required",
      ],
      ar: [
        "غسيل منزلي كامل ب٥ د.ك — داخلي وخارجي",
        "أي طالب · أي سيارة · أي مكان",
        "مطلوب بطاقة طالب سارية",
      ],
    },
    cta: { en: "Claim Student Offer", ar: "احصل على عرض الطلاب" },
  },
  {
    key: "harley",
    icon: Icon.harley,
    badge: { en: "Harley Exclusive", ar: "حصري لهارلي" },
    title: { en: "Kuwait Chapter", ar: "كويت تشابتر" },
    subtitle: { en: "Harley-Davidson Owners", ar: "مالكي هارلي ديفيدسون" },
    body: null,
    features: {
      en: [
        "Pricing tailored to your Harley's size & model",
        "Full detailing, ceramic coating & PPF available",
        "Contact us with your model for an instant quote",
      ],
      ar: [
        "أسعار مخصصة حسب حجم وموديل هارلي الخاصة بك",
        "غسيل كامل، طلاء سيراميك و PPF متوفر",
        "تواصل معنا بموديل دراجتك لعرض سعر فوري",
      ],
    },
    cta: { en: "Get Custom Quote", ar: "احصل على عرض سعرك" },
  },
  {
    key: "jetour",
    icon: Icon.car,
    badge: { en: "Save 150 KD · 23% OFF", ar: "وفّر ١٥٠ د.ك · خصم ٢٣٪" },
    title: { en: "Jetour Club", ar: "نادي الجيتور" },
    subtitle: { en: "Members & Family", ar: "الأعضاء والعائلة" },
    body: null,
    features: {
      en: [
        "Full protection package — was 650 KD, now 500 KD",
        "Complete PPF & nano ceramic coverage",
        "Offer extends to family members",
      ],
      ar: [
        "باقة الحماية الكاملة — كانت ٦٥٠ د.ك، الآن ٥٠٠ د.ك",
        "تغطية كاملة PPF وطلاء نانو سيراميك",
        "العرض يشمل أفراد العائلة",
      ],
    },
    cta: { en: "Claim Jetour Offer", ar: "احصل على عرض جيتور" },
  },
  {
    key: "denza-byd",
    icon: Icon.ev,
    badge: { en: "Save 150 KD · 23% OFF", ar: "وفّر ١٥٠ د.ك · خصم ٢٣٪" },
    title: { en: "Denza & BYD Club", ar: "نادي دينزا و BYD" },
    subtitle: { en: "Members & Family", ar: "الأعضاء والعائلة" },
    body: null,
    features: {
      en: [
        "Full protection package — was 650 KD, now 500 KD",
        "Complete PPF & nano ceramic coverage",
        "Offer extends to family members",
      ],
      ar: [
        "باقة الحماية الكاملة — كانت ٦٥٠ د.ك، الآن ٥٠٠ د.ك",
        "تغطية كاملة PPF وطلاء نانو سيراميك",
        "العرض يشمل أفراد العائلة",
      ],
    },
    cta: { en: "Claim Denza / BYD Offer", ar: "احصل على عرض دينزا / BYD" },
  },
  {
    key: "koc",
    icon: Icon.oil,
    badge: { en: "Corporate Offer", ar: "عرض الشركات" },
    title: { en: "KOC Staff", ar: "موظفي KOC" },
    subtitle: { en: "Kuwait Oil Company Employees", ar: "موظفو شركة نفط الكويت" },
    body: null,
    features: {
      en: [
        "3 cars window tinting — 190 KD · Home tinting",
        "Valid KOC staff ID required",
        "Limited Time Offer",
      ],
      ar: [
        "تظليل نوافذ احترافي لـ ٣ سيارات — ١٩٠ د.ك (٦٣ د.ك لكل سيارة)",
        "سعر حصري لموظفي KOC",
        "مطلوب بطاقة موظف KOC سارية",
      ],
    },
    cta: { en: "Claim KOC Offer", ar: "احصل على عرض KOC" },
    hasCountdown: true,
  },
];

const T = {
  en: {
    pageEyebrow: "Pricing",
    pageTitle: "Choose Your Package",
    pageSubtitle: "Subscriptions, single-visit washes, and exclusive member offers — all in one place.",
    backHome: "Back to Home",
    offersEyebrow: "Exclusive Offers",
    offersTitle: "Members & Partners",
    offersSubtitle: "Limited-time deals and partnerships built around our community.",
    contactCta: "Have a company, club, or university? Contact us for exclusive pricing.",
    contactBtn: "Contact Us",
    days: "DAYS", hours: "HRS", mins: "MIN", secs: "SEC",
    validUntil: "Valid until May 1, 2026",
  },
  ar: {
    pageEyebrow: "الأسعار",
    pageTitle: "اختر باقتك",
    pageSubtitle: "اشتراكات، غسلات لمرة واحدة، وعروض حصرية للأعضاء — كل ذلك في مكان واحد.",
    backHome: "العودة للرئيسية",
    offersEyebrow: "وصول حصري",
    offersTitle: "عروض خاصة",
    offersSubtitle: "خصومات حصرية لمجتمعات وعائلات مختارة. أظهر عضويتك للاستفادة.",
    contactCta: "هل لديك شركة، نادي أو جامعة؟ تواصل معنا للحصول على أسعار حصرية.",
    contactBtn: "تواصل معنا",
    days: "أيام", hours: "ساعات", mins: "دقائق", secs: "ثوانٍ",
    validUntil: "صالح حتى ١ مايو ٢٠٢٦",
  },
};

function KocCountdown({ labels, isAr }: { labels: { d: string; h: string; m: string; s: string }; isAr?: boolean }) {
  // Render zeros initially so SSR + client first render match. Then start
  // ticking on the client only, after mount.
  const [cd, setCd] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, KOC_DEADLINE - Date.now());
      setCd({
        d: Math.floor(diff / 864e5),
        h: Math.floor((diff / 36e5) % 24),
        m: Math.floor((diff / 6e4) % 60),
        s: Math.floor((diff / 1e3) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  const pad = (n: number) => {
    const s = String(n).padStart(2, "0");
    if (!isAr) return s;
    const ar = ["٠","١","٢","٣","٤","٥","٦","٧","٨","٩"];
    return s.split("").map(ch => /[0-9]/.test(ch) ? ar[parseInt(ch, 10)] : ch).join("");
  };
  const cells: Array<[number, string]> = [[cd.d, labels.d], [cd.h, labels.h], [cd.m, labels.m], [cd.s, labels.s]];
  return (
    <div className="pp-cd">
      {cells.map(([v, l]) => (
        <div className="pp-cd-cell" key={l}>
          <span className="pp-cd-num">{pad(v)}</span>
          <span className="pp-cd-lbl">{l}</span>
        </div>
      ))}
    </div>
  );
}

export default function PackagesPage() {
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
    <div className={`pkg-page${isAr ? " pkg-rtl" : ""}`}>
      {/* Header provided by layout */}

      {/* Hero */}
      <div className="pp-hero">
        <div className="pp-hero-bg" />
        <div className="pp-eyebrow">
          <span className="pp-eyebrow-line" />
          {t("pageEyebrow")}
          <span className="pp-eyebrow-line" />
        </div>
        <h1>{t("pageTitle")}</h1>
        <p>{t("pageSubtitle")}</p>
      </div>

      {/* Packages */}
      <div className="pp-grid">
        {PACKAGES.map((pkg) => {
          const data = pkg[lang];
          const badge = pkg.badge?.[lang];
          return (
            <div className={`pp-card pp-tier-${pkg.tier}`} key={pkg.key}>
              {badge && <div className="pp-badge">{badge}</div>}
              <h2 className="pp-name">{data.name}</h2>
              <p className="pp-tagline">{data.tagline}</p>
              <div className="pp-price-row">
                <span className="pp-price">{data.price}</span>
                {data.priceUnit && <span className="pp-price-unit">{data.priceUnit}</span>}
              </div>
              <ul className="pp-features">
                {data.features.map((f, j) => (
                  <li key={j}><span className="pp-check">✓</span>{f}</li>
                ))}
              </ul>
              <Link href={`/contact?service=${encodeURIComponent(pkg.key)}`} className={`pp-cta pp-cta-${pkg.tier}`}>
                {data.cta}
              </Link>
            </div>
          );
        })}
      </div>

      {/* Offers */}
      <section className="pp-offers" id="offers">
        <div className="pp-offers-header">
          <div className="pp-eyebrow">
            <span className="pp-eyebrow-line" />
            {t("offersEyebrow")}
            <span className="pp-eyebrow-line" />
          </div>
          <h2>{t("offersTitle")}</h2>
          <p>{t("offersSubtitle")}</p>
        </div>

        <div className="pp-offers-grid">
          {OFFERS.map((o) => (
            <div className={`pp-off-card${o.featured ? " pp-off-featured" : ""}`} key={o.key}>
              <div className="pp-off-icon">{o.icon}</div>
              <div className="pp-off-badge">{o.badge[lang]}</div>
              <h3>{o.title[lang]}</h3>
              <p className="pp-off-sub">{o.subtitle[lang]}</p>
              <ul className="pp-off-features">
                {o.features[lang].map((f, j) => (
                  <li key={j}><span className="pp-check">✓</span>{f}</li>
                ))}
              </ul>
              {o.hasCountdown && (
                <>
                  <KocCountdown labels={{ d: t("days"), h: t("hours"), m: t("mins"), s: t("secs") }} isAr={isAr} />
                  <div className="pp-valid">{t("validUntil")}</div>
                </>
              )}
              <a
                href={
                  o.key === "student"
                    ? "/student"
                    : o.key === "kuwait-riders" || o.key === "harley"
                      ? "https://wa.me/96595536344"
                      : `/contact?service=${encodeURIComponent(o.key)}`
                }
                target={o.key === "kuwait-riders" || o.key === "harley" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="pp-off-cta"
              >
                {o.cta[lang]}
              </a>
            </div>
          ))}
        </div>

        <div className="pp-contact-line">
          <p>{t("contactCta")}</p>
          <Link href="/contact" className="pp-contact-btn">{t("contactBtn")}</Link>
        </div>
      </section>

      <style jsx global>{`
        .pkg-page {
          min-height: 100vh;
          background:
            linear-gradient(135deg, #0a0a0f 0%, #14181f 100%),
            linear-gradient(45deg, rgba(168,176,184,0.04) 0%, transparent 60%);
          background-blend-mode: screen;
          color: #f0ece2;
          font-family: var(--font-body, 'DM Sans', sans-serif);
        }

        /* Pure opacity fade-in — no transforms */
        @keyframes ppFade { from { opacity: 0; } to { opacity: 1; } }

        .pp-eyebrow, .pp-hero h1, .pp-hero p,
        .pp-card, .pp-offers-header > *, .pp-off-card, .pp-contact-line > * {
          animation: ppFade 0.9s ease-out both;
        }
        .pp-eyebrow { animation-delay: 0.1s; }
        .pp-hero h1 { animation-delay: 0.25s; }
        .pp-hero p  { animation-delay: 0.4s; }
        .pp-card:nth-child(1) { animation-delay: 0.6s; }
        .pp-card:nth-child(2) { animation-delay: 0.75s; }
        .pp-card:nth-child(3) { animation-delay: 0.9s; }
        .pp-card:nth-child(4) { animation-delay: 1.05s; }
        .pp-offers-header > :nth-child(1) { animation-delay: 0.2s; }
        .pp-offers-header > :nth-child(2) { animation-delay: 0.35s; }
        .pp-offers-header > :nth-child(3) { animation-delay: 0.5s; }
        .pp-off-card:nth-child(1) { animation-delay: 0.65s; }
        .pp-off-card:nth-child(2) { animation-delay: 0.8s; }
        .pp-off-card:nth-child(3) { animation-delay: 0.95s; }
        .pp-off-card:nth-child(4) { animation-delay: 1.1s; }
        .pp-off-card:nth-child(5) { animation-delay: 1.25s; }
        .pp-off-card:nth-child(6) { animation-delay: 1.4s; }

        .pkg-rtl { direction: rtl; font-family: var(--font-arabic, 'Tajawal', sans-serif); }

        .pp-header {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 32px;
          background: rgba(10,10,15,0.85); backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(168,176,184,0.1);
        }
        .pp-back {
          display: flex; align-items: center; gap: 8px;
          color: rgba(255,255,255,0.85); text-decoration: none; font-size: 14px; transition: color 0.3s;
        }
        .pp-back:hover { color: #a8b0b8; }
        .pp-lang {
          background: rgba(168,176,184,0.1); border: 1px solid rgba(168,176,184,0.25);
          color: #a8b0b8; padding: 6px 16px; border-radius: 50px; font-size: 12px;
          font-weight: 600; cursor: pointer; transition: all 0.3s;
        }
        .pp-lang:hover { background: rgba(168,176,184,0.2); }

        /* ── Hero ── */
        .pp-hero {
          padding: 100px 32px 60px; text-align: center; position: relative; overflow: hidden;
        }
        .pp-hero-bg {
          position: absolute; inset: 0;
          background: transparent;
          pointer-events: none;
        }
        .pp-eyebrow {
          display: inline-flex; align-items: center; gap: 12px;
          font-family: var(--font-label, 'Inter', sans-serif);
          font-size: 16px; font-weight: 500; letter-spacing: 3px; text-transform: uppercase;
          color: #a8b0b8; margin-bottom: 18px;
        }
        .pp-eyebrow-line { width: 32px; height: 1px; background: linear-gradient(90deg, transparent, #a8b0b8, transparent); }
        .pp-hero h1 {
          font-family: var(--font-numeral, 'Bodoni Moda', serif);
          font-size: clamp(40px, 6vw, 64px); font-weight: 600; margin: 0 0 16px;
          color: #f0ece2; letter-spacing: -0.5px;
        }
        .pp-hero p {
          font-size: 16px; color: rgba(255,255,255,0.7); max-width: 560px;
          margin: 0 auto; line-height: 1.65;
        }

        /* ── Package grid ── */
        .pp-grid {
          max-width: 1200px; margin: 0 auto; padding: 30px 32px 80px;
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 22px;
        }

        .pp-card {
          position: relative;
          background: linear-gradient(180deg, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0.01) 100%);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          padding: 36px 26px 30px;
          display: flex; flex-direction: column; gap: 16px;
          transition: transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
        }
        .pp-card:hover { transform: translateY(-4px); }

        /* Tier accents — subtle border + glow tint per tier */
        .pp-tier-vip {
          border-color: rgba(240,236,226,0.28);
          background: linear-gradient(180deg, rgba(240,236,226,0.06) 0%, rgba(255,255,255,0.02) 100%);
          box-shadow:
            0 0 0 1px rgba(240,236,226,0.04),
            0 0 40px rgba(240,236,226,0.09),
            0 24px 56px rgba(0,0,0,0.5);
        }
        .pp-tier-vip:hover {
          border-color: rgba(240,236,226,0.55);
          box-shadow:
            0 0 0 1px rgba(240,236,226,0.12),
            0 0 64px rgba(240,236,226,0.2),
            0 32px 72px rgba(0,0,0,0.6);
          transform: translateY(-6px);
        }

        .pp-tier-silver      { border-color: rgba(190,200,210,0.22); box-shadow: 0 0 32px rgba(190,200,210,0.05); }
        .pp-tier-silver:hover{ border-color: rgba(190,200,210,0.5);  box-shadow: 0 0 48px rgba(190,200,210,0.12); }

        .pp-tier-gold      { border-color: rgba(201,168,76,0.35); box-shadow: 0 0 36px rgba(201,168,76,0.08); }
        .pp-tier-gold:hover{ border-color: rgba(201,168,76,0.65); box-shadow: 0 0 56px rgba(201,168,76,0.18); }

        .pp-tier-diamond      { border-color: rgba(140,200,255,0.28); box-shadow: 0 0 36px rgba(140,200,255,0.06); }
        .pp-tier-diamond:hover{ border-color: rgba(140,200,255,0.55); box-shadow: 0 0 56px rgba(140,200,255,0.14); }

        .pp-badge {
          position: absolute; top: -11px; left: 50%; transform: translateX(-50%);
          font-family: var(--font-label, 'Inter', sans-serif);
          font-size: 10px; font-weight: 600; letter-spacing: 1.6px; text-transform: uppercase;
          padding: 6px 16px; border-radius: 50px; white-space: nowrap;
          background: linear-gradient(135deg, #a8b0b8, #c8ced6); color: #0a0a0f;
        }
        .pp-tier-gold .pp-badge {
          background: linear-gradient(135deg, #c9a84c, #e8d48b); color: #0a0a0f;
        }
        .pp-tier-diamond .pp-badge {
          background: linear-gradient(135deg, #8cc8ff, #c7e3ff); color: #0a0a0f;
        }

        .pp-name {
          font-family: var(--font-numeral, 'Bodoni Moda', serif);
          font-size: 28px; font-weight: 600; margin: 6px 0 0; text-align: center;
          color: #f0ece2; letter-spacing: 0.3px;
        }
        .pp-tagline {
          font-family: var(--font-label, 'Inter', sans-serif);
          font-size: 12px; font-weight: 400; letter-spacing: 1.6px; text-transform: uppercase;
          color: rgba(255,255,255,0.55); text-align: center; margin: 0;
        }
        .pp-price-row {
          display: flex; align-items: baseline; justify-content: center; gap: 6px;
          padding: 8px 0 4px;
        }
        .pp-price {
          font-family: var(--font-numeral, 'Bodoni Moda', serif);
          font-size: 42px; font-weight: 600; color: #a8b0b8; line-height: 1;
          letter-spacing: -0.5px;
        }
        .pp-tier-diamond .pp-price { color: #d4ebff; }
        .pp-tier-gold .pp-price    { color: #e8d48b; }
        .pp-tier-silver .pp-price  { color: #d4dde6; }
        .pp-tier-vip .pp-price     { color: #f0ece2; }

        /* Tier-specific check mark colors */
        .pp-tier-gold .pp-check    { color: #c9a84c; }
        .pp-tier-silver .pp-check  { color: #aab3bd; }
        .pp-tier-diamond .pp-check { color: #8cc8ff; }
        .pp-tier-vip .pp-check     { color: #f0ece2; }

        /* Tier-specific name colors */
        .pp-tier-gold .pp-name    { color: #e8d48b; }
        .pp-tier-silver .pp-name  { color: #d4dde6; }
        .pp-tier-diamond .pp-name { color: #d4ebff; }
        .pp-price-unit {
          font-family: var(--font-label, 'Inter', sans-serif);
          font-size: 12px; font-weight: 400; letter-spacing: 1px;
          color: rgba(255,255,255,0.5); text-transform: uppercase;
        }

        .pp-features {
          list-style: none; padding: 16px 0 0; margin: 0;
          display: flex; flex-direction: column; gap: 9px;
          border-top: 1px solid rgba(255,255,255,0.06); flex: 1;
        }
        .pp-features li {
          display: flex; align-items: flex-start; gap: 9px;
          font-size: 13px; color: rgba(255,255,255,0.82); line-height: 1.45;
        }
        .pp-check { color: #a8b0b8; font-size: 13px; flex-shrink: 0; margin-top: 1px; }

        .pp-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          align-self: center;
          padding: 11px 30px;
          border-radius: 50px;
          font-family: var(--font-label, 'Inter', sans-serif);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          text-decoration: none;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 10px;
          border: 2px solid transparent;
          box-sizing: border-box;
        }
        .pp-cta:active { transform: translateY(1px); }

        /* Each tier: fill + matching border in the tier's accent color */
        .pp-cta-vip {
          background: #f0ece2;
          border-color: #f0ece2;
          color: #0a0a0f;
        }
        .pp-cta-vip:hover {
          background: transparent;
          color: #f0ece2;
          box-shadow: 0 8px 24px rgba(240,236,226,0.25);
          transform: translateY(-2px);
        }

        .pp-cta-silver {
          background: linear-gradient(135deg, #aab3bd, #d4dde6);
          border-color: #c1ccd6;
          color: #0a0a0f;
        }
        .pp-cta-silver:hover {
          background: transparent;
          color: #d4dde6;
          box-shadow: 0 8px 24px rgba(190,200,210,0.35);
          transform: translateY(-2px);
        }

        .pp-cta-gold {
          background: linear-gradient(135deg, #c9a84c, #e8d48b);
          border-color: #c9a84c;
          color: #0a0a0f;
        }
        .pp-cta-gold:hover {
          background: transparent;
          color: #e8d48b;
          box-shadow: 0 8px 26px rgba(201,168,76,0.4);
          transform: translateY(-2px);
        }

        .pp-cta-diamond {
          background: linear-gradient(135deg, #8cc8ff, #d4ebff);
          border-color: #a8d8ff;
          color: #0a0a0f;
        }
        .pp-cta-diamond:hover {
          background: transparent;
          color: #d4ebff;
          box-shadow: 0 8px 26px rgba(140,200,255,0.45);
          transform: translateY(-2px);
        }

        /* ── Offers ── */
        .pp-offers {
          max-width: 1200px; margin: 0 auto; padding: 60px 32px 100px;
          border-top: 1px solid rgba(255,255,255,0.04);
        }
        .pp-offers-header {
          text-align: center; margin-bottom: 48px;
        }
        .pp-offers-header h2 {
          font-family: var(--font-numeral, 'Bodoni Moda', serif);
          font-size: clamp(40px, 6vw, 64px); font-weight: 600;
          margin: 0 0 16px; color: #f0ece2; letter-spacing: -0.5px;
        }
        .pp-offers-header p {
          font-size: 19px; color: rgba(255,255,255,0.8);
          max-width: 640px; margin: 0 auto; line-height: 1.6;
        }

        .pp-offers-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px;
        }

        .pp-off-card {
          background: linear-gradient(180deg, rgba(168,176,184,0.04) 0%, rgba(255,255,255,0.015) 100%);
          border: 1px solid rgba(168,176,184,0.18);
          border-radius: 20px;
          padding: 32px 28px 28px;
          display: flex; flex-direction: column; gap: 14px;
          transition: transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
          box-shadow: 0 0 32px rgba(168,176,184,0.06);
        }
        /* Featured offer — prominent gold glow */
        .pp-off-featured {
          background: linear-gradient(180deg, rgba(201,168,76,0.08) 0%, rgba(201,168,76,0.02) 100%);
          border-color: rgba(201,168,76,0.45) !important;
          box-shadow:
            0 0 0 1px rgba(201,168,76,0.12),
            0 0 40px rgba(201,168,76,0.25),
            0 0 80px rgba(201,168,76,0.12),
            0 24px 56px rgba(0,0,0,0.55) !important;
          transform: translateY(-4px);
        }
        .pp-off-featured:hover {
          border-color: rgba(201,168,76,0.7) !important;
          box-shadow:
            0 0 0 1px rgba(201,168,76,0.25),
            0 0 60px rgba(201,168,76,0.4),
            0 0 120px rgba(201,168,76,0.2),
            0 32px 72px rgba(0,0,0,0.6) !important;
          transform: translateY(-8px) !important;
        }
        .pp-off-featured .pp-off-icon {
          background: rgba(201,168,76,0.15) !important;
          border-color: rgba(201,168,76,0.4) !important;
          color: #c9a84c !important;
        }
        .pp-off-featured .pp-off-badge {
          color: #c9a84c !important;
          background: rgba(201,168,76,0.15) !important;
          border-color: rgba(201,168,76,0.35) !important;
        }
        .pp-off-featured .pp-off-cta {
          background: linear-gradient(135deg, #c9a84c, #e8d48b) !important;
        }
        .pp-off-featured .pp-off-cta:hover {
          background: linear-gradient(135deg, #c9a84c, #e8d48b) !important;
          color: #ffffff !important;
          box-shadow: 0 0 28px rgba(201,168,76,0.5) !important;
        }
        .pp-off-card:hover {
          transform: translateY(-3px);
          border-color: rgba(168,176,184,0.4);
          box-shadow: 0 0 48px rgba(168,176,184,0.14);
        }

        .pp-off-icon {
          width: 48px; height: 48px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(168,176,184,0.08);
          border: 1px solid rgba(168,176,184,0.22);
          border-radius: 14px;
          color: #a8b0b8;
        }
        .pp-off-icon svg { width: 24px; height: 24px; }

        .pp-off-badge {
          align-self: flex-start;
          font-family: var(--font-label, 'Inter', sans-serif);
          font-size: 12px; font-weight: 600; letter-spacing: 1.8px; text-transform: uppercase;
          color: #a8b0b8;
          background: rgba(168,176,184,0.08);
          border: 1px solid rgba(168,176,184,0.18);
          border-radius: 50px; padding: 5px 13px;
        }

        .pp-off-card h3 {
          font-family: var(--font-numeral, 'Bodoni Moda', serif);
          font-size: 28px; font-weight: 600; color: #ffffff;
          margin: 2px 0 0; letter-spacing: 0.3px;
        }
        .pp-off-sub {
          font-family: var(--font-label, 'Inter', sans-serif);
          font-size: 13px; font-weight: 400; letter-spacing: 1.6px; text-transform: uppercase;
          color: rgba(255,255,255,0.75); margin: 0;
        }

        .pp-off-features {
          list-style: none; padding: 14px 0 0; margin: 0;
          display: flex; flex-direction: column; gap: 8px;
          border-top: 1px solid rgba(255,255,255,0.06); flex: 1;
        }
        .pp-off-features li {
          display: flex; align-items: flex-start; gap: 10px;
          font-size: 15px; color: #ffffff; line-height: 1.55;
        }

        .pp-cd {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          width: 100%;
          margin: 8px 0 4px;
        }
        .pp-cd-cell {
          background: rgba(168,176,184,0.08);
          border: 1px solid rgba(168,176,184,0.22);
          border-radius: 10px;
          padding: 12px 4px 10px;
          text-align: center;
          min-width: 0;
        }
        .pp-cd-num {
          display: block;
          font-family: var(--font-numeral, 'Bodoni Moda', serif);
          font-size: 30px;
          font-weight: 600;
          color: #ffffff;
          line-height: 1;
          margin: 0 0 6px;
        }
        .pp-cd-lbl {
          display: block;
          font-family: var(--font-label, 'Inter', sans-serif);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          line-height: 1;
        }
        .pp-valid {
          font-family: var(--font-label, 'Inter', sans-serif);
          font-size: 12px;
          letter-spacing: 1.6px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.75);
          text-align: center;
          width: 100%;
          margin-top: 2px;
        }

        .pp-off-cta {
          display: block; text-align: center;
          padding: 15px 26px; border-radius: 50px;
          font-family: var(--font-label, 'Inter', sans-serif);
          font-size: 14px; font-weight: 700; letter-spacing: 1.8px; text-transform: uppercase;
          text-decoration: none;
          background: linear-gradient(135deg, #a8b0b8, #c8ced6); color: #0a0a0f;
          transition: all 0.3s ease; margin-top: 4px;
        }
        .pp-off-cta:hover {
          background: linear-gradient(135deg, #a8b0b8, #c8ced6);
          color: #ffffff;
          box-shadow: 0 0 28px rgba(168,176,184,0.4);
          transform: translateY(-1px);
        }

        .pp-contact-line {
          margin-top: 64px;
          text-align: center;
          display: flex; flex-direction: column; align-items: center; gap: 24px;
          padding: 48px 24px;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .pp-contact-line p {
          font-family: var(--font-numeral, 'Bodoni Moda', serif);
          font-size: 22px; font-weight: 500;
          color: rgba(255,255,255,0.85);
          max-width: 720px; margin: 0; line-height: 1.5;
          letter-spacing: 0.2px;
        }
        .pp-contact-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 18px 44px; border-radius: 50px;
          font-family: var(--font-label, 'Inter', sans-serif);
          font-size: 15px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase;
          text-decoration: none;
          background: transparent; color: #a8b0b8;
          border: 1px solid rgba(168,176,184,0.4);
          transition: all 0.3s ease;
        }
        .pp-contact-btn:hover {
          background: linear-gradient(135deg, #a8b0b8, #c8ced6);
          color: #0a0a0f; border-color: transparent;
          box-shadow: 0 0 28px rgba(168,176,184,0.3);
        }

        @media (max-width: 1100px) {
          .pp-grid { grid-template-columns: repeat(2, 1fr); }
          .pp-offers-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .pp-header { padding: 12px 20px; }
          .pp-hero { padding: 120px 20px 40px; }
          .pp-grid, .pp-offers { padding-left: 20px; padding-right: 20px; }
          .pp-grid { grid-template-columns: 1fr; }
          .pp-offers-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
