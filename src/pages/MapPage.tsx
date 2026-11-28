import { useState } from "react";
import { useAppStore } from "../store/AppStore";
//import { EVENTS } from "../data/events";
import { MapView, YOU_POSITION } from "../components/map/MapView";
import {
  DEFAULT_FILTERS,
  filterEvents,
  type Filters,
} from "../components/events/filterLogic";
import { FilterBar } from "../components/events/FilterBar";
import { AppHeader } from "../components/layout/AppHeader";
import { FilterPanel } from "../components/events/FilterPanel";
import { SearchBar } from "../components/events/SearchBar";
import { EventPopup } from "../components/events/EventPopup";

// Home screen: map of nearby events with filters and an event popup (register, save, report).
// TODO: build this page.
export function MapPage() {
  const { events, user } = useAppStore();
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [panelOpen, setPanelOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const visibleEvents = filterEvents(events, filters, {
    origin: YOU_POSITION,
    userAge: user.age,
  });

  function handleSelectEvent(id: string) {
    setOpenPopup(true);
    setSelectedId(id);
  }
  const selectedEvent = events.find((event) => event.id === selectedId);
  return (
    <div className="relative flex h-full w-full flex-col">
      {selectedEvent && (
        <EventPopup
          isOpen={openPopup}
          onClose={() => {
            setOpenPopup(false);
          }}
          event = {selectedEvent}
        />
      )}
      <AppHeader
        title="Events Around You"
        onSearch={() => setSearchOpen((open) => !open)}
      />
      {searchOpen && (
        <SearchBar
          value={filters.query}
          onChange={(query) => setFilters({ ...filters, query })}
          onClose={() => {
            setSearchOpen(false);
            setFilters({ ...filters, query: "" });
          }}
        />
      )}
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
            No events match your search or filters.
          </div>
        )}

        {panelOpen && (
          <FilterPanel
            filters={filters}
            onClose={() => setPanelOpen(false)}
            onApply={(next) => {
              // Keep the live search text: the panel only edits category and radius.
              setFilters({ ...next, query: filters.query });
              setPanelOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
