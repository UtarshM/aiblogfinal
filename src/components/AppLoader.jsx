/**
 * App Loader - Initial Loading Screen
 * Shows a professional loading animation while the app initializes
 * 
 * @author Scalezix Venture PVT LTD
 * @copyright 2025 All Rights Reserved
 */

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AppLoader({ children, minLoadTime = 800 }) {
    const [isLoading, setIsLoading] = useState(true)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        // Simulate loading progress
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval)
                    return 100
                }
                // Faster at start, slower near end
                const increment = prev < 70 ? 15 : prev < 90 ? 5 : 2
                return Math.min(prev + increment, 100)
            })
        }, 100)

        // Minimum load time for smooth UX
        const timer = setTimeout(() => {
            setProgress(100)
            setTimeout(() => setIsLoading(false), 300)
        }, minLoadTime)

        return () => {
            clearInterval(progressInterval)
            clearTimeout(timer)
        }
    }, [minLoadTime])

    return (
        <>
            <AnimatePresence mode="wait">
                {isLoading && (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center"
                    >
                        {/* Background Pattern */}
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary-50 to-transparent rounded-full opacity-50" />
                            <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-secondary-50 to-transparent rounded-full opacity-50" />
                        </div>

                        {/* Content */}
                        <div className="relative z-10 text-center px-4">
                            {/* Animated Logo */}
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                                className="mb-8"
                            >
                                <div className="relative">
                                    {/* Outer Ring */}
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-0 w-24 h-24 mx-auto"
                                    >
                                        <svg className="w-full h-full" viewBox="0 0 100 100">
                                            <circle
                                                cx="50"
                                                cy="50"
                                                r="45"
                                                fill="none"
                                                stroke="url(#gradient)"
                                                strokeWidth="2"
                                                strokeDasharray="20 10"
                                                opacity="0.3"
                                            />
                                            <defs>
                                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                    <stop offset="0%" stopColor="#1E8A9A" />
                                                    <stop offset="100%" stopColor="#8b5cf6" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                    </motion.div>

                                    {/* Logo Icon */}
                                    <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-primary-400 to-primary-500 flex items-center justify-center shadow-xl">
                                        <motion.svg
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                            className="w-12 h-12 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                                            />
                                        </motion.svg>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Brand Name */}
                            <motion.h1
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="text-3xl font-bold text-gray-900 mb-2"
                            >
                                Scalezix
                            </motion.h1>

                            {/* Tagline */}
                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                className="text-gray-500 mb-8"
                            >
                                AI-Powered Content Platform
                            </motion.p>

                            {/* Progress Bar */}
                            <motion.div
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: 240, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.3 }}
                                className="mx-auto"
                            >
                                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 0.3 }}
                                        className="h-full bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-500 rounded-full"
                                    />
                                </div>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="text-xs text-gray-400 mt-3"
                                >
                                    {progress < 30 && 'Initializing...'}
                                    {progress >= 30 && progress < 60 && 'Loading components...'}
                                    {progress >= 60 && progress < 90 && 'Almost ready...'}
                                    {progress >= 90 && 'Welcome!'}
                                </motion.p>
                            </motion.div>
                        </div>

                        {/* Footer */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="absolute bottom-8 text-center"
                        >
                            <p className="text-xs text-gray-400">
                                © 2025 Scalezix Venture PVT LTD
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content - Fades in after loader */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoading ? 0 : 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
            >
                {children}
            </motion.div>
        </>
    )
}
