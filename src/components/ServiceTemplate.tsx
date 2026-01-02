import { Link } from 'react-router-dom'
import { CheckCircle, ArrowRight, HelpCircle } from 'lucide-react'
import type { ReactNode } from 'react'

interface Benefit {
  icon: ReactNode
  title: string
  desc: string
}

interface Step {
  title: string
  desc: string
}

interface ServiceRow {
  item: string
  included: boolean
}

interface FAQ {
  q: string
  a: string
}

interface ServiceTemplateProps {
  hero: {
    title: string
    subtitle: string
    emoji: string
  }
  benefits: Benefit[]
  steps: Step[]
  serviceTable: ServiceRow[]
  integrations?: string[]
  stats: { label: string; value: string }[]
  faqs: FAQ[]
}

export default function ServiceTemplate({
  hero,
  benefits,
  steps,
  serviceTable,
  integrations,
  stats,
  faqs,
}: ServiceTemplateProps) {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="text-6xl mb-6">{hero.emoji}</div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">{hero.title}</h1>
            <p className="text-lg lg:text-xl text-blue-100 mb-8">{hero.subtitle}</p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/signup"
                className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 shadow-lg flex items-center gap-2"
              >
                Get Started <ArrowRight size={18} />
              </Link>
              <Link
                to="/pricing"
                className="px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-slate-50 border-y border-slate-200 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-blue-600">{stat.value}</p>
                <p className="text-sm text-slate-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Key Benefits</h2>
            <p className="text-lg text-slate-600">Why businesses choose us for this service</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-white p-6 rounded-xl border border-slate-200">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{benefit.title}</h3>
                <p className="text-slate-600 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-lg text-slate-600">Simple, streamlined process from start to finish</p>
          </div>
          <div className="max-w-4xl mx-auto space-y-6">
            {steps.map((step, idx) => (
              <div key={step.title} className="flex gap-4 items-start bg-white p-6 rounded-xl border border-slate-200">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">{step.title}</h3>
                  <p className="text-slate-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Table */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">What's Included</h2>
            <p className="text-lg text-slate-600">Comprehensive service coverage</p>
          </div>
          <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Service</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900">Included</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {serviceTable.map((row) => (
                  <tr key={row.item}>
                    <td className="px-6 py-4 text-slate-700">{row.item}</td>
                    <td className="px-6 py-4 text-center">
                      {row.included ? (
                        <CheckCircle size={20} className="text-green-600 inline-block" />
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Integrations (optional) */}
      {integrations && integrations.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Integrations</h2>
              <p className="text-lg text-slate-600">Seamlessly connect with your favorite platforms</p>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {integrations.map((platform) => (
                <div
                  key={platform}
                  className="w-32 h-20 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-600 font-semibold text-sm"
                >
                  {platform}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="bg-white border border-slate-200 rounded-xl p-6 group">
                <summary className="flex items-start gap-3 cursor-pointer list-none">
                  <HelpCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="font-semibold text-slate-900 flex-1">{faq.q}</span>
                </summary>
                <p className="mt-4 text-slate-600 pl-8">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-blue-100 mb-6">Join hundreds of businesses using this service</p>
          <Link to="/signup" className="inline-block px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 shadow-lg">
            Start Now
          </Link>
        </div>
      </section>
    </div>
  )
}
