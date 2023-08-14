import { useLoading } from '@/context/LoadingContext';
import LiquidityIcon from '@/icons/LiquidityIcon';
import { Header } from '@/layout/header/Header';
import { Logo } from '@/templates/Logo';
import Bg from 'public/assets/images/app-bg.png'; // Import your image
import { useEffect } from 'react';
import TradeForm from './components/TradeForm';

const Liquidity = () => {
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    startLoading();
    // Simulate an asynchronous action
    setTimeout(() => {
      stopLoading();
    }, 2000);
  }, []);
  return (
    <div
      style={{ backgroundImage: `url(${Bg.src})`, backgroundSize: 'cover' }}
      className=" min-h-[100vh] pb-[100px]"
    >
      <Header logo={<Logo xl />} mode="app" />

      <TradeForm
        title="Liquidity"
        buttonName="Add Liquidity"
        inputTitle1="Token 1"
        inputTitle2="Token 2"
        dividerIcon={<LiquidityIcon />}
      />
    </div>
  );
};

export default Liquidity;
