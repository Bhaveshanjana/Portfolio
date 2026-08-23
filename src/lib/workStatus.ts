import { unstable_cache } from "next/cache";
import { availability, festivalDates } from "@/data/availability";

export type WorkStatus = "online" | "offline";

const IST = availability.timezone;

function getISTDateString(date: Date): string {
  return date.toLocaleDateString("en-CA", { timeZone: IST });
}

function getISTWeekday(date: Date): number {
  const day = date.toLocaleDateString("en-US", {
    timeZone: IST,
    weekday: "short",
  });
  const map: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  return map[day] ?? 0;
}

function getISTMinutes(date: Date): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: IST,
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(date);

  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  return hour * 60 + minute;
}

async function fetchTodayPushTimes(): Promise<Date[]> {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME;

  if (!token || !username) {
    throw new Error("Missing GitHub credentials");
  }

  const res = await fetch(
    `https://api.github.com/users/${username}/events/public?per_page=30`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(`GitHub events API returned ${res.status}`);
  }

  const events: { type: string; created_at: string }[] = await res.json();
  const todayIST = getISTDateString(new Date());

  return events
    .filter((e) => e.type === "PushEvent")
    .map((e) => new Date(e.created_at))
    .filter((d) => getISTDateString(d) === todayIST);
}

export function computeWorkStatus(
  now: Date,
  pushTimesToday: Date[]
): WorkStatus {
  if (availability.forceOffline) return "offline";

  const dateStr = getISTDateString(now);

  if (festivalDates.includes(dateStr)) return "offline";

  const weekday = getISTWeekday(now);
  if (!availability.workDays.includes(weekday)) return "offline";

  const mins = getISTMinutes(now);
  const start = availability.workStartHour * 60;
  const graceEnd = availability.graceEndHour * 60;

  if (mins < start || mins >= graceEnd) return "offline";

  const hasPushToday = pushTimesToday.length > 0;

  // 10 AM–9 PM any day: offline until first push; 8–9 PM grace if pushed today
  return hasPushToday ? "online" : "offline";
}

function getOnlineLabel(weekday: number): string {
  if (weekday === 6) return "Shipping on Sat"; // Saturday
  if (weekday === 0) return "Breaking Sunday";
  return "Online";
}

async function resolveWorkStatus(): Promise<{
  status: WorkStatus;
  label: string;
}> {
  const now = new Date();
  const pushTimes = await fetchTodayPushTimes();
  const status = computeWorkStatus(now, pushTimes);
  const weekday = getISTWeekday(now);

  return {
    status,
    label: status === "online" ? getOnlineLabel(weekday) : "touching grass",
  };
}

/** Revalidate every 5 minutes — picks up new pushes during the work day */
export const getWorkStatus = unstable_cache(
  resolveWorkStatus,
  ["work-status"],
  { revalidate: 300, tags: ["work-status"] }
);
