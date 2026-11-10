import { createContext, useContext, type ReactNode } from "react";

/**
 * AppStore — in-memory app state (the prototype's "backend").
 *
 * TODO: hold registered events, saved events, active filters, reports, and the user,
 * so actions on one page show up on others (e.g. Register → appears under "Going").
 *
 * We will not use this now but we might ant this for later
 */
interface AppStore {}

const AppStoreContext = createContext<AppStore>({});

export function AppStoreProvider({ children }: { children: ReactNode }) {
  return (
    <AppStoreContext.Provider value={{}}>{children}</AppStoreContext.Provider>
  );
}

export function useAppStore() {
  return useContext(AppStoreContext);
}
