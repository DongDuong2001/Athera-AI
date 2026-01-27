import { getSession } from "@/utils/auth";
import prisma from "@/utils/database/prisma";
import DashboardView from "./dashboard-view";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const user = await getSession();

  if (!user) {
    redirect("/sign-in");
  }

  // Fetch real-time data from DB
  const moodCount = await prisma.moodEntry.count({
    where: {
      userId: user.id
    }
  });

  return (
    <DashboardView 
        user={user} 
        stats={{ moodCount }} 
    />
  );
}
