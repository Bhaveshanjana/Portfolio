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
  ];
  return (
    <>
      <h1 className="dark:text-gray-300 mb-2 md:text-lg mx-4">Tech Stack</h1>
      <div className="flex flex-wrap gap-2 mx-4">
        {techStack.map((content) => (
          <div
            key={content.name}
            className="flex items-center gap-2 rounded-lg bg-transparent border border-gray-300 px-3 py-0.5 text-sm  text-black dark:text-gray-200 dark:bg-gray-900 dark:border-gray-700 cursor-pointer"
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
