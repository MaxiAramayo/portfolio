import { useRef, useEffect, useState } from "react";
import { pick } from "../lib/content";
import type { Lang, Project } from "../lib/types";

function useInView(ref: React.RefObject<Element | null>) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current || seen) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setSeen(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [ref, seen]);
  return seen;
}

function useTilt(strength = 6) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf: number;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(1200px) rotateX(${-y * strength}deg) rotateY(${x * strength}deg) translateZ(0)`;
      });
    };
    const onLeave = () => {
      el.style.transform = "";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [strength]);
  return ref;
}

interface ProjectCardProps {
  p: Project;
  lang: Lang;
  onOpen: (id: string) => void;
  idx: number;
}

export default function ProjectCard({ p, lang, onOpen, idx }: ProjectCardProps) {
  const tiltRef = useTilt(3);
  const inViewRef = useRef<HTMLDivElement>(null);
  const seen = useInView(inViewRef);

  const status = pick(p.status, lang);
  const title = pick(p.title, lang);
  const tagline = pick(p.tagline, lang);
  const sector = pick(p.sector, lang);
  const isNDA = p.statusKey === "nda";

  return (
    <div
      ref={inViewRef}
      className={`project-card-outer reveal ${seen ? "in" : ""}`}
      style={{ transitionDelay: `${idx * 80}ms` }}
    >
      <article
        ref={tiltRef as React.RefObject<HTMLElement>}
        className="project-card"
        data-status={p.statusKey}
        style={{ "--card-accent": p.accent } as React.CSSProperties}
        data-cursor="hover"
        onClick={() => onOpen(p.id)}
      >
        <span className="project-card-rule" aria-hidden="true" />
        <header className="project-card-head">
          <span className="project-num">{p.n}</span>
          <div className="project-pills">
            <span className={`chip ${isNDA ? "" : "accent"}`}>
              {!isNDA && <span className="chip-dot" />}
              {status}
            </span>
            <span className="chip">{p.year}</span>
            <span className="chip">{sector}</span>
          </div>
        </header>

        <div className="project-body">
          <h3 className="h-2 project-title">{title}</h3>
          <p className="project-tagline body-lg">{tagline}</p>
        </div>

        <div className="project-impact">
          {p.impact.slice(0, 3).map((m, i) => (
            <div key={i} className="impact-cell">
              <div className="impact-v">{m.v}</div>
              <div className="impact-k meta">{pick(m.k, lang)}</div>
            </div>
          ))}
        </div>

        <footer className="project-card-foot">
          <div className="project-stack">
            {p.stack.slice(0, 5).map((s, i) => (
              <span key={i} className="chip mono">{s}</span>
            ))}
            {p.stack.length > 5 && (
              <span className="chip mono dim">+{p.stack.length - 5}</span>
            )}
          </div>
          <div className="project-cta">
            <span>{lang === "es" ? "Ver caso" : "View case"}</span>
            <span className="arrow">→</span>
          </div>
        </footer>
      </article>
    </div>
  );
}
