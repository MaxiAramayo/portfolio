import type { Project } from "./types";

export const PROJECTS: Project[] = [
  {
    id: "odoo-ferreteria",
    n: "01",
    year: "2025",
    status: { es: "En producción", en: "Live" },
    statusKey: "live",
    title: {
      es: "Implementación ERP Odoo 18 — Ferretería Aramayo",
      en: "Odoo 18 ERP Rollout — Aramayo Hardware Store",
    },
    tagline: {
      es: "Dos sucursales, dos catálogos separados y +10.000 productos unificados en un solo ERP.",
      en: "Two branches, two separate catalogs and 10,000+ products unified into a single ERP.",
    },
    sector: { es: "Retail · ERP", en: "Retail · ERP" },
    role: {
      es: "Analista · Implementador · Desarrollo · Deploy · Capacitación",
      en: "Analyst · Implementer · Development · Deploy · Training",
    },
    problem: {
      es: "Dos instalaciones independientes del sistema anterior, una por sucursal, cada una con su propio catálogo, códigos y stock. El mismo producto aparecía con nombres y códigos distintos: sin catálogo único, sin stock real y con actualización de precios fragmentada.",
      en: "Two independent installs of the legacy system, one per branch, each with its own catalog, codes and stock. The same product appeared under different names and codes: no single catalog, no real stock figure and fragmented price updates.",
    },
    solution: {
      es: "Odoo 18 Community centralizado: catálogo unificado con stock diferenciado por sucursal, módulos de Ventas, Compras, Inventario, POS y Facturación adaptados, módulos custom de precios y cuentas corrientes, POS rehecho para operar por teclado, y despliegue en VPS con Docker, Nginx, SSL y backups automáticos.",
      en: "A centralized Odoo 18 Community rollout: unified catalog with per-branch stock, adapted Sales, Purchase, Inventory, POS and Invoicing modules, custom pricing and store-credit modules, a POS reworked for keyboard-only operation, and a VPS deployment with Docker, Nginx, SSL and automated backups.",
    },
    impact: [
      { v: "10.000+", k: { es: "productos migrados", en: "products migrated" }, sub: { es: "Catálogo limpiado y normalizado", en: "Catalog cleaned and normalized" } },
      { v: "2 → 1", k: { es: "catálogos unificados", en: "catalogs unified" }, sub: { es: "Stock diferenciado por sucursal", en: "Per-branch stock kept separate" } },
      { v: "3", k: { es: "usuarios capacitados", en: "users trained" }, sub: { es: "Transición en paralelo, sin frenar la operación", en: "Parallel transition, operation never stopped" } },
    ],
    stack: ["Odoo 18 Community", "Python", "XML", "JavaScript", "PostgreSQL", "Docker", "Nginx", "VPS", "SSL"],
    security: ["Acceso por roles de Odoo", "SSL con certificado propio", "Backups automáticos en Google Drive", "Entorno local separado del de producción"],
    accent: "#c084fc",
  },
  {
    id: "medreports",
    n: "02",
    year: "2024",
    status: { es: "En producción", en: "Live" },
    statusKey: "live",
    title: { es: "Sistema de Gestión de Informes Médicos", en: "Medical Reports Management System" },
    tagline: {
      es: "Informes médicos digitales, plantillas reutilizables, portal de pacientes 24/7.",
      en: "Digital medical reports, reusable templates, 24/7 patient portal.",
    },
    sector: { es: "Salud", en: "Healthcare" },
    role: { es: "Fullstack · Análisis · Arquitectura · Deploy", en: "Fullstack · Discovery · Architecture · Deploy" },
    problem: {
      es: "Informes médicos manuales en Word, sin estructura. Archivos dispersos en cada PC. Los pacientes tenían que ir físicamente al centro a retirar sus estudios.",
      en: "Manual medical reports in Word, no structure. Files scattered across local PCs. Patients had to physically visit the clinic to pick up their studies.",
    },
    solution: {
      es: "Plataforma fullstack con panel médico, plantillas reutilizables, generación de PDFs con firma digital, portal de pacientes con acceso 24/7 y dashboard administrativo.",
      en: "Fullstack platform with a clinician panel, reusable templates, signed-PDF generation, a 24/7 patient portal and an admin dashboard.",
    },
    impact: [
      { v: "80%", k: { es: "menos tiempo por informe", en: "less time per report" }, sub: { es: "15 min → 3 min", en: "15 min → 3 min" } },
      { v: "24/7", k: { es: "portal pacientes", en: "patient portal" }, sub: { es: "Sin desplazamientos", en: "No commute" } },
      { v: "0", k: { es: "documentos perdidos", en: "documents lost" }, sub: { es: "Trazabilidad total", en: "Full audit" } },
    ],
    stack: ["Next.js", "TypeScript", "React", "Tailwind", "NestJS", "Prisma", "PostgreSQL", "AWS S3", "pdfmake", "Zod", "Zustand", "JWT"],
    security: ["JWT + Cookies HTTPOnly", "reCAPTCHA", "AWS S3 con URLs firmadas", "RBAC por endpoint (NestJS Guards)", "Verificación SMS (2026)"],
    accent: "#7ab87a",
  },
  {
    id: "tutiendaweb",
    n: "03",
    year: "2024",
    status: { es: "En producción · SaaS", en: "Live · SaaS" },
    statusKey: "live",
    title: { es: "TuTiendaWeb", en: "TuTiendaWeb" },
    tagline: {
      es: "SaaS multi-tenant para comercios: productos, ventas, clientes y pedidos por WhatsApp.",
      en: "Multi-tenant SaaS for merchants: products, sales, customers and WhatsApp orders.",
    },
    sector: { es: "Retail · SaaS", en: "Retail · SaaS" },
    role: { es: "Fundador técnico · Fullstack · Producto", en: "Technical founder · Fullstack · Product" },
    problem: {
      es: "Comercios pequeños sin web ni canal de venta digital, dependientes de redes sociales y notas en papel para gestionar productos y pedidos.",
      en: "Small merchants without a web presence or digital sales channel, relying on social media and paper notes to manage products and orders.",
    },
    solution: {
      es: "SaaS multi-tenant: cada comercio tiene su tienda, panel de gestión, pedidos por WhatsApp, cobros con MercadoPago y reportes en PDF/Excel.",
      en: "Multi-tenant SaaS: each merchant gets a storefront, admin panel, WhatsApp orders, MercadoPago payments and PDF/Excel reporting.",
    },
    impact: [
      { v: "3+", k: { es: "comercios activos", en: "active merchants" }, sub: { es: "Ventas reales en producción", en: "Real sales in production" } },
      { v: "100%", k: { es: "self-service", en: "self-service" }, sub: { es: "Onboarding sin intervención", en: "Hands-off onboarding" } },
      { v: "WA", k: { es: "canal nativo de pedidos", en: "native order channel" }, sub: { es: "Sin fricción para el cliente final", en: "Zero friction for end customers" } },
    ],
    stack: ["Next.js", "TypeScript", "Firebase", "Firestore", "Tailwind", "ShadCN", "Vercel", "MercadoPago API", "Zustand", "Zod"],
    security: ["Firebase Auth", "Reglas Firestore por tenant", "Webhooks MP con firma HMAC", "Variables de entorno en Vercel"],
    accent: "#d9a566",
  },
  {
    id: "agenda-mecanico",
    n: "04",
    year: "2024",
    status: { es: "En producción", en: "Live" },
    statusKey: "live",
    title: { es: "Automatización de Agenda — Taller Mecánico", en: "Workshop Scheduling Automation" },
    tagline: {
      es: "Flujo automatizado por WhatsApp para validar y confirmar turnos de taller.",
      en: "Automated WhatsApp flow to validate and confirm workshop appointments.",
    },
    sector: { es: "Servicios", en: "Services" },
    role: { es: "Automatización · Integración · Diseño de flujo", en: "Automation · Integration · Flow design" },
    problem: {
      es: "Gestión manual de turnos por WhatsApp. Errores de doble reserva, olvido de confirmaciones, 2 horas diarias del dueño dedicadas solo a coordinar.",
      en: "Manual scheduling over WhatsApp. Double bookings, missed confirmations, 2 hours of the owner's day spent only coordinating.",
    },
    solution: {
      es: "Flujo en n8n integrado a WhatsApp Business y Excel que valida disponibilidad, confirma, recuerda y registra cada turno automáticamente.",
      en: "n8n flow integrated with WhatsApp Business and Excel that validates availability, confirms, reminds and logs each appointment automatically.",
    },
    impact: [
      { v: "2 hs", k: { es: "diarias liberadas", en: "freed daily" }, sub: { es: "Tiempo recuperado para el trabajo real", en: "Time reclaimed for actual work" } },
      { v: "0", k: { es: "doble reservas", en: "double bookings" }, sub: { es: "Validación previa al confirmar", en: "Pre-validated before confirm" } },
      { v: "24/7", k: { es: "operativo", en: "uptime" }, sub: { es: "Sin intervención del dueño", en: "No owner intervention" } },
    ],
    stack: ["n8n", "WhatsApp Business API", "Excel"],
    security: ["Tokens API rotativos", "Validación en cada nodo del flujo"],
    accent: "#9aa9d4",
  },
];
