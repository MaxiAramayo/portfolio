import { useEffect, useMemo } from "react";
import { PROJECTS } from "../lib/projects";
import { pick } from "../lib/content";
import type { Lang, PortfolioContent } from "../lib/types";

interface DrawerProps {
  openId: string | null;
  onClose: () => void;
  lang: Lang;
  t: PortfolioContent;
}

function DrawerBlock({ label, num, children }: { label: string; num: string; children: React.ReactNode }) {
  return (
    <section className="drawer-block">
      <header className="drawer-block-head">
        <span className="label-num">{num}</span>
        <span className="eyebrow">{label}</span>
      </header>
      <div className="drawer-block-body">{children}</div>
    </section>
  );
}

export default function Drawer({ openId, onClose, lang, t }: DrawerProps) {
  const project = useMemo(() => PROJECTS.find((p) => p.id === openId), [openId]);

  useEffect(() => {
    document.body.style.overflow = openId ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [openId, onClose]);

  if (!project) {
    return (
      <div className={`drawer-root ${openId ? "open" : ""}`}>
        <div className="drawer-backdrop" onClick={onClose} />
        <aside className="drawer-panel" role="dialog" aria-modal="true" />
      </div>
    );
  }

  const p = project;
  const title = pick(p.title, lang);
  const tagline = pick(p.tagline, lang);
  const role = pick(p.role, lang);
  const sector = pick(p.sector, lang);
  const status = pick(p.status, lang);
  const problem = pick(p.problem, lang);
  const solution = pick(p.solution, lang);
  const isNDA = p.statusKey === "nda";

  return (
    <div className={`drawer-root ${openId ? "open" : ""}`}>
      <div className="drawer-backdrop" onClick={onClose} />
      <aside className="drawer-panel" role="dialog" aria-modal="true" aria-label={title}>
        <header className="drawer-head">
          <div className="drawer-head-l">
            <span className="label-num">{p.n} / {p.year}</span>
            <span className={`chip ${isNDA ? "" : "accent"}`}>
              {!isNDA && <span className="chip-dot" />}{status}
            </span>
          </div>
          <button className="drawer-close" onClick={onClose} aria-label={t.drawer.close} data-cursor="hover">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>

        <div className="drawer-scroll">
          <div className="drawer-hero">
            <span className="eyebrow">{sector}</span>
            <h2 className="h-1 drawer-title">{title}</h2>
            <p className="lede drawer-tagline">{tagline}</p>
          </div>

          <div className="drawer-meta-row">
            <div>
              <span className="meta">{t.drawer.role}</span>
              <div className="drawer-meta-v">{role}</div>
            </div>
            <div>
              <span className="meta">{t.drawer.status}</span>
              <div className="drawer-meta-v">{status} · {p.year}</div>
            </div>
          </div>

          <DrawerBlock label={t.drawer.problem} num="01">
            <p className="body-lg">{problem}</p>
          </DrawerBlock>

          <DrawerBlock label={t.drawer.solution} num="02">
            <p className="body-lg">{solution}</p>
          </DrawerBlock>

          <DrawerBlock label={t.drawer.impact} num="03">
            <div className="drawer-impact">
              {p.impact.map((m, i) => (
                <div key={i} className="drawer-impact-cell">
                  <div className="drawer-impact-v">{m.v}</div>
                  <div className="drawer-impact-k">{pick(m.k, lang)}</div>
                  {m.sub && (
                    <div className="drawer-impact-sub meta">
                      {typeof m.sub === "string" ? m.sub : pick(m.sub, lang)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </DrawerBlock>

          <DrawerBlock label={t.drawer.stack} num="04">
            <div className="drawer-stack">
              {p.stack.map((s, i) => (
                <span key={i} className="chip mono">{s}</span>
              ))}
            </div>
            {p.security && p.security.length > 0 && (
              <div className="drawer-sub">
                <span className="meta">{lang === "es" ? "Seguridad" : "Security"}</span>
                <ul className="drawer-list">
                  {p.security.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            )}
          </DrawerBlock>

          <footer className="drawer-foot">
            {p.statusKey !== "nda" && (
              <a href={`/case-study/${p.id}`} className="btn btn-primary" data-cursor="hover">
                {t.drawer.readMore}<span className="arrow">→</span>
              </a>
            )}
            <button className="btn btn-ghost" onClick={onClose} data-cursor="hover">
              {t.drawer.close}
            </button>
          </footer>
        </div>
      </aside>
    </div>
  );
}
