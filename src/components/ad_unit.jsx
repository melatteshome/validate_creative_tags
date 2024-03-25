import React, { useState, useEffect } from "react";
import EventsItem from "./item/EventsItem";

const ConsoleLogsViewBox = ({ consoleLogs }) => (
  <div style={{ border: '1px solid #ccc', padding: '10px', maxHeight: '200px', overflowY: 'scroll' }}>
    <h2>Event Types:</h2>
    {consoleLogs.map((log, index) => {
      const eventType = log.find(entry => typeof entry === 'object')?.event_type;
      return (
        <p key={index}>{eventType}</p>
      );
    })}
  </div>
);

const AdUnit = ({ scriptContent }) => {
  const [events, setEvents] = useState([]);
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);

  useEffect(() => {
    const handleAllEvents = (event) => {
      console.log("Received event:", event);
      setEvents((prevEvents) => [...prevEvents, event.detail]);
    };

    const script = document.createElement("script");
    script.id = "gameLoaderScript";
    script.src = "https://wat.adludio.com/loaders/cda/dsp_tester.js";
    script.textContent = scriptContent;

    document.body.appendChild(script);

    const timeout = setTimeout(() => {
      window.addEventListener("allEvents", handleAllEvents);
    }, 1000);

    // Intercept console logs
    const originalConsoleLog = console.log;
    console.log = (...args) => {
      originalConsoleLog(...args);
      setConsoleLogs((prevLogs) => [...prevLogs, args]);
    };

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("allEvents", handleAllEvents);
      document.body.removeChild(script);
      console.log = originalConsoleLog; // Restore original console.log
    };
  }, [scriptContent]);

  // Function to save console logs to a text file
  const saveConsoleLogs = () => {
    const eventTypes = consoleLogs
      .map((log) => {
        const eventObj = log.find((entry) => typeof entry === "object");
        if (eventObj && eventObj.event_type) {
          return eventObj.event_type;
        }
        return null;
      })
      .filter((eventType) => eventType !== null);

    const content = eventTypes.join("\n");

    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "event_types.txt";
    document.body.appendChild(element);
    element.click();
  };

  // Function to handle selecting/deselecting events
  const toggleEventSelection = (eventType) => {
    setSelectedEvents((prevSelectedEvents) => {
      if (prevSelectedEvents.includes(eventType)) {
        return prevSelectedEvents.filter((event) => event !== eventType);
      } else {
        return [...prevSelectedEvents, eventType];
      }
    });
  };

  // Function to handle selection from Home component
  const handleTodoSelect = (title) => {
    toggleEventSelection(title);
  };

  const [eventss, seteventss] = useState([
    {
      _id: "1",
      title: "dom_loading_started",
      isSelected: false,
    },
    {
      _id: "2",
      title: "dom_loading_interactive",
      isSelected: false,
    },
    {
      _id: "3",
      title: "dom_loading_complete",
      isSelected: false,
    },
  ]);

  const changeevents = (id) => {
    seteventss((preveventss) =>
      preveventss.map((events) =>
        events._id === id ? { ...events, isSelected: !events.isSelected } : events
      )
    );
  };

  const handleeventsSelect = (title) => {
    // Invoke the callback function with the selected event title
    toggleEventSelection(title);
  };

  // Get the event types from console logs
  const eventTypes = consoleLogs
    .map((log) => {
      const eventObj = log.find((entry) => typeof entry === "object");
      return eventObj && eventObj.event_type;
    })
    .filter((eventType) => eventType !== null)
    .join("\n");

  return (
    <div style={{ marginTop: '400px' }}>
    <h1 className="text-2xl font-bold text-center mb-8">
      Select events to check
    </h1>
    {eventss.map((events) => (
      <EventsItem
        key={events._id}
        events={events}
        changeevents={changeevents}
        isSelected={selectedEvents.includes(events.title) && eventTypes.includes(events.title)}
        selectedEvents={selectedEvents} // Pass selected events to item
      />
    ))}
      <ul>
        <ConsoleLogsViewBox consoleLogs={consoleLogs} />
        <button className="mt-10" onClick={saveConsoleLogs}>Export triggered Events</button>

        {events.map((event, index) => {
          const eventType = event.event_type;
          const isSelected = selectedEvents.includes(eventType);
          return (
            <li
              key={index}
              style={{ color: isSelected ? "black" : "green" }}
              onClick={() => toggleEventSelection(eventType)}
            >
              {eventType}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AdUnit;
