// Radio button with label.

interface RadioProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}

export function Radio({
  label,
  name,
  checked,
  onChange,
  disabled = false,
}: RadioProps) {
  return (
    <label
      className={`flex items-center gap-2 py-1.5 text-[12.5px] text-ink ${
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      }`}
    >
      <input
        type="radio"
        name={name}
        className="peer sr-only"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      <span
        className={`size-[17px] shrink-0 rounded-full transition peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary ${
          checked
            ? "border-[5px] border-primary"
            : "border-[1.5px] border-muted"
        }`}
      />
      {label}
    </label>
  );
}
