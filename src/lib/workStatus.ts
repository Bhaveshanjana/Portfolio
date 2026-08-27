import { unstable_cache } from "next/cache";
import { availability, festivalDates } from "@/data/availability";
import { fetchTodayContributionCount } from "@/lib/github";

export type WorkStatus = "online" | "offline";

const IST = availability.timezone;

const ACTIVITY_EVENTS = new Set([
  "PushEvent",
  "PullRequestEvent",
  "PullRequestReviewEvent",
  "IssuesEvent",
  "IssueCommentEvent",
  "CreateEvent",
]);

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

function githubHeaders() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("Missing GitHub credentials");
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

/**
 * Events land faster than the contribution graph.
 * GraphQL green-square count is the source the portfolio graph uses.
 */
async function fetchTodayActivity(todayIST: string): Promise<{
  eventCount: number;
  contributionCount: number;
}> {
  const username = process.env.GITHUB_USERNAME;
  if (!username) {
    throw new Error("Missing GitHub credentials");
  }

  const eventsRes = await fetch(
    `https://api.github.com/users/${username}/events?per_page=50`,
    { headers: githubHeaders(), cache: "no-store" }
  );

  if (!eventsRes.ok) {
    throw new Error(`GitHub events API returned ${eventsRes.status}`);
  }

  const events: { type: string; created_at: string }[] = await eventsRes.json();
  const eventCount = events.filter(
    (e) =>
      ACTIVITY_EVENTS.has(e.type) &&
      getISTDateString(new Date(e.created_at)) === todayIST
  ).length;

  let contributionCount = 0;
  try {
    contributionCount = await fetchTodayContributionCount(todayIST);
  } catch {
    /* graph can lag; events still count */
  }

  return { eventCount, contributionCount };
}

export function computeWorkStatus(
  now: Date,
  hasActivityToday: boolean
): WorkStatus {
  if (availability.forceOffline) return "offline";

  const dateStr = getISTDateString(now);
  if (festivalDates.includes(dateStr)) return "offline";

  const weekday = getISTWeekday(now);
  if (!availability.workDays.includes(weekday)) return "offline";

  const mins = getISTMinutes(now);
  const start = availability.workStartHour * 60;
  const noon = availability.morningCutoffHour * 60;
  const graceEnd = availability.graceEndHour * 60;

  if (mins >= graceEnd) return "offline";

  // A push/contribution today flips online immediately (even before 10).
  if (hasActivityToday) return "online";

  // No activity: online only in the 10–12 window.
  if (mins >= start && mins < noon) return "online";

  return "offline";
}

function getOnlineLabel(weekday: number): string {
  if (weekday === 6) return "Shipping on Sat";
  if (weekday === 0) return "Breaking Sunday";
  return "Online";
}

async function resolveWorkStatusForDay(dayKey: string): Promise<{
  status: WorkStatus;
  label: string;
  dayKey: string;
  eventCount: number;
  contributionCount: number;
}> {
  const now = new Date();
  const todayIST = getISTDateString(now);
  const effectiveDay = todayIST === dayKey ? dayKey : todayIST;

  const { eventCount, contributionCount } =
    await fetchTodayActivity(effectiveDay);
  const hasActivityToday = eventCount > 0 || contributionCount > 0;
  const status = computeWorkStatus(now, hasActivityToday);
  const weekday = getISTWeekday(now);

  return {
    status,
    label: status === "online" ? getOnlineLabel(weekday) : "touching grass",
    dayKey: effectiveDay,
    eventCount,
    contributionCount,
  };
}

const getCachedWorkStatusForDay = unstable_cache(
  resolveWorkStatusForDay,
  ["work-status-v5"],
  { revalidate: 60, tags: ["work-status"] }
);

export async function getWorkStatus() {
  const dayKey = getISTDateString(new Date());
  return getCachedWorkStatusForDay(dayKey);
}
