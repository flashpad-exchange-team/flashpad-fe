import Pencil from '@/icons/Pencil';
import React from 'react';

const FairLaunchpadProjectTokenInformation = ({
  values,
  handleChange,
  error,
}: any) => {
  return (
    <>
      <div className="text-2xl text-bold text-center mt-6">
        3. Token Infomation
      </div>
      <div className="flex flex-wrap">
        <div className="w-full ">
          <div className="mt-5 text-[#98A2B3]">Token Name</div>
          <div className="relative">
            <input
              className="w-full bg-darkBlue h-[44px] pl-3 text-sm  mb-2 mt-2 rounded-md focus:outline-none placeholder-[#667085]"
              placeholder="Typing"
              name="tokenName"
              value={values.tokenName}
              onChange={handleChange}
            />
            <div className="absolute right-[20px] bottom-[50%] transform translate-y-[50%]">
              <Pencil />
            </div>
            <div className="text-[#FF0000] pl-3">{error('tokenName')}</div>
          </div>
        </div>
        <div className="w-full">
          <div className="mt-5 text-[#98A2B3]">Token Symbol</div>
          <div className="relative">
            <input
              className="w-full bg-darkBlue h-[44px] pl-3 text-sm  mb-2 mt-2 rounded-md focus:outline-none placeholder-[#667085]"
              placeholder="Typing"
              name="tokenSymbol"
              value={values.tokenSymbol}
              onChange={handleChange}
            />
            <div className="absolute right-[20px] bottom-[50%] transform translate-y-[50%]">
              <Pencil />
            </div>
            <div className="text-[#FF0000] pl-3">{error('tokenSymbol')}</div>
          </div>
        </div>
        <div className="w-full">
          <div className="mt-5 text-[#98A2B3]">Initial Supply</div>
          <div className="relative">
            <input
              className="w-full bg-darkBlue h-[44px] pl-3 text-sm  mb-2 mt-2 rounded-md focus:outline-none placeholder-[#667085]"
              placeholder="Typing"
              name="tokenSupply"
              value={values.tokenSupply}
              onChange={handleChange}
            />
            <div className="absolute right-[20px] bottom-[50%] transform translate-y-[50%]">
              <Pencil />
            </div>
            <div className="text-[#FF0000] pl-3">{error('tokenSupply')}</div>
          </div>
        </div>
        <div className="w-full">
          <div className="mt-5 text-[#98A2B3]">
            Token Type (ERC-20, BEP-20, etc.)
          </div>
          <div className="relative">
            <input
              className="w-full bg-darkBlue h-[44px] pl-3 text-sm  mb-2 mt-2 rounded-md focus:outline-none placeholder-[#667085]"
              placeholder="Typing"
              name="tokenType"
              value={values.tokenType}
              onChange={handleChange}
            />
            <div className="absolute right-[20px] bottom-[50%] transform translate-y-[50%]">
              <Pencil />
            </div>
            <div className="text-[#FF0000] pl-3">{error('tokenType')}</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default FairLaunchpadProjectTokenInformation;
