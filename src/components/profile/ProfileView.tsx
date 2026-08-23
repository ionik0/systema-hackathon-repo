"use client";

import { useEffect, useState } from "react";
import { DemoUser } from "@/lib/types";
import { ActivityHeatmap } from "@/components/profile/ActivityHeatmap";
import { StreakBadge } from "@/components/profile/StreakBadge";
import { FollowButton } from "@/components/profile/FollowButton";
import { getLocalStats } from "@/lib/clientActivity";

export function ProfileView({ user }: { user: DemoUser }) {
  const isYou = user.username === "you";
  const [live, setLive] = useState({
    solvedCount: user.solvedCount,
    currentStreak: user.currentStreak,
    activity: user.activity,
  });

  useEffect(() => {
    if (!isYou) return;
    setLive(getLocalStats());
  }, [isYou]);

  return (
    <div className="container page">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1 style={{ marginBottom: 4 }}>{user.displayName}</h1>
          <p className="text-muted" style={{ marginTop: 0 }}>
            @{user.username}
          </p>
          <p style={{ maxWidth: 480 }}>{user.bio}</p>
        </div>
        {!isYou && <FollowButton username={user.username} />}
      </div>

      <div style={{ display: "flex", gap: 12, margin: "20px 0" }}>
        <span className="badge badge-tag">{live.solvedCount} solved</span>
        <StreakBadge streak={live.currentStreak} />
        <span className="badge badge-tag">{user.following.length} following</span>
      </div>

      <div className="card">
        <h4 style={{ marginTop: 0 }}>Activity</h4>
        <ActivityHeatmap activity={live.activity} />
      </div>

      {isYou && live.activity.length === 0 && (
        <p className="text-muted" style={{ marginTop: 16, fontSize: 13 }}>
          Solve or attempt a problem to start filling in your activity.
        </p>
      )}
    </div>
  );
}
