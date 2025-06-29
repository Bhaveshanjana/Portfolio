"use client";

import React from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";
import { useDarkMode } from "@/hooks/UseDarkMode";
import { IoLogoLinkedin } from "react-icons/io5";
import { GoFile } from "react-icons/go";
import {
  RiMoonClearLine,
  RiTwitterXFill,
} from "react-icons/ri";
import { TiWeatherSunny } from "react-icons/ti";

const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <nav className="w-full py-6 flex justify-center fixed top-0 z-50 ">
      <div className="rounded-full w-[250px] md:w-[500px] px-2 py-1 bg-white bg-opacity-10 backdrop-blur-lg border dark:border-white/20 flex items-center justify-center dark:shadow-none shadow dark:bg-gray-900 ">
        <div className="flex justify-center px-2 items-center max-sm:gap-4 gap-8 max-[400px]:gap-4 max-[450px]:gap-5 transition-all">
          <Link href="#">
            <div>
              <div className="hover:px-3 max-sm:hover:px-2 py-2.5 dark:hover:bg-[#262626] hover:bg-[#F4F4F5] rounded-full transition-all duration-300">
                <GoFile className="w-[19px] h-[19px] max-sm:h-[15px] max-sm:w-[15px] text-black dark:text-white" />
              </div>
            </div>
          </Link>

          <Link href="">
            <div>
              <div className="hover:px-3 max-sm:hover:px-2 py-2.5 dark:hover:bg-[#262626] hover:bg-[#F4F4F5] rounded-full transition-all duration-300">
                <FaGithub className="w-[19px] h-[19px] max-sm:w-[15px] max-sm:h-[15px] text-black dark:text-white" />
              </div>
            </div>
          </Link>

          <Link href="#">
            <div>
              <div className="hover:px-3 max-sm:hover:px-2 py-2.5 dark:hover:bg-[#262626] hover:bg-[#F4F4F5] rounded-full transition-all duration-300">
                <RiTwitterXFill className="w-[17px] h-[17px] max-sm:w-[15px] max-sm:h-[15px] text-black dark:text-white" />
              </div>
            </div>
          </Link>

          <Link href="">
            <div content="Linkedin">
              <div className="hover:px-3 max-sm:hover:px-2 py-2.5 dark:hover:bg-[#262626] hover:bg-[#F4F4F5] rounded-full transition-all duration-300">
                <IoLogoLinkedin className="w-[19px] h-[19px] max-sm:w-[15px] max-sm:h-[15px] text-black dark:text-white" />
              </div>
            </div>
          </Link>

          <div
            onClick={toggleDarkMode}
            className="hover:px-3 max-sm:hover:px-2 py-2.5 rounded-full transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center">
              <button>
                {isDarkMode ? (
                  <RiMoonClearLine className="w-[18px] h-[18px] max-sm:w-[14px] max-sm:h-[14px] dark:text-white" />
                ) : (
                  <TiWeatherSunny className="w-5 h-5 max-sm:w-[15px] max-sm:h-[15px]" />
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
