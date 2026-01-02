import { CheckCircle, Target, Users, Award } from 'lucide-react'

export default function AboutPage() {
  const values = [
    { icon: <Target />, title: 'Mission-Driven', desc: 'Empower e-commerce businesses to scale globally' },
    { icon: <Users />, title: 'Customer First', desc: 'Your success is our priority' },
    { icon: <Award />, title: 'Excellence', desc: 'Industry-leading standards and accuracy' },
    { icon: <CheckCircle />, title: 'Transparency', desc: 'Honest pricing, no hidden fees' },
  ]

  const timeline = [
    { year: '2018', event: 'Founded in Los Angeles' },
    { year: '2019', event: 'Expanded to 5 warehouses' },
    { year: '2021', event: 'Launched FBA prep services' },
    { year: '2023', event: 'Reached 1M orders fulfilled' },
    { year: '2025', event: '12 warehouses, 40+ countries' },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">About ShipFex</h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Trusted logistics partner for e-commerce businesses since 2018
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Story</h2>
            <p className="text-lg text-slate-600 mb-4">
              ShipFex was founded by e-commerce entrepreneurs who experienced firsthand the challenges of scaling logistics operations. We built the fulfillment solution we wished existed.
            </p>
            <p className="text-lg text-slate-600 mb-4">
              Today, we operate 12 fulfillment centers across North America, serving hundreds of businesses and processing millions of orders annually.
            </p>
            <p className="text-lg text-slate-600">
              Our commitment to transparency, technology, and customer service sets us apart in the industry.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Values</h2>
            <p className="text-lg text-slate-600">Principles that guide every decision we make</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="bg-white p-6 rounded-xl border border-slate-200 text-center">
                <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{value.title}</h3>
                <p className="text-slate-600 text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Journey</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {timeline.map((item) => (
                <div key={item.year} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                    {item.year}
                  </div>
                  <div className="flex-1 pt-3">
                    <p className="text-lg text-slate-900">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Success Story</h2>
          <p className="text-lg text-blue-100 mb-6">Let's grow together</p>
          <a href="/signup" className="inline-block px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50">
            Get Started
          </a>
        </div>
      </section>
    </div>
  )
}
