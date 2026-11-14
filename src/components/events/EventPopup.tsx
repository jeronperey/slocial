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

// TODO: build this component.
interface EventPopupProps {
  categories: Category;
  name: string;
  date: string;
  time?: string;
  location: string;
  description?: string;
  price?: number;
  restrictions?: string;
  isOpen: boolean;
  lat: number;
  lng: number;
  onClose: () => void;
}

export function EventPopup({
  isOpen,
  onClose,
  categories,
  name,
  date,
  time,
  location,
  description,
  price,
  restrictions,
  lat,
  lng,
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
  const going = registeredEvents.some((event) => event.name === name);
  const saved = savedEvents.some((event) => event.name === name);
  const reported = reportedEvents.some((event) => event.name === name);

  function handleRegister() {
    if (!going) {
      registerForEvent({
        name,
        categories,
        date,
        time,
        location,
        description,
        price,
        restrictions
      });
    } else {
      unregisterFromEvent(name);
    }
  }

  function handleSave() {
    if (!saved) {
      saveEvent({
        name,
        categories,
        date,
        time,
        location,
        description,
        price,
        restrictions
      });
    } else {
      unsaveEvent(name);
    }
  }

  function handleReport() {
    // open the report form over this popup and pass the event plus return location.
    navigate(`/events/${encodeURIComponent(name)}/report`, {
      state: {
        backgroundLocation: currentLocation,
        event: {
        name,
        categories,
        date,
        time,
        location,
        description,
        price,
        restrictions,
        lat,
        lng,
        },
      },
    });
  }
  if (!isOpen) return null;

  function handleDirections() {
    window.open(googleMapsLink({ lat, lng }), "_blank");
  }

  return (
    <div className=" slocial-fade-up fixed z-50 inset-0 backdrop-blur-sm flex items-center flex-col p-4 justify-center">
      <div className="flex flex-col gap-4 rounded-xl bg-line p-8 relative w-[25rem] max-w-full">
        <div>
          <EventSummary
            name={name}
            date={date}
            time={time}
            location={location}
            categories={categories}
            onDirections={handleDirections}
          />
          <FontAwesomeIcon
            icon={faXmark}
            className="absolute top-4 right-4 w-6 h-6 cursor-pointer"
            onClick={onClose}
          />
        </div>

        <EventCard description={description} />
        <EventInfo price={price} restrictions={restrictions} />

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
            {reported ? "Reported" : "Report"}
            <FontAwesomeIcon icon={faFlag} />
          </Button>
        </div>
      </div>
    </div>
  );
}
