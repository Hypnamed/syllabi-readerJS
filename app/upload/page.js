"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import UploadSyllabi from "@/components/UploadSyllabi";
import EventEditor from "@/components/EventEditor";
import MiniCalendar from "@/components/MiniCalendar";
import Link from "next/link";

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
    <main className="flex flex-col min-h-screen">
      <header>
        <h1 className="text-center text-4xl font-bold my-10">
          <Link href="/">Syllabi-Reader</Link>
        </h1>
      </header>
      <section className="flex-grow">
        <UploadSyllabi onEventsExtracted={setEvents} />

        {events.length > 0 && (
          <EventEditor
            events={events}
            onUpdate={setEvents}
            onDownload={handleDownloadICS}
          />
        )}
        {events.length > 0 && <MiniCalendar events={events} />}
      </section>
      <footer>
        <div className="flex justify-center text-2xl mt-auto mb-10">
          <Button className="flex justify-self-center my-10 h-12 w-60 text-xl">
            <Link href="/">Return to Homepage</Link>
          </Button>
        </div>
        <div className="flex justify-center text-2xl mt-auto mb-10">
          Made with ❤️ by{" "}
          <Link
            href="https://ilkeeren.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline ml-1"
          >
            Eren
          </Link>{" "}
        </div>
      </footer>
    </main>
  );
}
