// KeyContext.tsx
import React, { createContext, useContext, ReactNode, useState } from 'react';

type KeyContextType = {
  dataKey: string;
  setKey: (key: string) => void;
};

const KeyContext = createContext<KeyContextType | undefined>(undefined);

type KeyContextProviderProps = {
  children: ReactNode;
};

export const KeyContextProvider = ({ children }: KeyContextProviderProps) => {
  const [dataKey, setDataKey] = useState<string>('initial-key-value');

  const setKey = (key: string) => {
    setDataKey(key);
  };

  return (
    <KeyContext.Provider value={{ dataKey, setKey }}>
      {children}
    </KeyContext.Provider>
  );
};

export const useKeyContext = () => {
  const context = useContext(KeyContext);
  if (context === undefined) {
    throw new Error('useKeyContext must be used within a KeyContextProvider');
  }
  return context;
};
