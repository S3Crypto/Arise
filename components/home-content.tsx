"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { AlertCircle } from "lucide-react"

// Particle component
const Particle = ({ index }: { index: number }) => {
    const randomSize = Math.random() * 3 + 1
    const randomDuration = Math.random() * 15 + 10
    const randomDelay = Math.random() * 5

    return (
        <motion.div
            className="absolute bg-primary/30 rounded-full pointer-events-none"
            style={{
                width: `${randomSize}px`,
                height: `${randomSize}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
            }}
            animate={{
                y: [0, -100, -200],
                x: [0, Math.random() * 50 - 25],
                opacity: [0, 0.8, 0]
            }}
            transition={{
                duration: randomDuration,
                repeat: Infinity,
                delay: randomDelay,
                ease: "linear"
            }}
        />
    )
}

// Client component for animations
export default function HomeContent() {
    const router = useRouter()
    const [particles, setParticles] = useState<number[]>([])

    useEffect(() => {
        // Generate 30 particles
        setParticles(Array.from({ length: 30 }, (_, i) => i))
    }, [])

    const handleConnect = () => {
        router.push("/api/auth/signin")
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-[#001524] overflow-hidden">
            {/* Animated background with scan lines */}
            <div
                className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,20,40,.5)_50%)] bg-[length:100%_4px] pointer-events-none animate-scan"
            />

            {/* Particles container */}
            <div className="absolute inset-0 overflow-hidden">
                {particles.map((index) => (
                    <Particle key={index} index={index} />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-full max-w-2xl mx-auto px-4"
            >
                {/* Holographic container with enhanced glow matching screenshot */}
                <div className="relative rounded-lg border border-[#06B6D4]/30 bg-[#00111D]/90 backdrop-blur-sm overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                    {/* Content container */}
                    <div className="relative p-8">
                        {/* Header */}
                        <div className="flex items-center gap-3 mb-12">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#06B6D4]/50 bg-transparent">
                                <AlertCircle className="h-5 w-5 text-[#06B6D4]" />
                            </div>
                            <h2 className="text-xl font-bold tracking-[0.2em] text-[#06B6D4] text-glow">NOTIFICATION</h2>
                        </div>

                        {/* Message */}
                        <div className="space-y-8 text-center px-4">
                            <p className="text-xl text-white/90 tracking-wide leading-relaxed">
                                You have acquired the qualifications
                                <br />
                                to be a{" "}
                                <span className="font-bold text-[#06B6D4] relative inline-block text-glow">
                                    Player
                                </span>
                                <span className="block mt-2">Will you accept?</span>
                            </p>

                            {/* Connect Button - With onClick handler */}
                            <div className="mt-8 flex justify-center">
                                <button
                                    onClick={handleConnect}
                                    className="relative px-12 py-3 text-lg font-semibold text-[#06B6D4] uppercase tracking-wider border border-[#06B6D4]/50 bg-transparent hover:bg-[#06B6D4]/10 transition-colors rounded shadow-[0_0_10px_rgba(6,182,212,0.4)]"
                                >
                                    Connect
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </main>
    )
}