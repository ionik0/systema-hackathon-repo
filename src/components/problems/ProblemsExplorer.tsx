"use client";

import { useEffect, useMemo, useState } from "react";
import { Problem } from "@/lib/types";
import { ProblemCard } from "@/components/problems/ProblemCard";
import { ProblemFilters, ProblemFilterState } from "@/components/problems/ProblemFilters";
import { getLocalSolvedSlugs } from "@/lib/clientActivity";

export function ProblemsExplorer({ problems }: { problems: Problem[] }) {
  const [filters, setFilters] = useState<ProblemFilterState>({
    q: "",
    difficulty: "ALL",
    type: "ALL",
  });
  const [solvedSlugs, setSolvedSlugs] = useState<Set<string>>(new Set());

  useEffect(() => {
    setSolvedSlugs(getLocalSolvedSlugs());
  }, []);

  const filtered = useMemo(() => {
    return problems.filter((p) => {
      if (filters.q && !p.title.toLowerCase().includes(filters.q.toLowerCase())) {
        return false;
      }
      if (filters.difficulty !== "ALL" && p.difficulty !== filters.difficulty) {
        return false;
      }
      if (filters.type !== "ALL" && p.type !== filters.type) {
        return false;
      }
      return true;
    });
  }, [problems, filters]);

  return (
    <div>
      <ProblemFilters value={filters} onChange={setFilters} />
      <div className="problem-list">
        {filtered.map((p) => (
          <ProblemCard key={p.slug} problem={p} solved={solvedSlugs.has(p.slug)} />
        ))}
        {filtered.length === 0 && (
          <p className="text-muted">No problems match those filters.</p>
        )}
      </div>
    </div>
  );
}
