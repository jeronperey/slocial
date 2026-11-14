import L from 'leaflet'
import { renderToStaticMarkup } from 'react-dom/server'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup } from '@fortawesome/free-solid-svg-icons/faUserGroup'
import { faPersonRunning } from '@fortawesome/free-solid-svg-icons/faPersonRunning'
import { faMusic } from '@fortawesome/free-solid-svg-icons/faMusic'
import { faVideo } from '@fortawesome/free-solid-svg-icons/faVideo'
import { faChampagneGlasses } from '@fortawesome/free-solid-svg-icons/faChampagneGlasses'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
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
const ICONS: Record<Category, IconDefinition> = {
  casual: faUserGroup,
  sports: faPersonRunning,
  music: faMusic,
  movie: faVideo,
  party: faChampagneGlasses,
}

// Category pin on the map; tap to open the event popup.
function pinIcon(category: Category, selected: boolean) {
  const size = selected ? 40 : 32
  // explicit width/height so the svg is sized without Font Awesome's CSS
  const icon = renderToStaticMarkup(
    <FontAwesomeIcon icon={ICONS[category]} style={{ width: 14, height: 14, transform: 'rotate(45deg)' }} />,
  )
  return L.divIcon({
    className: '',
    // teardrop is rotated -45deg, so the icon is rotated back 45deg to stay upright
    html: `<div style="width:${size}px;height:${size}px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:${COLORS[category]};border:2px solid #fff;display:flex;align-items:center;justify-content:center;color:#fff;">
      ${icon}
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
