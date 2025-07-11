import { bricolage_grotesque } from "@/utils/fonts";
import Image from "next/image";
import React from "react";

type data = {
  name: string;
  image: string;
};

const TechStack = () => {
  const techStack: data[] = [
    { name: "NextJs", image: "/nextjs.png" },
    { name: "ReactJs", image: "/react.png" },
    { name: "TypeScript", image: "/typescript.webp" },
    { name: "JavaScript", image: "/javascript.png" },
    { name: "CSS", image: "/css.png" },
    { name: "HTML", image: "/html.png" },
    { name: "TailwindCSS", image: "/tailwind.png" },
    { name: "MongoDB", image: "/mongo.png" },
    { name: "Expressjs", image: "/express.png" },
    { name: "Node", image: "/node.png" },
    { name: "Git", image: "/git.png" },
    { name: "Github", image: "/github.png" },
    { name: "Prisma", image: "/prisma.png" },
    { name: "PostgreSQL", image: "/postgresql.png" },
    { name: "Motion", image: "/motion.png" },
    { name: "Shadcn", image: "/shadcn.png" },
  ];
  return (
    <>
      <h1 className="dark:text-gray-300 mb-2.5 text-sm md:text-[16px] mx-5 bg-gradient-to-r from-[#d3d7da53] dark:bg-gradient-to-r dark:from-[#0C1C21] border-l-2 border-gray-600 dark:border-gray-400 ">
        <span className="ml-2">Tech Stack</span>
      </h1>
      <div className="flex flex-wrap gap-2 mx-5">
        {techStack.map((content) => (
          <div
            key={content.name}
            className="flex items-center gap-2 rounded-lg bg-transparent border border-gray-300 px-2 md:px-4 py-0.5 text-[11px] md:text-sm  text-black dark:text-gray-400 dark:bg-gray-900 dark:border-gray-700 cursor-pointer"
          >
            <Image
              src={content.image}
              alt={content.name}
              height={18}
              width={18}
            />
            <span className={`${bricolage_grotesque}`}>{content.name}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default TechStack;