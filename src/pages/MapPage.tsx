import {useState} from 'react'
import {EVENTS} from '../data/events'
import { MapView, YOU_POSITION } from '../components/map/MapView'
import {DEFAULT_FILTERS, filterEvents, type Filters } from '../components/events/filterLogic'
import { FilterBar } from '../components/events/FilterBar'
import { AppHeader } from '../components/layout/AppHeader'
import { FilterPanel } from '../components/events/FilterPanel'
import type { SlocialEvent } from "../data/types";
import { EventPopup } from '../components/events/EventPopup'

// Home screen: map of nearby events with filters and an event popup (register, save, report).
// TODO: build this page.
export function MapPage() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)
  const [panelOpen, setPanelOpen] = useState(false)
  const [openPopup, setOpenPopup] = useState(false)
  const [popup, setPopup] = useState<SlocialEvent | undefined>()
  const [selectedId, setSelectedId] = useState<string | undefined>()
  const visibleEvents = filterEvents(EVENTS, filters, YOU_POSITION)
  
  function handleSelectEvent(id: string) {
    const selectedEvent = EVENTS.find((event) => event.id === id)
    setOpenPopup(true)
    setPopup(selectedEvent)
    setSelectedId(id)
  }

  return (
    
    <div className="relative flex h-full w-full flex-col">
      {popup && (
        <EventPopup
        isOpen={openPopup}
        onClose={() => {
          setOpenPopup(false);
        }}
        categories={popup.category}
        name={popup.id}
        date={popup.date}
        time={popup.time}
        location={popup.address}
        lat={popup.lat}
        lng={popup.lng}
        description={popup.description}
        price = {popup.price}
        restrictions={popup.restrictions}
      />
      )}
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
          onSelectEvent={handleSelectEvent}
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
