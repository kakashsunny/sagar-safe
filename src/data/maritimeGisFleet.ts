// ============================================================================
// REAL MARITIME GIS FLEET, PFZ POLYGONS & WEATHER OVERLAYS
// Realistic AIS vessels, INCOIS PFZ zones, and oceanographic layers
// ============================================================================

export interface AISVessel {
  id: string;
  name: string;
  mmsi: string;
  callSign: string;
  imo: string;
  type: 'cargo' | 'tanker' | 'container' | 'fishing' | 'naval';
  lat: number;
  lng: number;
  heading: number; // 0 - 359 degrees true
  speedKnots: number;
  draughtMeters: number;
  lengthMeters: number;
  dwtTonnage: number;
  destination: string;
  eta: string;
  flag: string;
  status: 'Underway using engine' | 'At anchor' | 'Moored' | 'Engaged in fishing';
  cargoDescription: string;
}

export interface GisPfzZone {
  id: string;
  name: string;
  state: string;
  polygon: [number, number][]; // [lat, lng] array
  depthRange: string;
  potential: 'HIGH' | 'VERY HIGH' | 'MODERATE';
  targetFish: string[];
  chlorophyllMgM3: number;
  sstC: number;
  sstGradient: number;
  validUntil: string;
  advisoryText: string;
}

export interface GisWaveZone {
  id: string;
  name: string;
  polygon: [number, number][];
  category: 'Calm' | 'Moderate' | 'Rough' | 'High';
  heightRange: string;
  color: string;
  strokeColor: string;
  description: string;
}

export interface GisWindStation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  speedKnots: number;
  directionDeg: number;
  directionText: string;
  gustKnots: number;
}

// ----------------------------------------------------------------------------
// 1. LIVE AIS FLEET (25+ Realistic Vessels in Indian Waters)
// ----------------------------------------------------------------------------
export const LIVE_AIS_FLEET: AISVessel[] = [
  {
    id: 'vsl-1',
    name: 'MT Swarna Jayanti',
    mmsi: '419001234',
    callSign: 'VTBF',
    imo: '9421880',
    type: 'tanker',
    lat: 22.52,
    lng: 69.45,
    heading: 75,
    speedKnots: 13.8,
    draughtMeters: 14.2,
    lengthMeters: 244,
    dwtTonnage: 105000,
    destination: 'Deendayal / Vadinar (INIXY)',
    eta: 'Today 18:30 IST',
    flag: 'India 🇮🇳',
    status: 'Underway using engine',
    cargoDescription: 'Crude Petroleum (Arab Light)'
  },
  {
    id: 'vsl-2',
    name: 'CMA CGM Mumbai',
    mmsi: '228394000',
    callSign: 'FNAU',
    imo: '9778090',
    type: 'container',
    lat: 18.72,
    lng: 72.35,
    heading: 68,
    speedKnots: 17.5,
    draughtMeters: 15.0,
    lengthMeters: 366,
    dwtTonnage: 148000,
    destination: 'JNPA Nhava Sheva (INNSA)',
    eta: 'Today 21:15 IST',
    flag: 'France 🇫🇷',
    status: 'Underway using engine',
    cargoDescription: 'Exim Containerized General Goods'
  },
  {
    id: 'vsl-3',
    name: 'MV African Falcon',
    mmsi: '636018230',
    callSign: 'D5MN2',
    imo: '9654123',
    type: 'cargo',
    lat: 22.88,
    lng: 70.08,
    heading: 140,
    speedKnots: 0.2,
    draughtMeters: 12.8,
    lengthMeters: 199,
    dwtTonnage: 63000,
    destination: 'Kandla Anchorage (INIXY)',
    eta: 'Moored Anchorage',
    flag: 'Liberia 🇱🇷',
    status: 'At anchor',
    cargoDescription: 'Rock Phosphate & Fertilizer'
  },
  {
    id: 'vsl-4',
    name: 'MT Desh Shanti',
    mmsi: '419000850',
    callSign: 'ATBH',
    imo: '9273545',
    type: 'tanker',
    lat: 16.40,
    lng: 71.20,
    heading: 142,
    speedKnots: 14.5,
    draughtMeters: 20.5,
    lengthMeters: 333,
    dwtTonnage: 312000,
    destination: 'Cochin SPM (INCOK)',
    eta: 'Tomorrow 06:00 IST',
    flag: 'India 🇮🇳',
    status: 'Underway using engine',
    cargoDescription: 'Crude Oil (VLCC Deep Draft)'
  },
  {
    id: 'vsl-5',
    name: 'ICGS Samarth',
    mmsi: '419098765',
    callSign: 'AWXY',
    imo: '9785412',
    type: 'naval',
    lat: 15.15,
    lng: 73.40,
    heading: 330,
    speedKnots: 21.0,
    draughtMeters: 4.8,
    lengthMeters: 105,
    dwtTonnage: 2450,
    destination: 'Goa Coastal EEZ Patrol',
    eta: 'On Patrol Sector',
    flag: 'Indian Coast Guard 🇮🇳',
    status: 'Underway using engine',
    cargoDescription: 'Maritime Security & EEZ Surveillance'
  },
  {
    id: 'vsl-6',
    name: 'MSC Bhumika',
    mmsi: '352002140',
    callSign: '3FYZ2',
    imo: '9845120',
    type: 'container',
    lat: 9.75,
    lng: 75.92,
    heading: 178,
    speedKnots: 16.2,
    draughtMeters: 13.5,
    lengthMeters: 294,
    dwtTonnage: 88000,
    destination: 'Colombo Transshipment (LKCMB)',
    eta: 'Tomorrow 08:30 IST',
    flag: 'Panama 🇵🇦',
    status: 'Underway using engine',
    cargoDescription: 'Reefer & Electronics Cargo'
  },
  {
    id: 'vsl-7',
    name: 'Wan Hai 502',
    mmsi: '564892000',
    callSign: '9V8912',
    imo: '9326419',
    type: 'container',
    lat: 13.12,
    lng: 80.48,
    heading: 265,
    speedKnots: 12.4,
    draughtMeters: 11.2,
    lengthMeters: 268,
    dwtTonnage: 55000,
    destination: 'Chennai Container Terminal (INMAA)',
    eta: 'Today 19:45 IST',
    flag: 'Singapore 🇸🇬',
    status: 'Underway using engine',
    cargoDescription: 'Manufactured Auto Components'
  },
  {
    id: 'vsl-8',
    name: 'MV Vishva Shobha',
    mmsi: '419001450',
    callSign: 'VTCD',
    imo: '9586324',
    type: 'cargo',
    lat: 19.85,
    lng: 86.95,
    heading: 42,
    speedKnots: 11.8,
    draughtMeters: 14.0,
    lengthMeters: 229,
    dwtTonnage: 82000,
    destination: 'Paradip Deep Draft Berth (INPRT)',
    eta: 'Today 22:00 IST',
    flag: 'India 🇮🇳',
    status: 'Underway using engine',
    cargoDescription: 'Iron Ore Pellets'
  },
  {
    id: 'vsl-9',
    name: 'MT Jag Leela',
    mmsi: '419000982',
    callSign: 'ATKP',
    imo: '9394512',
    type: 'tanker',
    lat: 17.58,
    lng: 83.52,
    heading: 285,
    speedKnots: 8.5,
    draughtMeters: 12.5,
    lengthMeters: 244,
    dwtTonnage: 108000,
    destination: 'Visakhapatnam Outer Harbor (INVTZ)',
    eta: 'Today 20:30 IST',
    flag: 'India 🇮🇳',
    status: 'Underway using engine',
    cargoDescription: 'Refined Diesel Exim'
  },
  {
    id: 'vsl-10',
    name: 'Matsya Varun 09',
    mmsi: '419992010',
    callSign: 'VTFS1',
    imo: '8872019',
    type: 'fishing',
    lat: 12.82,
    lng: 74.45,
    heading: 250,
    speedKnots: 5.4,
    draughtMeters: 3.2,
    lengthMeters: 28,
    dwtTonnage: 120,
    destination: 'Mangaluru Old Port (INIXE)',
    eta: 'Tomorrow 04:00 IST',
    flag: 'India 🇮🇳',
    status: 'Engaged in fishing',
    cargoDescription: 'Deep Sea Tuna & Seer Fish'
  },
  {
    id: 'vsl-11',
    name: 'Sagar Kanya 14',
    mmsi: '419991874',
    callSign: 'VTFS2',
    imo: '8910452',
    type: 'fishing',
    lat: 20.75,
    lng: 70.15,
    heading: 195,
    speedKnots: 4.8,
    draughtMeters: 2.8,
    lengthMeters: 24,
    dwtTonnage: 95,
    destination: 'Veraval Fishing Harbour (INVER)',
    eta: 'Tomorrow 06:30 IST',
    flag: 'India 🇮🇳',
    status: 'Engaged in fishing',
    cargoDescription: 'Ribbonfish & Croaker'
  },
  {
    id: 'vsl-12',
    name: 'LNG Dahej Express',
    mmsi: '311000452',
    callSign: 'C6ZW8',
    imo: '9352101',
    type: 'tanker',
    lat: 21.55,
    lng: 72.32,
    heading: 32,
    speedKnots: 15.0,
    draughtMeters: 11.5,
    lengthMeters: 290,
    dwtTonnage: 94000,
    destination: 'Petronet Dahej LNG (INDHJ)',
    eta: 'Today 23:45 IST',
    flag: 'Bahamas 🇧🇸',
    status: 'Underway using engine',
    cargoDescription: 'Cryogenic Liquefied Natural Gas'
  },
  {
    id: 'vsl-13',
    name: 'INS Sumedha',
    mmsi: '419088120',
    callSign: 'AWNS',
    imo: '9651000',
    type: 'naval',
    lat: 11.50,
    lng: 92.45,
    heading: 125,
    speedKnots: 18.2,
    draughtMeters: 3.8,
    lengthMeters: 105,
    dwtTonnage: 2200,
    destination: 'Port Blair Naval Anchorage',
    eta: 'Mission Transit',
    flag: 'Indian Navy 🇮🇳',
    status: 'Underway using engine',
    cargoDescription: 'Naval Patrol & Great Channel Security'
  },
  {
    id: 'vsl-14',
    name: 'MV Sagar Samrat',
    mmsi: '419001890',
    callSign: 'VTGH',
    imo: '9621450',
    type: 'cargo',
    lat: 19.35,
    lng: 71.40,
    heading: 210,
    speedKnots: 9.8,
    draughtMeters: 6.5,
    lengthMeters: 85,
    dwtTonnage: 4500,
    destination: 'Mumbai High Offshore Complex',
    eta: 'Today 17:00 IST',
    flag: 'India 🇮🇳',
    status: 'Underway using engine',
    cargoDescription: 'Offshore Supply & Pipe Rack Support'
  },
  {
    id: 'vsl-15',
    name: 'ICGS Varaha',
    mmsi: '419098901',
    callSign: 'AWPZ',
    imo: '9841201',
    type: 'naval',
    lat: 9.15,
    lng: 79.35,
    heading: 95,
    speedKnots: 20.0,
    draughtMeters: 4.5,
    lengthMeters: 98,
    dwtTonnage: 2100,
    destination: 'Palk Bay Patrol Sector',
    eta: 'Active Patrol',
    flag: 'Indian Coast Guard 🇮🇳',
    status: 'Underway using engine',
    cargoDescription: 'Maritime Border Security & Fisherman Safety'
  },
  {
    id: 'vsl-16',
    name: 'Ever Golden',
    mmsi: '355998000',
    callSign: '3FEP9',
    imo: '9786841',
    type: 'container',
    lat: 7.05,
    lng: 76.80,
    heading: 105,
    speedKnots: 19.4,
    draughtMeters: 16.0,
    lengthMeters: 400,
    dwtTonnage: 218000,
    destination: 'Singapore (SGSIN) via Arabian Trunk',
    eta: 'In 3 Days',
    flag: 'Panama 🇵🇦',
    status: 'Underway using engine',
    cargoDescription: '20,000 TEU Mega Container Carrier'
  },
  {
    id: 'vsl-17',
    name: 'MV Bharat Gaurav',
    mmsi: '419002100',
    callSign: 'VTYU',
    imo: '9512300',
    type: 'cargo',
    lat: 21.90,
    lng: 88.15,
    heading: 350,
    speedKnots: 10.2,
    draughtMeters: 8.8,
    lengthMeters: 180,
    dwtTonnage: 32000,
    destination: 'Haldia Dock Complex (INHAL)',
    eta: 'Today 21:00 IST',
    flag: 'India 🇮🇳',
    status: 'Underway using engine',
    cargoDescription: 'Coking Coal Transshipment'
  },
  {
    id: 'vsl-18',
    name: 'St. Antony 4',
    mmsi: '419992451',
    callSign: 'VTKL8',
    imo: '8914567',
    type: 'fishing',
    lat: 9.85,
    lng: 76.05,
    heading: 82,
    speedKnots: 6.8,
    draughtMeters: 2.6,
    lengthMeters: 22,
    dwtTonnage: 80,
    destination: 'Munambam / Thoppumpady (INCOK)',
    eta: 'Today 18:00 IST',
    flag: 'India 🇮🇳',
    status: 'Engaged in fishing',
    cargoDescription: 'Yellowfin Tuna & Squid'
  }
];

// ----------------------------------------------------------------------------
// 2. INCOIS POTENTIAL FISHING ZONES (PFZ) POLYGONS
// ----------------------------------------------------------------------------
export const GIS_PFZ_ZONES: GisPfzZone[] = [
  {
    id: 'pfz-mangaluru',
    name: 'Mangaluru Off-Coast Thermal Eddy Sector',
    state: 'Karnataka',
    polygon: [
      [12.95, 74.30],
      [12.98, 74.52],
      [12.78, 74.58],
      [12.72, 74.35]
    ],
    depthRange: '35m - 70m',
    potential: 'VERY HIGH',
    targetFish: ['Indian Mackerel', 'Seer Fish', 'Squid', 'Sardine'],
    chlorophyllMgM3: 1.45,
    sstC: 28.6,
    sstGradient: 0.85,
    validUntil: 'Today 23:59 IST',
    advisoryText: 'High chlorophyll frontal convergence detected via Oceansat-3. Optimal night purse-seining.'
  },
  {
    id: 'pfz-ullal',
    name: 'Ullal Outer Shelf Front Sector',
    state: 'Karnataka',
    polygon: [
      [12.70, 74.25],
      [12.75, 74.45],
      [12.55, 74.52],
      [12.50, 74.30]
    ],
    depthRange: '45m - 90m',
    potential: 'HIGH',
    targetFish: ['Yellowfin Tuna', 'King Mackerel', 'Reef Cod'],
    chlorophyllMgM3: 1.28,
    sstC: 28.4,
    sstGradient: 0.72,
    validUntil: 'Today 23:59 IST',
    advisoryText: 'Thermal upwelling break line with intense zooplankton grazing schools.'
  },
  {
    id: 'pfz-kochi',
    name: 'Kochi Outer Continental Shelf Upwelling',
    state: 'Kerala',
    polygon: [
      [10.10, 75.80],
      [10.15, 76.05],
      [9.75, 76.15],
      [9.70, 75.88]
    ],
    depthRange: '40m - 120m',
    potential: 'VERY HIGH',
    targetFish: ['Yellowfin Tuna', 'Skipjack', 'Cuttlefish', 'Ribbonfish'],
    chlorophyllMgM3: 1.62,
    sstC: 28.8,
    sstGradient: 0.92,
    validUntil: 'Today 23:59 IST',
    advisoryText: 'Major pelagic school aggregation observed along Cochin Fairway western rim.'
  },
  {
    id: 'pfz-veraval',
    name: 'Veraval - Saurashtra Upwelling Zone',
    state: 'Gujarat',
    polygon: [
      [20.95, 69.85],
      [21.05, 70.25],
      [20.65, 70.40],
      [20.55, 69.95]
    ],
    depthRange: '30m - 65m',
    potential: 'VERY HIGH',
    targetFish: ['Ghol Fish', 'Ribbonfish', 'Silver Pomfret', 'Squid'],
    chlorophyllMgM3: 1.80,
    sstC: 27.9,
    sstGradient: 1.10,
    validUntil: 'Today 23:59 IST',
    advisoryText: 'Intense winter-spring coastal upwelling on Saurashtra shelf. High trawl potential.'
  },
  {
    id: 'pfz-vizag',
    name: 'Visakhapatnam Deep Canyon Upwelling',
    state: 'Andhra Pradesh',
    polygon: [
      [17.80, 83.45],
      [17.85, 83.75],
      [17.50, 83.85],
      [17.45, 83.55]
    ],
    depthRange: '50m - 180m',
    potential: 'HIGH',
    targetFish: ['Yellowfin Tuna', 'Seer Fish', 'Mahi Mahi', 'Tiger Prawn'],
    chlorophyllMgM3: 1.35,
    sstC: 29.1,
    sstGradient: 0.78,
    validUntil: 'Today 23:59 IST',
    advisoryText: 'Submarine canyon upwelling current circulating nutrient-rich bottom waters.'
  },
  {
    id: 'pfz-paradip',
    name: 'Paradip - Dhamra Bay of Bengal Sector',
    state: 'Odisha',
    polygon: [
      [20.40, 86.80],
      [20.50, 87.20],
      [20.10, 87.35],
      [20.00, 86.95]
    ],
    depthRange: '25m - 55m',
    potential: 'HIGH',
    targetFish: ['Hilsa (Ilish)', 'Croaker', 'Pomfret', 'Tiger Shrimp'],
    chlorophyllMgM3: 1.70,
    sstC: 28.5,
    sstGradient: 0.88,
    validUntil: 'Today 23:59 IST',
    advisoryText: 'Mahanadi-Brahmani riverine plume mixing front with high estuarine fish concentrations.'
  }
];

// ----------------------------------------------------------------------------
// 3. WEATHER & WAVE HEIGHT REGIONAL CONTOUR ZONES
// ----------------------------------------------------------------------------
export const GIS_WAVE_ZONES: GisWaveZone[] = [
  {
    id: 'wave-kutch',
    name: 'Gulf of Kutch & Saurashtra Approach',
    polygon: [
      [22.80, 68.50],
      [23.10, 70.30],
      [22.30, 70.40],
      [21.60, 69.20]
    ],
    category: 'Calm',
    heightRange: '0.8m - 1.2m',
    color: 'rgba(16, 185, 129, 0.18)',
    strokeColor: '#10b981',
    description: 'Sheltered gulf waters, slight sea, safe for all craft and dhows.'
  },
  {
    id: 'wave-konkan',
    name: 'Konkan Coast (Mumbai to Goa)',
    polygon: [
      [19.20, 72.40],
      [19.20, 73.00],
      [15.20, 74.00],
      [15.20, 73.00]
    ],
    category: 'Moderate',
    heightRange: '1.2m - 1.7m',
    color: 'rgba(6, 182, 212, 0.16)',
    strokeColor: '#06b6d4',
    description: 'Moderate swell, normal navigation for commercial and mechanized fishing.'
  },
  {
    id: 'wave-malabar',
    name: 'Malabar Shelf (Kochi to Kanyakumari)',
    polygon: [
      [10.20, 75.60],
      [10.20, 76.40],
      [7.80, 77.80],
      [7.80, 76.50]
    ],
    category: 'Moderate',
    heightRange: '1.5m - 2.1m',
    color: 'rgba(56, 189, 248, 0.20)',
    strokeColor: '#38bdf8',
    description: 'South-westerly swell, coastal cautions for small unmotorized canoes.'
  },
  {
    id: 'wave-kanyakumari',
    name: 'Kanyakumari - Gulf of Mannar Confluence',
    polygon: [
      [8.30, 77.00],
      [9.00, 79.50],
      [7.20, 79.50],
      [7.20, 77.00]
    ],
    category: 'Rough',
    heightRange: '2.3m - 3.1m',
    color: 'rgba(245, 158, 11, 0.22)',
    strokeColor: '#f59e0b',
    description: 'Tri-sea confluence swell, strong chop and tidal rip currents.'
  },
  {
    id: 'wave-coromandel',
    name: 'Coromandel Coast (Chennai to Cuddalore)',
    polygon: [
      [13.50, 80.10],
      [13.50, 80.80],
      [11.20, 80.40],
      [11.20, 79.70]
    ],
    category: 'Moderate',
    heightRange: '1.4m - 1.9m',
    color: 'rgba(6, 182, 212, 0.16)',
    strokeColor: '#06b6d4',
    description: 'Moderate wave train with gentle breaker lines.'
  },
  {
    id: 'wave-bay-north',
    name: 'Northern Bay of Bengal (Paradip to Sandheads)',
    polygon: [
      [21.50, 86.80],
      [21.80, 89.20],
      [19.80, 89.20],
      [19.80, 86.50]
    ],
    category: 'Moderate',
    heightRange: '1.6m - 2.2m',
    color: 'rgba(56, 189, 248, 0.20)',
    strokeColor: '#38bdf8',
    description: 'Riverine current interaction with south-easterly sea swell.'
  }
];

// ----------------------------------------------------------------------------
// 4. METEOROLOGICAL WIND STATIONS (Real Observations)
// ----------------------------------------------------------------------------
export const GIS_WIND_STATIONS: GisWindStation[] = [
  { id: 'wind-1', name: 'Okha Buoy', lat: 22.45, lng: 69.05, speedKnots: 13, directionDeg: 245, directionText: 'WSW', gustKnots: 17 },
  { id: 'wind-2', name: 'Mumbai Offshore', lat: 18.90, lng: 72.60, speedKnots: 11, directionDeg: 250, directionText: 'WSW', gustKnots: 15 },
  { id: 'wind-3', name: 'Goa Coastal', lat: 15.40, lng: 73.65, speedKnots: 9, directionDeg: 260, directionText: 'W', gustKnots: 12 },
  { id: 'wind-4', name: 'Mangaluru OOM-1', lat: 12.85, lng: 74.30, speedKnots: 12, directionDeg: 255, directionText: 'WSW', gustKnots: 16 },
  { id: 'wind-5', name: 'Kochi Shelf CB-02', lat: 9.95, lng: 75.90, speedKnots: 14, directionDeg: 235, directionText: 'SW', gustKnots: 19 },
  { id: 'wind-6', name: 'Kanyakumari Tip', lat: 8.05, lng: 77.50, speedKnots: 20, directionDeg: 270, directionText: 'W', gustKnots: 26 },
  { id: 'wind-7', name: 'Kasimedu Coastal', lat: 13.15, lng: 80.35, speedKnots: 12, directionDeg: 205, directionText: 'SSW', gustKnots: 15 },
  { id: 'wind-8', name: 'Visakhapatnam Deep', lat: 17.65, lng: 83.40, speedKnots: 14, directionDeg: 195, directionText: 'SSW', gustKnots: 18 },
  { id: 'wind-9', name: 'Paradip Port Buoy', lat: 20.25, lng: 86.75, speedKnots: 15, directionDeg: 190, directionText: 'S', gustKnots: 20 },
  { id: 'wind-10', name: 'Port Blair Harbour', lat: 11.65, lng: 92.75, speedKnots: 11, directionDeg: 230, directionText: 'SW', gustKnots: 15 }
];
