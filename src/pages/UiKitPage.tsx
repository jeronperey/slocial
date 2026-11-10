import { FlagIcon } from "lucide-react";
import { useCallback, useState, type ReactNode } from "react";
import { AppHeader } from "../components/layout/AppHeader";
import { Button } from "../components/ui/Button";
import { Checkbox } from "../components/ui/Checkbox";
import { Chip } from "../components/ui/Chip";
import { Radio } from "../components/ui/Radio";
import { SectionLabel } from "../components/ui/SectionLabel";
import { GoingPill, Tag } from "../components/ui/Tag";
import { TextInput } from "../components/ui/TextInput";
import { Toast } from "../components/ui/Toast";
import type { Category } from "../data/types";

const CATEGORIES: Category[] = ["music", "sports", "party", "movie", "casual"];

// Preview of every shared UI component. Not part of the app flow.
export function UiKitPage() {
  const [email, setEmail] = useState("");
  const [checks, setChecks] = useState({ free: true, over21: false });
  const [radius, setRadius] = useState(5);
  const [chips, setChips] = useState<Category[]>(["casual"]);
  const [toast, setToast] = useState<string | null>(null);
  const clearToast = useCallback(() => setToast(null), []);

  const toggleChip = (c: Category) =>
    setChips((cs) => (cs.includes(c) ? cs.filter((x) => x !== c) : [...cs, c]));

  return (
    <div className="flex-1 overflow-y-auto p-5">
      <h1 className="mb-1 text-2xl font-bold">UI kit</h1>
      <p className="mb-6 text-sm text-muted">
        Shared components, in every variant.
      </p>

      <Section title="AppHeader">
        <div className="flex flex-col gap-2 overflow-hidden rounded-xl">
          <AppHeader title="Events Around You" />
          <AppHeader title="Report event" back />
        </div>
        <p className="mt-2 text-xs text-muted">
          BottomNav is on every signed-in page: open the Map, Profile or My
          events tab.
        </p>
      </Section>

      <Section title="Button: variants">
        <div className="flex flex-wrap gap-2">
          <Button glow>Register</Button>
          <Button>Primary</Button>
          <Button variant="secondary">Save</Button>
          <Button variant="success">Registered</Button>
          <Button variant="danger">Unregister</Button>
          <Button variant="ghost">Clear</Button>
          <Button disabled>Send report</Button>
        </div>
      </Section>

      <Section title="Button: sizes">
        <div className="flex items-center gap-2">
          <Button>Medium</Button>
          <Button size="sm" variant="secondary">
            Details
          </Button>
          <Button size="sm" variant="danger">
            End
          </Button>
          <Button
            size="icon"
            variant="secondary"
            aria-label="Report"
            className="text-danger!"
          >
            <FlagIcon size={16} />
          </Button>
        </div>
      </Section>

      <Section title="Button: full width">
        <Button fullWidth glow>
          Create account
        </Button>
      </Section>

      <Section title="TextInput">
        <div className="flex flex-col gap-3">
          <TextInput label="Username" defaultValue="sheldon.c" />
          <TextInput
            label="Email"
            type="email"
            placeholder="you@calpoly.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextInput label="Password" type="password" defaultValue="secret12" />
          <TextInput label="Disabled" defaultValue="Can't edit this" disabled />
        </div>
      </Section>

      <Section title="Checkbox">
        <Checkbox
          label="Free"
          checked={checks.free}
          onChange={(v) => setChecks({ ...checks, free: v })}
        />
        <Checkbox
          label="21+"
          checked={checks.over21}
          onChange={(v) => setChecks({ ...checks, over21: v })}
        />
        <Checkbox
          label="Disabled"
          checked={false}
          onChange={() => {}}
          disabled
        />
      </Section>

      <Section title="Radio">
        {[1, 5, 10].map((r) => (
          <Radio
            key={r}
            name="radius"
            label={`${r} mi`}
            checked={radius === r}
            onChange={() => setRadius(r)}
          />
        ))}
      </Section>

      <Section title="Chip">
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((c) => (
            <Chip
              key={c}
              label={c.charAt(0).toUpperCase() + c.slice(1)}
              active={chips.includes(c)}
              onClick={() => toggleChip(c)}
            />
          ))}
        </div>
      </Section>

      <Section title="Tag and GoingPill">
        <div className="flex flex-wrap items-center gap-1.5">
          {CATEGORIES.map((c) => (
            <Tag key={c} category={c} />
          ))}
          <GoingPill />
        </div>
        <p className="mt-2 text-xs text-muted">
          Tag colors come from the --cat-* values in theme.css.
        </p>
      </Section>

      <Section title="SectionLabel">
        <SectionLabel className="mt-0">About</SectionLabel>
        <p className="text-[13px]">Bring your corgi, or just come say hi.</p>
      </Section>

      <Section title="Toast">
        <Button
          variant="secondary"
          onClick={() => setToast("Registered for Corgi Meetup")}
        >
          Show toast
        </Button>
      </Section>

      <Toast message={toast} onDone={clearToast} />
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-7">
      <h2 className="mb-3 text-sm font-semibold text-muted">{title}</h2>
      {children}
    </section>
  );
}
