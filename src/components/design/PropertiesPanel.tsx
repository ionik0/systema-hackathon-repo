"use client";

import { Node } from "reactflow";
import { CanvasNodeData } from "@/components/design/CanvasNode";

export function PropertiesPanel({
  node,
  onChange,
  onDelete,
}: {
  node: Node<CanvasNodeData> | null;
  onChange: (id: string, data: Partial<CanvasNodeData>) => void;
  onDelete: (id: string) => void;
}) {
  if (!node) {
    return (
      <div className="card">
        <h4 style={{ marginTop: 0 }}>Properties</h4>
        <p className="text-muted" style={{ fontSize: 13, marginBottom: 0 }}>
          Select a component on the canvas to configure it.
        </p>
      </div>
    );
  }

  return (
    <div className="card">
      <h4 style={{ marginTop: 0 }}>Properties</h4>
      <label style={{ display: "block", fontSize: 12, color: "var(--text-muted)", marginBottom: 4 }}>
        Label
      </label>
      <input
        value={node.data.label}
        onChange={(e) => onChange(node.id, { label: e.target.value })}
        style={{ width: "100%", marginBottom: 12 }}
      />
      <label style={{ display: "block", fontSize: 12, color: "var(--text-muted)", marginBottom: 4 }}>
        Replicas
      </label>
      <input
        type="number"
        min={1}
        value={node.data.replicas ?? 1}
        onChange={(e) => onChange(node.id, { replicas: Number(e.target.value) })}
        style={{ width: "100%", marginBottom: 12 }}
      />
      <label style={{ display: "block", fontSize: 12, color: "var(--text-muted)", marginBottom: 4 }}>
        Notes
      </label>
      <textarea
        value={node.data.notes ?? ""}
        onChange={(e) => onChange(node.id, { notes: e.target.value })}
        rows={3}
        style={{ width: "100%", marginBottom: 12, resize: "vertical" }}
      />
      <button className="btn" onClick={() => onDelete(node.id)} style={{ width: "100%" }}>
        Remove component
      </button>
    </div>
  );
}
