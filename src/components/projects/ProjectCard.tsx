import { bricolage_grotesque } from "@/utils/fonts";
import Image from "next/image";
import React from "react";
import { IoLogoGithub } from "react-icons/io5";
import { PiLink } from "react-icons/pi";

type projectProps = {
  project: {
    title: string;
    image: string;
    tech: string[];
    link?: string;
    github?: string;
  };
};
const ProjectCard = ({ project }: projectProps) => {
  return (
    <div className="dark:bg-[#27272a26] dark:hover:bg-[#1b1b1d] bg-[#2b2b2d0a] flex flex-col items-center rounded-lg hover:shadow-xl transition-all duration-300 my-1 overflow-hidden shadow-lg">
      <div className="relative w-full h-[180px]">
        <div className="absolute inset-2">
          <Image
            fill
            src={project.image}
            alt={`${project.title} project screenshot`}
            className="object-cover rounded-md transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>

      <div className="flex flex-col w-full p-2 ">
        <div className="flex justify-between w-full items-center mb-3">
          <h3 className="dark:text-gray-400 text-gray-700 text-lg md:text-sm">
            {project.title}
          </h3>
          <div className="flex gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IoLogoGithub className="text-xl text-gray-600 hover:scale-110 transition-all duration-200 dark:hover:text-blue-500" />
              </a>
            )}
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <PiLink className="text-xl text-gray-600 hover:scale-110 transition-all duration-200 dark:hover:text-blue-500" />
              </a>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-1 cursor-pointer">
          {project.tech.map((tech, i) => (
            <div
              key={i}
              className="dark:bg-transparent border border-gray-600 bg-white/80 flex items-center rounded-md px-2 py-0.5 dark:text-white text-gray-800 text-xs lg:text-[11px]"
            >
              <span className={`${bricolage_grotesque} dark:text-gray-400`}>
                {tech}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
