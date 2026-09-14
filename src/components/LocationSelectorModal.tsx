import React, { useState } from 'react';
import { 
  MapPin, 
  Search, 
  Navigation, 
  X, 
  Check, 
  Anchor, 
  Building2, 
  Compass, 
  Waves,
  Loader2
} from 'lucide-react';
import { MarineLocation } from '../types/marine';
import { LOCATIONS_DB } from '../data/marineData';
import { ALL_INDIAN_PORTS } from '../data/indianPortsData';
import { useLanguage } from '../context/LanguageContext';

interface LocationSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLocation: MarineLocation;
  onSelectLocation: (location: MarineLocation) => void;
}

export const LocationSelectorModal: React.FC<LocationSelectorModalProps> = ({
  isOpen,
  onClose,
  selectedLocation,
  onSelectLocation
}) => {
  const { pageI18n, t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  if (!isOpen) return null;

  // Handle GPS Auto-detect
  const handleDetectGPS = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsLocating(false);
          const { latitude, longitude } = position.coords;
          
          // Check closest known location or create dynamic coastal/inland location
          // Approximate distance to coast
          const isNearCoast = longitude < 75.5 || (latitude < 13.5 && longitude < 80.5);

          const gpsLoc: MarineLocation = {
            id: `gps-${Date.now()}`,
            name: 'My GPS Location',
            state: 'Detected Coordinates',
            country: 'India',
            lat: latitude,
            lng: longitude,
            isCoastal: isNearCoast,
            type: isNearCoast ? 'Fishing Harbour' : 'Inland City',
            distanceFromCoastKm: isNearCoast ? 2 : 250,
            nearestHarbour: isNearCoast ? 'Nearest Coastal Sector' : undefined
          };

          onSelectLocation(gpsLoc);
          onClose();
        },
        (error) => {
          setIsLocating(false);
          // Fallback to default Mangaluru on error/permission denied
          const defaultLoc = LOCATIONS_DB[0];
          onSelectLocation(defaultLoc);
          onClose();
        },
        { timeout: 8000 }
      );
    } else {
      setIsLocating(false);
    }
  };

  // Combine both catalogues, de-duplicating by id
  const allLocations: MarineLocation[] = [
    ...LOCATIONS_DB,
    ...ALL_INDIAN_PORTS.filter(p => !LOCATIONS_DB.some(l => l.id === p.id))
  ];

  const filtered = allLocations.filter(loc => 
    loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loc.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ('portCode' in loc && (loc as any).portCode?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
      />

      <div className="relative w-full max-w-xl ocean-glass rounded-3xl p-6 border border-cyan-400/30 shadow-2xl z-10 animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-white uppercase">
                {pageI18n.selectPortOrLocation}
              </h2>
              <p className="text-xs text-slate-400">
                {pageI18n.portsSubtitle || 'Choose a coastal landing center, major harbour, or inland region'}
              </p>
            </div>
          </div>

          <button
            id="btn-close-location-modal"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* GPS Quick Button */}
        <button
          id="btn-gps-detect-location"
          onClick={handleDetectGPS}
          disabled={isLocating}
          className="w-full mb-4 py-2.5 px-4 rounded-xl bg-sky-950/60 hover:bg-sky-900/80 border border-cyan-400/30 text-cyan-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-inner"
        >
          {isLocating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
              <span>Detecting Vessel / Device GPS Position...</span>
            </>
          ) : (
            <>
              <Navigation className="w-4 h-4 text-cyan-400" />
              <span>Use Current Device GPS Location</span>
            </>
          )}
        </button>

        {/* Search Field */}
        <div className="relative mb-5">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="location-search-input-modal"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={pageI18n.searchLocations}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-sky-950/80 border border-sky-400/25 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Location List with Capability Tags */}
        <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
          {filtered.map((loc) => {
            const isSelected = loc.id === selectedLocation.id;

            return (
              <div
                key={loc.id}
                onClick={() => {
                  onSelectLocation(loc);
                  onClose();
                }}
                className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                  isSelected
                    ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-md'
                    : 'bg-white/5 border-white/5 text-slate-200 hover:bg-white/10 hover:border-cyan-400/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    loc.isCoastal ? 'bg-cyan-500/20 text-cyan-300' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {loc.isCoastal ? <Anchor className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">{loc.name}</span>
                      <span className="text-[11px] text-slate-400">({loc.state})</span>
                    </div>

                    <div className="text-[11px] mt-0.5 font-mono">
                      {loc.isCoastal ? (
                        <span className="text-emerald-400">✓ Marine analysis available</span>
                      ) : (
                        <span className="text-amber-400">— Marine fishing not applicable</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-white/5">
                    {loc.type}
                  </span>
                  {isSelected && <Check className="w-4 h-4 text-cyan-400" />}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
