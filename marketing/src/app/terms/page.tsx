"use client";

import { Badge } from "@/components/ui/badge";

export default function TermsPage() {
  return (
    <div className="pt-20">
      <section className="py-20 bg-gradient-to-br from-[#52B2BF]/10 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge className="mb-4 bg-[#52B2BF]/10 text-[#52B2BF]">Legal</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Terms of Service</h1>
          <p className="mt-4 text-gray-600">Last updated: December 31, 2025</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg">
          <h2>1. Acceptance of Terms</h2>
          <p>By using Scalezix, you agree to these terms. If you disagree, please do not use our services.</p>

          <h2>2. Service Description</h2>
          <p>Scalezix provides AI-powered content generation and marketing automation tools. Features may change as we improve our platform.</p>

          <h2>3. User Responsibilities</h2>
          <p>You are responsible for your account security and all content generated using our platform. Do not use our services for illegal purposes.</p>

          <h2>4. Content Ownership</h2>
          <p>You retain ownership of content you create using Scalezix. We do not claim rights to your generated content.</p>

          <h2>5. Payment Terms</h2>
          <p>Subscriptions are billed monthly or annually. Refunds are available within 30 days of purchase.</p>

          <h2>6. Limitation of Liability</h2>
          <p>Scalezix is provided &quot;as is&quot;. We are not liable for any damages arising from use of our services.</p>

          <h2>7. Contact</h2>
          <p>For questions about these terms, contact legal@scalezix.com</p>
        </div>
      </section>
    </div>
  );
}
