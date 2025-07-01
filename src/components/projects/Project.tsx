"use client";

import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import { ShinyButton } from "../ui/button";

type project = {
  title: string;
  image: string;
  github?: string;
  link?: string;
  tech: string[];
};
const Project = () => {
  const [showAll, setShowAll] = useState(false);

  const data: project[] = [
    {
      github: "https://github.com/Bhaveshanjana/TravoBot",
      link: "https://travo-bot.vercel.app/",
      title: "TravoBot",
      image: "/projects/TravoBot.png",
      tech: [
        "Reactjs",
        "TailwindCSS",
        "Express.js",
        "Nodejs",
        "GoogleApi",
        "Gemini",
      ],
    },
    {
      title: "DaignoBot",
      image: "/projects/DaignoBot.png",
      github: "https://github.com/Bhaveshanjana/DiagnoBot",
      link: "https://diagno-bot.vercel.app/",
      tech: ["React", "TailwindCSS", "ExpressJs", "NodeJs", "RapidApi"],
    },
    {
      github: "https://github.com/Bhaveshanjana/BUZZBOT",
      title: "BuzzBot",
      image: "/projects/BuzzBot.png",
      tech: ["Express.js", "Node.js", "Gemini"],
    },
    {
      title: "WipeBg",
      image: "/projects/wipebg.png",
      github: "https://github.com/Bhaveshanjana/WIPEBG",
      link: "https://wipebg.vercel.app/",
      tech: ["React", "ExpressJs", "NodeJs", "TailwindCSS", "RapidApi"],
    },
    {
      title: "Artistly",
      image: "/projects/Artistly.png",
      github: "https://github.com/Bhaveshanjana/Artistly",
      link: "https://artistly-rho-three.vercel.app/",
      tech: ["NextJs", "TailwindCSS", "Shadcn", "Motion"],
    },
    {
      title: "Blogify",
      image: "/projects/Blogify.png",
      github: "https://github.com/Bhaveshanjana/Blogify",
      link: "https://blogify-one-alpha.vercel.app/",
      tech: [
        "NextJs",
        "TailwindCSS",
        "Shadcn",
        "Motion",
        "Prisma",
        "PostgreSQL",
      ],
    },
    {
      title: "Eclypse",
      image: "/projects/Eclypse.png",
      github: "https://github.com/Bhaveshanjana/Web-Assignment03",
      link: "https://eclypse-sigma.vercel.app/",
      tech: ["ReactJs", "TailwindCSS", "NodeJS", "ExpressJs"],
    },
  ];

  const displayedProjects = showAll ? data : data.slice(0, 4);
  return (
    <div>
      <h1 className="dark:text-gray-300 mt-9 md:text-xl mx-4">Projects</h1>
      <div className="md:grid lg:grid-cols-2 md:space-x-2.5 mx-4 flex flex-col gap-1">
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
