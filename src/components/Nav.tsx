import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { NAV } from "../content";
import { lockScroll, scrollToId, scrollToTop } from "../lib/lenis";
import { cn } from "../lib/utils";
import { Magnetic } from "./Magnetic";
import { Marquee } from "./Marquee";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const previous = document.activeElement as HTMLElement | null;
    const timer = setTimeout(() => closeRef.current?.focus(), 60);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", onKeyDown);
      lockScroll(false);
      if (previous && previous !== document.body) previous.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    window.setTimeout(() => scrollToId(href), 80);
  };

  const goTop = () => {
    setOpen(false);
    window.setTimeout(() => scrollToTop(), 80);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[100] transition-colors duration-500",
          scrolled
            ? "border-b border-white/10 bg-ink/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="container-x flex h-20 items-center justify-between gap-6 lg:h-24">
          <button
            type="button"
            onClick={goTop}
            className="group flex shrink-0 items-center"
            aria-label="Skyline Engineering & Construction — back to top"
          >
            <span className="inline-flex bg-paper px-1.5 py-1 transition-transform duration-500 group-hover:-rotate-2">
              <img
                src="./logo.png"
                alt="Skyline Engineering & Construction"
                width="302"
                height="260"
                className="h-10 w-auto lg:h-11"
              />
            </span>
          </button>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-5 xl:gap-8">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToId(item.href);
                    }}
                    className="label link-line py-2 text-[0.68rem] text-paper/75 transition-colors hover:text-paper"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Magnetic className="hidden sm:inline-flex">
              <a
                href="#quote"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToId("#quote");
                }}
                className="group inline-flex h-11 items-center gap-2 bg-acid px-5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:bg-paper"
              >
                Get a quote
                <ArrowUpRight
                  className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </a>
            </Magnetic>

            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label="Open menu"
              className="flex size-11 flex-col items-center justify-center gap-[6px] border border-white/25 text-paper transition-colors hover:border-acid hover:text-acid lg:hidden"
            >
              <span className="block h-px w-5 bg-current" aria-hidden="true" />
              <span className="block h-px w-5 bg-current" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[105] flex flex-col bg-ink text-paper lg:hidden"
          >
            <div className="container-x flex h-20 shrink-0 items-center justify-between border-b border-white/10">
              <button
                type="button"
                onClick={goTop}
                className="inline-flex bg-paper px-1.5 py-1"
                aria-label="Skyline — back to top"
              >
                <img
                  src="./logo.png"
                  alt=""
                  width="302"
                  height="260"
                  className="h-10 w-auto"
                />
              </button>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                className="flex size-11 items-center justify-center border border-white/25 transition-colors hover:border-acid hover:text-acid"
                aria-label="Close menu"
              >
                <X className="size-5" strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>

            <div className="container-x flex flex-1 flex-col justify-between overflow-y-auto py-8">
              <nav aria-label="Mobile primary">
                <ul>
                  {NAV.map((item, index) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.08 + index * 0.055,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="border-b border-white/10"
                    >
                      <a
                        href={item.href}
                        onClick={(event) => {
                          event.preventDefault();
                          go(item.href);
                        }}
                        className="group flex items-baseline justify-between gap-6 py-4"
                      >
                        <span className="display text-[clamp(2.35rem,9.5vw,3.6rem)] transition-colors group-hover:text-acid">
                          {item.label}
                        </span>
                        <span className="label text-paper/60" aria-hidden="true">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="mt-10">
                <button
                  type="button"
                  onClick={() => go("#quote")}
                  className="flex w-full items-center justify-between bg-acid px-6 py-5 text-left font-display text-xl font-semibold text-ink"
                >
                  Start your project
                  <ArrowUpRight className="size-6" aria-hidden="true" />
                </button>
                <p className="label mt-4 text-paper/60">
                  Free consultation · Clear quote · No obligation
                </p>
              </div>
            </div>

            <Marquee
              items={["Beautiful homes", "Honest prices", "Built to last"]}
              className="border-b-0"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
