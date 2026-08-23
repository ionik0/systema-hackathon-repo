import { problems } from "@/lib/data/problems";
import { ProblemsExplorer } from "@/components/problems/ProblemsExplorer";

export default function ProblemsPage() {
  return (
    <div className="container page">
      <h1 style={{ marginBottom: 4 }}>Problems</h1>
      <p className="text-muted" style={{ marginTop: 0, marginBottom: 24 }}>
        This demo ships {problems.length} sample problems, one code and one design, so you can try
        the judged flow end to end. The full problem set is on the real product at{" "}
        <a
          href="https://systema-sd.in"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "underline" }}
        >
          systema-sd.in
        </a>
        .
      </p>
      <ProblemsExplorer problems={problems} />
    </div>
  );
}
