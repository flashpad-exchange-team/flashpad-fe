import JoinButton from '@/icons/JoinButton';
import JoinButtonActive from '@/icons/JoinButtonActive';
import PullSword from '@/public/assets/images/pull-sword.png';
import UpSword from '@/public/assets/images/up-sword.png';
import AuditImg from '@/public/assets/images/audit.png';

import { Red_Rose } from 'next/font/google';
import { Button } from '@/components/button/Button';
import ListSocial from '@/components/listSocial/ListSocial';
import WhitePaperIcon from '@/icons/WhitePaperIcon';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Header } from '../layout/header/Header';
import { Logo } from './Logo';
import BeenBoomLogo from '@/icons/BeenBoomLogo';
import Ebiz from 'public/assets/images/ebiz-logo.png';
const redRose = Red_Rose({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});
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
          <div
            className={
              'text-primary text-[52px] leading-9 font-bold mb-3 uppercase  xl:max-w-[500px] text-center xl:text-left ' +
              redRose.className
            }
          >
            Be the King
          </div>
          <div
            className={
              'text-white text-[36px] leading-9 font-bold mb-6 uppercase  xl:max-w-[500px] text-center xl:text-left ' +
              redRose.className
            }
          >
            of Your Own Legend
          </div>
          <div className="text-white text-base xl:text-lg leading-6 xl:leading-7 font-[500] xl:max-w-[600px] text-center xl:text-left">
            Introducing Arthur Exchange: Where Linea's potential meets DeFi
            innovation. A unified platform merging a Decentralized Exchange and
            Launchpad, Arthur Exchange empowers Linea's community for seamless
            trading and project launches. Join us in shaping the future of
            decentralized finance.
          </div>
          <div className="block lg:flex gap-8 items-center">
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
            <div className="mx-auto text-center lg:m-0 lg:text-left">
              <div
                className={
                  'text-primary text-2xl font-bold mb-1 ' + redRose.className
                }
              >
                AUDITED BY
              </div>
              <Image
                src={AuditImg.src}
                alt="Audit"
                width={200}
                height={26}
                className="mx-auto mb-4 lg:m-0"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#FFAF1D] h-30 flex justify-center text-[#0C111D] pb-6 pt-7">
        <div
          className="mr-0 md:mr-10 px-4 cursor-pointer"
          onClick={() => window.open('https://beenboom.com/')}
        >
          {/* <div className="text-[16px] font-bold leading-normal mb-2">
            Founder
          </div> */}
          <BeenBoomLogo />
        </div>
        <div
          className="ml-0 md:ml-10 px-4 cursor-pointer"
          onClick={() =>
            window.open('https://ebizworldsolutions.com/index.html')
          }
        >
          {/* <div className="text-[16px] leading-normal font-bold mb-2">
            CO-Founder
          </div> */}
          <Image src={Ebiz.src} alt="EbizBoom" width={200} height={26} />
        </div>
      </div>
      <div className="flex-1 bg-transparent xl:bg-dark mt-8 xl:mt-0 text-center pb-6 2xl:pb-0 pt-6 box-content">
        <div className="block text-center">
          <div
            className={
              'text-primary text-[36px] font-bold mb-2 font-rem text-center ' +
              redRose.className
            }
          >
            GET READY!
          </div>
          <div>
            <div className="text-white  text-base xl:text-lg font-[500] ">
              Arthur Exchange DEX is live on Linea
            </div>
            <div className="text-white  text-base xl:text-lg font-[500] ">
              Join our <span className="text-primary">community</span> to find
              out more.
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4 mb-4 w-full">
          <Button
            onClick={() => {
              window.open('https://docs.arthur.exchange/');
            }}
            icon={<WhitePaperIcon />}
            className="flex px-[42px]"
          >
            Whitepaper
          </Button>
        </div>
        <div className="text-center mt-3 ">
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
