import type { Lang } from "../lib/types";

interface MarqueeProps {
  lang: Lang;
}

export default function Marquee({ lang }: MarqueeProps) {
  const items =
    lang === "es"
      ? ["React · TypeScript · Node", "Disponible Q3 2026", "Healthcare", "Retail SaaS", "Automation", "Ingeniería en Informática", "Claude Code certified", "Remote-first"]
      : ["React · TypeScript · Node", "Available Q3 2026", "Healthcare", "Retail SaaS", "Automation", "B.Eng. Computer Science", "Claude Code certified", "Remote-first"];
  const all = [...items, ...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {all.map((it, i) => (
          <span key={i} className="marquee-item">
            <span className="meta">{it}</span>
            <span className="marquee-dot">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
