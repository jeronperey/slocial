import { ExternalLinkIcon } from "lucide-react";

interface EventInfoProps {
  price?: number;
  restrictions?: string;
  attendance: number;
  ticketUrl?: string;
}

// Price / Restrictions / Attendance tiles.
export function EventInfo({
  price,
  restrictions,
  attendance,
  ticketUrl,
}: EventInfoProps) {
  return (
    <div className="flex flex-col gap-2 pb-8">
      <h2 className="border-b border-gray-300 pb-2 ">Information</h2>
      <div className="flex flex-row gap-2 items-center">
        <h3 className="">Price : </h3>
        {price ? <p>${price}</p> : <p>Free</p>}
        {price && ticketUrl ? (
          <a
            href={ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto flex items-center gap-1 rounded-lg border-[1.5px] border-primary/55 px-2.5 py-1 text-sm font-bold text-primary hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-primary"
          >
            Buy tickets <ExternalLinkIcon size={14} />
          </a>
        ) : null}
      </div>
      <div className="flex flex-row gap-2 items-center">
        <h3 className="">Restrictions : </h3>
        {restrictions ? <p>{restrictions}</p> : <p>None</p>}
      </div>
      {attendance > 0 && (
        <div className="flex flex-row gap-2 items-center">
          <h3 className="">Attendance : {attendance}</h3>
        </div>
      )}
    </div>
  );
}
