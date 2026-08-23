import { SubmissionResult } from "@/lib/types";

const verdictColor: Record<string, string> = {
  ACCEPTED: "var(--green)",
  WRONG_ANSWER: "var(--red)",
  TIME_LIMIT_EXCEEDED: "var(--yellow)",
  RUNTIME_ERROR: "var(--red)",
  COMPILE_ERROR: "var(--red)",
  INTERNAL_ERROR: "var(--red)",
};

function verdictLabel(v: string) {
  return v
    .split("_")
    .map((w) => w[0] + w.slice(1).toLowerCase())
    .join(" ");
}

export function ResultPanel({ data }: { data: SubmissionResult }) {
  if (data.kind === "CODE") {
    const { verdict, passedTestCases, totalTestCases, score, maxScore } = data.result;
    return (
      <div className="result-hero">
        <div
          className="result-score"
          style={{ color: verdictColor[verdict] ?? "var(--text)" }}
        >
          {verdictLabel(verdict)}
        </div>
        <p className="text-muted">
          {passedTestCases} / {totalTestCases} test cases passed
        </p>
        <p style={{ fontSize: 20, fontWeight: 600 }}>
          Score: {score} / {maxScore}
        </p>
      </div>
    );
  }

  const { passed, totalScore, maxScore, passedCount, totalCount } = data.result;
  return (
    <div className="result-hero">
      <div
        className="result-score"
        style={{ color: passed ? "var(--green)" : "var(--red)" }}
      >
        {passed ? "Passed" : "Not Passed"}
      </div>
      <p className="text-muted">
        {passedCount} / {totalCount} grading criteria met
      </p>
      <p style={{ fontSize: 20, fontWeight: 600 }}>
        Score: {totalScore} / {maxScore}
      </p>
      <p className="text-muted" style={{ fontSize: 12, marginTop: 24 }}>
        Like the real product, individual criteria are never shown, only the
        aggregate result.
      </p>
    </div>
  );
}
