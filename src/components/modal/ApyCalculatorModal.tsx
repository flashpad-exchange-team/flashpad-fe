import DividerDown from '@/icons/DividerDown';
import CloseIcon from '@/icons/CloseIcon';
import SwapLeftIcon from '@/icons/SwapLeft';
import SwapRightIcon from '@/icons/SwapRight';
import { Button } from '../button/Button';
import CommonModal from './CommonModal';

export interface ApyCalculatorModalProps {
  toggleOpen: () => void;
  isOpen: boolean;
  // saveTimeLock: (value: number) => void;
}

const ApyCalculatorModal = ({
  toggleOpen,
  isOpen,
}: ApyCalculatorModalProps) => {
  return (
    <CommonModal isOpen={isOpen} onRequestClose={toggleOpen}>
      <div className="flex items-center justify-between w-full">
        <div className="text-2xl text-bold mx-auto  w-fit flex items-center gap-3 justify-start ml-0 mr-auto mb-4">
          <SwapLeftIcon />
          APY Calculator
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
        <div className="text-[#E6B300] text-sm">Set max</div>
      </div>
      <div className="flex gap-3">
        <div className="flex items-center bg-blue-opacity-50 justify-center px-6 py-2">
          -
        </div>
        <input
          className="w-full bg-blue-opacity-50 h-[52px] pl-8 text-[15px] font-semibold py-2 focus:outline-none placeholder-[#667085]"
          placeholder="0"
        />
        <div className="flex items-center bg-blue-opacity-50 w-[50%] justify-end px-6 py-2">
          <div>Days</div>
        </div>
        <div>
          <Button className="w-[60px] rounded-none flex justify-center items-center rounded-[4px]">
            +
          </Button>
        </div>
      </div>
      <div className="flex justify-between">
        <div>Yield Booster</div>
        <div className="text-[#E6B300] text-sm">Set max bonus</div>
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
        <div>Thunder pool</div>
        <div className="text-secondary">No compatible Thunder</div>
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
        <div>Thunder APR</div>
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

export default ApyCalculatorModal;
