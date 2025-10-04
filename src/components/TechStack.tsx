import { bricolage_grotesque, sans } from "@/utils/fonts";
import Image from "next/image";
import React from "react";

type data = {
  name: string;
  image: string;
};

const TechStack = () => {
  const techStack: data[] = [
    { name: "Next.js", image: "/techstack/nextjs.png" },
    { name: "React.js", image: "/techstack/react.png" },
    { name: "TypeScript", image: "/techstack/typescript.webp" },
    { name: "JavaScript", image: "/techstack/javascript.png" },
    { name: "MongoDB", image: "/techstack/mongo.png" },
    { name: "Express.js", image: "/techstack/express.png" },
    { name: "TailwindCSS", image: "/techstack/tailwind.png" },
    { name: "Node.js", image: "/techstack/node.png" },
    { name: "PostgreSQL", image: "/techstack/postgresql.png" },
    { name: "Motion", image: "/techstack/motion.png" },
  ];
  return (
    <>
      <h1 className="dark:text-gray-300 text-black mb-2.5 text-[14px] md:text-[15px] mx-5 bg-gradient-to-r from-[#d3d7da53] dark:bg-gradient-to-r dark:from-[#0C1C21] border-l-2 border-gray-600 dark:border-gray-400 ">
        <span className={`ml-2 ${sans}`}>Tech Stack</span>
      </h1>
      <div className="flex flex-wrap gap-2 mx-5">
        {techStack.map((content) => (
          <button
            key={content.name}
            className="flex relative group items-center gap-2 rounded-lg bg-transparent px-2.5 md:px-3 py-1 text-neutral-800 dark:text-neutral-300 cursor-pointer "
          >
            <div
              className="absolute inset-0 rounded-xl border-t-2 border-b-1 
               border-t-neutral-200 border-b-neutral-300 
               dark:border-t-neutral-700/80 dark:border-b-neutral-900 
               group-hover:border-b-0 dark:group-hover:border-b-0
               group-hover:shadow-[inset_0_2px_6px_rgba(0,0,0,0.1)] 
               dark:group-hover:shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)]"
            ></div>
            <Image
              src={content.image}
              alt={content.name}
              height={500}
              width={500}
              className="size-4 relative group-hover:translate-y-px"
            />
            <span
              className={`relative ${bricolage_grotesque} mt-0.5 text-[10px] md:text-[11px]  group-hover:translate-y-px`}
            >
              {content.name}
            </span>
          </button>
        ))}
      </div>
    </>
  );
};

export default TechStack;
