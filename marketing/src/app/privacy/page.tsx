"use client";

import { Badge } from "@/components/ui/badge";

export default function PrivacyPage() {
  return (
    <div className="pt-20">
      <section className="py-20 bg-gradient-to-br from-[#52B2BF]/10 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge className="mb-4 bg-[#52B2BF]/10 text-[#52B2BF]">Legal</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="mt-4 text-gray-600">Last updated: December 31, 2025</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg">
          <h2>1. Information We Collect</h2>
          <p>We collect information you provide directly, including name, email, and payment information when you create an account or subscribe to our services.</p>

          <h2>2. How We Use Your Information</h2>
          <p>We use your information to provide and improve our services, process payments, send communications, and ensure platform security.</p>

          <h2>3. Data Security</h2>
          <p>We implement industry-standard security measures to protect your data, including encryption, secure servers, and regular security audits.</p>

          <h2>4. Third-Party Services</h2>
          <p>We may share data with trusted third parties for payment processing, analytics, and service delivery. We do not sell your personal information.</p>

          <h2>5. Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal data. Contact us at privacy@scalezix.com for any requests.</p>

          <h2>6. Contact Us</h2>
          <p>For privacy-related questions, contact us at privacy@scalezix.com</p>
        </div>
      </section>
    </div>
  );
}
