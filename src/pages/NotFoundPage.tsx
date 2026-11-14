import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-sm text-muted">
      <p>Page not found.</p>
      <Link to="/" className="font-semibold text-ink">
        Back to the map
      </Link>
    </div>
  );
}
