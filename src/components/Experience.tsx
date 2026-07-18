"use client";

import { manrope } from "@/utils/fonts";
import React, { useState } from "react";
import { experiences } from "@/data/experience";
import { motion } from "framer-motion";

const LINE_DURATION = 2.5;
const DOT_RADIUS = 3.5;

const Experience = () => {
  // ~75% of viewBox width — leaves room on the right for future companies
  const stockPath =
    "M 45 155 L 80 148 L 115 152 L 150 135 L 185 140 L 215 118 L 245 108 L 280 100 L 310 108 L 345 88 L 375 95 L 405 70 L 430 45";

  const milestones = [
    {
      exp: experiences[0],
      cx: 45,
      cy: 155,
      textX: 45,
      textY: 173,
      align: "middle" as const,
    },
    {
      exp: experiences[1],
      cx: 245,
      cy: 108,
      textX: 245,
      textY: 126,
      align: "middle" as const,
    },
    {
      exp: experiences[2],
      cx: 430,
      cy: 45,
      textX: 430,
      textY: 63,
      align: "middle" as const,
    },
  ];

  const [pulseActive, setPulseActive] = useState(false);

  return (
    <div className="relative mt-8 max-w-3xl">
      <div className="flex flex-col mb-6 pl-2">
        <h2 className={`text-lg font-bold text-zinc-100 ${manrope}`}>
          Career Growth
        </h2>
      </div>

      <div className="relative w-full aspect-[3/1] sm:aspect-[3.5/1] overflow-hidden">
        <svg
          viewBox="0 0 570 200"
          className="w-full h-full overflow-visible"
          preserveAspectRatio="xMinYMid meet"
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
            const nodeDelay =
              0.15 + (i / (milestones.length - 1)) * LINE_DURATION * 0.85;

            const duration = m.exp.duration;
            const padX = 8;
            const tipW = duration.length * 5.8 + padX * 2;
            const tipH = 16;
            // First node sits on the left edge — open the pill to the right so it isn't clipped
            const isFirst = i === 0;
            const tipX = isFirst ? m.cx - 40 : m.cx - tipW / 2;;
            const tipY = m.cy - tipH - 16;
            const tipTextX = isFirst ? tipX + tipW / 2 : m.cx;

            return (
              <g key={i} className="group/node cursor-pointer">
                <rect
                  x={m.cx - 36}
                  y={m.cy - 36}
                  width="72"
                  height="72"
                  fill="transparent"
                />

                {isCurrent && pulseActive && (
                  <motion.circle
                    cx={m.cx}
                    cy={m.cy}
                    r={DOT_RADIUS}
                    fill="none"
                    strokeWidth="1.5"
                    className="stroke-zinc-400"
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{ scale: [1, 3.2], opacity: [1, 0] }}
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
                  r={DOT_RADIUS}
                  className={
                    isCurrent && pulseActive ? "fill-zinc-200" : "fill-zinc-500"
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
                  <g className="opacity-0 group-hover/node:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <rect
                      x={tipX}
                      y={tipY}
                      width={tipW}
                      height={tipH}
                      rx={3}
                      className="fill-zinc-800 stroke-zinc-700"
                      strokeWidth="0.75"
                    />
                    <text
                      x={tipTextX}
                      y={tipY + tipH / 2}
                      fontSize="11"
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="font-mono fill-zinc-200"
                    >
                      {duration}
                    </text>
                  </g>

                  <text
                    x={m.textX}
                    y={m.textY}
                    fontSize="11"
                    fontWeight="600"
                    textAnchor={m.align}
                    className={`${manrope} fill-zinc-50 group-hover/node:fill-white transition-colors duration-300`}
                  >
                    {m.exp.company}
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
