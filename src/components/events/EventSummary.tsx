import { faLocationDot } from "@fortawesome/free-solid-svg-icons/faLocationDot";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons/faUserGroup";
import { faPersonRunning } from "@fortawesome/free-solid-svg-icons/faPersonRunning";
import { faMusic } from "@fortawesome/free-solid-svg-icons/faMusic";
import { faVideo } from "@fortawesome/free-solid-svg-icons/faVideo";
import { faChampagneGlasses } from "@fortawesome/free-solid-svg-icons/faChampagneGlasses";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import type { Category } from "../../data/types";
import { Tag } from "../ui/Tag";
import { Button } from "../ui/Button";


const ICONS: Record<Category, IconDefinition> = {
  casual: faUserGroup,
  sports: faPersonRunning,
  music: faMusic,
  movie: faVideo,
  party: faChampagneGlasses,
};
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
              icon={ICONS[categories]}
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
            <Tag key={categories} category={categories} />
          </div>
        </div>
      </div>
    </div>
  );
}
