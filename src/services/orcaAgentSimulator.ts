/**
 * ORCA MULTI-AGENT SIMULATOR (orcaAgentSimulator.ts)
 * 
 * Orchestrator simulating 4 specialized autonomous AI agents for maritime risk intelligence:
 * 1. Coordinator Agent: Data synthesis, routing commands, and final voyage directives.
 * 2. Ocean Agent: Sea Surface Temperature (SST), Chlorophyll-a density, and PFZ scoring.
 * 3. Weather Agent: Wind speed in knots, barometric pressure, wave height, and squall telemetry.
 * 4. Hazard / Border Agent: Proximity to international maritime borders (IMBL) and environmental threats.
 */

export type OrcaRiskLevel = 'SAFE' | 'CAUTION' | 'DANGER' | 'CRITICAL';
export type OrcaScenarioId = 'border_danger' | 'weather_storm' | 'environmental_threat' | 'perfect_day';

export interface CoordinatorAgentLog {
  agentName: 'Coordinator Agent';
  status: 'OPTIMAL' | 'ADVISORY' | 'RESTRICTED' | 'HALT';
  routingInstruction: string;
  synthesisSummary: string;
  recommendedAction: string;
  timestamp: string;
}

export interface OceanAgentLog {
  agentName: 'Ocean Agent';
  sstCelsius: number;
  chlorophyllDensity: number; // mg/m³
  thermoclineDepthMeters: number;
  oceanCurrentKnots: number;
  findings: string;
  pfzOpportunityScore: number; // 0 to 100
  timestamp: string;
}

export interface WeatherAgentLog {
  agentName: 'Weather Agent';
  windSpeedKnots: number;
  barometricPressureHpa: number;
  waveHeightMeters: number;
  gustSpeedKnots: number;
  visibilityKm: number;
  findings: string;
  severityLevel: 'NORMAL' | 'ELEVATED' | 'HAZARDOUS';
  timestamp: string;
}

export interface HazardAgentLog {
  agentName: 'Hazard / Border Agent';
  borderProximityKm: number;
  borderName: string;
  activeHazardType: 'NONE' | 'BORDER_PROXIMITY' | 'CYCLONIC_SQUALL' | 'TOXIC_ALGAL_BLOOM' | 'SHOAL_HAZARD';
  hazardStatusLog: string;
  isInsideBufferZone: boolean;
  alertDirective: string;
  timestamp: string;
}

export interface LocalizedScenarioText {
  headline: string;
  advisory: string;
  decisionVerdict: string;
  coordinatorVoice: string;
}

export interface OrcaReport {
  id: string;
  scenarioId: OrcaScenarioId;
  scenarioTitle: string;
  targetArea: string;
  timestamp: string;
  overallRiskLevel: OrcaRiskLevel;
  canSail: boolean;
  safetyScore: number; // 0 to 100
  agents: {
    coordinator: CoordinatorAgentLog;
    oceanAgent: OceanAgentLog;
    weatherAgent: WeatherAgentLog;
    hazardAgent: HazardAgentLog;
  };
  translations: Record<string, LocalizedScenarioText>;
}

// ============================================================================
// 4 REALISTIC SCENARIO DEFINITIONS
// ============================================================================

interface RawScenarioTemplate {
  scenarioId: OrcaScenarioId;
  scenarioTitle: string;
  defaultArea: string;
  overallRiskLevel: OrcaRiskLevel;
  canSail: boolean;
  safetyScore: number;
  coordinator: Omit<CoordinatorAgentLog, 'agentName' | 'timestamp'>;
  oceanAgent: Omit<OceanAgentLog, 'agentName' | 'timestamp'>;
  weatherAgent: Omit<WeatherAgentLog, 'agentName' | 'timestamp'>;
  hazardAgent: Omit<HazardAgentLog, 'agentName' | 'timestamp'>;
  translations: Record<string, LocalizedScenarioText>;
}

export const ORCA_SCENARIO_TEMPLATES: RawScenarioTemplate[] = [
  // --------------------------------------------------------------------------
  // SCENARIO 1: BORDER DANGER
  // Weather is perfect, but the fish concentration is right on the Pakistan/Sri Lanka boundary line.
  // --------------------------------------------------------------------------
  {
    scenarioId: 'border_danger',
    scenarioTitle: 'Border Proximity Alert (IMBL Risk with High Fish Catch)',
    defaultArea: 'Kori Creek / Sir Creek Sector (Off Gujarat/Kutch)',
    overallRiskLevel: 'DANGER',
    canSail: false,
    safetyScore: 28,
    coordinator: {
      status: 'HALT',
      routingInstruction: 'IMMEDIATE HARD RUDDER 150° SSE. Steer back toward Indian Sovereign Economic Zone (EEZ). Do not cross yellow safety geo-fence.',
      synthesisSummary: 'CRITICAL ARBITRATION: Ocean Agent reports prime pelagic fish shoals, but Hazard Agent flags vessel position within 850m of the International Maritime Boundary Line (IMBL). Safety policy overrides economic opportunity.',
      recommendedAction: 'Halt net deployment immediately. Maintain engines at standby and navigate 4.2 nautical miles southeast to safe coastal corridor.'
    },
    oceanAgent: {
      sstCelsius: 27.4,
      chlorophyllDensity: 3.45,
      thermoclineDepthMeters: 24,
      oceanCurrentKnots: 1.1,
      findings: 'Satellite chlorophyll and SST fronts indicate heavy skipjack tuna and pomfret aggregation directly over boundary coordinates.',
      pfzOpportunityScore: 92
    },
    weatherAgent: {
      windSpeedKnots: 8.5,
      barometricPressureHpa: 1013,
      waveHeightMeters: 0.8,
      gustSpeedKnots: 12.0,
      visibilityKm: 12.0,
      findings: 'Atmospheric conditions calm and optimal. Gentle coastal breeze, glassy sea surface, low swell period.',
      severityLevel: 'NORMAL'
    },
    hazardAgent: {
      borderProximityKm: 0.85,
      borderName: 'India-Pakistan Maritime Boundary Line (Sir Creek / Kori Sector)',
      activeHazardType: 'BORDER_PROXIMITY',
      hazardStatusLog: 'IMMINENT IMBL BREACH WARNING. Vessel is 850 meters from international border. Inside restricted 5km National Maritime Buffer Zone.',
      isInsideBufferZone: true,
      alertDirective: 'Sound ship horn, drop fishing gear, and navigate into designated Indian territorial sector immediately to avoid detention.'
    },
    translations: {
      en: {
        headline: 'CRITICAL BORDER RISK: Turn Back to Indian Waters',
        advisory: 'High fish density detected, but you are only 850 meters from the International Maritime Boundary Line. Do not drop nets.',
        decisionVerdict: 'STAY AWAY / REVERSE COURSE',
        coordinatorVoice: 'Attention captain: While fishing potential is high, you are dangerously close to the international border line. Turn south immediately.'
      },
      hi: {
        headline: 'गंभीर सीमा चेतावनी: भारतीय जलक्षेत्र में वापस लौटें',
        advisory: 'मछली की प्रचुरता अधिक है, लेकिन आप अंतर्राष्ट्रीय समुद्री सीमा से केवल 850 मीटर दूर हैं। जाल न डालें।',
        decisionVerdict: 'सीमा पार न करें / तुरंत मुड़ें',
        coordinatorVoice: 'कप्तान ध्यान दें: मछली की संभावना अधिक होने के बावजूद आप सीमा रेखा के खतरनाक रूप से करीब हैं। तुरंत दक्षिण की ओर मुड़ें।'
      },
      ta: {
        headline: 'எல்லை ஆபத்து எச்சரிக்கை: இந்திய எல்லைக்குள் திரும்புங்கள்',
        advisory: 'மீன் செறிவு அதிகமாக உள்ளது, ஆனால் நீங்கள் சர்வதேச கடல் எல்லைக்கு மிக அருகில் (850 மீட்டர்) உள்ளீர்கள். வலை வீச வேண்டாம்.',
        decisionVerdict: 'எல்லையை கடக்க வேண்டாம் / திரும்புங்கள்',
        coordinatorVoice: 'கேப்டன் கவனத்திற்கு: மீன்வளம் சிறப்பாக இருந்தாலும் சர்வதேச கடல் எல்லை மிக அருகில் உள்ளது. உடனே படகை திருப்பி பாதுகாப்பான பகுதிக்கு செல்லுங்கள்.'
      },
      kn: {
        headline: 'ಗಡಿ ಅಪಾಯದ ಎಚ್ಚರಿಕೆ: ಭಾರತೀಯ ಜಲಪ್ರದೇಶಕ್ಕೆ ಮರಳಿ',
        advisory: 'ಮೀನು ಹೇರಳವಾಗಿದೆ, ಆದರೆ ನೀವು ಅಂತರರಾಷ್ಟ್ರೀಯ ಕಡಲ ಗಡಿಯಿಂದ ಕೇವಲ 850 ಮೀಟರ್ ದೂರದಲ್ಲಿದ್ದೀರಿ. ಬಲೆ ಬೀಸಬೇಡಿ.',
        decisionVerdict: 'ತಕ್ಷಣ ಹಿಂದಿರುಗಿ / ಗಡಿ ಸಮೀಪ',
        coordinatorVoice: 'ಕ್ಯಾಪ್ಟನ್ ಗಮನಿಸಿ: ಮೀನುಗಾರಿಕೆ ಅವಕಾಶ ಉತ್ತಮವಾಗಿದ್ದರೂ ಅಂತರರಾಷ್ಟ್ರೀಯ ಗಡಿ ತೀರ ಹತ್ತಿರದಲ್ಲಿದೆ. ತಕ್ಷಣ ದಕ್ಷಿಣಕ್ಕೆ ತಿರುಗಿ.'
      },
      ml: {
        headline: 'അതിർത്തി സുരക്ഷാ മുന്നറിയിപ്പ്: ഉടൻ പിൻവാങ്ങുക',
        advisory: 'മത്സ്യസാന്നിധ്യം കൂടുതലാണ്, എന്നാൽ നിങ്ങൾ അന്താരാഷ്ട്ര സമുദ്രാതിർത്തിയിൽ നിന്ന് വെറും 850 മീറ്റർ മാത്രമാണ് അകലെ. വല ഇടരുത്.',
        decisionVerdict: 'അതിർത്തി കടക്കരുത് / ഉടൻ മടങ്ങുക',
        coordinatorVoice: 'ശ്രദ്ധിക്കുക: മത്സ്യലഭ്യത കൂടുതലാണെങ്കിലും നിങ്ങൾ സമുദ്രാതിർത്തിക്ക് വളരെ അടുത്താണ്. ഉടൻ സുരക്ഷിത പാതയിലേക്ക് നീങ്ങുക.'
      },
      te: {
        headline: 'సరిహద్దు ప్రమాద హెచ్చరిక: భారత జలాల్లోకి తిరిగి రండి',
        advisory: 'చేపలు ఎక్కువగా ఉన్నాయి, కానీ మీరు అంతర్జాతీయ సముద్ర సరిహద్దుకు కేవలం 850 మీటర్ల దూరంలో ఉన్నారు. వలలు వేయవద్దు.',
        decisionVerdict: 'సరిహద్దు దాటవద్దు / వెనక్కి తిరగండి',
        coordinatorVoice: 'కెప్టెన్ దృష్టికి: చేపల లభ్యత ఉన్నప్పటికీ మీరు సరిహద్దుకు అతి సమీపంలో ఉన్నారు. వెంటనే సురక్షిత ప్రాంతానికి మళ్లండి.'
      },
      mr: {
        headline: 'आंतरराष्ट्रीय सीमा धोका: भारतीय जलक्षेत्रात माघारी फिरा',
        advisory: 'माशांची घनता जास्त आहे, परंतु तुम्ही आंतरराष्ट्रीय सागरी सीमेपासून फक्त ८५० मीटर अंतरावर आहात. जाळी टाकू नका.',
        decisionVerdict: 'सीमा ओलांडू नका / मागे फिरा',
        coordinatorVoice: 'लक्ष द्या कॅप्टन: मासे मुबलक असले तरी तुम्ही आंतरराष्ट्रीय सीमेच्या अत्यंत जवळ आहात. तात्काळ दक्षिणेकडे वळा.'
      },
      bn: {
        headline: 'আন্তর্জাতিক সীমান্ত সতর্কতা: ভারতীয় জলসীমায় ফিরে আসুন',
        advisory: 'মাছের ঘনত্ব বেশি থাকলেও আপনি আন্তর্জাতিক জলসীমা থেকে মাত্র ৮৫০ মিটার দূরে। জাল ফেলবেন না।',
        decisionVerdict: 'সীমানা পার হবেন না / ফিরে আসুন',
        coordinatorVoice: 'ক্যাপ্টেনের দৃষ্টি আকর্ষণ: মাছের প্রাচুর্য থাকলেও আপনি সীমান্তের অতি নিকটে রয়েছেন। অবিলম্বে ফিরে আসুন।'
      },
      od: {
        headline: 'ଅନ୍ତର୍ଜାତୀୟ ସୀମା ବିପଦ: ଭାରତୀୟ ଜଳସୀମାକୁ ଫେରିଆସନ୍ତୁ',
        advisory: 'ମାଛ ପ୍ରଚୁର ଥିଲେ ମଧ୍ୟ ଆପଣ ଆନ୍ତର୍ଜାତୀୟ ସାମୁଦ୍ରିକ ସୀମାରୁ ମାତ୍ର ୮୫୦ ମିଟର ଦୂରରେ ଅଛନ୍ତି। ଜାଲ ବିଛାନ୍ତୁ ନାହିଁ।',
        decisionVerdict: 'ତୁରନ୍ତ ଫେରନ୍ତୁ / ସୀମା ବିପଦ',
        coordinatorVoice: 'କ୍ୟାପଟେନ ଧ୍ୟାନ ଦିଅନ୍ତୁ: ଆପଣ ଅନ୍ତର୍ଜାତୀୟ ସୀମା ରେଖାର ଅତ୍ୟନ୍ତ ନିକଟରେ ଅଛନ୍ତି। ତୁରନ୍ତ ସୁରକ୍ଷିତ ଜଳସୀମାକୁ ଫେରନ୍ତୁ।'
      },
      gu: {
        headline: 'આંતરરાષ્ટ્રીય સીમા ચેતવણી: ભારતીય દરિયાઈ સીમામાં પાછા વળો',
        advisory: 'મત્સ્ય સંભાવના ઊંચી છે પરંતુ તમે આંતરરાષ્ટ્રીય સરહદથી માત્ર ૮૫૦ મીટર દૂર છો. જાળી નાખશો નહીં.',
        decisionVerdict: 'સરહદ પાર ન કરો / પાછા ફરો',
        coordinatorVoice: 'કપ્તાન ધ્યાન આપો: માછલીઓ પુષ્કળ હોવા છતાં તમે સરહદની ખૂબ નજીક છો. તાત્કાલિક બોટ પાછી વાળો.'
      },
      pa: {
        headline: 'ਸਰਹੱਦ ਨੇੜੇ ਖ਼ਤਰਾ: ਭਾਰਤੀ ਪਾਣੀਆਂ ਵਿੱਚ ਵਾਪਸ ਮੁੜੋ',
        advisory: 'ਮੱਛੀਆਂ ਬਹੁਤ ਹਨ ਪਰ ਤੁਸੀਂ ਕੌਮਾਂਤਰੀ ਸਰਹੱਦ ਤੋਂ ਸਿਰਫ਼ 850 ਮੀਟਰ ਦੂਰ ਹੋ। ਜਾਲ ਨਾ ਸੁੱਟੋ।',
        decisionVerdict: 'ਸਰਹੱਦ ਨਾ ਟੱਪੋ / ਵਾਪਸ ਮੁੜੋ',
        coordinatorVoice: 'ਧਿਆਨ ਦਿਓ ਕਪਤਾਨ: ਮੱਛੀਆਂ ਦੀ ਸੰਭਾਵਨਾ ਦੇ ਬਾਵਜੂਦ ਤੁਸੀਂ ਸਰਹੱਦ ਦੇ ਬਹੁਤ ਨੇੜੇ ਹੋ। ਤੁਰੰਤ ਵਾਪਸ ਮੁੜੋ।'
      },
      ur: {
        headline: 'بین الاقوامی سرحد کا خطرہ: فوری طور پر واپس مڑیں',
        advisory: 'مچھلی کی کثرت زیادہ ہے مگر آپ بین الاقوامی سمندری سرحد سے محض 850 میٹر دور ہیں۔ جال نہ پھینکیں۔',
        decisionVerdict: 'سرحد پار نہ کریں / واپس مڑیں',
        coordinatorVoice: 'توجہ فرمائیں کپتان: آپ سرحد کے انتہائی قریب پہنچ چکے ہیں۔ فوری طور پر اپنے جہاز کو واپس موڑیں۔'
      }
    }
  },

  // --------------------------------------------------------------------------
  // SCENARIO 2: WEATHER STORM HAZARD
  // Safety threshold exceeded due to high wind speeds and massive 3.5m wave chops.
  // --------------------------------------------------------------------------
  {
    scenarioId: 'weather_storm',
    scenarioTitle: 'Severe Gale Squall & Dangerous 3.5m Wave Chops',
    defaultArea: 'Mangaluru / Malpe Offshore Sector',
    overallRiskLevel: 'CRITICAL',
    canSail: false,
    safetyScore: 12,
    coordinator: {
      status: 'HALT',
      routingInstruction: 'RETURN TO HARBOUR AT 8 KNOTS CRUISING SPEED. Head directly to Mangaluru Old Port breakwater basin before wave crests intensify.',
      synthesisSummary: 'METEOROLOGICAL SQUALL VETO: Weather Agent flags Beaufort Force 9 gale winds (42 knots) with dangerous 3.5m - 4.1m steep wave chops and barometric crash to 995 hPa. Extreme vessel capsize hazard.',
      recommendedAction: 'Secure all deck hatches, tie down life-saving floats, radio harbour control on VHF Channel 16, and seek immediate sheltered moorage.'
    },
    oceanAgent: {
      sstCelsius: 29.8,
      chlorophyllDensity: 0.95,
      thermoclineDepthMeters: 12,
      oceanCurrentKnots: 2.8,
      findings: 'Intense thermal energy buildup feeding squall convection; steep surface churn causing complete dispersion of fish schools.',
      pfzOpportunityScore: 18
    },
    weatherAgent: {
      windSpeedKnots: 42.0,
      barometricPressureHpa: 995,
      waveHeightMeters: 3.5,
      gustSpeedKnots: 54.0,
      visibilityKm: 2.5,
      findings: 'Severe cyclonic squall line active. Heavy blinding squalls, wind gusts up to 54 knots, destructive steep chops exceeding 3.5 meters.',
      severityLevel: 'HAZARDOUS'
    },
    hazardAgent: {
      borderProximityKm: 28.0,
      borderName: 'Territorial Waters (Clear of International Boundary)',
      activeHazardType: 'CYCLONIC_SQUALL',
      hazardStatusLog: 'IMD RED ALERT CYCLONE WARNING. Sea state Very Rough to High. Harbour warning signal hoisted.',
      isInsideBufferZone: false,
      alertDirective: 'Absolute prohibition on all traditional, motorized, and mechanized sea voyages. Return to port basin immediately.'
    },
    translations: {
      en: {
        headline: 'STORM WARNING: 3.5m Waves & 42-Knot Winds',
        advisory: 'Severe gale force squalls in progress. Sea conditions exceed craft survival limits. Return to harbour immediately.',
        decisionVerdict: 'UNSAFE / RETURN TO PORT',
        coordinatorVoice: 'Emergency weather advisory: Wind speeds have reached 42 knots with 3.5 meter wave chops. Head back to port immediately.'
      },
      hi: {
        headline: 'तूफान चेतावनी: 3.5 मीटर ऊंची लहरें और 42 नॉट हवा',
        advisory: 'समुद्र में तीव्र चक्रवाती तूफान। लहरें नाव की क्षमता से अधिक ऊंची हैं। तुरंत निकटतम बंदरगाह लौटें।',
        decisionVerdict: 'असुरक्षित / बंदरगाह लौटें',
        coordinatorVoice: 'आपातकालीन मौसम चेतावनी: हवा की गति 42 नॉट और लहरें 3.5 मीटर पहुंच चुकी हैं। तुरंत बंदरगाह की ओर बढ़ें।'
      },
      ta: {
        headline: 'புயல் எச்சரிக்கை: 3.5 மீட்டர் அலைகள் & 42 நாட் பலத்த காற்று',
        advisory: 'கடுமையான சூறாவளி காற்று வீசுகிறது. படகு கவிழும் அபாயம் உள்ளது. உடனடியாக துறைமுகத்திற்கு திரும்புங்கள்.',
        decisionVerdict: 'ஆபத்தானது / கரை திரும்புங்கள்',
        coordinatorVoice: 'அவசர வானிலை எச்சரிக்கை: கடல் அலைகள் 3.5 மீட்டர் உயரத்திற்கு எழுகின்றன. உடனடியாக துறைமுகம் திரும்புங்கள்.'
      },
      kn: {
        headline: 'ಬಿರುಗಾಳಿ ಎಚ್ಚರಿಕೆ: 3.5 ಮೀಟರ್ ಎತ್ತರದ ಅಲೆಗಳು & 42 ನಾಟ್ ಗಾಳಿ',
        advisory: 'ತೀವ್ರ ಚಂಡಮಾರುತದ ಅಲೆಗಳು ಉಂಟಾಗಿವೆ. ದೋಣಿ ಮಗುಚುವ ಅಪಾಯವಿದೆ. ತಕ್ಷಣ ಸಮೀಪದ ಬಂದರಿಗೆ ಹಿಂತಿರುಗಿ.',
        decisionVerdict: 'ಅಪಾಯಕಾರಿ / ಬಂದರಿಗೆ ಹಿಂತಿರುಗಿ',
        coordinatorVoice: 'ತುರ್ತು ಹವಾಮಾನ ಎಚ್ಚರಿಕೆ: ಗಾಳಿಯ ವೇಗ 42 ನಾಟ್ ತಲುಪಿದ್ದು ಅಲೆಗಳು 3.5 ಮೀಟರ್ ಇವೆ. ಕೂಡಲೇ ಬಂದರಿಗೆ ಮರಳಿ.'
      },
      ml: {
        headline: 'കൊടുങ്കാറ്റ് മുന്നറിയിപ്പ്: 3.5 മീറ്റർ ഉയർന്ന തിരമാലകൾ',
        advisory: 'കടലിൽ അതിശക്തമായ കാറ്റും അപകടകരമായ തിരമാലകളും. യാതൊരു കാരണവശാലും കടലിൽ തുടരരുത്, ഉടൻ തീരമണയുക.',
        decisionVerdict: 'അപകടകരം / ഉടൻ തീരത്തേക്ക് മടങ്ങുക',
        coordinatorVoice: 'അടിയന്തര മുന്നറിയിപ്പ്: കടൽ അതീവ പ്രക്ഷുബ്ധമാണ്. 3.5 മീറ്റർ ഉയരമുള്ള തിരമാലകൾ ഉണ്ട്. ഉടൻ തുറമുഖത്തേക്ക് മടങ്ങുക.'
      },
      te: {
        headline: 'తుఫాను హెచ్చరిక: 3.5 మీటర్ల రాకాసి అలలు & తీవ్ర గాలులు',
        advisory: 'సముద్రంలో తీవ్రమైన తుఫాను వాతావరణం. పడవలకు అత్యంత ప్రమాదకరం. వెంటనే రేవుకు తిరిగి వెళ్లండి.',
        decisionVerdict: 'ప్రమాదకరం / రేవుకు తిరిగి వెళ్లండి',
        coordinatorVoice: 'అత్యవసర హెచ్చరిక: గంటకు 42 నాట్ల గాలులు, 3.5 మీటర్ల అలలు ఉన్నాయి. వెంటనే సురక్షిత తీరానికి చేరుకోండి.'
      },
      mr: {
        headline: 'वादळाचा इशारा: ३.५ मीटर उंच लाटा आणि प्रचंड वारा',
        advisory: 'समुद्रात चक्रीवादळाची स्थिती. लाटा धोकादायक पातळीवर आहेत. ताबडतोब जवळच्या बंदरात आश्रय घ्या.',
        decisionVerdict: 'अत्यंत धोकादायक / बंदरात परता',
        coordinatorVoice: 'तातडीचा इशारा: वारा ४२ नॉट वेगाने वाहत असून ३.५ मीटर उंच लाटा आहेत. ताबडतोब किनाऱ्याकडे परता.'
      },
      bn: {
        headline: 'ঝড় সতর্কতা: ৩.৫ মিটার উত্তাল ঢেউ এবং প্রবল বাতাস',
        advisory: 'সমুদ্রে ভয়াবহ সামুদ্রিক ঝড় চলছে। নৌকাডুবির প্রবল আশঙ্কা। অবিলম্বে নিরাপদ পোতাশ্রয়ে ফিরে আসুন।',
        decisionVerdict: 'অনিরাপদ / পোতাশ্রয়ে ফিরুন',
        coordinatorVoice: 'জরুরী সতর্কতা: বাতাসের গতিবেগ ৪২ নট এবং ঢেউ ৩.৫ মিটার ছাড়িয়েছে। অনতিবিলম্বে উপকূলে ফিরুন।'
      },
      od: {
        headline: 'ଝଡ଼ ସତର୍କତା: ୩.୫ ମିଟର ଉଚ୍ଚ ଢେଉ ଏବଂ ପ୍ରଚଣ୍ଡ ବେଗର ପବନ',
        advisory: 'ସମୁଦ୍ରରେ ଭୟଙ୍କର ଝଡ଼ର ସମ୍ଭାବନା। ଡଙ୍ଗା ବୁଡ଼ିଯିବାର ବିପଦ ରହିଛି। ତୁରନ୍ତ କୂଳକୁ ଫେରିଆସନ୍ତୁ।',
        decisionVerdict: 'ଅସୁରକ୍ଷିତ / ବନ୍ଦରକୁ ଫେରନ୍ତୁ',
        coordinatorVoice: 'ଜରୁରୀ ସୂଚନା: ସମୁଦ୍ର ଅତ୍ୟନ୍ତ ଅଶାନ୍ତ ଅଛି। ତୁରନ୍ତ ସୁରକ୍ଷିତ ବନ୍ଦରକୁ ଫେରିଆସନ୍ତୁ।'
      },
      gu: {
        headline: 'વાવાઝોડાની ચેતવણી: ૩.૫ મીટર ઊંચા મોજાં અને ભારે પવન',
        advisory: 'દરિયામાં અત્યંત ગંભીર વાવાઝોડાની સ્થિતિ છે. તાત્કાલિક દરિયામાંથી નીકળી નજીકના બંદરે પહોંચો.',
        decisionVerdict: 'અસુરક્ષિત / બંદરે પાછા ફરો',
        coordinatorVoice: 'કટોકટીની ચેતવણી: દરિયામાં ૩.૫ મીટરના ઉછળતા મોજાં છે. તાત્કાલિક સલામત બંદરે બોટ લઈ જાઓ.'
      },
      pa: {
        headline: 'ਤੂਫ਼ਾਨੀ ਚੇਤਾਵਨੀ: 3.5 ਮੀਟਰ ਉੱਚੀਆਂ ਲਹਿਰਾਂ ਅਤੇ ਤੇਜ਼ ਹਵਾਵਾਂ',
        advisory: 'ਸਮੁੰਦਰ ਵਿੱਚ ਖ਼ਤਰਨਾਕ ਤੂਫ਼ਾਨ ਚੱਲ ਰਿਹਾ ਹੈ। ਕਿਸ਼ਤੀ ਉਲਟਣ ਦਾ ਖ਼ਤਰਾ ਹੈ। ਤੁਰੰਤ ਬੰਦਰਗਾਹ ਵਾਪਸ ਮੁੜੋ।',
        decisionVerdict: 'ਖ਼ਤਰਨਾਕ / ਬੰਦਰਗਾਹ ਪਰਤੋ',
        coordinatorVoice: 'ਐਮਰਜੈਂਸੀ ਚੇਤਾਵਨੀ: ਹਵਾ 42 ਨੌਟ ਦੀ ਰਫ਼ਤਾਰ ਨਾਲ ਚੱਲ ਰਹੀ ਹੈ। ਤੁਰੰਤ ਕਿਨਾਰੇ ਵੱਲ ਮੁੜੋ।'
      },
      ur: {
        headline: 'طوفان کی وارننگ: 3.5 میٹر اونچی لہریں اور تیز ہوائیں',
        advisory: 'سمندر میں شدید طوفانی صورتحال ہے۔ فوری طور پر قریبی بندرگاہ میں پناہ لیں۔',
        decisionVerdict: 'غیر محفوظ / بندرگاہ واپس آئیں',
        coordinatorVoice: 'ہنگامی موسمی انتباہ: تیز ہوائیں اور اونچی لہریں جان لیوا ہو سکتی ہیں۔ فوراً بندرگاہ کی طرف مڑیں۔'
      }
    }
  },

  // --------------------------------------------------------------------------
  // SCENARIO 3: ENVIRONMENTAL THREAT
  // Safe weather, but a massive toxic jellyfish algal bloom swarm is blocking the harbor path.
  // --------------------------------------------------------------------------
  {
    scenarioId: 'environmental_threat',
    scenarioTitle: 'Toxic Jellyfish Swarm & Algal Bloom Channel Hazard',
    defaultArea: 'Cochin Fairway & Vypin Coastal Channel',
    overallRiskLevel: 'CAUTION',
    canSail: false,
    safetyScore: 45,
    coordinator: {
      status: 'RESTRICTED',
      routingInstruction: 'AVOID MAIN HARBOUR CHANNEL. Divert 2.4 nautical miles south-southwest via Outer Deep Sea Channel to prevent net tearing and engine impeller blockage.',
      synthesisSummary: 'ENVIRONMENTAL BIO-HAZARD DETECTED: Weather Agent confirms tranquil winds (10 knots) and 1.0m waves, but Hazard Agent reports a 4.5 sq km dense swarm of Crambionella toxic jellyfish and Noctiluca algal bloom choking the harbour mouth.',
      recommendedAction: 'Do not deploy gillnets or bottom trawls in channel. Clean engine seawater cooling filters before throttling up.'
    },
    oceanAgent: {
      sstCelsius: 30.1,
      chlorophyllDensity: 4.80,
      thermoclineDepthMeters: 18,
      oceanCurrentKnots: 0.9,
      findings: 'Hyper-eutrophic chlorophyll spike (4.80 mg/m³) with thick bioluminescent Noctiluca scintillans slick and dissolved oxygen dip.',
      pfzOpportunityScore: 35
    },
    weatherAgent: {
      windSpeedKnots: 10.2,
      barometricPressureHpa: 1011,
      waveHeightMeters: 1.0,
      gustSpeedKnots: 14.0,
      visibilityKm: 8.0,
      findings: 'Mild atmospheric conditions. Low swell period (7s), gentle breeze, calm surface aside from biological slime layer.',
      severityLevel: 'NORMAL'
    },
    hazardAgent: {
      borderProximityKm: 45.0,
      borderName: 'Territorial Waters (Clear of International Boundary)',
      activeHazardType: 'TOXIC_ALGAL_BLOOM',
      hazardStatusLog: 'DENSE TOXIC JELLYFISH SWARM (Crambionella stuhlmanni). 4.5 sq km bio-slick blocking navigation channel. Severe net choking hazard.',
      isInsideBufferZone: false,
      alertDirective: 'Bypass harbour approach channel. Exercise extreme caution against engine seawater intake overheating and toxic contact.'
    },
    translations: {
      en: {
        headline: 'BIO-HAZARD: Toxic Jellyfish Swarm Blocking Channel',
        advisory: 'Weather is calm, but thousands of toxic jellyfish and thick algal blooms are choking the channel. Divert via southern channel.',
        decisionVerdict: 'PROCEED WITH CAUTION / DETOUR CHANNEL',
        coordinatorVoice: 'Navigation advisory: Toxic jellyfish swarm reported at harbor mouth. Avoid the main channel to prevent net damage and engine failure.'
      },
      hi: {
        headline: 'जैविक खतरा: जहरीली जेलीफिश का झुंड चैनल में फैला',
        advisory: 'मौसम शांत है, लेकिन हजारों जहरीली जेलीफिश और शैवाल ब्लोम चैनल को अवरुद्ध कर रहे हैं। दक्षिणी चैनल से रास्ता बदलें।',
        decisionVerdict: 'सावधानी बरतें / मार्ग बदलें',
        coordinatorVoice: 'नेविगेशन चेतावनी: बंदरगाह के मुहाने पर जहरीली जेलीफिश का झुंड मौजूद है। जालों की सुरक्षा हेतु मुख्य चैनल से बचें।'
      },
      ta: {
        headline: 'உயிரியல் ஆபத்து: நச்சு ஜெல்லிமீன்கள் துறைமுக பாதையை மறித்துள்ளன',
        advisory: 'வானிலை அமைதியாக உள்ளது, ஆனால் நச்சு ஜெல்லிமீன்கள் படகு பாதையை அடைத்துள்ளன. தெற்கு மாற்று பாதையை பயன்படுத்தவும்.',
        decisionVerdict: 'எச்சரிக்கையுடன் செல்லவும் / பாதை மாற்றம்',
        coordinatorVoice: 'வழிகாட்டுதல் அறிவிப்பு: துறைமுக நுழைவாயிலில் நச்சு ஜெல்லிமீன்கள் திரண்டுள்ளன. வலைகளை சேதமடையாமல் பாதுகாக்க மாற்று வழியில் செல்லவும்.'
      },
      kn: {
        headline: 'ಜೈವಿಕ ಅಪಾಯ: ವಿಷಕಾರಿ ಜೆಲ್ಲಿಫಿಶ್ ಹಾವಳಿ',
        advisory: 'ಹವಾಮಾನ ಶಾಂತವಾಗಿದೆ, ಆದರೆ ಬೃಹತ್ ಪ್ರಮಾಣದ ವಿಷಕಾರಿ ಜೆಲ್ಲಿಫಿಶ್ ಬಂದರು ಕಾಲುವೆಯನ್ನು ನಿರ್ಬಂಧಿಸಿದೆ. ದಕ್ಷಿಣದ ಮಾರ್ಗ ಬಳಸಿ.',
        decisionVerdict: 'ಎಚ್ಚರಿಕೆಯಿಂದ ಮುನ್ನಡೆಯಿರಿ / ಪರ್ಯಾಯ ಮಾರ್ಗ',
        coordinatorVoice: 'ಮಾರ್ಗದರ್ಶನ ಸೂಚನೆ: ಬಂದರು ದ್ವಾರದಲ್ಲಿ ಜೆಲ್ಲಿಫಿಶ್ ಗುಂಪು ಕಂಡುಬಂದಿದೆ. ಎಂಜಿನ್ ಮತ್ತು ಬಲೆ ರಕ್ಷಿಸಲು ಪರ್ಯಾಯ ಮಾರ್ಗ ಬಳಸಿ.'
      },
      ml: {
        headline: 'പാരിസ്ഥിതിക ഭീഷണി: വിഷ ജെല്ലിഫിഷ് കൂട്ടം തടസ്സം സൃഷ്ടിക്കുന്നു',
        advisory: 'കാലാവസ്ഥ അനുകൂലമാണെങ്കിലും തുറമുഖ ചാനലിൽ കൊമ്പൻ ചൊറി (ജെല്ലിഫിഷ്) വ്യാപിച്ചിരിക്കുന്നു. തെക്കൻ പാതയിലൂടെ സഞ്ചരിക്കുക.',
        decisionVerdict: 'ജാഗ്രത പാലിക്കുക / വഴി തിരിച്ചുവിടുക',
        coordinatorVoice: 'നാവിഗേഷൻ മുന്നറിയിപ്പ്: തുറമുഖ കവാടത്തിൽ ജെല്ലിഫിഷ് സാന്നിധ്യമുണ്ട്. വലകൾ കേടാകാതിരിക്കാൻ തെക്കൻ ചാനൽ ഉപയോഗിക്കുക.'
      },
      te: {
        headline: 'పర్యావరణ ప్రమాదం: విషపూరిత జెల్లీఫిష్‌ల గుంపు',
        advisory: 'వాతావరణం అనుకూలంగా ఉన్నప్పటికీ, నౌకాశ్రయ మార్గంలో జెల్లీఫిష్‌లు అడ్డంకిగా ఉన్నాయి. దక్షిణ మార్గం గుండా ప్రయాణించండి.',
        decisionVerdict: 'జాగ్రత్త వహించండి / దారి మళ్లించండి',
        coordinatorVoice: 'రవాణా హెచ్చరిక: హార్బర్ ప్రవేశ ద్వారం వద్ద జెల్లీఫిష్‌లు ఉన్నాయి. వలల రక్షణ కోసం ప్రత్యామ్నాయ మార్గం ఎంచుకోండి.'
      },
      mr: {
        headline: 'जैविक धोका: विषारी जेलीफिशचा मोठा थवा',
        advisory: 'हवामान शांत आहे, परंतु जेलीफिश आणि शेवाळामुळे बंदर मार्ग अडवला गेला आहे. दक्षिणेकडील पर्यायी मार्गाने प्रवास करा.',
        decisionVerdict: 'सावधगिरी बाळगा / मार्ग बदला',
        coordinatorVoice: 'मार्गदर्शन सूचना: बंदराच्या मुखाशी विषारी जेलीफिशचा थवा आहे. जाळी आणि इंजिनच्या सुरक्षेसाठी पर्यायी मार्ग वापरा.'
      },
      bn: {
        headline: 'পরিবেশগত বিপদ: বিষাক্ত জেলিফিশের ঝাঁক চ্যানেল আটকে রেখেছে',
        advisory: 'আবহাওয়া অনুকূল হলেও চ্যানেল মুখে বিষাক্ত জেলিফিশের বিস্তার রয়েছে। দক্ষিণ দিকের বিকল্প পথ ব্যবহার করুন।',
        decisionVerdict: 'সতর্কতা অবলম্বন করুন / পথ পরিবর্তন',
        coordinatorVoice: 'জাহাজ চলাচল বার্তা: পোতাশ্রয়ের মুখে জেলিফিশের ভিড়। জাল ছিঁড়ে যাওয়া এড়াতে বিকল্প চ্যানেলে যান।'
      },
      od: {
        headline: 'ଜୈବିକ ବିପଦ: ବିଷାକ୍ତ ଜେଲିଫିସ୍ ସମୁଦ୍ର ପଥ ଅବରୋଧ କରିଛି',
        advisory: 'ପାଣିପାଗ ଭଲ ଥିଲେ ବି ଚ୍ୟାନେଲରେ ଜେଲିଫିସ୍ ଭରି ରହିଛି। ଦକ୍ଷିଣ ଦିଗର ବିକଳ୍ପ ପଥ ଦେଇ ଯାତ୍ରା କରନ୍ତୁ।',
        decisionVerdict: 'ସତର୍କ ରୁହନ୍ତୁ / ପଥ ବଦଳାନ୍ତୁ',
        coordinatorVoice: 'ଦିଗଦର୍ଶନ ସୂଚନା: ବନ୍ଦର ମୁହାଣରେ ଜେଲିଫିସ୍ ଜମା ହୋଇଛି। ଜାଲ ସୁରକ୍ଷା ପାଇଁ ଅନ୍ୟ ପଥ ବ୍ୟବହାର କରନ୍ତୁ।'
      },
      gu: {
        headline: 'જૈવિક ખતરો: ઝેરી જેલીફિશનો મોટો જથ્થો ચેનલમાં ફસાયો',
        advisory: 'હવામાન સ્વચ્છ છે પરંતુ હજારો ઝેરી જેલીફિશ ચેનલમાં હોવાથી જાળી ફાટવાનો ભય છે. દક્ષિણ માર્ગ અપનાવો.',
        decisionVerdict: 'સાવચેતી રાખો / માર્ગ બદલો',
        coordinatorVoice: 'નેવિગેશન સલાહ: બંદરના મુખ પાસે ઝેરી જેલીફિશ છે. એન્જિન અને જાળીની સુરક્ષા માટે અન્ય માર્ગ લો.'
      },
      pa: {
        headline: 'ਵਾਤਾਵਰਣ ਖ਼ਤਰਾ: ਜ਼ਹਿਰੀਲੀ ਜੈਲੀਫਿਸ਼ ਨੇ ਰਸਤਾ ਰੋਕਿਆ',
        advisory: 'ਮੌਸਮ ਸਾਫ਼ ਹੈ ਪਰ ਸਮੁੰਦਰੀ ਰਸਤੇ ਵਿੱਚ ਜ਼ਹਿਰੀਲੀ ਜੈਲੀਫਿਸ਼ ਫੈਲੀ ਹੋਈ ਹੈ। ਦੱਖਣੀ ਰਸਤਾ ਚੁਣੋ।',
        decisionVerdict: 'ਸਾਵਧਾਨ ਰਹੋ / ਰਸਤਾ ਬਦਲੋ',
        coordinatorVoice: 'ਨੇਵੀਗੇਸ਼ਨ ਸਲਾਹ: ਜੈਲੀਫਿਸ਼ ਕਾਰਨ ਜਾਲ ਖ਼ਰਾਬ ਹੋ ਸਕਦਾ ਹੈ। ਮੁੱਖ ਰਸਤੇ ਦੀ ਬਜਾਏ ਬਦਲਵਾਂ ਰਸਤਾ ਲਓ।'
      },
      ur: {
        headline: 'ماحولیاتی خطرہ: زہریلی جیلی فش کا ریلا چینل میں رکاوٹ',
        advisory: 'موسم سازگار ہے لیکن زہریلی جیلی فش کے باعث انجن اور جال کو نقصان کا خدشہ ہے۔ جنوبی راستے سے گزریں۔',
        decisionVerdict: 'احتیاط برتیں / راستہ تبدیل کریں',
        coordinatorVoice: 'بحری ہدایت: بندرگاہ کے دہانے پر جیلی فش موجود ہے۔ اپنے جالوں کی حفاظت کے لیے متبادل راستہ اختیار کریں۔'
      }
    }
  },

  // --------------------------------------------------------------------------
  // SCENARIO 4: PERFECT FISHING DAY
  // Completely clear skies, low swells, high chlorophyll concentration, safe borders.
  // --------------------------------------------------------------------------
  {
    scenarioId: 'perfect_day',
    scenarioTitle: 'Optimal Voyage Greenlight (Clear Skies, Low Swell, High PFZ)',
    defaultArea: 'Ratnagiri / Sindhudurg Offshore (14 NM Out)',
    overallRiskLevel: 'SAFE',
    canSail: true,
    safetyScore: 98,
    coordinator: {
      status: 'OPTIMAL',
      routingInstruction: 'DEPART HARBOUR ON VECTOR 240° WSW. Proceed 14 nautical miles to high-density chlorophyll convergence polygon.',
      synthesisSummary: 'FULL FLEET CLEARANCE: All 4 AI agents confirm golden maritime envelope. Low fuel expenditure trajectory, calm 0.6m swells, zero boundary hazards, and active mackerel feeding shoals.',
      recommendedAction: 'Deploy midwater drift nets and purse seines. Plan return journey before 18:00 hrs IST for evening port market auction.'
    },
    oceanAgent: {
      sstCelsius: 27.2,
      chlorophyllDensity: 2.85,
      thermoclineDepthMeters: 28,
      oceanCurrentKnots: 0.8,
      findings: 'Optimal Potential Fishing Zone (PFZ) thermal front detected by Oceansat-3 OCM. High pelagic school aggregation.',
      pfzOpportunityScore: 96
    },
    weatherAgent: {
      windSpeedKnots: 7.2,
      barometricPressureHpa: 1014,
      waveHeightMeters: 0.6,
      gustSpeedKnots: 9.5,
      visibilityKm: 15.0,
      findings: 'Beaufort Force 2. Glassy ocean surface, gentle ocean breeze, negligible swell period (5s), zero precipitation probability.',
      severityLevel: 'NORMAL'
    },
    hazardAgent: {
      borderProximityKm: 38.0,
      borderName: 'Indian Territorial Waters / EEZ Core',
      activeHazardType: 'NONE',
      hazardStatusLog: 'ALL HAZARD CHECKS CLEAR. Over 38 km from international boundary lines. Zero biological or navigational obstacles.',
      isInsideBufferZone: false,
      alertDirective: 'Safe sailing conditions certified. Vessel operation within standard maritime safety protocols.'
    },
    translations: {
      en: {
        headline: 'PRIME FISHING DAY: Green Flag for Sea Voyage',
        advisory: 'Clear skies, gentle 0.6m waves, high fish schools 14 nautical miles offshore. Excellent fishing conditions.',
        decisionVerdict: 'SAFE TO SAIL / HIGH CATCH POTENTIAL',
        coordinatorVoice: 'Good morning captain! Weather is perfect with calm seas and abundant fish stocks. You have full clearance to sail.'
      },
      hi: {
        headline: 'मछली पकड़ने का सर्वोत्तम दिन: समुद्र यात्रा की हरी झंडी',
        advisory: 'साफ आसमान, शांत 0.6 मीटर लहरें और 14 नॉटिकल मील पर मछलियों के बड़े झुंड। मछली पकड़ने की उत्तम स्थिति।',
        decisionVerdict: 'सुरक्षित यात्रा / भरपूर मछली मिलने की संभावना',
        coordinatorVoice: 'शुभ प्रभात कप्तान! मौसम और समुद्र दोनों अनुकूल हैं। मछली के बड़े झुंड सक्रिय हैं। आपको यात्रा की पूर्ण अनुमति है।'
      },
      ta: {
        headline: 'சிறந்த மீன்பிடி நாள்: கடலுக்குச் செல்ல பச்சைக்கொடி',
        advisory: 'தெളിவான வானிலை, அமைதியான 0.6 மீட்டர் அலைகள், 14 கடல் மைல் தொலைவில் அதிக மீன்வளம். மீன்பிடிக்க மிகச் சிறந்த நாள்.',
        decisionVerdict: 'கடலுக்குச் செல்லலாம் / அதிக மீன் கிடைக்கும்',
        coordinatorVoice: 'வணக்கம் கேப்டன்! கடல் அமைதியாகவும் மீன்வளம் அதிகமாகவும் உள்ளது. நீங்கள் முழு நம்பிக்கையுடன் கடலுக்குச் செல்லலாம்.'
      },
      kn: {
        headline: 'ಉತ್ತಮ ಮೀನುಗಾರಿಕಾ ದಿನ: ಸಮುದ್ರಯಾನಕ್ಕೆ ಹಸಿರು ನಿಶಾನೆ',
        advisory: 'ಸ್ವಚ್ಛ ಆಕಾಶ, ಕೇವಲ 0.6 ಮೀಟರ್ ಸೌಮ್ಯ ಅಲೆಗಳು, 14 ನಾಟಿಕಲ್ ಮೈಲಿ ದೂರದಲ್ಲಿ ಹೇರಳ ಮೀನುಗಳು. ಅತ್ಯುತ್ತಮ ಸ್ಥಿತಿ.',
        decisionVerdict: 'ಪ್ರಯಾಣಕ್ಕೆ ಸುರಕ್ಷಿತ / ಭರಪೂರ ಮೀನು ಲಭ್ಯತೆ',
        coordinatorVoice: 'ಶುಭೋದಯ ಕ್ಯಾಪ್ಟನ್! ಕಡಲು ಶಾಂತವಾಗಿದೆ ಮತ್ತು ಮೀನಿನ ರಾಶಿ ಹೇರಳವಾಗಿದೆ. ಸಮುದ್ರಯಾನಕ್ಕೆ ಪೂರ್ಣ ಅನುಮತಿ ಇದೆ.'
      },
      ml: {
        headline: 'അനുകൂല മീൻപിടുത്ത ദിനം: കടലിൽ പോകാൻ അനുമതി',
        advisory: 'തെളിഞ്ഞ കാലാവസ്ഥയും ശാന്തമായ കടലും. 14 നോട്ടിക്കൽ മൈൽ അകലെ വൻതോതിൽ മത്സ്യശേഖരം കണ്ടെത്തി. കടലിൽ പോകാം.',
        decisionVerdict: 'യാത്ര സുരക്ഷിതം / മികച്ച മത്സ്യലഭ്യത',
        coordinatorVoice: 'സുപ്രഭാതം ക്യാപ്റ്റൻ! ശാന്തമായ കടലും മികച്ച മത്സ്യലഭ്യതയുമുള്ള ദിവസമാണ്. ധൈര്യമായി കടലിൽ പോകാം.'
      },
      te: {
        headline: 'అనుకూలమైన చేపల వేట రోజు: సముద్రయానానికి అనుమతి',
        advisory: 'నిర్మలమైన ఆకాశం, 0.6 మీటర్ల ప్రశాంత అలలు, తీరానికి 14 నాటికల్ మైళ్ల దూరంలో విస్తారమైన చేపలు.',
        decisionVerdict: 'ప్రయాణం సురక్షితం / భారీ వేట అవకాశం',
        coordinatorVoice: 'శుభోదయం కెప్టెన్! సముద్రం ప్రశాంతంగా ఉంది, చేపలు సమృద్ధిగా ఉన్నాయి. మీరు వేటకు బయలుదేరవచ్చు.'
      },
      mr: {
        headline: 'मासेमारीसाठी उत्तम दिवस: समुद्र प्रवासास हिरवा कंदील',
        advisory: 'निरभ्र आकाश, शांत ०.६ मीटर लाटा आणि १४ सागरी मैलांवर मुबलक माशांचे थवे. मासेमारीसाठी अत्यंत अनुकूल दिवस.',
        decisionVerdict: 'प्रवासास सुरक्षित / भरघोस उत्पादनाची खात्री',
        coordinatorVoice: 'सुप्रभात कॅप्टन! समुद्र अत्यंत शांत आहे आणि माशांचे मोठे थवे उपलब्ध आहेत. समुद्र प्रवासासाठी पूर्ण मंजुरी आहे.'
      },
      bn: {
        headline: 'মৎস্য শিকারের মোক্ষম দিন: সমুদ্রে যাত্রার সবুজ সংকেত',
        advisory: 'পরিষ্কার আকাশ, শান্ত ০.৬ মিটার ঢেউ, উপকূলে ১৪ নটিক্যাল মাইল দূরে প্রচুর মাছের সন্ধান। মাছ ধরার মোক্ষম সুযোগ।',
        decisionVerdict: 'যাত্রার জন্য নিরাপদ / প্রচুর মাছের সম্ভাবনা',
        coordinatorVoice: 'শুভ সকাল ক্যাপ্টেন! সমুদ্র শান্ত এবং মাছের যোগান প্রচুর। আপনি নিরাপদে সমুদ্রে যাত্রা করতে পারেন।'
      },
      od: {
        headline: 'ଉତ୍କୃଷ୍ଟ ମତ୍ସ୍ୟ ଶିକାର ଦିନ: ସମୁଦ୍ର ଯାତ୍ରା ପାଇଁ ଅନୁମତି',
        advisory: 'ନିର୍ମଳ ଆକାଶ, ଶାନ୍ତ ସମୁଦ୍ର ଏବଂ ୧୪ ନଟିକାଲ୍ ମାଇଲ୍ ଦୂରରେ ବିପୁଳ ମାଛ ସନ୍ଧାନ। ଯାତ୍ରା ପାଇଁ ଉତ୍ତମ ସମୟ।',
        decisionVerdict: 'ଯାତ୍ରା ସମ୍ପୂର୍ଣ୍ଣ ସୁରକ୍ଷିତ / ଅଧିକ ମାଛ ମିଳିବ',
        coordinatorVoice: 'ସୁପ୍ରଭାତ କ୍ୟାପଟେନ! ଆଜି ସମୁଦ୍ର ସମ୍ପୂର୍ଣ୍ଣ ଶାନ୍ତ ଅଛି। ଆପଣ ନିର୍ଭୟରେ ମାଛ ଧରିବାକୁ ଯାଇପାରିବେ।'
      },
      gu: {
        headline: 'શ્રેષ્ઠ માછીમારી દિવસ: દરિયાઈ સફર માટે લીલી ઝંડી',
        advisory: 'સ્વચ્છ આકાશ, શાંત ૦.૬ મીટર મોજાં અને ૧૪ નોટિકલ માઈલ દૂર માછલીઓના મોટા ઝૂંડ. માછીમારી માટે શ્રેષ્ઠ દિવસ.',
        decisionVerdict: 'સફર સલામત / પુષ્કળ માછલી મળવાની તક',
        coordinatorVoice: 'સુપ્રભાત કપ્તાન! દરિયો એકદમ શાંત છે અને મત્સ્ય સંપત્તિ ભરપૂર છે. તમે સફરે નીકળી શકો છો.'
      },
      pa: {
        headline: 'ਮੱਛੀ ਫੜਨ ਲਈ ਸ਼ਾਨਦਾਰ ਦਿਨ: ਸਮੁੰਦਰ ਜਾਣ ਦੀ ਖੁੱਲ੍ਹ',
        advisory: 'ਸਾਫ਼ ਅਸਮਾਨ, ਸ਼ਾਂਤ ਲਹਿਰਾਂ ਅਤੇ 14 ਨੌਟੀਕਲ ਮੀਲ ਦੂਰ ਮੱਛੀਆਂ ਦੇ ਵੱਡੇ ਝੁੰਡ। ਮੱਛੀ ਫੜਨ ਲਈ ਸੁਨਹਿਰੀ ਮੌਕਾ।',
        decisionVerdict: 'ਸਫ਼ਰ ਬਿਲਕੁਲ ਸੁਰੱਖਿਅਤ / ਭਰਪੂਰ ਮੱਛੀ',
        coordinatorVoice: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਕਪਤਾਨ! ਸਮੁੰਦਰ ਸ਼ਾਂਤ ਹੈ ਅਤੇ ਮੱਛੀਆਂ ਬਹੁਤ ਹਨ। ਤੁਸੀਂ ਸਫ਼ਰ ਸ਼ੁਰੂ ਕਰ ਸਕਦੇ ਹੋ।'
      },
      ur: {
        headline: 'ماہی گیری کا بہترین دن: سمندری سفر کی اجازت',
        advisory: 'صاف مطلع، پرسکون لہریں اور 14 ناٹیکل میل کے فاصلے پر مچھلیوں کے بڑے غول۔ ماہی گیری کے لیے سازگار دن۔',
        decisionVerdict: 'سفر محفوظ / وافر شکار کے امکانات',
        coordinatorVoice: 'صبح بخیر کپتان! سمندر انتہائی پرسکون ہے اور مچھلی کا شکار وافر ہے۔ آپ سفر پر روانہ ہو سکتے ہیں۔'
      }
    }
  }
];

// ============================================================================
// SIMULATION RUNTIME STATE & EXPORTS
// ============================================================================

let currentSimulationIndex = 0;

/**
 * Builds a full OrcaReport object from a raw scenario template.
 */
function buildOrcaReportFromTemplate(
  template: RawScenarioTemplate,
  targetArea?: string
): OrcaReport {
  const now = new Date();
  const timestampIso = now.toISOString();
  const area = targetArea && targetArea.trim().length > 0 ? targetArea : template.defaultArea;

  return {
    id: `orca-sim-${template.scenarioId}-${Date.now()}`,
    scenarioId: template.scenarioId,
    scenarioTitle: template.scenarioTitle,
    targetArea: area,
    timestamp: timestampIso,
    overallRiskLevel: template.overallRiskLevel,
    canSail: template.canSail,
    safetyScore: template.safetyScore,
    agents: {
      coordinator: {
        agentName: 'Coordinator Agent',
        status: template.coordinator.status,
        routingInstruction: template.coordinator.routingInstruction,
        synthesisSummary: template.coordinator.synthesisSummary,
        recommendedAction: template.coordinator.recommendedAction,
        timestamp: timestampIso
      },
      oceanAgent: {
        agentName: 'Ocean Agent',
        sstCelsius: template.oceanAgent.sstCelsius,
        chlorophyllDensity: template.oceanAgent.chlorophyllDensity,
        thermoclineDepthMeters: template.oceanAgent.thermoclineDepthMeters,
        oceanCurrentKnots: template.oceanAgent.oceanCurrentKnots,
        findings: template.oceanAgent.findings,
        pfzOpportunityScore: template.oceanAgent.pfzOpportunityScore,
        timestamp: timestampIso
      },
      weatherAgent: {
        agentName: 'Weather Agent',
        windSpeedKnots: template.weatherAgent.windSpeedKnots,
        barometricPressureHpa: template.weatherAgent.barometricPressureHpa,
        waveHeightMeters: template.weatherAgent.waveHeightMeters,
        gustSpeedKnots: template.weatherAgent.gustSpeedKnots,
        visibilityKm: template.weatherAgent.visibilityKm,
        findings: template.weatherAgent.findings,
        severityLevel: template.weatherAgent.severityLevel,
        timestamp: timestampIso
      },
      hazardAgent: {
        agentName: 'Hazard / Border Agent',
        borderProximityKm: template.hazardAgent.borderProximityKm,
        borderName: template.hazardAgent.borderName,
        activeHazardType: template.hazardAgent.activeHazardType,
        hazardStatusLog: template.hazardAgent.hazardStatusLog,
        isInsideBufferZone: template.hazardAgent.isInsideBufferZone,
        alertDirective: template.hazardAgent.alertDirective,
        timestamp: timestampIso
      }
    },
    translations: template.translations
  };
}

/**
 * Main initialization & cycle function:
 * Sequentially cycles between the 4 realistic coastal scenarios (or keeps state rolling).
 * 
 * @param currentArea Optional custom coastal region name (e.g., "Mangaluru", "Veraval", "Rameswaram")
 * @returns Structured JSON OrcaReport containing logs for all 4 agents & multilingual strings.
 */
export function getNextOrcaReport(currentArea?: string): OrcaReport {
  const template = ORCA_SCENARIO_TEMPLATES[currentSimulationIndex];
  // Advance cycle pointer
  currentSimulationIndex = (currentSimulationIndex + 1) % ORCA_SCENARIO_TEMPLATES.length;
  return buildOrcaReportFromTemplate(template, currentArea);
}

/**
 * Get a specific scenario report by its ID or index.
 */
export function getOrcaReportByScenario(
  scenarioIdentifier: OrcaScenarioId | number,
  currentArea?: string
): OrcaReport {
  let template: RawScenarioTemplate;

  if (typeof scenarioIdentifier === 'number') {
    const idx = Math.abs(scenarioIdentifier) % ORCA_SCENARIO_TEMPLATES.length;
    template = ORCA_SCENARIO_TEMPLATES[idx];
  } else {
    const found = ORCA_SCENARIO_TEMPLATES.find(s => s.scenarioId === scenarioIdentifier);
    template = found || ORCA_SCENARIO_TEMPLATES[0];
  }

  return buildOrcaReportFromTemplate(template, currentArea);
}

/**
 * Get a random scenario report.
 */
export function getRandomOrcaReport(currentArea?: string): OrcaReport {
  const randomIndex = Math.floor(Math.random() * ORCA_SCENARIO_TEMPLATES.length);
  return buildOrcaReportFromTemplate(ORCA_SCENARIO_TEMPLATES[randomIndex], currentArea);
}

/**
 * Returns all 4 scenarios as full reports for testing or batch inspection.
 */
export function getAllOrcaScenarios(currentArea?: string): OrcaReport[] {
  return ORCA_SCENARIO_TEMPLATES.map(t => buildOrcaReportFromTemplate(t, currentArea));
}

/**
 * Resets the sequential scenario cycle counter back to 0.
 */
export function resetOrcaSimulationCycle(): void {
  currentSimulationIndex = 0;
}

/**
 * Sets the active simulation index explicitly (0 to 3).
 */
export function setOrcaSimulationIndex(index: number): void {
  currentSimulationIndex = Math.max(0, Math.min(index, ORCA_SCENARIO_TEMPLATES.length - 1));
}

/**
 * Helper to retrieve localized UI strings for an OrcaReport in any language with graceful English fallback.
 */
export function getOrcaLocalizedText(
  report: OrcaReport,
  languageCode: string = 'en'
): LocalizedScenarioText {
  const norm = languageCode === 'or' ? 'od' : languageCode.toLowerCase();
  return report.translations[norm] || report.translations['en'];
}
