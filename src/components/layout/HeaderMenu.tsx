import { MenuIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

// The burger menu in the header: shortcuts to things that are otherwise a few taps away
// (your reports live under Profile) and a way to sign out from any page.

interface MenuItem {
  label: string;
  go: () => void;
}

export function HeaderMenu() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  // Close on Escape or a tap anywhere outside the menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onPointer = (e: PointerEvent) => {
      if (!container.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const items: MenuItem[] = [
    { label: "My events", go: () => navigate("/events") },
    // Profile reads this and opens the reports list.
    {
      label: "My reports",
      go: () => navigate("/profile", { state: { openReports: true } }),
    },
    { label: "Profile", go: () => navigate("/profile") },
    { label: "Sign out", go: () => navigate("/login") },
  ];

  return (
    <div ref={container} className="relative">
      <button
        type="button"
        aria-label="Menu"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="flex size-8 cursor-pointer items-center justify-center rounded-lg hover:text-ink focus-visible:outline-2 focus-visible:outline-primary"
      >
        <MenuIcon size={19} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-[1100] mt-1 w-44 overflow-hidden rounded-xl border border-line bg-surface py-1 shadow-[0_12px_30px_rgba(0,0,0,0.45)]"
        >
          {items.map(({ label, go }) => (
            <button
              key={label}
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                go();
              }}
              className="block w-full cursor-pointer px-4 py-2.5 text-left text-[13.5px] text-ink hover:bg-raised focus-visible:bg-raised focus-visible:outline-none"
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
