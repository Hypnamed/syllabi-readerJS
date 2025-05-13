"use client";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const MiniCalendar = ({ events }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const getEventDates = () => {
    return events.map((event) => event.date);
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const iso = date.toISOString().split("T")[0];
      const hasEvent = getEventDates().includes(iso);
      return hasEvent ? (
        <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mx-auto mt-1" />
      ) : null;
    }
  };

  const eventsOnDate = (date) => {
    const iso = date.toISOString().split("T")[0];
    return events.filter((event) => event.date === iso);
  };

  return (
    <div className="bg-white p-4 rounded shadow mt-6 w-full max-w-xl mx-auto">
      <Calendar
        onClickDay={(value) => setSelectedDate(value)}
        tileContent={tileContent}
      />

      {selectedDate && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">
            Events on {selectedDate.toDateString()}:
          </h3>
          <ul className="list-disc ml-5 mt-2">
            {eventsOnDate(selectedDate).map((event, idx) => (
              <li key={idx}>
                <strong>{event.title}</strong> –{" "}
                {event.description || "No description"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MiniCalendar;
