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

function ProcessStep({ s, idx }: { s: { n: string; t: string; d: string }; idx: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const seen = useInView(ref);
  return (
    <li
      ref={ref}
      className={`process-step reveal ${seen ? "in" : ""}`}
      style={{ transitionDelay: `${idx * 60}ms` }}
    >
      <div className="process-num">{s.n}</div>
      <h3 className="h-3 process-t">{s.t}</h3>
      <p className="body process-d">{s.d}</p>
      <span className="process-rule" aria-hidden="true" />
    </li>
  );
}

export default function Process({ t }: { t: PortfolioContent }) {
  return (
    <section className="section section-process" id="process">
      <SectionHead num="N°04 / PROCESS" eyebrow={t.process.eyebrow} title={t.process.title} />
      <ol className="process-grid">
        {t.process.steps.map((s, i) => (
          <ProcessStep key={i} s={s} idx={i} />
        ))}
      </ol>
    </section>
  );
}
