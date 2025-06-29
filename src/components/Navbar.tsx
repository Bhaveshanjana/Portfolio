"use client";

import React from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";
import { useDarkMode } from "@/hooks/UseDarkMode";
import { IoLogoLinkedin } from "react-icons/io5";
import { GoFile } from "react-icons/go";
import { RiMoonClearLine, RiTwitterXFill } from "react-icons/ri";
import { TiWeatherSunny } from "react-icons/ti";

const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <nav className="w-full py-6 flex justify-center fixed top-0 z-50 ">
      <div className="rounded-full w-[250px] md:w-[500px] px-2 bg-white/10 backdrop-blur-sm border border-gray-300 dark:border-gray-700 flex items-center justify-center dark:shadow-none dark:bg-gray-900/50 ">
        <div className="flex justify-center px-2 items-center  gap-8  transition-all">
          <Link href="#">
            <div>
              <div className="hover:px-3 max-sm:hover:px-2 py-2.5 dark:hover:bg-[#262626] hover:bg-[#9b9be754] rounded-full transition-all duration-300">
                <GoFile className="w-5 h-5  text-black dark:text-white" />
              </div>
            </div>
          </Link>

          <Link href="https://github.com/Bhaveshanjana">
            <div>
              <div className="hover:px-3 max-sm:hover:px-2 py-2.5 dark:hover:bg-[#262626] hover:bg-[#9b9be754]  rounded-full transition-all duration-300">
                <FaGithub className="w-5 h-5  text-black dark:text-white" />
              </div>
            </div>
          </Link>

          <Link href="https://x.com/Bhavesh2034">
            <div>
              <div className="hover:px-3 max-sm:hover:px-2 py-2.5 dark:hover:bg-[#262626] hover:bg-[#9b9be754] rounded-full transition-all duration-300">
                <RiTwitterXFill className="w-5 h-5  text-black dark:text-white" />
              </div>
            </div>
          </Link>

          <Link href="www.linkedin.com/in/bhavesh-anjana">
            <div content="Linkedin">
              <div className="hover:px-3 max-sm:hover:px-2 py-2.5 dark:hover:bg-[#262626] hover:bg-[#9b9be754]  rounded-full transition-all duration-300">
                <IoLogoLinkedin className="w-5 h-5  text-black dark:text-white" />
              </div>
            </div>
          </Link>

          <div
            onClick={toggleDarkMode}
            className="hover:px-1 py-0.5 rounded-full transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center hover:px-3 py-2.5 dark:hover:bg-[#262626] hover:bg-[#9b9be754]  rounded-full transition-all duration-300">
              <button className="cursor-pointer">
                {isDarkMode ? (
                  <RiMoonClearLine className="w-5 h-5  dark:text-white " />
                ) : (
                  <TiWeatherSunny className="w-5 h-5 " />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
