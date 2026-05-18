import { useState, useEffect } from "react";
import { SectionHead } from "./WorkSection";
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

interface ContactProps {
  t: PortfolioContent;
  lang: Lang;
}

export default function Contact({ t, lang }: ContactProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    navigator.clipboard?.writeText(t.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section className="section section-contact" id="contact">
      <SectionHead
        num="N°08 / CONTACT"
        eyebrow={t.contact.eyebrow}
        title={t.contact.title}
        sub={t.contact.sub}
      />
      <div className="contact-card">
        <a href={`mailto:${t.contact.email}`} className="contact-email" data-cursor="hover">
          <span className="contact-email-label meta">
            {lang === "es" ? "Escribime a" : "Reach me at"}
          </span>
          <span className="contact-email-v">{t.contact.email}</span>
          <span className="contact-email-arrow arrow">↗</span>
        </a>

        <div className="contact-actions">
          <a href={`mailto:${t.contact.email}`} className="btn btn-primary" data-cursor="hover">
            {t.contact.writeMe}<span className="arrow">→</span>
          </a>
          <button className="btn btn-ghost" onClick={onCopy} data-cursor="hover">
            {copied ? t.contact.copied : t.contact.copy}
          </button>
          <a href="#cv" className="btn btn-ghost" data-cursor="hover">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M12 4v12m0 0l-4-4m4 4l4-4M5 20h14" />
            </svg>
            {t.contact.cv}
          </a>
        </div>

        <div className="contact-extra">
          <Row k="response" v={lang === "es" ? "< 24 hs hábiles" : "< 24 business hrs"} />
          <Row
            k="languages"
            v={lang === "es" ? "Español (nativo) · Inglés (B2 profesional)" : "Spanish (native) · English (professional B2)"}
          />
          <Row k="timezone" v={<><LiveClock /> · GMT-3</>} />
        </div>
      </div>
    </section>
  );
}
