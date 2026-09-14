import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import * as maplibregl from 'maplibre-gl';
import type { Map as MapLibreMap, Popup, Marker } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { 
  Compass, 
  Layers, 
  Plus, 
  Minus, 
  Locate, 
  Anchor, 
  Search, 
  Filter, 
  Wind, 
  Waves, 
  Radio, 
  Ship, 
  Fish, 
  ShieldAlert, 
  MapPin, 
  Sliders, 
  Check, 
  RotateCcw,
  Maximize2,
  CloudRain,
  Activity,
  BarChart3,
  Map as MapIcon,
  X,
  AlertTriangle,
  Eye,
  Volume2,
  VolumeX,
  Info
} from 'lucide-react';
import { MarineLocation, IndianPort, DecisionAnalysis, MarineAlert } from '../types/marine';
import { ALL_INDIAN_PORTS } from '../data/indianPortsData';
import { 
  getMarineDatasets, 
  MarineDataStore,
  getPortsGeoJSON,
  getPfzGeoJSON,
  getHazardZonesGeoJSON,
  getSafeZonesGeoJSON,
  getGeofencedZonesGeoJSON,
  getRoutesGeoJSON,
  getVesselsGeoJSON,
  getWindStationsGeoJSON,
  getOceanCurrentsGeoJSON
} from '../marineData';
import { MaritimeRightPanel } from './MaritimeRightPanel';
import { checkOrcaBoundaryGuardian, OrcaBoundaryCheckResult } from '../data/maritimeData';
import { GIS_ACTIVE_CYCLONE } from '../data/maritimeGisData';

export interface MarineMapProps {
  selectedLocation: MarineLocation;
  onSelectLocation: (loc: MarineLocation) => void;
  analysis?: DecisionAnalysis | null;
  activeAlerts?: MarineAlert[];
  isDemoMode?: boolean;
  language?: string;
  className?: string;
  recommendedRoute?: [number, number][]; // Optional AI-recommended route [lat, lng][]
}

// 12 Major Indian Ports
const MAJOR_PORT_IDS = new Set([
  'chennai-port',
  'cochin-port',
  'deendayal-port',
  'jnpa-port',
  'paradip-port',
  'syama-prasad-port',
  'mormugao-port',
  'mumbai-port',
  'new-mangalore-port',
  'visakhapatnam-port',
  'vo-chidambaranar-port',
  'kamarajar-port'
]);

// 100% Free Tile Source Configurations (Zero Mapbox token, Zero Google key)
export type FreeTileStyle = 'osm' | 'carto-voyager' | 'carto-dark' | 'esri-satellite';

const FREE_MAP_STYLES: Record<FreeTileStyle, { name: string; style: maplibregl.StyleSpecification }> = {
  osm: {
    name: 'OpenStreetMap Standard',
    style: {
      version: 8,
      sources: {
        'osm-tiles': {
          type: 'raster',
          tiles: [
            'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
            'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
            'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png'
          ],
          tileSize: 256,
          attribution: '&copy; <a target="_blank" rel="noopener noreferrer" href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
      },
      layers: [
        {
          id: 'osm-tiles-layer',
          type: 'raster',
          source: 'osm-tiles',
          minzoom: 0,
          maxzoom: 19
        }
      ]
    }
  },
  'carto-voyager': {
    name: 'Carto Voyager (Marine Friendly)',
    style: {
      version: 8,
      sources: {
        'carto-voyager-tiles': {
          type: 'raster',
          tiles: [
            'https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
            'https://b.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
            'https://c.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
            'https://d.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png'
          ],
          tileSize: 256,
          attribution: '&copy; <a target="_blank" rel="noopener noreferrer" href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a target="_blank" rel="noopener noreferrer" href="https://carto.com/attributions">CARTO</a>'
        }
      },
      layers: [
        {
          id: 'carto-voyager-layer',
          type: 'raster',
          source: 'carto-voyager-tiles',
          minzoom: 0,
          maxzoom: 19
        }
      ]
    }
  },
  'carto-dark': {
    name: 'Dark Maritime Deck',
    style: {
      version: 8,
      sources: {
        'carto-dark-tiles': {
          type: 'raster',
          tiles: [
            'https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
            'https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
            'https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
            'https://d.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
          ],
          tileSize: 256,
          attribution: '&copy; <a target="_blank" rel="noopener noreferrer" href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a target="_blank" rel="noopener noreferrer" href="https://carto.com/attributions">CARTO</a>'
        }
      },
      layers: [
        {
          id: 'carto-dark-layer',
          type: 'raster',
          source: 'carto-dark-tiles',
          minzoom: 0,
          maxzoom: 19
        }
      ]
    }
  },
  'esri-satellite': {
    name: 'Esri Satellite Ocean Imagery',
    style: {
      version: 8,
      sources: {
        'esri-satellite-tiles': {
          type: 'raster',
          tiles: [
            'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
          ],
          tileSize: 256,
          attribution: 'Tiles &copy; Esri, DigitalGlobe, GeoEye, Earthstar Geographics'
        }
      },
      layers: [
        {
          id: 'esri-satellite-layer',
          type: 'raster',
          source: 'esri-satellite-tiles',
          minzoom: 0,
          maxzoom: 19
        }
      ]
    }
  }
};

export const MarineMap: React.FC<MarineMapProps> = ({
  selectedLocation,
  onSelectLocation,
  analysis,
  activeAlerts = [],
  isDemoMode = false,
  language = 'en',
  className = '',
  recommendedRoute
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const selectedLocationMarkerRef = useRef<Marker | null>(null);
  const activePopupRef = useRef<Popup | null>(null);

  // Error State Handling
  const [mapError, setMapError] = useState<string | null>(null);
  const [layerErrors, setLayerErrors] = useState<Record<string, string>>({});

  // Base Map Style (OpenStreetMap as default primary free base map)
  const [baseMapType, setBaseMapType] = useState<FreeTileStyle>('osm');

  // Coordinates & Zoom Telemetry
  const [cursorCoords, setCursorCoords] = useState<{ lat: number; lng: number }>({
    lat: selectedLocation.lat || 15.5,
    lng: selectedLocation.lng || 78.5
  });
  const [currentZoom, setCurrentZoom] = useState<number>(5);

  // Left Drawer for Maritime GIS Controls ('layers' | 'vessels' | 'weather' | 'analytics' | 'settings' | null)
  const [activeLeftDrawer, setActiveLeftDrawer] = useState<'layers' | 'vessels' | 'weather' | 'analytics' | 'settings' | null>(null);

  // Marine Layers Visibility Toggle
  const [layerVisibility, setLayerVisibility] = useState({
    ports: true,
    pfz: true,
    safeZones: true,
    dangerZones: true,
    geofence: true,
    routes: true,
    vessels: true,
    weather: true,
    sstOverlay: true,
    chlorophyllOverlay: true
  });

  // Filter & Search Controls
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'major' | 'commercial' | 'container' | 'fishing' | 'lng' | 'naval'>('all');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Vessel Type Filter in Vessels Drawer
  const [vesselFilter, setVesselFilter] = useState<'all' | 'cargo' | 'tanker' | 'container' | 'fishing' | 'naval'>('all');

  // Measurement Settings
  const [coordFormat, setCoordFormat] = useState<'decimal' | 'dms'>('decimal');
  const [speedUnit, setSpeedUnit] = useState<'knots' | 'kmh'>('knots');

  // Selected Port for Side Dossier Panel
  const [activeRightPanelPort, setActiveRightPanelPort] = useState<IndianPort | null>(() => {
    const init = ALL_INDIAN_PORTS.find(p => p.id === selectedLocation.id);
    return init || ALL_INDIAN_PORTS[0];
  });

  // ORCA Boundary Guardian Simulation
  const [simulatedBorderBreach, setSimulatedBorderBreach] = useState<boolean>(false);

  // Filtered Ports
  const filteredPorts = useMemo(() => {
    return ALL_INDIAN_PORTS.filter(port => {
      let matchCat = true;
      if (selectedCategory === 'major') {
        matchCat = port.facilityType === 'Major Port' || port.facilityCategories?.includes('Major Port') || MAJOR_PORT_IDS.has(port.id);
      } else if (selectedCategory === 'commercial') {
        matchCat = port.facilityCategories?.includes('Commercial Port') || port.facilityCategories?.includes('Major Port') || port.facilityType === 'Major Port';
      } else if (selectedCategory === 'container') {
        matchCat = port.facilityCategories?.includes('Container Port/Terminal') || port.cargoTypes?.some(c => c.toLowerCase().includes('container'));
      } else if (selectedCategory === 'fishing') {
        matchCat = port.facilityCategories?.includes('Fishing Harbour') || port.facilityCategories?.includes('Fish Landing Centre') || port.facilityType === 'Fishing Harbour';
      } else if (selectedCategory === 'lng') {
        matchCat = port.facilityCategories?.includes('Oil/LNG Terminal') || port.cargoTypes?.some(c => c.toLowerCase().includes('lng') || c.toLowerCase().includes('crude') || c.toLowerCase().includes('oil'));
      } else if (selectedCategory === 'naval') {
        matchCat = port.facilityCategories?.includes('Naval Facility') || port.detailedType === 'Naval Facility';
      }

      let matchSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        matchSearch = port.name.toLowerCase().includes(q) ||
          (port.portCode && port.portCode.toLowerCase().includes(q)) ||
          port.state.toLowerCase().includes(q) ||
          (port.detailedType && port.detailedType.toLowerCase().includes(q));
      }

      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Structured Marine Data Store from Architecture
  const marineDatasets: MarineDataStore = useMemo(() => {
    return getMarineDatasets(filteredPorts, recommendedRoute);
  }, [filteredPorts, recommendedRoute]);

  // Proximity Guardian check
  const orcaGuardianStatus: OrcaBoundaryCheckResult = useMemo(() => {
    if (simulatedBorderBreach) {
      return {
        breached: true,
        thresholdKm: 5.0,
        nearestSector: 'PALK_STRAIT_SRILANKA',
        distanceKm: 2.8,
        nearestBoundaryName: 'Indo-Sri Lanka IMBL (Palk Strait / Mannar)',
        advisoryText: 'CRITICAL ALERT: Position is 2.8 km from Sri Lanka Maritime Border. Border crossing strictly prohibited under UNCLOS treaties!',
        colorHex: '#f43f5e'
      };
    }
    const targetLat = activeRightPanelPort?.lat ?? selectedLocation.lat;
    const targetLng = activeRightPanelPort?.lng ?? selectedLocation.lng;
    return checkOrcaBoundaryGuardian(targetLat, targetLng, 5.0);
  }, [simulatedBorderBreach, activeRightPanelPort, selectedLocation]);

  // Format nautical coordinates
  const formatNauticalCoords = (lat: number, lng: number) => {
    const latDeg = Math.floor(Math.abs(lat));
    const latMin = ((Math.abs(lat) - latDeg) * 60).toFixed(1);
    const latDir = lat >= 0 ? 'N' : 'S';

    const lngDeg = Math.floor(Math.abs(lng));
    const lngMin = ((Math.abs(lng) - lngDeg) * 60).toFixed(1);
    const lngDir = lng >= 0 ? 'E' : 'W';

    return `${latDeg}° ${latMin}' ${latDir}, ${lngDeg}° ${lngMin}' ${lngDir}`;
  };

  // Safe fly-to function
  const jumpToRegion = useCallback((coords: [number, number], zoomLevel: number = 10) => {
    if (!mapRef.current) return;
    mapRef.current.flyTo({
      center: [coords[1], coords[0]], // [lng, lat]
      zoom: zoomLevel,
      essential: true,
      speed: 1.4
    });
  }, []);

  // Update GeoJSON Layers in MapLibre
  const applyMarineLayers = useCallback((map: MapLibreMap) => {
    try {
      // 1. SAFE ZONES LAYER (Polygons)
      if (!map.getSource('safe-zones-source')) {
        map.addSource('safe-zones-source', {
          type: 'geojson',
          data: marineDatasets.safeZones
        });
        map.addLayer({
          id: 'safe-zones-fill',
          type: 'fill',
          source: 'safe-zones-source',
          paint: {
            'fill-color': '#10b981',
            'fill-opacity': 0.2
          }
        });
        map.addLayer({
          id: 'safe-zones-stroke',
          type: 'line',
          source: 'safe-zones-source',
          paint: {
            'line-color': '#059669',
            'line-width': 1.5,
            'line-dasharray': [3, 2]
          }
        });
      } else {
        (map.getSource('safe-zones-source') as maplibregl.GeoJSONSource).setData(marineDatasets.safeZones);
      }

      // 2. DANGER / HAZARD ZONES (Polygons)
      if (!map.getSource('hazard-zones-source')) {
        map.addSource('hazard-zones-source', {
          type: 'geojson',
          data: marineDatasets.dangerZones
        });
        map.addLayer({
          id: 'hazard-zones-fill',
          type: 'fill',
          source: 'hazard-zones-source',
          paint: {
            'fill-color': '#ef4444',
            'fill-opacity': 0.28
          }
        });
        map.addLayer({
          id: 'hazard-zones-stroke',
          type: 'line',
          source: 'hazard-zones-source',
          paint: {
            'line-color': '#dc2626',
            'line-width': 2,
            'line-dasharray': [4, 2]
          }
        });
      } else {
        (map.getSource('hazard-zones-source') as maplibregl.GeoJSONSource).setData(marineDatasets.dangerZones);
      }

      // 3. PFZ (POTENTIAL FISHING ZONES) (Polygons)
      if (!map.getSource('pfz-zones-source')) {
        map.addSource('pfz-zones-source', {
          type: 'geojson',
          data: marineDatasets.pfzZones
        });
        map.addLayer({
          id: 'pfz-zones-fill',
          type: 'fill',
          source: 'pfz-zones-source',
          paint: {
            'fill-color': '#06b6d4',
            'fill-opacity': 0.35
          }
        });
        map.addLayer({
          id: 'pfz-zones-stroke',
          type: 'line',
          source: 'pfz-zones-source',
          paint: {
            'line-color': '#22d3ee',
            'line-width': 2.5
          }
        });
      } else {
        (map.getSource('pfz-zones-source') as maplibregl.GeoJSONSource).setData(marineDatasets.pfzZones);
      }

      // 4. GEOFENCED / RESTRICTED BOUNDARIES (IMBL & EEZ)
      if (!map.getSource('geofence-source')) {
        map.addSource('geofence-source', {
          type: 'geojson',
          data: marineDatasets.geofencedZones
        });
        map.addLayer({
          id: 'geofence-lines',
          type: 'line',
          source: 'geofence-source',
          paint: {
            'line-color': [
              'case',
              ['==', ['get', 'restrictionLevel'], 'CRITICAL_DANGER'],
              '#f43f5e',
              '#38bdf8'
            ],
            'line-width': [
              'case',
              ['==', ['get', 'restrictionLevel'], 'CRITICAL_DANGER'],
              3.5,
              1.8
            ],
            'line-dasharray': [
              'case',
              ['==', ['get', 'restrictionLevel'], 'CRITICAL_DANGER'],
              ['literal', [2, 1]],
              ['literal', [4, 2]]
            ]
          }
        });
      } else {
        (map.getSource('geofence-source') as maplibregl.GeoJSONSource).setData(marineDatasets.geofencedZones);
      }

      // 5. ROUTES (Shipping Fairways & AI Recommended Route)
      if (!map.getSource('routes-source')) {
        map.addSource('routes-source', {
          type: 'geojson',
          data: marineDatasets.routes
        });
        map.addLayer({
          id: 'routes-lines',
          type: 'line',
          source: 'routes-source',
          paint: {
            'line-color': [
              'case',
              ['==', ['get', 'routeClass'], 'AI_RECOMMENDED_ROUTE'],
              '#10b981',
              '#f59e0b'
            ],
            'line-width': [
              'case',
              ['==', ['get', 'routeClass'], 'AI_RECOMMENDED_ROUTE'],
              4,
              2
            ],
            'line-dasharray': [
              'case',
              ['==', ['get', 'routeClass'], 'AI_RECOMMENDED_ROUTE'],
              ['literal', [1]],
              ['literal', [3, 2]]
            ]
          }
        });
      } else {
        (map.getSource('routes-source') as maplibregl.GeoJSONSource).setData(marineDatasets.routes);
      }

      // 6. OCEAN CURRENTS (Lines)
      if (!map.getSource('currents-source')) {
        map.addSource('currents-source', {
          type: 'geojson',
          data: marineDatasets.overlays.currents
        });
        map.addLayer({
          id: 'currents-lines',
          type: 'line',
          source: 'currents-source',
          paint: {
            'line-color': '#0284c7',
            'line-width': 1.8,
            'line-dasharray': [2, 3]
          }
        });
      } else {
        (map.getSource('currents-source') as maplibregl.GeoJSONSource).setData(marineDatasets.overlays.currents);
      }

      // 7. PORTS (Clustered Point Layer with Zoom-Based Visibility)
      if (!map.getSource('ports-source')) {
        map.addSource('ports-source', {
          type: 'geojson',
          data: marineDatasets.ports,
          cluster: true,
          clusterMaxZoom: 7,
          clusterRadius: 40
        });

        // Port Cluster Circles
        map.addLayer({
          id: 'port-clusters',
          type: 'circle',
          source: 'ports-source',
          filter: ['has', 'point_count'],
          paint: {
            'circle-color': [
              'step',
              ['get', 'point_count'],
              '#0284c7',
              5,
              '#0891b2',
              15,
              '#0f766e'
            ],
            'circle-radius': [
              'step',
              ['get', 'point_count'],
              16,
              5,
              20,
              15,
              26
            ],
            'circle-stroke-width': 2,
            'circle-stroke-color': '#e0f2fe'
          }
        });

        // Port Cluster Count Label
        map.addLayer({
          id: 'port-cluster-count',
          type: 'symbol',
          source: 'ports-source',
          filter: ['has', 'point_count'],
          layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
            'text-size': 12
          },
          paint: {
            'text-color': '#ffffff'
          }
        });

        // Individual Unclustered Port Circles
        map.addLayer({
          id: 'unclustered-port-points',
          type: 'circle',
          source: 'ports-source',
          filter: ['!', ['has', 'point_count']],
          paint: {
            'circle-color': [
              'case',
              ['==', ['get', 'isMajor'], true],
              '#06b6d4',
              ['==', ['get', 'type'], 'Fishing Harbour'],
              '#f97316',
              '#10b981'
            ],
            'circle-radius': [
              'interpolate',
              ['linear'],
              ['zoom'],
              4, 4,
              8, 7,
              14, 11
            ],
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff'
          }
        });

        // Port Name Label (Visible at zoom >= 7 to avoid overcrowding)
        map.addLayer({
          id: 'port-names-label',
          type: 'symbol',
          source: 'ports-source',
          minzoom: 7,
          filter: ['!', ['has', 'point_count']],
          layout: {
            'text-field': ['get', 'name'],
            'text-font': ['Open Sans Regular', 'Arial Unicode MS Regular'],
            'text-size': 11,
            'text-offset': [0, 1.2],
            'text-anchor': 'top',
            'text-max-width': 10
          },
          paint: {
            'text-color': '#0f172a',
            'text-halo-color': '#ffffff',
            'text-halo-width': 1.5
          }
        });
      } else {
        (map.getSource('ports-source') as maplibregl.GeoJSONSource).setData(marineDatasets.ports);
      }

      // 8. VESSELS (AIS FLEET)
      if (!map.getSource('vessels-source')) {
        map.addSource('vessels-source', {
          type: 'geojson',
          data: marineDatasets.vessels
        });
        map.addLayer({
          id: 'vessels-circle',
          type: 'circle',
          source: 'vessels-source',
          paint: {
            'circle-color': [
              'case',
              ['==', ['get', 'type'], 'fishing'],
              '#f59e0b',
              ['==', ['get', 'type'], 'tanker'],
              '#ef4444',
              ['==', ['get', 'type'], 'cargo'],
              '#3b82f6',
              '#8b5cf6'
            ],
            'circle-radius': 4.5,
            'circle-stroke-width': 1.5,
            'circle-stroke-color': '#ffffff'
          }
        });
      } else {
        (map.getSource('vessels-source') as maplibregl.GeoJSONSource).setData(marineDatasets.vessels);
      }

      // 9. WEATHER & WIND STATIONS
      if (!map.getSource('wind-stations-source')) {
        map.addSource('wind-stations-source', {
          type: 'geojson',
          data: marineDatasets.overlays.windStations
        });
        map.addLayer({
          id: 'wind-stations-circle',
          type: 'circle',
          source: 'wind-stations-source',
          minzoom: 6,
          paint: {
            'circle-color': '#0ea5e9',
            'circle-radius': 3.5,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#e0f2fe'
          }
        });
      } else {
        (map.getSource('wind-stations-source') as maplibregl.GeoJSONSource).setData(marineDatasets.overlays.windStations);
      }

      // Set Layer Visibilities according to user state
      map.setLayoutProperty('safe-zones-fill', 'visibility', layerVisibility.safeZones ? 'visible' : 'none');
      map.setLayoutProperty('safe-zones-stroke', 'visibility', layerVisibility.safeZones ? 'visible' : 'none');
      map.setLayoutProperty('hazard-zones-fill', 'visibility', layerVisibility.dangerZones ? 'visible' : 'none');
      map.setLayoutProperty('hazard-zones-stroke', 'visibility', layerVisibility.dangerZones ? 'visible' : 'none');
      map.setLayoutProperty('pfz-zones-fill', 'visibility', layerVisibility.pfz ? 'visible' : 'none');
      map.setLayoutProperty('pfz-zones-stroke', 'visibility', layerVisibility.pfz ? 'visible' : 'none');
      map.setLayoutProperty('geofence-lines', 'visibility', layerVisibility.geofence ? 'visible' : 'none');
      map.setLayoutProperty('routes-lines', 'visibility', layerVisibility.routes ? 'visible' : 'none');
      map.setLayoutProperty('currents-lines', 'visibility', layerVisibility.weather ? 'visible' : 'none');
      map.setLayoutProperty('port-clusters', 'visibility', layerVisibility.ports ? 'visible' : 'none');
      map.setLayoutProperty('port-cluster-count', 'visibility', layerVisibility.ports ? 'visible' : 'none');
      map.setLayoutProperty('unclustered-port-points', 'visibility', layerVisibility.ports ? 'visible' : 'none');
      map.setLayoutProperty('port-names-label', 'visibility', layerVisibility.ports ? 'visible' : 'none');
      map.setLayoutProperty('vessels-circle', 'visibility', layerVisibility.vessels ? 'visible' : 'none');
      map.setLayoutProperty('wind-stations-circle', 'visibility', layerVisibility.weather ? 'visible' : 'none');
    } catch (err: unknown) {
      console.warn('MapLibre layer update error:', err);
      setLayerErrors(prev => ({ ...prev, marineLayers: (err as Error).message }));
    }
  }, [marineDatasets, layerVisibility]);

  // Click & Popup Event Bindings
  const registerMapInteractions = useCallback((map: MapLibreMap) => {
    // 1. Port Cluster Click -> Zoom in
    map.on('click', 'port-clusters', async (e) => {
      const features = map.queryRenderedFeatures(e.point, { layers: ['port-clusters'] });
      const clusterId = features[0]?.properties?.cluster_id;
      if (clusterId === undefined) return;

      const source = map.getSource('ports-source') as maplibregl.GeoJSONSource;
      try {
        const zoom = await source.getClusterExpansionZoom(clusterId);
        if (zoom !== null && zoom !== undefined) {
          const geom = features[0].geometry as { type: string; coordinates: [number, number] };
          map.easeTo({
            center: geom.coordinates,
            zoom: zoom
          });
        }
      } catch (err) {
        console.warn('Cluster expansion error:', err);
      }
    });

    // Cursor pointer on clusters
    map.on('mouseenter', 'port-clusters', () => {
      map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'port-clusters', () => {
      map.getCanvas().style.cursor = '';
    });

    // 2. Unclustered Port Marker Click -> Responsive Pop-up + Select
    map.on('click', 'unclustered-port-points', (e) => {
      if (!e.features || !e.features[0]) return;
      const f = e.features[0];
      const props = f.properties || {};
      const geom = f.geometry as { type: string; coordinates: [number, number] };
      const coords = geom.coordinates.slice() as [number, number];

      // Find original full port object
      const fullPort = ALL_INDIAN_PORTS.find(p => p.id === props.id);
      if (fullPort) {
        setActiveRightPanelPort(fullPort);
        onSelectLocation({
          id: fullPort.id,
          name: fullPort.name,
          state: fullPort.state,
          country: 'India',
          coordinates: [fullPort.lat, fullPort.lng],
          lat: fullPort.lat,
          lng: fullPort.lng,
          isCoastal: fullPort.isCoastal,
          type: fullPort.facilityType || 'Major Port',
          portCategory: fullPort.portCategory || 'Port',
          zone: fullPort.zone || 'Coastal'
        });
      }

      // Responsive Mobile Friendly Popup
      if (activePopupRef.current) {
        activePopupRef.current.remove();
      }

      const popupHtml = `
        <div class="p-3 text-slate-100 font-sans max-w-[260px] select-text">
          <div class="flex items-center justify-between gap-1 border-b border-cyan-500/30 pb-1.5 mb-2">
            <span class="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">PORT</span>
            <span class="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40">${props.type || 'Port'}</span>
          </div>
          <h4 class="text-xs sm:text-sm font-bold text-white mb-0.5">${props.name}</h4>
          <p class="text-[11px] text-slate-300 mb-2 font-medium">${props.state}, India</p>
          <div class="text-[10px] font-mono text-cyan-200/90 bg-slate-950/70 p-2 rounded-lg space-y-1 border border-white/10">
            <div>Latitude: <strong>${Number(props.latitude).toFixed(4)}° N</strong></div>
            <div>Longitude: <strong>${Number(props.longitude).toFixed(4)}° E</strong></div>
            <div>Draft Depth: <strong>${props.depthMeters || 12}m</strong></div>
          </div>
          <div class="mt-2 text-[10px] text-cyan-400 font-medium flex items-center gap-1">
            <span>⚓ Click to view detailed harbour dossier</span>
          </div>
        </div>
      `;

      const popup = new maplibregl.Popup({
        offset: 14,
        closeButton: true,
        closeOnClick: false,
        className: 'sagar-maplibre-popup',
        maxWidth: '300px'
      })
        .setLngLat(coords)
        .setHTML(popupHtml)
        .addTo(map);

      activePopupRef.current = popup;
    });

    map.on('mouseenter', 'unclustered-port-points', () => {
      map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'unclustered-port-points', () => {
      map.getCanvas().style.cursor = '';
    });

    // 3. PFZ Zone Click
    map.on('click', 'pfz-zones-fill', (e) => {
      if (!e.features || !e.features[0]) return;
      const f = e.features[0];
      const props = f.properties || {};

      if (activePopupRef.current) activePopupRef.current.remove();

      const popupHtml = `
        <div class="p-3 text-slate-100 font-sans max-w-[270px]">
          <div class="flex items-center justify-between border-b border-cyan-500/30 pb-1 mb-1.5">
            <span class="text-[10px] font-mono uppercase text-emerald-400 font-bold">🐟 POTENTIAL FISHING ZONE</span>
            <span class="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40">${props.potential || 'HIGH'}</span>
          </div>
          <h4 class="text-xs font-bold text-white mb-1">${props.name}</h4>
          <p class="text-[11px] text-slate-300 mb-2 leading-tight">${props.advisoryText || 'Optimal chlorophyll & SST gradient front.'}</p>
          <div class="text-[10px] font-mono bg-slate-950/70 p-2 rounded-lg space-y-0.5 border border-white/10 text-cyan-200">
            <div>Chlorophyll: <strong>${props.chlorophyllMgM3} mg/m³</strong></div>
            <div>SST: <strong>${props.sstC}°C</strong></div>
            <div>Target Fish: <strong>${props.targetFish}</strong></div>
          </div>
        </div>
      `;

      activePopupRef.current = new maplibregl.Popup({
        offset: 10,
        className: 'sagar-maplibre-popup',
        maxWidth: '300px'
      })
        .setLngLat(e.lngLat)
        .setHTML(popupHtml)
        .addTo(map);
    });

    // 4. Hazard / Cyclone Zone Click
    map.on('click', 'hazard-zones-fill', (e) => {
      if (!e.features || !e.features[0]) return;
      const f = e.features[0];
      const props = f.properties || {};

      if (activePopupRef.current) activePopupRef.current.remove();

      const popupHtml = `
        <div class="p-3 text-slate-100 font-sans max-w-[260px]">
          <div class="flex items-center gap-1.5 text-rose-400 font-bold text-[10px] uppercase font-mono border-b border-rose-500/30 pb-1 mb-1.5">
            <span>⚠️ MARITIME HAZARD WARNING</span>
          </div>
          <h4 class="text-xs font-bold text-white mb-1">${props.name}</h4>
          <p class="text-[11px] text-rose-200 mb-2">${props.description || 'High wave action and gusting winds.'}</p>
          <div class="text-[10px] font-mono bg-rose-950/60 p-2 rounded-lg border border-rose-500/30 text-rose-200">
            <div>Severity: <strong>${props.category || 'High Risk'}</strong></div>
            <div>Wave Height: <strong>${props.heightRange || '2.8m - 4.5m'}</strong></div>
          </div>
        </div>
      `;

      activePopupRef.current = new maplibregl.Popup({
        offset: 10,
        className: 'sagar-maplibre-popup',
        maxWidth: '300px'
      })
        .setLngLat(e.lngLat)
        .setHTML(popupHtml)
        .addTo(map);
    });

    // 5. Vessel Marker Click
    map.on('click', 'vessels-circle', (e) => {
      if (!e.features || !e.features[0]) return;
      const f = e.features[0];
      const props = f.properties || {};

      if (activePopupRef.current) activePopupRef.current.remove();

      const popupHtml = `
        <div class="p-3 text-slate-100 font-sans max-w-[260px]">
          <div class="flex items-center justify-between border-b border-sky-500/30 pb-1 mb-1.5">
            <span class="text-[10px] font-mono uppercase text-sky-400 font-bold">🚢 AIS LIVE VESSEL</span>
            <span class="text-[9px] font-mono px-1.5 py-0.2 rounded bg-sky-950 text-sky-300 border border-sky-500/40">${props.type || 'Commercial'}</span>
          </div>
          <h4 class="text-xs font-bold text-white mb-0.5">${props.name}</h4>
          <div class="text-[10px] font-mono text-cyan-200 bg-slate-950/70 p-2 rounded-lg space-y-1 border border-white/10 mt-2">
            <div>MMSI: <strong>${props.mmsi}</strong></div>
            <div>Speed: <strong>${props.speedKnots} knots</strong></div>
            <div>Heading: <strong>${props.heading}° True</strong></div>
            <div>Destination: <strong>${props.destination || 'Coast'}</strong></div>
          </div>
        </div>
      `;

      activePopupRef.current = new maplibregl.Popup({
        offset: 10,
        className: 'sagar-maplibre-popup',
        maxWidth: '300px'
      })
        .setLngLat(e.lngLat)
        .setHTML(popupHtml)
        .addTo(map);
    });

    // Telemetry cursor tracking
    map.on('mousemove', (e) => {
      setCursorCoords({
        lat: e.lngLat.lat,
        lng: e.lngLat.lng
      });
    });

    map.on('zoom', () => {
      setCurrentZoom(Math.round(map.getZoom()));
    });
  }, [onSelectLocation]);

  // INITIALIZE MAPLIBRE GL JS
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapRef.current) return; // Map already mounted

    try {
      const activeStyleConfig = FREE_MAP_STYLES[baseMapType].style;

      const map = new maplibregl.Map({
        container: mapContainerRef.current,
        style: activeStyleConfig,
        center: [selectedLocation.lng || 78.5, selectedLocation.lat || 15.5],
        zoom: 5,
        minZoom: 3.5,
        maxZoom: 18,
        attributionControl: false // Custom attribution styled below to ensure zero overflow
      });

      // Standard Attribution Control following OSM attribution policy
      map.addControl(new maplibregl.AttributionControl({
        compact: true,
        customAttribution: 'SAGAR-SAFE AI &copy; OpenStreetMap contributors'
      }), 'bottom-right');

      mapRef.current = map;

      map.on('load', () => {
        setMapError(null);
        applyMarineLayers(map);
        registerMapInteractions(map);

        // Marker for current selected port
        const el = document.createElement('div');
        el.className = 'sagar-selected-target-pin';
        el.innerHTML = `
          <div class="relative flex items-center justify-center">
            <span class="animate-ping absolute inline-flex h-7 w-7 rounded-full bg-cyan-400 opacity-75"></span>
            <div class="w-4 h-4 rounded-full bg-cyan-400 border-2 border-white shadow-lg flex items-center justify-center text-[8px] font-black text-slate-900">
              ⚓
            </div>
          </div>
        `;

        const marker = new maplibregl.Marker({ element: el })
          .setLngLat([selectedLocation.lng || 78.5, selectedLocation.lat || 15.5])
          .addTo(map);

        selectedLocationMarkerRef.current = marker;
      });

      map.on('error', (e) => {
        console.warn('MapLibre engine event error:', e);
        // Do not crash application, report status
        if (e && e.error && e.error.message && e.error.message.includes('404')) {
          setLayerErrors(prev => ({ ...prev, tiles: 'Some tiles unavailable; base map continuing' }));
        }
      });
    } catch (err: unknown) {
      console.error('Failed to initialize MapLibre GL JS:', err);
      setMapError('Map initialization encountered an issue. Base map fallback active.');
    }

    // RESIZE OBSERVER: Ensures the map resizes accurately whenever its container changes size
    const resizeObserver = new ResizeObserver(() => {
      if (mapRef.current) {
        mapRef.current.resize();
      }
    });

    if (mapContainerRef.current) {
      resizeObserver.observe(mapContainerRef.current);
    }

    // Cleanup when component unmounts
    return () => {
      resizeObserver.disconnect();
      if (activePopupRef.current) {
        activePopupRef.current.remove();
      }
      if (selectedLocationMarkerRef.current) {
        selectedLocationMarkerRef.current.remove();
      }
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []); // Run once on mount

  // Update style when baseMapType changes (e.g. from OSM to Carto or Satellite)
  useEffect(() => {
    if (!mapRef.current) return;
    const styleObj = FREE_MAP_STYLES[baseMapType].style;
    mapRef.current.setStyle(styleObj);

    mapRef.current.once('style.load', () => {
      if (mapRef.current) {
        applyMarineLayers(mapRef.current);
        registerMapInteractions(mapRef.current);
      }
    });
  }, [baseMapType, applyMarineLayers, registerMapInteractions]);

  // Update layers when filters or data change
  useEffect(() => {
    if (!mapRef.current || !mapRef.current.isStyleLoaded()) return;
    applyMarineLayers(mapRef.current);
  }, [marineDatasets, layerVisibility, applyMarineLayers]);

  // Sync selected location pin
  useEffect(() => {
    if (!selectedLocationMarkerRef.current) return;
    selectedLocationMarkerRef.current.setLngLat([selectedLocation.lng, selectedLocation.lat]);
  }, [selectedLocation]);

  // Map Controls Handlers
  const handleZoomIn = () => {
    if (mapRef.current) mapRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (mapRef.current) mapRef.current.zoomOut();
  };

  const handleResetView = () => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [selectedLocation.lng || 78.5, selectedLocation.lat || 15.5],
        zoom: 5,
        essential: true
      });
    }
  };

  // Safe locate current position without asking permission prematurely
  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        if (mapRef.current) {
          mapRef.current.flyTo({
            center: [pos.coords.longitude, pos.coords.latitude],
            zoom: 10,
            essential: true
          });
        }
      },
      (err) => {
        console.warn('Geolocation denied or unavailable:', err.message);
      },
      { timeout: 8000 }
    );
  };

  const handleToggleFullscreen = () => {
    if (!mapContainerRef.current) return;
    if (!document.fullscreenElement) {
      mapContainerRef.current.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  return (
    <div 
      id="marine-map-component-root"
      className={`w-full max-w-full overflow-x-clip relative rounded-2xl bg-[#020c1b] border border-cyan-500/30 shadow-2xl flex flex-col ${className}`}
    >
      {/* 1. TOP HEADER & FILTER BAR */}
      <div className="z-20 bg-[#020e1f]/95 backdrop-blur-xl px-3 sm:px-4 py-2 sm:py-2.5 border-b border-cyan-500/30 flex flex-wrap items-center justify-between gap-2">
        
        {/* Left: Port & Maritime Title */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center shrink-0">
            <Compass className="w-4 h-4 text-cyan-300 animate-spin-slow" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-xs sm:text-sm font-bold text-white truncate uppercase tracking-wider">
                INDIAN OCEAN MARITIME GIS
              </h3>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 hidden xs:inline-block">
                MapLibre + OSM
              </span>
            </div>
            <div className="text-[10px] text-cyan-200/70 font-mono truncate">
              {filteredPorts.length} Ports Mapped • INCOIS PFZ • IMBL Guardian
            </div>
          </div>
        </div>

        {/* Right: Category Chips & Search Trigger */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          {/* Search Box / Toggle */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ports, UN/LOCODE, states..."
              className="w-32 sm:w-44 lg:w-56 bg-slate-900/80 border border-cyan-500/30 focus:border-cyan-400 rounded-full px-3 py-1 text-[11px] text-white placeholder-slate-400 focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Basemap Switcher Pill */}
          <div className="flex items-center bg-slate-900/90 rounded-full p-0.5 border border-white/10 text-[10px] font-mono">
            <button
              onClick={() => setBaseMapType('osm')}
              className={`px-2 py-1 rounded-full transition-all ${
                baseMapType === 'osm'
                  ? 'bg-cyan-500 text-white font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="OpenStreetMap Standard Free Tiles"
            >
              OSM
            </button>
            <button
              onClick={() => setBaseMapType('carto-voyager')}
              className={`px-2 py-1 rounded-full transition-all ${
                baseMapType === 'carto-voyager'
                  ? 'bg-cyan-500 text-white font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="Carto Voyager Marine Tiles"
            >
              Voyager
            </button>
            <button
              onClick={() => setBaseMapType('carto-dark')}
              className={`px-2 py-1 rounded-full transition-all ${
                baseMapType === 'carto-dark'
                  ? 'bg-cyan-500 text-white font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="Dark Maritime HUD"
            >
              Dark
            </button>
            <button
              onClick={() => setBaseMapType('esri-satellite')}
              className={`px-2 py-1 rounded-full transition-all ${
                baseMapType === 'esri-satellite'
                  ? 'bg-cyan-500 text-white font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="Satellite Imagery Base"
            >
              Sat
            </button>
          </div>
        </div>
      </div>

      {/* 2. ORCA GUARDIAN PROXIMITY ALERT BANNER */}
      {orcaGuardianStatus.breached && (
        <div className="z-20 bg-rose-950/90 border-b border-rose-500/50 px-3 sm:px-4 py-1.5 flex items-center justify-between text-[11px] font-mono text-rose-100 animate-pulse">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
            <span>
              <strong>ORCA BORDER GUARDIAN:</strong> {orcaGuardianStatus.advisoryText}
            </span>
          </div>
          <button
            onClick={() => setSimulatedBorderBreach(false)}
            className="text-rose-300 hover:text-white text-xs underline font-sans ml-2"
          >
            Acknowledge
          </button>
        </div>
      )}

      {/* 3. MAIN WORKSPACE: MAP CANVAS + OVERLAYS + SIDE PANELS */}
      <div className="relative w-full h-[540px] sm:h-[620px] lg:h-[700px] flex overflow-hidden">
        
        {/* MAP CONTAINER */}
        <div 
          ref={mapContainerRef} 
          className="w-full h-full relative z-10 focus:outline-none"
          tabIndex={0}
        />

        {/* ERROR NOTIFICATION FALLBACK */}
        {mapError && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[80] bg-amber-950/90 border border-amber-500/40 text-amber-200 px-4 py-2 rounded-xl text-xs flex items-center gap-2 backdrop-blur-md">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{mapError}</span>
          </div>
        )}

        {/* FLOATING MAP NAVIGATION & CONTROLS (Top Left) */}
        <div className="absolute top-3 left-3 z-[25] flex flex-col gap-1.5">
          <button
            onClick={handleZoomIn}
            className="w-8 h-8 rounded-xl bg-[#020e1f]/90 backdrop-blur-md border border-cyan-500/40 text-slate-200 hover:text-white hover:border-cyan-300 flex items-center justify-center shadow-lg transition-all"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="w-8 h-8 rounded-xl bg-[#020e1f]/90 backdrop-blur-md border border-cyan-500/40 text-slate-200 hover:text-white hover:border-cyan-300 flex items-center justify-center shadow-lg transition-all"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetView}
            className="w-8 h-8 rounded-xl bg-[#020e1f]/90 backdrop-blur-md border border-cyan-500/40 text-cyan-400 hover:text-cyan-200 hover:border-cyan-300 flex items-center justify-center shadow-lg transition-all"
            title="Recenter Map on Target Port"
            aria-label="Reset View"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleLocateMe}
            className="w-8 h-8 rounded-xl bg-[#020e1f]/90 backdrop-blur-md border border-cyan-500/40 text-emerald-400 hover:text-emerald-200 hover:border-emerald-300 flex items-center justify-center shadow-lg transition-all"
            title="Locate Current Device Position"
            aria-label="Locate me"
          >
            <Locate className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleToggleFullscreen}
            className="w-8 h-8 rounded-xl bg-[#020e1f]/90 backdrop-blur-md border border-cyan-500/40 text-slate-300 hover:text-white hover:border-cyan-300 flex items-center justify-center shadow-lg transition-all"
            title="Toggle Fullscreen"
            aria-label="Fullscreen"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
          
          {/* ORCA Sim Toggle */}
          <button
            onClick={() => setSimulatedBorderBreach(prev => !prev)}
            className={`p-1.5 rounded-xl border text-[9px] font-mono font-bold flex flex-col items-center justify-center shadow-lg transition-all w-8 text-center ${
              simulatedBorderBreach || orcaGuardianStatus.breached
                ? 'bg-rose-600 text-white border-rose-400 shadow-rose-600/50 animate-pulse'
                : 'bg-[#020e1f]/90 text-cyan-300 border-cyan-500/40 hover:border-cyan-300'
            }`}
            title="Simulate 5km IMBL Border Proximity Alert"
          >
            <span className="text-xs">🛡️</span>
            <span className="scale-75 origin-center font-black">ORCA</span>
          </button>
        </div>

        {/* FLOATING LAYER TOGGLE CONTROL (Top Right) */}
        <div className="absolute top-3 right-3 z-[25]">
          <button
            onClick={() => setActiveLeftDrawer(activeLeftDrawer === 'layers' ? null : 'layers')}
            className={`px-3 py-1.5 rounded-xl backdrop-blur-md border text-xs font-mono font-bold flex items-center gap-1.5 shadow-xl transition-all ${
              activeLeftDrawer === 'layers'
                ? 'bg-cyan-500 text-white border-cyan-300'
                : 'bg-[#020e1f]/90 text-cyan-300 border-cyan-500/40 hover:border-cyan-300'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GIS Layers</span>
          </button>
        </div>

        {/* LAYERS DRAWER FLYOUT */}
        {activeLeftDrawer === 'layers' && (
          <div className="absolute top-12 right-3 z-[30] w-64 rounded-2xl bg-[#020e1f]/95 border border-cyan-500/40 p-3 shadow-2xl backdrop-blur-2xl text-xs space-y-2.5 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5 text-cyan-300 font-mono font-bold uppercase text-[10px]">
              <span>Maritime GIS Layers</span>
              <button onClick={() => setActiveLeftDrawer(null)} className="text-slate-400 hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center justify-between text-slate-200 cursor-pointer hover:text-white">
                <span className="flex items-center gap-2">
                  <Anchor className="w-3.5 h-3.5 text-cyan-400" /> Indian Ports
                </span>
                <input
                  type="checkbox"
                  checked={layerVisibility.ports}
                  onChange={(e) => setLayerVisibility({ ...layerVisibility, ports: e.target.checked })}
                  className="rounded border-slate-700 text-cyan-500 focus:ring-cyan-500"
                />
              </label>

              <label className="flex items-center justify-between text-slate-200 cursor-pointer hover:text-white">
                <span className="flex items-center gap-2">
                  <Fish className="w-3.5 h-3.5 text-emerald-400" /> PFZ Fishing Zones
                </span>
                <input
                  type="checkbox"
                  checked={layerVisibility.pfz}
                  onChange={(e) => setLayerVisibility({ ...layerVisibility, pfz: e.target.checked })}
                  className="rounded border-slate-700 text-cyan-500 focus:ring-cyan-500"
                />
              </label>

              <label className="flex items-center justify-between text-slate-200 cursor-pointer hover:text-white">
                <span className="flex items-center gap-2">
                  <Waves className="w-3.5 h-3.5 text-teal-400" /> Sheltered Safe Bays
                </span>
                <input
                  type="checkbox"
                  checked={layerVisibility.safeZones}
                  onChange={(e) => setLayerVisibility({ ...layerVisibility, safeZones: e.target.checked })}
                  className="rounded border-slate-700 text-cyan-500 focus:ring-cyan-500"
                />
              </label>

              <label className="flex items-center justify-between text-slate-200 cursor-pointer hover:text-white">
                <span className="flex items-center gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400" /> Rough Waves & Cyclone
                </span>
                <input
                  type="checkbox"
                  checked={layerVisibility.dangerZones}
                  onChange={(e) => setLayerVisibility({ ...layerVisibility, dangerZones: e.target.checked })}
                  className="rounded border-slate-700 text-cyan-500 focus:ring-cyan-500"
                />
              </label>

              <label className="flex items-center justify-between text-slate-200 cursor-pointer hover:text-white">
                <span className="flex items-center gap-2">
                  <ShieldAlert className="w-3.5 h-3.5 text-pink-400" /> IMBL Border Geofence
                </span>
                <input
                  type="checkbox"
                  checked={layerVisibility.geofence}
                  onChange={(e) => setLayerVisibility({ ...layerVisibility, geofence: e.target.checked })}
                  className="rounded border-slate-700 text-cyan-500 focus:ring-cyan-500"
                />
              </label>

              <label className="flex items-center justify-between text-slate-200 cursor-pointer hover:text-white">
                <span className="flex items-center gap-2">
                  <Ship className="w-3.5 h-3.5 text-amber-400" /> AIS Live Vessels
                </span>
                <input
                  type="checkbox"
                  checked={layerVisibility.vessels}
                  onChange={(e) => setLayerVisibility({ ...layerVisibility, vessels: e.target.checked })}
                  className="rounded border-slate-700 text-cyan-500 focus:ring-cyan-500"
                />
              </label>

              <label className="flex items-center justify-between text-slate-200 cursor-pointer hover:text-white">
                <span className="flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-yellow-400" /> Shipping Routes & Passage
                </span>
                <input
                  type="checkbox"
                  checked={layerVisibility.routes}
                  onChange={(e) => setLayerVisibility({ ...layerVisibility, routes: e.target.checked })}
                  className="rounded border-slate-700 text-cyan-500 focus:ring-cyan-500"
                />
              </label>

              <label className="flex items-center justify-between text-slate-200 cursor-pointer hover:text-white">
                <span className="flex items-center gap-2">
                  <Wind className="w-3.5 h-3.5 text-sky-400" /> Currents & Wind Stations
                </span>
                <input
                  type="checkbox"
                  checked={layerVisibility.weather}
                  onChange={(e) => setLayerVisibility({ ...layerVisibility, weather: e.target.checked })}
                  className="rounded border-slate-700 text-cyan-500 focus:ring-cyan-500"
                />
              </label>
            </div>

            {/* SST & Chlorophyll Data Layer Status */}
            <div className="pt-2 border-t border-white/10 text-[10px] font-mono text-cyan-300/80 space-y-1">
              <div>SST Sensor: <strong>{marineDatasets.overlays.sstInfo.sensor}</strong></div>
              <div>Chlorophyll: <strong>{marineDatasets.overlays.chlorophyllInfo.meanMgM3} mg/m³</strong></div>
            </div>
          </div>
        )}

        {/* BOTTOM LEFT CLASSIFICATION LEGEND */}
        <div className="absolute bottom-4 left-3 z-[25] bg-[#020e1f]/90 backdrop-blur-md p-2.5 rounded-xl border border-cyan-500/30 text-[10px] font-mono space-y-1 hidden md:block select-none shadow-xl">
          <div className="font-bold text-cyan-300 tracking-wider mb-1">MoPSW / PMMSY CADASTRE</div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-slate-300">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#06b6d4]" /> Major Ports (12)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" /> Commercial Ports
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f97316]" /> Fishing Harbours
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444] animate-pulse" /> IMBL Danger (&lt;5km)
            </span>
          </div>
        </div>

        {/* RIGHT PANEL: SELECTED PORT TELEMETRY DOSSIER */}
        {activeRightPanelPort && (
          <MaritimeRightPanel
            port={activeRightPanelPort}
            onClose={() => setActiveRightPanelPort(null)}
            onCenterPort={(port) => {
              jumpToRegion([port.lat, port.lng], 12);
            }}
            onZoomToBerths={(port) => {
              jumpToRegion([port.lat, port.lng], 14);
            }}
            coordFormat={coordFormat}
            speedUnit={speedUnit}
            language={language}
          />
        )}

      </div>

      {/* 4. BOTTOM HUD BAR (Telemetry, Coordinates, Datum) */}
      <div className="z-20 bg-[#020e1f]/95 backdrop-blur-xl px-3 sm:px-4 py-2 border-t border-cyan-500/30 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-300">
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          <div className="flex items-center gap-1.5 text-cyan-300">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span>
              WGS-84: <strong>{coordFormat === 'dms' ? formatNauticalCoords(cursorCoords.lat, cursorCoords.lng) : `${cursorCoords.lat.toFixed(4)}° N, ${cursorCoords.lng.toFixed(4)}° E`}</strong>
            </span>
          </div>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <div className="hidden sm:block text-slate-400">
            Projection: <strong>Web Mercator (EPSG:3857)</strong>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 text-xs">
          <div>
            Zoom: <strong className="text-cyan-300">Z{currentZoom} {currentZoom <= 7 ? '(Clustered)' : '(Individual Ports)'}</strong>
          </div>
          <span className="text-slate-600">|</span>
          <div>
            Base: <strong className="text-slate-200 uppercase">{baseMapType}</strong>
          </div>
          <span className="text-slate-600">|</span>
          <div className="text-emerald-400 font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>OpenStreetMap Engine</span>
          </div>
        </div>
      </div>
    </div>
  );
};
