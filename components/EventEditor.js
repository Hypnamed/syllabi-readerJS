"use client";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

const EventEditor = ({ events, onUpdate, onDownload }) => {
  const t = useTranslations("EventEditor");
  const [editedEvents, setEditedEvents] = useState(events);

  useEffect(() => {
    setEditedEvents(events); // update if new events are passed in
  }, [events]);

  const handleChange = (index, field, value) => {
    const updated = [...editedEvents];
    updated[index][field] = value;
    setEditedEvents(updated);
    onUpdate(updated); // notify parent
  };

  const handleDelete = (index) => {
    const updated = [...editedEvents];
    updated.splice(index, 1);
    setEditedEvents(updated);
    onUpdate(updated);
  };

  const handleAdd = () => {
    const newEvent = {
      title: t("new"),
      date: "2025-01-01",
      description: "",
    };
    const updated = [...editedEvents, newEvent];
    setEditedEvents(updated);
    onUpdate(updated);
  };

  return (
    <div className="mt-6 w-full max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">{t("title")}</h2>
      <div className="space-y-4">
        {editedEvents.map((event, index) => (
          <div
            key={index}
            className="bg-white rounded p-4 shadow space-y-2 relative"
          >
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={event.title}
              onChange={(e) => handleChange(index, "title", e.target.value)}
              placeholder="Event Title"
            />
            <input
              type="date"
              className="w-full p-2 border rounded"
              value={event.date}
              onChange={(e) => handleChange(index, "date", e.target.value)}
              placeholder="YYYY-MM-DD"
            />
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={event.description || ""}
              onChange={(e) =>
                handleChange(index, "description", e.target.value)
              }
              placeholder={t("description")}
            />
            <button
              onClick={() => handleDelete(index)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
              title={t("delete")}
            >
              🗑
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={handleAdd}
          className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
        >
          {t("addNew")}
        </button>

        <button
          onClick={() => onDownload(editedEvents)}
          className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded"
        >
          {t("download")}
        </button>
      </div>
    </div>
  );
};

export default EventEditor;
