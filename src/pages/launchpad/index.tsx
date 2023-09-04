import { useLoading } from '@/context/LoadingContext';
import Footer from '@/layout/footer';
import { Header } from '@/layout/header/Header';
import { Logo } from '@/templates/Logo';
import Bg from 'public/assets/images/app-bg.png'; // Import your image
import React, { useEffect, useState } from 'react';
import TableLaunchpad from './components/TableLaunchpad';
const data = [
  {
    token: 'Token A',
    incentivesToken: 'Token B',
    hardcap: true,
    wlState: true,
    totalRaise: 10000000,
    about: 0,
  },
  {
    token: 'Token A',
    incentivesToken: 'Token B',
    hardcap: true,
    wlState: true,
    totalRaise: 10000000,
    about: 0,
  },
  {
    token: 'Token A',
    incentivesToken: 'Token B',
    hardcap: true,
    wlState: false,
    totalRaise: 10000000,
    about: 0,
  },
  {
    token: 'Token A',
    incentivesToken: 'Token B',
    hardcap: false,
    wlState: false,
    totalRaise: 10000000,
    about: 0,
  },
  {
    token: 'Token A',
    incentivesToken: 'Token B',
    hardcap: false,
    wlState: false,
    totalRaise: 10000000,
    about: 0,
  },
];

const Launchpad = () => {
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
      className=" min-h-[104vh] flex flex-col justify-between"
    >
      <Header logo={<Logo xl />} mode="app" />
      <>
        <div className="max-w-[1096px] w-full mx-auto ">
          <TableLaunchpad data={data} />
        </div>
      </>
      <Footer />
    </div>
  ) : (
    'Render'
  );
};

export default Launchpad;
