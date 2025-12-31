"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, X, Zap, Shield, Globe, Bot, BarChart3, Users } from "lucide-react";

const comparisons = [
  { feature: "AI Content Generation", scalezix: true, others: true },
  { feature: "Human-Like Content Engine", scalezix: true, others: false },
  { feature: "WordPress Integration", scalezix: true, others: "Limited" },
  { feature: "Bulk Generation", scalezix: true, others: false },
  { feature: "Multi-Tenant Support", scalezix: true, others: false },
  { feature: "SEO Optimization", scalezix: true, others: "Basic" },
  { feature: "AI Detection Bypass", scalezix: true, others: false },
  { feature: "Unlimited Sites", scalezix: true, others: false },
  { feature: "White-Label Option", scalezix: true, others: false },
  { feature: "24/7 Support", scalezix: true, others: "Limited" },
];

const reasons = [
  {
    icon: Bot,
    title: "Superior AI Quality",
    desc: "Our AI produces content that's indistinguishable from human writing, passing all AI detection tools.",
  },
  {
    icon: Zap,
    title: "Unmatched Speed",
    desc: "Generate hundreds of articles in minutes, not hours. Scale your content production instantly.",
  },
  {
    icon: Globe,
    title: "Seamless Integration",
    desc: "Direct WordPress publishing, social media sharing, and API access for custom workflows.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    desc: "SOC 2 compliant with data encryption, role-based access, and audit logs.",
  },
  {
    icon: BarChart3,
    title: "Data-Driven Insights",
    desc: "Track content performance with built-in analytics and SEO monitoring.",
  },
  {
    icon: Users,
    title: "Built for Teams",
    desc: "Collaboration features, approval workflows, and multi-tenant support for agencies.",
  },
];

export default function WhyPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-[#52B2BF]/10 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-[#52B2BF]/10 text-[#52B2BF]">Why Scalezix</Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
            Why Choose Scalezix?
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
            The most powerful AI content platform built for serious content marketers.
          </p>
        </div>
      </section>


      {/* Reasons */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#52B2BF] to-[#3d9aa6] rounded-xl flex items-center justify-center mb-4">
                      <reason.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{reason.title}</h3>
                    <p className="text-gray-600">{reason.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How We Compare</h2>
            <p className="mt-4 text-xl text-gray-600">See why Scalezix stands out from the competition</p>
          </div>
          <Card>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold text-gray-900">Feature</th>
                    <th className="text-center p-4 font-semibold text-[#52B2BF]">Scalezix</th>
                    <th className="text-center p-4 font-semibold text-gray-500">Others</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map((row, index) => (
                    <tr key={row.feature} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                      <td className="p-4 text-gray-700">{row.feature}</td>
                      <td className="p-4 text-center">
                        {row.scalezix === true ? (
                          <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-gray-600">{row.scalezix}</span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {row.others === true ? (
                          <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                        ) : row.others === false ? (
                          <X className="w-5 h-5 text-red-400 mx-auto" />
                        ) : (
                          <span className="text-gray-500 text-sm">{row.others}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#52B2BF] to-[#3d9aa6]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Experience the Difference
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Try Scalezix free for 14 days. No credit card required.
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
