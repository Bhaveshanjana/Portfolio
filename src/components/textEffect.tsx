"use client";

import { motion, Variants } from "framer-motion";
import React from "react";

const blurVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

type SectionEffectProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

export default function SectionEffect({
  children,
  delay = 0,
  className = "",
}: SectionEffectProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: blurVariants.hidden,
        visible: {
          ...blurVariants.visible,
          transition: {
            ...blurVariants.visible.transition,
            delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
