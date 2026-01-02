import { DollarSign, TrendingUp, Bell, FileText } from 'lucide-react'

export default function PricingTransparency() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <DollarSign className="text-blue-600" size={32} />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Pricing Transparency Policy</h1>
          <p className="text-slate-600">Our commitment to clear, honest pricing</p>
        </div>

        {/* Content */}
        <div className="prose prose-slate max-w-none space-y-8">
          {/* Introduction */}
          <section>
            <p className="text-lg text-slate-700">
              At ShipFex, we believe in transparent, predictable pricing. No hidden fees. No surprises. This policy explains how we price our services and our commitment to keeping you informed.
            </p>
          </section>

          {/* Our Philosophy */}
          <section className="bg-blue-50 p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Pricing Philosophy</h2>
            <div className="space-y-3 text-slate-700">
              <p><strong>1. Pay for What You Use:</strong> No minimum monthly fees. If you ship 1 order or 10,000, you only pay for actual services rendered.</p>
              <p><strong>2. Published Rates:</strong> All standard rates are publicly available on our <a href="/pricing" className="text-blue-600 hover:text-blue-700">Pricing page</a>.</p>
              <p><strong>3. No Hidden Fees:</strong> Every charge is itemized on your invoice with clear descriptions.</p>
              <p><strong>4. Volume Discounts:</strong> The more you ship, the less you pay per unit. Volume tiers are clearly defined.</p>
            </div>
          </section>

          {/* How We Calculate Costs */}
          <section>
            <div className="flex items-start gap-3 mb-4">
              <TrendingUp className="text-blue-600 flex-shrink-0 mt-1" size={24} />
              <h2 className="text-2xl font-bold text-slate-900">How We Calculate Your Costs</h2>
            </div>
            <div className="space-y-4 text-slate-700">
              <div>
                <h3 className="font-semibold text-slate-900">Inbound Services</h3>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li><strong>Receiving:</strong> Per unit received and inspected ($0.35/unit standard)</li>
                  <li><strong>Quality Inspection:</strong> Optional, per unit ($0.15/unit)</li>
                  <li><strong>Pallet Breakdown:</strong> Per pallet deconsolidated ($15/pallet)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">Storage</h3>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li><strong>Pallet Storage:</strong> Per pallet per month ($45/pallet/month standard)</li>
                  <li><strong>Bin Storage:</strong> For small items, per cubic foot ($0.50/cu ft/month)</li>
                  <li><strong>Climate Controlled:</strong> Additional charge for temperature-sensitive items (+$15/pallet/month)</li>
                  <li><strong>Long-term Discount:</strong> 6+ months storage: -20% ($35/pallet/month)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">Fulfillment</h3>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li><strong>Pick Fee:</strong> Per order picked ($0.50/order)</li>
                  <li><strong>Pack Fee:</strong> Per order packed ($0.75/order)</li>
                  <li><strong>Multi-item Orders:</strong> +$0.25 per additional item</li>
                  <li><strong>Gift Wrapping:</strong> Optional ($2.50/order)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">Shipping</h3>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li><strong>Postage:</strong> Carrier rate + 10% handling</li>
                  <li><strong>Labels:</strong> Free for all orders</li>
                  <li><strong>Insurance:</strong> Optional, carrier rates apply</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">Materials</h3>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li><strong>Boxes:</strong> $0.50 (small) to $1.75 (large)</li>
                  <li><strong>Poly Mailers:</strong> $0.30 each</li>
                  <li><strong>Bubble Wrap:</strong> $0.10 per foot</li>
                  <li><strong>Custom Branded:</strong> Quote-based on volume</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Volume Discounts */}
          <section className="bg-slate-50 p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Volume Discount Structure</h2>
            <p className="text-slate-700 mb-4">Our tiered pricing rewards growing businesses:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold text-slate-900">Monthly Volume</th>
                    <th className="px-4 py-2 text-left font-semibold text-slate-900">Fulfillment Discount</th>
                    <th className="px-4 py-2 text-left font-semibold text-slate-900">Storage Discount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="px-4 py-2 text-slate-700">1-999 orders</td>
                    <td className="px-4 py-2 text-slate-700">Standard rates</td>
                    <td className="px-4 py-2 text-slate-700">Standard rates</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-slate-700">1,000-4,999 orders</td>
                    <td className="px-4 py-2 text-slate-700">-10%</td>
                    <td className="px-4 py-2 text-slate-700">-5%</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-slate-700">5,000-9,999 orders</td>
                    <td className="px-4 py-2 text-slate-700">-15%</td>
                    <td className="px-4 py-2 text-slate-700">-10%</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-slate-700">10,000+ orders</td>
                    <td className="px-4 py-2 text-slate-700">Custom pricing</td>
                    <td className="px-4 py-2 text-slate-700">Custom pricing</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-600 mt-4">Discounts applied automatically based on previous month's volume.</p>
          </section>

          {/* Price Changes */}
          <section>
            <div className="flex items-start gap-3 mb-4">
              <Bell className="text-blue-600 flex-shrink-0 mt-1" size={24} />
              <h2 className="text-2xl font-bold text-slate-900">When Prices May Change</h2>
            </div>
            <div className="space-y-4 text-slate-700">
              <p>We understand the importance of predictable costs. Our price change policy:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>30-Day Notice:</strong> Any price increase requires 30 days' written notice via email</li>
                <li><strong>Annual Review:</strong> We review pricing once per year (typically January) to account for carrier rate changes and operational costs</li>
                <li><strong>Locked Rates:</strong> Enterprise customers (10K+ orders/month) can negotiate 12-month rate locks</li>
                <li><strong>Decreases:</strong> Price decreases (from efficiency gains or scale) are implemented immediately without notice</li>
              </ul>
            </div>
          </section>

          {/* Billing Transparency */}
          <section className="bg-slate-50 p-6 rounded-xl">
            <div className="flex items-start gap-3 mb-4">
              <FileText className="text-blue-600 flex-shrink-0 mt-1" size={24} />
              <h2 className="text-2xl font-bold text-slate-900">Billing Transparency</h2>
            </div>
            <div className="space-y-3 text-slate-700">
              <p><strong>Itemized Invoices:</strong> Every invoice shows:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Service type (receiving, storage, fulfillment, materials)</li>
                <li>Quantity (units, pallets, orders)</li>
                <li>Unit rate</li>
                <li>Line total</li>
                <li>Any discounts applied</li>
              </ul>
              <p className="mt-4"><strong>Real-time Dashboard:</strong> Track costs as they accrue in your merchant dashboard.</p>
              <p><strong>Export Data:</strong> Download transaction history as CSV for your own analysis.</p>
            </div>
          </section>

          {/* Dispute Resolution */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Billing Disputes</h2>
            <div className="space-y-3 text-slate-700">
              <p>If you believe you've been charged incorrectly:</p>
              <ol className="list-decimal pl-5 space-y-2">
                <li><strong>Contact us within 30 days</strong> of invoice date at billing@shipfex.com</li>
                <li>We'll <strong>investigate within 5 business days</strong></li>
                <li>If error is confirmed, we'll <strong>credit your account</strong> immediately</li>
                <li>If not, we'll provide <strong>detailed explanation</strong> with supporting data</li>
              </ol>
              <p className="mt-4">Average resolution time: <strong>2-3 business days</strong></p>
            </div>
          </section>

          {/* Additional Fees */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Rare Additional Fees</h2>
            <p className="text-slate-700 mb-3">These fees are uncommon but may apply in specific situations:</p>
            <ul className="list-disc pl-5 space-y-2 text-slate-700">
              <li><strong>Mislabeled Inventory:</strong> $0.25/unit to re-label if your labeling doesn't match manifest</li>
              <li><strong>Abandoned Inventory:</strong> $5/pallet/week after 60 days post-termination</li>
              <li><strong>Returned Shipments:</strong> $15/pallet if inbound rejected at receiving (prohibited items, damage)</li>
              <li><strong>Rush Orders:</strong> $25/order for same-day fulfillment requests after 2PM cutoff</li>
              <li><strong>Late Payments:</strong> 1.5% monthly interest on invoices overdue 30+ days</li>
            </ul>
          </section>

          {/* Our Commitment */}
          <section className="bg-blue-50 p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Commitment to You</h2>
            <div className="space-y-2 text-slate-700">
              <p>✓ We will <strong>never</strong> charge fees not disclosed on our pricing page or contract</p>
              <p>✓ You will <strong>always</strong> receive 30 days' notice before any price increase</p>
              <p>✓ Every charge will be <strong>clearly itemized</strong> on your invoice</p>
              <p>✓ We will <strong>respond promptly</strong> to billing questions or disputes</p>
              <p>✓ Our goal is <strong>predictable, fair pricing</strong> that scales with your business</p>
            </div>
          </section>

          {/* Contact */}
          <section className="border-t border-slate-200 pt-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Questions About Pricing?</h2>
            <p className="text-slate-700 mb-4">We're here to help you understand your costs:</p>
            <div className="space-y-2 text-slate-700">
              <p><strong>Email:</strong> <a href="mailto:billing@shipfex.com" className="text-blue-600 hover:text-blue-700">billing@shipfex.com</a></p>
              <p><strong>Phone:</strong> <a href="tel:+18001234567" className="text-blue-600 hover:text-blue-700">+1 (800) 123-4567</a></p>
              <p><strong>Chat:</strong> Available in your merchant dashboard Mon-Fri 8AM-6PM PST</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
