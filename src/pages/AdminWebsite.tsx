import { useEffect, useMemo, useState } from 'react'
import { Navigate } from 'react-router-dom'
import PageShell from '../components/PageShell'
import {
  api,
  type AdminPublicLocation,
  type AdminCreatePublicLocationInput,
  type PublicHomeContent,
  type HomeBenefitIcon,
} from '../services/api'
import { useAuth } from '../contexts/AuthContext'

const emptyDraft: AdminCreatePublicLocationInput = {
  name: '',
  city: '',
  region: '',
  country: 'USA',
  lat: 0,
  lng: 0,
  is_active: true,
  sort_order: 0,
}

type HomeDraft = {
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

const defaultHomeDraft: HomeDraft = {
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

const normalizeHomeContent = (raw?: PublicHomeContent | null): HomeDraft => {
  const hero = raw?.hero || {}
  const cta = raw?.cta || {}

  return {
    hero: {
      title: hero.title || defaultHomeDraft.hero.title,
      subtitle: hero.subtitle || defaultHomeDraft.hero.subtitle,
      primaryCta: {
        label: hero.primaryCta?.label || defaultHomeDraft.hero.primaryCta.label,
        href: hero.primaryCta?.href || defaultHomeDraft.hero.primaryCta.href,
      },
      secondaryCta: {
        label: hero.secondaryCta?.label || defaultHomeDraft.hero.secondaryCta.label,
        href: hero.secondaryCta?.href || defaultHomeDraft.hero.secondaryCta.href,
      },
    },
    stats: raw?.stats?.length ? raw.stats.map((s) => ({ label: s.label || '', value: s.value || '' })) : defaultHomeDraft.stats,
    servicesSection: {
      title: raw?.servicesSection?.title || defaultHomeDraft.servicesSection.title,
      subtitle: raw?.servicesSection?.subtitle || defaultHomeDraft.servicesSection.subtitle,
    },
    services: raw?.services?.length
      ? raw.services.map((s) => ({ title: s.title || '', desc: s.desc || '', icon: s.icon || '📦', link: s.link || '/services' }))
      : defaultHomeDraft.services,
    mapSection: {
      title: raw?.mapSection?.title || defaultHomeDraft.mapSection.title,
      subtitle: raw?.mapSection?.subtitle || defaultHomeDraft.mapSection.subtitle,
    },
    benefitsSection: {
      title: raw?.benefitsSection?.title || defaultHomeDraft.benefitsSection.title,
      subtitle: raw?.benefitsSection?.subtitle || defaultHomeDraft.benefitsSection.subtitle,
    },
    benefits: raw?.benefits?.length
      ? raw.benefits.map((b) => ({
          icon: (b.icon || 'shield') as HomeBenefitIcon,
          title: b.title || '',
          desc: b.desc || '',
        }))
      : defaultHomeDraft.benefits,
    cta: {
      title: cta.title || defaultHomeDraft.cta.title,
      subtitle: cta.subtitle || defaultHomeDraft.cta.subtitle,
      primaryCta: {
        label: cta.primaryCta?.label || defaultHomeDraft.cta.primaryCta.label,
        href: cta.primaryCta?.href || defaultHomeDraft.cta.primaryCta.href,
      },
      secondaryCta: {
        label: cta.secondaryCta?.label || defaultHomeDraft.cta.secondaryCta.label,
        href: cta.secondaryCta?.href || defaultHomeDraft.cta.secondaryCta.href,
      },
    },
  }
}

export default function AdminWebsite() {
  const { user, getRedirectPath } = useAuth()

  if (user && user.role !== 'SUPERADMIN') {
    return <Navigate to={getRedirectPath(user.role)} replace />
  }

  const [rows, setRows] = useState<AdminPublicLocation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [homeDraft, setHomeDraft] = useState<HomeDraft>(defaultHomeDraft)
  const [homeLoading, setHomeLoading] = useState(true)
  const [homeError, setHomeError] = useState<string | null>(null)
  const [homeSaving, setHomeSaving] = useState(false)
  const [homeSaved, setHomeSaved] = useState<string | null>(null)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editing, setEditing] = useState<AdminPublicLocation | null>(null)
  const [draft, setDraft] = useState<AdminCreatePublicLocationInput>(emptyDraft)

  const title = useMemo(() => (editing ? 'Edit Location' : 'Add Location'), [editing])

  const load = async () => {
    setLoading(true)
    setHomeLoading(true)
    setError(null)
    setHomeError(null)
    try {
      const [homeRes, locRes] = await Promise.allSettled([
        api.adminGetHomeContent(),
        api.adminListPublicLocations(),
      ])

      if (homeRes.status === 'fulfilled') {
        setHomeDraft(normalizeHomeContent(homeRes.value))
      } else {
        setHomeError(homeRes.reason?.message || 'Failed to load homepage content')
      }

      if (locRes.status === 'fulfilled') {
        setRows(locRes.value)
      } else {
        setError(locRes.reason?.message || 'Failed to load locations')
      }
    } catch (e: any) {
      setError(e?.message || 'Failed to load locations')
    } finally {
      setLoading(false)
      setHomeLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const openCreate = () => {
    setEditing(null)
    setDraft({ ...emptyDraft })
    setIsModalOpen(true)
  }

  const openEdit = (row: AdminPublicLocation) => {
    setEditing(row)
    setDraft({
      name: row.name,
      city: row.city,
      region: row.region || '',
      country: row.country,
      lat: row.lat,
      lng: row.lng,
      is_active: row.is_active,
      sort_order: row.sort_order,
    })
    setIsModalOpen(true)
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      if (editing) {
        await api.adminUpdatePublicLocation(editing.id, {
          name: draft.name,
          city: draft.city,
          region: draft.region || null,
          country: draft.country,
          lat: draft.lat,
          lng: draft.lng,
          is_active: draft.is_active,
          sort_order: draft.sort_order,
        })
      } else {
        await api.adminCreatePublicLocation({
          name: draft.name,
          city: draft.city,
          region: draft.region || null,
          country: draft.country,
          lat: draft.lat,
          lng: draft.lng,
          is_active: draft.is_active,
          sort_order: draft.sort_order,
        })
      }
      setIsModalOpen(false)
      await load()
    } catch (e: any) {
      setError(e?.message || 'Save failed')
    }
  }

  const remove = async (row: AdminPublicLocation) => {
    if (!confirm(`Delete location “${row.city}”?`)) return
    setError(null)

    try {
      await api.adminDeletePublicLocation(row.id)
      await load()
    } catch (e: any) {
      setError(e?.message || 'Delete failed')
    }
  }

  const saveHome = async () => {
    setHomeSaving(true)
    setHomeError(null)
    setHomeSaved(null)
    try {
      await api.adminUpsertHomeContent(homeDraft)
      setHomeSaved('Homepage saved')
    } catch (e: any) {
      setHomeError(e?.message || 'Failed to save homepage')
    } finally {
      setHomeSaving(false)
    }
  }

  return (
    <PageShell
      title="Website Content"
      subtitle="Update the public marketing site content (homepage + locations + map)."
      breadcrumbs={[{ label: 'Admin', href: '/dashboard/admin/overview' }, { label: 'Website' }]}
      actions={
        <div className="flex flex-wrap gap-2">
          <button className="sf-btn sf-btn-secondary" onClick={saveHome} disabled={homeSaving || homeLoading}>
            {homeSaving ? 'Saving…' : 'Save homepage'}
          </button>
          <button className="sf-btn sf-btn-primary" onClick={openCreate}>
            Add location
          </button>
        </div>
      }
    >
      {(homeError || error) && (
        <div className="sf-alert sf-alert-error">{homeError || error}</div>
      )}
      {homeSaved && (
        <div className="sf-alert sf-alert-success">{homeSaved}</div>
      )}

      <div className="card p-6 mb-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="section-title">Homepage</div>
            <h2 className="text-lg font-semibold text-slate-900 mt-2">Marketing Homepage Content</h2>
            <p className="text-sm text-slate-500 mt-1">Edit hero, stats, services, benefits and CTA. Changes apply to the public home page.</p>
          </div>
        </div>

        {homeLoading ? (
          <div className="py-10 text-center text-sm text-slate-500">Loading homepage content…</div>
        ) : (
          <div className="mt-6 space-y-8">
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="text-sm font-semibold text-slate-900">Hero</div>
                <label className="space-y-1">
                  <div className="sf-label">Title</div>
                  <input className="sf-input" value={homeDraft.hero.title} onChange={(e) => setHomeDraft({ ...homeDraft, hero: { ...homeDraft.hero, title: e.target.value } })} />
                </label>
                <label className="space-y-1">
                  <div className="sf-label">Subtitle</div>
                  <textarea className="sf-input" rows={3} value={homeDraft.hero.subtitle} onChange={(e) => setHomeDraft({ ...homeDraft, hero: { ...homeDraft.hero, subtitle: e.target.value } })} />
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="space-y-1">
                    <div className="sf-label">Primary CTA label</div>
                    <input className="sf-input" value={homeDraft.hero.primaryCta.label} onChange={(e) => setHomeDraft({ ...homeDraft, hero: { ...homeDraft.hero, primaryCta: { ...homeDraft.hero.primaryCta, label: e.target.value } } })} />
                  </label>
                  <label className="space-y-1">
                    <div className="sf-label">Primary CTA link</div>
                    <input className="sf-input" value={homeDraft.hero.primaryCta.href} onChange={(e) => setHomeDraft({ ...homeDraft, hero: { ...homeDraft.hero, primaryCta: { ...homeDraft.hero.primaryCta, href: e.target.value } } })} />
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <label className="space-y-1">
                    <div className="sf-label">Secondary CTA label</div>
                    <input className="sf-input" value={homeDraft.hero.secondaryCta.label} onChange={(e) => setHomeDraft({ ...homeDraft, hero: { ...homeDraft.hero, secondaryCta: { ...homeDraft.hero.secondaryCta, label: e.target.value } } })} />
                  </label>
                  <label className="space-y-1">
                    <div className="sf-label">Secondary CTA link</div>
                    <input className="sf-input" value={homeDraft.hero.secondaryCta.href} onChange={(e) => setHomeDraft({ ...homeDraft, hero: { ...homeDraft.hero, secondaryCta: { ...homeDraft.hero.secondaryCta, href: e.target.value } } })} />
                  </label>
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-sm font-semibold text-slate-900">CTA Section</div>
                <label className="space-y-1">
                  <div className="sf-label">Title</div>
                  <input className="sf-input" value={homeDraft.cta.title} onChange={(e) => setHomeDraft({ ...homeDraft, cta: { ...homeDraft.cta, title: e.target.value } })} />
                </label>
                <label className="space-y-1">
                  <div className="sf-label">Subtitle</div>
                  <textarea className="sf-input" rows={3} value={homeDraft.cta.subtitle} onChange={(e) => setHomeDraft({ ...homeDraft, cta: { ...homeDraft.cta, subtitle: e.target.value } })} />
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="space-y-1">
                    <div className="sf-label">Primary CTA label</div>
                    <input className="sf-input" value={homeDraft.cta.primaryCta.label} onChange={(e) => setHomeDraft({ ...homeDraft, cta: { ...homeDraft.cta, primaryCta: { ...homeDraft.cta.primaryCta, label: e.target.value } } })} />
                  </label>
                  <label className="space-y-1">
                    <div className="sf-label">Primary CTA link</div>
                    <input className="sf-input" value={homeDraft.cta.primaryCta.href} onChange={(e) => setHomeDraft({ ...homeDraft, cta: { ...homeDraft.cta, primaryCta: { ...homeDraft.cta.primaryCta, href: e.target.value } } })} />
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <label className="space-y-1">
                    <div className="sf-label">Secondary CTA label</div>
                    <input className="sf-input" value={homeDraft.cta.secondaryCta.label} onChange={(e) => setHomeDraft({ ...homeDraft, cta: { ...homeDraft.cta, secondaryCta: { ...homeDraft.cta.secondaryCta, label: e.target.value } } })} />
                  </label>
                  <label className="space-y-1">
                    <div className="sf-label">Secondary CTA link</div>
                    <input className="sf-input" value={homeDraft.cta.secondaryCta.href} onChange={(e) => setHomeDraft({ ...homeDraft, cta: { ...homeDraft.cta, secondaryCta: { ...homeDraft.cta.secondaryCta, href: e.target.value } } })} />
                  </label>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="text-sm font-semibold text-slate-900">Stats</div>
                <div className="space-y-3">
                  {homeDraft.stats.map((s, idx) => (
                    <div key={`${s.label}-${idx}`} className="grid grid-cols-5 gap-3 items-end">
                      <label className="space-y-1 col-span-2">
                        <div className="sf-label">Value</div>
                        <input className="sf-input" value={s.value} onChange={(e) => {
                          const next = [...homeDraft.stats]
                          next[idx] = { ...next[idx], value: e.target.value }
                          setHomeDraft({ ...homeDraft, stats: next })
                        }} />
                      </label>
                      <label className="space-y-1 col-span-2">
                        <div className="sf-label">Label</div>
                        <input className="sf-input" value={s.label} onChange={(e) => {
                          const next = [...homeDraft.stats]
                          next[idx] = { ...next[idx], label: e.target.value }
                          setHomeDraft({ ...homeDraft, stats: next })
                        }} />
                      </label>
                      <button type="button" className="sf-btn sf-btn-secondary" onClick={() => setHomeDraft({ ...homeDraft, stats: homeDraft.stats.filter((_, i) => i !== idx) })}>
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                <button type="button" className="sf-btn sf-btn-soft" onClick={() => setHomeDraft({ ...homeDraft, stats: [...homeDraft.stats, { label: 'New metric', value: '0' }] })}>
                  Add stat
                </button>
              </div>

              <div className="space-y-3">
                <div className="text-sm font-semibold text-slate-900">Map Section</div>
                <label className="space-y-1">
                  <div className="sf-label">Title</div>
                  <input className="sf-input" value={homeDraft.mapSection.title} onChange={(e) => setHomeDraft({ ...homeDraft, mapSection: { ...homeDraft.mapSection, title: e.target.value } })} />
                </label>
                <label className="space-y-1">
                  <div className="sf-label">Subtitle</div>
                  <textarea className="sf-input" rows={3} value={homeDraft.mapSection.subtitle} onChange={(e) => setHomeDraft({ ...homeDraft, mapSection: { ...homeDraft.mapSection, subtitle: e.target.value } })} />
                </label>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="text-sm font-semibold text-slate-900">Services</div>
                <div className="grid grid-cols-2 gap-3">
                  <label className="space-y-1">
                    <div className="sf-label">Section title</div>
                    <input className="sf-input" value={homeDraft.servicesSection.title} onChange={(e) => setHomeDraft({ ...homeDraft, servicesSection: { ...homeDraft.servicesSection, title: e.target.value } })} />
                  </label>
                  <label className="space-y-1">
                    <div className="sf-label">Section subtitle</div>
                    <input className="sf-input" value={homeDraft.servicesSection.subtitle} onChange={(e) => setHomeDraft({ ...homeDraft, servicesSection: { ...homeDraft.servicesSection, subtitle: e.target.value } })} />
                  </label>
                </div>
                <div className="space-y-3">
                  {homeDraft.services.map((s, idx) => (
                    <div key={`${s.title}-${idx}`} className="grid grid-cols-12 gap-3 items-end">
                      <label className="space-y-1 col-span-3">
                        <div className="sf-label">Title</div>
                        <input className="sf-input" value={s.title} onChange={(e) => {
                          const next = [...homeDraft.services]
                          next[idx] = { ...next[idx], title: e.target.value }
                          setHomeDraft({ ...homeDraft, services: next })
                        }} />
                      </label>
                      <label className="space-y-1 col-span-4">
                        <div className="sf-label">Description</div>
                        <input className="sf-input" value={s.desc} onChange={(e) => {
                          const next = [...homeDraft.services]
                          next[idx] = { ...next[idx], desc: e.target.value }
                          setHomeDraft({ ...homeDraft, services: next })
                        }} />
                      </label>
                      <label className="space-y-1 col-span-1">
                        <div className="sf-label">Icon</div>
                        <input className="sf-input" value={s.icon} onChange={(e) => {
                          const next = [...homeDraft.services]
                          next[idx] = { ...next[idx], icon: e.target.value }
                          setHomeDraft({ ...homeDraft, services: next })
                        }} />
                      </label>
                      <label className="space-y-1 col-span-3">
                        <div className="sf-label">Link</div>
                        <input className="sf-input" value={s.link} onChange={(e) => {
                          const next = [...homeDraft.services]
                          next[idx] = { ...next[idx], link: e.target.value }
                          setHomeDraft({ ...homeDraft, services: next })
                        }} />
                      </label>
                      <button type="button" className="sf-btn sf-btn-secondary col-span-1" onClick={() => setHomeDraft({ ...homeDraft, services: homeDraft.services.filter((_, i) => i !== idx) })}>
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <button type="button" className="sf-btn sf-btn-soft" onClick={() => setHomeDraft({ ...homeDraft, services: [...homeDraft.services, { title: 'New service', desc: 'Description', icon: '✨', link: '/services' }] })}>
                  Add service
                </button>
              </div>

              <div className="space-y-3">
                <div className="text-sm font-semibold text-slate-900">Benefits</div>
                <div className="grid grid-cols-2 gap-3">
                  <label className="space-y-1">
                    <div className="sf-label">Section title</div>
                    <input className="sf-input" value={homeDraft.benefitsSection.title} onChange={(e) => setHomeDraft({ ...homeDraft, benefitsSection: { ...homeDraft.benefitsSection, title: e.target.value } })} />
                  </label>
                  <label className="space-y-1">
                    <div className="sf-label">Section subtitle</div>
                    <input className="sf-input" value={homeDraft.benefitsSection.subtitle} onChange={(e) => setHomeDraft({ ...homeDraft, benefitsSection: { ...homeDraft.benefitsSection, subtitle: e.target.value } })} />
                  </label>
                </div>
                <div className="space-y-3">
                  {homeDraft.benefits.map((b, idx) => (
                    <div key={`${b.title}-${idx}`} className="grid grid-cols-12 gap-3 items-end">
                      <label className="space-y-1 col-span-3">
                        <div className="sf-label">Icon</div>
                        <select className="sf-input" value={b.icon} onChange={(e) => {
                          const next = [...homeDraft.benefits]
                          next[idx] = { ...next[idx], icon: e.target.value as HomeBenefitIcon }
                          setHomeDraft({ ...homeDraft, benefits: next })
                        }}>
                          <option value="trending_up">Trending</option>
                          <option value="users">Users</option>
                          <option value="globe">Globe</option>
                          <option value="shield">Shield</option>
                        </select>
                      </label>
                      <label className="space-y-1 col-span-4">
                        <div className="sf-label">Title</div>
                        <input className="sf-input" value={b.title} onChange={(e) => {
                          const next = [...homeDraft.benefits]
                          next[idx] = { ...next[idx], title: e.target.value }
                          setHomeDraft({ ...homeDraft, benefits: next })
                        }} />
                      </label>
                      <label className="space-y-1 col-span-4">
                        <div className="sf-label">Description</div>
                        <input className="sf-input" value={b.desc} onChange={(e) => {
                          const next = [...homeDraft.benefits]
                          next[idx] = { ...next[idx], desc: e.target.value }
                          setHomeDraft({ ...homeDraft, benefits: next })
                        }} />
                      </label>
                      <button type="button" className="sf-btn sf-btn-secondary col-span-1" onClick={() => setHomeDraft({ ...homeDraft, benefits: homeDraft.benefits.filter((_, i) => i !== idx) })}>
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <button type="button" className="sf-btn sf-btn-soft" onClick={() => setHomeDraft({ ...homeDraft, benefits: [...homeDraft.benefits, { icon: 'shield', title: 'New benefit', desc: 'Description' }] })}>
                  Add benefit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="card p-0 overflow-hidden">
        <div className="sf-table-wrap">
          <table className="sf-table">
            <thead>
              <tr>
                <th className="sf-th">Order</th>
                <th className="sf-th">Name</th>
                <th className="sf-th">City</th>
                <th className="sf-th">Region</th>
                <th className="sf-th">Country</th>
                <th className="sf-th">Lat</th>
                <th className="sf-th">Lng</th>
                <th className="sf-th">Active</th>
                <th className="sf-th text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="sf-td" colSpan={9}>
                    <div className="py-10 text-center text-sm text-slate-500">Loading…</div>
                  </td>
                </tr>
              ) : rows.length ? (
                rows.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50 transition">
                    <td className="sf-td text-slate-700 text-sm">{r.sort_order}</td>
                    <td className="sf-td text-slate-900 text-sm font-medium">{r.name}</td>
                    <td className="sf-td text-slate-700 text-sm">{r.city}</td>
                    <td className="sf-td text-slate-700 text-sm">{r.region || '-'}</td>
                    <td className="sf-td text-slate-700 text-sm">{r.country}</td>
                    <td className="sf-td text-slate-700 text-sm">{r.lat.toFixed(4)}</td>
                    <td className="sf-td text-slate-700 text-sm">{r.lng.toFixed(4)}</td>
                    <td className="sf-td">
                      <span className={r.is_active ? 'sf-badge bg-emerald-100 text-emerald-800' : 'sf-badge bg-slate-100 text-slate-700'}>
                        {r.is_active ? 'Active' : 'Hidden'}
                      </span>
                    </td>
                    <td className="sf-td">
                      <div className="flex justify-end gap-2">
                        <button className="sf-btn sf-btn-soft text-sm px-3 py-1.5" onClick={() => openEdit(r)}>
                          Edit
                        </button>
                        <button className="sf-btn sf-btn-danger text-sm px-3 py-1.5" onClick={() => remove(r)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="sf-td" colSpan={9}>
                    <div className="py-10 text-center text-sm text-slate-500">No locations yet.</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="sf-modal-backdrop" role="dialog" aria-modal="true">
          <div className="sf-modal">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
              <button className="sf-btn sf-btn-secondary px-3 py-1.5" onClick={() => setIsModalOpen(false)} aria-label="Close" type="button">
                ✕
              </button>
            </div>

            <form onSubmit={submit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <label className="space-y-1">
                  <div className="sf-label">Name</div>
                  <input className="sf-input" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} required />
                </label>
                <label className="space-y-1">
                  <div className="sf-label">City</div>
                  <input className="sf-input" value={draft.city} onChange={(e) => setDraft({ ...draft, city: e.target.value })} required />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <label className="space-y-1">
                  <div className="sf-label">Region / State</div>
                  <input className="sf-input" value={draft.region || ''} onChange={(e) => setDraft({ ...draft, region: e.target.value })} />
                </label>
                <label className="space-y-1">
                  <div className="sf-label">Country</div>
                  <input className="sf-input" value={draft.country || ''} onChange={(e) => setDraft({ ...draft, country: e.target.value })} />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <label className="space-y-1">
                  <div className="sf-label">Latitude</div>
                  <input
                    className="sf-input"
                    type="number"
                    step="0.0001"
                    value={Number.isFinite(draft.lat) ? draft.lat : 0}
                    onChange={(e) => setDraft({ ...draft, lat: Number(e.target.value) })}
                    required
                  />
                </label>
                <label className="space-y-1">
                  <div className="sf-label">Longitude</div>
                  <input
                    className="sf-input"
                    type="number"
                    step="0.0001"
                    value={Number.isFinite(draft.lng) ? draft.lng : 0}
                    onChange={(e) => setDraft({ ...draft, lng: Number(e.target.value) })}
                    required
                  />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <label className="space-y-1">
                  <div className="sf-label">Sort order</div>
                  <input
                    className="sf-input"
                    type="number"
                    value={draft.sort_order ?? 0}
                    onChange={(e) => setDraft({ ...draft, sort_order: Number(e.target.value) })}
                  />
                </label>
                <label className="space-y-1">
                  <div className="sf-label">Visible on site</div>
                  <select
                    className="sf-input"
                    value={draft.is_active ? 'yes' : 'no'}
                    onChange={(e) => setDraft({ ...draft, is_active: e.target.value === 'yes' })}
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button type="button" className="sf-btn sf-btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="sf-btn sf-btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PageShell>
  )
}
