"use client";

import React, { useEffect, useState } from "react";
import HyperText from "./utils/HyperText";
import { manrope } from "@/utils/fonts";

const ROLES = ["Bhavesh", "Vibe Coder", "Frontend Dev", "Backend Dev"];
const ANIMATION_MS = 1500;
const HOLD_MS = 2000;

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, ANIMATION_MS + HOLD_MS);

    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <div className="mt-32">
        <h2 className={`text-gray-400 text-sm md:text-[16px] ${manrope}`}>
          <div className="flex flex-wrap items-center gap-x-2 mb-1 md:mb-2">
            <span className="font-mono text-[15px] md:text-lg text-gray-200 leading-none">
              HI, I AM
            </span>
            <HyperText
              text={ROLES[roleIndex]}
              className="text-[15px] md:text-lg text-gray-200 leading-none"
              duration={ANIMATION_MS}
            />
          </div>
          Full-stack by skill, automation by default. I build systems so I don’t repeat the same work twice.
        </h2>
      </div>
    </div>
  );
};

export default Hero;
