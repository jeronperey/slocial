import { PencilIcon } from 'lucide-react'
import { useState } from 'react'
import { AppHeader } from '../components/layout/AppHeader'
import { Button } from '../components/ui/Button'
import { TextInput } from '../components/ui/TextInput'
import type { User } from '../data/types'
import { DEFAULT_USER } from '../data/user'

// Shows the user's info with an option to edit it.
// TODO: move the user into AppStore so edits survive switching tabs.
// TODO: replace the Going / Saved counts with real numbers from AppStore.
const GOING_COUNT = 1
const SAVED_COUNT = 2

export function ProfilePage() {
  const [user, setUser] = useState<User>(DEFAULT_USER)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState<User>(DEFAULT_USER)

  const initials = user.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const startEditing = () => {
    setDraft(user)
    setEditing(true)
  }

  const save = () => {
    setUser(draft)
    setEditing(false)
  }

  return (
    <>
      <AppHeader title="Profile" />

      <div className="flex-1 overflow-y-auto p-4">
        <div className="mt-1.5 mb-5 flex items-center gap-3.5">
          <div className="flex size-[72px] shrink-0 items-center justify-center rounded-full border-2 border-primary bg-primary/15 text-2xl font-extrabold text-primary">
            {initials}
          </div>
          <div className="min-w-0">
            <h2 className="truncate text-[21px] font-bold tracking-tight">{user.name}</h2>
            <p className="text-[12.5px] text-muted">Cal Poly student</p>
          </div>
        </div>

        {editing ? (
          <div className="flex flex-col gap-3">
            <TextInput label="Name" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
            <TextInput
              label="Email"
              type="email"
              value={draft.email}
              onChange={(e) => setDraft({ ...draft, email: e.target.value })}
            />
            <TextInput
              label="Phone"
              type="tel"
              value={draft.phone}
              onChange={(e) => setDraft({ ...draft, phone: e.target.value })}
            />
            <TextInput
              label="Age"
              type="number"
              value={draft.age}
              onChange={(e) => setDraft({ ...draft, age: Number(e.target.value) })}
            />
            <div className="mt-2 flex gap-2">
              <Button variant="secondary" className="flex-1" onClick={() => setEditing(false)}>
                Cancel
              </Button>
              <Button glow className="flex-1" onClick={save} disabled={!draft.name.trim()}>
                Save changes
              </Button>
            </div>
          </div>
        ) : (
          <>
            <dl className="rounded-2xl bg-surface">
              {[
                ['Email', user.email],
                ['Phone', user.phone],
                ['Age', String(user.age)],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-3 border-b border-line px-3.5 py-3 text-[13px] last:border-none">
                  <dt className="text-muted">{label}</dt>
                  <dd className="truncate font-bold">{value}</dd>
                </div>
              ))}
            </dl>

            <Button variant="secondary" fullWidth className="mt-4" onClick={startEditing}>
              <PencilIcon size={15} /> Edit my information
            </Button>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <Stat value={GOING_COUNT} label="Going" />
              <Stat value={SAVED_COUNT} label="Saved" />
            </div>
          </>
        )}
      </div>
    </>
  )
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col rounded-2xl bg-surface p-3.5">
      <b className="text-2xl">{value}</b>
      <span className="text-xs text-muted">{label}</span>
    </div>
  )
}
