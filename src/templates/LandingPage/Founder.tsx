import LaurelLeftIcon from '@/icons/LaurelLefIcon';
import LaurelRightIcon from '@/icons/LaurelRightIcon';
import TitleLeft from '@/icons/TitleLeft';
import TitleRight from '@/icons/TitleRight';
import { Red_Rose } from 'next/font/google';
import Image from 'next/image';
import Ebiz from 'public/assets/images/ebiz-logo.png';
const redRose = Red_Rose({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});
const Founder = () => {
  return (
    <div className="w-full max-w-[1096px] mx-auto text-center h-[240px] bg-dark border-t-8 border-yellow-500 mt-16 pt-2 relative">
      <div
        className={
          'text-primary text-[40px] font-semibold uppercase mt-6 mb-10 flex items-center gap-4 justify-center ' +
          redRose.className
        }
      >
        <TitleLeft />
        Founders
        <TitleRight />
      </div>
      <div
        className="flex justify-center cursor-pointer"
        onClick={() => window.open('https://ebizworldsolutions.com/index.html')}
      >
        <Image src={Ebiz.src} alt="EbizBoom" width={240} height={36} />
      </div>
      <div className="absolute bottom-0 left-0">
        <LaurelLeftIcon />
      </div>
      <div className="absolute bottom-0 right-0">
        {' '}
        <LaurelRightIcon />
      </div>
    </div>
  );
};

export default Founder;
