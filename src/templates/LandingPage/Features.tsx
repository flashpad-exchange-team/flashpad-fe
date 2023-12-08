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
          'text-primary text-[32px] lg:text-[40px] font-semibold uppercase mt-8 lg:mt-16 mb-10  items-center gap-4 justify-center text-center mx-8 lg:mx-2 hidden lg:flex ' +
          redRose.className
        }
      >
        <TitleLeft />
        Features & Solutions
        <TitleRight />
      </div>

      <div className="flex lg:gap-5 mx-auto mb-5 lg:mb-10 uppercase mt-5 flex-wrap  justify-center px-4 lg:px-0">
        <div
          onClick={() => {
            router.push('/');
          }}
          className={
            'h-[180px] lg:h-[228px] mt-4 lg:mt-0 w-full lg:w-[200px] px-2 bg-primary text-[#0A071E] text-lg lg:text-xl font-bold rounded-md pt-3 lg:pt-10 text-center cursor-pointer hover:shadow-gray-500 hover:shadow-md hover:mt-[-4px] ' +
            redRose.className
          }
        >
          <div className="flex justify-center mb-4">
            <CrossSword size="xl" />
          </div>
          <div>Thunder Pools</div>
        </div>
        <div
          onClick={() => {
            router.push('/swap');
          }}
          className={
            'h-[180px] lg:h-[228px] mt-4 lg:mt-0 w-[48%] mr-[2%] lg:mr-0 lg:w-[200px] bg-primary text-[#0A071E] text-lg lg:text-xl font-bold rounded-md pt-3 lg:pt-10 text-center cursor-pointer hover:shadow-gray-500 hover:shadow-md hover:mt-[-4px] ' +
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
            'h-[180px] lg:h-[228px] mt-4 lg:mt-0   w-[48%] ml-[2%] lg:ml-[0%] lg:w-[200px] bg-primary text-[#0A071E] text-lg lg:text-xl font-bold rounded-md pt-3 lg:pt-10 text-center cursor-pointer hover:shadow-gray-500 hover:shadow-md hover:mt-[-4px] ' +
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
            'h-[180px] lg:h-[228px] mt-4 lg:mt-0 w-[48%] mr-[2%] lg:mr-0 lg:w-[200px] bg-primary text-[#0A071E] text-lg lg:text-xl font-bold rounded-md pt-3 lg:pt-10 text-center cursor-pointer hover:shadow-gray-500 hover:shadow-md hover:mt-[-4px] ' +
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
            'h-[180px] lg:h-[228px] mt-4 lg:mt-0   w-[48%] ml-[2%] lg:ml-[0%] lg:w-[200px] bg-primary text-[#0A071E] text-lg lg:text-xl font-bold rounded-md pt-3 lg:pt-10 text-center cursor-pointer hover:shadow-gray-500 hover:shadow-md hover:mt-[-4px] ' +
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
