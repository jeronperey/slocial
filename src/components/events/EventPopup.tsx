import { EventCard } from "./EventCard";
import { EventSummary } from "./EventSummary";
import { EventInfo } from "./EventInfo";
import type { Category } from "../../data/types";
import { useState } from "react";
import { Button } from "../ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { useAppStore } from "../../store/AppStore";
import { faFlag } from "@fortawesome/free-solid-svg-icons/faFlag";
import { faBookmark } from "@fortawesome/free-solid-svg-icons/faBookmark";

// Modal over the map: summary, description, info, Register / Save / Report.
// TODO: build this component.
interface EventPopupProps {
  categories: Category[];
  name: string;
  date: string;
  time?: string;
  location: string;
  description?: string;
  price?: string;
  restrictions?: string;
  isOpen: boolean;
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
}: EventPopupProps) {
  const [going, setGoing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [reported, setReported] = useState(false);
  const {
    registerForEvent,
    unregisterFromEvent,
    saveEvent,
    unsaveEvent,
    reportEvent,
    unreportEvent,
  } = useAppStore();
  function handleRegister() {
    if (!going) {
      registerForEvent({
        name,
        categories,
        date,
        time,
        location,
      });
    } else {
      unregisterFromEvent(name);
    }
    setGoing(!going);
  }

  function handleSave() {
    if (!saved) {
      saveEvent({
        name,
        categories,
        date,
        time,
        location,
      });
    } else {
      unsaveEvent(name);
    }
    setSaved(!saved);
  }

  function handleReport() {
    if (!reported) {
      reportEvent({
        name,
        categories,
        date,
        time,
        location,
      });
    } else {
      unreportEvent(name);
    }
    setReported(!reported);
  }
  if (!isOpen) return null;

  return (
    <div className=" slocial-fade-up  fixed z-50 inset-0 backdrop-blur-sm flex items-center flex-col p-4 justify-center">
      <div className="flex flex-col gap-4 rounded-xl bg-line p-8 relative">
        <div>
          <EventSummary
            name={name}
            date={date}
            time={time}
            location={location}
            categories={categories}
            going={going}
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
            className="w-28 justify-center"
            onClick={() => handleReport()}
            variant="danger"
          >
            {reported ? "Reported" : "Report"}
            <FontAwesomeIcon icon={faFlag} />
          </Button>
        </div>
      </div>
    </div>
  );
}
