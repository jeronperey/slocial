import { SlidersHorizontalIcon } from "lucide-react";
import { Chip } from "../ui/Chip";
import {
  CATEGORIES,
  countActiveFilters,
  toggleCategory,
  type Filters,
} from "./filterLogic";

// 'Filters' button + quick category chips under the header.

interface FilterBarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  onOpenPanel: () => void;
  panelOpen?: boolean;
}

export function FilterBar({
  filters,
  onChange,
  onOpenPanel,
  panelOpen = false,
}: FilterBarProps) {
  const active = countActiveFilters(filters);

  return (
    <div className="flex shrink-0 items-center gap-2 bg-surface px-4 pb-3.5">
      <button
        type="button"
        aria-expanded={panelOpen}
        onClick={onOpenPanel}
        className="flex h-9 shrink-0 cursor-pointer items-center gap-2 rounded-full bg-raised px-4 text-[13px] font-bold text-ink transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <SlidersHorizontalIcon size={15} />
        Filters
        {active > 0 && (
          <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[11px] text-on-primary">
            {active}
          </span>
        )}
      </button>

      <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto [scrollbar-width:none]">
        {CATEGORIES.map(({ value, label }) => (
          <Chip
            key={value}
            label={label}
            size="lg"
            active={filters.categories.includes(value)}
            onClick={() => onChange(toggleCategory(filters, value))}
          />
        ))}
      </div>
    </div>
  );
}
