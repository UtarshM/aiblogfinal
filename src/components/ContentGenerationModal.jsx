/**
 * Content Generation Modal - Advanced Configuration
 * @author Scalezix Venture PVT LTD
 * @copyright 2025 Scalezix Venture PVT LTD. All Rights Reserved.
 */

import { useState } from 'react'
import { X, FileText, Image, Target, Zap, BookOpen } from 'lucide-react'

export default function ContentGenerationModal({ isOpen, onClose, onGenerate }) {
    const [formData, setFormData] = useState({
        topic: '',
        minWords: '5000', // Changed from wordCount to minWords, default 5000
        numImages: '4',
        tone: 'conversational',
        targetAudience: 'general',
        includeStats: true,
        // Excel data fields (optional)
        headings: '',
        keywords: '',
        references: '',
        eeat: ''
    })

    if (!isOpen) return null

    const handleSubmit = (e) => {
        e.preventDefault()
        onGenerate(formData)
        onClose()
    }

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-t-2xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">AI Content Generation</h2>
                            <p className="text-purple-100 text-sm mt-1">Configure your perfect content</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Topic */}
                    <div>
                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                            <FileText size={20} className="text-purple-600" />
                            Content Topic *
                        </label>
                        <input
                            type="text"
                            value={formData.topic}
                            onChange={(e) => handleChange('topic', e.target.value)}
                            placeholder="e.g., Digital Marketing Strategies"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none transition-colors"
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">What topic would you like to write about?</p>
                    </div>

                    {/* Word Count */}
                    <div>
                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                            <BookOpen size={20} className="text-blue-600" />
                            Minimum Word Count *
                        </label>
                        <div className="grid grid-cols-4 gap-2 mb-2">
                            {['3000', '5000', '7500', '10000'].map(count => (
                                <button
                                    key={count}
                                    type="button"
                                    onClick={() => handleChange('minWords', count)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all ${formData.minWords === count
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {parseInt(count).toLocaleString()}
                                </button>
                            ))}
                        </div>
                        <input
                            type="number"
                            value={formData.minWords}
                            onChange={(e) => handleChange('minWords', e.target.value)}
                            min="1000"
                            max="15000"
                            step="500"
                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                        />
                        <p className="text-xs text-gray-500 mt-1">Deep dive articles: 5,000-10,000+ words recommended</p>
                    </div>

                    {/* Custom Headings (Optional) */}
                    <div>
                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                            <FileText size={20} className="text-indigo-600" />
                            Custom Headings (Optional)
                        </label>
                        <textarea
                            value={formData.headings}
                            onChange={(e) => handleChange('headings', e.target.value)}
                            placeholder="Enter headings separated by | or new lines:&#10;Why This Matters | Getting Started | Advanced Tips | Parting Thoughts"
                            rows={3}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none transition-colors"
                        />
                        <p className="text-xs text-gray-500 mt-1">Leave empty to auto-generate headings</p>
                    </div>

                    {/* Keywords (Optional) */}
                    <div>
                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                            <Target size={20} className="text-orange-600" />
                            SEO Keywords (Optional)
                        </label>
                        <input
                            type="text"
                            value={formData.keywords}
                            onChange={(e) => handleChange('keywords', e.target.value)}
                            placeholder="e.g., digital marketing, SEO tips, content strategy"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-600 focus:outline-none transition-colors"
                        />
                        <p className="text-xs text-gray-500 mt-1">Comma-separated keywords to include naturally</p>
                    </div>

                    {/* Number of Images */}
                    <div>
                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                            <Image size={20} className="text-pink-600" />
                            Number of Images *
                        </label>
                        <div className="grid grid-cols-5 gap-2">
                            {['2', '3', '4', '5', '6'].map(num => (
                                <button
                                    key={num}
                                    type="button"
                                    onClick={() => handleChange('numImages', num)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all ${formData.numImages === num
                                        ? 'bg-pink-600 text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">How many images to include in the content</p>
                    </div>

                    {/* Tone */}
                    <div>
                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                            <Zap size={20} className="text-yellow-600" />
                            Writing Tone *
                        </label>
                        <select
                            value={formData.tone}
                            onChange={(e) => handleChange('tone', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-600 focus:outline-none transition-colors"
                        >
                            <option value="conversational">Conversational (Friendly & Casual)</option>
                            <option value="professional">Professional (Business & Formal)</option>
                            <option value="educational">Educational (Informative & Clear)</option>
                            <option value="persuasive">Persuasive (Convincing & Engaging)</option>
                            <option value="storytelling">Storytelling (Narrative & Emotional)</option>
                        </select>
                        <p className="text-xs text-gray-500 mt-1">Choose the writing style and tone</p>
                    </div>

                    {/* Target Audience */}
                    <div>
                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                            <Target size={20} className="text-green-600" />
                            Target Audience *
                        </label>
                        <select
                            value={formData.targetAudience}
                            onChange={(e) => handleChange('targetAudience', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none transition-colors"
                        >
                            <option value="general">General Audience</option>
                            <option value="beginners">Beginners (No Prior Knowledge)</option>
                            <option value="intermediate">Intermediate (Some Experience)</option>
                            <option value="experts">Experts (Advanced Knowledge)</option>
                            <option value="business">Business Professionals</option>
                            <option value="students">Students & Learners</option>
                        </select>
                        <p className="text-xs text-gray-500 mt-1">Who is this content for?</p>
                    </div>

                    {/* Include Statistics */}
                    <div>
                        <label className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                checked={formData.includeStats}
                                onChange={(e) => handleChange('includeStats', e.target.checked)}
                                className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                            />
                            <span className="text-gray-700 font-medium">
                                Include Statistics & Data Points
                            </span>
                        </label>
                        <p className="text-xs text-gray-500 mt-1 ml-8">Add relevant statistics and research data to support the content</p>
                    </div>

                    {/* Summary Box */}
                    <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-4 rounded-lg border-2 border-purple-200">
                        <h3 className="font-semibold text-purple-900 mb-2">📋 Generation Summary</h3>
                        <div className="text-sm text-purple-800 space-y-1">
                            <p>• Topic: <span className="font-medium">{formData.topic || 'Not specified'}</span></p>
                            <p>• Length: <span className="font-medium">{parseInt(formData.minWords).toLocaleString()}+ words</span></p>
                            <p>• Images: <span className="font-medium">{formData.numImages} images</span></p>
                            <p>• Tone: <span className="font-medium capitalize">{formData.tone}</span></p>
                            <p>• Audience: <span className="font-medium capitalize">{formData.targetAudience.replace('-', ' ')}</span></p>
                            {formData.headings && <p>• Custom Headings: <span className="font-medium">Yes</span></p>}
                            {formData.keywords && <p>• Keywords: <span className="font-medium">Yes</span></p>}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!formData.topic.trim()}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
                        >
                            Generate Content
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

/* Copyright © 2025 Scalezix Venture PVT LTD - All Rights Reserved */
