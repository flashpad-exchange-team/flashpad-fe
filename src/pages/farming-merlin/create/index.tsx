import { Button } from '@/components/button/Button';
import Select from '@/components/select';
import BNBICon from '@/icons/BNBIcon';
import DividerDown from '@/icons/DividerDown';
import LiquidityIcon from '@/icons/LiquidityIcon';
import SwapLeftIcon from '@/icons/SwapLeft';
import SwapRightIcon from '@/icons/SwapRight';
import { CHAINS_TOKENS_LIST } from '@/utils/constants';
import { useState } from 'react';

const CreateMerlinPool = () => {
  const [type, setType] = useState(0);
  return (
    <div className="max-w-[648px] w-[calc(100%-26px)] bg-[#00000080] rounded-lg h-auto my-[50px] lg:my-[96px] mx-auto py-4 px-[24px]">
      <div className="text-[24px] font-bold mx-auto w-fit flex items-center gap-3">
        <SwapLeftIcon />
        Create Nitro Pool
        <SwapRightIcon />
      </div>
      <div className="text-[#98A2B3] text-[14px] mt-3 mb-2 font-semibold text-center">
        Custom-built infrastructure for Linea native public sales
      </div>
      <div className="flex bg-[#150E3980] mt-3 rounded-lg">
        <button
          className={`w-1/2 text-center py-3  rounded-md focus:outline-none font-semibold ${
            type === 0 ? 'bg-[#FFAF1D] border border-[#FFAF1D] text-black' : ''
          }`}
          onClick={() => setType(0)}
        >
          LP V2
        </button>
        <button
          className={`w-1/2 text-center py-3  rounded-md focus:outline-none font-semibold ${
            type === 1 ? 'bg-[#FFAF1D] border border-[#FFAF1D] text-black' : ''
          }`}
          onClick={() => setType(1)}
        >
          Single Asset
        </button>
      </div>
      <div className="flex gap-4 items-center mt-5">
        {type === 0 ? (
          <>
            {' '}
            <div
              className="w-full justify-between lg:w-[260px]  rounded-md bg-[#150E39] px-2 py-2 flex items-center gap-2 text-[14px] lg:text-[16px] "
              // onClick={handleOpenSelectTokenModal}
            >
              <Select
                options={CHAINS_TOKENS_LIST}
                value={{ value: 'ETH', label: 'ETH' }}
                icon={<BNBICon />}
                disabled
              />
            </div>
            <div
              className="mx-auto w-fit cursor-pointer"
              // onClick={handleSwitchPair}
            >
              <LiquidityIcon />
            </div>{' '}
            <div
              className="w-full justify-between lg:w-[260px]  rounded-md bg-[#150E39] px-2 py-2 flex items-center gap-2 text-[14px] lg:text-[16px] "
              // onClick={handleOpenSelectTokenModal}
            >
              <Select
                options={CHAINS_TOKENS_LIST}
                value={{ value: 'ETH', label: 'ETH' }}
                icon={<BNBICon />}
                disabled
              />
            </div>
          </>
        ) : (
          <div
            className="w-full rounded-md bg-[#150E39] px-2 py-2 text-[16px] "
            // onClick={handleOpenSelectTokenModal}
          >
            <Select
              options={CHAINS_TOKENS_LIST}
              value={{ value: 'ETH', label: 'ETH' }}
              icon={<BNBICon />}
              disabled
            />
          </div>
        )}
      </div>

      <div
        className="mx-auto w-fit mt-1 mb-4 hover:underline cursor-pointer flex items-center gap-2 text-[#98A2B3]"
        // onClick={handleClickViewExistingPosition}
      ></div>
      <Button
        onClick={() => {
          // feature === 'ADD LIQUIDITY'
          //   ? handleAddLiquidity()
          //   : handleCreatePosition();
        }}
        className="w-full justify-center  mb-2 px-[42px]"
        // disabled={
        //   !token1 || !token2 || !userAddress || !token1Amount || !token2Amount
        // }
      >
        Create Nitro
      </Button>
      <DividerDown />
    </div>
  );
};

export default CreateMerlinPool;
