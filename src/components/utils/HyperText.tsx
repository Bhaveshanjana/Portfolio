"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type HyperTextProps = {
  text: string;
  duration?: number;
  className?: string;
  animateOnLoad?: boolean;
};

const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function HyperText({
  text,
  duration = 800,
  className = "",
  animateOnLoad = true,
}: HyperTextProps) {
  const [displayText, setDisplayText] = useState<string[]>(text.split(""));
  const iterations = useRef(0);
  const isFirstRender = useRef(true);
  const rollId = useRef(0);

  const getRandomLetter = () =>
    ALPHABETS[Math.floor(Math.random() * ALPHABETS.length)];

  useEffect(() => {
    iterations.current = 0;
    rollId.current += 1;
    setDisplayText(text.split(""));

    if (!animateOnLoad && isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    isFirstRender.current = false;

    const tickMs = Math.max(duration / (text.length * 12), 28);
    const interval = setInterval(() => {
      if (iterations.current < text.length) {
        setDisplayText(
          text.split("").map((char, i) =>
            char === " "
              ? " "
              : i <= iterations.current
                ? text[i]
                : getRandomLetter()
          )
        );
        iterations.current += 0.18;
      } else {
        setDisplayText(text.split(""));
        clearInterval(interval);
      }
    }, tickMs);

    return () => clearInterval(interval);
  }, [text, duration, animateOnLoad]);

  return (
    <div
      className={`inline-flex items-center cursor-default font-mono ${className}`}
      style={{ perspective: "600px" }}
    >
      {displayText.map((char, i) => {
        const isSpace = char === " ";
        const settled = i <= iterations.current || char === text[i];

        return (
          <span
            key={`slot-${i}`}
            className={`relative inline-flex h-[1em] items-center justify-center overflow-hidden align-middle ${
              isSpace ? "w-2" : "w-[0.65em]"
            }`}
            style={{ transformStyle: "preserve-3d" }}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={`${rollId.current}-${i}-${char}`}
                className="absolute inset-0 flex items-center justify-center font-mono leading-none"
                initial={{
                  rotateX: settled ? -90 : -120,
                  y: "70%",
                  opacity: 0.35,
                }}
                animate={{
                  rotateX: 0,
                  y: "0%",
                  opacity: 1,
                }}
                exit={{
                  rotateX: 90,
                  y: "-70%",
                  opacity: 0,
                }}
                transition={{
                  duration: settled ? 0.28 : 0.12,
                  ease: settled ? [0.22, 1, 0.36, 1] : "easeOut",
                }}
                style={{
                  backfaceVisibility: "hidden",
                  transformStyle: "preserve-3d",
                }}
              >
                {char.toUpperCase()}
              </motion.span>
            </AnimatePresence>
          </span>
        );
      })}
    </div>
  );
}
