import { Button } from '@/components/button/Button';
import ArrowRight from '@/icons/ArrowRight';
import PenCil from '@/icons/Pencil';
import Radio from '@/icons/Radio';
import { useState } from 'react';

const Launchpad = () => {
  const [index, setIndex] = useState(1);
  const handleChooseOption = (option: number) => {
    setIndex(option);
  };

  return (
    <>
      <div className="max-w-[1096px] p-8 md:p-0 w-full mx-auto">
        <div className="my-10 bg-dark px-4">
          <div className="w-full text-lg py-3 text-left">
            Support Request Form
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <div
              onClick={() => handleChooseOption(1)}
              className="h-[80px] w-full md:w-1/3 rounded-lg border border-[#150E39] flex items-center justify-center"
            >
              <Radio active={index === 1} />
              <span className={`ml-4 ${index === 1 ? '' : 'text-[#474747]'} `}>
                Ask For Funds
                <span className="opacity-0 md:hidden">coins</span>
              </span>
            </div>
            <div
              onClick={() => handleChooseOption(2)}
              className="h-[80px] w-full md:w-1/3 rounded-lg border border-[#150E39] flex items-center justify-center"
            >
              <Radio active={index === 2} />
              <span className={`ml-4 ${index === 2 ? '' : 'text-[#474747]'} `}>
                Ask for Incubator
                <span className="opacity-0 md:hidden">co</span>
              </span>
            </div>
            <div
              onClick={() => handleChooseOption(3)}
              className="h-[80px] w-full md:w-1/3 rounded-lg border border-[#150E39] flex items-center justify-center"
            >
              <Radio active={index === 3} />
              <span className={`ml-4 ${index === 3 ? '' : 'text-[#474747]'} `}>
                Ask for Partnership
              </span>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2">
              <div className="mt-5 text-[#98A2B3]">Name/Company</div>
              <div className="relative">
                <input
                  className="w-full bg-darkBlue h-[44px] pl-3 text-sm  mb-2 mt-2 rounded-md focus:outline-none placeholder-[#667085]"
                  placeholder="Typing"
                />
                <div className="absolute right-[20px] bottom-[50%] transform translate-y-[50%]">
                  <PenCil />
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 md:pl-3">
              <div className="mt-5 text-[#98A2B3]">Name/Company</div>
              <div className="relative">
                <input
                  className="w-full bg-darkBlue h-[44px] pl-3 text-sm  mb-2 mt-2 rounded-md focus:outline-none placeholder-[#667085]"
                  placeholder="Typing"
                />
                <div className="absolute right-[20px] bottom-[50%] transform translate-y-[50%]">
                  <PenCil />
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="mt-5 text-[#98A2B3]">Website</div>
              <div className="relative">
                <input
                  className="w-full bg-darkBlue h-[44px] pl-3 text-sm  mb-2 mt-2 rounded-md focus:outline-none placeholder-[#667085]"
                  placeholder="Typing"
                />
                <div className="absolute right-[20px] bottom-[50%] transform translate-y-[50%]">
                  <PenCil />
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 md:pl-3">
              <div className="mt-5 text-[#98A2B3]">Field of Activity</div>
              <div className="relative">
                <input
                  className="w-full bg-darkBlue h-[44px] pl-3 text-sm  mb-2 mt-2 rounded-md focus:outline-none placeholder-[#667085]"
                  placeholder="Typing"
                />
                <div className="absolute right-[20px] bottom-[50%] transform translate-y-[50%]">
                  <PenCil />
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="mt-5 text-[#98A2B3]">Telegram</div>
              <div className="relative">
                <input
                  className="w-full bg-darkBlue h-[44px] pl-3 text-sm  mb-2 mt-2 rounded-md focus:outline-none placeholder-[#667085]"
                  placeholder="Typing"
                />
                <div className="absolute right-[20px] bottom-[50%] transform translate-y-[50%]">
                  <PenCil />
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 md:pl-3">
              <div className="mt-5 text-[#98A2B3]">Email</div>
              <div className="relative">
                <input
                  className="w-full bg-darkBlue h-[44px] pl-3 text-sm  mb-2 mt-2 rounded-md focus:outline-none placeholder-[#667085]"
                  placeholder="Typing"
                />
                <div className="absolute right-[20px] bottom-[50%] transform translate-y-[50%]">
                  <PenCil />
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="mt-5 text-[#98A2B3]">Link Documents</div>
              <div className="relative">
                <input
                  className="w-full bg-darkBlue h-[44px] pl-3 text-sm  mb-2 mt-2 rounded-md focus:outline-none placeholder-[#667085]"
                  placeholder="Typing"
                />
                <div className="absolute right-[20px] bottom-[50%] transform translate-y-[50%]">
                  <PenCil />
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="mt-5 text-[#98A2B3]">Request Description</div>
              <textarea className="w-full bg-darkBlue h-[160px] pl-3 text-sm  mb-2 mt-2 rounded-md focus:outline-none placeholder-[#667085]" />
            </div>
          </div>
          <Button className="w-full md:w-1/6 justify-center my-4 h-[52px] text-base px-[42px]">
            Send <ArrowRight fill />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Launchpad;
