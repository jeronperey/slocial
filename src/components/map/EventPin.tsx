import L from 'leaflet'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { Marker } from 'react-leaflet'
import type { SlocialEvent, Category } from '../../data/types'


const COLORS: Record<Category, string> = {
  music: '#c084fc',
  sports: '#4ade80',
  party: '#f472b6',
  movie: '#fbbf24',
  casual: '#60a5fa',
}

// Font Awesome icon for each category
const ICONS: Record<Category, string> = {
  casual: 'fa-user-group',
  sports: 'fa-person-running',
  music: 'fa-music',
  movie: 'fa-video',
  party: 'fa-champagne-glasses',
}

// Category pin on the map; tap to open the event popup.
function pinIcon(category: Category, selected: boolean) {
  const size = selected ? 40 : 32
  return L.divIcon({
    className: '',
    // teardrop is rotated -45deg, so the icon is rotated back 45deg to stay upright
    html: `<div style="width:${size}px;height:${size}px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:${COLORS[category]};border:2px solid #fff;display:flex;align-items:center;justify-content:center;color:#fff;">
      <i class="fa-solid ${ICONS[category]}" style="transform:rotate(45deg);"></i>
    </div>`,
    iconSize: [size, size],
    // the tip of the teardrop sits below the box, so anchor it there
    iconAnchor: [size / 2, size * 1.2],
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
