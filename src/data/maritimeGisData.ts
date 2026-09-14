// ============================================================================
// MARITIME GIS GEOMETRIES & HYDROGRAPHIC DATA
// Hydrographic bathymetry, EEZ boundaries, shipping lanes, rivers, and cities
// Coordinates projected to Mercator approximation (lng: 66°E - 94°E, lat: 6°N - 26°N)
// ============================================================================

export interface GisCity {
  id: string;
  name: string;
  state: string;
  lat: number;
  lng: number;
  isCoastal: boolean;
  tier: 1 | 2 | 3;
}

export interface GisRiver {
  id: string;
  name: string;
  pathCoords: { lat: number; lng: number }[];
  mouthLat: number;
  mouthLng: number;
}

export interface GisRoadCorridor {
  id: string;
  name: string;
  code: string;
  pathCoords: { lat: number; lng: number }[];
}

export interface ShippingLane {
  id: string;
  name: string;
  type: 'Trunk Route' | 'TSS Scheme' | 'Fairway' | 'Coastal Route';
  pathCoords: { lat: number; lng: number }[];
  bearingText: string;
}

export interface OceanCurrentVector {
  id: string;
  name: string;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  speedKnots: number;
  flowDirection: string;
}

// ----------------------------------------------------------------------------
// 1. MAJOR COASTAL & REGIONAL CITIES
// ----------------------------------------------------------------------------
export const GIS_CITIES: GisCity[] = [
  // West Coast
  { id: 'city-kandla', name: 'Gandhidham / Kandla', state: 'Gujarat', lat: 23.08, lng: 70.13, isCoastal: true, tier: 2 },
  { id: 'city-jamnagar', name: 'Jamnagar', state: 'Gujarat', lat: 22.47, lng: 70.07, isCoastal: true, tier: 2 },
  { id: 'city-porbandar', name: 'Porbandar', state: 'Gujarat', lat: 21.64, lng: 69.60, isCoastal: true, tier: 2 },
  { id: 'city-veraval', name: 'Veraval', state: 'Gujarat', lat: 20.90, lng: 70.36, isCoastal: true, tier: 2 },
  { id: 'city-bhavnagar', name: 'Bhavnagar', state: 'Gujarat', lat: 21.76, lng: 72.15, isCoastal: true, tier: 2 },
  { id: 'city-surat', name: 'Surat', state: 'Gujarat', lat: 21.17, lng: 72.83, isCoastal: true, tier: 1 },
  { id: 'city-mumbai', name: 'Mumbai', state: 'Maharashtra', lat: 18.96, lng: 72.82, isCoastal: true, tier: 1 },
  { id: 'city-ratnagiri', name: 'Ratnagiri', state: 'Maharashtra', lat: 16.99, lng: 73.30, isCoastal: true, tier: 2 },
  { id: 'city-panaji', name: 'Panaji', state: 'Goa', lat: 15.49, lng: 73.82, isCoastal: true, tier: 2 },
  { id: 'city-karwar', name: 'Karwar', state: 'Karnataka', lat: 14.81, lng: 74.13, isCoastal: true, tier: 2 },
  { id: 'city-mangaluru', name: 'Mangaluru', state: 'Karnataka', lat: 12.91, lng: 74.85, isCoastal: true, tier: 1 },
  { id: 'city-kozhikode', name: 'Kozhikode', state: 'Kerala', lat: 11.25, lng: 75.78, isCoastal: true, tier: 2 },
  { id: 'city-kochi', name: 'Kochi', state: 'Kerala', lat: 9.93, lng: 76.26, isCoastal: true, tier: 1 },
  { id: 'city-alappuzha', name: 'Alappuzha', state: 'Kerala', lat: 9.49, lng: 76.33, isCoastal: true, tier: 2 },
  { id: 'city-kollam', name: 'Kollam', state: 'Kerala', lat: 8.89, lng: 76.59, isCoastal: true, tier: 2 },
  { id: 'city-tvm', name: 'Thiruvananthapuram', state: 'Kerala', lat: 8.52, lng: 76.93, isCoastal: true, tier: 1 },

  // South & East Coast
  { id: 'city-kanyakumari', name: 'Kanniyakumari', state: 'Tamil Nadu', lat: 8.08, lng: 77.54, isCoastal: true, tier: 2 },
  { id: 'city-tuticorin', name: 'Thoothukudi', state: 'Tamil Nadu', lat: 8.76, lng: 78.13, isCoastal: true, tier: 2 },
  { id: 'city-nagapattinam', name: 'Nagapattinam', state: 'Tamil Nadu', lat: 10.76, lng: 79.84, isCoastal: true, tier: 2 },
  { id: 'city-puducherry', name: 'Puducherry', state: 'Puducherry', lat: 11.94, lng: 79.80, isCoastal: true, tier: 2 },
  { id: 'city-chennai', name: 'Chennai', state: 'Tamil Nadu', lat: 13.08, lng: 80.27, isCoastal: true, tier: 1 },
  { id: 'city-nellore', name: 'Nellore', state: 'Andhra Pradesh', lat: 14.44, lng: 79.98, isCoastal: true, tier: 2 },
  { id: 'city-machilipatnam', name: 'Machilipatnam', state: 'Andhra Pradesh', lat: 16.18, lng: 81.13, isCoastal: true, tier: 2 },
  { id: 'city-kakinada', name: 'Kakinada', state: 'Andhra Pradesh', lat: 16.98, lng: 82.24, isCoastal: true, tier: 2 },
  { id: 'city-visakhapatnam', name: 'Visakhapatnam', state: 'Andhra Pradesh', lat: 17.68, lng: 83.21, isCoastal: true, tier: 1 },
  { id: 'city-gopalpur', name: 'Gopalpur / Berhampur', state: 'Odisha', lat: 19.26, lng: 84.90, isCoastal: true, tier: 2 },
  { id: 'city-puri', name: 'Puri', state: 'Odisha', lat: 19.81, lng: 85.83, isCoastal: true, tier: 2 },
  { id: 'city-paradip', name: 'Paradip', state: 'Odisha', lat: 20.31, lng: 86.61, isCoastal: true, tier: 2 },
  { id: 'city-haldia', name: 'Haldia', state: 'West Bengal', lat: 22.06, lng: 88.06, isCoastal: true, tier: 2 },
  { id: 'city-kolkata', name: 'Kolkata', state: 'West Bengal', lat: 22.57, lng: 88.36, isCoastal: false, tier: 1 },
  { id: 'city-portblair', name: 'Port Blair', state: 'Andaman & Nicobar', lat: 11.62, lng: 92.72, isCoastal: true, tier: 2 }
];

// ----------------------------------------------------------------------------
// 2. MAJOR RIVERS WITH COASTAL ESTUARIES & INLAND REACHES
// ----------------------------------------------------------------------------
export const GIS_RIVERS: GisRiver[] = [
  {
    id: 'river-hooghly-ganga',
    name: 'Ganga - Hooghly River (NW-1)',
    mouthLat: 21.65,
    mouthLng: 88.05,
    pathCoords: [
      { lat: 25.30, lng: 83.00 }, // Varanasi
      { lat: 25.25, lng: 87.65 }, // Sahibganj
      { lat: 24.15, lng: 88.25 }, // Farakka
      { lat: 22.57, lng: 88.36 }, // Kolkata
      { lat: 22.06, lng: 88.06 }, // Haldia
      { lat: 21.65, lng: 88.05 }  // Sagar Island / Bay of Bengal
    ]
  },
  {
    id: 'river-brahmaputra',
    name: 'Brahmaputra River (NW-2)',
    mouthLat: 22.20,
    mouthLng: 90.60,
    pathCoords: [
      { lat: 26.15, lng: 91.75 }, // Guwahati / Pandu
      { lat: 26.02, lng: 89.98 }, // Dhubri
      { lat: 24.80, lng: 89.65 },
      { lat: 22.50, lng: 90.50 }
    ]
  },
  {
    id: 'river-mahanadi',
    name: 'Mahanadi River',
    mouthLat: 20.29,
    mouthLng: 86.71,
    pathCoords: [
      { lat: 20.85, lng: 84.85 },
      { lat: 20.46, lng: 85.88 }, // Cuttack
      { lat: 20.29, lng: 86.71 }  // Paradip Mouth
    ]
  },
  {
    id: 'river-godavari',
    name: 'Godavari River',
    mouthLat: 16.73,
    mouthLng: 82.35,
    pathCoords: [
      { lat: 18.00, lng: 80.50 },
      { lat: 17.00, lng: 81.78 }, // Rajahmundry
      { lat: 16.73, lng: 82.35 }  // Kakinada - Yanam Mouth
    ]
  },
  {
    id: 'river-krishna',
    name: 'Krishna River',
    mouthLat: 15.78,
    mouthLng: 80.95,
    pathCoords: [
      { lat: 16.50, lng: 80.64 }, // Vijayawada
      { lat: 15.78, lng: 80.95 }  // Hamsaladeevi Mouth
    ]
  },
  {
    id: 'river-narmada',
    name: 'Narmada River',
    mouthLat: 21.65,
    mouthLng: 72.58,
    pathCoords: [
      { lat: 21.85, lng: 73.80 },
      { lat: 21.70, lng: 72.98 }, // Bharuch
      { lat: 21.65, lng: 72.58 }  // Gulf of Khambhat
    ]
  },
  {
    id: 'river-tapi',
    name: 'Tapi River',
    mouthLat: 21.10,
    mouthLng: 72.68,
    pathCoords: [
      { lat: 21.25, lng: 73.80 },
      { lat: 21.17, lng: 72.83 }, // Surat
      { lat: 21.10, lng: 72.68 }  // Hazira Estuary
    ]
  },
  {
    id: 'river-mandovi-zuari',
    name: 'Mandovi & Zuari Estuaries',
    mouthLat: 15.42,
    mouthLng: 73.80,
    pathCoords: [
      { lat: 15.52, lng: 74.05 },
      { lat: 15.49, lng: 73.82 }, // Panaji
      { lat: 15.42, lng: 73.80 }  // Mormugao Bay
    ]
  },
  {
    id: 'river-periyar',
    name: 'Periyar & Vembanad Backwaters',
    mouthLat: 9.97,
    mouthLng: 76.24,
    pathCoords: [
      { lat: 10.15, lng: 76.40 },
      { lat: 10.05, lng: 76.28 },
      { lat: 9.97, lng: 76.24 }   // Cochin Port Channel
    ]
  }
];

// ----------------------------------------------------------------------------
// 3. COASTAL NATIONAL HIGHWAYS & FREIGHT ARTERIES
// ----------------------------------------------------------------------------
export const GIS_ROADS: GisRoadCorridor[] = [
  {
    id: 'road-nh66',
    name: 'NH-66 Western Coastal Corridor',
    code: 'NH-66',
    pathCoords: [
      { lat: 18.96, lng: 72.82 }, // Mumbai / Panvel
      { lat: 16.99, lng: 73.30 }, // Ratnagiri
      { lat: 15.49, lng: 73.82 }, // Goa
      { lat: 14.81, lng: 74.13 }, // Karwar
      { lat: 12.91, lng: 74.85 }, // Mangaluru
      { lat: 11.25, lng: 75.78 }, // Kozhikode
      { lat: 9.93, lng: 76.26 },  // Kochi
      { lat: 8.52, lng: 76.93 },  // Thiruvananthapuram
      { lat: 8.08, lng: 77.54 }   // Kanniyakumari
    ]
  },
  {
    id: 'road-nh16',
    name: 'NH-16 Eastern Coastal Corridor (Golden Quadrilateral)',
    code: 'NH-16',
    pathCoords: [
      { lat: 22.57, lng: 88.36 }, // Kolkata
      { lat: 21.50, lng: 86.90 }, // Balasore
      { lat: 20.31, lng: 86.61 }, // Paradip / Cuttack
      { lat: 19.26, lng: 84.90 }, // Berhampur
      { lat: 17.68, lng: 83.21 }, // Visakhapatnam
      { lat: 16.98, lng: 82.24 }, // Kakinada / Rajahmundry
      { lat: 16.50, lng: 80.64 }, // Vijayawada
      { lat: 14.44, lng: 79.98 }, // Nellore
      { lat: 13.08, lng: 80.27 }  // Chennai
    ]
  }
];

// ----------------------------------------------------------------------------
// 4. SHIPPING LANES & TRAFFIC SEPARATION SCHEMES (TSS)
// ----------------------------------------------------------------------------
export const GIS_SHIPPING_LANES: ShippingLane[] = [
  {
    id: 'tss-kutch',
    name: 'Gulf of Kutch Deep Draft Tanker TSS',
    type: 'TSS Scheme',
    bearingText: '075° / 255° True',
    pathCoords: [
      { lat: 22.45, lng: 68.80 },
      { lat: 22.50, lng: 69.30 },
      { lat: 22.55, lng: 69.80 },
      { lat: 22.75, lng: 70.05 }
    ]
  },
  {
    id: 'tss-mumbai',
    name: 'Mumbai & JNPA Offshore Traffic Separation Scheme',
    type: 'TSS Scheme',
    bearingText: '045° Inbound / 225° Outbound',
    pathCoords: [
      { lat: 18.50, lng: 72.10 },
      { lat: 18.75, lng: 72.50 },
      { lat: 18.90, lng: 72.75 },
      { lat: 18.95, lng: 72.85 }
    ]
  },
  {
    id: 'lane-arabian-trunk',
    name: 'Arabian Sea Main International Shipping Trunk (Suez - Malacca)',
    type: 'Trunk Route',
    bearingText: '118° / 298° Transit',
    pathCoords: [
      { lat: 22.00, lng: 66.50 },
      { lat: 18.20, lng: 69.80 },
      { lat: 14.00, lng: 72.20 },
      { lat: 9.50, lng: 74.80 },
      { lat: 7.20, lng: 77.00 },
      { lat: 5.80, lng: 80.50 }
    ]
  },
  {
    id: 'lane-bay-of-bengal',
    name: 'Bay of Bengal Deep Water Trunk (Sandheads - Malacca)',
    type: 'Trunk Route',
    bearingText: '155° / 335° True',
    pathCoords: [
      { lat: 21.00, lng: 88.20 }, // Sandheads Pilot
      { lat: 17.50, lng: 86.80 },
      { lat: 13.00, lng: 85.50 },
      { lat: 8.50, lng: 87.00 },
      { lat: 6.00, lng: 92.50 }  // Great Channel / Malacca Entry
    ]
  },
  {
    id: 'tss-cochin',
    name: 'Cochin Fairway Inbound/Outbound TSS',
    type: 'TSS Scheme',
    bearingText: '082° Inbound / 262° Outbound',
    pathCoords: [
      { lat: 9.90, lng: 75.80 },
      { lat: 9.95, lng: 76.10 },
      { lat: 9.97, lng: 76.24 }
    ]
  },
  {
    id: 'lane-chennai-portblair',
    name: 'Chennai - Port Blair Island Lifeline Corridor',
    type: 'Trunk Route',
    bearingText: '098° / 278° True',
    pathCoords: [
      { lat: 13.10, lng: 80.35 },
      { lat: 12.80, lng: 84.50 },
      { lat: 12.20, lng: 89.00 },
      { lat: 11.65, lng: 92.70 }
    ]
  },
  {
    id: 'lane-vizag-deepsea',
    name: 'Visakhapatnam Outer Harbor Deep Navigation Fairway',
    type: 'Fairway',
    bearingText: '105° Inbound',
    pathCoords: [
      { lat: 17.60, lng: 83.45 },
      { lat: 17.66, lng: 83.32 },
      { lat: 17.69, lng: 83.29 }
    ]
  }
];

// ----------------------------------------------------------------------------
// 5. OCEAN CURRENT VECTORS (INCOIS Hydrodynamic Model)
// ----------------------------------------------------------------------------
export const GIS_OCEAN_CURRENTS: OceanCurrentVector[] = [
  { id: 'curr-1', name: 'West India Coastal Current (WICC - Northward)', startLat: 10.5, startLng: 74.8, endLat: 13.5, endLng: 73.8, speedKnots: 1.4, flowDirection: 'NNW' },
  { id: 'curr-2', name: 'West India Coastal Current (Kandla Shelf)', startLat: 19.5, startLng: 71.0, endLat: 21.5, endLng: 69.5, speedKnots: 1.1, flowDirection: 'NW' },
  { id: 'curr-3', name: 'East India Coastal Current (EICC - Southward)', startLat: 19.0, startLng: 85.5, endLat: 15.5, endLng: 82.2, speedKnots: 1.8, flowDirection: 'SW' },
  { id: 'curr-4', name: 'East India Coastal Current (Coromandel Flow)', startLat: 15.0, startLng: 81.5, endLat: 11.5, endLng: 80.2, speedKnots: 1.5, flowDirection: 'SSW' },
  { id: 'curr-5', name: 'Equatorial Jet (Arabian Sea to Bay of Bengal)', startLat: 7.5, startLng: 75.0, endLat: 7.0, endLng: 83.0, speedKnots: 2.2, flowDirection: 'ESE' },
  { id: 'curr-6', name: 'Gulf of Mannar Tidal Stream', startLat: 8.4, startLng: 78.4, endLat: 9.1, endLng: 79.2, speedKnots: 1.9, flowDirection: 'NE' }
];

// ----------------------------------------------------------------------------
// 6. INDIAN EEZ BOUNDARY COORDINATES (200 NAUTICAL MILES)
// ----------------------------------------------------------------------------
export const INDIAN_EEZ_POLYGON: { lat: number; lng: number }[] = [
  { lat: 23.50, lng: 67.80 }, // Pakistan Maritime Boundary
  { lat: 21.80, lng: 66.20 },
  { lat: 19.50, lng: 67.50 },
  { lat: 17.20, lng: 68.80 },
  { lat: 14.50, lng: 70.20 },
  { lat: 11.80, lng: 71.50 },
  { lat: 8.80, lng: 73.00 },  // Lakshadweep Outer EEZ
  { lat: 6.80, lng: 76.50 },  // South of Kanyakumari
  { lat: 6.00, lng: 79.00 },  // Indo-Sri Lanka Delimitation Line
  { lat: 9.00, lng: 80.00 },  // Palk Bay
  { lat: 10.50, lng: 83.00 },
  { lat: 12.80, lng: 84.50 },
  { lat: 15.50, lng: 86.00 },
  { lat: 18.20, lng: 88.00 },
  { lat: 20.50, lng: 89.80 }, // Bangladesh Maritime Boundary
  { lat: 21.60, lng: 89.10 }
];

// Andaman & Nicobar EEZ
export const ANDAMAN_EEZ_POLYGON: { lat: number; lng: number }[] = [
  { lat: 14.20, lng: 91.50 },
  { lat: 13.50, lng: 94.50 },
  { lat: 10.00, lng: 94.80 },
  { lat: 6.00, lng: 94.20 },  // Indira Point / Great Nicobar
  { lat: 6.00, lng: 92.00 },
  { lat: 10.00, lng: 91.00 },
  { lat: 14.20, lng: 91.50 }
];

// ----------------------------------------------------------------------------
// 7. BATHYMETRY CONTOURS (0-50m shelf, 50-200m outer shelf, 200-1000m slope)
// ----------------------------------------------------------------------------
export const BATHYMETRY_ZONES = [
  {
    id: 'shelf-0-50',
    name: '0 - 50m Shallow Continental Shelf',
    depthLabel: '< 50m',
    fillColor: 'rgba(6, 78, 119, 0.45)',
    strokeColor: '#0ea5e9',
    description: 'Near-shore coastal zone, trawling grounds & port navigation channels'
  },
  {
    id: 'shelf-50-200',
    name: '50 - 200m Outer Continental Shelf Break',
    depthLabel: '50 - 200m',
    fillColor: 'rgba(4, 47, 86, 0.55)',
    strokeColor: '#0284c7',
    description: 'High biological productivity, upwelling and PFZ pelagic schools'
  },
  {
    id: 'shelf-200-1000',
    name: '200 - 1000m Continental Slope',
    depthLabel: '200 - 1000m',
    fillColor: 'rgba(2, 28, 59, 0.70)',
    strokeColor: '#0369a1',
    description: 'Deep canyon descents, submarine cables and pelagic migratory tracks'
  },
  {
    id: 'shelf-1000-plus',
    name: '1000m+ Abyssal Plain',
    depthLabel: '> 1000m',
    fillColor: 'rgba(2, 16, 36, 0.85)',
    strokeColor: '#075985',
    description: 'Deep ocean basin of Arabian Sea & Bay of Bengal'
  }
];

// ----------------------------------------------------------------------------
// 8. PROFESSIONAL CYCLONE & TROPICAL STORM TRACK (IMD / INCOIS Model)
// ----------------------------------------------------------------------------
export interface CycloneData {
  id: string;
  name: string;
  category: string;
  centerLat: number;
  centerLng: number;
  centralPressureHpa: number;
  maxWindsKnots: number;
  gustKnots: number;
  movementDirection: string;
  movementSpeedKnots: number;
  advisoryLevel: 'WARNING' | 'ALERT' | 'WATCH';
  advisoryText: string;
  forecastTrack: {
    lat: number;
    lng: number;
    timeLabel: string;
    intensity: string;
    windKnots: number;
  }[];
  conePolygon: [number, number][];
  galeRadiusKm: number; // 34 knot
  stormRadiusKm: number; // 50 knot
}

export const GIS_ACTIVE_CYCLONE: CycloneData = {
  id: 'cyclone-bob-03',
  name: 'Cyclonic Storm "SAGAR-VEER" (BOB-03)',
  category: 'Severe Cyclonic Storm',
  centerLat: 15.20,
  centerLng: 86.80,
  centralPressureHpa: 986,
  maxWindsKnots: 55,
  gustKnots: 72,
  movementDirection: 'North-West (315°)',
  movementSpeedKnots: 9,
  advisoryLevel: 'WARNING',
  advisoryText: 'Moving NW towards North Andhra & South Odisha coast. Fishermen advised not to venture into deep sea. Ports hoist Local Cautionary Signal LC-3.',
  forecastTrack: [
    { lat: 13.80, lng: 88.50, timeLabel: '-24h (Depression)', intensity: 'Deep Depression', windKnots: 30 },
    { lat: 14.50, lng: 87.60, timeLabel: '-12h (Deep Dep)', intensity: 'Deep Depression', windKnots: 40 },
    { lat: 15.20, lng: 86.80, timeLabel: 'Current Position', intensity: 'Severe Cyclonic Storm', windKnots: 55 },
    { lat: 16.30, lng: 85.70, timeLabel: '+12h Forecast', intensity: 'Severe Cyclonic Storm', windKnots: 60 },
    { lat: 17.60, lng: 84.80, timeLabel: '+24h (Near Vizag)', intensity: 'Cyclonic Storm', windKnots: 50 },
    { lat: 19.10, lng: 84.50, timeLabel: '+48h Landfall (Gopalpur)', intensity: 'Deep Depression', windKnots: 38 }
  ],
  conePolygon: [
    [15.20, 86.80],
    [16.80, 84.20],
    [18.50, 83.20],
    [20.00, 84.00],
    [20.20, 85.80],
    [18.80, 86.50],
    [17.10, 87.00],
    [15.20, 86.80]
  ],
  galeRadiusKm: 135,
  stormRadiusKm: 70
};

// ----------------------------------------------------------------------------
// 9. CONTINENTAL SHELF BREAK (200m ISOBATH)
// ----------------------------------------------------------------------------
export const GIS_200M_SHELF_BREAK: [number, number][] = [
  // West Coast 200m Shelf
  [23.20, 67.40],
  [21.80, 68.20],
  [20.20, 70.00],
  [19.00, 71.40],
  [17.50, 72.20],
  [15.20, 73.10],
  [13.00, 74.00],
  [11.00, 75.10],
  [9.00, 76.10],
  [7.50, 77.20],
  // Cape Comorin to East Coast
  [6.80, 78.50],
  [8.50, 79.80],
  [10.20, 80.80],
  [12.80, 81.20],
  [15.00, 81.80],
  [17.20, 83.60],
  [19.20, 85.80],
  [20.50, 87.80],
  [21.50, 89.20]
];

