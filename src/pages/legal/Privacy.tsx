import { Shield, Lock, Eye, Database, Globe, Mail } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Shield className="text-blue-600" size={32} />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Privacy Policy</h1>
          <p className="text-slate-600">Last updated: January 1, 2026</p>
        </div>

        {/* Content */}
        <div className="prose prose-slate max-w-none space-y-8">
          {/* Introduction */}
          <section>
            <p className="text-lg text-slate-700">
              At ShipFex, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our fulfillment and logistics platform.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="bg-slate-50 p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <Database className="text-blue-600" size={24} />
              <h2 className="text-2xl font-bold text-slate-900 m-0">Information We Collect</h2>
            </div>
            <div className="space-y-4 text-slate-700">
              <div>
                <h3 className="font-semibold text-slate-900">Personal Information</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Name, email address, phone number</li>
                  <li>Company name and business details</li>
                  <li>Billing and payment information</li>
                  <li>Shipping addresses (yours and your customers')</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Usage Information</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Log data (IP address, browser type, pages visited)</li>
                  <li>Device information</li>
                  <li>Cookies and tracking technologies</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Business Data</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Product information and inventory levels</li>
                  <li>Order and shipment data</li>
                  <li>Integration credentials (encrypted)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section className="bg-slate-50 p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="text-blue-600" size={24} />
              <h2 className="text-2xl font-bold text-slate-900 m-0">How We Use Your Information</h2>
            </div>
            <ul className="list-disc pl-5 space-y-2 text-slate-700">
              <li>Provide and maintain our fulfillment services</li>
              <li>Process orders and manage inventory</li>
              <li>Communicate with you about your account and services</li>
              <li>Send invoices and process payments</li>
              <li>Improve our platform and develop new features</li>
              <li>Comply with legal obligations</li>
              <li>Prevent fraud and ensure platform security</li>
            </ul>
          </section>

          {/* Data Sharing */}
          <section className="bg-slate-50 p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="text-blue-600" size={24} />
              <h2 className="text-2xl font-bold text-slate-900 m-0">How We Share Your Information</h2>
            </div>
            <div className="space-y-3 text-slate-700">
              <p className="font-semibold text-slate-900">We DO NOT sell your personal information.</p>
              <p>We may share your information with:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Service Providers:</strong> Shipping carriers, payment processors, cloud hosting providers</li>
                <li><strong>Business Partners:</strong> Marketplace integrations (Amazon, Shopify) as needed for fulfillment</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In the event of a merger or acquisition</li>
              </ul>
            </div>
          </section>

          {/* Your Rights */}
          <section className="bg-slate-50 p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="text-blue-600" size={24} />
              <h2 className="text-2xl font-bold text-slate-900 m-0">Your Rights</h2>
            </div>
            <div className="space-y-3 text-slate-700">
              <p>Depending on your location, you may have the following rights:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Update inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your data (subject to legal obligations)</li>
                <li><strong>Portability:</strong> Receive your data in a machine-readable format</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Restriction:</strong> Limit how we process your data</li>
              </ul>
              <p className="mt-4">To exercise these rights, contact us at <a href="mailto:privacy@shipfex.com" className="text-blue-600 hover:text-blue-700 font-semibold">privacy@shipfex.com</a></p>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Data Security</h2>
            <p className="text-slate-700">
              We implement industry-standard security measures to protect your information:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-700 mt-3">
              <li>Encryption in transit (TLS/SSL) and at rest (AES-256)</li>
              <li>Regular security audits and penetration testing</li>
              <li>Access controls and authentication</li>
              <li>Employee training on data protection</li>
              <li>Compliance with SOC 2 Type II standards</li>
            </ul>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Data Retention</h2>
            <p className="text-slate-700">
              We retain your information for as long as necessary to provide our services and comply with legal obligations. Typically:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-700 mt-3">
              <li>Account data: Duration of account + 7 years (tax/legal requirements)</li>
              <li>Transaction records: 7 years</li>
              <li>Marketing data: Until you opt-out</li>
              <li>Log data: 90 days</li>
            </ul>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Cookies & Tracking</h2>
            <p className="text-slate-700">
              We use cookies and similar technologies to enhance your experience. You can control cookies through your browser settings. Our cookies are used for:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-700 mt-3">
              <li>Essential functionality (login sessions)</li>
              <li>Analytics (understanding usage patterns)</li>
              <li>Preferences (language, settings)</li>
            </ul>
          </section>

          {/* International Transfers */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">International Data Transfers</h2>
            <p className="text-slate-700">
              Your information may be transferred to and processed in countries outside your own. We ensure appropriate safeguards are in place, including Standard Contractual Clauses approved by the European Commission.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Children's Privacy</h2>
            <p className="text-slate-700">
              Our services are not directed to individuals under 18. We do not knowingly collect personal information from children.
            </p>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Changes to This Policy</h2>
            <p className="text-slate-700">
              We may update this Privacy Policy from time to time. We will notify you of material changes via email or a prominent notice on our platform at least 30 days before the changes take effect.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-blue-50 p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="text-blue-600" size={24} />
              <h2 className="text-2xl font-bold text-slate-900 m-0">Contact Us</h2>
            </div>
            <p className="text-slate-700">
              If you have questions about this Privacy Policy or our data practices:
            </p>
            <div className="mt-4 space-y-2 text-slate-700">
              <p><strong>Email:</strong> <a href="mailto:privacy@shipfex.com" className="text-blue-600 hover:text-blue-700">privacy@shipfex.com</a></p>
              <p><strong>Mail:</strong> ShipFex Privacy Team, 123 Warehouse Blvd, Los Angeles, CA 90001</p>
              <p><strong>Phone:</strong> <a href="tel:+18001234567" className="text-blue-600 hover:text-blue-700">+1 (800) 123-4567</a></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
