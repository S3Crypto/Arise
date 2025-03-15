"use client"

import { useState } from "react"
import { X, AlertCircle, Clock, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { updateQuestProgress } from "@/lib/actions"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"

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
  const [completingTask, setCompletingTask] = useState<string | null>(null)
  const { toast } = useToast()

  const dailyQuest = quests.find((q) => q.id === "daily") || {
    id: "daily",
    title: "STRENGTH TRAINING HAS ARRIVED",
    tasks: [],
    isCompleted: false,
  }

  const isQuestIncomplete = dailyQuest.tasks.length > 0 && !dailyQuest.isCompleted

  const handleProgressUpdate = async (taskId: string, newProgress: number) => {
    try {
      setCompletingTask(taskId)
      const result = await updateQuestProgress(userEmail, "daily", taskId, newProgress)

      if (!result) {
        throw new Error("Failed to update progress")
      }

      // Check if this update completes the task
      const task = dailyQuest.tasks.find((t) => t.id === taskId)
      if (task && newProgress >= task.goal) {
        toast({
          title: "Task Completed!",
          description: `You've completed: ${task.name}`,
          variant: "default",
        })
      }
    } catch (error) {
      console.error("Error updating task progress:", error)
      toast({
        title: "Error",
        description: "Failed to update task progress. Please try again.",
        variant: "destructive",
      })
    } finally {
      setTimeout(() => setCompletingTask(null), 1000)
    }
  }

  const handleCompleteTask = async (taskId: string) => {
    const task = dailyQuest.tasks.find((t) => t.id === taskId)
    if (task) {
      await handleProgressUpdate(taskId, task.goal)
    }
  }

  if (!dailyQuest) return null

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  }

  return (
    <>
      <AnimatePresence>
        {isQuestIncomplete && (
          <motion.div
            initial={{ scale: 1 }}
            animate={{
              scale: [1, 1.1, 1],
              boxShadow: [
                "0 0 0 0 rgba(5, 185, 202, 0)",
                "0 0 0 10px rgba(5, 185, 202, 0.3)",
                "0 0 0 0 rgba(5, 185, 202, 0)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
            className="fixed bottom-8 right-8 z-40"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="bg-cyan-800 hover:bg-cyan-700 text-white rounded-full w-16 h-16 flex items-center justify-center"
            >
              <AlertCircle size={28} />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/80 z-50"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={modalVariants}
              className="relative w-full max-w-md"
            >
              {/* Animated scan lines */}
              <div
                className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,20,40,.5)_50%)] bg-[length:100%_4px] pointer-events-none"
                style={{ animation: "scan 8s linear infinite" }}
              />

              {/* Outer frame decoration */}
              <div className="absolute -top-4 -left-2 -right-2 h-12 bg-blue-400/10"></div>
              <div className="absolute -bottom-4 -left-2 -right-2 h-12 bg-blue-400/10"></div>
              <div className="absolute -left-4 -top-2 -bottom-2 w-12 bg-blue-400/10"></div>
              <div className="absolute -right-4 -top-2 -bottom-2 w-12 bg-blue-400/10"></div>

              <div className="relative bg-[#000a14]/90 backdrop-blur-sm rounded border-2 border-blue-400/30 overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                {/* Header section */}
                <div className="pt-6 pb-2 px-6 text-center border-b border-blue-400/30">
                  <div className="flex justify-center items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-blue-400/50 bg-transparent">
                      <AlertCircle className="text-blue-400 h-5 w-5" />
                    </div>
                    <h2 className="text-2xl font-bold text-blue-400 tracking-wider ml-2">QUEST INFO</h2>
                  </div>
                  <Button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-2 right-2 h-8 w-8 rounded-full bg-transparent hover:bg-blue-400/20 p-0"
                  >
                    <X className="h-4 w-4 text-blue-400" />
                  </Button>

                  <div className="text-white text-center mt-4 mb-2">
                    [Daily Quest: {dailyQuest.title}]
                  </div>
                </div>

                {/* Goal header */}
                <div className="px-8 py-2 text-center">
                  <div className="text-blue-400 text-xl font-bold border-b border-blue-400/30 inline-block px-8 pb-1">
                    GOAL
                  </div>
                </div>

                {/* Quest tasks */}
                <div className="px-8 py-4">
                  {dailyQuest.tasks.map((task) => {
                    const isTaskComplete = task.current >= task.goal;

                    return (
                      <div key={task.id} className="mb-4 relative flex items-center justify-between">
                        <div className="text-gray-200 text-left">{task.name}</div>
                        <div className="flex items-center space-x-3">
                          <div className="text-white whitespace-nowrap">
                            [{task.current}/{task.goal}{task.unit}]
                          </div>
                          {/* Checkbox that completes the task */}
                          <button
                            onClick={() => handleCompleteTask(task.id)}
                            disabled={isTaskComplete || completingTask === task.id}
                            className={`w-6 h-6 flex items-center justify-center rounded border ${isTaskComplete
                              ? 'bg-green-500/20 border-green-500'
                              : 'bg-transparent border-blue-400/50 hover:bg-blue-400/20'
                              }`}
                          >
                            {isTaskComplete && <Check className="h-4 w-4 text-green-500" />}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Warning text */}
                <div className="px-8 py-4 text-center">
                  <p className="text-white text-sm">WARNING: Failure to complete</p>
                  <p className="text-white text-sm">the daily quest will result in</p>
                  <p className="text-red-500 text-sm font-bold">an appropriate penalty.</p>
                </div>

                {/* Confirmation button */}
                <div className="flex justify-center py-4 mb-2">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-12 h-12 border border-green-500/50 rounded flex items-center justify-center hover:bg-green-500/20"
                  >
                    <Check className="h-6 w-6 text-green-500" />
                  </button>
                </div>

                {/* Circuit pattern overlay for decoration */}
                <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAwaDUwdjUwSDBWMHptMTAwIDBoNTB2NTBoLTUwVjB6bTUwIDUwaDUwdjUwaC01MFY1MHpNNTAgMTAwaDUwdjUwSDUwdi01MHptMTAwIDBoNTB2NTBoLTUwdi01MHoiIGZpbGw9IiMwMGZmZmYiIGZpbGwtb3BhY2l0eT0iLjEiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==')]"></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes scan {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 0 100%;
          }
        }
      `}</style>
    </>
  )
}