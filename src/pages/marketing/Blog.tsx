import { Calendar, User, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function BlogPage() {
  const [subscribed, setSubscribed] = useState(false)

  const posts = [
    {
      title: 'How to Prepare Your Products for Amazon FBA in 2026',
      excerpt: 'A comprehensive guide to Amazon FBA prep requirements, common mistakes, and best practices for successful shipments.',
      date: 'Jan 15, 2026',
      author: 'Sarah Chen',
      category: 'Amazon FBA',
      slug: 'fba-prep-guide-2026',
    },
    {
      title: 'Dropshipping vs Traditional Fulfillment: Which is Right for You?',
      excerpt: 'Comparing business models, costs, and operational complexity to help you choose the best fulfillment strategy.',
      date: 'Jan 10, 2026',
      author: 'Mike Rodriguez',
      category: 'E-commerce',
      slug: 'dropshipping-vs-traditional',
    },
    {
      title: 'Understanding Customs Duties and Import Taxes',
      excerpt: 'Everything you need to know about HS codes, duty rates, and how to minimize import costs for your business.',
      date: 'Jan 5, 2026',
      author: 'Jennifer Park',
      category: 'Customs',
      slug: 'customs-duties-guide',
    },
    {
      title: '5 Ways to Reduce Logistics Costs Without Compromising Quality',
      excerpt: 'Practical strategies for optimizing your supply chain and cutting expenses while maintaining service levels.',
      date: 'Dec 28, 2025',
      author: 'David Kim',
      category: 'Logistics',
      slug: 'reduce-logistics-costs',
    },
    {
      title: 'Peak Season Preparation: Q4 Fulfillment Strategies',
      excerpt: 'How to prepare your inventory, staffing, and operations for holiday shopping surges and peak demand.',
      date: 'Dec 20, 2025',
      author: 'Sarah Chen',
      category: 'Operations',
      slug: 'peak-season-prep',
    },
    {
      title: 'The Complete Guide to Warehouse Management Systems (WMS)',
      excerpt: 'What is a WMS, why you need one, and how to choose the right system for your fulfillment operation.',
      date: 'Dec 15, 2025',
      author: 'Mike Rodriguez',
      category: 'Technology',
      slug: 'wms-guide',
    },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">ShipFex Blog</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Insights, guides, and best practices for e-commerce fulfillment and logistics
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.slug} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition group">
                <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200"></div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full mb-3">
                    {post.category}
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition">
                    {post.title}
                  </h2>
                  <p className="text-slate-600 text-sm mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} /> {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <User size={14} /> {post.author}
                      </span>
                    </div>
                    <Link to={`/blog/${post.slug}`} className="text-blue-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                      Read <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Get Logistics Insights in Your Inbox</h2>
          <p className="text-slate-300 mb-6">Weekly tips, industry news, and fulfillment best practices</p>
          <form
            className="flex gap-2 max-w-md mx-auto"
            onSubmit={(e) => {
              e.preventDefault()
              setSubscribed(true)
            }}
          >
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-lg text-slate-900"
              required
              disabled={subscribed}
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={subscribed}
            >
              {subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
