"use client";

import React from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";
import { GoFile } from "react-icons/go";
import { RiTwitterXFill } from "react-icons/ri";

const navItemClass =
  "hover:px-3 max-sm:hover:px-2 py-2.5 hover:bg-[#262626] rounded-full transition-all duration-300";

const Navbar = () => {
  return (
    <nav className="w-full py-6 flex justify-center fixed top-0 z-50">
      <div className="rounded-full w-[200px] md:w-[420px] px-2 backdrop-blur-sm border border-gray-700 flex items-center justify-center shadow-none bg-gray-900/50 relative z-50">
        <div className="flex justify-center px-2 items-center gap-8 transition-all">
          <a
            href="https://drive.google.com/file/d/1RO7ETBM8YmkltD1TACJlgcqMngvlwVJY/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={navItemClass}>
              <GoFile className="w-5 h-5 text-white" />
            </div>
          </a>

          <Link href="https://github.com/Bhaveshanjana">
            <div className={navItemClass}>
              <FaGithub className="w-5 h-5 text-white" />
            </div>
          </Link>

          <Link href="https://x.com/Bhavesh2034">
            <div className={navItemClass}>
              <RiTwitterXFill className="w-5 h-5 text-white" />
            </div>
          </Link>

          <Link href="https://linkedin.com/in/bhavesh-anjana">
            <div className={navItemClass}>
              <IoLogoLinkedin className="w-5 h-5 text-white" />
            </div>
          </Link>
        </div>
      </div>
      <div className="min-w-full bg-black -mt-12 absolute h-28 blur-lg" />
    </nav>
  );
};

export default Navbar;
