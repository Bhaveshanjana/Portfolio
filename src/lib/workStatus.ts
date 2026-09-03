import { unstable_cache } from "next/cache";
import { availability, festivalDates } from "@/data/availability";
import { fetchTodayContributionCount } from "@/lib/github";

export type WorkStatus = "online" | "offline";

const IST = availability.timezone;
const AFTER_HOURS_LABEL = "After hours";

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

function getYesterdayIST(todayIST: string): string {
  const [y, m, d] = todayIST.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() - 1);
  return dt.toISOString().slice(0, 10);
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
 * End of the rolling after-hours window.
 * First commit ≥ 9 PM → +1.5 h; each further commit that night → +2 h from latest.
 */
export function getAfterHoursWindowEnd(
  activityTimestamps: Date[]
): Date | null {
  const graceEndMin = availability.graceEndHour * 60;

  const afterHours = activityTimestamps
    .filter((d) => getISTMinutes(d) >= graceEndMin)
    .sort((a, b) => b.getTime() - a.getTime());

  if (afterHours.length === 0) return null;

  const latest = afterHours[0];
  const latestDay = getISTDateString(latest);
  const sameNightCount = afterHours.filter(
    (d) => getISTDateString(d) === latestDay
  ).length;

  const extensionMinutes =
    sameNightCount === 1
      ? availability.afterHoursFirstExtensionMinutes
      : availability.afterHoursRepeatExtensionMinutes;

  return new Date(latest.getTime() + extensionMinutes * 60 * 1000);
}

async function fetchTodayActivity(todayIST: string): Promise<{
  eventCount: number;
  contributionCount: number;
  activityTimestamps: Date[];
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
  const graceEndMin = availability.graceEndHour * 60;
  const yesterdayIST = getYesterdayIST(todayIST);

  const activityTimestamps = events
    .filter((e) => ACTIVITY_EVENTS.has(e.type))
    .map((e) => new Date(e.created_at))
    .filter((d) => {
      const day = getISTDateString(d);
      if (day === todayIST) return true;
      // Cross-midnight: yesterday's ≥ 9 PM commits can still extend into today
      return day === yesterdayIST && getISTMinutes(d) >= graceEndMin;
    });

  const eventCount = activityTimestamps.filter(
    (d) => getISTDateString(d) === todayIST
  ).length;

  let contributionCount = 0;
  try {
    contributionCount = await fetchTodayContributionCount(todayIST);
  } catch {
    /* graph can lag; events still count */
  }

  return { eventCount, contributionCount, activityTimestamps };
}

export function computeWorkStatus(
  now: Date,
  hasActivityToday: boolean,
  activityTimestamps: Date[]
): { status: WorkStatus; label: string } {
  if (availability.forceOffline) {
    return { status: "offline", label: "touching grass" };
  }

  const dateStr = getISTDateString(now);
  if (festivalDates.includes(dateStr)) {
    return { status: "offline", label: "touching grass" };
  }

  const weekday = getISTWeekday(now);
  if (!availability.workDays.includes(weekday)) {
    return { status: "offline", label: "touching grass" };
  }

  const afterHoursEnd = getAfterHoursWindowEnd(activityTimestamps);
  if (afterHoursEnd && now.getTime() < afterHoursEnd.getTime()) {
    return { status: "online", label: AFTER_HOURS_LABEL };
  }

  const mins = getISTMinutes(now);
  const start = availability.workStartHour * 60;
  const noon = availability.morningCutoffHour * 60;
  const graceEnd = availability.graceEndHour * 60;

  if (mins >= graceEnd) {
    return { status: "offline", label: "touching grass" };
  }

  if (hasActivityToday) {
    return { status: "online", label: getOnlineLabel(weekday) };
  }

  if (mins >= start && mins < noon) {
    return { status: "online", label: getOnlineLabel(weekday) };
  }

  return { status: "offline", label: "touching grass" };
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

  const { eventCount, contributionCount, activityTimestamps } =
    await fetchTodayActivity(effectiveDay);
  const hasActivityToday = eventCount > 0 || contributionCount > 0;
  const { status, label } = computeWorkStatus(
    now,
    hasActivityToday,
    activityTimestamps
  );

  return {
    status,
    label,
    dayKey: effectiveDay,
    eventCount,
    contributionCount,
  };
}

const getCachedWorkStatusForDay = unstable_cache(
  resolveWorkStatusForDay,
  ["work-status-v6"],
  { revalidate: 60, tags: ["work-status"] }
);

export async function getWorkStatus() {
  const dayKey = getISTDateString(new Date());
  return getCachedWorkStatusForDay(dayKey);
}
