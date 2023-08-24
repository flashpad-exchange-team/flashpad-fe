import SwapLeftIcon from '@/icons/SwapLeft';
import CommonModal from './CommonModal';
import SwapRightIcon from '@/icons/SwapRight';
import CloseIcon from '@/icons/CloseIcon';
import { Button } from '../button/Button';
import ButtonStyle from '@/icons/ButtonStyle';
import { useState } from 'react';
import {
  DEFAULT_DEADLINE,
  DEFAULT_MAX_HOPS,
  DEFAULT_SLIPPAGE,
} from '@/utils/constants';
import customToast from '../notification/customToast';

export interface ILiquiditySettings {
  slippage: number;
  deadline: number;
  maxHops: number;
}

export interface LiquiditySettingModalProps {
  toggleOpen: () => void;
  isOpen: boolean;
  saveSettings?: (values: ILiquiditySettings) => void;
}

const LiquiditySettingModal = ({
  toggleOpen,
  isOpen,
  saveSettings,
}: LiquiditySettingModalProps) => {
  const [slippage, setSlippage] = useState<string>(DEFAULT_SLIPPAGE);
  const [deadline, setDeadline] = useState<string>(DEFAULT_DEADLINE);
  const [maxHops, setMaxHops] = useState<string>(DEFAULT_MAX_HOPS);

  const resetToDefault = () => {
    setSlippage(DEFAULT_SLIPPAGE);
    setDeadline(DEFAULT_DEADLINE);
    setMaxHops(DEFAULT_MAX_HOPS);
  };

  const handleSaveSettings = () => {
    const nSlippage = Number(slippage);
    const nDeadline = Number(deadline);
    const nMaxHops = Number(maxHops);
    if (
      Number.isNaN(nSlippage) ||
      nSlippage <= 0 ||
      Number.isNaN(nDeadline) || !Number.isInteger(nDeadline) ||
      nDeadline <= 0 ||
      Number.isNaN(nMaxHops) || !Number.isInteger(nMaxHops) ||
      nMaxHops <= 0
    ) {
      customToast({
        message: 'Please input valid numbers',
        type: 'error',
      });
      return;
    }
    if (saveSettings)
      saveSettings({
        slippage: nSlippage,
        deadline: nDeadline,
        maxHops: nMaxHops,
      });
    toggleOpen();
  };

  return (
    <CommonModal isOpen={isOpen} onRequestClose={toggleOpen} height="490px">
      <div className="flex items-center justify-between w-full">
        <div className="text-[24px] text-bold mx-auto  w-fit flex items-center gap-3 justify-start ml-0 mr-auto mb-4">
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
        className="w-full bg-[#150E3980] h-[44px] pl-3 text-[14px]  mb-2 mt-2 rounded-md focus:outline-none placeholder-[#667085]"
        placeholder="Enter value "
        value={slippage}
        onChange={(e) => setSlippage(e.target.value)}
      />
      <div className="text-[15px]">Deadline (mins)</div>
      <input
        className="w-full bg-[#150E3980] h-[44px] pl-3 text-[14px]  mb-2 mt-2 rounded-md focus:outline-none  placeholder-[#667085]"
        placeholder="Enter value "
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <div className="text-[15px]">Max hops</div>
      <input
        className="w-full bg-[#150E3980] h-[44px] pl-3 text-[14px]  mb-2 mt-2 rounded-md focus:outline-none  placeholder-[#667085]"
        placeholder="Enter value "
        value={maxHops}
        onChange={(e) => setMaxHops(e.target.value)}
      />
      <div className="block lg:flex items-center gap-2">
        <Button
          onClick={resetToDefault}
          className="w-full justify-center mt-2 mb-2 px-[42px]"
          type="secondary"
        >
          Reset to default
        </Button>
        <Button
          onClick={handleSaveSettings}
          className="w-full justify-center mt-2 mb-2 h-[52px] text-[16px] px-[42px]"
        >
          Save settings
        </Button>
      </div>

      <ButtonStyle />
    </CommonModal>
  );
};

export default LiquiditySettingModal;
