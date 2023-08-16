import JoinButton from '@/icons/JoinButton';
import JoinButtonActive from '@/icons/JoinButtonActive';
import PullSword from '@/public/assets/images/pull-sword.png';
import UpSword from '@/public/assets/images/up-sword.png';

import DiscordIcon from '@/icons/DiscordIcon';
import DocsIcon from '@/icons/DocsIcon';
import MediumIcon from '@/icons/MediumIcon';
import TelegramIcon from '@/icons/TelegramIcon';
import TwitterIcon from '@/icons/TwitterIcon';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Header } from '../layout/header/Header';
import { Logo } from './Logo';
import ListSocial from '@/components/listSocial/ListSocial';

const Landing = () => {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };
  const router = useRouter();
  return (
    <>
      <Header logo={<Logo xl />} />
      <div className="block lg:grid grid-cols-2  h-auto lg:h-[calc(100vh-160px)] px-7 lg:px-20 max-w-[1440px] m-auto">
        <div className="flex items-end">
          <Image
            src={isHover ? UpSword : PullSword}
            alt="pull-sword"
            className="z-0 max-w-none lg:w-[600px] hidden lg:block"
            width={598}
          />
        </div>
        <div className="relative w-full lg:w-auto pt-12">
          <div className="text-[#FFAF1D] text-[36px] leading-9 font-bold mb-6 uppercase font-rem lg:max-w-[500px] text-center lg:text-left">
            Be the King of Your Own Legend
          </div>
          <div className="text-white text-[16px] lg:text-[18px] leading-6 lg:leading-7 font-semibold lg:max-w-[600px] text-center lg:text-left">
            Introducing Arthur Exchange: Where Linea's potential meets DeFi
            innovation. A unified platform merging a Decentralized Exchange and
            Launchpad, Arthur Exchange empowers Linea's community for seamless
            trading and project launches. Join us in shaping the future of
            decentralized finance.{' '}
          </div>
          <div
            className="mt-4 mb-5 w-fit z-10 hidden lg:block"
            onMouseOver={handleMouseEnter}
            onMouseOut={handleMouseLeave}
            onClick={() => router.push('/swap')}
          >
            {isHover ? <JoinButton /> : <JoinButtonActive />}
          </div>
          <div
            className="mt-6 mb-8 w-fit z-10 mx-auto block lg:hidden"
            onClick={() => router.push('/swap')}
          >
            <JoinButton />
          </div>
          <div className="block lg:flex gap-8 text-center">
            <div className="text-[#FFAF1D] text-[36px] font-bold mb-4 font-rem text-center lg:text-left">
              GET READY!
            </div>
            <div>
              <div className="text-white  text-[16px] lg:text-[18px] font-semibold lg:max-w-[600px] ">
                Arthur Exchange DEX is live on Linea{' '}
              </div>
              <div className="text-white  text-[16px] lg:text-[18px] font-semibold ">
                Join our <span className="text-[#FFAF1D]">community</span> to
                find out more.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[80px] bg-transparent lg:bg-[#00000080] mt-4 lg:mt-0 flex items-center justify-center">
        <div className="lg:flex text-center lg:text-left justify-between items-center gap-4">
          <div className="text-white text-[22px] lg:text-[24px] mt-4 lg:mt-0 font-bold mb-1 font-rem">
            Find us on
          </div>
          <ListSocial />
        </div>
      </div>
    </>
  );
};

export { Landing };
