import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DataTrustCenter } from '../components/DataTrustCenter';
import { 
  Database, 
  Satellite, 
  Radio, 
  ShieldCheck, 
  Sparkles, 
  Cpu, 
  Binary,
  Layers,
  CheckCircle2,
  Volume2,
  VolumeX
} from 'lucide-react';
import { getPageI18n } from '../data/pageTranslations';
import { speakTextInLanguage, stopSpeaking, getPageSpokenBriefing } from '../utils/speechVoice';

interface SourcesTrustPageProps {
  isDemoMode: boolean;
  language?: string;
}

export const SourcesTrustPage: React.FC<SourcesTrustPageProps> = ({ isDemoMode, language = 'en' }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const pageI18n = getPageI18n(language);

  // Stop speaking when language changes or on unmount
  useEffect(() => {
    stopSpeaking();
    setIsSpeaking(false);
  }, [language]);

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  const handleToggleVoice = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }

    const briefingText = getPageSpokenBriefing('trust', '', language);
    const started = speakTextInLanguage(
      briefingText,
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
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 animate-fadeIn">
      {/* Breadcrumb & Header */}
      <div className="border-b border-cyan-500/20 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-300/80 mb-1">
          <Link to="/" className="hover:text-white transition-colors">SAGAR-SAFE AI</Link>
          <span>/</span>
          <span className="text-cyan-200">{pageI18n.trustTitle}</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight flex items-center gap-2.5">
              <Database className="w-7 h-7 text-cyan-400" />
              {pageI18n.trustTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              {pageI18n.trustSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Audio Voice Broadcast */}
            <button
              id="btn-trust-listen-voice"
              onClick={handleToggleVoice}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-lg transition-all ${
                isSpeaking
                  ? 'bg-cyan-500 text-white animate-pulse border border-cyan-300 ring-2 ring-cyan-400/50'
                  : 'ocean-glass text-cyan-200 border border-cyan-400/30 hover:border-cyan-300 hover:text-white'
              }`}
              title={isSpeaking ? pageI18n.stopVoice : pageI18n.listenBriefing}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
              <span>{isSpeaking ? pageI18n.stopVoice : pageI18n.listenBriefing}</span>
            </button>

            <div className="ocean-glass px-3.5 py-1.5 rounded-xl border border-cyan-400/30 text-xs font-mono text-emerald-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Multi-Source Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Data Trust Center Component */}
      <DataTrustCenter isDemoMode={isDemoMode} />
    </div>
  );
};
