"use client";

import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import { ShinyButton } from "../ui/button";

type project = {
  title: string;
  image: string;
  github?: string;
  link?: string;
  description: string;
};
const Project = () => {
  const [showAll, setShowAll] = useState(false);

  const data: project[] = [
    {
      github: "https://github.com/Bhaveshanjana/TravoBot",
      link: "https://travo-bot.vercel.app/",
      title: "TravoBot",
      image: "/projects/TravoBot.png",
      description: "An AI-based travel itinerary generator powered by Gemini.",
    },
    {
      title: "DaignoBot",
      image: "/projects/DaignoBot.png",
      github: "https://github.com/Bhaveshanjana/DiagnoBot",
      link: "https://diagno-bot.vercel.app/",
      description:
        "An AI-assisted health checker where users input symptoms to get predicted conditions.",
    },
    {
      github: "https://github.com/Bhaveshanjana/BUZZBOT",
      title: "BuzzBot",
      image: "/projects/BuzzBot.png",
      description:
        "A MCP server utility where users can tweet directly from VS Code without opening Twitter.",
    },
    {
      title: "WipeBg",
      image: "/projects/wipebg.png",
      github: "https://github.com/Bhaveshanjana/WIPEBG",
      link: "https://wipebg.vercel.app/",
      description:
        "A clean and simple app to remove image backgrounds instantly.",
    },
    {
      title: "Artistly",
      image: "/projects/Artistly.png",
      github: "https://github.com/Bhaveshanjana/Artistly",
      link: "https://artistly-rho-three.vercel.app/",
      description: "An landing page ",
    },
    {
      title: "Blogify",
      image: "/projects/Blogify.png",
      github: "https://github.com/Bhaveshanjana/Blogify",
      link: "https://blogify-one-alpha.vercel.app/",
      description: "An blog where user can post and see blogs ",
    },
    {
      title: "Eclypse",
      image: "/projects/Eclypse.png",
      github: "https://github.com/Bhaveshanjana/Web-Assignment03",
      link: "https://eclypse-sigma.vercel.app/",
      description: "An mini Saas project",
    },
  ];

  const displayedProjects = showAll ? data : data.slice(0, 4);
  return (
    <div className="mx-5">
      <h1 className="dark:text-gray-300 mt-9 mb-1.5 text-sm md:text-[16px] mx-0.5 bg-gradient-to-r from-[#d3d7da53] dark:bg-gradient-to-r dark:from-[#0C1C21] border-l-2 border-gray-600 dark:border-gray-400">
        <span className="ml-2">Projects</span>
      </h1>
      <div className="md:grid lg:grid-cols-2 md:space-x-2.5 flex flex-col gap-1">
        {displayedProjects.map((projectItem) => (
          <ProjectCard key={projectItem.title} project={projectItem} />
        ))}
      </div>
      <div className="text-center">
        {data.length > 4 && (
          <ShinyButton onClick={() => setShowAll(!showAll)} className="">
            {showAll ? "Show less" : "Show all"}
          </ShinyButton>
        )}
      </div>
    </div>
  );
};

export default Project;
