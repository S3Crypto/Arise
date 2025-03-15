"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { AlertCircle } from "lucide-react"

// Client component for animations
export default function HomeContent() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-[#000913] overflow-hidden">
            {/* Animated background with scan lines */}
            <div
                className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,20,40,.5)_50%)] bg-[length:100%_4px] pointer-events-none animate-scan"
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-full max-w-2xl mx-auto px-4"
            >
                {/* Holographic container */}
                <div className="relative rounded-lg border border-cyan-500/30 bg-black/40 backdrop-blur-sm overflow-hidden">
                    {/* Glowing border effect */}
                    <div className="absolute inset-0 rounded-lg border border-cyan-400/20">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-cyan-500/5 to-cyan-500/10" />
                    </div>

                    {/* Content container */}
                    <div className="relative p-8">
                        {/* Header */}
                        <div className="flex items-center gap-4 mb-12">
                            <div className="flex h-10 w-10 items-center justify-center rounded-md border border-cyan-500/50 bg-cyan-500/10">
                                <AlertCircle className="h-6 w-6 text-cyan-400" />
                            </div>
                            <h2 className="text-2xl font-bold tracking-[0.2em] text-cyan-400 animate-pulse">NOTIFICATION</h2>
                        </div>

                        {/* Message */}
                        <div className="space-y-8 text-center px-4">
                            <p className="text-xl text-cyan-100/90 tracking-wide leading-relaxed">
                                You have acquired the qualifications
                                <br />
                                to be a{" "}
                                <span className="font-bold text-cyan-400 relative inline-block">
                                    Player
                                    <span className="absolute inset-0 blur-sm bg-cyan-400/30 animate-pulse" />
                                </span>
                                .<span className="block mt-2">Will you accept?</span>
                            </p>

                            {/* Connect Button */}
                            <Link href="/api/auth/signin" className="group relative inline-block mt-8">
                                <motion.div
                                    initial={{ opacity: 0.5 }}
                                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                                    className="absolute -inset-1 rounded bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-600 blur-md"
                                />
                                <div className="relative rounded bg-black/80 px-12 py-4 text-lg font-semibold text-cyan-400 transition-colors group-hover:text-cyan-300 border border-cyan-500/50">
                                    CONNECT
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </main>
    )
}