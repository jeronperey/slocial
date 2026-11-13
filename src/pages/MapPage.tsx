import {useState} from 'react'
import {EVENTS} from '../data/events'
import { MapView, YOU_POSITION } from '../components/map/MapView'
import {DEFAULT_FILTERS, filterEvents, type Filters } from '../components/events/filterLogic'
import { FilterBar } from '../components/events/FilterBar'
import { AppHeader } from '../components/layout/AppHeader'
import { FilterPanel } from '../components/events/FilterPanel'


// Home screen: map of nearby events with filters and an event popup (register, save, report).
// TODO: build this page.
export function MapPage() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)
  const [panelOpen, setPanelOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | undefined>()
  const visibleEvents = filterEvents(EVENTS, filters, YOU_POSITION)

  return (
    <div className="relative flex h-full w-full flex-col">
      <AppHeader title="Events Around You"/>
      <FilterBar
        filters={filters}
        onChange={setFilters}
        onOpenPanel={() => setPanelOpen((open) => !open)}
        panelOpen={panelOpen}
      />

      <div className="relative isolate min-h-0 flex-1">
        <MapView
          events={visibleEvents}
          selectedEventId={selectedId}
          onSelectEvent={setSelectedId}
        />

        {visibleEvents.length === 0 && (
          <div className="pointer-events-none absolute inset-x-4 bottom-4 z-[500] rounded-xl bg-surface px-4 py-3 text-center text-xs text-muted shadow-[0_6px_20px_rgba(0,0,0,0.4)]">
            No events match your filters.
          </div>
        )}

        {panelOpen && (
          <FilterPanel
            filters={filters}
            onApply={(next) => {
              setFilters(next)
              setPanelOpen(false)
            }}
          />
        )}
      </div>
    </div>
  )
}
