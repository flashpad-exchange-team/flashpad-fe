import DividerDown from '@/icons/DividerDown';
import CloseIcon from '@/icons/CloseIcon';
import { Button } from '../button/Button';
import CommonModal from './CommonModal';
import BNBICon from '@/icons/BNBIcon';
import CurrencyDollar from '@/icons/CurrencyDollar';
import SaleIcon from '@/icons/SaleIcon';
import CalendarIcon from '@/icons/CalendarIcon';
import UnlockIcon from '@/icons/UnlockIcon';

export interface StakeIntoMerlinModalProps {
  toggleOpen: () => void;
  isOpen: boolean;
  saveTimeLock: (value: number) => void;
}

const StakeIntoMerlinModal = ({ toggleOpen, isOpen }: StakeIntoMerlinModalProps) => {
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
        <span className="text-[#E6B300] font-bold">Boost</span> your position
      </div>
      <div className="text-center text-secondary mb-5">
        Allocate TOKENS to your spNFT for more yield
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="relative -mt-[30px]">
            <div className="absolute">
              <BNBICon size={34} />
            </div>
            <div className="absolute left-[25px]">
              <BNBICon size={34} />
            </div>
          </div>
          <div className="text-bold ml-[70px]">Token A - Token B</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="rounded-full bg-[#E6B300] h-5 w-5"></div>
          <div className="text-secondary">Rewards</div>
        </div>
      </div>
      <div className="flex mt-4">
        <div className="flex items-center">
          <CurrencyDollar />
          <div className="pl-1">$1.1M</div>
          <div className="pl-1 text-secondary">TVL</div>
        </div>
        <div className="flex items-center pl-5">
          <SaleIcon />
          <div className="pl-1">24.88%</div>
          <div className="pl-1 text-secondary">Bonus APR</div>
        </div>
      </div>
      <div className="flex my-4">
        <CalendarIcon />
        <div className="pl-2 text-secondary">Ends in 14 days</div>
      </div>
      <div className="flex my-4">
        <UnlockIcon />
        <div className="pl-2 text-secondary">No requirement</div>
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
          Stake
        </Button>
      </div>

      <DividerDown />
    </CommonModal>
  );
};

export default StakeIntoMerlinModal;
