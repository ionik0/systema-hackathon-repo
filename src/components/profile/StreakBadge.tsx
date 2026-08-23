export function StreakBadge({ streak }: { streak: number }) {
  return (
    <span className="badge badge-tag">
      🔥 {streak} day{streak === 1 ? "" : "s"} streak
    </span>
  );
}
