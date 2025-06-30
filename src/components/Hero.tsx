import React from "react";
import HyperText from "./HyperText";

const Hero = () => {
  return (
    <div>
      <div className="mt-36 mx-4">
        <h2 className="dark:text-gray-400">
          <HyperText
            text="Hi, am Bhavesh"
            className="text-lg dark:text-gray-200"
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
