import DividerDown from '@/icons/DividerDown';
import CloseIcon from '@/icons/CloseIcon';
import { Button } from '../button/Button';
import CommonModal from './CommonModal';
import BNBICon from '@/icons/BNBIcon';
import ArrowRight from '@/icons/ArrowRight';

export interface RenewPositionModalProps {
  toggleOpen: () => void;
  isOpen: boolean;
  saveTimeLock: (value: number) => void;
}

const RenewPositionModal = ({
  toggleOpen,
  isOpen,
}: RenewPositionModalProps) => {
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
      <div className="text-center text-2xl">
        <span className="text-[#E6B300] font-bold">Renew</span> the lock of your
        position
      </div>
      <div className="text-center text-secondary mb-5 text-sm">
        Provide long-tern liquidity to increase your yield
      </div>
      <div className="p-2 bg-blue-opacity-50 text-sm">
        <div className="text-[#fff]">Settings</div>
      </div>
      <div className="flex justify-between mt-3">
        <div className="">Lock duration</div>
        <div className="text-[#E6B300] text-sm">Set max</div>
      </div>
      <div className="flex gap-0 md:gap-3">
        <div className="flex items-center bg-blue-opacity-50 justify-center px-6 py-2 mr-0">
          -
        </div>
        <div className="flex items-center bg-blue-opacity-50 w-[30%] md:w-[40%] justify-end px-6 py-2">
          <span className="text-[#E6B300] mr-4">0</span> Days
        </div>
        <div className="flex items-center bg-blue-opacity-50 w-[35%] md:w-[40%] justify-end px-6 py-2">
          <span className="text-[#E6B300] mr-4">0</span> Months
        </div>
        <div>
          <Button className="w-[60px] rounded-none flex justify-center items-center rounded-[4px]">
            +
          </Button>
        </div>
      </div>
      <div className="text-right text-secondary text-sm">
        4.37% lock bonus (x1.04)
      </div>
      <div className="p-2 bg-blue-opacity-50 my-4">
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
      <div className="flex justify-between my-3">
        <div>Swap fees APR</div>
        <div>10.11%</div>
      </div>
      <div className="flex justify-between my-3">
        <div>Farm base APR</div>
        <div>23.55%</div>
      </div>
      <div className="flex justify-between my-3">
        <div>Lock bonus APR</div>
        <div className="flex items-center">
          <div className="text-secondary">20.3%</div>
          <ArrowRight />
          <div>20.3%</div>
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
          Create
        </Button>
      </div>

      <DividerDown />
    </CommonModal>
  );
};

export default RenewPositionModal;
