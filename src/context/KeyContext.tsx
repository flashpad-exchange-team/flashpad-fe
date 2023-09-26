// KeyContext.tsx
import React, { createContext, useContext, ReactNode, useState } from 'react';

type KeyContextType = {
  allPairsKey: string;
  setAllPairsKey: (key: string) => void;
  allNftPoolsKey: string;
  setAllNftPoolsKey: (key: string) => void;
};

const KeyContext = createContext<KeyContextType | undefined>(undefined);

type KeyContextProviderProps = {
  children: ReactNode;
};

export const KeyContextProvider = ({ children }: KeyContextProviderProps) => {
  const [allPairsKey, setAllPairsKey] = useState<string>('all-pairs-key');
  const [allNftPoolsKey, setAllNftPoolsKey] = useState<string>('all-nft-pools-key');

  return (
    <KeyContext.Provider value={{ allPairsKey, setAllPairsKey, allNftPoolsKey, setAllNftPoolsKey }}>
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
