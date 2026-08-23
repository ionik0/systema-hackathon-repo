"use client";

export function ComponentPalette({ items }: { items: string[] }) {
  const onDragStart = (event: React.DragEvent, label: string) => {
    event.dataTransfer.setData("application/systema-component", label);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="card">
      <h4 style={{ marginTop: 0, marginBottom: 12 }}>Components</h4>
      <p className="text-muted" style={{ fontSize: 12, marginTop: 0, marginBottom: 12 }}>
        Drag onto the canvas.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((label) => (
          <div
            key={label}
            draggable
            onDragStart={(e) => onDragStart(e, label)}
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              padding: "8px 12px",
              fontSize: 13,
              cursor: "grab",
            }}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
