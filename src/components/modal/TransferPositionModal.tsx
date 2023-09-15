import DividerDown from '@/icons/DividerDown';
import CloseIcon from '@/icons/CloseIcon';
import { Button } from '../button/Button';
import CommonModal from './CommonModal';
import BNBICon from '@/icons/BNBIcon';
export interface TransferPositionModalProps {
  toggleOpen: () => void;
  isOpen: boolean;
  saveTimeLock: (value: number) => void;
}

const TransferPositionModal = ({
  toggleOpen,
  isOpen,
}: TransferPositionModalProps) => {
  const handleStake = () => {};

  return (
    <CommonModal isOpen={isOpen} onRequestClose={toggleOpen} width="550px">
      <div className="flex items-center justify-center w-full">
        <div className="text-sm mx-auto flex items-center justify-center">
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
            <div className="text-xs font-normal">#ID-1644</div>
          </div>
        </div>
        <div className="cursor-pointer pb-[20px]" onClick={toggleOpen}>
          <CloseIcon />
        </div>
      </div>
      <div className="text-[15px] text-center text-2xl">
        <span className="text-[#E6B300] font-bold">Transfer</span> your position
      </div>
      <div className="text-center text-secondary mb-5">
        Allocate TOKENS to your spNFT for more yield
      </div>
      <input
        className="w-full bg-darkBlue h-[44px] pl-3 text-sm mb-2 mt-2 rounded-md focus:outline-none placeholder-[#667085]"
        placeholder="0x..."
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
          onClick={handleStake}
          className="w-full justify-center mt-2 mb-2 h-[52px] text-base px-[42px]"
        >
          Transfer
        </Button>
      </div>

      <DividerDown />
    </CommonModal>
  );
};

export default TransferPositionModal;
