import { useState, useEffect } from "react";
import { PORTFOLIO_CONTENT, CV_URL } from "../lib/content";
import { PROJECTS } from "../lib/projects";
import type { Lang } from "../lib/types";

import Sidebar from "./Sidebar";
import ProjectItem from "./ProjectItem";
import Lightbox from "./Lightbox";

const SECTION_IDS = ["about", "projects", "stack", "contact"] as const;

/** Marca como activa la sección visible en el centro del viewport. */
function useScrollSpy(ids: readonly string[]) {
  const [active, setActive] = useState<string>(ids[0]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);

  return active;
}

export default function HomeApp() {
  const [lang, setLang] = useState<Lang>("es");
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const active = useScrollSpy(SECTION_IDS);

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
  }, [lang]);

  const t = PORTFOLIO_CONTENT[lang];

  const nav = [
    { id: "about", label: t.nav.about },
    { id: "projects", label: t.nav.work },
    { id: "stack", label: t.nav.stack },
    { id: "contact", label: t.nav.contact },
  ];

  return (
    <div className="wrap">
      <Sidebar t={t} lang={lang} setLang={setLang} nav={nav} active={active} />

      <main className="main">
        <section id="about" className="sec">
          <h2 className="sec-head">{t.about.eyebrow}</h2>
          <p className="body">{t.about.body1}</p>
          <p className="body">{t.about.body2}</p>
          <p className="body">{t.about.body3}</p>

          <div className="meta-row">
            <span>{t.hero.meta.based}</span>
            <span>{t.hero.meta.timezone}</span>
            <span>{t.hero.meta.years}</span>
          </div>

          <div className="creds">
            {t.credentials.items.map((c) => (
              <button
                key={c.name}
                className="cred"
                onClick={() => setLightbox({ src: c.image, alt: c.name })}
                aria-label={`${c.type}: ${c.name}`}
              >
                <img className="cred-thumb" src={c.image} alt="" loading="lazy" />
                <span className="cred-body">
                  <span className="cred-type">{c.type}</span>
                  <span className="cred-name">{c.name}</span>
                  <span className="cred-issuer">
                    {c.issuer} · {c.year}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </section>

        <section id="projects" className="sec">
          <h2 className="sec-head">{t.work.eyebrow}</h2>
          <p className="body">{t.work.sub}</p>
          <ul className="pc-list">
            {PROJECTS.map((p) => (
              <ProjectItem key={p.id} p={p} lang={lang} openCase={t.work.openCase} />
            ))}
          </ul>
        </section>

        <section id="stack" className="sec">
          <h2 className="sec-head">{t.stack.eyebrow}</h2>
          <div className="stack-grid">
            {t.stack.groups.map((g) => (
              <div key={g.k}>
                <div className="stack-k">{g.k}</div>
                <ul className="stack-v">
                  {g.v.map((v) => (
                    <li key={v}>{v}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="sec">
          <h2 className="sec-head">{t.contact.eyebrow}</h2>
          <h3 className="contact-title">{t.contact.title}</h3>
          <p className="body">{t.contact.sub}</p>
          <a className="contact-btn" href={`mailto:${t.contact.email}`}>
            {t.contact.writeMe} <span aria-hidden="true">→</span>
          </a>
          <div className="contact-links">
            <a href={`mailto:${t.contact.email}`}>{t.contact.email}</a>
            <a href={CV_URL} download>
              {t.nav.cv}
            </a>
          </div>
          <footer className="foot">
            {t.footer.colofon}
            <br />
            {t.footer.built} {t.footer.year}
          </footer>
        </section>
      </main>

      {lightbox && (
        <Lightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
}
