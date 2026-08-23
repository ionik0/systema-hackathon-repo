import { CodeResult, CodeVerdict, DesignResult, Problem } from "@/lib/types";

/**
 * THIS IS A FAKE, DEMO-ONLY EVALUATOR.
 *
 * The real Systema (https://systema-sd.in) grades code against hidden test
 * cases and design diagrams against real, closed-source grading criteria.
 * None of that logic lives here, or anywhere in this public repo.
 *
 * This function exists only so the hackathon demo has something to return
 * from the submit endpoints. It produces a result in the exact shape the
 * real API uses, but the "grading" itself is a random roll, not a real
 * evaluation of the submitted code or diagram. Like the real product, it
 * only ever reports an aggregate score, never which criteria passed or
 * failed.
 */

function pick<T>(items: T[], weights: number[]): T {
  const total = weights.reduce((a, b) => a + b, 0);
  let roll = Math.random() * total;
  for (let i = 0; i < items.length; i++) {
    roll -= weights[i];
    if (roll <= 0) return items[i];
  }
  return items[items.length - 1];
}

export function mockJudgeCode(_problem: Problem, _sourceCode: string): CodeResult {
  const totalTestCases = 8 + Math.floor(Math.random() * 8); // 8-15

  const verdict = pick<CodeVerdict>(
    ["ACCEPTED", "WRONG_ANSWER", "TIME_LIMIT_EXCEEDED", "RUNTIME_ERROR", "COMPILE_ERROR"],
    [55, 25, 8, 8, 4]
  );

  if (verdict === "COMPILE_ERROR") {
    return {
      verdict,
      passedTestCases: 0,
      totalTestCases,
      score: 0,
      maxScore: 100,
    };
  }

  const passedTestCases =
    verdict === "ACCEPTED"
      ? totalTestCases
      : Math.floor(Math.random() * totalTestCases);

  const score = Math.round((passedTestCases / totalTestCases) * 100);

  return {
    verdict,
    passedTestCases,
    totalTestCases,
    score,
    maxScore: 100,
  };
}

export function mockJudgeDesign(
  _problem: Problem,
  _nodes: unknown[],
  _edges: unknown[]
): DesignResult {
  const totalCount = 6 + Math.floor(Math.random() * 4); // 6-9 grading criteria
  const passedCount = Math.min(
    totalCount,
    Math.floor(Math.random() * (totalCount + 1))
  );
  const totalScore = totalCount * 10;
  const passedScore = passedCount * 10;

  return {
    passed: passedCount === totalCount,
    totalScore: passedScore,
    maxScore: totalScore,
    passedCount,
    totalCount,
  };
}
