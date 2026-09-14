import { Router, Request, Response } from "express";
import { fetchLiveMarineTelemetry } from "../services/liveOceanService";

export const telemetryRouter = Router();

// GET /api/telemetry/live?lat=12.91&lng=74.85&name=Mangaluru
telemetryRouter.get("/live", async (req: Request, res: Response) => {
  try {
    const lat = parseFloat(req.query.lat as string) || 12.9141;
    const lng = parseFloat(req.query.lng as string) || 74.8560;
    const name = (req.query.name as string) || "Coastal Sector";

    const telemetry = await fetchLiveMarineTelemetry(lat, lng, name);
    res.json({
      success: true,
      data: telemetry
    });
  } catch (error: any) {
    console.error("Telemetry route error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch live oceanographic telemetry"
    });
  }
});
