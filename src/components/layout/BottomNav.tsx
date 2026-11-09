import { BookmarkIcon, MapIcon, UserIcon } from 'lucide-react'
import { NavLink } from 'react-router'

// Map / Profile / My events tabs.

const TABS = [
  { to: '/', label: 'Map', Icon: MapIcon, end: true },
  { to: '/events', label: 'My events', Icon: BookmarkIcon, end: false },
  { to: '/profile', label: 'Profile', Icon: UserIcon, end: false },
]

export function BottomNav() {
  return (
    <nav aria-label="Main" className="flex h-[62px] shrink-0 items-center justify-around bg-surface pb-1">
      {TABS.map(({ to, label, Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `flex w-20 flex-col items-center gap-0.5 rounded-lg py-1 text-[10.5px] focus-visible:outline-2 focus-visible:outline-primary ${
              isActive ? 'font-bold text-primary' : 'text-muted hover:text-ink'
            }`
          }
        >
          <Icon size={20} />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
