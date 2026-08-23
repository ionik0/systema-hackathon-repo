import { notFound } from "next/navigation";
import { demoUsers, getUserByUsername } from "@/lib/data/users";
import { ProfileView } from "@/components/profile/ProfileView";

export function generateStaticParams() {
  return demoUsers.map((u) => ({ username: u.username }));
}

export default function ProfilePage({ params }: { params: { username: string } }) {
  const user = getUserByUsername(params.username);
  if (!user) notFound();
  return <ProfileView user={user} />;
}
