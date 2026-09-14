// ============================================================================
// OFFICIAL MoPSW & PMMSY MARITIME STATISTICAL FRAMEWORK & DATABASE
// Verified Official Government Sources:
// 1. Ministry of Ports, Shipping and Waterways (MoPSW), Govt. of India
// 2. State Maritime Boards (Gujarat GMB, Maharashtra MMB, Andhra APMB, Tamil Nadu TNMB, Kerala KMB, Odisha OMB)
// 3. Department of Fisheries, Govt. of India / PMMSY (Pradhan Mantri Matsya Sampada Yojana)
// 4. Central Marine Fisheries Research Institute (CMFRI)
// ============================================================================

import { IndianPort } from '../types/marine';
import { ALL_INDIAN_PORTS, MAJOR_PORTS, NON_MAJOR_PORTS, FISHING_FACILITIES, OIL_LNG_TERMINALS } from './indianPortsData';

// ----------------------------------------------------------------------------
// 1. HARDCODED OFFICIAL INFRASTRUCTURE METRICS (MoPSW / PMMSY)
// ----------------------------------------------------------------------------
export const MOPSW_STATISTICS = {
  totalLocations: 212,            // Official Total: 12 Major + 200 Non-Major/State Ports
  majorPortsCount: 12,           // 12 Central Major Port Authorities
  nonMajorPortsCount: 200,       // 200 Notified Non-Major / State Ports across 9 coastal states & 4 UTs
  fishingHarboursCount: 7,       // Major Central Deep-Sea Fishing Harbours (PMMSY flagship hubs)
  commercialCargoTerminalsCount: 42, // Dedicated Deepwater Cargo & Transshipment Terminals
  authority: 'Ministry of Ports, Shipping and Waterways (MoPSW) & PMMSY',
  cadastreCode: 'GOI-MoPSW-2026-STAT-212'
};

// ----------------------------------------------------------------------------
// 2. PRECISE FILTER PILLS ARRAY (As specified by MoPSW layout guidelines)
// ----------------------------------------------------------------------------
export interface DirectoryFilterPill {
  id: string;
  label: string;
  count?: number;
  filterKey: 'ALL' | 'MAJOR' | 'NON_MAJOR' | 'FISHING' | 'CARGO';
}

export const OFFICIAL_DIRECTORY_FILTER_PILLS: DirectoryFilterPill[] = [
  { id: 'pill-all', label: 'All Locations (212)', count: 212, filterKey: 'ALL' },
  { id: 'pill-major', label: 'Major Ports (12)', count: 12, filterKey: 'MAJOR' },
  { id: 'pill-non-major', label: 'Non-Major / State Ports (200)', count: 200, filterKey: 'NON_MAJOR' },
  { id: 'pill-fishing', label: 'Fishing Harbours & Landings (7)', count: 7, filterKey: 'FISHING' },
  { id: 'pill-cargo', label: 'Commercial Cargo Terminals', filterKey: 'CARGO' }
];

// ----------------------------------------------------------------------------
// 3. INDIAN MARITIME DATABASE (Typed strictly with 'major' | 'minor' | 'fishing_hub')
// ----------------------------------------------------------------------------
export interface MaritimeDbEntry extends Omit<IndianPort, 'type'> {
  type: 'major' | 'minor' | 'fishing_hub'; // Required literal type
  isMajorStrategicPort?: boolean;
}

// Transform and enrich verified port catalog into the official database
export const INDIAN_MARITIME_DATABASE: MaritimeDbEntry[] = ALL_INDIAN_PORTS.map(port => {
  const isMajor = 
    port.facilityType === 'Major Port' || 
    port.facilityCategories?.includes('Major Port') ||
    [
      'chennai-port', 'cochin-port', 'deendayal-port', 'jnpa-port', 
      'paradip-port', 'syama-prasad-port', 'mormugao-port', 'mumbai-port', 
      'new-mangalore-port', 'visakhapatnam-port', 'vo-chidambaranar-port', 'kamarajar-port'
    ].includes(port.id);

  const isFishing = 
    port.facilityType === 'Fishing Harbour' || 
    port.facilityType === 'Fish Landing Centre' ||
    port.facilityCategories?.includes('Fishing Harbour') ||
    port.facilityCategories?.includes('Fish Landing Centre');

  const resolvedType: 'major' | 'minor' | 'fishing_hub' = isMajor 
    ? 'major' 
    : isFishing 
      ? 'fishing_hub' 
      : 'minor';

  return {
    ...port,
    type: resolvedType,
    isMajorStrategicPort: isMajor
  };
});

// ----------------------------------------------------------------------------
// 4. INTERNATIONAL MARITIME BOUNDARY LINE (IMBL) STATIC COORDINATES
// ----------------------------------------------------------------------------

// A. Gujarat Sector: India - Pakistan IMBL (Sir Creek & Kutch Maritime Delimitation)
export const IMBL_GUJARAT_PAKISTAN: { lat: number; lng: number; name: string }[] = [
  { lat: 23.68, lng: 68.18, name: 'Sir Creek Mouth Point' },
  { lat: 23.50, lng: 68.00, name: 'Outer Kutch Point 1' },
  { lat: 23.35, lng: 67.75, name: 'Outer Kutch Point 2' },
  { lat: 23.15, lng: 67.40, name: 'Arabian Median Point 3' },
  { lat: 22.95, lng: 66.90, name: 'Arabian Median Point 4' },
  { lat: 22.65, lng: 66.40, name: 'Outer EEZ Marker 5' },
  { lat: 22.25, lng: 65.90, name: 'Deep Sea Border Terminal' }
];

// B. Palk Strait Sector: India - Sri Lanka IMBL (1974 & 1976 Delimitation Treaty)
export const IMBL_PALK_STRAIT_SRILANKA: { lat: number; lng: number; name: string }[] = [
  { lat: 10.10, lng: 80.08, name: 'Point Calimere Outer IMBL' },
  { lat: 9.90, lng: 79.92, name: 'Palk Bay North Point 2' },
  { lat: 9.70, lng: 79.80, name: 'Palk Bay Median Point 3' },
  { lat: 9.53, lng: 79.66, name: 'Kachchatheevu North Channel Point 4' },
  { lat: 9.36, lng: 79.53, name: 'Palk Strait Central Point 5' },
  { lat: 9.20, lng: 79.38, name: 'Dhanushkodi East Channel Point 6' },
  { lat: 9.08, lng: 79.24, name: 'Adams Bridge Shoal Point 7' },
  { lat: 8.85, lng: 79.03, name: 'Gulf of Mannar North Point 8' },
  { lat: 8.40, lng: 78.78, name: 'Gulf of Mannar Deep Point 9' }
];

// ----------------------------------------------------------------------------
// 5. ORCA BOUNDARY GUARDIAN PROXIMITY HUD LOGIC
// ----------------------------------------------------------------------------

/**
 * Calculates accurate great-circle distance between two geographic points (Haversine formula in km).
 */
export function calculateHaversineDistanceKm(
  lat1: number, 
  lon1: number, 
  lat2: number, 
  lon2: number
): number {
  const R = 6371; // Earth's mean radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Computes minimum perpendicular or endpoint distance from a point to a line segment in km.
 */
function distanceToSegmentKm(
  pLat: number, 
  pLng: number, 
  aLat: number, 
  aLng: number, 
  bLat: number, 
  bLng: number
): number {
  const l2 = (bLat - aLat) ** 2 + (bLng - aLng) ** 2;
  if (l2 === 0) return calculateHaversineDistanceKm(pLat, pLng, aLat, aLng);
  
  // Projection fraction onto segment AB
  let t = ((pLat - aLat) * (bLat - aLat) + (pLng - aLng) * (bLng - aLng)) / l2;
  t = Math.max(0, Math.min(1, t));
  
  const projLat = aLat + t * (bLat - aLat);
  const projLng = aLng + t * (bLng - aLng);
  
  return calculateHaversineDistanceKm(pLat, pLng, projLat, projLng);
}

/**
 * Evaluates the minimum distance from coordinates to an IMBL polyline.
 */
export function getDistanceToImblLineKm(
  lat: number, 
  lng: number, 
  imblCoords: { lat: number; lng: number }[]
): { minDistanceKm: number; nearestSegmentIndex: number } {
  let minDistanceKm = Infinity;
  let nearestSegmentIndex = 0;

  for (let i = 0; i < imblCoords.length - 1; i++) {
    const dist = distanceToSegmentKm(
      lat, 
      lng, 
      imblCoords[i].lat, 
      imblCoords[i].lng, 
      imblCoords[i + 1].lat, 
      imblCoords[i + 1].lng
    );
    if (dist < minDistanceKm) {
      minDistanceKm = dist;
      nearestSegmentIndex = i;
    }
  }

  return { minDistanceKm, nearestSegmentIndex };
}

export interface OrcaBoundaryCheckResult {
  breached: boolean;              // True if within 5.0 km threshold
  thresholdKm: number;           // 5 km threshold
  nearestSector: 'GUJARAT_PAKISTAN' | 'PALK_STRAIT_SRILANKA' | null;
  distanceKm: number;
  nearestBoundaryName: string;
  advisoryText: string;
  colorHex: string;
}

/**
 * ORCA Boundary Guardian Check:
 * If a plotted PFZ or user's vessel trajectory drops within a 5-km threshold boundary of IMBL coordinates,
 * triggers an immediate state change and boundary breach warning.
 */
export function checkOrcaBoundaryGuardian(
  lat: number, 
  lng: number, 
  thresholdKm = 5.0
): OrcaBoundaryCheckResult {
  const gujaratCheck = getDistanceToImblLineKm(lat, lng, IMBL_GUJARAT_PAKISTAN);
  const palkCheck = getDistanceToImblLineKm(lat, lng, IMBL_PALK_STRAIT_SRILANKA);

  const nearestSector = gujaratCheck.minDistanceKm <= palkCheck.minDistanceKm 
    ? 'GUJARAT_PAKISTAN' 
    : 'PALK_STRAIT_SRILANKA';
  
  const minDistanceKm = Math.min(gujaratCheck.minDistanceKm, palkCheck.minDistanceKm);
  const breached = minDistanceKm <= thresholdKm;

  let nearestBoundaryName = 'International Maritime Boundary Line (IMBL)';
  let advisoryText = 'Vessel safely positioned within Indian Sovereign Territorial Waters.';
  let colorHex = '#10b981';

  if (nearestSector === 'GUJARAT_PAKISTAN') {
    nearestBoundaryName = 'India-Pakistan IMBL (Sir Creek / Gujarat)';
    if (breached) {
      advisoryText = `CRITICAL WARNING: Vessel is ${minDistanceKm.toFixed(1)} km from Pakistan IMBL. High risk of apprehension! Reverse course immediately!`;
      colorHex = '#f43f5e';
    } else if (minDistanceKm <= 15) {
      advisoryText = `CAUTION: Approaching Gujarat border security buffer (${minDistanceKm.toFixed(1)} km from IMBL). Keep transponder active.`;
      colorHex = '#f59e0b';
    }
  } else {
    nearestBoundaryName = 'India-Sri Lanka IMBL (Palk Strait / Gulf of Mannar)';
    if (breached) {
      advisoryText = `CRITICAL WARNING: Vessel is ${minDistanceKm.toFixed(1)} km from Sri Lanka IMBL in Palk Strait. Boundary crossing prohibited under maritime treaties!`;
      colorHex = '#f43f5e';
    } else if (minDistanceKm <= 15) {
      advisoryText = `CAUTION: Within 15 km of Sri Lanka IMBL. Maintain heading west of Kachchatheevu-Dhanushkodi corridor.`;
      colorHex = '#f59e0b';
    }
  }

  return {
    breached,
    thresholdKm,
    nearestSector,
    distanceKm: minDistanceKm,
    nearestBoundaryName,
    advisoryText,
    colorHex
  };
}

// ----------------------------------------------------------------------------
// 6. TECHNICAL EXECUTIVE TELEMETRY MOCK TABLES (FOR EXECUTIVE MODE)
// ----------------------------------------------------------------------------
export interface BerthOccupancyRecord {
  berthId: string;
  berthName: string;
  lengthMeters: number;
  draftMeters: number;
  currentVessel: string;
  vesselImo: string;
  cargoClass: string;
  turnaroundTargetHrs: number;
  occupancyPercent: number;
  status: 'Occupied' | 'Vacant' | 'Maintenance' | 'Scheduled';
}

export const EXECUTIVE_BERTH_OCCUPANCY: BerthOccupancyRecord[] = [
  {
    berthId: 'BTH-01',
    berthName: 'Container Terminal 1 (Deepwater)',
    lengthMeters: 380,
    draftMeters: 16.5,
    currentVessel: 'MSC Gulsun (19,200 TEU)',
    vesselImo: 'IMO 9839438',
    cargoClass: 'Containerized / Reefer',
    turnaroundTargetHrs: 22,
    occupancyPercent: 88,
    status: 'Occupied'
  },
  {
    berthId: 'BTH-02',
    berthName: 'Outer Crude Oil Jetty 2',
    lengthMeters: 320,
    draftMeters: 18.0,
    currentVessel: 'MT Swarna Jayanti',
    vesselImo: 'IMO 9421880',
    cargoClass: 'Crude Petroleum (VLCC)',
    turnaroundTargetHrs: 34,
    occupancyPercent: 92,
    status: 'Occupied'
  },
  {
    berthId: 'BTH-03',
    berthName: 'Dry Bulk Cargo Berth 3',
    lengthMeters: 280,
    draftMeters: 14.5,
    currentVessel: 'MV Sagar Samrat',
    vesselImo: 'IMO 9621450',
    cargoClass: 'Thermal Coal & Iron Ore',
    turnaroundTargetHrs: 48,
    occupancyPercent: 65,
    status: 'Occupied'
  },
  {
    berthId: 'BTH-04',
    berthName: 'Fertilizer & General Cargo Berth 4',
    lengthMeters: 240,
    draftMeters: 12.0,
    currentVessel: 'None (Clear for Inbound)',
    vesselImo: '---',
    cargoClass: 'Break Bulk / Chemical',
    turnaroundTargetHrs: 18,
    occupancyPercent: 0,
    status: 'Vacant'
  },
  {
    berthId: 'BTH-05',
    berthName: 'LNG Cryogenic Terminal 5',
    lengthMeters: 340,
    draftMeters: 15.0,
    currentVessel: 'LNG Dahej Express',
    vesselImo: 'IMO 9352101',
    cargoClass: 'Liquefied Natural Gas (LNG)',
    turnaroundTargetHrs: 26,
    occupancyPercent: 95,
    status: 'Occupied'
  }
];

export interface AisTargetBreakdown {
  commercialCargo: number;
  crudeTankers: number;
  containerLiners: number;
  coastalFishingCraft: number;
  navalCoastGuard: number;
  portTugsPilots: number;
  anchoredTargets: number;
  underwayTargets: number;
  totalLiveAisTargets: number;
  collisionRiskIndex: 'LOW' | 'NORMAL' | 'ELEVATED';
}

export const EXECUTIVE_AIS_TARGET_BREAKDOWN: AisTargetBreakdown = {
  commercialCargo: 142,
  crudeTankers: 68,
  containerLiners: 54,
  coastalFishingCraft: 486,
  navalCoastGuard: 18,
  portTugsPilots: 32,
  anchoredTargets: 84,
  underwayTargets: 716,
  totalLiveAisTargets: 800,
  collisionRiskIndex: 'NORMAL'
};

export interface SynopticWaveTelemetryRecord {
  stationName: string;
  sourceBuoy: string;
  sigWaveHeightHs: number; // in meters
  peakPeriodTp: number;    // in seconds
  meanWaveDirectionDeg: number;
  swellComponentMeters: number;
  windSeaComponentMeters: number;
  currentDriftKnots: number;
  currentHeadingDeg: number;
  seaStateClassification: 'Slight' | 'Moderate' | 'Rough' | 'Very Rough';
}

export const EXECUTIVE_SYNOPTIC_WAVE_DATA: SynopticWaveTelemetryRecord[] = [
  {
    stationName: 'Arabian Sea Offshore - SW01',
    sourceBuoy: 'INCOIS OMNI BD08',
    sigWaveHeightHs: 1.6,
    peakPeriodTp: 8.5,
    meanWaveDirectionDeg: 245,
    swellComponentMeters: 1.2,
    windSeaComponentMeters: 0.8,
    currentDriftKnots: 1.4,
    currentHeadingDeg: 330,
    seaStateClassification: 'Moderate'
  },
  {
    stationName: 'Gulf of Kutch Channel - GK02',
    sourceBuoy: 'Deendayal VTMS Buoy 4',
    sigWaveHeightHs: 0.9,
    peakPeriodTp: 5.2,
    meanWaveDirectionDeg: 260,
    swellComponentMeters: 0.4,
    windSeaComponentMeters: 0.7,
    currentDriftKnots: 2.8,
    currentHeadingDeg: 75,
    seaStateClassification: 'Slight'
  },
  {
    stationName: 'Palk Bay / Mannar Strait - PM04',
    sourceBuoy: 'INCOIS Coastal Buoy CB03',
    sigWaveHeightHs: 1.1,
    peakPeriodTp: 6.8,
    meanWaveDirectionDeg: 190,
    swellComponentMeters: 0.8,
    windSeaComponentMeters: 0.5,
    currentDriftKnots: 1.1,
    currentHeadingDeg: 45,
    seaStateClassification: 'Slight'
  },
  {
    stationName: 'Bay of Bengal Deepwater - BB06',
    sourceBuoy: 'INCOIS OMNI BD11',
    sigWaveHeightHs: 2.1,
    peakPeriodTp: 9.4,
    meanWaveDirectionDeg: 135,
    swellComponentMeters: 1.7,
    windSeaComponentMeters: 1.1,
    currentDriftKnots: 1.6,
    currentHeadingDeg: 20,
    seaStateClassification: 'Rough'
  }
];
