import RequireWalletConnectModal from '@/components/modal/RequireConnectWalletModal';
import { useLoading } from '@/context/LoadingContext';
import { useModal } from '@/context/ModalContext';
import { Logo } from '@/templates/Logo';
import Bg from 'public/assets/images/app-bg.png'; // Import your image
import { ReactNode, useEffect, useState } from 'react';
import { useAccount, useNetwork } from 'wagmi';
import Footer from '../footer';
import { Header } from '../header/Header';
// import { APP_BASED_CHAIN } from '@/utils/constants';
// import SwitchNetworkModal from '@/components/modal/SwitchNetworkModal';

interface AppLayoutProps {
  children: ReactNode;
}
const AppLayout = ({ children }: AppLayoutProps) => {
  const [isClient, setIsClient] = useState(false); // Check content mismatch error
  const { chain } = useNetwork();
  const { startLoading, stopLoading } = useLoading();
  const { toggleRequireConnect } = useModal();
  const { isConnected } = useAccount();

  useEffect(() => {
    if (!isConnected) toggleRequireConnect();
  }, []);

  useEffect(() => {
    setIsClient(true);
    startLoading();
    setTimeout(() => {
      stopLoading();
    }, 1000);
  }, []);

  useEffect(() => {}, [chain]);

  return isClient ? (
    <>
      {/* <SwitchNetworkModal
        isOpen={isOpenSwitchNetwork}
        toggleOpen={toggleSwitchNetwork}
      /> */}
      <div
        style={{ backgroundImage: `url(${Bg.src})`, backgroundSize: 'cover' }}
        className=" min-h-[104vh] flex flex-col  justify-between "
      >
        {/* <Meta title={AppConfig.title} description={AppConfig.description} /> */}

        <Header logo={<Logo xl />} mode="app" />
        {children}
        <RequireWalletConnectModal />
        <Footer />
      </div>
    </>
  ) : (
    'Loading'
  );
};

export default AppLayout;
