import DividerDown from '@/icons/DividerDown';
import CloseIcon from '@/icons/CloseIcon';
import { Button } from '../button/Button';
import CommonModal from './CommonModal';
import BNBICon from '@/icons/BNBIcon';
import ArrowRight from '@/icons/ArrowRight';
import Error from '@/icons/Error';

export interface AddToPositionModalProps {
  toggleOpen: () => void;
  isOpen: boolean;
  saveTimeLock: (value: number) => void;
}

const AddToPositionModal = ({
  toggleOpen,
  isOpen,
}: AddToPositionModalProps) => {
  const handleStake = () => {};

  return (
    <CommonModal isOpen={isOpen} onRequestClose={toggleOpen} width="600px">
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
        <span className="text-[#E6B300] font-bold">Add</span> to your position
      </div>
      <div className="text-center text-secondary mb-5">
        Deposit more into this spNFT to increase your yield.
      </div>
      <div className="text-center">More action</div>
      <div className="text-sm my-4">
        You need to own NAME - NAME LP tokens to directly add more liquidity to
        this position. If that’s not the case, head to the liquidity page that.
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
      <div className="py-2 bg-blue-opacity-50">
        <div className="text-[#fff]">Estimates</div>
      </div>
      <div className="flex justify-between my-5">
        <div>Deposit value</div>
        <div>$0</div>
      </div>
      <div className="flex justify-between mb-5">
        <div>Total APR</div>
        <div className="flex items-center">
          <div className="text-secondary">20.3%</div>
          <ArrowRight />
          <div className="text-primary">20.3%</div>
        </div>
      </div>
      <div className="px-2 py-4 flex items-center bg-blue-opacity-50">
        <Error stroke="#fff" />
        <div className="text-sm pl-2">
          By making a new deposit on this position, you will renew its lock for
          4 days from now
        </div>
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
          Add to Position
        </Button>
      </div>

      <DividerDown />
    </CommonModal>
  );
};

export default AddToPositionModal;
