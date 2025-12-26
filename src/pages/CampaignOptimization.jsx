import { useState, useEffect } from 'react'
import { TrendingUp, DollarSign, Users, Target, RefreshCw, AlertCircle, CheckCircle, Info } from 'lucide-react'
import { api } from '../api/client'
import { useToast } from '../context/ToastContext'
import { usePlan } from '../context/PlanContext'

export default function CampaignOptimization() {
    const [budget, setBudget] = useState(5000)
    const [strategy, setStrategy] = useState('balanced')
    const [loading, setLoading] = useState(true)
    const [campaignData, setCampaignData] = useState(null)
    const toast = useToast()
    const { tokenBalance, refreshBalance } = usePlan()

    useEffect(() => {
        fetchCampaignData()
    }, [])

    const fetchCampaignData = async () => {
        try {
            setLoading(true)
            const data = await api.getCampaignStats()
            setCampaignData(data)
        } catch (error) {
            console.error('Failed to fetch campaign data:', error)
            toast.error('Failed to load campaign data')
        } finally {
            setLoading(false)
        }
    }

    const campaigns = campaignData?.campaigns || []
    const summary = campaignData?.summary || { totalSpend: 0, totalConversions: 0, avgRoi: '0.0', activeCampaigns: 0 }
    const recommendations = campaignData?.recommendations || []

    const applyOptimization = () => {
        toast.success(`Optimization applied! Budget: $${budget.toLocaleString()}, Strategy: ${strategy}`)
        // In a real app, this would call an API to apply the optimization
    }

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex items-center justify-center h-64">
                    <RefreshCw className="animate-spin text-primary-500" size={32} />
                    <span className="ml-3 text-gray-600">Loading campaign data...</span>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Campaign Performance Optimization</h1>
                    <p className="text-gray-600">Analyze and optimize your marketing campaigns</p>
                </div>
                <button
                    onClick={() => { fetchCampaignData(); refreshBalance(); }}
                    className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors"
                >
                    <RefreshCw size={16} />
                    Refresh
                </button>
            </div>

            {/* Token Usage Banner */}
            {tokenBalance && (
                <div className="bg-gradient-to-r from-secondary-400 to-secondary-500 rounded-xl p-4 mb-6 text-white flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                            <Target size={24} />
                        </div>
                        <div>
                            <p className="font-semibold">Token Balance</p>
                            <p className="text-sm opacity-90">{tokenBalance.current.toLocaleString()} tokens remaining</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-bold">{tokenBalance.percentage}%</p>
                        <p className="text-sm opacity-90">used this month</p>
                    </div>
                </div>
            )}

            <div className="grid md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary-100 rounded">
                            <DollarSign className="text-primary-500" size={20} />
                        </div>
                        <p className="text-sm text-gray-600">Total Spend</p>
                    </div>
                    <p className="text-2xl font-bold">${summary.totalSpend.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-1">Based on token usage</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-green-100 rounded">
                            <TrendingUp className="text-green-600" size={20} />
                        </div>
                        <p className="text-sm text-gray-600">Avg ROI</p>
                    </div>
                    <p className="text-2xl font-bold">{summary.avgRoi}x</p>
                    <p className="text-xs text-gray-500 mt-1">Return on investment</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-purple-100 rounded">
                            <Users className="text-secondary-500" size={20} />
                        </div>
                        <p className="text-sm text-gray-600">Conversions</p>
                    </div>
                    <p className="text-2xl font-bold">{summary.totalConversions}</p>
                    <p className="text-xs text-gray-500 mt-1">Published content</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-orange-100 rounded">
                            <Target className="text-accent-500" size={20} />
                        </div>
                        <p className="text-sm text-gray-600">Active Campaigns</p>
                    </div>
                    <p className="text-2xl font-bold">{summary.activeCampaigns}</p>
                    <p className="text-xs text-gray-500 mt-1">Running now</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h2 className="text-xl font-semibold mb-4">Campaign Performance</h2>
                        {campaigns.length > 0 ? (
                            <div className="space-y-4">
                                {campaigns.map((campaign, i) => (
                                    <div key={campaign._id || i} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <h3 className="font-semibold">{campaign.name}</h3>
                                                <span className={`text-xs px-2 py-1 rounded ${campaign.status === 'active'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-gray-100 text-gray-700'
                                                    }`}>
                                                    {campaign.status}
                                                </span>
                                            </div>
                                            <span className="text-lg font-bold text-green-600">{campaign.roi}x ROI</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <p className="text-gray-600">Spend</p>
                                                <p className="font-semibold">${campaign.spend.toLocaleString()}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">Conversions</p>
                                                <p className="font-semibold">{campaign.conversions}</p>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-primary-400 h-2 rounded-full transition-all duration-500"
                                                    style={{ width: `${Math.min((parseFloat(campaign.roi) / 5) * 100, 100)}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                <Target size={48} className="mx-auto mb-3 opacity-50" />
                                <p>No campaigns yet. Start creating content to see campaign performance!</p>
                            </div>
                        )}
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h2 className="text-xl font-semibold mb-4">Content Performance Comparison</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="border rounded-lg p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-semibold">Blog Posts</h3>
                                    <span className="text-xs px-2 py-1 bg-primary-100 text-primary-700 rounded">Primary</span>
                                </div>
                                <p className="text-2xl font-bold mb-1">{summary.totalConversions}</p>
                                <p className="text-sm text-gray-600">Published articles</p>
                            </div>
                            <div className="border rounded-lg p-4 bg-green-50">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-semibold">Token Efficiency</h3>
                                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">Good</span>
                                </div>
                                <p className="text-2xl font-bold mb-1">
                                    {summary.totalConversions > 0
                                        ? Math.round((tokenBalance?.used || 0) / summary.totalConversions).toLocaleString()
                                        : '0'
                                    }
                                </p>
                                <p className="text-sm text-gray-600">Tokens per conversion</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h2 className="text-xl font-semibold mb-4">Budget Optimizer</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Monthly Budget: ${budget.toLocaleString()}
                                </label>
                                <input
                                    type="range"
                                    min="1000"
                                    max="20000"
                                    step="500"
                                    value={budget}
                                    onChange={e => setBudget(Number(e.target.value))}
                                    className="w-full accent-primary-500"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>$1,000</span>
                                    <span>$20,000</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Strategy</label>
                                <select
                                    value={strategy}
                                    onChange={e => setStrategy(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary-400 focus:border-primary-400"
                                >
                                    <option value="aggressive">Aggressive Growth</option>
                                    <option value="balanced">Balanced</option>
                                    <option value="conservative">Conservative</option>
                                </select>
                            </div>

                            <button
                                onClick={applyOptimization}
                                className="w-full bg-primary-400 text-white py-2 rounded-md hover:bg-primary-500 transition-colors"
                            >
                                Apply Optimization
                            </button>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h2 className="text-xl font-semibold mb-4">AI Recommendations</h2>
                        <div className="space-y-3">
                            {recommendations.length > 0 ? recommendations.map((rec, i) => {
                                const Icon = rec.type === 'success' ? CheckCircle
                                    : rec.type === 'warning' ? AlertCircle
                                        : Info
                                const bgColor = rec.type === 'success' ? 'bg-green-50'
                                    : rec.type === 'warning' ? 'bg-yellow-50'
                                        : 'bg-primary-50'
                                const textColor = rec.type === 'success' ? 'text-green-900'
                                    : rec.type === 'warning' ? 'text-yellow-900'
                                        : 'text-primary-900'
                                const iconColor = rec.type === 'success' ? 'text-green-600'
                                    : rec.type === 'warning' ? 'text-yellow-600'
                                        : 'text-primary-600'

                                return (
                                    <div key={i} className={`p-3 ${bgColor} rounded-lg flex items-start gap-3`}>
                                        <Icon className={iconColor} size={18} />
                                        <p className={`text-sm font-medium ${textColor}`}>{rec.text}</p>
                                    </div>
                                )
                            }) : (
                                <>
                                    <div className="p-3 bg-primary-50 rounded-lg flex items-start gap-3">
                                        <Info className="text-primary-600" size={18} />
                                        <p className="text-sm font-medium text-primary-900">Start creating content to get personalized recommendations</p>
                                    </div>
                                    <div className="p-3 bg-green-50 rounded-lg flex items-start gap-3">
                                        <CheckCircle className="text-green-600" size={18} />
                                        <p className="text-sm font-medium text-green-900">Your account is set up and ready to go!</p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Token Usage Tips */}
                    <div className="bg-gradient-to-br from-secondary-50 to-primary-50 p-6 rounded-lg border border-secondary-200">
                        <h3 className="font-semibold text-secondary-900 mb-3">💡 Token Tips</h3>
                        <ul className="space-y-2 text-sm text-secondary-800">
                            <li>• Each blog post uses ~3,500 tokens</li>
                            <li>• Social posts use ~200 tokens each</li>
                            <li>• SEO analysis uses ~500 tokens</li>
                            <li>• Tokens reset monthly with your plan</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
