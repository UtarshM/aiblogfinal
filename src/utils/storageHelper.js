/**
 * Safe localStorage wrapper with error handling
 * Handles Chrome's FILE_ERROR_NO_SPACE and other storage errors
 */

const showStorageError = () => {
    const message = `
⚠️ Browser Storage Full

Your browser's storage is full. Please:
1. Clear browser cache (Settings → Privacy → Clear browsing data)
2. Or free up disk space on your computer

This is a browser limitation, not an app error.
    `.trim();
    
    console.error('Storage Error:', message);
    
    // Show user-friendly alert
    if (typeof window !== 'undefined') {
        alert(message);
    }
};

export const safeLocalStorage = {
    /**
     * Safely get item from localStorage
     */
    getItem: (key) => {
        try {
            return localStorage.getItem(key);
        } catch (error) {
            console.error('localStorage.getItem error:', error);
            return null;
        }
    },

    /**
     * Safely set item in localStorage
     */
    setItem: (key, value) => {
        try {
            localStorage.setItem(key, value);
            return true;
        } catch (error) {
            console.error('localStorage.setItem error:', error);
            
            // Check if it's a quota/space error
            if (error.name === 'QuotaExceededError' || 
                error.message.includes('quota') ||
                error.message.includes('FILE_ERROR_NO_SPACE')) {
                showStorageError();
            }
            
            return false;
        }
    },

    /**
     * Safely remove item from localStorage
     */
    removeItem: (key) => {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('localStorage.removeItem error:', error);
            return false;
        }
    },

    /**
     * Safely clear localStorage
     */
    clear: () => {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('localStorage.clear error:', error);
            return false;
        }
    }
};

export default safeLocalStorage;
