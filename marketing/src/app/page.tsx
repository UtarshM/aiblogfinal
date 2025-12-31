"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  CheckCircle,
  Sparkles,
  FileText,
  Zap,
  BarChart3,
  Users,
  Globe,
  Shield,
  Star,
  Play,
  Bot,
  Target,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "AI Content Generation",
    description: "Create SEO-optimized blog posts, articles, and marketing copy in minutes with advanced AI.",
  },
  {
    icon: Globe,
    title: "WordPress Integration",
    description: "Publish directly to your WordPress sites with one click. Manage multiple sites effortlessly.",
  },
  {
    icon: BarChart3,
    title: "SEO Optimization",
    description: "Built-in SEO analysis ensures your content ranks higher on search engines.",
  },
  {
    icon: Zap,
    title: "Bulk Generation",
    description: "Generate hundreds of articles at once with our powerful bulk content engine.",
  },
  {
    icon: Bot,
    title: "Human-Like Content",
    description: "Advanced AI that writes naturally, passing AI detection tools with ease.",
  },
  {
    icon: Target,
    title: "Multi-Tenant Platform",
    description: "Perfect for agencies - manage multiple clients from a single dashboard.",
  },
];

const stats = [
  { value: "10,000+", label: "Active Users" },
  { value: "5M+", label: "Articles Generated" },
  { value: "99.9%", label: "Uptime" },
  { value: "4.9/5", label: "User Rating" },
];

const testimonials = [
  {
    quote: "Scalezix transformed our content strategy. We went from publishing 2 articles a week to 20.",
    author: "Sarah Chen",
    role: "Marketing Director",
    company: "TechFlow Inc",
  },
  {
    quote: "The AI quality is incredible. Our readers can't tell the difference from human-written content.",
    author: "Michael Roberts",
    role: "Content Manager",
    company: "Digital First Media",
  },
  {
    quote: "As an agency, the multi-tenant feature is a game-changer. We manage 50+ clients seamlessly.",
    author: "Emily Watson",
    role: "Agency Owner",
    company: "ContentPro Agency",
  },
];

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#52B2BF]/10 via-white to-purple-50" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#52B2BF]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-6 bg-[#52B2BF]/10 text-[#52B2BF] hover:bg-[#52B2BF]/20 border-[#52B2BF]/20">
                <Sparkles className="w-3 h-3 mr-1" />
                Trusted by 10,000+ Content Creators
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight"
            >
              Create Content That
              <span className="block bg-gradient-to-r from-[#52B2BF] to-purple-600 bg-clip-text text-transparent">
                Ranks & Converts
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto"
            >
              AI-powered content creation platform that helps you generate SEO-optimized 
              articles, publish to WordPress, and scale your content marketing effortlessly.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="https://aiblog.scalezix.com/signup">
                <Button size="lg" className="bg-gradient-to-r from-[#52B2BF] to-[#3d9aa6] hover:opacity-90 text-white shadow-xl px-8 h-14 text-lg">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/examples">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg">
                  <Play className="mr-2 w-5 h-5" />
                  See Examples
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500"
            >
              <span className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                No credit card required
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                14-day free trial
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Cancel anytime
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-white">{stat.value}</div>
                <div className="mt-2 text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-[#52B2BF]/10 text-[#52B2BF]">Features</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Everything You Need to Scale Content
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Powerful tools designed to help you create, optimize, and publish content at scale.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow border-gray-100">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#52B2BF]/20 to-[#52B2BF]/10 rounded-xl flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-[#52B2BF]" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/features">
              <Button variant="outline" size="lg">
                View All Features
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-700">How It Works</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              From Idea to Published in Minutes
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Enter Your Topic", desc: "Simply provide a topic or keyword, and our AI understands your intent." },
              { step: "02", title: "AI Generates Content", desc: "Our advanced AI creates SEO-optimized, human-like content instantly." },
              { step: "03", title: "Publish & Grow", desc: "Review, edit if needed, and publish directly to your WordPress sites." },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="text-8xl font-bold text-gray-100 absolute -top-4 left-0">{item.step}</div>
                <div className="relative pt-12 pl-4">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-yellow-100 text-yellow-700">Testimonials</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Loved by Content Creators
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6">&quot;{testimonial.quote}&quot;</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#52B2BF] to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {testimonial.author[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{testimonial.author}</div>
                        <div className="text-sm text-gray-500">{testimonial.role}, {testimonial.company}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#52B2BF] to-[#3d9aa6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Scale Your Content?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Join thousands of marketers and content creators who are already using Scalezix 
              to grow their businesses.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="https://aiblog.scalezix.com/signup">
                <Button size="lg" className="bg-white text-[#52B2BF] hover:bg-gray-100 shadow-xl px-8 h-14 text-lg">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 h-14 px-8 text-lg">
                  View Pricing
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-white/70 text-sm">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
