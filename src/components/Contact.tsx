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
          <a href="/cv/CV_ING_Aramayo.pdf" download className="btn btn-ghost" data-cursor="hover">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M12 4v12m0 0l-4-4m4 4l4-4M5 20h14" />
            </svg>
            {t.contact.cv}
          </a>
          <a href="https://github.com/MaxiAramayo" target="_blank" rel="noopener noreferrer" className="btn btn-ghost" data-cursor="hover">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.09.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.091-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .267.18.577.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
            GitHub
          </a>
          <a href="https://linkedin.com/in/maximiliano-aramayo-lazo" target="_blank" rel="noopener noreferrer" className="btn btn-ghost" data-cursor="hover">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>
        </div>

        <div className="contact-extra">
          <Row k="response" v={lang === "es" ? "< 24 hs hábiles" : "< 24 business hrs"} />
          <Row
            k="languages"
            v={lang === "es" ? "Español (nativo) · Inglés (B1 intermedio)" : "Spanish (native) · English (intermediate B1)"}
          />
          <Row k="timezone" v={<><LiveClock /> · GMT-3</>} />
        </div>
      </div>
    </section>
  );
}
