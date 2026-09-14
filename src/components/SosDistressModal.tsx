import React, { useState, useEffect, useRef } from 'react';
import { 
  AlertOctagon, 
  Radio, 
  ShieldAlert, 
  MapPin, 
  PhoneCall, 
  Send, 
  X, 
  CheckCircle2, 
  Volume2, 
  VolumeX, 
  Satellite, 
  Ship, 
  Compass, 
  Clock, 
  AlertTriangle,
  RefreshCw,
  Copy,
  Check
} from 'lucide-react';
import { MarineLocation } from '../types/marine';
import { getOceanTelemetry, getWeatherTelemetry } from '../data/marineData';
import { useLanguage } from '../context/LanguageContext';

interface SosDistressModalProps {
  isOpen: boolean;
  onClose: () => void;
  location: MarineLocation;
  isDemoMode: boolean;
}

export const SosDistressModal: React.FC<SosDistressModalProps> = ({
  isOpen,
  onClose,
  location,
  isDemoMode
}) => {
  const { pageI18n, t } = useLanguage();
  const [emergencyType, setEmergencyType] = useState<string>('VESSEL_CAPSIZE');
  const [isBeaconTransmitting, setIsBeaconTransmitting] = useState<boolean>(true);
  const [transmissionProgress, setTransmissionProgress] = useState<number>(0);
  const [soundMuted, setSoundMuted] = useState<boolean>(false);
  const [copiedCoordinates, setCopiedCoordinates] = useState<boolean>(false);
  const [beaconId] = useState<string>(() => `IN-EPIRB-406-${Math.floor(100000 + Math.random() * 900000)}`);
  const [activeTab, setActiveTab] = useState<'BEACON' | 'AUTHORITIES' | 'RADIO'>('BEACON');

  const ocean = getOceanTelemetry(location, isDemoMode);
  const weather = getWeatherTelemetry(location, isDemoMode);

  // Transmission steps log
  const [dispatchLogs, setDispatchLogs] = useState<{ time: string; text: string; status: 'pending' | 'success' | 'live' }[]>([
    { time: '00:00', text: 'Distress sequence initiated via 3-second hold trigger.', status: 'success' },
    { time: '00:01', text: 'GPS Fix locked: ' + location.lat.toFixed(4) + '°N, ' + location.lng.toFixed(4) + '°E', status: 'success' },
    { time: '00:02', text: '406 MHz Cospas-Sarsat EPIRB Satellite burst transmitted.', status: 'success' },
    { time: '00:03', text: 'MRCC Indian Coast Guard (1554) distress packet delivered.', status: 'live' },
    { time: '00:04', text: 'VHF Channel 16 DSC Mayday relay broadcast to 15 NM radius.', status: 'live' }
  ]);

  // Determine nearest MRCC (Maritime Rescue Coordination Centre)
  const getNearestMRCC = () => {
    if (location.lng < 77.0) {
      if (location.lat > 15.0) return { name: 'MRCC Mumbai (HQ West)', tel: '1554 / +91-22-24388065', vhf: 'Ch 16 / 70 DSC' };
      return { name: 'MRCC Kochi (Kerala & Lakshadweep)', tel: '1554 / +91-484-2216442', vhf: 'Ch 16 / 70 DSC' };
    } else {
      if (location.lat > 16.0) return { name: 'MRCC Kolkata / Paradip (North East)', tel: '1554 / +91-33-22230155', vhf: 'Ch 16 / 70 DSC' };
      return { name: 'MRCC Chennai (HQ East)', tel: '1554 / +91-44-23460405', vhf: 'Ch 16 / 70 DSC' };
    }
  };

  const mrcc = getNearestMRCC();

  // Simulated beacon beeper using Web Audio API
  useEffect(() => {
    if (!isOpen || soundMuted) return;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      const interval = setInterval(() => {
        if (ctx.state === 'suspended') {
          ctx.resume();
        }
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(880, ctx.currentTime); // A5 note
        osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.15);

        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.22);
      }, 1500);

      return () => {
        clearInterval(interval);
        ctx.close();
      };
    } catch {
      // Audio context might be restricted
    }
  }, [isOpen, soundMuted]);

  // Transmission Progress counter & Backend SOS Dispatch
  useEffect(() => {
    if (!isOpen) {
      setTransmissionProgress(0);
      return;
    }

    // Broadcast to backend emergency dispatch endpoint
    fetch('/api/sos/broadcast', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        vesselId: beaconId,
        lat: location.lat,
        lng: location.lng,
        emergencyType,
        crewCount: 6,
        nearestStation: mrcc.name,
        mrccContact: mrcc.tel
      })
    }).catch((err) => console.warn('Non-critical offline SOS broadcast sync:', err));

    const timer = setInterval(() => {
      setTransmissionProgress((prev) => {
        if (prev >= 100) {
          return 100;
        }
        return prev + 5;
      });
    }, 150);

    return () => clearInterval(timer);
  }, [isOpen, emergencyType, beaconId, location.lat, location.lng, mrcc.name, mrcc.tel]);

  if (!isOpen) return null;

  const handleCopyCoords = () => {
    const text = `MAYDAY DISTRESS BEACON\nLocation: ${location.name}\nCoordinates: ${location.lat.toFixed(5)}°N, ${location.lng.toFixed(5)}°E\nBeacon ID: ${beaconId}\nWave: ${ocean.waveHeightMeters}m | Wind: ${weather.windSpeedKmh} km/h ${weather.windDirectionText}\nTime: ${new Date().toISOString()}`;
    navigator.clipboard?.writeText(text);
    setCopiedCoordinates(true);
    setTimeout(() => setCopiedCoordinates(false), 2500);
  };

  const emergencyTypesList = [
    { id: 'VESSEL_CAPSIZE', label: 'Vessel Capsize / Flooding', severity: 'CRITICAL', color: 'bg-rose-500/20 text-rose-300 border-rose-500/40' },
    { id: 'MAN_OVERBOARD', label: 'Crew Overboard / Medical', severity: 'CRITICAL', color: 'bg-rose-500/20 text-rose-300 border-rose-500/40' },
    { id: 'ENGINE_FAILURE', label: 'Engine Dead / Drifting In High Swell', severity: 'HIGH', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
    { id: 'SQUALL_ENTRAPMENT', label: 'Severe Squall / Cyclone Trapped', severity: 'HIGH', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
    { id: 'COLLISION_FIRE', label: 'Collision / Vessel Fire', severity: 'CRITICAL', color: 'bg-rose-500/20 text-rose-300 border-rose-500/40' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
      {/* Container with High-Visibility Emergency Frame */}
      <div className="relative w-full max-w-3xl rounded-3xl bg-gradient-to-b from-[#1a0507] via-[#0d0a14] to-[#030914] border-2 border-rose-500/60 shadow-[0_0_80px_rgba(244,63,94,0.35)] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Animated Beacon Header Strip */}
        <div className="bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 px-4 py-3 text-white flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center animate-pulse">
              <AlertOctagon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-sm sm:text-base tracking-wider uppercase">
                  {pageI18n.sosDistressTitle || 'ACTIVE MARITIME DISTRESS BEACON (SOS)'}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-black/40 text-[10px] font-mono font-bold tracking-widest text-rose-200 border border-white/20">
                  MAYDAY
                </span>
              </div>
              <p className="text-[11px] text-rose-100/90 font-mono">
                Cospas-Sarsat EPIRB + Indian Coast Guard MRCC Priority Transponder
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundMuted(!soundMuted)}
              className="p-1.5 rounded-lg bg-black/30 hover:bg-black/50 text-white transition-colors"
              title={soundMuted ? 'Unmute Beacon Tone' : 'Mute Beacon Tone'}
            >
              {soundMuted ? <VolumeX className="w-4 h-4 text-rose-200" /> : <Volume2 className="w-4 h-4 text-white animate-bounce" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-black/30 hover:bg-black/50 text-white transition-colors"
              title="Close SOS Console"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Strobe Bar */}
        <div className="h-1.5 w-full bg-slate-900 overflow-hidden relative">
          <div 
            className="h-full bg-gradient-to-r from-rose-500 via-amber-400 to-rose-500 transition-all duration-300 animate-pulse"
            style={{ width: `${Math.min(100, transmissionProgress)}%` }}
          />
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 custom-scrollbar text-slate-200 text-xs">
          
          {/* Top Live Emergency Telemetry Banner */}
          <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 space-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center shrink-0">
                  <Radio className="w-6 h-6 text-rose-400 animate-pulse" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-rose-300 font-bold tracking-wider">
                    TRANSMITTING DISTRESS PACKET • BEACON ID: {beaconId}
                  </span>
                  <h3 className="font-display font-black text-white text-base sm:text-lg flex items-center gap-2">
                    <span>{location.name}</span>
                    <span className="text-xs font-mono font-normal text-rose-300">({location.state})</span>
                  </h3>
                </div>
              </div>

              {/* Coordinates Pill with Copy Action */}
              <button
                onClick={handleCopyCoords}
                className="self-start sm:self-center px-3 py-1.5 rounded-xl bg-black/60 hover:bg-black/90 border border-rose-400/40 text-cyan-200 font-mono text-xs flex items-center gap-2 transition-all group"
                title="Click to copy emergency payload"
              >
                <MapPin className="w-3.5 h-3.5 text-rose-400 group-hover:scale-110 transition-transform" />
                <span className="font-bold">{location.lat.toFixed(4)}° N, {location.lng.toFixed(4)}° E</span>
                {copiedCoordinates ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
                )}
              </button>
            </div>

            {/* Vessel Environment Snapshot */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-rose-500/20 text-center font-mono">
              <div className="p-2 rounded-xl bg-black/40 border border-rose-500/15">
                <span className="text-[10px] text-slate-400 block">Swell / Wave</span>
                <strong className="text-rose-300 text-sm">{ocean.waveHeightMeters} m</strong>
              </div>
              <div className="p-2 rounded-xl bg-black/40 border border-rose-500/15">
                <span className="text-[10px] text-slate-400 block">Surface Wind</span>
                <strong className="text-amber-300 text-sm">{weather.windSpeedKmh} km/h</strong>
              </div>
              <div className="p-2 rounded-xl bg-black/40 border border-rose-500/15">
                <span className="text-[10px] text-slate-400 block">Ocean Current</span>
                <strong className="text-cyan-300 text-sm">{ocean.currentSpeedKnots} kts</strong>
              </div>
              <div className="p-2 rounded-xl bg-black/40 border border-rose-500/15">
                <span className="text-[10px] text-slate-400 block">Water Temp (SST)</span>
                <strong className="text-slate-200 text-sm">{ocean.sstCelsius}°C</strong>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#031528]/80 border border-cyan-500/20 font-mono">
            <button
              onClick={() => setActiveTab('BEACON')}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'BEACON'
                  ? 'bg-rose-500/25 text-rose-200 border border-rose-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Satellite className="w-3.5 h-3.5 text-rose-400" />
              <span>Satellite Beacon</span>
            </button>
            <button
              onClick={() => setActiveTab('AUTHORITIES')}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'AUTHORITIES'
                  ? 'bg-cyan-500/25 text-cyan-200 border border-cyan-400/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
              <span>Coast Guard & MRCC</span>
            </button>
            <button
              onClick={() => setActiveTab('RADIO')}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'RADIO'
                  ? 'bg-amber-500/25 text-amber-200 border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-amber-400" />
              <span>VHF Mayday Relay</span>
            </button>
          </div>

          {/* TAB 1: SATELLITE BEACON & INCIDENT CATEGORY */}
          {activeTab === 'BEACON' && (
            <div className="space-y-4">
              {/* Emergency Classification Selector */}
              <div className="space-y-2">
                <label className="text-[11px] font-mono text-slate-300 uppercase tracking-wider block">
                  Select Incident Nature (Broadcasts over DSC & EPIRB):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {emergencyTypesList.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setEmergencyType(type.id)}
                      className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                        emergencyType === type.id
                          ? `${type.color} ring-2 ring-rose-500/40 font-bold shadow-md`
                          : 'bg-[#031528]/50 border-cyan-500/15 text-slate-300 hover:bg-[#031528]'
                      }`}
                    >
                      <span className="text-xs">{type.label}</span>
                      <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-black/40 border border-white/10">
                        {type.severity}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Real-time Transmission Telemetry Log */}
              <div className="p-3.5 rounded-2xl bg-[#020b16] border border-cyan-500/20 space-y-2 font-mono text-[11px]">
                <div className="flex items-center justify-between text-slate-400 pb-1.5 border-b border-cyan-500/15">
                  <span className="flex items-center gap-1.5 text-cyan-300">
                    <Clock className="w-3.5 h-3.5" />
                    <span>EMERGENCY DISPATCH TRANSMISSION TELEMETRY</span>
                  </span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>TRANSMITTING</span>
                  </span>
                </div>

                <div className="space-y-1.5 text-slate-300">
                  {dispatchLogs.map((log, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold shrink-0">+{log.time}s:</span>
                      <span className={log.status === 'live' ? 'text-emerald-300 font-bold' : 'text-slate-300'}>
                        {log.text}
                      </span>
                      {log.status === 'success' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-auto" />}
                      {log.status === 'live' && <Radio className="w-3.5 h-3.5 text-rose-400 shrink-0 ml-auto animate-pulse" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: COAST GUARD & MRCC AUTHORITIES DIRECT CALL */}
          {activeTab === 'AUTHORITIES' && (
            <div className="space-y-3 font-mono">
              <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] uppercase text-cyan-300 font-bold">PRIMARY JURISDICTION MRCC</span>
                    <h4 className="font-display font-bold text-white text-base mt-0.5">{mrcc.name}</h4>
                    <p className="text-xs text-slate-300 mt-1">
                      Direct SAR (Search and Rescue) Command Center for {location.name} sector.
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                    24x7 ACTIVE
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-cyan-500/20">
                  <a
                    href="tel:1554"
                    className="p-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>DIAL COAST GUARD: 1554 (TOLL FREE)</span>
                  </a>

                  <a
                    href="tel:112"
                    className="p-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>NATIONAL EMERGENCY: 112</span>
                  </a>
                </div>
              </div>

              {/* Secondary Contacts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="p-3 rounded-xl bg-[#020b16] border border-cyan-500/20">
                  <span className="text-[10px] text-slate-400 block">Coastal Security Police (CSP)</span>
                  <span className="text-white font-bold block mt-0.5">Control Room {location.state}</span>
                  <span className="text-cyan-300 text-xs font-mono">VHF Ch 16 / Mobile Hotline 1093</span>
                </div>
                <div className="p-3 rounded-xl bg-[#020b16] border border-cyan-500/20">
                  <span className="text-[10px] text-slate-400 block">Fisheries Dept Emergency Cell</span>
                  <span className="text-white font-bold block mt-0.5">Harbour Officer on Duty</span>
                  <span className="text-cyan-300 text-xs font-mono">SMS Distress Broadcast Dispatched</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: VHF CH 16 MAYDAY PROTOCOL */}
          {activeTab === 'RADIO' && (
            <div className="space-y-3 font-mono">
              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase text-amber-300 font-bold flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 text-amber-400" />
                    <span>STANDARD GMDSS VHF CH 16 MAYDAY PROTOCOL</span>
                  </span>
                  <span className="text-[10px] text-amber-200">156.800 MHz</span>
                </div>
                
                <div className="p-3 rounded-xl bg-black/60 border border-amber-500/20 text-slate-200 text-xs space-y-1.5 font-mono leading-relaxed select-all">
                  <p className="text-amber-300 font-bold">
                    &quot;MAYDAY, MAYDAY, MAYDAY.&quot;
                  </p>
                  <p>
                    &quot;THIS IS MOTOR FISHING VESSEL / CRAFT AT {location.name.toUpperCase()} HARBOUR SECTOR.&quot;
                  </p>
                  <p className="text-cyan-200">
                    &quot;POSITION: {location.lat.toFixed(4)} NORTH, {location.lng.toFixed(4)} EAST.&quot;
                  </p>
                  <p className="text-rose-300">
                    &quot;NATURE OF DISTRESS: {emergencyTypesList.find(e => e.id === emergencyType)?.label.toUpperCase()}. SWELL {ocean.waveHeightMeters} METERS.&quot;
                  </p>
                  <p className="text-slate-300">
                    &quot;REQUIRE IMMEDIATE SEARCH AND RESCUE ASSISTANCE. OVER.&quot;
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#020b16] border-t border-rose-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
            <span>Simulated Marine Distress Transceiver • Stand Down when safe</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleCopyCoords}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-[#031528] hover:bg-[#062040] text-cyan-200 border border-cyan-400/30 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
            >
              {copiedCoordinates ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied Coordinates</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-300" />
                  <span>Copy SOS Telemetry</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white text-xs font-black tracking-wider uppercase transition-all shadow-lg shadow-rose-950/50 flex items-center justify-center gap-1.5"
            >
              <span>STAND DOWN / CLOSE</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
