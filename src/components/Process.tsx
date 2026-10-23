import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { STEPS } from "../content";
import { cn } from "../lib/utils";
import { SectionIntro } from "./SectionIntro";

export function Process() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const update = () => {
      const focusLine = window.innerHeight * 0.45;
      let closest = 0;
      let distance = Number.POSITIVE_INFINITY;

      stepRefs.current.forEach((step, index) => {
        if (!step) return;
        const rect = step.getBoundingClientRect();
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

  const current = STEPS[active];

  return (
    <section id="process" className="blueprint bg-bone py-24 text-ink lg:py-32">
      <div className="container-x">
        <SectionIntro
          index="05"
          eyebrow="How it works"
          title={
            <>
              From first idea
              <br />
              to front door.
            </>
          }
          intro="Five straightforward steps — and a clear quote before anything begins."
        />

        <div className="mt-14 grid grid-cols-1 gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          <div className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-28">
              <div className="relative h-44 overflow-hidden border-b border-ink/20">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={current.number}
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="display absolute bottom-0 left-0 text-[11rem] leading-[0.8]"
                  >
                    {current.number}
                  </motion.span>
                </AnimatePresence>
                <span className="label absolute bottom-4 right-0 text-ink/65">/ 05</span>
              </div>

              <div className="mt-7">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.title}
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -8, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <h3 className="font-display text-3xl font-medium tracking-tight">
                      {current.title}
                    </h3>
                    <p className="mt-3 max-w-xs text-[0.95rem] leading-relaxed text-ink/60">
                      {current.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-10 flex items-center gap-1.5" aria-hidden="true">
                {STEPS.map((step, index) => (
                  <span
                    key={step.number}
                    className={cn(
                      "h-1 flex-1 transition-colors duration-500",
                      index <= active ? "bg-ink" : "bg-ink/15",
                    )}
                  />
                ))}
              </div>
              <p className="label mt-4 text-ink/65">The Skyline process</p>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            {STEPS.map((step, index) => (
              <div
                key={step.number}
                ref={(node) => {
                  stepRefs.current[index] = node;
                }}
                data-step={index}
                aria-current={active === index ? "step" : undefined}
                className={cn(
                  "border-t border-ink/20 py-7 transition-colors duration-500 lg:py-10",
                  index === STEPS.length - 1 && "border-b",
                )}
              >
                <div className="grid grid-cols-[auto_1fr] gap-6 md:gap-10">
                  <div className="flex flex-col items-start gap-3">
                    <span
                      className={cn(
                        "label transition-colors duration-500",
                        active === index ? "text-ink" : "text-ink/65",
                      )}
                    >
                      {step.number}
                    </span>
                    <span
                      className={cn(
                        "size-2.5 transition-colors duration-500",
                        active === index ? "bg-acid" : "bg-ink/20",
                      )}
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3
                      className={cn(
                        "font-display text-[clamp(1.6rem,3vw,2.4rem)] font-medium leading-tight tracking-tight transition-colors duration-500",
                        active === index ? "text-ink" : "text-ink/70",
                      )}
                    >
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-md text-[0.95rem] leading-relaxed text-ink/65">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
