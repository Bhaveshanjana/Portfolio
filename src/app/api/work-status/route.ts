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
          // Always fresh — after-hours depends on the latest GitHub push
          "Cache-Control": "no-store",
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
