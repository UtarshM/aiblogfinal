/**
 * Skeleton Loader Components - Professional Loading States
 * Human-crafted design with smooth animations
 * 
 * @author Scalezix Venture PVT LTD
 * @copyright 2025 All Rights Reserved
 */

import { motion } from 'framer-motion'

// Base skeleton with shimmer effect
export function Skeleton({ className = '', animate = true }) {
    return (
        <div
            className={`bg-gray-200 rounded ${animate ? 'animate-pulse' : ''} ${className}`}
            style={{
                background: animate
                    ? 'linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%)'
                    : '#f0f0f0',
                backgroundSize: '200% 100%',
                animation: animate ? 'shimmer 1.5s ease-in-out infinite' : 'none'
            }}
        />
    )
}

// Text skeleton
export function SkeletonText({ lines = 3, className = '' }) {
    return (
        <div className={`space-y-3 ${className}`}>
            {Array.from({ length: lines }).map((_, i) => (
                <Skeleton
                    key={i}
                    className={`h-4 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`}
                />
            ))}
        </div>
    )
}

// Avatar skeleton
export function SkeletonAvatar({ size = 'md' }) {
    const sizes = {
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16'
    }
    return <Skeleton className={`${sizes[size]} rounded-full`} />
}

// Card skeleton
export function SkeletonCard({ className = '' }) {
    return (
        <div className={`bg-white rounded-2xl border border-gray-100 p-6 ${className}`}>
            <div className="flex items-center gap-4 mb-4">
                <SkeletonAvatar />
                <div className="flex-1">
                    <Skeleton className="h-4 w-1/3 mb-2" />
                    <Skeleton className="h-3 w-1/2" />
                </div>
            </div>
            <SkeletonText lines={3} />
        </div>
    )
}

// Stats card skeleton
export function SkeletonStatsCard() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <Skeleton className="h-10 w-20 mb-2" />
                    <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="w-12 h-12 rounded-xl" />
            </div>
        </div>
    )
}

// Sidebar skeleton
export function SkeletonSidebar() {
    return (
        <div className="w-64 h-screen bg-white border-r border-gray-100 p-4">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8 px-2">
                <Skeleton className="w-10 h-10 rounded-xl" />
                <Skeleton className="h-6 w-24" />
            </div>

            {/* Nav items */}
            <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3 px-3 py-3">
                        <Skeleton className="w-9 h-9 rounded-lg" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                ))}
            </div>
        </div>
    )
}

// Table skeleton
export function SkeletonTable({ rows = 5, cols = 4 }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gray-50 px-6 py-4 flex gap-4">
                {Array.from({ length: cols }).map((_, i) => (
                    <Skeleton key={i} className="h-4 flex-1" />
                ))}
            </div>

            {/* Rows */}
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <div key={rowIndex} className="px-6 py-4 border-t border-gray-100 flex gap-4">
                    {Array.from({ length: cols }).map((_, colIndex) => (
                        <Skeleton key={colIndex} className="h-4 flex-1" />
                    ))}
                </div>
            ))}
        </div>
    )
}


// Dashboard skeleton - Full page loading state
export function DashboardSkeleton() {
    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Token Banner */}
            <Skeleton className="h-32 w-full rounded-2xl" />

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <SkeletonStatsCard />
                <SkeletonStatsCard />
                <SkeletonStatsCard />
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    <SkeletonCard className="h-64" />
                    <SkeletonCard className="h-48" />
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    <SkeletonCard className="h-72" />
                    <SkeletonCard className="h-48" />
                </div>
            </div>
        </div>
    )
}

// Content creation skeleton
export function ContentCreationSkeleton() {
    return (
        <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <Skeleton className="h-8 w-48 mb-2" />
                    <Skeleton className="h-4 w-64" />
                </div>
                <Skeleton className="h-10 w-32 rounded-xl" />
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Skeleton className="h-4 w-20 mb-2" />
                        <Skeleton className="h-12 w-full rounded-xl" />
                    </div>
                    <div>
                        <Skeleton className="h-4 w-20 mb-2" />
                        <Skeleton className="h-12 w-full rounded-xl" />
                    </div>
                </div>

                <div>
                    <Skeleton className="h-4 w-20 mb-2" />
                    <Skeleton className="h-32 w-full rounded-xl" />
                </div>

                <div className="flex justify-end gap-3">
                    <Skeleton className="h-10 w-24 rounded-xl" />
                    <Skeleton className="h-10 w-32 rounded-xl" />
                </div>
            </div>
        </div>
    )
}

// Profile skeleton
export function ProfileSkeleton() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Profile Header */}
            <div className="bg-white rounded-2xl border border-gray-100 p-8">
                <div className="flex items-center gap-6">
                    <Skeleton className="w-24 h-24 rounded-full" />
                    <div className="flex-1">
                        <Skeleton className="h-8 w-48 mb-2" />
                        <Skeleton className="h-4 w-32 mb-4" />
                        <div className="flex gap-3">
                            <Skeleton className="h-8 w-24 rounded-lg" />
                            <Skeleton className="h-8 w-24 rounded-lg" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Form */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i}>
                            <Skeleton className="h-4 w-20 mb-2" />
                            <Skeleton className="h-12 w-full rounded-xl" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

// Job history skeleton
export function JobHistorySkeleton() {
    return (
        <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <Skeleton className="h-8 w-40 mb-2" />
                    <Skeleton className="h-4 w-56" />
                </div>
                <div className="flex gap-3">
                    <Skeleton className="h-10 w-32 rounded-xl" />
                    <Skeleton className="h-10 w-10 rounded-xl" />
                </div>
            </div>

            {/* Table */}
            <SkeletonTable rows={8} cols={5} />
        </div>
    )
}

// Full page loading screen
export function FullPageLoader() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 z-50 flex items-center justify-center"
        >
            <div className="text-center">
                {/* Animated Logo */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary-400 to-primary-500 flex items-center justify-center shadow-lg">
                        <motion.svg
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="w-10 h-10 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </motion.svg>
                    </div>
                </motion.div>

                {/* Brand Name */}
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl font-bold text-gray-900 mb-2"
                >
                    Scalezix
                </motion.h1>

                {/* Loading Text */}
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-500 mb-6"
                >
                    Loading your workspace...
                </motion.p>

                {/* Progress Bar */}
                <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 200, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mx-auto"
                >
                    <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: '100%' }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="h-full w-1/2 bg-gradient-to-r from-primary-400 to-primary-500 rounded-full"
                        />
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default {
    Skeleton,
    SkeletonText,
    SkeletonAvatar,
    SkeletonCard,
    SkeletonStatsCard,
    SkeletonSidebar,
    SkeletonTable,
    DashboardSkeleton,
    ContentCreationSkeleton,
    ProfileSkeleton,
    JobHistorySkeleton,
    FullPageLoader
}
