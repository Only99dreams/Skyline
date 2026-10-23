import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { cn } from "../lib/utils";

type SectionIntroProps = {
  index: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  className?: string;
  titleClassName?: string;
  introClassName?: string;
};

export function SectionIntro({
  index,
  eyebrow,
  title,
  intro,
  className,
  titleClassName,
  introClassName,
}: SectionIntroProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16",
        className,
      )}
    >
      <div className="max-w-4xl">
        <Reveal>
          <div className="label flex items-center gap-3">
            <span className="size-1.5 shrink-0 bg-acid" aria-hidden="true" />
            <span className="opacity-60">{index}</span>
            <span className="h-px w-8 bg-current opacity-60" aria-hidden="true" />
            <span className="opacity-60">{eyebrow}</span>
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <h2
            className={cn(
              "display mt-5 text-[clamp(2.7rem,6.4vw,6.4rem)]",
              titleClassName,
            )}
          >
            {title}
          </h2>
        </Reveal>
      </div>

      {intro && (
        <Reveal delay={0.12} className={cn("max-w-sm shrink-0 lg:pb-2", introClassName)}>
          <p className="text-base leading-relaxed opacity-65">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
