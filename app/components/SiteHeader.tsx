"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";

const T = {
  en: {
    home: "Home", services: "Services", pricing: "Pricing",
    gallery: "Gallery", reviews: "Reviews", contact: "Contact", lang: "العربية",
  },
  ar: {
    home: "الرئيسية", services: "خدماتنا", pricing: "الأسعار",
    gallery: "المعرض", reviews: "التقييمات", contact: "تواصل", lang: "English",
  },
};

type Lang = "en" | "ar";

export default function SiteHeader() {
  const [lang, setLang] = useState<Lang>("en");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const t = T[lang];

  // Restore saved language on mount
  useEffect(() => {
    const saved = localStorage.getItem("dpkw-lang") as Lang | null;
    if (saved === "ar") {
      setLang("ar");
      document.body.classList.add("ar-active");
      window.dispatchEvent(new CustomEvent("lang-change", { detail: "ar" }));
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleLang = useCallback(() => {
    const next = lang === "en" ? "ar" : "en";
    setLang(next);
    localStorage.setItem("dpkw-lang", next);
    document.body.classList.toggle("ar-active", next === "ar");
    window.dispatchEvent(new CustomEvent("lang-change", { detail: next }));
  }, [lang]);

  const close = useCallback(() => setMenuOpen(false), []);

  // On subpages, hash links go to homepage sections
  const href = (hash: string) => isHome ? hash : `/${hash}`;

  return (
    <>
      <header className={`header${scrolled ? " scrolled" : ""}`}>
        <a href={isHome ? "#hero" : "/"} className="header-brand">
          <img src="/diamond_logo_transparent.png" alt="Diamond PKW" className="header-logo" />
          <span className="header-brand-name">DIAMOND <span className="gold-text">PKW</span></span>
        </a>

        <nav className="nav-links">
          <a href={isHome ? "#hero" : "/"} onClick={close}>{t.home}</a>
          <a href="/services" onClick={close}>{t.services}</a>
          <a href="/packages" onClick={close}>{t.pricing}</a>
          <a href={href("#gallery")} onClick={close}>{t.gallery}</a>
          <a href={href("#reviews")} onClick={close}>{t.reviews}</a>
          <a href={href("#contact")} onClick={close}>{t.contact}</a>
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button className="lang-toggle" onClick={toggleLang}>
            <svg className="globe-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            {t.lang}
          </button>
          <button
            className={`mobile-menu-btn${menuOpen ? " active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        <a href={isHome ? "#hero" : "/"} onClick={close}>{t.home}</a>
        <a href="/services" onClick={close}>{t.services}</a>
        <a href="/packages" onClick={close}>{t.pricing}</a>
        <a href={href("#gallery")} onClick={close}>{t.gallery}</a>
        <a href={href("#reviews")} onClick={close}>{t.reviews}</a>
        <a href={href("#contact")} onClick={close}>{t.contact}</a>
        <button className="lang-toggle" onClick={toggleLang} style={{ marginTop: "16px" }}>
          <svg className="globe-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          {t.lang}
        </button>
      </div>
    </>
  );
}
