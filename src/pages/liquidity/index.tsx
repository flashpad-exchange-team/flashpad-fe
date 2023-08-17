import { useLoading } from '@/context/LoadingContext';
import LiquidityIcon from '@/icons/LiquidityIcon';
import { Header } from '@/layout/header/Header';
import { Logo } from '@/templates/Logo';
import Bg from 'public/assets/images/app-bg.png'; // Import your image
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Footer from '@/layout/footer';

const TradeForm: any = dynamic(() => import('./components/TradeForm'), {
  ssr: false,
}); // Disable SSR

const Liquidity = () => {
  const { startLoading, stopLoading } = useLoading();
  const [isClient, setIsClient] = useState(false); // Check content mismatch error

  useEffect(() => {
    setIsClient(true);
    startLoading();
    setTimeout(() => {
      stopLoading();
    }, 1000);
  }, []);

  return isClient ? (
    <div
      style={{ backgroundImage: `url(${Bg.src})`, backgroundSize: 'cover' }}
      className=" min-h-[100vh] "
    >
      <Header logo={<Logo xl />} mode="app" />

      <TradeForm
        title="LIQUIDITY"
        buttonName="Add Liquidity"
        inputTitle1="Token 1"
        inputTitle2="Token 2"
        dividerIcon={<LiquidityIcon />}
      />
      <Footer />
    </div>
  ) : (
    'Render'
  );
};

export default Liquidity;
