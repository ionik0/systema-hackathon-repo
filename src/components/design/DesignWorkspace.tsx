"use client";

import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { Edge, Node } from "reactflow";
import { Problem } from "@/lib/types";
import { DesignCanvas } from "@/components/design/DesignCanvas";
import { CanvasNodeData } from "@/components/design/CanvasNode";
import { recordLocalAttempt } from "@/lib/clientActivity";

export function DesignWorkspace({ problem }: { problem: Problem }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const graphRef = useRef<{ nodes: Node<CanvasNodeData>[]; edges: Edge[] }>({
    nodes: [],
    edges: [],
  });

  const handleGraphChange = useCallback((nodes: Node<CanvasNodeData>[], edges: Edge[]) => {
    graphRef.current = { nodes, edges };
  }, []);

  async function handleSubmit() {
    setSubmitting(true);
    try {
      const { nodes, edges } = graphRef.current;
      const res = await fetch("/api/submit/design", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problemSlug: problem.slug, nodes, edges }),
      });
      const data = await res.json();
      recordLocalAttempt(problem.slug, data.result.passed);
      router.push(`/submissions/${data.id}`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
        <button className="btn btn-primary" onClick={handleSubmit} disabled={submitting}>
          {submitting ? "Judging..." : "Submit design"}
        </button>
      </div>
      <DesignCanvas
        paletteItems={problem.paletteHint ?? []}
        onGraphChange={handleGraphChange}
      />
    </div>
  );
}
