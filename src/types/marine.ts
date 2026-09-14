export type SafetyLevel = 'GREEN' | 'YELLOW' | 'RED' | 'UNKNOWN';
export type FishingPotential = 'HIGH' | 'MODERATE' | 'LOW' | 'NONE' | 'NOT_APPLICABLE';
export type LocationType = 
  | 'Major Port' 
  | 'Non-Major Port'
  | 'Port' 
  | 'Commercial Port' 
  | 'Fishing Harbour' 
  | 'Fish Landing Centre'
  | 'Landing Centre' 
  | 'Oil & LNG Terminal'
  | 'Oil/LNG Terminal'
  | 'Container Port/Terminal'
  | 'Intermediate Port'
  | 'Coastal Town' 
  | 'Marine Region' 
  | 'Inland City';

export type FacilityCategory =
  | 'Major Port'
  | 'Non-Major Port'
  | 'Commercial Port'
  | 'Fishing Harbour'
  | 'Fish Landing Centre'
  | 'Container Port/Terminal'
  | 'Oil/LNG Terminal'
  | string;

export interface MarineLocation {
  id: string;
  name: string;
  state: string;
  country: string;
  lat: number;
  lng: number;
  isCoastal: boolean;
  type: LocationType;
  distanceFromCoastKm: number;
  primarySpecies?: string[];
  depthMeters?: number;
  nearestHarbour?: string;
  authority?: string;
  zone?: 'West Coast' | 'East Coast' | 'Island Territory' | 'Inland';
  portCategory?: 'Major Port' | 'Non-Major Commercial Port' | 'Non-Major Port' | 'Container Terminal' | 'Major Fishing Harbour' | 'Fishing Harbour' | 'Landing Centre' | 'Fish Landing Centre' | 'Island Port' | 'Inland Hub' | 'Oil & LNG Terminal' | 'Oil/LNG Terminal' | 'Naval Facility' | 'Inland Waterway' | string;
  category?: 'Major Port' | 'Non-Major Port' | 'Container Terminal' | 'Fishing Harbour' | 'Fish Landing Centre' | 'Oil & LNG Terminal' | 'Oil/LNG Terminal' | 'Naval Facility' | 'Inland Waterway' | string;
  status?: PortLiveStatus | string;
  latitude?: number;
  longitude?: number;
  cargoTypes?: string[];
  annualTonnage?: string;
  berths?: number;
  portCode?: string;
}

export type FacilityType =
  | 'Major Port'
  | 'Non-Major Port'
  | 'Fishing Harbour'
  | 'Fish Landing Centre'
  | 'Container Port/Terminal'
  | 'Oil/LNG Terminal';

export type DetailedPortType =
  | 'Major Port'
  | 'Non-Major Port'
  | 'Fishing Harbour'
  | 'Fish Landing Centre'
  | 'Container Port/Terminal'
  | 'Oil & LNG Terminal'
  | 'Oil/LNG Terminal'
  | 'Commercial Port'
  | 'Container Port'
  | 'Naval Facility'
  | 'Inland Waterway';

export type PortLiveStatus =
  | 'Operational'
  | 'Active'
  | 'Commissioned'
  | 'High Congestion'
  | 'Advisory Alert'
  | 'Maintenance'
  | 'Normal Traffic';

export interface VesselMovement {
  id: string;
  vesselName: string;
  vesselType: 'Cargo' | 'Tanker' | 'Container' | 'Trawler' | 'LPG/LNG' | 'Naval' | 'Barge';
  flag: string;
  originDestination: string;
  timeFormatted: string;
  dwtTonnage?: number;
  berth?: string;
  status: string;
}

export interface IndianPort extends MarineLocation {
  portCode?: string;
  facilityType: FacilityType;
  facilityCategories: string[];
  officialSource: string;
  operationalStatus: string;
  detailedType: DetailedPortType;
  liveStatus: PortLiveStatus;
  vesselCount: number;
  inPortCount: number;
  anchorageCount: number;
  berthOccupancyPercent: number;
  totalBerths: number;
  maxDraftMeters: number;
  annualTonnage: string;
  authority: string;
  zone: 'West Coast' | 'East Coast' | 'Island Territory' | 'Inland';
  breakwaterLengthMeters?: number;
  channelDepthMeters?: number;
  channelWidthMeters?: number;
  railConnectivity?: string;
  storageCapacity?: string;
  weatherSnapshot: {
    tempC: number;
    condition: string;
    windSpeedKnots: number;
    windDirection: string;
    waveHeightMeters: number;
    visibilityKm: number;
    humidityPercent: number;
    pressureHpa: number;
    tideStatus: 'High Tide' | 'Low Tide' | 'Flooding' | 'Ebbing';
    tideHeightM: number;
    nextTideTime: string;
  };
  cargoBreakdown: Array<{ name: string; percentage: number; mmt: string }>;
  etaArrivals: VesselMovement[];
  etdDepartures: VesselMovement[];
  safetyAdvisory: {
    level: 'GREEN' | 'YELLOW' | 'RED';
    headline: string;
    advisoryText: string;
    issuedBy: string;
    timestamp: string;
  };
}

export interface OceanTelemetry {
  sstCelsius: number; // Sea Surface Temperature
  sstAnomaly?: number;
  waveHeightMeters: number;
  wavePeriodSeconds: number;
  swellHeightMeters: number;
  currentSpeedKnots: number;
  currentDirectionDeg: number;
  currentDirectionText: string;
  chlorophyllMgM3: number;
  salinityPsu: number;
  visibilityKm: number;
  tideStatus: 'High Tide' | 'Low Tide' | 'Incoming' | 'Ebbing';
  tideHeightMeters: number;
  timestamp: string;
  observedAt?: string;
  fetchedAt?: string;
  chlorophyllStatus?: string;
  salinityStatus?: string;
  tideStatusNote?: string;
  source: string;
  isLive: boolean;
  coverage: 'High' | 'Medium' | 'Low';
}

export interface WeatherTelemetry {
  airTempCelsius: number;
  feelsLikeCelsius: number;
  condition: string;
  windSpeedKmh: number;
  windDirectionText: string;
  windGustKmh: number;
  humidityPercent: number;
  pressureHpa: number;
  precipitationProb: number;
  uvIndex: number;
  timestamp: string;
  observedAt?: string;
  fetchedAt?: string;
  source: string;
  isLive: boolean;
}

export interface PFZZone {
  id: string;
  name: string;
  centerLat: number;
  centerLng: number;
  bearingDeg: number;
  distanceKm: number;
  depthRange: string;
  potential: 'HIGH' | 'MODERATE' | 'LOW';
  targetFish: string[];
  chlorophyllIndex: number; // 0-100
  sstGradient: number; // °C/km
  validUntil: string;
  source: 'INCOIS PFZ Mission';
}

export interface MarineAlert {
  id: string;
  severity: 'CRITICAL' | 'CAUTION' | 'INFO';
  title: string;
  summary: string;
  source: 'IMD' | 'INCOIS' | 'Indian Coast Guard' | 'State Fisheries' | string;
  issuedAt: string;
  validUntil: string;
  affectedCoastline: string;
  windWarning?: string;
  seaConditionWarning?: string;
  isLive: boolean;
}

export interface AgentStep {
  id: string;
  agentName: string;
  label: string;
  status: 'idle' | 'running' | 'completed' | 'warning' | 'error';
  detail: string;
  source?: string;
  durationMs?: number;
  logs?: string[];
}

export interface ObservedMetricItem {
  label: string;
  value: string;
  unit: string;
  source: string;
  timestamp: string;
  status: 'OPTIMAL' | 'MODERATE' | 'HAZARDOUS' | 'NORMAL';
}

export interface DerivedAnalysisItem {
  factor: string;
  assessment: string;
  benchmark: string;
  impact: 'POSITIVE' | 'NEUTRAL' | 'WARNING' | 'CRITICAL';
}

export interface ExplainabilityBreakdown {
  observedData: {
    title: string;
    items: ObservedMetricItem[];
    lastUpdated: string;
    stationName: string;
  };
  derivedAnalysis: {
    title: string;
    items: DerivedAnalysisItem[];
    scientificBasis: string;
  };
  aiInterpretation: {
    title: string;
    summary: string;
    reasoningChain: string[];
    governingDirective: string;
  };
  uncertainty: {
    confidenceScore: number; // 0-100%
    confidenceRating: 'HIGH' | 'MEDIUM' | 'LOW';
    dataGaps: string[];
    modelLimitations: string[];
    riskFactors: string[];
  };
}

export interface StructuredMultiAgentExchange {
  oceanAgent: {
    status: 'OPTIMAL' | 'MODERATE' | 'DANGEROUS';
    sst: number;
    waveHeight: number;
    swell: number;
    currentsKnots: number;
    findings: string;
    source: string;
  };
  weatherAgent: {
    status: 'CLEAR' | 'SQUALL_RISK' | 'GALE_WARNING';
    windSpeedKmh: number;
    windGustKmh: number;
    pressureHpa: number;
    findings: string;
    source: string;
  };
  hazardAgent: {
    status: 'ALL_CLEAR' | 'ADVISORY' | 'CRITICAL_HAZARD';
    activeHazards: string[];
    safetyOverrideMandate: boolean;
    findings: string;
  };
  geoAgent: {
    zone: string;
    bathymetryDepth: string;
    distanceToShoreKm: number;
    eezCompliance: string;
    nearestPort: string;
  };
  newsAgent: {
    recentNoticesCount: number;
    keyBulletins: string[];
    maritimeAlertState: string;
  };
  fishingAgent: {
    potential: FishingPotential;
    targetSpecies: string[];
    pfzGradient: string;
    chlorophyllState: string;
    findings: string;
  };
  reasoningAgent: {
    verdict: string;
    safetyOverrideActive: boolean;
    synthesizedScore: number;
    decisionChain: string[];
  };
  explainabilityAgent: ExplainabilityBreakdown;
}

export interface DecisionAnalysis {
  recommendation: 'FAVORABLE' | 'CAUTION' | 'DO_NOT_GO' | 'NOT_APPLICABLE' | 'INSUFFICIENT_DATA';
  safetyStatus: SafetyLevel;
  safetyTitle: string;
  safetySummary: string;
  safetyOverride: boolean; // True if PFZ is HIGH but Safety is RED
  fishingPotential: FishingPotential;
  fishingTitle: string;
  reasons: {
    positive: string[];
    caution: string[];
    critical: string[];
  };
  factorScores: {
    pfzScore: number; // 0-100
    sstScore: number;
    oceanConditionScore: number;
    windScore: number;
    warningSeverityScore: number;
  };
  advisoryMessage: string;
  detailedReport?: string;
  timestamp: string;
  isLive: boolean;
  dataSourceSummary: string;
  suggestedZone?: PFZZone;
  explainability?: ExplainabilityBreakdown;
  agentExchange?: StructuredMultiAgentExchange;
}

export interface AnalysisHistoryItem {
  id: string;
  location: MarineLocation;
  query: string;
  timestamp: string;
  safetyStatus: SafetyLevel;
  fishingPotential: FishingPotential;
  recommendation: 'FAVORABLE' | 'CAUTION' | 'DO_NOT_GO' | 'NOT_APPLICABLE' | 'INSUFFICIENT_DATA';
  sst: string;
  wind: string;
}

export interface DataSourceStatus {
  id: string;
  name: string;
  agency: string;
  purpose: string;
  status: 'LIVE' | 'DEMO' | 'DEGRADED' | 'DEMO / ESTIMATED' | 'REFERENCE PROTOCOL';
  lastUpdated: string;
  coverage: string;
  latencyMs: number;
  description: string;
  parameters: string[];
}

export interface ParameterTelemetryDetail {
  parameter: string;
  value: string;
  unit: string;
  source: string;
  dataTimestamp: string;
  retrievedTimestamp: string;
  status: 'LIVE' | 'DEMO' | 'DEMO / ESTIMATED';
  confidence: string;
  description: string;
  observedAt?: string;
  fetchedAt?: string;
}

export type MarineNewsCategory = 
  | 'Weather & Safety'
  | 'PFZ & Fisheries'
  | 'Ports & Shipping'
  | 'Marine Ecology'
  | 'Policy & Subsidy'
  | 'Ocean Technology';

export interface MarineNewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: MarineNewsCategory;
  source: 'INCOIS' | 'CMFRI' | 'MoPSW' | 'Indian Coast Guard' | 'IMD' | 'ISRO MOSDAC' | 'Marine Fisheries Board' | string;
  author?: string;
  publishedAt: string;
  readTime: string;
  importance: 'BREAKING' | 'HIGH' | 'REGULAR';
  tags: string[];
  coastalZone: 'West Coast' | 'East Coast' | 'All India' | 'Arabian Sea' | 'Bay of Bengal' | 'Andaman & Nicobar' | 'Lakshadweep';
  impactLevel: 'CRITICAL_SAFETY' | 'HIGH_POTENTIAL' | 'PORT_OPERATIONS' | 'POLICY_ADVISORY' | 'ROUTINE';
  keyTakeaway: string;
  relatedLocationId?: string;
  externalUrl?: string;
  isLiveFeed?: boolean;
  feedType?: 'LIVE_RSS' | 'STATIC_ARCHIVE';
}

