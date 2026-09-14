import React from 'react';
import { Link } from 'react-router-dom';
import { HeroSection } from '../components/HeroSection';
import { LiveIntelligenceCards } from '../components/LiveIntelligenceCards';
import { DecisionRevealCard } from '../components/DecisionRevealCard';
import { AgentActivityPipeline } from '../components/AgentActivityPipeline';
import { ExplainabilityCard } from '../components/ExplainabilityCard';
import { InlandExperienceCard } from '../components/InlandExperienceCard';
import { MarineLocation, DecisionAnalysis, AgentStep, ParameterTelemetryDetail, OceanTelemetry, WeatherTelemetry } from '../types/marine';
import { LOCATIONS_DB } from '../data/marineData';
import { I18N_TEXT, TranslationDictionary } from '../data/i18nTranslations';
import { getPageI18n } from '../data/pageTranslations';
import { 
  Compass, 
  Anchor, 
  Fish, 
  CloudSun, 
  Newspaper,
  ArrowRight,
  Sparkles,
  Sliders
} from 'lucide-react';
import { useOperationalMode } from '../context/OperationalModeContext';
import { FishermanSafetyCard } from '../components/FishermanSafetyCard';
import { ExecutiveTechnicalTables } from '../components/ExecutiveTechnicalTables';

interface DashboardPageProps {
  selectedLocation: MarineLocation;
  setSelectedLocation: (loc: MarineLocation) => void;
  analysis: DecisionAnalysis | null;
  isAnalyzing: boolean;
  runAnalysis: (query: string, forceDanger?: boolean) => void;
  handleExperienceDemoFlow: () => void;
  agentSteps: AgentStep[];
  ocean: OceanTelemetry;
  weather: WeatherTelemetry;
  isDemoMode: boolean;
  language: string;
  onOpenLocationPicker: () => void;
  onOpenAlerts: () => void;
  onOpenTelemetryDetail: (detail: ParameterTelemetryDetail) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  selectedLocation,
  setSelectedLocation,
  analysis,
  isAnalyzing,
  runAnalysis,
  handleExperienceDemoFlow,
  agentSteps,
  ocean,
  weather,
  isDemoMode,
  language,
  onOpenLocationPicker,
  onOpenAlerts,
  onOpenTelemetryDetail,
}) => {
  const t: TranslationDictionary = I18N_TEXT[language] || I18N_TEXT['en'];
  const pageI18n = getPageI18n(language);
  const { operationalMode, isFishermanMode, isExecutiveMode, setOperationalMode } = useOperationalMode();

  const handleQuickAction = (type: 'fishing' | 'ocean' | 'weather' | 'alerts' | 'safety') => {
    if (type === 'alerts') {
      onOpenAlerts();
      return;
    }
    if (type === 'fishing') {
      runAnalysis(`Find highest potential pelagic fishing zones near ${selectedLocation.name}`);
    } else if (type === 'ocean') {
      runAnalysis(`Analyze sea surface temperature, currents and wave heights at ${selectedLocation.name}`);
    } else if (type === 'weather') {
      runAnalysis(`Evaluate IMD wind and precipitation forecast for ${selectedLocation.name}`);
    } else if (type === 'safety') {
      runAnalysis(`Perform comprehensive maritime safety protocol check for ${selectedLocation.name}`);
    }
    
    // Smooth scroll down to decision card
    setTimeout(() => {
      const decisionEl = document.getElementById('decision-reveal-card');
      if (decisionEl) {
        decisionEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 450);
  };

  const handleHeroRunQuery = (query: string, forceDanger?: boolean) => {
    runAnalysis(query, forceDanger);
    setTimeout(() => {
      const decisionEl = document.getElementById('decision-reveal-card');
      if (decisionEl) {
        decisionEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 450);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Top Hero Section */}
      <HeroSection
        selectedLocation={selectedLocation}
        analysis={analysis}
        onOpenLocationPicker={onOpenLocationPicker}
        onRunQuery={handleHeroRunQuery}
        onQuickAction={handleQuickAction}
        isAnalyzing={isAnalyzing}
        language={language}
        steps={agentSteps}
      />

      {/* Operational User Mode Selector Capsule */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="ocean-glass px-4 py-2.5 rounded-2xl border border-cyan-500/20 flex flex-wrap items-center justify-between gap-3 shadow-lg bg-[#020b16]/80">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
              OPERATIONAL USER MODE:
            </span>
            <span className={`text-xs font-mono font-black px-2 py-0.5 rounded-full ${
              isFishermanMode 
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
            }`}>
              {isFishermanMode ? '🎣 FISHERMAN MODE (High-Contrast)' : '🏢 EXECUTIVE COMMAND MODE'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setOperationalMode('FISHERMAN')}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                isFishermanMode
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                  : 'ocean-glass-card text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              Fisherman Mode
            </button>
            <button
              onClick={() => setOperationalMode('EXECUTIVE')}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                isExecutiveMode
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                  : 'ocean-glass-card text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              Executive Mode
            </button>
          </div>
        </div>
      </div>

      {/* If Inland location, show dedicated inland experience */}
      {!selectedLocation.isCoastal ? (
        <InlandExperienceCard
          location={selectedLocation}
          onExploreCoastal={() => {
            setSelectedLocation(LOCATIONS_DB[0]); // Switch to Mangaluru
          }}
        />
      ) : isFishermanMode ? (
        /* DUAL MODE A: FISHERMAN MODE (Stripped tables, massive universal safety badge + voice briefing) */
        <div className="space-y-6">
          <div className="max-w-7xl mx-auto px-4">
            <FishermanSafetyCard
              selectedLocation={selectedLocation}
              ocean={ocean}
              weather={weather}
              analysis={analysis}
              language={language}
              onOpenLocationPicker={onOpenLocationPicker}
            />
          </div>

          {/* AI Agent Pipeline Activity Visualization */}
          <AgentActivityPipeline
            steps={agentSteps}
            isAnalyzing={isAnalyzing}
            language={language}
          />
        </div>
      ) : (
        /* DUAL MODE B: EXECUTIVE COMMAND MODE (Full suite of technical tables & live telemetry) */
        <>
          {/* Executive Technical Sub-Tables (Berth Occupancy, AIS Live Targets, Synoptic Wave Telemetry) */}
          <div className="max-w-7xl mx-auto px-4">
            <ExecutiveTechnicalTables 
              selectedLocation={selectedLocation}
              ocean={ocean}
              weather={weather}
              language={language}
            />
          </div>

          {/* Live Intelligence Floating Glass Cards */}
          <LiveIntelligenceCards
            location={selectedLocation}
            ocean={ocean}
            weather={weather}
            analysis={analysis}
            onOpenTelemetryDetail={onOpenTelemetryDetail}
            isDemoMode={isDemoMode}
            language={language}
          />

          {/* The "WOW" Decision Reveal Card (Safety-First Hierarchy) */}
          {analysis && (
            <DecisionRevealCard
              analysis={analysis}
              location={selectedLocation}
              language={language}
              onFocusMapZone={() => {
                const mapEl = document.getElementById('map-preview-section');
                if (mapEl) mapEl.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          )}

          {/* Multi-Page Quick Navigation Gateways */}
          <div className="max-w-7xl mx-auto px-4">
            <div className="ocean-glass rounded-2xl p-5 sm:p-6 border border-cyan-400/20 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-sm sm:text-base font-bold text-white tracking-wide uppercase">
                    {t.navMap} & {t.navPorts} • SPECIALIZED DOMAINS
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-cyan-300/70 hidden sm:inline">
                  Deep Geospatial & Scientific Portals
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
                {/* Gateway 1: Ocean Observatory */}
                <Link
                  to="/map"
                  className="group ocean-glass-card p-4 rounded-xl border border-cyan-400/20 hover:border-cyan-300/60 transition-all hover:scale-[1.02] flex flex-col justify-between"
                >
                  <div>
                    <div className="w-9 h-9 rounded-lg bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 mb-3 group-hover:bg-cyan-500/30 transition-all">
                      <Compass className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-white text-sm group-hover:text-cyan-200 flex items-center gap-1.5">
                      {t.navMap}
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Interactive satellite bathymetry, moored buoys, current vectors & squall tracks.
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-cyan-400/10 flex items-center justify-between text-[11px] text-cyan-300 font-mono">
                    <span>{t.viewOnMap}</span>
                    <span>→</span>
                  </div>
                </Link>

                {/* Gateway 2: Ports Directory */}
                <Link
                  to="/ports"
                  className="group ocean-glass-card p-4 rounded-xl border border-cyan-400/20 hover:border-cyan-300/60 transition-all hover:scale-[1.02] flex flex-col justify-between"
                >
                  <div>
                    <div className="w-9 h-9 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300 mb-3 group-hover:bg-blue-500/30 transition-all">
                      <Anchor className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-white text-sm group-hover:text-blue-200 flex items-center gap-1.5">
                      {t.navPorts}
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      All 12 Major Ports, state maritime harbours, berths, drafts & landing centres.
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-cyan-400/10 flex items-center justify-between text-[11px] text-blue-300 font-mono">
                    <span>65+ Coastal Harbours</span>
                    <span>→</span>
                  </div>
                </Link>

                {/* Gateway 3: Potential Fishing Zones */}
                <Link
                  to="/pfz"
                  className="group ocean-glass-card p-4 rounded-xl border border-cyan-400/20 hover:border-cyan-300/60 transition-all hover:scale-[1.02] flex flex-col justify-between"
                >
                  <div>
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 mb-3 group-hover:bg-emerald-500/30 transition-all">
                      <Fish className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-white text-sm group-hover:text-emerald-200 flex items-center gap-1.5">
                      {t.cardPfz}
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Oceansat-3 thermal breaks, species predictions, GPS waypoints & fuel savings.
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-cyan-400/10 flex items-center justify-between text-[11px] text-emerald-300 font-mono">
                    <span>{t.chlorophyllIndex} & Fronts</span>
                    <span>→</span>
                  </div>
                </Link>

                {/* Gateway 4: Marine Meteorology */}
                <Link
                  to="/weather"
                  className="group ocean-glass-card p-4 rounded-xl border border-cyan-400/20 hover:border-cyan-300/60 transition-all hover:scale-[1.02] flex flex-col justify-between"
                >
                  <div>
                    <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-3 group-hover:bg-amber-500/30 transition-all">
                      <CloudSun className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-white text-sm group-hover:text-amber-200 flex items-center gap-1.5">
                      {t.navWeather}
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      IMD squall warnings, swell surge alerts, wind compass & 5-day marine forecast.
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-cyan-400/10 flex items-center justify-between text-[11px] text-amber-300 font-mono">
                    <span>Squall & Swell Index</span>
                    <span>→</span>
                  </div>
                </Link>

                {/* Gateway 5: Marine News & Bulletins */}
                <Link
                  to="/news"
                  className="group ocean-glass-card p-4 rounded-xl border border-cyan-400/20 hover:border-cyan-300/60 transition-all hover:scale-[1.02] flex flex-col justify-between"
                >
                  <div>
                    <div className="w-9 h-9 rounded-lg bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-300 mb-3 group-hover:bg-sky-500/30 transition-all">
                      <Newspaper className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-white text-sm group-hover:text-sky-200 flex items-center gap-1.5">
                      <span>{pageI18n.newsNav || 'News'}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      ISRO satellite PFZ advisories, IMD cyclone warnings & Coast Guard dispatches.
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-cyan-400/10 flex items-center justify-between text-[11px] text-sky-300 font-mono">
                    <span>Verified Bulletins</span>
                    <span>→</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* AI Agent Pipeline Activity Visualization */}
          <AgentActivityPipeline
            steps={agentSteps}
            isAnalyzing={isAnalyzing}
            language={language}
          />

          {/* Explainability Card (Why this decision?) */}
          {analysis && (
            <ExplainabilityCard
              analysis={analysis}
              language={language}
            />
          )}
        </>
      )}
    </div>
  );
};
