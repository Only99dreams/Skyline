import { useCallback, useEffect, useState } from "react";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Designs } from "./components/Designs";
import { Showcase } from "./components/Showcase";
import { Upgrades } from "./components/Upgrades";
import { Principles } from "./components/Principles";
import { Process } from "./components/Process";
import { Quote } from "./components/Quote";
import { Footer } from "./components/Footer";
import { ScrollProgress } from "./components/ScrollProgress";
import { initLenis, scrollToId } from "./lib/lenis";

export default function App() {
  const [selectedUpgrades, setSelectedUpgrades] = useState<string[]>([]);
  const [savedLooks, setSavedLooks] = useState<string[]>([]);
  const [interest, setInterest] = useState("Not sure yet");

  useEffect(() => {
    const cleanup = initLenis();

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      event.preventDefault();
      scrollToId(href);
      window.history.replaceState(null, "", href);
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      cleanup();
    };
  }, []);

  const toggleUpgrade = useCallback((id: string) => {
    setSelectedUpgrades((current) =>
      current.includes(id)
        ? current.filter((upgrade) => upgrade !== id)
        : [...current, id],
    );
  }, []);

  const toggleLook = useCallback((id: string) => {
    setSavedLooks((current) =>
      current.includes(id)
        ? current.filter((look) => look !== id)
        : [...current, id],
    );
  }, []);

  const clearLooks = useCallback(() => setSavedLooks([]), []);

  return (
    <>
      <a
        href="#main"
        onClick={(event) => {
          event.preventDefault();
          const main = document.getElementById("main");
          main?.focus({ preventScroll: true });
          scrollToId("#main");
        }}
        className="fixed left-4 top-4 z-[130] -translate-y-24 bg-acid px-4 py-3 text-sm font-semibold text-ink focus:translate-y-0"
      >
        Skip to content
      </a>

      <ScrollProgress />
      <Nav />

      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Designs onEnquire={setInterest} />
        <Showcase
          saved={savedLooks}
          onToggleSave={toggleLook}
          onClearSaved={clearLooks}
          onEnquire={setInterest}
        />
        <Upgrades selected={selectedUpgrades} onToggle={toggleUpgrade} />
        <Principles />
        <Process />
        <Quote
          selected={selectedUpgrades}
          onToggle={toggleUpgrade}
          looks={savedLooks}
          onClearLooks={clearLooks}
          interest={interest}
          onInterestChange={setInterest}
        />
      </main>

      <Footer />
    </>
  );
}
