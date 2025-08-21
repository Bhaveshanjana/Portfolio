"use client";

import React from "react";
import ProjectCard from "./ProjectCard";
import Image from "next/image";
import { IoLogoGithub } from "react-icons/io5";
import { PiLink } from "react-icons/pi";
import { bricolage_grotesque, sans, urban } from "@/utils/fonts";

type project = {
  title: string;
  image: string;
  github?: string;
  link?: string;
  category: string;
  description: string;
};
const Project = () => {
  const data: project[] = [
    {
      github: "https://github.com/Bhaveshanjana/TravoBot",
      link: "https://travo-bot.vercel.app/",
      title: "TravoBot",
      image: "/projects/TravoBot.png",
      category: "main",
      description: "An AI-based travel itinerary generator powered by Gemini.",
    },
    {
      title: "DaignoBot",
      image: "/projects/DaignoBot.png",
      github: "https://github.com/Bhaveshanjana/DiagnoBot",
      link: "https://diagno-bot.vercel.app/",
      category: "main",
      description:
        "An AI-assisted health checker where users input symptoms to get predicted conditions.",
    },
    {
      github: "https://github.com/Bhaveshanjana/BUZZBOT",
      title: "BuzzBot",
      image: "/projects/BuzzBot.png",
      category: "main",
      description:
        "A MCP server utility where users can tweet directly from VS Code without opening Twitter.",
    },
    {
      title: "WipeBg",
      image: "/projects/wipebg.png",
      github: "https://github.com/Bhaveshanjana/WIPEBG",
      link: "https://wipebg.vercel.app/",
      category: "main",
      description:
        "A clean and simple app to remove image backgrounds instantly.",
    },
    {
      title: "Blogify",
      image: "/projects/Blogify.png",
      category: "main",
      github: "https://github.com/Bhaveshanjana/Blogify",
      link: "https://blogify-one-alpha.vercel.app/",
      description:
        "Dynamic Blog Platform Allowing Users to Write, Publish, and Read Blogs built with next and typescript",
    },
    {
      title: "SSM",
      image: "/projects/Ssm.png",
      category: "saas",
      link: "https://ssmin.vercel.app/",
      description:
        "Landing page for an Finance company 'SSM'. built with next and motion",
    },
    {
      title: "OpenSphere",
      image: "/projects/OpenSphere.png",
      category: "saas",
      link: "https://opensphere.vercel.app/",
      github: "https://github.com/Bhaveshanjana/OpenSphere",
      description:
        "An mini Saas project. built with next and motion",
    },
    {
      title: "Eclypse",
      image: "/projects/Eclypse.png",
      category: "saas",
      link: "https://eclypse-sigma.vercel.app/",
      github: "https://github.com/Bhaveshanjana/Web-Assignment03",
      description: "Landing Page from an assignment",
    },
  ];

  const mainProjects = data.filter((p) => p.category === "main");

  const saasProjects = data.filter((p) => p.category === "saas");

  return (
    <div className="mx-5">
      <h1 className="dark:text-gray-200 mt-9 mb-1.5 text-sm md:text-[16px] bg-gradient-to-r from-[#d3d7da53] dark:bg-gradient-to-r dark:from-[#0C1C21] border-l-2 border-gray-600 dark:border-gray-400">
        <span className={`ml-2 ${sans}`}>Projects</span>
      </h1>
      {/* Main Project card */}
      <div className="grid md:grid-cols-2 gap-2 ">
        {mainProjects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
      {/* Saas projects heading */}
      <h3 className="dark:text-gray-200 text-sm md:text-[16px] mt-5 mb-2 bg-gradient-to-r from-[#d3d7da53] dark:bg-gradient-to-r dark:from-[#0C1C21] border-l-2">
        <span className={`ml-2 ${sans}`}>Some Saas Projects</span>
      </h3>
      {/* Saas projects */}
      <div className="grid md:grid-cols-2 gap-2">
        {saasProjects.map((sas, index) => (
          <div
            key={index}
            className="relative border border-gray-300 hover:border-gray-400 dark:border-dashed dark:hover:border-[#525256] dark:hover:bg-[#131314] dark:border-[#27272a] rounded-xs hover:shadow-xl transition-all duration-300  overflow-hidden shadow-lg group "
          >
            <div>
              <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gray-600 dark:border-gray-100  opacity-0 group-hover:opacity-100 transition duration-500"></span>
              <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-gray-600 dark:border-gray-100  opacity-0 group-hover:opacity-100 transition duration-500"></span>

              {/* Bottom-left corner */}
              <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-gray-600 dark:border-gray-100  opacity-0 group-hover:opacity-100 transition duration-500"></span>

              {/* Bottom-right corner */}
              <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gray-600 dark:border-gray-100  opacity-0 group-hover:opacity-100 transition duration-500"></span>
            </div>
            <div className="relative h-[200px]">
              <div className="absolute inset-2">
                <Image
                  fill
                  src={sas.image}
                  alt={`${sas.title} project screenshot`}
                  className="object-cover rounded-md "
                />
              </div>
            </div>

            <div>
              {/* Project title & Link's */}
              <div className="flex justify-between items-center mb-1 mx-2.5">
                <h3 className={`dark:text-gray-100 text-gray-700 text-sm ${urban}`}>
                  {sas.title}
                </h3>
                <div className="flex gap-2">
                  {sas.github && (
                    <a
                      href={sas.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IoLogoGithub className="text-lg md:text-xl text-gray-500 hover:scale-110 transition-all duration-200 dark:hover:text-blue-500" />
                    </a>
                  )}
                  {sas.link && (
                    <a
                      href={sas.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <PiLink className="text-lg md:text-xl text-gray-500 hover:scale-110 transition-all duration-200 dark:hover:text-blue-500" />
                    </a>
                  )}
                </div>
              </div>
              {/* Description */}
              <div className=" gap-2 mb-1 mx-2.5">
                <div className="dark:bg-transparent text-xs lg:text-[11px]">
                  <span className={`${bricolage_grotesque} dark:text-gray-500`}>
                    {sas.description}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;
