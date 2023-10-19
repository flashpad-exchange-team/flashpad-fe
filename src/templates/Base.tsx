import { useLoading } from '@/context/LoadingContext';
import Bg from 'public/assets/images/landing-pg.png'; // Import your image
import { useEffect } from 'react';

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
      className={`min-h-[104vh] flex flex-col  justify-between`}
      style={{ backgroundImage: `url(${Bg.src})`, backgroundSize: 'cover' }}
    >
      <Landing />
    </div>
  );
};

export { Base };
