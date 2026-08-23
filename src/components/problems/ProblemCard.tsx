import Link from "next/link";
import { Problem } from "@/lib/types";
import { DifficultyBadge } from "@/components/problems/DifficultyBadge";

export function ProblemCard({
  problem,
  solved,
}: {
  problem: Problem;
  solved: boolean;
}) {
  return (
    <Link href={`/problems/${problem.slug}`} className="card problem-row">
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <span style={{ fontWeight: 600 }}>{problem.title}</span>
          {solved && <span className="badge badge-easy">Solved</span>}
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <span className="badge badge-tag">{problem.type === "CODE" ? "Code" : "Design"}</span>
          {problem.tags.map((tag) => (
            <span key={tag} className="badge badge-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <DifficultyBadge difficulty={problem.difficulty} />
    </Link>
  );
}
