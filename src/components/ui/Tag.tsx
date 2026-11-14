import { CheckIcon } from "lucide-react";
import type { ReactNode } from "react";
import type { Category } from "../../data/types";

// Small category tag + 'Going' pill.

interface TagProps {
  category: Category;
  children?: ReactNode;
}

export function Tag({ category, children }: TagProps) {
  const color = `var(--cat-${category})`;
  return (
    <span
      style={{
        color,
        background: `color-mix(in srgb, ${color} 20%, transparent)`,
      }}
      className="inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold"
    >
      {children ?? category.charAt(0).toUpperCase() + category.slice(1)}
    </span>
  );
}

export function GoingPill() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-ok/15 px-2.5 py-0.5 text-[11px] font-bold text-ok">
      <CheckIcon size={11} strokeWidth={3} /> Going
    </span>
  );
}
