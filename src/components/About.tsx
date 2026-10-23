import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { AUDIENCES } from "../content";
import { scrollToId } from "../lib/lenis";
import { SectionIntro } from "./SectionIntro";
import { WordReveal } from "./WordReveal";
import { Reveal } from "./Reveal";

export function About() {
  const imageRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section id="about" className="relative overflow-hidden bg-bone py-24 text-ink lg:py-32">
      <div className="container-x">
        <SectionIntro
          index="01"
          eyebrow="About Skyline"
          title={
            <>
              A beautiful home
              <br />
              should feel within reach.
            </>
          }
          intro={
            <>
              <span className="font-semibold text-ink">
                Built well. Priced fairly. Explained clearly.
              </span>
              <br />
              From the first conversation to key handover.
            </>
          }
        />

        <WordReveal
          text="At Skyline Engineering and Construction, we believe owning a beautiful home shouldn’t mean stretching your finances to breaking point."
          className="mt-16 max-w-5xl font-display text-[clamp(1.55rem,3.4vw,3.15rem)] font-medium leading-[1.18] tracking-[-0.035em] lg:mt-24"
        />

        <div className="mt-16 grid grid-cols-1 gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="group relative">
              <div
                ref={imageRef}
                className="duotone relative aspect-[4/5] overflow-hidden bg-ink"
              >
                <motion.img
                  src="./images/interior.jpg"
                  alt="Concept image of a warm, contemporary open-plan living space"
                  width="1200"
                  height="800"
                  loading="lazy"
                  style={reduce ? undefined : { y: imageY }}
                  className="absolute inset-0 size-full scale-[1.14] object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 p-5 sm:p-6">
                  <span className="label text-paper/70">Interiors / Concept image</span>
                  <span className="label text-acid">Concept</span>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-4 hidden w-56 bg-acid p-5 text-ink shadow-[0_20px_60px_rgba(0,0,0,0.18)] sm:block lg:-right-8">
                <span className="label opacity-60">Our promise</span>
                <p className="mt-2 font-display text-lg font-semibold leading-tight">
                  Complete homes. No hidden costs.
                </p>
              </div>
            </div>
            <p className="label mt-10 flex items-center gap-3 text-ink/65">
              <span className="inline-block size-2 bg-acid" aria-hidden="true" />
              Designed for the way you live
            </p>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7 lg:pt-4">
            <Reveal>
              <p className="text-[1.02rem] leading-[1.75] text-ink/75">
                We design and build compact bungalows and modern homes that combine
                smart planning, quality materials, and clean, contemporary style — all
                at prices that make sense. Whether you’re a first-time homeowner, a
                growing family, a young professional, or an investor, we have a home
                that fits your budget and your lifestyle.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-6 text-[1.02rem] leading-[1.75] text-ink/75">
                Our approach is simple:{" "}
                <strong className="font-semibold text-ink">
                  great design, sound engineering, and fair pricing.
                </strong>{" "}
                No hidden costs, no unnecessary complications, just a home you’ll be
                proud to live in.
              </p>
            </Reveal>

            <Reveal delay={0.14} className="mt-10 border-t border-ink/15 pt-6">
              <span className="label text-ink/65">Who we build for</span>
              <ul className="mt-4 flex flex-wrap gap-2">
                {AUDIENCES.map((audience) => (
                  <li
                    key={audience}
                    className="border border-ink/20 px-3.5 py-2 text-[0.75rem] font-medium text-ink/80"
                  >
                    {audience}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.2}>
              <button
                type="button"
                onClick={() => scrollToId("#quote")}
                className="group mt-10 inline-flex items-center gap-3 border-b border-ink pb-2 text-[0.72rem] font-bold uppercase tracking-[0.14em] transition-colors hover:border-ink/30 hover:text-ink/60"
              >
                Start with a conversation
                <ArrowUpRight
                  className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
