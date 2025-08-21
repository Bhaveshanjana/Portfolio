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
    <div className=" dark:hover:bg-[#131314] bg-[#2b2b2d0a] border dark:border-dashed dark:hover:border-[#525256] dark:border-[#27272a] border-gray-300 hover:border-gray-400 rounded-xs hover:shadow-xl transition duration-500  overflow-hidden shadow-md relative group">
      <div>
        <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gray-600 dark:border-gray-100 opacity-0 group-hover:opacity-100 transition duration-300"></span>
        <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-gray-600 dark:border-gray-100 opacity-0 group-hover:opacity-100 transition duration-300"></span>

        {/* Bottom-left corner */}
        <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-gray-600 dark:border-gray-100 opacity-0 group-hover:opacity-100 transition duration-300"></span>

        {/* Bottom-right corner */}
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
          <h3 className={`dark:text-gray-100 text-gray-700 text-sm tracking-wider  ${urban}`}>
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
