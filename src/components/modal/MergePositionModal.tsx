import DividerDown from '@/icons/DividerDown';
import CloseIcon from '@/icons/CloseIcon';
import { Button } from '../button/Button';
import CommonModal from './CommonModal';
import BNBICon from '@/icons/BNBIcon';
import CurrencyDollar from '@/icons/CurrencyDollar';
import LaunchPadIcon from '@/icons/LaunchpadIcon';
import Lock from '@/icons/Lock';
import ChartBreakoutIcon from '@/icons/ChartBreakoutIcon';
import Eligibility from '@/icons/Eligibility';

export interface MergePositionModalProps {
  toggleOpen: () => void;
  isOpen: boolean;
  saveTimeLock: (value: number) => void;
}

const MergePositionModal = ({
  toggleOpen,
  isOpen,
}: MergePositionModalProps) => {
  const handleStake = () => {};

  return (
    <CommonModal isOpen={isOpen} onRequestClose={toggleOpen} width="40vw">
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
        <span className="text-[#E6B300] font-bold">Merge</span> multiple
        positions
      </div>
      <div className="text-center text-secondary mb-5">
        Regroup spNFTs into a single one
      </div>
      <div className="p-2 my-4 mb-5 bg-blue-opacity-50">Select positions</div>
      <div className="m-2 flex justify-between">
        <div>NAME - NAME</div>
        <div className="text-sm text-[#E6B300]">Unselect all</div>
      </div>
      <div className="bg-blue-opacity-50 p-2 flex justify-between items-center my-4">
        <div className="text-sm">Balance: 0</div>
        <div className="">
          <div>0.002</div>
          <div className="text-secondary text-xs">$0.19</div>
        </div>
        <div className="flex items-center">
          <CurrencyDollar />
          <Lock />
          <LaunchPadIcon />
          <ChartBreakoutIcon />
        </div>
        <Eligibility />
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
          Merge
        </Button>
      </div>

      <DividerDown />
    </CommonModal>
  );
};

export default MergePositionModal;
