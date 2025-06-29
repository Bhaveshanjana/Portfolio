import Image from "next/image";
import React from "react";

type data = {
  name: string;
  image: string;
};

const TechStack = () => {
  const techStack: data[] = [
    { name: "CSS", image: "/css.png" },
    { name: "HTML", image: "/html.png" },
    { name: "JavaScript", image: "/javascript.png" },
    { name: "TypeScript", image: "/typescript.webp" },
    { name: "TailwindCSS", image: "/tailwind.png" },
    { name: "NextJs", image: "/nextjs.png" },
    { name: "ReactJs", image: "/react.png" },
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
      <h1 className="dark:text-gray-300 mt-9 mb-4 md:text-lg">Tech Stack</h1>
      <div className="flex flex-wrap gap-2 ">
        {techStack.map((content) => (
          <div
            key={content.name}
            className="flex items-center gap-2 rounded-lg bg-neutral-800 px-3 py-0.5 text-sm font-medium text-neutral-300 dark:text-gray-400"
          >
            <Image
              src={content.image}
              alt={content.name}
              height={18}
              width={18}
            />
            <span>{content.name}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default TechStack;
