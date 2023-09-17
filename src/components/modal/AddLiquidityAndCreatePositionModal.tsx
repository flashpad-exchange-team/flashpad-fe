import CloseIcon from '@/icons/CloseIcon';
import SwapLeftIcon from '@/icons/SwapLeft';
import SwapRightIcon from '@/icons/SwapRight';
import { Button } from '../button/Button';
import CommonModal from './CommonModal';
import DividerDown from '@/icons/DividerDown';
import BNBICon from '@/icons/BNBIcon';
import GroupIcon from '@/icons/GroupIcon';
import ArrowDown from '@/icons/ArrowDown';

export interface AddLiquidityAndCreatePositionModalProps {
  isOpen: boolean;
  toggleOpen: () => void;
}

const AddLiquidityAndCreatePositionModal = ({
  isOpen,
  toggleOpen,
}: AddLiquidityAndCreatePositionModalProps) => {
  return (
    <CommonModal isOpen={isOpen} onRequestClose={toggleOpen} width="550px">
      <div className="flex items-center justify-between w-full">
        <div className="text-2xl text-bold mx-auto  w-fit flex items-center gap-3 justify-start ml-0 mr-auto mb-4">
          <SwapLeftIcon />
          Add V2 liquidity
          <SwapRightIcon />
        </div>
        <div className="cursor-pointer" onClick={toggleOpen}>
          <CloseIcon />
        </div>
      </div>
      <div className="text-[#98A2B3] text-sm mb-2 font-semibold ">
        Deposit assets on Arthur and start earning yield.
      </div>
      <div className="p-2 flex items-center gap-4 text-[12px]">
        <div>
          <BNBICon size={32} />
        </div>
        <div>
          <div>Token A - Token B</div>
          <div>100000</div>
        </div>
      </div>
      <div className="m-2">
        <GroupIcon />
      </div>
      <div className="p-2 flex items-center gap-4 text-[12px]">
        <div>
          <BNBICon size={32} />
        </div>
        <div>
          <div>Token A - Token B</div>
          <div>100000</div>
        </div>
      </div>
      <div className="bg-blue-opacity-50 p-2 text-[14px] my-1">
        <div className="flex justify-between">
          <div className="flex gap-4">
            <div>1 ETH = 1.027,6289 TOKEN</div>
            <div className="text-[#344054]">($1,91)</div>
          </div>
          <ArrowDown />
        </div>
        <div className="flex gap-4">
          <div>1 AICODE = 0,001 ETH </div>
          <div className="text-[#344054]">($1,91)</div>
        </div>
      </div>
      <div className="bg-blue-opacity-50 p-2 text-[16px] my-1">
        Boost options
      </div>
      <div className="flex justify-between mb-2">
        <div className="">Lock duration</div>
        <div className="text-[#E6B300] text-sm">Set max</div>
      </div>
      <div className="flex gap-2">
        <div className="flex items-center bg-blue-opacity-50 justify-center px-6 py-2">
          -
        </div>
        <div className="flex items-center bg-blue-opacity-50 w-[50%] justify-end px-6 py-2">
          <span className="text-[#E6B300] mr-4">0</span> Days
        </div>
        <div className="flex items-center bg-blue-opacity-50 w-[40%] justify-end px-6 py-2">
          <span className="text-[#E6B300] mr-4">0</span> Months
        </div>
        <div>
          <Button className="w-[60px] flex justify-center items-center rounded-[4px]">
            +
          </Button>
        </div>
      </div>
      <div className="text-right text-secondary text-sm my-2">
        4.37% lock bonus (x1.04)
      </div>

      <div className="p-2 flex justify-between bg-blue-opacity-50">
        <div>
          <div className="text-lg">Nitro auto-staking</div>
          <div className="text-secondary text-sm">
            Auto unbind your underlying LP tokens
          </div>
        </div>
        <div className="flex">
          <Button className="w-[50px] !bg-[#000] text-[#fff] rounded-[2px] !text-[12px] flex justify-center items-center">
            On
          </Button>
          <Button className="w-[50px] rounded-[2px] !text-[12px] flex justify-center items-center">
            OFF
          </Button>
        </div>
      </div>

      <div className="bg-blue-opacity-50 p-2 text-[16px] my-1">
        Boost options
      </div>
      <div className="flex justify-between my-5">
        <div>Deposit value</div>
        <div>$0</div>
      </div>
      <div className="flex justify-between mb-5 text-[12px]">
        <div>Total APR</div>
        <div className="text-secondary">20.3%</div>
      </div>
      <div className="flex justify-between my-3 text-[12px]">
        <div>Swap fees APR</div>
        <div>0</div>
      </div>
      <div className="flex justify-between my-3 text-[12px]">
        <div>Farm base APR</div>
        <div>0</div>
      </div>
      <div className="flex justify-between my-3 text-[12px]">
        <div>Lock bonus APR</div>
        <div>0</div>
      </div>

      <div className="block lg:flex items-center gap-2">
        <Button
          className="w-full justify-center mt-2 mb-2 px-[42px]"
          type="secondary"
          onClick={toggleOpen}
        >
          Cancel
        </Button>
        <Button className="w-full justify-center mt-2 mb-2 h-[52px] text-base px-[42px]">
          Create Position
        </Button>
      </div>
      <DividerDown />
    </CommonModal>
  );
};

export default AddLiquidityAndCreatePositionModal;
