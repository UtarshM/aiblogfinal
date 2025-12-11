/**
 * OAuth Callback Handler
 * Handles OAuth redirects and closes popup window
 * @author Harsh J Kuhikar
 * @copyright 2025 Harsh J Kuhikar. All Rights Reserved.
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

export default function OAuthCallback() {
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const success = params.get('success');
        const error = params.get('error');

        if (success) {
            // Notify parent window of success
            if (window.opener) {
                window.opener.postMessage({ type: 'oauth-success', platform: success }, '*');
            }

            // Close popup after 2 seconds
            setTimeout(() => {
                window.close();
            }, 2000);
        } else if (error) {
            // Notify parent window of error
            if (window.opener) {
                window.opener.postMessage({ type: 'oauth-error', error }, '*');
            }

            // Close popup after 3 seconds
            setTimeout(() => {
                window.close();
            }, 3000);
        }
    }, [location]);

    const params = new URLSearchParams(location.search);
    const success = params.get('success');
    const error = params.get('error');

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
                {success ? (
                    <>
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle size={32} className="text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Connected Successfully!
                        </h2>
                        <p className="text-gray-600 mb-4">
                            Your {success.replace('_connected', '')} account has been connected.
                        </p>
                        <p className="text-sm text-gray-500">
                            This window will close automatically...
                        </p>
                    </>
                ) : error ? (
                    <>
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <XCircle size={32} className="text-red-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Connection Failed
                        </h2>
                        <p className="text-gray-600 mb-4">
                            {error.replace(/_/g, ' ')}
                        </p>
                        <p className="text-sm text-gray-500">
                            This window will close automatically...
                        </p>
                    </>
                ) : (
                    <>
                        <Loader2 size={48} className="animate-spin text-blue-600 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Processing...
                        </h2>
                        <p className="text-gray-600">
                            Please wait while we complete the connection.
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
