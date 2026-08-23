import { notFound } from "next/navigation";
import { getProblemBySlug, problems } from "@/lib/data/problems";
import { DifficultyBadge } from "@/components/problems/DifficultyBadge";
import { CodeWorkspace } from "@/components/code/CodeWorkspace";
import { DesignWorkspace } from "@/components/design/DesignWorkspace";

export function generateStaticParams() {
  return problems.map((p) => ({ slug: p.slug }));
}

export default function ProblemPage({ params }: { params: { slug: string } }) {
  const problem = getProblemBySlug(params.slug);
  if (!problem) notFound();

  return (
    <div className="container page">
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <h1 style={{ margin: 0 }}>{problem.title}</h1>
        <DifficultyBadge difficulty={problem.difficulty} />
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {problem.tags.map((tag) => (
          <span key={tag} className="badge badge-tag">
            {tag}
          </span>
        ))}
      </div>
      <p style={{ maxWidth: 760, lineHeight: 1.6, marginBottom: problem.sampleIO ? 20 : 28, whiteSpace: "pre-line" }}>
        {problem.statement}
      </p>

      {problem.sampleIO && problem.sampleIO.length > 0 && (
        <div style={{ maxWidth: 760, marginBottom: 28 }}>
          <h4 style={{ marginBottom: 12 }}>Sample test cases</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {problem.sampleIO.map((sample, i) => (
              <pre
                key={i}
                className="card"
                style={{
                  margin: 0,
                  fontSize: 13,
                  fontFamily:
                    "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
                  whiteSpace: "pre-wrap",
                }}
              >
                {`Input:\n${sample.input}\nOutput: ${sample.output}`}
              </pre>
            ))}
          </div>
        </div>
      )}

      {problem.type === "CODE" ? (
        <CodeWorkspace problem={problem} />
      ) : (
        <DesignWorkspace problem={problem} />
      )}
    </div>
  );
}
