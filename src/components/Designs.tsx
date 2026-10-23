import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import { DESIGNS } from "../content";
import { scrollToId } from "../lib/lenis";
import { SectionIntro } from "./SectionIntro";
import { Reveal } from "./Reveal";
import { cn } from "../lib/utils";

type DesignsProps = {
  onEnquire: (design: string) => void;
};

export function Designs({ onEnquire }: DesignsProps) {
  const [active, setActive] = useState(0);
  const panelRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const update = () => {
      const focusLine = window.innerHeight * 0.42;
      let closest = 0;
      let distance = Number.POSITIVE_INFINITY;

      panelRefs.current.forEach((panel, index) => {
        if (!panel) return;
        const rect = panel.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const nextDistance = Math.abs(center - focusLine);
        if (nextDistance < distance) {
          distance = nextDistance;
          closest = index;
        }
      });

      setActive(closest);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section id="designs" className="bg-ink py-24 text-paper lg:py-32">
      <div className="container-x">
        <SectionIntro
          index="02"
          eyebrow="What we build"
          title={
            <>
              Two ways
              <br />
              to build well.
            </>
          }
          intro="Compact or contemporary — every Skyline home is planned to make the most of its space and your budget."
        />
      </div>

      <div className="container-x mt-14 lg:mt-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-20">
          <div className="hidden lg:col-span-6 lg:block xl:col-span-7">
            <div className="sticky top-24">
              <div className="relative h-[calc(100svh-8rem)] min-h-[520px] max-h-[820px] overflow-hidden bg-smoke">
                {DESIGNS.map((design, index) => (
                  <motion.div
                    key={design.id}
                    aria-hidden={active !== index}
                    animate={{
                      opacity: active === index ? 1 : 0,
                      scale: active === index ? 1 : 1.035,
                    }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    <div className="duotone absolute inset-0">
                      <img
                        src={design.image}
                        alt={design.alt}
                        width={design.imageWidth}
                        height={design.imageHeight}
                        loading={index === 0 ? "eager" : "lazy"}
                        className="absolute inset-0 size-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black/85 via-transparent to-black/25" />

                    <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between p-6">
                      <span className="display text-[clamp(2.4rem,4vw,3.6rem)] leading-none text-acid">
                        {design.index}
                      </span>
                      <span className="label border border-white/25 bg-black/20 px-3 py-1.5 text-paper/80 backdrop-blur-sm">
                        {design.tag}
                      </span>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-6 p-6">
                      <div>
                        <p className="label text-paper/65">Design concept</p>
                        <p className="mt-2 font-display text-2xl font-medium tracking-tight">
                          {design.title}
                        </p>
                      </div>
                      <span className="label text-right text-paper/65">{design.note}</span>
                    </div>
                  </motion.div>
                ))}

                <div className="absolute inset-x-0 bottom-0 z-20 h-[2px] bg-white/10">
                  <motion.div
                    className="h-full origin-left bg-acid"
                    animate={{ scaleX: (active + 1) / DESIGNS.length }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 xl:col-span-5">
            {DESIGNS.map((design, index) => (
              <article
                key={design.id}
                ref={(node) => {
                  panelRefs.current[index] = node;
                }}
                data-index={index}
                className={cn(
                  "flex flex-col justify-center border-t border-white/15 py-12 lg:min-h-[78vh] lg:py-16",
                  index === DESIGNS.length - 1 && "border-b",
                )}
              >
                <div className="mb-8 lg:hidden">
                  <div className="duotone relative aspect-[16/11] overflow-hidden">
                    <img
                      src={design.image}
                      alt={design.alt}
                      width={design.imageWidth}
                      height={design.imageHeight}
                      loading="lazy"
                      className="absolute inset-0 size-full object-cover"
                    />
                  </div>
                  <p className="label mt-2 text-right text-paper/60">Concept imagery</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="label text-acid">{design.index}</span>
                  <span className="h-px w-8 bg-white/25" aria-hidden="true" />
                  <span className="label text-paper/60">{design.tag}</span>
                </div>

                <h3 className="display mt-5 text-[clamp(2.4rem,5vw,4.4rem)]">
                  {design.title}
                </h3>

                <p className="mt-6 max-w-xl text-[0.98rem] leading-[1.75] text-paper/65">
                  {design.summary}
                </p>

                <ul className="mt-7 flex flex-col gap-3">
                  {design.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 border-b border-white/10 pb-3 text-[0.88rem] text-paper/80"
                    >
                      <Check
                        className="size-4 shrink-0 text-acid"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <button
                    type="button"
                    onClick={() => {
                      onEnquire(design.title);
                      scrollToId("#quote");
                    }}
                    className="group inline-flex items-center gap-3 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-paper transition-colors hover:text-acid"
                  >
                    Ask about {design.title}
                    <span className="grid size-8 place-items-center rounded-full border border-white/25 transition-colors group-hover:border-acid">
                      <ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
                    </span>
                  </button>
                </div>
              </article>
            ))}

            <Reveal className="py-12 lg:py-16">
              <button
                type="button"
                onClick={() => scrollToId("#quote")}
                className="group flex w-full items-center justify-between gap-6 border border-acid/35 bg-acid/[0.06] p-6 text-left transition-colors hover:bg-acid hover:text-ink sm:p-8"
              >
                <div>
                  <span className="label opacity-60">Not sure which fits?</span>
                  <p className="mt-3 font-display text-2xl font-medium leading-tight tracking-tight sm:text-3xl">
                    Tell us your budget. We’ll find the right fit.
                  </p>
                </div>
                <span className="grid size-12 shrink-0 place-items-center rounded-full border border-current">
                  <ArrowUpRight className="size-5" strokeWidth={1.5} aria-hidden="true" />
                </span>
              </button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
