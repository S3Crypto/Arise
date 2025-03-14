"use client"

import { useState } from "react"
import { X, AlertCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { updateQuestProgress } from "@/lib/actions"
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

export function DailyQuestModal({
  quests,
  userEmail,
}: {
  quests: Quest[]
  userEmail: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const dailyQuest = quests.find((q) => q.id === "daily") || {
    id: "daily",
    title: "TRAIN TO BECOME A FORMIDABLE COMBATANT",
    tasks: [],
    isCompleted: false,
  }

  const handleProgressUpdate = async (taskId: string, newProgress: number) => {
    await updateQuestProgress(userEmail, "daily", taskId, newProgress)
  }

  if (!dailyQuest) return null

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-cyan-800 hover:bg-cyan-700 text-white fixed bottom-8 right-8 rounded-full w-16 h-16 flex items-center justify-center"
      >
        <AlertCircle size={28} />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
          <motion.div initial="hidden" animate="visible" variants={modalVariants} className="relative w-full max-w-md">
            <div className="relative bg-gradient-to-b from-[#0a2434] to-[#051926] rounded-lg border-4 border-[#05b9ca]/30 overflow-hidden">
              {/* Ornamental corners */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-[#05b9ca] rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-[#05b9ca] rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-[#05b9ca] rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-[#05b9ca] rounded-br-lg"></div>

              {/* Header with ornamental design */}
              <div className="pt-6 pb-4 px-6 text-center">
                <div className="flex justify-center items-center mb-2">
                  <AlertCircle className="text-[#05b9ca] mr-2" size={24} />
                  <h2 className="text-2xl font-bold text-white tracking-wider">QUEST INFO</h2>
                </div>
                <Button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-2 right-2 h-8 w-8 rounded-full bg-transparent hover:bg-[#05b9ca]/20 p-0"
                >
                  <X className="h-4 w-4 text-[#05b9ca]" />
                </Button>

                <h3 className="text-xl text-white text-center mt-4 mb-6 font-bold tracking-wider">
                  DAILY QUEST - {dailyQuest.title}
                </h3>

                <div className="text-[#00ff4c] text-xl font-bold mb-4">GOALS</div>
              </div>

              {/* Quest tasks */}
              <div className="px-8 py-4">
                {dailyQuest.tasks.map((task) => (
                  <div key={task.id} className="mb-4 flex items-center">
                    <div className="text-gray-200 w-1/3 text-left">-{task.name.toUpperCase()}</div>
                    <div className="w-2/3 flex items-center">
                      <Progress value={(task.current / task.goal) * 100} className="h-2 flex-1 mr-2 bg-gray-700" />
                      <span className="text-white whitespace-nowrap">
                        [{task.current}/{task.goal}
                        {task.unit}]
                      </span>
                    </div>
                    <Button
                      onClick={() => handleProgressUpdate(task.id, Math.min(task.current + 1, task.goal))}
                      className="ml-2 h-6 px-2 bg-[#05b9ca] hover:bg-[#05b9ca]/80 text-xs rounded"
                    >
                      +1
                    </Button>
                  </div>
                ))}
              </div>

              {/* Warning text */}
              <div className="px-8 py-4 text-center">
                <p className="text-red-500 font-bold">CAUTION! - IF THE DAILY QUEST</p>
                <p className="text-white font-bold">REMAINS INCOMPLETE, PENALTIES</p>
                <p className="text-white font-bold">WILL BE GIVEN ACCORDINGLY.</p>
              </div>

              {/* Timer icon */}
              <div className="flex justify-center pb-8">
                <Clock className="h-12 w-12 text-[#05b9ca]" />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
}

