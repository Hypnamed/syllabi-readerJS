import { createEvents } from "ics";

export async function POST(req) {
  try {
    const body = await req.json();
    const { events } = body;

    if (!Array.isArray(events)) {
      console.error("❌ Events not an array:", events);
      return new Response(JSON.stringify({ error: "Invalid events" }), {
        status: 400,
      });
    }

    const formattedEvents = events.map((event) => {
      const [year, month, day] = event.date.split("-").map(Number);

      if (!year || !month || !day) {
        throw new Error(
          `Invalid date format in event: ${JSON.stringify(event)}`
        );
      }

      return {
        title: event.title,
        description: event.description || "",
        start: [year, month, day],
        duration: { hours: 1 },
      };
    });

    const { error, value } = createEvents(formattedEvents);

    if (error) {
      console.error("❌ ICS creation error:", error);
      return new Response(JSON.stringify({ error: error.message || error }), {
        status: 500,
      });
    }

    return new Response(value, {
      headers: {
        "Content-Type": "text/calendar",
        "Content-Disposition": "attachment; filename=syllabus-calendar.ics",
      },
    });
  } catch (err) {
    console.error("🔥 Server error in ICS API:", err);
    return new Response(
      JSON.stringify({ error: "Internal Server Error", details: err.message }),
      { status: 500 }
    );
  }
}
