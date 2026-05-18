import ProjectCard from "./ProjectCard";
import { PROJECTS } from "../lib/projects";
import type { Lang, PortfolioContent } from "../lib/types";

interface WorkSectionProps {
  t: PortfolioContent;
  lang: Lang;
  onOpen: (id: string) => void;
}

function SectionHead({
  num, eyebrow, title, sub,
}: {
  num: string; eyebrow: string; title: string; sub?: string;
}) {
  return (
    <header className="section-head">
      <div className="section-head-top">
        <span className="label-num">{num}</span>
        <span className="section-head-line" aria-hidden="true" />
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <div className="section-head-main">
        <h2 className="h-1 section-title">{title}</h2>
        {sub && <p className="lede section-sub">{sub}</p>}
      </div>
    </header>
  );
}

export { SectionHead };

export default function WorkSection({ t, lang, onOpen }: WorkSectionProps) {
  return (
    <section className="section section-work" id="work">
      <SectionHead
        num="N°02 / WORK"
        eyebrow={t.work.eyebrow}
        title={t.work.title}
        sub={t.work.sub}
      />
      <div className="work-grid">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} p={p} lang={lang} onOpen={onOpen} idx={i} />
        ))}
      </div>
      <div className="work-foot">
        <a href="#archive" className="btn-link" data-cursor="hover">
          {t.work.seeAll} →
        </a>
        <span className="meta">{lang === "es" ? "Más proyectos en archivo" : "More in the archive"}</span>
      </div>
    </section>
  );
}
