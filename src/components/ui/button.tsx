import React, { useRef } from "react";
import { motion, useAnimationFrame, HTMLMotionProps } from "framer-motion";

export interface ShinyButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  className?: string;
}

export const ShinyButton: React.FC<ShinyButtonProps> = ({
  children,
  className = "",
  style,
  ...props
}) => {
  const ref = useRef<HTMLButtonElement>(null);

  // Animate --x using useAnimationFrame
  useAnimationFrame((t) => {
    // 2.5s loop, value from 100% to -100%
    const progress = (t / 2500) % 1;
    const value = 100 - 200 * progress;
    if (ref.current) {
      ref.current.style.setProperty("--x", `${value}%`);
    }
  });

  return (
    <motion.button
      ref={ref}
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 20,
        damping: 15,
        mass: 2,
        scale: {
          type: "spring",
          stiffness: 200,
          damping: 5,
          mass: 0.5,
        },
      }}
      {...props}
      style={{
        ...style,
        // Set the initial value for --x
        ["--x" as string]: "100%",
      }}
      className={`relative rounded-lg px-8 py-2 mt-6 font-medium backdrop-blur-xl transition-shadow duration-300 ease-in-out bg-gray-100/80 dark:bg-transparent hover:shadow dark:bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.1)_0%,transparent_60%)] dark:hover:shadow-[0_0_20px_hsl(var(--primary)/0.1)] ${className}`}
    >
      <span
        className="relative block size-full text-sm uppercase tracking-wide text-[rgb(0,0,0,0.65)] dark:font-light dark:text-[rgb(255,255,255,0.9)]"
        style={{
          maskImage:
            "linear-gradient(-75deg,hsl(var(--primary)) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),hsl(var(--primary)) calc(var(--x) + 100%))",
          WebkitMaskImage:
            "linear-gradient(-75deg,hsl(var(--primary)) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),hsl(var(--primary)) calc(var(--x) + 100%))",
        }}
      >
        {children}
      </span>
      <span
        aria-hidden
        style={{
          mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
        }}
        className="cursor-pointer absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,hsl(var(--primary)/0.1)_calc(var(--x)+20%),hsl(var(--primary)/0.5)_calc(var(--x)+25%),hsl(var(--primary)/0.1)_calc(var(--x)+100%))] p-px"
      ></span>
    </motion.button>
  );
};

export default ShinyButton;