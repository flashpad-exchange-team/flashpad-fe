import Pencil from '@/icons/Pencil';
import React from 'react';

export const FairLaunchpadProjectTeamInformation = ({
  values,
  handleChange,
}: any) => {
  return (
    <>
      <div className="text-2xl text-bold text-center mt-6">
        2. Team Infomation
      </div>
      <div className="flex flex-wrap">
        <div className="w-full ">
          <div className="mt-5 text-[#98A2B3]">Lead Contact Name</div>
          <div className="relative">
            <input
              className="w-full bg-darkBlue h-[44px] pl-3 text-sm  mb-2 mt-2 rounded-md focus:outline-none placeholder-[#667085]"
              placeholder="Typing"
              name="teamName"
              value={values.teamName}
              onChange={handleChange}
            />
            <div className="absolute right-[20px] bottom-[50%] transform translate-y-[50%]">
              <Pencil />
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="mt-5 text-[#98A2B3]">Lead Contact Email</div>
          <div className="relative">
            <input
              className="w-full bg-darkBlue h-[44px] pl-3 text-sm  mb-2 mt-2 rounded-md focus:outline-none placeholder-[#667085]"
              placeholder="Typing"
              name="teamEmail"
              value={values.teamEmail}
              onChange={handleChange}
            />
            <div className="absolute right-[20px] bottom-[50%] transform translate-y-[50%]">
              <Pencil />
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="mt-5 text-[#98A2B3]">
            Team Background and Experience
          </div>
          <div className="relative">
            <input
              className="w-full bg-darkBlue h-[44px] pl-3 text-sm  mb-2 mt-2 rounded-md focus:outline-none placeholder-[#667085]"
              placeholder="Typing"
              name="teamExp"
              value={values.teamExp}
              onChange={handleChange}
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
