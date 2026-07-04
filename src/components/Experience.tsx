import { manrope } from "@/utils/fonts";
import React from "react";
import { SectionHeader } from "./ui/SectionHeader";

const Experience = () => {
    const experiences = [
        {
            role: "Frontend Developer",
            company: "at Capsai",
            duration: "Jan 2026 - Feb 2026",
        },
        {
            role: "Frontend Developer",
            company: "at Yakshar",
            duration: "Oct 2025 - Dec 2025",
        },
    ];

    return (
        <div className="-my-1">
            <SectionHeader title="Experience" />

            <div className="flex flex-col gap-4">
                {experiences.map((exp, index) => (
                    <div key={index} className="flex  justify-between items-start sm:items-center group">
                        <div className="flex flex-col">
                            <h3 className={`text-[15px] font-medium dark:text-gray-200 text-gray-800 ${manrope}`}>
                                {exp.role}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{exp.company}</p>
                        </div>

                        <div className={`text-xs text-gray-500 dark:text-gray-400 dark:border-gray-600 border-gray-400 ${manrope} mt-1 border-b border-dashed`}>
                            {exp.duration}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Experience;
