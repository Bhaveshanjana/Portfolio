import Hero from "@/components/Hero";
import Projects from "@/components/projects/Project";
import TechStack from "@/components/TechStack";
import React from "react";

const page = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="max-w-[680px] mx-auto">
        <Hero />
        {/* Tech Stack */}
        <TechStack />
        {/* Project */}
        <Projects />
      </div>
    </div>
  );
};

export default page;
