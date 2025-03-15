"use client"

import { useState } from "react"
import { Plus, Save, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { saveCustomQuests } from "@/lib/actions"
import { toast } from "@/components/ui/use-toast"

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

export function CustomQuestSettings({
  currentQuests,
  userEmail,
}: {
  currentQuests: Quest[]
  userEmail: string
}) {
  const [dailyQuest, setDailyQuest] = useState<Quest>(
    currentQuests.find((q) => q.id === "daily") || {
      id: "daily",
      title: "TRAIN TO BECOME A FORMIDABLE COMBATANT",
      tasks: [],
      isCompleted: false,
    },
  )

  const [loading, setLoading] = useState(false)

  const addTask = () => {
    const newTask = {
      id: `task_${Date.now()}`,
      name: "",
      goal: 10,
      current: 0,
      unit: "",
    }

    setDailyQuest({
      ...dailyQuest,
      tasks: [...dailyQuest.tasks, newTask],
    })
  }

  const updateTask = (index: number, field: keyof QuestTask, value: string | number) => {
    const updatedTasks = [...dailyQuest.tasks]
    updatedTasks[index] = {
      ...updatedTasks[index],
      [field]: value,
    }

    setDailyQuest({
      ...dailyQuest,
      tasks: updatedTasks,
    })
  }

  const removeTask = (index: number) => {
    const updatedTasks = dailyQuest.tasks.filter((_, i) => i !== index)

    setDailyQuest({
      ...dailyQuest,
      tasks: updatedTasks,
    })
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      await saveCustomQuests(userEmail, dailyQuest)
      toast({
        title: "Success",
        description: "Your custom quests have been saved.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save custom quests.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="bg-gradient-to-b from-[#0a2434] to-[#051926] border-2 border-[#05b9ca]/30">
      <CardHeader>
        <CardTitle className="text-white">Arise Custom Quest</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="questTitle" className="text-white">
            Quest Title
          </Label>
          <Input
            id="questTitle"
            value={dailyQuest.title}
            onChange={(e) => setDailyQuest({ ...dailyQuest, title: e.target.value })}
            className="bg-[#041420] border-[#05b9ca]/20 text-white"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-white font-bold">Quest Tasks</h3>
            <Button
              onClick={addTask}
              variant="outline"
              size="sm"
              className="border-[#05b9ca] text-[#05b9ca] hover:bg-[#05b9ca]/20"
            >
              <Plus className="h-4 w-4 mr-1" /> Add Task
            </Button>
          </div>

          {dailyQuest.tasks.length === 0 ? (
            <div className="text-gray-400 text-center py-4">
              No tasks added yet. Click "Add Task" to create your first quest task.
            </div>
          ) : (
            dailyQuest.tasks.map((task, index) => (
              <div key={task.id} className="grid grid-cols-12 gap-2 items-end">
                <div className="col-span-4">
                  <Label htmlFor={`task-${index}-name`} className="text-white">
                    Task Name
                  </Label>
                  <Input
                    id={`task-${index}-name`}
                    value={task.name}
                    onChange={(e) => updateTask(index, "name", e.target.value)}
                    className="bg-[#041420] border-[#05b9ca]/20 text-white"
                  />
                </div>

                <div className="col-span-3">
                  <Label htmlFor={`task-${index}-goal`} className="text-white">
                    Goal
                  </Label>
                  <Input
                    id={`task-${index}-goal`}
                    type="number"
                    value={task.goal}
                    onChange={(e) => updateTask(index, "goal", Number.parseInt(e.target.value))}
                    className="bg-[#041420] border-[#05b9ca]/20 text-white"
                  />
                </div>

                <div className="col-span-3">
                  <Label htmlFor={`task-${index}-unit`} className="text-white">
                    Unit (e.g., km)
                  </Label>
                  <Input
                    id={`task-${index}-unit`}
                    value={task.unit}
                    onChange={(e) => updateTask(index, "unit", e.target.value)}
                    className="bg-[#041420] border-[#05b9ca]/20 text-white"
                  />
                </div>

                <div className="col-span-2 flex justify-end">
                  <Button
                    onClick={() => removeTask(index)}
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 text-red-500 hover:text-red-600 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={handleSave} className="bg-[#05b9ca] hover:bg-[#05b9ca]/80 text-white" disabled={loading}>
            <Save className="h-4 w-4 mr-2" />
            {loading ? "Saving..." : "Save Custom Quests"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

