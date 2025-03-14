import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getUserQuests } from "@/lib/firebase"
import { DashboardHeader } from "@/components/dashboard-header"
import { CustomQuestSettings } from "@/components/custom-quest-settings"

export default async function SettingsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/")
  }

  const userQuests = await getUserQuests(session.user.email)

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <DashboardHeader user={session.user} />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-white border-b border-cyan-800 pb-2">Quest Settings</h1>

        <CustomQuestSettings currentQuests={userQuests} userEmail={session.user.email} />
      </div>
    </main>
  )
}

