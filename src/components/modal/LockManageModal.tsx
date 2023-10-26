import DividerDown from '@/icons/DividerDown';
import CloseIcon from '@/icons/CloseIcon';
import SwapLeftIcon from '@/icons/SwapLeft';
import SwapRightIcon from '@/icons/SwapRight';
import { Button } from '../button/Button';
import CommonModal from './CommonModal';
import { useState } from 'react';
import customToast from '../notification/customToast';

export interface LockManageModalProps {
  toggleOpen: () => void;
  isOpen: boolean;
  saveTimeLock: (value: number) => void;
}

enum LockTimeOptions {
  TWO_WEEKS,
  ONE_MONTH,
  THREE_MONTHS,
  CUSTOM,
}

const LockManageModal = ({
  toggleOpen,
  isOpen,
  saveTimeLock,
}: LockManageModalProps) => {
  const [lockTime, setLockTime] = useState('0');
  const [lockTimeOption, setLockTimeOption] = useState<LockTimeOptions>(
    LockTimeOptions.CUSTOM
  );

  const is2WeeksSelected = lockTimeOption == LockTimeOptions.TWO_WEEKS;
  const is1MonthSelected = lockTimeOption == LockTimeOptions.ONE_MONTH;
  const is3MonthsSelected = lockTimeOption == LockTimeOptions.THREE_MONTHS;
  const isCustomSelected = lockTimeOption == LockTimeOptions.CUSTOM;

  const handleConfirmLock = () => {
    const nLockTime = Number(lockTime);
    if (Number.isNaN(nLockTime) || !Number.isInteger(nLockTime)) {
      customToast({
        message: 'Please input valid number',
        type: 'error',
      });
      return;
    }
    saveTimeLock(nLockTime);
    toggleOpen();
  };

  return (
    <CommonModal isOpen={isOpen} onRequestClose={toggleOpen}>
      <div className="flex items-center justify-between w-full">
        <div className="text-2xl text-bold mx-auto  w-fit flex items-center gap-3 justify-start ml-0 mr-auto mb-4">
          <SwapLeftIcon />
          Lock Manage
          <SwapRightIcon />
        </div>
        <div className="cursor-pointer" onClick={toggleOpen}>
          <CloseIcon />
        </div>
      </div>
      <div className="text-[15px]">Lock time (days)</div>
      <div className="flex gap-1 md:gap-2 items-center my-2">
        <div
          className="p-1 md:p-2 text-center bg-darkBlue cursor-pointer hover:border-[#E6B300] border w-1/4 text-xs md:text-sm"
          style={{ borderColor: is2WeeksSelected ? '#E6B300' : '#150E3980' }}
          onClick={() => {
            setLockTimeOption(LockTimeOptions.TWO_WEEKS);
            setLockTime('14');
          }}
        >
          2 WEEKS
        </div>
        <div
          className="p-1 md:p-2 text-center bg-darkBlue cursor-pointer hover:border-[#E6B300] border w-1/4 text-xs md:text-sm"
          style={{ borderColor: is1MonthSelected ? '#E6B300' : '#150E3980' }}
          onClick={() => {
            setLockTimeOption(LockTimeOptions.ONE_MONTH);
            setLockTime('30');
          }}
        >
          1 MONTH
        </div>
        <div
          className="p-1 md:p-2 text-center bg-darkBlue cursor-pointer hover:border-[#E6B300] border w-1/4 text-xs md:text-sm"
          style={{ borderColor: is3MonthsSelected ? '#E6B300' : '#150E3980' }}
          onClick={() => {
            setLockTimeOption(LockTimeOptions.THREE_MONTHS);
            setLockTime('90');
          }}
        >
          3 MONTHS
        </div>
        <div
          className="p-1 md:p-2 text-center bg-darkBlue cursor-pointer hover:border-[#E6B300] border w-1/4 text-xs md:text-sm"
          style={{ borderColor: isCustomSelected ? '#E6B300' : '#150E3980' }}
          onClick={() => {
            setLockTimeOption(LockTimeOptions.CUSTOM);
          }}
        >
          CUSTOM
        </div>
      </div>
      <input
        className="w-full bg-darkBlue h-[44px] pl-3 text-sm  mb-2 mt-2 rounded-md focus:outline-none placeholder-[#667085]"
        value={lockTime}
        disabled={!isCustomSelected}
        onChange={(e) => setLockTime(e.target.value)}
        placeholder="Enter the number of lock days "
      />
      <div className="block lg:flex items-center gap-2">
        <Button
          className="w-full justify-center mt-2 mb-2 px-[42px]"
          type="secondary"
          onClick={toggleOpen}
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirmLock}
          className="w-full justify-center mt-2 mb-2 h-[52px] text-base px-[42px]"
        >
          Confirm Lock
        </Button>
      </div>

      <DividerDown />
    </CommonModal>
  );
};

export default LockManageModal;
