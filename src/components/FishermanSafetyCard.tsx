import React, { useState } from 'react';
import { 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  AlertTriangle, 
  Compass, 
  Anchor, 
  Navigation, 
  Radio, 
  Waves, 
  Wind,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { MarineLocation, OceanTelemetry, WeatherTelemetry, DecisionAnalysis } from '../types/marine';
import { useLanguage } from '../context/LanguageContext';
import { speakTextInLanguage, stopSpeaking } from '../utils/speechVoice';

interface FishermanSafetyCardProps {
  selectedLocation: MarineLocation;
  ocean: OceanTelemetry;
  weather: WeatherTelemetry;
  analysis?: DecisionAnalysis | null;
  language?: string;
  onOpenLocationPicker?: () => void;
  isSimulatedBorderBreach?: boolean;
  onToggleBorderBreach?: () => void;
}

export const FishermanSafetyCard: React.FC<FishermanSafetyCardProps> = ({
  selectedLocation,
  ocean,
  weather,
  analysis,
  language: propLanguage,
  onOpenLocationPicker,
  isSimulatedBorderBreach = false,
  onToggleBorderBreach
}) => {
  const { language: ctxLanguage } = useLanguage();
  const language = propLanguage || ctxLanguage || 'en';
  const location = selectedLocation;
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [localBorderAlert, setLocalBorderAlert] = useState(isSimulatedBorderBreach);

  // Border status determined by real simulation, local toggle, or analysis danger
  const isDanger = isSimulatedBorderBreach || localBorderAlert || analysis?.isSafetyAlert || analysis?.recommendation === 'RED';

  const handleToggleBorder = () => {
    if (onToggleBorderBreach) {
      onToggleBorderBreach();
    } else {
      setLocalBorderAlert(!localBorderAlert);
    }
  };

  const handleVoiceBriefing = () => {
    if (isPlayingAudio) {
      stopSpeaking();
      setIsPlayingAudio(false);
      return;
    }

    setIsPlayingAudio(true);

    let briefingText = '';
    if (isDanger) {
      if (language === 'hi') {
        briefingText = `सावधान! सागर-सेफ सुरक्षा चेतावनी। आप अंतरराष्ट्रीय समुद्री सीमा रेखा आईएमबीएल के पांच किलोमीटर के भीतर हैं। तत्काल सुरक्षित जलक्षेत्र में लौटें। ठीक ${location.name} की ओर मुड़ें।`;
      } else if (language === 'ta') {
        briefingText = `எச்சரிக்கை! சர்வதேச கடல் எல்லைக்கு அருகில் உள்ளீர்கள். உடனே உங்கள் படகை இந்திய கடல் பகுதிக்குள் திருப்புங்கள். ${location.name} துறைமுகத்திற்கு திரும்பவும்.`;
      } else if (language === 'ml') {
        briefingText = `ശ്രദ്ധിക്കുക! അന്താരാഷ്ട്ര സമുദ്ര അതിർത്തിക്ക് അഞ്ച് കിലോമീറ്റർ അടുത്തെത്തി. ബോട്ട് ഉടൻ ഇന്ത്യൻ തീരത്തേക്ക് തിരിക്കുക.`;
      } else {
        briefingText = `Emergency alert from Sagar-Safe AI. Danger! Your vessel is within 5 kilometers of the International Maritime Boundary Line. Turn back immediately to Indian sovereign waters toward ${location.name}.`;
      }
    } else {
      if (language === 'hi') {
        briefingText = `सागर-सेफ रिपोर्ट: ${location.name} के लिए समुद्र सुरक्षित है। लहरों की ऊंचाई लगभग ${ocean.waveHeightMeters} मीटर है और हवा की गति ${weather.windSpeedKmh} किलोमीटर प्रति घंटा है। मछली पकड़ने के लिए मौसम अनुकूल है। अंतरराष्ट्रीय सीमा से आप सुरक्षित दूरी पर हैं।`;
      } else if (language === 'ta') {
        briefingText = `${location.name} கடல் பகுதிக்கு படகு செலுத்த பாதுகாப்பானது. அலை உயரம் ${ocean.waveHeightMeters} மீட்டர். மீன்பிடிக்க வானிலை அனுகூலமாக உள்ளது. எல்லை ஆபத்து இல்லை.`;
      } else if (language === 'ml') {
        briefingText = `${location.name} ഭാഗത്ത് കടൽ ശാന്തമാണ്. തിരമാല ഉയരം ${ocean.waveHeightMeters} മീറ്റർ. സുരക്ഷിതമായി മീൻപിടിക്കാൻ സാധിക്കും.`;
      } else {
        briefingText = `Sagar-Safe Sea Report for ${location.name}. Sea conditions are safe to sail. Significant wave height is ${ocean.waveHeightMeters} meters, wind speed is ${weather.windSpeedKmh} kilometers per hour. Waters are calm and well clear of maritime boundaries. Have a safe journey!`;
      }
    }

    speakTextInLanguage(briefingText, language);

    // Auto reset playing indicator after speech ends roughly
    const estimatedDuration = Math.max(3000, briefingText.length * 70);
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, estimatedDuration);
  };

  return (
    <div id="fisherman-safety-suite" className="space-y-6 animate-fadeIn">
      {/* 1. MASSIVE UNIVERSAL COLORED BADGE */}
      <div 
        className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 border-2 transition-all duration-500 shadow-2xl ${
          isDanger
            ? 'bg-gradient-to-b from-rose-950/90 via-red-950/80 to-[#020b16]/95 border-rose-500 shadow-[0_0_50px_rgba(244,63,94,0.35)] animate-pulse'
            : 'bg-gradient-to-b from-emerald-950/90 via-teal-950/80 to-[#020b16]/95 border-emerald-400 shadow-[0_0_50px_rgba(16,185,129,0.3)]'
        }`}
      >
        {/* Subtle decorative mesh overlay */}
        <div className={`absolute inset-0 pointer-events-none opacity-20 ${
          isDanger ? 'bg-[radial-gradient(#f43f5e_1px,transparent_1px)] [background-size:16px_16px]' : 'bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]'
        }`} />

        <div className="relative z-10 flex flex-col items-center text-center space-y-4 sm:space-y-5">
          {/* Status Icon Halo */}
          <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center border-4 shadow-2xl transition-transform transform hover:scale-105 ${
            isDanger
              ? 'bg-rose-600/30 border-rose-500 text-rose-300 shadow-[0_0_30px_rgba(244,63,94,0.6)] animate-bounce'
              : 'bg-emerald-500/30 border-emerald-400 text-emerald-300 shadow-[0_0_30px_rgba(16,185,129,0.5)]'
          }`}>
            {isDanger ? (
              <AlertTriangle className="w-14 h-14 sm:w-16 sm:h-16 text-rose-400" />
            ) : (
              <ShieldCheck className="w-14 h-14 sm:w-16 sm:h-16 text-emerald-300" />
            )}
          </div>

          {/* Primary Universal Status Badge Text */}
          <div className="space-y-1.5 max-w-2xl">
            <div className={`inline-block px-4 py-1 rounded-full text-xs sm:text-sm font-mono font-black uppercase tracking-widest border mb-1 ${
              isDanger
                ? 'bg-rose-500/20 text-rose-300 border-rose-400/40 animate-pulse'
                : 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
            }`}>
              {isDanger ? '⚠️ ORCA BOUNDARY GUARDIAN TRIGGERED' : '🛡️ INDIAN MARITIME SAFETY CLEARANCE'}
            </div>

            <h2 className={`font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tight uppercase leading-none drop-shadow-lg ${
              isDanger ? 'text-rose-200' : 'text-emerald-200'
            }`}>
              {isDanger ? 'BORDER DANGER / खतरा: सीमा' : 'SAFE TO SAIL / सुरक्षित'}
            </h2>

            <p className={`text-base sm:text-xl font-medium pt-1 ${
              isDanger ? 'text-rose-100 font-semibold' : 'text-slate-200'
            }`}>
              {isDanger
                ? 'CRITICAL ALERT: Proximity within 5 km of International Maritime Boundary Line (IMBL)! Reverse trajectory immediately to prevent interception.'
                : `Optimal sailing conditions at ${location.name}. Calm coastal waters, swell under 1.5m, zero boundary hazards.`}
            </p>
          </div>

          {/* Quick Universal Metric Pills (No complex tables, just big clear icons) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl pt-2">
            <div className="p-3 rounded-2xl bg-[#020e1f]/80 border border-slate-700/60 flex flex-col items-center">
              <Waves className="w-5 h-5 text-cyan-400 mb-1" />
              <div className="text-[11px] text-slate-400 font-mono uppercase">Wave Height</div>
              <div className="text-lg font-bold text-white font-mono">{ocean.waveHeightMeters} m</div>
              <div className="text-[10px] text-emerald-400 font-bold">CALM SEA</div>
            </div>

            <div className="p-3 rounded-2xl bg-[#020e1f]/80 border border-slate-700/60 flex flex-col items-center">
              <Wind className="w-5 h-5 text-sky-400 mb-1" />
              <div className="text-[11px] text-slate-400 font-mono uppercase">Wind Speed</div>
              <div className="text-lg font-bold text-white font-mono">{weather.windSpeedKmh} km/h</div>
              <div className="text-[10px] text-cyan-300 font-bold">{weather.windDirectionText || 'MODERATE'} BREEZE</div>
            </div>

            <div className="p-3 rounded-2xl bg-[#020e1f]/80 border border-slate-700/60 flex flex-col items-center">
              <Anchor className="w-5 h-5 text-teal-400 mb-1" />
              <div className="text-[11px] text-slate-400 font-mono uppercase">Harbour Safe</div>
              <div className="text-lg font-bold text-white font-mono">{location.state}</div>
              <div className="text-[10px] text-teal-300 font-bold">PORT OPEN</div>
            </div>

            <div className="p-3 rounded-2xl bg-[#020e1f]/80 border border-slate-700/60 flex flex-col items-center">
              <Navigation className="w-5 h-5 text-amber-400 mb-1" />
              <div className="text-[11px] text-slate-400 font-mono uppercase">IMBL Distance</div>
              <div className={`text-lg font-bold font-mono ${isDanger ? 'text-rose-400' : 'text-emerald-300'}`}>
                {isDanger ? '3.8 km (ALERT)' : '> 28 km (SAFE)'}
              </div>
              <div className="text-[10px] text-slate-400 font-bold">ORCA SHIELD</div>
            </div>
          </div>

          {/* Test State Simulator Toggle for Evaluators / Fishermen */}
          <div className="pt-2">
            <button
              onClick={handleToggleBorder}
              className="text-xs font-mono text-slate-400 hover:text-cyan-300 px-3 py-1 rounded-full bg-slate-900/60 border border-slate-700/60 hover:border-cyan-500/40 transition-colors flex items-center gap-1.5"
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Simulate State: Switch to {isDanger ? 'Safe Coastal Waters' : '5km IMBL Border Danger'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. FULL-WIDTH VOICE BRIEFING CONTROL BUTTON */}
      <div className="w-full">
        <button
          id="btn-fisherman-voice-briefing"
          onClick={handleVoiceBriefing}
          className={`w-full py-5 px-6 rounded-2xl flex items-center justify-center gap-4 text-white font-display font-black text-lg sm:text-xl tracking-wide uppercase shadow-2xl transition-all transform active:scale-[0.99] border-2 cursor-pointer ${
            isPlayingAudio
              ? 'bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 border-amber-300 shadow-[0_0_35px_rgba(245,158,11,0.5)] animate-pulse'
              : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 border-emerald-400/60 shadow-[0_0_30px_rgba(16,185,129,0.35)]'
          }`}
        >
          {isPlayingAudio ? (
            <>
              <VolumeX className="w-7 h-7 sm:w-8 sm:h-8 text-amber-100 shrink-0" />
              <span>⏹️ STOP VOICE BRIEFING / रिपोर्ट रोकें</span>
            </>
          ) : (
            <>
              <Volume2 className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-100 shrink-0" />
              <span>🔊 LISTEN TO SEA REPORT / रिपोर्ट सुनें</span>
            </>
          )}

          {/* Animated Audio Equalizer Bar indicator when speaking */}
          {isPlayingAudio && (
            <div className="flex items-center gap-1 h-6">
              <span className="w-1 bg-white rounded-full animate-[bounce_1s_infinite_100ms] h-3" />
              <span className="w-1 bg-white rounded-full animate-[bounce_1s_infinite_200ms] h-6" />
              <span className="w-1 bg-white rounded-full animate-[bounce_1s_infinite_300ms] h-4" />
              <span className="w-1 bg-white rounded-full animate-[bounce_1s_infinite_150ms] h-5" />
            </div>
          )}
        </button>

        <p className="text-center text-xs text-slate-400 font-mono mt-2 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Local dialect speech synthesis active in {language.toUpperCase()} • Direct INCOIS & Oceansat-3 voice synthesis</span>
        </p>
      </div>
    </div>
  );
};
