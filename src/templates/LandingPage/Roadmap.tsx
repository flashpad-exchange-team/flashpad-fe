import TitleLeft from '@/icons/TitleLeft';
import TitleRight from '@/icons/TitleRight';
import { Red_Rose } from 'next/font/google';

const redRose = Red_Rose({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});
const Roadmap = () => {
  return (
    <div className="w-full  mx-auto text-center mt-12 lg:mt-[192px] max-w-[1440px] mb-4 lg:mb-12">
      <div
        className={
          'text-primary text-[32px] lg:text-[40px] font-semibold uppercase mt-5 mb-4 lg:mb-14 flex items-center gap-4 justify-center ' +
          redRose.className
        }
      >
        <TitleLeft />
        ROADMAP
        <TitleRight />
      </div>
      <div className="hidden lg:grid grid-cols-4 px-20 gap-x-4">
        <div
          className={
            'text-[30px] text-primary font-bold mb-6 text-left ' +
            redRose.className
          }
        >
          Q2 - 2023
        </div>
        <div
          className={
            'text-[30px] text-primary font-bold mb-6 text-left ' +
            redRose.className
          }
        >
          Q3 - 2023
        </div>{' '}
        <div
          className={
            'text-[30px] text-primary font-bold mb-6 text-left ' +
            redRose.className
          }
        >
          Q4 - 2023
        </div>{' '}
        <div
          className={
            'text-[30px] text-primary font-bold mb-6 text-left ' +
            redRose.className
          }
        >
          Q1 - 2024
        </div>
        <div className="bg-primary h-[4px] w-full relative mb-10">
          <div className="absolute left-0 w-[24px] h-[24px] bg-white border-2 border-solid border-[#FFAF1D] rounded-full top-[-10px]"></div>
        </div>
        <div className="bg-primary h-[4px] w-full relative mb-10">
          <div className="absolute left-[-17px] w-[24px] h-[24px]  bg-white border-2 border-solid border-[#FFAF1D]  rounded-full top-[-10px]"></div>
        </div>{' '}
        <div className="bg-primary h-[4px] w-full relative mb-10 ">
          <div className="absolute left-[-17px] w-[24px] h-[24px]  bg-white border-2 border-solid border-[#FFAF1D]  rounded-full top-[-10px]"></div>
          <div className="absolute z-1 bg-[#475467] h-[4px] right-0 w-[50%]"></div>
        </div>{' '}
        <div className="bg-[#475467] h-[4px] w-full relative mb-10">
          <div className="absolute left-[-17px] w-[24px] h-[24px]  bg-white border-2 border-solid border-[#475467]  rounded-full top-[-10px]"></div>
        </div>
        <ul className="text-left block text-sm font-[500] list-disc pl-3">
          <li>Research (visual, chain, marketing strategy, & partners)</li>
          <li> UX & UI for DEX</li>
          <li>Marketing Planning</li>
          <li>Community Managing Planning</li>
          <li> Social Channel Set-up</li>
          <li>Partners List Collecting</li>
          <li>Reach Out Linea</li>
        </ul>
        <ul className="text-left block text-sm font-[500] list-disc pl-3">
          <li>Done with Swap Feature</li>
          <li>Testing Feature</li>
          <li>UX & UI for Launchpad</li>
          <li>Official Meeting with Linea</li>
          <li>Audit Research</li>
          <li>Partners List Filtering</li>
        </ul>
        <ul className="text-left block text-sm font-[500] list-disc pl-3">
          <li>Done with Add Liquidity Feature</li>
          <li>Done with Staking & Farming Feature </li>
          <li>Audit with Solidproof.io </li>
          <li>Onboarding Linea Ecosystem </li>
          <li>Community Expanding </li>
          <li>Thunder pools are published and open to deposits </li>
          <li>Thunder pool rewards start being allocated to depositors </li>
          <li>Thunder pools are closed to deposits </li>
          <li>Token launch and farms open </li>
          <li>Farming rewards start </li>
          <li>Thunder pool rewards can be harvested </li>
        </ul>
        <ul className="text-left block text-sm font-[500] list-disc pl-3">
          <li>Community Boosting </li>
          <li>Partners Collaboration Boosting </li>
          <li>Public Sale Starts </li>
          <li>Public Sale Ends </li>
          <li>Roadmap Updating </li>
        </ul>
      </div>
      <div className="block lg:hidden grid-cols-4 pl-28 pr-20 lg:px-20 gap-x-4 ">
        <div
          className={
            'text-[30px] text-primary font-bold mb-2 text-left ' +
            redRose.className
          }
        >
          Q2 - 2023
        </div>
        <ul className="text-left block text-sm font-[500] list-disc pl-3 mb-4">
          <li>Research (visual, chain, marketing strategy, & partners)</li>
          <li> UX & UI for DEX</li>
          <li>Marketing Planning</li>
          <li>Community Managing Planning</li>
          <li> Social Channel Set-up</li>
          <li>Partners List Collecting</li>
          <li>Reach Out Linea</li>
        </ul>
        <div
          className={
            'text-[30px] text-primary font-bold mb-2 text-left ' +
            redRose.className
          }
        >
          Q3 - 2023
        </div>{' '}
        <ul className="text-left block text-sm font-[500] list-disc pl-3 mb-4">
          <li>Done with Swap Feature</li>
          <li>Testing Feature</li>
          <li>UX & UI for Launchpad</li>
          <li>Official Meeting with Linea</li>
          <li>Audit Research</li>
          <li>Partners List Filtering</li>
        </ul>
        <div
          className={
            'text-[30px] text-primary font-bold mb-2 text-left ' +
            redRose.className
          }
        >
          Q4 - 2023
        </div>{' '}
        <ul className="text-left block text-sm font-[500] list-disc pl-3 mb-4">
          <li>Done with Add Liquidity Feature</li>
          <li>Done with Staking & Farming Feature </li>
          <li>Audit with Solidproof.io </li>
          <li>Onboarding Linea Ecosystem </li>
          <li>Community Expanding </li>
          <li>Thunder pools are published and open to deposits </li>
          <li>Thunder pool rewards start being allocated to depositors </li>
          <li>Thunder pools are closed to deposits </li>
          <li>Token launch and farms open </li>
          <li>Farming rewards start </li>
          <li>Thunder pool rewards can be harvested </li>
        </ul>
        <div
          className={
            'text-[30px] text-primary font-bold mb-2 text-left ' +
            redRose.className
          }
        >
          Q1 - 2024
        </div>
        <ul className="text-left block text-sm font-[500] list-disc pl-3 mb-4">
          <li>Community Boosting </li>
          <li>Partners Collaboration Boosting </li>
          <li>Public Sale Starts </li>
          <li>Public Sale Ends </li>
          <li>Roadmap Updating </li>
        </ul>
      </div>
    </div>
  );
};

export default Roadmap;
