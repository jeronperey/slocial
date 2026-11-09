import type { ButtonHTMLAttributes } from 'react'

// Primary / secondary / ghost / danger / success button variants.

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success'
type Size = 'md' | 'sm' | 'icon'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  fullWidth?: boolean
  glow?: boolean
}

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-primary text-on-primary hover:brightness-105',
  secondary: 'bg-raised text-ink hover:brightness-110',
  ghost: 'text-muted hover:text-ink',
  danger: 'border-[1.5px] border-danger/55 text-danger hover:bg-danger/10',
  success: 'bg-ok/15 text-ok',
}

const SIZES: Record<Size, string> = {
  md: 'h-11 px-4 text-[13.5px] rounded-[14px]',
  sm: 'h-8 px-3 text-xs rounded-[10px]',
  icon: 'size-11 shrink-0 rounded-[14px]',
}

const GLOW =
  'shadow-[0_0_0_4px_color-mix(in_srgb,var(--primary)_14%,transparent),0_6px_22px_color-mix(in_srgb,var(--primary)_30%,transparent)]'

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  glow = false,
  type = 'button',
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={[
        'inline-flex cursor-pointer items-center justify-center gap-1.5 font-bold whitespace-nowrap transition',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
        'disabled:cursor-not-allowed disabled:border-transparent disabled:bg-raised disabled:text-muted disabled:shadow-none disabled:brightness-100',
        VARIANTS[variant],
        SIZES[size],
        fullWidth ? 'w-full' : '',
        glow ? GLOW : '',
        className,
      ].join(' ')}
      {...props}
    />
  )
}
