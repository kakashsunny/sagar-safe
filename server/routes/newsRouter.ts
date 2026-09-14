import { Router, Request, Response } from "express";
import { fetchLiveMarineNews } from "../services/liveNewsService";

export const newsRouter = Router();

// GET /api/news/live
newsRouter.get("/live", async (req: Request, res: Response) => {
  try {
    const { items, fetchedAt, isLive } = await fetchLiveMarineNews();
    res.json({
      success: true,
      count: items.length,
      isLive,
      fetchedAt,
      items
    });
  } catch (error: any) {
    console.error("News router error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch live maritime dispatches"
    });
  }
});
