interface EventInfoProps {
  price?: string;
  restrictions?: string;
}

// Price / Restrictions tiles.
// TODO: build this component.
export function EventInfo({ price, restrictions }: EventInfoProps) {
  return (
    <div className="flex flex-col gap-2 pb-8">
      <h2 className="border-b border-gray-300 pb-2 ">Information</h2>
      <div className="flex flex-row gap-2 items-center">
        <h3 className="">Price : </h3>
        {price ? <p>${price}</p> : <p>Free</p>}
      </div>
      <div className="flex flex-row gap-2 items-center">
        <h3 className="">Restrictions : </h3>
        {restrictions ? <p>{restrictions}</p> : <p>None</p>}
      </div>
    </div>
  );
}
