import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, Armchair, Check, Droplets, Smartphone, Sun } from "lucide-react";
import { UPGRADES } from "../content";
import { scrollToId } from "../lib/lenis";
import { cn } from "../lib/utils";
import { SectionIntro } from "./SectionIntro";
import { Reveal } from "./Reveal";

const ICONS: Record<string, LucideIcon> = {
  solar: Sun,
  borehole: Droplets,
  smart: Smartphone,
  interior: Armchair,
};

type UpgradesProps = {
  selected: string[];
  onToggle: (id: string) => void;
};

export function Upgrades({ selected, onToggle }: UpgradesProps) {
  const count = selected.length;

  return (
    <section id="upgrades" className="bg-bone py-24 text-ink lg:py-32">
      <div className="container-x">
        <SectionIntro
          index="04"
          eyebrow="Make it yours"
          title={
            <>
              Every home is complete.
              <br />
              The extras are up to you.
            </>
          }
          intro="Every home comes complete and ready to enjoy. If you’d like more, you can add any of these for an extra cost."
        />

        <div className="mt-14 grid grid-cols-1 gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-px bg-ink/15 sm:grid-cols-2">
              {UPGRADES.map((upgrade, index) => {
                const Icon = ICONS[upgrade.id] ?? Sun;
                const isSelected = selected.includes(upgrade.id);

                return (
                  <button
                    key={upgrade.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => onToggle(upgrade.id)}
                    className={cn(
                      "group relative flex min-h-[240px] flex-col justify-between p-6 text-left transition-colors duration-300 sm:min-h-[270px] sm:p-7",
                      isSelected
                        ? "bg-ink text-paper"
                        : "bg-bone text-ink hover:bg-white",
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span
                        className={cn(
                          "label transition-colors",
                          isSelected ? "text-acid" : "text-ink/65",
                        )}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "grid size-7 place-items-center border transition-colors",
                          isSelected
                            ? "border-acid bg-acid text-ink"
                            : "border-ink/25 text-transparent group-hover:border-ink/60",
                        )}
                      >
                        <Check className="size-4" strokeWidth={2.5} aria-hidden="true" />
                      </span>
                    </div>

                    <div className="mt-10">
                      <Icon
                        className={cn(
                          "size-8 transition-colors",
                          isSelected ? "text-acid" : "text-ink",
                        )}
                        strokeWidth={1.25}
                        aria-hidden="true"
                      />
                      <h3 className="mt-5 font-display text-[1.35rem] font-medium leading-tight tracking-tight">
                        {upgrade.title}
                      </h3>
                      <p
                        className={cn(
                          "mt-3 max-w-[34ch] text-[0.88rem] leading-relaxed transition-colors",
                          isSelected ? "text-paper/60" : "text-ink/60",
                        )}
                      >
                        {upgrade.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <Reveal className="mt-8">
              <p className="max-w-2xl text-sm leading-relaxed text-ink/60">
                Pick one, pick all, or start with the basics and add later.{" "}
                <span className="font-semibold text-ink">
                  You decide what your home needs and what you can afford.
                </span>
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal className="lg:sticky lg:top-24">
              <div className="border border-ink/15 bg-ink p-7 text-paper sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="label text-acid">Your package</span>
                  <span className="label text-paper/60">
                    {String(count).padStart(2, "0")} / 04 extras
                  </span>
                </div>

                <div className="mt-8 flex items-end justify-between gap-4 border-b border-white/10 pb-6">
                  <div className="min-w-0">
                    <p className="label text-paper/60">Base included</p>
                    <h3 className="mt-2 font-display text-2xl font-medium tracking-tight sm:text-3xl">
                      Complete home
                    </h3>
                  </div>
                  <span className="font-display text-5xl leading-none text-acid sm:text-6xl">
                    {String(count).padStart(2, "0")}
                  </span>
                </div>

                <ul className="mt-2">
                  <li className="flex items-start gap-3 border-b border-white/10 py-4 text-sm text-paper/65">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-acid"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    Design, engineering and construction
                  </li>
                  {UPGRADES.filter((upgrade) => selected.includes(upgrade.id)).map(
                    (upgrade) => (
                      <li
                        key={upgrade.id}
                        className="flex items-start gap-3 border-b border-white/10 py-4 text-sm text-paper"
                      >
                        <Check
                          className="mt-0.5 size-4 shrink-0 text-acid"
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                        {upgrade.short}
                      </li>
                    ),
                  )}
                </ul>

                {count === 0 && (
                  <p className="mt-4 text-sm leading-relaxed text-paper/60">
                    No extras selected yet. Your home is already complete — add
                    anything you like from the list.
                  </p>
                )}

                <button
                  type="button"
                  onClick={() => scrollToId("#quote")}
                  className="group mt-7 flex w-full items-center justify-between gap-4 bg-acid px-5 py-4 text-left text-[0.7rem] font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-paper"
                >
                  Take this to the quote
                  <ArrowUpRight
                    className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </button>
                <p className="label mt-4 text-paper/60">
                  No obligation · Change your mind later
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
