import { useLoading } from '@/context/LoadingContext';
import SwapIcon from '@/icons/SwapIcon';
import { Header } from '@/layout/header/Header';
import TradeForm from '@/modules/TradeForm';
import { Logo } from '@/templates/Logo';
import Bg from 'public/assets/images/app-bg.png'; // Import your image
import { useEffect } from 'react';

const Swap = () => {
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    startLoading();
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
        title="Swap"
        buttonName="Swap"
        inputTitle1="From"
        inputTitle2="To"
        dividerIcon={<SwapIcon />}
      />
    </div>
  );
};

export default Swap;
