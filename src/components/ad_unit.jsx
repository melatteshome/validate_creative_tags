import React, { useState, useEffect } from "react";
import EventsItem from "./item/EventsItem";

const ConsoleLogsViewBox = ({ consoleLogs }) => (
  <div style={{ border: '1px solid #ccc', padding: '10px', maxHeight: '200px', overflowY: 'scroll' }}>
    <h2>Triggered Events:</h2>
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
    // Get all triggered event types
    const allTriggeredEventTypes = consoleLogs
      .map((log) => {
        const eventObj = log.find((entry) => typeof entry === "object");
        return eventObj && eventObj.event_type;
      })
      .filter((eventType) => eventType !== null);
  
    // Get selected event types
    const selectedEventTypes = eventss
      .filter((events) => events.isSelected) // Check isSelected here
      .map((events) => events.title);
  
    // Get selected and triggered event types
    const selectedAndTriggeredEventTypes = selectedEventTypes.filter((eventType) =>
      allTriggeredEventTypes.includes(eventType)
    );
  
    // Get selected but not triggered event types
    const selectedButNotTriggeredEventTypes = selectedEventTypes.filter(
      (eventType) => !allTriggeredEventTypes.includes(eventType)
    );
  
    // Get all triggered event types
    const allTriggeredEventsContent = allTriggeredEventTypes.join("\n");
  
    // Get selected and triggered event types content
    const selectedAndTriggeredEventsContent = selectedAndTriggeredEventTypes.join("\n");
  
    // Get selected but not triggered event types content
    const selectedButNotTriggeredEventsContent = selectedButNotTriggeredEventTypes.join("\n");
  
    // Combine all content
    const content =
      `Selected and Triggered Events:\n${selectedAndTriggeredEventsContent}\n\n` +
      `Selected but Not Triggered Events:\n${selectedButNotTriggeredEventsContent}\n\n` +
      `All Triggered Events:\n${allTriggeredEventsContent}`;
  
    // Create and download file
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

  const [eventss, seteventss] = useState([
    {
        "_id": "1",
        "title": "dom_loading_started",
        "isSelected": true
    },
    {
        "_id": "2",
        "title": "dom_loading_interactive",
        "isSelected": true
    },
    {
        "_id": "3",
        "title": "dom_loading_complete",
        "isSelected": true
    },
    {
        "_id": "4",
        "title": "impression/rendered",
        "isSelected": true
    },
    {
        "_id": "5",
        "title": "viewed",
        "isSelected": true
    },
    {
        "_id": "6",
        "title": "creative_loading_started",
        "isSelected": true
    },
    {
        "_id": "7",
        "title": "creative_loading_complete",
        "isSelected": true
    },
    {
        "_id": "8",
        "title": "play_again",
        "isSelected": false
    },
    {
        "_id": "9",
        "title": "engagement",
        "isSelected": false
    },
    {
        "_id": "10",
        "title": "interaction",
        "isSelected": false
    },
    {
        "_id": "11",
        "title": "clickthrough",
        "isSelected": false
    },
    {
        "_id": "12",
        "title": "frame_change",
        "isSelected": true
    },
    {
        "_id": "13",
        "title": "creative_complete",
        "isSelected": true
    },
    {
        "_id": "14",
        "title": "mouse_click",
        "isSelected": true
    },
    {
        "_id": "15",
        "title": "video_start",
        "isSelected": false
    },
    {
        "_id": "16",
        "title": "video_elapsed_time",
        "isSelected": false
    },
    {
        "_id": "17",
        "title": "video_mute",
        "isSelected": false
    },
    {
        "_id": "18",
        "title": "video_unmute",
        "isSelected": false
    },
    {
        "_id": "19",
        "title": "video_pause",
        "isSelected": false
    },
    {
        "_id": "20",
        "title": "video_resume",
        "isSelected": false
    },
    {
        "_id": "21",
        "title": "video_skip",
        "isSelected": false
    },
    {
        "_id": "22",
        "title": "video_close",
        "isSelected": false
    },
    {
        "_id": "23",
        "title": "video_end",
        "isSelected": false
    },
    {
        "_id": "24",
        "title": "bio_answer",
        "isSelected": false
    },
    {
        "_id": "25",
        "title": "user_choice",
        "isSelected": false
    },
    {
        "_id": "26",
        "title": "mouse_hover",
        "isSelected": false
    }
]
);

  const changeevents = (id) => {
    seteventss((preveventss) =>
      preveventss.map((events) =>
        events._id === id ? { ...events, isSelected: !events.isSelected } : events
      )
    );
  };

  // Function to handle selection from Home component
  const handleTodoSelect = (title) => {
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
      <p style={{ fontSize: '1.2em' }}>To effectively utilize our event tracking feature, you can choose which reactive events to monitor as they occur. Non-reactive events, essential for all ad units, are automatically selected. Selected events display a tick mark and turn green upon triggering. After experimentation, easily export triggered events, selected but untriggered events, and all triggered events for analysis.</p>
      {eventss.map((events) => (
        <EventsItem
          key={events._id}
          events={events}
          style={{ padding: '10px' }}
          changeevents={changeevents}
          isSelected={selectedEvents.includes(events.title)}
          eventTypeExists={consoleLogs.some(log => log.find(entry => typeof entry === 'object' && entry.event_type === events.title))}
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
