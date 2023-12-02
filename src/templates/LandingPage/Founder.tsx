import LaurelLeftIcon from '@/icons/LaurelLefIcon';
import LaurelRightIcon from '@/icons/LaurelRightIcon';
import TitleLeft from '@/icons/TitleLeft';
import TitleRight from '@/icons/TitleRight';
import { Red_Rose } from 'next/font/google';
import Ebiz from 'public/assets/images/ebiz-logo.png';
const redRose = Red_Rose({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});
const Founder = () => {
  return (
    <div className="w-full max-w-[1096px] mx-auto text-center h-[200px] lg:h-[240px] bg-dark border-l-8 border-r-8 border-yellow-500 mt-16 pt-2 relative px-6 lg:px-0 ">
      <div
        className={
          'text-primary text-[32px] lg:text-[40px] font-semibold uppercase mt-6 mb-10 flex items-center gap-4 justify-center ' +
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
        <img
          src={Ebiz.src}
          alt="EbizBoom"
          className="w-[190px] lg:w-[240px] h-[31px] lg:h-[36px]"
        />
      </div>
      <div className="absolute bottom-8 left-12 hidden lg:block">
        <LaurelLeftIcon />
      </div>
      <div className="absolute bottom-8 right-12 hidden lg:block">
        {' '}
        <LaurelRightIcon />
      </div>
    </div>
  );
};

export default Founder;
