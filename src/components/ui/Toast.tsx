import { useEffect } from "react";

// Short confirmation message that hides itself ('Registered for Corgi Meetup').
// Place it inside a `relative` container; it sits at the bottom of that container.

interface ToastProps {
  message: string | null;
  onDone: () => void;
  duration?: number;
}

export function Toast({ message, onDone, duration = 2500 }: ToastProps) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onDone, duration);
    return () => clearTimeout(timer);
  }, [message, onDone, duration]);

  if (!message) return null;

  return (
    <div
      role="status"
      className="absolute inset-x-4 bottom-4 z-30 rounded-[14px] bg-ink px-3 py-2.5 text-center text-[12.5px] font-bold text-bg shadow-lg"
    >
      {message}
    </div>
  );
}
