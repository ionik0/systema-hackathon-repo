import { Difficulty } from "@/lib/types";

const classByDifficulty: Record<Difficulty, string> = {
  EASY: "badge-easy",
  MEDIUM: "badge-medium",
  HARD: "badge-hard",
};

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <span className={`badge ${classByDifficulty[difficulty]}`}>
      {difficulty[0] + difficulty.slice(1).toLowerCase()}
    </span>
  );
}
