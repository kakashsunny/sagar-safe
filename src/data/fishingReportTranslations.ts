export interface FishingReportTranslations {
  reportTitle: string;
  portHarbourLabel: string;
  scenarioSafe: string;
  scenarioCaution: string;
  scenarioStorm: string;
  question: string;
  verdictGo: string;
  verdictGoSubtitle: string;
  verdictCaution: string;
  verdictCautionSubtitle: string;
  verdictStop: string;
  verdictStopSubtitle: string;
  aiEngineTitle: string;
  aiEngineSub: string;

  // 6 Metric labels
  recAreaLabel: string;
  fishAvailLabel: string;
  wavesLabel: string;
  windLabel: string;
  rainLabel: string;
  cycloneRiskLabel: string;

  // Metric values
  recAreaSafeFormat: (portName: string, distanceKm: number, zoneName: string) => string;
  recAreaCaution: (portName: string) => string;
  recAreaDanger: string;
  viewOnMap: string;

  fishHigh: string;
  fishModerate: string;
  fishUnsafe: string;

  waveSafe: string;
  waveModerate: string;
  waveHigh: string;
  waveGentleSwells: string;
  waveChoppySea: string;
  waveRoughSwell: string;

  windCalm: string;
  windModerate: string;
  windStrong: string;
  windCalmBreeze: string;
  windBreezy: string;
  windSqualls: string;

  rainLow: string;
  rainShowers: string;
  rainHeavy: string;
  rainClearDesc: string;
  rainDrizzleDesc: string;
  rainSquallDesc: string;

  cycloneNone: string;
  cycloneWatch: string;
  cycloneHigh: string;
  cycloneNoneDesc: string;
  cycloneWatchDesc: string;
  cycloneHighDesc: string;

  // Bottom Bar
  bestTimeLabel: string;
  bestTimeSafe: string;
  bestTimeCaution: string;
  bestTimeDanger: string;

  expectedCatchLabel: string;
  catchGood: string;
  catchModerate: string;
  catchNone: string;

  reasonLabel: string;
  reasonSafe: string;
  reasonCaution: string;
  reasonDanger: string;

  simpleAdviceLabel: string;
  adviceSafe: string;
  adviceCaution: string;
  adviceDanger: string;

  audioListen: string;
  audioStop: string;
  changePort: string;
  updatedLive: string;
}

export const FISHING_REPORT_I18N: Record<string, FishingReportTranslations> = {
  en: {
    reportTitle: "Today’s Fishing Report",
    portHarbourLabel: "Port & Harbour:",
    scenarioSafe: "Safe",
    scenarioCaution: "Caution",
    scenarioStorm: "Storm",
    question: "Can I go fishing today?",
    verdictGo: "GO 🎣",
    verdictGoSubtitle: "✅ YES — Good conditions",
    verdictCaution: "GO WITH CAUTION ⚠️",
    verdictCautionSubtitle: "⚠️ Nearshore only — Return early",
    verdictStop: "DON’T GO 🚫",
    verdictStopSubtitle: "🚫 Fishing not recommended today",
    aiEngineTitle: "AI MULTI-AGENT DECISION ENGINE",
    aiEngineSub: "Synthesized ISRO Oceansat-3, INCOIS wave rider & IMD radar data.",

    recAreaLabel: "RECOMMENDED AREA",
    fishAvailLabel: "FISH AVAILABILITY",
    wavesLabel: "WAVES",
    windLabel: "WIND",
    rainLabel: "RAIN",
    cycloneRiskLabel: "CYCLONE RISK",

    recAreaSafeFormat: (port, km, zone) => `${km} km from ${port} (${zone})`,
    recAreaCaution: (port) => `Nearshore within 5–8 km from ${port}`,
    recAreaDanger: "None — Stay anchored in harbour",
    viewOnMap: "View coordinates on Map ↗",

    fishHigh: "High",
    fishModerate: "Moderate",
    fishUnsafe: "Unsafe to fish",

    waveSafe: "Safe",
    waveModerate: "Moderate",
    waveHigh: "High waves",
    waveGentleSwells: "gentle swells",
    waveChoppySea: "choppy sea",
    waveRoughSwell: "rough swell",

    windCalm: "Calm / Gentle",
    windModerate: "Moderate",
    windStrong: "Strong winds",
    windCalmBreeze: "calm breeze",
    windBreezy: "breezy",
    windSqualls: "squalls",

    rainLow: "Low chance",
    rainShowers: "Passing showers",
    rainHeavy: "Heavy rain expected",
    rainClearDesc: "Partly Cloudy with Coastal Breeze",
    rainDrizzleDesc: "Passing coastal drizzle",
    rainSquallDesc: "Heavy rain / zero visibility",

    cycloneNone: "None",
    cycloneWatch: "None (Depression watch)",
    cycloneHigh: "High / Storm Alert",
    cycloneNoneDesc: "No low pressure disturbance",
    cycloneWatchDesc: "Low pressure depression monitor",
    cycloneHighDesc: "Severe depression & squalls",

    bestTimeLabel: "Best time:",
    bestTimeSafe: "5:30 AM – 11:00 AM",
    bestTimeCaution: "6:00 AM – 9:30 AM (Return before noon)",
    bestTimeDanger: "Harbour stay only",

    expectedCatchLabel: "Expected catch:",
    catchGood: "Good",
    catchModerate: "Moderate",
    catchNone: "None (Unsafe)",

    reasonLabel: "Reason:",
    reasonSafe: "Safe sea conditions, low wave swells, gentle winds, and strong fish availability near the coastal shelf.",
    reasonCaution: "Moderate swells and afternoon gusts outside the coastal shelf. Deep sea navigation not advised.",
    reasonDanger: "Unsafe sea conditions. Rough waves, strong squally winds, and storm warning in force.",

    simpleAdviceLabel: "SIMPLE ADVICE:",
    adviceSafe: "“Today is a good day for fishing. Start early and fish around the recommended area.”",
    adviceCaution: "“You can fish close to shore, but avoid deep sea. Keep radio on and return before afternoon winds pick up.”",
    adviceDanger: "“Avoid fishing today. Sea conditions are dangerous. Try again tomorrow.”",

    audioListen: "Listen Advice",
    audioStop: "Stop Audio",
    changePort: "Change Port",
    updatedLive: "Updated Live"
  },

  hi: {
    reportTitle: "आज की मत्स्य पालन रिपोर्ट",
    portHarbourLabel: "बंदरगाह और हार्बर:",
    scenarioSafe: "सुरक्षित",
    scenarioCaution: "सावधानी",
    scenarioStorm: "तूफान",
    question: "क्या मैं आज मछली पकड़ने जा सकता हूँ?",
    verdictGo: "जाएं 🎣",
    verdictGoSubtitle: "✅ हाँ — अनुकूल समुद्री स्थिति",
    verdictCaution: "सावधानी से जाएं ⚠️",
    verdictCautionSubtitle: "⚠️ केवल तट के पास — जल्दी लौटें",
    verdictStop: "मत जाएं 🚫",
    verdictStopSubtitle: "🚫 आज मछली पकड़ने की सलाह नहीं है",
    aiEngineTitle: "एआई मल्टी-एजेंट निर्णय प्रणाली",
    aiEngineSub: "इसरो Oceansat-3, INCOIS तरंग राइडर व IMD मौसम रडार से संश्लेषित।",

    recAreaLabel: "अनुशंसित क्षेत्र",
    fishAvailLabel: "मछली की उपलब्धता",
    wavesLabel: "लहरें",
    windLabel: "हवा",
    rainLabel: "बारिश",
    cycloneRiskLabel: "चक्रवात जोखिम",

    recAreaSafeFormat: (port, km, zone) => `${port} से ${km} किमी (${zone})`,
    recAreaCaution: (port) => `${port} से 5–8 किमी तट के पास`,
    recAreaDanger: "कोई नहीं — बंदरगाह में लंगर डाले रहें",
    viewOnMap: "मानचित्र पर निर्देशांक देखें ↗",

    fishHigh: "उच्च (प्रचुर)",
    fishModerate: "मध्यम",
    fishUnsafe: "मछली पकड़ना असुरक्षित",

    waveSafe: "सुरक्षित",
    waveModerate: "मध्यम",
    waveHigh: "ऊंची लहरें",
    waveGentleSwells: "शांत लहरें",
    waveChoppySea: "लहरदार समुद्र",
    waveRoughSwell: "अशांत ऊंची लहरें",

    windCalm: "शांत / सामान्य",
    windModerate: "मध्यम",
    windStrong: "तेज हवाएं",
    windCalmBreeze: "शांत हवा",
    windBreezy: "मध्यम हवा",
    windSqualls: "तेज तूफानी हवाएं",

    rainLow: "कम संभावना",
    rainShowers: "हल्की फुहारें",
    rainHeavy: "भारी बारिश की संभावना",
    rainClearDesc: "आंशिक बादल व तटीय हवा",
    rainDrizzleDesc: "तटीय हल्की बूंदाबांदी",
    rainSquallDesc: "भारी बारिश व शून्य दृश्यता",

    cycloneNone: "कोई नहीं",
    cycloneWatch: "कोई नहीं (अवसाद निगरानी)",
    cycloneHigh: "उच्च / तूफान अलर्ट",
    cycloneNoneDesc: "कोई चक्रवाती विक्षोभ नहीं",
    cycloneWatchDesc: "निम्न दबाव प्रणाली पर निगरानी",
    cycloneHighDesc: "गंभीर अवसाद व चक्रवाती आंधी",

    bestTimeLabel: "सर्वोत्तम समय:",
    bestTimeSafe: "सुबह 5:30 – 11:00",
    bestTimeCaution: "सुबह 6:00 – 9:30 (दोपहर से पहले लौटें)",
    bestTimeDanger: "केवल बंदरगाह पर रहें",

    expectedCatchLabel: "अपेक्षित पकड़:",
    catchGood: "अच्छी पकड़",
    catchModerate: "मध्यम",
    catchNone: "शून्य (असुरक्षित)",

    reasonLabel: "कारण:",
    reasonSafe: "सुरक्षित समुद्री स्थिति, शांत लहरें, हल्की हवाएं और तटीय शेल्फ के पास प्रचुर मात्रा में मछलियों की उपलब्धता।",
    reasonCaution: "तटीय शेल्फ के बाहर मध्यम लहरें और दोपहर की तेज हवाएं। गहरे समुद्र में जाने की सलाह नहीं है।",
    reasonDanger: "असुरक्षित समुद्री स्थिति। अशांत लहरें, तेज तूफानी हवाएं और तूफान की चेतावनी प्रभावी है।",

    simpleAdviceLabel: "सरल सलाह:",
    adviceSafe: "“आज मछली पकड़ने के लिए अच्छा दिन है। जल्दी शुरू करें और अनुशंसित क्षेत्र में ही मछली पकड़ें।”",
    adviceCaution: "“आप तट के पास मछली पकड़ सकते हैं, लेकिन गहरे समुद्र में न जाएं। रेडियो चालू रखें और दोपहर की हवाएं तेज होने से पहले लौटें।”",
    adviceDanger: "“आज मछली पकड़ने से बचें। समुद्र की स्थिति खतरनाक है। कल पुनः प्रयास करें।”",

    audioListen: "सलाह सुनें",
    audioStop: "आवाज रोकें",
    changePort: "बंदरगाह बदलें",
    updatedLive: "लाइव अपडेटेड"
  },

  ta: {
    reportTitle: "இன்றைய மீன்பிடி அறிக்கை",
    portHarbourLabel: "துறைமுகம்:",
    scenarioSafe: "பாதுகாப்பானது",
    scenarioCaution: "எச்சரிக்கை",
    scenarioStorm: "புயல்",
    question: "நான் இன்று மீன்பிடிக்க செல்லலாமா?",
    verdictGo: "செல்லலாம் 🎣",
    verdictGoSubtitle: "✅ ஆம் — நல்ல சாதகமான சூழல்",
    verdictCaution: "எச்சரிக்கையுடன் செல்லவும் ⚠️",
    verdictCautionSubtitle: "⚠️ கரைக்கு அருகில் மட்டும் — விரைவில் திரும்பவும்",
    verdictStop: "செல்ல வேண்டாம் 🚫",
    verdictStopSubtitle: "🚫 இன்று மீன்பிடிக்க பரிந்துரைக்கப்படவில்லை",
    aiEngineTitle: "AI பல-முகவர் முடிவு இயந்திரம்",
    aiEngineSub: "ISRO Oceansat-3, INCOIS அலை அளவீடு மற்றும் IMD ரேடார் தரவு தொகுப்பு.",

    recAreaLabel: "பரிந்துரைக்கப்பட்ட பகுதி",
    fishAvailLabel: "மீன் இருப்பு",
    wavesLabel: "அலைகள்",
    windLabel: "காற்று",
    rainLabel: "மழை",
    cycloneRiskLabel: "புயல் அபாயம்",

    recAreaSafeFormat: (port, km, zone) => `${port} இலிருந்து ${km} கி.மீ (${zone})`,
    recAreaCaution: (port) => `${port} இலிருந்து கரைக்கு அருகில் 5–8 கி.மீ`,
    recAreaDanger: "எதுவுமில்லை — துறைமுகத்தில் நங்கூரமிட்டு இருக்கவும்",
    viewOnMap: "வரைபடத்தில் காண்க ↗",

    fishHigh: "அதிகம் (நிறைய)",
    fishModerate: "மிதமான",
    fishUnsafe: "மீன்பிடிக்க பாதுகாப்பற்றது",

    waveSafe: "பாதுகாப்பானது",
    waveModerate: "மிதமான",
    waveHigh: "உயர்ந்த அலைகள்",
    waveGentleSwells: "மெதுவான அலைகள்",
    waveChoppySea: "கொந்தளிப்பான கடல்",
    waveRoughSwell: "சீற்றமான அலைகள்",

    windCalm: "தென்றல் காற்று",
    windModerate: "மிதமான",
    windStrong: "பலத்த காற்று",
    windCalmBreeze: "மெதுவான தென்றல்",
    windBreezy: "காற்றோட்டமான",
    windSqualls: "சூறாவளி காற்று",

    rainLow: "குறைந்த வாய்ப்பு",
    rainShowers: "சிறு தூறல்",
    rainHeavy: "கனமழை எதிர்பார்க்கப்படுகிறது",
    rainClearDesc: "லேசான மேகம் மற்றும் கடலோர காற்று",
    rainDrizzleDesc: "கடலோர சிறு தூறல்",
    rainSquallDesc: "கனமழை மற்றும் பூஜ்ஜிய பார்வை",

    cycloneNone: "எதுவுமில்லை",
    cycloneWatch: "இல்லை (காற்றழுத்த தாழ்வு கண்காணிப்பு)",
    cycloneHigh: "அதிகம் / புயல் எச்சரிக்கை",
    cycloneNoneDesc: "குறைந்த காற்றழுத்த தாழ்வு இல்லை",
    cycloneWatchDesc: "காற்றழுத்த தாழ்வு மண்டல கண்காணிப்பு",
    cycloneHighDesc: "தீவிர காற்றழுத்த தாழ்வு மண்டலம் மற்றும் சூறாவளி",

    bestTimeLabel: "சிறந்த நேரம்:",
    bestTimeSafe: "காலை 5:30 – 11:00",
    bestTimeCaution: "காலை 6:00 – 9:30 (நண்பகலுக்குள் திரும்பவும்)",
    bestTimeDanger: "துறைமுகத்தில் மட்டுமே இருக்கவும்",

    expectedCatchLabel: "எதிர்பார்க்கப்படும் மீன் பிடிப்பு:",
    catchGood: "நல்ல பிடிப்பு",
    catchModerate: "மிதமான",
    catchNone: "இல்லை (பாதுகாப்பற்றது)",

    reasonLabel: "காரணம்:",
    reasonSafe: "பாதுகாப்பான கடல் சூழல், குறைந்த அலைகள், மென்மையான காற்று மற்றும் தட்டையான கரையில் அதிக மீன் வளம்.",
    reasonCaution: "கடலோர பகுதிக்கு வெளியே மிதமான அலைகள் மற்றும் மதியக் காற்று. ஆழ்கடல் பயணம் நல்லதல்ல.",
    reasonDanger: "பாதுகாப்பற்ற கடல் நிலை. சீற்றமான அலைகள், பலத்த காற்று மற்றும் புயல் எச்சரிக்கை அமலில் உள்ளது.",

    simpleAdviceLabel: "எளிய ஆலோசனை:",
    adviceSafe: "“இன்று மீன்பிடிக்க நல்ல நாள். காலையிலேயே புறப்பட்டு பரிந்துரைக்கப்பட்ட பகுதியில் மீன்பிடிக்கவும்.”",
    adviceCaution: "“கரைக்கு அருகில் மீன்பிடிக்கலாம், ஆழ்கடலுக்கு செல்ல வேண்டாம். வானொலியை ஆன் செய்து மதியக் காற்றுக்கு முன் திரும்பவும்.”",
    adviceDanger: "“இன்று மீன்பிடிப்பதை தவிர்க்கவும். கடல் மிகவும் ஆபத்தாக உள்ளது. நாளை முயற்சிக்கவும்.”",

    audioListen: "ஆலோசனை கேட்க",
    audioStop: "ஒலியை நிறுத்த",
    changePort: "துறைமுகம் மாற்ற",
    updatedLive: "நேரலை புதுப்பிப்பு"
  },

  te: {
    reportTitle: "నేటి చేపల వేట నివేదిక",
    portHarbourLabel: "ఓడరేవు & హార్బర్:",
    scenarioSafe: "సురక్షితం",
    scenarioCaution: "హెచ్చరిక",
    scenarioStorm: "తుఫాను",
    question: "నేను ఈ రోజు చేపల వేటకు వెళ్ళవచ్చా?",
    verdictGo: "వెళ్ళండి 🎣",
    verdictGoSubtitle: "✅ అవును — అనుకూల పరిస్థితులు",
    verdictCaution: "హెచ్చరికతో వెళ్ళండి ⚠️",
    verdictCautionSubtitle: "⚠️ తీరానికి సమీపంలో మాత్రమే — త్వరగా రండి",
    verdictStop: "వెళ్ళవద్దు 🚫",
    verdictStopSubtitle: "🚫 ఈ రోజు చేపల వేట సిఫార్సు చేయబడలేదు",
    aiEngineTitle: "AI బహుళ-ఏజెంట్ నిర్ణయ వ్యవస్థ",
    aiEngineSub: "ISRO Oceansat-3, INCOIS తరంగ డేటా మరియు IMD రాడార్ విశ్లేషణ.",

    recAreaLabel: "సిఫార్సు చేసిన ప్రాంతం",
    fishAvailLabel: "చేపల లభ్యత",
    wavesLabel: "తరంగాలు",
    windLabel: "గాలి",
    rainLabel: "వర్షం",
    cycloneRiskLabel: "తుఫాను ముప్పు",

    recAreaSafeFormat: (port, km, zone) => `${port} నుండి ${km} కి.మీ (${zone})`,
    recAreaCaution: (port) => `${port} నుండి తీరానికి సమీపంలో 5–8 కి.మీ`,
    recAreaDanger: "ఏదీ లేదు — హార్బర్‌లోనే ఉండండి",
    viewOnMap: "మ్యాప్‌లో చూడండి ↗",

    fishHigh: "అధికం",
    fishModerate: "మితం",
    fishUnsafe: "చేపల వేట సురక్షితం కాదు",

    waveSafe: "సురక్షితం",
    waveModerate: "మితం",
    waveHigh: "భారీ అలలు",
    waveGentleSwells: "శాంత అలలు",
    waveChoppySea: "కల్లోల అలలు",
    waveRoughSwell: "తీవ్రమైన అలలు",

    windCalm: "ప్రశాంత గాలి",
    windModerate: "మితమైన గాలి",
    windStrong: "తీవ్రమైన గాలులు",
    windCalmBreeze: "మందమారుతం",
    windBreezy: "గాలితో కూడిన",
    windSqualls: "తుఫాను గాలులు",

    rainLow: "తక్కువ అవకాశం",
    rainShowers: "చిరుజల్లులు",
    rainHeavy: "భారీ వర్ష సూచన",
    rainClearDesc: "పాక్షిక మేఘావృతం & తీర గాలి",
    rainDrizzleDesc: "తీరప్రాంత చిరుజల్లులు",
    rainSquallDesc: "భారీ వర్షం & దృశ్యమానత లోపం",

    cycloneNone: "ఏమీ లేదు",
    cycloneWatch: "లేదు (వాయుగుండం నిఘా)",
    cycloneHigh: "అధికం / తుఫాను హెచ్చరిక",
    cycloneNoneDesc: "వాయుగుండం లేదు",
    cycloneWatchDesc: "అల్పపీడన పర్యవేక్షణ",
    cycloneHighDesc: "తీవ్ర వాయుగుండం & ఈదురు గాలులు",

    bestTimeLabel: "ఉత్తమ సమయం:",
    bestTimeSafe: "ఉదయం 5:30 – 11:00",
    bestTimeCaution: "ఉదయం 6:00 – 9:30 (మధ్యాహ్నానికి ముందే రండి)",
    bestTimeDanger: "హార్బర్‌లోనే ఉండండి",

    expectedCatchLabel: "లభించే చేపలు:",
    catchGood: "బాగుంటుంది",
    catchModerate: "మితం",
    catchNone: "ఏమీ లభించదు (ప్రమాదం)",

    reasonLabel: "కారణం:",
    reasonSafe: "సురక్షిత సముద్రం, తక్కువ ఎత్తు అలలు, ప్రశాంత గాలులు మరియు విస్తారమైన చేపల లభ్యత.",
    reasonCaution: "తీరానికి వెలుపల మితమైన అలలు మరియు మధ్యాహ్నపు గాలులు. లోతైన సముద్ర ప్రయాణం మంచిది కాదు.",
    reasonDanger: "ప్రమాదకర సముద్ర పరిస్థితులు. ఉవ్వెత్తున ఎగసిపడే అలలు, పెనుగాలులు మరియు తుఫాను హెచ్చరిక.",

    simpleAdviceLabel: "సులభమైన సలహా:",
    adviceSafe: "“ఈ రోజు చేపల వేటకు అనుకూలమైన రోజు. త్వరగా బయలుదేరి సిఫార్సు చేసిన ప్రాంతంలో చేపలు పట్టండి.”",
    adviceCaution: "“తీరానికి దగ్గరగా వేటాడవచ్చు, లోతైన సముద్రంలోకి వెళ్లవద్దు. రేడియో ఆన్‌లో ఉంచి మధ్యాహ్నం ముందే రండి.”",
    adviceDanger: "“ఈ రోజు చేపల వేట మానుకోండి. సముద్ర పరిస్థితులు ప్రమాదకరంగా ఉన్నాయి. రేపు ప్రయత్నించండి.”",

    audioListen: "సలహా వినండి",
    audioStop: "ఆపండి",
    changePort: "ఓడరేవు మార్చండి",
    updatedLive: "లైవ్ అప్‌డేట్"
  },

  kn: {
    reportTitle: "ಇಂದಿನ ಮೀನುಗಾರಿಕೆ ವರದಿ",
    portHarbourLabel: "ಬಂದರು ಮತ್ತು ಹಾರ್ಬರ್:",
    scenarioSafe: "ಸುರಕ್ಷಿತ",
    scenarioCaution: "ಎಚ್ಚರಿಕೆ",
    scenarioStorm: "ಬಿರುಗಾಳಿ",
    question: "ನಾನು ಇಂದು ಮೀನುಗಾರಿಕೆಗೆ ಹೋಗಬಹುದೇ?",
    verdictGo: "ಹೋಗಿ 🎣",
    verdictGoSubtitle: "✅ ಹೌದು — ಉತ್ತಮ ಪರಿಸ್ಥಿತಿಗಳು",
    verdictCaution: "ಎಚ್ಚರಿಕೆಯಿಂದ ಹೋಗಿ ⚠️",
    verdictCautionSubtitle: "⚠️ ತೀರದ ಹತ್ತಿರ ಮಾತ್ರ — ಬೇಗ ಹಿಂತಿರುಗಿ",
    verdictStop: "ಹೋಗಬೇಡಿ 🚫",
    verdictStopSubtitle: "🚫 ಇಂದು ಮೀನುಗಾರಿಕೆಗೆ ಶಿಫಾರಸು ಮಾಡುವುದಿಲ್ಲ",
    aiEngineTitle: "AI ಬಹು-ಏಜೆಂಟ್ ನಿರ್ಧಾರ ಎಂಜಿನ್",
    aiEngineSub: "ISRO Oceansat-3, INCOIS ತರಂಗ ಮತ್ತು IMD ರಾಡಾರ್ ಡೇಟಾ ಸಂಶ್ಲೇಷಣೆ.",

    recAreaLabel: "ಶಿಫಾರಸು ಮಾಡಿದ ಪ್ರದೇಶ",
    fishAvailLabel: "ಮೀನು ಲಭ್ಯತೆ",
    wavesLabel: "ಅಲೆಗಳು",
    windLabel: "ಗಾಳಿ",
    rainLabel: "ಮಳೆ",
    cycloneRiskLabel: "ಚಂಡಮಾರುತದ ಅಪಾಯ",

    recAreaSafeFormat: (port, km, zone) => `${port} ನಿಂದ ${km} ಕಿ.ಮೀ (${zone})`,
    recAreaCaution: (port) => `${port} ತೀರದ ಬಳಿ 5–8 ಕಿ.ಮೀ`,
    recAreaDanger: "ಯಾವುದೂ ಇಲ್ಲ — ಬಂದರಿನಲ್ಲೇ ಇರಿ",
    viewOnMap: "ನಕ್ಷೆಯಲ್ಲಿ ನೋಡಿ ↗",

    fishHigh: "ಹೆಚ್ಚು",
    fishModerate: "ಮಧ್ಯಮ",
    fishUnsafe: "ಮೀನುಗಾರಿಕೆಗೆ ಅಸುರಕ್ಷಿತ",

    waveSafe: "ಸುರಕ್ಷಿತ",
    waveModerate: "ಮಧ್ಯಮ",
    waveHigh: "ಎತ್ತರದ ಅಲೆಗಳು",
    waveGentleSwells: "ಶಾಂತ ಅಲೆಗಳು",
    waveChoppySea: "ಅಸ್ಥಿರ ಅಲೆಗಳು",
    waveRoughSwell: "ಪ್ರಕ್ಷುಬ್ಧ ಅಲೆಗಳು",

    windCalm: "ಶಾಂತ ಗಾಳಿ",
    windModerate: "ಮಧ್ಯಮ ಗಾಳಿ",
    windStrong: "ಬಲವಾದ ಗಾಳಿ",
    windCalmBreeze: "ತಂಗಾಳಿ",
    windBreezy: "ಗಾಳಿ ಬೀಸುವಿಕೆ",
    windSqualls: "ಬಿರುಗಾಳಿ",

    rainLow: "ಕಡಿಮೆ ಸಂಭವನೀಯತೆ",
    rainShowers: "ಸಾಧಾರಣ ಮಳೆ",
    rainHeavy: "ಭಾರೀ ಮಳೆಯ ಮುನ್ಸೂಚನೆ",
    rainClearDesc: "ಭಾಗಶಃ ಮೋಡ ಕವಿದ ವಾತಾವರಣ",
    rainDrizzleDesc: "ಕರಾವಳಿ ತುಂತುರು ಮಳೆ",
    rainSquallDesc: "ಭಾರೀ ಮಳೆ ಮತ್ತು ಮಂಜು ಕವಿದ ವಾತಾವರಣ",

    cycloneNone: "ಯಾವುದೂ ಇಲ್ಲ",
    cycloneWatch: "ಇಲ್ಲ (ವಾಯುಭಾರ ಕುಸಿತ ವೀಕ್ಷಣೆ)",
    cycloneHigh: "ಹೆಚ್ಚು / ಬಿರುಗಾಳಿ ಎಚ್ಚರಿಕೆ",
    cycloneNoneDesc: "ಯಾವುದೇ ಅಡಚಣೆ ಇಲ್ಲ",
    cycloneWatchDesc: "ಕಡಿಮೆ ಒತ್ತಡದ ನಿಗಾ",
    cycloneHighDesc: "ತೀವ್ರ ವಾಯುಭಾರ ಕುಸಿತ",

    bestTimeLabel: "ಉತ್ತಮ ಸಮಯ:",
    bestTimeSafe: "ಬೆಳಗ್ಗೆ 5:30 – 11:00",
    bestTimeCaution: "ಬೆಳಗ್ಗೆ 6:00 – 9:30 (ಮಧ್ಯಾಹ್ನದ ಮುನ್ನ ಹಿಂತಿರುಗಿ)",
    bestTimeDanger: "ಬಂದರಿನಲ್ಲೇ ಇರಿ",

    expectedCatchLabel: "ನಿರೀಕ್ಷಿತ ಹಿಡುವಳಿ:",
    catchGood: "ಉತ್ತಮ ಹಿಡುವಳಿ",
    catchModerate: "ಮಧ್ಯಮ",
    catchNone: "ಯಾವುದೂ ಇಲ್ಲ (ಅಸುರಕ್ಷಿತ)",

    reasonLabel: "ಕಾರಣ:",
    reasonSafe: "ಸುರಕ್ಷಿತ ಸಮುದ್ರ ಪರಿಸ್ಥಿತಿ, ಕಡಿಮೆ ಅಲೆಗಳು, ಶಾಂತ ಗಾಳಿ ಮತ್ತು ತೀರದ ಬಳಿ ಸಮೃದ್ಧ ಮೀನಿನ ಲಭ್ಯತೆ.",
    reasonCaution: "ಕರಾವಳಿ ಪ್ರದೇಶದ ಹೊರಗೆ ಮಧ್ಯಮ ಅಲೆಗಳು ಮತ್ತು ಗಾಳಿ. ಆಳ ಸಮುದ್ರ ಸಂಚಾರ ಸೂಕ್ತವಲ್ಲ.",
    reasonDanger: "ಅಸುರಕ್ಷಿತ ಸಮುದ್ರ ಪರಿಸ್ಥಿತಿ. ಪ್ರಕ್ಷುಬ್ಧ ಅಲೆಗಳು, ಬಿರುಗಾಳಿ ಮತ್ತು ಚಂಡಮಾರುತದ ಎಚ್ಚರಿಕೆ ಜಾರಿಯಲ್ಲಿದೆ.",

    simpleAdviceLabel: "ಸರಳ ಸಲಹೆ:",
    adviceSafe: "“ಇಂದು ಮೀನುಗಾರಿಕೆಗೆ ಉತ್ತಮ ದಿನ. ಮುಂಜಾನೆಯೇ ಹೊರಟು ಶಿಫಾರಸು ಮಾಡಿದ ಪ್ರದೇಶದಲ್ಲಿ ಮೀನುಗಾರಿಕೆ ನಡೆಸಿ.”",
    adviceCaution: "“ದಡದ ಹತ್ತಿರ ಮೀನು ಹಿಡಿಯಬಹುದು, ಆಳ ಸಮುದ್ರಕ್ಕೆ ಹೋಗಬೇಡಿ. ರೇಡಿಯೋ ಆನ್‌ನಲ್ಲಿರಲಿ, ಮಧ್ಯಾಹ್ನಕ್ಕೆ ಮುನ್ನ ಹಿಂತಿರುಗಿ.”",
    adviceDanger: "“ಇಂದು ಮೀನುಗಾರಿಕೆಯಿಂದ ದೂರವಿರಿ. ಸಮುದ್ರ ಪರಿಸ್ಥಿತಿ ಅಪಾಯಕಾರಿಯಾಗಿದೆ. ನಾಳೆ ಪ್ರಯತ್ನಿಸಿ.”",

    audioListen: "ಸಲಹೆ ಆಲಿಸಿ",
    audioStop: "ನಿಲ್ಲಿಸಿ",
    changePort: "ಬಂದರು ಬದಲಾಯಿಸಿ",
    updatedLive: "ನೇರ ಅಪ್‌ಡೇಟ್"
  },

  ml: {
    reportTitle: "ഇന്നത്തെ മത്സ്യബന്ധന റിപ്പോർട്ട്",
    portHarbourLabel: "തുറമുഖം:",
    scenarioSafe: "സുരക്ഷിതം",
    scenarioCaution: "ജാഗ്രത",
    scenarioStorm: "കൊടുങ്കാറ്റ്",
    question: "എനിക്ക് ഇന്ന് മീൻപിടിക്കാൻ പോകാമോ?",
    verdictGo: "പോകാം 🎣",
    verdictGoSubtitle: "✅ അതെ — അനുകൂല സാഹചര്യം",
    verdictCaution: "ജാഗ്രതയോടെ പോകുക ⚠️",
    verdictCautionSubtitle: "⚠️ തീരത്തിനടുത്ത് മാത്രം — നേരത്തെ മടങ്ങുക",
    verdictStop: "പോകരുത് 🚫",
    verdictStopSubtitle: "🚫 ഇന്ന് മീൻപിടുത്തം ശുപാർശ ചെയ്യുന്നില്ല",
    aiEngineTitle: "AI മൾട്ടി-ഏജന്റ് ഡിസിഷൻ എഞ്ചിൻ",
    aiEngineSub: "ISRO Oceansat-3, INCOIS വേവ് റൈഡർ, IMD റഡാർ ഡാറ്റ സംയോജനം.",

    recAreaLabel: "ശുപാർശ ചെയ്ത മേഖല",
    fishAvailLabel: "മത്സ്യ ലഭ്യത",
    wavesLabel: "തിരമാലകൾ",
    windLabel: "കാറ്റ്",
    rainLabel: "മഴ",
    cycloneRiskLabel: "ചുഴലിക്കാറ്റ് ഭീഷണി",

    recAreaSafeFormat: (port, km, zone) => `${port}-ൽ നിന്ന് ${km} കി.മീ (${zone})`,
    recAreaCaution: (port) => `${port} തീരത്തിനടുത്ത് 5–8 കി.മീ`,
    recAreaDanger: "ഒന്നുമില്ല — തുറമുഖത്ത് തുടരുക",
    viewOnMap: "മാപ്പിൽ കാണുക ↗",

    fishHigh: "കൂടുതൽ (നല്ല ലഭ്യത)",
    fishModerate: "സാധാരണ",
    fishUnsafe: "സുരക്ഷിതമല്ല",

    waveSafe: "സുരക്ഷിതം",
    waveModerate: "മിതമായ",
    waveHigh: "ഉയർന്ന തിരമാലകൾ",
    waveGentleSwells: "ശാന്തമായ തിരകൾ",
    waveChoppySea: "ഇളകിമറിയുന്ന കടൽ",
    waveRoughSwell: "പ്രക്ഷുബ്ധമായ കടൽ",

    windCalm: "ശാന്തമായ കാറ്റ്",
    windModerate: "മിതമായ കാറ്റ്",
    windStrong: "ശക്തമായ കാറ്റ്",
    windCalmBreeze: "മന്ദമാരുതൻ",
    windBreezy: "കാറ്റുള്ള അന്തരീക്ഷം",
    windSqualls: "ചുഴലിക്കാറ്റ്",

    rainLow: "സാധ്യത കുറവ്",
    rainShowers: "ചെറിയ മഴ",
    rainHeavy: "കനത്ത മഴ സാധ്യത",
    rainClearDesc: "ഭാഗികമായി മേഘാവൃതം",
    rainDrizzleDesc: "തീരദേശ ചാറ്റൽമഴ",
    rainSquallDesc: "കനത്ത മഴയും കാഴ്ചക്കുറവും",

    cycloneNone: "ഇല്ല",
    cycloneWatch: "ഇല്ല (ന്യൂനമർദ്ദ നിരീക്ഷണം)",
    cycloneHigh: "ഉയർന്നത് / മുന്നറിയിപ്പ്",
    cycloneNoneDesc: "ന്യൂനമർദ്ദ ഭീഷണിയില്ല",
    cycloneWatchDesc: "ന്യൂനമർദ്ദ മുന്നറിയിപ്പ് നിരീക്ഷണം",
    cycloneHighDesc: "തീവ്ര ന്യൂനമർദ്ദം",

    bestTimeLabel: "അനുയോജ്യമായ സമയം:",
    bestTimeSafe: "രാവിലെ 5:30 – 11:00",
    bestTimeCaution: "രാവിലെ 6:00 – 9:30 (ഉച്ചയ്ക്ക് മുൻപ് മടങ്ങുക)",
    bestTimeDanger: "തുറമുഖത്ത് മാത്രം തുടരുക",

    expectedCatchLabel: "പ്രതീക്ഷിക്കുന്ന ലഭ്യത:",
    catchGood: "നല്ല ലഭ്യത",
    catchModerate: "സാധാരണ",
    catchNone: "ഇല്ല (അപകടകരം)",

    reasonLabel: "കാരണം:",
    reasonSafe: "സുരക്ഷിതമായ കടൽ, ചെറിയ തിരമാലകൾ, ശാന്തമായ കാറ്റ്, ധാരാളം മത്സ്യങ്ങളുടെ സാന്നിധ്യം.",
    reasonCaution: "തീരക്കടലിന് പുറത്ത് മിതമായ തിരമാലകളും ഉച്ചയ്ക്ക് കാറ്റും. ആഴക്കടൽ യാത്ര ശുപാർശ ചെയ്യുന്നില്ല.",
    reasonDanger: "അപകടകരമായ കടൽ. ഉയർന്ന തിരമാലകൾ, ശക്തമായ കാറ്റ്, കൊടുങ്കാറ്റ് മുന്നറിയിപ്പ് നിലവിലുണ്ട്.",

    simpleAdviceLabel: "ലളിതമായ ഉപദേശം:",
    adviceSafe: "“ഇന്ന് മീൻപിടുത്തത്തിന് നല്ല ദിവസമാണ്. നേരത്തെ തുടങ്ങി നിർദ്ദേശിച്ച സ്ഥലത്ത് മീൻപിടിക്കുക.”",
    adviceCaution: "“തീരത്തിനടുത്ത് മീൻപിടിക്കാം, എന്നാൽ ആഴക്കടൽ ഒഴിവാക്കുക. ഉച്ചയ്ക്ക് കാറ്റ് ശക്തമാകുന്നതിന് മുൻപ് മടങ്ങുക.”",
    adviceDanger: "“ഇന്ന് മീൻപിടുത്തം ഒഴിവാക്കുക. കടൽ സ്ഥിതി അതീവ അപകടകരമാണ്. നാളെ ശ്രമിക്കുക.”",

    audioListen: "ഉപദേശം കേൾക്കുക",
    audioStop: "നിർത്തുക",
    changePort: "തുറമുഖം മാറ്റുക",
    updatedLive: "തത്സമയം"
  },

  mr: {
    reportTitle: "आजचा मासेमारी अहवाल",
    portHarbourLabel: "बंदर आणि हार्बर:",
    scenarioSafe: "सुरक्षित",
    scenarioCaution: "सावधगिरी",
    scenarioStorm: "वादळ",
    question: "मी आज मासेमारीला जाऊ शकतो का?",
    verdictGo: "जा 🎣",
    verdictGoSubtitle: "✅ होय — अनुकूल परिस्थिती",
    verdictCaution: "सावधगिरीने जा ⚠️",
    verdictCautionSubtitle: "⚠️ फक्त किनाऱ्याजवळ — लवकर परत या",
    verdictStop: "जाऊ नका 🚫",
    verdictStopSubtitle: "🚫 आज मासेमारी न करण्याचा सल्ला",
    aiEngineTitle: "AI मल्टी-एजंट निर्णय प्रणाली",
    aiEngineSub: "ISRO Oceansat-3, INCOIS वेव्ह रायडर आणि IMD रडार डेटाचे विश्लेषण.",

    recAreaLabel: "शिफारस केलेले क्षेत्र",
    fishAvailLabel: "माशांची उपलब्धता",
    wavesLabel: "लाटा",
    windLabel: "वारा",
    rainLabel: "पाऊस",
    cycloneRiskLabel: "चक्रीवादळ धोका",

    recAreaSafeFormat: (port, km, zone) => `${port} पासून ${km} किमी (${zone})`,
    recAreaCaution: (port) => `${port} किनाऱ्याजवळ 5–8 किमी`,
    recAreaDanger: "काहीही नाही — बंदरातच नांगर टाका",
    viewOnMap: "नकाशावर पहा ↗",

    fishHigh: "भरपूर",
    fishModerate: "मध्यम",
    fishUnsafe: "असुरक्षित",

    waveSafe: "सुरक्षित",
    waveModerate: "मध्यम",
    waveHigh: "उंच लाटा",
    waveGentleSwells: "सौम्य लाटा",
    waveChoppySea: "खवळलेला समुद्र",
    waveRoughSwell: "प्रचंड लाटा",

    windCalm: "शांत वारा",
    windModerate: "मध्यम वारा",
    windStrong: "जोरदार वारा",
    windCalmBreeze: "मंद झुळूक",
    windBreezy: "हवादार",
    windSqualls: "वादळी वारे",

    rainLow: "कमी शक्यता",
    rainShowers: "हलक्या सरी",
    rainHeavy: "मुसळधार पाऊस",
    rainClearDesc: "अंशतः ढगाळ व किनारी वारा",
    rainDrizzleDesc: "किनारी रिमझिम पाऊस",
    rainSquallDesc: "मुसळधार पाऊस व दृश्यमानता शून्य",

    cycloneNone: "काहीही नाही",
    cycloneWatch: "नाही (कमी दाब निरीक्षण)",
    cycloneHigh: "जास्त / वादळ इशारा",
    cycloneNoneDesc: "कोणतेही चक्रीवादळ नाही",
    cycloneWatchDesc: "कमी दाब क्षेत्रावर लक्ष",
    cycloneHighDesc: "तीव्र कमी दाब व वादळ",

    bestTimeLabel: "उत्तम वेळ:",
    bestTimeSafe: "सकाळी 5:30 – 11:00",
    bestTimeCaution: "सकाळी 6:00 – 9:30 (दुपारपूर्वी परता)",
    bestTimeDanger: "फक्त बंदरात राहा",

    expectedCatchLabel: "अपेक्षित मासे:",
    catchGood: "चांगली पकड",
    catchModerate: "मध्यम",
    catchNone: "शून्य (असुरक्षित)",

    reasonLabel: "कारण:",
    reasonSafe: "सुरक्षित समुद्राची स्थिती, सौम्य लाटा, हलका वारा आणि किनाऱ्याजवळ भरपूर माशांची उपलब्धता.",
    reasonCaution: "किनाऱ्याबाहेर मध्यम लाटा आणि दुपारचे वारे. खोल समुद्रात प्रवास न करण्याचा सल्ला.",
    reasonDanger: "असुरक्षित समुद्राची स्थिती. खवळलेल्या लाटा, जोरदार वादळी वारे आणि वादळाचा इशारा लागू आहे.",

    simpleAdviceLabel: "सोपा सल्ला:",
    adviceSafe: "“आज मासेमारीसाठी उत्तम दिवस आहे. लवकर निघा आणि शिफारस केलेल्या भागातच मासेमारी करा.”",
    adviceCaution: "“किनाऱ्याजवळ मासेमारी करू शकता, खोल समुद्रात जाणे टाळा. रेडिओ चालू ठेवा आणि दुपारचे वारे वाढण्यापूर्वी परता.”",
    adviceDanger: "“आज मासेमारी करणे टाळा. समुद्राची स्थिती धोकादायक आहे. उद्या प्रयत्न करा.”",

    audioListen: "सल्ला ऐका",
    audioStop: "थांबवा",
    changePort: "बंदर बदला",
    updatedLive: "थेट अपडेट"
  },

  bn: {
    reportTitle: "আজকের মাছ ধরার রিপোর্ট",
    portHarbourLabel: "বন্দর ও পোতাশ্রয়:",
    scenarioSafe: "নিরাপদ",
    scenarioCaution: "সতর্কতা",
    scenarioStorm: "ঝড়",
    question: "আমি কি আজ মাছ ধরতে যেতে পারি?",
    verdictGo: "যান 🎣",
    verdictGoSubtitle: "✅ হ্যাঁ — অনুকূল পরিবেশ",
    verdictCaution: "সতর্কতার সাথে যান ⚠️",
    verdictCautionSubtitle: "⚠️ শুধু উপকূলের কাছে — তাড়াতাড়ি ফিরুন",
    verdictStop: "যাবেন না 🚫",
    verdictStopSubtitle: "🚫 আজ মাছ ধরার পরামর্শ দেওয়া হচ্ছে না",
    aiEngineTitle: "AI মাল্টি-এজেন্ট সিদ্ধান্ত ইঞ্জিন",
    aiEngineSub: "ISRO Oceansat-3, INCOIS তরঙ্গ এবং IMD রাডার ডেটা সমন্বিত।",

    recAreaLabel: "সুপারিশকৃত এলাকা",
    fishAvailLabel: "মাছের প্রাপ্যতা",
    wavesLabel: "ঢেউ",
    windLabel: "বাতাস",
    rainLabel: "বৃষ্টি",
    cycloneRiskLabel: "ঘূর্ণিঝড়ের ঝুঁকি",

    recAreaSafeFormat: (port, km, zone) => `${port} থেকে ${km} কিমি (${zone})`,
    recAreaCaution: (port) => `${port} উপকূলের কাছে ৫–৮ কিমি`,
    recAreaDanger: "কিছুই না — বন্দরে নোঙর করে থাকুন",
    viewOnMap: "মানচিত্রে দেখুন ↗",

    fishHigh: "উচ্চ (প্রচুর)",
    fishModerate: "মাঝারি",
    fishUnsafe: "অনিরাপদ",

    waveSafe: "শান্ত",
    waveModerate: "মাঝারি",
    waveHigh: "উত্তাল ঢেউ",
    waveGentleSwells: "মৃদু ঢেউ",
    waveChoppySea: "উত্তাল সমুদ্র",
    waveRoughSwell: "বিপজ্জনক ঢেউ",

    windCalm: "শান্ত বাতাস",
    windModerate: "মাঝারি বাতাস",
    windStrong: "ঝড়ো বাতাস",
    windCalmBreeze: "মৃদু বাতাস",
    windBreezy: "হাওয়াযুক্ত",
    windSqualls: "দমকা হাওয়া",

    rainLow: "কম সম্ভাবনা",
    rainShowers: "হালকা বৃষ্টি",
    rainHeavy: "ভারী বৃষ্টির পূর্বাভাস",
    rainClearDesc: "আংশিক মেঘলা ও উপকূলীয় বাতাস",
    rainDrizzleDesc: "উপকূলীয় গুঁড়ি গুঁড়ি বৃষ্টি",
    rainSquallDesc: "ভারী বৃষ্টি ও শূন্য দৃশ্যমানতা",

    cycloneNone: "নেই",
    cycloneWatch: "নেই (নিম্নচাপ পর্যবেক্ষণ)",
    cycloneHigh: "উচ্চ / ঝড় সতর্কতা",
    cycloneNoneDesc: "কোন নিম্নচাপ নেই",
    cycloneWatchDesc: "নিম্নচাপ নজরদারি",
    cycloneHighDesc: "তীব্র নিম্নচাপ ও ঝড়",

    bestTimeLabel: "সেরা সময়:",
    bestTimeSafe: "সকাল ৫:৩০ – ১১:০০",
    bestTimeCaution: "সকাল ৬:০০ – ৯:৩০ (দুপুরের আগে ফিরুন)",
    bestTimeDanger: "কেবল বন্দরে থাকুন",

    expectedCatchLabel: "প্রত্যাশিত মাছ:",
    catchGood: "ভালো ধরা",
    catchModerate: "মাঝারি",
    catchNone: "নেই (বিপজ্জনক)",

    reasonLabel: "কারণ:",
    reasonSafe: "শান্ত সমুদ্র, কম উচ্চতার ঢেউ, মৃদুমন্দ বাতাস এবং উপকূলীয় এলাকায় প্রচুর মাছের প্রাপ্যতা।",
    reasonCaution: "উপকূলীয় অঞ্চলের বাইরে মাঝারি ঢেউ ও দুপুরের বাতাস। গভীর সমুদ্রে না যাওয়ার পরামর্শ।",
    reasonDanger: "বিপজ্জনক সমুদ্র পরিস্থিতি। উত্তাল ঢেউ, প্রচণ্ড ঝড়ো বাতাস এবং ঝড়ের সতর্কতা জারি রয়েছে।",

    simpleAdviceLabel: "সহজ পরামর্শ:",
    adviceSafe: "“আজ মাছ ধরার জন্য খুব ভালো দিন। সকাল সকাল রওনা দিন এবং নির্দেশিত স্থানে মাছ ধরুন।”",
    adviceCaution: "“উপকূলের কাছাকাছি মাছ ধরতে পারেন, গভীর সমুদ্রে যাবেন না। রেডিও সচল রাখুন ও দুপুরের আগে ফিরুন।”",
    adviceDanger: "“আজ মাছ ধরা পরিহার করুন। সমুদ্রের অবস্থা বিপজ্জনক। কাল আবার চেষ্টা করুন।”",

    audioListen: "পরামর্শ শুনুন",
    audioStop: "থামান",
    changePort: "বন্দর পরিবর্তন",
    updatedLive: "লাইভ আপডেট"
  },

  od: {
    reportTitle: "ଆଜିର ମତ୍ସ୍ୟ ଶିକାର ରିପୋର୍ଟ",
    portHarbourLabel: "ବନ୍ଦର ଓ ହାର୍ବର:",
    scenarioSafe: "ନିରାପଦ",
    scenarioCaution: "ସତର୍କତା",
    scenarioStorm: "ବାତ୍ୟା",
    question: "ମୁଁ ଆଜି ମାଛ ଧରିବାକୁ ଯାଇପାରିବି କି?",
    verdictGo: "ଯାଆନ୍ତୁ 🎣",
    verdictGoSubtitle: "✅ ହଁ — ଅନୁକୂଳ ପରିସ୍ଥିତି",
    verdictCaution: "ସତର୍କତାର ସହ ଯାଆନ୍ତୁ ⚠️",
    verdictCautionSubtitle: "⚠️ କେବଳ ଉପକୂଳ ନିକଟରେ — ଶୀଘ୍ର ଫେରନ୍ତୁ",
    verdictStop: "ଯାଆନ୍ତୁ ନାହିଁ 🚫",
    verdictStopSubtitle: "🚫 ଆଜି ମାଛ ଧରିବା ପରାମର୍ଶ ଦିଆଯାଉନାହିଁ",
    aiEngineTitle: "AI ମଲ୍ଟି-ଏଜେଣ୍ଟ ନିଷ୍ପତ୍ତି ଇଞ୍ଜିନ୍",
    aiEngineSub: "ISRO Oceansat-3, INCOIS ତରଙ୍ଗ ଏବଂ IMD ରାଡାର ଡାଟାର ବିଶ୍ଳେଷଣ।",

    recAreaLabel: "ସୁପାରିଶ କ୍ଷେତ୍ର",
    fishAvailLabel: "ମାଛ ଉପଲବ୍ଧତା",
    wavesLabel: "ଢେଉ",
    windLabel: "ପବନ",
    rainLabel: "ବର୍ଷା",
    cycloneRiskLabel: "ବାତ୍ୟା ଆଶଙ୍କା",

    recAreaSafeFormat: (port, km, zone) => `${port} ରୁ ${km} କିମି (${zone})`,
    recAreaCaution: (port) => `${port} ଉପକୂଳ ନିକଟରେ ୫–୮ କିମି`,
    recAreaDanger: "କିଛି ନାହିଁ — ବନ୍ଦରରେ ଲଙ୍ଗର ପକାଇ ରୁହନ୍ତୁ",
    viewOnMap: "ମାନଚିତ୍ରରେ ଦେଖନ୍ତୁ ↗",

    fishHigh: "ପ୍ରଚୁର",
    fishModerate: "ମଧ୍ୟମ",
    fishUnsafe: "ଅସୁରକ୍ଷିତ",

    waveSafe: "ନିରାପଦ",
    waveModerate: "ମଧ୍ୟମ",
    waveHigh: "ଉଚ୍ଚ ଢେଉ",
    waveGentleSwells: "ଶାନ୍ତ ଢେଉ",
    waveChoppySea: "ଅଶାନ୍ତ ସମୁଦ୍ର",
    waveRoughSwell: "ଭୟଙ୍କର ଢେଉ",

    windCalm: "ଶାନ୍ତ ପବନ",
    windModerate: "ମଧ୍ୟମ ପବନ",
    windStrong: "ପ୍ରବଳ ପବନ",
    windCalmBreeze: "ମୃଦୁ ପବନ",
    windBreezy: "ଥଣ୍ଡା ପବନ",
    windSqualls: "ଝଡ଼ି ପବନ",

    rainLow: "କମ ସମ୍ଭାବନା",
    rainShowers: "ହାଲୁକା ବର୍ଷା",
    rainHeavy: "ପ୍ରବଳ ବର୍ଷା ସମ୍ଭାବନା",
    rainClearDesc: "ଆଂଶିକ ମେଘୁଆ ଓ ଉପକୂଳ ପବନ",
    rainDrizzleDesc: "ଉପକୂଳ ଝିପିଝିପି ବର୍ଷା",
    rainSquallDesc: "ପ୍ରବଳ ବର୍ଷା ଓ ଦୃଶ୍ୟମାନତା ଅଭାବ",

    cycloneNone: "ନାହିଁ",
    cycloneWatch: "ନାହିଁ (ଲଘୁଚାପ ନିରୀକ୍ଷଣ)",
    cycloneHigh: "ଉଚ୍ଚ / ବାତ୍ୟା ସତର୍କତା",
    cycloneNoneDesc: "କୌଣସି ଲଘୁଚାପ ନାହିଁ",
    cycloneWatchDesc: "ଲଘୁଚାପ କ୍ଷେତ୍ର ଉପରେ ନଜର",
    cycloneHighDesc: "ତୀବ୍ର ଅବପାତ ଓ ଝଡ଼",

    bestTimeLabel: "ଉତ୍ତମ ସମୟ:",
    bestTimeSafe: "ସକାଳ ୫:୩୦ – ୧୧:୦୦",
    bestTimeCaution: "ସକାଳ ୬:୦୦ – ୯:୩୦ (ମଧ୍ୟାହ୍ନ ପୂର୍ବରୁ ଫେରନ୍ତୁ)",
    bestTimeDanger: "କେବଳ ବନ୍ଦରରେ ରୁହନ୍ତୁ",

    expectedCatchLabel: "ଆଶାନୁରୂପ ମାଛ:",
    catchGood: "ଭଲ ଧରା",
    catchModerate: "ମଧ୍ୟମ",
    catchNone: "ଶୂନ (ଅସୁରକ୍ଷିତ)",

    reasonLabel: "କାରଣ:",
    reasonSafe: "ନିରାପଦ ସମୁଦ୍ର ସ୍ଥିତି, କମ ଢେଉ, ଶାନ୍ତ ପବନ ଏବଂ ଉପକୂଳ ନିକଟରେ ପ୍ରଚୁର ମାଛର ଉପଲବ୍ଧତା।",
    reasonCaution: "ଉପକୂଳ ବାହାରେ ମଧ୍ୟମ ଢେଉ ଏବଂ ଅପରାହ୍ନ ପବନ। ଗଭୀର ସମୁଦ୍ର ଯାତ୍ରା ପରାମର୍ଶଯୋଗ୍ୟ ନୁହେଁ।",
    reasonDanger: "ଅସୁରକ୍ଷିତ ସମୁଦ୍ର ସ୍ଥିତି। ପ୍ରବଳ ଢେଉ, ଝଡ଼ି ପବନ ଏବଂ ବାତ୍ୟା ସତର୍କତା ଜାରି କରାଯାଇଛି।",

    simpleAdviceLabel: "ସହଜ ପରାମର୍ଶ:",
    adviceSafe: "“ଆଜି ମାଛ ଧରିବା ପାଇଁ ଭଲ ଦିନ। ଶୀଘ୍ର ବାହାରନ୍ତୁ ଏବଂ ସୁପାରିଶ କ୍ଷେତ୍ରରେ ହିଁ ମାଛ ଧରନ୍ତୁ।”",
    adviceCaution: "“ଉପକୂଳ ନିକଟରେ ମାଛ ଧରିପାରିବେ, ଗଭୀର ସମୁଦ୍ରକୁ ଯାଆନ୍ତୁ ନାହିଁ। ରେଡିଓ ଅନ୍ ରଖନ୍ତୁ ଏବଂ ଅପରାହ୍ନ ପୂର୍ବରୁ ଫେରନ୍ତୁ।”",
    adviceDanger: "“ଆଜି ମାଛ ଧରିବା ବନ୍ଦ ରଖନ୍ତୁ। ସମୁଦ୍ର ସ୍ଥିତି ବିପଜ୍ଜନକ। ଆସନ୍ତାକାଲି ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।”",

    audioListen: "ପରାମର୍ଶ ଶୁଣନ୍ତୁ",
    audioStop: "ବନ୍ଦ କରନ୍ତୁ",
    changePort: "ବନ୍ଦର ବଦଳାନ୍ତୁ",
    updatedLive: "ଲାଇଭ ଅପଡେଟ"
  },

  gu: {
    reportTitle: "આજનો માછીમારી અહેવાલ",
    portHarbourLabel: "બંદર અને હાર્બર:",
    scenarioSafe: "સુરક્ષિત",
    scenarioCaution: "સાવચેતી",
    scenarioStorm: "વાવાઝોડું",
    question: "શું હું આજે માછીમારી કરવા જઈ શકું?",
    verdictGo: "જાઓ 🎣",
    verdictGoSubtitle: "✅ હા — અનુકૂળ પરિસ્થિતિ",
    verdictCaution: "સાવચેતી સાથે જાઓ ⚠️",
    verdictCautionSubtitle: "⚠️ માત્ર કિનારા નજીક — વહેલા પાછા ફરો",
    verdictStop: "જશો નહીં 🚫",
    verdictStopSubtitle: "🚫 આજે માછીમારી કરવાની સલાહ નથી",
    aiEngineTitle: "AI મલ્ટી-એજન્ટ નિર્ણય એન્જિન",
    aiEngineSub: "ISRO Oceansat-3, INCOIS તરંગ રાઇડર અને IMD રડાર ડેટા વિશ્લેષણ.",

    recAreaLabel: "ભલામણ કરેલ વિસ્તાર",
    fishAvailLabel: "માછલીની ઉપલબ્ધતા",
    wavesLabel: "મોજાં",
    windLabel: "પવન",
    rainLabel: "વરસાદ",
    cycloneRiskLabel: "વાવાઝોડાનું જોખમ",

    recAreaSafeFormat: (port, km, zone) => `${port} થી ${km} કિમી (${zone})`,
    recAreaCaution: (port) => `${port} કિનારા નજીક 5–8 કિમી`,
    recAreaDanger: "કોઈ નહીં — બંદરમાં જ રહો",
    viewOnMap: "નકશા પર જુઓ ↗",

    fishHigh: "પુષ્કળ (ઉચ્ચ)",
    fishModerate: "મધ્યમ",
    fishUnsafe: "અસુરક્ષિત",

    waveSafe: "શાંત / સુરક્ષિત",
    waveModerate: "મધ્યમ",
    waveHigh: "ઊંચા મોજાં",
    waveGentleSwells: "શાંત મોજાં",
    waveChoppySea: "અશાંત દરિયો",
    waveRoughSwell: "તોફાની મોજાં",

    windCalm: "શાંત પવન",
    windModerate: "મધ્યમ પવન",
    windStrong: "ભારે પવન",
    windCalmBreeze: "મંદ પવન",
    windBreezy: "હવામાન અનુકૂળ",
    windSqualls: "ઝંઝાવાતી પવન",

    rainLow: "ઓછી શક્યતા",
    rainShowers: "હળવા ઝાપટાં",
    rainHeavy: "ભારે વરસાદની શક્યતા",
    rainClearDesc: "આંશિક વાદળછાયું અને દરિયાઈ પવન",
    rainDrizzleDesc: "કિનારા પર ઝરમર વરસાદ",
    rainSquallDesc: "ભારે વરસાદ અને ઝીરો વિઝિબિલિટી",

    cycloneNone: "કંઈ નથી",
    cycloneWatch: "નથી (દબાણ નિરીક્ષણ)",
    cycloneHigh: "વધુ / વાવાઝોડું એલર્ટ",
    cycloneNoneDesc: "કોઈ ચક્રવાત નથી",
    cycloneWatchDesc: "હળવા દબાણ પર નજર",
    cycloneHighDesc: "તીવ્ર ચક્રવાતી તોફાન",

    bestTimeLabel: "શ્રેષ્ઠ સમય:",
    bestTimeSafe: "સવારે 5:30 – 11:00",
    bestTimeCaution: "સવારે 6:00 – 9:30 (બપોર પહેલા પાછા ફરો)",
    bestTimeDanger: "માત્ર બંદરમાં જ રહો",

    expectedCatchLabel: "અપેક્ષિત પકડ:",
    catchGood: "સારી પકડ",
    catchModerate: "સાધારણ",
    catchNone: "શૂન્ય (અસુરક્ષિત)",

    reasonLabel: "કારણ:",
    reasonSafe: "સુરક્ષિત દરિયાઈ સ્થિતિ, શાંત મોજાં, હળવો પવન અને કિનારા નજીક માછલીઓની પુષ્કળ ઉપલબ્ધતા.",
    reasonCaution: "કિનારા બહાર મધ્યમ મોજાં અને બપોરનો પવન. ઊંડા દરિયામાં ન જવાની સલાહ છે.",
    reasonDanger: "અસુરક્ષિત દરિયાઈ સ્થિતિ. ઉછળતા મોજાં, ભારે પવન અને વાવાઝોડાની ચેતવણી જારી કરવામાં આવી છે.",

    simpleAdviceLabel: "સરળ સલાહ:",
    adviceSafe: "“આજે માછીમારી માટે ઉત્તમ દિવસ છે. વહેલા નીકળો અને ભલામણ કરેલા વિસ્તારમાં માછીમારી કરો.”",
    adviceCaution: "“કિનારા નજીક માછીમારી કરી શકો છો, ઊંડા દરિયામાં જવાનું ટાળો. રેડિયો ચાલુ રાખો અને બપોર પહેલા પાછા ફરો.”",
    adviceDanger: "“આજે માછીમારી કરવાનું ટાળો. દરિયો અત્યંત જોખમી છે. આવતીકાલે પ્રયત્ન કરો.”",

    audioListen: "સલાહ સાંભળો",
    audioStop: "અવાજ બંધ કરો",
    changePort: "બંદર બદલો",
    updatedLive: "લાઇવ અપડેટ"
  }
};

export function getFishingReportI18n(langCode: string = 'en'): FishingReportTranslations {
  const norm = langCode === 'or' ? 'od' : langCode.toLowerCase();
  return FISHING_REPORT_I18N[norm] || FISHING_REPORT_I18N['en'];
}
