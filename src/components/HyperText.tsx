"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

type HyperTextProps = {
  text: string;
  duration?: number;
  className?: string;
  animateOnLoad?: boolean;
  framerProps?: Variants;
};

const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function HyperText({
  text,
  duration = 800,
  className = "",
  animateOnLoad = true,
  framerProps = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 3 },
  },
}: HyperTextProps) {
  const [displayText, setDisplayText] = useState<string[]>(text.split(""));
  const [trigger, setTrigger] = useState(false);
  const iterations = useRef(0);
  const isFirstRender = useRef(true);

  const getRandomLetter = () =>
    ALPHABETS[Math.floor(Math.random() * ALPHABETS.length)];

  useEffect(() => {
    const interval = setInterval(
      () => {
        if (!animateOnLoad && isFirstRender.current) {
          clearInterval(interval);
          isFirstRender.current = false;
          return;
        }

        if (iterations.current < text.length) {
          setDisplayText((prev) =>
            prev.map((char, i) =>
              char === " "
                ? " "
                : i <= iterations.current
                  ? text[i]
                  : getRandomLetter()
            )
          );
          iterations.current += 0.1;
        } else {
          setTrigger(false);
          clearInterval(interval);
        }
      },
      duration / (text.length * 10)
    );

    return () => clearInterval(interval);
  }, [text, duration, trigger, animateOnLoad]);

  return (
    <div className="flex overflow-hidden cursor-default">
      <AnimatePresence mode="wait">
        {displayText.map((char, i) => (
          <motion.span
            key={i}
            className={`font-mono ${char === " " ? "w-2" : ""} ${className}`}
            {...framerProps}
          >
            {char.toUpperCase()}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
