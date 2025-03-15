"use server"

import { revalidatePath } from "next/cache"

export async function updateQuestProgress(userEmail: string, questId: string, taskId: string, progress: number) {
  try {
    if (!process.env.NEXT_PUBLIC_APP_URL) {
      console.warn("NEXT_PUBLIC_APP_URL is not defined, using relative URL")
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || ""
    const response = await fetch(`${baseUrl}/api/quests/complete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        questId,
        taskId,
        progress,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error("Failed to update progress:", errorData)
      throw new Error("Failed to update progress")
    }

    revalidatePath("/dashboard")
    return true
  } catch (error) {
    console.error("Error updating quest progress:", error)
    return false
  }
}

export async function saveCustomQuests(userEmail: string, dailyQuest: any) {
  try {
    if (!process.env.NEXT_PUBLIC_APP_URL) {
      console.warn("NEXT_PUBLIC_APP_URL is not defined, using relative URL")
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || ""
    const response = await fetch(`${baseUrl}/api/quests/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quests: [dailyQuest],
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error("Failed to save custom quests:", errorData)
      throw new Error("Failed to save custom quests")
    }

    revalidatePath("/dashboard")
    revalidatePath("/settings")
    return true
  } catch (error) {
    console.error("Error saving custom quests:", error)
    return false
  }
}

