import { useEffect, useMemo } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { useNavigate } from 'react-router-dom'
import { renderToStaticMarkup } from 'react-dom/server'
import { Warehouse } from 'lucide-react'
import L from 'leaflet'
import marker2x from 'leaflet/dist/images/marker-icon-2x.png'
import marker from 'leaflet/dist/images/marker-icon.png'
import shadow from 'leaflet/dist/images/marker-shadow.png'
import type { PublicLocation } from '../services/api'

// Fix default marker icons under Vite
L.Icon.Default.mergeOptions({
  iconRetinaUrl: marker2x,
  iconUrl: marker,
  shadowUrl: shadow,
})

function FitBounds({ locations }: { locations: PublicLocation[] }) {
  const map = useMap()

  useEffect(() => {
    if (!locations.length) return

    if (locations.length === 1) {
      const only = locations[0]
      // Prevent Leaflet from zooming way in on a single marker.
      map.setView([only.lat, only.lng], 4, { animate: false })
      return
    }

    const bounds = L.latLngBounds(locations.map((l) => [l.lat, l.lng] as [number, number]))
    map.fitBounds(bounds, { padding: [36, 36], maxZoom: 5, animate: false })
  }, [locations, map])

  return null
}

export default function PublicLocationsMap({
  locations,
  className,
}: {
  locations: PublicLocation[]
  className?: string
}) {
  const navigate = useNavigate()

  const center = useMemo<[number, number]>(() => {
    if (locations.length) return [locations[0].lat, locations[0].lng]
    return [39.8283, -98.5795] // USA center fallback
  }, [locations])

  const warehouseIcon = useMemo(() => {
    const iconSvg = renderToStaticMarkup(
      <Warehouse size={20} strokeWidth={2} aria-hidden />
    )

    return L.divIcon({
      className: 'sf-warehouse-marker-wrap',
      html: `
        <div class="h-10 w-10 rounded-full bg-white border border-slate-200 text-slate-900 flex items-center justify-center shadow-sm">
          ${iconSvg}
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
      popupAnchor: [0, -18],
    })
  }, [])

  return (
    <div className={['relative', className].filter(Boolean).join(' ')}>
      <MapContainer
        center={center}
        zoom={4}
        scrollWheelZoom={false}
        attributionControl={false}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds locations={locations} />
        {locations.map((l) => (
          <Marker
            key={l.id}
            position={[l.lat, l.lng]}
            icon={warehouseIcon}
            eventHandlers={{
              click: () => navigate('/warehouses'),
            }}
          >
            <Popup>
              <div className="text-sm">
                <div className="font-semibold text-slate-900">{l.name}</div>
                <div className="text-slate-600">
                  {l.city}
                  {l.region ? `, ${l.region}` : ''} • {l.country}
                </div>
                <button
                  type="button"
                  className="mt-2 text-blue-600 hover:text-blue-700 font-semibold"
                  onClick={() => navigate('/warehouses')}
                >
                  View all warehouses →
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Nicer attribution (required by OSM) */}
      <div className="absolute bottom-2 right-2 rounded-md bg-white/90 border border-slate-200 px-2 py-1 text-[11px] text-slate-600">
        Leaflet | ©{' '}
        <a
          className="text-blue-600 hover:text-blue-700"
          href="https://www.openstreetmap.org/copyright"
          target="_blank"
          rel="noreferrer"
        >
          OpenStreetMap
        </a>{' '}
        contributors
      </div>
    </div>
  )
}
