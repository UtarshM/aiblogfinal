/**
 * App Loader - Logo Loading Screen
 * Shows Scalezix logo until content loads
 * 
 * @author Scalezix Venture PVT LTD
 * @copyright 2025 All Rights Reserved
 */

import { useState, useEffect } from 'react'

export default function AppLoader({ children }) {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Wait for page to fully load
        if (document.readyState === 'complete') {
            setIsLoading(false)
        } else {
            window.addEventListener('load', () => setIsLoading(false))
            // Fallback timeout
            const timer = setTimeout(() => setIsLoading(false), 2000)
            return () => {
                window.removeEventListener('load', () => setIsLoading(false))
                clearTimeout(timer)
            }
        }
    }, [])

    if (isLoading) {
        return (
            <div className="fixed inset-0 z-[100] bg-white flex items-center justify-center">
                <div className="text-center">
                    <img
                        src="/scalezix_logo.png"
                        alt="Scalezix"
                        className="w-16 h-16 mx-auto mb-3 animate-pulse"
                    />
                    <p className="text-[#52b2bf] font-medium">Scalezix</p>
                </div>
            </div>
        )
    }

    return children
}
