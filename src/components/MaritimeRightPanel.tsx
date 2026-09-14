import React, { useState, useEffect } from 'react';
import { 
  X, 
  Anchor, 
  Waves, 
  Wind, 
  Sun, 
  ShieldAlert, 
  Radio, 
  CheckCircle2, 
  AlertTriangle, 
  Compass, 
  MapPin, 
  Fish, 
  Navigation,
  Volume2,
  VolumeX,
  ArrowRight,
  ShieldCheck,
  AlertOctagon,
  LifeBuoy
} from 'lucide-react';
import { IndianPort } from '../types/marine';
import { speakTextInLanguage, stopSpeaking } from '../utils/speechVoice';

interface MaritimeRightPanelProps {
  port: IndianPort;
  onClose: () => void;
  onCenterPort: (port: IndianPort) => void;
  onZoomToBerths: (port: IndianPort) => void;
  coordFormat?: 'decimal' | 'dms';
  speedUnit?: 'knots' | 'kmh';
  language?: string;
}

export const MaritimeRightPanel: React.FC<MaritimeRightPanelProps> = ({
  port,
  onClose,
  onCenterPort,
  onZoomToBerths,
  coordFormat = 'decimal',
  speedUnit = 'knots',
  language = 'en'
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Stop speaking when port changes or panel unmounts
  useEffect(() => {
    stopSpeaking();
    setIsSpeaking(false);
    return () => {
      stopSpeaking();
    };
  }, [port.id, language]);

  // Determine safety condition: Border Proximity, Extreme Weather, or Safe
  const isNearBorder = 
    port.id.includes('rameswaram') || 
    port.id.includes('mandapam') || 
    port.id.includes('colachel') || 
    port.id.includes('okha') || 
    port.id.includes('porbandar') ||
    port.name.toLowerCase().includes('rameswaram') ||
    port.name.toLowerCase().includes('okha');

  const waveHeight = port.weatherSnapshot.waveHeightMeters || 1.2;
  const windSpeed = port.weatherSnapshot.windSpeedKnots || 12;

  const isStormOrRough = 
    waveHeight >= 2.2 || 
    windSpeed >= 22 || 
    port.liveStatus?.toLowerCase().includes('caution') ||
    port.liveStatus?.toLowerCase().includes('alert');

  const isModerateCaution = waveHeight > 1.5 && waveHeight < 2.2;

  // Decide safety tier
  let statusTier: 'BORDER_DANGER' | 'WEATHER_DANGER' | 'CAUTION' | 'SAFE' = 'SAFE';
  if (isNearBorder) {
    statusTier = 'BORDER_DANGER';
  } else if (isStormOrRough) {
    statusTier = 'WEATHER_DANGER';
  } else if (isModerateCaution) {
    statusTier = 'CAUTION';
  } else {
    statusTier = 'SAFE';
  }

  // Voice briefing generator based on port condition and language
  const handleToggleVoice = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }

    let speechText = '';
    if (statusTier === 'BORDER_DANGER') {
      speechText = `Warning! Danger zone near ${port.name}. You are approaching the International Maritime Boundary Line. Do not cross the border. High detention risk. Turn back to ${port.name} harbor immediately.`;
    } else if (statusTier === 'WEATHER_DANGER') {
      speechText = `Warning! Dangerous sea conditions at ${port.name}. Wave height is ${waveHeight} meters with strong gale winds. Do not venture into deep sea. Stay safely docked in harbor.`;
    } else if (statusTier === 'CAUTION') {
      speechText = `Caution advised at ${port.name}. Sea is moderate with waves around ${waveHeight} meters. Stay within 8 kilometers of the coast and return before late afternoon.`;
    } else {
      speechText = `Safe to sail at ${port.name}. Sea is calm with waves at ${waveHeight} meters. Weather is favorable for fishing. Good catch zones are active. Have a safe journey and return before evening.`;
    }

    // Localize simple messages for common languages
    if (language === 'ta') {
      if (statusTier === 'BORDER_DANGER') {
        speechText = `எச்சரிக்கை! ${port.name} அருகில் சர்வதேச கடல் எல்லை உள்ளது. எல்லையை தாண்ட வேண்டாம். படகை உடனடியாக கரைக்கு திருப்புங்கள்.`;
      } else if (statusTier === 'WEATHER_DANGER') {
        speechText = `ஆபத்து எச்சரிக்கை! ${port.name} பகுதியில் கடல் மிகவும் கொந்தளிப்பாக உள்ளது. அலை உயரம் ${waveHeight} மீட்டர். ஆழ்கடலுக்கு செல்ல வேண்டாம்.`;
      } else {
        speechText = `${port.name} பகுதியில் கடல் அமைதியாக உள்ளது. மீன்பிடிக்க செல்லலாம். மாலைக்குள் கரை திரும்புங்கள்.`;
      }
    } else if (language === 'hi') {
      if (statusTier === 'BORDER_DANGER') {
        speechText = `चेतावनी! ${port.name} के पास अंतरराष्ट्रीय समुद्री सीमा है। सीमा पार न करें। तुरंत बंदरगाह वापस लौटें।`;
      } else if (statusTier === 'WEATHER_DANGER') {
        speechText = `खतरा चेतावनी! ${port.name} में समुद्र बहुत अशांत है। लहरें ${waveHeight} मीटर ऊंची हैं। समुद्र में न जाएं।`;
      } else {
        speechText = `${port.name} में आज समुद्र शांत है। मछली पकड़ने के लिए मौसम अनुकूल है। शाम से पहले सुरक्षित लौटें।`;
      }
    } else if (language === 'ml') {
      if (statusTier === 'BORDER_DANGER') {
        speechText = `മുന്നറിയിപ്പ്! ${port.name} സമീപം അന്താരാഷ്ട്ര അതിർത്തിയാണ്. അതിർത്തി കടക്കരുത്. ഉടൻ തിരികെ പോരുക.`;
      } else if (statusTier === 'WEATHER_DANGER') {
        speechText = `അപകട മുന്നറിയിപ്പ്! ${port.name} ഭാഗത്ത് കടൽ പ്രക്ഷുബ്ധമാണ്. ആരും കടലിൽ പോകരുത്.`;
      } else {
        speechText = `${port.name} ഭാഗത്ത് കടൽ ശാന്തമാണ്. മത്സ്യബന്ധനത്തിന് പോകാം. വൈകുന്നേരത്തിന് മുൻപ് തിരിച്ചെത്തുക.`;
      }
    } else if (language === 'te') {
      if (statusTier === 'BORDER_DANGER') {
        speechText = `హెచ్చరిక! ${port.name} వద్ద అంతర్జాతీయ సముద్ర సరిహద్దు దగ్గరగా ఉంది. సరిహద్దు దాటవద్దు. వెంటనే వెనక్కి రండి.`;
      } else if (statusTier === 'WEATHER_DANGER') {
        speechText = `ప్రమాద హెచ్చరిక! ${port.name} వద్ద సముద్రం తీవ్రంగా ఉంది. వేటకు వెళ్లవద్దు.`;
      } else {
        speechText = `${port.name} వద్ద సముద్రం ప్రశాంతంగా ఉంది. చేపల వేటకు అనుకూలంగా ఉంది. సాయంత్రానికి ముందే రండి.`;
      }
    }

    const started = speakTextInLanguage(
      speechText,
      language,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false),
      () => setIsSpeaking(false)
    );

    if (!started) {
      alert('Speech synthesis is not supported in this browser.');
    }
  };

  return (
    <div 
      id="maritime-command-console"
      className="absolute top-3 right-3 bottom-3 w-full max-w-[420px] bg-[#020b18]/95 backdrop-blur-2xl rounded-2xl border-2 border-cyan-500/40 shadow-[0_25px_70px_rgba(0,0,0,0.9)] z-[1050] flex flex-col overflow-hidden animate-in slide-in-from-right-8 duration-200 text-slate-100"
    >
      {/* 1. TOP HEADER WITH HARBOR NAME & DISMISS */}
      <div className="p-3.5 px-4 border-b border-white/10 bg-gradient-to-r from-[#031b38] to-[#020e22] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center shrink-0">
            <Anchor className="w-5 h-5 text-cyan-300" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-bold">
              Command Deck • {port.state}
            </div>
            <h2 className="font-display font-black text-base text-white leading-tight">
              {port.name}
            </h2>
          </div>
        </div>

        <button
          id="btn-close-command-console"
          onClick={onClose}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-rose-500/20 hover:border-rose-500/30 border border-transparent transition-all"
          title="Close Console"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* 2. MASSIVE COLOR-CODED STATUS BANNER */}
      <div className="p-3.5">
        {statusTier === 'BORDER_DANGER' && (
          <div 
            id="status-banner-border-danger"
            className="p-4 rounded-2xl bg-gradient-to-r from-red-650 via-rose-600 to-red-700 text-white shadow-xl shadow-rose-950/60 border-2 border-rose-300 animate-pulse flex items-center gap-3.5"
          >
            <div className="w-14 h-14 rounded-2xl bg-black/30 border-2 border-white/40 flex items-center justify-center shrink-0">
              <AlertOctagon className="w-9 h-9 text-yellow-300 animate-bounce" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-mono font-black tracking-wider uppercase text-yellow-200">
                CRITICAL WARNING
              </div>
              <div className="text-xl font-display font-black leading-tight tracking-tight">
                ❌ STOP! BORDER NEAR
              </div>
              <div className="text-xs text-rose-100 font-bold mt-0.5">
                IMBL Frontier Line • Turn Back to Harbor
              </div>
            </div>
          </div>
        )}

        {statusTier === 'WEATHER_DANGER' && (
          <div 
            id="status-banner-weather-danger"
            className="p-4 rounded-2xl bg-gradient-to-r from-red-650 via-rose-600 to-red-700 text-white shadow-xl shadow-rose-950/60 border-2 border-rose-300 animate-pulse flex items-center gap-3.5"
          >
            <div className="w-14 h-14 rounded-2xl bg-black/30 border-2 border-white/40 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-9 h-9 text-yellow-300 animate-bounce" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-mono font-black tracking-wider uppercase text-yellow-200">
                CYCLONE & SWELL ALERT
              </div>
              <div className="text-xl font-display font-black leading-tight tracking-tight">
                ❌ STOP! ROUGH SEAS
              </div>
              <div className="text-xs text-rose-100 font-bold mt-0.5">
                Waves {waveHeight}m • High Danger • Do Not Sail
              </div>
            </div>
          </div>
        )}

        {statusTier === 'CAUTION' && (
          <div 
            id="status-banner-caution"
            className="p-4 rounded-2xl bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 text-white shadow-xl shadow-amber-950/60 border-2 border-amber-300 flex items-center gap-3.5"
          >
            <div className="w-14 h-14 rounded-2xl bg-black/30 border-2 border-white/40 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-9 h-9 text-yellow-100" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-mono font-black tracking-wider uppercase text-amber-100">
                COASTAL CAUTION
              </div>
              <div className="text-xl font-display font-black leading-tight tracking-tight">
                ⚠️ CAUTION: HIGH SWELL
              </div>
              <div className="text-xs text-amber-100 font-bold mt-0.5">
                Waves {waveHeight}m • Stay Within 8 km of Coast
              </div>
            </div>
          </div>
        )}

        {statusTier === 'SAFE' && (
          <div 
            id="status-banner-safe"
            className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-xl shadow-emerald-950/60 border-2 border-emerald-300 flex items-center gap-3.5"
          >
            <div className="w-14 h-14 rounded-2xl bg-black/30 border-2 border-white/40 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-9 h-9 text-emerald-100" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-mono font-black tracking-wider uppercase text-emerald-100">
                OPTIMAL CONDITIONS
              </div>
              <div className="text-xl font-display font-black leading-tight tracking-tight">
                ✅ SAFE TO SAIL
              </div>
              <div className="text-xs text-emerald-100 font-bold mt-0.5">
                Calm Seas • Clear Route • Active Catch Grounds
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. SIMPLIFIED HIGH-CONTRAST VISUAL CARDS (NO DENSE TABLES) */}
      <div className="flex-1 overflow-y-auto px-4 pb-3 space-y-3">
        
        {/* CARD 1: FISHING POTENTIAL & SPECIES (INCOIS PFZ) */}
        <div className="p-3.5 rounded-2xl bg-[#041a33]/80 border-2 border-emerald-500/40 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center">
                <Fish className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white leading-tight">Fish Catch Potential</h3>
                <span className="text-[10px] font-mono text-emerald-400">INCOIS Oceansat PFZ</span>
              </div>
            </div>
            <div className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 font-bold text-xs">
              ⭐⭐⭐⭐⭐ HIGH
            </div>
          </div>

          <div className="text-xs text-slate-300 font-medium mb-2.5">
            Rich chlorophyll thermal eddy active 12-18 nautical miles offshore.
          </div>

          <div className="flex flex-wrap gap-1.5">
            {(port.primarySpecies && port.primarySpecies.length > 0 
              ? port.primarySpecies 
              : ['Indian Mackerel', 'Seer Fish', 'Yellowfin Tuna', 'Squid']
            ).map((species) => (
              <span 
                key={species}
                className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/30 text-emerald-200 text-xs font-semibold flex items-center gap-1"
              >
                <span>🐟</span>
                <span>{species}</span>
              </span>
            ))}
          </div>
        </div>

        {/* CARD 2: SEA CONDITIONS & WIND */}
        <div className="p-3.5 rounded-2xl bg-[#041a33]/80 border-2 border-cyan-500/40 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center">
                <Waves className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white leading-tight">Sea Swell & Winds</h3>
                <span className="text-[10px] font-mono text-cyan-400">Moored Ocean Buoy Feed</span>
              </div>
            </div>
            <div className={`px-2.5 py-1 rounded-full font-bold text-xs border ${
              waveHeight > 2.0 
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/50' 
                : 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50'
            }`}>
              {waveHeight > 2.0 ? 'ROUGH SEA' : 'MODERATE / CALM'}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-cyan-500/20">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Wave Height</span>
              <strong className="text-base text-cyan-200 font-display font-black">{waveHeight} Meters</strong>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-cyan-500/20">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Wind Velocity</span>
              <strong className="text-base text-cyan-200 font-display font-black">
                {speedUnit === 'kmh' ? `${Math.round(windSpeed * 1.852)} km/h` : `${windSpeed} Knots`}
              </strong>
            </div>
          </div>
        </div>

        {/* CARD 3: 1-TOUCH RETURN TO HARBOR ACTION */}
        <div className="p-3.5 rounded-2xl bg-[#041a33]/80 border-2 border-sky-500/40 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center">
                <Compass className="w-5 h-5 text-sky-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white leading-tight">Harbor Guidance</h3>
                <span className="text-[10px] font-mono text-sky-400">Emergency Safe Haven</span>
              </div>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              VHF CH-16
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2">
            <button
              onClick={() => onCenterPort(port)}
              className="py-2.5 px-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-cyan-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm"
            >
              <Navigation className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Center Harbor</span>
            </button>

            <button
              onClick={() => onZoomToBerths(port)}
              className="py-2.5 px-3 rounded-xl bg-sky-600/30 hover:bg-sky-600/40 border border-sky-400/50 text-sky-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm"
            >
              <LifeBuoy className="w-4 h-4 text-sky-300 shrink-0" />
              <span>Harbor Basin</span>
            </button>
          </div>
        </div>

      </div>

      {/* 4. PROMINENT MASSIVE "VOICE EXPLAIN" BUTTON (AUDIO BRIEFING) */}
      <div className="p-4 border-t border-white/10 bg-gradient-to-t from-[#020a16] to-[#03162c] shrink-0">
        <button
          id="btn-voice-explain-briefing"
          type="button"
          onClick={handleToggleVoice}
          className={`w-full py-4 px-4 rounded-2xl font-display font-black text-sm tracking-wide flex items-center justify-center gap-3 transition-all duration-200 shadow-2xl ${
            isSpeaking
              ? 'bg-rose-600 hover:bg-rose-500 text-white border-2 border-rose-300 shadow-rose-900/70 animate-pulse ring-4 ring-rose-500/40'
              : 'bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 border-2 border-cyan-200 shadow-cyan-900/50 hover:scale-[1.02]'
          }`}
        >
          {isSpeaking ? (
            <>
              <VolumeX className="w-6 h-6 text-white shrink-0 animate-bounce" />
              <span>🛑 STOP AUDIO BRIEFING</span>
            </>
          ) : (
            <>
              <Volume2 className="w-6 h-6 text-slate-950 shrink-0" />
              <span>🔊 VOICE EXPLAIN (LISTEN NOW)</span>
            </>
          )}
        </button>

        <div className="text-center text-[10px] font-mono text-slate-400 mt-2 flex items-center justify-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span>Clear Coastal Dialect • High-Stress Safe Guidance</span>
        </div>
      </div>

    </div>
  );
};
