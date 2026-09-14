import { AgentStep } from '../types/marine';

export interface TranslationDictionary {
  appTitle: string;
  tagline: string;
  heroLine1: string;
  heroLine2: string;
  heroLine3: string;
  heroSub: string;
  searchPlaceholder: string;
  btnAnalyze: string;
  btnAnalyzing: string;
  quickActionFish: string;
  quickActionOcean: string;
  quickActionWeather: string;
  quickActionAlerts: string;
  quickActionSafety: string;
  quickActionFishSub: string;
  quickActionOceanSub: string;
  quickActionWeatherSub: string;
  quickActionAlertsSub: string;
  quickActionSafetySub: string;
  tryPromptLabel: string;
  promptSafe: string;
  promptStorm: string;
  promptPfz: string;
  promptCochin: string;
  safetyTitle: string;
  fishingTitle: string;
  oceanTitle: string;
  windTitle: string;
  whyDecision: string;
  safetyOverrides: string;
  safetyOverrideDirective: string;
  safetyOverrideMsg: string;
  inlandMsg: string;
  exploreCoastal: string;
  dataTrustTitle: string;
  demoModeActive: string;
  liveDataBadge: string;
  demoDataBadge: string;
  canGoYes: string;
  canGoNo: string;
  canGoCaution: string;
  verdictQuestion: string;
  whyTitle: string;
  sosCallTitle: string;
  coastGuardCall: string;
  nationalEmergencyCall: string;
  coastalPoliceCall: string;
  fisheriesCellCall: string;
  reasonWaveSafe: string;
  reasonWaveHigh: string;
  reasonWindNormal: string;
  reasonWindGale: string;
  reasonFishGood: string;
  reasonNoStorm: string;
  reasonStormAlert: string;
  returnAdvice: string;
  navDashboard: string;
  navMap: string;
  navPorts: string;
  navPfz: string;
  navWeather: string;
  navNews: string;
  navTrust: string;
  navSos: string;
  navAlerts: string;
  navHistory: string;
  navLocation: string;
  systemOperational: string;
  liveFeeds: string;
  demoFeeds: string;
  isroStatus: string;
  incoisStatus: string;
  imdStatus: string;
  sectorStatus: string;
  metricWave: string;
  metricWind: string;
  metricFish: string;
  metricReturn: string;
  metricWaveSafeVal: string;
  metricWaveSafeDesc: string;
  metricWaveDangerVal: string;
  metricWaveDangerDesc: string;
  metricWindSafeVal: string;
  metricWindSafeDesc: string;
  metricWindDangerVal: string;
  metricWindDangerDesc: string;
  metricFishHighVal: string;
  metricFishHighDesc: string;
  metricReturnVal: string;
  metricReturnDesc: string;
  cardOcean: string;
  cardWeather: string;
  cardPfz: string;
  cardAlerts: string;
  sst: string;
  waveHeight: string;
  swell: string;
  currentSpeed: string;
  salinity: string;
  tideStatus: string;
  airTemp: string;
  windSpeed: string;
  windGust: string;
  pressure: string;
  humidity: string;
  uvIndex: string;
  targetFish: string;
  chlorophyllIndex: string;
  distanceOffshore: string;
  depth: string;
  validUntil: string;
  noActiveAlerts: string;
  viewAllAlerts: string;
  agentPipelineHeader: string;
  agentPipelineSub: string;
  decisionSynthesis: string;
  operationalDirective: string;
  decisionRationale: string;
  viewOnMap: string;
  confidence: string;
  statusLabel: string;
  potentialLabel: string;
  sectorLabel: string;
  favorableTitle: string;
  cautionTitle: string;
  dangerTitle: string;
  inlandTitle: string;
  favorableSummary: string;
  cautionSummary: string;
  dangerSummary: string;
  inlandSummary: string;
  footerPlatform: string;
  footerDataSources: string;
  footerProtocol: string;

  // Agent Pipeline Status Logs & Steps
  agentLocationName?: string;
  agentLocationLabel?: string;
  agentLocationRunning?: string;
  agentLocationCompleted?: string;

  agentPlannerName?: string;
  agentPlannerLabel?: string;
  agentPlannerRunning?: string;
  agentPlannerCompleted?: string;

  agentWeatherName?: string;
  agentWeatherLabel?: string;
  agentWeatherRunning?: string;
  agentWeatherCompleted?: string;

  agentOceanName?: string;
  agentOceanLabel?: string;
  agentOceanRunning?: string;
  agentOceanCompleted?: string;

  agentPfzName?: string;
  agentPfzLabel?: string;
  agentPfzRunning?: string;
  agentPfzCompleted?: string;

  agentSafetyName?: string;
  agentSafetyLabel?: string;
  agentSafetyRunning?: string;
  agentSafetyCompleted?: string;

  agentGeospatialName?: string;
  agentGeospatialLabel?: string;
  agentGeospatialRunning?: string;
  agentGeospatialCompleted?: string;

  agentDecisionName?: string;
  agentDecisionLabel?: string;
  agentDecisionRunning?: string;
  agentDecisionCompleted?: string;

  agentResponseName?: string;
  agentResponseLabel?: string;
  agentResponseRunning?: string;
  agentResponseCompleted?: string;

  // Pipeline summary & sync logs
  pipelineNodesSynced?: string;
  pipelineDistributedSub?: string;
  pipelineAwaitingStream?: string;

  // Detailed Report Descriptions
  reportSafetyOverrideDesc?: string;
  reportFavorableDetailed?: string;
  reportCautionDetailed?: string;
  reportDangerDetailed?: string;
  reportInlandDetailed?: string;
  reportTelemetryConfidenceDesc?: string;
  reportVesselSafetyDesc?: string;
  reportReturnWindowDesc?: string;
  reportFishAggregationDesc?: string;
}

export const I18N_TEXT: Record<string, TranslationDictionary> = {
  en: {
    appTitle: 'SAGAR-SAFE AI',
    tagline: 'Marine Intelligence & Safety',
    heroLine1: 'KNOW THE SEA.',
    heroLine2: 'FIND THE OPPORTUNITY.',
    heroLine3: 'STAY SAFE.',
    heroSub: 'AI-powered marine decision support combining ocean, weather, fishing and safety intelligence.',
    searchPlaceholder: 'Ask SAGAR AI about fishing, weather, sea conditions...',
    btnAnalyze: 'ANALYZE SEA',
    btnAnalyzing: 'ANALYZING...',
    quickActionFish: 'FISHING ZONES',
    quickActionOcean: 'CHECK OCEAN',
    quickActionWeather: 'MARINE WEATHER',
    quickActionAlerts: 'MARINE ALERTS',
    quickActionSafety: 'SAFETY CHECK',
    quickActionFishSub: 'Oceansat-3 PFZ zones',
    quickActionOceanSub: 'Waves & currents',
    quickActionWeatherSub: 'IMD coastal wind forecast',
    quickActionAlertsSub: 'Real-time warnings',
    quickActionSafetySub: 'Multi-factor verification',
    tryPromptLabel: 'Quick Scenarios:',
    promptSafe: 'Is it safe to fish tomorrow morning?',
    promptStorm: 'Check squall and storm warnings',
    promptPfz: 'Locate high catch PFZ zones',
    promptCochin: 'Check wave height & swell',
    safetyTitle: 'SAFETY',
    fishingTitle: 'FISHING POTENTIAL',
    oceanTitle: 'OCEAN STATE',
    windTitle: 'WIND SPEED',
    whyDecision: 'WHY THIS DECISION?',
    safetyOverrides: 'SAFETY OVERRIDES OPPORTUNITY',
    safetyOverrideDirective: 'MANDATORY DIRECTIVE',
    safetyOverrideMsg: 'High fish potential detected, but severe weather alert overrides operations. All small craft must remain in harbor.',
    inlandMsg: 'This location is inland. Marine fishing analysis is unavailable here.',
    exploreCoastal: 'Explore Coastal Areas',
    dataTrustTitle: 'DATA TRUST CENTER',
    demoModeActive: 'DEMO DATA — NOT FOR REAL-WORLD FISHING OR NAVIGATION',
    liveDataBadge: 'LIVE',
    demoDataBadge: 'DEMO DATA',
    canGoYes: 'CAN GO FISHING ✅',
    canGoNo: 'DO NOT GO TO SEA ❌',
    canGoCaution: 'GO WITH CAUTION ⚠️',
    verdictQuestion: 'CAN I GO TO SEA TODAY?',
    whyTitle: 'Clear Plain-Language Reasons (Why?)',
    sosCallTitle: 'EMERGENCY SOS CALL NUMBERS (1-TAP DIAL)',
    coastGuardCall: 'Coast Guard: 1554',
    nationalEmergencyCall: 'National Helpline: 112',
    coastalPoliceCall: 'Coastal Police: 1093',
    fisheriesCellCall: 'Fisheries Dept: 1077',
    reasonWaveSafe: 'Wave height is safe and low',
    reasonWaveHigh: 'High rough waves (>3.0m) — Boat capsize risk',
    reasonWindNormal: 'Surface wind speed is safe and normal',
    reasonWindGale: 'Strong storm gale wind warning (>45 km/h)',
    reasonFishGood: 'High fish aggregation in offshore PFZ sector',
    reasonNoStorm: 'No cyclone or squall warning in your sector',
    reasonStormAlert: 'IMD Severe Squall & Cyclone Alert active',
    returnAdvice: 'Safe return advised before 5:00 PM',
    navDashboard: 'Dashboard',
    navMap: 'Marine Map',
    navPorts: 'Ports Directory',
    navPfz: 'PFZ Zones',
    navWeather: 'Weather',
    navNews: 'Dispatches',
    navTrust: 'Data Trust',
    navSos: 'SOS Emergency',
    navAlerts: 'Hazard Alerts',
    navHistory: 'History',
    navLocation: 'Port Sector',
    systemOperational: 'SYSTEM: OPERATIONAL',
    liveFeeds: 'Live Data',
    demoFeeds: 'SIH Demo Benchmark',
    isroStatus: 'ISRO OCEANSAT-3: LIVE',
    incoisStatus: 'INCOIS OCEAN: SYNCED',
    imdStatus: 'IMD WEATHER: ACTIVE',
    sectorStatus: 'PORT SECTOR:',
    metricWave: 'Sea Waves',
    metricWind: 'Surface Wind',
    metricFish: 'Fish Catch',
    metricReturn: 'Return Time',
    metricWaveSafeVal: 'Safe & Low',
    metricWaveSafeDesc: 'Calm water conditions',
    metricWaveDangerVal: 'Dangerous Swell',
    metricWaveDangerDesc: 'Rough sea hazard',
    metricWindSafeVal: 'Gentle Breeze',
    metricWindSafeDesc: 'Safe navigation',
    metricWindDangerVal: 'Storm Gale',
    metricWindDangerDesc: 'High squall gust risk',
    metricFishHighVal: 'High Potential',
    metricFishHighDesc: 'High catch aggregation',
    metricReturnVal: 'Before 5:00 PM',
    metricReturnDesc: 'Safe daylight return',
    cardOcean: 'Ocean State Telemetry',
    cardWeather: 'Coastal Marine Weather',
    cardPfz: 'Potential Fishing Zone (PFZ)',
    cardAlerts: 'Active Marine Alerts',
    sst: 'Sea Surface Temp',
    waveHeight: 'Wave Height',
    swell: 'Swell Height',
    currentSpeed: 'Surface Current',
    salinity: 'Salinity',
    tideStatus: 'Tide Status',
    airTemp: 'Air Temperature',
    windSpeed: 'Wind Speed',
    windGust: 'Wind Gusts',
    pressure: 'Pressure',
    humidity: 'Humidity',
    uvIndex: 'UV Index',
    targetFish: 'Target Species',
    chlorophyllIndex: 'Chlorophyll Index',
    distanceOffshore: 'Distance Offshore',
    depth: 'Depth Range',
    validUntil: 'Valid Until',
    noActiveAlerts: 'No critical marine warnings active in this sector',
    viewAllAlerts: 'View Active Bulletins',
    agentPipelineHeader: 'REAL-TIME MULTI-AGENT INFERENCE ENGINE',
    agentPipelineSub: 'Autonomous agents processing ISRO, INCOIS & IMD live telemetry',
    decisionSynthesis: 'MULTI-AGENT DECISION SYNTHESIS',
    operationalDirective: 'OPERATIONAL DIRECTIVE:',
    decisionRationale: 'DECISION ENGINE RATIONALE (WHY?)',
    viewOnMap: 'View Zone On Map',
    confidence: 'CONFIDENCE:',
    statusLabel: 'STATUS:',
    potentialLabel: 'POTENTIAL:',
    sectorLabel: 'SECTOR:',
    favorableTitle: 'CONDITIONS FAVORABLE',
    cautionTitle: 'PROCEED WITH CAUTION',
    dangerTitle: 'DO NOT GO TO SEA',
    inlandTitle: 'INLAND LOCATION',
    favorableSummary: 'Optimal oceanographic & meteorological window for fishing operations.',
    cautionSummary: 'Moderate swell and variable winds detected. Nearshore operations only.',
    dangerSummary: 'CRITICAL MARINE SAFETY ADVISORY ACTIVE — SUSPEND FISHING OPERATIONS',
    inlandSummary: 'Marine fishing analysis is not applicable at this inland geographic location.',
    footerPlatform: 'SAGAR-SAFE AI • Next-Gen Marine Intelligence Platform',
    footerDataSources: 'Data: INCOIS + IMD + MOSDAC/ISRO',
    footerProtocol: 'Safety-First Protocol',

    // Agent Pipeline Status Logs & Steps
    agentLocationName: 'Location Agent',
    agentLocationLabel: 'Geospatial Geodesy',
    agentLocationRunning: 'Resolving coordinates, navigation corridors & bathymetric boundaries...',
    agentLocationCompleted: 'Coastal sector coordinates & harbour boundaries verified.',

    agentPlannerName: 'Planner Agent',
    agentPlannerLabel: 'Mission Planner',
    agentPlannerRunning: 'Formulating coastal mission envelope & 30 km operational radius...',
    agentPlannerCompleted: '30 km offshore operational radius configured.',

    agentWeatherName: 'Weather Agent',
    agentWeatherLabel: 'IMD Meteorology',
    agentWeatherRunning: 'Fetching IMD coastal radar, cyclonic vortex & gale warnings...',
    agentWeatherCompleted: 'Wind speed, barometric pressure & storm radars checked.',

    agentOceanName: 'Ocean Agent',
    agentOceanLabel: 'INCOIS Ocean State',
    agentOceanRunning: 'Querying INCOIS live buoy arrays & wave forecast models...',
    agentOceanCompleted: 'SST, wave height, swell period & surface currents ingested.',

    agentPfzName: 'PFZ Agent',
    agentPfzLabel: 'Satellite Thermal Fronts',
    agentPfzRunning: 'Interrogating ISRO Oceansat-3 OCM chlorophyll & SST gradients...',
    agentPfzCompleted: 'Pelagic fish aggregation front detected & mapped.',

    agentSafetyName: 'Safety Agent',
    agentSafetyLabel: 'Maritime Safety Protocols',
    agentSafetyRunning: 'Evaluating Coast Guard safety caps & rough sea thresholds...',
    agentSafetyCompleted: 'All navigation parameters within safety limits.',

    agentGeospatialName: 'Geospatial Agent',
    agentGeospatialLabel: 'Bathymetric Corridors',
    agentGeospatialRunning: 'Verifying port channel navigation depth & passage clearances...',
    agentGeospatialCompleted: 'Port channel passage & draught depth confirmed clear.',

    agentDecisionName: 'Decision Agent',
    agentDecisionLabel: 'Safety-First Weighting',
    agentDecisionRunning: 'Calculating multi-factor decision matrix with safety priority...',
    agentDecisionCompleted: 'Safety & opportunity matrices synthesized into operational directive.',

    agentResponseName: 'Response Agent',
    agentResponseLabel: 'Advisory Synthesis',
    agentResponseRunning: 'Compiling structured plain-language advisory & audio briefing...',
    agentResponseCompleted: 'Operational decision & voice advisory compiled.',

    // Pipeline summary & sync logs
    pipelineNodesSynced: 'Pipeline Nodes Synced',
    pipelineDistributedSub: 'Distributed multi-agent pipeline verifying meteorological, oceanographic & safety conditions',
    pipelineAwaitingStream: 'Awaiting telemetry stream...',

    // Detailed Report Descriptions
    reportSafetyOverrideDesc: 'High fish potential detected, but severe weather alert overrides operations. All small craft must remain in harbor.',
    reportFavorableDetailed: 'Optimal oceanographic and meteorological window for commercial fishing operations. Wave swell is gentle and wind speeds remain within safe vessel limits. High chlorophyll fronts offer excellent pelagic catch potential. Safe return advised before evening.',
    reportCautionDetailed: 'Moderate wave swell and variable wind gusts detected in outer sectors. Deep-sea venturing is discouraged. Operations should be restricted to nearshore protected waters with active VHF monitoring and return before late afternoon.',
    reportDangerDetailed: 'CRITICAL MARITIME DANGER: High rough waves exceeding 3.5 meters and gale-force squalls detected. Severe vessel capsize hazard. Total fishing ban enforced by Coast Guard and State Fisheries. Do not venture into the sea.',
    reportInlandDetailed: 'This selected location is situated inland. Oceanographic wave telemetry, sea surface temperature, and marine potential fishing zones are not applicable to inland geographic coordinates.',
    reportTelemetryConfidenceDesc: 'Decision confidence synthesized from 4 verified national data pipelines: INCOIS ocean buoys, IMD coastal Doppler radars, and ISRO Oceansat-3 satellite swaths.',
    reportVesselSafetyDesc: 'Small motorized craft (<12m) and traditional non-motorized catamarans must strictly observe safety tier limits. Do not venture during rough sea conditions.',
    reportReturnWindowDesc: 'Safe daylight return to harbor advised before 5:00 PM.',
    reportFishAggregationDesc: 'High pelagic catch potential (Mackerel, Sardine, Seer Fish) aligned with Oceansat-3 thermal front and chlorophyll-a gradient.'
  },

  hi: { // Hindi
    appTitle: 'सागर-सेफ AI',
    tagline: 'समुद्री बुद्धिमत्ता एवं सुरक्षा',
    heroLine1: 'समुद्र को जानें।',
    heroLine2: 'अवसर खोजें।',
    heroLine3: 'सुरक्षित रहें।',
    heroSub: 'समुद्र, मौसम, मत्स्य पालन और सुरक्षा बुद्धिमत्ता को संयोजित करने वाला AI निर्णय समर्थन।',
    searchPlaceholder: 'मछली पकड़ने, मौसम, समुद्र की स्थिति के बारे में पूछें...',
    btnAnalyze: 'समुद्र विश्लेषण करें',
    btnAnalyzing: 'विश्लेषण जारी है...',
    quickActionFish: 'मछली पकड़ने के क्षेत्र',
    quickActionOcean: 'समुद्र स्थिति',
    quickActionWeather: 'समुद्री मौसम',
    quickActionAlerts: 'समुद्री अलर्ट',
    quickActionSafety: 'सुरक्षा जांच',
    quickActionFishSub: 'ओशनसैट-3 पीएफजेड जोन',
    quickActionOceanSub: 'लहरें एवं समुद्री धाराएं',
    quickActionWeatherSub: 'मौसम विभाग हवा का पूर्वानुमान',
    quickActionAlertsSub: 'वास्तविक समय चेतावनी',
    quickActionSafetySub: 'बहु-कारक सत्यापन',
    tryPromptLabel: 'त्वरित परिदृश्य:',
    promptSafe: 'क्या कल सुबह मछली पकड़ना सुरक्षित है?',
    promptStorm: 'तूफान और चक्रवात की चेतावनी जांचें',
    promptPfz: 'अधिक मछली वाले पीएफजेड क्षेत्र खोजें',
    promptCochin: 'लहरों की ऊंचाई और स्थिति जांचें',
    safetyTitle: 'सुरक्षा',
    fishingTitle: 'मत्स्य क्षमता',
    oceanTitle: 'समुद्र तापमान',
    windTitle: 'हवा की गति',
    whyDecision: 'यह निर्णय क्यों?',
    safetyOverrides: 'सुरक्षा सर्वोपरि है',
    safetyOverrideDirective: 'अनिवार्य निर्देश',
    safetyOverrideMsg: 'मछली मिलने की संभावना अधिक है, लेकिन मौसम विभाग की गंभीर चेतावनी के कारण संचालन रद्द है। सभी नावें बंदरगाह में रहें।',
    inlandMsg: 'यह स्थान अंतर्देशीय है। समुद्री विश्लेषण यहाँ उपलब्ध नहीं है।',
    exploreCoastal: 'तटीय क्षेत्रों का अन्वेषण करें',
    dataTrustTitle: 'डेटा विश्वसनीयता केंद्र',
    demoModeActive: 'डेमो डेटा — वास्तविक नेविगेशन के लिए नहीं',
    liveDataBadge: 'लाइव',
    demoDataBadge: 'डेमो डेटा',
    canGoYes: 'मछली पकड़ने जा सकते हैं ✅',
    canGoNo: 'समुद्र में न जाएं (खतरा) ❌',
    canGoCaution: 'सावधानी से जाएं ⚠️',
    verdictQuestion: 'क्या आज समुद्र में जा सकते हैं?',
    whyTitle: 'सरल एवं स्पष्ट कारण (क्यों?)',
    sosCallTitle: 'आपातकालीन संकट हेल्पलाइन (कॉल करें)',
    coastGuardCall: 'तटरक्षक बल (Coast Guard): 1554',
    nationalEmergencyCall: 'राष्ट्रीय आपातकाल: 112',
    coastalPoliceCall: 'तटीय पुलिस: 1093',
    fisheriesCellCall: 'मत्स्य पालन विभाग: 1077',
    reasonWaveSafe: 'समुद्र की लहरें शांत और सुरक्षित हैं',
    reasonWaveHigh: 'ऊंची खतरनाक लहरें (>3.0m) — नाव पलटने का खतरा',
    reasonWindNormal: 'हवा की गति सामान्य और सुरक्षित है',
    reasonWindGale: 'तेज आंधी और तूफानी हवा की चेतावनी (>45 km/h)',
    reasonFishGood: 'ऑफशोर क्षेत्र में अच्छी मछली मिलने की बहुत अधिक संभावना',
    reasonNoStorm: 'तटीय क्षेत्र में कोई चक्रवात या तूफान की चेतावनी नहीं',
    reasonStormAlert: 'मौसम विभाग (IMD) का चक्रवात/तूफान अलर्ट सक्रिय',
    returnAdvice: 'शाम 5:00 बजे से पहले बंदरगाह लौटना सुरक्षित है',
    navDashboard: 'डैशबोर्ड',
    navMap: 'समुद्री मानचित्र',
    navPorts: 'बंदरगाह निर्देशिका',
    navPfz: 'पीएफजेड क्षेत्र',
    navWeather: 'मौसम',
    navNews: 'ताज़ा समाचार',
    navTrust: 'डेटा विश्वसनीयता',
    navSos: 'आपातकालीन संकट (SOS)',
    navAlerts: 'चेतावनी अलर्ट',
    navHistory: 'इतिहास',
    navLocation: 'बंदरगाह क्षेत्र',
    systemOperational: 'सिस्टम: चालू एवं सक्रिय',
    liveFeeds: 'लाइव डेटा',
    demoFeeds: 'डेमो बेंचमार्क',
    isroStatus: 'इसरो ओशनसैट-3: लाइव',
    incoisStatus: 'इनकोइस समुद्र: सक्रिय',
    imdStatus: 'मौसम विभाग: लाइव',
    sectorStatus: 'बंदरगाह क्षेत्र:',
    metricWave: 'समुद्र की लहरें',
    metricWind: 'हवा की गति',
    metricFish: 'मछली की संभावना',
    metricReturn: 'वापसी का समय',
    metricWaveSafeVal: 'शांत एवं सुरक्षित',
    metricWaveSafeDesc: 'कम ऊंचाई वाली लहरें',
    metricWaveDangerVal: 'खतरनाक ऊंची लहरें',
    metricWaveDangerDesc: 'नाव पलटने का जोखिम',
    metricWindSafeVal: 'सामान्य हवा',
    metricWindSafeDesc: 'सुरक्षित नौकायन',
    metricWindDangerVal: 'तूफानी आंधी',
    metricWindDangerDesc: 'तेज हवाओं का खतरा',
    metricFishHighVal: 'उच्च संभावना',
    metricFishHighDesc: 'मछलियों का बड़ा झुंड',
    metricReturnVal: 'शाम 5:00 से पहले',
    metricReturnDesc: 'दिन के उजाले में वापसी',
    cardOcean: 'समुद्र स्थिति टेलीमेट्री',
    cardWeather: 'तटीय समुद्री मौसम',
    cardPfz: 'संभावित मत्स्य क्षेत्र (PFZ)',
    cardAlerts: 'सक्रिय समुद्री अलर्ट',
    sst: 'समुद्र सतह तापमान',
    waveHeight: 'लहरों की ऊंचाई',
    swell: 'स्वेल ऊंचाई',
    currentSpeed: 'समुद्री धारा गति',
    salinity: 'लवणता',
    tideStatus: 'ज्वार-भाटा स्थिति',
    airTemp: 'वायु तापमान',
    windSpeed: 'हवा की गति',
    windGust: 'झोंके की गति',
    pressure: 'वायुमंडलीय दबाव',
    humidity: 'आर्द्रता',
    uvIndex: 'यूवी सूचकांक',
    targetFish: 'प्रमुख मछली प्रजातियां',
    chlorophyllIndex: 'क्लोरोफिल सूचकांक',
    distanceOffshore: 'तट से दूरी',
    depth: 'गहराई सीमा',
    validUntil: 'मान्य समय',
    noActiveAlerts: 'इस क्षेत्र में कोई गंभीर समुद्री चेतावनी नहीं है',
    viewAllAlerts: 'सक्रिय बुलेटिन देखें',
    agentPipelineHeader: 'वास्तविक समय मल्टी-एजेंट निर्णय प्रणाली',
    agentPipelineSub: 'इसरो, इनकोइस और मौसम विभाग के डेटा का स्वायत्त विश्लेषण',
    decisionSynthesis: 'मल्टी-एजेंट निर्णय संश्लेषण',
    operationalDirective: 'परिचालन निर्देश:',
    decisionRationale: 'निर्णय का कारण (क्यों?)',
    viewOnMap: 'मानचित्र पर क्षेत्र देखें',
    confidence: 'विश्वसनीयता:',
    statusLabel: 'स्थिति:',
    potentialLabel: 'संभावना:',
    sectorLabel: 'क्षेत्र:',
    favorableTitle: 'परिस्थितियां अनुकूल हैं',
    cautionTitle: 'सावधानीपूर्वक आगे बढ़ें',
    dangerTitle: 'समुद्र में बिल्कुल न जाएं',
    inlandTitle: 'अंतर्देशीय स्थान',
    favorableSummary: 'मछली पकड़ने के लिए समुद्र और मौसम की स्थिति पूरी तरह अनुकूल है।',
    cautionSummary: 'मध्यम लहरें और परिवर्तनशील हवाएं। केवल तट के पास ही रहें।',
    dangerSummary: 'गंभीर समुद्री सुरक्षा चेतावनी सक्रिय — मछली पकड़ने का कार्य तुरंत स्थगित करें।',
    inlandSummary: 'इस अंतर्देशीय भौगोलिक स्थान पर समुद्री मत्स्य विश्लेषण लागू नहीं होता है।',
    footerPlatform: 'सागर-सेफ AI • अगली पीढ़ी का समुद्री सूचना मंच',
    footerDataSources: 'डेटा स्रोत: INCOIS + IMD + ISRO',
    footerProtocol: 'सुरक्षा-प्रथम प्रोटोकॉल',

    // Agent Pipeline Status Logs & Steps
    agentLocationName: 'स्थान निर्धारण एजेंट',
    agentLocationLabel: 'भू-स्थानिक स्थिति एवं निर्देशांक',
    agentLocationRunning: 'बंदरगाह निर्देशांक, नौवहन सीमाएं एवं तटीय गहराई का सत्यापन जारी...',
    agentLocationCompleted: 'तटीय क्षेत्र एवं बंदरगाह नौवहन चैनल सफलतापूर्वक सत्यापित।',

    agentPlannerName: 'मिशन योजना एजेंट',
    agentPlannerLabel: 'समुद्री मिशन योजना',
    agentPlannerRunning: 'तटीय मिशन सीमा और 30 किमी अपतटीय परिचालन दायरे की गणना...',
    agentPlannerCompleted: '30 किमी अपतटीय परिचालन दायरा एवं सुरक्षित नौकायन मार्ग निर्धारित।',

    agentWeatherName: 'मौसम विज्ञान एजेंट',
    agentWeatherLabel: 'मौसम विभाग (IMD) चक्रवात व रडार',
    agentWeatherRunning: 'मौसम विभाग डॉपलर रडार, चक्रवाती भंवर और हवा की गति का विश्लेषण...',
    agentWeatherCompleted: 'हवा की गति, वायुमंडलीय दबाव एवं तूफान रडार डेटा सत्यापित।',

    agentOceanName: 'महासागर स्थिति एजेंट',
    agentOceanLabel: 'इनकोइस (INCOIS) महासागर स्थिति',
    agentOceanRunning: 'इनकोइस लाइव महासागरीय बोया नेटवर्क एवं तरंग मॉडल से डेटा संकलन...',
    agentOceanCompleted: 'समुद्र सतह तापमान (SST), लहर की ऊंचाई एवं समुद्री धाराएं सत्यापित।',

    agentPfzName: 'मत्स्य क्षेत्र (PFZ) एजेंट',
    agentPfzLabel: 'इसरो थर्मल फ्रंट एवं क्लोरोफिल',
    agentPfzRunning: 'इसरो ओशनसैट-3 OCM क्लोरोफिल और थर्मल फ्रंट ढाल का विश्लेषण...',
    agentPfzCompleted: 'उच्च मत्स्य घनत्व क्षेत्र (PFZ) एवं पेलैजिक झुंड पहचाना गया।',

    agentSafetyName: 'समुद्री सुरक्षा एजेंट',
    agentSafetyLabel: 'तटरक्षक सुरक्षा मानक',
    agentSafetyRunning: 'तटरक्षक सुरक्षा मानकों, चक्रवात चेतावनी व समुद्री जोखिमों की जांच...',
    agentSafetyCompleted: 'सभी नौवहन सुरक्षा मानक एवं मौसम जोखिम सीमाएं सत्यापित।',

    agentGeospatialName: 'भू-स्थानिक गलियारा एजेंट',
    agentGeospatialLabel: 'जलमग्न गहराई एवं नौवहन गलियारा',
    agentGeospatialRunning: 'बंदरगाह चैनल गहराई और सुरक्षित नौवहन गलियारे का सत्यापन जारी...',
    agentGeospatialCompleted: 'बंदरगाह मार्ग एवं सुरक्षित गहराई (ड्राफ्ट) क्लीयरेंस सुनिश्चित।',

    agentDecisionName: 'निर्णय संश्लेषण एजेंट',
    agentDecisionLabel: 'सुरक्षा-सर्वोपरि भार निर्धारण',
    agentDecisionRunning: 'सुरक्षा-प्रथम नियमों, मौसम व मत्स्य संभावना का बहु-कारक विश्लेषण...',
    agentDecisionCompleted: 'सुरक्षा एवं मत्स्य संभावना का परिचालन निर्देश में संश्लेषण पूर्ण।',

    agentResponseName: 'सलाहकार संश्लेषण एजेंट',
    agentResponseLabel: 'स्पष्ट भाषा में मछुआरा सलाह',
    agentResponseRunning: 'सरल भाषा में व्याख्या, वैज्ञानिक कारण और ऑडियो ब्रीफ तैयार किया जा रहा है...',
    agentResponseCompleted: 'मछुआरों के लिए सरल भाषा में परिचालन सलाह एवं वॉयस गाइड तैयार।',

    // Pipeline summary & sync logs
    pipelineNodesSynced: 'पाइपलाइन नोड्स सिंक किए गए',
    pipelineDistributedSub: 'मौसम विज्ञान, महासागरीय स्थिति एवं सुरक्षा की पुष्टि करने वाली बहु-एजेंट प्रणाली',
    pipelineAwaitingStream: 'डेटा स्ट्रीम की प्रतीक्षा जारी...',

    // Detailed Report Descriptions
    reportSafetyOverrideDesc: 'उच्च मत्स्य संभावना पाई गई है, परंतु गंभीर मौसम व चक्रवात चेतावनी सभी अवसरों को निरस्त करती है। सुरक्षा सर्वोपरि है — सभी नावें तुरंत बंदरगाह में रहें।',
    reportFavorableDetailed: 'व्यावसायिक मछली पकड़ने के लिए समुद्र और मौसम की स्थिति अत्यंत अनुकूल है। लहरें शांत हैं और हवा की गति सुरक्षित नौकायन सीमा में है। उपग्रह डेटा के अनुसार उच्च क्लोरोफिल क्षेत्र में प्रचुर मात्रा में मछली मिलने की प्रबल संभावना है। शाम से पहले सुरक्षित लौटें।',
    reportCautionDetailed: 'बाहरी समुद्री क्षेत्रों में मध्यम लहरें और तेज हवाओं के झोंके दर्ज किए गए हैं। गहरे समुद्र में जाने से बचें। केवल तटवर्ती सुरक्षित क्षेत्रों में ही कार्य करें, वायरलेस रेडियो चालू रखें और दोपहर ढलने से पूर्व सुरक्षित लौट आएं।',
    reportDangerDetailed: 'अत्यंत गंभीर समुद्री खतरा: 3.5 मीटर से अधिक ऊंची लहरें और प्रचंड आंधी-तूफान की चेतावनी सक्रिय है। नाव पलटने का अत्यधिक जोखिम है। तटरक्षक बल एवं मत्स्य विभाग द्वारा पूर्ण प्रतिबंध लागू। समुद्र में बिल्कुल न जाएं।',
    reportInlandDetailed: 'चयनित स्थान अंतर्देशीय भूभाग पर स्थित है। समुद्री लहरों, समुद्र सतह तापमान और संभावित मत्स्य क्षेत्रों (PFZ) का विश्लेषण केवल तटीय एवं समुद्री क्षेत्रों के लिए ही लागू होता है।',
    reportTelemetryConfidenceDesc: 'निर्णय की विश्वसनीयता 4 राष्ट्रीय डेटा स्रोतों से सत्यापित है: इनकोइस महासागर बोया, मौसम विभाग तटीय डॉपलर रडार और इसरो ओशनसैट-3 उपग्रह चित्र।',
    reportVesselSafetyDesc: 'छोटी मोटर नौकाओं (<12 मीटर) और पारंपरिक गैर-मोटर चालित नौकाओं को सुरक्षा नियमों का कड़ाई से पालन करना चाहिए। खराब मौसम में समुद्र में न जाएं।',
    reportReturnWindowDesc: 'दिन के उजाले में शाम 5:00 बजे से पहले बंदरगाह लौटना अनिवार्य है।',
    reportFishAggregationDesc: 'ओशनसैट-3 थर्मल फ्रंट और क्लोरोफिल-ए प्रवणता के आधार पर मैकेरल, सार्डिन और सीर मछली का उच्च जमाव।'
  },

  kn: { // Kannada (Karnataka Coast)
    appTitle: 'ಸಾಗರ-ಸೇಫ್ ಎಐ',
    tagline: 'ಸಮುದ್ರ ಗುಪ್ತಚರ ಮತ್ತು ಸುರಕ್ಷತೆ',
    heroLine1: 'ಸಮುದ್ರವನ್ನು ಅರಿಯಿರಿ.',
    heroLine2: 'ಮೀನುಗಾರಿಕೆ ಅವಕಾಶ ಕಂಡುಕೊಳ್ಳಿ.',
    heroLine3: 'ಸುರಕ್ಷಿತವಾಗಿರಿ.',
    heroSub: 'ಸಮುದ್ರ, ಹವಾಮಾನ, ಮೀನುಗಾರಿಕೆ ಮತ್ತು ಸುರಕ್ಷತೆಯ ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ ನಿರ್ಧಾರ ಬೆಂಬಲ ವ್ಯವಸ್ಥೆ.',
    searchPlaceholder: 'ಮೀನುಗಾರಿಕೆ, ಹವಾಮಾನ, ಸಮುದ್ರದ ಸ್ಥಿತಿಯ ಬಗ್ಗೆ ಕೇಳಿ...',
    btnAnalyze: 'ಸಮುದ್ರ ವಿಶ್ಲೇಷಣೆ',
    btnAnalyzing: 'ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...',
    quickActionFish: 'ಮೀನುಗಾರಿಕೆ ವಲಯ',
    quickActionOcean: 'ಸಮುದ್ರ ಸ್ಥಿತಿ',
    quickActionWeather: 'ಹವಾಮಾನ',
    quickActionAlerts: 'ಎಚ್ಚರಿಕೆಗಳು',
    quickActionSafety: 'ಸುರಕ್ಷತಾ ತಪಾಸಣೆ',
    quickActionFishSub: 'ಓಷನ್‌ಸ್ಯಾಟ್-3 ಪಿಎಫ್‌ಝೆಡ್ ವಲಯ',
    quickActionOceanSub: 'ಅಲೆಗಳು ಮತ್ತು ಪ್ರವಾಹ',
    quickActionWeatherSub: 'ಕರಾವಳಿ ಗಾಳಿ ಮುನ್ಸೂಚನೆ',
    quickActionAlertsSub: 'ನೈಜ ಸಮಯ ಎಚ್ಚರಿಕೆ',
    quickActionSafetySub: 'ಸುರಕ್ಷತಾ ಪರಿಶೀಲನೆ',
    tryPromptLabel: 'ತ್ವರಿತ ಪ್ರಶ್ನೆಗಳು:',
    promptSafe: 'ನಾಳೆ ಬೆಳಿಗ್ಗೆ ಮೀನುಗಾರಿಕೆಗೆ ಹೋಗುವುದು ಸುರಕ್ಷಿತವೇ?',
    promptStorm: 'ಬಿರುಗಾಳಿ ಮತ್ತು ಚಂಡಮಾರುತ ಎಚ್ಚರಿಕೆ ಪರಿಶೀಲಿಸಿ',
    promptPfz: 'ಹೆಚ್ಚು ಮೀನು ಸಿಗುವ ವಲಯಗಳನ್ನು ಹುಡುಕಿ',
    promptCochin: 'ಅಲೆಗಳ ಎತ್ತರ ಮತ್ತು ಸ್ಥಿತಿ ನೋಡಿ',
    safetyTitle: 'ಸುರಕ್ಷತೆ',
    fishingTitle: 'ಮೀನುಗಾರಿಕೆ ಸಂಭಾವ್ಯತೆ',
    oceanTitle: 'ಸಮುದ್ರ ಸ್ಥಿತಿ',
    windTitle: 'ಗಾಳಿಯ ವೇಗ',
    whyDecision: 'ಈ ನಿರ್ಧಾರಕ್ಕೆ ಕಾರಣಗಳು?',
    safetyOverrides: 'ಅವಕಾಶಕ್ಕಿಂತ ಸುರಕ್ಷತೆಯೇ ಮುಖ್ಯ',
    safetyOverrideDirective: 'ಕಡ್ಡಾಯ ನಿರ್ದೇಶನ',
    safetyOverrideMsg: 'ಮೀನು ಸಿಗುವ ಸಾಧ್ಯತೆ ಹೆಚ್ಚಿದ್ದರೂ, ಹವಾಮಾನ ಇಲಾಖೆಯ ಬಿರುಗಾಳಿ ಎಚ್ಚರಿಕೆಯಿಂದಾಗಿ ಸಮುದ್ರಕ್ಕೆ ಹೋಗುವುದನ್ನು ರದ್ದುಗೊಳಿಸಲಾಗಿದೆ.',
    inlandMsg: 'ಈ ಸ್ಥಳವು ಒಳನಾಡಿನಲ್ಲಿದೆ. ಇಲ್ಲಿ ಸಮುದ್ರ ಮೀನುಗಾರಿಕೆ ಅನ್ವಯಿಸುವುದಿಲ್ಲ.',
    exploreCoastal: 'ಕರಾವಳಿ ಪ್ರದೇಶಗಳನ್ನು ಅನ್ವೇಷಿಸಿ',
    dataTrustTitle: 'ಡೇಟಾ ವಿಶ್ವಾಸಾರ್ಹತಾ ಕೇಂದ್ರ',
    demoModeActive: 'ಡೆಮೊ ಡೇಟಾ — ನೈಜ ನ್ಯಾವಿಗೇಷನ್‌ಗೆ ಅಲ್ಲ',
    liveDataBadge: 'ಲೈವ್',
    demoDataBadge: 'ಡೆಮೊ ಡೇಟಾ',
    canGoYes: 'ಮೀನುಗಾರಿಕೆಗೆ ಹೋಗಬಹುದು ✅',
    canGoNo: 'ಸಮುದ್ರಕ್ಕೆ ಹೋಗಬೇಡಿ (ಅಪಾಯ) ❌',
    canGoCaution: 'ಎಚ್ಚರಿಕೆಯಿಂದ ಹೋಗಿ ⚠️',
    verdictQuestion: 'ಇಂದು ಸಮುದ್ರಕ್ಕೆ ಹೋಗಬಹುದೇ?',
    whyTitle: 'ಸರಳ ಹಾಗೂ ಸ್ಪಷ್ಟ ಕಾರಣಗಳು (ಏಕೆ?)',
    sosCallTitle: 'ತುರ್ತು ಸಹಾಯವಾಣಿ ಸಂಖ್ಯೆಗಳು (ಕರೆ ಮಾಡಿ)',
    coastGuardCall: 'ಕೋಸ್ಟ್ ಗಾರ್ಡ್: 1554 (ಉಚಿತ ಕರೆ)',
    nationalEmergencyCall: 'ರಾಷ್ಟ್ರೀಯ ತುರ್ತು: 112',
    coastalPoliceCall: 'ಕರಾವಳಿ ರಕ್ಷಣಾ ಪೊಲೀಸ್: 1093',
    fisheriesCellCall: 'ಮೀನುಗಾರಿಕೆ ಇಲಾಖೆ: 1077',
    reasonWaveSafe: 'ಸಮುದ್ರದ ಅಲೆಗಳು ಶಾಂತ ಹಾಗೂ ಸುರಕ್ಷಿತವಾಗಿವೆ',
    reasonWaveHigh: 'ಎತ್ತರದ ಅಪಾಯಕಾರಿ ಅಲೆಗಳು (>3.0m) — ದೋಣಿ ಮಗುಚುವ ಅಪಾಯ',
    reasonWindNormal: 'ಗಾಳಿಯ ವೇಗ ಸಾಮಾನ್ಯ ಹಾಗೂ ಸುರಕ್ಷಿತವಾಗಿದೆ',
    reasonWindGale: 'ತೀವ್ರ ಬಿರುಗಾಳಿ ಮತ್ತು ಗಾಳಿಯ ಎಚ್ಚರಿಕೆ (>45 km/h)',
    reasonFishGood: 'ಸಮುದ್ರ ವಲಯದಲ್ಲಿ ಹೆಚ್ಚು ಮೀನು ದೊರೆಯುವ ಉತ್ತಮ ಸಾಧ್ಯತೆ',
    reasonNoStorm: 'ಯಾವುದೇ ಚಂಡಮಾರುತ ಅಥವಾ ಅಪಾಯದ ಮುನ್ಸೂಚನೆ ಇಲ್ಲ',
    reasonStormAlert: 'ಹವಾಮಾನ ಇಲಾಖೆಯ ಬಿರುಗಾಳಿ/ಚಂಡಮಾರುತ ಎಚ್ಚರಿಕೆ ಜಾರಿಯಲ್ಲಿದೆ',
    returnAdvice: 'ಸಂಜೆ 5:00 ಗಂಟೆಯೊಳಗೆ ಬಂದರಿಗೆ ಮರಳುವುದು ಕ್ಷೇಮ',
    navDashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    navMap: 'ಸಮುದ್ರ ನಕ್ಷೆ',
    navPorts: 'ಬಂದರುಗಳ ವಿವರ',
    navPfz: 'ಪಿಎಫ್‌ಝೆಡ್ ವಲಯ',
    navWeather: 'ಹವಾಮಾನ',
    navNews: 'ಸುದ್ದಿ ಮತ್ತು ವರದಿ',
    navTrust: 'ಡೇಟಾ ವಿಶ್ವಾಸಾರ್ಹತೆ',
    navSos: 'ತುರ್ತು ಎಸ್‌ಒಎಸ್ (SOS)',
    navAlerts: 'ಎಚ್ಚರಿಕೆಗಳು',
    navHistory: 'ಇತಿಹಾಸ',
    navLocation: 'ಬಂದರು ವಲಯ',
    systemOperational: 'ವ್ಯವಸ್ಥೆ: ಸಂಪೂರ್ಣ ಸಕ್ರಿಯ',
    liveFeeds: 'ಲೈವ್ ಡೇಟಾ',
    demoFeeds: 'ಡೆಮೊ ಬೆಂಚ್‌ಮಾರ್ಕ್',
    isroStatus: 'ಇಸ್ರೋ ಓಷನ್‌ಸ್ಯಾಟ್-3: ಲೈವ್',
    incoisStatus: 'ಇನ್‌ಕಾಯ್ಸ್ ಸಮುದ್ರ: ಸಕ್ರಿಯ',
    imdStatus: 'ಹವಾಮಾನ ಇಲಾಖೆ: ಲೈವ್',
    sectorStatus: 'ಬಂದರು ವಲಯ:',
    metricWave: 'ಸಮುದ್ರದ ಅಲೆಗಳು',
    metricWind: 'ಗಾಳಿಯ ವೇಗ',
    metricFish: 'ಮೀನಿನ ಲಭ್ಯತೆ',
    metricReturn: 'ಹಿಂತಿರುಗುವ ಸಮಯ',
    metricWaveSafeVal: 'ಶಾಂತ ಹಾಗೂ ಕಡಿಮೆ',
    metricWaveSafeDesc: 'ಸುರಕ್ಷಿತ ನೀರಿನ ಸ್ಥಿತಿ',
    metricWaveDangerVal: 'ಅಪಾಯಕಾರಿ ಅಲೆಗಳು',
    metricWaveDangerDesc: 'ದೋಣಿ ಮಗುಚುವ ಅಪಾಯ',
    metricWindSafeVal: 'ಸಾಮಾನ್ಯ ಗಾಳಿ',
    metricWindSafeDesc: 'ಸುರಕ್ಷಿತ ಸಂಚಾರ',
    metricWindDangerVal: 'ತೀವ್ರ ಬಿರುಗಾಳಿ',
    metricWindDangerDesc: 'ಅಪಾಯಕಾರಿ ಬಿರುಗಾಳಿ ಗಾಳಿ',
    metricFishHighVal: 'ಹೆಚ್ಚಿನ ಅವಕಾಶ',
    metricFishHighDesc: 'ಹೆಚ್ಚು ಮೀನು ಇರುವ ವಲಯ',
    metricReturnVal: 'ಸಂಜೆ 5:00 ರೊಳಗೆ',
    metricReturnDesc: 'ಬೆಳಕಿರುವಾಗಲೇ ವಾಪಸ್ ಬನ್ನಿ',
    cardOcean: 'ಸಮುದ್ರ ಸ್ಥಿತಿ ವಿವರ',
    cardWeather: 'ಕರಾವಳಿ ಹವಾಮಾನ',
    cardPfz: 'ಸಂಭಾವ್ಯ ಮೀನುಗಾರಿಕೆ ವಲಯ (PFZ)',
    cardAlerts: 'ಸಕ್ರಿಯ ಸಮುದ್ರ ಎಚ್ಚರಿಕೆಗಳು',
    sst: 'ಸಮುದ್ರ ಮೇಲ್ಮೈ ತಾಪಮಾನ',
    waveHeight: 'ಅಲೆಗಳ ಎತ್ತರ',
    swell: 'ಸ್ವೆಲ್ ಎತ್ತರ',
    currentSpeed: 'ಪ್ರವಾಹದ ವೇಗ',
    salinity: 'ಲವಣಾಂಶ',
    tideStatus: 'ಉಬ್ಬರವಿಳಿತ ಸ್ಥಿತಿ',
    airTemp: 'ಗಾಳಿಯ ತಾಪಮಾನ',
    windSpeed: 'ಗಾಳಿಯ ವೇಗ',
    windGust: 'ಗಾಳಿಯ ರಭಸ',
    pressure: 'ವಾಯುಭಾರ ಒತ್ತಡ',
    humidity: 'ತೇವಾಂಶ',
    uvIndex: 'ಯುವಿ ಸೂಚ್ಯಂಕ',
    targetFish: 'ಮುಖ್ಯ ಮೀನು ಪ್ರಭೇದಗಳು',
    chlorophyllIndex: 'ಕ್ಲೋರೊಫಿಲ್ ಸೂಚ್ಯಂಕ',
    distanceOffshore: 'ದಡದಿಂದ ದೂರ',
    depth: 'ಆಳದ ವ್ಯಾಪ್ತಿ',
    validUntil: 'ಮಾನ್ಯತೆಯ ಸಮಯ',
    noActiveAlerts: 'ಈ ವಲಯದಲ್ಲಿ ಯಾವುದೇ ಗಂಭೀರ ಅಪಾಯದ ಎಚ್ಚರಿಕೆಗಳಿಲ್ಲ',
    viewAllAlerts: 'ಎಲ್ಲಾ ಎಚ್ಚರಿಕೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
    agentPipelineHeader: 'ನೈಜ-ಸಮಯದ ಮಲ್ಟಿ-ಏಜೆಂಟ್ ನಿರ್ಧಾರ ವ್ಯವಸ್ಥೆ',
    agentPipelineSub: 'ಇಸ್ರೋ, ಇನ್‌ಕಾಯ್ಸ್ ಮತ್ತು ಐಎಂಡಿ ಡೇಟಾದ ಸ್ವಯಂಚಾಲಿತ ವಿಶ್ಲೇಷಣೆ',
    decisionSynthesis: 'ಮಲ್ಟಿ-ಏಜೆಂಟ್ ನಿರ್ಧಾರ ಸಂಶ್ಲೇಷಣೆ',
    operationalDirective: 'ಕಾರ್ಯಾಚರಣೆ ನಿರ್ದೇಶನ:',
    decisionRationale: 'ನಿರ್ಧಾರದ ಕಾರಣಗಳು (ಏಕೆ?)',
    viewOnMap: 'ನಕ್ಷೆಯಲ್ಲಿ ವಲಯ ನೋಡಿ',
    confidence: 'ವಿಶ್ವಾಸಾರ್ಹತೆ:',
    statusLabel: 'ಸ್ಥಿತಿ:',
    potentialLabel: 'ಸಂಭಾವ್ಯತೆ:',
    sectorLabel: 'ವಲಯ:',
    favorableTitle: 'ಪರಿಸ್ಥಿತಿಗಳು ಅತ್ಯಂತ ಅನುಕೂಲಕರವಾಗಿವೆ',
    cautionTitle: 'ಎಚ್ಚರಿಕೆಯಿಂದ ಮುಂದುವರಿಯಿರಿ',
    dangerTitle: 'ಸಮುದ್ರಕ್ಕೆ ಹೋಗಬೇಡಿ (ಅಪಾಯ)',
    inlandTitle: 'ಒಳನಾಡಿನ ಪ್ರದೇಶ',
    favorableSummary: 'ಮೀನುಗಾರಿಕೆಗೆ ಸಮುದ್ರ ಮತ್ತು ಹವಾಮಾನ ಪರಿಸ್ಥಿತಿಗಳು ಅತ್ಯಂತ ಅನುಕೂಲಕರವಾಗಿವೆ.',
    cautionSummary: 'ಮಧ್ಯಮ ಅಲೆಗಳು ಮತ್ತು ಗಾಳಿ ಇದೆ. ಕರಾವಳಿ ತೀರದ ಹತ್ತಿರ ಮಾತ್ರ ಮೀನುಗಾರಿಕೆ ನಡೆಸಿ.',
    dangerSummary: 'ತೀವ್ರ ಸಮುದ್ರ ಸುರಕ್ಷತಾ ಎಚ್ಚರಿಕೆ ಜಾರಿಯಲ್ಲಿದೆ — ಮೀನುಗಾರಿಕೆಯನ್ನು ತಕ್ಷಣ ನಿಲ್ಲಿಸಿ.',
    inlandSummary: 'ಈ ಒಳನಾಡಿನ ಸ್ಥಳದಲ್ಲಿ ಸಮುದ್ರ ಮೀನುಗಾರಿಕೆ ವಿಶ್ಲೇಷಣೆ ಅನ್ವಯಿಸುವುದಿಲ್ಲ.',
    footerPlatform: 'ಸಾಗರ-ಸೇಫ್ ಎಐ • ಮುಂದಿನ ಪೀಳಿಗೆಯ ಸಮುದ್ರ ಗುಪ್ತಚರ ವೇದಿಕೆ',
    footerDataSources: 'ಡೇಟಾ ಮೂಲ: INCOIS + IMD + ISRO',
    footerProtocol: 'ಸುರಕ್ಷತೆ-ಮೊದಲು ಪ್ರೋಟೋಕಾಲ್'
  },

  ml: { // Malayalam (Kerala Coast)
    appTitle: 'സാഗർ-സേഫ് AI',
    tagline: 'സമുദ്ര വിവര സുരക്ഷാ പ്ലാറ്റ്ഫോം',
    heroLine1: 'കടലിനെ അറിയുക.',
    heroLine2: 'സാധ്യതകൾ കണ്ടെത്തുക.',
    heroLine3: 'സുരക്ഷിതരായിരിക്കുക.',
    heroSub: 'സമുദ്രം, കാലാവസ്ഥ, മത്സ്യബന്ധനം, സുരക്ഷ എന്നിവ സംയോജിപ്പിക്കുന്ന AI തീരുമാന പിന്തുണ.',
    searchPlaceholder: 'മത്സ്യബന്ധനം, കാലാവസ്ഥ, കടൽ അവസ്ഥകളെക്കുറിച്ച് ചോദിക്കൂ...',
    btnAnalyze: 'കടൽ വിശകലനം ചെയ്യുക',
    btnAnalyzing: 'വിശകലനം ചെയ്യുന്നു...',
    quickActionFish: 'മത്സ്യമേഖല',
    quickActionOcean: 'സമുദ്രാവസ്ഥ',
    quickActionWeather: 'കാലാവസ്ഥ',
    quickActionAlerts: 'മുന്നറിയിപ്പുകൾ',
    quickActionSafety: 'സുരക്ഷാ പരിശോധന',
    quickActionFishSub: 'ഓഷ്യൻസാറ്റ്-3 പിഎഫ്‌സെഡ് മേഖല',
    quickActionOceanSub: 'തിരമാലകളും ഒഴുക്കും',
    quickActionWeatherSub: 'തീരദേശ കാറ്റ് പ്രവചനം',
    quickActionAlertsSub: 'തത്സമയ മുന്നറിയിപ്പുകൾ',
    quickActionSafetySub: 'സുരക്ഷാ വിലയിരുത്തൽ',
    tryPromptLabel: 'ദ്രുത ചോദ്യങ്ങൾ:',
    promptSafe: 'നാളെ രാവിലെ മീൻപിടിക്കാൻ പോകുന്നത് സുരക്ഷിതമാണോ?',
    promptStorm: 'ചുഴലിക്കാറ്റ് മുന്നറിയിപ്പുകൾ പരിശോധിക്കുക',
    promptPfz: 'കൂടുതൽ മീൻ ലഭിക്കുന്ന പിഎഫ്‌സെഡ് മേഖലകൾ കണ്ടെത്തുക',
    promptCochin: 'തിരമാലയുടെ ഉയരവും കടൽ അവസ്ഥയും പരിശോധിക്കുക',
    safetyTitle: 'സുരക്ഷ',
    fishingTitle: 'മത്സ്യബന്ധന സാധ്യത',
    oceanTitle: 'സമുദ്ര താപനില',
    windTitle: 'കാറ്റ്',
    whyDecision: 'എന്തുകൊണ്ട് ഈ തീരുമാനം?',
    safetyOverrides: 'സുരക്ഷയ്ക്കാണ് പ്രഥമ പരിഗണന',
    safetyOverrideDirective: 'നിർബന്ധിത നിർദ്ദേശം',
    safetyOverrideMsg: 'മീൻ ലഭിക്കാൻ സാധ്യതയുണ്ടെങ്കിലും കാലാവസ്ഥാ മുന്നറിയിപ്പ് കാരണം കടലിൽ പോകുന്നത് പൂർണ്ണമായും ഒഴിവാക്കണം.',
    inlandMsg: 'ഈ പ്രദേശം ഉൾനാടാണ്. സമുദ്ര മത്സ്യബന്ധന വിശകലനം ഇവിടെ ലഭ്യമല്ല.',
    exploreCoastal: 'തീരദേശങ്ങൾ കാണുക',
    dataTrustTitle: 'ഡാറ്റാ വിശ്വാസ്യത കേന്ദ്രം',
    demoModeActive: 'ഡെമോ ഡാറ്റ — യഥാർത്ഥ യാത്രയ്ക്കല്ല',
    liveDataBadge: 'ലൈവ്',
    demoDataBadge: 'ഡെമോ ഡാറ്റ',
    canGoYes: 'മത്സ്യബന്ധനത്തിന് പോകാം ✅',
    canGoNo: 'കടലിൽ പോകരുത് (അപകടം) ❌',
    canGoCaution: 'ജാഗ്രതയോടെ പോകുക ⚠️',
    verdictQuestion: 'ഇന്ന് കടലിൽ പോകാമോ?',
    whyTitle: 'ലളിതമായ കാരണങ്ങൾ (എന്തുകൊണ്ട്?)',
    sosCallTitle: 'അടിയന്തര ദുരന്ത ഹെൽപ്പ്‌ലൈൻ നമ്പറുകൾ',
    coastGuardCall: 'കോസ്റ്റ് ഗാർഡ്: 1554 (ടോൾ ഫ്രീ)',
    nationalEmergencyCall: 'ദേശീയ എമർജൻസി: 112',
    coastalPoliceCall: 'കോസ്റ്റൽ പോലീസ്: 1093',
    fisheriesCellCall: 'ഫിഷറീസ് കൺട്രോൾ റൂം: 1077',
    reasonWaveSafe: 'തിരമാലകൾ ശാന്തവും സുരക്ഷിതവുമാണ്',
    reasonWaveHigh: 'ഉയർന്ന അപകടകരമായ തിരമാലകൾ (>3.0m) — വള്ളം മറിയാൻ സാധ്യത',
    reasonWindNormal: 'കാറ്റിന്റെ വേഗത സാധാരണവും സുരക്ഷിതവുമാണ്',
    reasonWindGale: 'ശക്തമായ ചുഴലിക്കാറ്റ് മുന്നറിയിപ്പ് (>45 km/h)',
    reasonFishGood: 'നല്ല മീൻ ലഭിക്കാൻ ഉയർന്ന സാധ്യതയുള്ള പ്രദേശം',
    reasonNoStorm: 'ചുഴലിക്കാറ്റ് മുന്നറിയിപ്പുകളൊന്നുമില്ല',
    reasonStormAlert: 'കാലാവസ്ഥാ നിരീക്ഷണ കേന്ദ്രത്തിന്റെ (IMD) ചുഴലിക്കാറ്റ് മുന്നറിയിപ്പ് നിലവിലുണ്ട്',
    returnAdvice: 'വൈകുന്നേരം 5:00 മണിക്ക് മുൻപായി തീരത്ത് തിരിച്ചെത്തുക',
    navDashboard: 'ഡാഷ്‌ബോർഡ്',
    navMap: 'സമുദ്ര മാപ്പ്',
    navPorts: 'തുറമുഖങ്ങൾ',
    navPfz: 'പിഎഫ്‌സെഡ് മേഖല',
    navWeather: 'കാലാവസ്ഥ',
    navNews: 'വാർത്തകൾ',
    navTrust: 'ഡാറ്റാ വിശ്വാസ്യത',
    navSos: 'അടിയന്തര SOS',
    navAlerts: 'മുന്നറിയിപ്പുകൾ',
    navHistory: 'ചരിത്രം',
    navLocation: 'തുറമുഖ മേഖല',
    systemOperational: 'സിസ്റ്റം: പൂർണ്ണ സജ്ജം',
    liveFeeds: 'തത്സമയ ഡാറ്റ',
    demoFeeds: 'ഡെമോ ബെഞ്ച്മാർക്ക്',
    isroStatus: 'ഐഎസ്ആർഒ ഓഷ്യൻസാറ്റ്-3: ലൈവ്',
    incoisStatus: 'ഇൻകോയിസ് സമുദ്രം: സജീവം',
    imdStatus: 'കാലാവസ്ഥാ കേന്ദ്രം: ലൈവ്',
    sectorStatus: 'തുറമുഖ മേഖല:',
    metricWave: 'തിരമാലകൾ',
    metricWind: 'കാറ്റിന്റെ വേഗത',
    metricFish: 'മത്സ്യസാധ്യത',
    metricReturn: 'മടങ്ങിയെത്തേണ്ട സമയം',
    metricWaveSafeVal: 'ശാന്തവും സുരക്ഷിതവും',
    metricWaveSafeDesc: 'കുറഞ്ഞ ഉയരമുള്ള തിരകൾ',
    metricWaveDangerVal: 'അപകടകരമായ തിരമാലകൾ',
    metricWaveDangerDesc: 'വള്ളം മറിയാനുള്ള സാധ്യത',
    metricWindSafeVal: 'സാധാരണ കാറ്റ്',
    metricWindSafeDesc: 'സുരക്ഷിത യാത്ര',
    metricWindDangerVal: 'ചുഴലിക്കാറ്റ് കാറ്റ്',
    metricWindDangerDesc: 'ശക്തമായ കാറ്റടിക്കാൻ സാധ്യത',
    metricFishHighVal: 'ഉയർന്ന സാധ്യത',
    metricFishHighDesc: 'കൂടുതൽ മീൻ ലഭിക്കുന്ന പ്രദേശം',
    metricReturnVal: 'വൈകിട്ട് 5:00 ന് മുൻപ്',
    metricReturnDesc: 'വെളിച്ചമുള്ളപ്പോൾ മടങ്ങുക',
    cardOcean: 'സമുദ്രാവസ്ഥ വിവരങ്ങൾ',
    cardWeather: 'തീരദേശ കാലാവസ്ഥ',
    cardPfz: 'സാധ്യതയുള്ള മത്സ്യബന്ധന മേഖല (PFZ)',
    cardAlerts: 'സജീവ സമുദ്ര മുന്നറിയിപ്പുകൾ',
    sst: 'സമുദ്ര ഉപരിതല താപനില',
    waveHeight: 'തിരമാല ഉയരം',
    swell: 'സ്വെൽ ഉയരം',
    currentSpeed: 'ഒഴുക്കിന്റെ വേഗത',
    salinity: 'ലവണാംശം',
    tideStatus: 'വേലിയേറ്റ-ഇറക്ക നില',
    airTemp: 'വായുവിന്റെ താപനില',
    windSpeed: 'കാറ്റിന്റെ വേഗത',
    windGust: 'കാറ്റിന്റെ രൂക്ഷത',
    pressure: 'വായുമർദ്ദം',
    humidity: 'ഈർപ്പം',
    uvIndex: 'യൂവി സൂചിക',
    targetFish: 'പ്രധാന മത്സ്യങ്ങൾ',
    chlorophyllIndex: 'ക്ലോറോഫിൽ നിരക്ക്',
    distanceOffshore: 'തീരത്തുനിന്നുള്ള ദൂരം',
    depth: 'ആഴം',
    validUntil: 'സാധുത സമയം',
    noActiveAlerts: 'ഈ മേഖലയിൽ അപായ മുന്നറിയിപ്പുകളൊന്നുമില്ല',
    viewAllAlerts: 'എല്ലാ മുന്നറിയിപ്പുകളും കാണുക',
    agentPipelineHeader: 'തത്സമയ മൾട്ടി-ഏജന്റ് വിശകലന സംവിധാനം',
    agentPipelineSub: 'ഐഎസ്ആർഒ, ഇൻകോയിസ്, ഐഎംഡി ഡാറ്റകളുടെ ഓട്ടോമേറ്റഡ് വിശകലനം',
    decisionSynthesis: 'മൾട്ടി-ഏജന്റ് തീരുമാന സംഗ്രഹം',
    operationalDirective: 'പ്രവർത്തന നിർദ്ദേശം:',
    decisionRationale: 'തീരുമാനത്തിന്റെ കാരണങ്ങൾ (എന്തുകൊണ്ട്?)',
    viewOnMap: 'മാപ്പിൽ പ്രദേശം കാണുക',
    confidence: 'വിശ്വാസ്യത:',
    statusLabel: 'നില:',
    potentialLabel: 'സാധ്യത:',
    sectorLabel: 'മേഖല:',
    favorableTitle: 'സാഹചര്യങ്ങൾ അനുകൂലമാണ്',
    cautionTitle: 'ജാഗ്രതയോടെ പ്രവർത്തിക്കുക',
    dangerTitle: 'കടലിൽ പോകരുത് (അപകടം)',
    inlandTitle: 'ഉൾനാടൻ പ്രദേശം',
    favorableSummary: 'മത്സ്യബന്ധനത്തിന് കാലാവസ്ഥയും കടലും പൂർണ്ണമായും അനുകൂലമാണ്.',
    cautionSummary: 'മിതമായ തിരമാലകളും കാറ്റും ഉണ്ട്. തീരത്തിനടുത്തു മാത്രം മീൻപിടിക്കുക.',
    dangerSummary: 'ഗുരുതരമായ കടൽ സുരക്ഷാ മുന്നറിയിപ്പ് നിലവിലുണ്ട് — മത്സ്യബന്ധനം ഉടൻ നിർത്തുക.',
    inlandSummary: 'ഈ ഉൾനാടൻ ഭൂമിശാസ്ത്രപരമായ സ്ഥലത്ത് സമുദ്ര മത്സ്യബന്ധന വിശകലനം ബാധകമല്ല.',
    footerPlatform: 'സാഗർ-സേഫ് AI • അത്യാധുനിക സമുദ്ര വിവര പ്ലാറ്റ്ഫോം',
    footerDataSources: 'ഡാറ്റാ ഉറവിടങ്ങൾ: INCOIS + IMD + ISRO',
    footerProtocol: 'സുരക്ഷയ്ക്കാണ് ഒന്നാം സ്ഥാനം'
  },

  ta: { // Tamil (Tamil Nadu Coast)
    appTitle: 'சாகர்-சேஃப் AI',
    tagline: 'கடல் நுண்ணறிவு மற்றும் பாதுகாப்பு',
    heroLine1: 'கடலை அறிந்திடுங்கள்.',
    heroLine2: 'வாய்ப்புகளைக் கண்டறியுங்கள்.',
    heroLine3: 'பாதுகாப்பாக இருங்கள்.',
    heroSub: 'கடல், வானிலை, மீன்பிடி மற்றும் பாதுகாப்பு நுண்ணறிவை இணைக்கும் AI ஆதரவு அமைப்பு.',
    searchPlaceholder: 'மீன்பிடி, வானிலை, கடல் நிலை பற்றி கேளுங்கள்...',
    btnAnalyze: 'கடல் பகுப்பாய்வு',
    btnAnalyzing: 'பகுப்பாய்வு செய்கிறது...',
    quickActionFish: 'மீன்பிடி மண்டலங்கள்',
    quickActionOcean: 'கடல் நிலை',
    quickActionWeather: 'வானிலை',
    quickActionAlerts: 'எச்சரிக்கைகள்',
    quickActionSafety: 'பாதுகாப்பு சோதனை',
    quickActionFishSub: 'ஓஷன்சாட்-3 பிஎப்இஸட் பகுதி',
    quickActionOceanSub: 'அலைகள் மற்றும் நீரோட்டம்',
    quickActionWeatherSub: 'வானிலை மைய காற்றின் முன்னறிவிப்பு',
    quickActionAlertsSub: 'நேரலை எச்சரிக்கைகள்',
    quickActionSafetySub: 'பன்முக பாதுகாப்பு சோதனை',
    tryPromptLabel: 'விரைவு வினாக்கள்:',
    promptSafe: 'நாளை காலை மீன்பிடிக்க செல்வது பாதுகாப்பானதா?',
    promptStorm: 'புயல் மற்றும் காற்று எச்சரிக்கையை சரிபார்க்கவும்',
    promptPfz: 'மீன்கள் அதிகம் உள்ள பிஎப்இஸட் பகுதிகளைக் கண்டறியவும்',
    promptCochin: 'அலை உயரம் மற்றும் கடல் நிலையை பார்க்கவும்',
    safetyTitle: 'பாதுகாப்பு',
    fishingTitle: 'மீன்பிடி வாய்ப்பு',
    oceanTitle: 'கடல் வெப்பநிலை',
    windTitle: 'காற்று வேகம்',
    whyDecision: 'இந்த முடிவின் பின்னணி?',
    safetyOverrides: 'பாதுகாப்பே முதன்மையானது',
    safetyOverrideDirective: 'கட்டாய வழிகாட்டுதல்',
    safetyOverrideMsg: 'மீன் கிடைக்கும் வாய்ப்பு அதிகமாக இருந்தாலும், வானிலை மைய தீவிர எச்சரிக்கை காரணமாக கடலுக்குச் செல்ல வேண்டாம்.',
    inlandMsg: 'இந்த இடம் நிலப்பரப்பில் உள்ளது. கடல் மீன்பிடி பகுப்பாய்வு இங்கு பொருந்தாது.',
    exploreCoastal: 'கடலோர பகுதிகளைப் பார்க்கவும்',
    dataTrustTitle: 'தரவு நம்பகத்தன்மை மையம்',
    demoModeActive: 'டெமோ தரவு — உண்மையான பயணத்திற்கு அல்ல',
    liveDataBadge: 'லைவ்',
    demoDataBadge: 'டெமோ தரவு',
    canGoYes: 'மீன்பிடிக்க செல்லலாம் ✅',
    canGoNo: 'கடலுக்கு செல்ல வேண்டாம் (ஆபத்து) ❌',
    canGoCaution: 'எச்சரிக்கையுடன் செல்லுங்கள் ⚠️',
    verdictQuestion: 'இன்று கடலுக்கு செல்லலாமா?',
    whyTitle: 'எளிய மற்றும் தெளிவான காரணங்கள் (ஏன்?)',
    sosCallTitle: 'அவசர உதவி தொலைபேசி எண்கள் (அழைக்க)',
    coastGuardCall: 'இந்திய கடலோரக் காவல் படை: 1554',
    nationalEmergencyCall: 'தேசிய அவசர எண்: 112',
    coastalPoliceCall: 'கடலோர காவல் துறை: 1093',
    fisheriesCellCall: 'மீன்வளத்துறை கட்டுப்பாட்டு அறை: 1077',
    reasonWaveSafe: 'கடல் அலைகள் அமைதியாகவும் பாதுகாப்பாகவும் உள்ளன',
    reasonWaveHigh: 'அபாயகரமான உயரமான அலைகள் (>3.0m) — படகு கவிழும் ஆபத்து',
    reasonWindNormal: 'காற்றின் வேகம் சாதாரணமாகவும் பாதுகாப்பாகவும் உள்ளது',
    reasonWindGale: 'சூறாவளிக் காற்று எச்சரிக்கை (>45 km/h)',
    reasonFishGood: 'மீன்கள் அதிகம் கிடைக்க நல்ல வாய்ப்பு உள்ள பகுதி',
    reasonNoStorm: 'புயல் அல்லது சூறாவளி எச்சரிக்கை ஏதுமில்லை',
    reasonStormAlert: 'வானிலை மையத்தின் தீவிர புயல் எச்சரிக்கை அமலில் உள்ளது',
    returnAdvice: 'மாலை 5:00 மணிக்குள் துறைமுகத்திற்குத் திரும்புவது நல்லது',
    navDashboard: 'முகப்பு பலகை',
    navMap: 'கடல் வரைபடம்',
    navPorts: 'துறைமுகங்கள்',
    navPfz: 'பிஎப்இஸட் மண்டலம்',
    navWeather: 'வானிலை',
    navNews: 'செய்திகள்',
    navTrust: 'தரவு நம்பகத்தன்மை',
    navSos: 'அவசர உதவி (SOS)',
    navAlerts: 'எச்சரிக்கைகள்',
    navHistory: 'வரலாறு',
    navLocation: 'துறைமுக பகுதி',
    systemOperational: 'கணினி: முழுமையாக இயங்குகிறது',
    liveFeeds: 'நேரலை தரவு',
    demoFeeds: 'டெமோ மதிப்பீடு',
    isroStatus: 'இஸ்ரோ ஓஷன்சாட்-3: நேரலை',
    incoisStatus: 'இன்காய்ஸ் கடல்: நேரலை',
    imdStatus: 'வானிலை மையம்: நேரலை',
    sectorStatus: 'துறைமுக பகுதி:',
    metricWave: 'கடல் அலைகள்',
    metricWind: 'காற்றின் வேகம்',
    metricFish: 'மீன் வாய்ப்பு',
    metricReturn: 'திரும்பும் நேரம்',
    metricWaveSafeVal: 'அமைதியானது & குறைவு',
    metricWaveSafeDesc: 'பாதுகாப்பான கடல் நிலை',
    metricWaveDangerVal: 'ஆபத்தான அலைகள்',
    metricWaveDangerDesc: 'படகு கவிழும் அபாயம்',
    metricWindSafeVal: 'சாதாரண காற்று',
    metricWindSafeDesc: 'பாதுகாப்பான பயணம்',
    metricWindDangerVal: 'சூறாவளி காற்று',
    metricWindDangerDesc: 'கடும் காற்று ஆபத்து',
    metricFishHighVal: 'அதிக வாய்ப்பு',
    metricFishHighDesc: 'அதிக மீன் திரள் மண்டலம்',
    metricReturnVal: 'மாலை 5:00 க்குள்',
    metricReturnDesc: 'வெளிச்சத்தில் திரும்புங்கள்',
    cardOcean: 'கடல் நிலை தொலைநிலை அளவீடு',
    cardWeather: 'கடலோர வானிலை',
    cardPfz: 'சாத்தியமான மீன்பிடி மண்டலம் (PFZ)',
    cardAlerts: 'செயலில் உள்ள எச்சரிக்கைகள்',
    sst: 'கடல் மேற்பரப்பு வெப்பநிலை',
    waveHeight: 'அலை உயரம்',
    swell: 'ஸ்வெல் உயரம்',
    currentSpeed: 'நீரோட்ட வேகம்',
    salinity: 'உப்புத்தன்மை',
    tideStatus: 'அலை ஏற்ற-இறக்கம்',
    airTemp: 'காற்று வெப்பநிலை',
    windSpeed: 'காற்று வேகம்',
    windGust: 'காற்று வீச்சு',
    pressure: 'காற்று அழுத்தம்',
    humidity: 'ஈரப்பதம்',
    uvIndex: 'புற ஊதா குறியீடு',
    targetFish: 'இலக்கு மீன் வகைகள்',
    chlorophyllIndex: 'குளோரோபில் குறியீடு',
    distanceOffshore: 'கரையில் இருந்து தொலைவு',
    depth: 'ஆழ வரம்பு',
    validUntil: 'செல்லுபடியாகும் நேரம்',
    noActiveAlerts: 'இப்பகுதியில் தீவிர எச்சரிக்கைகள் ஏதுமில்லை',
    viewAllAlerts: 'அனைத்து எச்சரிக்கைகளையும் காண்க',
    agentPipelineHeader: 'நேரலை பல-முகவர் முடிவு கட்டமைப்பு',
    agentPipelineSub: 'இஸ்ரோ, இன்காய்ஸ், வானிலை மைய தரவுகளின் தானியங்கி பகுப்பாய்வு',
    decisionSynthesis: 'பல-முகவர் முடிவு தொகுப்பு',
    operationalDirective: 'செயல்பாட்டு உத்தரவு:',
    decisionRationale: 'முடிவிற்கான காரணங்கள் (ஏன்?)',
    viewOnMap: 'வரைபடத்தில் மண்டலத்தைப் பார்க்கவும்',
    confidence: 'நம்பகத்தன்மை:',
    statusLabel: 'நிலை:',
    potentialLabel: 'வாய்ப்பு:',
    sectorLabel: 'மண்டலம்:',
    favorableTitle: 'சூழ்நிலைகள் சாதகமாக உள்ளன',
    cautionTitle: 'எச்சரிக்கையுடன் செயல்படவும்',
    dangerTitle: 'கடலுக்கு செல்ல வேண்டாம் (ஆபத்து)',
    inlandTitle: 'உள்நாட்டு பகுதி',
    favorableSummary: 'மீன்பிடி நடவடிக்கைகளுக்கு கடலும் வானிலையும் மிகவும் சாதகமாக உள்ளன.',
    cautionSummary: 'மிதமான அலைகள் மற்றும் காற்று உள்ளது. கரைக்கு அருகிலேயே செயல்படவும்.',
    dangerSummary: 'தீவிர கடல் பாதுகாப்பு எச்சரிக்கை அமலில் உள்ளது — மீன்பிடிப்பதை உடனடியாக நிறுத்துங்கள்.',
    inlandSummary: 'இந்த நிலப்பரப்பு பகுதியில் கடல் மீன்பிடி பகுப்பாய்வு பொருந்தாது.',
    footerPlatform: 'சாகர்-சேஃப் AI • அடுத்த தலைமுறை கடல் நுண்ணறிவு தளம்',
    footerDataSources: 'தரவு ஆதாரம்: INCOIS + IMD + ISRO',
    footerProtocol: 'பாதுகாப்பே முதன்மை',

    // Agent Pipeline Status Logs & Steps
    agentLocationName: 'இருப்பிட முகவர்',
    agentLocationLabel: 'புவிசார் இருப்பிடம் & துறைமுக ஆயத்தொலைவுகள்',
    agentLocationRunning: 'துறைமுக ஆயத்தொலைவுகள், வழிசெலுத்தல் எல்லைகள் மற்றும் ஆழங்களை சரிபார்க்கிறது...',
    agentLocationCompleted: 'கடலோர மண்டலம் மற்றும் துறைமுக வழிசெலுத்தல் எல்லைகள் வெற்றிகரமாக சரிபார்க்கப்பட்டன.',

    agentPlannerName: 'பணித் திட்ட முகவர்',
    agentPlannerLabel: 'கடல்சார் பணித் திட்டம் & சுற்றளவு',
    agentPlannerRunning: 'கடலோரப் பணி எல்லை மற்றும் 30 கி.மீ தொலைதூர இயக்க சுற்றளவை கணக்கிடுகிறது...',
    agentPlannerCompleted: '30 கி.மீ தூர கடலோர செயல்பாட்டு எல்லை மற்றும் பாதுகாப்பான வழித்தடம் அமைக்கப்பட்டது.',

    agentWeatherName: 'வானிலை முகவர்',
    agentWeatherLabel: 'இந்திய வானிலை மையம் (IMD) ரேடார் & புயல் ஆய்வு',
    agentWeatherRunning: 'வானிலை மைய ரேடார், புயல் சுழற்சி மற்றும் காற்று எச்சரிக்கைகளை பெறுகிறது...',
    agentWeatherCompleted: 'காற்றின் வேகம், வளிமண்டல அழுத்தம் மற்றும் புயல் ரேடார்கள் சரிபார்க்கப்பட்டன.',

    agentOceanName: 'பெருங்கடல் முகவர்',
    agentOceanLabel: 'இன்காய்ஸ் (INCOIS) கடல் நிலை முன்னறிவிப்பு',
    agentOceanRunning: 'இன்காய்ஸ் நேரலை மிதவை வலையமைப்பு மற்றும் அலை மாதிரி தரவுகளை பெறுகிறது...',
    agentOceanCompleted: 'கடல் மேற்பரப்பு வெப்பநிலை (SST), அலை உயரம் மற்றும் கடல் நீரோட்டங்கள் பெறப்பட்டன.',

    agentPfzName: 'மீன்பிடி மண்டல (PFZ) முகவர்',
    agentPfzLabel: 'இஸ்ரோ ஓஷன்சாட்-3 வெப்ப முகப்பு & பச்சையம்',
    agentPfzRunning: 'இஸ்ரோ ஓஷன்சாட்-3 பச்சையம் மற்றும் வெப்ப முகப்பு சாய்வு பகுப்பாய்வு...',
    agentPfzCompleted: 'அதிக மீன் திரள் மண்டலம் (PFZ) மற்றும் மீன் கூட்டங்கள் கண்டறியப்பட்டன.',

    agentSafetyName: 'பாதுகாப்பு முகவர்',
    agentSafetyLabel: 'கடலோரக் காவல்படை பாதுகாப்பு நெறிமுறைகள்',
    agentSafetyRunning: 'கடலோரக் காவல்படை பாதுகாப்பு வரம்புகள் மற்றும் கடல் கொந்தளிப்பு சரிபார்ப்பு...',
    agentSafetyCompleted: 'அனைத்து கடல் பாதுகாப்பு எல்லைகள் மற்றும் அபாய வரம்புகள் சரிபார்க்கப்பட்டன.',

    agentGeospatialName: 'புவிசார் வரைபட முகவர்',
    agentGeospatialLabel: 'கடல் ஆழம் & பாதுகாப்பான வழிசெலுத்தல் பாதை',
    agentGeospatialRunning: 'துறைமுக நுழைவு வழித்தட ஆழம் மற்றும் பாதுகாப்பான பயணப்பாதையை சரிபார்க்கிறது...',
    agentGeospatialCompleted: 'துறைமுக வழித்தடம் மற்றும் பாதுகாப்பான படகு ஆழம் உறுதி செய்யப்பட்டது.',

    agentDecisionName: 'முடிவு தொகுப்பு முகவர்',
    agentDecisionLabel: 'பாதுகாப்பே முதன்மை - பல காரணி ஒருங்கிணைப்பு',
    agentDecisionRunning: 'பாதுகாப்பே முதன்மை விதியை செயல்படுத்தி பல காரணிகளை ஒருங்கிணைக்கிறது...',
    agentDecisionCompleted: 'பாதுகாப்பு மற்றும் மீன்பிடி வாய்ப்புகள் செயல்பாட்டு உத்தரவாக தொகுக்கப்பட்டன.',

    agentResponseName: 'பதில் ஆலோசனை முகவர்',
    agentResponseLabel: 'எளிய மொழி மீனவர் ஆலோசனை & குரல் வழிகாட்டல்',
    agentResponseRunning: 'எளிய மொழியில் காரணங்கள், அறிவியல் விளக்கம் மற்றும் குரல் ஆலோசனையை தொகுக்கிறது...',
    agentResponseCompleted: 'மீனவர்களுக்கான எளிய செயல்பாட்டு ஆலோசனை மற்றும் குரல் வழிகாட்டல் தயார்.',

    // Pipeline summary & sync logs
    pipelineNodesSynced: 'கட்டமைப்பு முனையங்கள் இணைக்கப்பட்டன',
    pipelineDistributedSub: 'வானிலை, பெருங்கடல் நிலை மற்றும் பாதுகாப்பை உறுதி செய்யும் பல-முகவர் கட்டமைப்பு',
    pipelineAwaitingStream: 'நேரலை தரவுக்காக காத்திருக்கிறது...',

    // Detailed Report Descriptions
    reportSafetyOverrideDesc: 'அதிக மீன் வளம் கண்டறியப்பட்டாலும், கடுமையான வானிலை எச்சரிக்கை காரணமாக அனைத்து செயல்பாடுகளும் ரத்து செய்யப்படுகின்றன. பாதுகாப்பு முதன்மையானது — அனைத்து படகுகளும் துறைமுகத்திலேயே இருக்க வேண்டும்.',
    reportFavorableDetailed: 'மீன்பிடி நடவடிக்கைகளுக்கு கடலும் வானிலையும் மிகவும் உகந்ததாக உள்ளன. அலைகள் மிதமாகவும், காற்றின் வேகம் படகு பாதுகாப்பிற்கு ஏற்றதாகவும் உள்ளது. செயற்கைக்கோள் தரவுப்படி குளோரோபில் மண்டலங்களில் அதிக மீன் பிடிப்புக்கு சிறந்த வாய்ப்பு உள்ளது. மாலைக்குள் கரை திரும்புங்கள்.',
    reportCautionDetailed: 'வெளிக்கடல் பகுதிகளில் மிதமான அலைகள் மற்றும் பலத்த காற்று வீசக்கூடும். ஆழ்கடலுக்கு செல்வதை தவிர்க்கவும். கரையோரப் பகுதிகளில் மட்டுமே மீன்பிடிக்க அறிவுறுத்தப்படுகிறது; விஎச்எஃப் ரேடியோவை இயக்கி வைத்துக்கொண்டு மாலையாவதற்குள் கரை திரும்புங்கள்.',
    reportDangerDetailed: 'தீவிர கடல் ஆபத்து: 3.5 மீட்டருக்கு மேல் ஆபத்தான கொந்தளிப்பான அலைகள் மற்றும் பலத்த புயல் காற்று வீசுகிறது. படகு கவிழும் பெரும் ஆபத்து உள்ளது. கடலோரக் காவல் படையால் முழுமையான மீன்பிடி தடை விதிக்கப்பட்டுள்ளது. எக்காரணம் கொண்டும் கடலுக்குள் செல்ல வேண்டாம்.',
    reportInlandDetailed: 'தேர்ந்தெடுக்கப்பட்ட பகுதி உள்நாட்டு நிலப்பரப்பில் அமைந்துள்ளது. கடல் அலைகள், கடல் மேற்பரப்பு வெப்பநிலை மற்றும் கடல் மீன்பிடி மண்டலங்கள் (PFZ) கடலோர பகுதிகளுக்கு மட்டுமே பொருந்தும்.',
    reportTelemetryConfidenceDesc: 'நம்பகத்தன்மை 4 தேசிய தரவு கட்டமைப்புகளிலிருந்து சரிபார்க்கப்பட்டது: இன்காய்ஸ் கடல் மிதவைகள், இந்திய வானிலை மைய ரேடார் மற்றும் இஸ்ரோ ஓஷன்சாட்-3 செயற்கைக்கோள் தரவுகள்.',
    reportVesselSafetyDesc: 'சிறிய விசைப்படகுகள் (<12 மீ) மற்றும் பாரம்பரிய நாட்டுப் படகுகள் இந்த பாதுகாப்பு நெறிமுறைகளை கண்டிப்பாக பின்பற்ற வேண்டும். கொந்தளிப்பான கடலில் செல்லக்கூடாது.',
    reportReturnWindowDesc: 'பகலில் மாலை 5:00 மணிக்குள் துறைமுகத்திற்கு பாதுகாப்பாக திரும்புவது அவசியம்.',
    reportFishAggregationDesc: 'ஓஷன்சாட்-3 வெப்ப எல்லைகள் மற்றும் பச்சையக் குறியீட்டின் அடிப்படையில் கானாங்கெளுத்தி, மத்தி மற்றும் நெய்மீன் மீன் திரள்.'
  },

  te: { // Telugu (Andhra Coast)
    appTitle: 'సాగర్-సేఫ్ AI',
    tagline: 'సముద్ర సమాచారం & భద్రత',
    heroLine1: 'సముద్రాన్ని తెలుసుకోండి.',
    heroLine2: 'మంచి అవకాశాన్ని పొందండి.',
    heroLine3: 'సురక్షితంగా ఉండండి.',
    heroSub: 'సముద్రం, వాతావరణం, చేపల వేట మరియు భద్రతను కలిపే AI నిర్ణయ సహాయక వ్యవస్థ.',
    searchPlaceholder: 'చేపల వేట, వాతావరణం, సముద్ర స్థితి గురించి అడగండి...',
    btnAnalyze: 'సముద్ర విశ్లేషణ',
    btnAnalyzing: 'విశ్లేషిస్తోంది...',
    quickActionFish: 'చేపల వేట ప్రాంతాలు',
    quickActionOcean: 'సముద్ర స్థితి',
    quickActionWeather: 'వాతావరణం',
    quickActionAlerts: 'హెచ్చరికలు',
    quickActionSafety: 'భద్రతా తనిఖీ',
    quickActionFishSub: 'ఓషన్‌శాట్-3 పిఎఫ్‌జెడ్ జోన్',
    quickActionOceanSub: 'అలలు మరియు ప్రవాహం',
    quickActionWeatherSub: 'తీరప్రాంత గాలి సూచన',
    quickActionAlertsSub: 'లైవ్ హెచ్చరికలు',
    quickActionSafetySub: 'భద్రతా ధృవీకరణ',
    tryPromptLabel: 'శీఘ్ర ప్రశ్నలు:',
    promptSafe: 'రేపు ఉదయం చేపల వేటకు వెళ్లడం సురక్షితమేనా?',
    promptStorm: 'తుఫాను మరియు గాలి హెచ్చరికలను తనిఖీ చేయండి',
    promptPfz: 'ఎక్కువ చేపలు లభించే పిఎఫ్‌జెడ్ ప్రాంతాలను కనుగొనండి',
    promptCochin: 'అలల ఎత్తు మరియు సముద్ర స్థితిని చూడండి',
    safetyTitle: 'భద్రత',
    fishingTitle: 'చేపల లభ్యత',
    oceanTitle: 'సముద్ర ఉష్ణోగ్రత',
    windTitle: 'గాలి వేగం',
    whyDecision: 'ఈ నిర్ణయానికి కారణం ఏమిటి?',
    safetyOverrides: 'భద్రతే అత్యంత ముఖ్యం',
    safetyOverrideDirective: 'తప్పనిసరి ఆదేశం',
    safetyOverrideMsg: 'చేపలు దొరికే అవకాశం ఎక్కువగా ఉన్నప్పటికీ, తీవ్రమైన వాతావరణ హెచ్చరిక కారణంగా వేటను పూర్తిగా రద్దు చేయాలి.',
    inlandMsg: 'ఈ ప్రదేశం భూభాగంలో ఉంది. సముద్ర విశ్లేషణ ఇక్కడ వర్తించదు.',
    exploreCoastal: 'తీరప్రాంతాలను చూడండి',
    dataTrustTitle: 'డేటా విశ్వసనీయత కేంద్రం',
    demoModeActive: 'డెమో డేటా — నిజమైన ప్రయాణానికి కాదు',
    liveDataBadge: 'లైవ్',
    demoDataBadge: 'డెమో డేటా',
    canGoYes: 'చేపల వేటకు వెళ్ళవచ్చు ✅',
    canGoNo: 'సముద్రంలోకి వెళ్ళవద్దు (ప్రమాదం) ❌',
    canGoCaution: 'జాగ్రత్తగా వెళ్ళండి ⚠️',
    verdictQuestion: 'ఈరోజు సముద్రంలోకి వెళ్ళవచ్చా?',
    whyTitle: 'సులభమైన మరియు స్పష్టమైన కారణాలు (ఎందుకు?)',
    sosCallTitle: 'అత్యవసర సహాయ హెల్ప్‌లైన్ నంబర్లు',
    coastGuardCall: 'కోస్ట్ గార్డ్ (Coast Guard): 1554',
    nationalEmergencyCall: 'జాతీయ అత్యవసర సహాయం: 112',
    coastalPoliceCall: 'కోస్టల్ సెక్యూరిటీ పోలీస్: 1093',
    fisheriesCellCall: 'మత్స్యశాఖ కంట్రోల్ రూమ్: 1077',
    reasonWaveSafe: 'సముద్ర అలలు ప్రశాంతంగా మరియు సురక్షితంగా ఉన్నాయి',
    reasonWaveHigh: 'ఎత్తైన ప్రమాదకరమైన అలలు (>3.0m) — పడవ మునిగే ప్రమాదం',
    reasonWindNormal: 'గాలి వేగం సాధారణంగా మరియు సురక్షితంగా ఉంది',
    reasonWindGale: 'తీవ్రమైన ఈదురుగాలుల హెచ్చరిక (>45 km/h)',
    reasonFishGood: 'సముద్రంలో చేపలు ఎక్కువగా దొరికే మంచి అవకాశం ఉంది',
    reasonNoStorm: 'తుఫాను లేదా వాయుగుండం హెచ్చరికలు ఏవీ లేవు',
    reasonStormAlert: 'వాతావరణ శాఖ (IMD) తుఫాను హెచ్చరిక జారీ చేసింది',
    returnAdvice: 'సాయంత్రం 5:00 గంటలలోపు హార్బర్‌కు తిరిగి రావడం క్షేమం',
    navDashboard: 'డ్యాష్‌బోర్డ్',
    navMap: 'సముద్ర పటం',
    navPorts: 'ఓడరేవులు',
    navPfz: 'పిఎఫ్‌జెడ్ జోన్',
    navWeather: 'వాతావరణం',
    navNews: 'వార్తలు',
    navTrust: 'డేటా విశ్వసనీయత',
    navSos: 'అత్యవసర SOS',
    navAlerts: 'హెచ్చరికలు',
    navHistory: 'చరిత్ర',
    navLocation: 'హార్బర్ ప్రాంతం',
    systemOperational: 'వ్యవస్థ: పూర్తిగా సక్రియం',
    liveFeeds: 'లైవ్ డేటా',
    demoFeeds: 'డెమో బెంచ్‌మార్క్',
    isroStatus: 'ఇస్రో ఓషన్‌శాట్-3: లైవ్',
    incoisStatus: 'ఇన్‌కాయిస్ సముద్రం: లైవ్',
    imdStatus: 'వాతావరణ శాఖ: లైవ్',
    sectorStatus: 'హార్బర్ ప్రాంతం:',
    metricWave: 'సముద్ర అలలు',
    metricWind: 'గాలి వేగం',
    metricFish: 'చేపల లభ్యత',
    metricReturn: 'తిరిగి వచ్చే సమయం',
    metricWaveSafeVal: 'ప్రశాంతం & తక్కువ',
    metricWaveSafeDesc: 'సురక్షిత అలల స్థితి',
    metricWaveDangerVal: 'ప్రమాదకర అలలు',
    metricWaveDangerDesc: 'పడవ బోల్తా పడే ప్రమాదం',
    metricWindSafeVal: 'సాధారణ గాలి',
    metricWindSafeDesc: 'సురక్షిత ప్రయాణం',
    metricWindDangerVal: 'తీవ్ర ఈదురుగాలులు',
    metricWindDangerDesc: 'భారీ గాలి ముప్పు',
    metricFishHighVal: 'అత్యధిక అవకాశం',
    metricFishHighDesc: 'ఎక్కువ చేపలు ఉన్న ప్రాంతం',
    metricReturnVal: 'సాయంత్రం 5:00 లోపు',
    metricReturnDesc: 'వెలుతురు ఉండగానే రండి',
    cardOcean: 'సముద్ర స్థితి వివరాలు',
    cardWeather: 'తీరప్రాంత వాతావరణం',
    cardPfz: 'చేపల వేట అనుకూల ప్రాంతం (PFZ)',
    cardAlerts: 'ప్రస్తుత సముద్ర హెచ్చరికలు',
    sst: 'సముద్ర ఉపరితల ఉష్ణోగ్రత',
    waveHeight: 'అలల ఎత్తు',
    swell: 'స్వెల్ ఎత్తు',
    currentSpeed: 'నీటి ప్రవాహ వేగం',
    salinity: 'లవణీయత',
    tideStatus: 'పోటు-పాటు స్థితి',
    airTemp: 'గాలి ఉష్ణోగ్రత',
    windSpeed: 'గాలి వేగం',
    windGust: 'గాలి తీవ్రత',
    pressure: 'గాలి పీడనం',
    humidity: 'తేమ',
    uvIndex: 'యూవీ సూచిక',
    targetFish: 'ప్రధాన చేపల రకాలు',
    chlorophyllIndex: 'క్లోరోఫిల్ సూచిక',
    distanceOffshore: 'తీరం నుండి దూరం',
    depth: 'లోతు పరిధి',
    validUntil: 'చెల్లుబాటు సమయం',
    noActiveAlerts: 'ఈ ప్రాంతంలో ఎటువంటి తీవ్రమైన హెచ్చరికలు లేవు',
    viewAllAlerts: 'అన్ని హెచ్చరికలను చూడండి',
    agentPipelineHeader: 'రియల్-టైమ్ మల్టీ-ఏజెంట్ నిర్ణయ వ్యవస్థ',
    agentPipelineSub: 'ఇస్రో, ఇన్‌కాయిస్, ఐఎండీ సమాచారం యొక్క స్వయంచాలక విశ్లేషణ',
    decisionSynthesis: 'మల్టీ-ఏజెంట్ నిర్ణయ సంశ్లేషణ',
    operationalDirective: 'కార్యాచరణ ఆదేశం:',
    decisionRationale: 'నిర్ణయానికి గల కారణాలు (ఎందుకు?)',
    viewOnMap: 'పటంలో జోన్‌ను వీక్షించండి',
    confidence: 'విశ్వసనీయత:',
    statusLabel: 'స్థితి:',
    potentialLabel: 'అవకాశం:',
    sectorLabel: 'ప్రాంతం:',
    favorableTitle: 'పరిస్థితులు అత్యంత అనుకూలంగా ఉన్నాయి',
    cautionTitle: 'జాగ్రత్తగా ముందుకు సాగండి',
    dangerTitle: 'సముద్రంలోకి వెళ్లవద్దు (ప్రమాదం)',
    inlandTitle: 'భూభాగ ప్రాంతం',
    favorableSummary: 'చేపల వేటకు సముద్రం మరియు వాతావరణ పరిస్థితులు అత్యంత అనుకూలంగా ఉన్నాయి.',
    cautionSummary: 'మధ్యస్థ అలలు మరియు గాలి ఉన్నాయి. తీరానికి సమీపంలో మాత్రమే వేట సాగించండి.',
    dangerSummary: 'తీవ్రమైన సముద్ర భద్రతా హెచ్చరిక అమలులో ఉంది — చేపల వేటను వెంటనే నిలిపివేయండి.',
    inlandSummary: 'ఈ అంతర్గత భూభాగ స్థానంలో సముద్ర చేపల వేట విశ్లేషణ వర్తించదు.',
    footerPlatform: 'సాగర్-సేఫ్ AI • అత్యాధునిక సముద్ర సమాచార వేదిక',
    footerDataSources: 'సమాచార మూలాలు: INCOIS + IMD + ISRO',
    footerProtocol: 'భద్రతే ప్రథమ ప్రాధాన్యం'
  },

  mr: { // Marathi (Maharashtra Coast)
    appTitle: 'सागर-सेफ AI',
    tagline: 'सागरी बुद्धिमत्ता आणि सुरक्षितता',
    heroLine1: 'समुद्राला ओळखा.',
    heroLine2: 'संधी शोधा.',
    heroLine3: 'सुरक्षित राहा.',
    heroSub: 'समुद्र, हवामान, मासेमारी आणि सुरक्षिततेची माहिती देणारी AI प्रणाली.',
    searchPlaceholder: 'मासेमारी, हवामान, समुद्राच्या स्थितीबद्दल विचारा...',
    btnAnalyze: 'समुद्र विश्लेषण करा',
    btnAnalyzing: 'विश्लेषण सुरू आहे...',
    quickActionFish: 'मासेमारी क्षेत्र',
    quickActionOcean: 'समुद्राची स्थिती',
    quickActionWeather: 'सागरी हवामान',
    quickActionAlerts: 'इशारे व सूचना',
    quickActionSafety: 'सुरक्षा तपासणी',
    quickActionFishSub: 'ओशनसॅट-३ पीएफझेड क्षेत्र',
    quickActionOceanSub: 'लाटा व सागरी प्रवाह',
    quickActionWeatherSub: 'हवामान खात्याचा अंदाज',
    quickActionAlertsSub: 'थेट इशारे व सूचना',
    quickActionSafetySub: 'सुरक्षा पडताळणी',
    tryPromptLabel: 'त्वरित प्रश्न:',
    promptSafe: 'उद्या सकाळी मासेमारीला जाणे सुरक्षित आहे का?',
    promptStorm: 'वादळ आणि वाऱ्याचा इशारा तपासा',
    promptPfz: 'भरपूर मासे असणारे पीएफझेड क्षेत्र शोधा',
    promptCochin: 'लाटांची उंची आणि स्थिती पहा',
    safetyTitle: 'सुरक्षितता',
    fishingTitle: 'मासेमारी क्षमता',
    oceanTitle: 'समुद्र तापमान',
    windTitle: 'वाऱ्याचा वेग',
    whyDecision: 'हा निर्णय का?',
    safetyOverrides: 'सुरक्षा सर्वात महत्त्वाची',
    safetyOverrideDirective: 'अनिवार्य निर्देश',
    safetyOverrideMsg: 'मासे मिळण्याची शक्यता जास्त असली तरी हवामान खात्याच्या वादळी इशाऱ्यामुळे मासेमारी पूर्णपणे रद्द करावी.',
    inlandMsg: 'हे ठिकाण जमिनीवर आहे. सागरी विश्लेषण येथे लागू होत नाही.',
    exploreCoastal: 'किनारपट्टी क्षेत्रे पहा',
    dataTrustTitle: 'डेटा विश्वसनीयता केंद्र',
    demoModeActive: 'डेमो डेटा — प्रत्यक्ष प्रवासासाठी नाही',
    liveDataBadge: 'लाइव्ह',
    demoDataBadge: 'डेमो डेटा',
    canGoYes: 'मासेमारीसाठी जाऊ शकता ✅',
    canGoNo: 'समुद्रात जाऊ नका (धोका) ❌',
    canGoCaution: 'काळजीपूर्वक जा ⚠️',
    verdictQuestion: 'आज समुद्रात जाऊ शकतो का?',
    whyTitle: 'सोपी आणि स्पष्ट कारणे (का?)',
    sosCallTitle: 'आपत्कालीन मदत क्रमांक (कॉल करा)',
    coastGuardCall: 'तटरक्षक दल (Coast Guard): 1554',
    nationalEmergencyCall: 'राष्ट्रीय आपत्कालीन: 112',
    coastalPoliceCall: 'किनारपट्टी पोलीस: 1093',
    fisheriesCellCall: 'मत्स्यव्यवसाय विभाग: 1077',
    reasonWaveSafe: 'समुद्राच्या लाटा शांत आणि सुरक्षित आहेत',
    reasonWaveHigh: 'धोकादायक उंच लाटा (>3.0m) — बोट उलटण्याचा धोका',
    reasonWindNormal: 'वाऱ्याचा वेग सामान्य आणि सुरक्षित आहे',
    reasonWindGale: 'जोरदार वादळी वाऱ्याचा इशारा (>45 km/h)',
    reasonFishGood: 'समुद्रात भरपूर मासे मिळण्याची उत्तम शक्यता',
    reasonNoStorm: 'चक्रीवादळ किंवा वादळाचा कोणताही धोका नाही',
    reasonStormAlert: 'हवामान खात्याचा (IMD) वादळी इशारा सुरू आहे',
    returnAdvice: 'संध्याकाळी ५:०० च्या आधी बंदरात परत येणे सुरक्षित राहील',
    navDashboard: 'डॅशबोर्ड',
    navMap: 'सागरी नकाशा',
    navPorts: 'बंदर निर्देशिका',
    navPfz: 'पीएफझेड क्षेत्र',
    navWeather: 'हवामान',
    navNews: 'बातम्या',
    navTrust: 'डेटा विश्वसनीयता',
    navSos: 'आपत्कालीन SOS',
    navAlerts: 'धोका इशारे',
    navHistory: 'इतिहास',
    navLocation: 'बंदर क्षेत्र',
    systemOperational: 'प्रणाली: पूर्णपणे कार्यरत',
    liveFeeds: 'थेट डेटा',
    demoFeeds: 'डेमो बेंचमार्क',
    isroStatus: 'इस्रो ओशनसॅट-३: लाइव्ह',
    incoisStatus: 'इन्कॉईस समुद्र: लाइव्ह',
    imdStatus: 'हवामान खाते: लाइव्ह',
    sectorStatus: 'बंदर क्षेत्र:',
    metricWave: 'समुद्राच्या लाटा',
    metricWind: 'वाऱ्याचा वेग',
    metricFish: 'मासेमारी शक्यता',
    metricReturn: 'परतीची वेळ',
    metricWaveSafeVal: 'शांत आणि सुरक्षित',
    metricWaveSafeDesc: 'कमी उंचीच्या लाटा',
    metricWaveDangerVal: 'धोकादायक लाटा',
    metricWaveDangerDesc: 'बोट उलटण्याचा धोका',
    metricWindSafeVal: 'सामान्य वारा',
    metricWindSafeDesc: 'सुरक्षित प्रवास',
    metricWindDangerVal: 'वादळी वारा',
    metricWindDangerDesc: 'अतिवेगवान वाऱ्याचा धोका',
    metricFishHighVal: 'उत्तम शक्यता',
    metricFishHighDesc: 'मोठ्या प्रमाणात मासे',
    metricReturnVal: 'संध्याकाळी ५:०० पूर्वी',
    metricReturnDesc: 'उजेडात परत या',
    cardOcean: 'समुद्र स्थिती माहिती',
    cardWeather: 'किनारपट्टी हवामान',
    cardPfz: 'संभाव्य मासेमारी क्षेत्र (PFZ)',
    cardAlerts: 'सक्रिय सागरी इशारे',
    sst: 'समुद्र पृष्ठभाग तापमान',
    waveHeight: 'लाटांची उंची',
    swell: 'स्वेल उंची',
    currentSpeed: 'प्रवाहाचा वेग',
    salinity: 'क्षारता',
    tideStatus: 'भरती-ओहोटी स्थिती',
    airTemp: 'हवेचे तापमान',
    windSpeed: 'वाऱ्याचा वेग',
    windGust: 'वाऱ्याची झेप',
    pressure: 'हवेचा दाब',
    humidity: 'आर्द्रता',
    uvIndex: 'अतिनील निर्देशांक',
    targetFish: 'प्रमुख माशांच्या प्रजाती',
    chlorophyllIndex: 'क्लोरोफिल निर्देशांक',
    distanceOffshore: 'किनाऱ्यापासून अंतर',
    depth: 'खोलीची मर्यादा',
    validUntil: 'वैधता वेळ',
    noActiveAlerts: 'या भागात कोणताही गंभीर इशारा नाही',
    viewAllAlerts: 'सर्व इशारे पहा',
    agentPipelineHeader: 'थेट मल्टी-एजंट निर्णय प्रणाली',
    agentPipelineSub: 'इस्रो, इन्कॉईस आणि हवामान खात्याच्या डेटाचे स्वयंचलित विश्लेषण',
    decisionSynthesis: 'मल्टी-एजंट निर्णय संकलन',
    operationalDirective: 'कार्यकारी निर्देश:',
    decisionRationale: 'निर्णयाची कारणे (का?)',
    viewOnMap: 'नकाशावर क्षेत्र पहा',
    confidence: 'विश्वसनीयता:',
    statusLabel: 'स्थिती:',
    potentialLabel: 'क्षमता:',
    sectorLabel: 'क्षेत्र:',
    favorableTitle: 'परिस्थिती अनुकूल आहे',
    cautionTitle: 'सावधगिरी बाळगा',
    dangerTitle: 'समुद्रात जाऊ नका (धोका)',
    inlandTitle: 'जमिनीवरील क्षेत्र',
    favorableSummary: 'मासेमारीसाठी समुद्र आणि हवामानाची परिस्थिती पूर्णपणे अनुकूल आहे.',
    cautionSummary: 'मध्यम लाटा आणि वारा आहे. केवळ किनाऱ्याजवळच मासेमारी करा.',
    dangerSummary: 'गंभीर सागरी सुरक्षा इशारा लागू — मासेमारी तात्काळ थांबवा.',
    inlandSummary: 'या अंतर्देशीय ठिकाणी सागरी मासेमारी विश्लेषण लागू होत नाही.',
    footerPlatform: 'सागर-सेफ AI • पुढच्या पिढीची सागरी गुप्तचर यंत्रणा',
    footerDataSources: 'डेटा स्रोत: INCOIS + IMD + ISRO',
    footerProtocol: 'सुरक्षा सर्वोच्च प्राधान्य'
  },

  bn: { // Bengali (West Bengal Coast)
    appTitle: 'সাগর-সেফ AI',
    tagline: 'সামুদ্রিক তথ্য ও সুরক্ষা',
    heroLine1: 'সমুদ্রকে জানুন।',
    heroLine2: 'সুযোগ খুঁজুন।',
    heroLine3: 'নিরাপদ থাকুন।',
    heroSub: 'সমুদ্র, আবহাওয়া, মাছ ধরা এবং নিরাপত্তার সমন্বিত AI সিদ্ধান্ত সহায়ক ব্যবস্থা।',
    searchPlaceholder: 'মাছ ধরা, আবহাওয়া বা সমুদ্রের অবস্থা সম্পর্কে জিজ্ঞাসা করুন...',
    btnAnalyze: 'সমুদ্র বিশ্লেষণ করুন',
    btnAnalyzing: 'বিশ্লেষণ চলছে...',
    quickActionFish: 'মাছ ধরার অঞ্চল',
    quickActionOcean: 'সমুদ্রের অবস্থা',
    quickActionWeather: 'আবহাওয়া',
    quickActionAlerts: 'সতর্কবার্তা',
    quickActionSafety: 'নিরাপত্তা যাচাই',
    quickActionFishSub: 'ওশানস্যাট-৩ পিএফজেড জোন',
    quickActionOceanSub: 'ঢেউ ও সমুদ্রস্রোত',
    quickActionWeatherSub: 'উপকূলীয় বাতাসের পূর্বাভাস',
    quickActionAlertsSub: 'লাইভ সতর্কতা',
    quickActionSafetySub: 'বহুমাত্রিক নিরাপত্তা যাচাই',
    tryPromptLabel: 'দ্রুত প্রশ্নাবলী:',
    promptSafe: 'কাল সকালে মাছ ধরতে যাওয়া কি নিরাপদ?',
    promptStorm: 'ঝড় ও নিম্নচাপের সতর্কতা পরীক্ষা করুন',
    promptPfz: 'বেশি মাছ পাওয়ার পিএফজেড অঞ্চল খুঁজুন',
    promptCochin: 'ঢেউয়ের উচ্চতা ও সমুদ্রের অবস্থা দেখুন',
    safetyTitle: 'নিরাপত্তা',
    fishingTitle: 'মাছের সম্ভাবনা',
    oceanTitle: 'সমুদ্র তাপমাত্রা',
    windTitle: 'বাতাসের গতি',
    whyDecision: 'কেন এই সিদ্ধান্ত?',
    safetyOverrides: 'নিরাপত্তাই সবার আগে',
    safetyOverrideDirective: 'বাধ্যতামূলক নির্দেশিকা',
    safetyOverrideMsg: 'প্রচুর মাছ পাওয়ার সম্ভাবনা থাকলেও আবহাওয়া দপ্তরের ঝড়ের সতর্কতার কারণে সমুদ্রে যাওয়া সম্পূর্ণ নিষেধ।',
    inlandMsg: 'এই অবস্থানটি অন্তর্দেশীয়। এখানে সামুদ্রিক বিশ্লেষণ প্রযোজ্য নয়।',
    exploreCoastal: 'উপকূলীয় এলাকা দেখুন',
    dataTrustTitle: 'তথ্য নির্ভরযোগ্যতা কেন্দ্র',
    demoModeActive: 'ডেমো ডেটা — আসল সমুদ্র যাত্রার জন্য নয়',
    liveDataBadge: 'লাইভ',
    demoDataBadge: 'ডেমো ডেটা',
    canGoYes: 'মাছ ধরতে যেতে পারেন ✅',
    canGoNo: 'সমুদ্রে যাবেন না (বিপদ) ❌',
    canGoCaution: 'সতর্কতার সাথে যান ⚠️',
    verdictQuestion: 'আজ কি সমুদ্রে যাওয়া যাবে?',
    whyTitle: 'সহজ ও স্পষ্ট কারণ (কেন?)',
    sosCallTitle: 'জরুরি উদ্ধার হেল্পলাইন নম্বর',
    coastGuardCall: 'কোস্ট গার্ড (Coast Guard): 1554',
    nationalEmergencyCall: 'জাতীয় জরুরি নম্বর: 112',
    coastalPoliceCall: 'উপকূলীয় পুলিশ: 1093',
    fisheriesCellCall: 'মৎস্য বিভাগ কন্ট্রোল রুম: 1077',
    reasonWaveSafe: 'সমুদ্রের ঢেউ শান্ত ও নিরাপদ রয়েছে',
    reasonWaveHigh: 'বিপজ্জনক উঁচু ঢেউ (>3.0m) — ট্রলার উল্টে যাওয়ার ঝুঁকি',
    reasonWindNormal: 'বাতাসের গতি স্বাভাবিক ও নিরাপদ',
    reasonWindGale: 'ঝড়ো বাতাসের চরম সতর্কতা (>45 km/h)',
    reasonFishGood: 'গভীর সমুদ্রে প্রচুর মাছ পাওয়ার উজ্জ্বল সম্ভাবনা',
    reasonNoStorm: 'উপকূলে কোনো ঘূর্ণিঝড় বা নিম্নচাপের সতর্কতা নেই',
    reasonStormAlert: 'আবহাওয়া দপ্তরের (IMD) গভীর নিম্নচাপ বা ঘূর্ণিঝড়ের সতর্কতা জারি',
    returnAdvice: 'বিকেল ৫:০০ টার মধ্যে ঘাটে ফিরে আসা নিরাপদ',
    navDashboard: 'ড্যাশবোর্ড',
    navMap: 'সমুদ্র মানচিত্র',
    navPorts: 'বন্দর তালিকা',
    navPfz: 'পিএফজেড এলাকা',
    navWeather: 'আবহাওয়া',
    navNews: 'সংবাদ',
    navTrust: 'তথ্য নির্ভরযোগ্যতা',
    navSos: 'জরুরি SOS',
    navAlerts: 'সতর্কবার্তা',
    navHistory: 'ইতিহাস',
    navLocation: 'বন্দর এলাকা',
    systemOperational: 'সিস্টেম: সম্পূর্ণ সক্রিয়',
    liveFeeds: 'লাইভ তথ্য',
    demoFeeds: 'ডেমো বেঞ্চমার্ক',
    isroStatus: 'ইসরো ওশানস্যাট-৩: লাইভ',
    incoisStatus: 'ইনকোইস সমুদ্র: লাইভ',
    imdStatus: 'আবহাওয়া দপ্তর: লাইভ',
    sectorStatus: 'বন্দর এলাকা:',
    metricWave: 'সমুদ্রের ঢেউ',
    metricWind: 'বাতাসের গতি',
    metricFish: 'মাছের সম্ভাবনা',
    metricReturn: 'ফেরার সময়',
    metricWaveSafeVal: 'শান্ত ও নিরাপদ',
    metricWaveSafeDesc: 'কম উচ্চতার ঢেউ',
    metricWaveDangerVal: 'বিপজ্জনক ঢেউ',
    metricWaveDangerDesc: 'ট্রলার ডোবার ঝুঁকি',
    metricWindSafeVal: 'স্বাভাবিক বাতাস',
    metricWindSafeDesc: 'নিরাপদ যাত্রা',
    metricWindDangerVal: 'ঝড়ো বাতাস',
    metricWindDangerDesc: 'প্রবল দমকা হাওয়া',
    metricFishHighVal: 'উচ্চ সম্ভাবনা',
    metricFishHighDesc: 'প্রচুর মাছের ঝাঁক',
    metricReturnVal: 'বিকেল ৫:০০ টার আগে',
    metricReturnDesc: 'দিনের আলোয় ফিরুন',
    cardOcean: 'সমুদ্র অবস্থার তথ্য',
    cardWeather: 'উপকূলীয় আবহাওয়া',
    cardPfz: 'সম্ভাব্য মাছ ধরার এলাকা (PFZ)',
    cardAlerts: 'সক্রিয় সামুদ্রিক সতর্কতা',
    sst: 'সমুদ্রপৃষ্ঠের তাপমাত্রা',
    waveHeight: 'ঢেউয়ের উচ্চতা',
    swell: 'সোয়েল উচ্চতা',
    currentSpeed: 'স্রোতের গতি',
    salinity: 'লবণাক্ততা',
    tideStatus: 'জোয়ার-ভাটা অবস্থা',
    airTemp: 'বায়ুর তাপমাত্রা',
    windSpeed: 'বাতাসের গতি',
    windGust: 'দমকা হাওয়ার গতি',
    pressure: 'বায়ুচাপ',
    humidity: 'আর্দ্রতা',
    uvIndex: 'ইউভি সূচক',
    targetFish: 'প্রধান মাছের প্রজাতি',
    chlorophyllIndex: 'ক্লোরোফিল সূচক',
    distanceOffshore: 'উপকূল থেকে দূরত্ব',
    depth: 'গভীরতা সীমা',
    validUntil: 'মেয়াদ উত্তীর্ণের সময়',
    noActiveAlerts: 'এই অঞ্চলে কোনো চরম সতর্কতা নেই',
    viewAllAlerts: 'সব সতর্কতা দেখুন',
    agentPipelineHeader: 'রিয়েল-টাইম মাল্টি-এজেন্ট সিদ্ধান্ত ব্যবস্থা',
    agentPipelineSub: 'ইসরো, ইনকোইস এবং আবহাওয়া দপ্তরের তথ্যের স্বয়ংক্রিয় বিশ্লেষণ',
    decisionSynthesis: 'মাল্টি-এজেন্ট সিদ্ধান্ত সংশ্লেষণ',
    operationalDirective: 'কার্যকরী নির্দেশিকা:',
    decisionRationale: 'সিদ্ধান্তের কারণসমূহ (কেন?)',
    viewOnMap: 'মানচিত্রে অঞ্চলটি দেখুন',
    confidence: 'নির্ভরযোগ্যতা:',
    statusLabel: 'অবস্থা:',
    potentialLabel: 'সম্ভাবনা:',
    sectorLabel: 'অঞ্চল:',
    favorableTitle: 'পরিস্থিতি সম্পূর্ণ অনুকূল',
    cautionTitle: 'সতর্কতার সাথে এগিয়ে যান',
    dangerTitle: 'সমুদ্রে যাবেন না (বিপদ)',
    inlandTitle: 'অন্তর্দেশীয় অবস্থান',
    favorableSummary: 'মাছ ধরার জন্য সমুদ্র এবং আবহাওয়া অত্যন্ত অনুকূল।',
    cautionSummary: 'মাঝারি ঢেউ এবং বাতাস রয়েছে। শুধুমাত্র উপকূলের কাছাকাছি থাকুন।',
    dangerSummary: 'চরম সামুদ্রিক সুরক্ষা সতর্কতা জারি — মাছ ধরার কাজ অবিলম্বে বন্ধ রাখুন।',
    inlandSummary: 'এই অন্তর্দেশীয় স্থানে সামুদ্রিক মাছ ধরার বিশ্লেষণ প্রযোজ্য নয়।',
    footerPlatform: 'সাগর-সেফ AI • আধুনিক সামুদ্রিক গোয়েন্দা প্ল্যাটফর্ম',
    footerDataSources: 'তথ্যসূত্র: INCOIS + IMD + ISRO',
    footerProtocol: 'নিরাপত্তাই প্রথম অগ্রাধিকার'
  },

  od: { // Odia (Odisha Coast)
    appTitle: 'ସାଗର-ସେଫ୍ AI',
    tagline: 'ସାମୁଦ୍ରିକ ସୂଚନା ଓ ସୁରକ୍ଷା',
    heroLine1: 'ସମୁଦ୍ରକୁ ଜାଣନ୍ତୁ।',
    heroLine2: 'ସୁଯୋଗ ଖୋଜନ୍ତୁ।',
    heroLine3: 'ସୁରକ୍ଷିତ ରୁହନ୍ତୁ।',
    heroSub: 'ସମୁଦ୍ର, ପାଣିପାଗ, ମାଛ ଧରିବା ଓ ସୁରକ୍ଷାର AI ନିଷ୍ପତ୍ତି ସହାୟକ ବ୍ୟବସ୍ଥା।',
    searchPlaceholder: 'ମାଛ ଧରିବା, ପାଣିପାଗ, ସମୁଦ୍ର ସ୍ଥିତି ବିଷୟରେ ପଚାରନ୍ତୁ...',
    btnAnalyze: 'ସମୁଦ୍ର ବିଶ୍ଳେଷଣ',
    btnAnalyzing: 'ବିଶ୍ଳେଷଣ ଚାଲିଛି...',
    quickActionFish: 'ମାଛ ଧରା ଅଞ୍ଚଳ',
    quickActionOcean: 'ସମୁଦ୍ର ସ୍ଥିତି',
    quickActionWeather: 'ପାଣିପାଗ',
    quickActionAlerts: 'ସତର୍କ ସୂଚନା',
    quickActionSafety: 'ସୁରକ୍ଷା ଯାଞ୍ଚ',
    quickActionFishSub: 'ଓସେନସାଟ୍-୩ ପିଏଫ୍‌ଜେଡ୍ ଜୋନ୍',
    quickActionOceanSub: 'ଢେଉ ଏବଂ ସମୁଦ୍ର ସ୍ରୋତ',
    quickActionWeatherSub: 'ଉପକୂଳ ପବନ ପୂର୍ବାନୁମାନ',
    quickActionAlertsSub: 'ଲାଇଭ୍ ଚେତାବନୀ',
    quickActionSafetySub: 'ସୁରକ୍ଷା ଯାଞ୍ଚ ପଦ୍ଧତି',
    tryPromptLabel: 'ସହଜ ପ୍ରଶ୍ନଗୁଡ଼ିକ:',
    promptSafe: 'ଆସନ୍ତାକାଲି ସକାଳେ ମାଛ ଧରିବାକୁ ଯିବା ସୁରକ୍ଷିତ କି?',
    promptStorm: 'ବାତ୍ୟା ଏବଂ ପ୍ରବଳ ପବନ ସତର୍କତା ଯାଞ୍ଚ କରନ୍ତୁ',
    promptPfz: 'ଅଧିକ ମାଛ ମିଳିବା ପିଏଫ୍‌ଜେଡ୍ ଅଞ୍ଚଳ ଖୋଜନ୍ତୁ',
    promptCochin: 'ଢେଉର ଉଚ୍ଚତା ଏବଂ ସମୁଦ୍ର ସ୍ଥିତି ଦେଖନ୍ତୁ',
    safetyTitle: 'ସୁରକ୍ଷା',
    fishingTitle: 'ମାଛ ଉପଲବ୍ଧତା',
    oceanTitle: 'ସମୁଦ୍ର ତାପମାତ୍ରା',
    windTitle: 'ପବନର ବେଗ',
    whyDecision: 'ଏହି ନିଷ୍ପତ୍ତି କାହିଁକି?',
    safetyOverrides: 'ସୁରକ୍ଷା ସର୍ବାଗ୍ରେ',
    safetyOverrideDirective: 'ବାଧ୍ୟତାମୂଳକ ନିର୍ଦ୍ଦେଶ',
    safetyOverrideMsg: 'ମାଛ ମିଳିବାର ସମ୍ଭାବନା ଥିଲେ ମଧ୍ୟ ପାଣିପାଗ ବିଭାଗର ବାତ୍ୟା ଚେତାବନୀ ଯୋଗୁଁ ସମୁଦ୍ରକୁ ଯିବା ସମ୍ପୂର୍ଣ୍ଣ ମନା।',
    inlandMsg: 'ଏହି ସ୍ଥାନଟି ସ୍ଥଳଭାଗରେ ଅବସ୍ଥିତ। ଏଠାରେ ସାମୁଦ୍ରିକ ତଥ୍ୟ ଉପଲବ୍ଧ ନାହିଁ।',
    exploreCoastal: 'ଉପକୂଳବର୍ତ୍ତୀ ଅଞ୍ଚଳ ଦେଖନ୍ତୁ',
    dataTrustTitle: 'ତଥ୍ୟ ବିଶ୍ୱସନୀୟତା କେନ୍ଦ୍ର',
    demoModeActive: 'ଡେମୋ ଡାଟା — ପ୍ରକୃତ ଯାତ୍ରା ପାଇଁ ନୁହେଁ',
    liveDataBadge: 'ଲାଇଭ୍',
    demoDataBadge: 'ଡେମୋ ଡାଟା',
    canGoYes: 'ମାଛ ଧରିବାକୁ ଯାଇପାରିବେ ✅',
    canGoNo: 'ସମୁଦ୍ରକୁ ଯାଆନ୍ତୁ ନାହିଁ (ବିପଦ) ❌',
    canGoCaution: 'ସତର୍କତାର ସହିତ ଯାଆନ୍ତୁ ⚠️',
    verdictQuestion: 'ଆଜି ସମୁଦ୍ରକୁ ଯାଇପାରିବେ କି?',
    whyTitle: 'ସରଳ ଓ ସ୍ପଷ୍ଟ କାରଣ (କାହିଁକି?)',
    sosCallTitle: 'ଜରୁରୀକାଳୀନ ସହାୟତା ନମ୍ବର (କଲ୍ କରନ୍ତୁ)',
    coastGuardCall: 'କୋଷ୍ଟ ଗାର୍ଡ (Coast Guard): 1554',
    nationalEmergencyCall: 'ଜାତୀୟ ଜରୁରୀକାଳୀନ ନମ୍ବର: 112',
    coastalPoliceCall: 'ଉପକୂଳ ପୋଲିସ୍: 1093',
    fisheriesCellCall: 'ମତ୍ସ୍ୟ ବିଭାଗ କଣ୍ଟ୍ରୋଲ୍ ରୁମ୍: 1077',
    reasonWaveSafe: 'ସମୁଦ୍ରର ଢେଉ ଶାନ୍ତ ଓ ସୁରକ୍ଷିତ ରହିଛି',
    reasonWaveHigh: 'ବିପଜ୍ଜନକ ଉଚ୍ଚ ଢେଉ (>3.0m) — ଡଙ୍ଗା ବୁଡ଼ିଯିବାର ଭୟ',
    reasonWindNormal: 'ପବନର ବେଗ ସ୍ୱାଭାବିକ ଓ ନିରାପଦ ଅଛି',
    reasonWindGale: 'ପ୍ରବଳ ଝଡ଼ ପବନର ସତର୍କ ସୂଚନା (>45 km/h)',
    reasonFishGood: 'ସମୁଦ୍ରରେ ପ୍ରଚୁର ମାଛ ମିଳିବାର ଉତ୍ତମ ସମ୍ଭାବନା',
    reasonNoStorm: 'ବାତ୍ୟା କିମ୍ବା ଝଡ଼ତୋଫାନର କୌଣସି ଭୟ ନାହିଁ',
    reasonStormAlert: 'ପାଣିପାଗ ବିଭାଗ (IMD) ର ଝଡ଼ ସତର୍କତା ଜାରି ରହିଛି',
    returnAdvice: 'ସନ୍ଧ୍ୟା ୫:୦୦ ପୂର୍ବରୁ କୂଳକୁ ଫେରିଆସିବା ନିରାପଦ',
    navDashboard: 'ଡ୍ୟାସବୋର୍ଡ',
    navMap: 'ସମୁଦ୍ର ମାନଚିତ୍ର',
    navPorts: 'ବନ୍ଦର ତାଲିକା',
    navPfz: 'ପିଏଫ୍‌ଜେଡ୍ ଅଞ୍ଚଳ',
    navWeather: 'ପାଣିପାଗ',
    navNews: 'ଖବର',
    navTrust: 'ତଥ୍ୟ ବିଶ୍ୱସନୀୟତା',
    navSos: 'ଜରୁରୀକାଳୀନ SOS',
    navAlerts: 'ସତର୍କ ସୂଚନା',
    navHistory: 'ଇତିହାସ',
    navLocation: 'ବନ୍ଦର ଅଞ୍ଚଳ',
    systemOperational: 'ବ୍ୟବସ୍ଥା: ସମ୍ପୂର୍ଣ୍ଣ ସକ୍ରିୟ',
    liveFeeds: 'ଲାଇଭ୍ ତଥ୍ୟ',
    demoFeeds: 'ଡେମୋ ବେଞ୍ଚମାର୍କ',
    isroStatus: 'ଇସ୍ରୋ ଓସେନସାଟ୍-୩: ଲାଇଭ୍',
    incoisStatus: 'ଇନକଏସ୍ ସମୁଦ୍ର: ଲାଇଭ୍',
    imdStatus: 'ପାଣିପାଗ ବିଭାଗ: ଲାଇଭ୍',
    sectorStatus: 'ବନ୍ଦର ଅଞ୍ଚଳ:',
    metricWave: 'ସମୁଦ୍ର ଢେଉ',
    metricWind: 'ପବନ ବେଗ',
    metricFish: 'ମାଛ ଉପଲବ୍ଧତା',
    metricReturn: 'ଫେରିବା ସମୟ',
    metricWaveSafeVal: 'ଶାନ୍ତ ଓ ନିରାପଦ',
    metricWaveSafeDesc: 'କମ୍ ଉଚ୍ଚତାର ଢେଉ',
    metricWaveDangerVal: 'ବିପଜ୍ଜନକ ଢେଉ',
    metricWaveDangerDesc: 'ଡଙ୍ଗା ବୁଡ଼ିବା ଆଶଙ୍କା',
    metricWindSafeVal: 'ସ୍ୱାଭାବିକ ପବନ',
    metricWindSafeDesc: 'ସୁରକ୍ଷିତ ଯାତ୍ରା',
    metricWindDangerVal: 'ପ୍ରବଳ ଝଡ଼ ପବନ',
    metricWindDangerDesc: 'ତୀବ୍ର ପବନର ଭୟ',
    metricFishHighVal: 'ଉଚ୍ଚ ସମ୍ଭାବନା',
    metricFishHighDesc: 'ପ୍ରଚୁର ମାଛର ସନ୍ଧାନ',
    metricReturnVal: 'ସନ୍ଧ୍ୟା ୫:୦୦ ପୂର୍ବରୁ',
    metricReturnDesc: 'ଦିନ ଥାଉଣୁ ଫେରନ୍ତୁ',
    cardOcean: 'ସମୁଦ୍ର ସ୍ଥିତି ବିବରଣୀ',
    cardWeather: 'ଉପକୂଳ ପାଣିପାଗ',
    cardPfz: 'ସମ୍ଭାବ୍ୟ ମାଛ ଧରା ଅଞ୍ଚଳ (PFZ)',
    cardAlerts: 'ସକ୍ରିୟ ସତର୍କ ସୂଚନା',
    sst: 'ସମୁଦ୍ର ପୃଷ୍ଠ ତାପମାତ୍ରା',
    waveHeight: 'ଢେଉର ଉଚ୍ଚତା',
    swell: 'ସ୍ୱେଲ୍ ଉଚ୍ଚତା',
    currentSpeed: 'ସ୍ରୋତର ବେଗ',
    salinity: 'ଲବଣାକ୍ତତା',
    tideStatus: 'ଜୁଆର-ଭଟ୍ଟା ସ୍ଥିତି',
    airTemp: 'ବାୟୁ ତାପମାତ୍ରା',
    windSpeed: 'ପବନର ବେଗ',
    windGust: 'ଝଟକା ପବନର ବେଗ',
    pressure: 'ବାୟୁମଣ୍ଡଳୀୟ ଚାପ',
    humidity: 'ଆର୍ଦ୍ରତା',
    uvIndex: 'ୟୁଭି ଇଣ୍ଡେକ୍ସ',
    targetFish: 'ପ୍ରମୁଖ ମାଛ ପ୍ରଜାତି',
    chlorophyllIndex: 'କ୍ଲୋରୋଫିଲ୍ ସୂଚକ',
    distanceOffshore: 'କୂଳରୁ ଦୂରତା',
    depth: 'ଗଭୀରତା ସୀମା',
    validUntil: 'ବୈଧତା ସମୟ',
    noActiveAlerts: 'ଏହି ଅଞ୍ଚଳରେ କୌଣସି ଜରୁରୀ ସତର୍କତା ନାହିଁ',
    viewAllAlerts: 'ସମସ୍ତ ସତର୍କ ସୂଚନା ଦେଖନ୍ତୁ',
    agentPipelineHeader: 'ନିରନ୍ତର ମଲ୍ଟି-ଏଜେଣ୍ଟ ନିଷ୍ପତ୍ତି ବ୍ୟବସ୍ଥା',
    agentPipelineSub: 'ଇସ୍ରୋ, ଇନକଏସ୍ ଏବଂ ଆଇଏମଡି ତଥ୍ୟର ସ୍ୱୟଂଚାଳିତ ବିଶ୍ଳେଷଣ',
    decisionSynthesis: 'ମଲ୍ଟି-ଏଜେଣ୍ଟ ନିଷ୍ପତ୍ତି ସଂଶ୍ଳେଷଣ',
    operationalDirective: 'କାର୍ଯ୍ୟକ୍ଷମ ନିର୍ଦ୍ଦେଶ:',
    decisionRationale: 'ନିଷ୍ପତ୍ତିର କାରଣ (କାହିଁକି?)',
    viewOnMap: 'ମାନଚିତ୍ରରେ ଅଞ୍ଚଳ ଦେଖନ୍ତୁ',
    confidence: 'ବିଶ୍ୱସନୀୟତା:',
    statusLabel: 'ସ୍ଥିତି:',
    potentialLabel: 'ସମ୍ଭାବନା:',
    sectorLabel: 'ଅଞ୍ଚଳ:',
    favorableTitle: 'ଅନୁକୂଳ ପରିସ୍ଥିତି ରହିଛି',
    cautionTitle: 'ସତର୍କତାର ସହ ଆଗକୁ ବଢ଼ନ୍ତୁ',
    dangerTitle: 'ସମୁଦ୍ରକୁ ଯାଆନ୍ତୁ ନାହିଁ (ବିପଦ)',
    inlandTitle: 'ସ୍ଥଳଭାଗ ଅଞ୍ଚଳ',
    favorableSummary: 'ମାଛ ଧରିବା ପାଇଁ ସମୁଦ୍ର ଓ ପାଣିପାଗ ସମ୍ପୂର୍ଣ୍ଣ ଅନୁକୂଳ ରହିଛି।',
    cautionSummary: 'ମଧ୍ୟମ ଢେଉ ଓ ପବନ ରହିଛି। କେବଳ କୂଳ ନିକଟରେ ହିଁ ମାଛ ଧରନ୍ତୁ।',
    dangerSummary: 'ତୀବ୍ର ସାମୁଦ୍ରିକ ସୁରକ୍ଷା ସତର୍କତା ଜାରି — ମାଛ ଧରିବା ତୁରନ୍ତ ସ୍ଥଗିତ ରଖନ୍ତୁ।',
    inlandSummary: 'ଏହି ସ୍ଥଳଭାଗ ଅଞ୍ଚଳରେ ସାମୁଦ୍ରିକ ମାଛ ଧରିବା ବିଶ୍ଳେଷଣ ଲାଗୁ ହୁଏ ନାହିଁ।',
    footerPlatform: 'ସାଗର-ସେଫ୍ AI • ଅତ୍ୟାଧୁନିକ ସାମୁଦ୍ରିକ ଗୁପ୍ତଚର ପ୍ଲାଟଫର୍ମ',
    footerDataSources: 'ତଥ୍ୟ ଉତ୍ସ: INCOIS + IMD + ISRO',
    footerProtocol: 'ସୁରକ୍ଷା ସର୍ବପ୍ରଥମ ପ୍ରାଥମିକତା'
  },

  gu: { // Gujarati (Gujarat Coast)
    appTitle: 'સાગર-સેફ AI',
    tagline: 'દરિયાઈ માહિતી અને સુરક્ષા',
    heroLine1: 'દરિયાને ઓળખો.',
    heroLine2: 'તક શોધો.',
    heroLine3: 'સુરક્ષિત રહો.',
    heroSub: 'દરિયો, હવામાન, માછીમારી અને સુરક્ષાની માહિતી આપતી આધુનિક AI પ્રણાલી.',
    searchPlaceholder: 'માછીમારી, હવામાન અથવા દરિયાઈ સ્થિતિ વિશે પૂછો...',
    btnAnalyze: 'દરિયાઈ વિશ્લેષણ',
    btnAnalyzing: 'વિશ્લેષણ ચાલુ છે...',
    quickActionFish: 'માછીમારી વિસ્તારો',
    quickActionOcean: 'દરિયાની સ્થિતિ',
    quickActionWeather: 'દરિયાઈ હવામાન',
    quickActionAlerts: 'ચેતવણીઓ',
    quickActionSafety: 'સુરક્ષા તપાસ',
    quickActionFishSub: 'ઓશનસેટ-3 પીએફઝેડ ઝોન',
    quickActionOceanSub: 'મોજાં અને પ્રવાહ',
    quickActionWeatherSub: 'હવામાન ખાતાની આગાહી',
    quickActionAlertsSub: 'રીઅલ-ટાઇમ ચેતવણીઓ',
    quickActionSafetySub: 'સુરક્ષા ચકાસણી',
    tryPromptLabel: 'ઝડપી પ્રશ્નો:',
    promptSafe: 'શું કાલે સવારે માછીમારી કરવા જવું સુરક્ષિત છે?',
    promptStorm: 'વાવાઝોડું અને ભારે પવનની ચેતવણી તપાસો',
    promptPfz: 'વધુ માછલીઓ મળવાના પીએફઝેડ વિસ્તારો શોધો',
    promptCochin: 'મોજાંની ઊંચાઈ અને દરિયાની સ્થિતિ જુઓ',
    safetyTitle: 'સુરક્ષા',
    fishingTitle: 'માછલીની શક્યતા',
    oceanTitle: 'દરિયાનું તાપમાન',
    windTitle: 'પવનની ગતિ',
    whyDecision: 'આ નિર્ણય શા માટે?',
    safetyOverrides: 'સુરક્ષા સૌથી પહેલાં',
    safetyOverrideDirective: 'ફરજિયાત નિર્દેશ',
    safetyOverrideMsg: 'માછલી મળવાની શક્યતા સારી છે, પરંતુ હવામાન વિભાગની વાવાઝોડાની ચેતવણીને કારણે દરિયામાં જવું સંપૂર્ણપણે નિષેધ છે.',
    inlandMsg: 'આ સ્થળ જમીન પર છે. દરિયાઈ વિશ્લેષણ અહીં લાગુ પડતું નથી.',
    exploreCoastal: 'દરિયાકાંઠાના વિસ્તારો જુઓ',
    dataTrustTitle: 'ડેટા વિશ્વસનીયતા કેન્દ્ર',
    demoModeActive: 'ડેમો ડેટા — વાસ્તવિક મુસાફરી માટે નથી',
    liveDataBadge: 'લાઈવ',
    demoDataBadge: 'ડેમો ડેટા',
    canGoYes: 'માછીમારી કરવા જઈ શકો છો ✅',
    canGoNo: 'દરિયામાં ન જશો (જોખમ) ❌',
    canGoCaution: 'સાવધાનીપૂર્વક જાઓ ⚠️',
    verdictQuestion: 'શું આજે દરિયામાં જઈ શકાય?',
    whyTitle: 'સરળ અને સ્પષ્ટ કારણો (શા માટે?)',
    sosCallTitle: 'ઇમરજન્સી મદદ હેલ્પલાઇન નંબરો',
    coastGuardCall: 'કોસ્ટ ગાર્ડ (Coast Guard): 1554',
    nationalEmergencyCall: 'રાષ્ટ્રીય ઇમરજન્સી: 112',
    coastalPoliceCall: 'કોસ્ટલ સિક્યુરિટી પોલીસ: 1093',
    fisheriesCellCall: 'મત્સ્યોદ્યોગ કંટ્રોલ રૂમ: 1077',
    reasonWaveSafe: 'દરિયાના મોજાં શાંત અને સુરક્ષિત છે',
    reasonWaveHigh: 'ખતરનાક ઊંચા મોજાં (>3.0m) — બોટ પલટી જવાનું જોખમ',
    reasonWindNormal: 'પવનની ઝડપ સામાન્ય અને સુરક્ષિત છે',
    reasonWindGale: 'ભારે વાવાઝોડા અને પવનની ચેતવણી (>45 km/h)',
    reasonFishGood: 'દરિયામાં પુષ્કળ માછલીઓ મળવાની ઉત્તમ શક્યતા',
    reasonNoStorm: 'વાવાઝોડા કે તોફાનનો કોઈ ભય નથી',
    reasonStormAlert: 'હવામાન વિભાગ (IMD) ની વાવાઝોડાની ચેતવણી અમલમાં છે',
    returnAdvice: 'સાંજે ૫:૦୦ વાગ્યા પહેલાં બંદરે પાછા ફરવું હિતાવહ છે',
    navDashboard: 'ડેશબોર્ડ',
    navMap: 'દરિયાઈ નકશો',
    navPorts: 'બંદર ડિરેક્ટરી',
    navPfz: 'પીએફઝેડ ઝોન',
    navWeather: 'હવામાન',
    navNews: 'સમાચાર',
    navTrust: 'ડેટા વિશ્વસનીયતા',
    navSos: 'ઇમરજન્સી SOS',
    navAlerts: 'ચેતવણીઓ',
    navHistory: 'ઇતિહાસ',
    navLocation: 'બંદર વિસ્તાર',
    systemOperational: 'સિસ્ટમ: સંપૂર્ણ સક્રિય',
    liveFeeds: 'લાઇવ ડેટા',
    demoFeeds: 'ડેમો બેન્ચમાર્ક',
    isroStatus: 'ઇસરો ઓશનસેટ-3: લાઈવ',
    incoisStatus: 'ઇન્કોઇસ દરિયો: લાઈવ',
    imdStatus: 'હવામાન વિભાગ: લાઈવ',
    sectorStatus: 'બંદર વિસ્તાર:',
    metricWave: 'દરિયાઈ મોજાં',
    metricWind: 'પવનની ગતિ',
    metricFish: 'માછલીની શક્યતા',
    metricReturn: 'પાછા ફરવાનો સમય',
    metricWaveSafeVal: 'શાંત અને સુરક્ષિત',
    metricWaveSafeDesc: 'ઓછી ઊંચાઈવાળા મોજાં',
    metricWaveDangerVal: 'ખતરનાક ઊંચા મોજાં',
    metricWaveDangerDesc: 'બોટ પલટી જવાનું જોખમ',
    metricWindSafeVal: 'સામાન્ય પવન',
    metricWindSafeDesc: 'સુરક્ષિત મુસાફરી',
    metricWindDangerVal: 'તોફાની પવન',
    metricWindDangerDesc: 'અતિ ભારે પવનનું જોખમ',
    metricFishHighVal: 'ઉચ્ચ સંભાવના',
    metricFishHighDesc: 'વિપુલ પ્રમાણમાં માછલીઓ',
    metricReturnVal: 'સાંજે ૫:૦૦ પહેલાં',
    metricReturnDesc: 'અજવાળામાં પરત ફરો',
    cardOcean: 'દરિયાઈ સ્થિતિ વિગતો',
    cardWeather: 'દરિયાકાંઠાનું હવામાન',
    cardPfz: 'સંભવિત માછીમારી ક્ષેત્ર (PFZ)',
    cardAlerts: 'સક્રિય દરિયાઈ ચેતવણીઓ',
    sst: 'દરિયાઈ સપાટીનું તાપમાન',
    waveHeight: 'મોજાંની ઊંચાઈ',
    swell: 'સ્વેલ ઊંચાઈ',
    currentSpeed: 'પ્રવાહની ગતિ',
    salinity: 'ક્ષારતા',
    tideStatus: 'ભરતી-ઓટ સ્થિતિ',
    airTemp: 'હવાનું તાપમાન',
    windSpeed: 'પવનની ગતિ',
    windGust: 'ઝડપી પવનના ઝાપટા',
    pressure: 'વાતાવરણીય દબાણ',
    humidity: 'ભેજ',
    uvIndex: 'યુવી ઇન્ડેક્સ',
    targetFish: 'મુખ્ય માછલીની જાતો',
    chlorophyllIndex: 'ક્લોરોફિલ ઇન્ડેક્સ',
    distanceOffshore: 'કાંઠાથી અંતર',
    depth: 'ઊંડાઈ મર્યાદા',
    validUntil: 'માન્યતા સમય',
    noActiveAlerts: 'આ વિસ્તારમાં કોઈ ગંભીર ચેતવણી નથી',
    viewAllAlerts: 'તમામ ચેતવણીઓ જુઓ',
    agentPipelineHeader: 'રીઅલ-ટાઇમ મલ્ટી-એજન્ટ નિર્ણય પ્રણાલી',
    agentPipelineSub: 'ઇસરો, ઇન્કોઇસ અને હવામાન વિભાગના ડેટાનું સ્વચાલિત વિશ્લેષણ',
    decisionSynthesis: 'મલ્ટી-એજન્ટ નિર્ણય સંશ્લેષણ',
    operationalDirective: 'કાર્યકારી નિર્દેશ:',
    decisionRationale: 'નિર્ણય પાછળનાં કારણો (શા માટે?)',
    viewOnMap: 'નકશા પર ઝોન જુઓ',
    confidence: 'વિશ્વસનીયતા:',
    statusLabel: 'સ્થિતિ:',
    potentialLabel: 'શક્યતા:',
    sectorLabel: 'વિસ્તાર:',
    favorableTitle: 'સ્થિતિ ખૂબ જ અનુકૂળ છે',
    cautionTitle: 'સાવધાનીપૂર્વક આગળ વધો',
    dangerTitle: 'દરિયામાં જશો નહીં (જોખમ)',
    inlandTitle: 'જમીન વિસ્તાર',
    favorableSummary: 'માછીમારી માટે દરિયો અને હવામાન સંપૂર્ણપણે અનુકૂળ છે.',
    cautionSummary: 'મધ્યમ મોજાં અને પવન છે. માત્ર કાંઠા નજીક જ માછીમારી કરો.',
    dangerSummary: 'ગંભીર દરિયાઈ સુરક્ષા ચેતવણી અમલમાં છે — માછીમારી તાત્કાલિક સ્થગિત કરો.',
    inlandSummary: 'આ અંતર્દેશીય ભૌગોલિક સ્થળ પર દરિયાઈ માછીમારી વિશ્લેષણ લાગુ પડતું નથી.',
    footerPlatform: 'સાગર-સેફ AI • આગામી પેઢીનું દરિયાઈ માહિતી પ્લેટફોર્મ',
    footerDataSources: 'ડેટા સ્ત્રોત: INCOIS + IMD + ISRO',
    footerProtocol: 'સુરક્ષા સર્વોપરી છે'
  }
};

export interface LocalizedAgentStepTemplate {
  id: string;
  agentName: string;
  label: string;
  runningDetail: string;
  completedDetail: string;
  source: string;
  logs: string[];
}

export function getAgentStepTemplates(
  language: string = 'en',
  location?: { name: string; state: string; lat: number; lng: number }
): LocalizedAgentStepTemplate[] {
  const locName = location?.name || 'Sector';
  const locState = location?.state || 'Coastal';
  const latStr = location ? location.lat.toFixed(2) : '12.91';
  const lngStr = location ? location.lng.toFixed(2) : '74.85';

  if (language === 'hi') {
    return [
      {
        id: '1',
        agentName: 'स्थान निर्धारण एजेंट',
        label: 'भू-स्थानिक स्थिति एवं निर्देशांक',
        runningDetail: `${locName} (${locState}) बंदरगाह निर्देशांक एवं तटीय गहराई सत्यापन जारी...`,
        completedDetail: `${locName} (${latStr}°N, ${lngStr}°E) बंदरगाह नौवहन क्षेत्र सत्यापित।`,
        source: 'Geospatial Registry',
        logs: [
          `INCOIS जियोडेसी निर्देशांक: ${latStr}°N, ${lngStr}°E`,
          `बंदरगाह चैनल गहराई 24 मीटर सुरक्षित`,
          `तटीय सीमा सत्यापन पूर्ण`
        ]
      },
      {
        id: '2',
        agentName: 'मिशन योजना एजेंट',
        label: 'समुद्री मिशन योजना',
        runningDetail: `30 किमी अपतटीय परिचालन दायरे और नौकायन गलियारे की गणना...`,
        completedDetail: `30 किमी तटीय दायरा एवं सुरक्षित वापसी मार्ग निर्धारित।`,
        source: 'Mission Orchestrator',
        logs: [
          `30 किमी अपतटीय सीमा निर्धारित`,
          `ईंधन दक्षता एवं सुरक्षित वापसी का समय अनुकूलित`,
          `आपातकालीन एंकरेज जोन मैप किए गए`
        ]
      },
      {
        id: '3',
        agentName: 'मौसम विज्ञान एजेंट',
        label: 'IMD मौसम व चक्रवात रडार',
        runningDetail: `मौसम विभाग (IMD) डॉपलर रडार, हवा के झोंके एवं चक्रवात चेतावनी विश्लेषण...`,
        completedDetail: `सतह हवा, दबाव एवं मौसम विभाग चक्रवाती रडार डेटा सत्यापित।`,
        source: 'IMD',
        logs: [
          `IMD डॉपलर रडार स्वीप: चक्रवाती विक्षोभ अनुपस्थित`,
          `हवा की गति एवं झोंकों का विश्लेषण सामान्य`,
          `बैरोमीटर का दबाव सुरक्षित सीमा में`
        ]
      },
      {
        id: '4',
        agentName: 'महासागर स्थिति एजेंट',
        label: 'INCOIS महासागर स्थिति पूर्वानुमान',
        runningDetail: `इनकोइस (INCOIS) लाइव बोया नेटवर्क, लहर ऊंचाई एवं जलधारा विश्लेषण...`,
        completedDetail: `समुद्र सतह तापमान (SST), लहर ऊंचाई एवं समुद्री धाराएं सत्यापित।`,
        source: 'INCOIS',
        logs: [
          `INCOIS वेव राइडर बोया टेलीमेट्री समन्वित`,
          `तरंग अवधि एवं समुद्री धारा का वेग सामान्य`,
          `ज्वार-भाटा चक्र सुरक्षित`
        ]
      },
      {
        id: '5',
        agentName: 'मत्स्य क्षेत्र (PFZ) एजेंट',
        label: 'उपग्रह थर्मल फ्रंट एवं क्लोरोफिल',
        runningDetail: `इसरो ओशनसैट-3 OCM क्लोरोफिल और थर्मल फ्रंट ढाल का विश्लेषण...`,
        completedDetail: `उच्च मत्स्य घनत्व क्षेत्र (PFZ) एवं पेलैजिक झुंड पहचाना गया।`,
        source: 'INCOIS PFZ Mission',
        logs: [
          `ओशनसैट-3 क्लोरोफिल-ए प्रवणता गणना संपन्न`,
          `थर्मल फ्रंट 25 नॉटिकल मील अपतटीय स्थित`,
          `मत्स्य घनत्व सूचकांक उच्च (High Yield)`
        ]
      },
      {
        id: '6',
        agentName: 'समुद्री सुरक्षा एजेंट',
        label: 'तटरक्षक सुरक्षा मानक',
        runningDetail: `तटरक्षक सुरक्षा मानकों, समुद्री खतरों व नौकायन सीमाओं का सत्यापन...`,
        completedDetail: `सभी नौवहन सुरक्षा मानक एवं मौसम जोखिम सीमाएं सत्यापित।`,
        source: 'Indian Coast Guard & IMD',
        logs: [
          `तटरक्षक सुरक्षा सीमाएं जांची गईं`,
          `नौका सुरक्षा स्तर एवं जीवन रक्षक उपकरण निर्देश लागू`,
          `कोई सक्रिय नौकायन प्रतिबंध नहीं`
        ]
      },
      {
        id: '7',
        agentName: 'भू-स्थानिक गलियारा एजेंट',
        label: 'जलमग्न गहराई एवं नौवहन गलियारा',
        runningDetail: `बंदरगाह चैनल गहराई और सुरक्षित नौवहन गलियारे की पुष्टि...`,
        completedDetail: `बंदरगाह मार्ग एवं सुरक्षित गहराई (ड्राफ्ट) क्लीयरेंस सुनिश्चित।`,
        source: 'Geospatial Core',
        logs: [
          `बंदरगाह चैनल ड्राफ्ट 24 मीटर सत्यापित`,
          `पानी के भीतर बाधाएं नहीं मिलीं`,
          `सुरक्षित एंकरिंग क्षेत्र चिन्हित`
        ]
      },
      {
        id: '8',
        agentName: 'निर्णय संश्लेषण एजेंट',
        label: 'सुरक्षा-सर्वोपरि भार निर्धारण',
        runningDetail: `सुरक्षा-प्रथम नियमों, मौसम व मत्स्य संभावना का बहु-कारक विश्लेषण...`,
        completedDetail: `सुरक्षा एवं मत्स्य संभावना का परिचालन निर्देश में संश्लेषण पूर्ण।`,
        source: 'SAGAR-SAFE Multi-Agent Core',
        logs: [
          `सुरक्षा-प्रथम नियम लागू: मौसम/तरंग बनाम मत्स्य अवसर`,
          `बहु-एजेंट निर्णय मैट्रिक्स तैयार`,
          `विश्वसनीयता स्तर 94% सत्यापित`
        ]
      },
      {
        id: '9',
        agentName: 'सलाहकार संश्लेषण एजेंट',
        label: 'स्पष्ट भाषा में मछुआरा सलाह',
        runningDetail: `सरल भाषा में व्याख्या, वैज्ञानिक कारण और ऑडियो ब्रीफ संकलन...`,
        completedDetail: `मछुआरों के लिए सरल भाषा में परिचालन सलाह एवं वॉयस गाइड तैयार।`,
        source: 'Advisory Formulator',
        logs: [
          `मछुआरों की भाषा में ऑडियो सारांश तैयार`,
          `गो/नो-गो परिचालन निर्देश जारी`,
          `शाम से पहले सुरक्षित वापसी का समय निर्धारित`
        ]
      }
    ];
  }

  if (language === 'ta') {
    return [
      {
        id: '1',
        agentName: 'இருப்பிட முகவர்',
        label: 'புவிசார் இருப்பிடம் & துறைமுக ஆயத்தொலைவுகள்',
        runningDetail: `${locName} (${locState}) துறைமுக ஆயத்தொலைவுகள் மற்றும் ஆழ எல்லைகளை சரிபார்க்கிறது...`,
        completedDetail: `${locName} (${latStr}°N, ${lngStr}°E) கடலோர துறைமுக பகுதி வெற்றிகரமாக சரிபார்க்கப்பட்டது.`,
        source: 'Geospatial Registry',
        logs: [
          `INCOIS புவிசார் ஆயத்தொலைவுகள்: ${latStr}°N, ${lngStr}°E`,
          `துறைமுக வழித்தட ஆழம் 24 மீட்டர் சரிபார்க்கப்பட்டது`,
          `கடலோர எல்லை சரிபார்ப்பு முடிந்தது`
        ]
      },
      {
        id: '2',
        agentName: 'பணித் திட்ட முகவர்',
        label: 'கடல்சார் பணித் திட்டம் & சுற்றளவு',
        runningDetail: `30 கி.மீ தூர கடலோர செயல்பாட்டு எல்லை மற்றும் வழித்தடத்தை கணக்கிடுகிறது...`,
        completedDetail: `30 கி.மீ கடலோர சுற்றளவு மற்றும் பாதுகாப்பான திரும்பும் பாதை அமைக்கப்பட்டது.`,
        source: 'Mission Orchestrator',
        logs: [
          `30 கி.மீ கடலோர எல்லை அமைக்கப்பட்டது`,
          `எரிபொருள் சிக்கனம் மற்றும் திரும்பும் நேரம் கணக்கிடப்பட்டது`,
          `அவசர நங்கூரமிடும் மண்டலங்கள் வரைபடமாக்கப்பட்டன`
        ]
      },
      {
        id: '3',
        agentName: 'வானிலை முகவர்',
        label: 'இந்திய வானிலை மையம் (IMD) ரேடார் & புயல்',
        runningDetail: `வானிலை மைய டாப்ளர் ரேடார், காற்றின் வேகம் மற்றும் புயல் சுழற்சி பகுப்பாய்வு...`,
        completedDetail: `காற்றின் வேகம், காற்றழுத்தம் மற்றும் புயல் ரேடார்கள் சரிபார்க்கப்பட்டன.`,
        source: 'IMD',
        logs: [
          `IMD டாப்ளர் ரேடார்: புயல் அபாயம் இல்லை`,
          `காற்றின் வேகம் மற்றும் வீச்சு அளவுகள் சீராக உள்ளன`,
          `வளிமண்டல அழுத்தம் பாதுகாப்பான வரம்பில் உள்ளது`
        ]
      },
      {
        id: '4',
        agentName: 'பெருங்கடல் முகவர்',
        label: 'இன்காய்ஸ் (INCOIS) கடல் நிலை முன்னறிவிப்பு',
        runningDetail: `இன்காய்ஸ் நேரலை மிதவை வலையமைப்பு மற்றும் அலை மாதிரி தரவுகளை பெறுகிறது...`,
        completedDetail: `கடல் மேற்பரப்பு வெப்பநிலை (SST), அலை உயரம் மற்றும் கடல் நீரோட்டம் பெறப்பட்டன.`,
        source: 'INCOIS',
        logs: [
          `INCOIS அலை மிதவை நேரலை தரவு இணைக்கப்பட்டது`,
          `அலை காலம் மற்றும் நீரோட்ட வேகம் சாதகமாக உள்ளது`,
          `அலை ஏற்ற இறக்க சுழற்சி பாதுகாப்பானது`
        ]
      },
      {
        id: '5',
        agentName: 'மீன்பிடி மண்டல (PFZ) முகவர்',
        label: 'செயற்கைக்கோள் வெப்ப முகப்பு & பச்சையம்',
        runningDetail: `இஸ்ரோ ஓஷன்சாட்-3 பச்சையம் மற்றும் வெப்ப முகப்பு சாய்வு பகுப்பாய்வு...`,
        completedDetail: `அதிக மீன் திரள் மண்டலம் (PFZ) கண்டறியப்பட்டு வரைபடமாக்கப்பட்டது.`,
        source: 'INCOIS PFZ Mission',
        logs: [
          `ஓஷன்சாட்-3 பச்சைய-ஏ செறிவு கணக்கிடப்பட்டது`,
          `வெப்ப முகப்பு கரைக்கு 25 கடல் மைல் தொலைவில் உள்ளது`,
          `அதிக மீன் பிடிப்பு வாய்ப்பு உறுதி செய்யப்பட்டது`
        ]
      },
      {
        id: '6',
        agentName: 'பாதுகாப்பு முகவர்',
        label: 'கடலோரக் காவல்படை பாதுகாப்பு நெறிமுறை',
        runningDetail: `கடலோரக் காவல்படை பாதுகாப்பு வரம்புகள் மற்றும் எச்சரிக்கைகள் சரிபார்ப்பு...`,
        completedDetail: `அனைத்து கடல் பாதுகாப்பு எல்லைகள் மற்றும் அபாய வரம்புகள் சரிபார்க்கப்பட்டன.`,
        source: 'Indian Coast Guard & IMD',
        logs: [
          `கடலோரக் காவல்படை பாதுகாப்பு வரம்புகள் ஆய்வு செய்யப்பட்டன`,
          `படகு பாதுகாப்பு நிலை உறுதி செய்யப்பட்டது`,
          `தடை உத்தரவுகள் ஏதுமில்லை`
        ]
      },
      {
        id: '7',
        agentName: 'புவிசார் வரைபட முகவர்',
        label: 'கடல் ஆழம் & வழிசெலுத்தல் பாதைகள்',
        runningDetail: `துறைமுக நுழைவு வழித்தட ஆழம் மற்றும் பாதுகாப்பான பயணப்பாதையை சரிபார்க்கிறது...`,
        completedDetail: `துறைமுக வழித்தடம் மற்றும் பாதுகாப்பான படகு ஆழம் உறுதி செய்யப்பட்டது.`,
        source: 'Geospatial Core',
        logs: [
          `துறைமுக ஆழம் 24 மீட்டர் உறுதி செய்யப்பட்டது`,
          `நீருக்கடியில் தடைகள் எதுவும் இல்லை`,
          `பாதுகாப்பான வழித்தடம் சரிபார்க்கப்பட்டது`
        ]
      },
      {
        id: '8',
        agentName: 'முடிவு தொகுப்பு முகவர்',
        label: 'பாதுகாப்பே முதன்மை பல காரணி ஆய்வு',
        runningDetail: `பாதுகாப்பே முதன்மை விதியை செயல்படுத்தி பல காரணிகளை ஒருங்கிணைக்கிறது...`,
        completedDetail: `பாதுகாப்பு மற்றும் மீன்பிடி வாய்ப்புகள் செயல்பாட்டு உத்தரவாக தொகுக்கப்பட்டன.`,
        source: 'SAGAR-SAFE Multi-Agent Core',
        logs: [
          `பாதுகாப்பே முதன்மை விதி அமல்படுத்தப்பட்டது`,
          `பல-முகவர் முடிவு அணி உருவாக்கப்பட்டது`,
          `நம்பகத்தன்மை 94% சரிபார்க்கப்பட்டது`
        ]
      },
      {
        id: '9',
        agentName: 'பதில் ஆலோசனை முகவர்',
        label: 'எளிய மொழி மீனவர் ஆலோசனை & குரல் வழிகாட்டல்',
        runningDetail: `எளிய மொழியில் காரணங்கள் மற்றும் குரல் ஆலோசனையை தொகுக்கிறது...`,
        completedDetail: `மீனவர்களுக்கான எளிய செயல்பாட்டு ஆலோசனை மற்றும் குரல் வழிகாட்டல் தயார்.`,
        source: 'Advisory Formulator',
        logs: [
          `மீனவர்களுக்கான எளிய குரல் ஆலோசனை தயார்`,
          `கடலுக்கு செல்லலாமா என்ற தெளிவான முடிவு தொகுக்கப்பட்டது`,
          `மாலைக்குள் கரை திரும்புவதற்கான நேரம் குறிக்கப்பட்டது`
        ]
      }
    ];
  }

  // Default English (and other languages fallback)
  return [
    {
      id: '1',
      agentName: 'Location Agent',
      label: 'Geospatial Geodesy',
      runningDetail: `Resolving coordinates (${latStr}°N, ${lngStr}°E) and harbour bathymetry (${locName})...`,
      completedDetail: `${locName} Harbour (${latStr}°N, ${lngStr}°E) coordinates & boundaries verified.`,
      source: 'Geospatial Registry',
      logs: [
        `Connecting to INCOIS ERDDAP registry`,
        `Harbour entrance depth: 24m verified`,
        `Anchorage zones validated`
      ]
    },
    {
      id: '2',
      agentName: 'Planner Agent',
      label: 'Mission Planner',
      runningDetail: 'Formulating coastal mission envelope and 30 km operational radius...',
      completedDetail: '30 km coastal envelope and return route configured.',
      source: 'Mission Orchestrator',
      logs: [
        'Offshore radius locked to 30 km',
        'Fuel efficiency and daylight window optimized',
        'Emergency shelter ports mapped'
      ]
    },
    {
      id: '3',
      agentName: 'Weather Agent',
      label: 'IMD Meteorology',
      runningDetail: 'Fetching IMD coastal Doppler radar, cyclonic vortex and gale warnings...',
      completedDetail: 'Surface winds, barometric pressure and Doppler radar checked.',
      source: 'IMD',
      logs: [
        'IMD Doppler reflectivity clear: No storm cell',
        'Surface wind vectors within safe limits',
        'Barometric pressure normal'
      ]
    },
    {
      id: '4',
      agentName: 'Ocean Agent',
      label: 'INCOIS Ocean State',
      runningDetail: 'Querying INCOIS live buoy arrays, wave forecast models and currents...',
      completedDetail: 'SST, wave height, swell period and surface currents ingested.',
      source: 'INCOIS',
      logs: [
        'INCOIS wave rider buoy telemetry synced',
        'Wave swell period and height safe',
        'Surface current velocity mapped'
      ]
    },
    {
      id: '5',
      agentName: 'PFZ Agent',
      label: 'Satellite Thermal Fronts',
      runningDetail: 'Interrogating Oceansat-3 OCM chlorophyll and AVHRR thermal fronts...',
      completedDetail: 'High chlorophyll convergence front detected and mapped.',
      source: 'INCOIS PFZ Mission',
      logs: [
        'Oceansat-3 OCM swath ingested',
        'Chlorophyll-a gradient detected 25 nm offshore',
        'High pelagic aggregation probability'
      ]
    },
    {
      id: '6',
      agentName: 'Safety Agent',
      label: 'Maritime Safety Protocols',
      runningDetail: 'Evaluating Coast Guard safety caps, rough sea limits and gale thresholds...',
      completedDetail: 'All navigation parameters within maritime safety limits.',
      source: 'Indian Coast Guard & IMD',
      logs: [
        'Coast Guard safety caps evaluated',
        'Vessel tier safety directives applied',
        'No active maritime embargo'
      ]
    },
    {
      id: '7',
      agentName: 'Geospatial Agent',
      label: 'Bathymetric Corridors',
      runningDetail: 'Verifying navigation depths, draught clearance and passage corridors...',
      completedDetail: 'Port channel depth: 24m, clear passage verified.',
      source: 'Geospatial Core',
      logs: [
        'Bathymetric contours clear of shallow reefs',
        'Safe navigable draft confirmed',
        'Approach corridor validated'
      ]
    },
    {
      id: '8',
      agentName: 'Decision Agent',
      label: 'Safety-First Weighting',
      runningDetail: 'Calculating multi-factor decision matrix enforcing safety priority...',
      completedDetail: 'Safety & opportunity matrices synthesized into operational directive.',
      source: 'SAGAR-SAFE Multi-Agent Core',
      logs: [
        'Safety-first override rule evaluated',
        'Multi-factor weights computed',
        'Confidence calibrated to 94%'
      ]
    },
    {
      id: '9',
      agentName: 'Response Agent',
      label: 'Advisory Synthesis',
      runningDetail: 'Compiling structured plain-language advisory, reasons & audio brief...',
      completedDetail: 'Operational advisory and voice brief compiled.',
      source: 'Advisory Formulator',
      logs: [
        'Plain-language fisherman advisory drafted',
        'Audio synthesis speech script ready',
        'Safe return time locked before 5:00 PM'
      ]
    }
  ];
}

export function getLocalizedAgentSteps(
  language: string = 'en',
  location?: { name: string; state: string; lat: number; lng: number },
  query?: string,
  status: 'idle' | 'running' | 'completed' = 'completed'
): AgentStep[] {
  const templates = getAgentStepTemplates(language, location);
  return templates.map((tmpl, idx) => ({
    id: tmpl.id,
    agentName: tmpl.agentName,
    label: tmpl.label,
    status: status === 'completed' ? 'completed' : idx === 0 ? 'running' : 'idle',
    detail: (status === 'running' && idx === 0) || (status === 'idle' && idx === 0) ? tmpl.runningDetail : tmpl.completedDetail,
    source: tmpl.source,
    logs: tmpl.logs
  }));
}

export function getDetailedReportDescriptions(language: string = 'en'): {
  safetyOverrideDesc: string;
  favorableDetailed: string;
  cautionDetailed: string;
  dangerDetailed: string;
  inlandDetailed: string;
  telemetryConfidenceDesc: string;
  vesselSafetyDesc: string;
  returnWindowDesc: string;
  fishAggregationDesc: string;
} {
  const t = I18N_TEXT[language] || I18N_TEXT['en'];
  const fallback = I18N_TEXT['en'];

  return {
    safetyOverrideDesc: t.reportSafetyOverrideDesc || fallback.reportSafetyOverrideDesc || '',
    favorableDetailed: t.reportFavorableDetailed || fallback.reportFavorableDetailed || '',
    cautionDetailed: t.reportCautionDetailed || fallback.reportCautionDetailed || '',
    dangerDetailed: t.reportDangerDetailed || fallback.reportDangerDetailed || '',
    inlandDetailed: t.reportInlandDetailed || fallback.reportInlandDetailed || '',
    telemetryConfidenceDesc: t.reportTelemetryConfidenceDesc || fallback.reportTelemetryConfidenceDesc || '',
    vesselSafetyDesc: t.reportVesselSafetyDesc || fallback.reportVesselSafetyDesc || '',
    returnWindowDesc: t.reportReturnWindowDesc || fallback.reportReturnWindowDesc || '',
    fishAggregationDesc: t.reportFishAggregationDesc || fallback.reportFishAggregationDesc || ''
  };
}
