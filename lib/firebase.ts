import admin from "firebase-admin"
import { getApps } from "firebase-admin/app"

// Initialize Firebase Admin if it hasn't been initialized yet
if (!getApps().length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  })
}

const db = admin.firestore()

// Default stats for new users
const defaultStats = {
  hp: 100,
  mp: 10,
  fatigue: 0,
  str: 10,
  vit: 10,
  agi: 10,
  int: 10,
  per: 10,
  level: 1,
  exp: 0,
  expToNextLevel: 100,
  abilityPoints: 0,
}

// Default daily quest for new users
const defaultDailyQuest = {
  id: "daily",
  title: "TRAIN TO BECOME A FORMIDABLE COMBATANT",
  tasks: [
    { id: "push-ups", name: "PUSH-UPS", goal: 100, current: 0, unit: "" },
    { id: "sit-ups", name: "SIT-UPS", goal: 100, current: 0, unit: "" },
    { id: "squats", name: "SQUATS", goal: 100, current: 0, unit: "" },
    { id: "run", name: "RUN", goal: 10, current: 0, unit: "KM" },
  ],
  isCompleted: false,
}

// Create a new user
export async function createUser(email: string, name: string) {
  const userRef = db.collection("users").doc(email)
  const userDoc = await userRef.get()

  if (!userDoc.exists) {
    await userRef.set({
      email,
      name,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      stats: defaultStats,
      quests: [defaultDailyQuest],
    })
  }

  return true
}

// Get user stats
export async function getUserStats(email: string) {
  const userRef = db.collection("users").doc(email)
  const userDoc = await userRef.get()

  if (!userDoc.exists) {
    return defaultStats
  }

  const userData = userDoc.data()
  return userData?.stats || defaultStats
}

// Get user quests
export async function getUserQuests(email: string) {
  const userRef = db.collection("users").doc(email)
  const userDoc = await userRef.get()

  if (!userDoc.exists) {
    return [defaultDailyQuest]
  }

  const userData = userDoc.data()
  return userData?.quests || [defaultDailyQuest]
}

// Update user quests
export async function updateUserQuests(email: string, quests: any) {
  const userRef = db.collection("users").doc(email)
  await userRef.update({
    quests: quests,
  })

  return true
}

// Complete quest task
export async function completeQuestTask(email: string, questId: string, taskId: string, progress: number) {
  const userRef = db.collection("users").doc(email)
  const userDoc = await userRef.get()

  if (!userDoc.exists) {
    throw new Error("User not found")
  }

  const userData = userDoc.data()
  const quests = userData?.quests || []

  const updatedQuests = quests.map((quest: any) => {
    if (quest.id === questId) {
      const updatedTasks = quest.tasks.map((task: any) => {
        if (task.id === taskId) {
          return { ...task, current: progress }
        }
        return task
      })

      // Check if all tasks are completed
      const allTasksCompleted = updatedTasks.every((task: any) => task.current >= task.goal)

      return {
        ...quest,
        tasks: updatedTasks,
        isCompleted: allTasksCompleted,
      }
    }
    return quest
  })

  await userRef.update({
    quests: updatedQuests,
  })

  return true
}

// Update user stats
export async function updateUserStats(email: string, statUpdates: any) {
  const userRef = db.collection("users").doc(email)
  const userDoc = await userRef.get()

  if (!userDoc.exists) {
    throw new Error("User not found")
  }

  const userData = userDoc.data()
  const currentStats = userData?.stats || defaultStats

  const updatedStats = {
    ...currentStats,
    ...statUpdates,
    exp: currentStats.exp + 50, // Add some exp for completing a quest
  }

  // Level up check
  if (updatedStats.exp >= updatedStats.expToNextLevel) {
    updatedStats.level += 1
    updatedStats.exp = updatedStats.exp - updatedStats.expToNextLevel
    updatedStats.expToNextLevel = Math.floor(updatedStats.expToNextLevel * 1.5)
    updatedStats.abilityPoints += 3
  }

  await userRef.update({
    stats: updatedStats,
  })

  return true
}

