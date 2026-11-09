import { CheckIcon } from 'lucide-react'

// Checkbox with label.

interface CheckboxProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  className?: string
}

export function Checkbox({ label, checked, onChange, disabled = false, className = '' }: CheckboxProps) {
  return (
    <label
      className={`flex items-center gap-2 py-1.5 text-[12.5px] text-ink ${
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
      } ${className}`}
    >
      <input
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span
        className={`flex size-[17px] shrink-0 items-center justify-center rounded-[5px] border-[1.5px] transition peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary ${
          checked ? 'border-primary bg-primary text-on-primary' : 'border-muted'
        }`}
      >
        {checked && <CheckIcon size={12} strokeWidth={3} />}
      </span>
      {label}
    </label>
  )
}
