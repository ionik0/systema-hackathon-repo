import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container page">
      <div style={{ maxWidth: 720, margin: "40px auto", textAlign: "center" }}>
        <h1 style={{ fontSize: 40, lineHeight: 1.2, marginBottom: 16 }}>
          Practice system design and coding interviews with judged submissions
        </h1>
        <p className="text-muted" style={{ fontSize: 18, marginBottom: 32 }}>
          Architecture diagrams graded against real criteria, code graded
          against real test cases. Systema covers the interview round most
          platforms skip: system design.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <Link href="/problems" className="btn btn-primary">
            Browse problems
          </Link>
          <a
            href="https://systema-sd.in"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            Visit the real product ↗
          </a>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", marginTop: 56 }}>
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Code problems</h3>
          <p className="text-muted">
            Write a solution, run it against hidden test cases, get a verdict:
            accepted, wrong answer, time limit exceeded, and so on.
          </p>
        </div>
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Design problems</h3>
          <p className="text-muted">
            Build an actual architecture diagram on a canvas, load balancers,
            caches, databases, queues, and get it graded against real
            criteria, not a free-text essay.
          </p>
        </div>
      </div>

      <div className="card" style={{ marginTop: 24 }}>
        <h3 style={{ marginTop: 0 }}>About this repo</h3>
        <p className="text-muted" style={{ marginBottom: 0 }}>
          This is a public hackathon build with two sample problems, one code
          and one design, so you can try the judged flow end to end. The
          evaluation engine here is a mocked stand-in that matches the real
          API&apos;s response shape but does not actually grade anything, the
          real Systema evaluation engine is closed-source. Try the samples on{" "}
          <Link href="/problems" style={{ textDecoration: "underline" }}>
            the problems page
          </Link>
          , visit{" "}
          <a
            href="https://systema-sd.in"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "underline" }}
          >
            systema-sd.in
          </a>{" "}
          for the full problem set, or read{" "}
          <a
            href="https://github.com/ionik0/systema-hackathon-repo/blob/main/docs/ARCHITECTURE.md"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "underline" }}
          >
            docs/ARCHITECTURE.md
          </a>{" "}
          for what&apos;s real vs. mocked.
        </p>
      </div>
    </div>
  );
}
