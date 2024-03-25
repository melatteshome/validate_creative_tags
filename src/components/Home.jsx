// Home.js
import React, { useState } from "react";
import EventsItem from "./item/EventsItem";

const Home = ({ oneventsSelect }) => {
  const [eventss, seteventss] = useState([
    {
      _id: "1",
      title: "dom_loading_started",
      isCompleted: false,
    },
    {
      _id: "2",
      title: "dom_loading_interactive",
      isCompleted: false,
    },
    {
      _id: "3",
      title: "dom_loading_complete",
      isCompleted: false,
    },
  ]);

  const changeevents = (id) => {
    seteventss((preveventss) =>
      preveventss.map((events) =>
        events._id === id ? { ...events, isCompleted: !events.isCompleted } : events
      )
    );
  };

  const handleeventsSelect = (title) => {
    // Invoke the callback function with the selected event title
    oneventsSelect(title);
  };

  return (
    <div className="text-white w-4/5 mx-auto">
      <h1 className="text-2xl font-bold text-center mb-8">
        Select events to check
      </h1>
      {eventss.map((events) => (
        <EventsItem
          key={events._id}
          events={events}
          changeevents={changeevents}
          onSelect={handleeventsSelect} // Pass the event title
        />
      ))}
    </div>
  );
};

export default Home;
