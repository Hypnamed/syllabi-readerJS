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
            content: `From the following syllabus, extract a list of key dates and events (like exams, breaks, and deadlines). Return it in JSON format as an array with each object containing: "title", "date", and "description".\n\n${syllabusText}`,
          },
        ],
        temperature: 0.2,
      }),
    });

    const data = await response.json();
    console.log("🧠 OpenAI Raw Response:", JSON.stringify(data, null, 2));

    // Check if the response contains the expected data
    let text = data.choices?.[0]?.message?.content;
    if (!text) {
      console.error("❌ No content from GPT");
      return NextResponse.json(
        {
          error: "OpenAI returned an empty response",
          raw: data,
        },
        { status: 500 }
      );
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
