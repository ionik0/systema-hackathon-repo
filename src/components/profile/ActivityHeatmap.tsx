import { ActivityDay } from "@/lib/types";

const levelColors = [
  "var(--bg-elevated)",
  "rgba(61, 220, 151, 0.25)",
  "rgba(61, 220, 151, 0.5)",
  "rgba(61, 220, 151, 0.75)",
  "var(--green)",
];

function levelFor(count: number) {
  if (count <= 0) return 0;
  if (count === 1) return 1;
  if (count === 2) return 2;
  if (count <= 4) return 3;
  return 4;
}

export function ActivityHeatmap({ activity, days = 120 }: { activity: ActivityDay[]; days?: number }) {
  const byDate = new Map(activity.map((a) => [a.date, a.count]));
  const cells: ActivityDay[] = [];
  const now = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    cells.push({ date: key, count: byDate.get(key) ?? 0 });
  }

  return (
    <div className="heatmap">
      {cells.map((cell) => (
        <div
          key={cell.date}
          className="heatmap-cell"
          title={`${cell.date}: ${cell.count} submission${cell.count === 1 ? "" : "s"}`}
          style={{ background: levelColors[levelFor(cell.count)] }}
        />
      ))}
    </div>
  );
}
