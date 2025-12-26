import { useState, useEffect } from 'react'
import { Download, Calendar, Lock, RefreshCw, TrendingUp, FileText, Share2, Search, Coins } from 'lucide-react'
import { usePlan } from '../context/PlanContext'
import { useToast } from '../context/ToastContext'
import LockedFeature from '../components/LockedFeature'
import { jsPDF } from 'jspdf'
import { api } from '../api/client'

export default function ClientReporting() {
    const { hasAccess, tokenBalance, usageStats, refreshBalance } = usePlan()
    const [dateRange, setDateRange] = useState('30')
    const [showUpgradeModal, setShowUpgradeModal] = useState(false)
    const [loading, setLoading] = useState(true)
    const [reportData, setReportData] = useState(null)
    const canAccessReporting = hasAccess('client-reporting')
    const toast = useToast()

    // Fetch real reporting data
    useEffect(() => {
        fetchReportingData()
    }, [dateRange])

    const fetchReportingData = async () => {
        try {
            setLoading(true)
            const data = await api.getReportingStats(parseInt(dateRange))
            setReportData(data)
        } catch (error) {
            console.error('Failed to fetch reporting data:', error)
            toast.error('Failed to load reporting data')
        } finally {
            setLoading(false)
        }
    }

    // Calculate metrics from real data
    const metrics = reportData ? [
        {
            label: 'Content Created',
            value: reportData.metrics.contentCreated.toString(),
            rawValue: reportData.metrics.contentCreated,
            change: '+' + reportData.metrics.contentCreated,
            positive: true,
            icon: FileText,
            color: 'primary'
        },
        {
            label: 'Published Posts',
            value: reportData.metrics.publishedPosts.toString(),
            rawValue: reportData.metrics.publishedPosts,
            change: '+' + reportData.metrics.publishedPosts,
            positive: true,
            icon: TrendingUp,
            color: 'green'
        },
        {
            label: 'Social Posts',
            value: reportData.metrics.socialPosts.toString(),
            rawValue: reportData.metrics.socialPosts,
            change: '+' + reportData.metrics.socialPosts,
            positive: true,
            icon: Share2,
            color: 'purple'
        },
        {
            label: 'Tokens Used',
            value: reportData.metrics.tokensUsed.toLocaleString(),
            rawValue: reportData.metrics.tokensUsed,
            change: tokenBalance ? `${tokenBalance.percentage}% of limit` : '',
            positive: tokenBalance?.percentage < 80,
            icon: Coins,
            color: 'amber'
        },
    ] : []

    const trafficData = reportData?.trafficSources || []
    const conversionFunnel = reportData?.conversionFunnel || []
    const topContent = reportData?.topContent || []

    const exportReport = () => {
        if (!canAccessReporting) {
            setShowUpgradeModal(true)
            return
        }

        try {
            const doc = new jsPDF()
            const pageWidth = doc.internal.pageSize.getWidth()
            const pageHeight = doc.internal.pageSize.getHeight()
            const margin = 14

            // Header Background
            doc.setFillColor(82, 178, 191) // Primary color #52B2BF
            doc.rect(0, 0, pageWidth, 45, 'F')

            // Title
            doc.setTextColor(255, 255, 255)
            doc.setFontSize(28)
            doc.setFont('helvetica', 'bold')
            doc.text('AI Marketing Platform', pageWidth / 2, 20, { align: 'center' })

            doc.setFontSize(16)
            doc.setFont('helvetica', 'normal')
            doc.text('Client Analytics Report', pageWidth / 2, 32, { align: 'center' })

            // Date
            doc.setFontSize(10)
            const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
            doc.text(`Generated: ${today} | Period: Last ${dateRange} days`, pageWidth / 2, 40, { align: 'center' })

            // Reset
            doc.setTextColor(0, 0, 0)
            let yPos = 55

            // Key Metrics Section
            doc.setFontSize(16)
            doc.setFont('helvetica', 'bold')
            doc.setTextColor(82, 178, 191)
            doc.text('Key Performance Metrics', margin, yPos)
            yPos += 8

            doc.setFontSize(10)
            doc.setTextColor(0, 0, 0)
            doc.setFont('helvetica', 'normal')

            metrics.forEach(metric => {
                doc.setFont('helvetica', 'bold')
                doc.text(`${metric.label}:`, margin, yPos)
                doc.setFont('helvetica', 'normal')
                doc.text(`${metric.value} (${metric.change})`, margin + 50, yPos)
                yPos += 6
            })

            yPos += 8

            // Token Usage
            if (tokenBalance) {
                doc.setFontSize(16)
                doc.setFont('helvetica', 'bold')
                doc.setTextColor(82, 178, 191)
                doc.text('Token Usage', margin, yPos)
                yPos += 8

                doc.setFontSize(10)
                doc.setTextColor(0, 0, 0)
                doc.setFont('helvetica', 'normal')
                doc.text(`Current Balance: ${tokenBalance.current.toLocaleString()} tokens`, margin, yPos)
                yPos += 6
                doc.text(`Used This Period: ${tokenBalance.used.toLocaleString()} tokens`, margin, yPos)
                yPos += 6
                doc.text(`Monthly Limit: ${tokenBalance.total.toLocaleString()} tokens`, margin, yPos)
                yPos += 6
                doc.text(`Usage: ${tokenBalance.percentage}%`, margin, yPos)
                yPos += 12
            }

            // Traffic Sources
            doc.setFontSize(16)
            doc.setFont('helvetica', 'bold')
            doc.setTextColor(82, 178, 191)
            doc.text('Traffic Sources', margin, yPos)
            yPos += 8

            doc.setFontSize(10)
            doc.setTextColor(0, 0, 0)
            doc.setFont('helvetica', 'normal')

            trafficData.forEach(item => {
                doc.setFont('helvetica', 'bold')
                doc.text(`${item.source}:`, margin, yPos)
                doc.setFont('helvetica', 'normal')
                doc.text(`${item.count.toLocaleString()} visitors (${item.percentage}%)`, margin + 50, yPos)
                yPos += 6
            })

            yPos += 8

            // Conversion Funnel
            doc.setFontSize(16)
            doc.setFont('helvetica', 'bold')
            doc.setTextColor(82, 178, 191)
            doc.text('Conversion Funnel', margin, yPos)
            yPos += 8

            doc.setFontSize(10)
            doc.setTextColor(0, 0, 0)
            doc.setFont('helvetica', 'normal')

            conversionFunnel.forEach((stage) => {
                doc.setFont('helvetica', 'bold')
                doc.text(`${stage.stage}:`, margin, yPos)
                doc.setFont('helvetica', 'normal')
                doc.text(`${stage.count.toLocaleString()} (${stage.percentage}%)`, margin + 50, yPos)
                yPos += 6
            })

            yPos += 8

            // Check if we need a new page
            if (yPos > pageHeight - 60) {
                doc.addPage()
                yPos = 20
            }

            // Top Content
            doc.setFontSize(16)
            doc.setFont('helvetica', 'bold')
            doc.setTextColor(82, 178, 191)
            doc.text('Top Performing Content', margin, yPos)
            yPos += 8

            doc.setFontSize(10)
            doc.setTextColor(0, 0, 0)
            doc.setFont('helvetica', 'normal')

            topContent.forEach((content, i) => {
                doc.text(`${i + 1}. ${content.title}`, margin, yPos)
                doc.text(`${content.views.toLocaleString()} views`, pageWidth - margin - 30, yPos)
                yPos += 6
            })

            // Footer
            doc.setFontSize(8)
            doc.setTextColor(128, 128, 128)
            doc.text('© 2025 AI Marketing Platform - Confidential Report', pageWidth / 2, pageHeight - 10, { align: 'center' })

            // Save
            const fileName = `Analytics_Report_${dateRange}days_${new Date().toISOString().split('T')[0]}.pdf`
            doc.save(fileName)

            toast.success('PDF Report downloaded successfully!')

        } catch (error) {
            console.error('Error generating PDF:', error)
            toast.error(`Error: ${error.message}`)
        }
    }

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex items-center justify-center h-64">
                    <RefreshCw className="animate-spin text-primary-500" size={32} />
                    <span className="ml-3 text-gray-600">Loading reporting data...</span>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Automated Client Reporting</h1>
                    <p className="text-gray-600">Real-time analytics and performance metrics</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => { fetchReportingData(); refreshBalance(); }}
                        className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors"
                    >
                        <RefreshCw size={16} />
                        Refresh
                    </button>
                    <button
                        onClick={exportReport}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${canAccessReporting
                            ? 'bg-primary-400 text-white hover:bg-primary-500 hover:shadow-lg'
                            : 'bg-gray-300 text-gray-600 cursor-not-allowed hover:bg-gray-400'
                            }`}
                    >
                        {canAccessReporting ? <Download size={16} /> : <Lock size={16} />}
                        Export PDF
                    </button>
                </div>
            </div>

            {/* Token Balance Card */}
            {tokenBalance && (
                <div className="bg-gradient-to-r from-primary-400 to-primary-500 rounded-xl p-6 mb-8 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold mb-1">Token Balance</h3>
                            <p className="text-3xl font-bold">{tokenBalance.current.toLocaleString()} <span className="text-lg font-normal opacity-80">tokens remaining</span></p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm opacity-80">Used this period</p>
                            <p className="text-xl font-semibold">{tokenBalance.used.toLocaleString()} / {tokenBalance.total.toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="w-full bg-white/20 rounded-full h-3">
                            <div
                                className="bg-white h-3 rounded-full transition-all duration-500"
                                style={{ width: `${Math.min(tokenBalance.percentage, 100)}%` }}
                            />
                        </div>
                        <p className="text-sm mt-2 opacity-80">{tokenBalance.percentage}% of monthly limit used</p>
                    </div>
                </div>
            )}

            {/* Upgrade Modal for PDF Export */}
            {showUpgradeModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    onClick={() => setShowUpgradeModal(false)}
                >
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
                    <div
                        className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="text-center">
                            <div className="flex justify-center mb-4">
                                <div className="bg-gradient-to-r from-primary-400 to-primary-500 p-4 rounded-full">
                                    <Lock className="text-white" size={32} />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                PDF Export Locked
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Upgrade to Advanced or Premium plan to export detailed analytics reports as PDF
                            </p>
                            <div className="space-y-3">
                                <a
                                    href="/pricing"
                                    className="block w-full bg-gradient-to-r from-primary-400 to-primary-500 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all"
                                >
                                    View Pricing Plans
                                </a>
                                <button
                                    onClick={() => setShowUpgradeModal(false)}
                                    className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="mb-6 flex gap-4">
                <div className="flex items-center gap-2">
                    <Calendar size={18} />
                    <select
                        value={dateRange}
                        onChange={e => setDateRange(e.target.value)}
                        className="px-3 py-2 border rounded-md"
                    >
                        <option value="7">Last 7 days</option>
                        <option value="30">Last 30 days</option>
                        <option value="90">Last 90 days</option>
                    </select>
                </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4 mb-8">
                {metrics.map(metric => {
                    const Icon = metric.icon
                    return (
                        <div key={metric.label} className="bg-white p-6 rounded-lg shadow-sm border">
                            <div className="flex items-center gap-3 mb-2">
                                <div className={`p-2 rounded bg-${metric.color}-100`}>
                                    <Icon className={`text-${metric.color}-500`} size={20} />
                                </div>
                                <p className="text-sm text-gray-600">{metric.label}</p>
                            </div>
                            <p className="text-3xl font-bold mb-2">{metric.value}</p>
                            <p className={`text-sm ${metric.positive ? 'text-green-600' : 'text-red-600'}`}>
                                {metric.change}
                            </p>
                        </div>
                    )
                })}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h2 className="text-xl font-semibold mb-4">Daily Activity</h2>
                    <div className="h-64 flex items-end justify-between gap-2">
                        {(reportData?.dailyMetrics || []).slice(-14).map((day, i) => {
                            const maxTokens = Math.max(...(reportData?.dailyMetrics || []).map(d => d.tokens)) || 1
                            const height = (day.tokens / maxTokens) * 100
                            return (
                                <div
                                    key={i}
                                    className="flex-1 bg-primary-400 rounded-t hover:bg-primary-500 transition-colors cursor-pointer"
                                    style={{ height: `${Math.max(height, 5)}%` }}
                                    title={`${day.date}: ${day.tokens} tokens, ${day.content} content`}
                                />
                            )
                        })}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-500">
                        <span>14 days ago</span>
                        <span>Today</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h2 className="text-xl font-semibold mb-4">Traffic Sources</h2>
                    <div className="space-y-4">
                        {trafficData.map(item => (
                            <div key={item.source}>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium">{item.source}</span>
                                    <span className="text-sm text-gray-600">{item.count.toLocaleString()}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-primary-400 h-2 rounded-full"
                                        style={{ width: `${item.percentage}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {canAccessReporting ? (
                    <>
                        <div className="bg-white p-6 rounded-lg shadow-sm border">
                            <h2 className="text-xl font-semibold mb-4">Conversion Funnel</h2>
                            <div className="space-y-3">
                                {conversionFunnel.map(stage => (
                                    <div key={stage.stage}>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm font-medium">{stage.stage}</span>
                                            <span className="text-sm text-gray-600">{stage.count.toLocaleString()} ({stage.percentage}%)</span>
                                        </div>
                                        <div className="bg-gradient-to-r from-primary-400 to-primary-500 rounded"
                                            style={{ width: `${stage.percentage}%`, height: '32px' }} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm border">
                            <h2 className="text-xl font-semibold mb-4">Top Performing Content</h2>
                            <div className="space-y-3">
                                {topContent.length > 0 ? topContent.map((content, i) => (
                                    <div key={i} className="flex justify-between items-center p-3 border rounded">
                                        <span className="text-sm font-medium truncate max-w-[200px]">{content.title}</span>
                                        <span className="text-sm text-gray-600">{content.views.toLocaleString()} views</span>
                                    </div>
                                )) : (
                                    <p className="text-gray-500 text-center py-4">No content created yet. Start creating to see performance!</p>
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="relative">
                            <LockedFeature
                                title="Advanced Analytics & Reporting"
                                description="Unlock conversion funnels, content performance tracking, and detailed analytics"
                                requiredPlan="Advanced or Premium"
                            >
                                <div className="bg-white p-6 rounded-lg shadow-sm border">
                                    <h2 className="text-xl font-semibold mb-4">Conversion Funnel</h2>
                                    <div className="space-y-3">
                                        {[100, 75, 50, 25].map((width, i) => (
                                            <div key={i}>
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-sm font-medium">Stage {i + 1}</span>
                                                    <span className="text-sm text-gray-600">0</span>
                                                </div>
                                                <div className="bg-gradient-to-r from-primary-400 to-primary-500 rounded"
                                                    style={{ width: `${width}%`, height: '32px' }} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </LockedFeature>
                        </div>

                        <div className="relative">
                            <LockedFeature
                                title="Content Performance Insights"
                                description="Track your top performing content and optimize your strategy"
                                requiredPlan="Advanced or Premium"
                                blur={false}
                            >
                                <div className="bg-white p-6 rounded-lg shadow-sm border">
                                    <h2 className="text-xl font-semibold mb-4">Top Performing Content</h2>
                                    <div className="space-y-3">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div key={i} className="flex justify-between items-center p-3 border rounded">
                                                <span className="text-sm font-medium">Content Title {i}</span>
                                                <span className="text-sm text-gray-600">0 views</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </LockedFeature>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
