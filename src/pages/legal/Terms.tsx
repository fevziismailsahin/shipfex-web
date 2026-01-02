import { FileText, AlertCircle, Scale, Ban, Mail } from 'lucide-react'

export default function TermsOfService() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <FileText className="text-blue-600" size={32} />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Terms of Service</h1>
          <p className="text-slate-600">Last updated: January 1, 2026</p>
        </div>

        {/* Content */}
        <div className="prose prose-slate max-w-none space-y-8">
          {/* Acceptance */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-slate-700">
              By accessing or using ShipFex's fulfillment platform ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use our Service.
            </p>
            <p className="text-slate-700 mt-3">
              These Terms apply to all users, including merchants, warehouse managers, operators, and platform administrators.
            </p>
          </section>

          {/* Service Description */}
          <section className="bg-slate-50 p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Service Description</h2>
            <p className="text-slate-700">ShipFex provides:</p>
            <ul className="list-disc pl-5 space-y-2 text-slate-700 mt-3">
              <li><strong>Warehouse & Fulfillment Services:</strong> Storage, picking, packing, and shipping of products</li>
              <li><strong>Amazon FBA Prep:</strong> FNSKU labeling, poly bagging, and shipment creation</li>
              <li><strong>FBM Fulfillment:</strong> Direct-to-consumer order fulfillment</li>
              <li><strong>Logistics Services:</strong> Freight forwarding and customs clearance</li>
              <li><strong>Technology Platform:</strong> Inventory management, order tracking, and integrations</li>
            </ul>
            <p className="text-slate-700 mt-4">
              Service availability and features may vary by warehouse location.
            </p>
          </section>

          {/* User Responsibilities */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. User Responsibilities</h2>
            <div className="space-y-4 text-slate-700">
              <div>
                <h3 className="font-semibold text-slate-900">3.1 Account Security</h3>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                  <li>You must notify us immediately of any unauthorized access</li>
                  <li>You are liable for all activities under your account</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">3.2 Product Compliance</h3>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>Products must comply with all applicable laws and regulations</li>
                  <li>You must accurately describe and label all products</li>
                  <li>Prohibited items include hazardous materials, illegal goods, and restricted items</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">3.3 Accurate Information</h3>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>Provide accurate product dimensions and weights</li>
                  <li>Maintain current contact and billing information</li>
                  <li>Promptly update inventory counts and product details</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Payment Terms */}
          <section className="bg-slate-50 p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Payment Terms</h2>
            <div className="space-y-4 text-slate-700">
              <div>
                <h3 className="font-semibold text-slate-900">4.1 Fees</h3>
                <p>You agree to pay all fees as outlined in our <a href="/pricing" className="text-blue-600 hover:text-blue-700">Pricing page</a>. Fees include:</p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>Inbound receiving and inspection</li>
                  <li>Storage (monthly, per pallet or cubic foot)</li>
                  <li>Fulfillment (pick, pack, ship)</li>
                  <li>Materials and packaging</li>
                  <li>Special services (kitting, returns, FBA prep)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">4.2 Billing</h3>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>Fees are charged monthly in arrears</li>
                  <li>Invoices are sent via email by the 5th of each month</li>
                  <li>Payment is due within 15 days of invoice date</li>
                  <li>Late payments incur a 1.5% monthly interest charge</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">4.3 Price Changes</h3>
                <p>We may update pricing with 30 days' written notice. Continued use after the notice period constitutes acceptance.</p>
              </div>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section>
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle className="text-amber-600 flex-shrink-0 mt-1" size={24} />
              <h2 className="text-2xl font-bold text-slate-900">5. Limitation of Liability</h2>
            </div>
            <div className="space-y-4 text-slate-700">
              <div>
                <h3 className="font-semibold text-slate-900">5.1 Service Warranty</h3>
                <p>We strive for 99.8% accuracy and same-day fulfillment, but cannot guarantee error-free service. Our liability is limited to:</p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>$100 per lost or damaged unit, or replacement cost (whichever is lower)</li>
                  <li>Refund of fees for that specific transaction</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">5.2 Exclusions</h3>
                <p>We are not liable for:</p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>Indirect, incidental, or consequential damages</li>
                  <li>Loss of profits, revenue, or business opportunities</li>
                  <li>Damage caused by carrier, manufacturer defects, or force majeure</li>
                  <li>Issues arising from inaccurate product information provided by you</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">5.3 Insurance</h3>
                <p>We carry commercial general liability insurance. Additional coverage is your responsibility. We recommend third-party cargo insurance for high-value goods.</p>
              </div>
            </div>
          </section>

          {/* Termination */}
          <section className="bg-slate-50 p-6 rounded-xl">
            <div className="flex items-start gap-3 mb-4">
              <Ban className="text-red-600 flex-shrink-0 mt-1" size={24} />
              <h2 className="text-2xl font-bold text-slate-900">6. Termination</h2>
            </div>
            <div className="space-y-4 text-slate-700">
              <div>
                <h3 className="font-semibold text-slate-900">6.1 By You</h3>
                <p>You may terminate your account at any time with 30 days' written notice. You must:</p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>Remove all inventory from our warehouses</li>
                  <li>Pay all outstanding fees and charges</li>
                  <li>Close any open orders</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">6.2 By Us</h3>
                <p>We may suspend or terminate your account if you:</p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>Violate these Terms</li>
                  <li>Fail to pay invoices after 60 days</li>
                  <li>Store prohibited or dangerous items</li>
                  <li>Engage in fraudulent activity</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">6.3 Abandoned Inventory</h3>
                <p>Inventory not removed within 60 days of termination may be disposed of, with disposal costs charged to you.</p>
              </div>
            </div>
          </section>

          {/* Dispute Resolution */}
          <section>
            <div className="flex items-start gap-3 mb-4">
              <Scale className="text-blue-600 flex-shrink-0 mt-1" size={24} />
              <h2 className="text-2xl font-bold text-slate-900">7. Dispute Resolution</h2>
            </div>
            <div className="space-y-3 text-slate-700">
              <p><strong>Governing Law:</strong> These Terms are governed by the laws of California, USA.</p>
              <p><strong>Arbitration:</strong> Disputes will be resolved through binding arbitration (JAMS rules) in Los Angeles, CA.</p>
              <p><strong>Class Action Waiver:</strong> You agree to resolve disputes individually, not as part of a class action.</p>
            </div>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Intellectual Property</h2>
            <p className="text-slate-700">
              ShipFex retains all rights to our platform, software, trademarks, and content. You may not copy, modify, or reverse-engineer our technology. You retain ownership of your product data, granting us a license to use it solely to provide our services.
            </p>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Indemnification</h2>
            <p className="text-slate-700">
              You agree to indemnify and hold ShipFex harmless from claims arising from: (a) your violation of these Terms, (b) your products (defects, safety issues, IP infringement), or (c) your violation of any law or third-party rights.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Changes to Terms</h2>
            <p className="text-slate-700">
              We may modify these Terms at any time. Material changes will be communicated via email at least 30 days in advance. Continued use after changes take effect constitutes acceptance.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-blue-50 p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="text-blue-600" size={24} />
              <h2 className="text-2xl font-bold text-slate-900 m-0">Contact Us</h2>
            </div>
            <p className="text-slate-700">
              Questions about these Terms of Service?
            </p>
            <div className="mt-4 space-y-2 text-slate-700">
              <p><strong>Email:</strong> <a href="mailto:legal@shipfex.com" className="text-blue-600 hover:text-blue-700">legal@shipfex.com</a></p>
              <p><strong>Mail:</strong> ShipFex Legal Department, 123 Warehouse Blvd, Los Angeles, CA 90001</p>
              <p><strong>Phone:</strong> <a href="tel:+18001234567" className="text-blue-600 hover:text-blue-700">+1 (800) 123-4567</a></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
