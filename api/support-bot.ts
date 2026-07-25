import type { Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";

export default async function handler(req: Request, res: Response) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message, context, history } = req.body || {};
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const academicContext = context
      ? `Student Context:
- Student Name: ${context.studentName || "Student 001"}
- Program: ${context.program || "Undergraduate"}
- Current CGPA: ${context.cgpa || "3.42"}
- Current Semester: ${context.currentSemester || "Semester 4"}
- Recent Grades: ${JSON.stringify(context.recentGrades || [])}
- Upcoming Exams: ${JSON.stringify(context.upcomingExams || [])}`
      : "Default Academic Portal Context";

    const systemInstruction = `You are Nexus AI, the official intelligent Academic Support Assistant for the Academic Portal (Higher Learning System).
Provide concise, helpful, and polite academic assistance regarding CGPA, course work, exam dates, retakes, and study strategies.

${academicContext}`;

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const contents = [];
        if (Array.isArray(history)) {
          for (const msg of history) {
            contents.push({
              role: msg.role === "user" ? "user" : "model",
              parts: [{ text: msg.text }],
            });
          }
        }
        contents.push({
          role: "user",
          parts: [{ text: message }],
        });

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents,
          config: {
            systemInstruction,
            temperature: 0.7,
            maxOutputTokens: 800,
          },
        });

        return res.json({ reply: response.text || "No response generated." });
      } catch (err) {
        console.error("Gemini Vercel API error:", err);
      }
    }

    // Fallback response for Vercel if key is not configured
    return res.json({
      reply: `[Nexus AI Support] Received: "${message}". Current student CGPA is 3.42 with 18 expected credits. Target GPA required for 3.60 cumulative is 3.88. Next exam is Final Capstone Presentation on May 12.`
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to process support request" });
  }
}
