"use client"

import { redirect } from "next/navigation"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { motion } from "framer-motion"
import { AlertCircle } from "lucide-react"

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect("/dashboard")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#020617] overflow-hidden">
      {/* Background circuit patterns */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <div className="container relative flex flex-col items-center justify-center gap-6 px-4 py-16">
        {/* Notification Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-lg"
        >
          {/* Top Circuit Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute -top-2 left-0 right-0 h-[2px] bg-cyan-500 shadow-[0_0_15px_0_rgba(34,211,238,0.5)] before:absolute before:left-0 before:top-0 before:h-[2px] before:w-20 before:bg-cyan-500 before:blur-sm after:absolute after:right-0 after:top-0 after:h-[2px] after:w-20 after:bg-cyan-500 after:blur-sm"
          />

          {/* Bottom Circuit Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute -bottom-2 left-0 right-0 h-[2px] bg-cyan-500 shadow-[0_0_15px_0_rgba(34,211,238,0.5)] before:absolute before:left-0 before:top-0 before:h-[2px] before:w-20 before:bg-cyan-500 before:blur-sm after:absolute after:right-0 after:top-0 after:h-[2px] after:w-20 after:bg-cyan-500 after:blur-sm"
          />

          <div className="relative rounded-lg border border-cyan-500/20 bg-black/40 p-8 shadow-[0_0_25px_0_rgba(34,211,238,0.1)] backdrop-blur-xl">
            {/* Header */}
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-500/50 text-cyan-400">
                <AlertCircle className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold tracking-wider text-cyan-500">NOTIFICATION</h2>
            </div>

            {/* Content */}
            <div className="space-y-6 text-center">
              <p className="text-lg text-cyan-100">
                You have acquired the qualifications to be a <span className="font-bold text-cyan-400">Player</span>.{" "}
                <span className="block mt-2">Will you accept?</span>
              </p>

              {/* Connect Button */}
              <Link href="/api/auth/signin" className="group relative block">
                <div className="absolute -inset-0.5 rounded bg-gradient-to-r from-cyan-500 to-blue-500 opacity-70 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200" />
                <div className="relative flex items-center justify-center rounded-sm bg-black px-12 py-3 text-lg font-semibold text-cyan-400 transition duration-200 hover:text-cyan-300">
                  <span className="relative z-20">CONNECT</span>
                  <div className="absolute inset-0 z-10 rounded-sm bg-black/50 backdrop-blur" />
                </div>
              </Link>
            </div>
          </div>
        </motion.div>
      <div className="container flex flex-col items-center justify-center gap-6 px-4 py-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          <span className="text-cyan-400">Daily</span> Quest System
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl">
          Level up your life with daily quests inspired by Solo Leveling. Complete tasks, gain stats, and become the
          strongest hunter.
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Link href="/api/auth/signin">
            <Button className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-6 text-lg">Sign In with Google</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}

