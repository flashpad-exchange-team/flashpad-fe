import TitleLeft from '@/icons/TitleLeft';
import TitleRight from '@/icons/TitleRight';
import Tokenomic1 from '@/icons/Tokenomic1';
import Tokenomic2 from '@/icons/Tokenomic2';
import TokenomicChart from '@/icons/TokenomicChart';
import TokenomicChartSmall from '@/public/assets/images/tokenomic-img.png';
import { Red_Rose } from 'next/font/google';

const redRose = Red_Rose({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});
const Tokenomic = () => {
  return (
    <div className="w-full mx-auto text-center mt-8 lg:mt-24">
      <div
        className={
          'text-primary text-[32px] lg:px-0 lg:text-[40px] font-semibold uppercase mt-5 mb-0 lg:mb-8 flex items-center gap-4 justify-center  mx-4 ' +
          redRose.className
        }
      >
        <TitleLeft />
        TOKENOMICS
        <TitleRight />
      </div>
      <div className="hidden lg:flex justify-center items-center cursor-pointer gap-8">
        <Tokenomic1 />
        <TokenomicChart />
        <Tokenomic2 />
      </div>
      <div className="block lg:hidden justify-center items-center cursor-pointer gap-8 text-center">
        <img
          src={TokenomicChartSmall.src}
          alt="token"
          className="mx-auto mt-8 lg:mt-0"
        />
        <Tokenomic1 className="mx-auto mt-8  lg:m-0" />
        <Tokenomic2 className="mx-auto mt-8 lg:m-0" />
      </div>
    </div>
  );
};

export default Tokenomic;
