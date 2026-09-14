import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MarineLocation, IndianPort, FacilityCategory } from '../types/marine';
import { ALL_INDIAN_PORTS, searchPorts } from '../data/indianPortsData';
import { 
  MOPSW_STATISTICS, 
  OFFICIAL_DIRECTORY_FILTER_PILLS, 
  INDIAN_MARITIME_DATABASE, 
  DirectoryFilterPill 
} from '../data/maritimeData';
import { PortDetailsModal } from '../components/PortDetailsModal';
import { 
  Anchor, 
  Search, 
  MapPin, 
  Waves, 
  Fish, 
  Ship, 
  Building2, 
  Gauge, 
  Thermometer, 
  ShieldCheck, 
  Navigation, 
  Box, 
  Eye,
  Info,
  CheckCircle2,
  FileCheck,
  Volume2,
  VolumeX
} from 'lucide-react';
import { getPageI18n } from '../data/pageTranslations';
import { speakTextInLanguage, stopSpeaking, getPageSpokenBriefing } from '../utils/speechVoice';

interface PortsDirectoryPageProps {
  selectedLocation: MarineLocation;
  onSelectLocation: (location: MarineLocation) => void;
  isDemoMode: boolean;
  language?: string;
}

export const PortsDirectoryPage: React.FC<PortsDirectoryPageProps> = ({
  selectedLocation,
  onSelectLocation,
  isDemoMode,
  language = 'en'
}) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState<string>('ALL');
  const [selectedFilterKey, setSelectedFilterKey] = useState<'ALL' | 'MAJOR' | 'NON_MAJOR' | 'FISHING' | 'CARGO'>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [inspectingPort, setInspectingPort] = useState<IndianPort | null>(null);
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

    const briefingText = getPageSpokenBriefing('ports', selectedLocation.name, language);
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

  // Dynamically derive unique States & UTs represented in the verified dataset
  const states = useMemo(() => {
    const s = new Set<string>();
    ALL_INDIAN_PORTS.forEach(l => {
      if (l.state) s.add(l.state);
    });
    return Array.from(s).sort();
  }, []);

  // Filter and search logic based strictly on the MoPSW Framework
  const filteredPorts = useMemo(() => {
    let result = ALL_INDIAN_PORTS;

    // 1. Search Query (Name, State, Code, Coordinates, Authority, Source)
    if (searchQuery.trim()) {
      result = searchPorts(searchQuery, result);
    }

    // 2. Precise Filter Pills (MoPSW Framework)
    if (selectedFilterKey === 'MAJOR') {
      result = result.filter(p => 
        p.facilityType === 'Major Port' || 
        p.facilityCategories?.includes('Major Port') ||
        (p as any).type === 'major'
      );
    } else if (selectedFilterKey === 'NON_MAJOR') {
      result = result.filter(p => 
        p.facilityType === 'Non-Major Port' || 
        p.facilityCategories?.includes('Non-Major Port') ||
        (p as any).type === 'minor'
      );
    } else if (selectedFilterKey === 'FISHING') {
      result = result.filter(p => 
        p.facilityType === 'Fishing Harbour' || 
        p.facilityType === 'Fish Landing Centre' ||
        p.facilityCategories?.includes('Fishing Harbour') ||
        p.facilityCategories?.includes('Fish Landing Centre') ||
        (p as any).type === 'fishing_hub'
      );
    } else if (selectedFilterKey === 'CARGO') {
      result = result.filter(p => 
        p.facilityCategories?.includes('Container Port/Terminal') ||
        p.facilityCategories?.includes('Oil/LNG Terminal') ||
        p.facilityType?.includes('Port') ||
        (p.cargoTypes && p.cargoTypes.length > 0)
      );
    }

    // 3. State Filter
    if (selectedState !== 'ALL') {
      result = result.filter(p => p.state === selectedState);
    }

    // 4. Status Filter
    if (selectedStatus !== 'ALL') {
      result = result.filter(p => 
        (p.operationalStatus && p.operationalStatus === selectedStatus) ||
        p.liveStatus === selectedStatus
      );
    }

    return result;
  }, [searchQuery, selectedFilterKey, selectedState, selectedStatus]);

  const handleViewOnMap = (port: IndianPort) => {
    onSelectLocation(port);
    navigate('/map');
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'Operational':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30';
      case 'High Congestion':
        return 'bg-amber-500/15 text-amber-300 border-amber-400/30';
      case 'Advisory Alert':
        return 'bg-rose-500/15 text-rose-300 border-rose-400/30';
      default:
        return 'bg-cyan-500/15 text-cyan-300 border-cyan-400/30';
    }
  };

  const getCategoryBadgeClass = (cat: string) => {
    switch (cat) {
      case 'Major Port':
        return 'bg-blue-500/20 text-blue-300 border-blue-400/40';
      case 'Non-Major Port':
        return 'bg-teal-500/20 text-teal-300 border-teal-400/40';
      case 'Fishing Harbour':
        return 'bg-amber-500/20 text-amber-300 border-amber-400/40';
      case 'Fish Landing Centre':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40';
      case 'Container Port/Terminal':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40';
      case 'Oil/LNG Terminal':
        return 'bg-orange-500/20 text-orange-300 border-orange-400/40';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-400/40';
    }
  };

  return (
    <div className="max-w-[1720px] mx-auto px-3 sm:px-6 py-6 space-y-6 animate-fadeIn">
      {/* Breadcrumb & Header */}
      <div className="border-b border-cyan-500/20 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-300/80 mb-1">
          <Link to="/" className="hover:text-white transition-colors">SAGAR-SAFE AI</Link>
          <span>/</span>
          <span className="text-cyan-200">{pageI18n.portsTitle}</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight flex items-center gap-2.5">
              <Anchor className="w-7 h-7 text-cyan-400" />
              {pageI18n.portsTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              {pageI18n.portsSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Audio Voice Broadcast */}
            <button
              id="btn-ports-listen-voice"
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

            <div className="ocean-glass px-3.5 py-2 rounded-xl border border-cyan-400/30 text-xs font-mono text-cyan-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{pageI18n.verifiedLocations}: <strong className="text-white">({ALL_INDIAN_PORTS.length})</strong></span>
            </div>

            <Link
              to="/map"
              className="ocean-glass px-3.5 py-2 rounded-xl border border-cyan-400/30 text-xs font-semibold text-cyan-200 hover:text-white hover:border-cyan-300 flex items-center gap-1.5 transition-colors"
            >
              <Navigation className="w-3.5 h-3.5 text-cyan-400" />
              <span>{pageI18n.mapTitle}</span>
            </Link>
          </div>
        </div>

        {/* Official Data Notice */}
        <div className="mt-3 flex items-start gap-2 text-xs text-cyan-300/80 bg-cyan-950/40 border border-cyan-500/20 rounded-xl p-3">
          <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-cyan-200">{pageI18n.officialSource}:</strong> Statistical framework certified under Ministry of Ports, Shipping and Waterways (MoPSW) & PMMSY. Hardcoded registry accounts for 212 total locations (12 Major Central Ports and 200 Notified Non-Major/State Ports).
          </p>
        </div>

        {/* ================================================================ */}
        {/* 1. HARDCODED OFFICIAL STATISTICAL METRICS BAR (MoPSW / PMMSY) */}
        {/* ================================================================ */}
        <div id="mopsw-statistical-bar" className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <div className="ocean-glass p-3.5 rounded-2xl border border-cyan-400/30 bg-[#020e23]/80 shadow-lg">
            <div className="text-[10px] font-mono text-cyan-300/80 uppercase font-semibold">Total Locations</div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-white mt-1">212</div>
            <div className="text-[10px] text-emerald-400 font-mono mt-0.5 font-bold">12 Major + 200 State Ports</div>
          </div>

          <div className="ocean-glass p-3.5 rounded-2xl border border-cyan-400/30 bg-[#020e23]/80 shadow-lg">
            <div className="text-[10px] font-mono text-cyan-300/80 uppercase font-semibold">Major Ports</div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-cyan-300 mt-1">12</div>
            <div className="text-[10px] text-slate-300 font-mono mt-0.5">Central Port Authorities</div>
          </div>

          <div className="ocean-glass p-3.5 rounded-2xl border border-cyan-400/30 bg-[#020e23]/80 shadow-lg">
            <div className="text-[10px] font-mono text-cyan-300/80 uppercase font-semibold">Non-Major / State Ports</div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-teal-300 mt-1">200</div>
            <div className="text-[10px] text-slate-300 font-mono mt-0.5">Maritime Boards (GMB/MMB/APMB)</div>
          </div>

          <div className="ocean-glass p-3.5 rounded-2xl border border-cyan-400/30 bg-[#020e23]/80 shadow-lg">
            <div className="text-[10px] font-mono text-cyan-300/80 uppercase font-semibold">Fishing Harbours & Landings</div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-amber-300 mt-1">7</div>
            <div className="text-[10px] text-slate-300 font-mono mt-0.5">PMMSY Mega Fishing Hubs</div>
          </div>

          <div className="ocean-glass p-3.5 rounded-2xl border border-cyan-400/30 bg-[#020e23]/80 shadow-lg col-span-2 sm:col-span-1">
            <div className="text-[10px] font-mono text-cyan-300/80 uppercase font-semibold">Commercial Cargo Terminals</div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-purple-300 mt-1">42</div>
            <div className="text-[10px] text-slate-300 font-mono mt-0.5">Deep Draft Container / LNG</div>
          </div>
        </div>
      </div>

      {/* Global Search & Dynamic Filters Bar */}
      <div className="ocean-glass rounded-2xl p-4 sm:p-5 border border-cyan-400/20 space-y-4 shadow-xl">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Global Search Input */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={pageI18n.portsSearchPlaceholder}
              className="w-full bg-[#020b16]/80 border border-cyan-500/30 rounded-xl pl-10 pr-8 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* State Dropdown - Dynamically counts represented states/UTs */}
          <div className="sm:col-span-3">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full bg-[#020b16]/80 border border-cyan-500/30 rounded-xl px-3 py-2.5 text-xs text-cyan-200 focus:outline-none focus:border-cyan-400"
            >
              <option value="ALL">{pageI18n.allStates} ({states.length})</option>
              {states.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          {/* Operational Status Dropdown */}
          <div className="sm:col-span-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-[#020b16]/80 border border-cyan-500/30 rounded-xl px-3 py-2.5 text-xs text-cyan-200 focus:outline-none focus:border-cyan-400"
            >
              <option value="ALL">{pageI18n.allStatuses}</option>
              <option value="Operational">Operational</option>
              <option value="High Congestion">High Congestion</option>
              <option value="Advisory Alert">Advisory Alert</option>
            </select>
          </div>
        </div>

        {/* ================================================================ */}
        {/* 2. PRECISE FILTER PILLS ARRAY (MoPSW Layout Guidelines) */}
        {/* ================================================================ */}
        <div id="mopsw-filter-pills" className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {OFFICIAL_DIRECTORY_FILTER_PILLS.map((pill) => {
            const isActive = selectedFilterKey === pill.filterKey;
            return (
              <button
                key={pill.id}
                id={`filter-pill-${pill.id}`}
                onClick={() => setSelectedFilterKey(pill.filterKey)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/30 ring-2 ring-cyan-300'
                    : 'ocean-glass-card text-slate-300 hover:text-white hover:bg-cyan-500/10 border border-cyan-500/20'
                }`}
              >
                <span>{pill.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header: Shows verified location count */}
      <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
        <span>
          Showing <strong className="text-cyan-300">{filteredPorts.length}</strong> catalogued facilities
        </span>
        <span className="hidden sm:inline">
          Official Cadastre: <strong className="text-white">MoPSW 212 Registry</strong> • State: <strong className="text-white">{selectedState}</strong>
        </span>
      </div>

      {/* Empty State */}
      {filteredPorts.length === 0 ? (
        <div className="ocean-glass rounded-2xl p-12 text-center border border-cyan-400/20 space-y-3">
          <Anchor className="w-12 h-12 text-cyan-400/40 mx-auto animate-pulse" />
          <h3 className="text-base font-bold text-white">No verified Indian maritime locations match your query</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Try adjusting your search criteria or reset filters. Search supports port names, official UN/LOCODEs, states, and managing authorities.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedState('ALL'); setSelectedFilterKey('ALL'); setSelectedStatus('ALL'); }}
            className="mt-2 px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-xs font-semibold hover:bg-cyan-500/30"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        /* Verified Port Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPorts.map(port => {
            const isSelected = selectedLocation.id === port.id;
            const primaryType = port.facilityType || port.detailedType;
            const categories = port.facilityCategories && port.facilityCategories.length > 0 
              ? port.facilityCategories 
              : [primaryType];

            return (
              <div
                key={port.id}
                className={`ocean-glass-card rounded-2xl p-5 border transition-all flex flex-col justify-between hover:scale-[1.01] ${
                  isSelected
                    ? 'border-cyan-400/80 bg-cyan-950/40 shadow-xl shadow-cyan-500/10 ring-1 ring-cyan-400/40'
                    : 'border-cyan-400/20 hover:border-cyan-400/50'
                }`}
              >
                <div>
                  {/* Card Header: Port Code (if verified), Primary Type & Status */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {port.portCode ? (
                        <span 
                          className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-200 border border-cyan-400/40"
                          title="Verified UN/LOCODE"
                        >
                          {port.portCode}
                        </span>
                      ) : (
                        <span 
                          className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-400 border border-slate-700/60"
                          title="Fishery / Coastal facility without commercial UN/LOCODE"
                        >
                          No UN/LOCODE
                        </span>
                      )}

                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${getCategoryBadgeClass(primaryType)}`}>
                        {primaryType}
                      </span>
                    </div>

                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border flex items-center gap-1 ${getStatusBadge(port.operationalStatus || port.liveStatus)}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
                      {port.operationalStatus || port.liveStatus}
                    </span>
                  </div>

                  {/* Port Official Name */}
                  <h3 
                    onClick={() => setInspectingPort(port)}
                    className="font-display font-bold text-base text-white hover:text-cyan-300 transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>{port.name}</span>
                  </h3>
                  
                  {/* State & Precise Coordinates */}
                  <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                    <MapPin className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                    <span>{port.state}, India • {port.lat.toFixed(4)}°N, {port.lng.toFixed(4)}°E</span>
                  </p>

                  {/* Official Source Reference */}
                  <div className="mt-2 text-[10px] font-mono bg-[#020b16]/70 px-2.5 py-1.5 rounded-lg border border-cyan-500/15 text-cyan-300/80 flex items-start gap-1.5">
                    <FileCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-1" title={port.officialSource}>
                      Source: {port.officialSource}
                    </span>
                  </div>

                  {/* Multi-category tags if location serves multiple roles */}
                  <div className="mt-2.5 flex flex-wrap gap-1">
                    {categories.map((cat, idx) => (
                      <span 
                        key={idx} 
                        className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${getCategoryBadgeClass(cat)}`}
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  {/* Telemetry Metrics Grid */}
                  <div className="mt-3.5 grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
                    <div className="bg-[#020b16]/70 p-2 rounded-lg border border-cyan-500/10">
                      <span className="text-slate-400 block text-[9px]">ACTIVE CRAFT</span>
                      <span className="font-bold text-cyan-200 text-xs">{port.vesselCount} Ships</span>
                    </div>
                    <div className="bg-[#020b16]/70 p-2 rounded-lg border border-cyan-500/10">
                      <span className="text-slate-400 block text-[9px]">MAX DRAFT</span>
                      <span className="font-bold text-blue-200 text-xs">{port.maxDraftMeters} m</span>
                    </div>
                    <div className="bg-[#020b16]/70 p-2 rounded-lg border border-cyan-500/10">
                      <span className="text-slate-400 block text-[9px]">BERTHS</span>
                      <span className="font-bold text-white text-xs">{port.totalBerths}</span>
                    </div>
                  </div>

                  {/* Berth Occupancy */}
                  <div className="mt-3 bg-[#020b16]/60 p-2.5 rounded-xl border border-cyan-500/10">
                    <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Gauge className="w-3 h-3 text-cyan-400" />
                        Berth Occupancy
                      </span>
                      <span className="font-bold text-emerald-300">{port.berthOccupancyPercent}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-400 h-full rounded-full"
                        style={{ width: `${port.berthOccupancyPercent}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-1">
                      <span>In Port: {port.inPortCount}</span>
                      <span>Anchorage: {port.anchorageCount}</span>
                    </div>
                  </div>

                  {/* Weather Snapshot */}
                  <div className="mt-3 flex items-center justify-between text-[11px] font-mono bg-[#031326]/60 px-3 py-1.5 rounded-lg border border-cyan-500/15">
                    <span className="text-slate-300 flex items-center gap-1">
                      <Thermometer className="w-3 h-3 text-amber-400" />
                      {port.weatherSnapshot.tempC}°C • {port.weatherSnapshot.condition}
                    </span>
                    <span className="text-cyan-300 flex items-center gap-1">
                      <Waves className="w-3 h-3 text-cyan-400" />
                      Wave: {port.weatherSnapshot.waveHeightMeters}m
                    </span>
                  </div>

                  {/* Cargo / Fisheries Chips */}
                  {port.cargoTypes && port.cargoTypes.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {port.cargoTypes.slice(0, 3).map((cg, i) => (
                        <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300/90 border border-cyan-500/20">
                          {cg}
                        </span>
                      ))}
                      {port.cargoTypes.length > 3 && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                          +{port.cargoTypes.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Actions Footer */}
                <div className="mt-4 pt-3 border-t border-cyan-500/15 flex items-center gap-2">
                  <button
                    onClick={() => setInspectingPort(port)}
                    className="flex-1 px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 border border-cyan-400/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{pageI18n.viewPortIntelligence}</span>
                  </button>

                  <button
                    onClick={() => handleViewOnMap(port)}
                    className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-cyan-950 text-slate-300 hover:text-white border border-slate-700 hover:border-cyan-400/40 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    title="View on Interactive Satellite Map"
                  >
                    <Navigation className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{pageI18n.mapTitle}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Comprehensive Port Details Modal Drawer */}
      {inspectingPort && (
        <PortDetailsModal
          port={inspectingPort}
          onClose={() => setInspectingPort(null)}
          onViewOnMap={(p) => {
            onSelectLocation(p);
            navigate('/map');
          }}
        />
      )}
    </div>
  );
};
