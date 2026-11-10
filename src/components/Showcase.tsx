import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  Bookmark,
  BookmarkCheck,
  ChevronLeft,
  ChevronRight,
  Images,
  Maximize2,
  Trash2,
  X,
} from "lucide-react";
import {
  SHOWCASE_CATEGORIES,
  SHOWCASE_ITEMS,
  type ShowcaseFilter,
  type ShowcaseItem,
  type ShowcaseSize,
} from "../content";
import { lockScroll, scrollToId } from "../lib/lenis";
import { cn } from "../lib/utils";
import { SectionIntro } from "./SectionIntro";
import { Reveal } from "./Reveal";
import { useToast } from "./Toast";

type ShowcaseProps = {
  saved: string[];
  onToggleSave: (id: string) => void;
  onClearSaved: () => void;
  onEnquire: (interest: string) => void;
};

const SIZE_CLASSES: Record<ShowcaseSize, string> = {
  standard: "col-span-1 row-span-1",
  wide: "col-span-2 row-span-1",
  tall: "col-span-1 row-span-2",
  large: "col-span-2 row-span-2",
};

export function Showcase({
  saved,
  onToggleSave,
  onClearSaved,
  onEnquire,
}: ShowcaseProps) {
  const [filter, setFilter] = useState<ShowcaseFilter>("All");
  const [activeId, setActiveId] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const showToast = useToast();

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const items = useMemo(
    () =>
      filter === "All"
        ? SHOWCASE_ITEMS
        : SHOWCASE_ITEMS.filter((item) => item.category === filter),
    [filter],
  );

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    SHOWCASE_ITEMS.forEach((item) => {
      map.set(item.category, (map.get(item.category) ?? 0) + 1);
    });
    return map;
  }, []);

  const activeIndex = activeId
    ? items.findIndex((item) => item.id === activeId)
    : -1;
  const activeItem = activeIndex >= 0 ? items[activeIndex] : null;
  const isOpen = activeItem !== null;

  const savedItems = useMemo(
    () => SHOWCASE_ITEMS.filter((item) => saved.includes(item.id)),
    [saved],
  );

  const step = useCallback(
    (direction: 1 | -1) => {
      if (items.length === 0) return;
      setActiveId((current) => {
        const index = items.findIndex((item) => item.id === current);
        if (index === -1) return items[0].id;
        const next = (index + direction + items.length) % items.length;
        return items[next].id;
      });
    },
    [items],
  );

  const openItem = (item: ShowcaseItem) => {
    triggerRef.current = document.activeElement as HTMLElement | null;
    setActiveId(item.id);
  };

  const close = useCallback(() => setActiveId(null), []);

  useEffect(() => {
    if (!isOpen) return;
    lockScroll(true);
    closeRef.current?.focus();
    return () => {
      lockScroll(false);
      triggerRef.current?.focus?.();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        step(1);
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        step(-1);
        return;
      }

      if (event.key !== "Tab") return;

      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [close, isOpen, step]);

  const toggleSave = (item: ShowcaseItem) => {
    const isSaved = saved.includes(item.id);
    onToggleSave(item.id);
    showToast(
      isSaved
        ? `Removed “${item.title}” from your lookbook.`
        : `Saved “${item.title}” to your lookbook.`,
    );
  };

  const enquire = (item: ShowcaseItem) => {
    onEnquire(item.interest);
    if (isOpen) {
      setActiveId(null);
      window.setTimeout(() => scrollToId("#quote"), 80);
      return;
    }
    scrollToId("#quote");
  };

  return (
    <section id="lookbook" className="relative bg-smoke py-24 text-paper lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-acid/60 to-transparent"
      />

      <div className="container-x">
        <SectionIntro
          index="03"
          eyebrow="The lookbook"
          title={
            <>
              A look inside
              <br />
              the homes we build.
            </>
          }
          intro="Interiors, furniture, lighting, smart living and modern architecture. Save the looks you love and bring them to your quote."
        />

        <Reveal delay={0.08} className="mt-10 lg:mt-14">
          <div className="flex flex-col gap-5 border-y border-white/12 py-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <Images
                className="size-4 shrink-0 text-acid"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <span className="label text-paper/60">
                Browse the collection
              </span>
            </div>

            <div
              role="group"
              aria-label="Filter lookbook by category"
              className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:justify-end"
            >
              {SHOWCASE_CATEGORIES.map((category) => {
                const count =
                  category === "All"
                    ? SHOWCASE_ITEMS.length
                    : (counts.get(category) ?? 0);
                const selected = filter === category;

                return (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setFilter(category)}
                    className={cn(
                      "group flex shrink-0 items-center gap-2 border px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.1em] transition-colors",
                      selected
                        ? "border-acid bg-acid text-ink"
                        : "border-white/20 text-paper/65 hover:border-white/45 hover:text-paper",
                    )}
                  >
                    {category}
                    <span
                      className={cn(
                        "font-mono text-[0.6rem] tabular-nums",
                        selected ? "text-ink/60" : "text-paper/55",
                      )}
                    >
                      {String(count).padStart(2, "0")}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        <p role="status" aria-live="polite" className="sr-only">
          Showing {items.length} {items.length === 1 ? "look" : "looks"}
          {filter === "All" ? "" : ` in ${filter}`}.
        </p>

        <div className="mt-6 grid grid-flow-row-dense grid-cols-2 auto-rows-[150px] gap-2 sm:auto-rows-[200px] sm:gap-3 md:grid-cols-3 lg:auto-rows-[240px] lg:grid-cols-4 xl:auto-rows-[270px]">
          {items.map((item, index) => {
            const isSaved = saved.includes(item.id);

            return (
              <Reveal
                key={item.id}
                delay={Math.min(index * 0.025, 0.22)}
                className={SIZE_CLASSES[item.size]}
              >
                <article className="group relative h-full w-full overflow-hidden bg-ink">
                  <img
                    src={item.image}
                    alt={item.alt}
                    width={item.imageWidth}
                    height={item.imageHeight}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 size-full object-cover grayscale transition duration-700 ease-out group-hover:scale-[1.04] group-hover:grayscale-0"
                  />

                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/25"
                  />

                  <button
                    type="button"
                    onClick={() => openItem(item)}
                    aria-label={`Open ${item.title} in the lookbook viewer`}
                    className="absolute inset-0 z-10 cursor-zoom-in"
                  />

                  <div className="pointer-events-none absolute inset-x-0 top-0 z-[11] flex items-start justify-between gap-2 p-3 sm:p-4">
                    <span className="label border border-white/20 bg-black/30 px-2 py-1 text-paper/80 backdrop-blur-sm">
                      {item.category}
                    </span>
                    <span className="grid size-8 place-items-center border border-white/20 bg-black/25 text-paper/70 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                      <Maximize2
                        className="size-3.5"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </span>
                  </div>

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-2 p-3 sm:p-4">
                    <div className="min-w-0">
                      <h3 className="truncate font-display text-base font-medium tracking-tight text-paper sm:text-xl">
                        {item.title}
                      </h3>
                      <p className="mt-1 hidden text-xs leading-relaxed text-paper/60 sm:line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    <div className="pointer-events-auto flex shrink-0 items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => toggleSave(item)}
                        aria-pressed={isSaved}
                        aria-label={
                          isSaved
                            ? `Remove ${item.title} from saved looks`
                            : `Save ${item.title} to your lookbook`
                        }
                        className={cn(
                          "grid size-9 place-items-center border backdrop-blur-sm transition-colors",
                          isSaved
                            ? "border-acid bg-acid text-ink"
                            : "border-white/25 bg-black/30 text-paper/80 hover:border-acid hover:text-acid",
                        )}
                      >
                        {isSaved ? (
                          <BookmarkCheck
                            className="size-4"
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                        ) : (
                          <Bookmark
                            className="size-4"
                            strokeWidth={1.6}
                            aria-hidden="true"
                          />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => enquire(item)}
                        aria-label={`Enquire about ${item.title}`}
                        className="grid size-9 place-items-center border border-white/25 bg-black/30 text-paper/80 backdrop-blur-sm transition-colors hover:border-acid hover:bg-acid hover:text-ink"
                      >
                        <ArrowUpRight
                          className="size-4"
                          strokeWidth={1.6}
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-12">
          <div className="flex flex-col items-start justify-between gap-6 border border-acid/30 bg-acid/[0.06] p-6 sm:flex-row sm:items-center sm:p-9">
            <div>
              <span className="label text-acid">See something you love?</span>
              <p className="mt-3 max-w-xl font-display text-[clamp(1.5rem,3vw,2.4rem)] font-medium leading-tight tracking-tight">
                We can build it, finish it, and wire it up.
              </p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-paper/60">
                Concept imagery for inspiration — not completed Skyline projects.
                Tell us which looks you like and we’ll translate them into a
                clear, buildable quote.
              </p>
            </div>
            <button
              type="button"
              onClick={() => scrollToId("#quote")}
              className="group flex shrink-0 items-center gap-4 bg-acid px-6 py-4 text-left text-[0.7rem] font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-paper"
            >
              Start your quote
              <ArrowUpRight
                className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={2}
                aria-hidden="true"
              />
            </button>
          </div>
        </Reveal>
      </div>

      <AnimatePresence>
        {savedItems.length > 0 && (
          <motion.div
            initial={reduce ? false : { y: 90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? undefined : { y: 90, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            role="region"
            aria-label="Saved lookbook"
            className="fixed inset-x-0 bottom-0 z-[115] px-3 pb-3 sm:px-6 sm:pb-5"
          >
            <div className="mx-auto flex max-w-5xl items-center gap-3 border border-acid/40 bg-ink/95 p-3 text-paper shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur sm:gap-5 sm:p-4">
              <div className="hidden -space-x-3 sm:flex">
                {savedItems.slice(0, 3).map((item) => (
                  <img
                    key={item.id}
                    src={item.image}
                    alt=""
                    width={item.imageWidth}
                    height={item.imageHeight}
                    decoding="async"
                    className="size-10 border border-ink object-cover grayscale"
                  />
                ))}
              </div>

              <div className="min-w-0 flex-1">
                <p className="label text-acid">
                  {savedItems.length} saved{" "}
                  {savedItems.length === 1 ? "look" : "looks"}
                </p>
                <p className="mt-1 truncate text-xs text-paper/60 sm:text-sm">
                  {savedItems.map((item) => item.title).join(" · ")}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClearSaved();
                  showToast("Saved lookbook cleared.");
                }}
                aria-label="Clear saved lookbook"
                className="grid size-10 shrink-0 place-items-center border border-white/20 text-paper/70 transition-colors hover:border-acid hover:text-acid"
              >
                <Trash2 className="size-4" strokeWidth={1.5} aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => scrollToId("#quote")}
                className="group flex shrink-0 items-center gap-3 bg-acid px-4 py-3 text-[0.66rem] font-bold uppercase tracking-[0.12em] text-ink transition-colors hover:bg-paper sm:px-5"
              >
                <span className="hidden sm:inline">Take to quote</span>
                <span className="sm:hidden">Quote</span>
                <ArrowUpRight
                  className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {createPortal(
        <AnimatePresence>
          {activeItem && (
            <motion.div
              key="lookbook-lightbox"
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="showcase-lightbox-title"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[140] overflow-hidden text-paper"
            >
              <div
                aria-hidden="true"
                onClick={close}
                className="absolute inset-0 bg-black/95 backdrop-blur-sm"
              />

              <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-6">
                  <div className="label flex min-w-0 items-center gap-3 text-paper/65">
                    <span className="size-1.5 shrink-0 bg-acid" aria-hidden="true" />
                    <span className="truncate">{activeItem.category}</span>
                    <span className="h-px w-6 shrink-0 bg-white/25" aria-hidden="true" />
                    <span className="shrink-0 tabular-nums">
                      {String(activeIndex + 1).padStart(2, "0")} /{" "}
                      {String(items.length).padStart(2, "0")}
                    </span>
                  </div>

                  <button
                    ref={closeRef}
                    type="button"
                    onClick={close}
                    aria-label="Close lookbook viewer"
                    className="grid size-10 shrink-0 place-items-center border border-white/20 text-paper transition-colors hover:border-acid hover:text-acid"
                  >
                    <X className="size-5" strokeWidth={1.5} aria-hidden="true" />
                  </button>
                </div>

                <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 sm:px-16">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Previous look"
                    className="absolute left-2 top-1/2 z-20 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-black/45 text-paper backdrop-blur transition-colors hover:border-acid hover:text-acid sm:left-5 sm:size-12"
                  >
                    <ChevronLeft
                      className="size-5"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </button>

                  <AnimatePresence mode="wait" initial={false}>
                    <motion.img
                      key={activeItem.id}
                      src={activeItem.image}
                      alt={activeItem.alt}
                      width={activeItem.imageWidth}
                      height={activeItem.imageHeight}
                      decoding="async"
                      initial={reduce ? false : { opacity: 0, scale: 0.99 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={reduce ? undefined : { opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="max-h-[52vh] w-auto max-w-full object-contain sm:max-h-[60vh]"
                    />
                  </AnimatePresence>

                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Next look"
                    className="absolute right-2 top-1/2 z-20 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-black/45 text-paper backdrop-blur transition-colors hover:border-acid hover:text-acid sm:right-5 sm:size-12"
                  >
                    <ChevronRight
                      className="size-5"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </button>
                </div>

                <div className="border-t border-white/10 px-4 py-5 sm:px-6 sm:py-6">
                  <div className="mx-auto flex max-w-6xl flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div className="min-w-0">
                      <p className="label text-acid">{activeItem.category}</p>
                      <h3
                        id="showcase-lightbox-title"
                        className="mt-2 font-display text-[clamp(1.5rem,3vw,2.4rem)] font-medium leading-tight tracking-tight"
                      >
                        {activeItem.title}
                      </h3>
                      <p className="mt-2 max-w-xl text-sm leading-relaxed text-paper/65">
                        {activeItem.description}
                      </p>
                      {activeItem.credit && (
                        <p className="mt-2 text-[0.68rem] text-paper/55">
                          {activeItem.credit}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleSave(activeItem)}
                        aria-pressed={saved.includes(activeItem.id)}
                        className={cn(
                          "flex items-center gap-2.5 border px-4 py-3 text-[0.68rem] font-bold uppercase tracking-[0.12em] transition-colors",
                          saved.includes(activeItem.id)
                            ? "border-acid bg-acid text-ink"
                            : "border-white/25 text-paper/75 hover:border-acid hover:text-acid",
                        )}
                      >
                        {saved.includes(activeItem.id) ? (
                          <BookmarkCheck
                            className="size-4"
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                        ) : (
                          <Bookmark
                            className="size-4"
                            strokeWidth={1.6}
                            aria-hidden="true"
                          />
                        )}
                        {saved.includes(activeItem.id) ? "Saved" : "Save look"}
                      </button>

                      <button
                        type="button"
                        onClick={() => enquire(activeItem)}
                        className="group flex items-center gap-3 bg-acid px-5 py-3 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-ink transition-colors hover:bg-paper"
                      >
                        Enquire about this look
                        <ArrowUpRight
                          className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </section>
  );
}
