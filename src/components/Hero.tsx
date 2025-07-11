import React from "react";
import HyperText from "./utils/HyperText";
import { manrope } from "@/utils/fonts";

const Hero = () => {
  return (
    <div>
      <div className="mt-36 mx-5">
        <h2 className={`dark:text-gray-400 text-sm md:text-[16px] ${manrope}`}>
          <HyperText
            text="Hi,i am Bhavesh"
            className="text-[15px] md:text-lg dark:text-gray-200"
            duration={1000}
          />
          BCA student & passionate full-stack developer with a strong foundation
          in frontend and backend technologies. I focus on building fast, clean,
          and user-friendly digital experiences that solve real-world problems.
        </h2>
      </div>
    </div>
  );
};

export default Hero;
