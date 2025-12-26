/**
 * AI Marketing Platform - Plan Context with Token Management
 * 
 * @author Scalezix Venture PVT LTD
 * @copyright 2025 Scalezix Venture PVT LTD. All Rights Reserved.
 */

import { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../api/client'

const PlanContext = createContext()

export const PLANS = {
    FREE: 'free',
    BASIC: 'basic',
    ADVANCED: 'advanced',
    PREMIUM: 'premium'
}

// Plan features and token limits
export const PLAN_DETAILS = {
    [PLANS.FREE]: {
        name: 'Free',
        monthlyTokens: 10000,
        maxBlogPosts: 3,
        maxSocialPosts: 10,
        maxSeoAnalyses: 5,
        price: 0,
        features: ['content-creation', 'seo-automation'],
        description: 'Perfect for trying out the platform'
    },
    [PLANS.BASIC]: {
        name: 'Basic',
        monthlyTokens: 50000,
        maxBlogPosts: 15,
        maxSocialPosts: 50,
        maxSeoAnalyses: 20,
        price: 29,
        features: ['content-creation', 'seo-automation'],
        description: 'Great for individual creators'
    },
    [PLANS.ADVANCED]: {
        name: 'Advanced',
        monthlyTokens: 200000,
        maxBlogPosts: 60,
        maxSocialPosts: 200,
        maxSeoAnalyses: 100,
        price: 79,
        features: ['content-creation', 'seo-automation', 'client-reporting', 'campaign-optimization', 'client-onboarding', 'social-media'],
        description: 'For growing businesses'
    },
    [PLANS.PREMIUM]: {
        name: 'Premium',
        monthlyTokens: 1000000,
        maxBlogPosts: -1, // Unlimited
        maxSocialPosts: -1,
        maxSeoAnalyses: -1,
        price: 199,
        features: ['content-creation', 'seo-automation', 'client-reporting', 'campaign-optimization', 'client-onboarding', 'social-media'],
        description: 'For agencies and enterprises'
    }
}

// Token costs per operation
export const TOKEN_COSTS = {
    blogPost: 3500,
    socialPost: 200,
    seoAnalysis: 500,
    imageSearch: 50,
    contentHumanize: 1000,
    chatMessage: 100
}

export function PlanProvider({ children }) {
    // Load plan from localStorage or default to FREE
    const [currentPlan, setCurrentPlan] = useState(() => {
        const savedPlan = localStorage.getItem('userPlan')
        return savedPlan || PLANS.FREE
    })

    // Token balance state
    const [tokenBalance, setTokenBalance] = useState({
        current: PLAN_DETAILS[PLANS.FREE].monthlyTokens,
        used: 0,
        total: PLAN_DETAILS[PLANS.FREE].monthlyTokens,
        percentage: 0
    })

    const [usageStats, setUsageStats] = useState(null)
    const [loading, setLoading] = useState(false)

    // Fetch usage stats on mount and when plan changes
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            fetchUsageStats()
        }
    }, [currentPlan])

    const fetchUsageStats = async () => {
        try {
            setLoading(true)
            const stats = await api.getUsageBalance()
            setUsageStats(stats)
            setTokenBalance(stats.balance)
            if (stats.plan?.name) {
                setCurrentPlan(stats.plan.name)
                localStorage.setItem('userPlan', stats.plan.name)
            }
        } catch (error) {
            console.error('Failed to fetch usage stats:', error)
        } finally {
            setLoading(false)
        }
    }

    const hasAccess = (feature) => {
        const planDetails = PLAN_DETAILS[currentPlan]
        return planDetails?.features?.includes(feature) || false
    }

    const getRequiredPlan = (feature) => {
        if (PLAN_DETAILS[PLANS.FREE].features.includes(feature)) return PLANS.FREE
        if (PLAN_DETAILS[PLANS.BASIC].features.includes(feature)) return PLANS.BASIC
        if (PLAN_DETAILS[PLANS.ADVANCED].features.includes(feature)) return PLANS.ADVANCED
        if (PLAN_DETAILS[PLANS.PREMIUM].features.includes(feature)) return PLANS.PREMIUM
        return PLANS.PREMIUM
    }

    const upgradePlan = (newPlan) => {
        const planName = newPlan.toLowerCase()
        setCurrentPlan(planName)
        localStorage.setItem('userPlan', planName)
        console.log(`Plan upgraded to: ${planName}`)
        // Refresh usage stats after plan change
        fetchUsageStats()
    }

    const getPlanDisplayName = () => {
        return PLAN_DETAILS[currentPlan]?.name || 'Free'
    }

    const getPlanDetails = () => {
        return PLAN_DETAILS[currentPlan] || PLAN_DETAILS[PLANS.FREE]
    }

    const canAffordOperation = (operation) => {
        const cost = TOKEN_COSTS[operation] || 0
        return tokenBalance.current >= cost
    }

    const getOperationCost = (operation) => {
        return TOKEN_COSTS[operation] || 0
    }

    const refreshBalance = () => {
        fetchUsageStats()
    }

    return (
        <PlanContext.Provider value={{
            currentPlan,
            setCurrentPlan,
            hasAccess,
            getRequiredPlan,
            upgradePlan,
            getPlanDisplayName,
            getPlanDetails,
            tokenBalance,
            usageStats,
            loading,
            canAffordOperation,
            getOperationCost,
            refreshBalance,
            TOKEN_COSTS,
            PLAN_DETAILS
        }}>
            {children}
        </PlanContext.Provider>
    )
}

export function usePlan() {
    const context = useContext(PlanContext)
    if (!context) {
        throw new Error('usePlan must be used within PlanProvider')
    }
    return context
}

/* Copyright © 2025 Scalezix Venture PVT LTD - All Rights Reserved */
