import { EventPopup } from "../components/events/EventPopup";
import { PagePlaceholder } from "../components/Placeholder";

// Home screen: map of nearby events with filters and an event popup (register, save, report).
// TODO: build this page.
export function MapPage() {
  return (
    <div>
      <PagePlaceholder
        name="Map"
        description="Home screen: map of nearby events with filters and an event popup (register, save, report)."
      />
      <EventPopup
        isOpen={true}
        onClose={() => {}}
        categories={["casual"]}
        name="Corgi Meetup"
        date="Saturday October 14th"
        time="11:00 AM"
        location="Central Park"
        description="Join us for a fun day of corgi activities!"
      />
    </div>
  );
}
