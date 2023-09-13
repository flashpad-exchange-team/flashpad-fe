import { ReactNode, useEffect, useState } from 'react';
import { Header } from '../header/Header';
import { Logo } from '@/templates/Logo';
import Footer from '../footer';
import { useLoading } from '@/context/LoadingContext';
import Bg from 'public/assets/images/app-bg.png'; // Import your image

interface AppLayoutProps {
  children: ReactNode;
}
const AppLayout = ({ children }: AppLayoutProps) => {
  const [isClient, setIsClient] = useState(false); // Check content mismatch error
  const { startLoading, stopLoading } = useLoading();
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
      {children}
      <Footer />
    </div>
  ) : (
    'Loading'
  );
};

export default AppLayout;
