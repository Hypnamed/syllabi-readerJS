"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "@/app/i18n/navigation";
import { useTranslations } from "next-intl";

import UploadSyllabi from "@/components/UploadSyllabi";
import EventEditor from "@/components/EventEditor";
import MiniCalendar from "@/components/MiniCalendar";
import LanguageSwitch from "@/components/LanguageSwitch";

export default function HomePage() {
  const t = useTranslations("UploadPage");
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
      <header className="flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold min-h-[2.5rem] flex items-center">
          <Link href="/" className="whitespace-nowrap">
            Syllabi-Reader
          </Link>
        </h1>
        <LanguageSwitch className="w-28" />
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
            <Link href="/">{t("return")}</Link>
          </Button>
        </div>
        <div className="flex justify-center text-2xl mt-auto mb-10">
          {t("footer")}{" "}
          <Link
            href="https://ilkeeren.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline ml-1"
          >
            Eren
          </Link>
          {" & "}
          <Link
            href="https://www.linkedin.com/in/hassan-syed/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline ml-1"
          >
            Hassan
          </Link>
        </div>
      </footer>
    </main>
  );
}
