"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Category } from "../data/types";

/**
 * AppStore — in-memory app state (the prototype's "backend").
 *
 * TODO: hold registered events, saved events, active filters, reports, and the user,
 * so actions on one page show up on others (e.g. Register → appears under "Going").
 *
 * We will not use this now but we might ant this for later
 */

type Event = {
  categories: Category;
  name: string;
  date: string;
  time?: string;
  location: string;
  description?: string;
  price?: number;
  restrictions?: string;
};

export type ReportReason = "Illegal Substances" | "Fraud" | "Bullying/Harrassment";

export interface EventReport {
  event: Event;
  reasons: ReportReason[];
  additionalInfo: string;
}

interface AppStore {
  registeredEvents: Event[];
  savedEvents: Event[];
  reportedEvents: Event[];
  reports: EventReport[];
  registerForEvent: (event: Event) => void;
  saveEvent: (event: Event) => void;
  submitReport: (event: Event, reasons: ReportReason[], additionalInfo: string) => void;
  unregisterFromEvent: (eventName: string) => void;
  unsaveEvent: (eventName: string) => void;
}

const AppStoreContext = createContext<AppStore | undefined>(undefined);

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [registeredEvents, setRegisteredEvents] = useState<Event[]>([]);
  const [savedEvents, setSavedEvents] = useState<Event[]>([]);
  const [reportedEvents, setReportedEvents] = useState<Event[]>([]);
  const [reports, setReports] = useState<EventReport[]>([]);

  function registerForEvent(event: Event) {
    setRegisteredEvents((currentEvents) => {
      const alreadyRegistered = currentEvents.some(
        (currentEvent) => currentEvent.name === event.name,
      );

      return alreadyRegistered ? currentEvents : [...currentEvents, event];
    });
  }

  function saveEvent(event: Event) {
    setSavedEvents((currentEvents) => {
      const alreadySaved = currentEvents.some(
        (currentEvent) => currentEvent.name === event.name,
      );

      return alreadySaved ? currentEvents : [...currentEvents, event];
    });
  }

  function submitReport(event: Event, reasons: ReportReason[], additionalInfo: string) {
    // store one report per event .. tho in reality multiple users should be able to report, this is easier for now since we aren't dealing with multiple concurrent users
    setReportedEvents((currentEvents) => {
      const alreadyReported = currentEvents.some((currentEvent) => currentEvent.name === event.name);
      return alreadyReported ? currentEvents : [...currentEvents, event];
    });
    setReports((currentReports) => [
      ...currentReports.filter((report) => report.event.name !== event.name),
      { event, reasons, additionalInfo },
    ]);
  }

  function unregisterFromEvent(eventName: string) {
    setRegisteredEvents((currentEvents) =>
      currentEvents.filter((event) => event.name !== eventName),
    );
  }
  function unsaveEvent(eventName: string) {
    setSavedEvents((currentEvents) =>
      currentEvents.filter((event) => event.name !== eventName),
    );
  }
  return (
    <AppStoreContext.Provider
      value={{
        registeredEvents,
        savedEvents,
        reportedEvents,
        reports,
        registerForEvent,
        unregisterFromEvent,
        saveEvent,
        unsaveEvent,
        submitReport,
      }}
    >
      {children}
    </AppStoreContext.Provider>
  );
}

export function useAppStore() {
  const store = useContext(AppStoreContext);

  if (!store) {
    throw new Error("useAppStore must be used inside AppStoreProvider");
  }

  return store;
}
