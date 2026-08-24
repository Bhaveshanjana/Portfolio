import { NextResponse } from "next/server";
import { availability } from "@/data/availability";
import { getWorkStatus } from "@/lib/workStatus";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    if (availability.forceOffline) {
      return NextResponse.json(
        { status: "offline", label: "touching grass" },
        { headers: { "Cache-Control": "no-store" } }
      );
    }

    const data = await getWorkStatus();

    return NextResponse.json(
      {
        status: data.status,
        label: data.label,
      },
      {
        headers: {
          // Short private cache — avoid CDN serving yesterday's weekday label
          "Cache-Control": "private, max-age=30, stale-while-revalidate=30",
        },
      }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { status: "offline", label: "touching grass", error: message },
      {
        status: 502,
        headers: { "Cache-Control": "no-store" },
      }
    );
  }
}
