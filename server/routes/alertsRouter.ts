import { Router, Request, Response } from "express";
import { generateRealTimeMarineAlerts } from "../services/liveAlertService";

export const alertsRouter = Router();

// GET /api/alerts/live
alertsRouter.get("/live", async (req: Request, res: Response) => {
  try {
    const result = await generateRealTimeMarineAlerts();
    res.json({
      success: true,
      count: result.alerts.length,
      alerts: result.alerts,
      isLive: result.isLive,
      syncedAt: result.syncedAt
    });
  } catch (error) {
    console.error("Error serving live marine alerts:", error);
    res.status(500).json({
      success: false,
      error: "Live alerts temporarily unavailable",
      alerts: []
    });
  }
});
