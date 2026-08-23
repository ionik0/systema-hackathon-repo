"use client";

import { Difficulty, ProblemType } from "@/lib/types";

export interface ProblemFilterState {
  q: string;
  difficulty: Difficulty | "ALL";
  type: ProblemType | "ALL";
}

export function ProblemFilters({
  value,
  onChange,
}: {
  value: ProblemFilterState;
  onChange: (next: ProblemFilterState) => void;
}) {
  return (
    <div className="filters-bar">
      <input
        placeholder="Search problems..."
        value={value.q}
        onChange={(e) => onChange({ ...value, q: e.target.value })}
        style={{ minWidth: 220 }}
      />
      <select
        value={value.type}
        onChange={(e) =>
          onChange({ ...value, type: e.target.value as ProblemFilterState["type"] })
        }
      >
        <option value="ALL">All types</option>
        <option value="CODE">Code</option>
        <option value="DESIGN">Design</option>
      </select>
      <select
        value={value.difficulty}
        onChange={(e) =>
          onChange({
            ...value,
            difficulty: e.target.value as ProblemFilterState["difficulty"],
          })
        }
      >
        <option value="ALL">All difficulties</option>
        <option value="EASY">Easy</option>
        <option value="MEDIUM">Medium</option>
        <option value="HARD">Hard</option>
      </select>
    </div>
  );
}
