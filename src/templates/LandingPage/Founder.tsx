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
    <div className="w-full max-w-[1096px] mx-auto text-center h-[246px] bg-dark border-t-8 border-yellow-500 mt-4 pt-2">
      <div
        className={
          'text-primary text-[40px] font-semibold uppercase mt-3 mb-6 flex items-center gap-4 justify-center ' +
          redRose.className
        }
      >
        <TitleLeft />
        Founder
        <TitleRight />
      </div>
      <div
        className="flex justify-center cursor-pointer"
        onClick={() => window.open('https://ebizworldsolutions.com/index.html')}
      >
        <Image src={Ebiz.src} alt="EbizBoom" width={200} height={26} />
      </div>
    </div>
  );
};

export default Founder;
