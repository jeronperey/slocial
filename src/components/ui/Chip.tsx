// Pill toggle used for quick category filters.

interface ChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
  size?: "md" | "lg";
}

const SIZES = {
  md: "h-7 px-3 text-xs",
  lg: "h-9 px-4 text-[13px]",
};

export function Chip({ label, active, onClick, size = "md" }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`${SIZES[size]} shrink-0 cursor-pointer rounded-full whitespace-nowrap transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
        active
          ? "bg-primary font-bold text-on-primary"
          : "bg-raised text-muted hover:text-ink"
      }`}
    >
      {label}
    </button>
  );
}
