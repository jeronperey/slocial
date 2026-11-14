// Pill toggle used for quick category filters.

interface ChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export function Chip({ label, active, onClick }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`h-7 shrink-0 cursor-pointer rounded-full px-3 text-xs whitespace-nowrap transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
        active
          ? "bg-primary font-bold text-on-primary"
          : "bg-raised text-muted hover:text-ink"
      }`}
    >
      {label}
    </button>
  );
}
