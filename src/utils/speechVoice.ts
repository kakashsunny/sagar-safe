// Dedicated Maritime Voice & Speech Synthesis Engine for SAGAR-SAFE AI
// Supports all 10 coastal & national Indian languages with native TTS voice resolution

export interface LanguageVoiceConfig {
  code: string;
  bcp47: string;
  name: string;
  nativeName: string;
  voiceHints: string[];
}

export const SUPPORTED_LANGUAGES: Record<string, LanguageVoiceConfig> = {
  en: {
    code: 'en',
    bcp47: 'en-IN',
    name: 'English',
    nativeName: 'English',
    voiceHints: ['en-in', 'en_in', 'india', 'english', 'en-gb', 'en-us']
  },
  hi: {
    code: 'hi',
    bcp47: 'hi-IN',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    voiceHints: ['hi-in', 'hi_in', 'hindi', 'हिन्दी']
  },
  kn: {
    code: 'kn',
    bcp47: 'kn-IN',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    voiceHints: ['kn-in', 'kn_in', 'kannada', 'ಕನ್ನಡ']
  },
  ml: {
    code: 'ml',
    bcp47: 'ml-IN',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    voiceHints: ['ml-in', 'ml_in', 'malayalam', 'മലയാളം']
  },
  ta: {
    code: 'ta',
    bcp47: 'ta-IN',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    voiceHints: ['ta-in', 'ta_in', 'tamil', 'தமிழ்']
  },
  te: {
    code: 'te',
    bcp47: 'te-IN',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    voiceHints: ['te-in', 'te_in', 'telugu', 'తెలుగు']
  },
  mr: {
    code: 'mr',
    bcp47: 'mr-IN',
    name: 'Marathi',
    nativeName: 'मराठी',
    voiceHints: ['mr-in', 'mr_in', 'marathi', 'मराठी']
  },
  bn: {
    code: 'bn',
    bcp47: 'bn-IN',
    name: 'Bengali',
    nativeName: 'বাংলা',
    voiceHints: ['bn-in', 'bn_in', 'bengali', 'bangla', 'বাংলা']
  },
  od: {
    code: 'od',
    bcp47: 'or-IN',
    name: 'Odia',
    nativeName: 'ଓଡ଼ିଆ',
    voiceHints: ['or-in', 'or_in', 'od-in', 'odia', 'oriya', 'ଓଡ଼ିଆ']
  },
  gu: {
    code: 'gu',
    bcp47: 'gu-IN',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    voiceHints: ['gu-in', 'gu_in', 'gujarati', 'ગુજરાતી']
  }
};

// Aliases for safety
SUPPORTED_LANGUAGES['or'] = SUPPORTED_LANGUAGES['od'];

/**
 * Finds best matching browser voice for the selected language
 */
export function findBestVoiceForLanguage(langCode: string): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;

  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  const config = SUPPORTED_LANGUAGES[langCode] || SUPPORTED_LANGUAGES['en'];
  const prefix = config.bcp47.split('-')[0].toLowerCase();

  // 1. Direct language code match (e.g. 'hi-IN', 'ta-IN')
  const directMatch = voices.find(v => v.lang.toLowerCase() === config.bcp47.toLowerCase());
  if (directMatch) return directMatch;

  // 2. Language prefix match (e.g. 'hi', 'kn', 'ta')
  const prefixMatch = voices.find(v => v.lang.toLowerCase().startsWith(prefix));
  if (prefixMatch) return prefixMatch;

  // 3. Name hints match (e.g. "Google हिन्दी", "Microsoft Heera - English (India)")
  for (const hint of config.voiceHints) {
    const hintMatch = voices.find(v => 
      v.name.toLowerCase().includes(hint) || 
      v.lang.toLowerCase().includes(hint)
    );
    if (hintMatch) return hintMatch;
  }

  // 4. If English, look for Indian English first, then any English
  if (langCode === 'en') {
    const enIn = voices.find(v => v.lang.toLowerCase().includes('en-in'));
    if (enIn) return enIn;
    const anyEn = voices.find(v => v.lang.toLowerCase().startsWith('en'));
    if (anyEn) return anyEn;
  }

  return null;
}

/**
 * Generate localized spoken decision advice for fishermen based on conditions
 */
export function getFishermanSpokenReport(
  locationName: string,
  safetyStatus: 'RED' | 'YELLOW' | 'GREEN' | string,
  language: string
): string {
  const isRed = safetyStatus === 'RED';
  const isCaution = safetyStatus === 'YELLOW' || safetyStatus === 'AMBER';

  switch (language) {
    case 'hi':
      if (isRed) {
        return `सागर सेफ AI चेतावनी। स्थान: ${locationName}। निर्णय: आज समुद्र में बिल्कुल न जाएं। तेज चक्रवाती हवाएं और खतरनाक ऊंची लहरें हैं। मौसम विभाग द्वारा लाल चेतावनी जारी है। सभी नावें बंदरगाह पर ही सुरक्षित रहें।`;
      } else if (isCaution) {
        return `सागर सेफ AI सलाह। स्थान: ${locationName}। निर्णय: सावधानी के साथ जाएं। केवल तट के नजदीक 5 से 8 किलोमीटर तक ही मछली पकड़ें। दोपहर में हवा तेज हो सकती है, इसलिए दोपहर से पहले वापस आएं।`;
      } else {
        return `सागर सेफ AI रिपोर्ट। स्थान: ${locationName}। निर्णय: हां, आज आप मछली पकड़ने जा सकते हैं। समुद्र शांत है, हवा अनुकूल है और संभावित मछली क्षेत्र में अच्छी मात्रा उपलब्ध है। शाम 5 बजे से पहले सुरक्षित लौटें।`;
      }

    case 'kn':
      if (isRed) {
        return `ಸಾಗರ್-ಸೇಫ್ ಎಚ್ಚರಿಕೆ. ಸ್ಥಳ: ${locationName}. ನಿರ್ಧಾರ: ಇಂದು ಸಮುದ್ರಕ್ಕೆ ಹೋಗಬೇಡಿ. ಅತಿ ಎತ್ತರದ ಅಲೆಗಳು ಮತ್ತು ಬಿರುಗಾಳಿ ಇದೆ. ಅಪಾಯಕಾರಿ ಹವಾಮಾನ. ಎಲ್ಲಾ ದೋಣಿಗಳು ಬಂದರಿನಲ್ಲೇ ಸುರಕ್ಷಿತವಾಗಿರಲಿ.`;
      } else if (isCaution) {
        return `ಸಾಗರ್-ಸೇಫ್ ಸಲಹೆ. ಸ್ಥಳ: ${locationName}. ನಿರ್ಧಾರ: ಜಾಗರೂಕತೆಯಿಂದ ತೆರಳಿ. ತೀರದ ಸಮೀಪ 5 ರಿಂದ 8 ಕಿಲೋಮೀಟರ್ ಒಳಗೆ ಮಾತ್ರ ಮೀನುಗಾರಿಕೆ ಮಾಡಿ. ಮಧ್ಯಾಹ್ನದ ಮುನ್ನ ವಾಪಸ್ ಬನ್ನಿ.`;
      } else {
        return `ಸಾಗರ್-ಸೇಫ್ ವರದಿ. ಸ್ಥಳ: ${locationName}. ನಿರ್ಧಾರ: ಹೌದು, ಇಂದು ಮೀನುಗಾರಿಕೆಗೆ ತೆರಳಬಹುದು. ಸಮುದ್ರ ಶಾಂತವಾಗಿದೆ, ಗಾಳಿ ಅನುಕೂಲಕರವಾಗಿದೆ ಮತ್ತು ಉತ್ತಮ ಮೀನು ಲಭ್ಯತೆ ಇದೆ. ಸಂಜೆ ಮುನ್ನ ಸುರಕ್ಷಿತವಾಗಿ ಮರಳಿ.`;
      }

    case 'ml':
      if (isRed) {
        return `സാഗർ-സേഫ് മുന്നറിയിപ്പ്. സ്ഥലം: ${locationName}. തീരുമാനം: ഇന്ന് ആരും കടലിൽ പോകരുത്. ഉയർന്ന തിരമാലകളും ശക്തമായ കാറ്റും അപകടകരമാണ്. വള്ളങ്ങൾ സുരക്ഷിതമായി കരയിൽ നിർത്തുക.`;
      } else if (isCaution) {
        return `സാഗർ-സേഫ് ഉപദേശം. സ്ഥലം: ${locationName}. തീരുമാനം: ജാഗ്രതയോടെ പോകാം. തീരത്തുനിന്ന് 5 മുതൽ 8 കിലോമീറ്റർ പരിധിയിൽ മാത്രം മീൻപിടിക്കുക. ഉച്ചയ്ക്ക് മുൻപ് തിരിച്ചെത്തുക.`;
      } else {
        return `സാഗർ-സേഫ് റിപ്പോർട്ട്. സ്ഥലം: ${locationName}. തീരുമാനം: ഇന്ന് മത്സ്യബന്ധനത്തിന് പോകാം. കടൽ ശാന്തമാണ്, കാറ്റ് അനുകൂലമാണ്. മികച്ച മീൻ ലഭ്യതയുള്ള മേഖല ലഭ്യമാണ്. വൈകുന്നേരത്തിന് മുൻപ് തിരിച്ചെത്തുക.`;
      }

    case 'ta':
      if (isRed) {
        return `சாகர்-சேஃப் எச்சரிக்கை. இடம்: ${locationName}. முடிவு: இன்று கடலுக்கு செல்ல வேண்டாம். கடல் மிகவும் கொந்தளிப்பாக உள்ளது, பலத்த சூறாவளி காற்று வீசுகிறது. படகுகளை பாதுகாப்பாக கரையில் நிறுத்துங்கள்.`;
      } else if (isCaution) {
        return `சாகர்-சேஃப் ஆலோசனை. இடம்: ${locationName}. முடிவு: எச்சரிக்கையுடன் செல்லுங்கள். கரையிலிருந்து 5 முதல் 8 கிலோமீட்டர் வரை மட்டுமே மீன்பிடிக்கலாம். மதியத்திற்குள் கரை திரும்புங்கள்.`;
      } else {
        return `சாகர்-சேஃப் அறிக்கை. இடம்: ${locationName}. முடிவு: ஆம், இன்று மீன்பிடிக்க செல்லலாம். கடல் அமைதியாக உள்ளது, சாதகமான காற்று மற்றும் சிறந்த மீன் பிடிப்பு வாய்ப்பு உள்ளது. மாலைக்கு முன் பத்திரமாக திரும்புங்கள்.`;
      }

    case 'te':
      if (isRed) {
        return `సాగర్-సేఫ్ హెచ్చరిక. ప్రాంతం: ${locationName}. నిర్ణయం: ఈరోజు సముద్రంలోకి వేటకు వెళ్లవద్దు. ప్రమాదకరమైన అలలు మరియు ఈదురు గాలులు ఉన్నాయి. పడవలను రేవులోనే ఉంచండి.`;
      } else if (isCaution) {
        return `సాగర్-సేఫ్ సలహా. ప్రాంతం: ${locationName}. నిర్ణయం: జాగ్రత్తగా వెళ్లండి. తీరానికి 5 నుండి 8 కిలోమీటర్ల పరిధిలోనే వేటాడండి. మధ్యాహ్నానికి ముందే తిరిగి రండి.`;
      } else {
        return `సాగర్-సేఫ్ నివేదిక. ప్రాంతం: ${locationName}. నిర్ణయం: ఈరోజు చేపల వేటకు వెళ్ళవచ్చు. సముద్రం ప్రశాంతంగా ఉంది, అనుకూలమైన వాతావరణం మరియు మంచి చేపల లభ్యత ఉంది. సాయంత్రం లోపు సురక్షితంగా రండి.`;
      }

    case 'mr':
      if (isRed) {
        return `सागर-सेफ धोक्याची सूचना. ठिकाण: ${locationName}. निर्णय: आज समुद्रात जाऊ नका. उंच लाटा आणि वादळी वाऱ्याचा इशारा आहे. सर्व बोटी बंदरातच सुरक्षित ठेवा.`;
      } else if (isCaution) {
        return `सागर-सेफ सल्ला. ठिकाण: ${locationName}. निर्णय: सावधगिरीने जा. किनाऱ्याजवळ 5 ते 8 किलोमीटरपर्यंतच मासेमारी करा. दुपारपूर्वी परत या.`;
      } else {
        return `सागर-सेफ अहवाल. ठिकाण: ${locationName}. निर्णय: होय, आज मासेमारीसाठी अनुकूल दिवस आहे. समुद्र शांत आहे, अनुकूल वारे आणि चांगल्या मासेमारीची शक्यता आहे. संध्याकाळपूर्वी सुरक्षित परत या.`;
      }

    case 'bn':
      if (isRed) {
        return `সাগর-সেফ জরুরি সতর্কতা। স্থান: ${locationName}। সিদ্ধান্ত: আজ সমুদ্রে যাবেন না। উত্তাল ঢেউ এবং ঝোড়ো বাতাসের সতর্কতা রয়েছে। সমস্ত নৌকা নিরাপদে ঘাটে রাখুন।`;
      } else if (isCaution) {
        return `সাগর-সেফ পরামর্শ। স্থান: ${locationName}। সিদ্ধান্ত: সতর্কতার সাথে যান। উপকূলের কাছাকাছি ৫ থেকে ৮ কিলোমিটারের মধ্যে মাছ ধরুন। দুপুরের আগেই ফিরে আসুন।`;
      } else {
        return `সাগর-সেফ রিপোর্ট। স্থান: ${locationName}। সিদ্ধান্ত: হ্যাঁ, আজ মাছ ধরতে যেতে পারেন। শান্ত সমুদ্র, অনুকূল বাতাস এবং প্রচুর মাছ পাওয়ার সম্ভাবনা রয়েছে। সন্ধ্যার আগে নিরাপদে ফিরুন।`;
      }

    case 'od':
      if (isRed) {
        return `ସାଗର-ସେଫ ସତର୍କତା ସୂଚନା। ସ୍ଥାନ: ${locationName}। ନିଷ୍ପତ୍ତି: ଆଜି ସମୁଦ୍ରକୁ ଯାଆନ୍ତୁ ନାହିଁ। ଉଚ୍ଚ ତରଙ୍ଗ ଏବଂ ପ୍ରବଳ ଝଡ଼ ପବନର ଆଶଙ୍କା ରହିଛି। ସମସ୍ତ ଡଙ୍ଗା ବନ୍ଦରରେ ସୁରକ୍ଷିତ ରଖନ୍ତୁ।`;
      } else if (isCaution) {
        return `ସାଗର-ସେଫ ପରାମର୍ଶ। ସ୍ଥାନ: ${locationName}। ନିଷ୍ପତ୍ତି: ସତର୍କତାର ସହିତ ଯାଆନ୍ତୁ। କୂଳ ନିକଟରେ ୫ ରୁ ୮ କିଲୋମିଟର ମଧ୍ୟରେ ମାଛ ଧରନ୍ତୁ। ଦ୍ୱିପ୍ରହର ପୂର୍ବରୁ ଫେରିଆସନ୍ତୁ।`;
      } else {
        return `ସାଗର-ସେଫ ରିପୋର୍ଟ। ସ୍ଥାନ: ${locationName}। ନିଷ୍ପତ୍ତି: ହଁ, ଆଜି ମାଛ ଧରିବା ପାଇଁ ଯାଇପାରିବେ। ସମୁଦ୍ର ଶାନ୍ତ ଅଛି, ଅନୁକୂଳ ପବନ ଏବଂ ପ୍ରଚୁର ମାଛ ମିଳିବାର ସମ୍ଭାବନା ଅଛି। ସନ୍ଧ୍ୟା ପୂର୍ବରୁ ନିରାପଦରେ ଫେରନ୍ତୁ।`;
      }

    case 'gu':
      if (isRed) {
        return `સાગર-સેફ ચેતવણી. સ્થળ: ${locationName}. નિર્ણય: આજે દરિયામાં ન જશો. ઊંચા મોજા અને તોફાની પવનની ચેતવણી છે. તમામ બોટો બંદરે જ સુરક્ષિત રાખો.`;
      } else if (isCaution) {
        return `સાગર-સેફ સલાહ. સ્થળ: ${locationName}. નિર્ણય: સાવચેતી સાથે જાવ. દરિયાકિનારાથી 5 થી 8 કિલોમીટર સુધી જ માછીમારી કરો. બપોર પહેલા પાછા ફરો.`;
      } else {
        return `સાગર-સેફ અહેવાલ. સ્થળ: ${locationName}. નિર્ણય: હા, આજે માછીમારી માટે સારો દિવસ છે. શાંત દરિયો, અનુકૂળ પવન અને પુષ્કળ માછલી મળવાની શક્યતા છે. સાંજ પહેલાં સુરક્ષિત પરત ફરો.`;
      }

    case 'en':
    default:
      if (isRed) {
        return `SAGAR-SAFE Marine Alert for ${locationName}. Decision: DO NOT GO TO SEA. Severe weather warning active with dangerous high swells and gale-force squalls. All craft must remain secured in harbour.`;
      } else if (isCaution) {
        return `SAGAR-SAFE Marine Advisory for ${locationName}. Decision: GO WITH CAUTION. Nearshore coastal operations only, within 5 to 8 kilometres of shore. Return to port before afternoon squalls build.`;
      } else {
        return `SAGAR-SAFE Marine Report for ${locationName}. Decision: YES, CONDITIONS FAVORABLE. Safe low swell, gentle breeze, and high fish catch aggregation detected in offshore PFZ sector. Safe return advised before 5:00 PM.`;
      }
  }
}

/**
 * Generate localized speech for general observatory / page briefing
 */
export function getPageSpokenBriefing(
  pageName: 'dashboard' | 'map' | 'ports' | 'pfz' | 'weather' | 'news' | 'trust',
  locationName: string,
  language: string
): string {
  switch (pageName) {
    case 'map':
      switch (language) {
        case 'hi':
          return `भौगोलिक महासागर वेधशाला। स्थान: ${locationName}। इनकोइस के डेटा और महासागरीय तरंगों का लाइव नक्शा सक्रिय है।`;
        case 'kn':
          return `ಸಾಗರ ನಕ್ಷೆ ವೀಕ್ಷಣೆ. ಸ್ಥಳ: ${locationName}. ಇಂಕಾಯ್ಸ್ ಬೋಯ್ ಮತ್ತು ಸಮುದ್ರ ಅಲೆಗಳ ಲೈವ್ ಮಾಹಿತಿ ಲಭ್ಯವಿದೆ.`;
        case 'ml':
          return `ജിയോസ്പേഷ്യൽ സമുദ്ര നിരീക്ഷണ കേന്ദ്രം. സ്ഥലം: ${locationName}. തത്സമയ തിരമാലകളും സാറ്റലൈറ്റ് വിവരങ്ങളും ലഭ്യമാണ്.`;
        case 'ta':
          return `கடல்சார் வரைபட கண்காணிப்பு மையம். இடம்: ${locationName}. நிகழ்நேர அலைகள் மற்றும் செயற்கைக்கோள் தரவுகள் நேரலையில் உள்ளன.`;
        case 'te':
          return `సముద్ర పట పరిశీలన కేంద్రం. ప్రాంతం: ${locationName}. ఇన్కోయిస్ బాయ్స్ మరియు ఉపగ్రహ సమాచారం అందుబాటులో ఉంది.`;
        default:
          return `Geospatial Ocean Observatory for ${locationName}. Real-time INCOIS moored buoy networks, ISRO chlorophyll fronts, and bathymetric corridors online.`;
      }

    case 'ports':
      switch (language) {
        case 'hi':
          return `भारतीय बंदरगाह निर्देशिका। 12 प्रमुख पत्तन और राज्य समुद्री बोर्ड के व्यावसायिक बंदरगाह व मत्स्य केंद्र सत्यापित हैं।`;
        case 'kn':
          return `ಭಾರತೀಯ ಬಂದರುಗಳ ಡೈರೆಕ್ಟರಿ. 12 ಪ್ರಮುಖ ಬಂದರುಗಳು ಮತ್ತು ಮೀನುಗಾರಿಕಾ ಬಂದರುಗಳ ಅಧಿಕೃತ ಮಾಹಿತಿ ಇಲ್ಲಿದೆ.`;
        case 'ml':
          return `ഇന്ത്യൻ തുറമുഖ ഡയറക്ടറി. 12 പ്രധാന തുറമുഖങ്ങളുടെയും ഫിഷിംഗ് ഹാർബറുകളുടെയും വിവരങ്ങൾ.`;
        case 'ta':
          return `இந்திய துறைமுகங்கள் அடைவு. 12 முதன்மை துறைமுகங்கள் மற்றும் மீன்பிடி துறைமுகங்களின் அதிகாரப்பூர்வ தகவல்கள்.`;
        case 'te':
          return `భారతీయ ఓడరేవుల డైరెక్టరీ. 12 ప్రధాన ఓడరేవులు మరియు ఫిషింగ్ హార్బర్ల అధికారిక సమాచారం.`;
        default:
          return `Indian Ports and Harbours Directory. Verified records covering 12 Major Port Authorities, commercial terminals, and fishing harbours.`;
      }

    case 'pfz':
      switch (language) {
        case 'hi':
          return `संभावित मत्स्य पालन क्षेत्र एवं महासागरीय पारिस्थितिकी। ओशनसैट-3 उपग्रह द्वारा चिन्हित उच्च मछली क्षेत्र और ईंधन बचत कैलकुलेटर सक्रिय हैं।`;
        case 'kn':
          return `ಮೀನುಗಾರಿಕಾ ವಲಯಗಳು. ಉಪಗ್ರಹ ಆಧಾರಿತ ಮೀನು ಲಭ್ಯತೆಯ ಸ್ಥಳಗಳು ಮತ್ತು ಇಂಧನ ಉಳಿತಾಯ ಲೆಕ್ಕಾಚಾರ ಇಲ್ಲಿದೆ.`;
        case 'ml':
          return `സാധ്യതയുള്ള മത്സ്യബന്ധന മേഖലകൾ. സാറ്റലൈറ്റ് വിവരങ്ങളും ഇന്ധന ലാഭവും അറിയാം.`;
        case 'ta':
          return `சாத்தியமான மீன்பிடி மண்டலங்கள். செயற்கைக்கோள் தரவு மற்றும் எரிபொருள் சேமிப்பு தகவல்கள்.`;
        case 'te':
          return `చేపల లభ్యత మండలాలు. ఉపగ్రహ డేటా మరియు ఇంధన పొదుపు సమాచారం.`;
        default:
          return `Potential Fishing Zones and Marine Ecology for ${locationName}. Oceansat-3 thermal fronts and fuel savings optimization online.`;
      }

    case 'weather':
      switch (language) {
        case 'hi':
          return `समुद्री मौसम एवं हवा का पूर्वानुमान। स्थान: ${locationName}। मौसम विभाग के राडार द्वारा 5 दिवसीय पूर्वानुमान और नौका सुरक्षा मैट्रिक्स उपलब्ध है।`;
        case 'kn':
          return `ಕರಾವಳಿ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ. ಸ್ಥಳ: ${locationName}. 5 ದಿನಗಳ ಹವಾಮಾನ ಮತ್ತು ದೋಣಿ ಸುರಕ್ಷತಾ ವಿವರ ಇಲ್ಲಿದೆ.`;
        case 'ml':
          return `തീരദേശ കാലാവസ്ഥാ പ്രവചനം. സ്ഥലം: ${locationName}. കാറ്റിന്റെ വേഗതയും 5 ദിവസത്തെ വിവരങ്ങളും.`;
        case 'ta':
          return `கடல்சார் வானிலை முன்னறிவிப்பு. இடம்: ${locationName}. காற்று வேகம் மற்றும் 5 நாள் வானிலை விவரங்கள்.`;
        case 'te':
          return `సముద్ర వాతావరణ సమాచారం. ప్రాంతం: ${locationName}. గాలుల వేగం మరియు 5 రోజుల సూచనలు.`;
        case 'mr':
          return `सागरी हवामान अंदाज. ठिकाण: ${locationName}. 5 दिवसांचा हवामान अंदाज आणि बोट सुरक्षा तपशील उपलब्ध आहे.`;
        case 'bn':
          return `সামুদ্রিক আবহাওয়া পূর্বাভাস। স্থান: ${locationName}। ৫ দিনের আবহাওয়া দৃষ্টিভঙ্গি ও নৌকা সুরক্ষা তথ্য।`;
        case 'od':
        case 'or':
          return `ସାମୁଦ୍ରିକ ପାଣିପାଗ ପୂର୍ବାନୁମାନ। ସ୍ଥାନ: ${locationName}। ୫ ଦିନର ପାଣିପାଗ ଏବଂ ଡଙ୍ଗା ସୁରକ୍ଷା ତଥ୍ୟ।`;
        case 'gu':
          return `દરિયાઈ હવામાન આગાહી. સ્થળ: ${locationName}. 5 દિવસની આગાહી અને બોટ સુરક્ષા વિગતો ઉપલબ્ધ છે.`;
        default:
          return `Marine Meteorological Forecast and Gale Warnings for ${locationName}. IMD synoptic surface winds and 5-day outlook online.`;
      }

    case 'news':
      switch (language) {
        case 'hi':
          return `राष्ट्रीय समुद्री समाचार एवं आधिकारिक बुलेटिन। इसरो ओशनसैट-3 मत्स्य क्षेत्र एडवाइजरी, मौसम विभाग की तूफानी चेतावनी और तटरक्षक बल की एआई संकट प्रणाली सक्रिय हैं।`;
        case 'kn':
          return `ರಾಷ್ಟ್ರೀಯ ಸಾಗರ ಸುದ್ದಿ ಮತ್ತು ಅಧಿಕೃತ ಬುಲೆಟಿನ್. ಇಸ್ರೋ ಓಷನ್‌ಸ್ಯಾಟ್-3 ಮೀನುಗಾರಿಕಾ ವಲಯ ಮಾಹಿತಿ, ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ ಮತ್ತು ಕೋಸ್ಟ್ ಗಾರ್ಡ್ ಸುರಕ್ಷತಾ ವ್ಯವಸ್ಥೆಯ ತಾಜಾ ವರದಿಗಳು ಲಭ್ಯವಿದೆ.`;
        case 'ml':
          return `ദേശീയ സമുദ്ര വാർത്തകളും ഔദ്യോഗിക ബുള്ളറ്റിനുകളും. ഐഎസ്ആർഒ ഓഷ്യൻസാറ്റ്-3 മത്സ്യലഭ്യതാ വിവരങ്ങൾ, കാലാവസ്ഥാ മുന്നറിയിപ്പുകൾ, തീരസംരക്ഷണ സേനയുടെ സുരക്ഷാ ക്രമീകരണങ്ങൾ എന്നിവ ലഭ്യമാണ്.`;
        case 'ta':
          return `தேசிய கடல்சார் செய்திகள் மற்றும் அதிகாரப்பூர்வ அறிவிப்புகள். இஸ்ரோ ஓஷன்சாட்-3 மீன்பிடி மண்டல வழிகாட்டல், வானிலை எச்சரிக்கைகள் மற்றும் கடலோர காவல்படையின் பாதுகாப்பு தகவல்கள் நேரலையில் உள்ளன.`;
        case 'te':
          return `జాతీయ సముద్ర వార్తలు మరియు అధికారిక బులెటిన్లు. ఇస్రో ఓషన్శాట్-3 చేపల వేట సమాచారం, వాతావరణ హెచ్చరికలు మరియు కోస్ట్ గార్డ్ భద్రతా వ్యవస్థ సమాచారం అందుబాటులో ఉంది.`;
        case 'mr':
          return `राष्ट्रीय सागरी बातम्या आणि अधिकृत बुलेटिन. इस्रो ओशनसॅट-3 द्वारे मासेमारी क्षेत्र सल्ला, वादळ इशारे आणि तटरक्षक दलाची आपत्कालीन यंत्रणा कार्यान्वित आहे.`;
        case 'bn':
          return `জাতীয় সামুদ্রিক সংবাদ ও অফিসিয়াল বুলেটিন। ইসরো ওশানস্যাট-৩ ভিত্তিক সম্ভাব্য মৎস্য অঞ্চল নির্দেশিকা, আবহাওয়া সতর্কতা এবং উপকূলরক্ষী বাহিনীর জরুরি সুরক্ষা ব্যবস্থা।`;
        case 'od':
        case 'or':
          return `ଜାତୀୟ ସାମୁଦ୍ରିକ ସମ୍ବାଦ ଏବଂ ସରକାରୀ ବୁଲେଟିନ୍। ଇସ୍ରୋ ଓସେନସାଟ୍-୩ ମତ୍ସ୍ୟ କ୍ଷେତ୍ର ସୂଚନା, ପାଣିପାଗ ସତର୍କତା ଏବଂ ତଟରକ୍ଷୀ ବାହିନୀର ସୁରକ୍ଷା ବାର୍ତ୍ତା।`;
        case 'gu':
          return `રાષ્ટ્રીય દરિયાઈ સમાચારો અને સત્તાવાર બુલેટિન. ઇસરો ઓશનસેટ-3 દ્વારા માછીમારી ક્ષેત્ર માર્ગદર્શન, હવામાન ચેતવણીઓ અને કોસ્ટ ગાર્ડ સુરક્ષા પ્રણાલીની વિગતો અહીં ઉપલબ્ધ છે.`;
        default:
          return `National Marine Intelligence Dispatches and verified bulletins. Real-time satellite PFZ releases from ISRO Oceansat-3, IMD marine squall warnings, Indian Coast Guard emergency transponder integrations, and deepwater port operations online.`;
      }

    case 'trust':
      switch (language) {
        case 'hi':
          return `डेटा विश्वसनीयता एवं वैज्ञानिक स्रोत केंद्र। इनकोइस, मौसम विभाग, इसरो ओशनसैट-3 और भारतीय तटरक्षक बल से सीधे सत्यापित उपग्रह व महासागरीय डेटा।`;
        case 'kn':
          return `ಡೇಟಾ ವಿಶ್ವಾಸಾರ್ಹತೆ ಮತ್ತು ವೈಜ್ಞಾನಿಕ ಮೂಲ ಕೇಂದ್ರ. ಇಂಕಾಯ್ಸ್, ಹವಾಮಾನ ಇಲಾಖೆ, ಇಸ್ರೋ ಮತ್ತು ಕೋಸ್ಟ್ ಗಾರ್ಡ್ ಮೂಲಗಳಿಂದ ನೇರ ಪರಿಶೀಲಿತ ಡೇಟಾ.`;
        case 'ml':
          return `ഡാറ്റാ വിശ്വാസ്യത കേന്ദ്രം. ഇൻകോയിസ്, കാലാവസ്ഥാ വകുപ്പ്, ഐഎസ്ആർഒ, കോസ്റ്റ് ഗാർഡ് എന്നിവയുടെ ഔദ്യോഗിക വിവരങ്ങൾ.`;
        case 'ta':
          return `தரவு நம்பகத்தன்மை மையம். இன்காய்ஸ், வானிலை மையம், இஸ்ரோ மற்றும் கடலோர காவல்படையின் சரிபார்க்கப்பட்ட அறிவியல் தரவுகள்.`;
        case 'te':
          return `డేటా విశ్వసనీయత కేంద్రం. ఇన్కోయిస్, వాతావరణ శాఖ, ఇస్రో మరియు కోస్ట్ గార్డ్ ధృవీకరించిన సమాచారం.`;
        case 'mr':
          return `डेटा विश्वासार्हता केंद्र. इनकोइस, हवामान खाते, इस्रो आणि तटरक्षक दलाकडून थेट प्रमाणित वैज्ञानिक डेटा.`;
        case 'bn':
          return `তথ্য নির্ভরযোগ্যতা কেন্দ্র। ইনকোইস, আবহাওয়া দপ্তর, ইসরো ও উপকূলরক্ষী বাহিনীর যাচাইকৃত বৈজ্ঞানিক তথ্য।`;
        case 'od':
        case 'or':
          return `ଡାଟା ବିଶ୍ୱସନୀୟତା କେନ୍ଦ୍ର। ଇନକୋଇସ, ପାଣିପାଗ ବିଭାଗ, ଇସ୍ରୋ ଏବଂ ତଟରକ୍ଷୀ ବାହିନୀର ପ୍ରମାଣିତ ତଥ୍ୟ।`;
        case 'gu':
          return `ડેટા વિશ્વસનીયતા કેન્દ્ર. ઇનકોઇસ, હવામાન વિભાગ, ઇસરો અને કોસ્ટ ગાર્ડ દ્વારા ચકાસાયેલ સત્તાવાર વૈજ્ઞાનિક ડેટા.`;
        default:
          return `Data Trust and Scientific Provenance Center. Multi-source telemetry directly ingested and verified from INCOIS, IMD, ISRO Oceansat-3, and Indian Coast Guard.`;
      }

    default:
      return getFishermanSpokenReport(locationName, 'GREEN', language);
  }
}

/**
 * Generate localized spoken briefing for an individual news article
 */
export function getNewsArticleSpokenText(
  article: { title: string; summary: string; keyTakeaway?: string },
  language: string
): string {
  const takeaway = article.keyTakeaway ? `. ${article.keyTakeaway}` : '';
  return `${article.title}. ${article.summary}${takeaway}`;
}

/**
 * Text-to-speech speaker executing voice in the requested language
 */
export function speakTextInLanguage(
  text: string,
  langCode: string,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: () => void
): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }

  // Cancel any ongoing speech
  try {
    window.speechSynthesis.cancel();
  } catch {
    // ignore
  }

  const utterance = new SpeechSynthesisUtterance(text);
  const config = SUPPORTED_LANGUAGES[langCode] || SUPPORTED_LANGUAGES['en'];
  utterance.lang = config.bcp47;
  utterance.rate = 0.95;
  utterance.pitch = 1.0;

  // Pick voice
  const voice = findBestVoiceForLanguage(langCode);
  if (voice) {
    utterance.voice = voice;
  }

  utterance.onstart = () => {
    if (onStart) onStart();
  };

  utterance.onend = () => {
    if (onEnd) onEnd();
  };

  utterance.onerror = () => {
    if (onError) onError();
  };

  window.speechSynthesis.speak(utterance);
  return true;
}

export function stopSpeaking(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // ignore
    }
  }
}
