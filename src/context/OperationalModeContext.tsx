import React, { createContext, useContext, useState, useEffect } from 'react';

export type OperationalUserMode = 'FISHERMAN' | 'EXECUTIVE';

interface OperationalModeContextType {
  operationalMode: OperationalUserMode;
  setOperationalMode: (mode: OperationalUserMode) => void;
  toggleOperationalMode: () => void;
  isFishermanMode: boolean;
  isExecutiveMode: boolean;
}

const OperationalModeContext = createContext<OperationalModeContextType | undefined>(undefined);

export const OperationalModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [operationalMode, setOperationalModeState] = useState<OperationalUserMode>(() => {
    try {
      const saved = localStorage.getItem('sagar_operational_mode');
      if (saved === 'EXECUTIVE' || saved === 'FISHERMAN') {
        return saved;
      }
    } catch {
      // Fallback
    }
    return 'FISHERMAN'; // Default to Fisherman Mode as requested for safety-first coastal focus
  });

  const setOperationalMode = (mode: OperationalUserMode) => {
    setOperationalModeState(mode);
    try {
      localStorage.setItem('sagar_operational_mode', mode);
    } catch {
      // Ignore
    }
  };

  const toggleOperationalMode = () => {
    setOperationalMode(operationalMode === 'FISHERMAN' ? 'EXECUTIVE' : 'FISHERMAN');
  };

  const isFishermanMode = operationalMode === 'FISHERMAN';
  const isExecutiveMode = operationalMode === 'EXECUTIVE';

  return (
    <OperationalModeContext.Provider
      value={{
        operationalMode,
        setOperationalMode,
        toggleOperationalMode,
        isFishermanMode,
        isExecutiveMode,
      }}
    >
      {children}
    </OperationalModeContext.Provider>
  );
};

export function useOperationalMode(): OperationalModeContextType {
  const context = useContext(OperationalModeContext);
  if (!context) {
    throw new Error('useOperationalMode must be used within an OperationalModeProvider');
  }
  return context;
}
