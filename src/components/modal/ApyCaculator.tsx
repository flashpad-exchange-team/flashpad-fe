import DividerDown from '@/icons/DividerDown';
import CloseIcon from '@/icons/CloseIcon';
import SwapLeftIcon from '@/icons/SwapLeft';
import SwapRightIcon from '@/icons/SwapRight';
import { Button } from '../button/Button';
import CommonModal from './CommonModal';

export interface LockManageModalProps {
  toggleOpen: () => void;
  isOpen: boolean;
  saveTimeLock: (value: number) => void;
}

const ApyCaculator = ({ toggleOpen, isOpen }: LockManageModalProps) => {
  return (
    <CommonModal isOpen={isOpen} onRequestClose={toggleOpen} height="92vh">
      <div className="flex items-center justify-between w-full">
        <div className="text-[24px] text-bold mx-auto  w-fit flex items-center gap-3 justify-start ml-0 mr-auto mb-4">
          <SwapLeftIcon />
          APY Caculator
          <SwapRightIcon />
        </div>
        <div className="cursor-pointer" onClick={toggleOpen}>
          <CloseIcon />
        </div>
      </div>
      <div>Deposit USD value</div>
      <div className="px-2 pt-4 bg-blue-opacity-50 flex justify-between mt-2">
        <div className="text-[#98A2B3]">Amount</div>
        <div>0</div>
      </div>
      <div className="px-2 pb-4 bg-blue-opacity-50 flex justify-between mb-2">
        <div className="text-[#fff]">Balance: 0</div>
        <Button className="w-[50px] h-[10px] rounded-none flex justify-center items-center">
          Max
        </Button>
      </div>
      <div className="flex justify-between mb-2">
        <div className="">Lock duration</div>
        <div className="text-[#E6B300] text-[14px]">Set max</div>
      </div>
      <div className="flex gap-3">
        <div className="flex items-center bg-blue-opacity-50 justify-center px-6 py-2 mr-2">
          -
        </div>
        <div className="flex items-center bg-blue-opacity-50 w-[40%] justify-end px-6 py-2">
          <span className="text-[#E6B300] mr-4">0</span> Days
        </div>
        <div className="flex items-center bg-blue-opacity-50 w-[40%] justify-end px-6 py-2">
          <span className="text-[#E6B300] mr-4">0</span> Months
        </div>
        <div>
          <Button className="w-[60px] rounded-none flex justify-center items-center rounded-[4px]">
            +
          </Button>
        </div>
      </div>
      <div className="flex justify-between">
        <div>Yield Booster</div>
        <div className="text-[#E6B300] text-[14px]">Set max bonus</div>
      </div>
      <div className="px-2 pt-4 bg-blue-opacity-50 flex justify-between mt-2">
        <div className="text-[#98A2B3]">Amount</div>
        <div>0</div>
      </div>
      <div className="px-2 pb-4 bg-blue-opacity-50 flex justify-between mb-2">
        <div className="text-[#fff]">Balance: 0</div>
        <Button className="w-[50px] h-[10px] rounded-none flex justify-center items-center">
          Max
        </Button>
      </div>

      <div className="p-2 bg-blue-opacity-50 flex justify-between mt-2">
        <div>Nitro pool</div>
        <div className="text-[#667085]">No compatible Nitro</div>
      </div>

      <div className="my-2">Estimates</div>

      <div className="flex justify-between mb-2">
        <div>Projected total APY</div>
        <div className="text-[#E6B300]">5.88%</div>
      </div>
      <div className="flex justify-between mb-2">
        <div>Projected yearly earning</div>
        <div>5.88%</div>
      </div>
      <div className="flex justify-between mb-2">
        <div>Earned fees APR</div>
        <div>5.88%</div>
      </div>
      <div className="flex justify-between mb-2">
        <div>Farm base APR</div>
        <div>5.88%</div>
      </div>
      <div className="flex justify-between mb-2">
        <div>Nitro APR</div>
        <div>5.88%</div>
      </div>
      <div className="flex justify-between mb-2">
        <div>Total APR</div>
        <div>5.88%</div>
      </div>

      <div className="block lg:flex items-center gap-2">
        <Button
          className="w-full justify-center mt-2 mb-2 px-[42px]"
          type="secondary"
          onClick={toggleOpen}
        >
          Close
        </Button>
      </div>

      <DividerDown />
    </CommonModal>
  );
};

export default ApyCaculator;
