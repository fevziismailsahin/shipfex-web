import { CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function PricingPage() {
  const inbound = [
    { service: 'Receiving (per unit)', price: '$0.35' },
    { service: 'Quality inspection', price: '$0.15' },
    { service: 'Case pack breakdown', price: '$0.25/unit' },
    { service: 'Pallet breakdown', price: '$15/pallet' },
  ]

  const fba = [
    { service: 'FNSKU labeling', price: '$0.20/unit' },
    { service: 'Poly bagging', price: '$0.30/unit' },
    { service: 'Bubble wrap', price: '$0.40/unit' },
    { service: 'Suffocation warning stickers', price: '$0.10/unit' },
    { service: 'Box labeling', price: '$0.25/box' },
  ]

  const fbm = [
    { service: 'Order picking', price: '$0.50/order' },
    { service: 'Packing', price: '$0.75/order' },
    { service: 'Postage', price: 'At cost + 10%' },
    { service: 'Returns processing', price: '$1.50/return' },
  ]

  const storage = [
    { service: 'Standard storage (per pallet/month)', price: '$45' },
    { service: 'Bin storage (per unit/month)', price: '$0.50' },
    { service: 'Climate controlled (+)', price: '$15/pallet' },
    { service: 'Long-term storage (6+ months)', price: '$35/pallet' },
  ]

  const packaging = [
    { service: 'Small box (6x4x2")', price: '$0.50' },
    { service: 'Medium box (12x9x6")', price: '$1.00' },
    { service: 'Large box (18x14x12")', price: '$1.75' },
    { service: 'Poly mailers (10x13")', price: '$0.30' },
    { service: 'Bubble mailers (6x10")', price: '$0.40' },
    { service: 'Custom branded box', price: 'Quote' },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Transparent Pricing</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
            No hidden fees. No surprises. Pay only for what you use.
          </p>
          <p className="text-sm text-blue-200">Volume discounts available • Enterprise pricing upon request</p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 border-b border-slate-200">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <p className="text-lg text-slate-700">
            Our pricing is straightforward. Below are our standard rates. Contact us for volume discounts, custom packaging, or enterprise solutions.
          </p>
        </div>
      </section>

      {/* Pricing Tables */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl space-y-12">
          
          {/* Inbound */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Inbound Services</h2>
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Service</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {inbound.map((row) => (
                    <tr key={row.service}>
                      <td className="px-6 py-3 text-slate-700">{row.service}</td>
                      <td className="px-6 py-3 text-right font-semibold text-slate-900">{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* FBA */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">FBA Prep Services</h2>
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Service</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {fba.map((row) => (
                    <tr key={row.service}>
                      <td className="px-6 py-3 text-slate-700">{row.service}</td>
                      <td className="px-6 py-3 text-right font-semibold text-slate-900">{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* FBM */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">FBM & Fulfillment</h2>
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Service</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {fbm.map((row) => (
                    <tr key={row.service}>
                      <td className="px-6 py-3 text-slate-700">{row.service}</td>
                      <td className="px-6 py-3 text-right font-semibold text-slate-900">{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Storage */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Storage</h2>
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Service</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {storage.map((row) => (
                    <tr key={row.service}>
                      <td className="px-6 py-3 text-slate-700">{row.service}</td>
                      <td className="px-6 py-3 text-right font-semibold text-slate-900">{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Packaging */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Boxes & Packaging Materials</h2>
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Item</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {packaging.map((row) => (
                    <tr key={row.service}>
                      <td className="px-6 py-3 text-slate-700">{row.service}</td>
                      <td className="px-6 py-3 text-right font-semibold text-slate-900">{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* Notes */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h3 className="text-xl font-semibold text-slate-900 mb-4">Notes</h3>
          <ul className="space-y-2 text-slate-700">
            <li className="flex items-start gap-2">
              <CheckCircle size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
              <span>Volume discounts available for 1,000+ units/month</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
              <span>No setup fees or minimum volume requirements</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
              <span>All prices subject to change; custom quotes available</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
              <span>Shipping/postage charged at carrier rates + 10% handling</span>
            </li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need a Custom Quote?</h2>
          <p className="text-lg text-blue-100 mb-6">Contact us for enterprise pricing or specialized services</p>
          <Link to="/contact" className="inline-block px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 shadow-lg">
            Get a Quote
          </Link>
        </div>
      </section>
    </div>
  )
}
