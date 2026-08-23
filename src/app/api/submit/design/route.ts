import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getProblemBySlug } from "@/lib/data/problems";
import { mockJudgeDesign } from "@/lib/mockJudge";
import { saveSubmission } from "@/lib/submissionStore";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { problemSlug, nodes, edges } = body as {
    problemSlug: string;
    nodes: unknown[];
    edges: unknown[];
  };

  const problem = getProblemBySlug(problemSlug);
  if (!problem || problem.type !== "DESIGN") {
    return NextResponse.json({ error: "Unknown design problem" }, { status: 404 });
  }

  const result = mockJudgeDesign(problem, nodes ?? [], edges ?? []);
  const id = randomUUID();

  saveSubmission({
    id,
    problemSlug: problem.slug,
    problemTitle: problem.title,
    createdAt: new Date().toISOString(),
    data: { kind: "DESIGN", result },
  });

  return NextResponse.json({ id, result });
}
