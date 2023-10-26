import {
  ReactElement,
  ReactNode,
  createContext,
  useContext,
  useState,
} from 'react';

interface LoadingTxInfo {
  tokenPairs?: string;
  title?: string;
  message?: string;
}

export interface SuccessTxInfo {
  mainMessage?: ReactElement;
  subMessage?: ReactElement;
  tx?: string;
  action?: string;
}

interface LoadingContextType {
  isLoading: boolean;
  startLoading: (message?: string) => void;
  stopLoading: () => void;
  loadingInfo: string;
  //Loading tx
  isLoadingTx: boolean;
  startLoadingTx: (message?: LoadingTxInfo) => void;
  stopLoadingTx: () => void;
  loadingTxInfo: LoadingTxInfo;
  //success tx
  isSuccessTx: boolean;
  startSuccessTx: (message?: SuccessTxInfo) => void;
  stopSuccessTx: () => void;
  successTxInfo: SuccessTxInfo;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setLoading] = useState(false);
  const [loadingInfo, setLoadingInfo] = useState('');
  const [isLoadingTx, setLoadingTx] = useState(false);
  const [loadingTxInfo, setLoadingTxInfo] = useState({});
  const [isSuccessTx, setSuccessTx] = useState(false);
  const [successTxInfo, setSuccessTxInfo] = useState({});
  const startLoading = (message?: string) => {
    if (message) setLoadingInfo(message);
    setLoading(true);
  };
  const stopLoading = () => {
    setLoading(false);
    setLoadingInfo('');
  };

  const startLoadingTx = (message?: LoadingTxInfo) => {
    if (message) setLoadingTxInfo(message);
    setLoadingTx(true);
  };
  const stopLoadingTx = () => {
    setLoadingTx(false);
    setLoadingTxInfo('');
  };

  const startSuccessTx = (message?: SuccessTxInfo) => {
    if (message) setSuccessTxInfo(message);
    setSuccessTx(true);
  };
  const stopSuccessTx = () => {
    setSuccessTx(false);
    setSuccessTxInfo('');
  };

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        startLoading,
        stopLoading,
        loadingInfo,
        isLoadingTx,
        startLoadingTx,
        stopLoadingTx,
        loadingTxInfo,
        isSuccessTx,
        successTxInfo,
        startSuccessTx,
        stopSuccessTx,
      }}
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
