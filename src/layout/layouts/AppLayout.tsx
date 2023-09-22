import { ReactNode, useEffect, useState } from 'react';
import { Header } from '../header/Header';
import { Logo } from '@/templates/Logo';
import Footer from '../footer';
import { useLoading } from '@/context/LoadingContext';
import Bg from 'public/assets/images/app-bg.png'; // Import your image
import { useNetwork } from 'wagmi';
import { Meta } from '../Meta';
import { AppConfig } from '@/utils/AppConfig';
import PoolInfoModal from '@/components/modal/PoolInfoModal';
// import { APP_BASED_CHAIN } from '@/utils/constants';
// import SwitchNetworkModal from '@/components/modal/SwitchNetworkModal';

interface AppLayoutProps {
  children: ReactNode;
}
const AppLayout = ({ children }: AppLayoutProps) => {
  const [isClient, setIsClient] = useState(false); // Check content mismatch error
  const { chain } = useNetwork();
  const { startLoading, stopLoading } = useLoading();

  // const [isOpenSwitchNetwork, setOpenSwitchNetwork] = useState(false);
  // const toggleSwitchNetwork = () => {
  //   setOpenSwitchNetwork(!isOpenSwitchNetwork);
  // };

  useEffect(() => {
    setIsClient(true);
    startLoading();
    setTimeout(() => {
      stopLoading();
    }, 1000);
  }, []);

  useEffect(() => {
    // if (chain?.id != APP_BASED_CHAIN.id) {
    // setOpenSwitchNetwork(true);
    // }
  }, [chain]);

  return isClient ? (
    <>
      {/* <SwitchNetworkModal
        isOpen={isOpenSwitchNetwork}
        toggleOpen={toggleSwitchNetwork}
      /> */}
      <PoolInfoModal isOpen={true} toggleOpen={() => {}} />
      <div
        style={{ backgroundImage: `url(${Bg.src})`, backgroundSize: 'cover' }}
        className=" min-h-[104vh] flex flex-col  justify-between "
      >
        <Meta title={AppConfig.title} description={AppConfig.description} />

        <Header logo={<Logo xl />} mode="app" />
        {children}
        <Footer />
      </div>
    </>
  ) : (
    'Loading'
  );
};

export default AppLayout;
