import { useState, useEffect, useRef } from "react";
import SplitLine from "./SplitLine";
import type { Lang, PortfolioContent } from "../lib/types";

function LiveClock({ tz = "America/Argentina/Buenos_Aires" }: { tz?: string }) {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const i = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(i);
  }, []);
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  return <span className="live-clock">{fmt.format(now)}</span>;
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="kv-row">
      <span className="kv-k">{k}</span>
      <span className="kv-sep">:</span>
      <span className="kv-v">{v}</span>
    </div>
  );
}

interface HeroProps {
  t: PortfolioContent;
  lang: Lang;
}

export default function Hero({ t, lang }: HeroProps) {
  const [parallax, setParallax] = useState(0);

  useEffect(() => {
    const on = () => setParallax(window.scrollY);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <section className="hero" id="top">
      <div
        className="hero-grid grid-bg"
        style={{ transform: `translateY(${parallax * 0.15}px)` }}
        aria-hidden="true"
      />

      <div className="hero-meta-top">
        <div className="hero-num label-num">N°01 / HOME</div>
        <div className="hero-availability">
          <span className="status">
            <span className="pulse" aria-hidden="true" />
            {t.hero.eyebrow}
          </span>
        </div>
      </div>

      <div className="hero-main">
        <div className="hero-name-block">
          <h1 className="display hero-name">
            <span className="line line-1">
              <SplitLine text={t.hero.name[0]} delay={120} />
            </span>
            <span className="line line-2">
              <SplitLine text={t.hero.name[1]} delay={500} />
            </span>
          </h1>

          <div className="hero-tagline">
            <span className="tag-1">{t.hero.tagline}</span>
            <span className="tag-2">{t.hero.tagline2}</span>
          </div>

          <p className="hero-sub lede">{t.hero.sub}</p>

          <div className="hero-ctas">
            <a href="#work" className="btn btn-primary" data-cursor="hover">
              {t.hero.ctaPrimary}
              <span className="arrow">→</span>
            </a>
            <a href="/cv/CV_ING_Aramayo.pdf" download className="btn btn-ghost" data-cursor="hover">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M12 4v12m0 0l-4-4m4 4l4-4M5 20h14" />
              </svg>
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>

        <aside className="hero-side">
          <div className="hero-card">
            <div className="hero-card-head">
              <span className="meta">/ status.json</span>
              <span className="hero-card-dots" aria-hidden="true">
                <i /><i /><i />
              </span>
            </div>
            <div className="hero-card-body">
              <Row k="location" v={t.hero.meta.based} />
              <Row k="timezone" v={<><LiveClock /> · GMT-3</>} />
              <Row k="modes" v="full-time, freelance, consulting" />
              <Row k="response" v={lang === "es" ? "< 24 hs hábiles" : "< 24 business hrs"} />
              <Row k="shipping_since" v={t.hero.meta.years} />
              <Row k="open_to" v={<span className="ok">true</span>} />
            </div>
            <div className="hero-card-foot meta">
              <span>v 2.0 · {new Date().getFullYear()}</span>
              <span className="dot-sep">·</span>
              <span>maxiaramayo.com</span>
            </div>
          </div>

          <div className="hero-marks">
            <span className="meta strong">Ing. en Informática · UCSE '25</span>
            <span className="meta">{lang === "es" ? "Freelance · Jun 2024 – Presente" : "Freelance · Jun 2024 – Present"}</span>
          </div>
        </aside>
      </div>

      <div className="hero-foot">
        <div className="hero-foot-l meta">
          <span>{lang === "es" ? "Desplazá para explorar" : "Scroll to explore"}</span>
          <span className="scroll-line" aria-hidden="true" />
        </div>
        <div className="hero-foot-r meta">
          <span>{lang === "es" ? "07 secciones" : "07 sections"}</span>
        </div>
      </div>
    </section>
  );
}
