import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

import { telemetryRouter } from "./server/routes/telemetryRouter";
import { marineAiRouter } from "./server/routes/marineAiRouter";
import { alertsRouter } from "./server/routes/alertsRouter";
import { sosRouter } from "./server/routes/sosRouter";
import { newsRouter } from "./server/routes/newsRouter";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API Health Check
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "ok", 
    system: "ORCA Maritime Reasoning Platform Backend",
    version: "2.5.0",
    connectors: {
      openMeteoMarine: "ACTIVE (Live Ocean Telemetry: Waves, Swell, SST, Currents)",
      openMeteoWeather: "ACTIVE (Live Meteorological Telemetry: Wind, Gusts, Pressure)",
      regionalBaseline: "ACTIVE (Demo / Estimated Baseline: Chlorophyll, Salinity, Tides)",
      liveNewsRss: "ACTIVE (Maritime News & Weather Dispatches)",
      geminiAi: Boolean(process.env.GEMINI_API_KEY) ? "CONFIGURED (Gemini Marine Reasoning)" : "RULE-BASED ENGINE ACTIVE"
    },
    timestamp: new Date().toISOString()
  });
});

// Mount API Routers
app.use("/api/telemetry", telemetryRouter);
app.use("/api/marine", marineAiRouter);
app.use("/api/alerts", alertsRouter);
app.use("/api/sos", sosRouter);
app.use("/api/news", newsRouter);

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SAGAR-SAFE Full-Stack AI Marine server running on http://localhost:${PORT}`);
  });
}

startServer();
