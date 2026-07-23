import type { Lang, PortfolioContent } from "../lib/types";
import { CV_URL } from "../lib/content";

const SOCIAL = {
  github: "https://github.com/MaxiAramayo",
  linkedin: "https://linkedin.com/in/maximiliano-aramayo-lazo",
};

const ICON_PATHS = {
  github:
    "M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.36-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.32 9.32 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.81 0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2z",
  linkedin:
    "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.66H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z",
  email:
    "M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z",
  cv: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm0 2.5L18.5 9H14V4.5zM12 11l4 4h-3v4h-2v-4H8l4-4z",
} as const;

function SocialIcon({ name }: { name: keyof typeof ICON_PATHS }) {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}

interface SidebarProps {
  t: PortfolioContent;
  lang: Lang;
  setLang: (l: Lang) => void;
  nav: Array<{ id: string; label: string }>;
  active: string;
}

export default function Sidebar({ t, lang, setLang, nav, active }: SidebarProps) {
  return (
    <header className="side">
      <div className="side-top">
        <div className="side-id">
          <img
            className="side-photo"
            src="/imagenes-perfil/Perfil-avatar.jpg"
            alt={t.about.photoCaption}
            width={76}
            height={76}
          />
          <div>
            <h1 className="name">{t.hero.name}</h1>
            <p className="side-degree">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 10L12 5 2 10l10 5 10-5z" />
                <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
              </svg>
              {t.hero.degree}
            </p>
          </div>
        </div>

        <p className="role">{t.hero.role}</p>
        <p className="pitch">{t.hero.pitch}</p>

        <nav className="nav" aria-label={t.nav.sections}>
          {nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={`nav-link${active === n.id ? " is-active" : ""}`}
            >
              <span className="nav-line" />
              <span className="nav-text">{n.label}</span>
            </a>
          ))}
        </nav>
      </div>

      <div className="side-bot">
        <div className="socials">
          <a href={SOCIAL.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <SocialIcon name="github" />
          </a>
          <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <SocialIcon name="linkedin" />
          </a>
          <a href={`mailto:${t.contact.email}`} aria-label="Email">
            <SocialIcon name="email" />
          </a>
          <a href={CV_URL} download aria-label={t.nav.cv} title={t.nav.cv}>
            <SocialIcon name="cv" />
          </a>
        </div>
        <button
          className="lang"
          onClick={() => setLang(lang === "es" ? "en" : "es")}
          aria-label={lang === "es" ? "Switch to English" : "Cambiar a español"}
        >
          {lang === "es" ? "EN" : "ES"}
        </button>
      </div>
    </header>
  );
}
