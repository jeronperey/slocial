import { EventCard } from "./EventCard";
import { EventSummary } from "./EventSummary";
import { EventInfo } from "./EventInfo";
import type { Category } from "../../data/types";
import { useState } from "react";
import { Button } from "../ui/Button";

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
  const [going, setGoing] = useState(true);
  if (!isOpen) return null;

  return (
    <div
      className=" slocial-fade-up rounded-xl fixed z-50 inset-0 bg-secondary/50 backdrop-blur-sm flex items-center flex-col p-4 justify-center"
      onMouseDown={onClose}
    >
      <div className="flex flex-col gap-4">
        <EventSummary
          name={name}
          date={date}
          time={time}
          location={location}
          categories={categories}
          going={going}
        />
        <EventCard description={description} />
        <EventInfo price={price} restrictions={restrictions} />

        <div className="flex flex-row gap-2">
          <Button onClick={() => setGoing(!going)} variant={going ? "success" : "secondary"}>
            {going ? "Registered" : "Register"}
          </Button>
          <Button variant="secondary">Save</Button>
          <Button variant="danger">Report</Button>
        </div>
      </div>
    </div>
  );
}


