import express from "express";
import { GoogleGenAI } from "@google/genai";

const router = express.Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

router.post("/summary", async (req, res) => {
  try {
    const { transcript } = req.body;

    if (!transcript || typeof transcript !== "string") {
      return res.status(400).json({
        message: "Meeting transcript is required",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: `You are Vexa AI, a meeting assistant.

Analyze this meeting transcript and provide:
1. A short meeting summary.
2. Important key points.
3. Action items.

Only use information from the transcript. Do not invent details.

Meeting transcript:
${transcript}`,
    });

    return res.json({
      success: true,
      result: response.text,
    });
  } catch (error) {
    console.error("Gemini API Error:", error);

    return res.status(500).json({
      message: "Failed to generate meeting summary",
    });
  }
});

export default router;
