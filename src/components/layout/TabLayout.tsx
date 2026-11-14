import { Outlet } from "react-router";
import { BottomNav } from "./BottomNav";

export function TabLayout() {
  return (
    <>
      <div className="relative flex min-h-0 flex-1 flex-col">
        <Outlet />
      </div>
      <BottomNav />
    </>
  );
}
