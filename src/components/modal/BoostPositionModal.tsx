import DividerDown from '@/icons/DividerDown';
import CloseIcon from '@/icons/CloseIcon';
import { Button } from '../button/Button';
import CommonModal from './CommonModal';
import BNBICon from '@/icons/BNBIcon';

export interface BoostPositionModalProps {
  toggleOpen: () => void;
  isOpen: boolean;
}

const BoostPositionModal = ({
  toggleOpen,
  isOpen,
}: BoostPositionModalProps) => {
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
      <div className="text-[15px] text-center text-[20px]">
        <span className="text-[#E6B300] font-bold">Boost</span> your position
      </div>
      <div className="text-center text-secondary mb-5 text-[12px]">
        Allocate TOKENS to your spNFT for more yield
      </div>
      <div className="block lg:flex items-center gap-2">
        <Button
          onClick={handleStake}
          className="w-full justify-center mt-2 mb-2 h-[52px] text-base px-[42px]"
        >
          Boost
        </Button>
        <Button
          className="w-full justify-center mt-2 mb-2 px-[42px]"
          type="secondary"
          onClick={toggleOpen}
        >
          Unboost
        </Button>
      </div>
      <div className="p-2 my-4 mb-5 bg-blue-opacity-50 text-center text-[#E6B300]">
        Get max bonus
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
          Approve
        </Button>
      </div>

      <DividerDown />
    </CommonModal>
  );
};

export default BoostPositionModal;
