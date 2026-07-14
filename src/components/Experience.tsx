"use client";

import { manrope } from "@/utils/fonts";
import React, { useState } from "react";
import { experiences } from "@/data/experience";
import { motion } from "framer-motion";

const LINE_DURATION = 2.5;

const Experience = () => {
  const stockPath =
    "M 10 160 L 45 152 L 80 158 L 115 140 L 150 145 L 170 120 L 190 110 L 230 102 L 260 110 L 290 90 L 320 100 L 350 70 L 370 60 L 405 52 L 440 58 L 475 35 L 510 45 L 535 15 L 550 10";

  const milestones = [
    {
      exp: experiences[0],
      cx: 10,
      cy: 160,
      textX: 10,
      textY: 178,
      align: "start" as const,
    },
    {
      exp: experiences[1],
      cx: 190,
      cy: 110,
      textX: 190,
      textY: 128,
      align: "middle" as const,
    },
    {
      exp: experiences[2],
      cx: 370,
      cy: 60,
      textX: 370,
      textY: 78,
      align: "middle" as const,
    },
    {
      exp: experiences[3],
      cx: 550,
      cy: 10,
      textX: 550,
      textY: 28,
      align: "end" as const,
    },
  ];

  const [pulseActive, setPulseActive] = useState(false);

  return (
    <div className="relative mt-8 max-w-3xl">
      <div className="flex flex-col mb-6 pl-2">
        <h2
          className={`text-lg font-bold text-zinc-100 ${manrope}`}
        >
          Career Growth
        </h2>
        <p className="text-xs text-zinc-500 font-mono mt-1">
          Trajectory: Aug 2024 - Present
        </p>
      </div>

      <div className="relative w-full aspect-[3/1] sm:aspect-[3.5/1] overflow-hidden">
        <svg
          viewBox="0 0 570 200"
          className="w-full h-full overflow-visible"
          preserveAspectRatio="xMidYMid meet"
        >
          <motion.path
            d={stockPath}
            fill="none"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-zinc-600"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: LINE_DURATION, ease: "easeInOut" }}
            onAnimationComplete={() => setPulseActive(true)}
          />

          {milestones.map((m, i) => {
            const isCurrent = i === milestones.length - 1;
            const nodeDelay = 0.15 + (i / (milestones.length - 1)) * LINE_DURATION * 0.85;

            return (
              <g key={i} className="group/node cursor-pointer">
                <rect
                  x={m.cx - 30}
                  y={m.cy - 30}
                  width="60"
                  height="60"
                  fill="transparent"
                />

                {isCurrent && pulseActive && (
                  <motion.circle
                    cx={m.cx}
                    cy={m.cy}
                    r="2.5"
                    fill="none"
                    strokeWidth="1.5"
                    className="stroke-zinc-400"
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{ scale: [1, 4], opacity: [1, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                )}

                <motion.circle
                  cx={m.cx}
                  cy={m.cy}
                  r="2.5"
                  className={
                    isCurrent && pulseActive
                      ? "fill-zinc-200"
                      : "fill-zinc-600"
                  }
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.35,
                    delay: nodeDelay,
                    type: "spring",
                  }}
                />

                <motion.g
                  initial={{ opacity: 0, y: 5 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: nodeDelay + 0.15 }}
                >
                  <text
                    x={m.textX}
                    y={m.textY}
                    fontSize="10"
                    fontWeight="600"
                    textAnchor={m.align}
                    className={`${manrope} fill-zinc-300 group-hover/node:fill-white transition-colors duration-300`}
                  >
                    {m.exp.company}
                  </text>

                  <text
                    x={m.textX}
                    y={m.textY + 12}
                    fontSize="9"
                    textAnchor={m.align}
                    className="font-mono fill-zinc-500 opacity-0 group-hover/node:opacity-100 transition-opacity duration-300"
                  >
                    {m.exp.duration}
                  </text>
                </motion.g>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default Experience;
