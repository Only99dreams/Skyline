import Lenis from "lenis";

let lenis: Lenis | null = null;
let frame = 0;

export function initLenis(): () => void {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return () => {};

  lenis = new Lenis({
    duration: 1.05,
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.4,
  });

  const raf = (time: number) => {
    lenis?.raf(time);
    frame = requestAnimationFrame(raf);
  };
  frame = requestAnimationFrame(raf);

  return () => {
    cancelAnimationFrame(frame);
    lenis?.destroy();
    lenis = null;
  };
}

export function scrollToId(href: string) {
  const selector = href.startsWith("#") ? href : `#${href}`;
  const target = document.querySelector<HTMLElement>(selector);
  if (!target) return;

  if (lenis) {
    lenis.scrollTo(target, { duration: 1.15 });
  } else {
    target.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  }
}

export function scrollToTop() {
  if (lenis) {
    lenis.scrollTo(0, { duration: 1.15 });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

export function lockScroll(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.body.style.overflow = locked ? "hidden" : "";
}
