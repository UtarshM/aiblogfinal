/**
 * AI Marketing Platform - Plan Selector (For Demo/Testing)
 * 
 * @author Scalezix Venture PVT LTD
 * @copyright 2025 Scalezix Venture PVT LTD. All Rights Reserved.
 */

import { usePlan, PLANS } from '../context/PlanContext'
import { Crown } from 'lucide-react'

export default function PlanSelector() {
    const { currentPlan, setCurrentPlan } = usePlan()

    return (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 shadow-lg">
            <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2">
                    <Crown size={20} />
                    <span className="font-semibold">Current Plan:</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold uppercase">
                        {currentPlan}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-sm opacity-90">Demo Mode - Switch Plan:</span>
                    <div className="flex gap-2">
                        {Object.values(PLANS).map((plan) => (
                            <button
                                key={plan}
                                onClick={() => setCurrentPlan(plan)}
                                className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${currentPlan === plan
                                    ? 'bg-white text-blue-600 shadow-lg'
                                    : 'bg-white/10 hover:bg-white/20'
                                    }`}
                            >
                                {plan.charAt(0).toUpperCase() + plan.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

/* Copyright © 2025 Scalezix Venture PVT LTD - All Rights Reserved */
