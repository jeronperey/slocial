import L from 'leaflet'
import { Marker } from 'react-leaflet'
import type { SlocialEvent, Category } from '../../data/types'


const COLORS: Record<Category, string> = {
  music: '#c084fc',
  sports: '#4ade80',
  party: '#f472b6',
  movie: '#fbbf24',
  casual: '#60a5fa',
}

// have colors for each cat, and icons for each

// Category pin on the map; tap to open the event popup.
// TODO: build this component.

function pinIcon(category: Category, selected: boolean) {
  const size = selected ? 34 : 26
  return L.divIcon({
    className: '',
    html: `<div style="width:${size}px;height:${size}px;border-radius:50% 50% 50% 0;
    transform:rotate(-45deg);background:${COLORS[category]};border:2px solid #fff;"></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
  })
}

export function EventPin({
    event, 
    selected = false, 
    onSelect
  }: {
    event: SlocialEvent; 
    selected?: boolean; 
    onSelect: (id: string) => void;
  }) {
  return (
    <Marker
      position={[event.lat, event.lng]}
      icon={pinIcon(event.category, selected)}
      eventHandlers={{click: () => onSelect(event.id)}}
    />
  )
}
