/**
 * Layout Component - MacBook Style UI/UX
 * Primary Color: #52b2bf
 * Glassmorphism design with smooth animations
 * 
 * @author Scalezix Venture PVT LTD
 * @copyright 2025 Scalezix Venture PVT LTD. All Rights Reserved.
 */

import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Menu, X, FileText, BarChart3, Search, TrendingUp,
    UserPlus, Share2, ChevronLeft, ChevronRight, DollarSign,
    User, Settings, LogOut, HelpCircle, History, Users,
    Home, Sparkles
} from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { usePlan } from '../context/PlanContext'
import { useToast } from '../context/ToastContext'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL ||
    (import.meta.env.PROD ? 'https://blogapi.scalezix.com/api' : 'http://localhost:3001/api')

const tools = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Content Creation', path: '/tools/content-creation', icon: FileText },
    { name: 'Job History', path: '/tools/job-history', icon: History },
    { name: 'Client Reporting', path: '/tools/client-reporting', icon: BarChart3 },
    { name: 'SEO Automation', path: '/tools/seo-automation', icon: Search },
    { name: 'Campaign Optimization', path: '/tools/campaign-optimization', icon: TrendingUp },
    { name: 'Client Onboarding', path: '/tools/client-onboarding', icon: UserPlus },
    { name: 'Social Media', path: '/tools/social-media', icon: Share2 },
    { name: 'Pricing', path: '/pricing', icon: DollarSign },
]

const adminTools = [
    { name: 'Affiliate Admin', path: '/tools/affiliate-admin', icon: Users },
]

export default function Layout({ children }) {
    const navigate = useNavigate()
    const location = useLocation()
    const toast = useToast()
    const { currentPlan } = usePlan()
    const dropdownRef = useRef(null)

    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
    const [userName, setUserName] = useState('User')
    const [userInitials, setUserInitials] = useState('U')
    const [userProfileImage, setUserProfileImage] = useState(null)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        loadUserData()
        window.addEventListener('profileUpdated', loadUserData)
        return () => window.removeEventListener('profileUpdated', loadUserData)
    }, [])

    const loadUserData = async () => {
        try {
            const token = localStorage.getItem('token')
            if (!token) { navigate('/login'); return }
            const response = await axios.get(`${API_URL}/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (response.data) {
                const firstName = response.data.profile?.firstName || response.data.name?.split(' ')[0] || 'User'
                const lastName = response.data.profile?.lastName || response.data.name?.split(' ')[1] || ''
                setUserName(`${firstName} ${lastName}`.trim())
                setUserInitials(`${firstName[0]}${lastName[0] || ''}`.toUpperCase())
                setUserProfileImage(response.data.profile?.profileImage || null)
                setIsAdmin(response.data.isAdmin || false)
            }
        } catch (error) {
            if (error.response && [403, 401, 404].includes(error.response.status)) {
                localStorage.clear()
                navigate('/login')
            }
        }
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setProfileDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setProfileDropdownOpen(false)
        toast.success('Logged out successfully')
        navigate('/')
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-primary-50/30 to-gray-100 flex">
            {/* Desktop Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: sidebarOpen ? 280 : 80 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="hidden md:flex flex-col fixed left-0 top-0 h-full bg-white/80 backdrop-blur-xl border-r border-gray-200/50 z-40 shadow-soft"
            >
                <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
                    {sidebarOpen && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                            <div className="w-9 h-9 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-400/30">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-bold text-gray-900">Scalezix AI</span>
                        </motion.div>
                    )}
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded-xl text-gray-500">
                        {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                    </motion.button>
                </div>

                <nav className="flex-1 overflow-y-auto py-4 px-3">
                    <div className="space-y-1">
                        {tools.map((tool) => {
                            const Icon = tool.icon
                            const isActive = location.pathname === tool.path
                            return (
                                <Link key={tool.path} to={tool.path} title={!sidebarOpen ? tool.name : ''}
                                    className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${isActive ? 'bg-gradient-to-r from-primary-400 to-primary-500 text-white shadow-lg shadow-primary-400/30' : 'text-gray-600 hover:bg-primary-50 hover:text-primary-600'}`}>
                                    <Icon size={20} className="flex-shrink-0" />
                                    {sidebarOpen && <span className="text-sm font-medium">{tool.name}</span>}
                                </Link>
                            )
                        })}
                        {isAdmin && (
                            <>
                                <div className="pt-4 pb-2">{sidebarOpen && <span className="px-3 text-xs font-semibold text-gray-400 uppercase">Admin</span>}</div>
                                {adminTools.map((tool) => {
                                    const Icon = tool.icon
                                    const isActive = location.pathname === tool.path
                                    return (
                                        <Link key={tool.path} to={tool.path} title={!sidebarOpen ? tool.name : ''}
                                            className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${isActive ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' : 'text-purple-600 hover:bg-purple-50'}`}>
                                            <Icon size={20} className="flex-shrink-0" />
                                            {sidebarOpen && <span className="text-sm font-medium">{tool.name}</span>}
                                        </Link>
                                    )
                                })}
                            </>
                        )}
                    </div>
                </nav>

                <div className="p-3 border-t border-gray-100" ref={dropdownRef}>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all ${sidebarOpen ? '' : 'justify-center'}`}>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold overflow-hidden shadow-lg shadow-primary-400/30">
                            {userProfileImage ? <img src={userProfileImage} alt="Profile" className="w-full h-full object-cover" /> : userInitials}
                        </div>
                        {sidebarOpen && (
                            <div className="flex-1 text-left">
                                <p className="text-sm font-semibold text-gray-900 truncate">{userName}</p>
                                <p className="text-xs text-primary-500 uppercase font-medium">{currentPlan} Plan</p>
                            </div>
                        )}
                    </motion.button>
                    <AnimatePresence>
                        {profileDropdownOpen && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                                className="absolute bottom-full left-3 right-3 mb-2 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50">
                                <Link to="/profile" onClick={() => setProfileDropdownOpen(false)} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50"><User size={18} className="text-gray-500" /><span className="text-sm font-medium text-gray-700">Profile</span></Link>
                                <Link to="/settings" onClick={() => setProfileDropdownOpen(false)} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50"><Settings size={18} className="text-gray-500" /><span className="text-sm font-medium text-gray-700">Settings</span></Link>
                                <Link to="/pricing" onClick={() => setProfileDropdownOpen(false)} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50"><DollarSign size={18} className="text-gray-500" /><span className="text-sm font-medium text-gray-700">Upgrade Plan</span></Link>
                                <div className="border-t border-gray-100 my-2"></div>
                                <Link to="/policies" onClick={() => setProfileDropdownOpen(false)} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50"><HelpCircle size={18} className="text-gray-500" /><span className="text-sm font-medium text-gray-700">Help & Policies</span></Link>
                                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600"><LogOut size={18} /><span className="text-sm font-medium">Logout</span></button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.aside>

            {/* Mobile Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40" onClick={() => setMobileMenuOpen(false)} />}
            </AnimatePresence>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.aside initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="md:hidden fixed left-0 top-0 bottom-0 w-72 bg-white/95 backdrop-blur-xl border-r z-50 shadow-2xl">
                        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
                            <div className="flex items-center gap-2">
                                <div className="w-9 h-9 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center"><Sparkles className="w-5 h-5 text-white" /></div>
                                <span className="font-bold text-gray-900">Scalezix AI</span>
                            </div>
                            <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl text-gray-500"><X size={20} /></button>
                        </div>
                        <nav className="flex-1 overflow-y-auto py-4 px-3">
                            {tools.map((tool) => {
                                const Icon = tool.icon
                                const isActive = location.pathname === tool.path
                                return (
                                    <Link key={tool.path} to={tool.path} onClick={() => setMobileMenuOpen(false)}
                                        className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${isActive ? 'bg-gradient-to-r from-primary-400 to-primary-500 text-white shadow-lg' : 'text-gray-600 hover:bg-primary-50'}`}>
                                        <Icon size={20} /><span className="text-sm font-medium">{tool.name}</span>
                                    </Link>
                                )
                            })}
                        </nav>
                        <div className="p-4 border-t border-gray-100 text-xs text-gray-500">
                            <p className="font-semibold text-gray-700">© 2025 Scalezix Venture PVT LTD</p>
                            <p className="mt-1">All Rights Reserved</p>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen md:ml-[280px]" style={{ marginLeft: typeof window !== 'undefined' && window.innerWidth >= 768 ? (sidebarOpen ? 280 : 80) : 0 }}>
                {/* Mobile Header */}
                <header className="md:hidden h-16 bg-white/80 backdrop-blur-xl border-b flex items-center justify-between px-4 sticky top-0 z-30">
                    <motion.button whileTap={{ scale: 0.95 }} onClick={() => setMobileMenuOpen(true)} className="p-2 hover:bg-gray-100 rounded-xl text-gray-600"><Menu size={24} /></motion.button>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center"><Sparkles className="w-4 h-4 text-white" /></div>
                        <span className="font-bold text-gray-900">Scalezix AI</span>
                    </div>
                    <Link to="/profile"><div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">{userInitials}</div></Link>
                </header>

                <main className="flex-1 overflow-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>{children}</motion.div>
                </main>

                <footer className="bg-white/80 backdrop-blur-xl border-t py-6 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Sparkles className="w-4 h-4 text-primary-500" />
                                <span className="font-semibold">Scalezix AI Tool</span>
                                <span className="text-gray-400">•</span>
                                <span>Powered by Advanced AI</span>
                            </div>
                            <div className="flex gap-6 text-sm">
                                <Link to="/profile" className="text-gray-500 hover:text-primary-500 transition-colors">Profile</Link>
                                <Link to="/settings" className="text-gray-500 hover:text-primary-500 transition-colors">Settings</Link>
                                <Link to="/policies" className="text-gray-500 hover:text-primary-500 transition-colors">Policies</Link>
                                <Link to="/pricing" className="text-gray-500 hover:text-primary-500 transition-colors">Pricing</Link>
                            </div>
                        </div>
                        <div className="text-center text-sm text-gray-500 border-t border-gray-100 pt-4">
                            <span className="font-semibold">© 2025 Scalezix Venture PVT LTD</span> • All Rights Reserved
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}
