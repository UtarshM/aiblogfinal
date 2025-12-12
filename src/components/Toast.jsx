/**
 * AI Marketing Platform - Toast Notification Component
 * 
 * @author Scalezix Venture PVT LTD
 * @copyright 2025 Scalezix Venture PVT LTD. All Rights Reserved.
 */

import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react'

export default function Toast({ message, type = 'success', onClose }) {
    const config = {
        success: {
            icon: <CheckCircle size={22} />,
            bg: 'bg-gradient-to-r from-green-500 to-green-600',
            text: 'text-white'
        },
        error: {
            icon: <XCircle size={22} />,
            bg: 'bg-gradient-to-r from-red-500 to-red-600',
            text: 'text-white'
        },
        warning: {
            icon: <AlertCircle size={22} />,
            bg: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
            text: 'text-white'
        },
        info: {
            icon: <Info size={22} />,
            bg: 'bg-gradient-to-r from-blue-500 to-blue-600',
            text: 'text-white'
        }
    }

    const { icon, bg, text } = config[type] || config.success

    return (
        <div className="fixed top-6 right-6 z-[9999] animate-slide-in-right">
            <div className={`${bg} ${text} rounded-xl shadow-2xl p-5 min-w-[350px] max-w-md`}>
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-0.5">
                        {icon}
                    </div>
                    <div className="flex-1">
                        <p className="font-semibold leading-relaxed">{message}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="flex-shrink-0 p-1.5 rounded-lg bg-white/20"
                    >
                        <X size={16} />
                    </button>
                </div>
            </div>
        </div>
    )
}

/* Copyright © 2025 Scalezix Venture PVT LTD - All Rights Reserved */
