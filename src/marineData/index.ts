import { 
  getPortsGeoJSON, 
  getPfzGeoJSON, 
  getHazardZonesGeoJSON, 
  getSafeZonesGeoJSON, 
  getGeofencedZonesGeoJSON, 
  getRoutesGeoJSON, 
  getVesselsGeoJSON, 
  getWindStationsGeoJSON,
  getOceanCurrentsGeoJSON
} from './geoData';
import { IndianPort } from '../types/marine';

/**
 * SAGAR-SAFE AI DATA LAYER ARCHITECTURE
 * 
 * Clean separation of concerns:
 * - BASE MAP: OpenStreetMap (OSM Standard raster tiles / Carto Voyager)
 * - MAP ENGINE: MapLibre GL JS
 * - APPLICATION DATA: GeoJSON adapters from local datasets
 * - FUTURE LIVE DATA: INCOIS (PFZ, OOM Buoys), IMD (Cyclones, Radar), MOSDAC (SST, Chlorophyll)
 */

export interface MarineDataStore {
  ports: ReturnType<typeof getPortsGeoJSON>;
  pfzZones: ReturnType<typeof getPfzGeoJSON>;
  dangerZones: ReturnType<typeof getHazardZonesGeoJSON>;
  safeZones: ReturnType<typeof getSafeZonesGeoJSON>;
  geofencedZones: ReturnType<typeof getGeofencedZonesGeoJSON>;
  routes: ReturnType<typeof getRoutesGeoJSON>;
  vessels: ReturnType<typeof getVesselsGeoJSON>;
  overlays: {
    windStations: ReturnType<typeof getWindStationsGeoJSON>;
    currents: ReturnType<typeof getOceanCurrentsGeoJSON>;
    sstInfo: {
      source: string;
      resolution: string;
      meanSstC: number;
      gradientThreshold: string;
      sensor: string;
      lastUpdated: string;
    };
    chlorophyllInfo: {
      source: string;
      meanMgM3: number;
      bloomAlerts: number;
      sensor: string;
      lastUpdated: string;
    };
  };
}

/**
 * Returns structured GeoJSON datasets ready for ingestion into MapLibre GL JS sources
 */
export function getMarineDatasets(filteredPorts?: IndianPort[], customRoute?: [number, number][]): MarineDataStore {
  return {
    ports: getPortsGeoJSON(filteredPorts),
    pfzZones: getPfzGeoJSON(),
    dangerZones: getHazardZonesGeoJSON(),
    safeZones: getSafeZonesGeoJSON(),
    geofencedZones: getGeofencedZonesGeoJSON(),
    routes: getRoutesGeoJSON(customRoute),
    vessels: getVesselsGeoJSON(),
    overlays: {
      windStations: getWindStationsGeoJSON(),
      currents: getOceanCurrentsGeoJSON(),
      sstInfo: {
        source: 'INCOIS / ISRO Oceansat-3 Thermal Infrared',
        resolution: '1.0 km Coastal Sea Surface Temperature',
        meanSstC: 28.4,
        gradientThreshold: '0.6°C / 10km (Thermal Front)',
        sensor: 'SSTM-3 & INSAT-3DR',
        lastUpdated: new Date().toISOString()
      },
      chlorophyllInfo: {
        source: 'INCOIS OCM-3 Ocean Colour Monitor',
        meanMgM3: 1.45,
        bloomAlerts: 2,
        sensor: 'Oceansat-3 OCM',
        lastUpdated: new Date().toISOString()
      }
    }
  };
}

export * from './geoData';
