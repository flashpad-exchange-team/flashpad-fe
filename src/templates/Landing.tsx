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
      <div className="grid grid-cols-2 pt-12 h-[calc(100vh-80px)] px-20">
        <div className="relative">
          <Image
            src={isHover ? UpSword : PullSword}
            alt="pull-sword"
            className="absolute bottom-0 right-[-20%] z-0 max-w-none	"
          />
        </div>
        <div className="relative">
          <div className="text-[#FFAF1D] text-[36px] leading-9 font-bold mb-6 uppercase font-rem max-w-[500px]">
            Be the King of Your Own Legend
          </div>
          <div className="text-white text-[18px] leading-7 font-semibold max-w-[600px]">
            Introducing Arthur Exchange: Where Linea's potential meets DeFi
            innovation. A unified platform merging a Decentralized Exchange and
            Launchpad, Arthur Exchange empowers Linea's community for seamless
            trading and project launches. Join us in shaping the future of
            decentralized finance.{' '}
          </div>
          <div
            className="mt-6 mb-8 w-fit z-10"
            onMouseOver={handleMouseEnter}
            onMouseOut={handleMouseLeave}
            onClick={() => router.push('/swap')}
          >
            {isHover ? <JoinButton /> : <JoinButtonActive />}
          </div>

          <div className="text-[#FFAF1D] text-[36px] font-bold mb-4 font-rem">
            GET READY!
          </div>
          <div className="flex justify-between items-start">
            <div>
              <div className="text-white text-[18px] font-semibold max-w-[600px] ">
                Arthur Exchange DEX is live on Linea{' '}
              </div>
              <div className="text-white text-[18px] font-semibold ">
                Join our <span className="text-[#FFAF1D]">community</span> to
                find out more.
              </div>
            </div>
            <div className="mt-[-6px]">
              <div className="text-white text-[24px] font-bold mb-1 font-rem">
                Find us on
              </div>
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
};

export { Landing };
