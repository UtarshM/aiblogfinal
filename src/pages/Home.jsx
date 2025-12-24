/**
 * Home Dashboard - MacBook Style UI/UX
 * Primary Color: #52b2bf
 * Beautiful cards with hover animations
 * 
 * @author Scalezix Venture PVT LTD
 * @copyright 2025 Scalezix Venture PVT LTD. All Rights Reserved.
 */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    FileText, BarChart3, Search, TrendingUp, UserPlus, Share2,
    ArrowRight, Sparkles, Zap, Target, Rocket
} from 'lucide-react'

const tools = [
    {
        name: 'Content Creation & Publishing',
        path: '/tools/content-creation',
        icon: FileText,
        description: 'Create, edit, and publish content with AI assistance',
        gradient: 'from-primary-400 to-primary-600',
        shadowColor: 'shadow-primary-400/20',
        bgLight: 'bg-primary-50',
    },
    {
        name: 'Automated Client Reporting',
        path: '/tools/client-reporting',
        icon: BarChart3,
        description: 'Generate visual reports and analytics dashboards',
        gradient: 'from-violet-500 to-purple-600',
        shadowColor: 'shadow-violet-400/20',
        bgLight: 'bg-violet-50',
    },
    {
        name: 'SEO Automation & Optimization',
        path: '/tools/seo-automation',
        icon: Search,
        description: 'Optimize content and discover keywords automatically',
        gradient: 'from-emerald-500 to-teal-600',
        shadowColor: 'shadow-emerald-400/20',
        bgLight: 'bg-emerald-50',
    },
    {
        name: 'Campaign Performance',
        path: '/tools/campaign-optimization',
        icon: TrendingUp,
        description: 'Analyze and optimize marketing campaigns in real-time',
        gradient: 'from-orange-500 to-amber-600',
        shadowColor: 'shadow-orange-400/20',
        bgLight: 'bg-orange-50',
    },
    {
        name: 'Client Onboarding',
        path: '/tools/client-onboarding',
        icon: UserPlus,
        description: 'Streamline client onboarding with guided workflows',
        gradient: 'from-pink-500 to-rose-600',
        shadowColor: 'shadow-pink-400/20',
        bgLight: 'bg-pink-50',
    },
    {
        name: 'Social Media Management',
        path: '/tools/social-media',
        icon: Share2,
        description: 'Schedule and manage social media posts across platforms',
        gradient: 'from-blue-500 to-indigo-600',
        shadowColor: 'shadow-blue-400/20',
        bgLight: 'bg-blue-50',
    },
]

const stats = [
    { label: 'AI Models', value: '7+', icon: Zap },
    { label: 'Content Types', value: '15+', icon: FileText },
    { label: 'Platforms', value: '10+', icon: Target },
    { label: 'Automation', value: '100%', icon: Rocket },
]

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
}

const cardHoverVariants = {
    rest: { scale: 1, y: 0 },
    hover: {
        scale: 1.02,
        y: -8,
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
    }
}

export default function Home() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12 md:mb-16"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full mb-6"
                >
                    <Sparkles className="w-4 h-4 text-primary-500" />
                    <span className="text-sm font-medium text-primary-600">Powered by Advanced AI</span>
                </motion.div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                    <span className="text-gradient">Scalezix</span> AI Marketing
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Six powerful AI-driven tools to automate and optimize your marketing operations.
                    Create content, analyze data, and grow your business effortlessly.
                </p>
            </motion.div>

            {/* Stats Section */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
            >
                {stats.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                        <motion.div
                            key={stat.label}
                            variants={itemVariants}
                            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-100 shadow-soft"
                        >
                            <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-400/30">
                                <Icon className="w-6 h-6 text-white" />
                            </div>
                            <p className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</p>
                            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                        </motion.div>
                    )
                })}
            </motion.div>

            {/* Tools Grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {tools.map((tool, index) => {
                    const Icon = tool.icon
                    return (
                        <motion.div
                            key={tool.path}
                            variants={itemVariants}
                            initial="rest"
                            whileHover="hover"
                        >
                            <Link to={tool.path}>
                                <motion.div
                                    variants={cardHoverVariants}
                                    className={`bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 shadow-soft group cursor-pointer h-full`}
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <motion.div
                                            className={`p-3 ${tool.bgLight} rounded-xl`}
                                            whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
                                        >
                                            <Icon className={`w-6 h-6 bg-gradient-to-br ${tool.gradient} bg-clip-text`} style={{ color: 'transparent', backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }} />
                                            <Icon className={`w-6 h-6 text-primary-500`} />
                                        </motion.div>
                                        <motion.div
                                            initial={{ x: 0, opacity: 0.5 }}
                                            whileHover={{ x: 5, opacity: 1 }}
                                            className="p-2 rounded-lg bg-gray-50 group-hover:bg-primary-50 transition-colors"
                                        >
                                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors" />
                                        </motion.div>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                                        {tool.name}
                                    </h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        {tool.description}
                                    </p>

                                    {/* Hover gradient line */}
                                    <div className="mt-4 h-1 rounded-full bg-gray-100 overflow-hidden">
                                        <motion.div
                                            initial={{ width: '0%' }}
                                            whileHover={{ width: '100%' }}
                                            transition={{ duration: 0.3 }}
                                            className={`h-full bg-gradient-to-r ${tool.gradient}`}
                                        />
                                    </div>
                                </motion.div>
                            </Link>
                        </motion.div>
                    )
                })}
            </motion.div>

            {/* CTA Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="mt-16 text-center"
            >
                <div className="bg-gradient-to-r from-primary-400 to-primary-600 rounded-3xl p-8 md:p-12 shadow-2xl shadow-primary-400/30">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Ready to supercharge your marketing?
                    </h2>
                    <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
                        Start creating AI-powered content, automate your workflows, and scale your business today.
                    </p>
                    <Link to="/tools/content-creation">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-shadow inline-flex items-center gap-2"
                        >
                            <Sparkles className="w-5 h-5" />
                            Start Creating
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>
                    </Link>
                </div>
            </motion.div>
        </div>
    )
}

/* Copyright © 2025 Scalezix Venture PVT LTD - All Rights Reserved */
