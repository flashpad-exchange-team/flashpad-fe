import ButtonStyle from '@/icons/ButtonStyle';
import CloseIcon from '@/icons/CloseIcon';
import SwapLeftIcon from '@/icons/SwapLeft';
import SwapRightIcon from '@/icons/SwapRight';
import { Button } from '../button/Button';
import CommonModal from './CommonModal';

export interface ILockManages {
  slippage: number;
  deadline: number;
  maxHops: number;
}

export interface LockManageModalProps {
  toggleOpen: () => void;
  isOpen: boolean;
}

const LockManageModal = ({ toggleOpen, isOpen }: LockManageModalProps) => {
  return (
    <CommonModal isOpen={isOpen} onRequestClose={toggleOpen} height="420px">
      <div className="flex items-center justify-between w-full">
        <div className="text-[24px] text-bold mx-auto  w-fit flex items-center gap-3 justify-start ml-0 mr-auto mb-4">
          <SwapLeftIcon />
          Lock Manage
          <SwapRightIcon />
        </div>
        <div className="cursor-pointer" onClick={toggleOpen}>
          <CloseIcon />
        </div>
      </div>
      <div className="text-[15px]">Select Pool</div>
      <input
        className="w-full bg-[#150E3980] h-[44px] pl-3 text-[14px]  mb-2 mt-2 rounded-md focus:outline-none placeholder-[#667085]"
        placeholder="Enter value "
      />
      <div className="text-[15px]">Lock time</div>
      <div className="flex gap-2 items-center my-2">
        <div className="p-2 text-center bg-[#150E3980] cursor-pointer border-[#150E3980] hover:border-[#E6B300] border w-1/4 text-[14px]">
          2 WEEKS
        </div>
        <div className="p-2 text-center bg-[#150E3980] cursor-pointer border-[#150E3980] hover:border-[#E6B300] border w-1/4 text-[14px]">
          1 MONTH
        </div>
        <div className="p-2 text-center bg-[#150E3980] cursor-pointer border-[#150E3980] hover:border-[#E6B300] border w-1/4 text-[14px]">
          3 MONTHS
        </div>
        <div className="p-2 text-center bg-[#150E3980] cursor-pointer border-[#150E3980] hover:border-[#E6B300] border w-1/4 text-[14px]">
          CUSTOM
        </div>
      </div>
      <input
        className="w-full bg-[#150E3980] h-[44px] pl-3 text-[14px]  mb-2 mt-2 rounded-md focus:outline-none placeholder-[#667085]"
        placeholder="Enter the number of lock days "
      />
      <div className="block lg:flex items-center gap-2">
        <Button
          className="w-full justify-center mt-2 mb-2 px-[42px]"
          type="secondary"
        >
          Cancel
        </Button>
        <Button
          onClick={toggleOpen}
          className="w-full justify-center mt-2 mb-2 h-[52px] text-[16px] px-[42px]"
        >
          Confirm Lock
        </Button>
      </div>

      <ButtonStyle />
    </CommonModal>
  );
};

export default LockManageModal;
