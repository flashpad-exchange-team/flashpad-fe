import { useLoading } from '@/context/LoadingContext';
import SwapIcon from '@/icons/SwapIcon';
import Footer from '@/layout/footer';
import { Header } from '@/layout/header/Header';
import { Logo } from '@/templates/Logo';
import dynamic from 'next/dynamic';
import Bg from 'public/assets/images/app-bg.png'; // Import your image
import { useEffect, useState } from 'react';

const TradeForm: any = dynamic(() => import('./components/TradeForm'), {
  ssr: false,
}); // Disable SSR

const Swap = () => {
  const { startLoading, stopLoading } = useLoading();
  const [isClient, setIsClient] = useState(false); // Check content mismatch error

  useEffect(() => {
    setIsClient(true);

    startLoading();
    setTimeout(() => {
      stopLoading();
    }, 2000);
  }, []);
  return isClient ? (
    <div
      style={{ backgroundImage: `url(${Bg.src})`, backgroundSize: 'cover' }}
      className=" min-h-[104vh] flex flex-col  justify-between "
    >
      <Header logo={<Logo xl />} mode="app" />
      <TradeForm
        title="SWAP"
        buttonName="Swap"
        inputTitle1="From"
        inputTitle2="To"
        dividerIcon={<SwapIcon />}
      />
      <Footer />
    </div>
  ) : (
    'Render'
  );
};

export default Swap;
