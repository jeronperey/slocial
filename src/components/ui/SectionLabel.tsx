import type { ReactNode } from 'react'

// Small section heading ('About', "What's wrong?").

export function SectionLabel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <h3 className={`mt-4 mb-1.5 text-xs font-semibold text-muted ${className}`}>{children}</h3>
}
