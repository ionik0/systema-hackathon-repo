import { NextRequest, NextResponse } from "next/server";
import { problems } from "@/lib/data/problems";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const difficulty = searchParams.get("difficulty");
  const tag = searchParams.get("tag");
  const type = searchParams.get("type");
  const q = searchParams.get("q")?.toLowerCase();

  let results = problems;

  if (difficulty) results = results.filter((p) => p.difficulty === difficulty);
  if (type) results = results.filter((p) => p.type === type);
  if (tag) results = results.filter((p) => p.tags.includes(tag));
  if (q) results = results.filter((p) => p.title.toLowerCase().includes(q));

  return NextResponse.json({ problems: results });
}
