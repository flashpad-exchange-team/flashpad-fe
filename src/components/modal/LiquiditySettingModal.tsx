import SwapLeftIcon from '@/icons/SwapLeft';
import CommonModal from './CommonModal';
import SwapRightIcon from '@/icons/SwapRight';
import CloseIcon from '@/icons/CloseIcon';
import BNBICon from '@/icons/BNBIcon';
import { Button } from '../button/Button';
import ButtonStyle from '@/icons/ButtonStyle';
import { useState } from 'react';

export interface LiquiditySettingModalProps {
  toggleOpen: () => void;
  isOpen: boolean;
}

const LiquiditySettingModal = ({
  toggleOpen,
  isOpen,
}: LiquiditySettingModalProps) => {
  const [search, setSearch] = useState<string>('');
  return (
    <CommonModal isOpen={isOpen} onRequestClose={toggleOpen} height="450px">
      <div className="flex items-center justify-between w-full">
        <div className="text-[24px] text-bold mx-auto ] w-fit flex items-center gap-3 justify-start ml-0 mr-auto mb-4">
          <SwapLeftIcon />
          Setting
          <SwapRightIcon />
        </div>
        <div className="cursor-pointer" onClick={toggleOpen}>
          <CloseIcon />
        </div>
      </div>
      <div className="text-[15px]">Slippage (%)</div>
      <input
        className="w-full bg-[#150E3980] h-[44px] pl-3 text-[14px]  mb-2 mt-2 rounded-md focus:outline-none"
        placeholder="Enter value "
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="text-[15px]">Deadline (mins)</div>
      <input
        className="w-full bg-[#150E3980] h-[44px] pl-3 text-[14px]  mb-2 mt-2 rounded-md focus:outline-none"
        placeholder="Enter value "
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="text-[15px]">Max hops</div>
      <input
        className="w-full bg-[#150E3980] h-[44px] pl-3 text-[14px]  mb-2 mt-2 rounded-md focus:outline-none"
        placeholder="Enter value "
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex items-center gap-2">
        <Button
          onClick={toggleOpen}
          className="w-full justify-center mt-2 mb-2"
          type="secondary"
        >
          Reset to default
        </Button>
        <Button
          onClick={toggleOpen}
          className="w-full justify-center mt-2 mb-2 h-[52px] text-[16px]"
        >
          Save setting
        </Button>
      </div>

      <ButtonStyle />
    </CommonModal>
  );
};

export default LiquiditySettingModal;
