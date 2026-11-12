import L from 'leaflet'
import { Marker, Polyline } from 'react-leaflet'
import { MapBackground } from './MapBackground'
import { EventPin } from './EventPin'
import type { SlocialEvent } from '../../data/types'

// Map area: background, event pins, 'You' marker, optional route, overlays.
// TODO: build this component.


const youIcon = L.divIcon({
  className: '',
  html: '<div style="width:16px;height:16px;border-radius:50%;background:#8fb3ff;border:3px solid #fff;box-shadow:0 0 0 6px rgba(143,179,255,0.3)"></div>',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
})

export const YOU_POSITION: [number, number] = [35.2810, -120.6600]

export function MapView({
  events, 
  selectedEventId, 
  onSelectEvent, 
  route
}: {
  events: SlocialEvent[];
  selectedEventId?: string;
  onSelectEvent: (id: string) => void;
  route?: [number, number][];
}
) {
  return (
    <MapBackground
      className="dark-tiles">
      <Marker position={YOU_POSITION} icon={youIcon} />
      {events.map((e) => (
        <EventPin
          key={e.id}
          event={e}
          selected={e.id === selectedEventId}
          onSelect={onSelectEvent} />
      ))}
      {route && <Polyline positions={route} pathOptions={{ color: '#8fb3ff', weight: 4, dashArray: '8 8' }} />}
    </MapBackground>
      )
}
