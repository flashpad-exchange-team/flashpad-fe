import { useLoading } from '@/context/LoadingContext';
import Footer from '@/layout/footer';
import { Header } from '@/layout/header/Header';
import { Logo } from '@/templates/Logo';
import Bg from 'public/assets/images/app-bg.png'; // Import your image
import { useEffect, useState } from 'react';
import StakingMain from './components/StakingMain';

const Staking = () => {
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
      className=" min-h-[104vh] flex flex-col  justify-between "
    >
      <Header logo={<Logo xl />} mode="app" />
      <StakingMain />

      <Footer />
    </div>
  ) : (
    'Render'
  );
};

export default Staking;
