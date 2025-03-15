"use client"

import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Check } from "lucide-react"
import { motion } from "framer-motion"

type QuestTask = {
  id: string
  name: string
  goal: number
  current: number
  unit: string
}

type Quest = {
  id: string
  title: string
  tasks: QuestTask[]
  isCompleted: boolean
}

export function QuestProgress({ quests }: { quests: Quest[] }) {
  const dailyQuest = quests.find((q) => q.id === "daily")

  if (!dailyQuest || dailyQuest.tasks.length === 0) {
    return (
      <Card className="bg-gradient-to-b from-[#0a2434] to-[#051926] border-2 border-[#05b9ca]/30">
        <CardHeader>
          <CardTitle className="text-white">Daily Quest Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400 text-center py-4">No active quests. Set up your daily quests in the settings.</p>
        </CardContent>
      </Card>
    )
  }

  const totalTasks = dailyQuest.tasks.length
  const completedTasks = dailyQuest.tasks.filter((t) => t.current >= t.goal).length
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  return (
    <Card className="bg-gradient-to-b from-[#0a2434] to-[#051926] border-2 border-[#05b9ca]/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Trophy className="w-5 h-5 mr-2 text-[#05b9ca]" />
          Daily Quest Progress
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-300">Overall Progress</span>
              <span className="text-[#05b9ca]">
                {completedTasks}/{totalTasks} tasks
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2 bg-gray-800" />
          </div>

          <div className="space-y-4 mt-4">
            {dailyQuest.tasks.map((task) => {
              const taskProgress = (task.current / task.goal) * 100
              const isCompleted = task.current >= task.goal

              return (
                <motion.div
                  key={task.id}
                  className={`p-3 rounded-md ${isCompleted ? "bg-[#05b9ca]/10 border border-[#05b9ca]/30" : ""}`}
                  animate={
                    isCompleted
                      ? {
                          boxShadow: [
                            "0 0 0 0 rgba(5, 185, 202, 0)",
                            "0 0 0 4px rgba(5, 185, 202, 0.2)",
                            "0 0 0 0 rgba(5, 185, 202, 0)",
                          ],
                        }
                      : {}
                  }
                  transition={{ duration: 2, repeat: isCompleted ? 3 : 0 }}
                >
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300 flex items-center">
                      {isCompleted && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 260, damping: 20 }}
                          className="mr-1.5 bg-green-500 rounded-full p-0.5"
                        >
                          <Check className="h-3 w-3 text-black" />
                        </motion.div>
                      )}
                      {task.name}
                    </span>
                    <span className={`${isCompleted ? "text-green-400" : "text-[#05b9ca]"}`}>
                      {task.current}/{task.goal}
                      {task.unit}
                    </span>
                  </div>
                  <Progress
                    value={taskProgress}
                    className={`h-1.5 ${isCompleted ? "bg-green-900" : "bg-gray-800"}`}
                    indicatorClassName={isCompleted ? "bg-green-500" : ""}
                  />
                </motion.div>
              )
            })}
          </div>

          {dailyQuest.isCompleted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#05b9ca]/20 border border-[#05b9ca] text-white p-3 rounded-md text-center mt-4"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 2, 0, -2, 0],
                }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                className="inline-block"
              >
                ✨
              </motion.div>{" "}
              Quest completed! You've earned stat points.{" "}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, -2, 0, 2, 0],
                }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                className="inline-block"
              >
                ✨
              </motion.div>
            </motion.div>
          ) : (
            <div className="bg-red-500/20 border border-red-500 text-white p-3 rounded-md text-center mt-4">
              ⚠️ Quest is still incomplete. Complete all tasks to earn rewards!
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

