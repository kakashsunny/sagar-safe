import { Router, Request, Response } from "express";
import { generateMarineDecision, generateAdvisoryAudio, MarineAnalysisRequest } from "../services/geminiMarineService";

export const marineAiRouter = Router();

// POST /api/marine/analyze
marineAiRouter.post("/analyze", async (req: Request, res: Response) => {
  try {
    const analysisReq: MarineAnalysisRequest = req.body;
    const decision = await generateMarineDecision(analysisReq);

    res.json({
      success: true,
      decision
    });
  } catch (error: any) {
    console.error("Marine AI analyze route error:", error);
    res.status(500).json({
      success: false,
      error: "Error processing multi-agent marine analysis"
    });
  }
});

// POST /api/marine/tts
marineAiRouter.post("/tts", async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ success: false, error: "Text prompt is required" });
    }

    const audioBase64 = await generateAdvisoryAudio(text);
    if (!audioBase64) {
      return res.status(503).json({ success: false, error: "TTS generation unavailable" });
    }

    res.json({
      success: true,
      audioBase64,
      sampleRate: 24000
    });
  } catch (error: any) {
    console.error("Marine TTS route error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to synthesize spoken marine broadcast"
    });
  }
});
