"use client"

import Link from "next/link"
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
    const [particles, setParticles] = useState<number[]>([])

    useEffect(() => {
        // Generate 30 particles
        setParticles(Array.from({ length: 30 }, (_, i) => i))
    }, [])

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-[#000913] overflow-hidden">
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
                {/* Holographic container with enhanced glow */}
                <div className="relative rounded-lg border border-primary/30 bg-black/40 backdrop-blur-sm overflow-hidden border-glow">
                    {/* Pulsing glow effect */}
                    <motion.div
                        className="absolute inset-0 bg-primary/5 rounded-lg"
                        animate={{ boxShadow: ["0 0 10px rgba(34,211,238,0.2) inset", "0 0 30px rgba(34,211,238,0.4) inset", "0 0 10px rgba(34,211,238,0.2) inset"] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />

                    {/* Glowing border effect */}
                    <div className="absolute inset-0 rounded-lg border border-primary/20">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10" />
                    </div>

                    {/* Content container */}
                    <div className="relative p-8">
                        {/* Header */}
                        <div className="flex items-center gap-4 mb-12">
                            <div className="flex h-10 w-10 items-center justify-center rounded-md border border-primary/50 bg-primary/10">
                                <AlertCircle className="h-6 w-6 text-primary" />
                            </div>
                            <h2 className="text-2xl font-bold tracking-[0.2em] text-primary animate-pulse text-glow">NOTIFICATION</h2>
                        </div>

                        {/* Message */}
                        <div className="space-y-8 text-center px-4">
                            <p className="text-xl text-primary-foreground/90 tracking-wide leading-relaxed">
                                You have acquired the qualifications
                                <br />
                                to be a{" "}
                                <span className="font-bold text-primary relative inline-block text-glow">
                                    Player
                                    <span className="absolute inset-0 blur-sm bg-primary/30 animate-pulse" />
                                </span>
                                .<span className="block mt-2">Will you accept?</span>
                            </p>

                            {/* Connect Button - Fixed Link */}
                            <div className="mt-8 inline-block">
                                <Link href="/api/auth/signin" className="group relative block">
                                    <motion.div
                                        initial={{ opacity: 0.5 }}
                                        animate={{ opacity: [0.5, 0.8, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="absolute -inset-1 rounded bg-gradient-to-r from-primary/80 via-primary to-primary/80 blur-md"
                                    />
                                    <div className="relative rounded bg-black/80 px-12 py-4 text-lg font-semibold text-primary transition-colors group-hover:text-primary-foreground border border-primary/50">
                                        CONNECT
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </main>
    )
}