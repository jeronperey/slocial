import { PencilIcon } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { AppHeader } from "../components/layout/AppHeader";
import { Button } from "../components/ui/Button";
import { TextInput } from "../components/ui/TextInput";
import type { User } from "../data/types";
import { useAppStore } from "../store/AppStore";

// Shows the user's info with an option to edit it.

export function ProfilePage() {
  const {
    user,
    updateUser,
    reports,
    registeredEvents,
    savedEvents,
  } = useAppStore();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<User>(user);
  const [showReports, setShowReports] = useState(false);
  const navigate = useNavigate();
  const currentLocation = useLocation();

  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const startEditing = () => {
    setDraft(user);
    setEditing(true);
  };

  const save = () => {
    updateUser(draft);
    setEditing(false);
  };

  return (
    <>
      <AppHeader title="Profile" />

      <div className="flex-1 overflow-y-auto p-4">
        <div className="mt-1.5 mb-5 flex items-center gap-3.5">
          <div className="flex size-[72px] shrink-0 items-center justify-center rounded-full border-2 border-primary bg-primary/15 text-2xl font-extrabold text-primary">
            {initials}
          </div>
          <div className="min-w-0">
            <h2 className="truncate text-[21px] font-bold tracking-tight">
              {user.name}
            </h2>
            <p className="text-[12.5px] text-muted">Cal Poly student</p>
          </div>
        </div>

        {editing ? (
          <div className="flex flex-col gap-3">
            <TextInput
              label="Name"
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
            />
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
              onChange={(e) =>
                setDraft({ ...draft, age: Number(e.target.value) })
              }
            />
            <div className="mt-2 flex gap-2">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => setEditing(false)}
              >
                Cancel
              </Button>
              <Button
                glow
                className="flex-1"
                onClick={save}
                disabled={!draft.name.trim()}
              >
                Save changes
              </Button>
            </div>
          </div>
        ) : (
          <>
            <dl className="rounded-2xl bg-surface">
              {[
                ["Email", user.email],
                ["Phone", user.phone],
                ["Age", String(user.age)],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between gap-3 border-b border-line px-3.5 py-3 text-[13px] last:border-none"
                >
                  <dt className="text-muted">{label}</dt>
                  <dd className="truncate font-bold">{value}</dd>
                </div>
              ))}
            </dl>

            <Button
              variant="secondary"
              fullWidth
              className="mt-4"
              onClick={startEditing}
            >
              <PencilIcon size={15} /> Edit my information
            </Button>

            <Button
              variant="secondary"
              fullWidth
              className="mt-2"
              onClick={() => setShowReports((current) => !current)}
              aria-expanded={showReports}
            >
              {showReports ? "Hide my reports" : "View my reports"}
            </Button>

            {showReports && (
              <section className="mt-3 flex flex-col gap-2">
                {reports.length === 0 ? (
                  <p className="rounded-2xl bg-surface p-4 text-center text-sm text-muted">
                    You have not submitted any reports.
                  </p>
                ) : (
                  reports.map((report) => (
                    <article
                      key={report.event.id}
                      className="relative rounded-2xl bg-surface p-3.5 pr-12"
                    >
                      <button
                        type="button"
                        aria-label={`Edit report for ${report.event.title}`}
                        className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-lg text-muted hover:bg-raised hover:text-ink focus-visible:outline-2 focus-visible:outline-primary"
                        onClick={() =>
                          navigate(
                            `/events/${encodeURIComponent(report.event.id)}/report`,
                            {
                              state: {
                                backgroundLocation: currentLocation,
                                event: report.event,
                              },
                            },
                          )
                        }
                      >
                        <PencilIcon size={15} />
                      </button>

                      <h3 className="text-sm font-bold">{report.event.title}</h3>
                      {report.reasons.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {report.reasons.map((reason) => (
                            <span
                              key={reason}
                              className="rounded-full bg-danger/15 px-2 py-1 text-xs text-danger"
                            >
                              {reason}
                            </span>
                          ))}
                        </div>
                      )}
                      {report.additionalInfo && (
                        <p className="mt-2 text-sm text-muted">
                          {report.additionalInfo}
                        </p>
                      )}
                    </article>
                  ))
                )}
              </section>
            )}

            <div className="mt-4 grid grid-cols-2 gap-2">
              <Stat value={registeredEvents.length} label="Going" />
              <Stat value={savedEvents.length} label="Saved" />
            </div>
          </>
        )}
      </div>
    </>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col rounded-2xl bg-surface p-3.5">
      <b className="text-2xl">{value}</b>
      <span className="text-xs text-muted">{label}</span>
    </div>
  );
}
