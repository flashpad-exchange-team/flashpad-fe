import JoinButton from '@/icons/JoinButton';
import JoinButtonActive from '@/icons/JoinButtonActive';
import PullSword from '@/public/assets/images/pull-sword.png';
import UpSword from '@/public/assets/images/up-sword.png';

import ListSocial from '@/components/listSocial/ListSocial';
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
      <div className="block xl:grid grid-cols-2  h-auto xl:h-[calc(100vh-160px)] px-7 xl:px-20  m-auto">
        <div className="flex items-end">
          <Image
            src={isHover ? UpSword : PullSword}
            alt="pull-sword"
            className="z-0 w-auto h-[90%] hidden xl:block"
            width={598}
          />
        </div>
        <div className="relative w-full xl:w-auto pt-12">
          <div className="text-[#FFAF1D] text-[36px] leading-9 font-bold mb-6 uppercase font-rem xl:max-w-[500px] text-center xl:text-left">
            Be the King of Your Own Legend
          </div>
          <div className="text-white text-[16px] xl:text-[18px] leading-6 xl:leading-7 font-semibold xl:max-w-[600px] text-center xl:text-left">
            Introducing Arthur Exchange: Where Linea's potential meets DeFi
            innovation. A unified platform merging a Decentralized Exchange and
            Launchpad, Arthur Exchange empowers Linea's community for seamless
            trading and project launches. Join us in shaping the future of
            decentralized finance.{' '}
          </div>
          <div
            className="mt-7 mb-7 w-fit z-10 hidden xl:block"
            onMouseOver={handleMouseEnter}
            onMouseOut={handleMouseLeave}
            onClick={() => router.push('/liquidity')}
          >
            {isHover ? <JoinButton /> : <JoinButtonActive />}
          </div>
          <div
            className="mt-6 mb-8 w-fit z-10 mx-auto block xl:hidden"
            onClick={() => router.push('/liquidity')}
          >
            <JoinButton />
          </div>
          <div className="block xl:flex gap-8 text-center">
            <div className="text-[#FFAF1D] text-[36px] font-bold mb-4 font-rem text-center xl:text-left">
              GET READY!
            </div>
            <div>
              <div className="text-white  text-[16px] xl:text-[18px] font-semibold xl:max-w-[600px] ">
                Arthur Exchange DEX is live on Linea{' '}
              </div>
              <div className="text-white  text-[16px] xl:text-[18px] font-semibold ">
                Join our <span className="text-[#FFAF1D]">community</span> to
                find out more.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[80px] bg-transparent xl:bg-[#00000080] mt-4 xl:mt-0 flex items-center justify-center">
        <div className="xl:flex text-center xl:text-left justify-between items-center gap-4">
          <div className="text-white text-[22px] xl:text-[24px] mt-4 xl:mt-0 font-bold mb-1 font-rem">
            Find us on
          </div>
          <ListSocial />
        </div>
      </div>
    </>
  );
};

export { Landing };
