"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  ReactFlowInstance,
} from "reactflow";
import "reactflow/dist/style.css";
import { CanvasNode, CanvasNodeData } from "@/components/design/CanvasNode";
import { ComponentPalette } from "@/components/design/ComponentPalette";
import { PropertiesPanel } from "@/components/design/PropertiesPanel";

const nodeTypes = { component: CanvasNode };

function nextId() {
  return crypto.randomUUID();
}

export function DesignCanvas({
  paletteItems,
  onGraphChange,
}: {
  paletteItems: string[];
  onGraphChange: (nodes: Node<CanvasNodeData>[], edges: Edge[]) => void;
}) {
  const [nodes, setNodes] = useState<Node<CanvasNodeData>[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onGraphChange(nodes, edges);
  }, [nodes, edges, onGraphChange]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    []
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const label = event.dataTransfer.getData("application/systema-component");
      if (!label || !wrapperRef.current || !rfInstance) return;

      const bounds = wrapperRef.current.getBoundingClientRect();
      const position = rfInstance.project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      const newNode: Node<CanvasNodeData> = {
        id: nextId(),
        type: "component",
        position,
        data: { label, replicas: 1 },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [rfInstance]
  );

  const updateNodeData = useCallback((id: string, data: Partial<CanvasNodeData>) => {
    setNodes((nds) =>
      nds.map((n) => (n.id === id ? { ...n, data: { ...n.data, ...data } } : n))
    );
  }, []);

  const deleteNode = useCallback((id: string) => {
    setNodes((nds) => nds.filter((n) => n.id !== id));
    setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
    setSelectedId(null);
  }, []);

  const selectedNode = nodes.find((n) => n.id === selectedId) ?? null;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "200px 1fr 240px", gap: 16 }}>
      <ComponentPalette items={paletteItems} />

      <div
        ref={wrapperRef}
        className="card"
        style={{ padding: 0, height: 480, overflow: "hidden" }}
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setRfInstance}
            onNodeClick={(_, node) => setSelectedId(node.id)}
            onPaneClick={() => setSelectedId(null)}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
        </ReactFlowProvider>
      </div>

      <PropertiesPanel node={selectedNode} onChange={updateNodeData} onDelete={deleteNode} />
    </div>
  );
}
