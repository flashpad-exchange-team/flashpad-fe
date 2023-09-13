import DividerDown from '@/icons/DividerDown';
import CloseIcon from '@/icons/CloseIcon';
import { Button } from '../button/Button';
import CommonModal from './CommonModal';
import BNBICon from '@/icons/BNBIcon';

export interface SplitPositionModalProps {
  toggleOpen: () => void;
  isOpen: boolean;
  saveTimeLock: (value: number) => void;
}

const SplitPositionModal = ({
  toggleOpen,
  isOpen,
}: SplitPositionModalProps) => {
  const handleStake = () => {};

  return (
    <CommonModal isOpen={isOpen} onRequestClose={toggleOpen} width="40vw">
      <div className="flex items-center justify-center w-full">
        <div className="text-[14px] mx-auto flex items-center justify-center">
          <div className="relative -mt-[30px]">
            <div className="absolute">
              <BNBICon size={34} />
            </div>
            <div className="absolute left-[25px]">
              <BNBICon size={34} />
            </div>
          </div>
          <div className="ml-[70px]">
            <div className="text-bold">Token A - Token B</div>
            <div className="text-[12px] font-normal">#ID-1644</div>
          </div>
        </div>
        <div className="cursor-pointer pb-[20px]" onClick={toggleOpen}>
          <CloseIcon />
        </div>
      </div>
      <div className="text-[15px] text-center text-[24px]">
        <span className="text-[#E6B300] font-bold">Split</span> your position
      </div>
      <div className="text-center text-[#667085] mb-5">
        Send your spNFT to a new address
      </div>
      <div className="p-2 my-4 mb-5 bg-blue-opacity-50">Amount to split</div>
      <div className="p-2 bg-blue-opacity-50 flex justify-between">
        <div className="text-[#98A2B3]">Amount</div>
        <div>0.0000000004564</div>
      </div>
      <div className="px-2 bg-blue-opacity-50 flex justify-between">
        <div className="text-[#fff]">Balance: 0.0000000000 Name - Name</div>
        <Button className="w-[50px] h-[10px] rounded-none flex justify-center items-center">
          Max
        </Button>
      </div>
      <div className="text-right text-[#667085] my-4">
        split table amount: 0.000000000000456 NAME - NAME
      </div>
      <div className="block lg:flex items-center gap-2">
        <Button
          className="w-full justify-center mt-2 mb-2 px-[42px]"
          type="secondary"
          onClick={toggleOpen}
        >
          Cancel
        </Button>
        <Button
          onClick={handleStake}
          className="w-full justify-center mt-2 mb-2 h-[52px] text-[16px] px-[42px]"
        >
          Split
        </Button>
      </div>

      <DividerDown />
    </CommonModal>
  );
};

export default SplitPositionModal;
