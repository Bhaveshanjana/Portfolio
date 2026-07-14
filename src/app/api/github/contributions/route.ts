import { NextResponse } from "next/server";
import { getGitHubContributions } from "@/lib/github";

export const revalidate = 3600;

export async function GET() {
  try {
    const data = await getGitHubContributions();

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const status = message.includes("Missing GitHub credentials") ? 500 : 502;

    return NextResponse.json({ error: message }, { status });
  }
}
