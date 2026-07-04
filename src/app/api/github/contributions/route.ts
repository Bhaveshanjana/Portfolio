import { NextResponse } from 'next/server';

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME;

  if (!token || !username) {
    return NextResponse.json({ error: "Missing GitHub credentials" }, { status: 500 });
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

  try {
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
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!res.ok) {
      throw new Error(`GitHub API returned ${res.status}`);
    }

    const data = await res.json();
    const user = data.data.user;
    
    // Sum the years to get a rough lifetime total
    const lifetimeContributions = 
      (user.y2026?.contributionCalendar.totalContributions || 0) +
      (user.y2025?.contributionCalendar.totalContributions || 0) +
      (user.y2024?.contributionCalendar.totalContributions || 0) +
      (user.y2023?.contributionCalendar.totalContributions || 0);

    return NextResponse.json({
      totalContributions: lifetimeContributions,
      weeks: user.current.contributionCalendar.weeks
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
