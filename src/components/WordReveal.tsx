import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

function Word({
  children,
  progress,
  start,
  end,
}: {
  children: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const opacity = useTransform(progress, [start, end], [0.55, 1]);

  return (
    <span className="mr-[0.24em] inline-block">
      <motion.span style={{ opacity }} className="inline-block">
        {children}
      </motion.span>
    </span>
  );
}

type WordRevealProps = {
  text: string;
  className?: string;
};

export function WordReveal({ text, className }: WordRevealProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.55"],
  });

  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((word, index) => {
        const start = (index / words.length) * 0.85;
        const end = start + 0.25;
        return reduce ? (
          <span key={`${word}-${index}`} className="mr-[0.24em] inline-block">
            {word}
          </span>
        ) : (
          <Word
            key={`${word}-${index}`}
            progress={scrollYProgress}
            start={start}
            end={Math.min(end, 1)}
          >
            {word}
          </Word>
        );
      })}
    </p>
  );
}
