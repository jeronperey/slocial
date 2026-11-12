// Row card with a Details button.
// TODO: build this component.
interface EventCardProps {
  description?: string;
}

export function EventCard({ description }: EventCardProps) {
  return (
    <div>
      {description && (
        <div className="flex flex-col gap-1 mt-2 ">
          <h2 className="border-b border-gray-300 pb-2">Description</h2>
          <p>{description}</p>
        </div>
      )}
    </div>
  );
}
