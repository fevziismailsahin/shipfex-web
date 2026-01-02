import { Link } from 'react-router-dom'
import { ArrowRight, TrendingUp, Users, Globe, Shield } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import PublicLocationsMap from '../../components/PublicLocationsMap'
import { api, type PublicLocation, type HomeBenefitIcon } from '../../services/api'

type HomeContentFull = {
  hero: {
    title: string
    subtitle: string
    primaryCta: { label: string; href: string }
    secondaryCta: { label: string; href: string }
  }
  stats: Array<{ label: string; value: string }>
  servicesSection: { title: string; subtitle: string }
  services: Array<{ title: string; desc: string; icon: string; link: string }>
  mapSection: { title: string; subtitle: string }
  benefitsSection: { title: string; subtitle: string }
  benefits: Array<{ icon: HomeBenefitIcon; title: string; desc: string }>
  cta: {
    title: string
    subtitle: string
    primaryCta: { label: string; href: string }
    secondaryCta: { label: string; href: string }
  }
}

const defaultHomeContent: HomeContentFull = {
  hero: {
    title: 'Professional Fulfillment & Logistics for E-Commerce Success',
    subtitle:
      'Streamline your operations with our comprehensive warehouse, FBA prep, and shipping services across North America. Scale your business with confidence.',
    primaryCta: { label: 'Get Started', href: '/signup' },
    secondaryCta: { label: 'View Pricing', href: '/pricing' },
  },
  stats: [
    { label: 'Orders fulfilled', value: '2.4M+' },
    { label: 'Warehouses', value: '12' },
    { label: 'Client satisfaction', value: '98%' },
    { label: 'Countries served', value: '40+' },
  ],
  servicesSection: {
    title: 'Our Services',
    subtitle: 'Comprehensive logistics solutions tailored for e-commerce businesses',
  },
  services: [
    { title: 'Amazon FBA', desc: 'Full prep, labeling, and direct shipping to Amazon warehouses', icon: '📦', link: '/services/amazon-fba' },
    { title: 'Amazon FBM', desc: 'Store, pick, pack, and ship orders directly to customers', icon: '🚚', link: '/services/amazon-fbm' },
    { title: 'Dropshipping', desc: 'Seamless order fulfillment for your online store', icon: '🛒', link: '/services/dropshipping' },
    { title: 'Logistics', desc: 'End-to-end supply chain management and transportation', icon: '🌍', link: '/services/logistics' },
    { title: 'Customs', desc: 'Compliance, documentation, and customs clearance', icon: '📋', link: '/services/customs' },
  ],
  mapSection: {
    title: 'Strategic Warehouse Locations',
    subtitle: 'Fulfillment centers strategically positioned across North America for fast, reliable delivery',
  },
  benefitsSection: {
    title: 'Why ShipFex?',
    subtitle: 'Built on trust, transparency, and operational excellence',
  },
  benefits: [
    { icon: 'trending_up', title: 'Fast Turnaround', desc: 'Same-day processing for most orders' },
    { icon: 'users', title: 'Dedicated Support', desc: '24/7 customer service and account managers' },
    { icon: 'globe', title: 'North America Coverage', desc: 'Strategic warehouse locations across the US and Canada' },
    { icon: 'shield', title: 'Trust & Transparency', desc: 'Real-time tracking and honest pricing' },
  ],
  cta: {
    title: 'Ready to Scale Your Business?',
    subtitle: 'Join hundreds of e-commerce businesses that trust ShipFex for their fulfillment needs',
    primaryCta: { label: 'Get Started Free', href: '/signup' },
    secondaryCta: { label: 'Contact Sales', href: '/contact' },
  },
}

function benefitIcon(icon: HomeBenefitIcon) {
  switch (icon) {
    case 'trending_up':
      return <TrendingUp />
    case 'users':
      return <Users />
    case 'globe':
      return <Globe />
    case 'shield':
      return <Shield />
    default:
      return <Shield />
  }
}

export default function HomePage() {
  const [locations, setLocations] = useState<PublicLocation[]>([])
  const [locationsLoading, setLocationsLoading] = useState(true)

  const [content, setContent] = useState<HomeContentFull>(defaultHomeContent)

  useEffect(() => {
    const run = async () => {
      try {
        const home = await api.publicGetHomeContent()
        const merged: HomeContentFull = {
          hero: {
            title: home.hero?.title || defaultHomeContent.hero.title,
            subtitle: home.hero?.subtitle || defaultHomeContent.hero.subtitle,
            primaryCta: {
              label: home.hero?.primaryCta?.label || defaultHomeContent.hero.primaryCta.label,
              href: home.hero?.primaryCta?.href || defaultHomeContent.hero.primaryCta.href,
            },
            secondaryCta: {
              label: home.hero?.secondaryCta?.label || defaultHomeContent.hero.secondaryCta.label,
              href: home.hero?.secondaryCta?.href || defaultHomeContent.hero.secondaryCta.href,
            },
          },
          stats: home.stats?.length ? home.stats.map((s) => ({ label: s.label || '', value: s.value || '' })) : defaultHomeContent.stats,
          servicesSection: {
            title: home.servicesSection?.title || defaultHomeContent.servicesSection.title,
            subtitle: home.servicesSection?.subtitle || defaultHomeContent.servicesSection.subtitle,
          },
          services: home.services?.length
            ? home.services.map((s) => ({ title: s.title || '', desc: s.desc || '', icon: s.icon || '📦', link: s.link || '/services' }))
            : defaultHomeContent.services,
          mapSection: {
            title: home.mapSection?.title || defaultHomeContent.mapSection.title,
            subtitle: home.mapSection?.subtitle || defaultHomeContent.mapSection.subtitle,
          },
          benefitsSection: {
            title: home.benefitsSection?.title || defaultHomeContent.benefitsSection.title,
            subtitle: home.benefitsSection?.subtitle || defaultHomeContent.benefitsSection.subtitle,
          },
          benefits: home.benefits?.length
            ? home.benefits.map((b) => ({
                icon: (b.icon || 'shield') as HomeBenefitIcon,
                title: b.title || '',
                desc: b.desc || '',
              }))
            : defaultHomeContent.benefits,
          cta: {
            title: home.cta?.title || defaultHomeContent.cta.title,
            subtitle: home.cta?.subtitle || defaultHomeContent.cta.subtitle,
            primaryCta: {
              label: home.cta?.primaryCta?.label || defaultHomeContent.cta.primaryCta.label,
              href: home.cta?.primaryCta?.href || defaultHomeContent.cta.primaryCta.href,
            },
            secondaryCta: {
              label: home.cta?.secondaryCta?.label || defaultHomeContent.cta.secondaryCta.label,
              href: home.cta?.secondaryCta?.href || defaultHomeContent.cta.secondaryCta.href,
            },
          },
        }
        setContent(merged)
        const rows = await api.publicListLocations()
        setLocations(rows)
      } catch {
        setContent(defaultHomeContent)
        setLocations([])
      } finally {
        setLocationsLoading(false)
      }
    }
    run()
  }, [])

  const locationsLabel = useMemo(() => {
    if (!locations.length) return ''
    return locations
      .map((l) => l.city)
      .filter(Boolean)
      .slice(0, 8)
      .join(' • ')
  }, [locations])

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              {content.hero.title}
            </h1>
            <p className="text-lg lg:text-xl text-blue-100 mb-8">
              {content.hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to={content.hero.primaryCta.href}
                className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 shadow-lg flex items-center gap-2"
              >
                {content.hero.primaryCta.label} <ArrowRight size={18} />
              </Link>
              <Link
                to={content.hero.secondaryCta.href}
                className="px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10"
              >
                {content.hero.secondaryCta.label}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-slate-50 border-y border-slate-200 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {content.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-blue-600">{stat.value}</p>
                <p className="text-sm text-slate-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              {content.servicesSection.title}
            </h2>
            <p className="text-lg text-slate-600">
              {content.servicesSection.subtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.services.map((service) => (
              <Link
                key={service.title}
                to={service.link}
                className="p-6 border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition group"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-blue-600">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-sm">{service.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* North America Map */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              {content.mapSection.title}
            </h2>
            <p className="text-lg text-slate-600">
              {content.mapSection.subtitle}
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden">
              {locationsLoading ? (
                <div className="h-full w-full flex items-center justify-center">
                  <div className="text-sm text-slate-500">Loading map…</div>
                </div>
              ) : locations.length ? (
                <PublicLocationsMap locations={locations} className="h-full w-full" />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-center p-6">
                  <div>
                    <Globe size={64} className="text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600 text-sm font-medium">No locations configured yet</p>
                    <p className="text-xs text-slate-400 mt-2">Log in as admin to add locations.</p>
                  </div>
                </div>
              )}
            </div>
            {!!locationsLabel && (
              <p className="text-xs text-slate-500 mt-3 text-center">{locationsLabel}</p>
            )}
          </div>
        </div>
      </section>

      {/* Trust & Benefits */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              {content.benefitsSection.title}
            </h2>
            <p className="text-lg text-slate-600">
              {content.benefitsSection.subtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.benefits.map((benefit) => (
              <div key={benefit.title} className="text-center p-6">
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mx-auto mb-4">
                  {benefitIcon(benefit.icon)}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{benefit.title}</h3>
                <p className="text-slate-600 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            {content.cta.title}
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            {content.cta.subtitle}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to={content.cta.primaryCta.href}
              className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 shadow-lg"
            >
              {content.cta.primaryCta.label}
            </Link>
            <Link
              to={content.cta.secondaryCta.href}
              className="px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10"
            >
              {content.cta.secondaryCta.label}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
