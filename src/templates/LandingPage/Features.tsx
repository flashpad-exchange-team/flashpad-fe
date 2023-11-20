import CrossSword from '@/icons/CrossSword';
import TitleLeft from '@/icons/TitleLeft';
import TitleRight from '@/icons/TitleRight';
import { Red_Rose } from 'next/font/google';
import { useRouter } from 'next/router';
const redRose = Red_Rose({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

const Features = () => {
  const router = useRouter();

  return (
    <>
      <div
        className={
          'text-primary text-[40px] font-semibold uppercase mt-3 mb-6 flex items-center gap-4 justify-center ' +
          redRose.className
        }
      >
        <TitleLeft />
        Features & Solutions
        <TitleRight />
      </div>

      <div className="flex gap-5 mx-auto mb-8 uppercase">
        <div
          onClick={() => {
            router.push('/');
          }}
          className={
            'h-[228px] w-[200px] bg-primary text-[#0A071E] text-xl font-bold rounded-md pt-10 text-center cursor-pointer hover:shadow-gray-500 hover:shadow-md hover:mt-[-4px] ' +
            redRose.className
          }
        >
          <div className="flex justify-center mb-4">
            <CrossSword size="xl" />
          </div>
          <div>Early Knights Pools</div>
        </div>
        <div
          onClick={() => {
            router.push('/swap');
          }}
          className={
            'h-[228px] w-[200px] bg-primary text-[#0A071E] text-xl font-bold rounded-md pt-10 text-center cursor-pointer hover:shadow-gray-500 hover:shadow-md hover:mt-[-4px] ' +
            redRose.className
          }
        >
          <div className="flex justify-center mb-4">
            <CrossSword size="xl" />
          </div>
          <div>SWAP</div>
        </div>
        <div
          onClick={() => {
            router.push('/liquidity');
          }}
          className={
            'h-[228px] w-[200px] bg-primary text-[#0A071E] text-xl font-bold rounded-md pt-10 text-center cursor-pointer hover:shadow-gray-500 hover:shadow-md hover:mt-[-4px] ' +
            redRose.className
          }
        >
          <div className="flex justify-center mb-4">
            <CrossSword size="xl" />
          </div>
          <div>Add Liquidity</div>
        </div>
        <div
          onClick={() => {
            router.push('/spnft-positions');
          }}
          className={
            'h-[228px] w-[200px] bg-primary text-[#0A071E] text-xl font-bold rounded-md pt-10 text-center cursor-pointer hover:shadow-gray-500 hover:shadow-md hover:mt-[-4px] ' +
            redRose.className
          }
        >
          <div className="flex justify-center mb-4">
            <CrossSword size="xl" />
          </div>
          <div>Staking & Farming</div>
        </div>
        <div
          onClick={() => {
            router.push('/launchpad');
          }}
          className={
            'h-[228px] w-[200px] bg-primary text-[#0A071E] text-xl font-bold rounded-md pt-10 text-center cursor-pointer hover:shadow-gray-500 hover:shadow-md hover:mt-[-4px] ' +
            redRose.className
          }
        >
          <div className="flex justify-center mb-4">
            <CrossSword size="xl" />
          </div>
          <div>Launchpad</div>
        </div>
      </div>
    </>
  );
};

export default Features;
