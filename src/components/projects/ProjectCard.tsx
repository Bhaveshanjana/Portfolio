import { bricolage_grotesque, urban } from "@/utils/fonts";
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
    <div className=" dark:hover:bg-[#131314] bg-[#2b2b2d0a] border dark:border-dashed dark:hover:border-[#525256] dark:border-[#27272a] border-gray-300 hover:border-gray-400 rounded-xs hover:shadow-xl transition duration-500  overflow-hidden shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] relative group">
      {/* Corner effect */}
      <div>
        <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gray-600 dark:border-gray-100 opacity-0 group-hover:opacity-100 transition duration-300"></span>
        <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-gray-600 dark:border-gray-100 opacity-0 group-hover:opacity-100 transition duration-300"></span>
        <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-gray-600 dark:border-gray-100 opacity-0 group-hover:opacity-100 transition duration-300"></span>
        <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gray-600 dark:border-gray-100 opacity-0 group-hover:opacity-100 transition duration-300"></span>
      </div>

      {/* Project's image */}
      <div className="relative w-full h-[200px]">
        <div className="absolute inset-2">
          <Image
            fill
            src={project.image}
            alt={`${project.title} project screenshot`}
            className="object-cover rounded-md "
          />
        </div>
      </div>

      {/* Project title & Link's */}
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center mb-1 mx-2.5">
          <h3
            className={`dark:text-gray-100 text-black text-sm tracking-wider  ${urban}`}
          >
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
        <div className="mb-1 mx-2.5">
          <div className="dark:bg-transparent text-[11px] lg:text-[10px]">
            <span className={`${bricolage_grotesque} dark:text-gray-500 dark:group-hover:text-gray-400`}>
              {project.description}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
