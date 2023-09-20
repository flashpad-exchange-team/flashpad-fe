import Pencil from '@/icons/Pencil';
import React from 'react';

const FairLaunchpadProjectDetail = ({ values, handleChange }: any) => {
  console.log(values, 'values');
  return (
    <>
      <div className="text-2xl text-bold text-center mt-6">
        1. Project Details:
      </div>
      <div className="flex flex-wrap">
        <div className="w-full ">
          <div className="mt-5 text-[#98A2B3]">Project Name</div>
          <div className="relative">
            <input
              className="w-full bg-darkBlue h-[44px] pl-3 text-sm  mb-2 mt-2 rounded-md focus:outline-none placeholder-[#667085]"
              placeholder="Typing"
              value={values.projectName}
              onChange={handleChange}
              name="projectName"
            />
            <div className="absolute right-[20px] bottom-[50%] transform translate-y-[50%]">
              <Pencil />
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="mt-5 text-[#98A2B3]">Project Website</div>
          <div className="relative">
            <input
              className="w-full bg-darkBlue h-[44px] pl-3 text-sm  mb-2 mt-2 rounded-md focus:outline-none placeholder-[#667085]"
              placeholder="Typing"
              value={values.projectWebsite}
              onChange={handleChange}
              name="projectWebsite"
            />
            <div className="absolute right-[20px] bottom-[50%] transform translate-y-[50%]">
              <Pencil />
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="mt-5 text-[#98A2B3]">Project Description</div>
          <div className="relative">
            <input
              className="w-full bg-darkBlue h-[44px] pl-3 text-sm  mb-2 mt-2 rounded-md focus:outline-none placeholder-[#667085]"
              placeholder="Typing"
              value={values.projectDescription}
              onChange={handleChange}
              name="projectDescription"
            />
            <div className="absolute right-[20px] bottom-[50%] transform translate-y-[50%]">
              <Pencil />
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="mt-5 text-[#98A2B3]">
            Project Category (DeFi, NFTs, Gaming, etc.)
          </div>
          <div className="relative">
            <input
              className="w-full bg-darkBlue h-[44px] pl-3 text-sm  mb-2 mt-2 rounded-md focus:outline-none placeholder-[#667085]"
              placeholder="Typing"
              value={values.projectCategory}
              onChange={handleChange}
              name="projectCategory"
            />
            <div className="absolute right-[20px] bottom-[50%] transform translate-y-[50%]">
              <Pencil />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FairLaunchpadProjectDetail;
