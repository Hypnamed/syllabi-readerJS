import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Parse the request body
    const { syllabusText } = await req.json();

    if (!syllabusText) {
      return NextResponse.json(
        { error: "Missing syllabus text" },
        { status: 400 }
      );
    }

    // Log the syllabus text for debugging
    console.log("📄 Syllabus Text:", syllabusText);

    // Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // Updated model name
        messages: [
          {
            role: "system",
            content:
              "You are an assistant that extracts academic calendar events from a syllabus.",
          },
          {
            role: "user",
            content: `From the following syllabus, extract a list of key academic dates (like exams, holidays, deadlines, homework, and assignment due dates). Return it as JSON. Each object must contain:
- "title" (e.g., "Homework 1 Due", "Midterm Exam", "Spring Break")
- "date" (format: YYYY-MM-DD)
- "description" (optional, e.g., "Submit via Canvas by 11:59 PM")
Only return valid ISO date strings like "2025-03-03", not natural language. Syllabus text: ${syllabusText}`,
          },
        ],
        temperature: 0.2,
      }),
    });

    const data = await response.json();
    console.log("🧠 OpenAI Raw Response:", JSON.stringify(data, null, 2));

    // Check if the response contains the expected data
    let text = data.choices?.[0]?.message?.content;

    if (!text || text.trim() === "") {
      console.error("❌ OpenAI returned empty or no content");
      console.log("🧠 Full OpenAI response:", JSON.stringify(data, null, 2));
      return res.status(500).json({
        error: "OpenAI returned an empty response",
        raw: data,
      });
    }

    // Strip code block markers if present
    text = text.trim();
    if (text.startsWith("```json")) {
      text = text.slice(7, -3).trim(); // Remove ```json and ```
    } else if (text.startsWith("```")) {
      text = text.slice(3, -3).trim(); // Remove ``` and ```
    }

    // Try to parse GPT's response safely
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (e) {
      console.error("❌ Failed to parse GPT response as JSON:", text);
      return NextResponse.json(
        {
          error: "GPT response is not valid JSON",
          raw: text,
        },
        { status: 500 }
      );
    }

    // Return the parsed events
    console.log("✅ Parsed GPT response successfully:", parsed);
    return NextResponse.json(parsed, { status: 200 });
  } catch (err) {
    console.error("🔥 Server error:", err);
    return NextResponse.json(
      { error: "Something went wrong", details: err.message },
      { status: 500 }
    );
  }
}
