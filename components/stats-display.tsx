"use client"

import { Dumbbell, Heart, Zap, Brain, Ear } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"

type UserStats = {
  hp: number
  mp: number
  fatigue: number
  str: number
  vit: number
  agi: number
  int: number
  per: number
  level: number
  exp: number
  expToNextLevel: number
  abilityPoints: number
}

export function StatsDisplay({ stats }: { stats: UserStats }) {
  const statsWithIcons = [
    { name: "STR", value: stats.str, icon: <Dumbbell className="w-6 h-6 text-cyan-400" /> },
    { name: "VIT", value: stats.vit, icon: <Heart className="w-6 h-6 text-cyan-400" /> },
    { name: "AGI", value: stats.agi, icon: <Zap className="w-6 h-6 text-cyan-400" /> },
    { name: "INT", value: stats.int, icon: <Brain className="w-6 h-6 text-cyan-400" /> },
    { name: "PER", value: stats.per, icon: <Ear className="w-6 h-6 text-cyan-400" /> },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-b from-[#0a2434] to-[#051926] rounded-lg border-2 border-[#05b9ca]/30 p-6 mb-8"
    >
      {/* HP, MP, Fatigue bar */}
      <div className="bg-[#041420] rounded-lg p-4 mb-6 border border-[#05b9ca]/20">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <div className="text-cyan-400 font-bold text-lg mr-2">HP</div>
            <Progress value={(stats.hp / 100) * 100} className="h-2 w-32 md:w-48 bg-gray-800" />
          </div>
          <div className="text-white">{stats.hp}/100</div>
        </div>

        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <div className="text-cyan-400 font-bold text-lg mr-2">MP</div>
            <Progress value={(stats.mp / 10) * 100} className="h-2 w-32 md:w-48 bg-gray-800" />
          </div>
          <div className="text-white">{stats.mp}/10</div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-cyan-400 font-bold text-lg">FATIGUE:</div>
          <div className="text-white text-xl">{stats.fatigue}</div>
        </div>
      </div>

      {/* Stats display */}
      <div className="bg-[#041420] rounded-lg p-4 border border-[#05b9ca]/20 grid grid-cols-2 gap-6">
        {statsWithIcons.map((stat) => (
          <div key={stat.name} className="flex items-center">
            <div className="mr-3">{stat.icon}</div>
            <div>
              <div className="text-cyan-400 font-bold">{stat.name}:</div>
              <div className="text-white text-3xl font-bold">{stat.value}</div>
            </div>
          </div>
        ))}

        <div className="col-span-2 flex justify-end items-center mt-2">
          <div className="text-right">
            <div className="text-sm text-cyan-400">Available Ability Points:</div>
            <div className="text-white text-3xl font-bold">{stats.abilityPoints}</div>
          </div>
        </div>
      </div>

      {/* Level and EXP */}
      <div className="mt-4 flex justify-between items-center">
        <div className="text-white">
          <span className="text-cyan-400 font-bold">LEVEL:</span> {stats.level}
        </div>
        <div className="flex items-center">
          <span className="text-cyan-400 font-bold mr-2">EXP:</span>
          <Progress value={(stats.exp / stats.expToNextLevel) * 100} className="h-2 w-32 md:w-48 bg-gray-800" />
          <span className="text-white ml-2 text-sm">
            {stats.exp}/{stats.expToNextLevel}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

