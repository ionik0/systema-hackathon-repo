import { NextRequest, NextResponse } from "next/server";
import { getUserByUsername } from "@/lib/data/users";

export async function GET(
  _req: NextRequest,
  { params }: { params: { username: string } }
) {
  const user = getUserByUsername(params.username);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json({ user });
}
