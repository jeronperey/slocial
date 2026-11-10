export function Placeholder({ name }: { name: string }) {
  return (
    <div className="rounded-lg border border-dashed border-line p-3 text-xs font-bold text-ink">
      {name}
    </div>
  );
}

export function PagePlaceholder({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  return (
    <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-4">
      <h1 className="text-xl font-bold">{name}</h1>
      <p className="text-sm text-muted">{description}</p>
    </div>
  );
}
