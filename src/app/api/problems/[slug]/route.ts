import { NextRequest, NextResponse } from "next/server";
import { getProblemBySlug } from "@/lib/data/problems";

export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const problem = getProblemBySlug(params.slug);
  if (!problem) {
    return NextResponse.json({ error: "Problem not found" }, { status: 404 });
  }
  return NextResponse.json({ problem });
}
