import React from "react";
import { sans } from "@/utils/fonts";

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
};

export const SectionHeader = ({ title, subtitle }: SectionHeaderProps) => {
  return (
    <div className="mb-4 border-l-2 border-zinc-600 dark:border-zinc-700 pl-3 bg-gradient-to-r from-zinc-200/50 dark:from-zinc-800/20 to-transparent py-1">
      <h2 className={`text-sm md:text-[15px] text-zinc-800 dark:text-zinc-300 ${sans}`}>
        {title}
      </h2>
      {subtitle && <p className="text-xs text-zinc-500 mt-0.5">{subtitle}</p>}
    </div>
  );
};
