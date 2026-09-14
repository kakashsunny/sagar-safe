import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { BackgroundOcean } from './components/BackgroundOcean';
import { InteractiveMarineLife } from './components/InteractiveMarineLife';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { AlertCenterDrawer } from './components/AlertCenterDrawer';
import { HistoryModal } from './components/HistoryModal';
import { SourceDetailModal } from './components/SourceDetailModal';
import { LocationSelectorModal } from './components/LocationSelectorModal';
import { SosDistressModal } from './components/SosDistressModal';
import { InteractiveOceanBubbles } from './components/InteractiveOceanBubbles';
import { InteractiveOceanBubbleWidget } from './components/InteractiveOceanBubbleWidget';
import { SettingsModal } from './components/SettingsModal';
import { isBubbleSoundMuted, setBubbleSoundMuted } from './utils/bubbleAudio';

import { DashboardPage } from './pages/DashboardPage';
import { MapPage } from './pages/MapPage';
import { PortsDirectoryPage } from './pages/PortsDirectoryPage';
import { PfzEcologyPage } from './pages/PfzEcologyPage';
import { MarineWeatherPage } from './pages/MarineWeatherPage';
import { NewsPage } from './pages/NewsPage';
import { SourcesTrustPage } from './pages/SourcesTrustPage';

import { 
  MarineLocation, 
  DecisionAnalysis, 
  AgentStep, 
  AnalysisHistoryItem, 
  ParameterTelemetryDetail,
  OceanTelemetry,
  WeatherTelemetry
} from './types/marine';
import { 
  LOCATIONS_DB, 
  ACTIVE_MARINE_ALERTS, 
  getOceanTelemetry, 
  getWeatherTelemetry 
} from './data/marineData';
import { fetchLiveTelemetry } from './services/liveTelemetryService';
import { I18N_TEXT, TranslationDictionary, getLocalizedAgentSteps } from './data/i18nTranslations';
import { runMarineAgentPipeline } from './services/marineAgentEngine';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { OperationalModeProvider } from './context/OperationalModeContext';
import { AuthProvider } from './context/AuthContext';
import { AuthModal } from './components/AuthModal';

import { Waves } from 'lucide-react';

function AppContent() {
  const navigate = useNavigate();
  const { language, setLanguage, t, pageI18n } = useLanguage();

  // Main State
  const [selectedLocation, setSelectedLocation] = useState<MarineLocation>(LOCATIONS_DB[0]); // Default Mangaluru
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);
  const [marineLifeEnabled, setMarineLifeEnabled] = useState<boolean>(true);
  const [lastQuery, setLastQuery] = useState<string>('Status check');

  // Agent Pipeline & Decision State
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<DecisionAnalysis | null>(null);
  const [agentSteps, setAgentSteps] = useState<AgentStep[]>(() => 
    getLocalizedAgentSteps('en', LOCATIONS_DB[0], 'Status check', 'completed')
  );

  // History state
  const [history, setHistory] = useState<AnalysisHistoryItem[]>([
    {
      id: 'hist-1',
      location: LOCATIONS_DB[0],
      query: 'Is it safe to fish tomorrow near Mangaluru?',
      timestamp: '29 Aug 2026 • 09:15 IST',
      safetyStatus: 'GREEN',
      fishingPotential: 'HIGH',
      recommendation: 'FAVORABLE',
      sst: '28.4°C',
      wind: '18 km/h NE'
    },
    {
      id: 'hist-2',
      location: LOCATIONS_DB[2], // Kochi
      query: 'Check potential fishing zones near Munambam',
      timestamp: '28 Aug 2026 • 16:40 IST',
      safetyStatus: 'GREEN',
      fishingPotential: 'HIGH',
      recommendation: 'FAVORABLE',
      sst: '28.9°C',
      wind: '16 km/h WNW'
    }
  ]);

  // Modals & Drawers
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isAlertsDrawerOpen, setIsAlertsDrawerOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isSosModalOpen, setIsSosModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [selectedTelemetryDetail, setSelectedTelemetryDetail] = useState<ParameterTelemetryDetail | null>(null);

  // Interactive Ocean Bubbles & Atmosphere Settings State
  const [bubblesEnabled, setBubblesEnabled] = useState<boolean>(true);
  const [bubbleSoundMuted, setBubbleSoundMutedState] = useState<boolean>(() => isBubbleSoundMuted());
  const [bubbleDensity, setBubbleDensity] = useState<'gentle' | 'normal' | 'surge'>('normal');
  const [bubbleSizeMode, setBubbleSizeMode] = useState<'micro' | 'tiny'>('micro');
  const [burstSignal, setBurstSignal] = useState<number>(0);
  const [poppedBubblesCount, setPoppedBubblesCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('sagar_bubbles_popped');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const handleToggleBubbleSoundMuted = (muted: boolean) => {
    setBubbleSoundMuted(muted);
    setBubbleSoundMutedState(muted);
  };

  const handleBubblePopped = (increment = 1) => {
    setPoppedBubblesCount((prev) => {
      const updated = prev + increment;
      try {
        localStorage.setItem('sagar_bubbles_popped', updated.toString());
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleTriggerBubbleBurst = () => {
    setBurstSignal((s) => s + 1);
  };

  // Derived and live telemetry
  const [ocean, setOcean] = useState<OceanTelemetry>(() => getOceanTelemetry(selectedLocation, isDemoMode));
  const [weather, setWeather] = useState<WeatherTelemetry>(() => getWeatherTelemetry(selectedLocation, isDemoMode));
  const criticalAlertsCount = ACTIVE_MARINE_ALERTS.filter(a => a.severity === 'CRITICAL').length;

  useEffect(() => {
    let active = true;
    fetchLiveTelemetry(selectedLocation, isDemoMode).then((res) => {
      if (active) {
        setOcean(res.ocean);
        setWeather(res.weather);
        runAnalysis(lastQuery, false, language, { ocean: res.ocean, weather: res.weather });
      }
    });
    return () => {
      active = false;
    };
  }, [selectedLocation.id, isDemoMode, language]);

  // Main Pipeline Executor
  const runAnalysis = async (
    query: string, 
    forceDanger = false, 
    targetLang = language,
    telemetryOverride?: { ocean: OceanTelemetry; weather: WeatherTelemetry }
  ) => {
    setLastQuery(query);
    setIsAnalyzing(true);
    
    // Reset steps with localized templates for target language
    setAgentSteps(getLocalizedAgentSteps(targetLang, selectedLocation, query, 'running'));

    const currentOcean = telemetryOverride?.ocean || ocean;
    const currentWeather = telemetryOverride?.weather || weather;

    try {
      const result = await runMarineAgentPipeline(
        selectedLocation,
        query,
        (updatedStep) => {
          setAgentSteps((prev) =>
            prev.map((s) => (s.id === updatedStep.id ? updatedStep : s))
          );
        },
        forceDanger,
        targetLang,
        { ocean: currentOcean, weather: currentWeather }
      );

      setAnalysis(result);

      // Add to history log
      if (selectedLocation.isCoastal) {
        setHistory((prev) => [
          {
            id: `hist-${Date.now()}`,
            location: selectedLocation,
            query,
            timestamp: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) + ' • ' + result.timestamp,
            safetyStatus: result.safetyStatus,
            fishingPotential: result.fishingPotential,
            recommendation: result.recommendation,
            sst: `${currentOcean.sstCelsius}°C`,
            wind: `${currentWeather.windSpeedKmh} km/h ${currentWeather.windDirectionText}`
          },
          ...prev.slice(0, 15)
        ]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // 1-Click Judge Experience Demo Workflow
  const handleExperienceDemoFlow = () => {
    // 1. Switch to Mangaluru
    const mangaluru = LOCATIONS_DB[0];
    setSelectedLocation(mangaluru);
    setIsDemoMode(true);
    navigate('/');

    // 2. Run high-impact demo analysis
    const demoQuery = "Can I safely fish tomorrow morning within 30 km radius of Mangaluru?";
    runAnalysis(demoQuery, false, language);

    // 3. Smooth scroll down to decision card after analysis starts
    setTimeout(() => {
      const el = document.getElementById('decision-reveal-card');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 1800);
  };

  return (
    <div className="min-h-screen relative text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-clip w-full">
      
      {/* Immersive Ocean Background Layer */}
      <BackgroundOcean marineLifeEnabled={marineLifeEnabled} />

      {/* Subtle Low-Performance CSS Keyframe Marine Life Animation Layer */}
      {marineLifeEnabled && <InteractiveMarineLife />}

      {/* Interactive Ocean Bubbles Physics & Pop Layer (Very tiny bubbles on background behind cards) */}
      <InteractiveOceanBubbles
        enabled={bubblesEnabled}
        soundEnabled={!bubbleSoundMuted}
        density={bubbleDensity}
        bubbleSizeMode={bubbleSizeMode}
        onBubblePopped={handleBubblePopped}
        burstSignal={burstSignal}
      />

      {/* Top Floating Glass Navigation Bar with Multi-Page Links */}
      <Navbar
        selectedLocation={selectedLocation}
        onOpenLocationPicker={() => setIsLocationModalOpen(true)}
        onOpenAlerts={() => setIsAlertsDrawerOpen(true)}
        onOpenHistory={() => setIsHistoryModalOpen(true)}
        onRunDemoFlow={handleExperienceDemoFlow}
        onTriggerSos={() => setIsSosModalOpen(true)}
        isDemoMode={isDemoMode}
        setIsDemoMode={setIsDemoMode}
        currentLanguage={language}
        setCurrentLanguage={setLanguage}
        criticalAlertsCount={criticalAlertsCount}
        marineLifeEnabled={marineLifeEnabled}
        onToggleMarineLife={() => setMarineLifeEnabled(!marineLifeEnabled)}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
      />

      {/* SIH Demo Mode Banner Notification if active */}
      {isDemoMode && (
        <div className="max-w-7xl mx-auto px-4 mt-3">
          <div className="ocean-glass-subtle py-1.5 px-4 rounded-xl border border-amber-500/40 bg-amber-950/25 flex items-center justify-between text-xs text-amber-200">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span className="font-mono font-bold">SIH DEMO BENCHMARK ACTIVE:</span>
              <span className="opacity-90">Synthetic calibrated data for demonstration — not for real-world offshore navigation.</span>
            </div>
            <button
              onClick={() => setIsDemoMode(false)}
              className="text-[11px] underline hover:text-white font-mono"
            >
              Switch to Live Feeds
            </button>
          </div>
        </div>
      )}

      {/* Main Multi-Page Routed Views - Stacked in z-10 so cards remain clean, crisp and never disturbed */}
      <main className="pb-28 sm:pb-32 lg:pb-16 relative z-10">
        <Routes>
          <Route
            path="/"
            element={
              <DashboardPage
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                analysis={analysis}
                isAnalyzing={isAnalyzing}
                runAnalysis={(q, fd) => runAnalysis(q, fd, language)}
                handleExperienceDemoFlow={handleExperienceDemoFlow}
                agentSteps={agentSteps}
                ocean={ocean}
                weather={weather}
                isDemoMode={isDemoMode}
                language={language}
                onOpenLocationPicker={() => setIsLocationModalOpen(true)}
                onOpenAlerts={() => setIsAlertsDrawerOpen(true)}
                onOpenTelemetryDetail={(detail) => setSelectedTelemetryDetail(detail)}
              />
            }
          />

          <Route
            path="/map"
            element={
              <MapPage
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                analysis={analysis}
                isDemoMode={isDemoMode}
                language={language}
                onOpenLocationPicker={() => setIsLocationModalOpen(true)}
                onOpenTelemetryDetail={(detail) => setSelectedTelemetryDetail(detail)}
              />
            }
          />

          <Route
            path="/ports"
            element={
              <PortsDirectoryPage
                selectedLocation={selectedLocation}
                onSelectLocation={(loc) => setSelectedLocation(loc)}
                isDemoMode={isDemoMode}
                language={language}
              />
            }
          />

          <Route
            path="/pfz"
            element={
              <PfzEcologyPage
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                isDemoMode={isDemoMode}
                language={language}
                onOpenLocationPicker={() => setIsLocationModalOpen(true)}
              />
            }
          />

          <Route
            path="/weather"
            element={
              <MarineWeatherPage
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                isDemoMode={isDemoMode}
                language={language}
                onOpenLocationPicker={() => setIsLocationModalOpen(true)}
              />
            }
          />

          <Route
            path="/news"
            element={
              <NewsPage
                onSelectLocation={(loc) => setSelectedLocation(loc)}
                language={language}
              />
            }
          />

          <Route
            path="/sources"
            element={
              <SourcesTrustPage
                isDemoMode={isDemoMode}
                language={language}
              />
            }
          />

          {/* Catch-all redirect to Dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Floating Footer Attribution Bar */}
      <footer className="ocean-glass-subtle border-t border-sky-400/10 py-6 px-4 text-center text-xs text-slate-400 font-mono mb-20 lg:mb-0">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Waves className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-white font-display">{t.appTitle}</span>
            <span>•</span>
            <span>{t.tagline}</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Data: INCOIS + IMD + MOSDAC/ISRO</span>
            <span>•</span>
            <span>Multi-Agent Architecture</span>
            <span>•</span>
            <span className="text-emerald-400">{t.safetyTitle}</span>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        onOpenAlerts={() => setIsAlertsDrawerOpen(true)}
        onOpenHistory={() => setIsHistoryModalOpen(true)}
        onTriggerSos={() => setIsSosModalOpen(true)}
        criticalAlertsCount={criticalAlertsCount}
        language={language}
      />

      {/* Floating Interactive Ocean Bubble HUD Widget */}
      <InteractiveOceanBubbleWidget
        bubblesEnabled={bubblesEnabled}
        setBubblesEnabled={setBubblesEnabled}
        soundEnabled={!bubbleSoundMuted}
        setSoundEnabled={(enabled) => handleToggleBubbleSoundMuted(!enabled)}
        bubbleDensity={bubbleDensity}
        setBubbleDensity={setBubbleDensity}
        poppedCount={poppedBubblesCount}
        onTriggerBurst={handleTriggerBubbleBurst}
        selectedLocation={selectedLocation}
        sst={ocean.sstCelsius}
        waveHeight={ocean.waveHeightMeters}
        windSpeed={weather.windSpeedKmh}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
      />

      {/* MODALS & DRAWERS */}
      <LocationSelectorModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        selectedLocation={selectedLocation}
        onSelectLocation={(loc) => setSelectedLocation(loc)}
      />

      <AlertCenterDrawer
        isOpen={isAlertsDrawerOpen}
        onClose={() => setIsAlertsDrawerOpen(false)}
        alerts={ACTIVE_MARINE_ALERTS}
      />

      <HistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        history={history}
        onSelectHistoryItem={(item) => {
          setSelectedLocation(item.location);
          navigate('/');
          runAnalysis(item.query, false, language);
        }}
        onClearHistory={() => setHistory([])}
      />

      <SourceDetailModal
        detail={selectedTelemetryDetail}
        onClose={() => setSelectedTelemetryDetail(null)}
      />

      {/* 🚨 SOS Distress Beacon Modal */}
      <SosDistressModal
        isOpen={isSosModalOpen}
        onClose={() => setIsSosModalOpen(false)}
        location={selectedLocation}
        isDemoMode={isDemoMode}
      />

      {/* ⚙️ System & Audio Settings Modal */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        bubbleSoundMuted={bubbleSoundMuted}
        onToggleBubbleSoundMuted={handleToggleBubbleSoundMuted}
        bubblesEnabled={bubblesEnabled}
        onToggleBubblesEnabled={setBubblesEnabled}
        bubbleDensity={bubbleDensity}
        onChangeBubbleDensity={setBubbleDensity}
        bubbleSizeMode={bubbleSizeMode}
        onChangeBubbleSizeMode={setBubbleSizeMode}
        marineLifeEnabled={marineLifeEnabled}
        onToggleMarineLife={() => setMarineLifeEnabled(!marineLifeEnabled)}
      />

      {/* 🔐 Firebase Mariner Google Auth Modal */}
      <AuthModal />

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <OperationalModeProvider>
        <LanguageProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </LanguageProvider>
      </OperationalModeProvider>
    </AuthProvider>
  );
}
