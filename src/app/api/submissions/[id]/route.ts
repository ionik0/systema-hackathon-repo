import { NextRequest, NextResponse } from "next/server";
import { getSubmission } from "@/lib/submissionStore";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const submission = getSubmission(params.id);
  if (!submission) {
    return NextResponse.json({ error: "Submission not found" }, { status: 404 });
  }
  return NextResponse.json({ submission });
}
