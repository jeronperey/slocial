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
  categories: Category[]; // empty = all categories
  radiusMiles: Radius;
  freeOnly: boolean;
  todayOnly: boolean;
}

export const DEFAULT_FILTERS: Filters = {
  categories: [],
  radiusMiles: "any",
  freeOnly: false,
  todayOnly: false,
};

/**
 * Price and date are not on SlocialEvent yet. Once teammates add them, the free-only and
 * today-only filters start working (they are off in the panel until then). Events missing a
 * field are never hidden by it.
 */
type FilterableEvent = SlocialEvent & {
  price?: number | string
  date?: string | Date
}

/** A point on the map: [latitude, longitude]. */
export type LatLng = [number, number]

const EARTH_RADIUS_MILES = 3958.8

/** Straight-line distance between two points, in miles (haversine). */
export function distanceMiles(a: LatLng, b: LatLng): number {
  const rad = (deg: number) => (deg * Math.PI) / 180
  const dLat = rad(b[0] - a[0])
  const dLng = rad(b[1] - a[1])
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a[0])) * Math.cos(rad(b[0])) * Math.sin(dLng / 2) ** 2
  return 2 * EARTH_RADIUS_MILES * Math.asin(Math.sqrt(h))
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

function isFree(price: number | string): boolean {
  return price === 0 || price === "Free";
}

function isToday(date: string | Date): boolean {
  return new Date(date).toDateString() === new Date().toDateString();
}

/** `origin` is where the user is; without it the radius filter is skipped. */
export function matchesFilters(event: SlocialEvent, f: Filters, origin?: LatLng): boolean {
  const e = event as FilterableEvent
  if (f.categories.length > 0 && !f.categories.includes(e.category)) return false
  if (f.radiusMiles !== 'any' && origin && distanceMiles(origin, [e.lat, e.lng]) > f.radiusMiles) return false
  if (f.freeOnly && e.price !== undefined && !isFree(e.price)) return false
  if (f.todayOnly && e.date !== undefined && !isToday(e.date)) return false
  return true
}

export function filterEvents<T extends SlocialEvent>(events: T[], f: Filters, origin?: LatLng): T[] {
  return events.filter((e) => matchesFilters(e, f, origin))
}
