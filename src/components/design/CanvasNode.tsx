"use client";

import { Handle, Position, NodeProps } from "reactflow";

export interface CanvasNodeData {
  label: string;
  replicas?: number;
  notes?: string;
}

export function CanvasNode({ data, selected }: NodeProps<CanvasNodeData>) {
  return (
    <div
      style={{
        background: "var(--bg-elevated)",
        border: `1px solid ${selected ? "var(--accent)" : "var(--border)"}`,
        borderRadius: 8,
        padding: "10px 14px",
        minWidth: 140,
        fontSize: 13,
        color: "var(--text)",
      }}
    >
      <Handle type="target" position={Position.Left} />
      <div style={{ fontWeight: 600 }}>{data.label}</div>
      {data.replicas ? (
        <div style={{ color: "var(--text-muted)", fontSize: 11, marginTop: 2 }}>
          x{data.replicas}
        </div>
      ) : null}
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
