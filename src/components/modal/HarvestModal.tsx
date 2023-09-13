import DividerDown from '@/icons/DividerDown';
import CloseIcon from '@/icons/CloseIcon';
import { Button } from '../button/Button';
import CommonModal from './CommonModal';
import BNBICon from '@/icons/BNBIcon';

export interface LockManageModalProps {
  toggleOpen: () => void;
  isOpen: boolean;
}

const HarvestModal = ({ toggleOpen, isOpen }: LockManageModalProps) => {
  return (
    <CommonModal isOpen={isOpen} onRequestClose={toggleOpen} width="550px">
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
      <div className="text-center text-[24px]">
        <span className="text-[#E6B300]">Harvest</span> from your position
      </div>
      <div className="text-center text-[#667085] mb-5">
        Recover underlying tokens from a spNFT
      </div>
      <div className="p-2 bg-blue-opacity-50">
        <div className="">All Rewards</div>
        <div className="text-[#667085] text-[14px] py-2">
          Harvest farming and Nitro rewards
        </div>
      </div>

      <div className="p-2 bg-blue-opacity-50 flex justify-between items-center mt-4">
        <div>
          <div className="">spNFT Rewards</div>
          <div className="text-[#667085] text-[14px] py-2">
            Harvest farming and Nitro rewards
          </div>
        </div>
        <div className="text-[#E6B300]">
          $<span>0.01</span>
        </div>
      </div>

      <div className="p-2 my-4 mb-5 bg-blue-opacity-50 ">Rewards breakdown</div>

      <div className="flex justify-between p-2 bg-blue-opacity-50">
        <div className="flex items-end">
          <div>Name</div>
          <div className="pl-2 text-[#667085] text-[12px]">Farm</div>
        </div>
        <div className="flex items-center">
          <div className="text-[#667085] pr-1">
            ($<span></span>0.01)
          </div>
          <div className="pr-1">&lt;0.0000001</div>
          <div>
            <BNBICon />
          </div>
        </div>
      </div>
      <div className="flex justify-between p-2 bg-blue-opacity-50">
        <div className="flex items-end">
          <div>Name</div>
          <div className="pl-2 text-[#667085] text-[12px]">Farm</div>
        </div>
        <div className="flex items-center">
          <div className="text-[#667085] pr-1">
            ($<span></span>0.01)
          </div>
          <div className="pr-1">&lt;0.0000001</div>
          <div>
            <BNBICon />
          </div>
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
        <Button className="w-full justify-center mt-2 mb-2 h-[52px] text-[16px] px-[42px]">
          Withdraw
        </Button>
      </div>

      <DividerDown />
    </CommonModal>
  );
};

export default HarvestModal;
