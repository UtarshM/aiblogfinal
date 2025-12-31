"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "How AI is Transforming Content Marketing in 2024",
    excerpt: "Discover the latest AI trends that are reshaping how businesses create and distribute content.",
    category: "AI & Technology",
    author: "Sarah Chen",
    date: "Dec 28, 2025",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: 2,
    title: "SEO Best Practices for AI-Generated Content",
    excerpt: "Learn how to optimize your AI-generated content for maximum search engine visibility.",
    category: "SEO",
    author: "Michael Roberts",
    date: "Dec 25, 2025",
    readTime: "10 min read",
    featured: false,
  },
  {
    id: 3,
    title: "Building a Content Strategy That Scales",
    excerpt: "A step-by-step guide to creating a content strategy that grows with your business.",
    category: "Strategy",
    author: "Emily Watson",
    date: "Dec 22, 2025",
    readTime: "12 min read",
    featured: false,
  },
  {
    id: 4,
    title: "The Rise of Human-Like AI Writing",
    excerpt: "How modern AI models are producing content that's indistinguishable from human writing.",
    category: "AI & Technology",
    author: "Alex Johnson",
    date: "Dec 20, 2025",
    readTime: "7 min read",
    featured: false,
  },
  {
    id: 5,
    title: "WordPress Automation: A Complete Guide",
    excerpt: "Everything you need to know about automating your WordPress content workflow.",
    category: "Tutorials",
    author: "Sarah Chen",
    date: "Dec 18, 2025",
    readTime: "15 min read",
    featured: false,
  },
  {
    id: 6,
    title: "Content Marketing ROI: Measuring What Matters",
    excerpt: "Key metrics and strategies for measuring the true ROI of your content marketing efforts.",
    category: "Analytics",
    author: "Michael Roberts",
    date: "Dec 15, 2025",
    readTime: "9 min read",
    featured: false,
  },
];


const categories = ["All", "AI & Technology", "SEO", "Strategy", "Tutorials", "Analytics"];

export default function BlogPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-[#52B2BF]/10 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-[#52B2BF]/10 text-[#52B2BF]">Blog</Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
            Insights & Resources
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
            Tips, strategies, and insights to help you master content marketing.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <Badge
                key={cat}
                variant={cat === "All" ? "default" : "secondary"}
                className={`cursor-pointer ${cat === "All" ? "bg-[#52B2BF]" : "hover:bg-gray-200"}`}
              >
                {cat}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {blogPosts.filter(p => p.featured).map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid lg:grid-cols-2">
                    <div className="bg-gradient-to-br from-[#52B2BF] to-purple-500 p-12 flex items-center justify-center">
                      <span className="text-white/20 text-9xl font-bold">01</span>
                    </div>
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <Badge className="w-fit mb-4 bg-[#52B2BF]/10 text-[#52B2BF]">Featured</Badge>
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h2>
                      <p className="text-gray-600 mb-6">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                        <span className="flex items-center gap-1"><User className="w-4 h-4" />{post.author}</span>
                        <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{post.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{post.readTime}</span>
                      </div>
                      <Button className="w-fit bg-gradient-to-r from-[#52B2BF] to-[#3d9aa6]">
                        Read Article <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.filter(p => !p.featured).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-0">
                    <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
                      <span className="text-gray-200 text-6xl font-bold">0{post.id}</span>
                    </div>
                    <div className="p-6">
                      <Badge variant="secondary" className="mb-3">{post.category}</Badge>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-br from-[#52B2BF] to-[#3d9aa6]">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-white/90 mb-8">Get the latest content marketing tips delivered to your inbox.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button className="bg-white text-[#52B2BF] hover:bg-gray-100">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
