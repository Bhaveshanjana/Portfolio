import React from "react";
import ProjectCard from "./ProjectCard";

  type project = {
    title: string;
    image: string;
    github?: string;
    link?: string;
    tech: string[];
  };
const Project = () => {
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
  ];
  return (
    <div>
      <h1 className="dark:text-gray-300 mt-9 md:text-xl">Projects</h1>
      <div className="md:grid lg:grid-cols-2 space-x-2.5">
        {data.map((projectItem) => (
          <ProjectCard key={projectItem.title} project={projectItem} />
        ))}
      </div>
    </div>
  );
};

export default Project;
