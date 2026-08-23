"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { GitHubContributions } from "@/lib/github";

type GitHubGraphProps = {
  initialData?: GitHubContributions | null;
  headerLeft?: React.ReactNode;
};

type HoveredDay = {
  date: string;
  count: number;
  isFuture: boolean;
};

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const formatDayLabel = (count: number, isFuture: boolean) => {
  if (isFuture) return "Future";
  if (count === 0) return "No contributions";
  if (count === 1) return "1 contribution";
  return `${count} contributions`;
};

/** Card-style blur → clear on enter / exit */
const CommitHoverBadge = ({ label }: { label: string }) => {
  return (
    <motion.div
      className="rounded-md border border-zinc-800 bg-zinc-900/95 px-2.5 py-0.5 shadow-xl backdrop-blur-sm"
      initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
      animate={{
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
      }}
      exit={{
        opacity: 0,
        scale: 0.98,
        filter: "blur(10px)",
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <p className="whitespace-nowrap font-mono text-[10px] sm:text-[11px] text-zinc-100">
        {label}
      </p>
    </motion.div>
  );
};

export const GitHubGraph = ({
  initialData = null,
  headerLeft,
}: GitHubGraphProps) => {
  const [data, setData] = useState<GitHubContributions | null>(initialData);
  const [loading, setLoading] = useState(!initialData);
  const [hovered, setHovered] = useState<HoveredDay | null>(null);

  useEffect(() => {
    if (initialData) {
      setData(initialData);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchData = async () => {
      try {
        const res = await fetch("/api/github/contributions");
        if (!res.ok) {
          console.error("Failed to fetch GitHub contributions", res.status);
          return;
        }
        const json = await res.json();
        if (!cancelled) setData(json);
      } catch (error) {
        console.error("Failed to fetch GitHub contributions", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();
    return () => {
      cancelled = true;
    };
  }, [initialData]);

  const getLevelClass = (count: number) => {
    if (count === 0) return "bg-[#161b22] ring-1 ring-inset ring-zinc-800/60";
    if (count <= 2) return "bg-[#1b4332]";
    if (count <= 5) return "bg-[#2d6a4f]";
    if (count <= 9) return "bg-[#52b788]";
    return "bg-[#95d5b2]";
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const currentMonth = today.getMonth();

  const hoverLabel = hovered
    ? formatDayLabel(hovered.count, hovered.isFuture)
    : "";

  return (
    <div className="py-2 w-full min-w-0">
      <div className="flex flex-col gap-2 min-w-0">
        {/* Status left · tooltip centered — mobile-safe */}
        <div className="relative flex items-center min-h-[32px] w-full px-1 sm:px-2">
          <div
            className={`relative z-10 max-w-[48%] sm:max-w-[40%] shrink-0 transition-opacity duration-300 overflow-visible pl-0.5 ${
              hovered ? "opacity-25 sm:opacity-40" : "opacity-100"
            }`}
          >
            {headerLeft}
          </div>

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-1">
            <AnimatePresence mode="wait">
              {hovered && (
                <CommitHoverBadge key={hovered.date} label={hoverLabel} />
              )}
            </AnimatePresence>
          </div>
        </div>

        {loading ? (
          <div className="h-[120px] w-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-zinc-500 animate-[spin_1s_steps(12)_infinite]"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {[...Array(12)].map((_, i) => (
                <rect
                  key={i}
                  x="11"
                  y="2"
                  width="2"
                  height="5"
                  rx="1"
                  fill="currentColor"
                  opacity={0.2 + (i / 12) * 0.8}
                  transform={`rotate(${i * 30} 12 12)`}
                />
              ))}
            </svg>
          </div>
        ) : data ? (
          <>
            <div className="relative w-full min-w-0 max-w-full">
              <div className="absolute inset-y-0 left-0 w-3 sm:w-4 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-3 sm:w-4 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

              <div className="overflow-x-auto overscroll-x-contain scrollbar-hide -mx-1 px-1">
                <div className="flex flex-col min-w-max px-2">
                  <div className="flex gap-[3px] mb-5 text-[10px] sm:text-[11px] ml-5 text-zinc-500 font-mono">
                    {data.weeks.map((week, i) => {
                      let showMonth = false;
                      const date = new Date(week.contributionDays[0].date);
                      const month = date.getMonth();

                      if (i === 0) {
                        showMonth = true;
                      } else {
                        const prevDate = new Date(
                          data.weeks[i - 1].contributionDays[0].date
                        );
                        if (prevDate.getMonth() !== month) {
                          showMonth = true;
                        }
                      }

                      const isFutureMonth = month > currentMonth;

                      return (
                        <div
                          key={`month-${i}`}
                          className={`w-[10px] relative ${
                            isFutureMonth ? "opacity-30 blur-[1px]" : ""
                          }`}
                        >
                          {showMonth && (
                            <span className="absolute left-0 -translate-x-1/4">
                              {monthNames[month]}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div
                    className="flex gap-[3px]"
                    onMouseLeave={() => setHovered(null)}
                  >
                    {data.weeks.map((week, i) => (
                      <motion.div
                        key={i}
                        className="flex flex-col gap-[3px]"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.015, duration: 0.2 }}
                      >
                        {week.contributionDays.map((day) => {
                          const cellDate = new Date(day.date);
                          const isFuture = cellDate > today;

                          return (
                            <div
                              key={day.date}
                              className={`w-[10px] h-[10px] rounded-[2px] transition-transform duration-150 hover:scale-125 hover:z-20 ${getLevelClass(
                                day.contributionCount
                              )} ${isFuture ? "opacity-30 blur-[1px]" : ""}`}
                              onMouseEnter={() => {
                                setHovered({
                                  date: day.date,
                                  count: day.contributionCount,
                                  isFuture,
                                });
                              }}
                              onTouchStart={() => {
                                setHovered({
                                  date: day.date,
                                  count: day.contributionCount,
                                  isFuture,
                                });
                              }}
                            />
                          );
                        })}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="px-2 -translate-y-2">
              <span className="font-mono text-[11px] text-slate-400/80">
                Total {data.totalContributions} contributions
              </span>
            </div>
          </>
        ) : (
          <div className="h-[120px] flex items-center justify-start text-sm text-red-500/80 font-mono">
            Failed to load contributions.
          </div>
        )}
      </div>
    </div>
  );
};
