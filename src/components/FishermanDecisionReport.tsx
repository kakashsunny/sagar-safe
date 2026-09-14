import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  ShieldCheck, 
  Volume2, 
  VolumeX, 
  MapPin, 
  Fish, 
  Waves, 
  Wind, 
  CloudRain, 
  Compass, 
  Clock, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Radio, 
  Info,
  Sun,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { MarineLocation, DecisionAnalysis, OceanTelemetry, WeatherTelemetry, PFZZone } from '../types/marine';
import { I18N_TEXT, TranslationDictionary, getDetailedReportDescriptions } from '../data/i18nTranslations';
import { getPageI18n } from '../data/pageTranslations';
import { getFishingReportI18n } from '../data/fishingReportTranslations';
import { speakTextInLanguage, stopSpeaking, getFishermanSpokenReport } from '../utils/speechVoice';

interface FishermanDecisionReportProps {
  location: MarineLocation;
  analysis: DecisionAnalysis | null;
  ocean: OceanTelemetry;
  weather: WeatherTelemetry;
  language?: string;
  onOpenLocationPicker?: () => void;
  onRunScenario?: (scenario: 'safe' | 'caution' | 'danger') => void;
  isAnalyzing?: boolean;
  onFocusMapZone?: () => void;
}

export const FishermanDecisionReport: React.FC<FishermanDecisionReportProps> = ({
  location,
  analysis,
  ocean,
  weather,
  language = 'en',
  onOpenLocationPicker,
  onRunScenario,
  isAnalyzing = false,
  onFocusMapZone
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showTechnicalData, setShowTechnicalData] = useState(false);
  const [activeMode, setActiveMode] = useState<'simple' | 'technical'>('simple');

  const t: TranslationDictionary = I18N_TEXT[language] || I18N_TEXT['en'];
  const pageI18n = getPageI18n(language);
  const fr = getFishingReportI18n(language);

  // Determine Safety Level
  const isSafetyRed = analysis?.safetyStatus === 'RED';
  const isCaution = analysis?.safetyStatus === 'YELLOW';
  const isGood = !isSafetyRed && !isCaution;

  // Cancel speech synthesis immediately if language changes or on unmount
  useEffect(() => {
    stopSpeaking();
    setIsSpeaking(false);
  }, [language]);

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  // Format decision values directly in clear fisherman language
  const verdict = isSafetyRed ? 'DONT_GO' : isCaution ? 'CAUTION' : 'GO';
  
  // 1. Verdict Titles
  const verdictBanner = isSafetyRed
    ? fr.verdictStop
    : isCaution
    ? fr.verdictCaution
    : fr.verdictGo;

  const verdictSubtitle = isSafetyRed
    ? fr.verdictStopSubtitle
    : isCaution
    ? fr.verdictCautionSubtitle
    : fr.verdictGoSubtitle;

  // 2. Six Core Plain-Language Metrics
  const recommendedArea = isSafetyRed
    ? fr.recAreaDanger
    : isCaution
    ? fr.recAreaCaution(location.name)
    : fr.recAreaSafeFormat(location.name, 25, analysis?.suggestedZone?.name || 'Sector Alpha');

  const fishAvailability = isSafetyRed
    ? fr.fishUnsafe
    : isCaution
    ? fr.fishModerate
    : fr.fishHigh;

  const wavesCondition = isSafetyRed
    ? fr.waveHigh
    : isCaution
    ? fr.waveModerate
    : fr.waveSafe;

  const wavesSubtext = isSafetyRed
    ? `3.5m+ ${fr.waveRoughSwell}`
    : isCaution
    ? `${ocean.waveHeightMeters || 1.8}m ${fr.waveChoppySea}`
    : `${ocean.waveHeightMeters || 0.9}m ${fr.waveGentleSwells}`;

  const windCondition = isSafetyRed
    ? fr.windStrong
    : isCaution
    ? fr.windModerate
    : fr.windCalm;

  const windSubtext = isSafetyRed
    ? `50–65 km/h ${fr.windSqualls}`
    : isCaution
    ? `${weather.windSpeedKmh || 26} km/h ${fr.windBreezy}`
    : `${weather.windSpeedKmh || 14} km/h ${fr.windCalmBreeze}`;

  const rainCondition = isSafetyRed
    ? fr.rainHeavy
    : isCaution
    ? fr.rainShowers
    : fr.rainLow;

  const rainSubtext = isSafetyRed
    ? fr.rainSquallDesc
    : isCaution
    ? fr.rainDrizzleDesc
    : fr.rainClearDesc;

  const cycloneRisk = isSafetyRed
    ? fr.cycloneHigh
    : isCaution
    ? fr.cycloneWatch
    : fr.cycloneNone;

  const cycloneSubtext = isSafetyRed
    ? fr.cycloneHighDesc
    : isCaution
    ? fr.cycloneWatchDesc
    : fr.cycloneNoneDesc;

  // 3. Operational Timing & Expected Catch
  const bestTime = isSafetyRed
    ? fr.bestTimeDanger
    : isCaution
    ? fr.bestTimeCaution
    : fr.bestTimeSafe;

  const expectedCatch = isSafetyRed
    ? fr.catchNone
    : isCaution
    ? fr.catchModerate
    : fr.catchGood;

  // 4. Simple Advice & Reason
  const simpleAdvice = isSafetyRed
    ? fr.adviceDanger
    : isCaution
    ? fr.adviceCaution
    : fr.adviceSafe;

  const reasonText = isSafetyRed
    ? fr.reasonDanger
    : isCaution
    ? fr.reasonCaution
    : fr.reasonSafe;

  // Speech handler for Voice Readout in the selected Indian language
  const handleToggleVoice = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }

    const safetyStatus = isSafetyRed ? 'RED' : isCaution ? 'YELLOW' : 'GREEN';
    const speechText = getFishermanSpokenReport(location.name, safetyStatus, language);

    const started = speakTextInLanguage(
      speechText,
      language,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false),
      () => setIsSpeaking(false)
    );

    if (!started) {
      alert('Speech audio is not supported in this browser.');
    }
  };

  return (
    <section 
      id="todays-fishing-report"
      className="w-full max-w-5xl mx-auto px-3 sm:px-6 my-4 animate-fadeIn"
      aria-label="Today's Fishing Report"
    >
      {/* Container Card */}
      <div 
        className={`rounded-3xl p-5 sm:p-7 sm:rounded-[32px] border shadow-2xl transition-all duration-300 relative overflow-hidden backdrop-blur-2xl ${
          isSafetyRed
            ? 'border-rose-500/70 bg-gradient-to-b from-rose-950/70 via-[#18080f]/95 to-[#050b18]/95 shadow-[0_15px_60px_rgba(244,63,94,0.3)]'
            : isCaution
            ? 'border-amber-500/65 bg-gradient-to-b from-amber-950/60 via-[#181105]/95 to-[#050b18]/95 shadow-[0_15px_50px_rgba(245,158,11,0.25)]'
            : 'border-emerald-500/60 bg-gradient-to-b from-emerald-950/50 via-[#031c26]/95 to-[#020b18]/95 shadow-[0_15px_50px_rgba(16,185,129,0.25)]'
        }`}
      >
        {/* Soft atmospheric ambient glow */}
        <div 
          className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 opacity-30 ${
            isSafetyRed ? 'bg-rose-500' : isCaution ? 'bg-amber-500' : 'bg-emerald-400'
          }`} 
        />

        {/* 1. Header Bar: Title, Port, Audio Button & Test Scenarios */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-white/10 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xl">🎣</span>
              <h2 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight">
                {fr.reportTitle}
              </h2>
            </div>
            
            <div className="flex items-center flex-wrap gap-2 text-xs text-slate-300">
              <span className="text-slate-400">{fr.portHarbourLabel}</span>
              <button
                id="btn-report-change-port"
                onClick={onOpenLocationPicker}
                className="inline-flex items-center gap-1 font-bold text-cyan-300 hover:text-white bg-white/10 hover:bg-white/15 px-2.5 py-0.5 rounded-full border border-white/12 transition-all"
                title="Change Maritime Location"
              >
                <MapPin className="w-3.5 h-3.5 text-cyan-300" />
                <span>{location.name}, {location.state}</span>
              </button>
              <span className="text-slate-500">•</span>
              <span className="text-[11px] font-mono text-cyan-200/80">
                {analysis?.timestamp || fr.updatedLive}
              </span>
            </div>
          </div>

          {/* Quick Controls: Voice Readout & Scenario Switcher */}
          <div className="flex items-center flex-wrap gap-2 pt-1 md:pt-0">
            {/* Voice Audio Speaker */}
            <button
              id="btn-report-voice"
              onClick={handleToggleVoice}
              className={`h-9 px-3.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all shadow-md active:scale-95 ${
                isSpeaking 
                  ? 'bg-cyan-500 text-white animate-pulse border border-cyan-300 ring-2 ring-cyan-400/40' 
                  : 'bg-white/10 hover:bg-white/20 text-slate-100 border border-white/15'
              }`}
              title="Listen to audio advice for fishermen"
              aria-label={isSpeaking ? "Stop audio read-out" : "Listen to audio advice"}
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-4 h-4 text-white" />
                  <span>{fr.audioStop}</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-cyan-300" />
                  <span>{fr.audioListen}</span>
                </>
              )}
            </button>

            {/* Quick Test Scenario Buttons (Good / Caution / Danger) */}
            {onRunScenario && (
              <div className="flex items-center gap-1 bg-black/40 p-1 rounded-full border border-white/10 text-[11px] font-mono">
                <button
                  onClick={() => onRunScenario('safe')}
                  className={`px-2.5 py-1 rounded-full font-bold transition-all ${
                    isGood 
                      ? 'bg-emerald-500 text-white shadow-sm' 
                      : 'text-slate-400 hover:text-emerald-300'
                  }`}
                  title="Simulate Good Conditions (Kochi)"
                >
                  ☀️ {fr.scenarioSafe}
                </button>
                <button
                  onClick={() => onRunScenario('caution')}
                  className={`px-2.5 py-1 rounded-full font-bold transition-all ${
                    isCaution 
                      ? 'bg-amber-500 text-slate-950 font-black shadow-sm' 
                      : 'text-slate-400 hover:text-amber-300'
                  }`}
                  title="Simulate Caution / Swell Conditions"
                >
                  ⚠️ {fr.scenarioCaution}
                </button>
                <button
                  onClick={() => onRunScenario('danger')}
                  className={`px-2.5 py-1 rounded-full font-bold transition-all ${
                    isSafetyRed 
                      ? 'bg-rose-600 text-white shadow-sm' 
                      : 'text-slate-400 hover:text-rose-300'
                  }`}
                  title="Simulate Unsafe Rough Sea / Storm"
                >
                  🚫 {fr.scenarioStorm}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 2. Primary Decision Hero (The Big Answer: "Can I go fishing today?") */}
        <div className="py-5 sm:py-6 border-b border-white/10 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-slate-200">
                <span className="text-lg">🎣</span>
                <span>{fr.question}</span>
              </div>

              {/* Bold Decision Verdict Badge */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <div 
                  className={`inline-flex items-center gap-2.5 px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-2xl sm:rounded-3xl border shadow-xl font-display font-black text-2xl sm:text-4xl tracking-tight leading-none ${
                    isSafetyRed
                      ? 'bg-rose-600/30 border-rose-400/80 text-rose-100 shadow-rose-950/60 animate-pulse'
                      : isCaution
                      ? 'bg-amber-500/25 border-amber-400/80 text-amber-100 shadow-amber-950/60'
                      : 'bg-emerald-500/25 border-emerald-400/80 text-emerald-100 shadow-emerald-950/60'
                  }`}
                >
                  {isSafetyRed ? (
                    <ShieldAlert className="w-8 h-8 sm:w-10 sm:h-10 text-rose-300 shrink-0" />
                  ) : isCaution ? (
                    <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 text-amber-300 shrink-0" />
                  ) : (
                    <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-300 shrink-0" />
                  )}
                  <span>{verdictBanner}</span>
                </div>

                <div className="text-base sm:text-lg font-bold text-white tracking-wide">
                  {verdictSubtitle}
                </div>
              </div>
            </div>

            {/* AI Multi-Agent Processing Indicator */}
            <div className="bg-black/40 rounded-2xl p-3 sm:p-4 border border-white/10 max-w-sm lg:text-right shrink-0">
              <div className="flex items-center lg:justify-end gap-1.5 text-[11px] font-mono text-cyan-300 uppercase tracking-wider font-bold">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
                <span>{fr.aiEngineTitle}</span>
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {isSafetyRed 
                  ? 'High risk override: Safety protocol strictly blocks sea venture.' 
                  : isCaution 
                  ? 'Coastal shelf analyzed. Moderate offshore swells require nearshore caution.' 
                  : fr.aiEngineSub}
              </p>
            </div>

          </div>
        </div>

        {/* 3. The 6 Clear Decision Metrics (Clean, Practical, Emoji Tagged) */}
        <div className="py-5 border-b border-white/10 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            
            {/* 1. Recommended Area */}
            <div className="bg-[#031526]/75 rounded-2xl p-4 border border-white/10 hover:border-cyan-400/30 transition-all flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0 text-lg">
                📍
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">
                  {fr.recAreaLabel}
                </div>
                <div className="text-sm font-bold text-white mt-0.5 leading-snug">
                  {recommendedArea}
                </div>
                {onFocusMapZone && analysis?.suggestedZone && !isSafetyRed && (
                  <button
                    onClick={onFocusMapZone}
                    className="mt-1 text-[11px] text-cyan-300 hover:text-cyan-100 flex items-center gap-1 font-semibold hover:underline"
                  >
                    <span>{fr.viewOnMap}</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* 2. Fish Availability */}
            <div className="bg-[#031526]/75 rounded-2xl p-4 border border-white/10 hover:border-cyan-400/30 transition-all flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center shrink-0 text-lg">
                🐟
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">
                  {fr.fishAvailLabel}
                </div>
                <div className={`text-base font-bold mt-0.5 ${
                  isSafetyRed ? 'text-rose-300' : isCaution ? 'text-amber-300' : 'text-emerald-300'
                }`}>
                  {fishAvailability}
                </div>
                <div className="text-xs text-slate-400 mt-0.5 truncate">
                  {location.primarySpecies?.slice(0, 3).join(', ') || 'Mackerel, Sardine, Tuna'}
                </div>
              </div>
            </div>

            {/* 3. Waves */}
            <div className="bg-[#031526]/75 rounded-2xl p-4 border border-white/10 hover:border-cyan-400/30 transition-all flex items-start gap-3.5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-lg ${
                isSafetyRed ? 'bg-rose-500/20 text-rose-300' : isCaution ? 'bg-amber-500/20 text-amber-300' : 'bg-teal-500/20 text-teal-300'
              }`}>
                🌊
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">
                  {fr.wavesLabel}
                </div>
                <div className={`text-base font-bold mt-0.5 ${
                  isSafetyRed ? 'text-rose-300' : isCaution ? 'text-amber-300' : 'text-emerald-300'
                }`}>
                  {wavesCondition}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {wavesSubtext}
                </div>
              </div>
            </div>

            {/* 4. Wind */}
            <div className="bg-[#031526]/75 rounded-2xl p-4 border border-white/10 hover:border-cyan-400/30 transition-all flex items-start gap-3.5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-lg ${
                isSafetyRed ? 'bg-rose-500/20 text-rose-300' : 'bg-sky-500/20 text-sky-300'
              }`}>
                💨
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">
                  {fr.windLabel}
                </div>
                <div className={`text-base font-bold mt-0.5 ${
                  isSafetyRed ? 'text-rose-300' : 'text-white'
                }`}>
                  {windCondition}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {windSubtext}
                </div>
              </div>
            </div>

            {/* 5. Rain */}
            <div className="bg-[#031526]/75 rounded-2xl p-4 border border-white/10 hover:border-cyan-400/30 transition-all flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center shrink-0 text-lg">
                🌧️
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">
                  {fr.rainLabel}
                </div>
                <div className={`text-base font-bold mt-0.5 ${
                  isSafetyRed ? 'text-rose-300' : 'text-white'
                }`}>
                  {rainCondition}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {isSafetyRed ? 'Continuous downpour & squalls' : weather.condition || 'Partly cloudy'}
                </div>
              </div>
            </div>

            {/* 6. Cyclone Risk */}
            <div className="bg-[#031526]/75 rounded-2xl p-4 border border-white/10 hover:border-cyan-400/30 transition-all flex items-start gap-3.5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-lg ${
                isSafetyRed ? 'bg-rose-500/25 text-rose-300 animate-pulse' : 'bg-emerald-500/20 text-emerald-300'
              }`}>
                🌀
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">
                  {fr.cycloneRiskLabel}
                </div>
                <div className={`text-base font-bold mt-0.5 ${
                  isSafetyRed ? 'text-rose-300' : 'text-emerald-300'
                }`}>
                  {cycloneRisk}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {isSafetyRed ? 'Squall warning in effect' : 'No low pressure disturbance'}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 4. Best Time & Expected Catch (Operational Planning) */}
        <div className="py-4 border-b border-white/10 relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-2.5 bg-white/5 px-3.5 py-2 rounded-xl border border-white/10">
            <span className="text-base">⏰</span>
            <span className="text-slate-300">{fr.bestTimeLabel}</span>
            <span className="font-bold text-cyan-200">{bestTime}</span>
          </div>

          <div className="flex items-center gap-2.5 bg-white/5 px-3.5 py-2 rounded-xl border border-white/10">
            <span className="text-base">🧺</span>
            <span className="text-slate-300">{fr.expectedCatchLabel}</span>
            <span className={`font-bold ${
              isSafetyRed ? 'text-rose-300' : isCaution ? 'text-amber-300' : 'text-emerald-300'
            }`}>
              {expectedCatch}
            </span>
          </div>
        </div>

        {/* 5. Simple Advice & Reason (Unmistakable plain words) */}
        <div className="pt-4 relative z-10 space-y-3">
          
          {/* Reason (Why?) */}
          <div className="flex items-start gap-2.5 text-xs sm:text-sm">
            <span className="font-bold text-slate-300 shrink-0">{fr.reasonLabel}</span>
            <span className={isSafetyRed ? 'text-rose-200 font-semibold' : 'text-slate-200'}>
              {reasonText}
            </span>
          </div>

          {/* Simple Advice (Quoted Callout Box) */}
          <div 
            className={`p-4 rounded-2xl border text-sm sm:text-base font-medium leading-relaxed shadow-lg ${
              isSafetyRed
                ? 'bg-rose-500/15 border-rose-500/40 text-rose-100 shadow-rose-950/40'
                : isCaution
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-100 shadow-amber-950/40'
                : 'bg-emerald-500/15 border-emerald-500/40 text-emerald-100 shadow-emerald-950/40'
            }`}
          >
            <div className="text-[11px] font-mono font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5 opacity-90">
              <span>💬</span>
              <span>{fr.simpleAdviceLabel}</span>
            </div>
            <p className="font-display font-semibold italic">
              {simpleAdvice}
            </p>
          </div>

          {/* Detailed Reasoning Intelligence Report (Localized Hindi / Tamil / English) */}
          {(analysis?.detailedReport || getDetailedReportDescriptions(language)) && (
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-cyan-300">
                <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{t.decisionRationale || 'Detailed Marine Advisory Report'}</span>
                </span>
                <span className="text-[10px] text-slate-400">
                  {analysis?.timestamp || 'Real-time telemetry'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {analysis?.detailedReport || (
                  isSafetyRed 
                    ? getDetailedReportDescriptions(language).dangerDetailed
                    : isCaution 
                    ? getDetailedReportDescriptions(language).cautionDetailed
                    : getDetailedReportDescriptions(language).favorableDetailed
                )}
              </p>
            </div>
          )}

          {/* 6. "Complex Data → AI Analysis → Simple Fisherman Decision" Explainability & Science Accordion */}
          <div className="pt-2">
            <button
              id="btn-toggle-scientific-data"
              onClick={() => setShowTechnicalData(!showTechnicalData)}
              className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-cyan-300 hover:text-cyan-200 flex items-center justify-between transition-colors border border-white/10"
            >
              <span className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5" />
                <span className="font-mono">
                  {showTechnicalData 
                    ? 'Hide Raw Telemetry & Baseline Data' 
                    : 'The Core Idea: Complex Data → AI Analysis → Simple Decision (Tap to inspect raw telemetry & sources)'}
                </span>
              </span>
              {showTechnicalData ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showTechnicalData && (
              <div className="mt-3 p-4 rounded-2xl bg-black/50 border border-cyan-400/20 text-xs space-y-3 animate-fadeIn">
                <div className="text-[11px] font-mono text-cyan-300 uppercase tracking-wider font-bold">
                  Underlying Marine & Weather Telemetry (Processed by ORCA Core)
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-300 font-mono text-[11px]">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-slate-400">Sea Surface Temp (SST):</div>
                    <div className="font-bold text-white text-xs mt-0.5">{ocean.sstCelsius}°C</div>
                    <div className="text-[10px] text-cyan-300">Source: Open-Meteo Marine API</div>
                  </div>

                  <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-slate-400">Chlorophyll-a Index:</div>
                    <div className="font-bold text-white text-xs mt-0.5">{ocean.chlorophyllMgM3} mg/m³</div>
                    <div className="text-[10px] text-amber-300 font-medium">Demo / Estimated (Regional Baseline)</div>
                  </div>

                  <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-slate-400">Significant Wave Height:</div>
                    <div className="font-bold text-white text-xs mt-0.5">{ocean.waveHeightMeters} m ({ocean.wavePeriodSeconds}s swell)</div>
                    <div className="text-[10px] text-cyan-300">Source: Open-Meteo Marine API</div>
                  </div>

                  <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-slate-400">Current Velocity:</div>
                    <div className="font-bold text-white text-xs mt-0.5">{ocean.currentSpeedKnots} knots ({ocean.currentDirectionText})</div>
                    <div className="text-[10px] text-cyan-300">Source: Open-Meteo Marine API</div>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 italic">
                  Note: Live marine and weather data are sourced directly from Open-Meteo APIs. Non-live variables such as chlorophyll-a and salinity represent regional baseline estimates.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
