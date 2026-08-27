"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type WorkStatus = "online" | "offline";

type StatusResponse = {
  status: WorkStatus;
  label: string;
};

const POLL_MS = 5 * 60 * 1000;
const ROLL_EVERY_MS = 3000;
const ROLL_DURATION = 0.5;

/** Alternate lines for the dice roll (keyed by API label) */
const ROLL_PHRASES: Record<string, string[]> = {
  "Shipping on Sat": ["Shipping on Sat", "Side Quest Active"],
};

function phrasesFor(label: string): string[] {
  return ROLL_PHRASES[label] ?? [label];
}

export const StatusBadge = () => {
  const [status, setStatus] = useState<WorkStatus>("offline");
  const [label, setLabel] = useState("touching grass");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch("/api/work-status", { cache: "no-store" });
        const data: StatusResponse & { error?: string } = await res.json();
        if (!cancelled && data.status && data.label) {
          setStatus(data.status);
          setLabel(data.label);
        }
      } catch {
        /* keep last known state */
      }
    };

    load();
    const id = setInterval(load, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    setTick(0);
  }, [label]);

  useEffect(() => {
    const id = setInterval(() => {
      setTick((t) => t + 1);
    }, ROLL_EVERY_MS);
    return () => clearInterval(id);
  }, []);

  const isOnline = status === "online";
  const phrases = phrasesFor(label);
  const displayLabel = phrases[tick % phrases.length];
  const sizerLabel = phrases.reduce((a, b) => (a.length >= b.length ? a : b));

  return (
    <div
      className="inline-flex w-fit items-center gap-1.5"
      title={
        isOnline
          ? "Pushed to GitHub today during work hours"
          : "Not active on GitHub right now"
      }
    >
      <span
        className={`inline-flex h-1.5 w-1.5 shrink-0 rounded-full ${
          isOnline ? "bg-green-700" : "bg-zinc-600"
        }`}
        aria-hidden
      />
      <span className="relative inline-flex h-[1.15em] items-center overflow-hidden">
        {/* Holds width so absolute rolls don't collapse the layout */}
        <span
          className="invisible font-mono text-[9px] sm:text-[10px] whitespace-nowrap leading-none"
          aria-hidden
        >
          {sizerLabel}
        </span>
        <AnimatePresence initial={false}>
          <motion.span
            key={displayLabel}
            className="absolute inset-0 flex items-center font-mono text-[9px] sm:text-[10px] text-zinc-500 whitespace-nowrap leading-none"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{
              duration: ROLL_DURATION,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {displayLabel}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
};
