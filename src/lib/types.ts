export type Difficulty = "EASY" | "MEDIUM" | "HARD";

export type ProblemType = "CODE" | "DESIGN";

export interface SampleIO {
  input: string;
  output: string;
}

export interface Problem {
  slug: string;
  title: string;
  type: ProblemType;
  difficulty: Difficulty;
  tags: string[];
  statement: string;
  starterCode?: string;
  paletteHint?: string[];
  sampleIO?: SampleIO[];
}

export type CodeVerdict =
  | "ACCEPTED"
  | "WRONG_ANSWER"
  | "TIME_LIMIT_EXCEEDED"
  | "RUNTIME_ERROR"
  | "COMPILE_ERROR"
  | "INTERNAL_ERROR";

export interface CodeResult {
  verdict: CodeVerdict;
  passedTestCases: number;
  totalTestCases: number;
  score: number;
  maxScore: number;
}

export interface DesignResult {
  passed: boolean;
  totalScore: number;
  maxScore: number;
  passedCount: number;
  totalCount: number;
}

export type SubmissionResult =
  | { kind: "CODE"; result: CodeResult }
  | { kind: "DESIGN"; result: DesignResult };

export interface Submission {
  id: string;
  problemSlug: string;
  problemTitle: string;
  createdAt: string;
  data: SubmissionResult;
}

export interface ActivityDay {
  date: string; // YYYY-MM-DD
  count: number;
}

export interface DemoUser {
  username: string;
  displayName: string;
  bio: string;
  solvedCount: number;
  currentStreak: number;
  activity: ActivityDay[];
  following: string[];
}
