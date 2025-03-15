import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { updateUserQuests } from "@/lib/firebase"

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()

    if (!data.quests) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 })
    }

    const result = await updateUserQuests(session.user.email, data.quests)
    return NextResponse.json({ success: result })
  } catch (error) {
    console.error("Error in quest update API:", error)
    return NextResponse.json({ error: "Failed to update quests" }, { status: 500 })
  }
}

