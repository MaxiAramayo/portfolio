import { useState, useEffect, useRef } from "react";
import { PORTFOLIO_CONTENT } from "../lib/content";
import { PROJECTS } from "../lib/projects";
import { CASE_STUDIES } from "../lib/case-studies";
import type { CsScreenshot } from "../lib/case-studies";
import { pick } from "../lib/content";
import type { Lang, PortfolioContent } from "../lib/types";

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

/* ---- Lightbox ---- */
function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose} aria-label="Cerrar">✕</button>
      <img
        src={src}
        alt=""
        className="lightbox-img"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

/* ---- Screenshots with groups ---- */
function ScreenshotsGrid({ screenshots, onOpen }: { screenshots: CsScreenshot[]; onOpen: (src: string) => void }) {
  const uniqueGroups = [...new Map(
    screenshots.filter(s => s.group).map(s => [s.group, s.groupDesc])
  ).entries()];
  const hasGroups = uniqueGroups.length > 0;

  if (!hasGroups) {
    return (
      <div className="cs-screenshots">
        {screenshots.map((s, i) => (
          <div key={i} className="cs-screenshot-item">
            <img
              src={s.src} alt={s.caption} className="cs-screenshot-img" loading="lazy"
              onClick={() => onOpen(s.src)}
            />
            <span className="cs-screenshot-caption">{s.caption}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="cs-screenshots-sections">
      {uniqueGroups.map(([group, groupDesc]) => {
        const groupScreens = screenshots.filter(s => s.group === group);
        return (
          <div key={group}>
            <div className="cs-screenshots-group-head">
              <span className="eyebrow">{group}</span>
              {groupDesc && <p className="cs-screenshots-group-desc">{groupDesc}</p>}
            </div>
            <div className="cs-screenshots">
              {groupScreens.map((s, i) => (
                <div key={i} className="cs-screenshot-item">
                  <img
                    src={s.src} alt={s.caption} className="cs-screenshot-img" loading="lazy"
                    onClick={() => onOpen(s.src)}
                  />
                  <span className="cs-screenshot-caption">{s.caption}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---- Top bar ---- */
function CSTopBar({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <header className="cs-topbar">
      <a href="/" className="cs-back">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span>{lang === "es" ? "Volver al portfolio" : "Back to portfolio"}</span>
      </a>
      <div className="cs-topbar-mid meta">Case Study</div>
      <div className="cs-topbar-right">
        <button
          className="lang-switch"
          onClick={() => setLang(lang === "es" ? "en" : "es")}
        >
          <span className={lang === "es" ? "on" : ""}>ES</span>
          <span className="lang-divider">/</span>
          <span className={lang === "en" ? "on" : ""}>EN</span>
        </button>
      </div>
    </header>
  );
}

/* ---- Block ---- */
function CSBlock({
  num, eyebrow, title, children,
}: {
  num: string; eyebrow: string; title?: string; children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const seen = useInView(ref);
  return (
    <section ref={ref} className={`cs-block reveal ${seen ? "in" : ""}`}>
      <aside className="cs-block-side">
        <div className="cs-num">{num}</div>
        <div className="eyebrow">{eyebrow}</div>
      </aside>
      <div className="cs-block-main">
        {title && <h2 className="h-2 cs-block-title">{title}</h2>}
        <div className="cs-block-body">{children}</div>
      </div>
    </section>
  );
}

/* ---- Architecture boxes (shared) ---- */
function ArchBox({ x, y, w, h, title, sub, accent = "var(--border)" }: {
  x: number; y: number; w: number; h: number; title: string; sub: string; accent?: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={8} fill="var(--surface-2)" stroke={accent} strokeWidth="1" />
      <text x={x + 12} y={y + 24} fill="var(--text)" fontFamily="Geist" fontSize="12" fontWeight="500">{title}</text>
      <text x={x + 12} y={y + 42} fill="var(--muted)" fontFamily="Geist Mono" fontSize="10">{sub}</text>
    </g>
  );
}

function GridBg() {
  return (
    <>
      <defs>
        <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="var(--muted)" />
        </marker>
        <pattern id="csg" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.6" fill="var(--grid-dot)" />
        </pattern>
      </defs>
      <rect width="720" height="380" fill="url(#csg)" />
    </>
  );
}

/* ---- Architecture diagrams per project ---- */
function ArchDiagramMedReports() {
  return (
    <div className="arch">
      <svg viewBox="0 0 720 380" width="100%" preserveAspectRatio="xMidYMid meet">
        <GridBg />
        <ArchBox x={20}  y={40}  w={150} h={60} title="Cliente Médico" sub="Next.js · React" accent="var(--accent)" />
        <ArchBox x={20}  y={170} w={150} h={60} title="Cliente Paciente" sub="Portal 24/7" />
        <ArchBox x={20}  y={300} w={150} h={60} title="Admin" sub="Dashboard" />
        <ArchBox x={290} y={170} w={140} h={60} title="NestJS API" sub="JWT · Guards RBAC" accent="var(--accent)" />
        <ArchBox x={500} y={40}  w={200} h={60} title="Prisma + PostgreSQL" sub="Pacientes · Informes" />
        <ArchBox x={500} y={170} w={200} h={60} title="AWS S3 (signed URLs)" sub="PDFs · Adjuntos" />
        <ArchBox x={500} y={300} w={200} h={60} title="pdfmake · firma digital" sub="Generación on-demand" />
        {([
          [170, 70, 290, 200],
          [170, 200, 290, 200],
          [170, 330, 290, 200],
          [430, 200, 500, 70],
          [430, 200, 500, 200],
          [430, 200, 500, 330],
        ] as [number, number, number, number][]).map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="var(--muted)" strokeWidth="1" strokeDasharray="3 3"
            markerEnd="url(#arr)" />
        ))}
      </svg>
      <div className="arch-legend meta">
        <span><i style={{ background: "var(--accent)" }} />Entry points</span>
        <span><i style={{ background: "var(--muted)" }} />Servicios internos</span>
      </div>
    </div>
  );
}

function ArchDiagramTuTiendaWeb() {
  return (
    <div className="arch">
      <svg viewBox="0 0 720 380" width="100%" preserveAspectRatio="xMidYMid meet">
        <GridBg />
        {/* Top: 3 entry points */}
        <ArchBox x={20}  y={30}  w={170} h={60} title="Panel Admin" sub="Gestión del comercio" accent="var(--accent)" />
        <ArchBox x={275} y={30}  w={170} h={60} title="Tienda Pública" sub="Catálogo · Pedidos" accent="var(--accent)" />
        <ArchBox x={530} y={30}  w={170} h={60} title="Menú QR" sub="Link directo" accent="var(--accent)" />
        {/* Middle: Next.js layer */}
        <ArchBox x={210} y={160} w={300} h={60} title="Next.js 14 (Vercel)" sub="App Router · CI/CD automático" accent="var(--accent)" />
        {/* Bottom: 3 backends */}
        <ArchBox x={20}  y={290} w={190} h={60} title="Firebase Auth" sub="Auth · Storage" />
        <ArchBox x={265} y={290} w={190} h={60} title="Firestore" sub="Datos multi-tenant" />
        <ArchBox x={510} y={290} w={190} h={60} title="Mercado Pago" sub="Pagos · Webhooks HMAC" />
        {/* Lines top → middle */}
        {([
          [105,  90, 310, 160],
          [360,  90, 360, 160],
          [615,  90, 410, 160],
        ] as [number, number, number, number][]).map(([x1, y1, x2, y2], i) => (
          <line key={`t${i}`} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="var(--muted)" strokeWidth="1" strokeDasharray="3 3" markerEnd="url(#arr)" />
        ))}
        {/* Lines middle → bottom */}
        {([
          [310, 220, 115, 290],
          [360, 220, 360, 290],
          [410, 220, 605, 290],
        ] as [number, number, number, number][]).map(([x1, y1, x2, y2], i) => (
          <line key={`b${i}`} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="var(--muted)" strokeWidth="1" strokeDasharray="3 3" markerEnd="url(#arr)" />
        ))}
      </svg>
      <div className="arch-legend meta">
        <span><i style={{ background: "var(--accent)" }} />Entry points</span>
        <span><i style={{ background: "var(--muted)" }} />Servicios</span>
      </div>
    </div>
  );
}

function ArchDiagramAgenda() {
  return (
    <div className="arch">
      <svg viewBox="0 0 720 380" width="100%" preserveAspectRatio="xMidYMid meet">
        <GridBg />
        {/* Flow: left to right + branching */}
        <ArchBox x={20}  y={155} w={155} h={60} title="Cliente WhatsApp" sub="Mensaje libre" accent="var(--accent)" />
        <ArchBox x={235} y={155} w={155} h={60} title="n8n webhook" sub="Recibe evento" />
        <ArchBox x={390} y={80}  w={155} h={60} title="Solicitud turno" sub="Fecha · Hora" />
        <ArchBox x={390} y={230} w={155} h={60} title="Consulta general" sub="Complejo / Reclamo" />
        <ArchBox x={550} y={40}  w={150} h={60} title="Consulta Excel" sub="Disponibilidad" />
        <ArchBox x={550} y={120} w={150} h={60} title="Confirma turno" sub="WhatsApp → cliente" accent="var(--accent)" />
        <ArchBox x={550} y={200} w={150} h={60} title="Registra Excel" sub="Historial automático" />
        <ArchBox x={550} y={280} w={150} h={60} title="Notifica dueño" sub="Intervención humana" />
        {/* entry → n8n */}
        <line x1={175} y1={185} x2={235} y2={185} stroke="var(--muted)" strokeWidth="1" strokeDasharray="3 3" markerEnd="url(#arr)" />
        {/* n8n → branches */}
        <line x1={390} y1={185} x2={390} y2={110} stroke="var(--muted)" strokeWidth="1" strokeDasharray="3 3" markerEnd="url(#arr)" />
        <line x1={390} y1={185} x2={390} y2={260} stroke="var(--muted)" strokeWidth="1" strokeDasharray="3 3" markerEnd="url(#arr)" />
        {/* turno branch → Excel + Confirma + Registra */}
        <line x1={545} y1={110} x2={550} y2={70}  stroke="var(--muted)" strokeWidth="1" strokeDasharray="3 3" markerEnd="url(#arr)" />
        <line x1={545} y1={110} x2={550} y2={150} stroke="var(--muted)" strokeWidth="1" strokeDasharray="3 3" markerEnd="url(#arr)" />
        <line x1={545} y1={110} x2={550} y2={230} stroke="var(--muted)" strokeWidth="1" strokeDasharray="3 3" markerEnd="url(#arr)" />
        {/* complejo → notifica */}
        <line x1={545} y1={260} x2={550} y2={310} stroke="var(--muted)" strokeWidth="1" strokeDasharray="3 3" markerEnd="url(#arr)" />
      </svg>
      <div className="arch-legend meta">
        <span><i style={{ background: "var(--accent)" }} />Entry points</span>
        <span><i style={{ background: "var(--muted)" }} />Nodos del flujo</span>
      </div>
    </div>
  );
}

function StackCol({ k, v }: { k: string; v: string[] }) {
  return (
    <div className="stack-col">
      <span className="meta">{k}</span>
      <ul>{v.map((it, i) => <li key={i}>{it}</li>)}</ul>
    </div>
  );
}

function Decision({ n, t, body, chose, reason }: {
  n: string; t: string; body: string; chose: string; reason: string;
}) {
  return (
    <div className="decision">
      <header className="decision-head">
        <span className="label-num">{n}</span>
        <h3 className="h-3 decision-t">{t}</h3>
      </header>
      <p className="body decision-body">{body}</p>
      <div className="decision-grid">
        <div>
          <span className="meta">{n.startsWith("C") ? "Elegido" : "Elegido"}</span>
          <div className="decision-chose">{chose}</div>
        </div>
        <div>
          <span className="meta">Razón</span>
          <div className="body-sm">{reason}</div>
        </div>
      </div>
    </div>
  );
}

function Problem({ n, t, d }: { n: string; t: string; d: string }) {
  return (
    <div className="problem">
      <div className="problem-n">{n}</div>
      <h3 className="h-3 problem-t">{t}</h3>
      <p className="body problem-d">{d}</p>
    </div>
  );
}

function ImpactRow({ before, after, k }: { before: string; after: string; k: string }) {
  return (
    <div className="impact-row">
      <div className="impact-row-k">{k}</div>
      <div className="impact-row-before">
        <span className="meta">Antes</span>
        <div className="impact-row-v">{before}</div>
      </div>
      <div className="impact-row-arrow">→</div>
      <div className="impact-row-after">
        <span className="meta">Ahora</span>
        <div className="impact-row-v impact-after">{after}</div>
      </div>
    </div>
  );
}

/* ---- Footer ---- */
function CSFooter({ t }: { t: PortfolioContent }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-l">
          <div className="footer-brand">
            <svg viewBox="0 0 28 28" width="20" height="20">
              <path d="M3 24 L3 4 L14 18 L25 4 L25 24" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
            <span>Maximiliano Aramayo Lazo</span>
          </div>
          <span className="meta">{t.footer.colofon}</span>
        </div>
        <div className="footer-r">
          <span className="meta">{t.footer.built}</span>
          <span className="meta">{t.footer.year}</span>
        </div>
      </div>
    </footer>
  );
}

/* ---- App ---- */
interface CaseStudyAppProps {
  projectId: string;
}

const ARCH_DIAGRAMS: Record<string, () => JSX.Element> = {
  medreports: ArchDiagramMedReports,
  tutiendaweb: ArchDiagramTuTiendaWeb,
  "agenda-mecanico": ArchDiagramAgenda,
};

export default function CaseStudyApp({ projectId }: CaseStudyAppProps) {
  const [lang, setLang] = useState<Lang>("es");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const t = PORTFOLIO_CONTENT[lang];

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
  }, [lang]);

  const p = PROJECTS.find((pr) => pr.id === projectId) ?? PROJECTS[0];
  const csData = CASE_STUDIES[projectId]?.[lang] ?? CASE_STUDIES[PROJECTS[0].id][lang];

  const title = pick(p.title, lang);
  const tagline = pick(p.tagline, lang);
  const solution = pick(p.solution, lang);
  const sector = pick(p.sector, lang);
  const role = pick(p.role, lang);
  const status = pick(p.status, lang);

  const ArchDiagram = ARCH_DIAGRAMS[projectId] ?? ArchDiagramMedReports;

  const hasScreenshots = csData.screenshots && csData.screenshots.length > 0;

  /* Block numbering shifts by 1 when screenshots exist */
  const n = (base: number) => String(base + (hasScreenshots ? 1 : 0)).padStart(2, "0");

  return (
    <>
      {lightbox && <Lightbox src={lightbox} onClose={() => setLightbox(null)} />}
      <CSTopBar lang={lang} setLang={setLang} />
      <main className="cs-main grid-bg">
        {/* HERO */}
        <section className="cs-hero">
          <div className="cs-hero-meta">
            <span className="label-num">{p.n} · {p.year}</span>
            <span className="hairline-x" />
            <span className="eyebrow">{sector}</span>
            <span className="hairline-x" />
            <span className="chip accent"><span className="chip-dot" />{status}</span>
          </div>
          <h1 className="display cs-hero-title">{title}</h1>
          <p className="lede cs-hero-tagline">{tagline}</p>

          <div className="cs-hero-meta-row">
            <div className="cs-meta-cell">
              <span className="meta">{lang === "es" ? "Rol" : "Role"}</span>
              <div className="cs-meta-v">{role}</div>
            </div>
            <div className="cs-meta-cell">
              <span className="meta">{lang === "es" ? "Período" : "Period"}</span>
              <div className="cs-meta-v">{csData.duration}</div>
            </div>
            <div className="cs-meta-cell">
              <span className="meta">{lang === "es" ? "Equipo" : "Team"}</span>
              <div className="cs-meta-v">{csData.team}</div>
            </div>
            <div className="cs-meta-cell">
              <span className="meta">{lang === "es" ? "Año" : "Year"}</span>
              <div className="cs-meta-v">{p.year}</div>
            </div>
          </div>
        </section>

        {/* IMPACT KPIs */}
        <section className="cs-impact-row">
          {p.impact.map((m, i) => (
            <div key={i} className="cs-impact-cell">
              <div className="cs-impact-v">{m.v}</div>
              <div className="cs-impact-k">{pick(m.k, lang)}</div>
              {m.sub && <div className="meta cs-impact-sub">{typeof m.sub === "string" ? m.sub : pick(m.sub, lang)}</div>}
            </div>
          ))}
        </section>

        {/* 01 CONTEXT */}
        <CSBlock num="01" eyebrow={lang === "es" ? "Contexto" : "Context"} title={csData.context.title}>
          <p className="body-lg">{csData.context.body}</p>
          <ul className="cs-list">
            {csData.context.bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        </CSBlock>

        {/* 02 PROBLEM */}
        <CSBlock num="02" eyebrow={lang === "es" ? "Problema" : "Problem"} title={lang === "es" ? "3 fricciones costosas, todos los días." : "Three costly daily frictions."}>
          <div className="cs-problems">
            {csData.problems.map((pr) => (
              <Problem key={pr.n} n={pr.n} t={pr.t} d={pr.d} />
            ))}
          </div>
        </CSBlock>

        {/* 03 CONSTRAINTS */}
        <CSBlock num="03" eyebrow={lang === "es" ? "Restricciones" : "Constraints"} title={lang === "es" ? "Qué no se podía romper." : "What couldn't break."}>
          <div className="cs-constraints">
            {csData.constraints.map((c) => (
              <div key={c.id}>
                <span className="label-num">{c.id}.</span>
                <b>{c.title}</b>
                <p className="body-sm">{c.body}</p>
              </div>
            ))}
          </div>
        </CSBlock>

        {/* 04 SOLUTION */}
        <CSBlock num="04" eyebrow={lang === "es" ? "Solución" : "Solution"} title={lang === "es" ? "Qué se construyó." : "What was built."}>
          <p className="body-lg">{solution}</p>
        </CSBlock>

        {/* 05 SCREENSHOTS (solo si hay imágenes) */}
        {hasScreenshots && (
          <CSBlock num="05" eyebrow="Screenshots" title={lang === "es" ? "El producto en producción." : "The product in production."}>
            <ScreenshotsGrid screenshots={csData.screenshots!} onOpen={setLightbox} />
          </CSBlock>
        )}

        {/* ARCHITECTURE */}
        <CSBlock num={n(5)} eyebrow={lang === "es" ? "Arquitectura" : "Architecture"} title={lang === "es" ? "Stack moderno, pragmático, mantenible." : "Modern stack — pragmatic and maintainable."}>
          <ArchDiagram />
          <div className="cs-stack-grid">
            {csData.stackGroups.map((sg, i) => (
              <StackCol key={i} k={sg.k} v={sg.v} />
            ))}
          </div>
        </CSBlock>

        {/* DECISIONS */}
        <CSBlock num={n(6)} eyebrow={lang === "es" ? "Decisiones técnicas" : "Technical decisions"} title={lang === "es" ? "Tres decisiones que se sostienen seis meses después." : "Three decisions that still hold up six months in."}>
          <div className="decisions">
            {csData.decisions.map((d) => (
              <Decision key={d.n} n={d.n} t={d.t} body={d.body} chose={d.chose} reason={d.reason} />
            ))}
          </div>
        </CSBlock>

        {/* CHALLENGES */}
        <CSBlock num={n(7)} eyebrow={lang === "es" ? "Desafíos" : "Challenges"} title={lang === "es" ? "Lo que no estaba en el plan." : "What wasn't in the plan."}>
          <ol className="cs-challenges">
            {csData.challenges.map((c, i) => <li key={i}>{c}</li>)}
          </ol>
        </CSBlock>

        {/* IMPACT */}
        <CSBlock num={n(8)} eyebrow={lang === "es" ? "Impacto" : "Impact"} title={lang === "es" ? "Lo que cambió, medido." : "What changed — measured."}>
          <div className="cs-impact-detail">
            {csData.impactRows.map((r, i) => (
              <ImpactRow key={i} before={r.before} after={r.after} k={r.k} />
            ))}
          </div>
        </CSBlock>

        {/* LEARNINGS */}
        <CSBlock num={n(9)} eyebrow={lang === "es" ? "Aprendizajes" : "Learnings"} title={lang === "es" ? "Lo que me llevo para el próximo proyecto." : "What I take into the next project."}>
          <ol className="cs-learnings">
            {csData.learnings.map((l, i) => <li key={i}>{l}</li>)}
          </ol>
        </CSBlock>

        {/* CTA */}
        <section className="cs-cta">
          <div className="cs-cta-inner">
            <span className="eyebrow">{lang === "es" ? "Siguiente" : "Up next"}</span>
            <h2 className="h-1 cs-cta-title">
              {lang === "es" ? "¿Querés un proyecto así para tu producto?" : "Want this kind of work for your product?"}
            </h2>
            <p className="lede">
              {lang === "es"
                ? "Respondo en menos de 24 hs hábiles. Cuanto más concreto el contexto, más rápido te digo si encaja."
                : "I reply within 24 working hours. The more concrete the context, the faster I can tell you if it fits."}
            </p>
            <div className="cs-cta-actions">
              <a href="/#contact" className="btn btn-primary">
                {lang === "es" ? "Contactarme" : "Get in touch"}
                <span className="arrow">→</span>
              </a>
              <a href="/#work" className="btn btn-ghost">
                {lang === "es" ? "Ver otros proyectos" : "View other projects"}
              </a>
            </div>
          </div>
        </section>
      </main>

      <CSFooter t={t} />
    </>
  );
}
