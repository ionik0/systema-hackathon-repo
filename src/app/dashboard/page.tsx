"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { problems } from "@/lib/data/problems";
import { demoUsers } from "@/lib/data/users";
import { ActivityDay } from "@/lib/types";
import { ActivityHeatmap } from "@/components/profile/ActivityHeatmap";
import { StreakBadge } from "@/components/profile/StreakBadge";
import { getLocalSolvedSlugs, getLocalStats } from "@/lib/clientActivity";

export default function DashboardPage() {
  const [stats, setStats] = useState<{ solvedCount: number; currentStreak: number; activity: ActivityDay[] }>({
    solvedCount: 0,
    currentStreak: 0,
    activity: [],
  });
  const [solvedSlugs, setSolvedSlugs] = useState<Set<string>>(new Set());
  const [following, setFollowing] = useState<string[]>([]);

  useEffect(() => {
    setStats(getLocalStats());
    setSolvedSlugs(getLocalSolvedSlugs());

    const seeded = demoUsers.find((u) => u.username === "you")?.following ?? [];
    let extra: string[] = [];
    try {
      extra = JSON.parse(window.localStorage.getItem("systema-demo:following") ?? "[]");
    } catch {
      extra = [];
    }
    setFollowing(Array.from(new Set([...seeded, ...extra])));
  }, []);

  return (
    <div className="container page">
      <h1 style={{ marginBottom: 4 }}>Your dashboard</h1>
      <p className="text-muted" style={{ marginTop: 0, marginBottom: 24 }}>
        Signed in as the demo account for this browser.{" "}
        <Link href="/u/you" style={{ textDecoration: "underline" }}>
          View public profile
        </Link>
      </p>

      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <span className="badge badge-tag">{stats.solvedCount} solved</span>
        <StreakBadge streak={stats.currentStreak} />
      </div>

      <div className="card" style={{ marginBottom: 24 }}>
        <h4 style={{ marginTop: 0 }}>Activity</h4>
        <ActivityHeatmap activity={stats.activity} />
      </div>

      <div className="grid" style={{ gridTemplateColumns: "2fr 1fr", alignItems: "start" }}>
        <div className="card">
          <h4 style={{ marginTop: 0 }}>Problems</h4>
          <div className="problem-list">
            {problems.map((p) => (
              <div key={p.slug} className="problem-row" style={{ padding: "8px 0" }}>
                <Link href={`/problems/${p.slug}`} style={{ fontWeight: 500 }}>
                  {p.title}
                </Link>
                {solvedSlugs.has(p.slug) && <span className="badge badge-easy">Solved</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h4 style={{ marginTop: 0 }}>Following</h4>
          {following.length === 0 && <p className="text-muted">Not following anyone yet.</p>}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {following.map((username) => (
              <Link key={username} href={`/u/${username}`} style={{ textDecoration: "underline" }}>
                @{username}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
