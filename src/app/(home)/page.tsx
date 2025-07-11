import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Projects from "@/components/projects/Project";
import TechStack from "@/components/TechStack";
import React from "react";
import SectionEffect from "@/components/utils/textEffect";

const page = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="max-w-[680px] mx-auto space-y-10">
        <SectionEffect delay={0.1}>
          <Hero />
        </SectionEffect>

        <SectionEffect delay={0.2}>
          <TechStack />
        </SectionEffect>

        <SectionEffect delay={0.3}>
          <Projects />
        </SectionEffect>

        <SectionEffect delay={0.4}>
          <Contact />
        </SectionEffect>
      </div>
    </div>
  );
};

export default page;
