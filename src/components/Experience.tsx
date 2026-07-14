"use client";

import { manrope } from "@/utils/fonts";
import React from "react";
import { experiences } from "@/data/experience";
import { motion } from "framer-motion";

const Experience = () => {
    // Steeper slope from bottom-left to top-right
    const stockPath = "M 10 160 L 45 152 L 80 158 L 115 140 L 150 145 L 170 120 L 190 110 L 230 102 L 260 110 L 290 90 L 320 100 L 350 70 L 370 60 L 405 52 L 440 58 L 475 35 L 510 45 L 535 15 L 550 10";

    const milestones = [
        { exp: experiences[0], cx: 10, cy: 160, textX: 10, textY: 178, align: "start" },
        { exp: experiences[1], cx: 190, cy: 110, textX: 190, textY: 128, align: "middle" },
        { exp: experiences[2], cx: 370, cy: 60, textX: 370, textY: 78, align: "middle" },
        { exp: experiences[3], cx: 550, cy: 10, textX: 550, textY: 28, align: "end" },
    ];

    return (
        <div className="relative mt-8 max-w-3xl">
            <div className="flex flex-col mb-6 pl-2">
                <h2 className={`text-lg font-bold text-zinc-100 ${manrope}`}>
                    Career Growth
                </h2>
                <p className="text-xs text-zinc-500 font-mono mt-1">
                    Trajectory: Aug 2024 - Present
                </p>
            </div>

            {/* SVG Canvas */}
            <div className="relative w-full aspect-[3/1] sm:aspect-[3.5/1] overflow-hidden">
                <svg 
                    viewBox="0 0 570 200" 
                    className="w-full h-full overflow-visible"
                    preserveAspectRatio="xMidYMid meet"
                >
                    {/* Animated Zig-Zag Stock Line */}
                    <motion.path 
                        d={stockPath}
                        fill="none" 
                        stroke="#52525b" // zinc-600
                        strokeWidth="1.5" // Reduced thickness
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 2.5, ease: "easeInOut" }}
                    />

                    {/* Nodes and Text */}
                    {milestones.map((m, i) => (
                        <g key={i} className="group/node cursor-pointer">
                            {/* Invisible Hit Area for Thumb/Mouse Hover */}
                            <rect 
                                x={m.cx - 30} 
                                y={m.cy - 30} 
                                width="60" 
                                height="60" 
                                fill="transparent" 
                            />

                            {/* Blinking effect for the current point (last item) */}
                            {i === milestones.length - 1 && (
                                <motion.circle 
                                    cx={m.cx} 
                                    cy={m.cy} 
                                    r="2.5" 
                                    fill="none" 
                                    stroke="#52525b" 
                                    strokeWidth="1.5"
                                    animate={{ scale: [1, 4], opacity: [1, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                                />
                            )}

                            {/* Mini Node Dot */}
                            <motion.circle 
                                cx={m.cx} 
                                cy={m.cy} 
                                r="2.5" // Mini dot
                                fill="#52525b" // zinc-600 (solid color)
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.5 + (i * 0.4), type: "spring" }}
                            />
                            
                            {/* Text Container */}
                            <motion.g
                                initial={{ opacity: 0, y: 5 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.7 + (i * 0.4) }}
                            >
                                {/* Company / Title always visible */}
                                <text 
                                    x={m.textX} 
                                    y={m.textY} 
                                    fill="#d4d4d8" // zinc-300
                                    fontSize="10"
                                    fontWeight="600"
                                    textAnchor={m.align}
                                    className={`${manrope} group-hover/node:fill-white transition-colors duration-300`}
                                >
                                    {m.exp.company}
                                </text>
                                
                                {/* Duration shown ONLY on hover of this node */}
                                <text 
                                    x={m.textX} 
                                    y={m.textY + 12} 
                                    fill="#71717a" // zinc-500
                                    fontSize="9"
                                    textAnchor={m.align}
                                    className="font-mono opacity-0 group-hover/node:opacity-100 transition-opacity duration-300"
                                >
                                    {m.exp.duration}
                                </text>
                            </motion.g>
                        </g>
                    ))}
                </svg>
            </div>
        </div>
    );
};

export default Experience;
