import React from "react";
import Check from "./Check";

const EventsItem = ({ events, changeevents, isSelected }) => {
  return (
    <button
      className="flex items-center mb-4 rounded-2xl bg-gray-800 p-5 w-full"
      onClick={() => changeevents(events._id)}
      style={{
        backgroundColor: isSelected ? "green" : "inherit",
      }}
    >
      <Check isSelected={events.isSelected} />
      <span className={events.isSelected ? "line-through" : ""}>
        {events.title}
      </span>
    </button>
  );
};

export default EventsItem;
