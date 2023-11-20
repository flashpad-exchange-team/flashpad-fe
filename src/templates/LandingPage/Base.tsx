import { useLoading } from '@/context/LoadingContext';
import { useEffect } from 'react';
import BgGradient from 'public/assets/images/home-gradient.png'; // Import your image

import { Landing } from './Landing';

const Base = () => {
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
      className={`min-h-[104vh] flex flex-col  justify-between relative z-0`}
      style={{
        backgroundImage: `url(${BgGradient.src})`,
        backgroundSize: 'cover',
      }}
    >
      <Landing />
    </div>
  );
};

export { Base };
