# 🌊 SAGAR-SAFE AI — UI / UX Architecture & Design System Documentation

[![React](https://img.shields.io/badge/React-18.3+-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.0+-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Lucide Icons](https://img.shields.io/badge/Icons-Lucide_React-F97316)](https://lucide.dev/)
[![Multilingual](https://img.shields.io/badge/Languages-10_Indian_Languages-10B981)](#-10-language-multilingual-localization-system)

---

## 📌 UI Architecture & Documentation Index

1. [UI Design Philosophy & Theme](#-ui-design-philosophy--theme)
2. [Visual Styling & Glassmorphism Shader Engine](#-visual-styling--glassmorphism-shader-engine)
3. [Responsive Navigation Architecture (`Navbar.tsx` & `MobileBottomNav.tsx`)](#-responsive-navigation-architecture)
4. [Hero Section & Command Console (`HeroSection.tsx`)](#-hero-section--command-console)
5. [Component Hierarchy & Application Routing](#-component-hierarchy--application-routing)
6. [Comprehensive Page-by-Page Breakdown](#-comprehensive-page-by-page-breakdown)
   - [1. Mission Command Dashboard (`/`)](#1-mission-command-dashboard-)
   - [2. Interactive Ocean Map (`/map`)](#2-interactive-ocean-map-map)
   - [3. National Ports & Harbours Directory (`/ports`)](#3-national-ports--harbours-directory-ports)
   - [4. Potential Fishing Zones (PFZ) & Marine Ecology (`/pfz`)](#4-potential-fishing-zones-pfz--marine-ecology-pfz)
   - [5. Marine Weather & Synoptic Radar (`/weather`)](#5-marine-weather--synoptic-radar-weather)
   - [6. Satellite Dispatches & Marine News (`/news`)](#6-satellite-dispatches--marine-news-news)
   - [7. Data Trust & Telemetry Verification Center (`/sources`)](#7-data-trust--telemetry-verification-center-sources)
7. [Modals, Drawers & Interactive Dialogs](#-modals-drawers--interactive-dialogs)
   - [🚨 SOS Maritime Distress & Mayday Relay (`SosDistressModal.tsx`)](#-sos-maritime-distress--mayday-relay)
   - [📍 Smart Location Selector & GPS Auto-Fix (`LocationSelectorModal.tsx`)](#-smart-location-selector--gps-auto-fix)
   - [⚠️ Coastal Alerts & Cyclone Center Drawer (`AlertCenterDrawer.tsx`)](#-coastal-alerts--cyclone-center-drawer)
   - [⚙️ System & Audio Settings Modal (`SettingsModal.tsx`)](#-system--audio-settings-modal)
   - [📜 Historical Mission Log Modal (`HistoryModal.tsx`)](#-historical-mission-log-modal)
   - [🛰️ Telemetry Deep Source Inspector Modal (`SourceDetailModal.tsx`)](#-telemetry-deep-source-inspector-modal)
8. [Atmospheric Marine Layers & Sound Synthesis](#-atmospheric-marine-layers--sound-synthesis)
   - [🐟 Animated Marine Fauna & Eco-Sonar HUD (`InteractiveMarineLife.tsx`)](#-animated-marine-fauna--eco-sonar-hud)
   - [🫧 Microscopic Ambient Ocean Bubbles (`InteractiveOceanBubbles.tsx`)](#-microscopic-ambient-ocean-bubbles)
   - [🔊 Web Audio Cavitation Pop Synthesizer (`bubbleAudio.ts`)](#-web-audio-cavitation-pop-synthesizer)
9. [10-Language Multilingual Localization System](#-10-language-multilingual-localization-system)
10. [Responsive Design & Mobile Accessibility Standards](#-responsive-design--mobile-accessibility-standards)
11. [Complete UI Component File Directory](#-complete-ui-component-file-directory)

---

## 🎨 UI Design Philosophy & Theme

The user interface of **SAGAR-SAFE AI** is designed around the concept of an **"Ocean Glass Command Bridge"** — merging the precision of aerospace avionics HUDs with the organic depth of deep-sea bathymetry.

### Core Visual Principles
1. **Safety-First Chromatic Semantics**:
   - 🟢 **Emerald / Teal (`#10B981` / `#06B6D4`)**: Normal operational status, optimal sea state ($H_s < 1.5\text{ m}$), favorable pelagic fish aggregation.
   - 🟡 **Amber / Gold (`#F59E0B` / `#FBBF24`)**: Cautionary swell period, moderate wind chop ($18-24\text{ kn}$), marginal small-craft threshold.
   - 🔴 **Crimson / Rose (`#EF4444` / `#F43F5E`)**: Critical gale hazard, breaking ocean swell ($>2.5\text{ m}$), active IMD cyclone warning, mandatory harbour stay.
2. **Zero Information Clutter & Progressive Disclosure**:
   - Instant Go / No-Go operational verdict at the top.
   - Scientific telemetry drill-downs (SST contours, chlorophyll-$a$, barometric pressure, wind vectors) available on demand without obstructing navigation.
3. **High Daylight & Night-Bridge Contrast**:
   - Deep navy / abyssal base (`#020b16`, `#03152d`) paired with crisp cyan highlights and pure white typography (`WCAG AAA` compliant).

---

## 🔮 Visual Styling & Glassmorphism Shader Engine

All visual components utilize custom CSS glassmorphism classes declared in `src/index.css`:

```css
/* Glassmorphism Tier 1: Primary Control Panels */
.ocean-glass {
  background: rgba(8, 25, 45, 0.72);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(56, 189, 248, 0.22);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}

/* Glassmorphism Tier 2: Micro-Cards & Badges */
.ocean-glass-subtle {
  background: rgba(10, 30, 55, 0.5);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(56, 189, 248, 0.12);
}

/* Glassmorphism Tier 3: Floating Interactive Highlights */
.ocean-glass-hover {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.ocean-glass-hover:hover {
  background: rgba(14, 45, 80, 0.85);
  border-color: rgba(56, 189, 248, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 12px 40px -10px rgba(6, 182, 212, 0.3);
}
```

---

## 🧭 Responsive Navigation Architecture

The navigation system provides seamless ergonomics across mobile devices, tablets, and wide desktop displays.

### Top Floating Glass Navbar (`src/components/Navbar.tsx`)
- **Brand Lockup**: Animated wave icon with live system status indicator (`SYSTEM: LIVE`).
- **Responsive Breakpoint Design**:
  - **Mobile (`< 640px`)**:
    - Compact logo and typography.
    - Automatic truncation of port names (`max-w-[85px] xs:max-w-[115px] sm:max-w-[150px]`).
    - Compact touch-friendly utility buttons (SOS, Alerts, Language, Settings, Demo switch).
    - Dedicated hamburger menu button (`btn-nav-mobile-menu`) revealing a glass dropdown navigation grid.
  - **Tablet (`640px – 1023px`)**:
    - Full brand title and telemetry icons.
    - Hamburger drawer for secondary sections with 4-column link layout.
  - **Desktop (`≥ 1024px`, `lg:flex`)**:
    - Centered glass navigation capsule with primary links: **Dashboard**, **Map**, **Ports**, **PFZ Zones**, **Weather**.
    - Responsive "More" dropdown on `lg` screens for **News** and **Trust** sections.
    - Full expansion of all 7 navigation tabs on `xl+` screens.
- **Clean Utility Controls**:
  - **Location Switcher**: Direct access to port selection modal with active port label.
  - **Maritime SOS**: One-click distress trigger with pulsed visual beacon.
  - **Alerts Drawer Trigger**: Bell/Shield button with pulsing numeric critical alert badge.
  - **Language Selector**: Instant 10-language Indian coastal localization menu.
  - **Settings Modal Trigger**: Audio pop volume, preview, and effervescence density controls.
  - **Demo Mode Switch**: Instant toggle between synthetic SIH demo benchmark data and live satellite feeds.
  - **Streamlined Design**: Free of non-essential visual clutter or bubble controls for a clean utility experience.

### Mobile Bottom Action Bar (`src/components/MobileBottomNav.tsx`)
- **Breakpoint**: Active on screens $< 1024\text{px}$ (`lg:hidden`).
- **3-Second Hold SOS Beacon**:
  - Prevents accidental emergency calls via a tactile 3-second hold gesture.
  - Circular SVG progress ring with millisecond countdown and haptic vibration feedback (`navigator.vibrate`).
- **Quick Tabs**: Direct mobile touch access to Home (`/`), Map (`/map`), Ports (`/ports`), PFZ (`/pfz`), Weather (`/weather`), and Alerts.

---

## ⚡ Hero Section & Command Console

Located in `src/components/HeroSection.tsx`:

1. **Satellite & Data Stream Status Strip**:
   - Real-time status indicators for **ISRO** (Live), **INCOIS** (Synced), **IMD** (Active), and active coastal sector.
   - Gentle pulsing LED status dots.
2. **Centered High-Impact Typography**:
   - Display headline: *"KNOW THE SEA. FIND OPPORTUNITY. STAY SAFE."*
   - Clean, uncluttered layout without extraneous badge pills or floating obstructions.
3. **Simplified Decision Card (Go / Caution / No-Go)**:
   - High-contrast decision banner with dynamic color coding:
     - 🟢 *FAVORABLE: Optimal Sea State & High Fish Aggregation*
     - 🟡 *CAUTION: Moderate Swell / Marginal Small-Craft Window*
     - 🔴 *UNSAFE: Gale Wind Shear or High Swell ($> 2.5\text{ m}$) — Return to Harbour*
   - Hard safety override flag: Explicitly informs the crew if weather hazards supersede high fish aggregation.
4. **Natural Language Query Console**:
   - Direct query input with voice recognition support.
   - Benchmark prompt chips (*"Monsoon squall test"*, *"SST thermal fronts"*, *"Fuel efficiency"*).

---

## 🗺️ Component Hierarchy & Application Routing

```
App (src/App.tsx)
 ├── BackgroundOcean (src/components/BackgroundOcean.tsx)
 ├── InteractiveMarineLife (src/components/InteractiveMarineLife.tsx)
 ├── InteractiveOceanBubbles (src/components/InteractiveOceanBubbles.tsx)
 ├── InteractiveOceanBubbleWidget (src/components/InteractiveOceanBubbleWidget.tsx)
 ├── Navbar (src/components/Navbar.tsx)
 │    ├── Brand Logo & Operational Status
 │    ├── Responsive Center Nav Links (Desktop)
 │    ├── Mobile Hamburger Dropdown Menu (Mobile/Tablet)
 │    ├── Location Switcher Trigger
 │    ├── Emergency SOS Distress Trigger
 │    ├── Active Marine Alerts Trigger
 │    ├── 10-Language Selector Dropdown
 │    ├── System & Audio Settings Trigger
 │    └── Live vs Demo Feed Toggle
 │
 ├── Main Content Router (<Routes>)
 │    ├── `/`        -> DashboardPage (src/pages/DashboardPage.tsx)
 │    ├── `/map`     -> MapPage (src/pages/MapPage.tsx)
 │    ├── `/ports`   -> PortsDirectoryPage (src/pages/PortsDirectoryPage.tsx)
 │    ├── `/pfz`     -> PfzEcologyPage (src/pages/PfzEcologyPage.tsx)
 │    ├── `/weather` -> MarineWeatherPage (src/pages/MarineWeatherPage.tsx)
 │    ├── `/news`    -> NewsPage (src/pages/NewsPage.tsx)
 │    └── `/sources` -> SourcesTrustPage (src/pages/SourcesTrustPage.tsx)
 │
 ├── MobileBottomNav (src/components/MobileBottomNav.tsx)
 ├── LocationSelectorModal (src/components/LocationSelectorModal.tsx)
 ├── AlertCenterDrawer (src/components/AlertCenterDrawer.tsx)
 ├── SettingsModal (src/components/SettingsModal.tsx)
 ├── HistoryModal (src/components/HistoryModal.tsx)
 ├── SourceDetailModal (src/components/SourceDetailModal.tsx)
 └── SosDistressModal (src/components/SosDistressModal.tsx)
```

---

## 📄 Comprehensive Page-by-Page Breakdown

### 1. Mission Command Dashboard (`/`)
* **File**: `src/pages/DashboardPage.tsx`
* **Purpose**: Primary mission command deck providing instantaneous vessel go/no-go verdicts, live ocean physics, multi-agent AI execution traces, and explainability.
* **Key Components**:
  - `HeroSection.tsx`: Command headline, live telemetry strip, and query console.
  - `DecisionRevealCard.tsx`: Multi-factor composite verdict with safety override badge and audio playback.
  - `LiveIntelligenceCards.tsx`: 5 floating telemetry glass cards (SST front delta, wave height $H_s$, wind velocity, PFZ chlorophyll, tide/current).
  - `AgentActivityPipeline.tsx`: 9-stage sequential reasoning pipeline showing the live status of specialized AI agents.
  - `ExplainabilityCard.tsx`: Scientific justification detailing thresholds and positive/negative indicators.

### 2. Interactive Ocean Map (`/map`)
* **Files**: `src/pages/MapPage.tsx` & `src/components/OceanMap.tsx`
* **Purpose**: Geospatial digital twin of the Indian Ocean, Arabian Sea, and Bay of Bengal.
* **Key Features**:
  - High-precision SVG basemap covering India's mainland and island territories (Lakshadweep, Andaman & Nicobar).
  - **Dynamic Overlays**: PFZ thermal fronts, surface current vector arrows, animated wind drift streamlines, port nodes, and cyclone hazard danger zones.
  - One-click port inspection: Clicking any port node snaps the active location and refreshes all localized predictions.

### 3. National Ports & Harbours Directory (`/ports`)
* **Files**: `src/pages/PortsDirectoryPage.tsx` & `src/components/MarineLocationsList.tsx`
* **Purpose**: Encyclopedic registry of 50+ ports and landing centres spanning India's **7,516+ km coastline**.
* **Key Features**:
  - Category filters: Major Commercial Ports (JNPA, Deendayal, Cochin, Vizag, Chennai, Paradip, etc.), State Maritime Boards (GMB, MMB, KMB, TNMB, APMB), and Fishing Harbours (Malpe, Sassoon Docks, Kasimedu, Munambam).
  - State-by-state filtering across 9 coastal states and 2 island territories.
  - Port metric cards displaying channel draft (m), berths, cargo capacity, VHF channels, and primary target catch.

### 4. Potential Fishing Zones (PFZ) & Marine Ecology (`/pfz`)
* **File**: `src/pages/PfzEcologyPage.tsx`
* **Purpose**: Satellite-derived pelagic fish aggregation intelligence based on ISRO Oceansat-3 OCM and INCOIS thermal models.
* **Key Features**:
  - Thermal front and chlorophyll-$a$ upwelling convergence zones.
  - Target species taxonomy: Indian Mackerel (*Rastrelliger kanagurta*), Yellowfin Tuna (*Thunnus albacares*), Silver Pomfret (*Pampus argenteus*), Oil Sardine (*Sardinella longiceps*).
  - Compass heading ($^\circ$) and distance (NM/km) from local landing centres.
  - Diesel fuel-saver trajectory calculator (estimating $18-35\%$ fuel reduction).

### 5. Marine Weather & Synoptic Radar (`/weather`)
* **File**: `src/pages/MarineWeatherPage.tsx`
* **Purpose**: Synoptic meteorological console integrating IMD coastal radars and offshore Automated Weather Stations (AWS).
* **Key Features**:
  - Beaufort Wind Force scale gauge with gust projections.
  - Barometric pressure trend chart (early cyclone depression warning $< 1000\text{ hPa}$).
  - Swell period, wave steepness, and small craft advisory limits.
  - 3-day marine operational outlook.

### 6. Satellite Dispatches & Marine News (`/news`)
* **Files**: `src/pages/NewsPage.tsx` & `src/components/MarineNewsBulletin.tsx`
* **Purpose**: Real-time ocean intelligence dispatches, coastal infrastructure updates, and maritime safety bulletins.
* **Key Features**:
  - Pulsing breaking alert ticker for urgent IMD/INCOIS notices.
  - Agency filters: INCOIS, IMD, CMFRI, Indian Coast Guard, MoPSW.
  - Actionable captain takeaways (`⚡ TAKEAWAY`) for fuel savings, safety gear, and catch conservation.
  - Full article read modal with citations and sharing.

### 7. Data Trust & Telemetry Verification Center (`/sources`)
* **Files**: `src/pages/SourcesTrustPage.tsx` & `src/components/DataTrustCenter.tsx`
* **Purpose**: Transparency and calibration center detailing data provenance, satellite instruments, and sensor health.
* **Key Features**:
  - Sensor registry: Oceansat-3 OCM-3, INSAT-3DR, SCATSAT, Coastal Wave Rider Buoys, and Coastal Doppler Radars.
  - Live calibration telemetry: latency, confidence level ($95\%+$), and direct links to official Ministry portals.

---

## 🪟 Modals, Drawers & Interactive Dialogs

### 🚨 SOS Maritime Distress & Mayday Relay
* **File**: `src/components/SosDistressModal.tsx`
* **Features**:
  - **Synthesized Dual-Tone Siren**: Browser Web Audio marine alarm ($880\text{ Hz} \to 660\text{ Hz}$) with immediate mute/stop control.
  - **Automated VHF Mayday Script**: Pre-formatted standard maritime script containing vessel ID, coordinates, emergency category, and crew count.
  - **Direct MRCC Dialing**: Fast links to Indian Coast Guard Maritime Rescue Coordination Centres (Toll-Free `1554` & Regional Centres: Mumbai, Kochi, Chennai, Port Blair).
  - **Dispatch Sync**: Emits emergency beacon payload to `/api/sos/broadcast`.

### 📍 Smart Location Selector & GPS Auto-Fix
* **File**: `src/components/LocationSelectorModal.tsx`
* **Features**:
  - Real-time search across all 50+ ports and landing centres.
  - Filter chips by port classification and state.
  - GPS browser geolocation auto-detection with nearest coastal port snapping.

### ⚠️ Coastal Alerts & Cyclone Center Drawer
* **File**: `src/components/AlertCenterDrawer.tsx`
* **Features**:
  - Slide-out glass drawer listing active IMD and INCOIS marine warnings.
  - Filterable by severity (`CRITICAL`, `CAUTION`, `INFO`).
  - Lists affected coastlines, valid time windows, and mandatory safety actions.

### ⚙️ System & Audio Settings Modal
* **File**: `src/components/SettingsModal.tsx`
* **Features**:
  - Mute / Unmute toggle for interactive sound effects.
  - "Preview Pop" audio test button.
  - Bubble scale adjustment: *Very Tiny (4–8px)* vs *Tiny (6–10px)*.
  - Bubble density modes: *Gentle (12)*, *Normal (18)*, and *Surge (32)*.
  - Persistent storage in browser `localStorage`.

### 📜 Historical Mission Log Modal
* **File**: `src/components/HistoryModal.tsx`
* **Features**:
  - Session history of past oceanographic queries and Go/No-Go decisions.
  - One-click reload to re-run past mission parameters.

### 🛰️ Telemetry Deep Source Inspector Modal
* **File**: `src/components/SourceDetailModal.tsx`
* **Features**:
  - Detailed sensor specifications: satellite instrument, orbital cycle, sensor type, resolution, and physics equations.

---

## 🫧 Atmospheric Marine Layers & Sound Synthesis

### 🐟 Animated Marine Fauna & Eco-Sonar HUD
* **File**: `src/components/InteractiveMarineLife.tsx`
* **Performance**: Hardware-accelerated CSS3 transforms (`translate3d`) delivering smooth 60 FPS animation without canvas overhead.
* **Species Represented**:
  - 🌊 Giant Manta Ray (*Manta birostris*)
  - 🐟 Pelagic Indian Mackerel School (*Rastrelliger kanagurta*)
  - 🐙 Bioluminescent Jellyfish (*Aurelia aurita*)
  - 🐢 Olive Ridley Sea Turtle (*Lepidochelys olivacea*)
  - ⚡ Skipjack Tuna (*Katsuwonus pelamis*)
* **Eco-Sonar HUD**: Hovering over any creature reveals its taxonomy, habitat depth, and ecological role. Clicking triggers a sonar ripple effect.

### 🫧 Microscopic Ambient Ocean Bubbles
* **File**: `src/components/InteractiveOceanBubbles.tsx`
* **Architecture**:
  - **Ultra-Fine Scale**: Bubbles are rendered at micro diameters (**4px to 8px**) for subtle effervescence.
  - **Stacking Isolation**: Pinned strictly to the background layer (`z-0`), ensuring functional cards (`z-10`) are never obstructed.
  - **Hero Zone Protection**: Bubbles automatically dissolve before entering the top hero section when viewing the upper page, preserving a clean headline view.
  - **Touch Ergonomics**: A 24px invisible hit area surrounds each micro bubble for comfortable, accurate popping on mobile touchscreens and desktop cursors.

### 🔊 Web Audio Cavitation Pop Synthesizer
* **File**: `src/utils/bubbleAudio.ts`
* **Implementation**:
  - Zero-asset, zero-latency Web Audio API synthesis.
  - Organic frequency-swept sine wave with exponential decay envelope and resonant bandpass filtering.
  - Pitch scales dynamically with bubble size (smaller bubbles produce higher, delicate water chimes; larger ones emit soft droplet pops).
  - Complete user mute control accessible from the Settings modal and floating bubble capsule.

---

## 🌐 10-Language Multilingual Localization System

Integrated in `src/data/i18nTranslations.ts`:

| Code | Language | Coastal Regions Covered |
| :---: | :---: | :---: |
| `en` | English | Pan-India / International Maritime |
| `hi` | हिन्दी (Hindi) | National Maritime, Mumbai, Kandla |
| `kn` | ಕನ್ನಡ (Kannada) | Mangaluru, Malpe, Karwar, Tadadi |
| `ml` | മലയാളം (Malayalam) | Kochi, Munambam, Beypore, Kollam, Vizhinjam |
| `ta` | தமிழ் (Tamil) | Chennai, Kasimedu, Cuddalore, Tuticorin, Kanyakumari |
| `te` | తెలుగు (Telugu) | Visakhapatnam, Kakinada, Krishnapatnam, Machilipatnam |
| `mr` | मराठी (Marathi) | Mumbai, Sassoon Docks, JNPA, Ratnagiri, Jaigad |
| `gu` | ગુજરાતી (Gujarati) | Veraval, Porbandar, Kandla, Mundra, Pipavav |
| `bn` | বাংলা (Bengali) | Kolkata, Haldia, Digha, Shankarpur, Sundarbans |
| `od` | ଓଡ଼ିଆ (Odia) | Paradip, Dhamra, Gopalpur, Chandipur |

---

## 📱 Responsive Design & Mobile Accessibility Standards

- **Touch Ergonomics**: All interactive buttons, chips, and modals maintain minimum touch targets of **44px × 44px**.
- **Adaptive Layout**:
  - Fluid mobile-first padding (`px-2 sm:px-4 md:px-6`).
  - Dynamic text truncation for location labels to prevent horizontal overflow on narrow displays (320px – 375px).
  - Responsive hamburger drawer on mobile/tablet alongside sticky bottom action bar (`MobileBottomNav.tsx`).
- **Accessibility**:
  - High daylight contrast ratios adhering to **WCAG AAA** standards.
  - Color-blind safety indicators (combining chromatic color, text labels, and geometric icons for Go/Caution/No-Go decisions).
  - Screen-reader accessible ARIA labels on all utility buttons.

---

## 📁 Complete UI Component File Directory

| Component / Module | File Path | Functional Description |
| :--- | :--- | :--- |
| **Top Navbar** | `src/components/Navbar.tsx` | Responsive glass header with brand, nav links, hamburger menu, and utilities |
| **Mobile Bottom Bar** | `src/components/MobileBottomNav.tsx` | Touch-optimized dock with 3-second hold SOS distress beacon |
| **Hero Console** | `src/components/HeroSection.tsx` | Live telemetry status strip, headline, query input, and quick chips |
| **Decision HUD** | `src/components/DecisionRevealCard.tsx` | Composite safety verdict, override flags, and voice broadcast |
| **Telemetry Cards** | `src/components/LiveIntelligenceCards.tsx` | Live SST, Wave Height, Wind, PFZ, and Tide glass cards |
| **Agent Pipeline** | `src/components/AgentActivityPipeline.tsx` | 9-stage sequential multi-agent execution pipeline |
| **Explainability** | `src/components/ExplainabilityCard.tsx` | Scientific rationale, threshold parameters, and physical indicators |
| **Interactive Map** | `src/components/OceanMap.tsx` | SVG digital twin with currents, winds, PFZ contours, and storm zones |
| **Ports Directory** | `src/components/MarineLocationsList.tsx` | National database of 50+ ports and fishing landing centres |
| **News & Bulletins** | `src/components/MarineNewsBulletin.tsx` | Satellite dispatches, breaking alert ticker, and captain takeaways |
| **Data Trust Center**| `src/components/DataTrustCenter.tsx` | Sensor registry, satellite provenance, and calibration feeds |
| **SOS Modal** | `src/components/SosDistressModal.tsx` | VHF Mayday generator, dual-tone siren, and MRCC direct dial |
| **Location Modal** | `src/components/LocationSelectorModal.tsx` | Coastal port directory with GPS auto-detection |
| **Alerts Drawer** | `src/components/AlertCenterDrawer.tsx` | Slide-out coastal gale and cyclone warning drawer |
| **Settings Modal** | `src/components/SettingsModal.tsx` | Audio mute, preview, and bubble density preferences |
| **History Modal** | `src/components/HistoryModal.tsx` | Previous query history log and one-click recall |
| **Source Modal** | `src/components/SourceDetailModal.tsx` | Deep sensor inspector with orbital and physics details |
| **Marine Fauna** | `src/components/InteractiveMarineLife.tsx` | Hardware-accelerated CSS3 marine species with eco-sonar HUD |
| **Micro Bubbles** | `src/components/InteractiveOceanBubbles.tsx` | Ambient physics micro-bubble canvas with Web Audio pop FX |
| **Bubble Capsule** | `src/components/InteractiveOceanBubbleWidget.tsx` | Floating HUD capsule with water telemetry and rapid pop-pad |
| **Ocean Waves** | `src/components/BackgroundOcean.tsx` | Ambient digital twin ocean background shaders |
| **Audio Synthesizer**| `src/utils/bubbleAudio.ts` | Zero-latency Web Audio cavitation pop synthesizer |
