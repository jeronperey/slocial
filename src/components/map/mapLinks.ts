
// Google Maps directions link to an event, built from its lat/lng.
// No API key needed. With no origin, Google starts from the user's location.
export function googleMapsLink({ lat, lng }: { lat: number; lng: number }) {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
}