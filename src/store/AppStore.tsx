"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
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
    name: string;
    categories: Category[];
    date: string;
    time?: string;
    location: string;
}
interface AppStore {
  registeredEvents: Event[];
  savedEvents: Event[];
  reportedEvents: Event[];
  registerForEvent: (event: Event) => void;
  saveEvent: (event: Event) => void;
  reportEvent: (event: Event) => void;
  unregisterFromEvent: (eventName: string) => void;
  unsaveEvent: (eventName: string) => void;
  unreportEvent: (eventName: string) => void;
}


const AppStoreContext = createContext<AppStore | undefined>(undefined);

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [registeredEvents, setRegisteredEvents] = useState<Event[]>([]);
  const [savedEvents, setSavedEvents] = useState<Event[]>([]);
  const [reportedEvents, setReportedEvents] = useState<Event[]>([]);

  function registerForEvent(event: Event) {
    setRegisteredEvents((currentEvents) => {
      const alreadyRegistered = currentEvents.some(
        (currentEvent) => currentEvent.name === event.name
      );

      return alreadyRegistered ? currentEvents : [...currentEvents, event];
    });
  }

  function saveEvent(event: Event) {
    setSavedEvents((currentEvents) => {
      const alreadySaved = currentEvents.some(
        (currentEvent) => currentEvent.name === event.name
      );

      return alreadySaved ? currentEvents : [...currentEvents, event];
    });
  }

  function reportEvent(event: Event) {
    setReportedEvents((currentEvents) => {
      const alreadyReported = currentEvents.some(
        (currentEvent) => currentEvent.name === event.name
      );
      
      return alreadyReported ? currentEvents : [...currentEvents, event];
    });
  }

  function unregisterFromEvent(eventName: string) {
    setRegisteredEvents((currentEvents) =>
      currentEvents.filter((event) => event.name !== eventName)
    );
  }
  function unsaveEvent(eventName: string) {
    setSavedEvents((currentEvents) =>
      currentEvents.filter((event) => event.name !== eventName)
    );
  }
  function unreportEvent(eventName: string) {
    setReportedEvents((currentEvents) =>
      currentEvents.filter((event) => event.name !== eventName)
    );
  }


  return (
    <AppStoreContext.Provider
      value={{
        registeredEvents,
        savedEvents,
        reportedEvents,
        registerForEvent,
        unregisterFromEvent,
        saveEvent,
        unsaveEvent,
        reportEvent,
        unreportEvent,
        
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


