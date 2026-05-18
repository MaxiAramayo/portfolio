export type Lang = "es" | "en";
export type Theme = "dark" | "light";

export interface BilingualString {
  es: string;
  en: string;
}

export interface ImpactMetric {
  v: string;
  k: BilingualString;
  sub?: BilingualString | string;
}

export interface Project {
  id: string;
  n: string;
  year: string;
  status: BilingualString;
  statusKey: "live" | "nda" | string;
  title: BilingualString;
  tagline: BilingualString;
  sector: BilingualString;
  role: BilingualString;
  problem: BilingualString;
  solution: BilingualString;
  impact: ImpactMetric[];
  stack: string[];
  security: string[];
  accent: string;
}

export interface NavContent {
  work: string;
  about: string;
  process: string;
  stack: string;
  credentials: string;
  contact: string;
  cv: string;
  hire: string;
}

export interface HeroContent {
  eyebrow: string;
  name: [string, string];
  tagline: string;
  tagline2: string;
  sub: string;
  ctaPrimary: string;
  ctaSecondary: string;
  meta: {
    based: string;
    timezone: string;
    years: string;
  };
}

export interface ProcessStep {
  n: string;
  t: string;
  d: string;
}

export interface StackGroup {
  k: string;
  v: string[];
}

export interface CredentialItem {
  type: string;
  name: string;
  issuer: string;
  year: string;
  status: string;
  note: string;
  image?: string;
}

export interface AvailabilityMode {
  k: string;
  d: string;
}

export interface PortfolioContent {
  nav: NavContent;
  hero: HeroContent;
  metrics: Array<{ value: string; label: string; note: string }>;
  about: {
    eyebrow: string;
    title: string;
    body1: string;
    body2: string;
    body3: string;
    photoCaption: string;
  };
  work: {
    eyebrow: string;
    title: string;
    sub: string;
    seeAll: string;
    expand: string;
    readCase: string;
  };
  process: {
    eyebrow: string;
    title: string;
    steps: ProcessStep[];
  };
  stack: {
    eyebrow: string;
    title: string;
    groups: StackGroup[];
  };
  credentials: {
    eyebrow: string;
    title: string;
    sub: string;
    items: CredentialItem[];
    addMore: string;
  };
  availability: {
    eyebrow: string;
    title: string;
    modes: AvailabilityMode[];
    location: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    sub: string;
    email: string;
    writeMe: string;
    copy: string;
    copied: string;
    cv: string;
  };
  footer: {
    colofon: string;
    year: string;
    built: string;
  };
  drawer: {
    summary: string;
    problem: string;
    solution: string;
    stack: string;
    role: string;
    impact: string;
    status: string;
    readMore: string;
    close: string;
  };
}
