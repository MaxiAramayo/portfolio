import { SectionHead } from "./WorkSection";
import type { Lang, PortfolioContent } from "../lib/types";

interface StackProps {
  t: PortfolioContent;
  lang: Lang;
}

export default function Stack({ t, lang }: StackProps) {
  return (
    <section className="section section-stack" id="stack">
      <SectionHead num="N°05 / STACK" eyebrow={t.stack.eyebrow} title={t.stack.title} />
      <div className="stack-table">
        {t.stack.groups.map((g, i) => (
          <div key={i} className="stack-row">
            <div className="stack-k">
              <span className="label-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="stack-key">{g.k}</span>
            </div>
            <div className="stack-v">
              {g.v.map((v, j) => (
                <span key={j} className="stack-pill">{v}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="meta stack-foot">
        {lang === "es"
          ? "/ Conozco más, esto es lo que uso en producción y mantengo activo."
          : "/ I know more — this is what I run in production and keep sharp."}
      </p>
    </section>
  );
}
