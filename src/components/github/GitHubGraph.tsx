"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

type ContributionDay = {
  date: string;
  contributionCount: number;
  color: string;
};

type Week = {
  contributionDays: ContributionDay[];
};

type Calendar = {
  totalContributions: number;
  weeks: Week[];
};

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const GitHubGraph = () => {
  const [data, setData] = useState<Calendar | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/github/contributions");
        if (res.ok) {
          const json = await res.json();
          setData(json);
        } else {
          console.error("Failed to fetch GitHub contributions", res.status);
        }
      } catch (error) {
        console.error("Failed to fetch GitHub contributions", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getLevelClass = (count: number) => {
    if (count === 0) return "bg-zinc-200 dark:bg-[#1e1e20]";
    if (count <= 3) return "bg-zinc-300 dark:bg-zinc-700";
    if (count <= 6) return "bg-zinc-400 dark:bg-zinc-500";
    if (count <= 9) return "bg-zinc-500 dark:bg-zinc-300";
    return "bg-zinc-600 dark:bg-zinc-100";
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const currentMonth = today.getMonth();

  return (
    <div className="py-2 overflow-hidden">
      <div className="flex flex-col gap-2">
        {loading ? (
          <div className="h-[120px] w-full flex items-center justify-center">
            <svg className="w-6 h-6 text-zinc-500 animate-[spin_1s_steps(12)_infinite]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
              {/* Fade masks for left/right edges */}
              <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

              <div className="overflow-x-auto scrollbar-hide">
                <div className="flex flex-col min-w-max px-2">
                  {/* Month Labels */}
                  <div className="flex gap-[3px] mb-5 text-[11px] ml-5 text-zinc-500 font-mono">
                    {data.weeks.map((week, i) => {
                      let showMonth = false;
                      const date = new Date(week.contributionDays[0].date);
                      const month = date.getMonth();

                      if (i === 0) {
                        showMonth = true;
                      } else {
                        const prevDate = new Date(data.weeks[i - 1].contributionDays[0].date);
                        if (prevDate.getMonth() !== month) {
                          showMonth = true;
                        }
                      }

                      const isFutureMonth = month > currentMonth;

                      return (
                        <div key={`month-${i}`} className={`w-[10px] relative ${isFutureMonth ? 'opacity-30 blur-[1px]' : ''}`}>
                          {showMonth && (
                            <span className="absolute left-0 -translate-x-1/4">
                              {monthNames[month]}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Graph Cells */}
                  <div className="flex gap-[3px]">
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
                              className={`w-[10px] h-[10px] rounded-[2px] ${getLevelClass(
                                day.contributionCount
                              )} ${isFuture ? 'opacity-30 blur-[1px]' : ''}`}
                              title={isFuture ? `Future date: ${day.date}` : `${day.contributionCount} contributions on ${day.date}`}
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
              <span className="font-mono text-[11px] text-zinc-500 dark:text-slate-400/80">
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
