import { NavLink } from 'react-router'

// Map / Profile / My Events tabs.
// TODO: style it and add icons.
export function BottomNav() {
  const tabs = [
    { to: '/', label: 'Map' },
    { to: '/profile', label: 'Profile' },
    { to: '/events', label: 'My Events' },
  ]
  return (
    <nav className="flex h-14 shrink-0 items-center justify-around border-t border-line bg-surface text-xs">
      {tabs.map((t) => (
        <NavLink key={t.to} to={t.to} end className={({ isActive }) => (isActive ? 'font-bold text-ink' : 'text-muted')}>
          {t.label}
        </NavLink>
      ))}
    </nav>
  )
}
