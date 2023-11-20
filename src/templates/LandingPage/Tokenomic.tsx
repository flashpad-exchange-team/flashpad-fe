import { Red_Rose } from 'next/font/google';
import Image from 'next/image';
import tokenomic1 from 'public/assets/images/tokenomic1.png';
import tokenomic2 from 'public/assets/images/tokenomic2.png';
import tokenomicChart from 'public/assets/images/tokenomic-chart.png';
import TitleLeft from '@/icons/TitleLeft';
import TitleRight from '@/icons/TitleRight';

const redRose = Red_Rose({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});
const Tokenomic = () => {
  return (
    <div className="w-full  mx-auto text-center mt-8">
      <div
        className={
          'text-primary text-[40px] font-semibold uppercase mt-5 mb-6 flex items-center gap-4 justify-center ' +
          redRose.className
        }
      >
        <TitleLeft />
        TOKENOMIC
        <TitleRight />
      </div>
      <div className="flex justify-center items-center cursor-pointer gap-7">
        <Image src={tokenomic1.src} alt="token1" width={160} height={66} />{' '}
        <Image
          src={tokenomicChart.src}
          alt="EbizBoom"
          width={320}
          height={320}
        />
        <Image src={tokenomic2.src} alt="token1" width={160} height={66} />{' '}
      </div>
    </div>
  );
};

export default Tokenomic;
