import { faLocationDot } from "@fortawesome/free-solid-svg-icons/faLocationDot";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons/faPeopleGroup";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import type { Category } from "../../data/types";
import { Tag, GoingPill } from "../ui/Tag";
import { Button } from "../ui/Button";

// Event icon + title + date/time + address.
// TODO: build this component.
interface EventSummaryProps {
  name: string;
  categories: Category[];
  going: boolean;
  date: string;
  time?: string;
  location: string;
}

export function EventSummary({
  name,
  date,
  time,
  location,
  categories,
  going,
}: EventSummaryProps) {
  return (
    <div className=" p-2 w-full">
      <div className="flex flex-row gap-6 w-full">
        <div className="flex flex-col gap-2 w-full">
          <h2 className="font-title underline">
            <FontAwesomeIcon
              className="mr-2 h-10 w-10 text-2xl"
              icon={faPeopleGroup}
            />
            {name}
          </h2>
          <h3>{date}</h3>
          <div className="flex flex-row w-full justify-between">
            <div className="flex flex-row gap-2 items-center">
              {time && <h3>{time}</h3>}
              <div>
                <FontAwesomeIcon icon={faLocationDot} />
                <span>{location}</span>
              </div>
            </div>
            <Button size="sm" variant="clear">
              Directions
              <FontAwesomeIcon icon={faArrowRight} />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mt-2 text-lg">
            {categories.map((category) => (
              <Tag key={category} category={category} />
            ))}
          </div>
          <div className="flex w-full justify-end"></div>
        </div>
      </div>
    </div>
  );
}
