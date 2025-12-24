/**
 * SEO Automation & Optimization Tool - Professional Edition
 * Real website analysis with Excel export
 * @author Scalezix Venture PVT LTD
 * @copyright 2025 Scalezix Venture PVT LTD. All Rights Reserved.
 */

import { useState } from 'react'
import { Search, TrendingUp, AlertCircle, Download, Loader2, ExternalLink, CheckCircle, XCircle, AlertTriangle, Globe, FileText, Link as LinkIcon, Image as ImageIcon, Zap } from 'lucide-react'
import { api } from '../api/client'

export default function SEOAutomation() {
    const [activeTab, setActiveTab] = useState('keywords')
    const [keyword, setKeyword] = useState('')
    const [url, setUrl] = useState('')
    const [competitorUrl, setCompetitorUrl] = useState('')
    const [results, setResults] = useState(null)
    const [loading, setLoading] = useState(false)
    const [history, setHistory] = useState([])
    const [showToast, setShowToast] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    const [toastType, setToastType] = useState('success')

    const showNotification = (message, type = 'success') => {
        setToastMessage(message)
        setToastType(type)
        setShowToast(true)
        setTimeout(() => setShowToast(false), 3000)
    }

    const analyzeKeywords = async () => {
        if (!keyword.trim()) {
            showNotification('Please enter a keyword', 'error')
            return
        }

        setLoading(true)
        try {
            const data = await api.analyzeKeywords(keyword)
            setResults(data)

            setHistory([{
                type: 'keyword',
                query: keyword,
                date: new Date().toLocaleString(),
                results: data.keywords?.length || 0
            }, ...history.slice(0, 9)])

            showNotification(`Found ${data.keywords?.length || 0} related keywords!`, 'success')
        } catch (error) {
            console.error('Error analyzing keywords:', error)
            showNotification('Error analyzing keywords. Please try again.', 'error')
        } finally {
            setLoading(false)
        }
    }

    const analyzePage = async () => {
        if (!url.trim()) {
            showNotification('Please enter a URL', 'error')
            return
        }

        setLoading(true)
        try {
            const data = await api.analyzePage(url, keyword)
            setResults(data)

            setHistory([{
                type: 'page',
                query: url,
                date: new Date().toLocaleString(),
                score: data.seo?.score || 0
            }, ...history.slice(0, 9)])

            showNotification(`SEO Score: ${data.seo?.score || 0}/100`, 'success')
        } catch (error) {
            console.error('Error analyzing page:', error)
            showNotification('Error analyzing page. Please try again.', 'error')
        } finally {
            setLoading(false)
        }
    }

    const analyzeCompetitor = async () => {
        if (!url.trim() || !competitorUrl.trim()) {
            showNotification('Please enter both URLs', 'error')
            return
        }

        setLoading(true)
        try {
            const data = await api.compareCompetitors(url, competitorUrl, keyword)
            setResults(data)
            showNotification('Competitor analysis complete!', 'success')
        } catch (error) {
            console.error('Error comparing competitors:', error)
            showNotification('Error comparing competitors. Please try again.', 'error')
        } finally {
            setLoading(false)
        }
    }

    const exportToExcel = () => {
        if (!results) {
            showNotification('No data to export', 'error')
            return
        }

        let csvContent = '\uFEFF' // UTF-8 BOM for Excel

        if (activeTab === 'keywords' && results.keywords) {
            csvContent += 'SEO Keyword Research Report\n'
            csvContent += `Generated: ${new Date().toLocaleString()}\n`
            csvContent += `Target Keyword: ${keyword}\n\n`
            csvContent += 'Keyword,Search Volume,Difficulty,CPC,Competition,Opportunity Score\n'

            results.keywords.forEach(kw => {
                const competition = kw.difficulty < 40 ? 'Low' : kw.difficulty < 60 ? 'Medium' : 'High'
                const opportunity = Math.round((kw.volume / 1000) * (100 - kw.difficulty) / 10)
                csvContent += `"${kw.term}",${kw.volume},${kw.difficulty},$${kw.cpc},${competition},${opportunity}\n`
            })

            csvContent += '\n\nKeyword Insights:\n'
            csvContent += '"Low Difficulty (0-40)","Easier to rank good for new sites"\n'
            csvContent += '"Medium Difficulty (40-60)","Moderate competition requires quality content"\n'
            csvContent += '"High Difficulty (60-100)","Very competitive needs strong authority"\n'

        } else if (activeTab === 'onpage' && results.seo) {
            csvContent += 'SEO Analysis Report\n'
            csvContent += `Generated: ${new Date().toLocaleString()}\n\n`
            csvContent += `URL,"${url}"\n`
            csvContent += `Target Keyword,"${keyword || 'N/A'}"\n`
            csvContent += `Overall SEO Score,${results.seo.score}/100\n\n`

            if (results.seo.details) {
                csvContent += 'Page Details\n'
                csvContent += `Title,"${results.seo.details.title || 'N/A'}"\n`
                csvContent += `Title Length,${results.seo.details.titleLength || 0} characters\n`
                csvContent += `Meta Description,"${results.seo.details.metaDescription || 'N/A'}"\n`
                csvContent += `Meta Description Length,${results.seo.details.metaDescriptionLength || 0} characters\n`
                csvContent += `H1 Count,${results.seo.details.h1Count || 0}\n`
                csvContent += `H2 Count,${results.seo.details.h2Count || 0}\n`
                csvContent += `Word Count,${results.seo.details.wordCount || 0}\n`
                csvContent += `Images,${results.seo.details.imageCount || 0}\n`
                csvContent += `Images Without Alt,${results.seo.details.imagesWithoutAlt || 0}\n`
                csvContent += `Internal Links,${results.seo.details.internalLinks || 0}\n`
                csvContent += `External Links,${results.seo.details.externalLinks || 0}\n`
                if (results.seo.details.keywordDensity) {
                    csvContent += `Keyword Density,${results.seo.details.keywordDensity}%\n`
                }
                csvContent += '\n'
            }

            csvContent += 'Issues & Findings\n'
            csvContent += 'Type,Description\n'
            results.seo.issues?.forEach(issue => {
                csvContent += `${issue.type},"${issue.text}"\n`
            })

            if (results.seo.recommendations && results.seo.recommendations.length > 0) {
                csvContent += '\nRecommendations\n'
                results.seo.recommendations.forEach((rec, i) => {
                    csvContent += `${i + 1},"${rec}"\n`
                })
            }

        } else if (activeTab === 'competitor' && results.comparison) {
            csvContent += 'Competitor Comparison Report\n'
            csvContent += `Generated: ${new Date().toLocaleString()}\n\n`
            csvContent += `Your URL,"${url}"\n`
            csvContent += `Competitor URL,"${competitorUrl}"\n`
            csvContent += `Target Keyword,"${keyword || 'N/A'}"\n\n`

            csvContent += 'Comparison Metrics\n'
            csvContent += 'Metric,Your Site,Competitor,Winner\n'
            csvContent += `SEO Score,${results.comparison.seoScore.yours},${results.comparison.seoScore.competitor},${results.comparison.seoScore.winner}\n`
            csvContent += `Word Count,${results.comparison.wordCount.yours},${results.comparison.wordCount.competitor},${results.comparison.wordCount.winner}\n`
            csvContent += `Internal Links,${results.comparison.internalLinks.yours},${results.comparison.internalLinks.competitor},${results.comparison.internalLinks.winner}\n`
            csvContent += `Images,${results.comparison.images.yours},${results.comparison.images.competitor},-\n`

            if (results.comparison.keywordDensity) {
                csvContent += `Keyword Density,${results.comparison.keywordDensity.yours}%,${results.comparison.keywordDensity.competitor}%,-\n`
            }

            if (results.recommendations && results.recommendations.length > 0) {
                csvContent += '\nRecommendations\n'
                results.recommendations.forEach((rec, i) => {
                    csvContent += `${i + 1},"${rec}"\n`
                })
            }
        }

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement('a')
        const timestamp = new Date().toISOString().split('T')[0]
        const filename = activeTab === 'keywords'
            ? `keyword-research-${keyword.replace(/\s+/g, '-')}-${timestamp}.csv`
            : activeTab === 'competitor'
                ? `competitor-analysis-${timestamp}.csv`
                : `seo-analysis-${timestamp}.csv`

        link.href = URL.createObjectURL(blob)
        link.download = filename
        link.click()
        showNotification('Excel report exported successfully!', 'success')
    }

    return (
        <>
            {/* Toast Notification */}
            {showToast && (
                <div className="fixed top-4 right-4 z-50 animate-slide-in">
                    <div className={`px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 ${toastType === 'success' ? 'bg-green-600 text-white' :
                        toastType === 'error' ? 'bg-red-600 text-white' :
                            'bg-primary-400 text-white'
                        }`}>
                        {toastType === 'success' && <CheckCircle size={20} />}
                        {toastType === 'error' && <XCircle size={20} />}
                        <span>{toastMessage}</span>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">SEO Automation & Optimization</h1>
                        <p className="text-gray-600">Professional SEO analysis with real website data & Excel export</p>
                    </div>
                    {results && (
                        <button
                            onClick={exportToExcel}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                        >
                            <Download size={16} />
                            Export to Excel
                        </button>
                    )}
                </div>

                <div className="bg-white rounded-lg shadow-sm border">
                    <div className="flex border-b overflow-x-auto">
                        <button
                            onClick={() => setActiveTab('keywords')}
                            className={`px-6 py-3 font-medium whitespace-nowrap ${activeTab === 'keywords'
                                ? 'border-b-2 border-primary-400 text-primary-500'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <Search className="inline mr-2" size={16} />
                            Keyword Research
                        </button>
                        <button
                            onClick={() => setActiveTab('onpage')}
                            className={`px-6 py-3 font-medium whitespace-nowrap ${activeTab === 'onpage'
                                ? 'border-b-2 border-primary-400 text-primary-500'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <TrendingUp className="inline mr-2" size={16} />
                            On-Page SEO
                        </button>
                        <button
                            onClick={() => setActiveTab('competitor')}
                            className={`px-6 py-3 font-medium whitespace-nowrap ${activeTab === 'competitor'
                                ? 'border-b-2 border-primary-400 text-primary-500'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <Globe className="inline mr-2" size={16} />
                            Competitor Analysis
                        </button>
                        <button
                            onClick={() => setActiveTab('history')}
                            className={`px-6 py-3 font-medium whitespace-nowrap ${activeTab === 'history'
                                ? 'border-b-2 border-primary-400 text-primary-500'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <FileText className="inline mr-2" size={16} />
                            History
                        </button>
                    </div>

                    <div className="p-6">
                        {/* KEYWORD RESEARCH TAB */}
                        {activeTab === 'keywords' && (
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Enter Keyword or Topic</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={keyword}
                                            onChange={e => setKeyword(e.target.value)}
                                            onKeyDown={e => e.key === 'Enter' && analyzeKeywords()}
                                            placeholder="e.g., digital marketing, SEO tools, content strategy"
                                            className="flex-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                                            disabled={loading}
                                        />
                                        <button
                                            onClick={analyzeKeywords}
                                            disabled={loading}
                                            className="flex items-center gap-2 px-6 py-2 bg-primary-400 text-white rounded-md hover:bg-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            {loading ? <Loader2 className="animate-spin" size={16} /> : <Search size={16} />}
                                            {loading ? 'Analyzing...' : 'Analyze'}
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">
                                        💡 Get search volume, difficulty, CPC, and related keywords powered by AI
                                    </p>
                                </div>

                                {results?.keywords && (
                                    <div>
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-lg font-semibold">Keyword Analysis Results</h3>
                                            <span className="text-sm text-gray-600">{results.keywords.length} keywords found</span>
                                        </div>

                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Keyword</th>
                                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Search Volume</th>
                                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Difficulty</th>
                                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">CPC</th>
                                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Competition</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y">
                                                    {results.keywords.map((kw, i) => (
                                                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                                                            <td className="px-4 py-3 font-medium">{kw.term}</td>
                                                            <td className="px-4 py-3">
                                                                <span className="text-primary-500 font-semibold">{kw.volume.toLocaleString()}</span>
                                                                <span className="text-gray-500 text-sm">/month</span>
                                                            </td>
                                                            <td className="px-4 py-3">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                                                                        <div
                                                                            className={`h-2 rounded-full transition-all ${kw.difficulty < 40 ? 'bg-green-500' :
                                                                                kw.difficulty < 60 ? 'bg-yellow-500' :
                                                                                    'bg-red-500'
                                                                                }`}
                                                                            style={{ width: `${kw.difficulty}%` }}
                                                                        />
                                                                    </div>
                                                                    <span className={`px-2 py-1 text-xs rounded font-medium ${kw.difficulty < 40 ? 'bg-green-100 text-green-700' :
                                                                        kw.difficulty < 60 ? 'bg-yellow-100 text-yellow-700' :
                                                                            'bg-red-100 text-red-700'
                                                                        }`}>
                                                                        {kw.difficulty}
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td className="px-4 py-3 font-semibold text-green-600">${kw.cpc}</td>
                                                            <td className="px-4 py-3">
                                                                <span className={`px-2 py-1 text-xs rounded font-medium ${kw.difficulty < 40 ? 'bg-green-100 text-green-700' :
                                                                    kw.difficulty < 60 ? 'bg-yellow-100 text-yellow-700' :
                                                                        'bg-red-100 text-red-700'
                                                                    }`}>
                                                                    {kw.difficulty < 40 ? 'Low' : kw.difficulty < 60 ? 'Medium' : 'High'}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="mt-6 p-4 bg-primary-50 rounded-lg border border-blue-200">
                                            <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                                                <Zap size={18} />
                                                Keyword Insights
                                            </h4>
                                            <ul className="text-sm text-blue-800 space-y-1">
                                                <li>• <strong>Low Difficulty (0-40):</strong> Easier to rank, ideal for new websites</li>
                                                <li>• <strong>Medium Difficulty (40-60):</strong> Moderate competition, requires quality content</li>
                                                <li>• <strong>High Difficulty (60-100):</strong> Very competitive, needs strong domain authority</li>
                                                <li>• <strong>High CPC:</strong> Indicates commercial intent and potential value</li>
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* ON-PAGE SEO TAB */}
                        {activeTab === 'onpage' && (
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Website URL to Analyze</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="url"
                                            value={url}
                                            onChange={e => setUrl(e.target.value)}
                                            onKeyDown={e => e.key === 'Enter' && analyzePage()}
                                            placeholder="https://example.com/page"
                                            className="flex-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                                            disabled={loading}
                                        />
                                        <button
                                            onClick={analyzePage}
                                            disabled={loading}
                                            className="flex items-center gap-2 px-6 py-2 bg-primary-400 text-white rounded-md hover:bg-primary-500 disabled:opacity-50 transition-colors"
                                        >
                                            {loading ? <Loader2 className="animate-spin" size={16} /> : <TrendingUp size={16} />}
                                            {loading ? 'Analyzing...' : 'Analyze'}
                                        </button>
                                    </div>
                                    <div className="mt-2">
                                        <label className="block text-sm font-medium mb-1">Target Keyword (Optional)</label>
                                        <input
                                            type="text"
                                            value={keyword}
                                            onChange={e => setKeyword(e.target.value)}
                                            placeholder="e.g., digital marketing"
                                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                                            disabled={loading}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">
                                        💡 Real website analysis: title, meta, headings, content, images, links & more
                                    </p>
                                </div>

                                {results?.seo && (
                                    <div className="space-y-6">
                                        {/* SEO Score Card */}
                                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
                                            <div className="flex items-center justify-between mb-4">
                                                <div>
                                                    <h3 className="text-lg font-semibold mb-1">Overall SEO Score</h3>
                                                    <p className="text-sm text-gray-600">Based on comprehensive analysis</p>
                                                </div>
                                                <div className="text-center">
                                                    <div className={`text-5xl font-bold ${results.seo.score >= 80 ? 'text-green-600' :
                                                        results.seo.score >= 60 ? 'text-yellow-600' :
                                                            'text-red-600'
                                                        }`}>{results.seo.score}</div>
                                                    <div className="text-sm text-gray-600">/100</div>
                                                </div>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-4">
                                                <div
                                                    className={`h-4 rounded-full transition-all ${results.seo.score >= 80 ? 'bg-green-500' :
                                                        results.seo.score >= 60 ? 'bg-yellow-500' :
                                                            'bg-red-500'
                                                        }`}
                                                    style={{ width: `${results.seo.score}%` }}
                                                />
                                            </div>
                                            <div className="mt-3 flex justify-between text-xs text-gray-600">
                                                <span>Poor (0-40)</span>
                                                <span>Fair (40-60)</span>
                                                <span>Good (60-80)</span>
                                                <span>Excellent (80-100)</span>
                                            </div>
                                        </div>

                                        {/* URL Info */}
                                        <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg border">
                                            <ExternalLink size={20} className="text-gray-600" />
                                            <div className="flex-1">
                                                <p className="text-sm text-gray-600">Analyzed URL</p>
                                                <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline font-medium break-all">
                                                    {url}
                                                </a>
                                            </div>
                                            <span className="text-xs text-gray-500">{new Date().toLocaleString()}</span>
                                        </div>

                                        {/* Page Details Grid */}
                                        {results.seo.details && (
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                <div className="p-4 bg-white border rounded-lg">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <FileText size={18} className="text-primary-500" />
                                                        <span className="text-sm text-gray-600">Word Count</span>
                                                    </div>
                                                    <div className="text-2xl font-bold">{results.seo.details.wordCount || 0}</div>
                                                </div>
                                                <div className="p-4 bg-white border rounded-lg">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <ImageIcon size={18} className="text-green-600" />
                                                        <span className="text-sm text-gray-600">Images</span>
                                                    </div>
                                                    <div className="text-2xl font-bold">{results.seo.details.imageCount || 0}</div>
                                                    {results.seo.details.imagesWithoutAlt > 0 && (
                                                        <div className="text-xs text-red-600 mt-1">{results.seo.details.imagesWithoutAlt} without alt</div>
                                                    )}
                                                </div>
                                                <div className="p-4 bg-white border rounded-lg">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <LinkIcon size={18} className="text-primary-500" />
                                                        <span className="text-sm text-gray-600">Internal Links</span>
                                                    </div>
                                                    <div className="text-2xl font-bold">{results.seo.details.internalLinks || 0}</div>
                                                </div>
                                                <div className="p-4 bg-white border rounded-lg">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <ExternalLink size={18} className="text-orange-600" />
                                                        <span className="text-sm text-gray-600">External Links</span>
                                                    </div>
                                                    <div className="text-2xl font-bold">{results.seo.details.externalLinks || 0}</div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Page Title & Meta */}
                                        {results.seo.details && (
                                            <div className="space-y-3">
                                                <div className="p-4 bg-white border rounded-lg">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <span className="text-sm font-medium text-gray-700">Page Title</span>
                                                        <span className={`text-xs px-2 py-1 rounded ${results.seo.details.titleLength >= 50 && results.seo.details.titleLength <= 60
                                                            ? 'bg-green-100 text-green-700'
                                                            : 'bg-yellow-100 text-yellow-700'
                                                            }`}>
                                                            {results.seo.details.titleLength} chars
                                                        </span>
                                                    </div>
                                                    <p className="text-sm">{results.seo.details.title || 'No title found'}</p>
                                                </div>
                                                <div className="p-4 bg-white border rounded-lg">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <span className="text-sm font-medium text-gray-700">Meta Description</span>
                                                        <span className={`text-xs px-2 py-1 rounded ${results.seo.details.metaDescriptionLength >= 150 && results.seo.details.metaDescriptionLength <= 160
                                                            ? 'bg-green-100 text-green-700'
                                                            : 'bg-yellow-100 text-yellow-700'
                                                            }`}>
                                                            {results.seo.details.metaDescriptionLength} chars
                                                        </span>
                                                    </div>
                                                    <p className="text-sm">{results.seo.details.metaDescription || 'No meta description found'}</p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Issues & Findings */}
                                        <div>
                                            <h3 className="text-lg font-semibold mb-4">Issues & Findings</h3>
                                            <div className="space-y-3">
                                                {results.seo.issues?.map((issue, i) => (
                                                    <div
                                                        key={i}
                                                        className={`flex items-start gap-3 p-4 rounded-lg border-l-4 ${issue.type === 'error' ? 'bg-red-50 border-red-500' :
                                                            issue.type === 'warning' ? 'bg-yellow-50 border-yellow-500' :
                                                                'bg-green-50 border-green-500'
                                                            }`}
                                                    >
                                                        {issue.type === 'error' ? (
                                                            <XCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                                                        ) : issue.type === 'warning' ? (
                                                            <AlertTriangle size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                                                        ) : (
                                                            <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                                                        )}
                                                        <div className="flex-1">
                                                            <p className={`font-medium ${issue.type === 'error' ? 'text-red-900' :
                                                                issue.type === 'warning' ? 'text-yellow-900' :
                                                                    'text-green-900'
                                                                }`}>
                                                                {issue.type === 'error' ? 'Critical Issue' :
                                                                    issue.type === 'warning' ? 'Warning' :
                                                                        'Good Practice'}
                                                            </p>
                                                            <p className="text-sm mt-1">{issue.text}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Recommendations */}
                                        {results.seo.recommendations && results.seo.recommendations.length > 0 && (
                                            <div className="bg-primary-50 p-6 rounded-lg border border-blue-200">
                                                <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
                                                    <Zap size={20} />
                                                    Action Items to Improve SEO
                                                </h3>
                                                <ul className="space-y-2">
                                                    {results.seo.recommendations.map((rec, i) => (
                                                        <li key={i} className="flex items-start gap-2 text-blue-800">
                                                            <span className="text-primary-500 font-bold flex-shrink-0">{i + 1}.</span>
                                                            <span>{rec}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* COMPETITOR ANALYSIS TAB */}
                        {activeTab === 'competitor' && (
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Your Website URL</label>
                                        <input
                                            type="url"
                                            value={url}
                                            onChange={e => setUrl(e.target.value)}
                                            placeholder="https://yourwebsite.com"
                                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                                            disabled={loading}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Competitor Website URL</label>
                                        <input
                                            type="url"
                                            value={competitorUrl}
                                            onChange={e => setCompetitorUrl(e.target.value)}
                                            placeholder="https://competitor.com"
                                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                                            disabled={loading}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Target Keyword (Optional)</label>
                                        <input
                                            type="text"
                                            value={keyword}
                                            onChange={e => setKeyword(e.target.value)}
                                            placeholder="e.g., digital marketing"
                                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                                            disabled={loading}
                                        />
                                    </div>
                                    <button
                                        onClick={analyzeCompetitor}
                                        disabled={loading}
                                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary-400 text-white rounded-md hover:bg-primary-500 disabled:opacity-50 transition-colors"
                                    >
                                        {loading ? <Loader2 className="animate-spin" size={16} /> : <Globe size={16} />}
                                        {loading ? 'Comparing...' : 'Compare Websites'}
                                    </button>
                                    <p className="text-xs text-gray-500">
                                        💡 Compare your website against competitors to identify strengths and weaknesses
                                    </p>
                                </div>

                                {results?.comparison && (
                                    <div className="space-y-6">
                                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
                                            <h3 className="text-lg font-semibold mb-4">Comparison Overview</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="p-4 bg-white rounded-lg border">
                                                    <div className="text-sm text-gray-600 mb-1">Your Website</div>
                                                    <div className="text-lg font-semibold text-primary-500 break-all">{url}</div>
                                                </div>
                                                <div className="p-4 bg-white rounded-lg border">
                                                    <div className="text-sm text-gray-600 mb-1">Competitor</div>
                                                    <div className="text-lg font-semibold text-red-600 break-all">{competitorUrl}</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Comparison Metrics */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold">Comparison Metrics</h3>

                                            {/* SEO Score */}
                                            <div className="p-4 bg-white border rounded-lg">
                                                <div className="flex justify-between items-center mb-3">
                                                    <span className="font-medium">SEO Score</span>
                                                    <span className={`px-3 py-1 rounded text-sm font-medium ${results.comparison.seoScore.winner === 'yours'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-red-100 text-red-700'
                                                        }`}>
                                                        {results.comparison.seoScore.winner === 'yours' ? '✓ You Win' : '✗ Competitor Wins'}
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <div className="text-sm text-gray-600">Your Score</div>
                                                        <div className="text-3xl font-bold text-primary-500">{results.comparison.seoScore.yours}</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm text-gray-600">Competitor Score</div>
                                                        <div className="text-3xl font-bold text-red-600">{results.comparison.seoScore.competitor}</div>
                                                    </div>
                                                </div>
                                                <div className="mt-3 text-sm text-gray-600">
                                                    Difference: <span className={results.comparison.seoScore.difference > 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                                                        {results.comparison.seoScore.difference > 0 ? '+' : ''}{results.comparison.seoScore.difference} points
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Word Count */}
                                            <div className="p-4 bg-white border rounded-lg">
                                                <div className="flex justify-between items-center mb-3">
                                                    <span className="font-medium">Content Length</span>
                                                    <span className={`px-3 py-1 rounded text-sm font-medium ${results.comparison.wordCount.winner === 'yours'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-red-100 text-red-700'
                                                        }`}>
                                                        {results.comparison.wordCount.winner === 'yours' ? '✓ You Win' : '✗ Competitor Wins'}
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <div className="text-sm text-gray-600">Your Word Count</div>
                                                        <div className="text-3xl font-bold text-primary-500">{results.comparison.wordCount.yours}</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm text-gray-600">Competitor Word Count</div>
                                                        <div className="text-3xl font-bold text-red-600">{results.comparison.wordCount.competitor}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Internal Links */}
                                            <div className="p-4 bg-white border rounded-lg">
                                                <div className="flex justify-between items-center mb-3">
                                                    <span className="font-medium">Internal Linking</span>
                                                    <span className={`px-3 py-1 rounded text-sm font-medium ${results.comparison.internalLinks.winner === 'yours'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-red-100 text-red-700'
                                                        }`}>
                                                        {results.comparison.internalLinks.winner === 'yours' ? '✓ You Win' : '✗ Competitor Wins'}
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <div className="text-sm text-gray-600">Your Internal Links</div>
                                                        <div className="text-3xl font-bold text-primary-500">{results.comparison.internalLinks.yours}</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm text-gray-600">Competitor Internal Links</div>
                                                        <div className="text-3xl font-bold text-red-600">{results.comparison.internalLinks.competitor}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Keyword Density */}
                                            {results.comparison.keywordDensity && (
                                                <div className="p-4 bg-white border rounded-lg">
                                                    <div className="flex justify-between items-center mb-3">
                                                        <span className="font-medium">Keyword Density for "{keyword}"</span>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <div className="text-sm text-gray-600">Your Density</div>
                                                            <div className="text-3xl font-bold text-primary-500">{results.comparison.keywordDensity.yours}%</div>
                                                        </div>
                                                        <div>
                                                            <div className="text-sm text-gray-600">Competitor Density</div>
                                                            <div className="text-3xl font-bold text-red-600">{results.comparison.keywordDensity.competitor}%</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Recommendations */}
                                        {results.recommendations && results.recommendations.length > 0 && (
                                            <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                                                <h3 className="text-lg font-semibold text-orange-900 mb-4 flex items-center gap-2">
                                                    <AlertTriangle size={20} />
                                                    Recommendations to Beat Your Competitor
                                                </h3>
                                                <ul className="space-y-2">
                                                    {results.recommendations.map((rec, i) => (
                                                        <li key={i} className="flex items-start gap-2 text-orange-800">
                                                            <span className="text-orange-600 font-bold flex-shrink-0">{i + 1}.</span>
                                                            <span>{rec}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* HISTORY TAB */}
                        {activeTab === 'history' && (
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Recent Analysis History</h3>
                                {history.length === 0 ? (
                                    <div className="text-center py-12 text-gray-500">
                                        <AlertCircle size={48} className="mx-auto mb-4 opacity-50" />
                                        <p className="font-medium">No analysis history yet</p>
                                        <p className="text-sm mt-2">Start analyzing keywords or pages to see your history here</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {history.map((item, i) => (
                                            <div key={i} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    {item.type === 'keyword' ? (
                                                        <div className="p-2 bg-primary-100 rounded-lg">
                                                            <Search size={20} className="text-primary-500" />
                                                        </div>
                                                    ) : (
                                                        <div className="p-2 bg-green-100 rounded-lg">
                                                            <TrendingUp size={20} className="text-green-600" />
                                                        </div>
                                                    )}
                                                    <div>
                                                        <p className="font-medium">{item.query}</p>
                                                        <p className="text-sm text-gray-600">{item.date}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    {item.type === 'keyword' ? (
                                                        <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded">
                                                            {item.results} keywords
                                                        </span>
                                                    ) : (
                                                        <span className={`px-3 py-1 rounded text-sm font-medium ${item.score >= 80 ? 'bg-green-100 text-green-700' :
                                                            item.score >= 60 ? 'bg-yellow-100 text-yellow-700' :
                                                                'bg-red-100 text-red-700'
                                                            }`}>
                                                            Score: {item.score}/100
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

/* Copyright © 2025 Scalezix Venture PVT LTD - All Rights Reserved */
