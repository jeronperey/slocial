import type { ReactNode } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

// Illustrated map art (roads, parks, water) — not a real map.
// TODO: build this component.

export const SLO_CENTER: [number, number] = [35.2828, -120.6596]

export function MapBackground({children, className}: {children?: ReactNode; className?: string;}) {
  return (
    <MapContainer
      center={SLO_CENTER}
      zoom={15}
      zoomControl={false}
      attributionControl={false}
      style={{ height: '100%', width: '100%' }}
      className={className}

      >
        <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {children}  
      </MapContainer>
  )
}
