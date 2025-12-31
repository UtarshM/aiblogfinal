"use client";

import { Badge } from "@/components/ui/badge";

export default function CookiesPage() {
  return (
    <div className="pt-20">
      <section className="py-20 bg-gradient-to-br from-[#52B2BF]/10 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge className="mb-4 bg-[#52B2BF]/10 text-[#52B2BF]">Legal</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Cookie Policy</h1>
          <p className="mt-4 text-gray-600">Last updated: December 31, 2025</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg">
          <h2>What Are Cookies</h2>
          <p>Cookies are small text files stored on your device when you visit our website.</p>

          <h2>How We Use Cookies</h2>
          <p>We use cookies for authentication, preferences, analytics, and improving user experience.</p>

          <h2>Types of Cookies</h2>
          <ul>
            <li><strong>Essential:</strong> Required for basic site functionality</li>
            <li><strong>Analytics:</strong> Help us understand how visitors use our site</li>
            <li><strong>Preferences:</strong> Remember your settings and choices</li>
          </ul>

          <h2>Managing Cookies</h2>
          <p>You can control cookies through your browser settings. Disabling cookies may affect site functionality.</p>

          <h2>Contact</h2>
          <p>Questions? Contact us at privacy@scalezix.com</p>
        </div>
      </section>
    </div>
  );
}
