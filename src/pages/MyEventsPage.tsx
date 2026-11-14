import { useState } from "react";
import { EventPopup } from "../components/events/EventPopup";
import { AppHeader } from "../components/layout/AppHeader";
import { EVENTS } from "../data/events";
import { useAppStore } from "../store/AppStore";

export function MyEventsPage() {
  const [section, setSection] = useState<"going" | "saved">("going");
  const { registeredEvents, savedEvents } = useAppStore();
  const [selectedEvent, setSelectedEvent] = useState<(typeof registeredEvents)[number] | null>(null);
  const events = section === "going" ? registeredEvents : savedEvents;
  const mapEvent = selectedEvent
    ? EVENTS.find((event) => event.title === selectedEvent.name)
    : undefined;

  return (
    <div className="flex h-full min-h-0 flex-col">
      {selectedEvent && (
        <EventPopup
          isOpen={true}
          onClose={() => setSelectedEvent(null)}
          categories={selectedEvent.categories}
          name={selectedEvent.name}
          date={selectedEvent.date}
          time={selectedEvent.time}
          location={selectedEvent.location}
          description={selectedEvent.description}
          price={selectedEvent.price}
          restrictions={selectedEvent.restrictions}
          lat={mapEvent ? mapEvent.lat : 0}
          lng={mapEvent ? mapEvent.lng : 0}
        />
      )}
      <AppHeader title="My Events" />
      <div className="flex gap-2 bg-surface px-4 pb-3">
        <button
          type="button"
          aria-pressed={section === "going"}
          onClick={() => setSection("going")}
          className={`flex-1 rounded-lg py-2 text-sm font-bold ${section === "going" ? "bg-primary text-on-primary" : "bg-raised text-muted"}`}
        >
          Going ({registeredEvents.length})
        </button>
        <button
          type="button"
          aria-pressed={section === "saved"}
          onClick={() => setSection("saved")}
          className={`flex-1 rounded-lg py-2 text-sm font-bold ${section === "saved" ? "bg-primary text-on-primary" : "bg-raised text-muted"}`}
        >
          Saved ({savedEvents.length})
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        {events.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted">
            {section === "going" ? "You are not going to any events yet." : "You have not saved any events yet."}
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {events.map((event) => (
              <button
                key={event.name}
                type="button"
                onClick={() => setSelectedEvent(event)}
                className="rounded-xl bg-surface p-4 text-left hover:bg-raised focus-visible:outline-2 focus-visible:outline-primary"
              >
                <h2 className="font-bold">{event.name}</h2>
                <p className="mt-1 text-sm text-muted">{event.date}</p>
                <p className="text-sm text-muted">{event.location}</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
