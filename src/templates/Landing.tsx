import JoinButton from '@/icons/JoinButton';
import JoinButtonActive from '@/icons/JoinButtonActive';
import PullSword from '@/public/assets/images/pull-sword.png';
import UpSword from '@/public/assets/images/up-sword.png';

import Image from 'next/image';
import { useState } from 'react';
import { Header } from '../layout/header/Header';
import { Logo } from './Logo';
import DiscordIcon from '@/icons/DiscordIcon';
import TwitterIcon from '@/icons/TwitterIcon';
import TelegramIcon from '@/icons/TelegramIcon';
import MediumIcon from '@/icons/MediumIcon';
import DocsIcon from '@/icons/DocsIcon';

const Landing = () => {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  }
  return (
    <>
      <Header logo={<Logo xl />} />
      <div className='grid grid-cols-2 pt-12 h-[calc(100vh-80px)] px-20'>
        <div className='relative'>
          <Image src={isHover ? UpSword : PullSword} alt='pull-sword' className='absolute bottom-0 right-[-20%] z-0 max-w-none	' />
        </div>
        <div className='relative'>
          <div className="text-[#FFC700] text-[48px] font-bold mb-4">JOIN THE WAR</div>
          <div className="text-white text-[18px] font-semibold max-w-[600px]">Arthur Exchange is an innovative and highly flexible DEX built to support the Linea ecosystem.</div>
          <div className="text-white text-[18px] font-semibold ">Community driven and capital efficient</div>

          <div className='mt-6 mb-12 w-fit z-10' onMouseOver={handleMouseEnter}
            onMouseOut={handleMouseLeave} >
            {isHover ? <JoinButton /> : <JoinButtonActive />}
          </div>

          <div className="text-[#FFC700] text-[36px] font-bold mb-4">GET READY!</div>
          <div className='flex justify-between items-start'>
            <div>
              <div className="text-white text-[18px] font-semibold max-w-[600px] ">Arthur Exchange DEX is live on Linea </div>
              <div className="text-white text-[18px] font-semibold ">Join our <span className='text-[#FFC700]'>community</span> to find out more.</div>
            </div>
            <div className='mt-[-6px]'>
              <div className="text-white text-[24px] font-bold mb-1">Find us on</div>
              <div className="flex items-center gap-3">
                <DiscordIcon />
                <TwitterIcon />
                <TelegramIcon />
                <MediumIcon />
                <DocsIcon />
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export { Landing };
