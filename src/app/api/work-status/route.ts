import { NextResponse } from "next/server";
import { availability } from "@/data/availability";
import { getWorkStatus } from "@/lib/workStatus";

export const revalidate = 300;

export async function GET() {
  try {
    // Bypass cache while testing offline UI
    if (availability.forceOffline) {
      return NextResponse.json(
        { status: "offline", label: "touching grass" },
        { headers: { "Cache-Control": "no-store" } }
      );
    }

    const data = await getWorkStatus();

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { status: "offline", label: "touching grass", error: message },
      { status: 502 }
    );
  }
}
