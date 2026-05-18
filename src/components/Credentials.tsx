import { useRef, useState, useEffect } from "react";
import { SectionHead } from "./WorkSection";
import type { PortfolioContent } from "../lib/types";

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

function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose} aria-label="Cerrar">✕</button>
      <img
        src={src}
        alt=""
        className="lightbox-img"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

function CredentialCard({
  c, idx, onImageClick,
}: {
  c: PortfolioContent["credentials"]["items"][0];
  idx: number;
  onImageClick: (src: string) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const seen = useInView(ref);
  const isVerified = c.status.toLowerCase() === "verified" || c.status.toLowerCase() === "verificado";

  return (
    <article
      ref={ref}
      className={`credential reveal ${seen ? "in" : ""}`}
      style={{ transitionDelay: `${idx * 80}ms` }}
      data-cursor="hover"
    >
      {c.image && (
        <div
          className="cred-img-wrap"
          onClick={() => onImageClick(c.image!)}
          title="Ver imagen completa"
        >
          <img src={c.image} alt={c.name} className="cred-img" />
        </div>
      )}
      {!c.image && (
        <div className="cred-seal" aria-hidden="true">
          <svg viewBox="0 0 80 80" width="64" height="64">
            <circle cx="40" cy="40" r="34" fill="none" stroke="var(--border)" strokeDasharray="2 4" />
            <circle cx="40" cy="40" r="22" fill="none" stroke="var(--accent-line)" strokeWidth="1" />
            <path d="M30 40 L38 48 L52 32" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
      <header className="cred-head">
        <span className="meta">{c.type}</span>
        <span className={`chip mono ${isVerified ? "accent" : ""}`}>{c.status}</span>
      </header>
      <h3 className="h-3 cred-name">{c.name}</h3>
      <div className="cred-meta">
        <span>{c.issuer}</span>
        <span className="dot-sep">·</span>
        <span>{c.year}</span>
      </div>
      <p className="body-sm cred-note">{c.note}</p>
    </article>
  );
}

export default function Credentials({ t }: { t: PortfolioContent }) {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <>
      {lightbox && <Lightbox src={lightbox} onClose={() => setLightbox(null)} />}
      <section className="section section-credentials" id="credentials">
        <SectionHead
          num="N°06 / CREDENTIALS"
          eyebrow={t.credentials.eyebrow}
          title={t.credentials.title}
          sub={t.credentials.sub}
        />
        <div className="credentials-grid">
          {t.credentials.items.map((c, i) => (
            <CredentialCard
              key={i}
              c={c}
              idx={i}
              onImageClick={setLightbox}
            />
          ))}
          <div className="credential credential-empty">
            <div className="cred-empty-mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </div>
            <p className="meta">{t.credentials.addMore}</p>
          </div>
        </div>
      </section>
    </>
  );
}
