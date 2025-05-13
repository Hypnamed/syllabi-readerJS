"use client";
import { useState } from "react";
import UploadSyllabi from "@/components/UploadSyllabi";
import EventEditor from "@/components/EventEditor";
import MiniCalendar from "@/components/MiniCalendar";

export default function HomePage() {
  const [events, setEvents] = useState([]);

  const handleDownloadICS = async (finalEvents) => {
    const res = await fetch("/api/generateICS", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ events: finalEvents }),
    });

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "syllabus-calendar.ics";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Syllabi Reader</h1>
      <UploadSyllabi onEventsExtracted={setEvents} />

      {events.length > 0 && (
        <EventEditor
          events={events}
          onUpdate={setEvents}
          onDownload={handleDownloadICS}
        />
      )}
      {events.length > 0 && <MiniCalendar events={events} />}
    </div>
  );
}
