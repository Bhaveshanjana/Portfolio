"use client";

import { motion, Variants } from "framer-motion";
import React from "react";

const getBlurVariants = (delay: number): Variants => ({
  hidden: { opacity: 0, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay,
    },
  },
});

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
      variants={getBlurVariants(delay)}
      className={className}
    >
      {children}
    </motion.div>
  );
}
