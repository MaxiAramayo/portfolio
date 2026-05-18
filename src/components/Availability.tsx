import { SectionHead } from "./WorkSection";
import type { Lang, PortfolioContent } from "../lib/types";

interface AvailabilityProps {
  t: PortfolioContent;
  lang: Lang;
}

export default function Availability({ t, lang }: AvailabilityProps) {
  return (
    <section className="section section-avail" id="availability">
      <SectionHead num="N°07 / AVAILABILITY" eyebrow={t.availability.eyebrow} title={t.availability.title} />
      <div className="avail-grid">
        {t.availability.modes.map((m, i) => (
          <div key={i} className="avail-card" data-cursor="hover">
            <div className="avail-num">{String(i + 1).padStart(2, "0")}</div>
            <h3 className="h-3 avail-k">{m.k}</h3>
            <p className="body avail-d">{m.d}</p>
          </div>
        ))}
      </div>
      <div className="avail-foot">
        <span className="status">
          <span className="pulse" />
          {t.availability.location}
        </span>
      </div>
    </section>
  );
}
