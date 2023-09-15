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
      <div className="block xl:grid grid-cols-2  h-auto xl:max-h-[710px] px-7 xl:px-20 m-auto max-w-[1440px] mb-0">
        <div className="flex items-end">
          <Image
            src={isHover ? UpSword : PullSword}
            alt="pull-sword"
            className="z-0 w-auto h-[90%] hidden xl:!block"
            width={598}
          />
        </div>
        <div className="relative w-full xl:w-auto pt-32">
          <div className="text-primary text-[36px] leading-9 font-bold mb-6 uppercase font-rem xl:max-w-[500px] text-center xl:text-left">
            Be the King of Your Own Legend
          </div>
          <div className="text-white text-base xl:text-lg leading-6 xl:leading-7 font-semibold xl:max-w-[600px] text-center xl:text-left">
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
            onClick={() => router.push('/swap')}
          >
            {isHover ? <JoinButton /> : <JoinButtonActive />}
          </div>
          <div
            className="mt-6 mb-8 w-fit z-10 mx-auto block xl:hidden"
            onClick={() => router.push('/swap')}
          >
            <JoinButton />
          </div>
        </div>
      </div>
      <div className="flex-1 bg-transparent xl:bg-dark mt-8 xl:mt-0 text-center pb-6 2xl:pb-0 pt-6 box-content">
        <div className="block text-center">
          <div className="text-primary text-[36px] font-bold mb-4 font-rem text-center">
            GET READY!
          </div>
          <div>
            <div className="text-white  text-base xl:text-lg font-semibold ">
              Arthur Exchange DEX is live on Linea{' '}
            </div>
            <div className="text-white  text-base xl:text-lg font-semibold ">
              Join our <span className="text-primary">community</span> to find
              out more.
            </div>
          </div>
        </div>
        <div className="text-center mt-3ss">
          <div className="text-white text-[22px] xl:text-2xl mt-4 xl:mt-0 font-bold mb-1 font-rem">
            Find us on
          </div>
          <div className="mx-auto w-fit pb-4">
            <ListSocial />
          </div>
        </div>
      </div>
    </>
  );
};

export { Landing };
