import { PencilIcon } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { AppHeader } from "../components/layout/AppHeader";
import { Button } from "../components/ui/Button";
import { TextInput } from "../components/ui/TextInput";
import type { User } from "../data/types";
import { DEFAULT_USER } from "../data/user";
import { useAppStore } from "../store/AppStore";

// Shows the user's info with an option to edit it.
// TODO: move the user into AppStore so edits survive switching tabs.

export function ProfilePage() {
  const [user, setUser] = useState<User>(DEFAULT_USER);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<User>(DEFAULT_USER);
  const { reports, registeredEvents, savedEvents } = useAppStore();
  const navigate = useNavigate();
  const currentLocation = useLocation();
  // The header menu's "My reports" opens this page with the list already showing.
  const [showReports, setShowReports] = useState(
    Boolean(currentLocation.state?.openReports),
  );

  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const nameValid = /^[A-Za-z' -]+$/.test(draft.name.trim());
  const emailValid = /^\S+@\S+\.\S+$/.test(draft.email);
  const phoneValid = draft.phone.length === 10;
  const ageValid = draft.age >= 1 && draft.age <= 120;

  const startEditing = () => {
    setDraft(user);
    setEditing(true);
  };

  const save = () => {
    setUser(draft);
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
              placeholder="Jane Doe"
              maxLength={50}
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
            />
            {!nameValid && (
              <p className="text-xs text-danger">
                Enter a name using letters only.
              </p>
            )}
            <TextInput
              label="Email"
              type="email"
              placeholder="name@example.com"
              value={draft.email}
              onChange={(e) => setDraft({ ...draft, email: e.target.value })}
            />
            {!emailValid && (
              <p className="text-xs text-danger">
                Enter an email like name@example.com.
              </p>
            )}
            <TextInput
              label="Phone"
              type="tel"
              inputMode="numeric"
              placeholder="8051234567"
              maxLength={10}
              value={draft.phone}
              onChange={(e) =>
                setDraft({ ...draft, phone: e.target.value.replace(/\D/g, "") })
              }
            />
            {!phoneValid && (
              <p className="text-xs text-danger">
                Phone number must be 10 digits.
              </p>
            )}
            <TextInput
              label="Age"
              inputMode="numeric"
              placeholder="19"
              maxLength={3}
              value={draft.age || ""}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  age: Number(e.target.value.replace(/\D/g, "")),
                })
              }
            />
            {!ageValid && (
              <p className="text-xs text-danger">
                Age must be between 1 and 120.
              </p>
            )}
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
                disabled={!nameValid || !emailValid || !phoneValid || !ageValid}
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
                      key={report.event.name}
                      className="relative rounded-2xl bg-surface p-3.5 pr-12"
                    >
                      <button
                        type="button"
                        aria-label={`Edit report for ${report.event.name}`}
                        className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-lg text-muted hover:bg-raised hover:text-ink focus-visible:outline-2 focus-visible:outline-primary"
                        onClick={() =>
                          navigate(
                            `/events/${encodeURIComponent(report.event.name)}/report`,
                            {
                              state: {
                                backgroundLocation: currentLocation,
                                event: {
                                  ...report.event,
                                  lat: 0,
                                  lng: 0,
                                },
                              },
                            },
                          )
                        }
                      >
                        <PencilIcon size={15} />
                      </button>

                      <h3 className="text-sm font-bold">{report.event.name}</h3>
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
