import { pick } from "../lib/content";
import type { Lang, Project } from "../lib/types";

function ArrowOut() {
  return (
    <svg
      className="arrow-out"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

interface ProjectItemProps {
  p: Project;
  lang: Lang;
  openCase: string;
}

export default function ProjectItem({ p, lang, openCase }: ProjectItemProps) {
  return (
    <li>
      <a
        className="pc"
        href={`/case-study/${p.id}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${pick(p.title, lang)} — ${openCase}`}
      >
        <div className="pc-year">
          {p.year} · {pick(p.sector, lang)}
        </div>
        <div className="pc-main">
          <h3 className="pc-title">
            {pick(p.title, lang)}
            <ArrowOut />
          </h3>
          <p className="pc-tag">{pick(p.tagline, lang)}</p>
          <div className="pc-metrics">
            {p.impact.map((m, i) => (
              <span key={i} className="pc-metric">
                <b>{m.v}</b> {pick(m.k, lang)}
              </span>
            ))}
          </div>
          <ul className="pc-stack">
            {p.stack.slice(0, 6).map((s) => (
              <li key={s}>{s}</li>
            ))}
            {p.stack.length > 6 && <li>+{p.stack.length - 6}</li>}
          </ul>
        </div>
      </a>
    </li>
  );
}
