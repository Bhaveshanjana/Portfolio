import React from "react";

type SurfaceCardProps = {
  children: React.ReactNode;
  className?: string;
};

export const SurfaceCard = ({ children, className = "" }: SurfaceCardProps) => {
  return (
    <div className={`rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-950/60 backdrop-blur-sm ${className}`}>
      {children}
    </div>
  );
};
