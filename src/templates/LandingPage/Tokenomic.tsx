import TitleLeft from '@/icons/TitleLeft';
import TitleRight from '@/icons/TitleRight';
import Tokenomic1 from '@/icons/Tokenomic1';
import Tokenomic2 from '@/icons/Tokenomic2';
import TokenomicChart from '@/icons/TokenomicChart';
import { Red_Rose } from 'next/font/google';

const redRose = Red_Rose({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});
const Tokenomic = () => {
  return (
    <div className="w-full  mx-auto text-center mt-24">
      <div
        className={
          'text-primary text-[40px] font-semibold uppercase mt-5 mb-8 flex items-center gap-4 justify-center ' +
          redRose.className
        }
      >
        <TitleLeft />
        TOKENOMICS
        <TitleRight />
      </div>
      <div className="flex justify-center items-center cursor-pointer gap-8">
        <Tokenomic1 />
        <TokenomicChart />
        <Tokenomic2 />
      </div>
    </div>
  );
};

export default Tokenomic;
