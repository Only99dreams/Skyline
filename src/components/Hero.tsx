import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import { HERO_META, MARQUEE_ITEMS } from "../content";
import { scrollToId } from "../lib/lenis";
import { Magnetic } from "./Magnetic";
import { Marquee } from "./Marquee";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "7%"]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink text-paper"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <motion.div
          className="absolute inset-0"
          style={reduce ? undefined : { y: imageY }}
        >
          <img
            src="./images/hero.jpg"
            alt=""
            width="1800"
            height="1200"
            fetchPriority="high"
            className="size-full scale-110 object-cover object-center opacity-55 grayscale"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.62)_48%,rgba(0,0,0,0.32)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_38%,rgba(230,228,64,0.16),transparent_52%)]" />
      </div>

      <div className="container-x relative z-10 flex flex-1 flex-col pb-6 pt-20 min-[360px]:pb-8 min-[360px]:pt-24 lg:pt-32">
        <div className="flex items-center justify-between gap-4 border-b border-white/15 pb-4">
          <span className="label flex items-center gap-2.5 text-paper/70">
            <span className="relative flex size-2">
              <span
                className="absolute inset-0 rounded-full bg-acid"
                style={{ animation: "pulse-soft 3s ease-in-out infinite" }}
              />
              <span className="absolute inset-0 rounded-full bg-acid" />
            </span>
            Now taking enquiries
          </span>
          <span className="label hidden text-paper/60 sm:block">
            Bungalows · Modern homes · Fair prices
          </span>
          <span className="label hidden text-paper/60 min-[360px]:block sm:hidden">
            Design &amp; build
          </span>
        </div>

        <div className="flex flex-1 flex-col justify-center py-8 min-[360px]:py-10 lg:py-14">
          <div className="max-w-[1500px]">
            <h1 className="display text-[clamp(2.9rem,8.4vw,8.6rem)] uppercase">
              <span className="block overflow-hidden pb-[0.04em]">
                <motion.span
                  className="block"
                  initial={reduce ? false : { y: "112%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  Beautiful homes.
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.04em]">
                <motion.span
                  className="block text-acid"
                  initial={reduce ? false : { y: "112%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 1.05,
                    delay: 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  Honest prices.
                </motion.span>
              </span>
            </h1>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 border-t border-white/15 pt-7 lg:mt-12 lg:grid-cols-12 lg:items-end">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5"
            >
              <p className="max-w-md text-[0.95rem] leading-relaxed text-paper/75">
                Skyline Engineering and Construction builds small bungalows and
                modern homes that are well designed, solidly built, and priced for
                real people.
              </p>
              <ul className="mt-6 hidden flex-col gap-2.5 min-[360px]:flex">
                {HERO_META.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-[0.8rem] text-paper/60"
                  >
                    <Check
                      className="size-3.5 shrink-0 text-acid"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-start gap-3 lg:col-span-4"
            >
              <Magnetic>
                <a
                  href="#designs"
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToId("#designs");
                  }}
                  className="group inline-flex h-14 items-center gap-3 bg-acid px-6 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-paper"
                >
                  Explore designs
                  <ArrowUpRight
                    className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="#quote"
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToId("#quote");
                  }}
                  className="inline-flex h-14 items-center border border-white/30 px-6 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-paper transition-colors hover:border-acid hover:text-acid"
                >
                  Get a free quote
                </a>
              </Magnetic>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:col-span-3 lg:flex lg:justify-end"
            >
              <a
                href="#about"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToId("#about");
                }}
                aria-label="DESIGN · ENGINEER · BUILD · SKYLINE — scroll to about"
                className="group relative grid size-24 place-items-center rounded-full border border-white/20 transition-colors hover:border-acid sm:size-28 lg:size-32"
              >
                <svg
                  viewBox="0 0 120 120"
                  className="seal-spin absolute inset-0 size-full"
                  aria-hidden="true"
                >
                  <defs>
                    <path
                      id="seal-path"
                      d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"
                      fill="none"
                    />
                  </defs>
                  <text className="fill-paper/70">
                    <textPath
                      href="#seal-path"
                      startOffset="0"
                      textLength="276"
                      lengthAdjust="spacing"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "6.6px",
                        letterSpacing: "0",
                      }}
                    >
                      DESIGN · ENGINEER · BUILD · SKYLINE ·
                    </textPath>
                  </text>
                </svg>
                <ArrowDown
                  className="size-5 text-acid transition-transform duration-300 group-hover:translate-y-1.5"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      <Marquee items={MARQUEE_ITEMS} className="relative z-10" />
    </section>
  );
}
