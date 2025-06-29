import Image from "next/image";
import React from "react";
import { IoLogoGithub } from "react-icons/io5";
import { PiLink } from "react-icons/pi";

type projectProps = {
  project: {
    title: string;
    image: string;
    tech: [];
    link: string;
    github: string;
  };
};
const ProjectCard = ({ project }: projectProps) => {
  return (
    <div className="dark:bg-gray-800/80 bg-gray-300 flex flex-col items-center rounded-lg hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 my-1 overflow-hidden shadow-md">
      <div className="relative w-full h-[180px]">
        <div className="absolute inset-1">
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
          <h3 className="dark:text-gray-300 text-gray-700 text-lg md:text-sm">
            {project.title}
          </h3>
          <div className="flex gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IoLogoGithub className=" md:text-xl hover:scale-110 transition-all duration-200 hover:text-white" />
              </a>
            )}
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <PiLink className="md:text-xl hover:scale-110 transition-all duration-200 hover:text-white" />
              </a>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-1 cursor-pointer">
          {project.tech.map((tech, i) => (
            <div
              key={i}
              className="dark:bg-transparent border border-gray-600 bg-white flex items-center rounded-md px-2 py-0.5 dark:text-white text-gray-800 text-xs lg:text-[11px]"
            >
              <span>{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
