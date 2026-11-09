import type { Category, SlocialEvent } from '../../data/types'

// Filter state + logic: decides which events show on the map.

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'music', label: 'Music' },
  { value: 'sports', label: 'Sports' },
  { value: 'party', label: 'Party' },
  { value: 'movie', label: 'Movie' },
  { value: 'casual', label: 'Casual' },
]

export type Radius = 'any' | number

export const RADIUS_OPTIONS: { value: Radius; label: string }[] = [
  { value: 'any', label: 'Any distance' },
  { value: 1, label: 'Within 1 mile' },
  { value: 3, label: 'Within 3 miles' },
  { value: 5, label: 'Within 5 miles' },
  { value: 10, label: 'Within 10 miles' },
]

export interface Filters {
  categories: Category[] // empty = all categories
  radiusMiles: Radius
  freeOnly: boolean
  todayOnly: boolean
}

export const DEFAULT_FILTERS: Filters = {
  categories: [],
  radiusMiles: 'any',
  freeOnly: false,
  todayOnly: false,
}

/**
 * The fields filtering can look at. The shared SlocialEvent type only has
 * id/title/category so far; once teammates add distance, price and date to it,
 * these start filtering automatically. Events missing a field are never hidden by it.
 */
type FilterableEvent = SlocialEvent & {
  distanceMiles?: number
  price?: number | string
  date?: string | Date
}

export function countActiveFilters(f: Filters): number {
  return (f.categories.length > 0 ? 1 : 0) + (f.radiusMiles !== 'any' ? 1 : 0) + (f.freeOnly ? 1 : 0) + (f.todayOnly ? 1 : 0)
}

export function toggleCategory(f: Filters, category: Category): Filters {
  const categories = f.categories.includes(category)
    ? f.categories.filter((c) => c !== category)
    : [...f.categories, category]
  return { ...f, categories }
}

function isFree(price: number | string): boolean {
  return price === 0 || price === 'Free'
}

function isToday(date: string | Date): boolean {
  return new Date(date).toDateString() === new Date().toDateString()
}

export function matchesFilters(event: SlocialEvent, f: Filters): boolean {
  const e = event as FilterableEvent
  if (f.categories.length > 0 && !f.categories.includes(e.category)) return false
  if (f.radiusMiles !== 'any' && e.distanceMiles !== undefined && e.distanceMiles > f.radiusMiles) return false
  if (f.freeOnly && e.price !== undefined && !isFree(e.price)) return false
  if (f.todayOnly && e.date !== undefined && !isToday(e.date)) return false
  return true
}

export function filterEvents<T extends SlocialEvent>(events: T[], f: Filters): T[] {
  return events.filter((e) => matchesFilters(e, f))
}
