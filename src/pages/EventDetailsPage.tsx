
import { EventPopup } from "../components/events/EventPopup";
import {useState} from "react";


// Full event info with unregister, directions and report.
// TODO: build this page.
export function EventDetailsPage() {
  const [open, setOpen] = useState(true);
  return (
    <EventPopup
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
        categories={"casual"}
        name="Corgi Meetup"
        date="Saturday October 14th"
        time="11:00 AM"
        location="Central Park"
        description="Join us for a fun day of corgi activities!"
      />
  );
}
