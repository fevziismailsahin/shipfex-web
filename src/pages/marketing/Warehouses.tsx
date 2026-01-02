import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Package, Users, TrendingUp } from 'lucide-react'
import PublicLocationsMap from '../../components/PublicLocationsMap'
import { api, type PublicLocation } from '../../services/api'

export default function WarehousesPage() {
  const [locations, setLocations] = useState<PublicLocation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    const run = async () => {
      setLoading(true)
      setError(null)
      try {
        const rows = await api.publicListLocations()
        if (!mounted) return
        setLocations(rows)
      } catch (e) {
        if (!mounted) return
        const msg =
          e instanceof Error
            ? e.message
            : typeof e === 'object' && e && 'message' in e
              ? String((e as { message: unknown }).message)
              : String(e)
        setError(msg)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    void run()
    return () => {
      mounted = false
    }
  }, [])

  const stats = useMemo(() => {
    const countries = new Set(locations.map((l) => l.country))
    const cities = new Set(locations.map((l) => l.city))
    return [
      { label: 'Locations', value: String(locations.length) },
      { label: 'Countries', value: String(countries.size) },
      { label: 'Cities', value: String(cities.size) },
      { label: 'Coverage', value: locations.length ? 'North America' : '—' },
    ]
  }, [locations])

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Our Warehouse Network</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Strategically located fulfillment centers across North America for fast, reliable delivery
          </p>
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

      {/* Map */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="aspect-video bg-slate-100 rounded-xl overflow-hidden">
              {loading ? (
                <div className="h-full w-full flex items-center justify-center">
                  <div className="text-sm text-slate-500">Loading map…</div>
                </div>
              ) : locations.length ? (
                <PublicLocationsMap locations={locations} className="h-full w-full" />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-center p-6">
                  <div>
                    <MapPin size={48} className="text-slate-400 mx-auto mb-3" />
                    <p className="text-slate-600 text-sm font-medium">No locations configured yet</p>
                    <p className="text-xs text-slate-400 mt-2">Log in as admin to add locations.</p>
                  </div>
                </div>
              )}
            </div>
            {error && <div className="sf-alert sf-alert-error mt-4">{error}</div>}
          </div>
        </div>
      </section>

      {/* Warehouse Grid */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">All Locations</h2>
            <p className="text-lg text-slate-600">Modern facilities equipped with the latest technology</p>
          </div>
          {loading ? (
            <div className="text-sm text-slate-600 text-center">Loading locations…</div>
          ) : locations.length === 0 ? (
            <div className="text-sm text-slate-600 text-center">No locations yet.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {locations.map((l) => (
                <Link
                  key={l.id}
                  to={`/warehouses/${l.id}`}
                  className="bg-white border border-slate-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition"
                >
                  <div className="text-lg font-semibold text-slate-900">{l.name}</div>
                  <p className="text-sm text-slate-600 mt-2 flex items-start gap-2">
                    <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                    {l.city}
                    {l.region ? `, ${l.region}` : ''} • {l.country}
                  </p>
                  <div className="mt-4 text-sm font-semibold text-blue-600">View details →</div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">World-Class Facilities</h2>
            <p className="text-lg text-slate-600">Every warehouse meets our high standards</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mx-auto mb-4">
                <Package size={28} />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Climate Control</h3>
              <p className="text-slate-600 text-sm">Temperature & humidity regulated zones</p>
            </div>
            <div className="text-center p-6">
              <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mx-auto mb-4">
                <Users size={28} />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">24/7 Operations</h3>
              <p className="text-slate-600 text-sm">Round-the-clock staff and security</p>
            </div>
            <div className="text-center p-6">
              <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mx-auto mb-4">
                <TrendingUp size={28} />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">WMS Technology</h3>
              <p className="text-slate-600 text-sm">Real-time inventory tracking</p>
            </div>
            <div className="text-center p-6">
              <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mx-auto mb-4">
                <MapPin size={28} />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Strategic Locations</h3>
              <p className="text-slate-600 text-sm">Optimized for 1-2 day ground shipping</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need a Warehouse Partner?</h2>
          <p className="text-lg text-blue-100 mb-6">Let's discuss which location works best for your business</p>
          <a href="/contact" className="inline-block px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 shadow-lg">
            Contact Us
          </a>
        </div>
      </section>
    </div>
  )
}
