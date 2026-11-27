import { useState, type FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons/faPeopleGroup";
import { ChevronLeftIcon } from "lucide-react";
import { useLocation, useNavigate, type Location } from "react-router";
import { EventPopup } from "../components/events/EventPopup";
import { Checkbox } from "../components/ui/Checkbox";
import { Tag } from "../components/ui/Tag";
import type { SlocialEvent } from "../data/types";
import { useAppStore, type ReportReason } from "../store/AppStore";
/*
interface ReportEventDetails {
  name: string;
  categories: Category;
  date: string;
  time?: string;
  location: string;
  description?: string;
  price?: number;
  restrictions?: string;
  lat: number;
  lng: number;
}*/

interface ReportRouteState {
  backgroundLocation?: Location;
  event?: SlocialEvent;
}

const REPORT_REASONS: ReportReason[] = [
  "Illegal Substances",
  "Fraud",
  "Bullying/Harrassment",
];

export function ReportEventPage() {
  const location = useLocation();
  const navigate = useNavigate();
  // get event details from event that was reported (which is in routeState.event)
  const routeState = location.state as ReportRouteState | null;
  const event = routeState?.event;
  const { submitReport, deleteReport, reports } = useAppStore();
  const existingReport = event
    ? reports.find((report) => report.event.id === event.id)
    : undefined;
  const [selectedReasons, setSelectedReasons] = useState<ReportReason[]>(
    existingReport?.reasons ?? [],
  );
  const [additionalInfo, setAdditionalInfo] = useState(
    existingReport?.additionalInfo ?? "",
  );
  const [showEmptyReportError, setShowEmptyReportError] = useState(false);

  function handleBack() {
    if ((window.history.state?.idx ?? 0) > 0) {
      navigate(-1);
    } else {
      navigate("/");
    }
  }

  function handleReasonChange(reason: ReportReason, checked: boolean) {
    if (checked) {
      setSelectedReasons((currentReasons) => [...currentReasons, reason]);
    } else {
      setSelectedReasons((currentReasons) =>
        currentReasons.filter((currentReason) => currentReason !== reason),
      );
    }
  }

  const hasReportContent =
    selectedReasons.length > 0 || additionalInfo.trim().length > 0;

  function handleSubmit(formEvent: FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    if (!event || !hasReportContent) {
      setShowEmptyReportError(true);
      return;
    }

    // submit report then return back to popup u started at
    submitReport(event, selectedReasons, additionalInfo.trim());
    handleBack();
  }

  if (!event) {
    return (
      <div className="flex h-full flex-col">
        <header className="flex h-[52px] items-center gap-2 bg-surface px-4">
          <button
            type="button"
            aria-label="Back"
            onClick={handleBack}
            className="flex size-8 items-center justify-center rounded-lg text-ink focus-visible:outline-2 focus-visible:outline-primary"
          >
            <ChevronLeftIcon size={22} />
          </button>
          <h1 className="text-[17px] font-bold">Report event</h1>
        </header>
        <p className="p-4 text-sm text-muted">
          Event details are not available.
        </p>
      </div>
    );
  }

  return (
    <>
      {!routeState?.backgroundLocation && (
        <EventPopup
          isOpen={true}
          onClose={handleBack}
          event = {event}
        />
      )}
      {/* event popup is still there behind the report form so they can click back/out of it */}
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm">
        <section className="flex max-h-[90%] w-[25rem] max-w-full flex-col overflow-y-auto rounded-xl bg-line p-6 shadow-xl">
          <header className="mb-4 flex items-center gap-2">
            <button
              type="button"
              aria-label="Back to event"
              onClick={handleBack}
              className="-ml-2 flex size-9 shrink-0 items-center justify-center rounded-lg text-ink focus-visible:outline-2 focus-visible:outline-primary"
            >
              <ChevronLeftIcon size={22} />
            </button>
            <h1 className="text-lg font-bold">Report this event</h1>
          </header>

          <div className="mb-5 border-b border-gray-300 pb-4">
            <h2 className="flex items-center gap-2 text-base font-bold">
              <FontAwesomeIcon icon={faPeopleGroup} />
              {event.title}
            </h2>
            {event.description && (
              <p className="mt-2 text-sm">{event.description}</p>
            )}
            <p className="mt-2 text-sm text-muted">
              {event.date}
              {event.time ? ` · ${event.time}` : ""}
            </p>
            <div className="mt-2">
              <Tag category={event.category} />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="m-0 min-w-0 p-0">
              <p className="mb-1 text-sm font-bold">Report event for:</p>
              {REPORT_REASONS.map((reason) => (
                <Checkbox
                  key={reason}
                  label={reason}
                  checked={selectedReasons.includes(reason)}
                  onChange={(checked) => handleReasonChange(reason, checked)}
                />
              ))}
            </div>

            <label className="flex flex-col gap-2 text-sm font-bold">
              Anything else to add?
              <textarea
                value={additionalInfo}
                onChange={(changeEvent) =>
                  setAdditionalInfo(changeEvent.target.value)
                }
                rows={3}
                className="w-full resize-none rounded-lg border border-muted/40 bg-surface p-3 text-sm font-normal text-ink outline-none focus:border-primary"
              />
            </label>

            {showEmptyReportError && !hasReportContent && (
              <p className="text-center text-xs text-danger">
                You cannot submit an empty report.
              </p>
            )}

            <button
              type="submit"
              className="mt-1 h-11 rounded-[14px] bg-primary px-4 text-sm font-bold text-on-primary hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {existingReport ? "Update Report" : "Submit Report"}
            </button>
            {existingReport && (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm("Delete this report?")) {
                    deleteReport(event.id);
                    handleBack();
                  }
                }}
                className="h-11 rounded-[14px] border-[1.5px] border-danger/55 px-4 text-sm font-bold text-danger hover:bg-danger/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Delete Report
              </button>
            )}
          </form>
        </section>
      </div>
    </>
  );
}
