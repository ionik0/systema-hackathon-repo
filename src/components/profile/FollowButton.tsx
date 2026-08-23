"use client";

import { useEffect, useState } from "react";

const KEY = "systema-demo:following";

function readFollowing(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

function writeFollowing(list: string[]) {
  window.localStorage.setItem(KEY, JSON.stringify(list));
}

export function FollowButton({ username }: { username: string }) {
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    setFollowing(readFollowing().includes(username));
  }, [username]);

  function toggle() {
    const list = readFollowing();
    const next = following ? list.filter((u) => u !== username) : [...list, username];
    writeFollowing(next);
    setFollowing(!following);
  }

  return (
    <button className={following ? "btn" : "btn btn-primary"} onClick={toggle}>
      {following ? "Following" : "Follow"}
    </button>
  );
}
