"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";
import { GoFile } from "react-icons/go";
import { RiTwitterXFill } from "react-icons/ri";
import { motion } from "framer-motion";

const navItemOuterClass = "py-1 flex items-center justify-center";
const navItemInnerClass =
  "p-1.5 rounded-full transition-all duration-300 hover:bg-[#262626]";

const TOP_THRESHOLD = 24;

const Navbar = () => {
  const [isAtTop, setIsAtTop] = useState(true);
  const isFirstEntrance = useRef(true);

  useEffect(() => {
    const onScroll = () => {
      setIsAtTop(window.scrollY <= TOP_THRESHOLD);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showEntrance = isAtTop && isFirstEntrance.current;

  return (
    <motion.nav
      className="w-full py-6 flex justify-center fixed top-0 z-50"
      initial={{ y: -48, opacity: 0 }}
      animate={
        isAtTop
          ? { y: 0, opacity: 1 }
          : { y: -80, opacity: 0 }
      }
      transition={
        showEntrance
          ? { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.25 }
          : {
              type: "tween",
              duration: 0.55,
              ease: [0.45, 0, 0.15, 1],
            }
      }
      onAnimationComplete={() => {
        if (isAtTop) isFirstEntrance.current = false;
      }}
      style={{ pointerEvents: isAtTop ? "auto" : "none" }}
    >
      <div className="rounded-full w-[200px] md:w-[300px] px-2 backdrop-blur-md border border-zinc-800/80 flex items-center justify-center shadow-none bg-zinc-950/70 relative z-50">
        <div className="flex justify-center px-2 items-center gap-8 transition-all">
          <a
            href="https://drive.google.com/file/d/1RO7ETBM8YmkltD1TACJlgcqMngvlwVJY/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={navItemOuterClass}>
              <div className={navItemInnerClass}>
                <GoFile className="w-5 h-5 text-white" />
              </div>
            </div>
          </a>

          <Link href="https://github.com/Bhaveshanjana">
            <div className={navItemOuterClass}>
              <div className={navItemInnerClass}>
                <FaGithub className="w-5 h-5 text-white" />
              </div>
            </div>
          </Link>

          <Link href="https://x.com/Bhavesh2034">
            <div className={navItemOuterClass}>
              <div className={navItemInnerClass}>
                <RiTwitterXFill className="w-5 h-5 text-white" />
              </div>
            </div>
          </Link>

          <Link href="https://linkedin.com/in/bhavesh-anjana">
            <div className={navItemOuterClass}>
              <div className={navItemInnerClass}>
                <IoLogoLinkedin className="w-5 h-5 text-white" />
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="min-w-full bg-black -mt-12 absolute h-28 blur-lg" />
    </motion.nav>
  );
};

export default Navbar;
