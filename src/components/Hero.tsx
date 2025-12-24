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
          MERN stack developer, I love building full-stack applications, but I really focus on making the UI look great and feel smooth for the user :)
        </h2>
      </div>
    </div>
  );
};

export default Hero;
