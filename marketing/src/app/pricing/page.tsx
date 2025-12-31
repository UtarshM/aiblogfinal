"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, X, Sparkles, Zap, Building2 } from "lucide-react";

const plans = [
  {
    name: "Starter",
    icon: Sparkles,
    description: "Perfect for individuals and small blogs",
    monthlyPrice: 29,
    yearlyPrice: 290,
    features: [
      { name: "50 AI articles/month", included: true },
      { name: "1 WordPress site", included: true },
      { name: "Basic SEO optimization", included: true },
      { name: "Email support", included: true },
      { name: "Content templates", included: true },
      { name: "Bulk generation", included: false },
      { name: "Human content engine", included: false },
      { name: "API access", included: false },
      { name: "White-label", included: false },
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Professional",
    icon: Zap,
    description: "For growing businesses and content teams",
    monthlyPrice: 79,
    yearlyPrice: 790,
    features: [
      { name: "200 AI articles/month", included: true },
      { name: "5 WordPress sites", included: true },
      { name: "Advanced SEO optimization", included: true },
      { name: "Priority support", included: true },
      { name: "Content templates", included: true },
      { name: "Bulk generation", included: true },
      { name: "Human content engine", included: true },
      { name: "API access", included: false },
      { name: "White-label", included: false },
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    icon: Building2,
    description: "For agencies and large organizations",
    monthlyPrice: 199,
    yearlyPrice: 1990,
    features: [
      { name: "Unlimited AI articles", included: true },
      { name: "Unlimited WordPress sites", included: true },
      { name: "Advanced SEO optimization", included: true },
      { name: "24/7 dedicated support", included: true },
      { name: "Content templates", included: true },
      { name: "Bulk generation", included: true },
      { name: "Human content engine", included: true },
      { name: "API access", included: true },
      { name: "White-label", included: true },
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const faqs = [
  {
    q: "Can I change plans later?",
    a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards, PayPal, and bank transfers for enterprise plans.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes! All plans come with a 14-day free trial. No credit card required to start.",
  },
  {
    q: "What happens if I exceed my article limit?",
    a: "You can purchase additional articles or upgrade your plan. We'll notify you when you're approaching your limit.",
  },
  {
    q: "Do you offer refunds?",
    a: "Yes, we offer a 30-day money-back guarantee if you're not satisfied with our service.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Absolutely. You can cancel your subscription at any time with no cancellation fees.",
  },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-[#52B2BF]/10 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-[#52B2BF]/10 text-[#52B2BF]">Pricing</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
              Simple, Transparent Pricing
            </h1>
            <p className="mt-6 text-xl text-gray-600">
              Choose the plan that fits your needs. All plans include a 14-day free trial.
            </p>

            {/* Toggle */}
            <div className="mt-10 flex items-center justify-center gap-4">
              <span className={`text-sm ${!isYearly ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>Monthly</span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className={`relative w-14 h-7 rounded-full transition-colors ${isYearly ? 'bg-[#52B2BF]' : 'bg-gray-300'}`}
              >
                <span className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${isYearly ? 'translate-x-8' : 'translate-x-1'}`} />
              </button>
              <span className={`text-sm ${isYearly ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                Yearly <Badge className="ml-1 bg-green-100 text-green-700">Save 20%</Badge>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={`h-full relative ${plan.popular ? 'border-[#52B2BF] border-2 shadow-xl' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-[#52B2BF] text-white">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#52B2BF]/20 to-[#52B2BF]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <plan.icon className="w-6 h-6 text-[#52B2BF]" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                    <p className="text-gray-600 text-sm">{plan.description}</p>
                    <div className="mt-4">
                      <span className="text-5xl font-bold text-gray-900">
                        ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                      </span>
                      <span className="text-gray-500">/{isYearly ? 'year' : 'month'}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature) => (
                        <li key={feature.name} className="flex items-center gap-3">
                          {feature.included ? (
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          ) : (
                            <X className="w-5 h-5 text-gray-300 flex-shrink-0" />
                          )}
                          <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Link href={plan.name === "Enterprise" ? "/about#contact" : "https://aiblog.scalezix.com/signup"}>
                      <Button 
                        className={`w-full ${plan.popular ? 'bg-gradient-to-r from-[#52B2BF] to-[#3d9aa6] text-white' : ''}`}
                        variant={plan.popular ? "default" : "outline"}
                      >
                        {plan.cta}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                    <p className="text-gray-600">{faq.a}</p>
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
            Start Your Free Trial Today
          </h2>
          <p className="text-xl text-white/90 mb-8">
            No credit card required. Cancel anytime.
          </p>
          <Link href="https://aiblog.scalezix.com/signup">
            <Button size="lg" className="bg-white text-[#52B2BF] hover:bg-gray-100">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
