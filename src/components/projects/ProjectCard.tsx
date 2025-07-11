import { bricolage_grotesque } from "@/utils/fonts";
import Image from "next/image";
import React from "react";
import { IoLogoGithub } from "react-icons/io5";
import { PiLink } from "react-icons/pi";

type projectProps = {
  project: {
    title: string;
    image: string;
    description: string;
    link?: string;
    github?: string;
  };
};
const ProjectCard = ({ project }: projectProps) => {
  return (
    <div className="dark:bg-[#27272a26] dark:hover:bg-[#1b1b1d] bg-[#2b2b2d0a] border dark:border-[#27272a] border-gray-300 rounded-lg hover:shadow-xl transition-all duration-300 my-1 overflow-hidden shadow-lg">
      {/* Project's image */}
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

      <div className="flex flex-col w-full">
        {/* Project title & Link's */}
        <div className="flex justify-between items-center mb-1 mx-2.5">
          <h3 className="dark:text-gray-100 text-gray-700 text-sm">
            {project.title}
          </h3>
          <div className="flex gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IoLogoGithub className="text-lg md:text-xl text-gray-500 hover:scale-110 transition-all duration-200 dark:hover:text-blue-500" />
              </a>
            )}
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <PiLink className="text-lg md:text-xl text-gray-500 hover:scale-110 transition-all duration-200 dark:hover:text-blue-500" />
              </a>
            )}
          </div>
        </div>
        {/* Description */}
        <div className=" gap-2 mb-1 mx-2.5">
          <div className="dark:bg-transparent text-xs lg:text-[11px]">
            <span className={`${bricolage_grotesque} dark:text-gray-500`}>
              {project.description}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;