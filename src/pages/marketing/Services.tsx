import { Link } from 'react-router-dom'
import { CheckCircle, ArrowRight } from 'lucide-react'

export default function ServicesPage() {
  const services = [
    {
      title: 'Amazon FBA',
      desc: 'Complete FBA prep, labeling, and shipping to Amazon fulfillment centers',
      icon: '📦',
      link: '/services/amazon-fba',
      features: ['Labeling & prep', 'Amazon compliance', 'Direct shipping', 'Case pack breakdown'],
    },
    {
      title: 'Amazon FBM',
      desc: 'Full-service fulfillment for Fulfillment by Merchant sellers',
      icon: '🚚',
      link: '/services/amazon-fbm',
      features: ['Pick & pack', 'Same-day shipping', 'Real-time tracking', 'Returns management'],
    },
    {
      title: 'Dropshipping',
      desc: 'Seamless order fulfillment integration for your online store',
      icon: '🔗',
      link: '/services/dropshipping',
      features: ['API integration', 'White-label packing', 'Multi-channel', 'Automated workflows'],
    },
    {
      title: 'Logistics',
      desc: 'End-to-end supply chain and transportation management',
      icon: '🌍',
      link: '/services/logistics',
      features: ['Freight forwarding', 'Last-mile delivery', 'Route optimization', 'Carrier network'],
    },
    {
      title: 'Customs & Compliance',
      desc: 'Expert customs clearance and international shipping support',
      icon: '📋',
      link: '/services/customs',
      features: ['Documentation', 'Duty calculation', 'Compliance', 'Brokerage'],
    },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Comprehensive logistics and fulfillment solutions for every stage of your business
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            {services.map((service, idx) => (
              <div
                key={service.title}
                className={`border border-slate-200 rounded-2xl overflow-hidden ${
                  idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                }`}
              >
                <div className="grid lg:grid-cols-2 gap-8 p-8">
                  <div>
                    <div className="text-5xl mb-4">{service.icon}</div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">{service.title}</h2>
                    <p className="text-lg text-slate-600 mb-6">{service.desc}</p>
                    <Link
                      to={service.link}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                    >
                      Learn More <ArrowRight size={18} />
                    </Link>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">What's Included:</h3>
                    <ul className="space-y-3">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-slate-700">
                          <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Not Sure Which Service You Need?</h2>
          <p className="text-lg text-slate-300 mb-6">Talk to our experts—we'll help you find the right solution</p>
          <Link to="/contact" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  )
}
