import Link from "next/link";
import { notFound } from "next/navigation";
import { getSubmission } from "@/lib/submissionStore";
import { ResultPanel } from "@/components/results/ResultPanel";

export const dynamic = "force-dynamic";

export default function SubmissionPage({ params }: { params: { id: string } }) {
  const submission = getSubmission(params.id);
  if (!submission) notFound();

  return (
    <div className="container page">
      <div className="card">
        <p className="text-muted" style={{ marginTop: 0 }}>
          Submission for{" "}
          <Link
            href={`/problems/${submission.problemSlug}`}
            style={{ textDecoration: "underline" }}
          >
            {submission.problemTitle}
          </Link>
        </p>
        <ResultPanel data={submission.data} />
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <Link href={`/problems/${submission.problemSlug}`} className="btn btn-primary">
            Try again
          </Link>
          <Link href="/problems" className="btn">
            Back to problems
          </Link>
        </div>
      </div>
    </div>
  );
}
