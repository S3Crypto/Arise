import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { DailyQuestModal } from "@/components/daily-quest-modal"
import { StatsDisplay } from "@/components/stats-display"
import { QuestProgress } from "@/components/quest-progress"
import { getUserStats, getUserQuests } from "@/lib/firebase"
import { DashboardHeader } from "@/components/dashboard-header"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/")
  }

  const userStats = await getUserStats(session.user.email)
  const userQuests = await getUserQuests(session.user.email)

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <DashboardHeader user={session.user} />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <StatsDisplay stats={userStats} />
            <QuestProgress quests={userQuests} />
          </div>
          <div className="flex justify-center items-start">
            <DailyQuestModal quests={userQuests} userEmail={session.user.email} />
          </div>
        </div>
      </div>
    </main>
  )
}

