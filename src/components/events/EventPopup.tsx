import { EventCard } from "./EventCard";
import { EventSummary } from "./EventSummary";
import { EventInfo } from "./EventInfo";
import type { Category } from "../../data/types";
import { Button } from "../ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { useAppStore } from "../../store/AppStore";
import { faFlag } from "@fortawesome/free-solid-svg-icons/faFlag";
import { faBookmark } from "@fortawesome/free-solid-svg-icons/faBookmark";
import { googleMapsLink } from "../map/mapLinks";
import { useLocation, useNavigate } from "react-router";
import type { SlocialEvent } from "../../data/types";

interface EventPopupProps {
  event: SlocialEvent;
  isOpen: boolean;
 
  onClose: () => void;
}

export function EventPopup({
  isOpen,
  onClose,
  event
}: EventPopupProps) {
  const navigate = useNavigate();
  const currentLocation = useLocation();
  const {
    registeredEvents,
    savedEvents,
    reportedEvents,
    registerForEvent,
    unregisterFromEvent,
    saveEvent,
    unsaveEvent,
  } = useAppStore();

  const going = registeredEvents.some((events) => events.id === event.id);
  const saved = savedEvents.some((events) => events.id === event.id);
  const reported = reportedEvents.some((events) => events.id === event.id);

  function handleRegister() {
    if (!going) {
      registerForEvent(event);
    } else {
      unregisterFromEvent(event.id);
    }
  }

  function handleSave() {
    if (!saved) {
      saveEvent(event);
    } else {
      unsaveEvent(event.id);
    }
  }

  function handleReport() {
    // open the report form over this popup and pass the event plus return location.
    navigate(`/events/${encodeURIComponent(event.id)}/report`, {
      state: {
        backgroundLocation: currentLocation,
        event: {
          event
        },
      },
    });
  }
  if (!isOpen) return null;

  function handleDirections() {
    const lat = event.lat;
    const lng = event.lng;
    window.open(googleMapsLink({ lat, lng }), "_blank");
  }

  return (
    <div className=" slocial-fade-up fixed z-50 inset-0 backdrop-blur-sm flex items-center flex-col p-4 justify-center">
      <div className="flex flex-col gap-4 rounded-xl bg-line p-8 relative w-[25rem] max-w-full">
        <div>
          <EventSummary
            name={event.id}
            date={event.date}
            time={event.time}
            location={event.address}
            categories={event.category}
            onDirections={handleDirections}
          />
          <FontAwesomeIcon
            icon={faXmark}
            className="absolute top-4 right-4 w-6 h-6 cursor-pointer"
            onClick={onClose}
          />
        </div>

        <EventCard description={event.description} />
        <EventInfo
          price={event.price}
          restrictions={event.restrictions}
          attendance={event.attendance}
        />

        <div className="flex flex-row gap-2 w-full justify-center">
          <Button
            className="w-28 justify-center"
            onClick={() => handleRegister()}
            variant={going ? "successBorder" : "clear"}
          >
            {going ? "Registered" : "Register"}
          </Button>
          <Button
            className="w-28 justify-center"
            onClick={() => handleSave()}
            variant={saved ? "successBorder" : "clear"}
          >
            {saved ? "Saved" : "Save"}
            <FontAwesomeIcon icon={faBookmark} />
          </Button>
          <Button
            className={`w-28 justify-center ${reported ? "bg-danger/15 border-danger" : ""}`}
            onClick={() => handleReport()}
            variant="danger"
            aria-pressed={reported}
          >
            {reported ? "See Report" : "Report"}
            <FontAwesomeIcon icon={faFlag} />
          </Button>
        </div>
      </div>
    </div>
  );
}
