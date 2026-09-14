import type { FeatureCollection, Feature, Point, LineString, Polygon, MultiPolygon } from 'geojson';
import { IndianPort } from '../types/marine';
import { ALL_INDIAN_PORTS } from '../data/indianPortsData';
import { 
  GIS_SHIPPING_LANES, 
  GIS_OCEAN_CURRENTS, 
  INDIAN_EEZ_POLYGON, 
  ANDAMAN_EEZ_POLYGON,
  GIS_ACTIVE_CYCLONE,
  BATHYMETRY_ZONES
} from '../data/maritimeGisData';
import { 
  LIVE_AIS_FLEET, 
  GIS_PFZ_ZONES, 
  GIS_WAVE_ZONES, 
  GIS_WIND_STATIONS 
} from '../data/maritimeGisFleet';
import { 
  IMBL_GUJARAT_PAKISTAN, 
  IMBL_PALK_STRAIT_SRILANKA 
} from '../data/maritimeData';

/**
 * 1. PORTS GEOJSON CONVERTER
 * Each port satisfies: { id, name, latitude, longitude, state, type, ... }
 */
export function getPortsGeoJSON(ports: IndianPort[] = ALL_INDIAN_PORTS): FeatureCollection<Point> {
  return {
    type: 'FeatureCollection',
    features: ports.map(port => ({
      type: 'Feature',
      id: port.id,
      geometry: {
        type: 'Point',
        coordinates: [port.lng, port.lat]
      },
      properties: {
        id: port.id,
        name: port.name,
        latitude: port.lat,
        longitude: port.lng,
        state: port.state,
        type: port.facilityType || port.type || 'Commercial Port',
        portCategory: port.portCategory || port.facilityType || 'Port',
        depthMeters: port.depthMeters || 12.0,
        cargoTypes: (port.cargoTypes || []).slice(0, 3).join(', '),
        nearestHarbour: port.nearestHarbour || `${port.name} Anchorage`,
        isMajor: port.facilityType === 'Major Port' || port.facilityCategories?.includes('Major Port')
      }
    }))
  };
}

/**
 * 2. PFZ (POTENTIAL FISHING ZONES) GEOJSON CONVERTER
 * Highly productive pelagic chlorophyll & SST boundary zones
 */
export function getPfzGeoJSON(): FeatureCollection<Polygon> {
  return {
    type: 'FeatureCollection',
    features: GIS_PFZ_ZONES.map(zone => {
      // MapLibre / GeoJSON format requires [lng, lat] and closed polygon (first == last)
      const coords = zone.polygon.map(([lat, lng]) => [lng, lat]);
      if (coords.length > 0) {
        const first = coords[0];
        const last = coords[coords.length - 1];
        if (first[0] !== last[0] || first[1] !== last[1]) {
          coords.push([first[0], first[1]]);
        }
      }

      return {
        type: 'Feature',
        id: zone.id,
        geometry: {
          type: 'Polygon',
          coordinates: [coords]
        },
        properties: {
          id: zone.id,
          name: zone.name,
          state: zone.state,
          potential: zone.potential,
          depthRange: zone.depthRange,
          chlorophyllMgM3: zone.chlorophyllMgM3,
          sstC: zone.sstC,
          targetFish: (zone.targetFish || []).join(', '),
          validUntil: zone.validUntil,
          advisoryText: zone.advisoryText
        }
      };
    })
  };
}

/**
 * 3. DANGER & HAZARD ZONES GEOJSON CONVERTER
 * Severe waves, rough sea conditions, and active cyclone cones
 */
export function getHazardZonesGeoJSON(): FeatureCollection<Polygon> {
  const features: Feature<Polygon>[] = [];

  // Rough wave zones
  GIS_WAVE_ZONES.forEach(zone => {
    const coords = zone.polygon.map(([lat, lng]) => [lng, lat]);
    if (coords.length > 0) {
      const first = coords[0];
      const last = coords[coords.length - 1];
      if (first[0] !== last[0] || first[1] !== last[1]) {
        coords.push([first[0], first[1]]);
      }
    }

    features.push({
      type: 'Feature',
      id: zone.id,
      geometry: {
        type: 'Polygon',
        coordinates: [coords]
      },
      properties: {
        id: zone.id,
        name: zone.name,
        category: zone.category,
        heightRange: zone.heightRange,
        description: zone.description,
        hazardType: 'ROUGH_SEAS',
        color: zone.color || '#ef4444'
      }
    });
  });

  // Active cyclone forecast cone
  if (GIS_ACTIVE_CYCLONE && GIS_ACTIVE_CYCLONE.conePolygon) {
    const coords = GIS_ACTIVE_CYCLONE.conePolygon.map(([lat, lng]) => [lng, lat]);
    if (coords.length > 0) {
      const first = coords[0];
      const last = coords[coords.length - 1];
      if (first[0] !== last[0] || first[1] !== last[1]) {
        coords.push([first[0], first[1]]);
      }
    }
    features.push({
      type: 'Feature',
      id: 'cyclone-cone',
      geometry: {
        type: 'Polygon',
        coordinates: [coords]
      },
      properties: {
        id: 'cyclone-cone',
        name: `Cyclone ${GIS_ACTIVE_CYCLONE.name} Cone`,
        category: 'Severe Tropical Cyclone',
        heightRange: 'Gale 65-85 kn',
        description: `IMD Warning: Projected path for ${GIS_ACTIVE_CYCLONE.name}. Fishermen advised not to venture into sea.`,
        hazardType: 'CYCLONE_WARNING',
        color: '#dc2626'
      }
    });
  }

  return {
    type: 'FeatureCollection',
    features
  };
}

/**
 * 4. GEOFENCED / RESTRICTED INTERNATIONAL MARITIME BOUNDARY LINES (IMBL)
 * Critical border lines where Indian fishermen face detention risk
 */
export function getGeofencedZonesGeoJSON(): FeatureCollection<LineString | Polygon> {
  const features: (Feature<LineString> | Feature<Polygon>)[] = [];

  // Palk Strait / Indo-Sri Lanka IMBL (Line)
  const slCoords = IMBL_PALK_STRAIT_SRILANKA.map(pt => [pt.lng, pt.lat]);
  features.push({
    type: 'Feature',
    id: 'imbl-sri-lanka-line',
    geometry: {
      type: 'LineString',
      coordinates: slCoords
    },
    properties: {
      id: 'imbl-sri-lanka',
      name: 'Indo-Sri Lanka IMBL (Palk Strait / Mannar)',
      restrictionLevel: 'CRITICAL_DANGER',
      description: 'International Maritime Boundary Line: High Detention Risk. 5 km buffer zone enforced by Indian Coast Guard.',
      risk: 'Detention by Sri Lankan Navy'
    }
  });

  // Sir Creek / Gujarat-Pakistan IMBL (Line)
  const pakCoords = IMBL_GUJARAT_PAKISTAN.map(pt => [pt.lng, pt.lat]);
  features.push({
    type: 'Feature',
    id: 'imbl-pakistan-line',
    geometry: {
      type: 'LineString',
      coordinates: pakCoords
    },
    properties: {
      id: 'imbl-pakistan',
      name: 'Sir Creek / Pakistan Maritime Boundary',
      restrictionLevel: 'CRITICAL_DANGER',
      description: 'Sir Creek Border: Extremely high detention risk. BSF Water Wing & ICG intercept perimeter.',
      risk: 'Detention by MSA Pakistan'
    }
  });

  // Indian Exclusive Economic Zone (EEZ) perimeter
  const eezCoords = INDIAN_EEZ_POLYGON.map(pt => [pt.lng, pt.lat]);
  if (eezCoords.length > 0) {
    const first = eezCoords[0];
    const last = eezCoords[eezCoords.length - 1];
    if (first[0] !== last[0] || first[1] !== last[1]) {
      eezCoords.push([first[0], first[1]]);
    }
  }
  features.push({
    type: 'Feature',
    id: 'indian-eez-mainland',
    geometry: {
      type: 'Polygon',
      coordinates: [eezCoords]
    },
    properties: {
      id: 'indian-eez-mainland',
      name: 'Indian Sovereign EEZ (Mainland 200 NM)',
      restrictionLevel: 'SOVEREIGN_ECONOMIC_ZONE',
      description: 'India 200 Nautical Mile Exclusive Economic Zone recognized under UNCLOS.',
      risk: 'Permitted for registered Indian artisanal and mechanized trawlers'
    }
  });

  // Andaman EEZ
  const andamanCoords = ANDAMAN_EEZ_POLYGON.map(pt => [pt.lng, pt.lat]);
  if (andamanCoords.length > 0) {
    const first = andamanCoords[0];
    const last = andamanCoords[andamanCoords.length - 1];
    if (first[0] !== last[0] || first[1] !== last[1]) {
      andamanCoords.push([first[0], first[1]]);
    }
  }
  features.push({
    type: 'Feature',
    id: 'indian-eez-andaman',
    geometry: {
      type: 'Polygon',
      coordinates: [andamanCoords]
    },
    properties: {
      id: 'indian-eez-andaman',
      name: 'Andaman & Nicobar EEZ Perimeter',
      restrictionLevel: 'SOVEREIGN_ECONOMIC_ZONE',
      description: 'Andaman and Nicobar archipelago EEZ perimeter.',
      risk: 'Permitted Indian waters'
    }
  });

  return {
    type: 'FeatureCollection',
    features
  };
}

/**
 * 5. SAFE ZONES GEOJSON CONVERTER
 * Designated calm sheltered coastal waters and authorized artisanal fishing bays
 */
export function getSafeZonesGeoJSON(): FeatureCollection<Polygon> {
  // Calm sheltered wave zones safe for coastal crafts (<1.2m wave heights)
  const safeShelteredBays = GIS_WAVE_ZONES.filter(z => z.category === 'Calm' || z.category === 'Moderate');

  return {
    type: 'FeatureCollection',
    features: safeShelteredBays.map(bay => {
      const coords = bay.polygon.map(([lat, lng]) => [lng, lat]);
      if (coords.length > 0) {
        const first = coords[0];
        const last = coords[coords.length - 1];
        if (first[0] !== last[0] || first[1] !== last[1]) {
          coords.push([first[0], first[1]]);
        }
      }

      return {
        type: 'Feature',
        id: `safe-${bay.id}`,
        geometry: {
          type: 'Polygon',
          coordinates: [coords]
        },
        properties: {
          id: `safe-${bay.id}`,
          name: `${bay.name} (Sheltered Safe Waters)`,
          waveHeight: bay.heightRange,
          safetyScore: bay.category === 'Calm' ? '98% Safe' : '88% Safe',
          status: 'Calm Sea State • Clear Navigation',
          description: bay.description || 'Designated safe coastal fishing zone within 12 NM. Optimal sea conditions.'
        }
      };
    })
  };
}

/**
 * 6. FISHING & SHIPPING ROUTES GEOJSON CONVERTER
 * Supports AI agent recommended routes as well as official maritime transit fairways
 */
export function getRoutesGeoJSON(customAgentRoute?: [number, number][]): FeatureCollection<LineString> {
  const features: Feature<LineString>[] = [];

  // Official trunk shipping lanes and coastal TSS schemes
  GIS_SHIPPING_LANES.forEach(lane => {
    const coords = lane.pathCoords.map(p => [p.lng, p.lat]);
    features.push({
      type: 'Feature',
      id: lane.id,
      geometry: {
        type: 'LineString',
        coordinates: coords
      },
      properties: {
        id: lane.id,
        name: lane.name,
        type: lane.type,
        bearingText: lane.bearingText,
        routeClass: 'COMMERCIAL_FAIRWAY'
      }
    });
  });

  // AI Agent recommended safe passage route (if supplied by caller)
  if (customAgentRoute && customAgentRoute.length > 1) {
    features.push({
      type: 'Feature',
      id: 'ai-recommended-safe-route',
      geometry: {
        type: 'LineString',
        coordinates: customAgentRoute.map(([lat, lng]) => [lng, lat])
      },
      properties: {
        id: 'ai-recommended-safe-route',
        name: '🤖 AI Recommended Safe Fishing Passage',
        type: 'AI Navigation Waypoints',
        bearingText: 'Dynamic Route Avoidance',
        routeClass: 'AI_RECOMMENDED_ROUTE'
      }
    });
  }

  return {
    type: 'FeatureCollection',
    features
  };
}

/**
 * 7. VESSELS / SHIPS GEOJSON CONVERTER
 * Real AIS fleet positions, heading, draught, cargo, and speed
 */
export function getVesselsGeoJSON(): FeatureCollection<Point> {
  return {
    type: 'FeatureCollection',
    features: LIVE_AIS_FLEET.map(v => ({
      type: 'Feature',
      id: v.id,
      geometry: {
        type: 'Point',
        coordinates: [v.lng, v.lat]
      },
      properties: {
        id: v.id,
        name: v.name,
        mmsi: v.mmsi,
        callSign: v.callSign,
        type: v.type,
        heading: v.heading,
        speedKnots: v.speedKnots,
        destination: v.destination,
        status: v.status,
        draughtMeters: v.draughtMeters,
        lengthMeters: v.lengthMeters,
        cargoDescription: v.cargoDescription,
        flag: v.flag
      }
    }))
  };
}

/**
 * 8. OCEANOGRAPHIC & WEATHER OVERLAYS (SST, Chlorophyll, Coastal Winds)
 */
export function getWindStationsGeoJSON(): FeatureCollection<Point> {
  return {
    type: 'FeatureCollection',
    features: GIS_WIND_STATIONS.map(w => ({
      type: 'Feature',
      id: w.id,
      geometry: {
        type: 'Point',
        coordinates: [w.lng, w.lat]
      },
      properties: {
        id: w.id,
        name: w.name,
        speedKnots: w.speedKnots,
        directionDeg: w.directionDeg,
        directionText: w.directionText
      }
    }))
  };
}

export function getOceanCurrentsGeoJSON(): FeatureCollection<LineString> {
  return {
    type: 'FeatureCollection',
    features: GIS_OCEAN_CURRENTS.map(c => ({
      type: 'Feature',
      id: c.id,
      geometry: {
        type: 'LineString',
        coordinates: [
          [c.startLng, c.startLat],
          [c.endLng, c.endLat]
        ]
      },
      properties: {
        id: c.id,
        name: c.name,
        speedKnots: c.speedKnots,
        flowDirection: c.flowDirection
      }
    }))
  };
}
