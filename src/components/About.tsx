import { useRef, useState, useEffect } from "react";
import { SectionHead } from "./WorkSection";
import type { Lang, PortfolioContent } from "../lib/types";

function useInView(ref: React.RefObject<Element | null>) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current || seen) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { setSeen(true); io.disconnect(); }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [ref, seen]);
  return seen;
}

interface AboutProps {
  t: PortfolioContent;
  lang: Lang;
}

export default function About({ t, lang }: AboutProps) {
  const photoRef = useRef<HTMLDivElement>(null);
  const seen = useInView(photoRef);

  return (
    <section className="section section-about" id="about">
      <SectionHead num="N°03 / ABOUT" eyebrow={t.about.eyebrow} title={t.about.title} />
      <div className="about-grid">
        <div ref={photoRef} className={`about-photo reveal ${seen ? "in" : ""}`}>
          <div className="photo-frame">
            <div className="photo-placeholder">
              <img
                src="/imagenes-perfil/Perfil.jpeg"
                alt="Maximiliano Aramayo Lazo"
                className="photo-img"
              />
            </div>
            <div className="photo-tag">
              <span className="meta">{t.about.photoCaption}</span>
            </div>
            <div className="photo-mark">
              <span className="meta">N°01</span>
              <span className="meta">portrait</span>
            </div>
          </div>
        </div>

        <div className="about-text">
          <p className="body-lg">{t.about.body1}</p>
          <p className="body-lg">{t.about.body2}</p>
          <p className="body-lg">{t.about.body3}</p>

          <div className="signature">
            <svg viewBox="0 0 180 56" width="160" height="50" aria-hidden="true">
              <path
                d="M8 38 Q 22 6, 36 38 T 64 38 T 92 38 Q 110 14, 130 36 Q 142 48, 152 30 L 172 24"
                fill="none"
                stroke="var(--text)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <span className="meta">Maximiliano Aramayo Lazo · 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
}
