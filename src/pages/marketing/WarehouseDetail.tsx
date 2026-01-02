import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import PublicLocationsMap from '../../components/PublicLocationsMap'
import { api, type PublicLocation } from '../../services/api'

function toErrorMessage(e: unknown): string {
  if (e instanceof Error) return e.message
  if (typeof e === 'object' && e && 'message' in e) return String((e as { message: unknown }).message)
  return String(e)
}

export default function WarehouseDetailPage() {
  const { id } = useParams()
  const [location, setLocation] = useState<PublicLocation | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    const run = async () => {
      if (!id) {
        setLocation(null)
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)
      try {
        const rows = await api.publicListLocations()
        if (!mounted) return
        const found = rows.find((r) => r.id === id) || null
        setLocation(found)
      } catch (e) {
        if (!mounted) return
        setError(toErrorMessage(e))
        setLocation(null)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    void run()
    return () => {
      mounted = false
    }
  }, [id])

  const placeLabel = useMemo(() => {
    if (!location) return ''
    return `${location.city}${location.region ? `, ${location.region}` : ''} • ${location.country}`
  }, [location])

  if (!id) {
    return (
      <div className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Warehouse Not Found</h1>
          <Link to="/warehouses" className="text-blue-600 hover:text-blue-700">
            ← Back to Warehouses
          </Link>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="py-20">
        <div className="container mx-auto px-4 flex items-center justify-center">
          <div className="flex items-center gap-3 text-slate-600 text-sm">
            <div className="h-4 w-4 rounded-full border-2 border-slate-300 border-t-transparent animate-spin" />
            Loading location…
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="sf-alert sf-alert-error">{error}</div>
          <div className="mt-4">
            <Link to="/warehouses" className="text-blue-600 hover:text-blue-700 font-semibold">
              ← Back to Warehouses
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (!location) {
    return (
      <div className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Warehouse Not Found</h1>
          <Link to="/warehouses" className="text-blue-600 hover:text-blue-700">
            ← Back to Warehouses
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4">
          <Link to="/warehouses" className="text-blue-600 hover:text-blue-700 font-semibold">
            ← Back to Warehouses
          </Link>

          <div className="mt-6 grid lg:grid-cols-2 gap-8 items-start">
            <div>
              <div className="flex items-center gap-2 text-slate-600">
                <MapPin size={18} className="text-blue-600" />
                <span>{placeLabel}</span>
              </div>
              <h1 className="text-4xl font-bold text-slate-900 mt-3">{location.name}</h1>
              <p className="text-slate-600 mt-3">
                This location is part of our fulfillment network. Contact us to discuss inbound receiving, storage, and outbound shipping.
              </p>
              <div className="mt-6 flex gap-3">
                <Link
                  to="/contact"
                  className="px-5 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                >
                  Contact us
                </Link>
                <Link
                  to="/warehouses"
                  className="px-5 py-3 bg-white border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50"
                >
                  View all locations
                </Link>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden">
                <PublicLocationsMap locations={[location]} className="h-full w-full" />
              </div>
              <div className="mt-3 text-xs text-slate-500">
                Coordinates: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )

}
