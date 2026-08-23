import { ActivityDay, DemoUser } from "@/lib/types";

// Demo seed data only: fake profiles so the profile/follow UI has something
// to show. None of this represents real Systema users or usage numbers.

function seededActivity(seed: number, days: number): ActivityDay[] {
  const out: ActivityDay[] = [];
  const now = new Date();
  let state = seed;
  const next = () => {
    // small deterministic PRNG (mulberry32) so activity is stable across renders
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const roll = next();
    const count = roll > 0.55 ? Math.floor(roll * 5) : 0;
    if (count > 0) {
      out.push({ date: d.toISOString().slice(0, 10), count });
    }
  }
  return out;
}

export const demoUsers: DemoUser[] = [
  {
    username: "you",
    displayName: "You (this browser)",
    bio: "The demo account this browser is signed in as. Activity here reflects what you submit in this session.",
    solvedCount: 0,
    currentStreak: 0,
    activity: [],
    following: ["ananya-dsgn", "rohit-codes"],
  },
  {
    username: "ananya-dsgn",
    displayName: "Ananya Rao",
    bio: "Prepping for system design rounds. Seed demo profile.",
    solvedCount: 14,
    currentStreak: 3,
    activity: seededActivity(42, 120),
    following: ["rohit-codes"],
  },
  {
    username: "rohit-codes",
    displayName: "Rohit Mehta",
    bio: "DSA grinder, design-curious. Seed demo profile.",
    solvedCount: 27,
    currentStreak: 0,
    activity: seededActivity(1337, 120),
    following: [],
  },
];

export function getUserByUsername(username: string): DemoUser | undefined {
  return demoUsers.find((u) => u.username === username);
}
