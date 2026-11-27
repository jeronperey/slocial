"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { SlocialEvent, User } from "../data/types";
import { DEFAULT_USER } from "../data/user";
import { EVENTS } from "../data/events";

/**
 * AppStore — in-memory app state (the prototype's "backend").
 *
 * TODO: hold registered events, saved events, active filters, reports, and the user,
 * so actions on one page show up on others (e.g. Register → appears under "Going").
 *
 * We will not use this now but we might ant this for later
 */



export type ReportReason =
  "Illegal Substances" | "Fraud" | "Bullying/Harrassment";

export interface EventReport {
  event: SlocialEvent;
  reasons: ReportReason[];
  additionalInfo: string;
}

interface AppStore {
  user: User;
  updateUser: (user: User) => void;
  events: SlocialEvent[];
  registeredEvents: SlocialEvent[];
  savedEvents: SlocialEvent[];
  reportedEvents: SlocialEvent[];
  reports: EventReport[];
  registerForEvent: (event: SlocialEvent) => void;
  saveEvent: (event: SlocialEvent) => void;
  submitReport: (
    event: SlocialEvent,
    reasons: ReportReason[],
    additionalInfo: string,
  ) => void;
  unregisterFromEvent: (eventName: string) => void;
  unsaveEvent: (eventName: string) => void;
}

const AppStoreContext = createContext<AppStore | undefined>(undefined);

export function AppStoreProvider({ children }: { children: ReactNode }) {
  //allows events status' to be changed, i.e attendance
  const [events, setEvents] = useState<SlocialEvent[]>(EVENTS);
  const [registeredEvents, setRegisteredEvents] = useState<SlocialEvent[]>([]);
  const [savedEvents, setSavedEvents] = useState<SlocialEvent[]>([]);
  const [reportedEvents, setReportedEvents] = useState<SlocialEvent[]>([]);
  const [reports, setReports] = useState<EventReport[]>([]);
  const [user, setUser] = useState<User>(DEFAULT_USER);

  function registerForEvent(event: SlocialEvent) {
    setRegisteredEvents((currentEvents) => {
      //returns the registered event to client
      const alreadyRegistered = currentEvents.some(
        (currentEvent) => currentEvent.id === event.id,
      );

      if (alreadyRegistered) return currentEvents;

      return [...currentEvents, { ...event, attendance: event.attendance + 1 }];
    });
    //increments events attendance within the AppStore
    setEvents((currentEvents) =>
      currentEvents.map((currentEvent) =>
        currentEvent.id === event.id
          ? {
              ...currentEvent,
              attendance: currentEvent.attendance + 1,
            }
          : currentEvent,
      ),
    );
  }

  function saveEvent(event: SlocialEvent) {
    setSavedEvents((currentEvents) => {
      const alreadySaved = currentEvents.some(
        (currentEvent) => currentEvent.id === event.id,
      );

      return alreadySaved ? currentEvents : [...currentEvents, event];
    });
  }

  function submitReport(
    event: SlocialEvent,
    reasons: ReportReason[],
    additionalInfo: string,
  ) {
    // store one report per event .. tho in reality multiple users should be able to report, this is easier for now since we aren't dealing with multiple concurrent users
    setReportedEvents((currentEvents) => {
      const alreadyReported = currentEvents.some(
        (currentEvent) => currentEvent.id === event.id,
      );
      return alreadyReported ? currentEvents : [...currentEvents, event];
    });
    setReports((currentReports) => [
      { event, reasons, additionalInfo },
      ...currentReports.filter((report) => report.event.id !== event.id),
    ]);
  }

  function unregisterFromEvent(eventName: string) {
    setRegisteredEvents((currentEvents) =>
      currentEvents.filter((event) => event.id !== eventName),
    );

    setEvents((currentEvents) =>
      currentEvents.map((event) =>
        event.id === eventName
          ? {
              ...event,
              attendance: Math.max(0, event.attendance - 1),
            }
          : event,
      ),
    );
  }
  function unsaveEvent(eventName: string) {
    setSavedEvents((currentEvents) =>
      currentEvents.filter((event) => event.id !== eventName),
    );
  }
  return (
    <AppStoreContext.Provider
      value={{
        user,
        updateUser: setUser,
        events,
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
