import { useId, type InputHTMLAttributes } from 'react'

// Labeled text input.

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export function TextInput({ label, id, className = '', ...props }: TextInputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <div className={className}>
      <label htmlFor={inputId} className="mb-1.5 block text-xs font-semibold text-muted">
        {label}
      </label>
      <input
        id={inputId}
        className="h-11 w-full rounded-xl border border-line bg-surface px-3 text-[13.5px] text-ink outline-none transition placeholder:text-muted focus:border-primary disabled:opacity-50"
        {...props}
      />
    </div>
  )
}
