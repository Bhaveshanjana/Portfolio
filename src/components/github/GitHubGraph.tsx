"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { GitHubContributions } from "@/lib/github";

type GitHubGraphProps = {
  initialData?: GitHubContributions | null;
};

type HoveredDay = {
  date: string;
  count: number;
  x: number;
  y: number;
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

const formatDayLabel = (dateStr: string, count: number, isFuture: boolean) => {
  const date = new Date(dateStr);
  const label = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (isFuture) return `Future · ${label}`;
  if (count === 0) return `No contributions · ${label}`;
  if (count === 1) return `1 contribution · ${label}`;
  return `${count} contributions · ${label}`;
};

export const GitHubGraph = ({ initialData = null }: GitHubGraphProps) => {
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

  // Gray-green levels so empty vs active days are easy to tell apart
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

  return (
    <div className="py-2 overflow-hidden">
      <div className="flex flex-col gap-2">
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
            <div className="relative w-full max-w-full">
              <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

              {hovered && (
                <div
                  className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-full rounded-md border border-zinc-600 bg-zinc-900 px-2.5 py-1.5 shadow-lg"
                  style={{
                    left: hovered.x,
                    top: hovered.y - 8,
                  }}
                >
                  <p className="whitespace-nowrap font-mono text-[11px] text-zinc-100">
                    {formatDayLabel(
                      hovered.date,
                      hovered.count,
                      hovered.isFuture
                    )}
                  </p>
                </div>
              )}

              <div className="overflow-x-auto scrollbar-hide">
                <div className="flex flex-col min-w-max px-2">
                  <div className="flex gap-[3px] mb-5 text-[11px] ml-5 text-zinc-500 font-mono">
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

                  <div className="flex gap-[3px]" onMouseLeave={() => setHovered(null)}>
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
                              onMouseEnter={(e) => {
                                const rect =
                                  e.currentTarget.getBoundingClientRect();
                                const parent =
                                  e.currentTarget.closest(".relative");
                                const parentRect =
                                  parent?.getBoundingClientRect();

                                if (!parentRect) return;

                                setHovered({
                                  date: day.date,
                                  count: day.contributionCount,
                                  x: rect.left - parentRect.left + rect.width / 2,
                                  y: rect.top - parentRect.top,
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
