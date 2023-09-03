import ArrowDownBig from '@/icons/ArrowDownBig';
import BNBICon from '@/icons/BNBIcon';
import ButtonStyle from '@/icons/ButtonStyle';
import CloseIcon from '@/icons/CloseIcon';
import SwapLeftIcon from '@/icons/SwapLeft';
import SwapRightIcon from '@/icons/SwapRight';
import { useState } from 'react';
import { Button } from '../button/Button';
import CommonModal from './CommonModal';

export interface CreatePositionModalProps {
  isOpen: boolean;
  toggleOpen: () => void;
}

enum LockTimeOptions {
  TWO_WEEKS,
  ONE_MONTH,
  THREE_MONTHS,
  CUSTOM,
}

const CreatePositionModal = ({
  toggleOpen,
  isOpen,
}: CreatePositionModalProps) => {
  const [lockTime, setLockTime] = useState('14');
  const [lockTimeOption, setLockTimeOption] = useState<LockTimeOptions>(
    LockTimeOptions.TWO_WEEKS
  );

  const is2WeeksSelected = lockTimeOption == LockTimeOptions.TWO_WEEKS;
  const is1MonthSelected = lockTimeOption == LockTimeOptions.ONE_MONTH;
  const is3MonthsSelected = lockTimeOption == LockTimeOptions.THREE_MONTHS;
  const isCustomSelected = lockTimeOption == LockTimeOptions.CUSTOM;
  return (
    <CommonModal isOpen={isOpen} onRequestClose={toggleOpen} height="666px">
      <div className="flex items-center justify-between w-full">
        <div className="text-[24px] text-bold mx-auto  w-fit flex items-center gap-3 justify-start ml-0 mr-auto mb-4">
          <SwapLeftIcon />
          Create position
          <SwapRightIcon />
        </div>
        <div className="cursor-pointer" onClick={toggleOpen}>
          <CloseIcon />
        </div>
      </div>
      <div className="text-[16px] font-semibold mb-3 flex items-center gap-2 w-fit mx-auto">
        <BNBICon size="54" />
        <div>
          <div className="text-[14px]"> Token</div>
          <div className="text-[22px] flex items-center gap-2">
            USDC <ArrowDownBig />
          </div>
        </div>
      </div>
      <div className="text-[15px]">Amount</div>
      <div className="relative">
        <input
          className="w-full bg-[#150E3980] h-[44px] pl-3 text-[14px]  mb-2 mt-2 rounded-md focus:outline-none placeholder-[#667085]"
          placeholder="Enter value "
        />
        <div
          className="text-[12px] font-semibold text-[#0C111D] bg-[#FFAF1D] flex items-center justify-center w-[42px] h-[18px] cursor-pointer absolute top-[20px] right-[20px]"
          // onClick={() => setAmountToRemove(totalLiquidity)}
        >
          Max
        </div>
      </div>
      <div className=" mb-3 text-[15px]">Balance: 0</div>
      <div className="text-[15px]">Lock duration (days)</div>
      <div className="flex gap-2 items-center my-2">
        <div
          className={`p-2 text-center bg-[#150E3980] cursor-pointer border-[${
            is2WeeksSelected ? '#E6B300' : '#150E3980'
          }] hover:border-[#E6B300] border w-1/4 text-[14px]`}
          onClick={() => {
            setLockTimeOption(LockTimeOptions.TWO_WEEKS);
            setLockTime('14');
          }}
        >
          2 WEEKS
        </div>
        <div
          className={`p-2 text-center bg-[#150E3980] cursor-pointer border-[${
            is1MonthSelected ? '#E6B300' : '#150E3980'
          }] hover:border-[#E6B300] border w-1/4 text-[14px]`}
          onClick={() => {
            setLockTimeOption(LockTimeOptions.ONE_MONTH);
            setLockTime('30');
          }}
        >
          1 MONTH
        </div>
        <div
          className={`p-2 text-center bg-[#150E3980] cursor-pointer border-[${
            is3MonthsSelected ? '#E6B300' : '#150E3980'
          }] hover:border-[#E6B300] border w-1/4 text-[14px]`}
          onClick={() => {
            setLockTimeOption(LockTimeOptions.THREE_MONTHS);
            setLockTime('90');
          }}
        >
          3 MONTHS
        </div>
        <div
          className={`p-2 text-center bg-[#150E3980] cursor-pointer border-[${
            isCustomSelected ? '#E6B300' : '#150E3980'
          }] hover:border-[#E6B300] border w-1/4 text-[14px]`}
          onClick={() => {
            setLockTimeOption(LockTimeOptions.CUSTOM);
          }}
        >
          CUSTOM
        </div>
      </div>
      <input
        className="w-full bg-[#150E3980] h-[44px] pl-3 text-[14px]  mb-2 mt-2 rounded-md focus:outline-none placeholder-[#667085]"
        value={lockTime}
        disabled={!isCustomSelected}
        onChange={(e) => setLockTime(e.target.value)}
        placeholder="Enter the number of lock days "
      />
      <div className="text-[16px] font-semibold mt-2">Estimates</div>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[14px] mt-1 ">Deposit value</div>
          <div className="text-[14px] mt-1 ">Total APR</div>
          <div className="text-[14px] mt-1 ">Farm base APR</div>
          <div className="text-[14px] mt-1 ">Farm bonus APR</div>
          <div className="text-[14px] mt-1 ">Earned fees APR</div>
        </div>
        <div>
          <div className="text-[14px] mt-1 text-right ">0</div>{' '}
          <div className="text-[14px] mt-1 text-right text-[#FFAF1D] ">0%</div>
          <div className="text-[14px] mt-1 text-right ">0%</div>
          <div className="text-[14px] mt-1 text-right ">0%</div>
          <div className="text-[14px] mt-1 text-right ">0%</div>
        </div>
      </div>
      <div className="block lg:flex items-center gap-2">
        <Button className="w-full justify-center mt-2 mb-2 h-[52px] text-[16px] px-[42px]">
          Create
        </Button>
      </div>

      <ButtonStyle />
    </CommonModal>
  );
};

export default CreatePositionModal;
