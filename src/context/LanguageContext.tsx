import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { I18N_TEXT, TranslationDictionary } from '../data/i18nTranslations';
import { getPageI18n, PageTranslations } from '../data/pageTranslations';
import { stopSpeaking } from '../utils/speechVoice';

export interface LanguageOption {
  code: string;
  label: string;
  nativeName: string;
  region: string;
  flag?: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeName: 'English', region: 'All India', flag: '🇮🇳' },
  { code: 'hi', label: 'Hindi', nativeName: 'हिन्दी', region: 'National / North', flag: '🇮🇳' },
  { code: 'kn', label: 'Kannada', nativeName: 'ಕನ್ನಡ', region: 'Karnataka Coast', flag: '🇮🇳' },
  { code: 'ml', label: 'Malayalam', nativeName: 'മലയാളം', region: 'Kerala Coast', flag: '🇮🇳' },
  { code: 'ta', label: 'Tamil', nativeName: 'தமிழ்', region: 'Tamil Nadu Coast', flag: '🇮🇳' },
  { code: 'te', label: 'Telugu', nativeName: 'తెలుగు', region: 'Andhra Coast', flag: '🇮🇳' },
  { code: 'mr', label: 'Marathi', nativeName: 'मराठी', region: 'Maharashtra Coast', flag: '🇮🇳' },
  { code: 'bn', label: 'Bengali', nativeName: 'বাংলা', region: 'Bengal Coast', flag: '🇮🇳' },
  { code: 'od', label: 'Odia', nativeName: 'ଓଡ଼ିଆ', region: 'Odisha Coast', flag: '🇮🇳' },
  { code: 'gu', label: 'Gujarati', nativeName: 'ગુજરાતી', region: 'Gujarat Coast', flag: '🇮🇳' }
];

export const PRIMARY_STORAGE_KEY = 'sagar_safe_language';
export const LEGACY_STORAGE_KEY = 'sagar_language';

function normalizeLangCode(code: string): string {
  if (code === 'or') return 'od';
  return code;
}

function getInitialLanguage(): string {
  try {
    const saved = localStorage.getItem(PRIMARY_STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
    if (saved) {
      const normalized = normalizeLangCode(saved);
      if (I18N_TEXT[normalized] || normalized === 'od' || normalized === 'or') {
        return normalized;
      }
    }
  } catch (e) {
    console.warn('Failed to access localStorage for initial language:', e);
  }
  return 'en';
}

export interface LanguageContextValue {
  language: string;
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  setCurrentLanguage: (lang: string) => void;
  t: TranslationDictionary;
  pageI18n: PageTranslations;
  supportedLanguages: LanguageOption[];
  currentLanguageOption: LanguageOption;
  isLanguageSupported: (code: string) => boolean;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export interface LanguageProviderProps {
  children: React.ReactNode;
  defaultLanguage?: string;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ 
  children, 
  defaultLanguage 
}) => {
  const [language, setLanguageState] = useState<string>(() => {
    if (defaultLanguage && (I18N_TEXT[defaultLanguage] || defaultLanguage === 'od' || defaultLanguage === 'or')) {
      return normalizeLangCode(defaultLanguage);
    }
    return getInitialLanguage();
  });

  const setLanguage = useCallback((newLang: string) => {
    const normalized = normalizeLangCode(newLang);
    // Stop any active speech broadcast immediately when language changes
    stopSpeaking();

    setLanguageState(normalized);

    try {
      localStorage.setItem(PRIMARY_STORAGE_KEY, normalized);
      localStorage.setItem(LEGACY_STORAGE_KEY, normalized);
      // Dispatch custom event for external sync if needed
      window.dispatchEvent(new CustomEvent('sagar-language-change', { detail: { language: normalized } }));
    } catch (e) {
      console.warn('Failed to persist language choice to localStorage:', e);
    }
  }, []);

  // Listen for storage changes across browser tabs
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === PRIMARY_STORAGE_KEY || event.key === LEGACY_STORAGE_KEY) {
        if (event.newValue && event.newValue !== language) {
          const normalized = normalizeLangCode(event.newValue);
          stopSpeaking();
          setLanguageState(normalized);
        }
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, [language]);

  // Derived translation dictionaries
  const t: TranslationDictionary = useMemo(() => {
    return I18N_TEXT[language] || I18N_TEXT['en'];
  }, [language]);

  const pageI18n: PageTranslations = useMemo(() => {
    return getPageI18n(language);
  }, [language]);

  const currentLanguageOption: LanguageOption = useMemo(() => {
    const found = SUPPORTED_LANGUAGES.find(l => l.code === language);
    return found || SUPPORTED_LANGUAGES[0];
  }, [language]);

  const isLanguageSupported = useCallback((code: string) => {
    const normalized = normalizeLangCode(code);
    return SUPPORTED_LANGUAGES.some(l => l.code === normalized);
  }, []);

  const value: LanguageContextValue = useMemo(() => ({
    language,
    currentLanguage: language,
    setLanguage,
    setCurrentLanguage: setLanguage,
    t,
    pageI18n,
    supportedLanguages: SUPPORTED_LANGUAGES,
    currentLanguageOption,
    isLanguageSupported
  }), [language, setLanguage, t, pageI18n, currentLanguageOption, isLanguageSupported]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

/**
 * Memoized hook for Navbar navigation items and translations tied to LanguageProvider context.
 * Guarantees reactive re-renders on language transitions while memoizing navigation link lists.
 */
export function useNavbarI18n(overrideLanguage?: string) {
  const { language, setLanguage, t: contextT, pageI18n: contextPageI18n, supportedLanguages } = useLanguage();
  const activeLanguage = overrideLanguage || language || 'en';

  return useMemo(() => {
    const t = I18N_TEXT[activeLanguage] || contextT || I18N_TEXT['en'];
    const pageI18n = getPageI18n(activeLanguage);
    return {
      activeLanguage,
      setLanguage,
      t,
      pageI18n,
      supportedLanguages
    };
  }, [activeLanguage, setLanguage, contextT, supportedLanguages]);
}

/**
 * Memoized hook for MobileBottomNav navigation items and translations tied to LanguageProvider context.
 * Guarantees reactive re-renders on language transitions with memoized translations.
 */
export function useMobileBottomNavI18n(overrideLanguage?: string) {
  const { language, t: contextT, pageI18n: contextPageI18n } = useLanguage();
  const activeLanguage = overrideLanguage || language || 'en';

  return useMemo(() => {
    const t = I18N_TEXT[activeLanguage] || contextT || I18N_TEXT['en'];
    const pageI18n = getPageI18n(activeLanguage);
    return {
      activeLanguage,
      t,
      pageI18n
    };
  }, [activeLanguage, contextT]);
}
