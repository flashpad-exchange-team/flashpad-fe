import { ReactNode, useEffect, useState } from 'react';
import { Header } from '../header/Header';
import { Logo } from '@/templates/Logo';
import Footer from '../footer';
import { useLoading } from '@/context/LoadingContext';
import Bg from 'public/assets/images/app-bg.png'; // Import your image
import { useNetwork, useSwitchNetwork } from 'wagmi';
import { lineaTestnet, polygonMumbai } from 'wagmi/chains';
import { IS_LINEA } from '@/utils/constants';
import customToast from '@/components/notification/customToast';

interface AppLayoutProps {
  children: ReactNode;
}
const AppLayout = ({ children }: AppLayoutProps) => {
  const [isClient, setIsClient] = useState(false); // Check content mismatch error
  const { startLoading, stopLoading } = useLoading();
  const { chain } = useNetwork();
  const { error, switchNetworkAsync } = useSwitchNetwork();

  const selectedChain = IS_LINEA ? lineaTestnet : polygonMumbai;

  const checkAndSwitchNetwork = async () => {
    if (chain?.id != selectedChain.id) {
      if (!switchNetworkAsync) {
        customToast({
          message: `Please switch to ${selectedChain.name} testnet on your browser wallet`,
          type: 'error',
        });
      } else {
        startLoading(`Switching to ${selectedChain.name} network...`);
        try {
          await switchNetworkAsync(
            IS_LINEA ? lineaTestnet.id : polygonMumbai.id
          );
        } catch (error) {
          console.log(error);
        }
        stopLoading();
      }
    }
  };

  useEffect(() => {
    setIsClient(true);
    startLoading();
    if (chain?.id === selectedChain.id) {
      setTimeout(() => {
        stopLoading();
      }, 1000);
    }
  }, []);

  useEffect(() => {
    if (error) {
      customToast({
        message: error.message,
        type: 'error',
      });
    }
  }, [error]);

  useEffect(() => {
    checkAndSwitchNetwork();
  }, [chain, switchNetworkAsync]);

  return isClient ? (
    <div
      style={{ backgroundImage: `url(${Bg.src})`, backgroundSize: 'cover' }}
      className=" min-h-[104vh] flex flex-col  justify-between "
    >
      <Header logo={<Logo xl />} mode="app" />
      {children}
      <Footer />
    </div>
  ) : (
    'Loading'
  );
};

export default AppLayout;
