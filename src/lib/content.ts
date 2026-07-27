import type { Lang, PortfolioContent } from "./types";

/** Rutas de los CV: la usan el sidebar y la sección de contacto. */
export const CV_ANALISTA_URL = "/cv/CV_Maximiliano_Aramayo_Analista_Sistemas.pdf";
export const CV_URL = "/cv/CV_Maximiliano_Aramayo_Fullstack.pdf";

export const PORTFOLIO_CONTENT: Record<Lang, PortfolioContent> = {
  es: {
    nav: {
      about: "Sobre mí",
      experience: "Experiencia",
      work: "Proyectos",
      stack: "Stack",
      contact: "Contacto",
      cv: "Descargar CV",
      sections: "Secciones del portfolio",
    },
    hero: {
      name: "Maximiliano Aramayo",
      degree: "Ingeniero en Informática",
      role: "Analista de Sistemas · Analista Técnico-Funcional - Fullstack",
      pitch: "Ingeniero en Informática con experiencia en relevamiento, análisis de procesos, SQL, APIs, pruebas funcionales, implementación y soporte. Mi experiencia en desarrollo me permite comunicarme con equipos técnicos y evaluar la viabilidad de las soluciones.",
      meta: {
        based: "Remoto · CABA · Córdoba Capital",
        timezone: "GMT−3 · Argentina",
        years: "Sistemas en producción desde 2024",
      },
    },
    about: {
      eyebrow: "Sobre mí",
      body1:
        "Soy Ingeniero en Informática y Analista de Sistemas con experiencia participando en el ciclo completo de soluciones tecnológicas.",
      body2:
        "Trabajo con usuarios y stakeholders para comprender problemas, relevar procesos, definir requerimientos, modelar datos y validar soluciones. También participo en implementación, pruebas, despliegue, capacitación y soporte posterior. Mi experiencia como desarrollador me permite entender APIs, bases de datos, integraciones y restricciones técnicas, funcionando como puente entre las necesidades del negocio y los equipos de desarrollo.",
      body3:
        "Trabajé en sistemas para salud, retail, servicios y gestión empresarial, incluyendo plataformas médicas, ERP, CRM, automatizaciones y productos SaaS en producción. Actualmente busco oportunidades como Analista de Sistemas, Analista Técnico-Funcional, Analista de Aplicaciones o Implementador de soluciones.",
      photoCaption: "Maximiliano Aramayo Lazo",
    },
    experience: {
      eyebrow: "Experiencia",
      items: [
        {
          company: "Grupo Emax",
          role: "Fullstack Developer & Analista de Sistemas",
          period: "Marzo de 2026 – actualidad",
          location: "Remoto, España",
          bullets: [
            "Desarrollo de módulos sobre sistemas de gestión y facturación eléctrica",
            "Análisis de requerimientos, documentación, pruebas manuales y automatizadas",
            "Detección de incidencias y colaboración con stakeholders",
          ],
        },
        {
          company: "Proyectos independientes",
          role: "Analista de Sistemas & Desarrollador",
          period: "Junio de 2024 – febrero de 2026",
          location: "Remoto, Argentina",
          bullets: [
            "Relevamiento, análisis, modelado, implementación, pruebas, despliegue, capacitación y soporte",
            "Soluciones para salud, retail y servicios",
          ],
        },
        {
          company: "Programa TrainIT",
          role: "Fullstack Developer",
          period: "Agosto de 2025 – noviembre de 2025",
          location: "Remoto, Argentina",
          bullets: [
            "Desarrollo colaborativo con Angular, TypeScript y NestJS bajo Scrum",
            "Git Flow y revisión de código",
          ],
        },
      ],
    },
    work: {
      eyebrow: "Proyectos",
      sub: "Cada proyecto abre su caso completo en una pestaña nueva.",
      openCase: "Abrir caso completo",
    },
    stack: {
      eyebrow: "Stack",
      groups: [
        { k: "Análisis técnico-funcional", v: ["Relevamiento de requerimientos", "Análisis AS-IS / TO-BE", "Historias de usuario", "Criterios de aceptación", "UML y BPMN", "Documentación funcional y técnica", "Pruebas funcionales y UAT", "Gestión de incidencias", "Scrum y Kanban"] },
        { k: "Datos e integraciones", v: ["SQL", "PostgreSQL", "Modelado relacional", "APIs REST", "JSON", "Postman", "Swagger / OpenAPI", "Migración y validación de datos"] },
        { k: "Sistemas empresariales", v: ["ERP y CRM", "Odoo 18", "Ventas, compras e inventario", "Facturación y liquidaciones", "Automatización de procesos", "Integraciones externas"] },
        { k: "Base de desarrollo", v: ["TypeScript", "JavaScript", "Next.js", "Node.js", "NestJS", "React", "Prisma", "Docker", "Git"] },
        { k: "Ofimática", v: ["Excel avanzado", "Word", "PowerPoint", "Google Workspace"] },
      ],
    },
    credentials: {
      eyebrow: "Formación",
      items: [
        {
          type: "Título",
          name: "Ingeniería en Informática",
          issuer: "UCSE",
          year: "2026",
          image: "/imagenes-perfil/Certificado-ING.jpeg",
        },
        {
          type: "Certificación",
          name: "Data Engineering y Python",
          issuer: "IBM / Coursera",
          year: "2026",
          image: "",
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
      title: "¿Buscás un Analista Técnico-Funcional con base en desarrollo?",
      sub: "Puedo relevar necesidades, analizar procesos, documentar soluciones, validar APIs y datos, ejecutar pruebas y acompañar al equipo hasta producción. Disponible para posiciones remotas, híbridas y presenciales en CABA o Córdoba Capital.",
      email: "maxilazo888@gmail.com",
      writeMe: "Contactarme",
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
      experience: "Experience",
      work: "Work",
      stack: "Stack",
      contact: "Contact",
      cv: "Download CV",
      sections: "Portfolio sections",
    },
    hero: {
      name: "Maximiliano Aramayo",
      degree: "B.Eng. in Computer Science",
      role: "Systems Analyst · Technical-Functional Analyst - Fullstack",
      pitch: "Computer Engineer with experience in discovery, process analysis, SQL, APIs, functional testing, implementation and support. My development background lets me communicate with technical teams and assess solution feasibility.",
      meta: {
        based: "Remote · Buenos Aires · Córdoba",
        timezone: "GMT−3 · Argentina",
        years: "Shipping to production since 2024",
      },
    },
    about: {
      eyebrow: "About",
      body1:
        "I am a Computer Engineer and Systems Analyst with experience participating in the complete lifecycle of technology solutions.",
      body2:
        "I work with users and stakeholders to understand problems, analyse processes, define requirements, model data and validate solutions. I also take part in implementation, testing, deployment, training and ongoing support. My development background lets me understand APIs, databases, integrations and technical constraints, acting as a bridge between business needs and development teams.",
      body3:
        "I have worked on systems for healthcare, retail, services and business management, including medical platforms, ERP, CRM, automations and production SaaS products. I am currently looking for opportunities as a Systems Analyst, Technical-Functional Analyst or Solutions Implementer.",
      photoCaption: "Maximiliano Aramayo Lazo",
    },
    experience: {
      eyebrow: "Experience",
      items: [
        {
          company: "Grupo Emax",
          role: "Fullstack Developer & Systems Analyst",
          period: "March 2026 – present",
          location: "Remote, Spain",
          bullets: [
            "Module development on electrical billing and management systems",
            "Requirements analysis, documentation, manual and automated testing",
            "Issue detection and stakeholder collaboration",
          ],
        },
        {
          company: "Independent projects",
          role: "Systems Analyst & Developer",
          period: "June 2024 – February 2026",
          location: "Remote, Argentina",
          bullets: [
            "Discovery, analysis, modelling, implementation, testing, deployment, training and support",
            "Solutions for healthcare, retail and services",
          ],
        },
        {
          company: "TrainIT Program",
          role: "Fullstack Developer",
          period: "August 2025 – November 2025",
          location: "Remote, Argentina",
          bullets: [
            "Collaborative development with Angular, TypeScript and NestJS under Scrum",
            "Git Flow and code review",
          ],
        },
      ],
    },
    work: {
      eyebrow: "Work",
      sub: "Each project opens its full case study in a new tab.",
      openCase: "Open full case study",
    },
    stack: {
      eyebrow: "Stack",
      groups: [
        { k: "Technical-functional analysis", v: ["Requirements gathering", "AS-IS / TO-BE analysis", "User stories", "Acceptance criteria", "UML and BPMN", "Functional and technical documentation", "Functional and UAT testing", "Incident management", "Scrum and Kanban"] },
        { k: "Data & integrations", v: ["SQL", "PostgreSQL", "Relational modelling", "REST APIs", "JSON", "Postman", "Swagger / OpenAPI", "Data migration and validation"] },
        { k: "Enterprise systems", v: ["ERP and CRM", "Odoo 18", "Sales, purchases and inventory", "Invoicing and settlements", "Process automation", "External integrations"] },
        { k: "Development foundation", v: ["TypeScript", "JavaScript", "Next.js", "Node.js", "NestJS", "React", "Prisma", "Docker", "Git"] },
        { k: "Office tools", v: ["Advanced Excel", "Word", "PowerPoint", "Google Workspace"] },
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
      title: "Looking for a Technical-Functional Analyst with a development background?",
      sub: "I can gather requirements, analyse processes, document solutions, validate APIs and data, run tests and support the team through to production. Available for remote, hybrid and on-site positions in Buenos Aires or Córdoba.",
      email: "maxilazo888@gmail.com",
      writeMe: "Get in touch",
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
