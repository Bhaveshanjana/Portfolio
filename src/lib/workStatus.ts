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
  // Never default to Sunday — unknown weekday fails closed as weekday online label
  return map[day] ?? 1;
}

function getISTMinutes(date: Date): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: IST,
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(date);

  let hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  if (hour === 24) hour = 0;
  return hour * 60 + minute;
}

/**
 * Authenticated events include private-repo PushEvents.
 * Public-only endpoint misses private pushes and can lag for “online” detection.
 */
async function fetchTodayPushTimes(todayIST: string): Promise<Date[]> {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME;

  if (!token || !username) {
    throw new Error("Missing GitHub credentials");
  }

  const res = await fetch(
    `https://api.github.com/users/${username}/events?per_page=50`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(`GitHub events API returned ${res.status}`);
  }

  const events: { type: string; created_at: string }[] = await res.json();

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

async function resolveWorkStatusForDay(dayKey: string): Promise<{
  status: WorkStatus;
  label: string;
  dayKey: string;
  pushCount: number;
}> {
  const now = new Date();
  // Guard: if clock crossed midnight between key creation and run, recompute for real today
  const todayIST = getISTDateString(now);
  const effectiveDay = todayIST === dayKey ? dayKey : todayIST;

  const pushTimes = await fetchTodayPushTimes(effectiveDay);
  const status = computeWorkStatus(now, pushTimes);
  const weekday = getISTWeekday(now);

  return {
    status,
    label: status === "online" ? getOnlineLabel(weekday) : "touching grass",
    dayKey: effectiveDay,
    pushCount: pushTimes.length,
  };
}

/**
 * Day is part of the cache key so Sunday's "Breaking Sunday" cannot leak into Monday.
 * Revalidate often so a fresh push flips online within ~1 minute.
 */
const getCachedWorkStatusForDay = unstable_cache(
  resolveWorkStatusForDay,
  ["work-status-v2"],
  { revalidate: 60, tags: ["work-status"] }
);

export async function getWorkStatus() {
  const dayKey = getISTDateString(new Date());
  return getCachedWorkStatusForDay(dayKey);
}
