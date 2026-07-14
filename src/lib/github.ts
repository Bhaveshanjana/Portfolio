import { unstable_cache } from "next/cache";

export type ContributionDay = {
  date: string;
  contributionCount: number;
  color: string;
};

export type Week = {
  contributionDays: ContributionDay[];
};

export type GitHubContributions = {
  totalContributions: number;
  weeks: Week[];
};

async function fetchGitHubContributions(): Promise<GitHubContributions> {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME;

  if (!token || !username) {
    throw new Error("Missing GitHub credentials");
  }

  const query = `
    query ($username: String!) {
      user(login: $username) {
        y2026: contributionsCollection(from: "2026-01-01T00:00:00Z", to: "2026-12-31T23:59:59Z") {
          contributionCalendar { totalContributions }
        }
        y2025: contributionsCollection(from: "2025-01-01T00:00:00Z", to: "2025-12-31T23:59:59Z") {
          contributionCalendar { totalContributions }
        }
        y2024: contributionsCollection(from: "2024-01-01T00:00:00Z", to: "2024-12-31T23:59:59Z") {
          contributionCalendar { totalContributions }
        }
        y2023: contributionsCollection(from: "2023-01-01T00:00:00Z", to: "2023-12-31T23:59:59Z") {
          contributionCalendar { totalContributions }
        }
        current: contributionsCollection(from: "2026-01-01T00:00:00Z", to: "2026-12-31T23:59:59Z") {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
                color
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { username },
    }),
    // POST body isn't in Next's Data Cache key — use unstable_cache below instead
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`GitHub API returned ${res.status}`);
  }

  const data = await res.json();

  if (data.errors?.length) {
    throw new Error(data.errors[0]?.message || "GitHub GraphQL error");
  }

  const user = data.data?.user;
  if (!user?.current?.contributionCalendar) {
    throw new Error("Unexpected GitHub response shape");
  }

  const lifetimeContributions =
    (user.y2026?.contributionCalendar.totalContributions || 0) +
    (user.y2025?.contributionCalendar.totalContributions || 0) +
    (user.y2024?.contributionCalendar.totalContributions || 0) +
    (user.y2023?.contributionCalendar.totalContributions || 0);

  return {
    totalContributions: lifetimeContributions,
    weeks: user.current.contributionCalendar.weeks,
  };
}

/** Cached for 1 hour — first request after expiry hits GitHub; the rest are instant. */
export const getGitHubContributions = unstable_cache(
  fetchGitHubContributions,
  ["github-contributions"],
  {
    revalidate: 3600,
    tags: ["github-contributions"],
  }
);
