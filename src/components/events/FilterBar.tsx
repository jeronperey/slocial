import { SlidersHorizontalIcon } from 'lucide-react'
import { Chip } from '../ui/Chip'
import { CATEGORIES, countActiveFilters, toggleCategory, type Filters } from './filterLogic'

// 'Filters' button + quick category chips under the header.

interface FilterBarProps {
  filters: Filters
  onChange: (filters: Filters) => void
  onOpenPanel: () => void
  panelOpen?: boolean
}

export function FilterBar({ filters, onChange, onOpenPanel, panelOpen = false }: FilterBarProps) {
  const active = countActiveFilters(filters)

  return (
    <div className="flex shrink-0 items-center gap-2 bg-surface px-4 pb-3">
      <button
        type="button"
        aria-expanded={panelOpen}
        onClick={onOpenPanel}
        className="flex h-7 shrink-0 cursor-pointer items-center gap-1.5 rounded-full bg-raised px-3 text-xs font-bold text-ink transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <SlidersHorizontalIcon size={13} />
        Filters
        {active > 0 && (
          <span className="flex size-4 items-center justify-center rounded-full bg-primary text-[10px] text-on-primary">
            {active}
          </span>
        )}
      </button>

      <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto [scrollbar-width:none]">
        {CATEGORIES.map(({ value, label }) => (
          <Chip
            key={value}
            label={label}
            active={filters.categories.includes(value)}
            onClick={() => onChange(toggleCategory(filters, value))}
          />
        ))}
      </div>
    </div>
  )
}
