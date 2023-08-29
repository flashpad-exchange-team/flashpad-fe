import { ReactNode, createContext, useContext, useState } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  startLoading: (message?: string) => void;
  stopLoading: () => void;
  loadingInfo: string;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setLoading] = useState(false);
  const [loadingInfo, setLoadingInfo] = useState('');

  const startLoading = (message?: string) => {
    if (message) setLoadingInfo(message);
    setLoading(true);
  };
  const stopLoading = () => {
    setLoading(false);
    setLoadingInfo('');
  };

  return (
    <LoadingContext.Provider
      value={{ isLoading, startLoading, stopLoading, loadingInfo }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}
