export interface CsConstraint {
  id: string;
  title: string;
  body: string;
}

export interface CsDecision {
  n: string;
  t: string;
  body: string;
  chose: string;
  reason: string;
}

export interface CsProblem {
  n: string;
  t: string;
  d: string;
}

export interface CsImpactRow {
  before: string;
  after: string;
  k: string;
}

export interface CsScreenshot {
  src: string;
  caption: string;
  group?: string;
  groupDesc?: string;
}

export interface CsStackGroup {
  k: string;
  v: string[];
}

export interface CaseStudyData {
  duration: string;
  team: string;
  context: { title: string; body: string; bullets: string[] };
  problems: CsProblem[];
  constraints: CsConstraint[];
  stackGroups: CsStackGroup[];
  decisions: CsDecision[];
  challenges: string[];
  impactRows: CsImpactRow[];
  learnings: string[];
  screenshots?: CsScreenshot[];
}

export const CASE_STUDIES: Record<string, { es: CaseStudyData; en: CaseStudyData }> = {
  medreports: {
    es: {
      duration: "2024 – Presente",
      team: "Solo developer + radióloga",
      context: {
        title: "Una radióloga con 40+ plantillas Word dispersas y pacientes sin acceso digital.",
        body: "El cliente es una médica especialista en diagnóstico por imagen. Su flujo de trabajo dependía de documentos Word duplicados, archivos guardados en una sola PC y entrega de resultados en mostrador. Los informes tardaban, los pacientes esperaban y cualquier fallo de hardware podía significar perder el historial completo.",
        bullets: [
          "Sin trazabilidad de versiones ni firma verificable.",
          "Pacientes sin acceso digital a estudios previos.",
          "10–20 minutos por informe escribiendo estructura que siempre era la misma.",
        ],
      },
      problems: [
        { n: "01", t: "Tiempo del profesional", d: "15 minutos promedio por informe, mayormente formateando estructura repetitiva, no diagnosticando." },
        { n: "02", t: "Acceso del paciente", d: "Entrega solo presencial en horario administrativo. Si el paciente necesitaba el informe a las 21hs o un fin de semana, esperaba." },
        { n: "03", t: "Integridad documental", d: "Archivos en una sola PC local. Sin backup, sin historial ordenado, sin firma verificable." },
      ],
      constraints: [
        { id: "A", title: "Continuidad", body: "El equipo no podía parar de operar durante la transición al nuevo sistema." },
        { id: "B", title: "Seguridad", body: "Datos de salud: auth fuerte, URLs no-públicas, cookies HTTPOnly, RBAC por endpoint." },
        { id: "C", title: "Costo", body: "Operación mensual baja: stack pago-por-uso, S3 con URLs firmadas de TTL corto." },
        { id: "D", title: "Curva de aprendizaje", body: "El panel debía ser usable por la médica sin training previo. UX simple, 0 terminología técnica." },
      ],
      stackGroups: [
        { k: "Frontend", v: ["Next.js (App Router)", "React 18", "TypeScript", "Tailwind", "Zustand", "Zod"] },
        { k: "Backend", v: ["NestJS", "Prisma ORM", "PostgreSQL", "JWT + Cookies HTTPOnly", "Guards RBAC"] },
        { k: "Storage", v: ["AWS S3", "Signed URLs (TTL corto)", "pdfmake"] },
        { k: "Seguridad", v: ["reCAPTCHA en login", "Rate limit", "Audit log", "Verificación SMS"] },
      ],
      decisions: [
        {
          n: "A·01",
          t: "NestJS para el backend, no Express puro",
          body: "El sistema tiene múltiples entidades (pacientes, informes, plantillas, tipos de estudio, médicos) con relaciones entre sí. Necesitaba Guards, Pipes e Interceptors sin armarlos desde cero.",
          chose: "NestJS con inyección de dependencias",
          reason: "Estructura modular nativa, decoradores para RBAC, escalable sin deuda técnica.",
        },
        {
          n: "A·02",
          t: "S3 con URLs firmadas, no buckets públicos",
          body: "Los PDFs médicos son datos sensibles. Ningún archivo debe tener URL pública ni predecible.",
          chose: "Pre-signed URLs con TTL de 15 min",
          reason: "Auth en la app + acceso temporal al asset. URL filtrada o guardada en historial se invalida sola.",
        },
        {
          n: "A·03",
          t: "Auth con cookies HTTPOnly, no localStorage",
          body: "Datos de salud con múltiples roles. El riesgo de XSS en localStorage no era aceptable.",
          chose: "JWT en cookie HTTPOnly + reCAPTCHA en login",
          reason: "Cookies HTTPOnly son inaccesibles desde JavaScript. Inmune a ataques XSS que intentan robar tokens.",
        },
      ],
      challenges: [
        "Modelo de plantillas con campos dinámicos. Cada tipo de estudio (radiografía vs. ecografía vs. TAC) tiene estructura diferente. Diseñé el schema con TemplateField que soporta tipos text, date, number, select — el médico crea variantes sin pasar por código.",
        "PDF con firma digital generado en el servidor. Usé pdfmake en el backend de NestJS para generar el PDF completo server-side, embebiendo la imagen de firma como base64. El documento clínico final no requiere post-procesamiento manual.",
        "Acceso público por token único sin cuenta de paciente. El médico puede compartir un informe con un link — el paciente lo abre sin registrarse. Implementé tokens de un solo uso con TTL configurable que se invalidan después de N usos o X tiempo.",
      ],
      impactRows: [
        { before: "15 min", after: "3 min", k: "Tiempo por informe" },
        { before: "Solo presencial", after: "24/7", k: "Acceso del paciente" },
        { before: "Archivos en desktop", after: "Centralizado + auditado", k: "Integridad documental" },
        { before: "Cuello de botella en recepción", after: "0 entregas físicas", k: "Carga operativa" },
      ],
      learnings: [
        "Empezar siempre con el flujo de salida (el PDF firmado) y modelar hacia atrás. Cuando el final está claro, el resto se ordena.",
        "El cliente médico no quiere features: quiere menos clicks. Cada feature nueva tenía que reducir tiempo en pantalla, no agregarlo.",
        "La seguridad no es el final del proyecto. Cada decisión de auth, storage o logs abre o cierra puertas que cuestan 5x arreglar después.",
      ],
      screenshots: [
        { src: "/imagenes-gestion-medica/Principal.png", caption: "Vista principal del sistema", group: "Panel de gestión médica", groupDesc: "El panel del médico centraliza pacientes, informes y plantillas. Todo desde una sola interfaz, sin archivos sueltos ni Word." },
        { src: "/imagenes-gestion-medica/Dashboard.png", caption: "Dashboard médico", group: "Panel de gestión médica" },
        { src: "/imagenes-gestion-medica/Plantillas.png", caption: "Gestión de plantillas", group: "Panel de gestión médica" },
        { src: "/imagenes-gestion-medica/Informes.png", caption: "Lista de informes", group: "Panel de gestión médica" },
        { src: "/imagenes-gestion-medica/Informe-ejemplo.png", caption: "Ejemplo de informe generado — PDF con firma digital", group: "Generación de PDFs" , groupDesc: "El informe se genera en el servidor con pdfmake: firma digital incrustada, número de protocolo y datos del paciente. Descargable directamente desde el portal." },
      ],
    },
    en: {
      duration: "2024 – Present",
      team: "Solo developer + radiologist",
      context: {
        title: "A radiologist with 40+ scattered Word templates and no digital patient access.",
        body: "The client is a diagnostic imaging specialist. Her workflow relied on duplicated Word documents, files stored on a single PC and in-person result handoffs. Reports took time, patients waited, and a hardware failure could mean losing the entire patient history.",
        bullets: [
          "No version tracking, no verifiable signature.",
          "Patients had no digital access to past studies.",
          "10–20 minutes per report writing structure that was always the same.",
        ],
      },
      problems: [
        { n: "01", t: "Clinician time", d: "15 minutes on average per report, mostly formatting repetitive structure — not diagnosing." },
        { n: "02", t: "Patient access", d: "Pickup only in person during admin hours. If a patient needed the report at 9pm or on a weekend, they waited." },
        { n: "03", t: "Document integrity", d: "Files on a single local PC. No backup, no ordered history, no verifiable signature." },
      ],
      constraints: [
        { id: "A", title: "Continuity", body: "The team couldn't stop operating during the transition to the new system." },
        { id: "B", title: "Security", body: "Health data: strong auth, non-public URLs, HTTPOnly cookies, RBAC per endpoint." },
        { id: "C", title: "Cost", body: "Low monthly run rate: pay-per-use stack, S3 with short-TTL signed URLs." },
        { id: "D", title: "Learning curve", body: "The panel had to be usable by the clinician with no prior training. Simple UX, zero technical terminology." },
      ],
      stackGroups: [
        { k: "Frontend", v: ["Next.js (App Router)", "React 18", "TypeScript", "Tailwind", "Zustand", "Zod"] },
        { k: "Backend", v: ["NestJS", "Prisma ORM", "PostgreSQL", "JWT + HTTPOnly Cookies", "RBAC Guards"] },
        { k: "Storage", v: ["AWS S3", "Signed URLs (short TTL)", "pdfmake"] },
        { k: "Security", v: ["reCAPTCHA on login", "Rate limiting", "Audit log", "SMS verification"] },
      ],
      decisions: [
        {
          n: "A·01",
          t: "NestJS for the backend, not plain Express",
          body: "The system has multiple entities (patients, reports, templates, study types, clinicians) with relationships. I needed Guards, Pipes and Interceptors without building them from scratch.",
          chose: "NestJS with dependency injection",
          reason: "Native modular structure, decorators for RBAC, scalable without technical debt.",
        },
        {
          n: "A·02",
          t: "Signed S3 URLs, not public buckets",
          body: "Medical PDFs are sensitive data. No file should have a public or predictable URL.",
          chose: "Pre-signed URLs with 15-min TTL",
          reason: "Auth in the app + temporary asset access. A leaked or cached URL becomes invalid on its own.",
        },
        {
          n: "A·03",
          t: "Auth via HTTPOnly cookies, not localStorage",
          body: "Health data with multiple roles. XSS risk with localStorage was not acceptable.",
          chose: "JWT in HTTPOnly cookie + reCAPTCHA on login",
          reason: "HTTPOnly cookies are inaccessible from JavaScript — immune to XSS token-theft attacks.",
        },
      ],
      challenges: [
        "Templates with dynamic fields. Each study type (X-ray vs. ultrasound vs. CT) has a different structure. I designed a schema with TemplateField supporting text, date, number, select types — the clinician creates variants without touching code.",
        "Server-side PDF with digital signature. I used pdfmake in the NestJS backend to generate the full PDF server-side, embedding the signature image as base64. The final clinical document requires no manual post-processing.",
        "Public access via single-use token without a patient account. The clinician can share a report with a link — the patient opens it without registering. I implemented single-use tokens with configurable TTL that expire after N uses or X time.",
      ],
      impactRows: [
        { before: "15 min", after: "3 min", k: "Time per report" },
        { before: "In-person only", after: "24/7", k: "Patient access" },
        { before: "Files on desktop", after: "Centralized + audited", k: "Document integrity" },
        { before: "Reception bottleneck", after: "0 in-person handoffs", k: "Operational load" },
      ],
      learnings: [
        "Always start from the output flow (the signed PDF) and model backwards. When the end is clear, everything else snaps into place.",
        "The clinician doesn't want features — they want fewer clicks. Every new feature had to reduce screen time, not add to it.",
        "Security isn't the end of the project. Every auth, storage or logging decision opens or closes doors that cost 5x to fix later.",
      ],
      screenshots: [
        { src: "/imagenes-gestion-medica/Principal.png", caption: "System main view", group: "Clinical management panel", groupDesc: "The clinician panel centralizes patients, reports and templates in one interface — no loose files, no Word." },
        { src: "/imagenes-gestion-medica/Dashboard.png", caption: "Medical dashboard", group: "Clinical management panel" },
        { src: "/imagenes-gestion-medica/Plantillas.png", caption: "Template management", group: "Clinical management panel" },
        { src: "/imagenes-gestion-medica/Informes.png", caption: "Reports list", group: "Clinical management panel" },
        { src: "/imagenes-gestion-medica/Informe-ejemplo.png", caption: "Generated report — PDF with digital signature", group: "PDF generation", groupDesc: "Reports are generated server-side with pdfmake: embedded digital signature, protocol number and patient data. Directly downloadable from the patient portal." },
      ],
    },
  },

  tutiendaweb: {
    es: {
      duration: "Jun 2024 – Presente",
      team: "Founder + developer (solo)",
      context: {
        title: "Comerciantes del interior argentino gestionando pedidos por WhatsApp y papel.",
        body: "Los pequeños y medianos comercios de proximidad operaban con un flujo completamente manual: tomaban pedidos por WhatsApp a mano, respondían uno por uno y anotaban en papel. Sin catálogo digital, sin datos de ventas, sin disponibilidad fuera de horario. Construí una plataforma SaaS multi-tenant que digitalizó todo ese flujo.",
        bullets: [
          "2–3 horas diarias respondiendo consultas y anotando pedidos manualmente.",
          "Sin catálogo digital: el cliente preguntaba qué había y el comerciante respondía uno por uno.",
          "Sin datos de negocio: no sabían cuánto vendían por semana ni qué producto rotaba más.",
        ],
      },
      problems: [
        { n: "01", t: "Tiempo operativo", d: "2–3 horas diarias respondiendo mensajes y coordinando pedidos por WhatsApp. Tiempo robado al trabajo real." },
        { n: "02", t: "Ventas perdidas fuera de horario", d: "Si el cliente consultaba a las 22hs y el comerciante no estaba disponible, el pedido se perdía o se enfriaba." },
        { n: "03", t: "Sin datos de negocio", d: "Sin métricas de ventas. Calcular los ingresos del mes implicaba revisar chats o cuadernos. Decisiones a ciegas." },
      ],
      constraints: [
        { id: "A", title: "Sin equipo", body: "Proyecto bootstrapped sin equipo. Cada decisión técnica tenía que maximizar el producto entregado por hora de desarrollo." },
        { id: "B", title: "Adopción inmediata", body: "El comerciante no puede cambiar su canal de comunicación. La solución debía integrarse a WhatsApp, no reemplazarlo." },
        { id: "C", title: "Costo de infraestructura", body: "SaaS en etapa MVP: cero costo fijo de servidor, todo serverless o BaaS hasta demostrar product-market fit." },
        { id: "D", title: "Aislamiento multi-tenant", body: "Cada comercio ve solo sus propios datos. El aislamiento tiene que ser real, no solo en la UI." },
      ],
      stackGroups: [
        { k: "Frontend", v: ["Next.js 14 (App Router)", "React", "TypeScript", "Tailwind", "ShadCN", "Zustand", "Zod"] },
        { k: "BaaS", v: ["Firebase Auth", "Firestore", "Firebase Storage"] },
        { k: "Pagos", v: ["Mercado Pago API", "Webhooks con firma HMAC"] },
        { k: "Deploy", v: ["Vercel", "CI/CD automático desde GitHub"] },
      ],
      decisions: [
        {
          n: "B·01",
          t: "Firebase, no PostgreSQL propio en servidor",
          body: "Para un SaaS MVP sin equipo, Firebase eliminó semanas de trabajo: auth integrada, real-time out-of-the-box, reglas de seguridad por documento, sin servidor a mantener.",
          chose: "Firebase (Firestore + Auth + Storage)",
          reason: "Infraestructura a cero costo hasta escalar. Reglas de Firestore validan en servidor el aislamiento entre tenants.",
        },
        {
          n: "B·02",
          t: "Mercado Pago, no Stripe",
          body: "Mercado argentino: los comercios ya conocen y usan MP, acepta ARS directamente, y la tasa de adopción era cero — ya tienen cuenta.",
          chose: "Mercado Pago con suscripciones + webhooks",
          reason: "Stripe habría generado fricción de onboarding. Con MP, el comerciante se suscribe en 2 clicks.",
        },
        {
          n: "B·03",
          t: "PDFs generados en el cliente, no en servidor",
          body: "Para reducir costos de infraestructura, los reportes se generan completamente en el cliente usando html2canvas + jsPDF y @react-pdf/renderer.",
          chose: "Generación client-side con jsPDF / @react-pdf",
          reason: "Cero costo de servidor adicional. Los reportes complejos usan @react-pdf/renderer para layout exacto.",
        },
      ],
      challenges: [
        "Flujo de pedidos por WhatsApp sin perder estructura. El desafío era que los pedidos llegaran al comerciante organizados. La tienda construye el pedido como objeto estructurado y al confirmar genera un mensaje de WhatsApp formateado automáticamente con nombre, productos, cantidades, precio total, forma de pago y dirección.",
        "Modelo de variantes de productos flexible en Firestore. Los comercios tienen productos con combinaciones arbitrarias (ropa: talle + color, bebidas: tamaño + sabor). Diseñé el schema con variantes como arrays de pares {atributo, valor} — cualquier tipo de comercio puede cargarlo sin modificar el modelo.",
        "Webhooks de Mercado Pago con verificación de firma. Los eventos de pago se verifican contra la firma HMAC que MP incluye en el header. Webhooks no firmados se descartan antes de tocar la base de datos.",
      ],
      impactRows: [
        { before: "2–3 hs/día en mensajería manual", after: "~80% menos tiempo operativo", k: "Tiempo de gestión" },
        { before: "Clientes perdidos fuera de horario", after: "Disponibilidad 24/7", k: "Ventas fuera de horario" },
        { before: "Sin datos — decisiones a ciegas", after: "Reportes PDF/Excel con un clic", k: "Métricas de negocio" },
        { before: "Catálogo inexistente o desactualizado", after: "Catálogo digital compartible por QR", k: "Canal de ventas" },
      ],
      learnings: [
        "El canal importa tanto como el producto. Integrar WhatsApp en lugar de reemplazarlo fue la decisión que hizo viable la adopción. Un canal nuevo habría triplicado el tiempo de onboarding.",
        "Multi-tenancy desde el día uno, no después. Las reglas de Firestore por UID se definen al inicio. Agregar aislamiento después de tener datos es costoso y riesgoso.",
        "El PDF más útil no es el más lindo, es el que el comerciante puede entregar al cliente sin editar. Diseñé los reportes con datos reales desde el MVP.",
      ],
      screenshots: [
        { src: "/imagenes-tutiendaweb/home-dashboard.jpg", caption: "Dashboard principal", group: "Panel de administración", groupDesc: "El comerciante gestiona productos, clientes, ventas y reportes desde su panel privado. Acceso con email y contraseña, datos aislados por tenant." },
        { src: "/imagenes-tutiendaweb/productos.jpg", caption: "Gestión de productos", group: "Panel de administración" },
        { src: "/imagenes-tutiendaweb/producto-drawer.jpg", caption: "Detalle de producto con variantes", group: "Panel de administración" },
        { src: "/imagenes-tutiendaweb/dashboard-ventas.jpg", caption: "Dashboard de ventas y métricas", group: "Panel de administración" },
        { src: "/imagenes-tutiendaweb/qr.jpg", caption: "Código QR único del comercio", group: "Panel de administración" },
        { src: "/imagenes-tutiendaweb/tienda-home.jpg", caption: "Home de la tienda", group: "Tienda pública", groupDesc: "Vista del cliente final: catálogo navegable, búsqueda y filtros. El cliente arma su pedido y al confirmar recibe un mensaje de WhatsApp formateado automáticamente." },
        { src: "/imagenes-tutiendaweb/tienda-productos.jpg", caption: "Catálogo de productos", group: "Tienda pública" },
        { src: "/imagenes-tutiendaweb/tienda-resumen.png", caption: "Resumen del pedido antes de confirmar", group: "Tienda pública" },
        { src: "/imagenes-tutiendaweb/tienda-boton-de-confirmar.png", caption: "Confirmación del pedido", group: "Tienda pública" },
        { src: "/imagenes-tutiendaweb/tienda-mensaje-de-wp.png", caption: "Mensaje de WhatsApp generado automáticamente", group: "Tienda pública" },
      ],
    },
    en: {
      duration: "Jun 2024 – Present",
      team: "Founder + developer (solo)",
      context: {
        title: "Small merchants managing orders over WhatsApp and paper notes.",
        body: "Small and medium proximity stores operated with a fully manual workflow: taking orders over WhatsApp by hand, replying one by one and writing things down on paper. No digital catalog, no sales data, no availability outside business hours. I built a multi-tenant SaaS that digitized the entire flow.",
        bullets: [
          "2–3 hours a day manually responding to queries and logging orders.",
          "No digital catalog: customers asked what was available and merchants replied one item at a time.",
          "No business data: no idea of weekly sales or which products moved fastest.",
        ],
      },
      problems: [
        { n: "01", t: "Operational time", d: "2–3 hours a day responding to WhatsApp messages and coordinating orders. Time stolen from actual work." },
        { n: "02", t: "Lost sales off-hours", d: "If a customer asked at 10pm and the merchant was unavailable, the order was lost or went cold." },
        { n: "03", t: "No business data", d: "No sales metrics. Calculating monthly revenue meant scrolling through chats or checking notebooks. Blind decisions." },
      ],
      constraints: [
        { id: "A", title: "No team", body: "Bootstrapped project, no team. Every technical decision had to maximize product delivered per hour of development." },
        { id: "B", title: "Instant adoption", body: "Merchants can't change their communication channel. The solution had to integrate with WhatsApp, not replace it." },
        { id: "C", title: "Infrastructure cost", body: "MVP-stage SaaS: zero fixed server cost, all serverless or BaaS until product-market fit is proven." },
        { id: "D", title: "Multi-tenant isolation", body: "Each merchant sees only their own data. Isolation must be real, not just at the UI level." },
      ],
      stackGroups: [
        { k: "Frontend", v: ["Next.js 14 (App Router)", "React", "TypeScript", "Tailwind", "ShadCN", "Zustand", "Zod"] },
        { k: "BaaS", v: ["Firebase Auth", "Firestore", "Firebase Storage"] },
        { k: "Payments", v: ["Mercado Pago API", "HMAC-signed webhooks"] },
        { k: "Deploy", v: ["Vercel", "Auto CI/CD from GitHub"] },
      ],
      decisions: [
        {
          n: "B·01",
          t: "Firebase, not a self-managed PostgreSQL server",
          body: "For an MVP SaaS without a team, Firebase eliminated weeks of work: integrated auth, real-time out of the box, document-level security rules, no server to maintain.",
          chose: "Firebase (Firestore + Auth + Storage)",
          reason: "Zero infrastructure cost until scale. Firestore rules validate tenant isolation server-side.",
        },
        {
          n: "B·02",
          t: "Mercado Pago, not Stripe",
          body: "Argentine market: merchants already know and use MP, it accepts ARS directly, and the adoption rate was zero — they already have an account.",
          chose: "Mercado Pago with subscriptions + webhooks",
          reason: "Stripe would have added onboarding friction. With MP, the merchant subscribes in 2 clicks.",
        },
        {
          n: "B·03",
          t: "Client-side PDF generation, not server-side",
          body: "To reduce infrastructure costs, reports are generated entirely client-side using html2canvas + jsPDF and @react-pdf/renderer.",
          chose: "Client-side with jsPDF / @react-pdf",
          reason: "Zero additional server cost. Complex reports use @react-pdf/renderer for precise layouts.",
        },
      ],
      challenges: [
        "WhatsApp order flow without losing structure. The challenge was having orders arrive to the merchant organized, not as free text. The store builds the order as a structured object and on confirm generates a formatted WhatsApp message with name, products, quantities, total, payment method and address.",
        "Flexible product variant model in Firestore. Merchants have products with arbitrary combinations (clothing: size + color, drinks: size + flavor). I designed the schema with variants as arrays of {attribute, value} pairs — any merchant type can load it without modifying the model.",
        "Mercado Pago webhook signature verification. Payment events are verified against the HMAC signature MP includes in the header. Unsigned webhooks are discarded before touching the database.",
      ],
      impactRows: [
        { before: "2–3 hrs/day manual messaging", after: "~80% less operational time", k: "Management time" },
        { before: "Lost customers off-hours", after: "24/7 availability", k: "Off-hours sales" },
        { before: "No data — blind decisions", after: "PDF/Excel reports in one click", k: "Business metrics" },
        { before: "No or outdated catalog", after: "Digital catalog shareable by QR", k: "Sales channel" },
      ],
      learnings: [
        "The channel matters as much as the product. Integrating WhatsApp instead of replacing it was the decision that made adoption viable. A new channel would have tripled onboarding time.",
        "Multi-tenancy from day one, not later. Firestore rules per UID are defined upfront. Adding isolation after you have data is costly and risky.",
        "The most useful PDF is not the prettiest one — it's the one the merchant can hand to a customer without editing. I designed reports with real data from the MVP.",
      ],
      screenshots: [
        { src: "/imagenes-tutiendaweb/home-dashboard.jpg", caption: "Main dashboard", group: "Admin panel", groupDesc: "The merchant manages products, customers, sales and reports from their private panel. Email auth, tenant-isolated data." },
        { src: "/imagenes-tutiendaweb/productos.jpg", caption: "Product management", group: "Admin panel" },
        { src: "/imagenes-tutiendaweb/producto-drawer.jpg", caption: "Product detail with variants", group: "Admin panel" },
        { src: "/imagenes-tutiendaweb/dashboard-ventas.jpg", caption: "Sales and metrics dashboard", group: "Admin panel" },
        { src: "/imagenes-tutiendaweb/qr.jpg", caption: "Unique merchant QR code", group: "Admin panel" },
        { src: "/imagenes-tutiendaweb/tienda-home.jpg", caption: "Store home", group: "Public storefront", groupDesc: "Customer-facing view: browsable catalog, search and filters. The customer builds their order and on confirm receives an automatically formatted WhatsApp message." },
        { src: "/imagenes-tutiendaweb/tienda-productos.jpg", caption: "Product catalog", group: "Public storefront" },
        { src: "/imagenes-tutiendaweb/tienda-resumen.png", caption: "Order summary before confirming", group: "Public storefront" },
        { src: "/imagenes-tutiendaweb/tienda-boton-de-confirmar.png", caption: "Order confirmation", group: "Public storefront" },
        { src: "/imagenes-tutiendaweb/tienda-mensaje-de-wp.png", caption: "Auto-generated WhatsApp message", group: "Public storefront" },
      ],
    },
  },

  "agenda-mecanico": {
    es: {
      duration: "2024 – 2025",
      team: "Solo developer + dueño del taller",
      context: {
        title: "Un taller mecánico cuyo negocio dependía 100% de la disponibilidad del dueño.",
        body: "El dueño de un taller mecánico tenía un problema silencioso pero costoso: cada turno requería su atención directa. Un cliente mandaba un WhatsApp, el dueño tenía que leer el mensaje, revisar si había lugar, responder, confirmar y anotarlo. Multiplicado por 10–15 turnos por día, eran entre 45 y 90 minutos diarios solo coordinando agenda — tiempo robado al trabajo real.",
        bullets: [
          "45–90 minutos diarios solo coordinando turnos por WhatsApp.",
          "Clientes sin respuesta fuera del horario comercial — muchos llamaban a otro taller.",
          "Sin sistema centralizado: doble booking, turnos olvidados, agenda mental.",
        ],
      },
      problems: [
        { n: "01", t: "El dueño como cuello de botella", d: "Si estaba debajo de un auto, los mensajes quedaban sin responder por horas. El negocio dependía de su disponibilidad personal." },
        { n: "02", t: "Clientes perdidos fuera de horario", d: "Sin respuesta a las 23hs o un domingo, el cliente simplemente llamaba a otro taller." },
        { n: "03", t: "Agenda manual sin sistema", d: "Sin visibilidad de la semana, fácil agendar dos personas para el mismo horario u olvidar un turno confirmado." },
      ],
      constraints: [
        { id: "A", title: "Costo operativo", body: "El cliente no quería pagar suscripción mensual a una plataforma SaaS de terceros. La solución tenía que ser sostenible sin costo fijo." },
        { id: "B", title: "Fricción de adopción", body: "El dueño no es técnico. La solución tenía que ser visible, entendible y ajustable por él mismo o cualquier técnico futuro." },
        { id: "C", title: "Canal existente", body: "El taller ya usaba WhatsApp y Excel. No había presupuesto ni voluntad de cambiar esos hábitos." },
        { id: "D", title: "Intervención mínima", body: "El flujo debía correr 24/7 sin intervención del dueño. Solo escalar los casos complejos a él." },
      ],
      stackGroups: [
        { k: "Orquestador", v: ["n8n self-hosted", "Workflow visual (sin código)"] },
        { k: "Canal", v: ["WhatsApp Business API", "Webhook receiver"] },
        { k: "Datos", v: ["Excel", "Integración directa vía n8n"] },
        { k: "Infra", v: ["Servidor propio", "0 costo de suscripción"] },
      ],
      decisions: [
        {
          n: "C·01",
          t: "n8n como orquestador, no Zapier/Make",
          body: "El cliente no quería quedar atado a una suscripción SaaS. n8n self-hosted elimina ese costo y la interfaz visual permite que el dueño entienda qué hace el sistema.",
          chose: "n8n self-hosted en servidor propio",
          reason: "Open source, interfaz visual, costo operativo mínimo, ajustable sin saber programar.",
        },
        {
          n: "C·02",
          t: "Excel para la agenda, no una base de datos nueva",
          body: "El taller ya usaba Excel. Integrarlo directamente eliminó el 100% de la fricción de adopción. Una base de datos nueva habría requerido migración y aprendizaje.",
          chose: "Excel vía integración directa en n8n",
          reason: "El criterio central fue: máximo impacto, mínima fricción. La solución técnica óptima no es la más sofisticada.",
        },
        {
          n: "C·03",
          t: "WhatsApp como único canal, no agregar otros",
          body: "Tanto el taller como sus clientes ya lo usaban para comunicarse. No hubo curva de aprendizaje para nadie.",
          chose: "WhatsApp Business API",
          reason: "Canal existente. Proponer Telegram o SMS habría generado fricción de adopción del lado de los clientes del taller.",
        },
      ],
      challenges: [
        "Clasificar la intención del mensaje. n8n recibe texto libre por WhatsApp y tiene que decidir si es una solicitud de turno o una consulta general. Implementé una clasificación por palabras clave y patrones de fecha/hora para distinguir ambos casos con alta precisión.",
        "Validación de disponibilidad en Excel. El workflow consulta la planilla, busca el horario solicitado y valida que no haya conflicto antes de confirmar. Si hay conflicto, ofrece el horario disponible más cercano.",
        "Escalado de casos complejos al dueño. Cuando el mensaje no encaja en el flujo estándar (cliente enojado, consulta técnica, reclamo), el sistema notifica al dueño directamente en lugar de responder mal.",
      ],
      impactRows: [
        { before: "45–90 min/día coordinando turnos", after: "~75% menos tiempo operativo", k: "Tiempo de gestión" },
        { before: "Sin respuesta fuera de horario", after: "24/7, 7 días a la semana", k: "Disponibilidad" },
        { before: "Doble booking y olvidos", after: "0 conflictos de agenda", k: "Errores de agenda" },
        { before: "Sin registro de consultas", after: "Historial automático completo", k: "Trazabilidad" },
      ],
      learnings: [
        "Automatizar no siempre significa construir desde cero. Elegí n8n porque el dueño puede entender visualmente qué hace el sistema. Elegí Excel porque ya lo usaba. La solución óptima es la que el cliente puede adoptar y mantener.",
        "La fricción de adopción es un riesgo técnico real. Si hubiera propuesto una app nueva, una base de datos nueva y un canal nuevo, el proyecto habría tardado el triple y probablemente no se hubiera adoptado.",
        "Trabajar con clientes no técnicos requiere entender el problema real, no el síntoma. El síntoma era 'mucho trabajo con los mensajes'. El problema real era 'el negocio depende de mi disponibilidad personal'.",
      ],
    },
    en: {
      duration: "2024 – 2025",
      team: "Solo developer + workshop owner",
      context: {
        title: "A mechanic's shop whose business depended 100% on the owner's personal availability.",
        body: "The workshop owner had a silent but costly problem: every appointment required his direct attention. A customer would send a WhatsApp, the owner had to read it, check if there was a slot, reply, confirm and write it down. Multiplied by 10–15 appointments a day, that was 45–90 minutes daily spent only on scheduling — time stolen from actual work.",
        bullets: [
          "45–90 minutes a day just coordinating appointments over WhatsApp.",
          "Customers with no response outside business hours — many just called another shop.",
          "No centralized system: double bookings, forgotten appointments, mental scheduling.",
        ],
      },
      problems: [
        { n: "01", t: "Owner as bottleneck", d: "If he was under a car, messages went unanswered for hours. The business depended on his personal availability." },
        { n: "02", t: "Lost customers off-hours", d: "No reply at 11pm or on a Sunday meant the customer simply called another shop." },
        { n: "03", t: "Manual scheduling without a system", d: "No visibility of the week, easy to double-book or forget a confirmed appointment." },
      ],
      constraints: [
        { id: "A", title: "Operational cost", body: "The client didn't want to pay a monthly SaaS subscription. The solution had to be sustainable with zero fixed cost." },
        { id: "B", title: "Adoption friction", body: "The owner is non-technical. The solution had to be visible, understandable and adjustable by him or any future technician." },
        { id: "C", title: "Existing channel", body: "The shop already used WhatsApp and Excel. No budget or willingness to change those habits." },
        { id: "D", title: "Minimal intervention", body: "The flow had to run 24/7 without owner intervention. Only escalate complex cases to him." },
      ],
      stackGroups: [
        { k: "Orchestrator", v: ["n8n self-hosted", "Visual workflow (no code)"] },
        { k: "Channel", v: ["WhatsApp Business API", "Webhook receiver"] },
        { k: "Data", v: ["Excel", "Direct integration via n8n"] },
        { k: "Infra", v: ["Own server", "0 subscription cost"] },
      ],
      decisions: [
        {
          n: "C·01",
          t: "n8n as orchestrator, not Zapier/Make",
          body: "The client didn't want to be tied to a SaaS subscription. n8n self-hosted eliminates that cost and the visual interface lets the owner understand what the system does.",
          chose: "n8n self-hosted on own server",
          reason: "Open source, visual interface, minimal operational cost, adjustable without coding.",
        },
        {
          n: "C·02",
          t: "Excel for scheduling, not a new database",
          body: "The shop already used Excel. Integrating it directly eliminated 100% of the adoption friction. A new database would have required migration and learning.",
          chose: "Excel via direct n8n integration",
          reason: "Core criterion: maximum impact, minimum friction. The optimal technical solution isn't the most sophisticated one.",
        },
        {
          n: "C·03",
          t: "WhatsApp as the only channel, no alternatives",
          body: "Both the shop and its customers already used it to communicate. There was no learning curve for anyone.",
          chose: "WhatsApp Business API",
          reason: "Existing channel. Proposing Telegram or SMS would have added friction on the customer side.",
        },
      ],
      challenges: [
        "Classifying message intent. n8n receives free text over WhatsApp and has to decide if it's an appointment request or a general inquiry. I implemented keyword and date/time pattern classification to distinguish both cases with high accuracy.",
        "Availability validation in Excel. The workflow queries the spreadsheet, finds the requested time slot and validates there's no conflict before confirming. If there's a conflict, it offers the nearest available slot.",
        "Escalating complex cases to the owner. When a message doesn't fit the standard flow (angry customer, technical question, complaint), the system notifies the owner directly instead of responding poorly.",
      ],
      impactRows: [
        { before: "45–90 min/day coordinating appointments", after: "~75% less operational time", k: "Management time" },
        { before: "No response off-hours", after: "24/7, 7 days a week", k: "Availability" },
        { before: "Double bookings and forgotten slots", after: "0 scheduling conflicts", k: "Scheduling errors" },
        { before: "No inquiry log", after: "Full automatic history", k: "Traceability" },
      ],
      learnings: [
        "Automation doesn't always mean building from scratch. I chose n8n because the owner can visually understand what the system does. I chose Excel because he already used it. The optimal solution is the one the client can adopt and maintain.",
        "Adoption friction is a real technical risk. If I had proposed a new app, a new database and a new channel, the project would have taken three times as long and probably never been adopted.",
        "Working with non-technical clients requires understanding the real problem, not the symptom. The symptom was 'too much work with messages'. The real problem was 'my business depends on my personal availability'.",
      ],
    },
  },
};
