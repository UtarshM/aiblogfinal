"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, ExternalLink, FileText, Briefcase, Heart, Code, Utensils, Plane } from "lucide-react";

const categories = [
  { id: "all", name: "All", icon: FileText },
  { id: "tech", name: "Technology", icon: Code },
  { id: "business", name: "Business", icon: Briefcase },
  { id: "health", name: "Health", icon: Heart },
  { id: "food", name: "Food", icon: Utensils },
  { id: "travel", name: "Travel", icon: Plane },
];

const examples = [
  {
    id: 1,
    category: "tech",
    title: "The Future of AI in Software Development",
    excerpt: "Explore how artificial intelligence is revolutionizing the way we build software...",
    readTime: "8 min read",
    seoScore: 95,
  },
  {
    id: 2,
    category: "business",
    title: "10 Strategies for Scaling Your Startup",
    excerpt: "Learn proven strategies that successful founders use to scale their businesses...",
    readTime: "12 min read",
    seoScore: 92,
  },
  {
    id: 3,
    category: "health",
    title: "Complete Guide to Intermittent Fasting",
    excerpt: "Everything you need to know about intermittent fasting and its health benefits...",
    readTime: "10 min read",
    seoScore: 94,
  },
  {
    id: 4,
    category: "food",
    title: "Mediterranean Diet: A Beginner's Guide",
    excerpt: "Discover the secrets of the Mediterranean diet and how to get started...",
    readTime: "7 min read",
    seoScore: 91,
  },
  {
    id: 5,
    category: "travel",
    title: "Hidden Gems of Southeast Asia",
    excerpt: "Uncover the most beautiful and lesser-known destinations in Southeast Asia...",
    readTime: "15 min read",
    seoScore: 93,
  },
  {
    id: 6,
    category: "tech",
    title: "Understanding Blockchain Technology",
    excerpt: "A comprehensive guide to blockchain technology and its real-world applications...",
    readTime: "11 min read",
    seoScore: 96,
  },
];


export default function ExamplesPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredExamples = activeCategory === "all" 
    ? examples 
    : examples.filter(e => e.category === activeCategory);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-[#52B2BF]/10 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-[#52B2BF]/10 text-[#52B2BF]">Examples</Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
            See What Scalezix Can Create
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
            Browse real examples of AI-generated content across different industries and niches.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={activeCategory === cat.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat.id)}
                className={activeCategory === cat.id ? "bg-[#52B2BF]" : ""}
              >
                <cat.icon className="w-4 h-4 mr-2" />
                {cat.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Examples Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredExamples.map((example, index) => (
              <motion.div
                key={example.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="h-40 bg-gradient-to-br from-[#52B2BF]/20 to-purple-100 flex items-center justify-center">
                      {categories.find(c => c.id === example.category)?.icon && (
                        <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-sm">
                          {(() => {
                            const Icon = categories.find(c => c.id === example.category)?.icon || FileText;
                            return <Icon className="w-8 h-8 text-[#52B2BF]" />;
                          })()}
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="secondary">
                          {categories.find(c => c.id === example.category)?.name}
                        </Badge>
                        <Badge className="bg-green-100 text-green-700">
                          SEO: {example.seoScore}%
                        </Badge>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{example.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{example.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{example.readTime}</span>
                        <Button variant="ghost" size="sm" className="text-[#52B2BF]">
                          Read Full Article <ExternalLink className="ml-1 w-3 h-3" />
                        </Button>
                      </div>
                    </div>
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
            Ready to Create Content Like This?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Start generating high-quality, SEO-optimized content in minutes.
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
