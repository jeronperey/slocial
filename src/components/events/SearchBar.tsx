import { SearchIcon, XIcon } from "lucide-react";

// Search field under the header: filters events by title, address, description or category.

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

export function SearchBar({ value, onChange, onClose }: SearchBarProps) {
  return (
    <div className="flex shrink-0 items-center gap-2 bg-surface px-4 pb-3">
      <label className="flex h-10 flex-1 items-center gap-2 rounded-full bg-raised px-4 text-muted focus-within:outline-2 focus-within:outline-primary">
        <SearchIcon size={16} />
        <input
          autoFocus
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search events"
          aria-label="Search events"
          className="min-w-0 flex-1 bg-transparent text-[13.5px] text-ink outline-none placeholder:text-muted [&::-webkit-search-cancel-button]:hidden"
        />
      </label>
      <button
        type="button"
        aria-label="Close search"
        onClick={onClose}
        className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-primary"
      >
        <XIcon size={18} />
      </button>
    </div>
  );
}
