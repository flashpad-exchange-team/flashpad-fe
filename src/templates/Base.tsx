import { useLoading } from '@/context/LoadingContext';
import Bg from 'public/assets/images/landing-pg.png'; // Import your image
import { useEffect } from 'react';
import { Meta } from '../layout/Meta';
import { AppConfig } from '../utils/AppConfig';
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
      className={`text-white-600 antialiased xl:h-[100vh] pb-20`}
      style={{ backgroundImage: `url(${Bg.src})`, backgroundSize: 'cover' }}
    >
      <Meta title={AppConfig.title} description={AppConfig.description} />
      <Landing />
    </div>
  );
};

export { Base };
