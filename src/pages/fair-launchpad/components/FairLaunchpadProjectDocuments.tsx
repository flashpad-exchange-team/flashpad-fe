import Pencil from '@/icons/Pencil';
import React from 'react';

export const FairLaunchpadProjectDocuments = ({
  values,
  handleChange,
}: any) => {
  return (
    <>
      <div className="text-2xl text-bold text-center mt-6">
        8. Additional Documents
      </div>
      <div className="flex flex-wrap">
        <div className="w-full ">
          <div className="mt-5 text-[#98A2B3]">Whitepaper (Link)</div>
          <div className="relative">
            <input
              className="w-full bg-darkBlue h-[44px] pl-3 text-sm  mb-2 mt-2 rounded-md focus:outline-none placeholder-[#667085]"
              placeholder="Typing"
              name="documentsWhitepaper"
              value={values.documentsWhitepaper}
              onChange={handleChange}
            />
            <div className="absolute right-[20px] bottom-[50%] transform translate-y-[50%]">
              <Pencil />
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="mt-5 text-[#98A2B3]">Pitch Deck (Link)</div>
          <div className="relative">
            <input
              className="w-full bg-darkBlue h-[44px] pl-3 text-sm  mb-2 mt-2 rounded-md focus:outline-none placeholder-[#667085]"
              placeholder="Typing"
              name="documentsPitchDeck"
              value={values.documentsPitchDeck}
              onChange={handleChange}
            />
            <div className="absolute right-[20px] bottom-[50%] transform translate-y-[50%]">
              <Pencil />
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="mt-5 text-[#98A2B3]">
            Technical Documentation (if available)
          </div>
          <div className="relative">
            <input
              className="w-full bg-darkBlue h-[44px] pl-3 text-sm  mb-2 mt-2 rounded-md focus:outline-none placeholder-[#667085]"
              placeholder="Typing"
              name="documentsTechnical"
              value={values.documentsTechnical}
              onChange={handleChange}
            />
            <div className="absolute right-[20px] bottom-[50%] transform translate-y-[50%]">
              <Pencil />
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="mt-5 text-[#98A2B3]">
            Legal and Compliance Information (Link)
          </div>
          <div className="relative">
            <input
              className="w-full bg-darkBlue h-[44px] pl-3 text-sm  mb-2 mt-2 rounded-md focus:outline-none placeholder-[#667085]"
              placeholder="Typing"
              name="documentsLegal"
              value={values.documentsLegal}
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
