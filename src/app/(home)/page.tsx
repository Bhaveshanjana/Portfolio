import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import React from "react";

const page = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="max-w-[600px] mx-auto">
        <Hero />
        {/* Tech Stack */}
        <TechStack />
      </div>
    </div>
  );
};

export default page;
