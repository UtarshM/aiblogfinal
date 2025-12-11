import { Link } from 'react-router-dom'
import { Target, FileText, BarChart3, Search, MessageSquare, TrendingUp, UserPlus, Share2, ArrowRight } from 'lucide-react'

const tools = [
    {
        name: 'Content Creation & Publishing',
        path: '/tools/content-creation',
        icon: FileText,
        description: 'Create, edit, and publish content with AI assistance'
    },
    {
        name: 'Automated Client Reporting',
        path: '/tools/client-reporting',
        icon: BarChart3,
        description: 'Generate visual reports and analytics dashboards'
    },
    {
        name: 'SEO Automation & Optimization',
        path: '/tools/seo-automation',
        icon: Search,
        description: 'Optimize content and discover keywords automatically'
    },
    {
        name: 'Campaign Performance Optimization',
        path: '/tools/campaign-optimization',
        icon: TrendingUp,
        description: 'Analyze and optimize marketing campaigns in real-time'
    },
    {
        name: 'Client Onboarding Automation',
        path: '/tools/client-onboarding',
        icon: UserPlus,
        description: 'Streamline client onboarding with guided workflows'
    },
    {
        name: 'Social Media Management',
        path: '/tools/social-media',
        icon: Share2,
        description: 'Schedule and manage social media posts across platforms'
    },
]

export default function Home() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-16">
                <h1 className="text-5xl font-bold text-gray-900 mb-4">AI Marketing Platform</h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Seven powerful AI-driven tools to automate and optimize your marketing operations
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool) => {
                    const Icon = tool.icon
                    return (
                        <Link
                            key={tool.path}
                            to={tool.path}
                            className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-blue-100 rounded-lg">
                                    <Icon className="text-blue-600" size={24} />
                                </div>
                                <ArrowRight className="text-gray-400 group-hover:text-blue-600 transition-colors" size={20} />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.name}</h3>
                            <p className="text-gray-600 text-sm">{tool.description}</p>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
