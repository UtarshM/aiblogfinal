"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, Users, FileText, Clock } from "lucide-react";

const caseStudies = [
  {
    company: "TechFlow Inc",
    industry: "SaaS",
    logo: "T",
    challenge: "Struggling to produce consistent blog content with a small marketing team",
    solution: "Implemented Scalezix for automated content generation and WordPress publishing",
    results: [
      { metric: "10x", label: "Content Output" },
      { metric: "156%", label: "Organic Traffic" },
      { metric: "45%", label: "Lead Increase" },
    ],
    quote: "Scalezix transformed our content strategy completely.",
    author: "Sarah Chen, Marketing Director",
  },
  {
    company: "Digital First Media",
    industry: "Publishing",
    logo: "D",
    challenge: "Managing content for 20+ client websites with limited resources",
    solution: "Used multi-tenant features to manage all clients from one dashboard",
    results: [
      { metric: "500+", label: "Articles/Month" },
      { metric: "80%", label: "Time Saved" },
      { metric: "3x", label: "Client Capacity" },
    ],
    quote: "We tripled our client capacity without hiring more writers.",
    author: "Michael Roberts, Content Manager",
  },
  {
    company: "GrowthHub Agency",
    industry: "Marketing Agency",
    logo: "G",
    challenge: "Delivering high-quality SEO content at scale for enterprise clients",
    solution: "Leveraged bulk generation and human content engine for undetectable AI content",
    results: [
      { metric: "200%", label: "Revenue Growth" },
      { metric: "50+", label: "Enterprise Clients" },
      { metric: "99%", label: "Client Retention" },
    ],
    quote: "Our clients can't tell the difference from human-written content.",
    author: "Emily Watson, Agency Owner",
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-[#52B2BF]/10 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-[#52B2BF]/10 text-[#52B2BF]">Case Studies</Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
            Real Results from Real Customers
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
            See how businesses are scaling their content with Scalezix.
          </p>
        </div>
      </section>


      {/* Case Studies */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.company}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid lg:grid-cols-2">
                      <div className="p-8 lg:p-12">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-14 h-14 bg-gradient-to-br from-[#52B2BF] to-purple-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                            {study.logo}
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900">{study.company}</h3>
                            <Badge variant="secondary">{study.industry}</Badge>
                          </div>
                        </div>
                        <div className="space-y-4 mb-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Challenge</h4>
                            <p className="text-gray-600">{study.challenge}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Solution</h4>
                            <p className="text-gray-600">{study.solution}</p>
                          </div>
                        </div>
                        <blockquote className="border-l-4 border-[#52B2BF] pl-4 italic text-gray-700">
                          &quot;{study.quote}&quot;
                          <footer className="mt-2 text-sm text-gray-500 not-italic">— {study.author}</footer>
                        </blockquote>
                      </div>
                      <div className="bg-gradient-to-br from-[#52B2BF]/10 to-purple-50 p-8 lg:p-12 flex items-center">
                        <div className="grid grid-cols-3 gap-6 w-full">
                          {study.results.map((result) => (
                            <div key={result.label} className="text-center">
                              <div className="text-4xl font-bold text-[#52B2BF]">{result.metric}</div>
                              <div className="text-sm text-gray-600 mt-1">{result.label}</div>
                            </div>
                          ))}
                        </div>
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
            Ready to Write Your Success Story?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of businesses scaling their content with Scalezix.
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
