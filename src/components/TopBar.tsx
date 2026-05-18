import { useState, useEffect } from "react";
import type { Lang, Theme, PortfolioContent } from "../lib/types";

interface TopBarProps {
  lang: Lang;
  setLang: (l: Lang) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  t: PortfolioContent;
}

export default function TopBar({ lang, setLang, theme, setTheme, t }: TopBarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  const nav = t.nav;
  return (
    <header className={`topbar ${scrolled ? "is-scrolled" : ""}`}>
      <div className="topbar-inner">
        <a href="#top" className="brand" data-cursor="hover">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 28 28" width="22" height="22">
              <path d="M3 24 L3 4 L14 18 L25 4 L25 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="miter" />
            </svg>
          </span>
          <span className="brand-text">
            <span className="brand-name">Maximiliano Aramayo</span>
            <span className="brand-role meta">Fullstack Engineer</span>
          </span>
        </a>

        <nav className="topbar-nav" aria-label="Primary">
          <a href="#work">{nav.work}</a>
          <a href="#about">{nav.about}</a>
          <a href="#process">{nav.process}</a>
          <a href="#stack">{nav.stack}</a>
          <a href="#credentials">{nav.credentials}</a>
        </nav>

        <div className="topbar-actions">
          <button
            className="lang-switch"
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            aria-label="Switch language"
            data-cursor="hover"
          >
            <span className={lang === "es" ? "on" : ""}>ES</span>
            <span className="lang-divider">/</span>
            <span className={lang === "en" ? "on" : ""}>EN</span>
          </button>
          <button
            className="theme-switch"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            data-cursor="hover"
          >
            {theme === "dark" ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
              </svg>
            )}
          </button>
          <a href="#contact" className="btn btn-primary topbar-cta" data-cursor="hover">
            {nav.hire}
            <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </header>
  );
}
