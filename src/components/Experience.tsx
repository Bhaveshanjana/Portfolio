import { manrope, sans } from "@/utils/fonts";
import React from "react";

const Experience = () => {
    const experiences = [
        {
            role: "Frontend Developer",
            company: "at Yakshar",
            duration: "Oct 2025 - Jan 2026",
            description: "i work as an frontend developer",
        },
    ];

    return (
        <div className="-my-1">
            <h1 className="dark:text-gray-300 text-black mb-4 text-[14px] md:text-[15px] mx-5 bg-gradient-to-r from-[#d3d7da53] dark:bg-gradient-to-r dark:from-[#0C1C21] border-l-2 border-gray-600 dark:border-gray-400 ">
                <span className={`ml-2 ${sans}`}>Experience</span>
            </h1>

            <div className="mx-5 flex flex-col gap-4">
                {experiences.map((exp, index) => (
                    <div key={index} className="flex  justify-between items-start sm:items-center group">
                        <div className="flex flex-col">
                            <h3 className={`text-[15px] font-medium dark:text-gray-200 text-gray-800 ${manrope}`}>
                                {exp.role}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{exp.company}</p>
                        </div>

                        <div className={`text-xs text-gray-500 dark:text-gray-400 ${manrope} mt-1 border-b border-dashed`}>
                            {exp.duration}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Experience;
