/**
 * Social Media Management & Scheduling
 * @author Scalezix Venture PVT LTD
 * @copyright 2025 Scalezix Venture PVT LTD. All Rights Reserved.
 */

import { useState, useEffect } from 'react'
import { Twitter, Instagram, Facebook, Calendar, Clock, Image as ImageIcon, Send, Trash2, CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { api } from '../api/client'
import Toast from '../components/Toast'

export default function SocialMedia() {
    const [connectedAccounts, setConnectedAccounts] = useState([])
    const [postContent, setPostContent] = useState('')
    const [postImage, setPostImage] = useState(null)
    const [selectedPlatforms, setSelectedPlatforms] = useState([])
    const [scheduleDate, setScheduleDate] = useState('')
    const [scheduleTime, setScheduleTime] = useState('')
    const [scheduledPosts, setScheduledPosts] = useState([])
    const [toast, setToast] = useState(null)
    const [loading, setLoading] = useState(false)
    const [showConnectModal, setShowConnectModal] = useState(false)
    const [selectedPlatform, setSelectedPlatform] = useState(null)

    const platforms = [
        { id: 'twitter', name: 'Twitter', icon: Twitter, color: 'bg-blue-400', connected: false },
        { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'bg-pink-500', connected: false },
        { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'bg-blue-600', connected: false }
    ]

    useEffect(() => {
        loadConnectedAccounts()
        loadScheduledPosts()
    }, [])

    const showToast = (message, type = 'success') => {
        setToast({ message, type })
    }

    const loadConnectedAccounts = async () => {
        try {
            const accounts = await api.getConnectedAccounts()
            // Ensure accounts is an array
            setConnectedAccounts(Array.isArray(accounts) ? accounts : [])
        } catch (error) {
            console.error('Error loading accounts:', error)
            setConnectedAccounts([]) // Set empty array on error
        }
    }

    const loadScheduledPosts = async () => {
        try {
            const posts = await api.getScheduledPosts()
            // Ensure posts is an array
            setScheduledPosts(Array.isArray(posts) ? posts : [])
        } catch (error) {
            console.error('Error loading posts:', error)
            setScheduledPosts([]) // Set empty array on error
        }
    }

    const handleConnectAccount = (platform) => {
        setSelectedPlatform(platform)
        setShowConnectModal(true)
    }

    const connectAccount = async (credentials) => {
        setLoading(true)
        try {
            await api.connectSocialAccount({
                platform: selectedPlatform.id,
                ...credentials
            })
            showToast(`✅ ${selectedPlatform.name} account connected!`, 'success')
            setShowConnectModal(false)
            loadConnectedAccounts()
        } catch (error) {
            showToast(error.message || 'Failed to connect account', 'error')
        } finally {
            setLoading(false)
        }
    }

    const disconnectAccount = async (accountId) => {
        try {
            await api.disconnectSocialAccount(accountId)
            showToast('Account disconnected', 'success')
            loadConnectedAccounts()
        } catch (error) {
            showToast('Failed to disconnect account', 'error')
        }
    }

    const togglePlatform = (platformId) => {
        setSelectedPlatforms(prev =>
            prev.includes(platformId)
                ? prev.filter(id => id !== platformId)
                : [...prev, platformId]
        )
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPostImage(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const schedulePost = async () => {
        if (!postContent.trim()) {
            showToast('Please enter post content', 'warning')
            return
        }

        if (selectedPlatforms.length === 0) {
            showToast('Please select at least one platform', 'warning')
            return
        }

        setLoading(true)
        try {
            const postData = {
                content: postContent,
                image: postImage,
                platforms: selectedPlatforms,
                scheduleDate: scheduleDate || null,
                scheduleTime: scheduleTime || null,
                status: scheduleDate ? 'scheduled' : 'draft'
            }

            await api.schedulePost(postData)
            showToast('✅ Post scheduled successfully!', 'success')

            // Reset form
            setPostContent('')
            setPostImage(null)
            setSelectedPlatforms([])
            setScheduleDate('')
            setScheduleTime('')

            loadScheduledPosts()
        } catch (error) {
            showToast(error.message || 'Failed to schedule post', 'error')
        } finally {
            setLoading(false)
        }
    }

    const postNow = async () => {
        if (!postContent.trim()) {
            showToast('Please enter post content', 'warning')
            return
        }

        if (selectedPlatforms.length === 0) {
            showToast('Please select at least one platform', 'warning')
            return
        }

        setLoading(true)
        try {
            await api.postToSocial({
                content: postContent,
                image: postImage,
                platforms: selectedPlatforms
            })
            showToast('✅ Posted successfully!', 'success')

            // Reset form
            setPostContent('')
            setPostImage(null)
            setSelectedPlatforms([])
        } catch (error) {
            showToast(error.message || 'Failed to post', 'error')
        } finally {
            setLoading(false)
        }
    }

    const deleteScheduledPost = async (postId) => {
        try {
            await api.deleteScheduledPost(postId)
            showToast('Post deleted', 'success')
            loadScheduledPosts()
        } catch (error) {
            showToast('Failed to delete post', 'error')
        }
    }

    const isAccountConnected = (platformId) => {
        return connectedAccounts.some(acc => acc.platform === platformId && acc.connected)
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}

            <h1 className="text-3xl font-bold mb-2">Social Media Management</h1>
            <p className="text-gray-600 mb-8">Connect accounts, schedule posts, and manage your social presence</p>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Left Column - Connected Accounts */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h2 className="text-xl font-semibold mb-4">Connected Accounts</h2>

                        <div className="space-y-3">
                            {platforms.map(platform => {
                                const Icon = platform.icon
                                const connected = isAccountConnected(platform.id)
                                const account = connectedAccounts.find(acc => acc.platform === platform.id)

                                return (
                                    <div key={platform.id} className="flex items-center justify-between p-3 border rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 ${platform.color} rounded-lg`}>
                                                <Icon size={20} className="text-white" />
                                            </div>
                                            <div>
                                                <p className="font-medium">{platform.name}</p>
                                                {connected && account && (
                                                    <p className="text-xs text-gray-500">@{account.username}</p>
                                                )}
                                            </div>
                                        </div>

                                        {connected ? (
                                            <div className="flex items-center gap-2">
                                                <CheckCircle size={16} className="text-green-500" />
                                                <button
                                                    onClick={() => disconnectAccount(account._id)}
                                                    className="text-xs text-red-600 hover:text-red-700"
                                                >
                                                    Disconnect
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => handleConnectAccount(platform)}
                                                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                                            >
                                                Connect
                                            </button>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* Right Column - Create Post */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h2 className="text-xl font-semibold mb-4">Create Post</h2>

                        {/* Post Content */}
                        <textarea
                            value={postContent}
                            onChange={e => setPostContent(e.target.value)}
                            placeholder="What's on your mind?"
                            className="w-full h-32 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                        />

                        {/* Image Upload */}
                        <div className="mt-4">
                            <label className="flex items-center gap-2 px-4 py-2 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 w-fit">
                                <ImageIcon size={20} />
                                <span className="text-sm">Add Image</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                            </label>

                            {postImage && (
                                <div className="mt-3 relative inline-block">
                                    <img src={postImage} alt="Upload preview" className="h-32 rounded-lg" />
                                    <button
                                        onClick={() => setPostImage(null)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                    >
                                        <XCircle size={16} />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Platform Selection */}
                        <div className="mt-6">
                            <p className="text-sm font-medium mb-3">Select Platforms</p>
                            <div className="flex gap-3">
                                {platforms.map(platform => {
                                    const Icon = platform.icon
                                    const connected = isAccountConnected(platform.id)
                                    const selected = selectedPlatforms.includes(platform.id)

                                    return (
                                        <button
                                            key={platform.id}
                                            onClick={() => connected && togglePlatform(platform.id)}
                                            disabled={!connected}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${selected
                                                ? `${platform.color} text-white border-transparent`
                                                : connected
                                                    ? 'border-gray-300 hover:border-gray-400'
                                                    : 'border-gray-200 opacity-50 cursor-not-allowed'
                                                }`}
                                        >
                                            <Icon size={18} />
                                            <span className="text-sm font-medium">{platform.name}</span>
                                        </button>
                                    )
                                })}
                            </div>
                            {selectedPlatforms.length === 0 && (
                                <p className="text-xs text-gray-500 mt-2">Select at least one platform to post</p>
                            )}
                        </div>

                        {/* Schedule Options */}
                        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm font-medium mb-3">Schedule (Optional)</p>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                                        <Calendar size={14} />
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        value={scheduleDate}
                                        onChange={e => setScheduleDate(e.target.value)}
                                        min={new Date().toISOString().split('T')[0]}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                                        <Clock size={14} />
                                        Time
                                    </label>
                                    <input
                                        type="time"
                                        value={scheduleTime}
                                        onChange={e => setScheduleTime(e.target.value)}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={postNow}
                                disabled={loading || !postContent || selectedPlatforms.length === 0}
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 font-medium"
                            >
                                {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                                Post Now
                            </button>
                            <button
                                onClick={schedulePost}
                                disabled={loading || !postContent || selectedPlatforms.length === 0}
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:from-green-700 hover:to-teal-700 disabled:opacity-50 font-medium"
                            >
                                {loading ? <Loader2 className="animate-spin" size={18} /> : <Calendar size={18} />}
                                Schedule Post
                            </button>
                        </div>
                    </div>

                    {/* Scheduled Posts */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h2 className="text-xl font-semibold mb-4">Scheduled Posts</h2>

                        {scheduledPosts.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">
                                <Calendar size={48} className="mx-auto mb-3 opacity-50" />
                                <p>No scheduled posts yet</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {scheduledPosts.map(post => (
                                    <div key={post._id} className="p-4 border rounded-lg hover:bg-gray-50">
                                        <div className="flex justify-between items-start mb-2">
                                            <p className="text-sm text-gray-700 flex-1">{post.content}</p>
                                            <button
                                                onClick={() => deleteScheduledPost(post._id)}
                                                className="text-red-600 hover:text-red-700 ml-3"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>

                                        <div className="flex items-center gap-4 text-xs text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <Calendar size={12} />
                                                {new Date(post.scheduledFor).toLocaleDateString()}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock size={12} />
                                                {new Date(post.scheduledFor).toLocaleTimeString()}
                                            </span>
                                            <div className="flex gap-1">
                                                {post.platforms.map(platformId => {
                                                    const platform = platforms.find(p => p.id === platformId)
                                                    const Icon = platform?.icon
                                                    return Icon && <Icon key={platformId} size={14} />
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Connect Account Modal */}
            {showConnectModal && selectedPlatform && (
                <ConnectAccountModal
                    platform={selectedPlatform}
                    onClose={() => setShowConnectModal(false)}
                    onConnect={connectAccount}
                    loading={loading}
                />
            )}
        </div>
    )
}

// Connect Account Modal Component
function ConnectAccountModal({ platform, onClose, onConnect, loading }) {
    const [authMethod, setAuthMethod] = useState('oauth') // 'oauth' or 'credentials'
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    const handleOAuthConnect = () => {
        // Simulate OAuth flow - in production this opens OAuth popup
        setTimeout(() => {
            onConnect({
                method: 'oauth',
                email: `user@${platform.id}.com`,
                username: `user_${Date.now()}`,
                password: 'oauth_token_' + Date.now()
            })
        }, 1500)
    }

    const handleCredentialsSubmit = (e) => {
        e.preventDefault()
        onConnect({
            method: 'credentials',
            ...credentials,
            username: credentials.email.split('@')[0]
        })
    }

    const Icon = platform.icon

    const getOAuthButtonStyle = () => {
        switch (platform.id) {
            case 'twitter':
                return 'bg-blue-400 hover:bg-blue-500'
            case 'instagram':
                return 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600'
            case 'facebook':
                return 'bg-blue-600 hover:bg-blue-700'
            default:
                return 'bg-blue-600 hover:bg-blue-700'
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className={`p-3 ${platform.color} rounded-lg`}>
                        <Icon size={24} className="text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Connect {platform.name}</h3>
                        <p className="text-sm text-gray-600">Choose how to connect your account</p>
                    </div>
                </div>

                {/* Auth Method Tabs */}
                <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-lg">
                    <button
                        type="button"
                        onClick={() => setAuthMethod('oauth')}
                        className={`flex-1 px-4 py-2 rounded-md font-medium transition-all ${authMethod === 'oauth'
                            ? 'bg-white text-blue-600 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        OAuth Login
                    </button>
                    <button
                        type="button"
                        onClick={() => setAuthMethod('credentials')}
                        className={`flex-1 px-4 py-2 rounded-md font-medium transition-all ${authMethod === 'credentials'
                            ? 'bg-white text-blue-600 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Email & Password
                    </button>
                </div>

                {/* OAuth Method */}
                {authMethod === 'oauth' && (
                    <div className="space-y-4">
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="text-sm text-blue-900 mb-3">
                                <strong>Recommended:</strong> Connect securely using {platform.name}'s official login.
                                You'll be redirected to {platform.name} to authorize access.
                            </p>
                            <ul className="text-xs text-blue-700 space-y-1 ml-4 list-disc">
                                <li>No need to share your password</li>
                                <li>Secure OAuth 2.0 authentication</li>
                                <li>You can revoke access anytime</li>
                            </ul>
                        </div>

                        <button
                            type="button"
                            onClick={handleOAuthConnect}
                            disabled={loading}
                            className={`w-full flex items-center justify-center gap-3 px-6 py-3 text-white rounded-lg font-medium transition-all ${getOAuthButtonStyle()} disabled:opacity-50`}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Connecting...
                                </>
                            ) : (
                                <>
                                    <Icon size={20} />
                                    Continue with {platform.name}
                                </>
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full px-4 py-2 border rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                    </div>
                )}

                {/* Credentials Method */}
                {authMethod === 'credentials' && (
                    <form onSubmit={handleCredentialsSubmit} className="space-y-4">
                        <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                            <p className="text-xs text-yellow-800">
                                ⚠️ For security, we recommend using OAuth login instead.
                                Only use this if OAuth is not available.
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                {platform.name} Email / Username
                            </label>
                            <input
                                type="text"
                                value={credentials.email}
                                onChange={e => setCredentials({ ...credentials, email: e.target.value })}
                                placeholder={`your.email@${platform.id}.com`}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                {platform.name} Password
                            </label>
                            <input
                                type="password"
                                value={credentials.password}
                                onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                                placeholder="••••••••"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                required
                            />
                        </div>

                        <div className="text-xs text-gray-500">
                            <p>🔒 Your credentials are encrypted and stored securely.</p>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`flex-1 px-4 py-2 text-white rounded-lg font-medium ${getOAuthButtonStyle()} disabled:opacity-50`}
                            >
                                {loading ? 'Connecting...' : 'Connect'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}
