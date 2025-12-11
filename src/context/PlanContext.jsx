/**
 * AI Marketing Platform - Plan Context
 * 
 * @author Harsh J Kuhikar
 * @copyright 2025 Harsh J Kuhikar. All Rights Reserved.
 */

import { createContext, useContext, useState } from 'react'

const PlanContext = createContext()

export const PLANS = {
    BASIC: 'basic',
    ADVANCED: 'advanced',
    PREMIUM: 'premium'
}

export const PLAN_FEATURES = {
    [PLANS.BASIC]: [
        'content-creation',
        'seo-automation'
    ],
    [PLANS.ADVANCED]: [
        'content-creation',
        'seo-automation',
        'client-reporting',
        'campaign-optimization',
        'client-onboarding',
        'social-media'
    ],
    [PLANS.PREMIUM]: [
        'content-creation',
        'seo-automation',
        'client-reporting',
        'campaign-optimization',
        'client-onboarding',
        'social-media'
    ]
}

export function PlanProvider({ children }) {
    // Load plan from localStorage or default to BASIC
    const [currentPlan, setCurrentPlan] = useState(() => {
        const savedPlan = localStorage.getItem('userPlan')
        return savedPlan || PLANS.BASIC
    })

    const hasAccess = (feature) => {
        return PLAN_FEATURES[currentPlan]?.includes(feature) || false
    }

    const getRequiredPlan = (feature) => {
        if (PLAN_FEATURES[PLANS.BASIC].includes(feature)) return PLANS.BASIC
        if (PLAN_FEATURES[PLANS.ADVANCED].includes(feature)) return PLANS.ADVANCED
        if (PLAN_FEATURES[PLANS.PREMIUM].includes(feature)) return PLANS.PREMIUM
        return PLANS.PREMIUM
    }

    const upgradePlan = (newPlan) => {
        const planName = newPlan.toLowerCase()
        setCurrentPlan(planName)
        // Save to localStorage
        localStorage.setItem('userPlan', planName)
        console.log(`Plan upgraded to: ${planName}`)
    }

    const getPlanDisplayName = () => {
        return currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)
    }

    return (
        <PlanContext.Provider value={{
            currentPlan,
            setCurrentPlan,
            hasAccess,
            getRequiredPlan,
            upgradePlan,
            getPlanDisplayName
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

/* Copyright © 2025 Harsh J Kuhikar - All Rights Reserved */
