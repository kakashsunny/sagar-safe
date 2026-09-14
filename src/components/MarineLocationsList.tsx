import React, { useState } from 'react';
import { 
  Anchor, 
  Fish, 
  Ship, 
  MapPin, 
  Waves, 
  Search, 
  Check, 
  ArrowRight,
  Compass,
  Container,
  Navigation
} from 'lucide-react';
import { MarineLocation } from '../types/marine';
import { LOCATIONS_DB } from '../data/marineData';

interface MarineLocationsListProps {
  selectedLocation: MarineLocation;
  onSelectLocation: (loc: MarineLocation) => void;
}

export const MarineLocationsList: React.FC<MarineLocationsListProps> = ({
  selectedLocation,
  onSelectLocation
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [selectedState, setSelectedState] = useState<string>('ALL');
  const [searchFilter, setSearchFilter] = useState<string>('');

  const categories = [
    { label: 'All Ports & Nodes', value: 'ALL', icon: <Compass className="w-3.5 h-3.5" /> },
    { label: 'Major Ports (12)', value: 'Major Port', icon: <Ship className="w-3.5 h-3.5" /> },
    { label: 'Commercial Ports', value: 'Commercial Port', icon: <Container className="w-3.5 h-3.5" /> },
    { label: 'Fishing Harbours', value: 'Fishing Harbour', icon: <Fish className="w-3.5 h-3.5" /> },
    { label: 'Landing Centres', value: 'Landing Centre', icon: <Anchor className="w-3.5 h-3.5" /> },
    { label: 'Intermediate Ports', value: 'Intermediate Port', icon: <Waves className="w-3.5 h-3.5" /> },
  ];

  const states = [
    'ALL',
    'Gujarat',
    'Maharashtra',
    'Goa',
    'Karnataka',
    'Kerala',
    'Tamil Nadu',
    'Andhra Pradesh',
    'Odisha',
    'West Bengal',
    'Puducherry',
    'Andaman & Nicobar',
    'Lakshadweep',
    'Daman and Diu'
  ];

  const filteredLocations = LOCATIONS_DB.filter((loc) => {
    if (!loc.isCoastal) return false;
    const matchesCat = filterCategory === 'ALL' || loc.type === filterCategory || (filterCategory === 'Major Port' && loc.portCategory === 'Major Port');
    const matchesState = selectedState === 'ALL' || loc.state.toLowerCase() === selectedState.toLowerCase();
    const query = searchFilter.toLowerCase();
    const matchesSearch = loc.name.toLowerCase().includes(query) ||
                          loc.state.toLowerCase().includes(query) ||
                          (loc.authority && loc.authority.toLowerCase().includes(query)) ||
                          loc.primarySpecies?.some(s => s.toLowerCase().includes(query)) ||
                          loc.cargoTypes?.some(c => c.toLowerCase().includes(query));
    return matchesCat && matchesState && matchesSearch;
  });

  const getTypeBadge = (loc: MarineLocation) => {
    if (loc.type === 'Major Port' || loc.portCategory === 'Major Port') {
      return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/25 text-amber-300 border border-amber-400/40 shadow-sm flex items-center gap-1">★ Major Port</span>;
    }
    switch (loc.type) {
      case 'Commercial Port':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-blue-500/20 text-blue-300 border border-blue-400/30">Commercial Port</span>;
      case 'Fishing Harbour':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">Fishing Harbour</span>;
      case 'Landing Centre':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Landing Centre</span>;
      case 'Intermediate Port':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-400/30">Intermediate Port</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-slate-500/20 text-slate-300 border border-slate-500/30">Maritime Node</span>;
    }
  };

  return (
    <div id="indian-ports-directory-section" className="ocean-glass-card rounded-3xl p-6 sm:p-8 max-w-7xl mx-auto my-8 border border-sky-400/20 shadow-2xl">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 mb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-[10px] font-mono font-bold tracking-wider uppercase">
              National Maritime Infrastructure
            </span>
            <span className="text-xs text-slate-400 font-mono">
              • {LOCATIONS_DB.filter(l => l.isCoastal).length} Active Ports & Harbours
            </span>
          </div>
          <h2 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 flex items-center justify-center">
              <Ship className="w-4 h-4" />
            </div>
            <span>ALL PORTS & HARBOURS OF INDIA</span>
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Comprehensive directory spanning all 12 Major Indian Ports, non-major commercial cargo terminals, intermediate harbours & INCOIS fishing grids
          </p>
        </div>

        {/* Search Input */}
        <div className="relative min-w-[280px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="ports-directory-search-input"
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search port, authority, species, cargo..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-sky-950/60 border border-sky-400/20 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* Primary Category Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-3 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.value}
            id={`btn-filter-category-${cat.value.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={() => setFilterCategory(cat.value)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all ${
              filterCategory === cat.value
                ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400/40 shadow-sm'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
            }`}
          >
            {cat.icon}
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* State / UT Secondary Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-6 no-scrollbar border-b border-white/5">
        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mr-1 shrink-0">State:</span>
        {states.map((st) => (
          <button
            key={st}
            id={`btn-filter-state-${st.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={() => setSelectedState(st)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition-all ${
              selectedState === st
                ? 'bg-sky-500/30 text-sky-200 border border-sky-400/40'
                : 'bg-white/5 text-slate-400 hover:text-slate-200 border border-white/5'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Grid of Coastal Locations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLocations.map((loc) => {
          const isSelected = loc.id === selectedLocation.id;

          return (
            <div
              key={loc.id}
              id={`card-port-${loc.id}`}
              onClick={() => onSelectLocation(loc)}
              className={`ocean-glass-card ocean-glass-card-hover rounded-2xl p-4 sm:p-5 cursor-pointer border transition-all relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'border-cyan-400 bg-cyan-950/40 shadow-[0_0_25px_rgba(6,182,212,0.25)] ring-1 ring-cyan-400/50'
                  : 'border-sky-400/15 hover:border-sky-400/40'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2.5">
                  <div className="flex items-start gap-2">
                    <MapPin className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-cyan-300 animate-bounce' : 'text-slate-400'}`} />
                    <div>
                      <h3 className="font-display font-bold text-sm text-white leading-tight">{loc.name}</h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[11px] text-slate-300 font-medium">{loc.state}</span>
                        {loc.zone && (
                          <span className="text-[10px] text-slate-400 font-mono">({loc.zone})</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {getTypeBadge(loc)}
                </div>

                {loc.authority && (
                  <p className="text-[10px] text-cyan-200/80 mb-2 font-mono line-clamp-1 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-400/10">
                    🏛 {loc.authority}
                  </p>
                )}

                {/* Key Technical Port Metadata */}
                <div className="grid grid-cols-2 gap-2 mb-3 text-[11px] font-mono bg-white/[0.02] p-2 rounded-xl border border-white/5">
                  {loc.depthMeters && (
                    <div className="text-slate-300">
                      <span className="text-slate-500">Draft Depth:</span> {loc.depthMeters}m
                    </div>
                  )}
                  {loc.annualTonnage && (
                    <div className="text-slate-300">
                      <span className="text-slate-500">Tonnage:</span> {loc.annualTonnage.split(' ')[0]} MT
                    </div>
                  )}
                  {loc.berths && (
                    <div className="text-slate-300">
                      <span className="text-slate-500">Berths:</span> {loc.berths}
                    </div>
                  )}
                  <div className="text-slate-300">
                    <span className="text-slate-500">Coords:</span> {loc.lat.toFixed(2)}°N, {loc.lng.toFixed(2)}°E
                  </div>
                </div>

                {/* Commercial Cargo or Marine Species */}
                {loc.cargoTypes && loc.cargoTypes.length > 0 && (
                  <div className="mb-2.5">
                    <div className="text-[10px] text-amber-300/90 mb-1 flex items-center gap-1 font-mono">
                      <Container className="w-3 h-3 text-amber-400" />
                      Key Exim Cargo:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {loc.cargoTypes.slice(0, 3).map((cg, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-200 border border-amber-500/20">
                          {cg}
                        </span>
                      ))}
                      {loc.cargoTypes.length > 3 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/5 text-slate-400">
                          +{loc.cargoTypes.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {loc.primarySpecies && loc.primarySpecies.length > 0 && (
                  <div className="mb-3">
                    <div className="text-[10px] text-slate-400 mb-1 flex items-center gap-1 font-mono">
                      <Fish className="w-3 h-3 text-cyan-400" />
                      Target Marine Species:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {loc.primarySpecies.slice(0, 3).map((sp, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/5">
                          {sp}
                        </span>
                      ))}
                      {loc.primarySpecies.length > 3 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/5 text-slate-400">
                          +{loc.primarySpecies.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-2 border-t border-white/5 flex items-center justify-between mt-auto">
                <span className="text-[10px] font-mono text-cyan-400/90 flex items-center gap-1">
                  <Navigation className="w-3 h-3" />
                  {isSelected ? 'Currently Selected Port' : 'Set as Mission Target'}
                </span>

                <div className={`p-1.5 rounded-lg transition-all ${
                  isSelected ? 'bg-cyan-400 text-sky-950 font-bold' : 'bg-white/5 text-slate-400 group-hover:bg-cyan-500/20'
                }`}>
                  {isSelected ? <Check className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredLocations.length === 0 && (
        <div className="text-center py-12">
          <Ship className="w-10 h-10 text-slate-500 mx-auto mb-2 opacity-50" />
          <p className="text-sm font-semibold text-slate-300">No ports found matching your criteria</p>
          <p className="text-xs text-slate-500 mt-1">Try adjusting the search query or state filter</p>
        </div>
      )}

    </div>
  );
};
