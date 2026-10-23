import { Asterisk } from "lucide-react";
import { cn } from "../lib/utils";

type MarqueeProps = {
  items: string[];
  tone?: "acid" | "dark";
  className?: string;
};

export function Marquee({ items, tone = "acid", className }: MarqueeProps) {
  return (
    <div
      className={cn(
        "marquee relative overflow-hidden border-y",
        tone === "acid"
          ? "border-ink/20 bg-acid text-ink"
          : "border-white/10 bg-ink text-paper",
        className,
      )}
    >
      <div className="marquee-track py-3.5">
        {[0, 1].map((group) => (
          <div
            key={group}
            className="flex shrink-0 items-center"
            aria-hidden={group === 1 || undefined}
          >
            {items.map((item) => (
              <span
                key={`${group}-${item}`}
                className="flex items-center gap-5 pr-10 sm:gap-7 sm:pr-14"
              >
                <span className="label whitespace-nowrap">{item}</span>
                <Asterisk className="size-3.5 shrink-0 opacity-60" strokeWidth={1.5} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
