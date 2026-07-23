export type Lang = "es" | "en";

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
  about: string;
  work: string;
  stack: string;
  contact: string;
  cv: string;
  /** Etiqueta accesible del <nav>, no se muestra en pantalla. */
  sections: string;
}

export interface HeroContent {
  name: string;
  degree: string;
  role: string;
  pitch: string;
  meta: {
    based: string;
    timezone: string;
    years: string;
  };
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
  image: string;
}

export interface PortfolioContent {
  nav: NavContent;
  hero: HeroContent;
  about: {
    eyebrow: string;
    body1: string;
    body2: string;
    body3: string;
    photoCaption: string;
  };
  work: {
    eyebrow: string;
    sub: string;
    openCase: string;
  };
  stack: {
    eyebrow: string;
    groups: StackGroup[];
  };
  credentials: {
    eyebrow: string;
    items: CredentialItem[];
  };
  contact: {
    eyebrow: string;
    title: string;
    sub: string;
    email: string;
    writeMe: string;
  };
  footer: {
    colofon: string;
    year: string;
    built: string;
  };
}
