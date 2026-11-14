import { faLocationDot } from "@fortawesome/free-solid-svg-icons/faLocationDot";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons/faPeopleGroup";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import type { Category } from "../../data/types";
import { Tag } from "../ui/Tag";
import { Button } from "../ui/Button";


// Event icon + title + date/time + address.
// TODO: build this component.
interface EventSummaryProps {
  name: string;
  categories: Category;
  date: string;
  time?: string;
  location: string;
  onDirections: () => void;
}

export function EventSummary({
  name,
  date,
  time,
  location,
  categories,
  onDirections,
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
            <Button size="sm" variant="clear" onClick={onDirections}>
              Directions
              <FontAwesomeIcon icon={faArrowRight} />
            </Button>
          </div>

          <div className="text-lg">
            <Tag key = {categories} category = {categories}/>
          </div>
          
        </div>
      </div>
    </div>
  );
}
