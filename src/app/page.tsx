"use client";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Projects from "@/components/projects/Project";
import TechStack from "@/components/TechStack";
import React from "react";
import SectionEffect from "@/components/utils/textEffect";
import { motion, Variants } from "framer-motion";

const getBlurVariants = (delay: number): Variants => ({
  hidden: { opacity: 0, filter: "blur(15px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay,
    },
  },
});
const page = () => {
  return (
    <div>
    <main className="max-w-[680px] mx-auto px-5 space-y-12 pb-20">
      {/* Hero Section */}
      <SectionEffect delay={0.1}>
        <Hero />
      </SectionEffect>

      <SectionEffect delay={0.15}>
        <Experience />
      </SectionEffect>

      <motion.div
        initial="hidden"
        animate="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={getBlurVariants(0.3)}
      >
        <Projects />
      </motion.div>

      <SectionEffect delay={0.2}>
        <TechStack />
      </SectionEffect>

      <SectionEffect delay={0.2}>
        <Contact />
      </SectionEffect>
    </main>
    </div>
  );
};

export default page;
