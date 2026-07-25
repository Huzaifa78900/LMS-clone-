import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client Lazily
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

// Support Bot API Endpoint
app.post("/api/support-bot", async (req, res) => {
  try {
    const { message, context, history } = req.body || {};
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getGeminiClient();

    // Context summary
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
Your goal is to guide students with academic inquiries, grade performance analysis, CGPA targets, retake registration advice, scholarship requirements, and general campus support.

Guidelines:
- Maintain an encouraging, clear, concise, professional academic tone.
- Directly answer questions using the student's current grades, exam dates, and CGPA if applicable.
- Give actionable study tips or clear explanations for formulas (e.g. CGPA target calculations, grade point averages).
- Keep answers formatted nicely with bullet points where appropriate.

${academicContext}`;

    if (ai) {
      try {
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

        const replyText = response.text || "I'm sorry, I couldn't process that request at the moment.";
        return res.json({ reply: replyText });
      } catch (geminiError) {
        console.error("Gemini API Error:", geminiError);
        // Fallback intelligently if API fails or key is quota limited
      }
    }

    // Intelligent Fallback AI Bot when offline or missing key
    let fallbackReply = `I am Nexus AI Assistant. Here is guidance regarding your query "${message}":\n\n`;
    const lower = message.toLowerCase();

    if (lower.includes("cgpa") || lower.includes("gpa") || lower.includes("calculate") || lower.includes("target")) {
      fallbackReply += `• **Current Status**: Your current CGPA is 3.42.\n• **Target Goal**: To raise your CGPA to 3.60 with 18 credit hours this semester, you need a semester target GPA of **3.88**.\n• **Tip**: Prioritize high-weight subjects like CS-402 (40%) and AI-305 (40%).`;
    } else if (lower.includes("retake") || lower.includes("register") || lower.includes("appeal")) {
      fallbackReply += `• **Retake Policy**: You can register for a retake for courses graded below B. For Discrete Mathematics II (MA-410, C+), registration is open until May 20th.\n• **Next Step**: Click the **Register for Retake** button in the top action bar to submit your appeal.`;
    } else if (lower.includes("exam") || lower.includes("date") || lower.includes("schedule")) {
      fallbackReply += `• **Upcoming Exams**:\n  1. Final Capstone Presentation - May 12 @ 09:00 AM (L-302 Auditorium)\n  2. OS Architecture Final - May 15 @ 02:00 PM (Virtual Hall B)\n  3. Data Ethics Colloquium - May 18 @ 11:30 AM (Room 405)`;
    } else if (lower.includes("scholarship") || lower.includes("fee") || lower.includes("waiver")) {
      fallbackReply += `• **Merit Scholarship**: Maintaining a CGPA above 3.50 qualifies you for a 25% merit-based tuition waiver.\n• **Fee Status**: Spring 2024 tuition fees are fully settled.`;
    } else {
      fallbackReply += `I can help you analyze your GPA trajectory, review exam schedules, check scholarship criteria, or organize your course timetable. Feel free to ask about any specific course or result!`;
    }

    return res.json({ reply: fallbackReply });

  } catch (err) {
    console.error("Support bot server error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Academic Portal server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
