"use client";

import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import Image from "next/image";
import { IoLogoGithub } from "react-icons/io5";
import { PiLink } from "react-icons/pi";
import { bricolage_grotesque } from "@/utils/fonts";

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
        "Landing page for an Finane company 'SSM'. built with next and motion",
    },
    {
      title: "Artistly",
      image: "/projects/Artistly.png",
      category: "saas",
      link: "https://artistly-rho-three.vercel.app/",
      description: "Landing Page from as assignment",
    },
    {
      title: "Eclypse",
      image: "/projects/Eclypse.png",
      category: "saas",
      link: "https://eclypse-sigma.vercel.app/",
      description: "Landing Page from an assignment",
    },
  ];

  const mainProjects = data.filter((p) => p.category === "main");

  const saasProjects = data.filter((p) => p.category === "saas");

  return (
    <div className="mx-5">
      <h1 className="dark:text-gray-300 mt-9 mb-1.5 text-sm md:text-[16px] mx-0.5 bg-gradient-to-r from-[#d3d7da53] dark:bg-gradient-to-r dark:from-[#0C1C21] border-l-2 border-gray-600 dark:border-gray-400">
        <span className="ml-2">Projects</span>
      </h1>
      {/* Main Project card */}
      <div className="grid md:grid-cols-2 gap-2 ">
        {mainProjects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
      {/* Saas projects heading */}
      <h3 className="dark:text-gray-300 text-sm md:text-[16px] mt-5 mb-2 bg-gradient-to-r from-[#d3d7da53] dark:bg-gradient-to-r dark:from-[#0C1C21] border-l-2">
        <span className="ml-2">Some Saas Projects</span>
      </h3>
      {/* Saas projects */}
      <div className="grid md:grid-cols-2 space-x-2">
        {saasProjects.map((sas, index) => (
          <div key={index}>
            <div className="border dark:border-[#27272a] border-gray-300 rounded-lg hover:shadow-xl transition-all duration-300 my-1 overflow-hidden shadow-lg">
              <div className="relative h-[180px]">
                <div className="absolute inset-2">
                  <Image
                    fill
                    src={sas.image}
                    alt={`${sas.title} project screenshot`}
                    className="object-cover rounded-md transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>

              <div>
                {/* Project title & Link's */}
                <div className="flex justify-between items-center mb-1 mx-2.5">
                  <h3 className="dark:text-gray-100 text-gray-700 text-sm">
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
                    <span
                      className={`${bricolage_grotesque} dark:text-gray-500`}
                    >
                      {sas.description}
                    </span>
                  </div>
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
