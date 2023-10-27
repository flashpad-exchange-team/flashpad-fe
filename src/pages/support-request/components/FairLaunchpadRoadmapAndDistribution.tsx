import Pencil from '@/icons/Pencil';
import React, { FC } from 'react';
import { FormHandler } from '..';

interface FairLaunchpadProps {
  values: {
    roadMapLink: string;
    roadMapInfo: string;
    tokenomicLink: string;
  };
  handleChange: FormHandler;
  error: (value: string) => (string | undefined)[];
}

const FairLaunchpadRoadmapAndDistribution: FC<FairLaunchpadProps> = ({
  values,
  handleChange,
  error,
}) => {
  return (
    <>
      <div className="text-lg text-bold text-center mt-6">
        5. Roadmap and Milestones
      </div>
      <div className="flex flex-wrap">
        <div className="w-full ">
          <div className="mt-5 text-[#98A2B3]">Roadmap (Link)</div>
          <div className="relative">
            <input
              className="w-full bg-darkBlue h-[44px] pl-3 text-sm  mb-2 mt-2 rounded-md focus:outline-none placeholder-[#667085]"
              placeholder="Typing"
              name="roadMapLink"
              value={values.roadMapLink}
              onChange={handleChange}
            />
            <div className="absolute right-[20px] bottom-[50%] transform translate-y-[50%]">
              <Pencil />
            </div>
            <div className="text-[#FF0000]">{error('roadMapLink')}</div>
          </div>
        </div>
        <div className="w-full">
          <div className="mt-5 text-[#98A2B3]">Additional Info</div>
          <div className="relative">
            <input
              className="w-full bg-darkBlue h-[44px] pl-3 text-sm  mb-2 mt-2 rounded-md focus:outline-none placeholder-[#667085]"
              placeholder="Typing"
              name="roadMapInfo"
              value={values.roadMapInfo}
              onChange={handleChange}
            />
            <div className="absolute right-[20px] bottom-[50%] transform translate-y-[50%]">
              <Pencil />
            </div>
            <div className="text-[#FF0000]">{error('roadMapInfo')}</div>
          </div>
        </div>
      </div>
      <div className="text-2xl text-bold text-center mt-6">
        6. Tokenomics and Distribution
      </div>
      <div className="flex flex-wrap">
        <div className="w-full ">
          <div className="mt-5 text-[#98A2B3]">Tokenomic (Link)</div>
          <div className="relative">
            <input
              className="w-full bg-darkBlue h-[44px] pl-3 text-sm  mb-2 mt-2 rounded-md focus:outline-none placeholder-[#667085]"
              placeholder="Typing"
              name="tokenomicLink"
              value={values.tokenomicLink}
              onChange={handleChange}
            />
            <div className="absolute right-[20px] bottom-[50%] transform translate-y-[50%]">
              <Pencil />
            </div>
            <div className="text-[#FF0000]">{error('tokenomicLink')}</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default FairLaunchpadRoadmapAndDistribution;
