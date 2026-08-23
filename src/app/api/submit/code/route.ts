import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getProblemBySlug } from "@/lib/data/problems";
import { mockJudgeCode } from "@/lib/mockJudge";
import { saveSubmission } from "@/lib/submissionStore";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { problemSlug, sourceCode } = body as {
    problemSlug: string;
    sourceCode: string;
  };

  const problem = getProblemBySlug(problemSlug);
  if (!problem || problem.type !== "CODE") {
    return NextResponse.json({ error: "Unknown code problem" }, { status: 404 });
  }

  const result = mockJudgeCode(problem, sourceCode ?? "");
  const id = randomUUID();

  saveSubmission({
    id,
    problemSlug: problem.slug,
    problemTitle: problem.title,
    createdAt: new Date().toISOString(),
    data: { kind: "CODE", result },
  });

  return NextResponse.json({ id, result });
}
