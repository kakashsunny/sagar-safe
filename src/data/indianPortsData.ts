import { IndianPort } from '../types/marine';
import { MAJOR_PORTS } from './ports/majorPorts';
import { NON_MAJOR_PORTS } from './ports/nonMajorPorts';
import { FISHING_FACILITIES } from './ports/fishingFacilities';
import { OIL_LNG_TERMINALS } from './ports/oilLngTerminals';

export { MAJOR_PORTS, NON_MAJOR_PORTS, FISHING_FACILITIES, OIL_LNG_TERMINALS };

// ============================================================================
// VERIFIED INDIAN MARITIME LOCATIONS DATASET
// Official Government Sources:
// 1. Ministry of Ports, Shipping and Waterways (MoPSW) - 12 Operational Major Ports
// 2. State Maritime Boards (GMB, APMB, OMB, TNMB, VISL, A&N PMB) - Verified Non-Major Ports
// 3. Department of Fisheries, Govt. of India (PMMSY) / CMFRI - Fishing Harbours & Landing Centres
// 4. Petroleum and Natural Gas Regulatory Board (PNGRB) - Dedicated Oil & LNG Terminals
//
// DATA INTEGRITY NOTE:
// - No demo, fictional, or placeholder ports are included.
// - Port codes (UN/LOCODE) are provided ONLY when verified by official registries.
// - Purely fishing harbours and fish landing centres do not have fake UN/LOCODEs.
// ============================================================================

export const ALL_INDIAN_PORTS: IndianPort[] = [
  ...MAJOR_PORTS,
  ...NON_MAJOR_PORTS,
  ...FISHING_FACILITIES,
  ...OIL_LNG_TERMINALS
];

/** Set of official IDs for the 12 operational Major Ports */
export const MAJOR_PORT_IDS = new Set<string>([
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

export const OPERATIONAL_MAJOR_PORTS_COUNT = 12;

/**
 * Filter helper by official facility category.
 * A facility may belong to more than one category when officially applicable.
 */
export function getPortsByCategory(
  category: string,
  ports: IndianPort[] = ALL_INDIAN_PORTS
): IndianPort[] {
  if (!category || category === 'All' || category === 'All Ports' || category === 'Featured Locations') {
    return ports;
  }

  return ports.filter(p => {
    if (p.facilityType === category) return true;
    if (p.facilityCategories && p.facilityCategories.includes(category)) return true;
    if (p.detailedType === category) return true;
    return false;
  });
}

/**
 * Search across verified port names, states, authorities, facility types, and verified port codes.
 */
export function searchPorts(query: string, ports: IndianPort[] = ALL_INDIAN_PORTS): IndianPort[] {
  if (!query || !query.trim()) return ports;
  const q = query.toLowerCase().trim();

  return ports.filter(p => {
    const nameMatch = p.name.toLowerCase().includes(q);
    const codeMatch = p.portCode ? p.portCode.toLowerCase().includes(q) : false;
    const stateMatch = p.state.toLowerCase().includes(q);
    const authorityMatch = p.authority ? p.authority.toLowerCase().includes(q) : false;
    const sourceMatch = p.officialSource ? p.officialSource.toLowerCase().includes(q) : false;
    const typeMatch = p.facilityType ? p.facilityType.toLowerCase().includes(q) : false;
    const detailedTypeMatch = p.detailedType ? p.detailedType.toLowerCase().includes(q) : false;
    const categoryMatch = p.facilityCategories
      ? p.facilityCategories.some(c => c.toLowerCase().includes(q))
      : false;
    const cargoMatch = p.cargoTypes ? p.cargoTypes.some(c => c.toLowerCase().includes(q)) : false;

    return (
      nameMatch ||
      codeMatch ||
      stateMatch ||
      authorityMatch ||
      sourceMatch ||
      typeMatch ||
      detailedTypeMatch ||
      categoryMatch ||
      cargoMatch
    );
  });
}

/**
 * Retrieve unique represented States & Union Territories from the dataset
 */
export function getRepresentedStates(ports: IndianPort[] = ALL_INDIAN_PORTS): string[] {
  const stateSet = new Set<string>();
  ports.forEach(p => {
    if (p.state) stateSet.add(p.state);
  });
  return Array.from(stateSet).sort();
}
