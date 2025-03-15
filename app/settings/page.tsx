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

  try {
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
  } catch (error) {
    console.error("Error loading settings:", error)

    // Fallback UI in case of error
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
        <DashboardHeader user={session.user} />

        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl font-bold mb-6 text-white border-b border-cyan-800 pb-2">Quest Settings</h1>

          <div className="bg-red-500/20 border border-red-500 text-white p-6 rounded-lg max-w-2xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Something went wrong</h2>
            <p className="mb-4">We encountered an error while loading your quest settings. Please try again later.</p>
            <a href="/dashboard" className="inline-block bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded">
              Return to Dashboard
            </a>
          </div>
        </div>
      </main>
    )
  }
}

