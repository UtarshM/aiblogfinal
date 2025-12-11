import { useState } from 'react'
import { TrendingUp, DollarSign, Users, Target } from 'lucide-react'

export default function CampaignOptimization() {
    const [budget, setBudget] = useState(5000)
    const [strategy, setStrategy] = useState('balanced')

    const campaigns = [
        { name: 'Summer Sale', roi: 3.2, spend: 2500, conversions: 145, status: 'active' },
        { name: 'Brand Awareness', roi: 1.8, spend: 1800, conversions: 89, status: 'active' },
        { name: 'Product Launch', roi: 4.1, spend: 3200, conversions: 203, status: 'active' },
    ]

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-2">Campaign Performance Optimization</h1>
            <p className="text-gray-600 mb-8">Analyze and optimize marketing campaigns</p>

            <div className="grid md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-100 rounded">
                            <DollarSign className="text-blue-600" size={20} />
                        </div>
                        <p className="text-sm text-gray-600">Total Spend</p>
                    </div>
                    <p className="text-2xl font-bold">${campaigns.reduce((a, c) => a + c.spend, 0).toLocaleString()}</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-green-100 rounded">
                            <TrendingUp className="text-green-600" size={20} />
                        </div>
                        <p className="text-sm text-gray-600">Avg ROI</p>
                    </div>
                    <p className="text-2xl font-bold">
                        {(campaigns.reduce((a, c) => a + c.roi, 0) / campaigns.length).toFixed(1)}x
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-purple-100 rounded">
                            <Users className="text-purple-600" size={20} />
                        </div>
                        <p className="text-sm text-gray-600">Conversions</p>
                    </div>
                    <p className="text-2xl font-bold">{campaigns.reduce((a, c) => a + c.conversions, 0)}</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-orange-100 rounded">
                            <Target className="text-orange-600" size={20} />
                        </div>
                        <p className="text-sm text-gray-600">Active Campaigns</p>
                    </div>
                    <p className="text-2xl font-bold">{campaigns.length}</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h2 className="text-xl font-semibold mb-4">Campaign Performance</h2>
                        <div className="space-y-4">
                            {campaigns.map((campaign, i) => (
                                <div key={i} className="border rounded-lg p-4">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="font-semibold">{campaign.name}</h3>
                                            <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">
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
                                                className="bg-blue-600 h-2 rounded-full"
                                                style={{ width: `${(campaign.roi / 5) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h2 className="text-xl font-semibold mb-4">A/B Test Results</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="border rounded-lg p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-semibold">Variant A</h3>
                                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">Control</span>
                                </div>
                                <p className="text-2xl font-bold mb-1">3.2%</p>
                                <p className="text-sm text-gray-600">Conversion Rate</p>
                            </div>
                            <div className="border rounded-lg p-4 bg-green-50">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-semibold">Variant B</h3>
                                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">Winner</span>
                                </div>
                                <p className="text-2xl font-bold mb-1">4.8%</p>
                                <p className="text-sm text-gray-600">Conversion Rate (+50%)</p>
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
                                    className="w-full"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Strategy</label>
                                <select
                                    value={strategy}
                                    onChange={e => setStrategy(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md"
                                >
                                    <option value="aggressive">Aggressive Growth</option>
                                    <option value="balanced">Balanced</option>
                                    <option value="conservative">Conservative</option>
                                </select>
                            </div>

                            <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                                Apply Optimization
                            </button>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
                        <div className="space-y-3">
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <p className="text-sm font-medium text-blue-900">Increase budget for Product Launch</p>
                                <p className="text-xs text-blue-700 mt-1">High ROI potential detected</p>
                            </div>
                            <div className="p-3 bg-yellow-50 rounded-lg">
                                <p className="text-sm font-medium text-yellow-900">Pause Brand Awareness</p>
                                <p className="text-xs text-yellow-700 mt-1">Below target ROI threshold</p>
                            </div>
                            <div className="p-3 bg-green-50 rounded-lg">
                                <p className="text-sm font-medium text-green-900">Test new ad creative</p>
                                <p className="text-xs text-green-700 mt-1">Engagement declining</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
