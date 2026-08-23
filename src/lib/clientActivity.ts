import { ActivityDay } from "@/lib/types";

/**
 * Client-only. The current browser's activity/solved history lives in
 * localStorage, keyed per-browser, for the "you" demo user. No accounts,
 * no backend, no database.
 */

const LOCAL_KEY = "systema-demo:activity";

interface LocalActivityState {
  solvedSlugs: string[];
  activity: ActivityDay[];
}

function readLocalState(): LocalActivityState {
  if (typeof window === "undefined") return { solvedSlugs: [], activity: [] };
  try {
    const raw = window.localStorage.getItem(LOCAL_KEY);
    if (!raw) return { solvedSlugs: [], activity: [] };
    return JSON.parse(raw) as LocalActivityState;
  } catch {
    return { solvedSlugs: [], activity: [] };
  }
}

function writeLocalState(state: LocalActivityState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LOCAL_KEY, JSON.stringify(state));
}

function streakFromActivity(activity: ActivityDay[]): number {
  const dates = new Set(activity.map((a) => a.date));
  let streak = 0;
  const cursor = new Date();

  while (dates.has(cursor.toISOString().slice(0, 10))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export function recordLocalAttempt(problemSlug: string, solved: boolean) {
  const state = readLocalState();
  const today = new Date().toISOString().slice(0, 10);

  const existingDay = state.activity.find((a) => a.date === today);
  if (existingDay) {
    existingDay.count += 1;
  } else {
    state.activity.push({ date: today, count: 1 });
  }

  if (solved && !state.solvedSlugs.includes(problemSlug)) {
    state.solvedSlugs.push(problemSlug);
  }

  writeLocalState(state);
}

export function isLocallySolved(problemSlug: string): boolean {
  return readLocalState().solvedSlugs.includes(problemSlug);
}

// Reads localStorage once and returns every solved slug, for callers that
// need to check membership across a whole list (avoids one localStorage
// read + JSON.parse per item via repeated isLocallySolved() calls).
export function getLocalSolvedSlugs(): Set<string> {
  return new Set(readLocalState().solvedSlugs);
}

// Reads localStorage once and derives solved count, streak, and activity
// together, for callers (profile, dashboard) that need all three at once.
export function getLocalStats(): {
  solvedCount: number;
  currentStreak: number;
  activity: ActivityDay[];
} {
  const state = readLocalState();
  return {
    solvedCount: state.solvedSlugs.length,
    currentStreak: streakFromActivity(state.activity),
    activity: state.activity,
  };
}
