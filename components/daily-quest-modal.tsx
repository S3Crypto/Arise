"use client"

import { useState } from "react"
import { X, AlertCircle, Clock, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { updateQuestProgress } from "@/lib/actions"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"
import Particles from "react-tsparticles"
import { loadFull } from "tsparticles"
import type { Engine } from "tsparticles-engine"

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
  const [showConfetti, setShowConfetti] = useState(false)
  const { toast } = useToast()

  const dailyQuest = quests.find((q) => q.id === "daily") || {
    id: "daily",
    title: "TRAIN TO BECOME A FORMIDABLE COMBATANT",
    tasks: [],
    isCompleted: false,
  }

  const isQuestIncomplete = dailyQuest.tasks.length > 0 && !dailyQuest.isCompleted

  const particlesInit = async (engine: Engine) => {
    await loadFull(engine)
  }

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
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 3000)

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

  const particlesOptions = {
    background: {
      opacity: 0,
    },
    particles: {
      number: {
        value: 40,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#05b9ca",
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.5,
        random: true,
      },
      size: {
        value: 3,
        random: true,
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
      },
    },
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
            <Particles id="tsparticles" init={particlesInit} options={particlesOptions} className="absolute inset-0" />

            <motion.div
              initial="hidden"
              animate="visible"
              variants={modalVariants}
              className="relative w-full max-w-md"
            >
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
                    <h2 className="text-2xl font-bold text-white tracking-wider">ARISE QUEST</h2>
                  </div>
                  <Button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-2 right-2 h-8 w-8 rounded-full bg-transparent hover:bg-[#05b9ca]/20 p-0"
                  >
                    <X className="h-4 w-4 text-[#05b9ca]" />
                  </Button>

                  <h3 className="text-xl text-white text-center mt-4 mb-6 font-bold tracking-wider">
                    {dailyQuest.title}
                  </h3>

                  <div className="text-[#00ff4c] text-xl font-bold mb-4">GOALS</div>
                </div>

                {/* Quest tasks */}
                <div className="px-8 py-4">
                  {dailyQuest.tasks.map((task) => {
                    const isTaskComplete = task.current >= task.goal
                    const isTaskInProgress = completingTask === task.id

                    return (
                      <div key={task.id} className="mb-6 relative">
                        <div className="flex items-center mb-2">
                          <div className="text-gray-200 flex-1 text-left">-{task.name.toUpperCase()}</div>
                          <div className="text-white whitespace-nowrap">
                            [{task.current}/{task.goal}
                            {task.unit}]
                          </div>
                        </div>

                        <div className="flex items-center">
                          <div className="flex-1 mr-3">
                            <Progress
                              value={(task.current / task.goal) * 100}
                              className="h-3 bg-gray-700 relative overflow-hidden"
                            >
                              {isTaskInProgress && (
                                <motion.div
                                  className="absolute inset-0 bg-[#05b9ca]/30"
                                  animate={{ x: ["0%", "100%"] }}
                                  transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                                />
                              )}
                            </Progress>
                          </div>

                          <div className="flex space-x-2">
                            <Button
                              onClick={() => handleProgressUpdate(task.id, Math.min(task.current + 1, task.goal))}
                              className="h-8 px-2 bg-[#05b9ca] hover:bg-[#05b9ca]/80 text-xs rounded"
                              disabled={isTaskComplete || isTaskInProgress}
                            >
                              +1
                            </Button>

                            {!isTaskComplete ? (
                              <Button
                                onClick={() => handleCompleteTask(task.id)}
                                className="h-8 px-2 bg-green-600 hover:bg-green-700 text-xs rounded flex items-center"
                                disabled={isTaskComplete || isTaskInProgress}
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Complete
                              </Button>
                            ) : (
                              <div className="h-8 px-3 bg-green-600/20 text-green-400 text-xs rounded flex items-center">
                                <Check className="h-4 w-4 mr-1" />
                                Completed
                              </div>
                            )}
                          </div>
                        </div>

                        {isTaskInProgress && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute -right-2 -top-2 text-xs bg-[#05b9ca] text-white px-2 py-1 rounded"
                          >
                            Updating...
                          </motion.div>
                        )}
                      </div>
                    )
                  })}
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

            {showConfetti && (
              <div className="fixed inset-0 pointer-events-none">
                <Particles
                  id="confetti-particles"
                  init={particlesInit}
                  options={{
                    particles: {
                      number: {
                        value: 100,
                      },
                      color: {
                        value: ["#05b9ca", "#00ff4c", "#ffffff", "#ffcc00"],
                      },
                      shape: {
                        type: "circle",
                      },
                      size: {
                        value: 6,
                        random: true,
                      },
                      move: {
                        enable: true,
                        speed: 10,
                        direction: "bottom",
                        straight: false,
                      },
                      opacity: {
                        value: 0.7,
                        random: true,
                      },
                    },
                  }}
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

