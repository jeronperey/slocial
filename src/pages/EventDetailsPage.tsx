import { useNavigate, useParams } from "react-router";
import { EventPopup } from "../components/events/EventPopup";
import { useAppStore } from "../store/AppStore";
import { NotFoundPage } from "./NotFoundPage";

// Full event info for the event in the URL.
export function EventDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events } = useAppStore();
  const event = events.find((e) => e.id === id);

  if (!event) return <NotFoundPage />;

  return (
    <EventPopup
      isOpen={true}
      onClose={() => {
        if ((window.history.state?.idx ?? 0) > 0) navigate(-1);
        else navigate("/events");
      }}
      event={event}
    />
  );
}
