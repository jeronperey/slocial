import type { Category, SlocialEvent } from "../../data/types";

// Filter state + logic: decides which events show on the map.

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: "music", label: "Music" },
  { value: "sports", label: "Sports" },
  { value: "party", label: "Party" },
  { value: "movie", label: "Movie" },
  { value: "casual", label: "Casual" },
];

export type Radius = "any" | number;

export const RADIUS_OPTIONS: { value: Radius; label: string }[] = [
  { value: "any", label: "Any distance" },
  { value: 1, label: "Within 1 mile" },
  { value: 3, label: "Within 3 miles" },
  { value: 5, label: "Within 5 miles" },
  { value: 10, label: "Within 10 miles" },
];

export interface Filters {
  query: string; // search text; empty = no search
  categories: Category[]; // empty = all categories
  radiusMiles: Radius;
  freeOnly: boolean;
  todayOnly: boolean;
}

export const DEFAULT_FILTERS: Filters = {
  query: "",
  categories: [],
  radiusMiles: "any",
  freeOnly: false,
  todayOnly: false,
};

/** A point on the map: [latitude, longitude]. */
export type LatLng = [number, number];

const EARTH_RADIUS_MILES = 3958.8;

/** Straight-line distance between two points, in miles (haversine). */
export function distanceMiles(a: LatLng, b: LatLng): number {
  const rad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = rad(b[0] - a[0]);
  const dLng = rad(b[1] - a[1]);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(a[0])) * Math.cos(rad(b[0])) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_MILES * Math.asin(Math.sqrt(h));
}

/** Who is looking: where they are (for the radius) and how old they are (for age limits). */
export interface FilterContext {
  origin?: LatLng;
  userAge?: number;
}

export function countActiveFilters(f: Filters): number {
  return (
    (f.categories.length > 0 ? 1 : 0) +
    (f.radiusMiles !== "any" ? 1 : 0) +
    (f.freeOnly ? 1 : 0) +
    (f.todayOnly ? 1 : 0)
  );
}

export function toggleCategory(f: Filters, category: Category): Filters {
  const categories = f.categories.includes(category)
    ? f.categories.filter((c) => c !== category)
    : [...f.categories, category];
  return { ...f, categories };
}

/** The minimum age in a restriction like "21+" or "21+, Cal Poly Students Only"; null if none. */
export function minimumAge(restrictions?: string): number | null {
  const match = restrictions?.match(/(\d{2})\s*\+/);
  return match ? Number(match[1]) : null;
}

function matchesQuery(event: SlocialEvent, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return [event.title, event.address, event.description, event.category]
    .filter(Boolean)
    .some((text) => text!.toLowerCase().includes(q));
}

// Free-only and today-only are not in the panel yet: dates are free text ("Thursday November
// 19th"), not real dates, so "today" cannot be worked out. Free-only treats no price as free.
function isFree(price?: number): boolean {
  return price === undefined || price === 0;
}

export function matchesFilters(
  event: SlocialEvent,
  f: Filters,
  { origin, userAge }: FilterContext = {},
): boolean {
  if (!matchesQuery(event, f.query)) return false;
  if (f.categories.length > 0 && !f.categories.includes(event.category)) return false;
  if (f.radiusMiles !== "any" && origin && distanceMiles(origin, [event.lat, event.lng]) > f.radiusMiles) return false;
  if (f.freeOnly && !isFree(event.price)) return false;
  // Age limits: an event with a minimum age is not shown to someone younger.
  const minAge = minimumAge(event.restrictions);
  if (minAge !== null && userAge !== undefined && userAge < minAge) return false;
  return true;
}

export function filterEvents<T extends SlocialEvent>(
  events: T[],
  f: Filters,
  context: FilterContext = {},
): T[] {
  return events.filter((e) => matchesFilters(e, f, context));
}
