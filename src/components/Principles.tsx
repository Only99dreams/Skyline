import { ArrowUpRight } from "lucide-react";
import { PRINCIPLES } from "../content";
import { scrollToId } from "../lib/lenis";
import { SectionIntro } from "./SectionIntro";
import { Reveal } from "./Reveal";

export function Principles() {
  return (
    <section id="why" className="bg-ink py-24 text-paper lg:py-32">
      <div className="container-x">
        <SectionIntro
          index="05"
          eyebrow="Why choose Skyline?"
          title={
            <>
              Built on solid ground.
              <br />
              Priced with honesty.
            </>
          }
          intro="Five principles behind every home we build — and every conversation we have."
        />

        <div className="mt-14 border-t border-white/15 lg:mt-20">
          {PRINCIPLES.map((principle, index) => (
            <Reveal key={principle.title} delay={index * 0.03}>
              <div className="group border-b border-white/15 transition-colors duration-300 hover:bg-acid hover:text-ink">
                <div className="grid grid-cols-1 gap-3 px-1 py-7 sm:px-4 md:grid-cols-12 md:items-center md:gap-6 md:py-8">
                  <span className="label text-acid transition-colors group-hover:text-ink/70 md:col-span-1">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-[1.6rem] font-medium leading-tight tracking-tight md:col-span-4 md:text-[1.75rem]">
                    {principle.title}
                  </h3>
                  <p className="max-w-xl text-[0.92rem] leading-relaxed text-paper/65 transition-colors group-hover:text-ink/70 md:col-span-6">
                    {principle.description}
                  </p>
                  <span className="hidden justify-end md:col-span-1 md:flex">
                    <ArrowUpRight
                      className="size-5 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <button
            type="button"
            onClick={() => scrollToId("#quote")}
            className="group flex w-full flex-col items-start justify-between gap-6 bg-acid p-7 text-left text-ink transition-colors hover:bg-paper sm:flex-row sm:items-center sm:p-9"
          >
            <div>
              <span className="label opacity-60">Have a budget in mind?</span>
              <p className="mt-3 font-display text-[clamp(1.6rem,3.3vw,2.6rem)] font-medium leading-tight tracking-tight">
                Let’s see what we can build.
              </p>
            </div>
            <span className="grid size-12 shrink-0 place-items-center rounded-full border border-ink/30 transition-colors group-hover:border-ink">
              <ArrowUpRight
                className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </span>
          </button>
        </Reveal>
      </div>
    </section>
  );
}
