/**
 * Layout Component - MacBook Style Premium UI 2025
 * Primary Color: #52B2BF
 * Clean sidebar navigation with smooth animations
 * 
 * @author Scalezix Venture PVT LTD
 * @copyright 2025 All Rights Reserved
 */

import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Menu, X, FileText, BarChart3, Search, TrendingUp,
    UserPlus, Share2, ChevronLeft, ChevronRight, DollarSign,
    User, Settings, LogOut, HelpCircle, History, Users,
    Home, Sparkles, LayoutDashboard
} from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { usePlan } from '../context/PlanContext'
import { useToast } from '../context/ToastContext'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL ||
    (import.meta.env.PROD ? 'https://blogapi.scalezix.com/api' : 'http://localhost:3001/api')

// Navigation items with colors matching reference design
const navItems = [
    {
        name: 'Dashboard',
        path: '/dashboard',
        icon: LayoutDashboard,
        color: 'text-primary-500',
        bgColor: 'bg-primary-50',
        activeColor: 'text-primary-600',
        activeBg: 'bg-primary-100'
    },
    {
        name: 'Content Creation',
        path: '/tools/content-creation',
        icon: FileText,
        color: 'text-violet-500',
        bgColor: 'bg-violet-50',
        activeColor: 'text-violet-600',
        activeBg: 'bg-violet-100'
    },
    {
        name: 'Job History',
        path: '/tools/job-history',
        icon: History,
        color: 'text-amber-500',
        bgColor: 'bg-amber-50',
        activeColor: 'text-amber-600',
        activeBg: 'bg-amber-100'
    },
    {
        name: 'Client Reporting',
        path: '/tools/client-reporting',
        icon: BarChart3,
        color: 'text-emerald-500',
        bgColor: 'bg-emerald-50',
        activeColor: 'text-emerald-600',
        activeBg: 'bg-emerald-100'
    },
    {
        name: 'SEO Automation',
        path: '/tools/seo-automation',
        icon: Search,
        color: 'text-pink-500',
        bgColor: 'bg-pink-50',
        activeColor: 'text-pink-600',
        activeBg: 'bg-pink-100'
    },
    {
        name: 'Campaign',
        path: '/tools/campaign-optimization',
        icon: TrendingUp,
        color: 'text-blue-500',
        bgColor: 'bg-blue-50',
        activeColor: 'text-blue-600',
        activeBg: 'bg-blue-100'
    },
    {
        name: 'Client Onboarding',
        path: '/tools/client-onboarding',
        icon: UserPlus,
        color: 'text-cyan-500',
        bgColor: 'bg-cyan-50',
        activeColor: 'text-cyan-600',
        activeBg: 'bg-cyan-100'
    },
    {
        name: 'Social Media',
        path: '/tools/social-media',
        icon: Share2,
        color: 'text-fuchsia-500',
        bgColor: 'bg-fuchsia-50',
        activeColor: 'text-fuchsia-600',
        activeBg: 'bg-fuchsia-100'
    },
]

const bottomNavItems = [
    {
        name: 'Pricing',
        path: '/pricing',
        icon: DollarSign,
        color: 'text-green-500',
        bgColor: 'bg-green-50'
    },
    {
        name: 'Settings',
        path: '/settings',
        icon: Settings,
        color: 'text-gray-500',
        bgColor: 'bg-gray-50'
    },
]

const adminItems = [
    {
        name: 'Affiliate Admin',
        path: '/tools/affiliate-admin',
        icon: Users,
        color: 'text-purple-500',
        bgColor: 'bg-purple-50'
    },
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
        navigate('/login')
    }

    const getGreeting = () => {
        const hour = new Date().getHours()
        if (hour < 12) return 'Good Morning'
        if (hour < 17) return 'Good Afternoon'
        return 'Good Evening'
    }

    const isActive = (path) => location.pathname === path

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
            {/* Sidebar - Desktop */}
            <aside
                className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-100 shadow-sm z-40 transition-all duration-300 ease-out hidden lg:flex flex-col ${sidebarOpen ? 'w-64' : 'w-20'
                    }`}
            >
                {/* Logo */}
                <div className="flex items-center gap-3 px-5 py-5 border-b border-gray-100">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-500 flex items-center justify-center shadow-button">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    {sidebarOpen && (
                        <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-xl font-bold text-gray-900"
                        >
                            Scalezix
                        </motion.span>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-4 px-3">
                    <div className="space-y-1">
                        {navItems.map((item) => {
                            const Icon = item.icon
                            const active = isActive(item.path)
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${active
                                            ? `${item.activeBg} ${item.activeColor}`
                                            : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${active ? item.activeBg : item.bgColor
                                        }`}>
                                        <Icon className={`w-5 h-5 ${active ? item.activeColor : item.color}`} />
                                    </div>
                                    {sidebarOpen && (
                                        <span className="text-sm font-medium">{item.name}</span>
                                    )}
                                </Link>
                            )
                        })}
                    </div>

                    {/* Admin Section */}
                    {isAdmin && (
                        <div className="mt-6 pt-6 border-t border-gray-100">
                            {sidebarOpen && (
                                <p className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                    Admin
                                </p>
                            )}
                            {adminItems.map((item) => {
                                const Icon = item.icon
                                const active = isActive(item.path)
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${active
                                                ? 'bg-purple-100 text-purple-600'
                                                : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${active ? 'bg-purple-100' : item.bgColor
                                            }`}>
                                            <Icon className={`w-5 h-5 ${active ? 'text-purple-600' : item.color}`} />
                                        </div>
                                        {sidebarOpen && (
                                            <span className="text-sm font-medium">{item.name}</span>
                                        )}
                                    </Link>
                                )
                            })}
                        </div>
                    )}
                </nav>

                {/* Bottom Section */}
                <div className="border-t border-gray-100 p-3">
                    {bottomNavItems.map((item) => {
                        const Icon = item.icon
                        const active = isActive(item.path)
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${active
                                        ? 'bg-gray-100 text-gray-900'
                                        : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${item.bgColor}`}>
                                    <Icon className={`w-5 h-5 ${item.color}`} />
                                </div>
                                {sidebarOpen && (
                                    <span className="text-sm font-medium">{item.name}</span>
                                )}
                            </Link>
                        )
                    })}

                    {/* Logout */}
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200 mt-1"
                    >
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-gray-50">
                            <LogOut className="w-5 h-5 text-gray-500" />
                        </div>
                        {sidebarOpen && (
                            <span className="text-sm font-medium">Log Out</span>
                        )}
                    </button>
                </div>

                {/* Collapse Button */}
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                    {sidebarOpen ? (
                        <ChevronLeft className="w-4 h-4 text-gray-500" />
                    ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                    )}
                </button>
            </aside>

            {/* Mobile Header */}
            <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 z-30 flex items-center justify-between px-4">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <Menu className="w-6 h-6 text-gray-700" />
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-400 to-primary-500 flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-gray-900">Scalezix</span>
                    </div>
                </div>

                {/* Profile */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                        className="flex items-center gap-2"
                    >
                        {userProfileImage ? (
                            <img src={userProfileImage} alt={userName} className="w-9 h-9 rounded-full object-cover" />
                        ) : (
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-primary-500 flex items-center justify-center text-white font-medium text-sm">
                                {userInitials}
                            </div>
                        )}
                    </button>

                    <AnimatePresence>
                        {profileDropdownOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute right-0 mt-2 w-56 bg-white rounded-xl border border-gray-100 shadow-dropdown overflow-hidden"
                            >
                                <div className="px-4 py-3 border-b border-gray-100">
                                    <p className="font-medium text-gray-900">{userName}</p>
                                    <p className="text-xs text-gray-500 capitalize">{currentPlan} Plan</p>
                                </div>
                                <div className="py-1">
                                    <Link to="/profile" className="dropdown-item" onClick={() => setProfileDropdownOpen(false)}>
                                        <User className="w-4 h-4" />
                                        <span>Profile</span>
                                    </Link>
                                    <Link to="/settings" className="dropdown-item" onClick={() => setProfileDropdownOpen(false)}>
                                        <Settings className="w-4 h-4" />
                                        <span>Settings</span>
                                    </Link>
                                    <button onClick={handleLogout} className="dropdown-item w-full text-red-600 hover:bg-red-50">
                                        <LogOut className="w-4 h-4" />
                                        <span>Log Out</span>
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                            onClick={() => setMobileMenuOpen(false)}
                        />
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="lg:hidden fixed left-0 top-0 h-screen w-72 bg-white z-50 flex flex-col shadow-xl"
                        >
                            {/* Mobile Menu Header */}
                            <div className="flex items-center justify-between px-5 py-5 border-b border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-500 flex items-center justify-center">
                                        <Sparkles className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="text-xl font-bold text-gray-900">Scalezix</span>
                                </div>
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>

                            {/* Mobile Navigation */}
                            <nav className="flex-1 overflow-y-auto py-4 px-3">
                                {navItems.map((item) => {
                                    const Icon = item.icon
                                    const active = isActive(item.path)
                                    return (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${active
                                                    ? `${item.activeBg} ${item.activeColor}`
                                                    : 'text-gray-600 hover:bg-gray-50'
                                                }`}
                                        >
                                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${active ? item.activeBg : item.bgColor
                                                }`}>
                                                <Icon className={`w-5 h-5 ${active ? item.activeColor : item.color}`} />
                                            </div>
                                            <span className="text-sm font-medium">{item.name}</span>
                                        </Link>
                                    )
                                })}
                            </nav>

                            {/* Mobile Bottom */}
                            <div className="border-t border-gray-100 p-3">
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200"
                                >
                                    <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-red-50">
                                        <LogOut className="w-5 h-5" />
                                    </div>
                                    <span className="text-sm font-medium">Log Out</span>
                                </button>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'} pt-16 lg:pt-0`}>
                {/* Top Header - Desktop */}
                <header className="hidden lg:flex items-center justify-between px-8 py-5 bg-white/50 backdrop-blur-sm border-b border-gray-100/50">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            {getGreeting()}, <span className="text-primary-500">{userName.split(' ')[0]}</span>
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                    </div>

                    {/* Profile Section */}
                    <div className="flex items-center gap-4">
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors"
                            >
                                {userProfileImage ? (
                                    <img src={userProfileImage} alt={userName} className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm" />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-500 flex items-center justify-center text-white font-medium shadow-sm">
                                        {userInitials}
                                    </div>
                                )}
                                <div className="text-left hidden xl:block">
                                    <p className="text-sm font-medium text-gray-900">{userName}</p>
                                    <p className="text-xs text-gray-500 capitalize">{currentPlan} Plan</p>
                                </div>
                            </button>

                            <AnimatePresence>
                                {profileDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute right-0 mt-2 w-56 bg-white rounded-xl border border-gray-100 shadow-dropdown overflow-hidden"
                                    >
                                        <div className="px-4 py-3 border-b border-gray-100">
                                            <p className="font-medium text-gray-900">{userName}</p>
                                            <p className="text-xs text-gray-500 capitalize">{currentPlan} Plan</p>
                                        </div>
                                        <div className="py-1">
                                            <Link to="/profile" className="dropdown-item" onClick={() => setProfileDropdownOpen(false)}>
                                                <User className="w-4 h-4" />
                                                <span>Profile</span>
                                            </Link>
                                            <Link to="/settings" className="dropdown-item" onClick={() => setProfileDropdownOpen(false)}>
                                                <Settings className="w-4 h-4" />
                                                <span>Settings</span>
                                            </Link>
                                            <Link to="/policies" className="dropdown-item" onClick={() => setProfileDropdownOpen(false)}>
                                                <HelpCircle className="w-4 h-4" />
                                                <span>Help & Policies</span>
                                            </Link>
                                            <div className="border-t border-gray-100 my-1" />
                                            <button onClick={handleLogout} className="dropdown-item w-full text-red-600 hover:bg-red-50">
                                                <LogOut className="w-4 h-4" />
                                                <span>Log Out</span>
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-4 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}
