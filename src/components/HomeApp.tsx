import { useState, useEffect } from "react";
import { PORTFOLIO_CONTENT } from "../lib/content";
import type { Lang, Theme } from "../lib/types";

import CustomCursor from "./CustomCursor";
import TopBar from "./TopBar";
import Hero from "./Hero";
import Marquee from "./Marquee";
import WorkSection from "./WorkSection";
import About from "./About";
import Process from "./Process";
import Stack from "./Stack";
import Credentials from "./Credentials";
import Availability from "./Availability";
import Contact from "./Contact";
import Footer from "./Footer";
import Drawer from "./Drawer";

export default function HomeApp() {
  const [lang, setLang] = useState<Lang>("es");
  const [theme, setTheme] = useState<Theme>("dark");
  const [drawerOpen, setDrawerOpen] = useState<string | null>(null);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
  }, [lang]);

  const t = PORTFOLIO_CONTENT[lang];

  return (
    <>
      <CustomCursor />
      <TopBar
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        t={t}
      />
      <main className="main grid-bg">
        <Hero t={t} lang={lang} />
        <Marquee lang={lang} />
        <WorkSection t={t} lang={lang} onOpen={setDrawerOpen} />
        <About t={t} lang={lang} />
        <Process t={t} />
        <Stack t={t} lang={lang} />
        <Credentials t={t} />
        <Availability t={t} lang={lang} />
        <Contact t={t} lang={lang} />
      </main>
      <Footer t={t} />
      <Drawer
        openId={drawerOpen}
        onClose={() => setDrawerOpen(null)}
        lang={lang}
        t={t}
      />
    </>
  );
}
