"use server"

import { revalidatePath } from "next/cache"

export async function updateQuestProgress(userEmail: string, questId: string, taskId: string, progress: number) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/quests/complete`, {
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
      throw new Error("Failed to update progress")
    }

    revalidatePath("/dashboard")
    return true
  } catch (error) {
    console.error("Error updating quest progress:", error)
    throw error
  }
}

export async function saveCustomQuests(userEmail: string, dailyQuest: any) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/quests/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quests: [dailyQuest],
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to save custom quests")
    }

    revalidatePath("/dashboard")
    revalidatePath("/settings")
    return true
  } catch (error) {
    console.error("Error saving custom quests:", error)
    throw error
  }
}

