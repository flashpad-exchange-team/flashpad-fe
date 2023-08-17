import { ReactNode, createContext, useContext, useState } from 'react';

interface ModalContextType {
  isOpenConnectWallet: boolean;
  toggleConnectWallet: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpenConnectWallet, setOpenConnectWallet] = useState(false);

  const toggleConnectWallet = () => setOpenConnectWallet(!isOpenConnectWallet);

  return (
    <ModalContext.Provider value={{ isOpenConnectWallet, toggleConnectWallet }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useLoading must be used within a ModalProvider');
  }
  return context;
}
