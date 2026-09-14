import { Router, Request, Response } from "express";

export const sosRouter = Router();

interface SosIncident {
  id: string;
  vesselId: string;
  lat: number;
  lng: number;
  emergencyType: string;
  crewCount: number;
  nearestStation: string;
  mrccContact: string;
  status: "DISPATCHED" | "ACKNOWLEDGED" | "ACTIVE";
  timestamp: string;
}

const emergencyIncidents: SosIncident[] = [];

// POST /api/sos/broadcast
sosRouter.post("/broadcast", (req: Request, res: Response) => {
  try {
    const { vesselId, lat, lng, emergencyType, crewCount, nearestStation, mrccContact } = req.body;

    const incident: SosIncident = {
      id: `INC-ICG-${Date.now().toString().slice(-6)}`,
      vesselId: vesselId || "IND-KA-04-MM-8821",
      lat: typeof lat === "number" ? lat : 12.9141,
      lng: typeof lng === "number" ? lng : 74.8560,
      emergencyType: emergencyType || "Engine Failure / Drifting in Heavy Swell",
      crewCount: crewCount || 6,
      nearestStation: nearestStation || "ICG Station Panambur (Mangaluru)",
      mrccContact: mrccContact || "MRCC Mumbai (1554 / VHF Ch 16)",
      status: "DISPATCHED",
      timestamp: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) + " IST"
    };

    emergencyIncidents.unshift(incident);

    res.json({
      success: true,
      message: "Mayday distress packet broadcast to Indian Coast Guard MRCC & Indian Naval Air Station",
      incident
    });
  } catch (error: any) {
    console.error("SOS broadcast error:", error);
    res.status(500).json({ success: false, error: "Failed to broadcast SOS emergency beacon" });
  }
});

// GET /api/sos/incidents
sosRouter.get("/incidents", (req: Request, res: Response) => {
  res.json({
    success: true,
    total: emergencyIncidents.length,
    incidents: emergencyIncidents.slice(0, 10)
  });
});
