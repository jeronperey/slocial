import { useState } from 'react'
import { Button } from '../ui/Button'
import { Checkbox } from '../ui/Checkbox'
import { Radio } from '../ui/Radio'
import { SectionLabel } from '../ui/SectionLabel'
import { CATEGORIES, DEFAULT_FILTERS, RADIUS_OPTIONS, toggleCategory, type Filters } from './filterLogic'

// Drop-down sheet: Category / Location radius, with Apply.
// Render it inside the (relative) map container so it drops down from just under the FilterBar.
// Edits a draft copy; nothing changes on the map until Apply is pressed.

interface FilterPanelProps {
  filters: Filters
  onApply: (filters: Filters) => void
}

export function FilterPanel({ filters, onApply }: FilterPanelProps) {
  const [draft, setDraft] = useState<Filters>(filters)

  return (
    <div
      role="dialog"
      aria-label="Filters"
      className="absolute inset-x-0 top-0 z-[1000] max-h-full overflow-y-auto rounded-b-[20px] border-b border-line bg-surface px-4 pb-3 shadow-[0_12px_30px_rgba(0,0,0,0.45)]"
    >
      <SectionLabel>Category</SectionLabel>
      <div className="grid grid-cols-2 gap-x-4">
        {CATEGORIES.map(({ value, label }) => (
          <Checkbox
            key={value}
            label={label}
            checked={draft.categories.includes(value)}
            onChange={() => setDraft(toggleCategory(draft, value))}
          />
        ))}
      </div>

      <SectionLabel>Location radius</SectionLabel>
      <div className="grid grid-cols-2 gap-x-4">
        {RADIUS_OPTIONS.map(({ value, label }) => (
          <Radio
            key={label}
            name="radius"
            label={label}
            checked={draft.radiusMiles === value}
            onChange={() => setDraft({ ...draft, radiusMiles: value })}
          />
        ))}
      </div>

      {/* "Other" (free only, happening today) returns once events have a price and a date. */}

      <div className="mt-3 flex gap-2">
        <Button variant="secondary" onClick={() => setDraft(DEFAULT_FILTERS)}>
          Clear
        </Button>
        <Button fullWidth onClick={() => onApply(draft)}>
          Apply
        </Button>
      </div>
    </div>
  )
}
