import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { completeQuestTask, updateUserStats } from "@/lib/firebase"

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()

    if (!data.questId || !data.taskId || data.progress === undefined) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 })
    }

    const result = await completeQuestTask(session.user.email, data.questId, data.taskId, data.progress)

    // Update user stats if quest is completed
    if (data.isCompleted) {
      await updateUserStats(session.user.email, data.statUpdates || {})
    }

    return NextResponse.json({ success: result })
  } catch (error) {
    console.error("Error in quest completion API:", error)
    return NextResponse.json({ error: "Failed to update quest progress" }, { status: 500 })
  }
}

