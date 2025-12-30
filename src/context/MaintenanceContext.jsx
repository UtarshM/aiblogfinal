/**
 * Maintenance Context - Checks and manages maintenance mode status
 * 
 * @author Scalezix Venture PVT LTD
 * @copyright 2025 All Rights Reserved
 */

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const API_BASE = import.meta.env.VITE_API_URL ||
    (import.meta.env.PROD ? 'https://blogapi.scalezix.com/api' : 'http://localhost:3001/api');

const MaintenanceContext = createContext();

// Cache key for maintenance status
const MAINTENANCE_CACHE_KEY = 'maintenanceStatus';
const MAINTENANCE_CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function MaintenanceProvider({ children }) {
    const [isMaintenanceMode, setIsMaintenanceMode] = useState(() => {
        // Check cached status on initial load
        try {
            const cached = localStorage.getItem(MAINTENANCE_CACHE_KEY);
            if (cached) {
                const { status, timestamp } = JSON.parse(cached);
                // Use cached value if less than 5 minutes old
                if (Date.now() - timestamp < MAINTENANCE_CACHE_DURATION) {
                    return status;
                }
            }
        } catch (e) {
            // Ignore cache errors
        }
        return false;
    });
    const [maintenanceMessage, setMaintenanceMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [lastChecked, setLastChecked] = useState(null);
    const [retryCount, setRetryCount] = useState(0);

    // Check maintenance status with retry
    const checkMaintenanceStatus = useCallback(async (retry = 0) => {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

            const response = await fetch(`${API_BASE}/maintenance/status`, {
                signal: controller.signal,
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                credentials: 'omit' // Don't send credentials for this public endpoint
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error('Failed to fetch maintenance status');
            }

            const data = await response.json();

            const maintenanceStatus = data.maintenanceMode || false;
            setIsMaintenanceMode(maintenanceStatus);
            setMaintenanceMessage(data.maintenanceMessage || '');
            setLastChecked(new Date());
            setRetryCount(0);

            // Cache the status
            try {
                localStorage.setItem(MAINTENANCE_CACHE_KEY, JSON.stringify({
                    status: maintenanceStatus,
                    message: data.maintenanceMessage || '',
                    timestamp: Date.now()
                }));
            } catch (e) {
                // Ignore cache errors
            }

            return maintenanceStatus;
        } catch (error) {
            console.log('Maintenance check failed:', error.message);

            // Retry up to 2 times with exponential backoff
            if (retry < 2) {
                const delay = Math.pow(2, retry) * 1000; // 1s, 2s
                setTimeout(() => {
                    checkMaintenanceStatus(retry + 1);
                }, delay);
                return isMaintenanceMode; // Return current state while retrying
            }

            // After retries fail, check cached status
            try {
                const cached = localStorage.getItem(MAINTENANCE_CACHE_KEY);
                if (cached) {
                    const { status, message } = JSON.parse(cached);
                    setIsMaintenanceMode(status);
                    setMaintenanceMessage(message || '');
                    return status;
                }
            } catch (e) {
                // Ignore cache errors
            }

            // Only if no cache, default to false
            setIsMaintenanceMode(false);
            return false;
        } finally {
            setLoading(false);
        }
    }, [isMaintenanceMode]);

    // Check on mount
    useEffect(() => {
        checkMaintenanceStatus();
    }, []);

    // Periodically check maintenance status (every 30 seconds)
    useEffect(() => {
        const interval = setInterval(() => {
            checkMaintenanceStatus();
        }, 30000);

        return () => clearInterval(interval);
    }, [checkMaintenanceStatus]);

    // Check if user should bypass maintenance (SuperAdmin)
    const canBypassMaintenance = useCallback(() => {
        const superAdminToken = localStorage.getItem('superAdminToken');
        return !!superAdminToken;
    }, []);

    const value = {
        isMaintenanceMode,
        maintenanceMessage,
        loading,
        lastChecked,
        checkMaintenanceStatus,
        canBypassMaintenance
    };

    return (
        <MaintenanceContext.Provider value={value}>
            {children}
        </MaintenanceContext.Provider>
    );
}

export function useMaintenance() {
    const context = useContext(MaintenanceContext);
    if (!context) {
        throw new Error('useMaintenance must be used within a MaintenanceProvider');
    }
    return context;
}

export default MaintenanceContext;
