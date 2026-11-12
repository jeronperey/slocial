import {useState} from 'react'
import {EVENTS} from '../data/events'
import { MapView } from '../components/map/MapView'
import {DEFAULT_FILTERS, filterEvents } from '../components/events/FilterLogic'
import type {Filters} from '../components/events/FilterLogic'
import { FilterBar } from '../components/events/FilterBar'


// Home screen: map of nearby events with filters and an event popup (register, save, report).
// TODO: build this page.
export function MapPage() {
  const [filters] = useState<Filters>(DEFAULT_FILTERS)
  const [selectedId, setSelectedId] = useState<string | undefined>()

  return (
    <div className="h-full w-full">
      <MapView
        events={filterEvents(EVENTS, filters)}
        selectedEventId={selectedId}
        onSelectEvent={() => {}}
      />
    </div>
  )
}
