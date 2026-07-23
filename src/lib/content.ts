import type { Lang, PortfolioContent } from "./types";

/** Único lugar donde vive la ruta del CV: la usan el sidebar y la sección de contacto. */
export const CV_URL = "/cv/CV_Maximiliano_Aramayo_Fullstack.pdf";

export const PORTFOLIO_CONTENT: Record<Lang, PortfolioContent> = {
  es: {
    nav: {
      about: "Sobre mí",
      work: "Proyectos",
      stack: "Stack",
      contact: "Contacto",
      cv: "Descargar CV",
      sections: "Secciones del portfolio",
    },
    hero: {
      name: "Maximiliano Aramayo",
      degree: "Ingeniero en Informática",
      role: "Fullstack Developer Jr+ · Analista técnico-funcional",
      pitch: "Analizo procesos y construyo los sistemas que los mejoran.",
      meta: {
        based: "Remoto · CABA · Córdoba Capital",
        timezone: "GMT−3 · Argentina",
        years: "Sistemas en producción desde 2024",
      },
    },
    about: {
      eyebrow: "Sobre mí",
      body1:
        "Soy Ingeniero en Informática y trabajo en el punto donde se conectan el negocio y la tecnología. No me limito a recibir una lista de tareas: entiendo cómo funciona el proceso, qué problema existe y qué necesita el usuario antes de definir una solución.",
      body2:
        "Desarrollé productos propios y sistemas para clientes en salud, retail y servicios: aplicaciones web, automatizaciones, integraciones y la implementación de Odoo 18 para una ferretería con más de 10.000 productos y dos sucursales.",
      body3:
        "Cubro todo el ciclo: relevamiento, modelado, desarrollo, despliegue y soporte en producción. Busco crecer como desarrollador, y también me interesan posiciones de análisis donde mi base técnica sea un diferencial.",
      photoCaption: "Maximiliano Aramayo Lazo",
    },
    work: {
      eyebrow: "Proyectos",
      sub: "Cada proyecto abre su caso completo en una pestaña nueva.",
      openCase: "Abrir caso completo",
    },
    stack: {
      eyebrow: "Stack",
      groups: [
        { k: "Frontend", v: ["React", "Next.js", "TypeScript", "Tailwind", "Angular"] },
        { k: "Backend", v: ["Node.js", "NestJS", "Prisma", "PostgreSQL", "REST APIs", "JWT"] },
        { k: "ERP & Automatización", v: ["Odoo 18", "Python", "XML", "n8n", "WhatsApp Business API", "MercadoPago"] },
        { k: "Infra & Cloud", v: ["Docker", "Nginx", "VPS", "Vercel", "AWS S3", "Firebase"] },
        { k: "Análisis & Método", v: ["Relevamiento", "UML / BPMN", "SQL", "Scrum", "SOLID"] },
      ],
    },
    credentials: {
      eyebrow: "Formación",
      items: [
        {
          type: "Título",
          name: "Ingeniería en Informática",
          issuer: "Título emitido",
          year: "2026",
          image: "/imagenes-perfil/Certificado-ING.jpeg",
        },
        {
          type: "Certificación",
          name: "Claude Code in Action",
          issuer: "Anthropic",
          year: "2026",
          image: "/imagenes-perfil/certificado de claude.png",
        },
      ],
    },
    contact: {
      eyebrow: "Contacto",
      title: "¿Tenés un problema que vale la pena resolver?",
      sub: "Respondo en menos de 24 hs hábiles. Disponible para trabajo remoto en español, e híbrido o presencial en CABA o Córdoba Capital.",
      email: "maxilazo888@gmail.com",
      writeMe: "Escribime",
    },
    footer: {
      colofon: "Diseñado y desarrollado por Maximiliano Aramayo Lazo.",
      year: "© 2026",
      built: "Construido con Astro · TypeScript.",
    },
  },

  en: {
    nav: {
      about: "About",
      work: "Work",
      stack: "Stack",
      contact: "Contact",
      cv: "Download CV",
      sections: "Portfolio sections",
    },
    hero: {
      name: "Maximiliano Aramayo",
      degree: "B.Eng. in Computer Science",
      role: "Jr+ Fullstack Developer · Technical-functional analyst",
      pitch: "I analyse processes and build the systems that improve them.",
      meta: {
        based: "Remote · Buenos Aires · Córdoba",
        timezone: "GMT−3 · Argentina",
        years: "Shipping to production since 2024",
      },
    },
    about: {
      eyebrow: "About",
      body1:
        "I'm a Computer Engineer working where business and technology meet. I don't just take a task list: I learn how the process works, what the actual problem is and what the user needs before defining a solution.",
      body2:
        "I've built my own products and client systems across healthcare, retail and services: web apps, automations, integrations, and an Odoo 18 rollout for a hardware store with 10,000+ products across two branches.",
      body3:
        "I cover the whole cycle: discovery, modelling, development, deployment and production support. I want to grow as a developer, and I'm also open to analyst roles where my technical base is an edge.",
      photoCaption: "Maximiliano Aramayo Lazo",
    },
    work: {
      eyebrow: "Work",
      sub: "Each project opens its full case study in a new tab.",
      openCase: "Open full case study",
    },
    stack: {
      eyebrow: "Stack",
      groups: [
        { k: "Frontend", v: ["React", "Next.js", "TypeScript", "Tailwind", "Angular"] },
        { k: "Backend", v: ["Node.js", "NestJS", "Prisma", "PostgreSQL", "REST APIs", "JWT"] },
        { k: "ERP & Automation", v: ["Odoo 18", "Python", "XML", "n8n", "WhatsApp Business API", "MercadoPago"] },
        { k: "Infra & Cloud", v: ["Docker", "Nginx", "VPS", "Vercel", "AWS S3", "Firebase"] },
        { k: "Analysis & Method", v: ["Discovery", "UML / BPMN", "SQL", "Scrum", "SOLID"] },
      ],
    },
    credentials: {
      eyebrow: "Education",
      items: [
        {
          type: "Degree",
          name: "B.Eng. in Computer Science",
          issuer: "Degree awarded",
          year: "2026",
          image: "/imagenes-perfil/Certificado-ING.jpeg",
        },
        {
          type: "Certification",
          name: "Claude Code in Action",
          issuer: "Anthropic",
          year: "2026",
          image: "/imagenes-perfil/certificado de claude.png",
        },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Got a problem worth solving?",
      sub: "I reply within 24 working hours. Available for remote work in Spanish, and hybrid or on-site in Buenos Aires or Córdoba.",
      email: "maxilazo888@gmail.com",
      writeMe: "Write me",
    },
    footer: {
      colofon: "Designed and built by Maximiliano Aramayo Lazo.",
      year: "© 2026",
      built: "Built with Astro · TypeScript.",
    },
  },
};

export function pick<T extends string | { es: string; en: string }>(
  obj: T | null | undefined,
  lang: Lang
): string {
  if (obj == null) return "";
  if (typeof obj === "string") return obj;
  return obj[lang] ?? obj.es ?? obj.en ?? "";
}
