"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  FileText,
  Zap,
  BarChart3,
  Globe,
  Bot,
  Target,
  Sparkles,
  Shield,
  Clock,
  Languages,
  Layers,
  RefreshCw,
  CheckCircle,
  Workflow,
  PenTool,
  Search,
  Share2,
} from "lucide-react";

const mainFeatures = [
  {
    icon: Bot,
    title: "Advanced AI Content Generation",
    description: "Our state-of-the-art AI creates human-like content that engages readers and ranks on search engines. Choose from multiple AI models including GPT-4, Claude, and more.",
    highlights: ["Multiple AI models", "Human-like writing", "Context-aware content"],
  },
  {
    icon: Search,
    title: "Built-in SEO Optimization",
    description: "Every piece of content is automatically optimized for search engines with proper keyword placement, meta descriptions, and structured data.",
    highlights: ["Keyword optimization", "Meta tag generation", "Schema markup"],
  },
  {
    icon: Globe,
    title: "WordPress Integration",
    description: "Connect unlimited WordPress sites and publish content directly with one click. Manage all your sites from a single dashboard.",
    highlights: ["One-click publishing", "Multiple sites", "Auto-scheduling"],
  },
  {
    icon: Zap,
    title: "Bulk Content Generation",
    description: "Generate hundreds of articles at once using our powerful bulk engine. Perfect for scaling content operations quickly.",
    highlights: ["CSV/Excel import", "Batch processing", "Queue management"],
  },
  {
    icon: Shield,
    title: "AI Detection Bypass",
    description: "Our human content engine ensures your content passes AI detection tools, making it indistinguishable from human-written content.",
    highlights: ["Undetectable AI", "Natural language", "Human-like patterns"],
  },
  {
    icon: Target,
    title: "Multi-Tenant Platform",
    description: "Perfect for agencies - create separate workspaces for each client with custom branding and isolated data.",
    highlights: ["Client workspaces", "White-label options", "Role management"],
  },
];

const additionalFeatures = [
  { icon: Clock, title: "Scheduled Publishing", desc: "Plan your content calendar and auto-publish at optimal times" },
  { icon: Languages, title: "Multi-Language Support", desc: "Generate content in 50+ languages for global reach" },
  { icon: Layers, title: "Content Templates", desc: "Save and reuse templates for consistent brand voice" },
  { icon: RefreshCw, title: "Content Refresh", desc: "Update existing content to keep it fresh and relevant" },
  { icon: Workflow, title: "Workflow Automation", desc: "Set up automated content pipelines and approvals" },
  { icon: PenTool, title: "Rich Text Editor", desc: "Full-featured editor with formatting and media support" },
  { icon: BarChart3, title: "Analytics Dashboard", desc: "Track content performance and engagement metrics" },
  { icon: Share2, title: "Social Media Integration", desc: "Share content across social platforms automatically" },
];

export default function FeaturesPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-[#52B2BF]/10 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-[#52B2BF]/10 text-[#52B2BF]">Features</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
              Powerful Features for
              <span className="block bg-gradient-to-r from-[#52B2BF] to-purple-600 bg-clip-text text-transparent">
                Content at Scale
              </span>
            </h1>
            <p className="mt-6 text-xl text-gray-600">
              Everything you need to create, optimize, and publish content that drives results.
            </p>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {mainFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
              >
                <div className="flex-1">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#52B2BF] to-[#3d9aa6] rounded-2xl flex items-center justify-center mb-6">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{feature.title}</h2>
                  <p className="text-lg text-gray-600 mb-6">{feature.description}</p>
                  <ul className="space-y-3">
                    {feature.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-center gap-3 text-gray-700">
                        <CheckCircle className="w-5 h-5 text-[#52B2BF]" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1">
                  <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl p-8 aspect-video flex items-center justify-center">
                    <feature.icon className="w-32 h-32 text-[#52B2BF]/20" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">And Much More</h2>
            <p className="mt-4 text-xl text-gray-600">Additional features to supercharge your content workflow</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <feature.icon className="w-8 h-8 text-[#52B2BF] mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#52B2BF] to-[#3d9aa6]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Experience These Features?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Start your free trial today and see the difference.
          </p>
          <Link href="https://aiblog.scalezix.com/signup">
            <Button size="lg" className="bg-white text-[#52B2BF] hover:bg-gray-100">
              Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
